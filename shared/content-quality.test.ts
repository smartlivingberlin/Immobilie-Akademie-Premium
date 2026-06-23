import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

function hasText(x: unknown, minLen = 80): boolean {
  const s = String(x ?? "").trim();
  return s.length >= minLen;
}

interface DayData {
  theory?: string;
  extendedTheory?: string;
  law?: string[];
  practice?: string;
  caseStudy?: string;
  solution?: string;
  tasks?: Array<{ question?: string; solution?: string }>;
}

describe("Content Quality Audit", () => {
  const dataDir = path.join(process.cwd(), "client/public/data");

  for (let m = 1; m <= 5; m++) {
    const filePath = path.join(dataDir, `module${m}.json`);

    it(`M${m}: Datei existiert`, () => {
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it(`M${m}: Kein STUB (jeder Tag hat Mindestinhalt)`, () => {
      const data: Record<string, DayData> = JSON.parse(
        fs.readFileSync(filePath, "utf-8")
      );
      const stubs: string[] = [];
      for (const [tag, t] of Object.entries(data)) {
        const hasTheory =
          hasText(t.theory, 40) || hasText(t.extendedTheory, 100);
        const hasTasks = (t.tasks ?? []).length > 0;
        const hasAnySolution =
          hasText(t.solution, 40) ||
          (t.tasks ?? []).some((x) => hasText(x.solution, 10));
        if (!hasTheory && !hasTasks && !hasAnySolution) {
          stubs.push(tag);
        }
      }
      if (stubs.length > 0) {
        console.error(`M${m} STUBS: ${stubs.join(", ")}`);
      }
      expect(stubs).toHaveLength(0);
    });

    it(`M${m}: Alle Tasks haben Lösungen`, () => {
      const data: Record<string, DayData> = JSON.parse(
        fs.readFileSync(filePath, "utf-8")
      );
      const missing: string[] = [];
      for (const [tag, t] of Object.entries(data)) {
        for (let i = 0; i < (t.tasks ?? []).length; i++) {
          if (!hasText(t.tasks![i].solution, 10)) {
            missing.push(`${tag}.tasks[${i}]`);
          }
        }
      }
      if (missing.length > 0) {
        console.warn(`M${m} fehlende Task-Lösungen: ${missing.join(", ")}`);
      }
      expect(missing).toHaveLength(0);
    });

    it(`M${m}: SOFT REPORT (kein Fail)`, () => {
      const data: Record<string, DayData> = JSON.parse(
        fs.readFileSync(filePath, "utf-8")
      );
      let premium = 0, pruef = 0, noCase = 0, noTopSol = 0;
      for (const t of Object.values(data)) {
        const hasCase = hasText(t.caseStudy, 80);
        const hasTopSol = hasText(t.solution, 80);
        if (hasCase && hasTopSol) premium++;
        else pruef++;
        if (!hasCase) noCase++;
        if (!hasTopSol) noTopSol++;
      }
      const total = Object.keys(data).length;
      console.log(
        `M${m}: PREMIUM=${premium}/${total} ` +
        `PRÜF=${pruef}/${total} ` +
        `ohneCase=${noCase} ohneTopSol=${noTopSol}`
      );
      expect(true).toBe(true); // Soft report, kein Fail
    });
  }
});
