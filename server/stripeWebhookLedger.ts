import { logger } from "./_core/logger";
import type { StripeWebhookEvent } from "./stripeWebhookProcess";

type DbConn = { $client: { query: Function } };

/**
 * Additive Runtime-Schema-Erweiterung für Stripe-Webhook-Idempotenz.
 * Kein Drizzle-Schema und keine Migrationsdatei — die Tabelle wird beim ersten
 * Ledger-Zugriff per CREATE TABLE IF NOT EXISTS angelegt (Deploy-Gate beachten).
 */
const STALE_PROCESSING_MS = 5 * 60 * 1000;

let tableReady: Promise<void> | null = null;

async function ensureStripeWebhookLedgerTable(db: DbConn): Promise<void> {
  if (!tableReady) {
    tableReady = db.$client.query(`
      CREATE TABLE IF NOT EXISTS stripe_webhook_events (
        eventId VARCHAR(255) PRIMARY KEY,
        eventType VARCHAR(128) NOT NULL,
        objectId VARCHAR(255) NULL,
        status ENUM('processing','processed','failed') NOT NULL,
        attempts INT NOT NULL DEFAULT 0,
        lastError TEXT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        processedAt DATETIME NULL,
        INDEX idx_status_updated (status, updatedAt),
        INDEX idx_event_type_object (eventType, objectId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `).then(() => undefined);
  }
  await tableReady;
}

export type StripeWebhookLedgerClaim =
  | { shouldProcess: true; eventId: string; reason: "new" | "retry_failed" | "retry_stale_processing" }
  | { shouldProcess: false; eventId: string; reason: "processed_duplicate" | "processing_duplicate" };

function getObjectId(event: StripeWebhookEvent): string | null {
  const objectId = event.data.object?.id;
  return typeof objectId === "string" && objectId.length > 0 ? objectId : null;
}

function isDuplicateKeyError(err: unknown): boolean {
  const code = (err as { code?: string })?.code;
  const message = String((err as Error)?.message || "");
  return code === "ER_DUP_ENTRY" || message.includes("Duplicate entry");
}

function isProcessingStale(updatedAt: string | Date | null | undefined): boolean {
  if (!updatedAt) return true;
  const ts = updatedAt instanceof Date ? updatedAt.getTime() : new Date(updatedAt).getTime();
  if (Number.isNaN(ts)) return true;
  return Date.now() - ts >= STALE_PROCESSING_MS;
}

async function selectLedgerRow(db: DbConn, eventId: string) {
  const [rows] = await db.$client.query(
    "SELECT status, updatedAt, attempts FROM stripe_webhook_events WHERE eventId = ? LIMIT 1",
    [eventId],
  ) as [{ status: string; updatedAt: string | Date; attempts: number }[]];
  return (rows as any[])[0] as { status: string; updatedAt: string | Date; attempts: number } | undefined;
}

async function beginProcessing(
  db: DbConn,
  event: StripeWebhookEvent,
  reason: StripeWebhookLedgerClaim["reason"],
): Promise<StripeWebhookLedgerClaim> {
  const eventId = event.id;
  const objectId = getObjectId(event);
  try {
    await db.$client.query(
      `INSERT INTO stripe_webhook_events (eventId, eventType, objectId, status, attempts)
       VALUES (?, ?, ?, 'processing', 1)`,
      [eventId, event.type, objectId],
    );
    return { shouldProcess: true, eventId, reason: reason === "retry_failed" || reason === "retry_stale_processing" ? reason : "new" };
  } catch (err) {
    if (!isDuplicateKeyError(err)) throw err;
    return claimExistingRow(db, event);
  }
}

async function claimExistingRow(
  db: DbConn,
  event: StripeWebhookEvent,
): Promise<StripeWebhookLedgerClaim> {
  const eventId = event.id;
  const row = await selectLedgerRow(db, eventId);

  if (!row) {
    return beginProcessing(db, event, "new");
  }

  if (row.status === "processed") {
    return { shouldProcess: false, eventId, reason: "processed_duplicate" };
  }

  if (row.status === "processing") {
    if (!isProcessingStale(row.updatedAt)) {
      /**
       * Trade-off (S231H): Parallele Duplikate liefern 200 + skip statt erneut zu verarbeiten.
       * Das verhindert doppelte Side-Effects, kann aber einen legitimen Retry verzögern,
       * solange der erste Worker noch läuft. Stale processing (>5 Min) wird wieder freigegeben.
       */
      return { shouldProcess: false, eventId, reason: "processing_duplicate" };
    }
    await db.$client.query(
      `UPDATE stripe_webhook_events
       SET status = 'processing', attempts = attempts + 1, updatedAt = NOW(), lastError = NULL
       WHERE eventId = ?`,
      [eventId],
    );
    return { shouldProcess: true, eventId, reason: "retry_stale_processing" };
  }

  await db.$client.query(
    `UPDATE stripe_webhook_events
     SET status = 'processing', attempts = attempts + 1, updatedAt = NOW(), lastError = NULL
     WHERE eventId = ?`,
    [eventId],
  );
  return { shouldProcess: true, eventId, reason: "retry_failed" };
}

export async function claimStripeWebhookEvent(
  db: DbConn,
  event: StripeWebhookEvent,
): Promise<StripeWebhookLedgerClaim> {
  await ensureStripeWebhookLedgerTable(db);

  const eventId = event.id?.trim();
  if (!eventId) {
    throw new Error("Stripe webhook event id missing");
  }

  const normalizedEvent = { ...event, id: eventId };
  const existing = await selectLedgerRow(db, eventId);
  if (!existing) {
    return beginProcessing(db, normalizedEvent, "new");
  }
  return claimExistingRow(db, normalizedEvent);
}

export async function markStripeWebhookEventProcessed(db: DbConn, eventId: string): Promise<void> {
  await ensureStripeWebhookLedgerTable(db);
  await db.$client.query(
    `UPDATE stripe_webhook_events
     SET status = 'processed', processedAt = NOW(), lastError = NULL, updatedAt = NOW()
     WHERE eventId = ?`,
    [eventId],
  );
}

export async function markStripeWebhookEventFailed(
  db: DbConn,
  eventId: string,
  error: unknown,
): Promise<void> {
  await ensureStripeWebhookLedgerTable(db);
  const message = error instanceof Error ? error.message : String(error);
  await db.$client.query(
    `UPDATE stripe_webhook_events
     SET status = 'failed', lastError = ?, updatedAt = NOW()
     WHERE eventId = ?`,
    [message.slice(0, 65535), eventId],
  );
  logger.error("[Stripe Webhook Ledger] Event failed", { eventId, error: message });
}

/** Test-Helfer: setzt Ledger-Table-Cache zurück. */
export function resetStripeWebhookLedgerTableCacheForTests(): void {
  tableReady = null;
}
