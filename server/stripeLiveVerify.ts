/** Stripe API-Verifizierung — prüft ob Keys funktionieren */

export type StripeLiveVerifyResult = {
  ok: boolean;
  mode: "live" | "test" | "missing";
  balanceAvailable: boolean;
  currency?: string;
  error?: string;
  recommendation?: string;
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
    return {
      ok: true,
      mode,
      balanceAvailable: true,
      currency: eur ? `EUR ${(eur.amount / 100).toFixed(2)}` : "—",
      recommendation:
        mode === "test"
          ? "Testmodus OK — vor Live-Umschaltung sk_live_ Keys in Railway setzen"
          : "Live-Modus aktiv — Testzahlung durchführen und Webhook prüfen",
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
