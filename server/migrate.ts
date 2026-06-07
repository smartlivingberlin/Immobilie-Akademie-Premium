import mysql from "mysql2/promise";
import { logger } from "./_core/logger";
import {
  buildMigrationStatus,
  listMigrationFiles,
  type MigrationStatus,
} from "../shared/migrationStatus";

const STRICT =
  process.env.MIGRATION_STRICT === "true" ||
  (process.env.MIGRATION_STRICT !== "false" && process.env.NODE_ENV === "production");

function isIdempotentMigrationError(message: string): boolean {
  return message.includes("already exists") || message.includes("Duplicate");
}

async function ensureMigrationLedger(conn: mysql.Connection): Promise<void> {
  await conn.query(
    `CREATE TABLE IF NOT EXISTS schema_migrations (
      filename varchar(255) NOT NULL PRIMARY KEY,
      appliedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
  );
}

async function isMigrationApplied(conn: mysql.Connection, file: string): Promise<boolean> {
  const [rows] = (await conn.query(
    "SELECT filename FROM schema_migrations WHERE filename = ? LIMIT 1",
    [file],
  )) as [Array<{ filename: string }>, unknown];
  return rows.length > 0;
}

async function markMigrationApplied(conn: mysql.Connection, file: string): Promise<void> {
  await conn.query("INSERT IGNORE INTO schema_migrations (filename) VALUES (?)", [file]);
}

async function listAppliedMigrations(conn: mysql.Connection): Promise<Set<string>> {
  const [rows] = (await conn.query(
    "SELECT filename FROM schema_migrations ORDER BY filename",
  )) as [Array<{ filename: string }>, unknown];
  return new Set(rows.map((r) => r.filename));
}

export async function getMigrationStatus(): Promise<MigrationStatus | null> {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  const conn = await mysql.createConnection({ uri: url, connectTimeout: 30000 });
  try {
    await ensureMigrationLedger(conn);
    const files = listMigrationFiles();
    const applied = await listAppliedMigrations(conn);
    return buildMigrationStatus(files, applied);
  } finally {
    await conn.end();
  }
}

export async function runMigrations(): Promise<{
  applied: number;
  skipped: number;
  failed: string[];
  status: MigrationStatus | null;
}> {
  const url = process.env.DATABASE_URL;
  if (!url) return { applied: 0, skipped: 0, failed: [], status: null };

  const { readFileSync } = await import("fs");
  const { join } = await import("path");
  const conn = await mysql.createConnection({
    uri: url,
    connectTimeout: 30000,
    multipleStatements: true,
  });

  let applied = 0;
  let skipped = 0;
  const failed: string[] = [];

  try {
    await ensureMigrationLedger(conn);
    const files = listMigrationFiles();
    const dir = join(process.cwd(), "drizzle/migrations");

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
        const msg = String(e?.message || e);
        if (isIdempotentMigrationError(msg)) {
          await markMigrationApplied(conn, file);
          skipped++;
          logger.debug("[DB] Migration skip (exists)", { file });
        } else {
          failed.push(file);
          logger.warn("[DB] Migration warn", { file, detail: msg.slice(0, 300) });
          if (STRICT) throw new Error(`Migration failed: ${file} — ${msg.slice(0, 200)}`);
        }
      }
    }

    const appliedSet = await listAppliedMigrations(conn);
    const status = buildMigrationStatus(files, appliedSet);
    logger.info("[DB] Migrationen abgeschlossen", {
      applied,
      skipped,
      failed: failed.length,
      pending: status.pending,
      total: status.total,
    });

    if (failed.length > 0 && STRICT) {
      throw new Error(`Migrations failed: ${failed.join(", ")}`);
    }

    return { applied, skipped, failed, status };
  } finally {
    await conn.end();
  }
}
