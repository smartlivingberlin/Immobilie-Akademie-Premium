import { describe, expect, it } from "vitest";
import { KI_FAIR_USE_POST_PATHS } from "../shared/kiFairUse";

describe("kiFairUseGate", () => {
  it("schützt Verwalter-KI-Endpunkte", () => {
    expect(KI_FAIR_USE_POST_PATHS).toContain("/api/verwalter/ki-brief");
    expect(KI_FAIR_USE_POST_PATHS).toContain("/api/verwalter/assistent");
    expect(KI_FAIR_USE_POST_PATHS).toContain("/api/verwalter/buchungen/vorschlagen");
  });

  it("schützt weiterhin /api/ai", () => {
    expect(KI_FAIR_USE_POST_PATHS).toContain("/api/ai");
  });
});
