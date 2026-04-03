import { chromium } from '@playwright/test';
import fs from 'fs';

const BASE = 'https://immobilie-akademie-production.up.railway.app';
const DIR = './audit_screenshots';
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR);

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

async function shot(name, label) {
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${DIR}/${name}.png`, fullPage: true });
  const text = await page.evaluate(() => document.body.innerText);
  const buttons = await page.evaluate(() => {
    const b = [];
    document.querySelectorAll('button, a[href]').forEach(el => {
      if (el.innerText?.trim().length > 0 && el.innerText?.trim().length < 50)
        b.push(el.innerText.trim());
    });
    return [...new Set(b)].slice(0, 20);
  });
  console.log(`\n📸 ${label}`);
  console.log(`   Buttons: ${buttons.slice(0,10).join(' | ')}`);
  console.log(`   Text-Anfang: ${text.substring(0,150).replace(/\n/g,' ')}`);
  return { text, buttons };
}

// Login via API
const resp = await page.request.post(`${BASE}/api/auth/login`, {
  data: { email: 'admin@immobilie.de', password: 'Admin1234!' },
  headers: { 'Content-Type': 'application/json' }
});
const loginData = await resp.json();
console.log('Login:', loginData.ok ? '✅ OK' : '❌ Fehler');

// Dashboard
await page.goto(BASE + '/dashboard', { waitUntil: 'networkidle' });
await shot('14_dashboard', 'Dashboard');

// Module
for (let m = 1; m <= 5; m++) {
  await page.goto(BASE + `/module/${m}`, { waitUntil: 'networkidle' });
  await shot(`1${4+m}_modul${m}`, `Modul ${m}`);
}

// Admin-Tools  
const adminPages = [
  ['/admin', '22_admin', 'Admin Dashboard'],
  ['/admin/ki-monitor', '23_ki_monitor', 'KI-Monitor'],
  ['/admin/portal-agent', '24_portal_agent', 'Portal-Agent'],
  ['/admin/kursbuch', '25_kursbuch', 'Kursbuch-Generator'],
  ['/admin/mediaskript', '26_mediaskript', 'Mediaskript-Generator'],
  ['/admin/dozenten', '27_dozenten', 'Dozenten-Cockpit'],
  ['/admin/fragen', '28_fragen', 'Fragen-Manager'],
  ['/admin/upload', '29_upload', 'Content Upload'],
  ['/admin/nutzer', '30_nutzer', 'Nutzerverwaltung'],
  ['/admin/loesungen', '31_loesungen', 'Dozenten Lösungen'],
];

for (const [path, name, label] of adminPages) {
  await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 20000 });
  await shot(name, label);
}

// Rechtliche Seiten
for (const [path, name, label] of [
  ['/impressum', '32_impressum', 'Impressum'],
  ['/datenschutz', '33_datenschutz', 'Datenschutz'],
  ['/agb', '34_agb', 'AGB'],
  ['/widerruf', '35_widerruf', 'Widerruf'],
]) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await shot(name, label);
}

await browser.close();
console.log(`\n✅ Fertig! ${fs.readdirSync(DIR).length} Screenshots in ${DIR}/`);
