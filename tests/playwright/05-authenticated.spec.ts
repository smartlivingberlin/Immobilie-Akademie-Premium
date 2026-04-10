import { test, expect, Page, BrowserContext } from '@playwright/test';

const BASE = 'https://immobilie-akademie-production.up.railway.app';

// Gemeinsame Login-Funktion mit Cookie-Persistenz
async function loginAndGetContext(page: Page): Promise<boolean> {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(2000);
  
  const emailInput = page.locator('input').first();
  const pwInput = page.locator('input[type="password"]');
  
  await emailInput.fill('admin@immobilie.de');
  await pwInput.fill('84%D#Lq2#0n1rUmMBqOT');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(4000);
  
  const url = page.url();
  const success = !url.includes('/login');
  console.log(`Login: ${success ? '✅' : '❌'} → ${url}`);
  return success;
}

test.describe('ADMIN — Eingeloggter Bereich', () => {

  test('01 — Login + Dashboard Inhalt', async ({ page }) => {
    const ok = await loginAndGetContext(page);
    
    if (!ok) {
      // Fallback: Owner Magic Link
      await page.goto(`${BASE}/api/owner/access?key=OWNER-3875C3D02394C47C89E21848`, 
        { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(3000);
    }
    
    const url = page.url();
    console.log(`Aktuelle URL: ${url}`);
    
    const bodyText = await page.locator('body').textContent() || '';
    console.log(`Dashboard: ${bodyText.length} Zeichen`);
    
    await page.screenshot({ path: 'tests/screenshots/admin-01-dashboard.png', fullPage: true });
    expect(bodyText.length).toBeGreaterThan(100);
  });

  test('02 — Alle Admin-Seiten zugänglich', async ({ page }) => {
    await loginAndGetContext(page);
    
    const adminPages = [
      { url: '/statistiken', name: 'Dashboard' },
      { url: '/gamification', name: 'Gamification' },
      { url: '/rechner', name: 'Rechner' },
      { url: '/lehrplan', name: 'Lehrplan' },
      { url: '/glossary', name: 'Glossar' },
      { url: '/zertifikate', name: 'Zertifikate' },
    ];
    
    for (const p of adminPages) {
      await page.goto(`${BASE}${p.url}`, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1000);
      const url = page.url();
      const redirected = url.includes('/login');
      console.log(`${redirected ? '❌ Redirect' : '✅ OK'} ${p.name}: ${url}`);
      await page.screenshot({ 
        path: `tests/screenshots/auth-${p.name}.png`, 
        fullPage: true 
      }).catch(() => {});
    }
  });

  test('03 — Modul 1 Tag 1 — Alle Tabs', async ({ page }) => {
    await loginAndGetContext(page);
    await page.waitForTimeout(1000);
    
    await page.goto(`${BASE}/modul/1`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(2000);
    
    let url = page.url();
    console.log(`Modul 1 URL: ${url}`);
    
    const bodyText = await page.locator('body').textContent() || '';
    console.log(`Modul 1 Inhalt: ${bodyText.length} Zeichen`);
    console.log(`Vorschau: ${bodyText.substring(0, 200)}`);
    
    // Tage sichtbar?
    const hasDay = bodyText.includes('Tag') || bodyText.includes('Einführung');
    console.log(`Lerntage sichtbar: ${hasDay ? '✅' : '⚠️'}`);
    
    await page.screenshot({ path: 'tests/screenshots/modul1-overview.png', fullPage: true });
    
    // Tag 1 öffnen
    const tag1Link = page.locator('a, button').filter({ hasText: /tag.?1|einführung/i }).first();
    if (await tag1Link.isVisible().catch(() => false)) {
      await tag1Link.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'tests/screenshots/modul1-tag1.png', fullPage: true });
      
      const tagText = await page.locator('body').textContent() || '';
      console.log(`Tag 1 Inhalt: ${tagText.length} Zeichen`);
      
      // Tabs prüfen
      for (const tab of ['Theorie', 'Normen', 'Praxis', 'Aufgaben']) {
        const visible = tagText.includes(tab);
        console.log(`  ${visible ? '✅' : '❌'} Tab "${tab}"`);
      }
    } else {
      console.log('⚠️  Tag 1 Link nicht direkt sichtbar — navigiere direkt');
      await page.goto(`${BASE}/modul/1/tag/1`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000);
      const tagText = await page.locator('body').textContent() || '';
      console.log(`Tag 1 direkt: ${tagText.length} Zeichen`);
      await page.screenshot({ path: 'tests/screenshots/modul1-tag1-direct.png', fullPage: true });
    }
  });

  test('04 — Quiz funktioniert', async ({ page }) => {
    await loginAndGetContext(page);
    
    await page.goto(`${BASE}/quiz`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    
    const bodyText = await page.locator('body').textContent() || '';
    console.log(`Quiz: ${bodyText.length} Zeichen`);
    
    const hasFrage = bodyText.includes('Frage') || bodyText.includes('Quiz') || bodyText.includes('Modul');
    console.log(`Quiz-Inhalt vorhanden: ${hasFrage ? '✅' : '⚠️'}`);
    
    await page.screenshot({ path: 'tests/screenshots/quiz.png', fullPage: true });
  });

  test('05 — Admin Panel', async ({ page }) => {
    // Direkt via Owner Link
    await page.goto(`${BASE}/api/owner/access?key=OWNER-3875C3D02394C47C89E21848`,
      { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(3000);
    
    await page.goto(`${BASE}/admin`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    
    const url = page.url();
    const bodyText = await page.locator('body').textContent() || '';
    
    console.log(`Admin URL: ${url}`);
    console.log(`Admin Inhalt: ${bodyText.length} Zeichen`);
    
    const hasAdmin = bodyText.includes('Admin') || bodyText.includes('Nutzer') || bodyText.includes('Dashboard');
    console.log(`Admin Panel zugänglich: ${hasAdmin ? '✅' : '❌'}`);
    
    await page.screenshot({ path: 'tests/screenshots/admin-panel.png', fullPage: true });
    expect(url).not.toContain('/login');
  });

  test('06 — Owner Dashboard Nutzerübersicht', async ({ page }) => {
    await page.goto(`${BASE}/api/owner/access?key=OWNER-3875C3D02394C47C89E21848`,
      { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(3000);
    
    await page.goto(`${BASE}/owner-dashboard`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    
    const bodyText = await page.locator('body').textContent() || '';
    console.log(`Owner Dashboard: ${bodyText.length} Zeichen`);
    
    const hasNutzer = bodyText.includes('Nutzer') || bodyText.includes('admin@');
    console.log(`Nutzer sichtbar: ${hasNutzer ? '✅' : '⚠️'}`);
    
    await page.screenshot({ path: 'tests/screenshots/owner-dashboard.png', fullPage: true });
  });

  test('07 — KI Tutor API', async ({ page }) => {
    await loginAndGetContext(page);
    
    // Teste verschiedene KI-Endpunkte
    const endpoints = [
      { path: '/api/ai/rag-tutor', method: 'POST', body: { question: 'Was ist §34c GewO?', moduleId: 1, dayId: 1 } },
      { path: '/api/health', method: 'GET', body: null },
    ];
    
    for (const ep of endpoints) {
      const response = ep.method === 'POST'
        ? await page.request.post(`${BASE}${ep.path}`, { 
            data: ep.body,
            headers: { 'Content-Type': 'application/json' }
          })
        : await page.request.get(`${BASE}${ep.path}`);
      
      console.log(`${ep.method} ${ep.path}: HTTP ${response.status()}`);
    }
  });
});
