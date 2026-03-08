/**
 * auth-local.ts – Universelles Email/Passwort-Auth
 *
 * Ersetzt Manus OAuth vollständig.
 * Läuft auf jedem Host ohne externe Dienste.
 *
 * Sicherheit: PBKDF2-SHA256 (built-in Node.js crypto), JWT via jose
 */

import { randomBytes, pbkdf2Sync } from "crypto";
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
  return new TextEncoder().encode(ENV.cookieSecret || "CHANGE_THIS_SECRET_IN_ENV");
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
