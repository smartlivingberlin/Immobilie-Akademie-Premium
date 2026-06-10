import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("Compliance-Landing", () => {
  test("/compliance-20h lädt mit 249 €/Jahr", async ({ page }) => {
    const response = await page.goto(`${BASE}/compliance-20h`, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByRole("heading", { name: /20 Stunden nachweisen/i })).toBeVisible();
    await expect(page.getByText("249 €/Jahr", { exact: true })).toBeVisible();
  });
});
