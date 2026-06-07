import {
  computeAccessExpiry,
  includedMonthsForPurchase,
  addMonths,
} from "../shared/accessPolicy";

export async function columnExists(db: { $client: { query: Function } }, column: string): Promise<boolean> {
  try {
    const [rows] = await db.$client.query(
      `SELECT COUNT(*) as c FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = ?`,
      [column],
    ) as [{ c: number }[]];
    return Number((rows as any[])[0]?.c) > 0;
  } catch {
    return false;
  }
}

export async function getUserAccessExpiresAt(
  db: { $client: { query: Function } },
  userId: number,
): Promise<Date | null> {
  if (!(await columnExists(db, "accessExpiresAt"))) return null;
  const [rows] = await db.$client.query(
    "SELECT accessExpiresAt FROM users WHERE id = ? LIMIT 1",
    [userId],
  ) as [{ accessExpiresAt: string | null }[]];
  const raw = (rows as any[])[0]?.accessExpiresAt;
  return raw ? new Date(raw) : null;
}

export async function extendUserAccess(
  db: { $client: { query: Function } },
  userId: number,
  includedMonths: number,
): Promise<Date | null> {
  if (!(await columnExists(db, "accessExpiresAt"))) return null;
  const current = await getUserAccessExpiresAt(db, userId);
  const next = computeAccessExpiry(current, includedMonths);
  await db.$client.query(
    "UPDATE users SET accessExpiresAt = ? WHERE id = ?",
    [next.toISOString().slice(0, 19).replace("T", " "), userId],
  );
  return next;
}

export async function extendUserAccessFromPurchase(
  db: { $client: { query: Function } },
  userId: number,
  productId: string | null | undefined,
  modulesCsv: string,
): Promise<Date | null> {
  const months = includedMonthsForPurchase(productId ?? undefined, modulesCsv);
  return extendUserAccess(db, userId, months);
}

export async function extendUserAccessByDays(
  db: { $client: { query: Function } },
  userId: number,
  days: number,
): Promise<Date | null> {
  if (!(await columnExists(db, "accessExpiresAt"))) return null;
  const current = await getUserAccessExpiresAt(db, userId);
  const base =
    current && current > new Date() ? current : new Date();
  const next = new Date(base);
  next.setDate(next.getDate() + days);
  await db.$client.query(
    "UPDATE users SET accessExpiresAt = ? WHERE id = ?",
    [next.toISOString().slice(0, 19).replace("T", " "), userId],
  );
  return next;
}

export async function extendUserAccessBySubscription(
  db: { $client: { query: Function } },
  userId: number,
  interval: "month" | "year",
): Promise<Date | null> {
  const months = interval === "year" ? 12 : 1;
  return extendUserAccess(db, userId, months);
}
