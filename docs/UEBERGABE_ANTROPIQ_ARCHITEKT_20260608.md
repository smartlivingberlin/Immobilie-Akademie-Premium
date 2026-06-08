# Übergabebericht an Antropiq Cloud.AI — Architektur-Review

**Projekt:** Immobilien Akademie Smart · https://immobilien-akademie-smart.de  
**Repository:** `smartlivingberlin/Immobilie-Akademie-Premium`  
**Branch (Stand):** `main` @ `d981fb0` (PR #140 gemerged, 08.06.2026 ~22:00 CEST)  
**Erstellt für:** Unabhängiges Gegen-Audit / Architektur-Review durch den ursprünglichen Portal-Architekten (Antropiq)  
**Erstellt von:** Cursor Cloud Agent + Alisad Gadyri (Betreiber) — **nicht** als finale Wahrheit, sondern als Arbeitsgrundlage für kritische Prüfung

---

## 0. Auftrag an den Architekten (bitte wörtlich weitergeben)

> Prüfe **alles selbst**, mehrfach, mit eigenen Tools. Vertraue weder diesem Dokument noch den grünen Testergebnissen blind. Reproduziere Befehle in eigener Umgebung. Hinterfrage Architektur, Security, Datenintegrität, Stripe/B2B-Flows, Modul-Zugänge, DSGVO und Ops. Dokumentiere **Pro**, **Contra**, **Risiken**, **fehlende Tests** und **empfohlene Nacharbeiten**. Sei kritisch — nichts auslassen, nichts vorwegnehmen.

---

## 1. Executive Summary — Was sich seit ~05:00–06:00 Uhr (08.06.2026) geändert hat

### Gestern früh (Ausgangslage ~Audit-Start)

- Master-Audit lief, mehrere **Schein-Fehler** durch veraltete Test-Skripte (6 statt 7 Produkte, falscher Admin-Account `playwright@test.de`, Vitest-Timeout 5s auf WSL).
- Playwright hing sporadisch (Retry + Chromium auf WSL `/mnt/c/`).
- PR #139 (ComfortBar, Rechenpraxis WEG, Modul-6/7/8-Plan) war auf Prod, aber Test-Infrastruktur nicht angepasst.
- B2B CLI-Smoke (`ops:b2b-team-smoke`) war dokumentiert und manuell erfolgreich (Tenant `bobo gmbh`, Team-Code `TEAM-BOBOGMBH1-MM2F`).

### Heute (08.06.2026, Nachmittag/Abend) — Ergebnis

| Bereich | Vorher | Nachher |
|---------|--------|---------|
| Vitest | 120/122 (Timeout WSL) | **122/122** stabil |
| API-Tests Prod | 29/36 (Login + Produktanzahl) | **36/36** |
| Playwright Modul-Smoke | 10/10 instabil / Hang | **10/10** reproduzierbar (~34s) |
| Stripe-Produkte API | Test erwartete 6 | **7** (inkl. `compliance_20h`) |
| Admin-Login Tests | Hardcoded falsche Credentials | `B2B_ADMIN_PASSWORD` / `ops:test-admin-login` |
| Security-Scan `/admin` | Falsch-Positiv ❌ | SPA-Shell ℹ️ (kein API-Leak) |
| Repo `main` | Stand #139 | **PR #140 gemerged** |

**Fazit für Architekt:** Prod war weitgehend gesund; die sichtbaren „Fehler“ waren zu ~70 % **Test-/Ops-Tooling**, zu ~30 % **echte Konfigurationslücken** (Credential-Handling, Retry-Verhalten). Inhaltliche Modul-Regression auf Prod wurde durch E2E-Smoke nicht bestätigt.

---

## 2. Chronologie — PRs & Commits (relevant seit 07./08.06.2026)

| PR | Titel | Inhalt |
|----|-------|--------|
| **#134** | B2B team code smoke CLI | `scripts/ops/b2b-team-code-smoke.sh`, `pnpm run ops:b2b-team-smoke` |
| **#135** | Landing Login sichtbar | Login/Portal-Zugang auf Landing |
| **#136** | Übergabe-Doku Baumeister | `docs/UEBERGABE_BAYERISCHER_BAUMEISTER_20260608.md` (falls vorhanden) |
| **#138** | Bash-Syntax-Fix | Extra `)` in B2B-Smoke-Script |
| **#139** | ComfortBar + Rechenpraxis USP | Siehe Abschnitt 3 |
| **#140** | Audit-Suite Fixes | Siehe Abschnitt 4 — **in `main` gemerged** |

---

## 3. Produkt & UX — Was entwickelt/erweitert wurde (PR #139)

### A) Komfort-Leiste (Accessibility)

- **Neu:** `client/src/components/ComfortBar.tsx`
- **Vereinheitlicht:** `client/src/hooks/use-a11y-prefs.ts` (Schrift 85–200 %, Zeilenabstand, Dark Mode via `.dark`)
- **Eingebunden in:** `PublicHeader`, `DashboardLayout`, `LoginPage`
- **Prod-Bundle bestätigt:** `ComfortBar-*.js` im Build
- **Architekt soll prüfen:** Sichtbarkeit oben rechts nach Hard-Refresh; Konsistenz Dark Mode auf Modulseiten (bekannt: ~112 inline `fontSize` in `KursLanding` — partiell)

### B) Rechenpraxis als USP / Spin-off

- **10 neue WEG-Aufgaben** (IDs 129–138) in `client/public/data/rechenpraxis.json`
- **Stand:** 138 Aufgaben gesamt, **30 WEG** (`RECHENPRAXIS_TASK_COUNT` in `shared/rechenpraxisProduct.ts`)
- **Landing:** `/verwalter-rechner` überarbeitet
- **Prod-Schutz:** `/data/rechenpraxis.json` → **403** (nur App-intern)
- **Architekt soll prüfen:** JSON-Integrität, Berechnungslogik, Stripe `rechenpraxis-checkout`, Zugangskontrolle `/rechenpraxis`

### C) Modul 6/7/8 — Strategische Entscheidung

- **Keine** separaten Module 6–8 als Kurse
- **Doku:** `docs/MODUL_678_VERTEILUNGSPLAN.md`
- Inhalte der ehemaligen Platzhalter → Modul 1–5, Rechenpraxis, Ratgeber
- **Architekt soll prüfen:** Ob Routing/SEO/B2B-`enabledModules` noch Referenzen auf 6–8 enthält

---

## 4. Technische Korrekturen (PR #140 — in `main`)

| Datei | Änderung |
|-------|----------|
| `vitest.config.ts` | Global `testTimeout: 120_000` (WSL) |
| `server/inspectTrpc.integration.test.ts` | Suite-Timeout 120s |
| `tests/api/api-tests.py` | 7 Produkte, `compliance_20h`, `B2B_ADMIN_PASSWORD`, Rate-Limit-Hinweise |
| `tests/e2e/global-setup.ts` | Echte Admin-Creds, Magic-Link-Fallback, Platzhalter-Erkennung |
| `tests/security/security-scan.sh` | `/admin` = SPA-Info |
| `playwright.config.ts` | `retries: 0` für `playwright-tests` (WSL-Hang-Fix) |
| `scripts/ops/test-admin-login.sh` | JSON-sicherer Prod-Login-Check |
| `package.json` | `pnpm run ops:test-admin-login` |
| `docs/EXTERNAL_OPS_CHECKLIST.md` | Master-Audit + B2B CLI ✅ |

### Bewusst **nicht** geändert (AGENTS.md Verbot)

```
drizzle/schema.ts
server/db.ts
server/ragTutor.ts
server/_core/context.ts
server/_core/sdk.ts
client/src/pages/modules/Module6.tsx
client/src/pages/modules/Module7.tsx
client/src/pages/modules/Module8.tsx
```

---

## 5. Reproduzierbare Beweise — So prüft der Architekt selbst

### 5.1 Prod Health (ohne Geheimnisse)

```bash
pnpm run ops:health
```

**Erwartung (08.06.2026):**
```json
{ "ok": true, "db": "connected", "migrations": { "pending": 0, "total": 45 } }
```
Quiz-Guard: HTTP **403** · B2B Landing: **200**

### 5.2 Admin-Login (Passwort nur lokal)

```bash
unset TEST_ADMIN_PASSWORD
read -s -p "Admin-Passwort: " B2B_ADMIN_PASSWORD && echo
export B2B_ADMIN_PASSWORD
export B2B_ADMIN_EMAIL='alisadgadyri38@gmail.com'
pnpm run ops:test-admin-login
```

**Erwartung:** `HTTP 200` · `{"ok":true,"role":"admin",...}`

### 5.3 Master-Audit (lokal, ~2 Min)

```bash
pnpm vitest run
SKIP_RATE_LIMIT_TEST=1 python3 tests/api/api-tests.py
pnpm run test:e2e:smoke
```

**Erwartung (mehrfach reproduziert am 08.06.2026):**

| Suite | Ergebnis |
|-------|----------|
| Vitest | 48 Dateien · **122/122** |
| API Prod | **36/36** |
| Playwright | **10/10** (M1–M5 Intro + Lerntag 1) |

### 5.4 Security & Infrastruktur

```bash
bash tests/security/security-scan.sh
bash tests/monitoring/uptime-check.sh
npx tsc --noEmit --skipLibCheck
pnpm audit --audit-level=moderate
```

### 5.5 B2B CLI (Stripe Testmodus)

```bash
export B2B_ADMIN_EMAIL="alisadgadyri38@gmail.com"
# B2B_ADMIN_PASSWORD setzen
pnpm run ops:b2b-team-smoke
```

**Bekannter Erfolgsfall:** Team-Code Einlösung, `tenantId: 1`, `enabledModules: "1,2"`.

### 5.6 Content-Integrität

```bash
node -e "const d=require('./client/public/data/rechenpraxis.json'); console.log('total='+d.length,'weg='+d.filter(x=>x.bereich.includes('WEG')).length)"
# Erwartung: total=138 weg=30
```

Modul-Tage: `python3 tests/content/content-quality-check.py` → **5/5 Module vollständig** (M2–M5 Tag-Counts im Audit-Log).

---

## 6. Architektur-Stack (Referenz)

| Schicht | Technologie |
|---------|-------------|
| Frontend | React 19, Vite 5, Tailwind 4, wouter |
| Backend | Express 4.21, tRPC 11, Node 22 |
| DB | MySQL 9.4, Drizzle ORM (45 Migrationen angewendet) |
| Payments | Stripe (Test aktiv, **Live bewusst noch nicht**) |
| Hosting | Railway · Domain immobilien-akademie-smart.de |
| Tests | Vitest 4, Playwright, Python API-Suite, Bash Security/Uptime |

---

## 7. Was der Architekt **kritisch** separat prüfen sollte

### 7.1 Security (nicht nur Smoke)

- [ ] CSP `unsafe-inline` — notwendig vs. XSS-Risiko
- [ ] `/admin` SPA 200 — clientseitige Auth ausreichend? IDOR auf tRPC?
- [ ] Rate-Limit Login — 15 Min Sperre: IP-basiert, Umgehung?
- [ ] `OWNER_MAGIC_CODE`, `MAGIC_LINK_SECRET`, `INSPECT_JWT_SECRET` Rotation
- [ ] DMARC, AVVs, Impressum Gewerbeschein (extern, siehe Checkliste)
- [ ] Penetration: `/api/trpc/*` Mutationen, Inspect-Mode-Bypass
- [ ] R2 Backup: Restore **nicht** vollständig verifiziert (☐ in Ops-Liste)

### 7.2 Stripe & B2B

- [ ] 7 vs. 18 Price-IDs — Konsistenz Railway Env vs. `stripe:seed-prices`
- [ ] B2B Webhook `invoice.paid` Metadata (Fix in Commit `a111ef3`)
- [ ] Live-Keys **absichtlich** noch aus — Go-Live-Readiness laut `STRIPE_LIVE_GO_LIVE.md`
- [ ] Connect Transfers / Partner-Ledger — nur Unit-Tests, kein Live-Geldfluss

### 7.3 KI / RAG

- [ ] `server/ragTutor.ts` — **nicht** von uns geändert (Modell: `claude-haiku-4-5`)
- [ ] Fair-Use, Kosten, Prompt-Injection, PII in Logs
- [ ] Fehlende API-Keys lokal = WARN only; Prod-Verhalten?

### 7.4 UX / A11y

- [ ] ComfortBar vs. altes `data-theme` — zwei Dark-Systeme teilweise parallel
- [ ] Pa11y-Audit im Master-Log (optional) — Ergebnisse nicht vollständig archiviert
- [ ] Lighthouse auf WSL fehlgeschlagen — **Prod-Performance unbekannt** via CI

### 7.5 Daten & Module

- [ ] Modul 4 Ladezeit (Branch-Name `fix-module-4-loading` historisch) — E2E grün, aber kein Lasttest
- [ ] `enabledModules` CSV für B2B vs. Admin-Override
- [ ] Rechenpraxis JSON vs. Server-Guard — Manipulation über DevTools?

---

## 8. Bekannte offene Punkte (ehrlich)

| Priorität | Thema | Status |
|-----------|-------|--------|
| P1 | R2 Restore-Test | ☐ |
| P1 | Railway MySQL FAILED Incident | ☐ Doku vorhanden |
| P2 | B2B Browser-Checkout + Post-Checkout Wizard | ☐ (CLI ✅) |
| P3 | Stripe **Live** | ☐ bewusst wartend |
| P4 | DMARC, Gewerbeschein, AVVs | ☐ extern |
| P5 | Sentry, Uptime Kuma, CI Stripe E2E | ☐ |
| UX | Modul-Seiten Dark Mode + inline styles | 🟡 partiell |
| Tests | Rate-Limit-Test triggert 15-Min-Sperre | `SKIP_RATE_LIMIT_TEST=1` |

---

## 9. Pro & Contra — für die Architektur-Entscheidung

### Pro (belastbar durch Tests)

- Prod stabil: Health, Migrations, Uptime, Security-Headers
- Vollständiger Modul-Content M1–M5 (Content-Quality + E2E)
- B2B Team-Code-Pfad CLI-verifiziert
- Test-Suite nach PR #140 reproduzierbar dokumentiert
- Rechenpraxis-USP messbar (138/30 WEG)
- Keine Änderung an kritischen verbotenen Kernfiles während Audit-Fixes

### Contra / Risiken (Architekt soll gewichten)

- Schwere Abhängigkeit von **manuellen** Prod-Tests gegen Live-URL (kein Staging)
- Playwright gegen Prod mit echtem Admin — kein isoliertes Test-Environment
- WSL/Windows-Pfad `/mnt/c/` verzerrt lokale Testzeiten; CI (GitHub) nicht vom Betreiber täglich verifiziert
- Stripe Live, R2 Restore, Legal — **nicht** release-blocking im Code, aber **business-blocking**
- Master-Audit-Script im Chat teilweise korrupt/optional (Lighthouse, Pa11y, voller E2E) — nicht alles automatisierbar
- Secrets in Shell-History-Risiko (`B2B_ADMIN_PASSWORD`) — Ops-Hygiene nötig

---

## 10. Empfohlene Review-Methodik für Antropiq

1. **Clone fresh:** `git clone` + `git checkout main` @ `d981fb0`
2. **Static:** `tsc`, ESLint falls vorhanden, Dependency-Audit, Secret-Scan (gitleaks/trufflehog)
3. **Dynamic Prod:** Health, API-Suite, Security-Scan — **eigene** IP/Session
4. **Dynamic Local:** Vitest + Build `pnpm build`
5. **E2E:** Playwright mit **eigenem** Test-Account (nicht Produktiv-Admin teilen)
6. **Stripe:** Dashboard Webhook-Logs, Test-Event-Replay
7. **DB:** Read-only Queries Migrations-Ledger, User-Rollen, B2B Tenants
8. **Dokumentation:** Abgleich `EXTERNAL_OPS_CHECKLIST.md` vs. Railway/Stripe Realität
9. **Schriftlicher Befund:** P0/P1/P2, mit Repro-Schritten

---

## 11. Anhänge im Repo

| Dokument | Zweck |
|----------|-------|
| `docs/EXTERNAL_OPS_CHECKLIST.md` | Offene manuelle Aufgaben |
| `docs/B2B_SMOKE_TEST.md` | B2B Schritt-für-Schritt |
| `docs/MODUL_678_VERTEILUNGSPLAN.md` | Content-Strategie |
| `docs/STRIPE_LIVE_GO_LIVE.md` | Live-Schaltung |
| `docs/R2_ACTIVATION_CHECKLIST.md` | Backup/Restore |
| `docs/CASE_MANAGEMENT_20260607.md` | Offene Cases |
| `AGENTS.md` | Verbotene Dateien für Automation |

---

## 12. Kontakt & Zugang (für Architekt — vom Betreiber zu klären)

- GitHub Repo-Zugang (read/admin)
- Railway Dashboard (read-only reicht für Review)
- Stripe Dashboard Test + ggf. Live
- Admin-Account **separat** anlegen für Review — nicht Passwort aus diesem Dokument

---

*Dieses Dokument ist eine Momentaufnahme vom 08.06.2026, 22:00 CEST. Jede Aussage ist durch den Architekten zu verifizieren.*
