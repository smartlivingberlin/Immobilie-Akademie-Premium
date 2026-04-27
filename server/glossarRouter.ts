import { Router } from "express";
import { getDb } from "./db";

const router = Router();

router.get("/api/glossar", async (req, res) => {
  try {
    const db = getDb();
    const cat = req.query.category as string | undefined;
    const q = req.query.q as string | undefined;
    let sql = "SELECT * FROM glossar_terms";
    const params: any[] = [];
    if (cat && q) {
      sql += " WHERE category = ? AND (term LIKE ? OR definition LIKE ?)";
      params.push(cat, "%"+q+"%", "%"+q+"%");
    } else if (cat) {
      sql += " WHERE category = ?";
      params.push(cat);
    } else if (q) {
      sql += " WHERE term LIKE ? OR definition LIKE ?";
      params.push("%"+q+"%", "%"+q+"%");
    }
    sql += " ORDER BY term ASC";
    const [rows] = await db.execute(sql, params) as any;
    res.json({ terms: rows, total: rows.length });
  } catch (e: any) {
    console.error("[Glossar] Fehler:", e.message);
    res.status(500).json({ error: "Glossar konnte nicht geladen werden" });
  }
});

router.get("/api/glossar/categories", async (_req, res) => {
  try {
    const db = getDb();
    const [rows] = await db.execute(
      "SELECT category, COUNT(*) as count FROM glossar_terms GROUP BY category ORDER BY category"
    ) as any;
    res.json({ categories: rows });
  } catch (e: any) {
    res.status(500).json({ error: "Kategorien konnten nicht geladen werden" });
  }
});

export { router as glossarRouter };