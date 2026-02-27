// Content Data für Modul 3, Teil 2 (Tag 21-40)
// Themen: Technische Verwaltung, EDV, Mietrecht Vertiefung

export const contentDataPart2: Record<string, {
  title: string;
  theory: string;
  law: string[];
  practice: string;
  task: string;
  type?: string;
}> = {
  // Woche 5-6: Technische Verwaltung (Tag 21-30)
  day_21: {
    title: "Objektübernahme & Dokumentation",
    theory: "Die Übernahme einer Verwaltung ist ein kritischer Prozess. Übernahmeprotokoll ist Pflicht. Prüfung aller Unterlagen auf Vollständigkeit (Beschlussbuch, Verträge, Pläne). Haftungsrisiken bei lückenhafter Übernahme.",
    law: ["§ 27 WEG (Aufgaben des Verwalters)", "§ 675 BGB"],
    practice: "Szenario: Der Vorverwalter verweigert die Herausgabe der Daten. Rechtliche Schritte (Einstweilige Verfügung).",
    task: "Erstellen Sie eine detaillierte Checkliste für die technische Objektbegehung.",
    type: "Prozess"
  },
  day_22: {
    title: "Verkehrssicherungspflichten",
    theory: "Der Verwalter muss Gefahrenquellen beseitigen (Schnee, Eis, morsche Bäume, lose Dachziegel). Delegation möglich, aber Kontrollpflicht bleibt. Umkehr der Beweislast im Schadensfall.",
    law: ["§ 823 BGB (Schadensersatzpflicht)", "§ 27 Abs. 1 Nr. 2 WEG"],
    practice: "Fall: Ein Besucher stürzt auf glattem Gehweg. Wer haftet? WEG oder Verwalter oder Winterdienst?",
    task: "Entwerfen Sie einen Kontrollplan für die Verkehrssicherung einer Wohnanlage.",
    type: "Recht"
  },
  day_23: {
    title: "Instandhaltung & Instandsetzung",
    theory: "Unterscheidung: Instandhaltung (Wartung), Instandsetzung (Reparatur), Modernisierung (Verbesserung). Verwalter darf dringende Fälle ohne Beschluss beauftragen (Notgeschäftsführung).",
    law: ["§ 27 Abs. 1 Nr. 3 WEG (Notgeschäftsführung)", "§ 18 Abs. 2 WEG (Erhaltung)"],
    practice: "Heizungsausfall am Freitagabend. Muss ein Beschluss her? Grenzen der Notkompetenz.",
    task: "Formulieren Sie einen Beschlussantrag für eine Fassadensanierung.",
    type: "Technik"
  },
  day_24: {
    title: "Wartungsverträge & Dienstleister",
    theory: "Regelmäßige Wartung verlängert Lebensdauer (Aufzug, Heizung, Brandschutz). Vertragsgestaltung: Reaktionszeiten, Pauschalen vs. Stundenlohn. Kündigungsfristen beachten.",
    law: ["§ 631 BGB (Werkvertrag)", "§ 611 BGB (Dienstvertrag)"],
    practice: "Vergleich von Angeboten für die Gartenpflege. 'Billig' ist nicht immer 'Wirtschaftlich'.",
    task: "Erstellen Sie eine Übersicht aller notwendigen Wartungsverträge für ein MFH mit Aufzug.",
    type: "Organisation"
  },
  day_25: {
    title: "Hausmeister & Reinigungspersonal",
    theory: "Anstellungsformen: Minijob, Sozialversicherungspflichtig oder externer Dienstleister. Weisungsbefugnis des Verwalters. Arbeitsrechtliche Grundlagen (Urlaub, Krankheit).",
    law: ["§ 611a BGB (Arbeitsvertrag)", "BetrKV § 2 Nr. 14 (Hauswart)"],
    practice: "Der Hausmeister als 'Auge und Ohr' vor Ort. Pflichtenheft erstellen.",
    task: "Schreiben Sie eine Stellenanzeige für einen Hausmeister (Minijob).",
    type: "Personal"
  },
  day_26: {
    title: "Technische Anlagen: Heizung & Sanitär",
    theory: "Funktionsweise Zentralheizung, Fernwärme, Etagenheizung. Trinkwasserverordnung (Legionellenprüfung). Heizkostenverteiler und Zähler.",
    law: ["TrinkwV (Trinkwasserverordnung)", "HeizkostenV"],
    practice: "Legionellenbefall: Sofortmaßnahmen, Informationspflicht an Mieter und Gesundheitsamt.",
    task: "Erklären Sie einem Laien den Unterschied zwischen Verdunster und Funkzähler.",
    type: "Technik"
  },
  day_27: {
    title: "Technische Anlagen: Elektrik & Brandschutz",
    theory: "E-Check (DGUV V3) in Gemeinschaftsbereichen. Rauchwarnmelderpflicht (Landesbauordnungen). Fluchtwege freihalten. Brandschutztüren.",
    law: ["LBO (Landesbauordnung)", "DIN 14676 (Rauchwarnmelder)"],
    practice: "Fahrräder im Treppenhaus - Brandschutzrisiko oder geduldete Nutzung?",
    task: "Erstellen Sie einen Aushang zur Brandschutzordnung für das Treppenhaus.",
    type: "Sicherheit"
  },
  day_28: {
    title: "Modernisierung & Energieeffizienz (GEG)",
    theory: "Gebäudeenergiegesetz (GEG). Austauschpflichten für alte Heizungen. Dämmung oberste Geschossdecke. Energieausweis (Bedarf vs. Verbrauch).",
    law: ["GEG (Gebäudeenergiegesetz)", "§ 555b BGB (Modernisierung)"],
    practice: "Planung einer energetischen Sanierung. Fördermittel (KfW/BAFA) einbeziehen.",
    task: "Prüfen Sie, ob für ein Gebäude Bj. 1990 ein Energieausweis Pflicht ist.",
    type: "Umwelt"
  },
  day_29: {
    title: "Schimmel & Feuchtigkeit",
    theory: "Ursachen: Baulich (Wärmebrücken) oder Nutzerverhalten (Lüften). Taupunkt. Messverfahren (Hygrometer, Thermografie).",
    law: ["§ 536 BGB (Mangel)", "DIN 4108 (Wärmeschutz)"],
    practice: "Streitgespräch mit Mieter führen. Beweissicherung durch Datenlogger.",
    task: "Erstellen Sie ein Merkblatt 'Richtig Heizen und Lüften' für Mieter.",
    type: "Technik"
  },
  day_30: {
    title: "Praxisprojekt: Instandhaltungsplan",
    theory: "Langfristige Planung (10-Jahres-Plan). Kostenschätzung. Priorisierung von Maßnahmen. Abstimmung mit Erhaltungsrücklage.",
    law: ["§ 19 WEG (Ordnungsmäßige Verwaltung)"],
    practice: "Erstellung eines realen Instandhaltungsplans für ein fiktives Objekt (Bj. 1970).",
    task: "Entwickeln Sie einen 5-Jahres-Plan für Dach, Fassade und Heizung.",
    type: "Praxis"
  },

  // Woche 7-8: EDV, Prozesse & Mietrecht Vertiefung (Tag 31-40)
  day_31: {
    title: "Verwalter-Software & ERP-Systeme",
    theory: "Marktübersicht (Domus, Haufe, Immoware). Funktionen: Stammdaten, Buchhaltung, Ticket-System, Portale. Cloud vs. On-Premise.",
    law: ["GoBD (Grundsätze ordnungsmäßiger Buchführung)"],
    practice: "Einrichtung eines neuen Objekts in der Software. Datenimport.",
    task: "Vergleichen Sie drei Verwalter-Software-Lösungen anhand einer Matrix.",
    type: "Digital"
  },
  day_32: {
    title: "Datenschutz & DSGVO im Alltag",
    theory: "Verzeichnis von Verarbeitungstätigkeiten. Auftragsverarbeitungsverträge (AVV) mit Dienstleistern. Auskunftsrecht der Betroffenen.",
    law: ["DSGVO Art. 13, 15, 28", "BDSG"],
    practice: "Auskunftsanfrage eines Mieters beantworten. Was darf rausgegeben werden?",
    task: "Erstellen Sie ein Muster-Antwortschreiben auf eine DSGVO-Auskunft.",
    type: "Recht"
  },
  day_33: {
    title: "Digitale Eigentümerversammlung",
    theory: "Hybride vs. reine Online-Versammlung (nur mit Beschluss). Technische Voraussetzungen. Datensicherheit. Abstimmungstools.",
    law: ["§ 23 Abs. 1a WEG"],
    practice: "Simulation einer hybriden Versammlung. Umgang mit techn. Störungen.",
    task: "Erstellen Sie einen Leitfaden für Eigentümer zur Online-Teilnahme.",
    type: "Digital"
  },
  day_34: {
    title: "Prozessoptimierung & Zeitmanagement",
    theory: "Standardisierung von Abläufen (Checklisten). Ticket-Systeme für Schadensmeldungen. Telefonzeiten vs. Erreichbarkeit. Eisenhower-Matrix.",
    law: ["Keine spezifischen Gesetze - Management-Theorie"],
    practice: "Analyse des eigenen Zeitmanagements. Wo sind die Zeitfresser?",
    task: "Entwerfen Sie einen standardisierten Workflow für eine Schadensmeldung.",
    type: "Management"
  },
  day_35: {
    title: "Mietrecht Spezial: Gewerbemietrecht",
    theory: "Unterschiede zum Wohnraum: Keine Sozialklausel, Vertragsfreiheit, Laufzeiten, Indexmiete. Konkurrenzschutz.",
    law: ["§ 578 BGB (Mietverhältnisse über Grundstücke und Räume)"],
    practice: "Vertragsverhandlung für ein Ladenlokal. Wertsicherungsklausel formulieren.",
    task: "Prüfen Sie einen Gewerbemietvertrag auf unwirksame AGB-Klauseln.",
    type: "Recht"
  },
  day_36: {
    title: "Mietrecht Spezial: Möbliertes Wohnen",
    theory: "Ausnahmen beim Kündigungsschutz (Einliegerwohnung). Möblierungszuschlag (Berliner Modell vs. Hamburger Modell).",
    law: ["§ 549 BGB (Ausnahmen Kündigungsschutz)", "§ 573a BGB"],
    practice: "Kalkulation des Möblierungszuschlags für eine Einbauküche.",
    task: "Berechnen Sie den zulässigen Zuschlag für eine Ausstattung im Wert von 5.000€.",
    type: "Finanzen"
  },
  day_37: {
    title: "Mietrecht Spezial: Öffentlich gefördert",
    theory: "Wohnberechtigungsschein (WBS). Kostenmiete. Bindungsfristen. Fehlbelegungsabgabe.",
    law: ["WoBindG (Wohnungsbindungsgesetz)", "II. BV"],
    practice: "Prüfung der Belegungsbindung bei Mieterwechsel.",
    task: "Ermitteln Sie die zulässige Kostenmiete anhand einer Wirtschaftlichkeitsberechnung.",
    type: "Recht"
  },
  day_38: {
    title: "Mietrückstand & Mahnwesen",
    theory: "Verzug (automatisch nach Kalender). Mahnung (nicht zwingend, aber sinnvoll). Kündigungsrelevante Rückstände. Zahlungsplan.",
    law: ["§ 286 BGB (Verzug)", "§ 543 BGB (Fristlose Kündigung)"],
    practice: "Gesprächsführung mit säumigem Mieter. Ratenzahlungsvereinbarung.",
    task: "Erstellen Sie eine rechtssichere Mahnung mit Kündigungsandrohung.",
    type: "Finanzen"
  },
  day_39: {
    title: "Konfliktmanagement & Mediation",
    theory: "Eskalationsstufen nach Glasl. Rolle des Verwalters als Mediator. Neutralitätspflicht. Grenzen der Schlichtung.",
    law: ["MediationsG"],
    practice: "Nachbarschaftsstreit wegen Lärm. Moderation eines Schlichtungsgesprächs.",
    task: "Entwickeln Sie einen Leitfaden für das Beschwerdemanagement.",
    type: "Softskills"
  },
  day_40: {
    title: "Abschluss Block 2: Technik & Vertiefung",
    theory: "Zusammenfassung Tag 21-39. Vernetzung von technischem Verständnis und rechtlichem Rahmen.",
    law: ["Gesamtschau Technik & Mietrecht"],
    practice: "Zwischenprüfung (40 Fragen) über Technik und spezielles Mietrecht.",
    task: "Absolvieren Sie die Prüfungssimulation für Block 2.",
    type: "Test"
  }
};
