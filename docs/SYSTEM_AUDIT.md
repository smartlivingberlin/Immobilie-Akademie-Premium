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
| 2 | ~40 | Makler §34c |
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

### Offen (Produkt / später)
- Verwalter-Suite (Vorlagen, CRM) — `VERWALTER_SUITE_ROADMAP.md`
- Module 6–8 (bewusst nicht im Scope)

---

## 5. Manuelle Test-Checkliste

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
