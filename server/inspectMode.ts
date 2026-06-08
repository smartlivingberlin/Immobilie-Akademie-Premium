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

/**
 * tRPC read paths explicitly permitted during inspect mode.
 * Admin/owner procedures are blocked centrally; these use public or protected procedures.
 */
export const INSPECT_TRPC_READ_ALLOWLIST = [
  "modules.myAccess",
  "auth.me",
  "progress.getProgress",
  "videos.list",
  "videos.getByModule",
  "videos.getByDay",
  "videos.getById",
  "system.health",
] as const;

export type InspectTrpcReadPath = (typeof INSPECT_TRPC_READ_ALLOWLIST)[number];

export function isInspectTrpcReadAllowed(path: string): path is InspectTrpcReadPath {
  return (INSPECT_TRPC_READ_ALLOWLIST as readonly string[]).includes(path);
}

/**
 * Admin REST GET paths permitted during inspect (no auth cookie required).
 * Default-deny: everything else behind requireAdmin returns 403 in inspect.
 */
export const INSPECT_REST_ADMIN_GET_ALLOWLIST = [
  "/api/admin/mysql-health", // DB connectivity + migration counts — no PII
  "/api/admin/migration-status", // schema_migrations ledger — no PII
  "/api/admin/stripe-webhook-health", // webhook config flag — no PII
  "/api/agent/health", // SuperAgent system check — AdminDashboard widget
  "/api/agent/status", // agent runtime status — AdminDashboard widget
  "/api/agent/cron-log", // last 50 cron lines — no user emails
  "/api/agent/knowledge-map", // static legal source map — no user data
] as const;

export type InspectRestAdminGetPath = (typeof INSPECT_REST_ADMIN_GET_ALLOWLIST)[number];

/** Canonical list of admin GET routes using requireAdmin (audit baseline). */
export const INSPECT_REST_ADMIN_GET_ROUTES = [
  "/api/admin/ki-stats",
  "/api/admin/referral-stats",
  "/api/admin/stripe-live-checklist",
  "/api/admin/stripe-price-config",
  "/api/admin/pending-purchases",
  "/api/admin/stripe-live-verify",
  "/api/admin/stripe-live-env-template",
  "/api/admin/stripe-live-env-missing",
  "/api/admin/partner-payout-details",
  "/api/admin/migration-status",
  "/api/admin/mysql-health",
  "/api/admin/stripe-webhook-health",
  "/api/admin/payout-ledger",
  "/api/admin/partner-payout-export",
  "/api/admin/trial-leads",
  "/api/agent/knowledge-map",
  "/api/agent/status",
  "/api/agent/health",
  "/api/agent/legal-updates",
  "/api/agent/coaching",
  "/api/agent/cron-log",
] as const;

export function isInspectRestAdminReadAllowed(path: string): boolean {
  const normalized = path.split("?")[0];
  if (normalized.startsWith("/api/agent/coaching/")) {
    return false;
  }
  return (INSPECT_REST_ADMIN_GET_ALLOWLIST as readonly string[]).includes(normalized);
}

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
