# Teil B — Frontend, Webdesign & UX

**Rolle:** Senior Frontend-Entwickler + UX/UI-Designer  
**Stand:** 2026-06-11 · HEAD `fcb7ac5`

---

## B1. Design-System-Konsistenz

### Hardcoded Hex-Farben

| Prüfung | Ergebnis | Beleg |
|---------|----------|-------|
| `rg -c '#[0-9a-fA-F]{6}' client/src --glob '*.tsx'` | **1382** Vorkommen | 2026-06-11 |
| Tailwind/CSS-Variablen | ✅ `client/src/index.css`, shadcn/ui Tokens | `index.css` |
| Dark-Mode | ✅ `dark:` Klassen weit verbreitet | z. B. `FuerVerwaltungsbuerosLanding.tsx:109` |

⚠️ **1382 Hardcoded-Hex** in `.tsx` — Design-Token-System existiert, wird aber nicht konsequent genutzt. Schwerpunkt: Admin-Pages (`AdminDashboard.tsx` 136 Treffer), `AIAssistant.tsx` (42), `KursLanding.tsx` (61).

### Dark-Mode-Stichprobe (Code-basiert, 5 Bereiche)

| Seite/Layout | Dark-Klassen | Bewertung |
|--------------|--------------|-----------|
| `/` Home | `dark:bg-*` in Footer/Layout | ✅ |
| `/fuer-verwaltungsbueros` | `dark:bg-slate-950`, Gradient-Hero | ✅ |
| `/app/verwalter` Dashboard | `RechenpraxisProductLayout` + slate/emerald | ✅ |
| Modul-Detail `/modul/3` | Tabs, Cards mit `dark:` | ✅ |
| Admin `/admin` | Teilweise inline Hex statt Tokens | ⚠️ |

🔍 Visueller Screenshot-Vergleich — **UNVERIFIZIERT**; PR #154 erwähnt „Dark-Mode vereinheitlicht" — noch Draft, nicht auf `main`.

---

## B2. Responsive Design

### Verwalter-Seiten (`/app/verwalter/*`)

| Komponente | Mobile-Pattern | Beleg |
|------------|----------------|-------|
| Landing Hero | `text-3xl sm:text-5xl`, `flex-wrap gap-4` | `FuerVerwaltungsbuerosLanding.tsx:122-131` |
| Mahnwesen Form | Standard `Input`/`Label`, kein fixed-width Table | `MahnwesenIndex.tsx:21-27` |
| Buttons | `min-h-[44px]` (Touch-Target) | `FuerVerwaltungsbuerosLanding.tsx:133` |

### Playwright Mobile (`26-verwalter-mobile-layout.spec.ts`)

❌ **2026-06-11 nicht ausführbar** — E2E-Login 401 (keine Credentials in Sandbox).  
🔍 Frühere Session: 6/6 — Wiederholung durch Alisad.

💭 Code-Review: Tabellen in `BuchungenIndex`/`VorgaengeIndex` nutzen `overflow-x-auto` — Stichprobe empfohlen auf <768px.

---

## B3. Barrierefreiheit (A11y)

### Automatisierte Scans

| Tool | URL | Ergebnis |
|------|-----|----------|
| `@axe-core/cli` | `https://immobilien-akademie-smart.de` | ❌ ChromeDriver 149 vs Chrome 148 mismatch |
| `pa11y` | — | 🔍 **AUSSTEHEND** |

💭 Alternative für Alisad: Lighthouse A11y-Score (bereits verfügbar) oder axe mit Playwright-Chrome:

```bash
CHROME_PATH=$(find ~/.cache/ms-playwright -name chrome-headless-shell | head -1)
npx @axe-core/cli URL --chromedriver-path=$CHROME_PATH
```

### Lighthouse Accessibility (2026-06-11)

| Seite | Score |
|-------|-------|
| `/` (Home) | **92** |
| `/app/verwalter/dashboard` (Redirect/Login-Shell) | **100** |

Beleg: `lighthouse-home.json`, `lighthouse-verwalter.json`

### Manuelle Stichproben

| Prüfung | Ergebnis | Beleg |
|---------|----------|-------|
| `aria-label` in `.tsx` | **~90** Vorkommen (35 Dateien) | `grep aria-label client/src` |
| `:focus-visible` | ✅ in UI-Komponenten + Module-Details | `button.tsx`, `Module1Detail.tsx:7` |
| Icon-Buttons mit Label | ⚠️ Teilweise — `ComfortBar.tsx` 9×, Rechner-Komponenten gut | Stichprobe |
| Custom 404 | ✅ mit Fokus-Ring | `not-found.tsx:21` |

---

## B4. Performance (Frontend)

### Build & Bundle (2026-06-11, `pnpm build`)

| Chunk | Größe |
|-------|-------|
| `pdf-*.js` | **392 KB** |
| `jspdf.es.min-*.js` | **320 KB** |
| `vendor-react-utils-*.js` | **268 KB** |
| `html2canvas-*.js` | **196 KB** |
| `Module3Content_Maximal-*.js` | **184 KB** |
| Server-Bundle `dist/index.js` | **820 KB** |

⚠️ PDF/jspdf/html2canvas dominieren — Lazy-Loading für Zertifikat/PDF-Features prüfen.

### Lighthouse Performance

| Seite | Performance | A11y | Best Practices | SEO |
|-------|-------------|------|----------------|-----|
| `/` | **85** | 92 | **100** | 92 |
| `/app/verwalter/dashboard` | **86** | 100 | **100** | 92 |

Beleg: Lighthouse CLI mit Playwright-Chrome, 2026-06-11

---

## B5. Content-Qualität & Konsistenz

### Marketing-Zahlen (854 / 855 / 4275)

| Zahl | Kontext | Korrekt? | Beleg |
|------|---------|----------|-------|
| **854** | Öffentliche Quiz-Fragen (konstant) | ✅ Test erzwingt | `shared/claims.ts:2`, `auth.test.ts:21` |
| **855+** | Lerntage/Aufgaben-Label Marketing | ⚠️ Bewusst ≠ 854 | `shared/claims.ts:3-5` |
| **855** | Partner-Dashboard „IHK-Fragen" | ⚠️ Inkonsistent zu 854 | `PartnerDashboard.tsx:68` |
| **4275** | Gesamt-Übungsfragen | 🔍 Nur in `docs/`, **nicht** in `client/src`/`shared` | `rg 4275 docs/` |

**Fachliche Quiz-Anzahl:** 854 öffentliche Fragen in `all-questions.ts` (IDs bis 855 als Frage-IDs, COUNT-Konstante = 854).

### Platzhalter / TODO / Lorem

```bash
rg -rn "TODO|FIXME|Lorem ipsum|\[Platzhalter\]" client/src server shared --glob '*.ts*'
# Ergebnis 2026-06-11: 0 Treffer in App-Code
```

✅ Keine offensichtlichen Platzhalter in Produktions-TS/TSX.

### Modul-3-Lerntage-Stichprobe

| Tag | Prüfung | Ergebnis |
|-----|---------|----------|
| Tag 1, 15, 40, 60, 80 | Markdown via `ReactMarkdown`, §-Links zu gesetze-im-internet.de | ✅ Struktur vorhanden |
| Render-Fehler | Lazy-Loading + `LoadingHandler` | ✅ `Module3Detail.tsx:14-19` |

🔍 Volltext-Fachprüfung → Teil F.

---

*Weiter: [F_FACHPRUEFUNG.md](./F_FACHPRUEFUNG.md)*
