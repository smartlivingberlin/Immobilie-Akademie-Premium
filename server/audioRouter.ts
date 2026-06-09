import { Router } from "express";
import { requireAuth } from "./authMiddleware";
import { parseAllModuleLessons } from "./audioLessonParser";

const router = Router();

router.get("/api/learning/audio-lessons", requireAuth, (req, res) => {
  try {
    const moduleId = req.query.moduleId ? Number(req.query.moduleId) : null;
    const modules = moduleId ? [moduleId] : [1, 2, 3, 4, 5];
    const lessons = parseAllModuleLessons(modules);
    res.json(lessons);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export { router as audioRouter };
