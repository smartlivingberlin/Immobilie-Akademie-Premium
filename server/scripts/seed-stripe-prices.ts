/**
 * Erstellt alle 19 Stripe Price-IDs per API (Test oder Live) und gibt Railway-ENV aus.
 *
 * Voraussetzung: STRIPE_SECRET_KEY in der Umgebung (sk_test_… für Phase 5, sk_live_… später).
 *
 * Usage:
 *   pnpm run stripe:seed-prices -- --dry-run
 *   pnpm run stripe:seed-prices -- --apply
 *   pnpm run stripe:seed-prices -- --apply --output=stripe_prices.env
 *   pnpm run stripe:seed-prices -- --apply --railway-hints
 */
import "dotenv/config";
import { writeFileSync } from "node:fs";
import Stripe from "stripe";
import {
  STRIPE_SEED_CATALOG,
  formatStripeSeedEnvBlock,
  type StripeSeedEntry,
} from "../../shared/stripeSeedCatalog";

const dryRun = !process.argv.includes("--apply");
const railwayHints = process.argv.includes("--railway-hints");
const outputArg = process.argv.find((a) => a.startsWith("--output="));
const outputPath = outputArg?.split("=")[1];

async function findPriceByLookupKey(stripe: Stripe, lookupKey: string): Promise<Stripe.Price | null> {
  const res = await stripe.prices.list({ lookup_keys: [lookupKey], limit: 1, active: true });
  return res.data[0] ?? null;
}

async function getOrCreatePrice(
  stripe: Stripe,
  entry: StripeSeedEntry,
): Promise<{ envKey: string; priceId: string; created: boolean }> {
  const existing = await findPriceByLookupKey(stripe, entry.envKey);
  if (existing?.id) {
    return { envKey: entry.envKey, priceId: existing.id, created: false };
  }

  if (dryRun) {
    console.log(`  [dry-run] würde anlegen: ${entry.envKey} — ${entry.name} (${entry.unitAmountCents / 100} €)`);
    return { envKey: entry.envKey, priceId: "price_…", created: false };
  }

  const product = await stripe.products.create({
    name: entry.name,
    description: entry.description,
    metadata: {
      iap_product_id: entry.productId,
      iap_env_key: entry.envKey,
    },
  });

  const priceParams: Stripe.PriceCreateParams = {
    product: product.id,
    currency: "eur",
    unit_amount: entry.unitAmountCents,
    lookup_key: entry.envKey,
    transfer_lookup_key: true,
    metadata: {
      iap_product_id: entry.productId,
      iap_env_key: entry.envKey,
    },
  };

  if (entry.recurring) {
    priceParams.recurring = { interval: entry.recurring };
  }

  const price = await stripe.prices.create(priceParams);
  console.log(`  + ${entry.envKey} → ${price.id}`);
  return { envKey: entry.envKey, priceId: price.id, created: true };
}

function printRailwayHints(envBlock: string) {
  console.log("\n# Railway CLI (WSL — Service muss verlinkt sein: railway link)\n");
  for (const line of envBlock.split("\n")) {
    if (!line.includes("=")) continue;
    console.log(`railway variables --set "${line}"`);
  }
  console.log("\n# Oder als Schleife:\n");
  console.log('while IFS= read -r line; do [[ -z "$line" || "$line" =~ ^# ]] && continue; railway variables --set "$line"; done < stripe_prices.env');
}

async function main() {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secret) {
    console.error("STRIPE_SECRET_KEY fehlt. In WSL: export STRIPE_SECRET_KEY=sk_test_…");
    process.exit(1);
  }

  const mode = secret.startsWith("sk_live_") ? "LIVE" : secret.startsWith("sk_test_") ? "TEST" : "UNKNOWN";
  console.log(`Stripe Price Seed ${dryRun ? "(dry-run)" : "(apply)"} — Modus: ${mode}`);
  console.log(`Einträge: ${STRIPE_SEED_CATALOG.length}\n`);

  const stripe = new Stripe(secret, { apiVersion: "2026-02-25.clover" });
  const priceIds: Record<string, string> = {};
  let created = 0;

  for (const entry of STRIPE_SEED_CATALOG) {
    const result = await getOrCreatePrice(stripe, entry);
    priceIds[result.envKey] = result.priceId;
    if (result.created) created++;
  }

  const envBlock = formatStripeSeedEnvBlock(priceIds);

  console.log(`\n--- Railway ENV (${Object.keys(priceIds).length} Variablen) ---\n`);
  console.log(envBlock);

  if (outputPath && !dryRun) {
    writeFileSync(outputPath, `${envBlock}\n`, "utf8");
    console.log(`\nGespeichert: ${outputPath}`);
  }

  if (railwayHints && !dryRun) {
    printRailwayHints(envBlock);
  }

  if (dryRun) {
    console.log("\nMit --apply ausführen, um Produkte/Preise in Stripe anzulegen.");
  } else {
    console.log(`\nFertig. Neu erstellt: ${created}, gesamt konfiguriert: ${STRIPE_SEED_CATALOG.length}.`);
    console.log("Nächster Schritt: ENV in Railway setzen → Redeploy → /admin/stripe-live prüfen.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
