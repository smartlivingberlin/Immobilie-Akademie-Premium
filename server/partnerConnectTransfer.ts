import { logger } from "./_core/logger";
import { PARTNER_PAYOUT_POLICY } from "../shared/partnerPayouts";

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

export async function executeConnectTransferForLedger(
  db: { $client: { query: Function } },
  ledgerId: number,
): Promise<{ transferId: string; amountEur: number }> {
  if (!(await tableExists(db, "partner_payout_ledger"))) {
    throw new Error("partner_payout_ledger fehlt");
  }
  if (!(await tableExists(db, "partner_connect_accounts"))) {
    throw new Error("partner_connect_accounts fehlt — Migration 0041");
  }

  const [ledgerRows] = await db.$client.query(
    "SELECT id, partnerUserId, commissionEur, status FROM partner_payout_ledger WHERE id = ? LIMIT 1",
    [ledgerId],
  ) as any;
  const ledger = (ledgerRows as any[])[0];
  if (!ledger) throw new Error("Ledger-Eintrag nicht gefunden");
  if (ledger.status !== "pending") throw new Error("Nur pending-Einträge können transferiert werden");

  const amountEur = Number(ledger.commissionEur);
  if (amountEur < PARTNER_PAYOUT_POLICY.minPayoutEur) {
    throw new Error(`Mindestbetrag ${PARTNER_PAYOUT_POLICY.minPayoutEur} € nicht erreicht`);
  }

  const [connectRows] = await db.$client.query(
    "SELECT stripeAccountId, payoutsEnabled, status FROM partner_connect_accounts WHERE userId = ? LIMIT 1",
    [ledger.partnerUserId],
  ) as any;
  const connect = (connectRows as any[])[0];
  if (!connect?.stripeAccountId) {
    throw new Error("Partner hat kein Stripe Connect-Konto");
  }
  if (!connect.payoutsEnabled) {
    throw new Error("Connect-Konto: Auszahlungen noch nicht freigeschaltet");
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY fehlt");

  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(key, { apiVersion: "2026-02-25.clover" } as any);

  const transfer = await stripe.transfers.create({
    amount: Math.round(amountEur * 100),
    currency: "eur",
    destination: connect.stripeAccountId,
    metadata: {
      ledgerId: String(ledgerId),
      partnerUserId: String(ledger.partnerUserId),
      type: "referral_commission",
    },
  });

  await db.$client.query(
    `UPDATE partner_payout_ledger
     SET status = 'paid', paidAt = NOW(), stripeTransferId = ?, note = CONCAT(COALESCE(note, ''), ' Connect-Transfer')
     WHERE id = ?`,
    [transfer.id, ledgerId],
  );

  logger.info("[Connect] Transfer executed", { ledgerId, transferId: transfer.id, amountEur });
  return { transferId: transfer.id, amountEur };
}

export type BatchConnectTransferResult = {
  transferred: number;
  skipped: number;
  errors: Array<{ ledgerId: number; error: string }>;
  transfers: Array<{ ledgerId: number; transferId: string; amountEur: number }>;
};

export async function executeConnectTransfersForPendingLedger(
  db: { $client: { query: Function } },
  options?: { periodStart?: string; periodEnd?: string },
): Promise<BatchConnectTransferResult> {
  if (!(await tableExists(db, "partner_payout_ledger"))) {
    throw new Error("partner_payout_ledger fehlt");
  }

  const periodStart = options?.periodStart?.slice(0, 10);
  const periodEnd = options?.periodEnd?.slice(0, 10);
  let sql = `SELECT id FROM partner_payout_ledger
             WHERE status = 'pending' AND commissionEur >= ?`;
  const params: Array<string | number> = [PARTNER_PAYOUT_POLICY.minPayoutEur];
  if (periodStart) {
    sql += " AND periodStart = ?";
    params.push(periodStart);
  }
  if (periodEnd) {
    sql += " AND periodEnd = ?";
    params.push(periodEnd);
  }
  sql += " ORDER BY id ASC";

  const [rows] = await db.$client.query(sql, params) as any;
  const result: BatchConnectTransferResult = {
    transferred: 0,
    skipped: 0,
    errors: [],
    transfers: [],
  };

  for (const row of rows as Array<{ id: number }>) {
    try {
      const transfer = await executeConnectTransferForLedger(db, row.id);
      result.transferred += 1;
      result.transfers.push({ ledgerId: row.id, ...transfer });
    } catch (e: any) {
      const msg = String(e?.message || e);
      if (msg.includes("Connect-Konto") || msg.includes("Mindestbetrag")) {
        result.skipped += 1;
      }
      result.errors.push({ ledgerId: row.id, error: msg });
    }
  }

  logger.info("[Connect] Batch transfer finished", {
    transferred: result.transferred,
    skipped: result.skipped,
    errors: result.errors.length,
  });
  return result;
}
