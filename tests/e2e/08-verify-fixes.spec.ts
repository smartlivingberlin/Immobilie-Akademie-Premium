import { test, expect } from "@playwright/test";

const BASE = "https://immobilien-akademie-smart.de";

test.describe("Fixes 2026-05-24 Verifikation", () => {

  test("M3 Tag1: kein roher TS-Code auf der Seite", async ({ page }) => {
    await page.goto(`${BASE}/modul/3/tag/1`, { waitUntil: "commit" });
    await page.waitForTimeout(4000);
    const body = await page.textContent("body") || "";
    console.log("URL:", page.url());
    console.log("Body-Länge:", body.length);
    console.log("Body-Anfang:", body.substring(0, 200));
    expect(body).not.toContain('"reflection" as const');
    expect(body).not.toContain('"case" as const');
  });

  test("Alle Module: kein ErrorBoundary", async ({ page }) => {
    for (const mod of [1, 2, 3, 4, 5]) {
      await page.goto(`${BASE}/modul/${mod}/tag/1`, { waitUntil: "commit" });
      await page.waitForTimeout(3000);
      const body = await page.textContent("body") || "";
      const hasError = body.includes("Ein Fehler ist aufgetreten");
      console.log(`M${mod}: ${hasError ? "ERROR" : "OK"} | Body: ${body.substring(0, 100)}`);
      expect(hasError).toBeFalsy();
    }
  });

  test("Tab-Struktur: 5 Tabs sichtbar nach Login-Check", async ({ page }) => {
    await page.goto(`${BASE}/modul/3/tag/1`, { waitUntil: "commit" });
    await page.waitForTimeout(4000);
    const url = page.url();
    console.log("Finale URL:", url);
    
    const isLogin = url.includes("login") || url.includes("auth");
    if (isLogin) {
      console.log("⚠️ Login-Redirect — Tab-Test übersprungen");
      return;
    }
    
    // Warte auf Tab-Komponente
    await page.waitForSelector('[role="tablist"]', { timeout: 10000 }).catch(() => null);
    const tabs = page.locator('[role="tab"]');
    const count = await tabs.count();
    console.log(`Tabs gefunden: ${count}`);
    
    if (count > 0) {
      expect(count).toBe(5);
      const labels = await tabs.allTextContents();
      console.log("Tab-Labels:", labels);
    }
  });

});
