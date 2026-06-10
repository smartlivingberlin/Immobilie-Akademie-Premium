# Baumeister / Anthropic Architekt — Vollständige Projektübergabe

**Generiert:** 2026-06-10T20:05:00Z  
**Ersteller:** Cursor Cloud Agent (automatisierte Prüfung + Repo-Analyse)  
**Zielgruppe:** Externe Architekt-Beratung (Baumeister Cloud AI / Anthropic)  
**Repo:** `smartlivingberlin/Immobilie-Akademie-Premium`  
**Produktion:** https://immobilien-akademie-smart.de  
**HEAD (main):** `9ff2502` — chore: gitignore wildcard für docs/handover  

> **Domain-Hinweis:** Die Live-URL ist **`immobilien-akademie-smart.de`** (mit Bindestrichen).  
> `immobilienakademie.smart.de` ist im Repo nicht als Produktions-`APP_URL` hinterlegt.

---

## 1. Executive Summary

**Immobilien Akademie Smart Premium** ist ein Monorepo (React 19 + Vite 5 + Express 4.21 + tRPC + MySQL 9.4 + Drizzle + Tailwind 4), gehostet auf **Railway** (Dockerfile-Deploy). Es vereint:

1. **Hauptportal** — IHK-orientierte Lernplattform (Module 1–5, Quiz, KI-Tutor, Audio, Rechenpraxis)
2. **Admin-Suite** — Content-Management, Nutzerverwaltung, Stripe-Live-Checklist, KI-Monitor, B2B White-Label
3. **Verwalter-Suite** — Sub-Produkt unter `/app/verwalter/*` (Objekte, Vorgänge, Buchungen, Vorlagen, Fristen, Mahnwesen, ETV, Inbox)

### Gesamtreife (geschätzt, evidenzbasiert)

| Bereich | Reife 1–5 | Kurzbegründung |
|---------|-----------|----------------|
| Hauptportal (Lern-UX, Module, Auth) | **4.0** | Live, 21 öffentliche Routen 200, DB connected, 1333 Commits |
| Admin-Suite | **3.5** | Umfangreich (~15 Admin-Routen), APIs geschützt (401), Stripe noch Test/Live-Mix |
| Verwalter-Suite | **3.0** | Sprint #187–#195 am 10.06. live; MySQL-Persistenz; Beta-Workflows verifiziert (CLI) |
| Infrastruktur / Deploy | **4.0** | Docker, 48 Migrationen, CI grün, Health OK, Railway Online |
| Sicherheit | **3.0** | HSTS ohne preload, CSP mit `unsafe-inline`, APIs abgesichert |
| Tests & QA | **3.5** | 242/242 Vitest nach Build; 12/12 Verwalter-E2E; 1 Compliance-E2E-Failure |
| Legal / Go-Live | **2.5** | Gewerbeschein, Stripe Live, DMARC etc. extern offen (Alisad) |

**Gesamtprojekt-Reife: ~3.5 / 5** — technisch betriebsfähig und aktiv in Entwicklung; kommerziell/Legal noch nicht vollständig marktreif.

---

## 2. Verifikations-Methodik (diese Übergabe)

| Schicht | Werkzeug | Ergebnis |
|---------|----------|----------|
| TypeScript | `pnpm exec tsc --noEmit --skipLibCheck` | **0 errors** |
| Unit/Integration | `pnpm test` (ohne vorherigen Build) | **241/242** — 1 Failure |
| Unit/Integration | `pnpm test` (nach `pnpm run build`) | **242/242** — grün |
| Build | `pnpm run build` | **OK** — M3: 80/80 Lerntage exportiert |
| CI GitHub | `gh run list` | Letzte 5 Runs **success** |
| Prod Health | `curl /api/health` | **ok: true**, db connected, pending: 0 |
| Prod Seiten | curl 21 Routen | **21× HTTP 200** |
| Prod API-Schutz | curl 4 geschützte Endpoints | **3× 401**, 1× 404 (POST-only) |
| Verwalter QA-Pack | `bash scripts/ops/verwalter-qa-pack.sh` | **17 OK, 0 FAIL** |
| Prod Verify | `bash scripts/ops/verify-production.sh` | Health OK, Quiz-Guard 403 |
| Playwright Prod | 4 Specs, 12 Tests | **12/12 passed** |
| Playwright Prod | public-pages + compliance | **12 passed, 1 failed** |
| Railway | Cloud-Agent | **kein Zugriff** — nur Alisad lokal |

---

## 3. Produktions-Status (Live, 2026-06-10T20:00Z)

### 3.1 Health

```json
{
  "ok": true,
  "db": "connected",
  "latencyMs": 470,
  "migrations": { "pending": 0, "total": 48, "lastApplied": "add-indexes.sql" }
}
```

### 3.2 HTTP-Header (Sicherheit)

| Header | Wert |
|--------|------|
| `strict-transport-security` | `max-age=31536000; includeSubDomains` (**ohne** `preload`) |
| `content-security-policy` | aktiv; `script-src` + `style-src` mit **`unsafe-inline`** |
| `x-railway-edge` | `railway/us-east4-eqdc4a` |
| `last-modified` | `Wed, 10 Jun 2026 18:44:25 GMT` (Deploy #195) |
| `server` | `railway-edge` |

### 3.3 Öffentliche Routen (alle HTTP 200)

**Hauptportal:** `/`, `/login`, `/modul/3/tag/1`, `/rechenpraxis`, `/app/rechenpraxis`, `/statistiken`, `/barrierefreiheit`

**Admin (SPA-Shell, Auth clientseitig):** `/admin`, `/owner-dashboard`

**Verwalter:** `/fuer-verwaltungsbueros`, `/verwalter-rechner`, `/app/verwalter`, `/app/verwalter/objekte`, `/vorgaenge`, `/buchungen`, `/vorlagen`, `/fristen`, `/mahnwesen`, `/freigaben`, `/etv`, `/inbox`

### 3.4 Geschützte APIs (ohne Login)

| Endpoint | Status | Erwartung |
|----------|--------|-----------|
| `GET /api/verwalter/objekte` | 401 | ✅ |
| `GET /api/verwalter/dashboard` | 401 | ✅ |
| `GET /api/admin/mysql-health` | 401 | ✅ |
| `GET /api/stripe/verwalter-tools-checkout` | 404 | POST-only Route |

---

## 4. Hauptportal — Status & Reife

### 4.1 Was es ist

Premium-Lernportal für Immobilien-/Makler-Ausbildung (IHK-Prüfungsvorbereitung), mit:

- **5 Module**, Modul 3 (WEG-Verwalter) am ausgebautesten (80 Lerntage)
- **KI-Tutor** (Anthropic Haiku, RAG) — Modell: `claude-haiku-4-5` (VERBOTEN zu ändern in `server/ragTutor.ts`)
- **Rechenpraxis** — 138+ Aufgaben, eigene Produkt-Shell
- **Stripe** — Checkout, B2B, Team-Codes, Renewal (Test-Modus produktiv)
- **B2B White-Label** — Partner-Onboarding, Logo, Connect
- **Owner Control Tower** — `/owner-dashboard` (2FA, Monitoring)

### 4.2 Technische Kennzahlen

| Metrik | Wert |
|--------|------|
| Commits gesamt | 1333 |
| App-Routen (`App.tsx`) | ~100 `<Route>`-Einträge |
| Vitest-Dateien | 95 |
| Playwright E2E Specs | 30 |
| `server/routers.ts` | 1162 Zeilen (Tech-Debt) |
| `server/db.ts` | 1312 Zeilen (**VERBOTEN** zu ändern) |

### 4.3 Modul-Content Export (Build)

Nach `pnpm run build`:

```
M1: 20/20 Lerntage → dist/data/module-lessons-1.json
M2: 60/60 Lerntage → dist/data/module-lessons-2.json
M3: 80/80 Lerntage → dist/data/module-lessons-3.json
M4: 40/40 Lerntage → dist/data/module-lessons-4.json
M5: 40/40 Lerntage → dist/data/module-lessons-5.json
```

**Bekannter Test-Failure ohne vorherigen Build:** `server/moduleLessonsExport.test.ts` erwartet `dist/data/module-lessons-3.json` — Datei existiert nur nach Build. CI führt Build vor Tests aus → grün.

### 4.4 Hauptportal-Reife

| Dimension | Status |
|-----------|--------|
| Nutzer-Auth (E-Mail/Passwort, Session JWT) | ✅ Live |
| Lernfortschritt / MySQL | ✅ Live |
| Modul-Inhalte laden | ✅ Live |
| KI-Tutor | ✅ Live (Fair-Use-Gates) |
| Stripe Checkout | ✅ Test-Modus live |
| Stripe **Live**-Go-Live | ⏳ Alisad (18 Price-IDs, Webhook) |
| E-Mail-Verifikation Hybrid | 🟡 PR #147 Draft |
| WCAG vollständig | 🟡 Teilweise (PR #154) |
| Content Registry / M2-M4 Audit | 🟡 PR #167 Draft |

---

## 5. Admin-Suite — Status & Reife

### 5.1 Routen (Auszug)

| Route | Funktion |
|-------|----------|
| `/admin` | Dashboard |
| `/admin/nutzer` | User Management |
| `/admin/upload` | Content Upload |
| `/admin/kursbuch` | Kursbuch-Generator (KI) |
| `/admin/ki-monitor` | KI-Kosten/Usage |
| `/admin/stripe-live` | Live-Go-Live-Checklist |
| `/admin/whitelabel` | B2B White-Label |
| `/admin/portal-agent` | Portal-Agent Dashboard |
| `/admin-2fa` | Admin 2FA Setup |
| `/owner-dashboard` | Owner Control Tower |

### 5.2 Schutz

- Admin-Routen: `AdminRoute`-Wrapper (clientseitig + serverseitige Session)
- `/api/admin/*` ohne Login → **401** (verifiziert)
- Owner: 2FA (TOTP/E-Mail), Magic-Code

### 5.3 Admin-Reife

| Dimension | Status |
|-----------|--------|
| CMS / Content-Tools | ✅ Funktional |
| Nutzerverwaltung | ✅ Funktional |
| System-Health (MySQL) | ✅ API vorhanden, Admin-only |
| Stripe Live Checklist | ✅ UI vorhanden, Live-Keys fehlen |
| Audit Trail (Owner) | 🟡 PR #155 Draft |
| Sentry aktiv | ❌ Paket da, nicht voll konfiguriert |

**Reife Admin-Suite: 3.5/5** — mächtig, aber Go-Live- und Observability-Lücken.

---

## 6. Verwalter-Suite — Status & Reife

### 6.1 Strategische Einordnung

**Kein eigenständiges Produkt** — Sub-Produkt im Monorepo unter `/app/verwalter/*`.  
Geteilte Auth, Domain, Stripe-Infrastruktur. Roadmap Phase B: eigene Subdomain erst bei >50 Nutzern.

### 6.2 Was am 10.06.2026 auf `main` gemergt wurde (#187–#195)

| PR | Feature | Production |
|----|---------|------------|
| #187 | Dashboard `/app/verwalter` | ✅ |
| #188 | Login-Performance/A11y + Vorlagen A4 | ✅ |
| #189 | Legal-Pack + Landing `/fuer-verwaltungsbueros` | ✅ |
| #190 | Stripe Verwalter Tools Abo (39€/Mo) | ✅ Code; Stripe-Seed offen |
| #192 | P0 Event-Bus, Freigaben, Fristen-Batch, CLI | ✅ |
| #193 | CLI Passwort unsichtbar | ✅ |
| #194 | S2 Mahnwesen 3-Stufen + Freigabe-UI | ✅ |
| #195 | S3 ETV-Paket + E-Mail-Inbox | ✅ |

### 6.3 Feature-Matrix (End-to-End)

| Feature | UI | API | MySQL | Prod-verifiziert |
|---------|----|----|-------|------------------|
| Objekte CRUD | ✅ | ✅ | ✅ (#181) | ✅ CLI |
| Vorgänge | ✅ | ✅ | ✅ | ✅ |
| Buchungen light | ✅ | ✅ | ✅ | 🟡 |
| Vorlagen (20+) | ✅ | ✅ | — | ✅ Seiten 200 |
| Fristen-Checkliste | ✅ | ✅ | — | ✅ fristen-batch: 8 Vorgänge |
| Event-Bus | — | ✅ | ✅ | ✅ events API |
| Freigaben (Briefe) | ✅ | ✅ | ✅ | ✅ mahnwesen + etv |
| Mahnwesen 3-Stufen | ✅ | ✅ | ✅ | ✅ Stufe 1 getestet |
| ETV-Paket | ✅ | ✅ | ✅ | ✅ etv 2026-07-15 |
| E-Mail-Inbox | ✅ | ✅ | ✅ | ✅ nach Flag + TEXT |
| KI-Brief | ✅ | ✅ | Fair-Use | 🟡 |
| DATEV EXTF | 🟡 | 🟡 | — | In geschlossenen PRs |
| Stripe Tools Gating | ✅ Code | ✅ | — | `toolsGating: false` |

### 6.4 Verwalter-CLI (Terminal-Werkzeug)

```bash
pnpm run ops:verwalter-cli health          # öffentlich
pnpm run ops:verwalter-cli migrate-status  # öffentlich
pnpm run ops:verwalter-cli dashboard       # Login
pnpm run ops:verwalter-cli fristen-batch   # Login
pnpm run ops:verwalter-cli mahnwesen       # Login, BETRAG/EIGENTUEMER
pnpm run ops:verwalter-cli etv             # Login, ETV_DATUM
pnpm run ops:verwalter-cli inbox-ingest    # Login, SUBJECT + TEXT Pflicht
pnpm run ops:verwalter-cli flags           # Feature-Flags
```

**Alisad-Verifikation 10.06. (Prod):** Dashboard, Fristen-Batch (8), Mahnwesen Stufe 1, ETV, Inbox — alle HTTP 200.

### 6.5 Code-Umfang Verwalter

| Datei | Zeilen |
|-------|--------|
| `server/verwalterRouter.ts` | 895 |
| `client/src/App.tsx` (gesamt) | 464 |

### 6.6 Verwalter-Reife

**3.0/5 — Beta-MVP:** Kern-Workflows (Fristen → Vorgang → Freigabe → Brief) funktionieren. Noch kein eigenständiges Produkt, kein DATEV live, Stripe-Abrechnung nicht geseedet, Voice/OCR/Beleg aus.

---

## 7. Test-Ergebnisse (Detail)

### 7.1 Vitest

| Lauf | Ergebnis |
|------|----------|
| Ohne Build | 241 passed, **1 failed** (`moduleLessonsExport`) |
| Nach Build | **242 passed**, 89 Dateien |

### 7.2 Playwright gegen Produktion

| Spec | Tests | Ergebnis |
|------|-------|----------|
| `21-mysql-health` | 2 | ✅ |
| `22-migration-status` | 2 | ✅ |
| `07-verwalter-rechner` | 2 | ✅ |
| `26-verwalter-mobile-layout` | 6 | ✅ |
| `01-public-pages` | 11 | ✅ |
| `06-compliance-landing` | 1 | ❌ h1-Text / 249€ nicht gefunden |

**Compliance-Failure:** `/compliance-20h` — Selektor `h1` mit Regex `/20 Stunden|Weiterbildung|Compliance/i` schlägt fehl. Mögliche Ursachen: Routing-Änderung, Lazy-Load, geänderter Hero-Text.

### 7.3 Verwalter QA-Pack

**17 OK, 0 FAIL, 1 SKIP** (eingeloggte API-Tests)

---

## 8. Offene Pull Requests (13)

| PR | Titel | Draft | Priorität |
|----|-------|-------|-----------|
| #191 | Verwalter Automatisierungs-Roadmap | Nein | Strategie |
| #167 | Content Registry, M2/M4 Lerntage-Fix | Ja | **Hoch** (Content) |
| #155 | Owner Audit Trail | Ja | Mittel |
| #154 | Platform Audio/ComfortBar (14k LoC) | Ja | **Vorsicht** — splitten |
| #152 | Alisad Master-Workflow | Ja | Doku |
| #151 | HSTS preload | Ja | Security |
| #150 | Risikoregister | Ja | Doku |
| #149 | §17 Audit-Korrektur | Ja | Doku |
| #147 | Hybrid E-Mail-Verifikation | Ja | Produkt |
| #146 | DSGVO Deletion Audit Log | Ja | Legal |
| #145 | Stripe 18-ID Preflight | Ja | **Vor Live** |
| #144 | R2 Backup Failure Alert | Ja | Ops |
| #136 | Baumeister Übergabe (älter) | Nein | Doku |

**Hinweis:** PRs #172–#177 (Verwalter-Kaskade) wurden **geschlossen** — Features in #180–#195 konsolidiert gemergt.

---

## 9. Tech-Debt & Risiken

| Issue | Schwere | Status |
|-------|---------|--------|
| `db.ts` / `routers.ts` Monolithen | Mittel | Dokumentiert, Änderung verboten (`AGENTS.md`) |
| HSTS ohne `preload` | Niedrig | PR #151 |
| CSP `unsafe-inline` | Mittel | Bekannt |
| Verwalter File-Store → MySQL Migration | Gelöst (#181) | ✅ |
| Stripe Live nicht aktiv | **Hoch** | Blockiert Umsatz |
| `moduleLessonsExport` Test ohne Build | Niedrig | CI ok, lokaler Footgun |
| Compliance-Landing E2E | Niedrig | Text/Routing-Drift |
| Gewerbeschein, DMARC, AVVs | **Hoch** | Extern (Alisad) |
| Passwort in Chat gepostet | **Hoch** | Rotation empfohlen |

---

## 10. VERBOTENE Dateien (AGENTS.md — niemals ändern)

```
drizzle/schema.ts
server/db.ts
server/ragTutor.ts
server/_core/context.ts
server/_core/sdk.ts
```

**ragTutor Modell:** `claude-haiku-4-5` — NIEMALS `claude-haiku-4-5-20251001`

---

## 11. Empfehlungen für Baumeister / Anthropic

### Sofort (P0)

1. **Stripe Live** — PR #145 mergen, 19 Prices seeden, Webhook verifizieren
2. **Passwort-Rotation** — Admin-Credentials nach Chat-Leak
3. **Compliance E2E** — `/compliance-20h` Selektor oder Seite prüfen

### Kurzfristig (P1)

4. **PR #167** (Content Registry) — Modul 2/4 Lerntage, forensisches Audit
5. **PR #151** (HSTS preload) — nach hstspreload.org-Test
6. **PR #146 + #155** — DSGVO Audit + Owner Trail koordiniert mergen

### Mittelfristig (P2)

7. **Verwalter Automatisierung** — Roadmap #191: Inbox → Belege → Telefon (Phase 4+)
8. **PR #154 splitten** — nicht als 14k-LoC-Monolith mergen
9. **Sentry + Observability** aktivieren

### Strategisch

10. **Verwalter als Sub-Produkt belassen** bis >50 zahlende Nutzer (Roadmap Phase B)
11. **PR-Stau reduzieren** — Doku-PRs (#149, #150, #152, #136) batch-mergen

---

## 12. Terminal-Befehle — Vollständiger Prüfblock für Alisad

> Copy-Paste in WSL. Repo-Pfad anpassen. **Keine Secrets in Chat posten.**

### A) Repo synchronisieren

```bash
cd /mnt/c/Users/Lenovo/Immobilie-Akademie-Premium
git fetch origin --prune
git reset --hard origin/main
git log -1 --oneline
```

### B) Code-Qualität (lokal)

```bash
pnpm install
pnpm exec tsc --noEmit --skipLibCheck
pnpm run build
pnpm test
```

### C) Produktion — Health & Seiten

```bash
BASE="https://immobilien-akademie-smart.de"
curl -s "$BASE/api/health" | jq .
curl -sI "$BASE/" | grep -iE "strict-transport|content-security|x-railway|last-modified"
bash scripts/ops/verify-production.sh
bash scripts/ops/verwalter-qa-pack.sh
```

### D) Verwalter-CLI (mit Login — Passwort interaktiv)

```bash
pnpm run ops:verwalter-cli health
pnpm run ops:verwalter-cli migrate-status
pnpm run ops:verwalter-cli dashboard
pnpm run ops:verwalter-cli events
pnpm run ops:verwalter-cli freigaben
START_DATE=2026-06-10 pnpm run ops:verwalter-cli fristen-batch
BETRAG=450 EIGENTUEMER="Max Mustermann" pnpm run ops:verwalter-cli mahnwesen
ETV_DATUM=2026-07-15 pnpm run ops:verwalter-cli etv
SUBJECT="Test" TEXT="Inhalt" pnpm run ops:verwalter-cli inbox-ingest
pnpm run ops:verwalter-cli flags
```

### E) Playwright gegen Produktion

```bash
pnpm exec playwright install chromium
PLAYWRIGHT_BASE_URL=https://immobilien-akademie-smart.de \
PLAYWRIGHT_SKIP_GLOBAL_SETUP=1 \
pnpm exec playwright test \
  tests/e2e/01-public-pages.spec.ts \
  tests/e2e/06-compliance-landing.spec.ts \
  tests/e2e/07-verwalter-rechner.spec.ts \
  tests/e2e/21-mysql-health.spec.ts \
  tests/e2e/22-migration-status.spec.ts \
  tests/e2e/26-verwalter-mobile-layout.spec.ts \
  --project=chromium
```

### F) Stripe Price Seed (Test-Modus)

```bash
# Key komplett, ohne Ellipsis/Leerzeichen:
export STRIPE_SECRET_KEY='sk_test_...'
pnpm run stripe:seed-prices -- --apply --railway-hints
```

### G) Railway (nur lokal mit CLI)

```bash
railway status
railway logs --service Immobilie-Akademie-Premium | tail -50
```

### H) Lighthouse (Performance/A11y)

```bash
CHROME_PATH=$(find ~/.cache/ms-playwright -type f \( -name chrome-headless-shell -o -name chrome \) 2>/dev/null | head -1)
npx --yes lighthouse https://immobilien-akademie-smart.de/app/verwalter/buchungen \
  --chrome-path="$CHROME_PATH" \
  --only-categories=performance,accessibility,best-practices \
  --chrome-flags='--headless' \
  --output=json --output-path=./verwalter-lighthouse.json
cat verwalter-lighthouse.json | jq '.categories | to_entries[] | {id: .key, score: .value.score}'
```

### I) Externe Tools (Browser)

- PageSpeed: https://pagespeed.web.dev/analysis?url=https://immobilien-akademie-smart.de
- Security Headers: https://securityheaders.com/?q=https://immobilien-akademie-smart.de&followRedirects=on
- SSL Labs: https://www.ssllabs.com/ssltest/analyze.html?d=immobilien-akademie-smart.de

### J) GitHub / PRs

```bash
gh pr list --state open --limit 30
gh run list --limit 10
```

---

## 13. Referenz-Dokumente im Repo

| Datei | Inhalt |
|-------|--------|
| `docs/handover/PROJEKT_HISTORIE_VOLLSTAENDIG.md` | 13.937 Zeilen — komplette Historie |
| `docs/AUDIT_2026-06-10_INDEX.md` | Architekt-Audit Index (12 Teile) |
| `docs/VERWALTER_SUITE_ROADMAP.md` | Verwalter-Strategie |
| `docs/VERWALTER_QA_RUNBOOK.md` | QA-Prozeduren |
| `docs/STRIPE_LIVE_GO_LIVE.md` | Stripe Live Checkliste |
| `AGENTS.md` | Agent-Regeln, Verbotsliste |

---

## 14. Was dieser Bericht NICHT verifizieren kann

- Railway Env-Vars (Inbox-Secret, Stripe Live Keys)
- MySQL Row-Counts / Nutzerzahlen live
- Stripe Dashboard (Test vs. Live Umsatz)
- Eingeloggte Admin-UI (Screenshots, UX-Flows)
- Resend Bounce-Rate, Anthropic API-Kosten live
- internet.nl / SSL Labs Scores (nur Links in Abschnitt 12)

---

*Ende der Baumeister-Übergabe — Stand main@9ff2502, Prüfung 2026-06-10T20:05Z*
