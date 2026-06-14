import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "https://immobilien-akademie-smart.de";

const publicRoutes = [
  { path: "/", minTextLength: 150 },
  { path: "/login", minTextLength: 100 },
  { path: "/kurse", minTextLength: 150 },
  { path: "/pakete", minTextLength: 150 },
  { path: "/impressum", minTextLength: 100 },
  { path: "/datenschutz", minTextLength: 150 },
  { path: "/agb", minTextLength: 150 },
  { path: "/widerruf", minTextLength: 100 },
  { path: "/lehrplan", minTextLength: 150 },
  { path: "/glossary", minTextLength: 150 },
  { path: "/hilfe", minTextLength: 150 },
] as const;

/**
 * Public smoke: verifies stable public routes without auth, secrets or writes.
 *
 * This intentionally does not cover protected module routes. The former module
 * smoke remains available as `pnpm run test:e2e:module-auth-smoke`.
 */
test.describe("Public smoke (no auth)", () => {
  for (const route of publicRoutes) {
    test(`${route.path} loads public content`, async ({ page }) => {
      const target = new URL(route.path, BASE).toString();

      const response = await page.goto(target, {
        waitUntil: "domcontentloaded",
        timeout: 20_000,
      });

      expect(response, `${route.path} should return a document response`).not.toBeNull();
      expect(response!.status(), `${route.path} should not be a server error`).toBeLessThan(500);

      const pathname = new URL(page.url()).pathname;
      if (route.path !== "/login") {
        expect(pathname, `${route.path} should not redirect to login`).not.toBe("/login");
      }

      await page.waitForFunction(
        (minLength) => document.body.innerText.replace(/\s+/g, " ").trim().length >= minLength,
        route.minTextLength,
        { timeout: 15_000 },
      );

      const bodyText = (await page.locator("body").innerText()).replace(/\s+/g, " ").trim();
      expect(bodyText.length, `${route.path} should render visible content`).toBeGreaterThanOrEqual(
        route.minTextLength,
      );
    });
  }
});
