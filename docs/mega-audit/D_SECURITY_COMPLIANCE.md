# Teil D — Security & Compliance (technisch)

**Rolle:** Security-Engineer + DSGVO-Experte  
**Stand:** 2026-06-11

---

## D1. OWASP-Basis-Check

### `pnpm audit`
✅ 0 vulnerabilities (2026-06-11)

### SQL-Injection-Stichprobe
`grep '`SELECT|`INSERT' server/*.ts` — Treffer nutzen **Parameterized Queries** mit `?` Platzhaltern.

Beispiel ✅: `server/ownerRoute.ts:531` — `UPDATE users SET ... WHERE email = ?`

⚠️ String-Interpolation in SQL-Template nur für **Tabellennamen/Schema-Checks** (`information_schema`), nicht für User-Input.

### XSS — `dangerouslySetInnerHTML`

| Datei | Sanitized? |
|-------|------------|
| `client/src/components/AIAssistant.tsx:355` | ✅ `DOMPurify.sanitize()` |
| `client/src/components/ui/chart.tsx:81` | ⚠️ Recharts-intern — prüfen |

### `npx retire`
🔍 **Nicht ausgeführt** — AUSSTEHEND

---

## D2. Auth & Session-Security

### Cookie-Flags

✅ Session-Cookies: `httpOnly: true` — `server/authCookies.ts:13`  
✅ `secure` + `sameSite` via `getSessionCookieOptions` — `server/_core/cookies.ts:43-46`  
⚠️ Dev: `sameSite: "none"` wenn nicht production — `cookies.ts:45`

### Passwort-Hashing

✅ PBKDF2-SHA256, **100.000 Iterationen**, 64-byte Key — `server/_core/auth-local.ts:22-37`  
(Nicht bcrypt/argon2 — für 2026 noch akzeptabel, Argon2id wäre Best Practice)

### Rate-Limiting

✅ Aktiv auf: Login, Register, AI, Trial, Password-Reset — `server/_core/index.ts:119-148`  
✅ Owner 2FA resend — `server/ownerRoute.ts:14`

| Endpoint-Gruppe | Limiter |
|-----------------|---------|
| `/api/auth/login` | `loginLimiter` |
| `/api/ai/*` | `aiLimiter` |
| `/api/auth/register` | `registerLimiter` |
| `/api/auth/forgot-password` | `resetLimiter` |

---

## D3. DSGVO-Vollständigkeit

### GDPR-Delete Coverage (`server/gdpr-delete-coverage.test.ts`)

✅ Enthält: spacedRepetition, videoProgress, pending_purchases, trial_leads, monitoring_log, …  
✅ Verwalter: `deleteVerwalterUserData` — objekte, vorgaenge, buchungen, events, freigaben

⚠️ **Test-Lücke:** `verwalter_inbox_messages` nicht in Test-Assertion (`gdpr-delete-coverage.test.ts:36-44`), aber ✅ **im Cleanup-Code** (`verwalterGdprCleanup.ts:11`)

### Cookie-Banner / TTDSG

Stichprobe: `client/src/components/CookieConsent.tsx` existiert.  
🔍 Ob Tracking **vor** Consent blockiert — Code-Review nötig (`grep plausible/gtag` in `main.tsx`).

### AVV-Dokumentation

🔍 **UNVERIFIZIERT** ob AVVs für Stripe, Resend, Anthropic, Google, Groq, ElevenLabs, R2, Railway in `docs/` vollständig vorliegen.

---

## D4. CSP & Security-Header

### Live-Header (2026-06-11)

```
strict-transport-security: max-age=31536000; includeSubDomains
content-security-policy: ... script-src 'self' 'unsafe-inline' https://js.stripe.com ...
```

| Header | Status |
|--------|--------|
| HSTS | ⚠️ ohne `preload` |
| CSP script-src | ❌ `unsafe-inline` |
| CSP style-src | ❌ `unsafe-inline` |
| Third-Party | Stripe.js, Plausible, Sentry erlaubt |

**Inline-Ursachen:** Vite/React inline styles; Stripe.js Third-Party.

Externe Prüfung: https://securityheaders.com/?q=immobilien-akademie-smart.de (Alisad/Claude)

---

## D5. Backup-Vollständigkeit

### MySQL → R2
Workflow: `.github/workflows/mysql-backup-r2.yml` — **Full-DB-Dump** (kein verwalter-spezifischer Filter nötig wenn komplett).

### Restore-Test
🔍 **UNVERIFIZIERT** — `docs/RUNBOOK_BACKUP_RESTORE.md` existiert; ob jemals erfolgreich durchgeführt: nur Alisad.

### Verwalter-Daten
✅ Seit #181 in MySQL (`verwalter_objekte`, `vorgaenge`, `buchungen`, `events`, `freigaben`, `inbox`) — im Full-Backup enthalten.

---

*Weiter: [C_KI_SYSTEME.md](./C_KI_SYSTEME.md)*
