import { sql } from "drizzle-orm";
import { z } from "zod";
import type { Express, NextFunction, Request, Response } from "express";
import { generateOTP, verifyOTP, sendOTPEmail } from "./twoFactor";
import { getTotpSecret, generateTotpSecret, generateQRCode, verifyTotp, getOwner2FAMethod } from "./ownerTwoFactor";
import { createSessionToken, verifySessionToken } from "./_core/auth-local";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { COOKIE_NAME, ONE_YEAR_MS } from "../shared/const";

export function registerOwnerRoutes(app: Express) {
  const getCookieValue = (req: Request, name: string): string | undefined => {
    const prefix = `${name}=`;
    const found = String(req.headers.cookie || "")
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(prefix));
    return found ? decodeURIComponent(found.slice(prefix.length)) : undefined;
  };

  const isOwnerAuthorized = async (req: Request): Promise<boolean> => {
    const ownerCode = process.env.OWNER_MAGIC_CODE || ENV.ownerMagicCode;
    const providedKey = req.headers["x-owner-key"] || req.query.key;
    if (ownerCode && providedKey === ownerCode) return true;

    const owner2FAOk = getCookieValue(req, "owner_2fa_ok") === "1";
    if (!owner2FAOk) return false;

    const session = await verifySessionToken(getCookieValue(req, COOKIE_NAME));
    if (!session) return false;
    try {
      const { getUserByOpenId } = await import("./db");
      const user = await getUserByOpenId(session.openId);
      return user?.role === "admin";
    } catch {
      return false;
    }
  };

  const requireOwner = async (req: Request, res: Response): Promise<boolean> => {
    if (await isOwnerAuthorized(req)) return true;
    res.status(403).json({ error: "Nicht autorisiert" });
    return false;
  };


  // ── TESTER-ZUGANG ─────────────────────────────────────────────
  app.post("/api/tester/request", async (req: Request, res: Response) => {
    const { email, hours } = req.body as { email?: string; hours?: number };
    if (!email) return res.status(400).json({ error: "E-Mail fehlt" });
    const validHours = [48, 72, 168].includes(Number(hours)) ? Number(hours) : 72;
    const code = await generateOTP(email);
    const sent = await sendOTPEmail(email, code, "Tester");
    if (!sent) return res.status(500).json({ error: "E-Mail konnte nicht gesendet werden" });
    return res.json({ ok: true, hours: validHours });
  });

  app.post("/api/tester/verify", async (req: Request, res: Response) => {
    const { email, code, hours } = req.body as { email?: string; code?: string; hours?: number };
    if (!email || !code) return res.status(400).json({ error: "E-Mail und Code erforderlich" });
    const validHours = [48, 72, 168].includes(Number(hours)) ? Number(hours) : 72;
    const result = await verifyOTP(email, code);
    if (!result.ok) return res.status(401).json({ error: result.error || "Ungültiger Code" });
    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      const openId = `tester:${email}`;
      const expiresAt = new Date(Date.now() + validHours * 60 * 60 * 1000);
      await db.$client.query(
        `INSERT INTO users (openId, email, name, role, enabledModules, onboardingCompleted, learningGoal, dailyMinutes, experienceLevel, createdAt, updatedAt)
         VALUES (?, ?, ?, 'tester', '1,2,3,4,5', 1, 'makler', 30, 'some', NOW(), NOW())
         ON DUPLICATE KEY UPDATE role='tester', enabledModules='1,2,3,4,5', onboardingCompleted=1, updatedAt=NOW()`,
        [openId, email, email.split('@')[0]]
      );
      const token = await createSessionToken(openId, email.split('@')[0], "tester", "1,2,3,4,5");
      const cookieOptions = getSessionCookieOptions(req);
      const maxAge = validHours * 60 * 60 * 1000;
      res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge });
      res.cookie("tester_expires", expiresAt.toISOString(), { httpOnly: true, sameSite: "lax", path: "/", maxAge });
      return res.json({ ok: true, redirect: "/admin", expiresAt: expiresAt.toISOString() });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  });

  // GET /owner-dashboard?key=... — direkter Owner-Link vor SPA-Fallback verarbeiten
  app.get("/owner-dashboard", async (req: Request, res: Response, next: NextFunction) => {
    const key = req.query.key as string | undefined;
    if (!key) return next();
    const ownerCode = process.env.OWNER_MAGIC_CODE || ENV.ownerMagicCode;
    if (!ownerCode || key !== ownerCode) {
      return res.status(403).send(`<html><body style="font-family:Arial;padding:40px;text-align:center"><h2 style="color:#dc2626">Zugang verweigert</h2></body></html>`);
    }
    const method = getOwner2FAMethod();
    if (method === "none") {
      const openId = "local:alisadgadyri38@gmail.com";
      const token = await createSessionToken(openId, "Alisad (Owner)", "admin", "1,2,3,4,5");
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.cookie("owner_2fa_ok", "1", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 8 * 60 * 60 * 1000 });
      return res.redirect("/owner-dashboard");
    }
    const params = new URLSearchParams({ method, redirect: "/owner-dashboard" });
    return res.redirect(`/owner-2fa?${params}`);
  });

  // POST /api/owner/access — Key im Request-Body, danach optionale 2FA
  app.post("/api/owner/access", async (req: Request, res: Response) => {
    const { key, redirect: redir } = req.body as { key?: string; redirect?: string };
    const ownerCode = process.env.OWNER_MAGIC_CODE || ENV.ownerMagicCode;
    if (!key || !ownerCode || key !== ownerCode) {
      return res.status(403).send(`<html><body style="font-family:Arial;padding:40px;text-align:center"><h2 style="color:#dc2626">Zugang verweigert</h2></body></html>`);
    }
    const method = getOwner2FAMethod();
    if (method === "none") {
      const openId = "local:alisadgadyri38@gmail.com";
      const token = await createSessionToken(openId, "Alisad (Owner)", "admin", "1,2,3,4,5");
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.cookie("owner_2fa_ok", "1", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 8 * 60 * 60 * 1000 });
      return res.redirect(redir || "/owner-dashboard");
    }
    // 2FA erforderlich — weiterleiten zu 2FA-Formular
    const params = new URLSearchParams({ method, redirect: redir || "/owner-dashboard" });
    return res.redirect(`/owner-2fa?${params}`);
  });

  // GET /api/owner/2fa-status — serverseitige Prüfung des httpOnly 2FA-Cookies
  app.get("/api/owner/2fa-status", (req: Request, res: Response) => {
    const cookieHeader = String(req.headers.cookie || "");
    const ok = cookieHeader.split(";").some((part) => part.trim() === "owner_2fa_ok=1");
    return res.json({ ok });
  });

  // GET /owner-2fa — zeigt 2FA-Formular
  app.get("/owner-2fa", (req: Request, res: Response) => {
    const method = (req.query.method as string) || "email";
    const redir = (req.query.redirect as string) || "/owner-dashboard";
    const isTotp = method === "totp" || method === "both";
    const isEmail = method === "email" || method === "both";
    const ownerEmail = process.env.OWNER_EMAIL || "alisadgadyri38@gmail.com";
    if (isEmail) {
      (async () => {
        const { getDb } = await import("./db");
        const db = await getDb();
        await db.$client.query("DELETE FROM otp_tokens WHERE expiresAt < NOW()");
        const [rows] = await db.$client.query(
          "SELECT id FROM otp_tokens WHERE email = ? AND used = 0 AND attempts < 3 AND expiresAt > NOW() ORDER BY createdAt DESC LIMIT 1",
          [ownerEmail]
        ) as any;
        const hasValidCode = Array.isArray(rows) && rows.length > 0;
        if (!hasValidCode) {
          const code = await generateOTP(ownerEmail);
          await sendOTPEmail(ownerEmail, code, "Alisad");
        }
      })().catch(() => {});
    }
    return res.send(`<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><title>Owner 2FA</title>
<style>
body{font-family:Arial,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#f1f5f9}
.box{background:white;padding:40px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,.1);width:340px}
h2{margin:0 0 8px;color:#1e293b;font-size:20px}
p{margin:0 0 20px;color:#64748b;font-size:14px}
input{width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:8px;box-sizing:border-box;margin-bottom:16px;text-align:center;letter-spacing:4px;font-size:22px}
button{width:100%;padding:12px;background:#1d4ed8;color:white;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer}.eye-btn{width:auto;padding:0;background:none;border:none;position:absolute;right:12px;top:50%;transform:translateY(-50%);cursor:pointer;font-size:18px;color:#64748b;line-height:1}
button:hover{background:#1e40af}
.hint{font-size:12px;color:#94a3b8;text-align:center;margin-top:12px}
</style></head>
<body><div class="box">
<h2>🔐 Sicherheitscode</h2>
${isEmail ? `<form method="POST" action="/api/owner/verify-2fa-form">
  <p>Code wurde an deine E-Mail gesendet.</p>
  <input type="hidden" name="type" value="email">
  <input type="hidden" name="redirect" value="${redir}">
  <input type="hidden" name="email" value="${ownerEmail}">
  <input type="text" name="code" maxlength="6" placeholder="000000" autocomplete="one-time-code" inputmode="numeric" autofocus required>
  <button type="submit">Bestätigen →</button>
  <button type="button" style="margin-top:10px;background:#e2e8f0;color:#334155" onclick="fetch('/api/owner/resend-2fa',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({email:'${ownerEmail}'})}).then(function(){var el=document.getElementById('resendMsg'); if(el) el.textContent='Neuer Code wurde gesendet.';}).catch(function(){var el=document.getElementById('resendMsg'); if(el) el.textContent='Senden fehlgeschlagen. Bitte erneut versuchen.';})">Code erneut senden</button>
  <p id="resendMsg" class="hint">10 Minuten gültig</p>
</form>` : ""}
${isTotp ? `<form method="POST" action="/api/owner/verify-2fa-form">
  <p>Code aus deiner Authenticator-App eingeben.</p>
  <input type="hidden" name="type" value="totp">
  <input type="hidden" name="redirect" value="${redir}">
  <input type="hidden" name="email" value="${ownerEmail}">
  <input type="text" name="code" maxlength="6" placeholder="000000" inputmode="numeric" autofocus required>
  <button type="submit">Bestätigen →</button>
</form>` : ""}
</div></body></html>`);
  });

  // POST /api/owner/verify-2fa-form — form-basierte Verifikation (kein JS nötig)
  app.post("/api/owner/verify-2fa-form", async (req: Request, res: Response) => {
    const { type, code, redirect: redir, email } = req.body as { type?: string; code?: string; redirect?: string; email?: string };
    if (!code) return res.redirect("/owner-2fa?error=code_fehlt");
    if (type === "email") {
      const ownerEmail = email || process.env.OWNER_EMAIL || "alisadgadyri38@gmail.com";
      const result = await verifyOTP(ownerEmail, code);
      if (!result.ok) return res.redirect(`/owner-2fa?error=${encodeURIComponent(result.error || "Falscher Code")}`);
    } else if (type === "totp") {
      const secret = getTotpSecret();
      if (!secret) return res.redirect("/owner-2fa?error=TOTP+nicht+konfiguriert");
      if (!verifyTotp(code, secret)) return res.redirect("/owner-2fa?error=Falscher+Code");
    }
    const openId = "local:alisadgadyri38@gmail.com";
    const token = await createSessionToken(openId, "Alisad (Owner)", "admin", "1,2,3,4,5");
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
    res.cookie("owner_2fa_ok", "1", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 8 * 60 * 60 * 1000 });
    return res.redirect(redir || "/owner-dashboard");
  });

    // POST /api/owner/verify-2fa — verifiziert OTP oder TOTP und setzt Session
  app.post("/api/owner/verify-2fa", async (req: Request, res: Response) => {
    const { type, code, redirect: redir, email } = req.body as { type?: string; code?: string; redirect?: string; email?: string };
    if (!code) return res.status(400).json({ error: "Code fehlt" });
    if (type === "email") {
      const ownerEmail = email || process.env.OWNER_EMAIL || "alisadgadyri38@gmail.com";
      const result = await verifyOTP(ownerEmail, code);
      if (!result.ok) return res.status(401).json({ error: result.error });
    } else if (type === "totp") {
      const secret = getTotpSecret();
      if (!secret) return res.status(500).json({ error: "TOTP nicht konfiguriert. Bitte Setup durchführen." });
      if (!verifyTotp(code, secret)) return res.status(401).json({ error: "Falscher Code. Bitte App prüfen." });
    } else {
      return res.status(400).json({ error: "Unbekannter 2FA-Typ" });
    }
    const openId = "local:alisadgadyri38@gmail.com";
    const token = await createSessionToken(openId, "Alisad (Owner)", "admin", "1,2,3,4,5");
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
    res.cookie("owner_2fa_ok", "1", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 8 * 60 * 60 * 1000 });
    return res.json({ ok: true, redirect: redir || "/owner-dashboard" });
  });

  // POST /api/owner/resend-2fa — sendet neuen OTP
  app.post("/api/owner/resend-2fa", async (req: Request, res: Response) => {
    const { email } = req.body as { email?: string };
    const ownerEmail = email || process.env.OWNER_EMAIL || "alisadgadyri38@gmail.com";
    const code = await generateOTP(ownerEmail);
    await sendOTPEmail(ownerEmail, code, "Alisad");
    return res.json({ ok: true });
  });

  // GET /api/owner/totp-setup — QR-Code für ersten TOTP-Setup
  app.get("/api/owner/totp-setup", async (req: Request, res: Response) => {
    const ownerCode = req.query.key as string;
    const validCode = process.env.OWNER_MAGIC_CODE || ENV.ownerMagicCode;
    if (!ownerCode || ownerCode !== validCode) return res.status(403).json({ error: "Nicht autorisiert" });
    const existing = getTotpSecret();
    if (existing) return res.status(400).json({ error: "TOTP bereits konfiguriert. Secret: OWNER_TOTP_SECRET in Railway." });
    const secret = generateTotpSecret();
    const qr = await generateQRCode(secret);
    return res.send(`<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><title>TOTP Setup</title>
<style>body{font-family:Arial;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#f1f5f9}
.box{background:white;padding:40px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,.1);max-width:400px;text-align:center}
h2{color:#1e293b}code{background:#f8fafc;padding:8px 16px;border-radius:6px;font-size:13px;display:block;word-break:break-all;margin:16px 0;border:1px solid #e2e8f0}
.warn{background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:12px;font-size:13px;color:#92400e;margin-top:16px}</style>
</head><body><div class="box">
<h2>📱 TOTP Setup</h2>
<p>Scanne diesen QR-Code mit Google Authenticator oder Authy:</p>
<img src="${qr}" style="width:200px;height:200px">
<p>Oder manuell eingeben:</p>
<code>${secret}</code>
<div class="warn">⚠ Dieses Secret jetzt in Railway speichern:<br><strong>OWNER_TOTP_SECRET = ${secret}</strong><br>Danach diese Seite schließen.</div>
<p style="font-size:13px;color:#64748b">Nach dem Speichern in Railway:<br>OWNER_2FA_METHOD = totp</p>
</div></body></html>`);
  });

  // GET /owner → zeigt Login-Formular (Key wird per POST gesendet)
  app.get("/owner", async (req: Request, res: Response) => {
    const redir = (req.query.redirect as string) || "/owner-dashboard";
    return res.send(`<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><title>Owner Login</title>
<style>body{font-family:Arial,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#f1f5f9}
.box{background:white;padding:40px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,.1);width:320px}
h2{margin:0 0 24px;color:#1e293b;font-size:20px}
input{width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:14px;box-sizing:border-box;margin-bottom:16px}.input-wrap{position:relative;display:block}
.submit-btn{width:100%;padding:12px;background:#1d4ed8;color:white;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer}
.submit-btn:hover{background:#1e40af}</style>
</head>
<body><div class="box">
<h2>🔐 Owner-Zugang</h2>
<form method="POST" action="/api/owner/access" id="ownerForm">
<input type="hidden" name="redirect" value="${redir}">
<input type="hidden" name="key" id="ownerKeyHidden">
<div class="input-wrap">
<input type="text" id="ownerKeyVisible" 
  placeholder="Owner-Code eingeben"
  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
  style="padding-right:44px;font-family:monospace;letter-spacing:2px;-webkit-text-security:disc">
<span id="eyeBtn" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);cursor:pointer;font-size:18px;user-select:none;line-height:1">👁</span>
</div>
<button type="submit" class="submit-btn">Einloggen →</button>
</form>
<script>
(function(){
  var field = document.getElementById('ownerKeyVisible');
  var hidden = document.getElementById('ownerKeyHidden');
  var eye = document.getElementById('eyeBtn');
  var form = document.getElementById('ownerForm');
  var shown = false;

  // Autofill nach kurzer Zeit leeren
  setTimeout(function(){ field.value = ''; }, 200);
  field.focus();

  eye.addEventListener('click', function(){
    shown = !shown;
    field.style.webkitTextSecurity = shown ? 'none' : 'disc';
    eye.textContent = shown ? '🙈' : '👁';
    field.focus();
  });

  form.addEventListener('submit', function(){
    hidden.value = field.value;
  });
})();
</script>
</div></body></html>`);
  });

  // POST /api/owner/inspect-token → erstellt 72h Inspect-Link
  app.post("/api/owner/inspect-token", async (req: Request, res: Response) => {
    const { key, hours } = req.body as { key?: string; hours?: number };
    const ownerCode = process.env.OWNER_MAGIC_CODE || ENV.ownerMagicCode;
    const keyAuthorized = Boolean(key && ownerCode && key === ownerCode);
    if (!keyAuthorized && !(await requireOwner(req, res))) return;

    const inspectSecret = process.env.INSPECT_JWT_SECRET
      || (process.env.NODE_ENV === "production" ? "" : "dev-inspect-secret-change-me");
    if (!inspectSecret) return res.status(500).json({ error: "INSPECT_JWT_SECRET fehlt" });

    const validHours = [48, 72].includes(Number(hours)) ? Number(hours) : 72;
    const { SignJWT } = await import("jose");
    const secret = new TextEncoder().encode(inspectSecret);
    const expiresAt = Date.now() + validHours * 60 * 60 * 1000;
    const inspectToken = await new SignJWT({ role: "inspect", expiresAt })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(`${validHours}h`)
      .setIssuedAt()
      .sign(secret);
    return res.json({ token: inspectToken, expiresAt, hours: validHours });
  });

  // GET /api/auth/inspect-status → httpOnly-Cookie für Frontend erkennbar machen
  app.get("/api/auth/inspect-status", (req: Request, res: Response) => {
    return res.json({ inspect: req.cookies?.inspect_mode === "1" });
  });

  // GET /inspect/exit → Demo-Modus beenden (MUSS vor :token stehen!)
  app.get("/inspect/exit", (req: Request, res: Response) => {
    const cookieOptions = getSessionCookieOptions(req);
    res.clearCookie("inspect_mode", { path: "/", sameSite: cookieOptions.sameSite, secure: cookieOptions.secure });
    return res.redirect("/");
  });

  // GET /inspect/:token → Inspect-Link (Server fängt VOR SPA ab)
  app.get("/inspect/:token", async (req: Request, res: Response) => {
    const { token } = req.params;
    try {
      const { jwtVerify } = await import("jose");
      const inspectSecret = process.env.INSPECT_JWT_SECRET
        || (process.env.NODE_ENV === "production" ? "" : "dev-inspect-secret-change-me");
      if (!inspectSecret) throw new Error("INSPECT_JWT_SECRET fehlt");
      const secret = new TextEncoder().encode(inspectSecret);
      const { payload } = await jwtVerify(token, secret);
      if ((payload as any).role !== "inspect") throw new Error("Falsche Rolle");
      // Benutze EXAKT denselben Mechanismus wie /owner — bewährt!
      const ownerCode = process.env.OWNER_MAGIC_CODE || ENV.ownerMagicCode;
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie("inspect_mode", "1", {
        ...cookieOptions,
        maxAge: 72 * 60 * 60 * 1000,
      });
      // Query-Parameter aktiviert Frontend-Banner und Session-Marker
      return res.redirect("/?inspect=1");
    } catch (e: any) {
      return res.status(403).send(`<html><body style="font-family:Arial;padding:40px;text-align:center"><h2 style="color:#dc2626">Link abgelaufen</h2><p>Bitte einen neuen Link anfordern.</p></body></html>`);
    }
  });

  // POST /api/auth/admin-2fa/request → sendet OTP an Admin-Email
  app.post("/api/auth/admin-2fa/request", async (req: Request, res: Response) => {
    const { email, name } = req.body as { email?: string; name?: string };
    if (!email) return res.status(400).json({ error: "E-Mail fehlt" });
    
    // Nur für verifizierte Admin-Accounts (muss in DB sein)
    const code = await generateOTP(email);
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
    
    const result = await verifyOTP(email, code);
    if (!result.ok) return res.status(401).json({ error: result.error });
    
    return res.json({ ok: true, message: "Code korrekt — Zugang gewährt" });
  });

  // ── OWNER DASHBOARD ──────────────────────────────────────────
  app.get("/api/owner/dashboard", async (req: Request, res: Response) => {
    if (!(await requireOwner(req, res))) return;
    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      const [usersRows] = await db.$client.query(`
        SELECT id, name, email, role, enabledModules, createdAt, lastSignedIn, 0 as locked
        FROM users ORDER BY createdAt DESC LIMIT 100
      `) as any;
      const users = usersRows as any[];
      const [totalsRows] = await db.$client.query(`
        SELECT COUNT(*) as totalUsers,
          SUM(CASE WHEN DATE(lastSignedIn) = CURDATE() THEN 1 ELSE 0 END) as activeToday,
          SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as admins
        FROM users
      `) as any;
      const totals = (totalsRows as any[])[0];
      const [leadsRows] = await db.$client.query(`SELECT COUNT(*) as c FROM trial_leads`) as any;
      const leads = (leadsRows as any[])[0];
      res.json({
        totalUsers: Number(totals?.totalUsers || 0),
        activeToday: Number(totals?.activeToday || 0),
        admins: Number(totals?.admins || 0),
        trialLeads: Number(leads?.c || 0),
        modulesUnlocked: { "1": 0 },
        recentUsers: users || [],
        systemHealth: {
          server: true,
          db: true,
          stripe: !!process.env.STRIPE_SECRET_KEY,
          stripeMode: process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_') ? 'LIVE ✅' : 'TEST-MODUS ⚠️',
        },
        lastHealthCheck: await (async () => {
          try {
            const [rows] = await db.$client.query(
              `SELECT status, details, timestamp FROM monitoring_log 
               WHERE type = 'hourly_health' 
               ORDER BY timestamp DESC LIMIT 1`
            ) as any;
            const last = (rows as any[])[0];
            if (!last) return { status: 'pending', message: 'Noch kein Check durchgeführt' };
            const details = typeof last.details === 'string' ? JSON.parse(last.details) : last.details;
            return {
              status: last.status,
              timestamp: last.timestamp,
              failedChecks: details?.failedChecks || [],
              recommendations: details?.recommendations || [],
              checkCount: details?.checkCount || 0,
              durationMs: details?.durationMs || 0,
            };
          } catch { return { status: 'error', message: 'monitoring_log nicht verfügbar' }; }
        })(),
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ── LOCK USER ────────────────────────────────────────────────
  app.post("/api/owner/lock-user", async (req: Request, res: Response) => {
    if (!(await requireOwner(req, res))) return;
    try {
      const schema = z.object({ email: z.string().email() });
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Ungültige E-Mail" });
      const { email } = parsed.data;
      const { getDb } = await import("./db");
      const db = await getDb();
      await db.$client.query(`UPDATE users SET enabledModules = '' WHERE email = ?`, [email]);
      res.json({ ok: true, msg: `${email} gesperrt` });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── UNLOCK USER ──────────────────────────────────────────────
  app.post("/api/owner/unlock-user", async (req: Request, res: Response) => {
    if (!(await requireOwner(req, res))) return;
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: "email erforderlich" });
      const { getDb } = await import("./db");
      const db = await getDb();
      await db.$client.query(`UPDATE users SET enabledModules = '1,2,3,4,5' WHERE email = ?`, [email]);
      res.json({ ok: true, msg: `${email} freigeschaltet` });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── GENERATE MAGIC LOGIN LINK ────────────────────────────────
  app.post("/api/owner/generate-link", async (req: Request, res: Response) => {
    if (!(await requireOwner(req, res))) return;
    try {
      const token = await createSessionToken("owner@system", "Owner");
      const link = `${process.env.APP_URL || ""}/owner`;
      res.json({ link, token });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── IMPERSONATE USER ─────────────────────────────────────────
  app.post("/api/owner/impersonate", async (req: Request, res: Response) => {
    if (!(await requireOwner(req, res))) return;
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: "email erforderlich" });
      const { getDb } = await import("./db");
      const db = await getDb();
      const [[user]] = await db.$client.query(
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
    if (!(await requireOwner(req, res))) return;
    try {
      const schema = z.object({
        email: z.string().email(),
        modules: z.string().regex(/^[1-5,]+$/)
      });
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Ungültige Eingabe" });
      const { email, modules } = parsed.data;
      const { getDb } = await import("./db");
      const db = await getDb();
      await db.$client.query(
        `UPDATE users SET enabledModules = ? WHERE email = ?`, [modules, email]
      );
      res.json({ ok: true, msg: `Module fuer ${email} gesetzt: ${modules}` });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── LIVE MONITORING ──────────────────────────────────────────
  app.get("/api/owner/live", async (req: Request, res: Response) => {
    if (!(await requireOwner(req, res))) return;
    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      const [active5] = await db.$client.query(
        `SELECT id, name, email, role, enabledModules, lastSignedIn
         FROM users WHERE lastSignedIn > DATE_SUB(NOW(), INTERVAL 5 MINUTE)
         ORDER BY lastSignedIn DESC`
      ) as any;
      const [active15] = await db.$client.query(
        `SELECT id, name, email, lastSignedIn
         FROM users WHERE lastSignedIn > DATE_SUB(NOW(), INTERVAL 15 MINUTE)
         ORDER BY lastSignedIn DESC`
      ) as any;
      const [active60] = await db.$client.query(
        `SELECT COUNT(*) as cnt FROM users
         WHERE lastSignedIn > DATE_SUB(NOW(), INTERVAL 60 MINUTE)`
      ) as any;
      const [today] = await db.$client.query(
        `SELECT COUNT(*) as cnt FROM users WHERE DATE(lastSignedIn) = CURDATE()`
      ) as any;
      const [newUsers] = await db.$client.query(
        `SELECT id, name, email, createdAt FROM users
         WHERE createdAt > DATE_SUB(NOW(), INTERVAL 24 HOUR)
         ORDER BY createdAt DESC`
      ) as any;
      const [recentLogs] = await db.$client.query(
        `SELECT u.name, u.email, l.moduleId, l.dayId, l.openedAt
         FROM learning_logs l JOIN users u ON l.userId = u.id
         WHERE l.openedAt > DATE_SUB(NOW(), INTERVAL 1 HOUR)
         ORDER BY l.openedAt DESC LIMIT 20`
      ) as any;
      res.json({
        now: new Date().toISOString(),
        online5min: (active5 as any[]).length,
        online15min: (active15 as any[]).length,
        online60min: Number((active60 as any[])[0]?.cnt || 0),
        todayActive: Number((today as any[])[0]?.cnt || 0),
        activeUsers: active5 as any[],
        newUsersToday: newUsers as any[],
        recentActivity: recentLogs as any[],
      });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── ROLLE SETZEN ─────────────────────────────────────────────
  app.post("/api/owner/set-role", async (req: Request, res: Response) => {
    if (!(await requireOwner(req, res))) return;
    try {
      const schema = z.object({
        email: z.string().email(),
        role: z.enum(["user", "admin", "trainer"])
      });
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Ungültige Eingabe" });
      const { email, role } = parsed.data;
      const { getDb } = await import("./db");
      const db = await getDb();
      if (role === "admin") {
        await db.$client.query(
          `UPDATE users SET role = ?, enabledModules = '1,2,3,4,5' WHERE email = ?`,
          [role, email]
        );
      } else {
        await db.$client.query(`UPDATE users SET role = ? WHERE email = ?`, [role, email]);
      }
      res.json({ ok: true, msg: `Rolle von ${email} auf ${role} gesetzt` });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── AKTIVITAETS-LOG ──────────────────────────────────────────
  app.get("/api/owner/activity", async (req: Request, res: Response) => {
    if (!(await requireOwner(req, res))) return;
    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      const [logs] = await db.$client.query(`
        SELECT u.name, u.email, u.role,
          l.moduleId, l.dayId, l.openedAt, l.closedAt, l.durationSeconds, l.completed
        FROM learning_logs l
        JOIN users u ON l.userId = u.id
        ORDER BY l.openedAt DESC
        LIMIT 50
      `) as any;
      const [exams] = await db.$client.query(`
        SELECT u.name, u.email, e.moduleId, e.score, e.totalQuestions, e.startedAt, e.completedAt
        FROM exam_sessions e
        JOIN users u ON e.userId = u.id
        ORDER BY e.startedAt DESC
        LIMIT 20
      `) as any;
      const [registrations] = await db.$client.query(`
        SELECT name, email, role, createdAt
        FROM users
        ORDER BY createdAt DESC
        LIMIT 20
      `) as any;
      res.json({
        learningActivity: logs as any[],
        examActivity: exams as any[],
        registrations: registrations as any[],
      });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── SYSTEM STATS ─────────────────────────────────────────────
  app.get("/api/owner/stats", async (req: Request, res: Response) => {
    if (!(await requireOwner(req, res))) return;
    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      const [daily] = await db.$client.query(`
        SELECT DATE(openedAt) as tag,
          COUNT(*) as sitzungen,
          COUNT(DISTINCT userId) as nutzer,
          SUM(durationSeconds) as sekunden
        FROM learning_logs
        WHERE openedAt > DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY DATE(openedAt)
        ORDER BY tag DESC
      `) as any;
      const [modStats] = await db.$client.query(`
        SELECT moduleId,
          COUNT(DISTINCT userId) as nutzer,
          AVG(durationSeconds) as avgSekunden,
          SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as abgeschlossen
        FROM learning_logs
        GROUP BY moduleId
        ORDER BY moduleId
      `) as any;
      res.json({
        dailyStats: daily as any[],
        moduleStats: modStats as any[],
      });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── AZAV ANWESENHEITSBERICHT ─────────────────────────────────
  app.get("/api/owner/azav-report", async (req: Request, res: Response) => {
    if (!(await requireOwner(req, res))) return;
    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      const { userId, startDate, endDate } = req.query as any;

      // Alle Nutzer mit Lernaktivitaet
      const [nutzer] = await db.$client.query(`
        SELECT DISTINCT u.id, u.name, u.email, u.enabledModules
        FROM users u
        WHERE u.role IN ('user','admin','trainer')
        AND EXISTS (SELECT 1 FROM learning_logs l WHERE l.userId = u.id)
        ${userId ? 'AND u.id = ?' : ''}
        ORDER BY u.name
      `, userId ? [userId] : []) as any;

      const berichte = [];
      for (const n of (nutzer as any[])) {
        const [logs] = await db.$client.query(`
          SELECT l.moduleId, l.dayId, l.openedAt, l.closedAt,
            l.durationSeconds, l.completed
          FROM learning_logs l
          WHERE l.userId = ?
          ${startDate ? 'AND DATE(l.openedAt) >= ?' : ''}
          ${endDate ? 'AND DATE(l.openedAt) <= ?' : ''}
          ORDER BY l.openedAt ASC
        `, [n.id, ...(startDate?[startDate]:[]), ...(endDate?[endDate]:[])]) as any;

        const logArr = logs as any[];
        const totalSekunden = logArr.reduce((s:number, l:any) => s + (l.durationSeconds||0), 0);
        const totalUE = Math.round(totalSekunden / 2700); // 45min = 2700s = 1 UE
        const totalStunden = Math.round(totalSekunden / 3600 * 10) / 10;
        const abgeschlossen = logArr.filter((l:any) => l.completed).length;

        // Tagesweise gruppieren
        const tage: Record<string, any> = {};
        for (const l of logArr) {
          const tag = l.openedAt ? new Date(l.openedAt).toISOString().split('T')[0] : 'unbekannt';
          if (!tage[tag]) tage[tag] = { datum:tag, sitzungen:0, sekunden:0, module:new Set(), abgeschlossen:0 };
          tage[tag].sitzungen++;
          tage[tag].sekunden += l.durationSeconds||0;
          tage[tag].module.add(`M${l.moduleId} Tag ${l.dayId}`);
          if (l.completed) tage[tag].abgeschlossen++;
        }

        const tagesNachweis = Object.values(tage).map((t:any) => ({
          datum: t.datum,
          sitzungen: t.sitzungen,
          lernzeit: `${Math.round(t.sekunden/60)} Min`,
          ue: Math.round(t.sekunden/2700),
          module: Array.from(t.module).join(', '),
          abgeschlossen: t.abgeschlossen,
        }));

        berichte.push({
          nutzer: { name:n.name, email:n.email, module:n.enabledModules },
          zusammenfassung: {
            gesamtSitzungen: logArr.length,
            gesamtStunden: totalStunden,
            gesamtUE: totalUE,
            abgeschlosseneEinheiten: abgeschlossen,
            aktiveTage: Object.keys(tage).length,
          },
          tagesNachweis,
          azavKonformitaet: {
            mindestUEErreicht: totalUE >= 1,
            nachweisVorhanden: logArr.length > 0,
            zeitraumVon: tagesNachweis[0]?.datum || 'k.A.',
            zeitraumBis: tagesNachweis[tagesNachweis.length-1]?.datum || 'k.A.',
          }
        });
      }

      res.json({
        berichtDatum: new Date().toISOString(),
        zeitraum: { von: startDate||'alle', bis: endDate||'alle' },
        gesamtNutzer: berichte.length,
        berichte,
        hinweis: "Dieser Bericht dient als Grundlage fuer AZAV-Anwesenheitsnachweise gemaess §§ 176-180 SGB III"
      });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── MONITORING HISTORY ───────────────────────────────────────
  app.get("/api/owner/monitoring", async (req: Request, res: Response) => {
    if (!(await requireOwner(req, res))) return;
    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      const [logs] = await db.$client.query(
        `SELECT * FROM monitoring_log ORDER BY timestamp DESC LIMIT 30`
      ) as any;
      res.json({ logs: logs as any[] });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ── HEALTH WATCHER MANUELL AUSLÖSEN ────────────────────────
  app.post("/api/owner/trigger-health", async (req: Request, res: Response) => {
    if (!(await requireOwner(req, res))) return;
    try {
      const { runHealthWatch } = await import("./agent/HealthWatcher");
      await runHealthWatch();
      const db2 = await (await import("./db")).getDb();
      const [lastRows] = await db2.$client.query(
        "SELECT type, status, timestamp, details FROM monitoring_log ORDER BY timestamp DESC LIMIT 1"
      ) as any;
      res.json({ ok: true, lastCheck: (lastRows as any[])[0] || null });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });
  // ── Portal Settings: Lesen ───────────────────────────────────
  app.get("/api/owner/settings", async (req: any, res: any) => {
    if (!(await requireOwner(req, res))) return;
    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      let rows: any[] = [];
      try {
        const [r] = await db.execute("SELECT setting_key, setting_value, setting_type, description FROM portal_settings ORDER BY setting_key") as any;
        rows = r;
      } catch { return res.json({ ok: true, settings: {} }); }
      const settings: Record<string, string> = {};
      for (const row of (rows as any[])) {
        settings[row.setting_key] = row.setting_value;
      }
      res.json({ ok: true, settings });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ── Portal Settings: Schreiben ──────────────────────────────
  app.post("/api/owner/settings", async (req: any, res: any) => {
    if (!(await requireOwner(req, res))) return;
    try {
      const { key: settingKey, value } = req.body;
      if (!settingKey || value === undefined) return res.status(400).json({ error: "key und value erforderlich" });
      const { getDb } = await import("./db");
      const db = await getDb();
      await db.execute(
        sql`INSERT INTO portal_settings (setting_key, setting_value) VALUES (${settingKey}, ${value}) ON DUPLICATE KEY UPDATE setting_value = ${value}`
      );
      res.json({ ok: true, key: settingKey, value });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}
