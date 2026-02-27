import { QuizCase } from "@/components/AIQuizCase";

export const quizCasesModule5: QuizCase[] = [
  {
    id: "modul5-case-1",
    title: "Darlehensvermittlung nach §34i GewO",
    category: "Finanzierung & §34i",
    difficulty: "Fortgeschritten",
    scenario: "Frau Weber ist Immobilienmaklerin mit Erlaubnis nach §34c GewO. Ein Kunde fragt sie, ob sie ihm bei der Finanzierung seines Immobilienkaufs helfen und einen Kontakt zu einer Bank herstellen kann. Frau Weber überlegt, ob sie diese Tätigkeit mit ihrer bestehenden Erlaubnis ausüben darf oder ob sie eine zusätzliche Erlaubnis nach §34i GewO benötigt.",
    question: "Darf Frau Weber mit ihrer Maklererlaubnis (§34c GewO) auch Darlehen vermitteln? Erläutern Sie die rechtlichen Anforderungen für Darlehensvermittlung und die Abgrenzung zu reiner Kontaktvermittlung.",
    legalContext: [
      "§34i Abs. 1 GewO - Erlaubnispflicht für Darlehensvermittler",
      "§34c GewO - Maklererlaubnis",
      "§655a BGB - Darlehensvermittlungsvertrag",
      "§491a BGB - Verbraucherdarlehensvertrag"
    ],
    correctAnswer: "Es kommt darauf an, in welchem Umfang Frau Weber tätig wird.\n\n**Unterscheidung:**\n\n1. **Erlaubnisfreie Kontaktvermittlung:**\n   - Bloße Nennung einer Bank oder eines Finanzierungsvermittlers\n   - Keine Beratung, keine Vertragsanbahnung\n   - **Keine Erlaubnis nach §34i GewO erforderlich**\n\n2. **Erlaubnispflichtige Darlehensvermittlung (§34i Abs. 1 GewO):**\n   - Vermittlung von Verbraucherdarlehensverträgen\n   - Beratung zu Finanzierungsmöglichkeiten\n   - Vergleich von Darlehensangeboten\n   - Vertragsanbahnung zwischen Kunde und Bank\n   - **Erlaubnis nach §34i GewO erforderlich**\n\n**Voraussetzungen für §34i-Erlaubnis:**\n- Zuverlässigkeit\n- Geordnete Vermögensverhältnisse\n- Sachkunde (IHK-Prüfung für Darlehensvermittler)\n- Berufshaftpflichtversicherung (mindestens 1 Mio. € für Personenschäden, 250.000 € für Vermögensschäden)\n- Eintragung im Vermittlerregister (§34i Abs. 5 GewO)\n\n**Abgrenzung zur Maklererlaubnis:**\n- §34c GewO: Vermittlung von Immobilien\n- §34i GewO: Vermittlung von Darlehen\n- **Getrennte Erlaubnisse erforderlich**\n\n**Fazit:** Wenn Frau Weber nur einen Kontakt herstellt, benötigt sie keine §34i-Erlaubnis. Sobald sie aber berät oder Darlehen vermittelt, ist eine zusätzliche Erlaubnis nach §34i GewO erforderlich.",
    commonMistakes: [
      "Annahme, dass Maklererlaubnis auch Darlehensvermittlung abdeckt",
      "Verwechslung von Kontaktvermittlung und Darlehensvermittlung",
      "Übersehen der Eintragungspflicht im Vermittlerregister",
      "Fehlende Kenntnis der separaten Sachkundeanforderungen"
    ],
    learningPoints: [
      "Darlehensvermittlung erfordert separate Erlaubnis nach §34i GewO",
      "Bloße Kontaktvermittlung ist erlaubnisfrei",
      "Eintragung im Vermittlerregister ist Pflicht für §34i-Vermittler",
      "Makler- und Darlehensvermittlungserlaubnis sind rechtlich getrennt"
    ]
  },
  {
    id: "modul5-case-2",
    title: "Widerrufsrecht bei Verbraucherdarlehen",
    category: "Finanzierung & Verbraucherschutz",
    difficulty: "Experte",
    scenario: "Herr Schneider hat am 01.03.2025 einen Immobiliendarlehensvertrag über 300.000 € mit einer Bank abgeschlossen. Am 05.03.2025 erhält er die Widerrufsbelehrung per E-Mail. Am 20.03.2025 überlegt er, ob er den Vertrag noch widerrufen kann, da er ein besseres Angebot von einer anderen Bank erhalten hat.",
    question: "Kann Herr Schneider den Darlehensvertrag noch widerrufen? Erläutern Sie die Widerrufsfrist und die Voraussetzungen für ein wirksames Widerrufsrecht bei Verbraucherdarlehensverträgen.",
    legalContext: [
      "§495 BGB - Widerrufsrecht bei Verbraucherdarlehensverträgen",
      "§356 BGB - Widerrufsfrist",
      "§492 BGB - Verbraucherdarlehensvertrag",
      "Art. 247 EGBGB - Widerrufsbelehrung"
    ],
    correctAnswer: "Ja, Herr Schneider kann den Vertrag noch widerrufen.\n\n**Begründung:**\n\n1. **Widerrufsrecht (§495 BGB):** Bei Verbraucherdarlehensverträgen hat der Verbraucher ein Widerrufsrecht von 14 Tagen.\n\n2. **Beginn der Widerrufsfrist (§356 Abs. 3 BGB):**\n   - Die Frist beginnt erst, wenn der Verbraucher eine ordnungsgemäße Widerrufsbelehrung erhalten hat\n   - Die Belehrung muss dem Verbraucher in Textform (§126b BGB) zur Verfügung gestellt werden\n   - Bei Herr Schneider: Widerrufsbelehrung am 05.03.2025 → Frist beginnt am 06.03.2025\n\n3. **Fristberechnung:**\n   - Fristbeginn: 06.03.2025\n   - Fristende: 20.03.2025 (14 Tage später)\n   - Herr Schneider will am 20.03.2025 widerrufen → **Frist läuft noch**\n\n4. **Voraussetzungen für wirksamen Widerruf:**\n   - Widerruf muss in Textform erfolgen (§126b BGB)\n   - Keine Begründung erforderlich\n   - Zugang beim Darlehensgeber innerhalb der Frist\n\n5. **Rechtsfolgen des Widerrufs:**\n   - Vertrag wird rückabgewickelt\n   - Bereits ausgezahlte Beträge müssen zurückgezahlt werden\n   - Zinsen entfallen (außer Nutzungsentschädigung nach §357a BGB)\n\n**Besonderheit:** Wenn die Widerrufsbelehrung fehlerhaft war, kann die Widerrufsfrist auf maximal 12 Monate und 14 Tage verlängert werden (§356 Abs. 3 Satz 2 BGB).\n\n**Fazit:** Herr Schneider kann den Vertrag noch bis zum 20.03.2025 widerrufen, da die 14-Tages-Frist noch läuft.",
    commonMistakes: [
      "Verwechslung des Fristbeginns (ab Vertragsschluss vs. ab Erhalt der Widerrufsbelehrung)",
      "Annahme, dass Widerruf einer Begründung bedarf",
      "Übersehen der Textformanforderung für Widerruf",
      "Fehlende Kenntnis der verlängerten Widerrufsfrist bei fehlerhafter Belehrung"
    ],
    learningPoints: [
      "Widerrufsfrist bei Verbraucherdarlehen: 14 Tage ab Erhalt der Widerrufsbelehrung",
      "Widerruf muss in Textform erfolgen (E-Mail, Brief, Fax)",
      "Fehlerhafte Widerrufsbelehrung verlängert Frist auf bis zu 12 Monate und 14 Tage",
      "Widerruf führt zur Rückabwicklung des Vertrags"
    ]
  },
  {
    id: "modul5-case-3",
    title: "IHK-Prüfung: Finanzierungsberatung",
    category: "Prüfungsvorbereitung",
    difficulty: "Fortgeschritten",
    scenario: "Ein Kunde möchte eine Eigentumswohnung für 400.000 € kaufen. Er verfügt über 80.000 € Eigenkapital und benötigt ein Darlehen von 320.000 €. Die Bank bietet ihm folgende Konditionen an: Sollzinssatz 3,5% p.a., Tilgung 2% p.a., Zinsbindung 10 Jahre. Der Kunde fragt Sie, ob diese Konditionen gut sind und wie hoch seine monatliche Rate wäre.",
    question: "Berechnen Sie die monatliche Rate und bewerten Sie die Finanzierungskonditionen. Welche Empfehlungen würden Sie dem Kunden geben?",
    legalContext: [
      "§491a BGB - Verbraucherdarlehensvertrag",
      "§492 BGB - Angaben im Darlehensvertrag",
      "§493 BGB - Effektiver Jahreszins"
    ],
    correctAnswer: "**Berechnung der monatlichen Rate:**\n\n1. **Gesamtzinssatz:** 3,5% + 2% = 5,5% p.a.\n2. **Monatliche Rate:** 320.000 € × 5,5% ÷ 12 = **1.466,67 €**\n\n**Bewertung der Konditionen:**\n\n**Positiv:**\n- Eigenkapitalquote: 20% (80.000 € / 400.000 €) → **gut**, da über 15%\n- Tilgung: 2% p.a. → **ausreichend**, aber nicht optimal\n- Zinsbindung: 10 Jahre → **solide** Planungssicherheit\n\n**Kritisch:**\n- Sollzinssatz: 3,5% p.a. → **vergleichen** mit aktuellen Marktkonditionen (Stand 2025: ca. 3,0-3,5%)\n- Tilgung: 2% ist Minimum, **höhere Tilgung empfehlenswert** (3-4% p.a.)\n- Restschuld nach 10 Jahren: ca. 240.000 € → **hohes Anschlussfinanzierungsrisiko**\n\n**Empfehlungen:**\n\n1. **Höhere Tilgung:** Erhöhung auf 3% p.a. (monatliche Rate: 1.733,33 €)\n   - Vorteil: Schnellere Entschuldung, geringere Zinskosten\n   - Restschuld nach 10 Jahren: ca. 210.000 €\n\n2. **Sondertilgungsrecht:** Vereinbarung von jährlichen Sondertilgungen (z.B. 5% der Darlehenssumme)\n   - Vorteil: Flexibilität bei Bonuszahlungen oder Erbschaften\n\n3. **Zinsvergleich:** Einholen von mindestens 2-3 weiteren Angeboten\n   - Vorteil: Sicherstellung der besten Konditionen\n\n4. **Zinsbindung:** Prüfung einer längeren Zinsbindung (15-20 Jahre)\n   - Vorteil: Schutz vor Zinserhöhungen bei Anschlussfinanzierung\n\n**Fazit:** Die Konditionen sind grundsätzlich akzeptabel, aber eine höhere Tilgung und ein Zinsvergleich sind empfehlenswert.",
    commonMistakes: [
      "Falsche Berechnung der monatlichen Rate (Verwechslung von Jahres- und Monatszins)",
      "Übersehen der Eigenkapitalquote als Bewertungskriterium",
      "Fehlende Berücksichtigung der Restschuld nach Zinsbindung",
      "Annahme, dass 2% Tilgung ausreichend ist"
    ],
    learningPoints: [
      "Monatliche Rate = Darlehenssumme × (Sollzins + Tilgung) ÷ 12",
      "Eigenkapitalquote sollte mindestens 15-20% betragen",
      "Höhere Tilgung reduziert Zinskosten und Restschuld",
      "Sondertilgungsrecht und Zinsvergleich sind wichtige Verhandlungspunkte"
    ]
  }
];
