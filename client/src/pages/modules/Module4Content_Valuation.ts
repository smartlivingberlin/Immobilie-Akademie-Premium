export const contentDataModule4: Record<string, {
  title: string;
  theory: string;
  law: string[];
  practice: string;
  task: string;
  type?: string;
}> = {
  // Block 1: Grundlagen & Markt (Tag 1-4)
  day_1: {
    title: "Einführung in die Immobilienbewertung",
    theory: "Die Immobilienbewertung ermittelt den Verkehrswert (Marktwert) von Grundstücken und Gebäuden. Gesetzliche Grundlage ist das Baugesetzbuch (BauGB) und die Immobilienwertermittlungsverordnung (ImmoWertV). Wichtige Begriffe: Verkehrswert (§ 194 BauGB), Bodenwert, Gebäudewert. Anlässe für Bewertungen: Kauf/Verkauf, Beleihung, Erbschaft, Scheidung, Besteuerung.",
    law: ["§ 194 BauGB (Verkehrswert)", "ImmoWertV 2021 (Grundlagen)"],
    practice: "Unterscheidung von Preis (was gezahlt wird) und Wert (was es objektiv wert ist). Analyse eines aktuellen Marktberichts.",
    task: "Definieren Sie den Begriff 'Verkehrswert' in eigenen Worten und nennen Sie 3 Bewertungsanlässe.",
    type: "Theorie"
  },
  day_2: {
    title: "Rechtliche Grundlagen & Normen",
    theory: "Neben BauGB und ImmoWertV sind die Wertermittlungsrichtlinien (WertR, Bodenrichtwertrichtlinie, Sachwertrichtlinie, Ertragswertrichtlinie) relevant. Flächenberechnung nach Wohnflächenverordnung (WoFlV) oder DIN 277. Bedeutung des Grundbuchs für die Bewertung (Lasten und Beschränkungen).",
    law: ["WoFlV (Wohnflächenverordnung)", "DIN 277 (Grundflächen und Rauminhalte)"],
    practice: "Einsicht in ein Grundbuchblatt: Wie beeinflusst ein Wohnrecht oder eine Grunddienstbarkeit den Wert?",
    task: "Erstellen Sie eine Übersicht der hierarchischen Rechtsquellen der Immobilienbewertung.",
    type: "Recht"
  },
  day_3: {
    title: "Marktanalyse & Makro-Standort",
    theory: "Der Wert einer Immobilie wird maßgeblich durch Angebot und Nachfrage bestimmt. Makrostandort: Region, Stadt, Wirtschaftskraft, Bevölkerungsentwicklung, Infrastruktur. Zyklische Schwankungen des Immobilienmarktes.",
    law: ["§ 8 ImmoWertV (Marktanpassung)"],
    practice: "Analyse des Makrostandorts 'Berlin': Einwohnerentwicklung, Kaufkraftkennziffern, Arbeitslosenquote.",
    task: "Führen Sie eine Makrostandortanalyse für eine deutsche Großstadt Ihrer Wahl durch.",
    type: "Analyse"
  },
  day_4: {
    title: "Mikro-Standort & Objektbezogene Faktoren",
    theory: "Mikrostandort: Unmittelbare Umgebung, Nachbarschaft, Lärmimmissionen, Besonnung, ÖPNV-Anbindung, Einkaufsmöglichkeiten. Objektart (EFH, MFH, Gewerbe) und deren spezifische Marktgängigkeit.",
    law: ["§ 4 ImmoWertV (Grundlagen der Wertermittlung)"],
    practice: "Begehung einer Immobilie: Checkliste für die Mikrostandort-Bewertung (Schulen, Lärm, Ausblick).",
    task: "Bewerten Sie den Mikrostandort Ihres eigenen Wohnortes anhand einer Skala von 1-10.",
    type: "Analyse"
  },

  // Block 2: Verfahrensgrundlagen & Vergleichswert (Tag 5-8)
  day_5: {
    title: "Überblick der Wertermittlungsverfahren",
    theory: "Die ImmoWertV kennt drei normierte Verfahren: Vergleichswertverfahren (§ 15), Ertragswertverfahren (§ 17) und Sachwertverfahren (§ 21). Wahl des Verfahrens hängt von der Objektart ab (z.B. EFH -> Sach-/Vergleichswert, MFH -> Ertragswert).",
    law: ["§ 8 ImmoWertV (Verfahrenswahl)", "§ 15, 17, 21 ImmoWertV"],
    practice: "Entscheidungsbaum: Welches Verfahren für welche Immobilie? (Eigentumswohnung vs. Fabrikhalle).",
    task: "Ordnen Sie 5 Immobilientypen dem jeweils vorrangigen Bewertungsverfahren zu.",
    type: "Theorie"
  },
  day_6: {
    title: "Bodenwertermittlung",
    theory: "Der Bodenwert wird meist im Vergleichswertverfahren ermittelt, oft basierend auf Bodenrichtwerten (BORIS). Anpassung an Grundstückseigenschaften (Größe, GFZ/GRZ, Tiefe, Ecklage) mittels Umrechnungskoeffizienten.",
    law: ["§ 16 ImmoWertV (Bodenwertermittlung)", "§ 196 BauGB (Bodenrichtwerte)"],
    practice: "Nutzung von BORIS-D zur Ermittlung des Bodenrichtwerts. Anwendung von GFZ-Umrechnungskoeffizienten.",
    task: "Ermitteln Sie den Bodenwert für ein 500qm Grundstück bei einem BRW von 400 €/qm und Anpassungsbedarf.",
    type: "Berechnung"
  },
  day_7: {
    title: "Vergleichswertverfahren: Grundlagen",
    theory: "Anwendung bei Eigentumswohnungen, Reihenhäusern und unbebauten Grundstücken. Basierend auf Kaufpreissammlung der Gutachterausschüsse. Direkter Vergleich vs. indirekter Vergleich (Vergleichsfaktoren).",
    law: ["§ 15 ImmoWertV (Vergleichswertverfahren)"],
    practice: "Suche nach Vergleichsobjekten in Immobilienportalen (Marktpreise vs. Kaufpreise). Problematik der Ausreißer.",
    task: "Erklären Sie den Unterschied zwischen direktem und indirektem Vergleichswertverfahren.",
    type: "Theorie"
  },
  day_8: {
    title: "Vergleichswertverfahren: Anpassung & Berechnung",
    theory: "Vergleichspreise müssen an das Bewertungsobjekt angepasst werden (Indexierung auf Wertermittlungsstichtag, Zu-/Abschläge für Ausstattung, Lage, Zustand). Statistische Methoden (Mittelwert, Standardabweichung).",
    law: ["Anlage 1 ImmoWertV (Vergleichsfaktoren)"],
    practice: "Berechnung: 3 Vergleichswohnungen mit unterschiedlichen Kaufdaten und Ausstattungen auf das Bewertungsobjekt umrechnen.",
    task: "Führen Sie eine komplette Vergleichswertberechnung für eine 3-Zimmer-Wohnung durch.",
    type: "Berechnung"
  },

  // Block 3: Ertragswertverfahren (Tag 9-10)
  day_9: {
    title: "Ertragswertverfahren: Struktur & Rohertrag",
    theory: "Fokus auf Renditeobjekte (MFH, Gewerbe). Wert = Bodenwert + Gebäudeertragswert. Rohertrag = marktüblich erzielbare Miete (Jahresrohmiete). Bewirtschaftungskosten (Verwaltung, Instandhaltung, Mietausfallwagnis).",
    law: ["§ 17-20 ImmoWertV (Ertragswertverfahren)", "Anlage 2 ImmoWertV (Bewirtschaftungskosten)"],
    practice: "Ermittlung der marktüblichen Miete anhand des Mietspiegels. Abgrenzung zur tatsächlichen Miete (Over-/Under-rented).",
    task: "Berechnen Sie den Jahresreinertrag für ein MFH mit 60.000 € Jahresrohmiete.",
    type: "Berechnung"
  },
  day_10: {
    title: "Ertragswertverfahren: Liegenschaftszins & Barwert",
    theory: "Liegenschaftszinssatz (LZS) ist kapitalmarktabhängig und objektartspezifisch. Vervielfältigertabelle (Barwertfaktor) abhängig von LZS und Restnutzungsdauer (RND). Berechnung des Gebäudeertragswerts.",
    law: ["§ 20 ImmoWertV (Barwertfaktor)", "§ 14 ImmoWertV (Liegenschaftszinssatz)"],
    practice: "Einfluss des Liegenschaftszinses auf den Wert: Vergleich 3% vs. 5%. Berechnung der Restnutzungsdauer.",
    task: "Führen Sie eine vollständige Ertragswertberechnung für ein Zinshaus durch.",
    type: "Berechnung"
  },

  // Block 4: Sachwertverfahren (Tag 11-12)
  day_11: {
    title: "Sachwertverfahren: Normalherstellungskosten (NHK)",
    theory: "Anwendung bei selbstgenutzten Objekten (EFH), wo Kosten im Vordergrund stehen. Substanzwertorientiert. Basis: NHK 2010 (bzw. NHK 2025). Baupreisindex zur Anpassung an Stichtag.",
    law: ["§ 21-23 ImmoWertV (Sachwertverfahren)", "Sachwertrichtlinie (NHK 2010)"],
    practice: "Ermittlung der Standardstufe (Ausstattungsstandard) einer Immobilie. Auswahl der korrekten NHK-Basiswerte.",
    task: "Bestimmen Sie die NHK für ein freistehendes EFH, Baujahr 2000, mittlerer Standard.",
    type: "Berechnung"
  },
  day_12: {
    title: "Sachwertverfahren: Alterswertminderung & Marktanpassung",
    theory: "Lineare Alterswertminderung (Gesamtnutzungsdauer meist 80 Jahre). Vorläufiger Sachwert = (NHK - Alterswertminderung) + Bodenwert. WICHTIG: Marktanpassungsfaktor (Sachwertfaktor) zur Angleichung an das Marktgeschehen.",
    law: ["§ 23 ImmoWertV (Alterswertminderung)", "§ 14 Abs. 2 ImmoWertV (Sachwertfaktor)"],
    practice: "Berechnung der Alterswertminderung bei Modernisierungen (modifizierte Restnutzungsdauer). Anwendung des Marktanpassungsfaktors.",
    task: "Berechnen Sie den endgültigen Sachwert eines EFH unter Berücksichtigung eines Faktors von 1,15.",
    type: "Berechnung"
  },

  // Block 5: Gutachten & Spezialfälle (Tag 13-16)
  day_13: {
    title: "Aufbau eines Verkehrswertgutachtens",
    theory: "Formale Anforderungen: Nachvollziehbarkeit, Begründungspflicht, Transparenz. Gliederung: Deckblatt, Zusammenfassung, Grundlagen, Lage, Objektbeschreibung, Bewertung, Ergebnis.",
    law: ["§ 194 BauGB", "Mustergutachten Richtlinien"],
    practice: "Analyse eines Mustergutachtens. Wie werden Annahmen begründet? Wie ist die Fotodokumentation eingebunden?",
    task: "Erstellen Sie ein Gliederungskonzept für ein Kurzgutachten.",
    type: "Dokumente"
  },
  day_14: {
    title: "Objektbeschreibung & Bauschäden",
    theory: "Detaillierte Erfassung der Bausubstanz. Konstruktionsart, Ausbau, energetischer Zustand. Berücksichtigung von Bauschäden (Baumängel) als 'Besondere objektspezifische Grundstücksmerkmale' (boG).",
    law: ["§ 8 Abs. 3 ImmoWertV (boG)"],
    practice: "Erkennung typischer Bauschäden (Feuchtigkeit, Risse). Kostenschätzung für die Beseitigung (Marktwerteinschätzung, nicht Sanierungskosten!).",
    task: "Beschreiben Sie eine fiktive Immobilie inkl. zwei wertbeeinflussender Bauschäden.",
    type: "Praxis"
  },
  day_15: {
    title: "Spezialfälle: Rechte und Belastungen",
    theory: "Bewertung von Rechten in Abteilung II des Grundbuchs: Wohnungsrecht, Nießbrauch, Wegerecht, Leitungsrecht. Barwertmethode zur Kapitalisierung des werten Vor- oder Nachteils.",
    law: ["§ 193 BauGB"],
    practice: "Berechnung des Werts eines lebenslangen Wohnrechts für eine 75-jährige Person (Sterbetafel, Leibrentenbarwertfaktor).",
    task: "Ermitteln Sie den Wertmindernden Effekt eines Wohnrechts.",
    type: "Berechnung"
  },
  day_16: {
    title: "Spezialfälle: Erbbaurecht & WEG",
    theory: "Besonderheiten bei Erbbaurecht (Bodenwertanteil, Erbbauzins). Besonderheiten bei Eigentumswohnungen (Sondereigentum vs. Gemeinschaftseigentum, Miteigentumsanteile).",
    law: ["ErbbauRG", "WEG"],
    practice: "Bewertung einer Eigentumswohnung im Ertragswertverfahren (Verwalterkosten als Bewirtschaftungskosten beachten!).",
    task: "Fassen Sie die Besonderheiten der Bewertung eines Erbbaurechts zusammen.",
    type: "Theorie"
  },

  // Block 6: Tools & Abschluss (Tag 17-20)
  day_17: {
    title: "Digitale Tools & Datenquellen",
    theory: "Nutzung von Geoinformationssystemen (GIS), Bodenrichtwertkarten (BORIS-D), Online-Bewertungstools (Sprengnetter, Dr. Klein - Grenzen kennen!). Zugriff auf Kaufpreissammlungen.",
    law: ["Datenschutzgesetze"],
    practice: "Rechercheübung: Alle relevanten Wertdaten für eine Adresse online finden (Bodenrichtwert, Mietspiegel, Lagemerkmale).",
    task: "Erstellen Sie eine Liste der wichtigsten digitalen Datenquellen für Ihre Region.",
    type: "Digital"
  },
  day_18: {
    title: "Plausibilisierung & Haftung",
    theory: "Gutachterhaftung bei Fehlgutachten (§ 839a BGB). Sorgfaltspflichten. Plausibilisierung der Ergebnisse (z.B. Ertragswert vs. Sachwert - Marktanpassung prüfen).",
    law: ["§ 839a BGB (Sachverständigenhaftung)"],
    practice: "Review eines Fremdgutachtens: Wo sind logische Brüche? Sind die Liegenschaftszinssätze marktkonform?",
    task: "Schreiben Sie eine Haftungsausschlusserklärung für eine Marktwerteinschätzung.",
    type: "Recht"
  },
  day_19: {
    title: "Abschlussprojekt: Vorbereitung",
    theory: "Zusammenführung aller Lerninhalte. Auswahl einer realen oder fiktiven Immobilie für das Abschlussgutachten. Beschaffung der Unterlagen (Grundbuch, Flurkarte, Bauzeichnungen).",
    law: ["Alle bisherigen"],
    practice: "Strukturierung des Abschlussgutachtens. Festlegung des Bewertungsverfahrens.",
    task: "Erstellen Sie das Deckblatt und die Vorbemerkungen für Ihr Abschlussgutachten.",
    type: "Projekt"
  },
  day_20: {
    title: "Abschlussprojekt: Fertigstellung",
    theory: "Finalisierung der Wertermittlung. Zusammenführung von Text und Berechnung. Endkontrolle auf Form und Plausibilität.",
    law: ["Alle bisherigen"],
    practice: "Erstellung eines Kurzgutachtens (ca. 10-15 Seiten) für das gewählte Objekt.",
    task: "Reichen Sie Ihr fertiges Kurzgutachten zur Bewertung ein (Simulation).",
    type: "Projekt"
  }
};
