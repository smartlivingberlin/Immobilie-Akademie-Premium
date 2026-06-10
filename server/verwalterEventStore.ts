import { randomUUID } from "crypto";
import { getPool } from "./db";
import type {
  VerwalterEvent,
  VerwalterEventStatus,
  VerwalterEventTyp,
  VerwalterFreigabe,
  VerwalterFreigabeKind,
  VerwalterFreigabeStatus,
} from "../shared/verwalterEventTypes";

function tsToIso(v: Date | string | null): string {
  if (!v) return new Date().toISOString();
  return v instanceof Date ? v.toISOString() : String(v);
}

function parseJson<T extends Record<string, unknown>>(raw: string | null): T | undefined {
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw) as T;
    return parsed && typeof parsed === "object" ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function rowToEvent(row: Record<string, unknown>): VerwalterEvent {
  return {
    id: String(row.id),
    objektId: row.objektId ? String(row.objektId) : undefined,
    vorgangId: row.vorgangId ? String(row.vorgangId) : undefined,
    typ: row.typ as VerwalterEventTyp,
    payload: parseJson(String(row.payloadJson ?? "")),
    status: row.status as VerwalterEventStatus,
    createdAt: tsToIso(row.createdAt as Date | string),
    updatedAt: tsToIso(row.updatedAt as Date | string),
  };
}

function rowToFreigabe(row: Record<string, unknown>): VerwalterFreigabe {
  return {
    id: String(row.id),
    objektId: row.objektId ? String(row.objektId) : undefined,
    vorgangId: row.vorgangId ? String(row.vorgangId) : undefined,
    kind: row.kind as VerwalterFreigabeKind,
    titel: String(row.titel),
    payload: parseJson(String(row.payloadJson ?? "{}")) ?? {},
    status: row.status as VerwalterFreigabeStatus,
    createdAt: tsToIso(row.createdAt as Date | string),
    updatedAt: tsToIso(row.updatedAt as Date | string),
  };
}

export async function appendVerwalterEvent(
  userId: number,
  input: {
    typ: VerwalterEventTyp;
    objektId?: string;
    vorgangId?: string;
    payload?: Record<string, unknown>;
  },
): Promise<VerwalterEvent> {
  const id = randomUUID().slice(0, 12);
  const pool = getPool();
  await pool.query(
    `INSERT INTO verwalter_events (id, userId, objektId, vorgangId, typ, payloadJson, status)
     VALUES (?, ?, ?, ?, ?, ?, 'neu')`,
    [
      id,
      userId,
      input.objektId ?? null,
      input.vorgangId ?? null,
      input.typ,
      input.payload ? JSON.stringify(input.payload) : null,
    ],
  );
  const [rows] = await pool.query(
    "SELECT * FROM verwalter_events WHERE id = ? AND userId = ? LIMIT 1",
    [id, userId],
  );
  const row = (rows as Record<string, unknown>[])[0];
  if (!row) throw new Error("Event konnte nicht gespeichert werden");
  return rowToEvent(row);
}

export async function listVerwalterEvents(
  userId: number,
  opts?: { status?: VerwalterEventStatus; limit?: number },
): Promise<VerwalterEvent[]> {
  const pool = getPool();
  const limit = Math.min(Math.max(opts?.limit ?? 50, 1), 200);
  const params: unknown[] = [userId];
  let sql = "SELECT * FROM verwalter_events WHERE userId = ?";
  if (opts?.status) {
    sql += " AND status = ?";
    params.push(opts.status);
  }
  sql += " ORDER BY createdAt DESC LIMIT ?";
  params.push(limit);
  const [rows] = await pool.query(sql, params);
  return (rows as Record<string, unknown>[]).map(rowToEvent);
}

export async function countVerwalterEvents(
  userId: number,
  status?: VerwalterEventStatus,
): Promise<number> {
  const pool = getPool();
  const params: unknown[] = [userId];
  let sql = "SELECT COUNT(*) AS c FROM verwalter_events WHERE userId = ?";
  if (status) {
    sql += " AND status = ?";
    params.push(status);
  }
  const [rows] = await pool.query(sql, params);
  return Number((rows as { c: number }[])[0]?.c ?? 0);
}

export async function createVerwalterFreigabe(
  userId: number,
  input: {
    kind: VerwalterFreigabeKind;
    titel: string;
    payload: Record<string, unknown>;
    objektId?: string;
    vorgangId?: string;
  },
): Promise<VerwalterFreigabe> {
  const id = randomUUID().slice(0, 12);
  const pool = getPool();
  await pool.query(
    `INSERT INTO verwalter_freigaben (id, userId, objektId, vorgangId, kind, titel, payloadJson, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'ausstehend')`,
    [
      id,
      userId,
      input.objektId ?? null,
      input.vorgangId ?? null,
      input.kind,
      input.titel,
      JSON.stringify(input.payload),
    ],
  );
  const [rows] = await pool.query(
    "SELECT * FROM verwalter_freigaben WHERE id = ? AND userId = ? LIMIT 1",
    [id, userId],
  );
  const row = (rows as Record<string, unknown>[])[0];
  if (!row) throw new Error("Freigabe konnte nicht gespeichert werden");
  return rowToFreigabe(row);
}

export async function listVerwalterFreigaben(
  userId: number,
  opts?: { status?: VerwalterFreigabeStatus; limit?: number },
): Promise<VerwalterFreigabe[]> {
  const pool = getPool();
  const limit = Math.min(Math.max(opts?.limit ?? 50, 1), 200);
  const params: unknown[] = [userId];
  let sql = "SELECT * FROM verwalter_freigaben WHERE userId = ?";
  if (opts?.status) {
    sql += " AND status = ?";
    params.push(opts.status);
  }
  sql += " ORDER BY createdAt DESC LIMIT ?";
  params.push(limit);
  const [rows] = await pool.query(sql, params);
  return (rows as Record<string, unknown>[]).map(rowToFreigabe);
}

export async function countVerwalterFreigaben(
  userId: number,
  status?: VerwalterFreigabeStatus,
): Promise<number> {
  const pool = getPool();
  const params: unknown[] = [userId];
  let sql = "SELECT COUNT(*) AS c FROM verwalter_freigaben WHERE userId = ?";
  if (status) {
    sql += " AND status = ?";
    params.push(status);
  }
  const [rows] = await pool.query(sql, params);
  return Number((rows as { c: number }[])[0]?.c ?? 0);
}

export async function updateVerwalterFreigabeStatus(
  userId: number,
  id: string,
  status: VerwalterFreigabeStatus,
): Promise<VerwalterFreigabe | null> {
  const pool = getPool();
  const [result] = await pool.query(
    "UPDATE verwalter_freigaben SET status = ? WHERE id = ? AND userId = ?",
    [status, id, userId],
  );
  const affected = (result as { affectedRows?: number }).affectedRows ?? 0;
  if (!affected) return null;
  const [rows] = await pool.query(
    "SELECT * FROM verwalter_freigaben WHERE id = ? AND userId = ? LIMIT 1",
    [id, userId],
  );
  const row = (rows as Record<string, unknown>[])[0];
  return row ? rowToFreigabe(row) : null;
}

export async function deleteVerwalterAutomationData(userId: number): Promise<void> {
  const pool = getPool();
  await pool.query("DELETE FROM verwalter_freigaben WHERE userId = ?", [userId]).catch(() => {});
  await pool.query("DELETE FROM verwalter_events WHERE userId = ?", [userId]).catch(() => {});
}
