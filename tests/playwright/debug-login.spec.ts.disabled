import { test, expect } from '@playwright/test';
const BASE = 'https://immobilie-akademie-production.up.railway.app';

test('Login Debug — direkt via API', async ({ page }) => {
  // Methode 1: Via API direkt
  const response = await page.request.post(`${BASE}/api/auth/login`, {
    data: { 
      email: 'admin@immobilie.de', 
      password: '84%D#Lq2#0n1rUmMBqOT' 
    },
    headers: { 'Content-Type': 'application/json' }
  });
  console.log(`API Login: HTTP ${response.status()}`);
  const body = await response.text();
  console.log(`Response: ${body.substring(0, 200)}`);
});

test('Login Debug — Formular mit fillInput', async ({ page }) => {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Direkt via JavaScript setzen (umgeht Sonderzeichen-Probleme)
  await page.evaluate(() => {
    const inputs = document.querySelectorAll('input');
    if (inputs[0]) (inputs[0] as HTMLInputElement).value = 'admin@immobilie.de';
    if (inputs[1]) (inputs[1] as HTMLInputElement).value = '84%D#Lq2#0n1rUmMBqOT';
  });
  
  // React State triggern
  const emailInput = page.locator('input').first();
  const pwInput = page.locator('input').nth(1);
  
  await emailInput.click();
  await emailInput.selectAll();
  await emailInput.type('admin@immobilie.de');
  
  await pwInput.click();
  await pwInput.selectAll();
  await pwInput.type('84%D#Lq2#0n1rUmMBqOT');
  
  await page.screenshot({ path: 'tests/screenshots/debug-login-filled.png' });
  
  // Submit Button klicken
  const submitBtn = page.locator('button').filter({ hasText: /anmeld|login|einlog/i }).first();
  if (await submitBtn.isVisible().catch(() => false)) {
    await submitBtn.click();
  } else {
    await page.keyboard.press('Enter');
  }
  
  await page.waitForTimeout(4000);
  const url = page.url();
  console.log(`Nach Login: ${url}`);
  await page.screenshot({ path: 'tests/screenshots/debug-login-after.png', fullPage: true });
});

test('Owner Link — direkter Zugang', async ({ page }) => {
  await page.goto(
    `${BASE}/api/owner/access?key=OWNER-3875C3D02394C47C89E21848`,
    { waitUntil: 'networkidle', timeout: 20000 }
  );
  await page.waitForTimeout(3000);
  
  const url = page.url();
  console.log(`Owner Zugang URL: ${url}`);
  
  // Jetzt geschützte Seiten testen
  const protectedPages = [
    '/statistiken', '/gamification', '/zertifikate', 
    '/modul/1', '/quiz', '/admin'
  ];
  
  for (const path of protectedPages) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1500);
    const currentUrl = page.url();
    const redirected = currentUrl.includes('/login');
    const bodyText = await page.locator('body').textContent() || '';
    console.log(`${redirected ? '❌' : '✅'} ${path}: ${bodyText.length} Zeichen`);
    await page.screenshot({ 
      path: `tests/screenshots/auth${path.replace(/\//g,'-')}.png`, 
      fullPage: true 
    }).catch(() => {});
  }
});
