import { describe, expect, it } from "vitest";
import { join } from "path";
import { cleanTextForSpeech, parseKnowledgeFile } from "./audioLessonParser";

describe("audioLessonParser", () => {
  const knowledgeDir = join(process.cwd(), "server/knowledge");

  it("parst Modul 1 mit Lerneinheit-Überschriften", () => {
    const lessons = parseKnowledgeFile(1, knowledgeDir);
    expect(lessons.length).toBeGreaterThan(5);
    expect(lessons[0].title).not.toMatch(/^Lerneinheit/i);
    expect(lessons[0].content.length).toBeGreaterThan(80);
  });

  it("parst Modul 2 mit direkten ###-Überschriften", () => {
    const lessons = parseKnowledgeFile(2, knowledgeDir);
    expect(lessons.length).toBeGreaterThan(20);
    expect(lessons.some((l) => l.title.includes("Makler"))).toBe(true);
  });

  it("bereinigt Markdown für Sprachausgabe", () => {
    const cleaned = cleanTextForSpeech("**Fett** und *kursiv*.\n\n---\n\n- Punkt");
    expect(cleaned).not.toContain("**");
    expect(cleaned).toContain("Fett");
  });
});
