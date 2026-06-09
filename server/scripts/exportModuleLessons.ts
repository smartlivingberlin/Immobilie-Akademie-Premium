/**
 * Exportiert alle Modul-Lerntage nach dist/data/ — zur Laufzeit in Docker/Railway,
 * wo client/src/pages/modules/*.ts nicht vorhanden sind.
 */
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { parseModuleDayLessons } from "../moduleDayExtractor";

const outDir = join(process.cwd(), "dist", "data");
mkdirSync(outDir, { recursive: true });

let total = 0;
for (let moduleId = 1; moduleId <= 5; moduleId++) {
  const lessons = parseModuleDayLessons(moduleId);
  const outPath = join(outDir, `module-lessons-${moduleId}.json`);
  writeFileSync(outPath, JSON.stringify(lessons));
  total += lessons.length;
  console.log(`[exportModuleLessons] M${moduleId}: ${lessons.length} Lerntage → ${outPath}`);
}

if (total === 0) {
  console.error("[exportModuleLessons] FEHLER: 0 Lerntage exportiert");
  process.exit(1);
}
