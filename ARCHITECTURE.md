# 🏗️ Architektur — Immobilien Akademie Premium

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
│  React 19 SPA (Vite 7)                                      │
│  ├── Wouter (Routing)                                       │
│  ├── TanStack Query (Server State)                          │
│  ├── tRPC Client (typsichere API-Calls)                     │
│  └── Tailwind CSS 4 + shadcn/ui (UI)                        │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS (JSON/tRPC)
                       │ Cookie: app_session_id (JWT)
┌──────────────────────▼──────────────────────────────────────┐
│                   Express Server (Node.js 22)               │
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
│  └── /*              → React SPA (index.html)               │
└──────────────────────┬──────────────────────────────────────┘
                       │ mysql2 (TCP)
┌──────────────────────▼──────────────────────────────────────┐
│                   MySQL 8                                   │
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
| **React** | 19 | UI-Framework |
| **TypeScript** | 5.x | Typsicherheit |
| **Vite** | 7 | Build-Tool + Dev-Server |
| **Tailwind CSS** | 4 | Utility-first CSS |
| **shadcn/ui** | — | Basis-UI-Komponenten (Radix UI) |
| **Wouter** | 3.7 | Leichtgewichtiges Routing |
| **TanStack Query** | 5 | Server-State-Management |
| **tRPC Client** | 11 | Typsichere API-Calls |

### Routing

Seiten werden in `client/src/App.tsx` definiert und via `React.lazy()` für optimales Code-Splitting geladen.

### Zugriffskontrolle

- **ProtectedRoute:** Verlangt gültige Sitzung.
- **AdminRoute:** Verlangt `role === 'admin'`.
- **ModuleGuard:** Prüft, ob der Nutzer das spezifische Kursmodul erworben hat.

---

## Backend (Express + tRPC)

### tRPC Router-Struktur

Der `appRouter` in `server/routers.ts` aggregiert alle Sub-Router:
- `auth`: Login, Registrierung, Onboarding.
- `quiz`: Fragenkatalog und Übungen.
- `exam`: Prüfungsmodus und Auswertung.
- `whitelabel`: Mandanten-Konfiguration.
- `aiAssistant`: KI-Tutor Konversationen.

### Middleware

1.  **Sicherheit:** Helmet für CSP/HSTS, CORS-Einschränkungen.
2.  **Rate Limiting:** Schutz vor Brute-Force auf Auth-Routen.
3.  **Auth:** Cookie-Parser liest JWT, `createContext` stellt den Nutzer für tRPC bereit.

---

## Datenbank (MySQL + Drizzle)

### Schema (Auszug)

- **users:** Kern-Nutzerdaten, Rollen, freigeschaltete Module.
- **question_bank:** Über 800 IHK-orientierte Prüfungsfragen.
- **exam_sessions:** Protokollierung von Prüfungsversuchen.
- **learning_logs:** AZAV-konformes Tracking der Lernzeit.
- **whitelabel_configs:** Branding-Daten pro Tenant.

### Migrationen

Drizzle-Kit generiert SQL-Migrationen, die vom Server beim Start (`server/migrate.ts`) automatisch ausgeführt werden.

---

## KI-Integration

Die Plattform nutzt eine Abstraktionsschicht (`server/_core/llm.ts`), um flexibel zwischen Anbietern zu wechseln:
1.  **Anthropic (Claude):** Primär für den KI-Tutor und komplexe Textanalysen.
2.  **Google (Gemini):** Kosteneffizientes Fallback für Standardanfragen.
3.  **Groq:** Hochgeschwindigkeits-Inferenz für Transkriptionen.

---

## Sicherheit

- **Passwörter:** PBKDF2 mit 100k Iterationen (Node built-in crypto).
- **Sessions:** JWT in HttpOnly, Secure, SameSite=Lax Cookies.
- **API:** Typsichere Eingabe-Validierung via Zod in tRPC.
- **CSP:** Strenge Content Security Policy zur Vermeidung von XSS.

---

## Performance

- **Lazy Loading:** Frontend-Chunks werden erst bei Bedarf geladen.
- **DB-Indizes:** Optimierte Abfragen auf häufig genutzten Spalten (`userId`, `moduleId`).
- **Compression:** Gzip/Brotli Kompression für alle HTTP-Antworten.
