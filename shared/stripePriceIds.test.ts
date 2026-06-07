import { describe, expect, it, afterEach } from "vitest";
import {
  buildSubscriptionLineItem,
  getConfiguredStripePriceId,
  STRIPE_PRICE_ENV_KEYS,
} from "./stripePriceIds";

describe("stripePriceIds", () => {
  const orig = process.env.STRIPE_PRICE_RECHENPRAXIS_MONTHLY;

  afterEach(() => {
    if (orig) process.env.STRIPE_PRICE_RECHENPRAXIS_MONTHLY = orig;
    else delete process.env.STRIPE_PRICE_RECHENPRAXIS_MONTHLY;
  });

  it("uses price_data when no env price set", () => {
    delete process.env.STRIPE_PRICE_RECHENPRAXIS_MONTHLY;
    const item = buildSubscriptionLineItem("rechenpraxis_monthly", {
      currency: "eur",
      product_data: { name: "Test" },
      unit_amount: 1900,
      recurring: { interval: "month" },
    });
    expect("price_data" in item).toBe(true);
  });

  it("uses fixed price id when configured", () => {
    process.env.STRIPE_PRICE_RECHENPRAXIS_MONTHLY = "price_test123";
    expect(getConfiguredStripePriceId("rechenpraxis_monthly")).toBe("price_test123");
    const item = buildSubscriptionLineItem("rechenpraxis_monthly", {
      currency: "eur",
      product_data: { name: "Test" },
      unit_amount: 1900,
      recurring: { interval: "month" },
    });
    expect(item).toEqual({ price: "price_test123", quantity: 1 });
  });

  it("defines four price env keys", () => {
    expect(Object.keys(STRIPE_PRICE_ENV_KEYS).length).toBe(4);
  });
});
