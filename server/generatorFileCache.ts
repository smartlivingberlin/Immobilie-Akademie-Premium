import { createHash } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const CACHE_DIR = join(process.cwd(), "data", "generator-cache");

export type CachedGeneratorResult = {
  success: boolean;
  content: string;
  moduleId: number;
  moduleName?: string;
  format: string;
  daysExtracted?: number;
  daysExpected?: number;
  daysCovered?: number;
  blocksProcessed?: number;
  incompleteBlocks?: number;
  draftFallbacks?: number;
  complete?: boolean;
  pipeline?: string;
  contentHash?: string;
  generatedAt: string;
  fromCache?: boolean;
  pipelined?: boolean;
  chunked?: boolean;
  jobId?: string;
};

function cachePath(moduleId: number, format: string, prefix = "kursbuch-v2", extraKey = ""): string {
  const key = createHash("sha256")
    .update(`${moduleId}:${format}${extraKey}`)
    .digest("hex")
    .slice(0, 16);
  return join(CACHE_DIR, `${prefix}-m${moduleId}-${format}-${key}.json`);
}

export function readKursbuchCache(moduleId: number, format: string): CachedGeneratorResult | null {
  try {
    const path = cachePath(moduleId, format);
    if (!existsSync(path)) return null;
    const data = JSON.parse(readFileSync(path, "utf8")) as CachedGeneratorResult;
    if (!data?.success || !data?.content) return null;
    return { ...data, fromCache: true };
  } catch {
    return null;
  }
}

export function writeKursbuchCache(
  moduleId: number,
  format: string,
  payload: Omit<CachedGeneratorResult, "fromCache">,
): void {
  try {
    if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(cachePath(moduleId, format), JSON.stringify(payload, null, 0), "utf8");
  } catch (e) {
    console.error(JSON.stringify({ level: "warn", msg: "[generatorCache] write failed", error: (e as Error)?.message }));
  }
}

export function readKursbuchChunkedCache(moduleId: number, format: string): CachedGeneratorResult | null {
  try {
    const path = cachePath(moduleId, format, "kursbuch-chunked");
    if (!existsSync(path)) return null;
    const data = JSON.parse(readFileSync(path, "utf8")) as CachedGeneratorResult;
    if (!data?.success || !data?.content) return null;
    return { ...data, fromCache: true };
  } catch {
    return null;
  }
}

export function writeKursbuchChunkedCache(
  moduleId: number,
  format: string,
  payload: Omit<CachedGeneratorResult, "fromCache">,
): void {
  try {
    if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(cachePath(moduleId, format, "kursbuch-chunked"), JSON.stringify(payload, null, 0), "utf8");
  } catch (e) {
    console.error(JSON.stringify({ level: "warn", msg: "[generatorCache] chunked write failed", error: (e as Error)?.message }));
  }
}

export function readKursbuchPipelineCache(
  moduleId: number,
  format: string,
  contentHash: string,
): CachedGeneratorResult | null {
  try {
    const path = cachePath(moduleId, format, "kursbuch-pipeline", `:${contentHash}`);
    if (!existsSync(path)) return null;
    const data = JSON.parse(readFileSync(path, "utf8")) as CachedGeneratorResult;
    if (!data?.success || !data?.content) return null;
    const incomplete = (data.incompleteBlocks ?? 0) > 0;
    const complete = data.complete ?? !incomplete;
    if (!complete) return null;
    return { ...data, complete, fromCache: true };
  } catch {
    return null;
  }
}

export function writeKursbuchPipelineCache(
  moduleId: number,
  format: string,
  contentHash: string,
  payload: Omit<CachedGeneratorResult, "fromCache">,
): void {
  try {
    if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(
      cachePath(moduleId, format, "kursbuch-pipeline", `:${contentHash}`),
      JSON.stringify(payload, null, 0),
      "utf8",
    );
  } catch (e) {
    console.error(JSON.stringify({ level: "warn", msg: "[generatorCache] pipeline write failed", error: (e as Error)?.message }));
  }
}
