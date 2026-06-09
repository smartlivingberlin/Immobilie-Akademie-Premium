import type { Express, Request, Response, NextFunction } from "express";
import { readKursbuchCache, writeKursbuchCache } from "./generatorFileCache";

/** Cache für Kursbuch v2 — ohne ragTutor.ts zu ändern */
export function mountGeneratorCacheGate(app: Express): void {
  app.use("/api/ai/generate-kursbuch-v2", (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "POST") return next();

    const body = req.body ?? {};
    const moduleId = Number(body.moduleId);
    const format = String(body.format || "kursbuch");
    const forceRegenerate = Boolean(body.forceRegenerate);

    if (!forceRegenerate && moduleId > 0) {
      const cached = readKursbuchCache(moduleId, format);
      if (cached) return res.json(cached);
    }

    const originalJson = res.json.bind(res);
    res.json = (payload: unknown) => {
      if (
        payload &&
        typeof payload === "object" &&
        (payload as { success?: boolean }).success &&
        (payload as { content?: string }).content &&
        moduleId > 0
      ) {
        writeKursbuchCache(moduleId, format, payload as Parameters<typeof writeKursbuchCache>[2]);
      }
      return originalJson(payload);
    };

    return next();
  });
}
