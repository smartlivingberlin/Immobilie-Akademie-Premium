import { describe, expect, it, vi } from "vitest";
import { getVoucherStatuses } from "../server/voucherRedeem";

describe("voucherRedeem", () => {
  it("marks vouchers ineligible without referrals", async () => {
    const query = vi.fn()
      .mockResolvedValueOnce([[{ c: 1 }]])
      .mockResolvedValueOnce([[{ c: 0 }]])
      .mockResolvedValueOnce([[]]);

    const db = { $client: { query } };
    const statuses = await getVoucherStatuses(db, 1);

    expect(statuses.length).toBe(3);
    expect(statuses.every((s) => !s.eligible)).toBe(true);
    expect(statuses.every((s) => !s.redeemed)).toBe(true);
  });
});
