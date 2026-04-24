import Stripe from "stripe";
import { Router, type Request, type Response } from "express";
import { sql } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
});

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
    description: "Die komplette Immobilienausbildung in einem Paket: Makler, Verwalter, Gutachter, Finanzierer — alles was der Markt verlangt. 240 Lerntage, 1920 UE, 5 Zertifikate, 814+ Prüfungsfragen, KI-Tutor. Einmalig kaufen, lebenslang nutzen.",
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
    console.error("[Stripe] Checkout error:", err.message);
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
        metadata: { bundle: bundleId, modules: bundle.modules.join(",") },
      });
      return res.json({ url: session.url });
    } catch(e: any) {
      console.error("[Stripe Bundle]", e.message);
      return res.status(500).json({ error: e.message });
    }
  });

// ── Stripe Webhook (Kauf-Bestätigung → Modul freischalten) ──
stripeRouter.post("/api/stripe/webhook",
  (req: any, res: any, next: any) => { let data = ""; req.setEncoding("utf8"); req.on("data", (chunk: string) => { data += chunk; }); req.on("end", () => { (req as any).rawBody = data; req.body = data; next(); }) },
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"];
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) {
      console.error("[Stripe Webhook] STRIPE_WEBHOOK_SECRET nicht gesetzt!");
      return res.status(500).json({ error: "Webhook secret missing" });
    }
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig as string, secret);
    } catch (err: any) {
      console.error("[Stripe Webhook] Signatur ungültig:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const modules = session.metadata?.modules ?? session.metadata?.bundle;
      const email = session.customer_email ?? session.metadata?.email;
      const userName = session.metadata?.userName ?? "Lernender";
      console.log(`[Stripe Webhook] Kauf bestätigt: ${email}, Module: ${modules}`);

      if (email && modules) {
        try {
          const { getDb } = await import("./db");
          const db = await getDb();

          // ── 1. Nutzer in DB finden ─────────────────────────────
          const rows = await db.execute(
            sql`SELECT id, name, enabledModules FROM users WHERE email = ${email}`
          ) as any;
          const userRows = (rows as any).rows ?? rows as any[];

          if (userRows.length > 0) {
            const user = userRows[0];
            // ── 2. Module freischalten (enabledModules = "1,2,3") ──
            const current = (user.enabledModules || "")
              .split(",").map((s: string) => s.trim()).filter(Boolean);
            const newMods = modules.split(",").map((s: string) => s.trim()).filter(Boolean);
            const merged = [...new Set([...current, ...newMods])].join(",");

            await db.execute(
              sql`UPDATE users SET enabledModules = ${merged} WHERE id = ${user.id}`
            );
            console.log(`[Stripe Webhook] ✅ enabledModules="${merged}" für ${email} gesetzt`);

            // ── 3. Kaufbestätigung E-Mail senden ──────────────────
            try {
              const { Resend } = await import("resend");
              const resend = new Resend(process.env.RESEND_API_KEY);
              const moduleNames: Record<string, string> = {
                "1": "Modul 1: Immobilien-Grundkurs (149 €)",
                "2": "Modul 2: Immobilienmakler §34c (499 €)",
                "3": "Modul 3: WEG-Verwalter (699 €)",
                "4": "Modul 4: Gutachter (399 €)",
                "5": "Modul 5: §34i Darlehensvermittler (499 €)",
              };
              const gekauft = newMods.map((m: string) => moduleNames[m] || `Modul ${m}`).join(", ");
              const displayName = user.name || userName;
              const appUrl = process.env.APP_URL || "https://immobilien-akademie-smart.de";

              await resend.emails.send({
                from: "Immobilien Akademie Smart <info@immobilien-akademie-smart.de>",
                to: email,
                subject: "✅ Kauf bestätigt — Dein Zugang ist freigeschaltet!",
                html: `
                  <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px">
                    <div style="background:linear-gradient(135deg,#0f172a,#1e3a5f);padding:28px 32px;border-radius:14px 14px 0 0;text-align:center">
                      <h1 style="color:#f5c842;font-size:22px;margin:0">🎓 Immobilien Akademie Smart</h1>
                    </div>
                    <div style="background:#fff;border:1px solid #e2e8f0;border-top:none;padding:32px;border-radius:0 0 14px 14px">
                      <h2 style="color:#0f172a;font-size:20px;margin:0 0 16px">
                        ✅ Dein Zugang ist freigeschaltet, ${displayName}!
                      </h2>
                      <p style="color:#475569;line-height:1.7">
                        Vielen Dank für deinen Kauf. Du hast sofort Zugang zu:
                      </p>
                      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px;margin:16px 0">
                        <strong style="color:#065f46">📚 ${gekauft}</strong>
                      </div>
                      <p style="color:#475569;line-height:1.7">
                        Dein Zugang ist lebenslang — lerne in deinem eigenen Tempo.
                        Alle 5 Berufsbilder, KI-Tutor 24/7, 810+ IHK-Prüfungsfragen.
                      </p>
                      <div style="text-align:center;margin:28px 0">
                        <a href="${appUrl}/login"
                           style="background:linear-gradient(135deg,#2563eb,#4f46e5);color:white;
                                  padding:14px 32px;border-radius:10px;text-decoration:none;
                                  font-weight:700;font-size:16px;display:inline-block">
                          Jetzt lernen →
                        </a>
                      </div>
                      <hr style="border:none;border-top:1px solid #f1f5f9;margin:24px 0">
                      <p style="color:#94a3b8;font-size:12px;text-align:center">
                        Fragen? <a href="mailto:support@immobilien-akademie-smart.de" style="color:#2563eb">
                        support@immobilien-akademie-smart.de</a> · Antwort in 5 Werktagen<br>
                        Immobilien Akademie Smart · Durlacher Str. 36 · 10715 Berlin
                      </p>
                    </div>
                  </div>`,
              });
              console.log(`[Stripe Webhook] ✅ Kaufbestätigung E-Mail → ${email}`);
            } catch (emailErr: any) {
              console.error("[Stripe Webhook] E-Mail fehlgeschlagen:", emailErr.message);
              // Kein Re-Throw — Modul bleibt freigeschaltet
            }

          } else {
            // Nutzer nicht gefunden → trotzdem loggen
            console.warn(`[Stripe Webhook] ⚠️ Nutzer ${email} nicht in DB — Module: ${modules}`);
          }
        } catch (err: any) {
          console.error("[Stripe Webhook] DB-Fehler:", err.message);
        }
      }
    }
    res.json({ received: true });
  }
);
