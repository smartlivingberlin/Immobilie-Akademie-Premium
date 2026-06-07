import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

/**
 * Read-only smoke: jedes Modul 1–5 — Intro + Lerntag 1.
 * Nutzt den global-setup Auth-State (playwright@test.de), keine Schreiboperationen.
 */
test.describe("Modul-Smoke (readonly, authentifiziert)", () => {
  const modules = [
    { id: 1, name: "Grundkurs" },
    { id: 2, name: "Makler §34c" },
    { id: 3, name: "WEG-Verwaltung" },
    { id: 4, name: "Gutachter" },
    { id: 5, name: "§34i" },
  ] as const;

  for (const mod of modules) {
    test(`Modul ${mod.id} (${mod.name}) — Intro lädt`, async ({ page }) => {
      await page.goto(`${BASE}/modul/${mod.id}`, { waitUntil: "domcontentloaded", timeout: 20000 });
      await expect(page).not.toHaveURL(/\/login/);
      const text = await page.locator("body").innerText();
      expect(text.length).toBeGreaterThan(200);
    });

    test(`Modul ${mod.id} (${mod.name}) — Lerntag 1 hat Inhalt`, async ({ page }) => {
      await page.goto(`${BASE}/modul/${mod.id}/tag/1`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await expect(page).not.toHaveURL(/\/login/);
      await page.waitForFunction(
        () => document.body.innerText.replace(/\s+/g, " ").trim().length > 300,
        { timeout: 25000 },
      );
      const text = await page.locator("body").innerText();
      expect(text.length).toBeGreaterThan(300);
    });
  }
});
