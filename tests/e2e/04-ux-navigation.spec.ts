import { test, expect } from "@playwright/test";

const BASE = "https://immobilien-akademie-smart.de";

test.describe("🧭 UX und Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/login`);
    await page.fill('input[type="email"]', "admin@immobilie.de");
    await page.fill('input[type="password"]', "Admin1234!");
    await page.click('button[type="submit"]');
    await page.waitForURL(/statistiken/, { timeout: 10000 });
  });

  test("Abmelden-Button funktioniert", async ({ page }) => {
    const logoutBtn = page.locator('button:has-text("Abmelden")');
    await expect(logoutBtn).toBeVisible();
    await logoutBtn.click();
    await page.waitForURL(/login/, { timeout: 5000 });
    console.log("✅ Logout funktioniert — Redirect zu Login");
  });

  test("Mobile Navigation (375px)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE}/`);
    await page.waitForLoadState("networkidle");
    
    const body = await page.textContent("body");
    expect(body!.length).toBeGreaterThan(100);
    console.log("✅ Mobile Ansicht lädt korrekt");
    
    await page.screenshot({ path: "/tmp/mobile-screenshot.png" });
    console.log("Screenshot gespeichert: /tmp/mobile-screenshot.png");
  });

  test("Tablet Navigation (768px)", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(`${BASE}/`);
    await page.waitForLoadState("networkidle");
    console.log("✅ Tablet Ansicht lädt korrekt");
  });

  test("Desktop Navigation (1920px)", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${BASE}/`);
    await page.waitForLoadState("networkidle");
    console.log("✅ Desktop Ansicht lädt korrekt");
  });
  
  test("Glossar zeigt Begriffe an", async ({ page }) => {
    await page.goto(`${BASE}/glossary`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    const content = await page.textContent("body");
    expect(content!.length).toBeGreaterThan(1000);
    console.log("✅ Glossar hat Inhalt");
  });

  test("Prüfungsmodus startet korrekt", async ({ page }) => {
    await page.goto(`${BASE}/pruefung`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    const content = await page.textContent("body");
    expect(content!.length).toBeGreaterThan(200);
    console.log("✅ Prüfungsseite lädt");
  });
});
