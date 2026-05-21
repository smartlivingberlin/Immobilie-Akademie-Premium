import { test, expect, chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE = 'https://immobilien-akademie-smart.de';
const STATE_FILE = '/tmp/premium-auth.json';

const publicPages = [
  { url: '/', name: 'Startseite' },
  { url: '/login', name: 'Login' },
  { url: '/kurse', name: 'Kurse' },
  { url: '/impressum', name: 'Impressum' },
  { url: '/datenschutz', name: 'Datenschutz' },
  { url: '/rechner', name: 'Rechner' },
];

const protectedPages = [
  { url: '/statistiken', name: 'Dashboard' },
  { url: '/quiz', name: 'Quiz' },
  { url: '/pruefung', name: 'Pruefung' },
  { url: '/admin', name: 'Admin' },
];

async function checkA11y(page: any, name: string) {
  await page.waitForTimeout(2000);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  if (results.violations.length > 0) {
    console.log(`\n[${name}] ${results.violations.length} Violations:`);
    results.violations.forEach((v: any) => {
      console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
      console.log(`    Betroffene Elemente: ${v.nodes.length}`);
      v.nodes.slice(0, 2).forEach((n: any) => console.log(`    -> ${n.html.substring(0, 100)}`));
    });
  } else {
    console.log(`[${name}] 0 Violations`);
  }
  expect(results.violations.filter((v: any) => v.impact === 'critical').length).toBe(0);
}

// ── Öffentliche Seiten ────────────────────────────────────────────────────────
for (const p of publicPages) {
  test(`A11y: ${p.name}`, async ({ page }) => {
    await page.goto(`${BASE}${p.url}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await checkA11y(page, p.name);
  });
}

// ── Login einmal durchführen, State speichern ─────────────────────────────────
test.describe('A11y: Geschützte Seiten', () => {
  test.beforeAll(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('input[placeholder="ihre@email.de"]', { timeout: 15000 });
    await page.fill('input[placeholder="ihre@email.de"]', 'alisadgadyri38@gmail.com');
    await page.fill('input[type="password"]', 'KsxPf5yYjqDNsU4J');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    await page.context().storageState({ path: STATE_FILE });
    await browser.close();
  });

  for (const p of protectedPages) {
    test(`A11y: ${p.name}`, async ({ browser }) => {
      const context = await browser.newContext({ storageState: STATE_FILE });
      const page = await context.newPage();
      await page.goto(`${BASE}${p.url}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await checkA11y(page, p.name);
      await context.close();
    });
  }
});
