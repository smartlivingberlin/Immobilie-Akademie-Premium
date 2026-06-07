/** Empfehlungsprogramm — verifizierbare Empfehlungen mit Zugangs-Bonus */

export const REFERRAL_REWARD_DAYS = {
  referrer: 30,
  referred: 14,
} as const;

export const REFERRAL_TOOL_VOUCHERS = [
  { id: "rechenpraxis", label: "Rechenpraxis 30 Tage gratis", days: 30 },
  { id: "ki_tutor", label: "KI-Tutor Extra-Kontingent (50 Nachrichten/Tag)", days: 0 },
  { id: "weiterbildungsnachweis", label: "Weiterbildungsnachweis-Export freigeschaltet", days: 365 },
] as const;

export const REFERRAL_PROGRAM_SUMMARY =
  "Empfehlen Sie die Akademie — Sie erhalten 30 Tage Zugangsverlängerung, der Geworbene 14 Tage extra nach dem ersten Kauf.";
