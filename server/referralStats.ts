import { columnExists } from "./accessExpiry";

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

export type ReferralAdminStats = {
  totalReferralCodes: number;
  totalAttributed: number;
  totalRewards: number;
  totalRewardDays: number;
  topReferrers: Array<{ userId: number; name: string; email: string; code: string; referrals: number; rewardDays: number }>;
  recentRewards: Array<{ id: number; userId: number; type: string; amountDays: number; note: string | null; createdAt: string }>;
};

export async function getReferralAdminStats(
  db: { $client: { query: Function } },
): Promise<ReferralAdminStats> {
  const empty: ReferralAdminStats = {
    totalReferralCodes: 0,
    totalAttributed: 0,
    totalRewards: 0,
    totalRewardDays: 0,
    topReferrers: [],
    recentRewards: [],
  };

  const hasCode = await columnExists(db, "referralCode");
  const hasReferred = await columnExists(db, "referredByUserId");
  const hasRewards = await tableExists(db, "referral_rewards");

  if (hasCode) {
    const [codeRows] = await db.$client.query(
      "SELECT COUNT(*) as c FROM users WHERE referralCode IS NOT NULL AND referralCode != ''",
    ) as any;
    empty.totalReferralCodes = Number((codeRows as any[])[0]?.c || 0);
  }

  if (hasReferred) {
    const [attrRows] = await db.$client.query(
      "SELECT COUNT(*) as c FROM users WHERE referredByUserId IS NOT NULL",
    ) as any;
    empty.totalAttributed = Number((attrRows as any[])[0]?.c || 0);
  }

  if (hasRewards) {
    const [rewardSum] = await db.$client.query(
      "SELECT COUNT(*) as c, COALESCE(SUM(amountDays), 0) as days FROM referral_rewards",
    ) as any;
    empty.totalRewards = Number((rewardSum as any[])[0]?.c || 0);
    empty.totalRewardDays = Number((rewardSum as any[])[0]?.days || 0);

    const [recent] = await db.$client.query(
      `SELECT id, userId, type, amountDays, note, createdAt
       FROM referral_rewards ORDER BY createdAt DESC LIMIT 20`,
    ) as any;
    empty.recentRewards = (recent as any[]).map((r) => ({
      id: r.id,
      userId: r.userId,
      type: r.type,
      amountDays: r.amountDays,
      note: r.note,
      createdAt: new Date(r.createdAt).toISOString(),
    }));
  }

  if (hasReferred && hasCode) {
    const [top] = await db.$client.query(
      `SELECT r.id as userId, r.name, r.email, r.referralCode as code,
              (SELECT COUNT(*) FROM users u WHERE u.referredByUserId = r.id) as referrals,
              (SELECT COALESCE(SUM(amountDays), 0) FROM referral_rewards WHERE userId = r.id) as rewardDays
       FROM users r
       WHERE r.referralCode IS NOT NULL AND r.referralCode != ''
       HAVING referrals > 0
       ORDER BY referrals DESC, rewardDays DESC
       LIMIT 10`,
    ) as any;
    empty.topReferrers = (top as any[]).map((t) => ({
      userId: t.userId,
      name: t.name || "—",
      email: t.email || "",
      code: t.code || "",
      referrals: Number(t.referrals),
      rewardDays: Number(t.rewardDays),
    }));
  }

  return empty;
}
