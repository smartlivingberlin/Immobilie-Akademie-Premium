import { test, expect } from '@playwright/test';
const BASE = 'https://immobilie-akademie-premium-production.up.railway.app';

test.describe('PERFORMANCE & TECHNISCH', () => {
  test('Ladezeiten aller Seiten', async ({ page }) => {
    const pages = ['/', '/kurse', '/login', '/rechner', '/glossary', '/impressum'];
    
    console.log('\n=== LADEZEITEN ===');
    for (const path of pages) {
      const start = Date.now();
      await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: 15000 });
      const elapsed = Date.now() - start;
      const icon = elapsed < 2000 ? '✅' : elapsed < 4000 ? '⚠️' : '❌';
      console.log(`${icon} ${path}: ${elapsed}ms`);
    }
  });

  test('PWA Manifest vorhanden', async ({ page }) => {
    const resp = await page.request.get(`${BASE}/manifest.json`);
    expect(resp.status()).toBe(200);
    const manifest = await resp.json();
    console.log(`PWA Name: ${manifest.name}`);
    console.log(`PWA Icons: ${manifest.icons?.length}`);
    expect(manifest.name).toBeTruthy();
  });

  test('Security Headers vorhanden', async ({ page }) => {
    const resp = await page.request.get(`${BASE}/`);
    const headers = resp.headers();
    
    const securityHeaders = [
      'strict-transport-security',
      'x-frame-options', 
      'x-content-type-options',
      'content-security-policy',
    ];
    
    console.log('\n=== SECURITY HEADERS ===');
    for (const header of securityHeaders) {
      const val = headers[header];
      console.log(`${val ? '✅' : '❌'} ${header}: ${val?.substring(0,50) || 'FEHLT'}`);
      expect(val).toBeTruthy();
    }
  });

  test('Keine JavaScript Fehler auf Startseite', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));
    
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    console.log(`\nJS Fehler: ${errors.length}`);
    errors.forEach(e => console.log(`  ❌ ${e.substring(0, 100)}`));
    
    expect(errors.filter(e => !e.includes('plausible') && !e.includes('deprecated'))).toHaveLength(0);
  });
});
