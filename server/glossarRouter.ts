import { Router } from "express";
import { getDb } from "./db";
import { sql } from "drizzle-orm";
import { requireAdmin } from "./_core/index";

const router = Router();

router.get("/api/glossar", async (req, res) => {
  try {
    const db = await getDb();
    const cat = req.query.category as string | undefined;
    const q = req.query.q as string | undefined;
    let rows: any[];
    if (cat && q) {
      const like = "%"+q+"%";
      const r = await db.execute(sql`SELECT * FROM glossar_terms WHERE category = ${cat} AND (term LIKE ${like} OR definition LIKE ${like}) ORDER BY term ASC`);
      rows = r as any[];
    } else if (cat) {
      const r = await db.execute(sql`SELECT * FROM glossar_terms WHERE category = ${cat} ORDER BY term ASC`);
      rows = r as any[];
    } else if (q) {
      const like = "%"+q+"%";
      const r = await db.execute(sql`SELECT * FROM glossar_terms WHERE term LIKE ${like} OR definition LIKE ${like} ORDER BY term ASC`);
      rows = r as any[];
    } else {
      const r = await db.execute(sql`SELECT * FROM glossar_terms ORDER BY term ASC`);
      rows = r as any[];
    }
    const terms = Array.isArray(rows[0]) ? rows[0] : rows;
    res.json({ terms, total: terms.length });
  } catch (e: any) {
    console.error("[Glossar] Fehler:", e.message);
    res.status(500).json({ error: "Glossar konnte nicht geladen werden" });
  }
});

router.get("/api/glossar/categories", async (_req, res) => {
  try {
    const db = await getDb();
    const r = await db.execute(sql`SELECT category, COUNT(*) as count FROM glossar_terms GROUP BY category ORDER BY category`);
    const rows = Array.isArray(r[0]) ? r[0] : r;
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
    await db.execute(sql`INSERT INTO glossar_terms (term, definition, category, lawReference, lawLink) VALUES (${term}, ${definition}, ${category}, ${lawReference||null}, ${lawLink||null})`);
    res.json({ ok: true });
  } catch(e: any) { res.status(500).json({ error: e.message }); }
});

router.put("/api/admin/glossar/:id", requireAdmin, async (req: any, res: any) => {
  try {
    const id = Number(req.params.id);
    const { term, definition, category, lawReference, lawLink } = req.body;
    const db = await getDb();
    await db.execute(sql`UPDATE glossar_terms SET term=${term}, definition=${definition}, category=${category}, lawReference=${lawReference||null}, lawLink=${lawLink||null} WHERE id=${id}`);
    res.json({ ok: true });
  } catch(e: any) { res.status(500).json({ error: e.message }); }
});

router.delete("/api/admin/glossar/:id", requireAdmin, async (req: any, res: any) => {
  try {
    const id = Number(req.params.id);
    const db = await getDb();
    await db.execute(sql`DELETE FROM glossar_terms WHERE id=${id}`);
    res.json({ ok: true });
  } catch(e: any) { res.status(500).json({ error: e.message }); }
});

export { router as glossarRouter };
