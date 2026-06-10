import { randomUUID } from "crypto";
import {
  buildEtvVorgangSummary,
  computeEtvFristen,
  decodeEtvMeta,
  emptyEtvCheckliste,
  encodeEtvBeschreibung,
  nextEtvPhase,
  renderBeschlussHinweisBrief,
  renderEtvEinladungBrief,
  renderEtvProtokollBrief,
  renderEtvProtokollInhalt,
  type EtvBeschluss,
  type EtvMehrheit,
  type EtvMeta,
  type EtvPhase,
} from "../shared/verwalterEtv";
import { computeFaelligAm } from "../shared/verwalterFristVorgang";
import type { VerwalterFreigabe } from "../shared/verwalterEventTypes";
import type { VerwalterVorgang } from "../shared/verwalterVorgangTypes";
import { getObjekt } from "./verwalterObjektStore";
import { createVorgang, getVorgang, listVorgaenge, updateVorgang } from "./verwalterVorgangStore";
import { appendVerwalterEvent, createVerwalterFreigabe } from "./verwalterEventStore";

export type EtvWorkflowResult = {
  vorgang: VerwalterVorgang;
  freigabe?: VerwalterFreigabe;
  brief?: string;
  phase: EtvPhase;
  fristen: ReturnType<typeof computeEtvFristen>;
};

async function logEvent(
  userId: number,
  typ: "vorgang.angelegt" | "freigabe.angelegt" | "etv.workflow_gestartet" | "etv.phase_fortgeschritten" | "etv.beschluss_angelegt",
  payload: Record<string, unknown>,
  objektId: string,
  vorgangId?: string,
): Promise<void> {
  try {
    await appendVerwalterEvent(userId, { typ, objektId, vorgangId, payload });
  } catch {
    /* optional */
  }
}

export async function startEtvWorkflow(
  userId: number,
  input: {
    objektId: string;
    etvDatum: string;
    etvUhrzeit?: string;
    etvOrt?: string;
    tagesordnung: string;
    onlineEtv?: boolean;
  },
): Promise<EtvWorkflowResult> {
  if (!input.objektId?.trim()) throw new Error("objektId erforderlich");
  if (!input.etvDatum?.trim()) throw new Error("etvDatum erforderlich");
  if (!input.tagesordnung?.trim()) throw new Error("tagesordnung erforderlich");

  const obj = await getObjekt(userId, input.objektId.trim());
  if (!obj) throw new Error("Objekt nicht gefunden");

  const meta: EtvMeta = {
    phase: "einladung",
    etvDatum: input.etvDatum.trim(),
    etvUhrzeit: input.etvUhrzeit?.trim() || "18:00 Uhr",
    etvOrt: input.etvOrt?.trim() || "—",
    tagesordnung: input.tagesordnung.trim(),
    onlineEtv: Boolean(input.onlineEtv),
    beschluesse: [],
    checkliste: emptyEtvCheckliste(),
  };

  const fristen = computeEtvFristen(meta.etvDatum);
  const brief = renderEtvEinladungBrief(meta, obj.name, obj.verwalterName, obj.verwalterAdresse);

  const vorgang = await createVorgang(userId, {
    objektId: obj.id,
    objektName: obj.name,
    typ: "etv",
    titel: `ETV ${meta.etvDatum} — Einladung`,
    beschreibung: encodeEtvBeschreibung(buildEtvVorgangSummary(meta), meta),
    status: "offen",
    faelligAm: fristen.einladungSpaetestens,
    relatedVorlageSlug: "etv-einladung",
  });

  const freigabe = await createVerwalterFreigabe(userId, {
    kind: "brief_entwurf",
    titel: `ETV-Einladung — ${meta.etvDatum}`,
    objektId: obj.id,
    vorgangId: vorgang.id,
    payload: {
      text: brief,
      vorlageSlug: "etv-einladung",
      etvPhase: meta.phase,
      meta,
    },
  });

  await logEvent(userId, "etv.workflow_gestartet", { etvDatum: meta.etvDatum }, obj.id, vorgang.id);
  await logEvent(userId, "freigabe.angelegt", { freigabeId: freigabe.id, workflow: "etv" }, obj.id, vorgang.id);

  return { vorgang, freigabe, brief, phase: meta.phase, fristen };
}

export async function advanceEtvWorkflow(
  userId: number,
  vorgangId: string,
): Promise<EtvWorkflowResult> {
  const existing = await getVorgang(userId, vorgangId);
  if (!existing || existing.typ !== "etv") throw new Error("ETV-Vorgang nicht gefunden");

  const meta = decodeEtvMeta(existing.beschreibung);
  if (!meta) throw new Error("ETV-Metadaten fehlen");

  const previousPhase = meta.phase;
  const next = nextEtvPhase(meta.phase);
  if (!next) throw new Error("ETV-Workflow bereits abgeschlossen");

  const obj = await getObjekt(userId, existing.objektId);
  if (!obj) throw new Error("Objekt nicht gefunden");

  meta.phase = next;
  const fristen = computeEtvFristen(meta.etvDatum);

  let freigabe: VerwalterFreigabe | undefined;
  let brief: string | undefined;
  let titel = existing.titel;
  let faelligAm = existing.faelligAm;
  let relatedVorlageSlug = existing.relatedVorlageSlug;

  if (next === "durchgefuehrt") {
    titel = `ETV ${meta.etvDatum} — durchgeführt`;
  } else if (next === "protokoll") {
    titel = `ETV ${meta.etvDatum} — Protokoll`;
    faelligAm = fristen.protokollAb;
    relatedVorlageSlug = "etv-protokoll-inhalt";
    brief = renderEtvProtokollInhalt(meta, obj.name, obj.verwalterName);
    freigabe = await createVerwalterFreigabe(userId, {
      kind: "brief_entwurf",
      titel: `ETV-Protokoll — ${meta.etvDatum}`,
      objektId: obj.id,
      vorgangId: existing.id,
      payload: {
        text: brief,
        vorlageSlug: "etv-protokoll-inhalt",
        etvPhase: meta.phase,
        meta,
      },
    });
    await logEvent(userId, "freigabe.angelegt", { freigabeId: freigabe.id, phase: next }, obj.id, existing.id);
  } else if (next === "beschluesse") {
    titel = `ETV ${meta.etvDatum} — Beschlüsse`;
    relatedVorlageSlug = "beschluss-hinweis";
  } else if (next === "abgeschlossen") {
    titel = `ETV ${meta.etvDatum} — abgeschlossen`;
    brief = renderEtvProtokollBrief(meta, obj.name, obj.verwalterName);
  }

  const vorgang = await updateVorgang(userId, existing.id, {
    titel,
    beschreibung: encodeEtvBeschreibung(buildEtvVorgangSummary(meta), meta),
    faelligAm,
    relatedVorlageSlug,
    status: next === "abgeschlossen" ? "erledigt" : "offen",
  });

  if (!vorgang) throw new Error("ETV-Vorgang konnte nicht aktualisiert werden");

  await logEvent(userId, "etv.phase_fortgeschritten", { from: previousPhase, to: next }, obj.id, vorgang.id);

  return { vorgang, freigabe, brief, phase: meta.phase, fristen };
}

export async function addEtvBeschluss(
  userId: number,
  vorgangId: string,
  input: { text: string; mehrheit?: EtvMehrheit; angenommen?: boolean },
): Promise<{ etvVorgang: VerwalterVorgang; beschlussVorgang: VerwalterVorgang; freigabe: VerwalterFreigabe; brief: string }> {
  const existing = await getVorgang(userId, vorgangId);
  if (!existing || existing.typ !== "etv") throw new Error("ETV-Vorgang nicht gefunden");

  const meta = decodeEtvMeta(existing.beschreibung);
  if (!meta) throw new Error("ETV-Metadaten fehlen");
  if (!input.text?.trim()) throw new Error("Beschlusstext erforderlich");

  const obj = await getObjekt(userId, existing.objektId);
  if (!obj) throw new Error("Objekt nicht gefunden");

  const beschluss: EtvBeschluss = {
    id: randomUUID().slice(0, 12),
    text: input.text.trim(),
    mehrheit: input.mehrheit || "einfach",
    angenommen: input.angenommen !== false,
    anfechtbarBis: computeFaelligAm(meta.etvDatum, 30),
  };

  meta.beschluesse = [...meta.beschluesse, beschluss];
  if (meta.phase === "einladung" || meta.phase === "durchgefuehrt") {
    meta.phase = "beschluesse";
  }

  const brief = renderBeschlussHinweisBrief(beschluss, meta.etvDatum, obj.name, obj.verwalterName);

  const etvVorgang = await updateVorgang(userId, existing.id, {
    titel: `ETV ${meta.etvDatum} — ${meta.beschluesse.length} Beschluss/Beschlüsse`,
    beschreibung: encodeEtvBeschreibung(buildEtvVorgangSummary(meta), meta),
    relatedVorlageSlug: "beschluss-hinweis",
    status: "offen",
  });
  if (!etvVorgang) throw new Error("ETV-Vorgang konnte nicht aktualisiert werden");

  const beschlussVorgang = await createVorgang(userId, {
    objektId: obj.id,
    objektName: obj.name,
    typ: "beschluss",
    titel: `Beschluss ETV ${meta.etvDatum}`,
    beschreibung: `${beschluss.text}\n\nMehrheit: ${beschluss.mehrheit}\nAnfechtbar bis: ${beschluss.anfechtbarBis}\n\nRechtsgrundlage: § 46 Abs. 1 WEG`,
    status: "offen",
    faelligAm: beschluss.anfechtbarBis,
    relatedVorlageSlug: "beschluss-hinweis",
  });

  const freigabe = await createVerwalterFreigabe(userId, {
    kind: "brief_entwurf",
    titel: `Beschlusshinweis — ${beschluss.text.slice(0, 60)}`,
    objektId: obj.id,
    vorgangId: beschlussVorgang.id,
    payload: {
      text: brief,
      vorlageSlug: "beschluss-hinweis",
      etvVorgangId: existing.id,
      beschluss,
    },
  });

  await logEvent(userId, "etv.beschluss_angelegt", { beschlussId: beschluss.id }, obj.id, existing.id);
  await logEvent(userId, "freigabe.angelegt", { freigabeId: freigabe.id, beschlussId: beschluss.id }, obj.id, beschlussVorgang.id);

  return { etvVorgang, beschlussVorgang, freigabe, brief };
}

export async function updateEtvCheckliste(
  userId: number,
  vorgangId: string,
  checkliste: Record<string, boolean>,
): Promise<VerwalterVorgang> {
  const existing = await getVorgang(userId, vorgangId);
  if (!existing || existing.typ !== "etv") throw new Error("ETV-Vorgang nicht gefunden");

  const meta = decodeEtvMeta(existing.beschreibung);
  if (!meta) throw new Error("ETV-Metadaten fehlen");

  meta.checkliste = { ...meta.checkliste, ...checkliste };

  const updated = await updateVorgang(userId, existing.id, {
    beschreibung: encodeEtvBeschreibung(buildEtvVorgangSummary(meta), meta),
  });
  if (!updated) throw new Error("Checkliste konnte nicht gespeichert werden");
  return updated;
}

export async function listEtvVorgaenge(userId: number, objektId?: string): Promise<VerwalterVorgang[]> {
  const all = await listVorgaenge(userId, objektId);
  return all.filter((v) => v.typ === "etv" && decodeEtvMeta(v.beschreibung));
}
