import { readFileSync } from "fs";
import { join } from "path";
import { resolveKnowledgeDir } from "./contentPaths";

export type AudioLesson = {
  id: string;
  title: string;
  moduleId: number;
  dayNumber: number;
  /** Anzeige mit Absätzen (Doppel-Zeilenumbruch) */
  content: string;
  /** Absätze für strukturierte Darstellung */
  paragraphs: string[];
  /** Exakt dieser String wird vorgelesen (Titel + Inhalt) */
  readAloudText: string;
  source?: "module_day" | "knowledge";
};

const MAX_CONTENT_CHARS = 12_000;

/** Entfernt eingebettete Code-/Task-Blöcke aus Modul-TS-Template-Strings */
export function stripModuleCodeArtifacts(raw: string): string {
  const lines = raw.split("\n");
  const out: string[] = [];
  let inCodeBlock = false;
  let inTasksBlock = false;
  let braceDepth = 0;

  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    if (/^\s*tasks:\s*\[/.test(line)) {
      inTasksBlock = true;
      braceDepth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      continue;
    }
    if (inTasksBlock) {
      braceDepth += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      if (/^\s*\],?\s*$/.test(t) && braceDepth <= 0) inTasksBlock = false;
      continue;
    }

    if (/^\s*(type|question|hint):\s*/.test(t)) continue;
    if (/^\s*as const\b/.test(t)) continue;
    if (/^\s*\{\s*$/.test(t) && /question|hint|type/.test(raw)) continue;

    out.push(line);
  }
  return out.join("\n");
}

/** Markdown → lesbare Absätze (für Anzeige und Lernmaterial) */
export function markdownToParagraphs(raw: string): string[] {
  const cleaned = stripModuleCodeArtifacts(raw)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/```[\s\S]*?```/g, "\n");

  const blocks: string[] = [];
  let current: string[] = [];

  const flush = () => {
    if (current.length === 0) return;
    const text = current
      .map((l) =>
        l
          .replace(/^#{1,6}\s+/, "")
          .replace(/^\s*[-*]\s+/, "• ")
          .replace(/\*\*([^*]+)\*\*/g, "$1")
          .replace(/\*([^*]+)\*/g, "$1")
          .replace(/`([^`]+)`/g, "$1")
          .trim(),
      )
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length > 2) blocks.push(text);
    current = [];
  };

  for (const line of cleaned.split("\n")) {
    const t = line.trim();
    if (!t || /^---+$/.test(t)) {
      flush();
      continue;
    }
    if (/^#{1,6}\s+/.test(t)) {
      flush();
      current.push(t);
      flush();
      continue;
    }
    if (/^\d+\.\s+/.test(t) && current.length > 0) flush();
    current.push(t);
  }
  flush();
  return blocks;
}

export function paragraphsToDisplay(paragraphs: string[]): string {
  return paragraphs.join("\n\n");
}

export function paragraphsToSpeech(paragraphs: string[]): string {
  return paragraphs.join(" ");
}

export function formatLessonText(raw: string): { paragraphs: string[]; display: string; speech: string } {
  const paragraphs = markdownToParagraphs(raw);
  return {
    paragraphs,
    display: paragraphsToDisplay(paragraphs),
    speech: paragraphsToSpeech(paragraphs),
  };
}

/** Markdown für Vorlese-Modus bereinigen (Abwärtskompatibel) */
export function cleanTextForSpeech(raw: string): string {
  return formatLessonText(raw).speech;
}

/**
 * Parst server/knowledge/modul_X.txt in Audio-Lektionen.
 * Unterstützt „### Lerneinheit N“ + „### Titel“ (Modul 1) sowie direkte „### Titel“ (Module 2–5).
 */
export function parseKnowledgeFile(moduleId: number, baseDir?: string): AudioLesson[] {
  try {
    const filePath = join(baseDir ?? resolveKnowledgeDir(), `modul_${moduleId}.txt`);
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

      const formatted = formatLessonText(contentLines.join("\n"));
      if (formatted.speech.length < 80) continue;

      dayNumber++;
      const display = formatted.display.slice(0, MAX_CONTENT_CHARS);
      const paragraphs = formatted.paragraphs.slice(0, 80);
      lessons.push({
        id: `${moduleId}-k-${dayNumber}`,
        title,
        moduleId,
        dayNumber,
        content: display,
        paragraphs,
        readAloudText: `${title}. ${formatted.speech.slice(0, MAX_CONTENT_CHARS)}`,
        source: "knowledge",
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
