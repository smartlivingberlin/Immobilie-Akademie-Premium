import { Router } from "express";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { requireAuth } from "./authMiddleware";
import { parseKnowledgeFile } from "./audioLessonParser";

const router = Router();

const MODULE_NAMES: Record<number, string> = {
  1: "Einführung in die Immobilienwirtschaft",
  2: "Immobilienmakler §34c GewO",
  3: "WEG-Verwaltung & Mietrecht",
  4: "Gutachter & Sachverständiger",
  5: "Darlehensvermittler §34i GewO",
};

const CONTENT_FILES: Record<number, string[]> = {
  1: ["client/src/pages/modules/Module1Content.ts"],
  2: ["client/src/pages/modules/Module2ContentPart1_Maximal.ts", "client/src/pages/modules/Module2ContentPart2_Maximal.ts"],
  3: ["client/src/pages/modules/Module3Content_Maximal.ts", "client/src/pages/modules/Module3Content_Maximal_Part2_Extended.ts"],
  4: ["client/src/pages/modules/Module4Content_Maximal.ts", "client/src/pages/modules/Module4Content_Valuation_Maximalist.ts"],
  5: ["client/src/pages/modules/Module5Content_34i_Complete.ts"],
};

function extractModulePairs(moduleId: number): string[] {
  const pairs: string[] = [];
  for (const file of CONTENT_FILES[moduleId] || []) {
    const filePath = resolve(file);
    if (!existsSync(filePath)) continue;
    const raw = readFileSync(filePath, "utf8");
    let currentTitle = "";
    let currentTheory = "";
    let currentPractice = "";
    let currentTask = "";
    for (const line of raw.split("\n")) {
      const tMatch = line.match(/title:\s*["`'](.+?)["`']/);
      const thMatch = line.match(/theory:\s*["`'](.+?)["`']/);
      const prMatch = line.match(/practice:\s*["`'](.+?)["`']/);
      const taMatch = line.match(/task:\s*["`'](.+?)["`']/);
      if (tMatch) currentTitle = tMatch[1];
      if (thMatch) currentTheory = thMatch[1];
      if (prMatch) currentPractice = prMatch[1];
      if (taMatch) {
        currentTask = taMatch[1];
        if (currentTitle && currentTheory) {
          pairs.push(
            `### ${currentTitle}\n\n**Theorie:** ${currentTheory}\n\n**Praxis:** ${currentPractice}\n\n**Aufgabe:** ${currentTask}`,
          );
        }
        currentTitle = "";
        currentTheory = "";
        currentPractice = "";
        currentTask = "";
      }
    }
  }
  return pairs;
}

function buildDraft(moduleId: number, format: string): string {
  const moduleName = MODULE_NAMES[moduleId] || `Modul ${moduleId}`;
  const pairs = extractModulePairs(moduleId);
  const knowledgeLessons = parseKnowledgeFile(moduleId);
  const knowledgeBlock = knowledgeLessons
    .slice(0, 30)
    .map((l) => `### ${l.title}\n\n${l.content}`)
    .join("\n\n");

  const body =
    pairs.length > 0
      ? pairs.slice(0, 40).join("\n\n---\n\n")
      : knowledgeBlock || "Kein Modulinhalt gefunden.";

  const formatTitle =
    format === "zusammenfassung" ? "Lernzusammenfassung" : format === "skript" ? "Lernkontroll-Skript" : "Kursbuch-Entwurf";

  return `# ${formatTitle}: ${moduleName}

> Automatisch aus Portal-Inhalten (Moduldateien + Wissensdatenbank) — **ohne KI-Kosten**.
> Zur Veröffentlichung bitte prüfen und ggf. mit „Neu mit KI generieren“ verfeinern.

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
