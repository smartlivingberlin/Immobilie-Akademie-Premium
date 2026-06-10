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
import { getVorlageBySlug, renderVorlageBody } from "../shared/verwalterVorlagen";

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
  const ok = deleteObjekt(userId(req as any), String(req.params.id));
  if (!ok) return res.status(404).json({ error: "Objekt nicht gefunden" });
  res.json({ success: true });
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
