# Empfehlungsprogramm — Konzept & Umsetzung

**Stand:** Juni 2026

## Ziel

Verifizierbare Weiterempfehlungen (Absolventen, Partner, Social Media, Google Reviews) mit messbarem Reward — ohne Lifetime-Zugang zu verschenken.

## Aktive Rewards (MVP)

| Aktion | Belohnung |
|--------|-----------|
| Geworbener kauft erstes Modul | **Empfehler:** +30 Tage Zugang |
| Geworbener kauft erstes Modul | **Geworbener:** +14 Tage Zugang |

Technisch: `referralCode` pro User, `referredByUserId` bei Registrierung, Auslösung im Stripe-Webhook.

## Geplante Erweiterungen

- **Partner-Codes** mit Provisionsauszahlung (manuell / Stripe Connect)
- **Tool-Gutscheine:** Rechenpraxis 30 Tage, KI-Kontingent, Weiterbildungsnachweis
- **Social Proof:** Review-Link → automatischer 7-Tage-Bonus nach Verifizierung
- **Admin-Dashboard** für Referral-Statistiken

## API

- `GET /api/referral/info` — persönlicher Link (auth)
- `POST /api/referral/apply` — Code nachträglich zuordnen (auth)
- Registrierung: `referralCode` im Body von `POST /api/auth/register`

## Migrationen

- `0034_user_access_expires.sql` — `accessExpiresAt`, `referralCode`, `referredByUserId`
- `0035_referral_rewards.sql` — Audit-Tabelle `referral_rewards`
