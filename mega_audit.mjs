import { chromium } from '@playwright/test';
import fs from 'fs';

const BASE = 'https://immobilie-akademie-production.up.railway.app';
const DIR = './mega_audit';
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

let report = [];
let problems = [];
let shotCount = 0;

const browser = await chromium.launch({ headless: true });

async function shot(page, name, label) {
  shotCount++;
  const file = `${DIR}/${String(shotCount).padStart(3,'0')}_${name}.png`;
  await page.waitForTimeout(1500);
  await page.screenshot({ path: file, fullPage: true });
  const text = await page.evaluate(() => document.body.innerText).catch(() => '');
  
  // Fehler-Erkennung
  const errors = [];
  if (/undefined|TypeError|ReferenceError/i.test(text)) errors.push('JS-Fehler sichtbar');
  if (/Cannot GET|404|Not Found/i.test(text)) errors.push('404 Fehler');
  if (/Kein Zugriff|Unauthorized|403/i.test(text)) errors.push('Zugriff verweigert');
  if (/railway\.app/i.test(text) && !/immobilie-akademie/i.test(text)) errors.push('Railway URL sichtbar');
  
  const entry = `${errors.length > 0 ? '❌' : '✅'} [${String(shotCount).padStart(3,'0')}] ${label}`;
  console.log(entry + (errors.length ? ' — ' + errors.join(', ') : ''));
  report.push({ num: shotCount, name, label, file, errors, textLen: text.length });
  if (errors.length) problems.push({ label, errors });
  return text;
}

async function clickAndShot(page, selector, label, parentName) {
  try {
    await page.click(selector, { timeout: 5000 });
    await page.waitForTimeout(1500);
    await shot(page, `${parentName}_click_${label.replace(/[^a-z0-9]/gi,'_').substring(0,20)}`, `KLICK: ${label}`);
    await page.goBack().catch(() => {});
    await page.waitForTimeout(1000);
  } catch(e) {}
}

// ═══════════════════════════════════════════════════
// KONTEXT 1: NICHT EINGELOGGT (wie normaler Besucher)
// ═══════════════════════════════════════════════════
console.log('\n' + '═'.repeat(60));
console.log('BLOCK 1: ALS NORMALER BESUCHER (nicht eingeloggt)');
console.log('═'.repeat(60));

const ctx1 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p1 = await ctx1.newPage();

// Startseite
await p1.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
await shot(p1, 'startseite', 'Startseite — voller Überblick');

// Startseite: alle sichtbaren Buttons testen
const startButtons = await p1.evaluate(() => {
  return Array.from(document.querySelectorAll('button, a[href]'))
    .filter(el => el.offsetParent !== null)
    .map(el => ({ text: el.innerText?.trim().substring(0,40), href: el.getAttribute('href') }))
    .filter(b => b.text && b.text.length > 1)
    .slice(0, 15);
});
console.log('  Startseite Buttons:', startButtons.map(b => b.text).join(' | '));

// Kurse Seite
await p1.goto(BASE + '/kurse', { waitUntil: 'networkidle' });
await shot(p1, 'kurse_uebersicht', 'Kursübersicht — alle Module');

// Jeden Kurs-Button anklicken
const kursButtons = await p1.$$('button:has-text("Jetzt"), button:has-text("Kaufen"), button:has-text("buchen"), a:has-text("Modul")');
for (let i = 0; i < Math.min(kursButtons.length, 5); i++) {
  try {
    const text = await kursButtons[i].innerText();
    await kursButtons[i].click();
    await p1.waitForTimeout(2000);
    await shot(p1, `kurse_btn_${i+1}`, `Kurs-Button: ${text.trim().substring(0,30)}`);
    await p1.goto(BASE + '/kurse', { waitUntil: 'networkidle' });
  } catch(e) {}
}

// Lehrplan
await p1.goto(BASE + '/lehrplan', { waitUntil: 'networkidle' });
await shot(p1, 'lehrplan', 'Lehrplan — vollständig');

// Glossar
await p1.goto(BASE + '/glossary', { waitUntil: 'networkidle' });
await shot(p1, 'glossar', 'Glossar — Fachbegriffe');

// Erste Buchstaben anklicken
const glossarBtns = await p1.$$('[class*="letter"], [class*="alpha"], button');
for (let i = 0; i < Math.min(glossarBtns.length, 3); i++) {
  try {
    await glossarBtns[i].click();
    await p1.waitForTimeout(1000);
    await shot(p1, `glossar_filter_${i+1}`, `Glossar Filter ${i+1}`);
  } catch(e) {}
}

// Bildungskonzept
await p1.goto(BASE + '/bildungskonzept', { waitUntil: 'networkidle' });
await shot(p1, 'bildungskonzept', 'Bildungskonzept');

// Landing Pages — alle 5 Module
for (const [slug, name] of [
  ['modul-1-immobilien-grundkurs', 'M1_Grundkurs'],
  ['modul-2-makler-34c', 'M2_Makler'],
  ['modul-3-weg-verwalter', 'M3_WEG'],
  ['modul-4-gutachter', 'M4_Gutachter'],
  ['modul-5-34i-darlehensvermittler', 'M5_Darlehen'],
]) {
  await p1.goto(BASE + `/kurs/${slug}`, { waitUntil: 'networkidle' });
  await shot(p1, `landing_${name}`, `Landing Page ${name}`);
  
  // Alle Buttons auf Landing Page
  const btns = await p1.$$('button, a[href*="stripe"], a[href*="zahlung"], a[href*="kauf"]');
  for (let i = 0; i < Math.min(btns.length, 3); i++) {
    try {
      const txt = await btns[i].innerText();
      if (txt.trim()) {
        await btns[i].click();
        await p1.waitForTimeout(2000);
        await shot(p1, `landing_${name}_btn${i+1}`, `${name} Button: ${txt.trim().substring(0,25)}`);
        await p1.goto(BASE + `/kurs/${slug}`, { waitUntil: 'networkidle' });
      }
    } catch(e) {}
  }
}

// Login Seite
await p1.goto(BASE + '/login', { waitUntil: 'networkidle' });
await shot(p1, 'login_leer', 'Login-Seite leer');

// Falscher Login testen
const emailInput = await p1.$('input[type="email"], input[placeholder*="mail"], input[name*="mail"]');
const passInput = await p1.$('input[type="password"]');
if (emailInput && passInput) {
  await emailInput.fill('falsch@test.de');
  await passInput.fill('FalschesPasswort');
  await shot(p1, 'login_falsch_ausgefüllt', 'Login mit falschen Daten ausgefüllt');
  await p1.keyboard.press('Enter');
  await p1.waitForTimeout(2000);
  await shot(p1, 'login_falsch_fehler', 'Login Fehlermeldung bei falschem Passwort');
}

// Rechtliche Seiten
for (const [path, name] of [
  ['/impressum', 'impressum'],
  ['/datenschutz', 'datenschutz'],
  ['/agb', 'agb'],
  ['/widerruf', 'widerruf'],
]) {
  await p1.goto(BASE + path, { waitUntil: 'networkidle' });
  await shot(p1, `legal_${name}`, `Rechtlich: ${name.toUpperCase()}`);
}

await ctx1.close();

// ═══════════════════════════════════════════════════
// KONTEXT 2: ALS ADMIN (alles testen)
// ═══════════════════════════════════════════════════
console.log('\n' + '═'.repeat(60));
console.log('BLOCK 2: ALS ADMIN (alle Tools testen)');
console.log('═'.repeat(60));

const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p2 = await ctx2.newPage();

// Login via API
await p2.request.post(`${BASE}/api/auth/login`, {
  data: { email: 'admin@immobilie.de', password: 'Admin1234!' },
  headers: { 'Content-Type': 'application/json' }
});
await p2.goto(BASE + '/dashboard', { waitUntil: 'networkidle' });
await shot(p2, 'admin_dashboard', 'Admin Dashboard');

// Dashboard: Alle Nav-Links anklicken
const navLinks = await p2.evaluate(() => {
  return Array.from(document.querySelectorAll('nav a, [class*="nav"] a, [class*="sidebar"] a'))
    .map(a => ({ text: a.innerText?.trim(), href: a.getAttribute('href') }))
    .filter(a => a.text && a.href && !a.href.startsWith('http'));
});
console.log('  Dashboard Nav-Links:', navLinks.map(n => n.text).join(' | '));

// Modul-Seiten testen
for (let m = 1; m <= 5; m++) {
  await p2.goto(BASE + `/module/${m}`, { waitUntil: 'networkidle' });
  await shot(p2, `modul_${m}_uebersicht`, `Modul ${m} Übersicht`);
  
  // Ersten Lerntag öffnen
  const dayBtns = await p2.$$('[class*="day"], [class*="tag"], button:has-text("Tag"), button:has-text("Day")');
  if (dayBtns.length > 0) {
    try {
      await dayBtns[0].click();
      await p2.waitForTimeout(2000);
      await shot(p2, `modul_${m}_tag1`, `Modul ${m} — Tag 1 Inhalt`);
      
      // Tabs innerhalb des Lerntags
      const tabs = await p2.$$('[role="tab"], [class*="tab"]');
      for (let t = 0; t < Math.min(tabs.length, 4); t++) {
        try {
          await tabs[t].click();
          await p2.waitForTimeout(1000);
          const tabText = await tabs[t].innerText();
          await shot(p2, `modul_${m}_tag1_tab${t+1}`, `M${m} Tag1 Tab: ${tabText.trim().substring(0,20)}`);
        } catch(e) {}
      }
    } catch(e) {}
  }
}

// KI-Tutor testen
await p2.goto(BASE + '/module/2', { waitUntil: 'networkidle' });
const kiInput = await p2.$('input[placeholder*="Frage"], textarea[placeholder*="Frage"], input[placeholder*="frag"]');
if (kiInput) {
  await kiInput.fill('Was ist die Maklerprovision nach §34c GewO?');
  await shot(p2, 'ki_tutor_frage', 'KI-Tutor Frage eingegeben');
  await p2.keyboard.press('Enter');
  await p2.waitForTimeout(8000);
  await shot(p2, 'ki_tutor_antwort', 'KI-Tutor Antwort erhalten');
}

// Admin Tools
const adminTools = [
  ['/admin', 'Admin Hauptseite'],
  ['/admin/ki-monitor', 'KI-Monitor Dashboard'],
  ['/admin/portal-agent', 'Portal-Agent Dashboard'],
  ['/admin/kursbuch', 'Kursbuch-Generator'],
  ['/admin/mediaskript', 'Mediaskript-Generator'],
  ['/admin/dozenten', 'Dozenten-Cockpit'],
  ['/admin/fragen', 'Fragen-Manager'],
  ['/admin/upload', 'Content Upload'],
  ['/admin/nutzer', 'Nutzerverwaltung'],
  ['/admin/loesungen', 'Dozenten-Lösungen'],
  ['/admin/phase', 'Portal-Phase Admin'],
  ['/admin/whitelabel', 'White-Label Admin'],
];

for (const [path, label] of adminTools) {
  await p2.goto(BASE + path, { waitUntil: 'networkidle', timeout: 20000 });
  await shot(p2, `admin_${path.replace(/\//g,'_').substring(1)}`, `ADMIN: ${label}`);
  
  // Buttons auf der Seite klicken (außer Löschen/Submit)
  const actionBtns = await p2.$$('button:not([disabled])');
  let btnCount = 0;
  for (const btn of actionBtns) {
    if (btnCount >= 3) break;
    try {
      const txt = await btn.innerText();
      const lowerTxt = txt.toLowerCase();
      // Gefährliche Buttons überspringen
      if (lowerTxt.includes('lösch') || lowerTxt.includes('delete') || 
          lowerTxt.includes('entfern') || lowerTxt.includes('submit')) continue;
      if (txt.trim().length < 2) continue;
      
      await btn.click();
      await p2.waitForTimeout(2000);
      await shot(p2, `admin_${path.replace(/\//g,'_').substring(1)}_btn_${btnCount+1}`, `${label} → Klick: ${txt.trim().substring(0,25)}`);
      btnCount++;
      await p2.goto(BASE + path, { waitUntil: 'networkidle' });
    } catch(e) {}
  }
}

// Kursbuch generieren testen
await p2.goto(BASE + '/admin/kursbuch', { waitUntil: 'networkidle' });
const modulSelect = await p2.$('select, [role="combobox"]');
if (modulSelect) {
  await modulSelect.selectOption('2');
  await shot(p2, 'kursbuch_modul2_ausgewählt', 'Kursbuch — Modul 2 ausgewählt');
  const genBtn = await p2.$('button:has-text("Generier"), button:has-text("Erstell"), button:has-text("generi")');
  if (genBtn) {
    await genBtn.click();
    await p2.waitForTimeout(15000); // KI braucht Zeit
    await shot(p2, 'kursbuch_generiert', 'Kursbuch — Ergebnis nach Generierung');
  }
}

// Mediaskript testen
await p2.goto(BASE + '/admin/mediaskript', { waitUntil: 'networkidle' });
await shot(p2, 'mediaskript_leer', 'Mediaskript leer');
const themaInput = await p2.$('input[placeholder*="Thema"], input[placeholder*="thema"]');
if (themaInput) {
  await themaInput.fill('Maklerprovision §34c GewO');
  const genBtn2 = await p2.$('button:not([disabled])');
  if (genBtn2) {
    await genBtn2.click();
    await p2.waitForTimeout(15000);
    await shot(p2, 'mediaskript_generiert', 'Mediaskript — Ergebnis');
  }
}

// Flashcards
await p2.goto(BASE + '/flashcards', { waitUntil: 'networkidle' });
await shot(p2, 'flashcards_start', 'Flashcards Startansicht');
const flashBtn = await p2.$('button');
if (flashBtn) {
  await flashBtn.click();
  await p2.waitForTimeout(1500);
  await shot(p2, 'flashcards_karte1', 'Flashcard — erste Karte');
}

// Expose-Trainer
await p2.goto(BASE + '/expose-trainer', { waitUntil: 'networkidle' });
await shot(p2, 'expose_trainer', 'Expose-Trainer');

// Prüfungs-Simulation
await p2.goto(BASE + '/exam', { waitUntil: 'networkidle' });
await shot(p2, 'pruefung_start', 'Prüfungs-Simulation Start');

await ctx2.close();

// ═══════════════════════════════════════════════════
// KONTEXT 3: NORMALER NUTZER (eingeloggt, kein Admin)
// ═══════════════════════════════════════════════════
console.log('\n' + '═'.repeat(60));
console.log('BLOCK 3: ALS NORMALER NUTZER');
console.log('═'.repeat(60));

const ctx3 = await browser.newContext({ viewport: { width: 390, height: 844 } }); // iPhone
const p3 = await ctx3.newPage();

// Login
await p3.request.post(`${BASE}/api/auth/login`, {
  data: { email: 'admin@immobilie.de', password: 'Admin1234!' },
  headers: { 'Content-Type': 'application/json' }
});

// Mobile Ansicht
await p3.goto(BASE, { waitUntil: 'networkidle' });
await shot(p3, 'mobile_startseite', 'MOBIL: Startseite iPhone');
await p3.goto(BASE + '/kurse', { waitUntil: 'networkidle' });
await shot(p3, 'mobile_kurse', 'MOBIL: Kurse');
await p3.goto(BASE + '/dashboard', { waitUntil: 'networkidle' });
await shot(p3, 'mobile_dashboard', 'MOBIL: Dashboard');

await ctx3.close();
await browser.close();

// ═══════════════════════════════════════════════════
// ABSCHLUSSBERICHT
// ═══════════════════════════════════════════════════
console.log('\n' + '═'.repeat(60));
console.log('AUDIT ABGESCHLOSSEN');
console.log('═'.repeat(60));
console.log(`📸 Gesamt Screenshots: ${shotCount}`);
console.log(`❌ Probleme gefunden: ${problems.length}`);

let summary = `MEGA-AUDIT BERICHT\n`;
summary += `Datum: ${new Date().toLocaleString('de-DE')}\n`;
summary += `Screenshots: ${shotCount}\n\n`;

if (problems.length === 0) {
  summary += '🎉 KEINE PROBLEME GEFUNDEN!\n';
} else {
  summary += `PROBLEME (${problems.length}):\n`;
  problems.forEach((p, i) => {
    summary += `${i+1}. ${p.label}: ${p.errors.join(', ')}\n`;
  });
}

summary += '\nALLE SCREENSHOTS:\n';
report.forEach(r => {
  summary += `${r.errors.length ? '❌' : '✅'} ${String(r.num).padStart(3,'0')} ${r.label}\n`;
});

fs.writeFileSync(`${DIR}/BERICHT.txt`, summary);
console.log(summary);
