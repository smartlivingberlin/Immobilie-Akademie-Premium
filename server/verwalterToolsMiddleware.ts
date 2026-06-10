import type { Request, Response, NextFunction } from "express";
import { requireAuth } from "./authMiddleware";
import { hasVerwalterToolsAccess, hasVerwalterToolsGating } from "../shared/verwalterToolsAccess";

async function checkVerwalterToolsAccess(req: Request, res: Response, next: NextFunction) {
  if (!hasVerwalterToolsGating()) return next();

  const uid = (req as { currentUser?: { id?: number } }).currentUser?.id;
  if (!uid) return res.status(401).json({ error: "Login erforderlich" });

  try {
    const { getDb } = await import("./db");
    const schema = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    const db = await getDb();
    if (!db) return res.status(503).json({ error: "Datenbank nicht verfügbar" });

    const [row] = await db
      .select({ enabledModules: schema.users.enabledModules, role: schema.users.role })
      .from(schema.users)
      .where(eq(schema.users.id, uid))
      .limit(1);

    if (!row || !hasVerwalterToolsAccess(row.enabledModules ?? "", row.role)) {
      return res.status(403).json({
        error: "Verwalter Tools Abo erforderlich",
        code: "VERWALTER_TOOLS_REQUIRED",
        upgradeUrl: "/fuer-verwaltungsbueros",
      });
    }
    return next();
  } catch {
    return res.status(500).json({ error: "Zugriffsprüfung fehlgeschlagen" });
  }
}

/** Auth + optional Verwalter-Tools-Abo (nur wenn VERWALTER_TOOLS_GATING=1). */
export function requireVerwalterAuth(req: Request, res: Response, next: NextFunction) {
  requireAuth(req, res, () => {
    void checkVerwalterToolsAccess(req, res, next);
  });
}
