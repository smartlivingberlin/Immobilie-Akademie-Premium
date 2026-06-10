/** ETV-Paket — Workflow, Fristenrechner, Protokoll- & Beschluss-Checklisten. */

import { computeFaelligAm } from "./verwalterFristVorgang";
import { getVorlageBySlug, renderVorlageBody } from "./verwalterVorlagen";

export type EtvPhase = "einladung" | "durchgefuehrt" | "protokoll" | "beschluesse" | "abgeschlossen";

export type EtvMehrheit = "einfach" | "qualifiziert" | "stimmigkeit";

export type EtvBeschluss = {
  id: string;
  text: string;
  mehrheit: EtvMehrheit;
  angenommen: boolean;
  anfechtbarBis?: string;
};

export type EtvMeta = {
  phase: EtvPhase;
  etvDatum: string;
  etvUhrzeit: string;
  etvOrt: string;
  tagesordnung: string;
  onlineEtv?: boolean;
  beschluesse: EtvBeschluss[];
  checkliste: Record<string, boolean>;
};

export type EtvChecklistItem = {
  id: string;
  title: string;
  description: string;
  legalBasis?: string;
  phase: "protokoll" | "beschluss";
};

export const ETV_PROTOKOLL_CHECKLISTE: EtvChecklistItem[] = [
  {
    id: "protokoll-erstellt",
    title: "Protokoll erstellt",
    description: "Versammlungsprotokoll mit TOPs, Stimmen und Beschlüssen dokumentieren.",
    legalBasis: "§ 24 Abs. 7 WEG",
    phase: "protokoll",
  },
  {
    id: "protokoll-freigegeben",
    title: "Protokoll intern freigegeben",
    description: "Entwurf prüfen (Vorsitz, Beirat) vor Versand an Eigentümer.",
    phase: "protokoll",
  },
  {
    id: "protokoll-versendet",
    title: "Protokoll an Eigentümer",
    description: "Protokoll jedem Eigentümer unverzüglich zugänglich machen.",
    legalBasis: "§ 24 Abs. 7 WEG",
    phase: "protokoll",
  },
  {
    id: "beschluss-sammlung",
    title: "Beschluss-Sammlung aktualisiert",
    description: "Neue Beschlüsse in die fortlaufende Beschluss-Sammlung aufnehmen.",
    legalBasis: "§ 24 Abs. 7 WEG",
    phase: "protokoll",
  },
];

export const ETV_BESCHLUSS_CHECKLISTE: EtvChecklistItem[] = [
  {
    id: "beschluss-mehrheit",
    title: "Mehrheit geprüft",
    description: "Einfache, qualifizierte oder Einstimmigkeit je TOP dokumentieren.",
    legalBasis: "§ 25 WEG",
    phase: "beschluss",
  },
  {
    id: "beschluss-zustellung",
    title: "Beschluss mitgeteilt",
    description: "Beschlussinhalt an alle Eigentümer mit Anfechtungshinweis.",
    legalBasis: "§ 46 Abs. 1 WEG",
    phase: "beschluss",
  },
  {
    id: "beschluss-anfechtung",
    title: "Anfechtungsfrist im Blick",
    description: "30-Tage-Frist ab Beschlussfassung überwachen.",
    legalBasis: "§ 46 Abs. 1 WEG",
    phase: "beschluss",
  },
];

export const ETV_PHASE_LABELS: Record<EtvPhase, string> = {
  einladung: "Einladung",
  durchgefuehrt: "Versammlung durchgeführt",
  protokoll: "Protokoll",
  beschluesse: "Beschlüsse",
  abgeschlossen: "Abgeschlossen",
};

export const ETV_MEHRHEIT_LABELS: Record<EtvMehrheit, string> = {
  einfach: "Einfache Mehrheit",
  qualifiziert: "Qualifizierte Mehrheit (§ 25 Abs. 4 WEG)",
  stimmigkeit: "Einstimmigkeit",
};

export type EtvFristenResult = {
  etvDatum: string;
  einladungSpaetestens: string;
  protokollAb: string;
  anfechtungBis: string;
};

const META_PREFIX = "<!--etv:";

export function subtractDaysFromIso(iso: string, days: number): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime()) || days < 0) return iso;
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export function computeEtvFristen(etvDatum: string): EtvFristenResult {
  return {
    etvDatum,
    einladungSpaetestens: subtractDaysFromIso(etvDatum, 21),
    protokollAb: etvDatum,
    anfechtungBis: computeFaelligAm(etvDatum, 30),
  };
}

export function emptyEtvCheckliste(): Record<string, boolean> {
  const ids = [...ETV_PROTOKOLL_CHECKLISTE, ...ETV_BESCHLUSS_CHECKLISTE].map((c) => c.id);
  return Object.fromEntries(ids.map((id) => [id, false]));
}

export function encodeEtvBeschreibung(summary: string, meta: EtvMeta): string {
  return `${summary.trim()}\n\n${META_PREFIX}${JSON.stringify(meta)}-->`;
}

export function decodeEtvMeta(beschreibung?: string): EtvMeta | null {
  if (!beschreibung?.includes(META_PREFIX)) return null;
  const start = beschreibung.indexOf(META_PREFIX) + META_PREFIX.length;
  const end = beschreibung.indexOf("-->", start);
  if (end < 0) return null;
  try {
    const parsed = JSON.parse(beschreibung.slice(start, end)) as EtvMeta;
    if (!parsed || typeof parsed !== "object") return null;
    return {
      ...parsed,
      beschluesse: Array.isArray(parsed.beschluesse) ? parsed.beschluesse : [],
      checkliste: parsed.checkliste && typeof parsed.checkliste === "object" ? parsed.checkliste : emptyEtvCheckliste(),
    };
  } catch {
    return null;
  }
}

export function buildEtvVorgangSummary(meta: EtvMeta): string {
  const fristen = computeEtvFristen(meta.etvDatum);
  return [
    `ETV-Paket — Phase: ${ETV_PHASE_LABELS[meta.phase]}`,
    `Termin: ${meta.etvDatum}${meta.etvUhrzeit ? `, ${meta.etvUhrzeit}` : ""} · ${meta.etvOrt || "—"}`,
    `Einladung spätestens: ${fristen.einladungSpaetestens}`,
    meta.beschluesse.length > 0 ? `Beschlüsse: ${meta.beschluesse.length}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function renderEtvEinladungBrief(
  meta: Pick<EtvMeta, "etvDatum" | "etvUhrzeit" | "etvOrt" | "tagesordnung">,
  wegName: string,
  verwalterName: string,
  verwalterAdresse: string,
): string {
  const vorlage = getVorlageBySlug("etv-einladung");
  if (!vorlage) return "";
  return renderVorlageBody(vorlage.body, {
    wegName,
    verwalterName,
    verwalterAdresse,
    etvDatum: meta.etvDatum,
    etvUhrzeit: meta.etvUhrzeit || "18:00 Uhr",
    etvOrt: meta.etvOrt || "—",
    tagesordnung: meta.tagesordnung,
  });
}

export function renderEtvProtokollBrief(
  meta: Pick<EtvMeta, "etvDatum">,
  wegName: string,
  verwalterName: string,
): string {
  const vorlage = getVorlageBySlug("etv-protokoll");
  if (!vorlage) return "";
  return renderVorlageBody(vorlage.body, {
    wegName,
    etvDatum: meta.etvDatum,
    verwalterName,
  });
}

export function renderEtvProtokollInhalt(
  meta: EtvMeta,
  wegName: string,
  verwalterName: string,
): string {
  const vorlage = getVorlageBySlug("etv-protokoll-inhalt");
  if (!vorlage) return "";
  const beschlussBlock =
    meta.beschluesse.length > 0
      ? meta.beschluesse
          .map(
            (b, i) =>
              `TOP ${i + 1}: ${b.text}\nErgebnis: ${b.angenommen ? "angenommen" : "abgelehnt"} (${ETV_MEHRHEIT_LABELS[b.mehrheit]})`,
          )
          .join("\n\n")
      : "(noch keine Beschlüsse erfasst)";
  return renderVorlageBody(vorlage.body, {
    wegName,
    etvDatum: meta.etvDatum,
    etvUhrzeit: meta.etvUhrzeit || "—",
    etvOrt: meta.etvOrt || "—",
    tagesordnung: meta.tagesordnung,
    beschluesse: beschlussBlock,
    verwalterName,
  });
}

export function renderBeschlussHinweisBrief(
  beschluss: EtvBeschluss,
  etvDatum: string,
  wegName: string,
  verwalterName: string,
): string {
  const vorlage = getVorlageBySlug("beschluss-hinweis");
  if (!vorlage) return "";
  return renderVorlageBody(vorlage.body, {
    wegName,
    beschlussDatum: etvDatum,
    beschlussInhalt: beschluss.text,
    verwalterName,
  });
}

export function nextEtvPhase(phase: EtvPhase): EtvPhase | null {
  const order: EtvPhase[] = ["einladung", "durchgefuehrt", "protokoll", "beschluesse", "abgeschlossen"];
  const idx = order.indexOf(phase);
  if (idx < 0 || idx >= order.length - 1) return null;
  return order[idx + 1];
}
