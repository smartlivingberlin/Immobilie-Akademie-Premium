import {
  formatDatevBelegdatum,
  formatDatevBetrag,
  type VerwalterBuchung,
} from "../shared/verwalterBuchungTypes";

function csvCell(value: string): string {
  if (value.includes(";") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * DATEV EXTF Buchungsstapel — vereinfachte Variante (Phase B).
 * Spalten kompatibel mit gängigem DATEV-CSV-Import.
 */
export function buildDatevBuchungenCsv(
  buchungen: VerwalterBuchung[],
  meta?: { objektName?: string; periode?: string },
): string {
  const header = [
    "Umsatz",
    "Soll/Haben-Kennzeichen",
    "Konto",
    "Gegenkonto (ohne BU-Schlüssel)",
    "BU-Schlüssel",
    "Belegdatum",
    "Buchungstext",
    "Belegfeld 1",
  ].join(";");

  const comment = meta?.objektName
    ? `# DATEV Buchungsstapel — ${meta.objektName}${meta.periode ? ` · ${meta.periode}` : ""}`
    : "# DATEV Buchungsstapel — Verwalter-Rechner";

  const rows = buchungen.map((b) =>
    [
      formatDatevBetrag(b.betrag),
      "S",
      b.sollKonto,
      b.habenKonto,
      "",
      formatDatevBelegdatum(b.datum),
      b.buchungstext,
      b.belegNr ?? "",
    ]
      .map(csvCell)
      .join(";"),
  );

  return "\uFEFF" + [comment, header, ...rows].join("\r\n");
}
