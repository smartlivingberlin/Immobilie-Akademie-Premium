import { describe, expect, it } from "vitest";
import {
  detectStripeKeyMode,
  evaluateStripePricePreflight,
  listStripePriceEnvKeys,
} from "./stripePricePreflight";

describe("stripePricePreflight", () => {
  it("lists 18 canonical price env keys", () => {
    expect(listStripePriceEnvKeys().length).toBe(18);
  });

  it("detects live vs test key mode", () => {
    expect(detectStripeKeyMode("sk_live_abc")).toBe("live");
    expect(detectStripeKeyMode("sk_test_abc")).toBe("test");
  });

  it("flags missing, inactive and mode mismatch", () => {
    const envKey = listStripePriceEnvKeys()[0];
    const issues = evaluateStripePricePreflight({
      keyMode: "live",
      env: { [envKey]: "price_live123" },
      prices: {
        [envKey]: {
          id: "price_live123",
          active: false,
          livemode: false,
          currency: "usd",
          lookup_key: envKey,
          metadata: {},
        },
      },
    });
    expect(issues.some((i) => i.code === "INACTIVE")).toBe(true);
    expect(issues.some((i) => i.code === "MODE_MISMATCH")).toBe(true);
    expect(issues.some((i) => i.code === "NOT_EUR")).toBe(true);
  });

  it("passes when all 18 prices are valid EUR live prices", () => {
    const env: Record<string, string> = {};
    const prices: Record<string, any> = {};
    for (const key of listStripePriceEnvKeys()) {
      env[key] = `price_${key}`;
      prices[key] = {
        id: `price_${key}`,
        active: true,
        livemode: true,
        currency: "eur",
        lookup_key: key,
        metadata: {},
      };
    }
    expect(evaluateStripePricePreflight({ keyMode: "live", env, prices })).toEqual([]);
  });
});
