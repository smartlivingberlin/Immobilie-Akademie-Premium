import { STRIPE_SEED_CATALOG } from "./stripeSeedCatalog";

export type StripeKeyMode = "live" | "test" | "unknown";

export type StripePreflightIssue = {
  envKey: string;
  code: "MISSING_ENV" | "INVALID_FORMAT" | "NOT_FOUND" | "INACTIVE" | "MODE_MISMATCH" | "NOT_EUR";
  detail: string;
};

export type StripePriceSnapshot = {
  id: string;
  active: boolean;
  livemode: boolean;
  currency: string;
  lookup_key: string | null;
  metadata: Record<string, string>;
};

export function detectStripeKeyMode(secret: string): StripeKeyMode {
  if (secret.startsWith("sk_live_")) return "live";
  if (secret.startsWith("sk_test_")) return "test";
  return "unknown";
}

export function listStripePriceEnvKeys(): string[] {
  return STRIPE_SEED_CATALOG.map((entry) => entry.envKey);
}

export function evaluateStripePricePreflight(input: {
  keyMode: StripeKeyMode;
  env: Record<string, string | undefined>;
  prices: Record<string, StripePriceSnapshot | null>;
}): StripePreflightIssue[] {
  const issues: StripePreflightIssue[] = [];

  for (const envKey of listStripePriceEnvKeys()) {
    const raw = input.env[envKey]?.trim();
    if (!raw) {
      issues.push({ envKey, code: "MISSING_ENV", detail: "ENV nicht gesetzt" });
      continue;
    }
    if (!raw.startsWith("price_")) {
      issues.push({ envKey, code: "INVALID_FORMAT", detail: `Wert beginnt nicht mit price_: ${raw}` });
      continue;
    }

    const price = input.prices[envKey];
    if (!price) {
      issues.push({ envKey, code: "NOT_FOUND", detail: `Stripe kennt ${raw} nicht` });
      continue;
    }
    if (!price.active) {
      issues.push({ envKey, code: "INACTIVE", detail: `${raw} ist inaktiv` });
    }
    if (price.currency.toLowerCase() !== "eur") {
      issues.push({ envKey, code: "NOT_EUR", detail: `${raw} Währung=${price.currency}` });
    }
    if (input.keyMode === "live" && !price.livemode) {
      issues.push({ envKey, code: "MODE_MISMATCH", detail: `${raw} ist Test-Price, Key ist Live` });
    }
    if (input.keyMode === "test" && price.livemode) {
      issues.push({ envKey, code: "MODE_MISMATCH", detail: `${raw} ist Live-Price, Key ist Test` });
    }
    const catalog = STRIPE_SEED_CATALOG.find((e) => e.envKey === envKey);
    if (catalog && price.lookup_key && price.lookup_key !== envKey) {
      issues.push({
        envKey,
        code: "MODE_MISMATCH",
        detail: `lookup_key ${price.lookup_key} ≠ erwartet ${envKey}`,
      });
    }
  }

  return issues;
}
