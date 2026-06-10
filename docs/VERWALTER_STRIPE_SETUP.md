# Verwalter Tools — Stripe Setup (Runbook)

Produkt: **Verwalter Tools Solo** · 39 €/Monat · Sentinel `vt` in `users.enabledModules`

## 1. Price-ID anlegen

**Option A — Seed-Script (empfohlen)**

```bash
# Testmodus
STRIPE_SECRET_KEY=sk_test_… pnpm run stripe:seed-prices -- --dry-run
STRIPE_SECRET_KEY=sk_test_… pnpm run stripe:seed-prices -- --apply --railway-hints
```

**Option B — Stripe Dashboard**

- Produkt: `Verwalter Tools — WEG-Suite`
- Preis: 39,00 EUR / Monat, recurring
- Lookup-Key (optional): `verwalter_tools_monthly`

## 2. Railway ENV

```env
STRIPE_PRICE_VERWALTER_TOOLS_MONTHLY=price_…
# Beta (Default): frei für alle Login-Nutzer
VERWALTER_TOOLS_GATING=0
```

Nach Go-Live mit Bezahlzwang:

```env
VERWALTER_TOOLS_GATING=1
```

## 3. Webhook

Endpoint: `POST /api/stripe/webhook`

Events: `checkout.session.completed`, `invoice.paid`

Bei `invoice.paid` mit `metadata.type=verwalter_tools` → `processVerwalterToolsSubscription` setzt Sentinel `vt`.

## 4. Checkout testen

1. Einloggen auf `/fuer-verwaltungsbueros`
2. „Abo buchen“ → Stripe Checkout
3. Testkarte: `4242 4242 4242 4242`
4. Erfolg: Redirect `/app/verwalter?subscribed=1`
5. DB: `enabledModules` enthält `vt`

Ohne Login: `POST /api/stripe/verwalter-tools-checkout` → **401**

## 5. QA

```bash
bash scripts/ops/verwalter-qa-pack.sh
# Mit Login optional:
B2B_ADMIN_PASSWORD='…' bash scripts/ops/verwalter-qa-pack.sh
```

## 6. API

| Endpoint | Auth | Beschreibung |
|----------|------|--------------|
| `POST /api/stripe/verwalter-tools-checkout` | Session | Stripe Checkout Session |
| `/api/verwalter/*` | Session + optional Gating | `requireVerwalterAuth` |

Gating nur aktiv wenn `VERWALTER_TOOLS_GATING=1`. Admins haben immer Zugang.
