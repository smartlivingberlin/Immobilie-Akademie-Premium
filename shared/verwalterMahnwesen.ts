/** Mahnwesen-Workflow — 3 Stufen, Freigabe vor Versand. */

import { getVorlageBySlug, renderVorlageBody } from "./verwalterVorlagen";

export type MahnungStufe = 1 | 2 | 3;

export type MahnungStufeConfig = {
  slug: string;
  titel: string;
  zahlungsfristTage: number;
  naechsteStufe?: MahnungStufe;
};

export const MAHNUNG_STUFEN: Record<MahnungStufe, MahnungStufeConfig> = {
  1: {
    slug: "mahnung-stufe1",
    titel: "1. Mahnung — Hausgeld-Rückstand",
    zahlungsfristTage: 14,
    naechsteStufe: 2,
  },
  2: {
    slug: "mahnung-stufe2",
    titel: "2. Mahnung — mit Verzugshinweis",
    zahlungsfristTage: 14,
    naechsteStufe: 3,
  },
  3: {
    slug: "mahnung-stufe3",
    titel: "3. Mahnung — letzte Aufforderung",
    zahlungsfristTage: 7,
  },
};

export type MahnungMeta = {
  stufe: MahnungStufe;
  einheitId?: string;
  einheitNr: string;
  eigentuemerName: string;
  betrag: number;
  faelligSeit: string;
};

const META_PREFIX = "<!--mahnung:";

export function stufeFromSlug(slug: string): MahnungStufe | null {
  if (slug === "mahnung-stufe1") return 1;
  if (slug === "mahnung-stufe2") return 2;
  if (slug === "mahnung-stufe3") return 3;
  return null;
}

export function addDaysToIso(iso: string, days: number): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime()) || days < 0) return iso;
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function encodeMahnungBeschreibung(summary: string, meta: MahnungMeta): string {
  return `${summary.trim()}\n\n${META_PREFIX}${JSON.stringify(meta)}-->`;
}

export function decodeMahnungMeta(beschreibung?: string): MahnungMeta | null {
  if (!beschreibung?.includes(META_PREFIX)) return null;
  const start = beschreibung.indexOf(META_PREFIX) + META_PREFIX.length;
  const end = beschreibung.indexOf("-->", start);
  if (end < 0) return null;
  try {
    return JSON.parse(beschreibung.slice(start, end)) as MahnungMeta;
  } catch {
    return null;
  }
}

export function buildMahnungFieldValues(
  meta: MahnungMeta,
  wegName: string,
  verwalterName: string,
  stufe: MahnungStufe,
): Record<string, string> {
  const cfg = MAHNUNG_STUFEN[stufe];
  const zahlungsfrist = addDaysToIso(new Date().toISOString().slice(0, 10), cfg.zahlungsfristTage);
  const base: Record<string, string> = {
    eigentuemerName: meta.eigentuemerName,
    wegName,
    betrag: String(meta.betrag),
    zahlungsfrist,
    verwalterName,
  };
  if (stufe === 1) {
    base.einheit = meta.einheitNr;
    base.faelligSeit = meta.faelligSeit;
  }
  return base;
}

export function renderMahnungBrief(
  stufe: MahnungStufe,
  meta: MahnungMeta,
  wegName: string,
  verwalterName: string,
): string {
  const cfg = MAHNUNG_STUFEN[stufe];
  const vorlage = getVorlageBySlug(cfg.slug);
  if (!vorlage) throw new Error(`Vorlage ${cfg.slug} nicht gefunden`);
  const values = buildMahnungFieldValues(meta, wegName, verwalterName, stufe);
  return renderVorlageBody(vorlage.body, values);
}

export function buildMahnungVorgangSummary(meta: MahnungMeta, stufe: MahnungStufe): string {
  return [
    `Mahnwesen Stufe ${stufe}/3`,
    `Einheit ${meta.einheitNr} · ${meta.eigentuemerName}`,
    `Betrag: ${meta.betrag} € · Fällig seit: ${meta.faelligSeit}`,
    stufe === 3
      ? "Hinweis: Nach Stufe 3 Inkasso/rechtliche Schritte manuell prüfen."
      : `Nächste Eskalation möglich nach Ablauf der Zahlungsfrist (${MAHNUNG_STUFEN[stufe].zahlungsfristTage} Tage).`,
  ].join("\n");
}
