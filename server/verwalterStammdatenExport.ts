import type { VerwalterObjekt } from "../shared/verwalterObjektTypes";

function csvCell(value: string | number | undefined): string {
  const s = String(value ?? "");
  if (s.includes(";") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

/** DATEV Phase A — Stammdaten-CSV (Objekte + Einheiten). */
export function buildStammdatenCsv(objekte: VerwalterObjekt[]): string {
  const header = [
    "objekt_id",
    "weg_name",
    "adresse",
    "plz",
    "ort",
    "verwalter_name",
    "einheit_nr",
    "mea",
    "eigentuemer",
    "flaeche_qm",
  ].join(";");

  const rows: string[] = [header];

  for (const o of objekte) {
    if (o.einheiten.length === 0) {
      rows.push(
        [
          o.id,
          o.name,
          o.adresse,
          o.plz,
          o.ort,
          o.verwalterName,
          "",
          "",
          "",
          "",
        ]
          .map(csvCell)
          .join(";"),
      );
    } else {
      for (const e of o.einheiten) {
        rows.push(
          [
            o.id,
            o.name,
            o.adresse,
            o.plz,
            o.ort,
            o.verwalterName,
            e.nummer,
            e.mea,
            e.eigentuemerName ?? "",
            e.flaecheQm ?? "",
          ]
            .map(csvCell)
            .join(";"),
        );
      }
    }
  }

  return "\uFEFF" + rows.join("\r\n");
}
