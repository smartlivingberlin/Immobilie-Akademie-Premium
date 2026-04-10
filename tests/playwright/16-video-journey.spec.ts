import { test, expect } from '@playwright/test';
const BASE = 'https://immobilie-akademie-production.up.railway.app';

test('VIDEO: Anonymer Besucher Journey', async ({ page }) => {
  // Startseite
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Landing Page
  await page.goto(`${BASE}/kurs/modul-1-immobilien-grundkurs`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Login
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  // Code einlösen
  await page.goto(`${BASE}/code-einloesen`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  console.log('✅ Anonymer Besucher Journey aufgezeichnet');
});

test('VIDEO: Admin Journey', async ({ page }) => {
  await page.goto(
    `${BASE}/api/owner/access?key=OWNER-3875C3D02394C47C89E21848`,
    { waitUntil: 'networkidle', timeout: 20000 }
  );
  await page.waitForTimeout(2000);
  
  for (const path of ['/statistiken', '/admin', '/owner-dashboard', '/gamification', '/quiz']) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1500);
    const text = await page.locator('body').textContent() || '';
    console.log(`✅ ${path}: ${text.length} Zeichen`);
  }
});
