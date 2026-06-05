/**
 * Comprehensive Quiz Data for all 5 Modules
 * Multiple-Choice Questions with detailed explanations
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option (0-based)
  explanation: string;
  lawReference?: string;
  category?: string;
  difficulty?: "easy" | "medium" | "hard";
}

export interface ModuleQuiz {
  moduleId: number;
  moduleName: string;
  passingScore: number; // Percentage required to pass (e.g., 80)
  questions: QuizQuestion[];
}

export const quizData: ModuleQuiz[] = [
  // ========== MODUL 1: EINFÜHRUNG ==========
  {
    moduleId: 1,
    moduleName: "Modul 1: Einführung in die Immobilienbranche",
    passingScore: 55,
    questions: [
      {
        id: "m1-q1",
        question: "Was versteht man unter dem Begriff 'Immobilie'?",
        options: [
          "Nur Grundstücke ohne Bebauung",
          "Unbewegliche Sachen, insbesondere Grundstücke und Gebäude",
          "Nur Wohngebäude",
          "Ausschließlich gewerblich genutzte Objekte",
        ],
        correctAnswer: 1,
        explanation:
          "Immobilien sind unbewegliche Sachen im Sinne des BGB. Dazu gehören Grundstücke sowie alle fest mit dem Grund und Boden verbundenen Gebäude und Bauwerke. Der Begriff umfasst sowohl Wohn- als auch Gewerbeimmobilien.",
        lawReference: "§ 94 BGB (Wesentliche Bestandteile)",
        category: "Grundlagen",
        difficulty: "easy",
      },
      {
        id: "m1-q2",
        question: "Welche Immobilientypen gibt es NICHT?",
        options: [
          "Wohnimmobilien",
          "Gewerbeimmobilien",
          "Spezialimmobilien",
          "Virtuelle Immobilien",
        ],
        correctAnswer: 3,
        explanation:
          "Die klassische Einteilung umfasst Wohnimmobilien (z.B. Einfamilienhäuser, Wohnungen), Gewerbeimmobilien (z.B. Büros, Einzelhandel) und Spezialimmobilien (z.B. Hotels, Pflegeheime). 'Virtuelle Immobilien' ist kein anerkannter Immobilientyp im klassischen Sinne.",
        category: "Grundlagen",
        difficulty: "easy",
      },
      {
        id: "m1-q3",
        question: "Was ist der Unterschied zwischen Grundstück und Gebäude?",
        options: [
          "Es gibt keinen Unterschied",
          "Grundstück ist der Boden, Gebäude ist die Bebauung",
          "Grundstück ist größer als Gebäude",
          "Gebäude ist immer teurer als Grundstück",
        ],
        correctAnswer: 1,
        explanation:
          "Ein Grundstück ist ein abgegrenzter Teil der Erdoberfläche, der im Grundbuch eingetragen ist. Ein Gebäude ist ein Bauwerk, das fest mit dem Grundstück verbunden ist. Nach § 94 BGB sind Gebäude wesentliche Bestandteile des Grundstücks.",
        lawReference: "§ 94 BGB",
        category: "Grundlagen",
        difficulty: "medium",
      },
      {
        id: "m1-q4",
        question: "Welche Akteure sind NICHT typischerweise am Immobilienmarkt beteiligt?",
        options: [
          "Makler, Verwalter, Gutachter",
          "Käufer, Verkäufer, Mieter",
          "Banken, Notare, Bauträger",
          "Einzelhändler, Gastronomen, Friseure",
        ],
        correctAnswer: 3,
        explanation:
          "Am Immobilienmarkt sind typischerweise Makler, Verwalter, Gutachter, Käufer, Verkäufer, Mieter, Vermieter, Banken, Notare und Bauträger beteiligt. Einzelhändler, Gastronomen und Friseure sind zwar möglicherweise Mieter von Gewerbeimmobilien, aber keine typischen Marktakteure im engeren Sinne.",
        category: "Marktakteure",
        difficulty: "easy",
      },
      {
        id: "m1-q5",
        question: "Was regelt das Grundbuch?",
        options: [
          "Die Bauvorschriften für Immobilien",
          "Die Eigentumsverhältnisse an Grundstücken",
          "Die Mietpreise in Deutschland",
          "Die Steuersätze für Immobilien",
        ],
        correctAnswer: 1,
        explanation:
          "Das Grundbuch ist ein öffentliches Register, das beim Amtsgericht geführt wird. Es dokumentiert die Eigentumsverhältnisse an Grundstücken sowie darauf lastende Rechte (z.B. Grundschulden, Wegerechte). Das Grundbuch genießt öffentlichen Glauben (§ 892 BGB).",
        lawReference: "§§ 873 ff. BGB, GBO",
        category: "Recht",
        difficulty: "medium",
      },
      {
        id: "m1-q6",
        question: "Welche Aussage über den Immobilienmarkt ist FALSCH?",
        options: [
          "Der Immobilienmarkt ist regional sehr unterschiedlich",
          "Lage ist ein entscheidender Wertfaktor",
          "Alle Immobilien haben denselben Wert pro Quadratmeter",
          "Angebot und Nachfrage beeinflussen die Preise",
        ],
        correctAnswer: 2,
        explanation:
          "Der Immobilienmarkt ist stark heterogen und regional unterschiedlich. Die Lage ('Lage, Lage, Lage') ist der wichtigste Wertfaktor. Immobilien haben sehr unterschiedliche Quadratmeterpreise je nach Lage, Zustand, Ausstattung und Marktlage. Die Aussage 'Alle Immobilien haben denselben Wert pro m²' ist daher falsch.",
        category: "Markt",
        difficulty: "easy",
      },
      {
        id: "m1-q7",
        question: "Was bedeutet 'Verkehrswert' einer Immobilie?",
        options: [
          "Der Wert der Verkehrsanbindung",
          "Der Preis, den ein Käufer tatsächlich zahlt",
          "Der Marktwert, der im gewöhnlichen Geschäftsverkehr erzielbar ist",
          "Der Wert der Parkplätze",
        ],
        correctAnswer: 2,
        explanation:
          "Der Verkehrswert (auch Marktwert) ist der Preis, der zum Wertermittlungsstichtag im gewöhnlichen Geschäftsverkehr nach den rechtlichen Gegebenheiten und tatsächlichen Eigenschaften erzielbar wäre. Er wird nach § 194 BauGB durch Gutachter ermittelt.",
        lawReference: "§ 194 BauGB",
        category: "Bewertung",
        difficulty: "medium",
      },
      {
        id: "m1-q8",
        question: "Welche Rechtsform kann KEINE Immobilien besitzen?",
        options: [
          "Natürliche Personen",
          "GmbH",
          "Vereine",
          "Alle genannten können Immobilien besitzen",
        ],
        correctAnswer: 3,
        explanation:
          "Alle genannten Rechtsformen können Immobilien besitzen: Natürliche Personen (Privatpersonen), juristische Personen des Privatrechts (GmbH, AG) und juristische Personen des öffentlichen Rechts (Vereine, Stiftungen). Die Eigentumsfähigkeit ist im BGB geregelt.",
        lawReference: "§ 903 BGB",
        category: "Recht",
        difficulty: "medium",
      },
      {
        id: "m1-q9",
        question: "Was ist eine 'Teilungserklärung'?",
        options: [
          "Die Aufteilung der Maklercourtage",
          "Die notarielle Erklärung zur Aufteilung eines Grundstücks in Wohnungseigentum",
          "Die Trennung von Ehepartnern",
          "Die Aufteilung von Betriebskosten",
        ],
        correctAnswer: 1,
        explanation:
          "Die Teilungserklärung ist eine notariell beurkundete Erklärung des Eigentümers, durch die ein Grundstück in Miteigentumsanteile aufgeteilt wird, die mit Sondereigentum an Wohnungen oder Räumen verbunden sind. Sie ist die Grundlage für Wohnungseigentum.",
        lawReference: "§ 8 WEG",
        category: "Recht",
        difficulty: "hard",
      },
      {
        id: "m1-q10",
        question: "Welche Aussage über Grundsteuern ist korrekt?",
        options: [
          "Grundsteuer wird nur beim Kauf fällig",
          "Grundsteuer ist eine jährliche Steuer auf Grundbesitz",
          "Grundsteuer zahlt nur der Mieter",
          "Grundsteuer gibt es in Deutschland nicht",
        ],
        correctAnswer: 1,
        explanation:
          "Die Grundsteuer ist eine jährliche Steuer auf den Grundbesitz (Grundstücke und Gebäude). Sie wird von den Gemeinden erhoben und ist vom Eigentümer zu zahlen. Sie kann als Betriebskosten auf Mieter umgelegt werden. Nicht zu verwechseln mit der Grunderwerbsteuer beim Kauf.",
        lawReference: "Grundsteuergesetz (GrStG)",
        category: "Steuern",
        difficulty: "medium",
      },
    ],
  },

  // ========== MODUL 2: MAKLER §34c ==========
  {
    moduleId: 2,
    moduleName: "Modul 2: Immobilienmakler nach §34c GewO",
    passingScore: 55,
    questions: [
      {
        id: "m2-q1",
        question: "Was regelt § 34c GewO?",
        options: [
          "Die Mietpreisbremse",
          "Die Erlaubnispflicht für Immobilienmakler und Darlehensvermittler",
          "Die Grunderwerbsteuer",
          "Das Wohnungseigentumsgesetz",
        ],
        correctAnswer: 1,
        explanation:
          "§ 34c GewO regelt die Erlaubnispflicht für die gewerbsmäßige Ausübung der Tätigkeiten als Immobilienmakler, Darlehensvermittler, Bauträger und Baubetreuer. Wer diese Tätigkeiten ausüben möchte, benötigt eine behördliche Erlaubnis.",
        lawReference: "§ 34c GewO",
        category: "Maklerrecht",
        difficulty: "easy",
      },
      {
        id: "m2-q2",
        question: "Seit wann gilt das Bestellerprinzip für Wohnungsmakler?",
        options: ["2015", "2018", "2020", "2022"],
        correctAnswer: 2,
        explanation:
          "Das Bestellerprinzip für Wohnungsmakler gilt seit dem 23. Dezember 2020. Es besagt, dass derjenige, der den Makler beauftragt (bestellt), auch die Provision zahlen muss. Bei Vermietung zahlt der Vermieter, bei Verkauf teilen sich Käufer und Verkäufer die Provision mindestens hälftig.",
        lawReference: "§ 656a BGB (Maklervertrag)",
        category: "Maklerrecht",
        difficulty: "medium",
      },
      {
        id: "m2-q3",
        question: "Wie hoch ist die übliche Maklercourtage beim Immobilienkauf?",
        options: [
          "1-2% des Kaufpreises",
          "3,57% bis 7,14% des Kaufpreises (je nach Bundesland)",
          "10% des Kaufpreises",
          "Festbetrag von 5.000 €",
        ],
        correctAnswer: 1,
        explanation:
          "Die Maklercourtage beim Immobilienkauf beträgt üblicherweise zwischen 3,57% und 7,14% des Kaufpreises (inkl. MwSt.), abhängig vom Bundesland. Seit 2020 muss der Käufer maximal 50% der Gesamtprovision zahlen, wenn der Verkäufer den Makler beauftragt hat.",
        lawReference: "§ 656a Abs. 1 BGB",
        category: "Courtage",
        difficulty: "medium",
      },
      {
        id: "m2-q4",
        question: "Wann entsteht der Provisionsanspruch des Maklers?",
        options: [
          "Bei Vertragsunterzeichnung",
          "Bei Besichtigung der Immobilie",
          "Beim Nachweis oder bei der Vermittlung eines Vertrages",
          "Nach Ablauf der Widerrufsfrist",
        ],
        correctAnswer: 2,
        explanation:
          "Der Provisionsanspruch des Maklers entsteht, wenn durch seine Tätigkeit ein Vertrag (Kauf, Miete) zustande kommt (Vermittlung) oder er den Vertragspartner nachweist (Nachweis). Der Vertrag muss rechtswirksam sein und nicht mehr widerrufen werden können.",
        lawReference: "§ 652 BGB",
        category: "Maklerrecht",
        difficulty: "medium",
      },
      {
        id: "m2-q5",
        question: "Was ist ein 'Alleinauftrag' beim Makler?",
        options: [
          "Der Makler darf nur eine Immobilie vermitteln",
          "Der Eigentümer beauftragt nur einen Makler und schaltet keine weiteren ein",
          "Der Makler arbeitet allein ohne Team",
          "Der Auftrag ist auf einen Monat begrenzt",
        ],
        correctAnswer: 1,
        explanation:
          "Bei einem Alleinauftrag verpflichtet sich der Eigentümer, für einen bestimmten Zeitraum nur einen Makler mit der Vermarktung zu beauftragen und keine weiteren Makler einzuschalten. Im Gegenzug verpflichtet sich der Makler zu intensiveren Vermarktungsmaßnahmen.",
        category: "Maklervertrag",
        difficulty: "medium",
      },
      {
        id: "m2-q6",
        question: "Welche Pflichten hat ein Makler gegenüber seinen Auftraggebern?",
        options: [
          "Nur die Immobilie zu zeigen",
          "Sorgfaltspflicht, Treuepflicht, Aufklärungspflicht",
          "Nur die Provision einzufordern",
          "Keine besonderen Pflichten",
        ],
        correctAnswer: 1,
        explanation:
          "Der Makler hat umfassende Pflichten: Sorgfaltspflicht (gewissenhafte Arbeit), Treuepflicht (Interessenwahrung), Aufklärungspflicht (über wesentliche Umstände), Verschwiegenheitspflicht und Rechenschaftspflicht. Verstöße können zu Schadensersatz und Provisionsverlust führen.",
        lawReference: "§§ 652, 675 BGB",
        category: "Maklerpflichten",
        difficulty: "medium",
      },
      {
        id: "m2-q7",
        question: "Was ist die 'Makler- und Bauträgerverordnung' (MaBV)?",
        options: [
          "Eine Verordnung über Bauvorschriften",
          "Eine Verordnung über die Pflichten von Maklern und Bauträgern",
          "Eine Steuerverordnung",
          "Eine Mietrechtsverordnung",
        ],
        correctAnswer: 1,
        explanation:
          "Die MaBV regelt die Pflichten von Immobilienmaklern, Darlehensvermittlern, Bauträgern und Baubetreuern. Sie enthält Vorschriften über Vermögensschäden-Haftpflichtversicherung, Werbung, Vertragsanbahnung und Informationspflichten.",
        lawReference: "MaBV",
        category: "Maklerrecht",
        difficulty: "hard",
      },
      {
        id: "m2-q8",
        question: "Welche Versicherung muss ein Makler nach MaBV abschließen?",
        options: [
          "Krankenversicherung",
          "Vermögensschaden-Haftpflichtversicherung",
          "Lebensversicherung",
          "Rechtsschutzversicherung",
        ],
        correctAnswer: 1,
        explanation:
          "Nach § 3 MaBV muss ein Makler eine Vermögensschaden-Haftpflichtversicherung mit einer Mindestdeckungssumme von 500.000 € für Personenschäden und 250.000 € für sonstige Schäden abschließen. Dies dient dem Schutz der Auftraggeber.",
        lawReference: "§ 3 MaBV",
        category: "Versicherung",
        difficulty: "medium",
      },
      {
        id: "m2-q9",
        question: "Was bedeutet 'qualifizierter Alleinauftrag'?",
        options: [
          "Der Makler hat eine besondere Qualifikation",
          "Der Eigentümer darf selbst nicht mehr verkaufen",
          "Der Eigentümer beauftragt nur einen Makler, darf aber selbst noch verkaufen",
          "Der Auftrag ist besonders teuer",
        ],
        correctAnswer: 2,
        explanation:
          "Beim qualifizierten Alleinauftrag beauftragt der Eigentümer nur einen Makler, behält sich aber das Recht vor, die Immobilie selbst zu verkaufen. Beim einfachen Alleinauftrag ist auch der Eigenverkauf ausgeschlossen. Der qualifizierte Alleinauftrag ist die häufigste Form.",
        category: "Maklervertrag",
        difficulty: "hard",
      },
      {
        id: "m2-q10",
        question: "Welche Angaben MÜSSEN in einem Immobilienexposé enthalten sein?",
        options: [
          "Nur der Preis",
          "Energieausweis-Angaben sind Pflicht",
          "Nur die Adresse",
          "Keine Pflichtangaben",
        ],
        correctAnswer: 1,
        explanation:
          "Nach EnEV/GEG müssen in kommerziellen Immobilienanzeigen bestimmte Energieausweis-Angaben gemacht werden: Art des Ausweises, Energieträger, Baujahr, Energieeffizienzklasse und Energiekennwert. Verstöße können mit Bußgeldern geahndet werden.",
        lawReference: "§ 87 GEG (Gebäudeenergiegesetz)",
        category: "Exposé",
        difficulty: "hard",
      },
    ],
  },

  // ========== MODUL 3: VERWALTUNG ==========
  {
    moduleId: 3,
    moduleName: "Modul 3: Immobilienverwaltung (WEG & Mietverwaltung)",
    passingScore: 55,
    questions: [
      {
        id: "m3-q1",
        question: "Was bedeutet 'WEG'?",
        options: [
          "Wohnungseigentumsgesetz",
          "Wohnungseigentümergemeinschaft",
          "Wohnungserwerbs-Gesetz",
          "Wohnungs-Entwicklungs-Gesellschaft",
        ],
        correctAnswer: 0,
        explanation:
          "WEG steht für 'Wohnungseigentumsgesetz'. Es regelt das Wohnungseigentum und die Rechte und Pflichten der Wohnungseigentümer. Umgangssprachlich wird auch die Wohnungseigentümergemeinschaft als 'WEG' bezeichnet.",
        lawReference: "WoEigG (Wohnungseigentumsgesetz)",
        category: "WEG-Verwaltung",
        difficulty: "easy",
      },
      {
        id: "m3-q2",
        question: "Was ist das 'Sondereigentum' in einer WEG?",
        options: [
          "Das Eigentum an der gesamten Immobilie",
          "Das ausschließliche Eigentum an einer Wohnung oder Räumen",
          "Das Eigentum am Grundstück",
          "Das Eigentum an Gemeinschaftsanlagen",
        ],
        correctAnswer: 1,
        explanation:
          "Sondereigentum ist das ausschließliche Eigentum an einer Wohnung oder an nicht zu Wohnzwecken dienenden Räumen (Teileigentum). Es ist mit einem Miteigentumsanteil am Gemeinschaftseigentum verbunden. Der Eigentümer kann über sein Sondereigentum frei verfügen.",
        lawReference: "§ 3 WEG",
        category: "WEG-Verwaltung",
        difficulty: "medium",
      },
      {
        id: "m3-q3",
        question: "Was gehört zum 'Gemeinschaftseigentum' in einer WEG?",
        options: [
          "Nur das Grundstück",
          "Nur das Treppenhaus",
          "Grundstück, tragende Wände, Dach, Fassade, Treppenhaus, Heizung",
          "Nur die Wohnungen",
        ],
        correctAnswer: 2,
        explanation:
          "Zum Gemeinschaftseigentum gehören alle Teile des Grundstücks und Gebäudes, die nicht Sondereigentum sind: Grundstück, tragende Wände, Dach, Fassade, Treppenhaus, Aufzug, Heizungsanlage, Leitungen (außerhalb der Wohnung). Alle Eigentümer sind daran gemeinschaftlich berechtigt.",
        lawReference: "§ 5 WEG",
        category: "WEG-Verwaltung",
        difficulty: "medium",
      },
      {
        id: "m3-q4",
        question: "Was ist eine 'Eigentümerversammlung'?",
        options: [
          "Ein geselliges Treffen der Eigentümer",
          "Das beschlussfassende Organ der Wohnungseigentümergemeinschaft",
          "Eine Versammlung von Mietern",
          "Ein Treffen mit dem Verwalter",
        ],
        correctAnswer: 1,
        explanation:
          "Die Eigentümerversammlung ist das oberste Beschlussorgan der WEG. Hier treffen sich alle Wohnungseigentümer, um über wichtige Angelegenheiten zu entscheiden (z.B. Jahresabrechnung, Instandhaltungsmaßnahmen, Verwalterwahl). Beschlüsse werden nach Köpfen oder Miteigentumsanteilen gefasst.",
        lawReference: "§§ 23 ff. WEG",
        category: "WEG-Verwaltung",
        difficulty: "medium",
      },
      {
        id: "m3-q5",
        question: "Was ist die 'Instandhaltungsrücklage'?",
        options: [
          "Eine Rücklage für Notfälle",
          "Eine Rücklage für zukünftige Instandhaltungs- und Instandsetzungsmaßnahmen",
          "Eine Rücklage für Versicherungen",
          "Eine Rücklage für Steuern",
        ],
        correctAnswer: 1,
        explanation:
          "Die Instandhaltungsrücklage ist eine finanzielle Rücklage der WEG für zukünftige Instandhaltungs- und Instandsetzungsmaßnahmen am Gemeinschaftseigentum (z.B. Dachsanierung, Fassadenanstrich). Jeder Eigentümer zahlt monatlich einen Betrag ein, der nach Miteigentumsanteilen berechnet wird.",
        lawReference: "§ 19 Abs. 2 Nr. 4 WEG",
        category: "WEG-Verwaltung",
        difficulty: "medium",
      },
      {
        id: "m3-q6",
        question: "Was sind 'Betriebskosten' im Mietrecht?",
        options: [
          "Die Kosten für den Betrieb eines Unternehmens",
          "Die Kosten, die dem Eigentümer durch den Betrieb der Immobilie entstehen",
          "Die Kosten für Reparaturen",
          "Die Kosten für Möbel",
        ],
        correctAnswer: 1,
        explanation:
          "Betriebskosten sind die Kosten, die dem Eigentümer durch den bestimmungsgemäßen Gebrauch der Immobilie laufend entstehen. Dazu gehören z.B. Grundsteuer, Wasser, Heizung, Müllabfuhr, Hausmeister. Sie können auf den Mieter umgelegt werden, wenn dies im Mietvertrag vereinbart ist.",
        lawReference: "§ 556 BGB, BetrKV",
        category: "Mietverwaltung",
        difficulty: "medium",
      },
      {
        id: "m3-q7",
        question: "Welche Kosten dürfen NICHT als Betriebskosten auf Mieter umgelegt werden?",
        options: [
          "Grundsteuer",
          "Wasserkosten",
          "Verwaltungskosten",
          "Heizkosten",
        ],
        correctAnswer: 2,
        explanation:
          "Verwaltungskosten (z.B. Kosten für Hausverwaltung, Bankgebühren, Porto) dürfen nicht als Betriebskosten auf Mieter umgelegt werden. Sie sind Kosten des Eigentümers. Umlagefähig sind nur die in § 2 BetrKV aufgeführten Kostenarten.",
        lawReference: "§ 2 BetrKV",
        category: "Betriebskosten",
        difficulty: "hard",
      },
      {
        id: "m3-q8",
        question: "Was ist eine 'Nebenkostenabrechnung'?",
        options: [
          "Eine Rechnung für Reparaturen",
          "Die jährliche Abrechnung der umlagefähigen Betriebskosten",
          "Eine Rechnung für Möbel",
          "Die Mietrechnung",
        ],
        correctAnswer: 1,
        explanation:
          "Die Nebenkostenabrechnung (auch Betriebskostenabrechnung) ist die jährliche Abrechnung der auf den Mieter umgelegten Betriebskosten. Der Vermieter muss sie spätestens 12 Monate nach Ende des Abrechnungszeitraums erstellen. Der Mieter hat ein Recht auf Einsicht in die Belege.",
        lawReference: "§ 556 Abs. 3 BGB",
        category: "Betriebskosten",
        difficulty: "medium",
      },
      {
        id: "m3-q9",
        question: "Was ist der Unterschied zwischen 'Instandhaltung' und 'Instandsetzung'?",
        options: [
          "Es gibt keinen Unterschied",
          "Instandhaltung = vorbeugende Maßnahmen, Instandsetzung = Reparatur von Schäden",
          "Instandsetzung ist teurer",
          "Instandhaltung ist nur für Mieter",
        ],
        correctAnswer: 1,
        explanation:
          "Instandhaltung umfasst vorbeugende Maßnahmen zur Erhaltung des ordnungsgemäßen Zustands (z.B. Wartung, Pflege). Instandsetzung bedeutet die Beseitigung von Schäden und Mängeln (z.B. Reparatur defekter Teile). Beide Begriffe sind wichtig für die Kostenabgrenzung in WEG und Mietverwaltung.",
        lawReference: "§ 555a BGB (Modernisierung)",
        category: "Instandhaltung",
        difficulty: "hard",
      },
      {
        id: "m3-q10",
        question: "Wie wird das 'Hausgeld' in einer WEG berechnet?",
        options: [
          "Alle Eigentümer zahlen denselben Betrag",
          "Nach Miteigentumsanteilen (MEA)",
          "Nach Wohnungsgröße",
          "Nach Anzahl der Personen",
        ],
        correctAnswer: 1,
        explanation:
          "Das Hausgeld wird nach Miteigentumsanteilen (MEA) berechnet. Jeder Eigentümer zahlt entsprechend seinem Anteil am Gemeinschaftseigentum. Das Hausgeld umfasst Betriebskosten, Verwaltungskosten und die Zuführung zur Instandhaltungsrücklage.",
        lawReference: "§ 16 Abs. 2 WEG",
        category: "Hausgeld",
        difficulty: "medium",
      },
    ],
  },

  // ========== MODUL 4: GUTACHTEN ==========
  {
    moduleId: 4,
    moduleName: "Modul 4: Gutachten & Sachverständigenwesen",
    passingScore: 55,
    questions: [
      {
        id: "m4-q1",
        question: "Was ist der 'Verkehrswert' einer Immobilie?",
        options: [
          "Der Wert der Verkehrsanbindung",
          "Der Marktwert, der im gewöhnlichen Geschäftsverkehr erzielbar ist",
          "Der Versicherungswert",
          "Der Beleihungswert",
        ],
        correctAnswer: 1,
        explanation:
          "Der Verkehrswert (auch Marktwert) ist der Preis, der zum Wertermittlungsstichtag im gewöhnlichen Geschäftsverkehr nach den rechtlichen Gegebenheiten und tatsächlichen Eigenschaften ohne Rücksicht auf ungewöhnliche oder persönliche Verhältnisse erzielbar wäre.",
        lawReference: "§ 194 BauGB",
        category: "Bewertung",
        difficulty: "medium",
      },
      {
        id: "m4-q2",
        question: "Welche Wertermittlungsverfahren gibt es?",
        options: [
          "Nur das Vergleichswertverfahren",
          "Vergleichswertverfahren, Ertragswertverfahren, Sachwertverfahren",
          "Nur das Ertragswertverfahren",
          "Nur das Sachwertverfahren",
        ],
        correctAnswer: 1,
        explanation:
          "Es gibt drei normierte Wertermittlungsverfahren: Vergleichswertverfahren (Vergleich mit ähnlichen Objekten), Ertragswertverfahren (kapitalisierte Erträge) und Sachwertverfahren (Herstellungskosten minus Alterswertminderung). Die Wahl hängt von der Immobilienart ab.",
        lawReference: "§§ 15-20 ImmoWertV",
        category: "Bewertung",
        difficulty: "medium",
      },
      {
        id: "m4-q3",
        question: "Für welche Immobilienart ist das Ertragswertverfahren geeignet?",
        options: [
          "Eigengenutzte Einfamilienhäuser",
          "Vermietete Mehrfamilienhäuser und Gewerbeimmobilien",
          "Unbebaute Grundstücke",
          "Denkmalgeschützte Gebäude",
        ],
        correctAnswer: 1,
        explanation:
          "Das Ertragswertverfahren wird für vermietete Immobilien angewendet, bei denen der Ertrag (Miete) im Vordergrund steht. Es eignet sich für Mehrfamilienhäuser, Gewerbeimmobilien und gemischt genutzte Objekte. Der Wert ergibt sich aus den kapitalisierten Reinerträgen.",
        lawReference: "§§ 17-20 ImmoWertV",
        category: "Ertragswertverfahren",
        difficulty: "medium",
      },
      {
        id: "m4-q4",
        question: "Was ist der 'Bodenwert'?",
        options: [
          "Der Wert des Bodenbelags",
          "Der Wert des unbebauten Grundstücks",
          "Der Wert des Kellers",
          "Der Wert der Gartenanlage",
        ],
        correctAnswer: 1,
        explanation:
          "Der Bodenwert ist der Wert des unbebauten Grundstücks. Er wird im Vergleichswertverfahren anhand von Bodenrichtwerten ermittelt. Der Bodenwert ist eine wichtige Größe im Sachwertverfahren und Ertragswertverfahren.",
        lawReference: "§ 16 ImmoWertV",
        category: "Bewertung",
        difficulty: "easy",
      },
      {
        id: "m4-q5",
        question: "Was sind 'Bodenrichtwerte'?",
        options: [
          "Durchschnittliche Ladenpreise für Grundstücke in einer Lage",
          "Vorschriften für die Bodenbeschaffenheit",
          "Werte für die Bodenqualität",
          "Steuerwerte für Grundstücke",
        ],
        correctAnswer: 0,
        explanation:
          "Bodenrichtwerte sind durchschnittliche Ladenpreise für unbebaute Grundstücke in einer bestimmten Lage. Sie werden von Gutachterausschüssen ermittelt und veröffentlicht. Sie dienen als Orientierung für die Wertermittlung und werden nach Lage, Art und Maß der Nutzung differenziert.",
        lawReference: "§ 196 BauGB",
        category: "Bodenwert",
        difficulty: "medium",
      },
      {
        id: "m4-q6",
        question: "Was ist die 'Alterswertminderung'?",
        options: [
          "Die Minderung des Werts durch das Alter des Eigentümers",
          "Die Minderung des Gebäudewerts durch Alterung und Abnutzung",
          "Die Minderung der Miete bei alten Gebäuden",
          "Die Minderung der Grundsteuer",
        ],
        correctAnswer: 1,
        explanation:
          "Die Alterswertminderung ist die Minderung des Gebäudewerts durch Alterung, Abnutzung und technische Überholung. Sie wird im Sachwertverfahren vom Gebäudesachwert abgezogen. Die Berechnung erfolgt linear über die Gesamtnutzungsdauer des Gebäudes.",
        lawReference: "§ 23 ImmoWertV",
        category: "Sachwertverfahren",
        difficulty: "medium",
      },
      {
        id: "m4-q7",
        question: "Was ist ein 'Verkehrswertgutachten'?",
        options: [
          "Ein Gutachten über die Verkehrsanbindung",
          "Ein Gutachten zur Ermittlung des Marktwerts einer Immobilie",
          "Ein Gutachten über Verkehrsunfälle",
          "Ein Gutachten über Parkplätze",
        ],
        correctAnswer: 1,
        explanation:
          "Ein Verkehrswertgutachten ist ein Gutachten zur Ermittlung des Marktwerts (Verkehrswerts) einer Immobilie. Es wird von Sachverständigen nach normierten Verfahren erstellt und dient z.B. für Erbauseinandersetzungen, Scheidungen, Zwangsversteigerungen oder Kreditvergaben.",
        lawReference: "§ 194 BauGB, ImmoWertV",
        category: "Gutachten",
        difficulty: "easy",
      },
      {
        id: "m4-q8",
        question: "Wer darf Verkehrswertgutachten erstellen?",
        options: [
          "Nur Notare",
          "Nur öffentlich bestellte und vereidigte Sachverständige",
          "Jeder, aber für Gerichte nur zertifizierte Sachverständige",
          "Nur Makler",
        ],
        correctAnswer: 2,
        explanation:
          "Grundsätzlich darf jeder Verkehrswertgutachten erstellen. Für gerichtliche Zwecke werden jedoch meist öffentlich bestellte und vereidigte Sachverständige oder zertifizierte Sachverständige (z.B. nach DIN EN ISO/IEC 17024) beauftragt. Banken akzeptieren oft nur Gutachten von anerkannten Sachverständigen.",
        category: "Sachverständige",
        difficulty: "hard",
      },
      {
        id: "m4-q9",
        question: "Was ist der Unterschied zwischen 'Verkehrswert' und 'Beleihungswert'?",
        options: [
          "Es gibt keinen Unterschied",
          "Verkehrswert = Marktwert, Beleihungswert = vorsichtig geschätzter Wert für Kreditsicherheit",
          "Beleihungswert ist immer höher",
          "Verkehrswert ist nur für Verkäufe relevant",
        ],
        correctAnswer: 1,
        explanation:
          "Der Verkehrswert ist der Marktwert, der im normalen Geschäftsverkehr erzielbar ist. Der Beleihungswert ist der Wert, den eine Bank bei der Kreditvergabe als Sicherheit ansetzt. Er liegt meist 10-20% unter dem Verkehrswert, da er vorsichtig und nachhaltig geschätzt wird.",
        lawReference: "§ 194 BauGB, § 16 PfandBG",
        category: "Bewertung",
        difficulty: "hard",
      },
      {
        id: "m4-q10",
        question: "Was ist ein 'Kurzgutachten'?",
        options: [
          "Ein Gutachten, das sehr schnell erstellt wird",
          "Ein vereinfachtes Gutachten mit weniger Detailtiefe",
          "Ein Gutachten über kurze Gebäude",
          "Ein Gutachten für kurze Zeiträume",
        ],
        correctAnswer: 1,
        explanation:
          "Ein Kurzgutachten ist ein vereinfachtes Verkehrswertgutachten mit reduziertem Umfang und weniger Detailtiefe. Es enthält die wesentlichen Wertermittlungsdaten, aber weniger Begründungen und Anlagen. Es ist günstiger und schneller zu erstellen als ein Vollgutachten.",
        category: "Gutachten",
        difficulty: "medium",
      },
    ],
  },

  // ========== MODUL 5: PRÜFUNG & §34i ==========
  {
    moduleId: 5,
    moduleName: "Modul 5: Prüfungsvorbereitung & Darlehensvermittlung §34i",
    passingScore: 55,
    questions: [
      {
        id: "m5-q1",
        question: "Was regelt § 34i GewO?",
        options: [
          "Die Immobilienmakler-Erlaubnis",
          "Die Erlaubnispflicht für Darlehensvermittler",
          "Die Grunderwerbsteuer",
          "Das Mietrecht",
        ],
        correctAnswer: 1,
        explanation:
          "§ 34i GewO regelt die Erlaubnispflicht für Darlehensvermittler, Finanzanlagenvermittler und Honorar-Finanzanlagenberater. Wer gewerbsmäßig Darlehensverträge vermittelt, benötigt eine behördliche Erlaubnis nach § 34i GewO.",
        lawReference: "§ 34i GewO",
        category: "Darlehensvermittlung",
        difficulty: "easy",
      },
      {
        id: "m5-q2",
        question: "Was ist ein 'Annuitätendarlehen'?",
        options: [
          "Ein Darlehen mit steigenden Raten",
          "Ein Darlehen mit gleichbleibenden Raten aus Zins und Tilgung",
          "Ein Darlehen ohne Zinsen",
          "Ein Darlehen nur für Immobilien",
        ],
        correctAnswer: 1,
        explanation:
          "Ein Annuitätendarlehen ist die häufigste Darlehensform bei Immobilienfinanzierungen. Die monatliche Rate (Annuität) bleibt während der Zinsbindung konstant. Sie setzt sich aus Zins und Tilgung zusammen. Mit jeder Rate sinkt der Zinsanteil und der Tilgungsanteil steigt.",
        category: "Finanzierung",
        difficulty: "medium",
      },
      {
        id: "m5-q3",
        question: "Was bedeutet 'Zinsbindung'?",
        options: [
          "Die Zinsen sind für immer festgelegt",
          "Der Zinssatz ist für einen vereinbarten Zeitraum fest",
          "Die Zinsen können jederzeit geändert werden",
          "Die Zinsen sind an die Inflation gebunden",
        ],
        correctAnswer: 1,
        explanation:
          "Die Zinsbindung ist der Zeitraum, für den der Zinssatz eines Darlehens fest vereinbart ist (z.B. 10, 15 oder 20 Jahre). Während dieser Zeit kann die Bank den Zinssatz nicht ändern. Nach Ablauf der Zinsbindung wird eine Anschlussfinanzierung benötigt.",
        category: "Finanzierung",
        difficulty: "medium",
      },
      {
        id: "m5-q4",
        question: "Was ist die 'Tilgung' bei einem Darlehen?",
        options: [
          "Die Zinszahlung",
          "Die Rückzahlung des Darlehensbetrags",
          "Die Gebühren der Bank",
          "Die Versicherungsprämie",
        ],
        correctAnswer: 1,
        explanation:
          "Die Tilgung ist die Rückzahlung des Darlehensbetrags (Kapital). Bei einem Annuitätendarlehen wird mit jeder Rate ein Teil getilgt. Die Tilgung wird in Prozent pro Jahr angegeben (z.B. 2% Anfangstilgung). Je höher die Tilgung, desto schneller ist das Darlehen abbezahlt.",
        category: "Finanzierung",
        difficulty: "easy",
      },
      {
        id: "m5-q5",
        question: "Was ist ein 'Tilgungsplan'?",
        options: [
          "Ein Plan für die Bauplanung",
          "Eine Übersicht über die Rückzahlung des Darlehens",
          "Ein Plan für die Zinszahlungen",
          "Ein Plan für die Versicherungen",
        ],
        correctAnswer: 1,
        explanation:
          "Ein Tilgungsplan ist eine tabellarische Übersicht über den Verlauf der Darlehensrückzahlung. Er zeigt für jede Rate den Zinsanteil, Tilgungsanteil und die Restschuld. Der Tilgungsplan wird von der Bank bei Vertragsabschluss erstellt und ist wichtig für die Finanzplanung.",
        category: "Finanzierung",
        difficulty: "medium",
      },
      {
        id: "m5-q6",
        question: "Was ist die 'Grundschuld'?",
        options: [
          "Eine Steuer auf Grundstücke",
          "Ein dingliches Recht zur Absicherung von Darlehen",
          "Eine Schuld des Grundstücks",
          "Eine Gebühr für das Grundbuch",
        ],
        correctAnswer: 1,
        explanation:
          "Die Grundschuld ist ein dingliches Recht, das im Grundbuch eingetragen wird. Sie dient der Bank als Sicherheit für ein Darlehen. Im Gegensatz zur Hypothek ist die Grundschuld nicht akzessorisch, d.h. sie bleibt auch nach Tilgung des Darlehens bestehen und kann für weitere Kredite genutzt werden.",
        lawReference: "§§ 1191 ff. BGB",
        category: "Finanzierung",
        difficulty: "medium",
      },
      {
        id: "m5-q7",
        question: "Was ist der 'Beleihungswert' einer Immobilie?",
        options: [
          "Der Verkehrswert",
          "Der Wert, den eine Bank als Sicherheit für ein Darlehen ansetzt",
          "Der Versicherungswert",
          "Der Kaufpreis",
        ],
        correctAnswer: 1,
        explanation:
          "Der Beleihungswert ist der Wert, den eine Bank bei der Kreditvergabe als Sicherheit ansetzt. Er wird vorsichtig und nachhaltig ermittelt und liegt meist 10-20% unter dem Verkehrswert. Die Bank finanziert in der Regel nur einen Prozentsatz des Beleihungswerts (Beleihungsgrenze).",
        lawReference: "§ 16 PfandBG",
        category: "Finanzierung",
        difficulty: "medium",
      },
      {
        id: "m5-q8",
        question: "Was bedeutet 'Sondertilgung'?",
        options: [
          "Eine besonders hohe Tilgung",
          "Eine außerplanmäßige Tilgung zusätzlich zur regulären Rate",
          "Eine Tilgung nur für Sonderfälle",
          "Eine Tilgung ohne Zinsen",
        ],
        correctAnswer: 1,
        explanation:
          "Eine Sondertilgung ist eine außerplanmäßige Tilgung zusätzlich zur regulären monatlichen Rate. Sie ermöglicht es, das Darlehen schneller zurückzuzahlen. Sondertilgungen müssen im Darlehensvertrag vereinbart werden und sind oft auf einen bestimmten Prozentsatz pro Jahr begrenzt (z.B. 5%).",
        category: "Finanzierung",
        difficulty: "medium",
      },
      {
        id: "m5-q9",
        question: "Was ist eine 'Anschlussfinanzierung'?",
        options: [
          "Die erste Finanzierung einer Immobilie",
          "Die Finanzierung nach Ablauf der Zinsbindung",
          "Eine zusätzliche Finanzierung",
          "Eine Finanzierung für Anschlüsse (Wasser, Strom)",
        ],
        correctAnswer: 1,
        explanation:
          "Eine Anschlussfinanzierung ist die Fortsetzung der Finanzierung nach Ablauf der Zinsbindung. Da das Darlehen meist noch nicht vollständig getilgt ist, muss eine neue Vereinbarung mit der Bank getroffen werden. Alternativ kann man zu einer anderen Bank wechseln (Umschuldung).",
        category: "Finanzierung",
        difficulty: "medium",
      },
      {
        id: "m5-q10",
        question: "Welche IHK-Prüfung ist für Immobiliardarlehensvermittler verpflichtend?",
        options: [
          "IHK-Sachkundeprüfung nach §34i GewO",
          "Meisterprüfung",
          "Gesellenprüfung",
          "Abitur",
        ],
        correctAnswer: 0,
        explanation:
          "Die IHK-Sachkundeprüfung nach §34i GewO ist für Immobiliardarlehensvermittler verpflichtend (§1 ImmVermV regelt Inhalt und Aufbau). Für §34c-Makler ist KEIN Sachkundenachweis erforderlich — nur Zuverlässigkeit und geordnete Vermögensverhältnisse.",
        lawReference: "§34i GewO, §1 ImmVermV",
        category: "Prüfung",
        difficulty: "easy",
      },
    ],
  },
];

/**
 * Get quiz for a specific module
 */
export function getQuizForModule(moduleId: number): ModuleQuiz | undefined {
  return quizData.find((quiz) => quiz.moduleId === moduleId);
}

/**
 * Calculate quiz score
 */
export function calculateQuizScore(
  userAnswers: number[],
  correctAnswers: number[]
): {
  score: number;
  percentage: number;
  passed: boolean;
  passingScore: number;
} {
  if (userAnswers.length !== correctAnswers.length) {
    throw new Error("Answer arrays must have the same length");
  }

  const correctCount = userAnswers.filter(
    (answer, index) => answer === correctAnswers[index]
  ).length;

  const percentage = (correctCount / correctAnswers.length) * 100;
  const passingScore = 80; // Default passing score

  return {
    score: correctCount,
    percentage: Math.round(percentage),
    passed: percentage >= passingScore,
    passingScore,
  };
}
