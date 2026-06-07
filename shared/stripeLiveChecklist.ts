/** Stripe-Live-Go-Live-Checkliste — Admin-Ops */

export type StripeChecklistCategory = "legal" | "stripe" | "email" | "ops";

export type StripeChecklistItemDef = {
  id: string;
  label: string;
  category: StripeChecklistCategory;
  action?: string;
  urgent?: boolean;
};

export const STRIPE_LIVE_CHECKLIST_DEFS: StripeChecklistItemDef[] = [
  { id: "gewerbe", label: "Gewerbe angemeldet (Berlin)", category: "legal", action: "service.berlin.de → ~26 €", urgent: true },
  { id: "agb", label: "AGB & Widerruf aktuell", category: "legal", action: "/agb prüfen" },
  { id: "datenschutz", label: "Datenschutzerklärung vollständig", category: "legal", action: "/datenschutz prüfen" },
  { id: "stripe_live_key", label: "Stripe Secret Key (sk_live_…)", category: "stripe", action: "Railway STRIPE_SECRET_KEY ersetzen", urgent: true },
  { id: "stripe_live_pk", label: "Stripe Publishable Key (pk_live_…)", category: "stripe", action: "Railway STRIPE_PUBLISHABLE_KEY ersetzen", urgent: true },
  { id: "stripe_webhook", label: "Stripe Webhook-Secret gesetzt", category: "stripe", action: "whsec_… in Railway STRIPE_WEBHOOK_SECRET" },
  { id: "stripe_webhook_endpoint", label: "Webhook-Endpoint in Stripe Dashboard", category: "stripe", action: "POST /api/stripe/webhook → Events: checkout.session.completed, invoice.paid" },
  { id: "app_url", label: "APP_URL auf Produktionsdomain", category: "ops", action: "https://immobilien-akademie-smart.de" },
  { id: "resend", label: "Resend API für Transaktions-Mails", category: "email", action: "RESEND_API_KEY in Railway" },
  { id: "spf_dkim", label: "SPF/DKIM/DMARC für Absender-Domain", category: "email", action: "Nach Stripe Live — Resend-Domain verifizieren" },
  { id: "backfill", label: "Backfill accessExpiresAt ausgeführt", category: "ops", action: "/admin/referral → Anwenden" },
  { id: "test_renewal", label: "Renewal-Checkout im Testmodus verifiziert", category: "stripe", action: "E2E 09-renewal-auth + Stripe Test-Zahlung" },
  { id: "webhook_recent", label: "Webhook-Event in den letzten 7 Tagen", category: "stripe", action: "Testzahlung oder Stripe CLI trigger auslösen" },
  { id: "stripe_price_ids", label: "Stripe Price-IDs Abos (6/6)", category: "stripe", action: "STRIPE_PRICE_RENEWAL_*, B2B_*, COMPLIANCE, RECHENPRAXIS in Railway" },
  { id: "stripe_module_price_ids", label: "Stripe Price-IDs Module & Bundles (12/12)", category: "stripe", action: "STRIPE_PRICE_MODUL_* und STRIPE_PRICE_BUNDLE_* in Railway" },
  { id: "stripe_connect", label: "Stripe Connect für Partner-Auszahlungen", category: "stripe", action: "STRIPE_CONNECT_ENABLED=true nach Dashboard-Setup" },
  { id: "payout_cron", label: "Quartals-Payout-Cron (optional)", category: "ops", action: "PARTNER_PAYOUT_CRON_ENABLED=true — 1.1/4.1/7.1/10.1" },
];

export type StripeChecklistItemStatus = StripeChecklistItemDef & {
  ok: boolean;
  detail?: string;
};

export type StripeLiveChecklistResult = {
  stripeMode: "live" | "test" | "missing";
  doneCount: number;
  totalCount: number;
  items: StripeChecklistItemStatus[];
};
