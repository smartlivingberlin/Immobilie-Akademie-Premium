import { describe, expect, it } from "vitest";
import { buildMissingStripePriceEnv, listMissingStripePriceEnvNames } from "./stripeLiveEnv";
import type { StripePriceReadiness } from "./stripePriceReadiness";

const sampleReadiness: StripePriceReadiness = {
  subscriptions: { total: 6, configured: 4, missing: ["b2b_starter", "compliance_yearly"] },
  modules: { total: 12, configured: 10, missing: ["modul_5", "komplett"] },
  allSubscriptionsReady: false,
  allModulesReady: false,
  liveReady: false,
};

describe("stripeLiveEnv missing helpers", () => {
  it("builds template for missing subscription and module env vars", () => {
    const template = buildMissingStripePriceEnv(sampleReadiness);
    expect(template).toContain("STRIPE_PRICE_B2B_STARTER=price_…");
    expect(template).toContain("STRIPE_PRICE_COMPLIANCE_YEARLY=price_…");
    expect(template).toContain("STRIPE_PRICE_MODUL_5=price_…");
    expect(template).toContain("STRIPE_PRICE_BUNDLE_KOMPLETT=price_…");
  });

  it("lists missing env var names", () => {
    const names = listMissingStripePriceEnvNames(sampleReadiness);
    expect(names).toContain("STRIPE_PRICE_B2B_STARTER");
    expect(names).toContain("STRIPE_PRICE_MODUL_5");
    expect(names).toHaveLength(4);
  });
});
