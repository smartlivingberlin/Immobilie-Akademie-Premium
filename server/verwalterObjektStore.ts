import { randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { VerwalterObjekt, VerwalterEinheit } from "../shared/verwalterObjektTypes";
import { importVerwalterFilesForUser } from "./verwalterFileImport";
import { verwalterUsesFileStore } from "./verwalterStoreMode";

const STORE_DIR = join(process.cwd(), "data", "verwalter-objekte");

function userFile(userId: number): string {
  return join(STORE_DIR, `user-${userId}.json`);
}

function ensureDir(): void {
  if (!existsSync(STORE_DIR)) mkdirSync(STORE_DIR, { recursive: true });
}

function loadAllFile(userId: number): VerwalterObjekt[] {
  ensureDir();
  const path = userFile(userId);
  if (!existsSync(path)) return [];
  try {
    const data = JSON.parse(readFileSync(path, "utf8")) as VerwalterObjekt[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveAllFile(userId: number, objekte: VerwalterObjekt[]): void {
  ensureDir();
  writeFileSync(userFile(userId), JSON.stringify(objekte, null, 0), "utf8");
}

async function ensureMysqlReady(userId: number): Promise<void> {
  await importVerwalterFilesForUser(userId);
}

export async function listObjekte(userId: number): Promise<VerwalterObjekt[]> {
  if (verwalterUsesFileStore()) {
    return loadAllFile(userId).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.listObjekteMysql(userId);
}

export async function getObjekt(userId: number, id: string): Promise<VerwalterObjekt | null> {
  if (verwalterUsesFileStore()) {
    return loadAllFile(userId).find((o) => o.id === id) ?? null;
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.getObjektMysql(userId, id);
}

export async function createObjekt(
  userId: number,
  input: Omit<VerwalterObjekt, "id" | "createdAt" | "updatedAt" | "einheiten"> & {
    einheiten?: VerwalterEinheit[];
  },
): Promise<VerwalterObjekt> {
  const id = randomUUID().slice(0, 12);
  if (verwalterUsesFileStore()) {
    const now = new Date().toISOString();
    const obj: VerwalterObjekt = {
      ...input,
      id,
      einheiten: input.einheiten ?? [],
      createdAt: now,
      updatedAt: now,
    };
    const all = loadAllFile(userId);
    all.push(obj);
    saveAllFile(userId, all);
    return obj;
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.createObjektMysql(userId, input, id);
}

export async function updateObjekt(
  userId: number,
  id: string,
  patch: Partial<Omit<VerwalterObjekt, "id" | "createdAt">>,
): Promise<VerwalterObjekt | null> {
  if (verwalterUsesFileStore()) {
    const all = loadAllFile(userId);
    const idx = all.findIndex((o) => o.id === id);
    if (idx < 0) return null;
    all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
    saveAllFile(userId, all);
    return all[idx];
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.updateObjektMysql(userId, id, patch);
}

export async function deleteObjekt(userId: number, id: string): Promise<boolean> {
  if (verwalterUsesFileStore()) {
    const all = loadAllFile(userId);
    const next = all.filter((o) => o.id !== id);
    if (next.length === all.length) return false;
    saveAllFile(userId, next);
    return true;
  }
  await ensureMysqlReady(userId);
  const mysql = await import("./verwalterMysqlBackend");
  return mysql.deleteObjektMysql(userId, id);
}
