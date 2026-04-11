import type { Express, Request, Response } from "express";
import { createSessionToken } from "./_core/auth-local";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { COOKIE_NAME, ONE_YEAR_MS } from "../shared/const";

export function registerOwnerRoutes(app: Express) {

  // GET /api/owner/access?key=OWNER-XXXX
  // Direkter Admin-Zugang — kein Login nötig
  app.get("/api/owner/access", async (req: Request, res: Response) => {
    const { key, redirect: redir } = req.query as { key?: string; redirect?: string };

    // Lese direkt aus process.env zur Laufzeit (nicht gecacht)
    const ownerCode = process.env.OWNER_MAGIC_CODE || ENV.ownerMagicCode;
    console.log("[Owner] Code check:", !!ownerCode, "key:", key?.slice(0,10));
    if (!key || !ownerCode || key !== ownerCode) {
      return res.status(403).send(`
        <html><body style="font-family:Arial;padding:40px;text-align:center">
          <h2 style="color:#dc2626">Zugang verweigert</h2>
          <p>Ungültiger oder fehlender Schlüssel.</p>
        </body></html>
      `);
    }

    // Als Owner-Admin einloggen
    const openId = "local:alisadgadyri38@gmail.com";
    const token = await createSessionToken(openId, "Alisad (Owner)");
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });

    // Weiterleitung
    const target = redir || "/admin";
    return res.redirect(target);
  });

  // GET /owner → Kurzlink
  app.get("/owner", async (req: Request, res: Response) => {
    const ownerCode = process.env.OWNER_MAGIC_CODE || ENV.ownerMagicCode;
    if (!ownerCode) {
      console.error("[Owner] OWNER_MAGIC_CODE nicht gesetzt! ENV:", Object.keys(process.env).filter(k => k.includes('OWNER')));
      return res.status(500).send(`OWNER_MAGIC_CODE fehlt. Env-Keys: ${Object.keys(process.env).filter(k=>k.includes('OWNER')).join(',')}`);
    }
    return res.redirect(`/api/owner/access?key=${ownerCode}&redirect=/admin`);
  });
}

  // POST /api/owner/inspect-token → erstellt 72h Inspect-Link
  app.post("/api/owner/inspect-token", async (req: Request, res: Response) => {
    const { key } = req.body as { key?: string };
    const ownerCode = process.env.OWNER_MAGIC_CODE || ENV.ownerMagicCode;
    if (!key || !ownerCode || key !== ownerCode) {
      return res.status(403).json({ error: "Ungültiger Schlüssel" });
    }
    // JWT mit 72h Ablauf + inspect-Rolle
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
      if (payload.role !== "inspect") throw new Error("Falsche Rolle");
      // Als Inspect-User einloggen — spezieller openId
      const inspectId = `inspect:${token.slice(0, 8)}`;
      const sessionToken = await createSessionToken(inspectId, "Vorschau-Besucher");
      const { getSessionCookieOptions } = await import("./_core/cookies");
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie("app_session_id", sessionToken, { ...cookieOptions, maxAge: 72 * 60 * 60 * 1000 });
      // Inspect-Token auch als Cookie setzen (für Banner)
      res.cookie("inspect_mode", token.slice(0, 16), { httpOnly: false, sameSite: "strict", maxAge: 72 * 60 * 60 * 1000 });
      return res.redirect("/dashboard");
    } catch (e: any) {
      console.log("[Owner] Inspect-Token ungültig:", e.message);
      return res.status(403).send(`
        <html><body style="font-family:Arial;padding:40px;text-align:center">
          <h2 style="color:#dc2626">Link abgelaufen oder ungültig</h2>
          <p>Bitte einen neuen Inspect-Link anfordern.</p>
        </body></html>
      `);
    }
  });
}
