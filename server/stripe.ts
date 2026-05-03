import Stripe from "stripe";
import { Router, type Request, type Response } from "express";
import { sql } from "drizzle-orm";
import { logger } from "./_core/logger";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-02-25.clover",
}) as any;

export const stripeRouter = Router();

// Produkte/Preise — Test-Konfiguration
const PRODUCTS = [
  {
    id: "modul_1",
    name: "Modul 1: Ihr Fundament in der Immobilienwirtschaft",
    description: "Der Grundstein Ihrer Immobilienkarriere: Recht, Markt, Bewertung und Praxis kompakt in 20 Lerntagen und 160 UE. Inklusive KI-Tutor und Zertifikat. Ideal als Einstieg — und Pflichtbasis für alle weiteren Module.",
    price: 14900, // in Cent = 149,00 €
    modules: "1",
  },
  {
    id: "modul_2",
    name: "Modul 2: Immobilienmakler §34c GewO — Die Lizenz zum Vermitteln",
    description: "Alles was Sie für die IHK-Sachkundeprüfung nach §34c GewO brauchen: Maklerrecht, Provision, Exposé, Kaufvertrag, Steuern. 60 Lerntage, 480 UE. Mit KI-Tutor, 300+ Prüfungsfragen und offiziellem Zertifikat.",
    price: 49900,
    modules: "2",
  },
  {
    id: "modul_3",
    name: "Modul 3: WEG-Verwalter & Mietrecht — Ihr Weg zur Hausverwaltung",
    description: "Professionelle Immobilienverwaltung von A bis Z: WEG-Reform 2020, Eigentümerversammlung, Nebenkostenabrechnung, Mietrecht §535ff BGB, Verwaltervertrag. 80 Lerntage, 640 UE. Für die Pflichtweiterbildung nach §26a WEG.",
    price: 69900,
    modules: "1,3",
  },
  {
    id: "modul_4",
    name: "Modul 4: Immobilienbewertung & Sachverständigenwesen",
    description: "Meistern Sie alle 3 Wertermittlungsverfahren nach ImmoWertV 2021: Vergleichswert, Ertragswert, Sachwert. Plus: Gutachtenerstellung, HypZert-Vorbereitung, Beleihungswert. 40 Lerntage, 320 UE.",
    price: 39900,
    modules: "1,4",
  },
  {
    id: "modul_5",
    name: "Modul 5: Darlehensvermittler §34i GewO — Finanzierung als Karriere",
    description: "Ihre Lizenz zur Immobilienfinanzierung: Annuitätendarlehen, KfW-Förderprogramme, ESIS-Merkblatt, EU-Wohnimmobilienkreditrichtlinie (EU-WIKR). 40 Lerntage, 320 UE. IHK-Sachkundeprüfung §34i GewO bestehen.",
    price: 49900,
    modules: "1,5",
  },
  {
    id: "modul_komplett",
    name: "Komplett-Ausbildung: Alle 5 Module — Der komplette Immobilienprofi",
    description: "Die komplette Immobilienausbildung in einem Paket: Makler, Verwalter, Gutachter, Finanzierer — alles was der Markt verlangt. 240 Lerntage, 1920 UE, 5 Zertifikate, 855+ Prüfungsfragen, KI-Tutor. Einmalig kaufen, lebenslang nutzen.",
    price: 195500,
    modules: "1,2,3,4,5",
  },
];
// GET /api/stripe/products — Produktliste für Kurse-Seite
stripeRouter.get("/api/stripe/products", (_req, res) => {
  const formatted = PRODUCTS.map(p => ({
    ...p,
    priceFormatted: (p.price / 100).toLocaleString("de-DE", {
      style: "currency", currency: "EUR"
    }),
  }));
  res.json(formatted);
});



// Checkout Session erstellen
stripeRouter.post("/api/stripe/checkout", async (req, res) => {
    const { widerrufsAkzeptiert } = req.body;
    if (!widerrufsAkzeptiert) {
      return res.status(400).json({
        error: "Widerrufsrecht-Einwilligung erforderlich (§356 Abs. 5 BGB)"
      });
    }
  try {
    const { productId, userEmail } = req.body;
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return res.status(404).json({ error: "Produkt nicht gefunden" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      invoice_creation: { enabled: true },
      mode: "payment",
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.APP_URL || "https://immobilie-akademie-production.up.railway.app"}/zahlung-erfolgreich?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL || "https://immobilie-akademie-production.up.railway.app"}/kurse`,
      metadata: {
        modules: product.modules,
        productId: product.id,
      },
    });

    res.json({ url: session.url });
  } catch (err: any) {
    logger.error("[Stripe] Checkout error", err);
    res.status(500).json({ error: err.message });
  }
});

  // ── Bundle-Checkout-Pakete ──────────────────────────────────
  const BUNDLES: Record<string, { modules: number[], price: number, name: string, desc: string }> = {
    "starter":      { modules:[1,2],       price:54900,  name:"Starter-Paket (M1+M2)",              desc:"Grundkurs + Makler §34c — Einstieg in die Immobilienvermittlung" },
    "verwalter":    { modules:[1,3],       price:74900,  name:"Verwalter-Paket (M1+M3)",             desc:"Grundkurs + WEG-Verwalter — Hausverwaltung professionell" },
    "makler-plus":  { modules:[1,2,5],     price:104900, name:"Makler-Plus (M1+M2+M5)",              desc:"Makler + Darlehensvermittler — Doppellizenz §34c + §34i" },
    "profi":        { modules:[1,2,3],     price:119900, name:"Immobilienprofi (M1+M2+M3)",          desc:"Makler + Verwalter — die beliebteste Kombination" },
    "gutachter":    { modules:[1,2,4],     price:99900,  name:"Gutachter-Paket (M1+M2+M4)",         desc:"Makler + Immobilienbewertung — Bewertung und Vermittlung" },
    "komplett":     { modules:[1,2,3,4,5], price:195500, name:"Komplett-Ausbildung (alle 5 Module)", desc:"Alle 5 Berufsbilder — maximale Karrierechancen in der Immobilienwirtschaft" },
  };

  stripeRouter.post("/bundle-:bundleId", async (req: Request, res: Response) => {
    const { bundleId } = req.params;
    const bundle = BUNDLES[bundleId as string];
    if (!bundle) return void res.status(404).json({ error: "Bundle nicht gefunden" });
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{ price_data: {
          currency: "eur",
          unit_amount: bundle.price,
          product_data: { name: bundle.name },
        }, quantity: 1 }],
        success_url: String(req.headers.origin) + "/zahlung-erfolgreich?bundle=" + bundleId,
        cancel_url: String(req.headers.origin) + "/pakete",
        metadata: { bundle: bundleId, modules: bundle.modules.map(String).join(",") },
      });
      res.json({ url: session.url }); return;
    } catch(e: any) {
      logger.error("[Stripe Bundle] Checkout error", e);
      res.status(500).json({ error: e.message }); return;
    }
  });

// ── Stripe Webhook (Kauf-Bestätigung → Modul freischalten) ──
// Webhook wird direkt in index.ts vor express.json() gemountet

// ── Exportierter Webhook-Handler ──
export async function stripeWebhookHandler(req: any, res: any) {
  const sig = req.headers["stripe-signature"];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "Webhook secret missing" });
  }
  let event: any;
  try {
    event = (stripe as any).webhooks.constructEvent(req.body, sig, secret);
  } catch (err: any) {
    logger.error("[Stripe Webhook] Signatur ungültig", err);
    return res.status(400).send("Webhook Error: " + err.message);
  }
  if (event.type !== "checkout.session.completed") {
    return res.json({ received: true });
  }
  const session = event.data.object;
  const modules = session.metadata?.modules ?? session.metadata?.bundle;
  const email = session.customer_email ?? session.customer_details?.email ?? session.metadata?.email;
  logger.info("[Stripe Webhook] Kauf", { email, modules });
  if (email && modules) {
    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      const rows = await db.execute(
        sql`SELECT id, name, enabledModules FROM users WHERE email = ${email}`
      ) as any;
      const userRows = (rows as any).rows ?? (rows as any[]);
      if (userRows.length > 0) {
        const user = userRows[0];
        const current = (user.enabledModules || "").split(",").map((s: string) => s.trim()).filter(Boolean);
        const newMods = modules.split(",").map((s: string) => s.trim()).filter(Boolean);
        const merged = [...new Set([...current, ...newMods])].join(",");
        await db.execute(sql`UPDATE users SET enabledModules = ${merged} WHERE id = ${user.id}`);
        logger.info("[Stripe Webhook] Freigeschaltet", { email, modules: merged });
      } else {
        logger.warn("[Stripe Webhook] Nutzer nicht gefunden", { email });
      }
    } catch (err: any) {
      logger.error("[Stripe Webhook] DB-Fehler", err);
    }
  }
  res.json({ received: true });
}
