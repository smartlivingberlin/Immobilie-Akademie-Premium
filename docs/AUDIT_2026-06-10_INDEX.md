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
