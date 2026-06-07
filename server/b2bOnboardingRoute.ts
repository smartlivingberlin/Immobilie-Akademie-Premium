import { Router } from "express";
import { requireAuth } from "./authMiddleware";
import { logger } from "./_core/logger";

export const b2bOnboardingRouter = Router();

async function getTenantForAdmin(userId: number) {
  const { getWhitelabelConfigForUser } = await import("./db");
  const config = await getWhitelabelConfigForUser(userId);
  if (!config || config.adminUserId !== userId) return null;
  return config;
}

b2bOnboardingRouter.get("/api/b2b/onboarding/status", requireAuth, async (req: any, res) => {
  try {
    const config = await getTenantForAdmin(req.currentUser.id);
    if (!config) {
      return res.json({ hasTenant: false, completed: false });
    }
    const brandingDone = Boolean(config.companyName && config.primaryColor && config.welcomeText);
    res.json({
      hasTenant: true,
      completed: brandingDone,
      tenant: {
        id: config.id,
        slug: config.slug,
        companyName: config.companyName,
        primaryColor: config.primaryColor,
        welcomeText: config.welcomeText,
        logoUrl: config.logoUrl,
        maxUsers: config.maxUsers,
        enabledModules: config.enabledModules,
      },
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

b2bOnboardingRouter.post("/api/b2b/onboarding/branding", requireAuth, async (req: any, res) => {
  try {
    const config = await getTenantForAdmin(req.currentUser.id);
    if (!config) return res.status(403).json({ error: "Kein B2B-Tenant oder keine Admin-Berechtigung" });

    const companyName = String(req.body?.companyName || config.companyName || "").trim().slice(0, 255);
    const primaryColor = String(req.body?.primaryColor || config.primaryColor || "#2563eb");
    const welcomeText = String(req.body?.welcomeText || "").trim().slice(0, 2000);

    if (!/^#[0-9a-fA-F]{6}$/.test(primaryColor)) {
      return res.status(400).json({ error: "Ungültige Primärfarbe (Hex)" });
    }
    if (!companyName) return res.status(400).json({ error: "Firmenname erforderlich" });

    const { updateWhitelabelConfig } = await import("./db");
    await updateWhitelabelConfig(config.id, { companyName, primaryColor, welcomeText });

    logger.info("[B2B] Onboarding branding saved", { userId: req.currentUser.id, tenantId: config.id });
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

b2bOnboardingRouter.post("/api/b2b/onboarding/logo", requireAuth, async (req: any, res) => {
  try {
    const config = await getTenantForAdmin(req.currentUser.id);
    if (!config) return res.status(403).json({ error: "Kein B2B-Tenant oder keine Admin-Berechtigung" });

    const logoBase64 = String(req.body?.logoBase64 || "");
    const mimeType = String(req.body?.mimeType || "image/png");
    const fileName = String(req.body?.fileName || "logo.png").slice(0, 80);
    if (!logoBase64) return res.status(400).json({ error: "logoBase64 erforderlich" });
    if (!mimeType.startsWith("image/")) return res.status(400).json({ error: "Nur Bilddateien erlaubt" });

    const buffer = Buffer.from(logoBase64, "base64");
    if (buffer.length > 2 * 1024 * 1024) return res.status(400).json({ error: "Max. 2 MB" });

    const { storagePut } = await import("./storage");
    const { updateWhitelabelConfig } = await import("./db");
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const fileKey = `whitelabel/${config.slug}/logo-${randomSuffix}-${fileName}`;
    const logoUrl = await storagePut(fileKey, buffer, mimeType);
    await updateWhitelabelConfig(config.id, { logoUrl });

    logger.info("[B2B] Onboarding logo uploaded", { userId: req.currentUser.id, tenantId: config.id });
    res.json({ ok: true, logoUrl });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

function generateTeamCode(slug: string): string {
  const prefix = slug.replace(/[^a-z0-9]/gi, "").slice(0, 10).toUpperCase() || "TEAM";
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TEAM-${prefix}-${rand}`;
}

b2bOnboardingRouter.get("/api/b2b/onboarding/team-codes", requireAuth, async (req: any, res) => {
  try {
    const config = await getTenantForAdmin(req.currentUser.id);
    if (!config) return res.status(403).json({ error: "Kein B2B-Tenant oder keine Admin-Berechtigung" });

    const { getDb } = await import("./db");
    const db = await getDb();
    const [rows] = await db.$client.query(
      `SELECT id, code, modules, maxUses, usedCount, isActive, note, createdAt
       FROM access_codes WHERE created_by_user_id = ?
       ORDER BY created_at DESC LIMIT 20`,
      [req.currentUser.id],
    ) as any;

    res.json({
      codes: (rows as any[]).map((r) => ({
        id: r.id,
        code: r.code,
        modules: r.modules,
        maxUses: Number(r.maxUses ?? r.max_uses ?? 1),
        usedCount: Number(r.usedCount ?? r.used_count ?? 0),
        isActive: Boolean(r.isActive ?? r.is_active),
        note: r.note,
        createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : null,
      })),
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

b2bOnboardingRouter.post("/api/b2b/onboarding/team-codes", requireAuth, async (req: any, res) => {
  try {
    const config = await getTenantForAdmin(req.currentUser.id);
    if (!config) return res.status(403).json({ error: "Kein B2B-Tenant oder keine Admin-Berechtigung" });

    const modules = String(req.body?.modules || config.enabledModules || "").trim();
    if (!modules) return res.status(400).json({ error: "Module erforderlich" });

    const maxUses = Math.max(1, Math.min(500, parseInt(String(req.body?.maxUses || "10"), 10) || 10));
    const note = String(req.body?.note || `Team-Code ${config.companyName || config.slug}`).slice(0, 255);
    const code = String(req.body?.code || generateTeamCode(config.slug)).toUpperCase().trim().slice(0, 64);
    if (!/^[A-Z0-9-]{4,64}$/.test(code)) {
      return res.status(400).json({ error: "Ungültiger Code (A-Z, 0-9, Bindestrich)" });
    }

    const { getDb } = await import("./db");
    const db = await getDb();
    await db.$client.query(
      `INSERT INTO access_codes (code, modules, max_uses, note, created_by_user_id, is_active)
       VALUES (?, ?, ?, ?, ?, 1)`,
      [code, modules, maxUses, note, req.currentUser.id],
    );

    logger.info("[B2B] Team code created", { userId: req.currentUser.id, tenantId: config.id, code });
    res.json({ ok: true, code, modules, maxUses });
  } catch (e: any) {
    if (String(e.message).includes("Duplicate")) {
      return res.status(409).json({ error: "Code existiert bereits" });
    }
    res.status(500).json({ error: e.message });
  }
});
