import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("Stripe Live Readiness (public guards)", () => {
  test("stripe-live-checklist ohne Login → 401", async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/stripe-live-checklist`);
    expect(res.status()).toBe(401);
  });

  test("stripe-live-env-missing ohne Login → 401", async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/stripe-live-env-missing`);
    expect(res.status()).toBe(401);
  });

  test("stripe-live-verify ohne Login → 401", async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/stripe-live-verify`);
    expect(res.status()).toBe(401);
  });

  test("webhook ohne stripe-signature → 400", async ({ request }) => {
    const res = await request.post(`${BASE}/api/stripe/webhook`, {
      data: "{}",
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(400);
  });
});
