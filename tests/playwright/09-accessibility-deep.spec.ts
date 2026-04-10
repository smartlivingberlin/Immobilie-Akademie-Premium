import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE = 'https://immobilie-akademie-production.up.railway.app';

const pages = [
  { url: '/', name: 'Startseite' },
  { url: '/login', name: 'Login' },
  { url: '/kurs/modul-1-immobilien-grundkurs', name: 'Landing M1' },
  { url: '/impressum', name: 'Impressum' },
  { url: '/rechner', name: 'Rechner' },
];

for (const p of pages) {
  test(`Accessibility: ${p.name}`, async ({ page }) => {
    await page.goto(`${BASE}${p.url}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    const critical = results.violations.filter(v => v.impact === 'critical');
    const serious = results.violations.filter(v => v.impact === 'serious');
    const moderate = results.violations.filter(v => v.impact === 'moderate');
    
    console.log(`\n${p.name}:`);
    console.log(`  ❌ Critical: ${critical.length}`);
    console.log(`  ⚠️  Serious:  ${serious.length}`);
    console.log(`  ℹ️  Moderate: ${moderate.length}`);
    console.log(`  ✅ Passes:   ${results.passes.length}`);
    
    if (critical.length > 0) {
      critical.forEach(v => console.log(`  CRITICAL: ${v.id} — ${v.description}`));
    }
    if (serious.length > 0) {
      serious.slice(0,3).forEach(v => console.log(`  SERIOUS: ${v.id} — ${v.description}`));
    }
  });
}
