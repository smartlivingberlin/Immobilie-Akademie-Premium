import type { StripePriceReadiness } from "./stripePriceReadiness";
import { STRIPE_PRICE_ENV_KEYS, STRIPE_PRODUCT_PRICE_ENV } from "./stripePriceIds";
import type { StripePriceKey } from "./stripePriceIds";

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
  { key: "STRIPE_PRICE_B2B_STARTER", example: "price_…", note: "B2B Starter 199€/Mo" },
  { key: "STRIPE_PRICE_B2B_PROFESSIONAL", example: "price_…", note: "B2B Professional 399€/Mo" },
  { key: "STRIPE_PRICE_MODUL_1", example: "price_…", note: "Modul 1" },
  { key: "STRIPE_PRICE_MODUL_2", example: "price_…", note: "Modul 2" },
  { key: "STRIPE_PRICE_MODUL_3", example: "price_…", note: "Modul 3" },
  { key: "STRIPE_PRICE_MODUL_4", example: "price_…", note: "Modul 4" },
  { key: "STRIPE_PRICE_MODUL_5", example: "price_…", note: "Modul 5" },
  { key: "STRIPE_PRICE_MODUL_KOMPLETT", example: "price_…", note: "Alle 5 Module" },
  { key: "STRIPE_PRICE_BUNDLE_STARTER", example: "price_…", note: "Bundle Starter" },
  { key: "STRIPE_PRICE_BUNDLE_VERWALTER", example: "price_…", note: "Bundle Verwalter" },
  { key: "STRIPE_PRICE_BUNDLE_MAKLER_PLUS", example: "price_…", note: "Bundle Makler-Plus" },
  { key: "STRIPE_PRICE_BUNDLE_PROFI", example: "price_…", note: "Bundle Profi" },
  { key: "STRIPE_PRICE_BUNDLE_GUTACHTER", example: "price_…", note: "Bundle Gutachter" },
  { key: "STRIPE_PRICE_BUNDLE_KOMPLETT", example: "price_…", note: "Bundle Komplett" },
  { key: "STRIPE_CONNECT_ENABLED", example: "true", note: "Partner Connect Express" },
  { key: "PARTNER_PAYOUT_CRON_ENABLED", example: "true", note: "Quartals-Ledger am 1.1/4.1/7.1/10.1" },
] as const;

export function buildStripeLiveEnvTemplate(): string {
  return STRIPE_LIVE_ENV_VARS.map((v) => `${v.key}=${v.example}`).join("\n");
}

/** Nur fehlende Price-ID ENV-Variablen — für Railway Copy-Paste */
export function buildMissingStripePriceEnv(readiness: StripePriceReadiness): string {
  const lines: string[] = [];
  for (const key of readiness.subscriptions.missing) {
    const env = STRIPE_PRICE_ENV_KEYS[key as StripePriceKey];
    if (env) lines.push(`${env}=price_…`);
  }
  for (const productId of readiness.modules.missing) {
    const env = STRIPE_PRODUCT_PRICE_ENV[productId];
    if (env) lines.push(`${env}=price_…`);
  }
  return lines.join("\n");
}

export function listMissingStripePriceEnvNames(readiness: StripePriceReadiness): string[] {
  const names: string[] = [];
  for (const key of readiness.subscriptions.missing) {
    const env = STRIPE_PRICE_ENV_KEYS[key as StripePriceKey];
    if (env) names.push(env);
  }
  for (const productId of readiness.modules.missing) {
    const env = STRIPE_PRODUCT_PRICE_ENV[productId];
    if (env) names.push(env);
  }
  return names;
}
