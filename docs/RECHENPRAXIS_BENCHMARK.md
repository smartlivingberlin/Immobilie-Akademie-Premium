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
