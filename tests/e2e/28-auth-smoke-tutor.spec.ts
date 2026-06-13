import { test, expect } from "@playwright/test";
import {
  BASE,
  hasValidSession,
  LAW_SLUG_CHECKS,
  assertLawSlugPresent,
  kiAssistantPanel,
} from "./helpers/testAuth";

test.describe("Public smoke (#207 preload / public routes)", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  for (const path of ["/", "/login", "/kurse"]) {
    test(`${path} lädt ohne kritische Fehler`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      const res = await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
      expect(res?.status()).toBeLessThan(400);
      await expect(page).not.toHaveTitle(/404/i);
      const critical = errors.filter((m) => !m.includes("plausible"));
      expect(critical).toEqual([]);
    });
  }

  test("/api/health ist erreichbar", async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.ok).toBe(true);
  });

  test("AccessibilityPanel-Chunk lädt deferred auf / (hideFab: kein sichtbarer FAB)", async ({
    page,
  }) => {
    const chunks: string[] = [];
    page.on("request", (r) => {
      if (r.url().includes("AccessibilityPanel") && r.url().endsWith(".js")) {
        chunks.push(r.url());
      }
    });
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
    expect(chunks.length).toBe(0);
    await page.waitForTimeout(4500);
    expect(chunks.length).toBeGreaterThan(0);
    await expect(page.locator('button[aria-label="Barrierefreiheit öffnen"]')).toHaveCount(0);
  });

  test("/login ohne AccessibilityPanel-FAB", async ({ page }) => {
    await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
    await page.waitForTimeout(4500);
    await expect(page.locator('button[aria-label="Barrierefreiheit öffnen"]')).toHaveCount(0);
  });
});

test.describe("Authenticated smoke (#204/#205/#207)", () => {
  let authed = false;

  test.beforeAll(async ({ request }) => {
    authed = await hasValidSession(request);
    if (!authed) {
      console.log(
        "⏭️  Auth-Smoke übersprungen — setze TEST_ADMIN_EMAIL + TEST_ADMIN_PASSWORD oder MAGIC_LINK_SECRET für global-setup",
      );
    }
  });

  test.beforeEach(() => {
    test.skip(!authed, "Kein gültiger Auth-State — Secrets fehlen oder Session abgelaufen");
  });

  test("Modul 1 lädt ohne Login-Redirect (lazy ModuleGuard)", async ({ page }) => {
    await page.goto(`${BASE}/modul/1`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await expect(page).not.toHaveURL(/\/login/);
    await page.waitForFunction(
      () => document.body.innerText.replace(/\s+/g, " ").trim().length > 200,
      { timeout: 30000 },
    );
    const body = await page.locator("body").innerText();
    expect(body.length).toBeGreaterThan(200);
    expect(body).not.toMatch(/^Laden\.\.\.$/);
  });

  test("Modul 1 Tag 1 — Lerninhalt und Tabs", async ({ page }) => {
    await page.goto(`${BASE}/modul/1/tag/1`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await expect(page).not.toHaveURL(/\/login/);
    await expect(page.getByRole("tab", { name: /Theorie/i })).toBeVisible({ timeout: 20000 });
    const text = await page.locator("body").innerText();
    expect(text.length).toBeGreaterThan(500);
  });

  for (const check of LAW_SLUG_CHECKS) {
    test(`Gesetzeslinks — ${check.label}`, async ({ page }) => {
      if (check.skipReason) {
        test.skip(true, check.skipReason);
      }

      const tagId = check.tagId ?? 1;
      await assertLawSlugPresent(page, check.moduleId, tagId, check.slug);
    });
  }

  test("KI-Assistent: öffnen, Mic-Button im Overlay sichtbar (#205)", async ({ page, context }) => {
    await page.addInitScript(() => {
      if (!window.speechSynthesis?.speak) {
        Object.defineProperty(window, "speechSynthesis", {
          value: { speak: () => {}, cancel: () => {}, getVoices: () => [] },
          configurable: true,
        });
      }
    });
    await context.grantPermissions(["microphone"]);
    await page.goto(`${BASE}/modul/1/tag/1`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await expect(page).not.toHaveURL(/\/login/);
    await page.getByRole("button", { name: "KI-Assistent öffnen" }).click({ timeout: 15000 });

    const panel = kiAssistantPanel(page);
    await expect(panel.getByText("KI-Tutor · Immobilien-Akademie")).toBeVisible({ timeout: 10000 });
    const micButton = panel.getByTitle("Spracheingabe starten");
    await expect(micButton).toBeVisible();
    await expect(micButton).toBeEnabled();
  });

  test("KI-Assistent: Overlay öffnet ohne Page-Error (#205)", async ({ page, context }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, "speechSynthesis", {
        value: {
          speak: () => {},
          cancel: () => {},
          speaking: false,
          getVoices: () => [{ lang: "de-DE", name: "Test" }],
        },
        configurable: true,
      });
    });
    await context.grantPermissions(["microphone"]);
    const pageErrors: string[] = [];
    page.on("pageerror", (e) => pageErrors.push(e.message));

    await page.goto(`${BASE}/modul/1/tag/1`, { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "KI-Assistent öffnen" }).click();

    const panel = kiAssistantPanel(page);
    await expect(panel.getByPlaceholder(/Stelle eine Frage/i)).toBeVisible();
    await expect(panel.getByTitle("Spracheingabe starten")).toBeVisible();
    await page.waitForTimeout(300);
    expect(pageErrors).toEqual([]);
  });
});
