
import type { Express, Request, Response } from "express";
import { getDb } from "./db";
import { sql } from "drizzle-orm";
import { createSessionToken, getSessionCookieOptions } from "./_core/auth-local";
import { COOKIE_NAME, ONE_YEAR_MS } from "../shared/const";
import { ENV } from "./_core/env";

export function registerOwnerRoutes(app: Express) {
  // GET /api/owner/access?key=OWNER-XXXX
  // Direkter Admin-Zugang für den Eigentümer — kein Login nötig
  app.get("/api/owner/access", async (req: Request, res: Response) => {
    const { key } = req.query as { key?: string };
    
    const ownerCode = ENV.ownerMagicCode || process.env.OWNER_MAGIC_CODE;
    if (!key || key !== ownerCode) {
      return res.status(403).send("Zugang verweigert.");
    }

    // Direkt als Admin-User einloggen
    const openId = "local:alisadgadyri38@gmail.com";
    const token = await createSessionToken(openId, "Alisad (Owner)");
    const cookieOptions = getSessionCookieOptions(req);
    
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
    
    // Weiterleitung zur Admin-Seite
    const redirect = (req.query.redirect as string) || "/admin";
    res.redirect(redirect);
  });

  // GET /owner — Kurzlink für den Eigentümer
  app.get("/owner", async (req: Request, res: Response) => {
    const ownerCode = ENV.ownerMagicCode || process.env.OWNER_MAGIC_CODE;
    res.redirect(`/api/owner/access?key=${ownerCode}&redirect=/admin`);
  });
}
