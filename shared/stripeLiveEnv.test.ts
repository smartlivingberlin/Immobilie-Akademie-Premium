import { describe, expect, it } from "vitest";
import { buildStripeLiveEnvTemplate, STRIPE_LIVE_ENV_VARS } from "./stripeLiveEnv";

describe("stripeLiveEnv", () => {
  it("includes required stripe keys and all price-id slots", () => {
    const template = buildStripeLiveEnvTemplate();
    expect(template).toContain("STRIPE_SECRET_KEY=sk_live_");
    expect(template).toContain("STRIPE_PRICE_B2B_STARTER");
    expect(template).toContain("STRIPE_PRICE_BUNDLE_KOMPLETT");
    expect(STRIPE_LIVE_ENV_VARS.length).toBeGreaterThanOrEqual(20);
  });
});
