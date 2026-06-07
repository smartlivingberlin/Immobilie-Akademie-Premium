# 🚀 Deployment-Guide — Immobilien Akademie Smart

Dieser Guide beschreibt den vollständigen Deployment-Prozess auf Railway sowie alle notwendigen Konfigurationsschritte.

---

## Inhaltsverzeichnis

- [Überblick](#überblick)
- [Voraussetzungen](#voraussetzungen)
- [Erstes Deployment (Setup)](#erstes-deployment-setup)
- [Umgebungsvariablen auf Railway](#umgebungsvariablen-auf-railway)
- [Datenbank-Setup](#datenbank-setup)
- [Migrationen](#migrationen)
- [Auto-Deploy (CI/CD)](#auto-deploy-cicd)
- [Healthcheck](#healthcheck)
- [Stripe-Konfiguration](#stripe-konfiguration)
- [Rollback](#rollback)
- [Monitoring & Logs](#monitoring--logs)
- [Checkliste vor Go-Live](#checkliste-vor-go-live)

---

## Überblick

```
GitHub (main branch)
       │
       │  Push → Auto-Deploy
       ▼
Railway Build (Nixpacks)
  1. pnpm install
  2. pnpm build
     ├── vite build        → dist/public/ (React SPA)
     └── esbuild           → dist/index.js (Express Server)
       │
       ▼
Railway Deploy
  node dist/index.js
  ├── Migrationen laufen automatisch
  ├── Server startet auf PORT (Railway setzt automatisch)
  └── Healthcheck: GET /api/health
```

**Live-URL:** https://immobilie-akademie-production.up.railway.app  
**GitHub:** https://github.com/smartlivingberlin/Immobilie-Akademie (Branch: `main`)

---

## Voraussetzungen

- Railway-Account (railway.app)
- GitHub-Repository verbunden mit Railway
- MySQL-Service in Railway (oder externer MySQL-Host)
- Stripe-Account (für Zahlungen)

---

## Erstes Deployment (Setup)

### 1. Railway-Projekt erstellen

```
Railway Dashboard → New Project → Deploy from GitHub repo
→ Repository auswählen: smartlivingberlin/Immobilie-Akademie
→ Branch: main
```

### 2. MySQL-Service hinzufügen

```
Railway Dashboard → New Service → Database → MySQL
→ Service wird automatisch erstellt
→ DATABASE_URL wird als Variable verfügbar
```

### 3. Umgebungsvariablen setzen

```
Railway Dashboard → Service → Variables → Raw Editor
```

Mindest-Konfiguration (Server startet sonst nicht):

```env
DATABASE_URL=${{MySQL.DATABASE_URL}}
JWT_SECRET=<zufälliger-string-min-32-zeichen>
STRIPE_SECRET_KEY=sk_test_<dein-key>
```

> **Tipp:** `DATABASE_URL` kann direkt auf den Railway MySQL-Service referenzieren: `${{MySQL.DATABASE_URL}}`

### 4. Deploy auslösen

```
Railway Dashboard → Service → Deploy → Deploy Now
```

Oder: Push auf `main` → Deploy startet automatisch.

---

## Umgebungsvariablen auf Railway

### Pflichtfelder

| Variable | Beschreibung | Wo besorgen |
|----------|-------------|-------------|
| `DATABASE_URL` | MySQL Connection String | Railway MySQL Service → Variables |
| `JWT_SECRET` | JWT-Signing-Secret (min. 32 Zeichen) | Selbst generieren: `openssl rand -hex 32` |
| `STRIPE_SECRET_KEY` | Stripe Secret Key | dashboard.stripe.com → Developers → API Keys |

### KI-Features

| Variable | Beschreibung | Wo besorgen |
|----------|-------------|-------------|
| `ANTHROPIC_API_KEY` | Claude Haiku (KI-Tutor) | console.anthropic.com |
| `GOOGLE_AI_API_KEY` | Gemini Flash (Fallback) | aistudio.google.com |
| `GROQ_API_KEY` | Groq (weiterer Fallback) | console.groq.com |

### Zahlungen

| Variable | Beschreibung |
|----------|-------------|
| `STRIPE_SECRET_KEY` | `sk_test_...` (Test) oder `sk_live_...` (Produktion) |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Webhooks → Signing Secret |
| `VITE_STRIPE_PUBLIC_KEY` | `pk_test_...` oder `pk_live_...` |

### E-Mail

| Variable | Beschreibung |
|----------|-------------|
| `GMAIL_USER` | Gmail-Adresse für Passwort-Reset-Mails |
| `GMAIL_PASSWORD` | Gmail App-Passwort (nicht das normale Passwort!) |

> **Gmail App-Passwort:** Google Account → Sicherheit → 2-Faktor-Authentifizierung → App-Passwörter

### Monitoring (optional)

| Variable | Beschreibung |
|----------|-------------|
| `SENTRY_DSN` | Sentry Error Monitoring (sentry.io) |
| `VITE_SENTRY_DSN` | Sentry für Frontend |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics (`G-XXXXXXXXXX`) |
| `ELEVENLABS_API_KEY` | Text-to-Speech für Vorlesen-Funktion |

### Admin

| Variable | Beschreibung |
|----------|-------------|
| `ADMIN_PASSWORD` | Initiales Admin-Passwort (min. 16 Zeichen) |
| `OWNER_MAGIC_CODE` | Owner-Zugang für Kontrollpanel |

---

## Datenbank-Setup

### Railway MySQL Service

```
Railway Dashboard → New Service → Database → MySQL
```

Der Service stellt automatisch folgende Variable bereit:
- `DATABASE_URL` — vollständiger Connection String

### Verbindung testen (lokal)

```bash
# MySQL CLI
mysql -u root -p -h turntable.proxy.rlwy.net -P 40815 railway

# Oder mit dem Connection String
mysql "mysql://root:password@turntable.proxy.rlwy.net:40815/railway"
```

### Tabellen-Übersicht

| Tabelle | Beschreibung |
|---------|-------------|
| `users` | Nutzerkonten (Rollen: user, admin, trainer) |
| `question_bank` | 814 Prüfungsfragen (M1–M5) |
| `exam_sessions` | Prüfungssitzungen mit Ergebnissen |
| `exam_questions` | Einzelne Fragen pro Prüfungssitzung |
| `exam_weak_topics` | Wissenslücken-Analyse |
| `chat_conversations` | KI-Tutor-Gespräche |
| `chat_messages` | Einzelne Nachrichten |
| `certificates` | Ausgestellte Zertifikate |
| `video_tutorials` | Video-Metadaten |
| `whitelabel_configs` | White-Label-Mandanten |
| `learning_logs` | Lernfortschritt (AZAV-konform) |
| `spaced_repetition` | Spaced-Repetition-Daten |
| `consent_log` | DSGVO Cookie-Consent-Protokoll |

---

## Migrationen

### Automatisch beim Start

Migrationen laufen **automatisch** beim Server-Start via `server/migrate.ts`. Keine manuelle Aktion nötig.

```
[DB] Migration OK: 0000_known_riptide.sql
[DB] Migration OK: 0001_cold_zeigeist.sql
...
[DB] Alle Migrationen abgeschlossen
```

Bereits ausgeführte Migrationen werden übersprungen (idempotent):
```
[DB] Migration skip (exists): 0000_known_riptide.sql
```

### Neue Migration erstellen

```bash
# 1. Schema in drizzle/schema.ts anpassen
# 2. Migration generieren (lokal, mit DATABASE_URL in .env)
npx drizzle-kit generate

# 3. Generierte .sql-Datei in drizzle/ committen
git add drizzle/
git commit -m "feat: add new_table migration"
git push origin main
# → Railway deployed automatisch, Migration läuft beim Start
```

### Migration manuell ausführen (Notfall)

```bash
# Direkt auf der Railway-Datenbank
mysql "mysql://..." < drizzle/0016_my_migration.sql
```

---

## Auto-Deploy (CI/CD)

### Konfiguration

Railway ist so konfiguriert, dass jeder Push auf `main` automatisch deployed:

```
railway.json:
{
  "build": { "builder": "NIXPACKS" },
  "deploy": {
    "startCommand": "node dist/index.js",
    "healthcheckPath": "/api/health",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

```
nixpacks.toml:
[phases.setup]
nixPkgs = ["nodejs_22"]

[start]
cmd = "node dist/index.js"
```

### Build-Prozess

```bash
# Was Railway ausführt:
pnpm install                    # Abhängigkeiten
pnpm build                      # = vite build + esbuild
node dist/index.js              # Start
```

Der Build-Befehl aus `package.json`:
```
vite build && esbuild server/_core/index.ts \
  --platform=node --packages=external --bundle \
  --format=esm --outdir=dist
```

### Deploy-Status prüfen

```
Railway Dashboard → Service → Deployments
→ Grün = erfolgreich
→ Rot = fehlgeschlagen → Logs prüfen
```

---

## Healthcheck

Railway prüft regelmäßig den Healthcheck-Endpunkt:

```
GET /api/health
→ 200 OK
→ { "ok": true, "ts": "2026-03-24T12:00:00.000Z" }
```

Konfiguriert in `railway.json`:
```json
"healthcheckPath": "/api/health"
```

Wenn der Healthcheck fehlschlägt, startet Railway den Service automatisch neu (`restartPolicyType: ON_FAILURE`).

---

## Stripe-Konfiguration

### Test-Modus (Entwicklung)

```env
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

Testkarte: `4242 4242 4242 4242` (beliebiges Datum, beliebiger CVC)

### Live-Modus (Produktion)

```env
STRIPE_SECRET_KEY=sk_live_...
VITE_STRIPE_PUBLIC_KEY=pk_live_...
```

> **Wichtig:** Vor Live-Schaltung AGB von einem Anwalt prüfen lassen und ZFU-Zulassung beantragen.

### Webhook einrichten

```
Stripe Dashboard → Developers → Webhooks → Add endpoint
→ URL: https://immobilie-akademie-production.up.railway.app/api/stripe/webhook
→ Events: checkout.session.completed
→ Signing Secret kopieren → STRIPE_WEBHOOK_SECRET in Railway setzen
```

### Lokal testen

```bash
# Stripe CLI installieren
brew install stripe/stripe-cli/stripe

# Webhook lokal weiterleiten
stripe listen --forward-to localhost:8080/api/stripe/webhook

# Test-Event auslösen
stripe trigger checkout.session.completed
```

---

## Rollback

### Zu vorherigem Deploy zurückkehren

```
Railway Dashboard → Service → Deployments
→ Alten Deploy auswählen → Redeploy
```

### Über Git

```bash
# Letzten Commit rückgängig machen
git revert HEAD
git push origin main
# → Railway deployed automatisch den Revert
```

---

## Monitoring & Logs

### Railway Logs

```
Railway Dashboard → Service → Deployments → Logs (Live)
```

### Wichtige Log-Präfixe

| Präfix | Bedeutung |
|--------|-----------|
| `[DB]` | Datenbankoperationen und Migrationen |
| `[Auth]` | Login/Logout/Registrierung |
| `[Stripe]` | Zahlungsereignisse |
| `[Stripe Webhook]` | Webhook-Verarbeitung |
| `[CRITICAL]` | Unbehandelte Fehler (sofort handeln!) |
| `[WARN]` | Optionale Konfiguration fehlt |
| `[Sentry]` | Error Monitoring Status |

### Sentry (optional)

```
sentry.io → Neues Projekt → Node.js
→ DSN kopieren → SENTRY_DSN in Railway setzen
```

Fehler werden automatisch erfasst und kategorisiert.

---

## Backup & Restore

Vor jeder MySQL-Migration oder Railway-Redeploy **manuell dumpen**:

```bash
pnpm run db:backup
```

Ausführliche Anleitung: [docs/RUNBOOK_BACKUP_RESTORE.md](docs/RUNBOOK_BACKUP_RESTORE.md)  
Automatisierung (R2): [docs/BACKUP_AUTOMATION_PLAN.md](docs/BACKUP_AUTOMATION_PLAN.md)

GitHub Action (manuell auslösbar, Secrets erforderlich):

```bash
# .github/workflows/mysql-backup-r2.yml — workflow_dispatch in GitHub Actions
```

**Inspect-Links (Owner-Demos):** `INSPECT_JWT_SECRET` in Railway setzen (min. 32 Zeichen).  
Inspect startet auf `/modul/1` — KI-Tutor ist im Demo-Modus deaktiviert.

---

## Checkliste vor Go-Live

### Technisch

- [ ] `DATABASE_URL` auf Railway MySQL gesetzt
- [ ] `JWT_SECRET` gesetzt (min. 32 Zeichen, zufällig)
- [ ] `INSPECT_JWT_SECRET` gesetzt (Owner-Inspect-Links)
- [ ] MySQL-Backup getestet (`pnpm run db:backup`)
- [ ] `STRIPE_SECRET_KEY` auf Live-Key umgestellt (`sk_live_...`)
- [ ] `VITE_STRIPE_PUBLIC_KEY` auf Live-Key umgestellt (`pk_live_...`)
- [ ] `STRIPE_WEBHOOK_SECRET` gesetzt und Webhook in Stripe konfiguriert
- [ ] `ANTHROPIC_API_KEY` gesetzt (KI-Tutor)
- [ ] E-Mail-Versand getestet (Passwort-Reset)
- [ ] Healthcheck erreichbar: `GET /api/health`
- [ ] `pnpm build` lokal erfolgreich
- [ ] Alle Tests grün: `pnpm test`

### Rechtlich

- [ ] AGB von Anwalt geprüft
- [ ] ZFU-Zulassung beantragt (für Fernunterricht)
- [ ] Impressum vollständig (echte Adresse, Telefon)
- [ ] Datenschutzerklärung aktuell
- [ ] Cookie-Consent funktioniert

### Domain

- [ ] Domain registriert (immobilien-akademie-smart.de)
- [ ] DNS auf Railway zeigt
- [ ] SSL-Zertifikat aktiv (Railway macht das automatisch)
- [ ] CORS in `server/_core/index.ts` auf exakte Domain beschränken

### Inhalt

- [ ] Admin-Passwort geändert (nicht Standard)
- [ ] Demo-Nutzer entfernt oder deaktiviert
- [ ] Alle 5 Module inhaltlich geprüft
- [ ] Preise in Stripe korrekt konfiguriert
