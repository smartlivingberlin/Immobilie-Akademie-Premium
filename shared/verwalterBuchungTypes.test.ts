import { describe, expect, it } from "vitest";
import {
  datumInPeriode,
  formatDatevBelegdatum,
  formatDatevBetrag,
  periodeFromDatum,
  validateBuchungInput,
} from "./verwalterBuchungTypes";

describe("verwalterBuchungTypes", () => {
  it("leitet Periode aus Datum ab", () => {
    expect(periodeFromDatum("2026-03-15")).toBe("2026-03");
    expect(datumInPeriode("2026-03-15", "2026-03")).toBe(true);
    expect(datumInPeriode("2026-03-15", "2026-04")).toBe(false);
  });

  it("formatiert DATEV-Felder", () => {
    expect(formatDatevBetrag(150.5)).toBe("150,50");
    expect(formatDatevBelegdatum("2026-06-08")).toBe("0806");
  });

  it("validiert Buchungsinput", () => {
    expect(
      validateBuchungInput({
        objektId: "o1",
        datum: "2026-01-10",
        betrag: 100,
        sollKonto: "1200",
        habenKonto: "8400",
        buchungstext: "Hausgeld",
      }),
    ).toBeNull();

    expect(
      validateBuchungInput({
        objektId: "",
        datum: "2026-01-10",
        betrag: 100,
        sollKonto: "1200",
        habenKonto: "8400",
        buchungstext: "x",
      }),
    ).toBeTruthy();
  });
});
