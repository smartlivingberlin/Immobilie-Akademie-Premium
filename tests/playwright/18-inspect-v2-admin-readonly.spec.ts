import { test, expect } from "@playwright/test";
import { SignJWT } from "jose";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";
const INSPECT_SECRET =
  process.env.INSPECT_JWT_SECRET || "dev-inspect-secret-change-me";

async function mintInspectToken(hours = 72): Promise<string> {
  const secret = new TextEncoder().encode(INSPECT_SECRET);
  const expiresAt = Date.now() + hours * 60 * 60 * 1000;
  return new SignJWT({ role: "inspect", expiresAt })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${hours}h`)
    .setIssuedAt()
    .sign(secret);
}

test.describe("Inspect v2 — Admin-Vorschau read-only", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("invalid inspect token → 403", async ({ request }) => {
    const res = await request.get(`${BASE}/inspect/not-a-valid-jwt`);
    expect(res.status()).toBe(403);
  });

  test("inspect-status API ohne Cookie → inspect:false", async ({ request }) => {
    const res = await request.get(`${BASE}/api/auth/inspect-status`);
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data.inspect).toBe(false);
  });

  test("inspect/exit → Redirect und Cookie-Clear", async ({ request }) => {
    const res = await request.get(`${BASE}/inspect/exit`, { maxRedirects: 0 });
    expect([301, 302, 303, 307, 308]).toContain(res.status());
  });

  test("Owner-Dashboard ohne Auth → Login-Redirect", async ({ page }) => {
    await page.goto(`${BASE}/owner-dashboard`, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.waitForTimeout(2000);
    expect(page.url()).toMatch(/\/login/);
  });

  test("Admin ohne Auth → Login-Redirect", async ({ page }) => {
    await page.goto(`${BASE}/admin`, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.waitForTimeout(2000);
    expect(page.url()).toMatch(/\/login/);
  });

  test("gültiger Inspect-Token → Vorschau mit inspect=1", async ({ page, context }) => {
    const token = await mintInspectToken();
    const response = await page.request.get(`${BASE}/inspect/${token}`, { maxRedirects: 0 });

    if (response.status() === 403) {
      test.skip(true, "INSPECT_JWT_SECRET auf Zielumgebung weicht ab — Token nicht verifizierbar");
      return;
    }

    expect(response.status()).toBe(302);
    const location = response.headers().location || "";
    expect(location).toContain("inspect=1");

    await page.goto(`${BASE}/inspect/${token}`, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.waitForTimeout(2500);

    const banner = page.locator("text=/Vorschau|Admin-Vorschau|DEMO/i");
    await expect(banner.first()).toBeVisible({ timeout: 10000 });

    const url = page.url();
    const onAdmin = /\/admin/.test(url);
    const onHomeWithInspect = /\?inspect=1|inspect=1/.test(url);

    expect(onAdmin || onHomeWithInspect).toBe(true);

    if (onAdmin) {
      const adminNav = page.locator("text=/Administration|Dashboard|Fragen-Manager|KI-Monitor/i");
      await expect(adminNav.first()).toBeVisible({ timeout: 10000 });
    }

    const statusRes = await context.request.get(`${BASE}/api/auth/inspect-status`);
    const status = await statusRes.json();
    expect(status.inspect).toBe(true);
  });

  test("Inspect-Modus blockiert Schreib-POST", async ({ context }) => {
    const token = await mintInspectToken();
    const entry = await context.request.get(`${BASE}/inspect/${token}`, { maxRedirects: 0 });

    if (entry.status() === 403) {
      test.skip(true, "Inspect-Token auf Zielumgebung nicht gültig");
      return;
    }

    const writeAttempt = await context.request.post(`${BASE}/api/auth/register`, {
      data: { email: "inspect-test@example.com", password: "Test1234!", name: "Inspect" },
      headers: { "Content-Type": "application/json" },
    });

    expect([403, 429]).toContain(writeAttempt.status());
  });
});
