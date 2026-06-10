import { randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { VerwalterObjekt, VerwalterEinheit } from "../shared/verwalterObjektTypes";

const STORE_DIR = join(process.cwd(), "data", "verwalter-objekte");

function userFile(userId: number): string {
  return join(STORE_DIR, `user-${userId}.json`);
}

function ensureDir(): void {
  if (!existsSync(STORE_DIR)) mkdirSync(STORE_DIR, { recursive: true });
}

function loadAll(userId: number): VerwalterObjekt[] {
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

function saveAll(userId: number, objekte: VerwalterObjekt[]): void {
  ensureDir();
  writeFileSync(userFile(userId), JSON.stringify(objekte, null, 0), "utf8");
}

export function listObjekte(userId: number): VerwalterObjekt[] {
  return loadAll(userId).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getObjekt(userId: number, id: string): VerwalterObjekt | null {
  return loadAll(userId).find((o) => o.id === id) ?? null;
}

export function createObjekt(
  userId: number,
  input: Omit<VerwalterObjekt, "id" | "createdAt" | "updatedAt" | "einheiten"> & {
    einheiten?: VerwalterEinheit[];
  },
): VerwalterObjekt {
  const now = new Date().toISOString();
  const obj: VerwalterObjekt = {
    ...input,
    id: randomUUID().slice(0, 12),
    einheiten: input.einheiten ?? [],
    createdAt: now,
    updatedAt: now,
  };
  const all = loadAll(userId);
  all.push(obj);
  saveAll(userId, all);
  return obj;
}

export function updateObjekt(
  userId: number,
  id: string,
  patch: Partial<Omit<VerwalterObjekt, "id" | "createdAt">>,
): VerwalterObjekt | null {
  const all = loadAll(userId);
  const idx = all.findIndex((o) => o.id === id);
  if (idx < 0) return null;
  all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
  saveAll(userId, all);
  return all[idx];
}

export function deleteObjekt(userId: number, id: string): boolean {
  const all = loadAll(userId);
  const next = all.filter((o) => o.id !== id);
  if (next.length === all.length) return false;
  saveAll(userId, next);
  return true;
}
