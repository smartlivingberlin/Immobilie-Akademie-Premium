import { describe, expect, it } from "vitest";
import {
  getPreviousQuarterRange,
  isQuarterlyPayoutDue,
} from "./partnerPayoutCron";

describe("partnerPayoutCron", () => {
  it("detects quarter start dates", () => {
    expect(isQuarterlyPayoutDue(new Date("2026-01-01T02:00:00"))).toBe(true);
    expect(isQuarterlyPayoutDue(new Date("2026-04-01T02:00:00"))).toBe(true);
    expect(isQuarterlyPayoutDue(new Date("2026-01-02T02:00:00"))).toBe(false);
    expect(isQuarterlyPayoutDue(new Date("2026-02-01T02:00:00"))).toBe(false);
  });

  it("returns previous quarter range on Jan 1", () => {
    expect(getPreviousQuarterRange(new Date("2026-01-01"))).toEqual({
      periodStart: "2025-10-01",
      periodEnd: "2025-12-31",
    });
  });

  it("returns previous quarter range on Apr 1", () => {
    expect(getPreviousQuarterRange(new Date("2026-04-01"))).toEqual({
      periodStart: "2026-01-01",
      periodEnd: "2026-03-31",
    });
  });
});
