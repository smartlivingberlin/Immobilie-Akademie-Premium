import {
  estimatePartnerPayoutEur,
  PARTNER_PAYOUT_POLICY,
} from "../shared/partnerPayouts";
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

export type PayoutLedgerRow = {
  id: number;
  partnerUserId: number;
  partnerName: string;
  partnerEmail: string;
  periodStart: string;
  periodEnd: string;
  referralCount: number;
  grossEur: number;
  commissionEur: number;
  status: string;
  paidAt: string | null;
  stripeTransferId: string | null;
  note: string | null;
  createdAt: string;
};

export async function listPayoutLedger(
  db: { $client: { query: Function } },
): Promise<PayoutLedgerRow[]> {
  if (!(await tableExists(db, "partner_payout_ledger"))) return [];

  const [rows] = await db.$client.query(
    `SELECT l.*, u.name as partnerName, u.email as partnerEmail
     FROM partner_payout_ledger l
     LEFT JOIN users u ON u.id = l.partnerUserId
     ORDER BY l.createdAt DESC LIMIT 100`,
  ) as any;

  return (rows as any[]).map((r) => ({
    id: r.id,
    partnerUserId: r.partnerUserId,
    partnerName: r.partnerName || "—",
    partnerEmail: r.partnerEmail || "",
    periodStart: String(r.periodStart).slice(0, 10),
    periodEnd: String(r.periodEnd).slice(0, 10),
    referralCount: Number(r.referralCount),
    grossEur: Number(r.grossEur),
    commissionEur: Number(r.commissionEur),
    status: r.status,
    paidAt: r.paidAt ? new Date(r.paidAt).toISOString() : null,
    stripeTransferId: r.stripeTransferId || null,
    note: r.note,
    createdAt: new Date(r.createdAt).toISOString(),
  }));
}

export async function generateQuarterlyPayoutEntries(
  db: { $client: { query: Function } },
  periodStart: string,
  periodEnd: string,
): Promise<{ created: number }> {
  if (!(await tableExists(db, "partner_payout_ledger"))) {
    throw new Error("partner_payout_ledger Tabelle fehlt — Migration 0039 ausführen");
  }

  const hasReferred = await columnExists(db, "referredByUserId");
  const hasCode = await columnExists(db, "referralCode");
  if (!hasReferred || !hasCode) return { created: 0 };

  const [partners] = await db.$client.query(
    `SELECT r.id as userId,
            (SELECT COUNT(*) FROM users u
             WHERE u.referredByUserId = r.id
               AND u.enabledModules IS NOT NULL AND u.enabledModules != ''
               AND u.createdAt >= ? AND u.createdAt < DATE_ADD(?, INTERVAL 1 DAY)) as referrals
     FROM users r
     WHERE r.referralCode IS NOT NULL AND r.referralCode != ''
     HAVING referrals > 0`,
    [periodStart, periodEnd],
  ) as any;

  let created = 0;
  for (const p of partners as any[]) {
    const referralCount = Number(p.referrals);
    const grossEur = referralCount * PARTNER_PAYOUT_POLICY.avgFirstPurchaseEur;
    const commissionEur = estimatePartnerPayoutEur(referralCount);

    const [existing] = await db.$client.query(
      `SELECT id FROM partner_payout_ledger
       WHERE partnerUserId = ? AND periodStart = ? AND periodEnd = ? LIMIT 1`,
      [p.userId, periodStart, periodEnd],
    ) as any;
    if ((existing as any[]).length > 0) continue;

    await db.$client.query(
      `INSERT INTO partner_payout_ledger
       (partnerUserId, periodStart, periodEnd, referralCount, grossEur, commissionEur, status)
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
      [p.userId, periodStart, periodEnd, referralCount, grossEur, commissionEur],
    );
    created += 1;
  }

  return { created };
}

export async function markPayoutPaid(
  db: { $client: { query: Function } },
  id: number,
  note?: string,
): Promise<boolean> {
  if (!(await tableExists(db, "partner_payout_ledger"))) return false;
  const [result] = await db.$client.query(
    `UPDATE partner_payout_ledger
     SET status = 'paid', paidAt = NOW(), note = COALESCE(?, note)
     WHERE id = ? AND status = 'pending'`,
    [note ?? null, id],
  ) as any;
  return (result as any).affectedRows > 0;
}
