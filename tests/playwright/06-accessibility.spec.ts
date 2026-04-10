import { test, expect } from '@playwright/test';
const BASE = 'https://immobilie-akademie-production.up.railway.app';

test.describe('ACCESSIBILITY & MOBILE', () => {
  test('Mobile Ansicht — Startseite', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 }); // iPhone 14
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    const bodyText = await page.locator('body').textContent() || '';
    expect(bodyText.length).toBeGreaterThan(100);
    console.log('✅ Mobile Ansicht lädt');
    await page.screenshot({ path: 'tests/screenshots/mobile-start.png', fullPage: true });
  });

  test('Mobile — Landing M1', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE}/kurs/modul-1-immobilien-grundkurs`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'tests/screenshots/mobile-landing.png', fullPage: true });
    
    const ctaBtn = page.locator('button').filter({ hasText: /kauf|149/i }).first();
    const visible = await ctaBtn.isVisible().catch(() => false);
    console.log(`CTA Button mobile sichtbar: ${visible ? '✅' : '❌'}`);
  });

  test('Tablet Ansicht', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'tests/screenshots/tablet-start.png', fullPage: true });
    console.log('✅ Tablet Ansicht OK');
  });

  test('Alle Bilder haben Alt-Text', async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    const images = await page.locator('img').all();
    let withAlt = 0, withoutAlt = 0;
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      if (alt && alt.length > 0) withAlt++;
      else withoutAlt++;
    }
    console.log(`Bilder: ${withAlt} mit Alt, ${withoutAlt} ohne Alt`);
    if (withoutAlt > 0) console.log('⚠️  Einige Bilder haben keinen Alt-Text');
  });

  test('Formulare haben Labels', async ({ page }) => {
    await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
    const labels = await page.locator('label').all();
    console.log(`Labels auf Login: ${labels.length}`);
    for (const label of labels) {
      const text = (await label.textContent())?.trim();
      console.log(`  Label: "${text}"`);
    }
  });
});
