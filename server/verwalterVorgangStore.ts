import { randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import {
  isVorgangOverdue,
  type VerwalterVorgang,
  type VorgangStatus,
  type VorgangTyp,
} from "../shared/verwalterVorgangTypes";

const STORE_DIR = join(process.cwd(), "data", "verwalter-vorgaenge");

function userFile(userId: number): string {
  return join(STORE_DIR, `user-${userId}.json`);
}

function ensureDir(): void {
  if (!existsSync(STORE_DIR)) mkdirSync(STORE_DIR, { recursive: true });
}

function loadAll(userId: number): VerwalterVorgang[] {
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

function saveAll(userId: number, vorgaenge: VerwalterVorgang[]): void {
  ensureDir();
  writeFileSync(userFile(userId), JSON.stringify(vorgaenge, null, 0), "utf8");
}

export function listVorgaenge(userId: number, objektId?: string): VerwalterVorgang[] {
  let list = loadAll(userId);
  if (objektId) list = list.filter((v) => v.objektId === objektId);
  return list.sort((a, b) => {
    const da = a.faelligAm || a.updatedAt;
    const db = b.faelligAm || b.updatedAt;
    return da.localeCompare(db);
  });
}

export function getVorgang(userId: number, id: string): VerwalterVorgang | null {
  return loadAll(userId).find((v) => v.id === id) ?? null;
}

export function createVorgang(
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
): VerwalterVorgang {
  const now = new Date().toISOString();
  const v: VerwalterVorgang = {
    id: randomUUID().slice(0, 12),
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
  const all = loadAll(userId);
  all.push(v);
  saveAll(userId, all);
  return v;
}

export function updateVorgang(
  userId: number,
  id: string,
  patch: Partial<Omit<VerwalterVorgang, "id" | "createdAt">>,
): VerwalterVorgang | null {
  const all = loadAll(userId);
  const idx = all.findIndex((v) => v.id === id);
  if (idx < 0) return null;
  all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
  saveAll(userId, all);
  return all[idx];
}

export function deleteVorgang(userId: number, id: string): boolean {
  const all = loadAll(userId);
  const next = all.filter((v) => v.id !== id);
  if (next.length === all.length) return false;
  saveAll(userId, next);
  return true;
}

export function deleteVorgaengeByObjekt(userId: number, objektId: string): number {
  const all = loadAll(userId);
  const next = all.filter((v) => v.objektId !== objektId);
  const removed = all.length - next.length;
  if (removed > 0) saveAll(userId, next);
  return removed;
}

export function countOpenVorgaenge(userId: number): number {
  return loadAll(userId).filter((v) => v.status !== "erledigt").length;
}

export function countOverdueVorgaenge(userId: number): number {
  return loadAll(userId).filter((v) => isVorgangOverdue(v)).length;
}
