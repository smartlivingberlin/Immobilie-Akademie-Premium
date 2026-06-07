import { describe, expect, it } from "vitest";
import { getStripeWebhookHealth, recordStripeWebhookEvent } from "./stripeWebhookHealth";

describe("stripeWebhookHealth", () => {
  it("records verified webhook events", () => {
    recordStripeWebhookEvent("invoice.paid");
    const health = getStripeWebhookHealth();
    expect(health.lastEventType).toBe("invoice.paid");
    expect(health.recentlyActive).toBe(true);
    expect(health.endpoint).toContain("/api/stripe/webhook");
  });
});
