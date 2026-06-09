# System-Audit — Immobilien Akademie Smart

Stand: Juni 2026 · Architektur, UX, Didaktik, Marketing

Vollständiges Audit-Dokument — siehe auch `VERWALTER_SUITE_ROADMAP.md` und `RECHENPRAXIS_BENCHMARK.md`.

## Gesamtbewertung

| Bereich | Note | Kommentar |
|---------|------|-----------|
| Technische Architektur | **Gut** | React 19, Express, tRPC, MySQL — klar getrennt |
| Informationsarchitektur | **Mittel** | Viele Tools, nicht alle in Navigation |
| Lern-Didaktik | **Gut** | 5 Module, Audio, Rechenpraxis, KI-Tutor |
| UX / Komfort | **Verbessert** | ComfortBar jetzt oben (nicht Sidebar unten) |
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

### Standalone
`/audio-modus` — eigener Header mit ComfortBar.

---

## 2. Architektur-Diagramm

```
Browser
  └── App (A11y: useA11yPrefs → html font-scale)
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

### Behoben (P0)
- ComfortBar unten in Sidebar → **oben im Inhaltsbereich**
- ♿-FAB unten links → nur noch über ComfortBar
- PublicHeader war ungenutzt → eingebunden
- `/dashboard` → `/statistiken`, `/glossar` → `/glossary`
- Route `/barrierefreiheit`

### Offen (P1)
- `/wiederholung`, `/strategie`, `/audio-modus` fehlen in Sidebar
- Orphan-Dateien (`components/DashboardLayout.tsx` alt)
- Owner-Dashboard ohne ComfortBar
- Zwei Dark-Mode-Mechanismen (`useDarkMode` vs `useA11yPrefs`)

### Offen (P2)
- Legacy Module1.tsx … Module5.tsx entfernen
- OpenQuizPage Route aktivieren oder Import löschen
- E2E: ComfortBar auf 5 Kernseiten

---

## 5. Manuelle Test-Checkliste

1. `/` — Komfort oben rechts, Schrift +/-
2. `/statistiken` — Komfort oben (Desktop: über Inhalt, nicht Sidebar unten)
3. `/modul/3/tag/1` — Vergrößerung wirkt im Lerntext
4. `/audio-modus` — WEG/§ korrekt im Text, Comfort oben
5. `/app/rechenpraxis` — Freemium + Fehler-Katalog
6. `/admin` — Komfort sichtbar
7. `/barrierefreiheit` — Seite lädt

---

*Keine Rechtsberatung. Preise/Wettbewerber vor Marketing-Freigabe verifizieren.*
