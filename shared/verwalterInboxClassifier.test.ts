import { describe, expect, it } from "vitest";
import { classifyInboxEmail, buildVorgangTitelFromEmail } from "./verwalterInboxClassifier";

describe("verwalterInboxClassifier", () => {
  it("erkennt Schaden-Mails", () => {
    expect(classifyInboxEmail("Wasserschaden", "In Wohnung 3 ist Wasser")).toBe("schaden");
  });

  it("erkennt ETV-Mails", () => {
    expect(classifyInboxEmail("ETV Einladung", "Tagesordnung Punkt 1")).toBe("etv");
  });

  it("baut Vorgang-Titel", () => {
    expect(buildVorgangTitelFromEmail("schaden", "Wasserschaden")).toMatch(/Schaden/);
  });
});
