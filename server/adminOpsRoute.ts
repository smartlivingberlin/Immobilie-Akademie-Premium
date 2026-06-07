import { Router } from "express";
import { requireAdmin } from "./authMiddleware";
import { backfillAccessExpiresAt } from "./backfillAccess";
import { getReferralAdminStats } from "./referralStats";
import { buildStripeLiveChecklist } from "./stripeLiveChecklist";
import { getPartnerPayoutRows, partnerPayoutRowsToCsv } from "./partnerPayoutExport";
import { logger } from "./_core/logger";

export const adminOpsRouter = Router();

adminOpsRouter.post("/api/admin/backfill-access", requireAdmin, async (req: any, res) => {
  try {
    const dryRun = req.body?.apply !== true;
    const { getDb } = await import("./db");
    const db = await getDb();
    const result = await backfillAccessExpiresAt(db, { dryRun });
    logger.info("[Admin] Backfill accessExpiresAt", { dryRun, candidates: result.candidates, updated: result.updated });
    res.json(result);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

adminOpsRouter.get("/api/admin/referral-stats", requireAdmin, async (_req, res) => {
  try {
    const { getDb } = await import("./db");
    const db = await getDb();
    const stats = await getReferralAdminStats(db);
    res.json(stats);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

adminOpsRouter.get("/api/admin/stripe-live-checklist", requireAdmin, async (_req, res) => {
  try {
    res.json(buildStripeLiveChecklist());
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

adminOpsRouter.get("/api/admin/partner-payout-export", requireAdmin, async (req, res) => {
  try {
    const { getDb } = await import("./db");
    const db = await getDb();
    const rows = await getPartnerPayoutRows(db);
    if (req.query.format === "json") {
      return res.json({ rows });
    }
    const csv = partnerPayoutRowsToCsv(rows);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="partner-payouts.csv"');
    res.send(csv);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});
