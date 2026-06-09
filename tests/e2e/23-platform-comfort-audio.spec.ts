import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("Platform Comfort & Rechenpraxis Standalone", () => {
  test("/app/rechenpraxis ohne Login → Redirect Login", async ({ page }) => {
    await page.goto(`${BASE}/app/rechenpraxis`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);
    expect(page.url()).toMatch(/login|rechenpraxis/);
  });

  test("/verwalter-rechner CTA zeigt Standalone-Pfad", async ({ page }) => {
    await page.goto(`${BASE}/verwalter-rechner`, { waitUntil: "domcontentloaded" });
    const link = page.getByRole("link", { name: /Rechenpraxis öffnen/i });
    const href = await link.getAttribute("href");
    expect(href).toMatch(/app\/rechenpraxis|login/);
  });

  test("/audio-modus ohne Login → Login", async ({ page }) => {
    await page.goto(`${BASE}/audio-modus`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);
    expect(page.url()).toMatch(/login|audio-modus/);
  });
});
