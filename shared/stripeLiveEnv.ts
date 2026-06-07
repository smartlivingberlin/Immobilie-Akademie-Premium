/** Railway ENV-Vorlage für Stripe Live-Umschaltung */

export const STRIPE_LIVE_ENV_VARS = [
  { key: "STRIPE_SECRET_KEY", example: "sk_live_…", note: "Stripe Dashboard → API Keys" },
  { key: "STRIPE_PUBLISHABLE_KEY", example: "pk_live_…", note: "Öffentlicher Live-Key" },
  { key: "STRIPE_WEBHOOK_SECRET", example: "whsec_…", note: "Webhook-Endpoint Live-Modus" },
  { key: "VITE_STRIPE_PUBLIC_KEY", example: "pk_live_…", note: "Frontend Build-Variable" },
  { key: "APP_URL", example: "https://immobilien-akademie-smart.de", note: "Produktions-URL" },
] as const;

export function buildStripeLiveEnvTemplate(): string {
  return STRIPE_LIVE_ENV_VARS.map((v) => `${v.key}=${v.example}`).join("\n");
}
