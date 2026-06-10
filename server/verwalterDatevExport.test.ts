import { describe, expect, it } from "vitest";
import { buildDatevBuchungenCsv } from "./verwalterDatevExport";
import type { VerwalterBuchung } from "../shared/verwalterBuchungTypes";

const sample: VerwalterBuchung = {
  id: "b1",
  objektId: "o1",
  objektName: "WEG Test",
  datum: "2026-06-08",
  betrag: 150,
  sollKonto: "1200",
  habenKonto: "8400",
  buchungstext: "Hausgeld WE 3",
  belegNr: "HG-001",
  periode: "2026-06",
  createdAt: "",
  updatedAt: "",
};

describe("verwalterDatevExport", () => {
  it("erzeugt EXTF-CSV mit DATEV-Feldern", () => {
    const csv = buildDatevBuchungenCsv([sample], { objektName: "WEG Test", periode: "2026-06" });
    expect(csv.startsWith("\uFEFF")).toBe(true);
    expect(csv).toContain("Umsatz");
    expect(csv).toContain("150,00");
    expect(csv).toContain("1200");
    expect(csv).toContain("8400");
    expect(csv).toContain("0806");
    expect(csv).toContain("Hausgeld WE 3");
    expect(csv).toContain("HG-001");
  });
});
