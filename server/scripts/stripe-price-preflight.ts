/**
 * Validiert alle 18 STRIPE_PRICE_* ENV-Variablen gegen die Stripe API.
 *
 * Usage:
 *   pnpm run ops:stripe-preflight
 *   STRIPE_SECRET_KEY=sk_live_… pnpm run ops:stripe-preflight
 */
import "dotenv/config";
import Stripe from "stripe";
import {
  detectStripeKeyMode,
  evaluateStripePricePreflight,
  listStripePriceEnvKeys,
  type StripePriceSnapshot,
} from "../../shared/stripePricePreflight";

async function main(): Promise<number> {
  const secret = process.env.STRIPE_SECRET_KEY?.trim() ?? "";
  if (!secret) {
    console.error("STRIPE_SECRET_KEY fehlt");
    return 1;
  }

  const keyMode = detectStripeKeyMode(secret);
  if (keyMode === "unknown") {
    console.error("STRIPE_SECRET_KEY hat unbekanntes Format (erwartet sk_live_ oder sk_test_)");
    return 1;
  }

  const stripe = new Stripe(secret, { apiVersion: "2026-02-25.clover" });
  const envKeys = listStripePriceEnvKeys();
  const env: Record<string, string | undefined> = {};
  for (const key of envKeys) {
    env[key] = process.env[key];
  }

  const prices: Record<string, StripePriceSnapshot | null> = {};
  for (const envKey of envKeys) {
    const priceId = env[envKey]?.trim();
    if (!priceId?.startsWith("price_")) {
      prices[envKey] = null;
      continue;
    }
    try {
      const price = await stripe.prices.retrieve(priceId, { expand: ["product"] });
      prices[envKey] = {
        id: price.id,
        active: price.active,
        livemode: price.livemode,
        currency: price.currency,
        lookup_key: price.lookup_key ?? null,
        metadata: Object.fromEntries(
          Object.entries(price.metadata ?? {}).map(([k, v]) => [k, String(v)]),
        ),
      };
    } catch {
      prices[envKey] = null;
    }
  }

  const issues = evaluateStripePricePreflight({ keyMode, env, prices });
  const configured = envKeys.filter((k) => env[k]?.startsWith("price_")).length;

  console.log(`Stripe Pre-Flight (${keyMode.toUpperCase()} key)`);
  console.log(`Configured: ${configured}/${envKeys.length}`);
  if (issues.length === 0) {
    console.log("✅ Alle Price-IDs gültig, aktiv und modus-konsistent");
    return 0;
  }

  console.error(`❌ ${issues.length} Discrepancy(s):`);
  for (const issue of issues) {
    console.error(`  - ${issue.envKey}: [${issue.code}] ${issue.detail}`);
  }
  return 1;
}

main().then((code) => process.exit(code));
