import type { Express } from "express";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import type { Server } from "http";

/**
 * DEV: Vite Middleware + HMR
 * Wird nur in NODE_ENV=development genutzt.
 */
export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    appType: "custom",
    server: {
      middlewareMode: true,
      hmr: { server },
    },
  });

  app.use(vite.middlewares);
}

/**
 * PROD: Statische Dateien aus dist/public ausliefern (SPA)
 * Wird in Produktion genutzt.
 */
export function serveStatic(app: Express) {
  const staticDir = path.join(process.cwd(), "dist", "public");

  app.use(express.static(staticDir));

  // SPA-Fallback: alle nicht-API-Routen -> index.html
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(staticDir, "index.html"));
  });
}
