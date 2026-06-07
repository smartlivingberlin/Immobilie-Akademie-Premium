import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("Rechenpraxis Preise", () => {
  test("/rechenpraxis-preise zeigt Preispläne", async ({ page }) => {
    const response = await page.goto(`${BASE}/rechenpraxis-preise`, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("h1")).toContainText(/Preise/i);
    await expect(page.getByText(/19\s*€|29\s*€|199\s*€|Inklusive/i).first()).toBeVisible();
  });
});
