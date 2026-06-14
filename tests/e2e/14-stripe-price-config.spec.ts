import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("Stripe Price Config", () => {
  test("stripe-price-config ohne Login → 401", async ({ playwright }) => {
    const anon = await playwright.request.newContext({
      storageState: { cookies: [], origins: [] },
    });
    try {
      const res = await anon.get(`${BASE}/api/admin/stripe-price-config`);
      expect(res.status()).toBe(401);
    } finally {
      await anon.dispose();
    }
  });

  test("connect-transfer ohne Login → 401", async ({ playwright }) => {
    const anon = await playwright.request.newContext({
      storageState: { cookies: [], origins: [] },
    });
    try {
      const res = await anon.post(`${BASE}/api/admin/payout-ledger/connect-transfer`, {
        data: { id: 1 },
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status()).toBe(401);
    } finally {
      await anon.dispose();
    }
  });
});
