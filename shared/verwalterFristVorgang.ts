/** Fristen-Checkliste → Vorgangs-Tracker (1-Klick-Anlage). */

import type { FristItem } from "./verwalterFristen";
import type { VorgangTyp } from "./verwalterVorgangTypes";

export function fristCategoryToVorgangTyp(category: FristItem["category"]): VorgangTyp {
  const map: Record<FristItem["category"], VorgangTyp> = {
    etv: "etv",
    beschluss: "beschluss",
    nk: "nk",
    mahnung: "mahnung",
  };
  return map[category];
}

/** Berechnet Fälligkeitsdatum (YYYY-MM-DD) aus Startdatum + Tage. */
export function computeFaelligAm(startIso: string, durationDays: number): string {
  const d = new Date(startIso);
  if (Number.isNaN(d.getTime()) || durationDays < 0) return "";
  d.setDate(d.getDate() + durationDays);
  return d.toISOString().slice(0, 10);
}

export type FristVorgangInput = {
  objektId: string;
  typ: VorgangTyp;
  titel: string;
  beschreibung: string;
  faelligAm?: string;
  relatedVorlageSlug?: string;
};

/** Baut POST-Body für /api/verwalter/vorgaenge aus einer Frist. */
export function fristToVorgangInput(
  frist: FristItem,
  opts: { objektId: string; startDate?: string },
): FristVorgangInput {
  const typ = fristCategoryToVorgangTyp(frist.category);
  const faelligAm =
    frist.durationDays != null && opts.startDate
      ? computeFaelligAm(opts.startDate, frist.durationDays)
      : undefined;

  return {
    objektId: opts.objektId,
    typ,
    titel: frist.title,
    beschreibung: `${frist.description}\n\nRechtsgrundlage: ${frist.legalBasis}`,
    faelligAm: faelligAm || undefined,
    relatedVorlageSlug: frist.relatedVorlageSlug,
  };
}
