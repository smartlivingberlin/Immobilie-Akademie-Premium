# S250B Product Reality Matrix

Stand: `main` / `origin/main` = `49a228ecb3784fd72ba94a25ac0e0b3086a5ba51`.

Scope: Codebase- und Repo-Doku-Auswertung. Keine Live-Zahlung, kein Login-Smoke, kein DB-/Railway-/R2-Zugriff, keine ENV-Ausgabe.

Hinweis: Diese Datei wird durch die aktuelle `.gitignore`-Regel `*.md` nicht automatisch von Git erfasst und muss fuer einen PR bewusst mit `git add -f docs/PRODUCT_REALITY_MATRIX_S250B.md` aufgenommen werden.

## 1. Executive Summary

Das Portal besteht real aus zwei Produktlinien:

1. **Akademie-Hauptportal** mit öffentlichen Landingpages, Login, Kurs-/Paketseiten, geschützten Lernmodulen, Quiz-/Pruefungsfunktionen, KI-/Tutor-UI, Rechnern, Zertifikats-/Nachweisbereichen und Admin-/Owner-Flächen. Die Routen sind in `client/src/App.tsx` breit verdrahtet, unter anderem Public-Routen (`/`, `/kurse`, `/pakete`, Kurs-Landings), geschützte Lernrouten (`/modul/:id`, `/quiz`, `/pruefung`) und Admin-/Owner-Routen (`/admin`, `/admin/stripe-live`, `/owner-dashboard`) (`client/src/App.tsx:310-448`).
2. **Verwalter-Suite / Rechenpraxis** mit eigener Portalmodus-Logik, Landingpages und geschützten App-Routen fuer Vorlagen, Fristen, Objekte, Vorgänge, Buchungen, Mahnwesen, ETV, Inbox und Freigaben (`client/src/App.tsx:449-515`). Der Verwalter-Modus wird server- und clientseitig ueber `PORTAL_MODE` / `VITE_PORTAL_MODE` gesteuert (`server/_core/vite.ts:171`, `server/_core/vite.ts:224`, `client/src/lib/portalMode.ts:1-5`).

Stark belegt sind: Routing, Zugangsschutz fuer Module, Stripe-/Trial-/Pricing-Flows als Codepfade, Verwalter-Grundfunktionen, Admin-Readiness-Seiten, Backup-Dokumentation und CI-Gate-Transparenz. Nicht voll belegt sind: echte Live-Zahlungsfreigabe, authentifizierte KI/TTS-Smokes ohne Testkonto, Restore/Entschluesselungs-Proof, R2-Retention/Versionierung/Alerting, voll produktive Video-/Audio-Inhalte und komplette Verwalter-Betriebsreife.

Wichtig fuer Marketing: Das Repo enthaelt bewusst vorsichtige Formulierungen zu AZAV/Foerderung und spaeteren Phasen. Foerderung darf nicht als bestehender Anspruch beworben werden (`client/src/pages/Foerderung.tsx:5`, `client/src/pages/Home.tsx:350-351`, `server/portalPhase.ts:145-156`). Video-/Audio-Bereiche sind sichtbar, aber teilweise Coming-Soon/Demo (`client/src/components/ModuleVideoComingSoon.tsx:4`, `client/src/components/VideoPlayer.tsx:83`, `client/src/pages/AudioModus.tsx:33`, `client/src/pages/AudioModus.tsx:134`).

## 2. Bewertungslogik

| Status | Bedeutung |
|---|---|
| LIVE | Im Code als echte Route/Funktion umgesetzt und ohne offensichtlichen Placeholder-Hinweis nutzbar. |
| PARTIAL | Grundfunktion vorhanden, aber abhängig von Auth, ENV, Daten, Provider, Feature-Flag, Testabdeckung oder offenem Betriebsnachweis. |
| DEMO/UI ONLY | Sichtbare UI oder Demo vorhanden, aber Code/Text sagt selbst, dass Inhalt/Funktion noch nicht voll verfügbar ist. |
| BLOCKED | Funktion ist explizit durch Flag, fehlende Freigabe, fehlende ENV oder Sperre deaktiviert. |
| RISK | Funktion/Claim/Prozess kann rechtlich, betrieblich oder technisch riskant sein, wenn er zu stark beworben oder ohne Gate genutzt wird. |
| UNKNOWN | Im geprüften Repo nicht ausreichend belegbar. |

## 3. Matrix nach Produktbereich

| Bereich | Route/Datei | Nutzerwert | Status | Beleg im Code | Risiko | Empfehlung |
|---|---|---|---|---|---|---|
| Startseite / Public Entry | `/`, `client/src/pages/Home.tsx` | Einstieg, Nutzenversprechen, Modul-/Trust-Signale | LIVE | Root-Route auf Home im Akademie-Modus (`client/src/App.tsx:310`); Foerderhinweis vorsichtig formuliert (`client/src/pages/Home.tsx:350-351`) | Marketing-Claims muessen weiterhin vorsichtig bleiben | Regelmaessiger Claim-Scan vor Kampagnen |
| Kurs- und Paketseiten | `/kurse`, `/pakete`, Kurs-Landings | Kauf-/Auswahlpfad fuer Module und Pakete | LIVE / RISK | Routen (`client/src/App.tsx:322-328`); Checkout-Start in Kursseiten (`client/src/pages/Kurse.tsx:82`, `client/src/pages/kurs/KursLanding.tsx:252`) | Zahlungs-/Zugangsclaims duerfen nicht ueber AGB/Zugangspolitik hinausgehen | Pricing-/Claim-Matrix weiter pflegen |
| Geschuetzte Lernmodule | `/modul/1` bis `/modul/5` | Lerninhalte, Tagesmodule, Tabs | PARTIAL | Modulrouten (`client/src/App.tsx:410-419`); Zugang per `enabledModules`, Trial und Access-Ablauf (`client/src/components/ModuleGuard.tsx:34-48`) | Auth-Smoke und Content-Vollstaendigkeit nicht fuer alle Flows live bewiesen | Dediziertes Testkonto fuer S230C/Auth-Smoke bereitstellen |
| Quiz/Pruefung/Gamification | `/quiz`, `/pruefung`, `/gamification` | Lernkontrolle und Motivation | PARTIAL | Routen (`client/src/App.tsx:395-400`) | Nutzerwert stark vom Daten-/Session-Stand und Tests abhaengig | Separates Produkt-Smoke fuer Quiz/Pruefung/Gamification |
| KI-Assistent / KI-Tutor | Komponenten und Modul-UI | Lernunterstuetzung, Tutor-Interaktion | PARTIAL | Auth-Smoke ist ohne Credentials skipbar (`tests/e2e/28-auth-smoke-tutor.spec.ts:77`); KI-Fallbacks in `server/ragTutor.ts:301`, `server/ragTutor.ts:542`, `server/ragTutor.ts:551` | Provider-/ENV-/Fair-Use-Abhaengigkeit; keine volle Auth/KI/TTS-Live-Evidenz ohne Testkonto | Nur mit dediziertem Testkonto und ohne echte Provider-Last final smoken |
| Video-Tab | `ModuleVideoComingSoon`, `VideoPlayer` | Medienergaenzung zum Kurs | DEMO/UI ONLY | Coming-Soon-Komponente (`client/src/components/ModuleVideoComingSoon.tsx:4`); eigene Videos demnaechst (`client/src/components/VideoPlayer.tsx:83`) | Nicht als vorhandene Videobibliothek bewerben | Als Roadmap/Coming-Soon labeln |
| Audio-Modus | `/audio-modus`, `client/src/pages/AudioModus.tsx` | Audio-Lernen per Browser-Sprachausgabe und Lesson-Fetch mit Demo-Fallback | PARTIAL / FALLBACK-DEMO | Demo-Lesson-Fallback und API-Fetch (`client/src/pages/AudioModus.tsx:32-41`, `client/src/pages/AudioModus.tsx:65-78`); Nicht-verfuegbar-Hinweis nur bei fehlender Browser-Speech-Unterstuetzung (`client/src/pages/AudioModus.tsx:131-137`) | Risiko falscher Erwartung, wenn als fertige Audiobibliothek beworben | Als experimentellen Audio-Modus/Preview positionieren, echte Audio-Inhalte und Endpoint separat smoken |
| Zertifikate / Weiterbildungsnachweis | `/zertifikate`, `/weiterbildungsnachweis` | Nachweise und Lernabschluss | PARTIAL / RISK | Routen (`client/src/App.tsx:402-403`); Zertifikat-UI meldet nicht verfuegbar (`client/src/pages/Certificates.tsx:53`, `client/src/pages/Certificates.tsx:321`) | Zertifizierungs-/Anerkennungsclaims rechtlich sensibel | Strikte Trennung: Teilnahme-/Lernnachweis vs. offizielle Zertifizierung |
| Trial / Testzugang | `TrialForm`, `/api/trial/request` | Leadgenerierung und Testzugang | PARTIAL | Trial-Request-Frontend (`client/src/components/TrialForm.tsx:32`); Trial-Expiry im ModuleGuard (`client/src/components/ModuleGuard.tsx:34-39`) | Trial-Follow-up, Ablauf und E-Mail-Zustellung muessen operativ belegbar sein | Trial-Ende und Verlängerung separat smoken |
| Stripe Modul-/Bundle-Checkout | `/api/stripe/checkout`, `stripePriceIds` | Umsatzpfad fuer Einzelmodule und Bundles | PARTIAL / RISK | Checkout-Calls (`client/src/pages/Kurse.tsx:82`, `client/src/pages/kurs/KursLanding.tsx:252`); Price-ENV-Mapping (`shared/stripePriceIds.ts:3-10`, `shared/stripePriceIds.ts:55-67`) | Live-Zahlung darf ohne Markt-/Compliance-Freigabe nicht als fertig gelten | Stripe-Live-Go-Live-Checkliste beibehalten; keine echte Zahlung ohne Freigabe |
| Renewal / Access-Verlängerung | `RenewalPaywall` | Weiterbenutzung nach Laufzeit | PARTIAL | Renewal-Checkout (`client/src/components/RenewalPaywall.tsx:19`); Preislogik (`client/src/components/RenewalPaywall.tsx:41`, `client/src/components/RenewalPaywall.tsx:50`) | Ablauf-/Renewal-UX muss real getestet werden | Auth-Smoke mit abgelaufenem Testnutzer planen |
| B2B / WhiteLabel | `/partner-panel`, `/admin/whitelabel`, B2B-Landings | Firmen-/Mandantenverkauf | PARTIAL | Routen (`client/src/App.tsx:435`, `client/src/App.tsx:457`); WhiteLabel-Module (`client/src/pages/admin/WhiteLabelAdmin.tsx:83`, `client/src/pages/admin/WhiteLabelAdmin.tsx:184`) | Mandanten-/Branding-/Billing-Flows nicht aus Matrix allein voll bewiesen | B2B-End-to-End separat als eigener Track |
| Verwalter Landing | `/verwalter-suite`, `/rechenpraxis-preise` | Produktinformation und Pricing fuer Verwalter | LIVE | Routen (`client/src/App.tsx:468-469`); H1/FAQ/Features in Landing (`client/src/pages/VerwalterSuiteLanding.tsx:22-49`) | Landing sagt selbst: kein vollwertiges ERP wie SCALARA/Immoware24/PowerHaus (`client/src/pages/VerwalterSuiteLanding.tsx:55`) | Als schlanke Suite/Assistenz positionieren, nicht als ERP-Ersatz |
| Verwalter App-Kern | `/app/verwalter/*` | Objekte, Vorgänge, Buchungen, ETV, Mahnwesen, Freigaben | PARTIAL | Routen (`client/src/App.tsx:470-515`); Buchungen/DATEV APIs (`client/src/pages/verwalter/BuchungenIndex.tsx:45-84`, `client/src/pages/verwalter/BuchungenIndex.tsx:183`); ETV APIs (`client/src/pages/verwalter/EtvIndex.tsx:45-152`) | Betriebsreife haengt an Auth, Datenpersistenz, Fehlerzuständen und Mandantenisolation | Verwalter-E2E mit Testtenant und Fehlerzustands-Audit |
| Verwalter Inbox/OCR/Voice | `InboxIndex`, Feature-Flags | Eingangskanal und Automatisierung | BLOCKED / PARTIAL | Feature-Flags (`shared/verwalterFeatureFlags.ts:4-12`); Inbox zeigt fehlende Aktivierung (`client/src/pages/verwalter/InboxIndex.tsx:126-133`) | Nicht als aktiv verkaufen, solange Flags/Provider nicht aktiv und getestet sind | Feature-Flag-Matrix in Produkt-/Sales-Doku spiegeln |
| Verwalter Tools Gating | `shared/verwalterToolsAccess.ts` | Paket-/Zugriffssteuerung fuer Tools | PARTIAL / UNKNOWN | Gating per ENV (`shared/verwalterToolsAccess.ts:6`); ohne Flag erlaubt (`shared/verwalterToolsAccess.ts:14`) | Falls produktiv nicht gesetzt, koennen Tools breiter offen sein als erwartet | Produktions-ENV-Konfiguration read-only pruefen |
| Admin / Owner Steuerung | `/admin`, `/owner-dashboard` | Betrieb, User, Stripe, Codes, Monitoring | LIVE / RISK | Admin-/Owner-Routen (`client/src/App.tsx:429-448`); Stripe-Admin (`client/src/pages/admin/StripeLiveChecklist.tsx:53-102`) | Sensible Flaechen; Sicherheits-/2FA-/Owner-Key-Gates muessen hart bleiben | Separate Security-Smokes fuer Admin/Owner, keine echten Secrets im Chat |
| Backup / Restore / Betrieb | GitHub Actions R2 Backup, Docs | Betriebsabsicherung | PARTIAL / RISK | R2-Upload im Backup-Workflow (`.github/workflows/mysql-backup-r2.yml:167-189`); Statusdoku: Restore/Entschluesselung offen (`docs/BACKUP_AUTOMATION_PLAN.md:11-15`) | Restore ist nicht bewiesen; R2-Retention/Versionierung/Alerting offen | S218C nur als Plan/Runbook, kein operativer Restore ohne Freigabe |
| CI / Test-Gates | `.github/workflows/ci.yml`, `docs/CI_GATE_MATRIX.md` | Qualitaetssicherung | PARTIAL | `check`/`docker-build` harte Jobs (`.github/workflows/ci.yml:10`, `.github/workflows/ci.yml:37`); E2E soft (`.github/workflows/ci.yml:48`, `.github/workflows/ci.yml:65`) | Gruene E2E-Signale sind nicht automatisch harte Merge-Gates | CI-Gate-Matrix bei jedem Risiko-Review mitlesen |
| AZAV / Foerderung / Rechtsclaims | `Foerderung`, `portalPhase` | Foerder-/Vertrauensargumentation | RISK | Foerderung erst nach AZAV und Einzelfall (`client/src/pages/Foerderung.tsx:5`, `client/src/pages/Foerderung.tsx:24`); Phase C nicht aktiv (`server/portalPhase.ts:145-156`) | Foerdergarantie, staatliche Anerkennung oder IHK-Zertifizierung waeren riskant, falls unbelegt | Nur "angestrebt" / "nicht garantiert" verwenden |

## 4. Akademie-Hauptportal

**Belegte Kernbereiche**

- Public-Seiten und Course-Landings sind breit geroutet: `/`, `/kurse`, `/pakete` und die fuenf Kurs-Landings (`client/src/App.tsx:310`, `client/src/App.tsx:322-328`).
- Geschuetzte Lernbereiche existieren fuer Module 1 bis 5 inklusive Tag-Routen (`client/src/App.tsx:410-419`).
- Der Zugangsschutz nutzt `enabledModules`, Trial-Ablauf und Access-Ablauf (`client/src/components/ModuleGuard.tsx:34-48`).
- Checkout-Startpunkte existieren im Frontend fuer Kurse, Kurs-Landings, Compliance, B2B, Rechenpraxis und Verwalter-Tools (`client/src/pages/Kurse.tsx:82`, `client/src/pages/kurs/KursLanding.tsx:252`, `client/src/pages/ComplianceLanding.tsx:34`, `client/src/pages/MaklerbuerosLanding.tsx:103`, `client/src/pages/RechenpraxisPricing.tsx:20`, `client/src/pages/FuerVerwaltungsbuerosLanding.tsx:95`).

**Realistische Einordnung**

- Das Hauptportal ist als Lern- und Verkaufsportal code-seitig deutlich vorhanden: Public-Seiten, Login, Lernrouten, Module, Admin, Owner und Monetarisierungspfade sind verdrahtet.
- Echte Auth-/KI-/TTS-Smokes bleiben ohne dediziertes Testkonto nicht voll bewiesen; der Auth-Smoke skippt ohne Credentials (`tests/e2e/28-auth-smoke-tutor.spec.ts:77`).
- Video darf wegen Coming-Soon-Hinweis nicht als fertige eigene Videobibliothek beworben werden; Audio ist eher PARTIAL/FALLBACK-DEMO, weil Browser-Speech und Lesson-Fetch vorhanden sind, aber echte Inhalte/Endpoint/Content-Fuelle separat belegt werden muessen (`client/src/components/VideoPlayer.tsx:83`, `client/src/pages/AudioModus.tsx:65-78`).

## 5. Verwalter-Suite

**Belegte Kernbereiche**

- Verwalter-Modus wird ueber `PORTAL_MODE` serverseitig und `VITE_PORTAL_MODE` clientseitig gesteuert (`server/_core/vite.ts:171`, `server/_core/vite.ts:224`, `client/src/lib/portalMode.ts:1-5`).
- Akademie-Routen werden im Verwalter-Modus auf `/app/verwalter` umgeleitet (`client/src/App.tsx:333-377`).
- Sidebar/Navigation filtert im Verwalter-Modus auf Verwalter-Navigation (`client/src/components/layout/DashboardLayout.tsx:40-41`, `client/src/components/layout/DashboardLayout.tsx:69`).
- Verwalter-App-Routen umfassen Vorlagen, Fristen, Objekte, Vorgänge, Buchungen, Mahnwesen, ETV, Inbox und Freigaben (`client/src/App.tsx:470-515`).
- Mahnwesen ist als 3-Stufen-Workflow mit Freigabe vor Versand beschrieben (`shared/verwalterMahnwesen.ts:1`, `client/src/pages/verwalter/MahnwesenIndex.tsx:121-123`).

**Realistische Einordnung**

- Die Verwalter-Suite ist mehr als nur Landingpage: mehrere geschuetzte Arbeitsbereiche und API-Calls sind im Frontend verdrahtet.
- Einige Bereiche sind Feature-Flag-/Provider-abhaengig: Inbox, Voice und OCR (`shared/verwalterFeatureFlags.ts:4-12`).
- Die Landingpage setzt eine wichtige Grenze: keine vollwertige ERP-/Profi-Verwaltersoftware (`client/src/pages/VerwalterSuiteLanding.tsx:55`). Diese Grenze sollte in Sales/Marketing nicht verwässert werden.

## 6. Monetarisierung / Stripe / Trial / Pricing

| Monetarisierungsbereich | Status | Beleg | Einordnung |
|---|---|---|---|
| Einzelmodule / Kurs-Landings | PARTIAL | Checkout-Calls (`client/src/pages/Kurse.tsx:82`, `client/src/pages/kurs/KursLanding.tsx:252`) | Kaufpfad vorhanden, Live-Zahlungsfreigabe separat noetig. |
| Pakete / Bundles | PARTIAL | Price-ENV-Mapping (`shared/stripePriceIds.ts:55-67`) | ENV-abhaengig; Preis-IDs muessen fuer Live gesetzt sein. |
| Renewal | PARTIAL | `/api/stripe/renewal-checkout` (`client/src/components/RenewalPaywall.tsx:19`) | Nutzbar als Codepfad, aber Ablauffall real smoken. |
| Trial | PARTIAL | `/api/trial/request` (`client/src/components/TrialForm.tsx:32`) | Leadpfad vorhanden, Zustellung/Follow-up/Expiry separat pruefen. |
| B2B / Maklerbueros | PARTIAL | `/api/stripe/b2b-checkout` (`client/src/pages/MaklerbuerosLanding.tsx:103`) | Firmenverkauf vorhanden, Mandanten-/Checkout-Flow separat testen. |
| Rechenpraxis / Verwalter-Tools | PARTIAL | Checkout-Calls (`client/src/pages/RechenpraxisPricing.tsx:20`, `client/src/pages/FuerVerwaltungsbuerosLanding.tsx:95`) | Monetarisierbar, aber Feature-/Zugriffsgates pruefen. |
| Stripe-Live-Betrieb | RISK | Live-Checkliste fordert Live Price-IDs und Webhook-Events (`docs/STRIPE_LIVE_GO_LIVE.md:36-38`) | Keine echte Zahlungsfreigabe ohne Preflight, Testmodus-Health und Marktfreigabe. |

## 7. Recht / Compliance / Claims

| Thema | Status | Beleg | Risiko | Empfehlung |
|---|---|---|---|---|
| AZAV/Foerderung | RISK | Foerderung nur nach AZAV/Akkreditierung und Einzelfall (`client/src/pages/Foerderung.tsx:5`, `client/src/pages/Foerderung.tsx:24`) | Foerdergarantie waere unbelegt und riskant | Nur als angestrebt/moeglich nach Voraussetzungen formulieren |
| Offizielle Zertifizierung | RISK | Zertifikatsbereich meldet teils nicht verfuegbar (`client/src/pages/Certificates.tsx:53`, `client/src/pages/Certificates.tsx:321`) | Nutzer koennten offiziellen Abschluss erwarten | Teilnahme-/Lernnachweis klar von offizieller Zertifizierung trennen |
| Rechtsberatung | RISK | Agent soll keine Rechtsberatung/Pruefungsversprechen geben (`server/agent/agentRoutes.ts:224`); Disclaimer in Tutor-Prompt (`server/routers.ts:475`) | KI-/Verwalter-Ausgaben duerfen nicht als Rechtsberatung wirken | Prompts/Disclaimer in UI und Ergebnissen konsistent halten |
| Verwalter-Suite Claim | RISK | Landing grenzt gegen vollwertige ERP-Systeme ab (`client/src/pages/VerwalterSuiteLanding.tsx:55`) | Ueberverkauf als ERP-Ersatz | Positionierung: schlanke Praxis-/Assistenzsuite |
| Access-/Dauer-Claims | LIVE nach Fix, weiter beobachten | Zugang wird technisch ueber `enabledModules`, Trial und Ablauf geprüft (`client/src/components/ModuleGuard.tsx:34-48`) | Marketing darf nicht "lebenslang"/unbegrenzt behaupten, wenn Policy anders ist | Claim-Scan vor jeder Kampagne |

## 8. Technik / Security / Betrieb

| Bereich | Status | Beleg | Risiko | Empfehlung |
|---|---|---|---|---|
| Health / Monitoring | LIVE | Healthcheck-Route (`server/_core/index.ts:292`) | Health ist nur Basisindikator, kein Full-Smoke | Health plus Route-/Auth-Smoke kombinieren |
| CI-Gates | PARTIAL | `check` und `docker-build` hard; `e2e-smoke`/`e2e-stripe` mit `continue-on-error` (`.github/workflows/ci.yml:10`, `.github/workflows/ci.yml:37`, `.github/workflows/ci.yml:48`, `.github/workflows/ci.yml:65`) | Gruene PR-Checks koennen falsche Sicherheit geben | CI_GATE_MATRIX weiter als Pflichtlektüre nutzen |
| Auth-Smoke | BLOCKED/PARTIAL | Auth-Smoke skippt ohne Test-Credentials (`tests/e2e/28-auth-smoke-tutor.spec.ts:77`) | Login/KI/TTS nicht voll bewiesen | Dediziertes Smoke-Testkonto ohne Adminrechte |
| Backup | PARTIAL | R2 Upload daily/latest (`.github/workflows/mysql-backup-r2.yml:167-189`); Restore offen (`docs/BACKUP_AUTOMATION_PLAN.md:11-15`) | Backup ohne Restore-Proof ist kein belastbarer Restore-Nachweis | Erst Planungs-PR, dann isolierter Restore-Proof mit Freigabe |
| Datenpersistenz Verwalter | RISK | Doku nennt File-Stores/Drizzle-Risiko (`docs/AUDIT_2026-06-10_04_VERWALTER.md:251`); Deployment-Doku nennt fehlende file-store COPY/Volume-Risiken (`docs/AUDIT_2026-06-10_02_DEPLOYMENT.md:123`) | Datenverlust-/Persistenzrisiko falls File-Stores produktiv genutzt werden | Persistenzentscheidung pro Verwalter-Datenklasse dokumentieren |
| ENV-/Provider-Abhängigkeiten | PARTIAL | Frontend-ENV fuer Sentry/OAuth/Maps (`client/src/main.tsx:3`, `client/src/lib/oauth.ts:14`, `client/src/components/Map.tsx:89-91`) | Fehlende ENV kann Features degradieren | ENV-Matrix ohne Secrets pflegen |
| Stripe Webhook | PARTIAL/RISK | Raw route `/api/stripe/webhook` (`server/_core/index.ts:202`); Admin-Health (`server/adminOpsRoute.ts:52`, `server/adminOpsRoute.ts:145`) | Zahlungen haengen an korrektem Webhook/Events | Test-/Live-Webhooks getrennt und dokumentiert halten |

## 9. Top 10 nächste Maßnahmen

| Prioritaet | Massnahme | Warum | Patch geeignet? |
|---|---|---|---|
| 1 | Dediziertes Smoke-Testkonto fuer Auth/KI/TTS anlegen und S230C T1/T2 erneut laufen lassen | Auth/KI/TTS sind aktuell wegen fehlender Credentials nicht voll belegt (`tests/e2e/28-auth-smoke-tutor.spec.ts:77`) | Nein, zuerst Ops/Testkonto |
| 2 | Stripe-Live-Preflight weiterhin strikt getrennt von echter Zahlungsfreigabe halten | Live-Checklist verlangt Price-IDs und Webhook-Events (`docs/STRIPE_LIVE_GO_LIVE.md:36-38`) | Docs/Test, keine echte Zahlung |
| 3 | Video-/Audio-Marketing hart begrenzen | Video ist Coming-Soon; Audio ist PARTIAL/FALLBACK-DEMO und nicht als fertige Audiobibliothek belegt (`client/src/components/VideoPlayer.tsx:83`, `client/src/pages/AudioModus.tsx:65-78`) | Ja, kleine Copy-PRs falls Restclaims auftauchen |
| 4 | Verwalter-Suite Feature-Flag-Matrix erstellen | Inbox/OCR/Voice und Tools-Gating sind ENV-abhaengig (`shared/verwalterFeatureFlags.ts:4-12`, `shared/verwalterToolsAccess.ts:6`) | Ja, docs-only |
| 5 | Verwalter-Datenpersistenz pro Datenklasse klaeren | Doku nennt File-Store-/Persistenzrisiken (`docs/AUDIT_2026-06-10_04_VERWALTER.md:251`) | Erst Audit, dann ggf. Code |
| 6 | CI-Hardening-Entscheidung fuer E2E-Signale treffen | E2E-Jobs laufen mit `continue-on-error` (`.github/workflows/ci.yml:48`, `.github/workflows/ci.yml:65`) | Ja, aber vorsichtig, sonst blockiert Live/Secret-Abhaengigkeit PRs |
| 7 | Restore-/Entschluesselungs-Proof nur als gesonderten Sicherheits-Track planen | Backup ist belegt, Restore offen (`docs/BACKUP_AUTOMATION_PLAN.md:11-15`) | Erst Planungsdoku, kein operativer Restore |
| 8 | Claims-Regression-Scan fuer AZAV/Foerderung/Zertifizierung automatisieren | Foerderung ist nur angestrebt/bedingt (`client/src/pages/Foerderung.tsx:5`, `client/src/pages/Home.tsx:350-351`) | Ja, Test/Script moeglich |
| 9 | Verwalter-E2E mit Testtenant planen | Viele Verwalter-Routen/API-Calls vorhanden (`client/src/App.tsx:470-515`) | Erst Testdaten-/Tenant-Plan |
| 10 | Produktpakete nach "jetzt nutzbar" vs. "Roadmap" trennen | Matrix zeigt Mix aus LIVE, PARTIAL und DEMO/UI ONLY | Ja, docs/marketing copy |

## 10. Nicht belegt / offene Fragen

- **Echte Live-Zahlung:** Im Repo existieren Stripe-Flows und Readiness-Doku, aber diese Matrix belegt keine echte Live-Zahlung und keine Marktfreigabe.
- **Authentifizierter KI/TTS/Voice-Smoke:** Ohne dediziertes Testkonto bleibt das aus Code-/Test-Sicht PARTIAL/UNKNOWN.
- **Restore/Entschluesselung:** Backup-Lauf/R2-Upload sind dokumentiert, aber Restore und Entschluesselung sind laut Doku offen (`docs/BACKUP_AUTOMATION_PLAN.md:11-15`).
- **R2 Retention/Versionierung/Alerting:** In dieser Codebase-Matrix nicht als aktiv belegt.
- **Railway Provider-Backups:** In dieser Codebase-Matrix nicht als aktiv belegt; nur vorhandene Doku-Historie verweist auf nicht sichtbare Provider-Backups.
- **Verwalter-Produktionsreife:** Routen und UI existieren, aber ein produktiver Testtenant, Mandanten-/Persistenz-/Error-State-E2E und Feature-Flag-Realzustand bleiben offen.
- **WhiteLabel/B2B Vollbetrieb:** Admin- und Checkout-Pfade existieren, aber kein voller Mandanten-Onboarding-Smoke in dieser Matrix belegt.
- **Zertifikats-/Weiterbildungsnachweis-Rechtsstatus:** UI/Routen existieren, aber offizielle Anerkennung darf ohne externe Nachweise nicht behauptet werden.
- **Content-Vollstaendigkeit:** Diese Matrix bewertet Produktrealität, nicht erneut jeden Lerntag. Content-Qualitaet bleibt eigener S235D-Track.
