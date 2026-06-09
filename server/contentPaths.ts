import { existsSync } from "fs";
import { join, resolve } from "path";

/** Wissensdatenbank: Dev (server/knowledge) und Docker (knowledge neben dist). */
export function resolveKnowledgeDir(): string {
  const candidates = [
    join(process.cwd(), "server", "knowledge"),
    join(process.cwd(), "knowledge"),
  ];
  for (const dir of candidates) {
    if (existsSync(dir)) return dir;
  }
  return candidates[0];
}

export function resolveModuleContentPath(relPath: string): string {
  return resolve(process.cwd(), relPath);
}

export function moduleContentFileExists(relPath: string): boolean {
  return existsSync(resolveModuleContentPath(relPath));
}
