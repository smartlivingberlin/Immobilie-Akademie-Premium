import Stripe from "stripe";
import { Router } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-01-27.acacia",
});

export const stripeRouter = Router();

// Produkte/Preise — Test-Konfiguration
const PRODUCTS = [
  {
    id: "modul_1",
    name: "Modul 1: Einführung in die Immobilienwirtschaft",
    description: "Grundlagen der Immobilienwirtschaft — 44 Unterrichtseinheiten",
    price: 19900, // in Cent = 199,00 €
    modules: "1",
  },
  {
    id: "modul_2",
    name: "Modul 2: Makler §34c GewO",
    description: "Vollständige Maklerlizenz-Vorbereitung — 440 UE",
    price: 49900,
    modules: "2",
  },
  {
    id: "modul_komplett",
    name: "Komplettpaket: Alle 5 Module",
    description: "Vollständige IHK-Zertifizierung — 1760 Unterrichtseinheiten",
    price: 149900,
    modules: "1,2,3,4,5",
  },
];

// Checkout Session erstellen
stripeRouter.post("/api/stripe/checkout", async (req, res) => {
  try {
    const { productId, userEmail } = req.body;
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return res.status(404).json({ error: "Produkt nicht gefunden" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
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
      success_url: `${process.env.OAUTH_SERVER_URL}/zahlung-erfolgreich?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.OAUTH_SERVER_URL}/kurse`,
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

// Webhook — nach erfolgreicher Zahlung Module freischalten
stripeRouter.post("/api/stripe/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("[Stripe] Zahlung erfolgreich:", session.customer_email, session.metadata);
    // TODO: Module für User freischalten via session.metadata.modules
  }

  res.json({ received: true });
});

// Produkte abrufen
stripeRouter.get("/api/stripe/products", (_req, res) => {
  res.json(PRODUCTS.map((p) => ({
    ...p,
    priceFormatted: `${(p.price / 100).toFixed(2).replace(".", ",")} €`,
  })));
});
