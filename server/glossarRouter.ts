import { Router } from "express";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

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

export { router as glossarRouter };
