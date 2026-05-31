/**
 * Knowledge Base for AI Tutor
 * Builds a searchable knowledge base from all portal content
 * No external APIs - purely local content
 */

import { glossaryData } from "@/data/glossary-data";
import { lawReferences } from "@/lib/lawLinks";

export interface KnowledgeEntry {
  id: string;
  type: "module" | "glossary" | "law" | "calculator";
  title: string;
  content: string;
  category?: string;
  module?: number;
  day?: number;
  keywords: string[];
}

/**
 * Build the complete knowledge base from all portal content
 */
export function buildKnowledgeBase(): KnowledgeEntry[] {
  const entries: KnowledgeEntry[] = [];

  // 1. Add Glossary Terms
  glossaryData.forEach((term, index) => {
    entries.push({
      id: `glossary-${index}`,
      type: "glossary",
      title: term.term,
      content: `${term.term}: ${term.definition}${term.lawReference ? ` Rechtsgrundlage: ${term.lawReference}` : ""}`,
      category: term.category,
      keywords: [
        term.term.toLowerCase(),
        ...term.term.toLowerCase().split(" "),
        term.category.toLowerCase(),
      ],
    });
  });

  // 2. Add Law References
  Object.entries(lawReferences).forEach(([key, law]) => {
    entries.push({
      id: `law-${key}`,
      type: "law",
      title: law.shortName,
      content: `${law.shortName} (${law.fullName}): Wichtiges Gesetz im Immobilienbereich. Quelle: ${law.url}`,
      keywords: [
        law.shortName.toLowerCase(),
        law.fullName.toLowerCase(),
        ...law.fullName.toLowerCase().split(" "),
      ],
    });
  });

  // 3. Add Module Summaries (High-level overview)
  const moduleSummaries = [
    {
      module: 1,
      title: "Modul 1: Einführung in die Immobilienbranche",
      content: "Grundlagen der Immobilienwirtschaft, Marktüberblick, rechtliche Rahmenbedingungen, Immobilientypen, Marktakteure. 20 Ausbildungstage mit Theorie, Gesetzeskunde und Praxis.",
      keywords: ["einführung", "grundlagen", "immobilienwirtschaft", "markt", "überblick"],
    },
    {
      module: 2,
      title: "Modul 2: Immobilienmakler nach §34c GewO",
      content: "Maklerrecht, §34c GewO, Vertragsgestaltung, Kundenakquise, Objektvermarktung, Courtage-Berechnung, Makleralleinauftrag, Provisionsanspruch. 60 Ausbildungstage mit umfassender Praxisvorbereitung.",
      keywords: ["makler", "§34c", "gewo", "courtage", "provision", "vermarktung", "auftrag"],
    },
    {
      module: 3,
      title: "Modul 3: Immobilienverwaltung (WEG & Mietverwaltung)",
      content: "WEG-Verwaltung, Mietverwaltung, Betriebskostenabrechnung, Eigentümerversammlungen, Hausgeldabrechnung, Instandhaltungsrücklage, Mietrecht, Nebenkostenabrechnung. 80 Ausbildungstage - umfangreichstes Modul.",
      keywords: ["verwaltung", "weg", "mietverwaltung", "betriebskosten", "hausgeld", "eigentümerversammlung"],
    },
    {
      module: 4,
      title: "Modul 4: Gutachten & Sachverständigenwesen",
      content: "Immobilienbewertung, Wertermittlungsverfahren (Vergleichswert, Ertragswert, Sachwert), Gutachtenerstellung, Sachverständigenrecht, Verkehrswertermittlung. 20 Ausbildungstage.",
      keywords: ["gutachten", "bewertung", "wertermittlung", "sachverständiger", "verkehrswert"],
    },
    {
      module: 5,
      title: "Modul 5: Darlehensvermittlung §34i und Finanzierungspraxis",
      content: "Darlehensvermittlung nach §34i GewO, Finanzierungsberatung, Kreditrecht, Annuitätendarlehen und Tilgungsrechnung. 40 Lerntage mit Praxisbezug.",
      keywords: ["§34i", "darlehen", "finanzierung", "kredit", "praxis", "wissen"],
    },
  ];

  moduleSummaries.forEach((module) => {
    entries.push({
      id: `module-${module.module}`,
      type: "module",
      title: module.title,
      content: module.content,
      module: module.module,
      keywords: module.keywords,
    });
  });

  // 4. Add Calculator Information
  const calculators = [
    {
      title: "Maklercourtage-Rechner",
      content: "Berechnet die Maklercourtage basierend auf Kaufpreis und Provisionssatz. Seit 2020 gilt das Bestellerprinzip: Wer den Makler beauftragt, zahlt mindestens 50% der Provision.",
      keywords: ["courtage", "provision", "makler", "bestellerprinzip", "rechner"],
    },
    {
      title: "Hausgeld-Rechner",
      content: "Kalkuliert das monatliche Hausgeld für Eigentumswohnungen. Umfasst Verwaltungskosten, Instandhaltungsrücklage, Betriebskosten, Heizkosten und Sonderumlagen.",
      keywords: ["hausgeld", "betriebskosten", "weg", "rücklage", "rechner"],
    },
    {
      title: "Mietrendite-Rechner",
      content: "Berechnet Brutto- und Netto-Mietrendite von Immobilien. Berücksichtigt Kaufpreis, Kaufnebenkosten, Jahresmiete und laufende Kosten.",
      keywords: ["rendite", "mietrendite", "kapitalanlage", "investment", "rechner"],
    },
  ];

  calculators.forEach((calc, index) => {
    entries.push({
      id: `calculator-${index}`,
      type: "calculator",
      title: calc.title,
      content: calc.content,
      keywords: calc.keywords,
    });
  });

  return entries;
}

/**
 * Search the knowledge base for relevant entries
 */
export function searchKnowledgeBase(
  query: string,
  knowledgeBase: KnowledgeEntry[],
  maxResults: number = 5
): KnowledgeEntry[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(" ").filter((w) => w.length > 2);

  // Score each entry based on relevance
  const scored = knowledgeBase.map((entry) => {
    let score = 0;

    // Exact title match (highest priority)
    if (entry.title.toLowerCase().includes(queryLower)) {
      score += 100;
    }

    // Content match
    if (entry.content.toLowerCase().includes(queryLower)) {
      score += 50;
    }

    // Keyword matches
    for (const keyword of entry.keywords) {
      if (queryLower.includes(keyword)) {
        score += 20;
      }
    }

    // Individual word matches
    for (const word of queryWords) {
      if (entry.content.toLowerCase().includes(word)) {
        score += 10;
      }
      if (entry.keywords.some((k) => k.includes(word))) {
        score += 15;
      }
    }

    return { entry, score };
  });

  // Filter and sort by score
  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map((item) => item.entry);
}

/**
 * Generate a context-aware response based on knowledge base
 */
export function generateResponse(
  query: string,
  relevantEntries: KnowledgeEntry[]
): string {
  if (relevantEntries.length === 0) {
    return "Entschuldigung, ich konnte keine passenden Informationen in meiner Wissensdatenbank finden. Bitte formulieren Sie Ihre Frage anders oder durchsuchen Sie das Glossar.";
  }

  // Build response from relevant entries
  let response = "Basierend auf den Inhalten des Portals:\n\n";

  relevantEntries.forEach((entry, index) => {
    response += `**${entry.title}**\n${entry.content}\n\n`;

    if (entry.type === "module") {
      response += `➡️ Mehr Details finden Sie in ${entry.title}\n\n`;
    } else if (entry.type === "glossary") {
      response += `📚 Kategorie: ${entry.category}\n\n`;
    } else if (entry.type === "law") {
      response += `⚖️ Gesetzesreferenz\n\n`;
    } else if (entry.type === "calculator") {
      response += `🧮 Nutzen Sie den Praxisrechner für Berechnungen\n\n`;
    }
  });

  response += "\n💡 **Weitere Hilfe:**\n";
  response += "- Durchsuchen Sie das Glossar für Fachbegriffe\n";
  response += "- Nutzen Sie die Praxisrechner für Berechnungen\n";
  response += "- Erkunden Sie die Module für detaillierte Inhalte";

  return response;
}
