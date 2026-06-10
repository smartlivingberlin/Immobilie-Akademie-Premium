/**
 * Single Source of Truth — Modul-Lerninhalte (Dateipfade, erwartete Tage).
 * Alle Generator-, Export- und Agent-Pfade sollen hierher zeigen.
 */
import { createHash } from "crypto";
import { existsSync, readFileSync, statSync } from "fs";
import { resolveModuleContentPath } from "./contentPaths";

export type ModuleContentMeta = {
  id: number;
  name: string;
  expectedDays: number;
  contentFiles: string[];
};

/** Kanonische Dateilisten — vereinheitlicht aus PortalAgent + vollständigster Extraktor-Stand */
export const MODULE_CONTENT_REGISTRY: Record<number, ModuleContentMeta> = {
  1: {
    id: 1,
    name: "Einführung in die Immobilienwirtschaft",
    expectedDays: 20,
    contentFiles: ["client/src/pages/modules/Module1Content_Maximal.ts"],
  },
  2: {
    id: 2,
    name: "Immobilienmakler §34c GewO",
    expectedDays: 60,
    contentFiles: [
      "client/src/pages/modules/Module2ContentPart1_Maximal.ts",
      "client/src/pages/modules/Module2ContentPart2_Maximal.ts",
      "client/src/pages/modules/Module2ContentPart3_Maximal.ts",
    ],
  },
  3: {
    id: 3,
    name: "WEG-Verwaltung & Mietrecht",
    expectedDays: 80,
    contentFiles: [
      "client/src/pages/modules/Module3Content_Maximal.ts",
      "client/src/pages/modules/Module3Content_Maximal_Part2.ts",
      "client/src/pages/modules/Module3Content_Maximal_Part2_Extended.ts",
      "client/src/pages/modules/Module3Content_Maximal_Part3.ts",
      "client/src/pages/modules/Module3Content_Maximal_Part3_Extended.ts",
      "client/src/pages/modules/Module3Content_Maximal_Part4.ts",
      "client/src/pages/modules/Module3Content_Maximal_MissingDays.ts",
    ],
  },
  4: {
    id: 4,
    name: "Gutachter & Sachverständiger",
    expectedDays: 40,
    contentFiles: [
      "client/src/pages/modules/Module4Content_Valuation_Maximalist.ts",
      "client/src/pages/modules/Module4Content_Valuation_Maximalist_Part2.ts",
      "client/src/pages/modules/Module4Content_Bonus_HypZert.ts",
      "client/src/pages/modules/Module4Content_Bonus_HypZert_Part2.ts",
    ],
  },
  5: {
    id: 5,
    name: "Darlehensvermittler §34i GewO",
    expectedDays: 40,
    contentFiles: [
      "client/src/pages/modules/Module5Content_34i_Part1.ts",
      "client/src/pages/modules/Module5Content_34i_Part2.ts",
      "client/src/pages/modules/Module5Content_34i_Part3.ts",
      "client/src/pages/modules/Module5Content_34i_Part4.ts",
      "client/src/pages/modules/Module5Content_34i_Part5.ts",
      "client/src/pages/modules/Module5Content_34i_Part6.ts",
      "client/src/pages/modules/Module5Content_34i_Part7_Final.ts",
    ],
  },
};

/** Abwärtskompatibler Export */
export const MODULE_CONTENT_FILES: Record<number, string[]> = Object.fromEntries(
  Object.entries(MODULE_CONTENT_REGISTRY).map(([id, meta]) => [Number(id), meta.contentFiles]),
);

export function getModuleContentFiles(moduleId: number): string[] {
  return MODULE_CONTENT_REGISTRY[moduleId]?.contentFiles ?? [];
}

export function getExpectedDayCount(moduleId: number): number {
  return MODULE_CONTENT_REGISTRY[moduleId]?.expectedDays ?? 0;
}

/** SHA256 über vorhandene Quelldateien — für Cache-Invalidierung (PR-B). */
export function getModuleContentHash(moduleId: number): string {
  const files = getModuleContentFiles(moduleId);
  const h = createHash("sha256");
  for (const rel of files) {
    const abs = resolveModuleContentPath(rel);
    h.update(rel);
    if (existsSync(abs)) {
      const st = statSync(abs);
      h.update(String(st.size));
      h.update(String(st.mtimeMs));
    } else {
      h.update("missing");
    }
  }
  return h.digest("hex").slice(0, 16);
}

export function validateModuleContentFiles(moduleId: number): {
  ok: boolean;
  missing: string[];
  expectedDays: number;
} {
  const files = getModuleContentFiles(moduleId);
  const missing = files.filter((f) => !existsSync(resolveModuleContentPath(f)));
  return {
    ok: missing.length === 0,
    missing,
    expectedDays: getExpectedDayCount(moduleId),
  };
}
