import { describe, expect, it } from "vitest";
import {
  hasWeiterbildungsnachweisAccess,
  isComplianceActive,
  COMPLIANCE_YEARLY_EUR,
} from "./compliance";

describe("compliance", () => {
  it("detects active compliance subscription", () => {
    expect(isComplianceActive("2030-01-01", new Date("2026-06-01"))).toBe(true);
    expect(isComplianceActive("2020-01-01", new Date("2026-06-01"))).toBe(false);
    expect(isComplianceActive(null)).toBe(false);
  });

  it("grants access for admin, modules, or compliance", () => {
    expect(hasWeiterbildungsnachweisAccess({ role: "admin", enabledModules: "" })).toBe(true);
    expect(hasWeiterbildungsnachweisAccess({ enabledModules: "2" })).toBe(true);
    expect(hasWeiterbildungsnachweisAccess({ enabledModules: "", complianceExpiresAt: "2030-01-01" })).toBe(true);
    expect(hasWeiterbildungsnachweisAccess({ enabledModules: "" })).toBe(false);
  });

  it("has competitive yearly price", () => {
    expect(COMPLIANCE_YEARLY_EUR).toBe(249);
  });
});
