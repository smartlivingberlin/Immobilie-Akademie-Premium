// Content Data für Modul 3, Teil 3 (Tag 41-60)
// Themen: Buchhaltung, Abrechnung, Eigentümerversammlung

export const contentDataPart3: Record<string, {
  title: string;
  theory: string;
  law: string[];
  practice: string;
  task: string;
  type?: string;
}> = {
  // Woche 9-10: Buchhaltung & Abrechnung (Tag 41-50)
  day_41: {
    title: "Grundlagen der WEG-Buchhaltung",
    theory: "Einnahmen-Überschuss-Rechnung vs. Bilanzierung (nicht nötig bei WEG). Kontenrahmen (SKR03/04 oder spezial). Bankkonten (Treuhandkonto vs. offenes Fremdgeldkonto).",
    law: ["§ 27 Abs. 5 WEG (Vermögensverwaltung)", "§ 266 HGB (Analog)"],
    practice: "Einrichtung der Bankkonten für eine neue WEG. Trennungsgrundsatz strikt beachten!",
    task: "Erstellen Sie einen Kontenplan für eine kleine WEG (10 Einheiten).",
    type: "Finanzen"
  },
  day_42: {
    title: "Buchen von Geschäftsvorfällen",
    theory: "Soll an Haben. Hausgeldzahlungen, Rechnungen, Lastschriften. Zuordnung zu Kostenstellen und Kostenträgern (Umlageschlüssel).",
    law: ["GoBD"],
    practice: "Verbuchung einer Handwerkerrechnung mit Skonto. Zuordnung zur Instandhaltung.",
    task: "Buchen Sie 5 typische Geschäftsvorfälle (Versicherung, Wasser, Hausmeister, Reparatur, Hausgeld).",
    type: "Finanzen"
  },
  day_43: {
    title: "Rücklagenbildung & Verwendung",
    theory: "Zuführung zur Erhaltungsrücklage. Zweckbindung. Entnahme nur für Instandhaltung (oder Beschluss). Anlageformen (Mündelsicher).",
    law: ["§ 19 Abs. 2 Nr. 4 WEG"],
    practice: "Berechnung der Zinsen (aktuell wieder relevant). Umgang mit Strafzinsen (Verwahrentgelt).",
    task: "Berechnen Sie die Entwicklung der Rücklage über 5 Jahre bei 2% Zins und jährlicher Entnahme.",
    type: "Finanzen"
  },
  day_44: {
    title: "Jahreswirtschaftsplan (JWP) - Erstellung",
    theory: "Prognose der Einnahmen und Ausgaben. Gesamtwirtschaftsplan und Einzelwirtschaftspläne. Verteilerschlüssel (§ 16 WEG).",
    law: ["§ 28 WEG"],
    practice: "Anpassung der Hausgelder aufgrund gestiegener Energiekosten. Kommunikation an Eigentümer.",
    task: "Erstellen Sie einen kompletten JWP für das kommende Jahr inkl. Heizkostenprognose.",
    type: "Finanzen"
  },
  day_45: {
    title: "Jahresabrechnung - Gesamtabrechnung",
    theory: "Darstellung aller Einnahmen und Ausgaben des Kalenderjahres. Abstimmung der Bankkonten (Vermögensstatus). Entwicklung der Rücklage.",
    law: ["§ 28 WEG"],
    practice: "Plausibilitätsprüfung: Stimmen Anfangs- und Endbestände? Lückenlose Dokumentation.",
    task: "Erstellen Sie den Mantelbogen (Gesamtabrechnung) für ein Wirtschaftsjahr.",
    type: "Finanzen"
  },
  day_46: {
    title: "Jahresabrechnung - Einzelabrechnung",
    theory: "Verteilung der Kosten auf die Sondereigentümer. Umlageschlüssel (MEA, Personen, Verbrauch, Einheiten). Abrechnungsspitze vs. Anpassung.",
    law: ["§ 16 WEG (Nutzen/Lasten)", "§ 28 WEG"],
    practice: "Berechnung der Nachzahlung/Guthaben. Umgang mit Eigentümerwechsel im laufenden Jahr.",
    task: "Erstellen Sie eine Einzelabrechnung für Wohnung Nr. 3 (75qm, 2 Personen).",
    type: "Finanzen"
  },
  day_47: {
    title: "Heizkostenabrechnung & HKVO",
    theory: "Vorrang der HKVO vor WEG-Recht. 50-70% nach Verbrauch, Rest nach Fläche. Nutzerwechselgebühr. Kürzungsrecht bei fehlender Messung.",
    law: ["HeizkostenV § 7 (Verteilung)", "HeizkostenV § 12 (Kürzungsrecht)"],
    practice: "Prüfung einer Abrechnung vom Messdienstleister (Techem, Ista, etc.). Häufige Fehler finden.",
    task: "Verteilen Sie Gesamtkosten von 10.000€ (Gas) korrekt nach 70/30 Schlüssel.",
    type: "Technik"
  },
  day_48: {
    title: "Rechnungsprüfung durch den Beirat",
    theory: "Vorbereitung der Unterlagen. Stichproben vs. Vollprüfung. Prüfprotokoll. Empfehlung zur Entlastung.",
    law: ["§ 29 WEG (Verwaltungsbeirat)"],
    practice: "Durchführung einer Beiratsprüfung. Umgang mit fehlenden Belegen oder Unklarheiten.",
    task: "Erstellen Sie eine Checkliste für die Rechnungsprüfung.",
    type: "Organisation"
  },
  day_49: {
    title: "Entlastung des Verwalters",
    theory: "Bedeutung der Entlastung (Verzicht auf Ersatzansprüche). Wann darf Entlastung verweigert werden? Grenzen der Entlastung (Straftaten).",
    law: ["BGH-Rechtsprechung zur Entlastung"],
    practice: "Formulierung des Beschlussantrags zur Entlastung und Genehmigung der Abrechnung.",
    task: "Schreiben Sie den TOP 'Genehmigung Jahresabrechnung und Entlastung' für die ETV.",
    type: "Recht"
  },
  day_50: {
    title: "Praxisprojekt: Die fehlerhafte Abrechnung",
    theory: "Analyse komplexer Abrechnungsfehler. BGH-Rechtsprechung zur Anfechtung. Korrektur vs. Neubeschluss.",
    law: ["§ 28 WEG"],
    practice: "Fallstudie: Eine Abrechnung wird angefochten, weil der Verteilerschlüssel falsch war. Was nun?",
    task: "Korrigieren Sie eine fehlerhafte Muster-Abrechnung und schreiben Sie eine Erläuterung.",
    type: "Praxis"
  },

  // Woche 11-12: Eigentümerversammlung & Beschlüsse (Tag 51-60)
  day_51: {
    title: "Einladung & Tagesordnung (TOPs)",
    theory: "Fristen (3 Wochen). Form (Textform). Bestimmtheitsgrundsatz bei TOPs (Beschlussgegenstand muss erkennbar sein).",
    law: ["§ 24 WEG (Einberufung)", "§ 23 WEG"],
    practice: "Erstellung einer rechtssicheren Tagesordnung. Aufnahme von Anträgen der Eigentümer.",
    task: "Formulieren Sie 5 rechtssichere Tagesordnungspunkte (u.a. bauliche Veränderung, Abrechnung).",
    type: "Organisation"
  },
  day_52: {
    title: "Vollmachten & Vertretung",
    theory: "Vertretungsbeschränkungen in der Gemeinschaftsordnung. Form der Vollmacht. Beiratsvollmacht. Verwaltervollmacht.",
    law: ["§ 25 WEG (Beschlussfassung)"],
    practice: "Prüfung der Anwesenheitsliste. Zurückweisung ungültiger Vollmachten.",
    task: "Entwerfen Sie ein Vollmachtsformular für die ETV.",
    type: "Recht"
  },
  day_53: {
    title: "Versammlungsleitung & Ablauf",
    theory: "Leitung durch Verwalter (oder Beirat). Hausrecht. Rederecht. Umgang mit Störern. Geschäftsordnungsbeschlüsse.",
    law: ["§ 24 Abs. 5 WEG (Vorsitz)"],
    practice: "Simulation: Eine hitzige Debatte über eine Sonderumlage moderieren.",
    task: "Erstellen Sie einen Leitfaden 'Ablauf einer ETV' für sich selbst.",
    type: "Softskills"
  },
  day_54: {
    title: "Beschlussfassung & Abstimmung",
    theory: "Kopfprinzip vs. Wertprinzip vs. Objektprinzip. Doppelt qualifizierte Mehrheit (bei baulichen Veränderungen/Modernisierung). Allstimmigkeit.",
    law: ["§ 25 Abs. 2 WEG (Stimmrecht)", "§ 20 WEG (Bauliche Veränderungen)"],
    practice: "Auszählung einer komplizierten Abstimmung mit verschiedenen Miteigentumsanteilen.",
    task: "Berechnen Sie das Abstimmungsergebnis in einer WEG mit 10.000 MEA.",
    type: "Recht"
  },
  day_55: {
    title: "Verkündung & Protokollierung",
    theory: "Verkündung macht Beschluss erst existent ('Beschlussformel'). Niederschrift (§ 24 Abs. 6 WEG). Unterschriften (Verwalter + Eigentümer).",
    law: ["§ 24 Abs. 6 WEG"],
    practice: "Formulierung klarer Beschlusstexte im Protokoll. Vermeidung von 'Zitterbeschlüssen'.",
    task: "Protokollieren Sie 3 gefasste Beschlüsse rechtssicher.",
    type: "Dokumente"
  },
  day_56: {
    title: "Beschluss-Sammlung führen",
    theory: "Eintragungspflicht unverzüglich. Inhalt: Wortlaut, Ort, Datum. Einsichtsrecht. Bedeutung für Rechtsnachfolger.",
    law: ["§ 24 Abs. 7 WEG"],
    practice: "Pflege der digitalen Beschluss-Sammlung. Löschung aufgehobener Beschlüsse (Kennzeichnung).",
    task: "Übertragen Sie die Protokoll-Beschlüsse in die Sammlung.",
    type: "Organisation"
  },
  day_57: {
    title: "Anfechtungsklage & Nichtigkeitsklage",
    theory: "Anfechtungsfrist (1 Monat). Begründungsfrist (2 Monate). Wirkung des Urteils. Nichtigkeit bei Verstoß gegen zwingendes Recht/Sittenwidrigkeit.",
    law: ["§ 44 WEG (Klage)", "§ 23 Abs. 4 WEG (Nichtigkeit)"],
    practice: "Reaktion auf eine Klagezustellung. Information der Eigentümer. Beauftragung Anwalt.",
    task: "Erstellen Sie ein Informationsschreiben an die Eigentümer über eine eingegangene Klage.",
    type: "Recht"
  },
  day_58: {
    title: "Umlaufbeschlüsse",
    theory: "Textform möglich (§ 23 Abs. 3 WEG). Allstimmigkeit erforderlich (oder Mehrheit, wenn vorher beschlossen). Praktische Hürden.",
    law: ["§ 23 Abs. 3 WEG"],
    practice: "Durchführung eines Umlaufbeschlusses für eine dringende Reparatur.",
    task: "Entwerfen Sie ein Anschreiben für einen Umlaufbeschluss.",
    type: "Organisation"
  },
  day_59: {
    title: "Bauliche Veränderungen & E-Mobilität",
    theory: "Privilegierte Maßnahmen (§ 20 Abs. 2 WEG): E-Mobilität, Barrierefreiheit, Einbruchschutz, Glasfaser. Anspruch auf Genehmigung.",
    law: ["§ 20 WEG"],
    practice: "Antrag auf Wallbox-Installation. Wer trägt die Kosten? (Verursacherprinzip § 21 WEG).",
    task: "Prüfen Sie einen Antrag auf Einbau eines Treppenlifts.",
    type: "Technik"
  },
  day_60: {
    title: "Abschluss Block 3: Finanzen & ETV",
    theory: "Zusammenfassung Tag 41-59. Der Kreislauf: Wirtschaftsplan -> ETV -> Abrechnung.",
    law: ["Gesamtschau Finanzen & ETV"],
    practice: "Zwischenprüfung (40 Fragen) über Buchhaltung und Versammlungsrecht.",
    task: "Absolvieren Sie die Prüfungssimulation für Block 3.",
    type: "Test"
  }
};
