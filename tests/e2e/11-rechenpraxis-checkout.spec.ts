import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("Rechenpraxis Solo Checkout", () => {
  test("rechenpraxis-checkout ohne Login → 401", async ({ request }) => {
    const res = await request.post(`${BASE}/api/stripe/rechenpraxis-checkout`, {
      data: {},
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(401);
  });

  test("/rechenpraxis-preise zeigt Solo-Plan 19€", async ({ page }) => {
    await page.goto(`${BASE}/rechenpraxis-preise`, { waitUntil: "domcontentloaded" });
    await expect(page.getByText(/Rechenpraxis Solo|19\s*€/i).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /abonnieren/i })).toBeVisible();
  });
});
