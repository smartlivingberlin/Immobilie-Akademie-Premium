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

## S226 — Sandbox- und Marktfreigabe-Gate vor Stripe-Livebetrieb

Diese Gates sind eine **Sperr- und Preflight-Checkliste**. Sie sind **keine Freigabe für echte Zahlungen**.

Bis zur rechtlichen, gewerblichen und operativen Marktfreigabe bleibt Stripe-Livebetrieb gesperrt. Zulässig sind nur Testmodus, Sandbox, Simulation und dokumentierte technische Readiness-Prüfungen.

Ein Live-Testkauf, echter Verkauf oder echte Kundenzahlung darf erst gestartet werden, wenn eine separate Freigabe für Marktstart und Zahlungsbetrieb dokumentiert ist.

| Gate | Pflicht? | Status vor Marktfreigabe | Bedeutung |
|---|---:|---|---|
| Gewerbe-/Marktfreigabe geklärt | Ja | Gesperrt | Ohne rechtliche und operative Freigabe keine echten Verkäufe oder Live-Zahlungen. |
| Test-/Live-Modus eindeutig getrennt | Ja | Offen | Keine Test-Keys, Test-`price_`-IDs oder Test-Webhook-Secrets im späteren Live-Betrieb verwenden. |
| Stripe-Livebetrieb ausdrücklich freigegeben | Ja | Gesperrt | Live-Keys, Live-Webhooks und echte Zahlungen nur in eigenem Freigabe-Track. |
| Live Secret Key geschützt | Ja | Offen | `STRIPE_SECRET_KEY` niemals in Chat, Logs, Screenshots, PRs oder Doku kopieren. |
| Live Publishable Key geprüft | Ja | Offen | Frontend- und Backend-Publishable-Key müssen später zum gleichen Live-Modus gehören. |
| Alle Live Price-IDs gesetzt und geprüft | Ja | Offen | Alle benötigten Abo-, Modul- und Bundle-Price-IDs müssen später in Railway gesetzt und in `/admin/stripe-live` grün sein. |
| Webhook-Signature aktiv | Ja | Offen | `STRIPE_WEBHOOK_SECRET` muss später zum Live-Webhook gehören; Test-`whsec_` ist nicht gültig. |
| Webhook-Events geprüft | Ja | Offen | Mindestens `checkout.session.completed` und `invoice.paid` müssen für den Live-Endpoint konfiguriert sein. |
| Success-/Cancel-URLs geprüft | Ja | Offen | Weiterleitungen müssen später auf die produktive Domain zeigen und dürfen keine alten Railway-/Test-URLs enthalten. |
| Pending-Purchase-Verhalten geprüft | Ja | Offen | Falls Käuferkonto fehlt, muss Pending Purchase sicher gespeichert und später zuordenbar sein. |
| Support-/Refund-Prozess geklärt | Ja | Offen | Vor Live-Zahlung müssen Rückerstattung, Fehlbuchung und Kundensupport intern geklärt sein. |
| Abbruchregel bestätigt | Ja | Offen | Sofort stoppen bei falschem Modus, falscher Domain, fehlendem Webhook, unklarer Freischaltung oder Secret-Leak-Risiko. |

### Bis zur Marktfreigabe erlaubt

- Stripe-Testmodus
- Sandbox-/Simulationsprüfungen
- Read-only Inventar und Doku-Gates
- E2E-Tests ohne echte Kundenzahlung
- Prüfung von ENV-Namen ohne Werte
- Admin-Checklist-Prüfungen ohne Secret-Ausgabe

### Bis zur Marktfreigabe verboten

- echte Zahlung
- echter Verkauf
- echte Kundenzahlung
- Live-Stripe-Umschaltung
- Live-Webhook-Produktivschaltung
- Railway-Variablenwechsel auf Live-Keys
- Stripe-Dashboard-Screenshot mit sensiblen Daten
- Secret-Werte in Terminal, Chat, PR oder Doku
- Checkout-Test mit realem Zahlungsmittel

---

**Wichtig für die folgenden Schritte 1–5:** Diese Schritte sind erst nach separater Markt-, Gewerbe-, Compliance- und Zahlungsbetriebsfreigabe erlaubt. Bis dahin dienen sie nur als spätere Checkliste und dürfen nicht operativ ausgeführt werden.

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

## Schritt 5 — Späterer Live-Testkauf nach separater Freigabe

Günstigster Weg: Renewal 5 €/Mo oder kleinstes Modul — **echte Karte**, danach in Stripe Dashboard prüfen.

---

## Checkliste vor Umschaltung

- [ ] MySQL-Backup aktuell (`pnpm run db:backup` oder R2)
- [ ] 18 Live Price-IDs in Railway
- [ ] Live Webhook + `whsec_`
- [ ] `sk_live_` / `pk_live_`
- [ ] Separater Marktfreigabe-Track dokumentiert
- [ ] Testkauf Live erfolgreich nach Freigabe
- [ ] Owner Revenue zeigt Umsatz

---

*Skripte: `pnpm run stripe:seed-prices`, `pnpm run stripe:setup-webhook`*
