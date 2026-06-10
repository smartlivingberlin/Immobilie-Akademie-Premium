/**
 * Kanonische Stripe-Produkte für Railway STRIPE_PRICE_* ENV-Variablen.
 * Beträge in Cent — abgeglichen mit server/stripe.ts, shared/b2bPlans.ts, shared/accessPolicy.ts.
 */

export type StripeSeedEntry = {
  envKey: string;
  productId: string;
  name: string;
  description: string;
  unitAmountCents: number;
  recurring?: "month" | "year";
};

export const STRIPE_SEED_SUBSCRIPTIONS: StripeSeedEntry[] = [
  {
    envKey: "STRIPE_PRICE_RECHENPRAXIS_MONTHLY",
    productId: "rechenpraxis_standalone",
    name: "Rechenpraxis Solo — 138 Aufgaben mit KI-Hilfe",
    description: "Monatliches Abo — nur Rechenpraxis, kein Vollkurs",
    unitAmountCents: 1900,
    recurring: "month",
  },
  {
    envKey: "STRIPE_PRICE_VERWALTER_TOOLS_MONTHLY",
    productId: "verwalter_tools",
    name: "Verwalter Tools — WEG-Suite",
    description: "25 Vorlagen, Objekte, Vorgänge, Buchungen, DATEV-Export, KI-Assistent",
    unitAmountCents: 3900,
    recurring: "month",
  },
  {
    envKey: "STRIPE_PRICE_RENEWAL_MONTHLY",
    productId: "renewal",
    name: "Portal-Verlängerung — 1 Monat",
    description: "Verlängerung aller gekauften Module",
    unitAmountCents: 500,
    recurring: "month",
  },
  {
    envKey: "STRIPE_PRICE_RENEWAL_YEARLY",
    productId: "renewal",
    name: "Portal-Verlängerung — 12 Monate",
    description: "Verlängerung aller gekauften Module",
    unitAmountCents: 2900,
    recurring: "year",
  },
  {
    envKey: "STRIPE_PRICE_COMPLIANCE_YEARLY",
    productId: "compliance_20h",
    name: "§34c Compliance — MaBV 20h Weiterbildungsnachweis",
    description: "Stundenlog, PDF-Export, Modul 2 Zugang — 12 Monate",
    unitAmountCents: 24900,
    recurring: "year",
  },
  {
    envKey: "STRIPE_PRICE_B2B_STARTER",
    productId: "b2b_starter",
    name: "B2B White-Label — Starter",
    description: "5 Nutzer, Module 1+2, eigenes Branding",
    unitAmountCents: 19900,
    recurring: "month",
  },
  {
    envKey: "STRIPE_PRICE_B2B_PROFESSIONAL",
    productId: "b2b_professional",
    name: "B2B White-Label — Professional",
    description: "15 Nutzer, alle 5 Module, Admin-Dashboard",
    unitAmountCents: 39900,
    recurring: "month",
  },
];

export const STRIPE_SEED_ONE_TIME: StripeSeedEntry[] = [
  {
    envKey: "STRIPE_PRICE_MODUL_1",
    productId: "modul_1",
    name: "Modul 1: Ihr Fundament in der Immobilienwirtschaft",
    description: "Grundstein Ihrer Immobilienkarriere — 20 Lerntage, 160 UE",
    unitAmountCents: 14900,
  },
  {
    envKey: "STRIPE_PRICE_MODUL_2",
    productId: "modul_2",
    name: "Modul 2: Immobilienmakler §34c GewO",
    description: "Fach- und Praxisvorbereitung — 60 Lerntage, 480 UE",
    unitAmountCents: 49900,
  },
  {
    envKey: "STRIPE_PRICE_MODUL_3",
    productId: "modul_3",
    name: "Modul 3: WEG-Verwalter & Mietrecht",
    description: "Hausverwaltung professionell — 80 Lerntage, 640 UE",
    unitAmountCents: 69900,
  },
  {
    envKey: "STRIPE_PRICE_MODUL_4",
    productId: "modul_4",
    name: "Modul 4: Immobilienbewertung & Sachverständigenwesen",
    description: "Wertermittlung nach ImmoWertV — 40 Lerntage, 320 UE",
    unitAmountCents: 39900,
  },
  {
    envKey: "STRIPE_PRICE_MODUL_5",
    productId: "modul_5",
    name: "Modul 5: Darlehensvermittler §34i GewO",
    description: "Immobilienfinanzierung — 40 Lerntage, 320 UE",
    unitAmountCents: 49900,
  },
  {
    envKey: "STRIPE_PRICE_MODUL_KOMPLETT",
    productId: "modul_komplett",
    name: "Komplett-Ausbildung: Alle 5 Module",
    description: "240 Lerntage, 1920 UE, 5 Zertifikate",
    unitAmountCents: 195500,
  },
  {
    envKey: "STRIPE_PRICE_BUNDLE_STARTER",
    productId: "starter",
    name: "Starter-Paket (M1+M2)",
    description: "Grundkurs + Makler §34c",
    unitAmountCents: 54900,
  },
  {
    envKey: "STRIPE_PRICE_BUNDLE_VERWALTER",
    productId: "verwalter",
    name: "Verwalter-Paket (M1+M3)",
    description: "Grundkurs + WEG-Verwalter",
    unitAmountCents: 69900,
  },
  {
    envKey: "STRIPE_PRICE_BUNDLE_MAKLER_PLUS",
    productId: "makler-plus",
    name: "Makler-Plus (M1+M2+M5)",
    description: "Maklerwissen + Immobilienfinanzierung",
    unitAmountCents: 104900,
  },
  {
    envKey: "STRIPE_PRICE_BUNDLE_PROFI",
    productId: "profi",
    name: "Immobilienprofi (M1+M2+M3)",
    description: "Makler + Verwalter Kombination",
    unitAmountCents: 119900,
  },
  {
    envKey: "STRIPE_PRICE_BUNDLE_GUTACHTER",
    productId: "gutachter",
    name: "Gutachter-Paket (M1+M2+M4)",
    description: "Makler + Immobilienbewertung",
    unitAmountCents: 99900,
  },
  {
    envKey: "STRIPE_PRICE_BUNDLE_KOMPLETT",
    productId: "komplett",
    name: "Komplett-Ausbildung (alle 5 Module)",
    description: "Alle 5 Berufsbilder — maximale Karrierechancen",
    unitAmountCents: 195500,
  },
];

export const STRIPE_SEED_CATALOG: StripeSeedEntry[] = [
  ...STRIPE_SEED_SUBSCRIPTIONS,
  ...STRIPE_SEED_ONE_TIME,
];

export function formatStripeSeedEnvBlock(priceIds: Record<string, string>): string {
  return STRIPE_SEED_CATALOG.map((e) => `${e.envKey}=${priceIds[e.envKey] ?? "price_…"}`).join("\n");
}
