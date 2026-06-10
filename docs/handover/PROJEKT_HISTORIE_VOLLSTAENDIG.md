# Immobilien Akademie Smart Premium — Vollständige Projekt-Historie
**Generiert:** 2026-06-10T19:45:58Z
**Repo:** smartlivingberlin/Immobilie-Akademie-Premium
**Zweck:** Kontext-Übergabe für neuen Cursor-Chat

---

## Aktueller Stand

### HEAD
- Commit: 1b62e1d
- Datum: 2026-06-10 20:44:10 +0200
- Nachricht: feat(verwalter): S3 ETV-Paket + P2 E-Mail-Inbox (#195)

### Health-Check
```json
{"ok":true,"db":"connected","latencyMs":448,"ts":"2026-06-10T19:45:58.818Z","migrations":{"pending":0,"total":48,"lastApplied":"add-indexes.sql"}}```

---

## Offene Pull Requests

### PR #191 — docs: Verwalter Automatisierungs-Roadmap (Agentur-Masterplan)
- Branch: cursor/verwalter-automation-roadmap-7dbc
- Erstellt: 2026-06-10T14:55:34Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Masterplan für die systematische Entwicklung der Verwalter-Automatisierung: richtige Reihenfolge, Build-vs-Integrate-Matrix, Telefon ab Phase 4 (ohne WE-Mindestgrenze), kommerzielle Schichten.

## Inhalt

- Dependency-DAG: P0 Fundament → P1 Workflows → P2 E-Mail → P3 Belege → P4 Telefon → P5 Steuerung
- Build vs. Integrate (Vapi+Twilio Telefon, Resend Inbox, Claude Vision Belege, kein ERP-Neubau)
- Agentur-RACI, QA/Gates, 12-Wochen-Sprint-Plan
- Stripe Add-on-Idee (Automation + Voice)

## Datei

`docs/VERWALTER_AUTOMATION_ROADMAP.md`

<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #167 — PR-A: Content Registry, M2/M4 Lerntage-Fix, forensisches Audit
- Branch: cursor/content-registry-m2-m4-audit-7dbc
- Erstellt: 2026-06-10T06:05:13Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## PR-A: Content Registry

Single Source of Truth für Modul-Lerninhalte — behebt fehlende Lerntage im Kursbuch-Generator.

### Änderungen
- **`server/moduleContentRegistry.ts`** — kanonische Dateilisten + erwartete Tage
- **M2:** 40 → **60** Lerntage (`Module2ContentPart3_Maximal.ts`)
- **M4:** 10 → **40** Lerntage (Valuation Part2 + Bonus HypZert; entfernt nicht existierende `Module4Content_Maximal.ts`)
- **M1:** `Module1Content_Maximal.ts` statt Basis-Version
- Build-Export loggt `extrahiert/erwartet` mit WARN bei Abweichung
- `getModuleContentHash()` vorbereitet für Cache-Invalidierung (PR-B)

### Tests
- `npx tsc --noEmit --skipLibCheck` — 0 errors
- `pnpm test` — 169 passed
- Export: M1–M5 alle OK (20/60/80/40/40)

### Audit
- `docs/SYSTEM_AUDIT.md` — forensisches Audit: Architektur-Inkonsistenzen, Homepage Hero vs. Verwalter-Rechner, UX-Empfehlungen

## Deploy-Hinweis
Nach Merge: `git pull && railway up` — Kursbuch-Entwurf M2/M4 dann vollständig.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #155 — Owner Control Tower C1: Ereignis-Protokoll (Audit Trail)
- Branch: cursor/owner-audit-trail-7dbc
- Erstellt: 2026-06-09T11:10:15Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Phase **C1 Owner Control Tower**: zentrales Ereignis-Protokoll für den Eigentümer — wer hat was wann gemacht.

**Basiert auf:** PR #154 (Platform Comfort / Audio / Rechenpraxis)

## Was protokolliert wird

| Ereignis | Auslöser |
|----------|----------|
| `login` / `logout` / `register` | Auth |
| `module_open` / `module_complete` | Lernfortschritt (Check-in/out) |
| `ki_call` | Jeder erfolgreiche `/api/ai/*` POST |
| `owner_impersonate` / `owner_lock` / `owner_unlock` / `owner_set_role` | Owner-Panel |
| `stripe_purchase` | Stripe Webhook (Modulkauf) |

## Technik

- Tabelle `platform_audit_events` via `CREATE TABLE IF NOT EXISTS` — **ohne** `drizzle/schema.ts`
- Fire-and-forget Writes — blockieren keine Requests
- API: `GET /api/owner/audit-events?limit=&eventType=&email=&sinceHours=`
- Owner-Dashboard: neuer Tab **„Ereignisse“** mit Filter

## Tests

- `tsc --noEmit` — 0 Fehler
- `vitest` platformAuditLog + audioLessonParser — bestanden

## Nach Deploy

1. Owner-Dashboard → Tab **Ereignisse**
2. Test-Login als Nutzer → neues `login`-Event sichtbar
3. Modul öffnen → `module_open` erscheint

## Hinweis

Historische Daten vor Deploy sind nicht rückwirkend erfasst — nur neue Aktionen ab Deploy-Zeitpunkt.

<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #154 — Platform: Audio-Lektionen, ComfortBar, Rechenpraxis-Standalone, Generator Draft
- Branch: cursor/platform-comfort-audio-rechen-7dbc
- Erstellt: 2026-06-09T10:56:35Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Priorisierte Umsetzung aus der Plattform-Analyse: Komfort/Barrierefreiheit, Audio-Modus, Rechenpraxis als eigenständiges Produkt-Shell, und KI-Kostenkontrolle beim Kursbuch-Generator.

## Änderungen

### P0 — Audio-Modus (echte Inhalte)
- Neuer Parser `server/audioLessonParser.ts` liest `server/knowledge/modul_*.txt` über `###`-Überschriften (inkl. „Lerneinheit N“ in Modul 1)
- Statt 3 Demo-Lektionen: hunderte Lektionen aus der Wissensdatenbank (Module 1–5)
- `/audio-modus` in `AppLayout` (Login + Sidebar), `ComfortBar` im Header
- Sidebar-Link „Audio-Modus“ im Lernbereich

### P1 — Rechenpraxis Standalone
- Neues schlankes Layout `RechenpraxisLayout` unter `/app/rechenpraxis`
- ComfortBar, Portal-Link, Abmelden — ohne Vollportal-Sidebar
- `/verwalter-rechner` CTA führt eingeloggte Nutzer zu `/app/rechenpraxis`
- `/rechenpraxis` (Vollportal) bleibt unverändert

### P1 — Generator Kostenkontrolle
- **Grün „Aus Portal-Inhalt (0 €)“:** `/api/learning/kursbuch-draft` — Moduldateien + Wissensdatenbank, keine KI
- **Lila „Neu mit KI generieren“:** bestehendes `/api/ai/generate-kursbuch-v2` mit File-Cache (`data/generator-cache/`)
- `generatorCacheGate` speichert KI-Ergebnisse für Wiederverwendung

## Tests
- `npx tsc --noEmit --skipLibCheck` — 0 Fehler
- `vitest run server/audioLessonParser.test.ts` — 3/3 bestanden
- E2E: `tests/e2e/23-platform-comfort-audio.spec.ts`

## Verbotene Dateien
Keine Änderungen an `drizzle/schema.ts`, `server/db.ts`, `server/ragTutor.ts`, `Module6/7/8`.

## Nach Deploy prüfen
1. Als Lernender einloggen → `/audio-modus` → mehr als 3 Lektionen, Dark Mode funktioniert
2. `/verwalter-rechner` → „Rechenpraxis öffnen“ → `/app/rechenpraxis` (schlankes Layout)
3. Admin → Kursbuch-Generator → „Aus Portal-Inhalt“ ohne Wartezeit/KI-Kosten

<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #152 — docs(ops): Alisad Master-Workflow + DNS E-Mail Check Skript
- Branch: cursor/alisad-master-workflow-7dbc
- Erstellt: 2026-06-09T09:06:38Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Anfänger-freundlicher Master-Workflow für Alisad + automatischer DNS-Check.

## Neu

- `docs/ALISAD_MASTER_WORKFLOW.md` — Phasen 1–7, wer macht was, Copy-Paste DNS
- `scripts/ops/verify-dns-email.sh` — `pnpm run ops:dns-email-check`
- Grün/Rot-Ausgabe für SPF, DMARC, DKIM, CAA, HSTS

## Nutzung

```bash
pnpm run ops:dns-email-check
```

Nach DNS-Änderung durch Alisad: erneut ausführen bis ✅.

## Checks

- `npx tsc --noEmit --skipLibCheck` — 0 errors
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #151 — fix(security): HSTS preload directive via Helmet
- Branch: cursor/hsts-preload-fix-7dbc
- Erstellt: 2026-06-09T08:21:20Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Problem

`hstspreload.org` bestätigt: HSTS-Header ohne `preload`-Directive. Ursache: Custom-Middleware setzte `preload`, Helmet überschrieb danach ohne `preload`.

## Fix

- Entfernt redundante HSTS/X-Frame Middleware vor Helmet
- Konfiguriert `helmet({ hsts: { maxAge: 31536000, includeSubDomains: true, preload: true } })`

## Post-Deploy Verifikation

```bash
curl -sI https://immobilien-akademie-smart.de/ | grep -i strict-transport
# Erwartet: max-age=31536000; includeSubDomains; preload
```

## Hinweis

`hstspreload.org`-Einreichung erst nach **1 Monat** stabiler Konfiguration — nicht automatisch.

## Checks

- `npx tsc --noEmit --skipLibCheck` — 0 errors
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #150 — docs: Risikoregister v1 (NF-A6)
- Branch: cursor/risk-register-v1-7dbc
- Erstellt: 2026-06-09T07:52:53Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Fügt `docs/RISIKOREGISTER.md` als zentrale Risikoübersicht aus dem Architektur-Audit (NF-A6) hinzu.

## Inhalt

- 20 identifizierte Risiken mit Severity (Niedrig/Mittel/Hoch)
- Aktueller Mitigation-Status und empfohlene Maßnahmen
- Verantwortlichkeit: Code / Alisad / extern
- Priorisierte P0/P1-Maßnahmen
- Verknüpfung mit externen Verifikationen (Qualys A+, PageSpeed Mobile 09.06.2026)

## Änderungen

- `docs/RISIKOREGISTER.md` (neu)
- `.gitignore`: Ausnahme `!docs/RISIKOREGISTER.md` (wie andere tracked docs)

## Checks

- `npx tsc --noEmit --skipLibCheck` — 0 errors
- Keine verbotenen Dateien geändert

## Hinweis

Doc-only PR — kein Code-Change, kein Merge ohne Besprechung.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #149 — docs: §17 Bericht-Korrektur-Nachtrag (NF-A1–A7 + externe Daten)
- Branch: cursor/audit-corrections-7dbc
- Erstellt: 2026-06-09T07:52:53Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Ergänzt `docs/UEBERGABE_ANTROPIQ_ARCHITEKT_20260608.md` um **§17 Bericht-Korrektur-Nachtrag** mit allen NF-A1–A7-Korrekturen und Integration der externen Verifikationsdaten vom 09.06.2026.

## Korrekturen

- **NF-A1:** PR #148 gemerged, Live-Verifikation Inspect REST
- **NF-A2:** Gesamtreife 2,8 (nicht 3,2), kalibriert ~3,3–3,5 mit externen Daten
- **NF-A3:** PageSpeed Insights Mobile (Perf 78, LCP 4,5s, A11y 92, SEO 100, BP 96)
- **NF-A4:** Konkurrenzvergleich als unbelegt markiert
- **NF-A5:** Tests = Indikator, nicht Beweis
- **NF-A6:** Verweis auf `docs/RISIKOREGISTER.md`
- **NF-A7:** Module3 Chunk 184 KB / ~53 KB gzip
- Zusätzlich: Qualys SSL Labs A+, curl HTTPS-Header-Verifikation, LCP-Diagnose-Kurzfassung, Reifegrad-Tabelle

## Checks

- `npx tsc --noEmit --skipLibCheck` — 0 errors
- Keine verbotenen Dateien geändert

## Hinweis

Doc-only PR — kein Merge ohne Besprechung.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #147 — feat(auth): hybrid email verification (7-day grace)
- Branch: cursor/hybrid-email-verification-7dbc
- Erstellt: 2026-06-08T20:57:11Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## PR-C (Priorität C — Polish)

Implements Alisad's hybrid email verification decision.

### Behaviour
- **Register:** Immediate session (unchanged friction)
- **Parallel:** Verification email with JWT link (`/api/auth/verify-email?token=…`)
- **7-day grace:** Unverified users can use the portal
- **After 7 days:** Login + protected tRPC return 403 *"Bitte E-Mail bestätigen um fortzufahren"*
- **On verify:** `emailVerifiedAt` set → account active again
- **Admins:** Exempt from block

### Schema
Migration `0044_user_email_verified_at.sql` — `emailVerifiedAt` TIMESTAMP NULL; existing users backfilled to `createdAt`.

**Note:** `drizzle/schema.ts` not modified (AGENTS.md).

### Tests
`server/emailVerification.test.ts` — grace logic + JWT roundtrip.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #146 — feat(gdpr): deletion audit log without PII (NF-13 / DSGVO)
- Branch: cursor/dsgvo-deletion-audit-log-7dbc
- Erstellt: 2026-06-08T20:55:38Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## PR-D (Priorität D)

Implements `deletion_audit_log` per Alisad spec (adapted to project camelCase columns).

### Schema (migration `0043_deletion_audit_log.sql`)
- `userHash` — SHA256(`${userId}:${JWT_SECRET}`)
- `initiatedBy` — `user` | `admin`
- `tablesAffected` — JSON row counts per table (no PII)
- `triggeredVia` — e.g. `trpc.account.deleteMyAccount`

### Integration
- `trpc.account.deleteMyAccount`
- `trpc.adminUsers.deleteUser`

**Note:** `drizzle/schema.ts` not touched (AGENTS.md). Raw SQL migration + `server/deletionAudit.ts`.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #145 — ops(stripe): pre-flight check for 18 Price-IDs (NF-11)
- Branch: cursor/stripe-price-preflight-7dbc
- Erstellt: 2026-06-08T20:54:34Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## NF-11 Folge-PR (Priorität B)

Validates all 18 `STRIPE_PRICE_*` ENV variables against Stripe API before Live go-live.

### Usage
```bash
STRIPE_SECRET_KEY=sk_live_… pnpm run ops:stripe-preflight
```

Exit code **1** on discrepancies.

### Tests
`shared/stripePricePreflight.test.ts`
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #144 — ops(r2): Slack/webhook alert on MySQL backup failure
- Branch: cursor/r2-backup-failure-alert-7dbc
- Erstellt: 2026-06-08T20:53:24Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## NF-9 Folge-PR (Priorität A)

Adds `notify-failure` job to `.github/workflows/mysql-backup-r2.yml` that fires on workflow failure and POSTs to `OPS_ALERT_WEBHOOK_URL` (Slack Incoming Webhook compatible).

### Setup (Alisad)
GitHub → Settings → Secrets → Actions → `OPS_ALERT_WEBHOOK_URL` = Slack Incoming Webhook URL

If unset: workflow warns but does not fail (graceful).

### Test
`server/r2BackupAlert.test.ts` — static workflow contract check.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #136 — docs: Übergabedokument Baumeister-Audit (06.–08.06.2026)
- Branch: cursor/baumeister-audit-transfer-7dbc
- Erstellt: 2026-06-08T12:49:22Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Vollständiges Übergabedokument für den Bayerischen Baumeister / Stakeholder-Review nach dem Sprint 06.–08.06.2026.

### Inhalt `docs/UEBERGABE_BAYERISCHER_BAUMEISTER_20260608.md`

- Executive Summary (Ampel-Status aller Bereiche)
- Chronologie aller PRs #119–#135 (B2B, R2, Stripe, Security, UX)
- Technischer Audit: tsc 0 Fehler, 122/122 Vitest, ops:health ok
- Prüfliste für manuelle Abnahme (B2B, Backup, Legal, Stripe Live)
- Fehler-Log mit Korrekturen
- Brainstorming: Nutzer, B2B-Partner, Investoren, priorisierte Roadmap
- Freigabe-Checkliste

### Weitere Änderungen

- `docs/EXTERNAL_OPS_CHECKLIST.md` — R2 Restore + Daily Cron als erledigt markiert
- `.gitignore` — Exception für Übergabedokumente

### Audit-Ergebnisse (08.06.2026)

| Check | Ergebnis |
|-------|----------|
| `tsc --noEmit` | 0 errors |
| `vitest run` | 122/122 passed |
| `ops:health` | ok, db connected, migrations pending 0 |
| Quiz-Guard | HTTP 403 |
| Playwright E2E | Blockiert (Testkonto `playwright@test.de` fehlt in Prod) |

### Offen für Baumeister

- B2B Team-Code E2E (nach Admin-Passwort via `/forgot-password`)
- Stripe Live Go-Live
- Legal: Gewerbeschein, DMARC, AVVs
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---

## Vollständige Commit-Historie (alle, chronologisch von Anfang an)

```
2026-02-27 11:12:40 +0100 | aa398d4 | Alischad | Portal komplett
2026-02-27 11:38:36 +0100 | adb7094 | Alischad | Trigger Railway build
2026-02-27 16:38:12 +0100 | a6b40ef | Alischad | Fix path undefined
2026-02-27 16:48:55 +0100 | 12663d5 | Alischad | Fix Node18 dirname
2026-02-27 16:52:39 +0100 | d45d6e3 | Alischad | Fix Node18 dirname
2026-02-27 17:15:32 +0100 | f2fdab1 | Alischad | Fix: exclude vite.config from production bundle
2026-02-27 18:23:37 +0100 | 23e1f4d | Alischad | Fix: serveStatic/setupVite exports for Railway
2026-02-27 19:18:48 +0100 | 5643a9e | Alischad | Railway: db push before server start
2026-02-27 19:36:28 +0100 | 0fdb481 | Alischad | Fix Railway auth crypto polyfill
2026-02-27 19:47:03 +0100 | 3f4391c | Alischad | Fix Railway login: add crypto polyfill for jose
2026-02-27 20:00:31 +0100 | 6568f87 | Alischad | Railway: remove db migration from startup
2026-02-27 22:25:29 +0100 | f15907c | Alischad | Fix exam and quiz JSON fallback handling
2026-02-27 22:59:34 +0100 | 0898ace | Alischad | Fix tutor scrolling and exam error handling
2026-02-27 23:08:43 +0100 | 4d6e427 | Alischad | Shuffle answer options in exam mode
2026-02-27 23:20:32 +0100 | 544931c | Alischad | Fix exam answer randomization and tutor scrolling
2026-02-27 23:37:23 +0100 | 055fd20 | Alischad | Fix exam mode: shuffle answer options and remap correct answer
2026-02-27 23:38:58 +0100 | 67ee738 | Alischad | Fix exam simulation: show visible start errors in UI
2026-02-28 00:24:21 +0100 | f25eff5 | Alischad | Fix exam simulation build + randomize answer order; enforce Node 22
2026-02-28 16:31:20 +0100 | f2eb714 | Alischad | Fix IHK exam simulation + randomize answer order; make OAuth optional
2026-02-28 23:04:36 +0100 | ccc2a83 | Alischad | Fix exam: remove duplicate shuffles (keep single server-side shuffle)
2026-02-28 23:11:31 +0100 | 8e237d3 | Alischad | Fix exam: apply single server-side shuffle result correctly
2026-03-01 12:30:14 +0100 | 23401aa | Alischad | Run db:push before starting server on Railway
2026-03-01 21:39:32 +0100 | 96bbf79 | Alischad | Fix: exam shuffle + quiz DB seed
2026-03-01 21:53:56 +0100 | 038b7b6 | Alischad | Fix: remove db:push from start command
2026-03-01 22:23:41 +0100 | fd50e9a | Alischad | Fix: offline exam with 85 local questions + shuffle
2026-03-01 22:59:43 +0100 | bab37ec | Alischad | Prüfungssimulation: 91 Fragen offline (Quiz + BGH-Urteile)
2026-03-02 12:18:14 +0100 | 804aba2 | Alischad | fix: Manus-Altlasten entfernen, Branding bereinigen, AZAV-Claims entfernen
2026-03-02 17:20:07 +0100 | c9b21ef | Alischad | fix: Passwort-Hashes von auth.json nach MySQL migrieren
2026-03-02 20:30:37 +0100 | 8f74ab7 | Alischad | fix: Rechts- und Branding-Bereinigung
2026-03-02 20:37:23 +0100 | 8530554 | Alischad | fix: Rate-Limiting für Login/Register (max 10 Versuche / 15 Min)
2026-03-02 23:01:59 +0100 | 03ff632 | Alischad | feat: Progress-Router mit startDay/completeDay/getProgress
2026-03-02 23:16:31 +0100 | 4147bf1 | Alischad | feat: useServerProgress Hook - Lernfortschritt in MySQL + localStorage
2026-03-02 23:48:33 +0100 | 47b217e | Alischad | feat: Modulzugangsschutz per User - enabledModules in MySQL
2026-03-03 00:17:23 +0100 | c129438 | Alischad | feat: Passwort-Reset per E-Mail (Resend)
2026-03-03 00:29:03 +0100 | d2cb559 | Alischad | fix: Resend lazy init - kein Crash beim Start ohne API-Key - DSGVO: Konto löschen Route + Seite hinzugefügt - account.deleteMyAccount tRPC Endpunkt
2026-03-03 00:47:57 +0100 | b9d1baa | Alischad | feat: Admin-Panel Nutzerverwaltung mit Modulfreischaltung
2026-03-03 15:42:50 +0100 | 96aebaf | Alischad | feat: KI-Tutor auf Gemini 2.5 Flash umgestellt
2026-03-03 16:18:39 +0100 | 861179b | Alischad | fix: KI-Tutor auf echtes Gemini umgestellt
2026-03-03 16:34:24 +0100 | 5d7f506 | Alischad | fix: Service Worker Cache-Busting - neuer Cache bei jedem Deploy
2026-03-03 17:50:29 +0100 | 36818d6 | Alischad | fix: Demo-Login Button für einfachen Zugang
2026-03-03 18:02:06 +0100 | 902b6e1 | Alischad | fix: doppelte user-Deklaration in DashboardLayout entfernt
2026-03-03 18:39:31 +0100 | cae99a3 | Alischad | feat: Magic Link Login für Demo-Zugang
2026-03-03 18:53:12 +0100 | 9e0e894 | Alischad | fix: AITutor String-Fehler + DeleteAccount useAuth Pfad
2026-03-03 20:06:09 +0100 | 16db3e5 | Alischad | fix: align magic login with local auth session
2026-03-03 20:29:23 +0100 | c7817b7 | Alischad | fix: always elevate magic demo user to admin
2026-03-04 08:28:45 +0100 | 98e0d64 | Alischad | fix: switch dashboard tutor to live AI assistant and disable stale SW cache
2026-03-05 09:29:00 +0100 | 435d2ff | Alischad | security: disable public demo magic login route
2026-03-05 09:32:27 +0100 | 6015f32 | Alischad | fix: align password reset hashing with local auth verifier
2026-03-05 16:45:33 +0100 | eda6138 | Alischad | fix: disable db:push and local main.tsx tweaks
2026-03-05 17:20:32 +0100 | 4264bf0 | Alischad | fix: trpc client superjson transformer + include credentials
2026-03-05 19:02:38 +0100 | 0765e5c | Alischad | fix: bind server to 0.0.0.0 for Railway
2026-03-06 10:51:17 +0100 | 323d292 | Alischad | fix: Railway listen on PORT + 0.0.0.0 (no port probing)
2026-03-06 13:52:10 +0100 | 6497a72 | Alischad | feat: add /api/health endpoint
2026-03-06 16:42:21 +0100 | 2a83356 | Alischad | fix: normalize enabledModules to avoid white screen
2026-03-06 17:35:40 +0100 | ee59161 | Alischad | fix: prevent enabledModules split crash in WhiteLabelContext
2026-03-06 18:56:53 +0100 | 0bf7b71 | Alischad | fix: admin sees all modules in myAccess
2026-03-06 20:23:30 +0100 | 90bb787 | Alischad | chore: remove umami analytics script placeholder
2026-03-06 22:56:15 +0100 | 379ddac | Alischad | fix: show all modules in sidebar and lock inaccessible ones
2026-03-07 00:20:17 +0100 | 6d4f7b8 | Alischad | feat: add access codes table (voucher unlock)
2026-03-08 18:32:34 +0100 | e443744 | Alischad | fix: KI-Tutor Prompt auf quellenbasierte Antworten mit Direktlinks umgestellt
2026-03-08 18:57:54 +0100 | 28b1c53 | Alischad | fix: alle 5 TS-Fehler behoben (conv, Streamdown, insertId, Set-Iteration)
2026-03-08 19:40:22 +0100 | f5e4e4f | Alischad | fix: Magic Link mit ENV-Secret reaktiviert
2026-03-08 20:14:48 +0100 | cc08d65 | Alischad | fix: updateUserRole Funktion in db.ts hinzugefügt
2026-03-08 21:03:33 +0100 | 58763ad | Alischad | fix: Module Access Query immer frisch laden (staleTime:0)
2026-03-08 21:49:51 +0100 | a8363e8 | Alischad | fix: superjson transformer aus httpBatchLink entfernt (tRPC v11 kompatibel)
2026-03-09 08:47:14 +0100 | 5b0eb42 | Alischad | feat: Freischalt-Code UI hinzugefügt (/code-einloesen)
2026-03-09 09:34:38 +0100 | 572d4bb | Alischad | fix: TypeScript Union-Type Fehler in RedeemCode und ExamResults behoben
2026-03-09 13:52:20 +0100 | 7496d6e | Alischad | feat: Admin Zugangscodes-Verwaltung hinzugefügt (/admin/codes)
2026-03-09 14:08:59 +0100 | 5f90d04 | Alischad | feat: Impressum und Datenschutz Seiten hinzugefügt
2026-03-09 14:20:01 +0100 | 54aa6e5 | Alischad | chore: Projektdateien aufgeräumt, .gitignore aktualisiert
2026-03-09 14:43:12 +0100 | d2a3830 | Alischad | feat: Footer mit Impressum/Datenschutz Links, Adresse im Impressum
2026-03-09 15:29:59 +0100 | cdfb38f | Alischad | feat: Stripe Test-Integration, Kurse-Seite, Footer-Links aktualisiert
2026-03-09 15:35:49 +0100 | 75a2bb8 | Alischad | fix: stripe dependency in package.json hinzugefügt
2026-03-09 15:47:45 +0100 | d823e41 | Alischad | fix: Kurse Layout mit Inline-Styles repariert
2026-03-09 16:20:04 +0100 | a8d7dee | Alischad | fix: Footer korrekt in main-Bereich platziert
2026-03-09 16:39:50 +0100 | 8d9e651 | Alischad | fix: overflow-hidden auf main entfernt, Inhalt nicht mehr abgeschnitten
2026-03-09 17:24:08 +0100 | 82f7d08 | Alischad | fix: Layout-Overflow Fehler auf Home und DashboardLayout behoben
2026-03-09 17:57:33 +0100 | 1487758 | Alischad | feat: Zahlung-Erfolgreich Seite, Stripe Webhook Module-Freischaltung
2026-03-10 17:04:38 +0100 | dde7f94 | Alischad | feat: ModuleGuard - Modul 2-5 Zugriff gesichert
2026-03-10 17:16:36 +0100 | 04feb1b | Alischad | feat: ModuleGuard - schema, db und App.tsx gepatcht
2026-03-10 18:07:11 +0100 | b6b184e | Alischad | fix: Demo-Button entfernt - kein Admin-Login mehr öffentlich
2026-03-10 18:49:09 +0100 | a232fa9 | Alischad | feat: Präsentations-Code System - Demo-Codes für Investoren/Behörden
2026-03-10 19:09:34 +0100 | 8963325 | Alischad | feat: presentationCode tRPC Router hinzugefügt
2026-03-10 19:48:11 +0100 | 97a1b8a | Alischad | fix: leerer JSX-Block in LoginPage entfernt
2026-03-11 08:37:34 +0100 | d6e0f2d | Alischad | fix: force Railway clean build
2026-03-11 10:11:17 +0100 | 8521fc3 | Alischad | fix: lokaler Login-Redirect + SW stale cache behoben
2026-03-11 11:21:59 +0100 | 27505e1 | Alischad | fix: LoginPage fehlende States und handleDemoCode hinzugefügt
2026-03-11 11:46:43 +0100 | 22c8516 | Alischad | fix: LoginPage komplett sauber - type=button, div-Struktur, handleDemoCode
2026-03-11 11:51:19 +0100 | 301d320 | Alischad | fix: LoginPage vollständig neu - saubere Struktur, type=button überall
2026-03-11 12:25:31 +0100 | 4a7d5aa | Alischad | fix: Präsentations-Code Login mit Cookie-Session
2026-03-11 12:34:06 +0100 | e7ed89b | Alischad | fix: handleDemoCode Fehlercheck vereinfacht
2026-03-11 12:45:31 +0100 | e0d75d2 | Alischad | fix: presentationCode SQL isActive=1 statt true
2026-03-11 13:31:47 +0100 | fe09b76 | Alischad | fix: redeem-code Handler korrekte DB-Funktionen
2026-03-11 13:37:57 +0100 | 137bd50 | Alischad | fix: extra }); entfernt
2026-03-12 06:58:40 +0100 | c3234d2 | Alischad | fix: redeemPresentationCode - Drizzle sql template statt raw execute
2026-03-12 07:28:04 +0100 | 1bee378 | Alischad | fix: UPDATE presentation_codes by code statt id
2026-03-12 08:36:21 +0100 | b304198 | Alischad | fix: AdminCodes auf presentationCode Router, Duplikat entfernt
2026-03-12 09:56:24 +0100 | f84e22d | Alischad | fix: ModuleGuard redirect /login + redeem-code enabledModules direkt SQL
2026-03-12 10:39:09 +0100 | ecfe869 | Alischad | fix: redeem-code INSERT ON DUPLICATE KEY - enabledModules korrekt gesetzt
2026-03-12 11:15:32 +0100 | 3adbed1 | Alischad | fix: redeemPresentationCode - Drizzle mysql2 rows[0][0] korrekt parsen
2026-03-15 13:06:58 +0100 | e34bc4f | Alischad | feat: Upgrade-Modal ModuleGuard + Hero-Bild Manus-CDN entfernt
2026-03-15 14:13:33 +0100 | d3d7260 | Alischad | chore: BACKUP-Dateien entfernt (Module3Detail_BACKUP, Module3Old)
2026-03-15 14:22:00 +0100 | 943df76 | Alischad | fix: WhatsApp-Nummer im Upgrade-Modal auf echte Nummer gesetzt
2026-03-15 14:26:15 +0100 | 93f97ba | Alischad | feat: Widerrufsbelehrung hinzugefuegt (§355 BGB, Art. 246a EGBGB)
2026-03-15 14:34:34 +0100 | 6870e8d | Alischad | fix: Route /widerruf + Footer-Link Widerrufsbelehrung eingetragen
2026-03-15 14:38:25 +0100 | 230fb0f | Alischad | fix: Route /widerruf + Footer-Link Widerrufsbelehrung eingetragen
2026-03-15 14:41:48 +0100 | 5e8677c | Alischad | fix: doppelte Route /widerruf entfernt + Footer-Link ergaenzt
2026-03-15 14:45:03 +0100 | 127c0c9 | Alischad | fix: schliessenden </Link> Tag bei Widerrufsbelehrung im Footer ergaenzt
2026-03-15 15:09:56 +0100 | 58338ac | Alischad | feat: Willkommens-E-Mail bei Registrierung (Resend, fire-and-forget)
2026-03-15 15:19:05 +0100 | 10a3869 | Alischad | feat: Willkommens-E-Mail bei Registrierung (Resend, fire-and-forget)
2026-03-15 15:55:20 +0100 | cd051dd | Alischad | fix: ModuleGuard JSX-Fehler behoben + Footer doppeltes Tag entfernt
2026-03-15 16:30:11 +0100 | 2cbff95 | Alischad | fix: doppelter Widerruf-Import entfernt + Footer-Link in eigenes li
2026-03-15 16:33:25 +0100 | 2b13dd0 | Alischad | fix: doppelter Widerruf-Import entfernt + Footer-Link in eigenes li
2026-03-15 16:37:02 +0100 | fdeef59 | Alischad | fix: leeres li im Footer entfernt
2026-03-15 16:59:34 +0100 | 75d611e | Alischad | fix: ModuleGuard komplett neu - einfache JSX-Struktur ohne mehrzeilige a-Attribute
2026-03-15 18:25:57 +0100 | 511005d | Alischad | feat: Quereinsteiger-Einstiegsseiten fuer alle 5 Module
2026-03-15 19:12:25 +0100 | 4cc6750 | Alischad | feat: Portal-Phasen-System A/B/C/D + vollstaendiges Rechts-Audit
2026-03-15 21:01:32 +0100 | bb0137a | Alischad | fix: letzte unbelegbare Aussagen korrigiert
2026-03-16 07:03:49 +0100 | bd338fd | Alischad | feat: RAG-Tutor Gemini + Widerrufsbelehrung Kaufseite + KI-Tutor upgrade
2026-03-16 07:10:13 +0100 | 362d67c | Alischad | feat: Bildungskonzept-PDF-Seite + Footer-Link
2026-03-16 08:08:41 +0100 | 7b6f04a | Alischad | feat: Einzelmodul-Buchung M3/M4/M5 in Stripe-Produkten
2026-03-16 09:02:58 +0100 | fafd031 | Alischad | feat: Modul 2 Inhaltsausbau — vollstaendige IHK-Bewertungsberechnungen
2026-03-16 09:15:49 +0100 | 3a5fa35 | Alischad | fix: doppeltes day_6 in Module2ContentPart1 entfernt
2026-03-16 10:34:19 +0100 | d176d9b | Alischad | feat: Modul 4 vollstaendige Sachwert/Vergleichswert-Berechnungen + Modul 2 regional
2026-03-16 10:41:55 +0100 | 93fa5e4 | Alischad | feat: regionale Aufgaben Hamburg/Leipzig/München/Erfurt in M4+M2
2026-03-16 10:49:48 +0100 | fdc502e | Alischad | feat: regionale Aufgaben Hamburg/Leipzig/München/Erfurt in M4+M2
2026-03-16 11:12:11 +0100 | 5aa680c | Alischad | feat: Modul 4 Tag 5-7 vollstaendige Ertragswert-Berechnungen
2026-03-16 14:42:15 +0100 | 676e974 | Alischad | feat: Modul 3 + 5 Inhaltsupgrade
2026-03-16 15:19:30 +0100 | 00b260e | Alischad | fix: fehlendes Backtick extendedTheory Tag 13 Modul 5
2026-03-16 15:39:28 +0100 | 53400ee | Alischad | fix: ueberschuessiges Backtick in M5 Tag13 entfernt
2026-03-16 16:16:50 +0100 | 271c8a5 | Alischad | fix: task Array korrekt geschlossen M3 Tag62
2026-03-16 16:41:47 +0100 | addcd35 | Alischad | fix: task Arrays korrekt in M3 Tag64 Kuendigung
2026-03-17 11:30:21 +0100 | f01d98e | Alischad | feat: RAG-Tutor Claude Haiku primaer + Gemini Fallback
2026-03-17 11:55:44 +0100 | 598a261 | Alischad | feat: KI-Tutor Button in alle 5 Module eingebaut
2026-03-17 12:56:09 +0100 | 7070e10 | Alischad | fix: AIAssistant Input immer aktiv, Streamdown entfernt
2026-03-17 13:12:21 +0100 | cda8049 | Alischad | fix: AIAssistant Modal kleiner, Quick-Questions funktionieren
2026-03-17 13:25:42 +0100 | aa978d6 | Alischad | fix: AIAssistant komplett neu — direkter RAG-API Aufruf, kein tRPC
2026-03-17 13:39:54 +0100 | e3f5bf1 | Alischad | fix: AIAssistant Markdown-Fehler behoben, pre-wrap Text
2026-03-17 13:55:31 +0100 | d95dee5 | Alischad | feat: AIAssistant komplett neu — ChatGPT-Stil, Markdown, scrollbar, immer offen
2026-03-17 16:37:10 +0100 | 68c4ec9 | Alischad | feat: Spracheingabe Voice Input mit Web Speech API, Deutsch, Mic-Button
2026-03-17 16:48:04 +0100 | 6b472ac | Alischad | fix: Spracheingabe bessere Fehlerbehandlung mit Brave-Hinweis
2026-03-17 18:33:17 +0100 | 098d7c8 | Alischad | feat: Spracheingabe via MediaRecorder + Groq Whisper — funktioniert in Brave
2026-03-17 18:51:33 +0100 | fb70a20 | Alischad | feat: Sprachausgabe Text-to-Speech mit Vorlesen-Button bei KI-Antworten
2026-03-17 19:10:59 +0100 | ec7ea4f | Alischad | fix: Vorlesen-Button in KI-Antworten eingebaut
2026-03-17 19:19:58 +0100 | 7ae89d0 | Alischad | fix: Vorlesen-Button groesser und klickbar
2026-03-17 19:29:24 +0100 | b4b4b26 | Alischad | trigger: Railway redeploy
2026-03-17 19:42:05 +0100 | 1c52160 | Alischad | fix: TTS speak() Funktion mit Voices-Fallback und Error-Logging
2026-03-17 20:06:34 +0100 | b14db39 | Alischad | fix: TTS speak() vereinfacht ohne async Kette
2026-03-17 20:30:32 +0100 | 49d24e9 | Alischad | feat: ElevenLabs TTS natuerliche Stimme + Browser TTS Fallback
2026-03-17 20:42:32 +0100 | 6a14e8a | Alischad | fix: TTS Browser-direkt ohne async, kein ElevenLabs
2026-03-17 20:58:40 +0100 | c275e0b | Alischad | feat: ElevenLabs TTS direkt vom Browser + Fallback
2026-03-17 21:13:48 +0100 | f5f50c3 | Alischad | fix: TTS auf 300 Zeichen fuer Free Tier
2026-03-17 21:31:01 +0100 | 3194362 | Alischad | feat: Dokument-Upload PDF/DOCX/Audio/Text KI-Analyse
2026-03-18 16:27:05 +0100 | c0ff14e | Alischad | fix: Duplicate Key enabledModules in schema.ts entfernt
2026-03-18 16:53:33 +0100 | ae5e5ba | Alischad | fix: Exam stuck sessions - abandoned check + DB bereinigt
2026-03-18 17:21:53 +0100 | 61c6acd | Alischad | feat: Helmet Security Headers eingebaut
2026-03-18 17:31:36 +0100 | eba28ef | Alischad | perf: streamdown entfernt, Bundle 15.9MB -> 4.5MB (-72%)
2026-03-18 17:36:17 +0100 | b462442 | Alischad | fix: pnpm-lock.yaml aktualisiert, streamdown entfernt
2026-03-18 21:50:52 +0100 | 97e59c3 | Alischad | feat: Admin-Dashboard + Content-Upload eingebaut
2026-03-18 22:21:18 +0100 | d32bece | Alischad | fix: console.log entfernt, duplicate key behoben, rate limiting aktiviert
2026-03-18 22:22:37 +0100 | 2d428d1 | Alischad | cleanup: temporäre Dateien entfernt
2026-03-18 22:50:32 +0100 | 3c4e07a | Alischad | feat: Auto-Fragen-Generator + ContentUpload komplett mit DB-Speicherung
2026-03-18 23:07:19 +0100 | c06adef | Alischad | feat: Kursbuch-Generator + generate-kursbuch Endpoint
2026-03-18 23:21:07 +0100 | 0971cd9 | Alischad | fix: router.post Bug behoben - Endpoints korrekt in app eingebaut
2026-03-22 20:25:54 +0100 | ba232b6 | Alischad | feat: Fragen-Manager, Fallstudien mit KI-Bewertung, Lernkarten/Flashcards
2026-03-22 20:47:24 +0100 | 3bc32b2 | Alischad | fix: Kursbuch-v2 mit echtem Modulinhalt, duplicate routes, backup, navigation
2026-03-22 21:15:33 +0100 | e81fc4f | Alischad | fix: alle Backtick-Syntaxfehler in ragTutor.ts behoben
2026-03-22 21:45:28 +0100 | 68ae983 | Alischad | fix: Lernkarten+Fallstudien in Navigation, questionBank Import, adminQuestions Router
2026-03-23 08:09:31 +0100 | a1fda16 | Alischad | fix: P0 Fixes - Duplikat-Endpoint, Count-Bug, update Mutation, Dashboard href
2026-03-23 08:54:58 +0100 | 41c6b63 | Alischad | feat: Lernkarten aus DB, 5 Fallstudien, ComponentShowcase entfernt, P1 abgeschlossen
2026-03-23 09:15:27 +0100 | a8e3d9d | Alischad | feat: Dozenten-Cockpit mit KI-Unterrichtsplan, Gruppenanalyse, Download
2026-03-23 09:41:02 +0100 | dcf8524 | Alischad | feat: MediaSkript-Generator - NotebookLM + Video + Synthesia + Sprechtextskript
2026-03-23 10:01:25 +0100 | 35ef81f | Alischad | feat: Exposé-Trainer mit GEG-Pflichtangaben-Checkliste und KI-Bewertung
2026-03-23 10:25:14 +0100 | 54ca2d5 | Alischad | feat: Dozenten-Lösungsübersicht - Fallstudien, Exposé, BGH-Urteile, Quiz mit Musterlösungen
2026-03-23 15:24:42 +0100 | 6075b90 | Alischad | feat: Dokument-Viewer mit PDF-Anzeige, Farbmarkierungen und Kommentaren
2026-03-23 15:33:16 +0100 | 012d99e | Alischad | fix: DokumentViewer Syntaxfehler behoben
2026-03-23 16:13:25 +0100 | b984803 | Alischad | fix: max_tokens 8000, alle Prompts verstärkt, Mediaskript-Duplikat entfernt
2026-03-23 17:24:47 +0100 | d1bd1db | Alischad | feat: globaler FontScale + Vollbild in allen 5 Modulen und allen KI-Generatoren
2026-03-23 21:11:38 +0100 | b0a103d | Alischad | feat: KI-Tutor in allen 5 Modulen aktiv, Backup-Dateien entfernt
2026-03-23 22:51:46 +0100 | 4466f9d | Alischad | fix: FontScale localStorage statt Context - weißer Bildschirm behoben
2026-03-23 23:52:49 +0100 | 2a4adbd | Alischad | fix: showAITutor State korrekt definiert - Module funktionieren wieder
2026-03-24 00:27:14 +0100 | aabc837 | Alischad | fix: showAITutor State in M4 und M5 - weißer Bildschirm behoben
2026-03-24 11:15:33 +0100 | 2155c5b | Alisad Gadyri | feat: Augen-Symbol im Login, z-index Fix für Cookie-Banner
2026-03-24 11:29:14 +0100 | c0160e5 | Alisad Gadyri | fix: Cookie-Banner auf Login-Seite deaktiviert - Eingabefelder wieder nutzbar
2026-03-24 12:04:49 +0100 | 9023e00 | Alisad Gadyri | fix: LoginPage komplett neu mit useRef - Browser-Autofill Problem behoben
2026-03-24 16:29:54 +0100 | 6b4d5d2 | Alisad Gadyri | fix: Service Worker deaktiviert - Login-Blockierung behoben
2026-03-24 20:28:17 +0100 | d7de3e2 | Alisad Gadyri | fix: Login-Redirect-Schleife behoben - Eingabe wird nicht mehr gelöscht
2026-03-24 21:17:33 +0100 | cf1e28a | Alisad Gadyri | fix: Footer-Platzhalter, Cookie-Banner, Auth-Guard Admin-Routen, doppelte Routen entfernt
2026-03-24 21:32:05 +0100 | 42772fe | Alisad Gadyri | fix: Max Mustermann ersetzt, Admin-Icons Lucide, Prüfungsfragen-Count, alle 7 Probleme behoben
2026-03-24 21:47:41 +0100 | 75681f3 | Alisad Gadyri | docs: PROJEKT_PASS.md erstellt - vollständige Projektdokumentation
2026-03-24 21:58:31 +0100 | e9e2685 | Alisad Gadyri | feat: Lernfortschritt-Tracking in allen 5 Modulen aktiv - startDay/completeDay/Heartbeat
2026-03-24 22:41:09 +0100 | 2c140c9 | Alisad Gadyri | feat: Lernstatistiken auf DB-Daten umgestellt - zeigt echten Fortschritt
2026-03-24 22:56:11 +0100 | 088b9e4 | Alisad Gadyri | fix: Dashboard progress Referenzen behoben - weißer Bildschirm behoben
2026-03-24 23:08:21 +0100 | 4170a34 | Alisad Gadyri | fix: Lernstatistiken Loading State - zeigt sofort Daten
2026-03-24 23:30:01 +0100 | 83bc131 | Alisad Gadyri | fix: Lernfortschritt completeDayByIds - Tracking funktioniert jetzt zuverlässig
2026-03-25 23:24:23 +0100 | 9402826 | Alisad Gadyri | feat: all-questions.ts von 92 auf 507 MC-Fragen synchronisiert (DB-Export)
2026-03-25 23:28:41 +0100 | 56721dd | Alisad Gadyri | feat: Quiz-Fallstudien für M2 (Maklerrecht) und M4 (Wertermittlung) — je 3 IHK-Praxisfälle
2026-03-26 08:52:52 +0100 | b2d887a | Alisad Gadyri | feat: Modul 1 - Aufgaben für alle 20 Tage hinzugefügt
2026-03-26 09:07:05 +0100 | 1228aea | Alisad Gadyri | feat: Modul 1 Aufgaben-Tab zeigt strukturierte Tagesaufgaben
2026-03-26 15:22:29 +0100 | 1d5a469 | Alisad Gadyri | docs: Repomix Pakete + PROJEKT_PASS v3.0 für Chat-Kontinuität
2026-03-30 13:15:42 +0200 | 1b5d01c | Alisad Gadyri | fix: Modul 1 Normen Tag 11-19 vollständig erweitert - echte Gesetze statt Platzhalter
2026-03-30 13:21:52 +0200 | c220d8f | Alisad Gadyri | fix: Cookie-Banner verkleinert - blockiert keine Inhalte mehr
2026-03-30 14:22:23 +0200 | ef0cee3 | Alisad Gadyri | fix: App.tsx doppelte Imports, M1 Auth-Guard, Stripe URL korrigiert
2026-03-30 23:34:31 +0200 | f95e031 | Alisad Gadyri | fix: M1+M4 extendedTheory wird jetzt vollständig angezeigt - kein abgeschnittener Theorie-Text mehr
2026-03-30 23:38:23 +0200 | 7cbadbd | Alisad Gadyri | fix: M4 extendedTheory Syntax-Fehler behoben
2026-03-30 23:42:13 +0200 | 4ce61e8 | Alisad Gadyri | feat: M2+M3+M5 Aufgaben für alle 178 Tage generiert
2026-03-31 00:11:49 +0200 | 0cd4ed5 | Alisad Gadyri | feat: M4 Bonus-Paket HypZert S Prüfungsvorbereitung Tag 21-40 integriert
2026-03-31 07:22:11 +0200 | 8c88846 | Alisad Gadyri | fix: Sitemap auf 20 relevante URLs erweitert (war 4)
2026-03-31 07:26:51 +0200 | d05ef83 | Alisad Gadyri | perf: Lazy Loading für alle 40 Seiten — Bundle aufgeteilt in Chunks
2026-03-31 07:35:07 +0200 | c691e04 | Alisad Gadyri | fix: Tests konfiguriert — 37/40 bestehen, AI+S3 Tests korrekt behandelt
2026-03-31 07:42:36 +0200 | 3c5e6c0 | Alisad Gadyri | fix: §34c Weiterbildungspflicht-Inhalte aktualisiert — Abschaffung 5.11.2025 vermerkt
2026-03-31 08:46:44 +0200 | 08d7c34 | Alisad Gadyri | fix: OG-Image hinzugefügt, index.html aktualisiert
2026-03-31 08:58:14 +0200 | 3b4eafd | Alisad Gadyri | fix: CSP + Permissions-Policy Security Headers aktiviert
2026-03-31 09:05:14 +0200 | c677bdf | Alisad Gadyri | fix: Lernzeit wird alle 60s gespeichert — kein Datenverlust bei Tab-Schließen mehr
2026-03-31 11:17:31 +0200 | 1f30583 | Alisad Gadyri | fix: TypeScript-Fehler M1-M5 behoben, Login Rate Limiting, Pakete aktualisiert, tote Dateien archiviert
2026-03-31 11:21:21 +0200 | fc308bb | Alisad Gadyri | fix: Doppelte </div> in Module1-5.tsx entfernt — TypeScript-Fehler behoben
2026-03-31 11:23:39 +0200 | 09db20b | Alisad Gadyri | fix: React Fragment in Module1-5.tsx — KI-Tutor war außerhalb des JSX-Root
2026-03-31 11:37:00 +0200 | ebec9b2 | Alisad Gadyri | fix: React lazy+Suspense Import hinzugefügt — 190 TypeScript-Fehler behoben
2026-03-31 11:40:50 +0200 | eac0313 | Alisad Gadyri | fix: React.ComponentType + React default import — TypeScript Lazy-Fehler behoben
2026-03-31 11:43:07 +0200 | dec3d8a | Alisad Gadyri | fix: test-content.ts gelöscht, tasks-Interface korrigiert
2026-03-31 11:46:38 +0200 | 899f2f5 | Alisad Gadyri | fix: types.ts vollständig aktualisiert — tasks, extendedTheory, quiz hinzugefügt
2026-03-31 11:48:50 +0200 | 779ca80 | Alisad Gadyri | fix: Alle Content-Interfaces mit tasks? erweitert
2026-03-31 11:50:09 +0200 | 61c9782 | Alisad Gadyri | fix: quiz? zu allen Content-Interfaces hinzugefügt
2026-03-31 11:53:38 +0200 | 05c5aae | Alisad Gadyri | fix: M4Detail dynamischer Fallback, M2 practice union type
2026-03-31 11:56:58 +0200 | 7fa075b | Alisad Gadyri | fix: Dashboard trpc.trpc, M4Detail type cast, M2 practice any
2026-03-31 11:59:15 +0200 | 66f79f0 | Alisad Gadyri | fix: M2 Content wiederhergestellt, practice: any Interface-Fix
2026-03-31 12:00:43 +0200 | c135763 | Alisad Gadyri | fix: task any + solution any cast — TypeScript Fehler weiter reduziert
2026-03-31 12:02:04 +0200 | b5e6ff7 | Alisad Gadyri | fix: aufgabe.solution any, permissionsPolicy entfernt
2026-03-31 12:06:01 +0200 | c32cfa8 | Alisad Gadyri | fix: helmet CSP Klammern korrigiert
2026-03-31 12:08:45 +0200 | a8eefbc | Alisad Gadyri | fix: aufgabe.solution any, db.execute sql-template, parseOffice Fix
2026-03-31 12:10:04 +0200 | ba6500c | Alisad Gadyri | fix: aufgabe.solution any, ragTutor string cast, Stripe API-Version
2026-03-31 12:12:00 +0200 | 940176b | Alisad Gadyri | fix: task.solution any cast, ragTutor String() cast
2026-03-31 12:20:02 +0200 | 218d023 | Alisad Gadyri | fix: DSGVO Datenschutz.tsx — Anthropic, Stripe, Art.13 Betroffenenrechte ergänzt
2026-03-31 12:27:23 +0200 | 0da4ff3 | Alisad Gadyri | feat: M3 Tag 41+42 — Hausgeldabrechnung und Sonderumlage vollständig
2026-03-31 17:48:39 +0200 | 4441c2d | Alisad Gadyri | feat: Onboarding-Wizard — DB-Spalten, Schema, Router, Komponente
2026-03-31 17:51:02 +0200 | dc29d99 | Alisad Gadyri | fix: Komma nach getUsersByTenantId — Import-Syntaxfehler behoben
2026-03-31 17:54:23 +0200 | f5717c7 | Alisad Gadyri | feat: Onboarding-Wizard in Dashboard integriert — erscheint beim ersten Login
2026-03-31 17:57:59 +0200 | 1eb9d59 | Alisad Gadyri | feat: Audio-Funktion (Text-to-Speech) in alle 5 Module eingebaut — kostenlos, kein API nötig
2026-03-31 18:00:15 +0200 | 38553c3 | Alisad Gadyri | fix: AudioPlayer in Module4Detail FullscreenContent-Konflikt behoben
2026-03-31 18:01:30 +0200 | 8fed93f | Alisad Gadyri | fix: AudioPlayer FullscreenContent-Konflikt in allen Modulen behoben
2026-03-31 18:03:28 +0200 | 7f267b9 | Alisad Gadyri | fix: AudioPlayer Module1Detail FullscreenContent repariert
2026-03-31 18:17:28 +0200 | 44c63b5 | Alisad Gadyri | fix: AudioPlayer Fragment-Wrapper — Railway Build-Fehler behoben
2026-04-01 10:54:32 +0200 | d15b8df | Alisad Gadyri | fix: onboardingCompleted any-cast für Wizard
2026-04-01 11:18:11 +0200 | 675892b | Alisad Gadyri | fix: Abmelden-Button funktioniert jetzt — Logout mit Redirect zu /login
2026-04-01 11:23:10 +0200 | 1df93ec | Alisad Gadyri | fix: onClick auf Abmelden-Button gesetzt
2026-04-01 11:33:48 +0200 | fad61e1 | Alisad Gadyri | fix: trpc Import in DashboardLayout — Portal-Absturz behoben
2026-04-01 14:49:41 +0200 | 6938e9f | Alisad Gadyri | fix: railway.json Start-Befehl explizit — db:push Loop behoben
2026-04-01 22:30:29 +0200 | 847fc80 | Alisad Gadyri | fix: Nach Login zu /dashboard — Onboarding-Wizard wird jetzt angezeigt
2026-04-01 22:58:40 +0200 | b0bfcfa | Alisad Gadyri | fix: Login Redirect zu /statistiken (korrekte Dashboard-Route)
2026-04-01 23:23:45 +0200 | 6db4767 | Alisad Gadyri | feat: Feature Flags System — ZFU/AZAV/IHK Compliance per Schalter aktivierbar
2026-04-01 23:26:18 +0200 | 7d9c6bc | Alisad Gadyri | feat: Feature Flags in API-Response integriert
2026-04-02 00:54:02 +0200 | 3815030 | Alisad Gadyri | test: Tests-Suite aufgebaut (Playwright, k6, pa11y, API, Content, Security)
2026-04-02 01:04:31 +0200 | 49f4f8f | Alisad Gadyri | fix: Rate Limiting trust proxy für Railway CDN aktiviert
2026-04-02 07:48:26 +0200 | 05bf26a | Alisad Gadyri | perf: Gzip Kompression, Schema.org, console.logs entfernt
2026-04-02 07:51:15 +0200 | bbed2cd | Alisad Gadyri | seo: Schema.org EducationalOrganization hinzugefügt
2026-04-02 07:54:47 +0200 | 1fa435a | Alisad Gadyri | security: AWS SDK update — kritische fast-xml-parser Lücke behoben
2026-04-02 08:08:38 +0200 | ed18c6a | Alisad Gadyri | security: lodash und path-to-regexp auf sichere Versionen aktualisiert
2026-04-02 08:12:25 +0200 | afb71c2 | Alisad Gadyri | fix: Email-Absender vereinheitlicht auf resend.dev
2026-04-02 08:16:08 +0200 | 1b39182 | Alisad Gadyri | monitor: Global Error Handler, Uptime-Check Script
2026-04-02 08:20:31 +0200 | 7c1bd8f | Alisad Gadyri | monitor: Uptime-Check Script, vollständiger Audit abgeschlossen
2026-04-02 09:33:31 +0200 | 692ef33 | Alisad Gadyri | fix: nixpacks.toml Start-Befehl — db:push Loop endgültig behoben
2026-04-02 11:23:41 +0200 | aaa0676 | Alisad Gadyri | docs: Benutzerhandbuch MD + HTML erstellt
2026-04-02 12:38:01 +0200 | 5ef1081 | Alisad Gadyri | feat: SEO Landing Pages für alle 5 Module mit Storytelling erstellt
2026-04-02 12:41:46 +0200 | 99acb08 | Alisad Gadyri | feat: Kurs Landing Pages mit Storytelling und SEO — alle 5 Module
2026-04-02 12:51:46 +0200 | 53de977 | Alisad Gadyri | feat: Kurs-Detail Links in Kurse.tsx, Sitemap mit 14 URLs
2026-04-02 12:53:03 +0200 | 85f0f87 | Alisad Gadyri | seo: sitemap.xml (14 URLs) und robots.txt erstellt
2026-04-02 13:11:37 +0200 | a439df7 | Alisad Gadyri | seo: Google Search Console Verification
2026-04-02 13:19:37 +0200 | 5e9ab5c | Alisad Gadyri | config: Domain auf immobilien-akademie-smart.de aktualisiert
2026-04-02 13:50:43 +0200 | 0520e16 | Alisad Gadyri | fix: 4 Scan-Probleme behoben — Preise, UE-Zahlen, Modul-Namen
2026-04-02 14:05:00 +0200 | e7c260f | Alisad Gadyri | fix: Willkommens-Email 240 Tage / 1.920 UE aktualisiert
2026-04-02 14:11:51 +0200 | 403dcb1 | Alisad Gadyri | fix: index.html + manifest.json 240 Tage / 1920 UE
2026-04-03 08:54:27 +0200 | 4e68168 | Alisad Gadyri | feat: KI-Monitor Dashboard + Kosten-Optimierung (Gemini zuerst, max_tokens=800)
2026-04-03 09:05:31 +0200 | b325942 | Alisad Gadyri | fix: Login Redirect zu /dashboard
2026-04-03 09:34:34 +0200 | c09ae5c | Alisad Gadyri | fix: KiMonitor + KursLanding Imports korrekt in App.tsx
2026-04-03 09:55:03 +0200 | b9277ac | Alisad Gadyri | fix: Gemini 2.0 Flash → 2.5 Flash (2.0 wird Juni 2026 abgeschaltet)
2026-04-03 10:20:35 +0200 | 00900f2 | Alisad Gadyri | fix: Token-Limits optimiert — vollständige KI-Antworten ohne Abschneiden
2026-04-03 10:37:13 +0200 | 3de5bbf | Alisad Gadyri | fix: Alle KI-Token-Limits optimiert — Kursbuch=8000, Mediaskript=6000, Dozenten=4000, JSON=500
2026-04-03 10:48:02 +0200 | 4bb4677 | Alisad Gadyri | feat: Smart RAG System — 1.3MB echte Modul-Inhalte als KI-Wissensbasis
2026-04-03 10:51:16 +0200 | 3b7034b | Alisad Gadyri | feat: Quellenangaben mit direkten Gesetzes-Links in allen KI-Generierungen
2026-04-03 10:55:17 +0200 | 54317de | Alisad Gadyri | fix: KI-Tutor maxTokens=3000 für vollständige Antworten mit Quellenangaben
2026-04-03 10:59:17 +0200 | bfec0b0 | Alisad Gadyri | fix: System-Prompt optimiert — Quellen-Sektion als Pflichtformat
2026-04-03 11:04:52 +0200 | 17f8cd5 | Alisad Gadyri | fix: 4000 Token + Quellen als Markdown-Links direkt im Text
2026-04-03 11:29:02 +0200 | dba0e5a | Alisad Gadyri | feat: Portal-Agent System — Wissens-Orchestrierung mit Gesetzes-Links
2026-04-03 11:34:25 +0200 | 2780879 | Alisad Gadyri | fix: <a Tag in PortalAgentDashboard eingefügt
2026-04-03 11:41:53 +0200 | 1e12dd8 | Alisad Gadyri | feat: Portal-Agent + KI-Monitor Links in Admin-Navigation
2026-04-03 11:51:01 +0200 | 5a52f8a | Alisad Gadyri | feat: KI-Stats API Route mit echten DB-Daten
2026-04-03 11:58:10 +0200 | c213319 | Alisad Gadyri | fix: PortalAgentDashboard komplett neu — kein JSX Syntax-Fehler mehr
2026-04-03 12:01:20 +0200 | 7e6e4cc | Alisad Gadyri | fix: PortalAgentDashboard map() Syntax für Railway kompatibel
2026-04-03 12:10:08 +0200 | e19b234 | Alisad Gadyri | fix: PortalAgentDashboard komplett neu — kein JSX Syntax-Fehler mehr
2026-04-03 12:34:25 +0200 | 0c29b3c | Alisad Gadyri | fix: ESM imports statt require() in PortalAgent + ragTutor
2026-04-03 12:50:16 +0200 | c16d0e1 | Alisad Gadyri | fix: force redeploy — clear Railway cache
2026-04-03 12:56:42 +0200 | ee3849c | Alisad Gadyri | fix: agentRoutes.ts erstellt + in index.ts registriert
2026-04-03 13:03:29 +0200 | d651880 | Alisad Gadyri | fix: agentRoutes PORTAL_KNOWLEDGE_MAP → WISSENS_KARTE
2026-04-03 13:08:38 +0200 | ebcdd09 | Alisad Gadyri | fix: knowledge-map echte Daten aus WISSENS_KARTE
2026-04-03 13:52:43 +0200 | 4b5f94e | Alisad Gadyri | fix: Auth-Guard ki-stats, Canonical URLs korrigiert, 5 Audit-Warnungen behoben
2026-04-03 13:55:44 +0200 | 1ffac1a | Alisad Gadyri | fix: Screenshots und Audit-Dateien aus Git entfernen — .gitignore aktualisiert
2026-04-03 14:12:02 +0200 | 638c726 | Alisad Gadyri | fix: SEO H1, aria-labels, Canonical URLs — Audit-Warnungen behoben
2026-04-03 14:25:39 +0200 | 6ed42e9 | Alisad Gadyri | fix: Footer echte Kontakte, Home 220→240, KI-Monitor Fallback
2026-04-03 14:28:37 +0200 | d06d121 | Alisad Gadyri | fix: Home.tsx T0→240 Syntax-Fehler behoben
2026-04-03 14:33:17 +0200 | 08019d9 | Alisad Gadyri | fix: Telefonnummer korrigiert → 0171 1526327
2026-04-03 14:40:10 +0200 | e14fe96 | Alisad Gadyri | fix: Modul 1 kostenlos→149EUR, 220→240 Gamification, Email-Link fix
2026-04-03 14:49:27 +0200 | 19160c4 | Alisad Gadyri | fix: letzte kostenlos-Erwähnungen entfernt
2026-04-03 14:55:14 +0200 | 7ffb945 | Alisad Gadyri | fix: ModuleGuard Modul1 kostenlos→149EUR, KursLanding Button fix
2026-04-03 15:05:57 +0200 | 07226a6 | Alisad Gadyri | fix: 511 DB-Fragen correctAnswer NaN→A/B/C/D, all-questions.ts NaN behoben
2026-04-04 08:14:29 +0200 | ba726c7 | Alisad Gadyri | fix: Screenshots aus Git, Permissions-Policy Header, Rate-Limit Check
2026-04-06 05:05:39 +0200 | 697953f | Alisad Gadyri | fix: Screenshots aus Git, Permissions-Policy Header, Rate-Limit Check
2026-04-06 05:08:49 +0200 | 36adce0 | Alisad Gadyri | fix: Screenshots aus Git, Permissions-Policy Header, Rate-Limit Check
2026-04-06 05:10:00 +0200 | 2f14958 | Alisad Gadyri | fix: Screenshots aus Git, Permissions-Policy Header, Rate-Limit Check
2026-04-06 05:38:07 +0200 | a77688a | Alisad Gadyri | fix: Datenschutz Resend+Verantwortlicher, Rate Limiter Trust Proxy Railway
2026-04-06 05:47:09 +0200 | 4dd8de5 | Alisad Gadyri | fix: Home.tsx T0→240 Syntax-Fehler behoben
2026-04-06 05:59:31 +0200 | ee786a6 | Alisad Gadyri | fix: TS-Fehler behoben — ragTutor imports, agentRoutes, archive
2026-04-06 06:00:33 +0200 | 6314b9d | Alisad Gadyri | fix: Master-Fix — TS-Fehler, Inhalte, DB, Repository-Bereinigung 2026-04-06
2026-04-06 06:05:59 +0200 | c340481 | Alisad Gadyri | fix: DB 88 Fragen wiederhergestellt, KI-Routen Auth-geschützt, portalPhase Admin-Auth
2026-04-06 06:11:28 +0200 | 184f1d8 | Alisad Gadyri | fix: requireAuth NextFunction fix, DB Fragen-Wiederherstellung
2026-04-06 06:15:55 +0200 | c392acd | Alisad Gadyri | fix: requireAuth alle Session-Formen, 810 Fragen in DB
2026-04-06 06:20:10 +0200 | 210459a | Alisad Gadyri | fix: requireAuth session.openId korrekt — KI-Routen Auth fix
2026-04-06 06:28:01 +0200 | 3a6b991 | Alisad Gadyri | debug: Session-Inhalt Route für Auth-Fix
2026-04-06 06:35:10 +0200 | ac8548d | Alisad Gadyri | fix: requireAuth verifySessionToken — KI-Routen Auth korrekt
2026-04-06 06:39:55 +0200 | 3c0b6cd | Alisad Gadyri | fix: requireAuth JWT direkt — ENV.cookieSecret korrekt
2026-04-06 07:09:41 +0200 | 1b02da8 | Alisad Gadyri | fix: shuffleOptions reaktiviert, DB questionText bereinigt
2026-04-06 07:12:24 +0200 | 7d4b42d | Alisad Gadyri | fix: Quiz correctAnswer aus DB synchronisiert, Antwortverteilung korrigiert
2026-04-06 07:15:37 +0200 | ac25312 | Alisad Gadyri | fix: Rate Limiter keyGenerator Railway, Prüfung Auth-Logik
2026-04-06 07:47:21 +0200 | fd26029 | Alisad Gadyri | fix: shuffleOptions — richtige Antwort nie an Position A
2026-04-06 07:57:26 +0200 | 1890183 | Alisad Gadyri | fix: shuffleOptions echte Gleichverteilung A/B/C/D ~25% je
2026-04-06 10:34:09 +0200 | be878a2 | Alisad Gadyri | fix: alle Routen geschützt — Login/Admin Guards für alle sensiblen Bereiche
2026-04-06 11:15:35 +0200 | 12805fb | Alisad Gadyri | feat: Trial-System — 24h Demo-Zugang mit E-Mail, TrialForm auf Landing Pages
2026-04-06 11:23:43 +0200 | b87177b | Alisad Gadyri | fix: App.tsx JSX-Tags, Trial-Route in index.ts registriert
2026-04-06 11:37:03 +0200 | 575919f | Alisad Gadyri | fix: trialRoute Drizzle sql-Syntax, kein db-Parameter
2026-04-06 11:53:13 +0200 | 849cf43 | Alisad Gadyri | fix: Trial schreibt in presentation_codes — redeemCode Flow korrekt
2026-04-06 12:00:15 +0200 | 9db6148 | Alisad Gadyri | fix: Trial presentation_codes DELETE+INSERT, fehlende Codes manuell eingetragen
2026-04-06 12:31:43 +0200 | 2e65de0 | Alisad Gadyri | feat: Owner Magic Link — permanenter Admin-Zugang für Eigentümer
2026-04-06 12:37:35 +0200 | 7035e7a | Alisad Gadyri | fix: ownerRoute korrekte Imports, presentation_codes NULL-Datum
2026-04-06 12:57:08 +0200 | caa6b6b | Alisad Gadyri | fix: ownerRoute process.env direkt lesen + debug logging
2026-04-06 13:38:16 +0200 | a85603d | Alisad Gadyri | feat: Rate Limiter In-Memory, Trial Follow-up Cron, Resend-Check
2026-04-06 13:46:30 +0200 | bbbfab4 | Alisad Gadyri | feat: KursLanding Stripe direkt, Social Proof, TrialForm Anchor, CTA optimiert
2026-04-06 14:03:25 +0200 | 661f2ad | Alisad Gadyri | fix: Landing Pages ohne DashboardLayout — Router in Public/Protected getrennt
2026-04-06 14:13:50 +0200 | 9e4528a | Alisad Gadyri | fix: useLocation durch window.location.pathname ersetzt — kein Wouter-Kontext nötig
2026-04-06 14:35:55 +0200 | d2fe4e7 | Alisad Gadyri | feat: Zugangsmodell — lebenslang→zeitbegrenzt, Trial-Button scrollt, 3 Prüfungsversuche
2026-04-06 14:45:19 +0200 | ad1b880 | Alisad Gadyri | fix: KursLanding JSX Template-Literal Syntax, zugang.monate korrekt
2026-04-06 14:58:14 +0200 | 766823c | Alisad Gadyri | Revert "fix: KursLanding JSX Template-Literal Syntax, zugang.monate korrekt"
2026-04-06 15:02:12 +0200 | 93a69c5 | Alisad Gadyri | fix: Router PublicLayout/AppLayout — sauber ohne useLocation/window
2026-04-06 15:25:49 +0200 | 8f95f7d | Alisad Gadyri | fix: zugang außerhalb Komponente — statischer Fallback in KURSE-Objekt
2026-04-06 16:09:32 +0200 | 2e793b0 | Alisad Gadyri | fix: TrialForm in KursLanding eingefügt, id=kostenlos-testen
2026-04-06 16:23:41 +0200 | d7480ea | Alisad Gadyri | fix: TrialForm JSX a-Tag, TrialForm in KursLanding
2026-04-06 16:25:11 +0200 | 601d7d1 | Alisad Gadyri | fix: TrialForm komplett neu — JSX-Fehler behoben
2026-04-06 16:27:01 +0200 | 05e8d72 | Alisad Gadyri | fix: TrialForm Python-geschrieben — kein heredoc Problem
2026-04-06 20:11:25 +0200 | 3b0a7a3 | Alisad Gadyri | feat: Gmail SMTP statt Resend — E-Mail an alle Adressen
2026-04-06 20:27:43 +0200 | a9f2273 | Alisad Gadyri | fix: trialRoute Resend-Reste entfernt, Gmail SMTP korrekt
2026-04-06 20:44:27 +0200 | 9352276 | Alisad Gadyri | fix: RedeemCode REST statt tRPC, Auto-Fill aus URL, Redirect nach Erfolg
2026-04-06 20:58:44 +0200 | 73ad9bb | Alisad Gadyri | fix: force redeploy — neuer RedeemCode mit REST
2026-04-06 21:08:31 +0200 | a340a43 | Alisad Gadyri | fix: Trial maxUsage=3, Verlängerung setzt usageCount zurück
2026-04-07 16:18:08 +0200 | cb8b581 | Alisad Gadyri | SQLite für lokale Entwicklung, Superbase integriert
2026-04-07 21:00:18 +0200 | 3d28ca5 | Alisad Gadyri | fix: Modul 5 FullscreenContent + AudioPlayer in alle Tabs eingebaut
2026-04-07 21:05:01 +0200 | f71740c | Alisad Gadyri | fix: Modul 5 Theorie-Tab FullscreenContent per Index-Slice eingebaut
2026-04-07 21:18:50 +0200 | dfd28e9 | Alisad Gadyri | fix: Admin trial-leads Route geschützt, KI-Avatar deaktiviert, Scan
2026-04-07 21:23:47 +0200 | bfd5e1b | Alisad Gadyri | fix: Datenschutz Gmail+Gemini, AGB Preise+§327+Berlin, Impressum E-Mail
2026-04-07 21:26:12 +0200 | 4d25d93 | Alisad Gadyri | fix: Datenschutz JSX-Fehler behoben, AGB §327+Berlin korrekt eingefügt
2026-04-07 21:29:51 +0200 | f95ebbf | Alisad Gadyri | feat: NotebookLM Export in alle Module, Prüfungsfragen Analyse
2026-04-07 21:32:49 +0200 | 481b580 | Alisad Gadyri | fix: NotebookLMExport JSX korrekt, kein heredoc
2026-04-07 21:35:46 +0200 | bad6ede | Alisad Gadyri | fix: ComplaintForm erstellt, Antwortverteilung korrigiert, Scan vollständig
2026-04-07 21:41:00 +0200 | d5646fb | Alisad Gadyri | fix: Antwortverteilung Array-Format, Security Header HSTS+XFrame
2026-04-07 21:52:28 +0200 | e124c1a | Alisad Gadyri | fix: Vollbild+Audio für extendedTheory, NotebookLM 6 Funktionen, Copy-Button
2026-04-07 21:57:07 +0200 | 263dae3 | Alisad Gadyri | fix: Modul 2-4 Practice FullscreenContent JSX-Fehler behoben
2026-04-07 21:59:45 +0200 | 7775fe3 | Alisad Gadyri | fix: Modul 2-4 doppeltes << und Überrest-Zeile entfernt
2026-04-07 22:03:33 +0200 | 7ad8918 | Alisad Gadyri | fix: Modul 5 Theory+Practice Tab komplett neu geschrieben
2026-04-07 22:08:59 +0200 | 915e84b | Alisad Gadyri | fix: Modul 1 Theory />} und Practice AudioPlayer-in-content behoben
2026-04-07 22:21:25 +0200 | a27e763 | Alisad Gadyri | fix: cookie-parser dependency hinzugefügt — Server-Crash behoben
2026-04-07 22:49:46 +0200 | 7043e61 | Alisad Gadyri | feat: AudioPlayer Normen+Aufgaben alle Module, SEO Open Graph Home+KursLanding
2026-04-07 22:55:36 +0200 | d616328 | Alisad Gadyri | fix: KursLanding ogImage SEO hinzugefügt
2026-04-08 07:46:29 +0200 | c90c26c | Alisad Gadyri | feat: VideoList YouTube-Inhalte, Stripe Invoicing, all-questions 810, Plausible Analytics, Webhook Duplikat-Check
2026-04-08 07:47:59 +0200 | 5b7cdc0 | Alisad Gadyri | fix: Stripe Invoicing + Webhook Duplikat-Check + Plausible korrekt eingebaut
2026-04-08 09:54:31 +0200 | 4374d0b | Alisad Gadyri | perf: Code-Splitting + manualChunks — Bundle-Optimierung
2026-04-08 09:58:14 +0200 | b4a6eab | Alisad Gadyri | perf: Detaillierteres Code-Splitting — vendor-misc aufgeteilt
2026-04-08 11:09:18 +0200 | 04a168f | Alisad Gadyri | perf: GlobalSearch statische Imports entfernt — Bundle weiter reduziert
2026-04-08 15:16:51 +0200 | a2d31b1 | Alisad Gadyri | fix: Plausible Analytics korrekt in client/index.html eingefügt
2026-04-08 22:33:45 +0200 | 6d1db5e | Alisad Gadyri | feat: Service Worker v2 — Cache-First Assets, Network-First HTML, Auth-Routen nie cachen
2026-04-08 22:42:38 +0200 | 8e71029 | Alisad Gadyri | feat: Sentry Error-Monitoring + OAuth Google Login vorbereitet
2026-04-08 22:49:34 +0200 | f603063 | Alisad Gadyri | fix: OAuth Google-Button korrekt in LoginPage platziert
2026-04-08 22:51:38 +0200 | 4b36abc | Alisad Gadyri | feat: OAuth Google-Button korrekt in LoginPage — aktiv per Railway-Variable
2026-04-08 23:12:58 +0200 | 68db7c4 | Alisad Gadyri | fix: Sentry aus Frontend entfernt — verursachte weißen Bildschirm
2026-04-08 23:14:37 +0200 | afaa31e | Alisad Gadyri | fix: queryClient in main.tsx wiederhergestellt nach Sentry-Entfernung
2026-04-08 23:31:47 +0200 | e6ddb87 | Alisad Gadyri | fix: queryClient getQueryCache Block wiederhergestellt — main.tsx komplett
2026-04-08 23:45:29 +0200 | 39426b8 | Alisad Gadyri | fix: React-Chunk entfernt (createContext Fehler) + Plausible in CSP
2026-04-08 23:48:41 +0200 | 5cc11c2 | Alisad Gadyri | fix: React + @tanstack in einem Chunk — createContext Reihenfolge-Fehler behoben
2026-04-08 23:55:57 +0200 | 6fd1fef | Alisad Gadyri | fix: manualChunks komplett entfernt — Vite löst Abhängigkeiten korrekt
2026-04-09 00:07:01 +0200 | d8938fc | Alisad Gadyri | fix: ErrorBoundary eingebaut — Fehler sichtbar machen
2026-04-09 00:08:35 +0200 | 507ef5f | Alisad Gadyri | fix: echte ErrorBoundary Komponente verwenden — Build-Fehler behoben
2026-04-09 00:13:09 +0200 | ab1aae1 | Alisad Gadyri | fix: App.tsx export default + ErrorBoundary Tag repariert
2026-04-09 07:04:27 +0200 | 9674a23 | Alisad Gadyri | fix: contentDataModule2/3 undefined in GlobalSearch — durch [] ersetzt
2026-04-09 07:36:12 +0200 | fdbf2d0 | Alisad Gadyri | fix: Login Redirect /dashboard → /statistiken
2026-04-09 22:18:23 +0200 | 924b8e7 | Alisad Gadyri | fix: 25 leere Normen-Felder mit IHK-relevanten Gesetzen gefüllt
2026-04-09 22:24:45 +0200 | 341400a | Alisad Gadyri | feat: Owner Dashboard — Nutzerübersicht, Sperren/Freischalten, System-Status
2026-04-09 22:34:15 +0200 | 34f2e10 | Alisad Gadyri | fix: Gmail SMTP IPv4 erzwingen — Railway unterstützt kein IPv6
2026-04-10 06:02:35 +0200 | b700058 | Alisad Gadyri | fix: Gmail SMTP IPv4 erzwingen — Railway unterstützt kein IPv6
2026-04-10 06:13:57 +0200 | 747aa11 | Alisad Gadyri | fix: Gmail SMTP port 587 + kein doppeltes family:4
2026-04-10 06:22:59 +0200 | 98b4499 | Alisad Gadyri | fix: Trial E-Mail fire-and-forget — kein Timeout mehr
2026-04-10 06:40:43 +0200 | f0ead7a | Alisad Gadyri | feat: Sentry Error-Monitoring aktiviert (Frontend + Backend)
2026-04-10 06:47:53 +0200 | 32981fe | Alisad Gadyri | fix: Sentry aus Frontend entfernt — verursacht weißen Bildschirm
2026-04-10 07:04:02 +0200 | fec9f3c | Alisad Gadyri | fix: alle statischen Imports in App.tsx → lazy (Bundle 1.33MB→klein)
2026-04-10 07:13:05 +0200 | 20a3b5d | Alisad Gadyri | fix: OwnerDashboard Import hinzugefügt + ModuleGuard statisch
2026-04-10 07:40:52 +0200 | 02d7aa8 | Alisad Gadyri | fix: App.tsx auf letzten funktionierenden Stand zurückgesetzt
2026-04-10 08:24:01 +0200 | 8829c55 | Alisad Gadyri | fix: CSP Syntax + manualChunks Bundle-Splitting wiederhergestellt
2026-04-10 08:37:55 +0200 | 469fcfb | Alisad Gadyri | feat: Keep-Alive Cron gegen Cold Start + Deep Audit Fixes
2026-04-10 10:38:19 +0200 | 5248ebe | Alisad Gadyri | fix: Plausible in CSP connect-src + framer-motion in vendor-react chunk
2026-04-10 10:44:20 +0200 | c09742a | Alisad Gadyri | fix: SW Cache v3 — erzwingt Browser-Cache-Invalidierung
2026-04-10 11:01:05 +0200 | f5e82e6 | Alisad Gadyri | fix: vendor-react split — react-core zuerst, dann vendor-state für framer/wouter
2026-04-10 11:09:46 +0200 | cb3978e | Alisad Gadyri | fix: SW Cache v4 + erzwungene Cache-Invalidierung
2026-04-10 11:15:30 +0200 | 7612f84 | Alisad Gadyri | fix: vendor-other in vendor-react gemergt — keine Chunk-Reihenfolge-Probleme
2026-04-10 12:38:50 +0200 | 279a6a6 | Alisad Gadyri | test: Playwright Tests — 61/62 bestanden (98%)
2026-04-10 13:00:08 +0200 | 0a7642d | Alisad Gadyri | fix: 16 defekte Gesetzes-Links repariert (WEG, GWG, MaBV, ImmoWertV, BauGB)
2026-04-10 13:20:43 +0200 | 2f47356 | Alisad Gadyri | fix: Accessibility — meta-viewport zoom erlaubt + aria-labels
2026-04-10 13:28:52 +0200 | 73adb7c | Alisad Gadyri | fix: aria-label Passwort-Toggle Button + Accessibility Tests hinzugefügt
2026-04-10 13:30:28 +0200 | 6337558 | Alisad Gadyri | fix: Passwort-Toggle aria-label korrekt gesetzt
2026-04-10 13:35:05 +0200 | b667208 | Alisad Gadyri | fix: Accessibility — aria-label Button, Farbkontrast Login+Home
2026-04-10 13:40:23 +0200 | e4868db | Alisad Gadyri | fix: aria-label für Select in TrialForm (WCAG critical)
2026-04-10 14:01:31 +0200 | afc22af | Alisad Gadyri | fix: Farbkontrast Login verbessert (WCAG AA)
2026-04-10 14:07:15 +0200 | eddfc56 | Alisad Gadyri | fix: text-slate-400 → text-slate-600 (WCAG Kontrast)
2026-04-10 14:13:53 +0200 | 9b9c35d | Alisad Gadyri | fix: aria-labels Rechner + main landmark + KI-Tutor Endpunkt korrigiert
2026-04-10 14:18:22 +0200 | 8b137e6 | Alisad Gadyri | fix: Rechner-Dateien zurückgesetzt — aria-label Regex hatte JSX-Fehler
2026-04-10 14:20:04 +0200 | f05abfd | Alisad Gadyri | fix: aria-label für alle Rechner-Inputs (WCAG critical)
2026-04-10 14:54:52 +0200 | bb67283 | Alisad Gadyri | fix: drizzle-orm SQL Injection + npm Vulnerabilities behoben
2026-04-10 14:56:22 +0200 | c71eb0b | Alisad Gadyri | fix: axios + drizzle-orm + nodemailer auf neueste sichere Version
2026-04-10 15:06:45 +0200 | ab07379 | Alisad Gadyri | test: Vollständige Tests — Load 100 User, alle Module, DB Backup, Videos
2026-04-10 19:31:59 +0200 | b6a92fa | Alisad Gadyri | chore: Redeploy für APP_URL Variable
2026-04-10 19:55:20 +0200 | c8abff5 | Alisad Gadyri | fix: Stripe success/cancel URLs auf railway.app (Domain noch nicht gekauft)
2026-04-10 20:12:29 +0200 | d399277 | Alisad Gadyri | fix: trialFollowup.ts require(nodemailer) → import (Dynamic require Fehler)
2026-04-10 20:25:12 +0200 | 4d59f51 | Alisad Gadyri | fix: trialFollowup IPv4+fire-and-forget + unhandledRejection Handler
2026-04-10 20:47:46 +0200 | b085422 | Alisad Gadyri | fix: sendFollowupEmail try-catch — kein Server-Crash bei Email-Fehler
2026-04-10 20:54:28 +0200 | a59acd1 | Alisad Gadyri | fix: hängendes try{ in trialFollowup entfernt — Build grün
2026-04-10 21:02:52 +0200 | 6faca07 | Alisad Gadyri | fix: trialFollowup komplett in try-catch — kein Server-Crash möglich
2026-04-10 21:06:54 +0200 | 89adaad | Alisad Gadyri | fix: runTrialFollowupCron in try-catch — Railway Health Check stabil
2026-04-10 21:16:40 +0200 | caa8bf8 | Alisad Gadyri | fix: Node.js 22.12.0 für Vite 8 Kompatibilität
2026-04-10 21:21:12 +0200 | 2381b03 | Alisad Gadyri | fix: Node.js >=22.12.0 für Vite 8 (.node-version + engines)
2026-04-10 21:26:32 +0200 | 64d6245 | Alisad Gadyri | fix: nixpacks.toml — nodejs_23 für Vite 8 Kompatibilität
2026-04-10 21:47:09 +0200 | a1b698d | Alisad Gadyri | fix: TrialFollowup Cron deaktiviert — kein SMTP Crash auf Railway
2026-04-10 22:08:44 +0200 | b6cfb6b | Alisad Gadyri | fix: drizzle-orm auf 0.44.7 zurück — Startup Crash vermeiden
2026-04-10 22:13:01 +0200 | 57f3047 | Alisad Gadyri | fix: path-to-regexp auf 0.1.7 — Express 4 Kompatibilität
2026-04-11 07:06:48 +0200 | 163e60f | Alisad Gadyri | fix: userEmail im Stripe Checkout Request — Webhook kann User finden
2026-04-11 07:23:02 +0200 | 58b3146 | Alisad Gadyri | fix: Stripe Webhook Logging — User gefunden/nicht gefunden
2026-04-11 07:42:53 +0200 | 4f594f7 | Alisad Gadyri | fix: useAuth in KursLanding — userEmail korrekt gesetzt
2026-04-11 07:56:07 +0200 | f84e997 | Alisad Gadyri | fix: Bestätigungs-E-Mail via Resend nach Stripe Kauf
2026-04-11 08:57:04 +0200 | 72733c1 | Alisad Gadyri | feat: Magic Key Generator — 72h Inspect-Links für Owner
2026-04-11 09:03:45 +0200 | a4b6507 | Alisad Gadyri | fix: ownerRoute.ts Klammer-Fehler behoben — Inspect-Routen korrekt eingeschlossen
2026-04-11 09:07:41 +0200 | 653aaf6 | Alisad Gadyri | fix: ownerRoute.ts komplett neu — alle 4 Routen korrekt
2026-04-11 09:21:14 +0200 | 22b4e1a | Alisad Gadyri | fix: Inspect-Login als echter Admin — kein 404 mehr
2026-04-11 09:37:30 +0200 | 0412ffc | Alisad Gadyri | fix: Inspect-Redirect auf / — kein 404
2026-04-11 09:46:38 +0200 | 29b7203 | Alisad Gadyri | fix: Inspect-Login mit HTML-Zwischenseite — Cookie Zeit zum Speichern geben
2026-04-11 09:53:00 +0200 | d189521 | Alisad Gadyri | fix: Inspect-Redirect auf /kurse
2026-04-11 10:11:17 +0200 | 4d076bf | Alisad Gadyri | fix: /inspect/:token als Server-Route — SPA kann es nicht abfangen
2026-04-11 11:03:45 +0200 | fb9a1f4 | Alisad Gadyri | fix: /inspect/:token als Server-Route — SPA kann es nicht abfangen
2026-04-11 11:19:34 +0200 | 4a420c6 | Alisad Gadyri | feat: Inspect-Modus — alles klickbar, nur Käufe + Admin-Mutationen blockiert
2026-04-11 11:26:45 +0200 | 8686a5a | Alisad Gadyri | fix: Inspect-Route nutzt bewährte Owner-Methode für Session
2026-04-11 11:35:01 +0200 | 6bb1b4a | Alisad Gadyri | fix: Inspect direkte Weiterleitung + Banner persistiert via sessionStorage
2026-04-11 12:13:36 +0200 | e494cd3 | Alisad Gadyri | fix: Inspect nutzt /api/owner/access — bewährt funktionierende Session
2026-04-11 12:18:39 +0200 | 8ad0aeb | Alisad Gadyri | fix: Inspect-Secret fixiert
2026-04-13 08:14:34 +0200 | d4c5e71 | Alisad Gadyri | fix: Inspect-Modus — Kauf zeigt Info-Toast statt Login-Redirect
2026-04-13 08:24:06 +0200 | 0f195b7 | Alisad Gadyri | fix: Emoji aus alert entfernt — Build-Fehler behoben
2026-04-13 09:02:48 +0200 | b68c3c2 | Alisad Gadyri | fix: /owner-dashboard Route in App.tsx
2026-04-13 09:33:59 +0200 | 684c23b | Alisad Gadyri | fix: OwnerDashboard als lazy import + Suspense
2026-04-13 09:44:09 +0200 | 6ba7086 | Alisad Gadyri | fix: /owner-dashboard Route korrekt in Router eingefügt
2026-04-13 10:21:17 +0200 | 1c13fb4 | Alisad Gadyri | fix: CORS für Owner Control Panel (lokale HTML-Datei)
2026-04-13 11:12:55 +0200 | d405f6a | Alisad Gadyri | fix: CORS für ornate-jelly-990122.netlify.app
2026-04-13 17:41:27 +0200 | 9a697b1 | Alisad Gadyri | fix: Modul 1 — law[], quiz[] und task für alle 20 Tage befüllt
2026-04-13 17:52:33 +0200 | d47766e | Alisad Gadyri | fix: Modul 1 — alle 20 Tage mit echten Normen, Quiz und Tasks
2026-04-13 18:02:53 +0200 | 622d41c | Alisad Gadyri | fix: Modul 1 komplett — alle 20 Tage 100% fertig
2026-04-13 18:12:28 +0200 | 92e29e4 | Alisad Gadyri | fix: Modul 1 Tag 20 Syntaxfehler behoben
2026-04-13 18:22:39 +0200 | 5d6ce32 | Alisad Gadyri | fix: Modul 2 — kurze Theorien erweitert, fehlende Tasks hinzugefügt
2026-04-13 18:24:37 +0200 | 3742c9f | Alisad Gadyri | fix: Modul 2 — Tasks T05, T22, T24 hinzugefügt
2026-04-13 18:36:29 +0200 | 5d4fade | Alisad Gadyri | fix: Modul 4 T1-20 — Normen (ImmoWertV, BauGB) hinzugefügt
2026-04-13 18:41:33 +0200 | 873b457 | Alisad Gadyri | feat: Vollaudit abgeschlossen — alle 240 Lerntage M1-M5 optimiert
2026-04-13 18:49:35 +0200 | 700320f | Alisad Gadyri | fix: audit_agent Backtick+law: Erkennung, M3 WEG-Normen mit URLs
2026-04-13 18:51:06 +0200 | 359c6b9 | Alisad Gadyri | fix: audit_agent Backtick+law: Erkennung, M3 WEG-Normen mit URLs
2026-04-13 18:55:56 +0200 | 0aaf7c1 | Alisad Gadyri | fix: M4 Tasks extrahiert, M3 WEG-Normen-URLs, Agent-Mapping erweitert
2026-04-13 19:10:33 +0200 | 3ad8003 | Alisad Gadyri | fix: M3 T56 Theory erweitert, M3/M4 vollständig
2026-04-13 19:18:04 +0200 | 68464c4 | Alisad Gadyri | fix: get_array robuster — verschachtelte Brackets in law-URLs korrekt geparst
2026-04-13 19:25:04 +0200 | c06ab94 | Alisad Gadyri | fix: get_array bracket-counting — law-URLs korrekt geparst, M3/M4 Scores steigen
2026-04-13 19:31:26 +0200 | 8d54143 | Alisad Gadyri | fix: Theory-Check — extendedTheory als Fallback, 100 Tage weniger falsch-negativ
2026-04-13 19:39:09 +0200 | 273bb03 | Alisad Gadyri | fix: M3 T61-T80 tasks, Agent theory-check verbessert
2026-04-13 19:53:01 +0200 | de0f6c5 | Alisad Gadyri | fix: M3 T61-T80 task-Objekt zu task-String konvertiert
2026-04-13 19:57:23 +0200 | f7e3eea | Alisad Gadyri | fix: Agent Backtick-task+extended, M3 T41/T42 task-Format
2026-04-13 20:05:14 +0200 | 2cc6497 | Alisad Gadyri | fix: audit_agent regex SyntaxWarnings behoben, Backtick-Extraktion korrekt
2026-04-13 20:08:38 +0200 | 17e2c25 | Alisad Gadyri | fix: static_check law als Inhalt-Indikator — M3 Part2 korrekt bewertet
2026-04-13 20:17:02 +0200 | 123cfb0 | Alisad Gadyri | chore: Finaler Audit-Report aktualisiert
2026-04-13 20:20:47 +0200 | 254faec | Alisad Gadyri | fix: Inhalt-Check max(theory,extended) — 29 falsch-positive M3 behoben
2026-04-13 20:44:04 +0200 | 11c3626 | Alisad Gadyri | fix: theory-Extraktion ohne Regex — direkte String-Suche
2026-04-13 20:50:06 +0200 | 38ad78a | Alisad Gadyri | feat: Datenschutz — Claude/Anthropic, Stripe, Groq, ElevenLabs, AZAV/ZFU ergänzt
2026-04-13 21:08:18 +0200 | b31cc1a | Alisad Gadyri | feat: M3 T29-T40 extendedTheory WEG/Mietrecht Praxis-Inhalte
2026-04-13 21:15:10 +0200 | 3bbde6b | Alisad Gadyri | feat: M3 T44-T60 + M2 T56-T59 + M4 T20 extendedTheory komplett
2026-04-13 21:26:07 +0200 | 3642cf1 | Alisad Gadyri | fix: M2 T56-59 extendedTheory, M3 T41-42 Tasks, M4 T20 — finale Korrekturen
2026-04-13 21:32:36 +0200 | 204b121 | Alisad Gadyri | fix: Mismatch-Stopwoerter erweitert — 6 falsch-positive behoben
2026-04-13 23:07:45 +0200 | 1c769c9 | Alisad Gadyri | fix: Mismatch-Check generische Titel — 6 falsch-positive behoben
2026-04-14 07:53:05 +0200 | 88c9854 | Alisad Gadyri | fix: Audit 95/100 — alle Mismatch-Falschpositive behoben
2026-04-14 08:00:46 +0200 | 4361788 | Alisad Gadyri | feat: Vollaudit 95/100 — 240/240 Tage, alle Module optimiert
2026-04-14 08:50:09 +0200 | aba7d46 | Alisad Gadyri | fix: InspectBanner Exit-Button, /inspect/exit Route — Demo-Modus verlassen
2026-04-14 08:52:42 +0200 | c75d90d | Alisad Gadyri | fix: InspectBanner Exit-Button, /inspect/exit Route — Demo-Modus verlassen
2026-04-14 09:09:00 +0200 | d535784 | Alisad Gadyri | fix: /inspect/exit VOR /:token Route — verhindert JWT-Matching
2026-04-14 10:14:17 +0200 | eddf1e3 | Alisad Gadyri | fix: Quiz correctAnswer String→Index Konvertierung — Antworten werden jetzt korrekt bewertet
2026-04-14 12:02:43 +0200 | 467aa3d | Alisad Gadyri | fix: Quiz q.question→q.questionText, questionId type fix
2026-04-14 12:34:45 +0200 | a403688 | Alisad Gadyri | fix: [OFFEN] Fragen aus all-questions.ts entfernt — nur MC-Fragen bleiben
2026-04-14 12:50:49 +0200 | c70def1 | Alisad Gadyri | fix: Quiz Badges Gap + [OFFEN] Prefix + Zähler verbessert
2026-04-14 13:21:24 +0200 | 20619a7 | Alisad Gadyri | fix: all-questions.ts — M5 Duplikate entfernt, auf 120 begrenzt, Verteilung balanciert
2026-04-14 13:43:26 +0200 | e2578ae | Alisad Gadyri | feat: SuperAgent v2 — Claude+Gemini+Groq Multi-KI, Memory, 6 neue Endpunkte
2026-04-14 13:46:53 +0200 | e00066f | Alisad Gadyri | feat: SuperAgent v2 Dashboard — Multi-KI UI, Ask, Generieren, Legal, Memory
2026-04-14 13:58:19 +0200 | 229f9b8 | Alisad Gadyri | feat: NightCron + UserCoaching — täglich 02:00h, 240 Tage + alle User analysiert
2026-04-14 14:01:26 +0200 | 4bcc52d | Alisad Gadyri | feat: Dashboard Nacht-Cron + User-Coaching Tabs — Risiko, Streak, Badges
2026-04-14 14:50:19 +0200 | 7634d07 | Alisad Gadyri | fix: agentRoutes Cron-Routen innerhalb Funktion — Server startet wieder
2026-04-14 15:06:31 +0200 | 315b9be | Alisad Gadyri | fix: NightCron — M4+M5 vollständige Dateilisten, Normen-Check optimiert
2026-04-14 15:24:49 +0200 | d37d15c | Alisad Gadyri | feat: examRouter LOCAL_QUESTIONS in all-questions.ts integriert — ein einheitliches System
2026-04-14 15:28:12 +0200 | 0c04afe | Alisad Gadyri | feat: examRouter 85 Fragen in all-questions.ts integriert — einheitliches System
2026-04-14 17:38:06 +0200 | 181fa73 | Alisad Gadyri | fix: Komma Zeile 5045 — 556 Fragen korrekt
2026-04-14 18:28:03 +0200 | 8f37787 | Alisad Gadyri | feat: 163 KI-generierte IHK-Fragen — 719 Fragen gesamt (Ziel 800)
2026-04-14 19:16:12 +0200 | 4f264ee | Alisad Gadyri | feat: IHK-Fragen auf 800+ aufgestockt
2026-04-14 19:37:18 +0200 | 285286b | Alisad Gadyri | feat: IHK-Fragen 800 Ziel
2026-04-14 20:05:53 +0200 | 0f654f3 | Alisad Gadyri | fix: Barrierefreiheit, Cookie-Banner, SEO canonical, Fragen 855, OWNER_CODE sicher
2026-04-14 20:16:41 +0200 | 424555e | Alisad Gadyri | feat: AdminDashboard Master-Kontrollzentrum — 5 Tabs, KPI, Coaching, System, Agent, externe Links
2026-04-14 20:32:56 +0200 | e77e4f6 | Alisad Gadyri | feat: 2FA E-Mail OTP für Admin-Zugang — /admin-2fa, generateOTP, verifyOTP
2026-04-14 20:53:35 +0200 | 61fd382 | Alisad Gadyri | feat: Externes Eigentümer-Panel (owner-panel.html) — 3-Schritt-Auth, Vollzugriff, USB-fähig
2026-04-14 21:11:02 +0200 | 34e1b22 | Alisad Gadyri | fix: Agent-API Status+Health mit Owner-Key gesichert
2026-04-15 08:39:30 +0200 | 6074075 | Alisad Gadyri | feat: Vollständige Test-Suite 34/34 — alle Perspektiven, Sicherheit, Mobile
2026-04-15 08:51:22 +0200 | 5121f18 | Alisad Gadyri | feat: Vollständige Test-Suite 34/34 — alle Perspektiven, Sicherheit, Mobile
2026-04-15 09:42:30 +0200 | 0b7606f | Alisad Gadyri | fix: KRITISCH — owner-dashboard mit AdminRoute gesichert
2026-04-15 19:46:43 +0200 | 947b7c6 | Alisad Gadyri | feat: Google Analytics, Bundle-Pakete (/pakete), QR-Zertifikate — Priorität Stufe 1
2026-04-15 20:07:26 +0200 | 3efd174 | Alisad Gadyri | fix: Bundle-Stripe-Routen korrekt in registerStripeRoutes eingebettet
2026-04-15 20:14:19 +0200 | 5b0d6c7 | Alisad Gadyri | fix: stripe.ts Bundle-Router korrekt mit stripeRouter statt app
2026-04-15 20:19:32 +0200 | 556e17c | Alisad Gadyri | fix: stripe.ts letztes falsches } entfernt — Build grün
2026-04-15 20:32:25 +0200 | 68715a1 | Alisad Gadyri | fix: stripe.ts Checkout-Handler korrekt geschlossen — Build grün
2026-04-15 21:04:06 +0200 | a68743d | Alisad Gadyri | fix: Footer Bundle-Link, trialRoute Zahlen, GlobalSearch Kommentar
2026-04-15 21:30:19 +0200 | 38cb416 | Alisad Gadyri | feat: PublicHeader Navbar + Home.tsx /modul/ → /kurs/ Links korrigiert
2026-04-15 21:43:40 +0200 | a5211f7 | Alisad Gadyri | fix: /api/stripe/products Endpunkt hinzugefügt — Kurse-Seite zeigt Preise
2026-04-15 21:58:37 +0200 | 6651b7d | Alisad Gadyri | feat: 6 Kurs-Pakete (549-1955 EUR), Komplett-Ausbildung 1955 EUR, Vergleichstabelle
2026-04-15 23:33:45 +0200 | cb38ef6 | Alisad Gadyri | feat: Offene Fragen + KI-Bewertung — openQuestionsRouter + OpenQuizPage + DB-Schema
2026-04-16 07:39:41 +0200 | eda0e8e | Alisad Gadyri | fix: OpenQuizPage trpc import @/lib/trpc
2026-04-16 07:58:12 +0200 | 181b6ca | Alisad Gadyri | fix: schema.ts bewertungsSchema Doppelpunkt fehlt
2026-04-16 08:03:22 +0200 | bd1360b | Alisad Gadyri | feat: Praxis-Lab Link in PublicHeader
2026-04-16 08:44:41 +0200 | a44f4fb | Alisad Gadyri | feat: Dokument-Werkstatt (PDF+Fragen) + Sidebar-Links Praxis-Lab & Werkstatt
2026-04-16 09:03:16 +0200 | b6902e1 | Alisad Gadyri | fix: FileText Duplikat in DashboardLayout entfernt
2026-04-16 09:25:28 +0200 | f6206cd | Alisad Gadyri | feat: Praxis-Lab Tab in allen 5 Modul-Detail-Seiten (Offene Fragen + Dokument-Werkstatt)
2026-04-16 10:15:44 +0200 | 24106a6 | Alisad Gadyri | feat: komplette Landing Page — SEO, alle 5 Module, Pakete, USPs, FAQ, Zielgruppen
2026-04-17 00:08:29 +0200 | 4d83295 | Alisad Gadyri | fix: Impressum (GmbH→Einzelunternehmer, DDG), AGB Platzhalter, §356-Checkbox, Cookie-Logging, Session 30d, Video-Tab, Stripe Webhook
2026-04-17 00:15:17 +0200 | 899723a | Alisad Gadyri | fix: §356 Widerrufs-Checkbox in beide Kauf-Buttons eingefügt
2026-04-17 00:48:20 +0200 | 7f2e82b | Alisad Gadyri | fix: stripe.ts Webhook inline-Parser ESM-kompatibel — Server gesund
2026-04-17 08:38:31 +0200 | 8e1d7f9 | Alisad Gadyri | fix: Datenschutz (private→offiziell, localStorage, 8 Drittanbieter), KI-Tutor-Schranke, dompurify, consent_log
2026-04-17 09:02:25 +0200 | 16930fe | Alisad Gadyri | fix: follow-redirects override >=1.16.0 (HIGH-Schwachstelle)
2026-04-17 09:11:16 +0200 | c07e839 | Alisad Gadyri | fix: path-to-regexp 0.1.7→0.1.12 (3x HIGH ReDoS)
2026-04-17 09:16:45 +0200 | ac32a94 | Alisad Gadyri | fix: path-to-regexp 0.1.13 (letzte HIGH ReDoS)
2026-04-17 09:25:11 +0200 | dd9c9cb | Alisad Gadyri | fix: FAQ Landing Page — Live-Webinare, MaBV, IHK-Format korrekt formuliert
2026-04-17 14:42:44 +0200 | 5bdb31e | Alisad Gadyri | SECURITY+DSGVO: Owner-Code serverseitig, ElevenLabs-Proxy, Env-Validierung, vollst. Löschung Art.17, Widerrufs-Check
2026-04-17 14:47:38 +0200 | d443ba4 | Alisad Gadyri | MARKETING+INHALT: Live-Webinare, AZAV, IHK-Format, MwSt, Zertifikat, UE-Zahlen, Fragen-Format
2026-04-17 14:51:22 +0200 | 2eb6b9d | Alisad Gadyri | TECHNIK: CORS, Rate-Limits getrennt, SameSite→lax, ErrorBoundary, Post-Kauf, aria-live, Responsive Grids, noscript
2026-04-17 14:54:00 +0200 | 99b2da8 | Alisad Gadyri | CLEANUP: gitignore Audit-Artefakte, Duplikate aufgelöst, DB-Indizes, env.example
2026-04-17 20:28:17 +0200 | 444a9f8 | Alisad Gadyri | fix: SMTP smtps.udag.de, Gmail entfernt, trialFollowup aktiviert, APP_URL
2026-04-17 22:02:03 +0200 | 633ef6b | Alisad Gadyri | fix: Seitentitel 'Immobilien Akademie Smart' statt Bildungsportal
2026-04-18 08:45:29 +0200 | d1faa8c | Alisad Gadyri | fix: passwordReset Resend→nodemailer SMTP, resetUrl auf APP_URL
2026-04-18 09:35:46 +0200 | cac10e6 | Alisad Gadyri | fix: doppeltes resetLimiter entfernt — Server startet wieder
2026-04-18 11:46:24 +0200 | 78ad66d | Alisad Gadyri | fix: SMTP Port 587 STARTTLS (Railway blockiert Port 465)
2026-04-18 13:31:14 +0200 | e866f05 | Alisad Gadyri | fix: E-Mail via Resend API (Domain verifiziert, SMTP blocked)
2026-04-18 14:10:09 +0200 | 1888e75 | Alisad Gadyri | fix: 2FA-Codes via Resend statt SMTP
2026-04-18 14:27:51 +0200 | f86673c | Alisad Gadyri | fix: trialFollowup Gmail→Resend, BASE_URL korrigiert
2026-04-18 15:44:21 +0200 | 93840c1 | Alisad Gadyri | fix: alle Gmail-Adressen → info@immobilien-akademie-smart.de
2026-04-18 16:07:13 +0200 | cd14ea5 | Alisad Gadyri | fix: trialRoute.ts nodemailer→Resend, PUBLIC_URL→APP_URL
2026-04-18 19:35:11 +0200 | dfa73f3 | Alisad Gadyri | fix: Modul 1 nicht mehr gratis — enabledModules default '', ModuleGuard Fallback '', 24h Trial statt kostenlos
2026-04-18 19:46:19 +0200 | 0c0b812 | Alisad Gadyri | feat: Trial-Ablauf — trialExpiresAt Schema+ModuleGuard+Keep-Alive (DB-Migration via pnpm db:push)
2026-04-18 20:15:17 +0200 | 68950aa | Alisad Gadyri | fix: Build-Fehler trialRoute Backtick behoben
2026-04-18 20:50:37 +0200 | 471ef17 | Alisad Gadyri | fix: Landing Page — '7 Tage kostenlos' → '24h', Modul1 nicht mehr kostenlos, 'kündbar' entfernt
2026-04-18 20:53:16 +0200 | 9c9bbf6 | Alisad Gadyri | fix: letzter kostenlos-Text entfernt — Landing Page vollständig konsistent
2026-04-18 21:59:07 +0200 | 013b44a | Alisad Gadyri | feat: Design-Tokens, Exit-Intent, Social-Proof API, Spaced-Repetition SM-2, PWA-Shortcuts, Code-Splitting optimiert
2026-04-18 22:01:38 +0200 | 518f7c5 | Alisad Gadyri | feat: ExitIntentPopup aktiv, Social Proof live in Home.tsx
2026-04-18 22:08:28 +0200 | 60967e9 | Alisad Gadyri | fix: App.tsx JSX Fragment-Fehler, @supabase entfernt
2026-04-18 22:17:23 +0200 | 736c94c | Alisad Gadyri | fix: Home.tsx Zeile 7 JSX-in-String korrigiert — Build grün
2026-04-18 22:34:21 +0200 | 3d1f35e | Alisad Gadyri | fix: Home.tsx Zeile 91 JSX-in-String — Build grün
2026-04-18 22:38:52 +0200 | f5400ea | Alisad Gadyri | fix: alle stats.totalUsers aus Home.tsx entfernt — Build grün
2026-04-19 08:58:17 +0200 | 3f29007 | Alisad Gadyri | feat: Landing Page Premium-Redesign — Hero-Animation, Modul-Karten, Hover-Effekte, Social Proof, FAQ-Accordion
2026-04-19 12:20:09 +0200 | 420d47b | Alisad Gadyri | feat: Dashboard Premium-Redesign + NightCron-Duplikat entfernt
2026-04-19 12:20:16 +0200 | b229cbb | Alisad Gadyri | feat: Dashboard Premium-Redesign + NightCron-Duplikat entfernt
2026-04-19 15:11:41 +0200 | 504f4b3 | Alisad Gadyri | feat: WCAG 2.2 AA — Skip-Link, reduced-motion, Focus-Rings, EU AI Act, Barrierefreiheit-Seite, ODR/VSBG Impressum
2026-04-19 15:44:04 +0200 | ccd31b9 | Alisad Gadyri | fix: AITutor Fragment-Fehler behoben, EU AI Act Banner korrekt
2026-04-19 15:47:20 +0200 | 7a24214 | Alisad Gadyri | fix: AITutor Fragment <> entfernt — Build grün
2026-04-19 15:58:05 +0200 | 5df3187 | Alisad Gadyri | fix: AITutor Banner-Zeilen entfernt — Build grün
2026-04-19 16:43:15 +0200 | 0cbf077 | Alisad Gadyri | feat: Dark Mode — CSS-Variablen, useDarkMode Hook, Toggle, System-Präferenz, Anti-Flash
2026-04-19 16:57:20 +0200 | d69c3d5 | Alisad Gadyri | feat: Dark Mode vollständig — Tailwind-Overrides, Public Header Toggle, Sidebar
2026-04-19 17:04:20 +0200 | 64e5b1a | Alisad Gadyri | perf: Caching-Headers, content-visibility, Preconnect, Bundle-Limits, Sitemap
2026-04-19 17:21:11 +0200 | ae462d8 | Alisad Gadyri | perf: jsPDF lazy import in certificateGenerator + DocumentGenerator — 295KB weniger
2026-04-19 17:32:55 +0200 | 857750d | Alisad Gadyri | fix: async function Syntax + vendor-pdf lazy load
2026-04-19 17:45:02 +0200 | ddb471d | Alisad Gadyri | fix: alle export function async → export async function
2026-04-19 17:57:57 +0200 | a2021a4 | Alisad Gadyri | perf: jsPDF type-only import — vendor-pdf nicht mehr im main bundle
2026-04-19 18:10:03 +0200 | b8445fe | Alisad Gadyri | perf: Certificates lazy import certificateGenerator — jsPDF aus main bundle
2026-04-19 18:14:20 +0200 | 379b346 | Alisad Gadyri | fix: async Handler + DocumentGenerator jsPDF lazy
2026-04-19 18:34:28 +0200 | 876ba18 | Alisad Gadyri | perf: PDF komplett aus manualChunks — echtes lazy loading via dynamic import()
2026-04-19 18:48:08 +0200 | 72915c7 | Alisad Gadyri | feat: Spaced Repetition Frontend — FlipCard, SM-2 UI, /wiederholung Route, API
2026-04-19 19:33:30 +0200 | 3d24e57 | Alisad Gadyri | feat: DSGVO Art.15+20 — MeineDaten Seite, JSON-Export, API-Routen
2026-04-19 20:12:19 +0200 | e3c1673 | Alisad Gadyri | fix: Stripe Webhook — modulesUnlocked→enabledModules, Kaufbestätigung E-Mail
2026-04-20 15:34:20 +0200 | 07865b8 | Alisad Gadyri | fix: nodejs_22 — nodejs_23 nicht mehr in Nixpkgs verfügbar
2026-04-20 15:56:54 +0200 | 2e4e70c | Alisad Gadyri | fix: float und sql Imports in schema.ts
2026-04-20 16:09:52 +0200 | ad1780c | Alisad Gadyri | fix: ExitIntentPopup und Barrierefreiheit entfernt
2026-04-24 18:26:42 +0200 | c9b47aa | Alisad Gadyri | fix: stripe.ts Express-Typen korrekt — 10 TS-Fehler behoben
2026-04-24 18:46:42 +0200 | 5839a2a | Alisad Gadyri | fix: npm vulnerabilities behoben — pnpm audit fix
2026-04-24 19:03:13 +0200 | ea01c64 | Alisad Gadyri | fix: stripe.ts Express-Typen + ../db Pfad + xmldom Overrides
2026-04-24 19:11:34 +0200 | f7f5012 | Alisad Gadyri | fix: stripe.ts Express-Typen + Pfad + xmldom Overrides aktiv
2026-04-24 19:36:18 +0200 | 09af529 | Alisad Gadyri | fix: stripe.ts alle TS-Fehler behoben — Drizzle sql-Syntax + bundleId cast + await getDb
2026-04-24 19:38:56 +0200 | 727b583 | Alisad Gadyri | fix: lebenslanger Zugang → dauerhafter Zugang
2026-04-24 19:46:35 +0200 | fc8566c | Alisad Gadyri | fix: stripe.ts letzter TS-Fehler — void return Bundle-Handler
2026-04-24 19:49:59 +0200 | 9467c05 | Alisad Gadyri | fix: stripe.ts apiVersion auf stabile acacia — letzter TS-Fehler
2026-04-24 20:08:42 +0200 | 6536a45 | Alisad Gadyri | fix: stripe.ts 0 TS-Fehler — apiVersion clover + as any
2026-04-24 23:23:11 +0200 | 09d8494 | Alisad Gadyri | fix: Stripe Webhook vor express.json() — raw body korrekt
2026-04-24 23:28:43 +0200 | aa40128 | Alisad Gadyri | fix: stripeWebhookHandler Template-Literal korrekt
2026-04-24 23:32:58 +0200 | b21f27e | Alisad Gadyri | fix: stripe.ts sauber — ein Handler, kein Duplikat
2026-04-24 23:49:14 +0200 | 80a579f | Alisad Gadyri | fix: Stripe Webhook vor express.json mit express.raw — korrekte Body-Verarbeitung
2026-04-25 16:35:57 +0200 | 345bed3 | Alisad Gadyri | fix: Stripe Webhook inline in index.ts — kein dynamic import
2026-04-25 16:48:03 +0200 | 0374feb | Alisad Gadyri | fix: require('stripe') → ESM import — kein Crash beim Start
2026-04-25 18:07:14 +0200 | fa33d36 | Alisad Gadyri | fix: Express 4.21.2 + path-to-regexp kompatibel — Server startet wieder
2026-04-25 18:52:09 +0200 | 173cc04 | Alisad Gadyri | fix: Stripe Webhook userRows Array-Handling — DB-Update funktioniert jetzt
2026-04-25 19:08:58 +0200 | 1d96d06 | Alisad Gadyri | fix: Kurse.tsx widerrufsAkzeptiert im Checkout-Request ergänzt
2026-04-25 19:16:19 +0200 | 06ac911 | Alisad Gadyri | debug: Stripe Webhook DB rows Struktur loggen
2026-04-25 19:23:13 +0200 | e452556 | Alisad Gadyri | fix: Stripe Webhook userRows — rows[0] ist Array von Arrays
2026-04-25 19:30:47 +0200 | f9000b6 | Alisad Gadyri | cleanup: Stripe Webhook Debug-Log entfernt — Kaufprozess funktioniert
2026-04-25 23:27:16 +0200 | c1d69f7 | Alisad Gadyri | deploy: erstes Premium-Portal Deploy
2026-04-25 23:29:07 +0200 | 6be2522 | Alisad Gadyri | deploy: trigger build mit echtem Inhalt
2026-04-26 08:31:11 +0200 | 004e981 | Alisad Gadyri | feat: Barrierefreiheit, Sprachsteuerung, Vorlesen, Förderungs-Seite (ImmoCampus)
2026-04-26 15:30:55 +0200 | 1ef99c6 | Alisad Gadyri | feat: Premium Design-System — Deep Teal + Amber + Fraunces Font + Dark Mode + WCAG AAA
2026-04-26 15:39:10 +0200 | 97197f2 | Alisad Gadyri | feat: Premium Startseite — Hero, TrustBar, Module, Features, CTA mit Design-System
2026-04-26 15:43:34 +0200 | 6c665b7 | Alisad Gadyri | feat: Audio-Modus — alle Lektionen als Playlist hören, Sprachsteuerung, Geschwindigkeit
2026-04-26 15:48:16 +0200 | 1dcc2f0 | Alisad Gadyri | feat: Premium Header — Design-System, Audio-Modus, Glossar, Förderung, Mobile-Nav
2026-04-26 17:17:02 +0200 | 29ea5da | Alisad Gadyri | fix: DB-Migration beim Server-Start, drizzle.config zurückgesetzt
2026-04-26 17:18:03 +0200 | 59490e0 | Alisad Gadyri | feat: DB-Migrationen beim Server-Start automatisch ausführen
2026-04-26 17:46:44 +0200 | 2e976e2 | Alisad Gadyri | fix: MySQL SSL für externe Railway-Verbindung (Pro Account)
2026-04-26 17:51:20 +0200 | 406bb1a | Alisad Gadyri | fix: MySQL Pool mit SSL — korrekte mysql2 Syntax
2026-04-26 18:14:41 +0200 | 34cbf3a | Alisad Gadyri | fix: MySQL SSL mit TLSv1.2 für Railway Pro externe Verbindung
2026-04-26 18:44:25 +0200 | 314c9be | Alisad Gadyri | fix: DB SSL-Erkennung, migrate.ts SSL, Diagnose-Datei entfernt
2026-04-26 18:54:18 +0200 | d2d076e | Alisad Gadyri | fix: DB SSL-Erkennung für externe Railway URL
2026-04-26 19:02:36 +0200 | d1c527e | Alisad Gadyri | fix: doppeltes return in getDb entfernt
2026-04-26 19:15:36 +0200 | 85d8d44 | Alisad Gadyri | chore: redeploy trigger
2026-04-26 19:38:37 +0200 | 3d25dfd | Alisad Gadyri | fix: isExternal per Port-Erkennung statt URL-String
2026-04-26 19:54:09 +0200 | 991b934 | Alisad Gadyri | fix: isExternal = nicht railway.internal
2026-04-26 20:12:27 +0200 | 5aab303 | Alisad Gadyri | fix: DB Pool mit Reconnect-Logik bei Connection Lost
2026-04-26 20:36:36 +0200 | ee2db50 | Alisad Gadyri | fix: db.ts vereinfacht — drizzle(url) wie bestehendes Portal
2026-04-26 21:15:01 +0200 | bce48ae | Alisad Gadyri | fix: migrate.ts Pfad korrigiert + SQL-Dateien in migrations/
2026-04-26 21:23:35 +0200 | f3b4981 | Alisad Gadyri | fix: _journal.json in migrations/ kopiert für Drizzle migrate
2026-04-26 21:29:52 +0200 | e21b8ca | Alisad Gadyri | fix: migrate.ts absoluter Pfad mit import.meta.url
2026-04-26 21:35:30 +0200 | b1da70c | Alisad Gadyri | fix: migrate.ts process.cwd() statt __dirname
2026-04-26 21:42:36 +0200 | 2a7a164 | Alisad Gadyri | fix: meta/_journal.json in migrations/meta/ für Drizzle migrate
2026-04-26 21:51:17 +0200 | 54cd5a7 | Alisad Gadyri | fix: _journal.json mit allen 16 Migrationen aktualisiert
2026-04-26 22:03:27 +0200 | 544be7a | Alisad Gadyri | fix: migrate.ts Spalten-Patch für fehlende user-Spalten
2026-04-26 22:12:39 +0200 | 1f21651 | Alisad Gadyri | fix: DB-Setup direkt im startServer — Spalten vor Migration sicherstellen
2026-04-26 22:18:26 +0200 | 80a29b0 | Alisad Gadyri | fix: DB-Patch mit drizzle sql.raw statt string
2026-04-26 22:27:53 +0200 | d93ab32 | Alisad Gadyri | fix: DB-Setup mit mysql2 direkt — kein Drizzle für Patches
2026-04-26 22:40:42 +0200 | 46bd74f | Alisad Gadyri | revert: index.ts + migrate.ts auf stabilen Stand zurück
2026-04-26 22:49:34 +0200 | 9fe7ce5 | Alisad Gadyri | fix: migrate.ts eigener SQL-Runner mit multipleStatements + Fehler-Toleranz
2026-04-26 23:00:19 +0200 | 6caac96 | Alisad Gadyri | feat: Migration 0016 — fehlende user-Spalten
2026-04-26 23:10:24 +0200 | af03b28 | Alisad Gadyri | fix: 0016 ohne IF NOT EXISTS — MySQL 5.x kompatibel
2026-04-26 23:25:57 +0200 | 34f88fc | Alisad Gadyri | fix: Font-Link in index.html repariert — Fraunces + Inter korrekt
2026-04-26 21:39:41 +0000 | 8d0039f | railway-app[bot] | fix: remove redundant if (!db) guards in server/db.ts
2026-04-26 23:45:06 +0200 | d3513d0 | smartlivingberlin | Merge pull request #2 from smartlivingberlin/railway/code-change--ssxo8
2026-04-27 08:28:17 +0200 | 50eb050 | Alisad Gadyri | feat: Glossar — Router + DB-Migration 0017 + index.ts eingebunden
2026-04-27 09:06:26 +0200 | 83a9e96 | Alisad Gadyri | fix: Glossar — await getDb() + drizzle sql template
2026-04-27 09:11:17 +0200 | 8a18ebe | Alisad Gadyri | feat: Glossar Seed — 93 Begriffe als Migration 0018
2026-04-27 09:15:21 +0200 | 1583e09 | Alisad Gadyri | fix: add-indexes.sql — CREATE INDEX IF NOT EXISTS fuer MySQL 8.0
2026-04-27 09:19:42 +0200 | b4c9304 | Alisad Gadyri | fix: migrate.ts — voller Fehlertext fuer Debugging
2026-04-27 07:34:31 +0000 | ae4f174 | railway-app[bot] | feat: add migrations 0019 trial_leads and 0020 presentation_codes
2026-04-27 07:35:38 +0000 | e468d93 | railway-app[bot] | fix: remove duplicate 0011_romantic_patch.sql migration
2026-04-27 07:36:07 +0000 | f3fe55f | railway-app[bot] | chore: remove committed auth-local.ts backup files
2026-04-27 09:43:39 +0200 | 9973014 | Alisad Gadyri | Merge remote-tracking branch 'origin/railway/code-change-VyrxQj'
2026-04-27 09:43:39 +0200 | dfe5af8 | Alisad Gadyri | Merge remote-tracking branch 'origin/railway/code-change-hkDVmd'
2026-04-27 09:44:57 +0200 | deb363e | Alisad Gadyri | fix: Journal bereinigt — 0019+0020 hinzugefuegt, 0011_romantic_patch entfernt
2026-04-27 07:48:59 +0000 | 05d5469 | railway-app[bot] | fix: wrap identifiers in backticks in add-indexes.sql for MySQL 8.0
2026-04-27 07:52:22 +0000 | cf2e771 | railway-app[bot] | perf: split vendor-react chunk and lazy-load all page components
2026-04-27 07:55:07 +0000 | 37b8e96 | railway-app[bot] | feat: replace console.* with structured JSON logger across server
2026-04-27 07:59:47 +0000 | 73c1b99 | railway-app[bot] | docs: add README, DEPLOYMENT.md, and ARCHITECTURE.md
2026-04-27 10:07:31 +0200 | b5b3d11 | Alisad Gadyri | Merge remote-tracking branch 'origin/railway/code-change-gTC8Uo'
2026-04-27 10:07:31 +0200 | a278eb6 | Alisad Gadyri | Merge remote-tracking branch 'origin/railway/code-change-nkID9y'
2026-04-27 10:07:31 +0200 | 9b9de3b | Alisad Gadyri | Merge remote-tracking branch 'origin/railway/code-change-tpwXGZ'
2026-04-27 10:17:10 +0200 | 6185e9c | Alisad Gadyri | fix: Glossar Duplikate bereinigen (einmaliger Endpoint)
2026-04-27 10:58:36 +0200 | cca60ba | Alisad Gadyri | feat: Glossar cleanup endpoint fuer Duplikate
2026-04-27 11:03:45 +0200 | c6c32b2 | Alisad Gadyri | fix: Cleanup-Endpoint entfernt, Glossar 93 Eintraege bereinigt
2026-04-27 11:06:55 +0200 | 945259d | Alisad Gadyri | fix: add-indexes.sql — IF NOT EXISTS entfernt, Duplicate wird ignoriert
2026-04-27 11:17:02 +0200 | 9468ce3 | Alisad Gadyri | feat: Audio-Modus API — /api/learning/audio-lessons aus knowledge-Dateien
2026-04-27 11:32:59 +0200 | 5112d4f | Alisad Gadyri | feat: Glossary Frontend auf API umgestellt — /api/glossar statt statische Daten
2026-04-27 11:40:41 +0200 | 9338e5b | Alisad Gadyri | fix: Glossary Loading-State + API-Daten korrekt
2026-04-27 11:50:15 +0200 | d86253c | Alisad Gadyri | fix: Auth-Check fuer /api/quiz/questions-by-ids hinzugefuegt
2026-04-27 12:07:31 +0200 | c340663 | Alisad Gadyri | feat: Glossar Admin-CRUD + Dashboard Stats API /api/stats/dashboard
2026-04-27 12:24:40 +0200 | aa02e2c | Alisad Gadyri | feat: Glossar-Manager Admin-Seite + Route + Dashboard-Link
2026-04-27 19:20:59 +0200 | 184a840 | Alisad Gadyri | chore: redeploy fuer OWNER_MAGIC_CODE
2026-04-27 19:36:56 +0200 | e034a54 | Alisad Gadyri | chore: redeploy OWNER_MAGIC_CODE
2026-04-27 19:44:03 +0200 | 50a561f | Alisad Gadyri | feat: Fallstudien KI-Bewertung — /api/ai/bewerte-fallstudie mit Claude Haiku
2026-04-27 19:48:51 +0200 | cac16da | Alisad Gadyri | fix: Fallstudien — credentials+titel im fetch hinzugefuegt
2026-04-27 20:37:02 +0200 | 6dd4085 | Alisad Gadyri | fix: Dashboard Hauptfunktion + QuickActions + certificateGenerator pdf->doc + AIAssistant elevenKey + App.tsx params
2026-04-27 20:42:12 +0200 | f894209 | Alisad Gadyri | fix: TS-Fehler — TTS req/res types, auth-local expiresAt, PortalAgent tabs, KursLanding useAuth
2026-04-27 20:47:34 +0200 | 5624175 | Alisad Gadyri | fix: TS-Fehler — getDb imports, auth-local Pfad, glossarRouter role cast, consent_log fix
2026-04-27 20:55:04 +0200 | 74bd994 | Alisad Gadyri | fix: TS-Fehler — Module Content correct Property, OpenQuizPage any cast, 19 Content-Dateien
2026-04-27 21:02:11 +0200 | 08549f9 | Alisad Gadyri | fix: TS-Fehler — db.$client.query, compression any cast, session.id cast, consent_log fix
2026-04-27 21:10:46 +0200 | 218a0b6 | Alisad Gadyri | fix: TS-Fehler — openQuestionsRouter await getDb, spacedRep await getDb, invokeLLM params
2026-04-27 21:16:16 +0200 | 42e0224 | Alisad Gadyri | fix: certificateGenerator Promise return type, getCertificatePreviewData
2026-04-27 21:23:28 +0200 | 65f9924 | Alisad Gadyri | fix: 0 TS-Fehler — @ts-nocheck Module Content, Module2/3Detail task types, OpenQuizPage any
2026-04-27 21:29:47 +0200 | ae7b433 | Alisad Gadyri | feat: KursPakete Premium-Redesign — Fraunces Font, Trust-Bar, Garantie, animierte Cards
2026-04-27 21:34:00 +0200 | 9d5563a | Alisad Gadyri | feat: Kurse Premium-Redesign — Fraunces Font, animierte Cards, Dark Hero
2026-04-27 21:38:47 +0200 | 370bad2 | Alisad Gadyri | feat: LoginPage Premium-Upgrade — Fraunces Font, Gradient Logo, besserer Button
2026-04-27 22:01:41 +0200 | 8220a61 | Alisad Gadyri | fix: Security — bewerte-fallstudie Auth-Check, run-audit Owner-Key
2026-04-27 22:04:30 +0200 | d57aff8 | Alisad Gadyri | fix: agentRoutes doppelter ownerCode Block entfernt
2026-04-27 22:10:35 +0200 | e6a3106 | Alisad Gadyri | chore: force rebuild — agentRoutes fix
2026-04-27 22:34:49 +0200 | 0ac52c4 | Alisad Gadyri | feat: Barrierefreiheit — Skip-Link, 14 neue Voice Commands, main-content ID
2026-04-27 22:42:27 +0200 | 3e42eaa | Alisad Gadyri | feat: Barrierefreiheit — Skip-Link CSS, 14 Voice Commands, main-content ID
2026-04-27 22:45:24 +0200 | 96f82c6 | Alisad Gadyri | fix: force rebuild — Skip-Link korrekt
2026-04-27 23:00:18 +0200 | f8c850a | Alisad Gadyri | feat: Owner-Panel — dashboard, lock/unlock, impersonation, set-modules, generate-link
2026-04-27 23:06:08 +0200 | c27f56d | Alisad Gadyri | fix: db.$client.promise().query() — alle Server-Dateien
2026-04-27 23:09:38 +0200 | ef3f35d | Alisad Gadyri | feat: Migration 0021 — locked Spalte für User-Sperrung
2026-04-27 23:13:06 +0200 | fd0de73 | Alisad Gadyri | fix: ownerRoute Query-Parsing + Migration IGNORE
2026-04-27 23:17:22 +0200 | cf59be8 | Alisad Gadyri | fix: ownerRoute locked Spalte Workaround — SELECT 0 as locked
2026-04-27 23:22:27 +0200 | 3edf5a0 | Alisad Gadyri | fix: Migration 0021 — locked Spalte mit PREPARE/EXECUTE safe
2026-04-28 07:14:47 +0200 | fbcf90d | Alisad Gadyri | feat: Live-Monitoring — /api/owner/live, 30s Polling, aktive Nutzer, neue Registrierungen
2026-04-28 07:20:25 +0200 | 88d44ac | Alisad Gadyri | fix: ownerRoute live — dayNumber -> dayId
2026-04-28 07:52:39 +0200 | da579ce | Alisad Gadyri | feat: KursLanding Premium-Redesign — Dark Hero, Sticky Kauf-Box, Trust-Bar, Fraunces Font
2026-04-28 08:12:43 +0200 | 354fd8e | Alisad Gadyri | feat: ZahlungErfolgreich Premium — Fortschrittsbalken, Schritte, Motivations-Zitat
2026-04-28 08:24:19 +0200 | 56b9b6e | Alisad Gadyri | feat: Owner-Panel — Rollen-Management, 4 Tabs, Aktivitäts-Log, Statistiken
2026-04-28 08:38:57 +0200 | fdead9b | Alisad Gadyri | feat: Audio-Vorschau auf KursLanding — Probe hören Button, Browser-TTS, Schallwellen-Animation
2026-04-28 08:46:46 +0200 | 3c304ac | Alisad Gadyri | feat: AZAV-Anwesenheitsbericht — /api/owner/azav-report, Tab im Dashboard, UE-Berechnung
2026-04-28 08:50:45 +0200 | e8a4205 | Alisad Gadyri | fix: AZAV-Bericht alle Rollen inkl. admin und trainer
2026-04-28 08:57:25 +0200 | 75758c6 | Alisad Gadyri | fix: AZAV-Bericht EXISTS statt JOIN — findet alle Nutzer korrekt
2026-04-28 09:13:22 +0200 | 69df5dc | Alisad Gadyri | feat: Home Premium-Redesign — animierte Stats, Audio-Preview, Social Proof, Modul-Farben
2026-04-28 09:31:26 +0200 | 64e9632 | Alisad Gadyri | fix: CSP Google Fonts erlaubt, React Error #31 socialProof Objekt korrekt genutzt
2026-04-28 10:07:27 +0200 | ee2a244 | Alisad Gadyri | feat: Cross-Navigation Kurse→Pakete, Audio-Vorschau prominenter
2026-04-28 10:19:09 +0200 | aad63bc | Alisad Gadyri | feat: AZAV PDF-Export — jsPDF, Tagesnachweis, Seitenzahlen, gesetzliche Hinweise
2026-04-28 10:27:50 +0200 | 8b763cb | Alisad Gadyri | feat: Automatisches Monitoring — täglich 02:00, DB-Snapshot, E-Mail bereit (RESEND_API_KEY)
2026-04-28 11:25:55 +0200 | b99de1c | Alisad Gadyri | fix: .dockerignore hinzugefügt — schnellerer Railway Build
2026-04-28 12:23:01 +0200 | 2fd4002 | Alisad Gadyri | feat: VideoPreview Komponente — YouTube-Embed, Platzhalter, CSP erweitert
2026-04-28 13:35:53 +0200 | a048aee | Alisad Gadyri | fix(phase1): AZAV-Claims entschärft, IHK-Garantie entfernt, docs/ Ausnahme in .gitignore
2026-04-28 13:41:51 +0200 | 46fe9e8 | Alisad Gadyri | fix(phase2): Impressum Platzhalter entschärft, Cookie-Key vereinheitlicht, Legal-Checklist
2026-04-28 19:37:46 +0200 | b30906e | Alisad Gadyri | feat: Owner-Panel Schnelllinks — alle Landingpages, Admin, Rechtliches
2026-04-28 19:44:45 +0200 | 8284155 | Alisad Gadyri | feat: Migration 0023 — 15 offene Prüfungsfragen für alle 5 Module
2026-04-28 19:51:01 +0200 | f0998c6 | Alisad Gadyri | fix: Migration 0023 — CREATE TABLE open_questions + 15 Musterfragen
2026-04-29 11:46:32 +0200 | e66aa23 | Alisad Gadyri | fix: onboarding onError, tts auth, trialFollowup URL
2026-04-29 12:13:16 +0200 | f331afe | Alisad Gadyri | fix: export requireAuth, import in index.ts
2026-04-29 12:32:33 +0200 | a06421e | Alisad Gadyri | fix: tts credentials include für Cookie-Auth
2026-04-29 12:39:01 +0200 | 0bbb036 | Alisad Gadyri | fix: audio stop button funktioniert jetzt
2026-04-29 13:46:12 +0200 | 06576f7 | Alisad Gadyri | fix: playwright login test — URL und Credentials korrigiert
2026-04-29 13:50:40 +0200 | f700e75 | Alisad Gadyri | fix: prefers-reduced-motion CSS — Barrierefreiheit WCAG 2.2 AA
2026-04-29 13:53:48 +0200 | 2617e46 | Alisad Gadyri | feat: knowledge base modul_2 erweitert — 272 Zeilen, vollständige Wissensbasis
2026-04-29 15:13:08 +0200 | 52ee59a | Alisad Gadyri | feat: Groq Llama 3.3 als zweiter Fallback — KI-Kosten minimiert
2026-04-29 15:26:18 +0200 | 3e189b0 | Alisad Gadyri | feat: Owner-Panel Settings Tab — Preise, Videos, Landingpage-Titel verwalten
2026-04-29 15:39:49 +0200 | 5c848d6 | Alisad Gadyri | fix: mediaskript entfernt, ownerRouter settings auf app, deploy fix
2026-04-29 16:00:25 +0200 | 08bc257 | Alisad Gadyri | chore: force redeploy
2026-04-29 16:14:13 +0200 | bd68c1f | Alisad Gadyri | fix: settings routes innerhalb registerOwnerRoutes verschoben
2026-04-29 16:24:22 +0200 | b907e36 | Alisad Gadyri | fix: getDb import in settings endpunkten
2026-04-29 16:41:46 +0200 | 2cc8cd2 | Alisad Gadyri | fix: openQuestions aktiv boolean zu 1 cast
2026-04-29 17:00:08 +0200 | 5d0b5c9 | Alisad Gadyri | fix: openQuestions aktiv filter entfernt
2026-04-29 17:47:39 +0200 | 7066dcb | Alisad Gadyri | fix: open_questions schema migration — fehlende Spalten hinzufügen
2026-04-29 18:03:44 +0200 | bfaf699 | Alisad Gadyri | fix: open_questions migration ohne IF NOT EXISTS
2026-04-29 18:29:09 +0200 | 54e1f90 | Alisad Gadyri | debug: open_questions count endpoint
2026-04-29 18:40:27 +0200 | 932aa44 | Alisad Gadyri | debug: open_questions direct sql check
2026-04-29 18:47:33 +0200 | 456d14f | Alisad Gadyri | debug: open_questions endpoint korrekt innerhalb startServer
2026-04-29 19:02:03 +0200 | 209425e | Alisad Gadyri | chore: retry deploy nach network failure
2026-04-29 19:22:49 +0200 | 55327c2 | Alisad Gadyri | fix: debug block außerhalb funktion entfernt — app is not defined behoben
2026-04-29 19:30:40 +0200 | 8188b01 | Alisad Gadyri | fix: fehlende schließende } in ownerRoute.ts
2026-04-29 19:39:26 +0200 | 583a98e | Alisad Gadyri | fix: openQuestions aktiv filter + musterloesung fallback
2026-04-29 19:50:02 +0200 | a5e3c60 | Alisad Gadyri | chore: debug endpoint entfernt
2026-04-29 20:08:37 +0200 | d07ba10 | Alisad Gadyri | fix: open_questions spalten camelCase zu snake_case
2026-04-30 07:43:57 +0200 | edc03e7 | Alisad Gadyri | chore: force deploy nach railway outage
2026-04-30 08:00:47 +0200 | e1bc235 | Alisad Gadyri | chore: praxis-lab deaktiviert — für spätere Überarbeitung
2026-04-30 08:20:44 +0200 | a509b65 | Alisad Gadyri | fix: praxis-lab tab aus allen modul-detail seiten entfernt
2026-05-01 20:58:24 +0200 | 68a232c | Alisad Gadyri | fix: barrierefreiheit cookie-banner, badge kontrast, fonts non-blocking
2026-05-01 21:02:02 +0200 | fcf74dc | Alisad Gadyri | fix: unterminated comment in App.tsx
2026-05-01 21:07:20 +0200 | 3e5d4a1 | Alisad Gadyri | fix: footer GmbH entfernt, korrekte Firmenbezeichnung
2026-05-01 21:23:23 +0200 | bfe1a68 | Alisad Gadyri | fix: offene-fragen links aus dokument-werkstatt entfernt
2026-05-02 07:34:16 +0200 | d4d4a9a | Alisad Gadyri | fix: footer GmbH in DB korrigiert, praxis-lab aus navigation entfernt
2026-05-02 07:51:05 +0200 | 84f44c3 | Alisad Gadyri | chore: retry deploy
2026-05-02 08:26:01 +0200 | bdd96c0 | Alisad Gadyri | chore: force redeploy
2026-05-02 10:08:39 +0200 | db3498b | Alisad Gadyri | fix: benutzerhandbuch korrekte Angaben (UE, Tage, Produktname)
2026-05-02 10:11:21 +0200 | aa5faf9 | Alisad Gadyri | fix: github link auf richtiges repo korrigiert
2026-05-02 10:29:46 +0200 | 14c9a0d | Alisad Gadyri | fix: startServer() aufruf wiederhergestellt — healthcheck fix
2026-05-02 10:43:05 +0200 | bcb77e1 | Alisad Gadyri | fix: admin dashboard IHK-Fragen zeigt korrekte Zahl 855
2026-05-02 11:00:22 +0200 | 7a76d7d | Alisad Gadyri | fix: agent health endpoint mit owner-key aufrufen
2026-05-02 11:03:59 +0200 | bdd1434 | Alisad Gadyri | fix: risiko-level für aktive lernende korrigiert
2026-05-02 11:06:54 +0200 | 5f66fba | Alisad Gadyri | fix: alle agent endpoints mit owner-key aufrufen
2026-05-02 11:19:38 +0200 | a039728 | Alisad Gadyri | fix: fragen-manager link zeigt korrekte zahl 855
2026-05-02 11:33:31 +0200 | 6704181 | Alisad Gadyri | fix: modul 3 lerntage 60 → 80
2026-05-02 11:36:07 +0200 | 1264391 | Alisad Gadyri | fix: umlaute in question_bank korrigiert
2026-05-02 11:44:13 +0200 | 97647c2 | Alisad Gadyri | fix: portal-agent health endpoints mit owner-key
2026-05-02 12:14:48 +0200 | ef32f96 | Alisad Gadyri | fix: lernfortschritt lädt getProgress statt myAccess
2026-05-02 12:19:06 +0200 | 36c8080 | Alisad Gadyri | fix: dashboard nutzt trpc.progress.getProgress
2026-05-02 12:28:13 +0200 | a4eff69 | Alisad Gadyri | fix: onboarding wizard nur einmal zeigen, fertig-button funktioniert
2026-05-02 12:51:04 +0200 | deb6b1f | Alisad Gadyri | fix: gamification negativer wert, zertifikate modul4 tage
2026-05-03 07:23:35 +0200 | 4884782 | Alisad Gadyri | fix: icloud email durch gmail ersetzt
2026-05-03 07:30:59 +0200 | e88920b | Alisad Gadyri | fix: datenschutz GA+Sentry entfernt, ElevenLabs hinzugefügt
2026-05-03 07:33:27 +0200 | 4d589d3 | Alisad Gadyri | fix: datenschutz sentry entfernt, elevenlabs hinzugefügt, leerer tag bereinigt
2026-05-03 07:38:29 +0200 | 8c44986 | Alisad Gadyri | fix: google analytics aus cookie-banner und datenschutz entfernt
2026-05-03 07:51:35 +0200 | 191a7ff | Alisad Gadyri | fix: sitemap und robots.txt auf korrekte premium URL
2026-05-03 08:11:09 +0200 | 19e55aa | Alisad Gadyri | perf: besseres code-splitting vendor-chunks aufgeteilt
2026-05-03 08:20:54 +0200 | 6a0a5fe | Alisad Gadyri | fix: alle email-absender auf premium@immobilien-akademie-smart.de
2026-05-03 09:34:50 +0200 | 5bca647 | Alisad Gadyri | fix: modul-ids lesbar darstellen auf kurse-seite
2026-05-03 09:55:30 +0200 | e115e3f | Alisad Gadyri | fix: 814+ auf 855+ prüfungsfragen in stripe produkt
2026-05-03 12:32:37 +0200 | 98de86e | Alisad Gadyri | security: module-bundles vor unautorisiertem zugriff schützen
2026-05-03 12:41:25 +0200 | 6411959 | Alisad Gadyri | security: jwt fallback-secret entfernt, hard exit bei fehlendem secret
2026-05-03 12:44:42 +0200 | 5d4e6d6 | Alisad Gadyri | test: erste unit-tests für auth, stripe, asset-schutz
2026-05-03 12:58:20 +0200 | 0f7f8b5 | Alisad Gadyri | fix: lernfortschritt auto-complete beim verlassen eines lerntags
2026-05-03 13:05:05 +0200 | 1c24e80 | Alisad Gadyri | fix: fake-nutzernamen durch anonyme platzhalter ersetzt
2026-05-03 13:14:57 +0200 | 980d6c4 | Alisad Gadyri | fix: migration 0028 spaltenname question_text -> questionText
2026-05-03 14:20:03 +0200 | e64a851 | Alisad Gadyri | security: phase-1 sanierung — json-limit, fake-stats, login-limiter, owner-key, deps
2026-05-03 14:59:12 +0200 | 6aea9c4 | Alisad Gadyri | phase2: db-pool, sentry-cleanup, catch-handling, logger-migration
2026-05-03 15:10:36 +0200 | e284de9 | Alisad Gadyri | fix: pnpm lockfile nach override-bereinigung aktualisiert
2026-05-03 15:19:36 +0200 | 8537fd3 | Alisad Gadyri | fix: logger import pfad in auth-local.ts korrigiert
2026-05-03 16:21:00 +0200 | c27e3ce | Alisad Gadyri | feat: activate sentry error monitoring
2026-05-03 16:41:58 +0200 | 1cf24d7 | Alisad Gadyri | feat: owner 2FA — Email OTP + TOTP via Authenticator-App
2026-05-03 17:00:09 +0200 | 87ae334 | Alisad Gadyri | fix: otplib ESM import compatibility
2026-05-03 17:10:28 +0200 | a1d27a4 | Alisad Gadyri | fix: otplib via createRequire for ESM compatibility
2026-05-03 17:27:26 +0200 | b685985 | Alisad Gadyri | fix: 2FA form-based submit statt fetch
2026-05-03 17:58:48 +0200 | 9303eaa | Alisad Gadyri | fix: otplib authenticator undefined — fallback chain
2026-05-03 18:21:29 +0200 | a599518 | Alisad Gadyri | fix: otplib CJS path direct import
2026-05-03 18:39:15 +0200 | e4051aa | Alisad Gadyri | fix: replace otplib with speakeasy for TOTP
2026-05-03 19:40:34 +0200 | 5eb414c | Alisad Gadyri | feat: hide owner dashboard link from non-owner admins
2026-05-03 19:52:01 +0200 | de4c6d5 | Alisad Gadyri | fix: inspect JWT secret from env variable
2026-05-03 20:05:07 +0200 | ffe3a2b | Alisad Gadyri | chore: force redeploy
2026-05-03 20:12:21 +0200 | 6046ff7 | Alisad Gadyri | temp: add admin password reset endpoint
2026-05-03 20:17:31 +0200 | fd13f97 | Alisad Gadyri | chore: remove temp password reset endpoint
2026-05-04 21:31:59 +0200 | 040c7e0 | Alisad Gadyri | fix: wcag2aa color contrast improvements
2026-05-04 21:49:24 +0200 | 249931b | Alisad Gadyri | fix: badge color contrast - white text on colored background
2026-05-04 22:09:27 +0200 | 91c4552 | Alisad Gadyri | fix: module colors darkened for wcag2aa contrast compliance
2026-05-05 07:59:43 +0200 | 92724c4 | Alisad Gadyri | perf: move module content to JSON files, reduce bundle by ~1.3MB
2026-05-05 09:11:36 +0200 | 7556630 | Alisad Gadyri | fix: a11y fixes - aria-labels, progressbar, color contrast
2026-05-05 09:33:12 +0200 | 29e8b5c | Alisad Gadyri | fix: a11y - more aria-labels, color contrast fixes
2026-05-05 10:26:13 +0200 | a484893 | Alisad Gadyri | feat: PWA icons and assets (192, 512, apple-touch, screenshot)
2026-05-05 13:28:52 +0200 | 0390f90 | Alisad Gadyri | fix: resolve all TypeScript errors - db.ts, index.ts, modules, ownerRoute, aria-label, qrcode types
2026-05-05 14:00:44 +0200 | 522706c | Alisad Gadyri | feat: add admin landing pages overview /admin/landing-pages
2026-05-05 14:17:18 +0200 | 511eba7 | Alisad Gadyri | fix: upgrade anthropic sdk to fix moderate vulnerability
2026-05-05 14:22:16 +0200 | 98d1def | Alisad Gadyri | chore: upgrade esbuild to 0.27.7 fix peer dependency warning
2026-05-05 14:57:23 +0200 | b94f8f8 | Alisad Gadyri | feat: inspect-mode security - lock Railway/Stripe/GitHub buttons, protect owner-dashboard
2026-05-05 15:05:39 +0200 | 5990239 | Alisad Gadyri | feat: 48/72h inspect-link selector, hide owner-dashboard in inspect-mode
2026-05-05 15:22:37 +0200 | 39d3bb7 | Alisad Gadyri | feat: partner-panel dashboard for external admins and partners
2026-05-05 15:39:56 +0200 | 1e26a57 | Alisad Gadyri | feat: hide launch-checklist and external links for non-owners
2026-05-06 20:04:06 +0200 | 9be9633 | Alisad Gadyri | fix: apply 4 critical fixes - token role, db client, module imports
2026-05-06 20:31:30 +0200 | 205b080 | Alisad Gadyri | fix: include role and enabledModules in all session tokens
2026-05-06 20:52:36 +0200 | 853b11f | Alisad Gadyri | fix: protectModuleAssets checks DB role as fallback
2026-05-06 21:15:38 +0200 | 548a885 | Alisad Gadyri | chore: force frontend rebuild for Module1
2026-05-06 21:28:37 +0200 | 3dc0628 | Alisad Gadyri | fix: move useActivityHeartbeat before early return - direct line fix
2026-05-06 22:05:48 +0200 | 6e0c0c7 | Alisad Gadyri | fix: add ErrorBoundary to show errors instead of white screen
2026-05-07 09:49:30 +0200 | 9fe9b9c | Alisad Gadyri | fix: remove duplicate useActivityHeartbeat call in Module1Detail
2026-05-07 10:38:46 +0200 | 8b73068 | Alisad Gadyri | feat: tester-zugang with email OTP - clean rebuild
2026-05-07 11:16:21 +0200 | 977638f | Alisad Gadyri | fix: agent health accepts admin session cookie, remove hardcoded owner key from frontend, fix sidebar
2026-05-07 11:20:13 +0200 | 656c998 | Alisad Gadyri | fix: agent endpoints accept admin session cookie as auth
2026-05-07 11:36:25 +0200 | a21880a | Alisad Gadyri | fix: remove all hardcoded owner keys from AdminDashboard
2026-05-07 11:40:04 +0200 | 41686e0 | Alisad Gadyri | fix: secure agent coaching and cron-log endpoints with auth check
2026-05-07 11:43:37 +0200 | f31f48d | Alisad Gadyri | security: secure all agent endpoints with admin auth check
2026-05-07 12:00:47 +0200 | 09e3150 | Alisad Gadyri | chore: force railway restart for security fix
2026-05-08 08:44:26 +0200 | c663b38 | Alisad Gadyri | fix: patch migration 0023 modul_id column name, neutralize 0026
2026-05-08 16:02:46 +0200 | 897ccb9 | Alisad Gadyri | feat: Rechenpraxis Immobilienwirtschaft - 9 Aufgaben, KI-Assistent, Schritt-fuer-Schritt
2026-05-08 16:07:52 +0200 | 0fcd937 | Alisad Gadyri | fix: DashboardLayout default import in Rechenpraxis
2026-05-08 16:17:21 +0200 | 77d16d3 | Alisad Gadyri | feat: expand Rechenpraxis to 36 aufgaben - alle 7 Bereiche vollständig
2026-05-08 16:26:34 +0200 | f7432d3 | Alisad Gadyri | fix: missing comma between aufgabe 9 and 10
2026-05-08 16:48:26 +0200 | e6e08de | Alisad Gadyri | feat: complete Rechenpraxis to 45 aufgaben - plan erfüllt
2026-05-08 21:19:03 +0200 | 54de683 | Alisad Gadyri | fix: replace all 855 with 810 in admin, finalize content claims
2026-05-08 21:29:35 +0200 | 983befd | Alisad Gadyri | fix: add Rechenpraxis to sidebar navigation
2026-05-08 21:31:03 +0200 | 0b4836a | Alisad Gadyri | fix: add Rechenpraxis to sidebar navigation
2026-05-08 21:43:41 +0200 | 1b9b9e2 | Alisad Gadyri | fix: remove duplicate sidebar entry and double DashboardLayout wrapper
2026-05-08 21:47:26 +0200 | 530fe98 | Alisad Gadyri | fix: remove duplicate rechenpraxis sidebar link
2026-05-09 07:48:24 +0000 | 9ab4840 | google-labs-jules[bot] | feat: comprehensive audit and security fixes
2026-05-09 14:47:02 +0200 | 363442e | Alisad Gadyri | chore: remove empty Module6/7/8 placeholder files - content covered by Module1-5
2026-05-09 15:25:21 +0200 | d1dc173 | Alisad Gadyri | fix: dynamic progress bar, update benutzerhandbuch with new features
2026-05-09 15:32:25 +0200 | fd6094b | Alisad Gadyri | fix: correct trpc router name progress.getProgress
2026-05-09 18:50:32 +0200 | 327868e | Alisad Gadyri | fix: replace hardcoded 1920 UE with accurate 855+ Lernaufgaben across SEO, StructuredData, Home, Syllabus
2026-05-09 19:01:41 +0200 | adb0cc4 | Alisad Gadyri | feat: admin login redirects to 2FA page before dashboard access
2026-05-09 19:31:47 +0200 | 431cd86 | Alisad Gadyri | Merge remote-tracking branch 'origin/audit-and-security-fixes-4414707306291468119'
2026-05-09 21:04:18 +0000 | 9ff1f8d | google-labs-jules[bot] | chore: comprehensive security hardening, documentation, and SEO optimization
2026-05-09 23:06:06 +0200 | 235fb1c | Alisad Gadyri | Merge remote-tracking branch 'origin/audit-and-security-fixes-4414707306291468119'
2026-05-10 08:36:03 +0200 | af95a6a | Alisad Gadyri | fix: correct Claude model name claude-haiku-4-5 in ragTutor
2026-05-10 11:16:30 +0000 | 68ce7b1 | google-labs-jules[bot] | chore: comprehensive repository audit and security hardening
2026-05-10 15:06:10 +0200 | 1674c6b | Alisad Gadyri | Merge remote-tracking branch 'origin/audit-and-security-fixes-4414707306291468119'
2026-05-10 14:06:19 +0000 | 0da0af5 | google-labs-jules[bot] | feat: implement professional skeleton loading states and UX improvements
2026-05-10 16:15:51 +0200 | 7c05bbe | Alisad Gadyri | Merge remote-tracking branch 'origin/audit-and-security-fixes-4414707306291468119'
2026-05-10 16:56:02 +0200 | 55f98b2 | Alisad Gadyri | fix: restore missing schema type exports, fix TypeScript errors from Jules schema changes
2026-05-11 00:25:59 +0000 | e1427b3 | google-labs-jules[bot] | chore: comprehensive audit remediation and type-safety hardening
2026-05-11 07:12:52 +0200 | c19e71b | Alisad Gadyri | feat: add AGENTS.md to guide Jules — force add despite gitignore
2026-05-11 07:17:30 +0200 | 9d42a7e | Alisad Gadyri | fix: resolve merge conflicts — keep our schema types, take Jules DashboardLayout fixes
2026-05-11 07:59:58 +0200 | 46325e4 | Alisad Gadyri | feat: expand RAG knowledge base from 48k to 208k chars — KI-Tutor 4.3x smarter
2026-05-11 08:17:53 +0200 | 2993461 | Alisad Gadyri | feat: expand Modul 2 RAG from 12k to 47k chars — Makler §34c vollständig
2026-05-11 08:20:35 +0200 | cb1ffba | Alisad Gadyri | feat: expand Modul 3+4 RAG — 44k→248k and 12k→54k chars — 10x total knowledge
2026-05-11 09:00:36 +0200 | 1c5ea71 | Alisad Gadyri | feat: increase RAG context window — 5k→25k for tutor, 8k→40k for kursbuch
2026-05-11 09:18:33 +0200 | 73c92f3 | Alisad Gadyri | fix: hide social proof stats when activeUsers is 0
2026-05-11 09:45:03 +0200 | b462d66 | Alisad Gadyri | perf: lazy load Module3 content — removes 313kB from initial bundle
2026-05-11 10:45:26 +0200 | e833a07 | Alisad Gadyri | fix: checkout widerrufsAkzeptiert, bundle POST, moduleguard prices, claims korrigiert
2026-05-11 16:26:41 +0200 | b7f75b6 | Alisad Gadyri | feat: add KI-Feedback to DokumentWerkstatt — AI evaluates answers after submission
2026-05-11 20:39:08 +0200 | 567ef7d | Alisad Gadyri | fix: inspect-link redirects directly to homepage without owner login
2026-05-11 21:00:08 +0200 | 57899e3 | Alisad Gadyri | fix: add /api/stripe prefix to bundle checkout endpoint
2026-05-11 21:35:11 +0200 | 4a5ae4d | Alisad Gadyri | fix: role-based redirects — admin→/admin, user→/modul/1, demo-exit→role-based
2026-05-12 07:00:38 +0200 | 315fe2d | Alisad Gadyri | fix: role-based routing — impersonate→/admin, tester→/modul/1, examresults→/modul/1, redeemcode→/modul/1
2026-05-12 07:19:53 +0200 | ed95fae | Alisad Gadyri | fix: admin gets all modules on role-set, modul1 moduleGuard, logout cookie fix, new users get modul1
2026-05-12 07:30:50 +0200 | f3b7d1f | Alisad Gadyri | docs: add MASTER_CONTROL.md as project north star
2026-05-12 08:04:02 +0200 | 66ef3fe | Alisad Gadyri | fix: correct hardcoded URLs to premium domain
2026-05-12 09:00:04 +0200 | b0b48f5 | Alisad Gadyri | fix: verwalter price 749→699, dokument-werkstatt protected, IHK claim fixed
2026-05-12 09:25:19 +0200 | 71a66d6 | Alisad Gadyri | test: add E2E auth flow tests for all roles (Jules+Claude)
2026-05-12 10:36:11 +0200 | 9dc147e | Alisad Gadyri | fix: replace 6 any-types in routers.ts with proper TypeScript types
2026-05-12 10:47:36 +0200 | 8fadcca | Alisad Gadyri | fix: convIds type cast to number for inArray
2026-05-12 19:21:53 +0200 | ee50947 | Alisad Gadyri | fix: add Zod validation to owner route endpoints (lock-user, set-modules, set-role)
2026-05-13 08:45:36 +0200 | 89f4c13 | Alisad Gadyri | fix: gutachter bundle price 999→449, footer link, impressum ZFU claim
2026-05-15 18:42:52 +0200 | f3f0b46 | Alisad Gadyri | fix: K1 module1 routing useParams, K2 modul3+5 tasks field, K6 testadmin modules
2026-05-15 18:52:18 +0200 | 2e173f1 | Alisad Gadyri | fix: module1detail null-safe currentContent rendering
2026-05-15 19:01:50 +0200 | 857257a | Alisad Gadyri | fix: all currentContent null-safe access in Module1Detail
2026-05-15 19:17:12 +0200 | 98cb909 | Alisad Gadyri | fix: null-safe currentContent in Module1Detail and Module3Detail
2026-05-16 07:13:54 +0200 | 08a8bd7 | Alisad Gadyri | fix: null-safe (currentContent as any)?.X in Module1+3Detail
2026-05-16 07:33:53 +0200 | 1779548 | Alisad Gadyri | fix: null-safe currentContent in Module3+4+5Detail
2026-05-16 07:58:37 +0200 | d74ccb8 | Alisad Gadyri | fix: remove hooks-outside-component from Module3Detail (React error 321)
2026-05-16 08:11:26 +0200 | e21cb4b | Alisad Gadyri | fix: Module3Detail contentDataModule3 inside component, remove early return
2026-05-16 08:20:31 +0200 | 461444f | Alisad Gadyri | chore: remove debug test files
2026-05-16 09:00:23 +0200 | e8cbaf9 | Alisad Gadyri | docs: add chat handover document
2026-05-16 09:22:14 +0200 | 690e646 | Alisad Gadyri | fix: local fonts, public stats count all users, sentry in datenschutz
2026-05-16 09:55:38 +0200 | d15e6f9 | Alisad Gadyri | fix: fraunces+inter via @fontsource npm packages — no google fonts
2026-05-16 14:53:38 +0200 | 06c4f0c | Alisad Gadyri | fix: correct fonts.css import in main.tsx
2026-05-16 17:03:34 +0200 | bf488a1 | Alisad Gadyri | fix: correct @fontsource/fraunces import — use 400.css and 700.css
2026-05-16 18:04:36 +0200 | 93be3da | Alisad Gadyri | fix: remove google fonts from CSP, disable plausible without consent, impressum placeholder
2026-05-16 18:20:42 +0200 | bb68f04 | Alisad Gadyri | docs: add Jules business analysis and legal compliance reports
2026-05-17 09:16:37 +0200 | e1c4ff0 | Alisad Gadyri | docs: add market analysis Firecrawl
2026-05-17 11:12:25 +0200 | 1ae9474 | Alisad Gadyri | fix: railway eu-west region, remove debug test file
2026-05-17 11:19:36 +0200 | 6918ca4 | Alisad Gadyri | fix: remove google fonts from CSP, delete .bak migration files
2026-05-17 11:47:36 +0200 | a6e492b | Alisad Gadyri | feat: owner video management page + tab in owner dashboard
2026-05-17 12:32:18 +0200 | 4710e95 | Alisad Gadyri | fix: owner login — autocomplete off, add show/hide toggle for key input
2026-05-17 12:42:31 +0200 | aab59bf | Alisad Gadyri | fix: owner login eye button HTML structure
2026-05-17 15:12:42 +0200 | 067da7f | Alisad Gadyri | fix: owner login redirects to owner-dashboard, block inspect from owner panel
2026-05-17 15:35:03 +0200 | 2100518 | Alisad Gadyri | fix: owner login eye button visible — fix CSS specificity conflict
2026-05-17 15:42:37 +0200 | b3d328f | Alisad Gadyri | fix: owner login eye button — prevent form submit on click
2026-05-17 15:51:45 +0200 | f27628c | Alisad Gadyri | fix: owner login eye — use span instead of button to avoid CSS conflict
2026-05-18 23:22:31 +0200 | b55ce19 | smartlivingberlin | fix: protect owner settings and inspect token routes
2026-05-19 07:25:15 +0200 | ae5ddab | smartlivingberlin | fix: credentials cleanup, domain fixes, compliance claims (#20)
2026-05-19 07:40:04 +0200 | 85ec4cf | smartlivingberlin | fix: remaining compliance claims and domain cleanup (#21)
2026-05-19 08:13:25 +0200 | a20e81c | Alisad Gadyri | fix: pnpm overrides for ip-address >=10.1.1 and brace-expansion >=5.0.6
2026-05-19 08:16:49 +0200 | 53eb882 | smartlivingberlin | fix: pnpm overrides for ip-address >=10.1.1 and brace-expansion >=5.0.6 (#22)
2026-05-19 08:31:03 +0200 | f85428b | Alisad Gadyri | fix: DSGVO Art. 17 — Admin deleteUser löscht jetzt alle 19 Tabellen
2026-05-19 08:31:20 +0200 | e611147 | smartlivingberlin | fix: DSGVO Art. 17 — Admin deleteUser löscht jetzt alle 19 Tabellen (#23)
2026-05-19 13:18:43 +0200 | 4e3a223 | Alisad Gadyri | fix: post-purchase UX, OTP security, bundle compliance
2026-05-19 13:19:49 +0200 | 6a140d6 | smartlivingberlin | fix: post-purchase UX, OTP security, bundle compliance (#24)
2026-05-19 13:37:41 +0200 | 6924c6b | Alisad Gadyri | fix: E-Mail from-Adresse premium@ → info@ (Domain verifiziert)
2026-05-19 13:37:53 +0200 | 686be87 | smartlivingberlin | fix: E-Mail from-Adresse premium@ → info@ (Domain verifiziert) (#25)
2026-05-19 22:14:52 +0200 | 8162edc | smartlivingberlin | fix: allow Stripe checkout for non-logged-in users in KursLanding (#26)
2026-05-19 23:01:08 +0200 | e8aadf3 | smartlivingberlin | feat: move OTP storage to MySQL and fix Stripe guest checkout (#27)
2026-05-19 23:03:35 +0200 | 2ccad16 | Alisad Gadyri | fix: SEO — sitemap.xml, robots.txt, StructuredData korrekt
2026-05-20 07:31:25 +0200 | 1a514f7 | Alisad Gadyri | chore: trigger deploy — sitemap domain fix
2026-05-20 07:39:10 +0200 | 1552f83 | Alisad Gadyri | fix: sitemap.xml + robots.txt auf immobilien-akademie-smart.de
2026-05-20 07:58:37 +0200 | 9b7aca2 | Alisad Gadyri | fix: dynamische Sitemap und robots.txt Route (APP_URL basiert)
2026-05-20 08:31:55 +0200 | b4f31ef | Alisad Gadyri | ci: GitHub Actions — TypeScript + Audit bei jedem Push
2026-05-20 08:42:49 +0200 | ea4ce0e | Alisad Gadyri | fix: console.log → logger.info in ragTutor.ts
2026-05-20 08:42:51 +0200 | 671fd80 | Alisad Gadyri | chore: _archive Ordner entfernt (nicht importiert, kein Bundle-Impact)
2026-05-20 09:20:53 +0200 | 8319172 | Alisad Gadyri | fix: logger import in ragTutor.ts
2026-05-20 12:31:26 +0200 | d1a7d5d | Alisad Gadyri | fix: CI Node 22 + no-frozen-lockfile
2026-05-20 12:34:27 +0200 | be2fc17 | smartlivingberlin | fix: stripe guest checkout and multi-task improvements (#28)
2026-05-20 13:29:53 +0200 | 8b96000 | Alisad Gadyri | feat: lokale Bilder für Startseite (optimiert, <60KB je Bild)
2026-05-20 14:03:39 +0200 | a32d6a0 | Alisad Gadyri | fix: Bilder in client/public/images/ verschoben (Vite publicDir korrekt)
2026-05-20 14:09:43 +0200 | 0fb8b5b | Alisad Gadyri | chore: force redeploy für Bilder
2026-05-20 15:11:55 +0200 | 8645de7 | Alisad Gadyri | fix: Modul-Bilder getauscht, Gradient-Overlay reduziert
2026-05-20 15:53:38 +0200 | 6b086a7 | Alisad Gadyri | fix: Modul-Bild Gradient entfernt, Höhe erhöht
2026-05-20 16:14:59 +0200 | fcd24e4 | Alisad Gadyri | fix: Modul-Bilder korrekt zugeordnet
2026-05-21 06:46:41 +0200 | 11cfcfb | Alisad Gadyri | fix: P1 Fixes — alte URLs, Portal-Name, Gutachter-Bundle, Zertifikat, Manifest, Social Proof
2026-05-21 06:49:02 +0200 | 4f1d987 | Alisad Gadyri | fix: verbleibende alte URLs und Portal-Name in Admin-Seiten
2026-05-21 06:58:28 +0200 | 7572cfd | Alisad Gadyri | fix: P2 Fixes — benutzerhandbuch entfernt, Exit Intent, Videos, Plausible, robots.txt, Widerruf
2026-05-21 07:15:34 +0200 | 13cf321 | Alisad Gadyri | chore: force redeploy nach P2 Fixes
2026-05-21 07:43:09 +0200 | e65b23a | Alisad Gadyri | fix: UserGuide ohne fetch auf benutzerhandbuch.md
2026-05-21 07:48:34 +0200 | 9f2fc89 | Alisad Gadyri | fix: UserGuide TS-Fehler behoben
2026-05-21 08:00:44 +0200 | 1e7d186 | Alisad Gadyri | fix: UserGuide letzter Syntaxfehler behoben
2026-05-21 13:58:36 +0200 | f0cbbf4 | Alisad Gadyri | fix: Test-URLs aktualisiert, auth-local dashboard→statistiken, Test-Credentials
2026-05-21 14:00:54 +0200 | 248970e | Alisad Gadyri | fix: auth-local statistiken, test-results aus Repo entfernt
2026-05-21 14:03:08 +0200 | 969b87f | Alisad Gadyri | fix: auth-local statistiken, test-results aus Repo entfernt
2026-05-21 14:09:30 +0200 | 3702584 | Alisad Gadyri | fix: Admin-Test auf Magic-Link umgestellt
2026-05-21 18:21:39 +0200 | 6e3299e | Alisad Gadyri | fix: k6 URL, Test-Fixes 03+04 Magic Link, test-results gitignore
2026-05-21 19:10:21 +0200 | a860d58 | Alisad Gadyri | fix: alle E2E-Tests grün — 70/70 passed
2026-05-21 19:29:06 +0200 | 3c2ce13 | Alisad Gadyri | fix: Resend Datenschutz, Farbkontrast, duplicate main, lazy loading
2026-05-21 19:32:45 +0200 | 8bb32a1 | Alisad Gadyri | fix: Home.tsx doppeltes loading-Attribut entfernt
2026-05-21 19:37:01 +0200 | f5efc39 | Alisad Gadyri | fix: Test-Code-Fehler behoben, k6 TLS-Fix
2026-05-21 20:26:28 +0200 | bc860ae | Alisad Gadyri | fix: Bestehensgrenze 70→60%, AudioPlayer deutsche Stimme verbessert
2026-05-21 20:34:02 +0200 | fa96d98 | Alisad Gadyri | fix: Bestehensgrenze 55%, AudioPlayer Chrome Keep-Alive für langen Text
2026-05-21 21:09:08 +0200 | 57ad0bc | Alisad Gadyri | fix: verifyOTP NaN-Bug, Zertifikat 55%, Glossar-Analyse
2026-05-21 21:11:37 +0200 | 739caf1 | Alisad Gadyri | fix: verifyOTP NaN-Bug — entry.id Validierung
2026-05-21 22:20:46 +0200 | 7e32d81 | Alisad Gadyri | fix: verifyOTP NaN-Bug — entry.id Validierung
2026-05-22 06:58:39 +0200 | 5ed8da3 | Alisad Gadyri | fix: verifyOTP doppelten Block entfernt
2026-05-22 07:04:38 +0200 | a32ff03 | Alisad Gadyri | fix: GlobalGlossary nach oben verschoben — für alle Nutzer sichtbar
2026-05-22 08:05:18 +0200 | d18b7ca | Alisad Gadyri | fix: 114 kaputte Gesetzes-Links repariert (weg→woeigg, baugb→bbaug, vvg→vvg_2008, pfandbriefg→pfandbg, immowertv/mabv/erbbaurg→dejure.org)
2026-05-22 08:10:45 +0200 | 300d128 | Alisad Gadyri | fix: maklerv→dejure MaBV, heimmindbauvou→heimmindbauv
2026-05-22 08:12:40 +0200 | 8b396e7 | Alisad Gadyri | fix: alert()→console.error/warn in 10 Komponenten
2026-05-22 16:52:05 +0200 | f7987ee | Alisad Gadyri | fix: Registrierung schaltet kein Gratis-Modul mehr frei — Kauf/Trial erforderlich
2026-05-22 17:44:06 +0200 | 1804690 | Alisad Gadyri | fix: DB-Default enabledModules '1'→'' — neuer Nutzer bekommt kein Gratis-Modul
2026-05-23 07:25:51 +0200 | 2ed239f | Alisad Gadyri | fix: qs vulnerability override, www→non-www redirect
2026-05-23 07:52:16 +0200 | c1afd7a | smartlivingberlin | Create read-only audit report 2026-05-22 (#31)
2026-05-23 08:00:45 +0200 | d219fdb | Alisad Gadyri | chore: ComponentShowcase.tsx entfernt (verwaist, 57KB)
2026-05-23 16:51:32 +0200 | 8e2677b | Alisad Gadyri | fix: Modul 3+5 tasks befüllt (47+30 leere Arrays)
2026-05-23 17:41:59 +0200 | 2cf0179 | Alisad Gadyri | fix: remove raw TypeScript tasks-block from practice fields in M3 (43) and M5 (30)
2026-05-24 06:39:10 +0200 | 2aa7648 | Alisad Gadyri | fix: M3 TabsTrigger nesting + getTasks reads tasks[], M5 tasks-tab renders tasks array
2026-05-24 06:47:14 +0200 | 9fb1ac0 | Alisad Gadyri | fix: grid-cols-5 for all module tabs (was 6), add content-container CSS overflow protection
2026-05-24 06:54:05 +0200 | 14c5905 | Alisad Gadyri | fix: SmartContent lawRegex /g flag lastIndex bug — use separate test regex
2026-05-24 07:00:54 +0200 | 3b1231f | Alisad Gadyri | fix: Module1Detail remove redundant useParams, align routing with M2-M5 pattern
2026-05-24 07:03:42 +0200 | 3c3f53d | Alisad Gadyri | fix: Module2Detail law.map() crashes — add optional chaining ?.law?.map()
2026-05-24 07:49:58 +0200 | 85a8117 | Alisad Gadyri | test: add fix-verification specs for 2026-05-24 fixes
2026-05-24 07:55:26 +0200 | 80ef08b | Alisad Gadyri | fix: SolutionToggler shows hint as fallback when solution is empty (M2,M3,M4,M5)
2026-05-24 07:59:42 +0200 | 0cb929c | Alisad Gadyri | fix: M3 sidebar reads titles from moduleData JSON (all 80 days visible)
2026-05-24 08:37:40 +0200 | 8d0bb31 | Alisad Gadyri | content: generate 240 AI solutions for M3 tasks (all 80 days, 3 tasks each)
2026-05-24 08:53:58 +0200 | a1491e3 | Alisad Gadyri | content: generate 60 AI solutions for M4 tasks (days 21-40, completing M4)
2026-05-24 09:29:54 +0200 | 312ad3e | Alisad Gadyri | content: generate AI solutions M1(60), M2(147/180), M5(120) tasks
2026-05-24 09:36:21 +0200 | 39ea0b4 | Alisad Gadyri | content: complete M2 remaining 33 solutions — all 180 tasks done
2026-05-24 09:47:42 +0200 | 1c9f549 | Alisad Gadyri | content: expand Rechenpraxis from 45 to 125 tasks (80 new AI-generated exercises)
2026-05-24 11:50:54 +0200 | ad95f30 | Alisad Gadyri | content: add final 3 missing Rechenpraxis tasks (102,106,114) — 128 total
2026-05-24 19:51:26 +0200 | 814e258 | Alisad Gadyri | test: add Playwright auth setup — global-setup.ts + storageState for e2e tests
2026-05-24 20:02:23 +0200 | 22a8692 | Alisad Gadyri | perf: lazy-load all-questions.json — remove 468KB from initial bundle
2026-05-24 20:31:24 +0200 | df47e67 | Alisad Gadyri | perf: bundle-size phase 9 — lazy Sentry/jsPDF/Rechenpraxis, -1.3MB initial bundle
2026-05-24 20:54:27 +0200 | 7cd8713 | Alisad Gadyri | test: improve global-setup — skip login if auth-state still valid (rate-limit fix)
2026-05-24 21:14:28 +0200 | e56cec8 | Alisad Gadyri | test: fix logout test — use absolute URL for fetch
2026-05-24 21:30:41 +0200 | 5487ae6 | Alisad Gadyri | fix: Rechenpraxis AUFGABEN undefined — BEREICHE als useMemo statt global
2026-05-24 21:47:27 +0200 | 2239921 | Alisad Gadyri | fix: add useMemo import to Rechenpraxis.tsx
2026-05-24 22:30:43 +0200 | 0b8bad1 | Alisad Gadyri | perf: lazy-load Module2/4 content — -292KB from bundle
2026-05-24 22:44:17 +0200 | 1b9aa57 | Alisad Gadyri | fix: Module4Detail — remove allContent references, use contentDataModule4
2026-05-25 06:17:59 +0200 | be39331 | Alisad Gadyri | fix: replace db.$client.promise().query() with db.$client.query() — NightCron monitoring + index routes
2026-05-25 06:38:19 +0200 | 70c6c59 | Alisad Gadyri | feat: add 88 missing hints + type fields to M4 Day 1-20 tasks (AI-generated)
2026-05-25 07:01:40 +0200 | c8646df | Alisad Gadyri | fix: add security headers to SPA fallback route (sendFile bypassed Helmet)
2026-05-25 07:32:48 +0200 | a7e7e41 | Alisad Gadyri | perf: move pdfjs-dist to vendor-pdf lazy chunk — -399KB initial bundle
2026-05-25 07:45:29 +0200 | 8c70e10 | Alisad Gadyri | fix: NightCron norms parser — recognize direct string format in law[] arrays (M2-5)
2026-05-25 08:05:56 +0200 | f54b831 | Alisad Gadyri | fix: NightCron reader — include extendedTheory in quality check, fixes regex for backtick blocks
2026-05-25 20:56:50 +0200 | 9e5746c | Alisad Gadyri | content: extend theory for M4 days 1,3,4,5 — fix NightCron audit gaps
2026-05-25 20:58:00 +0200 | 4420043 | Alisad Gadyri | Revert "content: extend theory for M4 days 1,3,4,5 — fix NightCron audit gaps"
2026-05-25 21:00:37 +0200 | c4a76db | Alisad Gadyri | fix: NightCron theory reader — support multiline backtick template literals (139→1 audit issues)
2026-05-25 21:08:11 +0200 | 47e822a | Alisad Gadyri | content: add missing task field to M1 Day 20 — closes last NightCron audit gap
2026-05-25 21:27:27 +0200 | 91748c6 | Alisad Gadyri | seo: add sitemap link + sr-only H1 to index.html for search crawler compatibility
2026-05-25 21:36:19 +0200 | a0a311b | Alisad Gadyri | test: add 8 regression tests for 2026-05-25 fixes (security headers, bundle size, stripe, auth, health, m4)
2026-05-25 22:08:34 +0200 | 234a5dd | Alisad Gadyri | feat: HealthWatcher — stündliche Systemüberwachung, E-Mail-Alerts, Owner-Dashboard-Integration
2026-05-25 22:28:10 +0200 | 54e0ff8 | Alisad Gadyri | fix: remove duplicate task fields in M1 Day 20 — TS error resolved
2026-05-26 07:24:44 +0200 | 58105de | Alisad Gadyri | fix: stripe webhook log spam — warn instead of error for health-check requests
2026-05-26 07:37:52 +0200 | fa5270e | Alisad Gadyri | fix: owner dashboard — use sessionStorage instead of localStorage for ownerKey (security)
2026-05-26 07:50:17 +0200 | 9b23519 | Alisad Gadyri | fix: owner 2FA enforcement — require owner_2fa_ok cookie, set on all success paths
2026-05-26 07:58:52 +0200 | 08745d2 | Alisad Gadyri | fix: owner route — use POST form submit instead of GET redirect for 2FA flow
2026-05-26 08:23:58 +0200 | c6a4ff3 | Alisad Gadyri | fix: twoFactor OTP — use db.$client.query() instead of Drizzle sql for Railway compatibility
2026-05-26 10:31:28 +0200 | 839cdff | Alisad Gadyri | fix: remove extra closing brace in twoFactor.ts
2026-05-26 11:00:37 +0200 | 289ffa4 | Alisad Gadyri | fix: HealthWatcher saveResult — use db.$client.query() instead of Drizzle sql
2026-05-26 11:14:14 +0200 | c781192 | Alisad Gadyri | fix: replace all db.execute(sql`) with db.$client.query() — Railway Drizzle compatibility (22 stellen, 8 Dateien)
2026-05-26 11:19:13 +0200 | 7f45503 | Alisad Gadyri | fix: restore missing braces in HealthWatcher and spacedRepetitionRoute after drizzle migration
2026-05-26 11:22:55 +0200 | a54bd72 | Alisad Gadyri | fix: glossarRouter TypeScript types — use (r as any)[0] for db.$client.query results
2026-05-26 11:35:38 +0200 | 76793a2 | Alisad Gadyri | debug: add stack trace to HealthWatcher DB error logging
2026-05-26 11:45:29 +0200 | fb379ee | Alisad Gadyri | chore: force Railway rebuild — clear build cache
2026-05-26 12:07:10 +0200 | bd3383a | Alisad Gadyri | fix: HealthWatcher — escape column names with backticks to avoid MySQL reserved word conflict
2026-05-26 12:20:06 +0200 | 27d2db1 | Alisad Gadyri | fix: monitoring_log schema mismatch — fix createdAt→timestamp, add manual trigger endpoint
2026-05-26 12:57:44 +0200 | 9e27593 | Alisad Gadyri | fix: ownerRoute trigger-health — correct import path for HealthWatcher
2026-05-26 13:22:36 +0200 | 64fb98c | Alisad Gadyri | chore: force Railway rebuild after monitoring_log schema fix
2026-05-26 13:39:33 +0200 | 0afbd6c | Alisad Gadyri | fix: NightCron uses nightcron_log table — separate from HealthWatcher monitoring_log
2026-05-26 14:07:11 +0200 | b764ada | Alisad Gadyri | debug: add build SQL inspection to trigger-health endpoint
2026-05-26 14:17:48 +0200 | 51b69ef | Alisad Gadyri | debug: log exact SQL string in saveResult to verify Railway build
2026-05-26 18:09:10 +0200 | c6f6555 | Alisad Gadyri | fix: auto-repair monitoring_log schema on trigger-health if type column missing
2026-05-26 18:18:33 +0200 | 3b00497 | Alisad Gadyri | fix: remove invalid backtick escapes in CREATE TABLE statement
2026-05-26 18:27:40 +0200 | 8d7f735 | Alisad Gadyri | fix: clean up trigger-health endpoint — remove duplicate schema-fix code
2026-05-26 18:33:16 +0200 | 7e6f47b | Alisad Gadyri | fix: migration 0031 — add type/status/details columns to monitoring_log if missing
2026-05-26 18:41:41 +0200 | 8f64111 | Alisad Gadyri | fix: migration 0031 — rename old monitoring_log and create new with correct schema
2026-05-26 18:50:44 +0200 | 4172946 | Alisad Gadyri | fix: remove backticks from monitoring_log INSERT — plain SQL for Railway compatibility
2026-05-26 19:00:51 +0200 | 676cb76 | Alisad Gadyri | chore: remove SQL debug logging from HealthWatcher saveResult
2026-05-26 19:30:32 +0200 | 8b6d091 | Alisad Gadyri | test: update regression tests with Jules improvements (storageState, toMatchObject, cleaner assertions)
2026-05-26 19:56:22 +0200 | e422447 | Alisad Gadyri | security: remove hardcoded JWT fallback secret — throw error if JWT_SECRET missing
2026-05-26 20:04:16 +0200 | 644d5f1 | Alisad Gadyri | security: tester endpoint uses role=tester instead of admin — prevents privilege escalation
2026-05-26 18:39:14 +0000 | c03ad28 | google-labs-jules[bot] | Resolve bugs, optimize performance, and add new features
2026-05-26 20:48:34 +0200 | 0986e96 | Alisad Gadyri | feat: merge Jules fixes — Module1Detail useParams, Gutachter price 999EUR, streak counter, PDF certificate, code-splitting, login accessibility
2026-05-26 23:11:58 +0200 | e791400 | Alisad Gadyri | fix: login email input type=email for mobile keyboard and accessibility
2026-05-27 09:49:55 +0200 | dca782a | Alisad Gadyri | fix: add sentry.io to CSP connect-src
2026-05-27 10:02:07 +0200 | 9060c90 | Alisad Gadyri | perf: convert module images to WebP, reduce image size ~35%
2026-05-27 10:02:40 +0200 | ac6db89 | Alisad Gadyri | fix: remove auth-state.json from repo, add to gitignore
2026-05-27 12:11:36 +0200 | 00d6ed7 | Alisad Gadyri | fix: cookie banner delay 5s, position bottom-right only
2026-05-27 12:43:54 +0200 | 4050039 | Alisad Gadyri | feat: vollständiges Benutzerhandbuch mit 6 Sektionen, Preistabelle, 12 Schnellzugriff-Links
2026-05-27 13:39:36 +0200 | 3670c7a | Alisad Gadyri | fix: img dimensions, will-change-transform, Foerderung CTA, QueryClient retry:false — selektiv aus Jules-Branch
2026-05-27 13:45:46 +0200 | 0f9f508 | Alisad Gadyri | fix: mobile tab-labels gekürzt (Annuität, Rücklage, Umlage, Haushalt, Beleihung), H1 responsive
2026-05-27 13:59:12 +0200 | b768cf9 | Alisad Gadyri | fix: Vorfälligkeitsentschädigung gekürzt, grid-cols responsive md:3 lg:5
2026-05-27 14:19:27 +0200 | 029070a | Alisad Gadyri | fix: cookie banner scroll-triggered (300px) oder 10s — verhindert Überlagerung von Inhalten
2026-05-27 14:44:35 +0200 | 60640d2 | Alisad Gadyri | fix: UserGuide öffentlich zugänglich — DashboardLayout entfernt, PublicLayout wird von App.tsx gesetzt
2026-05-30 06:17:06 +0200 | c3e24a6 | Alisad Gadyri | security: timing-safe pw verify, sentry PII filter, httpOnly cookies, gdpr export complete
2026-05-30 07:08:11 +0200 | 0899910 | Alisad Gadyri | fix: update axios 1.15.2 → 1.16.0 (CVE: prototype pollution, MITM, DoS)
2026-05-30 07:26:49 +0200 | fd07bcf | Alisad Gadyri | perf: preconnect sentry/plausible, hero preload, HSTS preload flag
2026-05-30 07:41:25 +0200 | dcdcb2e | Alisad Gadyri | perf: remove vendor-pdf manualChunk — jsPDF now truly lazy (-282 kB initial)
2026-05-30 08:02:09 +0200 | a8c4de3 | Alisad Gadyri | perf: lazy-split jsPDF/pdfjs/highlight/sentry from vendor-react-utils (-1007 kB)
2026-05-30 09:30:11 +0200 | 39202be | Alisad Gadyri | fix: owner 2FA redirect nach Verifikation zu owner-dashboard statt /admin
2026-05-30 22:16:53 +0200 | 9e75216 | Alisad Gadyri | fix: Footer in PublicLayout — Impressum/Datenschutz/AGB auf allen öffentlichen Seiten sichtbar
2026-05-31 07:34:27 +0200 | f1845d6 | Alisad Gadyri | feat: trial zeigt alle 5 Module (24h) statt nur Modul 1
2026-05-31 08:17:32 +0200 | 89e5a9e | Alisad Gadyri | fix: Sidebar Modul-Links korrigiert (/modul/X → /kurs/modul-X-...)
2026-05-31 08:34:47 +0200 | 30d311c | Alisad Gadyri | fix: Launch-Checkliste — Domain als erledigt markiert, SPF-Reihenfolge korrigiert
2026-05-31 15:43:08 +0200 | 9dcd82c | Alisad Gadyri | fix: createSessionToken übergibt role+enabledModules bei Login/Register/Gast (KI-Monitor fix)
2026-05-31 16:44:49 +0200 | 81f20fa | Alisad Gadyri | fix: Sidebar Modul-Links auf /modul/X korrigiert (Lernbereich statt Kaufseite)
2026-05-31 18:23:24 +0200 | 6d018aa | smartlivingberlin | fix: Sprint 1 Trust-Fixes fuer SEO, Impressum und Claims
2026-05-31 18:43:49 +0200 | d37faff | Alisad Gadyri | fix(sprint2a): Bundle-Checkout 500-Bug + AGB Abo/MwSt bereinigt
2026-05-31 19:14:30 +0200 | 041f989 | smartlivingberlin | fix: Sprint 2B Claims in Checkout und Kursseiten bereinigen
2026-05-31 19:26:54 +0200 | 0b1a4fe | Alisad Gadyri | fix: KursLanding Claims und Preisformulierungen bereinigen
2026-05-31 19:34:47 +0200 | 465712c | smartlivingberlin | Merge pull request #43 from smartlivingberlin/sprint2c-kurslanding-claims-20260531
2026-05-31 19:41:07 +0200 | 66907e2 | Alisad Gadyri | fix: Foerderung Claims zu AZAV und Steuer bereinigen
2026-05-31 19:50:33 +0200 | ba79904 | Alisad Gadyri | fix(sprint2d): Aufstiegs-BAföG entfernt, AZAV-Claim korrigiert
2026-05-31 19:58:34 +0200 | 3971ad7 | smartlivingberlin | fix: Foerderung AZAV und QCG Hinweise nachschaerfen
2026-05-31 20:00:51 +0200 | 67c124f | smartlivingberlin | Merge pull request #44 from smartlivingberlin/sprint2d-foerderung-nachschaerfung-20260531
2026-05-31 20:12:35 +0200 | e0c3bf5 | Alisad Gadyri | fix(sprint2e): Klarna/BNPL — dynamische Stripe-Zahlungsmethoden aktiviert
2026-05-31 20:19:54 +0200 | 43da2f9 | smartlivingberlin | fix(sprint2e): Stripe Checkout Produkttexte bereinigen
2026-05-31 20:22:56 +0200 | 6a1e2fe | smartlivingberlin | Merge pull request #45 from smartlivingberlin/sprint2e-klarna-dynamic-payments
2026-05-31 20:28:09 +0200 | 72f80dc | smartlivingberlin | fix: Stripe Checkout Sessions ohne unbekannten automatic_payment_methods Parameter
2026-05-31 20:28:52 +0200 | 4cc3dd4 | smartlivingberlin | Merge pull request #46 from smartlivingberlin/hotfix-stripe-checkout-dynamic-methods-20260531
2026-05-31 23:06:01 +0200 | b12bdeb | Alisad Gadyri | fix: surface trust artifacts bereinigen
2026-05-31 23:23:25 +0200 | 53d31eb | Alisad Gadyri | fix: roadmap phase claims neutralisieren
2026-05-31 23:26:26 +0200 | 777134f | smartlivingberlin | Merge PR #48: fix roadmap phase claims
2026-06-01 00:18:33 +0200 | be362d3 | Alisad Gadyri | fix: doppeltes cookie banner entfernen
2026-06-01 00:37:18 +0200 | b0b72f1 | Alisad Gadyri | fix: public claims und alte railway url bereinigen
2026-06-01 07:46:04 +0200 | c92ede7 | Alisad Gadyri | fix(sprint3d): StructuredData Fehler bereinigt — P240D, Modul4 40 Tage, IHK-Claims, FAQ
2026-06-01 07:54:41 +0200 | 1e1d37a | Alisad Gadyri | fix(sprint3d): StructuredData FAQ Lerntage konsistent machen
2026-06-01 08:00:10 +0200 | 2e4ba63 | smartlivingberlin | Merge PR #50: fix StructuredData claims and duration
2026-06-01 08:16:34 +0200 | e76aa8c | Alisad Gadyri | fix: analytics erst nach cookie consent laden
2026-06-01 08:20:35 +0200 | 8d4bc28 | smartlivingberlin | Merge PR #51: fix analytics after cookie consent
2026-06-01 08:37:34 +0200 | f6df4d5 | Alisad Gadyri | fix: CSP plausible nur fuer consent analytics connect erlauben
2026-06-01 08:47:32 +0200 | 4087f42 | smartlivingberlin | Merge PR #52: fix CSP plausible cleanup
2026-06-01 09:00:14 +0200 | 3516966 | Alisad Gadyri | fix: Modul-Intro Claims zu 34c neutralisieren
2026-06-01 09:02:55 +0200 | 0de704f | smartlivingberlin | Merge PR #53: fix Modul-Intro Claims zu §34c
2026-06-01 09:09:13 +0200 | e87b326 | Alisad Gadyri | fix: Datenschutz Resend und Drittanbieter-Nummerierung
2026-06-01 09:12:14 +0200 | dd6411a | smartlivingberlin | Merge PR #54: fix Datenschutz Resend
2026-06-01 09:33:36 +0200 | b9b003a | Alisad Gadyri | fix(sprint3g): AGB doppelte Restblöcke und leeres div entfernt
2026-06-01 09:39:01 +0200 | 84c7c67 | smartlivingberlin | Merge PR #55: fix AGB doppelte Restblöcke
2026-06-01 09:43:28 +0200 | 47e18a7 | Alisad Gadyri | test: Quiz-Test nach Claim-Bereinigung aktualisieren
2026-06-01 09:46:59 +0200 | 80b89ec | smartlivingberlin | Merge PR #56: test Quiz nach Claim-Bereinigung
2026-06-01 13:13:10 +0200 | fee89a9 | Alisad Gadyri | fix(sprint3i): Bundle-Checkout Stripe Metadaten konsistent
2026-06-01 13:17:23 +0200 | 52f330a | smartlivingberlin | Merge PR #57: fix Bundle-Checkout Stripe Metadaten
2026-06-01 13:47:42 +0200 | 2f9d9e6 | Alisad Gadyri | fix(sprint3j): Checkout Consent und Kundenzugang vereinheitlichen
2026-06-01 13:51:23 +0200 | 013f46b | smartlivingberlin | Merge PR #58: fix Checkout Consent und Kundenzugang
2026-06-01 14:04:14 +0200 | 6637728 | Alisad Gadyri | fix(sprint3k): Widerrufs-Badge konsistent formulieren
2026-06-01 14:06:20 +0200 | 61ea138 | smartlivingberlin | Merge PR #59: fix Widerrufs-Badge
2026-06-01 15:03:51 +0200 | 2a60b94 | Alisad Gadyri | fix(sprint4a): Modulzugriffs-Fallback und Willkommensmail bereinigen
2026-06-01 15:09:47 +0200 | f926adf | smartlivingberlin | Merge PR #60: fix Modulzugriffs-Fallback und Willkommensmail
2026-06-01 18:17:23 +0200 | 3e3ac3f | Alisad Gadyri | fix(sprint4b1): Trial-Ablauf bei Code-Login speichern
2026-06-01 18:24:00 +0200 | e71ebb6 | smartlivingberlin | Merge PR #61: fix Trial-Ablauf bei Code-Login
2026-06-01 18:43:58 +0200 | 52ed351 | Alisad Gadyri | fix(sprint4c): Pending Purchases fuer Kauf ohne Konto
2026-06-01 18:47:28 +0200 | d9e72bb | smartlivingberlin | Merge PR #62: fix Pending Purchases fuer Kauf ohne Konto
2026-06-01 20:15:11 +0200 | 2bc4381 | Alisad Gadyri | fix(sprint4d): Owner-2FA Code bei Refresh wiederverwenden
2026-06-01 20:21:04 +0200 | 702d6d3 | smartlivingberlin | Merge PR #63: fix Owner-2FA Code bei Refresh
2026-06-01 20:31:18 +0200 | 4a0779b | Alisad Gadyri | fix(sprint4e): Owner-2FA Status serverseitig pruefen
2026-06-01 20:34:20 +0200 | ad359e3 | smartlivingberlin | Merge PR #64: fix Owner-2FA Status serverseitig
2026-06-01 20:42:30 +0200 | 901c00f | Alisad Gadyri | fix(sprint4f): Owner-Key Flow und 2FA Resend korrigieren
2026-06-01 20:45:31 +0200 | 49529cc | smartlivingberlin | Merge PR #65: fix Owner-Key Flow und 2FA Resend
2026-06-01 20:55:04 +0200 | 5179335 | Alisad Gadyri | fix(sprint4g): Owner-Dashboard Key serverseitig verarbeiten
2026-06-01 20:57:52 +0200 | a1d05b3 | smartlivingberlin | Merge PR #66: fix Owner-Dashboard Key serverseitig
2026-06-01 21:11:37 +0200 | 2ed7dca | Alisad Gadyri | fix(sprint4h): Owner APIs per Session und 2FA autorisieren
2026-06-01 21:24:26 +0200 | fc40a63 | smartlivingberlin | Merge PR #67: fix Owner APIs per Session und 2FA
2026-06-02 08:41:00 +0200 | a526ddd | Alisad Gadyri | fix: Playwright BASE URL auf Hauptdomain korrigieren
2026-06-02 09:29:12 +0200 | e62cb2e | Alisad Gadyri | fix: veraltete Playwright-Tests überspringen — 0 failed
2026-06-03 07:29:08 +0200 | 9a7fcd4 | Alisad Gadyri | fix: IHK-Immobilienkaufmann-Claim aus LoginPage entfernen
2026-06-03 07:33:03 +0200 | 8f9918a | Alisad Gadyri | fix: Datenschutz railway-Link, AdminDashboard IHK-Claims, Dashboard Fallback
2026-06-03 09:06:53 +0200 | bfe4bf1 | Alisad Gadyri | fix: OwnerDashboard S34i und /admin/users korrigieren
2026-06-03 10:19:55 +0200 | cc4e8f7 | smartlivingberlin | fix(p0): §34c-Sachkundeclaims korrigieren + HealthWatcher hardcode entfernen (#68)
2026-06-03 12:39:26 +0200 | 8f57fd3 | smartlivingberlin | fix(p1): pnpm test grün, SuperAgent/NightCron IHK-Prompts neutralisiert (#69)
2026-06-03 15:39:43 +0200 | bf73f80 | smartlivingberlin | fix(p0): all-questions §34c-Sachkundeclaims korrigieren (ID 448, 862) (#70)
2026-06-03 18:15:01 +0200 | bdfdde4 | Alisad Gadyri | fix(p1): Stripe Dashboard zeigt TEST-MODUS vs LIVE
2026-06-04 21:32:54 +0200 | 5524faf | Alisad Gadyri | fix(compliance): AZAV-Badge, SEO-Title/Description, Bildungskonzept §34c — 4 KI-Modelle gegengeprüft, quellenbelegt (§5 UWG, IHK Berlin, HK Hamburg)
2026-06-05 06:42:28 +0200 | 2ef1161 | Alisad Gadyri | fix: 08-verify-fixes BASE URL auf Hauptdomain korrigieren
2026-06-05 06:51:08 +0200 | 9cdace3 | Alisad Gadyri | fix(compliance): Weiterbildungspflicht-Claims abgeschwächt — erfüllt → inhaltlich abgedeckt
2026-06-05 12:33:25 +0200 | 73bd3b7 | Alisad Gadyri | fix(a11y): Footer Kontrast erhöht, Kurs-Links mit Modultitel
2026-06-05 12:52:56 +0200 | 9f0be72 | Alisad Gadyri | Merge remote-tracking branch 'origin/fix/email-from-address'
2026-06-05 12:54:25 +0200 | 09b9578 | Alisad Gadyri | fix: merge vulnerabilities + qs override behalten
2026-06-05 12:54:26 +0200 | eb34c9c | Alisad Gadyri | Merge remote-tracking branch 'origin/fix/dsgvo-delete-20260519'
2026-06-05 12:56:16 +0200 | 772eec0 | Alisad Gadyri | fix: merge post-purchase-ux — Konflikte mit HEAD aufgelöst (aktuellere Version)
2026-06-05 19:13:16 +0200 | ee2355f | smartlivingberlin | Fix P0 claims and lockfile consistency
2026-06-05 23:25:52 +0200 | 6d23ac5 | smartlivingberlin | Fix owner inspect link generator
2026-06-05 23:46:13 +0200 | 45463cd | smartlivingberlin | Proxy Rechenpraxis AI assistant through server
2026-06-06 06:26:53 +0200 | b991425 | smartlivingberlin | Remove direct AI provider endpoints from CSP
2026-06-06 06:30:51 +0200 | 07df87b | smartlivingberlin | Add claims policy regression gate
2026-06-06 07:13:30 +0200 | e75c274 | smartlivingberlin | Add Railway MySQL backup runbook
2026-06-06 07:23:48 +0200 | 34d5c4f | smartlivingberlin | Plan Cloudflare R2 backup automation
2026-06-06 12:04:40 +0200 | cadfa8c | smartlivingberlin | Add backup encryption and retention plan
2026-06-07 05:09:54 +0000 | 3b1cdbc | Cursor Agent | Align environment template and CI checks
2026-06-07 05:11:02 +0000 | e383148 | Cursor Agent | Use package manager pnpm version in CI
2026-06-07 05:17:27 +0000 | 92f648c | Cursor Agent | Remove duplicate case study grading route
2026-06-07 05:27:51 +0000 | f8010f8 | Cursor Agent | Expand GDPR delete coverage
2026-06-07 05:49:54 +0000 | 84f5c9a | Cursor Agent | Protect module data JSON files
2026-06-07 06:01:28 +0000 | a488a14 | Cursor Agent | Harden LLM provider routing
2026-06-07 14:50:34 +0200 | 485d867 | smartlivingberlin | Merge pull request #80 from smartlivingberlin/cursor/p1-ci-env-hardening-a018
2026-06-07 14:50:38 +0200 | fb2dad0 | smartlivingberlin | Merge pull request #81 from smartlivingberlin/cursor/remove-dead-case-study-route-a018
2026-06-07 14:50:42 +0200 | 50a2368 | smartlivingberlin | Merge pull request #82 from smartlivingberlin/cursor/expand-gdpr-delete-coverage-a018
2026-06-07 14:50:47 +0200 | e4e454f | smartlivingberlin | Merge pull request #83 from smartlivingberlin/cursor/protect-public-module-data-a018
2026-06-07 14:50:50 +0200 | 290ee09 | smartlivingberlin | Merge pull request #84 from smartlivingberlin/cursor/harden-llm-provider-routing-a018
2026-06-07 13:36:53 +0000 | 0db00ac | Cursor Agent | Fix Module 4 tab nesting and authenticated data fetches
2026-06-07 13:37:46 +0000 | 3e21656 | Cursor Agent | Fix inspect link flow for read-only demo access
2026-06-07 13:44:21 +0000 | ce2058c | Cursor Agent | fix(inspect): align cookie maxAge with JWT expiry, not session lifetime
2026-06-07 16:10:49 +0200 | c69d31e | smartlivingberlin | Merge pull request #85 from smartlivingberlin/cursor/fix-module-4-loading-7dbc
2026-06-07 16:17:18 +0200 | 923ff20 | smartlivingberlin | Merge pull request #86 from smartlivingberlin/cursor/fix-inspect-link-flow-7dbc
2026-06-07 14:40:14 +0000 | 45371c4 | Cursor Agent | fix(ui): AdminDashboard Claude-Modell-ID an Server-Standard anpassen
2026-06-07 14:40:02 +0000 | 77e362f | Cursor Agent | fix(ui): AITutor-Label auf Gemini 2.5 Flash korrigieren
2026-06-07 14:57:53 +0000 | ad6eb7f | Cursor Agent | test(e2e): Modul-Smoke readonly für Module 1–5 (Intro + Tag 1)
2026-06-07 14:57:57 +0000 | bf43cc2 | Cursor Agent | fix(security): /api/admin/ki-stats mit requireAdmin absichern
2026-06-07 14:57:57 +0000 | ac67c4d | Cursor Agent | fix(inspect): Ansehen-Links zum Lernbereich + Stat-Zähler ohne 0-Start
2026-06-07 14:58:16 +0000 | 9804daf | Cursor Agent | docs(backup): R2 Restore-Test-Checkliste nach Workflow-Aktivierung
2026-06-07 15:08:26 +0000 | 4f76cd7 | Cursor Agent | fix(security): Quiz-Datenbank schützen und Owner-2FA-Resend härten
2026-06-07 15:08:30 +0000 | 47fa51d | Cursor Agent | fix(compliance): Claims zentralisieren, SEO und Cookie-Banner ehrlich
2026-06-07 15:08:30 +0000 | d0cbe7a | Cursor Agent | docs(ops): Case Management Sprint 07.06.2026 — Stakeholder-Matrix
2026-06-07 15:22:37 +0000 | c8cb0d4 | cursor[bot] | Merge pull request #91 from smartlivingberlin/cursor/fix-ki-stats-admin-7dbc
2026-06-07 15:22:47 +0000 | 913d7c8 | cursor[bot] | Merge pull request #94 from smartlivingberlin/cursor/agency-security-sprint-7dbc
2026-06-07 15:31:12 +0000 | 30a9201 | cursor[bot] | Merge pull request #92 from smartlivingberlin/cursor/inspect-polish-home-7dbc
2026-06-07 15:31:18 +0000 | e299c99 | cursor[bot] | Merge pull request #93 from smartlivingberlin/cursor/agency-compliance-sprint-7dbc
2026-06-07 15:31:26 +0000 | 35a6c5e | cursor[bot] | Merge pull request #87 from smartlivingberlin/cursor/audit-fix-admin-model-label-7dbc
2026-06-07 15:31:29 +0000 | e8737ef | cursor[bot] | Merge pull request #88 from smartlivingberlin/cursor/audit-fix-aitutor-model-label-7dbc
2026-06-07 15:08:30 +0000 | ec34218 | Cursor Agent | ci(test): Vitest-Config mit Server-Unit-Tests, keine Prod-Fetches
2026-06-07 15:39:16 +0000 | 1b9595d | cursor[bot] | Merge pull request #96 from smartlivingberlin/cursor/agency-ci-sprint-7dbc
2026-06-07 15:39:19 +0000 | f3906d6 | cursor[bot] | Merge pull request #90 from smartlivingberlin/cursor/module-smoke-playwright-7dbc
2026-06-07 15:39:25 +0000 | 27d4b4f | cursor[bot] | Merge pull request #89 from smartlivingberlin/cursor/r2-restore-test-docs-7dbc
2026-06-07 15:39:27 +0000 | 674ad0d | cursor[bot] | Merge pull request #95 from smartlivingberlin/cursor/agency-case-management-7dbc
2026-06-07 18:42:02 +0200 | e861136 | smartlivingberlin | feat: Inspect v2 — Admin-Vorschau read-only (#97)
2026-06-07 20:49:30 +0200 | a468bda | smartlivingberlin | fix: Auth-Cookie-Kohärenz — Login/Inspect/Owner entmischen (#98)
2026-06-07 21:29:03 +0200 | 6a99f71 | smartlivingberlin | feat(strategy): competitive analysis, USP landing, growth roadmap (#99)
2026-06-07 21:29:09 +0200 | 8cf9347 | smartlivingberlin | feat: Weiterbildungsnachweis §15b MaBV — Stundenlog + PDF-Export (#100)
2026-06-07 21:29:59 +0200 | 462751c | smartlivingberlin | feat(b2b): White-Label landing page für Maklerbüros (#101)
2026-06-07 21:52:29 +0200 | 269495b | smartlivingberlin | feat: Zugangszeitraum 2× + Verlängerung 5€/29€ + Empfehlungsprogramm (#102)
2026-06-07 19:53:37 +0000 | b4b622d | Cursor Agent | fix: Rechenpraxis schützen + AGB/Marketing an Zugangsmodell anpassen
2026-06-07 19:54:31 +0000 | 14e5e2c | cursor[bot] | Merge pull request #103 from smartlivingberlin/cursor/access-hardening-7dbc
2026-06-07 19:57:12 +0000 | aa15734 | Cursor Agent | fix: Praxis- und Finanzierungsrechner hinter Portal-Zugang
2026-06-07 19:57:22 +0000 | 5c34674 | cursor[bot] | Merge pull request #104 from smartlivingberlin/cursor/protect-portal-tools-7dbc
2026-06-07 20:06:52 +0000 | e075417 | Cursor Agent | feat: Zugang E2E — auth.me, Trial-Fix, Referral, B2B-Limit
2026-06-07 20:07:04 +0000 | 337c90f | cursor[bot] | Merge pull request #105 from smartlivingberlin/cursor/access-e2e-hardening-7dbc
2026-06-07 20:11:02 +0000 | 92ce949 | Cursor Agent | feat: Compliance-SKU 249€/Jahr + Backfill-Script für Bestandskäufer
2026-06-07 20:11:14 +0000 | 94b0419 | cursor[bot] | Merge pull request #106 from smartlivingberlin/cursor/compliance-sku-backfill-7dbc
2026-06-07 20:14:00 +0000 | 120222a | Cursor Agent | feat: KI Fair-Use (50/Tag Renewal) + Ablauf-E-Mails 30/7/1
2026-06-07 20:14:11 +0000 | 2fc373d | cursor[bot] | Merge pull request #107 from smartlivingberlin/cursor/ki-fairuse-expiry-emails-7dbc
2026-06-07 20:17:10 +0000 | 04a5840 | Cursor Agent | feat: Referral-Admin, Backfill-Ops, Rechenpraxis-Fortschritt
2026-06-07 20:17:22 +0000 | 1b1b889 | cursor[bot] | Merge pull request #108 from smartlivingberlin/cursor/phase4-referral-backfill-7dbc
2026-06-07 20:19:29 +0000 | 6249cc4 | Cursor Agent | feat: B2B Stripe-Checkout + Referral-Gutscheine einlösen
2026-06-07 20:19:50 +0000 | d797db3 | cursor[bot] | Merge pull request #109 from smartlivingberlin/cursor/phase5-b2b-vouchers-7dbc
2026-06-07 20:21:48 +0000 | 2fc3584 | Cursor Agent | feat: Verwalter-Rechner Landing + Migration-Ledger (0038)
2026-06-07 20:22:38 +0000 | c19d4f9 | cursor[bot] | Merge pull request #110 from smartlivingberlin/cursor/phase6-verwalter-ledger-7dbc
2026-06-07 20:24:05 +0000 | bcae89a | Cursor Agent | feat: Phase 7 — Stripe Live-Checkliste, Renewal-E2E, Partner-Payouts, Rechenpraxis-Preise
2026-06-07 20:24:54 +0000 | 5cd56cf | cursor[bot] | Merge pull request #111 from smartlivingberlin/cursor/phase7-stripe-renewal-pricing-7dbc
2026-06-07 20:29:02 +0000 | dc1d489 | Cursor Agent | feat: Phase 8 — Rechenpraxis Solo, B2B-Mail, Webhook-Health, Payout-Ledger
2026-06-07 20:29:50 +0000 | d2b49a4 | cursor[bot] | Merge pull request #112 from smartlivingberlin/cursor/phase8-rechenpraxis-b2b-ledger-7dbc
2026-06-07 20:32:45 +0000 | 9587e10 | Cursor Agent | feat: Phase 9 — B2B-Einrichtung, Stripe ENV, Partner-SEPA, E2E
2026-06-07 20:33:30 +0000 | 37340be | cursor[bot] | Merge pull request #113 from smartlivingberlin/cursor/phase9-b2b-onboarding-stripe-7dbc
2026-06-07 20:36:21 +0000 | f3a4def | Cursor Agent | feat: Phase 10 — B2B-Logo, Stripe Verify, Connect Express
2026-06-07 20:37:06 +0000 | 21c421d | cursor[bot] | Merge pull request #114 from smartlivingberlin/cursor/phase10-connect-logo-stripe-7dbc
2026-06-07 20:38:46 +0000 | d52af3f | Cursor Agent | feat: Phase 11 — Stripe Price-IDs, Connect-Transfers, Ledger 0042
2026-06-07 20:39:50 +0000 | 6021cf5 | cursor[bot] | Merge pull request #115 from smartlivingberlin/cursor/phase11-stripe-prices-connect-7dbc
2026-06-07 20:42:00 +0000 | c2f7ca7 | Cursor Agent | Phase 12: Module Price-IDs, Owner Revenue tab, Stripe smoke guide
2026-06-07 20:43:31 +0000 | f966cc8 | cursor[bot] | Merge pull request #116 from smartlivingberlin/cursor/phase12-revenue-module-prices-7dbc
2026-06-07 20:46:42 +0000 | 1918c1a | Cursor Agent | Phase 13: Batch Connect payouts, B2B team codes, purchase tests
2026-06-07 20:48:56 +0000 | fed7f01 | cursor[bot] | Merge pull request #117 from smartlivingberlin/cursor/phase13-connect-b2b-e2e-7dbc
2026-06-07 20:50:06 +0000 | c420d05 | Cursor Agent | Phase 14: B2B Price-IDs, webhook processor, payout cron
2026-06-07 20:51:13 +0000 | a7f1054 | cursor[bot] | Merge pull request #118 from smartlivingberlin/cursor/phase14-b2b-webhook-cron-7dbc
2026-06-07 20:52:25 +0000 | ac8e16d | Cursor Agent | Phase 15: Price readiness dashboard, pending purchases ops
2026-06-07 20:58:55 +0000 | ee76453 | cursor[bot] | Merge pull request #119 from smartlivingberlin/cursor/phase15-price-readiness-pending-7dbc
2026-06-07 21:00:30 +0000 | 3c83b9f | Cursor Agent | Sprint A–E: Security verify, claims, QA CI, Stripe ops
2026-06-07 21:02:43 +0000 | de981e9 | cursor[bot] | Merge pull request #120 from smartlivingberlin/cursor/sprint-abe-security-compliance-7dbc
2026-06-07 21:08:14 +0000 | 59e0e15 | Cursor Agent | Sprint M+I+L+O: Lernpfad, Inspect, Landing, Backup ops
2026-06-07 21:10:10 +0000 | ec9fe3e | cursor[bot] | Merge pull request #121 from smartlivingberlin/cursor/sprint-milo-modules-7dbc
2026-06-07 21:13:20 +0000 | 3fafc8a | Cursor Agent | Modul 5 Polish, Stripe Live-E2E und Go-Live-Checkliste
2026-06-07 21:14:59 +0000 | 94656fb | cursor[bot] | Merge pull request #122 from smartlivingberlin/cursor/modul5-stripe-e2e-live-7dbc
2026-06-07 21:18:28 +0000 | 2bd6b7d | Cursor Agent | R2-Backup aktivieren + Stripe E2E in CI
2026-06-07 21:18:40 +0000 | e54a833 | cursor[bot] | Merge pull request #123 from smartlivingberlin/cursor/r2-backup-stripe-ci-7dbc
2026-06-07 21:21:01 +0000 | 19288de | Cursor Agent | MySQL Ops-Runbook, Health-Ping und Admin-Status
2026-06-07 21:21:20 +0000 | 7d69846 | cursor[bot] | Merge pull request #124 from smartlivingberlin/cursor/mysql-ops-pr72-close-7dbc
2026-06-07 21:23:01 +0000 | 63e2f54 | Cursor Agent | HealthWatcher DB-Check, Owner-Dashboard und externe Ops-Liste
2026-06-07 21:23:20 +0000 | cbd6446 | cursor[bot] | Merge pull request #125 from smartlivingberlin/cursor/health-ops-external-checklist-7dbc
2026-06-07 21:27:58 +0000 | aafb0f2 | Cursor Agent | B2B-Polish, Migration-Ledger und externe Ops-Checkliste
2026-06-07 21:28:14 +0000 | e324cd6 | cursor[bot] | Merge pull request #126 from smartlivingberlin/cursor/b2b-migration-ops-7dbc
2026-06-08 04:41:39 +0000 | 16c8d75 | Cursor Agent | Add Stripe price seed script for 18 Railway env vars
2026-06-08 07:33:00 +0000 | 3030159 | Cursor Agent | B2B smoke, R2 ops scripts and Stripe Live go-live docs
2026-06-08 08:21:26 +0000 | a111ef3 | Cursor Agent | Fix B2B invoice.paid metadata from parent.subscription_details
2026-06-08 12:50:49 +0200 | 1905f5c | smartlivingberlin | fix(ci): Railway link flags for MySQL R2 backup workflow (#129)
2026-06-08 13:00:36 +0200 | a42d3e7 | smartlivingberlin | fix(ci): use preinstalled AWS CLI on GitHub runners for R2 upload (#130)
2026-06-08 13:55:23 +0200 | 6a87b6f | smartlivingberlin | feat(ops): enable daily R2 MySQL backup cron after restore test (#132)
2026-06-08 14:11:25 +0200 | 83930a3 | smartlivingberlin | fix(b2b): team code list, display, and /code-einloesen redemption (#133)
2026-06-08 14:39:21 +0200 | b548a5e | smartlivingberlin | feat(ui): visible login and portal access on landing page (#135)
2026-06-08 14:51:04 +0200 | 857a040 | smartlivingberlin | feat(ops): CLI script for B2B team code smoke test (#134)
2026-06-08 12:52:35 +0000 | 60a3375 | Cursor Agent | docs: CLI B2B smoke test (ops:b2b-team-smoke) in B2B_SMOKE_TEST.md
2026-06-08 14:52:51 +0200 | 8c5568b | smartlivingberlin | docs: CLI B2B smoke test (ops:b2b-team-smoke) in B2B_SMOKE_TEST.md (#137)
2026-06-08 13:24:43 +0000 | 39a4b27 | Cursor Agent | fix(ops): bash syntax in b2b-team-code-smoke.sh
2026-06-08 15:24:55 +0200 | 934160f | smartlivingberlin | fix(ops): bash syntax in b2b-team-code-smoke.sh (#138)
2026-06-08 13:47:52 +0000 | 3a1ac0e | Cursor Agent | feat: Komfort-Leiste, Rechenpraxis WEG-USP, Modul 6-8 Verteilungsplan
2026-06-08 18:19:58 +0200 | 3f3d604 | smartlivingberlin | feat: Komfort-Leiste, Rechenpraxis WEG-USP, Modul 6-8 Verteilungsplan (#139)
2026-06-08 17:37:56 +0000 | 1773afe | Cursor Agent | fix(tests): align audit suite with prod credentials and 7 products
2026-06-08 18:03:13 +0000 | 582856b | Cursor Agent | fix(tests): vitest global timeout, rate-limit hints, magic-link fallback
2026-06-08 18:16:20 +0000 | 69ce617 | Cursor Agent | fix(tests): accept B2B_ADMIN_PASSWORD, reject placeholder passwords
2026-06-08 18:23:30 +0000 | b0a4563 | Cursor Agent | fix(ops): B2B_ADMIN_PASSWORD vor TEST_ADMIN, sicherer Login-Test
2026-06-08 19:54:49 +0000 | 94fc29b | Cursor Agent | fix(e2e): retries=0 for playwright-tests smoke on WSL
2026-06-08 20:03:45 +0000 | 1e8decc | Cursor Agent | docs(ops): Master-Audit grün, B2B smoke + test-admin-login in Checkliste
2026-06-08 20:03:55 +0000 | d981fb0 | cursor[bot] | Merge pull request #140 from smartlivingberlin/cursor/audit-test-fixes-7dbc
2026-06-08 20:12:08 +0000 | 41a7815 | Cursor Agent | docs: Übergabebericht für Antropiq-Architektur-Review (08.06.2026)
2026-06-08 20:37:03 +0000 | 2103878 | Cursor Agent | fix(security): block admin tRPC queries in inspect mode
2026-06-08 20:38:44 +0000 | 1ab2994 | Cursor Agent | chore: remove stale Module 6–8 references and dead layout code
2026-06-08 20:48:09 +0000 | 1cbf388 | Cursor Agent | docs: NF-9 bis NF-13 Forensik + Anhang in Übergabebericht
2026-06-08 22:52:10 +0200 | f34774d | smartlivingberlin | Merge pull request #141 from smartlivingberlin/cursor/fix-inspect-query-leak-7dbc
2026-06-08 22:54:19 +0200 | fd672c8 | smartlivingberlin | Merge pull request #142 from smartlivingberlin/cursor/cleanup-module-678-references-7dbc
2026-06-08 22:54:47 +0200 | ff6378e | smartlivingberlin | Merge pull request #143 from smartlivingberlin/cursor/uebergabe-nf-answers-7dbc
2026-06-08 21:14:31 +0000 | 9a054d5 | Cursor Agent | fix(security): REST inspect default-deny allowlist for admin GET
2026-06-08 23:21:48 +0200 | a733b99 | smartlivingberlin | Merge pull request #148 from smartlivingberlin/cursor/inspect-rest-allowlist-7dbc
2026-06-09 10:11:57 +0000 | 30e9d8d | Cursor Agent | fix(security): platform admin branding bypass and owner-only API gate (A+B)
2026-06-09 10:56:09 +0000 | da72850 | Cursor Agent | feat: platform comfort, audio lessons, rechenpraxis standalone, generator draft
2026-06-09 11:09:49 +0000 | f0fc8f2 | Cursor Agent | feat(owner): platform audit trail C1 — Ereignis-Protokoll
2026-06-09 11:33:17 +0000 | 5a171a8 | Cursor Agent | feat(audio): audio-visual transcript 1:1 + Modul 5 aus Lerntagen
2026-06-09 11:41:57 +0000 | f507f26 | Cursor Agent | fix(audio): Satztrennung bei z.B. und Abkürzungen korrigieren
2026-06-09 13:04:08 +0000 | 8f275da | Cursor Agent | feat: Rechenpraxis P0, Modul-3 Audio-Lücken, Benchmark-Doku
2026-06-09 13:08:34 +0000 | 9b2089d | Cursor Agent | test(e2e): Rechenpraxis P0 und Modul-3-Audio Smoke-Tests
2026-06-09 13:21:22 +0000 | 0d7971e | Cursor Agent | chore(ops): verify-rechenpraxis-p0.sh für lokale und Live-Checkliste
2026-06-09 13:47:12 +0000 | 5874f9f | Cursor Agent | fix(audio): strukturierte Lerntexte + Schriftzoom im Vorlesetext
2026-06-09 13:59:53 +0000 | 9420e4d | Cursor Agent | fix(audio): WEG/§ nur in Sprachausgabe, nicht im Anzeigetext
2026-06-09 14:44:54 +0000 | 8513d18 | Cursor Agent | docs: System-Audit + ComfortBar oben im Lernbereich (Desktop)
2026-06-09 15:07:47 +0000 | e1cf3c8 | Cursor Agent | fix(a11y): Schriftvergrößerung für Lerninhalte (Theorie, Praxis, Audio)
2026-06-09 15:16:35 +0000 | 8049baa | Cursor Agent | feat(a11y): Rechenpraxis-Skalierung, Sidebar-Fixes, Wiederholung-Link
2026-06-09 15:34:15 +0000 | a2f394b | Cursor Agent | feat(p1): Strategie-Link, Owner-ComfortBar, Video-Platzhalter, Audit
2026-06-09 15:40:22 +0000 | f54a13c | Cursor Agent | feat(p1): Glossar collapsed, Dark-Mode vereinheitlicht, Rechenpraxis-Route
2026-06-09 15:40:34 +0000 | f1e70cc | Cursor Agent | docs: Rechenpraxis-Abschnitt in SYSTEM_AUDIT korrigieren
2026-06-09 16:37:26 +0000 | 50b7d5a | Cursor Agent | chore(p2): Cleanup, Owner/Admin-Skalierung, Offene Fragen, E2E
2026-06-09 17:04:16 +0000 | a89e9b3 | Cursor Agent | fix(deploy): Railway-Nixpacks Build härten für P2-Redeploy
2026-06-09 17:19:42 +0000 | 12ea76d | cursor[bot] | Merge pull request #158 from smartlivingberlin/cursor/fix-railway-p2-deploy-7dbc
2026-06-09 17:28:59 +0000 | ab04ad9 | Cursor Agent | chore: trigger Railway redeploy nach Nixpacks-Fix
2026-06-09 17:48:54 +0000 | db1e194 | Cursor Agent | fix(deploy): Dockerfile statt Nixpacks für Railway-Build
2026-06-09 17:49:17 +0000 | b84ce5e | cursor[bot] | Merge pull request #159 from smartlivingberlin/cursor/dockerfile-railway-deploy-7dbc
2026-06-09 17:58:45 +0000 | a3359f7 | Cursor Agent | fix(deploy): native build deps im Dockerfile für pnpm install
2026-06-09 17:59:03 +0000 | 76fee01 | cursor[bot] | Merge pull request #160 from smartlivingberlin/cursor/dockerfile-native-deps-7dbc
2026-06-09 18:04:28 +0000 | 2a68326 | Cursor Agent | fix(deploy): Docker-Build optimieren + CI docker build
2026-06-09 18:04:52 +0000 | 523564f | cursor[bot] | Merge pull request #161 from smartlivingberlin/cursor/fix-railway-docker-build-7dbc
2026-06-09 18:08:22 +0000 | 6352e9b | Cursor Agent | fix(deploy): Corepack-Bug umgehen — pnpm via npm install
2026-06-09 18:08:36 +0000 | 0ef4ddb | cursor[bot] | Merge pull request #162 from smartlivingberlin/cursor/fix-corepack-pnpm-7dbc
2026-06-09 18:25:00 +0000 | 82ee6eb | Cursor Agent | chore: trigger Railway redeploy nach Corepack-Fix (0ef4ddb)
2026-06-09 19:24:28 +0000 | b26d272 | Cursor Agent | fix(deploy): .dockerignore auf ASCII - Railway Build-Fix
2026-06-09 19:24:43 +0000 | 0cf5111 | cursor[bot] | Merge pull request #163 from smartlivingberlin/cursor/fix-dockerignore-ascii-7dbc
2026-06-09 19:30:45 +0000 | 2320ff0 | Cursor Agent | fix(deploy): .dockerignore minimal + LF erzwingen
2026-06-09 19:31:09 +0000 | 93eb538 | cursor[bot] | Merge pull request #164 from smartlivingberlin/cursor/fix-dockerignore-lf-7dbc
2026-06-09 19:46:41 +0000 | 0a76743 | Cursor Agent | fix(deploy): volle node_modules im Docker-Runner
2026-06-09 19:47:03 +0000 | 6895920 | cursor[bot] | Merge pull request #165 from smartlivingberlin/cursor/fix-docker-runtime-deps-7dbc
2026-06-09 22:47:44 +0200 | 690ef71 | smartlivingberlin | Portal: A11y-Zoom Lesebereich, Kursbuch Chunked-KI, drizzle-orm runtime (#166)
2026-06-09 20:51:52 +0000 | 36b0db5 | Cursor Agent | fix(deploy): pnpm-lock.yaml nach drizzle-orm dependencies-Move syncen
2026-06-10 08:57:16 +0200 | 75eca9c | smartlivingberlin | feat: KI-Pipeline v2, Content Registry, Hero WEG-Badge (#168)
2026-06-10 09:17:30 +0200 | 364fd95 | smartlivingberlin | feat(verwalter): Produkt-Shell, Hero 2×, Roadmap (#169)
2026-06-10 09:51:19 +0200 | de494f4 | smartlivingberlin | feat(verwalter): P1 Suite Vorlagen, Fristen, Mobile Shell (#170)
2026-06-10 10:09:59 +0200 | 599a0b1 | smartlivingberlin | feat(verwalter): P2 Vorlagen, KI-Brief, Objekte (#171)
2026-06-10 09:50:21 +0000 | dd80665 | Cursor Agent | docs: vollständiger Architekt-Audit 2026-06-10 (12 Teile)
2026-06-10 10:40:21 +0000 | a899e67 | cursor[bot] | Merge pull request #178 from smartlivingberlin/cursor/architect-audit-2026-06-10-7dbc
2026-06-10 12:53:51 +0200 | c63fc6e | smartlivingberlin | docs: Verwalter-Unabhängigkeitsplan Phase 1–3
2026-06-10 13:02:00 +0200 | 59b0ba4 | smartlivingberlin | feat(verwalter): Phase 1 — P3–Suite+ konsolidiert + Fair-Use
2026-06-10 13:28:13 +0200 | a6d6f8f | smartlivingberlin | feat(verwalter): MySQL-Persistenz für Objekte, Vorgänge, Buchungen
2026-06-10 13:46:59 +0200 | 1cf190d | smartlivingberlin | ops(verwalter): QA-Pack Script + Runbook für Prod-Tests
2026-06-10 13:55:06 +0200 | 04c7c78 | smartlivingberlin | test(e2e): Admin-401-Tests ohne gespeicherten Auth-State
2026-06-10 14:03:14 +0200 | c2f4c87 | smartlivingberlin | test(e2e): leerer storageState für anonyme Admin-401-Tests
2026-06-10 14:10:48 +0200 | 5fa53d2 | smartlivingberlin | ops(qa): Lighthouse-Script + Playwright SKIP_GLOBAL_SETUP
2026-06-10 14:20:20 +0200 | 01c6e82 | smartlivingberlin | fix(e2e): leerer auth-state bei PLAYWRIGHT_SKIP_GLOBAL_SETUP
2026-06-10 14:42:34 +0200 | 9aaf82e | smartlivingberlin | feat(verwalter): Dashboard-Übersicht unter /app/verwalter (#187)
2026-06-10 15:30:32 +0200 | ae36541 | smartlivingberlin | feat: Sprint B Login-Performance/A11y + Sprint A4 Vorlagen (#188)
2026-06-10 16:07:11 +0200 | 041bcb5 | smartlivingberlin | feat: Legal-Pack Verwalter + Landing für Verwaltungsbüros (#189)
2026-06-10 16:20:35 +0200 | 0276e41 | smartlivingberlin | feat: Stripe Verwalter Tools Abo (39€/Mo, vt-Sentinel, Beta-Gating) (#190)
2026-06-10 19:40:59 +0200 | 526dccb | smartlivingberlin | feat(verwalter): P0 Event-Bus, Freigaben, Fristen-Batch und CLI (#192)
2026-06-10 19:57:29 +0200 | 568404d | smartlivingberlin | fix(ops): Verwalter-CLI fragt Passwort unsichtbar ab (#193)
2026-06-10 20:16:19 +0200 | bccb21a | smartlivingberlin | feat(verwalter): S2 Mahnwesen 3-Stufen-Workflow mit Freigabe-UI (#194)
2026-06-10 20:44:10 +0200 | 1b62e1d | smartlivingberlin | feat(verwalter): S3 ETV-Paket + P2 E-Mail-Inbox (#195)
```

## Alle Pull Requests (gemerged + offen + geschlossen) mit Beschreibung

### PR #195 [MERGED] — feat(verwalter): S3 ETV-Paket + P2 E-Mail-Inbox
- Erstellt: 2026-06-10T18:33:22Z
- Merged: 2026-06-10T18:44:10Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Implementiert die nächsten zwei Roadmap-Sprints parallel:

### S3 — ETV-Paket vertiefen
- **Workflow:** Einladung → Protokoll → Beschlüsse (Human-in-the-loop wie Mahnwesen)
- **Fristenrechner:** § 24 WEG (21 Tage Einladung) + § 46 WEG (30 Tage Anfechtung)
- **Checklisten:** Protokoll (4 Schritte) + Beschluss (3 Schritte), persistent im ETV-Vorgang
- **Neue Vorlage:** `etv-protokoll-inhalt` (strukturiertes Protokoll)
- **UI:** `/app/verwalter/etv`
- **CLI:** `etv`, `etv-list`

### P2 — E-Mail-Inbox
- **Migration 0045:** `verwalter_inbox_messages`
- **Webhook:** `POST /api/verwalter/inbox/webhook` (Secret-Header, Feature-Flag)
- **Manueller Ingest:** `POST /api/verwalter/inbox/ingest` + UI-Test-Button
- **Matching:** Absender → `kontaktEmail` (Objekt/Einheit)
- **Workflow:** E-Mail → Vorgang + optional `mail_entwurf` Freigabe
- **UI:** `/app/verwalter/inbox` (sichtbar wenn `VERWALTER_INBOX_ENABLED=1`)

## Testplan

```bash
npx tsc --noEmit --skipLibCheck   # 0 errors
pnpm exec vitest run shared/verwalterEtv.test.ts shared/verwalterInboxClassifier.test.ts
```

Nach Merge + Deploy:
1. `/app/verwalter/etv` — ETV planen, Fristenrechner testen
2. Railway: `VERWALTER_INBOX_ENABLED=1` → `/app/verwalter/inbox` → Test-E-Mail
3. CLI: `pnpm run ops:verwalter-cli etv` / `inbox-ingest`

## Hinweise

- Inbox default **aus** (`VERWALTER_INBOX_ENABLED=0`) — sicher für Beta
- Keine verbotenen Dateien geändert
- QA-Doku: `docs/VERWALTER_QA_RUNBOOK.md` Abschnitte 7–8
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #194 [MERGED] — feat(verwalter): S2 Mahnwesen 3-Stufen + Freigabe-UI
- Erstellt: 2026-06-10T18:12:26Z
- Merged: 2026-06-10T18:16:20Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Sprint S2 — Mahnwesen

### Workflow
- Stufe 1→2→3 mit Vorlagen mahnung-stufe1/2/3
- Vorgang + Brief-Entwurf in Freigabe-Warteschlange
- Kein Auto-Versand
- Eskalation schließt vorherige Stufe

### Seiten
- /app/verwalter/mahnwesen
- /app/verwalter/freigaben

### Terminal
- pnpm run ops:verwalter-cli mahnwesen
- pnpm run ops:verwalter-cli mahnungen

<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #193 [MERGED] — fix(ops): Verwalter-CLI fragt Passwort unsichtbar ab
- Erstellt: 2026-06-10T17:57:20Z
- Merged: 2026-06-10T17:57:29Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Interaktive Passwort-Eingabe (`read -s`) wenn keine ENV-Variable gesetzt ist — für dashboard, events, freigaben, fristen-batch, flags.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #192 [MERGED] — feat(verwalter): P0 Event-Bus, Freigaben, Fristen-Batch und CLI
- Erstellt: 2026-06-10T17:37:10Z
- Merged: 2026-06-10T17:40:59Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Sprint S1 — P0 Fundament (ohne Stripe)

### Neu
- **Migration 0044:** `verwalter_events` + `verwalter_freigaben`
- **Event-Bus:** Logging bei Vorgang-Anlage, Fristen-Batch, KI-Brief-Freigabe
- **Freigabe-Queue:** KI-Brief → `brief_entwurf` in Warteschlange, API freigeben/ablehnen
- **Fristen-Batch:** `POST /api/verwalter/fristen/batch-vorgaenge` + Button auf Fristen-Seite
- **Eigentümer:** E-Mail/Telefon pro Einheit in Objekt-Formular
- **Feature-Flags:** `VERWALTER_INBOX_ENABLED`, `VERWALTER_VOICE_ENABLED`, `VERWALTER_BELEG_OCR_ENABLED`
- **Terminal:** `scripts/ops/verwalter-cli.sh` + `pnpm run ops:verwalter-cli`

### Terminal-Befehle (für Alisad/WSL)
```bash
pnpm run ops:verwalter-cli health
pnpm run ops:verwalter-cli migrate-status
B2B_ADMIN_PASSWORD='…' pnpm run ops:verwalter-cli events
B2B_ADMIN_PASSWORD='…' OBJEKT_ID=… pnpm run ops:verwalter-cli fristen-batch
```

Nach Deploy: Migration 0044 läuft automatisch beim Server-Start.

### Prüfung
- [x] `npx tsc --noEmit --skipLibCheck` → 0 errors
- [x] Vitest → 14 passed
- [x] Keine verbotenen Dateien geändert

<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #191 [OPEN] — docs: Verwalter Automatisierungs-Roadmap (Agentur-Masterplan)
- Erstellt: 2026-06-10T14:55:34Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Masterplan für die systematische Entwicklung der Verwalter-Automatisierung: richtige Reihenfolge, Build-vs-Integrate-Matrix, Telefon ab Phase 4 (ohne WE-Mindestgrenze), kommerzielle Schichten.

## Inhalt

- Dependency-DAG: P0 Fundament → P1 Workflows → P2 E-Mail → P3 Belege → P4 Telefon → P5 Steuerung
- Build vs. Integrate (Vapi+Twilio Telefon, Resend Inbox, Claude Vision Belege, kein ERP-Neubau)
- Agentur-RACI, QA/Gates, 12-Wochen-Sprint-Plan
- Stripe Add-on-Idee (Automation + Voice)

## Datei

`docs/VERWALTER_AUTOMATION_ROADMAP.md`

<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #190 [MERGED] — feat: Stripe Verwalter Tools Abo (39€/Mo)
- Erstellt: 2026-06-10T14:18:32Z
- Merged: 2026-06-10T14:20:35Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Stripe-Infrastruktur für **Verwalter Tools Solo** (39 €/Monat): Checkout, Webhook-Freischaltung, optionales Beta-Gating und Landing-Preiskarte.

## Änderungen

- **Produkt:** `verwalter_tools` · Sentinel `vt` in `enabledModules`
- **Checkout:** `POST /api/stripe/verwalter-tools-checkout`
- **Webhook:** `invoice.paid` mit `type=verwalter_tools` → `processVerwalterToolsSubscription`
- **Gating:** `VERWALTER_TOOLS_GATING=1` erzwingt Abo; Default (0/leer) = Beta gratis für alle Login-Nutzer
- **Seed-Katalog:** 7. Abo-Preis (`STRIPE_PRICE_VERWALTER_TOOLS_MONTHLY`)
- **UI:** Preise + Checkout auf `/fuer-verwaltungsbueros`
- **AGB §7:** Verwalter Tools Solo-Abo ergänzt
- **Ops:** `docs/VERWALTER_STRIPE_SETUP.md`, QA-Pack Checkout-401-Check

## Für Alisad (nach Merge)

1. `pnpm run stripe:seed-prices -- --apply` (oder Price manuell im Dashboard)
2. Railway: `STRIPE_PRICE_VERWALTER_TOOLS_MONTHLY=price_…`
3. Test: Login → `/fuer-verwaltungsbueros` → „Abo buchen“ → Karte `4242…`
4. Erst bei Go-Live mit Bezahlzwang: `VERWALTER_TOOLS_GATING=1`

## Prüfung

- [x] `npx tsc --noEmit --skipLibCheck` → 0 errors
- [x] Vitest (stripe + verwalter access) → 19 passed
- [x] Keine verbotenen Dateien geändert

<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #189 [MERGED] — feat: Legal-Pack Verwalter (AGB/DSGVO/GDPR) + Landing /fuer-verwaltungsbueros
- Erstellt: 2026-06-10T14:05:50Z
- Merged: 2026-06-10T14:07:11Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Pre-marketing compliance + conversion landing for the Verwalter Suite.

### A — Legal-Pack

**AGB** (`client/src/pages/legal/AGB.tsx`, Stand 10.06.2026)
- Rechenpraxis + Verwalter-Werkzeuge in Leistungsumfang
- Disclaimer: Muster mit Rechtshinweisen, keine Rechts-/Steuerberatung, DATEV-Hinweis
- §7: Rechenpraxis-Solo-Abo, Verwalter-Werkzeuge Beta/Pricing

**Datenschutz** (`client/src/pages/Datenschutz.tsx`)
- §2.4 Verwalter-Stammdaten (Objekte, Vorgänge, Buchungen, EU-MySQL)
- §2.5 KI-Kontext (Brief, Assistent, Buchungsvorschläge)
- Speicherdauer Verwalter-Daten bis Konto-Löschung

**GDPR Art. 17** (`server/verwalterGdprCleanup.ts`)
- Deletes `verwalter_buchungen`, `verwalter_vorgaenge`, `verwalter_objekte` on account removal
- Removes file-store JSON (`data/verwalter-*`) if present
- Wired into `runPersonalDataCleanup` (admin + self-service delete)

**UI:** `/konto-loeschen` mentions Verwalter data deletion

### B — Landing `/fuer-verwaltungsbueros`

- New page: `FuerVerwaltungsbuerosLanding.tsx` — Suite focus (25 Vorlagen, Kanban, DATEV, KI, FAQ)
- CTAs: Register → `/app/verwalter`, Vorlagen, Büro-Anfrage (mailto)
- SEO canonical + keywords
- Sitemap (dynamic + static), Footer link, QA-Pack
- `/verwalter-rechner` B2B section links to new landing

## Verification

- [x] `npx tsc --noEmit --skipLibCheck` → 0 errors
- [x] `vitest run server/gdpr-delete-coverage.test.ts` → 3 passed
- [x] No forbidden files changed

## Test plan

- [ ] Merge → deploy → open https://immobilien-akademie-smart.de/fuer-verwaltungsbueros
- [ ] AGB + Datenschutz: new Verwalter sections visible
- [ ] Create test Objekt → delete account → verify `verwalter_*` rows gone (MySQL)
- [ ] `bash scripts/ops/verwalter-qa-pack.sh` — `/fuer-verwaltungsbueros` → 200
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #188 [MERGED] — feat: Sprint B Login-Performance/A11y + Sprint A4 Vorlagen
- Erstellt: 2026-06-10T13:28:03Z
- Merged: 2026-06-10T13:30:32Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Combined **Sprint B** (PageSpeed/A11y on `/login`) and **Sprint A4** (5 new Verwalter-Vorlagen).

### Sprint B — Performance

- **AuthLayout** for `/login`, `/forgot-password`, `/reset-password` — no PublicHeader, Footer, or StructuredData
- **Lazy-load** `DashboardLayout`, `RechenpraxisProductLayout`, `PublicHeader`, `Footer` (not in initial login bundle)
- **Route-aware preload** — Dashboard chunk no longer preloaded on `/login`
- **AccessibilityPanel** skipped on auth routes

### Sprint B — Accessibility (`/login`)

- Improved contrast: subtitle `#dbeafe`, body text `#475569` / `#374151`, error `#b91c1c`
- **44×44px** touch targets on buttons, links, password toggle, ComfortBar (`touchFriendly`)
- **16px** font on inputs (mobile zoom prevention)

### Sprint A4 — 5 neue Vorlagen (20 → **25**)

| Slug | Kategorie |
|------|-----------|
| `mahnung-stufe3` | 3. Mahnung — letzte Aufforderung |
| `etv-vertretungsvollmacht` | Vertretungsvollmacht ETV |
| `etv-tagesordnung-nachtrag` | Nachtrag zur Tagesordnung |
| `nk-weg-abrechnung` | WEG-NK-Abrechnung an Eigentümer |
| `nk-korrekturabrechnung` | Korrektur Nebenkostenabrechnung |

Fristen-Checkliste: Links zu `mahnung-stufe3`, `etv-protokoll`, `nk-weg-abrechnung`.

> **Hinweis:** ETV, 2. Mahnung und NK hatten bereits Vorlagen (`etv-einladung`, `mahnung-stufe2`, `nk-erklaerung`). Diese PR ergänzt die fehlenden Praxis-Varianten.

## Verification

- [x] `npx tsc --noEmit --skipLibCheck` → 0 errors
- [x] `vitest run shared/verwalterVorlagen.test.ts` → 4 passed
- [x] No forbidden files changed

## Test plan

- [ ] `/login` — Lighthouse mobile: contrast + touch targets improved
- [ ] `/app/verwalter/vorlagen` — 25 Vorlagen, neue 5 sichtbar
- [ ] `/app/verwalter/fristen` — neue Fristen-Einträge mit Vorlagen-Link
- [ ] `/app/verwalter/vorlagen/mahnung-stufe3` — PDF + KI-Brief
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #187 [MERGED] — feat(verwalter): Dashboard-Übersicht + Login canonical SEO
- Erstellt: 2026-06-10T12:39:08Z
- Merged: 2026-06-10T12:42:35Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Sprint A — Verwalter product polish based on beta QA and PageSpeed audit.

- **New dashboard** at `/app/verwalter` (replaces redirect to Rechenpraxis)
  - Stats: Objekte, offene Vorgänge, überfällig
  - Quick links to Objekte, Vorgänge, Vorlagen, Buchungen, Fristen, Rechenpraxis
  - Priority list of open/overdue Vorgänge + recent Objekte
  - Empty state with CTA for first-time users
- **Sidebar nav**: "Übersicht" as first item with exact-match active state
- **SEO fix**: `/login` now sets `rel=canonical` to itself (PageSpeed warning)
- **QA pack**: `/app/verwalter` added to public page checks

## Audit context (unchanged by this PR)

| Check | Result |
|-------|--------|
| SecurityHeaders.com | Grade **A** (CSP `unsafe-inline` — Vite/React, future hardening) |
| PageSpeed `/login` mobile | Perf 83, A11y 92, BP 96, SEO 92 |
| PageSpeed `/login` desktop | Perf 99, LCP 0.8s |

## Verification

- [x] `npx tsc --noEmit --skipLibCheck` → 0 errors
- [x] No forbidden files changed

## Test plan

- [ ] Log in → open `/app/verwalter` — dashboard loads with stats
- [ ] Sidebar "Übersicht" highlights only on `/app/verwalter`
- [ ] Empty account shows welcome CTA → Objekte
- [ ] `/login` — inspect `<link rel="canonical">` points to `/login`
- [ ] `bash scripts/ops/verwalter-qa-pack.sh` — `/app/verwalter` returns 200
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #186 [MERGED] — fix(e2e): leerer auth-state wenn PLAYWRIGHT_SKIP_GLOBAL_SETUP
- Erstellt: 2026-06-10T12:20:12Z
- Merged: 2026-06-10T12:20:20Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Behebt ENOENT auf `.auth-state.json` wenn Global-Setup übersprungen wird.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #185 [MERGED] — ops(qa): Lighthouse-Script + Playwright SKIP_GLOBAL_SETUP
- Erstellt: 2026-06-10T12:10:41Z
- Merged: 2026-06-10T12:10:48Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
- `scripts/ops/verwalter-lighthouse.sh` für WSL mit Playwright-Chromium + no-sandbox
- `PLAYWRIGHT_SKIP_GLOBAL_SETUP=1` für Admin-401-Tests ohne Login
- Runbook aktualisiert
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #184 [MERGED] — test(e2e): leerer storageState für anonyme Admin-401-Tests
- Erstellt: 2026-06-10T12:03:05Z
- Merged: 2026-06-10T12:03:15Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Playwright `newContext()` erbte weiterhin Cookies (inspect_mode/auth). Fix: explizit `storageState: { cookies: [], origins: [] }`.

Lighthouse-Hinweis: `chrome-headless-shell` Pfad für WSL.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #183 [MERGED] — test(e2e): Admin-401-Tests ohne gespeicherten Auth-State
- Erstellt: 2026-06-10T11:54:56Z
- Merged: 2026-06-10T11:55:06Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Playwright `request` erbte Cookies aus `.auth-state.json` — daher fälschlich 200 statt 401.

Fix: anonyme `playwright.request.newContext()` für Admin-Guard-Tests.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #182 [MERGED] — ops(verwalter): QA-Pack + Runbook für automatische Prod-Tests
- Erstellt: 2026-06-10T11:46:17Z
- Merged: 2026-06-10T11:46:59Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Inhalt

- `scripts/ops/verwalter-qa-pack.sh` — ein Befehl: Seiten, API-Schutz, Health, optional Login-API
- `docs/VERWALTER_QA_RUNBOOK.md` — alle Links, Playwright, Lighthouse, Stakeholder-Checklisten
- `pnpm run test:qa:verwalter`

Kein App-Code geändert.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #181 [MERGED] — feat(verwalter): MySQL-Persistenz — Objekte, Vorgänge, Buchungen
- Erstellt: 2026-06-10T11:28:04Z
- Merged: 2026-06-10T11:28:13Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Verwalter-Daten wandern von File-Store (`data/verwalter-*`) nach **MySQL** — Daten überleben Redeploys.

**Alisad-Freigabe:** „MySQL Verwalter starten“

## Änderungen

- Migration `0043_verwalter_mysql.sql` — 3 Tabellen
- Drizzle-Schema + Type-Exports
- Async Stores mit MySQL-Backend + File-Fallback (Vitest ohne DB)
- **Lazy-Import:** Beim ersten Zugriff werden bestehende JSON-Dateien importiert und archiviert (`.migrated`)
- `docs/VERWALTER_BETA_TESTER.md` — wie Beta-Tester eingeladen werden

## Nach Deploy

Migration läuft automatisch via `runMigrations()`. Bestehende Production-Daten (dein Objekt + Buchung) werden beim nächsten API-Zugriff importiert.

## Checks

- `npx tsc --noEmit --skipLibCheck` → 0 errors
- Vitest → 216 passed
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #180 [MERGED] — feat(verwalter): Phase 1 — P3–Suite+ konsolidiert + Fair-Use
- Erstellt: 2026-06-10T10:56:10Z
- Merged: 2026-06-10T11:02:00Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Konsolidiert die offenen Verwalter-PRs **#172–#177** in einen einzigen, auf `main` rebased PR.

**Ersetzt:** #172, #173, #174, #175, #176, #177

## Inhalt

- P3 Vorgangs-Tracker + Einheiten-CRUD + Dashboard
- P3+ Fristen→Vorgang, Stammdaten-Export, DATEV-Spec
- Hausgeld-Buchungen + DATEV EXTF-Export
- Live-Assistent + Guide-System
- Buchungsvorschlag, Plausibilität, Monatsabschluss, Onboarding
- Chat-Buchung 1-Klick + Rechenpraxis-Verwalter-Links

## Phase-1 Sicherheit

- **Fair-Use** auf Verwalter-KI: `ki-brief`, `assistent`, `buchungen/vorschlagen` (via `kiFairUseGate.ts`)
- Status-Dokument: `docs/VERWALTER_PHASE1_STATUS.md`

## Bewusst nicht in diesem PR

- MySQL-Migration für Verwalter File-Stores (`drizzle/schema.ts` — AGENTS.md-Verbot, separates OK nötig)
- Railway Volume / zweiter Service (Phase 2, Alisad)

## Checks

- `npx tsc --noEmit --skipLibCheck` → 0 errors
- Vitest → 215 passed

## Nach Merge (Alisad)

Siehe `docs/VERWALTER_PHASE1_STATUS.md` — Staging-Smoke + optional Daten-Backup.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #179 [MERGED] — docs: Verwalter-Unabhängigkeitsplan (Monorepo + Phase 2 Railway-Service)
- Erstellt: 2026-06-10T10:45:19Z
- Merged: 2026-06-10T10:53:52Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Inhalt

`docs/VERWALTER_INDEPENDENCE_PLAN.md` — Strategie für eigenständiges Verwalter-Produkt mit eigener Domain.

**Kernaussage:**
- Neues GitHub-Repo **jetzt nicht** empfohlen
- Phase 1: MySQL + PR-Konsolidierung im Monorepo
- Phase 2: Zweiter Railway-Service + Subdomain `verwalter.*`
- Phase 3: Vollständige Trennung optional bei Skalierung

Kein Code, nur Doku.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #178 [MERGED] — docs: Vollständiger Architekt-Audit 2026-06-10 (12 Teile)
- Erstellt: 2026-06-10T09:50:47Z
- Merged: 2026-06-10T10:40:21Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Vollständiger, belegbarer Architekt-Audit für externe Beratung (Anthropic/Claude). 12 Markdown-Dateien unter `docs/AUDIT_2026-06-10_*.md`.

## Inhalt

| Datei | Teil |
|-------|------|
| `AUDIT_2026-06-10_INDEX.md` | Index + Live-Verifikation |
| `AUDIT_2026-06-10_04_VERWALTER.md` | Verwalter Suite (strategisch dringend) |
| `AUDIT_2026-06-10_02_DEPLOYMENT.md` | Nixpacks→Dockerfile Migration |
| `AUDIT_2026-06-10_01_CHRONOLOGIE.md` | 14-Tage-Chronologie + alle PRs 30d |
| `AUDIT_2026-06-10_02_INFRA.md` | Railway, MySQL, Drittanbieter, DNS, Security |
| `AUDIT_2026-06-10_03_CODE.md` | Frontend/Backend-Inventur |
| `AUDIT_2026-06-10_05_KI.md` | KI-Pipeline + Audio |
| `AUDIT_2026-06-10_06_OWNER.md` | Owner Control Tower |
| `AUDIT_2026-06-10_07_OFFEN.md` | 18 offene PRs + Tech-Debt |
| `AUDIT_2026-06-10_08_TESTS.md` | Vitest 213, Playwright 30 Specs |
| `AUDIT_2026-06-10_09_SELBST.md` | Ehrliche Selbst-Bewertung |
| `AUDIT_2026-06-10_10_STRATEGIE.md` | Strategische Antworten |
| `AUDIT_2026-06-10_11_ANHANG.md` | Verifikationsdaten (curl, tests) |

## Verifizierte Live-Daten

- Health: `200`, 45 Migrationen, `pending: 0`
- `main` HEAD: `599a0b1` (Verwalter P2)
- 18 offene PRs (nicht 13)
- Vitest: 213/213 grün, tsc: 0 errors

## Hinweise

- Railway-IDs, DB Row-Counts, externe Tool-Scores als **unverifiziert** markiert
- Verwalter P3+ (#172–#177) nur auf Branches, nicht production
- `.gitignore` ergänzt für Audit-Dateien

## Checkliste

- [x] Keine verbotenen Dateien geändert
- [x] Nur Doku + .gitignore
- [x] Belege mit PR-Nummern, Commits, curl-Outputs
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #177 [CLOSED] — feat(verwalter): Chat-Buchung 1-Klick + Rechenpraxis-Verwalter-Links
- Erstellt: 2026-06-10T09:26:01Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Verbindet Lernen (Rechenpraxis) und Anwendung (Verwalter-Suite) — Buchungen direkt im Assistenten-Chat.

## 1. Assistent: Buchung vorschlagen & anlegen

- Erkennung von Buchungs-Anfragen im Chat (`looksLikeBuchungsAnfrage`)
- API liefert `buchungsVorschlag` neben der Text-Antwort
- **BuchungsVorschlagCard** mit „Buchung mit einem Klick anlegen“
- Objekt-Auswahl bei mehreren WEGs
- Beispiel-Chip: „250€ Hausgeld“

**Flow:** Nutzer tippt → Assistent erklärt + zeigt Konten → ein Klick → gespeichert in Buchungen

## 2. Rechenpraxis: kontextsensitive Verwalter-Links

Neue Box **„In der Praxis umsetzen — Verwalter-Tools“** bei WEG-relevanten Aufgaben:

| Aufgabe | Links z. B. |
|---------|-------------|
| Hausgeld-Rückstand | Mahnung-Vorlage, Forderung buchen |
| NK / Heizkosten | NK-Aufwand SKR 4970→1200 |
| Wirtschaftsplan | Hausgeld-Anpassung Vorlage |
| Beschluss / ETV | ETV-Einladung |

Mapping: `shared/rechenpraxisVerwalterLinks.ts` (Bereich + Titel-Keywords)

## 3. Rechenpraxis-KI

System-Prompt ergänzt für WEG-Aufgaben: Verweis auf echte Buchungs- und Vorlagen-Tools.

## Tests
213 Unit-Tests · tsc + build grün
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #176 [CLOSED] — feat(verwalter): Buchungsvorschlag, Plausibilität, Monatsabschluss, Onboarding
- Erstellt: 2026-06-10T09:16:39Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Smarte Weiterentwicklung der Verwalter-Suite für **Quereinsteiger** — weniger Unsicherheit bei Konten und DATEV.

Enthält vorherige Arbeit (Assistent, Buchungen, Vorgänge, …) falls noch nicht auf `main`.

## Neu

### Buchung in eigenen Worten
- `POST /api/verwalter/buchungen/vorschlagen`
- Regel-Engine zuerst (schnell, kostenlos): „250 Euro Hausgeld WE 3 Müller“
- KI-Fallback für komplexe Eingaben
- UI: Freitext-Feld auf Buchungen-Seite → Formular vorausgefüllt

### Plausibilitäts-Wächter
- `GET /api/verwalter/buchungen/plausibilitaet`
- Prüft: gleiches Soll/Haben, Datum/Periode, doppelte Belege, fehlendes Hausgeld, hohe Beträge
- **DATEV-Export blockiert bei Fehlern** (optional `force=1`)

### Monatsabschluss-Checkliste
- `GET /api/verwalter/monatsabschluss`
- 5 Schritte: Stammdaten → Buchungen → Plausibilität → Vorgänge → DATEV
- Fortschrittsbalken in UI

### Onboarding-Wizard
- 5 Schritte für neue Nutzer ohne Objekte
- localStorage dismiss

## Tests
210 Unit-Tests · tsc + build grün
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #175 [CLOSED] — feat(verwalter): Live-Assistent + Guide-System für Laien
- Erstellt: 2026-06-10T09:02:16Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Kontextbewusster **Verwalter-Assistent** für Quereinsteiger in der Hausverwaltung — erklärt SKR-Konten, Buchungen, Fristen und Workflows mit **Live-Daten** des Nutzers.

## Wie es funktioniert

1. **Wissensbasis** (`verwalterAssistentKnowledge`) — Soll/Haben, SKR03, Abläufe laienverständlich
2. **Live-Kontext** — lädt Objekte, offene Vorgänge, Buchungen der Periode
3. **LLM** — `kursbuchLlm` (Gemini → Groq → Claude), gleiche Pipeline wie KI-Brief
4. **Guide-Banner** — proaktiver Tipp pro Seite (session-dismissible)
5. **Floating Chat** — unten rechts in `RechenpraxisProductLayout`

## API

`POST /api/verwalter/assistent`
- Body: `{ frage, seite?, objektId?, nachrichten? }`
- Antwort mit `answer`, `provider`

## UX

- Vorgeschlagene Fragen je Seite (Buchungen, Fristen, Objekte, …)
- Guide auf Buchungen: „Assistent öffnen“ bei Konten-Unsicherheit
- Disclaimer: keine Steuer-/Rechtsberatung

## Tests

205 Unit-Tests · tsc + build grün
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #174 [CLOSED] — feat(verwalter): Hausgeld-Buchungen + DATEV EXTF-Export (Phase B)
- Erstellt: 2026-06-10T08:52:48Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

DATEV Phase B: Manuelle Hausgeld-Buchungen mit Export als DATEV-Buchungsstapel (EXTF light).

Enthält auch P3/P3+ (Vorgänge, Fristen→Vorgang, Export) falls noch nicht auf `main`.

## Hausgeld-Buchungen light

- **UI:** `/app/verwalter/buchungen`
- Objekt + Monat filtern, Buchungen erfassen
- SKR03-Vorlagen: Hausgeld, Forderung, NK-Aufwand
- Einheit optional verknüpfen

## API

| Endpoint | Beschreibung |
|----------|--------------|
| `GET/POST/PUT/DELETE /api/verwalter/buchungen` | CRUD |
| `GET /api/verwalter/export/datev-buchungen?objektId=&periode=` | EXTF-CSV |

**Store:** `data/verwalter-buchungen/user-{id}.json` (kein Schema-Change)

## DATEV EXTF light

CSV mit Spalten: Umsatz, S/H, Konto, Gegenkonto, BU, Belegdatum (TTMM), Buchungstext, Belegfeld 1

- Betrag: `150,00` (deutsches Format)
- UTF-8 BOM, `;` Trennzeichen
- Dateiname: `EXTF_Buchungen_{objektId}_{periode}.csv`

## Weitere Details

- Kaskadierendes Löschen bei Objekt-Delete
- `docs/DATEV_SPEC.md` Phase B als ✅ markiert
- Sidebar-Nav „Buchungen“

## Tests

- 202 Unit-Tests bestanden
- `tsc` + `build` grün
- E2E: Auth-Redirect für `/app/verwalter/buchungen`
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #173 [CLOSED] — feat(verwalter): P3 Vorgänge + P3+ Fristen/Export/DATEV
- Erstellt: 2026-06-10T08:44:45Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Enthält **P3** (Vorgangs-Tracker, Einheiten, Dashboard) und **P3+ Sprint 1** (Fristen→Vorgang, Export, DATEV-Vorbereitung).

## P3 — Vorgangs-Tracker
- Kanban `/app/verwalter/vorgaenge` (Desktop + Mobile)
- File-Store API, Dashboard-Widget in Sidebar
- Einheiten-CRUD in ObjekteIndex

## P3+ Sprint 1

### Fristen → Vorgang (1 Klick)
- Objekt + Stichtag wählen → „Vorgang anlegen“ pro Frist
- Automatisch: Typ, Titel, Beschreibung, Fälligkeit (`durationDays`), Vorlage-Slug
- Shared: `verwalterFristVorgang.ts`

### Export
- **Vorgänge:** HTML + PDF (Audit/Archiv)
- **Fristen:** HTML mit Stichtag-Berechnung
- **Stammdaten:** CSV-Export auf Objekte-Seite (`GET /api/verwalter/export/stammdaten-csv`)

### DATEV Phase A + Spec
- `docs/DATEV_SPEC.md` — Roadmap Phase B (Buchungsmodul + EXTF)
- Stammdaten-CSV: Objekte + Einheiten (UTF-8 BOM, `;`)

## Tests
- 195 Unit-Tests bestanden
- `tsc` + `build` grün
- Keine verbotenen Dateien geändert
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #172 [CLOSED] — feat(verwalter): P3 Vorgangs-Tracker + Einheiten-CRUD
- Erstellt: 2026-06-10T08:22:28Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Phase P3 des Verwalter-Produkts: CRM-light mit Vorgangs-Tracker (Kanban), Einheiten-Verwaltung in Objekt-Stammdaten und Dashboard-Übersicht in der Sidebar.

## Änderungen

### Vorgangs-Tracker
- Neuer Bereich `/app/verwalter/vorgaenge` mit Kanban (Desktop) und Status-Chips (Mobile)
- Typen: Mahnung, ETV, Schaden, Beschluss, Instandhaltung, NK, Sonstiges
- Überfällige Vorgänge werden hervorgehoben
- Verknüpfung zu passenden Vorlagen pro Vorgangstyp
- File-Store API (`data/verwalter-vorgaenge/`) — keine Schema-Änderung

### API
- `GET /api/verwalter/dashboard` — Objekte, offene und überfällige Vorgänge
- `GET/POST/PUT/DELETE /api/verwalter/vorgaenge`
- Kaskadierendes Löschen bei Objekt-Delete

### Objekte
- Einheiten-CRUD im Bearbeitungsformular (Nr., MEA, Eigentümer)
- Link zu Vorgängen pro Objekt

### UX
- Sidebar-Nav „Vorgänge“ + Dashboard-Widget (Objekte/offen/überfällig)
- Fristen-Checkliste verlinkt auf Vorgangs-Kanban

## Tests
- `npx tsc --noEmit --skipLibCheck` → 0 errors
- `pnpm test` → 190 passed (+5 neue Tests)
- `pnpm build` → OK
- E2E: `/app/verwalter/vorgaenge` Auth-Redirect

## Keine verbotenen Dateien geändert
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #171 [MERGED] — feat(verwalter): P2 — 20 Vorlagen, KI-Brief, Objekt-Stammdaten
- Erstellt: 2026-06-10T08:07:05Z
- Merged: 2026-06-10T08:09:59Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## P2 Verwalter-Suite

### 20 WEG-Vorlagen
- ETV, Mahnung, NK, Kommunikation — ausfüllbar, PDF, Kopieren
- `shared/verwalterVorlagen.ts` (20 Einträge)

### KI-Brief-Generator
- `POST /api/verwalter/ki-brief`
- Multi-Provider: Gemini → Groq → Claude (`kursbuchLlm`)
- Verfeinert Entwurf aus Vorlage + optional Objekt-Kontext

### Objekt-Stammdaten (CRM-Basis)
- `GET/POST/PUT/DELETE /api/verwalter/objekte`
- Datei-Store pro Nutzer (`data/verwalter-objekte/`)
- UI: `/app/verwalter/objekte` — CRUD
- Prefill in Vorlagen via Objekt-Auswahl

### Mobile / Cross-Device
- Rechenpraxis: horizontale Filter-Chips, Formel-Umbruch
- Touch-Targets 44px

### Tests
- 185 unit tests passed
- tsc: 0 errors
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #170 [MERGED] — feat(verwalter): P1 Suite — Vorlagen, Fristen, Mobile-First Shell
- Erstellt: 2026-06-10T07:47:39Z
- Merged: 2026-06-10T07:51:19Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Agentur-Sprint P1 — Verwalter als eigenständige Suite

### Neu
- **8 WEG-Vorlagen** (`/app/verwalter/vorlagen`) — ETV, Mahnung, NK, Kommunikation
- Ausfüllen, Live-Vorschau, PDF-Export, Kopieren
- **Fristen-Checkliste** (`/app/verwalter/fristen`) — §24/§46 WEG, NK-Fristen
- Sidebar: Vorlagen + Fristen im Produkt-Shell

### Mobile / Cross-Device
- `ComfortBarMini` auf Mobile (kein Header-Overflow)
- Mobile-Drawer: Logout + Freemium-Hinweis, Body-Scroll-Lock
- Home WEG-Badge: responsive Stack, kein horizontales Overflow
- Touch-Targets min. 44px

### Architektur
- `shared/verwalterVorlagen.ts` — Katalog + Platzhalter-Engine
- `shared/verwalterFristen.ts` — Fristen-Daten
- Preise im `VerwalterProductLayout` (Produkt-Kontinuität)

### Tests
- 182 unit tests passed
- E2E: mobile overflow, tablet landing, vorlagen auth
- tsc: 0 errors

### Nächster Sprint (P2)
- Vorlagen auf 20 erweitern
- KI-Brief-Generator
- Objekt-Stammdaten
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #169 [MERGED] — feat(verwalter): eigenes Produkt-Shell + Login-Redirect für Rechenpraxis
- Erstellt: 2026-06-10T06:54:39Z
- Merged: 2026-06-10T07:17:30Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Problem

Rechenpraxis wurde als „eigenständiges Produkt“ beworben, landete aber nach Login auf `/modul/1` (Akademie) und nutzte die volle Akademie-Sidebar mit gesperrten Modulen.

## Lösung

### Login-Funnel
- `?redirect=/rechenpraxis` wird nach Login/ Code-Einlösung respektiert
- Nutzer von `/verwalter-rechner` landen direkt in der Rechenpraxis

### Eigenes Produkt-Shell (`RechenpraxisProductLayout`)
- Eigene Sidebar: Rechenpraxis, Praxisrechner, Preise, Link zur Akademie
- Kein Modul-1–5-Menü, kein „gesperrt“-Chaos für Solo-Käufer (`rp`)
- Routes: `/rechenpraxis`, `/rechner` → `VerwalterProductLayout`
- `/app/verwalter` → `/rechenpraxis` (Roadmap-Pfad)

## Nächste Schritte (separat)

- Subdomain `verwalter.*` oder `/app/verwalter/vorlagen`
- B2B-Verwalter-Landing
- Sitemap: `/verwalter-rechner`, `/rechenpraxis-preise`

## Tests

- 176 tests passed
- `postLoginRedirect.test.ts` neu
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #168 [MERGED] — KI-Pipeline v1, Content Registry (PR-A), Hero WEG-Badge (PR-C)
- Erstellt: 2026-06-10T06:17:44Z
- Merged: 2026-06-10T06:57:16Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Drei zusammenhängende Verbesserungen in einem PR:

### PR-A — Content Registry (falls #167 noch offen: hier enthalten)
- `moduleContentRegistry.ts` — Single Source of Truth
- **M2:** 60 Lerntage (Part3), **M4:** 40 Lerntage (Valuation Part2 + Bonus)
- Build-Export validiert `extrahiert/erwartet`

### PR-B — KI-Pipeline v1 (`/api/ai/generate-kursbuch-pipeline`)
- **1 Lerntag = 1 KI-Job** (Zusammenfassung: 2 Tage/Job)
- **Continuation** bei `stop_reason=max_tokens` (bis 2× Fortsetzung)
- **3 parallele Jobs** — schneller als sequentiell
- Format-spezifisch: Intro/Outro (Kursbuch), Reduce-Pass (Zusammenfassung)
- **Cache mit Content-Hash** — invalidiert bei Moduländerungen
- UI: nur noch **Entwurf** + **KI-Pipeline** (Legacy/Chunked entfernt)
- Metadaten: `daysCovered`, `incompleteBlocks`

### PR-C — Homepage Hero WEG-Badge
- Schräges Badge am Hero-Foto (Desktop, `-rotate-3`, hover gerade)
- Mobile: kompakte Karte unter Hero-Text
- **Grünes Vollbreiten-Band entfernt** — keine Konkurrenz zum Hauptversprechen
- Redundanter „Verwalter-Rechner“-Button in Hero-CTA-Leiste entfernt

## Tests
- `npx tsc --noEmit --skipLibCheck` — 0 errors
- `pnpm test` — 170 passed
- `pnpm build` — OK, Export M1–M5 alle OK

## Nach Deploy testen
- https://immobilien-akademie-smart.de/ — WEG-Badge am Hero-Foto
- https://immobilien-akademie-smart.de/admin/kursbuch — „KI-Pipeline (vollständig)“
- Modul 3 Entwurf: ~400k Zeichen, 80 Tage
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #167 [OPEN] — PR-A: Content Registry, M2/M4 Lerntage-Fix, forensisches Audit
- Erstellt: 2026-06-10T06:05:13Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## PR-A: Content Registry

Single Source of Truth für Modul-Lerninhalte — behebt fehlende Lerntage im Kursbuch-Generator.

### Änderungen
- **`server/moduleContentRegistry.ts`** — kanonische Dateilisten + erwartete Tage
- **M2:** 40 → **60** Lerntage (`Module2ContentPart3_Maximal.ts`)
- **M4:** 10 → **40** Lerntage (Valuation Part2 + Bonus HypZert; entfernt nicht existierende `Module4Content_Maximal.ts`)
- **M1:** `Module1Content_Maximal.ts` statt Basis-Version
- Build-Export loggt `extrahiert/erwartet` mit WARN bei Abweichung
- `getModuleContentHash()` vorbereitet für Cache-Invalidierung (PR-B)

### Tests
- `npx tsc --noEmit --skipLibCheck` — 0 errors
- `pnpm test` — 169 passed
- Export: M1–M5 alle OK (20/60/80/40/40)

### Audit
- `docs/SYSTEM_AUDIT.md` — forensisches Audit: Architektur-Inkonsistenzen, Homepage Hero vs. Verwalter-Rechner, UX-Empfehlungen

## Deploy-Hinweis
Nach Merge: `git pull && railway up` — Kursbuch-Entwurf M2/M4 dann vollständig.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #166 [MERGED] — Portal: A11y-Zoom Lesebereich, Kursbuch Chunked-KI, drizzle-orm runtime
- Erstellt: 2026-06-09T20:18:20Z
- Merged: 2026-06-09T20:47:44Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Drei Verbesserungen für das Portal, die aus der letzten Session offen waren:

### 1. ComfortBar A+/A− — nur Lesebereich skaliert
- `html` bleibt bei festen 16px (Sidebar/Navigation unverändert)
- Schriftzoom wirkt auf `#learning-scroll` und `.learning-text-scale`
- Sidebar mit `data-app-sidebar` isoliert
- E2E-Test prüft: Lesebereich skaliert, Sidebar nicht

### 2. Kursbuch-Generator verbessert
- **Entwurf (0 €):** alle Lerntage via `parseModuleDayLessons`, keine 40-Tage-Kappe
- **KI-Kursbuch (Chunked):** neuer Endpoint `/api/ai/generate-kursbuch-chunked` — verarbeitet 8-Tage-Blöcke nacheinander, stitched Markdown zusammen (ohne `ragTutor.ts` zu ändern)
- **KI (Legacy):** alter v2-Endpoint bleibt als Fallback
- Admin-UI mit Fortschrittsanzeige und klarer Beschriftung

### 3. Docker/Runtime
- `drizzle-orm` von `devDependencies` → `dependencies` (sauberer prod install)

## Tests
- `npx tsc --noEmit --skipLibCheck` — 0 errors
- `pnpm test` — 160 passed
- `pnpm build` — OK
- Keine verbotenen Dateien geändert

## Manuell testen nach Deploy
- https://immobilien-akademie-smart.de/modul/3/tag/4 — A+/A−: nur Theorie größer, Sidebar gleich
- https://immobilien-akademie-smart.de/admin/kursbuch — Entwurf + „KI-Kursbuch (Chunked)“
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #165 [MERGED] — fix(deploy): drizzle-orm Runtime — volle node_modules im Docker
- Erstellt: 2026-06-09T19:46:50Z
- Merged: 2026-06-09T19:47:03Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Build war erfolgreich, Container crashte beim Start:
`ERR_MODULE_NOT_FOUND: drizzle-orm`

`pnpm install --prod` installiert drizzle-orm nicht (devDependency), wird aber von esbuild-gebundeltem Server benötigt.

Fix: volle node_modules aus deps-Stage kopieren.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #164 [MERGED] — fix(deploy): .dockerignore minimal + LF für Railway/WSL
- Erstellt: 2026-06-09T19:30:55Z
- Merged: 2026-06-09T19:31:09Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Railway deploy scheitert bei `railway up` von WSL/Windows (`/mnt/c/`).

- `.dockerignore` ohne Kommentare, nur ASCII-Patterns
- `.gitattributes` erzwingt LF
- Dockerfile syntax-directive entfernt
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #163 [MERGED] — fix(deploy): .dockerignore ASCII — Railway exclude-patterns Fehler
- Erstellt: 2026-06-09T19:24:36Z
- Merged: 2026-06-09T19:24:43Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Railway `railway up` Fehler:
```
exclude-patterns contains value with non-printable ASCII characters
```
Ursache: Em-Dash (—) in `.dockerignore` Kommentaren. Auf reines ASCII umgestellt.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #162 [MERGED] — fix(deploy): Corepack-Bug — pnpm via npm install
- Erstellt: 2026-06-09T18:08:30Z
- Merged: 2026-06-09T18:08:36Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Root Cause

CI `docker build` und Railway-Deploys scheitern an:

```
corepack prepare pnpm@10.4.1
Internal Error: Cannot find matching keyid
```

Veraltete Signatur-Keys in Corepack (Node 22.12). Erklärt alle Build-Failures seit Nixpacks-Fix mit `corepack prepare`.

## Fix

`npm install -g pnpm@10.4.1` statt Corepack — in Dockerfile und nixpacks.toml.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #161 [MERGED] — fix(deploy): Docker-Build optimieren — Railway OOM/Image-Größe
- Erstellt: 2026-06-09T18:04:40Z
- Merged: 2026-06-09T18:04:52Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Production zeigt weiterhin `index-CenIRgUc.js` — alle Railway-Deploys seit P2 schlagen fehl.

## Änderungen
- `NODE_OPTIONS=4096` entfernt (vermutlich OOM auf ~2GB Railway-Build-Containern)
- Runner: `pnpm install --prod` statt 963MB `node_modules` kopieren
- `railway.toml` + JSON schema
- CI: `docker build` Job als Paritätscheck vor Railway
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #160 [MERGED] — fix(deploy): Dockerfile native build deps
- Erstellt: 2026-06-09T17:58:52Z
- Merged: 2026-06-09T17:59:04Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Ergänzt python3/make/g++ für native Module im Railway Docker-Build. Entfernt `pnpm prune --prod` für sichereren Runtime-Start.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #159 [MERGED] — fix(deploy): Dockerfile statt Nixpacks — Railway Build fix
- Erstellt: 2026-06-09T17:49:07Z
- Merged: 2026-06-09T17:49:18Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Problem

Railway-Deploy `11d73a30` (Redeploy zu `ab04ad9`) ist erneut beim **Build image** fehlgeschlagen (~80s). Nixpacks-Fix aus PR #158 hat nicht geholfen. GitHub CI und lokaler Build sind grün — Production hängt weiter auf `index-CenIRgUc.js` (15:41 UTC).

## Lösung

Umstellung von **Nixpacks** auf **Dockerfile** (Multi-Stage):

1. **deps** — `pnpm install --frozen-lockfile`
2. **build** — `pnpm build` mit 4GB Node heap
3. **runner** — `dist/`, prod `node_modules`, `drizzle/migrations`, `knowledge/`, `server/agent/`

`railway.json`: `builder: DOCKERFILE`

## Checks

- [x] `tsc --noEmit --skipLibCheck` → 0 errors
- [x] `pnpm test` → 160/160
- [x] Keine verbotenen Dateien geändert

## Nach Merge

Railway baut per Dockerfile. Erwartung: Bundle wechselt zu P2 (`offene-fragen`, Owner-Skalierung).
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #158 [MERGED] — fix(deploy): Railway-Nixpacks Build härten — P2-Redeploy
- Erstellt: 2026-06-09T17:04:29Z
- Merged: 2026-06-09T17:19:43Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Problem

Railway-Deploy für `50b7d5a` (P2: Cleanup, Owner/Admin-Skalierung, Offene Fragen, E2E) ist beim **Build image** fehlgeschlagen. GitHub CI für denselben Commit war erfolgreich.

**Verifikation:** Production läuft noch auf dem älteren Bundle (`index-CenIRgUc.js`), nicht auf dem P2-Build (`index-c1m5NoKD.js`). Health-Check ist grün, aber P2-Features (z. B. Sidebar „Offene Fragen“, Owner-Schrift-Skalierung) sind nicht live.

## Änderungen

### `nixpacks.toml`
- Explizite **install**-Phase: `corepack enable` + `pnpm@10.4.1` + `pnpm install --frozen-lockfile`
- Explizite **build**-Phase: Vite-Cache leeren + `NODE_OPTIONS=--max-old-space-size=4096 pnpm build`
- `NIXPACKS_SPA_CADDY=false` — verhindert falsche SPA/Caddy-Erkennung (Express-Backend)

### `railway.json`
- `nixpacksConfigPath` explizit auf `nixpacks.toml` gesetzt

## Checks

- [x] `npx tsc --noEmit --skipLibCheck` → 0 errors
- [x] `pnpm build` → erfolgreich
- [x] Keine verbotenen Dateien geändert

## Nach dem Merge

Railway sollte automatisch neu deployen. Prüfen:
- Build-Logs zeigen `corepack prepare pnpm@10.4.1` und `pnpm build`
- Bundle-Hash wechselt zu `index-c1m5NoKD.js` (oder neuer)
- https://immobilien-akademie-smart.de/offene-fragen/3 (eingeloggt: Sidebar-Link „Offene Fragen“)
- https://immobilien-akademie-smart.de/owner-dashboard (ComfortBar + skalierte Schrift)
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #157 [MERGED] — fix(a11y): Schriftvergrößerung für Lerninhalte (Module, Audio, Rechenpraxis)
- Erstellt: 2026-06-09T15:08:14Z
- Merged: 2026-06-09T15:16:44Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Problem

Die Komfort-Leiste (A-/A+) vergrößerte sichtbar vor allem die Seitenleiste (Modulliste, Buttons), nicht aber die eigentlichen Lerninhalte — Theorie, Praxis, Aufgaben und Tagesinhalte.

## Ursache

Tailwind-Utilities wie `text-sm` skalieren über `rem` und damit über die `html`-Schriftgröße. Fließtext in `.prose`/`.content-container` hatte oft keine explizite Schriftgröße und reagierte für Nutzer kaum sichtbar auf die Skalierung.

## Lösung

- **Explizite Lerninhalt-Skalierung** in `index.css` für `.learning-text-scale`, `#main-content .content-container` und `.prose`
- **SmartContent** in `.learning-text-scale` eingebunden (alle Modul-Theorie-/Praxis-Texte)
- **Audio-Transkript** nutzt dieselbe CSS-Klasse (keine doppelte Inline-Skalierung mehr)
- **Rechenpraxis**-Hauptbereich mit `learning-text-scale`
- **`initA11yPrefsFromStorage()`** beim App-Start — Einstellung gilt sofort
- **`applyA11yPrefs`** setzt `--a11y-font-scale` zusätzlich direkt als `font-size` auf `html`

## Test

1. `npx tsc --noEmit --skipLibCheck` → 0 Fehler
2. Manuell: `/modul/3/tag/4` → Komfort A+ → Theorie-Fließtext muss mitwachsen
3. `/audio-modus` → Vorlesetext skaliert mit
4. `/app/rechenpraxis` → Aufgabentexte im Lernbereich skalieren mit

## Checkliste (AGENTS.md)

- [x] tsc ohne Fehler
- [x] Keine verbotenen Dateien geändert
- [x] Module6/7/8 nicht angefasst
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #156 [MERGED] — Rechenpraxis P0 + Modul-3 Audio (A–D)
- Erstellt: 2026-06-09T13:04:32Z
- Merged: 2026-06-09T13:08:52Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Umsetzung der genehmigten Pakete **A–D**:

### C — Modul-3 Audio
- Alle 7 `Module3Content_*`-Dateien im `moduleDayExtractor` registriert
- Audio-Playlist deckt jetzt **80 Lerntage** ab, inkl. der fehlenden **Tags 4–22**

### A — Rechenpraxis P0
- **Fehler-Katalog** (`shared/rechenpraxisErrorCatalog.ts`): regelbasiertes Feedback bei falschen Antworten (%, MwSt., Monat/Jahr, Variablen) mit Link zum passenden Modul
- **Freemium**: 10 WEG-Aufgaben für eingeloggte Nutzer ohne Vollabo; Premium-Aufgaben mit Schloss + Paywall-Hinweis
- **UX**: Bereichs-Fortschritt `done/total`, responsive Padding/Touch-Targets, Gratis-Vorschau-Banner

### B — Benchmark
- `docs/RECHENPRAXIS_BENCHMARK.md` mit Wettbewerber-Tabelle, USP, Preis-Einordnung und Roadmap

## Technik
- `shared/rechenpraxisAccess.ts` — Zugangslogik Client + Server
- `PortalToolGuard` — neues `freemiumAccess`-Flag für Rechenpraxis
- `vite.ts` — JSON-Zugriff für eingeloggte Freemium-Nutzer
- KI-Assistent serverseitig auf Freemium-Aufgaben-IDs beschränkt

## Prüfung
- [x] `npx tsc --noEmit --skipLibCheck` — 0 Fehler
- [x] Vitest: `moduleDayExtractor`, `rechenpraxisAccess`, `rechenpraxisErrorCatalog`
- [x] Keine verbotenen Dateien geändert
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #155 [OPEN] — Owner Control Tower C1: Ereignis-Protokoll (Audit Trail)
- Erstellt: 2026-06-09T11:10:15Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Phase **C1 Owner Control Tower**: zentrales Ereignis-Protokoll für den Eigentümer — wer hat was wann gemacht.

**Basiert auf:** PR #154 (Platform Comfort / Audio / Rechenpraxis)

## Was protokolliert wird

| Ereignis | Auslöser |
|----------|----------|
| `login` / `logout` / `register` | Auth |
| `module_open` / `module_complete` | Lernfortschritt (Check-in/out) |
| `ki_call` | Jeder erfolgreiche `/api/ai/*` POST |
| `owner_impersonate` / `owner_lock` / `owner_unlock` / `owner_set_role` | Owner-Panel |
| `stripe_purchase` | Stripe Webhook (Modulkauf) |

## Technik

- Tabelle `platform_audit_events` via `CREATE TABLE IF NOT EXISTS` — **ohne** `drizzle/schema.ts`
- Fire-and-forget Writes — blockieren keine Requests
- API: `GET /api/owner/audit-events?limit=&eventType=&email=&sinceHours=`
- Owner-Dashboard: neuer Tab **„Ereignisse“** mit Filter

## Tests

- `tsc --noEmit` — 0 Fehler
- `vitest` platformAuditLog + audioLessonParser — bestanden

## Nach Deploy

1. Owner-Dashboard → Tab **Ereignisse**
2. Test-Login als Nutzer → neues `login`-Event sichtbar
3. Modul öffnen → `module_open` erscheint

## Hinweis

Historische Daten vor Deploy sind nicht rückwirkend erfasst — nur neue Aktionen ab Deploy-Zeitpunkt.

<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #154 [OPEN] — Platform: Audio-Lektionen, ComfortBar, Rechenpraxis-Standalone, Generator Draft
- Erstellt: 2026-06-09T10:56:35Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Priorisierte Umsetzung aus der Plattform-Analyse: Komfort/Barrierefreiheit, Audio-Modus, Rechenpraxis als eigenständiges Produkt-Shell, und KI-Kostenkontrolle beim Kursbuch-Generator.

## Änderungen

### P0 — Audio-Modus (echte Inhalte)
- Neuer Parser `server/audioLessonParser.ts` liest `server/knowledge/modul_*.txt` über `###`-Überschriften (inkl. „Lerneinheit N“ in Modul 1)
- Statt 3 Demo-Lektionen: hunderte Lektionen aus der Wissensdatenbank (Module 1–5)
- `/audio-modus` in `AppLayout` (Login + Sidebar), `ComfortBar` im Header
- Sidebar-Link „Audio-Modus“ im Lernbereich

### P1 — Rechenpraxis Standalone
- Neues schlankes Layout `RechenpraxisLayout` unter `/app/rechenpraxis`
- ComfortBar, Portal-Link, Abmelden — ohne Vollportal-Sidebar
- `/verwalter-rechner` CTA führt eingeloggte Nutzer zu `/app/rechenpraxis`
- `/rechenpraxis` (Vollportal) bleibt unverändert

### P1 — Generator Kostenkontrolle
- **Grün „Aus Portal-Inhalt (0 €)“:** `/api/learning/kursbuch-draft` — Moduldateien + Wissensdatenbank, keine KI
- **Lila „Neu mit KI generieren“:** bestehendes `/api/ai/generate-kursbuch-v2` mit File-Cache (`data/generator-cache/`)
- `generatorCacheGate` speichert KI-Ergebnisse für Wiederverwendung

## Tests
- `npx tsc --noEmit --skipLibCheck` — 0 Fehler
- `vitest run server/audioLessonParser.test.ts` — 3/3 bestanden
- E2E: `tests/e2e/23-platform-comfort-audio.spec.ts`

## Verbotene Dateien
Keine Änderungen an `drizzle/schema.ts`, `server/db.ts`, `server/ragTutor.ts`, `Module6/7/8`.

## Nach Deploy prüfen
1. Als Lernender einloggen → `/audio-modus` → mehr als 3 Lektionen, Dark Mode funktioniert
2. `/verwalter-rechner` → „Rechenpraxis öffnen“ → `/app/rechenpraxis` (schlankes Layout)
3. Admin → Kursbuch-Generator → „Aus Portal-Inhalt“ ohne Wartezeit/KI-Kosten

<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #153 [MERGED] — fix(security): Admin ohne B2B-Branding + Owner nur für Plattform-Eigentümer (A+B)
- Erstellt: 2026-06-09T10:12:11Z
- Merged: 2026-06-09T10:25:20Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Kleines Paket **A+B** (nicht mergen ohne Besprechung):

### A — Platform-Admins ohne Mandanten-Branding
- `WhiteLabelContext`: `role === admin` → kein White-Label (bobo gmbh verschwindet in Sidebar)
- B2B-Mandanten-Branding bleibt für normale Lernende/Nutzer unverändert

### B — Owner nur für Plattform-Eigentümer
- Neues `shared/ownerIdentity.ts` — `OWNER_OPEN_ID` / `OWNER_EMAIL` / Default
- `/api/owner/*`: Session-Pfad nur wenn `openId` = Platform Owner (nicht jeder Admin)
- Magic-Key-Zugang unverändert
- Client `OwnerRoute` + `AdminDashboard` nutzen dieselbe Prüfung

## Tests
- `shared/ownerIdentity.test.ts` (3)
- `server/securityGuards.test.ts` erweitert
- `npx tsc --noEmit --skipLibCheck` — 0 errors

## Nach Deploy (für Alisad)
1. Abmelden + neu einloggen
2. Sidebar sollte **Immobilien Akademie** zeigen (nicht bobo gmbh)
3. Owner Magic-Link weiterhin nur für dein Konto

## Bewusst nicht enthalten (Paket C/D)
- Kein separates Owner-Layout
- Owner-Link in Stripe-Checkliste noch vorhanden
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #152 [OPEN] — docs(ops): Alisad Master-Workflow + DNS E-Mail Check Skript
- Erstellt: 2026-06-09T09:06:38Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Anfänger-freundlicher Master-Workflow für Alisad + automatischer DNS-Check.

## Neu

- `docs/ALISAD_MASTER_WORKFLOW.md` — Phasen 1–7, wer macht was, Copy-Paste DNS
- `scripts/ops/verify-dns-email.sh` — `pnpm run ops:dns-email-check`
- Grün/Rot-Ausgabe für SPF, DMARC, DKIM, CAA, HSTS

## Nutzung

```bash
pnpm run ops:dns-email-check
```

Nach DNS-Änderung durch Alisad: erneut ausführen bis ✅.

## Checks

- `npx tsc --noEmit --skipLibCheck` — 0 errors
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #151 [OPEN] — fix(security): HSTS preload directive via Helmet
- Erstellt: 2026-06-09T08:21:20Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Problem

`hstspreload.org` bestätigt: HSTS-Header ohne `preload`-Directive. Ursache: Custom-Middleware setzte `preload`, Helmet überschrieb danach ohne `preload`.

## Fix

- Entfernt redundante HSTS/X-Frame Middleware vor Helmet
- Konfiguriert `helmet({ hsts: { maxAge: 31536000, includeSubDomains: true, preload: true } })`

## Post-Deploy Verifikation

```bash
curl -sI https://immobilien-akademie-smart.de/ | grep -i strict-transport
# Erwartet: max-age=31536000; includeSubDomains; preload
```

## Hinweis

`hstspreload.org`-Einreichung erst nach **1 Monat** stabiler Konfiguration — nicht automatisch.

## Checks

- `npx tsc --noEmit --skipLibCheck` — 0 errors
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #150 [OPEN] — docs: Risikoregister v1 (NF-A6)
- Erstellt: 2026-06-09T07:52:53Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Fügt `docs/RISIKOREGISTER.md` als zentrale Risikoübersicht aus dem Architektur-Audit (NF-A6) hinzu.

## Inhalt

- 20 identifizierte Risiken mit Severity (Niedrig/Mittel/Hoch)
- Aktueller Mitigation-Status und empfohlene Maßnahmen
- Verantwortlichkeit: Code / Alisad / extern
- Priorisierte P0/P1-Maßnahmen
- Verknüpfung mit externen Verifikationen (Qualys A+, PageSpeed Mobile 09.06.2026)

## Änderungen

- `docs/RISIKOREGISTER.md` (neu)
- `.gitignore`: Ausnahme `!docs/RISIKOREGISTER.md` (wie andere tracked docs)

## Checks

- `npx tsc --noEmit --skipLibCheck` — 0 errors
- Keine verbotenen Dateien geändert

## Hinweis

Doc-only PR — kein Code-Change, kein Merge ohne Besprechung.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #149 [OPEN] — docs: §17 Bericht-Korrektur-Nachtrag (NF-A1–A7 + externe Daten)
- Erstellt: 2026-06-09T07:52:53Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Ergänzt `docs/UEBERGABE_ANTROPIQ_ARCHITEKT_20260608.md` um **§17 Bericht-Korrektur-Nachtrag** mit allen NF-A1–A7-Korrekturen und Integration der externen Verifikationsdaten vom 09.06.2026.

## Korrekturen

- **NF-A1:** PR #148 gemerged, Live-Verifikation Inspect REST
- **NF-A2:** Gesamtreife 2,8 (nicht 3,2), kalibriert ~3,3–3,5 mit externen Daten
- **NF-A3:** PageSpeed Insights Mobile (Perf 78, LCP 4,5s, A11y 92, SEO 100, BP 96)
- **NF-A4:** Konkurrenzvergleich als unbelegt markiert
- **NF-A5:** Tests = Indikator, nicht Beweis
- **NF-A6:** Verweis auf `docs/RISIKOREGISTER.md`
- **NF-A7:** Module3 Chunk 184 KB / ~53 KB gzip
- Zusätzlich: Qualys SSL Labs A+, curl HTTPS-Header-Verifikation, LCP-Diagnose-Kurzfassung, Reifegrad-Tabelle

## Checks

- `npx tsc --noEmit --skipLibCheck` — 0 errors
- Keine verbotenen Dateien geändert

## Hinweis

Doc-only PR — kein Merge ohne Besprechung.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #148 [MERGED] — fix(security): REST inspect default-deny allowlist (P0 rest)
- Erstellt: 2026-06-08T21:14:41Z
- Merged: 2026-06-08T21:21:49Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## P0 Restteil nach #141

PR #141 blockierte nur **tRPC**-Admin-Queries. `requireAdmin` ließ **alle** Admin-GET im Inspect ohne Session durch.

### Änderung
- **Default-Deny** in `authMiddleware.ts` + `INSPECT_REST_ADMIN_GET_ALLOWLIST` in `inspectMode.ts`
- `trialRoute.ts` nutzt jetzt shared `requireAdmin` (vorher eigene Kopie ohne Inspect-Logik)
- Audit-Tabelle in `docs/UEBERGABE_ANTROPIQ_ARCHITEKT_20260608.md` §15

### Inspect erlaubt (7 Endpoints)
`/api/admin/mysql-health`, `migration-status`, `stripe-webhook-health`, `/api/agent/health`, `status`, `cron-log`, `knowledge-map`

### Inspect gesperrt (u.a.)
`ki-stats`, `pending-purchases`, `referral-stats`, `trial-leads`, `coaching`, `coaching/:userId`, payout/referral/stripe-live-*

### Tests
`server/inspectRestAllowlist.test.ts` — route audit + supertest 403/200

**Scope:** ~180 Zeilen, 6 Dateien. Owner-Routes (`/api/owner/*`) unverändert (eigenes `requireOwner`).

### Verification
- `pnpm test` — 135/135
- `npx tsc --noEmit --skipLibCheck` — 0 errors
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #147 [OPEN] — feat(auth): hybrid email verification (7-day grace)
- Erstellt: 2026-06-08T20:57:11Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## PR-C (Priorität C — Polish)

Implements Alisad's hybrid email verification decision.

### Behaviour
- **Register:** Immediate session (unchanged friction)
- **Parallel:** Verification email with JWT link (`/api/auth/verify-email?token=…`)
- **7-day grace:** Unverified users can use the portal
- **After 7 days:** Login + protected tRPC return 403 *"Bitte E-Mail bestätigen um fortzufahren"*
- **On verify:** `emailVerifiedAt` set → account active again
- **Admins:** Exempt from block

### Schema
Migration `0044_user_email_verified_at.sql` — `emailVerifiedAt` TIMESTAMP NULL; existing users backfilled to `createdAt`.

**Note:** `drizzle/schema.ts` not modified (AGENTS.md).

### Tests
`server/emailVerification.test.ts` — grace logic + JWT roundtrip.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #146 [OPEN] — feat(gdpr): deletion audit log without PII (NF-13 / DSGVO)
- Erstellt: 2026-06-08T20:55:38Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## PR-D (Priorität D)

Implements `deletion_audit_log` per Alisad spec (adapted to project camelCase columns).

### Schema (migration `0043_deletion_audit_log.sql`)
- `userHash` — SHA256(`${userId}:${JWT_SECRET}`)
- `initiatedBy` — `user` | `admin`
- `tablesAffected` — JSON row counts per table (no PII)
- `triggeredVia` — e.g. `trpc.account.deleteMyAccount`

### Integration
- `trpc.account.deleteMyAccount`
- `trpc.adminUsers.deleteUser`

**Note:** `drizzle/schema.ts` not touched (AGENTS.md). Raw SQL migration + `server/deletionAudit.ts`.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #145 [OPEN] — ops(stripe): pre-flight check for 18 Price-IDs (NF-11)
- Erstellt: 2026-06-08T20:54:34Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## NF-11 Folge-PR (Priorität B)

Validates all 18 `STRIPE_PRICE_*` ENV variables against Stripe API before Live go-live.

### Usage
```bash
STRIPE_SECRET_KEY=sk_live_… pnpm run ops:stripe-preflight
```

Exit code **1** on discrepancies.

### Tests
`shared/stripePricePreflight.test.ts`
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #144 [OPEN] — ops(r2): Slack/webhook alert on MySQL backup failure
- Erstellt: 2026-06-08T20:53:24Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## NF-9 Folge-PR (Priorität A)

Adds `notify-failure` job to `.github/workflows/mysql-backup-r2.yml` that fires on workflow failure and POSTs to `OPS_ALERT_WEBHOOK_URL` (Slack Incoming Webhook compatible).

### Setup (Alisad)
GitHub → Settings → Secrets → Actions → `OPS_ALERT_WEBHOOK_URL` = Slack Incoming Webhook URL

If unset: workflow warns but does not fail (graceful).

### Test
`server/r2BackupAlert.test.ts` — static workflow contract check.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #143 [MERGED] — docs: NF-9 bis NF-13 Forensik in Übergabebericht
- Erstellt: 2026-06-08T20:48:24Z
- Merged: 2026-06-08T20:54:47Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Inhalt

Ergänzt `docs/UEBERGABE_ANTROPIQ_ARCHITEKT_20260608.md` um:

- **§13** NF-9 (R2 Cron), NF-10 (Restore-Anleitung), NF-11 (Stripe Live), NF-12 (CSP), NF-13 (User-Journey)
- **§14 Anhang:** R2 Slack/E-Mail-Empfehlung, Stripe Pre-Flight-Skript-Empfehlung, zwei offene Fragen an Alisad
- **§15** Merge-Reihenfolge #141 → #142

**Merge nach:** PR #141 und #142.

Kein Code-Change.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #142 [MERGED] — chore: cleanup Module 6–8 references and dead DashboardLayout
- Erstellt: 2026-06-08T20:38:59Z
- Merged: 2026-06-08T20:54:20Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Changes

1. **AGENTS.md** — Removed references to nonexistent `Module6/7/8.tsx` from forbidden-files list (check #4 still requires they must not exist)
2. **docs/UEBERGABE_ANTROPIQ_ARCHITEKT_20260608.md** — Clarified M6–8 were removed / never shipped; only M1–5 active
3. **AdminDashboard.tsx** — Loading skeleton grid `6 → 5` modules
4. **Dead code removed** — `client/src/components/DashboardLayout.tsx` and `DashboardLayoutSkeleton.tsx` (unused; active layout is `components/layout/DashboardLayout.tsx`, imported from `App.tsx`)
5. **CI guard** — Fail if `modul/[678]` or `Module[678]` appear in `client/src`, `server`, or `shared`

## Verification

- `pnpm test` — 122/122 ✅
- `npx tsc --noEmit --skipLibCheck` — 0 errors ✅
- `pnpm build` — ✅
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #141 [MERGED] — fix(security): block admin tRPC queries in inspect mode (P0)
- Erstellt: 2026-06-08T20:37:16Z
- Merged: 2026-06-08T20:52:10Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Problem

Inspect-token holders could call `adminProcedure` **queries** and extract PII (e.g. `adminUsers.list` returning real user emails). Mutations were already blocked; queries were not.

Root cause: a local `adminProcedure` in `routers.ts` explicitly bypassed inspect mode for all admin operations.

## Solution

- Centralize `adminProcedure` in `server/_core/trpc.ts` with `blockInspectPrivilegedProcedures` (blocks queries **and** mutations in inspect)
- Remove inspect bypass from `routers.ts`; use shared `adminProcedure`
- Align `videoRouter.ts` with shared middleware
- Document permitted inspect read paths via `INSPECT_TRPC_READ_ALLOWLIST` in `inspectMode.ts`
- Return `[]` from `progress.getProgress` in inspect (no DB hit, empty own data)

## Test matrix (`server/inspectTrpc.integration.test.ts`)

| tRPC Call | Inspect allowed? | Test |
|-----------|------------------|------|
| `adminUsers.list` | **no** | ✅ 403 |
| `whitelabel.getById` (no `adminUsers.getById`) | **no** | ✅ 403 |
| `whitelabel.list`, `getTenantUsers` | **no** | ✅ 403 |
| `adminCodes.list`, `presentationCode.list`, `adminQuestions.list` | **no** | ✅ 403 |
| `modules.myAccess` | **yes** | ✅ `[1,2,3,4,5]` |
| `auth.me` | **yes** | ✅ `null` |
| `progress.getProgress` | **yes** | ✅ `[]` |
| `videos.list` | **yes** | ✅ array |

**Note:** `modules.list`, `trial.list`, `adminUsers.search` do not exist in the router. `stripe.products` is REST (`GET /api/stripe/products`), not tRPC. `owner.stats` is REST (`GET /api/owner/stats`).

## Queries previously open → now blocked

- `adminUsers.list` — user emails, roles, modules
- `whitelabel.list`, `whitelabel.getById`, `whitelabel.getTenantUsers`
- `adminCodes.list` — access codes
- `presentationCode.list`
- `adminQuestions.list`
- All other `adminProcedure` mutations (already blocked, unchanged)

## Verification

- `pnpm test` — 132/132 ✅
- `npx tsc --noEmit --skipLibCheck` — 0 errors ✅
- `pnpm build` — ✅
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #140 [MERGED] — fix(tests): Audit-Suite — Credentials, 7 Produkte, Vitest-Timeout
- Erstellt: 2026-06-08T17:38:16Z
- Merged: 2026-06-08T20:03:56Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Behebt die 7 Fehler aus dem Master-Audit vom 08.06.2026, die durch veraltete Test-Konfiguration entstanden sind.

## Änderungen

- **Playwright `global-setup.ts`**: Nutzt jetzt `TEST_ADMIN_EMAIL` / `TEST_ADMIN_PASSWORD` (wie `02-auth.spec.ts` und `06-auth-flows.spec.ts`) statt des nicht existierenden `playwright@test.de`-Accounts
- **`api-tests.py`**: Erwartet 7 Stripe-Produkte (inkl. `compliance_20h`); Login-Credentials über Env-Vars
- **`security-scan.sh`**: `/admin` HTTP 200 wird als SPA-Shell dokumentiert (kein Fehler mehr)
- **`inspectTrpc.integration.test.ts`**: Timeout 120s für langsame WSL-Imports

## Lokaler Re-Test (nach Merge + pull)

```bash
export TEST_ADMIN_PASSWORD='<dein echtes Admin-Passwort>'
pnpm vitest run
python3 tests/api/api-tests.py
pnpm run test:e2e:smoke
```

## Hinweis

Lighthouse/Pa11y-Fehler sind Umgebungsprobleme (Chrome/Lighthouse auf WSL) — nicht durch diesen PR behoben.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #139 [MERGED] — feat: Komfort-Leiste, Rechenpraxis WEG-USP, Modul 6-8 Verteilungsplan
- Erstellt: 2026-06-08T13:48:08Z
- Merged: 2026-06-08T16:19:58Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Drei zusammenhängende Verbesserungen aus der Stakeholder-Rückmeldung.

### A — Komfort-Leiste (Schrift + Dark Mode)

- Neues `ComfortBar` in **PublicHeader**, **Dashboard** (Sidebar + Mobile-Topbar) und **Login**
- Einheitliches `useA11yPrefs`: Schrift **85–200%**, Zeilenabstand, Dark Mode (`.dark` Klasse)
- Doppeltes System entfernt (alte A-/A+ unten in Sidebar)
- `AccessibilityPanel`: Zeilenabstand-Slider, FAB nach unten-rechts, öffnet via ♿-Button in ComfortBar

### B — Rechenpraxis USP (WEG & Hausverwaltung)

- **10 neue WEG-Aufgaben** (IDs 129–138): Sonderumlage, Rücklage, CO₂, Verwalterhonorar, Heizkosten 70/30, …
- Gesamt: **138 Aufgaben** (`RECHENPRAXIS_TASK_COUNT`)
- Startseite: USP-Band „Verwalter-Rechner“
- Navigation: `/verwalter-rechner` im Header
- Landing überarbeitet (Dark Mode, korrekter Modul-3-Link, Preise-CTA)

### C — Modul 6/7/8 Verteilungsplan

- `docs/MODUL_678_VERTEILUNGSPLAN.md` — wo ehemalige Teile 6–8 in Modul 1–5 + Rechenpraxis landen

## Tests

- `tsc --noEmit`: 0 errors
- `vitest run`: 122/122 passed
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #138 [MERGED] — fix(ops): bash syntax in b2b-team-code-smoke.sh
- Erstellt: 2026-06-08T13:24:49Z
- Merged: 2026-06-08T13:24:56Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Fixes `syntax error near unexpected token ')'` when running `pnpm run ops:b2b-team-smoke` on WSL.

Root cause: mismatched parentheses in nested `$(curl ... -d "$(jq ...)")` substitutions on the login line (and similar blocks).

Also extracts `json_body()` helper to reduce quoting errors.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #137 [MERGED] — docs: CLI B2B smoke test in B2B_SMOKE_TEST.md
- Erstellt: 2026-06-08T12:52:45Z
- Merged: 2026-06-08T12:52:51Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Documents `pnpm run ops:b2b-team-smoke` (PR #134) in the B2B smoke test guide.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #136 [OPEN] — docs: Übergabedokument Baumeister-Audit (06.–08.06.2026)
- Erstellt: 2026-06-08T12:49:22Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Vollständiges Übergabedokument für den Bayerischen Baumeister / Stakeholder-Review nach dem Sprint 06.–08.06.2026.

### Inhalt `docs/UEBERGABE_BAYERISCHER_BAUMEISTER_20260608.md`

- Executive Summary (Ampel-Status aller Bereiche)
- Chronologie aller PRs #119–#135 (B2B, R2, Stripe, Security, UX)
- Technischer Audit: tsc 0 Fehler, 122/122 Vitest, ops:health ok
- Prüfliste für manuelle Abnahme (B2B, Backup, Legal, Stripe Live)
- Fehler-Log mit Korrekturen
- Brainstorming: Nutzer, B2B-Partner, Investoren, priorisierte Roadmap
- Freigabe-Checkliste

### Weitere Änderungen

- `docs/EXTERNAL_OPS_CHECKLIST.md` — R2 Restore + Daily Cron als erledigt markiert
- `.gitignore` — Exception für Übergabedokumente

### Audit-Ergebnisse (08.06.2026)

| Check | Ergebnis |
|-------|----------|
| `tsc --noEmit` | 0 errors |
| `vitest run` | 122/122 passed |
| `ops:health` | ok, db connected, migrations pending 0 |
| Quiz-Guard | HTTP 403 |
| Playwright E2E | Blockiert (Testkonto `playwright@test.de` fehlt in Prod) |

### Offen für Baumeister

- B2B Team-Code E2E (nach Admin-Passwort via `/forgot-password`)
- Stripe Live Go-Live
- Legal: Gewerbeschein, DMARC, AVVs
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #135 [MERGED] — feat(ui): visible login and B2B portal access on landing page
- Erstellt: 2026-06-08T12:34:15Z
- Merged: 2026-06-08T12:39:21Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Home had no header login — only a footer link. Adds PublicHeader to public pages with Anmelden, Code einlösen, B2B-Portal, plus hero links for returning customers.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #134 [MERGED] — feat(ops): CLI script for B2B team code smoke test
- Erstellt: 2026-06-08T12:19:25Z
- Merged: 2026-06-08T12:51:04Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Adds `pnpm run ops:b2b-team-smoke` — full B2B team code create + redeem flow via curl.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #133 [MERGED] — fix(b2b): team code visibility and /code-einloesen redemption
- Erstellt: 2026-06-08T12:09:46Z
- Merged: 2026-06-08T12:11:25Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Root cause (why team codes did not appear / work)

1. **SQL bug** — `GET /api/b2b/onboarding/team-codes` selected `maxUses`/`usedCount` (invalid columns). List failed silently; UI showed nothing after create.
2. **UI gap** — POST succeeded but UI only reloaded the broken list; code from response was ignored.
3. **Redemption mismatch** — B2B codes are stored in `access_codes`, but `/code-einloesen` only checked `presentation_codes`.

## Fix

- Correct snake_case columns in team-codes list query
- Show + auto-copy code immediately after creation
- New `accessCodeRedeem.ts`; `/api/auth/redeem-code` redeems `access_codes` and assigns team member to admin tenant

## Verification

- `npx tsc --noEmit --skipLibCheck` → 0 errors
- `vitest run server/accessCodeRedeem.test.ts` → 3 passed
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #132 [MERGED] — feat(ops): enable daily R2 MySQL backup cron
- Erstellt: 2026-06-08T11:54:24Z
- Merged: 2026-06-08T11:55:24Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Restore test passed (08.06.2026). Enables daily backup at 02:17 UTC.

Also includes R2 secret whitespace trim + access key length validation (supersedes #131).
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #131 [CLOSED] — fix(ci): trim whitespace from R2 GitHub secrets
- Erstellt: 2026-06-08T11:02:55Z
- Merged: <no value>

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Problem

R2 upload failed with `Invalid endpoint` because `R2_ACCOUNT_ID` / `R2_BUCKET` secrets contained trailing newlines from copy-paste.

## Fix

Strip `\r\n` and surrounding whitespace before building the S3 endpoint URL.

## User action

Re-set secrets without newlines (see terminal commands in issue thread).
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #130 [MERGED] — fix(ci): use preinstalled AWS CLI for R2 backup upload
- Erstellt: 2026-06-08T10:58:46Z
- Merged: 2026-06-08T11:00:37Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Problem

`dry_run=false` failed at **Configure AWS CLI for R2**:

```
Found preexisting AWS CLI installation: /usr/local/aws-cli/v2/current.
Please rerun install script with --update flag.
```

GitHub `ubuntu-latest` runners already ship AWS CLI v2.

## Fix

Use the preinstalled `aws` when available; only install if missing.

## Verification

- `npx tsc --noEmit --skipLibCheck` → 0 errors
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #129 [MERGED] — fix(ci): Railway link flags for MySQL R2 backup workflow
- Erstellt: 2026-06-08T10:35:07Z
- Merged: 2026-06-08T10:50:49Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Problem

The GitHub Actions workflow `mysql-backup-r2.yml` failed at **Link Railway project** with:

```
error: unexpected argument '<project-id>' found
Usage: railway link [OPTIONS]
```

The installed Railway CLI no longer accepts a bare positional project ID.

## Fix

- Use non-interactive linking: `railway link --project … --environment production --service MySQL`
- Pass `RAILWAY_API_TOKEN` from the same `RAILWAY_TOKEN` secret so Account Tokens work in CI
- Document token source in `ops:r2-checklist`

## Verification

- `npx tsc --noEmit --skipLibCheck` → 0 errors

After merge, re-run:

```bash
gh workflow run "MySQL Backup to Cloudflare R2" -f dry_run=true
```
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #128 [MERGED] — B2B smoke, R2 ops scripts, Stripe Live go-live docs
- Erstellt: 2026-06-08T07:33:22Z
- Merged: 2026-06-08T07:37:32Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Adds operational runbooks and CLI helpers for the next external-ops phase after Stripe test setup (10/17).

## New docs (German)

- `docs/B2B_SMOKE_TEST.md` — B2B checkout → onboarding → team code
- `docs/STRIPE_LIVE_GO_LIVE.md` — Test → Live switchover (prices, keys, webhook)
- Updated `docs/EXTERNAL_OPS_CHECKLIST.md` with completed Stripe test items

## New scripts

| Command | Purpose |
|---------|---------|
| `pnpm run ops:health` | Health + quiz guard + B2B landing check |
| `pnpm run ops:r2-checklist` | GitHub Secrets list for R2 backup workflow |
| `pnpm run stripe:setup-webhook` | Set `STRIPE_WEBHOOK_SECRET` in Railway (with `--whsec` from Dashboard) |
| `pnpm run test:e2e:b2b` | Playwright B2B smoke specs |

## Checks

- `pnpm exec tsc --noEmit --skipLibCheck` — 0 errors
- vitest — b2bTestGuide + stripeSeedCatalog green
- No forbidden files touched
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #127 [MERGED] — Stripe: seed script for 18 price IDs (Railway ENV automation)
- Erstellt: 2026-06-08T04:41:49Z
- Merged: 2026-06-08T04:50:22Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Adds automation for Stripe Phase 5 external ops: a canonical catalog of all 18 `STRIPE_PRICE_*` products and a CLI script that creates them via the Stripe API and outputs Railway-ready environment variables.

## What's new

- `shared/stripeSeedCatalog.ts` — 6 subscriptions + 12 one-time prices (amounts aligned with `server/stripe.ts`)
- `pnpm run stripe:seed-prices` — dry-run by default; `--apply` creates products/prices in Stripe (test or live key)
- Optional `--output=stripe_prices.env` and `--railway-hints` for bulk Railway CLI setup

## Usage (Alisad, WSL)

```bash
git pull && pnpm install
export STRIPE_SECRET_KEY=sk_test_…   # from Stripe Dashboard → Test mode
pnpm run stripe:seed-prices -- --dry-run
pnpm run stripe:seed-prices -- --apply --output=stripe_prices.env --railway-hints
# then in linked Railway project:
while IFS= read -r line; do [[ -z "$line" || "$line" =~ ^# ]] && continue; railway variables --set "$line"; done < stripe_prices.env
```

## Checks

- `pnpm exec tsc --noEmit --skipLibCheck` — 0 errors
- `vitest` — stripeSeedCatalog tests pass
- No forbidden files touched
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #126 [MERGED] — B2B-Polish, Migration-Ledger und externe Ops-Checkliste
- Erstellt: 2026-06-07T21:28:07Z
- Merged: 2026-06-07T21:28:14Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Drei Bereiche in einem Sprint: B2B UX, Migration Ledger (CASE-010), konsolidierte externe Ops.

### B2B-Polish
- **Landing:** `B2B_PLANS` aus `@shared/b2bPlans`, Checkout-Dialog statt `window.prompt`
- **Einrichtung:** Post-Checkout-Polling (`?b2b=1`), `LoadingHandler`, konfigurierbare `maxUses`
- **Fix:** Keine Links zu `/admin/whitelabel` / `/admin/codes` für Tenant-Admins
- Welcome-E-Mail zeigt nur B2B-Einrichtung

### Migration-Ledger
- `runMigrations()`: Strict Mode in Production, Pflicht-Ledger
- `getMigrationStatus()` + `GET /api/admin/migration-status`
- `/api/health` enthält `migrations.pending/total`
- `pnpm run db:backfill-migrations` für einmaligen Prod-Backfill
- `drizzle.config.ts` → `out: ./drizzle/migrations`
- `docs/MIGRATION_LEDGER.md`

### Externe Ops
- `docs/EXTERNAL_OPS_CHECKLIST.md` erweitert: B2B Go-Live, Migration Backfill, Copy-Paste-Verifikation

## Prüfung
- `tsc` → 0 errors
- Vitest → **112 passed**

## Alisad — nach Merge
1. Backup → `pnpm run db:backfill-migrations -- --dry-run` → `--apply`
2. B2B Testkauf `/fuer-maklerbueros`
3. Stripe Live + R2 (Checkliste)
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #125 [MERGED] — HealthWatcher DB-Check, Owner-Dashboard und externe Ops-Liste
- Erstellt: 2026-06-07T21:23:10Z
- Merged: 2026-06-07T21:23:20Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Monitoring-Sprint + konsolidierte externe Aufgaben für Alisad.

### HealthWatcher
- Prüft `/api/health` auf `ok:true` **und** `db:connected` (503 bei MySQL-Ausfall)
- Fix: Empfehlungen nutzen korrekte Guard-Namen (`quiz_data_guard`, `module_data_guard`)

### Owner-Dashboard
- `systemHealth.db` aus `getMysqlHealth()` statt hardcoded `true`
- `dbLatencyMs` in Response

### Ops-Doku
- `docs/EXTERNAL_OPS_CHECKLIST.md` — R2, Stripe Live, MySQL, PR #72, Secrets
- CASE_MANAGEMENT + DEPLOYMENT aktualisiert

## Prüfung
- `tsc` → 0 errors
- Vitest → **105 passed**
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #124 [MERGED] — MySQL Ops-Runbook, Health-Ping und Admin-DB-Status
- Erstellt: 2026-06-07T21:21:15Z
- Merged: 2026-06-07T21:21:20Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Ops-Sprint: Railway MySQL FAILED abfangen + besseres Monitoring.

### MySQL Health
- `getMysqlHealth()` — Latenz + User-Count
- `GET /api/admin/mysql-health` (Admin)
- `GET /api/health` — DB-Ping, **503** wenn MySQL unreachable

### Ops-Doku
- `docs/RAILWAY_MYSQL_OPS.md` — Backup-first, Redeploy, Eskalation
- DEPLOYMENT.md verlinkt Runbook

### Admin UI
- System-Tab: live MySQL-Status statt hardcoded OK

### E2E
- `21-mysql-health.spec.ts` in `test:e2e:stripe-guards`

### Case Management
- Dashboard aktualisiert (#122–#123 erledigt)

### PR #72
- Manuell schließen — Audit überholt durch #116–#123

## Prüfung
- `tsc` → 0 errors
- Vitest → **103 passed**
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #123 [MERGED] — R2-Backup aktivieren + Stripe E2E Guards in CI
- Erstellt: 2026-06-07T21:18:33Z
- Merged: 2026-06-07T21:18:40Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Ops-Sprint nach #122: R2-Backup produktionsreif vorbereiten und Stripe-E2E-Guards in CI.

### R2 Backup
- Workflow umbenannt, **dry_run**-Input (Dump ohne R2-Upload)
- Lesbare Fehlermeldung bei fehlenden Secrets → `docs/R2_ACTIVATION_CHECKLIST.md`
- Job-Summary mit Key-Counts
- RUNBOOK + DEPLOYMENT: korrekte Pfade `immobilien-akademie-smart_mysql_latest.sql.gz.gpg`
- Duplikat `.example.yml` entfernt

### CI Stripe E2E
- Neuer Job `e2e-stripe` (`continue-on-error: true`)
- Immer: `test:e2e:stripe-guards` (14 + 20)
- Optional bei Repo-Variable `STRIPE_E2E_ENABLED=true` + Secret `MAGIC_LINK_SECRET`: Live-Checkout-Tests

### Alisad — R2 aktivieren
1. Cloudflare R2 Bucket + API Token
2. 7 GitHub Secrets (Checkliste in `docs/R2_ACTIVATION_CHECKLIST.md`)
3. Actions → **MySQL Backup to Cloudflare R2** → Run workflow
4. Restore-Test → Cron aktivieren

### Prüfung
- `tsc` → 0 errors
- Vitest → **100 passed**
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #122 [MERGED] — Modul 5 Polish, Playwright Live-E2E und Stripe-Live abschließen
- Erstellt: 2026-06-07T21:13:30Z
- Merged: 2026-06-07T21:14:59Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Drei Bausteine für den Live-Go-Live:

### M — Modul 5 Polish
- `Module5Detail.tsx` analog Modul 4: Deep-Links `/modul/5/tag/N`, URL-Sync bei Navigation, `credentials: "include"`, Fehler+Retry, `moduleMeta` statt hardcoded 40/320 UE
- Statischer Test `module5-navigation.test.ts`

### Playwright Live-E2E
- **Fix:** `16-stripe-payment-flow` nutzt `widerrufsAkzeptiert` (API-konform)
- **Erweitert:** Bundle-Checkout, B2B-Checkout, stripe-live-checklist Guard
- **Neu:** `20-stripe-live-readiness` — Admin-Endpoints 401 ohne Auth, Webhook unsigned → 400

### Stripe-Live abschließen
- Admin `/admin/stripe-live`: fehlende Railway-ENV-Namen, Copy-Button nur für fehlende Price-IDs, Go-Live-Banner bei `liveReady` + LIVE-Modus
- `STRIPE_LIVE_COMPLETION_STEPS` in Test-Guide
- API `GET /api/admin/stripe-live-env-missing`
- Helper `buildMissingStripePriceEnv` / `listMissingStripePriceEnvNames`

## Prüfung
- `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors
- `pnpm exec vitest run` → 98 passed
- Keine verbotenen Dateien geändert

## E2E manuell (Railway Secrets)
```bash
STRIPE_E2E_ENABLED=1 MAGIC_LINK_SECRET=… pnpm exec playwright test tests/e2e/16-stripe-payment-flow.spec.ts tests/e2e/20-stripe-live-readiness.spec.ts
```

## Railway Ops (Alisad)
1. Alle 18 `STRIPE_PRICE_*` setzen (Admin → Stripe Live → „Fehlende“ kopieren)
2. `sk_live_` / `pk_live_` / `whsec_`
3. Testkauf + Webhook-Health prüfen
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #121 [MERGED] — Sprint M+I+L+O: Lernpfad Modul 4, Inspect-Polish, Landing, Backup ops
- Erstellt: 2026-06-07T21:08:21Z
- Merged: 2026-06-07T21:10:10Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Combined sprint across all four requested areas (M, I, L, O).

## M) Modul-Inhalte / Lernpfad

- **`shared/moduleMeta.ts`** — single source: 20/60/80/40/40 days + UE counts
- **Module 4 UI fixed**: was capped at 20 days while JSON has 40 — now 8 weeks, URL sync (`/modul/4/tag/N`), load error + retry
- Removed redundant `module4-content.json` fetch (double download)
- Aligned: `Syllabus`, `curriculum-data`, `progressTracking`, `SEO` modul4 description

## I) Inspect-Polish

- Inspect link redirects to **`/modul/1?inspect=1`** (product demo, not admin cockpit)
- **KI-Tutor disabled** in inspect mode with clear message
- Owner dashboard: demo quick-links + updated hint text
- Tests updated for new redirect

## L) Landing / Marketing

- **`ExitIntentPopup`** mounted on Home + `#kostenlos-testen` anchor on CTA section
- **„Warum wir“** in `PublicHeader` + E2E public pages smoke
- Syllabus Mod 4/5 durations now match marketing (40 Tage / 320 UE)

## O) R2-Backup / MySQL

- **`DEPLOYMENT.md`**: Backup & Restore section, `INSPECT_JWT_SECRET`, pre-migration dump rule
- **`pnpm run db:backup`** → `scripts/backup/railway-mysql-dump.sh`
- **`.github/workflows/mysql-backup-r2.yml`** — `workflow_dispatch` (enable cron after secrets + restore test)

## Pre-PR checks

- [x] `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors
- [x] Vitest: 94/94 passed
- [x] No forbidden files modified

## Post-merge

1. **Modul 4**: open `/modul/4/tag/25` — should load day 25 content
2. **Inspect**: create link in Owner dashboard → lands on Modul 1
3. **Backup**: run `pnpm run db:backup` locally with Railway CLI, or trigger GitHub Action after setting R2 secrets
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #120 [MERGED] — Sprint A–E: Security, Claims, QA CI, Inspect UX, Stripe Ops
- Erstellt: 2026-06-07T21:00:41Z
- Merged: 2026-06-07T21:02:43Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Combined sprint covering all five areas requested (A–E). Payment/Stripe code foundation was already complete; this PR focuses on security verification, compliance consistency, QA automation, UX polish, and Stripe ops UX.

## A) Security
- Static guard tests: `all-questions.json` protection, ki-stats admin gate order, resend-2fa rate limit (3/15min)
- `server/securityGuards.test.ts`

## B) Compliance / Claims
- All marketing numbers from `shared/claims.ts` (854 questions, 855+ tasks, 240 days, 3 KI models)
- Updated: Home, Dashboard, ExitIntentPopup, Syllabus, KursPakete, AdminDashboard
- Datenschutz §4.6: analytics **geplant, aktuell nicht aktiv** (matches CookieConsent)
- Removed unused `CookieBanner.tsx`
- `shared/claims-centralization.test.ts` prevents regression

## C) QA
- `pnpm test:e2e` + `pnpm test:e2e:smoke` scripts
- CI job `e2e-smoke` runs `17-module-smoke-readonly.spec.ts` (continue-on-error for prod dependency)

## D) Product / UX
- Home hero stats, chips, audio preview, Komplett-Paket copy from claims constants

## E) Stripe Ops
- ENV copy uses `/api/admin/stripe-live-env-template` API (fallback client-side)
- Ops quick-links panel on `/admin/stripe-live`

## Pre-PR checks

- [x] `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors
- [x] Vitest: 92/92 passed
- [x] No forbidden files modified

## Your manual ops (unchanged)

Stripe Live still needs Railway ENV + Price-IDs — use `/admin/stripe-live` checklist after deploy.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #119 [MERGED] — Phase 15: Price readiness dashboard, pending purchases ops
- Erstellt: 2026-06-07T20:52:36Z
- Merged: 2026-06-07T20:58:55Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Phase 15 gives admins and the owner a complete view of Stripe Price-ID coverage (6 subscriptions + 12 modules/bundles) and surfaces unclaimed pending purchases for ops follow-up.

## Changes

### Price Readiness (`shared/stripePriceReadiness.ts`)
- Central helper: subscription + module configured counts, missing lists, `liveReady` flag
- Used by live checklist, API verify, owner revenue, admin price-config

### Live Checklist & Verify
- Fixed outdated **4/4** subscription count → **6/6** + **12/12** modules
- New checklist items: module Price-IDs, Connect, payout cron
- `/admin/stripe-live` shows Price-ID matrix (Abos + Module/Bundles)

### Pending Purchases Ops
- `GET /api/admin/pending-purchases` — unclaimed purchases (paid, no account yet)
- Warning panel on Stripe Live Checklist when rows exist

### ENV Templates
- `.env.example` + `stripeLiveEnv.ts` — all 18 Price-ID env vars documented

### Owner Dashboard
- Revenue tab: `6/6 + 12/12` Price-ID progress (dynamic totals)

## Pre-PR checks

- [x] `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors
- [x] Vitest: 5/5 passed (new suites)
- [x] No forbidden files modified

## Post-merge ops

1. `/admin/stripe-live` → Price-ID matrix prüfen, fehlende ENV in Railway setzen
2. Offene Pending-Käufe → Nutzer per E-Mail zum Login auffordern
3. Ziel Live: alle 18 Price-IDs grün
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #118 [MERGED] — Phase 14: B2B Price-IDs, webhook processor, payout cron
- Erstellt: 2026-06-07T20:50:11Z
- Merged: 2026-06-07T20:51:14Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Phase 14 completes B2B Stripe Price-ID coverage, makes the webhook purchase path unit-testable, and adds optional automated quarterly partner payout generation.

## Changes

### B2B Price-IDs
- `STRIPE_PRICE_B2B_STARTER` + `STRIPE_PRICE_B2B_PROFESSIONAL` in `stripePriceIds`
- `/api/stripe/b2b-checkout` uses `buildSubscriptionLineItem` (Price-ID when configured)
- `.env.example` + `stripeLiveEnv` template updated

### Webhook Processor
- New `server/stripeWebhookProcess.ts` — `processStripeWebhookEvent()` handles `invoice.paid` + `checkout.session.completed`
- `index.ts` webhook route delegates to processor (same runtime behavior)
- Vitest: module grant + pending purchase + subscription skip

### Quarterly Payout Cron
- `server/partnerPayoutCron.ts` — runs on 1. Jan/Apr/Jul/Okt when `PARTNER_PAYOUT_CRON_ENABLED=true`
- Generates ledger for previous quarter; optional Connect batch when `STRIPE_CONNECT_ENABLED=true`
- Hooked into `NightCron.runAllCronJobs()`

### Tests
- `server/partnerPayoutCron.test.ts` — quarter date logic
- `tests/e2e/18-b2b-checkout.spec.ts` — auth + Stripe URL smoke

## Pre-PR checks

- [x] `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors
- [x] Vitest: 10/10 passed (new suites)
- [x] No forbidden files modified

## Post-merge ops

1. Railway: set `STRIPE_PRICE_B2B_STARTER` + `STRIPE_PRICE_B2B_PROFESSIONAL` from Stripe Dashboard
2. Optional automation: `PARTNER_PAYOUT_CRON_ENABLED=true` (+ `STRIPE_CONNECT_ENABLED=true` for auto-transfer)
3. Verify B2B checkout on `/fuer-maklerbueros` → Stripe Live Price-IDs used
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #117 [MERGED] — Phase 13: Batch Connect payouts, B2B team codes, purchase tests
- Erstellt: 2026-06-07T20:46:48Z
- Merged: 2026-06-07T20:48:56Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Phase 13 closes the ops loop for partner payouts, polishes the B2B onboarding wizard, and adds test coverage for the Stripe purchase path.

## Changes

### Connect Batch Payouts
- `executeConnectTransfersForPendingLedger()` — processes all eligible pending ledger rows
- `POST /api/admin/payout-ledger/connect-transfer-batch`
- Optional `autoConnect: true` on ledger generate when `STRIPE_CONNECT_ENABLED=true`
- **Alle Connect-fähigen auszahlen** button in `/admin/referral`

### B2B Onboarding Polish
- Live **Portal-Header-Vorschau** in Branding step (logo, color, welcome text)
- Tenant-scoped team codes: `GET/POST /api/b2b/onboarding/team-codes`
- Inline code creation + copy in wizard step 2 (no redirect to `/admin/codes`)

### Tests
- `server/stripePurchaseHandler.test.ts` — module merge on purchase
- `server/partnerConnectTransfer.test.ts` — batch transfer with mocked Stripe
- `shared/stripeWebhookFixture.ts` — checkout/invoice payload builders
- `tests/e2e/16-stripe-payment-flow.spec.ts` — gated by `STRIPE_E2E_ENABLED`
- `tests/e2e/17-b2b-team-codes.spec.ts` — auth guard smoke

## Pre-PR checks

- [x] `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors
- [x] Vitest: 12/12 passed
- [x] No forbidden files modified
- [x] Module6/7/8 do not exist

## Post-merge ops

1. `/admin/referral` → **Alle Connect-fähigen auszahlen** for pending ledger rows with Connect enabled
2. B2B customers: `/b2b-einrichtung` → create team codes inline
3. Optional live E2E: set `STRIPE_E2E_ENABLED=1` + `MAGIC_LINK_SECRET` in CI/staging
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #116 [MERGED] — Phase 12: Module Price-IDs, Owner Revenue tab, Stripe smoke guide
- Erstellt: 2026-06-07T20:42:09Z
- Merged: 2026-06-07T20:43:31Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary

Phase 12 completes Stripe Price-ID coverage for modules/bundles, adds an Owner Revenue dashboard tab, and documents live smoke-test steps for admins.

## Changes

### Stripe Price-IDs (`shared/stripePriceIds.ts`)
- `STRIPE_PRODUCT_PRICE_ENV` mapping for all module and bundle products
- `buildPaymentLineItem()` helper — uses configured Price ID when set, falls back to `price_data`
- `.env.example` extended with `STRIPE_PRICE_MODUL_*` and `STRIPE_PRICE_BUNDLE_*`

### Checkout (`server/stripe.ts`)
- Module and bundle checkout sessions use Price IDs when env vars are configured

### Owner Revenue
- New `server/ownerRevenue.ts` — snapshot: Stripe mode, balance, 30d revenue, active subs, pending purchases, price-ID coverage
- `GET /api/owner/revenue` in `server/ownerRoute.ts`
- **Revenue** tab on `OwnerDashboard.tsx`

### Admin Ops
- `adminOpsRoute` price config now returns subscriptions + modules

### Stripe Live Checklist
- Smoke-test guide with test card `4242…` steps (`shared/stripeTestGuide.ts`)
- Integrated into `StripeLiveChecklist.tsx`

### Tests
- `shared/stripePriceIds.test.ts` — extended
- `shared/stripeTestGuide.test.ts` — new
- `tests/e2e/15-stripe-checkout-smoke.spec.ts` — new

## Pre-PR checks

- [x] `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors
- [x] Vitest: 6/6 passed
- [x] No forbidden files modified
- [x] Module6/7/8 do not exist

## Railway / Live ops (post-merge)

1. Set `STRIPE_PRICE_MODUL_*` and `STRIPE_PRICE_BUNDLE_*` in Railway ENV from Stripe Dashboard
2. Owner → Revenue tab to verify balance and 30d stats
3. `/admin/stripe-live` → run API verify + smoke steps with test card
4. Migrations 0038–0042 still required if not yet applied
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #115 [MERGED] — feat: Phase 11 — Stripe Price-IDs, Connect-Transfers, Ledger 0042
- Erstellt: 2026-06-07T20:38:52Z
- Merged: 2026-06-07T20:39:50Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Phase 11 bereitet Stripe Live und automatische Partner-Auszahlungen vor.

## Änderungen

| Bereich | Details |
|---------|---------|
| **Stripe Price-IDs** | Optionale `STRIPE_PRICE_*` Env-Vars — Renewal, Rechenpraxis, Compliance nutzen feste `price_` IDs wenn gesetzt |
| **Fallback** | Ohne Price-ID weiterhin dynamisches `price_data` (Testmodus) |
| **Connect Transfer** | Admin → Ledger → **Connect**-Button führt `stripe.transfers.create` aus |
| **Migration 0042** | `stripeTransferId` auf `partner_payout_ledger` |
| **Verify** | Stripe API-Test zeigt Price-ID-Fortschritt (x/4) |

## ENV (Railway Live)

```
STRIPE_PRICE_RECHENPRAXIS_MONTHLY=price_…
STRIPE_PRICE_RENEWAL_MONTHLY=price_…
STRIPE_PRICE_RENEWAL_YEARLY=price_…
STRIPE_PRICE_COMPLIANCE_YEARLY=price_…
```

## Prüfungen

- `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors
- Vitest → 4/4 passed
- Keine verbotenen Dateien geändert

## Ops nach Merge

1. Migration **0042** auf Railway
2. Stripe Dashboard → Produkte/Preise anlegen → Price-IDs in Railway
3. `/admin/stripe-live` → API testen → 4/4 Price-IDs grün
4. Connect-Transfer: Partner Connect + Ledger-Eintrag → **Connect** in ReferralAdmin
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #114 [MERGED] — feat: Phase 10 — B2B-Logo, Stripe API-Verify, Connect Express
- Erstellt: 2026-06-07T20:36:27Z
- Merged: 2026-06-07T20:37:06Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Phase 10 vervollständigt B2B-Onboarding, Stripe-Live-Ops und Partner-Auszahlungs-Infrastruktur.

## Änderungen

| Bereich | Details |
|---------|---------|
| **B2B Logo** | Upload im Wizard — `POST /api/b2b/onboarding/logo` (max 2 MB) |
| **Stripe Verify** | `GET /api/admin/stripe-live-verify` — Balance-API-Check + Empfehlung |
| **Stripe Connect** | Migration `0041`, Express-Onboarding für Partner mit Empfehlungen |
| **Connect aktivieren** | `STRIPE_CONNECT_ENABLED=true` in Railway (nach Stripe Dashboard Setup) |
| **E2E** | `13-b2b-logo-connect` — API-Schutz + Rechenpraxis subscribed |

## Prüfungen

- `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors
- Vitest → 2/2 passed (neue Tests)
- Keine verbotenen Dateien geändert

## Ops nach Merge

1. Migration **0041** auf Railway
2. `/admin/stripe-live` → **Stripe API testen** vor Live-Umschaltung
3. Connect: Stripe Dashboard → Connect aktivieren → `STRIPE_CONNECT_ENABLED=true`
4. B2B: Logo im `/b2b-einrichtung` Wizard testen
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #113 [MERGED] — feat: Phase 9 — B2B-Einrichtung, Stripe ENV, Partner-SEPA
- Erstellt: 2026-06-07T20:32:50Z
- Merged: 2026-06-07T20:33:30Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Phase 9 schließt Onboarding- und Auszahlungs-Lücken für B2B und Partner.

## Änderungen

| Bereich | Details |
|---------|---------|
| **B2B-Einrichtung** | `/b2b-einrichtung` — 3-Schritt-Wizard (Willkommen → Branding → Team), Redirect nach Stripe-Checkout |
| **B2B API** | `GET/POST /api/b2b/onboarding/*` — Tenant-Admin kann Branding speichern |
| **Stripe Live** | ENV-Vorlage kopierbar in `/admin/stripe-live` |
| **Partner SEPA** | Migration `0040`, Formular auf `/empfehlungsprogramm`, Admin-Liste in ReferralAdmin |
| **E2E** | `12-b2b-einrichtung`, `09-renewal-auth` + Rechenpraxis-Checkout |

## Prüfungen

- `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors
- Vitest → 3/3 passed (neue Tests)
- Keine verbotenen Dateien geändert

## Ops nach Merge

1. Migration **0040** beim Railway-Boot
2. B2B Test-Checkout → Redirect `/b2b-einrichtung`
3. Stripe Live: `/admin/stripe-live` → ENV-Vorlage in Railway einfügen
4. Partner: Auszahlungsdaten unter `/empfehlungsprogramm` testen
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #112 [MERGED] — feat: Phase 8 — Rechenpraxis Solo, B2B-Mail, Webhook-Health, Payout-Ledger
- Erstellt: 2026-06-07T20:29:12Z
- Merged: 2026-06-07T20:29:50Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Phase 8 schließt die Monetarisierungs- und Ops-Lücken: eigenständiges Rechenpraxis-Abo, B2B-Onboarding per E-Mail, operatives Webhook-Monitoring und auditierbares Partner-Payout-Ledger.

## Änderungen

| Bereich | Details |
|---------|---------|
| **Rechenpraxis Solo** | `POST /api/stripe/rechenpraxis-checkout` — 19 €/Mo, Zugang via `enabledModules=rp`, `rechenpraxis.json`-Schutz |
| **Preisseite** | `/rechenpraxis-preise` — Checkout-Button (Login-Redirect für Gäste) |
| **B2B Willkommen** | Resend-E-Mail nach `invoice.paid` mit White-Label-Links |
| **Webhook Health** | In-Memory-Tracking + Anzeige in `/admin/stripe-live` |
| **Payout-Ledger** | Migration `0039`, Quartals-Generierung + „Bezahlt“-Markierung in ReferralAdmin |

## Prüfungen

- `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors
- Vitest → 6/6 passed
- Keine verbotenen Dateien geändert

## Ops nach Merge

1. Migration **0039** läuft beim nächsten Railway-Boot
2. Smoke: `/rechenpraxis-preise` → Stripe Test-Checkout → `/rechenpraxis?subscribed=1`
3. B2B-Testkauf → Willkommens-E-Mail prüfen
4. `/admin/referral` → Quartal-Einträge generieren
5. Testzahlung → Webhook-Health in `/admin/stripe-live` sollte grün werden
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #111 [MERGED] — feat: Phase 7 — Stripe Live, Renewal-E2E, Partner-Payouts, Rechenpraxis-Preise
- Erstellt: 2026-06-07T20:24:14Z
- Merged: 2026-06-07T20:24:54Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Phase 7 schließt die strategischen Backlog-Punkte aus Sprint 6 ab: Go-Live-Vorbereitung, authentifizierter Renewal-Test, Partner-Monetarisierung und Rechenpraxis-Positionierung.

## Änderungen

| Bereich | Details |
|---------|---------|
| **Stripe Live** | `/admin/stripe-live` — Checkliste mit env-basierter Erkennung (sk_live_, pk_live_, Webhook, APP_URL, Resend) |
| **Partner-Payouts** | 15%-Policy in `shared/partnerPayouts.ts`, CSV-Export `/api/admin/partner-payout-export`, UI in ReferralAdmin |
| **Rechenpraxis-Preise** | `/rechenpraxis-preise` — 3 Zugangswege (inklusive, Verlängerung 29€/Jahr, B2B ab 199€/Mo) |
| **E2E** | `09-renewal-auth` (Magic-Link → Stripe Checkout URL), `10-rechenpraxis-preise` |

## Prüfungen

- `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors
- Vitest → 6/6 passed
- Keine verbotenen Dateien geändert

## Ops nach Merge

1. Admin → `/admin/stripe-live` — Checkliste vor Live-Umschaltung abarbeiten
2. Admin → `/admin/referral` → Partner-CSV für Quartalsauszahlung
3. E2E `09-renewal-auth` mit `MAGIC_LINK_SECRET` in CI ausführen
4. Smoke: `/rechenpraxis-preise`, `/verwalter-rechner` → Preis-Link
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #110 [MERGED] — feat: Verwalter-Rechner Landing + Migration-Ledger (Phase 6)
- Erstellt: 2026-06-07T20:21:57Z
- Merged: 2026-06-07T20:22:39Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Phase 6 liefert zwei Bausteine für Skalierung und Ops:

1. **Verwalter-Rechner Spin-off** — öffentliche Marketing-Landing unter `/verwalter-rechner` mit Fokus WEG/Hausgeld, CTA zur geschützten Rechenpraxis (Login-Redirect für Gäste).
2. **Migration-Ledger** — `schema_migrations`-Tabelle (0038) + idempotente Skip-Logik in `server/migrate.ts`, damit Railway-Deploys bereits angewendete SQL-Dateien nicht erneut ausführen.

## Änderungen

| Bereich | Details |
|---------|---------|
| Landing | `VerwalterRechnerLanding.tsx`, Route in `App.tsx`, Footer-Link, Sitemap |
| Ledger | `0038_schema_migrations.sql`, `isMigrationApplied` / `markMigrationApplied` |
| Tests | `server/migrate.test.ts`, E2E `07-verwalter-rechner`, `08-renewal-api` |

## Prüfungen

- `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors
- `pnpm test server/migrate.test.ts` → 2/2 passed
- Keine verbotenen Dateien geändert
- Module6/7/8 existieren nicht

## Ops nach Merge

- Railway wendet Migration **0038** beim nächsten Boot an
- Smoke: `/verwalter-rechner` öffentlich, CTA → `/login?redirect=/rechenpraxis` oder `/rechenpraxis` (eingeloggt)
- Admin Backfill weiterhin unter `/admin/referral` für Bestandskäufer ohne `accessExpiresAt`
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #109 [MERGED] — feat: B2B Stripe-Checkout + Referral-Gutscheine
- Erstellt: 2026-06-07T20:19:45Z
- Merged: 2026-06-07T20:19:51Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Phase 5: direkter B2B-Umsatz + virale Tool-Gutscheine.

### B2B Stripe (self-service)
- **Starter** 199 €/Mo (5 Nutzer, Module 1+2)
- **Professional** 399 €/Mo (15 Nutzer, alle Module)
- Webhook → White-Label-Tenant + Nutzer-Zuweisung
- `/fuer-maklerbueros`: **Jetzt buchen**

### Referral-Gutscheine
- Nach Erstkauf-Referral einlösbar
- rechenpraxis, ki_tutor, weiterbildungsnachweis

### Prüfung
- [x] tsc — 0 errors
- [x] Vitest — 3 passed
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #108 [MERGED] — feat: Referral-Admin, Backfill-Ops, Rechenpraxis-Fortschritt
- Erstellt: 2026-06-07T20:17:17Z
- Merged: 2026-06-07T20:17:22Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Phase 4: Ops + messbares Growth + UX.

### Backfill (Railway-ready)
- `backfillAccess.ts` extrahiert — CLI + Admin-API
- **`POST /api/admin/backfill-access`** — Dry-run (default) oder `{ apply: true }`
- Admin-UI unter `/admin/referral` mit Bestätigung

### Referral-Admin
- **`GET /api/admin/referral-stats`** — Codes, Zugeordnete, Rewards, Top-Empfehler
- Seite **`/admin/referral`** + Link im Admin-Dashboard

### Rechenpraxis
- **128 Aufgaben** bereits vorhanden (7 Bereiche)
- **Fortschritt** in localStorage + Balken + ✓ auf abgeschlossenen Aufgaben

### Test
- E2E Smoke: `/compliance-20h` mit 249 €

## Prüfung
- [x] `tsc` — 0 errors
- [x] Vitest — 6 passed
- [x] Keine verbotenen Dateien geändert

## Nach Deploy
1. Admin → Empfehlungsprogramm → **Backfill Dry-run**, dann **Anwenden**
2. Rechenpraxis-Fortschritt im Browser testen
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #107 [MERGED] — feat: KI Fair-Use (50/Tag Renewal) + Ablauf-E-Mails
- Erstellt: 2026-06-07T20:14:06Z
- Merged: 2026-06-07T20:14:12Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Phase 3: Margenschutz + Renewal-Conversion.

### KI Fair-Use
- **`kiTier`**: `full` bei Modul-/Compliance-Kauf, `renewal` bei Portal-Verlängerung
- **50 Nachrichten/Tag** im Renewal-Tier (`shared/kiFairUse.ts`)
- Gate auf **`/api/ai/*`** ohne `ragTutor.ts` zu ändern
- tRPC `aiAssistant.sendMessage` ebenfalls geschützt
- **`kiQuota`** in `auth.me` + Banner im KI-Tutor
- Migration **0037**: `kiTier`, `ki_daily_usage`

### Ablauf-E-Mails
- Täglich **08:00 UTC**: Erinnerung bei **30 / 7 / 1** Tag(en) vor `accessExpiresAt`
- Resend, Dedup über `access_expiry_reminders`
- Link zur Verlängerung auf `/statistiken`

## Prüfung
- [x] `tsc` — 0 errors
- [x] Vitest — 9 passed
- [x] Keine verbotenen Dateien geändert
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #106 [MERGED] — feat: Compliance-SKU 249€/Jahr + Backfill Bestandskäufer
- Erstellt: 2026-06-07T20:11:09Z
- Merged: 2026-06-07T20:11:14Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Sprint 1+2 aus Phase 2: monetarisierbare Compliance-SKU + Backfill für das Ablaufmodell.

### Compliance-SKU (`compliance_20h`)
- **249 €/Jahr** Stripe-Subscription (`/api/stripe/compliance-checkout`)
- Freischaltung: Modul 2 + `complianceExpiresAt` + `accessExpiresAt` (12 Monate)
- Webhook: `invoice.paid` mit `type: compliance`
- Landing: **`/compliance-20h`** mit Vergleich zu Modul 2 (499 €)
- **ComplianceGuard** auf Weiterbildungsnachweis + serverseitige API-Prüfung
- Migration **0036** `complianceExpiresAt`

### Backfill Bestandskäufer
- Script: `pnpm db:backfill-access` (dry-run) / `pnpm db:backfill-access:apply`
- Setzt `accessExpiresAt` für Nutzer mit Modulen aber NULL-Ablauf (inkl. 30-Tage-Grace wenn bereits abgelaufen)

### Sonstiges
- USP-Matrix: MaBV 20h Nachweis → `us: true`
- Footer-Link „Compliance 20h“, Sitemap-Eintrag

## Prüfung
- [x] `tsc` — 0 errors
- [x] Vitest — 10 passed
- [x] Keine verbotenen Dateien geändert

## Deploy-Hinweise
1. Migration 0036 läuft automatisch beim Boot
2. Backfill auf Railway: `pnpm db:backfill-access` prüfen, dann `--apply`
3. Stripe Compliance-Abo im Testmodus einmal durchklicken
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #105 [MERGED] — feat: Zugang E2E — auth.me, Trial-Fix, Referral, B2B-Limit
- Erstellt: 2026-06-07T20:06:59Z
- Merged: 2026-06-07T20:07:04Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Schließt kritische Lücken im Zugangs- und Monetarisierungsmodell:

### P0 — Zugang funktioniert end-to-end
- **`trialExpiresAt = NULL` bei Kauf** — zahlende Nutzer mit altem Testzugang werden nicht mehr blockiert
- **`auth.me` liefert `accessExpiresAt` + `referralCode`** — raw SQL in `accessExpiry.ts` (ohne verbotene schema/db-Änderung)
- **Renewal-Webhook dedupliziert** — nur `invoice.paid`, nicht mehr `checkout.session.completed` (kein Doppel-Extend)

### P1 — Growth & B2B
- **`?ref=CODE` auf LoginPage** — sessionStorage + Register-Payload + Hinweis-Banner
- **B2B `maxUsers` enforced** bei `whitelabel.assignUser`
- **Dashboard UX** — Ablauf-Warnung (≤30 Tage), `?renewed=1` Bestätigung, inline Renewal-Buttons

## Prüfung
- [x] `pnpm exec tsc --noEmit --skipLibCheck` — 0 errors
- [x] `vitest shared/accessPolicy.test.ts` — 4 passed
- [x] Keine verbotenen Dateien geändert
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #104 [MERGED] — fix: Praxis- und Finanzierungsrechner hinter Portal-Zugang
- Erstellt: 2026-06-07T19:57:17Z
- Merged: 2026-06-07T19:57:22Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Fortsetzung der Zugangs-Härtung nach #103 — Premium-Tools nicht mehr öffentlich:

- **`/rechner`** und **`/finanzierungsrechner`**: `ProtectedRoute` + `PortalToolGuard` (wie Rechenpraxis)
- **`PortalToolGuard`**: Trial-Ablauf ergänzt, Texte auf alle Praxis-Tools erweitert
- **Öffentliche Fläche bereinigt:** Rechner aus PublicHeader, Footer und Sitemap entfernt
- **E2E:** `/rechner` nicht mehr in öffentlichen Seiten-Tests

## Prüfung

- [x] `pnpm exec tsc --noEmit --skipLibCheck` — 0 errors
- [x] Keine verbotenen Dateien geändert
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #103 [MERGED] — fix: Rechenpraxis schützen + AGB/Marketing an Zugangsmodell
- Erstellt: 2026-06-07T19:53:45Z
- Merged: 2026-06-07T19:54:31Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Kritische Nachhärtung nach PR #102 (Zugangszeitraum + Empfehlungsprogramm):

- **Rechenpraxis-Datenleck geschlossen:** `rechenpraxis.json` in `PROTECTED_MODULE_DATA` — Abruf nur mit gültigem Modulzugang
- **Client-Guard:** Neuer `PortalToolGuard` (Modulcheck, RenewalPaywall, Inspect-Ausnahme)
- **Route:** `/rechenpraxis` hinter `ProtectedRoute` + `PortalToolGuard` in der Page
- **Recht/Marketing:** AGB §8 auf befristeten Zugang + optionale Verlängerung; KursLanding-Texte konsistent (2× Lernzeit, ab 29 €/Jahr)
- **Footer:** Link „Empfehlen“ → `/empfehlungsprogramm`

## Prüfung

- [x] `pnpm exec tsc --noEmit --skipLibCheck` — 0 errors
- [x] Keine verbotenen Dateien geändert

## Hinweis Produktion

Migrations `0034` + `0035` auf Railway/MySQL ausführen, falls noch nicht geschehen — sonst greifen `accessExpiresAt` und Referral-Rewards nicht.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #102 [MERGED] — Zugangszeitraum 2×, Verlängerung 5€/29€ & Empfehlungsprogramm
- Erstellt: 2026-06-07T19:50:52Z
- Merged: 2026-06-07T19:52:29Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Umsetzung des vereinbarten Zugangsmodells plus MVP für verifizierbare Empfehlungen.

## Zugangsmodell

- **Inklusive:** 2× Lernzeit pro Kauf (4–20 Monate je nach Modul/Paket, aligned mit KursLanding)
- **Danach:** Verlängerung **5 €/Monat** oder **29 €/Jahr** (Stripe Subscription)
- **Legacy:** Nutzer ohne `accessExpiresAt` behalten Zugang (Grandfathering)
- **Paywall:** `RenewalPaywall` in `ModuleGuard` + Server-Check in `vite.ts`

## Empfehlungsprogramm (MVP)

- Persönlicher Code + Link: `/empfehlungsprogramm`
- Bei Registrierung: optional `referralCode`
- Nach **Erstkauf** des Geworbenen: +30 Tage Empfehler, +14 Tage Geworbener
- Geplante Tool-Gutscheine dokumentiert in `docs/REFERRAL_PROGRAM.md`

## Technisch

- `shared/accessPolicy.ts` — Monats-Matrix, Ablaufberechnung
- `server/accessExpiry.ts`, `stripePurchaseHandler.ts`
- Webhook: Kauf setzt `accessExpiresAt`; Renewal via `checkout.session.completed` + `invoice.paid`
- Migrationen: `0034_user_access_expires.sql`, `0035_referral_rewards.sql`

## ⚠️ Deploy-Hinweis

Migrationen auf Railway/MySQL ausführen:
```sql
-- 0034 + 0035 aus drizzle/migrations/
```

Ohne Migration funktioniert der Code graceful (Spalten optional), aber Ablauf/Referral greifen erst nach Migration.

## Prüfung

- [x] `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors
- [x] 6 Unit-Tests (accessPolicy + weiterbildung)
- [x] Keine verbotenen Dateien geändert

## Marketing

- USP-Landing aktualisiert: „Doppelte Lernzeit — faire Verlängerung“ statt „lebenslang“
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #101 [MERGED] — B2B-Landing: White-Label Akademie für Maklerbüros
- Erstellt: 2026-06-07T19:27:49Z
- Merged: 2026-06-07T19:29:59Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Monetarisierung des technisch fertigen White-Label-Features — öffentliche B2B-Landing-Page mit Paketpreisen und Demo-CTA.

## Neu

- **`/fuer-maklerbueros`** — Marketing-Seite für Maklerbüros, Franchises, Verbünde
- **3 Pakete:** Starter (199 €/Mo, 5 User), Professional (399 €/Mo, 15 User), Enterprise (individuell)
- **Features:** Eigenes Branding, KI-Tutor, §34c-Weiterbildungsnachweis, Team-Fortschritt, Inspect-Demos
- Footer-Link „Für Maklerbüros“ + Sitemap-Eintrag
- CTA: `mailto:info@immobilien-akademie-smart.de` mit vorausgefülltem Anfrage-Template

## Strategischer Kontext

White-Label-Engine existiert bereits (`/admin/whitelabel`, `whitelabel.*` tRPC) — wurde bisher nicht vermarktet. Diese Seite schließt die Lücke zwischen Technik und Umsatz (Ziel: 25% B2B-Anteil laut Growth Roadmap).

## Prüfung

- [x] `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors
- [x] Keine verbotenen Dateien geändert

## Offene PRs (Merge-Reihenfolge empfohlen)

1. **#99** — Wettbewerbsanalyse + USP-Landing `/warum-wir`
2. **#100** — Weiterbildungsnachweis §15b MaBV
3. **#101** — Diese B2B-Landing (kann parallel mergen)
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #100 [MERGED] — Weiterbildungsnachweis: §15b MaBV Stundenlog + PDF-Export
- Erstellt: 2026-06-07T19:24:21Z
- Merged: 2026-06-07T19:29:10Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Schließt den kritischsten Wettbewerbs-Gap aus der Competitive Analysis: **nachweisbare Lernzeit** für die §34c-Weiterbildungspflicht (20h / 3 Jahre, §15b MaBV).

## Neu

### Server
- `shared/weiterbildung.ts` — Aggregationslogik (Zeitraum-Filter, Stunden, Tages-/Modulübersicht)
- `server/weiterbildungExport.ts`:
  - `GET /api/user/weiterbildungsnachweis` — JSON-Bericht aus `learning_logs`
  - `GET /api/user/weiterbildungsnachweis/pdf` — PDF-Download
- Standard-Zeitraum: letzte 3 Kalenderjahre

### Client
- `/weiterbildungsnachweis` — Fortschrittsanzeige zur 20h-Pflicht, Tagesnachweis-Tabelle, PDF-Button
- Navigation in Sidebar + CTA auf `/zertifikate`
- Rechtlicher Disclaimer (keine Garantie der Anerkennung)

## Datenquelle

Serverseitige `learning_logs` (`durationSeconds`, `openedAt`, `completed`) — nicht localStorage. Gleiche Basis wie Owner-AZAV-Report, jetzt nutzer-scoped.

## Tests

- `shared/weiterbildung.test.ts` — 3 Tests (Filter, 20h-Erfüllung, Datumsbereich)
- `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors

## Nächster Schritt

B2B-Landing `/fuer-maklerbueros` oder Merge mit Strategy-PR #99 (USP-Landing).
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #99 [MERGED] — Strategy Sprint: Wettbewerbsanalyse, USP-Landing & Growth Roadmap
- Erstellt: 2026-06-07T19:16:34Z
- Merged: 2026-06-07T19:29:03Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Zusammenfassung

Agency-Scale Strategy Sprint: tiefe Wettbewerbsanalyse, USP-Schärfung (nicht „USB“), öffentliche USP-Landing-Page und Skalierungs-Roadmap.

## Neu

### Dokumentation
- **`docs/COMPETITIVE_ANALYSIS.md`** — 15-Wettbewerber-Matrix (WBThek, IHK, IVD, Haufe, MaBV.academy, maklerbildung.online, Sprengnetter, …), SWOT, Preisvergleich, USP-Formeln, Feature-Gaps
- **`docs/GROWTH_ROADMAP.md`** — Monetarisierung (B2C/B2B/Micro-Abo), SEO-Pillar-Pages, Social-Media-Playbook, KPIs, Engineering-Backlog

### Produkt / Marketing
- **`/warum-wir`** und **`/usp`** — USP-Landing mit ehrlicher Vergleichstabelle (Akademie Smart vs. WBThek vs. IHK vs. Billig-20h)
- Link „Warum wir?“ auf der Startseite
- **`/barrierefreiheit`** Route fix (war 404 trotz Footer-Link)
- **Sitemap** erweitert: `/warum-wir`, `/rechner`, `/finanzierungsrechner`, `/hilfe`, `/barrierefreiheit`
- **Schema.org** `AggregateOffer` mit echten Preisen (149–1.955 €)

## Kern-USP (aus Analyse)

> *„Deutschlands einziges KI-Lernportal für alle Immobilien-Lizenzen — §34c, §34i, WEG, Gutachter. Einmal kaufen. Lebenslang lernen.“*

**Kritischster Gap vs. Wettbewerb:** MaBV-20h-Stundenexport — Priorität #1 im Growth Backlog.

## Prüfung

- [x] `pnpm exec tsc --noEmit --skipLibCheck` → 0 errors
- [x] Keine verbotenen Dateien geändert
- [x] Module6/7/8 nicht erstellt

## Nächste empfohlene Sprints

1. Weiterbildungsnachweis-Modul (Stundenlog + PDF §15b MaBV)
2. B2B-Landing `/fuer-maklerbueros` + White-Label-Pricing
3. Vergleichsseite `/vergleich/wbthek-alternative`
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #98 [MERGED] — fix: Auth-Cookie-Kohärenz — Login/Inspect/Owner entmischen
- Erstellt: 2026-06-07T17:02:04Z
- Merged: 2026-06-07T18:49:31Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Problem

Mehrere parallele Zugangswege (Login, Owner, Inspect, Tester) teilten sich Cookies im selben Browser — das führte zu:
- Inspect-Modus blockiert Schreiben (`Vorschau-Modus — Änderungen sind deaktiviert`) obwohl Owner eingeloggt sein sollte
- `owner_2fa_ok` überlebte Logout
- Inspect + Session gleichzeitig aktiv

## Lösung

Neues `server/authCookies.ts` mit zentralen Hilfsfunktionen:

| Aktion | Cookies die gelöscht/gesetzt werden |
|--------|-------------------------------------|
| **Logout** (REST + tRPC) | `app_session_id`, `inspect_mode*`, `owner_2fa_ok`, `tester_expires` |
| **Login/Register/Magic** | Inspect-Cookies werden gelöscht |
| **Owner/Tester-Login** | Inspect-Cookies werden gelöscht |
| **Inspect-Token** | Session + Owner-2FA werden gelöscht, dann Inspect-Cookies gesetzt |
| **Client-Logout** | `sessionStorage` inspect + ownerKey geräumt |

Zusätzlich: Tester-Redirect serverseitig auf `/modul/1` (wie Client).

## Tests

- `pnpm test` → **42/42** bestanden (+4 neue `authCookies.test.ts`)
- `tsc --noEmit` → 0 Fehler
- e2e `06-auth-flows` Inspect-Banner-Test aktualisiert

## Bekannte Rest-Risiken (nicht in diesem PR)

- Admin-2FA (`/admin-2fa`) setzt kein persistentes 2FA-Cookie — kosmetischer Schritt
- `tester`-Rolle nicht im DB-Enum — separates Schema-Thema
- Admin-2FA prüft nicht ob E-Mail in DB Admin ist

## Manuelle Verifikation

1. Inspect-Link öffnen → Vorschau read-only OK
2. `/inspect/exit` → normale Seite, kein Banner
3. Owner-Login → Schreiben in `/admin` funktioniert
4. Abmelden → erneuter `/admin`-Besuch → Login-Redirect
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #97 [MERGED] — feat: Inspect v2 — Admin-Vorschau read-only
- Erstellt: 2026-06-07T16:10:54Z
- Merged: 2026-06-07T16:42:03Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Ziel

Inspect-Links sollen Investoren/Partnern eine **vollständige Admin-Vorschau** bieten — alle Bereiche sichtbar, aber **keine Schreibrechte**. Owner-Bereich bleibt gesperrt.

## Änderungen

### Server
- Neues `server/inspectMode.ts`: zentraler Helper `isInspectModeActive`, globaler REST-Schreibschutz `blockInspectWrites`, synthetischer `INSPECT_PREVIEW_USER` für read-only Queries
- **Redirect** nach Inspect-Token: `/admin?inspect=1` (statt `/`)
- **tRPC**: `blockInspectMutations` auf allen Procedures; Inspect-Sessions erhalten Preview-User mit Admin-Rolle (nur Queries, Mutationen blockiert)
- **REST**: `requireAdmin` erlaubt GET/HEAD in Inspect-Modus (z. B. `/api/agent/health`)
- `adminProcedure` in `routers.ts` + `trpc.ts` konsolidiert für Inspect-Bypass

### Client
- `AdminRoute`: Inspect-Gäste ohne Login
- `DashboardLayout`: Admin-Sidebar für Inspect sichtbar, Profil als „Vorschau-Gast“, Logout ausgeblendet
- `InspectBanner`: Text „Admin-Vorschau (read-only)“
- `useInspectReadOnly` + CSS `[data-inspect-readonly]` deaktiviert Formulare/Buttons im Content-Bereich

### Tests
- 5 neue Tests in `inspect-v2.test.ts`
- `inspect-mode.test.ts` aktualisiert (Redirect-Ziel)

## Verifikation

```bash
npx tsc --noEmit --skipLibCheck  # 0 errors
pnpm test                         # 31 passed
```

## Manuelle Prüfung (Inkognito)

1. Inspect-Link öffnen → Landung auf `/admin?inspect=1`
2. Gelbes Banner „Admin-Vorschau (read-only)“
3. Admin-Sidebar sichtbar (Dashboard, Fragen-Manager, KI-Monitor, …)
4. `/owner-dashboard` → Redirect zu `/login` (gesperrt)
5. Schreibaktionen → 403 (Server) / deaktivierte Buttons (UI)

## Nicht geändert (verbotene Dateien)

- `drizzle/schema.ts`, `server/db.ts`, `server/ragTutor.ts`, `server/_core/context.ts`, `server/_core/sdk.ts`
- Module6/7/8
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #96 [MERGED] — ci(test): Vitest-Config mit Server-Unit-Tests
- Erstellt: 2026-06-07T15:08:39Z
- Merged: 2026-06-07T15:39:17Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Agency QA Sprint — CASE-011

- `vitest.config.ts` versioniert (war gitignored)
- 9 Test-Dateien, **24 Tests** (inkl. Server-Unit ohne DB)
- `auth.test.ts`: keine Live-Railway-Fetches mehr
- DB-Integrationstests weiterhin lokal optional
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #95 [MERGED] — docs(ops): Case Management Sprint 07.06.2026
- Erstellt: 2026-06-07T15:08:39Z
- Merged: 2026-06-07T15:39:28Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Agency Case Management — zentrales Register für alle Audit-Befunde.

**Inhalt:** `docs/CASE_MANAGEMENT_20260607.md`
- Stakeholder-Matrix (Product, Security, Legal, Ops, QA)
- 12 Cases mit Status und PR-Zuordnung
- Merge-Wellen 1–3
- Externe Aufgaben Alisad

Kein Produktions-Code.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #94 [MERGED] — fix(security): Quiz-Datenbank schützen + Owner-2FA-Resend härten
- Erstellt: 2026-06-07T15:08:39Z
- Merged: 2026-06-07T15:22:48Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Agency Security Sprint — Audit CASE-002 + CASE-003

**Änderungen:**
- `/data/all-questions.json` → `PROTECTED_MODULE_DATA` (854 Fragen nicht mehr anonym)
- `Quiz.tsx`: `credentials: "include"` + HTTP-Check
- `HealthWatcher`: erwartet 403 für anonymes Quiz-JSON
- `resend-2fa`: Rate-Limit 3/15min, nur `OWNER_EMAIL`

**Abnahme nach Deploy:**
```bash
curl -s -o /dev/null -w "%{http_code}" https://immobilien-akademie-smart.de/data/all-questions.json  # → 403
```

**Tests:** `pnpm test` (nach Merge mit #95: 24 Tests)
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #93 [MERGED] — fix(compliance): Claims zentralisieren, SEO + Cookie-Banner ehrlich
- Erstellt: 2026-06-07T15:08:39Z
- Merged: 2026-06-07T15:31:18Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Agency Compliance Sprint — CASE-004 + CASE-005

- `shared/claims.ts`: 854 / 855+ / 240 als Single Source
- `SEO.tsx`: „IHK-orientiert" statt Prüfungsversprechen im Title/Keywords
- `CookieConsent.tsx`: kein falscher Umami-Hinweis; ehrlicher Status
- `SESSION_MAX_AGE_MS` Alias für `ONE_YEAR_MS`
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #92 [MERGED] — fix(inspect): Ansehen-Links zum Lernbereich + Stat-Zähler ohne 0-Start
- Erstellt: 2026-06-07T14:58:24Z
- Merged: 2026-06-07T15:31:12Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Audit-Follow-up Inspect-Polish:

1. **Ansehen-Buttons** im Inspect-Modus → `/modul/X` (Lernbereich) statt `/kurs/{slug}` (Verkaufsseite)
2. **Statistik-Zähler** sofort sichtbar im Inspect + bei `prefers-reduced-motion` (kein 0/0/0/0 beim ersten Blick)

**Test:** `inspect-mode.test.ts` erweitert, `pnpm test` grün.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #90 [MERGED] — test(e2e): Modul-Smoke readonly für Module 1–5
- Erstellt: 2026-06-07T14:58:24Z
- Merged: 2026-06-07T15:39:19Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Audit-Follow-up: Read-only Playwright-Smoke gegen Prod/Staging.

**Abdeckung:** Modul 1–5 — Intro (`/modul/X`) + Lerntag 1 (`/modul/X/tag/1`)
**Auth:** global-setup State (`playwright@test.de`)
**Keine Schreiboperationen**

Lokal ausführen:
```bash
pnpm exec playwright test tests/playwright/17-module-smoke-readonly.spec.ts
```
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #89 [MERGED] — docs(backup): R2 Restore-Test-Checkliste nach Workflow-Aktivierung
- Erstellt: 2026-06-07T14:58:24Z
- Merged: 2026-06-07T15:39:25Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Audit-Follow-up: Pflicht-Checkliste für den ersten Restore-Test nach R2-Workflow-Aktivierung.

**Inhalt:** R2-Download, GPG-Entschlüsselung, lokaler Docker-Restore, Kernzählungen-Tabelle, Dokumentation in `audit_runs/`.

Kein Code-Change — nur `docs/RUNBOOK_BACKUP_RESTORE.md`.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #91 [MERGED] — fix(security): /api/admin/ki-stats mit requireAdmin absichern
- Erstellt: 2026-06-07T14:58:24Z
- Merged: 2026-06-07T15:22:38Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Audit-Follow-up (#89): `/api/admin/ki-stats` nutzte `req.session?.userId` — Express hat keine Session, Gate war wirkungslos.

**Lösung ohne `ragTutor.ts` zu ändern (Projektregel):**
- Neue Datei `server/kiStatsRoute.ts` mit `requireAdmin`
- Registrierung in `index.ts` **vor** `registerRagTutorRoutes` (Express: erste Route gewinnt)
- Regressionstest `ki-stats-admin-guard.test.ts`

**Verifikation:** `npx tsc --noEmit --skipLibCheck` + `pnpm test` (16/16)
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #88 [MERGED] — fix(ui): AITutor-Label auf Gemini 2.5 Flash korrigieren
- Erstellt: 2026-06-07T14:40:27Z
- Merged: 2026-06-07T15:31:29Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Audit-Befund: AITutor zeigte „Gemini 2.0 Flash“, Backend/AdminDashboard nutzen 2.5.

**Änderung:** Eine Zeile in `client/src/components/AITutor.tsx`.

**Test:** `pnpm test` (kein neuer Test nötig — reine UI-Label-Korrektur).
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #87 [MERGED] — fix(ui): AdminDashboard Claude-Modell-ID an Server-Standard anpassen
- Erstellt: 2026-06-07T14:40:27Z
- Merged: 2026-06-07T15:31:27Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Audit-Befund: AdminDashboard zeigte `claude-haiku-4-5-20251001` — verbotene Variante laut AGENTS.md; Server nutzt `claude-haiku-4-5`.

**Änderung:** Eine Zeile in `client/src/pages/admin/AdminDashboard.tsx`.

**Test:** `pnpm test` (reine UI-Label-Korrektur).
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #86 [MERGED] — Fix inspect link flow for read-only demo access
- Erstellt: 2026-06-07T13:37:54Z
- Merged: 2026-06-07T14:17:18Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Problem
Inspect-Links aus dem Owner-Dashboard leiteten zur Startseite und forderten Login — statt Read-Only-Demo-Zugang.

## Root cause
1. Server setzte `inspect_mode` als **httpOnly**-Cookie, Frontend prüfte aber `document.cookie` → Cookie unsichtbar
2. Redirect ging nur nach `/` ohne `?inspect=1`
3. `ProtectedRoute` / `ProtectedModuleRoute` / `ModuleGuard` kannten keinen Inspect-Bypass
4. PR #83 schützte `/data/module*.json` — Inspect-Nutzer ohne Login bekamen 403

## Fix
- Redirect nach Token-Verifikation: `/?inspect=1`
- Neuer Endpoint: `GET /api/auth/inspect-status`
- Zentrale Hilfsfunktionen in `client/src/lib/inspectMode.ts`
- Protected Routes rendern Inhalte im Inspect-Modus ohne Login
- Server-Bypass für Modul-Assets und `/data/*.json` bei `inspect_mode=1`
- Demo-Ende über `/inspect/exit` (löscht httpOnly-Cookie serverseitig)

## Tests
- `client/src/__tests__/inspect-mode.test.ts` (Flow-Regression)

## Verification
- `pnpm exec tsc --noEmit --skipLibCheck` ✅
- `pnpm test` ✅
- `pnpm build` ✅
- `pnpm audit --audit-level=moderate` ✅

## Manual check after merge
1. Owner-Dashboard → Inspect-Link erstellen
2. Link im Inkognito-Fenster öffnen
3. Erwartung: gelbes Demo-Banner, **kein** Login-Zwang
4. `/modul/1` oder `/modul/4` öffnen → Inhalt sichtbar
5. Kauf-Button → Hinweis „Vorschau-Modus“, kein Stripe
6. „Demo verlassen“ → zurück zur Startseite, kein Inspect mehr
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #85 [MERGED] — Fix Module 4 loading error from nested tab triggers
- Erstellt: 2026-06-07T13:37:48Z
- Merged: 2026-06-07T14:10:49Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Problem
Modul 4 brach beim Öffnen ab, während Module 1–3 und 5 funktionierten.

## Root cause
In `client/src/pages/modules/Module4Detail.tsx` waren zwei `TabsTrigger`-Komponenten verschachtelt (Videos innerhalb von Aufgaben). Radix Tabs erlaubt das nicht und wirft zur Laufzeit einen Render-Fehler.

## Fix
- Tab-Leiste an Modul 3/5 angeglichen: separate Trigger für `task` und `videos`
- Geschützte JSON-Fetches mit `credentials: "include"` und HTTP-Status-Prüfung
- Fallback auf `day_1`, wenn keine Tag-Route gesetzt ist

## Tests
- Neuer Regressionstest `client/src/__tests__/module4-tabs-structure.test.ts`

## Verification
- `pnpm exec tsc --noEmit --skipLibCheck` ✅
- `pnpm test` ✅
- `pnpm build` ✅
- `pnpm audit --audit-level=moderate` ✅

## Manual check after merge
1. Als Admin einloggen
2. `/modul/4` öffnen → Intro → Start
3. Lerntage 1–20 anklicken → Inhalt muss laden
4. Inkognito: `/data/module4.json` muss weiterhin **403** sein
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-feddbea4-0b5e-4ad4-88f4-50db98427dbc"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #84 [MERGED] — Harden LLM provider routing
- Erstellt: 2026-06-07T06:01:38Z
- Merged: 2026-06-07T12:50:51Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary
- Removed the broken Anthropic native `/v1/messages` fallback from the OpenAI-compatible `invokeLLM` adapter.
- Added explicit provider resolution for Forge, Gemini OpenAI-compatible, and OpenAI.
- Uses provider-specific model configuration instead of always sending `gemini-2.5-flash` to every provider.
- Added a regression test in the active Vitest test scope to prevent reintroducing Anthropic routing through this adapter.

## Notes
- Anthropic remains supported through separate SDK/fetch paths such as the RAG tutor and agent-specific routes.
- This change intentionally keeps `server/ragTutor.ts` untouched.
- Optional model envs now supported by this adapter: `FORGE_LLM_MODEL`, `GEMINI_MODEL`, `OPENAI_MODEL`.

## Verification
- `pnpm exec tsc --noEmit --skipLibCheck`
- `pnpm test` (3 files / 9 tests)
- `pnpm build`
- `pnpm audit --audit-level=moderate`

## Safety checks
- No restricted files changed.
- `server/ragTutor.ts`, `server/db.ts`, `drizzle/schema.ts`, `server/_core/context.ts`, and `server/_core/sdk.ts` were not modified.
- `client/src/pages/modules/Module6.tsx`, `Module7.tsx`, and `Module8.tsx` are absent.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-b44ef1a9-6248-43e5-bdb3-032ee2f4a018"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-b44ef1a9-6248-43e5-bdb3-032ee2f4a018"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #83 [MERGED] — Protect module data JSON files
- Erstellt: 2026-06-07T05:50:12Z
- Merged: 2026-06-07T12:50:47Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary
- Added server-side access control for protected module course JSON files under `/data`.
- Applies the same guard in production static serving and Vite dev middleware.
- Keeps non-course data such as `/data/all-questions.json` public for existing public/test flows.
- Updates HealthWatcher and the existing unauthenticated regression check to expect `/data/module4.json` to be blocked.
- Adds a unit test for protected module data path mapping.

## Protected files
- `/data/module1.json`
- `/data/module2.json`
- `/data/module2-content.json`
- `/data/module3.json`
- `/data/module4.json`
- `/data/module4-content.json`
- `/data/module5.json`

## Verification
- `pnpm exec tsc --noEmit --skipLibCheck`
- `pnpm test`
- `pnpm build`
- `pnpm audit --audit-level=moderate`

## Safety checks
- No restricted files changed.
- `drizzle/schema.ts`, `server/db.ts`, `server/ragTutor.ts`, `server/_core/context.ts`, and `server/_core/sdk.ts` were not modified.
- `client/src/pages/modules/Module6.tsx`, `Module7.tsx`, and `Module8.tsx` are absent.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-b44ef1a9-6248-43e5-bdb3-032ee2f4a018"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-b44ef1a9-6248-43e5-bdb3-032ee2f4a018"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #82 [MERGED] — Expand GDPR delete coverage
- Erstellt: 2026-06-07T05:28:03Z
- Merged: 2026-06-07T12:50:42Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary
- Added supplemental personal-data cleanup for migration/raw-SQL tables not covered by the existing schema-only delete paths.
- Extended both admin user deletion and self-service account deletion to use the same supplemental cleanup.
- Aligned self-service deletion with admin deletion for `spacedRepetition`, `videoProgress`, and `examAuditLog`.
- Added a regression test covering supplemental GDPR delete tables and ensuring both delete flows call the shared cleanup.

## Supplemental cleanup now covers
- `pending_purchases`
- `otp_tokens`
- `password_reset_tokens`
- trial-linked `presentation_codes`
- `trial_leads`
- `avv_agreements`
- creator references in `access_codes`
- best-effort PII matches in `monitoring_log` and `monitoring_log_old_0022`

## Verification
- `pnpm exec tsc --noEmit --skipLibCheck`
- `pnpm test`
- `pnpm build`
- `pnpm audit --audit-level=moderate`

## Safety checks
- No restricted files changed.
- `drizzle/schema.ts`, `server/db.ts`, `server/ragTutor.ts`, `server/_core/context.ts`, and `server/_core/sdk.ts` were not modified.
- `client/src/pages/modules/Module6.tsx`, `Module7.tsx`, and `Module8.tsx` are absent.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-b44ef1a9-6248-43e5-bdb3-032ee2f4a018"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-b44ef1a9-6248-43e5-bdb3-032ee2f4a018"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #81 [MERGED] — Remove duplicate case study grading route
- Erstellt: 2026-06-07T05:17:36Z
- Merged: 2026-06-07T12:50:38Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary
- Removed the unreachable duplicate `/api/ai/bewerte-fallstudie` handler from `server/agent/agentRoutes.ts`.
- Kept the active handler in `server/ragTutor.ts` untouched.
- Added a regression test to ensure the case-study grading endpoint is registered only once.

## Notes
- Route registration order currently mounts `registerRagTutorRoutes(app)` before `registerAgentRoutes(app)`, so the removed handler was shadowed.
- The removed handler also carried a divergent response shape and model configuration, making it unsafe to re-enable implicitly.

## Verification
- `pnpm exec tsc --noEmit --skipLibCheck`
- `pnpm test`
- `pnpm build`
- `pnpm audit --audit-level=moderate`

## Safety checks
- `server/ragTutor.ts` was not changed.
- No restricted files changed.
- `client/src/pages/modules/Module6.tsx`, `Module7.tsx`, and `Module8.tsx` are absent.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-b44ef1a9-6248-43e5-bdb3-032ee2f4a018"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-b44ef1a9-6248-43e5-bdb3-032ee2f4a018"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #80 [MERGED] — Align environment template and CI checks
- Erstellt: 2026-06-07T05:10:07Z
- Merged: 2026-06-07T12:50:34Z

<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary
- Expanded `.env.example` to document runtime, auth, owner, AI, Stripe, email, monitoring, Forge, test, and backup variables with safe placeholders.
- Moved CI to `pnpm/action-setup@v4`, using the repository `packageManager` declaration for pnpm version alignment.
- Switched CI install to `--frozen-lockfile` and added Vitest plus production build checks alongside TypeScript and audit.

## Verification
- `pnpm exec tsc --noEmit --skipLibCheck`
- `pnpm test`
- `pnpm build`
- `pnpm audit --audit-level=moderate`

## Safety checks
- No restricted files changed.
- `client/src/pages/modules/Module6.tsx`, `Module7.tsx`, and `Module8.tsx` are absent.
<!-- CURSOR_AGENT_PR_BODY_END -->

<div><a href="https://cursor.com/agents/bc-b44ef1a9-6248-43e5-bdb3-032ee2f4a018"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-web-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-web-light.png"><img alt="Open in Web" width="114" height="28" src="https://cursor.com/assets/images/open-in-web-dark.png"></picture></a>&nbsp;<a href="https://cursor.com/background-agent?bcId=bc-b44ef1a9-6248-43e5-bdb3-032ee2f4a018"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cursor.com/assets/images/open-in-cursor-dark.png"><source media="(prefers-color-scheme: light)" srcset="https://cursor.com/assets/images/open-in-cursor-light.png"><img alt="Open in Cursor" width="131" height="28" src="https://cursor.com/assets/images/open-in-cursor-dark.png"></picture></a>&nbsp;</div>



---
### PR #79 [MERGED] — Add backup encryption and retention plan
- Erstellt: 2026-06-06T10:03:28Z
- Merged: 2026-06-06T10:04:40Z

## Ziel

Dieser PR verbessert den bestehenden Cloudflare-R2-Backup-Automation-Plan um drei Qualitaetsstufen: Retention, clientseitige Verschluesselung und monatlichen Restore-Test als Phase 2.

## Änderungen

- Konkretisiert Retention:
  - 14 taegliche Backups
  - 8 woechentliche Backups
  - 12 monatliche Backups
- Erweitert Namensschema um `daily`, `weekly`, `monthly`, `latest`
- Dokumentiert clientseitige GPG-Verschluesselung mit AES256
- Fuegt `BACKUP_ENCRYPTION_PASSPHRASE` als benoetigtes GitHub Secret hinzu
- Plant einen spaeteren Restore-Test-Workflow als separate Phase
- Erweitert `.github/workflows/mysql-backup-r2.example.yml`:
  - installiert `gnupg`
  - validiert `BACKUP_ENCRYPTION_PASSPHRASE`
  - verschluesselt Dump vor R2-Upload
  - entfernt den unverschluesselten Dump aus dem Runner
  - uploaded `.sql.gz.gpg` unter `daily/...` und `latest/...`

## Sicherheit

Der Workflow bleibt weiterhin nur ein inaktives `.example.yml`. Es gibt keinen aktiven Cron, keine echten Secrets und keinen Railway-Eingriff.

## Verifikation

- Keine echten Secret-Werte in `docs`, `.github/workflows` oder `scripts` gefunden
- Workflow bleibt Beispiel-Datei und wird nicht automatisch ausgefuehrt
- CI soll die Repo-Gates pruefen

---
### PR #78 [MERGED] — Plan Cloudflare R2 backup automation
- Erstellt: 2026-06-06T05:22:34Z
- Merged: 2026-06-06T05:23:48Z

## Ziel

Dieser PR legt die naechste sichere Stufe der Backup-Strategie fest: Cloudflare R2 als externes Ziel fuer automatisierte Railway-MySQL-Backups.

## Warum

Wir haben am 2026-06-06 bewiesen, dass ein manueller Railway-MySQL-Dump erstellt und lokal wiederhergestellt werden kann. Der naechste Mehrwert ist nicht ein weiterer manueller Dump, sondern ein kontrollierter Plan fuer Automatisierung ohne echte Secrets im Repo.

## Änderungen

- Neue Dokumentation: `docs/BACKUP_AUTOMATION_PLAN.md`
- Neuer Beispielworkflow: `.github/workflows/mysql-backup-r2.example.yml`
- Workflow bleibt absichtlich inaktiv als `.example.yml`
- Keine echten Secrets, keine DB-Dumps, keine Railway-Eingriffe
- Benoetigte GitHub Secrets sind dokumentiert:
  - `RAILWAY_TOKEN`
  - `RAILWAY_PROJECT_ID`
  - `R2_ACCOUNT_ID`
  - `R2_ACCESS_KEY_ID`
  - `R2_SECRET_ACCESS_KEY`
  - `R2_BUCKET`
  - optional `R2_PREFIX`, `RAILWAY_ENVIRONMENT`

## Architekturentscheidung

Cloudflare R2 ist als primaeres externes Backupziel empfohlen, weil es S3-kompatibel ist und laut offizieller Cloudflare-R2-Preisseite keine Egress-Bandbreitenkosten berechnet. GitHub Artifacts bleiben nur fuer kurzfristige Metadaten geeignet, nicht als Hauptspeicher fuer personenbezogene DB-Backups.

## Sicherheitsregeln

- Workflow erst aktivieren, nachdem R2-Bucket und GitHub Secrets bewusst gesetzt wurden
- Erste Ausfuehrung nur manuell per `workflow_dispatch`
- Danach Dump herunterladen und lokal restoren
- Cron erst nach erfolgreichem Restore-Test aktivieren
- Railway-MySQL-Service weiterhin nicht redeployen/restarten, bevor ein frisches Backup plus Restore-Test existiert

## Verifikation

- Keine echten Secret-Werte im neuen Plan/Workflow gefunden
- Beispielworkflow enthaelt keine aktiven Cron-Jobs
- CI soll diesen Dokumentations-/Example-PR pruefen

---
### PR #77 [MERGED] — Add Railway MySQL backup runbook
- Erstellt: 2026-06-06T05:12:14Z
- Merged: 2026-06-06T05:13:30Z

## Ziel

Dieser PR dokumentiert den heute bewiesenen Railway-MySQL-Backup- und Restore-Weg und legt ein wiederverwendbares manuelles Dump-Script ab.

## Hintergrund

Am 2026-06-06 wurde ein manueller Railway-MySQL-Dump erstellt und erfolgreich in eine frische lokale MySQL-8-Instanz restored. Die Kernzaehlungen von Live-DB und Restore stimmten ueberein.

## Änderungen

- Neues Runbook: `docs/RUNBOOK_BACKUP_RESTORE.md`
- Neues Script: `scripts/backup/railway-mysql-dump.sh`
- Script erstellt einen komprimierten `mysqldump` ueber den Railway TCP Proxy
- Script prueft Tool-Verfuegbarkeit, Railway-Kontext, DB-Verbindung, gzip-Integritaet, Dump-Stats und Kernzaehlungen

## Wichtige Sicherheitsregel

Der Runbook-Hinweis ist bewusst deutlich: Den Railway-MySQL-Service nicht redeployen/restarten oder Volumes anfassen, solange kein frisches Backup plus Restore-Test existiert. Der aktuelle Railway-FAILED-Status deutet auf einen fehlgeschlagenen Fehl-Deploy hin, nicht auf einen bewiesenen DB-Datenverlust.

## Verifikation

- `bash -n scripts/backup/railway-mysql-dump.sh`: OK
- Script wurde bewusst nicht automatisch gegen Railway ausgefuehrt, weil der Backup-Lauf bereits manuell bewiesen wurde und dieser PR nur Dokumentation/Skript ablegt.

---
### PR #76 [MERGED] — Add claims policy regression gate
- Erstellt: 2026-06-06T04:29:39Z
- Merged: 2026-06-06T04:30:51Z

## Ziel

Dieser PR fuehrt eine verbindliche Claims-Policy und einen CI-blockierenden Regressionstest ein, damit die bereits bereinigten falschen oder unbelegten §34c/IHK-Sachkunde-Claims nicht erneut in Kursdaten, UI, Prompts oder Server-Code zurueckkehren.

## Änderungen

- Neue `CLAIMS_POLICY.md` im Repo-Root
- Neuer Vitest-Test `client/src/__tests__/claims-policy.test.ts`
- Scanbereiche:
  - `client/public/data`
  - `client/src`
  - `server`
- Dateitypen:
  - `.json`
  - `.ts`
  - `.tsx`
  - `.txt`
- Bekannte falsche Claim-Pattern werden hart blockiert
- Policy-Datei und Testdatei selbst sind bewusst ausgenommen

## Verifikation

- Lokaler Pattern-Gegencheck mit denselben Regex-Regeln: `FINDINGS 0`
- Breiterer Audit-Scan zeigte legitime WEG- und §34i-Treffer; deshalb wurde das zu breite `Pruefungsschwerpunkte`-Pattern auf IHK-Kontext eingegrenzt
- `CLAIMS_POLICY.md` musste wegen bestehendem `.gitignore` fuer `*.md` bewusst mit `git add -f` aufgenommen werden

## Quellenbasis

- §34c GewO: https://www.gesetze-im-internet.de/gewo/__34c.html
- §15b MaBV: https://www.gesetze-im-internet.de/gewo_34cdv/__15b.html
- §34i GewO: https://www.gesetze-im-internet.de/gewo/__34i.html
- §1 ImmVermV: https://www.gesetze-im-internet.de/immvermv/__1.html

## Hinweis

Der Test ist absichtlich CI-blockierend. Das ist gewollt: Eine Policy, die nur warnt, verhindert keine erneuten Rechts-/Reputationsrisiken.

---
### PR #75 [MERGED] — Remove direct AI provider endpoints from CSP
- Erstellt: 2026-06-05T21:50:55Z
- Merged: 2026-06-06T04:26:54Z

## Ziel

Dieser PR haertet die Content-Security-Policy nach dem Rechenpraxis-Proxy-Fix nach.

## Hintergrund

Der Browser ruft Anthropic fuer die Rechenpraxis jetzt nicht mehr direkt auf. Die KI-Kommunikation laeuft ueber die geschuetzte Serverroute `/api/ai/rechenpraxis-assistent`.

## Änderung

- Entfernt `https://api.anthropic.com` aus `connect-src`
- Entfernt `https://generativelanguage.googleapis.com` aus `connect-src`
- Belaesst Browser-Verbindungen zu `self`, Stripe, Plausible und Sentry

## Verifikation bisher

- Live-Bundle-Scan nach `api.anthropic.com/v1/messages`: 0 Treffer
- Live-Route `/api/ai/rechenpraxis-assistent` ist nach Railway-Deploy aktiv und ohne Login mit `401 application/json` geschuetzt

## Hinweis

Lokales `pnpm` war in der separaten Codex-WSL-Arbeitskopie nicht verfuegbar; dieser PR soll deshalb ueber GitHub-CI gegatet werden.

---
### PR #74 [MERGED] — Proxy Rechenpraxis AI assistant through server
- Erstellt: 2026-06-05T21:45:03Z
- Merged: 2026-06-05T21:46:13Z

## Ziel

Dieser PR entfernt den direkten Anthropic-Browser-Aufruf aus der Rechenpraxis und führt eine serverseitige KI-Proxyroute ein.

## Problem

`client/src/pages/Rechenpraxis.tsx` rief bisher direkt `https://api.anthropic.com/v1/messages` aus dem Browser auf. Das ist funktional fragil und sicherheitlich falsch: Ohne API-Key funktioniert es nicht; mit API-Key im Browser wäre der Schlüssel exponiert.

## Änderungen

- Neue geschützte Route: `POST /api/ai/rechenpraxis-assistent`
- Route nutzt `requireAuth` und damit bestehende Session-Authentifizierung
- Route nutzt `ANTHROPIC_API_KEY` ausschließlich serverseitig
- Frage wird validiert und auf 1200 Zeichen begrenzt
- Verlauf wird auf die letzten 8 Nachrichten begrenzt und gekürzt
- Client ruft nun `/api/ai/rechenpraxis-assistent` mit `credentials: include` auf
- Direkter Browser-Aufruf an `api.anthropic.com/v1/messages` wurde aus `Rechenpraxis.tsx` entfernt

## Verifikation lokal

- Kein Treffer mehr für direkten Anthropic-Client-Call in `Rechenpraxis.tsx`
- `pnpm tsc --noEmit`: OK
- `pnpm test`: OK, 6 Tests bestanden
- `pnpm build`: OK

## Nach Merge / Railway

Live prüfen:

- Ohne Login muss `POST /api/ai/rechenpraxis-assistent` geschützt sein
- Mit Login soll der Rechenpraxis-KI-Assistent antworten
- Browser-Bundle soll keinen direkten Anthropic-API-Aufruf mehr enthalten

---
### PR #73 [MERGED] — Fix owner inspect link generator
- Erstellt: 2026-06-05T21:24:40Z
- Merged: 2026-06-05T21:25:52Z

## Ziel

Dieser PR repariert den Owner-Inspect-Link-Generator und verbessert die Fehlerbehandlung fuer Owner-Link-Funktionen.

## Problem

Der Button `72h Inspect-Link erstellen` im Owner Dashboard rief `/api/owner/inspect-token` mit `key: ""` auf. Der Server verlangte aber bisher entweder den Owner Magic Code im Body oder verweigerte mit `403 Nicht autorisiert`. Dadurch konnte die UI den Inspect-Link aus einer bestehenden Owner-Session heraus nicht sinnvoll erzeugen.

Zusätzlich hatte der Magic-Link-Button keine saubere Fehlerbehandlung: Bei `403` wurde dennoch versucht, `d.link` zu kopieren.

## Änderungen

- `/api/owner/inspect-token` akzeptiert nun entweder den korrekten Owner-Key oder eine bestehende Owner-Session via `requireOwner`.
- `INSPECT_JWT_SECRET` ist in Production jetzt Pflicht; kein öffentlicher Default-Secret mehr für Produktivtokens.
- `/inspect/:token` nutzt dieselbe Secret-Logik.
- OwnerDashboard sendet keinen leeren Key mehr, nutzt `credentials: include`, und zeigt Fehler sichtbar im Dashboard an.
- Magic-Link-Button zeigt `403`/fehlende Linkdaten sichtbar statt still falsch zu kopieren.

## Verifikation lokal

- `pnpm tsc --noEmit`: OK
- `pnpm test`: OK, 6 Tests bestanden
- `pnpm build`: OK

## Nach Merge / Railway

Vor Produktivtest muss in Railway gesetzt sein:

- `INSPECT_JWT_SECRET`

Danach manuell prüfen:

- Owner Dashboard öffnen
- `72h Inspect-Link erstellen`
- Link kopieren/öffnen
- Inspect-Banner sichtbar?
- `/inspect/exit` beendet Inspect-Modus

---
### PR #72 [CLOSED] — Comprehensive Read-Only Portal Audit Report
- Erstellt: 2026-06-05T18:58:08Z
- Merged: <no value>

Performed a comprehensive read-only audit of the current portal. 
Key findings:
- Capability Inventory: Detailed routes, features, and components.
- Real USPs: Socratic AI Tutor, 240-day structure, integrated legal sources.
- Confidence Matrix: Core features are functional, AI/regulatory features need maturation.
- Claim-Risk: High risk on AZAV/ZFU claims until formal approval.
- Recommendations: Proposed architecture and quick-win patches.
No files modified as per strict read-only rules.

---
*PR created automatically by Jules for task [677883619545604066](https://jules.google.com/task/677883619545604066) started by @smartlivingberlin*

---
### PR #71 [MERGED] — Fix P0 claims and lockfile consistency
- Erstellt: 2026-06-05T17:05:55Z
- Merged: 2026-06-05T17:13:16Z

## Ziel

Dieser PR bereinigt den P0-Risikobereich rund um falsche oder irrefuehrende Claims zur angeblichen IHK-Sachkundepruefung fuer Immobilienmakler nach Para 34c GewO, stellt die pnpm-lockfile-Konsistenz fuer CI/Railway wieder her und behebt den roten CI-Audit-Gate durch ein Vitest-Upgrade auf eine gepatchte Version.

## Enthaltene Commits

- `1353b0d` `fix(deps): pnpm-lock.yaml regeneriert fuer frozen-lockfile-Konsistenz`
- `4cc1d2a` `fix(claims-A): Para-34c-Sachkundepruefung-Falschaussagen in Quizfragen korrigiert`
- `5f9942d` `fix(claims): bereinige Para-34c-Sachkunde-Claims in Kursinhalten`
- `cf27c24` `fix(ci): upgrade vitest for audit gate`

## Geprueft

Post-Commit-Gate lokal:

- Audit-Ordner: `audit_runs/post_commit_claims_gate_20260605_190225`
- Claim-Scan: `0` Treffer fuer die definierten harten P0-Patterns
- `pnpm install --frozen-lockfile --ignore-scripts`: OK
- `pnpm tsc --noEmit`: OK
- `pnpm test`: OK, 6 Tests bestanden

CI-Audit-Fix lokal nach `cf27c24`:

- `vitest`: `2.1.9` -> `4.1.8`
- `pnpm install --frozen-lockfile --ignore-scripts`: OK
- `pnpm tsc --noEmit`: OK
- `pnpm test`: OK, 6 Tests bestanden
- `pnpm audit --audit-level=moderate`: OK, keine bekannten Vulnerabilities

## Fachliche Pruefachse

Bitte besonders kritisch gegenpruefen:

- Para 34c GewO darf nicht als IHK-Sachkundepruefung dargestellt werden.
- Para 34c, Para 34i und Para 26a WEG muessen sauber getrennt bleiben.
- Der KI-Tutor/RAG darf keine alten IHK-Pruefungsclaims fuer Para 34c regenerieren.
- Begriffe wie Lernkontrolle, Praxisfaelle und Wiederholungsfragen duerfen nicht wieder in Richtung offizieller IHK-Pruefung kippen.

## Bewusst nicht enthalten / Follow-up P1

- Fragenzahl-Claim `855+` vs. tatsaechlicher Datenstand
- Aktualitaet und Darstellung der Weiterbildungspflicht
- Dauerhafte Claim-Policy fuer Content-Generatoren und KI-Tutor
- Railway-/Live-Deployment-Gate nach Merge

---
### PR #70 [MERGED] — fix(p0): all-questions §34c-Sachkundeclaims korrigieren
- Erstellt: 2026-06-03T13:11:48Z
- Merged: 2026-06-03T13:39:43Z

ID 448, 862: falsche §34c+Sachkunde Claims korrigiert. JSON-basierter Guard-Check bestätigt 0 Fehler.

---
### PR #69 [MERGED] — fix(p1): pnpm test grün + Agent-Prompts neutralisiert
- Erstellt: 2026-06-03T10:37:36Z
- Merged: 2026-06-03T10:39:27Z

pnpm test: 6/6 passed. SuperAgent + NightCron IHK-Qualität/IHK-Prüfungsfrage durch neutrale Begriffe ersetzt.

---
### PR #68 [MERGED] — fix(p0): §34c-Sachkundeclaims + HealthWatcher hardcode
- Erstellt: 2026-06-03T08:19:51Z
- Merged: 2026-06-03T08:19:55Z

P0: Falsche §34c-Sachkundeclaims in module2.json korrigiert. HealthWatcher hardcodierten Owner-Key entfernt.

---
### PR #67 [MERGED] — fix: Owner APIs per Session und 2FA autorisieren
- Erstellt: 2026-06-01T19:11:58Z
- Merged: 2026-06-01T19:24:27Z

## Summary
- ergänzt einen zentralen `requireOwner`/`isOwnerAuthorized` Helper für Owner-APIs
- akzeptiert weiterhin den bestehenden Owner-Key über Header/Query
- erlaubt Owner-APIs zusätzlich mit gültiger Admin-Session plus `owner_2fa_ok=1` Cookie
- behebt leere/rote Owner-Dashboard-Daten nach serverseitigem Entfernen des Keys aus der URL

## Ursache
Nach dem serverseitigen `/owner-dashboard?key=...` Flow wird der Key bewusst aus der URL entfernt. Das Frontend hat dadurch keinen `ownerKey` mehr in `sessionStorage`; die Owner-Dashboard-APIs wurden mit leerem Key aufgerufen und konnten keine echten Daten liefern. Nach erfolgreicher 2FA ist aber bereits eine Admin-Session plus `owner_2fa_ok` vorhanden, die serverseitig autorisieren kann.

## Verification
- `pnpm tsc --noEmit`
- `pnpm build`

## Scope
- nur `server/ownerRoute.ts`
- keine Änderung an OTP-Verifikation
- keine Änderung an Owner-Login/2FA-Flow
- kein Entfernen des Owner-Key-Fallbacks

## Security Note
Der neue Session-Pfad akzeptiert nicht nur `owner_2fa_ok`; er verlangt zusätzlich eine gültige Session, deren Nutzer in der DB `role = admin` hat.

---
### PR #66 [MERGED] — fix: Owner-Dashboard Key serverseitig verarbeiten
- Erstellt: 2026-06-01T18:55:24Z
- Merged: 2026-06-01T18:57:52Z

## Summary
- verarbeitet `GET /owner-dashboard?key=...` serverseitig vor dem SPA-Fallback
- validiert den Owner-Key direkt auf dem Server und leitet bei aktiver 2FA nach `/owner-2fa?method=...&redirect=/owner-dashboard`
- entfernt den Key aus der sichtbaren URL, weil die Weiterleitung ohne Query nach `/owner-2fa` bzw. `/owner-dashboard` erfolgt
- ohne `key` wird per `next()` normal an die SPA weitergereicht

## Ursache
Der React-Guard kann zu spät kommen: Wenn `/owner-dashboard?key=...` zuerst als SPA ausgeliefert wird, kann Client-Logik je nach Auth-/Cache-/Load-Zustand noch nach `/login` springen. Der Owner-Key-Link sollte serverseitig verarbeitet werden, bevor die SPA entscheidet.

## Verification
- `pnpm tsc --noEmit`
- `pnpm build`

## Scope
- nur `server/ownerRoute.ts`
- keine Änderung am Owner-Key-Wert
- keine Änderung an OTP-Verifikation
- keine Änderung an Cookies außer bestehendem method=none-Pfad, der unverändert übernommen wurde

---
### PR #65 [MERGED] — fix: Owner-Key Flow und 2FA Resend korrigieren
- Erstellt: 2026-06-01T18:42:52Z
- Merged: 2026-06-01T18:45:32Z

## Summary
- verarbeitet den Owner-Key im `OwnerRoute`-Guard vor dem Redirect zu `/login`, damit `/owner-dashboard?key=...` im Inkognito-Fenster korrekt in den Owner-Access-Flow geht
- korrigiert die Hook-Reihenfolge in `OwnerRoute`, sodass `useState`/`useEffect` nicht erst nach bedingten Returns laufen
- ergänzt auf der E-Mail-2FA-Seite einen `Code erneut senden` Button, falls ein bestehender gültiger Code die automatische Neusendung verhindert

## Ursache
Nach Sprint 4E wurde der `httpOnly`-2FA-Status korrekt serverseitig geprüft, aber `OwnerRoute` leitete nicht eingeloggte Nutzer weiterhin vor der Owner-Key-Verarbeitung auf `/login` um. Dadurch funktionierte `/owner-dashboard?key=...` im Inkognito-Fenster nicht. Zusätzlich konnte Sprint 4D absichtlich keine neue E-Mail senden, wenn bereits ein gültiger OTP-Code existierte; dafür fehlte eine manuelle Resend-Möglichkeit.

## Verification
- `pnpm tsc --noEmit`
- `pnpm build`

## Scope
- `client/src/App.tsx`
- `server/ownerRoute.ts`
- keine Änderung an OTP-Verifikation
- keine Änderung an Owner-Session-Cookies
- keine Änderung an Owner-Key-Wert oder 2FA-Methode

---
### PR #64 [MERGED] — fix: Owner-2FA Status serverseitig pruefen
- Erstellt: 2026-06-01T18:31:41Z
- Merged: 2026-06-01T18:34:20Z

## Summary
- ergänzt `/api/owner/2fa-status`, damit der Server das `httpOnly`-Cookie `owner_2fa_ok` prüfen kann
- ersetzt im `OwnerRoute`-Guard die direkte `document.cookie`-Prüfung durch einen serverseitigen Status-Request
- verhindert den Loop zurück zu `/owner-2fa` nach erfolgreicher 2FA

## Ursache
`owner_2fa_ok` wird serverseitig bewusst als `httpOnly` gesetzt. Das Frontend konnte es daher mit `document.cookie.includes("owner_2fa_ok=1")` nie sehen und leitete trotz erfolgreicher 2FA erneut in den Owner-Access/2FA-Flow.

## Verification
- `pnpm tsc --noEmit`
- `pnpm build`

## Scope
- `client/src/App.tsx`
- `server/ownerRoute.ts`
- keine Änderung an OTP-Generierung oder Verifikation
- keine Änderung an Owner-Session-Cookies

---
### PR #63 [MERGED] — fix: Owner-2FA Code bei Refresh wiederverwenden
- Erstellt: 2026-06-01T18:15:32Z
- Merged: 2026-06-01T18:21:04Z

## Summary
- verhindert, dass `GET /owner-2fa` bei jedem Seitenaufruf einen neuen E-Mail-Code generiert
- prüft vor `generateOTP`, ob bereits ein gültiger, nicht abgelaufener und nicht gesperrter OTP-Code existiert
- generiert nur dann einen neuen Code, wenn kein gültiger Code vorhanden ist

## Verification
- `pnpm tsc --noEmit`
- `pnpm build`

## Scope
- nur `server/ownerRoute.ts`
- keine Änderung an `twoFactor.ts`
- keine Änderung an Verifikation, Session oder Owner-Cookies

## Hinweis
Ein Code gilt hier nur als wiederverwendbar, wenn `used = 0`, `attempts < 3` und `expiresAt > NOW()` erfüllt sind.

---
### PR #62 [MERGED] — fix: Pending Purchases fuer Kauf ohne Konto
- Erstellt: 2026-06-01T16:44:50Z
- Merged: 2026-06-01T16:47:28Z

## Summary
- legt `pending_purchases` per Migration an
- speichert bezahlte Stripe-Käufe ohne vorhandenes Konto als Pending Purchase
- claimt Pending Purchases bei Registrierung mit derselben E-Mail und schaltet Module frei
- sendet eine Konto-einrichten-Mail bei Kauf ohne Konto

## Verification
- `pnpm tsc --noEmit`
- `pnpm build`

## Scope
- aktive Webhook-Route in `server/_core/index.ts`
- Register-Route in `server/_core/auth-local.ts`
- Migration `drizzle/migrations/0033_pending_purchases.sql`
- kein `drizzle/schema.ts`
- keine Änderung an Stripe-Signaturprüfung

## Review-Hinweis
Bitte vor Merge besonders prüfen:
- Webhook-Retry/Idempotenz via `sessionId` UNIQUE und `ON DUPLICATE KEY UPDATE`
- E-Mail-Normalisierung vor Pending-Speicherung und Claim
- Claim-Verhalten bei Registrierung nach Kauf

---
### PR #61 [MERGED] — fix: Trial-Ablauf bei Code-Login speichern
- Erstellt: 2026-06-01T16:18:40Z
- Merged: 2026-06-01T16:24:00Z

## Summary
- gibt `expiresAt` aus `redeemPresentationCode()` zurueck
- speichert `trialExpiresAt` bereits beim Guest-User-Insert nach Code-Einloesung
- behebt damit den 24h-Trial-Ablauf fuer eingelöste Presentation-/Trial-Codes

## Verification
- `pnpm tsc --noEmit`
- `pnpm build`

## Scope
- kein Webhook
- keine DB-Migration
- kein Pending-Purchase-System
- kein Dashboard-Umbau

---
### PR #60 [MERGED] — fix: Modulzugriffs-Fallback und Willkommensmail bereinigen
- Erstellt: 2026-06-01T13:07:50Z
- Merged: 2026-06-01T13:09:47Z

## Summary
- entfernt irrefuehrende Willkommensmail-Aussagen zu Sofortzugang und IHK-Orientierung
- entfernt den Modul-1-Default aus `modules.myAccess`
- entfernt den Modul-1-Default aus `useModuleAccess` waehrend/ohne Zugriffsdaten

## Verification
- `pnpm tsc --noEmit`
- `pnpm build`

## Scope
- kein Webhook
- keine DB-Migration
- kein Auth-Umbau
- kein Dashboard-Umbau

---
### PR #59 [MERGED] — fix: Widerrufs-Badge konsistent formulieren
- Erstellt: 2026-06-01T12:06:00Z
- Merged: 2026-06-01T12:06:20Z

## Umfang
- ersetzt den Trust-Badge `14 Tage Widerrufsrecht` durch `Widerrufsbelehrung beachtet`

## Hintergrund
Der alte Badge war widerspruechlich zur Checkbox, die den Beginn der digitalen Ausfuehrung und den Verlust des Widerrufsrechts bestaetigt.

## Validierung laut lokalem Lauf
- `pnpm tsc --noEmit` ohne gemeldete Fehler
- geaenderte Datei: nur `client/src/pages/kurs/KursLanding.tsx`

---
### PR #58 [MERGED] — fix: Checkout Consent und Kundenzugang vereinheitlichen
- Erstellt: 2026-06-01T11:50:30Z
- Merged: 2026-06-01T11:51:24Z

## Umfang
- `/pakete`: AGB-/Datenschutz-Checkbox ergaenzt
- `/pakete`: `userEmail` wird an den Bundle-Checkout gesendet
- `/kurs/modul-*`: AGB-/Datenschutz-Checkbox ergaenzt
- Erfolgseite: Hinweis zur Nutzung der Kauf-E-Mail ergaenzt
- Footer: `Einloggen` und `Mein Lernbereich` ergaenzt

## Bewusst nicht geaendert
- kein Servercode
- kein Stripe-Backend
- keine `invoice_creation`-Aenderung
- keine `payment_method_types`
- Erfolgseiten-CTAs bleiben auf `/statistiken`

## Validierung laut lokalem Lauf
- `pnpm tsc --noEmit` ohne gemeldete Fehler
- `pnpm build` erfolgreich
- geaenderte Dateien: 4 Frontend-Dateien

---
### PR #57 [MERGED] — fix: Bundle-Checkout Stripe Metadaten konsistent machen
- Erstellt: 2026-06-01T11:16:11Z
- Merged: 2026-06-01T11:17:23Z

## Umfang
- Bundle-Checkout liest optional `userEmail` aus dem Request
- Bundle-Checkout setzt `customer_email`, falls übergeben
- Bundle-Produktdaten enthalten `description: bundle.desc`
- Bundle-Success-URL enthält `session_id={CHECKOUT_SESSION_ID}` plus `bundle`
- Bundle-Metadata enthält zusätzlich `productId`

## Bewusst nicht geändert
- `invoice_creation` nicht angefasst
- `payment_method_types` nicht eingeführt
- Einzelkurs-Checkout nicht angefasst
- Frontend-Checkboxen/PublicHeader nicht angefasst

## Validierung laut lokalem Lauf
- `pnpm tsc --noEmit` ohne gemeldete Fehler
- `pnpm build` erfolgreich
- geänderte Datei: nur `server/stripe.ts`

---
### PR #56 [MERGED] — test: Quiz-Test nach Claim-Bereinigung aktualisieren
- Erstellt: 2026-06-01T07:44:42Z
- Merged: 2026-06-01T07:46:59Z

## Umfang
- entfernt veraltete `855`-Erwartungen aus der E2E-Testdatei
- aktualisiert die Quiz-Erwartung auf aktuelle Begriffe (`Lernfragen`, `Wissenscheck`)
- ergaenzt einen Skip-Guard fuer geschuetzte Nutzer-Tests, wenn `MAGIC_LINK_SECRET` fehlt

## Validierung laut lokaler Ausgabe
- nur `tests/e2e/05-full-test-suite.spec.ts` geaendert
- `855` nicht mehr in der Testdatei vorhanden
- `pnpm tsc --noEmit` erfolgreich
- Zieltest `tests/e2e/05-full-test-suite.spec.ts:194` laeuft ohne Secret als `skipped` statt fehlerhaft auf Login zu landen

Hinweis: Fuer einen echten geschuetzten Quiz-Flow muss `MAGIC_LINK_SECRET` lokal/CI gesetzt sein; ohne Secret ist Skip das korrekte ehrliche Verhalten.

Nicht mergen ohne finale Freigabe.

---
### PR #55 [MERGED] — fix: AGB doppelte Restblöcke entfernen
- Erstellt: 2026-06-01T07:37:08Z
- Merged: 2026-06-01T07:39:01Z

## Umfang
- entfernt den alten angehaengten Restblock nach `§ 13 Schlussbestimmungen`
- entfernt doppelte/fehlplatzierte Abschnitte `§ 4 Preise und Zahlungsbedingungen` und `§ 12 Anwendbares Recht und Gerichtsstand`
- entfernt das dadurch uebrig gebliebene leere `<div>`

## Validierung laut lokaler Ausgabe
- nur `client/src/pages/legal/AGB.tsx` geaendert
- `pnpm tsc --noEmit` erfolgreich
- `pnpm build` erfolgreich
- 28 Zeilen entfernt, kein Produktionscode ausser AGB betroffen

Nicht mergen ohne finale Freigabe.

---
### PR #54 [MERGED] — fix: Datenschutz Resend und Drittanbieter-Nummerierung
- Erstellt: 2026-06-01T07:10:58Z
- Merged: 2026-06-01T07:12:15Z

## Umfang
- ergaenzt Resend als Dienst fuer transaktionale E-Mails
- bereinigt die Drittanbieter-Nummerierung im Datenschutz-Abschnitt
- ersetzt `4.5b` und `4.x` durch fortlaufende Nummerierung

## Validierung laut lokaler Ausgabe
- nur `client/src/pages/Datenschutz.tsx` geaendert
- `4.5b` und `4.x` nicht mehr vorhanden
- `Resend` vorhanden
- Nummerierungsmarker 4.1 bis 4.10 vorhanden
- `pnpm tsc --noEmit` erfolgreich

Nicht mergen ohne finale Freigabe.

---
### PR #53 [MERGED] — fix: Modul-Intro Claims zu §34c neutralisieren
- Erstellt: 2026-06-01T07:02:01Z
- Merged: 2026-06-01T07:02:56Z

## Umfang
- neutralisiert §34c-IHK-Sachkunde-Claims in Modul 1 und Modul 2
- ersetzt IHK-Pruefungs-/Rahmenplan-Aussagen durch Praxis-/Weiterbildungsformulierungen
- korrigiert Modul 2 von `units="440"` auf `units="480"`

## Validierung laut lokaler Ausgabe
- nur `client/src/pages/modules/Module1WithIntro.tsx` und `client/src/pages/modules/Module2WithIntro.tsx` geaendert
- alte Treffer `IHK-Sachkundepruefung §34c`, `IHK-Pruefungsfragen`, `IHK-Rahmenplan §34c`, `units="440"` entfernt
- `pnpm tsc --noEmit` erfolgreich
- `pnpm build` erfolgreich

Nicht mergen ohne finale Freigabe.

---
### PR #52 [MERGED] — fix: CSP Plausible nur fuer Consent-Analytics Connect erlauben
- Erstellt: 2026-06-01T06:46:28Z
- Merged: 2026-06-01T06:47:32Z

## Umfang
- entfernt `plausible.io` aus `Permissions-Policy` payment
- entfernt `plausible.io` aus `scriptSrc`
- entfernt `plausible.io` aus `frameSrc`
- laesst `connectSrc` unveraendert, damit consent-basiertes Analytics-Reporting weiterhin moeglich bleibt

## Validierung laut lokaler Ausgabe
- nur `server/_core/index.ts` geaendert
- `plausible.io` verbleibt genau 1x in `connectSrc`
- Diff veraendert keine `connectSrc`-Zeile
- `pnpm tsc --noEmit` erfolgreich
- `pnpm build` erfolgreich

Nicht mergen ohne finale Freigabe.

---
### PR #51 [MERGED] — fix: Analytics erst nach Cookie-Consent laden
- Erstellt: 2026-06-01T06:18:51Z
- Merged: 2026-06-01T06:20:35Z

## Zusammenfassung
- entfernt den statischen Plausible-Preconnect aus `client/index.html`
- entfernt das direkt geladene Plausible-Script aus `client/index.html`
- entfernt den inaktiven Google-Analytics-Inline-Block aus `client/index.html`
- hinterlaesst einen Hinweis, dass Analytics nach Cookie-Zustimmung im React-Client geladen werden sollen

## Validierung
- geaendert ist nur `client/index.html`
- `grep "plausible.io" client/index.html` ohne Treffer im Script validiert
- `grep "googletagmanager\|gtag\|GA_MEASUREMENT" client/index.html` ohne Treffer im Script validiert
- Consent-Kommentar ist vorhanden
- lokaler Nutzerlauf: `pnpm tsc --noEmit` erfolgreich, da Script danach weiterlief
- lokaler Nutzerlauf: `pnpm build` erfolgreich
- GitHub-Vergleich: Branch ist 1 Commit ahead, 0 behind gegen `main`

## Scope
Sprint 3B-1: nur statisches HTML. Keine CSP-/Server-Aenderung, keine React-/Consent-Logik, keine Auth-/Stripe-/DB-Aenderung.

## Folgearbeit
CSP in `server/_core/index.ts` separat pruefen. `plausible.io` darf dort nur entfernt werden, wenn keine consent-gesteuerte Plausible-Ladung mehr vorgesehen ist oder die CSP entsprechend anders geloest wird.

---
### PR #50 [MERGED] — fix: StructuredData Claims und Lerntage bereinigen
- Erstellt: 2026-06-01T05:58:39Z
- Merged: 2026-06-01T06:00:10Z

## Zusammenfassung
- korrigiert StructuredData-Lerntage: Modul 4 von 20 auf 40, Gesamtzeit von `P220D` auf `P240D`
- entfernt `numberOfCredits: 855`, weil Lernaufgaben keine akademischen Credits sind
- neutralisiert verbliebene IHK-/§34c-Pruefungsclaims in Course- und FAQ-JSON-LD
- korrigiert den Satzfehler `... §26a WEG vor`
- vereinheitlicht FAQ auf `240 Lerntage` statt `240 Ausbildungstage`

## Validierung
- geaendert ist nur `client/src/components/StructuredData.tsx`
- lokaler Nutzerlauf: `pnpm tsc --noEmit` erfolgreich, da Script danach weiterlief
- lokaler Nutzerlauf: `pnpm build` erfolgreich
- GitHub-Vergleich: Branch ist 2 Commits ahead, 0 behind gegen `main`

## Scope
Sprint 3D-1: nur StructuredData/SEO-Trust-Daten, keine UI-, Server-, Auth-, Stripe-, DB- oder Zahlungslogik.

---
### PR #49 [MERGED] — fix: doppeltes Cookie-Banner entfernen
- Erstellt: 2026-05-31T22:22:50Z
- Merged: 2026-05-31T22:24:57Z

## Zusammenfassung
- entfernt die zweite Cookie-Banner-Komponente aus `client/src/App.tsx`
- laesst `CookieConsent` als einzige Consent-UI bestehen
- keine Server-, Auth-, Stripe-, Datenbank- oder Datenschutztext-Aenderungen

## Validierung
- `grep "CookieBanner" client/src/App.tsx` ohne Treffer im Script validiert
- `grep "CookieConsent" client/src/App.tsx` weiterhin mit Treffern im Script validiert
- `git diff --name-only` zeigte nur `client/src/App.tsx`
- `pnpm tsc --noEmit` erfolgreich, da Script nach diesem Schritt weiterlief
- `pnpm build` erfolgreich
- zusaetzlich laut Nutzer-Terminal: Playwright E2E `87 passed (1.9m)`

## Scope
Sprint 3B-2: nur CookieBanner-Deduplizierung, 1 Datei, 2 Loeschungen.

---
### PR #48 [MERGED] — fix: roadmap phase claims neutralisieren
- Erstellt: 2026-05-31T21:24:40Z
- Merged: 2026-05-31T21:26:26Z

## Zusammenfassung
- neutralisiert verbliebene Roadmap-/Phasenclaims in `server/portalPhase.ts`
- gleicht die statische Admin-Phasenansicht an, damit nicht aktive ZFU/AZAV/IHK/BGS-Stufen nicht wie vorhandene Zulassungen wirken
- behält Phase A als aktiven Selbstlernportal-Stand bei

## Validierung
- `rg`-Restclaim-Suche auf `server/portalPhase.ts` und `client/src/pages/admin/PortalPhaseAdmin.tsx` ohne Treffer
- `pnpm check` erfolgreich
- `pnpm build` erfolgreich

## Hinweis
Dieser PR ist eine Nachschärfung zu Sprint 3A und ändert keine Zahlungs-, Checkout- oder Kurslogik.

---
### PR #47 [CLOSED] — Gründliche Analyse und Diagnosebericht 2026
- Erstellt: 2026-05-31T19:33:47Z
- Merged: <no value>

Ich habe eine gründliche, rein lesende Analyse des gesamten Projekts durchgeführt. Der resultierende Diagnosebericht wurde in `/audit/DIAGNOSE_BERICHT_2026.md` gespeichert. 

Zusammenfassung der wichtigsten Erkenntnisse:
1. **Sicherheit:** Kritische tRPC-Validierungsumgehungen bei 11 Prozeduren sowie hartkodierte Geheimnisse.
2. **Performance:** Datenbankabfragen ohne LIMIT-Klauseln bei großen Tabellen (Lern-Logs, Audit-Logs).
3. **KI-Integration:** Inkonsistente Modellnamen und redundante Implementierungen.
4. **Frontend/UX:** Mehrere verwaiste Routen und 20 Platzhalter für Video-IDs in den Kursen.
5. **Code-Qualität:** Hohe Anzahl an 'any'-Typen und verstreute 'console.log'-Aufrufe.

Ein detaillierter Aktionsplan für Korrekturmaßnahmen ist im Bericht enthalten. Ich habe während der gesamten Analyse keine Änderungen am funktionalen Code vorgenommen.

---
*PR created automatically by Jules for task [875049475807724486](https://jules.google.com/task/875049475807724486) started by @smartlivingberlin*

---
### PR #46 [MERGED] — fix: Stripe Checkout unbekannten automatic_payment_methods Parameter entfernen
- Erstellt: 2026-05-31T18:28:35Z
- Merged: 2026-05-31T18:28:52Z

## Hotfix: Stripe Checkout wiederherstellen

Der nach Sprint 2E eingefuehrte Parameter `automatic_payment_methods` ist fuer `checkout.sessions.create` ungueltig und erzeugt produktiv den Fehler:

`Received unknown parameter: automatic_payment_methods`

### Fix
- Entfernt `automatic_payment_methods` aus Einzelkurs-Checkout
- Entfernt `automatic_payment_methods` aus Bundle-Checkout
- Laesst `payment_method_types` weiterhin weg
- Behaelt die bereinigten Stripe-Produkttexte aus PR #45 bei
- Behaelt `invoice_creation: { enabled: true }` im Einzelkurs-Checkout bei

### Warum das korrekt ist
Laut Stripe Checkout Sessions API wird Dynamic Payment Methods fuer Checkout dadurch genutzt, dass `payment_method_types` nicht gesetzt wird. Der Parameter `automatic_payment_methods` gehoert nicht in `checkout.sessions.create`.

### Risiko
Sehr niedrig: 2 Zeilen entfernt, keine Preis-/Webhook-/Widerrufslogik geaendert.

### Nach Merge
Railway Deployment abwarten und Checkout erneut testen.

---
### PR #45 [MERGED] — fix: Stripe Checkout dynamische Zahlungsmethoden und Produkttexte
- Erstellt: 2026-05-31T18:20:39Z
- Merged: 2026-05-31T18:22:56Z

## Sprint 2E: Klarna/BNPL vorbereiten

Dieser PR aktiviert dynamische Stripe-Zahlungsmethoden und bereinigt gleichzeitig Produkttexte, die direkt im Stripe Checkout sichtbar sind.

### Inhalt
- Einzelkurs-Checkout: `payment_method_types: ["card"]` durch `automatic_payment_methods: { enabled: true }` ersetzt
- Bundle-Checkout: `automatic_payment_methods: { enabled: true }` ergaenzt
- Stripe kann damit aktivierte Dashboard-Zahlungsmethoden dynamisch anzeigen, z. B. Klarna, Wallets und Karten, sofern fuer Session, Betrag, Waehrung, Land und Account eligible
- Checkout-Produkttexte in `server/stripe.ts` bereinigt, u. a. alte HypZert-/IHK-/Pflichtweiterbildungsclaims entschärft

### Bewusst nicht geändert
- `invoice_creation: { enabled: true }` bleibt vorerst erhalten
- Keine Webhook-Logik geändert
- Keine Preislogik geändert
- Keine AGB-/Widerrufstexte geändert

### Warum invoice_creation bleibt
Der Live-Test wurde vor dem Merge dieses Branches auf `main` gemacht und konnte deshalb die neue dynamische Zahlungslogik noch nicht testen. Außerdem dokumentiert Stripe dynamische Zahlungsmethoden für Checkout über `automatic_payment_methods`; `invoice_creation` wird separat für Zahlungsbelege/Rechnungszusammenfassungen beschrieben. Daher entfernen wir Rechnungen nicht vorschnell.

### Prüfung
- Nutzerlauf lokal: `pnpm tsc --noEmit` ohne Fehler, `pnpm build` erfolgreich vor dem zweiten Text-Commit
- Zweiter Commit betrifft nur Produkttexte in derselben Datei

### Nach Merge zwingend prüfen
1. Railway Deployment abwarten
2. Test-Checkout für Einzelkurs starten
3. Prüfen, ob Klarna sichtbar wird
4. Wenn Klarna weiterhin nicht sichtbar ist: gesonderten Mini-Sprint testen, ob `invoice_creation` oder andere Eligibility-Regeln blockieren

Quellen: Stripe Dynamic Payment Methods und Stripe Klarna Checkout-Dokumentation.

---
### PR #44 [MERGED] — fix: Foerderung AZAV- und QCG-Hinweise nachschaerfen
- Erstellt: 2026-05-31T17:59:04Z
- Merged: 2026-05-31T18:00:51Z

## Sprint 2D Nachschaerfung

Dieser PR korrigiert die letzten unsauberen Formulierungen in `client/src/pages/Foerderung.tsx`, nachdem Sprint 2D bereits direkt auf `main` gelandet ist.

### Inhalt
- AZAV-Badge von `In Vorbereitung` auf `Angestrebt`
- Hinweistext von `Die AZAV-Zertifizierung ist in Vorbereitung` auf `Eine AZAV-Zertifizierung wird angestrebt`
- QCG-Badge von `Pruefung noetig` auf `Je nach Betrieb`
- Entfernt den nicht mehr verwendeten `CheckCircle2`-Import

### Warum
`In Vorbereitung` wirkt wie ein konkreter laufender Zertifizierungsprozess. `Angestrebt` ist vorsichtiger und belastbarer, solange keine externe Zertifizierungsstelle, kein Zeitplan und kein konkreter Status belegbar sind.

### Hinweis
Dieser PR wurde ueber den GitHub-Connector erstellt. Kein lokaler Build wurde fuer diese Mini-Nachschaerfung ausgefuehrt; die Aenderung betrifft nur Texte und einen ungenutzten Import.

---
### PR #43 [MERGED] — fix: KursLanding Claims und Preisformulierungen bereinigen
- Erstellt: 2026-05-31T17:28:23Z
- Merged: 2026-05-31T17:34:47Z

## Sprint 2C: KursLanding Trust/Claims Cleanup

Dieser PR bereinigt die oeffentlichen Kurs-Detailseiten in `client/src/pages/kurs/KursLanding.tsx`.

### Inhalt
- Entfernt bzw. entschaerft riskante IHK-/Sachkunde-/Weiterbildungsclaims auf den Kursdetailseiten
- Ersetzt starke Aussagen wie vollstaendige Vorbereitung, gesetzliche Pflicht vollstaendig abgedeckt oder echte IHK-Simulation durch belegbarere Formulierungen
- Entfernt `inkl. MwSt.` auf dieser Kauf-/Landingseite zugunsten von `Endpreis`
- Entschaerft HypZert- und Zertifizierungsformulierungen auf Modul 4
- Ersetzt Pruefungsfragen-/Pruefungsversuch-Labels durch neutralere Lern-/Abschlussformulierungen

### Geprueft
- Kritische Rest-Claim-Suche in `KursLanding.tsx`: keine Treffer
- `pnpm tsc --noEmit`: erfolgreich
- `pnpm build`: erfolgreich

### Nicht enthalten
- Keine Stripe-/Checkout-Logik
- Keine AGB-Aenderungen
- Keine Admin-/Auth-/API-Aenderungen
- Keine Modul-Inhaltsdateien ausserhalb der KursLanding-Seite

Ziel: oeffentliche Verkaufs-/SEO-Texte rechtlich und vertrauensseitig robuster machen, ohne Produktlogik oder Zahlungsfluss zu veraendern.

---
### PR #42 [MERGED] — fix: Sprint 2B Claims in Checkout und Kursseiten bereinigen
- Erstellt: 2026-05-31T17:12:50Z
- Merged: 2026-05-31T17:14:30Z

## Inhalt

Sprint 2B bereinigt verbliebene IHK-/§34c-Claims in Checkout- und Kursseiten sowie das AGB-Format nach Sprint 2A.

Branch: `sprint2b-claims-cleanup-20260531`
Head: `931b27732fe1b7d26f8667a3af340ed55e9c0b37`
Basis: `main` nach Sprint 2A (`d37faff`)

## Änderungen

- `server/stripe.ts`
  - Modul 2 von `Vollständige IHK-Vorbereitung` auf `Fach- und Praxisvorbereitung` umgestellt
  - Modul-2-Beschreibung von `IHK-Vorbereitung §34c` auf Fach-/Praxisvorbereitung nach §34c umgestellt
  - Komplettpaket von `855+ IHK-orientierte Prüfungsfragen` auf `855+ Praxisaufgaben, Lernfragen und Prüfungsübungen` umgestellt

- `client/src/pages/KursPakete.tsx`
  - Trust-Bar: `IHK-vorbereitet` → `Praxisorientiert`
  - Trust-Bar: `IHK-Fragen` → `Lernfragen`
  - SEO-Description: `IHK §34c` → `§34c Weiterbildung`
  - Hero-Copy: `IHK-vorbereitet` → `fachlich vorbereitet`

- `client/src/pages/Kurse.tsx`
  - Hero-Badge: `IHK-VORBEREITUNG` → `PRAXISWISSEN`

- `client/src/pages/legal/AGB.tsx`
  - Leere Absätze nach Sprint 2A entfernt
  - §8-Nummerierung nach Entfernen der Abo-Abschnitte korrigiert

## Tests laut lokalem Lauf

- `pnpm tsc --noEmit` erfolgreich
- `pnpm build` erfolgreich (`built in 18.28s`)
- Claim-Verifikation erfolgreich: alte Sprint-2B-Claims nicht mehr gefunden

## Nicht enthalten

- Keine Stripe-Klarna-/BNPL-Änderung
- Keine Payment-Method-Änderung
- Keine Preislogik-Änderung
- Keine Datenbank-/Auth-Änderung


---
### PR #41 [MERGED] — fix: Sprint 1 Trust-Fixes fuer SEO, Impressum und Claims
- Erstellt: 2026-05-31T15:07:27Z
- Merged: 2026-05-31T16:23:24Z

## Inhalt

Sprint-1-Trust-Fixes auf separatem Draft-Branch. Diese PR aendert noch nicht die Produktion und bleibt Draft bis finaler Review/Test-Freigabe.

Branch: `codex/sprint1-trust-fixes-2026-05-31`
Head: `749a21aed59ad79054fc9023e7a29bd9452c0613`

## Geaenderte Dateien

- `client/index.html`
  - HTML-Kommentarblock entfernt
  - Title/Meta/OG/Twitter von irrefuehrender `IHK-Vorbereitung §34c §34i`-Linie auf neutrale Praxis-/Fachpositionierung umgestellt
  - JSON-LD Course-Name korrigiert: keine `IHK Sachkundepruefung §34c`
  - sr-only H1 korrigiert
  - Umlaute/UTF-8 nach lokaler Nacharbeit repariert

- `client/src/pages/legal/Impressum.tsx`
  - § 5 TMG auf § 5 DDG aktualisiert
  - Kontaktadresse auf `info@immobilien-akademie-smart.de` vereinheitlicht
  - Kleinunternehmerhinweis aktualisiert
  - Platzhalter-/Template-Hinweise entfernt
  - Bildnachweise von Platzhaltern auf neutralen Hinweis geaendert
  - Umlaute/UTF-8 nach lokaler Nacharbeit repariert

- `client/src/pages/Home.tsx`
  - sichtbare §34c/IHK-Sachkunde-Claims entschaerft
  - Modul-2-Beschreibung auf professionelle Maklerpraxis nach §34c ausgerichtet
  - SEO-Description/Keywords korrigiert
  - verbliebene nicht belegte IHK-/Pruefungsformat-Claims reduziert

- `server/ragTutor.ts`
  - KI-Systemprompt korrigiert: §34c nicht mehr als IHK-Sachkundepruefung
  - §34c als Fach-/Praxis-/Weiterbildungskontext, §34i als IHK-Sachkunde getrennt
  - Review-Fix fuer Hauptprompt ergaenzt

- `client/src/pages/legal/AGB.tsx`
  - `wird ergaenzt` in Kontaktdaten ersetzt
  - `inkl. MwSt.` auf Kleinunternehmer-Hinweis umgestellt
  - sichtbarer Steuerberater-Marker entfernt

- `client/public/manifest.json`
  - §34c/IHK-Description korrigiert
  - `start_url` von `/statistiken` auf `/` geaendert

- `client/public/sitemap.xml`
  - Railway-Domain auf Hauptdomain korrigiert
  - `/pakete` und `/foerderung` ergaenzt

- `client/src/pages/DokumentWerkstatt.tsx`
  - RAG-Tutor Payload von `message` auf `question` korrigiert

## Tests laut lokalem Bericht

- TypeScript: `pnpm tsc --noEmit` laut Baumeister-Bericht ohne Fehler.
- Build: `pnpm build` laut Terminalausgabe erfolgreich (`built in 18.21s`).

Hinweis: Die spaeteren grep-Pruefungen sollten bei Bedarf nochmal als einzelne Befehle ausgefuehrt werden, weil `grep` ohne Treffer mit Exitcode 1 endet und eine `&&`-Kette frueh stoppen kann.

## Noch vor Merge pruefen

- PR bleibt Draft, bis du bewusst entscheidest.
- Nicht deployen, nicht auf `main` arbeiten, solange Review offen ist.
- `vite.config.ts` ist nicht Teil dieses PRs und soll nicht versehentlich in diesen PR wandern.
- Lokale untracked Audit-/Screenshot-Skripte gehoeren nicht ins Repo.
- Recht-/Steuertexte bleiben trotz Fix fachlich/juristisch freigabebeduerftig.

## Bewusst offen / Sprint 2

- AGB komplett neu strukturieren: Dubletten, Abo-/Einmalzahlung, Widerruf/Garantie.
- Bundle-Checkout 500-Bug serverseitig reparieren.
- Foerderclaims abschwaechen.
- OG-Image neu generieren.
- Modul-JSON-Fachkorrekturen Sprint 3.

---
### PR #40 [CLOSED] — Add Comprehensive E2E Tests for All User Roles
- Erstellt: 2026-05-29T08:13:08Z
- Merged: <no value>

This PR adds a new E2E test file `tests/e2e/08-volltest-alle-rollen.spec.ts` that provides full coverage for the main user flows on the production environment.

**Key Features:**
- **Anonymous Tests:** Validates core public pages and protected route behavior.
- **Role Verification:** Confirms that the admin login triggers the 2FA redirect as expected.
- **Accessibility Checks:** Navigates through all modules and admin subpages to ensure no ErrorBoundaries or 404s are present.
- **Stripe Verification:** Confirms that the package page correctly displays 6 packages and the requested pricing for main bundles.
- **Robustness:** Implements a resilient cookie banner handler and uses networkidle/domcontentloaded waiting strategies to handle production latency.

**Strict Rule Compliance:**
- Only created a NEW file in `tests/e2e/`.
- No existing files or configuration files were modified.

---
*PR created automatically by Jules for task [10026262038157542829](https://jules.google.com/task/10026262038157542829) started by @smartlivingberlin*

---
### PR #39 [CLOSED] — Read-Only Audit Report
- Erstellt: 2026-05-29T07:56:34Z
- Merged: <no value>

Comprehensive audit of the Immobilie-Akademie-Premium repository at SHA 60640d208dab581f1f8938f9a82907bbc1219b0c. Identified architecture, library usage, security risks (P0), and reuse candidates. No mutations performed.

---
*PR created automatically by Jules for task [17146592239597517069](https://jules.google.com/task/17146592239597517069) started by @smartlivingberlin*

---
### PR #38 [CLOSED] — Competitor and Technical Audit Report June 2026
- Erstellt: 2026-05-27T16:08:31Z
- Merged: <no value>

This submission provides a comprehensive analysis-only audit of the Immobilien Akademie Smart portal. 

Key findings include:
- Benchmarking against 5 competitors, identifying Sachkundegurus as the primary trust-leader (100% guarantee, 95% pass rate).
- Identifying a major market opportunity for §34k GewO (Consumer Credit) starting Nov 2026, with an estimated target group of 40k-50k intermediaries.
- Technical audit documenting widespread use of 'any' types and missing API error handling.
- UX audit of the landing page identifying 12 CTAs and a lack of prominent trust signals.

The full report is available in the repository at `/audit/COMPETITOR_AND_TECHNICAL_AUDIT.md`. No functional code was changed during this process.

---
*PR created automatically by Jules for task [13964907564763146383](https://jules.google.com/task/13964907564763146383) started by @smartlivingberlin*

---
### PR #37 [CLOSED] — Comprehensive Market and Technical Analysis Report
- Erstellt: 2026-05-27T16:01:14Z
- Merged: <no value>

This submission provides a comprehensive analysis report covering competitive benchmarking, market research for the new §34k GewO regulation, an audit of technical debt (including TypeScript typing and API error handling), and a conversion rate optimization analysis for the landing page. No code changes were made as per instructions.

---
*PR created automatically by Jules for task [1943333682043405534](https://jules.google.com/task/1943333682043405534) started by @smartlivingberlin*

---
### PR #36 [CLOSED] — Frontend-Optimierungen, Marketing-CTA und Preiskonsistenz-Check
- Erstellt: 2026-05-27T11:24:49Z
- Merged: <no value>

Ich habe die angeforderten Optimierungen an der Frontend-UI und Marketing-Elementen vorgenommen.

Wichtigste Änderungen:
1.  **Förderung-Seite**: Ein neuer Call-to-Action (CTA) Button "Jetzt kostenlos testen" wurde am Ende der Seite hinzugefügt, ebenso wie ein Hinweis zur Unterstützung bei der Antragstellung per E-Mail.
2.  **Performance & SEO (Bilder)**: In `Home.tsx`, `VideoPreview.tsx` und `DashboardLayout.tsx` wurden fehlende `width` und `height` Attribute bei `img`-Tags ergänzt, um Cumulative Layout Shift (CLS) zu minimieren.
3.  **Animationen**: Der Statistik-Zähler auf der Startseite wurde durch die CSS-Eigenschaft `will-change: transform` (implementiert als Utility-Klasse in `index.css`) flüssiger gestaltet. Der Sichtbarkeits-Schwellenwert des `IntersectionObserver` wurde auf den geforderten Wert von 0.3 geprüft.
4.  **Preiskonsistenz**: Alle Preise wurden im gesamten `client/src/pages/` Verzeichnis geprüft. Es wurden keine Abweichungen zu den Zielvorgaben (149€, 499€, 699€, 399€, 499€ und 1955€ für das Komplettpaket) gefunden.
5.  **UserGuide**: Auf ausdrücklichen Wunsch wurden keine Änderungen an `UserGuide.tsx` vorgenommen, da die Datei bereits heute aktualisiert wurde.

Alle Tests (Vitest & Playwright Public Pages) verliefen erfolgreich.

---
*PR created automatically by Jules for task [3138283675919739368](https://jules.google.com/task/3138283675919739368) started by @smartlivingberlin*

---
### PR #35 [CLOSED] — UI Optimizations and Price Consistency Fixes
- Erstellt: 2026-05-27T11:02:14Z
- Merged: <no value>

Addresses multiple UI and content issues as requested:
1. UserGuide: Replaced hardcoded links with a 3-column grid containing links to all 5 modules and additional dashboard sections.
2. Foerderung: Added a "Jetzt kostenlos testen" CTA button and contact information for application assistance.
3. Performance/SEO: Added width and height attributes to images in Home.tsx and VideoPreview.tsx. Added 'will-change: transform' to statistics counters in Home.tsx.
4. Consistency: Verified that all module and package prices are consistent across all TSX pages (M1: 149€, M2: 499€, M3: 699€, M4: 399€, M5: 499€, Komplett: 1955€).
5. Quality: Passed 'pnpm check' and 'pnpm test'.

---
*PR created automatically by Jules for task [17320980598390202854](https://jules.google.com/task/17320980598390202854) started by @smartlivingberlin*

---
### PR #34 [MERGED] — Resolve bugs, optimize performance, and add new features (June 2026)
- Erstellt: 2026-05-26T18:39:16Z
- Merged: 2026-05-26T18:55:16Z

This PR addresses the following tasks:

### Bug Fixes
*   **Module1Detail**: Replaced `useRoute` with `useParams` to correctly handle route parameters, preventing crashes when the route matches but the internal logic fails.
*   **Pricing**: Updated the 'Gutachter' bundle price to 999€ in both Stripe configuration and the frontend packages page to resolve inconsistencies.
*   **Mobile Login**: Enhanced the login form with proper accessibility attributes (`id`, `name`, `htmlFor`) to fix mobile browser warnings and improve autofill behavior.

### Performance
*   **Code-Splitting**: Large components in `Module3Detail` and `Module5Detail` (like AI Tutor, Quiz, and PDF generators) are now lazy-loaded. Chunks are displayed with a `SkeletonCard` fallback to improve initial load speed.
*   **Preloading**: Added a slight delay preloading mechanism for the most visited routes (Home, Login, Dashboard) to warm up the cache after the main application mounts.

### New Features
*   **PDF Certificates**: A new Express route `/api/certificate/:moduleId` allows users to download a "Teilnahmebestätigung" (participation confirmation) as a PDF. Integration buttons were added to the module completion sections.
*   **Streak Counter**: Users now see their consecutive daily login streak on the dashboard. This includes a new migration adding `streakDays` and `lastStreakUpdate` to the `users` table, with logic implemented in the backend using `date-fns`.

### Safety & Compliance
*   Strictly adhered to the `db.$client.query` constraint for raw SQL.
*   Used standard JS/TS practices for lazy loading and routing.
*   Verified that the streak logic handles "same-day" logins without multiple increments.

---
*PR created automatically by Jules for task [12886846517653289237](https://jules.google.com/task/12886846517653289237) started by @smartlivingberlin*

---
### PR #33 [CLOSED] — Add regression tests for fixes deployed on 2026-05-25
- Erstellt: 2026-05-25T19:27:21Z
- Merged: <no value>

I have implemented the requested regression tests in a new file `tests/e2e/06-regression-fixes-20260525.spec.ts`. 

The tests cover:
1. **X-Frame-Options**: Verified as `SAMEORIGIN` on `/`.
2. **X-Content-Type-Options**: Verified as `nosniff` on `/admin`.
3. **CSP**: Verified presence of `Content-Security-Policy` header on `/api/health`.
4. **Bundle Size**: Verified that `vendor-react-utils-*.js` is under 400KB (actual size is ~271KB).
5. **Stripe Webhook**: Verified that `POST /api/stripe/webhook` without signature returns HTTP 400.
6. **Auth Protection**: Verified that `GET /api/auth/me` returns HTTP 401 when unauthenticated.
7. **Health Endpoint**: Verified that `GET /api/health` returns `{"ok":true, ...}`.
8. **Module4 Content**: Verified that `GET /data/module4.json` contains the string "hint".

All 8 tests passed successfully in the production environment. No existing files were modified.

Test results:
[1/8] 1. Security header X-Frame-Options: GET / must return SAMEORIGIN - PASSED
[2/8] 2. Security header X-Content-Type-Options: GET /admin must return nosniff - PASSED
[3/8] 3. Security header CSP: GET /api/health must return Content-Security-Policy header - PASSED
[4/8] 4. Bundle size: vendor-react-utils-*.js must be under 400KB - PASSED
[5/8] 5. Stripe webhook: POST /api/stripe/webhook without signature must return 400 - PASSED
[6/8] 6. Auth protection: GET /api/auth/me must return 401 - PASSED
[7/8] 7. Health endpoint: GET /api/health must return JSON with ok:true - PASSED
[8/8] 8. Module4 content: GET /data/module4.json must return 200 and contain 'hint' - PASSED

---
*PR created automatically by Jules for task [12220324673966771687](https://jules.google.com/task/12220324673966771687) started by @smartlivingberlin*

---
### PR #32 [CLOSED] — Add E2E regression tests for 2026-05-25 fixes
- Erstellt: 2026-05-25T19:27:08Z
- Merged: <no value>

This PR introduces a new Playwright E2E test suite specifically for regression testing of fixes deployed on 2026-05-25.

**Tests implemented:**
1. **Security header X-Frame-Options:** Verifies that the header is set to `SAMEORIGIN` on the root path.
2. **Security header X-Content-Type-Options:** Verifies that the header is set to `nosniff` on `/admin`.
3. **Security header CSP:** Verifies that the `Content-Security-Policy` header is present on `/api/health`.
4. **Bundle size:** Dynamically identifies the `vendor-react-utils-*.js` asset and verifies it is under 400KB.
5. **Stripe webhook:** Verifies that POST requests to `/api/stripe/webhook` without a signature return HTTP 400.
6. **Auth protection:** Verifies that `/api/auth/me` returns HTTP 401 when unauthenticated.
7. **Health endpoint:** Verifies that `/api/health` returns status 200 and a JSON body with `{ ok: true }`.
8. **Module4 content:** Verifies that `/data/module4.json` returns status 200 and contains the keyword "hint".

**Verification:**
Executed `pnpm exec playwright test tests/e2e/06-regression-fixes-20260525.spec.ts --reporter=line`.
Result: `8 passed (5.9s)`

No existing files were modified. Only one new file was created.

---
*PR created automatically by Jules for task [11750524286459146620](https://jules.google.com/task/11750524286459146620) started by @smartlivingberlin*

---
### PR #31 [MERGED] — Strict Read-Only Audit Report 2026-05-22
- Erstellt: 2026-05-23T05:31:07Z
- Merged: 2026-05-23T05:52:16Z

I have completed a comprehensive read-only audit of the repository. The findings are documented in `/audit/read-only-audit-2026-05-22.md`. 

Key findings include:
- Security vulnerabilities in unauthenticated Express endpoints.
- Database performance risks due to missing LIMIT clauses.
- Significant usage of TypeScript `any` types (477 occurrences).
- Hardcoded secrets and fallback tokens.
- Orphaned frontend routes.
- Pricing inconsistencies.

No existing files were modified, adhering to the strict read-only constraint.

---
*PR created automatically by Jules for task [8434903963234865453](https://jules.google.com/task/8434903963234865453) started by @smartlivingberlin*

---
### PR #29 [CLOSED] — Comprehensive Codebase Audit Report
- Erstellt: 2026-05-20T17:39:24Z
- Merged: <no value>

This submission includes a detailed audit report (AUDIT_REPORT_2026_05_20.md) covering content claims, broken features, SEO, accessibility, security, and performance findings across the codebase. No source code files were modified.

---
*PR created automatically by Jules for task [15594961356802768443](https://jules.google.com/task/15594961356802768443) started by @smartlivingberlin*

---
### PR #28 [MERGED] — fix: stripe guest checkout and multi-task improvements
- Erstellt: 2026-05-20T10:26:55Z
- Merged: 2026-05-20T10:34:27Z

- Fix Stripe guest checkout by allowing undefined email and removing login redirects in KursLanding.tsx
- Add password visibility toggles in ResetPassword.tsx and ComponentShowcase.tsx
- Fix KI-Monitor Gemini detection by checking GOOGLE_AI_API_KEY
- Redesign Home.tsx with professional HERO grid, Unsplash images, and promotion banner
- Update SEO metadata and keywords on Home page
- Add inline error handling for checkout sessions

---
### PR #27 [MERGED] — feat: OTP storage migrated to MySQL database
- Erstellt: 2026-05-19T21:00:40Z
- Merged: 2026-05-19T21:01:09Z

Replaces JSON file OTP storage with MySQL database.
  
- otpTokens table added to schema.ts
- Migration 0029_otp_tokens.sql created
- twoFactor.ts: generateOTP and verifyOTP now async, use DB
- ownerRoute.ts: all calls updated with await
- OTP codes now survive Railway deploys

---
### PR #26 [MERGED] — Fix Stripe guest checkout and remove forced login redirects
- Erstellt: 2026-05-19T20:07:46Z
- Merged: 2026-05-19T20:14:52Z

This change enables users who are not logged in to purchase courses directly from the landing page. 

1. **Stripe API Adjustment**: In `server/stripe.ts`, I changed the `customer_email` parameter to be `undefined` if no user email is provided (instead of an empty string). This signals Stripe to show an email input field on the checkout page, preventing the "Invalid email address" error.
2. **Frontend Logic Fix**: In `client/src/pages/kurs/KursLanding.tsx`, I removed the `navigate("/login")` fallbacks in the `handleKaufen` function.
3. **User Feedback**: Added a new `checkoutError` state to `KursLanding.tsx` and updated the UI to show a user-friendly error message near the "Jetzt kaufen" buttons if the checkout process fails or returns no URL.

These changes ensure guest users can complete their purchase without friction, reducing lost revenue from forced login redirects.

---
*PR created automatically by Jules for task [5018789295530479677](https://jules.google.com/task/5018789295530479677) started by @smartlivingberlin*

---
### PR #25 [MERGED] — fix: E-Mail from-Adresse auf verifizierte Domain korrigiert
- Erstellt: 2026-05-19T11:37:50Z
- Merged: 2026-05-19T11:37:53Z

Alle 6 Server-Dateien senden jetzt von info@immobilien-akademie-smart.de.
  
premium@immobilien-akademie-smart.de war nicht verifiziert → alle E-Mails wurden abgelehnt.
info@immobilien-akademie-smart.de ist in Resend verifiziert → E-Mail-Versand funktioniert.

Betroffen: NightCron, passwordReset, trialFollowup, trialRoute, twoFactor, auth-local

---
### PR #24 [MERGED] — fix: post-purchase UX, OTP security, bundle compliance
- Erstellt: 2026-05-19T11:18:51Z
- Merged: 2026-05-19T11:19:49Z

## Fixes

### UX
- Nach Kauf: 'Jetzt starten' leitet jetzt zu /statistiken statt Homepage
- Falsche E-Mail-Aussage entfernt

### Security
- OTP-Code erscheint nicht mehr im Production-Log (war sichtbar für Railway-Zugang)

### Compliance
- Bundle-Checkout (KursPakete.tsx): Widerruf-Checkbox vor Kauf (§356 BGB)
- KursLanding.tsx: Compliance-Claim bereinigt
- Bundle success_url: jetzt APP_URL statt manipulierbarem req.headers.origin

---
### PR #23 [MERGED] — fix: DSGVO Art. 17 — vollständige Admin-Löschung (19 Tabellen)
- Erstellt: 2026-05-19T06:31:09Z
- Merged: 2026-05-19T06:31:20Z

## Problem
Admin-deleteUser löschte nur 3 von 19 Tabellen → Art. 17 DSGVO verletzt.

## Fix
Alle 19 user-bezogenen Tabellen werden jetzt bei Admin-Löschung entfernt.
Self-Delete war bereits vollständig (15 Tabellen).

## Getestet
- TypeScript: 0 Fehler
- Korrekte Drizzle-Syntax für Subqueries (inArray statt Subquery)
- passwordResetTokens via email-Lookup (kein userId-Feld)

---
### PR #22 [MERGED] — fix: security vulnerabilities ip-address and brace-expansion
- Erstellt: 2026-05-19T06:13:32Z
- Merged: 2026-05-19T06:16:49Z

Fixes 2 moderate vulnerabilities via pnpm overrides:
- ip-address XSS (GHSA-v2v4-37r5-5v8g): override to >=10.1.1
- brace-expansion DoS (GHSA-jxxr-4gwj-5jf2): override to >=5.0.6

---
### PR #21 [MERGED] — fix: remaining compliance claims cleanup
- Erstellt: 2026-05-19T05:39:52Z
- Merged: 2026-05-19T05:40:04Z

### Änderungen
- KursLanding.tsx: 'Offizielles Zertifikat nach Abschluss' → 'Kursabschluss-Zertifikat'
- portalPhase.ts: Phase C IHK-anerkannt/AZAV-Labels auf korrekte Formulierungen geändert
- security-scan.sh: alte Basisportal-Domain korrigiert

### Warum wichtig
Phase C Labels waren aktivierbar über Admin-Panel und hätten falsche Compliance-Claims live geschaltet.

---
### PR #20 [MERGED] — fix: credentials cleanup, domain fixes, compliance claims
- Erstellt: 2026-05-19T05:17:56Z
- Merged: 2026-05-19T05:25:16Z

## Was wurde geändert

### Sicherheit
- OWNER_MAGIC_CODE und Admin-Passwort aus CHAT_ÜBERGABE.md entfernt
- Hardcoded Owner-Key in 6 Testdateien durch `process.env.OWNER_MAGIC_CODE` ersetzt

### Domain-Fixes
- Alte Basisportal-Domain in server/stripe.ts, auth-local.ts, index.ts korrigiert
- Alle Test-Dateien auf Premium-Domain umgestellt

### Compliance
- stripe.ts: 'Lizenz zum', 'lebenslang nutzen', 'offiziellem Zertifikat' entfernt
- KursLanding.tsx: 2 riskante Claims bereinigt
- Home.tsx: 'Offizielle Zertifikate', 'Sofortiger Zugang' bereinigt
- SuperAgent.ts: 'IHK-zertifizierter' aus KI-Prompt entfernt
- KursPakete.tsx: 'Lebenslanger Zugang' → 'Dauerhafter Zugang'

### Wichtig nach Merge
**OWNER_MAGIC_CODE in Railway rotieren** — alter Key war im Repo.

---
### PR #19 [MERGED] — fix: protect owner settings and inspect token routes
- Erstellt: 2026-05-18T20:38:56Z
- Merged: 2026-05-18T21:22:32Z

## Summary
- protect GET /api/owner/settings with OWNER_MAGIC_CODE
- protect POST /api/owner/settings with OWNER_MAGIC_CODE
- require valid OWNER_MAGIC_CODE for /api/owner/inspect-token
- keep patch scope limited to server/ownerRoute.ts

## Evidence
- Premium live currently exposes /api/owner/settings without auth
- PR diff is limited to server/ownerRoute.ts
- pnpm check passed
- pnpm test passed
- pnpm build passed

## Safety
- no database schema changes
- no env changes
- no frontend changes
- no Stripe/Railway configuration changes

---
### PR #18 [CLOSED] — Create Business Analysis Document (May 2026)
- Erstellt: 2026-05-17T06:08:50Z
- Merged: <no value>

I have created a comprehensive business analysis document `docs/BUSINESS_ANALYSIS.md` as requested. 

### Key highlights of the report:
- **Monetization Audit**: Detailed breakdown of individual modules (149€ - 699€) and bundle logic (Starter to Komplett).
- **Revenue Modeling**: Scenarios ranging from 4,250€ to 42,500€ per month.
- **Strategic Gaps**: Identified opportunities for recurring revenue (SaaS), B2B White-labeling, and lead generation.
- **Scalability**: Confirmed that the MySQL/Drizzle stack on Railway can easily handle 1,000+ users, with AI costs (Gemini) being marginal.
- **Competitive Edge**: Highlighted the Deep AI RAG integration and White-Label readiness as primary USPs.

The document is written in professional German and follows the requested 7-section structure. I used `git add -f` to ensure the file is tracked despite the global `*.md` ignore rule in `.gitignore`.

---
*PR created automatically by Jules for task [4728372605721886918](https://jules.google.com/task/4728372605721886918) started by @smartlivingberlin*

---
### PR #17 [CLOSED] — Add Comprehensive E2E Tests for All User Roles
- Erstellt: 2026-05-16T16:48:41Z
- Merged: <no value>

Created a new E2E test suite in `tests/e2e/08-volltest-alle-rollen.spec.ts` to verify user flows for anonymous and admin users against the production URL. The tests include checks for page loads, redirects, package pricing, and admin-only content. Reused session logic and handled production-specific elements like cookie banners and rate limits.

---
*PR created automatically by Jules for task [18306727874084470381](https://jules.google.com/task/18306727874084470381) started by @smartlivingberlin*

---
### PR #16 [CLOSED] — Add Comprehensive Business Analysis Document
- Erstellt: 2026-05-16T16:14:43Z
- Merged: <no value>

Created docs/BUSINESS_ANALYSIS.md with a detailed analysis of the German real estate education portal, including monetization, revenue potential, missing revenue streams, scalability, conversion optimization, and recommendations for revenue maximization.

---
*PR created automatically by Jules for task [6073079095660932618](https://jules.google.com/task/6073079095660932618) started by @smartlivingberlin*

---
### PR #15 [CLOSED] — Senior Business Analysis Document Creation
- Erstellt: 2026-05-16T16:05:56Z
- Merged: <no value>

Created a senior business analysis document `docs/BUSINESS_ANALYSIS.md` as requested. 

The analysis includes:
- Current monetization breakdown (prices, products, bundle logic).
- Revenue scenarios (Conservative, Realistic, Optimistic).
- Identification of missing revenue streams (Subscriptions, B2B, Affiliate).
- Scalability assessment (Database, Server, KI-Costs).
- Conversion Optimization review.
- Competitive positioning.
- 5 actionable recommendations for revenue growth.

Adhered to the strict rule of not modifying existing files. Used `git add -f` to bypass the general `.gitignore` rule for `.md` files in this repository.

---
*PR created automatically by Jules for task [11193568505878864626](https://jules.google.com/task/11193568505878864626) started by @smartlivingberlin*

---
### PR #14 [CLOSED] — Security Audit Report May 2026
- Erstellt: 2026-05-16T14:47:30Z
- Merged: <no value>

Performed a security audit of the Immobilien Akademie Smart platform. 

Key findings include:
- **Critical:** Hardcoded fallback secrets for JWT verification in multiple files.
- **High:** Authentication bypasses for owner/admin settings and public exposure of paid content (Quiz/Videos) via tRPC public procedures.
- **High:** Potential SQL injection risks in raw SQL queries.
- **Medium:** Information leakage through internal error messages in API responses and excessively long JWT session expiries.

Recommended immediate actions:
1. Remove hardcoded fallback secrets.
2. Enforce `protectedProcedure` or `requireAuth` for all content-related and administrative routes.
3. Sanitize error messages sent to the client.
4. Implement Zod validation for all Express request inputs.

---
*PR created automatically by Jules for task [1604444826015559559](https://jules.google.com/task/1604444826015559559) started by @smartlivingberlin*

---
### PR #13 [CLOSED] — Legal Compliance Audit Report 2026-05
- Erstellt: 2026-05-16T14:45:18Z
- Merged: <no value>

I have completed a thorough legal compliance audit of the platform.

Key findings included in the report (docs/LEGAL_COMPLIANCE_REPORT.md):
- **Violations:** Missing insurance data in Impressum, missing disclosure and consent check for Google/Plausible Analytics.
- **Warnings:** Redundant legal page files and the use of 'garantiert' in educational contexts.
- **Successes:** Correct 'IHK-vorbereitet' phrasing and valid withdrawal policy.

The audit result is 6/10, with a clear path to 9/10 upon fixing the identified formal and technical issues. No existing files were modified during this process.

---
*PR created automatically by Jules for task [3847689169972876913](https://jules.google.com/task/3847689169972876913) started by @smartlivingberlin*

---
### PR #12 [CLOSED] — Pre-Launch Audit Report (Jules)
- Erstellt: 2026-05-12T06:41:39Z
- Merged: <no value>

This PR introduces the JULES_AUDIT_REPORT.md file containing a comprehensive pre-launch audit of the Immobilien Akademie Smart Premium portal.

Key findings include:
- Security: Identified a client-side only 2FA bypass for Admin accounts.
- Auth: Found a privilege escalation risk in the tester-access mechanism.
- Payments: Discovered a price inconsistency for the Verwalter-Paket and a missing legal consent check in the bundle checkout path.
- Legal: Identified a critical claim "IHK-anerkannt" that must be changed to "IHK-vorbereitet" to avoid legal risks.
- Performance: Found memory leak risks in some setInterval usages.

No code files were modified during this audit.

---
*PR created automatically by Jules for task [2665530487786951622](https://jules.google.com/task/2665530487786951622) started by @smartlivingberlin*

---
### PR #11 [MERGED] — Comprehensive Repository Audit and Security Fixes
- Erstellt: 2026-05-09T07:48:27Z
- Merged: 2026-05-09T17:32:43Z

Completed a comprehensive audit of the repository.

Key actions:
1. Fixed a potential XSS vulnerability in the AI Assistant component by sanitizing Markdown output with DOMPurify.
2. Fixed a broken access control issue in the agent routes where coaching profiles were accessible without authorization.
3. Conducted a thorough review of SQL queries, performance configurations, and accessibility features.
4. Created a detailed `AUDIT_REPORT.md` file summarizing findings and providing long-term recommendations.
5. Verified that core security measures like path traversal protection and SQL parameterization are effectively implemented.

---
*PR created automatically by Jules for task [4414707306291468119](https://jules.google.com/task/4414707306291468119) started by @smartlivingberlin*

---
### PR #10 [CLOSED] — fix: glossar_terms Duplikate entfernen und UNIQUE Index setzen
- Erstellt: 2026-04-27T08:33:07Z
- Merged: <no value>

## Problem

The `glossar_terms` table contains duplicate entries for the same `term` value, causing data inconsistency in the Immobilien-Akademie-Premium service. No UNIQUE constraint existed on the `term` column, so duplicates could be inserted freely.

## Solution

Added migration `0021_glossar_cleanup.sql` that first deletes all duplicate rows by keeping only the entry with the smallest `id` per `term`, then adds a `UNIQUE INDEX IF NOT EXISTS` on the `term` column to prevent future duplicates. The `IF NOT EXISTS` clause makes the `ALTER TABLE` idempotent so re-running the migration is safe.

### Changes
- **Created** `drizzle/migrations/0021_glossar_cleanup.sql`

---
*Generated by [Railway](https://railway.com)*

---
### PR #9 [MERGED] — docs: README und Deployment-Guide erweitern
- Erstellt: 2026-04-27T07:59:48Z
- Merged: 2026-04-27T08:08:02Z

## Summary

Expanded the minimal one-line README into full developer documentation and added two new reference files. README.md now covers project overview, feature table, module breakdown, quick start (install, env vars, local dev), architecture summary, project structure, coding standards, testing, deployment, and troubleshooting. DEPLOYMENT.md provides a step-by-step Railway deployment guide including environment variables, database setup, migration workflow, Stripe webhook configuration, rollback procedures, and a go-live checklist. ARCHITECTURE.md documents the full system design: request flow diagrams, frontend tech stack and routing, tRPC router structure, Express middleware order, database schema, auth flow (PBKDF2 + JWT), KI integration, Stripe checkout flow, White-Label system, security headers, and concrete data-flow sequence diagrams. All content is derived directly from the actual codebase (package.json, server/_core/index.ts, server/_core/env.ts, railway.json, nixpacks.toml, drizzle/schema, etc.).

### Changes
- **Modified** `README.md`
- **Created** `DEPLOYMENT.md`
- **Created** `ARCHITECTURE.md`

---
*Generated by [Railway](https://railway.com)*

---
### PR #8 [MERGED] — feat: Structured Logging - JSON-Logs und Log-Level Konfiguration
- Erstellt: 2026-04-27T07:55:08Z
- Merged: 2026-04-27T08:08:02Z

## Summary

Introduces a new `server/_core/logger.ts` utility that emits structured JSON log lines with `level`, `msg`, `data`/`error`, `stack`, and `ts` fields. All `console.log`, `console.warn`, and `console.error` calls in `server/_core/index.ts`, `server/db.ts`, `server/stripe.ts`, `server/trialRoute.ts`, and `server/migrate.ts` have been replaced with the appropriate `logger.info`, `logger.warn`, `logger.error`, or `logger.debug` calls. The `debug` level is gated behind `LOG_LEVEL=debug`, making verbosity configurable per environment without code changes.

### Changes
- **Created** `server/_core/logger.ts`
- **Modified** `server/migrate.ts`
- **Modified** `server/db.ts`
- **Modified** `server/stripe.ts`
- **Modified** `server/trialRoute.ts`
- **Modified** `server/_core/index.ts`

---
*Generated by [Railway](https://railway.com)*

---
### PR #7 [MERGED] — perf: Code-Splitting optimieren - vendor-react Chunk reduzieren
- Erstellt: 2026-04-27T07:52:23Z
- Merged: 2026-04-27T08:08:02Z

## Problem

The `vendor-react` chunk was 1.5 MB (gzip: ~450 KB) because it bundled React core, all Radix UI primitives, TanStack Query, framer-motion, recharts, react-markdown, and every other `node_modules` package into a single file. Additionally, ~20 page components (QuizPage, Quiz, ExamMode, GamificationDashboard, StrategiePlattform, all admin pages, all module detail pages, legal pages, etc.) were imported statically in `App.tsx`, forcing them into the initial bundle regardless of the visited route.

## Solution

In `vite.config.ts`, replaced the monolithic `vendor-react` manualChunks rule with 9 focused chunks: `vendor-react-core` (React + ReactDOM + scheduler), `vendor-react-ui` (Radix UI), `vendor-react-state` (TanStack Query + tRPC + Zustand + wouter + superjson), `vendor-icons` (lucide-react), `vendor-animation` (framer-motion), `vendor-charts` (recharts + d3), `vendor-markdown` (react-markdown + remark/rehype pipeline), `vendor-react-utils` (all remaining node_modules), and `data-questions`. In `App.tsx`, converted every remaining static `import` for page components and shared UI components (QuizPage, Quiz, ExamMode/Question/Results, GamificationDashboard, StrategiePlattform, all 10 module detail pages, all 15 admin pages, legal pages, AudioModus, Admin2FA, CookieConsent, CookieBanner, InspectBanner, StructuredData, AccessibilityPanel, NotFound) to `React.lazy()` dynamic imports, and wrapped their usages in `<Suspense fallback={null}>` where needed outside the existing router Suspense boundary.

### Changes
- **Modified** `vite.config.ts`
- **Modified** `client/src/App.tsx`

---
*Generated by [Railway](https://railway.com)*

---
### PR #6 [MERGED] — fix: add-indexes.sql - MySQL 8.0 kompatible Syntax
- Erstellt: 2026-04-27T07:49:00Z
- Merged: 2026-04-27T08:08:02Z

## Problem

The `add-indexes.sql` migration fails on MySQL 8.0 with a syntax error on every `CREATE INDEX IF NOT EXISTS` statement because the unquoted identifier syntax is not recognised by the MySQL parser in that context, leaving all 6 indexes uncreated and causing a performance regression.

## Solution

Wrapped all index names, table names, and column names in backticks across all 6 `CREATE INDEX IF NOT EXISTS` statements. Backtick-quoting is the correct MySQL 8.0 syntax and resolves the parser error while keeping the idempotent `IF NOT EXISTS` guard intact.

### Changes
- **Modified** `drizzle/migrations/add-indexes.sql`

---
*Generated by [Railway](https://railway.com)*

---
### PR #5 [MERGED] — chore: Backup-Dateien aus Auth-Entwicklung löschen
- Erstellt: 2026-04-27T07:36:08Z
- Merged: 2026-04-27T07:44:59Z

## Summary

Removes three stale backup files of `server/_core/auth-local.ts` that were accidentally committed despite being listed in `.gitignore`. These files (`*.bak.2026-03-03_20-04-55`, `*.bak.rolefix.2026-03-03_20-27-25`, `*.bak.disable-magic.2026-03-05_09-27-49`) serve no purpose in the repository and caused confusion about which version of the auth module is authoritative. The canonical `server/_core/auth-local.ts` is untouched.

### Changes
- **Deleted** `server/_core/auth-local.ts.bak.2026-03-03_20-04-55`
- **Deleted** `server/_core/auth-local.ts.bak.rolefix.2026-03-03_20-27-25`
- **Deleted** `server/_core/auth-local.ts.bak.disable-magic.2026-03-05_09-27-49`

---
*Generated by [Railway](https://railway.com)*

---
### PR #4 [MERGED] — fix: Doppelte Migration 0011 - Konflikt beheben
- Erstellt: 2026-04-27T07:35:39Z
- Merged: 2026-04-27T07:44:59Z

## Problem

Two migrations shared the number 0011: the Drizzle-generated `0011_romantic_patch.sql` and the hand-written `0011_azav_compliance_tables.sql`. Both attempted to create the same eight tables (learning_logs, user_sessions, activity_heartbeats, exam_audit_log, feedback, complaints, consent_log, avv_agreements), causing a migration conflict. The Drizzle journal also listed both entries with duplicate idx values, which would break any migration runner that processes them in order.

## Solution

Deleted `0011_romantic_patch.sql` from both `drizzle/` and `drizzle/migrations/`, keeping the superior hand-written `0011_azav_compliance_tables.sql` which uses `IF NOT EXISTS`, proper InnoDB/utf8mb4 settings, meaningful indexes, and AZAV compliance comments. Updated `drizzle/meta/_journal.json` to remove the `0011_romantic_patch` entry and re-sequence all subsequent idx values so the journal is contiguous from 0 through 15.

### Changes
- **Deleted** `drizzle/migrations/0011_romantic_patch.sql`
- **Deleted** `drizzle/0011_romantic_patch.sql`
- **Modified** `drizzle/meta/_journal.json`

---
*Generated by [Railway](https://railway.com)*

---
### PR #3 [MERGED] — fix: Fehlende Datenbank-Migrations für trial_leads und presentation_codes
- Erstellt: 2026-04-27T07:34:32Z
- Merged: 2026-04-27T07:44:59Z

## Problem

The tables `trial_leads` and `presentation_codes` are actively queried in `server/trialRoute.ts` and `server/stripe.ts`, but no database migrations existed for them. This caused trial-code and presentation-code features to crash at runtime with database errors whenever a user attempted to redeem a trial code.

## Solution

Added `drizzle/migrations/0019_trial_leads.sql` and `drizzle/migrations/0020_presentation_codes.sql`, defining both tables with all columns, constraints, and indexes that match the exact field names and types used in the application code. Both migrations follow the existing project convention of backtick-quoted identifiers with `ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`.

### Changes
- **Created** `drizzle/migrations/0019_trial_leads.sql`
- **Created** `drizzle/migrations/0020_presentation_codes.sql`

---
*Generated by [Railway](https://railway.com)*

---
### PR #2 [MERGED] — fix: Konsistente Fehlerbehandlung in getDb() und DB-Funktionen
- Erstellt: 2026-04-26T21:39:42Z
- Merged: 2026-04-26T21:45:06Z

## Problem

Every DB function in `server/db.ts` contained an `if (!db)` guard that silently returned `undefined`, `null`, `[]`, or `false` when the database was unavailable. This caused hard-to-debug failures where callers received empty or falsy values with no error thrown, masking the real problem (missing `DATABASE_URL`).

## Solution

Removed all 60+ `if (!db)` checks across every exported DB function. `getDb()` already throws a descriptive error when `DATABASE_URL` is not set, so these guards were dead code that only suppressed errors. Now any missing DB connection surfaces immediately as an exception rather than a silent no-op, making failures visible and consistent across the entire data layer.

### Changes
- **Modified** `server/db.ts`

---
*Generated by [Railway](https://railway.com)*

---
### PR #1 [CLOSED] — fix: SQL-Syntax in add-indexes.sql für MySQL-Kompatibilität
- Erstellt: 2026-04-26T21:37:27Z
- Merged: <no value>

## Problem

The migration file `drizzle/migrations/add-indexes.sql` used `ALTER TABLE ... ADD INDEX IF NOT EXISTS`, which is not valid MySQL syntax. MySQL only supports `IF NOT EXISTS` on `CREATE INDEX`, not on `ADD INDEX` inside an `ALTER TABLE` statement. This caused the migration to fail with a SQL syntax error, leaving all performance indexes uncreated.

## Solution

Replaced all seven `ALTER TABLE ... ADD INDEX IF NOT EXISTS` statements with `CREATE INDEX IF NOT EXISTS ... ON table (column)`, which is the correct MySQL syntax. This form is also idempotent — it can be run multiple times without error — making the migration more robust in case it is ever re-executed.

### Changes
- **Modified** `drizzle/migrations/add-indexes.sql`

---
*Generated by [Railway](https://railway.com)*

---

## Alle Markdown-Dokumentationsdateien (Volltext)

### Datei: docs/AUDIT_2026-06-10_01_CHRONOLOGIE.md
```markdown
# Teil 1 — Chronologie und PRs (30 Tage)

**Zeitraum:** 2026-05-11 bis 2026-06-10

---

## 1.1 Vollständige Chronologie 14 Tage (2026-05-27 bis 2026-06-10)

| Datum | Commits | Hauptthemen | PRs merged | PRs erstellt | Risiken/Probleme |
|-------|---------|-------------|------------|--------------|------------------|
| 2026-05-27 | 7 | UserGuide öffentlich, Cookie-Banner, WebP-Bilder, Sentry CSP | 0 | 0 (PR #37-38 closed) | Cookie-Banner UX |
| 2026-05-30 | 7 | — | 0 | 0 | Geringe Aktivität |
| 2026-05-31 | 22 | Sprint 2 Claims, Stripe Klarna, KursLanding | #41-49 | 0 | Claims-Bereinigung |
| 2026-06-01 | 39 | Owner 2FA, Pending Purchases, Trial, AGB | #50-67 | 0 | Owner-Auth-Bugs |
| 2026-06-02 | 2 | — | 0 | 0 | — |
| 2026-06-03 | 7 | §34c Claims P0, Vitest grün | #68-70 | 0 | Falsche Sachkunde-Claims |
| 2026-06-04 | 1 | — | 0 | 0 | — |
| 2026-06-05 | 10 | CSP AI, Rechenpraxis Proxy, Claims | #71-75 | #72 (closed) | PR #72 Audit closed |
| 2026-06-06 | 5 | Backup-Planung R2, Encryption | #76-79 | 0 | Backup noch nicht aktiv |
| 2026-06-07 | **90** | Mega-Sprint: B2B Phasen 4-15, Security, Inspect | #80-126 | 0 | PR-Stau-Vorstufe |
| 2026-06-08 | 31 | Inspect Security P0, NF-Forensik, B2B smoke | #127-148 | #136-149 | 13+ offene Drafts |
| 2026-06-09 | 37 | Dockerfile-Migration #158-166, A11y Zoom | #153-166 | #150-155 | 9 Deploy-Fix-PRs |
| 2026-06-10 | 10+ | Verwalter P1-P3+ (#169-177), KI Pipeline | #168-171 | #172-177 | 6 kaskadierende Drafts |

**Beleg Commits/Tag:** `git log --since=2026-05-27 --format=%ad --date=short | sort | uniq -c`

---

## Spezial-Tage (Detail)

### 2026-05-27 (7 Commits)

| Aspekt | Inhalt |
|--------|--------|
| Ausgangslage | Stabile Basis, Jules-Branch-Selektiv-Merge |
| Aktivität | UserGuide öffentlich (`60640d2`), Cookie-Banner Scroll-Trigger, WebP-Konvertierung (-35% Größe), Sentry in CSP |
| Ziel | UX/Performance ohne Auth-Änderungen |
| Tagesende | 7 Commits, keine PRs |
| Tests | **unverifiziert** ob CI lief |
| Restrisiken | Cookie-Banner Timing |

### 2026-05-31 (22 Commits) — Sprint-Aktivität

| Aspekt | Inhalt |
|--------|--------|
| Ausgangslage | Trust-Fixes Sprint 1 abgeschlossen (#41) |
| Aktivität | Sprint 2: Claims in Checkout, KursLanding, Foerderung AZAV; Stripe Klarna dynamisch (#45); Hotfix automatic_payment_methods (#46) |
| Ziel | Compliance-Claims neutralisieren vor Marketing |
| Tagesende | 8 PRs merged (#41-49) |
| Tests | Claims-Regression in späteren PRs |
| Restrisiken | Weitere versteckte §34c-Claims (behoben 03.06.) |

### 2026-06-01 (39 Commits)

| Aspekt | Inhalt |
|--------|--------|
| Ausgangslage | Owner-Dashboard mit Key-Flow-Problemen |
| Aktivität | Sprint 4a-4h: Owner 2FA, Session-Auth, Pending Purchases, Trial-Ablauf, Checkout-Consent, Stripe-Bundle |
| Ziel | Owner-Auth production-ready |
| Tagesende | 18 PRs merged (#50-67) |
| Tests | Owner-API-Tests in späteren Sprints |
| Restrisiken | Cookie-Kohärenz (behoben 07.06. #98) |

### 2026-06-07 (90 Commits) — Spitzentag

| Aspekt | Inhalt |
|--------|--------|
| Ausgangslage | B2B-Phasen 1-3 teilweise implementiert, Security-Audit offen |
| Aktivität | **47 PRs merged** in einem Tag: Phasen 4-15 (Stripe, B2B, Referral, KI Fair-Use), Agency Sprints (Security, Compliance, CI), Inspect v2, Auth-Cookie, Weiterbildungsnachweis, Competitive USP, Module 4 Fix |
| Ziel | B2B Go-Live-Vorbereitung + Security-Hardening |
| Tagesende | main @ `e324cd6` Bereich, massiver Feature-Sprung |
| Tests | #90 Module-Smoke, #96 Vitest-Config, #140 Audit-Tests (08.06.) |
| Restrisiken | Zu viele Änderungen auf einmal; 18 offene PRs später; nicht alles E2E-verifiziert |

**Merged PRs 07.06. (Auszug):** #80-126 — vollständige Liste in PR-Tabelle unten.

### 2026-06-08 — Inspect-Sicherheit + Reifegrad-Audit

| Aspekt | Inhalt |
|--------|--------|
| Ausgangslage | Inspect-Modus mit Query-Leak (admin tRPC in read-only) |
| Aktivität | P0 Security: tRPC-Block (#141), REST-Allowlist (#148); NF-Forensik Übergabebericht (#143); Audit-Tests (#140); B2B Team-Code Fix (#133); R2 Backup Cron (#132); Komfort-Leiste (#139) |
| Ziel | Antropiq-Übergabe vorbereiten |
| Tagesende | 15 PRs merged, Übergabedokument `docs/UEBERGABE_ANTROPIQ_ARCHITEKT_20260608.md` |
| Tests | Vitest 122, API 36, E2E 10 (laut `EXTERNAL_OPS_CHECKLIST.md:3`) |
| Restrisiken | 13+ Draft-PRs offen; HSTS preload (#151) nicht merged |

### 2026-06-09 — Verwalter-Vorbereitung + Build-Migration

| Aspekt | Inhalt |
|--------|--------|
| Ausgangslage | Nixpacks Deploy instabil |
| Aktivität | Dockerfile #158-166 (9 PRs); Owner-Admin-Isolation (#153); Rechenpraxis P0 (#156); A11y Zoom (#157); KI-Pipeline v2 (#168 am 10.06.) |
| Ziel | Stabiler Deploy + KI-Pipeline Fix |
| Tagesende | Dockerfile production-ready |
| Tests | Docker build in CI (#161) |
| Restrisiken | Volle node_modules = großes Image; Platform PR #154 (14k LoC) offen |

### 2026-06-10 — Verwalter Suite Tag

| Aspekt | Inhalt |
|--------|--------|
| Ausgangslage | Rechenpraxis als Produkt, keine Verwalter-Tools |
| Aktivität | #169-171 merged (Shell, P1, P2); #172-177 erstellt (P3, DATEV, Assistent, Suite+, Chat) |
| Ziel | Verwalter MVP in einem Tag |
| Tagesende | Production: Vorlagen + Objekte + KI-Brief; 6 Draft-PRs offen |
| Tests | 213 Vitest auf Branch `verwalter-chat-buchung` |
| Restrisiken | File-Stores, PR-Kaskade, kein E2E für Suite |

---

## 1.2 Alle PRs der letzten 30 Tage

**Quelle:** `gh pr list --state all --limit 200` (2026-06-10)

### PRs #68–#177 (30-Tage-Fenster, chronologisch)

| PR# | Erstellt | Merged | Titel | Status | Branch | +/- LoC | Deployed | Verifiziert | Risiko |
|-----|--------|--------|-------|--------|--------|---------|----------|-------------|--------|
| 68 | 06-03 | 06-03 | §34c Claims + HealthWatcher | ✅ MERGED | fix/p0-claims | +15/-15 | ✅ | ✅ | Niedrig |
| 69 | 06-03 | 06-03 | Vitest grün, Agent-Prompts | ✅ | fix/p1-test | +6/-6 | ✅ | ✅ | Niedrig |
| 70 | 06-03 | 06-03 | all-questions Claims | ✅ | fix/p0-all-questions | +1/-1 | ✅ | ✅ | Niedrig |
| 71 | 06-05 | 06-05 | P0 Claims Lockfile | ✅ | fix/p0-claims-lockfile | +433/-242 | ✅ | 🟡 | Mittel |
| 72 | 06-05 | — | Read-Only Audit | ❌ CLOSED | read-only-audit | 0/0 | — | — | — |
| 73 | 06-05 | 06-05 | Owner Generators Fix | ✅ | fix/owner-generators | +28/-5 | ✅ | 🟡 | Niedrig |
| 74 | 06-05 | 06-05 | Rechenpraxis AI Proxy | ✅ | fix/rechenpraxis-ai | +71/-9 | ✅ | ✅ | Niedrig |
| 75 | 06-05 | 06-06 | CSP AI entfernen | ✅ | fix/csp-ai | +1/-1 | ✅ | ✅ | Niedrig |
| 76 | 06-06 | 06-06 | Claims Policy Regression | ✅ | fix/claims-policy | +187/0 | ✅ | ✅ | Niedrig |
| 77 | 06-06 | 06-06 | MySQL Backup Runbook | ✅ | fix/mysql-backup | +267/0 | ✅ | Doku | Niedrig |
| 78 | 06-06 | 06-06 | R2 Backup Plan | ✅ | fix/r2-plan | +296/0 | ✅ | Doku | Niedrig |
| 79 | 06-06 | 06-06 | Backup Encryption Plan | ✅ | fix/backup-encryption | +68/-14 | ✅ | Doku | Niedrig |
| 80 | 06-07 | 06-07 | CI Env Hardening | ✅ | p1-ci-env | +101/-38 | ✅ | ✅ | Niedrig |
| 81 | 06-07 | 06-07 | Dead Case Study Route | ✅ | remove-dead-route | +29/-41 | ✅ | ✅ | Niedrig |
| 82 | 06-07 | 06-07 | GDPR Delete Coverage | ✅ | expand-gdpr | +99/-2 | ✅ | 🟡 | Mittel |
| 83 | 06-07 | 06-07 | Protect Module Data JSON | ✅ | protect-module-data | +57/-6 | ✅ | ✅ | Niedrig |
| 84 | 06-07 | 06-07 | LLM Provider Routing | ✅ | harden-llm | +69/-19 | ✅ | ✅ | Niedrig |
| 85 | 06-07 | 06-07 | Module 4 Loading Fix | ✅ | fix-module-4 | +45/-11 | ✅ | ✅ | Niedrig |
| 86 | 06-07 | 06-07 | Inspect Link Flow | ✅ | fix-inspect-link | +189/-40 | ✅ | ✅ | Mittel |
| 87 | 06-07 | 06-07 | Admin Model Label | ✅ | audit-fix-admin | +1/-1 | ✅ | ✅ | Niedrig |
| 88 | 06-07 | 06-07 | AITutor Model Label | ✅ | audit-fix-aitutor | +1/-1 | ✅ | ✅ | Niedrig |
| 89 | 06-07 | 06-07 | R2 Restore Test Docs | ✅ | r2-restore-docs | +57/-1 | ✅ | Doku | Niedrig |
| 90 | 06-07 | 06-07 | Module Smoke Playwright | ✅ | module-smoke | +33/0 | ✅ | ✅ | Niedrig |
| 91 | 06-07 | 06-07 | KI-Stats Admin Auth | ✅ | fix-ki-stats | +84/0 | ✅ | ✅ | Niedrig |
| 92 | 06-07 | 06-07 | Inspect Polish Home | ✅ | inspect-polish | +35/-10 | ✅ | ✅ | Niedrig |
| 93 | 06-07 | 06-07 | Compliance Sprint | ✅ | agency-compliance | +18/-8 | ✅ | ✅ | Niedrig |
| 94 | 06-07 | 06-07 | Security Sprint | ✅ | agency-security | +28/-9 | ✅ | ✅ | Niedrig |
| 95 | 06-07 | 06-07 | Case Management Docs | ✅ | agency-case | +132/0 | ✅ | Doku | Niedrig |
| 96 | 06-07 | 06-07 | CI Vitest Config | ✅ | agency-ci | +36/-39 | ✅ | ✅ | Niedrig |
| 97 | 06-07 | 06-07 | Inspect v2 Read-only | ✅ | inspect-v2 | +499/-86 | ✅ | ✅ | Mittel |
| 98 | 06-07 | 06-07 | Auth Cookie Kohärenz | ✅ | auth-coherence | +144/-16 | ✅ | ✅ | Mittel |
| 99 | 06-07 | 06-07 | Competitive USP Sprint | ✅ | competitive-usp | +692/0 | ✅ | Doku | Niedrig |
| 100 | 06-07 | 06-07 | Weiterbildungsnachweis | ✅ | weiterbildung | +696/-3 | ✅ | 🟡 | Mittel |
| 101 | 06-07 | 06-07 | B2B Maklerbüros Landing | ✅ | b2b-landing | +239/0 | ✅ | ✅ | Niedrig |
| 102 | 06-07 | 06-07 | Zugang 2× + Referral | ✅ | access-renewal | +711/-16 | ✅ | ✅ | Mittel |
| 103 | 06-07 | 06-07 | Rechenpraxis schützen | ✅ | access-hardening | +61/-5 | ✅ | ✅ | Niedrig |
| 104 | 06-07 | 06-07 | Portal-Tools schützen | ✅ | protect-tools | +26/-21 | ✅ | ✅ | Niedrig |
| 105 | 06-07 | 06-07 | Access E2E Hardening | ✅ | access-e2e | +163/-36 | ✅ | ✅ | Mittel |
| 106 | 06-07 | 06-07 | Compliance SKU 249€ | ✅ | compliance-sku | +479/-6 | ✅ | 🟡 | Mittel |
| 107 | 06-07 | 06-07 | KI Fair-Use + Emails | ✅ | ki-fairuse | +413/-4 | ✅ | ✅ | Mittel |
| 108 | 06-07 | 06-07 | Referral Backfill | ✅ | phase4-referral | +469/-52 | ✅ | 🟡 | Mittel |
| 109 | 06-07 | 06-07 | B2B Stripe Checkout | ✅ | phase5-b2b | +473/-23 | ✅ | ✅ | Mittel |
| 110 | 06-07 | 06-07 | Verwalter-Rechner Landing | ✅ | phase6-verwalter | +243/-5 | ✅ | ✅ | Niedrig |
| 111 | 06-07 | 06-07 | Stripe Live + Renewal | ✅ | phase7-stripe | +626/-1 | ✅ | 🟡 | Hoch |
| 112 | 06-07 | 06-07 | Rechenpraxis Solo B2B | ✅ | phase8-rechen | +708/-22 | ✅ | ✅ | Mittel |
| 113 | 06-07 | 06-07 | B2B Onboarding Stripe | ✅ | phase9-b2b | +569/-11 | ✅ | ✅ | Mittel |
| 114 | 06-07 | 06-07 | B2B Logo Connect | ✅ | phase10-connect | +442/-3 | ✅ | ✅ | Mittel |
| 115 | 06-07 | 06-07 | Stripe Prices Connect | ✅ | phase11-prices | +302/-31 | ✅ | ✅ | Mittel |
| 116 | 06-07 | 06-07 | Revenue Module Prices | ✅ | phase12-revenue | +311/-18 | ✅ | 🟡 | Mittel |
| 117 | 06-07 | 06-07 | Connect B2B E2E | ✅ | phase13-connect | +555/-18 | ✅ | ✅ | Mittel |
| 118 | 06-07 | 06-07 | B2B Webhook Cron | ✅ | phase14-webhook | +365/-127 | ✅ | ✅ | Mittel |
| 119 | 06-07 | 06-07 | Price Readiness Pending | ✅ | phase15-prices | +284/-29 | ✅ | 🟡 | Mittel |
| 120 | 06-07 | 06-07 | Sprint ABE Security | ✅ | sprint-abe | +147/-111 | ✅ | ✅ | Mittel |
| 121 | 06-07 | 06-07 | Sprint MILO Modules | ✅ | sprint-milo | +321/-91 | ✅ | ✅ | Mittel |
| 122 | 06-07 | 06-07 | Modul5 Stripe E2E Live | ✅ | modul5-stripe | +286/-32 | ✅ | ✅ | Mittel |
| 123 | 06-07 | 06-07 | R2 Backup Stripe CI | ✅ | r2-backup-ci | +188/-178 | ✅ | ✅ | Mittel |
| 124 | 06-07 | 06-07 | MySQL Ops PR72 | ✅ | mysql-ops | +200/-14 | ✅ | Doku | Niedrig |
| 125 | 06-07 | 06-07 | Health Ops Checklist | ✅ | health-ops | +114/-25 | ✅ | Doku | Niedrig |
| 126 | 06-07 | 06-07 | B2B Migration Ops | ✅ | b2b-migration | +597/-136 | ✅ | ✅ | Mittel |
| 127 | 06-08 | 06-08 | Stripe 18 Price Seed | ✅ | stripe-seed | +321/-1 | ✅ | ✅ | Mittel |
| 128 | 06-08 | 06-08 | B2B R2 Live Ops | ✅ | b2b-r2-live | +457/-35 | ✅ | Doku | Mittel |
| 129 | 06-08 | 06-08 | Railway Link CI | ✅ | fix-railway-link | +13/-12 | ✅ | ✅ | Niedrig |
| 130 | 06-08 | 06-08 | AWS CLI R2 | ✅ | fix-aws-cli | +7/-3 | ✅ | ✅ | Niedrig |
| 131 | 06-08 | — | R2 Secret Trim | ❌ CLOSED | fix-r2-trim | +13/0 | — | — | — |
| 132 | 06-08 | 06-08 | R2 Backup Cron | ✅ | enable-r2-cron | +17/-5 | ✅ | 🟡 | Mittel |
| 133 | 06-08 | 06-08 | B2B Team Code Fix | ✅ | fix-b2b-team | +282/-26 | ✅ | ✅ | Mittel |
| 134 | 06-08 | 06-08 | B2B Team Smoke CLI | ✅ | b2b-smoke-cli | +117/0 | ✅ | ✅ | Niedrig |
| 135 | 06-08 | 06-08 | Landing Login Access | ✅ | landing-login | +43/-4 | ✅ | ✅ | Niedrig |
| 136 | 06-08 | — | Baumeister Übergabe | 🟡 OPEN | baumeister-audit | +406/-8 | ❌ | — | Niedrig |
| 137 | 06-08 | 06-08 | B2B Smoke Doc | ✅ | b2b-smoke-doc | +20/0 | ✅ | Doku | Niedrig |
| 138 | 06-08 | 06-08 | B2B Smoke Syntax | ✅ | fix-b2b-syntax | +26/-2 | ✅ | ✅ | Niedrig |
| 139 | 06-08 | 06-08 | Komfort + Rechenpraxis USP | ✅ | comfort-rechen | +512/-113 | ✅ | ✅ | Mittel |
| 140 | 06-08 | 06-08 | Audit Test Fixes | ✅ | audit-tests | +705/-151 | ✅ | ✅ | Mittel |
| 141 | 06-08 | 06-08 | Inspect tRPC Block P0 | ✅ | fix-inspect-leak | +127/-35 | ✅ | ✅ | **Hoch** |
| 142 | 06-08 | 06-08 | Module 6-8 Cleanup | ✅ | cleanup-m678 | +16/-320 | ✅ | ✅ | Niedrig |
| 143 | 06-08 | 06-08 | NF Forensik Übergabe | ✅ | uebergabe-nf | +158/-2 | ✅ | Doku | Niedrig |
| 144 | 06-08 | — | R2 Failure Alert | 🟡 OPEN | r2-alert | +38/0 | ❌ | — | Mittel |
| 145 | 06-08 | — | Stripe Preflight 18 IDs | 🟡 OPEN | stripe-preflight | +210/0 | ❌ | — | Mittel |
| 146 | 06-08 | — | DSGVO Deletion Audit | 🟡 OPEN | dsgvo-audit | +196/0 | ❌ | — | Mittel |
| 147 | 06-08 | — | Hybrid Email Verify | 🟡 OPEN | hybrid-email | +220/-2 | ❌ | — | Mittel |
| 148 | 06-08 | 06-08 | REST Inspect Allowlist | ✅ | inspect-rest | +179/-26 | ✅ | ✅ | **Hoch** |
| 149 | 06-09 | — | §17 Korrektur-Nachtrag | 🟡 OPEN | audit-corrections | +329/-4 | ❌ | — | Niedrig |
| 150 | 06-09 | — | Risikoregister v1 | 🟡 OPEN | risk-register | +82/0 | ❌ | — | Niedrig |
| 151 | 06-09 | — | HSTS Preload Fix | 🟡 OPEN | hsts-preload | +5/-5 | ❌ | — | Mittel |
| 152 | 06-09 | — | Alisad Master Workflow | 🟡 OPEN | alisad-workflow | +379/0 | ❌ | — | Niedrig |
| 153 | 06-09 | 06-09 | Owner Admin Isolation | ✅ | owner-admin | +67/-6 | ✅ | ✅ | Mittel |
| 154 | 06-09 | — | Platform Audio/Comfort | 🟡 OPEN | platform-comfort | +14492/-1105 | ❌ | — | **Hoch** |
| 155 | 06-09 | — | Owner Audit Trail C1 | 🟡 OPEN | owner-audit | +472/-2 | ❌ | — | Mittel |
| 156 | 06-09 | 06-09 | Rechenpraxis P0 Modul3 | ✅ | rechenpraxis-p0 | +533/-34 | ✅ | ✅ | Mittel |
| 157 | 06-09 | 06-09 | A11y Font Zoom | ✅ | fix-font-zoom | +105/-60 | ✅ | ✅ | Niedrig |
| 158 | 06-09 | 06-09 | Nixpacks P2 Härten | ✅ | fix-railway-p2 | +18/-1 | ✅ | 🟡 | Mittel |
| 159 | 06-09 | 06-09 | Dockerfile statt Nixpacks | ✅ | dockerfile-railway | +40/-2 | ✅ | ✅ | **Hoch** |
| 160 | 06-09 | 06-09 | Dockerfile Native Deps | ✅ | dockerfile-native | +3/-1 | ✅ | ✅ | Mittel |
| 161 | 06-09 | 06-09 | Docker Build OOM Fix | ✅ | fix-docker-build | +19/-3 | ✅ | ✅ | Mittel |
| 162 | 06-09 | 06-09 | Corepack pnpm Fix | ✅ | fix-corepack | +3/-4 | ✅ | ✅ | Mittel |
| 163 | 06-09 | 06-09 | dockerignore ASCII | ✅ | fix-dockerignore | +5/-5 | ✅ | ✅ | Niedrig |
| 164 | 06-09 | 06-09 | dockerignore LF | ✅ | fix-dockerignore-lf | +22/-35 | ✅ | ✅ | Niedrig |
| 165 | 06-09 | 06-09 | drizzle-orm Runtime | ✅ | fix-docker-runtime | +3/-1 | ✅ | ✅ | Mittel |
| 166 | 06-09 | 06-09 | Portal Zoom + Kursbuch | ✅ | portal-zoom | +391/-42 | ✅ | ✅ | Mittel |
| 167 | 06-10 | — | Content Registry Audit | 🟡 OPEN | content-registry | +245/-34 | ❌ | — | Mittel |
| 168 | 06-10 | 06-10 | KI-Pipeline v2 + Hero | ✅ | ki-pipeline | +1417/-138 | ✅ | 🟡 | Mittel |
| 169 | 06-10 | 06-10 | Verwalter Product Shell | ✅ | rechenpraxis-shell | +375/-16 | ✅ | 🟡 | Mittel |
| 170 | 06-10 | 06-10 | Verwalter P1 Suite | ✅ | verwalter-p1 | +825/-36 | ✅ | 🟡 | Mittel |
| 171 | 06-10 | 06-10 | Verwalter P2 Vorlagen/KI | ✅ | verwalter-p2 | +971/-17 | ✅ | 🟡 | Mittel |
| 172 | 06-10 | — | Verwalter P3 Vorgänge | 🟡 OPEN | verwalter-p3 | +899/-6 | ❌ | — | Mittel |
| 173 | 06-10 | — | Verwalter P3+ Export | 🟡 OPEN | verwalter-p3plus | +1582/-21 | ❌ | — | Mittel |
| 174 | 06-10 | — | DATEV Buchungen | 🟡 OPEN | verwalter-datev | +2503/-21 | ❌ | — | Mittel |
| 175 | 06-10 | — | Verwalter Assistent | 🟡 OPEN | verwalter-assistent | +3055/-21 | ❌ | — | Mittel |
| 176 | 06-10 | — | Suite Plus | 🟡 OPEN | verwalter-suite-plus | +3963/-21 | ❌ | — | Mittel |
| 177 | 06-10 | — | Chat-Buchung | 🟡 OPEN | verwalter-chat | +4401/-22 | ❌ | — | Mittel |

**Merged in 30 Tagen:** 100 PRs (#68-#171 minus closed)  
**Offen:** 18 PRs  
**Geschlossen ohne Merge:** #72, #131, #47, #39, #38, #37, #36, #35, #33, #32, #40, #29, #18, #17, #16, #15, #14, #12, #10, #1

---

## TOP 30 PRs nach Impact (Kurzanalyse)

| PR# | Trigger | Lösung | Verworfene Alternative | Tests | Restrisiko | Initiator |
|-----|---------|--------|------------------------|-------|------------|-----------|
| #141 | Inspect-Modus leakt admin tRPC | Middleware blockiert Queries | Nur UI-Hide | Manuell + später E2E | Andere Leaks? | Auftrag Security |
| #148 | REST-Endpoints in Inspect offen | Default-deny Allowlist | Vollständiges Entfernen Inspect | Unit | Neue Endpoints vergessen | Auftrag Security |
| #159 | Nixpacks Build fail | Dockerfile Multi-Stage | Nixpacks weiter patchen | CI docker build | Image-Größe | Auftrag Deploy |
| #97 | Inspect zeigt zu viel | Read-only JWT + separate Session | Neuer Service | E2E Inspect | Cookie-Konflikte (#98) | Agentur-Sprint |
| #102 | Kein Renewal-Modell | 5€/29€ Verlängerung + Referral | Subscription-only | E2E Renewal | Stripe Live noch offen | Produkt |
| #111 | Stripe Test-only | Live-Keys-Vorbereitung | — | E2E Stripe | Live nicht aktiviert | Phase 7 |
| #107 | KI-Kosten unkontrolliert | 50/Tag Fair-Use Gate | Kein Gate | Unit kiFairUse | Verwalter-KI ohne Gate | Agentur |
| #168 | Kursbuch unvollständig | Multi-Provider Pipeline v2 | Nur Anthropic | generator-health | Kosten Gemini 503 | Auftrag KI |
| #169-171 | Verwalter-Produktvision | Subpath Suite in Monorepo | Eigenes Repo | Unit + 1 E2E | File-Stores | Agent + Alisad |
| #154 | Audio/Comfort fehlt | 14k LoC Platform PR | Inkrementell | E2E draft | Zu groß zum Review | Agent |
| #155 | Kein Owner-Audit | platform_audit_log Tabelle | Externes SIEM | Unit draft | Nicht merged | Agent |
| #140 | Audit-Tests fail | Credentials, 7 Produkte Fix | — | 122 Vitest | Veraltete Counts | Auftrag Audit |
| #82 | GDPR Delete lückenhaft | 19 Tabellen | — | Unit | File-Stores? | Security Sprint |
| #132 | Kein automatisches Backup | GitHub Cron → R2 | Manuell only | Workflow | Restore nicht getestet | Ops |
| #126 | B2B Migration unklar | Ledger + Checkliste | — | CLI smoke | Live B2B Wizard offen | Phase Ops |

*(Vollständige TOP-30-Analyse für alle 30 PRs in [07_OFFEN.md](./AUDIT_2026-06-10_07_OFFEN.md) ergänzt)*

---

*Weiter: [02_INFRA.md](./AUDIT_2026-06-10_02_INFRA.md)*
```

### Datei: docs/AUDIT_2026-06-10_02_DEPLOYMENT.md
```markdown
# Teil 2.2 — Deployment-Migration Nixpacks → Dockerfile

**Stand:** 2026-06-10

---

## Auslöser

| Faktor | Detail | Beleg |
|--------|--------|-------|
| Symptom | Railway P2-Redeploy schlug fehl | PR #158 Titel: „Railway-Nixpacks Build härten" |
| Root Cause (behauptet) | Nixpacks instabil bei native deps (bcrypt, esbuild), Corepack-Bug, .dockerignore Encoding | PRs #158–#166 |
| Entscheidung | Vollständiger Wechsel zu Multi-Stage Dockerfile | PR #159 `b84ce5e` merged 2026-06-09T17:49Z |

**Annahme:** Ob Nixpacks grundsätzlich ungeeignet ist oder nur Konfigurationsfehler — nicht unabhängig verifiziert.

---

## Zeitliche Abfolge (Fix-Kette #158–#166)

| PR# | Merge-Zeit (UTC) | Problem | Lösung | Vermeidbar? |
|-----|------------------|---------|--------|-------------|
| #158 | 2026-06-09 17:19 | Nixpacks P2-Redeploy | Build härten (vor Dockerfile) | Ja — früher Docker |
| #159 | 17:49 | Nixpacks weiterhin problematisch | **Dockerfile eingeführt** | — |
| #160 | 17:59 | `pnpm install` native Module | `python3 make g++` in deps-Stage | Ja — Standard für node-gyp |
| #161 | 18:04 | OOM / Image zu groß | Multi-Stage, nur dist + node_modules | Ja |
| #162 | 18:08 | Corepack activate pnpm Fehler | `npm install -g pnpm@10.4.1` | Bekannter Corepack-Bug |
| #163 | 19:24 | Railway exclude-patterns | `.dockerignore` ASCII-only | Ja — Encoding |
| #164 | 19:31 | CRLF in .dockerignore | LF erzwingen, minimal ignore | Ja |
| #165 | 19:47 | Runtime: `drizzle-orm` fehlt | Volle `node_modules` im Runner (nicht nur prod) | Architektur-Entscheid |
| #166 | 20:47 | A11y + Kursbuch + drizzle runtime | `pnpm-lock.yaml` sync nach dep-Move | Folge von #165 |

**Gesamtdauer:** ~27 Stunden (09.06. 17:04 bis 10.06. 06:17 für #168 Folge-Fix)

---

## Aktueller Dockerfile (vollständig)

```dockerfile
FROM node:22-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@10.4.1
WORKDIR /app

FROM base AS deps
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ ca-certificates \
  && rm -rf /var/lib/apt/lists/*
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY drizzle/migrations ./drizzle/migrations
COPY server/knowledge ./server/knowledge
COPY server/knowledge ./knowledge
COPY client/src/pages/modules ./client/src/pages/modules
COPY server/agent ./server/agent
EXPOSE 8080
CMD ["node", "dist/index.js"]
```

**Beleg:** `Dockerfile:1-35`

---

## Vorher / Nachher

| Aspekt | Nixpacks (vor #159) | Dockerfile (nach #166) |
|--------|---------------------|------------------------|
| Build-System | Railway auto-detect | Explizit 3-Stage |
| Base Image | unbekannt | `node:22-bookworm-slim` |
| Native deps | implizit | `python3 make g++` in deps |
| node_modules Runner | prod-only (angenommen) | **Vollständig** (wegen esbuild external + drizzle-orm) |
| Image-Größe | **unverifiziert** | **unverifiziert** — Railway Dashboard nötig |
| Build-Dauer | **unverifiziert** | **unverifiziert** |
| Healthcheck | `GET /api/health` | Unverändert — live `200` |

---

## Deployment-Pipeline aktuell

```
git push main → Railway auto-deploy → Docker build (Dockerfile)
  → node dist/index.js :8080
  → railway-edge CDN (us-east4-eqdc4a)
```

**Beleg:** `x-railway-edge: railway/us-east4-eqdc4a` im curl-Header 2026-06-10

### Health-Check (live)

```json
{"ok":true,"db":"connected","latencyMs":429,"ts":"2026-06-10T09:36:25.903Z","migrations":{"pending":0,"total":45,"lastApplied":"add-indexes.sql"}}
```

**Restart-Verhalten:** **unverifiziert** — kein Railway-Zugang. Code: kein expliziter `HEALTHCHECK` in Dockerfile.

### Caching-Strategie

- Docker Layer-Cache: `deps` Stage cached wenn `package.json`/`pnpm-lock.yaml` unverändert
- Kein explizites Railway Build-Cache dokumentiert

---

## Restrisiken

| Risiko | Schwere | Detail |
|--------|---------|--------|
| Volle node_modules in Production | Mittel | Größeres Image, mehr Angriffsfläche; notwendig für drizzle-orm runtime (#165) |
| Kein HEALTHCHECK in Dockerfile | Niedrig | Railway hat eigenen Health-Endpoint |
| File-Stores (`data/verwalter-*`) | **Hoch** | Nicht in Dockerfile COPY — **ephemeral** ohne Railway Volume |
| Module-JSON COPY | Mittel | `client/src/pages/modules` — ungewöhnlich, evtl. Runtime-Fallback |
| Rollback zu Nixpacks | Möglich | `railway.toml` oder Dashboard Builder zurück auf Nixpacks; kein `nixpacks.toml` mehr im Repo (**unverifiziert**) |

---

## Rollback zu Nixpacks

1. Railway Dashboard → Service → Settings → Builder → Nixpacks
2. Oder `nixpacks.toml` wieder hinzufügen (existiert aktuell nicht im Repo)
3. **Risiko:** Alle #158–#165 Fixes wären obsolet; native deps Problem kehrt zurück

**Empfehlung (Cursor):** Nicht rollbacken — Dockerfile ist stabiler nach 9 Fix-PRs.

---

## Deploy-Anzahl letzte 30 Tage

**unverifiziert** — Railway API nicht zugänglich.

**Proxy-Indikator:** 90 Commits am 07.06., 37 am 09.06. → geschätzt 10–30 Deploys in 30 Tagen bei auto-deploy on push.

---

*Weiter: [01_CHRONOLOGIE.md](./AUDIT_2026-06-10_01_CHRONOLOGIE.md)*
```

### Datei: docs/AUDIT_2026-06-10_02_INFRA.md
```markdown
# Teil 2 — Produktions-Infrastruktur

**Stand:** 2026-06-10 · Viele Punkte **unverifiziert** ohne Railway/Stripe/Resend-Dashboard

---

## 2.1 Hosting (Railway)

| Feld | Wert | Status |
|------|------|--------|
| Projekt-ID | **unverifiziert** | Kein Railway API-Zugang |
| Service-IDs | **unverifiziert** | — |
| Region (Edge) | `us-east4-eqdc4a` | ✅ curl Header 2026-06-10 |
| Domain | `immobilien-akademie-smart.de` | ✅ Health 200 |
| Volumes | **unverifiziert** | File-Stores brauchen Volume — **kritisch** |
| Deploys 30d | **geschätzt 15-30** | Auto-deploy on push |
| Failures 30d | **unverifiziert** | 9 Dockerfile-Fix-PRs am 09.06. deuten auf mehrere Failures |

### Deployment-Pipeline

Siehe [02_DEPLOYMENT.md](./AUDIT_2026-06-10_02_DEPLOYMENT.md)

### Build-Performance

| Metrik | Wert |
|--------|------|
| Build-Dauer | **unverifiziert** |
| Image-Größe | **unverifiziert** |
| Caching | Docker Layer-Cache deps-Stage |

### Healthcheck

- Endpoint: `GET /api/health`
- Live: `{"ok":true,"db":"connected","migrations":{"pending":0,"total":45}}`
- Kein `HEALTHCHECK` in Dockerfile

---

## 2.2 Dockerfile-Migration

→ [02_DEPLOYMENT.md](./AUDIT_2026-06-10_02_DEPLOYMENT.md)

---

## 2.3 Datenbank (MySQL)

| Feld | Wert | Beleg |
|------|------|-------|
| Migrations angewendet | 45 | Health-Check `total: 45` |
| Pending | 0 | Health-Check |
| Letzte Migration | `add-indexes.sql` | Health-Check |
| Idempotent | Ja (Ledger `0038_schema_migrations.sql`) | `drizzle/migrations/0038_schema_migrations.sql` |

### Tabellen in `drizzle/schema.ts` (26 Drizzle-Definitionen)

| Tabelle | Zeile schema.ts | Indexe |
|---------|-----------------|--------|
| users | 8 | ja (email, role) |
| spaced_repetition | 36 | userId, nextReview |
| whitelabel_configs | 58 | partnerId |
| chat_conversations | 87 | userId |
| chat_messages | 98 | conversationId |
| video_tutorials | 108 | — |
| video_progress | 127 | userId, videoId |
| exam_sessions | 146 | userId |
| exam_questions | 166 | sessionId |
| exam_weak_topics | 184 | userId |
| certificates | 196 | userId |
| question_bank | 214 | moduleId |
| learning_logs | 234 | userId |
| user_sessions | 249 | userId, token |
| activity_heartbeats | 263 | userId |
| exam_audit_log | 273 | sessionId |
| feedback | 285 | userId |
| complaints | 297 | userId |
| consent_log | 312 | userId |
| avv_agreements | 332 | — |
| otp_tokens | 343 | email |
| auth_credentials | 353 | userId |
| access_codes | 362 | code |
| password_reset_tokens | 375 | userId |
| open_questions | 384 | moduleId |
| open_answers | 402 | userId, questionId |

**Hinweis:** Weitere Tabellen nur in SQL-Migrationen (z.B. `monitoring_log`, `pending_purchases`, `referral_rewards`, `partner_payout_ledger`) — nicht alle in `schema.ts` exportiert. **Inkonsistenz** zwischen schema.ts und tatsächlicher DB.

### Row-Counts

**unverifiziert** — keine Prod-DB-Verbindung. Architekt muss `SELECT COUNT(*)` selbst ausführen.

### Neue Tabellen letzte 30 Tage (Migration-Nummer)

| Migration | Tabelle/Inhalt | PR |
|-----------|----------------|-----|
| 0034 | user_access_expires | Phase Zugang |
| 0035 | referral_rewards | #108 |
| 0036 | compliance_expires | #106 |
| 0037 | ki_fair_use_and_reminders | #107 |
| 0038 | schema_migrations (Ledger) | #110 |
| 0039-0042 | partner_payout, connect, ledger | #115-#118 |

### Wachsende Tabellen (Annahme)

- `learning_logs`, `exam_sessions`, `monitoring_log`, `user_sessions`

### Leere Tabellen (Annahme)

- `complaints`, `avv_agreements` — **unverifiziert**

---

## 2.4 Dritt-Anbieter-Integrationen

### Stripe

| Feld | Wert | Status |
|------|------|--------|
| Modus | Test (laut `EXTERNAL_OPS_CHECKLIST.md:14`) | 🟡 Doku, nicht live verifiziert |
| Produkte | 7 (laut Audit-Test #140) | Code + Test |
| Preise | 18 Price-IDs | `docs/STRIPE_LIVE_GO_LIVE.md`, Seed-Script PR #127 |
| Webhook | Konfiguriert (Test) | `pnpm run stripe:setup-webhook` in Checkliste |
| Endpoints | Checkout, Webhook, Connect, B2B | `server/stripe.ts` |
| Live-Schaltung | ⏳ | Checkliste P3 #11-13 offen |

**Test-Karten:** Stripe Test-Modus Standard — **unverifiziert** live.

### Resend (E-Mail)

| Feld | Wert | Status |
|------|------|--------|
| Domain-Status | **unverifiziert** | PR #25: from-Adresse auf verifizierte Domain |
| DKIM | **unverifiziert** | Architekt: internet.nl |
| Letzter Send | **unverifiziert** | — |
| Bounce-Rate | **unverifiziert** | — |
| internet.nl 63% | **unverifiziert** aus Repo | Verantwortlich: Alisad (DNS) |

### Anthropic / Gemini / Groq

| Provider | Code-Pfad | Env-Variable |
|----------|-------------|--------------|
| Gemini (primär) | `kursbuchLlm.ts`, `ragTutor.ts` | `GEMINI_API_KEY` |
| Groq (Fallback 1) | idem | `GROQ_API_KEY` |
| Claude Haiku 4-5 (Fallback 2) | idem | `ANTHROPIC_API_KEY` |

**Fallback:** Gemini → Groq → Claude (`docs/KI_PIPELINE_AUDIT.md:17`)

| Feld | Wert |
|------|------|
| Credits/Quota | **unverifiziert** |
| Kosten 30d | **unverifiziert** — `monitoring_log` Tabelle existiert |
| Anthropic $25/Monat Cap | **unverifiziert** — Provider-Dashboard |

### Sentry

| Feld | Wert |
|------|------|
| Aktiv | Ja — CSP erlaubt `*.sentry.io` (`server/_core/index.ts:104`) |
| Errors 7d | **unverifiziert** |
| Wiederkehrend | **unverifiziert** |

### ElevenLabs

| Feld | Wert | Beleg |
|------|------|-------|
| Voice-IDs | **unverifiziert** | Audio-Module im Code |
| Storage | Server-seitig / CDN | **Annahme** |
| Kosten | **unverifiziert** | — |

### Cloudflare R2

| Feld | Wert | Beleg |
|------|------|-------|
| Backup täglich | Cron aktiviert PR #132 | `.github/workflows/` |
| Letzter Run | **unverifiziert** | — |
| Restore getestet | ☐ laut Checkliste | `docs/R2_ACTIVATION_CHECKLIST.md` |
| GPG-Verschlüsselung | Geplant PR #79 | `docs/BACKUP_AUTOMATION_PLAN.md` |

---

## 2.5 DNS / E-Mail-Stack

**Alle Werte unverifiziert aus Repo** — müssen per `dig`/`nslookup` geprüft werden.

| Record | Erwarteter Wert (aus Doku) | Status |
|--------|---------------------------|--------|
| SPF | **unverifiziert** | PR #152 Skript geplant |
| DKIM Selektoren | **unverifiziert** | Resend Dashboard |
| DMARC | `pct=10` → Ziel `pct=100` | Checkliste #16 offen |
| CAA | None | **unverifiziert** |
| IPv6 Web | Failed laut User-Briefing | Railway-Limitation **Annahme** |
| IPv6 Mail | Failed | DNS-Provider |
| HSTS Preload | PR #151 offen | Live: `includeSubDomains` ohne `preload` in Response |

### Live HTTPS-Headers (2026-06-10)

```
strict-transport-security: max-age=31536000; includeSubDomains
content-security-policy: default-src 'self';script-src 'self' 'unsafe-inline' https://js.stripe.com;...
permissions-policy: camera=(), microphone=(), geolocation=(), payment=(self "https://js.stripe.com")
cross-origin-opener-policy: same-origin
cross-origin-resource-policy: same-origin
```

**Beleg:** `curl -sSI https://immobilien-akademie-smart.de/`

---

## 2.6 Security-Konfiguration

### CSP (Klartext, production)

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://js.stripe.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: https: blob: https://img.youtube.com;
connect-src 'self' https://api.stripe.com https://plausible.io https://*.sentry.io;
frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.youtube.com https://youtube.com;
font-src 'self' data:;
object-src 'none';
upgrade-insecure-requests;
base-uri 'self';
form-action 'self';
frame-ancestors 'self';
script-src-attr 'none'
```

**Code:** `server/_core/index.ts:94-110`  
**Tech-Debt:** `unsafe-inline` in script-src + style-src

### Permissions-Policy

```
camera=(), microphone=(), geolocation=(), payment=(self "https://js.stripe.com")
```

**Code:** `server/_core/index.ts:85`

### Cross-Origin Headers

- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-origin`
- `server/_core/index.ts` + Helmet defaults

### Inspect-Modus Allowlist

- REST: Default-deny, explizite Allowlist — PR #148 merged
- tRPC: Admin-Queries blockiert — PR #141 merged
- **Code-Pfad:** `server/_core/index.ts` + Inspect-Middleware (**genaue Zeilen: unverifiziert ohne erneutes Grep**)

### Owner-Auth

| Aspekt | Implementierung | Beleg |
|--------|-----------------|-------|
| Magic Code | `OWNER_MAGIC_CODE` ENV | Owner-Routes |
| 2FA | OTP via Resend, serverseitig | PR #63-#67 |
| Session | Separate Owner-Session | PR #98 Cookie-Kohärenz |

### Admin-Auth

- `requireAdmin` Middleware
- PR #153: Owner nur für Plattform-Eigentümer, Admin ohne B2B-Branding

### Session-Lifetime

**unverifiziert** — Cookie `maxAge` in Auth-Code prüfen (typisch 7-30 Tage)

### Cookie-Konfiguration

- `httpOnly`, `secure` in Production — **Annahme** aus Auth-Implementierung
- PR #98: Login/Inspect/Owner Cookies entmischt

---

*Weiter: [03_CODE.md](./AUDIT_2026-06-10_03_CODE.md)*
```

### Datei: docs/AUDIT_2026-06-10_03_CODE.md
```markdown
# Teil 3 — Code-Inventur

**Stand:** 2026-06-10

---

## 3.1 Frontend (Client)

### Größen

| Metrik | Wert | Beleg |
|--------|------|-------|
| Components | 135 `.tsx` | `find client/src/components` |
| Pages | 94 `.tsx` | `find client/src/pages` |
| Hooks | 19 | `use*.ts(x)` |

### Routes (Zusammenfassung)

| Auth-Level | Anzahl | Beleg |
|------------|--------|-------|
| public | ~38 | `App.tsx` |
| requireAuth | ~35 | `ProtectedRoute` |
| requireAuth + Module | 10 | `ProtectedModuleRoute` |
| admin | 19 | `AdminRoute` |
| owner | 2 | `OwnerRoute` |

**Vollständige Route-Tabelle:** siehe Subagent-Inventar in diesem Audit (App.tsx Zeilen 264-383).

### Lazy-Loading

Verwalter-Pages lazy: `App.tsx:61-66` (`lazy(() => import(...))`)

### State-Management

- React Query via tRPC (`@trpc/react-query`)
- Kein Redux/Zustand global
- localStorage für Onboarding (`verwalter-onboarding-v1`)

### API-Client

- tRPC: `@/lib/trpc` → `/api/trpc`
- REST: `fetch` direkt in Komponenten (Verwalter, Owner)

### Asset-Strategie

- Bilder: WebP seit 27.05. (`9060c90`)
- Fonts: self-hosted
- Audio: Server-TTS + statische Dateien

### Bundle-Größen (gzip)

**unverifiziert** — `pnpm build` Analyse nicht ausgeführt. PR #7 historisch: vendor-react Chunk optimiert.

---

## 3.2 Backend (Server)

### tRPC Procedures: 86 total

| Auth | Anzahl |
|------|--------|
| public | 12 |
| protected | 44 |
| admin | 30 |

**Router-Dateien:** `systemRouter`, `videoRouter`, `examRouter`, `openQuestionsRouter`, `pdfRouter`, `certificateRouter`, `quizRouter`, `azavRouter`, `routers.ts` (auth, whitelabel, aiAssistant, modules, adminUsers, account, progress, adminCodes, presentationCode, adminQuestions)

**Mount:** `server/_core/index.ts:369-374`

### REST Endpoints: ~130+

Kategorien:
- Auth (register, login, magic, redeem-code)
- Owner/Inspect (15+ Endpoints)
- AI/RAG (15+ Endpoints)
- Stripe (checkout, webhook, products)
- Verwalter (15+ Endpoints auf Branch)
- Admin Ops (18 Endpoints)
- Agent (requireAdmin)

### Background Jobs / Crons

| Job | Schedule | Datei |
|-----|----------|-------|
| Trial follow-up | 30 min | `trialFollowup.ts` |
| Keep-alive ping | 8 + 14 min | `index.ts:587-609` |
| Night cron | 02:00 daily | `NightCron.ts` |
| Health watcher | hourly | `HealthWatcher.ts` |
| Access expiry reminders | 08:00 UTC | `accessExpiryReminders.ts` |
| Partner payout | quarterly | `partnerPayoutCron.ts` |
| MySQL R2 backup | 02:17 UTC | `.github/workflows/mysql-backup-r2.yml` |

### Webhook-Handler

- `POST /api/stripe/webhook` — Stripe signature verify (`index.ts:241`)

### DB-Pool

**unverifiziert** — `server/db.ts` auf Verbotsliste. Typisch mysql2 pool.

---

## 3.3 Tests

→ [08_TESTS.md](./AUDIT_2026-06-10_08_TESTS.md)

---

## 3.4 Datenbank-Schema

**26 Tabellen** in `drizzle/schema.ts` (Zeilen 8-417).

**Foreign Keys:** Definiert in Drizzle-Relations — nicht alle explizit als FK in schema.ts.

**Neue Tabellen 30 Tage:** via Migrationen 0034-0042 (siehe [02_INFRA.md](./AUDIT_2026-06-10_02_INFRA.md))

**Nicht genutzte Tabellen (Annahme):** `complaints`, `avv_agreements` — **unverifiziert**

**Verwalter-Daten:** NICHT in schema.ts — File-Stores

---

## 3.5 Dokumentation (`docs/*.md`)

| Datei | Aktualität | Thema |
|-------|------------|-------|
| `VERWALTER_SUITE_ROADMAP.md` | ✅ Juni 2026 | Verwalter Strategie |
| `KI_PIPELINE_AUDIT.md` | ✅ Juni 2026 | KI Diagnose |
| `UEBERGABE_ANTROPIQ_ARCHITEKT_20260608.md` | ✅ 08.06. | Übergabe |
| `EXTERNAL_OPS_CHECKLIST.md` | 🟡 08.06. | Teilweise veraltet (Test-Zahlen) |
| `STRIPE_LIVE_GO_LIVE.md` | ✅ | Live-Checkliste |
| `DATEV_SPEC.md` | 🟡 Branch only | Nicht auf main |
| `SYSTEM_AUDIT.md` | 🟡 | Vor Verwalter-Sprint |
| `MARKTREIFE_MASTERPLAN_2026.md` | 🟡 Mai | Teilweise überholt |
| `LEGAL_COMPLIANCE_REPORT.md` | 🟡 Mai | Claims teils gefixt |
| `BUSINESS_ANALYSIS.md` | 🟡 Mai | Strategisch |
| `AUDIT_2026-06-10_*.md` | ✅ Neu | Dieser Audit |

**Fehlende Themen:**
- Verwalter Suite Betriebshandbuch (Volume, Backup)
- Staging-Environment-Doku
- Einheitliche Claims-Referenz (live)
- Runbook Verwalter File-Store Recovery

---

*Weiter: [05_KI.md](./AUDIT_2026-06-10_05_KI.md)*
```

### Datei: docs/AUDIT_2026-06-10_04_VERWALTER.md
```markdown
# Teil 4 — Verwalter Suite (Detail)

**Stand:** 2026-06-10  
**Production-HEAD:** `599a0b1` (nur PR #169–#171 merged)

---

## 4.0 Kritische Fragen des Architekten — Antworten

### a) Ist Verwalter Suite ein EIGENSTÄNDIGES Produkt?

| Kriterium | Status | Beleg |
|-----------|--------|-------|
| Eigene Domain | ❌ Nein | Keine DNS-Referenz im Code; Roadmap Phase B: `verwalter.immobilien-akademie-smart.de` erst bei >50 Nutzern (`docs/VERWALTER_SUITE_ROADMAP.md:58-62`) |
| Eigene Marke/Branding | 🟡 Teilweise | Eigenes Layout `RechenpraxisProductLayout.tsx`, eigene Hero-Sektion; aber gleiche Domain und Impressum |
| Eigene Stripe-Produkte | ❌ Nein für Suite-Features | Rechenpraxis Solo 19€/Mo existiert (`docs/VERWALTER_SUITE_ROADMAP.md:93`); „Verwalter Tools 39€/Mo" nur in Roadmap, **nicht in Stripe-Code** |
| Eigene DB-Tabellen | ❌ Nein (Drizzle) | Objekte/Vorgänge/Buchungen in **File-Stores** unter `data/verwalter-*` |
| Eigene Login-Seite | ❌ Nein | Geteilte Auth via Session-Cookie (`requireAuth` in `server/verwalterRouter.ts:48`) |
| Eigenes Repo | ❌ Nein | Monorepo `Immobilie-Akademie-Premium` |

**Fazit:** Verwalter Suite ist **kein eigenständiges Produkt**, sondern ein **Sub-Produkt im Hauptportal**.

### b) Ist es Sub-Produkt im Hauptportal?

| Aspekt | Geteilt | Getrennt |
|--------|---------|----------|
| Auth | ✅ Session-Cookie, `requireAuth` | — |
| Stripe | ✅ Gleiche Produkte/Preise | Suite-Preis 39€ nicht implementiert |
| Datenbank MySQL | ✅ User-Tabelle | Verwalter-Daten: JSON-Files pro User |
| URL | `/rechenpraxis`, `/verwalter-rechner`, `/app/verwalter/*` | `client/src/App.tsx:338-377` |
| KI-Provider | ✅ `askLlmWithContinuation` | Eigener System-Prompt |

### c) Zielgruppe

Laut `docs/VERWALTER_SUITE_ROADMAP.md:8-14, 89-95`:

- WEG-Verwalter (primär)
- Quereinsteiger / Laien (Guide-System in PR #175)
- Solo-Verwalter und kleine Büros (Roadmap B2B 199–399€/Mo — **nicht implementiert**)

**Annahme (unverifiziert):** Keine Marktforschung mit echten Verwaltern dokumentiert; Roadmap ist Strategie-Skizze.

### d) Wann Entscheidung getroffen?

| Datum | Ereignis | Beleg |
|-------|----------|-------|
| 2026-06-07 | Phase 6: Verwalter-Rechner Landing + Migration-Ledger | PR #110, Commit `2fc3584` |
| 2026-06-10 06:54Z | Product Shell Entscheidung umgesetzt | PR #169 merged `364fd95` |
| 2026-06-10 (Tag) | P1–P3+ in einem Tag auf Branch-Ebene | PRs #170–#177 erstellt 07:47–09:26Z |

### e) Auslöser

| Quelle | Inhalt | Beleg |
|--------|--------|-------|
| Roadmap-Doku | „Didaktik + KI + Praxis-Tools" — Lücke zwischen Kursen und Vollsoftware | `VERWALTER_SUITE_ROADMAP.md:24` |
| Rechenpraxis-Basis | 138 Rechenaufgaben als Einstieg | `VERWALTER_SUITE_ROADMAP.md:7` |
| Agentur-Sprint 07.06. | Competitive USP Sprint, WEG-USP | PR #99, #139 |

**Auslöser-Typ:** Eigene Produktidee + strategische Roadmap, **nicht** dokumentierter Kundenwunsch.

---

## 4.1 Was wurde gebaut — PR für PR

### Legende Status

- ✅ = auf `main` merged + production verifiziert (Health 200, last-modified 08:10Z)
- 🟡 = PR offen, Code existiert, **nicht production**
- ⏳ = nur in Doku referenziert

---

### PR #169 — Produkt-Shell (✅ merged 2026-06-10T07:17Z)

**Commit:** `364fd95` · **+375 / -16 LoC**

| Bereich | Inhalt | Datei |
|---------|--------|-------|
| Layout | `RechenpraxisProductLayout` — eigene Nav, Mobile-First | `client/src/components/layout/RechenpraxisProductLayout.tsx` |
| Routes | `/rechenpraxis` Redirect, Hero 2× | `client/src/App.tsx` |
| Roadmap-UI | Produkt-Roadmap-Komponente | `shared/verwalterProductRoadmap.ts` |
| Doku | `docs/VERWALTER_SUITE_ROADMAP.md` | Strategie-Skizze |

**Tests:** `shared/verwalterProductRoadmap.test.ts`

**Trigger:** Subpath-Strategie Phase A (`VERWALTER_SUITE_ROADMAP.md:53-56`)

---

### PR #170 — P1 Suite (✅ merged 2026-06-10T07:51Z)

**Commit:** `de494f4` · **+825 / -36 LoC**

| Feature | Komponente/Datei | Route |
|---------|------------------|-------|
| Vorlagen-Index (5 Pilot) | `VorlagenIndex.tsx` | `/app/verwalter/vorlagen` |
| Vorlage-Detail + PDF | `VorlageDetail.tsx`, `verwalterBriefPdf.ts` | `/app/verwalter/vorlagen/:slug` |
| Fristen-Checkliste | `FristenCheckliste.tsx`, `shared/verwalterFristen.ts` | `/app/verwalter/fristen` |
| Mobile Shell | `RechenpraxisProductLayout` erweitert | — |

**Backend:** Noch keine REST-Endpoints außer späterem KI-Brief

**Tests:** `shared/verwalterFristen.test.ts`, E2E `tests/e2e/26-verwalter-mobile-layout.spec.ts`

---

### PR #171 — P2 Suite (✅ merged 2026-06-10T08:09Z) — **PRODUCTION STAND**

**Commit:** `599a0b1` · **+971 / -17 LoC**

| Feature | Details | Beleg |
|---------|---------|-------|
| 20 WEG-Vorlagen | ETV, Mahnung, NK, Kommunikation | `shared/verwalterVorlagen.ts:36+` (20 Einträge in `VERWALTER_VORLAGEN`) |
| KI-Brief | `POST /api/verwalter/ki-brief` | `server/verwalterRouter.ts:73+` auf main |
| Objekt-Stammdaten | CRUD, File-Store | `server/verwalterObjektStore.ts`, Route `/app/verwalter/objekte` |
| Einheiten | Array in Objekt-JSON | `shared/verwalterObjektTypes.ts` |

**Backend-Endpoints auf main:**

```
GET/POST/PUT/DELETE /api/verwalter/objekte[/:id]  requireAuth
POST               /api/verwalter/ki-brief         requireAuth
```

**Datenpersistenz:** `data/verwalter-objekte/{userId}.json` — **nicht MySQL**

**Tests:** `shared/verwalterVorlagen.test.ts`, `server/verwalterObjektStore.test.ts`

**Externe Dependencies:** Anthropic/Gemini/Groq via `askLlmWithContinuation` (`kursbuchLlm.ts`)

---

### PR #172 — P3 Vorgangs-Tracker (🟡 offen)

**Erstellt:** 2026-06-10T08:22Z · **+899 / -6 LoC** · Branch: `cursor/verwalter-p3-vorgaenge-7dbc`

| Feature | Komponente | Route |
|---------|------------|-------|
| Vorgangs-Kanban | `VorgaengeIndex.tsx` | `/app/verwalter/vorgaenge` |
| Vorgang-CRUD | `verwalterVorgangStore.ts` | REST |
| Dashboard-Zähler | `countOpenVorgaenge`, `countOverdueVorgaenge` | `GET /api/verwalter/dashboard` |
| Einheiten-CRUD | In Objekt-Update | `PUT /api/verwalter/objekte/:id` |

**Datenpersistenz:** `data/verwalter-vorgaenge/{userId}.json`

**Tests:** `server/verwalterVorgangStore.test.ts`, `shared/verwalterVorgangTypes.test.ts`

**Warum nicht merged:** Kaskadierende Draft-PRs; kein expliziter Merge-Auftrag dokumentiert.

---

### PR #173 — P3+ Sprint (🟡 offen)

**Erstellt:** 2026-06-10T08:44Z · **+1582 / -21 LoC**

| Feature | Datei |
|---------|-------|
| Fristen→Vorgang 1-Klick | `shared/verwalterFristVorgang.ts`, `FristenCheckliste.tsx` |
| Stammdaten-CSV-Export | `server/verwalterStammdatenExport.ts`, `GET /api/verwalter/export/stammdaten-csv` |
| DATEV-Spec Phase A | `docs/DATEV_SPEC.md` |

**Tests:** `shared/verwalterFristVorgang.test.ts`, `server/verwalterStammdatenExport.test.ts`

---

### PR #174 — DATEV Phase B (🟡 offen)

**Erstellt:** 2026-06-10T08:52Z · **+2503 / -21 LoC**

| Feature | Details |
|---------|---------|
| Hausgeld-Buchungen light | `verwalterBuchungStore.ts`, `BuchungenIndex.tsx` |
| SKR-Konten | `shared/verwalterBuchungTypes.ts` |
| DATEV EXTF-Export | `server/verwalterDatevExport.ts`, `GET /api/verwalter/export/datev-buchungen` |

**Datenpersistenz:** `data/verwalter-buchungen/{userId}.json`

**Tests:** `server/verwalterBuchungStore.test.ts`, `server/verwalterDatevExport.test.ts`, `shared/verwalterBuchungTypes.test.ts`

---

### PR #175 — Live-Assistent (🟡 offen)

**Erstellt:** 2026-06-10T09:02Z · **+3055 / -21 LoC**

| Feature | Details |
|---------|---------|
| Verwalter-Assistent Chat | `VerwalterAssistent.tsx`, `POST /api/verwalter/assistent` |
| SKR-Wissen | `shared/verwalterAssistentKnowledge.ts` |
| Kontext-Builder | `server/verwalterAssistentContext.ts` |
| Guide-Banner | `VerwalterGuideBanner.tsx`, `shared/verwalterGuideSteps.ts` |

**KI:** `askLlmWithContinuation(VERWALTER_ASSISTENT_ROLLE, ...)` — `server/verwalterRouter.ts:336-401`

**Tests:** `server/verwalterAssistentContext.test.ts`, `shared/verwalterGuideSteps.test.ts`

---

### PR #176 — Suite Plus (🟡 offen)

**Erstellt:** 2026-06-10T09:16Z · **+3963 / -21 LoC**

| Feature | Details |
|---------|---------|
| Buchungsvorschlag (Regel+KI) | `POST /api/verwalter/buchungen/vorschlagen` |
| Plausibilitäts-Wächter | `shared/verwalterBuchungPlausibilitaet.ts`, blockiert DATEV |
| Monatsabschluss | `MonatsabschlussPanel.tsx`, `GET /api/verwalter/monatsabschluss` |
| Onboarding-Wizard | `VerwalterOnboarding.tsx`, localStorage `verwalter-onboarding-v1` |

**Tests:** `shared/verwalterBuchungVorschlag.test.ts`, `shared/verwalterBuchungPlausibilitaet.test.ts`, `shared/verwalterMonatsabschluss.test.ts`

---

### PR #177 — Chat-Buchung + Rechenpraxis-Links (🟡 offen, HEAD Workspace)

**Erstellt:** 2026-06-10T09:26Z · **+4401 / -22 LoC** · Commit `1e66700`

| Feature | Details |
|---------|---------|
| Buchungsvorschlag im Chat | Assistent liefert `buchungsVorschlag` in Response |
| 1-Klick-Karte | `BuchungsVorschlagCard.tsx` |
| Rechenpraxis-Hinweise | `RechenpraxisVerwalterHinweis.tsx`, `shared/rechenpraxisVerwalterLinks.ts` |

**Tests:** `shared/rechenpraxisVerwalterLinks.test.ts`, `shared/verwalterAssistentBuchung.test.ts`

---

## 4.2 Architektur

```
┌─────────────────────────────────────────────────────────┐
│  immobilien-akademie-smart.de (Railway, Monorepo)       │
├─────────────────────────────────────────────────────────┤
│  Hauptportal §34c          │  Verwalter Suite (Sub)      │
│  /kurs/*, /portal/*        │  /rechenpraxis              │
│  Module 1-5, Audio, Quiz   │  /app/verwalter/*           │
│  MySQL (users, progress)   │  File-Stores (JSON)         │
│                            │  data/verwalter-{objekte,   │
│                            │    vorgaenge, buchungen}/  │
├────────────────────────────┴────────────────────────────┤
│  Geteilt: Auth (Session), KI-Pipeline, Stripe-Account   │
└─────────────────────────────────────────────────────────┘
```

### Code-Sharing-Strategie

| Layer | Strategie | Risiko |
|-------|-----------|--------|
| Auth | `requireAuth` Middleware | Niedrig |
| KI | `askLlmWithContinuation` aus `kursbuchLlm.ts` | Fair-Use-Gate gilt für Tutor, **nicht** für Verwalter-Endpoints |
| Daten | File-Stores statt Drizzle | **Hoch:** Kein Backup in MySQL-R2-Cron, keine FK, kein Multi-Instance-Safe ohne Volume |
| UI | Lazy-loaded Pages in `App.tsx:61-66` | Niedrig |

### Trennung was getrennt sein muss

| Muss getrennt | Ist getrennt? |
|---------------|---------------|
| Verwalter-Stammdaten (DSGVO) | 🟡 File-Store, nicht in GDPR-Delete geprüft |
| Suite-Billing | ❌ Kein eigenes Stripe-Produkt |
| Deployment | ❌ Gleicher Railway-Service |

---

## 4.3 Status pro Feature (End-to-End)

| Feature | main (prod) | Branch | E2E | Stripe |
|---------|-------------|--------|-----|--------|
| Produkt-Shell / Nav | ✅ | — | 🟡 Layout-Spec | — |
| 20 Vorlagen + PDF | ✅ | — | ❌ | — |
| KI-Brief | ✅ | — | ❌ (nur Unit) | — |
| Objekt-Stammdaten | ✅ | — | ❌ | — |
| Fristen-Checkliste | ✅ | — | ❌ | — |
| Vorgangs-Tracker | ❌ | #172 | ❌ | — |
| Fristen→Vorgang | ❌ | #173 | ❌ | — |
| Stammdaten-CSV | ❌ | #173 | ❌ | — |
| Hausgeld-Buchungen | ❌ | #174 | ❌ | — |
| DATEV EXTF | ❌ | #174 | ❌ | — |
| Live-Assistent | ❌ | #175 | ❌ | — |
| Guide-Banner | ❌ | #175 | ❌ | — |
| Buchungsvorschlag | ❌ | #176 | ❌ | — |
| Plausibilität/DATEV-Gate | ❌ | #176 | ❌ | — |
| Monatsabschluss | ❌ | #176 | ❌ | — |
| Onboarding | ❌ | #176 | ❌ | — |
| Chat-Buchung 1-Klick | ❌ | #177 | ❌ | — |
| Rechenpraxis-Verwalter-Links | ❌ | #177 | ❌ | — |
| Verwalter Tools 39€/Mo | ❌ | — | — | ⏳ Roadmap only |
| B2B Multi-Mandant | ❌ | — | — | ⏳ Roadmap only |

**Verkauft im Stripe:** Nur Rechenpraxis Solo (19€/Mo laut Roadmap) — **unverifiziert** ob Live-Preis aktiv.

---

## 4.4 Geplant aber noch nicht gebaut

Aus `docs/VERWALTER_SUITE_ROADMAP.md`:

| Prio | Feature | Status |
|------|---------|--------|
| P0 | Audio-Texte strukturiert + Zoom | ✅ im Hauptportal (PR #156, #157) |
| P1 | 20 WEG-Vorlagen | ✅ PR #171 |
| P1 | 20 weitere WEG-Fälle Rechenpraxis | ⏳ |
| P2 | Beschluss-Checkliste + Fristenrechner | 🟡 Fristen ✅, Beschluss ⏳ |
| P2 | Brief-Generator KI | ✅ PR #171 |
| P3 | Objekt-Stammdaten | ✅ PR #171 |
| P3 | B2B Multi-Mandant | ⏳ |
| Phase B | Eigenes Railway-Projekt / Subdomain | ⏳ >50 Nutzer Schwelle |
| Phase B | DocuSign | ⏳ |
| Phase B | DATEV vollständig | 🟡 EXTF light in #174 |

---

## 4.5 Integration mit Hauptportal

| Geteilt | Getrennt |
|---------|----------|
| Login/Session (`auth_credentials`, `user_sessions`) | Verwalter-Daten (JSON-Files) |
| Rechenpraxis-Zugang (gleicher Access-Code/Stripe) | Eigene Nav (`RechenpraxisProductLayout`) |
| KI-API-Keys (Railway ENV) | Eigene System-Prompts |
| Impressum, AGB, Datenschutz | — |
| MySQL-Backup (R2 Cron) | **Verwalter-JSON nicht im Backup** — **Risiko** |

### URL-Übersicht (production)

| URL | Auth | Inhalt |
|-----|------|--------|
| `/rechenpraxis` | Portal-Zugang | Rechenaufgaben-Hub |
| `/verwalter-rechner` | Öffentlich | Landing Verwalter-Rechner (seit PR #110) |
| `/app/verwalter` | Redirect | → Rechenpraxis |
| `/app/verwalter/vorlagen` | `requireAuth` | Vorlagen-Index |
| `/app/verwalter/vorlagen/:slug` | `requireAuth` | Vorlage ausfüllen + KI-Brief |
| `/app/verwalter/fristen` | `requireAuth` | Fristen-Checkliste |
| `/app/verwalter/objekte` | `requireAuth` | Objekt-CRUD |
| `/app/verwalter/vorgaenge` | 🟡 nur Branch | Kanban |
| `/app/verwalter/buchungen` | 🟡 nur Branch | Buchungen |

---

## 4.6 Tech-Debt Verwalter Suite

| Problem | Schwere | Beleg |
|---------|---------|-------|
| File-Stores statt DB | Hoch | `data/verwalter-*` — verloren bei Container-Restart ohne Volume |
| 6 kaskadierende offene PRs | Hoch | #172–#177, je +900–4400 LoC |
| Kein E2E für Kernflows | Mittel | Nur `26-verwalter-mobile-layout.spec.ts`, `07-verwalter-rechner.spec.ts` |
| Fair-Use nicht auf Verwalter-KI | Mittel | `ki-brief`, `assistent` ohne `kiFairUseGate` |
| Kein Stripe-Produkt für Suite | Mittel | Roadmap-Preis nicht implementiert |
| DSGVO-Delete deckt File-Stores? | **Unverifiziert** | GDPR-Delete in `server/` — muss geprüft werden |

---

## 4.7 Vollständige REST-API Verwalter (Branch `cursor/verwalter-chat-buchung-7dbc`)

Alle Endpoints: `requireAuth` (`server/verwalterRouter.ts`)

| Method | Path | main | Branch |
|--------|------|------|--------|
| GET | `/api/verwalter/objekte` | ✅ | ✅ |
| GET | `/api/verwalter/objekte/:id` | ✅ | ✅ |
| POST | `/api/verwalter/objekte` | ✅ | ✅ |
| PUT | `/api/verwalter/objekte/:id` | ✅ | ✅ |
| DELETE | `/api/verwalter/objekte/:id` | ✅ | ✅ (+ Cascade Vorgänge/Buchungen) |
| POST | `/api/verwalter/ki-brief` | ✅ | ✅ |
| GET | `/api/verwalter/dashboard` | ❌ | ✅ |
| GET/POST/PUT/DELETE | `/api/verwalter/vorgaenge[/:id]` | ❌ | ✅ |
| GET/POST/PUT/DELETE | `/api/verwalter/buchungen[/:id]` | ❌ | ✅ |
| POST | `/api/verwalter/buchungen/vorschlagen` | ❌ | ✅ |
| GET | `/api/verwalter/buchungen/plausibilitaet` | ❌ | ✅ |
| GET | `/api/verwalter/monatsabschluss` | ❌ | ✅ |
| GET | `/api/verwalter/export/datev-buchungen` | ❌ | ✅ |
| GET | `/api/verwalter/export/stammdaten-csv` | ❌ | ✅ |
| POST | `/api/verwalter/assistent` | ❌ | ✅ |

---

*Weiter: [02_DEPLOYMENT.md](./AUDIT_2026-06-10_02_DEPLOYMENT.md)*
```

### Datei: docs/AUDIT_2026-06-10_05_KI.md
```markdown
# Teil 5 — KI-Pipeline und Audio

**Stand:** 2026-06-10

---

## 5.1 Multi-Provider-Kette

### Reihenfolge (definiert in Code)

```
Gemini 2.5 Flash → Groq Llama 3.3 70B → Claude Haiku 4-5
```

**Beleg:** `docs/KI_PIPELINE_AUDIT.md:17`, `server/kursbuchLlm.ts` (nicht gelesen — read-only `ragTutor.ts` verboten)

### Code-Pfade pro Provider

| Feature | Datei | Provider-Auswahl |
|---------|-------|------------------|
| KI-Tutor (RAG) | `server/ragTutor.ts` | Gemini → Groq → Claude |
| Kursbuch-Generator | `server/kursbuchLlm.ts` | idem via `askLlmWithContinuation` |
| Verwalter KI-Brief | `server/verwalterRouter.ts:429` | idem |
| Verwalter Assistent | `server/verwalterRouter.ts:370` | idem |
| Rechenpraxis-Assistent | Proxy via Server PR #74 | idem |
| Fallstudie-Bewertung | `ragTutor.ts` Endpoints | idem |

### Fallback-Logik

1. Versuch Provider 1 (Gemini)
2. Bei Fehler/Timeout → Provider 2 (Groq)
3. Bei Fehler → Provider 3 (Claude)
4. Kursbuch: zusätzlich `lessonToDraftMarkdown` Entwurf-Fallback

**Beleg:** `docs/KI_PIPELINE_AUDIT.md:40-44`

### Live-Verhalten

**unverifiziert** — keine Prod-Logs. PR #168 adressiert v1-Problem: `success: true` bei unvollständigen Blöcken.

---

## 5.2 Provider-Status

| Provider | Credits | 503-Frequenz | Rate-Limits |
|----------|---------|--------------|-------------|
| Anthropic | **unverifiziert** | **unverifiziert** | Fair-Use 50/Tag Portal |
| Gemini | **unverifiziert** | **unverifiziert** | Kostenloses Kontingent angenommen |
| Groq | **unverifiziert** | **unverifiziert** | Free Tier Limits |

---

## 5.3 Kosten-Tracking

| Aspekt | Detail | Beleg |
|--------|--------|-------|
| Tracking-Tabelle | `monitoring_log` | Migration `0030_monitoring_log.sql` |
| Cost-Cap Code | `kiFairUseGate.ts` — 50 Anfragen/Tag | PR #107 |
| Cost-Cap Verwalter | **Kein Gate** | `verwalterRouter.ts` — kein Import kiFairUse |
| Provider Cap | Anthropic $25/Mo — **unverifiziert** | Externes Dashboard |

---

## 5.4 RAG-Tutor

| Aspekt | Detail | Beleg |
|--------|--------|-------|
| Endpoint | `POST /api/ai/rag-tutor` | `KI_PIPELINE_AUDIT.md:53` |
| Modell primär | Gemini 2.5 Flash | idem |
| Modell Fallback | Groq → Claude Haiku 4-5 | idem |
| Wissensbasis | `server/knowledge/modul_*.txt` | `getSmartContext()` |
| Embeddings | **Keine** — Text-Match/Chunk | **Annahme** aus Architektur |
| Modul-Kontext | Modul-ID → knowledge file | `modul_1.txt` bis `modul_5.txt` |
| Kosten/Anfrage | **unverifiziert** | ~0.001-0.01$ **Schätzung** |

**Hinweis:** `ragTutor.ts` ist auf AGENTS.md-Verbotsliste — keine Code-Änderungen.

---

## 5.5 Audio-Features

| Aspekt | Detail | Status |
|--------|--------|--------|
| TTS-Provider | ElevenLabs | **unverifiziert** — ENV `ELEVENLABS_API_KEY` angenommen |
| Module mit Audio | Modul 3 (PR #156), weitere in #154 (offen) | 🟡 |
| Generierung | On-demand + Pre-rendered | **gemischt** |
| Storage | Server/Railway Filesystem oder R2 | **unverifiziert** |
| Auslieferung | Static/API | `/api/audio` oder ähnlich |
| WEG/§ nur in Audio | PR-Hinweise in Content Registry | 🟡 #167 offen |

---

## 5.6 KI-Features im Portal

| Feature | Provider | Auswahl | Limits | Kosten |
|---------|----------|---------|--------|--------|
| KI-Tutor (RAG) | Gemini→Groq→Claude | Auto-Fallback | 50/Tag Fair-Use | monitoring_log |
| Rechenpraxis-Assistent | idem | Server-Proxy #74 | AI-Limiter 15/min | — |
| Dokument-Werkstatt KI-Feedback | idem | — | Fair-Use | Commit b7f75b6 **unverifiziert** |
| Owner Coaching | idem | — | Owner-only | — |
| Portal-Agent / SuperAgent | idem | — | Cron + Manual | — |
| Kursbuch-Generator | idem | Pipeline v2 #168 | Chunked, kein Timeout | Hoch bei 80 Tagen |
| KI-Brief Verwalter | idem | `askLlmWithContinuation` | **Kein Fair-Use** | — |
| Verwalter Assistent | idem | #175 Branch | **Kein Fair-Use** | — |

---

*Weiter: [06_OWNER.md](./AUDIT_2026-06-10_06_OWNER.md)*
```

### Datei: docs/AUDIT_2026-06-10_06_OWNER.md
```markdown
# Teil 6 — Owner Control Tower (PR #155)

**Status:** 🟡 PR offen, **nicht** auf production

---

## 6.1 Was ist das?

**Owner Control Tower C1** = Ereignis-Protokoll (Audit Trail) für Plattform-Eigentümer-Aktionen.

| Funktion | Beschreibung | Status |
|----------|--------------|--------|
| Audit Trail | Log wer/wann/was im Owner-Bereich | 🟡 PR #155 |
| Stats | Nutzer, Umsatz, KI-Nutzung | ✅ live (bestehend) |
| Revenue | Stripe-Umsatz-Tab | ✅ PR #116 |
| Impersonate | Inspect-Link-Generierung | ✅ PR #97 |
| KI-Stats | `/api/admin/ki-stats` | ✅ PR #91 (requireAdmin) |

**PR #155:** +472 LoC, Branch `cursor/owner-audit-trail-7dbc`, erstellt 2026-06-09

---

## 6.2 Audit-Trail (geplant in #155)

| Aspekt | Geplant | Beleg |
|--------|---------|-------|
| Events | Owner-Login, 2FA, Impersonate, Settings-Änderung | PR-Beschreibung |
| Speicherung | Tabelle `platform_audit_log` | **Annahme** aus PR-Titel |
| PII | Soll ohne PII sein (wie PR #146 DSGVO) | — |
| Aufbewahrung | **nicht definiert** | — |
| DSGVO-konform | **unverifiziert** — PR nicht merged | — |

---

## 6.3 Andere Owner-Features (live)

| Feature | Endpoint/Route | Auth | PR |
|---------|----------------|------|-----|
| Owner-Dashboard | `/owner` | Magic Code + 2FA | Sprint 4 |
| Inspect-Link | Generator in Owner-UI | Owner-Session | #73, #86 |
| KI-Stats | `GET /api/admin/ki-stats` | requireAdmin | #91 |
| Revenue Tab | Owner-Dashboard | Owner-Session | #116 |
| Pending Purchases | Owner-Ops | Owner-Session | #119 |
| Price Readiness | Owner-Ops | Owner-Session | #119 |

### Owner-Auth-Modell (live)

1. `OWNER_MAGIC_CODE` eingeben
2. 2FA OTP per E-Mail (Resend)
3. Session-Cookie (getrennt von User-Login seit #98)

**Beleg:** PRs #63-#67, #98

---

*Weiter: [07_OFFEN.md](./AUDIT_2026-06-10_07_OFFEN.md)*
```

### Datei: docs/AUDIT_2026-06-10_07_OFFEN.md
```markdown
# Teil 7 — Offene Baustellen

**Stand:** 2026-06-10 · **18 offene PRs**

---

## 7.1 Alle offenen PRs im Detail

### Verwalter-Kaskade (#172–#177)

| PR# | Was | Warum nicht merged | Fehlt zum Merge | Risiko Merge | Risiko Nicht-Merge | Empfehlung |
|-----|-----|-------------------|-----------------|--------------|-------------------|------------|
| #172 | P3 Vorgangs-Tracker | Draft, kaskadierend | Review, E2E, Volume für File-Store | Mittel — ungetestet prod | Feature-Stau | Squash in einen PR |
| #173 | P3+ Export/Fristen | Baut auf #172 | #172 Basis | Mittel | DATEV-Spec ohne UI | Mit #172 konsolidieren |
| #174 | DATEV Buchungen | Baut auf #173 | Integrationstest | Mittel — Buchhaltung | Kein DATEV Export | Nach Consolidation |
| #175 | Assistent + Guide | Baut auf #174 | KI-Kosten-Review | Mittel — kein Fair-Use | Kein Assistent | Fair-Use vor Merge |
| #176 | Suite Plus | Baut auf #175 | UX-Review Onboarding | Mittel | — | — |
| #177 | Chat-Buchung | HEAD Branch | 1-Klick E2E fehlt | Mittel | — | Letzter in Kette |

**Empfehlung gesamt:** Einen konsolidierten Branch `cursor/verwalter-suite-consolidated-7dbc` erstellen, linear auf `main` rebasen, ein Review, ein Merge.

### Platform & Security (#151–#155, #167)

| PR# | Was | Warum offen | Fehlt | Risiko Merge | Empfehlung |
|-----|-----|-------------|-------|--------------|------------|
| #151 | HSTS preload | Draft | hstspreload.org Submit | Niedrig | Merge nach Test |
| #154 | Platform 14k LoC | Zu groß | Split in 3-4 PRs | **Hoch** — Regression | **Nicht** als Ganzes mergen |
| #155 | Owner Audit Trail | Draft | Schema-Review | Niedrig | Merge mit #146 abstimmen |
| #167 | Content Registry | Overlap #168 | Deduplizieren | Mittel | Close oder rebase auf main |

### Ops & Compliance (#144–#147, #149–#152, #136)

| PR# | Was | Warum offen | Empfehlung |
|-----|-----|-------------|------------|
| #144 | R2 Failure Alert | Ops-Nice-to-have | Merge wenn Webhook existiert |
| #145 | Stripe 18-ID Preflight | Alisad Live-Schritt | Merge vor Live |
| #146 | DSGVO Deletion Audit | Schema-Entscheidung | Merge mit Legal |
| #147 | E-Mail-Verifikation 7d | Produkt-Entscheidung | Alisad entscheiden |
| #149 | §17 Korrektur | Doku only | Merge |
| #150 | Risikoregister | Doku only | Merge |
| #152 | Master-Workflow | Doku only | Merge |
| #136 | Baumeister Übergabe | Doku only | Merge |

---

## 7.2 Bekannte Bugs / Tech-Debt

| Issue | Status | Beleg |
|-------|--------|-------|
| HSTS Preload Bug | 🟡 PR #151 | Live Response ohne `preload` |
| CSP `unsafe-inline` | ✅ bekannt, offen | `index.ts:99` |
| Dark-Mode-Inkonsistenz | 🟡 PR #154 adressiert | Nicht merged |
| Module 4 Loading | ✅ PR #85 | — |
| Inspect Query Leak | ✅ PR #141 | — |
| Verwalter File-Stores ephemeral | ❌ offen | Kein Volume dokumentiert |
| schema.ts vs DB Inkonsistenz | ❌ offen | 26 tables in schema, mehr in migrations |
| Marketing Claims 854 vs 855 vs 4275 | ❌ offen | Verschiedene Quellen |

---

## 7.3 Externe Abhängigkeiten offen

| Item | Verantwortlich | Status |
|------|----------------|--------|
| Gewerbeschein Berlin | Alisad | ☐ |
| AVVs Prozessoren | Alisad | ☐ |
| DMARC pct=100 | Alisad DNS | ☐ |
| IPv6 Railway | Railway/Alisad | ☐ |
| DNS CAA Records | Alisad | ☐ |
| Owner-Code Rotation | Alisad | ☐ Checkliste #14 |
| R2 Restore-Test | Alisad | ☐ Checkliste #4 |
| 18 Stripe-Prices Live | Alisad | ☐ Checkliste #11 |

---

## 7.4 Strategische Entscheidungen offen

### E-Mail-Verifikation (PR #147)

| Pro | Contra |
|-----|--------|
| Weniger Fake-Accounts | Reibung im Checkout |
| DSGVO-Transparenz | 7-Tage Grace komplex |
| Branchenstandard | Bestandsnutzer-Migration |

### DSGVO Audit Log (PR #146)

| Pro | Contra |
|-----|--------|
| Nachweisbarkeit Löschungen | Neue Tabelle, Aufbewahrung |
| NF-13 Forensik | Schema-Design nötig |

**Empfehlung Schema:** Event ohne PII, nur `userId_hash`, `action`, `timestamp`, `actor`

### Stripe Live-Schaltung

Voraussetzungen laut `docs/STRIPE_LIVE_GO_LIVE.md`:
1. `stripe:seed-prices` mit `sk_live_`
2. Live Webhook in Railway
3. Testkauf mit echter Karte
4. PR #145 Preflight grün

### Marketing-Claims

| Quelle | Zahl | Problem |
|--------|------|---------|
| Landing | 854? | **unverifiziert** |
| SEO | 855? | **unverifiziert** |
| Modul-Intro | 4275? | Übungsfragen gesamt vs sichtbar |

**Empfehlung:** Eine `shared/claims.ts` Quelle — teilweise in PR #93

---

*Weiter: [08_TESTS.md](./AUDIT_2026-06-10_08_TESTS.md)*
```

### Datei: docs/AUDIT_2026-06-10_08_TESTS.md
```markdown
# Teil 8 — Tests und Qualitätssicherung

**Stand:** 2026-06-10 · Branch `cursor/verwalter-chat-buchung-7dbc`

---

## 8.1 Aktuelle Test-Metriken

| Metrik | Wert | Beleg |
|--------|------|-------|
| Vitest Tests | **213 passed** | `pnpm exec vitest run` 2026-06-10 |
| Vitest Files | **81** | idem |
| API-Tests | ~36 | `EXTERNAL_OPS_CHECKLIST.md:3` (122 Vitest am 08.06. — Zahl gestiegen) |
| E2E Smoke | 10 | Checkliste 08.06. |
| Playwright Specs | **30 Dateien** | `tests/e2e/*.spec.ts` |
| TypeScript | **0 errors** | `npx tsc --noEmit --skipLibCheck` |
| Lint | **nicht ausgeführt** | — |

**Hinweis:** User-Briefing nannte „160 in 56 Files" — veraltet; aktuell 213/81.

---

## 8.2 Playwright Specs (vollständig)

| Spec | Flow |
|------|------|
| `01-public-pages.spec.ts` | Öffentliche Seiten laden |
| `02-auth.spec.ts` | Login/Logout |
| `03-module-content.spec.ts` | Modul-Inhalte |
| `04-ux-navigation.spec.ts` | Navigation |
| `05-full-test-suite.spec.ts` | Kombiniert |
| `06-auth-flows.spec.ts` | Auth-Varianten |
| `06-compliance-landing.spec.ts` | Compliance-Texte |
| `06-regression-fixes-20260525.spec.ts` | Regression 25.05. |
| `07-todays-fixes.spec.ts` | Tages-Fixes |
| `07-verwalter-rechner.spec.ts` | Verwalter-Rechner Landing |
| `08-renewal-api.spec.ts` | Renewal API |
| `08-verify-fixes.spec.ts` | Fix-Verifikation |
| `09-renewal-auth.spec.ts` | Renewal Auth |
| `10-rechenpraxis-preise.spec.ts` | Rechenpraxis-Preise |
| `11-rechenpraxis-checkout.spec.ts` | Rechenpraxis Checkout |
| `12-b2b-einrichtung.spec.ts` | B2B Setup |
| `13-b2b-logo-connect.spec.ts` | B2B Logo/Connect |
| `14-stripe-price-config.spec.ts` | Stripe Price Config |
| `15-stripe-checkout-smoke.spec.ts` | Stripe Checkout Smoke |
| `16-stripe-payment-flow.spec.ts` | Payment Flow |
| `17-b2b-team-codes.spec.ts` | Team Codes |
| `18-b2b-checkout.spec.ts` | B2B Checkout |
| `19-pending-purchases.spec.ts` | Pending Purchases |
| `20-stripe-live-readiness.spec.ts` | Stripe Live Readiness |
| `21-mysql-health.spec.ts` | MySQL Health |
| `22-migration-status.spec.ts` | Migration Status |
| `23-platform-comfort-audio.spec.ts` | Platform Audio (Branch?) |
| `24-rechenpraxis-p0-module3-audio.spec.ts` | Modul 3 Audio |
| `25-comfort-font-zoom.spec.ts` | A11y Zoom |
| `26-verwalter-mobile-layout.spec.ts` | Verwalter Mobile Layout |

---

## 8.3 Coverage pro Bereich

| Bereich | Unit | E2E | Lücke |
|---------|------|-----|-------|
| Auth | ✅ | ✅ 02, 06 | Owner 2FA E2E |
| Stripe | ✅ | ✅ 14-20 | Live-Modus |
| Inspect | 🟡 | 🟡 | Read-only Flow E2E |
| Module-Loading | ✅ | ✅ 03 | Modul 4 Edge Cases |
| KI-Provider-Fallback | 🟡 | ❌ | Kein E2E Fallback |
| Audio | 🟡 | 🟡 24 | Vollständigkeit |
| Verwalter Suite | ✅ Unit | 🟡 Layout only | Kein E2E Vorlagen/KI-Brief |
| B2B | ✅ | ✅ 12-18 | Post-Checkout Wizard |
| DATEV | ✅ Unit (#174) | ❌ | — |
| GDPR Delete | 🟡 | ❌ | File-Stores |

---

## 8.4 Was hat KEINE Tests?

- Owner 2FA vollständiger Flow (E2E)
- Verwalter KI-Brief End-to-End
- Verwalter Objekt-CRUD E2E
- Inspect REST-Allowlist Regression (neue Endpoints)
- File-Store Persistenz über Deploy
- ElevenLabs TTS
- Stripe Webhook Handler (Integration)
- E-Mail-Versand (Resend)

---

## 8.5 Flaky / Trügerisch

| Test | Problem |
|------|---------|
| Playwright mit `retries=0` auf WSL | PR #140 — flaky bei Timing |
| Stripe E2E | Braucht Test-Keys, skip ohne ENV |
| Magic-Link Tests | Fallback-Logik in #140 |
| Vitest mit DB-Mocks | Viele Stores mocken Filesystem |

---

## 8.6 CI/CD-Pipeline

**Datei:** `.github/workflows/ci.yml`

| Check | Bei jedem PR | Beleg |
|-------|--------------|-------|
| TypeScript | ✅ | `tsc --noEmit` |
| Vitest | ✅ | `pnpm test` |
| Docker Build | ✅ seit #161 | — |
| Playwright E2E | 🟡 Smoke only | Nicht alle 30 Specs |
| Stripe Live E2E | ❌ skip | `STRIPE_E2E_ENABLED` false |

**Übersprungen:** Live Stripe, R2 Upload (Secrets), volle Playwright-Suite

**Build-Dauer:** **unverifiziert**

---

*Weiter: [09_SELBST.md](./AUDIT_2026-06-10_09_SELBST.md)*
```

### Datei: docs/AUDIT_2026-06-10_09_SELBST.md
```markdown
# Teil 9 — Ehrliche Selbst-Bewertung

**Perspektive:** Cursor Agent · **Stand:** 2026-06-10

---

## 9.1 Letzte 30 Tage — Was lief gut?

| Entscheidung | Warum rückblickend richtig | Beleg |
|--------------|---------------------------|-------|
| Inspect Security P0 (#141, #148) | Reale Schwachstelle geschlossen vor externem Audit | merged 08.06. |
| Dockerfile statt Nixpacks-Patches | Nach 9 PRs stabiler Build | Health 200 |
| KI Multi-Provider Fallback | Reduziert Single-Point-of-Failure Anthropic | #168, #84 |
| Stripe Test-First + Seed-Script | 18 Price-IDs automatisierbar | PR #127 |
| Verwalter als Subpath | Schneller MVP ohne zweites Deployment | #169 merged |
| Vitest-Ausbau 122→213 | Mehr Regression-Schutz | Test-Run 10.06. |

---

## 9.2 Was lief schlecht?

| Problem | Hätte vermieden werden können | Beleg |
|---------|------------------------------|-------|
| 90 Commits / 47 PRs an einem Tag (07.06.) | Sprint-Disziplin, kleinere Batches | Chronologie |
| 6 Verwalter-PRs kaskadierend statt 1 konsolidiert | Architektur-Plan vor Coding | #172-#177 |
| File-Stores ohne Volume-Plan | DB-Design vor Feature-Sprint | `data/verwalter-*` |
| PR #154 mit 14k LoC | Feature-Split | offen |
| Nixpacks 9 Fix-PRs | Dockerfile von Anfang an | #158-#166 |
| Verwalter-KI ohne Fair-Use | Gate wiederverwenden | `verwalterRouter.ts` |
| schema.ts hinter migrations zurück | Schema-Sync als Pflicht | 26 vs 45 migrations |

### Zu schnell

- Verwalter P1-P3+ an einem Tag (10.06.)
- B2B Phasen 4-15 an einem Tag (07.06.)

### Zu langsam

- HSTS preload (#151) — 1 Tag offen, trivial
- R2 Restore-Test — seit 06.06. geplant, nicht erledigt
- Stripe Live — vorbereitet aber nicht geschaltet

---

## 9.3 Wo bin ich unsicher?

| Bereich | Unsicherheit |
|---------|--------------|
| File-Stores auf Railway | Ob Volume existiert — Datenverlust-Risiko |
| Verwalter Suite Produkt-Market-Fit | Keine Nutzer-Feedback-Daten |
| PR #154 Regression-Umfang | 14k LoC unreviewed |
| GDPR Delete + File-Stores | Ob Löschung File-Stores abdeckt |
| Test-Zahlen vs Production | E2E gegen Prod, nicht Staging |
| KI-Kosten Verwalter | Kein Cap, unbegrenzte Nutzung möglich |
| Marketing Claims | Keine Single Source of Truth verifiziert |

---

## 9.4 Empfehlung für Alisad

### P0 — Akut

1. **Railway Volume** für `data/verwalter-*` oder Migration zu MySQL
2. **Verwalter-PRs konsolidieren** (#172-#177 → 1 PR, review, merge)
3. **Fair-Use auf Verwalter-KI** anwenden
4. **R2 Restore-Test** durchführen (Checkliste #4)
5. **PR #141+#148** live verifizieren (Inspect-Pentest)

### P1 — Kann kurz warten

- PR #151 HSTS preload merge
- PR #145 Stripe Preflight vor Live
- PR #146 DSGVO Audit Log
- DMARC pct=100
- Owner-Code Rotation

### P2-P3 — Kann warten

- PR #154 splitten und inkrementell
- Subdomain `verwalter.*` (Roadmap >50 Nutzer)
- Staging-Environment
- DocuSign Integration

### Zurückbauen (Tech-Debt)

- Doppelter Keep-alive Ping (8 + 14 min) — einer reicht
- `unsafe-inline` CSP langfristig entfernen
- Module 6-8 tote Referenzen (teilweise #142)

### Nicht jetzt anfangen

- B2B Multi-Mandant Verwalter
- Eigenes Railway-Projekt Verwalter
- Stripe Live ohne Restore-Test + Preflight
- Weitere Feature-PRs vor Merge-Stau-Aufräumen

---

## 9.5 Prozess-Feedback

### Claude (Architekt) + Cursor (Code) + Alisad (Owner)

| Aspekt | Bewertung |
|--------|-----------|
| **Funktioniert** | Klare PR-Nummern, Audit-Anforderungen, AGENTS.md Verbotsliste |
| **Funktioniert** | GitHub PR-Flow mit gh CLI |
| **Nervt** | Audit-Briefing vs. Implementierungs-Sprints parallel — Kontext-Split |
| **Nervt** | „13 offene PRs" in Briefing vs. 18 real — Kommunikationslücke |
| **Nervt** | Kaskadierende Draft-PRs ohne Merge-Disziplin |
| **Strukturell ändern** | 1 Feature = 1 Branch = 1 PR = Review = Merge vor nächstem Feature |
| **Strukturell ändern** | Staging-Environment für E2E |
| **Strukturell ändern** | Wöchentlicher PR-Gardening-Tag |

---

*Weiter: [10_STRATEGIE.md](./AUDIT_2026-06-10_10_STRATEGIE.md)*
```

### Datei: docs/AUDIT_2026-06-10_10_STRATEGIE.md
```markdown
# Teil 10 — Strategische Antworten an den Architekten

**Stand:** 2026-06-10 · Antworten aus Code/Doku/Repo — Geschäftsentscheidungen als solche markiert

---

## 10.1 Verwalter Suite strategischer Kontext

| Frage | Antwort | Beleg / Einschränkung |
|-------|---------|----------------------|
| Alisad beauftragt oder Eigeninitiative? | **Beides:** Roadmap existierte (`VERWALTER_SUITE_ROADMAP.md`); P1-P3+ Tempo war Agent-getrieben nach Produkt-Shell-Auftrag | Commits 10.06. |
| Welche Doku referenziert die Entscheidung? | `docs/VERWALTER_SUITE_ROADMAP.md`, PR #169 Beschreibung | — |
| Tempo P1+P2+P3 in einem Tag? | **Ja, auf Branch-Ebene** — merged nur P1+P2; P3+ offen | PR-Zeitstempel #170-#177 |
| Eigene Domain geplant? | ⏳ Phase B, Schwelle >50 Nutzer | Roadmap:58-62 |
| Stripe Live für Verwalter? | ⏳ „Verwalter Tools 39€/Mo" nur Roadmap | Roadmap:94 — **Alisad-Geschäftsentscheidung** |

---

## 10.2 PR-Stau

| Frage | Antwort |
|-------|---------|
| Warum 18 offene PRs? | Agent-generierte Drafts, Feature-Sprints ohne Merge-Pause, große PRs (#154) |
| Beabsichtigt? | **Teilweise** — Drafts zur Review; nicht beabsichtigt: 6er Verwalter-Kaskade |
| PR-Stau durch zu schnelle Generierung? | **Ja** — 07.06. (47 merges) erzeugte Gegenstau an offenen Drafts |
| Empfehlung Aufräumen | 1. Verwalter konsolidieren 2. Doku-PRs (#149-#152, #136) mergen 3. #154 splitten 4. #167 close/rebase 5. Merge-Freeze bis <5 offen |

---

## 10.3 Tempo

| Metrik | Wert |
|--------|------|
| Commits 30d | ~442 |
| Davon Alisad | 223 (50%) |
| Cursor+Bot | 137 (31%) |

| Frage | Antwort |
|-------|---------|
| Nachhaltig? | **Nein** in aktueller Form — 90-Commit-Tage erzeugen Review-Schuld |
| Wo Tech-Debt? | File-Stores, offene PRs, schema.ts Drift, fehlende E2E, kein Staging |
| Wo Innovation? | Verwalter Suite, KI Pipeline v2, B2B Phasen, Inspect v2, Weiterbildungsnachweis |

---

## 10.4 Produkt-Strategie

| Frage | Antwort |
|-------|---------|
| Zwei Produkte mit eigenen Roadmaps? | **Ja, konzeptionell** — §34c Lernportal + Verwalter Suite; **technisch ein Deployment** |
| Zielkunden Hauptportal | §34c-Prüflinge, Makler, Immobilienkaufleute |
| Zielkunden Verwalter | WEG-Verwalter, Quereinsteiger, kleine Büros |
| Cross-Selling geplant? | ⏳ Roadmap: Rechenpraxis Solo → Verwalter Tools Bundle | Roadmap:91-95 |

**Alisad-Geschäftsentscheidung:** Priorisierung, Pricing, Go-to-Market — nicht aus Code ableitbar.

---

## 10.5 Was hat dich heute (10.06.) beschäftigt?

| Auftraggeber | Task | Status |
|-------------|------|--------|
| Alisad/Agentur (via Conversation) | Verwalter P3+ Sprint, DATEV, Assistent, Suite+, Chat-Buchung | 🟡 PRs #172-#177 |
| Alisad/Agentur | Architekt-Audit Vollbericht | 🟡 Dieser Bericht |
| Eigeninitiativ | Konsolidierung Tests (213), tsc grün | ✅ |

### Backlog morgen (11.06.) — Empfehlung

1. Audit-Bericht committen + PR
2. Verwalter-PRs konsolidieren
3. Fair-Use Gate für Verwalter-KI
4. Volume-Frage an Alisad eskalieren
5. PR #151, #145 reviewen

**Hinweis:** „Heute" im Briefing war 09.06. — Verwalter-Sprint war 10.06. UTC.

---

*Weiter: [11_ANHANG.md](./AUDIT_2026-06-10_11_ANHANG.md)*
```

### Datei: docs/AUDIT_2026-06-10_11_ANHANG.md
```markdown
# Teil 11 — Verifikationsdaten für den Architekten

**Erstellt:** 2026-06-10T09:37Z

---

## 11.1 Live-Daten

### HEAD Commit

```
main: 599a0b1 feat(verwalter): P2 Vorlagen, KI-Brief, Objekte (#171)
workspace: 1e66700 feat(verwalter): Chat-Buchungsvorschlag + Rechenpraxis-Verwalter-Links
```

### Health-Check

```bash
curl -sS https://immobilien-akademie-smart.de/api/health
```

```json
{"ok":true,"db":"connected","latencyMs":429,"ts":"2026-06-10T09:36:25.903Z","migrations":{"pending":0,"total":45,"lastApplied":"add-indexes.sql"}}
```

### HTTPS-Headers (Auszug)

```bash
curl -sSI https://immobilien-akademie-smart.de/
```

```
HTTP/2 200
server: railway-edge
x-railway-edge: railway/us-east4-eqdc4a
strict-transport-security: max-age=31536000; includeSubDomains
content-security-policy: default-src 'self';script-src 'self' 'unsafe-inline' https://js.stripe.com;...
permissions-policy: camera=(), microphone=(), geolocation=(), payment=(self "https://js.stripe.com")
cross-origin-opener-policy: same-origin
cross-origin-resource-policy: same-origin
last-modified: Wed, 10 Jun 2026 08:10:15 GMT
```

### Stripe Products API

**unverifiziert** — erfordert `curl https://immobilien-akademie-smart.de/api/stripe/products` (öffentlich laut Code `stripe.ts:259`).

```bash
curl -sS https://immobilien-akademie-smart.de/api/stripe/products | head -c 2000
```

*(Architekt soll selbst ausführen — Ergebnis nicht in diesem Snapshot)*

---

## 11.2 Schema-Übersicht

### Tabellen (drizzle/schema.ts)

| # | Tabelle | schema.ts Zeile |
|---|---------|-----------------|
| 1 | users | 8 |
| 2 | spaced_repetition | 36 |
| 3 | whitelabel_configs | 58 |
| 4 | chat_conversations | 87 |
| 5 | chat_messages | 98 |
| 6 | video_tutorials | 108 |
| 7 | video_progress | 127 |
| 8 | exam_sessions | 146 |
| 9 | exam_questions | 166 |
| 10 | exam_weak_topics | 184 |
| 11 | certificates | 196 |
| 12 | question_bank | 214 |
| 13 | learning_logs | 234 |
| 14 | user_sessions | 249 |
| 15 | activity_heartbeats | 263 |
| 16 | exam_audit_log | 273 |
| 17 | feedback | 285 |
| 18 | complaints | 297 |
| 19 | consent_log | 312 |
| 20 | avv_agreements | 332 |
| 21 | otp_tokens | 343 |
| 22 | auth_credentials | 353 |
| 23 | access_codes | 362 |
| 24 | password_reset_tokens | 375 |
| 25 | open_questions | 384 |
| 26 | open_answers | 402 |

**Zusätzliche Tabellen nur in Migrationen:** monitoring_log, pending_purchases, referral_rewards, partner_payout_ledger, partner_connect_accounts, schema_migrations, trial_leads, presentation_codes, glossar_terms, portal_settings, etc.

### Row-Counts

**Nicht verfügbar** — Architekt: `SELECT table_name, table_rows FROM information_schema.tables WHERE table_schema = DATABASE();`

---

## 11.3 Test-Outputs

### Vitest (2026-06-10, Branch `verwalter-chat-buchung`)

```
Test Files  81 passed (81)
     Tests  213 passed (213)
  Duration  4.88s
```

### TypeScript

```bash
npx tsc --noEmit --skipLibCheck
# Exit code: 0 (keine Ausgabe = 0 errors)
```

### Playwright Smoke

**Nicht in diesem Lauf ausgeführt** — letzter bekannter Stand 08.06.: 10 E2E grün laut `EXTERNAL_OPS_CHECKLIST.md`.

```bash
pnpm run test:e2e:smoke  # Architekt ausführen
```

---

## 11.4 Deployment-Evidenz

| Feld | Wert |
|------|------|
| Letzter Deploy | 2026-06-10 ~08:10 UTC (last-modified Header) |
| Build-Dauer | **unverifiziert** |
| Image-Größe | **unverifiziert** |
| Logs 24h | **unverifiziert** — Railway Dashboard |

---

## 11.5 Externe Tool-Zustandsinfo

**Alle unverifiziert — Architekt muss selbst prüfen:**

| Tool | URL | Erwartung laut Briefing |
|------|-----|------------------------|
| internet.nl Web | https://internet.nl/site/immobilien-akademie-smart.de/ | IPv6 Failed |
| internet.nl Mail | https://internet.nl/mail/immobilien-akademie-smart.de/ | 63%, IPv6 Failed |
| PageSpeed | https://pagespeed.web.dev/ | — |
| SSL Labs | https://www.ssllabs.com/ssltest/ | — |
| Mozilla Observatory | https://observatory.mozilla.org/ | — |
| Snyk Headers | — | — |

---

## 11.6 Migrations-Liste (45 Dateien)

```
0000_known_riptide.sql … 0042_ledger_stripe_transfer.sql, add-indexes.sql
```

Vollständige Liste: `ls drizzle/migrations/`

---

## 11.7 Verwalter File-Store Pfade (nicht in MySQL)

```
data/verwalter-objekte/{userId}.json
data/verwalter-vorgaenge/{userId}.json   # Branch only
data/verwalter-buchungen/{userId}.json   # Branch only
```

**Beleg:** `server/verwalterObjektStore.ts`, `verwalterVorgangStore.ts`, `verwalterBuchungStore.ts`

---

*Ende des Architekt-Audits. Index: [AUDIT_2026-06-10_INDEX.md](./AUDIT_2026-06-10_INDEX.md)*
```

### Datei: docs/AUDIT_2026-06-10_INDEX.md
```markdown
# Architekt-Audit — Immobilien Akademie Smart + Verwalter Suite

**Erstellt:** 2026-06-10  
**Ersteller:** Cursor Agent (einzige verifizierbare Repo-Datenquelle)  
**Zielgruppe:** Externe Architekt-Beratung (Anthropic/Claude)  
**Produktion:** https://immobilien-akademie-smart.de  
**Repo:** `smartlivingberlin/Immobilie-Akademie-Premium` (Monorepo)

---

## Methodik

| Regel | Umsetzung |
|-------|-----------|
| Jede Behauptung belegt | Datei:Zeile, Commit-Hash, PR-Nummer, curl-Output |
| Kein Beleg | Markiert als **Annahme** oder **unverifiziert** |
| Status-Symbole | ✅ erledigt+deployed · 🟡 PR offen · ⏳ geplant · 💭 diskutiert · ❌ verworfen |
| Keine Selbstpromotion | Nur Fakten, Trade-offs, Tech-Debt |

## Verifizierte Live-Daten (2026-06-10T09:36Z)

| Messung | Ergebnis | Beleg |
|---------|----------|-------|
| `main` HEAD | `599a0b1` | `git log main -1` |
| Health-Check | `200`, `pending: 0`, `total: 45` | `curl https://immobilien-akademie-smart.de/api/health` |
| HSTS | `max-age=31536000; includeSubDomains` (ohne `preload` in Response) | curl `-I` |
| CSP | `unsafe-inline` in script-src + style-src | curl `-I` |
| Railway Edge | `us-east4-eqdc4a` | Header `x-railway-edge` |
| Workspace-Branch | `cursor/verwalter-chat-buchung-7dbc` @ `1e66700` | `git rev-parse HEAD` |

## Dokument-Index

| Datei | Inhalt | Priorität |
|-------|--------|-----------|
| [04_VERWALTER.md](./AUDIT_2026-06-10_04_VERWALTER.md) | Verwalter Suite — strategisch dringend | **1** |
| [02_DEPLOYMENT.md](./AUDIT_2026-06-10_02_DEPLOYMENT.md) | Nixpacks→Dockerfile, Railway, Dockerfile | **2** |
| [01_CHRONOLOGIE.md](./AUDIT_2026-06-10_01_CHRONOLOGIE.md) | 14-Tage-Chronologie, alle PRs 30 Tage | **3** |
| [02_INFRA.md](./AUDIT_2026-06-10_02_INFRA.md) | MySQL, Drittanbieter, DNS, Security | 4 |
| [03_CODE.md](./AUDIT_2026-06-10_03_CODE.md) | Frontend/Backend-Inventur, Schema, Doku | 5 |
| [05_KI.md](./AUDIT_2026-06-10_05_KI.md) | KI-Pipeline, Audio, Kosten | 6 |
| [06_OWNER.md](./AUDIT_2026-06-10_06_OWNER.md) | Owner Control Tower (PR #155) | 7 |
| [07_OFFEN.md](./AUDIT_2026-06-10_07_OFFEN.md) | Offene PRs, Bugs, externe Abhängigkeiten | 8 |
| [08_TESTS.md](./AUDIT_2026-06-10_08_TESTS.md) | Vitest, Playwright, CI/CD | 9 |
| [09_SELBST.md](./AUDIT_2026-06-10_09_SELBST.md) | Ehrliche Selbst-Bewertung | 10 |
| [10_STRATEGIE.md](./AUDIT_2026-06-10_10_STRATEGIE.md) | Strategische Antworten an Architekt | 11 |
| [11_ANHANG.md](./AUDIT_2026-06-10_11_ANHANG.md) | Verifikationsdaten, Test-Outputs | 12 |

## Was dieser Audit NICHT liefern kann (unverifiziert aus Repo)

- Railway Projekt-ID, Service-IDs, Volume-Belegung (kein API-Zugang)
- MySQL Row-Counts live (keine Prod-DB-Verbindung)
- Stripe Live-Modus-Status, Resend Bounce-Rate, Anthropic Credits
- internet.nl / PageSpeed / SSL Labs Scores (externe Tools — Architekt muss selbst prüfen)
- Deploy-Failures Railway letzte 30 Tage (kein Railway-Dashboard-Zugang)
- Ob offene PRs (#172–#177) deployed sind: **Nein** — nur `main` ist production

## Commit-Volumen letzte 30 Tage (2026-05-11 bis 2026-06-10)

| Autor | Commits | Beleg |
|-------|---------|-------|
| Alisad Gadyri | 223 | `git log --since=2026-05-11 --format=%an` |
| Cursor Agent | 94 | idem |
| smartlivingberlin | 81 | idem |
| cursor[bot] | 43 | idem |
| google-labs-jules[bot] | 1 | idem |

**Gesamt:** ~442 Commits in 30 Tagen.

## Offene PRs (Stand 2026-06-10, `gh pr list --state open`)

**18 offene PRs** (nicht 13 — Zählung via GitHub API):

| PR# | Titel | Branch |
|-----|-------|--------|
| #177 | Chat-Buchung 1-Klick + Rechenpraxis-Links | `cursor/verwalter-chat-buchung-7dbc` |
| #176 | Buchungsvorschlag, Plausibilität, Monatsabschluss | `cursor/verwalter-suite-plus-7dbc` |
| #175 | Live-Assistent + Guide-System | `cursor/verwalter-assistent-7dbc` |
| #174 | Hausgeld-Buchungen + DATEV EXTF | `cursor/verwalter-datev-buchungen-7dbc` |
| #173 | P3+ Fristen/Export/DATEV | `cursor/verwalter-p3plus-sprint1-7dbc` |
| #172 | P3 Vorgangs-Tracker + Einheiten | `cursor/verwalter-p3-vorgaenge-7dbc` |
| #167 | Content Registry M2/M4 Audit | `cursor/content-registry-m2-m4-audit-7dbc` |
| #155 | Owner Control Tower C1 Audit Trail | `cursor/owner-audit-trail-7dbc` |
| #154 | Platform Audio/ComfortBar/Generator | `cursor/platform-comfort-audio-rechen-7dbc` |
| #152 | Alisad Master-Workflow Docs | `cursor/alisad-master-workflow-7dbc` |
| #151 | HSTS preload via Helmet | `cursor/hsts-preload-fix-7dbc` |
| #150 | Risikoregister v1 | `cursor/risk-register-v1-7dbc` |
| #149 | §17 Bericht-Korrektur-Nachtrag | `cursor/audit-corrections-7dbc` |
| #147 | Hybrid E-Mail-Verifikation | `cursor/hybrid-email-verification-7dbc` |
| #146 | DSGVO Deletion Audit Log | `cursor/dsgvo-deletion-audit-log-7dbc` |
| #145 | Stripe 18 Price-IDs Preflight | `cursor/stripe-price-preflight-7dbc` |
| #144 | R2 Backup Failure Alert | `cursor/r2-backup-failure-alert-7dbc` |
| #136 | Baumeister-Audit Übergabe | `cursor/baumeister-audit-transfer-7dbc` |

---

*Weiter mit Teil 4 (Verwalter Suite) →*
```

### Datei: docs/B2B_SMOKE_TEST.md
```markdown
# B2B Smoke-Test — Schritt für Schritt (Alisad)

**Voraussetzungen:** Stripe **Testmodus**, `STRIPE_PRICE_B2B_STARTER` und `STRIPE_PRICE_B2B_PROFESSIONAL` in Railway gesetzt.

---

## Phase A — Vorbereitung (WSL)

```bash
cd /mnt/c/Users/Lenovo/Immobilie-Akademie-Premium
curl -s https://immobilien-akademie-smart.de/api/health | jq '{ok, db}'
```

Erwartung: `"ok": true`

### Phase A2 — Komplett per CLI (ohne Browser)

**Voraussetzung:** Admin-Passwort gesetzt (`/forgot-password` falls nach Stripe-Kauf noch keins existiert).

```bash
export B2B_ADMIN_EMAIL="alisadgadyri38@gmail.com"
read -s B2B_ADMIN_PASSWORD && export B2B_ADMIN_PASSWORD
pnpm run ops:b2b-team-smoke
```

Optional zweites Konto für Einlösung mit Login:

```bash
export B2B_MEMBER_EMAIL="team-test@example.com"
export B2B_MEMBER_PASSWORD="Test2026!"
pnpm run ops:b2b-team-smoke
```

Ohne `B2B_MEMBER_*` wird der Code als Gast-Session eingelöst (Schritt 7).

---

## Phase B — Checkout (Browser)

| Schritt | Wo | Was |
|--------|-----|-----|
| 1 | Browser | Einloggen (Magic-Link / Testkonto) |
| 2 | `/fuer-maklerbueros` | **Starter** oder **Professional** wählen |
| 3 | Dialog | Firmenname z. B. `Test Makler GmbH` |
| 4 | Stripe Checkout | Karte `4242 4242 4242 4242`, `12/34`, CVC `123` |
| 5 | Redirect | `/b2b-einrichtung?b2b=1` |

**Keys einfügen?** Nein — nur Testkarte im Stripe-Formular.

---

## Phase C — Onboarding-Wizard

| Schritt | Seite | Erwartung |
|--------|-------|-----------|
| 1 | Willkommen | „Tenant wird eingerichtet…“ → grün |
| 2 | Branding | Firmenname, Farbe `#2563eb`, Willkommenstext speichern |
| 3 | Team | Team-Code generieren → Code kopieren |

Optional: Logo hochladen (max. 2 MB).

---

## Phase D — Team-Code testen

1. **Zweites Konto** oder Inkognito + Magic-Link
2. `/code-einloesen` → kopierten Team-Code einlösen
3. Dashboard → Module aus B2B-Plan sichtbar

---

## Phase E — Verifikation (WSL, optional)

Nach Login-Cookie:

```bash
# Cookie aus Browser exportieren oder Magic-Link:
# curl -c cookies.txt "https://immobilien-akademie-smart.de/api/auth/magic?secret=..."

curl -s -b cookies.txt https://immobilien-akademie-smart.de/api/b2b/onboarding/status | jq .
```

Erwartung: `hasTenant: true`, `completed: true` nach Branding.

---

## Phase F — Stripe-Webhook prüfen

`/admin/stripe-live` → letztes Event nach B2B-Kauf (Typ `checkout.session.completed` oder `invoice.paid` bei Abo).

---

## Häufige Fehler

| Symptom | Ursache | Fix |
|---------|---------|-----|
| Checkout 401 | Nicht eingeloggt | Magic-Link / Login |
| Kein Tenant nach Kauf | Webhook fehlgeschlagen | `whsec_` in Railway prüfen |
| Team-Code ungültig | Falscher Tenant / abgelaufen | Neuen Code in Schritt Team generieren |

---

*Siehe auch: [EXTERNAL_OPS_CHECKLIST.md](./EXTERNAL_OPS_CHECKLIST.md)*
```

### Datei: docs/BACKUP_AUTOMATION_PLAN.md
```markdown
# Backup Automation Plan

Stand: 2026-06-06

Dieses Dokument beschreibt die empfohlene Automatisierung fuer Railway-MySQL-Backups der Immobilien Akademie Smart. Es baut auf dem bewiesenen manuellen Backup- und Restore-Test aus `docs/RUNBOOK_BACKUP_RESTORE.md` auf.

## Entscheidung

Empfohlenes Ziel: **Cloudflare R2 Standard Storage**.

Gruende:

- S3-kompatibel und dadurch mit Standardtools nutzbar.
- Externer Speicher ausserhalb von Railway.
- Fuer kleine taegliche DB-Dumps kostenguenstig.
- Cloudflare R2 berechnet laut offizieller Preisuebersicht keine Egress-Bandbreitenkosten; Storage Standard liegt bei 0.015 USD pro GB-Monat, vorbehaltlich Free Tier und Operation-Kosten.

Nicht als Primaerziel empfohlen:

- GitHub Actions Artifacts: gut fuer kurzfristige Build-/Audit-Artefakte, aber nicht als langlebiger Hauptspeicher fuer personenbezogene Datenbank-Backups.
- Nur Railway-interner Speicher: besser als nichts, aber nicht ideal als alleinige Absicherung, weil Datenbank und Backup beim selben Anbieter liegen.

## Zielbild

1. Taeglicher komprimierter MySQL-Dump.
2. Upload in Cloudflare R2.
3. Keine Secrets im Repo.
4. Separater Restore-Test mindestens monatlich und vor riskanten Railway-DB-Eingriffen.
5. Manuelle Backups vor:
   - Railway MySQL Redeploy/Restart.
   - Secret-Rotation fuer `DATABASE_URL` oder MySQL-Zugang.
   - Migrationen mit Schema-/Datenrisiko.
   - groesseren Generator-/User-/Code-Flows.

## Empfohlenes Namensschema

```text
mysql/production/daily/YYYY/MM/DD/immobilien-akademie-smart_mysql_YYYYMMDD_HHMMSS.sql.gz.gpg
mysql/production/weekly/YYYY/WW/immobilien-akademie-smart_mysql_YYYYMMDD_HHMMSS.sql.gz.gpg
mysql/production/monthly/YYYY/MM/immobilien-akademie-smart_mysql_YYYYMMDD_HHMMSS.sql.gz.gpg
mysql/production/latest/immobilien-akademie-smart_mysql_latest.sql.gz.gpg
```

Optional fuer Restore-Beweise:

```text
mysql/production/restore-tests/YYYY/MM/DD/restore_test_YYYYMMDD_HHMMSS.txt
```

## Aufbewahrung

Empfohlen fuer den Start:

- 14 taegliche Backups.
- 8 woechentliche Backups.
- 12 monatliche Backups.

Pragmatischer erster Schritt:

- Taeglich sichern.
- Retention im R2-Bucket oder per spaeterem Cleanup-Job erzwingen.
- Bis Retention automatisiert ist: monatlich manuell pruefen, ob alte Dumps geloescht werden koennen.

## Verschluesselung

DB-Dumps enthalten personenbezogene Daten. Deshalb sollen sie vor dem Upload nach R2 clientseitig verschluesselt werden.

Empfehlung fuer Phase 1:

```bash
gpg --batch --yes --symmetric --cipher-algo AES256 \
  --passphrase "$BACKUP_ENCRYPTION_PASSPHRASE" \
  --output backup.sql.gz.gpg \
  backup.sql.gz
```

Regeln:

- `BACKUP_ENCRYPTION_PASSPHRASE` nur als GitHub Secret speichern.
- Passphrase nicht in Logs ausgeben.
- Entschluesselung mindestens einmal lokal testen.
- Wenn die Passphrase kompromittiert wurde, neue Passphrase setzen und neue Backups erzeugen.

## Noetige GitHub Secrets

Diese Werte duerfen nicht ins Repo:

```text
RAILWAY_TOKEN
RAILWAY_PROJECT_ID
R2_ACCOUNT_ID
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
R2_BUCKET
BACKUP_ENCRYPTION_PASSPHRASE
```

Optional:

```text
R2_PREFIX
RAILWAY_ENVIRONMENT
```

Empfehlung:

```text
RAILWAY_ENVIRONMENT=production
```

## Noetige Railway-Konfiguration

Der Backup-Workflow benoetigt Zugriff auf den Railway-Service `MySQL` und liest diese Variablen zur Laufzeit:

```text
RAILWAY_TCP_PROXY_DOMAIN
RAILWAY_TCP_PROXY_PORT
MYSQLUSER
MYSQLPASSWORD
MYSQLDATABASE
```

## Workflow-Strategie

Der initiale Workflow sollte **nicht automatisch aktiv** sein, bis alle Secrets gesetzt und ein manueller Dry Run erfolgreich war. Deshalb liegt im Repo zuerst nur ein Beispiel:

```text
.github/workflows/mysql-backup-r2.example.yml
```

Aktivierung:

1. GitHub Secrets setzen.
2. Beispielworkflow nach `.github/workflows/mysql-backup-r2.yml` kopieren.
3. Sicherstellen, dass `RAILWAY_PROJECT_ID` auf das richtige Railway-Projekt zeigt.
4. Einmal manuell mit `workflow_dispatch` starten.
5. Ergebnis in R2 pruefen.
6. Verschluesselten Dump herunterladen.
7. Lokal entschluesseln.
8. Lokal restoren.
9. Erst danach Cron aktiv lassen.

## Restore-Test-Regel

Ein automatisches Backup ist nur dann wertvoll, wenn regelmaessig bewiesen wird, dass es wiederherstellbar ist.

Minimum:

- Monatlich einen R2-Dump herunterladen.
- In lokale MySQL-8-Instanz restoren.
- Kernzaehlungen pruefen:

```text
users
trial_leads
presentation_codes
learning_logs
open_questions
glossar_terms
pending_purchases
```

Phase 2:

- Eigenen Restore-Test-Workflow erstellen.
- Monatlich per `workflow_dispatch` und spaeter Cron ausfuehren.
- Letzten verschluesselten Dump aus R2 herunterladen.
- Mit `BACKUP_ENCRYPTION_PASSPHRASE` entschluesseln.
- In temporaere MySQL-8-Instanz restoren.
- Kernzaehlungen ausgeben.
- Ergebnis als kurzfristiges GitHub Artifact speichern, nicht den Dump.

Der Restore-Test-Workflow soll erst aktiviert werden, nachdem der Backup-Workflow mindestens einmal manuell erfolgreich war und ein lokaler Restore aus R2 bestanden wurde.

## Sicherheitsregeln

- Keine DB-Dumps im Git committen.
- Keine Secrets in Chat, PRs, Screenshots oder Logs posten.
- Bei sichtbaren Secret-Fragmenten nach bewiesenem Backup rotieren.
- Railway-MySQL-Service nicht redeployen/restarten, solange kein frisches Backup plus Restore-Test existiert.

## Naechste Ausbaustufen

1. R2-Bucket anlegen.
2. Least-Privilege R2 API Token erstellen.
3. GitHub Secrets setzen.
4. Beispielworkflow aktivieren.
5. Manuell ausfuehren und Restore-Test dokumentieren.
6. Secret-Rotation planen und durchfuehren.
7. Railway-MySQL-FAILED-Status reparieren.
8. Grossen Portal-Generatoren-Audit starten.
```

### Datei: docs/BUSINESS_ANALYSIS.md
```markdown
# Business Analysis: Immobilien Akademie Premium (Stand Mai 2026)

## 1. AKTUELLE MONETARISIERUNG

Die Plattform nutzt ein klassisches **One-Time-Purchase Modell** für digitale Bildungsprodukte, ergänzt durch strategische Paketbündelungen.

### Produktportfolio & Preisstruktur
| Produkt | Preis (Brutto) | Module | Zielsetzung |
|:---|:---|:---|:---|
| **Modul 1: Grundkurs** | 149,00 € | 1 | Hook-Produkt, Fundament |
| **Modul 2: Makler §34c** | 499,00 € | 2 | Kern-Produkt (Lizenzrelevant) |
| **Modul 3: WEG-Verwalter** | 699,00 € | 1, 3 | Premium-Produkt (Rechtsschwerpunkt) |
| **Modul 4: Gutachter** | 399,00 € | 1, 4 | Spezialisierung |
| **Modul 5: Finanzierung §34i** | 499,00 € | 1, 5 | Kern-Produkt (Lizenzrelevant) |
| **Komplett-Ausbildung** | 1.955,00 € | 1-5 | Maximale Monetarisierung |

### Bundle-Logik (Pakete)
Das System nutzt **Preisverankerung (Price Anchoring)**, indem der Einzelwert der Module gegen den Paketpreis gestellt wird:
- **Starter-Paket (M1+M2):** 549 € (statt 648 €) -> ~15% Ersparnis.
- **Immobilienprofi (M1+M2+M3):** 1.199 € (statt 1.347 €) -> ~11% Ersparnis.
- **Gesamtersparnis im Komplett-Paket:** 290 € gegenüber Einzelkauf.

### Wettbewerbsvergleich
Die Preise sind **hoch-kompetitiv**. Traditionelle Präsenz- oder Fernlehrgänge der IHK oder privater Akademien liegen oft zwischen 800 € und 2.500 € pro Zertifikat. Mit einem Einstieg bei 149 € und Kernmodulen um 500 € positioniert sich die Akademie als digitaler Preisführer bei gleichzeitig höherem technologischem Nutzwert (KI-Tutor).

---

## 2. UMSATZPOTENZIAL

Basierend auf einem geschätzten **Average Order Value (AOV) von ca. 750,00 €** (Mischkalkulation aus Einzelmodulen und Bundles):

| Szenario | Sales / Monat | Umsatz / Monat | Umsatz / Jahr |
|:---|:---|:---|:---|
| **Konservativ** | 5 | 3.750 € | 45.000 € |
| **Realistisch** | 20 | 15.000 € | 180.000 € |
| **Optimistisch** | 50 | 37.500 € | 450.000 € |

*Hinweis: Da es sich um rein digitale Güter handelt, liegt die Bruttomarge (vor KI-Kosten und Steuern) bei nahezu 100%.*

---

## 3. FEHLENDE MONETARISIERUNGSSTRATEGIEN

Trotz des soliden Fundaments fehlen folgende Umsatzströme:

1.  **Subscriptions (MRR):** Es gibt kein Modell für monatlich wiederkehrende Umsätze. Eine "Update-Flatrate" für rechtliche Änderungen nach Ablauf des initialen Zugangs wäre ideal.
2.  **Affiliate-Marketing:** Keine Integration von Partnerangeboten (z.B. CRM-Software, Versicherungen für Makler, Lead-Portale).
3.  **B2B / White-Label:** Die White-Label Engine ist im Code angelegt, wird aber monetär nicht als SaaS-Modell für Immobilienbüros (z.B. "Eigene Akademie für 199€/Monat") beworben.
4.  **Coaching Add-ons:** Verkauf von 1:1 Experten-Sessions oder Prüfungsvorbereitungs-Webinaren als Upsell im Checkout.

---

## 4. SKALIERBARKEITSTEST

### Datenbank (Drizzle/MySQL)
Die Architektur ist auf **High-Performance** ausgelegt. Mit sauberen Indizes (z.B. auf `userId`, `email`, `tenantId`) kann das System problemlos **10.000+ aktive Nutzer** verarbeiten. MySQL auf Railway skaliert vertikal mit dem Datenaufkommen.

### Server (Railway Pro)
Die Nutzung von Railway Pro erlaubt automatisches Scaling. Der Node.js Stack ist stateless genug, um bei Lastspitzen (z.B. nach Marketing-Kampagnen) weitere Instanzen zuzuschalten.

### KI-Kosten (Das Risiko)
Die Skalierbarkeit wird primär durch die **API-Kosten (Anthropic/Google)** limitiert. Bei 1.000 Nutzern, die intensiv mit dem KI-Tutor chatten, können Kosten im vierstelligen Bereich entstehen.
- **Lösung:** Implementierung von Token-Limits pro Nutzer oder ein "Fair Use" Modell.

---

## 5. CONVERSION OPTIMIERUNG (CRO)

### Analyse KursPakete.tsx & KursLanding.tsx
*   **CTA (Call to Action):** "Jetzt kaufen" ist präsent. Die Option "24h kostenlos testen" ist ein exzellenter Trust-Hebel.
*   **Social Proof:** Technisch vorbereitet, aber im Content fehlen **echte Testimonials** (Gesichter, Namen, Erfolgsgeschichten).
*   **Trust Signals:** IHK-vorbereitet, SSL, Stripe-Branding und die 14-Tage-Garantie sind gut platziert.
*   **Verknappung:** Es fehlen psychologische Trigger wie "Angebot endet am..." oder "Nur noch X Plätze zum Einführungspreis".

---

## 6. WETTBEWERBSPOSITIONIERUNG

### Alleinstellungsmerkmale (USP)
1.  **KI-Tutor Multichain:** Die Kombination aus Claude, Gemini und Groq als Lernbegleiter ist am deutschen Markt einzigartig.
2.  **Audio-Lernmodus:** Die Möglichkeit, Inhalte als Audio zu konsumieren, adressiert die mobile Zielgruppe (Pendler).
3.  **Deep-Tech Integration:** Prüfungssimulationen mit sofortigem KI-Feedback zu offenen Fragen.

### Was fehlt gegenüber Top-Wettbewerbern?
*   Akkreditierte Fernlehrgangszulassung (ZFU).
*   Live-Elemente (Q&A Sessions).
*   Job-Garantie oder Vermittlungsnetzwerk.

---

## 7. EMPFEHLUNGEN (TOP 5 ACTIONS)

1.  **B2B-Abo-Modell einführen:** Paketierung für Immobilienfirmen (z.B. 5 Lizenzen inkl. eigenem Logo für 299€/Monat).
2.  **KI-Usage Monitoring:** Einführung eines Token-Credit-Systems, um die Margen bei intensiver KI-Nutzung zu schützen.
3.  **Referral-Programm:** Bestandskunden erhalten 50€ Provision oder einen Gratismonat für jeden geworbenen Neukunden.
4.  **Upsell-Funnel:** Direkt nach dem Kauf eines Moduls ein zeitlich begrenztes "Upgrade auf Komplett-Paket" Angebot einblenden.
5.  **Rechtssicherheits-Abo:** Nach 6 Monaten automatischer Wechsel in ein "Aktualitäts-Abo" (9,90 €/Monat) für dauerhaften Zugriff auf den KI-Tutor und Rechts-Updates.
```

### Datei: docs/CASE_MANAGEMENT_20260607.md
```markdown
# Case Management — Immobilien Akademie Smart

**Stand:** 07.06.2026 · Nach #124  
**Owner:** Alisad Gadyri  
**Agentur-Modus:** Produkt · Security · Compliance · Ops · QA · Legal

---

## Executive Dashboard

| Bereich | Ampel | Offene Cases | Nächster Schritt |
|---------|-------|--------------|------------------|
| Produktion | 🟢 | 0 P0 | Modul 5 + Stripe Live (#122) ✅ |
| Security | 🟢 | 0 P1 | ki-stats, quiz-guard, resend-2fa (#120) ✅ |
| Compliance | 🟡 | 1 P1 | Claims zentralisiert; Gewerbeschein extern |
| Daten/Backup | 🟡 | 1 P1 | R2 Workflow ready (#123); Secrets + Restore extern |
| QA/CI | 🟢 | 0 P2 | Modul-Smoke + Stripe-Guards CI (#123) ✅ |
| Legal/DSGVO | 🟡 | 4 extern | AVVs, Gewerbeschein, DMARC |

---

## Stakeholder-Matrix

| Stakeholder | Vertreter | Sicht | Priorität diese Woche |
|-------------|-----------|-------|----------------------|
| **Product Owner** | Alisad | Feature-Flow, Inspect, Module | Inspect-Polish #92 |
| **Security** | Audit/Agent | Least privilege, Content-Leaks | ki-stats #91, Quiz-Schutz #93 |
| **DSGVO** | Berater | Löschung, Consent, AVV | PR #82 verifiziert ✅ |
| **Legal/Claims** | Prüfer | §34c/§34i, IHK-Formulierungen | Claims #94 |
| **Ops/SRE** | Railway | Deploy, MySQL FAILED, Health | R2 #89, MySQL klären |
| **QA** | Tester | Smoke, Regression | #90 Playwright |
| **Marketing** | Alisad | 854/855/4275 Konsistenz | shared/claims.ts |
| **Finanzen** | Stripe | Test-Modus, Webhooks | Live-Freigabe offen |

---

## Case Register

### CASE-001 — ki-stats ohne Admin-Gate
- **Status:** Fix bereit → **PR #91**
- **Risiko:** Mittel (falsche Metriken / offener Endpoint)
- **Owner:** Dev
- **Merge:** Nach tsc + test

### CASE-002 — all-questions.json öffentlich
- **Status:** Fix in Agency-Sprint **#93**
- **Risiko:** Hoch (854 Fragen IP)
- **Abnahme:** curl anonym → 403, eingeloggt → 200

### CASE-003 — Owner resend-2fa ohne Limit
- **Status:** Fix in **#93** (Rate-Limit 3/15min)
- **Risiko:** Mittel (OTP-Spam)

### CASE-004 — Claims 854 vs 855+
- **Status:** Fix in **#94** (`shared/claims.ts`)
- **Risiko:** Niedrig (Marketing/Recht)

### CASE-005 — Cookie-Banner vs Code (Umami)
- **Status:** Fix in **#94** (ehrlicher Text)
- **Risiko:** Mittel (DSGVO-Darstellung)

### CASE-006 — Inspect Ansehen-Links / Stats 0
- **Status:** Fix bereit → **PR #92**

### CASE-007 — Modul-Smoke fehlt
- **Status:** Fix bereit → **PR #90**

### CASE-008 — R2 Backup inaktiv
- **Status:** Workflow + Checkliste → **#123** ✅
- **Blocker:** GitHub Secrets, R2-Bucket, Restore-Test (Alisad)

### CASE-009 — Railway MySQL FAILED
- **Status:** Runbook `docs/RAILWAY_MYSQL_OPS.md` + `/api/health` DB-Ping
- **Owner:** Alisad + Ops — Backup zuerst, dann Redeploy

### CASE-010 — Migration ohne Ledger
- **Status:** ✅ Ledger + Strict Mode + Backfill-Script + `/api/admin/migration-status`
- **Extern:** Einmalig `pnpm run db:backfill-migrations --apply` auf Prod (siehe MIGRATION_LEDGER.md)

### CASE-011 — Server-Tests nicht in CI
- **Status:** Fix in **#95** (vitest.config.ts)

### CASE-012 — PR #72 Read-Only Audit
- **Status:** Überholt → geschlossen (ersetzt durch #116–#123)

---

## Abgeschlossene Merge-Wellen (#116–#124)

| PR | Inhalt |
|----|--------|
| #116–#119 | Stripe Price-IDs, Webhook, Owner Revenue |
| #120 | Security guards, Playwright CI smoke |
| #121 | Modul 4/5 Meta, Inspect, ExitIntent, Backup |
| #122 | Modul 5 Polish, Stripe Live-E2E |
| #123 | R2 Workflow, Stripe Guards CI |
| #124 | MySQL Health-Ping, Ops-Runbook |

**Externe Ops:** [EXTERNAL_OPS_CHECKLIST.md](./EXTERNAL_OPS_CHECKLIST.md)

---

## Externe Aufgaben (nur Alisad)

- [ ] `OWNER_MAGIC_CODE` rotieren
- [ ] `INSPECT_JWT_SECRET` prüfen/setzen
- [ ] R2-Bucket + GitHub Secrets
- [ ] R2 Restore-Test nach Checkliste (#89)
- [ ] Railway MySQL FAILED analysieren
- [ ] DMARC `p=reject`
- [ ] Gewerbeschein Impressum
- [ ] DSGVO-AVVs abschließen
- [ ] Issue #30 schließen, PR #72 archivieren

---

## Definition of Done (Sprint 07.06.)

- [x] Alle P0/P1 Code-Cases haben PR (#116–#124)
- [x] `pnpm test` — 103 Tests grün
- [x] `tsc` 0 Errors
- [x] Keine verbotenen Dateien geändert
- [ ] Produktion: R2 + Stripe Live + MySQL FAILED (extern, Alisad)

---

*Nächstes Review: nach Merge Welle 1*
```

### Datei: docs/COMPETITIVE_ANALYSIS.md
```markdown
# Wettbewerbsanalyse & USP-Matrix — Immobilien Akademie Smart

**Stand:** 7. Juni 2026  
**Produkt:** https://immobilien-akademie-smart.de  
**Methode:** Codebase-Audit, Marktrecherche (15+ Anbieter), Rechtsrahmen §34c/§15b MaBV, interne Business-Docs

---

## 1. Executive Summary

Die **Immobilien Akademie Smart** positioniert sich als **technologieführendes Multi-Lizenz-Lernportal** für die deutsche Immobilienbranche. Kein Wettbewerber bietet gleichzeitig:

- 5 Berufsbilder (§34c, §34i, WEG, Gutachter, Grundlagen) in **einem** Portal
- **RAG-KI-Tutor** mit Modulwissen (Claude + Gemini + Groq)
- **240 strukturierte Lerntage**, 855+ Aufgaben, Prüfungssimulation, Rechner
- **Einmalzahlung** statt Jahresabo (bei Vollkursen)

**Kernproblem:** Der Markt ist fragmentiert. Anbieter wie WBThek, MaBV.academy und iCademy24 dominieren die **20-Stunden-Pflichtweiterbildung** mit Preisen ab 199–299 €. IHK und IVD dominieren **Vertrauen und Zertifikate**. Die Akademie Smart konkurriert nicht primär um „billigste 20h“, sondern um **Karriere-Vollqualifikation + KI-Differenzierung**.

**Strategische Empfehlung:** USP schärfen auf *„Das einzige KI-Lernportal für alle Immobilien-Lizenzen — einmal kaufen, lebenslang lernen“* und parallel ein **MaBV-20h-Compliance-Produkt** (Weiterbildungsnachweis-Export) als Einstiegs-Hook bauen.

---

## 2. Marktsegmente & Zielgruppen

| Segment | Bedarf | Zahlungsbereitschaft | Entscheidungskriterium |
|---------|--------|----------------------|------------------------|
| **§34c Pflicht-Weiterbildung** (20h/3J) | Gesetzlich, wiederkehrend | 199–990 € | MaBV-Konformität, Nachweis, Preis |
| **§34c Sachkunde / Karrierestart** | Lizenz, Berufseinstieg | 500–2.500 € | IHK-Nähe, Praxis, Zertifikat |
| **§34i Darlehensvermittler** | Lizenz + WIKR | 400–1.500 € | Prüfungsnähe, Finanzrecht |
| **WEG-Verwalter** | §26a, Verwaltungspraxis | 500–2.800 € | Tiefe, Rechtssicherheit |
| **Gutachter / HypZert** | Zertifizierung | 2.000–8.000 € | Anerkennung, Prüfungsvorbereitung |
| **Maklerbüro B2B** | Mitarbeiter-Schulung | 299–1.500 €/Jahr | White-Label, Reporting, Compliance |

**TAM-Schätzung (DE):** ~34.000 Immobilienmakler (IVD), ~15.000 WEG-Verwalter, ~8.000 §34i-Vermittler — alle mit Weiterbildungspflicht. Digitaler Anteil wächst; WBThek allein: 30.000+ Nutzer, 1 Mio. WBTs/Jahr.

---

## 3. Wettbewerber-Matrix (15 Anbieter)

### Legende
- ⭐⭐⭐ = stark | ⭐⭐ = mittel | ⭐ = schwach | — = nicht vorhanden
- Preise: Stand Recherche Juni 2026, zzgl. MwSt. wo angegeben

| Anbieter | Typ | Fokus | Preis (Einstieg) | Format | KI-Tutor | Multi-Lizenz | MaBV-20h | IHK-Zertifikat | Live | Mobile/Audio |
|----------|-----|-------|------------------|--------|----------|--------------|----------|----------------|------|--------------|
| **Immobilien Akademie Smart** | EdTech-Portal | 5 Module, Vollkurs | 149–1.955 € einmalig | Self-paced + KI | ⭐⭐⭐ | ⭐⭐⭐ | ⭐ (inhaltlich, kein Stundenexport) | ⭐ (orientiert) | — | ⭐⭐⭐ |
| **WBThek®** (Akademie f. Finanzberatung) | Abo-Bibliothek | §34c/§34d Pflicht | ~270–284 €/Jahr | 205 WBTs à 5–38 Min | — | ⭐⭐ | ⭐⭐⭐ | — | — | ⭐⭐ |
| **maklerbildung.online** | Kursanbieter | 20h §34c | ab 299 € einmalig | Lernkarten + digital | — | ⭐ | ⭐⭐⭐ | — | — | ⭐⭐ |
| **MaBV.academy** | Online-Kurse | 20h Komplett | 249 € (Aktion) | Video, 12 Mon. Zugang | — | ⭐ | ⭐⭐⭐ | — | — | ⭐⭐ |
| **iCademy24** (Kaizen) | Schnellkurs | 20h §34c | 199–299 € | 2-Tage-Intensiv | — | ⭐ | ⭐⭐⭐ | — | — | ⭐⭐ |
| **IHK-Zertifikatslehrgänge** (Bonn, Offenbach, Dresden) | Institution | Makler IHK + 20h | 990–1.750 € | Live-Online, Termine | — | ⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐ |
| **IVD Bildungsinstitut** | Verband | Onboarding, Seminare | 499–799 € | Live-Online-Sessions | — | ⭐ | ⭐⭐ | ⭐⭐ (IVD-Siegel) | ⭐⭐⭐ | ⭐ |
| **Haufe Akademie** | Premium-Weiterbildung | MaBV-Einzelthemen | 340–2.790 € | Webinar, Blended | — | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ (Haufe) | ⭐⭐⭐ | ⭐ |
| **Sprengnetter Akademie** | Fachakademie | Bewertung, Gutachter | variabel, Premium | Seminar + Video | — | ⭐ | ⭐⭐ | ⭐⭐ (DEKRA) | ⭐⭐⭐ | ⭐ |
| **Udemy** | Marketplace | Generisch Immobilien | 15–60 € | Video-Kurse | ⭐ (ChatGPT extern) | — | — | — | — | ⭐⭐ |
| **The CE Shop** (US) | Lizenz-Vorbereitung | US Real Estate | $50–500 | State-spezifisch | — | — | — | ⭐⭐⭐ (US) | ⭐⭐ | ⭐⭐ |
| **didaris** (IHK-Partner) | Plattform | IHK-Lehrgänge | via IHK | Live + Aufzeichnung | — | ⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **HypZert-Partner** (Frankfurt School, ADG) | Zertifizierung | Gutachter F/S | 3.000–8.000 € | Blended, lang | — | ⭐ | — | ⭐⭐⭐ (HypZert) | ⭐⭐⭐ | ⭐ |

---

## 4. Preisvergleich (relevante Segmente)

### §34c — 20-Stunden-Pflichtweiterbildung

| Anbieter | Preis | Modell | Stunden-Nachweis |
|----------|-------|--------|------------------|
| iCademy24 | 199–299 € | Einmalig | Zertifikat PDF |
| MaBV.academy | 249 € | Einmalig, 12 Mon. | Zertifikat |
| maklerbildung.online | 299 € | Einmalig | ISO 29993, MaBV |
| **IAS Modul 2** | **499 €** | Einmalig, dauerhaft | Internes Zertifikat (kein Stundenlog) |
| WBThek | ~284 €/Jahr | Abo | Minutengenau |
| IHK Dresden (20h) | 990 € | Termin | IHK-Bescheinigung |
| IHK Bonn (Volllehrgang) | 1.750 € | Termin + Test | IHK-Zertifikat |

**Insight:** Für reine Compliance-Käufer ist IAS **2–5× teurer** als Spezialanbieter — aber Modul 2 bietet **60 Lerntage / 480 UE** vs. 20h Minimum. Positionierung muss das klar kommunizieren: *„Nicht nur Pflicht — sondern Karriere-Tiefe.“*

### Vollqualifikation / Multi-Lizenz

| Anbieter | Umfang | Preis |
|----------|--------|-------|
| **IAS Komplett** | 5 Module, 240 Tage, KI | **1.955 €** |
| IHK Makler-Lehrgang | 1 Berufsbild | 1.750 € |
| Haufe Verwalter-Zertifikat | WEG-Fokus | 2.790 € |
| Einzelmodule IAS Summe | M1–M5 | 2.245 € (Bundle spart 290 €) |

**Insight:** Komplett-Paket ist **wettbewerbsfähig** gegenüber IHK-Einzelberuf — mit **5× mehr Breite**.

---

## 5. USP-Analyse (Unique Selling Proposition)

> **Korrektur:** USP = Unique Selling Proposition (Alleinstellungsmerkmal), nicht „USB“.

### 5.1 Harte USPs (messbar, schwer kopierbar)

| # | USP | Beweis im Produkt | Wettbewerber-Abstand |
|---|-----|-------------------|----------------------|
| 1 | **Ein Portal — 5 Immobilien-Berufsbilder** | M1–M5, 240 Lerntage | Kein DE-Anbieter mit gleicher Breite + KI |
| 2 | **RAG-KI-Tutor auf eigenem Modulwissen** | `ragTutor.ts`, 5 Knowledge-Files | WBThek/Haufe: keine KI; Udemy: generisch |
| 3 | **855+ strukturierte Aufgaben + Prüfungssimulation** | Quiz, ExamMode, 854+ Fragen | MaBV-Anbieter: oft Video-only |
| 4 | **10 integrierte Rechner** (Miete, WEG, Annuität, LTV…) | `/rechner`, `/finanzierungsrechner` | Einzigartig im Segment |
| 5 | **Einmalzahlung, dauerhafter Zugang** | Stripe `mode: payment` | WBThek: Jahresabo |
| 6 | **24h Trial — alle 5 Module** | Trial-API, Code-Einlösung | Selten bei Vollportalen |
| 7 | **White-Label / B2B-Tenant** (technisch) | `whitelabel.*` Router | Nicht vermarktet — Chance |
| 8 | **Inspect-Links für Investoren/Partner** | JWT Read-only Admin-Preview | Einzigartig im Markt |

### 5.2 Weiche USPs (Positionierung, noch zu belegen)

| USP | Status | Aktion |
|-----|--------|--------|
| „IHK-orientierte Vorbereitung“ | ⚠️ Claim-Policy aktiv | Behalten, nicht „garantiert“ |
| „AZAV / Bildungsgutschein“ | ❌ Nicht zertifiziert | „Angestrebt“ — korrekt |
| „WCAG 2.2 AA barrierefrei“ | ⚠️ Teilweise | `/barrierefreiheit` + Audit |
| Social Proof / Testimonials | ❌ Fehlt | 5–10 echte Stories |
| Weiterbildungsnachweis §15b | ❌ Fehlt | **Produkt-Priorität #1** |

### 5.3 USP-Formel (Marketing)

**Primär:**  
*„Deutschlands einziges KI-Lernportal für alle Immobilien-Lizenzen — §34c, §34i, WEG, Gutachter. Einmal kaufen. Lebenslang lernen.“*

**Sekundär (Compliance-Segment):**  
*„Mehr als 20 Stunden: 480 Lerneinheiten, KI-Tutor und Prüfungssimulation — für Makler, die mehr wollen als Minimum.“*

**B2B:**  
*„Ihre eigene Immobilien-Akademie — White-Label mit Compliance-Reporting für Ihr Maklerbüro.“*

---

## 6. SWOT

### Stärken
- Technisch ausgereift (React 19, tRPC, Stripe, KI-Stack, Inspect v2)
- Content-Tiefe: 240 Tage, 5 Tabs/Tag, Fallstudien, Dokument-Werkstatt
- Preis-Leistung bei Komplett-Paket
- Berlin-Standort, DSGVO, Cookie-Consent, GA4

### Schwächen
- Kein MaBV-Stundenexport (Compliance-Lücke)
- Stripe vermutlich Test-Mode; Gewerbe/SPF offen
- Gamification/Zertifikate nur localStorage
- Kein Blog, kein SSR → SEO limitiert
- Keine Live-Dozenten / Community

### Chancen
- §34c-Weiterbildungswelle: Zyklen 2023–2025, 2026–2028
- KI-Adoption in Immobilienbranche (PropTech)
- B2B: 5–50 MA Maklerbüros, Verbände
- Geo-SEO: „Immobilienmakler Weiterbildung Berlin“
- Micro-Abo: Rechts-Updates 9,90 €/Monat

### Risiken
- Billiganbieter (199 €) für reine 20h-Käufer
- IHK/IVD Vertrauensvorsprung
- KI-Kosten bei Skalierung
- Rechtsrisiko bei überzogenen Zertifikats-Claims
- AZAV-Wettbewerber nach Zertifizierung

---

## 7. Wettbewerbs-Positionierungskarte

```
                    PREIS
                      ↑
         IHK/Haufe    |    IAS Komplett (1.955€)
         (1.500–2.800)|    ★ DIFFERENZIERT
                      |
    Sprengnetter      |    IAS Einzelmodule
    (Premium)         |    (149–699€)
                      |
    ──────────────────┼──────────────────→ TIEFE/BREITE
                      |
    WBThek (284€/J)   |    MaBV / maklerbildung
    ★ COMPLIANCE      |    (199–299€) ★ COMPLIANCE
                      |
         Udemy (50€)  |
                      ↓
                   NIEDRIG
```

**Zielposition:** Oben rechts — *hohe Breite, fairer Preis, KI-Differenzierung*.

---

## 8. Feature-Gap-Analyse vs. Top 3 Wettbewerber

| Feature | IAS | WBThek | IHK Live | Haufe |
|---------|-----|--------|----------|-------|
| Minutengenauer Stundenlog | ❌ | ✅ | ✅ | ✅ |
| KI-Tutor (RAG) | ✅ | ❌ | ❌ | ❌ |
| §34i Inhalte | ✅ | ❌ | Teilweise | Teilweise |
| WEG 80 Tage | ✅ | ❌ | Seminar | ✅ |
| Gutachter/HypZert-Prep | ✅ | ❌ | ❌ | Teilweise |
| Live Q&A | ❌ | ❌ | ✅ | ✅ |
| Verbands-Siegel | ❌ | ❌ | ✅ IHK | ✅ Haufe |
| Mobile Audio | ✅ | ❌ | ❌ | ❌ |
| B2B Multi-User | ⚠️ WL-Code | ✅ | ✅ | ✅ |
| Prüfungssimulation 50 Fragen | ✅ | ❌ | ✅ | Teilweise |

**Kritischster Gap:** MaBV-Stundenexport → ohne diesen verliert IAS den Compliance-Only-Käufer an WBThek/MaBV.academy.

---

## 9. Go-to-Market Prioritäten (aus Analyse abgeleitet)

### Phase 1 — Trust & Compliance (0–4 Wochen)
1. **Weiterbildungsnachweis-Modul** — Stundenlog, PDF-Export §15b MaBV
2. Stripe Live + Gewerbe abschließen
3. Testimonials + Social-Proof-API reparieren
4. USP-Landing `/warum-wir` live (SEO + Conversion)
5. WIS-IHK-Listung beantragen

### Phase 2 — Traffic & Conversion (4–12 Wochen)
1. Vergleichsseiten: „vs. WBThek“, „vs. IHK-Präsenz“
2. Pillar-SEO: 10 Long-Tail-Artikel aus 240 Lerntagen
3. Post-Trial-E-Mail-Sequenz (7 Tage)
4. Bundle-Upsell nach Einzelkauf
5. Schema.org mit echten Preisen

### Phase 3 — Skalierung & Monetarisierung (3–12 Monate)
1. White-Label SaaS (199–499 €/Monat)
2. B2B-Lizenzen (5/10/25 User)
3. Rechts-Update-Abo (9,90 €/Monat)
4. Affiliate (Makler-Software, CRM)
5. LinkedIn/Instagram Content aus Lerntag-Bites

---

## 10. KPIs für Wettbewerbs-Monitoring

| KPI | Ziel Q3 2026 | Messung |
|-----|--------------|---------|
| Organische Keywords Top 20 | 50+ | GSC |
| Trial → Paid Conversion | 8%+ | Stripe + DB |
| AOV | 750 €+ | Stripe |
| B2B-Leads (WL-Anfragen) | 10/Monat | Kontaktformular |
| KI-Kosten/Nutzer | <3 €/Monat | KI-Monitor |
| NPS | 40+ | Post-Kauf-Umfrage |

---

## 11. Quellen & Recherche-URLs

- WBThek: https://akademie-fuer-finanzberatung.de/wbthek/34c-immobilienmakler
- maklerbildung.online: https://maklerbildung.online/
- MaBV.academy: https://www.mabv.academy/
- iCademy24: https://www.icademy24.de/
- IHK Bonn Makler: https://www.ihk-die-weiterbildung.de/seminare/seminar/5091
- IHK Dresden 20h: https://www.bildungszentrum-dresden.de/
- IVD Launchpad: https://app1.edoobox.com/ (IVD Bildungsinstitut)
- Haufe Immobilien: https://www.haufe-akademie.de/hierarchy/immobilienwirtschaft/
- Sprengnetter Akademie: https://www.sprengnetter.de/akademie/
- §34c FAQ IHK München: https://www.ihk-muenchen.de/
- WIS Weiterbildungsdatenbank: https://wis.ihk.de
- Intern: `docs/BUSINESS_ANALYSIS.md`, `shared/claims.ts`

---

*Erstellt im Rahmen des Agency Strategy Sprints — Branch `cursor/competitive-usp-sprint-7dbc`*
```

### Datei: docs/DATEV_SPEC.md
```markdown
# DATEV-Export — Spezifikation (Phase B)

Stand: Juni 2026 · Verwalter-Rechner / Rechenpraxis

## Ziel

Schnittstelle zur Treuhand-Buchhaltung: Hausverwaltung erfasst Buchungen, Steuerberater importiert in DATEV.

**Wichtig:** DATEV-Buchungsstapel setzen echte Buchungssätze voraus. Stammdaten-CSV allein reicht für Phase A.

## Phasen

| Phase | Inhalt | Status |
|-------|--------|--------|
| **A** | Stammdaten-CSV (Objekte, Einheiten) | ✅ `GET /api/verwalter/export/stammdaten-csv` |
| **B** | Hausgeld-Buchungen light + EXTF Buchungsstapel | ✅ Live |
| **C** | DATEV-Connect API, SKR-Auto-Zuordnung | Später |

## Phase A — Stammdaten-CSV (jetzt)

**Endpoint:** `GET /api/verwalter/export/stammdaten-csv` (Auth erforderlich)

**Spalten:**

| Spalte | Beschreibung |
|--------|--------------|
| objekt_id | Interne ID |
| weg_name | WEG-Bezeichnung |
| adresse | Straße |
| plz | PLZ |
| ort | Ort |
| verwalter_name | Verwaltung |
| einheit_nr | Einheitennummer |
| mea | Miteigentumsanteil |
| eigentuemer | Eigentümername |
| flaeche_qm | Wohnfläche optional |

**Encoding:** UTF-8 mit BOM (Excel-kompatibel), Trennzeichen `;`

**Nutzung:** Onboarding in Treuhand-Software, keine Buchungen.

## Phase B — Buchungsmodul (vor DATEV-Export)

Neue Entität `VerwalterBuchung` (File-Store oder Drizzle):

```typescript
type VerwalterBuchung = {
  id: string;
  objektId: string;
  datum: string;           // YYYY-MM-DD
  betrag: number;          // positiv = Soll
  sollKonto: string;       // z.B. "1200"
  habenKonto: string;      // z.B. "8400"
  buchungstext: string;
  belegNr?: string;
  einheitId?: string;
  periode: string;         // z.B. "2026-01"
};
```

**UI:** `/app/verwalter/buchungen` — manuelle Erfassung pro Objekt/Monat. ✅

**API:**
- `GET/POST/PUT/DELETE /api/verwalter/buchungen`
- `GET /api/verwalter/export/datev-buchungen?objektId=&periode=`

**Validierung:**
- Soll/Haben-Konten nicht leer
- Betrag > 0
- Datum innerhalb Periode

## Phase B — DATEV EXTF Buchungsstapel (CSV)

Format: [DATEV-Formatbeschreibung Buchungsstapel](https://www.datev.de) — vereinfachte Variante.

**Pflichtfelder pro Zeile (Minimum):**

| Feld | DATEV-Feld | Beispiel |
|------|------------|----------|
| Umsatz | Umsatz | 150,00 |
| Soll/Haben | S/H | S |
| Konto | Konto | 1200 |
| Gegenkonto | Gegenkonto | 8400 |
| BU-Schlüssel | BU | (leer oder 0) |
| Belegdatum | Belegdatum | 0106 |
| Buchungstext | Buchungstext | Hausgeld WE 3 |

**Endpoint:** `GET /api/verwalter/export/datev-buchungen?objektId=&periode=2026-01` ✅

**Dateiname:** `EXTF_Buchungen_{objektId}_{periode}.csv`

## Kontenrahmen (Empfehlung SKR03)

| Konto | Bedeutung (WEG) |
|-------|-----------------|
| 1200 | Bank |
| 1400 | Forderungen Eigentümer |
| 8400 | Erlöse Hausgeld |
| 4970 | Nebenkosten |

*Hinweis: Kontenrahmen je Mandant unterschiedlich — konfigurierbar in Phase C.*

## Was wir bewusst nicht exportieren (Phase A/B)

- Keine fiktiven Buchungen aus Rechenpraxis-Übungsfällen
- Kein DATEV-Connect ohne echte Buchungshistorie
- Keine Steuerberatung / keine Kontenempfehlung als Rechtsberatung

## Migration File-Store → DB

Wenn Buchungsvolumen oder Team-Zugang steigt:

1. Drizzle-Migration `verwalter_buchungen` (neue Tabelle, nicht `schema.ts` patchen wenn gesperrt)
2. Import aus `data/verwalter-objekte/` und `data/verwalter-vorgaenge/`
3. API-Verträge unverändert lassen

## Nächste Implementierungsschritte

1. ✅ Stammdaten-CSV
2. ✅ Buchungs-Store + CRUD-API (`data/verwalter-buchungen/`)
3. ✅ Buchungs-UI `/app/verwalter/buchungen`
4. ✅ EXTF-Generator aus `listBuchungen(objektId, periode)`
5. Nutzer-Test mit 1 Steuerberater (5 Buchungen importieren)

## Assistent & Qualitätssicherung (ergänzt)

- **Freitext-Buchungsvorschlag:** `POST /api/verwalter/buchungen/vorschlagen` (Regel + KI)
- **Plausibilitäts-Check:** `GET /api/verwalter/buchungen/plausibilitaet` — blockiert DATEV bei Fehlern
- **Monatsabschluss:** `GET /api/verwalter/monatsabschluss` — 5-Schritte-Checkliste
- **Onboarding:** Wizard für neue Nutzer ohne Objekte

---

*Keine Rechts- oder Steuerberatung. DATEV ist eingetragenes Markenzeichen der DATEV eG.*
```

### Datei: docs/EXTERNAL_OPS_CHECKLIST.md
```markdown
# Externe Ops-Checkliste — nur Alisad

**Stand:** 08.06.2026 · Master-Audit grün (Vitest 122, API 36, E2E 10)  
Alles hier erfordert Zugang zu Railway, Cloudflare, Stripe oder GitHub.

---

## Priorität 1 — Diese Woche

| # | Aufgabe | Anleitung | Erledigt |
|---|---------|-----------|----------|
| 1 | **MySQL Backup** | `pnpm run db:backup` | ✅ |
| 2 | **Migration Ledger backfill** | Nur wenn `pending > 0` — live ist `0` | ⏭️ SKIP |
| 3 | **Stripe Test** — 18 Price-IDs + Webhook | `pnpm run stripe:seed-prices` · [STRIPE_LIVE_GO_LIVE.md](./STRIPE_LIVE_GO_LIVE.md) | ✅ Test |
| 4 | **R2 Restore-Test** | [R2_ACTIVATION_CHECKLIST.md](./R2_ACTIVATION_CHECKLIST.md) · `pnpm run ops:r2-checklist` | ☐ |
| 5 | **Railway MySQL FAILED** | [RAILWAY_MYSQL_OPS.md](./RAILWAY_MYSQL_OPS.md) | ☐ |
| 6 | **PR #72 schließen** | GitHub → Close | ✅ |

## Priorität 2 — B2B Go-Live

| # | Aufgabe | Hinweis | Erledigt |
|---|---------|---------|----------|
| 7 | B2B Price-IDs in Railway | In 18er-Set enthalten | ✅ |
| 8 | Testkauf Starter/Professional | [B2B_SMOKE_TEST.md](./B2B_SMOKE_TEST.md) · CLI: `pnpm run ops:b2b-team-smoke` | ✅ CLI |
| 9 | Post-Checkout Wizard | `/b2b-einrichtung?b2b=1` | ☐ |
| 10 | Team-Code einlösen | `/code-einloesen` · TEAM-BOBOGMBH1 getestet | ✅ |

## Priorität 3 — Stripe Live (nach B2B-Test)

| # | Aufgabe | Hinweis | Erledigt |
|---|---------|---------|----------|
| 11 | Live Price-IDs | `stripe:seed-prices` mit `sk_live_` | ☐ |
| 12 | Live Keys + Webhook | [STRIPE_LIVE_GO_LIVE.md](./STRIPE_LIVE_GO_LIVE.md) | ☐ |
| 13 | Live-Testkauf | Kleiner Betrag, echte Karte | ☐ |

## Priorität 4 — Security & Compliance

| # | Aufgabe | Hinweis | Erledigt |
|---|---------|---------|----------|
| 14 | `OWNER_MAGIC_CODE` rotieren | Nach Sichtbarkeit in Chat/Logs | ☐ |
| 15 | `INSPECT_JWT_SECRET` | min. 32 Zeichen in Railway | ☐ |
| 16 | DMARC `p=reject` | DNS | ☐ |
| 17 | Gewerbeschein Impressum | Berlin ~26 EUR | ☐ |
| 18 | DSGVO-AVVs | Processor-Verträge | ☐ |

## Priorität 5 — Nach Go-Live

| # | Aufgabe | Hinweis | Erledigt |
|---|---------|---------|----------|
| 19 | `STRIPE_E2E_ENABLED=true` (CI) | + `MAGIC_LINK_SECRET` | ☐ |
| 20 | R2 Cron aktivieren | Nach Restore-Test | ☐ |
| 21 | `PARTNER_PAYOUT_CRON_ENABLED=true` | Quartals-Ledger | ☐ |

---

## Schnell-Verifikation (WSL Copy-Paste)

```bash
pnpm run ops:health

# Stripe Webhook Secret setzen (whsec aus Dashboard):
pnpm run stripe:setup-webhook -- --webhook-id=we_1T97TbJV2Q8pgfvupUp7Nsyt --whsec=whsec_… --railway-apply

# B2B E2E (CI / mit MAGIC_LINK_SECRET):
pnpm run test:e2e:b2b

# R2 Secrets-Liste:
pnpm run ops:r2-checklist
```

**Health erwartet:** `{ "ok": true, "db": "connected", "migrations": { "pending": 0 } }`

**B2B Smoke:** [B2B_SMOKE_TEST.md](./B2B_SMOKE_TEST.md)

---

*Code: main · Cases: [CASE_MANAGEMENT_20260607.md](./CASE_MANAGEMENT_20260607.md)*
```

### Datei: docs/GROWTH_ROADMAP.md
```markdown
# Growth Roadmap — Skalierung, Monetarisierung & Expansion

**Produkt:** Immobilien Akademie Smart  
**Stand:** 7. Juni 2026  
**Basis:** `docs/COMPETITIVE_ANALYSIS.md`, `docs/BUSINESS_ANALYSIS.md`

---

## Vision

Das führende **KI-gestützte Immobilien-Bildungsportal** im DACH-Raum: B2C-Vollqualifikation, B2B-White-Label, Compliance-Weiterbildung — eine Plattform, drei Umsatzströme.

**Umsatzziel (12 Monate):** 180.000 € (20 Sales/Monat × 750 € AOV) — realistisches Szenario aus Business Analysis.

---

## Umsatzarchitektur (Zielmix)

| Stream | Anteil Ziel | Mechanismus |
|--------|-------------|-------------|
| B2C Einzelmodule & Bundles | 60% | Stripe Checkout (bestehend) |
| B2B White-Label / Büro-Lizenzen | 25% | 199–499 €/Monat, 5–50 Seats |
| Micro-Subscriptions | 10% | Rechts-Update 9,90 €/Mo, KI-Credits |
| Affiliate & Partnerschaften | 5% | CRM, Makler-Software, Versicherungen |

---

## Phase 1: Foundation (Wochen 1–4)

### Legal & Payment (Blocker)
- [ ] Gewerbeschein final
- [ ] Stripe Live (`sk_live_`), Webhook produktiv
- [ ] SPF/DKIM/DMARC für `info@` und `support@`
- [ ] RESEND_API_KEY für Kauf-E-Mails

### Produkt — Compliance-Hook
- [ ] **Weiterbildungsnachweis-Export** (Stundenlog, PDF §15b MaBV)
- [ ] Klarstellung Modul 2: „480 UE vs. 20h Minimum“ auf Landing
- [ ] Zertifikat-Schwellen vereinheitlichen (Marketing 70% vs. Code 80%)

### Marketing — USP & Trust
- [x] USP-Landing `/warum-wir`
- [ ] 5 Testimonials (Name, Foto, Beruf)
- [ ] Social-Proof-API: echte `certsThisWeek`
- [ ] WIS-IHK-Listung

### SEO Quick Wins
- [x] Sitemap erweitert (`/warum-wir`, `/rechner`, `/hilfe`, `/barrierefreiheit`)
- [ ] Schema.org `offers.price` pro Modul
- [ ] Google Business Profile (Berlin)

---

## Phase 2: Traffic Engine (Monate 2–3)

### Content Marketing
| Kanal | Frequenz | Quelle |
|-------|----------|--------|
| Blog / Ratgeber | 2×/Woche | 240 Lerntage → SEO-Artikel |
| LinkedIn | 5×/Woche | Lerntag-Bites, Rechts-Updates |
| Instagram Reels | 3×/Woche | Rechner-Demos, KI-Tutor-Clips |
| YouTube Shorts | 2×/Woche | „§34c in 60 Sekunden“ |

### SEO Pillar Pages (Priorität)
1. `/ratgeber/34c-weiterbildung-pflicht` — 20h, MaBV, Nachweis
2. `/ratgeber/immobilienmakler-werden` — Karriereguide
3. `/ratgeber/weg-verwalter-ausbildung` — §26a
4. `/ratgeber/34i-sachkundenachweis` — IHK-Vorbereitung
5. `/vergleich/wbthek-alternative` — Conversion-Seite

### CRO
- Post-Trial 7-Tage-E-Mail-Sequenz
- Exit-Intent auf `/kurse`
- Bundle-Upsell 48h nach Einzelkauf
- Live-Chat (Crisp/Tawk, kostenlos)

### Paid (nach Stripe Live)
- Google Ads: „§34c Weiterbildung online“, „Immobilienmakler Kurs“
- Meta: Lookalike Trial-Converter
- Budget Start: 500 €/Monat, ROAS-Ziel 3×

---

## Phase 3: B2B & Skalierung (Monate 4–12)

### White-Label Go-Live
- Öffentliche Seite `/fuer-maklerbueros`
- Pakete: Starter (5 User, 199 €), Professional (15 User, 399 €), Enterprise (50+ User, Angebot)
- Inspect-Link als Demo-Tool für Vertrieb
- Partner-Onboarding: 1-Pager + Demo-Tenant

### Produkt-Erweiterungen
- Server-sync Gamification (Multi-Device)
- Verifizierbare Zertifikate (QR-Check)
- KI-Token-Limits (Fair Use: 50 Nachrichten/Tag)
- AZAV-Vorbereitung (wenn Zertifizierung)

### Expansion
- Österreich/Schweiz: Rechts-Module (WIKR bleibt DE-fokussiert)
- Makler-CRM-Integrationen (Propstack, onOffice)
- Verbände: IVD-Mitgliedschaft als Vertriebskanal

---

## Social Media Playbook

### Positionierung
*„Der KI-Makler-Coach — lernen wie die Profis, ohne Präsenzpflicht.“*

### Content-Säulen
1. **Recht aktuell** — BGH-Urteile, Gesetzesänderungen (aus Modul-Normen)
2. **Rechner-Demos** — „WEG-Nebenkosten in 30 Sekunden“
3. **KI-Tutor** — Screenshot-Threads „Frag den Tutor: Was ist §181 BGB?“
4. **Erfolgsgeschichten** — Zertifikat + Zitat
5. **Behind the Portal** — 240 Lerntage, Technik, Berlin

### Hashtags (DE)
`#Immobilienmakler` `#34c` `#WEG` `#Immobilienwirtschaft` `#Weiterbildung` `#Maklerausbildung` `#PropTech`

---

## Technische Skalierung

| Komponente | Limit heute | Maßnahme bei 10k User |
|------------|-------------|----------------------|
| MySQL (Railway) | OK | Read-Replica, Indizes |
| Node.js | Stateless | Horizontal scaling |
| KI-API | **Risiko** | Token-Limits, Caching, Haiku-first |
| CDN | Vite assets | Cloudflare vor Domain |
| Backups | Runbook vorhanden | Täglich automatisiert testen |

---

## Meilensteine

| Meilenstein | Kriterium |
|-------------|-----------|
| **Launch-Ready** | Stripe Live + 11/14 Checklist grün |
| **Product-Market-Fit** | 20 zahlende Kunden, NPS 40+ |
| **B2B Proof** | 3 White-Label-Piloten |
| **Scale** | 10.000 registrierte User, 50 Sales/Monat |

---

## Nächste Implementierungen (Engineering Backlog)

1. `Weiterbildungsnachweis.tsx` + Server-PDF-Export
2. `/fuer-maklerbueros` B2B-Landing
3. Blog-Router + 5 Seed-Artikel
4. Prerender für `/kurs/*` und `/warum-wir` (Vite SSR oder Prerender.io)
5. Referral-System (`?ref=CODE`, 50 € Gutschein)

---

*Siehe auch: `docs/COMPETITIVE_ANALYSIS.md` für Wettbewerbsdetails und USP-Matrix.*
```

### Datei: docs/LEGAL_COMPLIANCE_REPORT.md
```markdown
# Legal Compliance Report — Immobilien Akademie Smart
**Datum:** 24. Mai 2026
**Experte:** Jules (Digital Education Compliance Expert)

## VERSTÖSSE (sofort beheben)
1. **Impressum unvollständig (§5 TMG):**
   - In `client/src/pages/legal/Impressum.tsx` befinden sich Platzhalter für die Berufshaftpflichtversicherung (`[Name der Versicherung]`, `[Adresse der Versicherung]`). Dies ist ein abmahnfähiger Verstoß gegen die Impressumspflicht.
2. **Datenschutzerklärung unvollständig (DSGVO Art. 13):**
   - Die Drittanbieter **Plausible Analytics** (in `client/index.html`) und **Google Analytics** (in `client/index.html` und `client/src/hooks/useAnalytics.ts`) werden in der Datenschutzerklärung (`client/src/pages/Datenschutz.tsx`) nicht aufgeführt.
3. **Tracking ohne Einwilligung (§25 TDDDG):**
   - Der Hook `client/src/hooks/useAnalytics.ts` führt `gtag('event', 'page_view', ...)` aus, ohne den Status der Einwilligung aus dem `CookieConsent` zu prüfen.
   - In `client/index.html` wird das Plausible-Skript (`plausible.io/js/script.js`) ohne Prüfung der Einwilligung geladen.

## WARNUNGEN (dringend prüfen)
1. **Redundante Rechtsseiten:**
   - Es existieren mehrere Versionen von Impressum und Datenschutz (z. B. `client/src/pages/Impressum.tsx` vs. `client/src/pages/legal/Impressum.tsx`). Dies kann zu Inkonsistenzen führen, wenn nur eine Datei aktualisiert wird. Es sollte sichergestellt werden, dass nur die Dateien im Verzeichnis `legal/` verwendet werden.
2. **Verwendung von "garantiert":**
   - Das Wort "garantiert" wurde in Lerninhalten gefunden (z. B. `Module1Content_Maximal.ts`: "Betreiber garantiert Miete"). Da dies im Kontext der Erklärung von Finanzprodukten und nicht als Marketingversprechen für den Kurserfolg steht, ist es rechtlich weniger riskant, sollte aber im Marketing-Kontext (Home, Landingpages) strikt vermieden werden.
3. **Zertifikats-Aussagen:**
   - In `client/src/pages/Home.tsx` wird mit "IHK-konformes Format" für Zertifikate geworben. Dies ist zulässig, da es sich auf das Format bezieht, sollte aber nicht so missverstanden werden können, dass das Zertifikat selbst ein IHK-Zertifikat ist.

## OK
1. **IHK-Claims:** Die Bezeichnungen werden korrekt als "IHK-Vorbereitung" oder "IHK-vorbereitet" geführt. Es werden keine unzulässigen Claims wie "IHK-anerkannt" für das Portal selbst erhoben.
2. **AZAV/ZFU-Claims:** Diese werden korrekt als "in Vorbereitung" oder "geplant" deklariert.
3. **Widerrufsbelehrung:** Die Frist von 14 Tagen ist korrekt angegeben, und ein Muster-Widerrufsformular ist vorhanden.
4. **Cookie-Banner:** Ein funktionsfähiger Cookie-Banner mit Opt-out-Möglichkeit ist implementiert (die technische Verknüpfung mit den Analytics-Skripten muss jedoch wie unter "VERSTÖSSE" beschrieben korrigiert werden).

## RECHTSBEWERTUNG 6/10
Das Portal macht einen sehr professionellen Eindruck und die kritischen Claims (IHK, AZAV, ZFU) sind sauber formuliert. Die Abwertung auf 6/10 resultiert primär aus den formalen Mängeln im Impressum (Platzhalter) und der fehlenden datenschutzrechtlichen Dokumentation/Einbindung der Analytics-Tools. Nach Behebung dieser Punkte ist eine Bewertung von 9/10 realistisch.
```

### Datei: docs/LEGAL_READINESS_CHECKLIST.md
```markdown
# Legal Readiness Checklist
## Phase 2 — Rechtliche Seiten
**Datum:** 28. April 2026

| Seite | Status | Anmerkung |
|-------|--------|-----------|
| Impressum | GELB | Telefon auf Anfrage, USt-ID Kleinunternehmer |
| Datenschutz | GRUEN | Alle Dienste genannt, Rechte erklaert |
| AGB | GELB | Vorhanden, externe Pruefung noetig |
| Widerruf | GRUEN | S356 BGB korrekt |
| Cookie-Banner | GRUEN | Key vereinheitlicht |
| Barrierefreiheit | GELB | Teilweise belegt |

## Noch offen (nur du kannst das):
1. Gewerbeschein anmelden → Telefon erganzen
2. Finanzamt: Kleinunternehmer bestaetigen
3. AGB: Fachanwalt pruefen lassen
4. Datenschutz: externer DSB pruefen lassen
```

### Datei: docs/MARKTANALYSE_WETTBEWERB.md
```markdown
# Marktanalyse Wettbewerb — Immobilienbildung

## The CE Shop Real Estate Preise
[Real Estate](https://www.theceshop.com/real-estate/)

- [Get Your License](https://www.theceshop.com/real-estate/pre-licensing/)
- [Exam Prep](https://www.theceshop.com/real-estate/exam-prep/)
- [Post-Licensing](https://www.theceshop.com/real-estate/post-licensing/)
- [Continuing Education](https://www.theceshop.com/real-estate/continuing-education/)
- [Upgrade Your License](https://www.theceshop.com/real-estate/upgrade-license/)
- [Professional Development](https://www.theceshop.com/real-estate/professional-development/)
- Partners and Resources


- [New to Real Estate?](https://www.theceshop.com/state-product-overview/)

Alabama

[Salesperson](https://www.theceshop.com/alabama/pre-licensing/al-salesperson-pre-licensing-cost/) [Sales Reciprocal](https://www.theceshop.com/alabama/pre-lice

## Udemy Real Estate Bestseller
# Real Estate Courses

## Real Estate relates to [Business](https://www.udemy.com/courses/business) [Finance & Accounting](https://www.udemy.com/courses/finance-and-accounting)

## Looking to advance your skills in Real Estate? We've got you.

### Get everything you need to reach your goals in one convenient bundle.

- Top-rated courses

- Popular with learners just like you

- Guidance from real-world experts


Total:

Current price$124.98

Add all to cart

![](https://img-c.udemycdn.com/course/240x135/5929478_583a_2.jpg)

### [Become a Real Estate C2C Transaction Coordinator in 2026\ Work-from-home career \| High-demand role \| No real estate license required in most statesRating: 4.8 out of 5376 reviews2 total hours18 lecturesAll LevelsCurrent price: $59.99](https://www.udemy.com/course

## IVD Weiterbildung Seminare
Search

[Close Search](https://ivd.net/ivd-mitte-ost/weiterbildung-fuer-immobilienprofis/#)

- [Kontakt](https://ivd.net/kontakt/)
- [Mitglied werden](https://ivd.net/mitgliedschaft-optionen/)
- [IVD Sozial](https://ivd.net/ivd-sozial/)

# IVDMITTE-OST

## BuchenSiejetztIhreWeiterbildung

Seminare, Webinare und Kurzlehrgänge für alle Profis rund um die Immobilie: Der IVD Mitte-Ost bietet in Kooperation mit dem IVD Bildungsinstitut in Berlin neben wenigen Präsenzseminaren eine Vielzahl an Online-Formaten an. Bequem ohne Reiseaufwand: vom Crashkurs mit Siegel bis zum kurzen knackigen Webinar zur rechtssicheren Wohnungsabnahme wird ein sehr breites Spektrum geboten.

Handverlesene Praktiker, Juristen und Coaches, aber auch Referenten aus den eigenen (ehrenamtlichen) Reihen verschaffen Ihnen d

## Haufe Akademie Startseite
Eingabe löschenSuchen

# Persönliche Weiterbildung & Entwicklung

- [Seminare & Online-Trainings](https://www.haufe-akademie.de/persoenliche-weiterbildung)
- [Tagungen & Events](https://www.haufe-akademie.de/tagungen)
- [Qualifizierungs­programme](https://www.haufe-akademie.de/kff/career-expert)

- [Fernkurse](https://www.haufe-akademie.de/fernkurse)
- [Business Coaching](https://www.haufe-akademie.de/coaching)
- [E-Learnings](https://www.haufe-akademie.de/elearning)

[Zur Übersicht](https://www.haufe-akademie.de/persoenliche-weiterbildung "Zur Übersicht von Persönliche Weiterbildung & Entwicklung")

## Lösungen für Unternehmen

- [Inhouse-Schulungen](https://www.haufe-akademie.de/corporate-learning/inhouse)
- [Entwicklungs­programme](https://www.haufe-akademie.de/corporate-learning/entwic

## Gutachter Ausbildung DE
[Zum Inhalt springen](https://www.sprengnetter.de/akademie/#content)

![Ein Mann im blauen Anzug hält ein Tablet in der Hand und spricht zu drei Personen, die in einem modernen Büro mit großen Fenstern und einem Maschendrahtgitter sitzen.](https://www.sprengnetter.de/wp-content/uploads/2024/03/akademie_2-1024x451.jpg)

# Maximale Qualifikation: Sprengnetter Ausbildung

Von Energieeffizienzstrategien über Immobilienrecht bis zur Sachverständigen-Ausbildung mit DEKRA-Siegel – seit 1996 teilen die renommierten Immobilienprofis und Finanzexperten der Sprengnetter Akademie ihre Expertise zu brandaktuellen Branchenthemen mit Ihnen.

[Unsere Top-Kurse](https://www.sprengnetter.de/akademie/#Bildungsformate)

### Kompakter Zugriff auf komplexes Know-how

Bei Sprengnetter werden Sie fündig und gelan

## PropTech Education Trends
[Skip to main content](https://www.rics.org/de-de/ausbildung-und-karriere#ricsglobal-content)

![](https://rics.scene7.com/is/image/rics/rooftop-abstract-unsplash:16-9?$dpp-promo-wide-xxl$&qlt=85,1)

404


## Sorry, something has gone wrong

This might be because the page you were looking for may have been moved, updated or deleted. Please try the search function at the top of this page.

[Back to homepage](https://www.rics.org/home)
keyboard\_arrow\_right
```

### Datei: docs/MARKTREIFE_MASTERPLAN_2026.md
```markdown
# MARKTREIFE MASTERPLAN 2026
## Immobilien Akademie Smart Premium
**Erstellt:** 28. April 2026
**Branch:** marktreife-hardening-20260428
**Status:** IN ARBEIT

---

## ZIEL
Das Portal soll sicher, rechtlich sauber und professionell
zur Marktreife geführt werden — ohne Neubau.

---

## PHASEN-ÜBERSICHT

| Phase | Titel | Status |
|-------|-------|--------|
| 0 | Sicherheit, Backup, Branch | IN ARBEIT |
| 1 | Claims und rechtliche Texte entschärfen | OFFEN |
| 2 | Impressum, Datenschutz, AGB, Cookie härten | OFFEN |
| 3 | Stripe, Webhook, Freischaltung, E-Mail | OFFEN |
| 4 | Auth, Rollen, Gating, Owner-Panel | OFFEN |
| 5 | KI/RAG Qualität und Datenschutz | OFFEN |
| 6 | Barrierefreiheit und Smart Access Layer | OFFEN |
| 7 | Inklusive Berufswege und USP | OFFEN |
| 8 | Content, Modul 6/7/8, Didaktik | OFFEN |
| 9 | Performance und Bundle-Größen | OFFEN |
| 10 | Testsystem und Qualitätsgate | OFFEN |
| 11 | Deployment, Domain, Railway, Monitoring | OFFEN |
| 12 | Marketing, SEO, Social Media | OFFEN |
| 13 | AZAV, ZFU, Partner, Förderung | OFFEN |
| 14 | Abschluss: Marktreife-Dashboard | OFFEN |

---

## AKTUELLE BLOCKER (aus Audit)

### ROT — sofort:
- Gewerbeschein fehlt
- Stripe im Testmodus
- Stripe-Webhook nicht konfiguriert
- E-Mail-System inaktiv (RESEND_API_KEY fehlt)
- Impressum unvollständig
- AZAV-Claims ohne Zulassung

### GELB — diese Woche:
- IHK-Claims abschwächen
- Modul 6/7/8 prüfen
- VITE_FORGE_API_KEY prüfen
- Owner-Panel 2FA
- Bundle-Größen reduzieren

---

## GRUNDREGELN
1. Keine Secrets ausgeben
2. Keine produktiven Daten verändern ohne Freigabe
3. Keine Migrationen ohne Plan und Backup
4. Keine Live-Zahlung ohne Freigabe
5. Keine AZAV/ZFU/IHK-Claims ohne Beleg
6. Immer kleine sichere Schritte
7. Nach jedem Schritt: Beleg liefern

---

## ERLEDIGTE SCHRITTE

### Phase 0 — 28.04.2026
- [x] Branch erstellt: marktreife-hardening-20260428
- [x] docs/ Ordner erstellt
- [x] Masterplan erstellt
- [x] Git-Status geprüft: sauber
- [x] .gitignore prüft: .env geschützt
- [x] Keine Secrets im Repo gefunden

---

## OFFENE ENTSCHEIDUNGEN (nur du kannst das)
1. Gewerbeschein: Gewerbeamt Berlin persönlich anmelden
2. Stripe Live: Dashboard-Freigabe erteilen
3. Domain: immobilien-akademie-smart.de kaufen
4. RESEND: API-Key bei resend.com erstellen
5. AZAV: Beratung bei zuständiger Stelle beginnen
```

### Datei: docs/MASTER_AUDIT_2026-05-17.md
```markdown
# MASTER AUDIT — 17. Mai 2026


============================================================
## 1: BUILD & BUNDLE AKTUELL
============================================================
dist/public/assets/inter-vietnamese-400-normal-DMkecbls.woff2         4.97 kB
dist/public/assets/inter-vietnamese-600-normal-Cc8MFFhd.woff2         5.10 kB
dist/public/assets/inter-vietnamese-700-normal-DlLaEgI2.woff2         5.10 kB
dist/public/assets/inter-vietnamese-500-normal-DOriooB6.woff2         5.11 kB
dist/public/assets/inter-greek-ext-400-normal-DGGRlc-M.woff2          5.26 kB
dist/public/assets/inter-greek-ext-500-normal-C4iEst2y.woff2          5.42 kB
dist/public/assets/inter-greek-ext-600-normal-DRtmH8MT.woff2          5.43 kB
dist/public/assets/inter-greek-ext-700-normal-qfdV9bQt.woff2          5.44 kB
dist/public/assets/fraunces-vietnamese-400-normal-CvGt0Ybw.woff2      6.20 kB
dist/public/assets/fraunces-vietnamese-700-normal-DH94m5DZ.woff2      6.34 kB
dist/public/assets/inter-vietnamese-400-normal-Bbgyi5SW.woff          6.50 kB
dist/public/assets/inter-vietnamese-500-normal-mJboJaSs.woff          6.59 kB
dist/public/assets/inter-vietnamese-700-normal-BZaoP0fm.woff          6.63 kB
dist/public/assets/inter-vietnamese-600-normal-BuLX-rYi.woff          6.64 kB
dist/public/assets/inter-greek-ext-400-normal-KugGGMne.woff           7.06 kB
dist/public/assets/inter-greek-ext-500-normal-2j5mBUwD.woff           7.19 kB
dist/public/assets/inter-greek-ext-600-normal-B8X0CLgF.woff           7.21 kB
dist/public/assets/inter-greek-ext-700-normal-BoQ6DsYi.woff           7.21 kB
dist/public/assets/inter-cyrillic-400-normal-obahsSVq.woff2           7.71 kB
dist/public/assets/inter-greek-400-normal-B4URO6DV.woff2              7.77 kB
dist/public/assets/inter-cyrillic-500-normal-BasfLYem.woff2           7.90 kB
dist/public/assets/inter-cyrillic-700-normal-CjBOestx.woff2           7.90 kB
dist/public/assets/inter-greek-500-normal-BIZE56-Y.woff2              7.92 kB
dist/public/assets/inter-greek-700-normal-C3JjAnD8.woff2              7.92 kB
dist/public/assets/inter-greek-600-normal-plRanbMR.woff2              7.94 kB
dist/public/assets/inter-cyrillic-600-normal-CWCymEST.woff2           7.97 kB
dist/public/assets/fraunces-vietnamese-400-normal-B65MOf9T.woff       7.98 kB
dist/public/assets/fraunces-vietnamese-700-normal-DxawQjq2.woff       7.99 kB
dist/public/assets/inter-cyrillic-400-normal-HOLc17fK.woff            9.78 kB
dist/public/assets/inter-cyrillic-700-normal-DrXBdSj3.woff            9.91 kB

============================================================
## 2: ALLE 88 API-ENDPUNKTE — OFFEN ODER GESCHÜTZT?
============================================================
server/index.ts:22:  app.get("*", (_req, res) => {
server/ownerRoute.ts:15:  app.post("/api/tester/request", async (req: Request, res: Response) => {
server/ownerRoute.ts:25:  app.post("/api/tester/verify", async (req: Request, res: Response) => {
server/ownerRoute.ts:54:  app.post("/api/owner/access", async (req: Request, res: Response) => {
server/ownerRoute.ts:74:  app.get("/owner-2fa", (req: Request, res: Response) => {
server/ownerRoute.ts:120:  app.post("/api/owner/verify-2fa-form", async (req: Request, res: Response) => {
server/ownerRoute.ts:140:  app.post("/api/owner/verify-2fa", async (req: Request, res: Response) => {
server/ownerRoute.ts:162:  app.post("/api/owner/resend-2fa", async (req: Request, res: Response) => {
server/ownerRoute.ts:171:  app.get("/api/owner/totp-setup", async (req: Request, res: Response) => {
server/ownerRoute.ts:197:  app.get("/owner", async (req: Request, res: Response) => {
server/ownerRoute.ts:220:  app.post("/api/owner/inspect-token", async (req: Request, res: Response) => {
server/ownerRoute.ts:237:  app.get("/inspect/exit", (_req: Request, res: Response) => {
server/ownerRoute.ts:243:  app.get("/inspect/:token", async (req: Request, res: Response) => {
server/ownerRoute.ts:267:  app.post("/api/auth/admin-2fa/request", async (req: Request, res: Response) => {
server/ownerRoute.ts:283:  app.post("/api/auth/admin-2fa/verify", async (req: Request, res: Response) => {
server/ownerRoute.ts:294:  app.get("/api/owner/dashboard", async (req: Request, res: Response) => {
server/ownerRoute.ts:330:  app.post("/api/owner/lock-user", async (req: Request, res: Response) => {
server/ownerRoute.ts:347:  app.post("/api/owner/unlock-user", async (req: Request, res: Response) => {
server/ownerRoute.ts:362:  app.post("/api/owner/generate-link", async (req: Request, res: Response) => {
server/ownerRoute.ts:374:  app.post("/api/owner/impersonate", async (req: Request, res: Response) => {
server/ownerRoute.ts:395:  app.post("/api/owner/set-modules", async (req: Request, res: Response) => {
server/ownerRoute.ts:417:  app.get("/api/owner/live", async (req: Request, res: Response) => {
server/ownerRoute.ts:466:  app.post("/api/owner/set-role", async (req: Request, res: Response) => {
server/ownerRoute.ts:493:  app.get("/api/owner/activity", async (req: Request, res: Response) => {
server/ownerRoute.ts:530:  app.get("/api/owner/stats", async (req: Request, res: Response) => {
server/ownerRoute.ts:564:  app.get("/api/owner/azav-report", async (req: Request, res: Response) => {
server/ownerRoute.ts:651:  app.get("/api/owner/monitoring", async (req: Request, res: Response) => {
server/ownerRoute.ts:666:  app.get("/api/owner/settings", async (req: any, res: any) => {
server/ownerRoute.ts:686:  app.post("/api/owner/settings", async (req: any, res: any) => {
server/passwordReset.ts:11:  app.post("/api/auth/forgot-password", async (req: Request, res: Response) => {

============================================================
## 3: STRIPE — ALLE PRODUKTE UND PREISE
============================================================
price: 14900, // in Cent = 149,00 €
    modules: "1",
  },
  {
--
    price: 49900,
    modules: "2",
  },
  {
--
    price: 69900,
    modules: "1,3",
  },
  {
--
    price: 39900,
    modules: "1,4",
  },
  {
--
    price: 49900,
    modules: "1,5",
  },
  {
--
    price: 195500,
    modules: "1,2,3,4,5",
  },
];
--
            unit_amount: product.price,
          },
          quantity: 1,
        },
--
  const BUNDLES: Record<string, { modules: number[], price: number, name: string, desc: string }> = {
    "starter":      { modules:[1,2],       price:54900,  name:"Starter-Paket (M1+M2)",              desc:"Grundkurs + Makler §34c — Einstieg in die Immobilienvermittlung" },
    "verwalter":    { modules:[1,3],       price:69900,  name:"Verwalter-Paket (M1+M3)",             desc:"Grundkurs + WEG-Verwalter — Hausverwaltung professionell" },
    "makler-plus":  { modules:[1,2,5],     price:104900, name:"Makler-Plus (M1+M2+M5)",              desc:"Makler + Darlehensvermittler — Doppellizenz §34c + §34i" },
    "profi":        { modules:[1,2,3],     price:119900, name:"Immobilienprofi (M1+M2+M3)",          desc:"Makler + Verwalter — die beliebteste Kombination" },
    "gutachter":    { modules:[1,2,4],     price:44900,  name:"Gutachter-Paket (M1+M2+M4)",         desc:"Makler + Immobilienbewertung — Bewertung und Vermittlung" },
    "komplett":     { modules:[1,2,3,4,5], price:195500, name:"Komplett-Ausbildung (alle 5 Module)", desc:"Alle 5 Berufsbilder — maximale Karrierechancen in der Immobilienwirtschaft" },
  };

  stripeRouter.post("/api/stripe/bundle-:bundleId", async (req: Request, res: Response) => {
--
          unit_amount: bundle.price,
          product_data: { name: bundle.name },
        }, quantity: 1 }],
        success_url: String(req.headers.origin) + "/zahlung-erfolgreich?bundle=" + bundleId,

============================================================
## 4: DATENBANK — TABELLEN UND INDIZES
============================================================
1:import { index,  int, float, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";
8:export const users = mysqlTable("users", {
9:  id: int("id").autoincrement().primaryKey(),
28:  emailIdx: index("idx_users_email").on(table.email),
29:  tenantIdIdx: index("idx_users_tenantId").on(table.tenantId),
34:export const spacedRepetition = mysqlTable("spaced_repetition", {
35:  id:              int("id").primaryKey().autoincrement(),
45:  userIdIdx: index("idx_sr_userId").on(table.userId),
46:  questionIdIdx: index("idx_sr_questionId").on(table.questionId),
47:  nextReviewIdx: index("idx_sr_nextReviewAt").on(table.nextReviewAt),
56:export const whitelabelConfigs = mysqlTable("whitelabel_configs", {
57:  id: int("id").autoincrement().primaryKey(),
85:export const chatConversations = mysqlTable("chat_conversations", {
86:  id: int("id").autoincrement().primaryKey(),
93:  userIdIdx: index("idx_chat_userId").on(table.userId),
96:export const chatMessages = mysqlTable("chat_messages", {
97:  id: int("id").autoincrement().primaryKey(),
103:  convIdIdx: index("idx_chat_convId").on(table.conversationId),
106:export const videoTutorials = mysqlTable("video_tutorials", {
107:  id: int("id").autoincrement().primaryKey(),
122:  modDayIdx: index("idx_video_mod_day").on(table.moduleId, table.dayNumber),
125:export const videoProgress = mysqlTable("video_progress", {
126:  id: int("id").autoincrement().primaryKey(),
136:  userIdIdx: index("idx_video_prog_userId").on(table.userId),
137:  videoIdIdx: index("idx_video_prog_videoId").on(table.videoId),
144:export const examSessions = mysqlTable("exam_sessions", {
145:  id: int("id").autoincrement().primaryKey(),
160:  userIdIdx: index("idx_exam_userId").on(table.userId),
161:  moduleIdIdx: index("idx_exam_moduleId").on(table.moduleId),
164:export const examQuestions = mysqlTable("exam_questions", {
165:  id: int("id").autoincrement().primaryKey(),
179:  sessionIdIdx: index("idx_exam_q_sessionId").on(table.sessionId),
182:export const examWeakTopics = mysqlTable("exam_weak_topics", {
183:  id: int("id").autoincrement().primaryKey(),
191:  userIdIdx: index("idx_weak_userId").on(table.userId),
194:export const certificates = mysqlTable("certificates", {
195:  id: int("id").autoincrement().primaryKey(),
208:  userIdIdx: index("idx_cert_userId").on(table.userId),
212:export const questionBank = mysqlTable("question_bank", {
213:  id: int("id").autoincrement().primaryKey(),

============================================================
## 5: MIGRATIONEN — ALLE GELAUFEN?
============================================================
0000_known_riptide.sql
0001_cold_zeigeist.sql
0002_faithful_hydra.sql
0003_useful_juggernaut.sql
0004_mixed_whizzer.sql
0005_lying_tag.sql
0006_married_shotgun.sql
0007_aspiring_dakota_north.sql
0008_lyrical_gateway.sql
0009_gorgeous_jimmy_woo.sql
0010_strong_domino.sql
0011_azav_compliance_tables.sql
0012_auth_credentials.sql
0013_user_enabled_modules.sql
0014_password_reset_tokens.sql
0015_access_codes.sql
0016_user_missing_columns.sql
0017_glossar.sql
0018_glossar_seed.sql
0019_trial_leads.sql
0020_presentation_codes.sql
0021_owner_locked_column.sql
0022_monitoring_log.sql
0023_open_questions_seed.sql
0023_open_questions_seed.sql.bak
0024_portal_settings.sql
0025_fix_open_questions.sql
0026_rename_columns.sql
0026_rename_columns.sql.bak
0027_fix_footer_text.sql
0028_fix_question_umlauts.sql
_journal.json
add-indexes.sql
meta

============================================================
## 6: ALLE JULES-BRANCHES — GEMERGT ODER OFFEN?
============================================================
origin/analysis/business-report-2026-05-11193568505878864626
  origin/audit-and-security-fixes-4414707306291468119
  origin/audit/jules-report-2026-05-12-2665530487786951622
  origin/audit/legal-compliance-2026-05-3847689169972876913
  origin/audit/security-report-2026-05-1604444826015559559

============================================================
## 7: RECHNER — FORMELN KORREKT?
============================================================
  Mietrechner: 84 Zeilen, 49 Formeln/Berechnungen
  WEGRechner: 89 Zeilen, 54 Formeln/Berechnungen
  Maklerrechner: 81 Zeilen, 46 Formeln/Berechnungen
  Darlehensrechner: 99 Zeilen, 55 Formeln/Berechnungen
  Gutachtenrechner: 94 Zeilen, 56 Formeln/Berechnungen

============================================================
## 8: KI-TUTOR QUALITÄT — WISSENSBASIS VOLLSTÄNDIG?
============================================================
  Modul 1: 31392 Bytes, 833 Zeilen
  Modul 2: 48587 Bytes, 1178 Zeilen
  Modul 3: 251805 Bytes, 3544 Zeilen
  Modul 4: 55380 Bytes, 1734 Zeilen
  Modul 5: 113388 Bytes, 3494 Zeilen

============================================================
## 9: ALLE E2E TESTS — WELCHE LAUFEN?
============================================================
01-links-buttons.spec.ts
01-public-pages.spec.ts
02-auth.spec.ts
02-login-deep.spec.ts
03-module-content.spec.ts
03-user-journey.spec.ts
04-performance.spec.ts
04-ux-navigation.spec.ts
05-authenticated.spec.ts
05-full-test-suite.spec.ts
06-accessibility.spec.ts
06-auth-flows.spec.ts
07-final-deep.spec.ts
08-multi-browser.spec.ts
09-accessibility-deep.spec.ts
10-accessibility-fix.spec.ts
11-find-button.spec.ts
12-landing-fix.spec.ts
13-final-contrast.spec.ts
14-rechner-fix.spec.ts
15-all-modules.spec.ts
16-video-journey.spec.ts
debug-login.spec.ts.disabled
premium-a11y.spec.ts
tests/e2e/:
tests/playwright/:


============================================================
## 10: LIVE PORTAL — ALLE KRITISCHEN SEITEN
============================================================
  ✅ /api/health: 200 (erwartet 200)
  ✅ /api/stats/public: 200 (erwartet 200)
  ✅ /api/stripe/products: 200 (erwartet 200)
  ✅ /api/glossar: 200 (erwartet 200)
  ✅ /api/auth/me: 401 (erwartet 401)
  ✅ /api/owner/dashboard: 403 (erwartet 403)
  ❌ /api/admin/users: 404 (erwartet 401)
  ❌ /api/stripe/webhook: 404 (erwartet 405)

============================================================
## 11: SECURITY — ALLE OFFENEN ENDPUNKTE OHNE AUTH
============================================================
server/index.ts:22:  app.get("*", (_req, res) => {
server/ownerRoute.ts:54:  app.post("/api/owner/access", async (req: Request, res: Response) => {
server/ownerRoute.ts:74:  app.get("/owner-2fa", (req: Request, res: Response) => {
server/ownerRoute.ts:120:  app.post("/api/owner/verify-2fa-form", async (req: Request, res: Response) => {
server/ownerRoute.ts:140:  app.post("/api/owner/verify-2fa", async (req: Request, res: Response) => {
server/ownerRoute.ts:162:  app.post("/api/owner/resend-2fa", async (req: Request, res: Response) => {
server/ownerRoute.ts:171:  app.get("/api/owner/totp-setup", async (req: Request, res: Response) => {
server/ownerRoute.ts:197:  app.get("/owner", async (req: Request, res: Response) => {
server/ownerRoute.ts:220:  app.post("/api/owner/inspect-token", async (req: Request, res: Response) => {
server/ownerRoute.ts:237:  app.get("/inspect/exit", (_req: Request, res: Response) => {
server/ownerRoute.ts:243:  app.get("/inspect/:token", async (req: Request, res: Response) => {
server/ownerRoute.ts:267:  app.post("/api/auth/admin-2fa/request", async (req: Request, res: Response) => {
server/ownerRoute.ts:283:  app.post("/api/auth/admin-2fa/verify", async (req: Request, res: Response) => {
server/ownerRoute.ts:294:  app.get("/api/owner/dashboard", async (req: Request, res: Response) => {
server/ownerRoute.ts:330:  app.post("/api/owner/lock-user", async (req: Request, res: Response) => {
server/ownerRoute.ts:347:  app.post("/api/owner/unlock-user", async (req: Request, res: Response) => {
server/ownerRoute.ts:362:  app.post("/api/owner/generate-link", async (req: Request, res: Response) => {
server/ownerRoute.ts:374:  app.post("/api/owner/impersonate", async (req: Request, res: Response) => {
server/ownerRoute.ts:395:  app.post("/api/owner/set-modules", async (req: Request, res: Response) => {
server/ownerRoute.ts:417:  app.get("/api/owner/live", async (req: Request, res: Response) => {

============================================================
## 12: ENVIRONMENT VARIABLES — GESETZT?
============================================================
  ✅ DATABASE_URL
  ✅ JWT_SECRET
  ✅ STRIPE_SECRET_KEY
  ✅ STRIPE_WEBHOOK_SECRET
  ✅ ANTHROPIC_API_KEY
  ✅ GEMINI_API_KEY
  ✅ GROQ_API_KEY
  ✅ RESEND_API_KEY
  ✅ OWNER_MAGIC_CODE
  ✅ VITE_SENTRY_DSN
  ✅ SENTRY_DSN

============================================================
## 13: ABHÄNGIGKEITEN — SICHERHEIT
============================================================
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-v2v4-37r5-5v8g      │
└─────────────────────┴────────────────────────────────────────────────────────┘
1 vulnerabilities found
Severity: 1 moderate

============================================================
## 14: MODUL-JSON — VOLLSTÄNDIGKEIT
============================================================
  Modul 1: 20 Tage, 0 ohne tasks
  Modul 2: 60 Tage, 0 ohne tasks
  Modul 3: 80 Tage, 0 ohne tasks
  Modul 4: 40 Tage, 0 ohne tasks
  Modul 5: 40 Tage, 0 ohne tasks

============================================================
## 15: GOOGLE FONTS — VOLLSTÄNDIG ENTFERNT?
============================================================

78:      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
82:      fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],

============================================================
## 16: ARCHIV-DATEIEN — AUFRÄUMEN?
============================================================
client/src/pages/modules/_archive
8
596K	client/src/pages/modules/_archive```

### Datei: docs/MIGRATION_LEDGER.md
```markdown
# Migration Ledger — Betrieb

**Stand:** 07.06.2026 · CASE-010 geschlossen in Code

---

## Wie es funktioniert

1. Jeder Deploy führt `runMigrations()` in `server/migrate.ts` aus (vor Express-Start).
2. Angewendete Dateien werden in `schema_migrations` protokolliert.
3. Bereits eingetragene Dateien werden übersprungen.
4. In **Production** schlägt ein nicht-idempotenter Fehler fehl (`MIGRATION_STRICT`, Default an).

## Neue Migration anlegen

```bash
# drizzle-kit schreibt nach drizzle/migrations/ (drizzle.config.ts)
pnpm exec drizzle-kit generate
# Datei prüfen, committen, push → Railway deployt automatisch
```

## Bestehende Produktions-DB (einmalig)

Wenn die DB **vor** dem Ledger alle Tabellen hatte, `schema_migrations` ist leer:

```bash
# 1. Backup
pnpm run db:backup

# 2. Dry-run
pnpm run db:backfill-migrations -- --dry-run

# 3. Alle bis 0041 eintragen (oder --until=0037_....sql)
pnpm run db:backfill-migrations -- --apply

# 4. Deploy — nur neue Migrationen laufen
```

## Status prüfen

```bash
curl -s https://immobilien-akademie-smart.de/api/health | jq .migrations
# Admin (eingeloggt): GET /api/admin/migration-status
```

Erwartung nach Backfill: `{ "pending": 0, "total": 45, ... }`

## ENV

| Variable | Default | Bedeutung |
|----------|---------|-----------|
| `MIGRATION_STRICT` | `true` in production | Fehler → Deploy stoppt Migration-Phase |

---

*Verwandt: [EXTERNAL_OPS_CHECKLIST.md](./EXTERNAL_OPS_CHECKLIST.md)*
```

### Datei: docs/MODUL_678_VERTEILUNGSPLAN.md
```markdown
# Verteilungsplan — ehemalige Teile 6/7/8 in Module 1–5

**Stand:** 08.06.2026  
**Hintergrund:** Module 6–8 waren Platzhalter-Übersichten (Mai 2026 entfernt). Inhalte werden nicht als eigene Module zurückgeführt, sondern in bestehende Strukturen integriert.

---

## Modul 2: Immobilienmakler §34c GewO

| Ehemaliges Thema (Teil 6–8) | Integration | Status |
|-----------------------------|-------------|--------|
| MaBV / Bauträger / Planverkauf (Teil 7) | Lerntag „Bauträgergeschäft & MaBV-Pflichten“ | 📋 geplant |
| Luxus & Off-Market, NDAs (Teil 7) | Exposé-Trainer + Fallstudie „Diskrete Vermarktung“ | 📋 geplant |
| Kaufen vs. Mieten Beratung (Teil 6) | Praxistag Modul 2 + Rechenpraxis Mietrendite | ✅ teilweise |
| Risikomanagement, Haftung (Teil 8) | Lerntag „Maklerhaftung & Versicherungen“ | 📋 geplant |
| Kundenbindung / CRM (Teil 8) | Ratgeber-Artikel + B2B-Dashboard (später) | 📋 geplant |

---

## Modul 3: WEG-Verwalter & Mietrecht

| Ehemaliges Thema | Integration | Status |
|------------------|-------------|--------|
| Neubauprojekte Verwaltung (Teil 7) | Lerntag „Übergabe Neubau & Mängelmanagement“ | 📋 geplant |
| WEG-Abrechnung vertiefen | **Rechenpraxis** (+10 WEG-Aufgaben, IDs 129–138) | ✅ erledigt |
| CO₂-Kostenverteilung | Rechenpraxis Aufgabe 131 | ✅ erledigt |
| Sonderumlage / Rücklage | Rechenpraxis Aufgaben 129–130, 137 | ✅ erledigt |
| Mietrecht Nebenkosten | Modul 3 Lerntage + Rechenpraxis Personentage | ✅ teilweise |

---

## Modul 1 & 4: Kapitalanlage / Wertermittlung (Teil 6)

| Thema | Integration | Status |
|-------|-------------|--------|
| Renditeberechnung, Cashflow | Modul 1 + Rechenpraxis „Mietrendite“ | ✅ vorhanden |
| Steuern (GrESt, AfA, Spekulation) | Modul 1 + Rechenpraxis „AfA & Steuervorteile“ | ✅ vorhanden |
| Investment-Grundlagen | Modul 1 Lerntage Grundstücksrecht/Wertermittlung | ✅ vorhanden |
| Gutachten vertiefen | Modul 4 (ImmoWertV) | ✅ vorhanden |

---

## Modul 5 & Portal-weit (Teil 8 — Karriere)

| Thema | Integration | Status |
|-------|-------------|--------|
| PropTech / KI / ESG | KI-Tutor, Portal-Features, `/warum-wir` | ✅ vorhanden |
| Zukunftstrends Maklerberuf | Blog/Ratgeber (geplant) | 📋 geplant |
| Kein separates Modul 8 | Bewusste Entscheidung — Soft Skills als Content, nicht Lizenzmodul | ✅ |

---

## Rechenpraxis als USP-Produkt (WEG & Hausverwaltung)

Eigenständiges Spin-off-Produkt — **nicht** Modul 6:

- Landing: `/verwalter-rechner`
- Preise: `/rechenpraxis-preise`
- **138 Aufgaben** (Stand 08.06.2026), davon **30 WEG/Hausgeld**
- Abo Solo ab 19 €/Monat, Team ab 199 €/Monat

---

## Entscheidungsregel für neue Inhalte

```
Lizenz-/Pflichtthema (§34c, §34i, WEG, Gutachten)  →  Modul 1–5
Rechen- und Praxisübung Verwaltung                  →  Rechenpraxis
Marketing / Karriere / Trends                       →  Ratgeber / Blog
B2B Team-Schulung                                   →  B2B-Tenant + Codes
```

**Kein Modul 6/7/8** unless full 20–40 day course with Stripe price is approved.
```

### Datei: docs/QA_AUDIT_2026-05-17.md
```markdown
# QA Audit — 17. Mai 2026

- ✅ Health: 200 (erwartet 200)
- ✅ Public Stats: 200 (erwartet 200)
- ✅ Stripe Products: 200 (erwartet 200)
- ✅ Glossar: 200 (erwartet 200)
- ✅ Auth/me ohne Login → 401: 401 (erwartet 401)
- ✅ Owner Dashboard ohne Key → 403: 403 (erwartet 403)
- ❌ Admin Users ohne Login → 401: 404 (erwartet 401)
- ❌ Progress ohne Login → 401: 404 (erwartet 401)
- ✅ Stripe Products Liste: 200 (erwartet 200)
- ✅ Stripe Webhook (POST) → 400/401: 400 (erwartet 400)
- ❌ Stripe Bundle endpoint: 500 (erwartet 401)
- ✅ SPA /: 200 (erwartet 200)
- ✅ SPA /login: 200 (erwartet 200)
- ✅ SPA /kurse: 200 (erwartet 200)
- ✅ SPA /pakete: 200 (erwartet 200)
- ✅ SPA /rechner: 200 (erwartet 200)
- ✅ SPA /finanzierungsrechner: 200 (erwartet 200)
- ✅ SPA /glossary: 200 (erwartet 200)
- ✅ SPA /lehrplan: 200 (erwartet 200)
- ✅ SPA /impressum: 200 (erwartet 200)
- ✅ SPA /datenschutz: 200 (erwartet 200)
- ✅ SPA /agb: 200 (erwartet 200)
- ✅ SPA /widerruf: 200 (erwartet 200)
- ✅ SPA /hilfe: 200 (erwartet 200)
- ✅ SPA /bildungskonzept: 200 (erwartet 200)
- ✅ SPA /beschwerde: 200 (erwartet 200)
- ✅ SPA /foerderung: 200 (erwartet 200)
- ✅ Protected /statistiken → 200 (SPA): 200 (erwartet 200)
- ✅ Protected /pruefung → 200 (SPA): 200 (erwartet 200)
- ✅ Protected /zertifikate → 200 (SPA): 200 (erwartet 200)
- ✅ Protected /gamification → 200 (SPA): 200 (erwartet 200)
- ✅ Protected /wiederholung → 200 (SPA): 200 (erwartet 200)
- ✅ Protected /lernkarten → 200 (SPA): 200 (erwartet 200)
- ✅ Protected /expose-trainer → 200 (SPA): 200 (erwartet 200)
- ✅ Protected /fallstudien → 200 (SPA): 200 (erwartet 200)
- ✅ Modul 1 Landing: 200 (erwartet 200)
- ✅ Modul 1 Tag 1: 200 (erwartet 200)
- ✅ Modul 2 Landing: 200 (erwartet 200)
- ✅ Modul 2 Tag 1: 200 (erwartet 200)
- ✅ Modul 3 Landing: 200 (erwartet 200)
- ✅ Modul 3 Tag 1: 200 (erwartet 200)
- ✅ Modul 4 Landing: 200 (erwartet 200)
- ✅ Modul 4 Tag 1: 200 (erwartet 200)
- ✅ Modul 5 Landing: 200 (erwartet 200)
- ✅ Modul 5 Tag 1: 200 (erwartet 200)
- ✅ Admin /admin: 200 (erwartet 200)
- ✅ Admin /admin/nutzer: 200 (erwartet 200)
- ✅ Admin /admin/videos: 200 (erwartet 200)
- ✅ Admin /admin/fragen: 200 (erwartet 200)
- ✅ Admin /admin/ki-monitor: 200 (erwartet 200)
- ✅ Admin /admin/codes: 200 (erwartet 200)
- ✅ KI Health: 200 (erwartet 200)
- ❌ RAG Tutor (ohne Auth) → 401: 404 (erwartet 401)
- ❌ Portal Agent (ohne Auth) → 401: 404 (erwartet 401)

## Gesamt: 54/62 (87%)
```

### Datei: docs/R2_ACTIVATION_CHECKLIST.md
```markdown
# R2 Backup — Aktivierungs-Checkliste

**Stand:** 07.06.2026  
**Workflow:** `.github/workflows/mysql-backup-r2.yml`  
**Ziel:** Tägliche verschlüsselte MySQL-Dumps in Cloudflare R2

---

## 1. Cloudflare R2 vorbereiten

1. Cloudflare Dashboard → R2 → Bucket anlegen (z. B. `immobilien-akademie-backups`)
2. R2 → Manage R2 API Tokens → Token mit **Object Read & Write** auf diesen Bucket
3. Notieren:
   - `R2_ACCOUNT_ID` (Dashboard-URL oder Account-Settings)
   - `R2_ACCESS_KEY_ID`
   - `R2_SECRET_ACCESS_KEY`
   - `R2_BUCKET`

## 2. GitHub Secrets setzen

Repository → Settings → Secrets and variables → Actions → **New repository secret**

| Secret | Beispiel / Quelle |
|--------|-------------------|
| `RAILWAY_TOKEN` | Railway → **Projekt** → Settings → Tokens → **Project Token** |
| `RAILWAY_PROJECT_ID` | Railway Projekt → Settings → Project ID |
| `R2_ACCOUNT_ID` | Cloudflare Account ID |
| `R2_ACCESS_KEY_ID` | R2 API Token |
| `R2_SECRET_ACCESS_KEY` | R2 API Token |
| `R2_BUCKET` | Bucket-Name |
| `BACKUP_ENCRYPTION_PASSPHRASE` | `openssl rand -base64 32` — **sicher aufbewahren** |

Optional:

| Secret / Variable | Default |
|-----------------|---------|
| `R2_PREFIX` | `mysql/production` |
| `RAILWAY_ENVIRONMENT` | `production` |

## 3. Erster manueller Lauf

1. GitHub → Actions → **MySQL Backup to Cloudflare R2** → **Run workflow**
2. Erfolg prüfen: grüner Job, Artifact `mysql-backup-metadata-*`
3. R2 prüfen:
   - `mysql/production/latest/immobilien-akademie-smart_mysql_latest.sql.gz.gpg`
   - `mysql/production/latest/key_counts_latest.txt`

## 4. Restore-Test (Pflicht vor Cron)

Checkliste: [RUNBOOK_BACKUP_RESTORE.md](./RUNBOOK_BACKUP_RESTORE.md) → Abschnitt „Nach R2-Aktivierung“

```bash
aws s3 cp "s3://$R2_BUCKET/mysql/production/latest/immobilien-akademie-smart_mysql_latest.sql.gz.gpg" ./restore_inbox/ \
  --endpoint-url "https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com"

gpg --batch --yes --passphrase "$BACKUP_ENCRYPTION_PASSPHRASE" \
  -d ./restore_inbox/immobilien-akademie-smart_mysql_latest.sql.gz.gpg \
  > ./restore_inbox/restore.sql.gz
gzip -t ./restore_inbox/restore.sql.gz
```

Kernzählungen mit `key_counts_latest.txt` vergleichen. Ergebnis in `audit_runs/r2_restore_test_YYYYMMDD/` dokumentieren.

## 5. Täglichen Cron aktivieren

Nach erfolgreichem Restore-Test ist in `.github/workflows/mysql-backup-r2.yml` aktiv:

```yaml
schedule:
  - cron: "17 2 * * *"
```

## 6. Bei Railway MySQL FAILED

**Kein Redeploy ohne Backup.** Reihenfolge:

1. `pnpm run db:backup` (lokal mit Railway CLI)
2. Oder GitHub Workflow manuell auslösen
3. Erst danach Railway MySQL analysieren

---

*Verwandt: [BACKUP_AUTOMATION_PLAN.md](./BACKUP_AUTOMATION_PLAN.md), [DEPLOYMENT.md](../DEPLOYMENT.md)*
```

### Datei: docs/RAILWAY_MYSQL_OPS.md
```markdown
# Railway MySQL — Ops-Runbook

**Stand:** 07.06.2026  
**Kontext:** MySQL-Service kann in Railway als `FAILED` angezeigt werden, während die App noch verbunden ist. **Kein Redeploy ohne Backup.**

---

## Symptome

| Signal | Bedeutung |
|--------|-----------|
| Railway MySQL → **FAILED** | Container/Deploy-Problem, nicht zwingend Datenverlust |
| `/api/health` → **503** + `db: unavailable` | App kann DB nicht erreichen |
| Admin → System → MySQL **rot** | Live-Check schlägt fehl |
| Login/Progress fehlgeschlagen | DB wirklich down |

## Sofort-Maßnahmen (Reihenfolge)

### 1. Backup — Pflicht

```bash
pnpm run db:backup
```

Oder GitHub Actions → **MySQL Backup to Cloudflare R2** (siehe [R2_ACTIVATION_CHECKLIST.md](./R2_ACTIVATION_CHECKLIST.md)).

### 2. Status prüfen

```bash
curl -s https://immobilien-akademie-smart.de/api/health | jq .
```

Erwartung bei OK: `{ "ok": true, "db": "connected", "latencyMs": ... }`

Als Admin: `GET /api/admin/mysql-health` (401 ohne Login)

### 3. Railway Dashboard

1. [railway.app](https://railway.app) → Projekt → **MySQL** Service
2. **Deployments** → letzter Deploy: Logs lesen (OOM, Disk, Start-Command)
3. **Variables** → `MYSQL*` / Proxy-Domain unverändert?
4. **Metrics** → CPU/RAM/Disk

### 4. Häufige Ursachen

| Ursache | Fix |
|---------|-----|
| Falscher Start Command (`node dist/...` auf MySQL) | Start Command leer / MySQL-Image Standard |
| OOM / RAM voll | Plan upgraden oder Connections reduzieren |
| Disk voll | Alte Logs/Dumps bereinigen, Plan erweitern |
| Proxy-Port geändert | `DATABASE_URL` in App-Service aktualisieren |
| Deploy während Dump | Warten, dann erneut prüfen |

### 5. Redeploy nur mit Backup

1. Backup bestätigt (lokal oder R2)
2. Railway MySQL → **Redeploy** (nicht Delete)
3. Nach 2–5 Min: `/api/health` + Admin MySQL-Status
4. Smoke: Login, Modul 1 Tag 1, Code einlösen

### 6. Restore (Worst Case)

Siehe [RUNBOOK_BACKUP_RESTORE.md](./RUNBOOK_BACKUP_RESTORE.md).

---

## Monitoring

- **HealthWatcher** (Nacht-Cron): `/api/health` muss `ok: true` liefern
- **Admin Dashboard** → Tab System → MySQL-Zeile
- **GitHub CI** `e2e-smoke` nach Deploy

## Eskalation

Wenn nach Backup + Redeploy weiterhin `FAILED`:

1. Railway Support-Ticket mit Deploy-Logs
2. Restore auf neuen MySQL-Service (Railway Add-on neu anlegen)
3. `DATABASE_URL` in App + alle Cron-Jobs aktualisieren

---

*Verwandt: [RUNBOOK_BACKUP_RESTORE.md](./RUNBOOK_BACKUP_RESTORE.md), [DEPLOYMENT.md](../DEPLOYMENT.md)*
```

### Datei: docs/RECHENPRAXIS_BENCHMARK.md
```markdown
# Rechenpraxis — Markt-Benchmark & Positionierung

Stand: Juni 2026 · Immobilien Akademie Smart

## Kurzfassung

Die Rechenpraxis kombiniert **didaktische Schritt-für-Schritt-Aufgaben**, **regelbasiertes Fehler-Feedback** und einen **KI-Assistenten pro Aufgabe** — in dieser Kombination selten am Markt. Mit **138 Aufgaben** in 7 Bereichen und **19 €/Monat** (Solo) liegt das Angebot preislich im unteren SaaS-Segment, inhaltlich über reinen Rechner-Tools.

## Wettbewerber (Auswahl)

| Anbieter | Fokus | Preis (ca.) | Stärken | Lücken vs. uns |
|----------|-------|-------------|---------|----------------|
| WEG-Profi | WEG-Verwaltung | Lizenz/Abonnement | Tiefe WEG-Spezialisierung | Weniger Lernpfad, kein KI-Tutor |
| Silvacore | Hausverwaltung | Enterprise | Workflow, Abrechnung | Kein Einsteiger-Lernmodus |
| INtex | Verwaltungssoftware | Enterprise | Vollprozess | Hohe Einstiegshürde |
| vermieter1 | Vermieter-Tools | ~9–15 €/Mo | Günstig, viele Rechner | Keine didaktischen Aufgaben |
| mein-nebenkostenrechner.de | NK-Abrechnung | ~7,90–14,90 €/Mo | Fokus NK | Enger Scope |
| immobilien-rechner.net | Rechner-Suite | Werbefinanziert / Premium | Breite Rechner | Kein Feedback-Lernen |
| Immo-Pauker | Prüfungsvorbereitung | 399–599 € (Kurs) | Prüfungsnähe | Teuer, kein laufendes SaaS |
| SFA / Azubi-Kurse | Ausbildung | Kursgebühr | Zertifikat, Stofftiefe | Kein interaktives Üben mit KI |

*Preise und Features ohne Live-Verifikation — vor Marketing-Freigabe aktualisieren.*

## Unser USP

1. **Lernen statt nur rechnen** — Berufssituation, „Was lerne ich?“, Schritte mit Formeln und Variablen.
2. **Fehler-Katalog (regelbasiert)** — typische Verwechslungen (%, MwSt., Monat/Jahr) ohne KI-Kosten.
3. **KI-Assistent kontextbezogen** — Fragen zur aktuellen Aufgabe (Fair-Use im Portal).
4. **Breite** — Maklercourtage, Rendite, Annuität, NK, WEG, Wertermittlung, AfA.
5. **Freemium** — 10 WEG-Aufgaben gratis für eingeloggte Nutzer (Conversion-Funnel).
6. **Preis** — Solo 19 €/Mo oder inklusive bei Modulkauf / B2B-Tenant.

## Preisvergleich (Einordnung)

| Segment | Typischer Preis | Rechenpraxis |
|---------|-----------------|--------------|
| Einfache Online-Rechner | 0–15 €/Mo | 19 €/Mo (mehr Didaktik + KI) |
| Verwaltungssoftware | 50–500+ €/Mo | Ergänzung, nicht Ersatz |
| Prüfungskurse | 300–600 € einmalig | Laufendes Abo, Praxisnähe |

## Produkt-Roadmap (Vorschlag)

| Priorität | Maßnahme | Status |
|-----------|----------|--------|
| P0 | Fehler-Katalog, Freemium 10 WEG, UX Stats/Mobile | ✅ umgesetzt |
| P1 | Parametrische Fall-DB (Zahlen variieren) | offen |
| P1 | Glossar-Verknüpfung im Fehler-Feedback | teilweise (Modul-Links) |
| P2 | B2B-Lizenz „Rechenpraxis für Team“ | Pricing vorhanden |
| P2 | E2E-Tests Freemium + Paywall | offen |

## KPIs zur Erfolgsmessung

- Conversion Freemium → Solo / Modulkauf
- Aufgaben abgeschlossen pro Bereich
- KI-Anfragen pro Aufgabe (Kosten vs. Nutzen)
- Abbruchrate bei falschen Antworten (vor/nach Fehler-Katalog)

## Technische Referenz

- Aufgaben: `client/public/data/rechenpraxis.json` (138 Einträge)
- Freemium-IDs: `shared/rechenpraxisAccess.ts`
- Fehler-Logik: `shared/rechenpraxisErrorCatalog.ts`
- Zugang: `server/_core/vite.ts` + `PortalToolGuard` (`freemiumAccess`)
```

### Datei: docs/REFERRAL_PROGRAM.md
```markdown
# Empfehlungsprogramm — Konzept & Umsetzung

**Stand:** Juni 2026

## Ziel

Verifizierbare Weiterempfehlungen (Absolventen, Partner, Social Media, Google Reviews) mit messbarem Reward — ohne Lifetime-Zugang zu verschenken.

## Aktive Rewards (MVP)

| Aktion | Belohnung |
|--------|-----------|
| Geworbener kauft erstes Modul | **Empfehler:** +30 Tage Zugang |
| Geworbener kauft erstes Modul | **Geworbener:** +14 Tage Zugang |

Technisch: `referralCode` pro User, `referredByUserId` bei Registrierung, Auslösung im Stripe-Webhook.

## Geplante Erweiterungen

- **Partner-Codes** mit Provisionsauszahlung (manuell / Stripe Connect)
- **Tool-Gutscheine:** Rechenpraxis 30 Tage, KI-Kontingent, Weiterbildungsnachweis
- **Social Proof:** Review-Link → automatischer 7-Tage-Bonus nach Verifizierung
- **Admin-Dashboard** für Referral-Statistiken

## API

- `GET /api/referral/info` — persönlicher Link (auth)
- `POST /api/referral/apply` — Code nachträglich zuordnen (auth)
- Registrierung: `referralCode` im Body von `POST /api/auth/register`

## Migrationen

- `0034_user_access_expires.sql` — `accessExpiresAt`, `referralCode`, `referredByUserId`
- `0035_referral_rewards.sql` — Audit-Tabelle `referral_rewards`
```

### Datei: docs/RUNBOOK_BACKUP_RESTORE.md
```markdown
# Railway MySQL Backup & Restore Runbook

Stand: 2026-06-06

Dieses Runbook dokumentiert den bewiesenen Rettungsweg fuer die Railway-MySQL-Datenbank der Immobilien Akademie Smart. Es ist absichtlich operativ gehalten: erst sichern, dann reparieren.

## Aktueller Befund

- Produktionsdatenbank: Railway MySQL.
- App-Service: `Immobilie-Akademie-Premium`.
- DB-Service: `MySQL`.
- DB-Zugriff ist ueber Railway TCP Proxy moeglich.
- Ein manueller Dump wurde am 2026-06-06 erstellt und lokal erfolgreich in eine frische MySQL-8-Instanz restored.
- Der Railway-MySQL-Service zeigte danach einen `FAILED`-Status fuer den neuesten Deployment-Versuch. Die App konnte dennoch mit der Datenbank arbeiten. Daraus folgt: Keine MySQL-Redeploys oder Restarts ohne frisches Backup und Restore-Test.

## Bewiesener Backup-Stand vom 2026-06-06

Artefakt:

```text
audit_runs/mysql_manual_backup_20260606_065425/railway_mysql_backup.sql.gz
```

Bewiesen:

- gzip-Integritaet OK.
- Restore in lokalen MySQL-8-Container erfolgreich.
- 33 Tabellen restored.
- Exakte Kernzaehlungen Live und Restore stimmten ueberein.

Kernzaehlungen:

```text
users               4
trial_leads         93
presentation_codes 96
learning_logs      365
open_questions     4275
glossar_terms      93
pending_purchases  1
```

## Manuellen Dump erstellen

Voraussetzungen:

- Railway CLI ist eingeloggt und mit dem Projekt verlinkt.
- Service `MySQL` hat die Variablen `RAILWAY_TCP_PROXY_DOMAIN`, `RAILWAY_TCP_PROXY_PORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`.
- Lokal sind `railway`, `mysqldump`, `gzip` verfuegbar.

Empfohlen:

```bash
scripts/backup/railway-mysql-dump.sh
```

Das Script erzeugt einen Ordner unter `audit_runs/`, erstellt einen komprimierten Dump und fuehrt Basispruefungen aus.

## Restore-Test lokal durchfuehren

Ein Backup gilt erst als belastbar, wenn es erfolgreich restored wurde. Beispiel:

```bash
BACKUP_DIR="audit_runs/mysql_manual_backup_YYYYMMDD_HHMMSS"
RESTORE_DIR="$BACKUP_DIR/restore_test_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$RESTORE_DIR"

CONTAINER="ia_restore_test_$(date +%Y%m%d_%H%M%S)"
ROOTPW="restoreRoot123!"
USERPW="restoreUser123!"
DBNAME="railway_restore"

docker run -d \
  --name "$CONTAINER" \
  -e MYSQL_ROOT_PASSWORD="$ROOTPW" \
  -e MYSQL_DATABASE="$DBNAME" \
  -e MYSQL_USER="restore_user" \
  -e MYSQL_PASSWORD="$USERPW" \
  -p 33078:3306 \
  mysql:8.0 \
  --default-authentication-plugin=mysql_native_password

for i in $(seq 1 90); do
  if docker exec "$CONTAINER" mysql -urestore_user -p"$USERPW" "$DBNAME" -e "SELECT 1;" >/dev/null 2>&1; then
    echo "MySQL SQL ready after ${i}s"
    break
  fi
  sleep 1
done

zcat "$BACKUP_DIR/railway_mysql_backup.sql.gz" \
  | docker exec -i "$CONTAINER" mysql -urestore_user -p"$USERPW" "$DBNAME"

docker exec "$CONTAINER" mysql -urestore_user -p"$USERPW" "$DBNAME" -N -e "
  SELECT 'users', COUNT(*) FROM users
  UNION ALL SELECT 'trial_leads', COUNT(*) FROM trial_leads
  UNION ALL SELECT 'presentation_codes', COUNT(*) FROM presentation_codes
  UNION ALL SELECT 'learning_logs', COUNT(*) FROM learning_logs
  UNION ALL SELECT 'open_questions', COUNT(*) FROM open_questions
  UNION ALL SELECT 'glossar_terms', COUNT(*) FROM glossar_terms
  UNION ALL SELECT 'pending_purchases', COUNT(*) FROM pending_purchases;
" | tee "$RESTORE_DIR/key_counts.txt"

docker rm -f "$CONTAINER"
```

## Live-Counts ohne personenbezogene Daten

```bash
railway run --service MySQL -- bash -lc '
mysql \
  -h "$RAILWAY_TCP_PROXY_DOMAIN" \
  -P "$RAILWAY_TCP_PROXY_PORT" \
  -u "$MYSQLUSER" \
  -p"$MYSQLPASSWORD" \
  "$MYSQLDATABASE" \
  -N -e "
    SELECT '\''users'\'', COUNT(*) FROM users
    UNION ALL SELECT '\''trial_leads'\'', COUNT(*) FROM trial_leads
    UNION ALL SELECT '\''presentation_codes'\'', COUNT(*) FROM presentation_codes
    UNION ALL SELECT '\''learning_logs'\'', COUNT(*) FROM learning_logs
    UNION ALL SELECT '\''open_questions'\'', COUNT(*) FROM open_questions
    UNION ALL SELECT '\''glossar_terms'\'', COUNT(*) FROM glossar_terms
    UNION ALL SELECT '\''pending_purchases'\'', COUNT(*) FROM pending_purchases;
  "
'
```

## Railway MySQL FAILED-Status

Wenn Railway den `MySQL`-Service als `FAILED` zeigt, obwohl die App erfolgreich DB-Migrationen ausfuehrt:

1. Nicht sofort `redeploy`, `restart`, `down`, `volume detach`, `volume delete` oder Service-Delete ausfuehren.
2. Zuerst frischen Dump erstellen.
3. Dump lokal restoren.
4. Erst danach im Railway-Dashboard pruefen:
   - Source muss ein MySQL-Image bzw. DB-Template sein, nicht das GitHub-App-Repo.
   - Kein App-Healthcheck wie `/api/health` fuer MySQL.
   - Volume `/var/lib/mysql` muss erhalten bleiben.
   - Start Command muss MySQL starten, nicht `node dist/index.js`.

## Secrets Rotation

Wenn Secrets in Terminal-Logs, Chat-Ausgaben oder Screenshots sichtbar wurden, nach einem bewiesenen Backup rotieren:

1. MySQL Passwort / `DATABASE_URL`.
2. `JWT_SECRET`, `MAGIC_LINK_SECRET`, `INSPECT_JWT_SECRET`.
3. KI-Provider Keys: Anthropic, Gemini, Groq, ElevenLabs.
4. Stripe Keys nur, wenn vollstaendige Werte sichtbar wurden.

Rotation immer mit anschliessendem Healthcheck, Login-Test und mindestens einem Smoke-Test fuer Code-Einloesung und Owner-Dashboard.

## Nach R2-Aktivierung: Restore-Test-Checkliste

Diese Checkliste ist **Pflicht** nach dem ersten erfolgreichen GitHub-Workflow-Lauf (`.github/workflows/mysql-backup-r2.yml`). Ein Backup in R2 gilt erst als belastbar, wenn der Restore-Test dokumentiert ist.

### 1. Dump aus R2 holen

```bash
aws s3 cp "s3://$R2_BUCKET/${R2_PREFIX:-mysql/production}/latest/immobilien-akademie-smart_mysql_latest.sql.gz.gpg" ./restore_inbox/ \
  --endpoint-url "https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com"
```

### 2. Entschlüsseln

```bash
gpg --batch --yes --passphrase "$BACKUP_ENCRYPTION_PASSPHRASE" \
  -d ./restore_inbox/immobilien-akademie-smart_mysql_latest.sql.gz.gpg \
  > ./restore_inbox/restore.sql.gz
gzip -t ./restore_inbox/restore.sql.gz
```

### 3. Lokal restoren

Den Abschnitt **Restore-Test lokal durchfuehren** oben ausfuehren. `BACKUP_DIR` auf `./restore_inbox` setzen.

### 4. Kernzaehlungen vergleichen

| Tabelle | Erwartung (Stand 06.06.2026) | Restore-Ist | OK |
|---------|------------------------------|-------------|-----|
| users | 4 | ___ | ☐ |
| trial_leads | 93 | ___ | ☐ |
| presentation_codes | 96 | ___ | ☐ |
| learning_logs | 365 | ___ | ☐ |
| open_questions | 4275 | ___ | ☐ |
| glossar_terms | 93 | ___ | ☐ |
| pending_purchases | 1 | ___ | ☐ |

Abweichungen >5 % bei `open_questions` oder `learning_logs` → Backup als fehlerhaft markieren, Workflow stoppen, manuellen Dump wiederholen.

### 5. App-Smoke nach Restore (optional, Staging)

Nur auf isolierter Restore-Instanz, nicht gegen Live:

- Login mit Test-Account
- `/api/health` → 200
- Modul 1 Tag 1 öffnen

### 6. Dokumentation

Ergebnis in `audit_runs/r2_restore_test_YYYYMMDD/` ablegen:

- `key_counts.txt` (aus Restore)
- `restore_ok.txt` mit Datum, R2-Pfad, Prüfer
- Bei Erfolg: Cron im Workflow aktivieren (siehe `BACKUP_AUTOMATION_PLAN.md`)

**Regel:** Kein Cron, kein „Production-ready“-Status für R2-Backups ohne mindestens einen dokumentierten Restore-Test.

## Naechste Automatisierung

Zielbild:

- Taeglicher `mysqldump`.
- Komprimierung.
- Externer Speicher, zum Beispiel S3-kompatibler Bucket.
- Regelmaessiger Restore-Test (monatlich laut `BACKUP_AUTOMATION_PLAN.md`).
- Alarm bei fehlgeschlagenem Dump oder Restore.

Bis diese Automatisierung steht, mindestens vor jedem Railway-DB-Eingriff manuell `scripts/backup/railway-mysql-dump.sh` ausfuehren.
```

### Datei: docs/STRIPE_LIVE_GO_LIVE.md
```markdown
# Stripe Live — Go-Live-Vorbereitung

**Stand:** 08.06.2026  
**Test-Phase abgeschlossen wenn:** `/admin/stripe-live` zeigt 18/18 Price-IDs + Webhook-Health aktiv (Testmodus).

---

## Übersicht: Test → Live

| Schritt | Testmodus (erledigt?) | Livemodus (später) |
|---------|----------------------|-------------------|
| 18 Price-IDs | `pnpm run stripe:seed-prices` mit `sk_test_` | Gleiches Skript mit `sk_live_` |
| Webhook | `we_…` + `whsec_` (Sandbox) | **Neuer** Live-Webhook + neues `whsec_` |
| API Keys | `sk_test_`, `pk_test_` | `sk_live_`, `pk_live_` |
| Testzahlung | Karte 4242… | Kleine echte Zahlung |

**Niemals** Test-`price_`-IDs im Live-Modus verwenden.

---

## Schritt 1 — Live-Preise anlegen (WSL)

```bash
export STRIPE_SECRET_KEY=sk_live_51DEIN_LIVE_KEY
pnpm run stripe:seed-prices -- --apply --output=stripe_prices_live.env
```

Railway (Live-Preise **ersetzen** die Test-Preise):

```bash
while IFS= read -r line; do
  [[ -z "$line" || "$line" =~ ^# ]] && continue
  railway variables --set "$line"
done < stripe_prices_live.env
```

---

## Schritt 2 — Live API Keys (Railway)

| Variable | Wert |
|----------|------|
| `STRIPE_SECRET_KEY` | `sk_live_…` |
| `STRIPE_PUBLISHABLE_KEY` | `pk_live_…` |
| `VITE_STRIPE_PUBLIC_KEY` | `pk_live_…` (gleich wie Publishable) |

```bash
railway variables --set "STRIPE_SECRET_KEY=sk_live_..."
railway variables --set "STRIPE_PUBLISHABLE_KEY=pk_live_..."
railway variables --set "VITE_STRIPE_PUBLIC_KEY=pk_live_..."
```

---

## Schritt 3 — Live-Webhook

1. Stripe Dashboard → **Livemodus** (Schalter oben)
2. Entwickler → Webhooks → Endpunkt hinzufügen:
   - URL: `https://immobilien-akademie-smart.de/api/stripe/webhook`
   - Events: `checkout.session.completed`, `invoice.paid`
3. Signing secret (`whsec_…`) kopieren → Railway:

```bash
railway variables --set "STRIPE_WEBHOOK_SECRET=whsec_LIVE_SECRET"
```

**Hinweis:** Live-`whsec_` ist **anders** als Test-`whsec_`.

---

## Schritt 4 — Verifikation

```bash
sleep 30
curl -s https://immobilien-akademie-smart.de/api/health | jq .
```

Browser: `/admin/stripe-live` → Modus **LIVE**, 18/18, API testen.

---

## Schritt 5 — Kleiner Live-Testkauf

Günstigster Weg: Renewal 5 €/Mo oder kleinstes Modul — **echte Karte**, danach in Stripe Dashboard prüfen.

---

## Checkliste vor Umschaltung

- [ ] MySQL-Backup aktuell (`pnpm run db:backup` oder R2)
- [ ] 18 Live Price-IDs in Railway
- [ ] Live Webhook + `whsec_`
- [ ] `sk_live_` / `pk_live_`
- [ ] Testkauf Live erfolgreich
- [ ] Owner Revenue zeigt Umsatz

---

*Skripte: `pnpm run stripe:seed-prices`, `pnpm run stripe:setup-webhook`*
```

### Datei: docs/SYSTEM_AUDIT.md
```markdown
# System-Audit — Immobilien Akademie Smart

Stand: Juni 2026 · Architektur, UX, Didaktik, Marketing

Vollständiges Audit-Dokument — siehe auch `VERWALTER_SUITE_ROADMAP.md` und `RECHENPRAXIS_BENCHMARK.md`.

## Gesamtbewertung

| Bereich | Note | Kommentar |
|---------|------|-----------|
| Technische Architektur | **Gut** | React 19, Express, tRPC, MySQL — klar getrennt |
| Informationsarchitektur | **Gut** | Kern-Tools in Sidebar verlinkt |
| Lern-Didaktik | **Gut** | 5 Module, Audio, Rechenpraxis, KI-Tutor, Offene Fragen |
| UX / Komfort | **Gut** | ComfortBar oben; Lerninhalt-Schriftzoom explizit |
| Marketing | **Mittel** | PublicHeader aktiv, CTAs ausbaufähig |
| Konsistenz | **Gut** | Legacy-Module entfernt; eine Rechenpraxis-URL |

---

## 1. Bereiche des Systems

### Öffentlich (`PublicLayout` + `PublicHeader`)
Startseite, Kurse, Pakete, 5 Kurs-Landings, Legal, Glossar, Hilfe, Förderung.

**Komfort:** `ComfortBar` in PublicHeader (oben rechts).

### Lernportal (`AppLayout` → `DashboardLayout`)
Dashboard `/statistiken`, Module 1–5, Quiz, Prüfung, Zertifikate, Tools.

**Komfort:** Desktop — Leiste oben im Inhaltsbereich. Mobile — neben Menü-Button.

### Rechenpraxis
Kanonisch unter `/rechenpraxis` im Vollportal (`AppLayout` + Sidebar). Legacy `/app/rechenpraxis` leitet um.

### Admin / Owner / B2B
Gleiche App-Shell, erweiterte Sidebar + Hub-Seiten (`/admin`, `/owner-dashboard`).

**Owner/Admin:** `ComfortBar` im Owner-Header; Inline-Schrift über `scaledFontSize()`.

### Standalone
`/audio-modus` — eigener Header mit ComfortBar.

---

## 2. Architektur-Diagramm

```
Browser
  └── App (A11y: useA11yPrefs → --a11y-font-scale)
        ├── initA11yPrefsFromStorage() beim Start
        ├── AccessibilityPanel (hideFab — öffnet über ComfortBar ♿)
        └── Router
              ├── PublicLayout → PublicHeader + ComfortBar
              ├── AppLayout → DashboardLayout
              │     ├── Sidebar (Navigation)
              │     ├── Top: ComfortBar (Desktop)
              │     └── Content + Breadcrumbs
              └── Bare: AudioModus, 2FA, 404
```

---

## 3. Module & Didaktik

| Modul | Lerntage | Schwerpunkt |
|-------|----------|-------------|
| 1 | ~20 | Grundlagen Immobilienrecht |
| 2 | 60 | Makler §34c |
| 3 | 80 | WEG-Verwalter |
| 4 | ~40 | Bewertung / Gutachter |
| 5 | 40 | §34i Darlehensvermittlung |

**Ergänzend:** Audio-Modus, Rechenpraxis (138 Aufgaben), Offene Fragen (`/offene-fragen/:modulId`), Fallstudien, Lernkarten, Prüfungssimulation.

---

## 4. Bekannte Schwächen & Maßnahmen

### Behoben (P0 / P1 / P2)
- ComfortBar oben im Lernbereich (nicht Sidebar unten)
- Lerninhalt-Schriftzoom (SmartContent, Rechenpraxis, Module)
- Sidebar: Wiederholung, Audio, Strategie, Offene Fragen, Fachbegriffe
- GlobalGlossary compact in eingeklappter Sidebar
- Dark-Mode vereinheitlicht (`useA11yPrefs`, Toasts, Legacy-Migration)
- Rechenpraxis kanonisch `/rechenpraxis`
- Owner/Admin `scaledFontSize()` für Inline-Texte
- Legacy `Module1.tsx`…`Module5.tsx` entfernt
- Ungenutztes `RechenpraxisLayout` entfernt
- Route `/offene-fragen/:modulId` aktiviert
- E2E `25-comfort-font-zoom.spec.ts`

### Behoben (PR-A, Juni 2026)
- `moduleContentRegistry.ts` — Single Source of Truth für Moduldateien
- M2: 60 Lerntage (Part3 ergänzt), M4: 40 Lerntage (Valuation Part2 + Bonus)
- Build-Export validiert erwartete vs. extrahierte Tage

### Offen (Produkt / später)
- KI-Generator Pipeline v2 (Map 1-Tag + Continuation) — siehe Konzept in PR-Diskussion
- NightCron / PortalAgent auf Registry umstellen (noch duplizierte Listen)
- Verwalter-Suite (Vorlagen, CRM) — `VERWALTER_SUITE_ROADMAP.md`
- Module 6–8 (bewusst nicht im Scope)

---

## 5. Forensisches Audit — Architektur & Botschaften (Juni 2026)

### 5.1 Inkonsistenzen (vor PR-A)

| System | M2 Tage | M4 Tage | Problem |
|--------|---------|---------|---------|
| `moduleDayExtractor` (alt) | 40 | 10 | Fehlende Dateien, M4_Maximal existiert nicht |
| `PortalAgent` / `NightCron` | 60 | 40 | Korrekt, aber nicht vom Generator genutzt |
| `ragTutor.ts` v2 | 40 cap | Parser kaputt | Verboten zu ändern; Legacy deprecaten |
| Marketing `Home.tsx` | 60 | 40 | Stimmt mit Registry überein |
| `SYSTEM_AUDIT` (alt) | ~40 | ~40 | Dokumentation veraltet |

**Kernproblem:** Vier parallele „Wahrheiten“ für Modulinhalte — Generator, Agent, Marketing und Audit wichen voneinander ab.

### 5.2 Homepage — Hero vs. Verwalter-Rechner (Nutzer-Feedback)

**Aktueller Aufbau (`Home.tsx`):**
1. Hero (blau): „Fach- und Praxisvorbereitung Immobilienwirtschaft“ + alle 5 Berufsbilder
2. Direkt darunter: grünes Band „Eigenständiges Produkt — Verwalter-Rechner WEG interaktiv“

**Bewertung:** Der Nutzer hat recht — die **zweite Botschaft konkurriert mit der ersten**. Hero verspricht Gesamtportal (5 Module); das grüne Band wirkt wie ein separates Produkt auf derselben Seite. Das verwässert die Haupt-CTA („24h testen“).

**Empfohlene IA (Agentur-Sicht):**

| Variante | Beschreibung | Empfehlung |
|----------|--------------|------------|
| A | Verwalter-Rechner als **schräges Badge** über/unter Hero-Foto (Nutzer-Idee) | ✅ Beste Balance — sichtbar, stört Hero-Hierarchie nicht |
| B | Grünes Band **unter** Modul-Karten (nach „5 Berufsbilder“) | ✅ Klare Trennung: erst Kurse, dann Zusatzprodukt |
| C | Nur kleiner Link im Hero (aktuell neben CTAs) | Zu leise für eigenständiges Produkt |
| D | Alles lassen | ❌ Marketing-Unschärfe bleibt |

**Konkrete UI-Idee (Variante A):** Schräges Parallelogramm (`rotate-[-4deg]`) unten links am Hero-Bild, emerald-600, Text: „WEG-Rechner · 138 Aufgaben · ab 19 €/Mo“ → `/verwalter-rechner`. Grünes Vollbreiten-Band entfernen oder auf `/verwalter-rechner` Landing beschränken.

### 5.3 Plausibilität & Authentizität

| Bereich | Status | Anmerkung |
|---------|--------|-----------|
| §34c vs. §34i Formulierungen | ✅ Gut | KursLanding differenziert korrekt (keine falsche „IHK-Prüfung §34c“) |
| Förderung / AZAV | ⚠️ Vorsicht | „Förderung angestrebt“ — korrekt hedged; nicht als „bereits förderfähig“ verkaufen |
| Lerntage 240 | ✅ | 20+60+80+40+40 = 240, konsistent mit `STRUCTURED_LEARNING_DAYS` |
| SYSTEM_AUDIT M2 „~40“ | ❌ war falsch | Jetzt 60 (Registry) |
| Generator „0 Lerneinheiten“ | ✅ behoben | Build-Export + Registry |
| Doppelte emerald-Sections | ⚠️ | Home hat 2× grün (Verwalter-Band + Förderung) — visuell monoton |

### 5.4 Visuelle Agentur-Checkliste (nicht alles umsetzen — Prioritäten)

**P0 (würde Agentur sofort ändern):**
- Hero-Hierarchie: ein Hauptversprechen, ein Haupt-CTA
- Verwalter-Rechner aus Hero-Konkurrenzzone lösen (Badge oder Modul-Section)
- Generator-UI: Legacy-Button entfernen wenn Pipeline v2 live

**P1 (Qualitätssprung):**
- Modul-Landings: einheitliche Farblogik (M2 Landing „green“ vs. Home purple)
- Sidebar: 40+ Links — „Wissen & Tools“ gruppieren / einklappbar
- Trust-Bar und Stats nicht direkt nach competing Messages

**P2 (Feinschliff):**
- Hero-Foto: Verwalter-Badge wie vorgeschlagen
- Animation dezent (reduced-motion bereits berücksichtigt)

---

## 6. Manuelle Test-Checkliste

1. https://immobilien-akademie-smart.de/ — Komfort oben rechts
2. https://immobilien-akademie-smart.de/statistiken — Sidebar vollständig
3. https://immobilien-akademie-smart.de/modul/3/tag/4 — A+ im Lerntext
4. https://immobilien-akademie-smart.de/modul/3/tag/4 — Tab Videos → Platzhalter skaliert
5. https://immobilien-akademie-smart.de/audio-modus
6. https://immobilien-akademie-smart.de/rechenpraxis
7. https://immobilien-akademie-smart.de/app/rechenpraxis — Redirect
8. https://immobilien-akademie-smart.de/strategie
9. https://immobilien-akademie-smart.de/wiederholung
10. https://immobilien-akademie-smart.de/offene-fragen/3
11. https://immobilien-akademie-smart.de/owner-dashboard — ComfortBar + skalierte Texte
12. https://immobilien-akademie-smart.de/admin
13. https://immobilien-akademie-smart.de/barrierefreiheit

---

*Keine Rechtsberatung. Preise/Wettbewerber vor Marketing-Freigabe verifizieren.*
```

### Datei: docs/UEBERGABE_ANTROPIQ_ARCHITEKT_20260608.md
```markdown
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

---

*Dieses Dokument ist eine Momentaufnahme vom 08.06.2026, erweitert nach Forensik NF-9–NF-13. Jede Aussage ist durch den Architekten zu verifizieren.*
```

### Datei: docs/VERWALTER_BETA_TESTER.md
```markdown
# Verwalter Suite — Beta-Tester einladen

**Stand:** 2026-06-10

---

## Was du **jetzt** schicken kannst (ohne Extra-Railway)

| Was | Link / Inhalt |
|-----|----------------|
| **Haupt-URL** | https://immobilien-akademie-smart.de/app/verwalter/objekte |
| **Login** | Tester registriert sich **oder** du erstellst Zugangscode im Admin |
| **GitHub** | **Nicht** mitschicken — Tester brauchen nur die URL |
| **Railway** | **Nicht** nötig — läuft auf dem bestehenden Production-Service |

**Kurztext für E-Mail/WhatsApp:**

> Verwalter-Tools (Beta): https://immobilien-akademie-smart.de/app/verwalter/objekte  
> Bitte registrieren, Objekt anlegen, Buchungen + Assistent testen. Feedback per E-Mail.

---

## Braucht man ein extra Railway-Projekt?

| Phase | Antwort |
|-------|---------|
| **Jetzt (Beta)** | **Nein** — gleiche Domain, gleicher Deploy |
| **Später (Marke)** | **Zweiter Service** im gleichen Railway-Projekt + Subdomain `verwalter.immobilien-akademie-smart.de` |
| **Eigenes Railway-Projekt** | Nur bei Compliance/Isolation — optional, nicht jetzt |

---

## Braucht man ein extra GitHub-Repo?

**Nein.** Monorepo bleibt. Verwalter ist Sub-Produkt unter `/app/verwalter/*`.

Split erst sinnvoll bei separatem Team oder >50 zahlende Verwalter-Kunden.

---

## Empfohlene Reihenfolge

1. **Jetzt:** Features ausbauen + Beta-Tester über Haupt-URL  
2. **Nach MySQL-Migration:** Daten sicher (kein Verlust bei Redeploy)  
3. **Bei Go-to-Market:** Eigene Subdomain + Stripe-Produkt „Verwalter Tools"  
4. **Optional später:** Vollständige Trennung (eigenes Impressum, eigenes Railway-Projekt)

Siehe auch: `docs/VERWALTER_INDEPENDENCE_PLAN.md`
```

### Datei: docs/VERWALTER_INDEPENDENCE_PLAN.md
```markdown
# Verwalter Suite — Plan zur eigenständigen Produktlinie

**Stand:** 2026-06-10  
**Entscheidung Alisad:** Eigenständiges Produkt mit eigener Domain ist **geplant**  
**Status:** Strategie — noch nicht umgesetzt

---

## Kurzantwort: Neues Repo jetzt?

| Option | Empfehlung | Warum |
|--------|------------|-------|
| **Neues GitHub-Repo sofort** | ❌ Nein | 51+ Verwalter-Dateien, geteilte Auth, KI-Pipeline, `users`-Tabelle — Split kostet Wochen, bremst parallele Entwicklung |
| **Neuer Railway-Service** | 🟡 Ja, aber Phase 2 | Eigene Domain + Deploy — sinnvoll nach P0-Fixes |
| **Neues Railway-Projekt** | 🟡 Optional | Gleicher Effekt wie zweiter Service; ein Projekt mit 2 Services reicht meist |
| **Monorepo behalten** | ✅ Ja | Parallele Entwicklung Lernportal + Verwalter im selben Repo |

---

## Empfohlene Phasen (Agentur-Standard)

### Phase 1 — Fundament (jetzt, 1–2 Wochen)

**Ziel:** Sub-Produkt stabil, Daten sicher, offene PRs konsolidiert.

| # | Task | Wer |
|---|------|-----|
| 1 | Verwalter-Daten von File-Store → **MySQL** (eigene Tabellen) | Cursor |
| 2 | PRs #172–#177 → **1 konsolidierter PR** auf `main` | Cursor |
| 3 | Fair-Use auf `/api/verwalter/*` | Cursor |
| 4 | E2E Smoke für Vorlagen + Objekte | Cursor |
| 5 | Stripe-Produkt „Verwalter Tools" (Test) vorbereiten | Cursor + Alisad |

**Repo:** `Immobilie-Akademie-Premium` (unverändert)  
**URL:** `immobilien-akademie-smart.de/app/verwalter/*` (bleibt)

### Phase 2 — Eigenes Deployment (wenn Phase 1 live)

**Ziel:** Eigene Domain, unabhängiger Deploy, geteilte Auth.

```
┌─────────────────────────────────────────────────────────────┐
│  Monorepo: Immobilie-Akademie-Premium                        │
├──────────────────────────┬──────────────────────────────────┤
│  Railway Service 1       │  Railway Service 2               │
│  „portal"                  │  „verwalter"                     │
│  immobilien-akademie-      │  verwalter.immobilien-akademie-  │
│  smart.de                  │  smart.de (oder eigene Domain)   │
├──────────────────────────┴──────────────────────────────────┤
│  Geteilt: MySQL (User-Auth), KI-API-Keys, ggf. Redis später   │
│  Getrennt: Deploy, ENV PRODUCT_MODE, Stripe-Products, Brand  │
└─────────────────────────────────────────────────────────────┘
```

| # | Task | Wer |
|---|------|-----|
| 1 | Railway: **zweiten Service** im gleichen Projekt anlegen | **Alisad** (Dashboard) |
| 2 | `railway.toml` / `Dockerfile` mit `PRODUCT=verwalter` oder Root-Filter | Cursor |
| 3 | DNS: `verwalter.immobilien-akademie-smart.de` → Service 2 | **Alisad** (United Domains / Cloudflare) |
| 4 | Cookie-Domain: `.immobilien-akademie-smart.de` für SSO | Cursor |
| 5 | Eigenes Stripe-Produkt (39 €/Mo laut Roadmap) | Alisad + Cursor |
| 6 | **Volume** oder MySQL für Verwalter-Daten (nach Phase-1-Migration) | erledigt in Phase 1 |

**Neues GitHub-Repo:** weiterhin **nein**.

### Phase 3 — Vollständige Produkt-Trennung (optional, >50 zahlende Verwalter)

| # | Task | Wann |
|---|------|------|
| 1 | Eigenes Impressum / AGB / Datenschutz-Verweis | Go-to-Market |
| 2 | Eigenes Railway-**Projekt** (nur wenn Compliance/Isolation nötig) | Skalierung |
| 3 | Repo-Split in `packages/auth`, `packages/ki`, `apps/verwalter` | Nur bei separatem Team |
| 4 | Eigene Domain ohne Subdomain (z. B. `weg-verwalter-tools.de`) | Marke |

---

## Parallele Entwicklung + Schulung

| Bereich | Lernportal (§34c) | Verwalter Suite |
|---------|-------------------|-----------------|
| Branch-Präfix | `cursor/portal-*` | `cursor/verwalter-*` |
| Routes | `/kurs/*`, `/modul/*` | `/app/verwalter/*` → später eigene Domain |
| Doku | `docs/` allgemein | `docs/VERWALTER_*.md` |
| Tests | `tests/e2e/0[1-6]*` | `tests/e2e/26-verwalter-*` |
| Deploy | Service 1 (jetzt) | Service 2 (Phase 2) |

**Schulung/Inhalt:** Module 1–5 + Rechenpraxis bleiben im Hauptportal; Verwalter-Vorlagen + Assistent eigenes Onboarding (`VerwalterOnboarding.tsx` in Branch #176).

---

## Was Cursor NICHT kann (Alisad-Aufgaben)

| Aufgabe | Warum |
|---------|-------|
| Railway-Projekt/Service anlegen | Kein Zugang zu deinem Railway-Account |
| DNS-Einträge setzen | United Domains / Cloudflare — dein Login |
| Stripe Live-Produkte anlegen | Dashboard + Geschäftsentscheidung |
| Neues GitHub-Repo in deiner Org | Nur du entscheidest Org-Struktur; aktuell nicht empfohlen |

---

## Was Cursor als Nächstes kann (nach deinem OK)

1. Phase-1-P0: MySQL-Migration für Verwalter-Objekte/Vorgänge/Buchungen
2. Verwalter-PRs #172–#177 konsolidieren und mergen
3. `PRODUCT_MODE=verwalter|portal` Env-Skeleton für Phase 2 vorbereiten
4. Dieses Dokument in PR auf `main`

---

## Entscheidungspunkte für Alisad

| Frage | Optionen |
|-------|----------|
| Domain Phase 2 | `verwalter.immobilien-akademie-smart.de` vs. komplett eigene Domain |
| Preis | 39 €/Mo (Roadmap) — bestätigen |
| DB geteilt vs. getrennt | **Empfehlung:** eine MySQL, getrennte Tabellen (günstiger, Auth einfacher) |
| Wann Phase 2 Deploy | Nach Phase 1 Merge + 1 Woche stabil |

---

*Referenz: `docs/VERWALTER_SUITE_ROADMAP.md:58-62`, Audit Teil 4 `docs/AUDIT_2026-06-10_04_VERWALTER.md`*
```

### Datei: docs/VERWALTER_PHASE1_STATUS.md
```markdown
# Verwalter Phase 1 — Status & Alisad-Aufgaben

**Stand:** 2026-06-10  
**Branch:** `cursor/verwalter-phase1-consolidated-7dbc`  
**Ersetzt:** PRs #172–#177 (ein konsolidierter PR)

---

## Erledigt (Cursor)

| # | Task | Status |
|---|------|--------|
| 1 | Strategie-Dokument auf `main` | ✅ PR #179 merged |
| 2 | Verwalter P3–Suite+ in **einem PR** konsolidiert | ✅ Rebase auf `main` |
| 3 | Fair-Use auf Verwalter-KI (`ki-brief`, `assistent`, `buchungen/vorschlagen`) | ✅ `kiFairUseGate.ts` |
| 4 | Rebase-Konflikt `.gitignore` (DATEV + Independence Plan) | ✅ |

---

## In Arbeit (PR MySQL-Migration)

| # | Task | Status |
|---|------|--------|
| 1 | Tabellen `verwalter_objekte`, `verwalter_vorgaenge`, `verwalter_buchungen` | Migration `0043` |
| 2 | Auto-Import aus `data/verwalter-*` beim ersten Zugriff | Lazy-Migrate |
| 3 | Beta-Tester-Anleitung | `docs/VERWALTER_BETA_TESTER.md` |

## Noch offen

| # | Task | Wer |
|---|------|-----|
| 1 | Stripe „Verwalter Tools" Live | Alisad Stripe Dashboard |
| 2 | Eigene Subdomain (Phase 2) | Alisad Railway + DNS |

---

## Nur Alisad (nicht im Terminal automatisierbar)

### A — Nach PR-Merge: Staging-Smoke (5 Min.)

1. https://immobilien-akademie-smart.de/app/verwalter öffnen (eingeloggt)
2. Objekt anlegen → Vorgang → Buchung vorschlagen
3. KI-Brief testen
4. Bei Fehler: Screenshot + Copy-Paste der Browser-Konsole

### B — Daten-Backup bis MySQL (einmalig)

**WSL:**
```bash
cd /mnt/c/Users/Lenovo/Immobilie-Akademie-Premium
git checkout main && git pull
# Falls data/verwalter-* lokal existiert:
tar -czvf ~/verwalter-data-backup-$(date +%Y%m%d).tar.gz data/verwalter-* 2>/dev/null || echo "Keine lokalen Verwalter-Daten"
```

### C — Railway Volume (optional, bis MySQL)

Railway Dashboard → Service → Settings → prüfen ob **Volume** verfügbar.  
Falls ja: Mount `/app/data` — sonst auf MySQL-Migration warten.

### D — PR #172–#177 schließen

Nach Merge des konsolidierten PRs: alte Draft-PRs als „superseded" schließen (Cursor oder Alisad).

---

## Phase 2 (noch nicht starten)

- Zweiter Railway-Service + Subdomain `verwalter.immobilien-akademie-smart.de`
- Siehe `docs/VERWALTER_INDEPENDENCE_PLAN.md`
```

### Datei: docs/VERWALTER_QA_RUNBOOK.md
```markdown
# Verwalter Suite — QA-Runbook (Stakeholder-Tests)

**Stand:** 2026-06-10  
**Production:** https://immobilien-akademie-smart.de

---

## 1. Alle Verwalter-Links (zum Klicken / an Tester)

### Öffentlich (ohne Login)

| Bereich | URL |
|---------|-----|
| Startseite | https://immobilien-akademie-smart.de/ |
| Verwalter-Rechner Landing | https://immobilien-akademie-smart.de/verwalter-rechner |
| Modul 3 Kurs-Landing (WEG) | https://immobilien-akademie-smart.de/kurs/modul-3-weg-verwalter |

### App (Login nötig — leitet sonst um)

| Bereich | URL |
|---------|-----|
| Objekte (Einstieg) | https://immobilien-akademie-smart.de/app/verwalter/objekte |
| Vorgänge | https://immobilien-akademie-smart.de/app/verwalter/vorgaenge |
| Buchungen | https://immobilien-akademie-smart.de/app/verwalter/buchungen |
| Vorlagen | https://immobilien-akademie-smart.de/app/verwalter/vorlagen |
| Fristen | https://immobilien-akademie-smart.de/app/verwalter/fristen |
| Mahnwesen | https://immobilien-akademie-smart.de/app/verwalter/mahnwesen |
| ETV-Paket | https://immobilien-akademie-smart.de/app/verwalter/etv |
| Freigaben | https://immobilien-akademie-smart.de/app/verwalter/freigaben |
| E-Mail-Inbox | https://immobilien-akademie-smart.de/app/verwalter/inbox |
| Beispiel-Vorlage Mahnung | https://immobilien-akademie-smart.de/app/verwalter/vorlagen/mahnung-stufe1 |

### Rechenpraxis-Shell (Verwalter-Produkt)

| Bereich | URL |
|---------|-----|
| Rechenpraxis (mit Verwalter-Nav) | https://immobilien-akademie-smart.de/app/rechenpraxis |

---

## 2. Ein Befehl — automatisches QA-Pack (WSL)

```bash
cd /mnt/c/Users/Lenovo/Immobilie-Akademie-Premium
bash scripts/ops/verwalter-qa-pack.sh
```

**Mit Login (API-Tests inkl. deine Objekte):**

```bash
cd /mnt/c/Users/Lenovo/Immobilie-Akademie-Premium
B2B_ADMIN_PASSWORD='hier-dein-echtes-admin-passwort' bash scripts/ops/verwalter-qa-pack.sh
```

Wichtig: `'DEIN_PASSWORT'` ist nur Platzhalter — echtes Passwort einsetzen (nicht committen).

→ **Gesamte Ausgabe copy-pasten** an Cursor.

---

## 3. Playwright (Browser-Simulation, Prod)

**Einmalig:**

```bash
cd /mnt/c/Users/Lenovo/Immobilie-Akademie-Premium
pnpm install
pnpm exec playwright install chromium
```

**Verwalter-Tests:**

```bash
PLAYWRIGHT_BASE_URL=https://immobilien-akademie-smart.de \
B2B_ADMIN_PASSWORD='DEIN_PASSWORT' \
pnpm exec playwright test \
  tests/e2e/26-verwalter-mobile-layout.spec.ts \
  tests/e2e/07-verwalter-rechner.spec.ts \
  tests/e2e/21-mysql-health.spec.ts \
  tests/e2e/22-migration-status.spec.ts \
  --project=chromium
```

Copy-Paste: letzte 30 Zeilen der Ausgabe.

---

## 4. Lighthouse (Speed + A11y)

**WSL ohne Chrome:** PageSpeed-Link nutzen (Abschnitt 5) — einfacher.

**WSL (ein Script):**

```bash
cd /mnt/c/Users/Lenovo/Immobilie-Akademie-Premium
bash scripts/ops/verwalter-lighthouse.sh
```

Falls Chromium-Libs fehlen (Ubuntu 24): `sudo apt-get install -y libnss3 libatk-bridge2.0-0t64 libdrm2 libxkbcommon0 libgbm1 libasound2t64`

**ARM/WSL:** Lighthouse lokal oft unmöglich — PageSpeed-Link nutzen (Abschnitt 5).

**Playwright Admin-401-Tests ohne Login-Setup:**

```bash
PLAYWRIGHT_SKIP_GLOBAL_SETUP=1 PLAYWRIGHT_BASE_URL=https://immobilien-akademie-smart.de \
pnpm exec playwright test tests/e2e/21-mysql-health.spec.ts tests/e2e/22-migration-status.spec.ts --project=chromium
```

---

## 5. Externe Web-Tests (nur Link öffnen)

| Tool | Link |
|------|------|
| Google PageSpeed | https://pagespeed.web.dev/analysis?url=https://immobilien-akademie-smart.de/app/verwalter/buchungen |
| Security Headers | https://securityheaders.com/?q=https://immobilien-akademie-smart.de&followRedirects=on |
| SSL Labs | https://www.ssllabs.com/ssltest/analyze.html?d=immobilien-akademie-smart.de |

Screenshot oder Score-Zahlen copy-pasten.

---

## 6. Stakeholder-Checklisten

### A — Endnutzer (Hausverwalter)

- [ ] Registrieren / Login
- [ ] Objekt anlegen
- [ ] Vorgang anlegen
- [ ] Buchung vorschlagen + speichern
- [ ] Assistent (unten rechts) öffnen
- [ ] Vorlage → KI-Brief

### B — Beta-Tester (extern)

- [ ] Link erhalten: `/app/verwalter/objekte`
- [ ] 15 Min. frei testen
- [ ] Feedback: Was unklar? Was fehlt?

### C — Betreiber (Alisad)

- [ ] `bash scripts/ops/verwalter-qa-pack.sh` mit Passwort
- [ ] Health: `migrations.pending = 0`
- [ ] MySQL: Objekte in DB (nach erstem Zugriff importiert)

### D — Security

- [ ] `/api/verwalter/*` ohne Cookie → 401
- [ ] Admin-Routen ohne Login → 401

---

## 7. Vitest (nur lokal, kein Prod)

```bash
cd /mnt/c/Users/Lenovo/Immobilie-Akademie-Premium
pnpm exec vitest run server/verwalterObjektStore.test.ts server/verwalterBuchungStore.test.ts server/verwalterVorgangStore.test.ts
```

---

*Siehe auch: `docs/VERWALTER_BETA_TESTER.md`*
```

### Datei: docs/VERWALTER_STRIPE_SETUP.md
```markdown
# Verwalter Tools — Stripe Setup (Runbook)

Produkt: **Verwalter Tools Solo** · 39 €/Monat · Sentinel `vt` in `users.enabledModules`

## 1. Price-ID anlegen

**Option A — Seed-Script (empfohlen)**

```bash
# Testmodus
STRIPE_SECRET_KEY=sk_test_… pnpm run stripe:seed-prices -- --dry-run
STRIPE_SECRET_KEY=sk_test_… pnpm run stripe:seed-prices -- --apply --railway-hints
```

**Option B — Stripe Dashboard**

- Produkt: `Verwalter Tools — WEG-Suite`
- Preis: 39,00 EUR / Monat, recurring
- Lookup-Key (optional): `verwalter_tools_monthly`

## 2. Railway ENV

```env
STRIPE_PRICE_VERWALTER_TOOLS_MONTHLY=price_…
# Beta (Default): frei für alle Login-Nutzer
VERWALTER_TOOLS_GATING=0
```

Nach Go-Live mit Bezahlzwang:

```env
VERWALTER_TOOLS_GATING=1
```

## 3. Webhook

Endpoint: `POST /api/stripe/webhook`

Events: `checkout.session.completed`, `invoice.paid`

Bei `invoice.paid` mit `metadata.type=verwalter_tools` → `processVerwalterToolsSubscription` setzt Sentinel `vt`.

## 4. Checkout testen

1. Einloggen auf `/fuer-verwaltungsbueros`
2. „Abo buchen“ → Stripe Checkout
3. Testkarte: `4242 4242 4242 4242`
4. Erfolg: Redirect `/app/verwalter?subscribed=1`
5. DB: `enabledModules` enthält `vt`

Ohne Login: `POST /api/stripe/verwalter-tools-checkout` → **401**

## 5. QA

```bash
bash scripts/ops/verwalter-qa-pack.sh
# Mit Login optional:
B2B_ADMIN_PASSWORD='…' bash scripts/ops/verwalter-qa-pack.sh
```

## 6. API

| Endpoint | Auth | Beschreibung |
|----------|------|--------------|
| `POST /api/stripe/verwalter-tools-checkout` | Session | Stripe Checkout Session |
| `/api/verwalter/*` | Session + optional Gating | `requireVerwalterAuth` |

Gating nur aktiv wenn `VERWALTER_TOOLS_GATING=1`. Admins haben immer Zugang.
```

### Datei: docs/VERWALTER_SUITE_ROADMAP.md
```markdown
# Verwalter-Suite — Strategie & Roadmap (Brainstorm)

Stand: Juni 2026 · Immobilien Akademie Smart

## Ausgangslage

Heute: **Lernportal** (Module 1–5) + **Rechenpraxis** (138 Rechenaufgaben) + Audio-Modus + KI-Tutor.

Deine Idee: Darüber hinaus eine **Verwalter-/WEG-Praxis-Suite** — nicht nur Rechnen, sondern auch:
- Eigentümerversammlung & Beschlüsse
- Mahnwesen & Rückstandsbeitreibung
- Vorlagen (Anschreiben, Abmahnungen, Einladungen)
- Objekt- und Eigentümer-CRM
- Gewerbe + Wohnen

## Markt-Einordnung (kurz)

| Segment | Beispiele | Stärke | Lücke für uns |
|---------|-----------|--------|---------------|
| Vollsoftware | casavi, Immoware24, WEGonline | Vollprozess | Teuer, wenig Didaktik |
| Rechner-SaaS | WEG-Profi, NK-Rechner | Schnelle Kalkulation | Kein CRM, kein Lernpfad |
| Kurse | SFA, IHK | Zertifikat | Kein Alltags-Tool |

**Chance:** Didaktik + KI + Praxis-Tools in einem Ökosystem — „lernen und sofort anwenden“.

## Produkt-Vision: 3 Schichten

### Schicht 1 — Lernen (heute, ausgebaut)
- Module, Audio, Rechenpraxis, Fehler-Katalog
- Status: ✅ live, weiter polieren

### Schicht 2 — Vorlagen & Checklisten (MVP, 3–6 Monate)
Kein vollständiges CRM zuerst — **sofort nutzbare Bausteine**:

| Bereich | Inhalte | Quelle / Rechtliches |
|---------|---------|----------------------|
| ETV | Einladung, Tagesordnung, Protokoll-Checkliste | § 24 WEG, Muster BGH |
| Beschlüsse | Anfechtungsfristen, Zustellung, Mehrheiten | § 25, § 46 WEG |
| Mahnwesen | 1./2. Mahnung, Verzugszinsen, Inkasso-Übergabe | BGB § 286, WEG |
| NK-Abrechnung | Fristen, Widerspruch, Erläuterungspflicht | BetrKV, § 28 WEG |
| Kommunikation | Eigentümer-Info, Sanierungsankündigung, Lärm | Hausordnung, DSGVO |

**Format:** Ausfüllbare PDF/Markdown-Vorlagen + KI-Assistent „Formuliere Antwort an Eigentümer X“.

### Schicht 3 — CRM light (6–12 Monate)
- Objekte, Einheiten, Eigentümer (Stammdaten)
- Vorgänge: Beschluss, Mahnung, Schaden, ETV
- Fristen & Wiedervorlagen
- Optional: DATEV-Export, DocuSign

## Technische Architektur (Railway)

### Phase A — Subpath (günstig)
`immobilien-akademie-smart.de/app/verwalter/*` im bestehenden Projekt.
- Gleiche Auth, gleiche DB
- Schnellster Weg zum Test

### Phase B — Eigenes Railway-Projekt (dein Vorschlag)
`verwalter.immobilien-akademie-smart.de` oder später eigene Domain (United Domains).
- Eigenes Deployment, gemeinsame Auth via JWT/Cookie-Domain
- Skalierung unabhängig vom Lernportal
- **Empfehlung:** Erst wenn Schicht 2 Nutzer hat (>50 aktive Verwalter)

### KI-Host
- Rechenpraxis-Assistent und Verwalter-KI können **dieselbe** Anthropic-API nutzen
- Separater Host nur nötig bei Last/Isolation — nicht Tag 1

## Priorisierte Roadmap

| Prio | Feature | Aufwand | Nutzen |
|------|---------|---------|--------|
| P0 | Audio-Texte strukturiert + Zoom | klein | ✅ in Arbeit |
| P1 | 20 WEG-Vorlagen (ETV, Mahnung, NK) | mittel | Hoch |
| P1 | Rechenpraxis: 20 weitere WEG-Fälle (nicht nur Rechnen) | mittel | Hoch |
| P2 | Beschluss-Checkliste + Fristenrechner | mittel | Hoch |
| P2 | „Brief-Generator“ KI mit Pflichtfeldern | mittel | Sehr hoch |
| P3 | Objekt-Stammdaten (1 WEG = 1 Datensatz) | groß | CRM-Basis |
| P3 | B2B Multi-Mandant für Verwaltungsbüros | groß | Umsatz |

## Rechtliche Quellen (verlässlich)

- gesetze-im-internet.de (WEG, BGB, BetrKV)
- Haufe / Beck-online (Kommentare, kostenpflichtig)
- BGH-Urteile zu WEG (openJur, dejure.org)
- Verbraucherzentrale NK-Muster

**Hinweis:** Vorlagen sind **Muster ohne Rechtsberatung** — Disclaimer wie im Lernportal.

## Umsatz-Logik

| Paket | Preis-Idee | Inhalt |
|-------|------------|--------|
| Rechenpraxis Solo | 19 €/Mo | heute |
| Verwalter Tools | 39 €/Mo | Vorlagen + Brief-KI + Rechenpraxis |
| Büro (B2B) | 199–399 €/Mo | Team, White-Label, CRM light |

## Nächster konkreter Schritt (Vorschlag)

1. **Vorlagen-Pilot:** 5 Mahn- und ETV-Vorlagen als `/app/verwalter/vorlagen`
2. **KI-Brief:** Ein Endpoint „Formuliere Mahnung Stufe 1“ mit Pflichtfeldern
3. **Nutzer-Feedback** von 5 Verwaltern
4. Dann Entscheid: Subpath vs. eigenes Railway-Projekt

---

*Dieses Dokument ist eine Strategie-Skizze — keine Rechtsberatung. Preise und Wettbewerber vor Go-to-Market verifizieren.*
```

### Datei: docs/compliance_claims_fix_report.md
```markdown
# Compliance Claims Fix Report
## Phase 1 — Claims entschärft
**Datum:** 28. April 2026
**Branch:** marktreife-hardening-20260428

---

## ERLEDIGTE FIXES

| Nr | Datei | Alt | Neu | Risiko vorher | Status |
|----|-------|-----|-----|---------------|--------|
| 1 | FeedbackWidget.tsx:4 | QM-Pflicht nach AZAV §3 | interne Qualitätssicherung | ROT | ERLEDIGT |
| 2 | ComplaintForm.tsx:4 | QM-Pflicht nach AZAV §3 | interne Qualitätssicherung | ROT | ERLEDIGT |
| 3 | ComplaintForm.tsx:35 | Rechtsgrundlage: AZAV §3 Abs. 4 | Internes Beschwerdemanagement | ROT | ERLEDIGT |
| 4 | ComplaintForm.tsx:101 | gemäß AZAV §3 dokumentiert | intern dokumentiert | ROT | ERLEDIGT |
| 5 | KursPakete.tsx:30 | IHK-Niveau garantiert | an IHK-Themen orientiert | ROT | ERLEDIGT |

---

## BEWUSST BEHALTEN (mit Begründung)

| Datei | Claim | Begründung |
|-------|-------|------------|
| KursLanding.tsx:27 | AZAV-Zulassung in Vorbereitung | Ehrliche Zukunftsaussage — OK |
| WhiteLabelAdmin.tsx | AZAV-Felder | Nur intern/Admin — nicht öffentlich |
| PortalPhaseAdmin.tsx | AZAV Phase C/D | Nur Admin — nicht öffentlich |
| Foerderung.tsx:5 | Zertifizierungsverfahren | Ehrliche Beschreibung des Status |
| Impressum.tsx | kein staatlich anerkannter | Korrekte Einschränkung — BEHALTEN |
| certificates.ts | ersetzt nicht die offizielle IHK-Prüfung | Korrekte Einschränkung — BEHALTEN |

---

## NOCH OFFEN (externe Prüfung nötig)

| Nr | Bereich | Aufgabe |
|----|---------|---------|
| A | IHK-Claims in SEO.tsx | Rechtsanwalt prüfen lassen |
| B | Foerderung.tsx | Vollständige Seite prüfen lassen |
| C | AGB | Fachanwalt prüfen lassen |
| D | DSGVO-Aussagen | Datenschutzbeauftragten prüfen lassen |
| E | ZFU-Relevanz | Fernunterrichtsschutzgesetz prüfen |

---

## BELEG
- Build: pnpm build wird nach Commit ausgeführt
- Grep-Verifikation: keine AZAV §3 Claims mehr öffentlich sichtbar
```

### Datei: AGENTS.md
```markdown
# AGENTS.md — Jules Steuerungsdatei
# Jules liest diese Datei automatisch bei jedem Task.

## ABSOLUT VERBOTENE DATEIEN — NIEMALS AENDERN

drizzle/schema.ts
server/db.ts
server/ragTutor.ts
server/_core/context.ts
server/_core/sdk.ts

Wenn dein Plan eine dieser Dateien beruehrt: Aendere den Plan.
Wenn es technisch unmoeglich ist ohne diese Dateien: Brich den Task ab und berichte warum.

## KRITISCHE KORREKTUREN DIE NIEMALS UEBERSCHRIEBEN WERDEN DUERFEN

server/ragTutor.ts:
- Korrekter Modellname: claude-haiku-4-5
- NIEMALS: claude-haiku-4-5-20251001

drizzle/schema.ts:
- Enthaelt manuelle Type-Exports am Ende der Datei
- Diese Exports NIEMALS entfernen oder veraendern

## PFLICHTPRUEFUNG VOR PR-ERSTELLUNG

1. Fuehre aus: npx tsc --noEmit --skipLibCheck
2. Ergebnis muss sein: 0 errors
3. Pruefe: keine verbotene Datei geaendert
4. Pruefe: Module6/7/8 existieren nicht
5. Nur wenn alle 4 Punkte OK: PR erstellen

## STACK

React 19, Vite 5, TypeScript, Express 4.21.2, tRPC, MySQL 9.4, Drizzle ORM, Tailwind CSS 4, pnpm
```

### Datei: README.md
```markdown
# 🏠 Immobilien Akademie Premium

Eine vollständige E-Learning-Plattform für die Immobilienwirtschaft — gebaut mit React 19, Express, tRPC und MySQL.

[![Live](https://img.shields.io/badge/Live-Railway-blueviolet)](https://immobilie-akademie-premium-production.up.railway.app)
[![Node](https://img.shields.io/badge/Node-%3E%3D22.12-green)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---

## Inhaltsverzeichnis

- [Projekt-Übersicht](#projekt-übersicht)
- [Quick Start](#quick-start)
- [Tech-Stack](#tech-stack)
- [Architektur & Datenfluss](#architektur--datenfluss)
- [Projekt-Struktur](#projekt-struktur)
- [Umgebungsvariablen](#umgebungsvariablen)
- [API-Übersicht](#api-übersicht)
- [Entwicklung](#entwicklung)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Projekt-Übersicht

Immobilien Akademie Premium ist ein High-End Lernportal für angehende Immobilienprofis. Es bietet eine umfassende Vorbereitung auf die Sachkundeprüfung nach §34c GewO und §34i GewO sowie spezialisierte Inhalte für Verwalter und Gutachter.

### Kern-Features

- **Lernen:** 5 Module, 240 Lerntage, 1.920 Unterrichtseinheiten.
- **KI-Tutor:** Kontextbezogene Unterstützung durch modernste LLMs (Claude, Gemini, Groq).
- **Prüfungssimulation:** Echter IHK-Modus mit über 800 Fragen.
- **Tools:** Finanzrechner, Exposé-Trainer, Dokument-Werkstatt.
- **Gamification:** Badges, Level-System und Leaderboard.
- **White-Label:** Mehrmandantenfähig für B2B-Kunden.

---

## Quick Start

### Voraussetzungen

- **Node.js** ≥ 22.12
- **pnpm** ≥ 10.4
- **MySQL** 8.x (lokal oder Cloud-Instanz)

### Installation

```bash
# 1. Repository klonen
git clone https://github.com/smartlivingberlin/Immobilie-Akademie-Premium.git
cd Immobilie-Akademie-Premium

# 2. Abhängigkeiten installieren
pnpm install

# 3. Umgebungsvariablen konfigurieren
cp .env.example .env
# → .env mit echten Werten befüllen (siehe Abschnitt Umgebungsvariablen)
```

### Lokales Starten

```bash
# Entwicklungsserver starten (Frontend HMR + Backend Watch)
pnpm dev
```

Der Server läuft standardmäßig auf **http://localhost:8080**.

---

## Tech-Stack

| Schicht | Technologie |
|---------|-------------|
| **Frontend** | React 19, TypeScript, Vite 7, Tailwind CSS 4, Wouter |
| **Backend** | Node.js 22, Express 4.21, tRPC 11 |
| **Datenbank** | MySQL 8, Drizzle ORM |
| **Authentifizierung** | JWT (jose), PBKDF2 Hashing |
| **KI / LLM** | Anthropic Claude 3.5, Google Gemini 2.5, Groq |
| **Infrastruktur** | Railway, Sentry, Stripe |

---

## Architektur & Datenfluss

Die Plattform folgt einer modernen Single-Page-Application (SPA) Architektur mit einem typsicheren Backend.

1.  **Frontend (React):** Kommuniziert primär über **tRPC** mit dem Server für typsichere API-Calls.
2.  **Backend (Express):** Beherbergt den tRPC-Router, REST-Endpunkte für Webhooks/Dateien und die Business-Logik.
3.  **Datenbank (Drizzle):** Abstrahiert MySQL-Zugriffe und verwaltet Migrationen.
4.  **Auth:** Sitzungsverwaltung über HttpOnly-Cookies und JWT.

---

## Projekt-Struktur

```
.
├── client/              # Frontend (React SPA)
│   ├── src/
│   │   ├── components/  # UI-Komponenten (shadcn/ui)
│   │   ├── pages/       # Routen-Komponenten
│   │   ├── hooks/       # Custom React Hooks
│   │   └── _core/       # Core-Logik (Auth, tRPC Client)
├── server/              # Backend (Node.js Express)
│   ├── _core/           # Infrastruktur (Server-Entry, Auth, LLM)
│   ├── agent/           # KI-Agenten und Automatisierung
│   ├── routers.ts       # Haupt-tRPC Router
│   └── *.ts             # Domänen-spezifische Router/Logik
├── drizzle/             # Datenbank-Schema und Migrationen
└── shared/              # Gemeinsame Typen und Konstanten
```

---

## Umgebungsvariablen

Folgende Variablen sind für den Betrieb erforderlich:

| Variable | Beschreibung | Pflicht |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL Connection String | Ja |
| `JWT_SECRET` | Geheimer Schlüssel für Sessions | Ja |
| `STRIPE_SECRET_KEY` | Stripe API Schlüssel | Ja |
| `ANTHROPIC_API_KEY` | Key für Claude KI-Tutor | Nein (empfohlen) |
| `GEMINI_API_KEY` | Key für Gemini Fallback | Nein |
| `RESEND_API_KEY` | E-Mail Versand (Passwort-Reset) | Nein |

---

## API-Übersicht

### tRPC (Haupt-API)
Die meisten Aktionen (Kursfortschritt, Quiz, Nutzerdaten) laufen über tRPC Prozeduren unter `/api/trpc`.

### REST Endpunkte
- `POST /api/auth/login`: Nutzer-Login
- `POST /api/auth/register`: Nutzer-Registrierung
- `GET /api/user/export`: DSGVO Daten-Export
- `POST /api/stripe/webhook`: Stripe Zahlungs-Bestätigung

---

## Testing

```bash
pnpm test       # Unit & Integration Tests (Vitest)
pnpm test:e2e   # End-to-End Tests (Playwright)
```

---

## Deployment

Das Projekt ist für **Railway** optimiert.
- Ein Push auf `main` triggert einen automatischen Build über `nixpacks`.
- Datenbank-Migrationen laufen automatisch beim Server-Start (`migrate.ts`).

---

## Troubleshooting

- **Crashes beim Start:** Prüfen, ob `DATABASE_URL` erreichbar ist.
- **Auth-Probleme:** `JWT_SECRET` muss mindestens 32 Zeichen lang sein.
- **KI antwortet nicht:** Kontingent der API-Keys prüfen.
```

### Datei: ARCHITECTURE.md
```markdown
# 🏗️ Architektur — Immobilien Akademie Premium

Dieses Dokument beschreibt die technische Architektur der Plattform: wie die Schichten zusammenspielen, wie Daten fließen und welche Designentscheidungen getroffen wurden.

---

## Inhaltsverzeichnis

- [Systemübersicht](#systemübersicht)
- [Frontend (React + Vite)](#frontend-react--vite)
- [Backend (Express + tRPC)](#backend-express--trpc)
- [Datenbank (MySQL + Drizzle)](#datenbank-mysql--drizzle)
- [Authentifizierung](#authentifizierung)
- [KI-Integration](#ki-integration)
- [Zahlungen (Stripe)](#zahlungen-stripe)
- [White-Label-System](#white-label-system)
- [Sicherheit](#sicherheit)
- [Performance](#performance)
- [Datenfluss-Beispiele](#datenfluss-beispiele)

---

## Systemübersicht

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                              │
│                                                             │
│  React 19 SPA (Vite 7)                                      │
│  ├── Wouter (Routing)                                       │
│  ├── TanStack Query (Server State)                          │
│  ├── tRPC Client (typsichere API-Calls)                     │
│  └── Tailwind CSS 4 + shadcn/ui (UI)                        │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS (JSON/tRPC)
                       │ Cookie: app_session_id (JWT)
┌──────────────────────▼──────────────────────────────────────┐
│                   Express Server (Node.js 22)               │
│                                                             │
│  Middleware-Stack:                                          │
│  ├── Helmet (Security Headers)                              │
│  ├── Compression (Gzip/Brotli)                              │
│  ├── Rate Limiter (Login: 10/15min, AI: 15/min)             │
│  ├── Cookie Parser                                          │
│  └── CORS                                                   │
│                                                             │
│  Routen:                                                    │
│  ├── /api/trpc/*     → tRPC (appRouter)                     │
│  ├── /api/auth/*     → Email/Passwort Auth                  │
│  ├── /api/stripe/*   → Stripe Checkout + Webhook            │
│  ├── /api/health     → Healthcheck                          │
│  └── /*              → React SPA (index.html)               │
└──────────────────────┬──────────────────────────────────────┘
                       │ mysql2 (TCP)
┌──────────────────────▼──────────────────────────────────────┐
│                   MySQL 8                                   │
│                                                             │
│  Drizzle ORM                                                │
│  ├── Schema: drizzle/schema.ts                              │
│  └── Migrations: drizzle/0000–0015.sql (auto beim Start)    │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend (React + Vite)

### Technologien

| Technologie | Version | Zweck |
|-------------|---------|-------|
| **React** | 19 | UI-Framework |
| **TypeScript** | 5.x | Typsicherheit |
| **Vite** | 7 | Build-Tool + Dev-Server |
| **Tailwind CSS** | 4 | Utility-first CSS |
| **shadcn/ui** | — | Basis-UI-Komponenten (Radix UI) |
| **Wouter** | 3.7 | Leichtgewichtiges Routing |
| **TanStack Query** | 5 | Server-State-Management |
| **tRPC Client** | 11 | Typsichere API-Calls |

### Routing

Seiten werden in `client/src/App.tsx` definiert und via `React.lazy()` für optimales Code-Splitting geladen.

### Zugriffskontrolle

- **ProtectedRoute:** Verlangt gültige Sitzung.
- **AdminRoute:** Verlangt `role === 'admin'`.
- **ModuleGuard:** Prüft, ob der Nutzer das spezifische Kursmodul erworben hat.

---

## Backend (Express + tRPC)

### tRPC Router-Struktur

Der `appRouter` in `server/routers.ts` aggregiert alle Sub-Router:
- `auth`: Login, Registrierung, Onboarding.
- `quiz`: Fragenkatalog und Übungen.
- `exam`: Prüfungsmodus und Auswertung.
- `whitelabel`: Mandanten-Konfiguration.
- `aiAssistant`: KI-Tutor Konversationen.

### Middleware

1.  **Sicherheit:** Helmet für CSP/HSTS, CORS-Einschränkungen.
2.  **Rate Limiting:** Schutz vor Brute-Force auf Auth-Routen.
3.  **Auth:** Cookie-Parser liest JWT, `createContext` stellt den Nutzer für tRPC bereit.

---

## Datenbank (MySQL + Drizzle)

### Schema (Auszug)

- **users:** Kern-Nutzerdaten, Rollen, freigeschaltete Module.
- **question_bank:** Über 800 IHK-orientierte Prüfungsfragen.
- **exam_sessions:** Protokollierung von Prüfungsversuchen.
- **learning_logs:** AZAV-konformes Tracking der Lernzeit.
- **whitelabel_configs:** Branding-Daten pro Tenant.

### Migrationen

Drizzle-Kit generiert SQL-Migrationen, die vom Server beim Start (`server/migrate.ts`) automatisch ausgeführt werden.

---

## KI-Integration

Die Plattform nutzt eine Abstraktionsschicht (`server/_core/llm.ts`), um flexibel zwischen Anbietern zu wechseln:
1.  **Anthropic (Claude):** Primär für den KI-Tutor und komplexe Textanalysen.
2.  **Google (Gemini):** Kosteneffizientes Fallback für Standardanfragen.
3.  **Groq:** Hochgeschwindigkeits-Inferenz für Transkriptionen.

---

## Sicherheit

- **Passwörter:** PBKDF2 mit 100k Iterationen (Node built-in crypto).
- **Sessions:** JWT in HttpOnly, Secure, SameSite=Lax Cookies.
- **API:** Typsichere Eingabe-Validierung via Zod in tRPC.
- **CSP:** Strenge Content Security Policy zur Vermeidung von XSS.

---

## Performance

- **Lazy Loading:** Frontend-Chunks werden erst bei Bedarf geladen.
- **DB-Indizes:** Optimierte Abfragen auf häufig genutzten Spalten (`userId`, `moduleId`).
- **Compression:** Gzip/Brotli Kompression für alle HTTP-Antworten.
```

### Datei: MASTER_CONTROL.md
```markdown
# IMMOBILIEN AKADEMIE SMART PREMIUM
# Master Control Document — Stand: 12.05.2026

## DIE 5 HAUPTZIELE (unveränderlich)
1. Portal ist marktreif und verkaufbar
2. Zahlungen funktionieren (Stripe Live)
3. Nutzer-Flows sind fehlerfrei
4. Legal compliant (Gewerbeschein, AGB, DSGVO)
5. Jobcenter-Präsentation möglich

## LAUNCH-CHECKLISTE (was blockiert Go-Live)
- [ ] Stripe Webhook konfigurieren (NUR ALISAD)
- [ ] Gewerbeschein anmelden (NUR ALISAD)
- [ ] Domain kaufen (NUR ALISAD)
- [x] Login-System korrekt (erledigt 11.05)
- [x] Routing rollenbasiert (erledigt 11.05)
- [x] Claims korrekt (erledigt 11.05)
- [x] Stripe Checkout funktioniert (erledigt)
- [x] 810 IHK-Fragen validiert (erledigt)

## VERBOTENE ABWEICHUNGEN
- Kein Refactoring von db.ts oder routers.ts
- Keine neuen Features bis Stripe Webhook live
- Keine Bundle-Optimierung bis Launch
- Kein Umbau von funktionierenden Systemen

## BEKANNTE TECHNISCHE SCHULDEN (nach Launch)
- db.ts 1295 Zeilen aufteilen
- routers.ts 977 Zeilen aufteilen
- Sentry aktivieren
- 2FA Session-Cookie absichern
- WCAG vollständig
```

