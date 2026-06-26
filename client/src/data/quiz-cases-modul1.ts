import { QuizCase } from "@/components/AIQuizCase";

export const quizCasesModule1: QuizCase[] = [
  {
    id: "modul1-case-1",
    title: "Erlaubnispflicht nach §34c GewO",
    category: "Berufsbild & Recht",
    difficulty: "Einsteiger",
    scenario: "Herr Müller möchte als Immobilienmakler tätig werden. Er plant, Wohnungen in Berlin zu vermitteln und dafür eine Provision von 2,38% (inkl. MwSt.) vom Käufer zu verlangen. Er hat bereits eine Gewerbeanmeldung beim Gewerbeamt eingereicht, aber noch keine Erlaubnis nach §34c GewO beantragt.",
    question: "Darf Herr Müller bereits als Makler tätig werden, oder benötigt er eine Erlaubnis nach §34c GewO? Begründen Sie Ihre Antwort und nennen Sie die Voraussetzungen für die Erlaubnis.",
    legalContext: [
      "§34c Abs. 1 GewO - Erlaubnispflicht für Immobilienmakler",
      "§34c Abs. 2 GewO - Versagungsgründe",
      "§15 GewO - Gewerbeuntersagung"
    ],
    correctAnswer: "Nein, Herr Müller darf noch nicht als Makler tätig werden.\n\n**Begründung:**\n\n1. **Erlaubnispflicht (§34c Abs. 1 GewO):** Wer gewerbsmäßig als Immobilienmakler tätig sein will, bedarf der behördlichen Erlaubnis. Die bloße Gewerbeanmeldung reicht nicht aus.\n\n2. **Kernvoraussetzungen für die Erlaubnis als Immobilienmakler:**\n   - **Persönliche Zuverlässigkeit:** z. B. keine schwerwiegenden Vorstrafen, keine Gewerbeuntersagung\n   - **Geordnete Vermögensverhältnisse:** keine Vermögensverhältnisse, die die Zuverlässigkeit in Frage stellen\n\n3. **Wichtige Abgrenzung:** Für die Immobilienmakler-Erlaubnis nach §34c GewO ist **kein** IHK-Sachkundenachweis erforderlich (anders als bei §34i-Darlehensvermittlern). Eine Berufshaftpflichtversicherung ist für die Makler-Erlaubnis nach §34c GewO ebenfalls **keine** pauschale Erlaubnisvoraussetzung.\n\n4. **Rechtsfolge bei Verstoß:** Tätigkeit ohne Erlaubnis ist eine Ordnungswidrigkeit (§144 Abs. 1 Nr. 1 GewO) und kann mit Bußgeld bis zu 50.000 € geahndet werden. Zudem sind Maklerverträge ohne Erlaubnis nichtig.\n\n**Fazit:** Herr Müller muss erst die Erlaubnis nach §34c GewO beantragen und erhalten, bevor er als Makler tätig werden darf.",
    commonMistakes: [
      "Verwechslung von Gewerbeanmeldung und Erlaubnis nach §34c GewO",
      "Annahme, dass man sofort nach Gewerbeanmeldung tätig werden darf",
      "Übertragung der §34i-Sachkundeanforderung fälschlich auf §34c-Makler",
      "Annahme einer pauschalen Berufshaftpflichtversicherung als Makler-Erlaubnisvoraussetzung"
    ],
    learningPoints: [
      "Erlaubnis nach §34c GewO ist zwingend erforderlich für Immobilienmakler",
      "Gewerbeanmeldung allein reicht nicht aus",
      "Kernvoraussetzungen: persönliche Zuverlässigkeit und geordnete Vermögensverhältnisse",
      "§34c-Makler: kein IHK-Sachkundenachweis — das gilt anders bei §34i"
    ]
  },
  {
    id: "modul1-case-2",
    title: "Berufsfeld und Abgrenzung: Makler vs. Verwalter",
    category: "Berufsbild & Recht",
    difficulty: "Fortgeschritten",
    scenario: "Frau Schmidt ist als Immobilienmaklerin tätig und hat die Erlaubnis nach §34c GewO. Ein Kunde fragt sie, ob sie auch die Verwaltung seiner Eigentumswohnung übernehmen kann. Frau Schmidt überlegt, ob sie diese Tätigkeit mit ihrer bestehenden Erlaubnis ausüben darf oder ob sie eine zusätzliche Erlaubnis benötigt.",
    question: "Darf Frau Schmidt mit ihrer Maklererlaubnis auch als Verwalter tätig werden? Erläutern Sie die rechtlichen Unterschiede zwischen Makler- und Verwaltertätigkeit und die jeweiligen Erlaubnisanforderungen.",
    legalContext: [
      "§34c Abs. 1 Satz 1 Nr. 1 GewO - Maklererlaubnis",
      "§34c Abs. 1 Satz 1 Nr. 3 GewO - Verwaltererlaubnis",
      "WEG - Wohnungseigentumsgesetz",
      "BGB - Mietrecht"
    ],
    correctAnswer: "Nein, Frau Schmidt darf mit ihrer Maklererlaubnis nicht als Verwalter tätig werden.\n\n**Begründung:**\n\n1. **Unterschiedliche Tätigkeitsfelder:**\n   - **Makler (§34c Abs. 1 Satz 1 Nr. 1 GewO):** Vermittlung oder Nachweis von Kauf-, Miet- oder Pachtverträgen über Grundstücke, Wohnungen oder gewerbliche Räume\n   - **Verwalter (§34c Abs. 1 Satz 1 Nr. 3 GewO):** Verwaltung von Wohnungseigentum (WEG-Verwaltung) oder Mietobjekten (Mietverwaltung)\n\n2. **Getrennte Erlaubnisse:** Die Erlaubnis nach §34c GewO ist tätigkeitsspezifisch. Eine Maklererlaubnis berechtigt nicht zur Verwaltertätigkeit und umgekehrt.\n\n3. **Zusätzliche Anforderungen für Verwalter:**\n   - Separate Sachkundeprüfung (IHK-Prüfung für WEG-Verwalter oder Mietverwalter)\n   - Höhere Berufshaftpflichtversicherung (mindestens 1 Mio. € für Personenschäden, 500.000 € für Vermögensschäden)\n   - Spezielle Kenntnisse in WEG-Recht, Mietrecht, Betriebskostenabrechnung\n\n4. **Rechtsfolge:** Frau Schmidt muss eine zusätzliche Erlaubnis nach §34c Abs. 1 Satz 1 Nr. 3 GewO beantragen, wenn sie als Verwalter tätig werden will.\n\n**Fazit:** Makler- und Verwaltertätigkeit erfordern jeweils separate Erlaubnisse nach §34c GewO. Frau Schmidt benötigt eine zusätzliche Verwaltererlaubnis.",
    commonMistakes: [
      "Annahme, dass eine Maklererlaubnis auch Verwaltertätigkeit abdeckt",
      "Verwechslung der Tätigkeitsfelder (Vermittlung vs. Verwaltung)",
      "Übersehen der unterschiedlichen Sachkundeanforderungen",
      "Fehlende Kenntnis der höheren Versicherungssummen für Verwalter"
    ],
    learningPoints: [
      "Makler- und Verwaltertätigkeit sind rechtlich getrennte Tätigkeitsfelder",
      "Jede Tätigkeit erfordert eine separate Erlaubnis nach §34c GewO",
      "Verwalter haben höhere Versicherungsanforderungen als Makler",
      "Sachkundeprüfungen sind tätigkeitsspezifisch"
    ]
  },
  {
    id: "modul1-case-3",
    title: "Berufshaftpflichtversicherung: Mindestdeckung",
    category: "Versicherung & Haftung",
    difficulty: "Experte",
    scenario: "Herr Klein möchte als Immobilienmakler tätig werden und hat bereits die Sachkundeprüfung bestanden. Bei der Beantragung der Erlaubnis nach §34c GewO wird er aufgefordert, eine Berufshaftpflichtversicherung nachzuweisen. Er findet ein günstiges Angebot mit folgenden Deckungssummen: 500.000 € für Personenschäden, 200.000 € für Sachschäden, 100.000 € für Vermögensschäden.",
    question: "Reicht diese Versicherung für die Erlaubnis nach §34c GewO aus? Nennen Sie die gesetzlich vorgeschriebenen Mindestdeckungssummen und erläutern Sie, warum höhere Deckungen sinnvoll sein können.",
    legalContext: [
      "§34c Abs. 1 Satz 4 GewO - Versicherungspflicht",
      "MaBV (Makler- und Bauträgerverordnung) §3 - Mindestdeckungssummen",
      "BGB §280 - Schadensersatzpflicht"
    ],
    correctAnswer: "Nein, diese Versicherung reicht nicht aus.\n\n**Gesetzliche Mindestdeckungssummen (§3 MaBV):**\n\n1. **Personenschäden:** Mindestens 1.000.000 € (nicht 500.000 €)\n2. **Sach- und Vermögensschäden:** Mindestens 250.000 € (nicht 200.000 € bzw. 100.000 €)\n3. **Jahreshöchstleistung:** Mindestens das Zweifache der Mindestversicherungssumme\n\n**Analyse des Angebots:**\n- Personenschäden: 500.000 € → **zu niedrig** (Mindestens 1 Mio. € erforderlich)\n- Sachschäden: 200.000 € → **zu niedrig** (Mindestens 250.000 € erforderlich)\n- Vermögensschäden: 100.000 € → **zu niedrig** (Mindestens 250.000 € erforderlich)\n\n**Warum höhere Deckungen sinnvoll sind:**\n\n1. **Schadensrisiko:** Bei Immobiliengeschäften können schnell Schäden in Millionenhöhe entstehen (z.B. fehlerhafte Beratung bei Kaufpreisverhandlungen, Versäumnis von Fristen)\n2. **Existenzsicherung:** Höhere Deckungen schützen vor finanzieller Existenzbedrohung\n3. **Marktüblich:** Viele Makler haben Deckungen von 3-5 Mio. € für Personenschäden und 1-2 Mio. € für Vermögensschäden\n4. **Vertrauensbildung:** Höhere Deckungen signalisieren Professionalität gegenüber Kunden\n\n**Fazit:** Herr Klein muss eine Versicherung mit mindestens 1 Mio. € für Personenschäden und 250.000 € für Sach-/Vermögensschäden abschließen. Empfohlen werden höhere Deckungen.",
    commonMistakes: [
      "Verwechslung der Mindestdeckungssummen für Personen- und Sachschäden",
      "Übersehen der separaten Anforderung für Vermögensschäden",
      "Annahme, dass die günstigste Versicherung ausreicht",
      "Fehlende Kenntnis der Jahreshöchstleistung"
    ],
    learningPoints: [
      "Mindestdeckung: 1 Mio. € Personenschäden, 250.000 € Sach-/Vermögensschäden",
      "Höhere Deckungen sind aus Haftungsgründen empfehlenswert",
      "Versicherungsnachweis ist Voraussetzung für Erlaubnis nach §34c GewO",
      "Jahreshöchstleistung muss mindestens das Zweifache der Mindestversicherungssumme betragen"
    ]
  }
];
