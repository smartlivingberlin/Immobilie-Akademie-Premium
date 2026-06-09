import { Router } from "express";
import { requireAuth } from "./authMiddleware";
import { parseKnowledgeFile } from "./audioLessonParser";
import { parseModuleDayLessons } from "./moduleDayExtractor";

const router = Router();

const MODULE_NAMES: Record<number, string> = {
  1: "Einführung in die Immobilienwirtschaft",
  2: "Immobilienmakler §34c GewO",
  3: "WEG-Verwaltung & Mietrecht",
  4: "Gutachter & Sachverständiger",
  5: "Darlehensvermittler §34i GewO",
};

function extractModulePairs(moduleId: number): string[] {
  return parseModuleDayLessons(moduleId).map(
    (lesson) => `### ${lesson.title}\n\n${lesson.content}`,
  );
}

function buildDraft(moduleId: number, format: string): string {
  const moduleName = MODULE_NAMES[moduleId] || `Modul ${moduleId}`;
  const pairs = extractModulePairs(moduleId);
  const knowledgeLessons = parseKnowledgeFile(moduleId);
  const knowledgeBlock = knowledgeLessons
    .map((l) => `### ${l.title}\n\n${l.content}`)
    .join("\n\n");

  const body =
    pairs.length > 0
      ? pairs.join("\n\n---\n\n")
      : knowledgeBlock || "Kein Modulinhalt gefunden.";

  const formatTitle =
    format === "zusammenfassung" ? "Lernzusammenfassung" : format === "skript" ? "Lernkontroll-Skript" : "Kursbuch-Entwurf";

  return `# ${formatTitle}: ${moduleName}

> Automatisch aus Portal-Inhalten (Moduldateien + Wissensdatenbank) — **ohne KI-Kosten**.
> Zur Veröffentlichung bitte prüfen und ggf. mit „KI-Kursbuch (Chunked)“ verfeinern.

## Modulüberblick

${moduleName} — ${pairs.length || knowledgeLessons.length} Lerneinheiten extrahiert.

---

${body}
`;
}

router.post("/api/learning/kursbuch-draft", requireAuth, (req, res) => {
  try {
    const moduleId = Number(req.body?.moduleId);
    const format = String(req.body?.format || "kursbuch");
    if (!moduleId || moduleId < 1 || moduleId > 5) {
      return res.status(400).json({ error: "moduleId 1–5 erforderlich" });
    }
    const content = buildDraft(moduleId, format);
    const pairs = extractModulePairs(moduleId);
    res.json({
      success: true,
      content,
      moduleId,
      moduleName: MODULE_NAMES[moduleId],
      format,
      daysExtracted: pairs.length || parseKnowledgeFile(moduleId).length,
      generatedAt: new Date().toISOString(),
      fromDraft: true,
      fromCache: false,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message || "Entwurf konnte nicht erstellt werden" });
  }
});

export { router as kursbuchDraftRouter };
