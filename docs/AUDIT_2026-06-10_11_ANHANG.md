# Teil 11 — Verifikationsdaten für den Architekten

**Erstellt:** 2026-06-10T09:37Z

---

## 11.1 Live-Daten

### HEAD Commit

```
main: 599a0b1 feat(verwalter): P2 Vorlagen, KI-Brief, Objekte (#171)
workspace: 1e66700 feat(verwalter): Chat-Buchungsvorschlag + Rechenpraxis-Verwalter-Links
```

### Health-Check

```bash
curl -sS https://immobilien-akademie-smart.de/api/health
```

```json
{"ok":true,"db":"connected","latencyMs":429,"ts":"2026-06-10T09:36:25.903Z","migrations":{"pending":0,"total":45,"lastApplied":"add-indexes.sql"}}
```

### HTTPS-Headers (Auszug)

```bash
curl -sSI https://immobilien-akademie-smart.de/
```

```
HTTP/2 200
server: railway-edge
x-railway-edge: railway/us-east4-eqdc4a
strict-transport-security: max-age=31536000; includeSubDomains
content-security-policy: default-src 'self';script-src 'self' 'unsafe-inline' https://js.stripe.com;...
permissions-policy: camera=(), microphone=(), geolocation=(), payment=(self "https://js.stripe.com")
cross-origin-opener-policy: same-origin
cross-origin-resource-policy: same-origin
last-modified: Wed, 10 Jun 2026 08:10:15 GMT
```

### Stripe Products API

**unverifiziert** — erfordert `curl https://immobilien-akademie-smart.de/api/stripe/products` (öffentlich laut Code `stripe.ts:259`).

```bash
curl -sS https://immobilien-akademie-smart.de/api/stripe/products | head -c 2000
```

*(Architekt soll selbst ausführen — Ergebnis nicht in diesem Snapshot)*

---

## 11.2 Schema-Übersicht

### Tabellen (drizzle/schema.ts)

| # | Tabelle | schema.ts Zeile |
|---|---------|-----------------|
| 1 | users | 8 |
| 2 | spaced_repetition | 36 |
| 3 | whitelabel_configs | 58 |
| 4 | chat_conversations | 87 |
| 5 | chat_messages | 98 |
| 6 | video_tutorials | 108 |
| 7 | video_progress | 127 |
| 8 | exam_sessions | 146 |
| 9 | exam_questions | 166 |
| 10 | exam_weak_topics | 184 |
| 11 | certificates | 196 |
| 12 | question_bank | 214 |
| 13 | learning_logs | 234 |
| 14 | user_sessions | 249 |
| 15 | activity_heartbeats | 263 |
| 16 | exam_audit_log | 273 |
| 17 | feedback | 285 |
| 18 | complaints | 297 |
| 19 | consent_log | 312 |
| 20 | avv_agreements | 332 |
| 21 | otp_tokens | 343 |
| 22 | auth_credentials | 353 |
| 23 | access_codes | 362 |
| 24 | password_reset_tokens | 375 |
| 25 | open_questions | 384 |
| 26 | open_answers | 402 |

**Zusätzliche Tabellen nur in Migrationen:** monitoring_log, pending_purchases, referral_rewards, partner_payout_ledger, partner_connect_accounts, schema_migrations, trial_leads, presentation_codes, glossar_terms, portal_settings, etc.

### Row-Counts

**Nicht verfügbar** — Architekt: `SELECT table_name, table_rows FROM information_schema.tables WHERE table_schema = DATABASE();`

---

## 11.3 Test-Outputs

### Vitest (2026-06-10, Branch `verwalter-chat-buchung`)

```
Test Files  81 passed (81)
     Tests  213 passed (213)
  Duration  4.88s
```

### TypeScript

```bash
npx tsc --noEmit --skipLibCheck
# Exit code: 0 (keine Ausgabe = 0 errors)
```

### Playwright Smoke

**Nicht in diesem Lauf ausgeführt** — letzter bekannter Stand 08.06.: 10 E2E grün laut `EXTERNAL_OPS_CHECKLIST.md`.

```bash
pnpm run test:e2e:smoke  # Architekt ausführen
```

---

## 11.4 Deployment-Evidenz

| Feld | Wert |
|------|------|
| Letzter Deploy | 2026-06-10 ~08:10 UTC (last-modified Header) |
| Build-Dauer | **unverifiziert** |
| Image-Größe | **unverifiziert** |
| Logs 24h | **unverifiziert** — Railway Dashboard |

---

## 11.5 Externe Tool-Zustandsinfo

**Alle unverifiziert — Architekt muss selbst prüfen:**

| Tool | URL | Erwartung laut Briefing |
|------|-----|------------------------|
| internet.nl Web | https://internet.nl/site/immobilien-akademie-smart.de/ | IPv6 Failed |
| internet.nl Mail | https://internet.nl/mail/immobilien-akademie-smart.de/ | 63%, IPv6 Failed |
| PageSpeed | https://pagespeed.web.dev/ | — |
| SSL Labs | https://www.ssllabs.com/ssltest/ | — |
| Mozilla Observatory | https://observatory.mozilla.org/ | — |
| Snyk Headers | — | — |

---

## 11.6 Migrations-Liste (45 Dateien)

```
0000_known_riptide.sql … 0042_ledger_stripe_transfer.sql, add-indexes.sql
```

Vollständige Liste: `ls drizzle/migrations/`

---

## 11.7 Verwalter File-Store Pfade (nicht in MySQL)

```
data/verwalter-objekte/{userId}.json
data/verwalter-vorgaenge/{userId}.json   # Branch only
data/verwalter-buchungen/{userId}.json   # Branch only
```

**Beleg:** `server/verwalterObjektStore.ts`, `verwalterVorgangStore.ts`, `verwalterBuchungStore.ts`

---

*Ende des Architekt-Audits. Index: [AUDIT_2026-06-10_INDEX.md](./AUDIT_2026-06-10_INDEX.md)*
