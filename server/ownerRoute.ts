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

}