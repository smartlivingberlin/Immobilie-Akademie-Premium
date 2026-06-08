/**
 * Hilft beim Setzen von STRIPE_WEBHOOK_SECRET in Railway.
 *
 * Stripe liefert bei bestehenden Endpoints oft kein secret per GET/rotate API —
 * dann muss whsec_ aus dem Dashboard kopiert werden.
 *
 * Usage:
 *   export STRIPE_SECRET_KEY=sk_test_…   # oder sk_live_
 *   pnpm run stripe:setup-webhook -- --webhook-id=we_…
 *   pnpm run stripe:setup-webhook -- --webhook-id=we_… --whsec=whsec_… --railway-apply
 *   pnpm run stripe:setup-webhook -- --list
 */
import "dotenv/config";
import { execSync } from "node:child_process";

const APP_WEBHOOK_URL = "https://immobilien-akademie-smart.de/api/stripe/webhook";

function getArg(name: string): string | undefined {
  const pref = process.argv.find((a) => a.startsWith(`--${name}=`));
  return pref?.split("=").slice(1).join("=");
}

async function stripeGet(path: string, secret: string) {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    headers: { Authorization: `Bearer ${secret}` },
  });
  return res.json();
}

async function stripePost(path: string, secret: string, body?: Record<string, string>) {
  const params = body ? new URLSearchParams(body) : undefined;
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });
  return res.json();
}

function extractSecret(obj: Record<string, unknown>): string | null {
  const candidates = [obj.secret, (obj as { data?: { secret?: string } }).data?.secret];
  for (const c of candidates) {
    if (typeof c === "string" && c.startsWith("whsec_")) return c;
  }
  return null;
}

async function main() {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secret) {
    console.error("STRIPE_SECRET_KEY fehlt — export STRIPE_SECRET_KEY=sk_test_…");
    process.exit(1);
  }

  const mode = secret.startsWith("sk_live_") ? "LIVE" : "TEST";
  console.log(`Stripe Webhook Setup — Modus: ${mode}\n`);

  if (process.argv.includes("--list")) {
    const data = (await stripeGet("/webhook_endpoints?limit=20", secret)) as {
      data?: Array<{ id: string; url: string; status: string }>;
    };
    for (const ep of data.data ?? []) {
      const mark = ep.url === APP_WEBHOOK_URL ? " ← PRODUKTION" : "";
      console.log(`${ep.id}  ${ep.status}  ${ep.url}${mark}`);
    }
    return;
  }

  let webhookId = getArg("webhook-id");
  const whsecArg = getArg("whsec");
  const railwayApply = process.argv.includes("--railway-apply");

  if (!webhookId) {
    const data = (await stripeGet("/webhook_endpoints?limit=20", secret)) as {
      data?: Array<{ id: string; url: string }>;
    };
    webhookId = data.data?.find((e) => e.url === APP_WEBHOOK_URL)?.id;
    if (!webhookId) {
      console.error(`Kein Webhook für ${APP_WEBHOOK_URL} gefunden. --list oder --webhook-id=we_…`);
      process.exit(1);
    }
    console.log(`Webhook-ID automatisch: ${webhookId}`);
  }

  let whsec = whsecArg?.startsWith("whsec_") ? whsecArg : null;

  if (!whsec) {
    console.log("Versuche Secret-Rotation per API…");
    const rotated = (await stripePost(`/webhook_endpoints/${webhookId}/secret`, secret)) as Record<
      string,
      unknown
    >;
    whsec = extractSecret(rotated);
    if (!whsec) {
      console.log("\n⚠️  API liefert kein whsec_ (normal bei älteren Endpoints).");
      console.log("Bitte im Stripe-Dashboard kopieren:");
      console.log("  Entwickler → Webhooks → Endpunkt → Signatur-Geheimnis → Anzeigen");
      console.log("\nDann:");
      console.log(`  pnpm run stripe:setup-webhook -- --webhook-id=${webhookId} --whsec=whsec_… --railway-apply`);
      process.exit(1);
    }
    console.log(`whsec_ aus API: ${whsec.slice(0, 12)}…`);
  }

  console.log(`\nRailway-Befehl:\nrailway variables --set "STRIPE_WEBHOOK_SECRET=${whsec}"`);

  if (railwayApply) {
    execSync(`railway variables --set "STRIPE_WEBHOOK_SECRET=${whsec}"`, { stdio: "inherit" });
    console.log("\n✅ STRIPE_WEBHOOK_SECRET in Railway gesetzt. 30s warten auf Redeploy.");
    console.log("\nTest-Event (CLI):");
    console.log(`  stripe events resend evt_… --webhook-endpoint=${webhookId} --api-key "$STRIPE_SECRET_KEY"`);
    console.log("  oder: stripe trigger checkout.session.completed --api-key \"$STRIPE_SECRET_KEY\"");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
