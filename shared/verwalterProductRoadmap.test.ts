import { describe, expect, it } from "vitest";
import {
  HAUSVERWALTUNG_WORK_TYPES,
  VERWALTER_PRODUCT_ROADMAP,
} from "./verwalterProductRoadmap";

describe("verwalterProductRoadmap", () => {
  it("enthält mindestens einen now- und p1-Eintrag", () => {
    expect(VERWALTER_PRODUCT_ROADMAP.some((i) => i.phase === "now")).toBe(true);
    expect(VERWALTER_PRODUCT_ROADMAP.some((i) => i.phase === "p1")).toBe(true);
  });

  it("deckt zentrale Verwaltungs-Arbeitstypen ab", () => {
    expect(HAUSVERWALTUNG_WORK_TYPES.length).toBeGreaterThanOrEqual(8);
    const covered = VERWALTER_PRODUCT_ROADMAP.flatMap((i) => i.workTypes).join(" ");
    expect(covered).toMatch(/NK|Hausgeld|Nebenkosten/);
  });
});
