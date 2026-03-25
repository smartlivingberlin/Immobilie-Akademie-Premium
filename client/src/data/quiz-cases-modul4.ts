import { QuizCase } from "@/components/AIQuizCase";

export const quizCasesModule4: QuizCase[] = [
  {
    id: "modul4-case-1",
    title: "Vergleichswertverfahren — Anpassung von Vergleichsobjekten",
    category: "Wertermittlung",
    difficulty: "Fortgeschritten",
    scenario: "Ein Gutachter soll den Verkehrswert einer 85 m² Eigentumswohnung in Berlin-Friedrichshain ermitteln. Baujahr 2005, 3. OG mit Aufzug, Balkon, guter Zustand. Der Gutachterausschuss Berlin liefert drei Vergleichskäufe aus den letzten 12 Monaten:\n\nObjekt A: 78 m², 2. OG ohne Aufzug, kein Balkon, Baujahr 2003 — Kaufpreis 295.000 €\nObjekt B: 92 m², 4. OG mit Aufzug, Balkon, Baujahr 2008 — Kaufpreis 385.000 €\nObjekt C: 80 m², 3. OG mit Aufzug, Dachterrasse, Baujahr 2010 — Kaufpreis 360.000 €",
    question: "Führen Sie eine Vergleichswertermittlung durch. Welche Anpassungen müssen an den Vergleichsobjekten vorgenommen werden? Ermitteln Sie einen begründeten Verkehrswert.",
    legalContext: [
      "§ 15 ImmoWertV 2021 — Vergleichswertverfahren",
      "§ 194 BauGB — Definition Verkehrswert",
      "§ 9 ImmoWertV — Grundsätze der Wertermittlung",
      "Gutachterausschuss-Richtlinien Berlin"
    ],
    correctAnswer: "**Vergleichswertverfahren nach § 15 ImmoWertV:**\n\n**Schritt 1: Vergleichspreise pro m² berechnen**\n- Objekt A: 295.000 € / 78 m² = 3.782 €/m²\n- Objekt B: 385.000 € / 92 m² = 4.185 €/m²\n- Objekt C: 360.000 € / 80 m² = 4.500 €/m²\n\n**Schritt 2: Anpassungsfaktoren**\n\n*Objekt A (3.782 €/m²):*\n- Kein Aufzug → +3% (Aufzug vorhanden beim Bewertungsobjekt)\n- Kein Balkon → +4%\n- Älteres Baujahr (2003 vs. 2005) → +1%\n- Angepasst: 3.782 × 1,08 = 4.085 €/m²\n\n*Objekt B (4.185 €/m²):*\n- Neueres Baujahr (2008 vs. 2005) → -2%\n- Angepasst: 4.185 × 0,98 = 4.101 €/m²\n\n*Objekt C (4.500 €/m²):*\n- Dachterrasse statt Balkon → -5%\n- Neueres Baujahr (2010 vs. 2005) → -3%\n- Angepasst: 4.500 × 0,92 = 4.140 €/m²\n\n**Schritt 3: Mittelwert der angepassten Preise**\n(4.085 + 4.101 + 4.140) / 3 = 4.109 €/m²\n\n**Schritt 4: Verkehrswert**\n4.109 €/m² × 85 m² = **349.265 € ≈ 349.000 €**\n\nDer Verkehrswert der Wohnung beträgt rund **349.000 €**.",
    commonMistakes: [
      "Keine Anpassung der Vergleichsobjekte (Rohdaten direkt mitteln)",
      "Vergessen des Flächenunterschieds (absolute Preise statt €/m² vergleichen)",
      "Zu hohe oder zu niedrige Anpassungsfaktoren ohne Begründung",
      "Verwechslung Vergleichswertverfahren mit Ertragswertverfahren"
    ],
    learningPoints: [
      "Immer erst auf €/m² normieren, dann Anpassungen vornehmen",
      "Anpassungsfaktoren müssen sachlich begründet sein (Ausstattung, Baujahr, Lage)",
      "Mindestens 3 Vergleichsobjekte aus den letzten 12-24 Monaten",
      "§ 15 ImmoWertV 2021 ist die Rechtsgrundlage für das Vergleichswertverfahren"
    ]
  },
  {
    id: "modul4-case-2",
    title: "Ertragswertverfahren — Renditeobjekt mit Leerstand",
    category: "Wertermittlung & Ertragswert",
    difficulty: "Experte",
    scenario: "Ein Investor will ein Mehrfamilienhaus in Leipzig kaufen. Das Objekt hat 8 Wohnungen mit insgesamt 520 m² Wohnfläche. Aktuelle Situation:\n\n- 6 Wohnungen vermietet: Durchschnittsmiete 8,50 €/m² kalt\n- 2 Wohnungen leer seit 6 Monaten\n- Marktübliche Miete laut Mietspiegel: 9,20 €/m² kalt\n- Bewirtschaftungskosten: 28% der Rohmiete\n- Bodenwert (Gutachterausschuss): 180.000 €\n- Liegenschaftszinssatz: 4,5%\n- Restnutzungsdauer: 45 Jahre\n- Baujahr 1998, guter Instandhaltungszustand",
    question: "Ermitteln Sie den Ertragswert nach § 17-20 ImmoWertV 2021. Verwenden Sie die marktübliche Miete als Rohertrag und berücksichtigen Sie den Leerstand korrekt.",
    legalContext: [
      "§§ 17-20 ImmoWertV 2021 — Ertragswertverfahren",
      "§ 18 ImmoWertV — Rohertrag und Reinertrag",
      "§ 20 ImmoWertV — Barwertfaktor / Vervielfältiger",
      "Anlage 1 ImmoWertV — Barwertfaktoren"
    ],
    correctAnswer: "**Ertragswertverfahren nach §§ 17-20 ImmoWertV 2021:**\n\n**Schritt 1: Rohertrag (marktüblich, nicht IST-Miete)**\n- Gesamtfläche: 520 m²\n- Marktübliche Miete: 9,20 €/m² × 520 m² × 12 Monate = **57.408 €/Jahr**\n- Hinweis: Man nimmt die marktübliche Miete, nicht die aktuelle (§ 18 ImmoWertV)\n\n**Schritt 2: Bewirtschaftungskosten**\n- 28% von 57.408 € = **16.074 €/Jahr**\n- Enthält: Verwaltung, Instandhaltung, Mietausfallwagnis\n\n**Schritt 3: Reinertrag des Grundstücks**\n- 57.408 € - 16.074 € = **41.334 €/Jahr**\n\n**Schritt 4: Bodenwertverzinsung abziehen**\n- Bodenwert × Liegenschaftszinssatz = 180.000 € × 4,5% = **8.100 €/Jahr**\n\n**Schritt 5: Reinertrag der baulichen Anlagen**\n- 41.334 € - 8.100 € = **33.234 €/Jahr**\n\n**Schritt 6: Barwertfaktor (Vervielfältiger)**\n- Formel: (1 - (1+i)^(-n)) / i\n- i = 4,5% = 0,045, n = 45 Jahre\n- Barwertfaktor = (1 - 1,045^(-45)) / 0,045 = **18,26**\n\n**Schritt 7: Ertragswert der baulichen Anlagen**\n- 33.234 € × 18,26 = **606.813 €**\n\n**Schritt 8: Vorläufiger Ertragswert**\n- 606.813 € + 180.000 € (Bodenwert) = **786.813 €**\n\n**Ertragswert: ca. 787.000 €**",
    commonMistakes: [
      "IST-Miete statt marktüblicher Miete verwenden",
      "Leerstand doppelt berücksichtigen (schon im Mietausfallwagnis enthalten)",
      "Bodenwertverzinsung vergessen oder falsch berechnen",
      "Falschen Barwertfaktor ablesen oder berechnen"
    ],
    learningPoints: [
      "Ertragswert nutzt marktübliche Miete, nicht IST-Miete (§ 18 ImmoWertV)",
      "Leerstand wird durch Mietausfallwagnis in Bewirtschaftungskosten berücksichtigt",
      "Bodenwertverzinsung wird vom Reinertrag abgezogen",
      "Barwertfaktor abhängig von Liegenschaftszinssatz UND Restnutzungsdauer"
    ]
  },
  {
    id: "modul4-case-3",
    title: "Sachwertverfahren — Einfamilienhaus mit Modernisierung",
    category: "Wertermittlung & Sachwert",
    difficulty: "Fortgeschritten",
    scenario: "Familie Meier will ihr Einfamilienhaus in Dresden verkaufen und benötigt ein Gutachten. Objektdaten:\n\n- Baujahr 1975, umfassende Modernisierung 2018 (Dach, Fenster, Heizung, Bad)\n- Wohnfläche: 145 m², Grundstücksgröße: 620 m²\n- Normalherstellungskosten (NHK 2010): 1.200 €/m² Wohnfläche\n- Baupreisindex aktuell: 1,52 (Basis 2010 = 1,0)\n- Bodenwert: 120 €/m² (Bodenrichtwert Gutachterausschuss)\n- Gesamtnutzungsdauer: 80 Jahre\n- Durch Modernisierung: Restnutzungsdauer 50 Jahre (statt rechnerisch 29 Jahre)\n- Marktanpassungsfaktor (Sachwertfaktor): 0,85",
    question: "Ermitteln Sie den Sachwert nach §§ 21-23 ImmoWertV 2021. Berechnen Sie die Alterswertminderung und erklären Sie, warum die Modernisierung die Restnutzungsdauer beeinflusst.",
    legalContext: [
      "§§ 21-23 ImmoWertV 2021 — Sachwertverfahren",
      "§ 22 ImmoWertV — Herstellungskosten und Alterswertminderung",
      "§ 23 ImmoWertV — Marktanpassung (Sachwertfaktor)",
      "Anlage 3 ImmoWertV — NHK 2010"
    ],
    correctAnswer: "**Sachwertverfahren nach §§ 21-23 ImmoWertV 2021:**\n\n**Schritt 1: Bodenwert**\n- 620 m² × 120 €/m² = **74.400 €**\n\n**Schritt 2: Herstellungskosten der baulichen Anlagen**\n- NHK 2010: 1.200 €/m² × 145 m² = 174.000 €\n- Baupreisanpassung: 174.000 € × 1,52 = **264.480 €**\n\n**Schritt 3: Alterswertminderung**\n- Gesamtnutzungsdauer: 80 Jahre\n- Restnutzungsdauer nach Modernisierung: 50 Jahre\n- Fiktives Alter: 80 - 50 = 30 Jahre\n- Alterswertminderung: 30/80 = **37,5%**\n- Abzug: 264.480 € × 37,5% = 99.180 €\n- Zeitwert bauliche Anlagen: 264.480 € - 99.180 € = **165.300 €**\n\n**Schritt 4: Vorläufiger Sachwert**\n- Bodenwert + Zeitwert = 74.400 € + 165.300 € = **239.700 €**\n\n**Schritt 5: Marktanpassung**\n- Sachwertfaktor: 0,85\n- 239.700 € × 0,85 = **203.745 €**\n\n**Sachwert: ca. 204.000 €**\n\n**Warum beeinflusst die Modernisierung die Restnutzungsdauer?**\n- Ohne Modernisierung: 80 - (2026-1975) = 29 Jahre Restnutzungsdauer\n- Die umfassende Modernisierung 2018 (Dach, Fenster, Heizung, Bad) hat das Gebäude auf einen technischen Stand gebracht, der einer wesentlich geringeren Abnutzung entspricht\n- Nach ImmoWertV wird die Restnutzungsdauer bei wesentlicher Modernisierung angehoben (hier: von 29 auf 50 Jahre)\n- Das reduziert die Alterswertminderung von 63,75% auf 37,5% — ein Unterschied von ca. 69.000 € im Sachwert",
    commonMistakes: [
      "Baupreisindex vergessen (NHK 2010 direkt verwenden statt anpassen)",
      "Rechnerisches Alter statt modifiziertem Alter nach Modernisierung verwenden",
      "Marktanpassungsfaktor (Sachwertfaktor) vergessen oder falsch anwenden",
      "Bodenwert in die Alterswertminderung einbeziehen (Boden altert nicht)"
    ],
    learningPoints: [
      "NHK müssen immer mit aktuellem Baupreisindex multipliziert werden",
      "Modernisierung verlängert die Restnutzungsdauer — senkt Alterswertminderung erheblich",
      "Bodenwert unterliegt KEINER Alterswertminderung (Boden nutzt sich nicht ab)",
      "Sachwertfaktor < 1,0 ist typisch — Sachwert liegt meist über dem Marktwert"
    ]
  }
];
