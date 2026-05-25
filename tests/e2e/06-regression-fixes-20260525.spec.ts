import { test, expect } from "@playwright/test";

const BASE_URL = "https://immobilie-akademie-premium-production.up.railway.app";

test.describe("Regression: fixes 2026-05-25", () => {
  test.setTimeout(10000);

  test("1. Security header X-Frame-Options: GET / must return SAMEORIGIN", async ({ page }) => {
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
    const rootRes = await page.request.get(`${BASE_URL}/`);
    const html = await rootRes.text();
    // Match the vendor-react-utils bundle in the assets directory
    const match = html.match(/assets\/vendor-react-utils-[a-zA-Z0-9_-]+\.js/);
    expect(match, "Could not find vendor-react-utils-*.js in the HTML").not.toBeNull();

    const assetUrl = `${BASE_URL}/${match![0]}`;
    const assetRes = await page.request.get(assetUrl);
    const contentLength = assetRes.headers()["content-length"];

    if (contentLength) {
      expect(parseInt(contentLength)).toBeLessThan(400 * 1024);
    } else {
      const body = await assetRes.body();
      expect(body.length).toBeLessThan(400 * 1024);
    }
  });

  test("5. Stripe webhook: POST /api/stripe/webhook without signature must return 400", async ({ page }) => {
    const response = await page.request.post(`${BASE_URL}/api/stripe/webhook`);
    expect(response.status()).toBe(400);
  });

  test("6. Auth protection: GET /api/auth/me must return 401", async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/auth/me`, {
      headers: {
        'Cookie': '' // Clear cookies to ensure we are unauthenticated
      }
    });
    expect(response.status()).toBe(401);
  });

  test("7. Health endpoint: GET /api/health must return JSON with ok:true", async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/health`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(true);
  });

  test("8. Module4 content: GET /data/module4.json must return 200 and contain 'hint'", async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/data/module4.json`);
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain("hint");
  });
});
