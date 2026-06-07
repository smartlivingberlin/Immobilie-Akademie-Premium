import { logger } from "./_core/logger";
import { extendUserAccessFromPurchase, extendUserAccessBySubscription } from "./accessExpiry";
import { extendComplianceAccess } from "./complianceAccess";
import { applyReferralPurchaseRewards } from "./referralRewards";
import { COMPLIANCE_PRODUCT_ID } from "../shared/compliance";

export async function processModulePurchase(
  db: { $client: { query: Function } },
  email: string,
  modulesCsv: string,
  productId?: string | null,
): Promise<{ merged: string; userId: number } | null> {
  const [userRows] = await db.$client.query(
    "SELECT id, enabledModules FROM users WHERE email = ? LIMIT 1",
    [email.toLowerCase().trim()],
  ) as any;
  const user = (userRows as any[])[0];
  if (!user) return null;

  const current = String(user.enabledModules || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);
  const newMods = modulesCsv.split(",").map((s: string) => s.trim()).filter(Boolean);
  const merged = [...new Set([...current, ...newMods])].join(",");

  await db.$client.query(
    "UPDATE users SET enabledModules = ?, trialExpiresAt = NULL WHERE id = ?",
    [merged, user.id],
  );
  await extendUserAccessFromPurchase(db, user.id, productId, modulesCsv);
  await applyReferralPurchaseRewards(db, user.id);

  logger.info("[Stripe] Module purchase processed", { email, modules: merged, productId });
  return { merged, userId: user.id };
}

export async function processRenewalPayment(
  db: { $client: { query: Function } },
  userId: number,
  interval: "month" | "year",
): Promise<void> {
  await extendUserAccessBySubscription(db, userId, interval);
  logger.info("[Stripe] Access renewed", { userId, interval });
}

/** Compliance-Abo: Modul 2 + Weiterbildungsnachweis für 12 Monate */
export async function processComplianceSubscription(
  db: { $client: { query: Function } },
  userId: number,
): Promise<void> {
  const [userRows] = await db.$client.query(
    "SELECT enabledModules FROM users WHERE id = ? LIMIT 1",
    [userId],
  ) as any;
  const user = (userRows as any[])[0];
  if (!user) return;

  const current = String(user.enabledModules || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);
  const merged = [...new Set([...current, "2"])].join(",");

  await db.$client.query(
    "UPDATE users SET enabledModules = ?, trialExpiresAt = NULL WHERE id = ?",
    [merged, userId],
  );
  await extendUserAccessFromPurchase(db, userId, COMPLIANCE_PRODUCT_ID, "2");
  await extendComplianceAccess(db, userId, 12);
  logger.info("[Stripe] Compliance subscription processed", { userId });
}
