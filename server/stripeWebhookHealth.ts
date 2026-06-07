/** In-Memory Stripe-Webhook-Health (letztes verifiziertes Event) */

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
