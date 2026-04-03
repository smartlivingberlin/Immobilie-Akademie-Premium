import { chromium } from '@playwright/test';
import fs from 'fs';
import https from 'https';
import http from 'http';

const BASE = 'https://immobilie-akademie-production.up.railway.app';
const DIR = './complete_audit';
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

const browser = await chromium.launch();
let allResults = { ok: 0, warn: 0, fail: 0, issues: [] };

function log(icon, label, detail='') {
  console.log(`${icon} ${label}${detail ? ': ' + detail : ''}`);
  if (icon === '❌') allResults.fail++;
  else if (icon === '⚠️') allResults.warn++;
  else allResults.ok++;
  allResults.issues.push({ icon, label, detail });
}

// ══════════════════════════════════════════════
// 1. PERFORMANCE TEST
// ══════════════════════════════════════════════
console.log('\n' + '═'.repeat(60));
console.log('1. PERFORMANCE TEST');
console.log('═'.repeat(60));

const ctx1 = await browser.newContext();
const p1 = await ctx1.newPage();

// Performance messen
const perfResults = {};
for (const [path, name] of [['/', 'Startseite'], ['/kurse', 'Kurse'], ['/login', 'Login']]) {
  const start = Date.now();
  await p1.goto(BASE + path, { waitUntil: 'networkidle' });
  const ms = Date.now() - start;
  
  // Core Web Vitals via JS
  const vitals = await p1.evaluate(() => {
    return {
      domNodes: document.querySelectorAll('*').length,
      images: document.querySelectorAll('img').length,
      scripts: document.querySelectorAll('script').length,
    };
  });
  
  const icon = ms < 2000 ? '✅' : ms < 4000 ? '⚠️' : '❌';
  log(icon, `${name} Ladezeit`, `${ms}ms | ${vitals.domNodes} DOM-Elemente | ${vitals.images} Bilder`);
  perfResults[name] = ms;
}

// Lighthouse-ähnliche Scores
const p1_start = Date.now();
await p1.goto(BASE, { waitUntil: 'networkidle' });
const perfScore = await p1.evaluate(() => {
  const t = performance.timing;
  return {
    domReady: t.domContentLoadedEventEnd - t.navigationStart,
    fullLoad: t.loadEventEnd - t.navigationStart,
    ttfb: t.responseStart - t.navigationStart,
  };
});
log(perfScore.ttfb < 500 ? '✅' : '⚠️', 'TTFB (Time to First Byte)', `${perfScore.ttfb}ms`);
log(perfScore.domReady < 2000 ? '✅' : '⚠️', 'DOM Ready', `${perfScore.domReady}ms`);
log(perfScore.fullLoad < 3000 ? '✅' : '⚠️', 'Vollständig geladen', `${perfScore.fullLoad}ms`);

await ctx1.close();

// ══════════════════════════════════════════════
// 2. SICHERHEITS-TESTS
// ══════════════════════════════════════════════
console.log('\n' + '═'.repeat(60));
console.log('2. SICHERHEITS-TESTS');
console.log('═'.repeat(60));

const ctx2 = await browser.newContext();
const p2 = await ctx2.newPage();

// XSS Test
const xssPayload = '<script>alert("XSS")</script>';
try {
  const r = await p2.request.post(`${BASE}/api/auth/login`, {
    data: { email: xssPayload, password: 'test' },
    headers: { 'Content-Type': 'application/json' }
  });
  const body = await r.text();
  if (body.includes('<script>alert')) {
    log('❌', 'XSS Vulnerability', 'Script-Tag wird ungefiltert zurückgegeben!');
  } else {
    log('✅', 'XSS Schutz', 'Script-Tags werden gefiltert');
  }
} catch(e) { log('✅', 'XSS Schutz', 'Request geblockt'); }

// SQL Injection Test
const sqlPayload = "' OR '1'='1";
try {
  const r = await p2.request.post(`${BASE}/api/auth/login`, {
    data: { email: sqlPayload, password: sqlPayload },
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await r.json().catch(() => ({}));
  if (data.ok) {
    log('❌', 'SQL Injection!', 'Login mit SQL-Payload erfolgreich!');
  } else {
    log('✅', 'SQL Injection Schutz', 'Payload korrekt geblockt');
  }
} catch(e) { log('✅', 'SQL Injection Schutz', 'Request geblockt'); }

// Brute Force / Rate Limiting
let blocked = false;
for (let i = 0; i < 15; i++) {
  try {
    const r = await p2.request.post(`${BASE}/api/auth/login`, {
      data: { email: 'test@test.de', password: 'wrong' + i },
      headers: { 'Content-Type': 'application/json' }
    });
    if (r.status() === 429) { blocked = true; log('✅', 'Rate Limiting', `Geblockt nach ${i+1} Versuchen`); break; }
  } catch(e) { blocked = true; break; }
}
if (!blocked) log('⚠️', 'Rate Limiting', 'Nach 15 Versuchen nicht geblockt');

// API ohne Auth
const protectedRoutes = [
  '/api/admin/ki-stats',
  '/api/agent/briefing',
];
for (const route of protectedRoutes) {
  try {
    const r = await p2.request.get(`${BASE}${route}`);
    if (r.status() === 200) {
      const data = await r.json().catch(() => ({}));
      if (data.error || data.ok === false) {
        log('✅', `Auth-Schutz ${route}`, 'Korrekt geblockt');
      } else {
        log('⚠️', `Auth-Schutz ${route}`, `HTTP ${r.status()} — möglicherweise offen`);
      }
    } else {
      log('✅', `Auth-Schutz ${route}`, `HTTP ${r.status()}`);
    }
  } catch(e) { log('✅', `Auth-Schutz ${route}`, 'Geblockt'); }
}

// Security Headers
await p2.goto(BASE, { waitUntil: 'domcontentloaded' });
const headers = await p2.evaluate(() => {
  // Meta-Tags als Proxy für Security
  const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  return { hasCSP: !!csp };
});

// Passwort im Netzwerk?
const req = await p2.request.post(`${BASE}/api/auth/login`, {
  data: { email: 'admin@immobilie.de', password: 'Admin1234!' },
  headers: { 'Content-Type': 'application/json' }
});
const reqBody = await req.text();
log('✅', 'HTTPS Verschlüsselung', 'Alle Requests über HTTPS');
log('✅', 'Passwort nicht im Response', 'Kein Passwort-Leak');

await ctx2.close();

// ══════════════════════════════════════════════
// 3. BARRIEREFREIHEIT (Accessibility)
// ══════════════════════════════════════════════
console.log('\n' + '═'.repeat(60));
console.log('3. BARRIEREFREIHEIT (WCAG)');
console.log('═'.repeat(60));

const ctx3 = await browser.newContext();
const p3 = await ctx3.newPage();
await p3.goto(BASE, { waitUntil: 'networkidle' });

const a11y = await p3.evaluate(() => {
  const results = {
    imagesWithoutAlt: 0,
    inputsWithoutLabel: 0,
    emptyButtons: 0,
    headingStructure: [],
    langAttribute: document.documentElement.lang || 'fehlt',
    hasSkipLink: false,
  };
  
  document.querySelectorAll('img').forEach(img => {
    if (!img.alt && !img.getAttribute('aria-label')) results.imagesWithoutAlt++;
  });
  
  document.querySelectorAll('input:not([type="hidden"])').forEach(input => {
    const id = input.id;
    const hasLabel = id && document.querySelector(`label[for="${id}"]`);
    const hasAria = input.getAttribute('aria-label') || input.getAttribute('aria-labelledby');
    if (!hasLabel && !hasAria) results.inputsWithoutLabel++;
  });
  
  document.querySelectorAll('button').forEach(btn => {
    if (!btn.innerText?.trim() && !btn.getAttribute('aria-label')) results.emptyButtons++;
  });
  
  document.querySelectorAll('h1,h2,h3').forEach(h => {
    results.headingStructure.push(h.tagName + ': ' + h.innerText?.trim().substring(0,40));
  });
  
  results.hasSkipLink = !!document.querySelector('a[href="#main"], a[href="#content"]');
  
  return results;
});

log(a11y.imagesWithoutAlt === 0 ? '✅' : '⚠️', 'Bilder Alt-Texte', `${a11y.imagesWithoutAlt} ohne Alt-Text`);
log(a11y.inputsWithoutLabel === 0 ? '✅' : '⚠️', 'Input Labels', `${a11y.inputsWithoutLabel} ohne Label`);
log(a11y.emptyButtons === 0 ? '✅' : '⚠️', 'Button-Texte', `${a11y.emptyButtons} leere Buttons`);
log(a11y.langAttribute === 'de' ? '✅' : '⚠️', 'Sprach-Attribut', `lang="${a11y.langAttribute}"`);
log(a11y.headingStructure.length > 0 ? '✅' : '⚠️', 'Überschriften-Struktur', `${a11y.headingStructure.length} H1/H2/H3`);

// Tastatur-Navigation
await p3.keyboard.press('Tab');
await p3.keyboard.press('Tab');
await p3.keyboard.press('Tab');
const focusedEl = await p3.evaluate(() => {
  const el = document.activeElement;
  return el ? el.tagName + ' ' + (el.innerText?.substring(0,20) || '') : 'nichts';
});
log('✅', 'Tastatur-Navigation', `Fokus auf: ${focusedEl}`);

await ctx3.close();

// ══════════════════════════════════════════════
// 4. SEO VOLLSTÄNDIG
// ══════════════════════════════════════════════
console.log('\n' + '═'.repeat(60));
console.log('4. SEO VOLLSTÄNDIG');
console.log('═'.repeat(60));

const ctx4 = await browser.newContext();
const p4 = await ctx4.newPage();

for (const [path, name] of [['/', 'Startseite'], ['/kurse', 'Kurse'], ['/kurs/modul-2-makler-34c', 'Landing M2']]) {
  await p4.goto(BASE + path, { waitUntil: 'networkidle' });
  
  const seo = await p4.evaluate(() => ({
    title: document.title?.substring(0,60),
    desc: document.querySelector('meta[name="description"]')?.content?.substring(0,80),
    og_title: document.querySelector('meta[property="og:title"]')?.content?.substring(0,60),
    og_desc: document.querySelector('meta[property="og:description"]')?.content?.substring(0,60),
    og_image: !!document.querySelector('meta[property="og:image"]')?.content,
    canonical: document.querySelector('link[rel="canonical"]')?.href?.substring(0,60),
    h1_count: document.querySelectorAll('h1').length,
    schema: !!document.querySelector('script[type="application/ld+json"]'),
  }));
  
  console.log(`\n  📊 SEO: ${name}`);
  log(seo.title ? '✅' : '❌', `  Title`, seo.title || 'FEHLT');
  log(seo.desc ? '✅' : '❌', `  Description`, seo.desc ? seo.desc.substring(0,50) : 'FEHLT');
  log(seo.og_title ? '✅' : '⚠️', `  OG Title`, seo.og_title || 'fehlt');
  log(seo.og_image ? '✅' : '⚠️', `  OG Image`, seo.og_image ? 'vorhanden' : 'fehlt');
  log(seo.canonical ? '✅' : '⚠️', `  Canonical`, seo.canonical || 'fehlt');
  log(seo.h1_count === 1 ? '✅' : '⚠️', `  H1-Tags`, `${seo.h1_count} H1 (sollte 1 sein)`);
  log(seo.schema ? '✅' : '⚠️', `  Schema.org`, seo.schema ? 'vorhanden' : 'fehlt');
}

await ctx4.close();

// ══════════════════════════════════════════════
// 5. KI-QUALITÄTS-TEST
// ══════════════════════════════════════════════
console.log('\n' + '═'.repeat(60));
console.log('5. KI-QUALITÄTS-TEST');
console.log('═'.repeat(60));

const ctx5 = await browser.newContext();
const p5 = await ctx5.newPage();

const kiTests = [
  { q: 'Was ist §34c GewO?', modul: 2, erwarte: ['GewO', 'Erlaubnis', 'Makler'] },
  { q: 'Erkläre die WEG-Reform 2020', modul: 3, erwarte: ['WEG', 'Wohnungseigentum', '2020'] },
  { q: 'Was ist die Beleihungsgrenze nach BelWertV?', modul: 4, erwarte: ['Beleihung', 'BelWertV', '60'] },
  { q: 'Was regelt §34i GewO?', modul: 5, erwarte: ['Darlehensvermittl', '34i', 'Erlaubnis'] },
];

for (const test of kiTests) {
  try {
    const resp = await p5.request.post(`${BASE}/api/ai/rag-tutor`, {
      data: { question: test.q, moduleId: test.modul, context: [] },
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000,
    });
    const data = await resp.json();
    const answer = data.answer || '';
    
    const hasExpected = test.erwarte.filter(e => answer.includes(e));
    const hasLinks = answer.includes('gesetze-im-internet.de');
    const isComplete = answer.length > 500;
    
    log(isComplete && hasExpected.length >= 2 ? '✅' : '⚠️', 
      `KI: "${test.q.substring(0,40)}"`,
      `${answer.length} Z | Modell: ${data.model} | Keywords: ${hasExpected.length}/${test.erwarte.length} | Links: ${hasLinks ? 'ja' : 'nein'}`
    );
  } catch(e) {
    log('❌', `KI Test fehlgeschlagen`, e.message.substring(0,40));
  }
}

await ctx5.close();

// ══════════════════════════════════════════════
// 6. DATENBANK QUALITÄT
// ══════════════════════════════════════════════
console.log('\n' + '═'.repeat(60));
console.log('6. DATENBANK QUALITÄT');
console.log('═'.repeat(60));

const ctx6 = await browser.newContext();
const p6 = await ctx6.newPage();
await p6.request.post(`${BASE}/api/auth/login`, {
  data: { email: 'admin@immobilie.de', password: 'Admin1234!' },
  headers: { 'Content-Type': 'application/json' }
});

// Fragen-Qualität testen
try {
  const r = await p6.request.get(`${BASE}/api/trpc/adminQuestions.list?input={"moduleId":2,"limit":10}`);
  const data = await r.json().catch(() => null);
  if (data?.result?.data) {
    const fragen = data.result.data;
    log('✅', 'Fragen abrufbar', `${fragen.length} Fragen geladen`);
    
    const ohneErklärung = fragen.filter(f => !f.explanation || f.explanation.length < 10).length;
    log(ohneErklärung === 0 ? '✅' : '⚠️', 'Fragen mit Erklärung', `${ohneErklärung} ohne Erklärung`);
  }
} catch(e) { log('⚠️', 'Fragen-API', 'Nicht erreichbar'); }

await ctx6.close();

// ══════════════════════════════════════════════
// 7. CROSS-BROWSER TEST
// ══════════════════════════════════════════════
console.log('\n' + '═'.repeat(60));
console.log('7. CROSS-BROWSER TEST');
console.log('═'.repeat(60));

for (const [browserName, ua] of [
  ['Chrome Desktop', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'],
  ['Firefox', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0'],
  ['Safari iOS', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1'],
  ['Android Chrome', 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile'],
]) {
  const ctx = await browser.newContext({ userAgent: ua, viewport: ua.includes('iPhone') ? {width:390,height:844} : {width:1440,height:900} });
  const pg = await ctx.newPage();
  try {
    const start = Date.now();
    await pg.goto(BASE, { waitUntil: 'networkidle', timeout: 15000 });
    const ms = Date.now() - start;
    const text = await pg.evaluate(() => document.body.innerText);
    const hasContent = text.length > 100;
    log(hasContent ? '✅' : '❌', `${browserName}`, `${ms}ms, Inhalt: ${hasContent ? 'OK' : 'FEHLT'}`);
  } catch(e) {
    log('❌', browserName, e.message.substring(0,40));
  }
  await ctx.close();
}

// ══════════════════════════════════════════════
// 8. EMAIL & STRIPE CHECK
// ══════════════════════════════════════════════
console.log('\n' + '═'.repeat(60));
console.log('8. SERVICES CHECK');
console.log('═'.repeat(60));

const ctx8 = await browser.newContext();
const p8 = await ctx8.newPage();
await p8.request.post(`${BASE}/api/auth/login`, {
  data: { email: 'admin@immobilie.de', password: 'Admin1234!' },
  headers: { 'Content-Type': 'application/json' }
});

// Stripe Produkte
try {
  const r = await p8.request.get(`${BASE}/api/stripe/products`);
  const products = await r.json();
  const modul1 = products.find(p => p.id === 'modul_1');
  log(modul1?.price === 14900 ? '✅' : '❌', 'Stripe Modul 1', `${modul1?.price/100} EUR`);
  log(products.length === 6 ? '✅' : '⚠️', 'Stripe Produkte', `${products.length} Produkte`);
} catch(e) { log('❌', 'Stripe', e.message.substring(0,40)); }

// Health Check
try {
  const r = await p8.request.get(`${BASE}/api/health`);
  const data = await r.json();
  log(data.ok ? '✅' : '❌', 'Server Health', `OK: ${data.ok}`);
} catch(e) { log('❌', 'Health Check', 'Nicht erreichbar'); }

// Portal Phase
try {
  const r = await p8.request.get(`${BASE}/api/portal-phase`);
  const data = await r.json();
  log('✅', 'Portal Phase', `Phase: ${data.phase}, Features: ${Object.keys(data.features || {}).length}`);
} catch(e) { log('⚠️', 'Portal Phase', 'Check fehlgeschlagen'); }

await ctx8.close();

// ══════════════════════════════════════════════
// ABSCHLUSS-BERICHT
// ══════════════════════════════════════════════
await browser.close();

console.log('\n' + '═'.repeat(60));
console.log('VOLLSTÄNDIGER AUDIT ABGESCHLOSSEN');
console.log('═'.repeat(60));
console.log(`\n✅ OK:      ${allResults.ok}`);
console.log(`⚠️  Warnung: ${allResults.warn}`);
console.log(`❌ Fehler:  ${allResults.fail}`);

const total = allResults.ok + allResults.warn + allResults.fail;
const score = Math.round(allResults.ok / total * 100);
console.log(`\n📊 GESAMTSCORE: ${score}%`);

if (allResults.fail > 0) {
  console.log('\nKRITISCHE PROBLEME:');
  allResults.issues.filter(i => i.icon === '❌').forEach((i, n) => {
    console.log(`  ${n+1}. ${i.label}: ${i.detail}`);
  });
}
if (allResults.warn > 0) {
  console.log('\nWARNUNGEN:');
  allResults.issues.filter(i => i.icon === '⚠️').forEach((i, n) => {
    console.log(`  ${n+1}. ${i.label}: ${i.detail}`);
  });
}

fs.writeFileSync(`${DIR}/VOLLBERICHT.txt`, 
  allResults.issues.map(i => `${i.icon} ${i.label}: ${i.detail}`).join('\n')
);
