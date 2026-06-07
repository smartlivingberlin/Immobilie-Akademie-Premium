/**
 * HealthWatcher — Stündliche Systemüberwachung
 * Prüft alle kritischen Komponenten und speichert Ergebnisse in monitoring_log
 * Bei Fehlern: E-Mail-Alert an Eigentümer via Resend
 */

import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { logger } from "../_core/logger";

const OWNER_EMAIL = "alisadgadyri38@gmail.com";
const BASE_URL = process.env.APP_URL || "https://immobilien-akademie-smart.de";
const RESEND_KEY = process.env.RESEND_API_KEY || "";

// ─── HTTP CHECK ────────────────────────────────────────────
async function httpCheck(url: string, opts: {
  method?: string;
  expectedStatus?: number;
  expectedBody?: string;
  timeoutMs?: number;
} = {}): Promise<{ ok: boolean; ms: number; status?: number; error?: string }> {
  const start = Date.now();
  const timeout = opts.timeoutMs || 8000;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    const res = await fetch(url, {
      method: opts.method || "GET",
      signal: controller.signal,
      headers: { "User-Agent": "HealthWatcher/1.0" },
    });
    clearTimeout(timer);
    const ms = Date.now() - start;
    const body = await res.text().catch(() => "");
    const statusOk = opts.expectedStatus ? res.status === opts.expectedStatus : res.ok || res.status < 500;
    const bodyOk = opts.expectedBody ? body.includes(opts.expectedBody) : true;
    return { ok: statusOk && bodyOk, ms, status: res.status };
  } catch (e: any) {
    return { ok: false, ms: Date.now() - start, error: e.message?.slice(0, 100) };
  }
}

// ─── ALLE CHECKS ───────────────────────────────────────────
async function runAllChecks(): Promise<{
  checks: Record<string, { ok: boolean; ms?: number; status?: number; error?: string }>;
  allOk: boolean;
  failedChecks: string[];
}> {
  const base = BASE_URL;
  const results = await Promise.all([
    httpCheck(`${base}/api/health`, {
      expectedStatus: 200,
      expectedBody: '"ok":true',
    }).then(r => ["health", r] as const),
    httpCheck(`${base}/api/health`, {
      expectedStatus: 200,
      expectedBody: '"db":"connected"',
    }).then(r => ["health_db", r] as const),
    httpCheck(`${base}/api/auth/me`, { expectedStatus: 401 }).then(r => ["auth", r] as const),
    httpCheck(`${base}/data/all-questions.json`, { expectedStatus: 403 }).then(r => ["quiz_data_guard", r] as const),
    httpCheck(`${base}/data/module4.json`, { expectedStatus: 403 }).then(r => ["module_data_guard", r] as const),
    httpCheck(`${base}/api/stripe/webhook`, { method: "POST", expectedStatus: 400 }).then(r => ["stripe_webhook", r] as const),
    httpCheck(`${base}/`, { expectedBody: "Immobilien Akademie Smart" }).then(r => ["homepage", r] as const),
    httpCheck(`${base}/sitemap.xml`, { expectedBody: "urlset" }).then(r => ["sitemap", r] as const),
  ]);

  const checks: Record<string, { ok: boolean; ms?: number; status?: number; error?: string }> = {};
  for (const [name, result] of results) checks[name] = result;

  // DB Check
  try {
    const db = await getDb();
    const start = Date.now();
    await db.$client.query("SELECT 1");
    checks["database"] = { ok: true, ms: Date.now() - start };
  } catch (e: any) {
    checks["database"] = { ok: false, error: e.message?.slice(0, 100) };
  }

  const failedChecks = Object.entries(checks)
    .filter(([, v]) => !v.ok)
    .map(([k]) => k);

  return { checks, allOk: failedChecks.length === 0, failedChecks };
}

// ─── ERGEBNIS SPEICHERN ────────────────────────────────────
async function saveResult(type: string, status: string, details: object): Promise<void> {
  try {
    const db = await getDb();
    await db.$client.query(
      "INSERT INTO monitoring_log (type, status, details) VALUES (?, ?, ?)",
      [type, status, JSON.stringify(details)]
    );
  } catch (e: any) {
    logger.error("[HealthWatcher] DB-Speichern fehlgeschlagen", { error: e.message, code: e.code, stack: e.stack?.slice(0,200) });
  }
}

// ─── E-MAIL ALERT ──────────────────────────────────────────
async function sendAlert(failedChecks: string[], checks: Record<string, any>): Promise<void> {
  if (!RESEND_KEY) return;
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(RESEND_KEY);
    const rows = Object.entries(checks)
      .map(([name, r]) => `<tr>
        <td style="padding:6px 12px;border-bottom:1px solid #e2e8f0">${name}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #e2e8f0;color:${r.ok ? '#16a34a' : '#dc2626'}">${r.ok ? '✅ OK' : '❌ FEHLER'}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #e2e8f0">${r.ms ? r.ms + 'ms' : ''}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #e2e8f0;color:#dc2626">${r.error || r.status || ''}</td>
      </tr>`).join('');

    await resend.emails.send({
      from: "Immobilien Akademie Smart Monitor <info@immobilien-akademie-smart.de>",
      to: OWNER_EMAIL,
      subject: `⚠️ Portal-Alert: ${failedChecks.length} Problem(e) erkannt`,
      html: `
<!DOCTYPE html><html lang="de"><body style="font-family:Arial,sans-serif;background:#f8fafc;padding:20px">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.1)">
  <div style="background:#dc2626;padding:24px 32px">
    <h1 style="color:#fff;margin:0;font-size:20px">⚠️ Portal-Alert — ${new Date().toLocaleString('de-DE')}</h1>
  </div>
  <div style="padding:32px">
    <p style="color:#374151;margin:0 0 16px"><strong>${failedChecks.length} Problem(e) erkannt:</strong> ${failedChecks.join(', ')}</p>
    <table style="width:100%;border-collapse:collapse;margin:0 0 24px">
      <thead>
        <tr style="background:#f1f5f9">
          <th style="padding:8px 12px;text-align:left">Check</th>
          <th style="padding:8px 12px;text-align:left">Status</th>
          <th style="padding:8px 12px;text-align:left">Zeit</th>
          <th style="padding:8px 12px;text-align:left">Detail</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <a href="${BASE_URL}/owner-dashboard?key=${process.env.OWNER_MAGIC_CODE || ''}"
       style="display:inline-block;background:#0f1f3d;color:#f5c842;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">
      Owner-Dashboard öffnen →
    </a>
  </div>
</div>
</body></html>`,
    });
    logger.info("[HealthWatcher] Alert-E-Mail gesendet", { failed: failedChecks });
  } catch (e: any) {
    logger.error("[HealthWatcher] E-Mail-Versand fehlgeschlagen", { error: e.message });
  }
}

// ─── EMPFEHLUNGEN GENERIEREN ───────────────────────────────
function generateRecommendations(checks: Record<string, any>): string[] {
  const recs: string[] = [];
  if (!checks.health?.ok) recs.push("KRITISCH: /api/health antwortet nicht — Server prüfen");
  if (!checks.health_db?.ok) recs.push("KRITISCH: /api/health meldet DB-Ausfall — docs/RAILWAY_MYSQL_OPS.md");
  if (!checks.database?.ok) recs.push("KRITISCH: Datenbankverbindung unterbrochen — Railway DB prüfen");
  if (!checks.stripe_webhook?.ok) recs.push("KRITISCH: Stripe-Webhook nicht erreichbar — Zahlungen gefährdet");
  if (!checks.auth?.ok) recs.push("HOCH: Auth-Endpoint fehlerhaft — Nutzer können sich nicht einloggen");
  if (!checks.homepage?.ok) recs.push("HOCH: Startseite nicht erreichbar — Portal down");
  if (!checks.quiz_data_guard?.ok) recs.push("MITTEL: Quiz-Daten öffentlich erreichbar — Modul-Guard prüfen");
  if (!checks.module_data_guard?.ok) recs.push("MITTEL: Modul-Daten öffentlich erreichbar — Modul-Guard prüfen");
  if (!checks.sitemap?.ok) recs.push("NIEDRIG: Sitemap nicht erreichbar — SEO beeinträchtigt");
  
  // Performance-Empfehlungen
  const slowChecks = Object.entries(checks)
    .filter(([, v]) => v.ok && v.ms > 3000)
    .map(([k]) => k);
  if (slowChecks.length > 0) {
    recs.push(`PERFORMANCE: Langsame Antworten (>3s): ${slowChecks.join(', ')}`);
  }
  return recs;
}

// ─── HAUPT-FUNKTION ────────────────────────────────────────
export async function runHealthWatch(): Promise<void> {
  const startTime = Date.now();
  logger.info("[HealthWatcher] 🔍 Stündlicher Check gestartet");

  try {
    const { checks, allOk, failedChecks } = await runAllChecks();
    const duration = Date.now() - startTime;
    const recommendations = generateRecommendations(checks);

    const summary = {
      timestamp: new Date().toISOString(),
      allOk,
      failedChecks,
      checkCount: Object.keys(checks).length,
      checks,
      recommendations,
      durationMs: duration,
    };

    await saveResult("hourly_health", allOk ? "ok" : "error", summary);

    if (allOk) {
      logger.info(`[HealthWatcher] ✅ Alle ${Object.keys(checks).length} Checks OK (${duration}ms)`);
    } else {
      logger.warn(`[HealthWatcher] ⚠️ ${failedChecks.length} Fehler: ${failedChecks.join(', ')}`);
      // Alert nur senden wenn Fehler (nicht bei erstem Mal um Spam zu vermeiden)
      await sendAlert(failedChecks, checks);
    }

    // Alte Logs aufräumen (nur letzte 7 Tage behalten)
    try {
      const db = await getDb();
      await db.$client.query("DELETE FROM monitoring_log WHERE timestamp < DATE_SUB(NOW(), INTERVAL 7 DAY)");

    } catch { /* ignorieren */ }
  } catch (e: any) {
    logger.error("[HealthWatcher] Kritischer Fehler", { error: e.message });
    await saveResult("hourly_health", "critical", { error: e.message });
  }
}

// ─── STÜNDLICHER CRON ──────────────────────────────────────
export function startHealthWatcher(): void {
  logger.info("[HealthWatcher] 🚀 Stündliche Überwachung gestartet");
  
  // Sofort beim Start einmal ausführen (nach 2 Minuten Wartezeit)
  setTimeout(async () => {
    await runHealthWatch();
  }, 2 * 60 * 1000);

  // Dann jede Stunde
  setInterval(async () => {
    await runHealthWatch();
  }, 60 * 60 * 1000);

  const nextRun = new Date(Date.now() + 60 * 60 * 1000);
  logger.info(`[HealthWatcher] ⏰ Nächster Check: ${nextRun.toLocaleString('de-DE')}`);
}
