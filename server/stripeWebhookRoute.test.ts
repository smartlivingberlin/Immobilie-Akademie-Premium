import { describe, expect, it, vi, beforeEach } from "vitest";
import express from "express";
import request from "supertest";

const { mockConstructEvent, mockProcessEvent, mockGetDb } = vi.hoisted(() => ({
  mockConstructEvent: vi.fn(),
  mockProcessEvent: vi.fn(),
  mockGetDb: vi.fn(),
}));

vi.mock("stripe", () => ({
  default: class MockStripe {
    webhooks = { constructEvent: mockConstructEvent };
  },
}));

vi.mock("./db", () => ({
  getDb: mockGetDb,
}));

vi.mock("./stripeWebhookProcess", () => ({
  processStripeWebhookEvent: mockProcessEvent,
}));

vi.mock("./stripeWebhookHealth", () => ({
  recordStripeWebhookEvent: vi.fn(),
}));

vi.mock("./_core/logger", () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

import { handleStripeWebhook } from "./stripeWebhookHandler";

function buildWebhookApp() {
  const app = express();
  app.post("/api/stripe/webhook", express.raw({ type: "*/*" }), handleStripeWebhook);
  return app;
}

describe("handleStripeWebhook route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test_secret_for_s231d";
    process.env.STRIPE_SECRET_KEY = "sk_test_placeholder";
  });

  it("returns 500 when processStripeWebhookEvent throws", async () => {
    mockConstructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: { object: { id: "cs_test" } },
    });
    mockGetDb.mockResolvedValue({ $client: { query: vi.fn() } });
    mockProcessEvent.mockRejectedValue(new Error("db down"));

    const res = await request(buildWebhookApp())
      .post("/api/stripe/webhook")
      .set("stripe-signature", "sig_test")
      .set("Content-Type", "application/json")
      .send("{}");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Webhook processing failed" });
    expect(mockProcessEvent).toHaveBeenCalledOnce();
  });

  it("returns 200 when processing succeeds", async () => {
    mockConstructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: { object: { id: "cs_ok" } },
    });
    mockGetDb.mockResolvedValue({ $client: { query: vi.fn() } });
    mockProcessEvent.mockResolvedValue(undefined);

    const res = await request(buildWebhookApp())
      .post("/api/stripe/webhook")
      .set("stripe-signature", "sig_test")
      .set("Content-Type", "application/json")
      .send("{}");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ received: true });
  });

  it("returns 400 when signature is invalid", async () => {
    mockConstructEvent.mockImplementation(() => {
      throw new Error("No signatures found matching the expected signature");
    });

    const res = await request(buildWebhookApp())
      .post("/api/stripe/webhook")
      .set("stripe-signature", "sig_bad")
      .set("Content-Type", "application/json")
      .send("{}");

    expect(res.status).toBe(400);
    expect(res.text).toContain("Webhook Error:");
    expect(mockProcessEvent).not.toHaveBeenCalled();
  });
});
