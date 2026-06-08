/** B2B White-Label — Smoke-Test & Go-Live-Schritte */

import { STRIPE_TEST_CARD } from "./stripeTestGuide";

export const B2B_TEST_CARD = STRIPE_TEST_CARD;

export const B2B_SMOKE_STEPS = [
  "Einloggen (Magic-Link oder bestehendes Konto)",
  "/fuer-maklerbueros → Starter oder Professional wählen",
  "Firmenname im Dialog eingeben → Weiter zu Stripe",
  "Karte 4242 4242 4242 4242 · 12/34 · CVC 123",
  "Redirect zu /b2b-einrichtung?b2b=1 — Tenant wird provisioniert",
  "Branding: Firmenname, Farbe, Willkommenstext (optional Logo)",
  "Team-Code generieren und kopieren",
  "/code-einloesen mit Team-Code als zweiter Nutzer testen",
] as const;

export const B2B_WSL_VERIFY_COMMANDS = [
  'curl -s https://immobilien-akademie-smart.de/api/health | jq \'{ok, db}\'',
  'curl -s -o /dev/null -w "%{http_code}\\n" https://immobilien-akademie-smart.de/fuer-maklerbueros',
  "# Nach Login (Cookie): curl -s -b cookies.txt /api/b2b/onboarding/status | jq .",
] as const;

export const B2B_API_ENDPOINTS = {
  checkout: "POST /api/stripe/b2b-checkout",
  onboardingStatus: "GET /api/b2b/onboarding/status",
  branding: "POST /api/b2b/onboarding/branding",
  teamCode: "POST /api/b2b/onboarding/team-code",
} as const;
