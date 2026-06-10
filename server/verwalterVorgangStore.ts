import { randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import {
  isVorgangOverdue,
  type VerwalterVorgang,
  type VorgangStatus,
  type VorgangTyp,
} from "../shared/verwalterVorgangTypes";
import { importVerwalterFilesForUser } from "./verwalterFileImport";
import { verwalterUsesFileStore } from "./verwalterStoreMode";

const STORE_DIR = join(process.cwd(), "data", "verwalter-vorgaenge");

function userFile(userId: number): string {
  return join(STORE_DIR, `user-${userId}.json`);
}

function ensureDir(): void {
  if (!existsSync(STORE_DIR)) mkdirSync(STORE_DIR, { recursive: true });
}

function loadAllFile(userId: number): VerwalterVorgang[] {
  ensureDir();
  const path = userFile(userId);
  if (!existsSync(path)) return [];
  try {
    const data = JSON.parse(readFileSync(path, "utf8")) as VerwalterVorgang[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveAllFile(userId: number, vorgaenge: VerwalterVorgang[]): void {
  ensureDir();
  writeFileSync(userFile(userId), JSON.stringify(vorgaenge, null, 0), "utf8");
}

async function ensureMysqlReady(userId: number): Promise<void> {
  await importVerwalterFilesForUser(userId);
}

export async function listVorgaenge(userId: number, objektId?: string): Promise<VerwalterVorgang[]> {
  if (verwalterUsesFileStore()) {
    let list = loadAllFile(userId);
    if (objektId) list = list.filter((v) => v.objektId === objektId);
    return list.sort((a, b) => {
      const da = a.faelligAm || a.updatedAt;
      const db = b.faelligAm || b.updatedAt;
      return da.localeCompare(db);
    });
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.listVorgaengeMysql(userId, objektId);
}

export async function getVorgang(userId: number, id: string): Promise<VerwalterVorgang | null> {
  if (verwalterUsesFileStore()) {
    return loadAllFile(userId).find((v) => v.id === id) ?? null;
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.getVorgangMysql(userId, id);
}

export async function createVorgang(
  userId: number,
  input: {
    objektId: string;
    objektName: string;
    typ: VorgangTyp;
    titel: string;
    beschreibung?: string;
    status?: VorgangStatus;
    faelligAm?: string;
    relatedVorlageSlug?: string;
  },
): Promise<VerwalterVorgang> {
  const id = randomUUID().slice(0, 12);
  if (verwalterUsesFileStore()) {
    const now = new Date().toISOString();
    const v: VerwalterVorgang = {
      id,
      objektId: input.objektId,
      objektName: input.objektName,
      typ: input.typ,
      titel: input.titel.trim(),
      beschreibung: input.beschreibung?.trim(),
      status: input.status ?? "offen",
      faelligAm: input.faelligAm,
      relatedVorlageSlug: input.relatedVorlageSlug,
      createdAt: now,
      updatedAt: now,
    };
    const all = loadAllFile(userId);
    all.push(v);
    saveAllFile(userId, all);
    return v;
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.createVorgangMysql(userId, input, id);
}

export async function updateVorgang(
  userId: number,
  id: string,
  patch: Partial<Omit<VerwalterVorgang, "id" | "createdAt">>,
): Promise<VerwalterVorgang | null> {
  if (verwalterUsesFileStore()) {
    const all = loadAllFile(userId);
    const idx = all.findIndex((v) => v.id === id);
    if (idx < 0) return null;
    all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
    saveAllFile(userId, all);
    return all[idx];
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.updateVorgangMysql(userId, id, patch);
}

export async function deleteVorgang(userId: number, id: string): Promise<boolean> {
  if (verwalterUsesFileStore()) {
    const all = loadAllFile(userId);
    const next = all.filter((v) => v.id !== id);
    if (next.length === all.length) return false;
    saveAllFile(userId, next);
    return true;
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.deleteVorgangMysql(userId, id);
}

export async function deleteVorgaengeByObjekt(userId: number, objektId: string): Promise<number> {
  if (verwalterUsesFileStore()) {
    const all = loadAllFile(userId);
    const next = all.filter((v) => v.objektId !== objektId);
    const removed = all.length - next.length;
    if (removed > 0) saveAllFile(userId, next);
    return removed;
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.deleteVorgaengeByObjektMysql(userId, objektId);
}

export async function countOpenVorgaenge(userId: number): Promise<number> {
  if (verwalterUsesFileStore()) {
    return loadAllFile(userId).filter((v) => v.status !== "erledigt").length;
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.countOpenVorgaengeMysql(userId);
}

export async function countOverdueVorgaenge(userId: number): Promise<number> {
  if (verwalterUsesFileStore()) {
    return loadAllFile(userId).filter((v) => isVorgangOverdue(v)).length;
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.countOverdueVorgaengeMysql(userId);
}
