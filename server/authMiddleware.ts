import { ENV } from "./_core/env";
import { isInspectModeActive } from "./inspectMode";
import type { Request, Response, NextFunction } from "express";

/**
 * Re-implementation of requireAuth to avoid modifying restricted core files.
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { parse: parseCookie } = await import("cookie");
    const rawCookies = parseCookie(req.headers.cookie ?? "");
    const token = rawCookies["app_session_id"] ||
                  rawCookies["session"] ||
                  rawCookies["auth_token"];
    if (!token) {
      return res.status(401).json({ error: "Login erforderlich" });
    }
    const { jwtVerify } = await import("jose");
    const secret = new TextEncoder().encode(
      ENV.cookieSecret || (() => { throw new Error("JWT_SECRET nicht gesetzt"); })()
    );
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    if (!payload) {
      return res.status(401).json({ error: "Ungültiger Token" });
    }

    // Resolve full user object including numeric ID
    const { getUserByOpenId } = await import("./db");
    const user = await getUserByOpenId(payload.openId as string);
    if (!user) {
      return res.status(401).json({ error: "Nutzer nicht gefunden" });
    }

    (req as any).currentUser = { ...payload, id: user.id };
    return next();
  } catch (e) {
    return res.status(401).json({ error: "Login erforderlich" });
  }
}

/**
 * requireAdmin middleware
 */
export async function requireAdmin(req: any, res: any, next: NextFunction) {
  if (
    isInspectModeActive(req)
    && (req.method === "GET" || req.method === "HEAD")
  ) {
    return next();
  }

  await requireAuth(req, res, async () => {
    if (req.currentUser?.role !== "admin") {
      return res.status(403).json({ error: "Nur Administratoren haben Zugriff." });
    }
    next();
  });
}
