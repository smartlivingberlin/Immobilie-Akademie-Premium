import { describe, expect, it } from "vitest";
import {
  computeAccessExpiry,
  daysUntilAccessExpiry,
  includedMonthsForPurchase,
  isAccessExpired,
} from "./accessPolicy";

describe("accessPolicy", () => {
  it("includes double learning window per product", () => {
    expect(includedMonthsForPurchase("modul_2", "2")).toBe(8);
    expect(includedMonthsForPurchase("komplett", "1,2,3,4,5")).toBe(20);
  });

  it("extends from current expiry when still active", () => {
    const current = new Date("2026-12-01");
    const next = computeAccessExpiry(current, 4, new Date("2026-06-01"));
    expect(next.getFullYear()).toBe(2027);
    expect(next.getMonth()).toBe(3);
  });

  it("detects expired access", () => {
    expect(isAccessExpired("2020-01-01", new Date("2026-06-01"))).toBe(true);
    expect(isAccessExpired(null)).toBe(false);
  });

  it("counts days until expiry", () => {
    const ref = new Date("2026-06-01");
    expect(daysUntilAccessExpiry(null, ref)).toBe(null);
    expect(daysUntilAccessExpiry("2020-01-01", ref)).toBe(null);
    expect(daysUntilAccessExpiry("2026-06-11", ref)).toBe(10);
  });
});
