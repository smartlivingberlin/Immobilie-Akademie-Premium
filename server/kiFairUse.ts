import { columnExists } from "./accessExpiry";
import {
  isRenewalKiTier,
  KI_RENEWAL_DAILY_LIMIT,
  KI_TIER_FULL,
  KI_TIER_RENEWAL,
} from "../shared/kiFairUse";

export type KiQuota = {
  tier: string;
  limit: number | null;
  used: number;
  remaining: number | null;
};

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function setUserKiTier(
  db: { $client: { query: Function } },
  userId: number,
  tier: typeof KI_TIER_FULL | typeof KI_TIER_RENEWAL,
): Promise<void> {
  if (!(await columnExists(db, "kiTier"))) return;
  await db.$client.query("UPDATE users SET kiTier = ? WHERE id = ?", [tier, userId]);
}

export async function getUserKiTier(
  db: { $client: { query: Function } },
  userId: number,
): Promise<string> {
  if (!(await columnExists(db, "kiTier"))) return KI_TIER_FULL;
  const [rows] = await db.$client.query(
    "SELECT kiTier FROM users WHERE id = ? LIMIT 1",
    [userId],
  ) as any;
  return String((rows as any[])[0]?.kiTier || KI_TIER_FULL);
}

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

export async function getDailyKiUsage(
  db: { $client: { query: Function } },
  userId: number,
): Promise<number> {
  if (!(await tableExists(db, "ki_daily_usage"))) return 0;
  const [rows] = await db.$client.query(
    "SELECT messageCount FROM ki_daily_usage WHERE userId = ? AND usageDate = ?",
    [userId, todayUtc()],
  ) as any;
  return Number((rows as any[])[0]?.messageCount || 0);
}

export async function getKiQuota(
  db: { $client: { query: Function } },
  userId: number,
  role?: string,
): Promise<KiQuota> {
  if (role === "admin") {
    return { tier: KI_TIER_FULL, limit: null, used: 0, remaining: null };
  }
  const tier = await getUserKiTier(db, userId);
  const used = await getDailyKiUsage(db, userId);
  if (!isRenewalKiTier(tier)) {
    return { tier, limit: null, used, remaining: null };
  }
  const remaining = Math.max(0, KI_RENEWAL_DAILY_LIMIT - used);
  return { tier, limit: KI_RENEWAL_DAILY_LIMIT, used, remaining };
}

/** Prüft Limit und erhöht Zähler. Wirft bei Überschreitung. */
export async function assertKiFairUse(
  db: { $client: { query: Function } },
  userId: number,
  role?: string,
): Promise<KiQuota> {
  const quota = await getKiQuota(db, userId, role);
  if (quota.limit === null) {
    await incrementKiUsage(db, userId);
    return quota;
  }
  if (quota.used >= quota.limit) {
    const err = new Error("KI-Tageslimit erreicht");
    (err as any).code = "KI_QUOTA_EXCEEDED";
    (err as any).quota = quota;
    throw err;
  }
  await incrementKiUsage(db, userId);
  return {
    ...quota,
    used: quota.used + 1,
    remaining: Math.max(0, quota.limit - quota.used - 1),
  };
}

async function incrementKiUsage(
  db: { $client: { query: Function } },
  userId: number,
): Promise<void> {
  if (!(await tableExists(db, "ki_daily_usage"))) return;
  const day = todayUtc();
  await db.$client.query(
    `INSERT INTO ki_daily_usage (userId, usageDate, messageCount) VALUES (?, ?, 1)
     ON DUPLICATE KEY UPDATE messageCount = messageCount + 1`,
    [userId, day],
  );
}
