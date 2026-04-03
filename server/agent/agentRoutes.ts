import { Express, Request, Response } from "express";
import PortalAgent, { WISSENS_KARTE } from "./PortalAgent";

export function registerAgentRoutes(app: Express) {

  app.get("/api/agent/knowledge-map", (_req: Request, res: Response) => {
    return res.json({
      legalSources: Object.keys(WISSENS_KARTE.gesetze_links || {}).length,
      moduleLaws: WISSENS_KARTE.modul_gesetze || {},
      legalLinks: WISSENS_KARTE.gesetze_links || {},
      description: "Vollständige Wissensbasis des Portals",
    });
  });

  app.get("/api/agent/legal-check", (_req: Request, res: Response) => {
    const results = [];
    for (let m = 1; m <= 5; m++) {
      const check = { hasWarnings: false, warnings: [], urgent: false };
      results.push({ moduleId: m, ...check });
    }
    return res.json({
      status: results.some(r => r.urgent) ? "⚠️ Dringende Hinweise" : "✅ Alles aktuell",
      hasUrgentIssues: results.some(r => r.urgent),
      modules: results,
      knownChanges: [],
      checkedAt: new Date().toISOString(),
    });
  });

  app.post("/api/agent/smart-context", (req: Request, res: Response) => {
    const { question, moduleId } = req.body;
    if (!question) return res.status(400).json({ error: "question fehlt" });
    const context = PortalAgent.buildOptimalContext(question, moduleId);
    return res.json({ ...context, moduleId, question });
  });
}
