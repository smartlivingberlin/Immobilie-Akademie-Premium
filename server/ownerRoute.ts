import type { Express, Request, Response } from "express";
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

  // GET /inspect/:token → Shortcut (wird vor SPA abgefangen)
  app.get("/inspect/:token", async (req: Request, res: Response) => {
    const { token } = req.params;
    try {
      const { jwtVerify } = await import("jose");
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || ENV.cookieSecret || "inspect-secret");
      const { payload } = await jwtVerify(token, secret);
      if ((payload as any).role !== "inspect") throw new Error("Falsche Rolle");
      // Exakt wie /owner Route — bewährt funktionierende Methode
      const openId = "local:alisadgadyri38@gmail.com";
      const sessionToken = await createSessionToken(openId, "Alisad (Owner)");
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.cookie("inspect_mode", "1", { httpOnly: false, sameSite: "lax", path: "/", maxAge: 72 * 60 * 60 * 1000 });
      return res.send(`<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><title>Vorschau lädt...</title>
<style>body{font-family:Arial;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#0f1f3d}
.box{text-align:center;color:white;padding:40px}
.banner{background:#fbbf24;color:#78350f;padding:12px 24px;border-radius:8px;font-weight:bold;margin-bottom:20px;display:inline-block}
.loader{width:40px;height:40px;border:4px solid rgba(255,255,255,.2);border-top-color:#fbbf24;border-radius:50%;animation:spin 1s linear infinite;margin:20px auto}
@keyframes spin{to{transform:rotate(360deg)}}p{color:rgba(255,255,255,.7);font-size:14px}</style></head>
<body><div class="box"><div class="banner">👁️ Vorschau-Modus — READ ONLY</div>
<div class="loader"></div><p>Portal wird geladen...</p></div>
<script>setTimeout(()=>{window.location.href="/kurse"},1500)</script>
</body></html>`);
    } catch (e: any) {
      return res.status(403).send(`<html><body style="font-family:Arial;padding:40px;text-align:center">
<h2 style="color:#dc2626">Link abgelaufen oder ungültig</h2>
<p>Bitte einen neuen Link beim Portal-Eigentümer anfordern.</p></body></html>`);
    }
  });

  // GET /inspect/:token → Shortcut (wird vor SPA abgefangen)
  app.get("/inspect/:token", async (req: Request, res: Response) => {
    const { token } = req.params;
    try {
      const { jwtVerify } = await import("jose");
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || ENV.cookieSecret || "inspect-secret");
      const { payload } = await jwtVerify(token, secret);
      if ((payload as any).role !== "inspect") throw new Error("Falsche Rolle");
      // Exakt wie /owner Route — bewährt funktionierende Methode
      const openId = "local:alisadgadyri38@gmail.com";
      const sessionToken = await createSessionToken(openId, "Alisad (Owner)");
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.cookie("inspect_mode", "1", { httpOnly: false, sameSite: "lax", path: "/", maxAge: 72 * 60 * 60 * 1000 });
      return res.send(`<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><title>Vorschau lädt...</title>
<style>body{font-family:Arial;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#0f1f3d}
.box{text-align:center;color:white;padding:40px}
.banner{background:#fbbf24;color:#78350f;padding:12px 24px;border-radius:8px;font-weight:bold;margin-bottom:20px;display:inline-block}
.loader{width:40px;height:40px;border:4px solid rgba(255,255,255,.2);border-top-color:#fbbf24;border-radius:50%;animation:spin 1s linear infinite;margin:20px auto}
@keyframes spin{to{transform:rotate(360deg)}}p{color:rgba(255,255,255,.7);font-size:14px}</style></head>
<body><div class="box"><div class="banner">👁️ Vorschau-Modus — READ ONLY</div>
<div class="loader"></div><p>Portal wird geladen...</p></div>
<script>setTimeout(()=>{window.location.href="/kurse"},1500)</script>
</body></html>`);
    } catch (e: any) {
      return res.status(403).send(`<html><body style="font-family:Arial;padding:40px;text-align:center">
<h2 style="color:#dc2626">Link abgelaufen oder ungültig</h2>
<p>Bitte einen neuen Link beim Portal-Eigentümer anfordern.</p></body></html>`);
    }
  });

  // POST /api/owner/inspect-token → erstellt 72h Inspect-Link
  app.post("/api/owner/inspect-token", async (req: Request, res: Response) => {
    const { key } = req.body as { key?: string };
    const ownerCode = process.env.OWNER_MAGIC_CODE || ENV.ownerMagicCode;
    if (!key || !ownerCode || key !== ownerCode) {
      return res.status(403).json({ error: "Ungültiger Schlüssel" });
    }
    const { SignJWT } = await import("jose");
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || ENV.cookieSecret || "inspect-secret");
    const expiresAt = Date.now() + 72 * 60 * 60 * 1000;
    const token = await new SignJWT({ role: "inspect", expiresAt })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("72h")
      .setIssuedAt()
      .sign(secret);
    console.log("[Owner] Inspect-Token erstellt, läuft ab:", new Date(expiresAt).toLocaleString("de-DE"));
    return res.json({ token, expiresAt });
  });

  // GET /api/owner/inspect/:token → einloggen als Read-Only
  app.get("/api/owner/inspect/:token", async (req: Request, res: Response) => {
    const { token } = req.params;
    try {
      const { jwtVerify } = await import("jose");
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || ENV.cookieSecret || "inspect-secret");
      const { payload } = await jwtVerify(token, secret);
      if ((payload as any).role !== "inspect") throw new Error("Falsche Rolle");
      // Als echten Admin einloggen (Inspect-Modus)
      const openId = "local:alisadgadyri38@gmail.com";
      const sessionToken = await createSessionToken(openId, "Vorschau-Besucher");
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: 72 * 60 * 60 * 1000 });
      res.cookie("inspect_mode", "1", { httpOnly: false, sameSite: "lax", maxAge: 72 * 60 * 60 * 1000 });
      // HTML-Seite mit Auto-Redirect (gibt Browser Zeit Cookie zu speichern)
      return res.send(`<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Vorschau wird geladen...</title>
  <style>
    body { font-family: Arial, sans-serif; display: flex; align-items: center; 
           justify-content: center; min-height: 100vh; margin: 0; background: #0f1f3d; }
    .box { text-align: center; color: white; padding: 40px; }
    .banner { background: #fbbf24; color: #78350f; padding: 12px 24px; 
              border-radius: 8px; font-weight: bold; margin-bottom: 20px; display: inline-block; }
    .loader { width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.2); 
              border-top-color: #fbbf24; border-radius: 50%; 
              animation: spin 1s linear infinite; margin: 20px auto; }
    @keyframes spin { to { transform: rotate(360deg); } }
    p { color: rgba(255,255,255,0.7); font-size: 14px; }
  </style>
</head>
<body>
  <div class="box">
    <div class="banner">👁️ Vorschau-Modus — READ ONLY</div>
    <div class="loader"></div>
    <p>Portal wird geladen...</p>
  </div>
  <script>
    setTimeout(() => { window.location.href = "/kurse"; }, 1500);
  </script>
</body>
</html>`);
    } catch (e: any) {
      console.log("[Owner] Inspect-Token ungültig:", e.message);
      return res.status(403).send(`<html><body style="font-family:Arial;padding:40px;text-align:center"><h2 style="color:#dc2626">Link abgelaufen</h2><p>Bitte einen neuen Link anfordern.</p></body></html>`);
    }
  });

}
