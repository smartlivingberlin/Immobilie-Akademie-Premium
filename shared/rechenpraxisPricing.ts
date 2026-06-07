import { RECHENPRAXIS_STANDALONE_MONTHLY_EUR } from "./rechenpraxisProduct";

/** Rechenpraxis Standalone — Preispositionierung (Spin-off / SaaS) */

export const RECHENPRAXIS_PLANS = [
  {
    id: "included",
    name: "Im Modulkurs inklusive",
    priceEur: 0,
    period: "inklusive",
    highlight: false,
    features: [
      "128 interaktive Aufgaben",
      "KI-Erklärung pro Schritt",
      "Fortschritt lokal gespeichert",
      "2× Lernzeit Zugang inklusive",
    ],
    cta: { label: "Kurse ansehen", href: "/kurse" },
    checkout: false,
  },
  {
    id: "standalone",
    name: "Rechenpraxis Solo",
    priceEur: RECHENPRAXIS_STANDALONE_MONTHLY_EUR,
    period: "Monat",
    highlight: true,
    features: [
      "128 Aufgaben — nur Rechenpraxis",
      "KI-Erklärung (50 Nachrichten/Tag)",
      "Monatlich kündbar",
      "Ideal ohne Vollkurs",
    ],
    cta: { label: "Jetzt abonnieren", href: "/rechenpraxis-preise" },
    checkout: true,
  },
  {
    id: "renewal",
    name: "Portal-Verlängerung",
    priceEur: 29,
    period: "Jahr",
    highlight: false,
    features: [
      "Alle gekauften Module weiter nutzen",
      "Rechenpraxis + Rechner + KI-Tutor",
      "50 KI-Nachrichten/Tag (Fair-Use)",
      "Alternative: 5 €/Monat",
    ],
    cta: { label: "Nach Kursablauf", href: "/statistiken" },
    checkout: false,
  },
  {
    id: "team",
    name: "Team / Verwaltungsbüro",
    priceEur: 199,
    period: "Monat",
    highlight: false,
    features: [
      "Bis 10 Nutzer (Starter)",
      "White-Label + Rechenpraxis für alle",
      "Admin-Dashboard & Zugangscodes",
      "Professional: 399 €/Mo · 25 Nutzer",
    ],
    cta: { label: "B2B-Angebot", href: "/fuer-maklerbueros" },
    checkout: false,
  },
] as const;

export const RECHENPRAXIS_STANDALONE_NOTE =
  "Rechenpraxis Solo ab 19 €/Monat — oder inklusive bei Modulkauf, Verlängerung oder B2B-Tenant.";
