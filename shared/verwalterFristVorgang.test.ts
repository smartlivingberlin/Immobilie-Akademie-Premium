import { describe, expect, it } from "vitest";
import { FRISTEN_CHECKLISTE } from "./verwalterFristen";
import {
  computeFaelligAm,
  fristCategoryToVorgangTyp,
  fristToVorgangInput,
} from "./verwalterFristVorgang";

describe("verwalterFristVorgang", () => {
  it("mappt Kategorien auf Vorgangstypen", () => {
    expect(fristCategoryToVorgangTyp("etv")).toBe("etv");
    expect(fristCategoryToVorgangTyp("mahnung")).toBe("mahnung");
  });

  it("berechnet Fälligkeitsdatum", () => {
    expect(computeFaelligAm("2026-01-01", 21)).toBe("2026-01-22");
    expect(computeFaelligAm("invalid", 10)).toBe("");
  });

  it("baut Vorgang-Input aus Frist", () => {
    const frist = FRISTEN_CHECKLISTE.find((f) => f.id === "etv-einladung")!;
    const input = fristToVorgangInput(frist, { objektId: "obj-1", startDate: "2026-06-01" });
    expect(input.objektId).toBe("obj-1");
    expect(input.typ).toBe("etv");
    expect(input.titel).toBe("ETV-Einladungsfrist");
    expect(input.faelligAm).toBe("2026-06-22");
    expect(input.relatedVorlageSlug).toBe("etv-einladung");
  });
});
