import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("B2B team code fixes", () => {
  it("lists access_codes with snake_case columns", () => {
    const source = readFileSync(resolve(process.cwd(), "server/b2bOnboardingRoute.ts"), "utf-8");
    expect(source).toContain("max_uses, used_count, is_active");
    expect(source).not.toMatch(/SELECT id, code, modules, maxUses/);
  });

  it("redeems access_codes from /api/auth/redeem-code flow", () => {
    const auth = readFileSync(resolve(process.cwd(), "server/_core/auth-local.ts"), "utf-8");
    const redeem = readFileSync(resolve(process.cwd(), "server/accessCodeRedeem.ts"), "utf-8");
    expect(auth).toContain("redeemAccessCodeForUser");
    expect(auth).toContain("redeemAccessCodePublic");
    expect(redeem).toContain("FROM access_codes");
  });

  it("shows created team code immediately in onboarding UI", () => {
    const ui = readFileSync(resolve(process.cwd(), "client/src/pages/B2bEinrichtung.tsx"), "utf-8");
    expect(ui).toContain("data.code?.code");
    expect(ui).toContain("copyTeamCode(data.code.code)");
  });
});
