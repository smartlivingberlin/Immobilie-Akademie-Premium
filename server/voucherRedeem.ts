import { extendUserAccessByDays } from "./accessExpiry";
import { extendComplianceAccess } from "./complianceAccess";
import { setUserKiTier } from "./kiFairUse";
import { REFERRAL_TOOL_VOUCHERS } from "../shared/referral";
import { KI_TIER_FULL } from "../shared/kiFairUse";

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

export async function countSuccessfulReferrals(
  db: { $client: { query: Function } },
  userId: number,
): Promise<number> {
  if (!(await tableExists(db, "referral_rewards"))) return 0;
  const [rows] = await db.$client.query(
    "SELECT COUNT(*) as c FROM referral_rewards WHERE userId = ? AND type = 'first_purchase'",
    [userId],
  ) as any;
  return Number((rows as any[])[0]?.c || 0);
}

export async function hasActiveKiVoucher(
  db: { $client: { query: Function } },
  userId: number,
): Promise<boolean> {
  if (!(await tableExists(db, "referral_rewards"))) return false;
  const [rows] = await db.$client.query(
    `SELECT id FROM referral_rewards
     WHERE userId = ? AND type = 'voucher_ki_tutor'
       AND createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)
     LIMIT 1`,
    [userId],
  ) as any;
  return (rows as any[]).length > 0;
}

export type VoucherStatus = {
  id: string;
  label: string;
  days: number;
  eligible: boolean;
  redeemed: boolean;
};

export async function getVoucherStatuses(
  db: { $client: { query: Function } },
  userId: number,
): Promise<VoucherStatus[]> {
  const referrals = await countSuccessfulReferrals(db, userId);
  const eligible = referrals > 0;

  const redeemed = new Set<string>();
  if (await tableExists(db, "referral_rewards")) {
    const [rows] = await db.$client.query(
      "SELECT type FROM referral_rewards WHERE userId = ? AND type LIKE 'voucher_%'",
      [userId],
    ) as any;
    for (const r of rows as any[]) {
      const id = String(r.type).replace("voucher_", "");
      redeemed.add(id);
    }
  }

  return REFERRAL_TOOL_VOUCHERS.map((v) => ({
    id: v.id,
    label: v.label,
    days: v.days || 30,
    eligible,
    redeemed: redeemed.has(v.id),
  }));
}

export async function redeemVoucher(
  db: { $client: { query: Function } },
  userId: number,
  voucherId: string,
): Promise<void> {
  const voucher = REFERRAL_TOOL_VOUCHERS.find((v) => v.id === voucherId);
  if (!voucher) throw new Error("Gutschein unbekannt");

  const referrals = await countSuccessfulReferrals(db, userId);
  if (referrals === 0) {
    throw new Error("Gutschein erst nach erfolgreicher Empfehlung (Erstkauf) verfügbar");
  }

  if (!(await tableExists(db, "referral_rewards"))) {
    throw new Error("Gutschein-System nicht migriert");
  }

  const type = `voucher_${voucherId}`;
  const [existing] = await db.$client.query(
    "SELECT id FROM referral_rewards WHERE userId = ? AND type = ? LIMIT 1",
    [userId, type],
  ) as any;
  if ((existing as any[]).length > 0) {
    throw new Error("Gutschein bereits eingelöst");
  }

  const days = voucher.days || 30;

  if (voucherId === "rechenpraxis") {
    await extendUserAccessByDays(db, userId, days);
  } else if (voucherId === "ki_tutor") {
    await setUserKiTier(db, userId, KI_TIER_FULL);
  } else if (voucherId === "weiterbildungsnachweis") {
    await extendComplianceAccess(db, userId, Math.max(days, 30));
  }

  await db.$client.query(
    "INSERT INTO referral_rewards (userId, type, amountDays, note) VALUES (?, ?, ?, ?)",
    [userId, type, days, `Gutschein: ${voucher.label}`],
  );
}
