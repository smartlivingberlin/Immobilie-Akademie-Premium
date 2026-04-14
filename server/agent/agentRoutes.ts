import { Express, Request, Response } from "express";
import PortalAgent, { WISSENS_KARTE } from "./PortalAgent";
import SuperAgent from "./SuperAgent";

export function registerAgentRoutes(app: Express) {

  // ── LEGACY Routes (bestehend) ──────────────────────────
  app.get("/api/agent/knowledge-map", (_req: Request, res: Response) => {
    const allLinks: Record<string, string> = {};
    const moduleLaws: Record<number, string[]> = {};
    for (let m = 1; m <= 5; m++) {
      const mod = WISSENS_KARTE.module[m as keyof typeof WISSENS_KARTE.module];
      if (mod) {
        moduleLaws[m] = mod.gesetze || [];
        Object.assign(allLinks, mod.gesetze_urls || {});
      }
    }
    return res.json({
      legalSources: Object.keys(allLinks).length,
      moduleLaws,
      legalLinks: allLinks,
      moduleInfo: Object.fromEntries(
        Object.entries(WISSENS_KARTE.module).map(([k, v]: [string, any]) =>
          [k, { name: v.name, gesetze: v.gesetze }]
        )
      ),
    });
  });

  app.post("/api/agent/smart-context", (req: Request, res: Response) => {
    const { question, moduleId } = req.body;
    if (!question) return res.status(400).json({ error: "question fehlt" });
    const context = PortalAgent.getBesteQuelle(question, moduleId);
    return res.json({ ...context, moduleId, question });
  });

  // ── SUPER-AGENT v2 Routes ──────────────────────────────

  // Status + Memory
  app.get("/api/agent/status", (_req: Request, res: Response) => {
    return res.json(SuperAgent.getStatus());
  });

  // System Health Check
  app.get("/api/agent/health", async (_req: Request, res: Response) => {
    try {
      const health = await SuperAgent.systemHealthCheck();
      return res.json(health);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

  // KI-gestützte Frage beantworten
  app.post("/api/agent/ask", async (req: Request, res: Response) => {
    const { question, moduleId } = req.body;
    if (!question) return res.status(400).json({ error: "question fehlt" });
    try {
      const result = await SuperAgent.answerQuestion(question, moduleId);
      return res.json(result);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

  // Tag-Qualität prüfen
  app.post("/api/agent/check-quality", async (req: Request, res: Response) => {
    const { module, day, content } = req.body;
    if (!content) return res.status(400).json({ error: "content fehlt" });
    try {
      const result = await SuperAgent.checkDayQuality(module || 1, day || 1, content);
      return res.json(result);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

  // Neue IHK-Frage generieren
  app.post("/api/agent/generate-question", async (req: Request, res: Response) => {
    const { module, topic, difficulty } = req.body;
    if (!topic) return res.status(400).json({ error: "topic fehlt" });
    try {
      const result = await SuperAgent.generateIHKQuestion(
        module || 1,
        topic,
        difficulty || "medium"
      );
      return res.json(result);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

  // Lernempfehlung für Nutzer
  app.post("/api/agent/recommend", async (req: Request, res: Response) => {
    const { completedDays, weakTopics, avgScore, module } = req.body;
    try {
      const result = await SuperAgent.getUserRecommendation({
        completedDays: completedDays || [],
        weakTopics: weakTopics || [],
        avgScore: avgScore || 0,
        module: module || 1,
      });
      return res.json(result);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

  // Rechtliche Updates prüfen
  app.get("/api/agent/legal-updates", async (_req: Request, res: Response) => {
    try {
      const result = await SuperAgent.checkLegalUpdates();
      return res.json(result);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });
}
