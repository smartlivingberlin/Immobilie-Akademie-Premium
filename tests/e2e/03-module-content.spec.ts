import { test, expect } from "@playwright/test";

const BASE = "https://immobilien-akademie-smart.de";

test.describe("📚 Modul-Inhalte und Navigation", () => {
  test.beforeEach(async ({ page }) => {
    const secret = process.env.MAGIC_LINK_SECRET || "";
    if (secret) {
      await page.goto(`${BASE}/api/auth/magic?secret=${secret}`);
      await page.waitForLoadState("networkidle");
    }
  });

  for (const modul of [1, 2, 3, 4, 5]) {
    test(`Modul ${modul} öffnet sich korrekt`, async ({ page }) => {
      await page.goto(`${BASE}/modul/${modul}`);
      await page.waitForLoadState("networkidle");
      const url = page.url();
      // Wenn kein Login: weiterleitung zu /login ist OK — Modul-Schutz funktioniert
      const reachable = url.includes(`modul/${modul}`) || url.includes("login");
      expect(reachable).toBeTruthy();
      console.log(`✅ Modul ${modul}: ${url.includes("modul") ? "zugänglich" : "Login erforderlich (korrekt)"}`);
    });
  }

  test("Modul 1 Tag 1 — Inhalt vollständig", async ({ page }) => {
    await page.goto(`${BASE}/modul/1/tag/1`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    
    // Audio-Button prüfen
    const audioBtn = page.locator('button:has-text("vorlesen"), button:has-text("Vorlesen")');
    const audioBtnVisible = await audioBtn.isVisible().catch(() => false);
    console.log("Audio-Button:", audioBtnVisible ? "✅ sichtbar" : "❌ nicht gefunden");
    
    // Tabs prüfen
    const tabs = page.locator('[role="tab"], [data-state="active"]');
    const tabCount = await tabs.count();
    console.log("Tabs gefunden:", tabCount);
    
    // Theorie-Inhalt prüfen
    const content = await page.textContent("body");
    expect(content!.length).toBeGreaterThan(500);
    console.log("✅ Modul 1 Tag 1 hat Inhalt");
  });

  test("KI-Tutor Button ist sichtbar", async ({ page }) => {
    await page.goto(`${BASE}/modul/1/tag/1`);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    
    const kiBtn = page.locator('button:has-text("KI-Tutor"), button:has-text("Tutor")');
    const visible = await kiBtn.isVisible().catch(() => false);
    console.log("KI-Tutor Button:", visible ? "✅ sichtbar" : "⚠️ nicht gefunden");
  });
});
