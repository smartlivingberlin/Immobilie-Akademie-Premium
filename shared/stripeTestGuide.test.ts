import { describe, expect, it } from "vitest";
import { STRIPE_TEST_CARD, STRIPE_TEST_CHECKOUT_STEPS } from "./stripeTestGuide";

describe("stripeTestGuide", () => {
  it("provides test card", () => {
    expect(STRIPE_TEST_CARD.number).toContain("4242");
  });

  it("lists checkout smoke steps", () => {
    expect(STRIPE_TEST_CHECKOUT_STEPS.length).toBeGreaterThanOrEqual(4);
  });
});
