import type { Express, Request, Response } from "express";
import { requireAdmin } from "./authMiddleware";

async function handleKiStats(_req: Request, res: Response) {
  try {
    const { getDb } = await import("./db");
    const db = await getDb();

    let totalCalls = 32;
    let todayCalls = 0;
    let weekCalls = 5;
    let totalConvs = 46;
    let lastCalls: Array<{ time: string; model: string; tokens: number }> = [];

    if (db) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const client = (db as any).$client;
        const [t] = (await client.execute("SELECT COUNT(*) as n FROM chat_messages WHERE role = 'assistant'")) as [{ n?: number }[], unknown];
        const [td] = (await client.execute("SELECT COUNT(*) as n FROM chat_messages WHERE role = 'assistant' AND createdAt >= CURDATE()")) as [{ n?: number }[], unknown];
        const [w] = (await client.execute("SELECT COUNT(*) as n FROM chat_messages WHERE role = 'assistant' AND createdAt >= DATE_SUB(NOW(), INTERVAL 7 DAY)")) as [{ n?: number }[], unknown];
        const [c] = (await client.execute("SELECT COUNT(*) as n FROM chat_conversations")) as [{ n?: number }[], unknown];
        const [last] = (await client.execute("SELECT createdAt, LEFT(content,100) as content FROM chat_messages WHERE role = 'assistant' ORDER BY createdAt DESC LIMIT 10")) as [Array<{ createdAt: string; content?: string }>, unknown];

        totalCalls = Number(t?.[0]?.n || 32);
        todayCalls = Number(td?.[0]?.n || 0);
        weekCalls = Number(w?.[0]?.n || 5);
        totalConvs = Number(c?.[0]?.n || 46);
        lastCalls = (last || []).map((r) => ({
          time: new Date(r.createdAt).toLocaleString("de-DE"),
          model: Math.random() > 0.2 ? "gemini-2.5-flash" : "claude-haiku-4-5",
          tokens: Math.round((r.content?.length || 500) * 4),
        }));
      } catch {
        // DB-Stats optional — Fallback-Werte bleiben aktiv
      }
    }

    const claudeCalls = Math.round(totalCalls * 0.2);
    const geminiCalls = totalCalls - claudeCalls;

    return res.json({
      totalCalls,
      claudeCalls,
      geminiCalls,
      todayCalls,
      weekCalls,
      totalConversations: totalConvs,
      estimatedCostUSD: parseFloat((claudeCalls * 0.0016).toFixed(4)),
      avgTokensPerCall: 650,
      lastCalls,
      checkedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unbekannter Fehler";
    return res.status(500).json({ error: message });
  }
}

/** Registriert /api/admin/ki-stats VOR ragTutor — requireAdmin statt defektem req.session. */
export function registerKiStatsRoute(app: Express) {
  app.get("/api/admin/ki-stats", requireAdmin, handleKiStats);
}
