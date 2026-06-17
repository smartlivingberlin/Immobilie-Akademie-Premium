import { describe, expect, it, vi, beforeEach } from "vitest";
import express from "express";
import request from "supertest";

const {
  mockConstructEvent,
  mockProcessEvent,
  mockGetDb,
  mockClaim,
  mockMarkProcessed,
  mockMarkFailed,
} = vi.hoisted(() => ({
  mockConstructEvent: vi.fn(),
  mockProcessEvent: vi.fn(),
  mockGetDb: vi.fn(),
  mockClaim: vi.fn(),
  mockMarkProcessed: vi.fn().mockResolvedValue(undefined),
  mockMarkFailed: vi.fn().mockResolvedValue(undefined),
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

vi.mock("./stripeWebhookLedger", () => ({
  claimStripeWebhookEvent: mockClaim,
  markStripeWebhookEventProcessed: mockMarkProcessed,
  markStripeWebhookEventFailed: mockMarkFailed,
}));

vi.mock("./stripeWebhookHealth", () => ({
  recordStripeWebhookEvent: vi.fn(),
}));

vi.mock("./_core/logger", () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

import { handleStripeWebhook } from "./stripeWebhookHandler";

const TEST_EVENT = {
  id: "evt_test_checkout_1",
  type: "checkout.session.completed",
  data: { object: { id: "cs_test" } },
};

function buildWebhookApp() {
  const app = express();
  app.post("/api/stripe/webhook", express.raw({ type: "*/*" }), handleStripeWebhook);
  return app;
}

function mockDbConn() {
  return { $client: { query: vi.fn().mockResolvedValue([[]]) } };
}

describe("handleStripeWebhook route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test_secret_for_s231d";
    process.env.STRIPE_SECRET_KEY = "sk_test_placeholder";
    mockGetDb.mockResolvedValue(mockDbConn());
    mockClaim.mockResolvedValue({
      shouldProcess: true,
      eventId: TEST_EVENT.id,
      reason: "new",
    });
  });

  it("returns 500 when processStripeWebhookEvent throws and marks ledger failed", async () => {
    mockConstructEvent.mockReturnValue(TEST_EVENT);
    mockProcessEvent.mockRejectedValue(new Error("db down"));

    const res = await request(buildWebhookApp())
      .post("/api/stripe/webhook")
      .set("stripe-signature", "sig_test")
      .set("Content-Type", "application/json")
      .send("{}");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Webhook processing failed" });
    expect(mockClaim).toHaveBeenCalledOnce();
    expect(mockProcessEvent).toHaveBeenCalledOnce();
    expect(mockMarkFailed).toHaveBeenCalledWith(expect.anything(), TEST_EVENT.id, expect.any(Error));
    expect(mockMarkProcessed).not.toHaveBeenCalled();
  });

  it("returns 200 when processing succeeds and marks ledger processed", async () => {
    mockConstructEvent.mockReturnValue(TEST_EVENT);
    mockProcessEvent.mockResolvedValue(undefined);

    const res = await request(buildWebhookApp())
      .post("/api/stripe/webhook")
      .set("stripe-signature", "sig_test")
      .set("Content-Type", "application/json")
      .send("{}");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ received: true });
    expect(mockClaim).toHaveBeenCalledOnce();
    expect(mockProcessEvent).toHaveBeenCalledOnce();
    expect(mockMarkProcessed).toHaveBeenCalledWith(expect.anything(), TEST_EVENT.id);
    expect(mockMarkFailed).not.toHaveBeenCalled();
  });

  it("returns 200 and skips processing for processed duplicate event.id", async () => {
    mockConstructEvent.mockReturnValue(TEST_EVENT);
    mockClaim.mockResolvedValue({
      shouldProcess: false,
      eventId: TEST_EVENT.id,
      reason: "processed_duplicate",
    });

    const res = await request(buildWebhookApp())
      .post("/api/stripe/webhook")
      .set("stripe-signature", "sig_test")
      .set("Content-Type", "application/json")
      .send("{}");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      received: true,
      duplicate: true,
      reason: "processed_duplicate",
    });
    expect(mockProcessEvent).not.toHaveBeenCalled();
    expect(mockMarkProcessed).not.toHaveBeenCalled();
    expect(mockMarkFailed).not.toHaveBeenCalled();
  });

  it("returns 200 when retry after failed claim allows processing", async () => {
    mockConstructEvent.mockReturnValue(TEST_EVENT);
    mockClaim.mockResolvedValue({
      shouldProcess: true,
      eventId: TEST_EVENT.id,
      reason: "retry_failed",
    });
    mockProcessEvent.mockResolvedValue(undefined);

    const res = await request(buildWebhookApp())
      .post("/api/stripe/webhook")
      .set("stripe-signature", "sig_test")
      .set("Content-Type", "application/json")
      .send("{}");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ received: true });
    expect(mockProcessEvent).toHaveBeenCalledOnce();
    expect(mockMarkProcessed).toHaveBeenCalledWith(expect.anything(), TEST_EVENT.id);
  });

  it("returns 400 when signature is invalid without ledger access", async () => {
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
    expect(mockGetDb).not.toHaveBeenCalled();
    expect(mockClaim).not.toHaveBeenCalled();
    expect(mockProcessEvent).not.toHaveBeenCalled();
  });

  it("returns 400 when verified event has no id", async () => {
    mockConstructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: { object: { id: "cs_no_evt_id" } },
    });

    const res = await request(buildWebhookApp())
      .post("/api/stripe/webhook")
      .set("stripe-signature", "sig_test")
      .set("Content-Type", "application/json")
      .send("{}");

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Webhook event id missing" });
    expect(mockGetDb).not.toHaveBeenCalled();
    expect(mockClaim).not.toHaveBeenCalled();
    expect(mockProcessEvent).not.toHaveBeenCalled();
  });
});
