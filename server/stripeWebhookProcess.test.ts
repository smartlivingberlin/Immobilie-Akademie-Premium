import { describe, expect, it, vi } from "vitest";
import { buildCheckoutCompletedFixture } from "../shared/stripeWebhookFixture";

const processModulePurchase = vi.fn();

vi.mock("./stripePurchaseHandler", () => ({
  processModulePurchase,
  processRenewalPayment: vi.fn(),
  processComplianceSubscription: vi.fn(),
  processRechenpraxisSubscription: vi.fn(),
  processVerwalterToolsSubscription: vi.fn(),
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

  it("processes invoice.paid for B2B via parent.subscription_details metadata", async () => {
    const { processB2bSubscription } = await import("./b2bPurchaseHandler");
    vi.mocked(processB2bSubscription).mockClear();
    const db = createDb({ id: 1, enabledModules: "" });
    await processStripeWebhookEvent(db as any, {
      id: "evt_invoice_b2b",
      type: "invoice.paid",
      data: {
        object: {
          id: "in_test",
          metadata: {},
          parent: {
            subscription_details: {
              metadata: {
                type: "b2b",
                planId: "starter",
                companyName: "bobo gmbh",
                userId: "1",
              },
            },
          },
          lines: { data: [{ metadata: {} }] },
        },
      },
    });
    expect(processB2bSubscription).toHaveBeenCalledWith(db, 1, "starter", "bobo gmbh");
  });

  it("processes invoice.paid for Verwalter Tools", async () => {
    const { processVerwalterToolsSubscription } = await import("./stripePurchaseHandler");
    vi.mocked(processVerwalterToolsSubscription).mockClear();
    const db = createDb({ id: 9, enabledModules: "" });
    await processStripeWebhookEvent(db as any, {
      id: "evt_invoice_vt",
      type: "invoice.paid",
      data: {
        object: {
          id: "in_vt",
          metadata: {
            type: "verwalter_tools",
            userId: "9",
          },
        },
      },
    });
    expect(processVerwalterToolsSubscription).toHaveBeenCalledWith(db, 9);
  });

  it("ignores subscription checkout.session.completed events", async () => {
    processModulePurchase.mockClear();
    const db = createDb({ id: 1, enabledModules: "1" });
    await processStripeWebhookEvent(db as any, {
      id: "evt_checkout_sub",
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
