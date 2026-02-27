// Content Data für Modul 2, Teil 2 (Tag 21-40)
// Themen: Vertiefung Maklerrecht, Bewertung, Spezialimmobilien

export const contentDataPart2: Record<string, {
  title: string;
  theory: string;
  law: string[];
  practice: string;
  task: string;
  type?: string;
}> = {
  // Woche 5-6: Vertiefung Recht & Bewertung (Tag 21-30)
  day_21: {
    title: "Doppeltätigkeit des Maklers",
    theory: "Erlaubnis zur Doppeltätigkeit (§ 656c BGB). Interessenkonflikte vermeiden. Unparteiische Beratung. Provisionssplitting (50/50).",
    law: ["§ 656c BGB (Lohnanspruch bei Doppeltätigkeit)"],
    practice: "Aufklärung beider Parteien über die Doppeltätigkeit. Schriftliche Vereinbarung.",
    task: "Formulieren Sie eine Einwilligungserklärung zur Doppeltätigkeit.",
    type: "Recht"
  },
  day_22: {
    title: "Haftung des Maklers",
    theory: "Pflichtverletzung (§ 280 BGB). Falsche Exposé-Angaben. Aufklärungspflichten. Verjährung von Ansprüchen.",
    law: ["§ 280 BGB (Schadensersatz)", "§ 195 BGB (Verjährung)"],
    practice: "Ein Käufer klagt wegen falscher Quadratmeterangaben. Haftet der Makler oder der Verkäufer?",
    task: "Erstellen Sie einen Haftungsausschluss für das Exposé (rechtssicher!).",
    type: "Recht"
  },
  day_23: {
    title: "Wettbewerbsrecht für Makler",
    theory: "UWG (Gesetz gegen den unlauteren Wettbewerb). Irreführende Werbung. Abmahnfallen (Impressum, Widerruf). Cold Calling.",
    law: ["UWG § 5 (Irreführende Handlungen)", "UWG § 7 (Belästigung)"],
    practice: "Prüfung einer Werbeanzeige auf Wettbewerbsverstöße (z.B. 'Alleineigentum' obwohl nicht geprüft).",
    task: "Korrigieren Sie eine fehlerhafte Zeitungsannonce.",
    type: "Recht"
  },
  day_24: {
    title: "Bewertung von Erbbaurechten",
    theory: "Besonderheit Erbbaurecht. Erbbauzins. Heimfall. Bewertung des Erbbaurechts vs. Erbbaugrundstück.",
    law: ["ErbbauRG (Erbbaurechtsgesetz)"],
    practice: "Verkauf eines Hauses auf Erbbaugrundstück. Erklärung für den Käufer (Finanzierungshürden).",
    task: "Berechnen Sie den Kapitalwert eines Erbbauzinses.",
    type: "Bewertung"
  },
  day_25: {
    title: "Bewertung von Rechten und Lasten",
    theory: "Wohnrecht, Nießbrauch, Wegerecht. Wertminderung durch Eintragungen in Abt. II. Leibrente.",
    law: ["ImmoWertV"],
    practice: "Bewertung einer Immobilie mit lebenslangem Wohnrecht für die 85-jährige Oma.",
    task: "Kalkulieren Sie den Wertabschlag für ein Wohnrecht (Sterbetafel nutzen).",
    type: "Bewertung"
  },
  day_26: {
    title: "Grundbuch-Analyse für Profis",
    theory: "Abt. II im Detail: Vorkaufsrechte, Reallasten. Abt. III: Grundschuld vs. Hypothek. Löschungsbewilligung.",
    law: ["GBO"],
    practice: "Einholung der Löschungsbewilligung für eine alte Grundschuld. Treuhandauftrag Notar.",
    task: "Erklären Sie den Unterschied zwischen Brief- und Buchgrundschuld.",
    type: "Recht"
  },
  day_27: {
    title: "Baurecht für Makler",
    theory: "Bebauungsplan (B-Plan) lesen. § 34 BauGB (Nachbarschaft). Flächennutzungsplan. Abstandsflächen.",
    law: ["BauGB § 30 (B-Plan)", "BauGB § 34 (Innenbereich)"],
    practice: "Prüfung: Darf auf dem Grundstück noch ein Anbau errichtet werden? GRZ/GFZ berechnen.",
    task: "Berechnen Sie die zulässige Wohnfläche bei GRZ 0,4 und GFZ 0,8.",
    type: "Technik"
  },
  day_28: {
    title: "Denkmalschutz & Sanierungsgebiete",
    theory: "Afa-Vorteile (§ 7i EStG). Genehmigungspflichten für Veränderungen. Ensembleschutz.",
    law: ["DSchG (Denkmalschutzgesetz)", "EStG § 7i"],
    practice: "Verkauf einer Denkmalimmobilie. Argumentation mit Steuervorteilen.",
    task: "Erstellen Sie eine Beispielrechnung für die Denkmal-AfA.",
    type: "Spezial"
  },
  day_29: {
    title: "Energieausweis im Detail",
    theory: "Pflichtangaben in Immobilienanzeigen (§ 87 GEG). Verbrauchsausweis vs. Bedarfsausweis. Gültigkeit. Bußgelder.",
    law: ["GEG (Gebäudeenergiegesetz)"],
    practice: "Erkennen von Fehlern im Energieausweis. Wann ist welcher Ausweis Pflicht?",
    task: "Prüfen Sie 3 Energieausweise auf Plausibilität.",
    type: "Technik"
  },
  day_30: {
    title: "Praxisprojekt: Die komplexe Bewertung",
    theory: "Zusammenführung der Bewertungsmethoden. Marktanpassung.",
    law: ["ImmoWertV"],
    practice: "Bewertung eines MFH mit Gewerbeanteil und Wegerecht.",
    task: "Erstellen Sie ein Kurzgutachten für ein Mischobjekt.",
    type: "Praxis"
  },

  // Woche 7-8: Spezialimmobilien & Vertrieb (Tag 31-40)
  day_31: {
    title: "Verkauf von vermieteten Eigentumswohnungen",
    theory: "Mieterschutz. Kündigungssperrfrist (bis zu 10 Jahre). Vorkaufsrecht des Mieters (§ 577 BGB).",
    law: ["§ 577 BGB (Vorkaufsrecht)", "§ 577a BGB (Kündigungsbeschränkung)"],
    practice: "Angebot an den Mieter. Durchführung des Vorkaufsrechts.",
    task: "Schreiben Sie ein Informationsschreiben an den Mieter über den geplanten Verkauf.",
    type: "Recht"
  },
  day_32: {
    title: "Gewerbeimmobilien-Vermittlung",
    theory: "Büro, Handel, Logistik. Standortfaktoren. Mietvertragsdauer. Umsatzsteuer-Option.",
    law: ["UStG § 9 (Verzicht auf Steuerbefreiung)"],
    practice: "Suche nach einem Ladenlokal für eine Bäckerei. Nutzungsänderung nötig?",
    task: "Erstellen Sie ein Anforderungsprofil für eine Logistikfläche.",
    type: "Spezial"
  },
  day_33: {
    title: "Grundstückshandel & Projektierung",
    theory: "Restwertmethode (Residualwert). Bauträgerkalkulation. Erschließungskosten.",
    law: ["BauGB (Erschließung)"],
    practice: "Kalkulation: Was darf das Grundstück kosten, wenn 10 DHH gebaut werden sollen?",
    task: "Führen Sie eine Residualwertberechnung durch.",
    type: "Finanzen"
  },
  day_34: {
    title: "Land- und Forstwirtschaftliche Flächen",
    theory: "Grundstückverkehrsgesetz. Genehmigungspflicht. Vorkaufsrecht der Landwirte.",
    law: ["GrdstVG (Grundstückverkehrsgesetz)"],
    practice: "Verkauf eines Ackers an einen Nicht-Landwirt. Hürden und Lösungen.",
    task: "Recherchieren Sie die aktuellen Ackerlandpreise in Ihrer Region.",
    type: "Spezial"
  },
  day_35: {
    title: "Bieterverfahren",
    theory: "Ablauf (strukturiert). Kein Auktionshaus! Abschlussfreiheit. Transparenz.",
    law: ["Keine spezifischen Gesetze - Vertragsfreiheit"],
    practice: "Organisation eines Bieterverfahrens für ein begehrtes Objekt. Gebotsabgabe.",
    task: "Entwerfen Sie eine Einladung zum Bieterverfahren mit Regeln.",
    type: "Vertrieb"
  },
  day_36: {
    title: "Off-Market Deals",
    theory: "Diskretion. Secret Sale. Zugang zu Family Offices und Investoren. NDAs (Verschwiegenheitserklärungen).",
    law: ["Vertragsrecht"],
    practice: "Vermarktung eines Hotels ohne öffentliche Inserate.",
    task: "Erstellen Sie ein 'Teaser'-Exposé (anonymisiert).",
    type: "Vertrieb"
  },
  day_37: {
    title: "Zwangsversteigerung",
    theory: "Ablauf einer ZV. Verkehrswertgrenzen (5/10, 7/10). Rolle des Maklers (Beratung, Begleitung).",
    law: ["ZVG (Zwangsversteigerungsgesetz)"],
    practice: "Vorbereitung eines Kunden auf den Versteigerungstermin. Bietstrategie.",
    task: "Analysieren Sie ein Verkehrswertgutachten aus einer ZV.",
    type: "Spezial"
  },
  day_38: {
    title: "Internationale Kunden",
    theory: "Kulturelle Unterschiede. Finanzierung für Ausländer. Geldwäscheprüfung (Risikoländer).",
    law: ["GwG"],
    practice: "Betreuung eines Expats bei der Wohnungssuche. Übersetzung und Erklärung.",
    task: "Erstellen Sie ein Glossar wichtiger Immobilienbegriffe auf Englisch.",
    type: "Softskills"
  },
  day_39: {
    title: "Finanzierungsgrundlagen für Makler",
    theory: "Eigenkapitalquote. Finanzierbarkeit prüfen. Bonität. Unterlagen für die Bank.",
    law: ["Wohnimmobilienkreditrichtlinie"],
    practice: "Vorprüfung eines Kaufinteressenten. 'Finanzierungs-Zertifikat'.",
    task: "Stellen Sie eine Finanzierungsmappe für die Bank zusammen.",
    type: "Finanzen"
  },
  day_40: {
    title: "Abschluss Block 2: Vertiefung",
    theory: "Zusammenfassung Tag 21-39. Komplexes Maklerwissen.",
    law: ["Gesamtschau"],
    practice: "Zwischenprüfung (40 Fragen) über Recht und Bewertung.",
    task: "Absolvieren Sie die Prüfungssimulation für Block 2.",
    type: "Test"
  }
};
