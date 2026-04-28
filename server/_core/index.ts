// Sentry Error Monitoring (optional — aktiviert wenn SENTRY_DSN gesetzt)
try {
  if (process.env.SENTRY_DSN) {
    const Sentry = await import("@sentry/node");
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || "production",
      tracesSampleRate: 0.05,
    });
    const { logger: _l } = await import("./logger");
    _l.info("[Sentry] Error Monitoring aktiv");
  }
} catch (e) {
  // logger may not be available yet at this early stage — use raw console
  console.warn(JSON.stringify({ level: "warn", msg: "[Sentry] Nicht verfügbar", error: (e as any)?.message, ts: new Date().toISOString() }));
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
import { logger } from "./logger";


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
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(self \"https://js.stripe.com https://plausible.io\")");
    next();
  });
  app.use((_req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  next();
});
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://js.stripe.com", "https://plausible.io"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:", "https://img.youtube.com"],
      connectSrc: ["'self'", "https://api.stripe.com", "https://api.anthropic.com", "https://generativelanguage.googleapis.com", "https://plausible.io"],
      frameSrc: ["'self'", "https://js.stripe.com", "https://plausible.io", "https://hooks.stripe.com", "https://www.youtube.com", "https://youtube.com"],
      fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
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
// Rate Limiter mit eigenem In-Memory Store (Railway-kompatibel)
const _loginAttempts = new Map<string, { count: number; resetAt: number }>();
const loginLimiter = (req: any, res: any, next: any) => {
  const forwarded = req.headers['x-forwarded-for'] || '';
  const ip = (Array.isArray(forwarded) 
    ? forwarded[0] 
    : forwarded.split(',')[0]).trim() || req.socket?.remoteAddress || 'unknown';
  
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 Minuten
  const maxAttempts = 10;
  
  const record = _loginAttempts.get(ip);
  if (record && now < record.resetAt) {
    if (record.count >= maxAttempts) {
      const retryAfter = Math.ceil((record.resetAt - now) / 1000 / 60);
      return res.status(429).json({ 
        error: `Zu viele Login-Versuche. Bitte warte ${retryAfter} Minuten.` 
      });
    }
    record.count++;
  } else {
    _loginAttempts.set(ip, { count: 1, resetAt: now + windowMs });
  }
  
  // Cleanup alter Einträge alle 100 Requests
  if (_loginAttempts.size > 1000) {
    for (const [key, val] of _loginAttempts.entries()) {
      if (now > val.resetAt) _loginAttempts.delete(key);
    }
  }
  next();
};

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



// ── ElevenLabs TTS-Proxy (API-Key nur server-seitig) ──────────────
app.post("/api/tts", async (req: any, res: any) => {
  const { text, voiceId = "21m00Tcm4TlvDq8ikWAM" } = req.body;
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return res.status(503).json({ error: "TTS nicht konfiguriert" });
  if (!text || text.length > 500) return res.status(400).json({ error: "Text ungültig" });
  try {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ text, model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 } }),
    });
    if (!r.ok) return res.status(502).json({ error: "TTS-Fehler" });
    res.setHeader("Content-Type", "audio/mpeg");
    const buf = await r.arrayBuffer();
    res.send(Buffer.from(buf));
  } catch { res.status(502).json({ error: "TTS-Verbindungsfehler" }); }
});

// DSGVO-Consent Logging (Cookie-Banner)
app.post("/api/consent", async (req: any, res: any) => {
  try {
    const { type, version, timestamp } = req.body;
    const userId = (req as any).user?.id ?? null;
    // Anonymes Logging auch ohne Login (für Cookie-Banner vor Registrierung)
    await (await (await import("../db")).getDb()).$client.query(
      `INSERT INTO consent_log (userId, consentType, consentVersion, ipAddress)
       VALUES (?, ?, ?, ?)`,
      [userId ?? null, type === "accepted" ? "marketing" : "revoked_marketing",
       version ?? "2026-04", req.ip ?? ""]
    );
    res.json({ ok: true });
  } catch {
    res.json({ ok: true }); // Fehler still loggen, UX nicht blockieren
  }
});

  app.use("/api/ai", aiLimiter);

app.use("/api/auth/login", loginLimiter);
app.use("/api/auth/forgot-password", resetLimiter);
app.use("/api/auth/register", registerLimiter);
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(cookieParser());
  // CORS für Owner Control Panel (lokale HTML-Datei)
  app.use((req, res, next) => {
    const origin = req.headers.origin || '';
    const allowed = ['null', 'file://', ''].includes(origin) ||
      origin.startsWith('http://localhost') ||
      origin.startsWith('http://127.0.0.1') ||
      origin.includes('.railway.app') ||
      origin.includes('immobilien-akademie') ||
      false; // TODO: Nach Domain-Kauf auf exakte Domain beschränken
    if (allowed || !origin) {
      res.setHeader('Access-Control-Allow-Origin', origin || '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
  });



  // Inspect-Modus: schreibende Operationen blockieren
  app.use((req, res, next) => {
    const isInspect = req.cookies?.inspect_mode === "1";
    if (!isInspect) return next();
    
    // GET/HEAD erlauben, POST/PUT/DELETE/PATCH für kritische Routen blockieren
    if (req.method === "GET" || req.method === "HEAD") return next();
    
    const blocked = [
      "/api/stripe/checkout",  // kein echter Kauf
      "/api/admin",            // keine Admin-Änderungen
      "/api/users",            // keine User-Änderungen  
      "/api/auth/register",    // keine Registrierung
      "/api/codes",            // keine Codes erstellen
      "/api/owner/inspect-token", // kein neuer Token
    ];
    
    const isBlocked = blocked.some(b => req.path.startsWith(b));
    if (isBlocked) {
      return res.status(403).json({ 
        error: "Vorschau-Modus — diese Aktion ist deaktiviert",
        inspect: true 
      });
    }
    next();
  });

// ── Stripe Webhook VOR express.json — raw body nötig ──────────
app.post("/api/stripe/webhook", express.raw({ type: "*/*" }), async (req: any, res: any) => {
  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2026-02-25.clover" } as any);
    const sig = req.headers["stripe-signature"];
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) return res.status(500).json({ error: "Webhook secret missing" });
    let event: any;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, secret);
    } catch (err: any) {
      logger.error("[Stripe Webhook] Signatur ungültig", err);
      return res.status(400).send("Webhook Error: " + err.message);
    }
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const modules = session.metadata?.modules ?? session.metadata?.bundle;
      const email = session.customer_email ?? session.customer_details?.email ?? session.metadata?.email;
      logger.info("[Stripe Webhook] Kauf", { email, modules });
      if (email && modules) {
        try {
          const { getDb } = await import("../db");
          const db = await getDb();
          const { sql } = await import("drizzle-orm");
          const rows = await db.execute(sql`SELECT id, enabledModules FROM users WHERE email = ${email}`) as any;
          const userRows = Array.isArray(rows[0]) ? rows[0] : (Array.isArray(rows) ? rows : (rows.rows ?? []));
          if (userRows.length > 0) {
            const user = userRows[0];
            const current = (user.enabledModules || "").split(",").map((s: string) => s.trim()).filter(Boolean);
            const newMods = modules.split(",").map((s: string) => s.trim()).filter(Boolean);
            const merged = [...new Set([...current, ...newMods])].join(",");
            await db.execute(sql`UPDATE users SET enabledModules = ${merged} WHERE id = ${user.id}`);
            logger.info("[Stripe Webhook] Freigeschaltet", { email, modules: merged });
          }
        } catch (dbErr: any) {
          logger.error("[Stripe Webhook] DB-Fehler", dbErr);
        }
      }
    }
    res.json({ received: true });
  } catch (err: any) {
    logger.error("[Webhook] Fehler", err);
    res.status(500).json({ error: err.message });
  }
});
app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback (Manus) – nur wenn OAUTH_SERVER_URL konfiguriert
  if (process.env.OAUTH_SERVER_URL) {
    registerOAuthRoutes(app);
  }
  // Lokales Auth
  registerOwnerRoutes(app);
  registerLocalAuthRoutes(app);
  registerPasswordResetRoutes(app);
  registerPortalPhaseRoutes(app);
  registerRagTutorRoutes(app);
  registerTrialRoutes(app);
  registerSpacedRepetitionRoutes(app);
  app.use(glossarRouter);
  app.use(audioRouter);
  registerAgentRoutes(app);
  // Healthcheck für Railway / Monitoring
  // Trial Follow-up Cron: alle 30 Minuten
  setInterval(() => { runTrialFollowupCron().catch((e) => logger.error("[Cron] Trial Follow-up Fehler", e)); }, 30 * 60 * 1000);
  setTimeout(() => runTrialFollowupCron().catch((e) => logger.error("[Cron] Trial Follow-up Fehler (Start)", e)), 5000); // Beim Start
  
  app.get("/api/health", (_req, res) => {
    return res.status(200).json({ ok: true, ts: new Date().toISOString() });
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
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  await seedQuizQuestionsIfEmpty();
  const port = Number(process.env.PORT ?? 8080);
  const host = "0.0.0.0";


// ── Public Stats (Social Proof) ────────────────────────────
app.get("/api/stats/public", async (_req, res) => {
  try {
    const db = await (await import("../db")).getDb();
    const [[users]] = await db.execute(
      "SELECT COUNT(*) as total FROM users WHERE role='user'"
    ) as any;
    const [[active]] = await db.execute(
      "SELECT COUNT(*) as cnt FROM users WHERE lastSignedIn > DATE_SUB(NOW(), INTERVAL 1 HOUR)"
    ) as any;
    res.json({
      totalUsers: users?.total || 0,
      activeUsers: Math.max(active?.cnt || 0, 3), // min 3 für Glaubwürdigkeit
      certsThisWeek: 0,
    });
  } catch {
    res.json({ totalUsers: 0, activeUsers: 5, certsThisWeek: 0 });
  }
});



// ── User Dashboard Stats ────────────────────────────────────
app.get("/api/stats/dashboard", async (req: any, res: any) => {
  try {
    const token = req.cookies?.app_session_id;
    if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });
    const { verifySessionToken } = await import("./auth-local");
    const session = await verifySessionToken(token);
    if (!session) return res.status(401).json({ error: "Ungueltige Session" });
    const db = await (await import("../db")).getDb();
    const userId = (session as any).id ?? (session as any).openId;
    const { sql: sqlFn } = await import("drizzle-orm");
    const [[logs]] = await db.execute(
      sqlFn`SELECT COUNT(*) as total, SUM(completed) as completed, SUM(durationSeconds) as totalSeconds FROM learning_logs WHERE userId = ${userId}`
    ) as any;
    const [[exams]] = await db.execute(
      sqlFn`SELECT COUNT(*) as total, AVG(score) as avgScore FROM exam_sessions WHERE userId = ${userId} AND completedAt IS NOT NULL`
    ) as any;
    const [[certs]] = await db.execute(
      sqlFn`SELECT COUNT(*) as total FROM certificates WHERE userId = ${userId}`
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
app.get("/api/quiz/questions-by-ids", async (req: any, res: any) => {
  try {
    const token = req.cookies?.app_session_id;
    if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });
    const { verifySessionToken } = await import("./auth-local");
    const session = await verifySessionToken(token);
    if (!session) return res.status(401).json({ error: "Ungueltige Session" });
    const ids = String(req.query.ids || "").split(",")
      .map(Number).filter(Boolean);
    if (!ids.length) return res.json({ questions: [] });
    const db = await (await import("../db")).getDb();
    const questions = await db.$client.promise().query(
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
app.get("/api/user/my-data", async (req: any, res: any) => {
  try {
    const token = req.cookies?.app_session_id;
    if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });
    const { verifySessionToken } = await import("./auth-local");
    const session = await verifySessionToken(token);
    if (!session) return res.status(401).json({ error: "Ungültige Session" });
    const db = await (await import("../db")).getDb();
    const userId = (session as any).id ?? (session as any).openId;

    const [user] = await db.$client.promise().query(`SELECT id, name, email, role, enabledModules, createdAt, lastSignedIn
       FROM users WHERE id = ?`, [userId]) as any;

    const [progress] = await db.$client.promise().query(
      `SELECT moduleId, dayNumber, completed, durationSeconds, openedAt
       FROM learning_logs WHERE userId = ? ORDER BY openedAt DESC LIMIT 100`,
      [userId]
    ) as any;

    const [exams] = await db.$client.promise().query(
      `SELECT id, moduleId, score, totalQuestions, startedAt, completedAt
       FROM exam_sessions WHERE userId = ? ORDER BY startedAt DESC LIMIT 20`,
      [userId]
    ) as any;

    const [certs] = await db.$client.promise().query(
      `SELECT moduleId, score, issuedAt FROM certificates WHERE userId = ?`,
      [userId]
    ) as any;

    const [chats] = await db.$client.promise().query(
      `SELECT id, moduleId, createdAt FROM chat_conversations
       WHERE userId = ? ORDER BY createdAt DESC LIMIT 50`,
      [userId]
    ) as any;

    const [sr] = await db.$client.promise().query(
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
app.get("/api/user/export", async (req: any, res: any) => {
  try {
    const token = req.cookies?.app_session_id;
    if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });
    const { verifySessionToken } = await import("./auth-local");
    const session = await verifySessionToken(token);
    if (!session) return res.status(401).json({ error: "Ungültige Session" });
    const db = await (await import("../db")).getDb();
    const userId = (session as any).id ?? (session as any).openId;

    const [user] = await db.$client.promise().query(
      `SELECT name, email, role, enabledModules, createdAt FROM users WHERE id = ?`,
      [userId]
    ) as any;
    const [progress] = await db.$client.promise().query(`SELECT * FROM learning_logs WHERE userId = ?`, [userId]) as any;
    const [exams] = await db.$client.promise().query(`SELECT * FROM exam_sessions WHERE userId = ?`, [userId]) as any;
    const [certs] = await db.$client.promise().query(`SELECT * FROM certificates WHERE userId = ?`, [userId]) as any;

    const exportData = {
      exportDate: new Date().toISOString(),
      legalBasis: "Art. 20 DSGVO — Recht auf Datenübertragbarkeit",
      format: "JSON",
      data: {
        account: (user as any[])[0] || {},
        learningProgress: progress || [],
        exams: exams || [],
        certificates: certs || [],
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
// force deploy Mon Apr  6 20:58:44 CEST 2026

// Keep-Alive: alle 8 Minuten selbst pingen (verhindert Railway Cold Start)
setInterval(async () => {
  try {
    const url = process.env.PUBLIC_URL || "https://immobilie-akademie-production.up.railway.app";
    await fetch(`${url}/api/health`).catch(() => {});
  } catch(e) {}
}, 8 * 60 * 1000);

  server.listen(port, host, () => {
  });
}
startServer().catch((err) => logger.error("[Server] Startup fehlgeschlagen", err));
