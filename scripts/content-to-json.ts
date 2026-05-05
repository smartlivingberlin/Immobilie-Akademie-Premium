import { contentDataModule5_34i_Part1 } from "../client/src/pages/modules/Module5Content_34i_Part1";
import { contentDataModule5_34i_Part2 } from "../client/src/pages/modules/Module5Content_34i_Part2";
import { contentDataModule5_34i_Part3 } from "../client/src/pages/modules/Module5Content_34i_Part3";
import { contentDataModule5_34i_Part4 } from "../client/src/pages/modules/Module5Content_34i_Part4";
import { contentDataModule5_34i_Part5 } from "../client/src/pages/modules/Module5Content_34i_Part5";
import { contentDataModule5_34i_Part6 } from "../client/src/pages/modules/Module5Content_34i_Part6";
import { contentDataModule5_34i_Part7_Final } from "../client/src/pages/modules/Module5Content_34i_Part7_Final";
import fs from "node:fs";
import path from "node:path";

const merged = {
  ...contentDataModule5_34i_Part1,
  ...contentDataModule5_34i_Part2,
  ...contentDataModule5_34i_Part3,
  ...contentDataModule5_34i_Part4,
  ...contentDataModule5_34i_Part5,
  ...contentDataModule5_34i_Part6,
  ...contentDataModule5_34i_Part7_Final,
};

const outDir = path.resolve("client/public/data");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "module5.json"), JSON.stringify(merged));
console.log(`✓ module5.json — ${Object.keys(merged).length} Tage`);
