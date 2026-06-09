import { Router } from "express";
import { requireAuth } from "./authMiddleware";
import { parseKnowledgeFile } from "./audioLessonParser";
import { parseModuleDayLessons } from "./moduleDayExtractor";

const router = Router();

function lessonsForModule(moduleId: number) {
  const fromDays = parseModuleDayLessons(moduleId);
  if (fromDays.length > 0) return fromDays;
  return parseKnowledgeFile(moduleId);
}

router.get("/api/learning/audio-lessons", requireAuth, (req, res) => {
  try {
    const moduleId = req.query.moduleId ? Number(req.query.moduleId) : null;
    const modules = moduleId ? [moduleId] : [1, 2, 3, 4, 5];
    const lessons = modules.flatMap((m) => lessonsForModule(m));
    res.json(lessons);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export { router as audioRouter };
