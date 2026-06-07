import { logger } from "./_core/logger";
import { getB2bPlan } from "../shared/b2bPlans";
import { setUserKiTier } from "./kiFairUse";
import { KI_TIER_FULL } from "../shared/kiFairUse";

export async function processB2bSubscription(
  db: { $client: { query: Function } },
  userId: number,
  planId: string,
  companyName: string,
): Promise<void> {
  const plan = getB2bPlan(planId);
  if (!plan) throw new Error(`Unbekannter B2B-Plan: ${planId}`);

  const { createWhitelabelConfig, assignUserToTenant } = await import("./db");
  const [userRows] = await db.$client.query(
    "SELECT id, email, name, tenantId FROM users WHERE id = ? LIMIT 1",
    [userId],
  ) as any;
  const user = (userRows as any[])[0];
  if (!user) throw new Error("Nutzer nicht gefunden");

  const slugBase = (companyName || user.name || "buero")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || `buero-${userId}`;
  const slug = `${slugBase}-${userId}`;

  let tenantId = user.tenantId as number | null;

  if (tenantId) {
    const { updateWhitelabelConfig } = await import("./db");
    await updateWhitelabelConfig(tenantId, {
      maxUsers: plan.maxUsers,
      enabledModules: plan.enabledModules,
      isActive: true,
      companyName: companyName || user.name || "Maklerbüro",
    });
  } else {
    const config = await createWhitelabelConfig({
      slug,
      companyName: companyName || user.name || "Maklerbüro",
      enabledModules: plan.enabledModules,
      maxUsers: plan.maxUsers,
      adminUserId: userId,
      contactEmail: user.email ?? undefined,
      isActive: true,
    });
    if (!config?.id) throw new Error("Tenant konnte nicht erstellt werden");
    tenantId = config.id;
    await assignUserToTenant(userId, tenantId);
  }

  await db.$client.query(
    "UPDATE users SET enabledModules = ?, trialExpiresAt = NULL WHERE id = ?",
    [plan.enabledModules, userId],
  );
  await setUserKiTier(db, userId, KI_TIER_FULL);

  logger.info("[Stripe] B2B subscription processed", { userId, planId, tenantId });
}
