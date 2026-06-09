import { describe, expect, it } from "vitest";
import { join } from "path";
import {
  cleanTextForSpeech,
  formatLessonText,
  markdownToParagraphs,
  parseKnowledgeFile,
  stripModuleCodeArtifacts,
} from "./audioLessonParser";

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

  it("erhält Absätze statt Textwand", () => {
    const raw = "# Überschrift\n\nErster Absatz.\n\n## Zweiter Block\n\n- Punkt A\n- Punkt B";
    const { paragraphs, display } = formatLessonText(raw);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    expect(display).toContain("\n\n");
  });

  it("entfernt Task-Code-Artefakte aus Modul-Strings", () => {
    const raw = `
# Thema
Normaler Text.

tasks: [
  { type: "reflection" as const, question: "foo", hint: "bar" }
],
# Praxis-Tipp
Echter Inhalt.
`;
    const stripped = stripModuleCodeArtifacts(raw);
    expect(stripped).not.toContain("tasks:");
    expect(stripped).not.toContain("question:");
    expect(stripped).toContain("Praxis-Tipp");
    const paras = markdownToParagraphs(raw);
    expect(paras.some((p) => p.includes("Normaler Text"))).toBe(true);
    expect(paras.some((p) => p.includes("Echter Inhalt"))).toBe(true);
  });
});
