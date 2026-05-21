import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE = 'https://immobilien-akademie-smart.de';

test('Accessibility Details — was genau ist das Problem?', async ({ page }) => {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  
  console.log('\n=== LOGIN ACCESSIBILITY ISSUES ===');
  for (const violation of results.violations) {
    console.log(`\n${violation.impact?.toUpperCase()} — ${violation.id}`);
    console.log(`  Beschreibung: ${violation.description}`);
    console.log(`  Hilfe: ${violation.helpUrl}`);
    violation.nodes.slice(0,2).forEach(node => {
      console.log(`  Element: ${node.html.substring(0,100)}`);
    });
  }
});

test('Accessibility Details — Startseite', async ({ page }) => {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  
  console.log('\n=== STARTSEITE ACCESSIBILITY ISSUES ===');
  for (const violation of results.violations) {
    console.log(`\n${violation.impact?.toUpperCase()} — ${violation.id}`);
    console.log(`  Beschreibung: ${violation.description}`);
    violation.nodes.slice(0,1).forEach(node => {
      console.log(`  Element: ${node.html.substring(0,150)}`);
      console.log(`  Fix: ${node.failureSummary?.substring(0,100)}`);
    });
  }
});
