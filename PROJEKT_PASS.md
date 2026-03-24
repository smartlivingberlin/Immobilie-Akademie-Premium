# 🏠 IMMOBILIEN AKADEMIE SMART — PROJEKT PASS
**Stand: 24. März 2026 | Version: 2.0**

---

## 1. PROJEKT-IDENTITÄT

| Feld | Wert |
|------|------|
| Offizieller Name | Immobilien Akademie Smart |
| Firmenform | Immobilien Akademie Smart GmbH (i.G.) |
| Betreiber | Alisad Gadyri (Einzelunternehmer bis GmbH-Eintragung) |
| Domain (geplant) | immobilien-akademie-smart.de |
| Live-URL | https://immobilie-akademie-production.up.railway.app |
| GitHub | smartlivingberlin/Immobilie-Akademie (Branch: main) |
| Lokaler Pfad (Lenovo) | /home/lenovo/projects/Immobilie-Akademie |
| Lokaler Pfad (MacBook) | ~/Downloads/Immobilie-Akademie2-main |

---

## 2. ZUGANGSDATEN

| Rolle | Email | Passwort |
|-------|-------|----------|
| Admin/Eigentümer | admin@immobilie.de | Admin1234! |
| Eigentümer-Account | alisadgadyri38@gmail.com | — |
| Demo-Code | DEMO-2026-PREVIEW | — |

---

## 3. TECHNISCHER STACK

| Bereich | Technologie |
|---------|-------------|
| Frontend | React 19 + TypeScript + Vite |
| Backend | Node.js + Express + tRPC |
| ORM | Drizzle ORM |
| Datenbank | MySQL (Railway) |
| Hosting | Railway.app (Auto-Deploy aus GitHub main) |
| Auth | JWT + Session Cookies |
| KI | Claude Haiku (Anthropic) + Gemini Flash |
| Zahlungen | Stripe (Test-Modus) |
| CSS | Tailwind CSS |
| Routing | Wouter |
| Icons | Lucide React |

---

## 4. DATENBANK

| Feld | Wert |
|------|------|
| Host | turntable.proxy.rlwy.net |
| Port | 40815 |
| User | root |
| Datenbank | railway |
| Passwort | aus .env: DATABASE_URL |

### Tabellen & Stand (24.03.2026)
| Tabelle | Einträge |
|---------|----------|
| users | 10 (2 Admin, 8 Demo/Test) |
| question_bank | 814 Fragen (M1:101, M2:100, M3:106, M4:104, M5:403) |
| exam_sessions | 30 |
| presentation_codes | 2 |

---

## 5. PORTAL-STRUKTUR

### 5 Module
| Modul | Name | Tage | UE |
|-------|------|------|----|
| M1 | Einführung in die Immobilienwirtschaft | 20 | 160 |
| M2 | Makler §34c GewO | 60 | 480 |
| M3 | WEG- und Hausverwaltung | 80 | 640 |
| M4 | Sachverständige & Gutachter | 40 | 320 |
| M5 | Darlehensvermittler §34i GewO | 40 | 320 |
| **Gesamt** | | **220 Tage** | **1760 UE** |

### Preise (Stripe Test-Modus)
| Paket | Preis |
|-------|-------|
| Modul 1 | 199,00 € |
| Modul 2 | 499,00 € |
| Modul 3 | 699,00 € |
| Modul 4 | auf Anfrage |
| Modul 5 | auf Anfrage |
| Komplettpaket (alle 5) | 1.499,00 € |

---

## 6. FEATURES (AKTIV)

### Lernbereich
- ✅ 5 Module mit Tagesinhalten (Theorie, Normen, Analyse, Aufgaben, Videos)
- ✅ Vollbild-Modus in allen Modulen
- ✅ FontScale A+/A- global
- ✅ KI-Tutor in allen 5 Modulen (Claude Haiku)
- ✅ Lernkarten (aus DB, 30/Sitzung, Flip-Funktion)
- ✅ Fallstudien (5 Fälle, KI-Bewertung)
- ✅ Exposé-Trainer mit GEG-Checkliste
- ✅ Dokument-Viewer mit PDF-Anzeige
- ✅ Prüfungsmodus (50 Fragen, 90 Min, 70% Grenze, Wissenslücken-Analyse)
- ✅ Prüfungssimulation
- ✅ Lernstatistiken (UI vorhanden, Tracking noch nicht aktiv)
- ✅ Gamification (UI vorhanden)
- ✅ Zertifikate (UI vorhanden)
- ✅ Praxisrechner
- ✅ Finanzierungsrechner
- ✅ Glossar
- ✅ Lehrplan

### Admin-Bereich
- ✅ Admin-Kontrollzentrum (Dashboard)
- ✅ Nutzerverwaltung (Rollen, Module freischalten)
- ✅ Zugangscodes-Verwaltung
- ✅ Fragen-Manager (814 Fragen, Filter, CRUD)
- ✅ Content Upload (PDF → KI → Fragen)
- ✅ Kursbuch-Generator (KI)
- ✅ Dozenten-Cockpit (KI-Unterrichtsplan)
- ✅ Mediaskript-Generator (NotebookLM/Video/Synthesia)
- ✅ Lösungsübersicht mit BGH-Urteilen
- ✅ White-Label Admin
- ✅ Video-Verwaltung

### Rechtliches
- ✅ Impressum (vollständig, echte Daten)
- ✅ Datenschutz (vollständig)
- ✅ AGB (vollständig)
- ✅ Widerrufsbelehrung
- ✅ Cookie-Consent (DSGVO)

---

## 7. LETZTER COMMIT-STAND

| Commit | Beschreibung |
|--------|-------------|
| db97b6c | fix: Max Mustermann ersetzt, Admin-Icons, Prüfungsfragen-Count |
| ac76596 | fix: Footer-Platzhalter, Cookie-Banner, Auth-Guard |
| 31b690e | fix: Login-Redirect-Schleife behoben |
| 32bf67a | fix: LoginPage komplett neu mit useRef |
| c5db190 | fix: showAITutor State M4 und M5 |
| c584b26 | feat: KI-Tutor in allen 5 Modulen |
| e075595 | feat: globaler FontScale + Vollbild |

---

## 8. OFFENE PUNKTE (nach Priorität)

### P0 — Sofort
- [ ] Lernfortschritt-Tracking aktivieren (zeigt überall 0%)
- [ ] Stripe Live-Modus aktivieren (nach AGB/ZFU)

### P1 — Diese Woche
- [ ] Domain registrieren: immobilien-akademie-smart.de (~15€)
- [ ] AGB → Anwalt prüfen lassen
- [ ] ZFU-Prüfung → Anwalt beauftragen

### P2 — Nächste Wochen
- [ ] Screenshot-Scan aller 220 Tage
- [ ] Vollständiger Content-Check alle Module
- [ ] Partner/Investor-Rolle einbauen
- [ ] Benachrichtigungssystem
- [ ] Zertifikat-Generator aktivieren

### P3 — Später
- [ ] White-Label für andere Akademien
- [ ] AZAV-Zulassung vorbereiten
- [ ] Mobile App (PWA ausbauen)
- [ ] B2B-Portal für Arbeitgeber

---

## 9. KONTAKTDATEN (ECHTE DATEN)

| Feld | Wert |
|------|------|
| Name | Alisad Gadyri |
| Adresse | Durlacher Str. 36, 10715 Berlin |
| Telefon | +49 171 1526327 |
| E-Mail | gadyri@icloud.com |
| GitHub | alisadgadyri38@gmail.com |

---

## 10. ARBEITSREGELN (FÜR NEUE CHAT-SESSIONS)

1. Immer kennzeichnen: [WSL / Ubuntu] oder [Browser / Windows] oder [Windows PowerShell]
2. Vor jedem Commit: Build prüfen mit `pnpm run build`
3. Keine riskanten Änderungen ohne Kennzeichnung
4. Jeden Schritt ausführlich erklären (was, warum, weshalb, Pro/Contra)
5. Railway = Browser oder Windows PowerShell (kein ARM64 CLI)
6. Hauptentwicklung immer in WSL/Ubuntu

---

*Dieser Pass wurde automatisch generiert und soll in jedem neuen Chat als erste Referenz dienen.*
*Bei neuer Session: "Lies PROJEKT_PASS.md" — dann bin ich sofort auf dem aktuellen Stand.*
