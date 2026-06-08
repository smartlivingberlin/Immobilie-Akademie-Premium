# B2B Smoke-Test — Schritt für Schritt (Alisad)

**Voraussetzungen:** Stripe **Testmodus**, `STRIPE_PRICE_B2B_STARTER` und `STRIPE_PRICE_B2B_PROFESSIONAL` in Railway gesetzt.

---

## Phase A — Vorbereitung (WSL)

```bash
cd /mnt/c/Users/Lenovo/Immobilie-Akademie-Premium
curl -s https://immobilien-akademie-smart.de/api/health | jq '{ok, db}'
```

Erwartung: `"ok": true`

### Phase A2 — Komplett per CLI (ohne Browser)

**Voraussetzung:** Admin-Passwort gesetzt (`/forgot-password` falls nach Stripe-Kauf noch keins existiert).

```bash
export B2B_ADMIN_EMAIL="alisadgadyri38@gmail.com"
read -s B2B_ADMIN_PASSWORD && export B2B_ADMIN_PASSWORD
pnpm run ops:b2b-team-smoke
```

Optional zweites Konto für Einlösung mit Login:

```bash
export B2B_MEMBER_EMAIL="team-test@example.com"
export B2B_MEMBER_PASSWORD="Test2026!"
pnpm run ops:b2b-team-smoke
```

Ohne `B2B_MEMBER_*` wird der Code als Gast-Session eingelöst (Schritt 7).

---

## Phase B — Checkout (Browser)

| Schritt | Wo | Was |
|--------|-----|-----|
| 1 | Browser | Einloggen (Magic-Link / Testkonto) |
| 2 | `/fuer-maklerbueros` | **Starter** oder **Professional** wählen |
| 3 | Dialog | Firmenname z. B. `Test Makler GmbH` |
| 4 | Stripe Checkout | Karte `4242 4242 4242 4242`, `12/34`, CVC `123` |
| 5 | Redirect | `/b2b-einrichtung?b2b=1` |

**Keys einfügen?** Nein — nur Testkarte im Stripe-Formular.

---

## Phase C — Onboarding-Wizard

| Schritt | Seite | Erwartung |
|--------|-------|-----------|
| 1 | Willkommen | „Tenant wird eingerichtet…“ → grün |
| 2 | Branding | Firmenname, Farbe `#2563eb`, Willkommenstext speichern |
| 3 | Team | Team-Code generieren → Code kopieren |

Optional: Logo hochladen (max. 2 MB).

---

## Phase D — Team-Code testen

1. **Zweites Konto** oder Inkognito + Magic-Link
2. `/code-einloesen` → kopierten Team-Code einlösen
3. Dashboard → Module aus B2B-Plan sichtbar

---

## Phase E — Verifikation (WSL, optional)

Nach Login-Cookie:

```bash
# Cookie aus Browser exportieren oder Magic-Link:
# curl -c cookies.txt "https://immobilien-akademie-smart.de/api/auth/magic?secret=..."

curl -s -b cookies.txt https://immobilien-akademie-smart.de/api/b2b/onboarding/status | jq .
```

Erwartung: `hasTenant: true`, `completed: true` nach Branding.

---

## Phase F — Stripe-Webhook prüfen

`/admin/stripe-live` → letztes Event nach B2B-Kauf (Typ `checkout.session.completed` oder `invoice.paid` bei Abo).

---

## Häufige Fehler

| Symptom | Ursache | Fix |
|---------|---------|-----|
| Checkout 401 | Nicht eingeloggt | Magic-Link / Login |
| Kein Tenant nach Kauf | Webhook fehlgeschlagen | `whsec_` in Railway prüfen |
| Team-Code ungültig | Falscher Tenant / abgelaufen | Neuen Code in Schritt Team generieren |

---

*Siehe auch: [EXTERNAL_OPS_CHECKLIST.md](./EXTERNAL_OPS_CHECKLIST.md)*
