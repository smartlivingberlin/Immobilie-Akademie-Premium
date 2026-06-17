import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  claimStripeWebhookEvent,
  classifyStripeWebhookError,
  getStripeWebhookLedgerStats,
  getStripeWebhookStaleMinutes,
  getStripeWebhookStaleMs,
  listFailedStripeWebhookEvents,
  listStaleProcessingStripeWebhookEvents,
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
        if (sql.includes("SUM(CASE WHEN status = 'failed'")) {
          let failedCount = 0;
          let processingCount = 0;
          let processedCount = 0;
          let lastFailedAt: Date | null = null;
          let lastProcessedAt: Date | null = null;
          for (const row of rows.values()) {
            if (row.status === "failed") {
              failedCount += 1;
              if (!lastFailedAt || row.updatedAt > lastFailedAt) lastFailedAt = row.updatedAt;
            }
            if (row.status === "processing") processingCount += 1;
            if (row.status === "processed") {
              processedCount += 1;
              if (row.processedAt && (!lastProcessedAt || row.processedAt > lastProcessedAt)) {
                lastProcessedAt = row.processedAt;
              }
            }
          }
          return [[{
            failedCount,
            processingCount,
            processedCount,
            lastFailedAt,
            lastProcessedAt,
          }]];
        }
        if (sql.includes("staleProcessingCount")) {
          const minutes = Number(params?.[0] || getStripeWebhookStaleMinutes());
          const cutoff = Date.now() - minutes * 60 * 1000;
          let staleProcessingCount = 0;
          for (const row of rows.values()) {
            if (row.status === "processing" && row.updatedAt.getTime() < cutoff) {
              staleProcessingCount += 1;
            }
          }
          return [[{ staleProcessingCount }]];
        }
        if (sql.includes("WHERE status = 'failed'")) {
          const limit = Number(params?.[0] || 20);
          const failed = [...rows.entries()]
            .filter(([, row]) => row.status === "failed")
            .sort((a, b) => b[1].updatedAt.getTime() - a[1].updatedAt.getTime())
            .slice(0, limit)
            .map(([eventId, row]) => ({
              eventId,
              eventType: row.eventType,
              objectId: row.objectId,
              status: row.status,
              attempts: row.attempts,
              updatedAt: row.updatedAt,
              processedAt: row.processedAt,
              lastError: row.lastError,
            }));
          return [failed];
        }
        if (sql.includes("WHERE status = 'processing'") && sql.includes("DATE_SUB")) {
          const minutes = Number(params?.[0] || getStripeWebhookStaleMinutes());
          const limit = Number(params?.[1] || 20);
          const cutoff = Date.now() - minutes * 60 * 1000;
          const stale = [...rows.entries()]
            .filter(([, row]) => row.status === "processing" && row.updatedAt.getTime() < cutoff)
            .sort((a, b) => a[1].updatedAt.getTime() - b[1].updatedAt.getTime())
            .slice(0, limit)
            .map(([eventId, row]) => ({
              eventId,
              eventType: row.eventType,
              objectId: row.objectId,
              status: row.status,
              attempts: row.attempts,
              updatedAt: row.updatedAt,
              processedAt: row.processedAt,
              lastError: row.lastError,
            }));
          return [stale];
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
    delete process.env.STRIPE_WEBHOOK_STALE_MINUTES;
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

describe("stripeWebhookLedger read model", () => {
  beforeEach(() => {
    resetStripeWebhookLedgerTableCacheForTests();
    delete process.env.STRIPE_WEBHOOK_STALE_MINUTES;
  });

  it("getStripeWebhookStaleMinutes uses default and env override", () => {
    expect(getStripeWebhookStaleMinutes()).toBe(10);
    expect(getStripeWebhookStaleMs()).toBe(10 * 60 * 1000);

    process.env.STRIPE_WEBHOOK_STALE_MINUTES = "15";
    expect(getStripeWebhookStaleMinutes()).toBe(15);

    process.env.STRIPE_WEBHOOK_STALE_MINUTES = "0";
    expect(getStripeWebhookStaleMinutes()).toBe(10);

    process.env.STRIPE_WEBHOOK_STALE_MINUTES = "abc";
    expect(getStripeWebhookStaleMinutes()).toBe(10);
  });

  it("classifyStripeWebhookError maps common patterns", () => {
    expect(classifyStripeWebhookError("ER_DUP_ENTRY duplicate entry")).toBe("db_error");
    expect(classifyStripeWebhookError("Stripe signature invalid")).toBe("stripe_error");
    expect(classifyStripeWebhookError("enabledModules merge failed")).toBe("business_error");
    expect(classifyStripeWebhookError(null)).toBe("unknown");
  });

  it("getStripeWebhookLedgerStats counts failed, processing, processed and stale", async () => {
    const now = Date.now();
    const db = createLedgerDb({
      evt_failed: {
        eventType: "checkout.session.completed",
        objectId: "cs_1",
        status: "failed",
        attempts: 2,
        updatedAt: new Date(now - 120_000),
        lastError: "db down",
        processedAt: null,
      },
      evt_stale: {
        eventType: "invoice.paid",
        objectId: "in_1",
        status: "processing",
        attempts: 1,
        updatedAt: new Date(now - 20 * 60 * 1000),
        lastError: null,
        processedAt: null,
      },
      evt_fresh: {
        eventType: "checkout.session.completed",
        objectId: "cs_2",
        status: "processing",
        attempts: 1,
        updatedAt: new Date(now - 60_000),
        lastError: null,
        processedAt: null,
      },
      evt_processed: {
        eventType: "checkout.session.completed",
        objectId: "cs_3",
        status: "processed",
        attempts: 1,
        updatedAt: new Date(now - 300_000),
        lastError: null,
        processedAt: new Date(now - 300_000),
      },
    });

    const stats = await getStripeWebhookLedgerStats(db as any);
    expect(stats.failedCount).toBe(1);
    expect(stats.processingCount).toBe(2);
    expect(stats.processedCount).toBe(1);
    expect(stats.staleProcessingCount).toBe(1);
    expect(stats.lastFailedAt).toBeTruthy();
    expect(stats.lastProcessedAt).toBeTruthy();
    expect(stats.staleThresholdMinutes).toBe(10);
  });

  it("listFailedStripeWebhookEvents returns failed events with errorClass and limit", async () => {
    const db = createLedgerDb({
      evt_old: {
        eventType: "checkout.session.completed",
        objectId: "cs_old",
        status: "failed",
        attempts: 1,
        updatedAt: new Date(Date.now() - 120_000),
        lastError: "connection timeout",
        processedAt: null,
      },
      evt_new: {
        eventType: "invoice.paid",
        objectId: "in_new",
        status: "failed",
        attempts: 2,
        updatedAt: new Date(Date.now() - 30_000),
        lastError: "Stripe webhook invalid",
        processedAt: null,
      },
    });

    const rows = await listFailedStripeWebhookEvents(db as any, 1);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.eventId).toBe("evt_new");
    expect(rows[0]?.errorClass).toBe("stripe_error");
  });

  it("listStaleProcessingStripeWebhookEvents respects threshold override", async () => {
    process.env.STRIPE_WEBHOOK_STALE_MINUTES = "5";
    const now = Date.now();
    const db = createLedgerDb({
      evt_stale: {
        eventType: "checkout.session.completed",
        objectId: "cs_stale",
        status: "processing",
        attempts: 1,
        updatedAt: new Date(now - 10 * 60 * 1000),
        lastError: null,
        processedAt: null,
      },
      evt_fresh: {
        eventType: "checkout.session.completed",
        objectId: "cs_fresh",
        status: "processing",
        attempts: 1,
        updatedAt: new Date(now - 60_000),
        lastError: null,
        processedAt: null,
      },
    });

    const rows = await listStaleProcessingStripeWebhookEvents(db as any, 5, 20);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.eventId).toBe("evt_stale");
    expect(rows[0]?.status).toBe("processing");
  });
});
