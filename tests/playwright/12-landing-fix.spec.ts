import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const BASE = 'https://immobilien-akademie-smart.de';

test('Landing M1 Critical Button finden', async ({ page }) => {
  await page.goto(`${BASE}/kurs/modul-1-immobilien-grundkurs`, 
    { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const results = await new AxeBuilder({ page }).analyze();
  const critical = results.violations.filter(v => v.impact === 'critical');
  
  for (const v of critical) {
    console.log(`\nCRITICAL: ${v.id} — ${v.description}`);
    v.nodes.forEach(n => {
      console.log(`  HTML: ${n.html.substring(0,300)}`);
      console.log(`  data-loc: ${n.html.match(/data-loc="([^"]+)"/)?.[1]}`);
      console.log(`  Fix: ${n.failureSummary?.substring(0,100)}`);
    });
  }
  
  // Alle Buttons ohne sichtbaren Text
  const btns = await page.locator('button').all();
  console.log(`\nAlle Buttons (${btns.length}):`);
  for (const btn of btns) {
    const text = (await btn.textContent())?.trim();
    const ariaLabel = await btn.getAttribute('aria-label');
    const visible = await btn.isVisible().catch(() => false);
    if (!text && !ariaLabel && visible) {
      const html = await btn.evaluate(el => el.outerHTML);
      console.log(`  ❌ Button ohne Text/Label: ${html.substring(0,200)}`);
    }
  }
});
