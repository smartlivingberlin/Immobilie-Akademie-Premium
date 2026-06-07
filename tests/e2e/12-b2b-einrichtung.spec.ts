import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("B2B Einrichtung", () => {
  test("/b2b-einrichtung lädt für Gäste mit Login-Hinweis", async ({ page }) => {
    await page.context().clearCookies();
    const response = await page.goto(`${BASE}/b2b-einrichtung`, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByText(/Anmeldung erforderlich|Jetzt anmelden/i).first()).toBeVisible();
  });

  test("b2b onboarding API ohne Login → 401", async ({ request }) => {
    const res = await request.get(`${BASE}/api/b2b/onboarding/status`);
    expect(res.status()).toBe(401);
  });
});
