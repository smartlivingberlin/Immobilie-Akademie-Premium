import { describe, expect, it } from "vitest";
import {
  addDaysToIso,
  buildMahnungVorgangSummary,
  decodeMahnungMeta,
  encodeMahnungBeschreibung,
  MAHNUNG_STUFEN,
  renderMahnungBrief,
  stufeFromSlug,
} from "./verwalterMahnwesen";

const sampleMeta = {
  stufe: 1 as const,
  einheitNr: "3",
  eigentuemerName: "Max Mustermann",
  betrag: 450,
  faelligSeit: "2026-05-01",
};

describe("verwalterMahnwesen", () => {
  it("maps slugs to stufen", () => {
    expect(stufeFromSlug("mahnung-stufe1")).toBe(1);
    expect(stufeFromSlug("mahnung-stufe3")).toBe(3);
    expect(stufeFromSlug("etv-einladung")).toBeNull();
  });

  it("adds days to iso date", () => {
    expect(addDaysToIso("2026-06-10", 14)).toBe("2026-06-24");
  });

  it("roundtrips mahnung meta in beschreibung", () => {
    const text = encodeMahnungBeschreibung("Kurztext", sampleMeta);
    expect(decodeMahnungMeta(text)?.eigentuemerName).toBe("Max Mustermann");
  });

  it("renders stufe 1 brief with placeholders filled", () => {
    const brief = renderMahnungBrief(1, sampleMeta, "WEG Muster", "Hausverwaltung GmbH");
    expect(brief).toContain("Max Mustermann");
    expect(brief).toContain("450");
    expect(brief).toContain("WEG Muster");
  });

  it("defines escalation chain 1→2→3", () => {
    expect(MAHNUNG_STUFEN[1].naechsteStufe).toBe(2);
    expect(MAHNUNG_STUFEN[2].naechsteStufe).toBe(3);
    expect(MAHNUNG_STUFEN[3].naechsteStufe).toBeUndefined();
  });

  it("builds human-readable summary", () => {
    const s = buildMahnungVorgangSummary(sampleMeta, 1);
    expect(s).toContain("Stufe 1/3");
    expect(s).toContain("Einheit 3");
  });
});
