// Sentry Error Monitoring (optional — aktiviert wenn SENTRY_DSN gesetzt)
try {
  if (process.env.SENTRY_DSN) {
    const Sentry = await import("@sentry/node");
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || "production",
      tracesSampleRate: 0.05,
    });
    console.log("[Sentry] Error Monitoring aktiv");
  }
} catch (e) {
  console.log("[Sentry] Nicht verfügbar:", e);
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
import { registerTrialRoutes } from "../trialRoute";


// Globaler Error Handler
process.on('uncaughtException', (err) => {
  console.error('[CRITICAL] Uncaught Exception:', err.message, err.stack);
});
process.on('unhandledRejection', (reason) => {
  console.error('[CRITICAL] Unhandled Rejection:', reason);
});


async function startServer() {
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
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://api.stripe.com", "https://api.anthropic.com", "https://generativelanguage.googleapis.com", "https://plausible.io"],
      frameSrc: ["'self'", "https://js.stripe.com", "https://plausible.io", "https://hooks.stripe.com"],
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
app.use(compression()); // Gzip/Brotli Kompression // Railway Fastly CDN
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


// ── ElevenLabs TTS-Proxy (API-Key nur server-seitig) ──────────────
app.post("/api/tts", async (req: Request, res: Response) => {
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
app.post("/api/consent", async (req: Request, res: Response) => {
  try {
    const { type, version, timestamp } = req.body;
    const userId = (req as any).user?.id ?? null;
    // Anonymes Logging auch ohne Login (für Cookie-Banner vor Registrierung)
    await (await import("../db")).getDb().execute(
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
app.use("/api/auth/register", loginLimiter);
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
      origin.includes('netlify.app');
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
  registerAgentRoutes(app);
  // Healthcheck für Railway / Monitoring
  // Trial Follow-up Cron: alle 30 Minuten
  setInterval(() => { runTrialFollowupCron().catch(console.error); }, 30 * 60 * 1000);
  setTimeout(() => runTrialFollowupCron().catch(console.error), 5000); // Beim Start
  
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
    console.log("[dev] Stripe deaktiviert: STRIPE_SECRET_KEY nicht gesetzt");
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

  server.listen(port, host, () => {
  });
}

startServer().catch(console.error);
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

