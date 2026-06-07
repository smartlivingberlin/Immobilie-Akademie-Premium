/**
 * Backfill accessExpiresAt für Bestandskäufer (CLI).
 *
 * Usage:
 *   DATABASE_URL=... npx tsx server/scripts/backfill-access-expiry.ts
 *   DATABASE_URL=... npx tsx server/scripts/backfill-access-expiry.ts --apply
 */
import mysql from "mysql2/promise";
import { backfillAccessExpiresAt } from "../backfillAccess";

async function main() {
  const apply = process.argv.includes("--apply");
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL fehlt");
    process.exit(1);
  }

  const conn = await mysql.createConnection({ uri: url, connectTimeout: 30000 });
  const db = { $client: { query: conn.query.bind(conn) } };

  try {
    const result = await backfillAccessExpiresAt(db, { dryRun: !apply });
    for (const row of result.rows) {
      console.log(
        `${result.dryRun ? "[DRY]" : "[APPLY]"} id=${row.id} email=${row.email} modules=${row.modules} → ${row.newExpiry}`,
      );
    }
    console.log(
      result.dryRun
        ? `Dry-run: ${result.candidates} Kandidaten. --apply zum Schreiben.`
        : `Fertig: ${result.updated} Nutzer aktualisiert.`,
    );
  } finally {
    await conn.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
