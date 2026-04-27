# 🏠 Immobilien Akademie Smart

Eine vollständige E-Learning-Plattform für die Immobilienwirtschaft — gebaut mit React, Express, tRPC und MySQL auf Railway.

[![Live](https://img.shields.io/badge/Live-Railway-blueviolet)](https://immobilie-akademie-production.up.railway.app)
[![Node](https://img.shields.io/badge/Node-%3E%3D22.12-green)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---

## Inhaltsverzeichnis

- [Projekt-Übersicht](#projekt-übersicht)
- [Quick Start](#quick-start)
- [Architektur](#architektur)
- [Projekt-Struktur](#projekt-struktur)
- [Umgebungsvariablen](#umgebungsvariablen)
- [Entwicklung](#entwicklung)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Projekt-Übersicht

Immobilien Akademie Smart ist ein Premium-Lernportal für angehende Immobilienprofis. Es deckt die Ausbildungsinhalte für Makler (§34c GewO), WEG-Verwalter, Sachverständige und Darlehensvermittler (§34i GewO) ab.

### Features

| Bereich | Features |
|---------|----------|
| **Lernen** | 5 Module, Tagesinhalte, Vollbild-Modus, Schriftgröße A+/A- |
| **KI-Tutor** | Claude Haiku in allen 5 Modulen, kontextbezogene Antworten mit Quellenangaben |
| **Prüfung** | 814 Fragen in der Datenbank, Prüfungsmodus (50 Fragen, 90 Min, 70%-Grenze) |
| **Lernkarten** | Spaced-Repetition-System, Flip-Funktion, 30 Karten/Sitzung |
| **Fallstudien** | 5 Fälle mit KI-Bewertung |
| **Rechner** | Annuität, Darlehen, Miet-, Makler-, WEG-Rechner u.v.m. |
| **Gamification** | Badges, Leaderboard, Zertifikate |
| **Admin** | Nutzerverwaltung, Fragen-Manager (CRUD), Content-Upload, KI-Kursbuch-Generator |
| **White-Label** | Mandantenfähig — eigene Farben, Logo, Module pro Tenant |
| **Zahlungen** | Stripe-Integration (Test- und Live-Modus) |
| **DSGVO** | Cookie-Consent, Datenschutz, AGB, Widerruf, Art. 15/20-Export |

### Module

| # | Name | Dauer | Unterrichtseinheiten |
|---|------|-------|----------------------|
| M1 | Einführung in die Immobilienwirtschaft | 20 Tage | 160 UE |
| M2 | Makler §34c GewO | 60 Tage | 480 UE |
| M3 | WEG- und Hausverwaltung | 80 Tage | 640 UE |
| M4 | Sachverständige & Gutachter | 40 Tage | 320 UE |
| M5 | Darlehensvermittler §34i GewO | 40 Tage | 320 UE |

---

## Quick Start

### Voraussetzungen

- **Node.js** ≥ 22.12 (`node --version`)
- **pnpm** ≥ 10.4 (`pnpm --version` — ggf. `npm i -g pnpm`)
- **MySQL** 8.x (lokal oder via Railway)

### Installation

```bash
# 1. Repository klonen
git clone https://github.com/smartlivingberlin/Immobilie-Akademie.git
cd Immobilie-Akademie

# 2. Abhängigkeiten installieren
pnpm install

# 3. Umgebungsvariablen konfigurieren
cp .env.example .env
# → .env mit echten Werten befüllen (siehe Abschnitt Umgebungsvariablen)
```

### Lokales Starten

```bash
# Entwicklungsserver starten (Frontend + Backend gleichzeitig)
pnpm dev
```

Der Server läuft auf **http://localhost:8080** (oder dem in `PORT` gesetzten Wert).  
Vite HMR ist aktiv — Änderungen im Frontend werden sofort sichtbar.

### Build prüfen (vor jedem Commit!)

```bash
pnpm build      # TypeScript kompilieren + Vite-Bundle erstellen
pnpm check      # TypeScript-Typen prüfen (kein Emit)
```

---

## Architektur

Detaillierte Architektur-Dokumentation: [`ARCHITECTURE.md`](ARCHITECTURE.md)

```
Browser (React SPA)
      │  HTTPS
      ▼
Express Server (Node.js)
  ├── /api/trpc/*     → tRPC Router (typsichere API)
  ├── /api/auth/*     → Email/Passwort Auth (JWT)
  ├── /api/stripe/*   → Stripe Webhooks & Checkout
  ├── /api/health     → Healthcheck (Railway)
  └── /*              → Vite SPA (React)
      │
      ▼
MySQL (Railway)
  └── Drizzle ORM (Schema + Migrations)
```

### Tech-Stack

| Schicht | Technologie |
|---------|-------------|
| Frontend | React 19, TypeScript, Vite 7, Tailwind CSS 4 |
| Routing | Wouter |
| State/API | TanStack Query + tRPC |
| Backend | Node.js ≥22, Express 4 |
| Datenbank | MySQL 8 via Drizzle ORM |
| Auth | PBKDF2-SHA256 Passwort-Hashing + JWT (jose) |
| KI | Anthropic Claude Haiku, Google Gemini Flash |
| Zahlungen | Stripe |
| Hosting | Railway (Nixpacks, Auto-Deploy aus `main`) |
| Monitoring | Sentry (optional) |

---

## Projekt-Struktur

```
Immobilie-Akademie/
├── client/                  # React Frontend (Vite)
│   ├── src/
│   │   ├── pages/           # Seiten (Dashboard, Module, Admin, Legal…)
│   │   │   ├── modules/     # Modul-Detailseiten (M1–M5)
│   │   │   └── admin/       # Admin-Bereich (Dashboard, Fragen, User…)
│   │   ├── components/      # Wiederverwendbare UI-Komponenten
│   │   │   ├── ui/          # shadcn/ui Basis-Komponenten
│   │   │   ├── calculators/ # Finanz- und Immobilienrechner
│   │   │   ├── gamification/# Badges, Leaderboard
│   │   │   └── layout/      # Header, Footer, DashboardLayout
│   │   ├── lib/             # Hilfsfunktionen (trpc, queryClient…)
│   │   ├── hooks/           # Custom React Hooks
│   │   ├── contexts/        # ThemeContext, WhiteLabelContext
│   │   └── data/            # Statische Daten (Quizfragen, Glossar…)
│   └── public/              # Statische Assets (Icons, Manifest, SW)
│
├── server/                  # Express Backend
│   ├── _core/               # Kern-Infrastruktur
│   │   ├── index.ts         # Server-Einstiegspunkt
│   │   ├── trpc.ts          # tRPC-Konfiguration
│   │   ├── auth-local.ts    # Email/Passwort Auth + JWT
│   │   ├── env.ts           # Umgebungsvariablen-Validierung
│   │   └── llm.ts           # KI-Modell-Abstraktion
│   ├── routers.ts           # Haupt-tRPC-Router (appRouter)
│   ├── db.ts                # Drizzle DB-Verbindung + Helpers
│   ├── migrate.ts           # Automatische SQL-Migrationen beim Start
│   ├── examRouter.ts        # Prüfungsmodus-API
│   ├── quizRouter.ts        # Quiz-API
│   ├── certificateRouter.ts # Zertifikat-Generierung
│   ├── stripe.ts            # Stripe Checkout + Webhook
│   └── agent/               # KI-Agenten (NightCron, PortalAgent)
│
├── drizzle/                 # Datenbank
│   ├── schema.ts            # Tabellenstruktur (Drizzle)
│   ├── migrations/          # SQL-Migrationsdateien (0000–0015)
│   └── meta/                # Drizzle-Snapshots
│
├── shared/                  # Gemeinsame Typen (Frontend + Backend)
│   ├── types.ts
│   └── const.ts
│
├── .env.example             # Vorlage für Umgebungsvariablen
├── drizzle.config.ts        # Drizzle-Kit-Konfiguration
├── vite.config.ts           # Vite-Build-Konfiguration
├── nixpacks.toml            # Railway Build-Konfiguration
└── railway.json             # Railway Deploy-Konfiguration
```

---

## Umgebungsvariablen

Kopiere `.env.example` zu `.env` und befülle alle Pflichtfelder:

```bash
cp .env.example .env
```

### Pflichtfelder (Server startet nicht ohne diese)

| Variable | Beschreibung | Beispiel |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL Connection String | `mysql://user:pass@host:3306/db` |
| `JWT_SECRET` | Geheimer Schlüssel für JWT-Tokens (min. 32 Zeichen) | `mein-geheimer-schluessel-32-zeichen` |
| `STRIPE_SECRET_KEY` | Stripe API-Schlüssel | `sk_test_...` |

### Optionale Felder

| Variable | Beschreibung |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Claude KI-Tutor (ohne: KI-Features deaktiviert) |
| `GOOGLE_AI_API_KEY` | Gemini Flash (Fallback für KI) |
| `GROQ_API_KEY` | Groq API (weiterer KI-Fallback) |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook-Signatur-Validierung |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe Public Key (Frontend) |
| `GMAIL_USER` / `GMAIL_PASSWORD` | E-Mail-Versand (Passwort-Reset) |
| `SENTRY_DSN` | Sentry Error Monitoring |
| `ELEVENLABS_API_KEY` | Text-to-Speech (Vorlesen-Funktion) |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics |
| `ADMIN_PASSWORD` | Initiales Admin-Passwort |
| `OWNER_MAGIC_CODE` | Owner-Zugang für Kontrollpanel |

---

## Entwicklung

### Coding-Standards

- **TypeScript** überall — kein `any` ohne Kommentar
- **Prettier** für Formatierung: `pnpm format`
- **Typen prüfen** vor Commit: `pnpm check`
- **Build prüfen** vor Commit: `pnpm build`
- Commits im **Conventional Commit**-Format: `feat:`, `fix:`, `chore:` etc.

### Neue API-Route hinzufügen

1. Router in `server/` erstellen (z.B. `server/myRouter.ts`)
2. In `server/routers.ts` importieren und zum `appRouter` hinzufügen
3. Im Frontend via `trpc.myRouter.myProcedure.useQuery()` aufrufen

### Neue Seite hinzufügen

1. Komponente in `client/src/pages/` erstellen
2. In `client/src/App.tsx` als `lazy()` importieren
3. `<Route path="/mein-pfad" component={MeineSeite} />` in den `<Switch>` eintragen

### Datenbankschema ändern

```bash
# 1. Schema in drizzle/schema.ts anpassen
# 2. Migration generieren
npx drizzle-kit generate

# 3. Migration lokal testen
# (Migrationen laufen beim Server-Start automatisch)
pnpm dev
```

> **Hinweis:** `pnpm db:push` ist auf Railway deaktiviert. Migrationen laufen automatisch beim Start via `server/migrate.ts`.

---

## Testing

```bash
# Alle Tests ausführen
pnpm test

# Tests im Watch-Modus (während Entwicklung)
pnpm test --watch
```

Tests liegen neben den Server-Dateien als `*.test.ts`:

```
server/
├── aiAssistant.test.ts
├── auth.logout.test.ts
├── certificates.test.ts
├── exam-mode-button.test.ts
├── ihk-timer.test.ts
├── pdf.test.ts
└── whitelabel.test.ts
```

Framework: **Vitest** — kompatibel mit Jest-Syntax.

---

## Deployment

Detaillierte Deployment-Dokumentation: [`DEPLOYMENT.md`](DEPLOYMENT.md)

### Railway (Produktiv)

Das Projekt deployed automatisch bei jedem Push auf `main`:

1. Railway erkennt `nixpacks.toml` → installiert Node.js 22
2. Build: `pnpm build` (Vite + esbuild)
3. Start: `node dist/index.js`
4. Healthcheck: `GET /api/health` → `{ ok: true }`

### Manueller Deploy-Check

```bash
# Lokal den Production-Build testen
pnpm build
NODE_ENV=production node dist/index.js
```

---

## Troubleshooting

### Server startet nicht

**Fehler:** `[FATAL] Pflicht-Umgebungsvariable fehlt: DATABASE_URL`  
**Lösung:** `.env` prüfen — alle drei Pflichtfelder müssen gesetzt sein (`DATABASE_URL`, `JWT_SECRET`, `STRIPE_SECRET_KEY`).

### Datenbankverbindung schlägt fehl

**Fehler:** `[Database] DATABASE_URL fehlt` oder MySQL-Verbindungsfehler  
**Lösung:**
```bash
# Connection String testen
mysql -u user -p -h host -P port database
# Oder: Railway Dashboard → MySQL Service → Connect
```

### Login-Schleife / Auth-Probleme

- `JWT_SECRET` in `.env` prüfen — muss identisch zwischen Deploys sein
- Browser-Cookies löschen (Cookie-Name: `app_session_id`)
- Railway Logs prüfen: `[Auth]`-Einträge

### Build schlägt fehl

```bash
# TypeScript-Fehler anzeigen
pnpm check

# Häufige Ursache: fehlende Typen oder Import-Pfade
# Alias-Pfade: @/ → client/src/, @shared/ → shared/
```

### KI-Tutor antwortet nicht

- `ANTHROPIC_API_KEY` in den Umgebungsvariablen prüfen
- Railway Logs: `[WARN] Optionale Variable nicht gesetzt: ANTHROPIC_API_KEY`
- Fallback: Gemini (`GOOGLE_AI_API_KEY`) oder Groq (`GROQ_API_KEY`) setzen

### Stripe Webhook schlägt fehl

- `STRIPE_WEBHOOK_SECRET` muss mit dem in Stripe konfigurierten Webhook-Secret übereinstimmen
- Lokal testen: Stripe CLI → `stripe listen --forward-to localhost:8080/api/stripe/webhook`

### Logs prüfen (Railway)

```
Railway Dashboard → Service → Deployments → Logs
```

Wichtige Log-Präfixe:
- `[DB]` — Datenbankoperationen und Migrationen
- `[Auth]` — Login/Logout-Ereignisse
- `[Stripe]` — Zahlungsereignisse
- `[CRITICAL]` — Unbehandelte Fehler
- `[WARN]` — Optionale Konfiguration fehlt

---

## Weiterführende Dokumentation

- [`ARCHITECTURE.md`](ARCHITECTURE.md) — Detaillierte Systemarchitektur
- [`DEPLOYMENT.md`](DEPLOYMENT.md) — Schritt-für-Schritt Deployment-Guide
- [`PROJEKT_PASS.md`](PROJEKT_PASS.md) — Projektstatus, Zugangsdaten, offene Punkte
- [`BENUTZERHANDBUCH.md`](BENUTZERHANDBUCH.md) — Anleitung für Endnutzer
