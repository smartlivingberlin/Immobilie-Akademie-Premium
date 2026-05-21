/**
 * ═══════════════════════════════════════════════════════════
 * NACHT-CRON — Immobilien Akademie Smart
 * ═══════════════════════════════════════════════════════════
 * Läuft täglich um 02:00 Uhr
 * 1. Prüft alle 240 Lerntage auf IHK-Qualität
 * 2. Analysiert jeden User individuell (Coaching)
 * 3. Speichert Ergebnisse in memory.json
 * ═══════════════════════════════════════════════════════════
 */

import { readFileSync, existsSync, writeFileSync } from "fs";
import { logger } from "../_core/logger";
import { join } from "path";
import { getDb } from "../db";
import { learningLogs, examWeakTopics, examSessions, users } from "../../drizzle/schema";
import { eq, desc, and, gte, count, avg } from "drizzle-orm";

const CRON_LOG = join(process.cwd(), "server/agent/cron.log");
const MEMORY_FILE = join(process.cwd(), "server/agent/memory.json");
const COACHING_FILE = join(process.cwd(), "server/agent/coaching.json");

// ─── LOGGING ───────────────────────────────────────────────
function log(msg: string) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  try {
    const existing = existsSync(CRON_LOG)
      ? readFileSync(CRON_LOG, "utf-8").split("\n").slice(-200).join("\n")
      : "";
    writeFileSync(CRON_LOG, existing + "\n" + line);
  } catch (e) { /* File I/O Fehler im Log-Schreiben — bewusst ignoriert um Cron nicht zu unterbrechen */ }
}

// ─── MODULE CONTENT READER ─────────────────────────────────
function readModuleDay(module: number, day: number): {
  title: string; theory: string; task: string; norms: string[]
} | null {
  const files: Record<number, string[]> = {
    1: ["client/src/pages/modules/Module1Content_Maximal.ts"],
    2: ["client/src/pages/modules/Module2ContentPart1_Maximal.ts",
        "client/src/pages/modules/Module2ContentPart2_Maximal.ts",
        "client/src/pages/modules/Module2ContentPart3_Maximal.ts"],
    3: ["client/src/pages/modules/Module3Content_Maximal.ts",
        "client/src/pages/modules/Module3Content_Maximal_MissingDays.ts",
        "client/src/pages/modules/Module3Content_Maximal_Part2_Extended.ts",
        "client/src/pages/modules/Module3Content_Maximal_Part3_Extended.ts",
        "client/src/pages/modules/Module3Content_Maximal_Part4.ts"],
    4: ["client/src/pages/modules/Module4Content_Valuation_Maximalist.ts",
        "client/src/pages/modules/Module4Content_Valuation_Maximalist_Part2.ts",
        "client/src/pages/modules/Module4Content_Bonus_HypZert.ts",
        "client/src/pages/modules/Module4Content_Bonus_HypZert_Part2.ts"],
    5: ["client/src/pages/modules/Module5Content_34i_Part1.ts",
        "client/src/pages/modules/Module5Content_34i_Part2.ts",
        "client/src/pages/modules/Module5Content_34i_Part3.ts",
        "client/src/pages/modules/Module5Content_34i_Part4.ts",
        "client/src/pages/modules/Module5Content_34i_Part5.ts",
        "client/src/pages/modules/Module5Content_34i_Part6.ts",
        "client/src/pages/modules/Module5Content_34i_Part7_Final.ts"],
  };

  for (const file of (files[module] || [])) {
    if (!existsSync(file)) continue;
    const content = readFileSync(file, "utf-8");
    const dayKey = `day_${day}:`;
    const start = content.indexOf(dayKey);
    if (start < 0) continue;

    // Nächsten Tag-Block als Ende
    const nextDayMatch = content.slice(start + 10).match(/day_\d+:/);
    const end = nextDayMatch
      ? content.indexOf(nextDayMatch[0], start + 10)
      : start + 3000;
    const block = content.slice(start, end);

    const titleM = block.match(/title:\s*["`]([^"`]+)["`]/);
    const theoryM = block.match(/theory:\s*["`]([^"`]{20,})["`]/);
    const taskM = block.match(/task:\s*["`]([^"`]{10,})["`]/);
    const normsM = block.match(/law:\s*\[([\s\S]*?)\]/);
    const norms: string[] = [];
    if (normsM) {
      const normMatches = normsM[1].matchAll(/url:\s*["`]([^"`]+)["`]/g);
      for (const m of normMatches) norms.push(m[1]);
    }

    return {
      title: titleM?.[1] || `Tag ${day}`,
      theory: theoryM?.[1] || "",
      task: taskM?.[1] || "",
      norms,
    };
  }
  return null;
}

// ─── KI-QUALITÄTSPRÜFUNG (ohne API-Kosten: statisch) ───────
function staticQualityCheck(module: number, day: number, content: {
  title: string; theory: string; task: string; norms: string[]
}): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;

  if (!content.theory || content.theory.length < 50) {
    issues.push("Theorie fehlt oder zu kurz");
    score -= 20;
  }
  if (!content.task || content.task.length < 20) {
    issues.push("Aufgabe fehlt");
    score -= 15;
  }
  if (content.norms.length === 0) {
    // Keine URL-Normen — schwache Warnung, kein Abzug wenn Theorie gut
    if (content.theory.length < 200) {
      issues.push("Keine Rechtsnormen verlinkt");
      score -= 5;
    }
  }
  if (content.title.includes("Tag ") && content.title.length < 10) {
    issues.push("Titel generisch");
    score -= 5;
  }

  // Normen-Check: Prüfe ob law-Array gefüllt ist
  if (content.norms.length === 0) {
    // Nur 5 Punkte Abzug wenn keine Normen-URLs (viele Tage haben Normen im Text)
    // Kein zusätzlicher Abzug — bereits oben abgezogen
  } else {
    // Normen vorhanden — Bonus zurückgeben
    score = Math.min(100, score + 10);
  }

  return { score: Math.max(0, score), issues };
}

// ─── NACHT-AUDIT: ALLE 240 TAGE ────────────────────────────
export async function runNightAudit(): Promise<{
  totalDays: number;
  avgScore: number;
  problemDays: Array<{module: number; day: number; score: number; issues: string[]}>;
  duration: number;
}> {
  const start = Date.now();
  log("🌙 Nacht-Audit gestartet");

  const MODULE_DAYS = [20, 60, 80, 40, 40]; // Tage pro Modul
  const problemDays: Array<{module: number; day: number; score: number; issues: string[]}> = [];
  let totalScore = 0;
  let totalDays = 0;

  for (let m = 1; m <= 5; m++) {
    const dayCount = MODULE_DAYS[m - 1];
    let moduleScore = 0;

    for (let d = 1; d <= dayCount; d++) {
      const content = readModuleDay(m, d);
      if (!content) {
        problemDays.push({ module: m, day: d, score: 0, issues: ["Inhalt nicht gefunden"] });
        continue;
      }

      const { score, issues } = staticQualityCheck(m, d, content);
      moduleScore += score;
      totalScore += score;
      totalDays++;

      if (score < 80 || issues.length > 0) {
        problemDays.push({ module: m, day: d, score, issues });
      }
    }

    log(`  ✅ Modul ${m}: ${dayCount} Tage geprüft | Ø ${Math.round(moduleScore / dayCount)}/100`);
  }

  const avgScore = totalDays > 0 ? Math.round(totalScore / totalDays) : 0;
  const duration = Math.round((Date.now() - start) / 1000);

  // Memory aktualisieren
  try {
    const mem = existsSync(MEMORY_FILE)
      ? JSON.parse(readFileSync(MEMORY_FILE, "utf-8"))
      : {};
    mem.last_night_audit = {
      date: new Date().toISOString(),
      avgScore,
      totalDays,
      problemCount: problemDays.length,
      duration,
    };
    mem.audit_history = [...(mem.audit_history || []).slice(-30), {
      date: new Date().toISOString().slice(0, 10),
      avgScore,
      problemCount: problemDays.length,
    }];
    writeFileSync(MEMORY_FILE, JSON.stringify(mem, null, 2));
  } catch (e) { console.error(JSON.stringify({level:'error',msg:'[NightCron] Memory-Datei konnte nicht gespeichert werden',error:(e as any)?.message,ts:new Date().toISOString()})); }

  log(`✅ Audit fertig: ${totalDays} Tage | Ø ${avgScore}/100 | ${problemDays.length} Probleme | ${duration}s`);
  return { totalDays, avgScore, problemDays, duration };
}

// ─── USER COACHING ANALYSE ─────────────────────────────────
export async function runUserCoaching(): Promise<{
  usersAnalyzed: number;
  coachingProfiles: CoachingProfile[];
}> {
  log("👤 User-Coaching-Analyse gestartet");
  const db = await getDb();
  if (!db) { log("❌ DB nicht verfügbar"); return { usersAnalyzed: 0, coachingProfiles: [] }; }

  // Alle aktiven User laden (letzten 30 Tage aktiv)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const activeUsers = await db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    enabledModules: users.enabledModules,
    dailyMinutes: users.dailyMinutes,
    lastSignedIn: users.lastSignedIn,
  }).from(users).where(gte(users.lastSignedIn, thirtyDaysAgo));

  log(`  📊 ${activeUsers.length} aktive User gefunden`);
  const profiles: CoachingProfile[] = [];

  for (const user of activeUsers) {
    try {
      const profile = await analyzeUser(user, db);
      profiles.push(profile);
    } catch (e) {
      log(`  ⚠️ User ${user.id} Fehler: ${e}`);
    }
  }

  // Coaching-Daten speichern
  const coachingData = {
    generatedAt: new Date().toISOString(),
    totalUsers: profiles.length,
    profiles: profiles.map(p => ({
      userId: p.userId,
      riskLevel: p.riskLevel,
      streak: p.streak,
      avgSessionMinutes: p.avgSessionMinutes,
      completedDays: p.completedDays,
      weakModules: p.weakModules,
      recommendation: p.recommendation,
      nextAction: p.nextAction,
    })),
  };
  writeFileSync(COACHING_FILE, JSON.stringify(coachingData, null, 2));
  log(`✅ Coaching fertig: ${profiles.length} Profile erstellt`);

  return { usersAnalyzed: profiles.length, coachingProfiles: profiles };
}

export interface CoachingProfile {
  userId: number;
  name: string;
  riskLevel: "low" | "medium" | "high"; // Abbruch-Risiko
  streak: number; // Tage in Folge aktiv
  avgSessionMinutes: number;
  completedDays: number;
  totalDays: number;
  weakModules: number[];
  weakTopics: string[];
  examAvgScore: number;
  recommendation: string;
  nextAction: string;
  badges: string[];
}

async function analyzeUser(user: any, db: any): Promise<CoachingProfile> {
  const userId = user.id;

  // Lernlogs der letzten 30 Tage
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const logs = await db.select().from(learningLogs)
    .where(and(eq(learningLogs.userId, userId), gte(learningLogs.openedAt, thirtyDaysAgo)))
    .orderBy(desc(learningLogs.openedAt));

  // Schwache Themen
  const weakTopicsData = await db.select().from(examWeakTopics)
    .where(eq(examWeakTopics.userId, userId))
    .orderBy(desc(examWeakTopics.incorrectCount));

  // Prüfungs-Scores
  const examData = await db.select().from(examSessions)
    .where(and(eq(examSessions.userId, userId), eq(examSessions.status, "completed")))
    .orderBy(desc(examSessions.createdAt));

  // Berechnung
  const completedDays = logs.filter((l: any) => l.completed).length;
  const totalMinutes = logs.reduce((s: number, l: any) => s + Math.round((l.durationSeconds || 0) / 60), 0);
  const avgSessionMinutes = logs.length > 0 ? Math.round(totalMinutes / logs.length) : 0;
  const examAvgScore = examData.length > 0
    ? Math.round(examData.reduce((s: number, e: any) => s + (e.score || 0), 0) / examData.length)
    : 0;

  // Streak berechnen
  const logDates = [...new Set(logs.map((l: any) =>
    new Date(l.openedAt).toISOString().slice(0, 10)
  ))].sort().reverse();
  let streak = 0;
  const today = new Date().toISOString().slice(0, 10);
  for (let i = 0; i < logDates.length; i++) {
    const expected = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    if (logDates[i] === expected) streak++;
    else break;
  }

  // Schwache Module
  const weakModuleMap: Record<number, number> = {};
  weakTopicsData.forEach((t: any) => {
    weakModuleMap[t.moduleId] = (weakModuleMap[t.moduleId] || 0) + t.incorrectCount;
  });
  const weakModules = Object.entries(weakModuleMap)
    .sort(([,a],[,b]) => b - a)
    .slice(0, 2)
    .map(([m]) => parseInt(m));

  const weakTopics = weakTopicsData.slice(0, 5).map((t: any) => t.topic);

  // Risiko-Level
  let riskLevel: "low" | "medium" | "high" = "low";
  if (completedDays >= 10) riskLevel = "low"; // aktiver Lernender → kein Risiko
  else if (streak === 0 && completedDays < 3) riskLevel = "high";
  else if (streak < 3 || avgSessionMinutes < 5) riskLevel = "medium";

  // Empfehlung
  let recommendation = "";
  let nextAction = "";

  if (riskLevel === "high") {
    recommendation = "⚠️ Nutzer zeigt Inaktivität — Motivation nötig";
    nextAction = "Erinnerungs-E-Mail senden + einfachen Lerntag empfehlen";
  } else if (riskLevel === "medium") {
    recommendation = "📈 Lernrhythmus unregelmäßig — Struktur empfehlen";
    nextAction = weakTopics.length > 0
      ? `Schwachstellen üben: ${weakTopics[0]}`
      : "Tägliche Lernzeit festlegen";
  } else {
    recommendation = "✅ Guter Lernfortschritt — weiter so!";
    nextAction = examAvgScore < 70
      ? "Prüfungssimulation wiederholen"
      : completedDays > 10
      ? "Nächstes Modul starten"
      : "Aktuelles Modul vertiefen";
  }

  // Badges
  const badges: string[] = [];
  if (streak >= 7) badges.push("🔥 7-Tage-Streak");
  if (streak >= 30) badges.push("👑 30-Tage-Champion");
  if (completedDays >= 20) badges.push("📚 20-Tage-Lerner");
  if (examAvgScore >= 80) badges.push("🎯 Prüfungs-Ass");
  if (avgSessionMinutes >= 30) badges.push("⏰ Ausdauer-Lerner");

  return {
    userId, name: user.name || "Unbekannt",
    riskLevel, streak, avgSessionMinutes,
    completedDays, totalDays: 240,
    weakModules, weakTopics, examAvgScore,
    recommendation, nextAction, badges,
  };
}

// ─── CRON SCHEDULER ────────────────────────────────────────
export function startNightCron() {
  log("⏰ Nacht-Cron gestartet (täglich 02:00 Uhr)");

  // Ersten Lauf planen
  scheduleNextRun();

  function scheduleNextRun() {
    const now = new Date();
    const next2am = new Date();
    next2am.setHours(2, 0, 0, 0);
    if (next2am <= now) next2am.setDate(next2am.getDate() + 1);

    const msUntil = next2am.getTime() - now.getTime();
    const hoursUntil = Math.round(msUntil / 3600000 * 10) / 10;
    log(`⏰ Nächster Lauf in ${hoursUntil}h (${next2am.toLocaleString("de-DE")})`);

    setTimeout(async () => {
      await runAllCronJobs();
      scheduleNextRun(); // Jeden Tag wiederholen
    }, msUntil);
  }
}


// ── MONITORING SNAPSHOT ──────────────────────────────────────
export async function runMonitoringSnapshot(): Promise<void> {
  try {
    const { getDb } = await import("../db");
    const db = await getDb();

    // Statistiken sammeln
    const [[users]] = await db.$client.promise().query(
      `SELECT COUNT(*) as total,
        SUM(CASE WHEN DATE(createdAt) = CURDATE() THEN 1 ELSE 0 END) as newToday,
        SUM(CASE WHEN DATE(lastSignedIn) = CURDATE() THEN 1 ELSE 0 END) as activeToday
       FROM users`
    ) as any;

    const [[sessions]] = await db.$client.promise().query(
      `SELECT COUNT(*) as total FROM learning_logs WHERE DATE(openedAt) = CURDATE()`
    ) as any;

    const totalUsers = Number(users?.total || 0);
    const newToday = Number(users?.newToday || 0);
    const activeToday = Number(users?.activeToday || 0);
    const totalSessions = Number(sessions?.total || 0);

    // Snapshot speichern
    await db.$client.promise().query(
      `INSERT INTO monitoring_log
        (totalUsers, activeToday, newToday, totalSessions, systemOk, notes)
       VALUES (?, ?, ?, ?, 1, ?)`,
      [totalUsers, activeToday, newToday, totalSessions,
       `Nacht-Cron ${new Date().toISOString()}`]
    );

    log(`📊 Monitoring Snapshot: ${totalUsers} Nutzer | ${activeToday} aktiv | ${newToday} neu | ${totalSessions} Sitzungen`);

    // E-Mail senden wenn RESEND_API_KEY gesetzt
    const resendKey = process.env.RESEND_API_KEY;
    const ownerEmail = process.env.OWNER_EMAIL || "alisadgadyri38@gmail.com";
    if (resendKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "info@immobilien-akademie-smart.de",
            to: ownerEmail,
            subject: `📊 Tagesbericht ${new Date().toLocaleDateString("de-DE")} — Immobilien Akademie`,
            html: `
              <h2>📊 Tagesbericht — Immobilien Akademie Smart</h2>
              <p><strong>Datum:</strong> ${new Date().toLocaleString("de-DE")}</p>
              <hr/>
              <h3>Nutzer</h3>
              <ul>
                <li>Gesamt: <strong>${totalUsers}</strong></li>
                <li>Heute aktiv: <strong>${activeToday}</strong></li>
                <li>Heute neu: <strong>${newToday}</strong></li>
              </ul>
              <h3>Lernaktivität</h3>
              <ul>
                <li>Sitzungen heute: <strong>${totalSessions}</strong></li>
              </ul>
              <h3>System</h3>
              <ul>
                <li>Status: <strong style="color:green">✅ Online</strong></li>
                <li>Server: immobilien-akademie-smart.de</li>
              </ul>
              <hr/>
              <p style="color:#94a3b8;font-size:12px">
                Automatisch generiert von Immobilien Akademie Smart Monitoring System
              </p>
            `
          })
        });
        await db.$client.promise().query(
          `UPDATE monitoring_log SET emailSent = 1 WHERE id = LAST_INSERT_ID()`
        );
        log(`📧 Monitoring E-Mail gesendet an ${ownerEmail}`);
      } catch (mailErr: any) {
        log(`⚠️ E-Mail Fehler: ${mailErr.message}`);
      }
    } else {
      log(`ℹ️ RESEND_API_KEY nicht gesetzt — E-Mail übersprungen`);
    }
  } catch (e: any) {
    log(`❌ Monitoring Fehler: ${e.message}`);
  }
}

export async function runAllCronJobs(): Promise<{
  audit: Awaited<ReturnType<typeof runNightAudit>>;
  coaching: Awaited<ReturnType<typeof runUserCoaching>>;
}> {
  log("🌙 === NACHT-CRON START ===");
  await runMonitoringSnapshot();
  const auditResult = await runNightAudit();
  const coachingResult = await runUserCoaching();
  log(`🌙 === NACHT-CRON FERTIG ===`);
  log(`   Audit: Ø ${auditResult.avgScore}/100 | ${auditResult.problemDays.length} Probleme`);
  log(`   Coaching: ${coachingResult.usersAnalyzed} User analysiert`);
  return { audit: auditResult, coaching: coachingResult };
}
