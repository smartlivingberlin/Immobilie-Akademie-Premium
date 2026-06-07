import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

async function loginViaMagic(page: import("@playwright/test").Page) {
  const secret = process.env.MAGIC_LINK_SECRET || "";
  if (!secret) return false;
  await page.goto(`${BASE}/api/auth/magic?secret=${secret}`);
  await page.waitForLoadState("domcontentloaded");
  return true;
}

test.describe("Stripe Checkout Smoke (auth)", () => {
  test.skip(!process.env.MAGIC_LINK_SECRET, "MAGIC_LINK_SECRET fehlt");

  test("alle Abo-Checkouts liefern Stripe-URLs", async ({ page, request }) => {
    await loginViaMagic(page);

    for (const [path, body] of [
      ["/api/stripe/renewal-checkout", { interval: "year" }],
      ["/api/stripe/rechenpraxis-checkout", {}],
      ["/api/stripe/compliance-checkout", {}],
    ] as const) {
      const res = await request.post(`${BASE}${path}`, {
        data: body,
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status()).toBe(200);
      const data = await res.json();
      expect(data.url).toMatch(/^https:\/\/checkout\.stripe\.com/);
    }
  });

  test("owner revenue API ohne Owner-Key → 401/403", async ({ request }) => {
    const res = await request.get(`${BASE}/api/owner/revenue`);
    expect([401, 403]).toContain(res.status());
  });
});
