import { Router } from "express";
import { requireAdmin } from "./authMiddleware";
import { backfillAccessExpiresAt } from "./backfillAccess";
import { getReferralAdminStats } from "./referralStats";
import { buildStripeLiveChecklist } from "./stripeLiveChecklist";
import { getPartnerPayoutRows, partnerPayoutRowsToCsv } from "./partnerPayoutExport";
import {
  generateQuarterlyPayoutEntries,
  listPayoutLedger,
  markPayoutPaid,
} from "./partnerPayoutLedger";
import { getStripeWebhookHealth } from "./stripeWebhookHealth";
import { listAllPartnerPayoutDetails } from "./partnerPayoutDetails";
import { buildStripeLiveEnvTemplate } from "../shared/stripeLiveEnv";
import { verifyStripeApiKey } from "./stripeLiveVerify";
import {
  executeConnectTransferForLedger,
  executeConnectTransfersForPendingLedger,
} from "./partnerConnectTransfer";
import { getStripePriceConfig, getModulePriceConfig } from "../shared/stripePriceIds";
import { getStripePriceReadiness } from "../shared/stripePriceReadiness";
import { listPendingPurchases } from "./pendingPurchasesAdmin";
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
    res.json({ ...buildStripeLiveChecklist(), webhookHealth: getStripeWebhookHealth() });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

adminOpsRouter.get("/api/admin/stripe-price-config", requireAdmin, async (_req, res) => {
  try {
    res.json({
      subscriptions: getStripePriceConfig(),
      modules: getModulePriceConfig(),
      readiness: getStripePriceReadiness(),
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

adminOpsRouter.get("/api/admin/pending-purchases", requireAdmin, async (req, res) => {
  try {
    const unclaimedOnly = req.query.all !== "1";
    const { getDb } = await import("./db");
    const db = await getDb();
    const rows = await listPendingPurchases(db, { unclaimedOnly });
    res.json({ rows, count: rows.length });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

adminOpsRouter.get("/api/admin/stripe-live-verify", requireAdmin, async (_req, res) => {
  try {
    const result = await verifyStripeApiKey();
    res.json(result);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

adminOpsRouter.get("/api/admin/stripe-live-env-template", requireAdmin, async (_req, res) => {
  try {
    res.json({ template: buildStripeLiveEnvTemplate() });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

adminOpsRouter.get("/api/admin/partner-payout-details", requireAdmin, async (_req, res) => {
  try {
    const { getDb } = await import("./db");
    const db = await getDb();
    const rows = await listAllPartnerPayoutDetails(db);
    res.json({ rows });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

adminOpsRouter.get("/api/admin/stripe-webhook-health", requireAdmin, async (_req, res) => {
  try {
    res.json(getStripeWebhookHealth());
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

adminOpsRouter.get("/api/admin/payout-ledger", requireAdmin, async (_req, res) => {
  try {
    const { getDb } = await import("./db");
    const db = await getDb();
    const rows = await listPayoutLedger(db);
    res.json({ rows });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

adminOpsRouter.post("/api/admin/payout-ledger/generate", requireAdmin, async (req, res) => {
  try {
    const periodStart = String(req.body?.periodStart || "").slice(0, 10);
    const periodEnd = String(req.body?.periodEnd || "").slice(0, 10);
    if (!periodStart || !periodEnd) {
      return res.status(400).json({ error: "periodStart und periodEnd erforderlich (YYYY-MM-DD)" });
    }
    const { getDb } = await import("./db");
    const db = await getDb();
    const result = await generateQuarterlyPayoutEntries(db, periodStart, periodEnd);
    const autoConnect = req.body?.autoConnect === true;
    const connectEnabled = process.env.STRIPE_CONNECT_ENABLED === "1"
      || process.env.STRIPE_CONNECT_ENABLED === "true";
    if (autoConnect && connectEnabled && result.created > 0) {
      const batch = await executeConnectTransfersForPendingLedger(db, { periodStart, periodEnd });
      return res.json({ ...result, connectBatch: batch });
    }
    res.json(result);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

adminOpsRouter.post("/api/admin/payout-ledger/connect-transfer", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(String(req.body?.id || "0"), 10);
    if (!id) return res.status(400).json({ error: "id erforderlich" });
    const { getDb } = await import("./db");
    const db = await getDb();
    const result = await executeConnectTransferForLedger(db, id);
    res.json({ ok: true, ...result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

adminOpsRouter.post("/api/admin/payout-ledger/connect-transfer-batch", requireAdmin, async (req, res) => {
  try {
    const periodStart = req.body?.periodStart ? String(req.body.periodStart).slice(0, 10) : undefined;
    const periodEnd = req.body?.periodEnd ? String(req.body.periodEnd).slice(0, 10) : undefined;
    const { getDb } = await import("./db");
    const db = await getDb();
    const result = await executeConnectTransfersForPendingLedger(db, { periodStart, periodEnd });
    res.json({ ok: true, ...result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

adminOpsRouter.post("/api/admin/payout-ledger/mark-paid", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(String(req.body?.id || "0"), 10);
    if (!id) return res.status(400).json({ error: "id erforderlich" });
    const { getDb } = await import("./db");
    const db = await getDb();
    const ok = await markPayoutPaid(db, id, req.body?.note);
    if (!ok) return res.status(404).json({ error: "Eintrag nicht gefunden oder bereits bezahlt" });
    res.json({ ok: true });
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
