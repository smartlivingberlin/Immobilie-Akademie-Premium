import type { Request } from "express";
import type { User } from "../drizzle/schema";

export const INSPECT_FORBIDDEN_MSG =
  "Vorschau-Modus — Änderungen sind deaktiviert";

/** Synthetic user injected for read-only inspect sessions (no DB row). */
export const INSPECT_PREVIEW_USER: User = {
  id: 0,
  openId: "inspect:preview",
  name: "Vorschau-Gast",
  email: "inspect@preview.local",
  loginMethod: null,
  role: "admin",
  enabledModules: "1,2,3,4,5",
  onboardingCompleted: 0,
  trialExpiresAt: null,
  learningGoal: null,
  dailyMinutes: 30,
  preferredTime: null,
  experienceLevel: null,
  tenantId: null,
  createdAt: new Date(0),
  updatedAt: new Date(0),
  lastSignedIn: new Date(0),
  streakDays: 0,
  lastStreakUpdate: null,
};

/** Shared helper: active inspect cookie with optional expiry check. */
export function isInspectModeActive(req: Request): boolean {
  if (req.cookies?.inspect_mode !== "1") return false;
  const expiresAt = Number(req.cookies?.inspect_mode_expires_at);
  if (!Number.isNaN(expiresAt) && expiresAt > 0 && Date.now() > expiresAt) {
    return false;
  }
  return true;
}

const INSPECT_WRITE_ALLOWLIST = new Set([
  "/inspect/exit",
  "/api/auth/inspect-status",
]);

/** Blocks all non-GET write requests during inspect mode (REST layer). */
export function blockInspectWrites(
  req: Request,
  res: { status: (code: number) => { json: (body: unknown) => void } },
  next: () => void,
): void {
  if (!isInspectModeActive(req)) {
    next();
    return;
  }

  if (req.method === "GET" || req.method === "HEAD" || req.method === "OPTIONS") {
    next();
    return;
  }

  const path = req.path;
  if (INSPECT_WRITE_ALLOWLIST.has(path)) {
    next();
    return;
  }

  res.status(403).json({
    error: INSPECT_FORBIDDEN_MSG,
    inspect: true,
  });
}
