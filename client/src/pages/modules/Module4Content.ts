// Content Data für Modul 4: Immobilienbewertung und Gutachtenerstellung
// Tage: 20 | UE: 160

export const contentDataModule4: Record<string, {
  title: string;
  theory: string;
  law: string[];
  practice: string;
  task: string;
  type?: string;
}> = {
  // Woche 1: Grundlagen der Bewertung (Tag 1-5)
  day_1: {
    title: "Einführung in die Immobilienbewertung",
    theory: "Anlässe für Bewertungen (Kauf, Verkauf, Scheidung, Erbschaft, Beleihung). Wertbegriffe: Verkehrswert, Beleihungswert, Einheitswert, Versicherungswert.",
    law: ["§ 194 BauGB (Verkehrswert)", "ImmoWertV § 1"],
    practice: "Analyse eines Bewertungsanlasses: Welcher Wert wird gesucht?",
    task: "Definieren Sie den Begriff 'Verkehrswert' gemäß BauGB.",
    type: "Grundlagen"
  },
  day_2: {
    title: "Marktanalyse & Standortbewertung",
    theory: "Makro- und Mikrolage. Harte und weiche Standortfaktoren. Einfluss der Demografie. Bodenrichtwerte.",
    law: ["§ 196 BauGB (Bodenrichtwerte)"],
    practice: "Recherche von Bodenrichtwerten über BORIS-D.",
    task: "Ermitteln Sie den Bodenrichtwert für eine Beispieladresse.",
    type: "Analyse"
  },
  day_3: {
    title: "Grundlagen der Wertermittlungsverfahren",
    theory: "Die drei normierten Verfahren: Vergleichswert-, Ertragswert-, Sachwertverfahren. Wann wird welches Verfahren angewendet?",
    law: ["ImmoWertV § 6 (Verfahrenswahl)"],
    practice: "Zuordnung von Immobilienarten zu Verfahren (z.B. EFH -> Sachwert, MFH -> Ertragswert).",
    task: "Erstellen Sie eine Entscheidungsmatrix für die Verfahrenswahl.",
    type: "Verfahren"
  },
  day_4: {
    title: "Flächenberechnung & Wohnflächenverordnung",
    theory: "Wohnfläche vs. Nutzfläche. WoFlV vs. DIN 277. Anrechnung von Balkonen, Terrassen und Dachschrägen.",
    law: ["WoFlV (Wohnflächenverordnung)", "DIN 277"],
    practice: "Berechnung der Wohnfläche einer Dachgeschosswohnung.",
    task: "Berechnen Sie die anrechenbare Fläche eines Balkons (50% vs. 25%).",
    type: "Technik"
  },
  day_5: {
    title: "Grundbuch & rechtliche Gegebenheiten",
    theory: "Einfluss von Rechten und Lasten auf den Wert (Wegerechte, Wohnrechte, Nießbrauch). Abteilung II des Grundbuchs.",
    law: ["GBO (Grundbuchordnung)"],
    practice: "Wertminderung durch ein lebenslanges Wohnrecht berechnen.",
    task: "Erklären Sie, wie sich eine Baulast auf den Grundstückswert auswirkt.",
    type: "Recht"
  },

  // Woche 2: Vergleichswertverfahren & Bodenwert (Tag 6-10)
  day_6: {
    title: "Das Vergleichswertverfahren im Detail",
    theory: "Direkter vs. indirekter Vergleich. Vergleichsfaktoren (Gebäudefaktor, Ertragsfaktor). Anpassung der Kaufpreise.",
    law: ["ImmoWertV § 15"],
    practice: "Auswahl geeigneter Vergleichsobjekte aus einer Kaufpreissammlung.",
    task: "Führen Sie eine einfache Vergleichswertschätzung für eine Eigentumswohnung durch.",
    type: "Verfahren"
  },
  day_7: {
    title: "Bodenwertermittlung",
    theory: "Bodenrichtwertverfahren. Anpassung an Grundstücksmerkmale (Größe, Tiefe, GFZ). Umrechnungskoeffizienten.",
    law: ["ImmoWertV § 16"],
    practice: "Anwendung von GFZ-Umrechnungskoeffizienten.",
    task: "Berechnen Sie den Bodenwert für ein Grundstück, das vom Richtwertgrundstück abweicht.",
    type: "Verfahren"
  },
  day_8: {
    title: "Statistische Methoden in der Bewertung",
    theory: "Mittelwert, Median, Standardabweichung. Ausreißerbereinigung. Regressionsanalyse (Grundlagen).",
    law: ["Keine spezifischen Gesetze"],
    practice: "Bereinigung einer Vergleichspreisliste um Ausreißer.",
    task: "Berechnen Sie den arithmetischen Mittelwert einer Kaufpreisstichprobe.",
    type: "Analyse"
  },
  day_9: {
    title: "Marktanpassung",
    theory: "Indexreihen. Anpassung an die allgemeine Wertentwicklung. Liegenschaftszinssätze.",
    law: ["ImmoWertV § 14"],
    practice: "Anpassung eines Kaufpreises von 2020 auf den aktuellen Wertermittlungsstichtag.",
    task: "Recherchieren Sie den aktuellen Liegenschaftszinssatz für Ihre Region.",
    type: "Analyse"
  },
  day_10: {
    title: "Praxisprojekt: Vergleichswert",
    theory: "Zusammenführung der Schritte. Erstellung eines Kurzgutachtens im Vergleichswertverfahren.",
    law: ["ImmoWertV"],
    practice: "Bewertung einer Eigentumswohnung mit vollständiger Dokumentation.",
    task: "Erstellen Sie ein 2-seitiges Wertgutachten für eine ETW.",
    type: "Projekt"
  },

  // Woche 3: Ertragswertverfahren (Tag 11-15)
  day_11: {
    title: "Das Ertragswertverfahren im Detail",
    theory: "Rohertrag, Bewirtschaftungskosten, Reinertrag. Bodenwertverzinsung. Gebäudeertragswert.",
    law: ["ImmoWertV § 17"],
    practice: "Ermittlung des Rohertrags aus Mietverträgen.",
    task: "Berechnen Sie den Jahresrohertrag für ein Mehrfamilienhaus.",
    type: "Verfahren"
  },
  day_12: {
    title: "Bewirtschaftungskosten",
    theory: "Verwaltungskosten, Instandhaltungskosten, Mietausfallwagnis, Betriebskosten. Pauschalen vs. Einzelnachweis.",
    law: ["ImmoWertV § 19", "II. BV"],
    practice: "Berechnung der nicht umlagefähigen Bewirtschaftungskosten.",
    task: "Ermitteln Sie die Bewirtschaftungskosten nach Erfahrungssätzen.",
    type: "Verfahren"
  },
  day_13: {
    title: "Liegenschaftszinssatz & Vervielfältiger",
    theory: "Bedeutung des Liegenschaftszinssatzes. Kapitalisierung. Barwertfaktor (Vervielfältiger). Restnutzungsdauer.",
    law: ["ImmoWertV § 14", "ImmoWertV § 20"],
    practice: "Ablesen des Vervielfältigers aus der Tabelle.",
    task: "Berechnen Sie den Barwertfaktor bei 4% Liegenschaftszins und 30 Jahren RND.",
    type: "Verfahren"
  },
  day_14: {
    title: "Besondere objektspezifische Grundstücksmerkmale (boG)",
    theory: "Bauschäden, Instandhaltungsstau, Baumängel. Wirtschaftliche Überalterung. Berücksichtigung im Ertragswert.",
    law: ["ImmoWertV § 8"],
    practice: "Kostenschätzung für eine Dachsanierung und Abzug vom Ertragswert.",
    task: "Listen Sie typische boG auf, die den Wert mindern.",
    type: "Verfahren"
  },
  day_15: {
    title: "Praxisprojekt: Ertragswert",
    theory: "Komplettberechnung eines Mehrfamilienhauses. Plausibilisierung der Ergebnisse.",
    law: ["ImmoWertV"],
    practice: "Bewertung eines Zinshauses mit 8 Einheiten.",
    task: "Führen Sie eine vollständige Ertragswertberechnung durch.",
    type: "Projekt"
  },

  // Woche 4: Sachwertverfahren & Gutachten (Tag 16-20)
  day_16: {
    title: "Das Sachwertverfahren im Detail",
    theory: "Normalherstellungskosten (NHK 2010/2025). Brutto-Grundfläche (BGF). Baupreisindex. Alterswertminderung.",
    law: ["ImmoWertV § 21", "Sachwertrichtlinie"],
    practice: "Ermittlung der BGF nach DIN 277.",
    task: "Berechnen Sie die Herstellungskosten eines Einfamilienhauses.",
    type: "Verfahren"
  },
  day_17: {
    title: "Alterswertminderung & Marktanpassung (Sachwert)",
    theory: "Lineare Alterswertminderung. Gesamtnutzungsdauer vs. Restnutzungsdauer. Sachwertfaktor.",
    law: ["ImmoWertV § 23"],
    practice: "Berechnung der Alterswertminderung bei Modernisierungen (Modell Roscher).",
    task: "Ermitteln Sie den vorläufigen Sachwert und passen Sie ihn an den Markt an.",
    type: "Verfahren"
  },
  day_18: {
    title: "Gutachtenerstellung: Aufbau & Anforderungen",
    theory: "Gliederung eines Verkehrswertgutachtens. Formale Anforderungen. Haftung des Gutachters.",
    law: ["Mustergutachten (Sprengnetter/Kleiber)"],
    practice: "Analyse eines Mustergutachtens. Wo stehen welche Informationen?",
    task: "Erstellen Sie ein Inhaltsverzeichnis für ein Vollgutachten.",
    type: "Gutachten"
  },
  day_19: {
    title: "Spezialfälle & Digitale Tools",
    theory: "Erbbaurecht, Wohnungsrecht, Überbau. Bewertungstools (Sprengnetter, Kleiber digital). KI in der Bewertung.",
    law: ["ErbbauRG"],
    practice: "Nutzung eines Online-Tools zur Schnellbewertung.",
    task: "Bewerten Sie den Einfluss eines Erbbaurechts auf den Bodenwert.",
    type: "Spezial"
  },
  day_20: {
    title: "Abschlussprojekt Modul 4",
    theory: "Selbstständige Durchführung einer kompletten Immobilienbewertung (Wahl des Verfahrens, Durchführung, Dokumentation).",
    law: ["BauGB", "ImmoWertV"],
    practice: "Bewertung einer Immobilie Ihrer Wahl (Exposé als Grundlage).",
    task: "Reichen Sie Ihr finales Bewertungsgutachten ein.",
    type: "Abschluss"
  }
};
