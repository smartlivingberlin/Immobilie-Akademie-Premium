/** Test-Helfer für Stripe-Webhook-Payloads (Vitest / lokale CLI-Simulation). */

export type StripeWebhookFixture = {
  id: string;
  type: string;
  data: { object: Record<string, unknown> };
};

export function buildCheckoutCompletedFixture(opts: {
  email: string;
  modules: string;
  productId?: string;
  sessionId?: string;
}): StripeWebhookFixture {
  return {
    id: `evt_test_${Date.now()}`,
    type: "checkout.session.completed",
    data: {
      object: {
        id: opts.sessionId || "cs_test_checkout",
        customer_email: opts.email,
        payment_status: "paid",
        metadata: {
          modules: opts.modules,
          productId: opts.productId || "modul_1",
        },
      },
    },
  };
}

export function buildInvoicePaidFixture(opts: {
  userId: number;
  type: "renewal" | "compliance" | "b2b" | "rechenpraxis";
  interval?: "month" | "year";
  planId?: string;
  companyName?: string;
}): StripeWebhookFixture {
  const metadata: Record<string, string> = {
    type: opts.type,
    userId: String(opts.userId),
  };
  if (opts.interval) metadata.interval = opts.interval;
  if (opts.planId) metadata.planId = opts.planId;
  if (opts.companyName) metadata.companyName = opts.companyName;

  return {
    id: `evt_test_${Date.now()}`,
    type: "invoice.paid",
    data: {
      object: {
        id: "in_test_invoice",
        subscription: "sub_test",
        metadata,
      },
    },
  };
}
