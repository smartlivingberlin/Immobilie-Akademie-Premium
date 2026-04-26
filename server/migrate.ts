import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { migrate } from "drizzle-orm/mysql2/migrator";

export async function runMigrations() {
  if (!process.env.DATABASE_URL) return;
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    const db = drizzle(connection);
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("[DB] Migrationen erfolgreich");
    await connection.end();
  } catch (err: any) {
    console.warn("[DB] Migration übersprungen:", err.message);
  }
}
