import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("Verwalter-Rechner Landing", () => {
  test("/verwalter-rechner lädt mit WEG-Fokus", async ({ page }) => {
    const response = await page.goto(`${BASE}/verwalter-rechner`, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("h1")).toContainText(/Verwalter-Rechner|WEG/i);
    await expect(page.getByText(/128|WEG|Hausgeld/i).first()).toBeVisible();
  });

  test("CTA verweist auf Rechenpraxis oder Login", async ({ page }) => {
    await page.goto(`${BASE}/verwalter-rechner`, { waitUntil: "domcontentloaded" });
    const link = page.getByRole("link", { name: /Rechenpraxis öffnen/i });
    await expect(link).toBeVisible();
    const href = await link.getAttribute("href");
    expect(href).toMatch(/rechenpraxis|login/);
  });
});
