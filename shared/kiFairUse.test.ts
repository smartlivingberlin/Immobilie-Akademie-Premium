import { describe, expect, it } from "vitest";
import {
  isRenewalKiTier,
  KI_RENEWAL_DAILY_LIMIT,
  KI_TIER_FULL,
  KI_TIER_RENEWAL,
} from "./kiFairUse";

describe("kiFairUse", () => {
  it("identifies renewal tier", () => {
    expect(isRenewalKiTier(KI_TIER_RENEWAL)).toBe(true);
    expect(isRenewalKiTier(KI_TIER_FULL)).toBe(false);
    expect(isRenewalKiTier(null)).toBe(false);
  });

  it("uses 50 messages per day for renewal", () => {
    expect(KI_RENEWAL_DAILY_LIMIT).toBe(50);
  });
});
