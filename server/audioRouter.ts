import { Router } from "express";
import { readFileSync } from "fs";
import { join } from "path";
import { requireAuth } from "./authMiddleware";

const router = Router();

function parseLessons(moduleId: number) {
  try {
    const path = join(process.cwd(), "server/knowledge", `modul_${moduleId}.txt`);
    const text = readFileSync(path, "utf8");
    const topics = text.match(/• (.+)/g) || [];
    const paras = text.split("\n\n").filter(p => p.trim().length > 80);
    return topics.map((t, i) => ({
      id: `${moduleId}-${i+1}`,
      title: t.replace("• ", "").trim(),
      moduleId,
      dayNumber: i + 1,
      content: paras[i + 1]?.replace(/•/g, "").replace(/\n/g, " ").trim()
        || t.replace("• ", "").trim() + ": Dieser Lerntag behandelt die Grundlagen des Themas im Kontext der deutschen Immobilienwirtschaft.",
    }));
  } catch { return []; }
}

router.get("/api/learning/audio-lessons", requireAuth, (req, res) => {
  try {
    const moduleId = req.query.moduleId ? Number(req.query.moduleId) : null;
    const modules = moduleId ? [moduleId] : [1, 2, 3, 4, 5];
    const lessons = modules.flatMap(m => parseLessons(m));
    res.json(lessons);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export { router as audioRouter };
