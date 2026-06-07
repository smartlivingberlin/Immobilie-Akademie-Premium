/** Stripe Testmodus — Karten & Smoke-Schritte */

export const STRIPE_TEST_CARD = {
  number: "4242 4242 4242 4242",
  exp: "12/34",
  cvc: "123",
  zip: "10115",
} as const;

export const STRIPE_TEST_CHECKOUT_STEPS = [
  "Magic-Link oder Login als Testnutzer",
  "Renewal: POST /api/stripe/renewal-checkout → Stripe-URL öffnen",
  "Rechenpraxis: POST /api/stripe/rechenpraxis-checkout → Karte 4242…",
  "Modul: /kurse → Kauf → Widerruf akzeptieren → Zahlung",
  "Webhook: /admin/stripe-live → letztes Event prüfen",
  "Owner: /owner-dashboard → Revenue-Tab → Umsatz sichtbar",
] as const;
