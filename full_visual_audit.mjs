import { chromium } from '@playwright/test';
import fs from 'fs';

const BASE = 'https://immobilie-akademie-production.up.railway.app';
const SCREENSHOTS_DIR = './audit_screenshots';

if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR);

const browser = await chromium.launch();

// ══════════════════════════════════════
// HILFSFUNKTIONEN
// ══════════════════════════════════════
async function fullPageScreenshot(page, name) {
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: `${SCREENSHOTS_DIR}/${name}.png`, 
    fullPage: true 
  });
  console.log(`📸 Screenshot: ${name}.png`);
}

async function getText(page) {
  return await page.evaluate(() => document.body.innerText);
}

async function getButtons(page) {
  return await page.evaluate(() => {
    const btns = [];
    document.querySelectorAll('button, a[href], [role="button"]').forEach(el => {
      const text = el.innerText?.trim();
      const href = el.getAttribute('href');
      if (text && text.length > 0 && text.length < 60) {
        btns.push({ text, href: href || 'button', tag: el.tagName });
      }
    });
    return [...new Set(btns.map(b => JSON.stringify(b)))].map(b => JSON.parse(b)).slice(0, 30);
  });
}

let report = '';
let issues = [];
let page;

report += '═'.repeat(70) + '\n';
report += 'VOLLSTÄNDIGER VISUELLER AUDIT — IMMOBILIEN AKADEMIE SMART\n';
report += `Datum: ${new Date().toLocaleString('de-DE')}\n`;
report += '═'.repeat(70) + '\n\n';

// ══════════════════════════════════════
// 1. ÖFFENTLICHE SEITEN (ohne Login)
// ══════════════════════════════════════
report += '■ BLOCK 1: ÖFFENTLICHE SEITEN\n' + '─'.repeat(70) + '\n\n';

const publicPages = [
  { path: '/', name: '01_startseite', label: 'Startseite' },
  { path: '/kurse', name: '02_kurse', label: 'Kursübersicht' },
  { path: '/lehrplan', name: '03_lehrplan', label: 'Lehrplan' },
  { path: '/glossary', name: '04_glossar', label: 'Glossar' },
  { path: '/bildungskonzept', name: '05_bildungskonzept', label: 'Bildungskonzept' },
  { path: '/kurs/modul-1-immobilien-grundkurs', name: '06_landing_m1', label: 'Landing Modul 1' },
  { path: '/kurs/modul-2-makler-34c', name: '07_landing_m2', label: 'Landing Modul 2' },
  { path: '/kurs/modul-3-weg-verwalter', name: '08_landing_m3', label: 'Landing Modul 3' },
  { path: '/kurs/modul-4-gutachter', name: '09_landing_m4', label: 'Landing Modul 4' },
  { path: '/kurs/modul-5-34i-darlehensvermittler', name: '10_landing_m5', label: 'Landing Modul 5' },
];

const context1 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
for (const pg of publicPages) {
  page = await context1.newPage();
  report += `📄 ${pg.label} (${pg.path})\n`;
  try {
    await page.goto(BASE + pg.path, { waitUntil: 'networkidle', timeout: 25000 });
    await fullPageScreenshot(page, pg.name);
    
    const text = await getText(page);
    const buttons = await getButtons(page);
    
    // H1/H2 Überschriften
    const headings = await page.evaluate(() => {
      const h = [];
      document.querySelectorAll('h1,h2').forEach(el => {
        if (el.innerText?.trim()) h.push(`${el.tagName}: ${el.innerText.trim().substring(0,80)}`);
      });
      return h.slice(0, 5);
    });
    
    report += `  Überschriften: ${headings.join(' | ')}\n`;
    report += `  Klickbare Elemente: ${buttons.map(b => b.text).join(', ').substring(0, 120)}\n`;
    
    // Inhaltsprüfungen
    const checks = [
      { pattern: /1760|1\.760/, issue: '❌ Veraltete Zahl 1760' },
      { pattern: /220\s*(tage|ausb)/i, issue: '❌ Veraltete Zahl 220 Tage' },
      { pattern: /199,00\s*€/, issue: '❌ Alter Preis 199€ Modul 1' },
      { pattern: /Einführung in die Immobilienwirtschaft/, issue: '⚠️ Alter Modul-1-Name' },
      { pattern: /railway\.app/i, issue: '⚠️ Railway URL sichtbar' },
      { pattern: /undefined|null|NaN/i, issue: '❌ JS Fehler sichtbar' },
      { pattern: /error|fehler/i, issue: '⚠️ Fehlermeldung sichtbar' },
    ];
    
    for (const c of checks) {
      if (c.pattern.test(text)) {
        report += `  ${c.issue}\n`;
        issues.push({ page: pg.label, issue: c.issue });
      }
    }
    
    // Positive Checks
    const positives = [
      { pattern: /1920|1\.920/, label: '✅ 1920 UE' },
      { pattern: /240\s*tage/i, label: '✅ 240 Tage' },
    ];
    for (const p of positives) {
      if (p.pattern.test(text)) report += `  ${p.label}\n`;
    }
    
    report += '\n';
  } catch(e) {
    report += `  ❌ FEHLER: ${e.message.substring(0,60)}\n\n`;
    issues.push({ page: pg.label, issue: `Ladefehler: ${e.message.substring(0,40)}` });
  }
  await page.close();
}
await context1.close();

// ══════════════════════════════════════
// 2. LOGIN
// ══════════════════════════════════════
report += '■ BLOCK 2: LOGIN & AUTH\n' + '─'.repeat(70) + '\n\n';

const context2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
page = await context2.newPage();
await page.goto(BASE + '/login', { waitUntil: 'networkidle' });
await fullPageScreenshot(page, '11_login_seite');

// Login durchführen
await page.fill('input[type="email"], input[name="email"]', 'admin@immobilie.de');
await page.fill('input[type="password"], input[name="password"]', 'Admin1234!');
await fullPageScreenshot(page, '12_login_ausgefüllt');
await page.click('button[type="submit"], button:has-text("Einloggen"), button:has-text("Login"), button:has-text("Anmelden")');
await page.waitForTimeout(3000);
await fullPageScreenshot(page, '13_nach_login');
report += `  Login-URL nach Login: ${page.url()}\n`;
report += `  Login Status: ${page.url().includes('dashboard') ? '✅ Redirect zu Dashboard' : '⚠️ ' + page.url()}\n\n`;

// ══════════════════════════════════════
// 3. DASHBOARD & MODUL-BEREICHE
// ══════════════════════════════════════
report += '■ BLOCK 3: DASHBOARD & MODULE\n' + '─'.repeat(70) + '\n\n';

const dashPages = [
  { path: '/dashboard', name: '14_dashboard', label: 'Dashboard' },
  { path: '/module/1', name: '15_modul1', label: 'Modul 1' },
  { path: '/module/2', name: '16_modul2', label: 'Modul 2' },
  { path: '/module/3', name: '17_modul3', label: 'Modul 3' },
  { path: '/module/4', name: '18_modul4', label: 'Modul 4' },
  { path: '/module/5', name: '19_modul5', label: 'Modul 5' },
  { path: '/flashcards', name: '20_flashcards', label: 'Flashcards' },
  { path: '/glossary', name: '21_glossar_loggedin', label: 'Glossar (eingeloggt)' },
];

for (const pg of dashPages) {
  try {
    await page.goto(BASE + pg.path, { waitUntil: 'networkidle', timeout: 20000 });
    await fullPageScreenshot(page, pg.name);
    const text = await getText(page);
    report += `📄 ${pg.label}: ${text.substring(0,100).replace(/\n/g,' ')}...\n`;
  } catch(e) {
    report += `📄 ${pg.label}: ❌ ${e.message.substring(0,50)}\n`;
  }
}
report += '\n';

// ══════════════════════════════════════
// 4. ADMIN BEREICHE
// ══════════════════════════════════════
report += '■ BLOCK 4: ADMIN-TOOLS\n' + '─'.repeat(70) + '\n\n';

const adminPages = [
  { path: '/admin', name: '22_admin_dashboard', label: 'Admin Dashboard' },
  { path: '/admin/ki-monitor', name: '23_ki_monitor', label: 'KI-Monitor' },
  { path: '/admin/portal-agent', name: '24_portal_agent', label: 'Portal-Agent' },
  { path: '/admin/kursbuch', name: '25_kursbuch', label: 'Kursbuch-Generator' },
  { path: '/admin/mediaskript', name: '26_mediaskript', label: 'Mediaskript-Generator' },
  { path: '/admin/dozenten', name: '27_dozenten', label: 'Dozenten-Cockpit' },
  { path: '/admin/fragen', name: '28_fragen', label: 'Fragen-Manager' },
  { path: '/admin/upload', name: '29_upload', label: 'Content Upload' },
  { path: '/admin/nutzer', name: '30_nutzer', label: 'Nutzerverwaltung' },
  { path: '/admin/loesungen', name: '31_loesungen', label: 'Dozenten Lösungen' },
];

for (const pg of adminPages) {
  try {
    await page.goto(BASE + pg.path, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(1500);
    await fullPageScreenshot(page, pg.name);
    const text = await getText(page);
    const buttons = await getButtons(page);
    report += `🔧 ${pg.label}:\n`;
    report += `   Buttons: ${buttons.slice(0,8).map(b=>b.text).join(' | ')}\n`;
    if (text.includes('Kein Zugriff') || text.includes('Unauthorized')) {
      report += `   ⚠️ Zugriff verweigert!\n`;
      issues.push({ page: pg.label, issue: 'Zugriff verweigert' });
    }
    report += `   Inhalt: ${text.substring(0,80).replace(/\n/g,' ')}...\n\n`;
  } catch(e) {
    report += `🔧 ${pg.label}: ❌ ${e.message.substring(0,50)}\n\n`;
  }
}

// ══════════════════════════════════════
// 5. RECHTLICHE SEITEN
// ══════════════════════════════════════
report += '■ BLOCK 5: RECHTLICHE SEITEN\n' + '─'.repeat(70) + '\n\n';

const legalPages = [
  { path: '/impressum', name: '32_impressum', label: 'Impressum' },
  { path: '/datenschutz', name: '33_datenschutz', label: 'Datenschutz' },
  { path: '/agb', name: '34_agb', label: 'AGB' },
  { path: '/widerruf', name: '35_widerruf', label: 'Widerruf' },
];

for (const pg of legalPages) {
  try {
    await page.goto(BASE + pg.path, { waitUntil: 'networkidle', timeout: 15000 });
    await fullPageScreenshot(page, pg.name);
    const text = await getText(page);
    
    // Pflichtangaben prüfen
    const legalChecks = [
      { pattern: /Durlacher/, label: '✅ Adresse vorhanden' },
      { pattern: /Berlin/, label: '✅ Stadt vorhanden' },
      { pattern: /Datenschutz/i, label: '✅ Datenschutz-Begriff' },
      { pattern: /Widerruf/i, label: '✅ Widerruf-Begriff' },
      { pattern: /14\s*Tage/, label: '✅ 14-Tage Widerruf' },
    ];
    
    report += `⚖️ ${pg.label}:\n`;
    for (const c of legalChecks) {
      if (c.pattern.test(text)) report += `   ${c.label}\n`;
    }
    report += `   Länge: ${text.length} Zeichen\n\n`;
  } catch(e) {
    report += `⚖️ ${pg.label}: ❌ ${e.message.substring(0,50)}\n\n`;
  }
}

await context2.close();
await browser.close();

// ══════════════════════════════════════
// ZUSAMMENFASSUNG
// ══════════════════════════════════════
report += '═'.repeat(70) + '\n';
report += 'ZUSAMMENFASSUNG ALLER GEFUNDENEN PROBLEME\n';
report += '═'.repeat(70) + '\n\n';

if (issues.length === 0) {
  report += '🎉 Keine Probleme gefunden!\n';
} else {
  report += `⚠️ ${issues.length} Probleme:\n\n`;
  issues.forEach((issue, i) => {
    report += `${i+1}. [${issue.page}] ${issue.issue}\n`;
  });
}

report += `\nScreenshots gespeichert in: ${SCREENSHOTS_DIR}/\n`;
report += `Gesamt Screenshots: ${fs.readdirSync(SCREENSHOTS_DIR).length}\n`;

fs.writeFileSync('audit_report.txt', report);
console.log('\n' + report);
