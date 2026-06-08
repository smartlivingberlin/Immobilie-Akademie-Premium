import { createHash } from "node:crypto";

export type DeletionInitiator = "user" | "admin";

export function hashUserIdForAudit(userId: number, jwtSecret: string): string {
  return createHash("sha256")
    .update(`${userId}:${jwtSecret}`)
    .digest("hex");
}

async function countRows(
  db: { $client: { query: (sql: string, params?: unknown[]) => Promise<unknown> } },
  sql: string,
  params: unknown[] = [],
): Promise<number> {
  const result = (await db.$client.query(sql, params)) as [Array<{ c: number }>, unknown];
  const rows = result[0] ?? [];
  return Number(rows[0]?.c ?? 0);
}

/** Counts rows per table before deletion — no PII in output. */
export async function snapshotUserDeletionCounts(
  db: { $client: { query: (sql: string, params?: unknown[]) => Promise<unknown> } },
  user: { userId: number; email?: string | null; openId?: string | null },
): Promise<Record<string, number>> {
  const email = String(user.email ?? "").trim().toLowerCase();
  const uid = user.userId;
  const counts: Record<string, number> = {};

  const userIdTables = [
    "open_answers",
    "spaced_repetition",
    "video_progress",
    "exam_weak_topics",
    "exam_audit_log",
    "certificates",
    "activity_heartbeats",
    "feedback",
    "complaints",
    "consent_log",
    "learning_logs",
    "user_sessions",
    "chat_conversations",
    "exam_sessions",
  ] as const;

  for (const table of userIdTables) {
    counts[table] = await countRows(
      db,
      `SELECT COUNT(*) as c FROM \`${table}\` WHERE userId = ?`,
      [uid],
    );
  }

  counts.chat_messages = await countRows(
    db,
    `SELECT COUNT(*) as c FROM chat_messages WHERE conversationId IN (
      SELECT id FROM chat_conversations WHERE userId = ?
    )`,
    [uid],
  );

  counts.exam_questions = await countRows(
    db,
    `SELECT COUNT(*) as c FROM exam_questions WHERE sessionId IN (
      SELECT id FROM exam_sessions WHERE userId = ?
    )`,
    [uid],
  );

  if (email) {
    counts.password_reset_tokens = await countRows(
      db,
      "SELECT COUNT(*) as c FROM password_reset_tokens WHERE email = ?",
      [email],
    );
    counts.pending_purchases = await countRows(
      db,
      "SELECT COUNT(*) as c FROM pending_purchases WHERE email = ? OR claimedByUserId = ?",
      [email, uid],
    );
    counts.otp_tokens = await countRows(
      db,
      "SELECT COUNT(*) as c FROM otp_tokens WHERE email = ?",
      [email],
    );
    counts.trial_leads = await countRows(
      db,
      "SELECT COUNT(*) as c FROM trial_leads WHERE email = ?",
      [email],
    );
  }

  counts.users = 1;
  return Object.fromEntries(
    Object.entries(counts).filter(([, n]) => n > 0),
  );
}

export async function recordDeletionAudit(
  db: { $client: { query: (sql: string, params?: unknown[]) => Promise<unknown> } },
  input: {
    userId: number;
    initiatedBy: DeletionInitiator;
    triggeredVia: string;
    tablesAffected: Record<string, number>;
  },
): Promise<void> {
  const jwtSecret = process.env.JWT_SECRET ?? "";
  if (!jwtSecret) {
    console.error(JSON.stringify({
      level: "warn",
      msg: "[deletionAudit] JWT_SECRET missing — audit log skipped",
      ts: new Date().toISOString(),
    }));
    return;
  }

  const userHash = hashUserIdForAudit(input.userId, jwtSecret);
  await db.$client.query(
    `INSERT INTO deletion_audit_log (userHash, initiatedBy, tablesAffected, triggeredVia)
     VALUES (?, ?, ?, ?)`,
    [
      userHash,
      input.initiatedBy,
      JSON.stringify(input.tablesAffected),
      input.triggeredVia.slice(0, 100),
    ],
  );
}
