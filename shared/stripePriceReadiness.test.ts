import { describe, expect, it, afterEach } from "vitest";
import { getStripePriceReadiness } from "./stripePriceReadiness";

describe("stripePriceReadiness", () => {
  const saved: Record<string, string | undefined> = {};

  afterEach(() => {
    for (const [key, val] of Object.entries(saved)) {
      if (val === undefined) delete process.env[key];
      else process.env[key] = val;
    }
  });

  it("reports seven subscription slots", () => {
    const r = getStripePriceReadiness();
    expect(r.subscriptions.total).toBe(7);
    expect(r.modules.total).toBe(12);
  });

  it("detects configured subscription price", () => {
    saved.STRIPE_PRICE_B2B_STARTER = process.env.STRIPE_PRICE_B2B_STARTER;
    process.env.STRIPE_PRICE_B2B_STARTER = "price_b2b_test";
    const r = getStripePriceReadiness();
    expect(r.subscriptions.configured).toBeGreaterThanOrEqual(1);
    expect(r.subscriptions.missing).not.toContain("b2b_starter");
  });
});
