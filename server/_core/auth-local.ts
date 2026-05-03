/**
 * auth-local.ts – Universelles Email/Passwort-Auth
 *
 * Ersetzt Manus OAuth vollständig.
 * Läuft auf jedem Host ohne externe Dienste.
 *
 * Sicherheit: PBKDF2-SHA256 (built-in Node.js crypto), JWT via jose
 */

import { randomBytes, pbkdf2Sync } from "crypto";
import { logger } from "./logger";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import { SignJWT, jwtVerify } from "jose";
import * as db from "../db";
import { ENV } from "./env";
import { getSessionCookieOptions } from "./cookies";

// ── Passwort-Hashing (PBKDF2, kein bcrypt nötig) ────────────────────────────

const HASH_ITERATIONS = 100_000;
const HASH_KEYLEN = 64;
const HASH_DIGEST = "sha256";

export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const usedSalt = salt ?? randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, usedSalt, HASH_ITERATIONS, HASH_KEYLEN, HASH_DIGEST).toString("hex");
  return { hash, salt: usedSalt };
}

export function verifyPassword(password: string, storedHash: string, storedSalt: string): boolean {
  const { hash } = hashPassword(password, storedSalt);
  return hash === storedHash;
}

// ── JWT Session ───────────────────────────────────────────────────────────────

function getSecret() {
  if (!ENV.cookieSecret) {
    logger.error("FATAL: JWT_SECRET/cookieSecret not set. Server cannot start securely.");
    process.exit(1);
  }
  return new TextEncoder().encode(ENV.cookieSecret);
}

export async function createSessionToken(openId: string, name: string): Promise<string> {
  return new SignJWT({ openId, appId: "local", name })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(Math.floor((Date.now() + ONE_YEAR_MS) / 1000))
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<{ openId: string; name: string } | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    const openId = payload.openId as string;
    const name = payload.name as string;
    if (!openId) return null;
    return { openId, name };
  } catch {
    return null;
  }
}

// ── Express Routes ────────────────────────────────────────────────────────────

export function registerLocalAuthRoutes(app: Express) {

  /**
   * POST /api/auth/register
   * Registriert einen neuen Nutzer.
   * Erster Nutzer wird automatisch Admin.
   */
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    const { email, password, name } = req.body ?? {};

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Name, E-Mail und Passwort sind erforderlich." });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Passwort muss mindestens 8 Zeichen haben." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Ungültige E-Mail-Adresse." });
    }

    const openId = `local:${email.toLowerCase().trim()}`;

    // Prüfen ob E-Mail bereits vergeben
    const existing = await db.getUserByOpenId(openId);
    if (existing) {
      return res.status(409).json({ error: "Diese E-Mail ist bereits registriert." });
    }

    // Passwort hashen
    const { hash, salt } = hashPassword(password);

    // Prüfen ob erster Nutzer → Admin
    const userCount = await db.getUserCount();
    const role = userCount === 0 ? "admin" : "user";

    // Nutzer anlegen
    await db.upsertUser({
      openId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      loginMethod: "email",
      lastSignedIn: new Date(),
      // Passwort-Hash im name-Feld wird separat gespeichert
    });

    // Passwort-Hash in auth_credentials speichern
    await db.savePasswordHash(openId, hash, salt);

    // Falls erster Nutzer: zum Admin machen
    if (role === "admin") {
      await db.setUserRole(openId, "admin");
    }

    // Session erstellen
    const token = await createSessionToken(openId, name.trim());
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });

    // Willkommens-E-Mail (fire & forget)
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY ?? "");
      await resend.emails.send({
        from: "Immobilien Akademie Smart <premium@immobilien-akademie-smart.de>",
        to: email.toLowerCase().trim(),
        subject: "Willkommen bei der Immobilien-Akademie Smart",
        html: "<div style=\"font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;\"><div style=\"background:#1e293b;padding:20px 24px;border-radius:8px 8px 0 0;\"><h1 style=\"color:#3b82f6;margin:0;font-size:20px;\">Immobilien-Akademie Smart</h1></div><div style=\"background:#f8fafc;border:1px solid #e2e8f0;border-top:none;padding:28px 24px;border-radius:0 0 8px 8px;\"><h2 style=\"color:#0f172a;font-size:18px;margin:0 0 12px;\">Herzlich willkommen!</h2><p style=\"color:#475569;line-height:1.6;margin:0 0 16px;\">Ihr Konto wurde erfolgreich erstellt. Modul 1 ist sofort für 149 EUR verfügbar.</p><div style=\"background:#eff6ff;border-left:3px solid #3b82f6;padding:12px 16px;margin:0 0 20px;border-radius:4px;\"><p style=\"color:#1e40af;margin:0;font-size:14px;\">240 Lerntage - 1.920 Unterrichtseinheiten - IHK-orientiert</p></div><a href=\"https://immobilie-akademie-production.up.railway.app/dashboard\" style=\"display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;\">Jetzt lernen</a><p style=\"color:#94a3b8;font-size:12px;margin:24px 0 0;\">Immobilien-Akademie Smart - Durlacher Str. 36 - 10715 Berlin</p></div></div>",
      });
    } catch (emailErr) {
      console.error("[register] Willkommens-E-Mail fehlgeschlagen:", emailErr);
    }

    return res.json({ ok: true, name: name.trim(), role });
  });

  /**
   * POST /api/auth/login
   * Meldet Nutzer mit E-Mail + Passwort an.
   */
  // Magic Link - Demo-Login via ENV-Secret
  app.get("/api/auth/magic", async (req: Request, res: Response) => {
    const { secret } = req.query as { secret?: string };
    const validSecret = process.env.MAGIC_LINK_SECRET;
    if (!validSecret || secret !== validSecret) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const openId = "local:admin@immobilie.de";
    const user = await db.getUserByOpenId(openId);
    if (!user) {
      return res.status(404).json({ error: "Demo-User nicht gefunden" });
    }
    await db.updateUserRole(openId, "admin");
    const token = await createSessionToken(openId, user.name || "Admin");
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
    return res.redirect("/");
  });
  // Präsentations-Code Login — erstellt temporären Guest-User + setzt Cookie
  app.post("/api/auth/redeem-code", async (req: Request, res: Response) => {
    try {
      const { code } = req.body ?? {};
      if (!code) return res.status(400).json({ error: "Code fehlt" });
      const { redeemPresentationCode, upsertUser, getUserByOpenId, updateUserEnabledModules } = await import("../db");
      const result = await redeemPresentationCode(code.trim().toUpperCase());
      if (!result.success) return res.status(400).json({ error: result.message });
      const openId = `presentation:${code.trim().toUpperCase()}`;
      // User anlegen OHNE enabledModules zu überschreiben, dann direkt setzen
      // trialExpiresAt aus presentation_code übernehmen falls vorhanden
      const { getDb } = await import("../db");
      const { sql } = await import("drizzle-orm");
      const dbConn = await getDb();
      const enabledStr = result.enabledModules ?? "";
      if (dbConn) {
        // INSERT OR UPDATE - enabledModules explizit setzen
        await dbConn.execute(sql`
          INSERT INTO users (openId, name, role, enabledModules, lastSignedIn)
          VALUES (${openId}, 'Gast', 'user', ${enabledStr}, NOW())
          ON DUPLICATE KEY UPDATE
            enabledModules = ${enabledStr},
            trialExpiresAt = CASE WHEN ${(result as any).expiresAt ?? null} IS NOT NULL
              THEN ${(result as any).expiresAt ?? null} ELSE trialExpiresAt END,
            lastSignedIn = NOW()
        `);
      }
      const token = await createSessionToken(openId, "Gast");
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      return res.json({ ok: true });
    } catch (err: any) {
      console.error("[redeem-code] Error:", err);
      return res.status(500).json({ error: "Interner Fehler: " + err.message });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({ error: "E-Mail und Passwort erforderlich." });
    }

    const openId = `local:${email.toLowerCase().trim()}`;
    const user = await db.getUserByOpenId(openId);

    if (!user) {
      // Sicherheit: gleiche Fehlermeldung ob Nutzer fehlt oder Passwort falsch
      return res.status(401).json({ error: "E-Mail oder Passwort falsch." });
    }

    const creds = await db.getPasswordHash(openId);
    if (!creds || !verifyPassword(password, creds.hash, creds.salt)) {
      return res.status(401).json({ error: "E-Mail oder Passwort falsch." });
    }

    // Letzten Login aktualisieren
    await db.updateLastSignedIn(openId);

    // Session erstellen
    const token = await createSessionToken(openId, user.name || email);
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });

    return res.json({ ok: true, name: user.name, role: user.role });
  });

  /**
   * POST /api/auth/logout
   * Löscht Session-Cookie.
   */
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    res.clearCookie(COOKIE_NAME);
    return res.json({ ok: true });
  });

  /**
   * GET /api/auth/me
   * Gibt eingeloggten Nutzer zurück (Cookie-basiert).
   */
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    const { parse: parseCookie } = await import("cookie");
    const cookies = parseCookie(req.headers.cookie ?? "");
    const token = cookies[COOKIE_NAME];
    const session = await verifySessionToken(token);
    if (!session) return res.status(401).json({ error: "Nicht eingeloggt." });
    const user = await db.getUserByOpenId(session.openId);
    if (!user) return res.status(401).json({ error: "Nutzer nicht gefunden." });
    return res.json(user);
  });
}
