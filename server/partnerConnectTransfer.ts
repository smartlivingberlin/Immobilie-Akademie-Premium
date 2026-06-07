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
