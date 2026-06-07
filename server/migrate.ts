import mysql from "mysql2/promise";
import { logger } from "./_core/logger";

async function ensureMigrationLedger(conn: mysql.Connection): Promise<boolean> {
  try {
    await conn.query(
      `CREATE TABLE IF NOT EXISTS schema_migrations (
        filename varchar(255) NOT NULL PRIMARY KEY,
        appliedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    );
    return true;
  } catch {
    return false;
  }
}

async function isMigrationApplied(conn: mysql.Connection, file: string): Promise<boolean> {
  try {
    const [rows] = await conn.query(
      "SELECT filename FROM schema_migrations WHERE filename = ? LIMIT 1",
      [file],
    ) as [Array<{ filename: string }>, unknown];
    return (rows as Array<{ filename: string }>).length > 0;
  } catch {
    return false;
  }
}

async function markMigrationApplied(conn: mysql.Connection, file: string): Promise<void> {
  try {
    await conn.query(
      "INSERT IGNORE INTO schema_migrations (filename) VALUES (?)",
      [file],
    );
  } catch {
    /* ledger optional during bootstrap */
  }
}

export async function runMigrations() {
  const url = process.env.DATABASE_URL;
  if (!url) return;
  try {
    const conn = await mysql.createConnection({ uri: url, connectTimeout: 30000, multipleStatements: true });
    await ensureMigrationLedger(conn);

    const { readFileSync, readdirSync } = await import("fs");
    const { join } = await import("path");
    const dir = join(process.cwd(), "drizzle/migrations");
    const files = readdirSync(dir).filter(f => f.endsWith(".sql")).sort();

    let applied = 0;
    let skipped = 0;

    for (const file of files) {
      if (await isMigrationApplied(conn, file)) {
        skipped++;
        continue;
      }

      const sql = readFileSync(join(dir, file), "utf8");
      try {
        await conn.query(sql);
        await markMigrationApplied(conn, file);
        applied++;
        logger.info("[DB] Migration OK", { file });
      } catch (e: any) {
        if (e.message?.includes("already exists") || e.message?.includes("Duplicate")) {
          await markMigrationApplied(conn, file);
          skipped++;
          logger.debug("[DB] Migration skip (exists)", { file });
        } else {
          logger.warn("[DB] Migration warn", { file, detail: e.message?.slice(0, 300) });
        }
      }
    }

    await conn.end();
    logger.info("[DB] Migrationen abgeschlossen", { applied, skipped, total: files.length });
  } catch (err: any) {
    logger.warn("[DB] Migration Fehler", { error: err.message });
  }
}
