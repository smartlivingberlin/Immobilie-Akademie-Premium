import { test, expect } from '@playwright/test';
const BASE = 'https://immobilien-akademie-smart.de';

test('Login Formular — alle Elemente', async ({ page }) => {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);
  
  // Alle Input-Felder finden
  const inputs = await page.locator('input').all();
  console.log(`Input-Felder: ${inputs.length}`);
  for (const inp of inputs) {
    const type = await inp.getAttribute('type');
    const name = await inp.getAttribute('name');
    const placeholder = await inp.getAttribute('placeholder');
    console.log(`  Input: type=${type} name=${name} placeholder=${placeholder}`);
  }
  
  // Screenshot
  await page.screenshot({ path: 'tests/screenshots/login-debug.png', fullPage: true });
  
  // HTML der Login-Seite
  const html = await page.locator('form, [class*="login"], [class*="auth"]').first().innerHTML().catch(() => 'kein Form');
  console.log(`Form HTML: ${html.substring(0, 300)}`);
});

test('Login — mit Admin-Credentials', async ({ page }) => {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);
  
  // Flexibler Selector
  const emailInput = page.locator('input').first();
  const passwordInput = page.locator('input').nth(1);
  
  await emailInput.fill('alisadgadyri38@gmail.com');
  await passwordInput.fill('Admin2026!');
  
  await page.screenshot({ path: 'tests/screenshots/login-filled.png' });
  
  // Submit
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000);
  
  const currentUrl = page.url();
  console.log(`Nach Login URL: ${currentUrl}`);
  await page.screenshot({ path: 'tests/screenshots/login-after.png', fullPage: true });
  
  expect(currentUrl).not.toContain('/login');
});
