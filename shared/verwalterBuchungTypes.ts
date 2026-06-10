/** Hausgeld-Buchungen light — Basis für DATEV-Export (Phase B). */

export type VerwalterBuchung = {
  id: string;
  objektId: string;
  objektName: string;
  datum: string;
  betrag: number;
  sollKonto: string;
  habenKonto: string;
  buchungstext: string;
  belegNr?: string;
  einheitId?: string;
  einheitNr?: string;
  periode: string;
  createdAt: string;
  updatedAt: string;
};

export type BuchungInput = {
  objektId: string;
  datum: string;
  betrag: number;
  sollKonto: string;
  habenKonto: string;
  buchungstext: string;
  belegNr?: string;
  einheitId?: string;
  periode?: string;
};

/** SKR03 — häufige WEG-Konten (Vorschlag, keine Steuerberatung). */
export const SKR03_WEG_KONTEN: { konto: string; label: string }[] = [
  { konto: "1200", label: "Bank" },
  { konto: "1400", label: "Forderungen Eigentümer" },
  { konto: "8400", label: "Erlöse Hausgeld" },
  { konto: "4970", label: "Nebenkosten" },
];

export function periodeFromDatum(datum: string): string {
  const m = /^(\d{4})-(\d{2})/.exec(datum);
  return m ? `${m[1]}-${m[2]}` : "";
}

export function datumInPeriode(datum: string, periode: string): boolean {
  return periodeFromDatum(datum) === periode;
}

export function formatDatevBetrag(betrag: number): string {
  return betrag.toFixed(2).replace(".", ",");
}

/** Belegdatum DATEV: TTMM (4 Stellen). */
export function formatDatevBelegdatum(datum: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(datum);
  if (!m) return "";
  return `${m[3]}${m[2]}`;
}

export function validateBuchungInput(input: BuchungInput): string | null {
  if (!input.objektId?.trim()) return "Objekt ist erforderlich";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.datum)) return "Datum ungültig (YYYY-MM-DD)";
  if (!Number.isFinite(input.betrag) || input.betrag <= 0) return "Betrag muss größer 0 sein";
  if (!input.sollKonto?.trim()) return "Soll-Konto erforderlich";
  if (!input.habenKonto?.trim()) return "Haben-Konto erforderlich";
  if (!input.buchungstext?.trim()) return "Buchungstext erforderlich";
  const periode = input.periode || periodeFromDatum(input.datum);
  if (!periode) return "Periode konnte nicht ermittelt werden";
  if (!datumInPeriode(input.datum, periode)) {
    return "Datum liegt nicht in der gewählten Periode";
  }
  return null;
}
