import { getStripePriceConfig } from "../shared/stripePriceIds";

/** Stripe API-Verifizierung — prüft ob Keys funktionieren */

export type StripeLiveVerifyResult = {
  ok: boolean;
  mode: "live" | "test" | "missing";
  balanceAvailable: boolean;
  currency?: string;
  error?: string;
  recommendation?: string;
  priceConfig?: ReturnType<typeof getStripePriceConfig>;
};

export async function verifyStripeApiKey(): Promise<StripeLiveVerifyResult> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return { ok: false, mode: "missing", balanceAvailable: false, error: "STRIPE_SECRET_KEY fehlt" };
  }

  const mode = key.startsWith("sk_live_") ? "live" : "test";

  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(key, { apiVersion: "2026-02-25.clover" } as any);
    const balance = await stripe.balance.retrieve();
    const eur = balance.available.find((b) => b.currency === "eur");
    const priceConfig = getStripePriceConfig();
    const configuredPrices = Object.values(priceConfig).filter((p) => p.configured).length;
    return {
      ok: true,
      mode,
      balanceAvailable: true,
      currency: eur ? `EUR ${(eur.amount / 100).toFixed(2)}` : "—",
      priceConfig,
      recommendation:
        mode === "test"
          ? `Testmodus OK — ${configuredPrices}/4 Price-IDs gesetzt (optional für Live)`
          : configuredPrices < 4
            ? `Live aktiv — ${configuredPrices}/4 Price-IDs: Rest in Railway setzen für feste Produkte`
            : "Live aktiv — alle Price-IDs gesetzt, Testzahlung + Webhook prüfen",
    };
  } catch (e: any) {
    return {
      ok: false,
      mode,
      balanceAvailable: false,
      error: e.message?.slice(0, 200),
      recommendation: "Stripe Dashboard → API Keys prüfen, ggf. Key rotieren",
    };
  }
}
