import { getStripePriceReadiness } from "../shared/stripePriceReadiness";
import { getStripeWebhookHealth } from "./stripeWebhookHealth";

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

export type OwnerRevenueSnapshot = {
  stripeMode: "live" | "test" | "missing";
  balanceEur: number | null;
  revenue30dEur: number;
  chargeCount30d: number;
  activeSubscriptions: number;
  pendingPurchases: number;
  payingUsersEstimate: number;
  priceIdsConfigured: { subscriptions: number; modules: number; subscriptionsTotal: number; modulesTotal: number };
  webhookHealth: ReturnType<typeof getStripeWebhookHealth>;
};

export async function getOwnerRevenueSnapshot(
  db: { $client: { query: Function } },
): Promise<OwnerRevenueSnapshot> {
  const key = process.env.STRIPE_SECRET_KEY;
  const stripeMode = !key ? "missing" : key.startsWith("sk_live_") ? "live" : "test";

  let balanceEur: number | null = null;
  let revenue30dEur = 0;
  let chargeCount30d = 0;
  let activeSubscriptions = 0;

  if (key) {
    try {
      const { default: Stripe } = await import("stripe");
      const stripe = new Stripe(key, { apiVersion: "2026-02-25.clover" } as any);
      const balance = await stripe.balance.retrieve();
      const eur = balance.available.find((b) => b.currency === "eur");
      balanceEur = eur ? eur.amount / 100 : 0;

      const since = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);
      const charges = await stripe.charges.list({ limit: 100, created: { gte: since } });
      chargeCount30d = charges.data.filter((c) => c.paid && !c.refunded).length;
      revenue30dEur = charges.data
        .filter((c) => c.paid && !c.refunded)
        .reduce((sum, c) => sum + c.amount, 0) / 100;

      const subs = await stripe.subscriptions.list({ status: "active", limit: 100 });
      activeSubscriptions = subs.data.length;
    } catch {
      /* Stripe API optional */
    }
  }

  let pendingPurchases = 0;
  if (await tableExists(db, "pending_purchases")) {
    const [rows] = await db.$client.query("SELECT COUNT(*) as c FROM pending_purchases") as any;
    pendingPurchases = Number((rows as any[])[0]?.c || 0);
  }

  const [payingRows] = await db.$client.query(
    `SELECT COUNT(*) as c FROM users
     WHERE enabledModules IS NOT NULL AND enabledModules != '' AND role != 'tester'`,
  ) as any;
  const payingUsersEstimate = Number((payingRows as any[])[0]?.c || 0);

  const priceReadiness = getStripePriceReadiness();

  return {
    stripeMode,
    balanceEur,
    revenue30dEur: Math.round(revenue30dEur * 100) / 100,
    chargeCount30d,
    activeSubscriptions,
    pendingPurchases,
    payingUsersEstimate,
    priceIdsConfigured: {
      subscriptions: priceReadiness.subscriptions.configured,
      modules: priceReadiness.modules.configured,
      subscriptionsTotal: priceReadiness.subscriptions.total,
      modulesTotal: priceReadiness.modules.total,
    },
    webhookHealth: getStripeWebhookHealth(),
  };
}
