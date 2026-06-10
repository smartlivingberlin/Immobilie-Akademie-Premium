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
