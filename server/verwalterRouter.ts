import { Router } from "express";
import { requireAuth } from "./authMiddleware";
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
import { VERWALTER_ASSISTENT_ROLLE } from "../shared/verwalterAssistentKnowledge";
import {
  hatPlausibilitaetsFehler,
  pruefeBuchungen,
} from "../shared/verwalterBuchungPlausibilitaet";
import { buildMonatsabschluss } from "../shared/verwalterMonatsabschluss";

const router = Router();

function userId(req: { currentUser?: { id?: number } }): number {
  const id = req.currentUser?.id;
  if (!id) throw new Error("Nutzer-ID fehlt");
  return id;
}

router.get("/api/verwalter/objekte", requireAuth, (req, res) => {
  try {
    const objekte = listObjekte(userId(req as any));
    res.json({ success: true, objekte });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/verwalter/objekte/:id", requireAuth, (req, res) => {
  const obj = getObjekt(userId(req as any), String(req.params.id));
  if (!obj) return res.status(404).json({ error: "Objekt nicht gefunden" });
  res.json({ success: true, objekt: obj });
});

router.post("/api/verwalter/objekte", requireAuth, (req, res) => {
  try {
    const body = req.body ?? {};
    if (!body.name?.trim() || !body.adresse?.trim()) {
      return res.status(400).json({ error: "name und adresse erforderlich" });
    }
    const objekt = createObjekt(userId(req as any), {
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

router.put("/api/verwalter/objekte/:id", requireAuth, (req, res) => {
  const updated = updateObjekt(userId(req as any), String(req.params.id), req.body ?? {});
  if (!updated) return res.status(404).json({ error: "Objekt nicht gefunden" });
  res.json({ success: true, objekt: updated });
});

router.delete("/api/verwalter/objekte/:id", requireAuth, (req, res) => {
  const uid = userId(req as any);
  const id = String(req.params.id);
  deleteVorgaengeByObjekt(uid, id);
  deleteBuchungenByObjekt(uid, id);
  const ok = deleteObjekt(uid, id);
  if (!ok) return res.status(404).json({ error: "Objekt nicht gefunden" });
  res.json({ success: true });
});

router.get("/api/verwalter/dashboard", requireAuth, (req, res) => {
  try {
    const uid = userId(req as any);
    const objekte = listObjekte(uid);
    res.json({
      success: true,
      objekteCount: objekte.length,
      openVorgaenge: countOpenVorgaenge(uid),
      overdueVorgaenge: countOverdueVorgaenge(uid),
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/verwalter/vorgaenge", requireAuth, (req, res) => {
  try {
    const objektId = req.query.objektId ? String(req.query.objektId) : undefined;
    const vorgaenge = listVorgaenge(userId(req as any), objektId);
    res.json({ success: true, vorgaenge });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/api/verwalter/vorgaenge", requireAuth, (req, res) => {
  try {
    const body = req.body ?? {};
    const uid = userId(req as any);
    const objektId = String(body.objektId || "").trim();
    const obj = getObjekt(uid, objektId);
    if (!obj) return res.status(400).json({ error: "Objekt nicht gefunden" });

    const vorgang = createVorgang(uid, {
      objektId,
      objektName: obj.name,
      typ: body.typ || "sonstiges",
      titel: String(body.titel || "Neuer Vorgang"),
      beschreibung: body.beschreibung ? String(body.beschreibung) : undefined,
      status: body.status,
      faelligAm: body.faelligAm ? String(body.faelligAm) : undefined,
      relatedVorlageSlug: body.relatedVorlageSlug ? String(body.relatedVorlageSlug) : undefined,
    });
    res.json({ success: true, vorgang });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.put("/api/verwalter/vorgaenge/:id", requireAuth, (req, res) => {
  const updated = updateVorgang(userId(req as any), String(req.params.id), req.body ?? {});
  if (!updated) return res.status(404).json({ error: "Vorgang nicht gefunden" });
  res.json({ success: true, vorgang: updated });
});

router.delete("/api/verwalter/vorgaenge/:id", requireAuth, (req, res) => {
  const ok = deleteVorgang(userId(req as any), String(req.params.id));
  if (!ok) return res.status(404).json({ error: "Vorgang nicht gefunden" });
  res.json({ success: true });
});

router.get("/api/verwalter/buchungen", requireAuth, (req, res) => {
  try {
    const objektId = req.query.objektId ? String(req.query.objektId) : undefined;
    const periode = req.query.periode ? String(req.query.periode) : undefined;
    const buchungen = listBuchungen(userId(req as any), { objektId, periode });
    res.json({ success: true, buchungen });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/api/verwalter/buchungen", requireAuth, (req, res) => {
  try {
    const body = req.body ?? {};
    const uid = userId(req as any);
    const objektId = String(body.objektId || "").trim();
    const obj = getObjekt(uid, objektId);
    if (!obj) return res.status(400).json({ error: "Objekt nicht gefunden" });

    let einheitNr: string | undefined;
    if (body.einheitId) {
      einheitNr = obj.einheiten.find((e) => e.id === body.einheitId)?.nummer;
    }

    const buchung = createBuchung(uid, {
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

router.put("/api/verwalter/buchungen/:id", requireAuth, (req, res) => {
  try {
    const updated = updateBuchung(userId(req as any), String(req.params.id), req.body ?? {});
    if (!updated) return res.status(404).json({ error: "Buchung nicht gefunden" });
    res.json({ success: true, buchung: updated });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.delete("/api/verwalter/buchungen/:id", requireAuth, (req, res) => {
  const ok = deleteBuchung(userId(req as any), String(req.params.id));
  if (!ok) return res.status(404).json({ error: "Buchung nicht gefunden" });
  res.json({ success: true });
});

router.post("/api/verwalter/buchungen/vorschlagen", requireAuth, async (req, res) => {
  try {
    const body = req.body ?? {};
    const text = String(body.text || "").trim();
    const objektId = String(body.objektId || "").trim();
    const periode = String(body.periode || "").trim();
    if (!text || !objektId) return res.status(400).json({ error: "text und objektId erforderlich" });

    const uid = userId(req as any);
    const obj = getObjekt(uid, objektId);
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

router.get("/api/verwalter/buchungen/plausibilitaet", requireAuth, (req, res) => {
  try {
    const uid = userId(req as any);
    const objektId = String(req.query.objektId || "").trim();
    const periode = String(req.query.periode || "").trim();
    if (!objektId || !periode) {
      return res.status(400).json({ error: "objektId und periode erforderlich" });
    }
    const obj = getObjekt(uid, objektId);
    if (!obj) return res.status(404).json({ error: "Objekt nicht gefunden" });
    const buchungen = listBuchungen(uid, { objektId, periode });
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

router.get("/api/verwalter/monatsabschluss", requireAuth, (req, res) => {
  try {
    const uid = userId(req as any);
    const objektId = String(req.query.objektId || "").trim();
    const periode = String(req.query.periode || "").trim();
    if (!objektId || !periode) {
      return res.status(400).json({ error: "objektId und periode erforderlich" });
    }
    const obj = getObjekt(uid, objektId);
    if (!obj) return res.status(404).json({ error: "Objekt nicht gefunden" });
    const buchungen = listBuchungen(uid, { objektId, periode });
    const schritte = buildMonatsabschluss({
      objekt: obj,
      buchungen,
      periode,
      openVorgaenge: countOpenVorgaenge(uid),
      overdueVorgaenge: countOverdueVorgaenge(uid),
    });
    res.json({ success: true, schritte });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/api/verwalter/export/datev-buchungen", requireAuth, (req, res) => {
  try {
    const uid = userId(req as any);
    const objektId = String(req.query.objektId || "").trim();
    const periode = String(req.query.periode || "").trim();
    if (!objektId || !periode) {
      return res.status(400).json({ error: "objektId und periode erforderlich" });
    }
    const obj = getObjekt(uid, objektId);
    if (!obj) return res.status(404).json({ error: "Objekt nicht gefunden" });

    const buchungen = listBuchungen(uid, { objektId, periode });
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

router.get("/api/verwalter/export/stammdaten-csv", requireAuth, (req, res) => {
  try {
    const objekte = listObjekte(userId(req as any));
    const csv = buildStammdatenCsv(objekte);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="verwalter-stammdaten.csv"');
    res.send(csv);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/api/verwalter/assistent", requireAuth, async (req, res) => {
  try {
    const body = req.body ?? {};
    const frage = String(body.frage || "").trim();
    if (!frage) return res.status(400).json({ error: "frage erforderlich" });
    if (frage.length > 1500) return res.status(400).json({ error: "frage zu lang" });

    const uid = userId(req as any);
    const seite = body.seite ? String(body.seite) : undefined;
    const objektId = body.objektId ? String(body.objektId) : undefined;

    const contextBlock = buildVerwalterAssistentPrompt(uid, { seite, objektId });

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

    res.json({
      success: true,
      answer: result.text.trim(),
      provider: result.provider,
      complete: result.complete,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message || "Assistent nicht verfügbar" });
  }
});

router.post("/api/verwalter/ki-brief", requireAuth, async (req, res) => {
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
      const obj = getObjekt(userId(req as any), String(objektId));
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

    res.json({
      success: true,
      text: result.text.trim(),
      provider: result.provider,
      complete: result.complete,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message || "KI-Brief fehlgeschlagen" });
  }
});

export { router as verwalterRouter };
