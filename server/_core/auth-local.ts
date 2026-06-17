/**
 * auth-local.ts – Universelles Email/Passwort-Auth
 *
 * Ersetzt Manus OAuth vollständig.
 * Läuft auf jedem Host ohne externe Dienste.
 *
 * Sicherheit: PBKDF2-SHA256 (built-in Node.js crypto), JWT via jose
 */

import { randomBytes, pbkdf2Sync, timingSafeEqual } from "crypto";
import { logger } from "./logger";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import { SignJWT, jwtVerify } from "jose";
import * as db from "../db";
import { ENV } from "./env";
import { getSessionCookieOptions } from "./cookies";
import { clearAllAuthCookies, clearInspectCookies } from "../authCookies";

// ── Passwort-Hashing (PBKDF2, kein bcrypt nötig) ────────────────────────────

const HASH_ITERATIONS = 100_000;
const HASH_KEYLEN = 64;
const HASH_DIGEST = "sha256";

/**
 * Hasht ein Passwort mit PBKDF2-SHA256.
 * Hashes a password using PBKDF2-SHA256.
 *
 * @param {string} password Das Klartext-Passwort.
 * @param {string} [salt] Optionaler Salt (wenn nicht angegeben, wird ein neuer generiert).
 * @returns {{ hash: string; salt: string }} Der generierte Hash und der verwendete Salt.
 */
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const usedSalt = salt ?? randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, usedSalt, HASH_ITERATIONS, HASH_KEYLEN, HASH_DIGEST).toString("hex");
  return { hash, salt: usedSalt };
}

/**
 * Verifiziert ein Passwort gegen einen gespeicherten Hash.
 * Verifies a password against a stored hash.
 *
 * @param {string} password Das zu prüfende Passwort.
 * @param {string} storedHash Der gespeicherte Hash.
 * @param {string} storedSalt Der gespeicherte Salt.
 * @returns {boolean} True, wenn das Passwort korrekt ist.
 */
export function verifyPassword(password: string, storedHash: string, storedSalt: string): boolean {
  const { hash } = hashPassword(password, storedSalt);
  return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(storedHash, "hex"));
}

// ── JWT Session ───────────────────────────────────────────────────────────────

function getSecret() {
  if (!ENV.cookieSecret) {
    logger.error("FATAL: JWT_SECRET/cookieSecret not set. Server cannot start securely.");
    process.exit(1);
  }
  return new TextEncoder().encode(ENV.cookieSecret);
}

/**
 * Erstellt einen JWT-Session-Token für einen Nutzer.
 * Creates a JWT session token for a user.
 *
 * @param {string} openId Die openId des Nutzers.
 * @param {string} name Der Name des Nutzers.
 * @param {string} [role] Die Rolle des Nutzers.
 * @param {string} [enabledModules] Kommagetrennte Liste der freigeschalteten Module.
 * @returns {Promise<string>} Der signierte JWT-Token.
 */
export async function createSessionToken(openId: string, name: string, role?: string, enabledModules?: string): Promise<string> {
  return new SignJWT({ openId, appId: "local", name, ...(role ? { role } : {}), ...(enabledModules ? { enabledModules } : {}) })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(Math.floor((Date.now() + ONE_YEAR_MS) / 1000))
    .sign(getSecret());
}

/**
 * Verifiziert einen Session-Token und gibt die Payload zurück.
 * Verifies a session token and returns the payload.
 *
 * @param {string | undefined | null} token Der zu prüfende Token.
 * @returns {Promise<{ openId: string; name: string } | null>} Die Payload oder null bei Fehler.
 */
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

// ── Pending Purchase Claim ────────────────────────────────────────────────────

type DbConn = { $client: { query: Function } };

/**
 * Claimt offene pending_purchases für eine E-Mail und merged Module in users.enabledModules.
 * Wird bei Register und Login aufgerufen, damit Gast-Käufe nach Account-Nutzung greifen.
 *
 * Bei Claim-Fehler (P1): Aufrufer soll loggen und Login/Register nicht hart blockieren —
 * der Nutzer kann sich anmelden, Module bleiben ggf. gesperrt bis Support oder erneuter Versuch.
 */
export async function claimPendingPurchasesForUser(
  dbConn: DbConn,
  userId: number,
  email: string,
  currentEnabledModules: string,
): Promise<string> {
  const normalizedEmail = email.toLowerCase().trim();
  const [pendingRows] = await dbConn.$client.query(
    "SELECT modules, productId FROM pending_purchases WHERE email = ? AND claimedAt IS NULL",
    [normalizedEmail],
  ) as any;

  if ((pendingRows as any[]).length === 0) {
    return currentEnabledModules;
  }

  const current = String(currentEnabledModules || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);
  const purchased = (pendingRows as any[]).flatMap((row: any) =>
    String(row.modules || "")
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean),
  );
  const merged = [...new Set([...current, ...purchased])].join(",");

  await dbConn.$client.query(
    "UPDATE users SET enabledModules = ?, trialExpiresAt = NULL WHERE id = ?",
    [merged, userId],
  );
  const { extendUserAccessFromPurchase } = await import("../accessExpiry");
  for (const row of pendingRows as any[]) {
    await extendUserAccessFromPurchase(
      dbConn,
      userId,
      row.productId,
      String(row.modules || ""),
    );
  }
  const { applyReferralPurchaseRewards } = await import("../referralRewards");
  await applyReferralPurchaseRewards(dbConn, userId);
  await dbConn.$client.query(
    "UPDATE pending_purchases SET claimedAt = NOW(), claimedByUserId = ? WHERE email = ? AND claimedAt IS NULL",
    [userId, normalizedEmail],
  );
  logger.info("[Auth] Pending Purchases geclaimt", { email: normalizedEmail, modules: merged, userId });

  return merged;
}

// ── Express Routes ────────────────────────────────────────────────────────────

/**
 * Registriert die lokalen Authentifizierungs-Routen (Register, Login, Logout, Me).
 * Registers local authentication routes (Register, Login, Logout, Me).
 *
 * @param {Express} app Die Express-App-Instanz.
 */
export function registerLocalAuthRoutes(app: Express) {

  /**
   * POST /api/auth/register
   * Registriert einen neuen Nutzer.
   * Erster Nutzer wird automatisch Admin.
   */
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    const { email, password, name, referralCode } = req.body ?? {};

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
      enabledModules: "", // Kein Gratis-Zugang — Kauf oder Trial erforderlich
      // Passwort-Hash im name-Feld wird separat gespeichert
    });

    // Passwort-Hash in auth_credentials speichern
    await db.savePasswordHash(openId, hash, salt);

    // Falls erster Nutzer: zum Admin machen
    if (role === "admin") {
      await db.setUserRole(openId, "admin");
    }

    // Pending Purchases claimen, falls der Kauf vor der Registrierung erfolgte
    let sessionEnabledModules = "";
    try {
      const dbConn = await db.getDb();
      const normalizedEmail = email.toLowerCase().trim();
      const [userRows] = await dbConn.$client.query(
        "SELECT id, enabledModules FROM users WHERE openId = ? LIMIT 1",
        [openId],
      ) as any;
      const newUser = (userRows as any[])[0];

      if (newUser?.id) {
        sessionEnabledModules = await claimPendingPurchasesForUser(
          dbConn,
          newUser.id,
          normalizedEmail,
          String(newUser.enabledModules || ""),
        );

        if (referralCode && typeof referralCode === "string") {
          const { attributeReferral } = await import("../referralRewards");
          await attributeReferral(dbConn, newUser.id, referralCode);
        }
      }
    } catch (pendingErr: any) {
      logger.error("[Auth Register] Pending Purchase Claim fehlgeschlagen", pendingErr);
    }

    // Session erstellen
    const newUserRole = role === "admin" ? "admin" : "user";
    clearInspectCookies(req, res);
    const token = await createSessionToken(openId, name.trim(), newUserRole, sessionEnabledModules);
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });

    const registeredUser = await db.getUserByOpenId(openId);
    const { auditRequestMeta, recordPlatformAudit } = await import("../platformAuditLog");
    recordPlatformAudit({
      eventType: "register",
      actorUserId: registeredUser?.id,
      actorEmail: email.toLowerCase().trim(),
      actorRole: newUserRole,
      ...auditRequestMeta(req),
    });

    // Willkommens-E-Mail (fire & forget)
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY ?? "");
      await resend.emails.send({
        from: "Immobilien Akademie Smart <info@immobilien-akademie-smart.de>",
        to: email.toLowerCase().trim(),
        subject: "Willkommen bei der Immobilien Akademie Smart",
        html: "<div style=\"font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;\"><div style=\"background:#1e293b;padding:20px 24px;border-radius:8px 8px 0 0;\"><h1 style=\"color:#3b82f6;margin:0;font-size:20px;\">Immobilien Akademie Smart</h1></div><div style=\"background:#f8fafc;border:1px solid #e2e8f0;border-top:none;padding:28px 24px;border-radius:0 0 8px 8px;\"><h2 style=\"color:#0f172a;font-size:18px;margin:0 0 12px;\">Herzlich willkommen!</h2><p style=\"color:#475569;line-height:1.6;margin:0 0 16px;\">Ihr Konto wurde erfolgreich erstellt. Sie können jetzt einen Kurs auswählen, einen Zugangscode einlösen oder nach einem Kauf mit derselben E-Mail Ihren Lernbereich nutzen.</p><div style=\"background:#eff6ff;border-left:3px solid #3b82f6;padding:12px 16px;margin:0 0 20px;border-radius:4px;\"><p style=\"color:#1e40af;margin:0;font-size:14px;\">Praxisorientiertes Lernportal mit modularen Kursen und KI-Tutor</p></div><a href=\"https://immobilien-akademie-smart.de/statistiken\" style=\"display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;\">Jetzt lernen</a><p style=\"color:#94a3b8;font-size:12px;margin:24px 0 0;\">Immobilien Akademie Smart - Durlacher Str. 36 - 10715 Berlin</p></div></div>",
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
    clearInspectCookies(req, res);
    const token = await createSessionToken(openId, user.name || "Admin", "admin", user.enabledModules || "");
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
    return res.redirect("/");
  });
  // Präsentations-Code Login — erstellt temporären Guest-User + setzt Cookie
  app.post("/api/auth/redeem-code", async (req: Request, res: Response) => {
    try {
      const { code } = req.body ?? {};
      if (!code) return res.status(400).json({ error: "Code fehlt" });
      const normalized = code.trim().toUpperCase();
      const {
        getOptionalUserIdFromRequest,
        redeemAccessCodeForUser,
        redeemAccessCodePublic,
      } = await import("../accessCodeRedeem");
      const { redeemPresentationCode } = await import("../db");

      const loggedInUserId = await getOptionalUserIdFromRequest(req);
      if (loggedInUserId) {
        const accessResult = await redeemAccessCodeForUser(loggedInUserId, normalized);
        if (accessResult.success) {
          const { getDb } = await import("../db");
          const dbConn = await getDb();
          const [userRows] = (await dbConn.$client.query(
            "SELECT openId, name, role FROM users WHERE id = ? LIMIT 1",
            [loggedInUserId],
          )) as any;
          const row = userRows[0];
          if (!row) return res.status(400).json({ error: "Nutzer nicht gefunden" });
          await db.updateLastSignedIn(row.openId);
          const token = await createSessionToken(
            row.openId,
            row.name || "Nutzer",
            row.role || "user",
            accessResult.enabledModules,
          );
          const cookieOptions = getSessionCookieOptions(req);
          res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
          return res.json({ ok: true });
        }
      }

      const result = await redeemPresentationCode(normalized);
      if (result.success) {
        const openId = `presentation:${normalized}`;
        const { getDb } = await import("../db");
        const dbConn = await getDb();
        const enabledStr = result.enabledModules ?? "";
        if (dbConn) {
          const expiresAt = (result as any).expiresAt ?? null;
          await dbConn.$client.query(`
            INSERT INTO users (openId, name, role, enabledModules, trialExpiresAt, lastSignedIn)
            VALUES (?, 'Gast', 'user', ?, ?, NOW())
            ON DUPLICATE KEY UPDATE
              enabledModules = VALUES(enabledModules),
              trialExpiresAt = IF(? IS NOT NULL, ?, trialExpiresAt)
          `, [openId, enabledStr, expiresAt, expiresAt, expiresAt]);
          await db.updateLastSignedIn(openId);
        }
        const token = await createSessionToken(openId, "Gast", "user", enabledStr);
        const cookieOptions = getSessionCookieOptions(req);
        res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
        return res.json({ ok: true });
      }

      const accessPublic = await redeemAccessCodePublic(normalized);
      if (!accessPublic.success) {
        return res.status(400).json({ error: accessPublic.message });
      }
      const openId = accessPublic.openId || `access:${normalized}`;
      await db.updateLastSignedIn(openId);
      const token = await createSessionToken(
        openId,
        "Team-Mitglied",
        "user",
        accessPublic.enabledModules,
      );
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

    // Pending Purchases claimen (Gast-Kauf vor Login mit bestehendem Account)
    let sessionEnabledModules = user.enabledModules || "";
    try {
      const dbConn = await db.getDb();
      sessionEnabledModules = await claimPendingPurchasesForUser(
        dbConn,
        user.id,
        email.toLowerCase().trim(),
        sessionEnabledModules,
      );
    } catch (claimErr: any) {
      // P1: Fehlender Claim kann Paywall trotz Zahlung bedeuten — Login absichtlich nicht blockieren.
      logger.error("[Auth Login] Pending Purchase Claim fehlgeschlagen", claimErr);
    }

    const { auditRequestMeta, recordPlatformAudit } = await import("../platformAuditLog");
    recordPlatformAudit({
      eventType: "login",
      actorUserId: user.id,
      actorEmail: user.email || email,
      actorRole: user.role,
      ...auditRequestMeta(req),
    });

    clearInspectCookies(req, res);
    const token = await createSessionToken(openId, user.name || email, user.role || "user", sessionEnabledModules);
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });

    return res.json({ ok: true, name: user.name, role: user.role });
  });

  /**
   * POST /api/auth/logout
   * Löscht Session-Cookie.
   */
  app.post("/api/auth/logout", async (req: Request, res: Response) => {
    try {
      const { parse: parseCookie } = await import("cookie");
      const cookies = parseCookie(req.headers.cookie ?? "");
      const session = await verifySessionToken(cookies[COOKIE_NAME]);
      if (session?.openId) {
        const user = await db.getUserByOpenId(session.openId);
        const { auditRequestMeta, recordPlatformAudit } = await import("../platformAuditLog");
        recordPlatformAudit({
          eventType: "logout",
          actorUserId: user?.id,
          actorEmail: user?.email || session.openId,
          actorRole: user?.role,
          ...auditRequestMeta(req),
        });
      }
    } catch { /* ignore */ }
    clearAllAuthCookies(req, res);
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
