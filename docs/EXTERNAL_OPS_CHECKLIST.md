# Externe Ops-Checkliste — nur Alisad

**Stand:** 09.06.2026 · Master-Audit grün (Vitest 135, API 36, E2E 10)  
Alles hier erfordert Zugang zu Railway, Domain-Provider (UDAG), Resend, Stripe oder GitHub.

---

## Priorität 0 — E-Mail-Stack (P0, blockiert PR #147)

**Internet.nl Mail-Test: 63 %** — PR #147 (E-Mail-Verifikation) **nicht deployen** bis &gt; 90 %.

| # | Aufgabe | Copy-Paste / Hinweis | Erledigt |
|---|---------|----------------------|----------|
| 0a | **SPF Root reparieren** | Ersetze TXT: `v=spf1 include:_smtp.udag.de include:amazonses.com -all` — **entferne** `include:_spf.resend.com` (NXDOMAIN = permerror) | ☐ |
| 0b | **SPF `send`-Subdomain** | TXT auf `send`: `v=spf1 include:amazonses.com -all` | ☐ |
| 0c | **DMARC stufenweise** | Phase A: `v=DMARC1; p=none; pct=100; rua=mailto:info@immobilien-akademie-smart.de` → später `p=quarantine; pct=100` → Ziel `p=reject` | ☐ |
| 0d | **DKIM prüfen** | `dig TXT resend._domainkey.immobilien-akademie-smart.de` — Resend-Dashboard „verified" | ☐ |
| 0e | **Re-Test** | [internet.nl/mail](https://internet.nl/mail/immobilien-akademie-smart.de/) · [MXToolbox SPF](https://mxtoolbox.com/SuperTool.aspx?action=spf%3aimmobilien-akademie-smart.de) | ☐ |

**Nicht beeinflussbar (Provider):** IPv6/DNSSEC/DANE auf UDAG-MX (`mx00/mx01.udag.de`) — dokumentiert in [RISIKOREGISTER.md](./RISIKOREGISTER.md) R-21.

## Priorität 1 — Diese Woche

| # | Aufgabe | Anleitung | Erledigt |
|---|---------|-----------|----------|
| 1 | **MySQL Backup** | `pnpm run db:backup` | ✅ |
| 2 | **Migration Ledger backfill** | Nur wenn `pending > 0` — live ist `0` | ⏭️ SKIP |
| 3 | **Stripe Test** — 18 Price-IDs + Webhook | `pnpm run stripe:seed-prices` · [STRIPE_LIVE_GO_LIVE.md](./STRIPE_LIVE_GO_LIVE.md) | ✅ Test |
| 4 | **R2 Restore-Test** | [R2_ACTIVATION_CHECKLIST.md](./R2_ACTIVATION_CHECKLIST.md) · `pnpm run ops:r2-checklist` | ☐ |
| 5 | **Railway MySQL FAILED** | [RAILWAY_MYSQL_OPS.md](./RAILWAY_MYSQL_OPS.md) | ☐ |
| 6 | **PR #72 schließen** | GitHub → Close | ✅ |
| 7 | **DNS CAA Records** | `0 issue "letsencrypt.org"` + `0 iodef "mailto:alisadgadyri38@gmail.com"` | ☐ |
| 8 | **HSTS Preload deployen** | PR #151 mergen → `curl -sI` muss `preload` zeigen · hstspreload.org erst nach 1 Monat | ☐ |

## Priorität 2 — B2B Go-Live

| # | Aufgabe | Hinweis | Erledigt |
|---|---------|---------|----------|
| 7 | B2B Price-IDs in Railway | In 18er-Set enthalten | ✅ |
| 8 | Testkauf Starter/Professional | [B2B_SMOKE_TEST.md](./B2B_SMOKE_TEST.md) · CLI: `pnpm run ops:b2b-team-smoke` | ✅ CLI |
| 9 | Post-Checkout Wizard | `/b2b-einrichtung?b2b=1` | ☐ |
| 10 | Team-Code einlösen | `/code-einloesen` · TEAM-BOBOGMBH1 getestet | ✅ |

## Priorität 3 — Stripe Live (nach B2B-Test)

| # | Aufgabe | Hinweis | Erledigt |
|---|---------|---------|----------|
| 11 | Live Price-IDs | `stripe:seed-prices` mit `sk_live_` | ☐ |
| 12 | Live Keys + Webhook | [STRIPE_LIVE_GO_LIVE.md](./STRIPE_LIVE_GO_LIVE.md) | ☐ |
| 13 | Live-Testkauf | Kleiner Betrag, echte Karte | ☐ |

## Priorität 4 — Security & Compliance

| # | Aufgabe | Hinweis | Erledigt |
|---|---------|---------|----------|
| 14 | `OWNER_MAGIC_CODE` rotieren | Nach Sichtbarkeit in Chat/Logs | ☐ |
| 15 | `INSPECT_JWT_SECRET` | min. 32 Zeichen in Railway | ☐ |
| 16 | DMARC `p=reject` | DNS — erst nach Phase A/B in Priorität 0 | ☐ |
| 17 | Gewerbeschein Impressum | Berlin ~26 EUR | ☐ |
| 18 | DSGVO-AVVs | Processor-Verträge | ☐ |

## Priorität 5 — Nach Go-Live

| # | Aufgabe | Hinweis | Erledigt |
|---|---------|---------|----------|
| 19 | `STRIPE_E2E_ENABLED=true` (CI) | + `MAGIC_LINK_SECRET` | ☐ |
| 20 | R2 Cron aktivieren | Nach Restore-Test | ☐ |
| 21 | `PARTNER_PAYOUT_CRON_ENABLED=true` | Quartals-Ledger | ☐ |

---

## DNS-Schnellcheck (E-Mail + CAA)

```bash
dig TXT immobilien-akademie-smart.de +short
dig TXT _dmarc.immobilien-akademie-smart.de +short
dig TXT resend._domainkey.immobilien-akademie-smart.de +short
dig TXT send.immobilien-akademie-smart.de +short
dig CAA immobilien-akademie-smart.de +short
host -t TXT _spf.resend.com   # NXDOMAIN = SPF-Bug bestätigt
```

## Schnell-Verifikation (WSL Copy-Paste)

```bash
pnpm run ops:health

# Stripe Webhook Secret setzen (whsec aus Dashboard):
pnpm run stripe:setup-webhook -- --webhook-id=we_1T97TbJV2Q8pgfvupUp7Nsyt --whsec=whsec_… --railway-apply

# B2B E2E (CI / mit MAGIC_LINK_SECRET):
pnpm run test:e2e:b2b

# R2 Secrets-Liste:
pnpm run ops:r2-checklist
```

**Health erwartet:** `{ "ok": true, "db": "connected", "migrations": { "pending": 0 } }`

**B2B Smoke:** [B2B_SMOKE_TEST.md](./B2B_SMOKE_TEST.md)

---

*Code: main · Cases: [CASE_MANAGEMENT_20260607.md](./CASE_MANAGEMENT_20260607.md)*
