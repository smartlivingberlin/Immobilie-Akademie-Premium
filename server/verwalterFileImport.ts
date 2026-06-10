import { existsSync, readFileSync, renameSync } from "fs";
import { join } from "path";
import type { VerwalterBuchung } from "../shared/verwalterBuchungTypes";
import type { VerwalterObjekt } from "../shared/verwalterObjektTypes";
import type { VerwalterVorgang } from "../shared/verwalterVorgangTypes";
import { verwalterUsesFileStore } from "./verwalterStoreMode";

const IMPORTED = new Set<number>();

function readJsonFile<T>(path: string): T[] {
  if (!existsSync(path)) return [];
  try {
    const data = JSON.parse(readFileSync(path, "utf8")) as T[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function archiveFile(path: string): void {
  if (!existsSync(path)) return;
  const archived = `${path}.migrated`;
  if (!existsSync(archived)) renameSync(path, archived);
}

/** Einmalig pro User: JSON-File-Store → MySQL (idempotent). */
export async function importVerwalterFilesForUser(userId: number): Promise<void> {
  if (verwalterUsesFileStore() || IMPORTED.has(userId)) return;

  const { countObjekteForUser, insertObjekteFromFile, insertVorgaengeFromFile, insertBuchungenFromFile } =
    await import("./verwalterMysqlBackend");

  if ((await countObjekteForUser(userId)) > 0) {
    IMPORTED.add(userId);
    return;
  }

  const objPath = join(process.cwd(), "data", "verwalter-objekte", `user-${userId}.json`);
  const vorPath = join(process.cwd(), "data", "verwalter-vorgaenge", `user-${userId}.json`);
  const buchPath = join(process.cwd(), "data", "verwalter-buchungen", `user-${userId}.json`);

  const objekte = readJsonFile<VerwalterObjekt>(objPath);
  const vorgaenge = readJsonFile<VerwalterVorgang>(vorPath);
  const buchungen = readJsonFile<VerwalterBuchung>(buchPath);

  if (objekte.length === 0 && vorgaenge.length === 0 && buchungen.length === 0) {
    IMPORTED.add(userId);
    return;
  }

  if (objekte.length > 0) await insertObjekteFromFile(userId, objekte);
  if (vorgaenge.length > 0) await insertVorgaengeFromFile(userId, vorgaenge);
  if (buchungen.length > 0) await insertBuchungenFromFile(userId, buchungen);

  archiveFile(objPath);
  archiveFile(vorPath);
  archiveFile(buchPath);
  IMPORTED.add(userId);
}
