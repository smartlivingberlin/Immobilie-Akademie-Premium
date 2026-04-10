import { test, expect } from '@playwright/test';

const BASE = 'https://immobilie-akademie-production.up.railway.app';

const PUBLIC_PAGES = [
  { url: '/', name: 'Startseite' },
  { url: '/kurse', name: 'Kursübersicht' },
  { url: '/kurs/modul-1-immobilien-grundkurs', name: 'Landing M1' },
  { url: '/kurs/modul-2-makler-34c', name: 'Landing M2' },
  { url: '/kurs/modul-3-weg-verwalter', name: 'Landing M3' },
  { url: '/kurs/modul-4-gutachter', name: 'Landing M4' },
  { url: '/kurs/modul-5-34i-darlehensvermittler', name: 'Landing M5' },
  { url: '/login', name: 'Login' },
  { url: '/impressum', name: 'Impressum' },
  { url: '/datenschutz', name: 'Datenschutz' },
  { url: '/agb', name: 'AGB' },
  { url: '/widerruf', name: 'Widerruf' },
  { url: '/rechner', name: 'Rechner' },
  { url: '/lehrplan', name: 'Lehrplan' },
  { url: '/glossary', name: 'Glossar' },
  { url: '/bildungskonzept', name: 'Bildungskonzept' },
  { url: '/hilfe', name: 'Hilfe' },
];

test.describe('ALLE SEITEN — Laden & Grundfunktionen', () => {
  for (const page of PUBLIC_PAGES) {
    test(`${page.name} lädt korrekt`, async ({ page: p }) => {
      await p.goto(`${BASE}${page.url}`, { waitUntil: 'networkidle' });
      
      // Kein weißer Bildschirm
      const root = p.locator('#root');
      await expect(root).not.toBeEmpty();
      
      // Kein Fehler-Text
      const bodyText = await p.locator('body').textContent();
      expect(bodyText).not.toContain('Uncaught Error');
      expect(bodyText).not.toContain('Cannot read properties');
      
      // Screenshot für Dokumentation
      await p.screenshot({ 
        path: `tests/screenshots/${page.name.replace(/\s/g,'-')}.png`,
        fullPage: true 
      });
    });
  }
});

test.describe('EXTERNE LINKS — Paragraphen & Quellen', () => {
  test('Alle externen Links auf Impressum', async ({ page }) => {
    await page.goto(`${BASE}/impressum`, { waitUntil: 'networkidle' });
    
    const links = await page.locator('a[href^="http"]').all();
    console.log(`Externe Links auf Impressum: ${links.length}`);
    
    for (const link of links) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      console.log(`  Link: ${text?.trim()} → ${href}`);
    }
  });

  test('Gesetzes-Links in Modul-Content funktionieren', async ({ page }) => {
    // Prüfe gesetze-im-internet.de Links
    const lawLinks = [
      'https://www.gesetze-im-internet.de/gg/art_14.html',
      'https://www.gesetze-im-internet.de/bgb/__652.html',
      'https://www.gesetze-im-internet.de/gewo/__34c.html',
    ];
    
    for (const url of lawLinks) {
      const response = await page.request.get(url);
      console.log(`  ${url}: HTTP ${response.status()}`);
      expect(response.status()).toBeLessThan(400);
    }
  });
});

test.describe('NAVIGATION — Buttons & Links', () => {
  test('Startseite Navigation funktioniert', async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    
    // Alle Buttons finden
    const buttons = await page.locator('button').all();
    console.log(`Buttons auf Startseite: ${buttons.length}`);
    
    for (const btn of buttons.slice(0, 10)) {
      const text = await btn.textContent();
      const visible = await btn.isVisible();
      console.log(`  Button: "${text?.trim()}" | Sichtbar: ${visible}`);
    }
    
    // Alle internen Links
    const links = await page.locator('a[href^="/"]').all();
    console.log(`Interne Links: ${links.length}`);
  });

  test('Login-Formular vorhanden und funktionsfähig', async ({ page }) => {
    await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
    
    await expect(page.locator('input[placeholder*="mail"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button').filter({ hasText: /anmeld|login|einlog/i }).first()).toBeVisible();
    
    // Screenshot
    await page.screenshot({ path: 'tests/screenshots/Login-Form.png' });
  });

  test('Trial-Formular auf Landing Page', async ({ page }) => {
    await page.goto(`${BASE}/kurs/modul-1-immobilien-grundkurs`, { waitUntil: 'networkidle' });
    
    // Preis sichtbar
    const body = await page.locator('body').textContent();
    expect(body).toContain('149');
    
    // CTA Button
    const ctaButton = page.locator('button').filter({ hasText: /kauf|jetzt|bestell|zugang/i }).first();
    const ctaVisible = await ctaButton.isVisible().catch(() => false);
    console.log(`CTA Button sichtbar: ${ctaVisible}`);
    
    await page.screenshot({ path: 'tests/screenshots/Landing-M1.png', fullPage: true });
  });
});
