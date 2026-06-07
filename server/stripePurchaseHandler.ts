import { logger } from "./_core/logger";
import { extendUserAccessFromPurchase, extendUserAccessBySubscription } from "./accessExpiry";
import { applyReferralPurchaseRewards } from "./referralRewards";

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

  await db.$client.query("UPDATE users SET enabledModules = ? WHERE id = ?", [merged, user.id]);
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
