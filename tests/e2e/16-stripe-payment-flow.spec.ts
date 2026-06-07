import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

async function loginViaMagic(page: import("@playwright/test").Page) {
  const secret = process.env.MAGIC_LINK_SECRET || "";
  if (!secret) return false;
  await page.goto(`${BASE}/api/auth/magic?secret=${secret}`);
  await page.waitForLoadState("domcontentloaded");
  return true;
}

test.describe("Stripe Payment Flow (optional live)", () => {
  test.skip(!process.env.STRIPE_E2E_ENABLED, "STRIPE_E2E_ENABLED fehlt");

  test("modul checkout URL + webhook health endpoint erreichbar", async ({ page, request }) => {
    await loginViaMagic(page);

    const checkoutRes = await request.post(`${BASE}/api/stripe/checkout`, {
      data: { productId: "modul_1", widerrufsAkzeptiert: true },
      headers: { "Content-Type": "application/json" },
    });
    expect(checkoutRes.status()).toBe(200);
    const checkout = await checkoutRes.json();
    expect(checkout.url).toMatch(/^https:\/\/checkout\.stripe\.com/);

    const healthRes = await request.get(`${BASE}/api/admin/stripe-webhook-health`);
    expect([200, 401, 403]).toContain(healthRes.status());
    if (healthRes.status() === 200) {
      const health = await healthRes.json();
      expect(health.endpoint).toContain("/api/stripe/webhook");
    }
  });

  test("bundle checkout liefert Stripe-URL", async ({ page, request }) => {
    await loginViaMagic(page);

    const res = await request.post(`${BASE}/api/stripe/bundle-starter`, {
      data: { widerrufsAkzeptiert: true },
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.url).toMatch(/^https:\/\/checkout\.stripe\.com/);
  });

  test("b2b-checkout liefert Stripe-URL", async ({ page, request }) => {
    await loginViaMagic(page);

    const res = await request.post(`${BASE}/api/stripe/b2b-checkout`, {
      data: { planId: "starter", companyName: "E2E Test GmbH" },
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.url).toMatch(/^https:\/\/checkout\.stripe\.com/);
  });

  test("stripe-live-checklist ohne Auth → 401", async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/stripe-live-checklist`);
    expect(res.status()).toBe(401);
  });
});
