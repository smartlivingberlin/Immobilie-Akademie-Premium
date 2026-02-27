// Content Data für Modul 3, Teil 4 (Tag 61-80)
// Themen: Facility Management, Sonderverwaltung, Abschluss

export const contentDataPart4: Record<string, {
  title: string;
  theory: string;
  law: string[];
  practice: string;
  task: string;
  type?: string;
}> = {
  // Woche 13-14: Facility Management (Tag 61-70)
  day_61: {
    title: "Einführung Facility Management (FM)",
    theory: "Definition nach DIN EN 15221. Strategisches vs. Operatives FM. Die 3 Säulen: Technisches, Kaufmännisches und Infrastrukturelles FM. Lebenszyklus einer Immobilie.",
    law: ["DIN EN 15221 (FM-Begriffe)", "GEFMA-Richtlinien"],
    practice: "Analyse der FM-Prozesse in einem Bürogebäude. Wo liegt Optimierungspotenzial?",
    task: "Erstellen Sie eine Übersicht der FM-Leistungen für ein Gewerbeobjekt.",
    type: "Management"
  },
  day_62: {
    title: "Technisches Facility Management (TGM)",
    theory: "Betreiben, Dokumentieren, Instandhalten. Betreiberverantwortung (Wahrnehmung der Verkehrssicherungspflichten). Prüfpflichten für technische Anlagen (Aufzüge, RLT, BMA).",
    law: ["BetrSichV (Betriebssicherheitsverordnung)", "PrüfVO (Prüfverordnung)"],
    practice: "Erstellung eines Prüfkatasters für alle technischen Anlagen.",
    task: "Listen Sie alle prüfpflichtigen Anlagen in einem Hochhaus auf.",
    type: "Technik"
  },
  day_63: {
    title: "Infrastrukturelles Facility Management (IGM)",
    theory: "Reinigung, Winterdienst, Sicherheit, Catering, Empfangsdienste, Grünpflege. Leistungsverzeichnisse erstellen. Qualitätsmanagement.",
    law: ["ArbSchG (Arbeitsschutzgesetz)"],
    practice: "Ausschreibung einer Unterhaltsreinigung. Definition von Reinigungsintervallen und -klassen.",
    task: "Entwerfen Sie ein Leistungsverzeichnis für den Winterdienst.",
    type: "Organisation"
  },
  day_64: {
    title: "Kaufmännisches Facility Management (KGM)",
    theory: "Objektbuchhaltung, Kostenrechnung, Vertragsmanagement, Benchmarking. Betriebskostenoptimierung (Contracting).",
    law: ["BetrKV"],
    practice: "Vergleich der Betriebskostenkennzahlen (Benchmarking) mit ähnlichen Objekten.",
    task: "Berechnen Sie das Einsparpotenzial durch Energie-Contracting.",
    type: "Finanzen"
  },
  day_65: {
    title: "Flächenmanagement",
    theory: "DIN 277 (Grundflächen und Rauminhalte). Mietflächenberechnung (gif MF/G). Belegungsplanung. Umzugsmanagement.",
    law: ["DIN 277"],
    practice: "Berechnung der vermietbaren Fläche nach gif-Richtlinie für ein Büro.",
    task: "Erstellen Sie einen Belegungsplan für eine Etage (Open Space).",
    type: "Planung"
  },
  day_66: {
    title: "Energiemanagement & Nachhaltigkeit",
    theory: "ISO 50001 (Energiemanagement). ESG-Kriterien (Environment, Social, Governance). CO2-Bilanzierung. Green Building Zertifikate (DGNB, LEED).",
    law: ["GEG", "CSR-Richtlinie"],
    practice: "Erfassung der Verbrauchsdaten. Identifikation von 'Energiefressern'.",
    task: "Entwickeln Sie ein Konzept zur CO2-Reduktion im Gebäudebetrieb.",
    type: "Umwelt"
  },
  day_67: {
    title: "Sicherheit & Brandschutz im FM",
    theory: "Brandschutzbeauftragter. Flucht- und Rettungspläne. Zutrittskontrollsysteme. Schließanlagenverwaltung.",
    law: ["ASR A2.2 (Brandschutz)", "DSGVO (Zutrittsdaten)"],
    practice: "Organisation einer Brandschutzübung (Evakuierung).",
    task: "Erstellen Sie eine Checkliste für die tägliche Sicherheitsbegehung.",
    type: "Sicherheit"
  },
  day_68: {
    title: "Betreiberverantwortung & Haftung",
    theory: "Delegation von Verantwortung. Exkulpation (Entlastungsbeweis). Pflichtenübertragung auf Dienstleister. GEFMA 190.",
    law: ["§ 823 BGB", "§ 14 StGB (Garantenstellung)"],
    practice: "Prüfung der Verträge auf lückenlose Pflichtenübertragung.",
    task: "Erstellen Sie eine Delegationsmatrix für die Betreiberpflichten.",
    type: "Recht"
  },
  day_69: {
    title: "CAFM - Computer Aided Facility Management",
    theory: "Softwareunterstützung im FM. Datenmodelle (BIM - Building Information Modeling). Dokumentation und Reporting.",
    law: ["GoBD"],
    practice: "Einführung eines CAFM-Systems. Datenaufnahme und -pflege.",
    task: "Definieren Sie die Anforderungen an ein CAFM-System für einen Gewerbepark.",
    type: "Digital"
  },
  day_70: {
    title: "Praxisprojekt: FM-Konzept",
    theory: "Entwicklung eines ganzheitlichen Bewirtschaftungskonzepts.",
    law: ["Alle FM-relevanten Normen"],
    practice: "Erstellung eines FM-Konzepts für einen neu gebauten Bürokomplex.",
    task: "Präsentieren Sie Ihr Bewirtschaftungskonzept (Budget, Personal, Prozesse).",
    type: "Praxis"
  },

  // Woche 15-16: Sondereigentumsverwaltung & Abschluss (Tag 71-80)
  day_71: {
    title: "Sondereigentumsverwaltung (SEV) - Grundlagen",
    theory: "Unterschied zur WEG-Verwaltung. Vertretung des Eigentümers gegenüber dem Mieter. Mietinkasso, Neuvermietung, Abnahmen.",
    law: ["Verwaltervertrag SEV", "Mietrecht BGB"],
    practice: "Einrichtung eines SEV-Mandats. Vollmachten, Kontoeröffnung.",
    task: "Entwerfen Sie einen SEV-Verwaltervertrag.",
    type: "Verträge"
  },
  day_72: {
    title: "Neuvermietung & Mietersuche",
    theory: "Exposé-Erstellung. Bonitätsprüfung (Selbstauskunft, Schufa). Besichtigungen durchführen. Mietvertragsgestaltung.",
    law: ["AGG (Allgemeines Gleichbehandlungsgesetz)", "DSGVO"],
    practice: "Auswahl des passenden Mieters aus 50 Bewerbern. Kriterien festlegen.",
    task: "Erstellen Sie ein rechtssicheres Wohnungsübergabeprotokoll.",
    type: "Praxis"
  },
  day_73: {
    title: "Laufende Betreuung im SEV",
    theory: "Mängelmanagement im Sondereigentum. Kleinreparaturen (Klausel im MV). Kommunikation mit WEG-Verwalter.",
    law: ["§ 535 BGB (Erhaltungspflicht)"],
    practice: "Koordination eines Rohrbruchs (Versicherungsschaden Sondereigentum vs. Gemeinschaftseigentum).",
    task: "Schreiben Sie eine Mängelanzeige an den WEG-Verwalter.",
    type: "Organisation"
  },
  day_74: {
    title: "Konfliktmanagement Mieter vs. Eigentümer",
    theory: "Lärmprotokolle. Abmahnungen. Kündigung wegen Störung des Hausfriedens. Rolle des SEV-Verwalters als Puffer.",
    law: ["§ 569 BGB (Fristlose Kündigung)"],
    practice: "Reaktion auf Beschwerden der Nachbarn über Ihren Mieter.",
    task: "Verfassen Sie eine rechtssichere Abmahnung wegen Lärmbelästigung.",
    type: "Recht"
  },
  day_75: {
    title: "Renditeoptimierung & Wertsicherung",
    theory: "Mieterhöhungspotenziale nutzen. Indexmiete anpassen. Modernisierungsumlage. Leerstandsmanagement.",
    law: ["§ 558 BGB", "§ 557b BGB (Indexmiete)"],
    practice: "Berechnung der Rendite (Brutto/Netto) für den Eigentümer. Vorschläge zur Optimierung.",
    task: "Erstellen Sie einen Report zur Renditeentwicklung für den Eigentümer.",
    type: "Finanzen"
  },
  day_76: {
    title: "Steuerliche Aspekte für Eigentümer",
    theory: "Werbungskosten (AfA, Zinsen, Erhaltung). Anlage V. Bescheinigungen des Verwalters (§ 35a EStG - Haushaltsnahe Dienstleistungen).",
    law: ["EStG § 35a", "EStG § 9 (Werbungskosten)"],
    practice: "Erstellung der Steuerbescheinigung für den Eigentümer.",
    task: "Berechnen Sie den steuerlichen Vorteil von Handwerkerleistungen.",
    type: "Finanzen"
  },
  day_77: {
    title: "Prüfungsvorbereitung: IHK-Sachkunde",
    theory: "Wiederholung aller Rechtsgebiete (WEG, BGB, GewO). Prüfungsmodalitäten (Schriftlich/Mündlich).",
    law: ["Rahmenplan IHK"],
    practice: "Simulation der schriftlichen Prüfung (Multiple Choice).",
    task: "Lösen Sie einen Muster-Prüfungsbogen (Recht).",
    type: "Test"
  },
  day_78: {
    title: "Prüfungsvorbereitung: Fachgespräch",
    theory: "Simulation mündliche Prüfung. Typische Fallbeispiele. Präsentationstechniken.",
    law: ["Prüfungsordnung"],
    practice: "Rollenspiel: Eigentümerversammlung leiten oder Konfliktgespräch führen.",
    task: "Bereiten Sie eine 10-minütige Präsentation zu einem Verwalter-Thema vor.",
    type: "Softskills"
  },
  day_79: {
    title: "Karriere & Selbstständigkeit",
    theory: "Gründung einer Hausverwaltung. Businessplan. Gebührenkalkulation. Versicherung (Vermögensschadenhaftpflicht). Marketing.",
    law: ["Gewerbeanmeldung", "Versicherungsrecht"],
    practice: "Kalkulation des Verwalterhonorars für ein 20-Einheiten-Objekt.",
    task: "Erstellen Sie einen Businessplan-Entwurf für Ihre Selbstständigkeit.",
    type: "Management"
  },
  day_80: {
    title: "Abschlussprüfung Modul 3",
    theory: "Gesamtabschluss. Zertifikatsübergabe (virtuell). Ausblick auf Modul 4 & 5.",
    law: ["Alle Module"],
    practice: "Große Abschlussprüfung (100 Fragen) über alle 80 Tage.",
    task: "Absolvieren Sie die finale Zertifikatsprüfung.",
    type: "Test"
  }
};
