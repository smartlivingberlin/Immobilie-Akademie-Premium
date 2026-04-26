import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";

export async function runMigrations() {
  const url = process.env.DATABASE_URL;
  if (!url) return;
  try {
    const connection = await mysql.createConnection({
      uri: url,
      connectTimeout: 30000,
    });
    const db = drizzle(connection);
    await migrate(db, { migrationsFolder: "./drizzle/migrations" });
    console.log("[DB] Migrationen erfolgreich");
    await connection.end();
  } catch (err: any) {
    console.warn("[DB] Migration:", err.message);
  }
}
