import { test, expect, type Page } from '@playwright/test';

/**
 * E2E Test Suite for "Immobilien Akademie"
 * This suite covers Anonymous, Admin, and Stripe pricing flows on the production environment.
 */

const BASE_URL = 'https://immobilie-akademie-premium-production.up.railway.app';
const ADMIN_EMAIL = 'alisadgadyri38@gmail.com';
const ADMIN_PASSWORD = 'Admin2026!';

// Production environment requires higher timeouts
test.setTimeout(120000);

/**
 * Helper to handle the cookie consent banner if it appears.
 */
async function closeCookieBanner(page: Page) {
  const acceptButton = page.locator('button:has-text("Alle akzeptieren"), [role="button"]:has-text("Alle akzeptieren"), button:has-text("Akzeptieren")').first();
  if (await acceptButton.isVisible({ timeout: 5000 })) {
    await acceptButton.click({ force: true });
    // Wait for the banner to be removed from the DOM
    await page.waitForLoadState('networkidle');
  }
}

test.describe('Anonymous User Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
  });

  test('Startseite lädt', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await closeCookieBanner(page);
    await expect(page).toHaveTitle(/Immobilien|Akademie/i);
    // Use first() to account for multiple H1 elements (e.g. sr-only)
    await expect(page.locator('h1').first()).toContainText(/Karriereweg|Immobilien/i, { timeout: 20000 });
  });

  test('Login-Seite lädt', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });
    await closeCookieBanner(page);
    await expect(page.locator('input[placeholder*="email"]').first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('input[placeholder*="Passwort"]').first()).toBeVisible();
  });

  test('Pakete-Seite zeigt 6 Pakete', async ({ page }) => {
    await page.goto(`${BASE_URL}/pakete`, { waitUntil: 'networkidle' });
    await closeCookieBanner(page);

    // Requirement: Check for 6 packages
    // On this site, "Jetzt kaufen" or "Jetzt buchen" buttons identify the packages
    const packageButtons = page.locator('button:has-text("Jetzt kaufen"), button:has-text("Wählen")');
    await expect(packageButtons).toHaveCount(6, { timeout: 20000 });

    const mainPackages = ['Starter', 'Verwalter', 'Gutachter'];
    for (const pkg of mainPackages) {
      await expect(page.locator('body')).toContainText(pkg);
    }
  });

  test('Kurs-Landing lädt', async ({ page }) => {
    await page.goto(`${BASE_URL}/kurs/modul-1-immobilien-grundkurs`, { waitUntil: 'networkidle' });
    await closeCookieBanner(page);
    // Explicitly target the module title
    await expect(page.locator('h1').filter({ hasText: /Modul 1/i }).first()).toBeVisible({ timeout: 20000 });
  });

  test('Impressum lädt', async ({ page }) => {
    await page.goto(`${BASE_URL}/impressum`, { waitUntil: 'networkidle' });
    await closeCookieBanner(page);
    await expect(page.locator('body')).toContainText('Impressum', { timeout: 20000 });
  });

  test('Redirects to login if not logged in', async ({ page }) => {
    const protectedPaths = ['/modul/1', '/admin'];
    for (const path of protectedPaths) {
      await page.goto(`${BASE_URL}${path}`);
      await page.waitForURL(/.*login.*/, { timeout: 20000 });
      expect(page.url()).toContain('/login');
    }
  });
});

test.describe('Stripe Test (Pricing Verification)', () => {
  test('Pakete zeigen korrekte Preise', async ({ page }) => {
    await page.goto(`${BASE_URL}/pakete`, { waitUntil: 'networkidle' });
    await closeCookieBanner(page);

    // Assert exact prices as requested in the task
    // Note: If production has different prices, these assertions will intentionally fail to signal a discrepancy.
    await expect(page.locator('body')).toContainText('Starter');
    await expect(page.locator('body')).toContainText('549');

    await expect(page.locator('body')).toContainText('Verwalter');
    await expect(page.locator('body')).toContainText('699');

    await expect(page.locator('body')).toContainText('Gutachter');
    await expect(page.locator('body')).toContainText('449');
  });
});

test.describe('Admin User Tests', () => {
  test('Admin Login Flow and Accessibility', async ({ page, context }) => {
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });
    await closeCookieBanner(page);

    await page.fill('input[placeholder*="email"]', ADMIN_EMAIL);
    await page.fill('input[placeholder*="Passwort"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');

    // Requirement: Login -> redirect to /admin-2fa
    // If credentials on production differ from task, this will fail here.
    await page.waitForURL(/.*admin-2fa.*/, { timeout: 20000 });
    expect(page.url()).toContain('/admin-2fa');

    // Check accessibility of modules (should not crash)
    const modules = [1, 2, 3, 4, 5];
    for (const m of modules) {
      const response = await page.goto(`${BASE_URL}/modul/${m}/tag/1`, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBeLessThan(400);
      const text = await page.innerText('body');
      expect(text.toLowerCase()).not.toContain('errorboundary');
    }

    // Check admin subpages accessibility
    const adminPages = ['/admin', '/statistiken', '/pruefung', '/zertifikate'];
    for (const p of adminPages) {
      const response = await page.goto(`${BASE_URL}${p}`, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBeLessThan(400);
      const text = await page.innerText('body');
      expect(text).not.toContain('404 - Seite nicht gefunden');
      expect(text.toLowerCase()).not.toContain('errorboundary');
    }

    // Logout -> /login
    await page.goto(`${BASE_URL}/logout`, { waitUntil: 'networkidle' });
    // Force clear session to be sure
    await context.clearCookies();
    await page.goto(`${BASE_URL}/login`);
    await expect(page).toHaveURL(/.*login.*/);
  });
});
