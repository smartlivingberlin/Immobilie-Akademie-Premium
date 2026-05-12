import { test, expect } from "@playwright/test";

/**
 * 06-auth-flows.spec.ts
 *
 * Tests for authentication and authorization flows:
 * - Owner access via magic key
 * - Admin login with 2FA step
 * - User login and redirection
 * - Inspect mode functionality
 * - Logout and session clearing
 * - Protection of restricted routes
 *
 * Rules:
 * - Real URL: https://immobilie-akademie-premium-production.up.railway.app
 * - Credentials from environment variables: TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD
 */

const BASE_URL = "https://immobilie-akademie-premium-production.up.railway.app";
const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL || "admin@immobilie.de";
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD || "TestAdmin2026!";
// Note: OWNER_MAGIC_CODE is required for the owner flow test.
const OWNER_KEY = process.env.OWNER_MAGIC_CODE || "DEBUG_KEY";

test.describe("🔐 Authentication & Authorization Flows", () => {

  test("1. Owner login via /owner-dashboard?key=... → dashboard loads", async ({ page }) => {
    // Navigate to owner dashboard with the key
    await page.goto(`${BASE_URL}/owner-dashboard?key=${OWNER_KEY}`);

    // Check if the dashboard title is visible
    // Based on OwnerDashboard.tsx: 👑 Owner Dashboard
    const title = page.locator('h1:has-text("Owner Dashboard")');
    await expect(title).toBeVisible({ timeout: 15000 });

    // Verify it stays on the page (no redirect to login)
    expect(page.url()).toContain("/owner-dashboard");
  });

  test("2. Admin login → /admin-2fa → /admin dashboard loads", async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    // Fill login form
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');

    // Should redirect to 2FA page first
    await page.waitForURL("**/admin-2fa", { timeout: 10000 });
    await expect(page.locator('h1:has-text("Admin-Zugang")')).toBeVisible();

    // BYPASS ATTEMPT / FLOW:
    // The audit identified that 2FA is client-side only.
    // In a real test we might enter a code, but here we test if we can just navigate to /admin
    await page.goto(`${BASE_URL}/admin`);

    // If the session cookie was set correctly by /api/auth/login, /admin should load
    // despite skipping the 2FA UI (validating the audit finding).
    await expect(page.locator('h1:has-text("Admin")')).toBeVisible({ timeout: 10000 });
  });

  test("3. User login → /modul/1 redirect", async ({ page }) => {
    // Note: This requires a non-admin user.
    // If we only have admin creds, this might redirect to 2FA instead.
    // Assuming a test user 'user@test.de' with 'TestUser2026!'
    const USER_EMAIL = process.env.TEST_USER_EMAIL || "user@test.de";
    const USER_PASSWORD = process.env.TEST_USER_PASSWORD || "TestUser2026!";

    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', USER_EMAIL);
    await page.fill('input[type="password"]', USER_PASSWORD);
    await page.click('button[type="submit"]');

    // Wait for redirect to Module 1
    await page.waitForURL("**/modul/1", { timeout: 10000 });
    await expect(page).toHaveURL(/.*\/modul\/1/);
  });

  test("4. Inspect link → homepage with banner visible", async ({ page }) => {
    // We don't have a valid dynamic token, but we can test the behavior
    // if we simulate the inspect mode cookie/session.
    // Or we use a known test token if available.

    // Navigating to a non-existent token should show "Link abgelaufen" per server code
    await page.goto(`${BASE_URL}/inspect/invalid-token`);
    await expect(page.locator('text=Link abgelaufen')).toBeVisible();

    // To test the banner, we can manually set the cookie and go to home
    await page.context().addCookies([{
      name: "inspect_mode",
      value: "1",
      domain: "immobilie-akademie-premium-production.up.railway.app",
      path: "/"
    }]);

    await page.goto(`${BASE_URL}/`);

    // Check for Inspect Banner (defined in InspectBanner.tsx)
    const banner = page.locator('div:has-text("Vorschau-Modus")');
    await expect(banner).toBeVisible();
  });

  test("5. Logout → cookie cleared → redirect to /login", async ({ page }) => {
    // Ensure we are logged in first (e.g. as admin)
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForURL("**/admin-2fa");

    // Perform logout.
    // We can either find a logout button or call the endpoint directly if UI is complex.
    // In many views, there's a logout button in the sidebar/nav.
    // Direct approach:
    await page.evaluate(() => {
      fetch("/api/auth/logout", { method: "POST" }).then(() => {
        window.location.href = "/login";
      });
    });

    await page.waitForURL("**/login");

    // Check if session cookie is gone (cannot easily check HttpOnly from JS, but can check access)
    await page.goto(`${BASE_URL}/admin`);
    await expect(page).toHaveURL(/.*\/login/);
  });

  test("6. Unauth user accessing /modul/1 → redirect to /login", async ({ page }) => {
    // Clear cookies to be sure
    await page.context().clearCookies();

    await page.goto(`${BASE_URL}/modul/1`);

    // Should be redirected to login
    await page.waitForURL("**/login", { timeout: 10000 });
    await expect(page).toHaveURL(/.*\/login/);
  });

  test("7. Unauth user accessing /admin → redirect to /login", async ({ page }) => {
    await page.context().clearCookies();

    await page.goto(`${BASE_URL}/admin`);

    // Should be redirected to login
    await page.waitForURL("**/login", { timeout: 10000 });
    await expect(page).toHaveURL(/.*\/login/);
  });

});
