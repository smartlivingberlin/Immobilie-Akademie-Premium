import fs from "node:fs";
import path from "node:path";

const src = fs.readFileSync("server/routers.ts", "utf-8");
const lines = src.split("\n");

const routers = [
  { name: "auth", exportName: "authRouter", start: 71, end: 107 },
  { name: "whitelabel", exportName: "whitelabelRouter", start: 108, end: 291 },
  { name: "aiAssistant", exportName: "aiAssistantRouter", start: 292, end: 532 },
  { name: "modules", exportName: "modulesRouter", start: 533, end: 657 },
  { name: "adminUsers", exportName: "adminUsersRouter", start: 658, end: 702 },
  { name: "account", exportName: "accountRouter", start: 703, end: 777 },
  { name: "progress", exportName: "progressRouter", start: 778, end: 832 },
  { name: "adminCodes", exportName: "adminCodesRouter", start: 833, end: 873 },
  { name: "presentationCode", exportName: "presentationCodeRouter", start: 874, end: 918 },
  { name: "adminQuestions", exportName: "adminQuestionsRouter", start: 919, end: 976 },
];

for (const r of routers) {
  const bodyLines = lines.slice(r.start, r.end);
  // Erste Zeile: "  name: router({" → "router({"
  bodyLines[0] = bodyLines[0].replace(/^\s*\w+:\s*/, "");
  const body = bodyLines.join("\n");

  const content = `import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { adminProcedure } from "../_core/adminProcedure";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getDb } from "../db";
import { eq } from "drizzle-orm";

export const ${r.exportName} = ${body}
`;
  const outPath = path.join("server/routers", `${r.name}.ts`);
  fs.writeFileSync(outPath, content);
  console.log(`✓ ${r.name}.ts — erste Zeile: ${bodyLines[0].trim().substring(0, 50)}`);
}
