# 🏗️ Architektur — Immobilien Akademie Smart

Dieses Dokument beschreibt die technische Architektur der Plattform: wie die Schichten zusammenspielen, wie Daten fließen und welche Designentscheidungen getroffen wurden.

---

## Inhaltsverzeichnis

- [Systemübersicht](#systemübersicht)
- [Frontend (React + Vite)](#frontend-react--vite)
- [Backend (Express + tRPC)](#backend-express--trpc)
- [Datenbank (MySQL + Drizzle)](#datenbank-mysql--drizzle)
- [Authentifizierung](#authentifizierung)
- [KI-Integration](#ki-integration)
- [Zahlungen (Stripe)](#zahlungen-stripe)
- [White-Label-System](#white-label-system)
- [Sicherheit](#sicherheit)
- [Performance](#performance)
- [Datenfluss-Beispiele](#datenfluss-beispiele)

---

## Systemübersicht

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                              │
│                                                             │
│  React 19 SPA (Vite)                                        │
│  ├── Wouter (Routing)                                       │
│  ├── TanStack Query (Server State)                          │
│  ├── tRPC Client (typsichere API-Calls)                     │
│  └── Tailwind CSS + shadcn/ui (UI)                          │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS (JSON/tRPC)
                       │ Cookie: app_session_id (JWT)
┌──────────────────────▼──────────────────────────────────────┐
│                   Express Server (Node.js ≥22)              │
│                                                             │
│  Middleware-Stack:                                          │
│  ├── Helmet (Security Headers)                              │
│  ├── Compression (Gzip/Brotli)                              │
│  ├── Rate Limiter (Login: 10/15min, AI: 15/min)             │
│  ├── Cookie Parser                                          │
│  └── CORS                                                   │
│                                                             │
│  Routen:                                                    │
│  ├── /api/trpc/*     → tRPC (appRouter)                     │
│  ├── /api/auth/*     → Email/Passwort Auth                  │
│  ├── /api/stripe/*   → Stripe Checkout + Webhook            │
│  ├── /api/health     → Healthcheck                          │
│  ├── /api/tts        → ElevenLabs TTS-Proxy                 │
│  ├── /api/consent    → DSGVO Cookie-Logging                 │
│  └── /*              → React SPA (index.html)               │
└──────────────────────┬──────────────────────────────────────┘
                       │ mysql2 (TCP)
┌──────────────────────▼──────────────────────────────────────┐
│                   MySQL 8 (Railway)                         │
│                                                             │
│  Drizzle ORM                                                │
│  ├── Schema: drizzle/schema.ts                              │
│  └── Migrations: drizzle/0000–0015.sql (auto beim Start)    │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend (React + Vite)

### Technologien

| Technologie | Version | Zweck |
|-------------|---------|-------|
| React | 19 | UI-Framework |
| TypeScript | 5.9 | Typsicherheit |
| Vite | 7 | Build-Tool + Dev-Server |
| Tailwind CSS | 4 | Utility-first CSS |
| shadcn/ui | — | Basis-UI-Komponenten (Radix UI) |
| Wouter | 3.7 | Leichtgewichtiges Routing |
| TanStack Query | 5 | Server-State-Management |
| tRPC Client | 11 | Typsichere API-Calls |
| Framer Motion | 12 | Animationen |
| Recharts | 2 | Diagramme |

### Routing

Alle Routen sind in `client/src/App.tsx` definiert. Seiten werden lazy-geladen (`React.lazy`):

```
/                    → Home (Landing Page)
/login               → LoginPage
/dashboard           → Dashboard (geschützt)
/modul/1             → Module1WithIntro (geschützt + ModuleGuard)
/modul/1/tag/:day    → Module1Detail
/modul/2             → Module2WithIntro
...
/quiz                → QuizPage
/pruefung            → ExamMode
/lernkarten          → Flashcards
/rechner             → Rechner
/glossar             → Glossary
/admin               → AdminDashboard (nur admin)
/admin/nutzer        → UserManagement
/admin/fragen        → FragenManager
/admin/whitelabel    → WhiteLabelAdmin
/impressum           → Impressum
/datenschutz         → Datenschutz
/agb                 → AGB
```

### Zugriffskontrolle

`ModuleGuard` prüft, ob der Nutzer das jeweilige Modul freigeschaltet hat:

```tsx
// client/src/components/ModuleGuard.tsx
// Liest user.enabledModules aus dem Auth-Context
// Leitet zu /kurse weiter wenn Modul nicht freigeschaltet
```

### State Management

- **Server State:** TanStack Query + tRPC (automatisches Caching, Refetching)
- **Auth State:** `useAuth()` Hook (`client/src/_core/hooks/useAuth.ts`) — liest `trpc.auth.me`
- **Theme:** `ThemeContext` (Dark/Light Mode via `next-themes`)
- **White-Label:** `WhiteLabelContext` (Farben, Logo, aktivierte Module)

### Build-Optimierung

Vite teilt den Bundle in Chunks auf (`vite.config.ts`):

| Chunk | Inhalt |
|-------|--------|
| `vendor-react` | React, ReactDOM, alle node_modules |
| `vendor-state` | TanStack Query, tRPC, Wouter, Framer Motion |
| `vendor-radix` | Alle Radix UI Komponenten |
| `vendor-icons` | Lucide React |
| `data-questions` | 814 Prüfungsfragen (lazy) |

PDF-Bibliotheken (`pdfjs-dist`, `jspdf`) werden dynamisch importiert — nur wenn benötigt.

---

## Backend (Express + tRPC)

### Server-Einstiegspunkt

`server/_core/index.ts` — startet den Express-Server:

1. Sentry initialisieren (wenn `SENTRY_DSN` gesetzt)
2. Umgebungsvariablen validieren (`server/_core/env.ts`)
3. Datenbankmigrationen ausführen (`server/migrate.ts`)
4. Express-Middleware registrieren
5. Alle Routen registrieren
6. Vite Dev-Server (development) oder statische Dateien (production) einbinden
7. Quiz-Fragen seeden wenn Datenbank leer
8. Server auf `PORT` (Standard: 8080) starten

### tRPC Router-Struktur

Der Haupt-Router `appRouter` in `server/routers.ts` aggregiert alle Sub-Router:

```typescript
appRouter = router({
  system:        systemRouter,      // Manus-Kompatibilität
  videos:        videoRouter,       // Video-Verwaltung
  exam:          examRouter,        // Prüfungsmodus
  openQuestions: openQuestionsRouter,
  pdf:           pdfRouter,         // PDF-Generierung
  certificate:   certificateRouter, // Zertifikate
  quiz:          quizRouter,        // Quiz-Fragen
  azav:          azavRouter,        // AZAV-Compliance
  auth:          router({ me, logout, completeOnboarding }),
  whitelabel:    router({ list, getById, create, update, delete, ... }),
  aiAssistant:   router({ createConversation, sendMessage, ... }),
  // + weitere inline-Router für Nutzer, Admin, etc.
})
```

### Prozedur-Typen

| Typ | Beschreibung |
|-----|-------------|
| `publicProcedure` | Kein Login nötig |
| `protectedProcedure` | Login erforderlich (JWT-Cookie wird geprüft) |
| `adminProcedure` | Login + `role === 'admin'` erforderlich |

### Middleware-Reihenfolge

```
Request
  → Permissions-Policy Header
  → HSTS + X-Frame-Options
  → Helmet (CSP, etc.)
  → Rate Limiter (je nach Route)
  → Compression
  → Cookie Parser
  → CORS
  → Inspect-Modus-Guard
  → Stripe Webhook (raw body, VOR express.json!)
  → express.json (50mb limit)
  → Auth-Routen
  → tRPC
  → Static Files / Vite
```

> **Wichtig:** Der Stripe Webhook muss den rohen Request-Body erhalten. Deshalb wird er **vor** `express.json()` registriert.

---

## Datenbank (MySQL + Drizzle)

### Verbindung

`server/db.ts` verwaltet eine Singleton-Verbindung:

```typescript
let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (_db) return _db;
  _db = drizzle(process.env.DATABASE_URL);
  return _db;
}
```

### Schema-Übersicht

Definiert in `drizzle/schema.ts`:

```
users                  → Nutzerkonten
  ├── id, openId, email, name
  ├── role: 'user' | 'admin' | 'trainer'
  ├── enabledModules: '1,2,3' (kommagetrennt)
  ├── tenantId → whitelabel_configs.id
  └── passwordHash, passwordSalt (PBKDF2)

question_bank          → 814 Prüfungsfragen
  ├── moduleId (1–5)
  ├── questionText, options (JSON), correctAnswer
  └── explanation, difficulty, topic

exam_sessions          → Prüfungssitzungen
exam_questions         → Einzelfragen pro Sitzung
exam_weak_topics       → Wissenslücken-Analyse

chat_conversations     → KI-Tutor-Gespräche
chat_messages          → Einzelne Nachrichten (user/assistant/system)

certificates           → Ausgestellte Zertifikate
video_tutorials        → Video-Metadaten
video_progress         → Fortschritt pro Video

whitelabel_configs     → White-Label-Mandanten
  ├── slug, companyName
  ├── primaryColor, secondaryColor, accentColor, sidebarColor
  ├── enabledModules, maxUsers
  └── azavEnabled, azavCertNumber

learning_logs          → Lernfortschritt (AZAV-konform)
user_sessions          → Session-Tracking
activity_heartbeats    → Aktivitäts-Heartbeats
exam_audit_log         → Prüfungs-Audit-Trail
feedback               → Nutzer-Feedback
complaints             → Beschwerden
consent_log            → DSGVO Cookie-Consent
avv_agreements         → Auftragsverarbeitungsverträge
```

### Migrationen

Migrationen liegen als SQL-Dateien in `drizzle/`:

```
0000_known_riptide.sql      → Basis-Tabellen (users, question_bank)
0001_cold_zeigeist.sql      → Chat-Tabellen
0002_faithful_hydra.sql     → Video-Tabellen
...
0011_azav_compliance_tables.sql → AZAV-Tabellen
0012_auth_credentials.sql   → Passwort-Hashing-Felder
0013_user_enabled_modules.sql → Modul-Freischaltung
0014_password_reset_tokens.sql → Passwort-Reset
0015_access_codes.sql       → Zugangscodes
add-indexes.sql             → Performance-Indizes
```

`server/migrate.ts` führt alle `.sql`-Dateien beim Start aus. Bereits ausgeführte Migrationen werden übersprungen (Fehler `already exists` / `Duplicate` werden ignoriert).

---

## Authentifizierung

### Ablauf

```
1. POST /api/auth/login
   → Email + Passwort
   → PBKDF2-SHA256 Passwort-Verifikation
   → JWT erstellen (jose, HS256, 1 Jahr gültig)
   → Cookie setzen: app_session_id (HttpOnly, SameSite=Lax)

2. Jeder API-Request
   → Cookie app_session_id lesen
   → JWT verifizieren (server/_core/context.ts)
   → User aus DB laden
   → ctx.user verfügbar in allen tRPC-Prozeduren

3. POST /api/auth/logout
   → Cookie löschen (maxAge: -1)
```

### Passwort-Hashing

```typescript
// server/_core/auth-local.ts
// PBKDF2-SHA256, 100.000 Iterationen, 64 Byte Key
// Kein bcrypt nötig — Node.js crypto built-in
hashPassword(password, salt?) → { hash, salt }
verifyPassword(password, storedHash, storedSalt) → boolean
```

### JWT-Payload

```json
{
  "openId": "user-uuid",
  "appId": "local",
  "name": "Max Mustermann",
  "exp": 1234567890
}
```

### Passwort-Reset

```
POST /api/auth/forgot-password
→ Token generieren (nanoid, 1h gültig)
→ E-Mail mit Reset-Link senden (Gmail/Nodemailer)

POST /api/auth/reset-password
→ Token validieren
→ Neues Passwort hashen und speichern
```

### Rate Limiting

| Endpunkt | Limit |
|----------|-------|
| `/api/auth/login` | 10 Versuche / 15 Minuten pro IP |
| `/api/auth/register` | 5 Versuche / 1 Stunde pro IP |
| `/api/auth/forgot-password` | 3 Versuche / 1 Stunde pro IP |
| `/api/ai/*` | 15 Anfragen / Minute pro IP |

---

## KI-Integration

### Modell-Abstraktion

`server/_core/llm.ts` abstrahiert verschiedene KI-Anbieter:

```typescript
invokeLLM({ messages, maxTokens, response_format? })
→ Versucht Anthropic Claude Haiku
→ Fallback: Google Gemini Flash
→ Fallback: Groq
```

### KI-Tutor (aiAssistant)

- Kontextbezogene Antworten mit Pflicht-Quellenangaben
- Nur belegbare Fakten (§34c GewO, BGB, WEG, ImmoWertV)
- Antwort-Struktur: Direkte Antwort → Gesetzliche Grundlage → Praxisbeispiel → Merksatz → Quellen
- Konversations-History wird in `chat_conversations` / `chat_messages` gespeichert

### Quiz-Bewertung

KI bewertet offene Antworten auf einer Skala 0–100:
- Score ≥ 70 = korrekt
- Strukturiertes JSON-Response via `response_format`

### RAG-Tutor

`server/ragTutor.ts` — Retrieval-Augmented Generation für modulspezifische Inhalte.

### KI-Agenten

| Agent | Beschreibung |
|-------|-------------|
| `NightCron.ts` | Nächtliche Aufgaben (Statistiken, Cleanup) |
| `PortalAgent.ts` | Portal-Management-Aufgaben |
| `SuperAgent.ts` | Übergeordneter Koordinations-Agent |

---

## Zahlungen (Stripe)

### Checkout-Flow

```
1. Frontend: trpc.stripe.createCheckout.mutate({ modules })
2. Backend: Stripe Checkout Session erstellen
   → metadata: { modules: "1,2", email: "..." }
3. Nutzer: Stripe Checkout Page
4. Stripe: POST /api/stripe/webhook (checkout.session.completed)
5. Backend: enabledModules in users-Tabelle aktualisieren
6. Nutzer: Weiterleitung zu /zahlung-erfolgreich
```

### Webhook-Verarbeitung

```typescript
// server/_core/index.ts
// Stripe Webhook MUSS vor express.json() registriert werden
app.post("/api/stripe/webhook", express.raw({ type: "*/*" }), async (req, res) => {
  // Signatur validieren
  // checkout.session.completed → Module freischalten
})
```

### Preise (Stripe Test-Modus)

| Paket | Preis |
|-------|-------|
| Modul 1 | 199,00 € |
| Modul 2 | 499,00 € |
| Modul 3 | 699,00 € |
| Komplettpaket (M1–M5) | 1.499,00 € |

---

## White-Label-System

Das System unterstützt mehrere Mandanten (Tenants) mit eigener Markenidentität.

### Datenmodell

```
whitelabel_configs
├── slug          → URL-Identifier (z.B. "meine-akademie")
├── companyName   → Anzeigename
├── primaryColor  → Primärfarbe (#hex)
├── logoUrl       → Logo-URL (S3/lokaler Speicher)
├── enabledModules → Freigeschaltete Module ("1,2,3")
├── maxUsers      → Maximale Nutzerzahl
└── azavEnabled   → AZAV-Zertifizierung aktiv

users
└── tenantId → whitelabel_configs.id
```

### Frontend-Integration

`WhiteLabelContext` (`client/src/contexts/WhiteLabelContext.tsx`) lädt die Konfiguration des aktuellen Nutzers und überschreibt CSS-Variablen für Farben und Logo.

---

## Sicherheit

### HTTP-Security-Headers (Helmet)

```
Content-Security-Policy:
  default-src 'self'
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com
  connect-src 'self' https://api.stripe.com https://api.anthropic.com
  frame-src 'self' https://js.stripe.com
  object-src 'none'

Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: SAMEORIGIN
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Inspect-Modus

Für Demo-Präsentationen: Cookie `inspect_mode=1` blockiert alle schreibenden Operationen (POST/PUT/DELETE) auf kritischen Routen.

### DSGVO-Compliance

| Feature | Implementierung |
|---------|----------------|
| Cookie-Consent | `CookieConsent.tsx` + `/api/consent` Logging |
| Datenschutz | Vollständige Datenschutzerklärung (`/datenschutz`) |
| Art. 15 Auskunft | `GET /api/user/my-data` |
| Art. 20 Export | `GET /api/user/export` (JSON-Download) |
| Account löschen | `DELETE /api/user/delete` |
| AZAV-Compliance | Lernzeit-Tracking, Audit-Log, Heartbeats |

---

## Performance

### Frontend

- **Code Splitting:** Vite teilt Bundle in Chunks (React, State, Radix, Icons, Fragen)
- **Lazy Loading:** Alle Seiten werden lazy geladen (`React.lazy`)
- **PWA:** Service Worker (`client/public/sw.js`) für Offline-Fähigkeit
- **Asset Caching:** `/assets/*` → `Cache-Control: public, max-age=31536000, immutable`

### Backend

- **Compression:** Gzip/Brotli für alle Responses
- **DB Connection Pooling:** Singleton-Verbindung via `getDb()`
- **Rate Limiting:** Schützt vor Überlastung durch Bots

### Datenbank

- **Indizes:** `drizzle/add-indexes.sql` — Indizes auf häufig abgefragten Spalten
- **Connection Timeout:** 30 Sekunden für Migrationen

---

## Datenfluss-Beispiele

### Beispiel 1: Nutzer loggt sich ein

```
Browser                    Express                    MySQL
  │                           │                          │
  │ POST /api/auth/login       │                          │
  │ { email, password }        │                          │
  │ ─────────────────────────► │                          │
  │                           │ SELECT * FROM users       │
  │                           │ WHERE email = ?           │
  │                           │ ─────────────────────────►│
  │                           │ ◄─────────────────────────│
  │                           │ verifyPassword(PBKDF2)    │
  │                           │ createSessionToken(JWT)   │
  │ ◄───────────────────────── │                          │
  │ Set-Cookie: app_session_id │                          │
  │ { success: true }          │                          │
```

### Beispiel 2: tRPC-Anfrage (geschützt)

```
Browser                    Express (tRPC)             MySQL
  │                           │                          │
  │ POST /api/trpc/quiz.list   │                          │
  │ Cookie: app_session_id     │                          │
  │ ─────────────────────────► │                          │
  │                           │ verifySessionToken(JWT)   │
  │                           │ getUserByOpenId()         │
  │                           │ ─────────────────────────►│
  │                           │ ◄─────────────────────────│
  │                           │ ctx.user = { id, role }   │
  │                           │ quizRouter.list()         │
  │                           │ SELECT * FROM question_bank│
  │                           │ ─────────────────────────►│
  │                           │ ◄─────────────────────────│
  │ ◄───────────────────────── │                          │
  │ { questions: [...] }       │                          │
```

### Beispiel 3: Stripe-Kauf

```
Browser          Express          Stripe           MySQL
  │                 │                │                │
  │ createCheckout  │                │                │
  │ ──────────────► │                │                │
  │                 │ Create Session │                │
  │                 │ ─────────────► │                │
  │                 │ ◄───────────── │                │
  │ ◄────────────── │                │                │
  │ redirect to     │                │                │
  │ Stripe Checkout │                │                │
  │ ──────────────────────────────── │                │
  │ (Nutzer zahlt)  │                │                │
  │                 │ Webhook POST   │                │
  │                 │ ◄───────────── │                │
  │                 │ Signatur prüfen│                │
  │                 │ UPDATE users   │                │
  │                 │ SET enabledModules = '1,2'      │
  │                 │ ─────────────────────────────── ►│
  │                 │ ◄──────────────────────────────  │
  │                 │ 200 OK         │                │
```
