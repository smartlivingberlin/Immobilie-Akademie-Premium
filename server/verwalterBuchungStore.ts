import { randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import {
  periodeFromDatum,
  validateBuchungInput,
  type BuchungInput,
  type VerwalterBuchung,
} from "../shared/verwalterBuchungTypes";
import { importVerwalterFilesForUser } from "./verwalterFileImport";
import { verwalterUsesFileStore } from "./verwalterStoreMode";

const STORE_DIR = join(process.cwd(), "data", "verwalter-buchungen");

function userFile(userId: number): string {
  return join(STORE_DIR, `user-${userId}.json`);
}

function ensureDir(): void {
  if (!existsSync(STORE_DIR)) mkdirSync(STORE_DIR, { recursive: true });
}

function loadAllFile(userId: number): VerwalterBuchung[] {
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

function saveAllFile(userId: number, buchungen: VerwalterBuchung[]): void {
  ensureDir();
  writeFileSync(userFile(userId), JSON.stringify(buchungen, null, 0), "utf8");
}

async function ensureMysqlReady(userId: number): Promise<void> {
  await importVerwalterFilesForUser(userId);
}

export async function listBuchungen(
  userId: number,
  opts?: { objektId?: string; periode?: string },
): Promise<VerwalterBuchung[]> {
  if (verwalterUsesFileStore()) {
    let list = loadAllFile(userId);
    if (opts?.objektId) list = list.filter((b) => b.objektId === opts.objektId);
    if (opts?.periode) list = list.filter((b) => b.periode === opts.periode);
    return list.sort((a, b) => b.datum.localeCompare(a.datum) || b.createdAt.localeCompare(a.createdAt));
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.listBuchungenMysql(userId, opts);
}

export async function getBuchung(userId: number, id: string): Promise<VerwalterBuchung | null> {
  if (verwalterUsesFileStore()) {
    return loadAllFile(userId).find((b) => b.id === id) ?? null;
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.getBuchungMysql(userId, id);
}

export async function createBuchung(
  userId: number,
  input: BuchungInput & { objektName: string; einheitNr?: string },
): Promise<VerwalterBuchung> {
  const id = randomUUID().slice(0, 12);
  if (verwalterUsesFileStore()) {
    const periode = input.periode || periodeFromDatum(input.datum);
    const err = validateBuchungInput({ ...input, periode });
    if (err) throw new Error(err);

    const now = new Date().toISOString();
    const b: VerwalterBuchung = {
      id,
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
    const all = loadAllFile(userId);
    all.push(b);
    saveAllFile(userId, all);
    return b;
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.createBuchungMysql(userId, input, id);
}

export async function updateBuchung(
  userId: number,
  id: string,
  patch: Partial<BuchungInput>,
): Promise<VerwalterBuchung | null> {
  if (verwalterUsesFileStore()) {
    const all = loadAllFile(userId);
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
    saveAllFile(userId, all);
    return all[idx];
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.updateBuchungMysql(userId, id, patch);
}

export async function deleteBuchung(userId: number, id: string): Promise<boolean> {
  if (verwalterUsesFileStore()) {
    const all = loadAllFile(userId);
    const next = all.filter((b) => b.id !== id);
    if (next.length === all.length) return false;
    saveAllFile(userId, next);
    return true;
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.deleteBuchungMysql(userId, id);
}

export async function deleteBuchungenByObjekt(userId: number, objektId: string): Promise<number> {
  if (verwalterUsesFileStore()) {
    const all = loadAllFile(userId);
    const next = all.filter((b) => b.objektId !== objektId);
    const removed = all.length - next.length;
    if (removed > 0) saveAllFile(userId, next);
    return removed;
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.deleteBuchungenByObjektMysql(userId, objektId);
}
