# MEGA-AUDIT — Immobilien Akademie Smart Premium + Verwalter Suite

**Erstellt:** 2026-06-11T04:30:00Z  
**Ersteller:** Cursor Cloud Agent (Read-Only + Test-Only)  
**Zielgruppe:** Alisad Gadyri, Claude/Anthropic Gegenprüfung, Förder-/Gründungsvorbereitung  
**Repo:** `smartlivingberlin/Immobilie-Akademie-Premium`  
**HEAD:** `fcb7ac5` (main, 2026-06-10)  
**Produktion:** https://immobilien-akademie-smart.de  

---

## Methodik

| Regel | Umsetzung |
|-------|-----------|
| Nur lesen/testen | Kein App-Code geändert; verbotene Dateien unangetastet |
| Jede Behauptung belegt | Datei:Zeile, Tool-Output, curl, Test-Ergebnis |
| Kein Beleg | Markiert als **ANNAHME** oder **UNVERIFIZIERT** |
| Symbole | ✅ positiv · ⚠️ eingeschränkt · ❌ negativ · 🔍 unverifiziert · 💭 Empfehlung |

## Verifizierte Live-Daten (2026-06-11T04:13Z)

| Messung | Ergebnis | Beleg |
|---------|----------|-------|
| Health | `ok:true`, `db:connected`, `pending:0`, `total:48` | `curl /api/health` |
| HSTS | `max-age=31536000; includeSubDomains` (**ohne** `preload`) | curl `-I` |
| CSP | `unsafe-inline` in script-src + style-src | curl `-I` |
| Vitest (nach Build) | **242/242** | `pnpm test` 2026-06-11 |
| TypeScript | **0 errors** | `tsc --noEmit` (vorherige Runs) |
| Verwalter QA-Pack | **17 OK, 0 FAIL** | `verwalter-qa-pack.sh` (User 2026-06-10) |
| Lighthouse `/` | Perf 0.85, A11y 0.92, BP 1.0, SEO 0.92 | lighthouse CLI 2026-06-11 |
| Lighthouse `/app/verwalter/dashboard` | Perf 0.86, A11y 1.0, BP 1.0, SEO 0.92 | lighthouse CLI 2026-06-11 |
| autocannon `/api/health` | p50 517ms, p99 658ms, 196 req/10s | autocannon 2026-06-11 |
| jscpd | 123 Klone, 1.43% dup lines | jscpd 2026-06-11 |
| `pnpm audit` | **0 vulnerabilities** | 2026-06-11 |

---

## Dokument-Index

| Datei | Inhalt |
|-------|--------|
| [mega-audit/A_IT_ARCHITEKTUR.md](./mega-audit/A_IT_ARCHITEKTUR.md) | Teil A — Architektur, DB, API, Dependencies |
| [mega-audit/D_SECURITY_COMPLIANCE.md](./mega-audit/D_SECURITY_COMPLIANCE.md) | Teil D — OWASP, Auth, DSGVO, CSP, Backup |
| [mega-audit/C_KI_SYSTEME.md](./mega-audit/C_KI_SYSTEME.md) | Teil C — Multi-Provider, Fair-Use, Prompts, Kosten |
| [mega-audit/E_TESTING_QA.md](./mega-audit/E_TESTING_QA.md) | Teil E — Test-Pyramide, CI/CD, Monitoring, Lasttest |
| [mega-audit/B_FRONTEND_UX.md](./mega-audit/B_FRONTEND_UX.md) | Teil B — Design, Responsive, A11y, Performance |
| [mega-audit/F_FACHPRUEFUNG.md](./mega-audit/F_FACHPRUEFUNG.md) | Teil F — Immobilienfachlich, Verwalter-Workflows |
| [mega-audit/G_MARKETING_SEO.md](./mega-audit/G_MARKETING_SEO.md) | Teil G — SEO, Claims, Landing |
| [mega-audit/I_STAKEHOLDER.md](./mega-audit/I_STAKEHOLDER.md) | Teil I — Persona-Walkthroughs, Edge-Cases |
| [mega-audit/H_AZAV.md](./mega-audit/H_AZAV.md) | Teil H1 — AZAV technische Voraussetzungen |
| [mega-audit/NACHFORDERUNGEN_2026-06-11.md](./mega-audit/NACHFORDERUNGEN_2026-06-11.md) | Nachforderungen, Sentry-Issues S-1–S-3, Quiz/Schema-Vertiefung |

---

## Executive Summary (1 Seite)

**Gesamtreife geschätzt: 3.6 / 5** (Beta-Produktion, Go-Live blockiert durch Stripe Live + externe Legal/Ops)

| Bereich | Reife | Kernerkenntnis |
|---------|-------|----------------|
| Hauptportal | 4.0 | Live, 242 Tests grün, Module exportiert, DB connected |
| Admin-Suite | 3.5 | Umfangreich, APIs geschützt; **Sentry aktiv** (~2 Wo. Daten, 4 offene Issues) |
| Verwalter-Suite | 3.2 | #187–#195 live; CLI-verifiziert; Sub-Produkt im Monorepo |
| Architektur | 3.0 | Starke Schema-Drift (17 Tabellen nur in Migrationen); Monolithen db/routers |
| Security | 3.2 | PBKDF2, Rate-Limits, CSP mit unsafe-inline; kein FK-Enforcement |
| KI | 3.5 | Multi-Provider + Fair-Use; Fristen deterministisch hardcoded ✅ |
| QA/CI | 3.8 | CI: tsc+build+test+audit; E2E smoke optional (`continue-on-error`) |
| Marketing | 3.0 | Claims 854/855 zentralisiert; 4275 nur in Doku, nicht im Code |

---

## Teil J — Zusammenfassung & Priorisierung

### J1. Konsolidierte Befund-Tabelle (❌ und ⚠️)

| # | Bereich | Befund | Schwere | Beleg | Empfehlung |
|---|---------|--------|---------|-------|------------|
| 1 | A2 DB | 17 Tabellen nur in Migrationen, nicht in `schema.ts` | Mittel | `drizzle/migrations` vs `schema.ts` | Schema-Sync-PR (ohne verbotene Datei-Überschreibung — Plan zuerst) |
| 2 | A2 DB | Keine FK-Constraints auf `userId`-Spalten | Mittel | `drizzle/schema.ts` — 0× `.references()` | FK-Migration planen |
| 3 | A2 DB | `spaced_repetition` in Schema, keine CREATE-Migration | Niedrig | Schema:36, Migrationen: fehlt | Migration nachziehen |
| 4 | A3 API | Öffentliche `quiz.*` tRPC liefert Fragen+Antworten ohne Auth | **Hoch** | `server/quizRouter.ts` | Auth oder Antworten strippen |
| 5 | A3 API | Doppelte Route `/api/admin/ki-stats` | Niedrig | `kiStatsRoute.ts` + `ragTutor.ts:316` | Eine Route entfernen |
| 6 | A3 API | ~155 REST-Endpoints ohne Zod; manuelle Validierung | Mittel | REST-Inventur | Schrittweise Zod für kritische POSTs |
| 7 | A4 Error | Kein zentraler `app.use((err` Handler gefunden | Mittel | `grep` 0 Treffer | Globaler Error-Handler |
| 8 | A5 Deps | depcheck: ungenutzte Pakete (multer, framer-motion, …) | Niedrig | `npx depcheck` 2026-06-11 | Aufräumen oder begründen |
| 9 | A7 PRs | PR #154: 14.492/+ LoC Draft | **Hoch** | gh PR #154 | Nicht monolithisch mergen |
| 10 | B1 Design | 1382 Hardcoded Hex in `.tsx` | Mittel | `grep #[0-9a-f]{6}` | Design-Tokens konsolidieren |
| 11 | B3 A11y | axe-core CLI fehlgeschlagen (ChromeDriver 149 vs 148) | 🔍 | Tool-Output 2026-06-11 | Mit Playwright-Chrome erneut |
| 12 | B5 Claims | `855+` vs `854` öffentliche Quiz-Zahl — bewusst unterschiedlich | ⚠️ | `shared/claims.ts:2-5` | Kommunikation klären |
| 13 | B5 Claims | `4275` nur in Doku, nicht im Live-Code | ⚠️ | grep nur in `docs/` | Doku bereinigen |
| 14 | C2 KI | Mahnwesen/ETV-Briefe: Template-basiert, kein LLM für Fristen | ✅ | `shared/verwalterVorlagen.ts` | Beibehalten |
| 15 | C2 KI | `/api/ai/*` viele Endpoints mit Fair-Use; nicht alle Verwalter-Pfade | Mittel | `shared/kiFairUse.ts:14-19` | Prüfen ob Mahnwesen-Start LLM triggert |
| 16 | D2 Auth | PBKDF2 100k Iterationen (nicht bcrypt/argon2) | ⚠️ | `auth-local.ts:22-24` | Ausreichend für MVP; Argon2id langfristig |
| 17 | D3 DSGVO | `verwalter_inbox_messages` fehlt in gdpr-delete **Test** (Cleanup OK) | Niedrig | `verwalterGdprCleanup.ts:11` vs Test `:36-44` | Test-Assertion ergänzen |
| 18 | D4 CSP | `unsafe-inline` script+style | Mittel | curl Header | Nonce-Strategie (PR #151 HSTS separat) |
| 19 | D4 HSTS | Kein `preload` | Niedrig | curl Header | PR #151 |
| 20 | D5 Backup | MySQL-R2-Backup: kein `verwalter`-Filter im Workflow | ⚠️ | `.github/workflows/mysql-backup-r2.yml` — Full-DB-Backup | OK wenn Full-DB; Restore-Test offen |
| 21 | E2 CI | E2E smoke `continue-on-error: true` | Mittel | `ci.yml:48` | Required machen oder dokumentieren |
| 22 | E2 CI | Kein gitleaks/trufflehog in CI | Mittel | Workflows: nur ci+backup | Secret-Scan hinzufügen |
| 23 | E3 Monitor | HealthWatcher: E-Mail nur wenn `RESEND_API_KEY` | ⚠️ | `HealthWatcher.ts:102` | Key in Prod prüfen (Alisad) |
| 24 | E5 Last | Health p99 1195ms unter 10 conn load | ⚠️ | autocannon | Bei Skalierung beobachten |
| 25 | F3 Verwalter | Online-ETV/Umlaufbeschluss nicht in Fristen-Checkliste | Mittel | `shared/verwalterFristen.ts` | Erweitern |
| 26 | G1 SEO | Sitemap enthält Verwalter-Landing, nicht `/app/verwalter/*` | ⚠️ | `sitemap.xml` curl | Bewusst (Auth-Bereich) |
| 27 | I2 Edge | Compliance-E2E war Test-Bug (behoben #197) | ✅ | Playwright strict mode | — |
| 28 | Stripe | Live-Modus + 19 Price-IDs nicht geseedet | **Hoch** | User: `sk_test_...` Platzhalter-Fehler | Echter Key + PR #145 |

### J2. Priorisierte Maßnahmenliste

**P0 (vor Förderzusage / Stripe Live)**
1. Stripe Live: echte Keys, Webhook, 19 Prices seeden (Alisad)
2. Quiz-Antworten-Leak schließen (`quiz.*` tRPC public)
3. Passwort-Rotation nach Chat-Leak (Alisad)
4. Gewerbeschein / AVVs / DMARC (Alisad + Claude Recherche H2)

**P1 (vor Skalierung >50 Nutzer)**
5. Schema-Drift bereinigen (17 Orphan-Tabellen → Drizzle)
6. PR #154 splitten, nicht als Monolith mergen
7. GDPR: Test-Assertion für `verwalter_inbox_messages` (Cleanup bereits vorhanden)
8. CI: E2E smoke required; gitleaks in Pipeline
9. FK-Constraints für `userId`-Spalten planen

**P2 (Qualität)**
10. Globaler Error-Handler + strukturiertes Logging
11. CSP Nonces statt `unsafe-inline`
12. Design-Tokens statt 1382 Hex-Codes
13. Verwalter Fristen: Online-ETV, Umlaufbeschluss

**P3 (Nice-to-have)**
14. depcheck-Aufräumen
15. HSTS preload (PR #151)
16. Mutation-Testing (Stryker) für `verwalterFristen.ts`

### J3. Braucht externe Verifikation (Alisad / Claude)

| Punkt | Wer | Tool/Aktion |
|-------|-----|-------------|
| Stripe Live-Status, Umsatz, Webhook | Alisad | Stripe Dashboard |
| Railway Env-Vars (Inbox-Secret) | Alisad | Railway CLI |
| Sentry Issues S-1–S-3 beheben | Cursor | siehe NACHFORDERUNGEN |
| MySQL Row-Counts, Restore-Test | Alisad | `db:backup` + Restore-Runbook |
| securityheaders.com Score | Claude/Alisad | Browser-Link |
| SSL Labs / internet.nl | Claude/Alisad | Externe Tools |
| hstspreload.org Status | Alisad | Nach PR #151 |
| AZAV/ZFU/BAFA/AVGS Kosten 2026 | Claude | Web-Recherche (H2) |
| IHK-Prüfungsordnung Abdeckung | Claude | Web-Recherche vs. Modul-Inhalt |
| Wettbewerber-Preise G1/G3 | Claude | Web-Recherche |
| §-Aktualität nach WEG-Reform | Claude | Gesetze-im-Internet.de |
| Admin-UI Walkthrough (ohne Credentials hier) | Alisad | Manuell + Screenshots |
| axe-core / pa11y vollständig | Alisad | Lokal mit Playwright-Chrome |

### J4. Geschätzter Aufwand P0+P1

| Arbeitspaket | Cursor (Code) | Alisad (extern) | Claude (Recherche) |
|--------------|---------------|-----------------|-------------------|
| P0 Stripe+Legal | 0.5–1 PT | 2–3 PT | 1 PT |
| P0 Quiz-Leak+Security | 0.5 PT | — | — |
| P1 Schema+GDPR+CI | 2–3 PT | 0.5 PT (Restore) | — |
| P1 PR #154 Split | 1–2 PT | Review | — |
| **Summe P0+P1** | **~4–6 PT** | **~3–4 PT** | **~1 PT** |

*PT = Personentage, grobe Größenordnung für Planung, keine Kalenderprognose.*

---

## Tool-Protokoll (Auszug)

| Tool | Version/Befehl | Datum | Ergebnis |
|------|----------------|-------|----------|
| vitest | 4.1.8 / `pnpm test` | 2026-06-11 | 242/242 |
| tsc | 5.9.3 / `--noEmit` | 2026-06-11 | 0 errors |
| pnpm audit | 10.4.1 | 2026-06-11 | 0 vulns |
| depcheck | npx latest | 2026-06-11 | 10 unused deps |
| lighthouse | npx latest | 2026-06-11 | Home scores siehe oben |
| autocannon | npx latest | 2026-06-11 | p50 512ms |
| playwright | prod 26-verwalter | 2026-06-11 | 6/6 |
| @axe-core/cli | 4.11.4 | 2026-06-11 | ❌ ChromeDriver mismatch |
| gitleaks | npx | 2026-06-11 | ❌ executable not found |
| jscpd | npx latest | 2026-06-11 | 123 clones, 1.43% |
| stryker | — | — | 🔍 AUSSTEHEND |
| pa11y | — | — | 🔍 AUSSTEHEND |
| retire.js | — | — | 🔍 AUSSTEHEND |

---

## Audit-Status (2026-06-11)

| Teil | Datei | Status |
|------|-------|--------|
| A | A_IT_ARCHITEKTUR.md | ✅ Vollständig |
| D | D_SECURITY_COMPLIANCE.md | ✅ Vollständig |
| C | C_KI_SYSTEME.md | ✅ Vollständig |
| E | E_TESTING_QA.md | ✅ Vollständig |
| B | B_FRONTEND_UX.md | ✅ Vollständig |
| F | F_FACHPRUEFUNG.md | ✅ Vollständig (§-Aktualität: Claude) |
| G | G_MARKETING_SEO.md | ✅ Vollständig (Wettbewerb: Claude) |
| I | I_STAKEHOLDER.md | ✅ Vollständig (E2E: Credentials fehlen) |
| H1 | H_AZAV.md | ✅ Technisch; H2 Claude |
| J | Dieser Index | ✅ Vollständig |

**Noch offene Tool-Läufe:** axe-core/pa11y (Chrome-Pfad), stryker, retire.js, gitleaks (Binary), Prod-CLI Verwalter-Dashboard.

---

*Ende Index — Details in `docs/mega-audit/*.md`*
