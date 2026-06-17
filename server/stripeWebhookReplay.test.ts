import { describe, expect, it, vi, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  evaluateStripeWebhookReplayEligibility,
  getStripeWebhookRecoveryEventById,
  resetStripeWebhookLedgerTableCacheForTests,
} from "./stripeWebhookLedger";
import {
  STRIPE_WEBHOOK_REPLAY_CONFIRM_PHRASE,
  handleStripeWebhookReplayRequest,
  isStripeWebhookManualReplayEnabled,
  normalizeStripeWebhookReplayEvent,
  resetStripeWebhookReplayRateLimitForTests,
  validateReplayEventMatchesLedger,
} from "./stripeWebhookReplay";

const mockProcessEvent = vi.fn();

vi.mock("./stripeWebhookProcess", () => ({
  processStripeWebhookEvent: mockProcessEvent,
}));

vi.mock("./platformAuditLog", () => ({
  recordPlatformAudit: vi.fn(),
  auditRequestMeta: vi.fn(() => ({})),
}));

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

function createReplayDb(initial: Record<string, LedgerRow> = {}) {
  const rows = new Map<string, LedgerRow>(Object.entries(initial));

  const db = {
    rows,
    $client: {
      query: vi.fn(async (sql: string, params?: unknown[]) => {
        if (sql.includes("CREATE TABLE IF NOT EXISTS stripe_webhook_events")) return [[]];
        if (sql.includes("SELECT eventId, eventType, objectId, status, attempts, updatedAt, processedAt, lastError")) {
          const eventId = params?.[0] as string;
          const row = rows.get(eventId);
          if (!row) return [[]];
          return [[{
            eventId,
            eventType: row.eventType,
            objectId: row.objectId,
            status: row.status,
            attempts: row.attempts,
            updatedAt: row.updatedAt,
            processedAt: row.processedAt,
            lastError: row.lastError,
          }]];
        }
        if (sql.includes("SELECT status, updatedAt, attempts FROM stripe_webhook_events")) {
          const eventId = params?.[0] as string;
          const row = rows.get(eventId);
          return [row ? [{ status: row.status, updatedAt: row.updatedAt, attempts: row.attempts }] : []];
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

const baseEvent = {
  id: "evt_replay_1",
  type: "checkout.session.completed",
  data: { object: { id: "cs_replay_1", customer_email: "buyer@example.com", metadata: { modules: "1" } } },
};

const actor = { id: 99, email: "admin@example.com", role: "admin" };

describe("stripeWebhookReplay", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetStripeWebhookLedgerTableCacheForTests();
    resetStripeWebhookReplayRateLimitForTests();
    delete process.env.STRIPE_WEBHOOK_MANUAL_REPLAY_ENABLED;
    delete process.env.STRIPE_WEBHOOK_MANUAL_REPLAY_RATE_LIMIT_SECONDS;
    mockProcessEvent.mockResolvedValue(undefined);
  });

  it("dry-run for failed event is eligible and does not mutate ledger", async () => {
    const db = createReplayDb({
      evt_replay_1: {
        eventType: baseEvent.type,
        objectId: "cs_replay_1",
        status: "failed",
        attempts: 2,
        updatedAt: new Date(Date.now() - 120_000),
        lastError: "db down",
        processedAt: null,
      },
    });

    const result = await handleStripeWebhookReplayRequest({
      db: db as any,
      body: { dryRun: true, event: baseEvent },
      actor,
    });

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ dryRun: true, eligible: true, eventId: "evt_replay_1" });
    expect(db.rows.get("evt_replay_1")?.status).toBe("failed");
    expect(mockProcessEvent).not.toHaveBeenCalled();
  });

  it("actual replay is blocked when env flag is disabled", async () => {
    const db = createReplayDb({
      evt_replay_1: {
        eventType: baseEvent.type,
        objectId: "cs_replay_1",
        status: "failed",
        attempts: 1,
        updatedAt: new Date(Date.now() - 120_000),
        lastError: "db down",
        processedAt: null,
      },
    });

    const result = await handleStripeWebhookReplayRequest({
      db: db as any,
      body: {
        dryRun: false,
        confirm: STRIPE_WEBHOOK_REPLAY_CONFIRM_PHRASE,
        event: baseEvent,
      },
      actor,
    });

    expect(result.status).toBe(403);
    expect(result.body).toEqual({ error: "manual_replay_disabled" });
    expect(mockProcessEvent).not.toHaveBeenCalled();
  });

  it("actual replay requires confirmation phrase", async () => {
    process.env.STRIPE_WEBHOOK_MANUAL_REPLAY_ENABLED = "1";
    const db = createReplayDb({
      evt_replay_1: {
        eventType: baseEvent.type,
        objectId: "cs_replay_1",
        status: "failed",
        attempts: 1,
        updatedAt: new Date(Date.now() - 120_000),
        lastError: "db down",
        processedAt: null,
      },
    });

    const result = await handleStripeWebhookReplayRequest({
      db: db as any,
      body: { dryRun: false, confirm: "WRONG", event: baseEvent },
      actor,
    });

    expect(result.status).toBe(400);
    expect(result.body).toEqual({ error: "confirm_phrase_required" });
    expect(mockProcessEvent).not.toHaveBeenCalled();
  });

  it("actual replay processes failed event and marks processed", async () => {
    process.env.STRIPE_WEBHOOK_MANUAL_REPLAY_ENABLED = "true";
    const db = createReplayDb({
      evt_replay_1: {
        eventType: baseEvent.type,
        objectId: "cs_replay_1",
        status: "failed",
        attempts: 1,
        updatedAt: new Date(Date.now() - 120_000),
        lastError: "db down",
        processedAt: null,
      },
    });

    const result = await handleStripeWebhookReplayRequest({
      db: db as any,
      body: {
        dryRun: false,
        confirm: STRIPE_WEBHOOK_REPLAY_CONFIRM_PHRASE,
        event: baseEvent,
      },
      actor,
    });

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ replayed: true, status: "processed", eventId: "evt_replay_1" });
    expect(mockProcessEvent).toHaveBeenCalledOnce();
    expect(db.rows.get("evt_replay_1")?.status).toBe("processed");
  });

  it("allows replay for stale processing events", async () => {
    process.env.STRIPE_WEBHOOK_MANUAL_REPLAY_ENABLED = "1";
    const db = createReplayDb({
      evt_replay_1: {
        eventType: baseEvent.type,
        objectId: "cs_replay_1",
        status: "processing",
        attempts: 1,
        updatedAt: new Date(Date.now() - 20 * 60 * 1000),
        lastError: null,
        processedAt: null,
      },
    });

    const result = await handleStripeWebhookReplayRequest({
      db: db as any,
      body: {
        dryRun: false,
        confirm: STRIPE_WEBHOOK_REPLAY_CONFIRM_PHRASE,
        event: baseEvent,
      },
      actor,
    });

    expect(result.status).toBe(200);
    expect(result.body.replayed).toBe(true);
    expect(db.rows.get("evt_replay_1")?.status).toBe("processed");
  });

  it("rejects processed events", async () => {
    const db = createReplayDb({
      evt_replay_1: {
        eventType: baseEvent.type,
        objectId: "cs_replay_1",
        status: "processed",
        attempts: 1,
        updatedAt: new Date(Date.now() - 120_000),
        lastError: null,
        processedAt: new Date(Date.now() - 120_000),
      },
    });

    const result = await handleStripeWebhookReplayRequest({
      db: db as any,
      body: { dryRun: true, event: baseEvent },
      actor,
    });

    expect(result.status).toBe(409);
    expect(result.body.error).toBe("already_processed");
  });

  it("rejects fresh processing events", async () => {
    const db = createReplayDb({
      evt_replay_1: {
        eventType: baseEvent.type,
        objectId: "cs_replay_1",
        status: "processing",
        attempts: 1,
        updatedAt: new Date(),
        lastError: null,
        processedAt: null,
      },
    });

    const result = await handleStripeWebhookReplayRequest({
      db: db as any,
      body: { dryRun: true, event: baseEvent },
      actor,
    });

    expect(result.status).toBe(409);
    expect(result.body.error).toBe("processing_not_stale");
  });

  it("rejects missing ledger events", async () => {
    const db = createReplayDb();

    const result = await handleStripeWebhookReplayRequest({
      db: db as any,
      body: { dryRun: true, event: baseEvent },
      actor,
    });

    expect(result.status).toBe(404);
    expect(result.body.error).toBe("ledger_event_not_found");
  });

  it("rejects event type mismatch", async () => {
    const db = createReplayDb({
      evt_replay_1: {
        eventType: baseEvent.type,
        objectId: "cs_replay_1",
        status: "failed",
        attempts: 1,
        updatedAt: new Date(Date.now() - 120_000),
        lastError: "db down",
        processedAt: null,
      },
    });

    const result = await handleStripeWebhookReplayRequest({
      db: db as any,
      body: {
        dryRun: true,
        event: { ...baseEvent, type: "invoice.paid" },
      },
      actor,
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBe("event_type_mismatch");
  });

  it("rejects object id mismatch", async () => {
    const db = createReplayDb({
      evt_replay_1: {
        eventType: baseEvent.type,
        objectId: "cs_replay_1",
        status: "failed",
        attempts: 1,
        updatedAt: new Date(Date.now() - 120_000),
        lastError: "db down",
        processedAt: null,
      },
    });

    const result = await handleStripeWebhookReplayRequest({
      db: db as any,
      body: {
        dryRun: true,
        event: { ...baseEvent, data: { object: { id: "cs_other" } } },
      },
      actor,
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBe("object_id_mismatch");
  });

  it("marks failed again when processor throws", async () => {
    process.env.STRIPE_WEBHOOK_MANUAL_REPLAY_ENABLED = "1";
    mockProcessEvent.mockRejectedValueOnce(new Error("processor failed"));
    const db = createReplayDb({
      evt_replay_1: {
        eventType: baseEvent.type,
        objectId: "cs_replay_1",
        status: "failed",
        attempts: 1,
        updatedAt: new Date(Date.now() - 120_000),
        lastError: "old error",
        processedAt: null,
      },
    });

    const result = await handleStripeWebhookReplayRequest({
      db: db as any,
      body: {
        dryRun: false,
        confirm: STRIPE_WEBHOOK_REPLAY_CONFIRM_PHRASE,
        event: baseEvent,
      },
      actor,
    });

    expect(result.status).toBe(500);
    expect(result.body.error).toBe("processing_failed");
    expect(db.rows.get("evt_replay_1")?.status).toBe("failed");
    expect(db.rows.get("evt_replay_1")?.lastError).toContain("processor failed");
  });

  it("rate limits second actual replay within window", async () => {
    process.env.STRIPE_WEBHOOK_MANUAL_REPLAY_ENABLED = "1";
    process.env.STRIPE_WEBHOOK_MANUAL_REPLAY_RATE_LIMIT_SECONDS = "60";
    const db = createReplayDb({
      evt_replay_1: {
        eventType: baseEvent.type,
        objectId: "cs_replay_1",
        status: "failed",
        attempts: 1,
        updatedAt: new Date(Date.now() - 120_000),
        lastError: "db down",
        processedAt: null,
      },
      evt_replay_2: {
        eventType: "invoice.paid",
        objectId: "in_2",
        status: "failed",
        attempts: 1,
        updatedAt: new Date(Date.now() - 120_000),
        lastError: "db down",
        processedAt: null,
      },
    });

    const first = await handleStripeWebhookReplayRequest({
      db: db as any,
      body: {
        dryRun: false,
        confirm: STRIPE_WEBHOOK_REPLAY_CONFIRM_PHRASE,
        event: baseEvent,
      },
      actor,
    });
    expect(first.status).toBe(200);

    const second = await handleStripeWebhookReplayRequest({
      db: db as any,
      body: {
        dryRun: false,
        confirm: STRIPE_WEBHOOK_REPLAY_CONFIRM_PHRASE,
        event: {
          id: "evt_replay_2",
          type: "invoice.paid",
          data: { object: { id: "in_2" } },
        },
      },
      actor,
    });

    expect(second.status).toBe(429);
    expect(second.body.error).toBe("rate_limited");
  });

  it("does not import stripe package", () => {
    const source = readFileSync(resolve(process.cwd(), "server/stripeWebhookReplay.ts"), "utf8");
    expect(source).not.toMatch(/from\s+["']stripe["']/);
    expect(source).not.toMatch(/import\s*\(\s*["']stripe["']\s*\)/);
  });

  it("evaluateStripeWebhookReplayEligibility covers failed and stale processing", () => {
    expect(evaluateStripeWebhookReplayEligibility(null)).toEqual({ eligible: false, reason: "missing" });
    expect(
      evaluateStripeWebhookReplayEligibility({
        eventId: "evt",
        eventType: "checkout.session.completed",
        objectId: null,
        status: "failed",
        attempts: 1,
        updatedAt: new Date().toISOString(),
        processedAt: null,
        lastError: "x",
        errorClass: "db_error",
      }),
    ).toEqual({ eligible: true, reason: "failed" });
  });

  it("getStripeWebhookRecoveryEventById returns mapped event", async () => {
    const db = createReplayDb({
      evt_lookup: {
        eventType: "checkout.session.completed",
        objectId: "cs_1",
        status: "failed",
        attempts: 2,
        updatedAt: new Date("2026-06-17T08:00:00.000Z"),
        lastError: "timeout",
        processedAt: null,
      },
    });

    const row = await getStripeWebhookRecoveryEventById(db as any, "evt_lookup");
    expect(row?.eventId).toBe("evt_lookup");
    expect(row?.errorClass).toBe("db_error");
  });

  it("validateReplayEventMatchesLedger detects mismatches", () => {
    const ledger = {
      eventId: "evt_1",
      eventType: "checkout.session.completed",
      objectId: "cs_1",
      status: "failed" as const,
      attempts: 1,
      updatedAt: new Date().toISOString(),
      processedAt: null,
      lastError: null,
      errorClass: "unknown" as const,
    };
    const event = normalizeStripeWebhookReplayEvent({
      id: "evt_1",
      type: "checkout.session.completed",
      data: { object: { id: "cs_1" } },
    });
    expect(validateReplayEventMatchesLedger(event, ledger)).toBeNull();
    expect(
      validateReplayEventMatchesLedger({ ...event, id: "evt_2" }, ledger),
    ).toBe("event_id_mismatch");
  });

  it("isStripeWebhookManualReplayEnabled respects env", () => {
    expect(isStripeWebhookManualReplayEnabled()).toBe(false);
    process.env.STRIPE_WEBHOOK_MANUAL_REPLAY_ENABLED = "true";
    expect(isStripeWebhookManualReplayEnabled()).toBe(true);
  });
});
