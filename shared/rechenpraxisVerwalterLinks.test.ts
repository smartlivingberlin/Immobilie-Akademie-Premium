import { describe, expect, it } from "vitest";
import { getRechenpraxisVerwalterLinks, hasVerwalterBezug } from "./rechenpraxisVerwalterLinks";

describe("rechenpraxisVerwalterLinks", () => {
  it("liefert WEG-Links mit Mahnung bei Rückstand", () => {
    const links = getRechenpraxisVerwalterLinks({
      id: 134,
      bereich: "WEG-Hausgeld & Abrechnung",
      titel: "Hausgeld-Rückstand berechnen",
      berufssituation: "Eigentümer schuldet Hausgeld",
    });
    expect(hasVerwalterBezug({ id: 1, bereich: "WEG-Hausgeld & Abrechnung", titel: "x", berufssituation: "y" })).toBe(true);
    expect(links.some((l) => l.href.includes("mahnung"))).toBe(true);
    expect(links.some((l) => l.href.includes("buchungen"))).toBe(true);
  });

  it("keine Links für reine Makler-Aufgabe", () => {
    expect(
      hasVerwalterBezug({
        id: 1,
        bereich: "Maklercourtage & Provision",
        titel: "Courtage",
        berufssituation: "Makler",
      }),
    ).toBe(false);
  });
});
