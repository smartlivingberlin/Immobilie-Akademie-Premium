import { logger } from "./_core/logger";
import { generateQuarterlyPayoutEntries } from "./partnerPayoutLedger";
import { executeConnectTransfersForPendingLedger } from "./partnerConnectTransfer";

export function getPreviousQuarterRange(now = new Date()): { periodStart: string; periodEnd: string } {
  const month = now.getMonth();
  const year = now.getFullYear();
  if (month === 0) {
    return { periodStart: `${year - 1}-10-01`, periodEnd: `${year - 1}-12-31` };
  }
  if (month === 3) {
    return { periodStart: `${year}-01-01`, periodEnd: `${year}-03-31` };
  }
  if (month === 6) {
    return { periodStart: `${year}-04-01`, periodEnd: `${year}-06-30` };
  }
  return { periodStart: `${year}-07-01`, periodEnd: `${year}-09-30` };
}

export function isQuarterlyPayoutDue(now = new Date()): boolean {
  return now.getDate() === 1 && [0, 3, 6, 9].includes(now.getMonth());
}

export type PartnerPayoutCronResult = {
  ran: boolean;
  periodStart?: string;
  periodEnd?: string;
  created?: number;
  connectBatch?: Awaited<ReturnType<typeof executeConnectTransfersForPendingLedger>>;
};

export async function runQuarterlyPartnerPayoutIfDue(
  db: { $client: { query: Function } },
  now = new Date(),
): Promise<PartnerPayoutCronResult> {
  const enabled = process.env.PARTNER_PAYOUT_CRON_ENABLED === "1"
    || process.env.PARTNER_PAYOUT_CRON_ENABLED === "true";
  if (!enabled || !isQuarterlyPayoutDue(now)) {
    return { ran: false };
  }

  const { periodStart, periodEnd } = getPreviousQuarterRange(now);
  const generated = await generateQuarterlyPayoutEntries(db, periodStart, periodEnd);

  let connectBatch: PartnerPayoutCronResult["connectBatch"];
  const connectEnabled = process.env.STRIPE_CONNECT_ENABLED === "1"
    || process.env.STRIPE_CONNECT_ENABLED === "true";
  if (connectEnabled && generated.created > 0) {
    connectBatch = await executeConnectTransfersForPendingLedger(db, { periodStart, periodEnd });
  }

  logger.info("[PayoutCron] Quarterly ledger generated", {
    periodStart,
    periodEnd,
    created: generated.created,
    connectTransferred: connectBatch?.transferred ?? 0,
  });

  return {
    ran: true,
    periodStart,
    periodEnd,
    created: generated.created,
    connectBatch,
  };
}
