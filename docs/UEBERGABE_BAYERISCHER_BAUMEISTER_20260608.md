# Übergabedokument — Immobilien Akademie Smart

**Empfänger:** Bayerischer Baumeister / Stakeholder-Review  
**Erstellt:** 08.06.2026  
**Produkt:** [immobilien-akademie-smart.de](https://immobilien-akademie-smart.de)  
**Repository:** `smartlivingberlin/Immobilie-Akademie-Premium`  
**Product Owner:** Alisad Gadyri (`alisadgadyri38@gmail.com`)  
**Zeitraum dieser Übergabe:** ca. 06.06.2026 – 08.06.2026 (seit letzter Cloud-Agent-Kommunikation)

---

## 1. Executive Summary (Ampel)

| Bereich | Status | Kurzfassung |
|---------|--------|-------------|
| **Produktion** | 🟢 | Live, DB verbunden, 0 ausstehende Migrationen |
| **Module 1–5** | 🟢 | Lernpfad, Inspect, Smoke-Tests im Code |
| **B2B White-Label** | 🟡 | Checkout + Onboarding live; Team-Code-E2E noch manuell zu verifizieren |
| **Stripe** | 🟡 | Testmodus vollständig (18/18 Price-IDs); Live-Go-Live offen |
| **Backup / R2** | 🟢 | Täglicher Cron aktiv, Restore-Test bestanden |
| **Security** | 🟢 | Quiz-Guard 403, ki-stats abgesichert, Claims zentralisiert |
| **Compliance / Legal** | 🟡 | Gewerbeschein, DMARC, AVVs extern offen |
| **CI / QA** | 🟢 | 122 Unit-Tests grün, tsc 0 Fehler |
| **UX / Landing** | 🟢 | Login + B2B-Portal jetzt sichtbar auf Startseite |

**Gesamturteil:** Technisch marktreif im Testbetrieb. Live-Zahlungen und externe Legal-Tasks blockieren den vollen Go-Live. B2B-Flow ist implementiert, letzte Abnahme durch Baumeister empfohlen.

---

## 2. Was wurde seit dem letzten Stand gemacht?

### 2.1 Chronologie (06.–08.06.2026)

| Datum | PR / Commit | Inhalt |
|-------|-------------|--------|
| 07.06. | #119–#122 | Phase 15 Price-Readiness, B2B Webhook/Cron, Modul 5 Polish, Stripe E2E |
| 07.06. | #120 | Security-Sprint: ki-stats Gate, Quiz-Schutz, Claims, Cookie-Banner |
| 07.06. | #121 | Sprint M+I+L+O: Modul 4 Lernpfad, Inspect-Polish, Landing, Backup-Ops |
| 07.06. | #123–#126 | R2-Backup-Workflow, MySQL-Ops-Runbook, HealthWatcher, B2B-Migration-Ledger |
| 08.06. | #127 | Stripe Price-Seed-Script (18 ENV-Variablen automatisiert) |
| 08.06. | #128 | B2B-Smoke-Doku, R2-Ops-Skripte, Stripe-Live-Go-Live-Anleitung |
| 08.06. | #129 | CI-Fix: Railway `link` → `run --project/--environment/--service` |
| 08.06. | #130 | CI-Fix: vorgeinstalliertes AWS CLI statt fehlgeschlagener Installation |
| 08.06. | #132 | **R2 Daily Cron aktiviert** (02:17 UTC) nach erfolgreichem Restore-Test |
| 08.06. | #133 | **B2B Team-Code Bugfix** (SQL, UI-Anzeige, `/code-einloesen`) |
| 08.06. | #135 | **Landing: sichtbarer Login** (Header + Hero-Link) |
| offen | #134 | CLI-Script `ops:b2b-team-smoke` (noch nicht gemergt) |

### 2.2 Infrastruktur & Ops

**Cloudflare R2 Backup (neu abgeschlossen):**
- Bucket: `immobilien-akademie-backups`
- 7 GitHub Secrets konfiguriert (`RAILWAY_TOKEN`, `R2_*`, `BACKUP_ENCRYPTION_PASSPHRASE`)
- Workflow: `.github/workflows/mysql-backup-r2.yml`
- Erster erfolgreicher Produktions-Backup-Lauf
- Lokaler Restore-Test: **RESTORE OK**
- Täglicher Cron: **aktiv** (PR #132)

**Railway / MySQL:**
- Health-Endpoint: `ok: true`, `db: connected`
- Migrationen: **45 angewendet**, **0 pending**
- Letzte Migration: `add-indexes.sql`
- Runbook: `docs/RAILWAY_MYSQL_OPS.md`

**GitHub Actions CI:**
- Railway Project Token (nicht Account Token) für Backup-Workflow
- R2-Secret-Whitespace-Trim bei Setzen der Secrets

### 2.3 B2B White-Label (Maklerbüros)

**Implementiert:**
- Landing `/fuer-maklerbueros` (HTTP 200)
- Stripe Checkout Starter / Professional (Testmodus)
- Onboarding-Wizard `/b2b-einrichtung?b2b=1`
- Team-Code-Generierung mit Tenant-Zuordnung
- Webhook: `checkout.session.completed` + `invoice.paid` (inkl. Fix für `parent.subscription_details`)
- Tenant **bobo gmbh** provisioniert (Starter, M1+M2)

**Bugfixes (PR #133):**
1. `GET /api/b2b/onboarding/team-codes` — falsche SQL-Spalte `maxUses` → `max_uses`
2. UI zeigte neuen Code nach POST nicht an → jetzt Anzeige + Auto-Copy
3. `/code-einloesen` löste nur `presentation_codes` ein, nicht `access_codes` → neues Modul `server/accessCodeRedeem.ts`

**Noch offen (manuelle Abnahme):**
- Vollständiger E2E: Admin erstellt Team-Code → zweites Konto löst ein → M1+M2 sichtbar
- Blocker bisher: Admin-Passwort für `alisadgadyri38@gmail.com` nicht gesetzt (Stripe-Kauf ohne Passwort)
- Lösung: `/forgot-password` einmalig nutzen

### 2.4 Stripe & Monetarisierung

**Testmodus (aktuell):**
- 18 Price-IDs per `pnpm run stripe:seed-prices` seedbar
- Webhook-ID: `we_1T97TbJV2Q8pgfvupUp7Nsyt`
- Admin-Dashboard: `/admin/stripe-live`
- Go-Live-Anleitung: `docs/STRIPE_LIVE_GO_LIVE.md`

**Umsatzströme im Code:**
| Stream | Status |
|--------|--------|
| B2C Einzelmodule & Bundles | ✅ Checkout + Webhook |
| B2B Starter/Professional (199–499 €/Mo) | ✅ Testmodus |
| Compliance-SKU 249 €/Jahr | ✅ + Backfill-Script |
| Referral-Gutscheine | ✅ Admin + Einlösung |
| Partner-Payouts / Connect | ✅ Ledger + Cron (deaktiviert bis Live) |
| KI Fair-Use 50/Tag + Renewal | ✅ |
| Ablauf-E-Mails 30/7/1 Tage | ✅ |

### 2.5 Produkt & Lernmodule

| Modul | Status | Hinweis |
|-------|--------|---------|
| Modul 1 | ✅ Live | Mit Intro + Detail |
| Modul 2 | ✅ Live | 480 UE / §34c |
| Modul 3 | ✅ Live | |
| Modul 4 | ✅ Live | Lernpfad-Fix (Loading) |
| Modul 5 | ✅ Live | Polish + E2E |
| Modul 6–8 | ❌ Nicht im Repo | Bewusst ausgelassen (AGENTS.md) |

**Weitere Produktfeatures (seit früheren Sprints, weiterhin aktiv):**
- Weiterbildungsnachweis §15b MaBV (Stundenlog + PDF)
- Inspect v2 (Admin read-only Vorschau)
- Rechenpraxis + Verwalter-Rechner (portal-geschützt)
- KI-Tutor (RAG, Modell: `claude-haiku-4-5`)
- Barrierefreiheit / Smart Access Layer
- USP-Landing `/warum-wir`

### 2.6 Security & Compliance

| Maßnahme | Status |
|----------|--------|
| Quiz-Datenbank `/data/all-questions.json` anonym → 403 | ✅ verifiziert 08.06. |
| `/api/admin/ki-stats` mit `requireAdmin` | ✅ PR #91 |
| Owner 2FA Resend Rate-Limit 3/15min | ✅ PR #93 |
| Claims zentral in `shared/claims.ts` | ✅ PR #94 |
| Cookie-Banner ehrlich (Umami) | ✅ PR #94 |
| Auth-Cookie-Kohärenz Login/Inspect/Owner | ✅ PR #98 |
| GDPR-Löschung Coverage-Tests | ✅ |

**Extern offen (Baumeister / Alisad):**
- Gewerbeschein Impressum (~26 € Berlin)
- DMARC `p=reject`
- DSGVO-AVVs (Processor-Verträge)
- `OWNER_MAGIC_CODE` rotieren
- AZAV-Claims ohne Zulassung — Marketing abstimmen

### 2.7 UX-Verbesserung (08.06., PR #135)

**Problem:** Kunden fanden Login auf der Startseite nicht (nur Footer-Link).

**Lösung:**
- `PublicHeader` in `PublicLayout` eingebunden
- Links: **Anmelden**, **Code einlösen**, **B2B-Portal**
- Hero auf Startseite: „Bereits Kunde? Anmelden …“

---

## 3. Technischer Audit (08.06.2026)

### 3.1 Automatisierte Tests

| Prüfung | Ergebnis | Details |
|---------|----------|---------|
| `npx tsc --noEmit --skipLibCheck` | ✅ **0 Fehler** | TypeScript strict |
| `pnpm vitest run` | ✅ **122/122** | 48 Test-Dateien |
| `pnpm run ops:health` | ✅ **ok** | DB connected, migrations pending 0 |
| Quiz-Guard `/data/all-questions.json` | ✅ **HTTP 403** | ohne Login |
| B2B Landing `/fuer-maklerbueros` | ✅ **HTTP 200** | |
| Startseite `/` | ✅ **HTTP 200** | |
| `/login`, `/code-einloesen` | ✅ **HTTP 200** | |

### 3.2 Playwright E2E (Produktion)

| Suite | Ergebnis | Grund |
|-------|----------|-------|
| `test:e2e:smoke` | ⚠️ Nicht ausgeführt | Login `playwright@test.de` → 401 (Testkonto fehlt in Prod) |
| `test:e2e:stripe-guards` | ⚠️ Nicht ausgeführt | Gleicher global-setup Login |
| `test:e2e:b2b` | ⚠️ Nicht ausgeführt | Benötigt `MAGIC_LINK_SECRET` + Credentials |

**Empfehlung für Baumeister:** Testkonto `playwright@test.de` / `Test2026!` in Produktion anlegen **oder** E2E-Credentials in GitHub Secrets hinterlegen.

### 3.3 Server-Unit-Test-Abdeckung (Auswahl)

- `accessCodeRedeem.test.ts` — 3 Tests (neu, PR #133)
- `stripeWebhookProcess.test.ts`, `stripePurchaseHandler.test.ts`
- `partnerPayoutCron.test.ts`, `partnerConnectTransfer.test.ts`
- `securityGuards.test.ts`, `module-data-guard.test.ts`
- `mysqlHealth.test.ts`, `migrate.test.ts`
- `whitelabel.test.ts`, `certificates.test.ts`, `aiAssistant.test.ts`

### 3.4 Bekannte Fehler & Korrekturen (Session-Log)

| Fehler | Ursache | Fix | Status |
|--------|---------|-----|--------|
| Railway `unexpected argument` | Alte CLI-Syntax | PR #129 | ✅ |
| Railway `Unauthorized` | Account statt Project Token | User: Project Token | ✅ |
| AWS CLI Install fehlgeschlagen | Runner hat CLI bereits | PR #130 | ✅ |
| R2 `Invalid endpoint` | Newlines in Secrets | `printf '%s'` beim Setzen | ✅ |
| R2 `access key length 21` | Falscher Key in Secret | User: 32-Zeichen-Key | ✅ |
| GPG `Bad session key` | Alte Passphrase | Passphrase rotiert | ✅ |
| Team-Code unsichtbar | SQL + UI + Redemption | PR #133 | ✅ |
| Admin Login 401 (CLI) | Kein Passwort gesetzt | `/forgot-password` | ☐ User |
| Kein Login auf Landing | Fehlender Header | PR #135 | ✅ |

---

## 4. Prüfliste für den Bayerischen Baumeister

Bitte jeden Punkt abhaken und bei Abweichung notieren.

### 4.1 Produktion & Stabilität

- [ ] `https://immobilien-akademie-smart.de/api/health` → `ok: true`
- [ ] Startseite: Login-Link sichtbar (Header + Hero)
- [ ] Modul 1–5: jeweils Tag 1 öffnen, kein Endlos-Loading
- [ ] KI-Tutor antwortet sinnvoll (Fair-Use-Hinweis bei Limit)

### 4.2 B2B-Flow (kritisch)

- [ ] `/fuer-maklerbueros` — Preise und CTA korrekt
- [ ] Test-Checkout mit Karte `4242…` → Redirect `/b2b-einrichtung?b2b=1`
- [ ] Branding speichern (Name, Farbe, Logo optional)
- [ ] Team-Code generieren → Code wird angezeigt und kopiert
- [ ] Zweites Konto: `/code-einloesen` → Code einlösen → Module sichtbar
- [ ] `/admin/stripe-live` — letztes Webhook-Event grün

### 4.3 Backup & Disaster Recovery

- [ ] GitHub Actions: letzter `mysql-backup-r2` Run grün
- [ ] R2-Bucket enthält verschlüsselte Dumps
- [ ] Restore-Prozedur dokumentiert: `docs/RUNBOOK_BACKUP_RESTORE.md`

### 4.4 Recht & Marketing

- [ ] Impressum vollständig (Gewerbeschein-Nummer?)
- [ ] AGB / Datenschutz konsistent mit Zugangsmodell
- [ ] Keine überzogenen IHK/AZAV-Claims auf Landing
- [ ] Cookie-Banner stimmt mit tatsächlicher Tracking-Nutzung überein

### 4.5 Vor Stripe Live

- [ ] B2B Smoke vollständig grün (siehe `docs/B2B_SMOKE_TEST.md`)
- [ ] `docs/STRIPE_LIVE_GO_LIVE.md` Schritt für Schritt
- [ ] Live-Webhook neu anlegen (nicht Test-`whsec_` wiederverwenden)
- [ ] Kleiner Live-Testkauf mit echter Karte

---

## 5. Offene PRs & nächste technische Schritte

| Item | Status | Aktion |
|------|--------|--------|
| PR #134 B2B CLI Smoke Script | OFFEN | Merge nach Review |
| Admin-Passwort setzen | OFFEN | Alisad: `/forgot-password` |
| B2B Team-Code E2E | OFFEN | Nach Passwort: `docs/B2B_SMOKE_TEST.md` Phase D |
| Stripe Live | OFFEN | Nach B2B-Abnahme |
| `EXTERNAL_OPS_CHECKLIST.md` | TEILWEISE VERALTET | R2 Restore + Cron sind erledigt |
| Playwright-Testkonto Prod | OFFEN | Für CI/E2E auf Prod |

---

## 6. Brainstorming — Ausbau, Verkaufbarkeit, Stakeholder

### 6.1 Für Endnutzer (Makler / Azubis)

| Idee | Nutzen | Aufwand |
|------|--------|---------|
| **Modul-Fortschritt auf Landing** (Social Proof) | Vertrauen, Conversion | Mittel |
| **Testimonials + echte Zertifikatszahlen** | Trust | Niedrig (Content) |
| **Mobile App / PWA** | Lernen unterwegs | Hoch |
| **Push bei Ablauf 30/7/1** (bereits E-Mails) | Renewal-Rate ↑ | Niedrig (bereits da) |
| **Gamification** (Streaks, Badges) | Engagement | Mittel |
| **Modul 6–8** (Bauträger, Verwalter, Spezial) | Upsell, Vollqualifikation | Hoch |

### 6.2 Für B2B-Partner (Maklerbüros)

| Idee | Nutzen | Aufwand |
|------|--------|---------|
| **White-Label Demo-Tenant** für Sales | Schnellere Abschlüsse | Mittel |
| **Mandanten-Dashboard** (Team-Fortschritt) | Verwalter-Value | Mittel |
| **API / SSO** für große Ketten | Enterprise | Hoch |
| **Jahresvertrag-Rabatt** vs. Monat | Cashflow | Niedrig (Pricing) |
| **Onboarding-Video** im B2B-Wizard | Weniger Support | Niedrig |

### 6.3 Für Investoren / Stakeholder

**Stärken heute:**
- Vollständiger Lernstack (5 Module, KI, Zertifikate, Rechenpraxis)
- Drei Umsatzkanäle architektonisch vorbereitet (B2C, B2B, Compliance)
- Automatisiertes Backup + Migration-Ledger + Health-Monitoring
- 122 automatisierte Tests, Security-Hardening abgeschlossen

**KPIs für Pitch (nach Live):**
- MRR aus B2B-Tenants
- Conversion Landing → Checkout
- Churn / Renewal-Rate (5 € / 29 € Verlängerung)
- KI-Nutzung pro aktivem Nutzer
- Zertifikate ausgestellt / Woche

**Investor-Story:**
> „Die einzige KI-native Immobilien-Akademie mit B2B-White-Label, Compliance-SKU und integriertem Rechenpraxis-Ökosystem im DACH-Raum — technisch Go-Live-ready, Legal-Blocker extern lösbar.“

### 6.4 Priorisierte Roadmap (Vorschlag)

```
Sofort (Woche 1):
  ├── B2B Smoke abnehmen
  ├── Admin-Passwort + Team-Code E2E
  └── Gewerbeschein + Impressum

Kurzfristig (Wochen 2–4):
  ├── Stripe Live
  ├── 5 Testimonials + Social Proof
  └── PR #134 mergen + Playwright Prod-Konto

Mittelfristig (Monate 2–3):
  ├── Modul 6 Konzept
  ├── B2B Sales-Demo-Tenant
  └── SEO Schema.org + Google Business

Langfristig:
  ├── AZAV-Zulassung prüfen
  ├── Enterprise SSO
  └── Mobile PWA
```

Vollständige Roadmap: `docs/GROWTH_ROADMAP.md`  
Wettbewerbsanalyse: `docs/COMPETITIVE_ANALYSIS.md`  
Case-Management: `docs/CASE_MANAGEMENT_20260607.md`

---

## 7. Freigabe & Unterschriften

| Rolle | Name | Datum | Freigabe |
|-------|------|-------|----------|
| Product Owner | Alisad Gadyri | | ☐ |
| Technischer Prüfer (Baumeister) | | | ☐ |
| Legal / Compliance | | | ☐ |
| Go-Live Stripe Live | | | ☐ |

**Freigabe-Kriterien:**
1. Alle Punkte in Abschnitt 4 abgehakt
2. B2B Team-Code E2E erfolgreich
3. Keine P0/P1 Security-Cases offen
4. Backup-Cron letzte 3 Tage grün
5. Legal-Blocker dokumentiert mit Termin

---

## 8. Referenz — Wichtige Befehle & URLs

```bash
# Health
pnpm run ops:health

# TypeScript
npx tsc --noEmit --skipLibCheck

# Unit-Tests
pnpm vitest run

# Stripe Preise (Test)
pnpm run stripe:seed-prices

# B2B E2E (nach Credentials)
pnpm run test:e2e:b2b
```

| URL | Zweck |
|-----|-------|
| `/login` | Anmeldung |
| `/forgot-password` | Passwort setzen |
| `/code-einloesen` | Zugangscode / Team-Code |
| `/fuer-maklerbueros` | B2B Landing |
| `/b2b-einrichtung` | B2B Onboarding |
| `/admin/stripe-live` | Stripe-Status |
| `/warum-wir` | USP-Landing |

---

## 9. Dokumenten-Index

| Datei | Inhalt |
|-------|--------|
| `docs/EXTERNAL_OPS_CHECKLIST.md` | Externe Ops-Aufgaben (Alisad) |
| `docs/B2B_SMOKE_TEST.md` | B2B Schritt-für-Schritt |
| `docs/STRIPE_LIVE_GO_LIVE.md` | Stripe Live-Anleitung |
| `docs/R2_ACTIVATION_CHECKLIST.md` | R2 Setup + Restore |
| `docs/RAILWAY_MYSQL_OPS.md` | MySQL Runbook |
| `docs/GROWTH_ROADMAP.md` | Wachstum & Monetarisierung |
| `docs/CASE_MANAGEMENT_20260607.md` | Case-Register & Stakeholder |

---

*Erstellt automatisch durch Cloud-Agent-Audit am 08.06.2026. Bei Fragen: Repository-Issues oder direkter Kontakt mit Alisad.*
