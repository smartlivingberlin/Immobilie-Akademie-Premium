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
| **#141** | Inspect-Query-Sperre (P0) | Admin-tRPC-Queries im Inspect-Modus geblockt — **merge-ready** |
| **#142** | M6–8 Cleanup | Veraltete Referenzen, Totcode, CI-Guard — **merge-ready** |

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
```

**Hinweis:** Module 6–8 (`Module6.tsx` etc.) existieren nicht und wurden aus dem Produkt entfernt bzw. nie ausgeliefert. Nur Module 1–5 sind aktiv.

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
- [x] Penetration: Inspect tRPC Admin-Query-Leak — **behoben in PR #141** (`adminUsers.list` etc. → 403)
- [ ] Penetration: Inspect REST Admin-GET-Leak — **PR `cursor/inspect-rest-allowlist-7dbc`** (Default-Deny-Allowlist)
- [ ] Penetration: `/api/trpc/*` Mutationen, weitere IDOR-Pfade
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
| **P0** | Inspect Admin-Leak (DSGVO) | 🟡 tRPC ✅ PR #141 · REST ☐ Allowlist-PR |
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

## 13. Forensische Nachfragen NF-9 bis NF-13 (Antworten, 08.06.2026)

> Ergänzung nach Architekt-Review. Keine finale Wahrheit — reproduzierbar prüfen.

### NF-9 — R2 Cron-Verifikation

| Frage | Befund |
|-------|--------|
| **Nächster Cron** | `17 2 * * *` UTC in `.github/workflows/mysql-backup-r2.yml` → täglich **02:17 UTC** (03:17 MESZ / 04:17 MEZ) |
| **Scheduled Runs seit Aktivierung?** | **Nein.** `gh run list --workflow=mysql-backup-r2.yml` zeigte bis 08.06.2026 nur `workflow_dispatch` (letzter Erfolg: 08.06.2026 11:49 UTC). Kein `event: schedule` |
| **Lautloses Versagen erkennen?** | Aktuell **kein dediziertes Alerting**. Indirekt: (1) GitHub Actions Failure-Mail, (2) `gh run list`, (3) R2 `latest/`-Objekt `LastModified` > 25h alt, (4) fehlendes Artifact `mysql-backup-metadata-*`, (5) `EXTERNAL_OPS_CHECKLIST.md` Punkt 4+20 noch ☐ |

**Empfehlung:** Siehe Anhang A.1 (Slack/E-Mail bei Workflow-Failure).

### NF-10 — Erster R2-Restore-Test (Anleitung Alisad)

**GitHub Actions (Backup auslösen):**

1. GitHub → Actions → **MySQL Backup to Cloudflare R2** → **Run workflow** (Branch `main`)
2. Grüner Job + Artifact `mysql-backup-metadata-*` prüfen
3. R2 prüfen: `mysql/production/latest/immobilien-akademie-smart_mysql_latest.sql.gz.gpg`

**Lokale Verifikation (WSL):**

```bash
# Secrets aus Passwort-Manager / Railway — nicht ins Repo
export R2_ACCOUNT_ID="…" R2_BUCKET="…" R2_PREFIX="mysql/production"
export AWS_ACCESS_KEY_ID="…" AWS_SECRET_ACCESS_KEY="…"

mkdir -p restore_inbox
aws s3 cp \
  "s3://${R2_BUCKET}/${R2_PREFIX}/latest/immobilien-akademie-smart_mysql_latest.sql.gz.gpg" \
  ./restore_inbox/ \
  --endpoint-url "https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"

gpg --batch --yes --passphrase "$BACKUP_ENCRYPTION_PASSPHRASE" \
  -d ./restore_inbox/immobilien-akademie-smart_mysql_latest.sql.gz.gpg \
  > ./restore_inbox/restore.sql.gz
gzip -t ./restore_inbox/restore.sql.gz
```

Vollständiger Docker-Restore: `docs/RUNBOOK_BACKUP_RESTORE.md` (Abschnitt „Restore-Test lokal durchführen“). Kernzählungen mit `key_counts_latest.txt` vergleichen. Ergebnis in `audit_runs/r2_restore_test_YYYYMMDD/` dokumentieren.

| Thema | Befund |
|-------|--------|
| **Backup-Größe** | Ohne R2-Zugriff nicht messbar. Workflow loggt `ls -lh` im Job-Summary. Manueller Referenz-Dump 06.06.2026: `audit_runs/mysql_manual_backup_20260606_065425/` (komprimiert, vor GPG) |
| **GPG-Passphrase** | GitHub Actions Secret **`BACKUP_ENCRYPTION_PASSPHRASE`** (Repo → Settings → Secrets → Actions). Wert separat im Passwort-Manager — **nicht** im Repo (`docs/R2_ACTIVATION_CHECKLIST.md`) |

### NF-11 — Stripe Live-Readiness Pre-Flight

**Pflicht-ENVs (18 Price-IDs + Keys)** — Quelle: `shared/stripeLiveEnv.ts`

| Kategorie | Variablen |
|-----------|-----------|
| Keys | `STRIPE_SECRET_KEY` (sk_live_), `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `VITE_STRIPE_PUBLIC_KEY`, `APP_URL` |
| Abos (6) | `STRIPE_PRICE_RECHENPRAXIS_MONTHLY`, `RENEWAL_MONTHLY`, `RENEWAL_YEARLY`, `COMPLIANCE_YEARLY`, `B2B_STARTER`, `B2B_PROFESSIONAL` |
| Module/Bundles (12) | `STRIPE_PRICE_MODUL_1` … `_5`, `MODUL_KOMPLETT`, `BUNDLE_STARTER`, `VERWALTER`, `MAKLER_PLUS`, `PROFI`, `GUTACHTER`, `KOMPLETT` |

**Fehlende Price-ID:** **Kein Crash.** `buildPaymentLineItem` / `buildSubscriptionLineItem` (`shared/stripePriceIds.ts`) fallen auf dynamisches `price_data` zurück → Checkout funktioniert, aber **ad-hoc-Produkte** statt kanonischer Dashboard-Prices (Reporting-/Compliance-Risiko).

**Test-Mode-Hardcoding:** Kein erzwungener Test-Mode. Modus ergibt sich aus `STRIPE_SECRET_KEY`-Präfix (`sk_test_` vs `sk_live_`). `server/stripe.ts` PRODUCTS-Array liefert Cent-Fallback für `price_data` — testfreundlich, greift auch ohne ENV.

**Empfehlung:** Siehe Anhang A.2 (Pre-Flight-Skript gegen Stripe API).

### NF-12 — CSP Hardening-Roadmap

**Aktuell** (`server/_core/index.ts:97-102`): `script-src 'unsafe-inline'`, `style-src 'unsafe-inline'`.

| Schritt | Aufwand | Wirkung |
|---------|---------|---------|
| **Minimal-invasiv:** Theme-Snippet `client/index.html:181-187` → externe `/theme-init.js` | Klein | Eine Inline-script-Quelle weniger |
| JSON-LD `index.html:51` | — | CSP-exempt (`application/ld+json`) |
| Skip-Link `onfocus`/`onblur` | Mittel | Event-Handler = inline |
| **Nonce-Pipeline** (Express Nonce → Helmet → HTML) | 0,5–1 Tag Prod; +0,5 Tag Handler | `unsafe-inline` in Prod entfernbar |
| **Dev HMR** | — | Vite HMR braucht `'unsafe-inline'` in Dev — üblich: Nonce nur Prod, Dev weiter inline |

Weitere Inline: `client/public/offline.html`, React `dangerouslySetInnerHTML` (Chart, AI-Markdown — betrifft eher `style-src`). Stripe.js extern (`https://js.stripe.com`) — bereits allowlisted.

### NF-13 — User-Journey End-to-End (Code-Analyse)

Vollständiges curl-Skript gegen Prod wurde **nicht** ausgeführt (würde echte User/Stripe-Events erzeugen).

| Schritt | Mechanismus | Status | Anmerkung |
|---------|-------------|--------|-----------|
| 1 Registrierung | `POST /api/auth/register` | ✅ | Sofort Session-Cookie |
| 2 E-Mail-Bestätigung | — | **Nicht implementiert** | Nur Willkommens-Mail (Resend) |
| 3 Login | `POST /api/auth/login` | ✅ | Rate-Limit 10/15min |
| 4 Modul-Vorschau | `/kurse`, `/modul/1` | 🟡 | Landing öffentlich; Lerninhalt braucht `enabledModules` |
| 5 Checkout | `POST /api/stripe/checkout` | ✅ | `widerrufsAkzeptiert: true` Pflicht |
| 6 Webhook | `POST /api/stripe/webhook` | ✅ | Signatur + `STRIPE_WEBHOOK_SECRET` |
| 7 `enabled_modules` | `stripeWebhookHandler` | ✅ | Merge per Kauf-E-Mail |
| 8 Lerntag | `trpc.progress.startDay` | ✅ | Modul-Zugang nötig |
| 9 Quiz | `trpc.quiz.*` | ✅ | Modul-Zugang nötig |
| 10 Account löschen | `trpc.account.deleteMyAccount` | ✅ | DSGVO-Pfad `routers.ts` |
| 11 Post-Delete-Verify | — | **Nicht automatisiert** | Kein Audit-Log-Endpoint |

**Prod-Probe 08.06.2026:** `GET /api/health` → 200 · `GET /api/stripe/products` → 7 Produkte JSON.

**Offene Produktfragen für Alisad:** Siehe Anhang A.3.

---

## 14. Anhang — Empfehlungen & offene Produktfragen

### A.1 NF-9 — R2 Workflow-Failure-Notification (Folge-PR empfohlen)

**Ziel:** Lautloses Cron-Versagen vermeiden.

**Vorschlag (kleiner PR):** In `.github/workflows/mysql-backup-r2.yml` am Job-Ende:

```yaml
- name: Notify on failure
  if: failure()
  uses: slackapi/slack-github-action@v2
  with:
    webhook: ${{ secrets.SLACK_WEBHOOK_URL }}
    webhook-type: incoming-webhook
    payload: |
      {"text": "❌ MySQL R2 Backup failed: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"}
```

Alternative ohne Slack: `dawidd6/action-send-mail` mit `secrets.OPS_ALERT_EMAIL`. Secret `SLACK_WEBHOOK_URL` oder `OPS_ALERT_EMAIL` in GitHub anlegen.

### A.2 NF-11 — Stripe Live Pre-Flight-Check-Skript (Folge-PR empfohlen)

**Ziel:** Alle 18 `STRIPE_PRICE_*` ENV-Variablen gegen Stripe Dashboard validieren **bevor** Live-Umschaltung.

**Vorschlag:** `scripts/ops/stripe-price-preflight.ts` (oder `.sh` + Stripe CLI):

1. Liest `STRIPE_SECRET_KEY` + alle Keys aus `shared/stripeLiveEnv.ts` / `stripePriceIds.ts`
2. Pro gesetzter `price_…`-ID: `stripe.prices.retrieve(priceId)` (API-Call)
3. Prüft: `active === true`, Währung EUR, Modus (live vs test) passt zum Key-Präfix
4. Meldet: fehlende ENV, ungültige IDs, Test-Prices unter Live-Key, Lookup-Key-Mismatch zu `STRIPE_SEED_CATALOG`
5. Exit-Code 1 bei Discrepancies → CI-Gate oder manuell `pnpm run ops:stripe-preflight` vor Go-Live

Referenz: `server/scripts/seed-stripe-prices.ts`, `shared/stripePriceReadiness.ts`.

### A.3 NF-13 — Offene Fragen an Alisad (Produktentscheidung)

1. **E-Mail-Verifikation bei Registrierung:** Aktuell **bewusst nicht implementiert** — `POST /api/auth/register` erstellt sofort Session (`server/_core/auth-local.ts`). Nur Willkommens-Mail via Resend, kein Bestätigungslink, kein Gate vor Login. **Frage an Alisad:** Soll das so bleiben (niedrigere Hürde, höheres Fake-Account-Risiko) oder Double-Opt-In vor erstem Login?

2. **Post-Delete DSGVO-Verify:** `account.deleteMyAccount` löscht Multi-Table (`routers.ts`), aber es gibt **keinen** Audit-Log-Eintrag oder Verify-Endpoint der nachweist „User X vollständig entfernt“. **Frage an Alisad:** Soll ein `deletion_audit_log` (userId-Hash, Timestamp, Tabellen-Checkliste, kein PII) für Compliance-Nachweise eingeführt werden?

---

## 15. Inspect REST-Allowlist (P0 Restteil)

**Problem:** PR #141 blockierte nur **tRPC**-Admin-Queries. `requireAdmin` in `authMiddleware.ts` ließ **alle** Admin-GET-Requests im Inspect durch (ohne Session) — inkl. `ki-stats` (Chat-Snippets), `pending-purchases` (E-Mails), `referral-stats`, etc.

**Lösung:** Default-Deny + explizite Allowlist (`INSPECT_REST_ADMIN_GET_ALLOWLIST` in `inspectMode.ts`).

| GET-Endpoint | Inspect | Begründung |
|--------------|---------|------------|
| `/api/admin/mysql-health` | ✅ | DB/Migration-Status, keine PII |
| `/api/admin/migration-status` | ✅ | Migrations-Ledger, keine PII |
| `/api/admin/stripe-webhook-health` | ✅ | Webhook-Konfig-Flag |
| `/api/agent/health` | ✅ | System-Health (AdminDashboard-Widget) |
| `/api/agent/status` | ✅ | Agent-Runtime-Status |
| `/api/agent/cron-log` | ✅ | Cron-Zeilen, keine E-Mails |
| `/api/agent/knowledge-map` | ✅ | Statische Gesetzes-URLs |
| `/api/admin/ki-stats` | ❌ | Chat-Snippet-Ausschnitte aus DB |
| `/api/admin/pending-purchases` | ❌ | Käufer-E-Mails |
| `/api/admin/referral-stats` | ❌ | Referral-/Nutzerbezug |
| `/api/admin/trial-leads` | ❌ | Lead-E-Mails |
| `/api/admin/payout-ledger` | ❌ | Finanz-/Partnerdaten |
| `/api/admin/partner-payout-*` | ❌ | Partner-/Auszahlungsdaten |
| `/api/admin/stripe-live-*` (außer webhook-health) | ❌ | Nicht nötig für Modul-Vorschau |
| `/api/agent/coaching` | ❌ | Nutzer-Lernprofile |
| `/api/agent/coaching/:userId` | ❌ | PII pro User |
| `/api/agent/legal-updates` | ❌ | Nicht nötig für Vorschau |

**Owner-Routes** (`/api/owner/*`) nutzen `requireOwner`, nicht Inspect-Bypass — **außerhalb** dieses PRs.

---

## 16. Merge-Reihenfolge PR #141 / #142 (vom Betreiber)

1. **#141** (Inspect P0) mergen → **3 Min warten** → Prod: Inspect-Token, `adminUsers.list` muss 403 liefern; `modules.myAccess` weiter `[1,2,3,4,5]`
2. **#142** (M6–8 Cleanup) mergen → **3 Min warten** → CI-Guard aktiv (kein `modul/[678]` / `Module[678]` in `client/src`)
3. **#148** (Inspect REST-Allowlist) — **in `main` gemerged** @ `a733b99` (08./09.06.2026)

---

## 17. Bericht-Korrektur-Nachtrag (NF-A1–A7 + externe Verifikation 09.06.2026)

Dieser Abschnitt korrigiert die Reifegrad-Bewertung aus dem Architektur-Audit nach methodischer Gegenprüfung (NF-A1–A7) und integriert **externe Belege**, die Alisad am 09.06.2026 unabhängig eingeholt hat.

### 17.1 NF-A1 — PR #148 (Inspect REST-Allowlist)

| Aussage (korrigiert) | Status |
|----------------------|--------|
| PR #148 ist **gemerged** in `main` (`a733b99`) | ✅ |
| Live-Verifikation 09.06.: `inspect_mode=1` Cookie → `GET /api/admin/ki-stats` = **403**, `GET /api/admin/mysql-health` = **200** | ✅ reproduziert |
| Owner-Routes `/api/owner/*` weiterhin **außerhalb** der REST-Allowlist (separates `requireOwner`) | offen dokumentiert |

### 17.2 NF-A2 — Gesamtreifegrad

| Version | Note | Label |
|---------|------|-------|
| Erstbewertung (verworfen) | **3,2 / 5** | „Production" — zu optimistisch |
| Nach NF-A1–A7 (intern) | **2,8 / 5** | Late Beta / Soft Launch |
| Nach externer Kalibrierung (09.06.) | **~3,3–3,5 / 5** | Late Beta (Ops/Legal), Web-Standards teils Best-in-Class |

**Begründung:** Ops/DR (~2,0), Legal (~2,0) und unbewiesener R2-Restore ziehen den Schnitt. TLS A+, SEO 100, Accessibility 92 und Best Practices 96 heben die Web-Dimensionen an.

### 17.3 NF-A3 — Performance mit echten PageSpeed-Daten

**Quelle:** Google PageSpeed Insights Mobile, 09.06.2026 09:30 MESZ

| Metrik | Wert | Bewertung |
|--------|------|-----------|
| Performance | **78 / 100** → **3,9 / 5** | Gut, LCP kritisch |
| Accessibility | **92 / 100** → **4,6 / 5** | Sehr gut |
| Best Practices | **96 / 100** → **4,8 / 5** | Sehr gut |
| SEO | **100 / 100** → **5,0 / 5** | Exzellent |
| FCP | 3,1 s | |
| **LCP** | **4,5 s** | Ziel &lt;2,5 s — Hauptproblem |
| TBT | 0 ms | Exzellent |
| CLS | 0 | Exzellent |
| Speed Index | 3,1 s | |

**PageSpeed-Einsparpotenziale:** Render-blocking −370 ms · Bilder −34 KiB · Nicht verwendetes JS −126 KiB

**Lighthouse lokal:** `tests/performance/lighthouse-test.sh` schlägt auf WSL fehl („Lighthouse Analyse fehlgeschlagen"). PageSpeed Insights ist bis Skript-Fix der belastbare Ersatz.

### 17.4 NF-A4 — Konkurrenzvergleich

`docs/COMPETITIVE_ANALYSIS.md` und USP-Formulierungen im Marketing sind **unbelegt** (keine unabhängige Quellenstudie). Nicht für Reifegrad oder externe Claims verwenden ohne Nachweis.

### 17.5 NF-A5 — Tests als Indikator, nicht Beweis

| Test | Stand 09.06. | Aussagekraft |
|------|--------------|--------------|
| Vitest | 135 / 135 | Indikator Code-Regression |
| API-Tests Prod | 36 / 36 | Indikator Endpoints |
| Playwright M1–M5 | 10 / 10 | Indikator User-Journey |
| `ops:health` | DB ok, 0 pending migrations | Indikator Ops |

Grün ≠ Produktionssicherheit. Externe Scans (Qualys, PageSpeed, securityheaders.com) ergänzen, ersetzen nicht Pen-Test.

### 17.6 NF-A6 — Risikoregister

Zentrale Risikoübersicht: **`docs/RISIKOREGISTER.md`** (PR `cursor/risk-register-v1-7dbc`). Enthält Severity, Mitigation-Status, Maßnahmen und Verantwortlichkeit (Code / Alisad / extern).

### 17.7 NF-A7 — Module 3 Bundle-Größe

| Chunk | Minified | Gzip |
|-------|----------|------|
| `Module3Content_Maximal-*.js` | **~184 KB** | **~53 KB** |

Lazy-loaded (nicht im Home-Initial-Bundle). Weitere Splits (Part 2–4) optional.

### 17.8 Externe TLS/SSL-Verifikation (Qualys SSL Labs, 09.06.2026 07:33 UTC)

| Kriterium | Ergebnis |
|-----------|----------|
| Overall Rating | **A+** → **5,0 / 5** |
| Certificate / Protocol / Key Exchange / Cipher | je 100 / 100 |
| TLS 1.3 + Post-Quantum (X25519MLKEM768) | ✅ |
| HSTS max-age=31536000 + includeSubDomains | ✅ |
| Forward Secrecy | ROBUST |
| Bekannte Schwachstellen (BEAST, POODLE, Heartbleed, ROBOT, …) | abgewehrt |

### 17.9 HTTPS Security-Header (eigene curl-Verifikation 09.06.2026)

```bash
curl -sI https://immobilien-akademie-smart.de/ | grep -iE "content-security|x-frame|x-content-type|referrer-policy|permissions-policy|strict-transport|cross-origin"
```

| Header | Gesetzt | Anmerkung |
|--------|---------|-----------|
| Content-Security-Policy | ✅ | `unsafe-inline` in script-src + style-src (XSS-Risiko, NF-12 Roadmap) |
| Strict-Transport-Security | ✅ | `max-age=31536000; includeSubDomains` — **`preload` fehlt in Live-Response** (Code in `server/_core/index.ts` setzt preload, Helmet überschreibt) |
| X-Frame-Options | ✅ | SAMEORIGIN |
| X-Content-Type-Options | ✅ | nosniff |
| Referrer-Policy | ✅ | no-referrer |
| Permissions-Policy | ✅ | camera/mic/geo aus, payment für Stripe |
| Cross-Origin-Opener-Policy | ✅ | same-origin |
| Cross-Origin-Resource-Policy | ✅ | same-origin |
| Cross-Origin-Embedder-Policy | ❌ | nicht gesetzt |
| Snyk „Missing Headers" | **ungültig** | Snyk testete HTTP, nicht HTTPS |

### 17.10 Reifegrad-Tabelle (kalibriert, 09.06.2026 — Stand nach 6 externen Tools)

| Dimension | Note vorher | Externe Realität | Neue Note | Beleg-Quelle |
|-----------|-------------|------------------|-----------|--------------|
| TLS / SSL | nicht bewertet | A+, 100/100 überall | **5,0** | Qualys SSL Labs 09.06. |
| Security Headers (HTTPS) | ~3,5 (intern) | Mozilla Observatory **B+ (80/100)**; CSP unsafe-inline (−20); Snyk HTTPS Grade A | **4,2** | Observatory + Snyk HTTPS 09.06. |
| Performance Desktop | — | 99/100, LCP 1,0 s, FCP 0,6 s | **4,9** | PageSpeed Desktop 09.06. 10:08 |
| Performance Mobile | 2,5 (unverifiziert) | 77/100, LCP 4,8 s, FCP 3,1 s | **3,8** | PageSpeed Mobile 09.06. 10:08 |
| Performance International | — | GTmetrix Seattle 76 %, LCP 2,6 s | **3,7** | GTmetrix 09.06. |
| Accessibility | 3,0 | 92/100 | **4,6** | PageSpeed Insights 09.06. |
| SEO | 3,5 | 100/100 | **5,0** | PageSpeed Insights 09.06. |
| Best Practices | nicht bewertet | 96/100 | **4,8** | PageSpeed Insights 09.06. |
| **E-Mail-Stack** | nicht bewertet | Internet.nl Mail **63 %**; SPF permerror; DMARC pct=10 | **2,5** | Internet.nl + dig 09.06. |
| **IPv6 (Web + Mail)** | nicht bewertet | Kein AAAA (Web Railway); MX UDAG ohne AAAA | **1,0** | Internet.nl + dig 09.06. |
| App-Security (Inspect, Auth) | ~3,5 | #141+#148 merged, Live 403/200 | **3,8** | Repo + Live-Test 09.06. |
| Ops / DR | 2,0 | R2-Restore unbewiesen, kein Staging | **2,0** | Runbooks, Alisad-Status |
| Legal / Compliance | 2,0 | Keine automatische Rechtsvalidierung | **2,0** | Code-Review |
| Testing / QA | ~3,0 | 135+36+10 grün = Indikator | **3,0** | CI + NF-A5 |
| Stripe / B2B | ~2,5 | Testmodus, Pre-Flight offen | **2,5** | Prod-API |
| **Gewichteter Schnitt** | 2,8 (intern) | — | **~3,3–3,5** | Web 25 %, Security 15 %, E-Mail 10 %, Ops 20 %, Legal 15 %, QA 10 %, IPv6 5 % |

### 17.11 LCP-Diagnose (Kurzfassung)

**Mobile LCP-Element:** vermutlich Hero-`<h1>` (Fraunces), nicht das Hero-Bild (`hidden lg:block` auf Mobile).

| Problem | Konkrete Dateien / Ursache | Einsparpotenzial |
|---------|---------------------------|------------------|
| Render-blocking | `client/index.html` inline `<style>` (~106 Zeilen) + Theme-`<script>`; `index-*.css` ~31 KB gzip inkl. `@fontsource` (`client/src/fonts.css`) | ~370 ms (PageSpeed) |
| Bilder | `hero_opt.webp` 60 KB preloaded auf Mobile obwohl Bild hidden; Modul-Thumbnails teils JPG+WebP parallel | ~34 KiB |
| Ungenutztes JS | `vendor-react-utils` ~87 KB gzip, `vendor-markdown` ~34 KB gzip im Initial-Graph ohne Nutzung auf `/` | ~126 KiB |

**Schätzung nach Optimierungen:** LCP **~2,8–3,2 s** (realistisch); **&lt;2,5 s** mit Font-Subsetting + kritischem CSS trimmen + Route-Level-Splitting — **mittlerer Aufwand** (1–2 fokussierte PRs), nicht trivial.

### 17.12 NF-X1 — E-Mail-Stack 63 % (Internet.nl Mail-Test, P0)

**Internet.nl Mail-Test:** 63 % — vier Failure-Kategorien bestätigt (dig 09.06.2026).

#### Aktuelle DNS-Konfiguration (verifiziert)

| Record | Inhalt |
|--------|--------|
| **SPF (Root)** | `v=spf1 include:_smtp.udag.de include:_spf.resend.com ~all` |
| **DMARC** | `v=DMARC1; p=quarantine; pct=10; rua=mailto:info@immobilien-akademie-smart.de` |
| **DKIM** | `resend._domainkey` → RSA-Public-Key vorhanden ✅ |
| **MX** | `10 mx00.udag.de` · `20 mx01.udag.de` (kein AAAA) |
| **send-Subdomain** | MX → `feedback-smtp.eu-west-1.amazonses.com` · **kein SPF-TXT auf `send`** |

#### Kritische SPF-Diagnose

`include:_spf.resend.com` liefert **NXDOMAIN** (Host existiert nicht). Das erzeugt einen **SPF permerror** — wahrscheinlich Hauptursache für Internet.nl „SPF Failed", nicht nur `~all`.

Zusätzlich: `~all` (Softfail) statt `-all` — strenge Tester werten das als Failed.

#### Empfohlene DNS-Änderungen (Copy-Paste — nur nach Backup, nur Alisad)

**Schritt 1 — SPF Root reparieren** (ersetzt bestehenden TXT-Record):

```
v=spf1 include:_smtp.udag.de include:amazonses.com -all
```

| Wenn falsch | Konsequenz |
|-------------|------------|
| `include:_spf.resend.com` behalten | SPF permerror bleibt — Mails weiterhin „Failed" |
| `-all` ohne alle Sender | Legitime Mails von nicht gelisteten Servern werden abgelehnt |
| UDAG-Include entfernen | Webmail/Weiterleitung über UDAG kann bouncen |

**Schritt 2 — SPF auf `send`-Subdomain** (Resend Return-Path, fehlt aktuell):

```
Name: send
Type: TXT
Value: v=spf1 include:amazonses.com -all
```

**Schritt 3 — DMARC stufenweise härten** (nicht Big-Bang):

```
# Phase A (1–2 Wochen Monitoring):
v=DMARC1; p=none; pct=100; rua=mailto:info@immobilien-akademie-smart.de

# Phase B (wenn SPF/DKIM grün):
v=DMARC1; p=quarantine; pct=100; rua=mailto:info@immobilien-akademie-smart.de; adkim=s; aspf=r

# Phase C (Ziel):
v=DMARC1; p=reject; pct=100; rua=mailto:info@immobilien-akademie-smart.de; adkim=s; aspf=r
```

| Wenn falsch | Konsequenz |
|-------------|------------|
| `p=reject` zu früh | Eigene Transaktions-Mails landen im Spam/ werden verworfen |
| `pct=10` lassen | 90 % nicht authentifizierte Mails ungeprüft |

**DKIM:** `resend._domainkey` ist korrekt — keine Änderung nötig, sofern Resend-Dashboard „verified" zeigt.

#### Was Alisad bei Resend **nicht** beeinflussen kann

| Failure | Ursache | Beeinflussbar? |
|---------|---------|----------------|
| IPv6 Mailserver | UDAG MX (`mx00/mx01.udag.de`) ohne AAAA | ❌ Provider (UDAG) |
| DNSSEC Mail | Domain ohne DNSSEC-Signatur | ⚠️ Domain-Registrar (UDAG) |
| STARTTLS+DANE inbound | UDAG MX ohne TLSA/DANE-Records | ❌ Provider (UDAG) |

Resend outbound (API) nutzt Amazon SES — IPv6/DANE der **eingehenden** MX-Server betrifft `info@`-Postfach, nicht Resend-Versand.

#### PR #147 — explizit blockiert

**PR #147 (Hybrid E-Mail-Verifikation) darf nicht deployed werden**, bis Internet.nl Mail-Test **&gt; 90 %** und SPF ohne permerror. Sonst: Verifikations-Mails im Spam → 7-Tage-Sperre → Domain-Reputation-Schaden.

### 17.13 NF-X2 — HSTS Preload (P0 Code-Fix)

- **Bug:** Custom-Middleware setzte `preload`, Helmet überschrieb ohne `preload` (hstspreload.org: „No preload directive").
- **Fix:** PR [#151](https://github.com/smartlivingberlin/Immobilie-Akademie-Premium/pull/151) (`cursor/hsts-preload-fix-7dbc`) — `helmet({ hsts: { preload: true, … } })`.
- **Post-Deploy:** `curl -sI https://immobilien-akademie-smart.de/ | grep -i strict-transport` → muss `preload` enthalten.
- **hstspreload.org-Einreichung:** erst nach **1 Monat** stabiler Konfiguration — nicht automatisch.

### 17.14 NF-X3 — IPv6 fehlt (P1)

| Prüfung | Ergebnis |
|---------|----------|
| Web AAAA | ❌ nur `A → 66.33.22.75` (Railway) |
| Mail MX AAAA | ❌ `mx00/mx01.udag.de` nur IPv4 |

**Railway:** Öffentliches IPv6 für Custom Domains ist **nicht dokumentiert verfügbar** (Private Networking IPv6 betrifft nur `railway.internal`). **Bekannte Provider-Beschränkung** — kein App-Code-Fix.

### 17.15 NF-X4 — DNS CAA fehlt (P1, ~10 Min)

**Empfohlene Records beim Domain-Provider:**

```
immobilien-akademie-smart.de.  CAA  0 issue "letsencrypt.org"
immobilien-akademie-smart.de.  CAA  0 iodef "mailto:alisadgadyri38@gmail.com"
```

| Wenn falsch | Konsequenz |
|-------------|------------|
| Falscher `issue`-CA | TLS-Zertifikat-Erneuerung schlägt fehl → Ausfall |
| CAA zu restriktiv ohne Railway-CA | Let's Encrypt Renewal blockiert |

### 17.16 NF-X5 — Hash Function Diskrepanz (P1)

| Tool | Ergebnis |
|------|----------|
| SSL Labs | A+ |
| Internet.nl Web | „Hash function for key exchange: Failed" |

**Erklärung:** Internet.nl (NL Government Standard) ist strenger als SSL Labs (Browser-Praxis). OpenSSL-Check 09.06.: TLS 1.3 `TLS_AES_128_GCM_SHA256`, TLS 1.2 `ECDHE-ECDSA-AES128-GCM-SHA256` — **kein SHA-1-Cipher** in der ausgehandelten Verbindung.

**Unsicherheit:** Ob schwächere Cipher-Suites in der **Angebotsliste** noch existieren, ohne vollständigen Scan nicht verifizierbar. **Trade-off:** Entfernen von TLS 1.2 SHA-1-Ciphers könnte alte Clients treffen; TLS 1.3-only wäre restriktiver. Aktuell: **kein Handlungsbedarf** solange SSL Labs A+ und keine SHA-1-Negotiation bestätigt.

### 17.17 NF-X6 — Performance bipolar (Desktop vs Mobile)

**PageSpeed 09.06. 10:08:**

| Metrik | Desktop | Mobile |
|--------|---------|--------|
| Performance | 99/100 | 77/100 |
| FCP | 0,6 s | 3,1 s |
| LCP | 1,0 s | 4,8 s |
| TBT | 0 ms | 20 ms |
| CLS | 0,005 | 0 |

**GTmetrix Seattle:** 76 %, LCP 2,6 s, TBT 34 ms.

| Optimierung | Mobile | Desktop | International |
|-------------|--------|---------|---------------|
| Inline-`<style>` in `index.html` reduzieren | ✅ hoch | gering | gering |
| Font-Subsetting (`fonts.css`) | ✅ hoch | mittel | mittel |
| Hero-Preload nur `lg+` | ✅ hoch | neutral | neutral |
| Unused-JS-Splitting (`vendor-react-utils`) | ✅ hoch | gering | gering |
| CDN/Edge-Caching (Railway/Fastly) | mittel | gering | ✅ hoch |
| Brotli + lange Cache-Header statischer Assets | mittel | gering | ✅ hoch |

### 17.18 Mozilla Observatory + Snyk HTTPS (bestätigt)

| Tool | Ergebnis |
|------|----------|
| Mozilla Observatory | **B+ (80/100)**, 9/10 Tests — einziger Abzug: CSP `unsafe-inline` (−20). Mit Nonce-CSP theoretisch A+ (100). |
| Snyk HTTPS | **Grade A** — bestätigt curl-Befunde. Vorheriger HTTP-Test war fehlerhaft. |

### 17.19 Wiederholbare E-Mail-Tests (für Alisad)

```bash
# SPF/DMARC/DKIM/MX prüfen:
dig TXT immobilien-akademie-smart.de +short
dig TXT _dmarc.immobilien-akademie-smart.de +short
dig TXT resend._domainkey.immobilien-akademie-smart.de +short
dig MX immobilien-akademie-smart.de +short
host -t TXT _spf.resend.com   # sollte NXDOMAIN zeigen (Bug bestätigen)

# Online:
# https://internet.nl/mail/immobilien-akademie-smart.de/
# https://mxtoolbox.com/SuperTool.aspx?action=spf%3aimmobilien-akademie-smart.de
# https://mxtoolbox.com/SuperTool.aspx?action=dmarc%3aimmobilien-akademie-smart.de
```

---

*Dieses Dokument ist eine Momentaufnahme vom 08.06.2026, erweitert nach Forensik NF-9–NF-13, §17 NF-A1–A7 und NF-X1–X6 (09.06.2026). Jede Aussage ist durch den Architekten zu verifizieren.*
