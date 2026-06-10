/** Freitext → Buchungsvorschlag (Regel-Engine, laienfreundlich). */

import type { VerwalterObjekt } from "./verwalterObjektTypes";

export type BuchungVorschlag = {
  betrag: number;
  sollKonto: string;
  habenKonto: string;
  buchungstext: string;
  einheitId?: string;
  einheitNr?: string;
  erklaerung: string;
  quelle: "regel" | "ki";
};

function parseBetrag(text: string): number | null {
  const m = text.match(/(\d{1,6})(?:[,.](\d{1,2}))?\s*(?:€|eur|euro)?/i);
  if (!m) return null;
  const dec = m[2] ? `.${m[2]}` : "";
  const n = Number(`${m[1]}${dec}`);
  return Number.isFinite(n) && n > 0 ? Math.round(n * 100) / 100 : null;
}

function matchEinheit(text: string, objekt?: VerwalterObjekt): { id: string; nummer: string } | null {
  if (!objekt?.einheiten.length) return null;
  const lower = text.toLowerCase();
  for (const e of objekt.einheiten) {
    if (e.nummer && lower.includes(e.nummer.toLowerCase())) return { id: e.id, nummer: e.nummer };
    if (e.eigentuemerName && lower.includes(e.eigentuemerName.toLowerCase())) {
      return { id: e.id, nummer: e.nummer };
    }
  }
  const we = lower.match(/(?:we|whg|wohnung|einheit)\s*(\d+)/i);
  if (we) {
    const hit = objekt.einheiten.find((e) => e.nummer.includes(we[1]));
    if (hit) return { id: hit.id, nummer: hit.nummer };
  }
  return null;
}

type KontoRegel = {
  keywords: RegExp;
  soll: string;
  haben: string;
  textPrefix: string;
  erklaerung: string;
};

const REGELN: KontoRegel[] = [
  {
    keywords: /hausgeld|haus\s*geld|wohngeld|monatsbeitrag/i,
    soll: "1200",
    haben: "8400",
    textPrefix: "Hausgeld",
    erklaerung: "Hausgeld-Eingang auf die Bank (Soll 1200) als Erlös (Haben 8400).",
  },
  {
    keywords: /forderung|mahnung|rückstand|rueckstand|ausstehend/i,
    soll: "1400",
    haben: "8400",
    textPrefix: "Forderung Hausgeld",
    erklaerung: "Offene Forderung beim Eigentümer (Soll 1400) gegen Erlös (Haben 8400).",
  },
  {
    keywords: /nebenkosten|\bnk\b|betriebskosten|heizkosten/i,
    soll: "4970",
    haben: "1200",
    textPrefix: "Nebenkosten",
    erklaerung: "NK-Aufwand (Soll 4970) — Auszahlung von der Bank (Haben 1200).",
  },
  {
    keywords: /bank|überweisung|ueberweisung|eingang|zahlungseingang/i,
    soll: "1200",
    haben: "8400",
    textPrefix: "Zahlungseingang",
    erklaerung: "Geldeingang auf Bankkonto (Soll 1200).",
  },
];

/** Regelbasierte Erkennung — schnell, ohne KI-Kosten. */
export function parseBuchungFreitext(
  text: string,
  objekt?: VerwalterObjekt,
): BuchungVorschlag | null {
  const trimmed = text.trim();
  if (trimmed.length < 3) return null;

  const betrag = parseBetrag(trimmed);
  if (!betrag) return null;

  const regel = REGELN.find((r) => r.keywords.test(trimmed));
  if (!regel) return null;

  const einheit = matchEinheit(trimmed, objekt);
  const suffix = einheit ? ` ${einheit.nummer}` : "";
  const buchungstext = `${regel.textPrefix}${suffix}`.trim();

  return {
    betrag,
    sollKonto: regel.soll,
    habenKonto: regel.haben,
    buchungstext,
    einheitId: einheit?.id,
    einheitNr: einheit?.nummer,
    erklaerung: regel.erklaerung,
    quelle: "regel",
  };
}

export function parseKiBuchungJson(raw: string): BuchungVorschlag | null {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    const j = JSON.parse(match[0]) as Record<string, unknown>;
    const betrag = Number(j.betrag);
    if (!Number.isFinite(betrag) || betrag <= 0) return null;
    const soll = String(j.sollKonto || "").trim();
    const haben = String(j.habenKonto || "").trim();
    const buchungstext = String(j.buchungstext || "").trim();
    if (!soll || !haben || !buchungstext) return null;
    return {
      betrag: Math.round(betrag * 100) / 100,
      sollKonto: soll,
      habenKonto: haben,
      buchungstext,
      einheitNr: j.einheitNr ? String(j.einheitNr) : undefined,
      erklaerung: String(j.erklaerung || "KI-Vorschlag — bitte prüfen und mit Steuerberater abstimmen."),
      quelle: "ki",
    };
  } catch {
    return null;
  }
}
