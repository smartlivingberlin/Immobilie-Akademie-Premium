import type { Express, Request, Response } from "express";
import { generateOTP, verifyOTP, sendOTPEmail } from "./twoFactor";
import { createSessionToken } from "./_core/auth-local";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { COOKIE_NAME, ONE_YEAR_MS } from "../shared/const";

export function registerOwnerRoutes(app: Express) {

  // GET /api/owner/access?key=OWNER-XXXX
  app.get("/api/owner/access", async (req: Request, res: Response) => {
    const { key, redirect: redir } = req.query as { key?: string; redirect?: string };
    const ownerCode = process.env.OWNER_MAGIC_CODE || ENV.ownerMagicCode;
    if (!key || !ownerCode || key !== ownerCode) {
      return res.status(403).send(`<html><body style="font-family:Arial;padding:40px;text-align:center"><h2 style="color:#dc2626">Zugang verweigert</h2></body></html>`);
    }
    const openId = "local:alisadgadyri38@gmail.com";
    const token = await createSessionToken(openId, "Alisad (Owner)");
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
    return res.redirect(redir || "/admin");
  });

  // GET /owner → Kurzlink
  app.get("/owner", async (req: Request, res: Response) => {
    const ownerCode = process.env.OWNER_MAGIC_CODE || ENV.ownerMagicCode;
    if (!ownerCode) return res.status(500).send("OWNER_MAGIC_CODE fehlt");
    return res.redirect(`/api/owner/access?key=${ownerCode}&redirect=/admin`);
  });

  // POST /api/owner/inspect-token → erstellt 72h Inspect-Link
  app.post("/api/owner/inspect-token", async (req: Request, res: Response) => {
    const { key } = req.body as { key?: string };
    const ownerCode = process.env.OWNER_MAGIC_CODE || ENV.ownerMagicCode;
    if (!key || !ownerCode || key !== ownerCode) {
      return res.status(403).json({ error: "Ungültiger Schlüssel" });
    }
    const { SignJWT } = await import("jose");
    const secret = new TextEncoder().encode("immobilien-akademie-inspect-2026");
    const expiresAt = Date.now() + 72 * 60 * 60 * 1000;
    const inspectToken = await new SignJWT({ role: "inspect", expiresAt })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("72h")
      .setIssuedAt()
      .sign(secret);
    return res.json({ token: inspectToken, expiresAt });
  });

  // GET /inspect/exit → Demo-Modus beenden (MUSS vor :token stehen!)
  app.get("/inspect/exit", (_req: Request, res: Response) => {
    res.clearCookie("inspect_mode", { path: "/" });
    return res.redirect("/");
  });

  // GET /inspect/:token → Inspect-Link (Server fängt VOR SPA ab)
  app.get("/inspect/:token", async (req: Request, res: Response) => {
    const { token } = req.params;
    try {
      const { jwtVerify } = await import("jose");
      const secret = new TextEncoder().encode("immobilien-akademie-inspect-2026");
      const { payload } = await jwtVerify(token, secret);
      if ((payload as any).role !== "inspect") throw new Error("Falsche Rolle");
      // Benutze EXAKT denselben Mechanismus wie /owner — bewährt!
      const ownerCode = process.env.OWNER_MAGIC_CODE || ENV.ownerMagicCode;
      // Setze inspect_mode Cookie zuerst
      res.cookie("inspect_mode", "1", {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        maxAge: 72 * 60 * 60 * 1000
      });
      // Dann redirect zu owner/access — der setzt Session-Cookie korrekt
      return res.redirect(`/api/owner/access?key=${ownerCode}&redirect=/kurse`);
    } catch (e: any) {
      return res.status(403).send(`<html><body style="font-family:Arial;padding:40px;text-align:center"><h2 style="color:#dc2626">Link abgelaufen</h2><p>Bitte einen neuen Link anfordern.</p></body></html>`);
    }
  });

  // POST /api/auth/admin-2fa/request → sendet OTP an Admin-Email
  app.post("/api/auth/admin-2fa/request", async (req: Request, res: Response) => {
    const { email, name } = req.body as { email?: string; name?: string };
    if (!email) return res.status(400).json({ error: "E-Mail fehlt" });
    
    // Nur für verifizierte Admin-Accounts (muss in DB sein)
    const code = generateOTP(email);
    const sent = await sendOTPEmail(email, code, name || "Admin");
    
    return res.json({ 
      ok: true, 
      message: "Code wurde gesendet. Prüfe E-Mail oder Railway Logs.",
      hint: process.env.NODE_ENV !== "production" ? `DEV: ${code}` : undefined
    });
  });

  // POST /api/auth/admin-2fa/verify → verifiziert OTP
  app.post("/api/auth/admin-2fa/verify", async (req: Request, res: Response) => {
    const { email, code } = req.body as { email?: string; code?: string };
    if (!email || !code) return res.status(400).json({ error: "E-Mail und Code erforderlich" });
    
    const result = verifyOTP(email, code);
    if (!result.ok) return res.status(401).json({ error: result.error });
    
    return res.json({ ok: true, message: "Code korrekt — Zugang gewährt" });
  });

  // ── OWNER DASHBOARD ──────────────────────────────────────────
  app.get("/api/owner/dashboard", async (req: Request, res: Response) => {
    const ownerCode = process.env.OWNER_MAGIC_CODE || "";
    const key = req.headers["x-owner-key"] || req.query.key;
    if (ownerCode && key !== ownerCode) return res.status(403).json({ error: "Nicht autorisiert" });
    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      const [usersRows] = await db.$client.promise().query(`
        SELECT id, name, email, role, enabledModules, createdAt, lastSignedIn, 0 as locked
        FROM users ORDER BY createdAt DESC LIMIT 100
      `) as any;
      const users = usersRows as any[];
      const [totalsRows] = await db.$client.promise().query(`
        SELECT COUNT(*) as totalUsers,
          SUM(CASE WHEN DATE(lastSignedIn) = CURDATE() THEN 1 ELSE 0 END) as activeToday,
          SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as admins
        FROM users
      `) as any;
      const totals = (totalsRows as any[])[0];
      const [leadsRows] = await db.$client.promise().query(`SELECT COUNT(*) as c FROM trial_leads`) as any;
      const leads = (leadsRows as any[])[0];
      res.json({
        totalUsers: Number(totals?.totalUsers || 0),
        activeToday: Number(totals?.activeToday || 0),
        admins: Number(totals?.admins || 0),
        trialLeads: Number(leads?.c || 0),
        modulesUnlocked: { "1": 0 },
        recentUsers: users || [],
        systemHealth: { server: true, db: true, stripe: !!process.env.STRIPE_SECRET_KEY },
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ── LOCK USER ────────────────────────────────────────────────
  app.post("/api/owner/lock-user", async (req: Request, res: Response) => {
    const ownerCode = process.env.OWNER_MAGIC_CODE || "";
    const key = req.headers["x-owner-key"] || req.query.key;
    if (ownerCode && key !== ownerCode) return res.status(403).json({ error: "Nicht autorisiert" });
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: "email erforderlich" });
      const { getDb } = await import("./db");
      const db = await getDb();
      await db.$client.promise().query(`UPDATE users SET enabledModules = '' WHERE email = ?`, [email]);
      res.json({ ok: true, msg: `${email} gesperrt` });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── UNLOCK USER ──────────────────────────────────────────────
  app.post("/api/owner/unlock-user", async (req: Request, res: Response) => {
    const ownerCode = process.env.OWNER_MAGIC_CODE || "";
    const key = req.headers["x-owner-key"] || req.query.key;
    if (ownerCode && key !== ownerCode) return res.status(403).json({ error: "Nicht autorisiert" });
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: "email erforderlich" });
      const { getDb } = await import("./db");
      const db = await getDb();
      await db.$client.promise().query(`UPDATE users SET enabledModules = '1,2,3,4,5' WHERE email = ?`, [email]);
      res.json({ ok: true, msg: `${email} freigeschaltet` });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── GENERATE MAGIC LOGIN LINK ────────────────────────────────
  app.post("/api/owner/generate-link", async (req: Request, res: Response) => {
    const ownerCode = process.env.OWNER_MAGIC_CODE || "";
    const key = req.headers["x-owner-key"] || req.query.key;
    if (ownerCode && key !== ownerCode) return res.status(403).json({ error: "Nicht autorisiert" });
    try {
      const token = await createSessionToken("owner@system", "Owner");
      const link = `${process.env.APP_URL || ""}/api/owner/access?key=${ownerCode}`;
      res.json({ link, token });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── IMPERSONATE USER ─────────────────────────────────────────
  app.post("/api/owner/impersonate", async (req: Request, res: Response) => {
    const ownerCode = process.env.OWNER_MAGIC_CODE || "";
    const key = req.headers["x-owner-key"] || req.query.key;
    if (ownerCode && key !== ownerCode) return res.status(403).json({ error: "Nicht autorisiert" });
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: "email erforderlich" });
      const { getDb } = await import("./db");
      const db = await getDb();
      const [[user]] = await db.$client.promise().query(
        `SELECT openId, name, email FROM users WHERE email = ? LIMIT 1`, [email]
      ) as any;
      if (!user) return res.status(404).json({ error: "Nutzer nicht gefunden" });
      const token = await createSessionToken(user.openId, user.name || user.email);
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.json({ ok: true, msg: `Eingeloggt als ${user.email}`, redirect: "/" });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── SET MODULES ──────────────────────────────────────────────
  app.post("/api/owner/set-modules", async (req: Request, res: Response) => {
    const ownerCode = process.env.OWNER_MAGIC_CODE || "";
    const key = req.headers["x-owner-key"] || req.query.key;
    if (ownerCode && key !== ownerCode) return res.status(403).json({ error: "Nicht autorisiert" });
    try {
      const { email, modules } = req.body;
      if (!email || !modules) return res.status(400).json({ error: "email und modules erforderlich" });
      const { getDb } = await import("./db");
      const db = await getDb();
      await db.$client.promise().query(
        `UPDATE users SET enabledModules = ? WHERE email = ?`, [modules, email]
      );
      res.json({ ok: true, msg: `Module fuer ${email} gesetzt: ${modules}` });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

}