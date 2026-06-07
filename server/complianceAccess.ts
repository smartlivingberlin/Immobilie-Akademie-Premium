import { columnExists } from "./accessExpiry";

export async function getUserComplianceExpiresAt(
  db: { $client: { query: Function } },
  userId: number,
): Promise<Date | null> {
  if (!(await columnExists(db, "complianceExpiresAt"))) return null;
  const [rows] = await db.$client.query(
    "SELECT complianceExpiresAt FROM users WHERE id = ? LIMIT 1",
    [userId],
  ) as [{ complianceExpiresAt: string | null }[]];
  const raw = (rows as any[])[0]?.complianceExpiresAt;
  return raw ? new Date(raw) : null;
}

export async function extendComplianceAccess(
  db: { $client: { query: Function } },
  userId: number,
  months = 12,
): Promise<Date | null> {
  if (!(await columnExists(db, "complianceExpiresAt"))) return null;
  const current = await getUserComplianceExpiresAt(db, userId);
  const base = current && current > new Date() ? current : new Date();
  const next = new Date(base);
  next.setMonth(next.getMonth() + months);
  await db.$client.query(
    "UPDATE users SET complianceExpiresAt = ?, trialExpiresAt = NULL WHERE id = ?",
    [next.toISOString().slice(0, 19).replace("T", " "), userId],
  );
  return next;
}
