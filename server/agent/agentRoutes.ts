import { Express, Request, Response } from "express";
import PortalAgent, { WISSENS_KARTE } from "./PortalAgent";
import SuperAgent from "./SuperAgent";
import { requireAuth, requireAdmin } from "../authMiddleware";

export function registerAgentRoutes(app: Express) {
  // ── LEGACY Routes (bestehend) ──────────────────────────
  app.get("/api/agent/knowledge-map", requireAdmin, async (req: Request, res: Response) => {
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

  app.post("/api/agent/smart-context", requireAdmin, async (req: Request, res: Response) => {
    const { question, moduleId } = req.body;
    if (!question) return res.status(400).json({ error: "question fehlt" });
    const context = PortalAgent.getBesteQuelle(question, moduleId);
    return res.json({ ...context, moduleId, question });
  });

  // ── SUPER-AGENT v2 Routes ──────────────────────────────

   // Status + Memory (Admin-Session erforderlich)
   app.get("/api/agent/status", requireAdmin, async (req: Request, res: Response) => {
    return res.json(SuperAgent.getStatus());
  });

  // System Health Check (Admin-Session erforderlich)
  app.get("/api/agent/health", requireAdmin, async (req: Request, res: Response) => {
    try {
      const health = await SuperAgent.systemHealthCheck();
      return res.json(health);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

  // KI-gestützte Frage beantworten
  app.post("/api/agent/ask", requireAdmin, async (req: Request, res: Response) => {
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
  app.post("/api/agent/check-quality", requireAdmin, async (req: Request, res: Response) => {
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
  app.post("/api/agent/generate-question", requireAdmin, async (req: Request, res: Response) => {
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
  app.post("/api/agent/recommend", requireAdmin, async (req: Request, res: Response) => {
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
  app.get("/api/agent/legal-updates", requireAdmin, async (req: Request, res: Response) => {
    try {
      const result = await SuperAgent.checkLegalUpdates();
      return res.json(result);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

// ── NACHT-CRON + COACHING Routes ──────────────────────────

  // Manueller Cron-Trigger (Admin)
  app.post("/api/agent/run-audit", requireAdmin, async (req: Request, res: Response) => {
    try {
      const { runNightAudit } = await import("./NightCron");
      const result = await runNightAudit();
      return res.json(result);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

  // Alle Coaching-Profile abrufen
  app.get("/api/agent/coaching", requireAdmin, async (req: Request, res: Response) => {
    try {
      const { readFileSync, existsSync } = await import("fs");
      const { join } = await import("path");
      const file = join(process.cwd(), "server/agent/coaching.json");
      if (!existsSync(file)) return res.json({ profiles: [], generatedAt: null });
      return res.json(JSON.parse(readFileSync(file, "utf-8")));
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

  // Coaching für einzelnen User
  app.get("/api/agent/coaching/:userId", requireAdmin, async (req: Request, res: Response) => {
    try {
      const { readFileSync, existsSync } = await import("fs");
      const { join } = await import("path");
      const file = join(process.cwd(), "server/agent/coaching.json");
      if (!existsSync(file)) return res.json(null);
      const data = JSON.parse(readFileSync(file, "utf-8"));
      const profile = data.profiles?.find((p: any) => p.userId === parseInt(req.params.userId));
      return res.json(profile || null);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

  // Cron-Log abrufen
  app.get("/api/agent/cron-log", requireAdmin, async (req: Request, res: Response) => {
    try {
      const { readFileSync, existsSync } = await import("fs");
      const { join } = await import("path");
      const file = join(process.cwd(), "server/agent/cron.log");
      if (!existsSync(file)) return res.json({ log: "Noch kein Log vorhanden" });
      const log = readFileSync(file, "utf-8").split("\n").filter(Boolean).slice(-50);
      return res.json({ log: log.join("\n"), lines: log.length });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });
  // POST /api/ai/rechenpraxis-assistent — KI-Hilfe fuer Rechenpraxis (Auth erforderlich)
  app.post("/api/ai/rechenpraxis-assistent", requireAuth, async (req: any, res: any) => {
    try {
      const { frage, aufgabe, nachrichten } = req.body as {
        frage?: string;
        aufgabe?: { titel?: string; bereich?: string; berufssituation?: string };
        nachrichten?: Array<{ rolle?: string; text?: string }>;
      };

      const cleanQuestion = String(frage || "").trim();
      if (!cleanQuestion) return res.status(400).json({ error: "frage erforderlich" });
      if (cleanQuestion.length > 1200) return res.status(400).json({ error: "frage zu lang" });

      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) return res.status(503).json({ error: "KI nicht konfiguriert" });

      const safeHistory = Array.isArray(nachrichten)
        ? nachrichten
            .filter((n) => n && typeof n.text === "string" && (n.rolle === "user" || n.rolle === "assistant"))
            .slice(-8)
            .map((n) => ({
              role: n.rolle === "assistant" ? "assistant" as const : "user" as const,
              content: String(n.text).slice(0, 1200),
            }))
        : [];

      const { default: Anthropic } = await import("@anthropic-ai/sdk");
      const client = new Anthropic({ apiKey });

      const system = `Du bist ein geduldiger Lern-Assistent fuer Immobilienwirtschaft und Rechenpraxis.
Erklaere fuer Quereinsteiger einfach, klar und ohne unnoetigen Fachjargon.
Aktuelle Aufgabe: "${aufgabe?.titel || "Rechenpraxis"}"
Bereich: "${aufgabe?.bereich || "Immobilienwirtschaft"}"
Kontext: ${aufgabe?.berufssituation || "Keine weitere Kontextangabe."}

Antworte auf Deutsch, maximal 4 Saetze.
Gib keine Rechtsberatung und keine offiziellen Pruefungsversprechen.
Wenn die Frage nicht zur Rechenpraxis oder Immobilienwirtschaft passt, sage kurz, dass du nur dabei helfen kannst.`;

      const message = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 700,
        system,
        messages: [
          ...safeHistory,
          { role: "user", content: cleanQuestion },
        ],
      });

      const answer = message.content[0]?.type === "text"
        ? message.content[0].text
        : "Entschuldigung, ich konnte keine Antwort generieren.";

      return res.json({ answer });
    } catch (e: any) {
      return res.status(500).json({ error: "KI-Antwort konnte nicht erstellt werden" });
    }
  });

}