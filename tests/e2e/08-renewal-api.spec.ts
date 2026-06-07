import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("Renewal-Flow (API-Schutz)", () => {
  test("renewal-checkout ohne Login → 401", async ({ request }) => {
    const res = await request.post(`${BASE}/api/stripe/renewal-checkout`, {
      data: { interval: "year" },
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(401);
  });

  test("/statistiken erfordert Login (Redirect oder Schutz)", async ({ page }) => {
    await page.goto(`${BASE}/statistiken`, { waitUntil: "domcontentloaded" });
    const url = page.url();
    const body = await page.locator("body").innerText();
    const protected_ = url.includes("/login") || /Laden|Anmelden|Login|Lernbereich/i.test(body);
    expect(protected_).toBe(true);
  });
});
