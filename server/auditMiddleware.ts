import type { Express, Request, Response, NextFunction } from "express";
import { auditRequestMeta, recordPlatformAudit } from "./platformAuditLog";

/** Loggt KI-API-Aufrufe nach erfolgreichem Response */
export function mountAuditKiMiddleware(app: Express): void {
  app.use("/api/ai", (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "POST") return next();

    res.on("finish", () => {
      if (res.statusCode < 200 || res.statusCode >= 400) return;
      void logKiCall(req);
    });

    return next();
  });
}

async function logKiCall(req: Request): Promise<void> {
  try {
    const { parse: parseCookie } = await import("cookie");
    const { jwtVerify } = await import("jose");
    const { ENV } = await import("./_core/env");
    const rawCookies = parseCookie(req.headers.cookie ?? "");
    const token = rawCookies["app_session_id"] || rawCookies["session"] || rawCookies["auth_token"];
    if (!token) return;

    const secret = new TextEncoder().encode(ENV.cookieSecret || process.env.JWT_SECRET || "");
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    const openId = payload.openId as string;
    if (!openId) return;

    const { getUserByOpenId } = await import("./db");
    const user = await getUserByOpenId(openId);
    if (!user) return;

    const meta = auditRequestMeta(req);
    recordPlatformAudit({
      eventType: "ki_call",
      actorUserId: user.id,
      actorEmail: user.email,
      actorRole: user.role,
      resourceType: "api",
      resourceId: req.path,
      meta: { endpoint: req.originalUrl },
      ...meta,
    });
  } catch {
    // ignore
  }
}
