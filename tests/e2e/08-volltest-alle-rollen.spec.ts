import { test, expect } from "@playwright/test";

const BASE_URL = "https://immobilie-akademie-premium-production.up.railway.app";
const ADMIN_EMAIL = "alisadgadyri38@gmail.com";
const ADMIN_PASSWORD = "Admin2026!";

test.describe("🌍 Anonymous User Tests", () => {
  test("Startseite lädt (/)", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/`);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Immobilien Akademie/);
  });

  test("Login-Seite lädt (/login)", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/login`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('input[name="email"], input[type="email"], input[type="text"]').first()).toBeVisible();
  });

  test("Pakete-Seite zeigt 6 Pakete (/pakete)", async ({ page }) => {
    await page.goto(`${BASE_URL}/pakete`);
    await page.waitForLoadState("networkidle");
    const packageCards = page.locator('div[style*="background: white"][style*="border: 2px solid"]');
    const count = await packageCards.count();
    expect(count).toBe(6);
  });

  test("Kurs-Landing lädt (/kurs/modul-1-immobilien-grundkurs)", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/kurs/modul-1-immobilien-grundkurs`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText("Modul 1");
  });

  test("Impressum lädt (/impressum)", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/impressum`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test("/modul/1 redirectet zu /login wenn nicht eingeloggt", async ({ page }) => {
    await page.goto(`${BASE_URL}/modul/1`);
    await page.waitForURL("**/login**");
    expect(page.url()).toContain("/login");
  });

  test("/admin redirectet zu /login wenn nicht eingeloggt", async ({ page }) => {
    await page.goto(`${BASE_URL}/admin`);
    await page.waitForURL("**/login**");
    expect(page.url()).toContain("/login");
  });
});

test.describe("💳 Stripe / Pakete Tests", () => {
  test("Pakete zeigen korrekte Preise", async ({ page }) => {
    await page.goto(`${BASE_URL}/pakete`);
    await page.waitForLoadState("networkidle");

    const getPackagePrice = (name: string) =>
      page.locator('div').filter({ hasText: name }).filter({ has: page.locator('button:has-text("Jetzt kaufen")') }).first();

    await expect(getPackagePrice("Starter-Paket").locator('text=549').first()).toBeVisible();
    await expect(getPackagePrice("Verwalter-Paket").locator('text=699').first()).toBeVisible();
    await expect(getPackagePrice("Gutachter-Paket").locator('text=449').first()).toBeVisible();
  });
});

test.describe("🔑 Admin User Tests", () => {
  // Use serial mode to reuse login session across tests in this describe block
  test.describe.configure({ mode: 'serial' });

  let sharedPage: any;

  test.beforeAll(async ({ browser }) => {
    sharedPage = await browser.newPage();
  });

  test.afterAll(async () => {
    await sharedPage.close();
  });

  test("Admin Login Flow", async () => {
    const page = sharedPage;
    await page.goto(`${BASE_URL}/login`);

    // Accept cookies if banner is present
    const cookieBtn = page.locator('button:has-text("Alle akzeptieren")');
    if (await cookieBtn.isVisible()) {
      await cookieBtn.click();
    }

    const emailInput = page.locator('input[name="email"], input[type="email"], input[type="text"]').first();
    await emailInput.fill(ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"], button:has-text("Anmelden")');

    // Check for rate limit
    const rateLimit = page.locator('text=Zu viele Login-Versuche');
    if (await rateLimit.isVisible()) {
      console.warn("⚠️ Rate limit hit on production server. Skipping further admin tests.");
      test.skip(true, "Rate limit hit");
    }

    await page.waitForURL(/\/(admin-2fa|admin)/, { timeout: 30000 });
    expect(page.url()).toMatch(/\/(admin-2fa|admin)/);
  });

  test("Module Access Tests", async () => {
    const page = sharedPage;
    // Check /modul/1
    await page.goto(`${BASE_URL}/modul/1`);
    await expect(page).not.toHaveURL(/.*\/login/);
    await expect(page.locator('h1, h2, h3').first()).toBeVisible();

    // Check all module days
    const modules = [1, 2, 3, 4, 5];
    for (const m of modules) {
      await page.goto(`${BASE_URL}/modul/${m}/tag/1`);
      await page.waitForLoadState("networkidle");
      const errorBoundary = page.locator('text=Something went wrong, text=Fehler, text=Error');
      const errorVisible = await errorBoundary.isVisible();
      expect(errorVisible).toBe(false);
      await expect(page.locator('h1, h2, h3')).not.toHaveCount(0);
    }
  });

  test("Admin Pages Access Tests", async () => {
    const page = sharedPage;

    // /admin
    await page.goto(`${BASE_URL}/admin`);
    if (!page.url().includes("/admin-2fa")) {
      await expect(page).toHaveURL(/.*\/admin/);
      await expect(page.locator('h1, h2, :text("Admin"), :text("Administration"), :text("Administrator")').first()).toBeVisible();
    }

    // /statistiken
    await page.goto(`${BASE_URL}/statistiken`);
    await expect(page).toHaveURL(/.*\/statistiken/);

    // /pruefung
    await page.goto(`${BASE_URL}/pruefung`);
    await expect(page).toHaveURL(/.*\/pruefung/);

    // /zertifikate
    await page.goto(`${BASE_URL}/zertifikate`);
    await expect(page).toHaveURL(/.*\/zertifikate/);
  });

  test("Logout Flow", async () => {
    const page = sharedPage;
    await page.evaluate(() => {
      fetch("/api/auth/logout", { method: "POST" }).then(() => {
        window.location.href = "/login";
      });
    });
    await page.waitForURL("**/login**", { timeout: 15000 });
    expect(page.url()).toContain("/login");

    await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForURL("**/login**");
    expect(page.url()).toContain("/login");
  });
});
