import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import type { Server } from "http";
import { jwtVerify } from "jose";
import { COOKIE_NAME } from "@shared/const";
import { isInspectModeActive } from "../inspectMode";
import { RECHENPRAXIS_MODULE_SENTINEL } from "../../shared/rechenpraxisProduct";
import { readFileSync } from "fs";

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
  "all-questions.json": [1, 2, 3, 4, 5],
  "rechenpraxis.json": [1, 2, 3, 4, 5],
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
  const filename = path.basename(req.path);
  if (filename === "rechenpraxis.json") {
    return authorizeRechenpraxisData(req, res, next);
  }

  const requiredModules = getProtectedModuleDataRequirement(req.path);
  if (!requiredModules) return next();

  return authorizeModuleAccess(req, res, next, requiredModules);
}

async function authorizeRechenpraxisData(req: Request, res: Response, next: NextFunction) {
  if (isInspectModeActive(req)) return next();

  const token = req.cookies?.[COOKIE_NAME];
  if (!token) { res.status(403).json({ error: "Nicht autorisiert" }); return; }

  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    const openId = (payload as any).openId as string;
    if ((payload as any).role === "admin") return next();

    if (openId) {
      const { getUserByOpenId } = await import("../db");
      const user = await getUserByOpenId(openId);
      if (user?.role === "admin") return next();

      const accessExpiresAt = (user as any)?.accessExpiresAt;
      if (accessExpiresAt && new Date(accessExpiresAt) < new Date()) {
        return res.status(403).json({ error: "Zugang abgelaufen — bitte verlängern" });
      }
      const trialExpiresAt = (user as any)?.trialExpiresAt;
      if (trialExpiresAt && new Date(trialExpiresAt) < new Date()) {
        res.status(403).json({ error: "Testzugang abgelaufen" });
        return;
      }

      const rawModules = user?.enabledModules || (payload as any).enabledModules || "";
      const { hasFullRechenpraxisAccess } = await import("../../shared/rechenpraxisAccess");
      if (hasFullRechenpraxisAccess(rawModules, user?.role ?? (payload as any).role)) return next();

      // Freemium: eingeloggte Nutzer ohne Vollabo dürfen JSON laden (Client sperrt Premium-Aufgaben)
      return next();
    }

    res.status(403).json({ error: "Rechenpraxis nicht freigeschaltet" });
  } catch {
    res.status(403).json({ error: "Ungueltige Session" });
  }
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
      const accessExpiresAt = (user as any)?.accessExpiresAt;
      if (accessExpiresAt && new Date(accessExpiresAt) < new Date()) {
        return res.status(403).json({ error: "Zugang abgelaufen — bitte verlängern" });
      }
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
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    res.setHeader("X-XSS-Protection", "0");
    res.setHeader("Referrer-Policy", "no-referrer");
    const indexPath = path.join(staticDir, "index.html");
    const portalMode = process.env.PORTAL_MODE ?? "akademie";
    const html = readFileSync(indexPath, "utf-8");
    const faqJsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Für wen ist das Portal geeignet?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Für Immobilienmakler (§34c), WEG-Verwalter (§26a WEG), Darlehensvermittler (§34i) und Immobiliengutachter.",
          },
        },
        {
          "@type": "Question",
          "name": "Gibt es eine kostenlose Testphase?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja — alle 5 Module können 24 Stunden kostenlos getestet werden. Keine Kreditkarte erforderlich.",
          },
        },
        {
          "@type": "Question",
          "name": "Wie unterscheidet sich das Portal von klassischen IHK-Kursen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Klassische Kurse kosten 1.290–1.690 Euro mit festen Live-Zeiten. Unser Portal ist ab 299 Euro verfügbar, komplett selbstbestimmt und mit KI-Tutor rund um die Uhr.",
          },
        },
        {
          "@type": "Question",
          "name": "Wie funktioniert der KI-Tutor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Der KI-Tutor beantwortet Prüfungsfragen, erklärt Gesetze und gibt Feedback zu Aufgaben — in jedem Lerntag verfügbar.",
          },
        },
        {
          "@type": "Question",
          "name": "Kann ich den Kurs für die 20h-Fortbildungspflicht nach §34c nutzen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Das Portal bereitet auf IHK-relevante Themen vor. Ob die Weiterbildung als Nachweis anerkannt wird, entscheidet die zuständige Behörde.",
          },
        },
      ],
    });
    const faqScript = portalMode !== "verwalter"
      ? `<script type="application/ld+json">${faqJsonLd}</script>`
      : "";
    const injected = html.replace(
      "</head>",
      `<script>window.__PORTAL_MODE__="${portalMode}";</script>
     ${faqScript}</head>`,
    );
    res.send(injected);
  });
}
