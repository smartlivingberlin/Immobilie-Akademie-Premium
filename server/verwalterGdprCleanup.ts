import { unlink } from "node:fs/promises";
import { join } from "node:path";

const FILE_DIRS = ["verwalter-objekte", "verwalter-vorgaenge", "verwalter-buchungen"] as const;

/** Art. 17 DSGVO — Verwalter-Suite-Daten (MySQL + optional File-Store). */
export async function deleteVerwalterUserData(db: { $client: { query: (sql: string, params: unknown[]) => Promise<unknown> } }, userId: number) {
  const tables = [
    "verwalter_freigaben",
    "verwalter_events",
    "verwalter_inbox_messages",
    "verwalter_buchungen",
    "verwalter_vorgaenge",
    "verwalter_objekte",
  ] as const;
  for (const table of tables) {
    await db.$client.query(`DELETE FROM ${table} WHERE userId = ?`, [userId]).catch(() => {});
  }

  for (const dir of FILE_DIRS) {
    const path = join(process.cwd(), "data", dir, `user-${userId}.json`);
    await unlink(path).catch(() => {});
  }
}
