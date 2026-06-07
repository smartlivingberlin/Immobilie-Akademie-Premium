/** Partner-Auszahlungen — Policy für externe Empfehler (Makler, Verbände) */

export const PARTNER_PAYOUT_POLICY = {
  /** Mindestbetrag für Auszahlung */
  minPayoutEur: 50,
  /** Provision auf Netto-Umsatz des ersten Modulkaufs */
  commissionPercent: 15,
  /** Auszahlungsrhythmus */
  payoutCycle: "quarterly" as const,
  /** Tracking über referral_rewards + Stripe-Metadaten */
  trackingNote:
    "Auszahlung manuell nach Quartalsabschluss. Basis: verifizierte Erstkäufe über referralCode.",
  /** Geschätzter Durchschnittsumsatz pro Erstkauf (für Admin-Schätzung) */
  avgFirstPurchaseEur: 149,
} as const;

export function estimatePartnerPayoutEur(successfulReferrals: number): number {
  const gross = successfulReferrals * PARTNER_PAYOUT_POLICY.avgFirstPurchaseEur;
  const commission = gross * (PARTNER_PAYOUT_POLICY.commissionPercent / 100);
  return Math.round(commission * 100) / 100;
}

export function isPayoutEligible(estimatedEur: number): boolean {
  return estimatedEur >= PARTNER_PAYOUT_POLICY.minPayoutEur;
}
