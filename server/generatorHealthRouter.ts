import { Router } from "express";
import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { requireAuth } from "./authMiddleware";
import { getModuleContentHash, MODULE_CONTENT_REGISTRY } from "./moduleContentRegistry";
import { getModuleLessons } from "./moduleDayExtractor";
import { parseKnowledgeFile } from "./audioLessonParser";
import { getLlmProviderStatus } from "./kursbuchLlm";
import { resolveKnowledgeDir } from "./contentPaths";

const router = Router();

router.get("/api/ai/generator-health", requireAuth, (_req, res) => {
  const llm = getLlmProviderStatus();
  const knowledgeDir = resolveKnowledgeDir();
  const knowledgeFiles = existsSync(knowledgeDir)
    ? readdirSync(knowledgeDir).filter((f) => f.startsWith("modul_") && f.endsWith(".txt"))
    : [];

  const modules = Object.values(MODULE_CONTENT_REGISTRY).map((meta) => {
    const lessons = getModuleLessons(meta.id);
    const knowledge = parseKnowledgeFile(meta.id);
    const contentHash = getModuleContentHash(meta.id);
    return {
      moduleId: meta.id,
      name: meta.name,
      expectedDays: meta.expectedDays,
      extractedDays: lessons.length,
      knowledgeDays: knowledge.length,
      contentFiles: meta.contentFiles.length,
      contentHash,
      coverageOk: lessons.length >= meta.expectedDays * 0.9,
    };
  });

  const jobsDir = join(process.cwd(), "data", "generator-jobs");
  const runningJobs = existsSync(jobsDir)
    ? readdirSync(jobsDir).filter((f) => f.endsWith(".json")).length
    : 0;

  const envKeys = {
    GEMINI_API_KEY: Boolean(process.env.GEMINI_API_KEY),
    GOOGLE_AI_API_KEY: Boolean(process.env.GOOGLE_AI_API_KEY),
    GROQ_API_KEY: Boolean(process.env.GROQ_API_KEY),
    ANTHROPIC_API_KEY: Boolean(process.env.ANTHROPIC_API_KEY),
  };

  const tutorReady = envKeys.GEMINI_API_KEY || envKeys.GOOGLE_AI_API_KEY || envKeys.ANTHROPIC_API_KEY;
  const pipelineReady = llm.primary !== "none";

  res.json({
    ok: pipelineReady && modules.every((m) => m.extractedDays > 0),
    pipelineVersion: "v2",
    llm,
    envKeys,
    tutor: {
      ready: tutorReady,
      primary: envKeys.GEMINI_API_KEY || envKeys.GOOGLE_AI_API_KEY ? "gemini" : envKeys.GROQ_API_KEY ? "groq" : envKeys.ANTHROPIC_API_KEY ? "claude" : "none",
      note: "ragTutor.ts nutzt GEMINI_API_KEY (nicht GOOGLE_AI_API_KEY aus env.ts)",
    },
    pipeline: {
      ready: pipelineReady,
      primary: llm.primary,
      batchSize: 6,
      maxRetries: 3,
      draftFallback: true,
    },
    knowledge: {
      dir: knowledgeDir,
      files: knowledgeFiles.length,
    },
    modules,
    jobs: { dir: jobsDir, fileCount: runningJobs },
    recommendations: [
      !envKeys.GEMINI_API_KEY && !envKeys.GOOGLE_AI_API_KEY
        ? "GEMINI_API_KEY setzen für kostenlosen Primär-Provider (Pipeline + Tutor)"
        : null,
      !envKeys.GROQ_API_KEY ? "GROQ_API_KEY optional für kostenlosen Fallback" : null,
      modules.some((m) => !m.coverageOk)
        ? "Modul-Lerntage unter Erwartung — Content Registry prüfen"
        : null,
    ].filter(Boolean),
  });
});

export { router as generatorHealthRouter };
