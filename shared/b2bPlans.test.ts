import { describe, expect, it } from "vitest";
import { B2B_PLANS, formatB2bModuleLabel, getB2bPlan } from "./b2bPlans";

describe("b2bPlans", () => {
  it("defines starter and professional", () => {
    expect(B2B_PLANS.starter.priceEur).toBe(199);
    expect(B2B_PLANS.professional.maxUsers).toBe(15);
  });

  it("resolves plan by id", () => {
    expect(getB2bPlan("starter")?.maxUsers).toBe(5);
    expect(getB2bPlan("invalid")).toBeNull();
  });

  it("formats module labels for landing", () => {
    expect(formatB2bModuleLabel("1,2")).toBe("2 Module frei wählbar");
    expect(formatB2bModuleLabel("1,2,3,4,5")).toBe("Alle 5 Module");
  });
});
