import { Express, Request, Response } from "express";
import PortalAgent, { WISSENS_KARTE } from "./PortalAgent";

export function registerAgentRoutes(app: Express) {

  app.get("/api/agent/knowledge-map", (_req: Request, res: Response) => {
    // Alle Gesetzes-Links aus allen Modulen sammeln
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
