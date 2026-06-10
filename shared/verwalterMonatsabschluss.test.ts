import { describe, expect, it } from "vitest";
import { abschlussFortschritt, buildMonatsabschluss } from "./verwalterMonatsabschluss";
import type { VerwalterObjekt } from "./verwalterObjektTypes";

const objekt: VerwalterObjekt = {
  id: "o1",
  name: "WEG",
  adresse: "A",
  plz: "1",
  ort: "B",
  einheitenAnzahl: 2,
  verwalterName: "V",
  verwalterAdresse: "V",
  einheiten: [{ id: "e1", nummer: "WE 1", mea: 50 }],
  createdAt: "",
  updatedAt: "",
};

describe("verwalterMonatsabschluss", () => {
  it("baut Checkliste mit Fortschritt", () => {
    const schritte = buildMonatsabschluss({
      objekt,
      buchungen: [
        {
          id: "b1",
          objektId: "o1",
          objektName: "WEG",
          datum: "2026-01-05",
          betrag: 100,
          sollKonto: "1200",
          habenKonto: "8400",
          buchungstext: "Hausgeld",
          periode: "2026-01",
          createdAt: "",
          updatedAt: "",
        },
      ],
      periode: "2026-01",
      openVorgaenge: 0,
      overdueVorgaenge: 0,
    });
    expect(schritte).toHaveLength(5);
    expect(abschlussFortschritt(schritte)).toBeGreaterThan(0);
  });
});
