import { describe, expect, it } from "vitest";
import {
  estimatePartnerPayoutEur,
  isPayoutEligible,
  PARTNER_PAYOUT_POLICY,
} from "./partnerPayouts";

describe("partnerPayouts", () => {
  it("calculates 15% commission on referrals", () => {
    const payout = estimatePartnerPayoutEur(2);
    expect(payout).toBe(44.7);
  });

  it("requires minimum payout threshold", () => {
    expect(isPayoutEligible(49)).toBe(false);
    expect(isPayoutEligible(50)).toBe(true);
  });
});
