import { describe, expect, it, vi, beforeEach } from "vitest";
import { PARTNER_PAYOUT_POLICY } from "../shared/partnerPayouts";

const transferCreate = vi.fn().mockResolvedValue({ id: "tr_test_123" });

vi.mock("stripe", () => ({
  default: class MockStripe {
    transfers = { create: transferCreate };
  },
}));

import { executeConnectTransfersForPendingLedger } from "./partnerConnectTransfer";

function createBatchDb(pendingIds: number[]) {
  const paid: number[] = [];
  return {
    paid,
    $client: {
      query: vi.fn(async (sql: string, params?: unknown[]) => {
        if (sql.includes("information_schema.TABLES")) {
          return [[{ c: 1 }]];
        }
        if (sql.includes("SELECT id FROM partner_payout_ledger") && sql.includes("status = 'pending'")) {
          return [pendingIds.map((id) => ({ id }))];
        }
        if (sql.includes("SELECT id, partnerUserId, commissionEur, status FROM partner_payout_ledger WHERE id = ?")) {
          const id = Number(params?.[0]);
          return [[{
            id,
            partnerUserId: 7,
            commissionEur: PARTNER_PAYOUT_POLICY.minPayoutEur + 10,
            status: "pending",
          }]];
        }
        if (sql.includes("SELECT stripeAccountId, payoutsEnabled")) {
          return [[{ stripeAccountId: "acct_test", payoutsEnabled: 1, status: "active" }]];
        }
        if (sql.includes("UPDATE partner_payout_ledger")) {
          paid.push(Number(params?.[1]));
          return [{ affectedRows: 1 }];
        }
        return [[]];
      }),
    },
  };
}

describe("executeConnectTransfersForPendingLedger", () => {
  beforeEach(() => {
    transferCreate.mockClear();
    process.env.STRIPE_SECRET_KEY = "sk_test_mock";
  });

  it("transfers all eligible pending ledger entries", async () => {
    const db = createBatchDb([1, 2]);
    const result = await executeConnectTransfersForPendingLedger(db as any);

    expect(result.transferred).toBe(2);
    expect(result.transfers).toHaveLength(2);
    expect(transferCreate).toHaveBeenCalledTimes(2);
    expect(db.paid).toEqual([1, 2]);
  });

  it("returns empty result when no pending entries exist", async () => {
    const db = createBatchDb([]);
    const result = await executeConnectTransfersForPendingLedger(db as any);

    expect(result.transferred).toBe(0);
    expect(result.errors).toHaveLength(0);
    expect(transferCreate).not.toHaveBeenCalled();
  });
});
