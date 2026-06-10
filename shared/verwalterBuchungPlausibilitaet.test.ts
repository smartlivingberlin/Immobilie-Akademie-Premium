import { describe, expect, it } from "vitest";
import { hatPlausibilitaetsFehler, pruefeBuchungen } from "./verwalterBuchungPlausibilitaet";
import type { VerwalterBuchung } from "./verwalterBuchungTypes";
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

const base = (patch: Partial<VerwalterBuchung>): VerwalterBuchung => ({
  id: "b1",
  objektId: "o1",
  objektName: "WEG",
  datum: "2026-01-10",
  betrag: 100,
  sollKonto: "1200",
  habenKonto: "8400",
  buchungstext: "Hausgeld",
  periode: "2026-01",
  createdAt: "",
  updatedAt: "",
  ...patch,
});

describe("verwalterBuchungPlausibilitaet", () => {
  it("meldet Fehler bei gleichem Soll/Haben", () => {
    const h = pruefeBuchungen([base({ sollKonto: "1200", habenKonto: "1200" })], objekt, "2026-01");
    expect(hatPlausibilitaetsFehler(h)).toBe(true);
  });

  it("warnt ohne Hausgeld bei Einheiten", () => {
    const h = pruefeBuchungen([base({ sollKonto: "4970", habenKonto: "1200", buchungstext: "NK" })], objekt, "2026-01");
    expect(h.some((x) => x.code === "kein_hausgeld")).toBe(true);
  });
});
