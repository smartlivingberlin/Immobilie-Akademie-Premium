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
    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      const { processStripeWebhookEvent } = await import("./stripeWebhookProcess");
      await processStripeWebhookEvent(db, event);
    } catch (dbErr: any) {
      logger.error("[Stripe Webhook] Verarbeitungsfehler", dbErr);
      return res.status(500).json({ error: "Webhook processing failed" });
    }
    res.json({ received: true });
  } catch (err: any) {
    logger.error("[Webhook] Fehler", err);
    res.status(500).json({ error: err.message });
  }
}
