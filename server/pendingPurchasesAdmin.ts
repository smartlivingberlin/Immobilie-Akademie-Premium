async function tableExists(db: { $client: { query: Function } }, table: string): Promise<boolean> {
  try {
    const [rows] = await db.$client.query(
      `SELECT COUNT(*) as c FROM information_schema.TABLES
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
      [table],
    ) as any;
    return Number((rows as any[])[0]?.c) > 0;
  } catch {
    return false;
  }
}

export type PendingPurchaseRow = {
  id: number;
  email: string;
  sessionId: string;
  modules: string;
  productId: string | null;
  createdAt: string;
  claimedAt: string | null;
};

export async function listPendingPurchases(
  db: { $client: { query: Function } },
  options?: { unclaimedOnly?: boolean },
): Promise<PendingPurchaseRow[]> {
  if (!(await tableExists(db, "pending_purchases"))) return [];

  const unclaimedOnly = options?.unclaimedOnly !== false;
  const where = unclaimedOnly ? "WHERE claimedAt IS NULL" : "";
  const [rows] = await db.$client.query(
    `SELECT id, email, sessionId, modules, productId, createdAt, claimedAt
     FROM pending_purchases ${where}
     ORDER BY createdAt DESC LIMIT 50`,
  ) as any;

  return (rows as any[]).map((r) => ({
    id: r.id,
    email: r.email,
    sessionId: r.sessionId,
    modules: r.modules,
    productId: r.productId || null,
    createdAt: new Date(r.createdAt).toISOString(),
    claimedAt: r.claimedAt ? new Date(r.claimedAt).toISOString() : null,
  }));
}
