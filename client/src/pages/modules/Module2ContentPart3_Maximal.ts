// Maximalist Content for Module 2 (Makler §34c) - Part 3 (Days 41-60)
// Focus: Spezialimmobilien, Steuern, Kapitalanlage & Digitalisierung

export const contentDataPart3Maximal: Record<string, {
  title: string;
  theory: string;
  law: string[];
  practice: string;
  task?: string;
  tasks?: Array<{type?: string; question: string; hint?: string}>;
  quiz?: Array<{question: string; options?: string[]; answer?: string; explanation?: string}>;
  type?: string;
  extendedTheory?: string;
  caseStudy?: string;
  solution?: string;
}> = {
  // --- Woche 9-10: Spezialimmobilien & Steuern (Tag 41-50) ---

  day_41: {
    title: "Steuern für Makler & Kunden (EStG)",
    theory: "Steuern steuern Investitionen. Die 'Spekulationssteuer' ist das wichtigste Thema.",
    extendedTheory: `
### Private Veräußerungsgeschäfte (§ 23 EStG)
Gewinne aus Immobilienverkauf sind steuerpflichtig, wenn zwischen Anschaffung und Verkauf weniger als **10 Jahre** liegen (Spekulationsfrist).
**Ausnahme:** Eigennutzung!
*   Im Jahr des Verkaufs und den beiden vorangegangenen Jahren selbst bewohnt -> Steuerfrei.
*   Durchgehend seit Anschaffung selbst bewohnt -> Steuerfrei.

### Grunderwerbsteuer (GrESt)
Ländersache (3,5% bis 6,5%). Fällt auf Grund & Boden + Gebäude an.
*   **Spartipp:** Bewegliche Güter (Küche, Sauna, Photovoltaik) herausrechnen!
*   **Share Deal:** Bei großen Firmen werden Anteile an der GmbH verkauft statt das Haus -> oft (noch) steuergünstiger.
    `,
    law: ["EStG § 23", "GrEStG"],
    practice: "Recherchieren Sie den aktuellen Grunderwerbsteuersatz in Ihrem Bundesland.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Steuern für Makler & Kunden (EStG)' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Steuern für Makler & Kunden (EStG)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Steuern für Makler & Kunden (EStG)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der schnelle Auszug**
Kunde kauft 2020, wohnt drin. Zieht 2022 aus (vermietet). Verkauft 2024.
**Steuer:** Ja! Keine 10 Jahre rum. Eigennutzung lag nicht "im Jahr des Verkaufs und den beiden davor" vor (2023 war vermietet).
**Lösung:** Erst wieder einziehen oder warten bis 2030.
    `,
    task: "Berechnen Sie die Spekulationssteuer: Kauf 2018 für 300k. Verkauf 2023 für 500k. Vermietet. Steuersatz 42%.",
    solution: `
Gewinn: 200.000 €.
Keine Eigennutzung, < 10 Jahre -> Steuerpflichtig.
Steuer: 200.000 * 42% = 84.000 € ans Finanzamt.
    `,
    type: "Steuern"
  },
  day_42: {
    title: "Immobilien als Kapitalanlage",
    theory: "Immobilien als Kapitalanlage bieten steuerliche Vorteile und langfristigen Vermögensaufbau. Bruttomietrendite, Nettomietrendite, AfA-Abschreibung und Leverage-Effekt sind die wichtigsten Kennzahlen.",
    extendedTheory: `
### Kennzahlen
1.  **Bruttomietrendite:** Jahreskaltmiete / Kaufpreis * 100. (Schnellcheck).
2.  **Nettomietrendite:** (Miete - Bewirtschaftung) / (Kaufpreis + Nebenkosten) * 100. (Ehrlich).
3.  **Eigenkapitalrendite:** Gewinn / Eigenkapital * 100. (Durch Leverage-Effekt oft sehr hoch!).
4.  **Cashflow:** Mieteinnahmen minus (Zins + Tilgung + Bewirtschaftung). Ist am Ende Geld übrig?

### Strategien
*   **Buy & Hold:** Kaufen und behalten (Rente).
*   **Fix & Flip:** Kaufen, sanieren, teurer verkaufen (Handel).
    `,
    law: [
        "§ 21 EStG – Einkünfte aus Vermietung und Verpachtung",
        "§ 7 EStG – Absetzung für Abnutzung (AfA)",
        "§ 23 EStG – Private Veräußerungsgeschäfte",
      ],
    practice: "Nutzen Sie einen Renditerechner (Excel).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Immobilien als Kapitalanlage' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Immobilien als Kapitalanlage'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Immobilien als Kapitalanlage' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die negative Rendite**
Miete deckt nicht die Rate. Kunde muss jeden Monat 200 € zuschießen.
**Sinnvoll?** Ja, wenn hohe Wertsteigerung erwartet wird oder zur Steueroptimierung (Verluste senken Steuerlast). Aber Risiko!
    `,
    task: "Berechnen Sie den Leverage-Effekt. EK 100k. Zins 4%. Rendite Objekt 6%.",
    solution: `
Ich leihe Geld für 4% und lege es für 6% an. Die Differenz (2%) hebelt mein Eigenkapital. Je weniger EK ich einsetze, desto höher die EK-Rendite (aber auch das Risiko).
    `,
    type: "Investment"
  },
  day_43: {
    title: "Denkmalschutz & Sanierung (AfA)",
    theory: "Der Staat saniert mit. Denkmal-AfA (§ 7i EStG) ist der Turbo.",
    extendedTheory: `
### Abschreibung (AfA)
*   **Lineare AfA:** 2% (Baujahr ab 1925) oder 2,5% (bis 1924). Seit 2023: 3% für Neubau.
*   **Denkmal-AfA:** Sanierungskosten können in 12 Jahren zu 100% abgeschrieben werden! (8 Jahre 9%, 4 Jahre 7%).
    *   Führt zu massiver Steuererstattung.
    *   Attraktiv für Gutverdiener ("Zahnarzt-Modell").

### Risiken Denkmalschutz
*   Teure Sanierung.
*   Amt redet überall mit (Fenster, Farbe, Dach).
*   Liebhaberobjekt.
    `,
    law: ["EStG § 7i (Denkmal)", "DSchG (Denkmalschutzgesetz)"],
    practice: "Suchen Sie ein Denkmalobjekt. Lesen Sie die Baubeschreibung.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Denkmalschutz & Sanierung (AfA)' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Denkmalschutz & Sanierung (AfA)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Denkmalschutz & Sanierung (AfA)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die nicht anerkannte Sanierung**
Kunde saniert erst, beantragt dann Bescheinigung.
**Recht:** Zu spät! Abstimmung mit Denkmalbehörde muss VOR Baubeginn erfolgen. Steuerbonus futsch.
    `,
    task: "Berechnen Sie den Steuervorteil: Sanierungskosten 200.000 €. Steuersatz 42%. 100% absetzbar.",
    solution: `
Über 12 Jahre mindert sich das zu versteuernde Einkommen um 200.000 €.
Steuerrückfluss gesamt: ca. 84.000 €.
Der Staat zahlt fast die Hälfte der Sanierung.
    `,
    type: "Steuern"
  },
  day_44: {
    title: "Neubau-Projekte & Bauträger",
    theory: "Verkauf vom Plan. Maklerverordnung (MaBV) beachten!",
    extendedTheory: `
### Verkauf vom Plan
Kunde kauft, was es noch nicht gibt.
*   **Zahlungsplan (MaBV):** Bauträger darf Geld nur nach Baufortschritt fordern (30% nach Grundstücksüberschreibung, 28% Rohbau, etc.).
*   **Sicherheit:** Bauträger muss Sicherheit leisten (Bürgschaft) für 5% der Summe (für Mängel).

### Rolle des Maklers
Vertrieb für Bauträger.
*   Vorteil: Viele Einheiten auf einmal (Globalvertrieb).
*   Nachteil: Haftung für Exposé-Angaben (Bauträger liefert Infos, Makler muss Plausibilität prüfen).
    `,
    law: ["MaBV § 3 (Zahlungsplan)"],
    practice: "Vergleichen Sie einen Bauträgervertrag mit einem normalen Kaufvertrag.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Neubau-Projekte & Bauträger' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Neubau-Projekte & Bauträger'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Neubau-Projekte & Bauträger' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die Bauträger-Pleite**
Bauträger geht pleite, Haus halb fertig. Käufer hat schon 90% gezahlt (Vorauskasse, verboten!).
**Folge:** Geld weg, Haus nicht fertig.
**Schutz:** MaBV-Raten strikt einhalten!
    `,
    task: "Erstellen Sie einen Zahlungsplan nach MaBV (Grobgerüst).",
    solution: `
1.  30% nach Eigentumsumschreibung.
2.  28% nach Rohbau.
3.  ...
4.  3,5% nach vollständiger Fertigstellung.
    `,
    type: "Neubau"
  },
  day_45: {
    title: "Erbbaurecht",
    theory: "Bauen auf fremdem Boden. Günstiger Einstieg, aber Tücken.",
    extendedTheory: `
### Konzept
Grundstück gehört der Kirche/Gemeinde/Stiftung. Ich kaufe nur das Haus und pachte den Boden (Erbbauzins).
*   Laufzeit: Meist 99 Jahre.
*   Erbbauzins: Ca. 3-5% des Bodenwerts p.a.

### Heimfall
Wenn der Pächter nicht zahlt oder das Haus verkommen lässt, fällt das Grundstück zurück an den Eigentümer.

### Finanzierung
Banken finanzieren ungern, wenn Restlaufzeit kurz ist. (Tilgung muss 10 Jahre vor Ablauf fertig sein).
    `,
    law: ["ErbbauRG"],
    practice: "Berechnen Sie: Bodenwert 200.000 €. Zins 4%. Monatliche Belastung?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Erbbaurecht' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Erbbaurecht'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Erbbaurecht' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Das unverkäufliche Erbpacht-Haus**
Restlaufzeit 20 Jahre.
**Problem:** Käufer kriegt keinen Kredit.
**Lösung:** Verlängerung des Erbbaurechts VOR Verkauf verhandeln.
    `,
    task: "Argumentieren Sie: Für wen lohnt sich Erbbaurecht?",
    solution: `
Für Familien mit wenig Eigenkapital (müssen Grundstück nicht kaufen).
Nachteil: Monatliche Belastung bleibt ewig ("zweite Miete").
    `,
    type: "Spezial"
  },
  day_46: {
    title: "Landwirtschaftliche Flächen",
    theory: "Landwirtschaftliche Flächen unterliegen dem Landwirtschaftsrecht mit Vorkaufsrechten und behördlichen Genehmigungspflichten. §9 GrdstVG und landesspezifische Regelungen schränken die freie Veräußerung ein.",
    extendedTheory: `
### Grundstückverkehrsgesetz (GrdstVG)
Verkauf von Landwirtschaftsflächen (> 1 Hektar, je nach Land) muss genehmigt werden.
*   **Ziel:** Land soll bei Bauern bleiben ("Bauerland in Bauerhand").
*   **Vorkaufsrecht:** Wenn ein Nicht-Landwirt kauft, kann ein Landwirt in den Vertrag eintreten (Siedlungsgesellschaft).

### Pacht
Land wird meist gepachtet, nicht verkauft. Pachtpreise sehr niedrig.
    `,
    law: ["GrdstVG"],
    practice: "Was kostet 1qm Ackerland in Ihrer Region? (Bodenrichtwert).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Landwirtschaftliche Flächen' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Landwirtschaftliche Flächen'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Landwirtschaftliche Flächen' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der Pferdeliebhaber**
Anwalt will Wiese für Pferde kaufen. Landwirt meldet Bedarf an.
**Folge:** Anwalt kriegt Genehmigung nicht. Landwirt kriegt die Wiese zum vereinbarten Preis.
    `,
    task: "Erklären Sie 'Bauerwartungsland' vs. 'Rohbauland'.",
    solution: `
*   **Bauerwartungsland:** FNP sagt Wohnen, aber noch kein B-Plan. Spekulation!
*   **Rohbauland:** B-Plan ist da, aber noch nicht erschlossen (keine Straße).
*   **Baureifes Land:** Sofort bebaubar.
    `,
    type: "Spezial"
  },
  day_47: {
    title: "Zwangsversteigerung (ZVG)",
    theory: "Die Zwangsversteigerung nach ZVG bietet Chancen und Risiken. Versteigerungstermine, Mindestgebote, 5/10-Grenze, Wohnrecht und Übernahme von Altlasten müssen Makler und Bieter kennen.",
    extendedTheory: `
### Ablauf
1.  **Verkehrswertgutachten:** Vom Gericht bestellt. (Oft ohne Innenbesichtigung!).
2.  **Termin:** Bietstunde (30 min).
3.  **Zuschlag:** Eigentum geht SOFORT über (nicht erst im Grundbuch).

### Grenzen
*   **5/10 Grenze:** Unter 50% Verkehrswert -> Zuschlag von Amts wegen versagt.
*   **7/10 Grenze:** Unter 70% -> Gläubiger kann Zuschlag versagen.

### Maklerchance
Makler dürfen bei ZVG nicht vermitteln (keine Provision vom Gericht). Aber: Beratungshonorar vom Käufer oder "Abwendung der ZVG" (freihändiger Verkauf vor Termin).
    `,
    law: ["ZVG"],
    practice: "Besuchen Sie www.zvg-portal.de. Suchen Sie einen Termin.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Zwangsversteigerung (ZVG)' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Zwangsversteigerung (ZVG)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Zwangsversteigerung (ZVG)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die "Katze im Sack"**
Käufer ersteigert Haus. Innen total verwüstet (Mietnomaden).
**Risiko:** Keine Gewährleistung! Gekauft wie (nicht) gesehen.
    `,
    task: "Erstellen Sie einen Flyer für Schuldner: 'ZVG verhindern - Notverkauf managen'.",
    solution: `
"Droht die Zwangsversteigerung? Wir verkaufen freihändig zum Marktpreis (meist höher als Versteigerungserlös) und reden mit der Bank."
    `,
    type: "Spezial"
  },
  day_48: {
    title: "Leibrente & Immobilienverrentung",
    theory: "Trendthema für Senioren. Haus verkaufen, wohnen bleiben.",
    extendedTheory: `
### Modelle
1.  **Leibrente:** Verkauf gegen lebenslange Rente + Wohnrecht. (Wette auf den Tod).
2.  **Nießbrauch:** Verkauf, voller Preis (abzüglich Wert des Nießbrauchs), lebenslanges Wohnrecht. Verkäufer bleibt "wirtschaftlicher Eigentümer" (vermietet evtl. weiter).
3.  **Rückmietverkauf:** Verkauf und normaler Mietvertrag.

### Bewertung
Wert des Wohnrechts = Jahresmiete x Faktor (Sterbetabelle).
Kaufpreis = Verkehrswert - Wert Wohnrecht.
    `,
    law: ["BGB (Leibrente, Nießbrauch)"],
    practice: "Berechnen Sie den Wert eines lebenslangen Wohnrechts für eine 75-jährige Frau (Faktor 10). Miete 1.000 €.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Leibrente & Immobilienverrentung' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Leibrente & Immobilienverrentung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Leibrente & Immobilienverrentung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die "zu gesunde" Oma**
Käufer zahlt Rente. Oma wird 105. Käufer zahlt drauf.
**Risiko:** Langlebigkeitsrisiko.
    `,
    task: "Erstellen Sie eine Zielgruppenanalyse für Immobilienverrentung.",
    solution: `
*   Alter 70+.
*   Immobilie schuldenfrei.
*   Rente reicht nicht oder Erben sollen nichts kriegen ("Enkelreise").
*   Wollen im gewohnten Umfeld bleiben.
    `,
    type: "Spezial"
  },
  day_49: {
    title: "Ferienimmobilien",
    theory: "Ferienimmobilien unterliegen besonderen Regelungen. Zweckentfremdungsverbote, Betreiberkonzepte, Finanzierungsbeschränkungen und steuerliche Besonderheiten machen dieses Segment komplex.",
    extendedTheory: `
### Lage, Lage, Lage
Erste Reihe Meerblick vs. Hinterland. Auslastung ist alles.

### Betreibermodelle
Käufer kauft Appartment in Hotelanlage. Betreiber kümmert sich um alles. Rendite garantiert? (Vorsicht!).

### Steuer
Bei Vermietung ("Gewinnerzielungsabsicht") kann man Werbungskosten absetzen. Bei reiner Eigennutzung ("Liebhaberei") nicht.
    `,
    law: [
        "§ 651a BGB – Pauschalreisevertrag",
        "§ 34c GewO – Immobilienmakler, Darlehensvermittler",
        "§ 12 UStG – Steuersätze",
      ],
    practice: "Recherchieren Sie die Auslastungsquoten auf Sylt vs. Bayerischer Wald.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Ferienimmobilien' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Ferienimmobilien'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Ferienimmobilien' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Das Corona-Verbot**
Beherbergungsverbot. Ferienwohnung leer. Kredit läuft weiter.
**Risiko:** Klumpenrisiko.
    `,
    task: "Berechnen Sie den Break-Even: Fixkosten 10.000 €/Jahr. Miete 100 €/Nacht. Variable Kosten 20 €/Nacht.",
    solution: `
Deckungsbeitrag: 80 €/Nacht.
10.000 / 80 = 125 Nächte Mindestbelegung.
    `,
    type: "Spezial"
  },
  day_50: {
    title: "Internationaler Markt",
    theory: "Der internationale Immobilienmarkt bietet Diversifikationsmöglichkeiten. Rechtsunterschiede, Währungsrisiken, steuerliche Behandlung und die Bedeutung lokaler Expertise sind entscheidende Faktoren.",
    extendedTheory: `
### Rechtssysteme
*   **Spanien:** Privater Kaufvertrag bindend. Notar nur für Register.
*   **USA:** Title Company statt Notar. MLS-System.
*   **Dubai:** Steuerfrei, aber Rechtsunsicherheit?

### Kooperationen
Makler in DE vermittelt an Partner vor Ort. Provisionsteilung (Referral Fee).
    `,
    law: ["IPR (Internationales Privatrecht)"],
    practice: "Suchen Sie eine Immobilie in Palma de Mallorca. Vergleichen Sie die Courtage (dort oft vom Verkäufer gezahlt!).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Internationaler Markt' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Internationaler Markt'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Internationaler Markt' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der illegale Anbau in Spanien**
Käufer kauft Finca. Pool ist illegal. Abrissverfügung.
**Lehre:** Anwalt vor Ort zwingend!
    `,
    task: "Erstellen Sie ein Partnerprofil: Was erwarten Sie von einem Kooperationspartner im Ausland?",
    solution: `
*   Spricht Deutsch/Englisch.
*   Lizenz vor Ort.
*   Haftpflichtversicherung.
*   Referenzen.
    `,
    type: "International"
  },

  // --- Woche 11-12: Digitalisierung & Abschlussprüfung (Tag 51-60) ---

  day_51: {
    title: "PropTech & KI im Maklerbüro",
    theory: "Die Zukunft ist digital. Wer nicht automatisiert, verliert.",
    extendedTheory: `
### Tools
1.  **Virtuelle Besichtigung (Matterport):** 3D-Scan. Filtert Besichtigungstouristen ("Das Bad ist mir zu klein" sieht man schon online).
2.  **Drohnen:** Luftbilder.
3.  **KI (ChatGPT):** Exposé-Texte schreiben, E-Mails beantworten.
4.  **Digitale Signatur (DocuSign):** Maklervertrag am Handy unterschreiben.

### Disruption
Werden Makler durch Algorithmen ersetzt? (McMakler, Homeday).
-> Hybrid-Modell: Technik + Menschliche Empathie gewinnt.
    `,
    law: [
        "Art. 13 DSGVO – Informationspflichten",
        "Art. 22 DSGVO – Automatisierte Entscheidungen",
        "§ 147 GewO – Ordnungswidrigkeiten",
      ],
    practice: "Lassen Sie ChatGPT einen Exposé-Text für eine 'Bruchbude' schreiben, der positiv klingt.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'PropTech & KI im Maklerbüro' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'PropTech & KI im Maklerbüro'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'PropTech & KI im Maklerbüro' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die reine Online-Bewertung**
Kunde vertraut Algorithmus, verkauft zu billig an Aufkäufer.
**Makler-Mehrwert:** "Ich sehe das Potenzial, das der Algorithmus nicht sieht."
    `,
    task: "Erstellen Sie eine Digital-Strategie für Ihr Büro.",
    solution: `
*   Papierloses Büro.
*   Online-Terminbuchung (Calendly).
*   Auto-Responder.
*   Social Media Ads.
    `,
    type: "Digital"
  },
  day_52: {
    title: "Konfliktmanagement & Mediation",
    theory: "Konfliktmanagement ist tägliche Praxis im Maklerbüro. Käufer-Verkäufer-Konflikte, Nachbarschaftsstreitigkeiten und Provisionsstreitigkeiten erfordern Deeskalationstechniken und manchmal professionelle Mediation.",
    extendedTheory: `
### Der Makler als Mediator
Oft sind Emotionen das Hindernis, nicht der Preis.
*   **Scheidung:** Er will schnell Geld, sie will wohnen bleiben.
*   **Erben:** Neid und alte Wunden.

### Techniken
*   Aktives Zuhören.
*   Allparteilichkeit (Neutralität).
*   Interessen statt Positionen ("Warum wollen Sie das?").
    `,
    law: [
        "§ 278 BGB – Verantwortlichkeit des Schuldners für Dritte",
        "§ 254 BGB – Mitverschulden",
        "§ 19 MediationsG – Verschwiegenheitspflicht",
      ],
    practice: "Rollenspiel: Scheidungspaar. Sie vermitteln.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Konfliktmanagement & Mediation' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Konfliktmanagement & Mediation'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Konfliktmanagement & Mediation' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der Rosenkrieg**
Mann sabotiert Besichtigungen (läuft in Unterhose rum).
**Lösung:** Klare Regeln. Besichtigung nur wenn er weg ist.
    `,
    task: "Formulieren Sie 3 deeskalierende Sätze.",
    solution: `
1.  "Ich verstehe, dass das eine schwierige Situation für Sie ist."
2.  "Lassen Sie uns auf das gemeinsame Ziel konzentrieren: Den besten Preis erzielen."
3.  "Was brauchen Sie, um dem Verkauf zuzustimmen?"
    `,
    type: "Softskills"
  },
  day_53: {
    title: "Selbstmanagement & Zeitmanagement",
    theory: "Selbstmanagement und Zeitmanagement entscheiden über nachhaltigen Maklererfolg. Eisenhower-Matrix, CRM-gestützte Wiedervorlage, Work-Life-Balance und Anti-Burnout-Strategien sind überlebenswichtig.",
    extendedTheory: `
### Zeitfresser
*   Unqualifizierte Anrufe.
*   Fahrzeiten.
*   Verwaltungskram.

### Methoden
*   **Eisenhower-Matrix:** Wichtig vs. Dringend.
*   **Time-Boxing:** Feste Slots für Akquise (10-12 Uhr).
*   **Pareto (80/20):** 20% der Kunden bringen 80% des Umsatzes. Fokus!

### Burnout-Prävention
Erreichbarkeit regeln. "Am Wochenende nur Notfälle".
    `,
    law: [
        "§ 34c GewO – Maklererlaubnis",
        "§ 34c MaBV – Mindestanforderungen",
        "§ 15b MaBV – Weiterbildungspflicht",
      ],
    practice: "Analysieren Sie Ihren Tag. Wo haben Sie Zeit verschwendet?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Selbstmanagement & Zeitmanagement' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Selbstmanagement & Zeitmanagement'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Selbstmanagement & Zeitmanagement' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der "Mädchen für alles"-Makler**
Mäht Rasen vor Besichtigung, putzt Fenster.
**Fehler:** Delegieren! Gärtner/Reinigungskraft ist billiger als Maklerstunde.
    `,
    task: "Erstellen Sie einen idealen Wochenplan.",
    solution: `
Mo: Admin & Meeting.
Di-Do: Akquise & Besichtigungen (gebündelt).
Fr: Notartermine & Nachbereitung.
Sa: Nur auf Termin.
So: Frei.
    `,
    type: "Softskills"
  },
  day_54: {
    title: "Business-Knigge & Etikette",
    theory: "Professionelles Auftreten schafft Vertrauen. Business-Knigge für Besichtigungen, Notartermine, Netzwerkveranstaltungen und die digitale Etikette bei E-Mail und Social Media sind messbar erfolgswirksam.",
    extendedTheory: `
### Auftreten
*   Kleidung: Dem Kunden angepasst (Anzug bei Bankern, Casual bei jungen Familien). Sauber!
*   Auto: Sauber. Nicht zu protzig (Neid), nicht zu schrottig (Misserfolg).
*   Pünktlichkeit: 5 min vor der Zeit ist des Maklers Pünktlichkeit.

### Kommunikation
*   Siezen vs. Duzen. (Im Zweifel Sie).
*   Handschlag (fest).
*   Visitenkarte übergeben.
    `,
    law: [
        "§ 241 BGB – Pflichten aus dem Schuldverhältnis",
        "§ 311 BGB – Vorvertragliche Pflichten",
        "§ 5 MaBV – Informationspflichten",
      ],
    practice: "Wie begrüßen Sie eine Gruppe (Ehepaar + Eltern)? (Erst die Damen, dann die Älteren).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Business-Knigge & Etikette' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Business-Knigge & Etikette'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Business-Knigge & Etikette' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der schwitzende Makler**
Kommt abgehetzt, riecht nach Rauch.
**Wirkung:** Unprofessionell. Kunde kauft nicht.
    `,
    task: "Erstellen Sie einen Dresscode-Guide für Mitarbeiter.",
    solution: `
Herren: Hemd, Sakko, gepflegte Schuhe.
Damen: Business-Casual.
No-Go: Kurze Hosen, Flip-Flops, tiefer Ausschnitt.
    `,
    type: "Softskills"
  },
  day_55: {
    title: "Wiederholung: Recht & Verträge",
    theory: "Vorbereitung auf den Abschlusstest. Die wichtigsten Fallen.",
    extendedTheory: `
### Top-Themen
1.  Widerrufsrecht (Belehrung vergessen = Provision weg).
2.  Formvorschriften (Wohnungskauf schriftlich!).
3.  GwG (Identifizierung vergessen).
4.  Wettbewerbsrecht (Impressum).
5.  Bestellerprinzip (Wohnraummiete).
    `,
    law: [
        "§ 652 BGB – Maklerlohn",
        "§ 311b BGB – Grundstückskaufvertrag",
        "§ 34c GewO – Maklerpflichten",
        "§ 2 Abs. 1 MaBV – Erlaubnispflicht",
      ],
    practice: "Lösen Sie 10 Multiple-Choice-Fragen zum Recht.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Wiederholung: Recht & Verträge' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Wiederholung: Recht & Verträge'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Wiederholung: Recht & Verträge' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: "Zusammenfassung diverser Fälle.",
    task: "Erstellen Sie Spickzettel für die Paragraphen.",
    solution: "§ 34c GewO, § 652 BGB, § 355 BGB, MaBV.",
    type: "Repetition"
  },
  day_56: {
    title: "Wiederholung: Bewertung & Technik",
    theory: "Systematische Wiederholung der Bewertungsverfahren: Vergleichswert, Sachwert, Ertragswert nach ImmoWertV 2021 — mit Prüfungsaufgaben im IHK-Format zur Vorbereitung auf die Sachkundeprüfung.",
    extendedTheory: `
### Formeln
*   Ertragswert.
*   Sachwert.
*   Wohnfläche.
*   Rendite.

### Mängel
*   Asbest erkennen.
*   Feuchtigkeit messen.
    `,
    law: [
        "§ 194 BauGB – Verkehrswertdefinition",
        "ImmoWertV 2021 – Immobilienwertermittlungsverordnung",
        "§ 16 MaBV – Buchführungspflichten",
      ],
    practice: "Bewerten Sie ein fiktives Objekt in 30 Minuten komplett.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Wiederholung: Bewertung & Technik' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Wiederholung: Bewertung & Technik'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Wiederholung: Bewertung & Technik' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: "Bewertungsgutachten prüfen.",
    task: "Fehlersuche in einem falschen Gutachten.",
    solution: "Falscher Bodenwert, falsche Restnutzungsdauer.",
    type: "Repetition"
  },
  day_57: {
    title: "Wiederholung: Marketing & Vertrieb",
    theory: "Marketingstrategien im Überblick: Farming, Social Media, Referral Marketing, Online-Portale und persönliches Netzwerk — mit Prüfungsfragen zur Vertiefung und Wiederholung.",
    extendedTheory: `
### Einwandbehandlung
*   "Zu teuer" -> Nutzen argumentieren.
*   "Keine Provision" -> Leistung argumentieren.

### Exposé
*   Headline sitzt?
*   Bilder top?
    `,
    law: [
        "§ 655a BGB – Darlehensvermittlungsvertrag",
        "§ 6 TMG – Kommerzielle Kommunikation",
        "§ 5a UWG – Irreführung durch Unterlassen",
      ],
    practice: "Verkaufsgespräch simulieren (Video aufnehmen).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Wiederholung: Marketing & Vertrieb' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Wiederholung: Marketing & Vertrieb'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Wiederholung: Marketing & Vertrieb' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: "Exposé-Optimierung.",
    task: "Verbessern Sie ein schlechtes Exposé.",
    solution: "Bessere Bilder, emotionalerer Text.",
    type: "Repetition"
  },
  day_58: {
    title: "Abschlussprüfung Simulation (Teil 1)",
    theory: "Abschlussprüfungssimulation Teil 1: Recht und Verträge. 30 IHK-typische Fragen zu §34c GewO, BGB-Maklerrecht, GwG, DSGVO und Verbraucherschutz — unter Prüfungsbedingungen.",
    extendedTheory: `
50 Fragen Multiple Choice.
Zeit: 60 Minuten.
Themen: Recht, Bewertung, Marketing.
    `,
    law: [
        "§ 34c GewO – Gewerbliche Immobilienvermittlung",
        "§ 652 BGB – Maklerlohn",
        "§ 311b BGB – Grundstückskaufvertrag",
        "MaBV – Makler- und Bauträgerverordnung",
      ],
    practice: "Führen Sie den Test durch (ohne Hilfsmittel).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Abschlussprüfung Simulation (Teil 1)' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Abschlussprüfung Simulation (Teil 1)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Abschlussprüfung Simulation (Teil 1)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: "Prüfungsmodus.",
    task: "Korrigieren Sie sich selbst.",
    solution: "Lösungsschlüssel.",
    type: "Prüfung"
  },
  day_59: {
    title: "Abschlussprüfung Simulation (Teil 2)",
    theory: "Abschlussprüfungssimulation Teil 2: Bewertung und Praxis. 30 IHK-typische Fragen zu Wertermittlung, Grundbuch, Baurecht, Vermarktung und Verhandlungsführung — unter Prüfungsbedingungen.",
    extendedTheory: `
Erstellung eines Exposés und einer Bewertung für ein gegebenes Objekt.
    `,
    law: [
        "§ 14 GwG – Sorgfaltspflichten",
        "§ 2 GwG – Verpflichtete nach GwG",
        "§ 656a BGB – Maklervertrag bei Wohnungen",
        "§ 656c BGB – Lohnanspruch bei Tätigkeit für beide Parteien",
      ],
    practice: "Erstellen Sie das Exposé.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Abschlussprüfung Simulation (Teil 2)' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Abschlussprüfung Simulation (Teil 2)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Abschlussprüfung Simulation (Teil 2)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: "Praxisaufgabe.",
    task: "Bewerten Sie das Objekt.",
    solution: "Musterlösung.",
    type: "Prüfung"
  },
  day_60: {
    title: "Zertifikat & Start in die Praxis",
    theory: "Abschluss und Ausblick: Sie haben das komplette Handwerkszeug für die Maklertätigkeit erworben. §34c-Erlaubnis, IHK-Sachkunde, Weiterbildungspflicht nach §15b MaBV und nächste Karriereschritte.",
    extendedTheory: `
### Die ersten 100 Tage
1.  Gewerbe anmelden (§34c liegt vor?).
2.  Büro einrichten.
3.  Farmgebiet definieren.
4.  Erste Akquise-Briefe raus.
5.  Netzwerken!

### Lebenslanges Lernen
Der Markt ändert sich. Bleiben Sie dran (20h Weiterbildung!).
    `,
    law: [
        "§ 34c GewO – Erlaubnispflicht Immobilienmakler",
        "§ 15b MaBV – Weiterbildungspflicht (20 Std/3 Jahre)",
        "§ 34d GewO – Versicherungsvermittler (Abgrenzung)",
      ],
    practice: "Feiern Sie Ihren Erfolg!",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Zertifikat & Start in die Praxis' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Zertifikat & Start in die Praxis'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Zertifikat & Start in die Praxis' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: "Ihr Businessplan.",
    task: "Setzen Sie sich Umsatzziele für Jahr 1.",
    solution: "Realistisch: 3-5 Verkäufe im ersten Jahr.",
    type: "Abschluss"
  }
};
