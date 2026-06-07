import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("B2B Team Codes API", () => {
  test("team-codes ohne Auth → 401", async ({ request }) => {
    const res = await request.get(`${BASE}/api/b2b/onboarding/team-codes`);
    expect(res.status()).toBe(401);
  });

  test("team-codes create ohne Auth → 401", async ({ request }) => {
    const res = await request.post(`${BASE}/api/b2b/onboarding/team-codes`, {
      data: { modules: "1,2,3" },
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(401);
  });
});
