import { describe, expect, it } from "vitest";
import { B2B_API_ENDPOINTS, B2B_SMOKE_STEPS, B2B_TEST_CARD } from "./b2bTestGuide";

describe("b2bTestGuide", () => {
  it("defines smoke steps", () => {
    expect(B2B_SMOKE_STEPS.length).toBeGreaterThanOrEqual(7);
    expect(B2B_SMOKE_STEPS[1]).toContain("/fuer-maklerbueros");
  });

  it("reuses stripe test card", () => {
    expect(B2B_TEST_CARD.number).toContain("4242");
  });

  it("documents B2B API endpoints", () => {
    expect(B2B_API_ENDPOINTS.checkout).toContain("b2b-checkout");
  });
});
