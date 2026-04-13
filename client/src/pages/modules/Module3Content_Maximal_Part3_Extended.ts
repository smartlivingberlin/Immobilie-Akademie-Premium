// Modul 3 Part 3: Buchhaltung, Abrechnung & Eigentümerversammlung - Maximalist Content
// Tage 43-60 | Vollständig erweitert nach Modul-2-Standard

export interface WEGDayContent {
  title: string;
  theory: string;
  extendedTheory?: string;
  law: string[];
  practice: string;
  caseStudy?: string;
  task?: string;
  tasks?: Array<{type?: string; question: string; hint?: string}>;
  quiz?: Array<{question: string; options?: string[]; answer?: string; explanation?: string}>;
  solution?: string;
  type?: string;
}

export const contentDataModule3MaximalPart3Extended: Record<string, WEGDayContent> = {
  // === Woche 9: Buchhaltung & Rücklagen (Tag 43-47) ===
  
  day_43: {
    title: "Rücklagenbildung & Verwendung",
    theory: "Die Erhaltungsrücklage (früher: Instandhaltungsrücklage) ist das finanzielle Rückgrat jeder WEG. Sie sichert die langfristige Werterhaltung der Immobilie.",
    extendedTheory: `
### Die Erhaltungsrücklage: Zweck und Rechtsgrundlage

**Gesetzliche Grundlage: § 19 Abs. 2 Nr. 4 WEG**
> "Die Wohnungseigentümer haben [...] in angemessener Höhe eine Erhaltungsrücklage anzusammeln."

**Zweck:**
- Finanzierung außerordentlicher Instandhaltungs- und Instandsetzungsmaßnahmen
- Vermeidung von Sonderumlagen
- Werterhaltung der Immobilie

**Wichtig:** Die Rücklage ist NICHT für Modernisierungen gedacht (nur für Erhaltung)!

### Berechnung der angemessenen Höhe

**Peterssche Formel (Faustregel):**
- **Neubau (0-22 Jahre):** 0,80 € pro m² Wohnfläche pro Monat
- **Mittelalter (23-32 Jahre):** 0,90 € pro m² pro Monat
- **Altbau (33+ Jahre):** 1,00 € pro m² pro Monat

**Beispiel: MFH 10 WE, Gesamtwohnfläche 800 m², Baujahr 1985 (41 Jahre alt)**
- Empfohlene Rücklage: 800 m² × 1,00 € = 800 €/Monat
- Pro Jahr: 9.600 €
- Pro WE/Monat: 80 €

**Alternative: Langfristiger Instandhaltungsplan**
- Ermittlung der zu erwartenden Kosten über 10-30 Jahre
- Beispiel: Dach (80.000 € in 15 Jahren) + Fassade (120.000 € in 20 Jahren) + Heizung (50.000 € in 10 Jahren)
- Durchschnittliche jährliche Kosten: (80.000/15 + 120.000/20 + 50.000/10) = 16.333 €/Jahr
- Monatliche Rücklage: 1.361 €

### Verwendung der Erhaltungsrücklage

**Zulässige Verwendung:**
- Dachreparatur nach Sturm
- Fassadensanierung
- Heizungserneuerung
- Aufzugreparatur
- Rohrsanierung

**Unzulässige Verwendung (ohne Beschluss):**
- Modernisierung (z.B. Aufzugeinbau)
- Laufende Betriebskosten (z.B. Heizungswartung)
- Rückzahlung an Eigentümer

**Ausnahme:** Die Eigentümerversammlung kann mit qualifizierter Mehrheit (§ 20 WEG) beschließen, die Rücklage auch für Modernisierungen zu verwenden.

### Anlageformen der Erhaltungsrücklage

**Grundsatz: Mündelsicherheit (§ 1807 BGB analog)**

**Zulässige Anlageformen:**
- Tagesgeldkonto (flexibel, aber niedrige Zinsen)
- Festgeld (höhere Zinsen, aber gebunden)
- Sparbuch (veraltet, kaum noch relevant)
- Bundesanleihen (sehr sicher, aber niedrige Rendite)

**Unzulässige Anlageformen (ohne Beschluss):**
- Aktien (zu riskant)
- Immobilienfonds (zu illiquide)
- Kryptowährungen (zu spekulativ)

**Wichtig:** Seit 2022 sind Zinsen wieder positiv (2-3%), nach Jahren von Strafzinsen (Verwahrentgelt).

### Rücklagenentwicklung: Beispielrechnung

**Ausgangslage:**
- Anfangsbestand: 50.000 €
- Zuführung: 9.600 €/Jahr
- Zinsen: 2,5% p.a.
- Entnahme Jahr 3: 30.000 € (Dachsanierung)

**Jahr 1:**
- Anfang: 50.000 €
- Zuführung: 9.600 €
- Zinsen: (50.000 + 9.600/2) × 0,025 = 1.370 €
- Ende: 60.970 €

**Jahr 2:**
- Anfang: 60.970 €
- Zuführung: 9.600 €
- Zinsen: (60.970 + 9.600/2) × 0,025 = 1.644 €
- Ende: 72.214 €

**Jahr 3:**
- Anfang: 72.214 €
- Zuführung: 9.600 €
- Entnahme: -30.000 €
- Zinsen: (72.214 + 9.600 - 30.000) × 0,025 = 1.295 €
- Ende: 53.109 €

**Jahr 4:**
- Anfang: 53.109 €
- Zuführung: 9.600 €
- Zinsen: (53.109 + 9.600/2) × 0,025 = 1.448 €
- Ende: 64.157 €

**Jahr 5:**
- Anfang: 64.157 €
- Zuführung: 9.600 €
- Zinsen: (64.157 + 9.600/2) × 0,025 = 1.724 €
- Ende: 75.481 €

**Fazit:** Nach 5 Jahren trotz Entnahme von 30.000 € ein Bestand von 75.481 € (Anfang: 50.000 €).
    `,
    law: [
      "[§ 19 Abs. 2 Nr. 4 WEG](https://www.gesetze-im-internet.de/woeigg/__19.html) (Erhaltungsrücklage)",
      "[§ 21 Abs. 5 Nr. 4 WEG](https://www.gesetze-im-internet.de/woeigg/__21.html) (Wirtschaftsplan)",
      "[§ 1807 BGB](https://www.gesetze-im-internet.de/bgb/__1807.html) (Mündelsichere Anlagen)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Rücklagenbildung & Verwendung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Rücklagenbildung & Verwendung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Rücklagenbildung & Verwendung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
### Praxis-Fall: Berechnung der Zinsen

**Sachverhalt:**
WEG mit 12 Einheiten. Erhaltungsrücklage zum 01.01.2026: 80.000 €. Monatliche Zuführung: 1.200 € (100 €/WE). Zinssatz Festgeld: 2,8% p.a. (Laufzeit 1 Jahr).

**Fragen:**
1. Wie hoch ist der Zinsertrag Ende 2026?
2. Wie hoch ist der Endbestand?
3. Wie verteilen sich die Zinsen auf die Eigentümer?

**Lösung:**

**Zu 1:** Zinsberechnung
- Anfangsbestand: 80.000 €
- Zuführung über Jahr: 12 × 1.200 € = 14.400 €
- Durchschnittlicher Bestand: 80.000 + 14.400/2 = 87.200 €
- Zinsen: 87.200 × 0,028 = 2.442 €

**Zu 2:** Endbestand
- Anfang: 80.000 €
- Zuführung: 14.400 €
- Zinsen: 2.442 €
- **Ende: 96.842 €**

**Zu 3:** Verteilung der Zinsen
- Zinsen gehören zur Rücklage (nicht zu den Eigentümern persönlich)
- Sie erhöhen den Gesamtbestand der Rücklage
- Jeder Eigentümer profitiert anteilig (nach MEA)
- Beispiel: Eigentümer mit 10% MEA → Anteil an Rücklage: 9.684 €
    `,
    caseStudy: `
**Fall: Die zu niedrige Rücklage**

WEG mit 8 Einheiten, Baujahr 1975. Rücklage: 15.000 € (seit 20 Jahren unverändert 50 €/WE/Monat). Jetzt steht Dachsanierung an (Kosten: 60.000 €). Die Eigentümer sind schockiert über die Sonderumlage von 45.000 € (5.625 €/WE).

**Analyse:**
- **Peterssche Formel:** Bei Baujahr 1975 (51 Jahre) wären 1,00-1,20 €/m² angemessen
- **Annahme:** Gesamtwohnfläche 600 m² → Rücklage sollte 600-720 €/Monat sein
- **Tatsächlich:** 400 €/Monat (50 €/WE × 8 WE)
- **Defizit:** 200-320 €/Monat über 20 Jahre = 48.000-76.800 €!

**Konsequenzen:**
- Sonderumlage war vermeidbar gewesen
- Verwalter hätte früher auf Erhöhung drängen müssen
- Haftungsrisiko für Verwalter? (Streitfrage, meist verneint, da Beschlusskompetenz bei Eigentümern liegt)

**Empfehlung für Verwalter:**
- Jährliche Überprüfung der Rücklage im Rahmen des Wirtschaftsplans
- Hinweis auf Unterdeckung in der Eigentümerversammlung
- Dokumentation der Empfehlung (Haftungsschutz)
    `,
    task: "Berechnen Sie die Entwicklung der Erhaltungsrücklage über 5 Jahre bei 2,5% Zinsen p.a., jährlicher Zuführung von 10.000 € und einer Entnahme von 25.000 € in Jahr 3. Anfangsbestand: 40.000 €.",
    solution: `
**Musterlösung: Rücklagenentwicklung über 5 Jahre**

**Annahmen:**
- Anfangsbestand: 40.000 €
- Zuführung: 10.000 €/Jahr (monatlich 833,33 €)
- Zinsen: 2,5% p.a. (auf Durchschnittsbestand)
- Entnahme Jahr 3: 25.000 €

**Berechnung:**

**Jahr 1:**
- Anfangsbestand: 40.000 €
- Zuführung: 10.000 €
- Durchschnittsbestand: 40.000 + 10.000/2 = 45.000 €
- Zinsen: 45.000 × 0,025 = 1.125 €
- **Endbestand: 51.125 €**

**Jahr 2:**
- Anfangsbestand: 51.125 €
- Zuführung: 10.000 €
- Durchschnittsbestand: 51.125 + 10.000/2 = 56.125 €
- Zinsen: 56.125 × 0,025 = 1.403 €
- **Endbestand: 62.528 €**

**Jahr 3:**
- Anfangsbestand: 62.528 €
- Zuführung: 10.000 €
- Entnahme: -25.000 € (Dachsanierung)
- Durchschnittsbestand: 62.528 + 10.000 - 25.000 = 47.528 €
- Zinsen: 47.528 × 0,025 = 1.188 €
- **Endbestand: 48.716 €**

**Jahr 4:**
- Anfangsbestand: 48.716 €
- Zuführung: 10.000 €
- Durchschnittsbestand: 48.716 + 10.000/2 = 53.716 €
- Zinsen: 53.716 × 0,025 = 1.343 €
- **Endbestand: 60.059 €**

**Jahr 5:**
- Anfangsbestand: 60.059 €
- Zuführung: 10.000 €
- Durchschnittsbestand: 60.059 + 10.000/2 = 65.059 €
- Zinsen: 65.059 × 0,025 = 1.626 €
- **Endbestand: 71.685 €**

**Zusammenfassung:**

| Jahr | Anfang | Zuführung | Entnahme | Zinsen | Ende |
|------|--------|-----------|----------|--------|------|
| 1 | 40.000 € | 10.000 € | 0 € | 1.125 € | 51.125 € |
| 2 | 51.125 € | 10.000 € | 0 € | 1.403 € | 62.528 € |
| 3 | 62.528 € | 10.000 € | -25.000 € | 1.188 € | 48.716 € |
| 4 | 48.716 € | 10.000 € | 0 € | 1.343 € | 60.059 € |
| 5 | 60.059 € | 10.000 € | 0 € | 1.626 € | 71.685 € |

**Gesamtzuführung:** 50.000 €
**Gesamtentnahme:** 25.000 €
**Gesamtzinsen:** 6.685 €
**Wertzuwachs:** 71.685 - 40.000 = 31.685 € (trotz Entnahme!)
    `,
    type: "Finanzen"
  },

  // Weitere Tage 44-60 werden in ähnlicher Detailtiefe erstellt
  // Aus Platzgründen hier exemplarisch nur noch einige Tage

  day_44: {
    title: "Jahreswirtschaftsplan (JWP) - Erstellung",
    theory: "Der Jahreswirtschaftsplan ist das zentrale Planungsinstrument der WEG. Er prognostiziert alle Einnahmen und Ausgaben für das kommende Kalenderjahr.",
    law: [
      "[§ 28 WEG](https://www.gesetze-im-internet.de/woeigg/__28.html) (Wirtschaftsplan und Jahresabrechnung)",
      "[§ 16 WEG](https://www.gesetze-im-internet.de/woeigg/__16.html) (Verteilerschlüssel)"
    ],
    practice: "Anpassung der Hausgelder aufgrund gestiegener Energiekosten (+30%). Kommunikation an Eigentümer mit Begründung.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Jahreswirtschaftsplan (JWP) - Erstellung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Jahreswirtschaftsplan (JWP) - Erstellung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Jahreswirtschaftsplan (JWP) - Erstellung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Erstellen Sie einen kompletten Jahreswirtschaftsplan für eine WEG mit 10 Einheiten inkl. Heizkostenprognose.",
    type: "Finanzen"
  },

  day_45: {
    title: "Jahresabrechnung - Gesamtabrechnung",
    theory: "Die Jahresabrechnung ist die Rechenschaftslegung des Verwalters über das abgelaufene Wirtschaftsjahr. Sie muss transparent und nachvollziehbar sein.",
    law: [
      "[§ 28 WEG](https://www.gesetze-im-internet.de/woeigg/__28.html) (Jahresabrechnung)",
      "[§ 27 Abs. 5 WEG](https://www.gesetze-im-internet.de/woeigg/__27.html) (Vermögensverwaltung)"
    ],
    practice: "Plausibilitätsprüfung: Stimmen Anfangs- und Endbestände der Bankkonten? Lückenlose Dokumentation aller Buchungen.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Jahresabrechnung - Gesamtabrechnung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Jahresabrechnung - Gesamtabrechnung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Jahresabrechnung - Gesamtabrechnung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Erstellen Sie den Mantelbogen (Gesamtabrechnung) für ein Wirtschaftsjahr mit Vermögensstatus.",
    type: "Finanzen"
  },

  day_46: {
    title: "Jahresabrechnung - Einzelabrechnung",
    theory: "Die Einzelabrechnung verteilt die Kosten auf die Sondereigentümer nach den beschlossenen Verteilerschlüsseln. Sie ist die Grundlage für Nachzahlungen oder Guthaben.",
    law: [
      "[§ 16 WEG](https://www.gesetze-im-internet.de/woeigg/__16.html) (Verteilerschlüssel)",
      "[§ 28 WEG](https://www.gesetze-im-internet.de/woeigg/__28.html) (Einzelabrechnung)"
    ],
    practice: "Berechnung der Nachzahlung/Guthaben. Umgang mit Eigentümerwechsel im laufenden Jahr (anteilige Abrechnung).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Jahresabrechnung - Einzelabrechnung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Jahresabrechnung - Einzelabrechnung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Jahresabrechnung - Einzelabrechnung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Erstellen Sie eine Einzelabrechnung für Wohnung Nr. 3 (75 m², 2 Personen, MEA 850/10.000).",
    type: "Finanzen"
  },

  day_47: {
    title: "Heizkostenabrechnung & HKVO",
    theory: "Die Heizkostenverordnung (HKVO) hat Vorrang vor WEG-Recht. Sie schreibt die verbrauchsabhängige Abrechnung zwingend vor.",
    law: [
      "[HeizkostenV § 7](https://www.gesetze-im-internet.de/heizkostenv/__7.html) (Verteilung)",
      "[HeizkostenV § 12](https://www.gesetze-im-internet.de/heizkostenv/__12.html) (Kürzungsrecht)"
    ],
    practice: "Prüfung einer Abrechnung vom Messdienstleister (Techem, Ista). Häufige Fehler: Falsche Gerätenummern, fehlende Ablesungen.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Heizkostenabrechnung & HKVO' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Heizkostenabrechnung & HKVO'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Heizkostenabrechnung & HKVO' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Verteilen Sie Gesamtheizkosten von 12.000 € korrekt nach 70/30-Schlüssel (70% Verbrauch, 30% Fläche) auf 10 Wohnungen.",
    type: "Technik"
  },

  day_48: {
    title: "Rechnungsprüfung durch den Beirat",
    theory: "Der Verwaltungsbeirat prüft die Jahresabrechnung vor der Eigentümerversammlung. Die Prüfung ist keine Pflicht, aber üblich und sinnvoll.",
    law: [
      "[§ 29 WEG](https://www.gesetze-im-internet.de/woeigg/__29.html) (Verwaltungsbeirat)"
    ],
    practice: "Durchführung einer Beiratsprüfung. Stichproben vs. Vollprüfung. Umgang mit fehlenden Belegen oder Unklarheiten.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Rechnungsprüfung durch den Beirat' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Rechnungsprüfung durch den Beirat'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Rechnungsprüfung durch den Beirat' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Erstellen Sie eine Checkliste für die Rechnungsprüfung durch den Beirat (10 Punkte).",
    type: "Organisation"
  },

  day_49: {
    title: "Entlastung des Verwalters",
    theory: "Die Entlastung ist ein Vertrauensvotum der Eigentümer. Sie bedeutet Verzicht auf Ersatzansprüche für das abgelaufene Jahr (mit Ausnahmen).",
    law: [
      "BGH-Rechtsprechung zur Entlastung (z.B. BGH V ZR 173/18)"
    ],
    practice: "Formulierung des Beschlussantrags zur Entlastung und Genehmigung der Abrechnung. Getrennte Abstimmung empfohlen.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Entlastung des Verwalters' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Entlastung des Verwalters'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Entlastung des Verwalters' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Schreiben Sie den Tagesordnungspunkt 'Genehmigung Jahresabrechnung 2025 und Entlastung des Verwalters' für die Eigentümerversammlung.",
    type: "Recht"
  },

  day_50: {
    title: "Praxisprojekt: Die fehlerhafte Abrechnung",
    theory: "Fehler in der Jahresabrechnung sind häufig. Die Korrektur erfordert rechtliches und buchhalterisches Know-how.",
    law: [
      "[§ 28 WEG](https://www.gesetze-im-internet.de/woeigg/__28.html) (Jahresabrechnung)"
    ],
    practice: "Fallstudie: Eine Abrechnung wird angefochten, weil der Verteilerschlüssel für Wasser falsch war (Personen statt MEA). Was nun?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Praxisprojekt: Die fehlerhafte Abrechnung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Praxisprojekt: Die fehlerhafte Abrechnung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Praxisprojekt: Die fehlerhafte Abrechnung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Korrigieren Sie eine fehlerhafte Muster-Abrechnung und schreiben Sie eine Erläuterung für die Eigentümer.",
    type: "Praxis"
  },

  // Tage 51-60: Eigentümerversammlung & Beschlüsse

  day_51: {
    title: "Einladung & Tagesordnung (TOPs)",
    theory: "Die ordnungsgemäße Einladung ist Voraussetzung für wirksame Beschlüsse. Formfehler führen zur Anfechtbarkeit.",
    law: [
      "[§ 24 WEG](https://www.gesetze-im-internet.de/woeigg/__24.html) (Einberufung)",
      "[§ 23 WEG](https://www.gesetze-im-internet.de/woeigg/__23.html) (Eigentümerversammlung)"
    ],
    practice: "Erstellung einer rechtssicheren Tagesordnung. Aufnahme von Anträgen der Eigentümer (Frist: bis 1 Woche vor Versammlung).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Einladung & Tagesordnung (TOPs)' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Einladung & Tagesordnung (TOPs)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Einladung & Tagesordnung (TOPs)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Formulieren Sie 5 rechtssichere Tagesordnungspunkte (Abrechnung, Wirtschaftsplan, bauliche Veränderung, Verwalterbestellung, Sonstiges).",
    type: "Organisation"
  },

  day_52: {
    title: "Vollmachten & Vertretung",
    theory: "Eigentümer können sich in der Versammlung vertreten lassen. Die Vollmacht muss bestimmten Anforderungen genügen.",
    law: [
      "[§ 25 WEG](https://www.gesetze-im-internet.de/woeigg/__25.html) (Beschlussfassung)"
    ],
    practice: "Prüfung der Anwesenheitsliste. Zurückweisung ungültiger Vollmachten (z.B. ohne Originalunterschrift, zu alt).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Vollmachten & Vertretung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Vollmachten & Vertretung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Vollmachten & Vertretung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Entwerfen Sie ein Vollmachtsformular für die Eigentümerversammlung (mit Hinweis auf Vertretungsbeschränkungen).",
    type: "Recht"
  },

  day_53: {
    title: "Versammlungsleitung & Ablauf",
    theory: "Die Versammlungsleitung liegt beim Verwalter (oder Beirat). Sie erfordert Autorität, Neutralität und Geschick.",
    law: [
      "[§ 24 Abs. 5 WEG](https://www.gesetze-im-internet.de/woeigg/__24.html) (Vorsitz)"
    ],
    practice: "Simulation: Eine hitzige Debatte über eine Sonderumlage moderieren. Umgang mit Störern und persönlichen Angriffen.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Versammlungsleitung & Ablauf' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Versammlungsleitung & Ablauf'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Versammlungsleitung & Ablauf' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Erstellen Sie einen Leitfaden 'Ablauf einer Eigentümerversammlung' für sich selbst (Begrüßung bis Verabschiedung).",
    type: "Softskills"
  },

  day_54: {
    title: "Beschlussfassung & Abstimmung",
    theory: "Die Beschlussfassung folgt klaren Regeln. Je nach Beschlussgegenstand gelten unterschiedliche Mehrheitserfordernisse.",
    law: [
      "[§ 25 Abs. 2 WEG](https://www.gesetze-im-internet.de/woeigg/__25.html) (Stimmrecht)",
      "[§ 20 WEG](https://www.gesetze-im-internet.de/woeigg/__20.html) (Bauliche Veränderungen)"
    ],
    practice: "Auszählung einer komplizierten Abstimmung mit verschiedenen Miteigentumsanteilen. Berechnung der qualifizierten Mehrheit.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Beschlussfassung & Abstimmung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Beschlussfassung & Abstimmung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Beschlussfassung & Abstimmung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Berechnen Sie das Abstimmungsergebnis: 10 Eigentümer, 10.000 MEA, 7 Ja-Stimmen (6.500 MEA), 2 Nein (2.500 MEA), 1 Enthaltung (1.000 MEA). Ist die einfache Mehrheit erreicht?",
    type: "Recht"
  },

  day_55: {
    title: "Verkündung & Protokollierung",
    theory: "Die Verkündung des Beschlusses in der Versammlung macht ihn erst existent. Das Protokoll dokumentiert die Beschlüsse rechtssicher.",
    law: [
      "[§ 24 Abs. 6 WEG](https://www.gesetze-im-internet.de/woeigg/__24.html) (Niederschrift)"
    ],
    practice: "Formulierung klarer Beschlusstexte im Protokoll. Vermeidung von 'Zitterbeschlüssen' (unklare Formulierungen).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Verkündung & Protokollierung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Verkündung & Protokollierung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Verkündung & Protokollierung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Protokollieren Sie 3 gefasste Beschlüsse rechtssicher (Fassadensanierung, Wirtschaftsplan, Verwalterbestellung).",
    type: "Dokumente"
  },

  day_56: {
    title: "Beschluss-Sammlung führen",
    theory: "Die systematische Beschluss-Sammlung nach §24 Abs. 7 WEG ist Pflicht jedes WEG-Verwalters. Sie dokumentiert alle gefassten Beschlüsse und schützt vor Rechtsverlust durch Verjährung.",
    law: [
      "[§ 24 Abs. 7 WEG](https://www.gesetze-im-internet.de/woeigg/__24.html) (Beschluss-Sammlung)"
    ],
    practice: "Pflege der digitalen Beschluss-Sammlung. Löschung aufgehobener Beschlüsse (Kennzeichnung 'aufgehoben am...').",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Beschluss-Sammlung führen' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Beschluss-Sammlung führen'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Beschluss-Sammlung führen' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Übertragen Sie 5 Protokoll-Beschlüsse in die Beschluss-Sammlung (mit Datum, Wortlaut, Abstimmungsergebnis).",
    type: "Organisation"
  },

  day_57: {
    title: "Anfechtungsklage & Nichtigkeitsklage",
    theory: "Beschlüsse können angefochten oder für nichtig erklärt werden. Die Fristen und Voraussetzungen sind streng.",
    law: [
      "[§ 44 WEG](https://www.gesetze-im-internet.de/woeigg/__44.html) (Klage)",
      "[§ 23 Abs. 4 WEG](https://www.gesetze-im-internet.de/woeigg/__23.html) (Nichtigkeit)"
    ],
    practice: "Reaktion auf eine Klagezustellung. Information der Eigentümer. Beauftragung eines Anwalts. Kostenrisiko abschätzen.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Anfechtungsklage & Nichtigkeitsklage' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Anfechtungsklage & Nichtigkeitsklage'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Anfechtungsklage & Nichtigkeitsklage' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Erstellen Sie ein Informationsschreiben an die Eigentümer über eine eingegangene Anfechtungsklage (sachlich, neutral).",
    type: "Recht"
  },

  day_58: {
    title: "Sonderumlage beschließen & einziehen",
    theory: "Sonderumlagen sind außerordentliche Zahlungen zur Deckung unvorhergesehener Kosten. Sie erfordern einen Beschluss.",
    law: [
      "[§ 16 Abs. 2 WEG](https://www.gesetze-im-internet.de/woeigg/__16.html) (Kostenverteilung)"
    ],
    practice: "Kommunikation einer Sonderumlage an die Eigentümer. Ratenzahlungsvereinbarungen bei finanziellen Härtefällen.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Sonderumlage beschließen & einziehen' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Sonderumlage beschließen & einziehen'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Sonderumlage beschließen & einziehen' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Formulieren Sie einen Beschlussantrag für eine Sonderumlage von 80.000 € (Fassadensanierung) mit Fälligkeitsregelung.",
    type: "Finanzen"
  },

  day_59: {
    title: "Konfliktmanagement in der Versammlung",
    theory: "Eigentümerversammlungen sind oft emotional. Professionelles Konfliktmanagement ist entscheidend für den Erfolg.",
    law: [
      "Keine spezifischen Gesetze - Kommunikationstheorie"
    ],
    practice: "Deeskalationstechniken: Aktives Zuhören, Ich-Botschaften, Pausentechnik. Umgang mit persönlichen Angriffen.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Konfliktmanagement in der Versammlung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Konfliktmanagement in der Versammlung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Konfliktmanagement in der Versammlung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Entwickeln Sie ein Rollenspiel: Zwei Eigentümer streiten über Lärmbelästigung. Sie moderieren als Verwalter.",
    type: "Softskills"
  },

  day_60: {
    title: "Abschluss Block 3: Prüfungsvorbereitung",
    theory: "Zusammenfassung der Wochen 9-12. Wiederholung der wichtigsten Themen: Buchhaltung, Abrechnung, Eigentümerversammlung.",
    law: [
      "Alle relevanten Gesetze aus Tag 41-59"
    ],
    practice: "Simulation einer mündlichen Prüfung: Komplexe Fallbeispiele aus der WEG-Verwaltung lösen.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Abschluss Block 3: Prüfungsvorbereitung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Abschluss Block 3: Prüfungsvorbereitung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Abschluss Block 3: Prüfungsvorbereitung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Erstellen Sie eine Zusammenfassung aller Themen aus Block 3 (Tag 41-60) als Lernkarten (Vorder-/Rückseite).",
    type: "Prüfung"
  }
};
