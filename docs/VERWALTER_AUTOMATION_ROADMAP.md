# Verwalter Suite — Automatisierungs-Roadmap (Agentur-Masterplan)

**Stand:** 2026-06-10  
**Ziel:** Alle Automatisierungsbereiche (E-Mail, Telefon, Belege, Workflows, Steuerung) in **richtiger Reihenfolge**, **einem Ökosystem**, mit **Free → Paid**-Schichten.  
**Prinzip:** *Orchestrierung in unserer App* — keine Insellösung pro Kanal.

Verwandte Docs: [VERWALTER_SUITE_ROADMAP.md](./VERWALTER_SUITE_ROADMAP.md) · [VERWALTER_INDEPENDENCE_PLAN.md](./VERWALTER_INDEPENDENCE_PLAN.md) · [VERWALTER_STRIPE_SETUP.md](./VERWALTER_STRIPE_SETUP.md)

---

## 1. North Star & USPs

### Was wir **nicht** sind

Kein casavi / Immoware24 / Aareon-Ersatz. Kein Voll-ERP Tag 1.

### Was wir **sind**

| USP | Beschreibung |
|-----|--------------|
| **Lernen + Anwenden** | Rechenpraxis + Vorlagen + Praxis in einem Login |
| **KI mit Kontext** | Assistent kennt **Ihre** Objekte, Vorgänge, Konten (RAG) |
| **Einstieg ohne ERP-Migration** | DATEV-Export, Vorlagen, leichtes CRM — kein Big-Bang |
| **Human-in-the-loop** | Automatisierung bis zur Freigabe — kein autonomer Rechts-/Mahnlauf |
| **EU / DSGVO** | Railway EU, Löschung mit Konto, Audit-Log |

### Automatisierungs-Zielbild

```
Eingang (Mail · Telefon · Upload · Frist)
    → Normalisieren (ein Event-Format)
    → Regeln + KI (Klassifikation, Entwurf)
    → Vorgang im Kanban (Objekt verknüpft)
    → Mensch: Freigabe / Korrektur
    → Ausgang (Mail, PDF, DATEV, Handwerker-Brief)
    → Audit + QA-Cron
```

**Realistische Entlastung:** 40–60 % Routinearbeit (Kommunikation, Belegvorerfassung, Fristen). Rest: Eskalation, Beziehung, Ermessen.

---

## 2. Entwicklungsreihenfolge (Dependency-DAG)

**Regel:** Jede Phase baut auf der vorherigen auf. Kein Kanal (Telefon) ohne gemeinsames Event-Modell.

```
P0 Fundament ──► P1 Workflows ──► P2 Kommunikations-Hub ──► P3 Dokumenten-KI
                      │                    │                        │
                      └────────────────────┴────────────────────────┘
                                           │
                    P4 Telefon-Agent ◄─────┘ (parallel ab P2, MVP ab P4)
                                           │
                                    P5 Steuerung & B2B
```

| Phase | Dauer (Richtwert) | Gate (Definition of Done) |
|-------|-------------------|---------------------------|
| **P0** Fundament | 2–4 Wochen | Beta-Büros live, Stripe Price, Event-Schema |
| **P1** Workflows | 4–6 Wochen | ETV + Mahnung + Fristen end-to-end |
| **P2** E-Mail-Hub | 4–6 Wochen | Mail → Vorgang → Entwurf → Freigabe |
| **P3** Beleg-KI | 4–6 Wochen | Upload → Buchungsvorschlag → DATEV |
| **P4** Telefon | 3–5 Wochen | Anruf → Transkript → Vorgang (ab 1 WE) |
| **P5** Steuerung | laufend | Team-Zuweisung, SLA, Add-on-Billing |

---

## 3. Build vs. Integrate vs. OSS (Entscheidungsmatrix)

| Komponente | Strategie | Free / Test | Paid / Scale | Warum |
|------------|-----------|-------------|--------------|-------|
| **Orchestrierung** | **Eigenbau** (Express + Queue-Tabelle) | — | — | Eine Wahrheit, Audit, DSGVO |
| **KI Klassifikation / Draft** | **Eigenbau** (bestehende Claude-Pipeline) | Fair-Use | Abo-Tiers | USP, Kontext aus Objekten |
| **E-Mail eingehend** | **Integrate** Resend Inbound / IMAP-Webhook | Resend-Limits | Resend Pro | Schnell, EU-tauglich |
| **E-Mail ausgehend** | **Bereits da** (Resend) | — | — | — |
| **Telefon STT/TTS/LLM** | **Integrate** Vapi.ai + Twilio | Vapi ~10 $ Credits, Twilio Trial | ~0,15–0,25 €/Min gesamt | Eigener Voice-Stack = Monate |
| **Rechnungs-OCR** | **Hybrid** Phase 1: Claude Vision API | Nutzung im Fair-Use | Phase 2: OSS docpick Sidecar | Schnell starten, später Kosten senken |
| **Workflow-UI (intern)** | **Optional** n8n self-hosted | VPS ~5–20 € | — | Nur Ops, nicht Endkunden |
| **Voll-ERP** | **Nicht bauen** | — | API-Export zu casavi später | Fokus |

### Kommerzielle Schicht (Stripe)

| Plan | Inhalt | Preis (Richtwert) |
|------|--------|-------------------|
| **Beta / Solo** | Vorlagen, CRM-light, Buchungen, KI | 39 €/Mo (oder Gating=0) |
| **Automation** | + E-Mail-Hub + Fristen-Motor | +19 €/Mo |
| **Voice Add-on** | + Telefon-Agent pro Büro-Nummer | +29 €/Mo + Minutenpass-through |
| **B2B Team** | Multi-Mandant, Rollen, SLA | ab 199 €/Mo |

Minuten Telefon: transparent weiterberechnen oder Inklusiv-Kontingent (z. B. 100 Min/Mo).

---

## 4. Phase P0 — Fundament (ZUERST)

**Warum zuerst:** Ohne gemeinsames Daten- und Event-Modell werden E-Mail und Telefon Insellösungen.

### P0.1 — Bereits erledigt ✅

- MySQL: `verwalter_objekte`, `verwalter_vorgaenge`, `verwalter_buchungen`
- Kanban, Vorlagen, DATEV-Export, KI-Assistent, Stripe `verwalter_tools`
- QA-Pack, GDPR-Delete, Landing `/fuer-verwaltungsbueros`

### P0.2 — Noch umsetzen

| # | Deliverable | Technik | Owner-Rolle |
|---|-------------|---------|-------------|
| 1 | **Eigentümer / Einheiten** je Objekt | Neue Tabellen `verwalter_einheiten`, `verwalter_eigentuemer` | Backend |
| 2 | **Event-Bus (leicht)** | Tabelle `verwalter_events` (type, payload, objektId, vorgangId, status) | Backend |
| 3 | **Freigabe-Queue** | UI: „Ausstehende Entwürfe“ (Mail, Brief, Buchung) | Full-Stack |
| 4 | **Feature Flags** | ENV: `VERWALTER_VOICE_ENABLED`, `VERWALTER_INBOX_ENABLED` | DevOps |
| 5 | **Stripe Price live** | `STRIPE_PRICE_VERWALTER_TOOLS_MONTHLY` | Alisad |
| 6 | **3 Beta-Büros** | Feedback-Loop laut [VERWALTER_BETA_TESTER.md](./VERWALTER_BETA_TESTER.md) | Product |

### P0 Gate

- [ ] Objekt mit ≥1 Einheit + Eigentümer anlegbar  
- [ ] Jedes Automatisierungs-Event schreibt in `verwalter_events` + `platformAudit`  
- [ ] QA-Pack 15/15 auf Prod  

---

## 5. Phase P1 — Regelbasierte Workflows (vor KI-Kanälen)

**Warum vor E-Mail/Telefon:** 80 % Nutzen mit deterministischen Regeln, geringes Haftungsrisiko.

### P1.1 — ETV-Paket (höchster struktureller Nutzen)

| Schritt | Automatisierung |
|---------|-----------------|
| Einladung | Vorlage + Objekt-Kontext |
| Tagesordnung | Checkliste + Pflichtpunkte § 24 WEG |
| Nach ETV | Beschlüsse → Fristen (Anfechtung 1 Monat) |
| Output | Vorgänge im Kanban, PDF-Export |

**Aufwand:** ~2–3 Wochen · **Nutzen:** 15–25 h/Objekt/Jahr (Branchenangaben)

### P1.2 — Mahnwesen-Workflow (3 Stufen)

| Stufe | Aktion | Automatisierung |
|-------|--------|-----------------|
| 1 | Zahlungserinnerung | Vorlage + Frist +7 Tage |
| 2 | Mahnung | Vorlage + Verzugszins-Hinweis |
| 3 | Eskalation | Task „Inkasso prüfen“ — **nur manuell** |

**Pflicht:** Freigabe vor Versand. Kein Auto-Versand ohne Klick.

### P1.3 — Fristen-Motor

- Cron/NightJob: prüft offene Fristen (ETV, NK, Versicherung, Vertrag)
- Erzeugt Vorgang + optional Dashboard-Badge
- Quelle: `shared/verwalterFristen` (neu)

### P1 Gate

- [ ] ETV durchspielbar ohne externe Tools  
- [ ] Mahnstufe 1→2 mit Freigabe  
- [ ] Frist überfällig → Vorgang sichtbar  

---

## 6. Phase P2 — E-Mail-Intelligenz (höchster ROI)

### Architektur

```
eigentuemer+obj123@inbound.immobilien-akademie-smart.de
    → POST /api/verwalter/inbox/webhook (Resend Inbound)
    → Parse + PII-Minimierung
    → KI: intent (nk|schaden|etv|hausmeister|sonstiges), priority, objektMatch
    → INSERT verwalter_vorgaenge + verwalter_events
    → KI: Antwortentwurf (RAG: Objekt, Vorlagen, letzte Vorgänge)
    → Freigabe-Queue UI
    → Nach Freigabe: Resend outbound + Audit
```

### Build vs. Buy

| Teil | Entscheidung |
|------|--------------|
| Routing / Speicher | **Eigenbau** |
| Inbound Parsing | **Resend Inbound** (oder Mailgun) |
| Klassifikation | **Eigenbau** (Claude Haiku — günstig, schnell) |
| Antwort | **Eigenbau** (bestehender Assistent-Prompt) |

### Free-Start

- Resend Free-Tier für Tests  
- Eine Inbound-Adresse pro Beta-Büro  
- Fair-Use auf Klassifikation (wie KI-Assistent)

### P2 Gate

- [ ] 10 Test-Mails → korrekte Kategorie ≥80 %  
- [ ] Kein Versand ohne Freigabe  
- [ ] Vorgang verknüpft mit Objekt  

---

## 7. Phase P3 — Dokumenten-KI (Belege)

### Stufenplan

| Stufe | Was | Technik |
|-------|-----|---------|
| **3a** | PDF/Foto Upload im UI | Bereits nahe an Buchungen |
| **3b** | Extraktion Betrag, Datum, Lieferant | Claude Vision (API) — schnell |
| **3c** | SKR03-Vorschlag | Erweiterung `suggestBuchung` (existiert) |
| **3d** | Freigabe → Buchung → DATEV | Existiert |
| **3e** (später) | OSS Sidecar docpick / PaddleOCR | Railway Worker, Kosten ↓ |

**ROI-Branche:** 30–55 % weniger manuelle Belegarbeit (IDP-Studien 2025/26).

### P3 Gate

- [ ] Handwerker-Rechnung → Buchungsvorschlag in <30 s  
- [ ] Sachbearbeiter korrigiert in UI, Export DATEV ok  

---

## 8. Phase P4 — Telefon-Agent (ab P0, MVP hier — **keine WE-Mindestgrenze**)

**Entscheidung:** Telefon ab **erstem Objekt** buchbar. Kleine Verwaltungen haben oft **mehr Anrufe pro Einheit** als große.

### Architektur (Integrate, nicht neu erfinden)

```
Anrufer → Twilio-Nummer (~1 €/Mo)
    → Vapi Assistant (Workflow: property-management)
    → serverUrl: POST /api/verwalter/voice/vapi
        → lookup: objekt/einheit (Telefonnummer → Stammdaten)
        → function calls: createVorgang, classifyUrgency, scheduleCallback
    → end-of-call-report → Transkript + Zusammenfassung
    → verwalter_vorgaenge + verwalter_events
    → optional: E-Mail-Zusammenfassung an Sachbearbeiter
```

Referenz: [Vapi Property Management Workflow](https://docs.vapi.ai/workflows/examples/property-management)

### Kosten (transparent)

| Posten | Richtwert |
|--------|-----------|
| Twilio Nummer | ~1 €/Mo |
| Twilio Minuten | ~0,01 €/Min |
| Vapi Platform | ~0,05 $/Min |
| STT/TTS/LLM | variabel |
| **Gesamt** | ~0,15–0,25 €/Min |

**Free-Test:** Vapi Startguthaben (~10 $) + Twilio Trial.

### Eigenbau-Anteil (USP)

- **Deutsch**, WEG-Fachvokabular im System-Prompt  
- **Notfall-Eskalation** (Wasserschaden, Heizung) → Vorgang priority=urgent  
- **Kein Halluzinieren:** Agent darf keine Rechtszusagen — nur strukturieren + weiterleiten  
- Transkript in **Ihrem** Kanban, nicht in fremdem CRM  

### Voice ENV

```env
VERWALTER_VOICE_ENABLED=1
VAPI_API_KEY=...
VAPI_WEBHOOK_SECRET=...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
```

### P4 Gate

- [ ] Testanruf → Vorgang mit Transkript  
- [ ] Notfall → priority urgent + Benachrichtigung  
- [ ] DSGVO: Aufzeichnung nur mit Hinweis (Ansage)  

---

## 9. Phase P5 — Steuerungs- & Agentur-System

### „Smart Management“ (kein Black-Box-Agent)

| Schicht | Funktion | Status |
|---------|----------|--------|
| **Audit** | `platformAuditLog` | ✅ vorhanden |
| **Health** | `/api/health`, Migrationen | ✅ |
| **QA** | `verwalter-qa-pack.sh` | ✅ |
| **Workflow-SLA** | Offene Vorgänge / Frist / Zuweisung | P5 |
| **Team-Rollen** | Sachbearbeiter, Leitung, Nur-Lesen | P5 + B2B |
| **Regression** | Golden-Tests KI + E2E Playwright | erweitern |
| **Nightly Cron** | QA-Pack + Stripe-Readiness 7/7 | P5 |

### Agentur-Rollen (RACI pro Phase)

| Rolle | Verantwortung |
|-------|----------------|
| **Product Owner** | Prioritäten, Beta-Feedback, Go/No-Go Gates |
| **Tech Lead / Architekt** | Event-Schema, APIs, keine Insellösungen |
| **Backend** | Router, Cron, Webhooks, DB-Migrationen |
| **AI Engineer** | Prompts, RAG, Eval-Set (50 Standard-Mails/Anrufe) |
| **Frontend / UX** | Freigabe-Queue, Dashboard, Mobile Verwalter |
| **DevOps** | Railway ENV, Feature Flags, Monitoring |
| **Compliance** | AGB, DSGVO, Aufzeichnungshinweise Telefon |
| **QA** | Playwright, QA-Pack, Lighthouse |

### Eval & Qualität (AI Engineer Pflicht)

1. **Golden Dataset:** 50 E-Mails + 20 Anruf-Skripte (synthetisch + anonymisiert)  
2. **Metriken:** Klassifikation Accuracy, Zeit bis Vorgang, Freigabe-Rate  
3. **Kein Auto-Learn auf Prod-Daten** ohne explizite Einwilligung  

---

## 10. Konkrete Sprint-Reihenfolge (nächste 12 Wochen)

| Sprint | Woche | Fokus | Parallel |
|--------|-------|-------|----------|
| S1 | 1–2 | P0: Eigentümer/Einheiten + `verwalter_events` | Stripe Price Alisad |
| S2 | 3–4 | P1: ETV-Paket + Fristen-Motor | Beta-Tester onboarden |
| S3 | 5–6 | P1: Mahnwesen-Workflow + Freigabe-UI | — |
| S4 | 7–8 | P2: Inbox Webhook + Klassifikation | — |
| S5 | 9–10 | P2: Antwortentwurf + Freigabe-Versand | P4: Vapi Spike (1 Nummer) |
| S6 | 11–12 | P3: Beleg-Upload + Vision-Extraktion | P4: Voice MVP wenn Spike ok |

**Telefon:** Spike in S5 (1–2 Tage), MVP in S6 — **nicht** auf 20/100 WE warten.

---

## 11. Was wir bewusst **später** machen

| Thema | Wann | Warum |
|-------|------|-------|
| Eigentümer-Self-Service-Portal | P5+ | Braucht stabile Inbox + Auth |
| casavi/Immoware24 Sync | Nach 10 zahlenden Büros | Integration ≠ Kern |
| Voll-NK-Abrechnung | 12+ Monate | Regulatorisch schwer |
| Autonomer Mailversand | Nie ohne Freigabe | Haftung |
| Eigenes STT/TTS | Nur bei >10k Min/Monat | Vapi günstiger |

---

## 12. Nächster konkreter Schritt

1. **Alisad:** Stripe Seed mit echtem `sk_test_…` → Railway Price-ID  
2. **Cursor Sprint S1:** `verwalter_einheiten` + `verwalter_eigentuemer` + `verwalter_events`  
3. **Product:** 3 Beta-Büros benennen + Schmerzpunkte (ETV vs. Mail vs. Telefon)  

**Empfohlener Start-PR:** `feat(verwalter): P0 Stammdaten Einheiten/Eigentümer + Event-Bus`

---

## Quellen (Recherche)

- EBZ / InWIS: *IT und Digitalisierung in Haus- und WEG-Verwaltungen 2025* — Fachkräftemangel, Instandhaltung, Standardisierung  
- VDIV Branchenbarometer 2024 — 69 % Automatisierung/KI, Personalmangel  
- Arthax / Praxis: Stundenaufwand pro Objekt (Kommunikation, Buchhaltung, ETV)  
- Reduco / Branche: IDP 30–55 % Belegarbeit, RAG + Freigabe  
- Vapi: [Property Management Workflow](https://docs.vapi.ai/workflows/examples/property-management)  
- OSS: docpick, n8n (nur intern), Temporal (überdimensioniert für jetzt)
