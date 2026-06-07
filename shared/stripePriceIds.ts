/** Optionale Stripe Dashboard Price-IDs — Live-Produkte statt price_data */

export const STRIPE_PRICE_ENV_KEYS = {
  rechenpraxis_monthly: "STRIPE_PRICE_RECHENPRAXIS_MONTHLY",
  renewal_monthly: "STRIPE_PRICE_RENEWAL_MONTHLY",
  renewal_yearly: "STRIPE_PRICE_RENEWAL_YEARLY",
  compliance_yearly: "STRIPE_PRICE_COMPLIANCE_YEARLY",
} as const;

export type StripePriceKey = keyof typeof STRIPE_PRICE_ENV_KEYS;

export function getConfiguredStripePriceId(key: StripePriceKey): string | null {
  const envName = STRIPE_PRICE_ENV_KEYS[key];
  const value = process.env[envName];
  return value?.startsWith("price_") ? value : null;
}

export function getStripePriceConfig(): Record<StripePriceKey, { env: string; priceId: string | null; configured: boolean }> {
  return Object.fromEntries(
    (Object.keys(STRIPE_PRICE_ENV_KEYS) as StripePriceKey[]).map((key) => {
      const env = STRIPE_PRICE_ENV_KEYS[key];
      const priceId = getConfiguredStripePriceId(key);
      return [key, { env, priceId, configured: !!priceId }];
    }),
  ) as Record<StripePriceKey, { env: string; priceId: string | null; configured: boolean }>;
}

export type SubscriptionPriceData = {
  currency: string;
  product_data: { name: string; description?: string };
  unit_amount: number;
  recurring: { interval: "month" | "year" };
};

/** Nutzt feste Price-ID wenn gesetzt, sonst dynamisches price_data (Testmodus). */
export function buildSubscriptionLineItem(
  key: StripePriceKey,
  priceData: SubscriptionPriceData,
): { price: string; quantity: number } | { price_data: SubscriptionPriceData; quantity: number } {
  const priceId = getConfiguredStripePriceId(key);
  if (priceId) return { price: priceId, quantity: 1 };
  return { price_data: priceData, quantity: 1 };
}
