import { describe, expect, it } from "vitest";
import { splitSpeechChunks } from "./use-speech";

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
});
