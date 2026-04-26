import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export async function runMigrations() {
  const url = process.env.DATABASE_URL;
  if (!url) return;
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const migrationsFolder = join(process.cwd(), "drizzle/migrations");
    console.log("[DB] Migrations-Pfad:", migrationsFolder);
    const connection = await mysql.createConnection({
      uri: url,
      connectTimeout: 30000,
    });
    const db = drizzle(connection);
    await migrate(db, { migrationsFolder });
    console.log("[DB] Migrationen erfolgreich");
    // Patch: fehlende Spalten direkt hinzufügen
    const patchSql = [
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS enabledModules varchar(255) NOT NULL DEFAULT '1'",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS onboardingCompleted tinyint(1) NOT NULL DEFAULT 0",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS learningGoal varchar(255) NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS dailyMinutes int NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS preferredTime varchar(100) NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS experienceLevel varchar(100) NULL",
    ];
    for (const s of patchSql) {
      try { await connection.query(s); } catch(e:any) { if (!e.message.includes('Duplicate')) console.warn('[DB] Patch:', e.message); }
    }
    console.log("[DB] Spalten-Patch abgeschlossen");
    await connection.end();
  } catch (err: any) {
    console.warn("[DB] Migration:", err.message);
  }
}
