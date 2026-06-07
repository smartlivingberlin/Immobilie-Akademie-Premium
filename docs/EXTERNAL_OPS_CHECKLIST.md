# Externe Ops-Checkliste — nur Alisad

**Stand:** 07.06.2026 · Nach PR #125 (B2B + Migration Ledger)  
Alles hier erfordert Zugang zu Railway, Cloudflare, Stripe oder GitHub.

---

## Priorität 1 — Diese Woche

| # | Aufgabe | Anleitung | Erledigt |
|---|---------|-----------|----------|
| 1 | **MySQL Backup** | `pnpm run db:backup` oder [R2_ACTIVATION_CHECKLIST.md](./R2_ACTIVATION_CHECKLIST.md) | ☐ |
| 2 | **Migration Ledger backfill** | [MIGRATION_LEDGER.md](./MIGRATION_LEDGER.md) → `db:backfill-migrations --apply` | ☐ |
| 3 | **Stripe Live** — 18 Price-IDs | `/admin/stripe-live` → Fehlende ENV kopieren | ☐ |
| 4 | **R2 Restore-Test** | [RUNBOOK_BACKUP_RESTORE.md](./RUNBOOK_BACKUP_RESTORE.md) | ☐ |
| 5 | **Railway MySQL FAILED** | [RAILWAY_MYSQL_OPS.md](./RAILWAY_MYSQL_OPS.md) | ☐ |
| 6 | **PR #72 schließen** | GitHub → Close (Audit überholt) | ☐ |

## Priorität 2 — B2B Go-Live

| # | Aufgabe | Hinweis | Erledigt |
|---|---------|---------|----------|
| 7 | B2B Price-IDs in Railway | `STRIPE_PRICE_B2B_STARTER`, `STRIPE_PRICE_B2B_PROFESSIONAL` | ☐ |
| 8 | Testkauf Starter/Professional | `/fuer-maklerbueros` → Dialog → Stripe 4242… | ☐ |
| 9 | Post-Checkout Wizard | `/b2b-einrichtung?b2b=1` — Tenant-Polling, Branding, Team-Code | ☐ |
| 10 | Team-Code einlösen | `/code-einloesen` mit generiertem Code testen | ☐ |

## Priorität 3 — Security & Compliance

| # | Aufgabe | Hinweis | Erledigt |
|---|---------|---------|----------|
| 11 | `OWNER_MAGIC_CODE` rotieren | Nach Sichtbarkeit in Chat/Logs | ☐ |
| 12 | `INSPECT_JWT_SECRET` | min. 32 Zeichen in Railway | ☐ |
| 13 | DMARC `p=reject` | DNS | ☐ |
| 14 | Gewerbeschein Impressum | Berlin ~26 EUR | ☐ |
| 15 | DSGVO-AVVs | Processor-Verträge | ☐ |

## Priorität 4 — Nach Go-Live

| # | Aufgabe | Hinweis | Erledigt |
|---|---------|---------|----------|
| 16 | `STRIPE_E2E_ENABLED=true` (CI) | + `MAGIC_LINK_SECRET` | ☐ |
| 17 | R2 Cron aktivieren | Nach Restore-Test | ☐ |
| 18 | `PARTNER_PAYOUT_CRON_ENABLED=true` | Quartals-Ledger | ☐ |

---

## Schnell-Verifikation (Copy-Paste)

```bash
# Health + DB + Migrationen
curl -s https://immobilien-akademie-smart.de/api/health | jq .

# Quiz-Guard (403)
curl -s -o /dev/null -w "%{http_code}\n" https://immobilien-akademie-smart.de/data/all-questions.json

# E2E Guards (lokal/CI)
pnpm run test:e2e:stripe-guards

# Migration Backfill Dry-run (Railway CLI linked)
pnpm run db:backfill-migrations -- --dry-run
```

**Health erwartet:** `{ "ok": true, "db": "connected", "migrations": { "pending": 0, ... } }`

**B2B Smoke (mit Login):**
1. `/fuer-maklerbueros` → Professional → Firmenname im Dialog
2. Stripe Test → Redirect `/b2b-einrichtung?b2b=1`
3. Warten bis Tenant grün → Branding → Team-Code → `/code-einloesen`

---

*Code: main · Cases: [CASE_MANAGEMENT_20260607.md](./CASE_MANAGEMENT_20260607.md)*
