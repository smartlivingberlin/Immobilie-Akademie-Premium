/** Optionale Stripe Dashboard Price-IDs — Live-Produkte statt price_data */

export const STRIPE_PRICE_ENV_KEYS = {
  rechenpraxis_monthly: "STRIPE_PRICE_RECHENPRAXIS_MONTHLY",
  renewal_monthly: "STRIPE_PRICE_RENEWAL_MONTHLY",
  renewal_yearly: "STRIPE_PRICE_RENEWAL_YEARLY",
  compliance_yearly: "STRIPE_PRICE_COMPLIANCE_YEARLY",
  b2b_starter: "STRIPE_PRICE_B2B_STARTER",
  b2b_professional: "STRIPE_PRICE_B2B_PROFESSIONAL",
} as const;

/** B2B-Plan-ID → Stripe Price-Key */
export const B2B_PLAN_PRICE_KEYS: Record<string, StripePriceKey> = {
  starter: "b2b_starter",
  professional: "b2b_professional",
};

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

/** Einmalzahlungen — Module & Bundles */
export const STRIPE_PRODUCT_PRICE_ENV: Record<string, string> = {
  modul_1: "STRIPE_PRICE_MODUL_1",
  modul_2: "STRIPE_PRICE_MODUL_2",
  modul_3: "STRIPE_PRICE_MODUL_3",
  modul_4: "STRIPE_PRICE_MODUL_4",
  modul_5: "STRIPE_PRICE_MODUL_5",
  modul_komplett: "STRIPE_PRICE_MODUL_KOMPLETT",
  starter: "STRIPE_PRICE_BUNDLE_STARTER",
  verwalter: "STRIPE_PRICE_BUNDLE_VERWALTER",
  "makler-plus": "STRIPE_PRICE_BUNDLE_MAKLER_PLUS",
  profi: "STRIPE_PRICE_BUNDLE_PROFI",
  gutachter: "STRIPE_PRICE_BUNDLE_GUTACHTER",
  komplett: "STRIPE_PRICE_BUNDLE_KOMPLETT",
};

export type PaymentPriceData = {
  currency: string;
  unit_amount: number;
  product_data: { name: string; description?: string };
};

export function getProductStripePriceId(productId: string): string | null {
  const envName = STRIPE_PRODUCT_PRICE_ENV[productId];
  if (!envName) return null;
  const value = process.env[envName];
  return value?.startsWith("price_") ? value : null;
}

export function buildPaymentLineItem(
  productId: string,
  priceData: PaymentPriceData,
): { price: string; quantity: number } | { price_data: PaymentPriceData; quantity: number } {
  const priceId = getProductStripePriceId(productId);
  if (priceId) return { price: priceId, quantity: 1 };
  return { price_data: priceData, quantity: 1 };
}

export function getModulePriceConfig(): Array<{ productId: string; env: string; priceId: string | null; configured: boolean }> {
  return Object.entries(STRIPE_PRODUCT_PRICE_ENV).map(([productId, env]) => {
    const priceId = getProductStripePriceId(productId);
    return { productId, env, priceId, configured: !!priceId };
  });
}
