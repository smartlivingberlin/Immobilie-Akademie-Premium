import { logger } from "./_core/logger";

export type StripeWebhookEvent = {
  type: string;
  data: { object: Record<string, unknown> };
};

/** Verarbeitet ein verifiziertes Stripe-Webhook-Event (ohne Signatur-Check). */
export async function processStripeWebhookEvent(
  db: { $client: { query: Function } },
  event: StripeWebhookEvent,
): Promise<void> {
  if (event.type === "invoice.paid") {
    const invoice = event.data.object as Record<string, any>;
    const subMeta = invoice.subscription_details?.metadata ?? invoice.lines?.data?.[0]?.metadata ?? {};
    const userId = parseInt(subMeta.userId || invoice.metadata?.userId || "0", 10);
    const interval = (subMeta.interval || invoice.metadata?.interval) === "year" ? "year" : "month";

    if (userId > 0 && (subMeta.type === "renewal" || invoice.metadata?.type === "renewal")) {
      const { processRenewalPayment } = await import("./stripePurchaseHandler");
      await processRenewalPayment(db, userId, interval);
    }
    if (userId > 0 && (subMeta.type === "compliance" || invoice.metadata?.type === "compliance")) {
      const { processComplianceSubscription } = await import("./stripePurchaseHandler");
      await processComplianceSubscription(db, userId);
    }
    if (userId > 0 && (subMeta.type === "b2b" || invoice.metadata?.type === "b2b")) {
      const { processB2bSubscription } = await import("./b2bPurchaseHandler");
      const planId = subMeta.planId || invoice.metadata?.planId || "starter";
      const companyName = subMeta.companyName || invoice.metadata?.companyName || "";
      await processB2bSubscription(db, userId, planId, companyName);
    }
    if (userId > 0 && (subMeta.type === "rechenpraxis" || invoice.metadata?.type === "rechenpraxis")) {
      const { processRechenpraxisSubscription } = await import("./stripePurchaseHandler");
      await processRechenpraxisSubscription(db, userId);
    }
    return;
  }

  if (event.type !== "checkout.session.completed") return;

  const session = event.data.object as Record<string, any>;

  if (
    session.metadata?.type === "renewal"
    || session.metadata?.type === "compliance"
    || session.metadata?.type === "b2b"
    || session.metadata?.type === "rechenpraxis"
  ) {
    return;
  }

  const modules = session.metadata?.modules ?? session.metadata?.bundle;
  const email = session.customer_email ?? session.customer_details?.email ?? session.metadata?.email;
  const productId = session.metadata?.productId ?? null;
  logger.info("[Stripe Webhook] Kauf", { email, modules, productId });

  if (!email || !modules) return;

  const { processModulePurchase } = await import("./stripePurchaseHandler");
  const result = await processModulePurchase(db, String(email), String(modules), productId);
  if (result) {
    logger.info("[Stripe Webhook] Freigeschaltet", { email, modules: result.merged });
    return;
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  await db.$client.query(
    "INSERT INTO pending_purchases (email, sessionId, modules, productId) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE email = VALUES(email), modules = VALUES(modules), productId = VALUES(productId)",
    [normalizedEmail, session.id, modules, productId],
  );
  logger.info("[Stripe Webhook] Pending Purchase gespeichert", { email: normalizedEmail, sessionId: session.id, modules });

  try {
    if (!process.env.RESEND_API_KEY) {
      logger.warn("[Stripe Webhook] RESEND_API_KEY fehlt fuer Pending-Purchase-E-Mail", { email: normalizedEmail });
      return;
    }
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY || "");
    const baseUrl = process.env.APP_URL || "https://immobilien-akademie-smart.de";
    await resend.emails.send({
      from: "Immobilien Akademie Smart <info@immobilien-akademie-smart.de>",
      to: normalizedEmail,
      subject: "Ihr Kauf war erfolgreich - Konto einrichten",
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <h2 style="color:#0f172a">Ihr Kauf war erfolgreich</h2>
        <p>Wir haben Ihre Zahlung erhalten. Bitte erstellen Sie jetzt ein Konto mit dieser E-Mail-Adresse, damit Ihr Kurszugang automatisch freigeschaltet wird.</p>
        <p><strong>E-Mail:</strong> ${normalizedEmail}</p>
        <p><a href="${baseUrl}/login" style="display:inline-block;background:#2563eb;color:white;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold">Konto einrichten / einloggen</a></p>
        <p style="color:#64748b;font-size:13px">Falls Sie bereits ein Konto mit dieser E-Mail haben, melden Sie sich einfach an.</p>
      </div>`,
    });
    logger.info("[Stripe Webhook] Pending-Purchase-E-Mail gesendet", { email: normalizedEmail });
  } catch (emailErr: any) {
    logger.error("[Stripe Webhook] Pending-Purchase-E-Mail Fehler", emailErr);
  }
}
