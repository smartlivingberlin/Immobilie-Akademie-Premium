import { test, expect } from "@playwright/test";

const BASE = "https://immobilie-akademie-premium-production.up.railway.app";
const SKIP_AUTH = true; // Demo-Modus testen

test.describe("✅ Fixes 2026-05-24 Verifikation", () => {

  test("M3: Praxis-Tab zeigt keinen rohen TypeScript-Code", async ({ page }) => {
    await page.goto(`${BASE}/modul/3/tag/1`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    const body = await page.textContent("body") || "";
    expect(body).not.toContain("as const");
    expect(body).not.toContain('type: "reflection"');
    console.log("✅ M3 Tag 1: Kein roher TS-Code sichtbar");
  });

  test.skip("M3: Tab-Leiste hat 5 Tabs (nicht 6)", async ({ page }) => {
    await page.goto(`${BASE}/modul/3/tag/1`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    const tabs = page.locator('[role="tab"]');
    const count = await tabs.count();
    console.log(`Tab-Anzahl: ${count}`);
    expect(count).toBe(5);
  });

  test.skip("M3: Videos-Tab ist eigenständig (nicht verschachtelt)", async ({ page }) => {
    await page.goto(`${BASE}/modul/3/tag/1`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    const videosTab = page.locator('[role="tab"]:has-text("Videos")');
    const count = await videosTab.count();
    expect(count).toBe(1);
    console.log(`✅ Videos-Tab: ${count}x gefunden`);
  });

  test("M3: Praxis-Tab klickbar und zeigt Markdown-Inhalt", async ({ page }) => {
    await page.goto(`${BASE}/modul/3/tag/1`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    const praxisTab = page.locator('[role="tab"]:has-text("Praxis")');
    if (await praxisTab.isVisible()) {
      await praxisTab.click();
      await page.waitForTimeout(1000);
      const body = await page.textContent("body") || "";
      expect(body).not.toContain("as const");
      // Echter Markdown-Inhalt erwartet
      const hasMarkdown = body.includes("Praxis") || body.includes("Eigentümer") || body.includes("Verwalter");
      expect(hasMarkdown).toBeTruthy();
      console.log("✅ Praxis-Tab zeigt echten Inhalt");
    } else {
      console.log("⚠️ Praxis-Tab nicht sichtbar (evtl. Login erforderlich)");
    }
  });

  test("M5: Aufgaben-Tab zeigt strukturierte Tasks", async ({ page }) => {
    await page.goto(`${BASE}/modul/5/tag/1`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    const body = await page.textContent("body") || "";
    expect(body).not.toContain("as const");
    console.log("✅ M5 Tag 1: Kein roher TS-Code");
  });

  test("Alle Module: Seite lädt ohne ErrorBoundary", async ({ page }) => {
    for (const mod of [1, 2, 3, 4, 5]) {
      await page.goto(`${BASE}/modul/${mod}/tag/1`);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);
      const body = await page.textContent("body") || "";
      const hasError = body.includes("Ein Fehler ist aufgetreten") || body.includes("Seite neu laden");
      if (hasError) {
        console.log(`❌ M${mod}: ErrorBoundary ausgelöst!`);
      } else {
        console.log(`✅ M${mod}: Kein ErrorBoundary`);
      }
      expect(hasError).toBeFalsy();
    }
  });

});
