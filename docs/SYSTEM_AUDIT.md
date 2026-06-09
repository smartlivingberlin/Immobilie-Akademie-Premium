# System-Audit — Immobilien Akademie Smart

Stand: Juni 2026 · Vollständige Architektur-, UX- und Plausibilitätsprüfung

## Executive Summary

| Bereich | Bewertung | Kurz |
|---------|-----------|------|
| Architektur (Tech) | **Gut** | React + Express + tRPC + MySQL, klare Trennung Server/Client |
| Informationsarchitektur | **Mittel** | Viele Bereiche, teils versteckte Routen, doppelte Layouts |
| Didaktik / Module | **Gut** | 5 Module, Lerntage, Audio, Rechenpraxis, KI-Tutor |
| UX / Ergonomie | **Verbesserung nötig** | Komfort-Leiste war versteckt; jetzt oben (Fix P0) |
| Marketing / Landing | **Mittel** | Starke Inhalte, PublicHeader war nicht eingebunden (Fix P0) |
| Admin / Owner / B2B | **Gut** | Umfangreich, aber Navigation fragmentiert |
| Konsistenz | **Mittel** | Kaputte Links, doppelte Dark-Mode-Systeme |

---

## 1. System-Schichten (Gesamtarchitektur)

```
┌─────────────────────────────────────────────────────────────┐
│  ÖFFENTLICH          PublicLayout + PublicHeader            │
│  /, /kurse, /kurs/*, /rechner, Legal, /glossary            │
├─────────────────────────────────────────────────────────────┤
│  LERNPORTAL          AppLayout → DashboardLayout + Sidebar  │
│  /statistiken, /modul/*, Quiz, Prüfung, Tools               │
├─────────────────────────────────────────────────────────────┤
│  ADMIN               AppLayout (gleiche Shell)              │
│  /admin/*, /partner-panel                                    │
├─────────────────────────────────────────────────────────────┤
│  OWNER               AppLayout + OwnerRoute + 2FA           │
│  /owner-dashboard, /owner-videos                            │
├─────────────────────────────────────────────────────────────┤
│  STANDALONE          Kein Layout                            │
│  /audio-modus, /admin-2fa, /tester-zugang, 404              │
└─────────────────────────────────────────────────────────────┘
```

**Plausibilität:** Die Dreiteilung Öffentlich / Portal / Admin ist logisch. Schwäche: Tools wie Rechner sind öffentlich, Rechenpraxis im Portal ohne Login-Pflicht — verwirrend für Nutzer.

---

## 2. Routen-Audit

### 2.1 Öffentlich (24 Routen) — OK
Startseite, Kurse, Pakete, 5 Kurs-Landings, Legal, Rechner, Glossar, Hilfe.

**Behoben (P0):** `PublicHeader` jetzt in `PublicLayout` eingebunden — einheitliche Navigation oben.

### 2.2 Lernportal (52+ Routen) — Gut, mit Lücken

**Stärken:**
- Module 1–5 mit Intro + Tag-Detail
- Quiz, Prüfung, Lernkarten, Wiederholung
- Zertifikate, Fallstudien, Dokument-Werkstatt

**In Sidebar fehlend (nur per URL):**
- `/wiederholung`, `/strategie`, `/audio-modus`
- `/konto/datenschutz`

**Empfehlung P1:** Audio-Modus und Wiederholung in Sidebar „Lernen“ aufnehmen.

### 2.3 Admin (14 Routen) — Gut
Zentrale Hub-Seite `/admin` mit Link-Grid. Sidebar listet Teilmenge.

### 2.4 Owner / B2B — OK
Owner: eigenes Dashboard-UI. B2B: `/partner-panel` mit Tabs.

### 2.5 Kaputte Links (behoben / offen)

| Link | Status |
|------|--------|
| `/dashboard` → `/statistiken` | **Behoben** |
| `/glossar` → `/glossary` | **Behoben** (Sprachsteuerung) |
| `/barrierefreiheit` | **Behoben** (Route neu) |
| `/strategie-details` | Offen — keine Route |

---

## 3. Layout & Navigation

### 3.1 Aktive Layouts
- `PublicLayout` — Footer + jetzt PublicHeader
- `AppLayout` → `DashboardLayout` — Sidebar + Top-Komfort-Leiste
- Bare pages — Audio, 2FA, Tester

### 3.2 Orphan-Dateien (Aufräumen P2)
- `components/DashboardLayout.tsx` (alt, unbenutzt)
- `components/Footer.tsx` (alt)
- `pages/Module1.tsx` … `Module5.tsx` (Legacy)
- Doppelte Legal-Pages

### 3.3 Sidebar-Struktur (DashboardLayout)
1. Startseite + Module 1–5 (mit Lock)
2. Dokument-Werkstatt
3. Hilfe
4. Admin-Block (nur admin)
5. Wissen & Tools (Rechner, Rechenpraxis, Quiz, …)

**Markup-Bug:** `GlobalGlossary` in Link mit Rechenpraxis verschachtelt — P1 fixen.

---

## 4. Komfort & Barrierefreiheit

### 4.1 Vorher (Probleme)
- ♿-Button unten links (`fixed bottom-5 left-5`) — leicht übersehen
- Sidebar A-/A+ unten — nur bei ausgeklappter Sidebar
- **Zwei Schrift-Systeme:** `useA11yPrefs` (global) + `fontScale` in DashboardLayout (lokal) — kumulierten unsauber

### 4.2 Nach P0-Fix
- **`ComfortBar` oben:** PublicHeader, DashboardLayout (Desktop + Mobile), Audio-Modus
- Ein System: `useA11yPrefs` → `--a11y-font-scale` auf `<html>`
- ♿ öffnet Panel über Kontext — kein FAB unten links mehr
- Route `/barrierefreiheit` für Erklärseite

### 4.3 Noch offen (P1)
- `DarkModeToggle` (useDarkMode) vs `useA11yPrefs.darkMode` — zwei Dark-Mode-Quellen
- AccessibilityPanel Range max 150% vs ComfortBar max 200% — angleichen
- Owner-Dashboard: eigenes Dark-UI ohne ComfortBar

---

## 5. Didaktik & Inhalte

### 5.1 Module 1–5
| Modul | Tage | Fokus | Bewertung |
|-------|------|-------|-----------|
| 1 | ~20 | Grundlagen | Gut |
| 2 | ~40 | §34c Makler | Gut |
| 3 | 80 | WEG-Verwalter | Sehr umfangreich |
| 4 | ~40 | Bewertung | Gut |
| 5 | 40 | §34i | Gut |

### 5.2 Audio-Modus
- Quelle: Modul-TS-Dateien + Knowledge-Fallback
- **Behoben:** Strukturierte Absätze, WEG/§ in Anzeige, Aussprache nur in TTS
- Modul 3: 80 Lerntage inkl. Tag 4–22

### 5.3 Rechenpraxis
- 138 Aufgaben, 7 Bereiche
- Fehler-Katalog (regelbasiert), Freemium 10 WEG
- KI-Assistent pro Aufgabe

### 5.4 Textqualität
- Modul-Content in TS-Dateien — teils Markdown-Artefakte (bereinigt im Audio-Pfad)
- Manuelle Stichprobe empfohlen pro Modul (nicht automatisierbar)

---

## 6. Marketing & Landing

**Stärken:** 5 Kurs-Landings mit Story, Preise, SEO-StructuredData.

**Schwächen:**
- Home hatte keine globale Nav (jetzt PublicHeader)
- Kein einheitlicher CTA-Pfad Rechenpraxis Solo vs Modulkauf
- `/verwalter-rechner` etc. — prüfen ob verlinkt

**Empfehlung P1:** Hero-CTAs auf allen Landings: „Kurs“ + „Rechenpraxis testen“.

---

## 7. Admin & Betrieb

- Admin-Dashboard: Nutzer, Codes, KI-Monitor, Stripe-Links
- Owner: Audit-Events, Preise, 2FA
- Ops-Skripte: `verify-rechenpraxis-p0.sh`, `run-e2e-rechenpraxis.sh`

**Plausibel** für Solo-Betreiber + B2B-Skalierung.

---

## 8. Priorisierte Maßnahmen

### P0 — Erledigt in diesem Sprint
- [x] ComfortBar oben in allen Hauptbereichen
- [x] Ein Schrift-System (Sidebar A-/A+ entfernt)
- [x] PublicHeader eingebunden
- [x] Kaputte Links /dashboard, /glossar
- [x] Route /barrierefreiheit
- [x] doppeltes `main#main-content` bereinigt

### P1 — Nächster Sprint
- [ ] Audio-Modus + Wiederholung in Sidebar
- [ ] GlobalGlossary Markup-Bug
- [ ] Dark-Mode auf ein System vereinheitlichen
- [ ] `/rechenpraxis` Auth-Konsistenz (PortalToolGuard vs Route)
- [ ] Rechenpraxis unter `/app/rechenpraxis` alias (Marketing-URL)

### P2 — Aufräumen
- [ ] Orphan-Komponenten löschen
- [ ] OpenQuizPage Route oder Import entfernen
- [ ] Owner-UI ComfortBar
- [ ] E2E: ComfortBar sichtbar auf 5 Kernseiten

### P3 — Produkt (siehe VERWALTER_SUITE_ROADMAP.md)
- Vorlagen, Brief-KI, CRM light

---

## 9. Test-Checkliste (manuell)

Nach jedem Deploy:

1. **Startseite** — Header, Komfort +/-, Dark Mode oben rechts
2. **/statistiken** — Komfort oben (Desktop rechts, Mobile neben Menü)
3. **/modul/3/tag/1** — Schrift vergrößern wirkt im Lerntext
4. **/audio-modus** — Komfort oben, WEG im Text (nicht Weh-Eh-Geh)
5. **/rechenpraxis** — Fehler-Feedback bei falscher Eingabe
6. **/admin** — Komfort-Leiste sichtbar
7. **/barrierefreiheit** — Seite lädt

---

*Audit durchgeführt als statische Code-Analyse + Architektur-Review. Live-UX bitte nach Deploy mit obiger Checkliste verifizieren.*
