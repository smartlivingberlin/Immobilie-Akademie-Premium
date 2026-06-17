import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

test.describe("S231L runtime reality gate (public)", () => {
  test("public /api/health exposes runtime activation metadata when deployed", async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`);
    expect([200, 503]).toContain(res.status());
    const body = await res.json();

    if (!body.runtime) {
      test.info().annotations.push({
        type: "note",
        description: "runtime block missing — S231L not deployed to this environment yet",
      });
      return;
    }

    expect(body.runtime).toHaveProperty("gitSha");
    expect(body.runtime).toHaveProperty("gitShaShort");
    expect(body.runtime).toHaveProperty("gitShaSource");
    expect(body.runtime).toHaveProperty("activation");
    expect(body.runtime.activation).toHaveProperty("s231kManualReplayEnabled");
    expect(body.runtime.activation).toHaveProperty("s231kReplayRouteDeployed");

    if (body.runtime.gitSha) {
      expect(typeof body.runtime.gitSha).toBe("string");
      expect(body.runtime.gitShaShort).toBe(body.runtime.gitSha.slice(0, 7));
    }
  });

  test("stripe-webhook-replay ohne Login → 401 (S231K route presence)", async ({ playwright }) => {
    const anon = await playwright.request.newContext({
      storageState: { cookies: [], origins: [] },
    });
    try {
      const res = await anon.post(`${BASE}/api/admin/stripe-webhook-replay`, {
        data: {},
        headers: { "Content-Type": "application/json" },
      });
      expect(res.status()).toBe(401);
    } finally {
      await anon.dispose();
    }
  });
});
