import { logger } from "./_core/logger";
import { PARTNER_CONNECT_POLICY } from "../shared/partnerConnect";

function connectEnabled(): boolean {
  return process.env[PARTNER_CONNECT_POLICY.enabledEnv] === "1"
    || process.env[PARTNER_CONNECT_POLICY.enabledEnv] === "true";
}

async function tableExists(db: { $client: { query: Function } }, table: string): Promise<boolean> {
  try {
    const [rows] = await db.$client.query(
      `SELECT COUNT(*) as c FROM information_schema.TABLES
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
      [table],
    ) as any;
    return Number((rows as any[])[0]?.c) > 0;
  } catch {
    return false;
  }
}

export async function getPartnerConnectStatus(
  db: { $client: { query: Function } },
  userId: number,
): Promise<{ connected: boolean; status: string; payoutsEnabled: boolean } | null> {
  if (!(await tableExists(db, "partner_connect_accounts"))) {
    return { connected: false, status: "unavailable", payoutsEnabled: false };
  }
  const [rows] = await db.$client.query(
    "SELECT status, payoutsEnabled FROM partner_connect_accounts WHERE userId = ? LIMIT 1",
    [userId],
  ) as any;
  const r = (rows as any[])[0];
  if (!r) return { connected: false, status: "none", payoutsEnabled: false };
  return {
    connected: true,
    status: r.status,
    payoutsEnabled: Boolean(r.payoutsEnabled),
  };
}

export async function createPartnerConnectOnboardingLink(
  db: { $client: { query: Function } },
  userId: number,
  email: string,
): Promise<{ url: string }> {
  if (!connectEnabled()) {
    throw new Error("Stripe Connect ist noch nicht aktiviert (STRIPE_CONNECT_ENABLED)");
  }
  if (!(await tableExists(db, "partner_connect_accounts"))) {
    throw new Error("partner_connect_accounts Tabelle fehlt — Migration 0041");
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY fehlt");

  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(key, { apiVersion: "2026-02-25.clover" } as any);
  const baseUrl = process.env.APP_URL || "https://immobilien-akademie-smart.de";

  const [existing] = await db.$client.query(
    "SELECT stripeAccountId FROM partner_connect_accounts WHERE userId = ? LIMIT 1",
    [userId],
  ) as any;
  let accountId = (existing as any[])[0]?.stripeAccountId as string | undefined;

  if (!accountId) {
    const account = await stripe.accounts.create({
      type: "express",
      country: PARTNER_CONNECT_POLICY.country,
      email,
      capabilities: { transfers: { requested: true } },
      metadata: { userId: String(userId), type: "partner_referral" },
    });
    accountId = account.id;
    await db.$client.query(
      "INSERT INTO partner_connect_accounts (userId, stripeAccountId, status) VALUES (?, ?, 'onboarding')",
      [userId, accountId],
    );
    logger.info("[Connect] Express account created", { userId, accountId });
  }

  const link = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${baseUrl}/empfehlungsprogramm?connect=refresh`,
    return_url: `${baseUrl}/empfehlungsprogramm?connect=done`,
    type: "account_onboarding",
  });

  return { url: link.url };
}

export async function syncPartnerConnectAccount(
  db: { $client: { query: Function } },
  userId: number,
): Promise<void> {
  if (!(await tableExists(db, "partner_connect_accounts"))) return;
  const [rows] = await db.$client.query(
    "SELECT stripeAccountId FROM partner_connect_accounts WHERE userId = ? LIMIT 1",
    [userId],
  ) as any;
  const accountId = (rows as any[])[0]?.stripeAccountId;
  if (!accountId) return;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return;

  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(key, { apiVersion: "2026-02-25.clover" } as any);
  const account = await stripe.accounts.retrieve(accountId);

  const status = account.details_submitted ? "active" : "onboarding";
  await db.$client.query(
    `UPDATE partner_connect_accounts
     SET status = ?, chargesEnabled = ?, payoutsEnabled = ?, updatedAt = NOW()
     WHERE userId = ?`,
    [status, account.charges_enabled ? 1 : 0, account.payouts_enabled ? 1 : 0, userId],
  );
}
