import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { resolveModuleContentPath } from "./contentPaths";
import {
  formatLessonText,
  paragraphsToDisplay,
  type AudioLesson,
} from "./audioLessonParser";
import { getModuleContentFiles, MODULE_CONTENT_FILES } from "./moduleContentRegistry";

export { MODULE_CONTENT_FILES };

type DayFields = {
  dayNumber: number;
  title: string;
  theory: string;
  extendedTheory: string;
  practice: string;
  task: string;
};

function extractField(block: string, field: string): string {
  const tick = new RegExp(`${field}:\\s*\`([\\s\\S]*?)\`\\s*,`, "m");
  const tickMatch = block.match(tick);
  if (tickMatch?.[1]) return tickMatch[1].trim();

  const quoted = new RegExp(`${field}:\\s*"((?:\\\\.|[^"\\\\])*)"`, "m");
  const quotedMatch = block.match(quoted);
  if (quotedMatch?.[1]) return quotedMatch[1].replace(/\\"/g, '"').trim();

  const single = new RegExp(`${field}:\\s*'((?:\\\\.|[^'\\\\])*)'`, "m");
  const singleMatch = block.match(single);
  if (singleMatch?.[1]) return singleMatch[1].replace(/\\'/g, "'").trim();

  return "";
}

function splitDayBlocks(raw: string): Array<{ dayNumber: number; block: string }> {
  const starts: Array<{ dayNumber: number; index: number }> = [];
  const re = /day_(\d+):\s*\{/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(raw)) !== null) {
    starts.push({ dayNumber: Number(match[1]), index: match.index });
  }
  return starts.map((start, i) => ({
    dayNumber: start.dayNumber,
    block: raw.slice(start.index, starts[i + 1]?.index ?? raw.length),
  }));
}

export function extractDaysFromModuleFile(filePath: string): DayFields[] {
  const abs = resolveModuleContentPath(filePath);
  if (!existsSync(abs)) return [];
  const raw = readFileSync(abs, "utf8");
  return splitDayBlocks(raw)
    .map(({ dayNumber, block }) => ({
      dayNumber,
      title: extractField(block, "title"),
      theory: extractField(block, "theory"),
      extendedTheory: extractField(block, "extendedTheory"),
      practice: extractField(block, "practice"),
      task: extractField(block, "task"),
    }))
    .filter((d) => d.title && (d.theory || d.extendedTheory));
}

function buildLessonBody(day: DayFields): { display: string; speech: string; paragraphs: string[] } {
  const allParagraphs: string[] = [];
  const speechParts: string[] = [];

  const addSection = (label: string | null, raw: string) => {
    if (!raw?.trim()) return;
    const { paragraphs, speech } = formatLessonText(raw);
    if (paragraphs.length === 0) return;
    if (label) {
      allParagraphs.push(label);
      speechParts.push(`${label}.`);
    }
    allParagraphs.push(...paragraphs);
    if (speech) speechParts.push(speech);
  };

  addSection(null, day.theory);
  addSection("Vertiefung", day.extendedTheory);
  addSection("Praxis", day.practice);
  addSection("Übung", day.task);

  return {
    paragraphs: allParagraphs,
    display: paragraphsToDisplay(allParagraphs),
    speech: speechParts.join(" "),
  };
}

function loadBundledModuleLessons(moduleId: number): AudioLesson[] {
  const candidates = [
    join(process.cwd(), "dist", "data", `module-lessons-${moduleId}.json`),
    join(dirname(fileURLToPath(import.meta.url)), "data", `module-lessons-${moduleId}.json`),
  ];
  for (const path of candidates) {
    if (!existsSync(path)) continue;
    try {
      const parsed = JSON.parse(readFileSync(path, "utf8")) as AudioLesson[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      /* try next */
    }
  }
  return [];
}

/** Lerntage aus Moduldateien (Dev) oder Build-Export dist/data/ (Production). */
export function getModuleLessons(moduleId: number): AudioLesson[] {
  const live = parseModuleDayLessons(moduleId);
  if (live.length > 0) return live;
  return loadBundledModuleLessons(moduleId);
}

export function parseModuleDayLessons(moduleId: number): AudioLesson[] {
  const files = getModuleContentFiles(moduleId);
  const byDay = new Map<number, DayFields>();

  for (const file of files) {
    for (const day of extractDaysFromModuleFile(file)) {
      const existing = byDay.get(day.dayNumber);
      if (!existing || day.theory.length > existing.theory.length) {
        byDay.set(day.dayNumber, day);
      }
    }
  }

  return [...byDay.entries()]
    .sort(([a], [b]) => a - b)
    .map(([dayNumber, day]) => {
      const body = buildLessonBody(day);
      const readAloudText = `${day.title}. ${body.speech}`;
      return {
        id: `${moduleId}-day-${dayNumber}`,
        title: day.title,
        moduleId,
        dayNumber,
        content: body.display,
        paragraphs: body.paragraphs,
        readAloudText,
        source: "module_day" as const,
      };
    })
    .filter((l) => l.content.length >= 40);
}
