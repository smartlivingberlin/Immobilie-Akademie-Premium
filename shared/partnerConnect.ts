/** Stripe Connect — Partner-Auszahlungen (Express) */

export const PARTNER_CONNECT_POLICY = {
  enabledEnv: "STRIPE_CONNECT_ENABLED",
  country: "DE",
  minPayoutEur: 50,
  note:
    "Partner mit erfolgreichen Empfehlungen können ein Stripe Express-Konto verbinden für automatische SEPA-Auszahlungen.",
} as const;
