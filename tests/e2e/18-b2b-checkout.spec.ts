import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

async function loginViaMagic(page: import("@playwright/test").Page) {
  const secret = process.env.MAGIC_LINK_SECRET || "";
  if (!secret) return false;
  await page.goto(`${BASE}/api/auth/magic?secret=${secret}`);
  await page.waitForLoadState("domcontentloaded");
  return true;
}

test.describe("B2B Checkout", () => {
  test("b2b-checkout ohne Auth → 401", async ({ request }) => {
    const res = await request.post(`${BASE}/api/stripe/b2b-checkout`, {
      data: { planId: "starter", companyName: "Test GmbH" },
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(401);
  });

  test.skip(!process.env.MAGIC_LINK_SECRET, "MAGIC_LINK_SECRET fehlt");

  test("b2b-checkout liefert Stripe-URL", async ({ page, request }) => {
    await loginViaMagic(page);
    const res = await request.post(`${BASE}/api/stripe/b2b-checkout`, {
      data: { planId: "starter", companyName: "Test Makler GmbH" },
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.url).toMatch(/^https:\/\/checkout\.stripe\.com/);
  });
});
