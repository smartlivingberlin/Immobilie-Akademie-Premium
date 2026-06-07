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

export type PartnerPayoutDetails = {
  userId: number;
  payoutMethod: string;
  accountHolder: string;
  ibanLast4: string;
  paypalEmail: string | null;
  status: string;
};

export async function getPartnerPayoutDetails(
  db: { $client: { query: Function } },
  userId: number,
): Promise<PartnerPayoutDetails | null> {
  if (!(await tableExists(db, "partner_payout_details"))) return null;
  const [rows] = await db.$client.query(
    "SELECT * FROM partner_payout_details WHERE userId = ? LIMIT 1",
    [userId],
  ) as any;
  const r = (rows as any[])[0];
  if (!r) return null;
  return {
    userId: r.userId,
    payoutMethod: r.payoutMethod,
    accountHolder: r.accountHolder,
    ibanLast4: r.ibanLast4,
    paypalEmail: r.paypalEmail,
    status: r.status,
  };
}

export async function upsertPartnerPayoutDetails(
  db: { $client: { query: Function } },
  userId: number,
  data: { accountHolder: string; iban: string; paypalEmail?: string },
): Promise<void> {
  if (!(await tableExists(db, "partner_payout_details"))) {
    throw new Error("partner_payout_details Tabelle fehlt — Migration 0040");
  }
  const iban = data.iban.replace(/\s/g, "");
  const ibanLast4 = iban.slice(-4);
  if (ibanLast4.length < 4) throw new Error("IBAN ungültig");

  await db.$client.query(
    `INSERT INTO partner_payout_details (userId, payoutMethod, accountHolder, ibanLast4, paypalEmail, status)
     VALUES (?, 'sepa', ?, ?, ?, 'pending')
     ON DUPLICATE KEY UPDATE accountHolder = VALUES(accountHolder), ibanLast4 = VALUES(ibanLast4),
       paypalEmail = VALUES(paypalEmail), status = 'pending', updatedAt = NOW()`,
    [userId, data.accountHolder.slice(0, 120), ibanLast4, data.paypalEmail?.slice(0, 255) ?? null],
  );
}

export async function listAllPartnerPayoutDetails(
  db: { $client: { query: Function } },
): Promise<Array<PartnerPayoutDetails & { email: string; name: string }>> {
  if (!(await tableExists(db, "partner_payout_details"))) return [];
  const [rows] = await db.$client.query(
    `SELECT d.*, u.email, u.name FROM partner_payout_details d
     JOIN users u ON u.id = d.userId ORDER BY d.updatedAt DESC`,
  ) as any;
  return (rows as any[]).map((r) => ({
    userId: r.userId,
    payoutMethod: r.payoutMethod,
    accountHolder: r.accountHolder,
    ibanLast4: r.ibanLast4,
    paypalEmail: r.paypalEmail,
    status: r.status,
    email: r.email || "",
    name: r.name || "",
  }));
}
