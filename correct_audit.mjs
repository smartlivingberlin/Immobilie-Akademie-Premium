import { chromium } from '@playwright/test';
import fs from 'fs';

const BASE = 'https://immobilie-akademie-production.up.railway.app';
const DIR = './correct_audit';
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

let ok = 0, fail = 0, issues = [];
let shotNum = 0;

const browser = await chromium.launch();

async function shot(page, name, label) {
  shotNum++;
  await page.waitForTimeout(2000);
  const file = `${DIR}/${String(shotNum).padStart(3,'0')}_${name}.png`;
  await page.screenshot({ path: file, fullPage: true });
  const text = await page.evaluate(() => document.body.innerText).catch(() => '');
  const url = page.url();
  
  const errs = [];
  if (/Cannot GET|404/i.test(text)) errs.push('404');
  if (/undefined|TypeError/i.test(text) && !/§/i.test(text)) errs.push('JS-Fehler');
  
  const status = errs.length ? '❌' : '✅';
  console.log(`${status} [${String(shotNum).padStart(3,'0')}] ${label}`);
  if (errs.length) { fail++; issues.push(`${label}: ${errs.join(', ')}`); }
  else ok++;
  return text;
}

// ═══════════════════════════════════
// LOGIN
// ═══════════════════════════════════
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();

const loginResp = await p.request.post(`${BASE}/api/auth/login`, {
  data: { email: 'admin@immobilie.de', password: 'Admin1234!' },
  headers: { 'Content-Type': 'application/json' }
});
console.log('Login:', (await loginResp.json()).ok ? '✅ OK' : '❌ Fehler');

// ═══════════════════════════════════
// ALLE SEITEN MIT RICHTIGEN URLS
// ═══════════════════════════════════
const allPages = [
  // Öffentlich
  ['/', 'startseite', 'Startseite'],
  ['/kurse', 'kurse', 'Kursübersicht'],
  ['/lehrplan', 'lehrplan', 'Lehrplan'],
  ['/glossary', 'glossar', 'Glossar'],
  ['/bildungskonzept', 'bildungskonzept', 'Bildungskonzept'],
  ['/rechner', 'rechner', 'Praxisrechner'],
  ['/finanzierungsrechner', 'finanzrechner', 'Finanzierungsrechner'],
  
  // Landing Pages
  ['/kurs/modul-1-immobilien-grundkurs', 'landing_m1', 'Landing Modul 1'],
  ['/kurs/modul-2-makler-34c', 'landing_m2', 'Landing Modul 2'],
  ['/kurs/modul-3-weg-verwalter', 'landing_m3', 'Landing Modul 3'],
  ['/kurs/modul-4-gutachter', 'landing_m4', 'Landing Modul 4'],
  ['/kurs/modul-5-34i-darlehensvermittler', 'landing_m5', 'Landing Modul 5'],
  
  // Login
  ['/login', 'login', 'Login-Seite'],
  
  // Rechtlich
  ['/impressum', 'impressum', 'Impressum'],
  ['/datenschutz', 'datenschutz', 'Datenschutz'],
  ['/agb', 'agb', 'AGB'],
  ['/widerruf', 'widerruf', 'Widerruf'],
  
  // Dashboard (richtige URL!)
  ['/statistiken', 'dashboard', 'Dashboard/Statistiken'],
  
  // Module (richtige URLs!)
  ['/modul/1', 'modul1', 'Modul 1 Übersicht'],
  ['/modul/2', 'modul2', 'Modul 2 Übersicht'],
  ['/modul/3', 'modul3', 'Modul 3 Übersicht'],
  ['/modul/4', 'modul4', 'Modul 4 Übersicht'],
  ['/modul/5', 'modul5', 'Modul 5 Übersicht'],
  
  // Modul Lerntage
  ['/modul/1/tag/1', 'modul1_tag1', 'Modul 1 Tag 1'],
  ['/modul/2/tag/1', 'modul2_tag1', 'Modul 2 Tag 1'],
  ['/modul/3/tag/1', 'modul3_tag1', 'Modul 3 Tag 1'],
  
  // Tools
  ['/pruefung', 'pruefung', 'Prüfungs-Simulation'],
  ['/lernkarten', 'lernkarten', 'Lernkarten/Flashcards'],
  ['/gamification', 'gamification', 'Gamification'],
  ['/zertifikate', 'zertifikate', 'Zertifikate'],
  ['/quiz', 'quiz', 'Quiz'],
  ['/expose-trainer', 'expose', 'Exposé-Trainer'],
  ['/fallstudien', 'fallstudien', 'Fallstudien'],
  ['/dokument-viewer', 'dokviewer', 'Dokument-Viewer'],
  ['/hilfe', 'hilfe', 'Benutzerhandbuch'],
  ['/strategie', 'strategie', 'Strategie-Plattform'],
  
  // Admin
  ['/admin', 'admin_dashboard', 'Admin Dashboard'],
  ['/admin/ki-monitor', 'admin_ki', 'KI-Monitor'],
  ['/admin/portal-agent', 'admin_agent', 'Portal-Agent'],
  ['/admin/kursbuch', 'admin_kursbuch', 'Kursbuch-Generator'],
  ['/admin/mediaskript', 'admin_media', 'Mediaskript-Generator'],
  ['/admin/dozenten', 'admin_dozenten', 'Dozenten-Cockpit'],
  ['/admin/fragen', 'admin_fragen', 'Fragen-Manager'],
  ['/admin/upload', 'admin_upload', 'Content Upload'],
  ['/admin/nutzer', 'admin_nutzer', 'Nutzerverwaltung'],
  ['/admin/loesungen', 'admin_loesungen', 'Dozenten-Lösungen'],
  ['/admin/whitelabel', 'admin_whitelabel', 'White-Label'],
  ['/admin/phase', 'admin_phase', 'Portal-Phase'],
  ['/admin/videos', 'admin_videos', 'Video-Management'],
];

console.log(`\nTeste ${allPages.length} Seiten...\n`);

for (const [path, name, label] of allPages) {
  try {
    await p.goto(BASE + path, { waitUntil: 'networkidle', timeout: 20000 });
    await shot(p, name, label);
  } catch(e) {
    console.log(`❌ [${String(++shotNum).padStart(3,'0')}] ${label}: Timeout`);
    fail++; issues.push(`${label}: Timeout`);
  }
}

// ═══════════════════════════════════
// MODUL 1 TAG 1 — ALLE TABS
// ═══════════════════════════════════
console.log('\n--- Modul 1 Tag 1 Details ---');
await p.goto(BASE + '/modul/1/tag/1', { waitUntil: 'networkidle' });
const tabs = await p.$$('[role="tab"], button[class*="tab"]');
for (let i = 0; i < Math.min(tabs.length, 6); i++) {
  try {
    const tabText = await tabs[i].innerText();
    await tabs[i].click();
    await p.waitForTimeout(1500);
    await shot(p, `m1_tag1_tab${i+1}`, `M1/Tag1 Tab: ${tabText.trim().substring(0,20)}`);
  } catch(e) {}
}

// ═══════════════════════════════════
// KI-TUTOR TEST
// ═══════════════════════════════════
await p.goto(BASE + '/modul/2', { waitUntil: 'networkidle' });
await shot(p, 'ki_tutor_bereich', 'KI-Tutor Bereich');

// ═══════════════════════════════════
// MOBILE TEST
// ═══════════════════════════════════
console.log('\n--- Mobile Tests ---');
await ctx.close();
const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mp = await mCtx.newPage();
await mp.request.post(`${BASE}/api/auth/login`, {
  data: { email: 'admin@immobilie.de', password: 'Admin1234!' },
  headers: { 'Content-Type': 'application/json' }
});

for (const [path, name, label] of [
  ['/', 'mob_start', 'MOBIL: Startseite'],
  ['/kurse', 'mob_kurse', 'MOBIL: Kurse'],
  ['/statistiken', 'mob_dashboard', 'MOBIL: Dashboard'],
  ['/modul/1', 'mob_modul1', 'MOBIL: Modul 1'],
  ['/login', 'mob_login', 'MOBIL: Login'],
]) {
  await mp.goto(BASE + path, { waitUntil: 'networkidle' });
  await shot(mp, name, label);
}

await mCtx.close();
await browser.close();

// ═══════════════════════════════════
// ZUSAMMENFASSUNG
// ═══════════════════════════════════
console.log('\n' + '═'.repeat(60));
console.log(`ERGEBNIS: ${ok} OK, ${fail} Probleme`);
console.log('═'.repeat(60));
if (issues.length) {
  console.log('\nPROBLEME:');
  issues.forEach((i, n) => console.log(`${n+1}. ${i}`));
} else {
  console.log('🎉 KEINE PROBLEME!');
}
console.log(`\n📸 ${shotNum} Screenshots in ${DIR}/`);
fs.writeFileSync(`${DIR}/BERICHT.txt`, `OK: ${ok}\nFehler: ${fail}\n\nProbleme:\n${issues.join('\n')}`);
