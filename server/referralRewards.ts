import { columnExists, extendUserAccessByDays } from "./accessExpiry";
import { REFERRAL_REWARD_DAYS } from "../shared/referral";

async function tableExists(db: { $client: { query: Function } }, table: string): Promise<boolean> {
  try {
    const [rows] = await db.$client.query(
      `SELECT COUNT(*) as c FROM information_schema.TABLES
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
      [table],
    ) as [{ c: number }[]];
    return Number((rows as any[])[0]?.c) > 0;
  } catch {
    return false;
  }
}

export async function ensureReferralCode(
  db: { $client: { query: Function } },
  userId: number,
  email: string,
): Promise<string> {
  if (!(await columnExists(db, "referralCode"))) {
    return `IAS-${userId}`;
  }
  const [rows] = await db.$client.query(
    "SELECT referralCode FROM users WHERE id = ? LIMIT 1",
    [userId],
  ) as any;
  const existing = (rows as any[])[0]?.referralCode;
  if (existing) return existing;

  const slug = email.split("@")[0]?.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase() || "USER";
  const code = `IAS-${slug}-${userId}`;
  await db.$client.query("UPDATE users SET referralCode = ? WHERE id = ?", [code, userId]);
  return code;
}

export async function attributeReferral(
  db: { $client: { query: Function } },
  newUserId: number,
  referralCode: string,
): Promise<boolean> {
  const [referrerRows] = await db.$client.query(
    "SELECT id FROM users WHERE referralCode = ? AND id != ? LIMIT 1",
    [referralCode.trim(), newUserId],
  ) as any;
  const referrer = (referrerRows as any[])[0];
  if (!referrer) return false;

  await db.$client.query(
    "UPDATE users SET referredByUserId = ? WHERE id = ? AND referredByUserId IS NULL",
    [referrer.id, newUserId],
  );
  return true;
}

export async function applyReferralPurchaseRewards(
  db: { $client: { query: Function } },
  buyerUserId: number,
): Promise<void> {
  if (!(await tableExists(db, "referral_rewards"))) return;

  const [buyerRows] = await db.$client.query(
    "SELECT referredByUserId FROM users WHERE id = ? LIMIT 1",
    [buyerUserId],
  ) as any;
  const referrerId = (buyerRows as any[])[0]?.referredByUserId;
  if (!referrerId) return;

  const [existing] = await db.$client.query(
    "SELECT id FROM referral_rewards WHERE userId = ? AND sourceReferralUserId = ? AND type = 'first_purchase' LIMIT 1",
    [referrerId, buyerUserId],
  ) as any;
  if ((existing as any[]).length > 0) return;

  await extendUserAccessByDays(db, referrerId, REFERRAL_REWARD_DAYS.referrer);
  await extendUserAccessByDays(db, buyerUserId, REFERRAL_REWARD_DAYS.referred);

  await db.$client.query(
    "INSERT INTO referral_rewards (userId, type, amountDays, note, sourceReferralUserId) VALUES (?, 'first_purchase', ?, ?, ?)",
    [referrerId, REFERRAL_REWARD_DAYS.referrer, "Empfehlungsbonus nach Erstkauf", buyerUserId],
  );
  await db.$client.query(
    "INSERT INTO referral_rewards (userId, type, amountDays, note, sourceReferralUserId) VALUES (?, 'referred_bonus', ?, ?, ?)",
    [buyerUserId, REFERRAL_REWARD_DAYS.referred, "Willkommensbonus über Empfehlung", referrerId],
  );
}
