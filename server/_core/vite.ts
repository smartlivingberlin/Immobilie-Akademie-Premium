import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import type { Server } from "http";
import { jwtVerify } from "jose";
import { COOKIE_NAME } from "@shared/const";

const PROTECTED_CHUNKS: Record<string, number[]> = {
  "Module1Detail": [1],
  "Module2Detail": [1, 2],
  "Module3Detail": [1, 3],
  "Module4Detail": [1, 4],
  "Module5Detail": [1, 5],
  "data-questions": [1, 2, 3, 4, 5],
};

const PROTECTED_MODULE_DATA: Record<string, number[]> = {
  "module1.json": [1],
  "module2.json": [2],
  "module2-content.json": [2],
  "module3.json": [3],
  "module4.json": [4],
  "module4-content.json": [4],
  "module5.json": [5],
};

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not set");
  return new TextEncoder().encode(secret);
}

async function protectModuleAssets(req: Request, res: Response, next: NextFunction) {
  if (isInspectModeActive(req)) return next();

  const filename = path.basename(req.path);
  const matchedChunk = Object.keys(PROTECTED_CHUNKS).find(chunk => filename.includes(chunk));
  if (!matchedChunk) return next();

  return authorizeModuleAccess(req, res, next, PROTECTED_CHUNKS[matchedChunk]);
}

export function getProtectedModuleDataRequirement(requestPath: string): number[] | null {
  const filename = path.basename(requestPath);
  return PROTECTED_MODULE_DATA[filename] ?? null;
}

async function protectModuleData(req: Request, res: Response, next: NextFunction) {
  const requiredModules = getProtectedModuleDataRequirement(req.path);
  if (!requiredModules) return next();

  return authorizeModuleAccess(req, res, next, requiredModules);
}

function isInspectModeActive(req: Request): boolean {
  if (req.cookies?.inspect_mode !== "1") return false;
  const expiresAt = Number(req.cookies?.inspect_mode_expires_at);
  if (!Number.isNaN(expiresAt) && expiresAt > 0 && Date.now() > expiresAt) return false;
  return true;
}

async function authorizeModuleAccess(req: Request, res: Response, next: NextFunction, requiredModules: number[]) {
  if (isInspectModeActive(req)) return next();

  const token = req.cookies?.[COOKIE_NAME];
  if (!token) { res.status(403).json({ error: "Nicht autorisiert" }); return; }

  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    const openId = (payload as any).openId as string;

    // 1. Token-Rolle prüfen
    if ((payload as any).role === "admin") return next();

    // 2. DB-Rolle prüfen (Fallback wenn Token kein role hat)
    if (openId) {
      const { getUserByOpenId } = await import("../db");
      const user = await getUserByOpenId(openId);
      if (user?.role === "admin") return next();

      const trialExpiresAt = (user as any)?.trialExpiresAt;
      if (trialExpiresAt && new Date(trialExpiresAt) < new Date()) {
        res.status(403).json({ error: "Testzugang abgelaufen" });
        return;
      }

      // 3. enabledModules aus DB prüfen
      const rawModules = user?.enabledModules || (payload as any).enabledModules || "";
      const enabledModules: number[] = String(rawModules)
        .split(",").map((m: string) => parseInt(m.trim(), 10)).filter((n: number) => !isNaN(n));
      if (requiredModules.some(m => enabledModules.includes(m))) return next();
    }

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
  app.use("/data", protectModuleData);
  app.use(vite.middlewares);
}

export function serveStatic(app: Express) {
  const staticDir = path.join(process.cwd(), "dist", "public");
  app.use("/assets", protectModuleAssets, express.static(path.join(staticDir, "assets")));
  app.use("/data", protectModuleData, express.static(path.join(staticDir, "data")));
  app.use(express.static(staticDir, { index: false }));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    // Security Headers für SPA-Routen (sendFile bypassed Helmet-Middleware)
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.setHeader("X-XSS-Protection", "0");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.sendFile(path.join(staticDir, "index.html"));
  });
}
