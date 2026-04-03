import { Express, Request, Response } from "express";
import PortalAgent, { LegalChecker, PORTAL_KNOWLEDGE_MAP } from "./PortalAgent";

export function registerAgentRoutes(app: Express) {

  app.get("/api/agent/knowledge-map", (_req: Request, res: Response) => {
    return res.json({
      legalSources: Object.keys(PORTAL_KNOWLEDGE_MAP.legal_sources).length,
      moduleLaws: PORTAL_KNOWLEDGE_MAP.module_laws,
      legalLinks: PORTAL_KNOWLEDGE_MAP.legal_sources,
      description: "Vollständige Wissensbasis des Portals",
    });
  });

  app.get("/api/agent/legal-check", (_req: Request, res: Response) => {
    const results = [];
    for (let m = 1; m <= 5; m++) {
      const check = LegalChecker.checkModule(m);
      results.push({ moduleId: m, ...check });
    }
    return res.json({
      status: results.some(r => r.urgent) ? "⚠️ Dringende Hinweise" : "✅ Alles aktuell",
      hasUrgentIssues: results.some(r => r.urgent),
      modules: results,
      knownChanges: LegalChecker.KNOWN_CHANGES,
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
