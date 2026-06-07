import { readdirSync } from "node:fs";
import { join } from "node:path";

export const MIGRATIONS_DIR = "drizzle/migrations";

export function listMigrationFiles(cwd = process.cwd()): string[] {
  const dir = join(cwd, MIGRATIONS_DIR);
  return readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();
}

export type MigrationStatus = {
  total: number;
  applied: number;
  pending: number;
  lastApplied: string | null;
  pendingFiles: string[];
};

export function buildMigrationStatus(
  files: string[],
  appliedSet: Set<string>,
): MigrationStatus {
  const pendingFiles = files.filter((f) => !appliedSet.has(f));
  const appliedFiles = files.filter((f) => appliedSet.has(f));
  return {
    total: files.length,
    applied: appliedFiles.length,
    pending: pendingFiles.length,
    lastApplied: appliedFiles.at(-1) ?? null,
    pendingFiles,
  };
}
