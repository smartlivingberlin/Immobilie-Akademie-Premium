import { describe, expect, it } from "vitest";
import { isVorgangOverdue, VORGANG_TYP_VORLAGE } from "./verwalterVorgangTypes";
import type { VerwalterVorgang } from "./verwalterVorgangTypes";

describe("verwalterVorgangTypes", () => {
  it("isVorgangOverdue erkennt überfällige offene Vorgänge", () => {
    const base: VerwalterVorgang = {
      id: "1",
      objektId: "o",
      objektName: "WEG",
      typ: "mahnung",
      titel: "Test",
      status: "offen",
      createdAt: "",
      updatedAt: "",
    };
    expect(isVorgangOverdue({ ...base, faelligAm: "2020-01-01" })).toBe(true);
    expect(isVorgangOverdue({ ...base, faelligAm: "2099-12-31" })).toBe(false);
    expect(isVorgangOverdue({ ...base, faelligAm: "2020-01-01", status: "erledigt" })).toBe(false);
    expect(isVorgangOverdue(base)).toBe(false);
  });

  it("VORGANG_TYP_VORLAGE verknüpft Typen mit Vorlagen", () => {
    expect(VORGANG_TYP_VORLAGE.mahnung).toBe("mahnung-stufe1");
    expect(VORGANG_TYP_VORLAGE.etv).toBe("etv-einladung");
  });
});
