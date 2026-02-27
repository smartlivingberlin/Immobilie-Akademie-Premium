import { QuizCase } from "@/components/AIQuizCase";

export const quizCasesModule3: QuizCase[] = [
  {
    id: "weg-case-1",
    title: "Anfechtbarkeit eines Beschlusses zur Sondernutzung",
    category: "WEG-Verwaltung",
    difficulty: "Fortgeschritten",
    scenario: "In einer WEG mit 20 Einheiten beschließt die Eigentümerversammlung am 15.03.2025 mit 18 Ja-Stimmen und 2 Enthaltungen, dass Eigentümer A ein Sondernutzungsrecht für einen Gartenteil erhält. Eigentümer B war bei der Versammlung nicht anwesend und wurde ordnungsgemäß geladen. Er erfährt am 20.03.2025 vom Beschluss und ist damit nicht einverstanden, da er selbst Interesse an diesem Gartenteil hat.",
    question: "Ist der Beschluss anfechtbar? Begründen Sie Ihre Antwort mit Bezug auf die relevanten Rechtsgrundlagen und nennen Sie die Frist für eine mögliche Anfechtung.",
    legalContext: [
      "§ 23 Abs. 4 WEG - Beschlussfassung",
      "§ 44 WEG - Anfechtung von Beschlüssen",
      "§ 45 WEG - Anfechtungsfrist",
      "§ 13 Abs. 2 WEG - Sondernutzungsrecht"
    ],
    correctAnswer: "Ja, der Beschluss ist grundsätzlich anfechtbar.\n\n**Begründung:**\n\n1. **Anfechtungsgrund (§ 44 WEG):** Ein Beschluss kann angefochten werden, wenn er gegen das Gesetz oder die Gemeinschaftsordnung verstößt. Die Einräumung eines Sondernutzungsrechts nach § 13 Abs. 2 WEG erfordert die Zustimmung aller Eigentümer, deren Rechte dadurch beeinträchtigt werden. Da Eigentümer B selbst Interesse an dem Gartenteil hat, ist er möglicherweise in seinen Rechten beeinträchtigt.\n\n2. **Anfechtungsberechtigung:** Eigentümer B ist als betroffener Eigentümer anfechtungsberechtigt nach § 44 Abs. 1 WEG.\n\n3. **Anfechtungsfrist (§ 45 WEG):** Die Anfechtungsfrist beträgt einen Monat ab Kenntnis vom Beschluss. Da Eigentümer B am 20.03.2025 vom Beschluss erfahren hat, muss er bis zum 20.04.2025 Anfechtungsklage erheben.\n\n**Fazit:** Der Beschluss ist anfechtbar, wenn Eigentümer B nachweisen kann, dass seine Rechte durch das Sondernutzungsrecht beeinträchtigt werden. Die Anfechtungsfrist läuft bis zum 20.04.2025.",
    commonMistakes: [
      "Verwechslung der Anfechtungsfrist (1 Monat) mit der Verjährungsfrist",
      "Übersehen, dass Sondernutzungsrechte die Zustimmung betroffener Eigentümer erfordern",
      "Falsche Berechnung des Fristbeginns (ab Kenntnis, nicht ab Beschlussfassung)",
      "Annahme, dass Abwesenheit bei der Versammlung die Anfechtung ausschließt"
    ],
    learningPoints: [
      "Sondernutzungsrechte nach § 13 Abs. 2 WEG erfordern die Zustimmung betroffener Eigentümer",
      "Anfechtungsfrist nach § 45 WEG beträgt 1 Monat ab Kenntnis vom Beschluss",
      "Anfechtungsberechtigt ist jeder Eigentümer, dessen Rechte durch den Beschluss beeinträchtigt werden",
      "Ordnungsgemäße Ladung schützt nicht vor Anfechtung bei materiell fehlerhaften Beschlüssen"
    ]
  },
  {
    id: "weg-case-2",
    title: "Kostenverteilung bei Instandsetzungsmaßnahme",
    category: "WEG-Verwaltung",
    difficulty: "Experte",
    scenario: "Eine WEG beschließt die Sanierung des Dachs für 50.000 €. Die Gemeinschaftsordnung sieht vor, dass Instandhaltungskosten nach Miteigentumsanteilen verteilt werden. Eigentümer C (MEA: 15/100) argumentiert, dass er im Erdgeschoss wohnt und vom neuen Dach nicht profitiert, daher sollten nur die Dachgeschoss-Eigentümer zahlen. Die Eigentümerversammlung beschließt mit einfacher Mehrheit, dass alle Eigentümer nach MEA zahlen. Eigentümer C will den Beschluss anfechten.",
    question: "Hat Eigentümer C Aussicht auf Erfolg mit seiner Anfechtungsklage? Begründen Sie Ihre Antwort unter Berücksichtigung der aktuellen BGH-Rechtsprechung zur Kostenverteilung.",
    legalContext: [
      "§ 16 Abs. 2 WEG - Kostenverteilung",
      "§ 44 WEG - Anfechtung von Beschlüssen",
      "BGH-Urteil vom 07.02.2025 (V ZR 71/23) - Kostenverteilung nach objektiven Kriterien"
    ],
    correctAnswer: "Nein, Eigentümer C hat keine Aussicht auf Erfolg.\n\n**Begründung:**\n\n1. **Gesetzliche Kostenverteilung (§ 16 Abs. 2 WEG):** Nach § 16 Abs. 2 WEG werden die Kosten für die Instandhaltung und Instandsetzung des gemeinschaftlichen Eigentums nach dem Verhältnis der Miteigentumsanteile verteilt, soweit nicht etwas anderes vereinbart ist.\n\n2. **Dach als gemeinschaftliches Eigentum:** Das Dach gehört zum gemeinschaftlichen Eigentum und dient der Erhaltung des gesamten Gebäudes, nicht nur der Dachgeschosswohnungen. Alle Eigentümer profitieren von einem intakten Dach (Werterhalt, Schutz vor Feuchtigkeit).\n\n3. **BGH-Rechtsprechung (07.02.2025):** Der BGH hat klargestellt, dass die Kostenverteilung nach objektiven Kriterien (MEA) erfolgt und nicht nach subjektivem Nutzen. Eine Abweichung ist nur möglich, wenn die Gemeinschaftsordnung dies ausdrücklich vorsieht oder alle Eigentümer zustimmen.\n\n4. **Keine Anfechtungsgrund:** Der Beschluss entspricht der gesetzlichen Regelung und der Gemeinschaftsordnung. Es liegt kein Verstoß gegen § 44 WEG vor.\n\n**Fazit:** Die Anfechtungsklage hat keine Aussicht auf Erfolg, da die Kostenverteilung nach MEA gesetzeskonform ist und dem objektiven Interesse aller Eigentümer am Werterhalt dient.",
    commonMistakes: [
      "Annahme, dass subjektiver Nutzen die Kostenverteilung bestimmt",
      "Übersehen, dass das Dach allen Eigentümern dient (Werterhalt)",
      "Verwechslung von Instandhaltung (§ 16 Abs. 2 WEG) und baulichen Veränderungen (§ 20 WEG)",
      "Fehlende Kenntnis der aktuellen BGH-Rechtsprechung zur Kostenverteilung"
    ],
    learningPoints: [
      "Kostenverteilung nach § 16 Abs. 2 WEG erfolgt nach MEA, nicht nach subjektivem Nutzen",
      "Dach ist gemeinschaftliches Eigentum und dient allen Eigentümern",
      "BGH-Rechtsprechung: Objektive Kriterien (MEA) sind maßgeblich für Kostenverteilung",
      "Abweichung von der gesetzlichen Kostenverteilung erfordert Zustimmung aller Eigentümer oder Regelung in der Gemeinschaftsordnung"
    ]
  },
  {
    id: "weg-case-3",
    title: "Beschlussfähigkeit bei fehlender Ladung",
    category: "WEG-Verwaltung",
    difficulty: "Einsteiger",
    scenario: "Eine WEG mit 10 Eigentümern lädt zu einer Eigentümerversammlung am 10.04.2025. Eigentümer D erhält keine Einladung, da der Verwalter seine neue Adresse nicht kannte. Eigentümer D hatte seine Adressänderung dem Verwalter nicht mitgeteilt. Bei der Versammlung sind 8 Eigentümer anwesend, es wird ein Beschluss zur Fassadensanierung mit 7 Ja-Stimmen gefasst. Eigentümer D erfährt später vom Beschluss und will ihn anfechten.",
    question: "Ist der Beschluss anfechtbar wegen fehlender Ladung? Welche Rolle spielt die fehlende Mitteilung der Adressänderung?",
    legalContext: [
      "§ 24 Abs. 4 WEG - Einberufung der Versammlung",
      "§ 44 WEG - Anfechtung von Beschlüssen",
      "§ 27 Abs. 3 WEG - Mitwirkungspflicht der Eigentümer"
    ],
    correctAnswer: "Ja, der Beschluss ist grundsätzlich anfechtbar, aber die Erfolgsaussichten sind eingeschränkt.\n\n**Begründung:**\n\n1. **Ladungspflicht (§ 24 Abs. 4 WEG):** Alle Eigentümer müssen ordnungsgemäß zur Versammlung geladen werden. Eine fehlende Ladung ist ein Verfahrensfehler, der zur Anfechtbarkeit führt.\n\n2. **Mitwirkungspflicht (§ 27 Abs. 3 WEG):** Eigentümer haben die Pflicht, dem Verwalter Änderungen ihrer Anschrift mitzuteilen. Eigentümer D hat diese Pflicht verletzt.\n\n3. **Rechtsprechung:** Die Rechtsprechung sieht die Mitwirkungspflicht als relevant an. Wenn ein Eigentümer seine Adressänderung nicht mitteilt, kann er sich nicht auf die fehlende Ladung berufen, wenn der Verwalter die Einladung an die letzte bekannte Adresse geschickt hat.\n\n4. **Anfechtungsrecht:** Eigentümer D kann den Beschluss anfechten, aber die Anfechtung wird wahrscheinlich keinen Erfolg haben, da er selbst die Pflichtverletzung begangen hat.\n\n**Fazit:** Der Beschluss ist formal anfechtbar, aber die Anfechtung hat geringe Erfolgsaussichten, da Eigentümer D seine Mitwirkungspflicht verletzt hat.",
    commonMistakes: [
      "Übersehen der Mitwirkungspflicht nach § 27 Abs. 3 WEG",
      "Annahme, dass jeder Verfahrensfehler automatisch zur Nichtigkeit führt",
      "Fehlende Unterscheidung zwischen Anfechtbarkeit und Erfolgsaussichten der Anfechtung"
    ],
    learningPoints: [
      "Ordnungsgemäße Ladung aller Eigentümer ist Voraussetzung für wirksame Beschlüsse",
      "Eigentümer haben Mitwirkungspflicht nach § 27 Abs. 3 WEG (Mitteilung von Adressänderungen)",
      "Verletzung der Mitwirkungspflicht kann Anfechtungsrecht einschränken",
      "Verwalter muss Einladung an letzte bekannte Adresse senden"
    ]
  }
];
