/**
 * Einmalig auf Railway/Prod ausführen, wenn schema_migrations leer ist
 * aber die DB bereits alle Tabellen hat.
 *
 * Usage:
 *   pnpm run db:backfill-migrations -- --dry-run
 *   pnpm run db:backfill-migrations -- --apply
 */
import mysql from "mysql2/promise";
import { listMigrationFiles } from "../../shared/migrationStatus";

const dryRun = !process.argv.includes("--apply");

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL fehlt");
    process.exit(1);
  }

  const until = process.argv.find((a) => a.startsWith("--until="))?.split("=")[1];
  const files = listMigrationFiles();
  const target = until ? files.filter((f) => f <= until) : files;

  const conn = await mysql.createConnection({ uri: url, connectTimeout: 30000 });
  await conn.query(
    `CREATE TABLE IF NOT EXISTS schema_migrations (
      filename varchar(255) NOT NULL PRIMARY KEY,
      appliedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
  );

  const [existing] = (await conn.query(
    "SELECT filename FROM schema_migrations",
  )) as [Array<{ filename: string }>, unknown];
  const have = new Set(existing.map((r) => r.filename));
  const missing = target.filter((f) => !have.has(f));

  console.log(`Backfill ${dryRun ? "(dry-run)" : "(apply)"}: ${missing.length} Einträge`);
  for (const file of missing) console.log(`  + ${file}`);

  if (!dryRun && missing.length > 0) {
    for (const file of missing) {
      await conn.query("INSERT IGNORE INTO schema_migrations (filename) VALUES (?)", [file]);
    }
    console.log("Fertig.");
  } else if (dryRun) {
    console.log("Mit --apply ausführen, um zu schreiben.");
  }

  await conn.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
