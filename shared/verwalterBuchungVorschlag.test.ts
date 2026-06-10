import { describe, expect, it } from "vitest";
import { parseBuchungFreitext } from "./verwalterBuchungVorschlag";
import type { VerwalterObjekt } from "./verwalterObjektTypes";

const objekt: VerwalterObjekt = {
  id: "o1",
  name: "WEG Test",
  adresse: "A",
  plz: "1",
  ort: "B",
  einheitenAnzahl: 1,
  verwalterName: "V",
  verwalterAdresse: "V",
  einheiten: [{ id: "e1", nummer: "WE 3", mea: 100, eigentuemerName: "Müller" }],
  createdAt: "",
  updatedAt: "",
};

describe("verwalterBuchungVorschlag", () => {
  it("erkennt Hausgeld mit Betrag und Einheit", () => {
    const v = parseBuchungFreitext("250 Euro Hausgeld WE 3 Müller", objekt);
    expect(v?.betrag).toBe(250);
    expect(v?.sollKonto).toBe("1200");
    expect(v?.habenKonto).toBe("8400");
    expect(v?.einheitId).toBe("e1");
    expect(v?.quelle).toBe("regel");
  });

  it("erkennt Nebenkosten", () => {
    const v = parseBuchungFreitext("NK 89,50 Heizkosten", objekt);
    expect(v?.sollKonto).toBe("4970");
    expect(v?.betrag).toBe(89.5);
  });
});
