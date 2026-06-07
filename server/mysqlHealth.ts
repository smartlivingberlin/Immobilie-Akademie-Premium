export type MysqlHealthResult = {
  ok: boolean;
  latencyMs: number;
  users?: number;
  error?: string;
};

export async function getMysqlHealth(): Promise<MysqlHealthResult> {
  const start = Date.now();
  try {
    const { getDb } = await import("./db");
    const db = await getDb();
    const [[row]] = (await db.execute("SELECT COUNT(*) as cnt FROM users")) as any;
    return {
      ok: true,
      latencyMs: Date.now() - start,
      users: Number(row?.cnt ?? 0),
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
