/** Plausibilitäts-Prüfung vor DATEV-Export — Fehler-Wächter. */

import { SKR03_WEG_KONTEN, type VerwalterBuchung } from "./verwalterBuchungTypes";
import type { VerwalterObjekt } from "./verwalterObjektTypes";

export type PlausibilitaetLevel = "error" | "warn" | "info";

export type PlausibilitaetHinweis = {
  level: PlausibilitaetLevel;
  code: string;
  message: string;
};

const BEKANNTE_KONTEN = new Set(SKR03_WEG_KONTEN.map((k) => k.konto));

export function pruefeBuchungen(
  buchungen: VerwalterBuchung[],
  objekt: VerwalterObjekt,
  periode: string,
): PlausibilitaetHinweis[] {
  const hinweise: PlausibilitaetHinweis[] = [];

  if (buchungen.length === 0) {
    hinweise.push({
      level: "warn",
      code: "keine_buchungen",
      message: `Keine Buchungen in ${periode} — DATEV-Export wäre leer.`,
    });
    return hinweise;
  }

  const belege = new Map<string, number>();
  let hatHausgeld = false;
  let hatBank = false;

  for (const b of buchungen) {
    if (b.sollKonto === b.habenKonto) {
      hinweise.push({
        level: "error",
        code: "gleiches_konto",
        message: `Buchung „${b.buchungstext}“: Soll- und Haben-Konto sind identisch (${b.sollKonto}).`,
      });
    }
    if (!b.datum.startsWith(periode)) {
      hinweise.push({
        level: "error",
        code: "datum_periode",
        message: `Buchung „${b.buchungstext}“: Datum ${b.datum} liegt nicht in Periode ${periode}.`,
      });
    }
    if (b.betrag > 50_000) {
      hinweise.push({
        level: "warn",
        code: "hoher_betrag",
        message: `Buchung „${b.buchungstext}“: ungewöhnlich hoher Betrag (${b.betrag} €) — bitte prüfen.`,
      });
    }
    for (const k of [b.sollKonto, b.habenKonto]) {
      if (k && !BEKANNTE_KONTEN.has(k)) {
        hinweise.push({
          level: "warn",
          code: "unbekanntes_konto",
          message: `Konto ${k} ist kein Standard-SKR03-WEG-Konto — mit Steuerberater abstimmen.`,
        });
      }
    }
    if (b.belegNr) {
      belege.set(b.belegNr, (belege.get(b.belegNr) || 0) + 1);
    }
    if (b.sollKonto === "1200" || b.habenKonto === "1200") hatBank = true;
    if (
      (b.sollKonto === "8400" || b.habenKonto === "8400") &&
      (b.sollKonto === "1200" || b.habenKonto === "1200" || b.sollKonto === "1400" || b.habenKonto === "1400")
    ) {
      hatHausgeld = true;
    }
  }

  for (const [nr, count] of belege) {
    if (count > 1) {
      hinweise.push({
        level: "warn",
        code: "doppel_beleg",
        message: `Beleg-Nr. „${nr}“ wird ${count}× verwendet.`,
      });
    }
  }

  if (objekt.einheiten.length > 0 && !hatHausgeld) {
    hinweise.push({
      level: "warn",
      code: "kein_hausgeld",
      message: "Keine Hausgeld-Buchung (Bank/Forderung → Erlös 8400) erfasst — alle Einheiten abgerechnet?",
    });
  }
  if (!hatBank && buchungen.length > 0) {
    hinweise.push({
      level: "info",
      code: "keine_bank",
      message: "Keine Buchung mit Bankkonto 1200 — bewusst nur Forderungen?",
    });
  }

  return dedupeHinweise(hinweise);
}

function dedupeHinweise(list: PlausibilitaetHinweis[]): PlausibilitaetHinweis[] {
  const seen = new Set<string>();
  return list.filter((h) => {
    const key = `${h.code}:${h.message}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function hatPlausibilitaetsFehler(hinweise: PlausibilitaetHinweis[]): boolean {
  return hinweise.some((h) => h.level === "error");
}
