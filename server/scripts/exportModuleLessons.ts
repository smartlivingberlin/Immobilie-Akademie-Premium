/**
 * Exportiert alle Modul-Lerntage nach dist/data/ — zur Laufzeit in Docker/Railway,
 * wo client/src/pages/modules/*.ts nicht vorhanden sind.
 */
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { parseModuleDayLessons } from "../moduleDayExtractor";
import { getExpectedDayCount, validateModuleContentFiles } from "../moduleContentRegistry";

const outDir = join(process.cwd(), "dist", "data");
mkdirSync(outDir, { recursive: true });

let total = 0;
for (let moduleId = 1; moduleId <= 5; moduleId++) {
  const validation = validateModuleContentFiles(moduleId);
  if (!validation.ok) {
    console.warn(`[exportModuleLessons] M${moduleId}: fehlende Dateien: ${validation.missing.join(", ")}`);
  }
  const lessons = parseModuleDayLessons(moduleId);
  const expected = getExpectedDayCount(moduleId);
  const outPath = join(outDir, `module-lessons-${moduleId}.json`);
  writeFileSync(outPath, JSON.stringify(lessons));
  total += lessons.length;
  const status = lessons.length >= expected ? "OK" : "WARN";
  console.log(`[exportModuleLessons] M${moduleId}: ${lessons.length}/${expected} Lerntage [${status}] → ${outPath}`);
}

if (total === 0) {
  console.error("[exportModuleLessons] FEHLER: 0 Lerntage exportiert");
  process.exit(1);
}
