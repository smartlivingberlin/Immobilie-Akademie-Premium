import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("Migration status guards", () => {
  test("migration-status ohne Login → 401", async ({ playwright }) => {
    const anon = await playwright.request.newContext({
      storageState: { cookies: [], origins: [] },
    });
    const res = await anon.get(`${BASE}/api/admin/migration-status`);
    expect(res.status()).toBe(401);
    await anon.dispose();
  });

  test("health may include migrations field", async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`);
    expect([200, 503]).toContain(res.status());
    const body = await res.json();
    if (body.migrations) {
      expect(body.migrations).toHaveProperty("pending");
      expect(body.migrations).toHaveProperty("total");
    }
  });
});
