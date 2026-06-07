import { getModuleDayCount, getModuleUeCount } from "@shared/moduleMeta";

// Offizielle Lehrplan-Daten für das Immobilien-Bildungsportal
// Basierend auf LehrplanText1-2202(1)(1).doc

export interface ModuleData {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  days: number;
  ue: number;
  status: 'completed' | 'active' | 'locked';
  topics: string[];
}

export const modules: ModuleData[] = [
  {
    id: 1,
    title: "Modul 1: Fachkenntnisse und Rechtsgrundlage",
    shortTitle: "Einführung",
    description: "Einführung in die Immobilienbranche, Struktur, Markt und aktuelle Trends.",
    days: 20,
    ue: 160,
    status: 'locked',
    topics: [
      "Einführung in die Immobilienbranche",
      "Rechtliche Grundlagen",
      "Berufsfelder",
      "Arbeitsalltag",
      "Digitale Tools",
      "Karriereplanung"
    ]
  },
  {
    id: 2,
    title: "Modul 2: Makler Basis nach §34c GewO",
    shortTitle: "Makler §34c",
    description: "Praxisorientierte Grundlagen für Immobilienmakler nach §34c GewO.",
    days: 60,
    ue: 480,
    status: 'completed', // Bereits in früheren Sessions erstellt
    topics: [
      "Erste Schritte als Makler",
      "Immobilie richtig Analysieren",
      "Kunden finden und betreuen",
      "Arbeit mit einem Verkaufsobjekt",
      "Marketing und Verhandlung",
      "Immobilie als Kapitalanlage",
      "Besondere Immobilien",
      "Langfristiger und sicherer Karriereweg"
    ]
  },
  {
    id: 3,
    title: "Modul 3: Immobilienverwaltung und Facility Management",
    shortTitle: "Verwalter & FM",
    description: "Ausbildung zum Immobilienverwalter und Facility Manager.",
    days: 80,
    ue: 640,
    status: 'active', // Aktueller Fokus
    topics: [
      "Einführung in die Immobilienverwaltung",
      "Markt- und Branchenanalyse",
      "Rechtliche Grundlagen (WEG, Mietrecht)",
      "Technische und kaufmännische Grundlagen",
      "EDV und Geschäftsprozesse",
      "Mietrechtliche Grundlagen",
      "Praxissimulationen (Mietminderung, Kündigung)",
      "Verwaltung von Gewerbeimmobilien",
      "Buchhaltung und Abrechnung",
      "Eigentümerversammlung",
      "Facility Management"
    ]
  },
  {
    id: 4,
    title: "Modul 4: Immobilienbewertung und Gutachtenerstellung",
    shortTitle: "Bewertung",
    description: "Grundlagen der Immobilienbewertung und Gutachtenerstellung.",
    days: getModuleDayCount(4),
    ue: getModuleUeCount(4),
    status: 'locked',
    topics: [
      "Grundlagen der Immobilienbewertung",
      "Marktanalyse und Standortbewertung",
      "Wertermittlungsverfahren (Vergleichs-, Ertrags-, Sachwert)",
      "Gutachtenerstellung",
      "Spezialfälle"
    ]
  },
  {
    id: 5,
    title: "Modul 5: Immobiliendarlehensvermittlung (§ 34i GewO)",
    shortTitle: "Finanzierung",
    description: "Fach- und Praxiswissen zu Immobiliardarlehensvermittlung nach §34i GewO.",
    days: getModuleDayCount(5),
    ue: getModuleUeCount(5),
    status: 'locked',
    topics: [
      "Rechtliche Grundlagen",
      "Kundenberatung",
      "Finanzierungsanlässe und Kreditprodukte",
      "Kreditkonditionen und -vergleich",
      "Kreditwürdigkeitsprüfung",
      "Wissenschecks und Praxisfälle"
    ]
  }
];

// Struktur für Modul 3 (80 Tage)
export interface DayContent {
  day: number;
  title: string;
  topic: string;
  ue: number;
  content: string; // HTML Content
}

// Hilfsfunktion um zu prüfen ob ein Tag existiert
export const isValidDay = (module: number, day: number): boolean => {
  const mod = modules.find(m => m.id === module);
  return mod ? day >= 1 && day <= mod.days : false;
};
