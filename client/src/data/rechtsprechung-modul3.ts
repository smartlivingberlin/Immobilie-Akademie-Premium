/**
 * Rechtsprechung für Modul 3: WEG-Verwaltung
 * Echte BGH-Urteile zu Wohnungseigentumsrecht
 */

export interface CourtCase {
  id: string;
  title: string;
  court: string;
  date: string;
  reference: string;
  category: string;
  summary: string;
  facts: string;
  legalIssue: string;
  decision: string;
  practicalImplication: string;
  relatedLaws: string[];
  sourceUrl: string;
  tags: string[];
}

export const courtCasesModule3: CourtCase[] = [
  {
    id: "bgh-v-zr-236-23",
    title: "Objektbezogene Kostentrennung bei Tiefgaragen",
    court: "Bundesgerichtshof",
    date: "14.02.2025",
    reference: "V ZR 236/23",
    category: "Kostenverteilung",
    summary: "Der BGH entscheidet, dass bei vereinbarter objektbezogener Kostentrennung (z.B. Tiefgarage/Gebäude) ein sachlicher Grund erforderlich ist, um auch kostenbefreite Eigentümer an den Kosten zu beteiligen.",
    facts: "Eine WEG-Anlage verfügt über eine Tiefgarage mit 15 Stellplätzen. Die Gemeinschaftsordnung von 1971 ordnet die Nutzung der Stellplätze ausschließlich bestimmten Wohneinheiten zu und regelt, dass die Kosten für die Instandhaltung der Garagenhalle ausschließlich von diesen Einheiten zu tragen sind. Die Klägerin verfügt nicht über ein Sondernutzungsrecht an einem Stellplatz. Im April 2022 beschlossen die Wohnungseigentümer, das Dach der Garage sanieren zu lassen und die Kosten auf sämtliche Wohnungseigentümer nach Miteigentumsanteilen umzulegen.",
    legalIssue: "Kann die Wohnungseigentümergemeinschaft durch Mehrheitsbeschluss die in der Gemeinschaftsordnung vereinbarte objektbezogene Kostentrennung ändern und auch Eigentümer ohne Sondernutzungsrecht an den Sanierungskosten beteiligen?",
    decision: "Der BGH entschied, dass grundsätzlich eine Beschlusskompetenz zur Änderung der Kostenverteilung nach § 16 Abs. 2 Satz 2 WEG besteht, auch wenn dadurch Wohnungseigentümer erstmals mit Kosten belastet werden. Allerdings widerspricht es bei einer vereinbarten objektbezogenen Kostentrennung in der Regel ordnungsmäßiger Verwaltung, durch Beschluss auch die übrigen Wohnungseigentümer an den auf diesen Gebäudeteil entfallenden Kosten zu beteiligen. Es bedarf eines sachlichen Grundes für die Einbeziehung.",
    practicalImplication: "**Für WEG-Verwalter:** Bei objektbezogener Kostentrennung ist besondere Vorsicht geboten. Beschlüsse zur Änderung der Kostenverteilung müssen einen sachlichen Grund haben. Dokumentieren Sie die Gründe sorgfältig. **Für Eigentümer:** Wer von einer Kostentrennung profitiert, kann sich bei Beschlüssen zur Änderung auf diese Rechtsprechung berufen.",
    relatedLaws: [
      "§ 16 Abs. 2 Satz 2 WEG - Abweichende Kostenverteilung",
      "§ 23 WEG - Beschlussfassung",
      "§ 44 WEG - Anfechtung von Beschlüssen"
    ],
    sourceUrl: "https://www.bundesgerichtshof.de/SharedDocs/Pressemitteilungen/DE/2025/2025033.html",
    tags: ["Kostenverteilung", "Tiefgarage", "Sondernutzungsrecht", "Beschlusskompetenz"]
  },
  {
    id: "bgh-v-zr-128-23",
    title: "Änderung des Verteilungsschlüssels für Rücklagen",
    court: "Bundesgerichtshof",
    date: "14.02.2025",
    reference: "V ZR 128/23",
    category: "Kostenverteilung & Rücklagen",
    summary: "Der BGH klärt, dass die Wohnungseigentümer nach § 16 Abs. 2 Satz 2 WEG auch den Verteilungsschlüssel für die Zuführung zu Rücklagen ändern können.",
    facts: "Zu einer WEG-Anlage gehören 30 Wohnungseinheiten, Gewerbeeinheiten und 25 Garagen/Stellplätze. Die Teilungserklärung von 1984 regelt, dass Kosten nach Miteigentumsanteilen getragen werden. Der Miteigentumsanteil ist bei Wohnungen etwa viermal größer als bei Gewerbeeinheiten. 2021 wurde beschlossen, die Kosten zukünftig nach beheizbarer Wohnfläche zu verteilen.",
    legalIssue: "Können die Wohnungseigentümer durch Mehrheitsbeschluss den Verteilungsschlüssel für die Zuführung zu Rücklagen ändern?",
    decision: "Der BGH bestätigte die Rechtmäßigkeit des Beschlusses. § 16 Abs. 2 Satz 2 WEG begründet eine Kompetenz zur Änderung des Verteilungsschlüssels auch für die Zuführung zu Rücklagen. Die Änderung entspricht ordnungsmäßiger Verwaltung, wenn für die ursprüngliche Privilegierung kein sachlicher Grund bestand.",
    practicalImplication: "**Für WEG-Verwalter:** Die WEG-Reform 2020 hat die Beschlusskompetenz erweitert. Auch die Verteilung der Rücklagenzuführung kann durch Mehrheitsbeschluss geändert werden. **Für Eigentümer:** Wer sich durch einen Verteilungsschlüssel benachteiligt fühlt, kann eine Änderung durch Beschluss anstreben.",
    relatedLaws: [
      "§ 16 Abs. 2 Satz 2 WEG - Abweichende Kostenverteilung",
      "§ 19 Abs. 2 WEG - Erhaltungsrücklage",
      "§ 23 WEG - Beschlussfassung"
    ],
    sourceUrl: "https://www.bundesgerichtshof.de/SharedDocs/Pressemitteilungen/DE/2025/2025033.html",
    tags: ["Kostenverteilung", "Erhaltungsrücklage", "Miteigentumsanteile", "WEG-Reform 2020"]
  }
];
