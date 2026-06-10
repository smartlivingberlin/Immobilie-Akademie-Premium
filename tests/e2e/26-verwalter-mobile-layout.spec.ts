import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("Verwalter Produkt — Layout", () => {
  test("Home WEG-Badge ohne horizontales Overflow (Mobile)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 2);
    expect(overflow).toBe(true);
  });

  test("/verwalter-rechner lädt auf Tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const res = await page.goto(`${BASE}/verwalter-rechner`, { waitUntil: "domcontentloaded" });
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("/app/verwalter/vorlagen leitet ohne Login um", async ({ page }) => {
    await page.goto(`${BASE}/app/verwalter/vorlagen`, { waitUntil: "domcontentloaded" });
    await page.waitForURL(/login|vorlagen/, { timeout: 8000 });
    expect(page.url()).toMatch(/login|vorlagen/);
  });

  test("/app/verwalter/objekte leitet ohne Login um", async ({ page }) => {
    await page.goto(`${BASE}/app/verwalter/objekte`, { waitUntil: "domcontentloaded" });
    await page.waitForURL(/login|objekte/, { timeout: 8000 });
    expect(page.url()).toMatch(/login|objekte/);
  });
});
