import fs from "node:fs";
import path from "node:path";

const src = fs.readFileSync("server/routers.ts", "utf-8");
const lines = src.split("\n");

const HEADER = `import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { adminProcedure } from "./_core/adminProcedure";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getDb } from "./db";
import { eq } from "drizzle-orm";
`;

const routers = [
  { name: "auth", start: 71, end: 107 },
  { name: "whitelabel", start: 108, end: 291 },
  { name: "aiAssistant", start: 292, end: 532 },
  { name: "modules", start: 533, end: 657 },
  { name: "adminUsers", start: 658, end: 702 },
  { name: "account", start: 703, end: 777 },
  { name: "progress", start: 778, end: 832 },
  { name: "adminCodes", start: 833, end: 873 },
  { name: "presentationCode", start: 874, end: 918 },
  { name: "adminQuestions", start: 919, end: 976 },
];

fs.mkdirSync("server/routers", { recursive: true });

for (const r of routers) {
  const body = lines.slice(r.start, r.end).join("\n");
  // Inline-Router-Block extrahieren: "name: router({...})"
  // Wir wrappen den Body als Export
  const exportName = `${r.name}Router`;
  const content = `${HEADER}\nexport const ${exportName} = ${body.replace(/^\s*${r.name}: /, "")}\n`;
  const outPath = path.join("server/routers", `${r.name}.ts`);
  fs.writeFileSync(outPath, content);
  console.log(`✓ ${outPath} (${r.end - r.start} Zeilen)`);
}
