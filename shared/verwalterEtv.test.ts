import { describe, expect, it } from "vitest";
import {
  computeEtvFristen,
  decodeEtvMeta,
  encodeEtvBeschreibung,
  emptyEtvCheckliste,
  nextEtvPhase,
  subtractDaysFromIso,
} from "./verwalterEtv";

describe("verwalterEtv", () => {
  it("berechnet ETV-Fristen", () => {
    const f = computeEtvFristen("2026-07-01");
    expect(f.einladungSpaetestens).toBe(subtractDaysFromIso("2026-07-01", 21));
    expect(f.anfechtungBis).toBe("2026-07-31");
  });

  it("encodiert und decodiert ETV-Meta", () => {
    const meta = {
      phase: "einladung" as const,
      etvDatum: "2026-07-01",
      etvUhrzeit: "18:00",
      etvOrt: "Gemeinschaftsraum",
      tagesordnung: "TOP 1",
      beschluesse: [],
      checkliste: emptyEtvCheckliste(),
    };
    const encoded = encodeEtvBeschreibung("Summary", meta);
    const decoded = decodeEtvMeta(encoded);
    expect(decoded?.etvDatum).toBe("2026-07-01");
    expect(decoded?.phase).toBe("einladung");
  });

  it("nextEtvPhase folgt Workflow-Reihenfolge", () => {
    expect(nextEtvPhase("einladung")).toBe("durchgefuehrt");
    expect(nextEtvPhase("abgeschlossen")).toBeNull();
  });
});
