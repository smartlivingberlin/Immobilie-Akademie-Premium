import Stripe from "stripe";
import { Router, type Request, type Response } from "express";
import { sql } from "drizzle-orm";
import { Resend } from "resend";

function createResend() {
  return new Resend(process.env.RESEND_API_KEY || "");
}
import { logger } from "./_core/logger";
import { requireAuth } from "./authMiddleware";
import { RENEWAL_MONTHLY_EUR, RENEWAL_YEARLY_EUR } from "../shared/accessPolicy";
import { COMPLIANCE_PRODUCT_ID, COMPLIANCE_YEARLY_EUR } from "../shared/compliance";
import { B2B_PLANS, type B2bPlanId } from "../shared/b2bPlans";
import {
  RECHENPRAXIS_MODULE_SENTINEL,
  RECHENPRAXIS_PRODUCT_ID,
  RECHENPRAXIS_STANDALONE_MONTHLY_EUR,
} from "../shared/rechenpraxisProduct";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-02-25.clover",
}) as any;

export const stripeRouter = Router();

// Produkte/Preise — Test-Konfiguration
const PRODUCTS = [
  {
    id: "modul_1",
    name: "Modul 1: Ihr Fundament in der Immobilienwirtschaft",
    description: "Der Grundstein Ihrer Immobilienkarriere: Recht, Markt, Bewertung und Praxis kompakt in 20 Lerntagen und 160 UE. Inklusive KI-Tutor und Kursabschluss-Zertifikat. Empfohlen als Einstieg in die weiteren Module.",
    price: 14900, // in Cent = 149,00 €
    modules: "1",
  },
  {
    id: "modul_2",
    name: "Modul 2: Immobilienmakler §34c GewO — Fach- und Praxisvorbereitung",
    description: "Strukturierte Fach- und Praxisvorbereitung für Immobilienmakler nach §34c GewO: Maklerrecht, Provision, Exposé, Kaufvertrag, Steuern. 60 Lerntage, 480 UE. Mit KI-Tutor, Praxisaufgaben, Lernfragen und Kursabschluss-Zertifikat.",
    price: 49900,
    modules: "2",
  },
  {
    id: "modul_3",
    name: "Modul 3: WEG-Verwalter & Mietrecht — Ihr Weg zur Hausverwaltung",
    description: "Grundlagen und Praxis der Immobilienverwaltung: WEG-Reform 2020, Eigentümerversammlung, Nebenkostenabrechnung, Mietrecht §535ff BGB und Verwaltervertrag. 80 Lerntage, 640 UE. Orientiert an typischen Weiterbildungsthemen für WEG-Verwalter.",
    price: 69900,
    modules: "1,3",
  },
  {
    id: "modul_4",
    name: "Modul 4: Immobilienbewertung & Sachverständigenwesen",
    description: "Lernen Sie zentrale Wertermittlungsverfahren nach ImmoWertV 2021 kennen: Vergleichswert, Ertragswert und Sachwert. Plus: Gutachtenerstellung, Beleihungswert und Bewertungsgrundlagen. 40 Lerntage, 320 UE.",
    price: 39900,
    modules: "1,4",
  },
  {
    id: "modul_5",
    name: "Modul 5: Darlehensvermittler §34i GewO — Immobilienfinanzierung",
    description: "Fach- und Praxisvorbereitung zu zentralen §34i-Themen: Annuitätendarlehen, KfW-Förderprogramme, ESIS-Merkblatt und EU-Wohnimmobilienkreditrichtlinie (EU-WIKR). 40 Lerntage, 320 UE.",
    price: 49900,
    modules: "1,5",
  },
  {
    id: "modul_komplett",
    name: "Komplett-Ausbildung: Alle 5 Module — breites Immobilienwissen",
    description: "Alle 5 Module in einem Paket: Maklerrecht, Verwaltung, Bewertung und Immobilienfinanzierung. 240 Lerntage, 1920 UE, 5 Kursabschluss-Zertifikate. Inkl. 20 Monate Zugang (doppelte Lernzeit). Verlängerung ab 29 €/Jahr.",
    price: 195500,
    modules: "1,2,3,4,5",
  },
  {
    id: COMPLIANCE_PRODUCT_ID,
    name: "§34c Compliance — MaBV 20h Weiterbildungsnachweis",
    description:
      "Jahreszugang: serverseitiger Stundenlog, PDF-Export nach §15b MaBV, Modul 2 Weiterbildungsthemen. Alternative zum Vollkurs — für erfahrene Makler mit Nachweispflicht.",
    price: COMPLIANCE_YEARLY_EUR * 100,
    modules: "2",
  },
];
// Verlängerung — 5 €/Monat oder 29 €/Jahr (nur gekaufte Module)
stripeRouter.post("/api/stripe/renewal-checkout", requireAuth, async (req: any, res) => {
  try {
    const interval = req.body?.interval === "year" ? "year" : "month";
    const amount = interval === "year" ? RENEWAL_YEARLY_EUR * 100 : RENEWAL_MONTHLY_EUR * 100;
    const label =
      interval === "year"
        ? "Portal-Verlängerung — 12 Monate (alle gekauften Module)"
        : "Portal-Verlängerung — 1 Monat (alle gekauften Module)";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: req.currentUser.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: label },
            unit_amount: amount,
            recurring: { interval },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.APP_URL || "https://immobilien-akademie-smart.de"}/statistiken?renewed=1`,
      cancel_url: `${process.env.APP_URL || "https://immobilien-akademie-smart.de"}/statistiken`,
      metadata: {
        type: "renewal",
        interval,
        userId: String(req.currentUser.id),
      },
      subscription_data: {
        metadata: {
          type: "renewal",
          interval,
          userId: String(req.currentUser.id),
        },
      },
    });

    res.json({ url: session.url });
  } catch (err: any) {
    logger.error("[Stripe] Renewal checkout error", err);
    res.status(500).json({ error: err.message });
  }
});

// Compliance-Abo — 249 €/Jahr (§15b MaBV Nachweis + Modul 2)
stripeRouter.post("/api/stripe/compliance-checkout", requireAuth, async (req: any, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: req.currentUser.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "§34c Compliance — MaBV 20h Weiterbildungsnachweis",
              description: "Stundenlog, PDF-Export, Modul 2 Zugang — 12 Monate",
            },
            unit_amount: COMPLIANCE_YEARLY_EUR * 100,
            recurring: { interval: "year" },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.APP_URL || "https://immobilien-akademie-smart.de"}/weiterbildungsnachweis?compliance=1`,
      cancel_url: `${process.env.APP_URL || "https://immobilien-akademie-smart.de"}/compliance-20h`,
      metadata: {
        type: "compliance",
        productId: COMPLIANCE_PRODUCT_ID,
        userId: String(req.currentUser.id),
        modules: "2",
      },
      subscription_data: {
        metadata: {
          type: "compliance",
          productId: COMPLIANCE_PRODUCT_ID,
          userId: String(req.currentUser.id),
          modules: "2",
        },
      },
    });
    res.json({ url: session.url });
  } catch (err: any) {
    logger.error("[Stripe] Compliance checkout error", err);
    res.status(500).json({ error: err.message });
  }
});

// Rechenpraxis Solo — 19 €/Monat (nur Rechenpraxis + KI Fair-Use)
stripeRouter.post("/api/stripe/rechenpraxis-checkout", requireAuth, async (req: any, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: req.currentUser.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Rechenpraxis Solo — 128 Aufgaben mit KI-Hilfe",
              description: "Monatliches Abo — nur Rechenpraxis, kein Vollkurs",
            },
            unit_amount: RECHENPRAXIS_STANDALONE_MONTHLY_EUR * 100,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.APP_URL || "https://immobilien-akademie-smart.de"}/rechenpraxis?subscribed=1`,
      cancel_url: `${process.env.APP_URL || "https://immobilien-akademie-smart.de"}/rechenpraxis-preise`,
      metadata: {
        type: "rechenpraxis",
        productId: RECHENPRAXIS_PRODUCT_ID,
        userId: String(req.currentUser.id),
        modules: RECHENPRAXIS_MODULE_SENTINEL,
      },
      subscription_data: {
        metadata: {
          type: "rechenpraxis",
          productId: RECHENPRAXIS_PRODUCT_ID,
          userId: String(req.currentUser.id),
          modules: RECHENPRAXIS_MODULE_SENTINEL,
        },
      },
    });
    res.json({ url: session.url });
  } catch (err: any) {
    logger.error("[Stripe] Rechenpraxis checkout error", err);
    res.status(500).json({ error: err.message });
  }
});

// B2B White-Label — 199 €/399 € pro Monat
stripeRouter.post("/api/stripe/b2b-checkout", requireAuth, async (req: any, res) => {
  try {
    const planId = String(req.body?.planId || "") as B2bPlanId;
    const plan = B2B_PLANS[planId];
    const companyName = String(req.body?.companyName || "").trim().slice(0, 120);
    if (!plan) return res.status(400).json({ error: "Ungültiger B2B-Plan" });
    if (!companyName) return res.status(400).json({ error: "Firmenname erforderlich" });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: req.currentUser.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `White-Label ${plan.name} — Immobilien Akademie Smart`,
              description: `${plan.maxUsers} Nutzer · Module ${plan.enabledModules}`,
            },
            unit_amount: plan.priceEur * 100,
            recurring: { interval: plan.interval },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.APP_URL || "https://immobilien-akademie-smart.de"}/fuer-maklerbueros?b2b=1`,
      cancel_url: `${process.env.APP_URL || "https://immobilien-akademie-smart.de"}/fuer-maklerbueros`,
      metadata: {
        type: "b2b",
        planId,
        companyName,
        userId: String(req.currentUser.id),
      },
      subscription_data: {
        metadata: {
          type: "b2b",
          planId,
          companyName,
          userId: String(req.currentUser.id),
        },
      },
    });
    res.json({ url: session.url });
  } catch (err: any) {
    logger.error("[Stripe] B2B checkout error", err);
    res.status(500).json({ error: err.message });
  }
});

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
      invoice_creation: { enabled: true },
      mode: "payment",
      customer_email: userEmail || undefined,
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
      success_url: `${process.env.APP_URL || "https://immobilien-akademie-smart.de"}/zahlung-erfolgreich?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL || "https://immobilien-akademie-smart.de"}/kurse`,
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
    "verwalter":    { modules:[1,3],       price:69900,  name:"Verwalter-Paket (M1+M3)",             desc:"Grundkurs + WEG-Verwalter — Hausverwaltung professionell" },
    "makler-plus":  { modules:[1,2,5],     price:104900, name:"Makler-Plus (M1+M2+M5)",              desc:"Maklerwissen + Immobilienfinanzierung — §34c- und §34i-Themen kombiniert" },
    "profi":        { modules:[1,2,3],     price:119900, name:"Immobilienprofi (M1+M2+M3)",          desc:"Makler + Verwalter — praxisnahe Kombination" },
    "gutachter":    { modules:[1,2,4],     price:99900,  name:"Gutachter-Paket (M1+M2+M4)",         desc:"Makler + Immobilienbewertung — Bewertung und Vermittlung" },
    "komplett":     { modules:[1,2,3,4,5], price:195500, name:"Komplett-Ausbildung (alle 5 Module)", desc:"Alle 5 Module — breites Praxiswissen in der Immobilienwirtschaft" },
  };

  stripeRouter.post("/api/stripe/bundle-:bundleId", async (req: Request, res: Response) => {
    const { bundleId } = req.params;
    const bundle = BUNDLES[bundleId as string];
    if (!bundle) return void res.status(404).json({ error: "Bundle nicht gefunden" });
    const { widerrufsAkzeptiert, userEmail } = req.body;
    if (!widerrufsAkzeptiert) {
      return void res.status(400).json({ error: "Widerrufsrecht-Einwilligung erforderlich (§356 Abs. 5 BGB)" });
    }
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: userEmail || undefined,
        line_items: [{ price_data: {
          currency: "eur",
          unit_amount: bundle.price,
          product_data: { name: bundle.name, description: bundle.desc },
        }, quantity: 1 }],
        success_url: `${process.env.APP_URL || "https://immobilien-akademie-smart.de"}/zahlung-erfolgreich?session_id={CHECKOUT_SESSION_ID}&bundle=${bundleId}`,
        cancel_url: `${process.env.APP_URL || "https://immobilien-akademie-smart.de"}/pakete`,
        metadata: { bundle: bundleId, productId: bundleId, modules: bundle.modules.map(String).join(",") },
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
        const { extendUserAccessFromPurchase } = await import("./accessExpiry");
        const { applyReferralPurchaseRewards } = await import("./referralRewards");
        await db.$client.query("UPDATE users SET enabledModules = ? WHERE id = ?", [merged, user.id]);
        await extendUserAccessFromPurchase(db, user.id, session.metadata?.productId, modules);
        await applyReferralPurchaseRewards(db, user.id);
        logger.info("[Stripe Webhook] Freigeschaltet", { email, modules: merged });
        // E-Mail nach Kauf senden
        try {
          const resend = createResend();
          const moduleNames: Record<string, string> = {
            "1": "Modul 1: Einführung & Grundlagen",
            "2": "Modul 2: Maklerrecht & §34c GewO",
            "3": "Modul 3: WEG-Verwaltung",
            "4": "Modul 4: Wertermittlung & Gutachten",
            "5": "Modul 5: Finanzierung & §34i",
          };
          const modList = newMods.map((m: string) => moduleNames[m] || `Modul ${m}`).join(", ");
          await resend.emails.send({
            from: "Immobilien Akademie Smart <info@immobilien-akademie-smart.de>",
            to: email,
            subject: "✅ Ihr Zugang ist freigeschaltet — Immobilien Akademie Smart",
            html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
              <h2 style="color:#1e40af">Herzlichen Glückwunsch, ${user.name || ""}!</h2>
              <p>Ihr Kauf war erfolgreich. Folgende Module sind jetzt freigeschaltet:</p>
              <p style="background:#eff6ff;padding:12px;border-radius:8px;font-weight:bold">${modList}</p>
              <p>Sie können jetzt direkt loslegen:</p>
              <a href="https://immobilien-akademie-smart.de/statistiken"
                 style="background:#1e40af;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block">
                Zum Portal →
              </a>
              <p style="color:#6b7280;font-size:13px;margin-top:24px">
                Bei Fragen: info@immobilien-akademie-smart.de<br>
                Immobilien Akademie Smart · Alisad Gadyri · Durlacher Str. 36 · 10715 Berlin
              </p>
            </div>`,
          });
          logger.info("[Stripe Webhook] Kaufbestätigung E-Mail gesendet", { email });
        } catch (emailErr) {
          logger.error("[Stripe Webhook] E-Mail-Fehler", emailErr);
        }
      } else {
        logger.warn("[Stripe Webhook] Nutzer nicht gefunden", { email });
      }
    } catch (err: any) {
      logger.error("[Stripe Webhook] DB-Fehler", err);
    }
  }
  res.json({ received: true });
}
