import { logger } from "./_core/logger";
import type { StripeWebhookEvent } from "./stripeWebhookProcess";

type DbConn = { $client: { query: Function } };

/**
 * Additive Runtime-Schema-Erweiterung für Stripe-Webhook-Idempotenz.
 * Kein Drizzle-Schema und keine Migrationsdatei — die Tabelle wird beim ersten
 * Ledger-Zugriff per CREATE TABLE IF NOT EXISTS angelegt (Deploy-Gate beachten).
 */
const DEFAULT_STALE_MINUTES = 10;

export function getStripeWebhookStaleMinutes(): number {
  const raw = process.env.STRIPE_WEBHOOK_STALE_MINUTES;
  if (!raw) return DEFAULT_STALE_MINUTES;
  const parsed = parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_STALE_MINUTES;
  return parsed;
}

export function getStripeWebhookStaleMs(): number {
  return getStripeWebhookStaleMinutes() * 60 * 1000;
}

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
  return Date.now() - ts >= getStripeWebhookStaleMs();
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
       * solange der erste Worker noch läuft. Stale processing (STRIPE_WEBHOOK_STALE_MINUTES) wird wieder freigegeben.
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

export type StripeWebhookErrorClass = "db_error" | "business_error" | "stripe_error" | "unknown";

/** Triage-Hilfe aus lastError — keine perfekte Fehlerforensik, keine DB-Spalte in S231J. */
export function classifyStripeWebhookError(lastError: string | null): StripeWebhookErrorClass {
  if (!lastError) return "unknown";
  const lower = lastError.toLowerCase();
  if (/er_|mysql|connection|timeout|econnrefused|deadlock|duplicate entry|db down/.test(lower)) {
    return "db_error";
  }
  if (/stripe|signature|checkout|invoice|webhook/.test(lower)) {
    return "stripe_error";
  }
  if (/module|entitlement|access|pending|purchase|enabledmodules/.test(lower)) {
    return "business_error";
  }
  return "unknown";
}

export type StripeWebhookLedgerStats = {
  failedCount: number;
  processingCount: number;
  staleProcessingCount: number;
  processedCount: number;
  lastFailedAt: string | null;
  lastProcessedAt: string | null;
  staleThresholdMinutes: number;
};

export type StripeWebhookRecoveryEvent = {
  eventId: string;
  eventType: string;
  objectId: string | null;
  status: "processing" | "processed" | "failed";
  attempts: number;
  updatedAt: string;
  processedAt: string | null;
  lastError: string | null;
  errorClass: StripeWebhookErrorClass;
};

function normalizeQueryLimit(limit?: number, defaultLimit = 20, maxLimit = 100): number {
  const value = limit ?? defaultLimit;
  if (!Number.isFinite(value) || value <= 0) return defaultLimit;
  return Math.min(Math.floor(value), maxLimit);
}

function toIsoString(value: string | Date | null | undefined): string | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function mapRecoveryEvent(row: Record<string, unknown>): StripeWebhookRecoveryEvent {
  const status = String(row.status) as StripeWebhookRecoveryEvent["status"];
  const lastError = row.lastError == null ? null : String(row.lastError);
  return {
    eventId: String(row.eventId),
    eventType: String(row.eventType),
    objectId: row.objectId == null ? null : String(row.objectId),
    status,
    attempts: Number(row.attempts) || 0,
    updatedAt: toIsoString(row.updatedAt as string | Date) || new Date(0).toISOString(),
    processedAt: toIsoString(row.processedAt as string | Date | null),
    lastError,
    errorClass: classifyStripeWebhookError(lastError),
  };
}

export async function getStripeWebhookLedgerStats(db: DbConn): Promise<StripeWebhookLedgerStats> {
  await ensureStripeWebhookLedgerTable(db);
  const staleMinutes = getStripeWebhookStaleMinutes();

  const [countRows] = await db.$client.query(`
    SELECT
      SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) AS failedCount,
      SUM(CASE WHEN status = 'processing' THEN 1 ELSE 0 END) AS processingCount,
      SUM(CASE WHEN status = 'processed' THEN 1 ELSE 0 END) AS processedCount,
      MAX(CASE WHEN status = 'failed' THEN updatedAt END) AS lastFailedAt,
      MAX(CASE WHEN status = 'processed' THEN processedAt END) AS lastProcessedAt
    FROM stripe_webhook_events
  `) as [Record<string, unknown>[]];

  const [staleRows] = await db.$client.query(
    `SELECT COUNT(*) AS staleProcessingCount
     FROM stripe_webhook_events
     WHERE status = 'processing'
       AND updatedAt < DATE_SUB(NOW(), INTERVAL ? MINUTE)`,
    [staleMinutes],
  ) as [{ staleProcessingCount: number }[]];

  const counts = (countRows as any[])[0] || {};
  return {
    failedCount: Number(counts.failedCount) || 0,
    processingCount: Number(counts.processingCount) || 0,
    staleProcessingCount: Number((staleRows as any[])[0]?.staleProcessingCount) || 0,
    processedCount: Number(counts.processedCount) || 0,
    lastFailedAt: toIsoString(counts.lastFailedAt as string | Date | null),
    lastProcessedAt: toIsoString(counts.lastProcessedAt as string | Date | null),
    staleThresholdMinutes: staleMinutes,
  };
}

export async function listFailedStripeWebhookEvents(
  db: DbConn,
  limit?: number,
): Promise<StripeWebhookRecoveryEvent[]> {
  await ensureStripeWebhookLedgerTable(db);
  const boundedLimit = normalizeQueryLimit(limit);
  const [rows] = await db.$client.query(
    `SELECT eventId, eventType, objectId, status, attempts, updatedAt, processedAt, lastError
     FROM stripe_webhook_events
     WHERE status = 'failed'
     ORDER BY updatedAt DESC
     LIMIT ?`,
    [boundedLimit],
  ) as [Record<string, unknown>[]];
  return (rows as any[]).map(mapRecoveryEvent);
}

export async function listStaleProcessingStripeWebhookEvents(
  db: DbConn,
  olderThanMinutes?: number,
  limit?: number,
): Promise<StripeWebhookRecoveryEvent[]> {
  await ensureStripeWebhookLedgerTable(db);
  const minutes = olderThanMinutes && olderThanMinutes > 0
    ? Math.floor(olderThanMinutes)
    : getStripeWebhookStaleMinutes();
  const boundedLimit = normalizeQueryLimit(limit);
  const [rows] = await db.$client.query(
    `SELECT eventId, eventType, objectId, status, attempts, updatedAt, processedAt, lastError
     FROM stripe_webhook_events
     WHERE status = 'processing'
       AND updatedAt < DATE_SUB(NOW(), INTERVAL ? MINUTE)
     ORDER BY updatedAt ASC
     LIMIT ?`,
    [minutes, boundedLimit],
  ) as [Record<string, unknown>[]];
  return (rows as any[]).map(mapRecoveryEvent);
}
