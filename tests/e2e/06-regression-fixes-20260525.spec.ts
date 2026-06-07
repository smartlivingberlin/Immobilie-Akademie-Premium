import { test, expect } from "@playwright/test";

const BASE_URL = "https://immobilie-akademie-premium-production.up.railway.app";

test.describe("Regression: fixes 2026-05-25", () => {
  test.describe.configure({ timeout: 10000 });

  // Use a clean context without storage state for these tests to ensure we test auth protection correctly
  test.use({ storageState: { cookies: [], origins: [] } });

  test("1. Security header X-Frame-Options: GET / must return header SAMEORIGIN", async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/`);
    expect(response.headers()["x-frame-options"]).toBe("SAMEORIGIN");
  });

  test("2. Security header X-Content-Type-Options: GET /admin must return nosniff", async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/admin`);
    expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  });

  test("3. Security header CSP: GET /api/health must return Content-Security-Policy header", async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/health`);
    expect(response.headers()["content-security-policy"]).toBeDefined();
  });

  test("4. Bundle size: vendor-react-utils-*.js must be under 400KB", async ({ page }) => {
    const mainPage = await page.request.get(`${BASE_URL}/`);
    const text = await mainPage.text();
    // Search for the specific bundle in the HTML source
    const match = text.match(/assets\/vendor-react-utils-[a-zA-Z0-9_-]+\.js/);
    expect(match, "Could not find vendor-react-utils-*.js in the main page").not.toBeNull();

    const assetPath = match![0];
    const assetResponse = await page.request.get(`${BASE_URL}/${assetPath}`);
    expect(assetResponse.status()).toBe(200);

    const contentLength = assetResponse.headers()["content-length"];
    if (contentLength) {
      expect(parseInt(contentLength)).toBeLessThan(400 * 1024);
    } else {
      const body = await assetResponse.body();
      expect(body.length).toBeLessThan(400 * 1024);
    }
  });

  test("5. Stripe webhook: POST /api/stripe/webhook without stripe-signature must return HTTP 400", async ({ page }) => {
    const response = await page.request.post(`${BASE_URL}/api/stripe/webhook`, {
      data: {}
    });
    expect(response.status()).toBe(400);
  });

  test("6. Auth protection: GET /api/auth/me must return HTTP 401", async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/auth/me`);
    expect(response.status()).toBe(401);
  });

  test("7. Health endpoint: GET /api/health must return JSON with ok:true", async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/health`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject({ ok: true });
  });

  test("8. Module content: GET /data/module4.json without auth must be blocked", async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/data/module4.json`);
    expect(response.status()).toBe(403);
  });
});
