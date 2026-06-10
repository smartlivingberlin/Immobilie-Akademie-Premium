import { Router } from "express";
import { requireAuth } from "./authMiddleware";
import { parseKnowledgeFile, type AudioLesson } from "./audioLessonParser";
import { getModuleLessons } from "./moduleDayExtractor";
import { getExpectedDayCount, getModuleContentHash, MODULE_CONTENT_REGISTRY } from "./moduleContentRegistry";
import { readKursbuchPipelineCache, writeKursbuchPipelineCache } from "./generatorFileCache";
import { askClaudeWithContinuation, mapWithConcurrency } from "./kursbuchClaude";

const router = Router();
const PIPELINE_VERSION = "v1";
const PARALLEL_JOBS = 3;

const SYSTEM =
  "Du bist erfahrener IHK-Dozent und Fachautor für Immobilienwirtschaft in Deutschland. Schreibe präzises Markdown.";

type FormatId = "kursbuch" | "zusammenfassung" | "skript";

const FORMAT_CONFIG: Record<
  FormatId,
  { daysPerJob: number; mapTokens: number; reduceTokens: number; label: string }
> = {
  kursbuch: { daysPerJob: 1, mapTokens: 6000, reduceTokens: 4000, label: "Kursbuch" },
  zusammenfassung: { daysPerJob: 2, mapTokens: 3000, reduceTokens: 6000, label: "Lernzusammenfassung" },
  skript: { daysPerJob: 1, mapTokens: 4000, reduceTokens: 4000, label: "Lernkontroll-Skript" },
};

type DayMapResult = {
  dayNumbers: number[];
  markdown: string;
  complete: boolean;
};

function chunkLessons(lessons: AudioLesson[], size: number): AudioLesson[][] {
  const chunks: AudioLesson[][] = [];
  for (let i = 0; i < lessons.length; i += size) {
    chunks.push(lessons.slice(i, i + size));
  }
  return chunks;
}

function mapPrompt(format: FormatId, moduleName: string, lessons: AudioLesson[]): string {
  const block = lessons
    .map((l) => `### Tag ${l.dayNumber}: ${l.title}\n\n${l.content}`)
    .join("\n\n---\n\n");

  const hints: Record<FormatId, string> = {
    kursbuch:
      "Erstelle EIN vollständiges Kapitel pro Lerntag: Theorie, Praxisbeispiel (Deutschland), Merkkasten. Markdown mit ## und ###. Nichts kürzen.",
    zusammenfassung:
      "Fasse die Lerntage kompakt zusammen: Kernbegriffe, Paragraphen, Merksätze. Markdown mit ## und ###.",
    skript:
      "Erstelle 3–5 praxisnahe Frage-Antwort-Paare mit Musterlösungen pro Lerntag. Markdown mit ## und ###.",
  };

  return [
    `Modul: ${moduleName}`,
    hints[format],
    `Verarbeite ALLE ${lessons.length} Lerntage vollständig.`,
    "",
    "LERNINHALTE:",
    block,
  ].join("\n");
}

async function mapDayGroup(
  format: FormatId,
  moduleName: string,
  lessons: AudioLesson[],
): Promise<DayMapResult> {
  const cfg = FORMAT_CONFIG[format];
  const result = await askClaudeWithContinuation(
    SYSTEM,
    mapPrompt(format, moduleName, lessons),
    cfg.mapTokens,
    2,
  );
  return {
    dayNumbers: lessons.map((l) => l.dayNumber),
    markdown: result.text.trim(),
    complete: result.complete,
  };
}

async function reduceZusammenfassung(moduleName: string, sections: string[]): Promise<string> {
  const joined = sections.join("\n\n---\n\n").slice(0, 120000);
  const result = await askClaudeWithContinuation(
    SYSTEM,
    [
      `Modul: ${moduleName}`,
      "Fasse die folgenden Tag-Zusammenfassungen zu EINEM kohärenten Dokument zusammen.",
      "Struktur: 1) Die wichtigsten Begriffe 2) Paragraphen-Übersicht 3) Merksätze 4) Prüfungstipps.",
      "Markdown mit # ## ###. Nichts erfinden — nur aus dem Input.",
      "",
      joined,
    ].join("\n"),
    FORMAT_CONFIG.zusammenfassung.reduceTokens,
    1,
  );
  return result.text.trim();
}

async function generateIntro(moduleName: string, format: FormatId, dayCount: number): Promise<string> {
  if (format !== "kursbuch") return "";
  const result = await askClaudeWithContinuation(
    SYSTEM,
    `Schreibe ein kurzes Vorwort (200–300 Wörter) und Lernziele für ein Kursbuch zum Modul „${moduleName}“ (${dayCount} Lerntage). Markdown mit ## Vorwort und ## Lernziele.`,
    1500,
    0,
  );
  return result.text.trim();
}

async function generateOutro(moduleName: string, format: FormatId): Promise<string> {
  if (format !== "kursbuch" && format !== "skript") return "";
  const label = format === "skript" ? "Prüfungsvorbereitung" : "Zusammenfassung und Prüfungsvorbereitung";
  const result = await askClaudeWithContinuation(
    SYSTEM,
    `Schreibe einen abschließenden Abschnitt „${label}“ für das Modul „${moduleName}“. Markdown mit ##. 300–500 Wörter, IHK-Niveau.`,
    2000,
    1,
  );
  return result.text.trim();
}

function stitchDocument(
  format: FormatId,
  moduleName: string,
  intro: string,
  sections: DayMapResult[],
  outro: string,
  reduced?: string,
): string {
  const title = FORMAT_CONFIG[format].label;
  const incomplete = sections.filter((s) => !s.complete).length;
  const meta = `> KI-Pipeline ${PIPELINE_VERSION} · ${sections.length} Blöcke · ${incomplete > 0 ? `${incomplete} ggf. gekürzt` : "vollständig"}`;

  if (format === "zusammenfassung" && reduced) {
    return `# ${title}: ${moduleName}\n\n${meta}\n\n${reduced}\n`;
  }

  const body = sections.map((s) => s.markdown).join("\n\n---\n\n");
  const parts = [`# ${title}: ${moduleName}`, meta];
  if (intro) parts.push(intro);
  parts.push(body);
  if (outro) parts.push(outro);
  return parts.join("\n\n") + "\n";
}

router.post("/api/ai/generate-kursbuch-pipeline", requireAuth, async (req, res) => {
  try {
    const moduleId = Number(req.body?.moduleId);
    const format = (String(req.body?.format || "kursbuch") as FormatId);
    const forceRegenerate = Boolean(req.body?.forceRegenerate);

    if (!moduleId || moduleId < 1 || moduleId > 5) {
      return res.status(400).json({ error: "moduleId 1–5 erforderlich" });
    }
    if (!FORMAT_CONFIG[format]) {
      return res.status(400).json({ error: "format muss kursbuch, zusammenfassung oder skript sein" });
    }

    const contentHash = getModuleContentHash(moduleId);

    if (!forceRegenerate) {
      const cached = readKursbuchPipelineCache(moduleId, format, contentHash);
      if (cached) return res.json(cached);
    }

    let lessons = getModuleLessons(moduleId);
    if (lessons.length === 0) lessons = parseKnowledgeFile(moduleId);
    if (lessons.length === 0) {
      return res.status(404).json({ error: "Keine Lerntage gefunden" });
    }

    const moduleName = MODULE_CONTENT_REGISTRY[moduleId]?.name || `Modul ${moduleId}`;
    const expected = getExpectedDayCount(moduleId);
    const cfg = FORMAT_CONFIG[format];
    const groups = chunkLessons(lessons, cfg.daysPerJob);

    const intro = await generateIntro(moduleName, format, lessons.length);

    const sections = await mapWithConcurrency(groups, PARALLEL_JOBS, (group) =>
      mapDayGroup(format, moduleName, group),
    );

    let reduced: string | undefined;
    if (format === "zusammenfassung") {
      reduced = await reduceZusammenfassung(
        moduleName,
        sections.map((s) => s.markdown),
      );
    }

    const outro = await generateOutro(moduleName, format);
    const content = stitchDocument(format, moduleName, intro, sections, outro, reduced);

    const incompleteBlocks = sections.filter((s) => !s.complete).length;
    const daysCovered = new Set(sections.flatMap((s) => s.dayNumbers)).size;

    const payload = {
      success: true,
      content,
      moduleId,
      moduleName,
      format,
      daysExtracted: lessons.length,
      daysExpected: expected,
      daysCovered,
      blocksProcessed: sections.length,
      incompleteBlocks,
      pipeline: PIPELINE_VERSION,
      contentHash,
      generatedAt: new Date().toISOString(),
      fromCache: false,
      pipelined: true,
    };

    writeKursbuchPipelineCache(moduleId, format, contentHash, payload);
    res.json(payload);
  } catch (e: any) {
    res.status(500).json({ error: e.message || "Pipeline-Generierung fehlgeschlagen" });
  }
});

export { router as kursbuchPipelineRouter };
