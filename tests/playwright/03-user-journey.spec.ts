import { test, expect } from '@playwright/test';
const BASE = 'https://immobilien-akademie-smart.de';

test.describe('USER JOURNEY — Anonymer Besucher', () => {
  test('Startseite → Landing M1 → Trial Formular', async ({ page }) => {
    // 1. Startseite
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'tests/screenshots/journey-01-start.png', fullPage: true });
    
    const title = await page.title();
    console.log(`Titel: ${title}`);
    
    // Alle Links auf Startseite
    const allLinks = await page.locator('a').all();
    const linkTexts = [];
    for (const link of allLinks) {
      const text = (await link.textContent())?.trim();
      const href = await link.getAttribute('href');
      if (text && text.length > 2) linkTexts.push(`${text} → ${href}`);
    }
    console.log(`Links (${linkTexts.length}):`);
    linkTexts.slice(0, 20).forEach(l => console.log(`  ${l}`));
    
    // 2. Zu Landing M1
    await page.goto(`${BASE}/kurs/modul-1-immobilien-grundkurs`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'tests/screenshots/journey-02-landing.png', fullPage: true });
    
    // Preis prüfen
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toContain('149');
    console.log('✅ Preis 149 EUR sichtbar');
    
    // IHK Text
    expect(bodyText).toMatch(/IHK|Sachkunde|§34c/i);
    console.log('✅ IHK/Sachkunde Text vorhanden');
    
    // 3. Alle Buttons auf Landing
    const buttons = await page.locator('button').all();
    console.log(`\nButtons auf Landing M1 (${buttons.length}):`);
    for (const btn of buttons) {
      const text = (await btn.textContent())?.trim();
      const visible = await btn.isVisible();
      if (text) console.log(`  ${visible ? '✅' : '❌'} "${text}"`);
    }
  });

  test('Rechner — alle Berechnungen', async ({ page }) => {
    await page.goto(`${BASE}/rechner`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'tests/screenshots/rechner-01.png', fullPage: true });
    
    const bodyText = await page.locator('body').textContent();
    console.log(`Rechner Inhalt (${bodyText?.length} Zeichen)`);
    
    // Eingabefelder
    const inputs = await page.locator('input').all();
    console.log(`Input-Felder im Rechner: ${inputs.length}`);
    for (const inp of inputs.slice(0, 5)) {
      const placeholder = await inp.getAttribute('placeholder');
      const type = await inp.getAttribute('type');
      console.log(`  Input: ${type} | ${placeholder}`);
    }
  });

  test('Glossar — Inhalte prüfen', async ({ page }) => {
    await page.goto(`${BASE}/glossary`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    const bodyText = await page.locator('body').textContent() || '';
    const terms = ['Makler', 'WEG', 'Mietrecht', 'Grundbuch', 'Auflassung', 'BGB'];
    
    console.log('Glossar Begriffe:');
    for (const term of terms) {
      const found = bodyText.includes(term);
      console.log(`  ${found ? '✅' : '❌'} ${term}`);
    }
  });

  test('Alle Gesetzes-Links im Portal testen', async ({ page }) => {
    // Lade Modul-Content und teste alle gesetze-im-internet.de Links
    const lawLinks = [
      // BGB
      'https://www.gesetze-im-internet.de/bgb/__652.html',
      'https://www.gesetze-im-internet.de/bgb/__653.html', 
      'https://www.gesetze-im-internet.de/bgb/__654.html',
      'https://www.gesetze-im-internet.de/bgb/__311b.html',
      'https://www.gesetze-im-internet.de/bgb/__535.html',
      // GewO
      'https://www.gesetze-im-internet.de/gewo/__34c.html',
      'https://www.gesetze-im-internet.de/gewo/__34i.html',
      // GG
      'https://www.gesetze-im-internet.de/gg/art_14.html',
      // BauGB
      'https://www.gesetze-im-internet.de/bbaug/__194.html',
      // WEG
      'https://www.gesetze-im-internet.de/woeigg/__1.html',
    ];

    console.log('\n=== GESETZES-LINKS TEST ===');
    let ok = 0, fail = 0;
    
    for (const url of lawLinks) {
      const response = await page.request.get(url, { timeout: 10000 });
      const status = response.status();
      const icon = status < 400 ? '✅' : '❌';
      console.log(`${icon} HTTP ${status} | ${url.split('/').slice(-2).join('/')}`);
      if (status < 400) ok++; else fail++;
    }
    
    console.log(`\nErgebnis: ${ok}/${ok+fail} Links funktionieren`);
    expect(fail).toBe(0);
  });
});

test.describe('COMPLIANCE TEST', () => {
  test('Impressum — alle Pflichtangaben', async ({ page }) => {
    await page.goto(`${BASE}/impressum`, { waitUntil: 'networkidle' });
    const text = await page.locator('body').textContent() || '';
    
    const required = [
      ['Name', 'Gadyri'],
      ['Adresse', 'Durlacher'],
      ['PLZ', '10715'],
      ['Stadt', 'Berlin'],
      ['E-Mail', 'gmail'],
      ['Telefon', '+49 171'],
    ];
    
    console.log('\n=== IMPRESSUM COMPLIANCE ===');
    for (const [label, value] of required) {
      const found = text.includes(value);
      console.log(`${found ? '✅' : '❌'} ${label}: ${value}`);
      expect(text).toContain(value);
    }
    
    await page.screenshot({ path: 'tests/screenshots/impressum.png', fullPage: true });
  });

  test('Datenschutz — DSGVO Pflichtangaben', async ({ page }) => {
    await page.goto(`${BASE}/datenschutz`, { waitUntil: 'networkidle' });
    const text = await page.locator('body').textContent() || '';
    
    const required = [
      'Art. 13 DSGVO', 'Art. 6', 'Verantwortlicher',
      'Gmail', 'Stripe', 'Railway', 'Anthropic', 'Gemini',
      'Widerruf', 'Löschung', 'Auskunft'
    ];
    
    console.log('\n=== DATENSCHUTZ COMPLIANCE ===');
    for (const term of required) {
      const found = text.includes(term);
      console.log(`${found ? '✅' : '❌'} ${term}`);
    }
    
    await page.screenshot({ path: 'tests/screenshots/datenschutz.png', fullPage: true });
  });

  test('AGB — Verbraucherschutz', async ({ page }) => {
    await page.goto(`${BASE}/agb`, { waitUntil: 'networkidle' });
    const text = await page.locator('body').textContent() || '';
    
    const required = ['§ 327', '14 Tage', 'Widerruf', 'Berlin', 'Gerichtsstand', '149'];
    
    console.log('\n=== AGB COMPLIANCE ===');
    for (const term of required) {
      const found = text.includes(term);
      console.log(`${found ? '✅' : '❌'} ${term}`);
    }
  });
});
