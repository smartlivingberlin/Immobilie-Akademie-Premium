import fs from "node:fs";
import path from "node:path";

// ── Modul 1 ──────────────────────────────────────────────────────────────────
import { contentDataModule1Maximal as m1 } from "../client/src/pages/modules/Module1Content_Maximal";

// ── Modul 2 ──────────────────────────────────────────────────────────────────
import { contentDataPart1Maximal } from "../client/src/pages/modules/Module2ContentPart1_Maximal";
import { contentDataPart2Maximal } from "../client/src/pages/modules/Module2ContentPart2_Maximal";
import { contentDataPart3Maximal } from "../client/src/pages/modules/Module2ContentPart3_Maximal";

// ── Modul 3 ──────────────────────────────────────────────────────────────────
import { contentDataModule3Maximal as m3p1 } from "../client/src/pages/modules/Module3Content_Maximal";
import { contentDataModule3MaximalMissingDays, module3MissingDays41_42 } from "../client/src/pages/modules/Module3Content_Maximal_MissingDays";
import { contentDataModule3MaximalPart2 } from "../client/src/pages/modules/Module3Content_Maximal_Part2";
import { contentDataModule3MaximalPart2Extended } from "../client/src/pages/modules/Module3Content_Maximal_Part2_Extended";
import { contentDataModule3MaximalPart3 } from "../client/src/pages/modules/Module3Content_Maximal_Part3";
import { contentDataModule3MaximalPart3Extended } from "../client/src/pages/modules/Module3Content_Maximal_Part3_Extended";
import { contentDataModule3MaximalPart4 } from "../client/src/pages/modules/Module3Content_Maximal_Part4";

// ── Modul 4 ──────────────────────────────────────────────────────────────────
import { contentDataModule4Maximalist } from "../client/src/pages/modules/Module4Content_Valuation_Maximalist";
import { contentDataModule4MaximalistPart2 } from "../client/src/pages/modules/Module4Content_Valuation_Maximalist_Part2";
import { contentDataModule4Bonus } from "../client/src/pages/modules/Module4Content_Bonus_HypZert";
import { contentDataModule4BonusPart2 } from "../client/src/pages/modules/Module4Content_Bonus_HypZert_Part2";

const outDir = path.resolve("client/public/data");
fs.mkdirSync(outDir, { recursive: true });

const modules: Record<string, Record<string, unknown>> = {
  module1: { ...m1 },
  module2: { ...contentDataPart1Maximal, ...contentDataPart2Maximal, ...contentDataPart3Maximal },
  module3: { ...m3p1, ...contentDataModule3MaximalMissingDays, ...module3MissingDays41_42, ...contentDataModule3MaximalPart2, ...contentDataModule3MaximalPart2Extended, ...contentDataModule3MaximalPart3, ...contentDataModule3MaximalPart3Extended, ...contentDataModule3MaximalPart4 },
  module4: { ...contentDataModule4Maximalist, ...contentDataModule4MaximalistPart2, ...contentDataModule4Bonus, ...contentDataModule4BonusPart2 },
};

for (const [name, data] of Object.entries(modules)) {
  const outPath = path.join(outDir, `${name}.json`);
  fs.writeFileSync(outPath, JSON.stringify(data));
  const kb = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`✓ ${name}.json — ${Object.keys(data).length} Tage — ${kb} KB`);
}
