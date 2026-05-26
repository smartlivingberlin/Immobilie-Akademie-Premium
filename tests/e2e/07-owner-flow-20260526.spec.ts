import { test, expect } from '@playwright/test';

const BASE_URL = 'https://immobilien-akademie-smart.de';
const OWNER_KEY = 'OWNER-3875C3D02394C47C89E21848';

test.describe('Owner Flow Regression Tests (2026-05-26)', () => {
  test('1. GET /owner-dashboard without cookie → should NOT return dashboard HTML directly', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/owner-dashboard`);
    // It should either redirect to /login or return 401/403/404 if it's a client-side route
    // The requirement says "should NOT return dashboard HTML directly"
    const text = await response.text();
    expect(text).not.toContain('Owner-Dashboard');
    expect(text).not.toContain('systemHealth');
  });

  test('2. POST /api/owner/access with wrong key → HTTP 403', async ({ page }) => {
    const response = await page.request.post(`${BASE_URL}/api/owner/access`, {
      data: { key: 'WRONG-KEY' }
    });
    expect(response.status()).toBe(403);
  });

  test('3. POST /api/owner/access with correct key → redirect to /owner-2fa', async ({ page }) => {
    const response = await page.request.post(`${BASE_URL}/api/owner/access`, {
      data: { key: OWNER_KEY },
      maxRedirects: 0
    });
    // It could be 302 redirect or 200 with redirect info if it's an API
    // Looking at ownerRoute.ts, it uses res.redirect()
    expect(response.status()).toBe(302);
    expect(response.headers().location).toContain('/owner-2fa');
  });

  test('4. GET /api/owner/dashboard without key → HTTP 401 or 403', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/owner/dashboard`);
    expect([401, 403]).toContain(response.status());
  });

  test('5. GET /api/owner/dashboard with correct key → HTTP 200 with totalUsers field', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/owner/dashboard?key=${OWNER_KEY}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('totalUsers');
  });

  test('6. GET /api/owner/monitoring with correct key → HTTP 200', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/owner/monitoring?key=${OWNER_KEY}`);
    expect(response.status()).toBe(200);
  });

  test('7. POST /api/owner/verify-2fa with wrong code → HTTP 401', async ({ page }) => {
    const response = await page.request.post(`${BASE_URL}/api/owner/verify-2fa`, {
      data: { type: 'email', code: '000000', email: 'alisadgadyri38@gmail.com' }
    });
    expect(response.status()).toBe(401);
  });

  test('8. GET /api/health → {"ok":true}', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/health`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(true);
  });
});
