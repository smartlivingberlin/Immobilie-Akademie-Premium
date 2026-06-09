import { describe, expect, it } from "vitest";
import { getWrongAnswerFeedback } from "./rechenpraxisErrorCatalog";

describe("rechenpraxisErrorCatalog", () => {
  const schritt = {
    formel: "Monatliches Hausgeld = Jahresanteil ÷ 12",
    korrekt: 400,
    toleranz: 0.01,
    einheit: "€",
    variablen: [{ kuerzel: "J", bedeutung: "Jahresanteil", wert: "4.800 €" }],
  };

  it("erkennt Monats/Jahres-Verwechslung", () => {
    const fb = getWrongAnswerFeedback(schritt, "4800", "WEG-Hausgeld & Abrechnung");
    expect(fb.message).toContain("Monats- und Jahresbetrag");
    expect(fb.moduleHref).toBe("/modul/3");
  });

  it("erkennt Prozent/Dezimal-Verwechslung", () => {
    const fb = getWrongAnswerFeedback(
      { formel: "MEA", korrekt: 0.1, einheit: "%", variablen: [] },
      "10",
    );
    expect(fb.message).toContain("Prozent");
  });

  it("liefert Modul-Link für WEG-Bereich", () => {
    const fb = getWrongAnswerFeedback(schritt, "99999", "WEG-Hausgeld & Abrechnung");
    expect(fb.moduleLabel).toContain("Modul 3");
  });
});
