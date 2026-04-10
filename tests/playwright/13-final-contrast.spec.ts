import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const BASE = 'https://immobilie-akademie-production.up.railway.app';

test('Letzter Serious auf Landing M1', async ({ page }) => {
  await page.goto(`${BASE}/kurs/modul-1-immobilien-grundkurs`, 
    { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter(v => v.impact === 'serious');
  
  for (const v of serious) {
    console.log(`SERIOUS: ${v.id}`);
    v.nodes.forEach(n => {
      console.log(`  HTML: ${n.html.substring(0,200)}`);
      console.log(`  data-loc: ${n.html.match(/data-loc="([^"]+)"/)?.[1]}`);
    });
  }
});
