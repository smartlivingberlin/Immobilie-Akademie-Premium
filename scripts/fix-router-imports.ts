import fs from "node:fs";

const BASE_IMPORTS = `import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { adminProcedure } from "../_core/adminProcedure";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { eq } from "drizzle-orm";`;

const routerImports: Record<string, string> = {
  "auth.ts": `${BASE_IMPORTS}
import { getDb } from "../db";
import { getSessionCookieOptions } from "../_core/cookies";
import { COOKIE_NAME } from "../../shared/const";
import { users } from "../../drizzle/schema";`,

  "whitelabel.ts": `${BASE_IMPORTS}
import { getAllWhitelabelConfigs, getWhitelabelConfigById, getWhitelabelConfigBySlug, createWhitelabelConfig, updateWhitelabelConfig, deleteWhitelabelConfig, getWhitelabelConfigForUser, assignUserToTenant, getUsersByTenantId } from "../db";`,

  "aiAssistant.ts": `${BASE_IMPORTS}
import { createChatConversation, addChatMessage, getConversationMessages, getUserConversations, updateConversationTitle, getDb } from "../db";
import { invokeLLM } from "../_core/llm";
import { storagePut } from "../storage";`,

  "modules.ts": `${BASE_IMPORTS}
import { getDb } from "../db";`,

  "adminUsers.ts": `${BASE_IMPORTS}
import { getDb } from "../db";`,

  "account.ts": `${BASE_IMPORTS}
import { getDb } from "../db";`,

  "progress.ts": `${BASE_IMPORTS}
import { getDb } from "../db";`,

  "adminCodes.ts": `${BASE_IMPORTS}
import { getDb } from "../db";`,

  "presentationCode.ts": `${BASE_IMPORTS}
import { getDb } from "../db";`,

  "adminQuestions.ts": `${BASE_IMPORTS}
import { getDb } from "../db";
import { questionBank } from "../../drizzle/schema";`,
};

for (const [file, imports] of Object.entries(routerImports)) {
  const path = `server/routers/${file}`;
  let src = fs.readFileSync(path, "utf-8");
  // Alten HEADER (erste 6 Zeilen) ersetzen
  const lines = src.split("\n");
  const headerEnd = lines.findIndex((l, i) => i > 0 && l.startsWith("export const"));
  const body = lines.slice(headerEnd).join("\n");
  fs.writeFileSync(path, `${imports}\n\n${body}`);
  console.log(`✓ ${file} — ${imports.split("\n").length} Import-Zeilen`);
}
