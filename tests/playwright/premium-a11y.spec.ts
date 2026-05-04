import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE = 'https://immobilie-akademie-premium-production.up.railway.app';
const pages = [
  { url: '/', name: 'Startseite' },
  { url: '/login', name: 'Login' },
  { url: '/kurse', name: 'Kurse' },
  { url: '/impressum', name: 'Impressum' },
  { url: '/datenschutz', name: 'Datenschutz' },
  { url: '/rechner', name: 'Rechner' },
];

for (const p of pages) {
  test(`A11y: ${p.name}`, async ({ page }) => {
    await page.goto(`${BASE}${p.url}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    if (results.violations.length > 0) {
      console.log(`\n[${p.name}] ${results.violations.length} Violations:`);
      results.violations.forEach(v => {
        console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
        console.log(`    Betroffene Elemente: ${v.nodes.length}`);
        v.nodes.slice(0, 2).forEach(n => console.log(`    -> ${n.html.substring(0, 100)}`));
      });
    } else {
      console.log(`[${p.name}] 0 Violations`);
    }
    expect(results.violations.filter(v => v.impact === 'critical').length).toBe(0);
  });
}
