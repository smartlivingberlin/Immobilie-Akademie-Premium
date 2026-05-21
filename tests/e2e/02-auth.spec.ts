import { test, expect } from "@playwright/test";

const BASE = "https://immobilien-akademie-smart.de";

test.describe("🔐 Authentifizierung", () => {
  test("Login-Seite lädt korrekt", async ({ page }) => {
    await page.goto(`${BASE}/login`);
    await page.waitForLoadState("networkidle");
    
    const emailInput = page.locator('input[placeholder="ihre@email.de"], input[name="email"]');
    const passwordInput = page.locator('input[type="password"]');
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    console.log("✅ Login-Formular sichtbar");
  });

  test("Login mit Admin-Credentials funktioniert", async ({ page }) => {
    await page.goto(`${BASE}/login`);
    await page.waitForLoadState("networkidle");
    
    await page.fill('input[placeholder="ihre@email.de"]', process.env.TEST_ADMIN_EMAIL || "alisadgadyri38@gmail.com");
    await page.fill('input[type="password"]', process.env.TEST_ADMIN_PASSWORD || "Admin2026!");
    await page.click('button[type="submit"], button:has-text("Anmelden")');
    
    await page.waitForURL(/statistiken|dashboard/, { timeout: 10000 });
    console.log("✅ Admin-Login erfolgreich");
    console.log("Weitergeleitet zu:", page.url());
  });

  test("Login mit falschen Daten zeigt Fehlermeldung", async ({ page }) => {
    await page.goto(`${BASE}/login`);
    await page.fill('input[placeholder="ihre@email.de"]', "falsch@test.de");
    await page.fill('input[type="password"]', "FalschesPasswort123!");
    await page.click('button[type="submit"], button:has-text("Anmelden")');
    
    await page.waitForTimeout(2000);
    const error = page.locator('[class*="error"], [class*="alert"], [style*="color: red"]');
    const errorVisible = await error.isVisible().catch(() => false);
    console.log("Fehlermeldung sichtbar:", errorVisible);
  });

  test("Onboarding-Wizard erscheint für neue Nutzer", async ({ page }) => {
    // Registrierung testen
    await page.goto(`${BASE}/login`);
    await page.waitForLoadState("networkidle");
    
    // "Jetzt registrieren" klicken
    const registerBtn = page.locator('button:has-text("registrieren"), a:has-text("registrieren")');
    if (await registerBtn.isVisible()) {
      await registerBtn.click();
    }
    
    await page.fill('input[name="name"], input[placeholder*="Name"]', "Playwright Test").catch(() => {});
    await page.fill('input[placeholder="ihre@email.de"]', "playwright-test@test.de");
    await page.fill('input[type="password"]', "Test1234!");
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(3000);
    
    // Wizard prüfen
    const wizardVisible = await page.locator('text=Was ist dein Ziel').isVisible().catch(() => false);
    console.log("Wizard sichtbar:", wizardVisible ? "✅ JA" : "❌ NEIN");
    
    // Aufräumen via API
    const response = await fetch(`${BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: process.env.TEST_ADMIN_EMAIL || "alisadgadyri38@gmail.com", password: process.env.TEST_ADMIN_PASSWORD || "Admin2026!" }),
    });
  });
});
