/** Railway ENV-Vorlage für Stripe Live-Umschaltung */

export const STRIPE_LIVE_ENV_VARS = [
  { key: "STRIPE_SECRET_KEY", example: "sk_live_…", note: "Stripe Dashboard → API Keys" },
  { key: "STRIPE_PUBLISHABLE_KEY", example: "pk_live_…", note: "Öffentlicher Live-Key" },
  { key: "STRIPE_WEBHOOK_SECRET", example: "whsec_…", note: "Webhook-Endpoint Live-Modus" },
  { key: "VITE_STRIPE_PUBLIC_KEY", example: "pk_live_…", note: "Frontend Build-Variable" },
  { key: "APP_URL", example: "https://immobilien-akademie-smart.de", note: "Produktions-URL" },
  { key: "STRIPE_PRICE_RECHENPRAXIS_MONTHLY", example: "price_…", note: "Rechenpraxis Solo 19€/Mo" },
  { key: "STRIPE_PRICE_RENEWAL_MONTHLY", example: "price_…", note: "Portal-Verlängerung 5€/Mo" },
  { key: "STRIPE_PRICE_RENEWAL_YEARLY", example: "price_…", note: "Portal-Verlängerung 29€/Jahr" },
  { key: "STRIPE_PRICE_COMPLIANCE_YEARLY", example: "price_…", note: "Compliance 249€/Jahr" },
  { key: "STRIPE_CONNECT_ENABLED", example: "true", note: "Partner Connect Express" },
] as const;

export function buildStripeLiveEnvTemplate(): string {
  return STRIPE_LIVE_ENV_VARS.map((v) => `${v.key}=${v.example}`).join("\n");
}
