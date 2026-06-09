import { describe, expect, it } from "vitest";
import { preparePronunciation, splitSpeechChunks } from "./use-speech";

describe("splitSpeechChunks", () => {
  it("splittet nicht bei z.B.", () => {
    const chunks = splitSpeechChunks(
      "Analyse einer Marktstudie (z.B. IVD, Bulwiengesa). Nächster Satz folgt.",
    );
    expect(chunks.some((c) => c.includes("z.B.") || c.includes("IVD"))).toBe(true);
    expect(chunks.filter((c) => c === "B." || c.endsWith("(z.")).length).toBe(0);
  });

  it("trennt echte Satzgrenzen", () => {
    const chunks = splitSpeechChunks("Erster Satz. Zweiter Satz.");
    expect(chunks.length).toBeGreaterThanOrEqual(2);
  });

  it("behält WEG und § in der Anzeige", () => {
    const chunks = splitSpeechChunks("§ 24 WEG regelt die Einberufung. Die ETV ist zentral.");
    expect(chunks.join(" ")).toContain("WEG");
    expect(chunks.join(" ")).toContain("§ 24");
    expect(chunks.join(" ")).not.toContain("Weh-Eh-Geh");
    expect(chunks.join(" ")).not.toContain("Paragraph 24");
  });
});

describe("preparePronunciation", () => {
  it("wandelt nur für Sprachausgabe", () => {
    const spoken = preparePronunciation("§ 24 WEG");
    expect(spoken).toContain("Paragraph 24");
    expect(spoken).toContain("Weh-Eh-Geh");
    expect(spoken).not.toContain("§");
  });
});
