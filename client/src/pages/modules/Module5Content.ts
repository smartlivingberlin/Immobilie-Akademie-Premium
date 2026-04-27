// Content Data für Modul 5: Immobiliendarlehensvermittlung (§ 34i GewO)
// Tage: 40 | UE: 320

export const contentDataModule5: Record<string, {
  title: string;
  theory: string;
  law: string[];
  practice: string;
  task?: string;
  tasks?: Array<{type?: string; question: string; hint?: string}>;
  quiz?: Array<{question: string; options?: string[]; answer?: string; correct?: number; explanation?: string}>;
  type?: string;
}> = {
  // Woche 1: Einführung & Rechtliche Grundlagen (Tag 1-5)
  day_1: {
    title: "Einführung in die Darlehensvermittlung",
    theory: "Berufsbild Immobiliardarlehensvermittler. Abgrenzung zur Honorarberatung. Marktüberblick. Typische Kundenanfragen.",
    law: ["§ 34i GewO", "Immobiliardarlehensvermittlungsverordnung (ImmVermV)"],
    practice: "Analyse einer typischen Kundenanfrage (Kaufpreisfinanzierung).",
    task: "Recherchieren Sie die Voraussetzungen für die Erlaubnis nach § 34i GewO.",
    type: "Grundlagen"
  },
  day_2: {
    title: "Verbraucherschutz & Pflichten",
    theory: "Vorvertragliche Informationspflichten (ESIS-Merkblatt). Beratungsdokumentation. Unabhängigkeit. Provisionstransparenz.",
    law: ["Art. 247 § 1 EGBGB", "§ 655a BGB"],
    practice: "Erstellung einer Checkliste für das Erstgespräch.",
    task: "Entwerfen Sie ein Muster für die Erstinformation des Kunden.",
    type: "Recht"
  },
  day_3: {
    title: "Der Immobilienerwerbsprozess",
    theory: "Ablauf: Reservierung -> Finanzierung -> Notar -> Eigentumsübergang. Fälligkeitsmitteilung. Unbedenklichkeitsbescheinigung.",
    law: ["BGB § 873 (Einigung und Eintragung)", "GrEStG"],
    practice: "Zeitstrahl erstellen: Wann fließt welches Geld?",
    task: "Erklären Sie den Unterschied zwischen Kaufpreiszahlung und Eigentumsübergang.",
    type: "Prozess"
  },
  day_4: {
    title: "Grundbuch & Sicherheiten",
    theory: "Abteilung III des Grundbuchs. Grundschuld vs. Hypothek. Rangfolge. Löschungsbewilligung. Vorlasten.",
    law: ["§ 1113 BGB (Hypothek)", "§ 1191 BGB (Grundschuld)"],
    practice: "Lesen eines Grundbuchauszugs (Abt. III).",
    task: "Warum bevorzugen Banken heute die Grundschuld gegenüber der Hypothek?",
    type: "Recht"
  },
  day_5: {
    title: "Wirtschaftliche Grundlagen",
    theory: "Zinsmärkte. EZB-Leitzins vs. Bauzinsen (Pfandbriefkurve). Inflation. Konjunkturzyklen.",
    law: ["Keine spezifischen Gesetze"],
    practice: "Analyse der aktuellen Zinsentwicklung (Interhyp/Dr. Klein Charts).",
    task: "Recherchieren Sie den aktuellen 10-Jahres-Zinsswap.",
    type: "Markt"
  },

  // Woche 2: Finanzierungsprodukte (Tag 6-10)
  day_6: {
    title: "Das Annuitätendarlehen",
    theory: "Funktionsweise: Konstante Rate, steigende Tilgung, sinkender Zinsanteil. Sondertilgung. Zinsbindung.",
    law: ["Keine spezifischen Gesetze"],
    practice: "Berechnung eines Tilgungsplans (manuell oder Excel).",
    task: "Berechnen Sie die Restschuld nach 10 Jahren bei 2% Tilgung.",
    type: "Produkte"
  },
  day_7: {
    title: "Alternative Darlehensformen",
    theory: "Endfälliges Darlehen (Festdarlehen). Tilgungsdarlehen (sinkende Rate). Volltilger-Darlehen. Forward-Darlehen.",
    law: ["Keine spezifischen Gesetze"],
    practice: "Vergleich: Annuität vs. Endfällig mit Bausparer.",
    task: "Für wen eignet sich ein Forward-Darlehen?",
    type: "Produkte"
  },
  day_8: {
    title: "Bausparen & Wohnriester",
    theory: "Bausparvertrag: Ansparphase, Zuteilung, Darlehensphase. Bewertungszahl. Wohn-Riester Zulagen.",
    law: ["Bausparkassengesetz"],
    practice: "Analyse eines Bauspar-Tarifs.",
    task: "Berechnen Sie die Abschlussgebühr für einen 100.000€ Bausparvertrag.",
    type: "Produkte"
  },
  day_9: {
    title: "Förderprogramme (KfW & Co.)",
    theory: "KfW-Wohneigentumsprogramm (124). Energieeffizient Sanieren (261). Regionale Förderbanken (z.B. IBB, L-Bank).",
    law: ["Keine spezifischen Gesetze"],
    practice: "Prüfung der Förderfähigkeit für einen Neubau (KFN).",
    task: "Welche KfW-Programme sind aktuell für den Ersterwerb verfügbar?",
    type: "Förderung"
  },
  day_10: {
    title: "Kreditkonditionen & Vergleich",
    theory: "Nominalzins vs. Effektivzins (PAngV). Bereitstellungszinsen. Teilauszahlungszuschläge.",
    law: ["Preisangabenverordnung (PAngV)"],
    practice: "Vergleich zweier Angebote mit unterschiedlichem Effektivzins.",
    task: "Warum weicht der Effektivzins vom Nominalzins ab?",
    type: "Berechnung"
  },

  // Woche 3: Bonität & Prüfung (Tag 11-15)
  day_11: {
    title: "Kreditwürdigkeitsprüfung (Bonität)",
    theory: "Materielle Kreditwürdigkeit. Haushaltsrechnung. Einnahmen vs. Ausgaben. Kapitaldienstfähigkeit.",
    law: ["Wohnimmobilienkreditrichtlinie"],
    practice: "Erstellung einer Haushaltsrechnung für eine Familie.",
    task: "Welche Einnahmen dürfen Banken ansetzen (Kindergeld, Elterngeld)?",
    type: "Bonität"
  },
  day_12: {
    title: "Unterlagenprüfung",
    theory: "Gehaltsabrechnungen lesen. BWA/Steuerbescheide bei Selbstständigen. Eigenkapitalnachweis.",
    law: ["Keine spezifischen Gesetze"],
    practice: "Plausibilitätsprüfung einer Selbstauskunft.",
    task: "Welche Unterlagen benötigen Sie von einem Freiberufler?",
    type: "Bonität"
  },
  day_13: {
    title: "Beleihungswertermittlung (Bank)",
    theory: "Beleihungswert vs. Kaufpreis. Beleihungsauslauf (60%, 80%, 100%). Blankoanteil. Risikozuschläge.",
    law: ["BelWertV"],
    practice: "Berechnung des Beleihungsauslaufs.",
    task: "Was passiert, wenn der Beleihungswert unter dem Kaufpreis liegt?",
    type: "Bewertung"
  },
  day_14: {
    title: "Kreditsicherheiten & Scoring",
    theory: "SCHUFA-Score. Basisscore vs. Branchenscore. Negativmerkmale. Lohnabtretung.",
    law: ["DSGVO"],
    practice: "Interpretation einer Schufa-Auskunft.",
    task: "Wie können Kunden ihren Schufa-Score verbessern?",
    type: "Bonität"
  },
  day_15: {
    title: "Praxisfall: Finanzierungsplan",
    theory: "Zusammenführung aller Bausteine. Strukturierung einer Finanzierung.",
    law: ["Keine spezifischen Gesetze"],
    practice: "Erstellung eines kompletten Finanzierungsvorschlags für einen Kunden.",
    task: "Entwickeln Sie ein Finanzierungskonzept für 400.000€ Kaufpreis.",
    type: "Projekt"
  },

  // Woche 4-8: Vertiefung & Prüfungsvorbereitung (Tag 16-40)
  // Zusammengefasst für Übersichtlichkeit, detaillierte Tage 16-40 folgen der Struktur:
  // - Vertiefung Spezialthemen (Zwischenfinanzierung, Kapitalanleger)
  // - Intensive Prüfungsvorbereitung (IHK Sachkundeprüfung)
  
  day_16: {
    title: "Zwischenfinanzierung & Variable Darlehen",
    theory: "Überbrückung von Verkaufserlösen. Euribor-Darlehen. Risiken variabler Zinsen.",
    law: ["Keine spezifischen Gesetze"],
    practice: "Berechnung der Kosten einer Zwischenfinanzierung.",
    task: "Wann lohnt sich eine variable Finanzierung?",
    type: "Spezial"
  },
  day_20: {
    title: "Kapitalanleger-Finanzierung",
    theory: "Steuerliche Aspekte (AfA, Zinsabzug). Hebeleffekt (Leverage). Cashflow-Berechnung.",
    law: ["EStG § 21 (Einkünfte aus V+V)"],
    practice: "Berechnung der Eigenkapitalrendite mit Leverage-Effekt.",
    task: "Erklären Sie den Leverage-Effekt einem Kunden.",
    type: "Spezial"
  },
  day_25: {
    title: "Prüfungsvorbereitung: Recht",
    theory: "Wiederholung BGB, GewO, MaBV. Typische Prüfungsfragen.",
    law: ["Diverse"],
    practice: "Simulation einer schriftlichen Prüfung (Rechtsteil).",
    task: "Lösen Sie 10 Multiple-Choice-Fragen zum Maklerrecht.",
    type: "Prüfung"
  },
  day_30: {
    title: "Prüfungsvorbereitung: Finanzierung",
    theory: "Wiederholung Rechenarten. Effektivzins, Tilgung, Restschuld.",
    law: ["PAngV"],
    practice: "Simulation einer schriftlichen Prüfung (Rechenteil).",
    task: "Lösen Sie 5 komplexe Rechenaufgaben zur Baufinanzierung.",
    type: "Prüfung"
  },
  day_35: {
    title: "Prüfungssimulation: Mündlich",
    theory: "Ablauf der mündlichen Prüfung. Beratungsgespräch. Verkaufspsychologie.",
    law: ["VersVermV (analog)"],
    practice: "Rollenspiel: Kundengespräch unter Prüfungsbedingungen.",
    task: "Erstellen Sie einen Leitfaden für das mündliche Prüfungsgespräch.",
    type: "Prüfung"
  },
  day_40: {
    title: "Abschluss & IHK-Prüfung",
    theory: "Letzte Tipps. Umgang mit Prüfungsangst. Formalitäten.",
    law: ["Keine spezifischen Gesetze"],
    practice: "Generalprobe: Kompletter Prüfungssatz.",
    task: "Viel Erfolg bei der Prüfung!",
    type: "Abschluss"
  }
};
