import { describe, expect, it } from "vitest";
import { buildStripeLiveEnvTemplate, STRIPE_LIVE_ENV_VARS } from "./stripeLiveEnv";

describe("stripeLiveEnv", () => {
  it("includes required stripe keys", () => {
    const template = buildStripeLiveEnvTemplate();
    expect(template).toContain("STRIPE_SECRET_KEY=sk_live_");
    expect(STRIPE_LIVE_ENV_VARS.length).toBeGreaterThanOrEqual(4);
  });
});
