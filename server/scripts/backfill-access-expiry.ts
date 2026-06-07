/**
 * Backfill accessExpiresAt für Bestandskäufer (accessExpiresAt = NULL, enabledModules gesetzt).
 *
 * Usage:
 *   DATABASE_URL=... npx tsx server/scripts/backfill-access-expiry.ts --dry-run
 *   DATABASE_URL=... npx tsx server/scripts/backfill-access-expiry.ts --apply
 */
import mysql from "mysql2/promise";
import {
  computeAccessExpiry,
  includedMonthsForPurchase,
} from "../../shared/accessPolicy";

const GRACE_DAYS = 30;

async function main() {
  const apply = process.argv.includes("--apply");
  const dryRun = !apply;
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL fehlt");
    process.exit(1);
  }

  const conn = await mysql.createConnection({ uri: url, connectTimeout: 30000 });
  const [colRows] = await conn.query(
    `SELECT COUNT(*) as c FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'accessExpiresAt'`,
  ) as any;
  if (Number((colRows as any[])[0]?.c) === 0) {
    console.error("Spalte accessExpiresAt fehlt — Migration 0034 zuerst ausführen");
    await conn.end();
    process.exit(1);
  }

  const [users] = await conn.query(
    `SELECT id, email, enabledModules, accessExpiresAt, createdAt
     FROM users
     WHERE enabledModules IS NOT NULL AND enabledModules != '' AND accessExpiresAt IS NULL`,
  ) as any[];

  console.log(`Gefunden: ${(users as any[]).length} Nutzer ohne accessExpiresAt`);
  let updated = 0;

  for (const u of users as any[]) {
    const months = includedMonthsForPurchase(null, String(u.enabledModules || ""));
    const created = u.createdAt ? new Date(u.createdAt) : new Date();
    let next = computeAccessExpiry(null, months, created);
    const grace = new Date();
    grace.setDate(grace.getDate() + GRACE_DAYS);
    if (next < new Date()) next = grace;

    console.log(
      `${dryRun ? "[DRY]" : "[APPLY]"} id=${u.id} email=${u.email} modules=${u.enabledModules} → ${next.toISOString().slice(0, 10)} (+${months}mo)`,
    );

    if (apply) {
      await conn.query(
        "UPDATE users SET accessExpiresAt = ? WHERE id = ?",
        [next.toISOString().slice(0, 19).replace("T", " "), u.id],
      );
      updated++;
    }
  }

  await conn.end();
  console.log(dryRun ? "Dry-run beendet. --apply zum Schreiben." : `Fertig: ${updated} Nutzer aktualisiert.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
