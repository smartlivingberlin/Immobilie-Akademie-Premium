import { test, expect } from "@playwright/test";

const BASE = "https://immobilien-akademie-smart.de";

test.describe("🌐 Öffentliche Seiten — Alle müssen erreichbar sein", () => {
  const pages = [
    { path: "/", name: "Startseite" },
    { path: "/kurse", name: "Kurse" },
    { path: "/lehrplan", name: "Lehrplan" },
    { path: "/glossary", name: "Glossar" },
    { path: "/impressum", name: "Impressum" },
    { path: "/datenschutz", name: "Datenschutz" },
    { path: "/agb", name: "AGB" },
    { path: "/widerruf", name: "Widerruf" },
    { path: "/bildungskonzept", name: "Bildungskonzept" },
    { path: "/rechner", name: "Rechner" },
    { path: "/hilfe", name: "Hilfe" },
  ];

  for (const page of pages) {
    test(`${page.name} (${page.path}) lädt korrekt`, async ({ page: pw }) => {
      const response = await pw.goto(`${BASE}${page.path}`);
      expect(response?.status()).toBe(200);
      await expect(pw).not.toHaveTitle("404");
      await pw.waitForLoadState("networkidle");
      const title = await pw.title();
      console.log(`✅ ${page.name}: "${title}"`);
    });
  }
});

test.describe("🔍 SEO und Meta-Tags", () => {
  test("Homepage hat alle wichtigen Meta-Tags", async ({ page }) => {
    await page.goto(`${BASE}/`);
    
    const title = await page.title();
    expect(title).toContain("Immobilien");
    console.log("Title:", title);
    
    const description = await page.getAttribute('meta[name="description"]', "content");
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);
    console.log("Description:", description?.substring(0, 80) + "...");
    
    const ogTitle = await page.getAttribute('meta[property="og:title"]', "content");
    expect(ogTitle).toBeTruthy();
    
    const canonical = await page.getAttribute('link[rel="canonical"]', "href");
    expect(canonical).toContain("immobilien-akademie-smart.de");
    
    console.log("✅ Alle SEO Meta-Tags vorhanden");
  });
});
