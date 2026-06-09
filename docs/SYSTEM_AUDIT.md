# System-Audit — Immobilien Akademie Smart

Stand: Juni 2026 · Architektur, UX, Didaktik, Marketing

Vollständiges Audit-Dokument — siehe auch `VERWALTER_SUITE_ROADMAP.md` und `RECHENPRAXIS_BENCHMARK.md`.

## Gesamtbewertung

| Bereich | Note | Kommentar |
|---------|------|-----------|
| Technische Architektur | **Gut** | React 19, Express, tRPC, MySQL — klar getrennt |
| Informationsarchitektur | **Gut** | Kern-Tools in Sidebar; einzelne Lücken (s. unten) |
| Lern-Didaktik | **Gut** | 5 Module, Audio, Rechenpraxis, KI-Tutor |
| UX / Komfort | **Gut** | ComfortBar oben; Lerninhalt-Schriftzoom explizit |
| Marketing | **Mittel** | PublicHeader aktiv, CTAs ausbaufähig |
| Konsistenz | **Mittel** | Einige Legacy-Dateien, wenige tote Links |

---

## 1. Bereiche des Systems

### Öffentlich (`PublicLayout` + `PublicHeader`)
Startseite, Kurse, Pakete, 5 Kurs-Landings, Legal, Glossar, Hilfe, Förderung.

**Komfort:** `ComfortBar` in PublicHeader (oben rechts).

### Lernportal (`AppLayout` → `DashboardLayout`)
Dashboard `/statistiken`, Module 1–5, Quiz, Prüfung, Zertifikate, Tools.

**Komfort:** Desktop — Leiste oben im Inhaltsbereich. Mobile — neben Menü-Button.

### Rechenpraxis (`RechenpraxisLayout`)
Eigenes Layout unter `/app/rechenpraxis` mit ComfortBar.

### Admin / Owner / B2B
Gleiche App-Shell, erweiterte Sidebar + Hub-Seiten (`/admin`, `/owner-dashboard`).

**Owner:** Zusätzlich `ComfortBar` im dunklen Dashboard-Header (sichtbar auf `#0f172a`).

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
              ├── RechenpraxisLayout
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

**Ergänzend:** Audio-Modus (Modul-TS-Quellen), Rechenpraxis (138 Aufgaben), Fallstudien, Lernkarten, Prüfungssimulation.

---

## 4. Bekannte Schwächen & Maßnahmen

### Behoben (P0 / P1)
- ComfortBar unten in Sidebar → **oben im Inhaltsbereich**
- ♿-FAB unten links → nur noch über ComfortBar
- PublicHeader war ungenutzt → eingebunden
- `/dashboard` → `/statistiken`, `/glossar` → `/glossary`
- Route `/barrierefreiheit`
- **Lerninhalt-Schriftzoom** — SmartContent, `.content-container`, Rechenpraxis (`scaledFontSize`)
- Sidebar: `/wiederholung`, `/audio-modus`, `/strategie`
- GlobalGlossary nicht mehr in Rechenpraxis-Link verschachtelt
- Owner-Dashboard: ComfortBar im Header
- Video-Tab-Platzhalter: `ModuleVideoComingSoon` mit Skalierung

### Behoben (P1, weiter)
- Eingeklappte Sidebar: `GlobalGlossary compact` öffnet Lexikon-Dialog
- Dark-Mode vereinheitlicht: Toasts (`sonner`) + Legacy-`theme`-Migration → `useA11yPrefs`
- Rechenpraxis kanonisch unter `/rechenpraxis`; `/app/rechenpraxis` → Redirect

### Offen (P1)
- Owner/Admin-Inline-Schriftgrößen (px) noch nicht überall skaliert

### Offen (P2)
- Orphan-Dateien (`components/DashboardLayout.tsx` alt)
- Legacy Module1.tsx … Module5.tsx entfernen
- OpenQuizPage Route aktivieren oder Import löschen
- E2E: ComfortBar + Schriftzoom auf Kernseiten
- `@tailwindcss/typography` optional einbinden

---

## 5. Manuelle Test-Checkliste

1. https://immobilien-akademie-smart.de/ — Komfort oben rechts, Schrift +/-
2. https://immobilien-akademie-smart.de/statistiken — Komfort oben; Sidebar: Wiederholung, Strategie, Audio
3. https://immobilien-akademie-smart.de/modul/3/tag/4 — A+ wirkt im Lerntext (Theorie)
4. https://immobilien-akademie-smart.de/modul/3/tag/4 — Tab **Videos** → Platzhalter skaliert mit
5. https://immobilien-akademie-smart.de/audio-modus — WEG/§ im Text, Comfort oben
6. https://immobilien-akademie-smart.de/rechenpraxis — Freemium + Fehler-Katalog + Schriftzoom
6b. https://immobilien-akademie-smart.de/app/rechenpraxis — leitet auf /rechenpraxis um
7. https://immobilien-akademie-smart.de/strategie — Seite + Sidebar-Link
8. https://immobilien-akademie-smart.de/wiederholung — Spaced Repetition
9. https://immobilien-akademie-smart.de/owner-dashboard — ComfortBar im Header (Owner-Login)
10. https://immobilien-akademie-smart.de/admin — Komfort sichtbar
11. https://immobilien-akademie-smart.de/barrierefreiheit — Seite lädt

---

*Keine Rechtsberatung. Preise/Wettbewerber vor Marketing-Freigabe verifizieren.*
