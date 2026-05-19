import { test, expect } from "@playwright/test";

const BASE_URL = "https://immobilie-akademie-premium-production.up.railway.app";
const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL || "alisadgadyri38@gmail.com";
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD || "Admin2026!";
const OWNER_KEY = process.env.OWNER_MAGIC_CODE || "";

test.describe("🔐 Authentication & Authorization Flows", () => {

  test("1. Owner login → dashboard loads", async ({ page }) => {
    await page.goto(`${BASE_URL}/owner-dashboard?key=${OWNER_KEY}`);
    await expect(page.locator('h1:has-text("Owner Dashboard")')).toBeVisible({ timeout: 15000 });
    expect(page.url()).toContain("/owner-dashboard");
  });

  test("2. Admin login → /admin-2fa redirect", async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="text"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForURL("**/admin-2fa", { timeout: 10000 });
    await page.goto(`${BASE_URL}/admin`);
    await expect(page.locator('text=Admin')).toBeVisible({ timeout: 10000 });
  });

  test("3. Unauth → /modul/1 → /login", async ({ page }) => {
    await page.context().clearCookies();
    await page.goto(`${BASE_URL}/modul/1`);
    await page.waitForURL("**/login", { timeout: 10000 });
    await expect(page).toHaveURL(/.*\/login/);
  });

  test("4. Invalid inspect token → Link abgelaufen", async ({ page }) => {
    await page.goto(`${BASE_URL}/inspect/invalid-token`);
    await expect(page.locator('text=Link abgelaufen')).toBeVisible();
  });

  test("5. Inspect cookie → banner sichtbar", async ({ page }) => {
    await page.context().addCookies([{
      name: "inspect_mode", value: "1",
      domain: "immobilie-akademie-premium-production.up.railway.app", path: "/"
    }]);
    await page.goto(`${BASE_URL}/`);
    await expect(page.locator('div:has-text("Vorschau-Modus")')).toBeVisible();
  });

  test("6. Logout → /admin → /login", async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="text"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForURL("**/admin-2fa");
    await page.evaluate(() => {
      fetch("/api/auth/logout", { method: "POST" }).then(() => {
        window.location.href = "/login";
      });
    });
    await page.waitForURL("**/login");
    await page.goto(`${BASE_URL}/admin`);
    await expect(page).toHaveURL(/.*\/login/);
  });

  test("7. Unauth → /admin → /login", async ({ page }) => {
    await page.context().clearCookies();
    await page.goto(`${BASE_URL}/admin`);
    await page.waitForURL("**/login", { timeout: 10000 });
    await expect(page).toHaveURL(/.*\/login/);
  });

});
