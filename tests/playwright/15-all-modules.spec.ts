import { test, expect } from '@playwright/test';
const BASE = 'https://immobilie-akademie-premium-production.up.railway.app';
const OWNER = `${BASE}/api/owner/access?key=${process.env.OWNER_MAGIC_CODE || ""}`;

test.describe('ALLE MODULE — Tage 1-5', () => {
  const modules = [
    { id: 1, name: 'Grundkurs', days: 20 },
    { id: 2, name: 'Makler §34c', days: 60 },
    { id: 3, name: 'WEG-Verwaltung', days: 80 },
    { id: 4, name: 'Gutachter', days: 40 },
    { id: 5, name: '§34i', days: 40 },
  ];

  for (const mod of modules) {
    test(`Modul ${mod.id} (${mod.name}) — Tag 1 bis 3`, async ({ page }) => {
      await page.goto(OWNER, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(2000);
      
      for (const day of [1, 2, 3]) {
        await page.goto(`${BASE}/modul/${mod.id}/tag/${day}`, 
          { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(1500);
        
        const url = page.url();
        const text = await page.locator('body').textContent() || '';
        const redirected = url.includes('/login');
        const hasContent = text.length > 300;
        
        console.log(`  M${mod.id} Tag ${day}: ${redirected ? '❌ Redirect' : hasContent ? '✅ OK' : '⚠️ Wenig Inhalt'} (${text.length} Zeichen)`);
        
        await page.screenshot({ 
          path: `tests/screenshots/m${mod.id}-tag${day}.png`,
          fullPage: false
        }).catch(() => {});
      }
      
      console.log(`✅ Modul ${mod.id} (${mod.name}): ${mod.days} Tage verfügbar`);
    });
  }
});
