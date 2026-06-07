import { describe, expect, it, vi } from "vitest";
import { buildCheckoutCompletedFixture } from "../shared/stripeWebhookFixture";

const processModulePurchase = vi.fn();

vi.mock("./stripePurchaseHandler", () => ({
  processModulePurchase,
  processRenewalPayment: vi.fn(),
  processComplianceSubscription: vi.fn(),
  processRechenpraxisSubscription: vi.fn(),
}));

vi.mock("./b2bPurchaseHandler", () => ({
  processB2bSubscription: vi.fn(),
}));

import { processStripeWebhookEvent } from "./stripeWebhookProcess";

function createDb(user: { id: number; enabledModules: string } | null) {
  return {
    $client: {
      query: vi.fn(async (sql: string) => {
        if (sql.includes("SELECT id, enabledModules")) return [[user]];
        if (sql.includes("INSERT INTO pending_purchases")) return [{ affectedRows: 1 }];
        return [[]];
      }),
    },
  };
}

describe("processStripeWebhookEvent", () => {
  it("grants modules on checkout.session.completed when user exists", async () => {
    processModulePurchase.mockResolvedValueOnce({ merged: "1", userId: 5 });
    const db = createDb({ id: 5, enabledModules: "" });
    const event = buildCheckoutCompletedFixture({
      email: "buyer@example.com",
      modules: "1",
      productId: "modul_1",
    });

    await processStripeWebhookEvent(db as any, event);

    expect(processModulePurchase).toHaveBeenCalledWith(
      db,
      "buyer@example.com",
      "1",
      "modul_1",
    );
    expect(db.$client.query).not.toHaveBeenCalledWith(
      expect.stringContaining("pending_purchases"),
      expect.anything(),
    );
  });

  it("stores pending purchase when user is missing", async () => {
    processModulePurchase.mockResolvedValueOnce(null);
    const db = createDb(null);
    const event = buildCheckoutCompletedFixture({
      email: "new@example.com",
      modules: "2",
      productId: "modul_2",
      sessionId: "cs_pending",
    });

    await processStripeWebhookEvent(db as any, event);

    expect(db.$client.query).toHaveBeenCalledWith(
      expect.stringContaining("pending_purchases"),
      expect.arrayContaining(["new@example.com", "cs_pending", "2", "modul_2"]),
    );
  });

  it("ignores subscription checkout.session.completed events", async () => {
    processModulePurchase.mockClear();
    const db = createDb({ id: 1, enabledModules: "1" });
    await processStripeWebhookEvent(db as any, {
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_sub",
          metadata: { type: "renewal", modules: "1" },
          customer_email: "user@example.com",
        },
      },
    });
    expect(processModulePurchase).not.toHaveBeenCalled();
  });
});
