import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";

export async function runMigrations() {
  const url = process.env.DATABASE_URL;
  if (!url) return;
  try {
    const isExternal = url.includes("rlwy.net") || url.includes("proxy.railway");
    const connection = await mysql.createConnection({
      uri: url,
      ...(isExternal ? { ssl: { rejectUnauthorized: false } } : {}),
      connectTimeout: 30000,
    });
    const db = drizzle(connection);
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("[DB] ✅ Migrationen erfolgreich");
    await connection.end();
  } catch (err: any) {
    console.warn("[DB] Migration übersprungen:", err.message);
  }
}
