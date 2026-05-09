import { Express, Request, Response } from "express";
import PortalAgent, { WISSENS_KARTE } from "./PortalAgent";
import SuperAgent from "./SuperAgent";
import { requireAuth } from "../ragTutor";

export function registerAgentRoutes(app: Express) {
  // Auth-Helper: Owner-Key ODER Admin-Session
  async function checkAdminAuth(req: Request, res: Response): Promise<boolean> {
    const ownerCode = process.env.OWNER_MAGIC_CODE || "";
    const key = req.headers["x-owner-key"] || req.query.key;
    if (ownerCode && key === ownerCode) return true;
    try {
      const { verifySessionToken } = await import("../_core/auth-local");
      const { getUserByOpenId } = await import("../db");
      const session = await verifySessionToken(req.cookies?.["app_session_id"]);
      if (!session) return false;
      const user = await getUserByOpenId(session.openId);
      return user?.role === "admin";
    } catch { return false; }
  }



  // ── LEGACY Routes (bestehend) ──────────────────────────
  app.get("/api/agent/knowledge-map", async (req: Request, res: Response) => {
    if (!await checkAdminAuth(req, res)) return res.status(401).json({ error: "Nicht autorisiert" });
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

  app.post("/api/agent/smart-context", async (req: Request, res: Response) => {
    if (!await checkAdminAuth(req, res)) return res.status(401).json({ error: "Nicht autorisiert" });
    const { question, moduleId } = req.body;
    if (!question) return res.status(400).json({ error: "question fehlt" });
    const context = PortalAgent.getBesteQuelle(question, moduleId);
    return res.json({ ...context, moduleId, question });
  });

  // ── SUPER-AGENT v2 Routes ──────────────────────────────

   // Status + Memory (Owner-Key ODER Admin-Session)
   app.get("/api/agent/status", async (req: Request, res: Response) => {
        const ownerCode = process.env.OWNER_MAGIC_CODE || "";
        const key = req.headers["x-owner-key"] || req.query.key;
        if (ownerCode && key !== ownerCode) {
          try {
            const { verifySessionToken } = await import("../_core/auth-local");
            const { getUserByOpenId } = await import("../db");
            const session = await verifySessionToken(req.cookies?.["app_session_id"]);
            if (!session) return res.status(401).json({ error: "Nicht autorisiert" });
            const user = await getUserByOpenId(session.openId);
            if (!user || user.role !== "admin") return res.status(401).json({ error: "Nicht autorisiert" });
          } catch { return res.status(401).json({ error: "Nicht autorisiert" }); }
        }
    return res.json(SuperAgent.getStatus());
  });

  // System Health Check (Owner-Key ODER Admin-Session)
  app.get("/api/agent/health", async (req: Request, res: Response) => {
        const ownerCode = process.env.OWNER_MAGIC_CODE || "";
        const key = req.headers["x-owner-key"] || req.query.key;
        if (ownerCode && key !== ownerCode) {
          try {
            const { verifySessionToken } = await import("../_core/auth-local");
            const { getUserByOpenId } = await import("../db");
            const session = await verifySessionToken(req.cookies?.["app_session_id"]);
            if (!session) return res.status(401).json({ error: "Nicht autorisiert" });
            const user = await getUserByOpenId(session.openId);
            if (!user || user.role !== "admin") return res.status(401).json({ error: "Nicht autorisiert" });
          } catch { return res.status(401).json({ error: "Nicht autorisiert" }); }
        }
    try {
      const health = await SuperAgent.systemHealthCheck();
      return res.json(health);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

  // KI-gestützte Frage beantworten
  app.post("/api/agent/ask", async (req: Request, res: Response) => {
    if (!await checkAdminAuth(req, res)) return res.status(401).json({ error: "Nicht autorisiert" });
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
    if (!await checkAdminAuth(req, res)) return res.status(401).json({ error: "Nicht autorisiert" });
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
    if (!await checkAdminAuth(req, res)) return res.status(401).json({ error: "Nicht autorisiert" });
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
    if (!await checkAdminAuth(req, res)) return res.status(401).json({ error: "Nicht autorisiert" });
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
  app.get("/api/agent/legal-updates", async (req: Request, res: Response) => {
    if (!await checkAdminAuth(req, res)) return res.status(401).json({ error: "Nicht autorisiert" });
    try {
      const result = await SuperAgent.checkLegalUpdates();
      return res.json(result);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

// ── NACHT-CRON + COACHING Routes ──────────────────────────

  // Manueller Cron-Trigger (Admin)
  app.post("/api/agent/run-audit", async (req: Request, res: Response) => {
    if (!await checkAdminAuth(req, res)) return res.status(401).json({ error: "Nicht autorisiert" });
    const ownerCode = process.env.OWNER_MAGIC_CODE || "";
    const key = req.headers["x-owner-key"] || req.query.key;
    if (ownerCode && key !== ownerCode) {
      return res.status(401).json({ error: "Nicht autorisiert" });
    }
    try {
      const { runNightAudit } = await import("./NightCron");
      const result = await runNightAudit();
      return res.json(result);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

  // Alle Coaching-Profile abrufen
  app.get("/api/agent/coaching", async (req: Request, res: Response) => {
    if (!await checkAdminAuth(req, res)) return res.status(401).json({ error: "Nicht autorisiert" });
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
  app.get("/api/agent/coaching/:userId", async (req: Request, res: Response) => {
    if (!await checkAdminAuth(req, res)) return res.status(401).json({ error: "Nicht autorisiert" });

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
  app.get("/api/agent/cron-log", async (req: Request, res: Response) => {
    if (!await checkAdminAuth(req, res)) return res.status(401).json({ error: "Nicht autorisiert" });
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
  // POST /api/ai/bewerte-fallstudie — KI bewertet Nutzerantwort (Auth erforderlich)
  app.post("/api/ai/bewerte-fallstudie", requireAuth, async (req: any, res: any) => {
    try {
      const { aufgabe, musterantwort, nutzerAntwort, titel } = req.body;
      if (!aufgabe || !nutzerAntwort) return res.status(400).json({ error: "aufgabe und nutzerAntwort erforderlich" });
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) return res.status(503).json({ error: "KI nicht konfiguriert" });
      const { default: Anthropic } = await import("@anthropic-ai/sdk");
      const client = new Anthropic({ apiKey });
      const prompt = `Du bist ein erfahrener Immobilien-Dozent. Bewerte die folgende Antwort eines Lernenden.

Fallstudie: ${titel}
Aufgabe: ${aufgabe}
Musterloesung: ${musterantwort}
Antwort des Lernenden: ${nutzerAntwort}

Gib eine konstruktive Bewertung auf Deutsch:
1. Gesamtbewertung (0-100 Punkte)
2. Was war gut?
3. Was fehlt oder ist falsch?
4. Konkrete Verbesserungsvorschlaege
5. Fazit in einem Satz

Antworte im JSON-Format:
{"punkte": 75, "gut": "...", "verbesserung": "...", "tipps": "...", "fazit": "..."}`;

      const message = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      });
      const text = message.content[0].type === "text" ? message.content[0].text : "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) return res.json({ success: true, bewertung: { punkte: 0, gut: "", verbesserung: text, tipps: "", fazit: "" } });
      const bewertung = JSON.parse(jsonMatch[0]);
      return res.json({ success: true, bewertung });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

}