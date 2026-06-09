import { readFileSync } from "fs";
import { join } from "path";

export type AudioLesson = {
  id: string;
  title: string;
  moduleId: number;
  dayNumber: number;
  content: string;
};

const MAX_CONTENT_CHARS = 12_000;

/** Markdown für Vorlese-Modus bereinigen */
export function cleanTextForSpeech(raw: string): string {
  return raw
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/^---+$/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Parst server/knowledge/modul_X.txt in Audio-Lektionen.
 * Unterstützt „### Lerneinheit N“ + „### Titel“ (Modul 1) sowie direkte „### Titel“ (Module 2–5).
 */
export function parseKnowledgeFile(moduleId: number, baseDir?: string): AudioLesson[] {
  try {
    const filePath = join(baseDir ?? join(process.cwd(), "server/knowledge"), `modul_${moduleId}.txt`);
    const text = readFileSync(filePath, "utf8");
    const lines = text.split("\n");
    const lessons: AudioLesson[] = [];
    let i = 0;
    let dayNumber = 0;

    while (i < lines.length) {
      if (!lines[i].startsWith("### ")) {
        i++;
        continue;
      }

      let title = lines[i].slice(4).trim();
      i++;

      if (/^Lerneinheit\s+\d+$/i.test(title) && i < lines.length && lines[i].startsWith("### ")) {
        title = lines[i].slice(4).trim();
        i++;
      }

      const contentLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith("### ")) {
        contentLines.push(lines[i]);
        i++;
      }

      const content = cleanTextForSpeech(contentLines.join("\n"));
      if (content.length < 80) continue;

      dayNumber++;
      lessons.push({
        id: `${moduleId}-${dayNumber}`,
        title,
        moduleId,
        dayNumber,
        content: content.slice(0, MAX_CONTENT_CHARS),
      });
    }

    return lessons;
  } catch {
    return [];
  }
}

export function parseAllModuleLessons(moduleIds: number[]): AudioLesson[] {
  return moduleIds.flatMap((id) => parseKnowledgeFile(id));
}
