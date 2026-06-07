import { describe, expect, it } from "vitest";
import { PARTNER_CONNECT_POLICY } from "./partnerConnect";

describe("partnerConnect", () => {
  it("defines connect policy", () => {
    expect(PARTNER_CONNECT_POLICY.country).toBe("DE");
    expect(PARTNER_CONNECT_POLICY.enabledEnv).toBe("STRIPE_CONNECT_ENABLED");
  });
});
