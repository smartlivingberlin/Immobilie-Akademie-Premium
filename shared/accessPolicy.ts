/** Zugangsrichtlinie: 2× Lernzeit inklusive, danach Verlängerung 5 €/Mo oder 29 €/Jahr */

export const RENEWAL_MONTHLY_EUR = 5;
export const RENEWAL_YEARLY_EUR = 29;

/** Inkludierte Monate nach Kauf (entspricht 2× Ziel-Lernzeit, aligned mit KursLanding ZUGANG) */
export const PRODUCT_INCLUDED_MONTHS: Record<string, number> = {
  modul_1: 4,
  modul_2: 8,
  modul_3: 10,
  modul_4: 6,
  modul_5: 6,
  modul_komplett: 20,
  starter: 8,
  verwalter: 10,
  "makler-plus": 8,
  profi: 10,
  gutachter: 8,
  komplett: 20,
};

export const MODULE_INCLUDED_MONTHS: Record<number, number> = {
  1: 4,
  2: 8,
  3: 10,
  4: 6,
  5: 6,
};

export function parseModuleIds(modules: string): number[] {
  return modules
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !Number.isNaN(n) && n >= 1 && n <= 5);
}

/** Monate für Produkt-ID oder Modul-Liste (Paket = Maximum der enthaltenen Module) */
export function includedMonthsForPurchase(productId: string | null | undefined, modulesCsv: string): number {
  if (productId && PRODUCT_INCLUDED_MONTHS[productId]) {
    return PRODUCT_INCLUDED_MONTHS[productId];
  }
  const ids = parseModuleIds(modulesCsv);
  if (ids.length === 0) return 6;
  return Math.max(...ids.map((id) => MODULE_INCLUDED_MONTHS[id] ?? 6));
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Neues Ablaufdatum: startet ab max(jetzt, bestehendes Ablaufdatum) + inkludierte Monate.
 */
export function computeAccessExpiry(
  currentExpiresAt: Date | string | null | undefined,
  includedMonths: number,
  reference = new Date(),
): Date {
  const base =
    currentExpiresAt && new Date(currentExpiresAt) > reference
      ? new Date(currentExpiresAt)
      : reference;
  return addMonths(base, includedMonths);
}

export function isAccessExpired(
  accessExpiresAt: Date | string | null | undefined,
  reference = new Date(),
): boolean {
  if (!accessExpiresAt) return false;
  return new Date(accessExpiresAt) < reference;
}

export const ACCESS_MARKETING_COPY =
  "Doppelte Lernzeit inklusive — danach Portal weiternutzen ab 29 €/Jahr oder 5 €/Monat (nur für gekaufte Module).";
