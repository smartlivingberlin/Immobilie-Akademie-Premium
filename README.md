# 🏠 Immobilien Akademie Premium

Eine vollständige E-Learning-Plattform für die Immobilienwirtschaft — gebaut mit React 19, Express, tRPC und MySQL.

[![Live](https://img.shields.io/badge/Live-Railway-blueviolet)](https://immobilie-akademie-premium-production.up.railway.app)
[![Node](https://img.shields.io/badge/Node-%3E%3D22.12-green)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---

## Inhaltsverzeichnis

- [Projekt-Übersicht](#projekt-übersicht)
- [Quick Start](#quick-start)
- [Tech-Stack](#tech-stack)
- [Architektur & Datenfluss](#architektur--datenfluss)
- [Projekt-Struktur](#projekt-struktur)
- [Umgebungsvariablen](#umgebungsvariablen)
- [API-Übersicht](#api-übersicht)
- [Entwicklung](#entwicklung)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Projekt-Übersicht

Immobilien Akademie Premium ist ein High-End Lernportal für angehende Immobilienprofis. Es bietet eine umfassende Vorbereitung auf die Sachkundeprüfung nach §34c GewO und §34i GewO sowie spezialisierte Inhalte für Verwalter und Gutachter.

### Kern-Features

- **Lernen:** 5 Module, 240 Lerntage, 1.920 Unterrichtseinheiten.
- **KI-Tutor:** Kontextbezogene Unterstützung durch modernste LLMs (Claude, Gemini, Groq).
- **Prüfungssimulation:** Echter IHK-Modus mit über 800 Fragen.
- **Tools:** Finanzrechner, Exposé-Trainer, Dokument-Werkstatt.
- **Gamification:** Badges, Level-System und Leaderboard.
- **White-Label:** Mehrmandantenfähig für B2B-Kunden.

---

## Quick Start

### Voraussetzungen

- **Node.js** ≥ 22.12
- **pnpm** ≥ 10.4
- **MySQL** 8.x (lokal oder Cloud-Instanz)

### Installation

```bash
# 1. Repository klonen
git clone https://github.com/smartlivingberlin/Immobilie-Akademie-Premium.git
cd Immobilie-Akademie-Premium

# 2. Abhängigkeiten installieren
pnpm install

# 3. Umgebungsvariablen konfigurieren
cp .env.example .env
# → .env mit echten Werten befüllen (siehe Abschnitt Umgebungsvariablen)
```

### Lokales Starten

```bash
# Entwicklungsserver starten (Frontend HMR + Backend Watch)
pnpm dev
```

Der Server läuft standardmäßig auf **http://localhost:8080**.

---

## Tech-Stack

| Schicht | Technologie |
|---------|-------------|
| **Frontend** | React 19, TypeScript, Vite 7, Tailwind CSS 4, Wouter |
| **Backend** | Node.js 22, Express 4.21, tRPC 11 |
| **Datenbank** | MySQL 8, Drizzle ORM |
| **Authentifizierung** | JWT (jose), PBKDF2 Hashing |
| **KI / LLM** | Anthropic Claude 3.5, Google Gemini 2.5, Groq |
| **Infrastruktur** | Railway, Sentry, Stripe |

---

## Architektur & Datenfluss

Die Plattform folgt einer modernen Single-Page-Application (SPA) Architektur mit einem typsicheren Backend.

1.  **Frontend (React):** Kommuniziert primär über **tRPC** mit dem Server für typsichere API-Calls.
2.  **Backend (Express):** Beherbergt den tRPC-Router, REST-Endpunkte für Webhooks/Dateien und die Business-Logik.
3.  **Datenbank (Drizzle):** Abstrahiert MySQL-Zugriffe und verwaltet Migrationen.
4.  **Auth:** Sitzungsverwaltung über HttpOnly-Cookies und JWT.

---

## Projekt-Struktur

```
.
├── client/              # Frontend (React SPA)
│   ├── src/
│   │   ├── components/  # UI-Komponenten (shadcn/ui)
│   │   ├── pages/       # Routen-Komponenten
│   │   ├── hooks/       # Custom React Hooks
│   │   └── _core/       # Core-Logik (Auth, tRPC Client)
├── server/              # Backend (Node.js Express)
│   ├── _core/           # Infrastruktur (Server-Entry, Auth, LLM)
│   ├── agent/           # KI-Agenten und Automatisierung
│   ├── routers.ts       # Haupt-tRPC Router
│   └── *.ts             # Domänen-spezifische Router/Logik
├── drizzle/             # Datenbank-Schema und Migrationen
└── shared/              # Gemeinsame Typen und Konstanten
```

---

## Umgebungsvariablen

Folgende Variablen sind für den Betrieb erforderlich:

| Variable | Beschreibung | Pflicht |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL Connection String | Ja |
| `JWT_SECRET` | Geheimer Schlüssel für Sessions | Ja |
| `STRIPE_SECRET_KEY` | Stripe API Schlüssel | Ja |
| `ANTHROPIC_API_KEY` | Key für Claude KI-Tutor | Nein (empfohlen) |
| `GEMINI_API_KEY` | Key für Gemini Fallback | Nein |
| `RESEND_API_KEY` | E-Mail Versand (Passwort-Reset) | Nein |

---

## API-Übersicht

### tRPC (Haupt-API)
Die meisten Aktionen (Kursfortschritt, Quiz, Nutzerdaten) laufen über tRPC Prozeduren unter `/api/trpc`.

### REST Endpunkte
- `POST /api/auth/login`: Nutzer-Login
- `POST /api/auth/register`: Nutzer-Registrierung
- `GET /api/user/export`: DSGVO Daten-Export
- `POST /api/stripe/webhook`: Stripe Zahlungs-Bestätigung

---

## Testing

```bash
pnpm test       # Unit & Integration Tests (Vitest)
pnpm test:e2e   # End-to-End Tests (Playwright)
```

---

## Deployment

Das Projekt ist für **Railway** optimiert.
- Ein Push auf `main` triggert einen automatischen Build über `nixpacks`.
- Datenbank-Migrationen laufen automatisch beim Server-Start (`migrate.ts`).

---

## Troubleshooting

- **Crashes beim Start:** Prüfen, ob `DATABASE_URL` erreichbar ist.
- **Auth-Probleme:** `JWT_SECRET` muss mindestens 32 Zeichen lang sein.
- **KI antwortet nicht:** Kontingent der API-Keys prüfen.
