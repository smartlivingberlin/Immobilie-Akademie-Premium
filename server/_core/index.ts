import "./polyfills";
import { webcrypto } from "node:crypto";

if (!globalThis.crypto) {
  Object.defineProperty(globalThis, "crypto", {
    value: webcrypto,
    configurable: true,
  });
}

import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerLocalAuthRoutes } from "./auth-local";
import { registerPasswordResetRoutes } from "../passwordReset";
import { registerPortalPhaseRoutes } from "../portalPhase";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { seedQuizQuestionsIfEmpty } from "../seed-quiz";


async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback (Manus) – nur wenn OAUTH_SERVER_URL konfiguriert
  if (process.env.OAUTH_SERVER_URL) {
    registerOAuthRoutes(app);
  }
  // Lokales Auth
  registerLocalAuthRoutes(app);
  registerPasswordResetRoutes(app);
  registerPortalPhaseRoutes(app);
  // Healthcheck für Railway / Monitoring
  app.get("/api/health", (_req, res) => {
    return res.status(200).json({ ok: true, ts: new Date().toISOString() });
  });



  // Lokaler Dateispeicher (nur wenn kein Manus)
  const { registerStorageRoute } = await import("../storage");
  registerStorageRoute(app);
  // Stripe
  const { stripeRouter } = await import("../stripe");
  app.use(stripeRouter);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  await seedQuizQuestionsIfEmpty();
  const port = Number(process.env.PORT ?? 8080);
  const host = "0.0.0.0";

  server.listen(port, host, () => {
    console.log(`[BOOT] PORT env=${process.env.PORT} | listening on ${host}:${port}`);
  });
}

startServer().catch(console.error);
