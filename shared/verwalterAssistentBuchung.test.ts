import { describe, expect, it } from "vitest";
import { looksLikeBuchungsAnfrage } from "./verwalterAssistentBuchung";

describe("verwalterAssistentBuchung", () => {
  it("erkennt Buchungs-Anfragen", () => {
    expect(looksLikeBuchungsAnfrage("250 Euro Hausgeld WE 3")).toBe(true);
    expect(looksLikeBuchungsAnfrage("Buchung anlegen für Müller")).toBe(true);
    expect(looksLikeBuchungsAnfrage("Was ist §24 WEG?")).toBe(false);
  });
});
