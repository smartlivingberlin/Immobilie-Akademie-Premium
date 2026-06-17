import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  claimStripeWebhookEvent,
  markStripeWebhookEventFailed,
  markStripeWebhookEventProcessed,
  resetStripeWebhookLedgerTableCacheForTests,
} from "./stripeWebhookLedger";

vi.mock("./_core/logger", () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

type LedgerRow = {
  eventType: string;
  objectId: string | null;
  status: "processing" | "processed" | "failed";
  attempts: number;
  updatedAt: Date;
  lastError: string | null;
  processedAt: Date | null;
};

function createLedgerDb(initial: Record<string, LedgerRow> = {}) {
  const rows = new Map<string, LedgerRow>(Object.entries(initial));

  const db = {
    rows,
    $client: {
      query: vi.fn(async (sql: string, params?: unknown[]) => {
        if (sql.includes("CREATE TABLE IF NOT EXISTS stripe_webhook_events")) {
          return [[]];
        }
        if (sql.includes("INSERT INTO stripe_webhook_events")) {
          const [eventId, eventType, objectId] = params as [string, string, string | null];
          if (rows.has(eventId)) {
            const err = new Error("Duplicate entry");
            (err as any).code = "ER_DUP_ENTRY";
            throw err;
          }
          rows.set(eventId, {
            eventType,
            objectId,
            status: "processing",
            attempts: 1,
            updatedAt: new Date(),
            lastError: null,
            processedAt: null,
          });
          return [{ affectedRows: 1 }];
        }
        if (sql.includes("SELECT status, updatedAt, attempts FROM stripe_webhook_events")) {
          const eventId = params?.[0] as string;
          const row = rows.get(eventId);
          return [row ? [{ status: row.status, updatedAt: row.updatedAt, attempts: row.attempts }] : []];
        }
        if (sql.includes("SET status = 'processed'")) {
          const eventId = params?.[0] as string;
          const row = rows.get(eventId);
          if (row) {
            row.status = "processed";
            row.processedAt = new Date();
            row.lastError = null;
            row.updatedAt = new Date();
          }
          return [{ affectedRows: 1 }];
        }
        if (sql.includes("SET status = 'failed'")) {
          const [lastError, eventId] = params as [string, string];
          const row = rows.get(eventId);
          if (row) {
            row.status = "failed";
            row.lastError = lastError;
            row.updatedAt = new Date();
          }
          return [{ affectedRows: 1 }];
        }
        if (sql.includes("SET status = 'processing', attempts = attempts + 1")) {
          const eventId = params?.[0] as string;
          const row = rows.get(eventId);
          if (row) {
            row.status = "processing";
            row.attempts += 1;
            row.lastError = null;
            row.updatedAt = new Date();
          }
          return [{ affectedRows: 1 }];
        }
        return [[]];
      }),
    },
  };

  return db;
}

describe("stripeWebhookLedger", () => {
  beforeEach(() => {
    resetStripeWebhookLedgerTableCacheForTests();
  });

  const event = {
    id: "evt_ledger_1",
    type: "checkout.session.completed",
    data: { object: { id: "cs_ledger_1" } },
  };

  it("claims new event as processing and marks processed", async () => {
    const db = createLedgerDb();

    const claim = await claimStripeWebhookEvent(db as any, event);
    expect(claim).toEqual({ shouldProcess: true, eventId: event.id, reason: "new" });
    expect(db.rows.get(event.id)?.status).toBe("processing");

    await markStripeWebhookEventProcessed(db as any, event.id);
    expect(db.rows.get(event.id)?.status).toBe("processed");
  });

  it("skips processed duplicate events", async () => {
    const db = createLedgerDb({
      [event.id]: {
        eventType: event.type,
        objectId: "cs_ledger_1",
        status: "processed",
        attempts: 1,
        updatedAt: new Date(),
        lastError: null,
        processedAt: new Date(),
      },
    });

    const claim = await claimStripeWebhookEvent(db as any, event);
    expect(claim).toEqual({
      shouldProcess: false,
      eventId: event.id,
      reason: "processed_duplicate",
    });
  });

  it("allows retry after failed status", async () => {
    const db = createLedgerDb({
      [event.id]: {
        eventType: event.type,
        objectId: "cs_ledger_1",
        status: "failed",
        attempts: 1,
        updatedAt: new Date(Date.now() - 60_000),
        lastError: "db down",
        processedAt: null,
      },
    });

    const claim = await claimStripeWebhookEvent(db as any, event);
    expect(claim).toEqual({
      shouldProcess: true,
      eventId: event.id,
      reason: "retry_failed",
    });

    await markStripeWebhookEventProcessed(db as any, event.id);
    expect(db.rows.get(event.id)?.status).toBe("processed");
  });

  it("marks failed on processing error path", async () => {
    const db = createLedgerDb();

    await claimStripeWebhookEvent(db as any, event);
    await markStripeWebhookEventFailed(db as any, event.id, new Error("processor failed"));
    expect(db.rows.get(event.id)?.status).toBe("failed");
    expect(db.rows.get(event.id)?.lastError).toContain("processor failed");
  });
});
