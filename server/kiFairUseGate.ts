import type { Express, Request, Response, NextFunction } from "express";
import { ENV } from "./_core/env";
import { assertKiFairUse } from "./kiFairUse";
import { KI_FAIR_USE_POST_PATHS, KI_RENEWAL_DAILY_LIMIT } from "../shared/kiFairUse";

export function createKiFairUseMiddleware(): (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "POST") return next();

    try {
      const { parse: parseCookie } = await import("cookie");
      const { jwtVerify } = await import("jose");
      const rawCookies = parseCookie(req.headers.cookie ?? "");
      const token =
        rawCookies["app_session_id"] ||
        rawCookies["session"] ||
        rawCookies["auth_token"];
      if (!token) return next();

      const secret = new TextEncoder().encode(
        ENV.cookieSecret || process.env.JWT_SECRET || "",
      );
      const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
      const openId = payload.openId as string;
      const role = payload.role as string | undefined;
      if (!openId) return next();

      const { getUserByOpenId, getDb } = await import("./db");
      const user = await getUserByOpenId(openId);
      if (!user?.id) return next();
      if (user.role === "admin" || role === "admin") return next();

      const db = await getDb();
      if (!db) return next();

      await assertKiFairUse(db, user.id, user.role);
      return next();
    } catch (err: any) {
      if (err?.code === "KI_QUOTA_EXCEEDED") {
        res.status(429).json({
          error: `KI-Tageslimit erreicht (${KI_RENEWAL_DAILY_LIMIT} Nachrichten/Tag im Verlängerungs-Tarif). Morgen wieder verfügbar oder Vollzugang über Modulkauf.`,
          quota: err.quota,
        });
        return;
      }
      next();
    }
  };
}

export function mountKiFairUseGate(app: Express): void {
  const middleware = createKiFairUseMiddleware();
  for (const path of KI_FAIR_USE_POST_PATHS) {
    app.use(path, middleware);
  }
}
