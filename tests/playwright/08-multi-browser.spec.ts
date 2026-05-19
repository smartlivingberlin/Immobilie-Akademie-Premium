import { test, expect } from '@playwright/test';
const BASE = 'https://immobilie-akademie-premium-production.up.railway.app';

test('Startseite lädt in allen Browsern', async ({ page, browserName }) => {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  const title = await page.title();
  const text = await page.locator('body').textContent() || '';
  console.log(`${browserName}: "${title}" | ${text.length} Zeichen`);
  expect(text.length).toBeGreaterThan(500);
  await page.screenshot({ 
    path: `tests/screenshots/browser-${browserName}-start.png`, 
    fullPage: true 
  });
});

test('Login funktioniert in allen Browsern', async ({ page, browserName }) => {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  const inputs = await page.locator('input').count();
  console.log(`${browserName}: ${inputs} Input-Felder`);
  expect(inputs).toBeGreaterThan(0);
  await page.screenshot({ path: `tests/screenshots/browser-${browserName}-login.png` });
});

test('Landing M1 in allen Browsern', async ({ page, browserName }) => {
  await page.goto(`${BASE}/kurs/modul-1-immobilien-grundkurs`, { waitUntil: 'networkidle' });
  const text = await page.locator('body').textContent() || '';
  const has149 = text.includes('149');
  console.log(`${browserName}: Preis 149: ${has149 ? '✅' : '❌'} | ${text.length} Zeichen`);
  await page.screenshot({ path: `tests/screenshots/browser-${browserName}-landing.png`, fullPage: true });
});
