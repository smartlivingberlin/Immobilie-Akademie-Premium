import * as Sentry from "@sentry/node";
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 0.1,
    beforeSend(event) {
      if (event.request) {
        delete event.request.data;
        delete event.request.cookies;
        delete event.request.query_string;
        if (event.request.headers) {
          delete event.request.headers["authorization"];
          delete event.request.headers["cookie"];
        }
      }
      if (event.user) {
        delete event.user.email;
        delete event.user.username;
        delete event.user.ip_address;
      }
      return event;
    },
  });
}

import "./polyfills";
import { webcrypto } from "node:crypto";

if (!globalThis.crypto) {
  Object.defineProperty(globalThis, "crypto", {
    value: webcrypto,
    configurable: true,
  });
}

import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerLocalAuthRoutes } from "./auth-local";
import { registerPasswordResetRoutes } from "../passwordReset";
import { registerPortalPhaseRoutes } from "../portalPhase";
import { registerAgentRoutes } from "../agent/agentRoutes";
import { startNightCron } from "../agent/NightCron";
import { startHealthWatcher } from "../agent/HealthWatcher";
import { registerKiStatsRoute } from "../kiStatsRoute";
import { registerRagTutorRoutes } from "../ragTutor";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { seedQuizQuestionsIfEmpty } from "../seed-quiz";
import { registerOwnerRoutes } from "../ownerRoute";
import { runTrialFollowupCron } from "../trialFollowup";
import { registerSpacedRepetitionRoutes } from "../spacedRepetitionRoute";
import { glossarRouter } from "../glossarRouter";
import { audioRouter } from "../audioRouter";
import { registerTrialRoutes } from "../trialRoute";
import { certificateExportRouter } from "../certificateExport";
import { weiterbildungExportRouter } from "../weiterbildungExport";
import { referralRouter } from "../referralRoute";
import { logger } from "./logger";
import { requireAuth, requireAdmin } from "../authMiddleware";
import { handleStripeWebhook } from "../stripeWebhookHandler";


// Globaler Error Handler
process.on('uncaughtException', (err) => {
  logger.error('[CRITICAL] Uncaught Exception', err);
});
process.on('unhandledRejection', (reason) => {
  logger.error('[CRITICAL] Unhandled Rejection', reason instanceof Error ? reason : new Error(String(reason)));
});


async function startServer() {
  try { const { runMigrations } = await import("../migrate"); await runMigrations(); } catch(e:any) { logger.warn("[DB] Migration fehlgeschlagen", { error: e.message }); }
  const app = express();

  // Permissions-Policy Header
  app.use((_req, res, next) => {
    res.setHeader("Permissions-Policy", "camera=(), microphone=(self), geolocation=(), payment=(self \"https://js.stripe.com\")");
    next();
  });
app.use(helmet({
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://js.stripe.com",
      ],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:", "blob:", "https://img.youtube.com"],
      connectSrc: ["'self'", "https://api.stripe.com", "https://plausible.io", "https://*.sentry.io"],
      frameSrc: ["'self'", "https://js.stripe.com", "https://hooks.stripe.com", "https://www.youtube.com", "https://youtube.com"],
      fontSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
}));

// Login Rate Limiter — verhindert Brute-Force Angriffe
// Erklärt: Nach 10 falschen Versuchen in 15 Minuten wird die IP gesperrt
// Das schützt alle Nutzerkonten vor automatisierten Passwort-Angriffen
app.set("trust proxy", 1);
app.use(compression() as any); // Gzip/Brotli Kompression // Railway Fastly CDN
// Login Rate Limiter — express-rate-limit (konsistent mit anderen Limitern)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Zu viele Login-Versuche. Bitte warte 15 Minuten." },
  keyGenerator: (req: any) => {
    const fwd = req.headers["x-forwarded-for"] || "";
    return (Array.isArray(fwd) ? fwd[0] : fwd.split(",")[0]).trim()
      || req.socket?.remoteAddress || "unknown";
  },
});


const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  message: { error: "Zu viele Anfragen. Bitte warte eine Minute." },
  standardHeaders: true,
  legacyHeaders: false,
});
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, max: 5,
  message: { error: "Zu viele Registrierungen. Bitte warte 1 Stunde." }
});
const trialLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, max: 5,
  message: { error: "Zu viele Trial-Anfragen. Bitte warte 1 Stunde." }
});
const resetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, max: 3,
  message: { error: "Zu viele Reset-Anfragen. Bitte warte 1 Stunde." }
});

  app.use("/api/ai", aiLimiter);

app.use("/api/auth/login", loginLimiter);
app.use("/api/auth/forgot-password", resetLimiter);
app.use("/api/auth/reset-password", resetLimiter);
app.use("/api/auth/register", registerLimiter);
app.use("/api/auth/redeem-code", loginLimiter);
app.use("/api/tester/request", trialLimiter);
app.use("/api/owner/access", loginLimiter);
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(cookieParser());
  // CORS für Owner Control Panel (lokale HTML-Datei)
  app.use((req, res, next) => {
    const origin = req.headers.origin || '';
    const isProd = process.env.NODE_ENV === "production";
    const allowedOrigins = [
      "https://immobilien-akademie-smart.de",
      "https://immobilien-akademie-smart.de",
      "https://www.immobilien-akademie-smart.de"
    ];

    let allowed = false;
    if (!isProd) {
      allowed = ['null', 'file://', ''].includes(origin) ||
        origin.startsWith('http://localhost') ||
        origin.startsWith('http://127.0.0.1');
    } else {
      allowed = allowedOrigins.includes(origin);
    }

    if (allowed || (!isProd && !origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin || '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
  });



  // Inspect-Modus: alle Schreiboperationen global blockieren (Ausnahme: exit + status)
  const { blockInspectWrites } = await import("../inspectMode");
  app.use(blockInspectWrites);

// ── Stripe Webhook VOR express.json — raw body nötig ──────────
app.post("/api/stripe/webhook", express.raw({ type: "*/*" }), handleStripeWebhook);
app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ limit: "1mb", extended: true }));

  // ── ElevenLabs TTS-Proxy (nach express.json — req.body muss geparst sein) ──
  app.post("/api/tts", requireAuth, async (req: any, res: any) => {
    try {
      const { text, voiceId = "21m00Tcm4TlvDq8ikWAM" } = req.body ?? {};
      const apiKey = process.env.ELEVENLABS_API_KEY;
      if (!apiKey) return res.status(503).json({ error: "TTS nicht konfiguriert" });
      if (!text || text.length > 500) return res.status(400).json({ error: "Text ungültig" });
      const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      });
      if (!r.ok) return res.status(502).json({ error: "TTS-Fehler" });
      res.setHeader("Content-Type", "audio/mpeg");
      const buf = await r.arrayBuffer();
      res.send(Buffer.from(buf));
    } catch (err: any) {
      logger.error("[TTS] Fehler", { error: err?.message });
      res.status(502).json({ error: "TTS-Verbindungsfehler" });
    }
  });

  // DSGVO-Consent Logging (Cookie-Banner)
  app.post("/api/consent", async (req: any, res: any) => {
    try {
      const { type, version } = req.body ?? {};
      const userId = (req as any).user?.id ?? null;
      await (await (await import("../db")).getDb()).$client.query(
        `INSERT INTO consent_log (userId, consentType, consentVersion, ipAddress)
         VALUES (?, ?, ?, ?)`,
        [
          userId ?? null,
          type === "accepted" ? "marketing" : "revoked_marketing",
          version ?? "2026-04",
          req.ip ?? "",
        ],
      );
      res.json({ ok: true });
    } catch {
      res.json({ ok: true });
    }
  });

  // OAuth callback (Manus) – nur wenn OAUTH_SERVER_URL konfiguriert
  if (process.env.OAUTH_SERVER_URL) {
    registerOAuthRoutes(app);
  }
  // Lokales Auth
  registerOwnerRoutes(app);
  registerLocalAuthRoutes(app);
  registerPasswordResetRoutes(app);
  registerPortalPhaseRoutes(app);
  registerKiStatsRoute(app);
  const { mountKiFairUseGate } = await import("../kiFairUseGate");
  mountKiFairUseGate(app);
  const { mountAuditKiMiddleware } = await import("../auditMiddleware");
  mountAuditKiMiddleware(app);
  const { mountGeneratorCacheGate } = await import("../generatorCacheGate");
  mountGeneratorCacheGate(app);
  registerRagTutorRoutes(app);
  registerTrialRoutes(app);
  registerSpacedRepetitionRoutes(app);
  app.use(glossarRouter);
  app.use(audioRouter);
  const { kursbuchDraftRouter } = await import("../kursbuchDraftRouter");
  app.use(kursbuchDraftRouter);
  const { kursbuchChunkedRouter } = await import("../kursbuchChunkedRouter");
  app.use(kursbuchChunkedRouter);
  const { kursbuchPipelineRouter } = await import("../kursbuchPipelineRouter");
  app.use(kursbuchPipelineRouter);
  const { generatorHealthRouter } = await import("../generatorHealthRouter");
  app.use(generatorHealthRouter);
  const { verwalterRouter } = await import("../verwalterRouter");
  app.use(verwalterRouter);
  app.use(certificateExportRouter);
  app.use(weiterbildungExportRouter);
  app.use(referralRouter);
  const { b2bOnboardingRouter } = await import("../b2bOnboardingRoute");
  app.use(b2bOnboardingRouter);
  const { adminOpsRouter } = await import("../adminOpsRoute");
  app.use(adminOpsRouter);
  registerAgentRoutes(app);
  // Healthcheck für Railway / Monitoring
  // Trial Follow-up Cron: alle 30 Minuten
  setInterval(() => { runTrialFollowupCron().catch((e) => logger.error("[Cron] Trial Follow-up Fehler", e)); }, 30 * 60 * 1000);
  setTimeout(() => runTrialFollowupCron().catch((e) => logger.error("[Cron] Trial Follow-up Fehler (Start)", e)), 5000); // Beim Start
  
  app.get("/api/health", async (_req, res) => {
    const { getMysqlHealth } = await import("../mysqlHealth");
    const { getPublicRuntimeInfo } = await import("../runtimeInfo");
    const health = await getMysqlHealth();
    const body = {
      ok: health.ok,
      db: health.ok ? "connected" : "unavailable",
      latencyMs: health.latencyMs,
      ts: new Date().toISOString(),
      runtime: getPublicRuntimeInfo(),
      ...(health.migrations ? { migrations: health.migrations } : {}),
      ...(health.error ? { error: health.error } : {}),
    };
    return res.status(health.ok ? 200 : 503).json(body);
  });

  // Public Stats (Social Proof) - Keine Auth nötig, aber Rate Limiting
  app.get("/api/stats/public", aiLimiter, async (_req, res) => {
    try {
      const db = await (await import("../db")).getDb();
      const [[users]] = await db.$client.query(
        "SELECT COUNT(*) as total FROM users"
      ) as any;
      const [[active]] = await db.$client.query(
        "SELECT COUNT(*) as cnt FROM users WHERE lastSignedIn > DATE_SUB(NOW(), INTERVAL 1 HOUR)"
      ) as any;
      res.json({
        totalUsers: users?.total || 0,
        activeUsers: active?.cnt || 0,
        certsThisWeek: 0,
      });
    } catch {
      res.json({ totalUsers: 0, activeUsers: 0, certsThisWeek: 0 });
    }
  });


  // Lokaler Dateispeicher (nur wenn kein Manus)
  const { registerStorageRoute } = await import("../storage");
  registerStorageRoute(app);
  // Stripe nur laden, wenn Schlüssel vorhanden ist
  if (process.env.STRIPE_SECRET_KEY) {
    const { stripeRouter } = await import("../stripe");
    app.use(stripeRouter);
  } else {
    logger.info("[dev] Stripe deaktiviert: STRIPE_SECRET_KEY nicht gesetzt");
  }

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files

  // Dynamische Sitemap — nutzt APP_URL statt statische Datei
  app.get("/sitemap.xml", (_req, res) => {
    const base = process.env.APP_URL || "https://immobilien-akademie-smart.de";
    const urls = [
      { loc: "/", priority: "1.0", changefreq: "weekly" },
      { loc: "/kurse", priority: "0.9", changefreq: "weekly" },
      { loc: "/pakete", priority: "0.9", changefreq: "weekly" },
      { loc: "/kurs/modul-1-immobilien-grundkurs", priority: "0.9", changefreq: "monthly" },
      { loc: "/kurs/modul-2-makler-34c", priority: "0.9", changefreq: "monthly" },
      { loc: "/kurs/modul-3-weg-verwalter", priority: "0.9", changefreq: "monthly" },
      { loc: "/verwalter-rechner", priority: "0.95", changefreq: "weekly" },
      { loc: "/fuer-verwaltungsbueros", priority: "0.95", changefreq: "weekly" },
      { loc: "/fuer-maklerbueros", priority: "0.9", changefreq: "weekly" },
      { loc: "/rechenpraxis-preise", priority: "0.9", changefreq: "weekly" },
      { loc: "/kurs/modul-4-gutachter", priority: "0.9", changefreq: "monthly" },
      { loc: "/kurs/modul-5-34i-darlehensvermittler", priority: "0.9", changefreq: "monthly" },
      { loc: "/foerderung", priority: "0.8", changefreq: "monthly" },
      { loc: "/glossary", priority: "0.7", changefreq: "monthly" },
      { loc: "/bildungskonzept", priority: "0.7", changefreq: "monthly" },
      { loc: "/impressum", priority: "0.3" },
      { loc: "/datenschutz", priority: "0.3" },
      { loc: "/agb", priority: "0.3" },
    ];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${base}${u.loc}</loc><priority>${u.priority}</priority>${u.changefreq ? `<changefreq>${u.changefreq}</changefreq>` : ""}</url>`).join("\n")}
</urlset>`;
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(xml);
  });

  // Dynamische robots.txt
  app.get("/robots.txt", (_req, res) => {
    const base = process.env.APP_URL || "https://immobilien-akademie-smart.de";
    res.setHeader("Content-Type", "text/plain");
    res.send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nDisallow: /statistiken\nDisallow: /owner-dashboard\n\nSitemap: ${base}/sitemap.xml\n`);
  });

  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  await seedQuizQuestionsIfEmpty();
  const port = Number(process.env.PORT ?? 8080);
  const host = "0.0.0.0";





// ── User Dashboard Stats ────────────────────────────────────
app.get("/api/stats/dashboard", requireAuth, async (req: any, res: any) => {
  try {
    const db = await (await import("../db")).getDb();
    const userId = req.currentUser.id;
    const [[logs]] = await db.$client.query(
      "SELECT COUNT(*) as total, SUM(completed) as completed, SUM(durationSeconds) as totalSeconds FROM learning_logs WHERE userId = ?",
      [userId]
    ) as any;
    const [[exams]] = await db.$client.query(
      "SELECT COUNT(*) as total, AVG(score) as avgScore FROM exam_sessions WHERE userId = ? AND completedAt IS NOT NULL",
      [userId]
    ) as any;
    const [[certs]] = await db.$client.query(
      "SELECT COUNT(*) as total FROM certificates WHERE userId = ?",
      [userId]
    ) as any;
    res.json({
      daysCompleted: Number(logs?.completed || 0),
      daysTotal: Number(logs?.total || 0),
      totalLearningMinutes: Math.round(Number(logs?.totalSeconds || 0) / 60),
      examsCompleted: Number(exams?.total || 0),
      avgExamScore: Math.round(Number(exams?.avgScore || 0)),
      certificatesEarned: Number(certs?.total || 0),
    });
  } catch(e: any) {
    res.status(500).json({ error: e.message });
  }
});

// ── Performance: Static Asset Caching ─────────────────────
app.use("/assets", (req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  next();
});
app.use("/og-image", (req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=86400");
  next();
});


// ── Spaced Repetition: Fragen nach IDs ──────────────────────
app.get("/api/quiz/questions-by-ids", requireAuth, async (req: any, res: any) => {
  try {
    const ids = String(req.query.ids || "").split(",")
      .map(Number).filter(Boolean);
    if (!ids.length) return res.json({ questions: [] });
    const db = await (await import("../db")).getDb();
    const questions = await db.$client.query(
      `SELECT id, questionText, options, correctAnswer, explanation, moduleId
       FROM question_bank WHERE id IN (${ids.map(() => "?").join(",")})`,
      ids
    );
    res.json({ questions: (questions as any)[0] });
  } catch (e) {
    res.json({ questions: [] });
  }
});


// ── DSGVO Art. 15: Auskunftsrecht ─────────────────────────────
app.get("/api/user/my-data", resetLimiter, requireAuth, async (req: any, res: any) => {
  try {
    const db = await (await import("../db")).getDb();
    const userId = req.currentUser.id;

    const [user] = await db.$client.query(`SELECT id, name, email, role, enabledModules, createdAt, lastSignedIn
       FROM users WHERE id = ?`, [userId]) as any;

    const [progress] = await db.$client.query(
      `SELECT moduleId, dayNumber, completed, durationSeconds, openedAt
       FROM learning_logs WHERE userId = ? ORDER BY openedAt DESC LIMIT 100`,
      [userId]
    ) as any;

    const [exams] = await db.$client.query(
      `SELECT id, moduleId, score, totalQuestions, startedAt, completedAt
       FROM exam_sessions WHERE userId = ? ORDER BY startedAt DESC LIMIT 20`,
      [userId]
    ) as any;

    const [certs] = await db.$client.query(
      `SELECT moduleId, score, issuedAt FROM certificates WHERE userId = ?`,
      [userId]
    ) as any;

    const [chats] = await db.$client.query(
      `SELECT id, moduleId, createdAt FROM chat_conversations
       WHERE userId = ? ORDER BY createdAt DESC LIMIT 50`,
      [userId]
    ) as any;

    const [sr] = await db.$client.query(
      `SELECT questionId, easinessFactor, interval, repetitions, nextReviewAt
       FROM spaced_repetition WHERE userId = ?`,
      [userId]
    ) as any;

    res.json({
      exportDate: new Date().toISOString(),
      legalBasis: "Art. 15 DSGVO — Auskunftsrecht",
      user: (user as any[])[0] || {},
      learningProgress: progress || [],
      examHistory: exams || [],
      certificates: certs || [],
      aiConversations: { count: (chats as any[]).length, sessions: chats || [] },
      spacedRepetition: sr || [],
    });
  } catch (e: any) {
    res.status(500).json({ error: "Daten konnten nicht geladen werden" });
  }
});

// ── DSGVO Art. 20: Datenportabilität (JSON-Export) ────────────
app.get("/api/user/export", resetLimiter, requireAuth, async (req: any, res: any) => {
  try {
    const db = await (await import("../db")).getDb();
    const userId = req.currentUser.id;

    const [user] = await db.$client.query(
      `SELECT name, email, role, enabledModules, createdAt FROM users WHERE id = ?`,
      [userId]
    ) as any;
    const [progress] = await db.$client.query(`SELECT * FROM learning_logs WHERE userId = ?`, [userId]) as any;
    const [exams] = await db.$client.query(`SELECT * FROM exam_sessions WHERE userId = ?`, [userId]) as any;
    const [certs] = await db.$client.query(`SELECT * FROM certificates WHERE userId = ?`, [userId]) as any;
    const [chatsExport] = await db.$client.query(
      `SELECT id, moduleId, createdAt FROM chat_conversations WHERE userId = ? ORDER BY createdAt DESC`,
      [userId]
    ) as any;
    const [srExport] = await db.$client.query(
      `SELECT questionId, easinessFactor, interval, repetitions, nextReviewAt FROM spaced_repetition WHERE userId = ?`,
      [userId]
    ) as any;

    const exportData = {
      exportDate: new Date().toISOString(),
      legalBasis: "Art. 20 DSGVO — Recht auf Datenübertragbarkeit",
      format: "JSON",
      data: {
        account: (user as any[])[0] || {},
        learningProgress: progress || [],
        exams: exams || [],
        certificates: certs || [],
        aiConversations: chatsExport || [],
        spacedRepetition: srExport || [],
      }
    };

    const name = ((user as any[])[0]?.name || "nutzer").replace(/\s+/g, "_");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition",
      `attachment; filename="meine_daten_${name}_${new Date().toISOString().slice(0,10)}.json"`
    );
    res.json(exportData);
  } catch (e: any) {
    res.status(500).json({ error: "Export fehlgeschlagen" });
  }
});

// ── Keep-Alive Cron (verhindert Railway Cold Start) ────────────
setInterval(async () => {
  try {
    const url = (process.env.APP_URL || "https://immobilien-akademie-smart.de") + "/api/health";
    await fetch(url);
    logger.debug("[KeepAlive] Ping OK");
  } catch { /* silent */ }
}, 14 * 60 * 1000); // alle 14 Minuten

// Nacht-Cron: täglich 02:00 Uhr alle 240 Lerntage + User-Coaching
startNightCron();
startHealthWatcher();
const { startAccessExpiryReminders } = await import("../accessExpiryReminders");
startAccessExpiryReminders();
// force deploy Mon Apr  6 20:58:44 CEST 2026

// Keep-Alive: alle 8 Minuten selbst pingen (verhindert Railway Cold Start)
setInterval(async () => {
  try {
    const url = process.env.PUBLIC_URL || "https://immobilien-akademie-smart.de";
    await fetch(`${url}/api/health`).catch(() => {});
  } catch(e) {}
}, 8 * 60 * 1000);

  server.listen(port, host, () => {
  });
}

if (!process.env.VITEST) {
  startServer().catch((err) => console.error("[Server] Startup fehlgeschlagen", err));
}
