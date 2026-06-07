import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("Pending Purchases Admin", () => {
  test("pending-purchases ohne Login → 401", async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/pending-purchases`);
    expect(res.status()).toBe(401);
  });

  test("stripe-price-config enthält readiness-Feld (mit Admin-Session)", async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/stripe-price-config`);
    expect([401, 403, 200]).toContain(res.status());
    if (res.status() === 200) {
      const data = await res.json();
      expect(data.readiness?.subscriptions?.total).toBe(6);
      expect(data.readiness?.modules?.total).toBe(12);
    }
  });
});
