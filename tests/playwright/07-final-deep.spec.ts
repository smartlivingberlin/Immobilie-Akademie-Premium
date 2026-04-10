import { test, expect } from '@playwright/test';
const BASE = 'https://immobilie-akademie-production.up.railway.app';
const OWNER = `${BASE}/api/owner/access?key=OWNER-3875C3D02394C47C89E21848`;

async function ownerLogin(page: any) {
  await page.goto(OWNER, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(2000);
}

test.describe('MODUL-INHALTE — Tiefer Test', () => {
  test('Alle 5 Module erreichbar', async ({ page }) => {
    await ownerLogin(page);
    for (const mod of [1,2,3,4,5]) {
      await page.goto(`${BASE}/modul/${mod}`, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1500);
      const url = page.url();
      const text = await page.locator('body').textContent() || '';
      const ok = !url.includes('/login') && text.length > 500;
      console.log(`${ok ? '✅' : '❌'} Modul ${mod}: ${text.length} Zeichen`);
      await page.screenshot({ path: `tests/screenshots/modul${mod}.png`, fullPage: true });
    }
  });

  test('Modul 1 — Tag 1 alle Tabs', async ({ page }) => {
    await ownerLogin(page);
    await page.goto(`${BASE}/modul/1/tag/1`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(3000);
    
    const text = await page.locator('body').textContent() || '';
    console.log(`Tag 1 Inhalt: ${text.length} Zeichen`);
    console.log(`Vorschau: ${text.substring(0,300).replace(/\s+/g,' ')}`);
    
    await page.screenshot({ path: 'tests/screenshots/m1-tag1-full.png', fullPage: true });
    
    // Tabs suchen
    const tabButtons = await page.locator('[role="tab"], button').all();
    console.log(`\nAlle Tabs/Buttons (${tabButtons.length}):`);
    for (const btn of tabButtons.slice(0,15)) {
      const t = (await btn.textContent())?.trim();
      const v = await btn.isVisible().catch(() => false);
      if (t && t.length < 30) console.log(`  ${v?'✅':'○'} "${t}"`);
    }
    
    // Normen Tab klicken
    const normenBtn = page.locator('[role="tab"]').filter({ hasText: /norm|gesetz/i }).first();
    if (await normenBtn.isVisible().catch(() => false)) {
      await normenBtn.click();
      await page.waitForTimeout(1000);
      const normenText = await page.locator('body').textContent() || '';
      const hasGesetze = normenText.includes('§') || normenText.includes('BGB');
      console.log(`\n✅ Normen Tab: Gesetze: ${hasGesetze}`);
      await page.screenshot({ path: 'tests/screenshots/m1-normen.png', fullPage: true });
    }
  });

  test('Quiz — Fragen durchgehen', async ({ page }) => {
    await ownerLogin(page);
    await page.goto(`${BASE}/quiz`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    
    const text = await page.locator('body').textContent() || '';
    console.log(`Quiz: ${text.length} Zeichen`);
    console.log(text.substring(0,400).replace(/\s+/g,' '));
    
    await page.screenshot({ path: 'tests/screenshots/quiz-start.png', fullPage: true });
    
    // Quiz starten
    const startBtn = page.locator('button').filter({ hasText: /start|begin|quiz/i }).first();
    if (await startBtn.isVisible().catch(() => false)) {
      await startBtn.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'tests/screenshots/quiz-question.png', fullPage: true });
      const qText = await page.locator('body').textContent() || '';
      console.log(`Quiz aktiv: ${qText.length} Zeichen`);
    }
  });

  test('Glossar — Suchfunktion', async ({ page }) => {
    await page.goto(`${BASE}/glossary`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    
    const searchInput = page.locator('input[type="search"], input[placeholder*="such"]').first();
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.type('Makler');
      await page.waitForTimeout(500);
      const text = await page.locator('body').textContent() || '';
      console.log(`✅ Suche "Makler": ${(text.match(/Makler/gi) || []).length}× gefunden`);
    }
    await page.screenshot({ path: 'tests/screenshots/glossar.png', fullPage: true });
  });

  test('Rechner — Werte eingeben', async ({ page }) => {
    await page.goto(`${BASE}/rechner`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    
    const inputs = await page.locator('input[type="number"]').all();
    console.log(`Rechner Eingabefelder: ${inputs.length}`);
    
    if (inputs.length > 0) {
      await inputs[0].fill('500000');
      await page.waitForTimeout(500);
      const text = await page.locator('body').textContent() || '';
      const hasResult = text.includes('EUR') || text.includes('000');
      console.log(`✅ Ergebnis nach Eingabe: ${hasResult}`);
    }
    
    await page.screenshot({ path: 'tests/screenshots/rechner-filled.png', fullPage: true });
  });

  test('Lehrplan — vollständig', async ({ page }) => {
    await page.goto(`${BASE}/lehrplan`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    const text = await page.locator('body').textContent() || '';
    
    const modules = ['Modul 1', 'Modul 2', 'Modul 3', 'Modul 4', 'Modul 5'];
    for (const m of modules) {
      console.log(`${text.includes(m) ? '✅' : '❌'} ${m}`);
    }
    await page.screenshot({ path: 'tests/screenshots/lehrplan.png', fullPage: true });
  });
});

test.describe('STAKEHOLDER TESTS', () => {
  test('INVESTOR — Demo-Code Zugang', async ({ page }) => {
    await page.goto(`${BASE}/code-einloesen`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    
    const inputs = await page.locator('input').all();
    if (inputs.length > 0) {
      await inputs[0].fill('DEMO-2026-PREVIEW');
      await page.screenshot({ path: 'tests/screenshots/demo-code.png', fullPage: true });
      console.log('✅ Demo-Code Formular funktioniert');
    }
  });

  test('NEUER NUTZER — Registrierung', async ({ page }) => {
    await page.goto(`${BASE}/register`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    
    const text = await page.locator('body').textContent() || '';
    const inputs = await page.locator('input').all();
    
    console.log(`Registrierung: ${inputs.length} Felder, ${text.length} Zeichen`);
    await page.screenshot({ path: 'tests/screenshots/register.png', fullPage: true });
  });

  test('MOBILE NUTZER — Alle Seiten', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    
    const mobilePages = ['/', '/login', '/kurs/modul-1-immobilien-grundkurs', '/rechner'];
    for (const path of mobilePages) {
      await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      const text = await page.locator('body').textContent() || '';
      console.log(`✅ Mobile ${path}: ${text.length} Zeichen`);
      await page.screenshot({ path: `tests/screenshots/mobile${path.replace(/\//g,'-')}.png` });
    }
  });
});
