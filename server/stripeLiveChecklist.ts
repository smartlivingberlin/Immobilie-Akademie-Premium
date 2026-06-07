import {
  STRIPE_LIVE_CHECKLIST_DEFS,
  type StripeLiveChecklistResult,
  type StripeChecklistItemStatus,
} from "../shared/stripeLiveChecklist";
import { getStripeWebhookHealth } from "./stripeWebhookHealth";
import { getStripePriceReadiness } from "../shared/stripePriceReadiness";

function isLiveKey(key: string | undefined, prefix: string): boolean {
  return !!key && key.startsWith(prefix);
}

function productionAppUrl(): boolean {
  const url = process.env.APP_URL || "";
  return url.includes("immobilien-akademie-smart.de") && !url.includes("localhost");
}

export function buildStripeLiveChecklist(): StripeLiveChecklistResult {
  const sk = process.env.STRIPE_SECRET_KEY;
  const pk = process.env.STRIPE_PUBLISHABLE_KEY;
  const stripeMode = !sk ? "missing" : sk.startsWith("sk_live_") ? "live" : "test";

  const evaluators: Record<string, () => { ok: boolean; detail?: string }> = {
    gewerbe: () => ({ ok: false, detail: "Manuell bestätigen (Gewerbeschein)" }),
    agb: () => ({ ok: true, detail: "Seite /agb vorhanden" }),
    datenschutz: () => ({ ok: true, detail: "Seite /datenschutz vorhanden" }),
    stripe_live_key: () => ({
      ok: isLiveKey(sk, "sk_live_"),
      detail: sk ? (sk.startsWith("sk_live_") ? "Live-Key aktiv" : "Noch Test-Key (sk_test_)") : "Nicht gesetzt",
    }),
    stripe_live_pk: () => ({
      ok: isLiveKey(pk, "pk_live_"),
      detail: pk ? (pk.startsWith("pk_live_") ? "Live-PK aktiv" : "Noch Test-PK (pk_test_)") : "Nicht gesetzt",
    }),
    stripe_webhook: () => ({
      ok: !!process.env.STRIPE_WEBHOOK_SECRET?.startsWith("whsec_"),
      detail: process.env.STRIPE_WEBHOOK_SECRET ? "whsec_ gesetzt" : "STRIPE_WEBHOOK_SECRET fehlt",
    }),
    stripe_webhook_endpoint: () => ({
      ok: productionAppUrl() && !!process.env.STRIPE_WEBHOOK_SECRET,
      detail: "https://immobilien-akademie-smart.de/api/stripe/webhook",
    }),
    app_url: () => ({
      ok: productionAppUrl(),
      detail: process.env.APP_URL || "(nicht gesetzt)",
    }),
    resend: () => ({
      ok: !!process.env.RESEND_API_KEY,
      detail: process.env.RESEND_API_KEY ? "RESEND_API_KEY gesetzt" : "Fehlt",
    }),
    spf_dkim: () => ({ ok: false, detail: "Manuell in Resend/DNS prüfen" }),
    backfill: () => ({ ok: false, detail: "Manuell unter /admin/referral bestätigen" }),
    test_renewal: () => ({
      ok: stripeMode === "test" && !!sk,
      detail: stripeMode === "live" ? "Live aktiv — Test-Schritt übersprungen" : "Testmodus — E2E ausführen",
    }),
    webhook_recent: () => {
      const health = getStripeWebhookHealth();
      return {
        ok: health.recentlyActive,
        detail: health.lastVerifiedAt
          ? `Letztes Event: ${health.lastEventType} · ${new Date(health.lastVerifiedAt).toLocaleString("de-DE")}`
          : "Noch kein verifiziertes Webhook-Event seit Serverstart",
      };
    },
    stripe_price_ids: () => {
      const readiness = getStripePriceReadiness();
      const { subscriptions } = readiness;
      const live = sk?.startsWith("sk_live_");
      return {
        ok: live ? readiness.allSubscriptionsReady : subscriptions.configured > 0 || stripeMode === "test",
        detail: `${subscriptions.configured}/${subscriptions.total} Abo-Price-IDs · ${live ? "Live" : "Test — price_data Fallback"}`,
      };
    },
    stripe_module_price_ids: () => {
      const readiness = getStripePriceReadiness();
      const { modules } = readiness;
      const live = sk?.startsWith("sk_live_");
      return {
        ok: live ? readiness.allModulesReady : modules.configured > 0 || stripeMode === "test",
        detail: `${modules.configured}/${modules.total} Modul/Bundle-Price-IDs`,
      };
    },
    stripe_connect: () => ({
      ok: process.env.STRIPE_CONNECT_ENABLED === "1" || process.env.STRIPE_CONNECT_ENABLED === "true",
      detail: process.env.STRIPE_CONNECT_ENABLED === "true" ? "Connect aktiv" : "STRIPE_CONNECT_ENABLED=false",
    }),
    payout_cron: () => ({
      ok: process.env.PARTNER_PAYOUT_CRON_ENABLED === "1" || process.env.PARTNER_PAYOUT_CRON_ENABLED === "true",
      detail: "Optional — automatische Quartals-Ledger-Generierung",
    }),
  };

  const items: StripeChecklistItemStatus[] = STRIPE_LIVE_CHECKLIST_DEFS.map((def) => {
    const result = evaluators[def.id]?.() ?? { ok: false };
    return { ...def, ...result };
  });

  const doneCount = items.filter((i) => i.ok).length;

  return {
    stripeMode,
    doneCount,
    totalCount: items.length,
    items,
  };
}
