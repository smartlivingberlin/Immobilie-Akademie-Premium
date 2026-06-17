import { logger } from "./_core/logger";

/** Stripe Webhook-Handler — vor express.json gemountet (raw body). */
export async function handleStripeWebhook(req: any, res: any) {
  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2026-02-25.clover" } as any);
    const sig = req.headers["stripe-signature"];
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) return res.status(500).json({ error: "Webhook secret missing" });
    let event: any;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, secret);
      const { recordStripeWebhookEvent } = await import("./stripeWebhookHealth");
      recordStripeWebhookEvent(event.type);
    } catch (err: any) {
      if (err.message?.includes("No stripe-signature")) {
        logger.warn("[Stripe Webhook] Health-Check ohne Signatur — ignoriert");
      } else {
        logger.error("[Stripe Webhook] Signatur ungültig", err);
      }
      return res.status(400).send("Webhook Error: " + err.message);
    }

    if (!event?.id || typeof event.id !== "string" || !event.id.trim()) {
      logger.error("[Stripe Webhook] Event ohne id — Verarbeitung abgebrochen", { type: event?.type });
      return res.status(400).json({ error: "Webhook event id missing" });
    }

    let db: { $client: { query: Function } };
    try {
      const { getDb } = await import("./db");
      db = await getDb();
    } catch (dbErr: any) {
      logger.error("[Stripe Webhook] DB-Verbindung fehlgeschlagen", dbErr);
      return res.status(500).json({ error: "Webhook processing failed" });
    }

    const {
      claimStripeWebhookEvent,
      markStripeWebhookEventFailed,
      markStripeWebhookEventProcessed,
    } = await import("./stripeWebhookLedger");

    let claim;
    try {
      claim = await claimStripeWebhookEvent(db, event);
    } catch (claimErr: any) {
      logger.error("[Stripe Webhook] Ledger-Claim fehlgeschlagen", claimErr);
      return res.status(500).json({ error: "Webhook processing failed" });
    }

    if (!claim.shouldProcess) {
      logger.info("[Stripe Webhook] Duplicate event skipped", {
        eventId: claim.eventId,
        reason: claim.reason,
      });
      return res.json({ received: true, duplicate: true, reason: claim.reason });
    }

    try {
      const { processStripeWebhookEvent } = await import("./stripeWebhookProcess");
      await processStripeWebhookEvent(db, event);
      await markStripeWebhookEventProcessed(db, claim.eventId);
    } catch (dbErr: any) {
      logger.error("[Stripe Webhook] Verarbeitungsfehler", dbErr);
      try {
        await markStripeWebhookEventFailed(db, claim.eventId, dbErr);
      } catch (markErr: any) {
        logger.error("[Stripe Webhook] Ledger failed-mark fehlgeschlagen", markErr);
      }
      return res.status(500).json({ error: "Webhook processing failed" });
    }

    res.json({ received: true });
  } catch (err: any) {
    logger.error("[Webhook] Fehler", err);
    res.status(500).json({ error: err.message });
  }
}
