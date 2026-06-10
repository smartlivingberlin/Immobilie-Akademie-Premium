import {
  buildMahnungVorgangSummary,
  decodeMahnungMeta,
  encodeMahnungBeschreibung,
  MAHNUNG_STUFEN,
  type MahnungMeta,
  type MahnungStufe,
  renderMahnungBrief,
  stufeFromSlug,
} from "../shared/verwalterMahnwesen";
import { getObjekt } from "./verwalterObjektStore";
import { createVorgang, getVorgang, updateVorgang } from "./verwalterVorgangStore";
import { appendVerwalterEvent, createVerwalterFreigabe } from "./verwalterEventStore";
import type { VerwalterFreigabe } from "../shared/verwalterEventTypes";
import type { VerwalterVorgang } from "../shared/verwalterVorgangTypes";

export type MahnungWorkflowResult = {
  vorgang: VerwalterVorgang;
  freigabe: VerwalterFreigabe;
  brief: string;
  stufe: MahnungStufe;
};

async function logEvent(
  userId: number,
  typ: "vorgang.angelegt" | "system.hinweis" | "freigabe.angelegt",
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

export async function startMahnungWorkflow(
  userId: number,
  input: {
    objektId: string;
    einheitId?: string;
    eigentuemerName: string;
    betrag: number;
    faelligSeit: string;
    stufe?: MahnungStufe;
  },
): Promise<MahnungWorkflowResult> {
  if (!input.objektId?.trim()) throw new Error("objektId erforderlich");
  if (!input.eigentuemerName?.trim()) throw new Error("eigentuemerName erforderlich");
  if (!Number.isFinite(input.betrag) || input.betrag <= 0) throw new Error("betrag muss > 0 sein");

  const obj = await getObjekt(userId, input.objektId.trim());
  if (!obj) throw new Error("Objekt nicht gefunden");

  const einheit = input.einheitId
    ? obj.einheiten.find((e) => e.id === input.einheitId)
    : obj.einheiten[0];

  const stufe = input.stufe ?? 1;
  const cfg = MAHNUNG_STUFEN[stufe];
  const meta: MahnungMeta = {
    stufe,
    einheitId: einheit?.id,
    einheitNr: einheit?.nummer || "—",
    eigentuemerName: input.eigentuemerName.trim(),
    betrag: Number(input.betrag),
    faelligSeit: input.faelligSeit,
  };

  const brief = renderMahnungBrief(stufe, meta, obj.name, obj.verwalterName);
  const faelligAm = buildMahnungFieldValuesFaellig(stufe);

  const vorgang = await createVorgang(userId, {
    objektId: obj.id,
    objektName: obj.name,
    typ: "mahnung",
    titel: `${cfg.titel} — Einheit ${meta.einheitNr}`,
    beschreibung: encodeMahnungBeschreibung(buildMahnungVorgangSummary(meta, stufe), meta),
    status: "offen",
    faelligAm,
    relatedVorlageSlug: cfg.slug,
  });

  const freigabe = await createVerwalterFreigabe(userId, {
    kind: "brief_entwurf",
    titel: `${cfg.titel} — ${meta.eigentuemerName}`,
    objektId: obj.id,
    vorgangId: vorgang.id,
    payload: {
      text: brief,
      vorlageSlug: cfg.slug,
      mahnungStufe: stufe,
      meta,
    },
  });

  await logEvent(userId, "vorgang.angelegt", { workflow: "mahnwesen", stufe }, obj.id, vorgang.id);
  await logEvent(userId, "freigabe.angelegt", { freigabeId: freigabe.id, stufe }, obj.id, vorgang.id);

  return { vorgang, freigabe, brief, stufe };
}

function buildMahnungFieldValuesFaellig(stufe: MahnungStufe): string {
  const days = MAHNUNG_STUFEN[stufe].zahlungsfristTage;
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export async function escalateMahnungWorkflow(
  userId: number,
  vorgangId: string,
): Promise<MahnungWorkflowResult> {
  const existing = await getVorgang(userId, vorgangId);
  if (!existing || existing.typ !== "mahnung") {
    throw new Error("Mahnungs-Vorgang nicht gefunden");
  }

  const meta = decodeMahnungMeta(existing.beschreibung);
  if (!meta) throw new Error("Mahnungs-Metadaten fehlen — Vorgang manuell bearbeiten");

  const currentStufe = stufeFromSlug(existing.relatedVorlageSlug ?? "") ?? meta.stufe;
  const nextStufe = MAHNUNG_STUFEN[currentStufe].naechsteStufe;
  if (!nextStufe) {
    throw new Error("Stufe 3 erreicht — Eskalation nur manuell (Inkasso/Rechtsweg)");
  }

  await updateVorgang(userId, vorgangId, { status: "erledigt" });

  return startMahnungWorkflow(userId, {
    objektId: existing.objektId,
    einheitId: meta.einheitId,
    eigentuemerName: meta.eigentuemerName,
    betrag: meta.betrag,
    faelligSeit: meta.faelligSeit,
    stufe: nextStufe,
  });
}
