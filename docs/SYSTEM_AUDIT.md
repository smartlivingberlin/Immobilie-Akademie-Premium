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
| 2 | 60 | Makler §34c |
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

### Behoben (PR-A, Juni 2026)
- `moduleContentRegistry.ts` — Single Source of Truth für Moduldateien
- M2: 60 Lerntage (Part3 ergänzt), M4: 40 Lerntage (Valuation Part2 + Bonus)
- Build-Export validiert erwartete vs. extrahierte Tage

### Offen (Produkt / später)
- KI-Generator Pipeline v2 (Map 1-Tag + Continuation) — siehe Konzept in PR-Diskussion
- NightCron / PortalAgent auf Registry umstellen (noch duplizierte Listen)
- Verwalter-Suite (Vorlagen, CRM) — `VERWALTER_SUITE_ROADMAP.md`
- Module 6–8 (bewusst nicht im Scope)

---

## 5. Forensisches Audit — Architektur & Botschaften (Juni 2026)

### 5.1 Inkonsistenzen (vor PR-A)

| System | M2 Tage | M4 Tage | Problem |
|--------|---------|---------|---------|
| `moduleDayExtractor` (alt) | 40 | 10 | Fehlende Dateien, M4_Maximal existiert nicht |
| `PortalAgent` / `NightCron` | 60 | 40 | Korrekt, aber nicht vom Generator genutzt |
| `ragTutor.ts` v2 | 40 cap | Parser kaputt | Verboten zu ändern; Legacy deprecaten |
| Marketing `Home.tsx` | 60 | 40 | Stimmt mit Registry überein |
| `SYSTEM_AUDIT` (alt) | ~40 | ~40 | Dokumentation veraltet |

**Kernproblem:** Vier parallele „Wahrheiten“ für Modulinhalte — Generator, Agent, Marketing und Audit wichen voneinander ab.

### 5.2 Homepage — Hero vs. Verwalter-Rechner (Nutzer-Feedback)

**Aktueller Aufbau (`Home.tsx`):**
1. Hero (blau): „Fach- und Praxisvorbereitung Immobilienwirtschaft“ + alle 5 Berufsbilder
2. Direkt darunter: grünes Band „Eigenständiges Produkt — Verwalter-Rechner WEG interaktiv“

**Bewertung:** Der Nutzer hat recht — die **zweite Botschaft konkurriert mit der ersten**. Hero verspricht Gesamtportal (5 Module); das grüne Band wirkt wie ein separates Produkt auf derselben Seite. Das verwässert die Haupt-CTA („24h testen“).

**Empfohlene IA (Agentur-Sicht):**

| Variante | Beschreibung | Empfehlung |
|----------|--------------|------------|
| A | Verwalter-Rechner als **schräges Badge** über/unter Hero-Foto (Nutzer-Idee) | ✅ Beste Balance — sichtbar, stört Hero-Hierarchie nicht |
| B | Grünes Band **unter** Modul-Karten (nach „5 Berufsbilder“) | ✅ Klare Trennung: erst Kurse, dann Zusatzprodukt |
| C | Nur kleiner Link im Hero (aktuell neben CTAs) | Zu leise für eigenständiges Produkt |
| D | Alles lassen | ❌ Marketing-Unschärfe bleibt |

**Konkrete UI-Idee (Variante A):** Schräges Parallelogramm (`rotate-[-4deg]`) unten links am Hero-Bild, emerald-600, Text: „WEG-Rechner · 138 Aufgaben · ab 19 €/Mo“ → `/verwalter-rechner`. Grünes Vollbreiten-Band entfernen oder auf `/verwalter-rechner` Landing beschränken.

### 5.3 Plausibilität & Authentizität

| Bereich | Status | Anmerkung |
|---------|--------|-----------|
| §34c vs. §34i Formulierungen | ✅ Gut | KursLanding differenziert korrekt (keine falsche „IHK-Prüfung §34c“) |
| Förderung / AZAV | ⚠️ Vorsicht | „Förderung angestrebt“ — korrekt hedged; nicht als „bereits förderfähig“ verkaufen |
| Lerntage 240 | ✅ | 20+60+80+40+40 = 240, konsistent mit `STRUCTURED_LEARNING_DAYS` |
| SYSTEM_AUDIT M2 „~40“ | ❌ war falsch | Jetzt 60 (Registry) |
| Generator „0 Lerneinheiten“ | ✅ behoben | Build-Export + Registry |
| Doppelte emerald-Sections | ⚠️ | Home hat 2× grün (Verwalter-Band + Förderung) — visuell monoton |

### 5.4 Visuelle Agentur-Checkliste (nicht alles umsetzen — Prioritäten)

**P0 (würde Agentur sofort ändern):**
- Hero-Hierarchie: ein Hauptversprechen, ein Haupt-CTA
- Verwalter-Rechner aus Hero-Konkurrenzzone lösen (Badge oder Modul-Section)
- Generator-UI: Legacy-Button entfernen wenn Pipeline v2 live

**P1 (Qualitätssprung):**
- Modul-Landings: einheitliche Farblogik (M2 Landing „green“ vs. Home purple)
- Sidebar: 40+ Links — „Wissen & Tools“ gruppieren / einklappbar
- Trust-Bar und Stats nicht direkt nach competing Messages

**P2 (Feinschliff):**
- Hero-Foto: Verwalter-Badge wie vorgeschlagen
- Animation dezent (reduced-motion bereits berücksichtigt)

---

## 6. Manuelle Test-Checkliste

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
