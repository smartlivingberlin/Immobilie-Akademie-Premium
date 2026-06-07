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

export const STRIPE_LIVE_COMPLETION_STEPS = [
  "Railway: sk_live_, pk_live_, whsec_ und APP_URL setzen",
  "Alle 18 STRIPE_PRICE_* in Railway (Admin → Stripe Live → fehlende ENV kopieren)",
  "Stripe Dashboard: Webhook POST /api/stripe/webhook (checkout.session.completed, invoice.paid)",
  "Admin → Stripe Live → API testen → Live-ready + Go-Live-Banner grün",
  "Testkauf mit echter Karte (kleiner Betrag) oder Stripe Test Clock im Live-Modus",
  "Webhook-Health: letztes Event innerhalb 7 Tage sichtbar",
  "Owner Revenue: Umsatz nach Testkauf sichtbar",
  "Offene Käufe (pending purchases) leer oder manuell zugeordnet",
] as const;
