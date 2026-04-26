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
    const migrationsFolder = join(__dirname, "../../drizzle/migrations");
    console.log("[DB] Migrations-Pfad:", migrationsFolder);
    const connection = await mysql.createConnection({
      uri: url,
      connectTimeout: 30000,
    });
    const db = drizzle(connection);
    await migrate(db, { migrationsFolder });
    console.log("[DB] Migrationen erfolgreich");
    await connection.end();
  } catch (err: any) {
    console.warn("[DB] Migration:", err.message);
  }
}
