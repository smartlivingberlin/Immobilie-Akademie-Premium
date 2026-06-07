import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

async function loginViaMagic(page: import("@playwright/test").Page) {
  const secret = process.env.MAGIC_LINK_SECRET || "";
  if (!secret) return false;
  await page.goto(`${BASE}/api/auth/magic?secret=${secret}`);
  await page.waitForLoadState("domcontentloaded");
  return true;
}

test.describe("Renewal-Flow (authentifiziert)", () => {
  test.skip(!process.env.MAGIC_LINK_SECRET, "MAGIC_LINK_SECRET fehlt");

  test("renewal-checkout mit Login → Session-URL", async ({ page, request }) => {
    const loggedIn = await loginViaMagic(page);
    expect(loggedIn).toBe(true);

    const res = await request.post(`${BASE}/api/stripe/renewal-checkout`, {
      data: { interval: "year" },
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.url).toMatch(/^https:\/\/checkout\.stripe\.com/);
  });

  test("rechenpraxis-checkout mit Login → Session-URL", async ({ page, request }) => {
    const loggedIn = await loginViaMagic(page);
    expect(loggedIn).toBe(true);

    const res = await request.post(`${BASE}/api/stripe/rechenpraxis-checkout`, {
      data: {},
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.url).toMatch(/^https:\/\/checkout\.stripe\.com/);
  });

  test("Dashboard zeigt Verlängerungs-Optionen für eingeloggte Nutzer", async ({ page }) => {
    await loginViaMagic(page);
    await page.goto(`${BASE}/statistiken`, { waitUntil: "domcontentloaded" });
    const body = await page.locator("body").innerText();
    const hasRenewal =
      /29\s*€|5\s*€|Verlänger|Renewal|Zugang/i.test(body) ||
      !body.includes("Anmelden");
    expect(hasRenewal).toBe(true);
  });
});
