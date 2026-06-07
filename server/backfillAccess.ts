import { computeAccessExpiry, includedMonthsForPurchase } from "../shared/accessPolicy";
import { columnExists } from "./accessExpiry";

const GRACE_DAYS = 30;

export type BackfillResult = {
  dryRun: boolean;
  candidates: number;
  updated: number;
  rows: Array<{ id: number; email: string; modules: string; newExpiry: string }>;
};

export async function backfillAccessExpiresAt(
  db: { $client: { query: Function } },
  options: { dryRun?: boolean } = {},
): Promise<BackfillResult> {
  const dryRun = options.dryRun !== false;

  if (!(await columnExists(db, "accessExpiresAt"))) {
    throw new Error("Spalte accessExpiresAt fehlt — Migration 0034 ausführen");
  }

  const [users] = await db.$client.query(
    `SELECT id, email, enabledModules, accessExpiresAt, createdAt
     FROM users
     WHERE enabledModules IS NOT NULL AND enabledModules != '' AND accessExpiresAt IS NULL`,
  ) as any[];

  const rows: BackfillResult["rows"] = [];
  let updated = 0;

  for (const u of users as any[]) {
    const months = includedMonthsForPurchase(null, String(u.enabledModules || ""));
    const created = u.createdAt ? new Date(u.createdAt) : new Date();
    let next = computeAccessExpiry(null, months, created);
    const grace = new Date();
    grace.setDate(grace.getDate() + GRACE_DAYS);
    if (next < new Date()) next = grace;

    const expiryStr = next.toISOString().slice(0, 19).replace("T", " ");
    rows.push({
      id: u.id,
      email: u.email || "",
      modules: u.enabledModules,
      newExpiry: expiryStr.slice(0, 10),
    });

    if (!dryRun) {
      await db.$client.query(
        "UPDATE users SET accessExpiresAt = ? WHERE id = ?",
        [expiryStr, u.id],
      );
      updated++;
    }
  }

  return {
    dryRun,
    candidates: rows.length,
    updated: dryRun ? 0 : updated,
    rows,
  };
}
