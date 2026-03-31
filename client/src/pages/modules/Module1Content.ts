// Content Data für Modul 1: Fachkenntnisse und Rechtsgrundlage
// Tage: 20 | UE: 160

export const contentDataModule1: Record<string, {
  title: string;
  theory: string;
  law: string[];
  practice: string;
  task?: string;
  tasks?: Array<{type?: string; question: string; hint?: string}>;
  quiz?: Array<{question: string; options?: string[]; answer?: string; explanation?: string}>;
  type?: string;
}> = {
  // Woche 1: Einführung & Markt (Tag 1-5)
  day_1: {
    title: "Einführung in die Immobilienbranche",
    theory: "Struktur der Branche (Makler, Verwalter, Bauträger, Projektentwickler). Aktuelle Markttrends (Zinswende, Nachhaltigkeit, Digitalisierung). Bedeutung der Immobilie als Wirtschaftsgut.",
    law: ["Keine spezifischen Gesetze"],
    practice: "Analyse einer aktuellen Marktstudie (z.B. IVD, Bulwiengesa).",
    task: "Recherchieren Sie die 3 wichtigsten Immobilientrends für das aktuelle Jahr.",
    type: "Grundlagen"
  },
  day_2: {
    title: "Karrierepfade & Berufsfelder",
    theory: "Berufsbilder: Makler, Verwalter, Gutachter, Darlehensvermittler. Voraussetzungen und Verdienstmöglichkeiten. Selbstständigkeit vs. Angestelltenverhältnis.",
    law: ["GewO (Gewerbeordnung)"],
    practice: "Erstellung eines persönlichen Kompetenzprofils. Wo liegen meine Stärken?",
    task: "Skizzieren Sie Ihren idealen Karriereweg für die nächsten 5 Jahre.",
    type: "Karriere"
  },
  day_3: {
    title: "Persönliche Eignung & Soft Skills",
    theory: "Kommunikationsfähigkeit, Empathie, Verhandlungsgeschick. Resilienz im Vertrieb. Ethik im Beruf (IVD Standesregeln).",
    law: ["Keine spezifischen Gesetze"],
    practice: "Rollenspiel: Umgang mit einem schwierigen Kunden.",
    task: "Führen Sie eine SWOT-Analyse für Ihre eigene Person durch.",
    type: "Softskills"
  },
  day_4: {
    title: "Eignungstest & Selbstreflexion",
    theory: "Analyse der eigenen Fähigkeiten. Vertriebstyp vs. Verwaltungstyp. Zeitmanagement-Typen.",
    law: ["Keine spezifischen Gesetze"],
    practice: "Durchführung eines standardisierten Eignungstests (DISG-Modell).",
    task: "Analysieren Sie Ihr Testergebnis: Welcher Kundentyp liegt Ihnen am meisten?",
    type: "Test"
  },
  day_5: {
    title: "Ziele und Visionen",
    theory: "SMART-Ziele setzen (Spezifisch, Messbar, Attraktiv, Realistisch, Terminiert). Vision Board. Motivationstechniken.",
    law: ["Keine spezifischen Gesetze"],
    practice: "Formulierung von Jahreszielen für den Berufseinstieg.",
    task: "Erstellen Sie ein Vision Board für Ihr Immobilien-Business.",
    type: "Karriere"
  },

  // Woche 2: Rechtliche Grundlagen (Tag 6-10)
  day_6: {
    title: "Einführung in das BGB",
    theory: "Aufbau des BGB. Rechtsfähigkeit, Geschäftsfähigkeit. Willenserklärungen. Vertragsfreiheit.",
    law: ["§ 1 BGB (Rechtsfähigkeit)", "§ 104 BGB (Geschäftsunfähigkeit)"],
    practice: "Fallbeispiel: Kann ein Minderjähriger eine Wohnung kaufen?",
    task: "Erklären Sie den Unterschied zwischen Rechtsfähigkeit und Geschäftsfähigkeit.",
    type: "Recht"
  },
  day_7: {
    title: "Sachenrecht & Eigentum",
    theory: "Besitz vs. Eigentum. Bewegliche Sachen vs. Grundstücke. Übertragung von Eigentum (Einigung & Übergabe vs. Auflassung & Eintragung).",
    law: ["§ 903 BGB (Eigentümer)", "§ 854 BGB (Besitz)"],
    practice: "Fall: Mieter vs. Eigentümer - Wer hat welche Rechte?",
    task: "Definieren Sie 'Besitz' und 'Eigentum' anhand eines Beispiels.",
    type: "Recht"
  },
  day_8: {
    title: "Gewerberecht & §34c GewO",
    theory: "Gewerbefreiheit. Erlaubnispflichtige Gewerbe. Voraussetzungen für §34c (Zuverlässigkeit, geordnete Vermögensverhältnisse).",
    law: ["§ 34c GewO", "MaBV"],
    practice: "Ausfüllen eines Gewerbeantrags. Welche Unterlagen fehlen?",
    task: "Prüfen Sie, welche Nachweise für den §34c-Antrag erforderlich sind.",
    type: "Recht"
  },
  day_9: {
    title: "Maklerrecht Grundlagen",
    theory: "Der Maklervertrag. Provisionsanspruch (§ 652 BGB). Nachweis und Vermittlung. Kausalität.",
    law: ["§ 652 BGB", "§ 656a BGB (Textform)"],
    practice: "Analyse: Wann entsteht der Provisionsanspruch?",
    task: "Formulieren Sie die Voraussetzungen für den Provisionsanspruch.",
    type: "Recht"
  },
  day_10: {
    title: "Geldwäschegesetz (GwG)",
    theory: "Sorgfaltspflichten. Risikoanalyse. Identifizierung (KYC). Transparenzregister. Verdachtsmeldung.",
    law: ["GwG § 10", "GwG § 11"],
    practice: "Identifizierung eines Kunden anhand des Personalausweises. Dokumentation.",
    task: "Erstellen Sie einen Laufzettel zur GwG-Prüfung.",
    type: "Recht"
  },

  // Woche 3: Spezifische Berufsfelder (Tag 11-15)
  day_11: {
    title: "Berufsfeld: Immobilienmakler",
    theory: "Akquise, Bewertung, Vermarktung, Verkauf. Unterschied Wohn- vs. Gewerbemakler. Alltag und Herausforderungen.",
    law: ["§ 34c GewO"],
    practice: "Tagesablauf eines Maklers planen.",
    task: "Interviewen Sie einen Makler (oder simulieren Sie es) zu seinem Arbeitsalltag.",
    type: "Berufsbild"
  },
  day_12: {
    title: "Berufsfeld: Immobilienverwalter",
    theory: "WEG-Verwaltung vs. Mietverwaltung. Werterhalt der Immobilie. Konfliktmanagement. Technische vs. kaufmännische Verwaltung.",
    law: ["WEG", "§ 34c GewO"],
    practice: "Teilnahme an einer (simulierten) Eigentümerversammlung.",
    task: "Erstellen Sie eine Aufgabenliste für einen WEG-Verwalter.",
    type: "Berufsbild"
  },
  day_13: {
    title: "Berufsfeld: Gutachter & Sachverständiger",
    theory: "Verkehrswertgutachten. Beleihungswert. Markt- und Beleihungswertverordnung. Zertifizierungen (HypZert).",
    law: ["ImmoWertV", "BauGB"],
    practice: "Unterschied zwischen Kurzbewertung (Makler) und Gutachten (Sachverständiger).",
    task: "Recherchieren Sie die Voraussetzungen, um öffentlich bestellter Gutachter zu werden.",
    type: "Berufsbild"
  },
  day_14: {
    title: "Berufsfeld: Darlehensvermittler",
    theory: "Finanzierungsberatung. § 34i GewO. Vermittlung von Immobiliardarlehensverträgen. Zusammenarbeit mit Banken.",
    law: ["§ 34i GewO", "Immobiliardarlehensvermittlungsverordnung"],
    practice: "Berechnung einer Monatsrate für ein Darlehen.",
    task: "Vergleichen Sie die Aufgaben eines Maklers mit denen eines Finanzierungsvermittlers.",
    type: "Berufsbild"
  },
  day_15: {
    title: "Datenschutz (DSGVO) & Verbraucherschutz",
    theory: "Umgang mit personenbezogenen Daten. Informationspflichten. Widerrufsrecht bei Fernabsatz.",
    law: ["DSGVO", "BGB § 355"],
    practice: "Erstellung einer Datenschutzerklärung für das Exposé.",
    task: "Prüfen Sie eine Webseite auf DSGVO-Konformität (Impressum, Datenschutz).",
    type: "Recht"
  },

  // Woche 4: Organisation & Digitalisierung (Tag 16-20)
  day_16: {
    title: "Arbeitsalltag & Zeitmanagement",
    theory: "Priorisierung (Eisenhower). Terminplanung. Effiziente Büroorganisation. Work-Life-Balance.",
    law: ["Keine spezifischen Gesetze"],
    practice: "Erstellung eines Wochenplans mit festen Blöcken für Akquise und Admin.",
    task: "Planen Sie eine ideale Arbeitswoche.",
    type: "Organisation"
  },
  day_17: {
    title: "Digitale Tools & Technologien",
    theory: "CRM-Systeme (OnOffice, FlowFact). Portale. Virtuelle Besichtigungen. Cloud-Lösungen.",
    law: ["GoBD (Digitale Buchführung)"],
    practice: "Testen einer CRM-Software (Demo-Zugang oder Simulation).",
    task: "Vergleichen Sie 3 Immobilien-CRM-Systeme.",
    type: "Digital"
  },
  day_18: {
    title: "Prozessautomatisierung",
    theory: "E-Mail-Automation. Lead-Funnel. Chatbots. Digitale Unterschrift.",
    law: ["eIDAS-Verordnung"],
    practice: "Einrichtung einer automatischen Antwortmail für Anfragen.",
    task: "Entwerfen Sie einen automatisierten Prozess für neue Interessenten.",
    type: "Digital"
  },
  day_19: {
    title: "Karriereplanung & Weiterbildung",
    theory: "Fortbildungspflicht (20h). IHK-Zertifikate. Studium (Immobilienökonomie). Spezialisierungen.",
    law: ["MaBV Anlage 1"],
    practice: "Recherche nach passenden Weiterbildungsangeboten.",
    task: "Erstellen Sie einen persönlichen Weiterbildungsplan für 3 Jahre.",
    type: "Karriere"
  },
  day_20: {
    title: "Abschluss Modul 1 & Portfolio",
    theory: "Zusammenfassung der Grundlagen. Erstellung des persönlichen Portfolios (Lebenslauf, Ziele, Kompetenzen).",
    law: ["Keine spezifischen Gesetze"],
    practice: "Präsentation des eigenen Portfolios.",
    task: "Finalisieren Sie Ihr Karriere-Portfolio.",
    type: "Abschluss"
  }
};
