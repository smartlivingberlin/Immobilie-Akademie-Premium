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
