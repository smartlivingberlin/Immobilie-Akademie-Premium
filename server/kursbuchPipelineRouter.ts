import { Router } from "express";
import { requireAuth } from "./authMiddleware";
import { parseKnowledgeFile, type AudioLesson } from "./audioLessonParser";
import { getModuleLessons } from "./moduleDayExtractor";
import { getExpectedDayCount, getModuleContentHash, MODULE_CONTENT_REGISTRY } from "./moduleContentRegistry";
import { readKursbuchPipelineCache, writeKursbuchPipelineCache } from "./generatorFileCache";
import { mapWithConcurrency } from "./kursbuchClaude";
import { askLlmWithContinuation } from "./kursbuchLlm";
import {
  createJob,
  findRunningJob,
  loadJob,
  saveJob,
  type DayJobResult,
  type PipelineJobState,
} from "./kursbuchPipelineJob";
import { validateDayOutput } from "./kursbuchPipelineValidation";

const router = Router();
const PIPELINE_VERSION = "v2";
const PARALLEL_JOBS = 3;
const BATCH_SIZE = 6;
const MAX_RETRIES = 3;
const MAX_CONTINUATIONS = 5;

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

function lessonToDraftMarkdown(format: FormatId, lessons: AudioLesson[]): string {
  return lessons
    .map((l) => {
      const prefix =
        format === "skript"
          ? `## Tag ${l.dayNumber}: ${l.title}\n\n**Fragen & Antworten (Entwurf)**\n\n`
          : `## Tag ${l.dayNumber}: ${l.title}\n\n`;
      return `${prefix}${l.content}`;
    })
    .join("\n\n---\n\n");
}

async function mapDayGroupWithRetry(
  format: FormatId,
  moduleName: string,
  lessons: AudioLesson[],
): Promise<DayJobResult> {
  const cfg = FORMAT_CONFIG[format];
  const dayNumbers = lessons.map((l) => l.dayNumber);
  let lastMarkdown = "";
  let lastComplete = false;
  let lastProvider = "none";
  let attempts = 0;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    attempts = attempt;
    try {
      const result = await askLlmWithContinuation(
        SYSTEM,
        mapPrompt(format, moduleName, lessons),
        cfg.mapTokens,
        MAX_CONTINUATIONS,
      );
      lastMarkdown = result.text.trim();
      lastComplete = result.complete;
      lastProvider = result.provider;

      const valid = validateDayOutput(lastMarkdown, dayNumbers);
      if (valid && result.complete) {
        return {
          dayNumbers,
          markdown: lastMarkdown,
          complete: true,
          source: attempt > 1 ? "retry" : "ai",
          provider: result.provider,
          attempts,
        };
      }
    } catch (e) {
      console.error(
        JSON.stringify({
          level: "warn",
          msg: "[pipeline] mapDayGroup Versuch fehlgeschlagen",
          attempt,
          days: dayNumbers,
          error: (e as Error).message,
        }),
      );
    }
  }

  if (lastMarkdown && validateDayOutput(lastMarkdown, dayNumbers, 80)) {
    return {
      dayNumbers,
      markdown: lastMarkdown,
      complete: lastComplete,
      source: "retry",
      provider: lastProvider,
      attempts,
    };
  }

  return {
    dayNumbers,
    markdown: lessonToDraftMarkdown(format, lessons),
    complete: true,
    source: "draft",
    provider: "draft",
    attempts,
  };
}

async function reduceZusammenfassung(moduleName: string, sections: string[]): Promise<string> {
  const joined = sections.join("\n\n---\n\n").slice(0, 120000);
  const result = await askLlmWithContinuation(
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
    3,
  );
  return result.text.trim();
}

async function generateIntro(moduleName: string, format: FormatId, dayCount: number): Promise<string> {
  if (format !== "kursbuch") return "";
  const result = await askLlmWithContinuation(
    SYSTEM,
    `Schreibe ein kurzes Vorwort (200–300 Wörter) und Lernziele für ein Kursbuch zum Modul „${moduleName}“ (${dayCount} Lerntage). Markdown mit ## Vorwort und ## Lernziele.`,
    1500,
    2,
  );
  return result.text.trim();
}

async function generateOutro(moduleName: string, format: FormatId): Promise<string> {
  if (format !== "kursbuch" && format !== "skript") return "";
  const label = format === "skript" ? "Prüfungsvorbereitung" : "Zusammenfassung und Prüfungsvorbereitung";
  const result = await askLlmWithContinuation(
    SYSTEM,
    `Schreibe einen abschließenden Abschnitt „${label}“ für das Modul „${moduleName}“. Markdown mit ##. 300–500 Wörter, IHK-Niveau.`,
    2000,
    2,
  );
  return result.text.trim();
}

function stitchDocument(
  format: FormatId,
  moduleName: string,
  intro: string,
  sections: DayJobResult[],
  outro: string,
  reduced?: string,
): string {
  const title = FORMAT_CONFIG[format].label;
  const draftCount = sections.filter((s) => s.source === "draft").length;
  const aiIncomplete = sections.filter((s) => s.source === "ai" && !s.complete).length;
  const meta =
    draftCount > 0 || aiIncomplete > 0
      ? `> KI-Pipeline ${PIPELINE_VERSION} · ${sections.length} Blöcke · ${draftCount} Entwurf-Fallback · ${aiIncomplete} ggf. gekürzt`
      : `> KI-Pipeline ${PIPELINE_VERSION} · ${sections.length} Blöcke · vollständig`;

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

function jobProgress(job: PipelineJobState) {
  const daysCovered = new Set(job.dayResults.flatMap((s) => s.dayNumbers)).size;
  const draftFallbacks = job.dayResults.filter((s) => s.source === "draft").length;
  const incompleteBlocks = job.dayResults.filter((s) => !s.complete && s.source !== "draft").length;
  return {
    jobId: job.jobId,
    status: job.status,
    processedGroups: job.processedGroups,
    totalGroups: job.totalGroups,
    daysCovered,
    daysExtracted: job.daysExtracted,
    daysExpected: job.daysExpected,
    draftFallbacks,
    incompleteBlocks,
    percent: job.totalGroups > 0 ? Math.round((job.processedGroups / job.totalGroups) * 100) : 0,
  };
}

async function processJobBatch(
  job: PipelineJobState,
  groups: AudioLesson[][],
  format: FormatId,
): Promise<PipelineJobState> {
  const startIdx = job.processedGroups;
  const endIdx = Math.min(startIdx + BATCH_SIZE, groups.length);
  const batch = groups.slice(startIdx, endIdx);

  if (batch.length === 0) return job;

  const results = await mapWithConcurrency(batch, PARALLEL_JOBS, (group) =>
    mapDayGroupWithRetry(format, job.moduleName, group),
  );

  job.dayResults.push(...results);
  job.processedGroups = endIdx;

  if (job.processedGroups >= job.totalGroups) {
    try {
      if (format === "kursbuch" && !job.intro) {
        job.intro = await generateIntro(job.moduleName, format, job.daysExtracted);
      }
      if (format === "zusammenfassung" && !job.reduced) {
        job.reduced = await reduceZusammenfassung(
          job.moduleName,
          job.dayResults.map((s) => s.markdown),
        );
      }
      if ((format === "kursbuch" || format === "skript") && !job.outro) {
        job.outro = await generateOutro(job.moduleName, format);
      }
      job.status = "complete";
    } catch (e) {
      job.status = "failed";
      job.error = (e as Error).message;
    }
  }

  saveJob(job);
  return job;
}

function buildFinalPayload(job: PipelineJobState, fromCache: boolean) {
  const format = job.format as FormatId;
  const content = stitchDocument(
    format,
    job.moduleName,
    job.intro || "",
    job.dayResults,
    job.outro || "",
    job.reduced,
  );

  const daysCovered = new Set(job.dayResults.flatMap((s) => s.dayNumbers)).size;
  const draftFallbacks = job.dayResults.filter((s) => s.source === "draft").length;
  const incompleteBlocks = job.dayResults.filter((s) => !s.complete && s.source !== "draft").length;
  const allDaysCovered = daysCovered >= job.daysExtracted;

  return {
    success: job.status === "complete" && allDaysCovered,
    content,
    moduleId: job.moduleId,
    moduleName: job.moduleName,
    format: job.format,
    daysExtracted: job.daysExtracted,
    daysExpected: job.daysExpected,
    daysCovered,
    blocksProcessed: job.dayResults.length,
    incompleteBlocks,
    draftFallbacks,
    pipeline: PIPELINE_VERSION,
    contentHash: job.contentHash,
    generatedAt: new Date().toISOString(),
    fromCache,
    pipelined: true,
    jobId: job.jobId,
    complete: job.status === "complete" && allDaysCovered,
  };
}

router.get("/api/ai/generate-kursbuch-pipeline/status/:jobId", requireAuth, (req, res) => {
  const job = loadJob(String(req.params.jobId));
  if (!job) return res.status(404).json({ error: "Job nicht gefunden" });

  const progress = jobProgress(job);
  if (job.status === "complete") {
    const payload = buildFinalPayload(job, false);
    return res.json({ ...progress, ...payload });
  }
  if (job.status === "failed") {
    return res.json({ ...progress, error: job.error || "Pipeline fehlgeschlagen" });
  }
  res.json(progress);
});

router.post("/api/ai/generate-kursbuch-pipeline", requireAuth, async (req, res) => {
  try {
    const moduleId = Number(req.body?.moduleId);
    const format = String(req.body?.format || "kursbuch") as FormatId;
    const forceRegenerate = Boolean(req.body?.forceRegenerate);
    const jobId = req.body?.jobId ? String(req.body.jobId) : undefined;

    if (!moduleId || moduleId < 1 || moduleId > 5) {
      return res.status(400).json({ error: "moduleId 1–5 erforderlich" });
    }
    if (!FORMAT_CONFIG[format]) {
      return res.status(400).json({ error: "format muss kursbuch, zusammenfassung oder skript sein" });
    }

    const contentHash = getModuleContentHash(moduleId);

    if (!forceRegenerate && !jobId) {
      const cached = readKursbuchPipelineCache(moduleId, format, contentHash);
      if (cached?.complete !== false) {
        return res.json({ ...cached, fromCache: true });
      }
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

    let job: PipelineJobState | null = null;

    if (jobId) {
      job = loadJob(jobId);
      if (!job) return res.status(404).json({ error: "Job nicht gefunden" });
      if (job.status === "complete") {
        const payload = buildFinalPayload(job, false);
        if (payload.complete) writeKursbuchPipelineCache(moduleId, format, contentHash, payload);
        return res.json(payload);
      }
    } else if (!forceRegenerate) {
      job = findRunningJob(moduleId, format, contentHash);
    }

    if (!job) {
      job = createJob({
        moduleId,
        moduleName,
        format,
        contentHash,
        pipelineVersion: PIPELINE_VERSION,
        totalGroups: groups.length,
        daysExpected: expected,
        daysExtracted: lessons.length,
      });
    }

    job = await processJobBatch(job, groups, format);

    if (job.status === "complete") {
      const payload = buildFinalPayload(job, false);
      if (payload.complete) {
        writeKursbuchPipelineCache(moduleId, format, contentHash, payload);
      }
      return res.json(payload);
    }

    if (job.status === "failed") {
      return res.status(500).json({
        error: job.error || "Pipeline fehlgeschlagen",
        ...jobProgress(job),
      });
    }

    res.json({
      ...jobProgress(job),
      continue: true,
      message: "Batch verarbeitet — bitte mit gleicher jobId erneut aufrufen",
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message || "Pipeline-Generierung fehlgeschlagen" });
  }
});

export { router as kursbuchPipelineRouter };
