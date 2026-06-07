# Externe Ops-Checkliste — nur Alisad

**Stand:** 07.06.2026 · Nach PR #124  
Alles hier erfordert Zugang zu Railway, Cloudflare, Stripe oder GitHub — nicht automatisierbar im Code.

---

## Priorität 1 — Diese Woche

| # | Aufgabe | Anleitung | Erledigt |
|---|---------|-----------|----------|
| 1 | **R2 Backup aktivieren** | [R2_ACTIVATION_CHECKLIST.md](./R2_ACTIVATION_CHECKLIST.md) | ☐ |
| 2 | **Restore-Test** nach erstem R2-Dump | [RUNBOOK_BACKUP_RESTORE.md](./RUNBOOK_BACKUP_RESTORE.md) | ☐ |
| 3 | **Stripe Live** — 18 Price-IDs + Live-Keys | `/admin/stripe-live` → Fehlende ENV kopieren | ☐ |
| 4 | **Railway MySQL FAILED** klären | [RAILWAY_MYSQL_OPS.md](./RAILWAY_MYSQL_OPS.md) — Backup zuerst | ☐ |
| 5 | **PR #72 schließen** | GitHub → PR #72 → Close (Audit überholt) | ☐ |

## Priorität 2 — Security & Compliance

| # | Aufgabe | Hinweis | Erledigt |
|---|---------|---------|----------|
| 6 | `OWNER_MAGIC_CODE` rotieren | Nach Sichtbarkeit in Chat/Logs | ☐ |
| 7 | `INSPECT_JWT_SECRET` setzen/prüfen | min. 32 Zeichen in Railway | ☐ |
| 8 | `MAGIC_LINK_SECRET` nur für E2E/CI | GitHub Secret, nicht in Railway prod | ☐ |
| 9 | DMARC `p=reject` | DNS nach Domain-Setup | ☐ |
| 10 | Gewerbeschein im Impressum | Berlin ~26 EUR | ☐ |
| 11 | DSGVO-AVVs abschließen | Processor-Verträge | ☐ |

## Priorität 3 — Nach Go-Live

| # | Aufgabe | Hinweis | Erledigt |
|---|---------|---------|----------|
| 12 | CI Variable `STRIPE_E2E_ENABLED=true` | + `MAGIC_LINK_SECRET` für Live-Checkout-E2E | ☐ |
| 13 | R2 Cron aktivieren | Nach Restore-Test in Workflow | ☐ |
| 14 | `PARTNER_PAYOUT_CRON_ENABLED=true` | Quartals-Ledger | ☐ |
| 15 | Issue #30 schließen | Falls erledigt | ☐ |

---

## Schnell-Verifikation nach Deploy

```bash
# Health inkl. DB
curl -s https://immobilien-akademie-smart.de/api/health | jq .

# Quiz-Guard (muss 403)
curl -s -o /dev/null -w "%{http_code}" https://immobilien-akademie-smart.de/data/all-questions.json

# Stripe-Guards E2E (ohne Secrets)
pnpm run test:e2e:stripe-guards
```

Erwartung Health: `{ "ok": true, "db": "connected", ... }`

---

*Code-Stand: main nach #124 · Case-Register: [CASE_MANAGEMENT_20260607.md](./CASE_MANAGEMENT_20260607.md)*
