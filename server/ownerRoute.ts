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

    const ownerCode = ENV.ownerMagicCode || process.env.OWNER_MAGIC_CODE;
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
    const ownerCode = ENV.ownerMagicCode || process.env.OWNER_MAGIC_CODE;
    if (!ownerCode) return res.status(500).send("OWNER_MAGIC_CODE nicht konfiguriert");
    return res.redirect(`/api/owner/access?key=${ownerCode}&redirect=/admin`);
  });
}
