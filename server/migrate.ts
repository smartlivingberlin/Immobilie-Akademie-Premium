import mysql from "mysql2/promise";
import { logger } from "./_core/logger";

export async function runMigrations() {
  const url = process.env.DATABASE_URL;
  if (!url) return;
  try {
    const conn = await mysql.createConnection({ uri: url, connectTimeout: 30000, multipleStatements: true });
    const { readFileSync, readdirSync } = await import("fs");
    const { join } = await import("path");
    const dir = join(process.cwd(), "drizzle/migrations");
    const files = readdirSync(dir).filter(f => f.endsWith(".sql")).sort();
    for (const file of files) {
      try {
        const sql = readFileSync(join(dir, file), "utf8");
        await conn.query(sql);
        logger.info("[DB] Migration OK", { file });
      } catch(e:any) {
        if (e.message.includes("already exists") || e.message.includes("Duplicate")) {
          logger.debug("[DB] Migration skip (exists)", { file });
        } else {
          logger.warn("[DB] Migration warn", { file, detail: e.message.slice(0, 300) });
        }
      }
    }
    await conn.end();
    logger.info("[DB] Alle Migrationen abgeschlossen");
  } catch (err: any) {
    logger.warn("[DB] Migration Fehler", { error: err.message });
  }
}
