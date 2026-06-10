/** KI-Nutzungslimits — Renewal-Tier (29 €/Jahr) */

export const KI_TIER_FULL = "full";
export const KI_TIER_RENEWAL = "renewal";

/** Nachrichten pro Tag im Renewal-Tier (GROWTH_ROADMAP) */
export const KI_RENEWAL_DAILY_LIMIT = 50;

export function isRenewalKiTier(kiTier: string | null | undefined): boolean {
  return kiTier === KI_TIER_RENEWAL;
}

/** POST-Pfade mit LLM-Aufruf — für Fair-Use-Middleware */
export const KI_FAIR_USE_POST_PATHS = [
  "/api/ai",
  "/api/verwalter/ki-brief",
  "/api/verwalter/assistent",
  "/api/verwalter/buchungen/vorschlagen",
] as const;
