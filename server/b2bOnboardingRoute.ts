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
