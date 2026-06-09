import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

async function bumpFontAndMeasure(
  page: import("@playwright/test").Page,
  paragraphSelector: string,
) {
  await page.evaluate(() => {
    document.documentElement.style.setProperty("--a11y-font-scale", "1");
  });
  const before = await page.locator(paragraphSelector).first().evaluate((el) =>
    parseFloat(getComputedStyle(el).fontSize),
  );

  await page.evaluate(() => {
    document.documentElement.style.setProperty("--a11y-font-scale", "1.3");
  });
  const after = await page.locator(paragraphSelector).first().evaluate((el) =>
    parseFloat(getComputedStyle(el).fontSize),
  );

  expect(after).toBeGreaterThan(before * 1.15);
}

test.describe("Comfort: Schriftzoom auf Kernseiten", () => {
  test("/modul/3/tag/4 — Theorie-Fließtext skaliert", async ({ page }) => {
    await page.goto(`${BASE}/modul/3/tag/4`, { waitUntil: "domcontentloaded" });
    await bumpFontAndMeasure(page, ".learning-text-scale p, .content-container p");
  });

  test("/rechenpraxis — Aufgabentext skaliert", async ({ page }) => {
    await page.goto(`${BASE}/rechenpraxis`, { waitUntil: "domcontentloaded" });
    await bumpFontAndMeasure(page, ".learning-text-scale p");
  });

  test("/statistiken — Sidebar bleibt fix, Lesebereich skaliert", async ({ page }) => {
    await page.goto(`${BASE}/statistiken`, { waitUntil: "domcontentloaded" });

    const sidebarBefore = await page.locator("[data-app-sidebar] nav a").first().evaluate((el) =>
      parseFloat(getComputedStyle(el).fontSize),
    );
    const contentBefore = await page.locator("#learning-scroll").evaluate((el) =>
      parseFloat(getComputedStyle(el).fontSize),
    );

    await page.evaluate(() => {
      document.documentElement.style.setProperty("--a11y-font-scale", "1.25");
    });

    const sidebarAfter = await page.locator("[data-app-sidebar] nav a").first().evaluate((el) =>
      parseFloat(getComputedStyle(el).fontSize),
    );
    const contentAfter = await page.locator("#learning-scroll").evaluate((el) =>
      parseFloat(getComputedStyle(el).fontSize),
    );

    expect(contentAfter).toBeGreaterThan(contentBefore * 1.15);
    expect(Math.abs(sidebarAfter - sidebarBefore)).toBeLessThan(1);
  });
});
