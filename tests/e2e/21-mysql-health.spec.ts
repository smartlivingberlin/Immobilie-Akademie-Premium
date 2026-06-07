import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("MySQL health endpoints", () => {
  test("public /api/health includes db field", async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`);
    expect([200, 503]).toContain(res.status());
    const body = await res.json();
    expect(body).toHaveProperty("db");
    expect(["connected", "unavailable"]).toContain(body.db);
    if (res.status() === 200) {
      expect(body.ok).toBe(true);
      expect(body.db).toBe("connected");
    }
  });

  test("admin mysql-health ohne Login → 401", async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/mysql-health`);
    expect(res.status()).toBe(401);
  });
});
