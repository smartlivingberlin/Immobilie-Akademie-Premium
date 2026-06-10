import { randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import {
  periodeFromDatum,
  validateBuchungInput,
  type BuchungInput,
  type VerwalterBuchung,
} from "../shared/verwalterBuchungTypes";

const STORE_DIR = join(process.cwd(), "data", "verwalter-buchungen");

function userFile(userId: number): string {
  return join(STORE_DIR, `user-${userId}.json`);
}

function ensureDir(): void {
  if (!existsSync(STORE_DIR)) mkdirSync(STORE_DIR, { recursive: true });
}

function loadAll(userId: number): VerwalterBuchung[] {
  ensureDir();
  const path = userFile(userId);
  if (!existsSync(path)) return [];
  try {
    const data = JSON.parse(readFileSync(path, "utf8")) as VerwalterBuchung[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveAll(userId: number, buchungen: VerwalterBuchung[]): void {
  ensureDir();
  writeFileSync(userFile(userId), JSON.stringify(buchungen, null, 0), "utf8");
}

export function listBuchungen(
  userId: number,
  opts?: { objektId?: string; periode?: string },
): VerwalterBuchung[] {
  let list = loadAll(userId);
  if (opts?.objektId) list = list.filter((b) => b.objektId === opts.objektId);
  if (opts?.periode) list = list.filter((b) => b.periode === opts.periode);
  return list.sort((a, b) => b.datum.localeCompare(a.datum) || b.createdAt.localeCompare(a.createdAt));
}

export function getBuchung(userId: number, id: string): VerwalterBuchung | null {
  return loadAll(userId).find((b) => b.id === id) ?? null;
}

export function createBuchung(
  userId: number,
  input: BuchungInput & { objektName: string; einheitNr?: string },
): VerwalterBuchung {
  const periode = input.periode || periodeFromDatum(input.datum);
  const err = validateBuchungInput({ ...input, periode });
  if (err) throw new Error(err);

  const now = new Date().toISOString();
  const b: VerwalterBuchung = {
    id: randomUUID().slice(0, 12),
    objektId: input.objektId,
    objektName: input.objektName,
    datum: input.datum,
    betrag: Math.round(input.betrag * 100) / 100,
    sollKonto: input.sollKonto.trim(),
    habenKonto: input.habenKonto.trim(),
    buchungstext: input.buchungstext.trim(),
    belegNr: input.belegNr?.trim() || undefined,
    einheitId: input.einheitId || undefined,
    einheitNr: input.einheitNr,
    periode,
    createdAt: now,
    updatedAt: now,
  };
  const all = loadAll(userId);
  all.push(b);
  saveAll(userId, all);
  return b;
}

export function updateBuchung(
  userId: number,
  id: string,
  patch: Partial<BuchungInput>,
): VerwalterBuchung | null {
  const all = loadAll(userId);
  const idx = all.findIndex((b) => b.id === id);
  if (idx < 0) return null;

  const current = all[idx];
  const merged: BuchungInput = {
    objektId: current.objektId,
    datum: patch.datum ?? current.datum,
    betrag: patch.betrag ?? current.betrag,
    sollKonto: patch.sollKonto ?? current.sollKonto,
    habenKonto: patch.habenKonto ?? current.habenKonto,
    buchungstext: patch.buchungstext ?? current.buchungstext,
    belegNr: patch.belegNr ?? current.belegNr,
    einheitId: patch.einheitId ?? current.einheitId,
    periode: patch.periode ?? periodeFromDatum(patch.datum ?? current.datum),
  };
  const err = validateBuchungInput(merged);
  if (err) throw new Error(err);

  all[idx] = {
    ...current,
    ...merged,
    periode: merged.periode!,
    updatedAt: new Date().toISOString(),
  };
  saveAll(userId, all);
  return all[idx];
}

export function deleteBuchung(userId: number, id: string): boolean {
  const all = loadAll(userId);
  const next = all.filter((b) => b.id !== id);
  if (next.length === all.length) return false;
  saveAll(userId, next);
  return true;
}

export function deleteBuchungenByObjekt(userId: number, objektId: string): number {
  const all = loadAll(userId);
  const next = all.filter((b) => b.objektId !== objektId);
  const removed = all.length - next.length;
  if (removed > 0) saveAll(userId, next);
  return removed;
}
