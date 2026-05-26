import { Router } from "express";
import { getDb } from "./db";
import { sql } from "drizzle-orm";
import { requireAdmin } from "./authMiddleware";

const router = Router();

router.get("/api/glossar", async (req, res) => {
  try {
    const db = await getDb();
    const cat = req.query.category as string | undefined;
    const q = req.query.q as string | undefined;
    let rows: any[];
    if (cat && q) {
      const like = "%"+q+"%";
      const r = await db.$client.query("SELECT * FROM glossar_terms WHERE category = ? AND (term LIKE ? OR definition LIKE ?) ORDER BY term ASC", [cat, like, like]);
      rows = (r as any)[0];
    } else if (cat) {
      const r = await db.$client.query("SELECT * FROM glossar_terms WHERE category = ? ORDER BY term ASC", [cat]);
      rows = (r as any)[0];
    } else if (q) {
      const like = "%"+q+"%";
      const r = await db.$client.query("SELECT * FROM glossar_terms WHERE term LIKE ? OR definition LIKE ? ORDER BY term ASC", [like, like]);
      rows = (r as any)[0];
    } else {
      const r = await db.$client.query("SELECT * FROM glossar_terms ORDER BY term ASC");
      rows = (r as any)[0];
    }
    const terms = rows;
    res.json({ terms, total: terms.length });
  } catch (e: any) {
    console.error("[Glossar] Fehler:", e.message);
    res.status(500).json({ error: "Glossar konnte nicht geladen werden" });
  }
});

router.get("/api/glossar/categories", async (_req, res) => {
  try {
    const db = await getDb();
    const r = await db.$client.query("SELECT category, COUNT(*) as count FROM glossar_terms GROUP BY category ORDER BY category");
    const rows = (r as any)[0];
    res.json({ categories: rows });
  } catch (e: any) {
    res.status(500).json({ error: "Kategorien konnten nicht geladen werden" });
  }
});


// ── Admin: Glossar verwalten (nur Admin) ─────────────────────
router.post("/api/admin/glossar", requireAdmin, async (req: any, res: any) => {
  try {
    const { term, definition, category, lawReference, lawLink } = req.body;
    if (!term || !definition || !category) return res.status(400).json({ error: "term, definition, category erforderlich" });
    const db = await getDb();
    await db.$client.query("INSERT INTO glossar_terms (term, definition, category, lawReference, lawLink) VALUES (?, ?, ?, ?, ?)", [term, definition, category, lawReference||null, lawLink||null]);
    res.json({ ok: true });
  } catch(e: any) { res.status(500).json({ error: e.message }); }
});

router.put("/api/admin/glossar/:id", requireAdmin, async (req: any, res: any) => {
  try {
    const id = Number(req.params.id);
    const { term, definition, category, lawReference, lawLink } = req.body;
    const db = await getDb();
    await db.$client.query("UPDATE glossar_terms SET term=?, definition=?, category=?, lawReference=?, lawLink=? WHERE id=?", [term, definition, category, lawReference||null, lawLink||null, id]);
    res.json({ ok: true });
  } catch(e: any) { res.status(500).json({ error: e.message }); }
});

router.delete("/api/admin/glossar/:id", requireAdmin, async (req: any, res: any) => {
  try {
    const id = Number(req.params.id);
    const db = await getDb();
    await db.$client.query("DELETE FROM glossar_terms WHERE id=?", [id]);
    res.json({ ok: true });
  } catch(e: any) { res.status(500).json({ error: e.message }); }
});

export { router as glossarRouter };
