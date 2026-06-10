import { Router } from "express";
import { requireVerwalterAuth } from "./verwalterToolsMiddleware";
import { askLlmWithContinuation } from "./kursbuchLlm";
import {
  createObjekt,
  deleteObjekt,
  getObjekt,
  listObjekte,
  updateObjekt,
} from "./verwalterObjektStore";
import {
  countOpenVorgaenge,
  countOverdueVorgaenge,
  createVorgang,
  deleteVorgang,
  deleteVorgaengeByObjekt,
  listVorgaenge,
  updateVorgang,
} from "./verwalterVorgangStore";
import { getVorlageBySlug, renderVorlageBody } from "../shared/verwalterVorlagen";
import {
  createBuchung,
  deleteBuchung,
  deleteBuchungenByObjekt,
  listBuchungen,
  updateBuchung,
} from "./verwalterBuchungStore";
import { buildStammdatenCsv } from "./verwalterStammdatenExport";
import { buildDatevBuchungenCsv } from "./verwalterDatevExport";
import { buildVerwalterAssistentPrompt } from "./verwalterAssistentContext";
import { suggestBuchung } from "./verwalterBuchungVorschlagService";
import { looksLikeBuchungsAnfrage } from "../shared/verwalterAssistentBuchung";
import { VERWALTER_ASSISTENT_ROLLE } from "../shared/verwalterAssistentKnowledge";
import {
  hatPlausibilitaetsFehler,
  pruefeBuchungen,
} from "../shared/verwalterBuchungPlausibilitaet";
import { buildMonatsabschluss } from "../shared/verwalterMonatsabschluss";
import { buildFristBatchVorgaenge } from "../shared/verwalterFristBatch";
import { getVerwalterFeatureFlags } from "../shared/verwalterFeatureFlags";
import {
  appendVerwalterEvent,
  countVerwalterEvents,
  countVerwalterFreigaben,
  createVerwalterFreigabe,
  listVerwalterEvents,
  listVerwalterFreigaben,
  updateVerwalterFreigabeStatus,
} from "./verwalterEventStore";

const router = Router();

async function logVerwalterEvent(
  userId: number,
  input: Parameters<typeof appendVerwalterEvent>[1],
): Promise<void> {
  try {
    await appendVerwalterEvent(userId, input);
  } catch {
    /* Event-Log optional — Migration 0044 oder MySQL erforderlich */
  }
}

function userId(req: { currentUser?: { id?: number } }): number {
  const id = req.currentUser?.id;
  if (!id) throw new Error("Nutzer-ID fehlt");
  return id;
}

router.get("/api/verwalter/objekte", requireVerwalterAuth, async (req, res) => {
  try {
    const objekte = await listObjekte(userId(req as any));
    res.json({ success: true, objekte });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/verwalter/objekte/:id", requireVerwalterAuth, async (req, res) => {
  try {
    const obj = await getObjekt(userId(req as any), String(req.params.id));
    if (!obj) return res.status(404).json({ error: "Objekt nicht gefunden" });
    res.json({ success: true, objekt: obj });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/api/verwalter/objekte", requireVerwalterAuth, async (req, res) => {
  try {
    const body = req.body ?? {};
    if (!body.name?.trim() || !body.adresse?.trim()) {
      return res.status(400).json({ error: "name und adresse erforderlich" });
    }
    const objekt = await createObjekt(userId(req as any), {
      name: String(body.name).trim(),
      adresse: String(body.adresse).trim(),
      plz: String(body.plz || "").trim(),
      ort: String(body.ort || "").trim(),
      einheitenAnzahl: Number(body.einheitenAnzahl) || 0,
      verwalterName: String(body.verwalterName || "").trim(),
      verwalterAdresse: String(body.verwalterAdresse || "").trim(),
      kontaktEmail: body.kontaktEmail ? String(body.kontaktEmail) : undefined,
      kontaktTelefon: body.kontaktTelefon ? String(body.kontaktTelefon) : undefined,
      notizen: body.notizen ? String(body.notizen) : undefined,
      einheiten: Array.isArray(body.einheiten) ? body.einheiten : [],
    });
    res.json({ success: true, objekt });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.put("/api/verwalter/objekte/:id", requireVerwalterAuth, async (req, res) => {
  try {
    const updated = await updateObjekt(userId(req as any), String(req.params.id), req.body ?? {});
    if (!updated) return res.status(404).json({ error: "Objekt nicht gefunden" });
    res.json({ success: true, objekt: updated });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/api/verwalter/objekte/:id", requireVerwalterAuth, async (req, res) => {
  try {
    const uid = userId(req as any);
    const id = String(req.params.id);
    await deleteVorgaengeByObjekt(uid, id);
    await deleteBuchungenByObjekt(uid, id);
    const ok = await deleteObjekt(uid, id);
    if (!ok) return res.status(404).json({ error: "Objekt nicht gefunden" });
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/verwalter/dashboard", requireVerwalterAuth, async (req, res) => {
  try {
    const uid = userId(req as any);
    const objekte = await listObjekte(uid);
    let neueEvents = 0;
    let ausstehendeFreigaben = 0;
    try {
      neueEvents = await countVerwalterEvents(uid, "neu");
      ausstehendeFreigaben = await countVerwalterFreigaben(uid, "ausstehend");
    } catch {
      /* Tabellen noch nicht migriert */
    }
    res.json({
      success: true,
      objekteCount: objekte.length,
      openVorgaenge: await countOpenVorgaenge(uid),
      overdueVorgaenge: await countOverdueVorgaenge(uid),
      neueEvents,
      ausstehendeFreigaben,
      featureFlags: getVerwalterFeatureFlags(),
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/verwalter/vorgaenge", requireVerwalterAuth, async (req, res) => {
  try {
    const objektId = req.query.objektId ? String(req.query.objektId) : undefined;
    const vorgaenge = await listVorgaenge(userId(req as any), objektId);
    res.json({ success: true, vorgaenge });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/api/verwalter/vorgaenge", requireVerwalterAuth, async (req, res) => {
  try {
    const body = req.body ?? {};
    const uid = userId(req as any);
    const objektId = String(body.objektId || "").trim();
    const obj = await getObjekt(uid, objektId);
    if (!obj) return res.status(400).json({ error: "Objekt nicht gefunden" });

    const vorgang = await createVorgang(uid, {
      objektId,
      objektName: obj.name,
      typ: body.typ || "sonstiges",
      titel: String(body.titel || "Neuer Vorgang"),
      beschreibung: body.beschreibung ? String(body.beschreibung) : undefined,
      status: body.status,
      faelligAm: body.faelligAm ? String(body.faelligAm) : undefined,
      relatedVorlageSlug: body.relatedVorlageSlug ? String(body.relatedVorlageSlug) : undefined,
    });
    const eventTyp = body.relatedVorlageSlug || body.faelligAm ? "frist.vorgang_angelegt" : "vorgang.angelegt";
    await logVerwalterEvent(uid, {
      typ: eventTyp,
      objektId,
      vorgangId: vorgang.id,
      payload: { titel: vorgang.titel, typ: vorgang.typ },
    });
    res.json({ success: true, vorgang });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.put("/api/verwalter/vorgaenge/:id", requireVerwalterAuth, async (req, res) => {
  try {
    const updated = await updateVorgang(userId(req as any), String(req.params.id), req.body ?? {});
    if (!updated) return res.status(404).json({ error: "Vorgang nicht gefunden" });
    res.json({ success: true, vorgang: updated });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/api/verwalter/fristen/batch-vorgaenge", requireVerwalterAuth, async (req, res) => {
  try {
    const body = req.body ?? {};
    const uid = userId(req as any);
    const objektId = String(body.objektId || "").trim();
    const startDate = String(body.startDate || new Date().toISOString().slice(0, 10));
    const obj = await getObjekt(uid, objektId);
    if (!obj) return res.status(400).json({ error: "Objekt nicht gefunden" });

    const inputs = buildFristBatchVorgaenge(
      objektId,
      startDate,
      Array.isArray(body.fristIds) ? body.fristIds.map(String) : undefined,
    );
    const vorgaenge = [];
    for (const input of inputs) {
      const vorgang = await createVorgang(uid, {
        objektId,
        objektName: obj.name,
        typ: input.typ,
        titel: input.titel,
        beschreibung: input.beschreibung,
        faelligAm: input.faelligAm,
        relatedVorlageSlug: input.relatedVorlageSlug,
      });
      vorgaenge.push(vorgang);
    }
    await logVerwalterEvent(uid, {
      typ: "fristen.batch_angelegt",
      objektId,
      payload: { count: vorgaenge.length, startDate },
    });
    res.json({ success: true, count: vorgaenge.length, vorgaenge });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/verwalter/events", requireVerwalterAuth, async (req, res) => {
  try {
    const status = req.query.status ? String(req.query.status) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : 50;
    const events = await listVerwalterEvents(userId(req as any), {
      status: status as any,
      limit,
    });
    res.json({ success: true, events });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/verwalter/freigaben", requireVerwalterAuth, async (req, res) => {
  try {
    const status = req.query.status ? String(req.query.status) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : 50;
    const freigaben = await listVerwalterFreigaben(userId(req as any), {
      status: status as any,
      limit,
    });
    res.json({ success: true, freigaben });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/api/verwalter/freigaben/:id/freigeben", requireVerwalterAuth, async (req, res) => {
  try {
    const uid = userId(req as any);
    const updated = await updateVerwalterFreigabeStatus(uid, String(req.params.id), "freigegeben");
    if (!updated) return res.status(404).json({ error: "Freigabe nicht gefunden" });
    await logVerwalterEvent(uid, {
      typ: "system.hinweis",
      objektId: updated.objektId,
      vorgangId: updated.vorgangId,
      payload: { action: "freigabe.freigegeben", freigabeId: updated.id },
    });
    res.json({ success: true, freigabe: updated });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/api/verwalter/freigaben/:id/ablehnen", requireVerwalterAuth, async (req, res) => {
  try {
    const uid = userId(req as any);
    const updated = await updateVerwalterFreigabeStatus(uid, String(req.params.id), "abgelehnt");
    if (!updated) return res.status(404).json({ error: "Freigabe nicht gefunden" });
    res.json({ success: true, freigabe: updated });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/verwalter/feature-flags", requireVerwalterAuth, async (_req, res) => {
  res.json({ success: true, flags: getVerwalterFeatureFlags() });
});

router.delete("/api/verwalter/vorgaenge/:id", requireVerwalterAuth, async (req, res) => {
  try {
    const ok = await deleteVorgang(userId(req as any), String(req.params.id));
    if (!ok) return res.status(404).json({ error: "Vorgang nicht gefunden" });
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/verwalter/buchungen", requireVerwalterAuth, async (req, res) => {
  try {
    const objektId = req.query.objektId ? String(req.query.objektId) : undefined;
    const periode = req.query.periode ? String(req.query.periode) : undefined;
    const buchungen = await listBuchungen(userId(req as any), { objektId, periode });
    res.json({ success: true, buchungen });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/api/verwalter/buchungen", requireVerwalterAuth, async (req, res) => {
  try {
    const body = req.body ?? {};
    const uid = userId(req as any);
    const objektId = String(body.objektId || "").trim();
    const obj = await getObjekt(uid, objektId);
    if (!obj) return res.status(400).json({ error: "Objekt nicht gefunden" });

    let einheitNr: string | undefined;
    if (body.einheitId) {
      einheitNr = obj.einheiten.find((e) => e.id === body.einheitId)?.nummer;
    }

    const buchung = await createBuchung(uid, {
      objektId,
      objektName: obj.name,
      datum: String(body.datum || ""),
      betrag: Number(body.betrag),
      sollKonto: String(body.sollKonto || ""),
      habenKonto: String(body.habenKonto || ""),
      buchungstext: String(body.buchungstext || ""),
      belegNr: body.belegNr ? String(body.belegNr) : undefined,
      einheitId: body.einheitId ? String(body.einheitId) : undefined,
      einheitNr,
      periode: body.periode ? String(body.periode) : undefined,
    });
    res.json({ success: true, buchung });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.put("/api/verwalter/buchungen/:id", requireVerwalterAuth, async (req, res) => {
  try {
    const updated = await updateBuchung(userId(req as any), String(req.params.id), req.body ?? {});
    if (!updated) return res.status(404).json({ error: "Buchung nicht gefunden" });
    res.json({ success: true, buchung: updated });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.delete("/api/verwalter/buchungen/:id", requireVerwalterAuth, async (req, res) => {
  try {
    const ok = await deleteBuchung(userId(req as any), String(req.params.id));
    if (!ok) return res.status(404).json({ error: "Buchung nicht gefunden" });
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/api/verwalter/buchungen/vorschlagen", requireVerwalterAuth, async (req, res) => {
  try {
    const body = req.body ?? {};
    const text = String(body.text || "").trim();
    const objektId = String(body.objektId || "").trim();
    const periode = String(body.periode || "").trim();
    if (!text || !objektId) return res.status(400).json({ error: "text und objektId erforderlich" });

    const uid = userId(req as any);
    const obj = await getObjekt(uid, objektId);
    if (!obj) return res.status(404).json({ error: "Objekt nicht gefunden" });

    const vorschlag = await suggestBuchung(text, obj, periode || new Date().toISOString().slice(0, 7));
    if (!vorschlag) {
      return res.status(422).json({
        error: "Konnte keine Buchung erkennen. Beispiel: „250 Euro Hausgeld WE 3 Müller“",
      });
    }
    res.json({ success: true, vorschlag });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/verwalter/buchungen/plausibilitaet", requireVerwalterAuth, async (req, res) => {
  try {
    const uid = userId(req as any);
    const objektId = String(req.query.objektId || "").trim();
    const periode = String(req.query.periode || "").trim();
    if (!objektId || !periode) {
      return res.status(400).json({ error: "objektId und periode erforderlich" });
    }
    const obj = await getObjekt(uid, objektId);
    if (!obj) return res.status(404).json({ error: "Objekt nicht gefunden" });
    const buchungen = await listBuchungen(uid, { objektId, periode });
    const hinweise = pruefeBuchungen(buchungen, obj, periode);
    res.json({
      success: true,
      hinweise,
      hasErrors: hatPlausibilitaetsFehler(hinweise),
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/verwalter/monatsabschluss", requireVerwalterAuth, async (req, res) => {
  try {
    const uid = userId(req as any);
    const objektId = String(req.query.objektId || "").trim();
    const periode = String(req.query.periode || "").trim();
    if (!objektId || !periode) {
      return res.status(400).json({ error: "objektId und periode erforderlich" });
    }
    const obj = await getObjekt(uid, objektId);
    if (!obj) return res.status(404).json({ error: "Objekt nicht gefunden" });
    const buchungen = await listBuchungen(uid, { objektId, periode });
    const schritte = buildMonatsabschluss({
      objekt: obj,
      buchungen,
      periode,
      openVorgaenge: await countOpenVorgaenge(uid),
      overdueVorgaenge: await countOverdueVorgaenge(uid),
    });
    res.json({ success: true, schritte });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/verwalter/export/datev-buchungen", requireVerwalterAuth, async (req, res) => {
  try {
    const uid = userId(req as any);
    const objektId = String(req.query.objektId || "").trim();
    const periode = String(req.query.periode || "").trim();
    if (!objektId || !periode) {
      return res.status(400).json({ error: "objektId und periode erforderlich" });
    }
    const obj = await getObjekt(uid, objektId);
    if (!obj) return res.status(404).json({ error: "Objekt nicht gefunden" });

    const buchungen = await listBuchungen(uid, { objektId, periode });
    const hinweise = pruefeBuchungen(buchungen, obj, periode);
    const force = req.query.force === "1";
    if (hatPlausibilitaetsFehler(hinweise) && !force) {
      return res.status(400).json({
        error: "Plausibilitätsfehler — Export blockiert. force=1 zum Überschreiben.",
        hinweise,
      });
    }
    const csv = buildDatevBuchungenCsv(buchungen, { objektName: obj.name, periode });
    const filename = `EXTF_Buchungen_${objektId}_${periode}.csv`;
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/verwalter/export/stammdaten-csv", requireVerwalterAuth, async (req, res) => {
  try {
    const objekte = await listObjekte(userId(req as any));
    const csv = buildStammdatenCsv(objekte);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="verwalter-stammdaten.csv"');
    res.send(csv);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/api/verwalter/assistent", requireVerwalterAuth, async (req, res) => {
  try {
    const body = req.body ?? {};
    const frage = String(body.frage || "").trim();
    if (!frage) return res.status(400).json({ error: "frage erforderlich" });
    if (frage.length > 1500) return res.status(400).json({ error: "frage zu lang" });

    const uid = userId(req as any);
    const seite = body.seite ? String(body.seite) : undefined;
    const objektId = body.objektId ? String(body.objektId) : undefined;

    const contextBlock = await buildVerwalterAssistentPrompt(uid, { seite, objektId });

    const history = Array.isArray(body.nachrichten)
      ? body.nachrichten
          .filter((n: { rolle?: string; text?: string }) => n?.text && (n.rolle === "user" || n.rolle === "assistant"))
          .slice(-6)
          .map((n: { rolle: string; text: string }) =>
            n.rolle === "assistant" ? `ASSISTENT: ${n.text}` : `NUTZER: ${n.text}`,
          )
          .join("\n")
      : "";

    const userPrompt = [
      history ? `Bisheriger Verlauf:\n${history}\n` : "",
      `KONTEXT:\n${contextBlock}`,
      "",
      `FRAGE DES NUTZERS:\n${frage}`,
      "",
      "Antworte auf Deutsch, strukturiert und für Laien verständlich. Max. 8 kurze Absätze oder Aufzählung.",
    ]
      .filter(Boolean)
      .join("\n");

    const result = await askLlmWithContinuation(VERWALTER_ASSISTENT_ROLLE, userPrompt, 2000, 2);

    let buchungsVorschlag = null;
    let resolvedObjektId = objektId;
    const periode = body.periode
      ? String(body.periode)
      : new Date().toISOString().slice(0, 7);

    if (!resolvedObjektId) {
      const objs = await listObjekte(uid);
      if (objs[0]) resolvedObjektId = objs[0].id;
    }

    if (resolvedObjektId && looksLikeBuchungsAnfrage(frage)) {
      const obj = await getObjekt(uid, resolvedObjektId);
      if (obj) {
        buchungsVorschlag = await suggestBuchung(frage, obj, periode);
      }
    }

    res.json({
      success: true,
      answer: result.text.trim(),
      provider: result.provider,
      complete: result.complete,
      buchungsVorschlag,
      objektId: resolvedObjektId,
      periode,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message || "Assistent nicht verfügbar" });
  }
});

router.post("/api/verwalter/ki-brief", requireVerwalterAuth, async (req, res) => {
  try {
    const { vorlageSlug, fieldValues, objektId, anweisung } = req.body ?? {};
    const slug = String(vorlageSlug || "").trim();
    const vorlage = getVorlageBySlug(slug);
    if (!vorlage) return res.status(400).json({ error: "Vorlage unbekannt" });

    let values: Record<string, string> = {};
    if (fieldValues && typeof fieldValues === "object") {
      for (const [k, v] of Object.entries(fieldValues)) {
        values[k] = String(v ?? "");
      }
    }

    if (objektId) {
      const obj = await getObjekt(userId(req as any), String(objektId));
      if (obj) {
        const { objektToVorlageDefaults } = await import("../shared/verwalterObjektTypes");
        values = { ...objektToVorlageDefaults(obj), ...values };
      }
    }

    const entwurf = renderVorlageBody(vorlage.body, values);
    const extra = anweisung ? String(anweisung).slice(0, 500) : "";

    const result = await askLlmWithContinuation(
      `Du bist Fachautor für WEG-Hausverwaltung in Deutschland.
Formuliere den Brief professionell, höflich und rechtssicher im Stil einer Hausverwaltung.
Keine Rechtsberatung. Paragraphen nur wenn im Entwurf genannt.
Ausgabe: nur der fertige Brieftext, keine Meta-Kommentare.`,
      [
        `Vorlage: ${vorlage.title}`,
        `Rechtshinweis: ${vorlage.legalHint}`,
        extra ? `Zusatzanweisung: ${extra}` : "",
        "",
        "ENTWURF:",
        entwurf,
        "",
        "Bitte den Brief verfeinern: klare Struktur, korrekte Anrede, vollständige Schlussformel.",
      ]
        .filter(Boolean)
        .join("\n"),
      2500,
      2,
    );

    const text = result.text.trim();
    const uid = userId(req as any);
    let freigabeId: string | undefined;
    try {
      const freigabe = await createVerwalterFreigabe(uid, {
        kind: "brief_entwurf",
        titel: `${vorlage.title} — KI-Entwurf`,
        objektId: objektId ? String(objektId) : undefined,
        payload: { text, vorlageSlug: slug, fieldValues: values },
      });
      freigabeId = freigabe.id;
      await logVerwalterEvent(uid, {
        typ: "freigabe.angelegt",
        objektId: objektId ? String(objektId) : undefined,
        payload: { freigabeId, kind: "brief_entwurf" },
      });
    } catch {
      /* Freigabe-Queue optional bis Migration 0044 */
    }

    res.json({
      success: true,
      text,
      provider: result.provider,
      complete: result.complete,
      freigabeId,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message || "KI-Brief fehlgeschlagen" });
  }
});

export { router as verwalterRouter };
