import { randomUUID } from "crypto";
import { getPool } from "./db";
import type {
  InboxMessageStatus,
  InboxVorgangTypVorschlag,
  VerwalterInboxMessage,
} from "../shared/verwalterInboxTypes";

function tsToIso(v: Date | string | null): string {
  if (!v) return new Date().toISOString();
  return v instanceof Date ? v.toISOString() : String(v);
}

function rowToMessage(row: Record<string, unknown>): VerwalterInboxMessage {
  return {
    id: String(row.id),
    messageId: row.messageId ? String(row.messageId) : undefined,
    fromEmail: String(row.fromEmail),
    fromName: row.fromName ? String(row.fromName) : undefined,
    subject: String(row.subject),
    bodyText: row.bodyText ? String(row.bodyText) : undefined,
    bodyHtml: row.bodyHtml ? String(row.bodyHtml) : undefined,
    objektId: row.objektId ? String(row.objektId) : undefined,
    einheitId: row.einheitId ? String(row.einheitId) : undefined,
    vorgangId: row.vorgangId ? String(row.vorgangId) : undefined,
    vorgangTypVorschlag: row.vorgangTypVorschlag
      ? (String(row.vorgangTypVorschlag) as InboxVorgangTypVorschlag)
      : undefined,
    status: row.status as InboxMessageStatus,
    createdAt: tsToIso(row.createdAt as Date | string),
    updatedAt: tsToIso(row.updatedAt as Date | string),
  };
}

export async function createInboxMessage(
  userId: number,
  input: {
    messageId?: string;
    fromEmail: string;
    fromName?: string;
    subject: string;
    bodyText?: string;
    bodyHtml?: string;
    objektId?: string;
    einheitId?: string;
    vorgangTypVorschlag?: InboxVorgangTypVorschlag;
    status?: InboxMessageStatus;
  },
): Promise<VerwalterInboxMessage> {
  if (input.messageId) {
    const existing = await getInboxMessageByMessageId(userId, input.messageId);
    if (existing) return existing;
  }

  const id = randomUUID().slice(0, 12);
  const pool = getPool();
  await pool.query(
    `INSERT INTO verwalter_inbox_messages
     (id, userId, messageId, fromEmail, fromName, subject, bodyText, bodyHtml, objektId, einheitId, vorgangTypVorschlag, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      userId,
      input.messageId ?? null,
      input.fromEmail,
      input.fromName ?? null,
      input.subject,
      input.bodyText ?? null,
      input.bodyHtml ?? null,
      input.objektId ?? null,
      input.einheitId ?? null,
      input.vorgangTypVorschlag ?? null,
      input.status ?? (input.objektId ? "zugeordnet" : "neu"),
    ],
  );

  const msg = await getInboxMessage(userId, id);
  if (!msg) throw new Error("Inbox-Nachricht konnte nicht gespeichert werden");
  return msg;
}

export async function getInboxMessage(userId: number, id: string): Promise<VerwalterInboxMessage | null> {
  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT * FROM verwalter_inbox_messages WHERE id = ? AND userId = ? LIMIT 1",
    [id, userId],
  );
  const row = (rows as Record<string, unknown>[])[0];
  return row ? rowToMessage(row) : null;
}

export async function getInboxMessageByMessageId(
  userId: number,
  messageId: string,
): Promise<VerwalterInboxMessage | null> {
  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT * FROM verwalter_inbox_messages WHERE messageId = ? AND userId = ? LIMIT 1",
    [messageId, userId],
  );
  const row = (rows as Record<string, unknown>[])[0];
  return row ? rowToMessage(row) : null;
}

export async function listInboxMessages(
  userId: number,
  opts?: { status?: InboxMessageStatus; limit?: number },
): Promise<VerwalterInboxMessage[]> {
  const pool = getPool();
  const limit = Math.min(Math.max(opts?.limit ?? 50, 1), 200);
  const params: unknown[] = [userId];
  let sql = "SELECT * FROM verwalter_inbox_messages WHERE userId = ?";
  if (opts?.status) {
    sql += " AND status = ?";
    params.push(opts.status);
  }
  sql += " ORDER BY createdAt DESC LIMIT ?";
  params.push(limit);
  const [rows] = await pool.query(sql, params);
  return (rows as Record<string, unknown>[]).map(rowToMessage);
}

export async function updateInboxMessage(
  userId: number,
  id: string,
  patch: Partial<{
    objektId: string | null;
    einheitId: string | null;
    vorgangId: string | null;
    status: InboxMessageStatus;
    vorgangTypVorschlag: InboxVorgangTypVorschlag;
  }>,
): Promise<VerwalterInboxMessage | null> {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (patch.objektId !== undefined) {
    fields.push("objektId = ?");
    values.push(patch.objektId);
  }
  if (patch.einheitId !== undefined) {
    fields.push("einheitId = ?");
    values.push(patch.einheitId);
  }
  if (patch.vorgangId !== undefined) {
    fields.push("vorgangId = ?");
    values.push(patch.vorgangId);
  }
  if (patch.status !== undefined) {
    fields.push("status = ?");
    values.push(patch.status);
  }
  if (patch.vorgangTypVorschlag !== undefined) {
    fields.push("vorgangTypVorschlag = ?");
    values.push(patch.vorgangTypVorschlag);
  }

  if (fields.length === 0) return getInboxMessage(userId, id);

  values.push(id, userId);
  const pool = getPool();
  await pool.query(
    `UPDATE verwalter_inbox_messages SET ${fields.join(", ")} WHERE id = ? AND userId = ?`,
    values,
  );
  return getInboxMessage(userId, id);
}

export async function countInboxMessages(
  userId: number,
  status?: InboxMessageStatus,
): Promise<number> {
  const pool = getPool();
  const params: unknown[] = [userId];
  let sql = "SELECT COUNT(*) as cnt FROM verwalter_inbox_messages WHERE userId = ?";
  if (status) {
    sql += " AND status = ?";
    params.push(status);
  }
  const [rows] = await pool.query(sql, params);
  const row = (rows as { cnt: number }[])[0];
  return Number(row?.cnt ?? 0);
}
