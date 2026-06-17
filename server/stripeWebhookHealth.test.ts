import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  getStripeWebhookHealth,
  getStripeWebhookHealthWithLedger,
  recordStripeWebhookEvent,
} from "./stripeWebhookHealth";

describe("stripeWebhookHealth", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("records verified webhook events", () => {
    recordStripeWebhookEvent("invoice.paid");
    const health = getStripeWebhookHealth();
    expect(health.lastEventType).toBe("invoice.paid");
    expect(health.recentlyActive).toBe(true);
    expect(health.endpoint).toContain("/api/stripe/webhook");
  });

  it("getStripeWebhookHealthWithLedger adds ledger stats without breaking base fields", async () => {
    recordStripeWebhookEvent("checkout.session.completed");
    const db = {
      $client: {
        query: vi.fn(async (sql: string) => {
          if (sql.includes("CREATE TABLE IF NOT EXISTS stripe_webhook_events")) return [[]];
          if (sql.includes("SUM(CASE WHEN status = 'failed'")) {
            return [[{
              failedCount: 2,
              processingCount: 1,
              processedCount: 5,
              lastFailedAt: new Date("2026-06-17T08:00:00.000Z"),
              lastProcessedAt: new Date("2026-06-17T08:05:00.000Z"),
            }]];
          }
          if (sql.includes("staleProcessingCount")) return [[{ staleProcessingCount: 1 }]];
          return [[]];
        }),
      },
    };

    const health = await getStripeWebhookHealthWithLedger(db as any);
    expect(health.lastEventType).toBe("checkout.session.completed");
    expect(health.endpoint).toContain("/api/stripe/webhook");
    expect(health.ledger.available).toBe(true);
    if (health.ledger.available) {
      expect(health.ledger.failedCount).toBe(2);
      expect(health.ledger.processingCount).toBe(1);
      expect(health.ledger.staleProcessingCount).toBe(1);
      expect(health.ledger.processedCount).toBe(5);
      expect(health.ledger.lastFailedAt).toBeTruthy();
      expect(health.ledger.lastProcessedAt).toBeTruthy();
      expect(health.ledger.staleThresholdMinutes).toBe(10);
    }
  });

  it("getStripeWebhookHealthWithLedger returns ledger_un issues without crashing", async () => {
    const health = await getStripeWebhookHealthWithLedger(null);
    expect(health.secretConfigured).toBeDefined();
    expect(health.ledger).toEqual({ available: false, error: "ledger_unavailable" });
  });

  it("getStripeWebhookHealthWithLedger handles ledger query errors gracefully", async () => {
    const db = {
      $client: {
        query: vi.fn(async () => {
          throw new Error("db down");
        }),
      },
    };

    const health = await getStripeWebhookHealthWithLedger(db as any);
    expect(health.ledger).toEqual({ available: false, error: "ledger_unavailable" });
  });
});
