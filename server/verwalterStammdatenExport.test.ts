import { describe, expect, it } from "vitest";
import { buildStammdatenCsv } from "./verwalterStammdatenExport";
import type { VerwalterObjekt } from "../shared/verwalterObjektTypes";

const baseObjekt: VerwalterObjekt = {
  id: "obj-1",
  name: "WEG Test",
  adresse: "Teststr. 1",
  plz: "10115",
  ort: "Berlin",
  einheitenAnzahl: 1,
  verwalterName: "HV GmbH",
  verwalterAdresse: "Berlin",
  einheiten: [
    { id: "e1", nummer: "WE 1", mea: 125, eigentuemerName: "Müller", flaecheQm: 65 },
  ],
  createdAt: "",
  updatedAt: "",
};

describe("verwalterStammdatenExport", () => {
  it("erzeugt CSV mit Header und Einheit", () => {
    const csv = buildStammdatenCsv([baseObjekt]);
    expect(csv.startsWith("\uFEFF")).toBe(true);
    expect(csv).toContain("objekt_id");
    expect(csv).toContain("WEG Test");
    expect(csv).toContain("WE 1");
    expect(csv).toContain("Müller");
  });

  it("exportiert Objekt ohne Einheiten", () => {
    const csv = buildStammdatenCsv([{ ...baseObjekt, einheiten: [] }]);
    const lines = csv.trim().split(/\r?\n/);
    expect(lines).toHaveLength(2);
  });
});
