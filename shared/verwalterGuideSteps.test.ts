import { describe, expect, it } from "vitest";
import { getGuideForPath } from "./verwalterGuideSteps";
import { getAssistentVorschlaege } from "./verwalterAssistentKnowledge";

describe("verwalterGuideSteps", () => {
  it("liefert Guide für Buchungen", () => {
    const g = getGuideForPath("/app/verwalter/buchungen");
    expect(g?.id).toBe("guide-buchungen");
  });

  it("liefert Vorschläge pro Seite", () => {
    const v = getAssistentVorschlaege("/app/verwalter/buchungen");
    expect(v.some((s) => s.includes("Soll"))).toBe(true);
  });
});
