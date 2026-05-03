import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import type { Server } from "http";
import { jwtVerify } from "jose";
import { COOKIE_NAME } from "@shared/const";

// Module-Bundle-Namen → welche Modul-IDs sie schützen
const PROTECTED_CHUNKS: Record<string, number[]> = {
  "Module1Detail": [1],
  "Module2Detail": [1, 2],
  "Module3Detail": [1, 3],
  "Module4Detail": [1, 4],
  "Module5Detail": [1, 5],
  "data-questions": [1, 2, 3, 4, 5],
};

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not set");
  return new TextEncoder().encode(secret);
}

async function protectModuleAssets(req: Request, res: Response, next: NextFunction) {
  const filename = path.basename(req.path);
  const matchedChunk = Object.keys(PROTECTED_CHUNKS).find(chunk => filename.includes(chunk));
  if (!matchedChunk) return next();

  const token = req.cookies?.[COOKIE_NAME];
  if (!token) {
    res.status(403).json({ error: "Nicht autorisiert" });
    return;
  }

  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    if ((payload as any).role === "admin") return next();

    const enabledModules: number[] = String((payload as any).enabledModules || "")
      .split(",")
      .map((m: string) => parseInt(m.trim(), 10))
      .filter((n: number) => !isNaN(n));

    const trialExpiresAt = (payload as any).trialExpiresAt;
    const trialExpired = trialExpiresAt ? new Date(trialExpiresAt) < new Date() : false;

    const requiredModules = PROTECTED_CHUNKS[matchedChunk];
    const hasAccess = requiredModules.some(m => enabledModules.includes(m));

    if (hasAccess && !trialExpired) return next();
    res.status(403).json({ error: "Modul nicht freigeschaltet" });
  } catch {
    res.status(403).json({ error: "Ungueltige Session" });
  }
}

export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    appType: "custom",
    server: { middlewareMode: true, hmr: { server } },
  });
  app.use(vite.middlewares);
}

export function serveStatic(app: Express) {
  const staticDir = path.join(process.cwd(), "dist", "public");
  app.use("/assets", protectModuleAssets, express.static(path.join(staticDir, "assets")));
  app.use(express.static(staticDir, { index: false }));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(staticDir, "index.html"));
  });
}
