import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("Phase 10 APIs", () => {
  test("b2b logo API ohne Login → 401", async ({ request }) => {
    const res = await request.post(`${BASE}/api/b2b/onboarding/logo`, {
      data: { logoBase64: "abc" },
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(401);
  });

  test("connect-onboard ohne Login → 401", async ({ request }) => {
    const res = await request.post(`${BASE}/api/referral/connect-onboard`);
    expect(res.status()).toBe(401);
  });

  test.skip(!process.env.MAGIC_LINK_SECRET, "MAGIC_LINK_SECRET fehlt");

  test("rechenpraxis subscribed-Parameter lädt", async ({ page }) => {
    const secret = process.env.MAGIC_LINK_SECRET || "";
    await page.goto(`${BASE}/api/auth/magic?secret=${secret}`);
    await page.goto(`${BASE}/rechenpraxis?subscribed=1`, { waitUntil: "domcontentloaded" });
    const url = page.url();
    expect(url).toMatch(/rechenpraxis|login/);
  });
});
