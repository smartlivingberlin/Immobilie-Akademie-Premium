import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const BASE = 'https://immobilie-akademie-production.up.railway.app';

test('Rechner Critical finden', async ({ page }) => {
  await page.goto(`${BASE}/rechner`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const results = await new AxeBuilder({ page }).analyze();
  const all = results.violations;
  
  for (const v of all) {
    console.log(`${v.impact?.toUpperCase()}: ${v.id}`);
    v.nodes.slice(0,2).forEach(n => {
      console.log(`  data-loc: ${n.html.match(/data-loc="([^"]+)"/)?.[1]}`);
      console.log(`  HTML: ${n.html.substring(0,150)}`);
    });
  }
});
