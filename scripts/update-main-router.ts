import fs from "node:fs";

let src = fs.readFileSync("server/routers.ts", "utf-8");

// Neue Imports am Anfang einfügen (nach bestehenden Imports)
const newImports = `import { authRouter } from "./routers/auth";
import { whitelabelRouter } from "./routers/whitelabel";
import { aiAssistantRouter } from "./routers/aiAssistant";
import { modulesRouter } from "./routers/modules";
import { adminUsersRouter } from "./routers/adminUsers";
import { accountRouter } from "./routers/account";
import { progressRouter } from "./routers/progress";
import { adminCodesRouter } from "./routers/adminCodes";
import { presentationCodeRouter } from "./routers/presentationCode";
import { adminQuestionsRouter } from "./routers/adminQuestions";`;

// Nach letztem import einfügen
const lastImport = src.lastIndexOf("\nimport ");
const insertAt = src.indexOf("\n", lastImport + 1) + 1;
src = src.slice(0, insertAt) + newImports + "\n" + src.slice(insertAt);

// Inline-Router durch Referenzen ersetzen (Zeilen 72-976 des appRouter)
// Alten appRouter-Body ersetzen
src = src.replace(
  /export const appRouter = router\(\{[\s\S]*?\}\);\n\nexport type AppRouter/,
  `export const appRouter = router({
  system: systemRouter,
  videos: videoRouter,
  exam: examRouter,
  openQuestions: openQuestionsRouter,
  pdf: pdfRouter,
  certificate: certificateRouter,
  quiz: quizRouter,
  azav: azavRouter,
  auth: authRouter,
  whitelabel: whitelabelRouter,
  aiAssistant: aiAssistantRouter,
  modules: modulesRouter,
  adminUsers: adminUsersRouter,
  account: accountRouter,
  progress: progressRouter,
  adminCodes: adminCodesRouter,
  presentationCode: presentationCodeRouter,
  adminQuestions: adminQuestionsRouter,
});

export type AppRouter`
);

fs.writeFileSync("server/routers.ts", src);
const lines = src.split("\n").length;
console.log(`✓ routers.ts — ${lines} Zeilen (war 978)`);
