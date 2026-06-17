import type { Request } from "express";

export type AuditEventType =
  | "login"
  | "logout"
  | "register"
  | "module_open"
  | "module_complete"
  | "ki_call"
  | "owner_impersonate"
  | "owner_lock"
  | "owner_unlock"
  | "owner_set_role"
  | "stripe_purchase"
  | "stripe_webhook_replay";

export type AuditEventInput = {
  eventType: AuditEventType;
  actorUserId?: number | null;
  actorEmail?: string | null;
  actorRole?: string | null;
  targetUserId?: number | null;
  targetEmail?: string | null;
  resourceType?: string | null;
  resourceId?: string | null;
  meta?: Record<string, unknown>;
  ipAddress?: string | null;
  userAgent?: string | null;
};

let tableReady: Promise<void> | null = null;

async function ensureAuditTable(db: { $client: { query: Function } }): Promise<void> {
  if (!tableReady) {
    tableReady = db.$client.query(`
      CREATE TABLE IF NOT EXISTS platform_audit_events (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        eventType VARCHAR(64) NOT NULL,
        actorUserId INT NULL,
        actorEmail VARCHAR(255) NULL,
        actorRole VARCHAR(32) NULL,
        targetUserId INT NULL,
        targetEmail VARCHAR(255) NULL,
        resourceType VARCHAR(64) NULL,
        resourceId VARCHAR(128) NULL,
        meta JSON NULL,
        ipAddress VARCHAR(64) NULL,
        userAgent VARCHAR(512) NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_audit_created (createdAt),
        INDEX idx_audit_event_type (eventType),
        INDEX idx_audit_actor_email (actorEmail)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `).then(() => undefined);
  }
  await tableReady;
}

export function auditRequestMeta(req?: Request): { ipAddress?: string; userAgent?: string } {
  if (!req) return {};
  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string"
    ? forwarded.split(",")[0]?.trim()
    : req.socket?.remoteAddress;
  const ua = req.headers["user-agent"];
  return {
    ipAddress: ip || undefined,
    userAgent: typeof ua === "string" ? ua.slice(0, 512) : undefined,
  };
}

/** Fire-and-forget — blockiert nie den Request-Pfad */
export function recordPlatformAudit(event: AuditEventInput): void {
  void (async () => {
    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      if (!db) return;
      await ensureAuditTable(db);
      await db.$client.query(
        `INSERT INTO platform_audit_events
          (eventType, actorUserId, actorEmail, actorRole, targetUserId, targetEmail, resourceType, resourceId, meta, ipAddress, userAgent)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          event.eventType,
          event.actorUserId ?? null,
          event.actorEmail ?? null,
          event.actorRole ?? null,
          event.targetUserId ?? null,
          event.targetEmail ?? null,
          event.resourceType ?? null,
          event.resourceId ?? null,
          event.meta ? JSON.stringify(event.meta) : null,
          event.ipAddress ?? null,
          event.userAgent ?? null,
        ],
      );
    } catch (e) {
      console.error(JSON.stringify({
        level: "warn",
        msg: "[platformAuditLog] write failed",
        eventType: event.eventType,
        error: (e as Error)?.message,
      }));
    }
  })();
}

export type AuditEventRow = {
  id: number;
  eventType: string;
  actorUserId: number | null;
  actorEmail: string | null;
  actorRole: string | null;
  targetUserId: number | null;
  targetEmail: string | null;
  resourceType: string | null;
  resourceId: string | null;
  meta: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
};

export async function queryPlatformAuditEvents(opts: {
  limit?: number;
  offset?: number;
  eventType?: string;
  email?: string;
  sinceHours?: number;
}): Promise<{ events: AuditEventRow[]; total: number }> {
  const { getDb } = await import("./db");
  const db = await getDb();
  if (!db) return { events: [], total: 0 };

  await ensureAuditTable(db);

  const limit = Math.min(Math.max(opts.limit ?? 50, 1), 200);
  const offset = Math.max(opts.offset ?? 0, 0);
  const params: unknown[] = [];
  const where: string[] = [];

  if (opts.eventType) {
    where.push("eventType = ?");
    params.push(opts.eventType);
  }
  if (opts.email) {
    where.push("(actorEmail LIKE ? OR targetEmail LIKE ?)");
    params.push(`%${opts.email}%`, `%${opts.email}%`);
  }
  if (opts.sinceHours && opts.sinceHours > 0) {
    where.push("createdAt > DATE_SUB(NOW(), INTERVAL ? HOUR)");
    params.push(opts.sinceHours);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const [countRows] = await db.$client.query(
    `SELECT COUNT(*) as cnt FROM platform_audit_events ${whereSql}`,
    params,
  ) as any;
  const total = Number((countRows as any[])[0]?.cnt || 0);

  const [rows] = await db.$client.query(
    `SELECT id, eventType, actorUserId, actorEmail, actorRole, targetUserId, targetEmail,
            resourceType, resourceId, meta, ipAddress, userAgent, createdAt
     FROM platform_audit_events
     ${whereSql}
     ORDER BY createdAt DESC
     LIMIT ? OFFSET ?`,
    [...params, limit, offset],
  ) as any;

  const events = (rows as any[]).map((row) => ({
    ...row,
    meta: typeof row.meta === "string" ? JSON.parse(row.meta) : row.meta,
  }));

  return { events, total };
}
