/**
 * Verwalter-Rechner / Rechenpraxis — Produkt-Roadmap (Agentur-Plan).
 * Kanonische Phasen für eigenständiges Verwalter-Produkt → CRM-Suite.
 */

export type RoadmapPhase = "now" | "p1" | "p2" | "p3";

export type RoadmapItem = {
  id: string;
  phase: RoadmapPhase;
  title: string;
  description: string;
  value: "high" | "medium" | "low";
  effort: "small" | "medium" | "large";
  /** Arbeitstyp aus Hausverwaltung, den dies adressiert */
  workTypes: string[];
};

/** Typische Verwaltungs-Arbeit (Recherche Markt 2025/26) */
export const HAUSVERWALTUNG_WORK_TYPES = [
  "Nebenkostenabrechnung & Hausgeld",
  "Wirtschaftsplan & Rücklagen",
  "Eigentümerversammlung (ETV) & Beschlüsse",
  "Mahnwesen & Rückstände",
  "Mieter-/Eigentümer-Kommunikation",
  "Instandhaltung & Dienstleister",
  "Dokumentenmanagement (Rechnungen, Verträge)",
  "Buchhaltung & DATEV",
  "Fristen & Wiedervorlagen",
  "Verkehrswert / Wertermittlung",
] as const;

export const VERWALTER_PRODUCT_ROADMAP: RoadmapItem[] = [
  {
    id: "shell",
    phase: "now",
    title: "Eigenes Produkt-Shell",
    description: "RechenpraxisProductLayout, Login-Redirect, /app/verwalter",
    value: "high",
    effort: "small",
    workTypes: ["Kommunikation"],
  },
  {
    id: "hero-cta",
    phase: "now",
    title: "Sichtbarer Hero-CTA (2×)",
    description: "WEG-Badge auf Startseite vergrößert, direkter Funnel",
    value: "high",
    effort: "small",
    workTypes: ["Kommunikation"],
  },
  {
    id: "vorlagen-mvp",
    phase: "p1",
    title: "20 WEG-Vorlagen (ETV, Mahnung, NK)",
    description: "Ausfüllbare Markdown/PDF mit KI-Brief-Generator",
    value: "high",
    effort: "medium",
    workTypes: ["ETV & Beschlüsse", "Mahnwesen", "NK-Abrechnung", "Kommunikation"],
  },
  {
    id: "fristen",
    phase: "p1",
    title: "Fristen- & Beschluss-Checkliste",
    description: "Anfechtung § 46 WEG, NK-Widerspruch, ETV-Einladungsfrist",
    value: "high",
    effort: "medium",
    workTypes: ["Fristen", "ETV & Beschlüsse"],
  },
  {
    id: "objekt-stamm",
    phase: "p2",
    title: "Objekt-Stammdaten (1 WEG = 1 Datensatz)",
    description: "Einheiten, MEA, Eigentümer — Basis für CRM",
    value: "high",
    effort: "large",
    workTypes: ["NK-Abrechnung", "Hausgeld", "Kommunikation"],
  },
  {
    id: "vorgaenge",
    phase: "p2",
    title: "Vorgangs-Tracker",
    description: "Beschluss, Mahnung, Schaden, ETV als Kanban/Timeline",
    value: "high",
    effort: "large",
    workTypes: ["Instandhaltung", "Mahnwesen", "ETV & Beschlüsse"],
  },
  {
    id: "ki-brief",
    phase: "p2",
    title: "KI-Brief-Generator mit Pflichtfeldern",
    description: "DSGVO-sicher, Paragraphen, Objektkontext aus Stammdaten",
    value: "high",
    effort: "medium",
    workTypes: ["Kommunikation", "Mahnwesen"],
  },
  {
    id: "b2b-verwalter",
    phase: "p2",
    title: "B2B Landing /fuer-verwaltungsbueros",
    description: "Eigener Checkout, Team-Lizenzen, White-Label",
    value: "medium",
    effort: "medium",
    workTypes: ["Kommunikation"],
  },
  {
    id: "subdomain",
    phase: "p3",
    title: "Subdomain verwalter.*",
    description: "Eigenes Deployment, skalierbar, JWT-Cookie-Domain",
    value: "medium",
    effort: "large",
    workTypes: [],
  },
  {
    id: "datev-light",
    phase: "p3",
    title: "DATEV-Export light",
    description: "CSV aus Hausgeld-Buchungen — Schnittstelle zu Treuhand",
    value: "medium",
    effort: "large",
    workTypes: ["Buchhaltung & DATEV"],
  },
];

/** Empfohlene Architektur-Evolution */
export const PRODUCT_ARCHITECTURE_PHASES = {
  phaseA: {
    label: "Embedded Product (jetzt)",
    stack: "React + Express, /rechenpraxis im Monorepo, RechenpraxisProductLayout",
    path: "/rechenpraxis, /app/verwalter/*",
  },
  phaseB: {
    label: "Modular Suite (6 Monate)",
    stack: "Gleiche DB, neue Router + Drizzle-Tabellen (objekte, vorgaenge, vorlagen)",
    path: "/app/verwalter/vorlagen, /app/verwalter/objekte",
  },
  phaseC: {
    label: "Verwalter-CRM (12+ Monate)",
    stack: "Optional separates Railway-Service, gemeinsame Auth, API-Gateway",
    path: "verwalter.immobilien-akademie-smart.de",
  },
} as const;
