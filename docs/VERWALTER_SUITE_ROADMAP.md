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
