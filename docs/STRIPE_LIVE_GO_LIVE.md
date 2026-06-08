# Stripe Live — Go-Live-Vorbereitung

**Stand:** 08.06.2026  
**Test-Phase abgeschlossen wenn:** `/admin/stripe-live` zeigt 18/18 Price-IDs + Webhook-Health aktiv (Testmodus).

---

## Übersicht: Test → Live

| Schritt | Testmodus (erledigt?) | Livemodus (später) |
|---------|----------------------|-------------------|
| 18 Price-IDs | `pnpm run stripe:seed-prices` mit `sk_test_` | Gleiches Skript mit `sk_live_` |
| Webhook | `we_…` + `whsec_` (Sandbox) | **Neuer** Live-Webhook + neues `whsec_` |
| API Keys | `sk_test_`, `pk_test_` | `sk_live_`, `pk_live_` |
| Testzahlung | Karte 4242… | Kleine echte Zahlung |

**Niemals** Test-`price_`-IDs im Live-Modus verwenden.

---

## Schritt 1 — Live-Preise anlegen (WSL)

```bash
export STRIPE_SECRET_KEY=sk_live_51DEIN_LIVE_KEY
pnpm run stripe:seed-prices -- --apply --output=stripe_prices_live.env
```

Railway (Live-Preise **ersetzen** die Test-Preise):

```bash
while IFS= read -r line; do
  [[ -z "$line" || "$line" =~ ^# ]] && continue
  railway variables --set "$line"
done < stripe_prices_live.env
```

---

## Schritt 2 — Live API Keys (Railway)

| Variable | Wert |
|----------|------|
| `STRIPE_SECRET_KEY` | `sk_live_…` |
| `STRIPE_PUBLISHABLE_KEY` | `pk_live_…` |
| `VITE_STRIPE_PUBLIC_KEY` | `pk_live_…` (gleich wie Publishable) |

```bash
railway variables --set "STRIPE_SECRET_KEY=sk_live_..."
railway variables --set "STRIPE_PUBLISHABLE_KEY=pk_live_..."
railway variables --set "VITE_STRIPE_PUBLIC_KEY=pk_live_..."
```

---

## Schritt 3 — Live-Webhook

1. Stripe Dashboard → **Livemodus** (Schalter oben)
2. Entwickler → Webhooks → Endpunkt hinzufügen:
   - URL: `https://immobilien-akademie-smart.de/api/stripe/webhook`
   - Events: `checkout.session.completed`, `invoice.paid`
3. Signing secret (`whsec_…`) kopieren → Railway:

```bash
railway variables --set "STRIPE_WEBHOOK_SECRET=whsec_LIVE_SECRET"
```

**Hinweis:** Live-`whsec_` ist **anders** als Test-`whsec_`.

---

## Schritt 4 — Verifikation

```bash
sleep 30
curl -s https://immobilien-akademie-smart.de/api/health | jq .
```

Browser: `/admin/stripe-live` → Modus **LIVE**, 18/18, API testen.

---

## Schritt 5 — Kleiner Live-Testkauf

Günstigster Weg: Renewal 5 €/Mo oder kleinstes Modul — **echte Karte**, danach in Stripe Dashboard prüfen.

---

## Checkliste vor Umschaltung

- [ ] MySQL-Backup aktuell (`pnpm run db:backup` oder R2)
- [ ] 18 Live Price-IDs in Railway
- [ ] Live Webhook + `whsec_`
- [ ] `sk_live_` / `pk_live_`
- [ ] Testkauf Live erfolgreich
- [ ] Owner Revenue zeigt Umsatz

---

*Skripte: `pnpm run stripe:seed-prices`, `pnpm run stripe:setup-webhook`*
