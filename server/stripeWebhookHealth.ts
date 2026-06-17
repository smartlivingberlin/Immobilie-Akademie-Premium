/** In-Memory Stripe-Webhook-Health (letztes verifiziertes Event) */

import type { StripeWebhookLedgerStats } from "./stripeWebhookLedger";

let lastVerifiedAt: string | null = null;
let lastEventType: string | null = null;
let totalVerified = 0;

export function recordStripeWebhookEvent(eventType: string): void {
  lastVerifiedAt = new Date().toISOString();
  lastEventType = eventType;
  totalVerified += 1;
}

export function getStripeWebhookHealth() {
  const secretSet = !!process.env.STRIPE_WEBHOOK_SECRET?.startsWith("whsec_");
  const recentlyActive = lastVerifiedAt
    ? Date.now() - new Date(lastVerifiedAt).getTime() < 7 * 24 * 60 * 60 * 1000
    : false;

  return {
    secretConfigured: secretSet,
    lastVerifiedAt,
    lastEventType,
    totalVerified,
    recentlyActive,
    endpoint: "https://immobilien-akademie-smart.de/api/stripe/webhook",
    expectedEvents: ["checkout.session.completed", "invoice.paid"],
  };
}

type StripeWebhookLedgerHealth =
  | ({ available: true } & StripeWebhookLedgerStats)
  | { available: false; error: "ledger_unavailable" };

export type StripeWebhookHealthWithLedger = ReturnType<typeof getStripeWebhookHealth> & {
  ledger: StripeWebhookLedgerHealth;
};

/** Erweitert In-Memory-Health um persistente Ledger-Stats (S231J read-only). */
export async function getStripeWebhookHealthWithLedger(
  db: { $client: { query: Function } } | null | undefined,
): Promise<StripeWebhookHealthWithLedger> {
  const base = getStripeWebhookHealth();
  if (!db) {
    return {
      ...base,
      ledger: { available: false, error: "ledger_unavailable" },
    };
  }

  try {
    const { getStripeWebhookLedgerStats } = await import("./stripeWebhookLedger");
    const stats = await getStripeWebhookLedgerStats(db);
    return {
      ...base,
      ledger: {
        available: true,
        ...stats,
      },
    };
  } catch {
    return {
      ...base,
      ledger: { available: false, error: "ledger_unavailable" },
    };
  }
}
