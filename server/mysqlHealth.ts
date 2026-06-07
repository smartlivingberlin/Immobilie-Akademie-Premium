import { listMigrationFiles } from "../shared/migrationStatus";

export type MysqlHealthResult = {
  ok: boolean;
  latencyMs: number;
  users?: number;
  migrations?: { pending: number; total: number; lastApplied: string | null };
  error?: string;
};

export async function getMysqlHealth(): Promise<MysqlHealthResult> {
  const start = Date.now();
  try {
    const { getDb } = await import("./db");
    const db = await getDb();
    const [[row]] = (await db.execute("SELECT COUNT(*) as cnt FROM users")) as any;
    let migrations: MysqlHealthResult["migrations"];
    try {
      const total = listMigrationFiles().length;
      const [[appliedRow]] = (await db.execute(
        "SELECT COUNT(*) as cnt FROM schema_migrations",
      )) as any;
      const [[lastRow]] = (await db.execute(
        "SELECT filename FROM schema_migrations ORDER BY filename DESC LIMIT 1",
      )) as any;
      const applied = Number(appliedRow?.cnt ?? 0);
      migrations = {
        pending: Math.max(0, total - applied),
        total,
        lastApplied: lastRow?.filename ?? null,
      };
    } catch {
      /* schema_migrations optional during bootstrap */
    }

    return {
      ok: true,
      latencyMs: Date.now() - start,
      users: Number(row?.cnt ?? 0),
      migrations,
    };
  } catch (e: unknown) {
    const err = e as { message?: string };
    return {
      ok: false,
      latencyMs: Date.now() - start,
      error: err?.message || "MySQL unavailable",
    };
  }
}
