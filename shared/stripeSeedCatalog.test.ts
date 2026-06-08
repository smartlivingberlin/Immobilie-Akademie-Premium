import { describe, expect, it } from "vitest";
import {
  STRIPE_SEED_CATALOG,
  STRIPE_SEED_ONE_TIME,
  STRIPE_SEED_SUBSCRIPTIONS,
  formatStripeSeedEnvBlock,
} from "./stripeSeedCatalog";

describe("stripeSeedCatalog", () => {
  it("has 18 entries (6 subscriptions + 12 one-time)", () => {
    expect(STRIPE_SEED_SUBSCRIPTIONS).toHaveLength(6);
    expect(STRIPE_SEED_ONE_TIME).toHaveLength(12);
    expect(STRIPE_SEED_CATALOG).toHaveLength(18);
  });

  it("uses unique env keys", () => {
    const keys = STRIPE_SEED_CATALOG.map((e) => e.envKey);
    expect(new Set(keys).size).toBe(18);
  });

  it("formats env block for Railway", () => {
    const block = formatStripeSeedEnvBlock({
      STRIPE_PRICE_MODUL_1: "price_abc",
    });
    expect(block).toContain("STRIPE_PRICE_MODUL_1=price_abc");
    expect(block).toContain("STRIPE_PRICE_B2B_STARTER=price_…");
  });
});
