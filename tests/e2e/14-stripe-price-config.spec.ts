import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("Stripe Price Config", () => {
  test("stripe-price-config ohne Login → 401", async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/stripe-price-config`);
    expect(res.status()).toBe(401);
  });

  test("connect-transfer ohne Login → 401", async ({ request }) => {
    const res = await request.post(`${BASE}/api/admin/payout-ledger/connect-transfer`, {
      data: { id: 1 },
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(401);
  });
});
