import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const BASE = 'https://immobilie-akademie-premium-production.up.railway.app';

test('Finde exakt den Button ohne Namen', async ({ page }) => {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const results = await new AxeBuilder({ page }).analyze();
  const btnIssue = results.violations.find(v => v.id === 'button-name');
  
  if (btnIssue) {
    console.log("BETROFFENE BUTTONS:");
    btnIssue.nodes.forEach((node, i) => {
      console.log(`\nButton ${i+1}:`);
      console.log(`  HTML: ${node.html}`);
      console.log(`  data-loc: ${node.html.match(/data-loc="([^"]+)"/)?.[1]}`);
    });
  }
  
  // Auch Landing M1
  await page.goto(`${BASE}/kurs/modul-1-immobilien-grundkurs`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const results2 = await new AxeBuilder({ page }).analyze();
  const btnIssue2 = results2.violations.find(v => v.id === 'button-name');
  if (btnIssue2) {
    console.log("\nLANDING M1 BUTTONS:");
    btnIssue2.nodes.forEach((node, i) => {
      console.log(`  HTML: ${node.html.substring(0,200)}`);
      console.log(`  data-loc: ${node.html.match(/data-loc="([^"]+)"/)?.[1]}`);
    });
  }
});
