import { columnExists } from "./accessExpiry";
import {
  PARTNER_PAYOUT_POLICY,
  estimatePartnerPayoutEur,
  isPayoutEligible,
} from "../shared/partnerPayouts";

export type PartnerPayoutRow = {
  userId: number;
  name: string;
  email: string;
  code: string;
  successfulReferrals: number;
  estimatedPayoutEur: number;
  payoutEligible: boolean;
};

export async function getPartnerPayoutRows(
  db: { $client: { query: Function } },
): Promise<PartnerPayoutRow[]> {
  const hasCode = await columnExists(db, "referralCode");
  const hasReferred = await columnExists(db, "referredByUserId");
  if (!hasCode || !hasReferred) return [];

  const [rows] = await db.$client.query(
    `SELECT r.id as userId, r.name, r.email, r.referralCode as code,
            (SELECT COUNT(*) FROM users u
             WHERE u.referredByUserId = r.id
               AND u.enabledModules IS NOT NULL AND u.enabledModules != '') as successfulReferrals
     FROM users r
     WHERE r.referralCode IS NOT NULL AND r.referralCode != ''
     HAVING successfulReferrals > 0
     ORDER BY successfulReferrals DESC`,
  ) as any;

  return (rows as any[]).map((t) => {
    const successfulReferrals = Number(t.successfulReferrals);
    const estimatedPayoutEur = estimatePartnerPayoutEur(successfulReferrals);
    return {
      userId: t.userId,
      name: t.name || "—",
      email: t.email || "",
      code: t.code || "",
      successfulReferrals,
      estimatedPayoutEur,
      payoutEligible: isPayoutEligible(estimatedPayoutEur),
    };
  });
}

export function partnerPayoutRowsToCsv(rows: PartnerPayoutRow[]): string {
  const header = [
    "userId",
    "name",
    "email",
    "referralCode",
    "successfulReferrals",
    `estimatedPayoutEur (${PARTNER_PAYOUT_POLICY.commissionPercent}%)`,
    "payoutEligible",
  ].join(",");
  const lines = rows.map((r) =>
    [
      r.userId,
      `"${(r.name || "").replace(/"/g, '""')}"`,
      r.email,
      r.code,
      r.successfulReferrals,
      r.estimatedPayoutEur.toFixed(2),
      r.payoutEligible ? "yes" : "no",
    ].join(","),
  );
  return [header, ...lines].join("\n");
}
