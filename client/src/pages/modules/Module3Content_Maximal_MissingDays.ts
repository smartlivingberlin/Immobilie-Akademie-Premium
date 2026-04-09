
export const contentDataModule3MaximalMissingDays = {
  // WOCHE 2: Kaufmännische Verwaltung (Tag 4-8)
  
  // Tag 4: Der Wirtschaftsplan
  day_4: {
    title: "Der Wirtschaftsplan: Die Finanzplanung der WEG",
    type: "Kaufmännisch",
    theory: `
# Der Wirtschaftsplan: Das Budget der Gemeinschaft

Der Wirtschaftsplan (§ 28 WEG) ist die Prognose der Einnahmen und Ausgaben für das kommende Wirtschaftsjahr. Er ist die Grundlage für die monatlichen Hausgeldzahlungen der Eigentümer.

## 1. Bestandteile des Wirtschaftsplans
- **Gesamtwirtschaftsplan:** Aufstellung aller voraussichtlichen Einnahmen und Ausgaben der gesamten Gemeinschaft.
- **Einzelwirtschaftsplan:** Berechnung des Anteils für jeden einzelnen Eigentümer basierend auf dem Verteilerschlüssel (meist Miteigentumsanteile, MEA).

## 2. Erstellung und Beschluss
- **Erstellung:** Durch den Verwalter vor Beginn des Wirtschaftsjahres.
- **Beschluss:** Durch die Eigentümerversammlung mit einfacher Mehrheit.
- **Gültigkeit:** Gilt auch über das Jahr hinaus bis zum Beschluss eines neuen Plans (Fortgeltungsklausel).

## 3. Positionen im Wirtschaftsplan
- **Kosten der Verwaltung:** Verwaltergebühr, Kontoführungsgebühren.
- **Betriebskosten:** Wasser, Abwasser, Müll, Hausstrom, Heizung, Versicherung, Hausmeister.
- **Instandhaltung:** Laufende Kleinreparaturen.
- **Erhaltungsrücklage:** Zuführung zur Rücklage für zukünftige Großreparaturen.

## 4. Anpassung des Hausgeldes
Wenn die Kosten steigen (z.B. Energiepreise), muss der Verwalter den Wirtschaftsplan anpassen und ein höheres Hausgeld vorschlagen, um Liquiditätsengpässe zu vermeiden.
    `,
    law: [
      "§ 28 WEG (Wirtschaftsplan, Jahresabrechnung)",
      "§ 16 WEG (Nutzen, Lasten, Kosten)",
      "§ 19 WEG (Wirkung des Urteils)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Der Wirtschaftsplan: Die Finanzplanung der WEG' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Der Wirtschaftsplan: Die Finanzplanung der WEG'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Der Wirtschaftsplan: Die Finanzplanung der WEG' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Praxis-Tipp: Realistische Planung

Planen Sie lieber etwas großzügiger als zu knapp. Eine kleine Rückerstattung am Jahresende freut die Eigentümer mehr als eine hohe Nachzahlung.

## Beispielrechnung:
- **Gesamtkosten Müllabfuhr Vorjahr:** 12.000 €
- **Preiserhöhung Entsorger:** +5% angekündigt
- **Ansatz im neuen Plan:** 12.000 € * 1,05 = 12.600 € -> Aufrunden auf 13.000 € als Sicherheitspuffer.

**Kommunikation:** Erklären Sie in der Versammlung, warum Sie Puffer eingebaut haben ("Vorsichtsprinzip").
    `,
    task: `
## Erstellen Sie einen Einzelwirtschaftsplan

**Gegeben:**
- Gesamtkosten der WEG: 100.000 €
- Zuführung Rücklage: 10.000 €
- Miteigentumsanteile (MEA) der Wohnung: 50 / 1.000

**Berechnen Sie:**
1.  Den Anteil der Wohnung an den Gesamtkosten.
2.  Den Anteil an der Rücklage.
3.  Das monatliche Hausgeld für diesen Eigentümer.

*Lösungshinweis: (100.000 + 10.000) * 50/1000 = 5.500 € Jahresbeitrag. Geteilt durch 12 Monate = 458,33 € monatliches Hausgeld.*
    `,
    extendedTheory: `
### Vertiefung: Der Wirtschaftsplan als strategisches Steuerungsinstrument

Der Wirtschaftsplan ist weit mehr als eine bloße Aufstellung von Einnahmen und Ausgaben. Er ist das zentrale Steuerungsinstrument der WEG-Verwaltung und bildet die Grundlage für die monatlichen Hausgeldzahlungen der Eigentümer. Ein gut aufgestellter Wirtschaftsplan vermeidet Liquiditätsengpässe, schafft Transparenz und stärkt das Vertrauen der Eigentümer in die Verwaltung.

**Die rechtliche Grundlage nach der WEG-Reform 2020**

Mit der Reform 2020 wurde § 28 WEG grundlegend neu gefasst. Der Beschluss über den Wirtschaftsplan begründet nun unmittelbar die Zahlungspflicht der Eigentümer als sogenannte "Vorschüsse" (§ 28 Abs. 1 WEG). Dies ist eine wichtige Änderung gegenüber der alten Rechtslage, bei der der Wirtschaftsplan nur die Grundlage für die Hausgeldpflicht bildete, die eigentliche Zahlungspflicht aber erst durch den Einzelwirtschaftsplan entstand. In der Praxis bedeutet dies: Sobald die ETV den Wirtschaftsplan beschließt, sind die Eigentümer zur Zahlung verpflichtet.

**Aufbau eines professionellen Wirtschaftsplans**

Ein professioneller Wirtschaftsplan gliedert sich in den Gesamtwirtschaftsplan und die Einzelwirtschaftspläne. Der Gesamtwirtschaftsplan enthält alle voraussichtlichen Einnahmen und Ausgaben der Gemeinschaft, gegliedert nach Kostenarten. Die wichtigsten Positionen sind: Verwaltungskosten (Verwaltergebühr, Kontoführung, Porto), Betriebskosten (Wasser, Abwasser, Müll, Hausstrom, Versicherungen, Grundsteuer), Heizkosten (Brennstoff, Wartung, Schornsteinfeger), Instandhaltungskosten (laufende Reparaturen) und die Zuführung zur Erhaltungsrücklage.

Der Einzelwirtschaftsplan berechnet den Anteil jedes Eigentümers an den Gesamtkosten. Die Verteilung erfolgt nach dem in der Teilungserklärung festgelegten Schlüssel, meist nach Miteigentumsanteilen (MEA). Für bestimmte Kostenarten können abweichende Schlüssel gelten, etwa nach Verbrauch für Heizkosten oder nach Einheiten für die Verwaltergebühr.

**Kalkulation und Vorsichtsprinzip**

Bei der Kalkulation des Wirtschaftsplans sollte der Verwalter das kaufmännische Vorsichtsprinzip anwenden: Einnahmen werden eher niedrig, Ausgaben eher hoch angesetzt. Ein Sicherheitspuffer von 5-10 Prozent auf die Vorjahreswerte ist empfehlenswert, insbesondere bei volatilen Kostenarten wie Energie und Wasser. Die Begründung für die Eigentümer ist einfach: Eine kleine Rückerstattung am Jahresende ist angenehmer als eine hohe Nachzahlung.

Besondere Aufmerksamkeit verdient die Zuführung zur Erhaltungsrücklage. Viele WEGs sparen zu wenig an, was bei größeren Reparaturen zu hohen Sonderumlagen führt. Als Orientierung dient die Peterssche Formel oder die Berechnungsverordnung. Für ein Gebäude mittleren Alters (20-40 Jahre) sollte die jährliche Zuführung mindestens 10-15 Euro pro Quadratmeter Wohnfläche betragen.

**Fortgeltung und Anpassung**

Der beschlossene Wirtschaftsplan gilt über das Wirtschaftsjahr hinaus fort, bis ein neuer Plan beschlossen wird (Fortgeltungsklausel). Dies ist wichtig, wenn die ETV den neuen Plan nicht rechtzeitig beschließt. In der Praxis kommt es häufig vor, dass der Wirtschaftsplan erst Monate nach Beginn des Wirtschaftsjahres beschlossen wird. Die Eigentümer zahlen dann zunächst auf Basis des alten Plans weiter.

Steigen die Kosten im laufenden Jahr unerwartet stark (z.B. durch Energiepreissteigerungen), kann der Verwalter eine Sonderumlage oder eine Anpassung des Wirtschaftsplans vorschlagen. Beides erfordert einen Beschluss der ETV. Der Verwalter sollte die Eigentümer frühzeitig informieren und die Gründe transparent darlegen.

**Digitalisierung der Wirtschaftsplanung**

Moderne Verwaltungssoftware (z.B. Haufe PowerHaus, DOMUS, Immoware24) ermöglicht die automatisierte Erstellung von Wirtschaftsplänen auf Basis der Vorjahresdaten. Die Software berechnet die Einzelwirtschaftspläne automatisch nach den hinterlegten Verteilerschlüsseln und erstellt druckfertige Dokumente für die Eigentümerversammlung. Für den Verwalter bedeutet dies eine erhebliche Zeitersparnis und eine Reduzierung von Berechnungsfehlern.

*Quellen: § 28 Abs. 1 WEG (neue Fassung), BGH V ZR 44/09 (Anforderungen an den Wirtschaftsplan), DDIV Praxisleitfaden Wirtschaftsplan 2024*
`
  },

  // Tag 5: Die Jahresabrechnung (Grundlagen)
  day_5: {
    title: "Die Jahresabrechnung: Grundlagen & Struktur",
    type: "Kaufmännisch",
    theory: `
# Die Jahresabrechnung: Der Kassensturz

Nach Ablauf des Wirtschaftsjahres muss der Verwalter eine Abrechnung erstellen (§ 28 Abs. 2 WEG). Sie stellt die tatsächlichen Einnahmen und Ausgaben den geplanten Zahlen gegenüber.

## 1. Struktur der Abrechnung
- **Gesamtabrechnung:** Alle tatsächlichen Einnahmen und Ausgaben der WEG. Muss mit den Kontobewegungen übereinstimmen.
- **Einzelabrechnung:** Verteilung der Kosten auf die einzelnen Eigentümer.
- **Entwicklung der Erhaltungsrücklage:** Anfangsbestand + Zuführung - Entnahmen = Endbestand.

## 2. Abrechnungsspitze
Das Ergebnis der Abrechnung ist nicht die Gesamtsumme, sondern nur die Differenz zwischen den Vorauszahlungen (Soll) und den tatsächlichen Kosten (Ist).
- **Nachzahlung:** Kosten waren höher als Vorauszahlungen.
- **Guthaben:** Vorauszahlungen waren höher als Kosten.

## 3. Fälligkeit
Die Abrechnung muss "unverzüglich" nach Ablauf des Jahres erstellt werden. Die Rechtsprechung billigt meist einen Zeitraum von 3-6 Monaten zu.
    `,
    law: [
      "§ 28 Abs. 2 WEG (Jahresabrechnung)",
      "BGH V ZR 44/09 (Anforderungen an die Abrechnung)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Die Jahresabrechnung: Grundlagen & Struktur' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Die Jahresabrechnung: Grundlagen & Struktur'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Die Jahresabrechnung: Grundlagen & Struktur' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Die Rechnungsprüfung

Vor der Versammlung prüft der Verwaltungsbeirat die Abrechnung.

## Checkliste für die Prüfung:
1.  **Vollständigkeit:** Sind alle Belege vorhanden?
2.  **Sachliche Richtigkeit:** Wurden Kosten richtig gebucht (z.B. Reparatur nicht als Wartung)?
3.  **Rechnerische Richtigkeit:** Stimmen die Summen?
4.  **Verteilerschlüssel:** Wurden die Kosten korrekt verteilt (nach MEA, Personen, Verbrauch)?

**Tipp:** Legen Sie alle Belege ordentlich sortiert vor. Transparenz schafft Vertrauen.
    `,
    task: `
## Fehlersuche

Sie prüfen eine Abrechnung und finden folgende Position:
"Reparatur Fenster Wohnung Müller (Sondereigentum): 500 € - verteilt nach MEA auf alle Eigentümer."

**Ist das korrekt?**
*Lösungshinweis: Nein. Kosten für Sondereigentum (Fenster innen, je nach Teilungserklärung oft auch außen) trägt meist der jeweilige Sondereigentümer allein, nicht die Gemeinschaft. Wenn es Gemeinschaftseigentum ist, wäre die Verteilung korrekt, aber oft regelt die Teilungserklärung, dass Fensterreparaturen "Sache des Sondereigentümers" sind.*
    `,
    extendedTheory: `
### Vertiefung: Die Jahresabrechnung als Rechenschaftsbericht des Verwalters

Die Jahresabrechnung ist der wichtigste Rechenschaftsbericht des Verwalters gegenüber den Eigentümern. Sie stellt die tatsächlichen Einnahmen und Ausgaben des abgelaufenen Wirtschaftsjahres dar und bildet die Grundlage für die Berechnung von Nachzahlungen oder Guthaben der einzelnen Eigentümer. Die korrekte Erstellung der Jahresabrechnung gehört zu den Kernpflichten des Verwalters und ist gleichzeitig eine der häufigsten Fehlerquellen in der WEG-Verwaltung.

**Das Einnahmen-Ausgaben-Prinzip (Zufluss-Abfluss-Prinzip)**

Die WEG-Abrechnung folgt dem Einnahmen-Ausgaben-Prinzip, nicht der kaufmännischen Buchführung. Das bedeutet: Es werden nur tatsächliche Geldbewegungen auf den Konten der WEG erfasst, keine Rückstellungen, Abschreibungen oder periodengerechte Abgrenzungen. Eine Rechnung, die im Dezember gestellt, aber erst im Januar bezahlt wird, gehört in die Abrechnung des Folgejahres. Dieses Prinzip hat der BGH in ständiger Rechtsprechung bestätigt (BGH V ZR 44/09).

In der Praxis führt das Zufluss-Abfluss-Prinzip manchmal zu Verzerrungen: Wenn beispielsweise die Heizöllieferung im Dezember bestellt, aber erst im Januar geliefert und bezahlt wird, erscheinen die Heizkosten in der Abrechnung des Folgejahres, obwohl das Öl für das Vorjahr bestimmt war. Der Verwalter sollte solche Abweichungen im Abrechnungsbericht erläutern.

**Die Struktur der Jahresabrechnung**

Die Jahresabrechnung besteht aus drei Teilen: der Gesamtabrechnung, den Einzelabrechnungen und der Darstellung der Erhaltungsrücklage. Die Gesamtabrechnung listet alle Einnahmen (Hausgeldzahlungen, Zinsen, Sonderzahlungen) und alle Ausgaben (nach Kostenarten gegliedert) auf. Die Summe der Einnahmen und Ausgaben muss mit den Kontobewegungen übereinstimmen, was eine einfache Plausibilitätsprüfung ermöglicht.

Die Einzelabrechnung verteilt die Kosten auf die einzelnen Eigentümer nach den geltenden Verteilerschlüsseln. Das Ergebnis ist die sogenannte Abrechnungsspitze: die Differenz zwischen den geleisteten Vorauszahlungen (Hausgeld) und dem tatsächlichen Kostenanteil. Eine positive Abrechnungsspitze bedeutet eine Nachzahlung, eine negative ein Guthaben.

**Die Abrechnungsspitze nach neuem Recht**

Seit der WEG-Reform 2020 beschließt die ETV nicht mehr die gesamte Abrechnung, sondern nur noch die Abrechnungsspitze, also die Nachzahlung oder das Guthaben (§ 28 Abs. 2 WEG). Dies ist eine wesentliche Vereinfachung: Fehler in der Gesamtabrechnung führen nicht mehr automatisch zur Anfechtbarkeit des Abrechnungsbeschlusses, solange die Abrechnungsspitze korrekt berechnet ist. Die Gesamtabrechnung dient nur noch als Rechenwerk zur Herleitung der Abrechnungsspitze.

**Häufige Fehler in der Jahresabrechnung**

Die häufigsten Fehler in der Praxis sind: falsche Verteilerschlüssel (z.B. Heizkosten nach MEA statt nach Verbrauch), fehlende oder falsche Abgrenzung der Heizperiode, Vermischung von umlagefähigen und nicht umlagefähigen Kosten bei der Sondereigentumsverwaltung, rechnerische Fehler bei der Verteilung und fehlende Darstellung der Erhaltungsrücklage. Besonders tückisch sind Fehler bei der Zuordnung von Kosten zu den richtigen Kostenarten, da dies die Verteilung beeinflusst.

**Die Prüfung durch den Verwaltungsbeirat**

Der Verwaltungsbeirat hat die Aufgabe, die Jahresabrechnung vor der Beschlussfassung zu prüfen (§ 29 Abs. 3 WEG). Die Prüfung umfasst die sachliche und rechnerische Richtigkeit, die Vollständigkeit der Belege und die korrekte Anwendung der Verteilerschlüssel. Der Beirat erstellt einen Prüfbericht, der den Eigentümern vor oder in der Versammlung vorgelegt wird. In der Praxis ist die Qualität der Beiratsprüfung sehr unterschiedlich, da die Beiratsmitglieder ehrenamtlich tätig sind und oft keine kaufmännische Ausbildung haben.

**Fristen und Konsequenzen**

Der Verwalter muss die Abrechnung "nach Ablauf des Kalenderjahres" erstellen. Die Rechtsprechung billigt einen Zeitraum von drei bis sechs Monaten zu. Erstellt der Verwalter die Abrechnung nicht fristgerecht, kann dies einen wichtigen Grund für seine Abberufung darstellen. Die Eigentümer können den Verwalter auch auf Erstellung der Abrechnung verklagen. Seit der Reform 2020 verjähren Nachzahlungsansprüche aus der Abrechnung nach drei Jahren ab Beschlussfassung.

*Quellen: § 28 Abs. 2 WEG (neue Fassung), BGH V ZR 44/09 (Zufluss-Abfluss-Prinzip), BGH V ZR 108/22 (Abrechnungsspitze), DDIV Praxisleitfaden Jahresabrechnung 2024*
`
  },

  // Tag 6: Die Jahresabrechnung (Verteilerschlüssel)
  day_6: {
    title: "Verteilerschlüssel in der WEG",
    type: "Kaufmännisch",
    theory: `
# Wer zahlt was? Die Verteilerschlüssel

Die korrekte Verteilung der Kosten ist der häufigste Streitpunkt in WEG-Abrechnungen.

## 1. Gesetzlicher Standard (§ 16 Abs. 2 WEG)
Grundsätzlich werden alle Kosten nach dem Verhältnis der **Miteigentumsanteile (MEA)** verteilt.

## 2. Abweichende Vereinbarungen
Die Gemeinschaftsordnung oder ein Beschluss können andere Schlüssel festlegen:
- **Nach Einheiten:** Jede Wohnung zahlt gleich viel (z.B. für Kabel-TV-Grundgebühr, Verwaltergebühr).
- **Nach Verbrauch:** Zwingend bei Heiz- und Warmwasserkosten (Heizkostenverordnung!). Auch bei Wasser möglich, wenn Zähler vorhanden sind.
- **Nach Personen:** Ungenau und streitanfällig (Besucher, Leerstand?), daher selten empfohlen.

## 3. Änderung des Schlüssels (§ 16 Abs. 3 WEG)
Die Eigentümer können mit einfacher Mehrheit beschließen, den Kostenverteilerschlüssel für einzelne Kostenarten oder bauliche Maßnahmen zu ändern (z.B. "Fenstertausch zahlt jeder selbst").
    `,
    law: [
      "§ 16 Abs. 2 WEG (Gesetzlicher Schlüssel)",
      "§ 16 Abs. 3 WEG (Beschlusskompetenz zur Änderung)",
      "HeizkostenV (Vorrang vor WEG)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Verteilerschlüssel in der WEG' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Verteilerschlüssel in der WEG'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Verteilerschlüssel in der WEG' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Fallstudie: Der Aufzug

Eine WEG besteht aus Erdgeschosswohnungen und Wohnungen im 1.-5. Stock. Es gibt einen Aufzug.
Die EG-Eigentümer wollen sich nicht an den Aufzugskosten beteiligen, da sie ihn nie nutzen.

## Rechtslage:
- Grundsätzlich gilt: Alle zahlen mit (Solidargemeinschaft), da der Aufzug Gemeinschaftseigentum ist.
- **Aber:** Die WEG kann gem. § 16 Abs. 3 WEG beschließen, die EG-Wohnungen von den *Betriebskosten* des Aufzugs zu befreien.
- Für *Instandsetzung* zahlen meist alle, da der Aufzug den Wert des gesamten Hauses steigert.
    `,
    task: `
## Berechnungs-Übung

Gesamtkosten Wasser: 10.000 €.
Verteilerschlüssel: Nach Verbrauch.

Gesamtverbrauch WEG: 2.000 m³.
Verbrauch Wohnung A: 100 m³.

**Berechnen Sie die Kosten für Wohnung A.**
*Lösungshinweis: 10.000 € / 2.000 m³ = 5 € pro m³. 100 m³ * 5 € = 500 €.*
    `,
    extendedTheory: `
### Vertiefung: Verteilerschlüssel als Gerechtigkeitsinstrument der WEG

Die korrekte Anwendung von Verteilerschlüsseln ist eine der anspruchsvollsten Aufgaben in der WEG-Verwaltung und gleichzeitig der häufigste Anlass für Streitigkeiten unter Eigentümern. Der Verteilerschlüssel bestimmt, welchen Anteil jeder Eigentümer an den Gesamtkosten der Gemeinschaft trägt. Ein falsch angewandter Schlüssel kann zu erheblichen finanziellen Ungerechtigkeiten führen und die Jahresabrechnung anfechtbar machen.

**Der gesetzliche Standardschlüssel: Miteigentumsanteile (MEA)**

Nach § 16 Abs. 2 WEG werden die Kosten grundsätzlich nach dem Verhältnis der Miteigentumsanteile (MEA) verteilt. Die MEA werden in der Teilungserklärung festgelegt und spiegeln in der Regel das Verhältnis der Wohnflächen wider. Eine Wohnung mit 100 m² und 100/1000 MEA trägt doppelt so viel wie eine Wohnung mit 50 m² und 50/1000 MEA. In der Praxis stimmen die MEA jedoch nicht immer exakt mit den tatsächlichen Flächen überein, da sie bei der Aufteilung oft gerundet oder nach anderen Kriterien (z.B. Lage, Stockwerk) festgelegt wurden.

**Abweichende Verteilerschlüssel in der Gemeinschaftsordnung**

Die meisten Gemeinschaftsordnungen enthalten differenzierte Verteilerschlüssel für verschiedene Kostenarten. Typische Varianten sind die Verteilung nach Wohneinheiten (jede Einheit zahlt gleich viel, unabhängig von der Größe), nach Personen (Anzahl der Bewohner), nach Verbrauch (gemessener Verbrauch über Zähler) und nach Fläche (tatsächliche Wohnfläche in Quadratmetern). Die Wahl des Schlüssels hat erhebliche Auswirkungen auf die individuelle Belastung.

Ein Beispiel verdeutlicht dies: Bei Gesamtkosten von 10.000 Euro für die Treppenhausreinigung zahlt eine 30-m²-Wohnung nach MEA deutlich weniger als eine 120-m²-Wohnung. Bei Verteilung nach Einheiten zahlen beide gleich viel, obwohl die große Wohnung vermutlich mehr Personen beherbergt und das Treppenhaus stärker nutzt. Die Verteilung nach Personen wäre hier am gerechtesten, ist aber in der Praxis schwer umsetzbar, da die Personenzahl schwankt.

**Die Beschlusskompetenz nach § 16 Abs. 3 WEG**

Eine der wichtigsten Neuerungen der WEG-Reform 2020 ist die erweiterte Beschlusskompetenz zur Änderung des Kostenverteilungsschlüssels. Die Eigentümer können nun mit einfacher Mehrheit beschließen, den Schlüssel für einzelne Kostenarten oder für die Kosten baulicher Veränderungen zu ändern. Dies war zuvor nur durch Vereinbarung aller Eigentümer möglich. In der Praxis ermöglicht dies beispielsweise, die Aufzugskosten nur auf die Obergeschoss-Eigentümer umzulegen oder die Gartenkosten nur den Erdgeschoss-Bewohnern mit Sondernutzungsrecht zuzuweisen.

**Sonderfälle: Aufzug, Tiefgarage und Gewerbeeinheiten**

Besondere Herausforderungen ergeben sich bei gemischt genutzten Anlagen. Gewerbeeinheiten verursachen oft höhere Kosten (mehr Besucher, höherer Wasserverbrauch, stärkere Abnutzung der Gemeinschaftsflächen). Viele Gemeinschaftsordnungen sehen daher einen erhöhten Kostenanteil für Gewerbeeinheiten vor. Bei Tiefgaragen ist zu beachten, dass die Kosten für Beleuchtung, Lüftung und Reinigung nur auf die Stellplatznutzer umgelegt werden sollten, sofern die Teilungserklärung dies vorsieht.

**Praktische Umsetzung und Software**

Moderne Verwaltungssoftware ermöglicht die Hinterlegung beliebig vieler Verteilerschlüssel und berechnet die Einzelabrechnungen automatisch. Der Verwalter muss jedoch die Schlüssel korrekt einrichten und bei Änderungen (z.B. durch Beschluss der ETV) zeitnah aktualisieren. Eine jährliche Überprüfung der Schlüssel ist empfehlenswert, insbesondere nach baulichen Veränderungen oder Nutzungsänderungen.

*Quellen: § 16 WEG (Nutzungen, Lasten und Kosten), BGH V ZR 269/12 (Änderung des Verteilerschlüssels), BGH V ZR 82/20 (Aufzugskosten)*
`
  },

  // Tag 7: Heizkostenabrechnung
  day_7: {
    title: "Die Heizkostenabrechnung",
    type: "Kaufmännisch",
    theory: `
# Die Heizkostenverordnung (HeizkostenV)

Heiz- und Warmwasserkosten dürfen in der WEG (und im Mietrecht) fast nie pauschal abgerechnet werden. Die HeizkostenV ist zwingendes Recht.

## 1. Grundprinzip: Grundkosten vs. Verbrauchskosten
- **30-50% Grundkosten:** Werden nach Fläche (m²) verteilt. Decken Leitungsverluste und Bereitstellung ab.
- **50-70% Verbrauchskosten:** Werden nach gemessenem Verbrauch (Zähler/Verdunster) verteilt. Belohnen sparsames Verhalten.

## 2. Pflicht zur Erfassung
Es müssen geeichte Zähler (Wärmemengenzähler, Wasserzähler) oder Heizkostenverteiler installiert sein.

## 3. Kürzungsrecht
Wird nicht verbrauchsabhängig abgerechnet, darf der Nutzer den Kostenanteil um 15% kürzen (§ 12 HeizkostenV).
    `,
    law: [
      "§ 1 HeizkostenV (Anwendungsbereich)",
      "§ 7 HeizkostenV (Verteilung der Kosten)",
      "§ 12 HeizkostenV (Kürzungsrecht)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Die Heizkostenabrechnung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Die Heizkostenabrechnung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Die Heizkostenabrechnung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Umgang mit Messdienstleistern

Die Abrechnung erstellt meist eine externe Firma (Techem, Ista, Brunata etc.).

## Aufgaben des Verwalters:
1.  Meldung der Gesamtkosten (Brennstoff, Wartung, Schornsteinfeger, Betriebsstrom) an den Dienstleister.
2.  Meldung der Nutzerwechsel (Ein-/Auszug).
3.  Prüfung der fertigen Abrechnung auf Plausibilität.
4.  Integration der Ergebnisse in die WEG-Jahresabrechnung.

**Fehlerquelle:** Oft werden Brennstoffrestbestände im Tank falsch bewertet. Achten Sie auf die Abgrenzung (Anfangsbestand + Zukauf - Endbestand = Verbrauch).
    `,
    task: `
## Verständnisfrage

Warum darf man Heizkosten nicht zu 100% nach Verbrauch abrechnen?

*Lösungshinweis: Weil physikalisch Wärme auch durch Wände diffundiert ("Rohrwärme"). Eine Wohnung in der Mitte wird von den Nachbarn "mitgeheizt". Würde man 100% nach Verbrauch abrechnen, würden Innenwohnungen extrem bevorteilt und Außenwohnungen benachteiligt. Die Grundkosten gleichen diesen systembedingten Effekt aus.*
    `,
    extendedTheory: `
### Vertiefung: Die Heizkostenabrechnung als Spezialgebiet der WEG-Verwaltung

Die Heizkostenabrechnung ist eines der komplexesten Themen in der WEG-Verwaltung, da sie durch die Heizkostenverordnung (HeizkostenV) zwingend geregelt ist und vom allgemeinen WEG-Recht abweicht. Die HeizkostenV geht als Spezialgesetz dem WEG vor, was bedeutet, dass die Eigentümerversammlung die Verteilung der Heizkosten nicht frei beschließen kann. Verstöße gegen die HeizkostenV berechtigen den Nutzer zu einer Kürzung seines Kostenanteils um 15 Prozent.

**Das Grundprinzip: Verbrauchsabhängige Abrechnung**

Die HeizkostenV schreibt vor, dass Heiz- und Warmwasserkosten zu mindestens 50 und höchstens 70 Prozent nach Verbrauch verteilt werden müssen. Der restliche Anteil (30-50 Prozent) wird als Grundkosten nach Fläche (Quadratmeter Wohnfläche oder beheizte Fläche) verteilt. Diese Aufteilung berücksichtigt, dass ein Teil der Wärme systembedingt verloren geht (Leitungsverluste, Wärmeübertragung durch Wände) und nicht dem individuellen Verbrauchsverhalten zugerechnet werden kann.

Die Wahl des konkreten Verhältnisses (z.B. 50/50 oder 30/70) liegt beim Gebäudeeigentümer bzw. der WEG. Ein höherer Verbrauchsanteil belohnt sparsames Verhalten stärker, benachteiligt aber Wohnungen in ungünstiger Lage (Eckwohnungen, oberste Etage). Ein höherer Grundkostenanteil gleicht Lageunterschiede aus, reduziert aber den Sparanreiz.

**Erfassungsgeräte und ihre Funktionsweise**

Für die verbrauchsabhängige Erfassung kommen verschiedene Geräte zum Einsatz. Heizkostenverteiler (HKV) werden an jedem Heizkörper montiert und messen die abgegebene Wärme. Es gibt Verdunstungs-HKV (ältere Technik, Flüssigkeit verdunstet proportional zur Wärmeabgabe) und elektronische HKV (moderne Technik, messen Temperatur am Heizkörper und im Raum). Wärmemengenzähler (WMZ) messen den tatsächlichen Wärmeverbrauch in kWh und sind genauer, aber teurer in der Installation. Seit der Novelle der HeizkostenV 2021 müssen neue Erfassungsgeräte fernauslesbar sein.

**Die Rolle des Messdienstleisters**

In der Praxis wird die Heizkostenabrechnung fast immer von spezialisierten Messdienstleistern erstellt (Techem, Ista, Brunata-Metrona, Kalorimeta). Der Verwalter liefert dem Dienstleister die Gesamtkosten (Brennstoff, Wartung, Schornsteinfeger, Betriebsstrom der Heizung) und die Nutzerwechsel (Ein- und Auszüge). Der Dienstleister erstellt die verbrauchsabhängige Verteilung und liefert die Ergebnisse zurück, die der Verwalter in die WEG-Jahresabrechnung integriert.

**Häufige Fehlerquellen**

Die häufigsten Fehler bei der Heizkostenabrechnung sind: falsche Brennstoffkostenermittlung (Restbestände im Tank nicht korrekt abgegrenzt), fehlende Berücksichtigung von Nutzerwechseln (Gradtagszahlverfahren), Vermischung von Heiz- und Warmwasserkosten bei kombinierten Anlagen, nicht geeichte Zähler (Eichfrist beachten: Warmwasserzähler 6 Jahre, Wärmezähler 5 Jahre) und fehlende Mitteilung der monatlichen Verbrauchsinformationen an die Nutzer (seit 2022 Pflicht).

**Die CO2-Kostenaufteilung seit 2023**

Seit dem 1. Januar 2023 gilt das Kohlendioxidkostenaufteilungsgesetz (CO2KostAufG), das die CO2-Kosten aus dem Brennstoffemissionshandelsgesetz (BEHG) zwischen Vermieter und Mieter aufteilt. Die Aufteilung richtet sich nach der energetischen Qualität des Gebäudes: Je schlechter die Energieeffizienz, desto höher der Vermieteranteil. In der WEG-Verwaltung muss der Verwalter die CO2-Kosten ermitteln und in der Abrechnung gesondert ausweisen. Dies erfordert die Kenntnis des Energieausweises und der spezifischen CO2-Emissionen des Gebäudes.

*Quellen: HeizkostenV in der Fassung vom 01.12.2021, CO2KostAufG vom 01.01.2023, BGH VIII ZR 329/19 (Kürzungsrecht), EnEV/GEG (Energieausweis)*
`
  },

  // Tag 8: Vermögensbericht & Rücklage
  day_8: {
    title: "Vermögensbericht & Erhaltungsrücklage",
    type: "Kaufmännisch",
    theory: `
# Der Vermögensbericht

Seit der Reform 2020 muss der Verwalter nach Ablauf eines Kalenderjahres einen Vermögensbericht erstellen (§ 28 Abs. 4 WEG).

## 1. Inhalt
- Darstellung der **Erhaltungsrücklage** (Entwicklung, Stand).
- Aufstellung des **wesentlichen Gemeinschaftsvermögens** (Kontostände, Forderungen gegen Eigentümer, Verbindlichkeiten gegenüber Lieferanten).

## 2. Die Erhaltungsrücklage (früher Instandhaltungsrücklage)
- **Zweck:** Ansparen für zukünftige Reparaturen.
- **Höhe:** Muss "angemessen" sein. Orientierungshilfe: Peterssche Formel oder Berechnungsverordnung (ca. 7,10 - 11,50 €/m² im Jahr je nach Alter des Gebäudes).
- **Rechtsnatur:** Gehört der Gemeinschaft, nicht dem einzelnen Eigentümer. Bei Verkauf der Wohnung geht der Anteil auf den Käufer über (wird nicht ausgezahlt!).
    `,
    law: [
      "§ 19 Abs. 2 Nr. 4 WEG (Angemessene Rücklage)",
      "§ 28 Abs. 4 WEG (Vermögensbericht)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Vermögensbericht & Erhaltungsrücklage' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Vermögensbericht & Erhaltungsrücklage'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Vermögensbericht & Erhaltungsrücklage' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Die "Peterssche Formel"

Eine Faustformel zur Berechnung der notwendigen Rücklage:

*(Herstellungskosten * 1,5) / 80 Jahre = Jährliche Instandhaltungskosten pro m²*

Davon entfallen ca. 65-70% auf das Gemeinschaftseigentum.

**Beispiel:**
Herstellungskosten 2.000 €/m².
(2.000 * 1,5) / 80 = 37,50 €/m² pro Jahr.
Davon 70% für Gemeinschaft = ca. 26 €/m² pro Jahr Zuführung zur Rücklage.

*Hinweis: Dies ist ein theoretischer Wert. In der Praxis oft niedriger, aber er zeigt, dass viele WEGs zu wenig ansparen.*
    `,
    task: `
## Analyse einer Rücklage

Eine WEG (Baujahr 1970, 20 Einheiten, Sanierungsstau an Dach und Fassade) hat eine Rücklage von 5.000 €.

**Bewerten Sie die Situation.**
*Lösungshinweis: Die Rücklage ist katastrophal niedrig. Bei einem Dachschaden müsste eine hohe Sonderumlage beschlossen werden, die viele Eigentümer finanziell überfordern könnte. Als Verwalter müssen Sie dringend eine Erhöhung der Zuführung vorschlagen.*
    `,
    extendedTheory: `
### Vertiefung: Der Vermögensbericht und die strategische Rücklagenplanung

Der Vermögensbericht ist eine Neuerung der WEG-Reform 2020 und ergänzt die Jahresabrechnung um eine vermögensrechtliche Perspektive. Während die Abrechnung nur die Geldbewegungen eines Jahres darstellt, gibt der Vermögensbericht Auskunft über das gesamte Vermögen der Gemeinschaft zu einem bestimmten Stichtag. Für die Eigentümer ist dies eine wichtige Informationsquelle, da sie erstmals einen vollständigen Überblick über die finanzielle Lage ihrer Gemeinschaft erhalten.

**Inhalt und Aufbau des Vermögensberichts**

Der Vermögensbericht nach § 28 Abs. 4 WEG muss folgende Angaben enthalten: den Stand der Erhaltungsrücklage (Anfangsbestand, Zuführungen, Entnahmen, Endbestand), die Kontostände aller Bankkonten der WEG, offene Forderungen gegen Eigentümer (Hausgeldausstände), Verbindlichkeiten gegenüber Dritten (offene Rechnungen, Darlehen) und sonstige Vermögensgegenstände (z.B. Wertpapiere, falls die Rücklage angelegt wurde).

Der Vermögensbericht ist kein Beschlussgegenstand, sondern eine reine Informationspflicht des Verwalters. Er wird der Jahresabrechnung beigefügt und den Eigentümern zur Kenntnis gegeben. Fehlt der Vermögensbericht, ist dies zwar kein Anfechtungsgrund für die Abrechnung, kann aber einen Pflichtverletzungsvorwurf gegen den Verwalter begründen.

**Die Erhaltungsrücklage: Strategische Bedeutung**

Die Erhaltungsrücklage (früher Instandhaltungsrücklage) ist das finanzielle Polster der WEG für zukünftige Reparaturen und Sanierungen. Ihre angemessene Dotierung ist eine der wichtigsten Aufgaben des Verwalters, da unzureichende Rücklagen bei größeren Schäden zu hohen Sonderumlagen führen, die einzelne Eigentümer finanziell überfordern können.

Die Frage, was "angemessen" ist, beantwortet das Gesetz nicht konkret. In der Praxis haben sich verschiedene Berechnungsmethoden etabliert. Die Peterssche Formel berechnet die jährlichen Instandhaltungskosten als (Herstellungskosten x 1,5) / 80 Jahre. Für ein Gebäude mit Herstellungskosten von 2.000 Euro pro Quadratmeter ergibt sich ein Wert von 37,50 Euro pro Quadratmeter und Jahr. Davon entfallen etwa 65-70 Prozent auf das Gemeinschaftseigentum, also rund 25 Euro pro Quadratmeter.

**Die Anlage der Rücklage**

Die Erhaltungsrücklage muss getrennt vom laufenden Hausgeldkonto angelegt werden (§ 28 Abs. 1 Satz 2 WEG). In der Praxis wird sie meist auf einem separaten Sparkonto oder Tagesgeldkonto geführt. Die Anlage in Wertpapieren oder Fonds ist grundsätzlich möglich, erfordert aber einen Beschluss der ETV und birgt Risiken, die den Eigentümern transparent gemacht werden müssen.

Seit der Niedrigzinsphase und der anschließenden Zinswende ist die Anlage der Rücklage wieder ein relevantes Thema. Bei größeren Rücklagen (ab 50.000 Euro) kann eine Festgeldanlage mit gestaffelten Laufzeiten sinnvoll sein, um Zinserträge zu erzielen und gleichzeitig die Liquidität zu sichern. Der Verwalter sollte die Eigentümer über die Anlagemöglichkeiten informieren und einen Beschluss herbeiführen.

**Sonderumlagen: Das Notfallinstrument**

Wenn die Rücklage für eine notwendige Maßnahme nicht ausreicht, kann die ETV eine Sonderumlage beschließen. Die Sonderumlage ist eine einmalige Sonderzahlung der Eigentümer, die zusätzlich zum regulären Hausgeld erhoben wird. Sie wird nach dem gleichen Schlüssel verteilt wie die laufenden Kosten (meist MEA). Der Beschluss muss den Betrag, den Zweck und die Fälligkeit der Sonderumlage enthalten.

In der Praxis sind Sonderumlagen oft konfliktträchtig, da sie einzelne Eigentümer finanziell stark belasten können. Der Verwalter sollte daher frühzeitig auf die Notwendigkeit einer Rücklagenerhöhung hinweisen und die Eigentümer für eine vorausschauende Finanzplanung sensibilisieren. Eine Alternative zur Sonderumlage ist die Aufnahme eines Darlehens durch die WEG, was seit der Reform 2020 ausdrücklich möglich ist.

**Langfristige Instandhaltungsplanung**

Professionelle Verwalter erstellen einen langfristigen Instandhaltungsplan, der die voraussichtlichen Sanierungsmaßnahmen der nächsten 20-30 Jahre auflistet und die dafür notwendige Rücklagenbildung berechnet. Typische Positionen sind: Dachsanierung (alle 30-40 Jahre), Fassadenanstrich (alle 15-20 Jahre), Heizungserneuerung (alle 20-25 Jahre), Aufzugsmodernisierung (alle 25-30 Jahre) und Leitungssanierung (alle 40-50 Jahre).

*Quellen: § 28 Abs. 4 WEG (Vermögensbericht), § 19 Abs. 2 Nr. 4 WEG (angemessene Rücklage), BGH V ZR 146/16 (Sonderumlage), Peterssche Formel nach Peters/Bürger*
`
  },

  // WOCHE 3: Eigentümerversammlung Deep Dive (Tag 9-12)

  // Tag 9: Organisation der ETV
  day_9: {
    title: "Organisation der Eigentümerversammlung",
    type: "Organisation",
    theory: `
# Die perfekte ETV: Organisation ist alles

Eine gut organisierte Versammlung dauert 1-2 Stunden, eine schlechte bis tief in die Nacht.

## 1. Vorbereitung
- **Raum:** Groß genug, neutral (nicht in der Wohnung eines Eigentümers), gut belüftet.
- **Technik:** Beamer für Präsentation der Zahlen, Laptop, Drucker für Stimmzettel.
- **Unterlagen:** Anwesenheitsliste, Stimmkarten, Beschlussvorlagen.

## 2. Die Anwesenheitsliste
Zu Beginn muss jeder Eigentümer unterschreiben. Prüfen Sie Vollmachten von Vertretern!

## 3. Nichtöffentlichkeit
Die ETV ist eine nichtöffentliche Veranstaltung. Externe (Mieter, Anwälte, Berater) dürfen nur teilnehmen, wenn die Gemeinschaft dies per Beschluss gestattet oder die Teilungserklärung es erlaubt.
    `,
    law: [
      "§ 24 WEG (Einberufung, Vorsitz)",
      "BGH V ZR 110/11 (Teilnahme Dritter)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Organisation der Eigentümerversammlung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Organisation der Eigentümerversammlung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Organisation der Eigentümerversammlung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Die hybride Eigentümerversammlung

Seit 2020 können Eigentümer auch online teilnehmen (§ 23 Abs. 1 WEG), wenn dies beschlossen wurde.

**Vorteile:** Höhere Beteiligung, auch von auswärtigen Eigentümern.
**Herausforderung:** Technik muss funktionieren (Bild & Ton in beide Richtungen). Datenschutz beachten.

**Achtung:** Eine reine Online-Versammlung (ohne physischen Treffpunkt) ist nur möglich, wenn dies einstimmig vereinbart wurde (sehr hohe Hürde).
    `,
    task: `
## Checkliste erstellen

Erstellen Sie eine "Koffer-Liste" für den Verwalter. Was muss er zur Versammlung mitnehmen?

*Lösungshinweis: Teilungserklärung, aktuelles Grundbuch-Blatt (Eigentümerliste), Beschluss-Sammlung, Wirtschaftsplan/Abrechnung, Stimmkarten, Taschenrechner, Gesetzestext (WEG), Schreibmaterial, Protokoll-Laptop.*
    `,
    extendedTheory: `
### Vertiefung: Die professionelle Organisation der Eigentümerversammlung

Die Organisation einer Eigentümerversammlung ist eine logistische und kommunikative Herausforderung, die weit über das bloße Versenden einer Einladung hinausgeht. Eine gut vorbereitete Versammlung dauert ein bis zwei Stunden, verläuft sachlich und führt zu tragfähigen Beschlüssen. Eine schlecht vorbereitete Versammlung kann sich über viele Stunden hinziehen, in Streit enden und anfechtbare Beschlüsse produzieren.

**Die Einladung: Mehr als eine Formalität**

Die Einladung zur ETV muss mindestens drei Wochen vor dem Termin in Textform versandt werden (§ 24 Abs. 4 WEG). Textform bedeutet: Brief, E-Mail oder Fax, sofern die Eigentümer der elektronischen Kommunikation zugestimmt haben. Die Einladung muss Ort, Datum, Uhrzeit und die vollständige Tagesordnung enthalten. Jeder Beschlussgegenstand muss als eigener Tagesordnungspunkt (TOP) aufgeführt werden, und zwar so konkret, dass sich die Eigentümer auf die Abstimmung vorbereiten können.

Ein professioneller Verwalter fügt der Einladung bereits die Beschlussvorlagen bei, also den genauen Wortlaut der vorgeschlagenen Beschlüsse. Bei kostenintensiven Maßnahmen werden Kostenvoranschläge oder Gutachten beigefügt. Dies ermöglicht den Eigentümern eine fundierte Meinungsbildung vor der Versammlung und beschleunigt die Diskussion erheblich.

**Die Wahl des Versammlungsortes**

Der Versammlungsort muss für alle Eigentümer zumutbar erreichbar sein. In der Regel wird ein Raum in der Nähe der Wohnanlage gewählt, etwa ein Gemeinschaftsraum, ein Gasthof oder ein Konferenzraum. Die Versammlung in der Privatwohnung eines Eigentümers ist problematisch, da dies die Neutralität beeinträchtigen kann. Der Raum muss groß genug sein, um alle Eigentümer (oder deren Vertreter) aufzunehmen. Eine Faustregel: Pro Eigentümer sollten mindestens 2-3 Quadratmeter Fläche eingeplant werden.

**Vollmachten und Vertretung**

Eigentümer, die nicht persönlich erscheinen können, dürfen sich vertreten lassen. Die Vollmacht muss in Textform erteilt werden und sollte den Vertreter namentlich benennen. Viele Gemeinschaftsordnungen beschränken den Kreis der Vertretungsberechtigten (z.B. nur Miteigentümer, Ehegatten oder Rechtsanwälte). Der Verwalter muss die Vollmachten vor Beginn der Versammlung prüfen und ungültige Vollmachten zurückweisen.

**Die Anwesenheitsliste und Feststellung der Teilnehmer**

Zu Beginn der Versammlung wird die Anwesenheitsliste erstellt. Jeder Eigentümer (oder Vertreter) muss sich eintragen und unterschreiben. Die Liste enthält den Namen, die Einheitennummer, die Miteigentumsanteile und gegebenenfalls den Vermerk "vertreten durch". Die Anwesenheitsliste ist ein wichtiges Beweismittel für die korrekte Durchführung der Versammlung und sollte sorgfältig geführt werden.

**Der Ablauf der Versammlung**

Ein typischer Ablauf beginnt mit der Begrüßung durch den Verwalter, der Feststellung der ordnungsgemäßen Einberufung und der Genehmigung des Protokolls der letzten Versammlung. Dann werden die einzelnen TOPs in der Reihenfolge der Tagesordnung abgearbeitet. Für jeden TOP gilt: Vorstellung des Themas durch den Verwalter, Aussprache (Diskussion), Formulierung des Beschlussantrags, Abstimmung und Verkündung des Ergebnisses.

**Umgang mit schwierigen Situationen**

Erfahrene Verwalter bereiten sich auf schwierige Situationen vor: Querulanten, die die Versammlung blockieren, emotionale Ausbrüche bei strittigen Themen, Versuche einzelner Eigentümer, die Tagesordnung zu ändern, und technische Probleme bei hybriden Versammlungen. Der Verwalter hat als Versammlungsleiter das Recht, Ordnungsmaßnahmen zu ergreifen: Ermahnung, Wortentzug und als letztes Mittel den Raumverweis. Alle Maßnahmen müssen im Protokoll dokumentiert werden.

*Quellen: § 24 WEG (Einberufung, Vorsitz, Niederschrift), BGH V ZR 110/11 (Teilnahme Dritter), BGH V ZR 235/20 (Hybride Versammlung), DDIV Praxisleitfaden ETV-Organisation 2024*
`
  },

  // Tag 10: Beschlussfassung & Stimmrecht
  day_10: {
    title: "Beschlussfassung & Stimmrecht",
    type: "Recht",
    theory: `
# Wer hat die Macht? Das Stimmrecht

## 1. Das Kopfprinzip (früher Standard)
Ein Eigentümer = Eine Stimme. Egal wie viele Wohnungen er hat.

## 2. Das Wertprinzip (heute Standard gem. § 25 Abs. 2 WEG)
Stimmkraft nach Miteigentumsanteilen (MEA). Wer mehr Eigentum hat, hat mehr zu sagen.

## 3. Das Objektprinzip
Eine Wohnung = Eine Stimme.

**Wichtig:** Prüfen Sie immer zuerst die Teilungserklärung! Sie kann vom Gesetz abweichen.

## 4. Majorisierungsschutz
Hat ein Eigentümer die Mehrheit (z.B. Bauträger hält noch 60% der Anteile), kann er alles allein bestimmen. Die Rechtsprechung greift hier nur bei offensichtlichem Missbrauch ein.
    `,
    law: [
      "§ 25 WEG (Stimmrecht)",
      "§ 25 Abs. 4 WEG (Stimmrechtsausschluss bei Interessenkollision)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Beschlussfassung & Stimmrecht' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Beschlussfassung & Stimmrecht'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Beschlussfassung & Stimmrecht' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Stimmrechtsausschluss (§ 25 Abs. 4 WEG)

Ein Eigentümer darf nicht mitstimmen, wenn:
1.  Über ein Rechtsgeschäft mit ihm beschlossen wird (z.B. er soll als Hausmeister angestellt werden).
2.  Ein Rechtsstreit gegen ihn eingeleitet werden soll (z.B. Hausgeldklage).

**Fall:** Über die Entlastung des Verwaltungsbeirats wird abgestimmt. Beirat B ist auch Eigentümer. Darf er mitstimmen?
*Antwort: Nein, bei der eigenen Entlastung ist man nicht stimmberechtigt.*
    `,
    task: `
## Stimmrechts-Berechnung

WEG mit 1.000 MEA.
Anwesend: 600 MEA.

Abstimmung über Fassadensanierung (einfache Mehrheit reicht).
Ja-Stimmen: 350 MEA.
Nein-Stimmen: 200 MEA.
Enthaltungen: 50 MEA.

**Ist der Beschluss angenommen?**
*Lösungshinweis: Ja. Es zählen nur Ja und Nein. 350 > 200. Enthaltungen werden wie "nicht anwesend" behandelt.*
    `,
    extendedTheory: `
### Vertiefung: Beschlussfassung und Stimmrecht in der WEG

Das Stimmrecht ist das zentrale Mitwirkungsrecht der Wohnungseigentümer und bestimmt, wer in der Eigentümerversammlung wie viel Einfluss hat. Die WEG-Reform 2020 hat das Stimmrecht grundlegend neu geregelt und das Wertprinzip als gesetzlichen Standard eingeführt. Für den Verwalter ist die korrekte Anwendung des Stimmrechts von entscheidender Bedeutung, da Fehler bei der Stimmenauszählung den Beschluss anfechtbar machen.

**Die drei Stimmprinzipien im Vergleich**

Das Kopfprinzip (ein Eigentümer = eine Stimme) war bis zur Reform 2020 der gesetzliche Standard. Es ist einfach anzuwenden, führt aber zu Ungerechtigkeiten, wenn ein Eigentümer mehrere Wohnungen besitzt: Er hat trotzdem nur eine Stimme, obwohl er einen größeren Anteil am Gemeinschaftseigentum hält und mehr Hausgeld zahlt. Das Wertprinzip (Stimmen nach Miteigentumsanteilen) ist seit der Reform der gesetzliche Standard (§ 25 Abs. 2 WEG). Es bildet die wirtschaftliche Beteiligung am Gemeinschaftseigentum ab und wird als gerechter empfunden. Das Objektprinzip (eine Wohnung = eine Stimme) wird häufig in Gemeinschaftsordnungen vereinbart und ist ein Kompromiss zwischen Kopf- und Wertprinzip.

**Die Berechnung der Mehrheit**

Für die einfache Mehrheit gilt: Mehr Ja-Stimmen als Nein-Stimmen. Enthaltungen werden nicht mitgezählt. Beispiel: Bei 1.000 MEA sind 600 anwesend. 350 stimmen mit Ja, 200 mit Nein, 50 enthalten sich. Der Beschluss ist angenommen (350 > 200). Die Beschlussfähigkeit spielt seit der Reform keine Rolle mehr, da die ETV immer beschlussfähig ist, auch wenn nur ein einziger Eigentümer erscheint.

Für bestimmte Beschlüsse ist eine qualifizierte Mehrheit erforderlich. Die doppelt qualifizierte Mehrheit (mehr als die Hälfte aller stimmberechtigten Eigentümer und mehr als die Hälfte aller MEA) ist beispielsweise für die Änderung des Kostenverteilungsschlüssels nach § 16 Abs. 3 WEG erforderlich. Allstimmigkeit (Zustimmung aller Eigentümer) ist nur noch in wenigen Fällen nötig, etwa bei der Änderung der Teilungserklärung.

**Der Stimmrechtsausschluss**

Ein Eigentümer ist von der Abstimmung ausgeschlossen, wenn über ein Rechtsgeschäft mit ihm oder einen Rechtsstreit gegen ihn beschlossen wird (§ 25 Abs. 4 WEG). Klassische Fälle sind: Abstimmung über die Beauftragung des Eigentümers als Handwerker, Abstimmung über eine Hausgeldklage gegen den Eigentümer und Abstimmung über die Entlastung des Verwaltungsbeirats (Beiratsmitglieder dürfen nicht mitstimmen). Der Stimmrechtsausschluss ist eng auszulegen: Bei der Verwalterbestellung darf der Verwalter-Eigentümer mitstimmen, da es sich um ein Rechtsgeschäft mit der Gemeinschaft handelt, nicht mit ihm persönlich.

**Majorisierung und Minderheitenschutz**

Ein besonderes Problem entsteht, wenn ein einzelner Eigentümer die Stimmenmehrheit hält, typischerweise der Bauträger in der Anfangsphase einer WEG. Er kann theoretisch alle Beschlüsse allein fassen und die Minderheit überstimmen. Die Rechtsprechung hat hier Grenzen gezogen: Beschlüsse, die ausschließlich den Interessen des Mehrheitseigentümers dienen und die Minderheit unangemessen benachteiligen, verstoßen gegen die Grundsätze ordnungsmäßiger Verwaltung und sind anfechtbar (BGH V ZR 56/15).

**Praktische Tipps für den Verwalter**

Der Verwalter sollte vor jeder Abstimmung den Beschlussantrag klar und eindeutig formulieren und laut vorlesen. Die Abstimmung erfolgt in der Regel durch Handzeichen, bei strittigen Themen durch namentliche Abstimmung oder geheime Wahl (Stimmzettel). Das Ergebnis wird sofort verkündet und im Protokoll festgehalten. Bei knappen Ergebnissen empfiehlt sich eine namentliche Abstimmung, um spätere Streitigkeiten zu vermeiden.

*Quellen: § 25 WEG (Stimmrecht und Mehrheitsbeschluss), BGH V ZR 56/15 (Majorisierung), BGH V ZR 51/10 (Stimmrechtsausschluss), WEG-Reform 2020 Begründung BT-Drs. 19/18791*
`
  },

  // Tag 11: Protokollführung
  day_11: {
    title: "Das Versammlungsprotokoll",
    type: "Recht",
    theory: `
# Das Protokoll: Die Urkunde der Beschlüsse

Das Protokoll (§ 24 Abs. 6 WEG) beweist, was beschlossen wurde.

## 1. Form
- Schriftlich.
- Unterschrieben vom Verwalter, einem Beirat und (meist) einem weiteren Eigentümer.

## 2. Inhalt
- Ort, Zeit, Teilnehmer.
- Feststellung der Beschlussfähigkeit (obsolet, aber formell gut).
- Wortlaut der Anträge.
- Abstimmungsergebnis (Ja / Nein / Enthaltung).
- Verkündung des Ergebnisses ("Der Verwalter verkündet: Der Antrag ist angenommen.").

## 3. Die Beschluss-Sammlung (§ 24 Abs. 7 WEG)
Zusätzlich zum Protokoll muss der Verwalter eine Beschluss-Sammlung führen.
- Chronologische Sammlung aller Beschlüsse.
- Nur der Wortlaut des Beschlusses (keine Diskussionen).
- Dient der Transparenz für Käufer (Einsichtnahme vor Kauf!).
    `,
    law: [
      "§ 24 Abs. 6 WEG (Niederschrift)",
      "§ 24 Abs. 7 WEG (Beschluss-Sammlung)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Das Versammlungsprotokoll' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Das Versammlungsprotokoll'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Das Versammlungsprotokoll' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Fehler im Protokoll

Ein falsches Protokoll macht den Beschluss nicht automatisch nichtig, aber es schafft Beweisprobleme.

**Tipp:** Formulieren Sie den Beschlussantrag VOR der Abstimmung schriftlich und lesen Sie ihn laut vor. Nehmen Sie genau diesen Wortlaut ins Protokoll auf.

*Schlechtes Beispiel:* "Die Eigentümer beschließen, das Dach zu machen." (Zu unbestimmt!)
*Gutes Beispiel:* "Die Eigentümer beschließen die Sanierung des Flachdachs gemäß Angebot der Fa. Dach-Profis vom 12.03.2025 über brutto 45.000 €. Die Finanzierung erfolgt durch Entnahme aus der Rücklage."
    `,
    task: `
## Protokoll-Korrektur

Sie lesen in einem Protokoll:
"TOP 4: Herr Müller regt an, den Flur zu streichen. Alle finden das gut. Man wird sich Angebote einholen."

**Ist das ein wirksamer Beschluss zur Beauftragung eines Malers?**
*Lösungshinweis: Nein. Das ist nur eine Absichtserklärung ("Vorbereitungsbeschluss"). Es fehlt die konkrete Beauftragung, der Kostenrahmen und die Finanzierung. Ein Maler darf daraufhin noch nicht beauftragt werden.*
    `,
    extendedTheory: `
### Vertiefung: Das Versammlungsprotokoll als Beweisdokument und Verwaltungsinstrument

Das Protokoll der Eigentümerversammlung ist weit mehr als eine formale Pflichtübung. Es ist das zentrale Beweisdokument für alle gefassten Beschlüsse und bildet die Grundlage für die Umsetzung durch den Verwalter. Ein fehlerhaftes oder unvollständiges Protokoll kann weitreichende Konsequenzen haben: Es kann die Beweiskraft von Beschlüssen schwächen, Anfechtungsklagen erleichtern und den Verwalter in Haftungssituationen bringen.

**Die gesetzlichen Anforderungen nach § 24 Abs. 6 WEG**

Das Gesetz verlangt, dass über die in der Versammlung gefassten Beschlüsse eine Niederschrift aufgenommen wird. Diese muss von dem Vorsitzenden (in der Regel dem Verwalter) und einem Wohnungseigentümer sowie, falls ein Verwaltungsbeirat bestellt ist, auch von dessen Vorsitzenden oder seinem Vertreter unterschrieben werden. Die Niederschrift ist jedem Wohnungseigentümer auf Verlangen zur Einsicht zu geben.

In der Praxis hat sich ein Standard herausgebildet, der über die gesetzlichen Mindestanforderungen hinausgeht. Ein professionelles Protokoll enthält: Datum, Uhrzeit und Ort der Versammlung, die Namen der anwesenden und vertretenen Eigentümer mit ihren Miteigentumsanteilen, die Feststellung der ordnungsgemäßen Einberufung, den genauen Wortlaut jedes Beschlussantrags, das Abstimmungsergebnis (Ja/Nein/Enthaltung) mit Angabe der Stimmen oder MEA, die Verkündung des Ergebnisses durch den Verwalter und gegebenenfalls Widersprüche einzelner Eigentümer zu Protokoll.

**Die Beschluss-Sammlung nach § 24 Abs. 7 WEG**

Neben dem Protokoll ist der Verwalter verpflichtet, eine Beschluss-Sammlung zu führen. Diese enthält chronologisch alle Beschlüsse der Gemeinschaft, und zwar nur den reinen Beschlusswortlaut ohne Diskussionen oder Begründungen. Die Beschluss-Sammlung dient der Transparenz: Jeder Eigentümer und jeder Kaufinteressent hat das Recht, sie einzusehen. Für Käufer ist die Beschluss-Sammlung besonders wichtig, da sie Auskunft über bestehende Verpflichtungen, geplante Maßnahmen und die Verwaltungspraxis der Gemeinschaft gibt.

**Typische Protokollierungsfehler und ihre Konsequenzen**

Die häufigsten Fehler in der Praxis sind: zu ungenaue Beschlussformulierungen ("Die Eigentümer beschließen, das Dach zu reparieren" statt einer konkreten Beauftragung mit Kostenrahmen), fehlende Angabe des Abstimmungsergebnisses, Vermischung von Beschlüssen und Diskussionsbeiträgen, nachträgliche Änderungen am Protokoll ohne Kennzeichnung und verspäteter Versand an die Eigentümer.

Ein besonders kritischer Fehler ist die falsche Verkündung des Abstimmungsergebnisses. Der Beschluss entsteht nicht durch die Abstimmung selbst, sondern durch die Verkündung des Ergebnisses durch den Versammlungsleiter. Verkündet der Verwalter ein falsches Ergebnis (z.B. "angenommen" statt "abgelehnt"), ist der verkündete Beschluss zunächst wirksam und muss innerhalb der Anfechtungsfrist angefochten werden.

**Digitale Protokollierung und moderne Tools**

Moderne Verwaltungssoftware bietet Funktionen zur digitalen Protokollierung direkt während der Versammlung. Der Verwalter kann Beschlussvorlagen vorab anlegen, das Abstimmungsergebnis per Tablet erfassen und das Protokoll unmittelbar nach der Versammlung generieren. Einige Systeme ermöglichen sogar die digitale Unterschrift der Protokollunterzeichner. Dies beschleunigt den Prozess erheblich und reduziert Fehler.

**Die Aufbewahrungspflicht**

Protokolle und Beschluss-Sammlungen müssen dauerhaft aufbewahrt werden, da Beschlüsse unbefristet gelten, sofern sie nicht aufgehoben werden. Bei einem Verwalterwechsel ist der bisherige Verwalter verpflichtet, alle Unterlagen einschließlich der Protokolle und der Beschluss-Sammlung an den neuen Verwalter herauszugeben. Die Verweigerung der Herausgabe kann zivilrechtlich durchgesetzt werden und stellt einen schwerwiegenden Pflichtverstoß dar.

*Quellen: § 24 Abs. 6, 7 WEG, BGH V ZR 51/10 (Verkündung des Beschlussergebnisses), BGH V ZR 169/17 (Beschluss-Sammlung), DDIV Musterprotokoll 2024*
`
  },

  // Tag 12: Anfechtungsklage
  day_12: {
    title: "Die Beschlussanfechtung",
    type: "Recht",
    theory: `
# Wenn Eigentümer nicht einverstanden sind

Gegen Beschlüsse kann jeder Eigentümer Klage erheben (§ 44 WEG).

## 1. Fristen (Das "Heilige Monat")
- **Anfechtungsfrist:** 1 Monat ab Beschlussfassung (nicht ab Protokollversand!).
- **Begründungsfrist:** 2 Monate ab Beschlussfassung.

Werden die Fristen versäumt, wird der Beschluss **bestandskräftig** (gültig), selbst wenn er inhaltlich falsch war (außer bei Nichtigkeit).

## 2. Anfechtbar vs. Nichtig
- **Anfechtbar:** Fehler bei Einladung, Stimmrecht, ordnungsmäßiger Verwaltung. Wird gültig, wenn keiner klagt.
- **Nichtig:** Verstoß gegen fundamentale Rechtsgrundsätze, Sittenwidrigkeit oder Kernbereich des Eigentums. Ist von Anfang an unwirksam, auch ohne Klagefrist.

## 3. Klagegegner
Die Klage richtet sich gegen die **Gemeinschaft der Wohnungseigentümer**, nicht gegen den Verwalter oder den Nachbarn.
    `,
    law: [
      "§ 44 WEG (Beschlussklage)",
      "§ 45 WEG (Wirkung des Urteils)",
      "§ 23 Abs. 4 WEG (Nichtigkeit)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Die Beschlussanfechtung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Die Beschlussanfechtung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Die Beschlussanfechtung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Die Zitterpartie für den Verwalter

Solange die Anfechtungsfrist läuft, sollte der Verwalter Beschlüsse nicht umsetzen (außer Notmaßnahmen), um Rückabwicklungen zu vermeiden.

**Beispiel:** Die ETV beschließt den Bau eines Spielplatzes. Ein Eigentümer klagt.
-> Baut der Verwalter sofort und das Gericht kassiert den Beschluss, muss der Spielplatz abgerissen werden. Der Verwalter könnte haftbar gemacht werden.
    `,
    task: `
## Fristenberechnung

Versammlung am 15.03.
Protokollversand am 20.03.
Eigentümer E will klagen.

**Bis wann muss die Klage bei Gericht eingegangen sein?**
*Lösungshinweis: Bis zum 15.04. (ein Monat nach Beschlussfassung). Das Datum des Protokollversands ist irrelevant!*
    `,
    extendedTheory: `
### Vertiefung: Die Beschlussanfechtung als Rechtsschutzinstrument der Eigentümer

Die Beschlussanfechtungsklage ist das zentrale Rechtsschutzinstrument für Wohnungseigentümer, die mit einem Beschluss der Eigentümerversammlung nicht einverstanden sind. Sie dient der gerichtlichen Überprüfung von Beschlüssen und stellt sicher, dass die Grundsätze ordnungsmäßiger Verwaltung eingehalten werden. Für den Verwalter ist das Verständnis der Anfechtungsvoraussetzungen und -fristen von existenzieller Bedeutung, da fehlerhafte Beschlüsse zu seiner persönlichen Haftung führen können.

**Die Unterscheidung zwischen Anfechtbarkeit und Nichtigkeit**

Das WEG unterscheidet streng zwischen anfechtbaren und nichtigen Beschlüssen. Anfechtbare Beschlüsse sind zunächst wirksam und werden erst durch ein rechtskräftiges Gerichtsurteil aufgehoben. Wird nicht innerhalb der Anfechtungsfrist geklagt, wird der Beschluss bestandskräftig, auch wenn er inhaltlich fehlerhaft war. Nichtige Beschlüsse sind dagegen von Anfang an unwirksam, unabhängig davon, ob jemand klagt. Die Nichtigkeit kann jederzeit geltend gemacht werden, es gibt keine Frist.

Anfechtungsgründe sind: Einladungsmängel (zu kurze Frist, fehlende TOPs), Verstöße gegen das Stimmrecht (falscher Ausschluss, falsche Auszählung), Verstöße gegen die Grundsätze ordnungsmäßiger Verwaltung (unverhältnismäßige Kosten, fehlende Vergleichsangebote) und formale Fehler bei der Beschlussfassung. Nichtigkeitsgründe sind: Verstoß gegen zwingendes Recht, Sittenwidrigkeit, Eingriff in den Kernbereich des Sondereigentums und Beschlüsse ohne jede Beschlusskompetenz.

**Die Anfechtungsfrist: Das "Heilige Monat"**

Die Anfechtungsklage muss innerhalb eines Monats nach der Beschlussfassung erhoben werden (§ 45 Satz 1 WEG). Entscheidend ist das Datum der Versammlung, nicht der Zugang des Protokolls. Die Klage muss innerhalb dieser Frist bei Gericht eingehen, nicht nur abgesandt werden. Die Begründung der Klage kann innerhalb von zwei Monaten nach der Beschlussfassung nachgereicht werden.

In der Praxis ist die Fristberechnung manchmal komplex: Fällt das Fristende auf einen Samstag, Sonntag oder Feiertag, verlängert sich die Frist auf den nächsten Werktag. Bei Umlaufbeschlüssen beginnt die Frist mit der Verkündung des Beschlussergebnisses durch den Verwalter.

**Der Klagegegner und die Kosten**

Seit der WEG-Reform 2020 richtet sich die Anfechtungsklage gegen die Gemeinschaft der Wohnungseigentümer (§ 44 Abs. 2 WEG), nicht mehr gegen die übrigen Eigentümer. Dies vereinfacht das Verfahren erheblich, da nur noch ein Klagegegner existiert. Die Gemeinschaft wird im Prozess durch den Verwalter vertreten.

Die Kosten eines Anfechtungsverfahrens sind nicht unerheblich. Der Streitwert richtet sich nach dem wirtschaftlichen Interesse des Klägers am Beschluss, mindestens aber nach dem Gesamtinteresse aller Eigentümer. Bei einer Klage gegen einen Sanierungsbeschluss über 100.000 Euro kann der Streitwert schnell 20.000-50.000 Euro betragen, was Gerichts- und Anwaltskosten von mehreren tausend Euro nach sich zieht. Die unterlegene Partei trägt die Kosten.

**Einstweiliger Rechtsschutz**

In dringenden Fällen kann der klagende Eigentümer eine einstweilige Verfügung beantragen, um die Umsetzung des Beschlusses bis zur Entscheidung in der Hauptsache zu verhindern. Dies ist insbesondere bei irreversiblen Maßnahmen relevant, etwa dem Fällen von Bäumen oder dem Abriss von Gebäudeteilen. Die Hürden für eine einstweilige Verfügung sind hoch: Der Kläger muss die Dringlichkeit und die überwiegende Wahrscheinlichkeit des Erfolgs in der Hauptsache glaubhaft machen.

**Praktische Empfehlungen für den Verwalter**

Der Verwalter sollte nach jeder ETV die Anfechtungsfrist im Kalender notieren und während dieser Zeit keine irreversiblen Maßnahmen umsetzen. Bei strittigen Beschlüssen empfiehlt es sich, die Eigentümer auf die Möglichkeit der Anfechtung hinzuweisen und die Gründe für den Beschluss sorgfältig zu dokumentieren. Eine gute Vorbereitung der Beschlussvorlagen mit Kostenvergleichen und Gutachten reduziert das Anfechtungsrisiko erheblich.

*Quellen: §§ 44, 45 WEG, BGH V ZR 51/21 (Anfechtungsfrist bei Umlaufbeschluss), BGH V ZR 176/18 (Streitwert), BGH V ZR 56/15 (Ordnungsmäßige Verwaltung)*
`
  },

  // WOCHE 4: Mietverwaltung (Tag 13-16)

  // Tag 13: Sondereigentumsverwaltung (SEV)
  day_13: {
    title: "Die Sondereigentumsverwaltung (SEV)",
    type: "Mietverwaltung",
    theory: `
# SEV: Der Verwalter als "Vermieter"

Oft beauftragen Kapitalanleger den WEG-Verwalter zusätzlich mit der Verwaltung ihrer einzelnen Wohnung (Sondereigentumsverwaltung).

## 1. Abgrenzung zur WEG-Verwaltung
- **WEG-Verwaltung:** Kümmert sich um Gemeinschaftseigentum (Dach, Flur) und die Gemeinschaft. Vertragspartner: Die WEG.
- **SEV:** Kümmert sich um die Vermietung der Wohnung, den Mieter und das Sondereigentum. Vertragspartner: Der einzelne Eigentümer.

## 2. Aufgaben der SEV
- Suche und Auswahl von Mietern.
- Abschluss von Mietverträgen.
- Vereinnahmung der Miete (Mietinkasso).
- Erstellung der Betriebskostenabrechnung für den Mieter.
- Durchführung von Schönheitsreparaturen / Wohnungsübergaben.

## 3. Vergütung
Wird separat vergütet (meist % der Kaltmiete oder Festbetrag pro Monat).
    `,
    law: [
      "§ 675 BGB (Geschäftsbesorgungsvertrag)",
      "§ 535 BGB (Mietvertrag)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Die Sondereigentumsverwaltung (SEV)' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Die Sondereigentumsverwaltung (SEV)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Die Sondereigentumsverwaltung (SEV)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Der "Durchlaufposten" Hausgeld

Als SEV-Verwalter müssen Sie die WEG-Abrechnung (Eigentümer-Ebene) in die Betriebskostenabrechnung (Mieter-Ebene) "übersetzen".

**Achtung:** Nicht alle Kosten der WEG sind auf den Mieter umlagefähig!
- **Umlagefähig:** Wasser, Heizung, Hausmeister, Versicherung, Grundsteuer.
- **Nicht umlagefähig:** Verwaltergebühr, Instandhaltungsrücklage, Bankgebühren der WEG.

**Fehlerquelle:** Einfach die "Nachzahlung" aus der WEG-Abrechnung an den Mieter weiterreichen, ist fast immer falsch!
    `,
    task: `
## Kosten-Sortierung

Sie erstellen die Abrechnung für Mieter M. Welche Kosten dürfen Sie umlegen?

1.  Gebäudeversicherung (Ja/Nein)
2.  Reparatur der Haustür (Ja/Nein)
3.  Verwalterhonorar (Ja/Nein)
4.  Grundsteuer (Ja/Nein)
5.  Zuführung zur Rücklage (Ja/Nein)

*Lösungshinweis: 1. Ja, 2. Nein (Instandhaltung), 3. Nein (Verwaltungskosten), 4. Ja, 5. Nein.*
    `,
    extendedTheory: `
### Vertiefung: Die Sondereigentumsverwaltung (SEV) als eigenständiges Geschäftsfeld

Die Sondereigentumsverwaltung (SEV) ist ein eigenständiges Geschäftsfeld, das sich grundlegend von der WEG-Verwaltung unterscheidet. Während der WEG-Verwalter das Gemeinschaftseigentum und die Belange der Eigentümergemeinschaft betreut, kümmert sich der SEV-Verwalter um die Vermietung und Verwaltung einzelner Wohnungen im Auftrag des jeweiligen Eigentümers. Viele Verwaltungsunternehmen bieten beide Leistungen an, was Synergien schafft, aber auch klare organisatorische Trennung erfordert.

**Rechtliche Grundlagen der SEV**

Die SEV basiert auf einem Geschäftsbesorgungsvertrag nach § 675 BGB zwischen dem Eigentümer und dem Verwalter. Anders als der WEG-Verwaltervertrag, der durch Beschluss der ETV zustande kommt, wird der SEV-Vertrag individuell zwischen dem Eigentümer und dem Verwalter geschlossen. Der Vertrag sollte den Leistungsumfang, die Vergütung, die Haftung, die Vollmachten und die Kündigungsfristen klar regeln.

**Die Kernaufgaben im Detail**

Die Mietersuche und -auswahl umfasst die Erstellung und Schaltung von Inseraten, die Durchführung von Besichtigungen, die Bonitätsprüfung der Interessenten (SCHUFA-Auskunft, Einkommensnachweis, Mietschuldenfreiheitsbescheinigung) und die Auswahl des geeigneten Mieters. Der Verwalter handelt dabei im Namen und auf Rechnung des Eigentümers und muss dessen Interessen wahren, gleichzeitig aber das Allgemeine Gleichbehandlungsgesetz (AGG) beachten.

Das Mietinkasso umfasst die Überwachung der Mieteingänge, das Mahnwesen bei Zahlungsverzug und gegebenenfalls die Einleitung rechtlicher Schritte. Der Verwalter sollte ein professionelles Mahnwesen implementieren: erste Mahnung nach 5 Werktagen Verzug, zweite Mahnung nach weiteren 10 Tagen, Ankündigung rechtlicher Schritte nach 30 Tagen. Bei Zahlungsverzug von mehr als einer Monatsmiete sollte der Eigentümer informiert und das weitere Vorgehen abgestimmt werden.

**Die Betriebskostenabrechnung für Mieter**

Die Erstellung der Betriebskostenabrechnung für den Mieter ist eine der anspruchsvollsten Aufgaben der SEV. Der Verwalter muss die WEG-Abrechnung (Eigentümerebene) in eine Betriebskostenabrechnung (Mieterebene) "übersetzen". Dabei gelten strenge Regeln: Nur die in § 2 der Betriebskostenverordnung (BetrKV) aufgeführten Kostenarten sind umlagefähig. Nicht umlagefähig sind insbesondere die Verwaltergebühr, die Zuführung zur Erhaltungsrücklage, Instandhaltungskosten und Bankgebühren der WEG.

Die Abrechnungsfrist beträgt 12 Monate nach Ende des Abrechnungszeitraums (§ 556 Abs. 3 BGB). Versäumt der Verwalter diese Frist, kann der Eigentümer keine Nachforderungen mehr geltend machen, der Mieter behält aber seinen Anspruch auf ein Guthaben. Dies ist ein erhebliches Haftungsrisiko für den SEV-Verwalter.

**Vergütungsmodelle**

Die Vergütung der SEV wird individuell vereinbart. Übliche Modelle sind: ein prozentualer Anteil der Nettokaltmiete (typisch 5-8 Prozent), ein Festbetrag pro Einheit und Monat (typisch 25-40 Euro) oder eine Kombination aus Grundgebühr und erfolgsabhängiger Komponente. Zusätzlich werden häufig Sonderleistungen separat vergütet, etwa die Neuvermietung (1-2 Nettokaltmieten), die Durchführung von Modernisierungsmaßnahmen oder die Begleitung von Rechtsstreitigkeiten.

**Haftung und Versicherung**

Der SEV-Verwalter haftet dem Eigentümer für Pflichtverletzungen nach den allgemeinen Regeln des Geschäftsbesorgungsvertrags. Typische Haftungsfälle sind: verspätete Betriebskostenabrechnung (Nachforderung verfällt), unzureichende Bonitätsprüfung des Mieters (Mietausfall), Versäumnis der Kündigung bei Zahlungsverzug und fehlerhafte Mieterhöhung. Eine Vermögensschadenhaftpflichtversicherung ist daher auch für die SEV unverzichtbar.

*Quellen: § 675 BGB (Geschäftsbesorgung), § 556 BGB (Betriebskosten), BetrKV (Betriebskostenverordnung), BGH VIII ZR 137/15 (Abrechnungsfrist), AGG (Allgemeines Gleichbehandlungsgesetz)*
`
  },

  // Tag 14: Der Mietvertrag
  day_14: {
    title: "Der Wohnraum-Mietvertrag",
    type: "Recht",
    theory: `
# Der Mietvertrag: Das Fundament

Das deutsche Mietrecht ist sehr mieterfreundlich. Fehler im Vertrag gehen fast immer zu Lasten des Vermieters.

## 1. Formularverträge (AGB-Recht)
Die meisten Mietverträge sind AGB. Unklare Klauseln sind unwirksam (§ 307 BGB).

## 2. Wichtige Regelungen
- **Miete:** Mietpreisbremse beachten! Indexmiete oder Staffelmiete vereinbaren, um Erhöhungen zu sichern.
- **Betriebskosten:** Müssen explizit als "vom Mieter zu tragen" vereinbart werden (Verweis auf BetrKV). Sonst ist die Miete eine Inklusivmiete!
- **Schönheitsreparaturen:** Starre Fristen ("alle 3 Jahre streichen") sind unwirksam. Klauseln müssen flexibel sein.
- **Kaution:** Max. 3 Nettokaltmieten. Darf in 3 Raten gezahlt werden.

## 3. Befristung
Ein "Zeitmietvertrag" ist nur noch mit qualifiziertem Grund möglich (z.B. Eigenbedarf, geplante Sanierung) gem. § 575 BGB. Einfache Befristung "einfach so" ist unwirksam -> Vertrag läuft auf unbestimmte Zeit.
    `,
    law: [
      "§ 535 BGB (Inhalt Mietvertrag)",
      "§ 551 BGB (Kaution)",
      "§ 556 BGB (Betriebskosten)",
      "§ 575 BGB (Zeitmietvertrag)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Der Wohnraum-Mietvertrag' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Der Wohnraum-Mietvertrag'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Der Wohnraum-Mietvertrag' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Die Wohnungsübergabe

Das Übergabeprotokoll ist das wichtigste Beweismittel beim Auszug.

**Tipp:** Dokumentieren Sie alles genau (Fotos!). Zählerstände, Anzahl der Schlüssel, Kratzer im Parkett.

Was im Protokoll steht (und vom Mieter unterschrieben ist), gilt. Werden Mängel *nicht* notiert, gilt die Wohnung als mangelfrei übergeben (Beweislastumkehr).
    `,
    task: `
## Klausel-Check

Im Mietvertrag steht: "Der Mieter muss beim Auszug pauschal 500 € für Renovierungen zahlen."

**Ist diese Klausel wirksam?**
*Lösungshinweis: Nein. Pauschale Abgeltungsklauseln ohne Bezug zum tatsächlichen Zustand sind unwirksam, da sie den Mieter unangemessen benachteiligen.*
    `,
    extendedTheory: `
### Vertiefung: Der Wohnraum-Mietvertrag als rechtliches Fundament der Vermietung

Der Wohnraum-Mietvertrag ist das rechtliche Fundament jedes Mietverhältnisses und unterliegt dem besonderen Schutz des deutschen Mietrechts. Das Bürgerliche Gesetzbuch (BGB) enthält in den §§ 535-580a umfangreiche Regelungen, die überwiegend zugunsten des Mieters zwingend sind, also nicht durch Vertrag abbedungen werden können. Für den Verwalter in der Sondereigentumsverwaltung ist die fehlerfreie Gestaltung des Mietvertrags von zentraler Bedeutung, da unwirksame Klauseln den Vermieter erheblich benachteiligen können.

**AGB-Kontrolle bei Formularmietverträgen**

Die meisten Mietverträge sind vorformulierte Vertragsbedingungen (AGB) im Sinne der §§ 305 ff. BGB. Dies hat weitreichende Konsequenzen: Unklare Klauseln gehen zulasten des Verwenders (Vermieter), überraschende Klauseln werden nicht Vertragsbestandteil, und Klauseln, die den Mieter unangemessen benachteiligen, sind unwirksam. Die Rechtsprechung hat im Laufe der Jahre zahlreiche Mietvertragsklauseln für unwirksam erklärt, insbesondere im Bereich der Schönheitsreparaturen und der Betriebskosten.

**Schönheitsreparaturen: Die Dauerbaustelle des Mietrechts**

Kaum ein Thema hat die Gerichte so beschäftigt wie die Schönheitsreparaturklauseln. Nach der aktuellen BGH-Rechtsprechung sind folgende Klauseln unwirksam: starre Fristenpläne ("alle 3 Jahre Küche und Bad, alle 5 Jahre Wohnräume"), Endrenovierungsklauseln ("bei Auszug ist die Wohnung renoviert zurückzugeben"), Quotenabgeltungsklauseln ("anteilige Renovierungskosten bei Auszug vor Fristablauf") und Farbwahlklauseln, die den Mieter während der Mietzeit auf bestimmte Farben festlegen.

Wirksam sind dagegen flexible Fristenpläne ("im Allgemeinen" oder "in der Regel"), die dem Mieter einen Beurteilungsspielraum lassen. Die Übertragung der Schönheitsreparaturen auf den Mieter setzt zudem voraus, dass die Wohnung zu Beginn des Mietverhältnisses renoviert übergeben wurde. Wurde die Wohnung unrenoviert übergeben, muss der Vermieter dem Mieter einen angemessenen Ausgleich gewähren.

**Die Mietpreisbremse: Regulierung in angespannten Märkten**

In Gebieten mit angespanntem Wohnungsmarkt gilt die Mietpreisbremse (§§ 556d ff. BGB). Die Miete darf bei Neuvermietung höchstens 10 Prozent über der ortsüblichen Vergleichsmiete liegen. Ausnahmen gelten für Neubauten (Erstbezug nach dem 1. Oktober 2014), umfassend modernisierte Wohnungen und Fälle, in denen die Vormiete bereits über der Grenze lag. Der Verwalter muss die Mietpreisbremse bei der Festlegung der Miete berücksichtigen und dem Mieter vor Vertragsschluss unaufgefordert Auskunft über die Vormiete geben.

**Kaution: Sicherheit für den Vermieter**

Die Mietkaution ist auf maximal drei Nettokaltmieten begrenzt (§ 551 BGB). Der Mieter darf die Kaution in drei gleichen monatlichen Raten zahlen, die erste Rate ist bei Beginn des Mietverhältnisses fällig. Der Vermieter muss die Kaution getrennt von seinem Vermögen bei einem Kreditinstitut zu dem für Spareinlagen mit dreimonatiger Kündigungsfrist üblichen Zinssatz anlegen. Die Zinsen stehen dem Mieter zu und erhöhen die Sicherheit.

**Befristete Mietverträge: Enge Grenzen**

Ein Zeitmietvertrag ist nur mit qualifiziertem Grund möglich (§ 575 BGB). Zulässige Gründe sind: Eigenbedarf nach Ablauf der Mietzeit, geplante Beseitigung oder wesentliche Veränderung der Mietsache und geplante Vermietung an Betriebsangehörige. Der Grund muss im Mietvertrag schriftlich angegeben werden. Eine Befristung "einfach so" oder mit unzulässigem Grund führt dazu, dass der Vertrag als unbefristet gilt.

**Praktische Empfehlungen für die Vertragsgestaltung**

Der Verwalter sollte stets aktuelle Mietvertragsformulare verwenden, die der aktuellen Rechtsprechung entsprechen. Empfehlenswert sind die Formulare der Haus- und Grundeigentümervereine oder spezialisierter Verlage. Individuelle Vereinbarungen sollten klar als solche gekennzeichnet und von einem Rechtsanwalt geprüft werden. Besonders wichtig ist die vollständige und korrekte Vereinbarung der Betriebskostenumlegung mit Verweis auf die BetrKV.

*Quellen: §§ 535-580a BGB, § 551 BGB (Kaution), §§ 556d ff. BGB (Mietpreisbremse), BGH VIII ZR 185/14 (Schönheitsreparaturen), BGH VIII ZR 329/19 (Quotenabgeltung)*
`
  },

  // Tag 15: Kündigung & Räumung
  day_15: {
    title: "Kündigung & Räumung",
    type: "Recht",
    theory: `
# Wenn es zu Ende geht: Die Kündigung

## 1. Kündigung durch den Mieter
- Frist: 3 Monate zum Monatsende. Keine Begründung nötig.

## 2. Kündigung durch den Vermieter
Braucht immer einen gesetzlichen Grund (§ 573 BGB):
- **Eigenbedarf:** Vermieter braucht Wohnung für sich oder Angehörige.
- **Pflichtverletzung:** Zahlungsverzug (Fristlos!), ständige Lärmbelästigung.
- **Wirtschaftliche Verwertung:** Abriss und Neubau (sehr streng).

## 3. Fristlose Kündigung (§ 543 BGB)
Möglich, wenn der Mieter:
- Für zwei aufeinanderfolgende Termine mit der Miete (oder einem erheblichen Teil) in Verzug ist.
- Über einen längeren Zeitraum mit insgesamt 2 Monatsmieten im Rückstand ist.
    `,
    law: [
      "§ 573 BGB (Ordentliche Kündigung)",
      "§ 543 BGB (Außerordentliche fristlose Kündigung)",
      "§ 569 BGB (Zahlungsverzug)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Kündigung & Räumung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Kündigung & Räumung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Kündigung & Räumung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Die Räumungsklage

Zieht der Mieter trotz Kündigung nicht aus, darf der Vermieter nicht einfach das Schloss austauschen ("Verbotene Eigenmacht").

**Der Weg:**
1.  Kündigung.
2.  Widerspruchsfrist abwarten.
3.  Räumungsklage beim Amtsgericht.
4.  Räumungstitel (Urteil).
5.  Gerichtsvollzieher beauftragen (Berliner Räumung als kostengünstige Variante).

Dauer: Oft 6-12 Monate. Hohes Kostenrisiko.
    `,
    task: `
## Fallbeispiel

Mieter M zahlt im Januar keine Miete, im Februar nur die Hälfte und im März wieder nichts.

**Kann der Vermieter fristlos kündigen?**
*Lösungshinweis: Ja. Der Rückstand beträgt mehr als eine Monatsmiete (Januar + März = 2 Mieten, plus halber Februar). Die Voraussetzungen des § 543 BGB sind erfüllt.*
    `,
    extendedTheory: `
### Vertiefung: Kündigung und Räumung als rechtlich komplexer Prozess

Die Beendigung eines Mietverhältnisses gehört zu den rechtlich anspruchsvollsten und emotional belastendsten Bereichen der Immobilienverwaltung. Das deutsche Mietrecht schützt den Mieter in besonderem Maße vor dem Verlust seiner Wohnung, was sich in strengen formalen Anforderungen an die Kündigung und einem langwierigen Räumungsverfahren niederschlägt. Für den Verwalter in der Sondereigentumsverwaltung ist die fehlerfreie Durchführung des Kündigungsprozesses von entscheidender Bedeutung, da formale Fehler die Kündigung unwirksam machen und den Eigentümer erheblich schädigen können.

**Die ordentliche Kündigung durch den Vermieter**

Der Vermieter kann ein unbefristetes Mietverhältnis nur kündigen, wenn er ein berechtigtes Interesse nachweisen kann (§ 573 BGB). Die drei gesetzlich anerkannten Kündigungsgründe sind: Eigenbedarf (der Vermieter benötigt die Wohnung für sich, seine Familienangehörigen oder Angehörige seines Haushalts), schuldhafte erhebliche Vertragsverletzung durch den Mieter und Hinderung angemessener wirtschaftlicher Verwertung des Grundstücks.

Die Kündigungsfrist richtet sich nach der Dauer des Mietverhältnisses: bis 5 Jahre Mietdauer beträgt sie 3 Monate, bis 8 Jahre 6 Monate und ab 8 Jahren 9 Monate. Die Kündigung muss schriftlich erfolgen (nicht nur Textform!) und den Kündigungsgrund konkret benennen. Bei Eigenbedarf muss die Person, für die die Wohnung benötigt wird, namentlich genannt und das Interesse konkret dargelegt werden.

**Die fristlose Kündigung wegen Zahlungsverzugs**

Die fristlose Kündigung wegen Zahlungsverzugs (§ 543 Abs. 2 Nr. 3 BGB) ist der häufigste Fall der außerordentlichen Kündigung. Die Voraussetzungen sind: Der Mieter ist für zwei aufeinanderfolgende Termine mit der Entrichtung der Miete oder eines nicht unerheblichen Teils in Verzug, oder der Mieter ist in einem Zeitraum, der sich über mehr als zwei Termine erstreckt, mit der Entrichtung der Miete in Höhe eines Betrages in Verzug, der die Miete für zwei Monate erreicht.

"Nicht unerheblicher Teil" bedeutet nach der Rechtsprechung mehr als eine Monatsmiete. Bei der Berechnung werden Betriebskostenvorauszahlungen einbezogen. Die fristlose Kündigung wird unwirksam, wenn der Mieter den gesamten Rückstand innerhalb von zwei Monaten nach Zustellung der Räumungsklage begleicht (Schonfristzahlung nach § 569 Abs. 3 Nr. 2 BGB). Diese Heilungsmöglichkeit besteht allerdings nur einmal innerhalb von zwei Jahren.

**Die Eigenbedarfskündigung in der Praxis**

Die Eigenbedarfskündigung ist in der Praxis besonders konfliktträchtig und wird von Gerichten streng geprüft. Der Vermieter muss den Eigenbedarf konkret darlegen: Wer benötigt die Wohnung, warum und ab wann? Ein vorgeschobener Eigenbedarf (der Vermieter will in Wahrheit die Wohnung teurer vermieten) macht die Kündigung unwirksam und kann Schadensersatzansprüche des Mieters auslösen. Der Mieter hat das Recht, der Kündigung zu widersprechen, wenn der Umzug für ihn eine unzumutbare Härte darstellen würde (Sozialklausel, § 574 BGB). Typische Härtegründe sind: hohes Alter, schwere Krankheit, Schwangerschaft oder fehlende Ersatzwohnung.

**Das Räumungsverfahren: Der Weg zum Gerichtsvollzieher**

Zieht der Mieter trotz wirksamer Kündigung nicht aus, darf der Vermieter keinesfalls eigenmächtig handeln. Das Austauschen von Schlössern, das Abstellen von Versorgungsleitungen oder das Entfernen von Möbeln ist verbotene Eigenmacht (§ 858 BGB) und strafbar. Der einzige legale Weg ist die Räumungsklage beim zuständigen Amtsgericht.

Das Räumungsverfahren dauert in der Regel 6-12 Monate, in Ballungsräumen auch länger. Der Ablauf ist: Erhebung der Räumungsklage, Zustellung an den Mieter, mündliche Verhandlung, Urteil, Rechtskraft (nach Ablauf der Berufungsfrist), Beauftragung des Gerichtsvollziehers und Durchführung der Räumung. Die Kosten können erheblich sein: Gerichtskosten, Anwaltskosten, Kosten des Gerichtsvollziehers und Kosten für den Abtransport und die Einlagerung der Möbel.

**Die Berliner Räumung als kostengünstige Alternative**

Die sogenannte Berliner Räumung ist eine kostengünstige Variante, bei der der Gerichtsvollzieher nur den Besitz an der Wohnung verschafft, die Möbel aber in der Wohnung belässt. Der Vermieter übernimmt die Verwahrung der Gegenstände und kann nach Ablauf einer angemessenen Frist (in der Regel 4-6 Wochen) über sie verfügen. Dies spart die erheblichen Kosten für Spedition und Einlagerung, birgt aber Risiken bei der Bewertung und Aufbewahrung der Gegenstände.

*Quellen: §§ 543, 573, 574 BGB, § 569 Abs. 3 BGB (Schonfristzahlung), § 858 BGB (Verbotene Eigenmacht), BGH VIII ZR 107/19 (Eigenbedarfskündigung), BGH VIII ZR 261/18 (Berliner Räumung)*
`
  },

  // Tag 16: Mieterhöhung
  day_16: {
    title: "Die Mieterhöhung",
    type: "Recht",
    theory: `
# Wie man die Miete anpasst

Einfach "Ich will mehr Geld" sagen, geht nicht.

## 1. Erhöhung auf die Ortsübliche Vergleichsmiete (§ 558 BGB)
- **Voraussetzung:** Miete war 15 Monate unverändert.
- **Grenze:** Kappungsgrenze (20% in 3 Jahren, in Ballungsräumen oft 15%).
- **Begründung:** Mietspiegel oder 3 Vergleichswohnungen.
- **Zustimmung:** Der Mieter muss zustimmen (sonst Klage auf Zustimmung).

## 2. Modernisierungsumlage (§ 559 BGB)
- Nach Modernisierung (Energieeinsparung, Wohnwertverbesserung).
- Max. 8% der Modernisierungskosten dürfen auf die Jahresmiete umgelegt werden.
- Härtefallregelung für Mieter beachten.

## 3. Indexmiete (§ 557b BGB)
- Miete ist an den Verbraucherpreisindex (Inflation) gekoppelt.
- Keine Erhöhung auf Vergleichsmiete mehr möglich (außer Modernisierung, die gesetzlich verpflichtend ist).
- In Zeiten hoher Inflation für Vermieter attraktiv.
    `,
    law: [
      "§ 558 BGB (Vergleichsmiete)",
      "§ 559 BGB (Modernisierung)",
      "§ 557b BGB (Indexmiete)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Die Mieterhöhung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Die Mieterhöhung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Die Mieterhöhung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Der Mietspiegel

In Berlin und vielen Großstädten gibt es qualifizierte Mietspiegel.

**Anwendung:**
1.  Basiswert aus Tabelle ablesen (Baujahr, Größe).
2.  Zu-/Abschläge berechnen (Bad mit Fenster? Parkett? Aufzug?).
3.  Spanneneinordnung.

Der Mietspiegel ist das wichtigste Instrument zur Begründung von Mieterhöhungen und wird von Gerichten als Beweismittel anerkannt.
    `,
    task: `
## Rechenaufgabe Indexmiete

Kaltmiete bei Vertragsbeginn (Index 100): 1.000 €.
Index steigt auf 110 Punkte (+10%).

**Wie hoch ist die neue Miete?**
*Lösungshinweis: 1.000 € * 1,10 = 1.100 €.*
    `,
extendedTheory: `
### Vertiefung: Die Mieterhöhung als rechtlich komplexes Instrument der Mietverwaltung

Die Mieterhöhung ist eines der sensibelsten und rechtlich anspruchsvollsten Instrumente in der Sondereigentumsverwaltung. Das deutsche Mietrecht schützt den Mieter vor willkürlichen Mieterhöhungen durch ein komplexes System von Voraussetzungen, Fristen und Obergrenzen. Für den Verwalter ist die fehlerfreie Durchführung einer Mieterhöhung von entscheidender Bedeutung, da formale Fehler die Erhöhung unwirksam machen und den Eigentümer erheblich schädigen können.

**Die Erhöhung auf die ortsübliche Vergleichsmiete (§ 558 BGB)**

Die häufigste Form der Mieterhöhung ist die Anpassung an die ortsübliche Vergleichsmiete. Die Voraussetzungen sind streng: Die Miete muss seit mindestens 15 Monaten unverändert geblieben sein (Wartefrist), die Erhöhung darf innerhalb von drei Jahren nicht mehr als 20 Prozent betragen (Kappungsgrenze, in angespannten Wohnungsmärkten oft nur 15 Prozent) und die neue Miete darf die ortsübliche Vergleichsmiete nicht überschreiten.

Die Begründung der Erhöhung kann auf drei Arten erfolgen: durch Bezugnahme auf einen qualifizierten Mietspiegel (sofern vorhanden), durch Benennung von mindestens drei Vergleichswohnungen (mit konkreten Angaben zu Lage, Ausstattung, Größe und Miethöhe) oder durch ein Sachverständigengutachten. Der qualifizierte Mietspiegel ist das sicherste und kostengünstigste Mittel, da er von den Gerichten als Beweismittel anerkannt wird.

**Die formalen Anforderungen an das Mieterhöhungsverlangen**

Das Mieterhöhungsverlangen muss in Textform erfolgen (§ 558a BGB), also mindestens per E-Mail oder Brief. Es muss den Erhöhungsbetrag konkret benennen, die Begründung enthalten (Mietspiegel, Vergleichswohnungen oder Gutachten) und den Mieter zur Zustimmung auffordern. Die Zustimmungsfrist beträgt zwei Monate ab Zugang des Erhöhungsverlangens. Erst nach Ablauf dieser Frist und nach Erteilung der Zustimmung (oder nach Erwirkung eines Urteils) darf die erhöhte Miete verlangt werden, frühestens ab dem dritten Monat nach Zugang des Erhöhungsverlangens.

**Die Modernisierungsumlage (§ 559 BGB)**

Nach durchgeführten Modernisierungsmaßnahmen kann der Vermieter die jährliche Miete um bis zu 8 Prozent der aufgewendeten Kosten erhöhen. Modernisierungsmaßnahmen sind bauliche Veränderungen, die den Gebrauchswert der Mietsache nachhaltig erhöhen (z.B. Einbau einer Einbauküche), die allgemeinen Wohnverhältnisse auf Dauer verbessern (z.B. Schallschutz) oder zu einer nachhaltigen Einsparung von Energie oder Wasser führen (z.B. Wärmedämmung).

Die Ankündigung der Modernisierung muss mindestens drei Monate vor Beginn schriftlich erfolgen und die Art, Umfang, Beginn und voraussichtliche Dauer der Maßnahme sowie die zu erwartende Mieterhöhung enthalten. Der Mieter hat ein Sonderkündigungsrecht bis zum Ablauf des zweiten Monats nach Zugang der Ankündigung. Nach Abschluss der Modernisierung kann die Mieterhöhung verlangt werden, frühestens ab dem dritten Monat nach Zugang des Erhöhungsverlangens.

**Die Indexmiete (§ 557b BGB)**

Die Indexmiete ist eine besondere Form der Mietvereinbarung, bei der die Miete an den vom Statistischen Bundesamt ermittelten Verbraucherpreisindex gekoppelt wird. Die Indexmiete muss bereits im ursprünglichen Mietvertrag vereinbart werden und kann nicht nachträglich eingeführt werden. Bei einer Indexmietvereinbarung ist eine Erhöhung auf die ortsübliche Vergleichsmiete ausgeschlossen, Modernisierungsumlagen sind aber weiterhin möglich.

Die Anpassung der Indexmiete kann frühestens ein Jahr nach Vertragsschluss oder nach der letzten Anpassung verlangt werden. Der Vermieter muss dem Mieter in Textform mitteilen, wie sich der Index verändert hat und wie hoch die neue Miete ist. Die Änderung tritt frühestens mit Beginn des übernächsten Monats nach der Mitteilung in Kraft. In Zeiten hoher Inflation ist die Indexmiete für Vermieter attraktiv, da sie automatisch an die Preisentwicklung angepasst wird.

**Die Staffelmiete (§ 557a BGB)**

Die Staffelmiete ist eine weitere Sonderform, bei der die Miete in festgelegten Zeitabständen um bestimmte Beträge steigt. Die Staffelungen müssen bereits im Mietvertrag konkret vereinbart werden und in Geld ausgedrückt sein. Die Staffelmiete schließt eine Erhöhung auf die ortsübliche Vergleichsmiete aus, Modernisierungsumlagen sind aber möglich. Die Staffelmiete muss jeweils für mindestens ein Jahr unverändert bleiben.

**Praktische Empfehlungen für die Mieterhöhung**

Der Verwalter sollte vor jeder Mieterhöhung eine sorgfältige Prüfung vornehmen: Ist die Wartefrist von 15 Monaten abgelaufen? Ist die Kappungsgrenze eingehalten? Liegt die neue Miete innerhalb der ortsüblichen Vergleichsmiete? Ist die Begründung schlüssig und vollständig? Empfehlenswert ist die Verwendung von Musterschreiben, die der aktuellen Rechtsprechung entsprechen. Bei Unsicherheiten sollte ein Fachanwalt für Mietrecht konsultiert werden, da fehlerhafte Mieterhöhungen den Eigentümer erheblich schädigen können.

*Quellen: § 558 BGB (Mieterhöhung), § 558a BGB (Form), § 559 BGB (Modernisierung), § 557a BGB (Staffelmiete), § 557b BGB (Indexmiete), BGH VIII ZR 91/20 (Kappungsgrenze), BGH VIII ZR 178/18 (Mietspiegel)*
`
  },

  // WOCHE 5: Konflikt & Kommunikation (Tag 17-20)

  // Tag 17: Konfliktmanagement in der WEG
  day_17: {
    title: "Konfliktmanagement: Der Verwalter als Mediator",
    type: "Soft Skills",
    theory: `
# Wenn Nachbarn streiten

In einer WEG prallen unterschiedliche Interessen und Charaktere aufeinander. Der Verwalter steht oft dazwischen.

## 1. Typische Konfliktfelder
- **Lärm:** Musik, Kinder, Trittschall.
- **Geruch:** Zigarettenrauch, Kochen.
- **Geld:** Sonderumlagen, Sparsamkeit vs. Investition.
- **Verhalten:** Mülltrennung, Treppenhausreinigung.

## 2. Rolle des Verwalters
- **Neutralität:** Ergreifen Sie keine Partei!
- **Sachlichkeit:** Führen Sie den Streit auf die Sachebene zurück (Hausordnung, Gesetz).
- **Moderation:** Bieten Sie Gespräche an, aber spielen Sie nicht Richter.

## 3. Grenzen
Bei rein privaten Streitigkeiten (z.B. Beleidigung unter Nachbarn) ist der Verwalter **nicht** zuständig. Das ist Sache der Polizei oder Zivilgerichte.
    `,
    law: [
      "§ 15 Abs. 3 WEG (Gebrauchsregelung)",
      "§ 14 WEG (Pflichten der Eigentümer)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Konfliktmanagement: Der Verwalter als Mediator' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Konfliktmanagement: Der Verwalter als Mediator'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Konfliktmanagement: Der Verwalter als Mediator' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Eskalationsstufen

1.  **Gespräch:** Persönliches Gespräch mit den Beteiligten.
2.  **Schriftliche Ermahnung:** Aufforderung zur Einhaltung der Hausordnung (mit Frist).
3.  **Abmahnung:** Formelle Abmahnung (Vorbereitung für Klage).
4.  **Klage:** Unterlassungsklage der Gemeinschaft gegen den Störer.
5.  **Entziehung:** Entziehung des Wohnungseigentums (§ 17 WEG) als letztes Mittel (sehr hohe Hürden).
    `,
    task: `
## Falllösung

Eigentümer A beschwert sich, dass Eigentümer B im Treppenhaus raucht. B sagt, es ist sein Eigentum.

**Wie reagieren Sie?**
*Lösungshinweis: 1. Hausordnung prüfen (Rauchverbot im Gemeinschaftseigentum?). 2. B freundlich aber bestimmt darauf hinweisen, dass das Treppenhaus Gemeinschaftseigentum ist und dort Rücksichtnahmegebot gilt. 3. Aushang machen "Rauchen bitte nur draußen".*
    `,
extendedTheory: `
### Vertiefung: Konfliktmanagement in der WEG als zentrale Soft Skill des Verwalters

Das Konfliktmanagement ist eine der anspruchsvollsten und zugleich unterschätztesten Aufgaben des WEG-Verwalters. In einer Wohnungseigentümergemeinschaft treffen Menschen mit unterschiedlichen Interessen, Wertvorstellungen, finanziellen Möglichkeiten und Lebensweisen auf engstem Raum aufeinander. Der Verwalter steht dabei oft im Spannungsfeld zwischen den Parteien und muss eine neutrale, vermittelnde Rolle einnehmen, ohne seine rechtlichen Pflichten zu vernachlässigen.

**Die typischen Konfliktfelder in der WEG**

Die häufigsten Konfliktthemen lassen sich in vier Kategorien einteilen: Lärmkonflikte (Musik, Kinder, Trittschall, Partys), Geruchsbelästigungen (Zigarettenrauch, Kochgerüche, Haustiere), finanzielle Konflikte (Sonderumlagen, Höhe der Rücklage, Sparsamkeit versus Investition) und Verhaltensfragen (Mülltrennung, Treppenhausreinigung, Parken, Nutzung von Gemeinschaftseinrichtungen).

Hinter diesen vordergründigen Themen stehen oft tiefer liegende Konflikte: Machtkämpfe zwischen Eigentümern, persönliche Antipathien, unterschiedliche Wertvorstellungen (Ruhe versus Lebendigkeit, Sparsamkeit versus Komfort) oder das Gefühl, nicht gehört oder ernst genommen zu werden. Der Verwalter muss diese Ebenen erkennen und unterscheiden können, um angemessen zu reagieren.

**Die Rolle des Verwalters: Neutralität und Sachlichkeit**

Die wichtigste Regel im Konfliktmanagement ist die strikte Neutralität. Der Verwalter darf keine Partei ergreifen, auch wenn er persönlich eine Meinung zu dem Konflikt hat. Seine Aufgabe ist es, den Konflikt auf die Sachebene zurückzuführen und die rechtlichen Rahmenbedingungen aufzuzeigen. Dabei muss er zwischen seiner Rolle als Verwalter (der die Beschlüsse der Gemeinschaft umsetzt) und seiner Rolle als Mediator (der zwischen den Parteien vermittelt) unterscheiden.

Die Sachlichkeit ist das zweite zentrale Prinzip. Der Verwalter muss den Konflikt von emotionalen Aufladungen befreien und auf die objektiven Fakten konzentrieren: Was sagt die Hausordnung? Was sagt das Gesetz? Was wurde in der Eigentümerversammlung beschlossen? Diese Rückführung auf die Sachebene hilft, die Emotionen zu dämpfen und eine konstruktive Lösung zu finden.

**Kommunikationsstrategien im Konfliktmanagement**

Die aktive Zuhörtechnik ist das wichtigste Werkzeug im Konfliktmanagement. Der Verwalter muss beiden Parteien das Gefühl geben, gehört und ernst genommen zu werden. Dies bedeutet: Ausreden lassen, Blickkontakt halten, Verständnis signalisieren ("Ich verstehe, dass Sie sich gestört fühlen") und das Gesagte zusammenfassen ("Wenn ich Sie richtig verstehe, geht es Ihnen um...").

Die Ich-Botschaften sind eine weitere wichtige Technik. Statt "Sie machen zu viel Lärm" sollte der Verwalter formulieren: "Ich habe mehrere Beschwerden über Lärm erhalten." Dies vermeidet Angriffe und Schuldzuweisungen und macht die Kommunikation sachlicher. Auch die Trennung von Person und Problem ist wichtig: "Das Verhalten ist problematisch" statt "Sie sind problematisch."

**Die Eskalationsstufen und ihre Anwendung**

Das Konfliktmanagement folgt einem gestuften Vorgehen, das von der niedrigsten zur höchsten Eskalationsstufe fortschreitet. Die erste Stufe ist das persönliche Gespräch mit den Beteiligten, einzeln oder gemeinsam. Ziel ist es, die Positionen zu klären, Missverständnisse auszuräumen und eine einvernehmliche Lösung zu finden. Oft reicht bereits ein klärendes Gespräch, um den Konflikt zu entschärfen.

Die zweite Stufe ist die schriftliche Ermahnung. Der Verwalter weist den Störer schriftlich auf die Hausordnung oder die gesetzlichen Pflichten hin und fordert ihn auf, das störende Verhalten zu unterlassen. Diese Ermahnung sollte sachlich, aber bestimmt formuliert sein und eine angemessene Frist zur Abhilfe setzen. Die dritte Stufe ist die formelle Abmahnung, die bereits die Vorbereitung für rechtliche Schritte darstellt. Sie muss konkret das beanstandete Verhalten benennen, auf die Rechtsgrundlage verweisen und die Konsequenzen bei Nichtbefolgung aufzeigen.

Die vierte Stufe ist die Klage der Gemeinschaft gegen den Störer. Dies kann eine Unterlassungsklage (§ 1004 BGB analog), eine Schadensersatzklage oder in extremen Fällen eine Klage auf Entziehung des Wohnungseigentums (§ 18 WEG) sein. Die Entziehung ist das schärfste Schwert und nur bei besonders schweren, anhaltenden Pflichtverletzungen möglich, die das Zusammenleben in der Gemeinschaft unerträglich machen.

**Die Grenzen des Verwalters: Wann ist er nicht zuständig?**

Der Verwalter ist nicht zuständig für rein private Streitigkeiten zwischen Eigentümern, die nicht das Gemeinschaftseigentum oder die Gemeinschaft betreffen. Beleidigungen, persönliche Angriffe, Nachbarschaftsstreitigkeiten über Grundstücksgrenzen oder zivilrechtliche Ansprüche zwischen Eigentümern sind Sache der Polizei oder der Zivilgerichte. Der Verwalter sollte in solchen Fällen klar kommunizieren, dass er nicht zuständig ist, und die Parteien an die richtigen Stellen verweisen.

**Mediation als professionelles Instrument**

In besonders verfahrenen Konflikten kann die Einschaltung eines professionellen Mediators sinnvoll sein. Die Mediation ist ein strukturiertes Verfahren, bei dem ein neutraler Dritter die Parteien dabei unterstützt, eine einvernehmliche Lösung zu finden. Die Kosten können von der Gemeinschaft getragen werden, wenn der Konflikt die Gemeinschaft betrifft. Die Mediation hat den Vorteil, dass sie schneller, kostengünstiger und für alle Beteiligten weniger belastend ist als ein Gerichtsverfahren.

*Quellen: § 14 WEG (Pflichten der Eigentümer), § 15 Abs. 3 WEG (Gebrauchsregelung), § 18 WEG (Entziehung), § 1004 BGB (Unterlassung), BGH V ZR 176/17 (Lärmbelästigung), BGH V ZR 222/19 (Rauchen im Treppenhaus)*
`
  },

  // Tag 18: Kommunikation & Rhetorik
  day_18: {
    title: "Kommunikation & Rhetorik für Verwalter",
    type: "Soft Skills",
    theory: `
# Souverän auftreten

Als Verwalter müssen Sie überzeugen, beruhigen und führen.

## 1. Die Eigentümerversammlung leiten
- **Klare Ansagen:** "Wir kommen nun zu TOP 3."
- **Rederechte:** Lassen Sie Leute ausreden, aber unterbinden Sie Monologe ("Bitte kommen Sie zum Punkt").
- **Körpersprache:** Offen, zugewandt, Blickkontakt. Stehen Sie bei wichtigen Punkten auf.

## 2. Schriftverkehr
- Schreiben Sie verständlich (kein "Behördendeutsch").
- Bleiben Sie höflich, auch bei Angriffen.
- Dokumentieren Sie alles (Wer schreibt, der bleibt).

## 3. Umgang mit "schwierigen" Kunden
- Nehmen Sie Angriffe nicht persönlich.
- Lassen Sie Dampf ablassen ("Ich verstehe, dass Sie verärgert sind").
- Suchen Sie lösungsorientiert nach Wegen.
    `,
    law: [
        "§ 241 BGB – Pflichten aus dem Schuldverhältnis",
        "§ 23 WEG – Wohnungseigentümerversammlung",
        "§ 18 WEG – Verwaltung des gemeinschaftlichen Eigentums",
      ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Kommunikation & Rhetorik für Verwalter' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Kommunikation & Rhetorik für Verwalter'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Kommunikation & Rhetorik für Verwalter' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Rhetorik-Tipps

- **Ich-Botschaften:** Statt "Sie haben nicht gezahlt" besser "Ich habe noch keinen Zahlungseingang verzeichnet". Das klingt weniger vorwurfsvoll.
- **Positiv formulieren:** Statt "Das geht nicht" besser "Wir können das so lösen: ...".
- **Pausen machen:** Schweigen Sie nach einer wichtigen Aussage. Das gibt ihr Gewicht.
    `,
    task: `
## E-Mail Training

Ein Eigentümer schreibt wütend: "Sie unfähiger Verwalter! Die Heizung geht immer noch nicht! Ich kürze das Hausgeld um 100%!"

**Schreiben Sie eine professionelle Antwort.**
*Lösungshinweis: "Sehr geehrter Herr X, ich bedauere sehr, dass die Heizung noch Probleme macht. Der Monteur ist bereits informiert und kommt morgen um 08:00 Uhr. Bitte beachten Sie, dass eine Kürzung des Hausgeldes rechtlich nicht zulässig ist (§ 16 WEG), da die Gemeinschaft auf die Liquidität angewiesen ist. Ich bitte um Ihr Verständnis und kümmere mich persönlich um die schnelle Behebung."*
    `,
extendedTheory: `
### Vertiefung: Kommunikation und Rhetorik als Schlüsselkompetenzen des Verwalters

Die Kommunikationsfähigkeit ist neben der fachlichen Kompetenz die wichtigste Eigenschaft eines erfolgreichen Verwalters. Der Verwalter muss in der Lage sein, komplexe Sachverhalte verständlich zu erklären, Eigentümerversammlungen souverän zu leiten, schwierige Gespräche zu führen und in Konfliktsituationen deeskalierend zu wirken. Die Rhetorik ist dabei nicht nur eine Frage des "schönen Redens", sondern ein strategisches Werkzeug zur Zielerreichung und zur Wahrung der eigenen Autorität.

**Die Eigentümerversammlung als rhetorische Herausforderung**

Die Leitung einer Eigentümerversammlung ist die sichtbarste und anspruchsvollste Kommunikationsaufgabe des Verwalters. Er muss die Versammlung strukturieren, die Tagesordnung abarbeiten, Diskussionen moderieren, Beschlüsse herbeiführen und dabei die Kontrolle über den Ablauf behalten. Dies erfordert eine klare, autoritative Kommunikation, gepaart mit Empathie und Flexibilität.

Die klare Ansage ist das erste Prinzip. Der Verwalter muss deutlich machen, wo die Versammlung steht und wohin sie geht: "Wir kommen nun zu Tagesordnungspunkt 3: Beschlussfassung über die Fassadensanierung." Diese Klarheit gibt den Eigentümern Orientierung und verhindert, dass die Diskussion abschweift. Die Körpersprache unterstreicht die Autorität: aufrechte Haltung, offene Gestik, Blickkontakt zu allen Teilnehmern. Bei wichtigen Punkten sollte der Verwalter aufstehen, um seine Präsenz zu verstärken.

Die Rederechte müssen klar geregelt sein. Der Verwalter muss darauf achten, dass alle zu Wort kommen, aber niemand die Versammlung monopolisiert. Monologe müssen höflich, aber bestimmt unterbrochen werden: "Herr Müller, ich verstehe Ihren Punkt. Bitte kommen Sie zum Abschluss, damit auch andere Eigentümer sich äußern können." Die Kunst besteht darin, die Balance zwischen Meinungsfreiheit und Effizienz zu wahren.

**Der schriftliche Kommunikationsstil: Klarheit und Höflichkeit**

Der Schriftverkehr des Verwalters ist das zweite zentrale Kommunikationsfeld. Briefe, E-Mails und Protokolle müssen verständlich, präzise und höflich sein. Das "Behördendeutsch" mit seinen Schachtelsätzen und Passivkonstruktionen ist zu vermeiden. Stattdessen sollte der Verwalter kurze, aktive Sätze verwenden: "Wir haben die Heizung repariert" statt "Die Heizung wurde durch uns einer Reparatur unterzogen."

Die Höflichkeit ist auch bei Angriffen zu wahren. Wenn ein Eigentümer eine aggressive E-Mail schreibt, sollte der Verwalter nicht in den gleichen Ton verfallen, sondern sachlich und professionell antworten. Die Dokumentation ist dabei ein wichtiges Prinzip: "Wer schreibt, der bleibt." Alle wichtigen Entscheidungen, Zusagen und Vereinbarungen sollten schriftlich festgehalten werden, um spätere Missverständnisse zu vermeiden.

**Der Umgang mit "schwierigen" Eigentümern**

Jeder Verwalter kennt sie: die Eigentümer, die bei jeder Versammlung Unruhe stiften, die ständig Beschwerden vorbringen oder die den Verwalter persönlich angreifen. Der professionelle Umgang mit diesen "schwierigen" Eigentümern ist eine Kunst, die Geduld, Empathie und psychologisches Geschick erfordert.

Die erste Regel ist: Nehmen Sie Angriffe nicht persönlich. Oft stecken hinter den Angriffen Ängste, Frustrationen oder das Gefühl, nicht gehört zu werden. Der Verwalter sollte versuchen, die Emotion hinter dem Angriff zu erkennen und darauf einzugehen: "Ich verstehe, dass Sie verärgert sind. Lassen Sie uns gemeinsam nach einer Lösung suchen." Diese empathische Reaktion nimmt dem Angriff die Schärfe und öffnet den Weg zu einer konstruktiven Diskussion.

Die zweite Regel ist: Lassen Sie Dampf ablassen. Manchmal brauchen Menschen einfach jemanden, der ihnen zuhört. Der Verwalter sollte dem Eigentümer die Möglichkeit geben, seinen Ärger zu äußern, ohne sofort zu kontern. Aktives Zuhören, Nicken, Verständnis signalisieren – das allein kann schon deeskalierend wirken. Erst wenn der Eigentümer sich ausgesprochen hat, sollte der Verwalter sachlich auf die Punkte eingehen.

**Rhetorik-Techniken für den Verwalter-Alltag**

Die Ich-Botschaften sind eine der wichtigsten Techniken zur Vermeidung von Konfrontationen. Statt "Sie haben nicht gezahlt" sollte der Verwalter sagen: "Ich habe noch keinen Zahlungseingang verzeichnet." Dies klingt weniger vorwurfsvoll und vermeidet, dass der Eigentümer in die Defensive gedrängt wird. Die positive Formulierung ist eine weitere wichtige Technik. Statt "Das geht nicht" sollte der Verwalter sagen: "Wir können das so lösen: ..." Dies zeigt Lösungsorientierung und vermeidet Negativität.

Die Pausen sind ein oft unterschätztes rhetorisches Mittel. Nach einer wichtigen Aussage sollte der Verwalter schweigen und der Aussage Zeit geben, zu wirken. Dies unterstreicht die Bedeutung und gibt den Zuhörern die Möglichkeit, das Gesagte zu verarbeiten. Auch in Konfliktsituationen können Pausen deeskalierend wirken: Statt sofort zu reagieren, sollte der Verwalter kurz innehalten, durchatmen und dann ruhig antworten.

**Die Vorbereitung als Schlüssel zum Erfolg**

Die beste Rhetorik nützt nichts, wenn der Verwalter nicht vorbereitet ist. Vor jeder Eigentümerversammlung sollte er die Tagesordnung durchgehen, die Beschlussvorlagen vorbereiten, mögliche Fragen antizipieren und Antworten parat haben. Auch schwierige Gespräche sollten vorbereitet werden: Was ist das Ziel des Gesprächs? Welche Argumente habe ich? Welche Einwände könnte der Eigentümer vorbringen? Diese Vorbereitung gibt Sicherheit und Souveränität.

Die Weiterbildung in Kommunikation und Rhetorik ist eine lohnende Investition. Seminare, Bücher und Coaching können dem Verwalter helfen, seine Kommunikationsfähigkeiten zu verbessern und schwierige Situationen souveräner zu meistern. Die Kommunikation ist eine Fähigkeit, die man trainieren und verbessern kann – und die den Unterschied zwischen einem durchschnittlichen und einem exzellenten Verwalter ausmacht.

*Quellen: Schulz von Thun, "Miteinander reden" (Kommunikationsmodelle), Rosenberg, "Gewaltfreie Kommunikation", Watzlawick, "Man kann nicht nicht kommunizieren", Fisher/Ury, "Das Harvard-Konzept" (Verhandlungstechnik)*
`
  },

  // Tag 19: Facility Management Basics
  day_19: {
    title: "Facility Management: Mehr als nur Hausmeister",
    type: "Technik",
    theory: `
# Facility Management (FM)

FM betrachtet die Immobilie ganzheitlich über den gesamten Lebenszyklus.

## 1. Die drei Säulen des FM
- **Technisches FM:** Betreiben, Instandhalten, Energiemanagement.
- **Kaufmännisches FM:** Buchhaltung, Kostenrechnung, Vermietung.
- **Infrastrukturelles FM:** Reinigung, Sicherheit, Gärtner, Winterdienst.

## 2. Betreiberverantwortung
Der Eigentümer (und damit der Verwalter) ist verantwortlich für die Sicherheit der Gebäude (Legionellenprüfung, Elektrosicherheit, Aufzugsprüfung). Werden Pflichten verletzt, droht Haftung (Organisationsverschulden).

## 3. Lebenszykluskosten
Nur 20% der Kosten einer Immobilie entstehen beim Bau, 80% während der Nutzung! Gutes FM optimiert diese 80%.
    `,
    law: [
      "GEG (Gebäudeenergiegesetz)",
      "TrinkwV (Trinkwasserverordnung)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Facility Management: Mehr als nur Hausmeister' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Facility Management: Mehr als nur Hausmeister'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Facility Management: Mehr als nur Hausmeister' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Energie-Optimierung

Die Energiekosten sind der größte Hebel im FM.

**Maßnahmen:**
- Hydraulischer Abgleich der Heizung.
- LED-Beleuchtung im Treppenhaus (mit Bewegungsmeldern).
- Überprüfung der Heizkurve.
- Dämmung der obersten Geschossdecke (günstig & effektiv).

**Der Energieausweis:** Muss bei Verkauf/Vermietung vorgelegt werden. Zeigt die energetische Qualität.
    `,
    task: `
## FM-Konzept

Sie verwalten eine Wohnanlage mit großen Grünflächen. Die Gärtnerkosten sind extrem hoch.

**Welche Optimierungsideen haben Sie?**
*Lösungshinweis: Mähroboter anschaffen? Pflegeleichte Bepflanzung (Bodendecker statt Blumenbeete)? Ausschreibung des Dienstleisters (Vergleichsangebote)? Eigenleistung durch Hausmeister statt externer Firma?*
    `,
extendedTheory: `
### Vertiefung: Facility Management als ganzheitlicher Ansatz der Immobilienverwaltung

Facility Management (FM) ist weit mehr als nur "Hausmeistertätigkeit" – es ist ein strategischer, ganzheitlicher Ansatz zur Bewirtschaftung von Immobilien über deren gesamten Lebenszyklus. Während die klassische Hausverwaltung sich oft auf die kaufmännische und rechtliche Betreuung konzentriert, betrachtet das FM die Immobilie als komplexes System, das technisch, kaufmännisch und infrastrukturell optimiert werden muss. Für den modernen Verwalter ist das Verständnis von FM-Prinzipien unverzichtbar, um Immobilien effizient, nachhaltig und werterhaltend zu betreuen.

**Die drei Säulen des Facility Managements**

Das Facility Management ruht auf drei gleichwertigen Säulen, die eng miteinander verzahnt sind. Das technische FM umfasst den Betrieb, die Instandhaltung und das Energiemanagement aller technischen Anlagen und Systeme. Dies beinhaltet die Heizungs-, Lüftungs- und Klimaanlagen (HLK), die Elektrotechnik, die Sanitäranlagen, die Aufzüge, die Brandschutzanlagen und die Gebäudeleittechnik. Das technische FM ist verantwortlich für die Funktionsfähigkeit, Sicherheit und Energieeffizienz der Immobilie.

Das kaufmännische FM umfasst die Buchhaltung, die Kostenrechnung, das Vertragsmanagement, die Vermietung und das Flächenmanagement. Es stellt sicher, dass die Immobilie wirtschaftlich betrieben wird und einen optimalen Return on Investment (ROI) erzielt. Das kaufmännische FM analysiert die Kosten, identifiziert Einsparpotenziale und optimiert die Bewirtschaftungskosten.

Das infrastrukturelle FM umfasst alle Dienstleistungen, die für den reibungslosen Betrieb der Immobilie notwendig sind: Reinigung, Sicherheitsdienste, Gärtnerei, Winterdienst, Schädlingsbekämpfung und Abfallmanagement. Diese Dienstleistungen sind oft ausgelagert und müssen koordiniert und überwacht werden.

**Die Betreiberverantwortung: Haftung und Pflichten**

Der Eigentümer einer Immobilie trägt die Betreiberverantwortung für alle technischen Anlagen und Einrichtungen. Diese Verantwortung kann er nicht einfach auf den Verwalter oder Dienstleister abwälzen – er bleibt in der Haftung. Die Betreiberverantwortung umfasst die Gewährleistung der Sicherheit, die Einhaltung gesetzlicher Vorschriften, die regelmäßige Wartung und Prüfung und die Dokumentation aller Maßnahmen.

Typische Prüfpflichten sind: Legionellenprüfung der Trinkwasseranlage (alle 3 Jahre, bei Großanlagen jährlich), Elektrosicherheitsprüfung (alle 4 Jahre), Aufzugsprüfung (jährlich durch TÜV), Prüfung der Brandschutzanlagen (jährlich), Prüfung der Blitzschutzanlage (alle 4 Jahre) und Prüfung der Spielplatzgeräte (jährlich nach DIN EN 1176). Werden diese Pflichten verletzt und kommt es zu einem Schaden, haftet der Eigentümer für Organisationsverschulden.

**Lebenszykluskosten: Die 80/20-Regel**

Eine der wichtigsten Erkenntnisse des Facility Managements ist die 80/20-Regel: Nur etwa 20 Prozent der Gesamtkosten einer Immobilie entstehen beim Bau oder Kauf, während 80 Prozent während der Nutzungsphase anfallen. Diese Nutzungskosten umfassen Energie, Wasser, Instandhaltung, Reparaturen, Reinigung, Versicherungen und Verwaltung. Ein gutes FM optimiert diese 80 Prozent und kann dadurch erhebliche Einsparungen erzielen.

Die Lebenszykluskosten-Betrachtung (Life Cycle Costing, LCC) ist ein zentrales Instrument des FM. Sie betrachtet nicht nur die Anschaffungskosten einer Anlage oder eines Systems, sondern auch die Betriebs-, Wartungs- und Entsorgungskosten über die gesamte Nutzungsdauer. Beispiel: Eine hochwertige, energieeffiziente Heizungsanlage ist in der Anschaffung teurer als eine Standardanlage, spart aber über die Nutzungsdauer von 20 Jahren erhebliche Energiekosten und amortisiert sich nach wenigen Jahren.

**Energiemanagement als größter Hebel**

Die Energiekosten sind der größte Einzelposten in den Betriebskosten einer Immobilie und bieten das größte Einsparpotenzial. Ein professionelles Energiemanagement umfasst die Erfassung und Analyse des Energieverbrauchs, die Identifikation von Einsparpotenzialen, die Umsetzung von Energieeffizienzmaßnahmen und die kontinuierliche Überwachung und Optimierung.

Typische Maßnahmen sind: der hydraulische Abgleich der Heizungsanlage (oft 10-15 Prozent Einsparung bei geringen Kosten), die Optimierung der Heizkurve, die Dämmung der obersten Geschossdecke (kostengünstig und effektiv), der Austausch alter Heizungspumpen gegen Hocheffizienzpumpen, die Installation von LED-Beleuchtung mit Bewegungsmeldern im Treppenhaus und die Installation von Photovoltaikanlagen auf dem Dach.

Der Energieausweis ist ein wichtiges Instrument zur Bewertung der energetischen Qualität einer Immobilie. Er muss bei Verkauf oder Vermietung vorgelegt werden und zeigt den Energiebedarf oder -verbrauch in Kilowattstunden pro Quadratmeter und Jahr. Ein guter Energieausweis kann den Wert der Immobilie steigern und die Vermietbarkeit verbessern.

**Digitalisierung und Smart Building**

Die Digitalisierung revolutioniert das Facility Management. Smart Building-Technologien ermöglichen die Vernetzung und zentrale Steuerung aller technischen Systeme über eine Gebäudeleittechnik (GLT). Sensoren erfassen kontinuierlich Daten über Temperatur, Luftfeuchtigkeit, CO2-Gehalt, Energieverbrauch und Anlagenzustände. Diese Daten werden in Echtzeit analysiert und ermöglichen eine vorausschauende Wartung (Predictive Maintenance), bei der Störungen erkannt werden, bevor sie auftreten.

Das Internet of Things (IoT) ermöglicht die Fernüberwachung und -steuerung von Anlagen. Der Verwalter kann von seinem Büro aus die Heizung regulieren, die Beleuchtung steuern oder Störmeldungen empfangen. Dies spart Zeit, reduziert Ausfallzeiten und verbessert den Komfort für die Bewohner. Die Digitalisierung ist kein Selbstzweck, sondern ein Mittel zur Effizienzsteigerung und Kostenreduktion.

**Nachhaltigkeit und Green Building**

Nachhaltigkeit ist ein zentrales Thema im modernen Facility Management. Green Building-Konzepte zielen darauf ab, den ökologischen Fußabdruck von Immobilien zu minimieren. Dies umfasst die Reduktion des Energieverbrauchs, die Nutzung erneuerbarer Energien, die Reduktion des Wasserverbrauchs, die Verwendung umweltfreundlicher Materialien und die Förderung der Biodiversität (z.B. durch Dachbegrünung).

Zertifizierungssysteme wie LEED (Leadership in Energy and Environmental Design), BREEAM (Building Research Establishment Environmental Assessment Method) oder DGNB (Deutsche Gesellschaft für Nachhaltiges Bauen) bewerten die Nachhaltigkeit von Gebäuden anhand definierter Kriterien. Zertifizierte Gebäude erzielen oft höhere Mieten und Verkaufspreise und haben geringere Betriebskosten.

*Quellen: GEFMA (German Facility Management Association), DIN EN 15221 (Facility Management), GEG (Gebäudeenergiegesetz), TrinkwV (Trinkwasserverordnung), DGNB-Zertifizierung, VDI 3810 (Betreiben und Instandhalten von gebäudetechnischen Anlagen)*
`
  },

  // Tag 20: Zusammenfassung & Zwischenprüfung
  day_20: {
    title: "Zwischenprüfung: Grundlagen & Verwaltung",
    type: "Prüfung",
    theory: `
# Zeit für einen Check-up

Wir haben die Grundlagen der WEG-Verwaltung, die kaufmännische Verwaltung und das Mietrecht behandelt.

## Wiederholung der Key-Facts:
1.  **WEG:** Unterscheidung Sonder-/Gemeinschaftseigentum. ETV als oberstes Organ.
2.  **Verwalter:** Vollzugsorgan, Treuhänder fremden Vermögens.
3.  **Wirtschaftsplan:** Prognose (Vorschuss). **Jahresabrechnung:** Ist-Zahlen (Abrechnungsspitze).
4.  **Mietrecht:** Mieterschutz dominiert. Kündigung nur mit Grund.

Nutzen Sie diesen Tag, um offene Fragen zu klären und die Gesetzestexte noch einmal querzulesen.
    `,
    law: [
        "§ 1 WEG – Begriffsbestimmungen",
        "§ 18 WEG – Verwaltung",
        "§ 23 WEG – Eigentümerversammlung",
        "§ 28 WEG – Wirtschaftsplan",
      ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Zwischenprüfung: Grundlagen & Verwaltung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Zwischenprüfung: Grundlagen & Verwaltung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Zwischenprüfung: Grundlagen & Verwaltung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Prüfungssimulation

Stellen Sie sich vor, Sie sitzen in der mündlichen IHK-Prüfung.

**Prüfer:** "Erklären Sie mir den Unterschied zwischen der Instandhaltungsrücklage und dem Hausgeld."

**Ihre Antwort:** "Das Hausgeld deckt die laufenden, verbrauchbaren Kosten (Bewirtschaftung). Die Rücklage ist das 'Sparbuch' für die Substanz des Gebäudes (Investition). Beides wird monatlich zusammen gezahlt, aber buchhalterisch strikt getrennt."
    `,
    task: `
## Das große Quiz

Bereiten Sie sich auf das Modul-Quiz vor. Gehen Sie die Lösungen der letzten 19 Tage noch einmal durch.

**Viel Erfolg!**
    `,
extendedTheory: `
### Vertiefung: Die Zwischenprüfung als Reflexions- und Konsolidierungsinstrument

Die Zwischenprüfung ist mehr als nur eine Leistungskontrolle – sie ist ein wichtiges didaktisches Instrument zur Reflexion, Konsolidierung und Selbsteinschätzung des bisher Gelernten. Nach den ersten 19 Tagen intensiver Auseinandersetzung mit den Grundlagen der WEG-Verwaltung, der kaufmännischen Verwaltung und des Mietrechts ist es Zeit, innezuhalten, das Gelernte zu strukturieren und Wissenslücken zu identifizieren. Die Zwischenprüfung bereitet zudem auf die spätere IHK-Prüfung vor, indem sie typische Prüfungsformate und -anforderungen simuliert.

**Die Struktur der IHK-Prüfung: Was erwartet Sie?**

Die IHK-Prüfung zum Immobilienverwalter besteht aus einem schriftlichen und einem mündlichen Teil. Der schriftliche Teil umfasst in der Regel Multiple-Choice-Fragen, Fallstudien und Rechenaufgaben zu den Themenbereichen Recht (WEG, Mietrecht, BGB), Kaufmännische Verwaltung (Buchhaltung, Jahresabrechnung, Wirtschaftsplan), Technische Verwaltung (Instandhaltung, Energieeffizienz, Verkehrssicherung) und Soft Skills (Kommunikation, Konfliktmanagement).

Der mündliche Teil ist eine Präsentation mit anschließendem Fachgespräch. Der Prüfling muss ein selbst gewähltes Thema aus der Praxis präsentieren und Fragen der Prüfer beantworten. Typische Themen sind: die Durchführung einer Eigentümerversammlung, die Erstellung einer Jahresabrechnung, die Planung einer Sanierungsmaßnahme oder die Lösung eines Konflikts in der WEG.

**Die wichtigsten Themen der ersten 19 Tage im Überblick**

Die Grundlagen der WEG umfassen die Unterscheidung zwischen Sondereigentum und Gemeinschaftseigentum, die Organe der WEG (Eigentümerversammlung, Verwalter, Verwaltungsbeirat), die Rechte und Pflichten der Eigentümer und die Beschlussfassung. Kernbegriffe sind: Miteigentumsanteil (MEA), Teilungserklärung, Gemeinschaftsordnung, Hausordnung und Sondernutzungsrecht.

Die kaufmännische Verwaltung umfasst den Wirtschaftsplan (Prognose der Einnahmen und Ausgaben für das kommende Jahr), die Jahresabrechnung (Ist-Zahlen des abgelaufenen Jahres mit Abrechnungsspitze), die Erhaltungsrücklage (Sparbuch für die Substanz des Gebäudes) und die Verteilerschlüssel (nach MEA, nach Verbrauch, nach Wohnfläche). Wichtige Rechenaufgaben sind: die Berechnung des Hausgeldes, die Berechnung der Abrechnungsspitze und die Verteilung von Kosten nach verschiedenen Schlüsseln.

Das Mietrecht umfasst den Mietvertrag (Inhalt, Form, AGB-Kontrolle), die Betriebskosten (umlagefähig versus nicht umlagefähig), die Schönheitsreparaturen (wirksame versus unwirksame Klauseln), die Mieterhöhung (auf Vergleichsmiete, Modernisierung, Indexmiete) und die Kündigung (ordentlich versus fristlos, Eigenbedarf, Zahlungsverzug). Kernprinzip: Das deutsche Mietrecht ist mieterfreundlich, Fehler gehen fast immer zulasten des Vermieters.

**Typische Prüfungsfragen und Lösungsstrategien**

Multiple-Choice-Fragen erfordern präzises Wissen über Definitionen, Fristen und Rechtsgrundlagen. Beispiel: "Welche Mehrheit ist für die Beschlussfassung über eine Modernisierung erforderlich?" Lösungsstrategie: Ausschlussprinzip anwenden – offensichtlich falsche Antworten eliminieren, dann zwischen den verbleibenden Optionen abwägen.

Fallstudien erfordern die Anwendung des Gelernten auf konkrete Situationen. Beispiel: "Eigentümer A möchte seine Wohnung umbauen und dabei eine tragende Wand entfernen. Welche Schritte sind notwendig?" Lösungsstrategie: Systematisch vorgehen – Rechtslage klären (§ 20 WEG: bauliche Veränderung), Beschlussfassung (doppelt qualifizierte Mehrheit), Genehmigungen (Baugenehmigung, Statiker), Kostentragung (A trägt alle Kosten).

Rechenaufgaben erfordern die korrekte Anwendung von Formeln und Verteilerschlüsseln. Beispiel: "Die WEG hat 10 Einheiten mit insgesamt 1.000 MEA. Die Gesamtkosten betragen 50.000 Euro. Eigentümer B hat 120 MEA. Wie hoch ist sein Anteil?" Lösungsstrategie: Formel aufstellen (Kosten × MEA / Gesamt-MEA), einsetzen (50.000 × 120 / 1.000 = 6.000 Euro), Plausibilität prüfen (120 MEA sind 12 Prozent, 12 Prozent von 50.000 sind 6.000 – passt).

**Lernstrategien für die Prüfungsvorbereitung**

Die aktive Wiederholung ist effektiver als passives Lesen. Erstellen Sie Karteikarten mit Fragen auf der Vorderseite und Antworten auf der Rückseite. Üben Sie regelmäßig und sortieren Sie die Karten nach Schwierigkeitsgrad. Die Lerngruppe ist ein weiteres effektives Instrument. Erklären Sie sich gegenseitig die Themen, diskutieren Sie Fallbeispiele und simulieren Sie mündliche Prüfungen.

Die Praxisbezug ist entscheidend. Versuchen Sie, das Gelernte auf reale Situationen zu übertragen. Wenn Sie in einer Verwaltung arbeiten, beobachten Sie, wie Ihr Arbeitgeber mit den Themen umgeht. Wenn Sie noch keine Praxiserfahrung haben, lesen Sie Fachzeitschriften, besuchen Sie Eigentümerversammlungen oder sprechen Sie mit praktizierenden Verwaltern.

**Die Bedeutung der Gesetzestexte**

In der IHK-Prüfung sind in der Regel die Gesetzestexte zugelassen. Dies bedeutet nicht, dass Sie nichts auswendig lernen müssen – im Gegenteil. Sie müssen wissen, wo im Gesetz die relevanten Paragraphen stehen, und Sie müssen die Struktur der Gesetze verstehen. Üben Sie den Umgang mit den Gesetzestexten: Markieren Sie wichtige Paragraphen, erstellen Sie ein Inhaltsverzeichnis mit Stichworten und üben Sie, schnell die richtigen Paragraphen zu finden.

Die wichtigsten Gesetze für die Prüfung sind: das Wohnungseigentumsgesetz (WEG), das Bürgerliche Gesetzbuch (BGB, insbesondere Mietrecht §§ 535-580a), die Betriebskostenverordnung (BetrKV), das Gebäudeenergiegesetz (GEG) und die Heizkostenverordnung (HeizkV). Schaffen Sie sich kommentierte Ausgaben an, die Erläuterungen und Praxishinweise enthalten.

*Quellen: IHK-Prüfungsordnung Immobilienverwalter, WEG, BGB, BetrKV, GEG, Fachliteratur zur Prüfungsvorbereitung (z.B. Blank/Börstinghaus, "Miete", Niedenführ/Schulze, "WEG")*
`
  },

  // WOCHE 4: Technische Verwaltung - Beginn
  
  // Tag 21: Technische Verwaltung - Grundlagen
  day_21: {
    title: "Technische Verwaltung: Grundlagen & Pflichten",
    type: "Technisch",
    theory: `
# Die technische Verwaltung: Das Fundament der Immobilie

Die technische Verwaltung umfasst alle Maßnahmen zur Erhaltung und Pflege der baulichen Substanz sowie der technischen Anlagen einer Immobilie.

## 1. Aufgaben der technischen Verwaltung
- **Instandhaltung:** Erhaltung des ordnungsgemäßen Zustands (Schönheitsreparaturen, Wartung).
- **Instandsetzung:** Beseitigung von Mängeln und Schäden (Reparaturen).
- **Modernisierung:** Verbesserung des Wohnwerts oder Energieeffizienz.
- **Verkehrssicherungspflicht:** Gewährleistung der Sicherheit für Bewohner und Besucher.

## 2. Rechtliche Grundlagen
- **§ 13 WEG:** Ordnungsgemäße Verwaltung des Gemeinschaftseigentums.
- **§ 21 WEG:** Beschlussfassung über bauliche Veränderungen.
- **§ 823 BGB:** Verkehrssicherungspflicht (Haftung bei Unfällen).

## 3. Verkehrssicherungspflicht
Der Verwalter muss regelmäßig prüfen:
- **Winterdienst:** Schnee- und Eisbeseitigung auf Gehwegen.
- **Beleuchtung:** Funktionsfähigkeit der Treppenhausbeleuchtung.
- **Spielplätze:** Sicherheit der Spielgeräte (DIN EN 1176).
- **Brandschutz:** Funktionsfähigkeit von Rauchmeldern, Feuerlöschern.

## 4. Wartungsverträge
Für technische Anlagen sind regelmäßige Wartungen gesetzlich vorgeschrieben:
- **Heizungsanlagen:** Jährliche Wartung (GEG).
- **Aufzüge:** Halbjahreswartung + TÜV-Prüfung.
- **Brandschutzanlagen:** Jährliche Prüfung.
- **Blitzschutzanlagen:** Alle 4 Jahre.
    `,
    law: [
      "§ 13 WEG (Ordnungsgemäße Verwaltung)",
      "§ 21 WEG (Bauliche Veränderungen)",
      "§ 823 BGB (Verkehrssicherungspflicht)",
      "GEG (Gebäudeenergiegesetz)",
      "DIN EN 1176 (Spielplatzsicherheit)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Technische Verwaltung: Grundlagen & Pflichten' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Technische Verwaltung: Grundlagen & Pflichten'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Technische Verwaltung: Grundlagen & Pflichten' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Praxis-Fall: Winterdienst-Unfall

Ein Postbote stürzt auf dem vereisten Gehweg vor Ihrer WEG und bricht sich das Bein. Er verklagt die WEG auf Schmerzensgeld.

## Ihre Verteidigung:
1. **Nachweis der Organisation:** Winterdienstvertrag mit Hausmeister vorlegen.
2. **Dokumentation:** Streulisten führen (wann wurde gestreut?).
3. **Versicherung:** Haftpflichtversicherung der WEG informieren.

## Rechtslage:
- **Streupflicht:** Werktags 7-20 Uhr, Sonn-/Feiertags 8-20 Uhr (je nach Gemeinde).
- **Haftung:** Die WEG haftet, wenn keine ausreichende Organisation nachgewiesen werden kann.
- **Versicherung:** Die Gebäudehaftpflicht übernimmt in der Regel den Schaden.

**Prävention:** Klare Regelungen im Hausmeistervertrag, Dokumentation der Streueinsätze, ausreichende Versicherungssumme.
    `,
    task: `
## Erstellen Sie einen Wartungsplan

Sie verwalten eine WEG mit 30 Einheiten, Baujahr 1995. Folgende Anlagen sind vorhanden:
- Gasheizung (Zentralheizung)
- 1 Personenaufzug
- Rauchmelder in allen Wohnungen
- Spielplatz mit Schaukel und Rutsche

**Aufgabe:** Erstellen Sie einen Jahreswartungsplan mit allen gesetzlich vorgeschriebenen Prüfungen und Wartungen. Schätzen Sie die Kosten.

*Lösungshinweis: Heizung 300€, Aufzug 600€ (2x), Rauchmelder 200€, Spielplatz 400€, TÜV Aufzug 150€ = ca. 1.650€/Jahr.*
    `,
extendedTheory: `
### Vertiefung: Die technische Verwaltung als Fundament der Immobiliensicherheit

Die technische Verwaltung ist das oft unterschätzte Fundament einer professionellen Immobilienverwaltung. Während die kaufmännische und rechtliche Verwaltung im Vordergrund stehen, ist es die technische Verwaltung, die die Sicherheit, Funktionsfähigkeit und Werterhaltung der Immobilie gewährleistet. Ein Verwalter, der die technischen Aspekte vernachlässigt, gefährdet nicht nur die Substanz des Gebäudes, sondern setzt sich und den Eigentümer auch erheblichen Haftungsrisiken aus.

**Die Verkehrssicherungspflicht: Haftung für Unfälle und Schäden**

Die Verkehrssicherungspflicht ist eine der wichtigsten rechtlichen Grundlagen der technischen Verwaltung. Sie verpflichtet den Eigentümer (und damit den Verwalter als dessen Beauftragten), alle zumutbaren Maßnahmen zu ergreifen, um Gefahren für Dritte abzuwenden. Dies umfasst die regelmäßige Inspektion des Gebäudes und der Außenanlagen, die Beseitigung erkannter Gefahren und die Organisation eines funktionierenden Sicherheitssystems.

Typische Gefahrenquellen sind: Glatteis und Schnee auf Gehwegen (Winterdienst), defekte Beleuchtung im Treppenhaus (Stolpergefahr), lose Dachziegel (Herabfallen), defekte Spielgeräte auf dem Spielplatz, undichte Wasserleitungen (Überschwemmung) und fehlende oder defekte Rauchmelder (Brandgefahr). Kommt es zu einem Unfall, weil der Verwalter seine Verkehrssicherungspflicht verletzt hat, haftet die WEG für den Schaden. Die Gebäudehaftpflichtversicherung übernimmt in der Regel den Schaden, kann aber bei grober Fahrlässigkeit Regress beim Verwalter nehmen.

**Der Winterdienst als klassisches Beispiel**

Der Winterdienst ist ein Paradebeispiel für die Verkehrssicherungspflicht. Die WEG ist verpflichtet, Gehwege vor dem Grundstück von Schnee und Eis zu befreien und bei Glätte zu streuen. Die Räum- und Streupflicht gilt in der Regel werktags von 7 bis 20 Uhr, an Sonn- und Feiertagen von 8 bis 20 Uhr (die genauen Zeiten sind in der Gemeindesatzung geregelt). Bei anhaltendem Schneefall oder Glatteis muss mehrmals täglich geräumt und gestreut werden.

Die Organisation des Winterdienstes ist entscheidend. Der Verwalter muss entweder einen Hausmeister oder einen externen Dienstleister beauftragen und sicherstellen, dass dieser seine Pflichten erfüllt. Wichtig ist die Dokumentation: Der Hausmeister sollte Streulisten führen, in denen er festhält, wann und wo er gestreut hat. Diese Listen sind im Schadensfall der Nachweis, dass die WEG ihrer Verkehrssicherungspflicht nachgekommen ist.

**Wartungsverträge: Gesetzliche Pflichten und Haftungsrisiken**

Für viele technische Anlagen sind regelmäßige Wartungen gesetzlich vorgeschrieben. Die Nichteinhaltung dieser Pflichten kann zu Bußgeldern, Betriebsverboten und im Schadensfall zu erheblichen Haftungsrisiken führen. Der Verwalter muss sicherstellen, dass alle Wartungen termingerecht durchgeführt und dokumentiert werden.

Die Heizungsanlage muss nach dem Gebäudeenergiegesetz (GEG) jährlich gewartet werden. Die Wartung umfasst die Reinigung des Brenners, die Überprüfung der Einstellungen, die Messung der Abgaswerte und die Kontrolle der Sicherheitseinrichtungen. Der Schornsteinfeger führt zusätzlich eine jährliche Feuerstättenschau durch. Bei Gasheizungen ist zudem eine regelmäßige Dichtheitsprüfung der Gasleitung erforderlich.

Aufzüge müssen halbjährlich gewartet und jährlich durch den TÜV geprüft werden. Die Wartung umfasst die Überprüfung der mechanischen und elektrischen Komponenten, die Schmierung der Führungsschienen und die Kontrolle der Sicherheitseinrichtungen (Notbremse, Notruf, Überlastsicherung). Die TÜV-Prüfung ist eine Hauptuntersuchung, bei der die Betriebssicherheit des Aufzugs umfassend geprüft wird. Ohne gültige TÜV-Plakette darf der Aufzug nicht betrieben werden.

**Brandschutz: Rauchmelder, Feuerlöscher und Fluchtweg**

Der Brandschutz ist ein zentrales Thema der technischen Verwaltung. In allen Bundesländern besteht eine Rauchmelderpflicht für Wohnungen. Die Rauchmelder müssen in Schlafzimmern, Kinderzimmern und Fluren, die als Rettungswege dienen, installiert werden. Der Eigentümer ist für die Installation verantwortlich, der Mieter für die Wartung (Batteriewechsel, Funktionsprüfung). In der Praxis übernimmt oft der Verwalter die Wartung, um sicherzustellen, dass die Rauchmelder funktionsfähig sind.

Feuerlöscher müssen in Mehrfamilienhäusern in ausreichender Anzahl vorhanden und regelmäßig gewartet werden. Die Wartung muss alle zwei Jahre durch einen Sachkundigen erfolgen. Die Feuerlöscher sollten gut sichtbar und leicht zugänglich angebracht sein, idealerweise im Treppenhaus oder in der Nähe von Gefahrenquellen (Heizungsraum, Tiefgarage).

Die Fluchtwege müssen jederzeit frei und benutzbar sein. Treppenhäuser dürfen nicht als Abstellraum missbraucht werden, Notausgänge müssen von innen ohne Schlüssel zu öffnen sein und die Notbeleuchtung muss funktionieren. Der Verwalter muss regelmäßig kontrollieren, dass die Fluchtwege frei sind, und bei Verstößen einschreiten.

**Spielplatzsicherheit: DIN EN 1176 und regelmäßige Prüfung**

Spielplätze auf dem Gemeinschaftsgrundstück unterliegen der DIN EN 1176, die die Sicherheitsanforderungen an Spielplatzgeräte regelt. Die WEG ist verpflichtet, die Spielgeräte regelmäßig zu prüfen: eine wöchentliche Sichtprüfung durch den Hausmeister (Verschleiß, Beschädigungen, Verschmutzung), eine monatliche Funktionsprüfung (Stabilität, Verschraubungen, Seile) und eine jährliche Hauptinspektion durch einen zertifizierten Sachverständigen.

Die Hauptinspektion umfasst die Überprüfung der Standsicherheit, der Fundamentierung, der Verschraubungen, der Seile und Ketten, der Fallschutzmatten und der Sicherheitsabstände. Der Sachverständige erstellt einen Prüfbericht, der dokumentiert, ob die Spielgeräte den Sicherheitsanforderungen entsprechen. Mängel müssen umgehend behoben werden. Bei schweren Mängeln muss das Spielgerät gesperrt werden, bis die Reparatur erfolgt ist.

**Die Dokumentation als Nachweis der Sorgfaltspflicht**

Die Dokumentation ist im technischen Facility Management von zentraler Bedeutung. Alle Wartungen, Prüfungen, Reparaturen und Inspektionen müssen schriftlich festgehalten werden. Diese Dokumentation dient im Schadensfall als Nachweis, dass der Verwalter seiner Sorgfaltspflicht nachgekommen ist. Ohne Dokumentation wird im Zweifel angenommen, dass die Pflichten nicht erfüllt wurden.

Empfehlenswert ist die Führung eines Wartungsbuches oder einer digitalen Wartungsdatenbank, in der alle Maßnahmen mit Datum, Durchführendem und Ergebnis erfasst werden. Auch Fotos können hilfreich sein, um den Zustand vor und nach einer Maßnahme zu dokumentieren. Die Dokumentation sollte mindestens 10 Jahre aufbewahrt werden, da Haftungsansprüche in der Regel innerhalb dieser Frist verjähren.

*Quellen: § 13 WEG (Ordnungsgemäße Verwaltung), § 823 BGB (Verkehrssicherungspflicht), GEG (Gebäudeenergiegesetz), DIN EN 1176 (Spielplatzsicherheit), BetrSichV (Betriebssicherheitsverordnung), Landesbauordnungen (Rauchmelderpflicht)*
`
  },

  // Tag 22: Beschlussfassung über Sanierungen
  day_22: {
    title: "Beschlussfassung über Sanierungen",
    type: "Recht",
    theory: `
# Sanierungen: Zwischen Notwendigkeit und Mehrheitswillen

Sanierungen sind oft die größten Streitpunkte in einer WEG. Die Beschlussfassung ist komplex und hängt von der Art der Maßnahme ab.

## 1. Arten von baulichen Maßnahmen
- **Instandhaltung/Instandsetzung:** Erhaltung des ordnungsgemäßen Zustands (einfache Mehrheit).
- **Modernisierung:** Verbesserung des Wohnwerts (einfache Mehrheit, wenn privilegiert).
- **Bauliche Veränderung:** Änderung der Substanz (doppelt qualifizierte Mehrheit).

## 2. Beschlussmehrheiten nach WEG-Reform 2020
- **Einfache Mehrheit:** Mehr als 50% der abgegebenen Stimmen.
- **Doppelt qualifizierte Mehrheit:** Mehr als 50% aller Miteigentumsanteile (MEA) + mehr als 50% der Köpfe.

## 3. Privilegierte Modernisierungen (§ 20 WEG)
Seit 2020 können mit einfacher Mehrheit beschlossen werden:
- E-Mobilität (Wallboxen)
- Einbruchschutz
- Barrierefreiheit
- Glasfaseranschluss

## 4. Kostentragung
- **Grundregel:** Kosten werden nach Miteigentumsanteilen (MEA) verteilt.
- **Ausnahme:** Wenn einzelne Eigentümer nicht profitieren, können sie von den Kosten befreit werden (§ 16 Abs. 6 WEG).
    `,
    law: [
      "§ 20 WEG (Bauliche Veränderungen)",
      "§ 21 WEG (Instandhaltung und Instandsetzung)",
      "§ 16 WEG (Kostentragung)",
      "§ 25 WEG (Beschlussfassung)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Beschlussfassung über Sanierungen' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Beschlussfassung über Sanierungen'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Beschlussfassung über Sanierungen' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Praxis-Fall: Fassadensanierung

Ihre WEG (20 Einheiten) hat eine stark beschädigte Fassade. Die Sanierung kostet 200.000€.

## Beschlussfassung:
1. **Gutachten einholen:** Architekt bestätigt Notwendigkeit.
2. **Angebote einholen:** Mindestens 3 Vergleichsangebote.
3. **Finanzierung klären:** Rücklage reicht nicht -> Sonderumlage oder Kredit?
4. **Versammlung einberufen:** Beschluss mit einfacher Mehrheit (Instandsetzung).

## Kostentragung:
- **Erdgeschoss-Eigentümer:** "Warum soll ich zahlen? Ich sehe die Fassade nicht!"
- **Antwort:** Die Fassade ist Gemeinschaftseigentum. Alle zahlen nach MEA, unabhängig vom persönlichen Nutzen.

**Finanzierung:** Sonderumlage 10.000€/Einheit oder Gemeinschaftskredit (günstiger, aber Zinsrisiko).
    `,
    task: `
## Beschlussvorlage erstellen

Sie bereiten eine Eigentümerversammlung vor. TOP: Erneuerung der Heizungsanlage (80.000€).

**Aufgabe:** Formulieren Sie eine Beschlussvorlage mit:
1. Begründung der Notwendigkeit
2. Kostenaufstellung
3. Finanzierungsvorschlag
4. Beschlussvorschlag (exakte Formulierung)

*Lösungshinweis: "Die Eigentümerversammlung beschließt die Erneuerung der Heizungsanlage zum Preis von 80.000€. Die Finanzierung erfolgt durch Entnahme aus der Erhaltungsrücklage (50.000€) und Sonderumlage (30.000€, zahlbar bis 31.12.2026)."*
    `,
extendedTheory: `
### Vertiefung: Beschlussfassung über Sanierungen als komplexer Entscheidungsprozess

Die Beschlussfassung über Sanierungen gehört zu den anspruchsvollsten und konfliktträchtigsten Aufgaben in der WEG-Verwaltung. Sanierungen sind oft mit hohen Kosten verbunden, betreffen die Substanz des Gebäudes und haben langfristige Auswirkungen auf den Wert und die Bewohnbarkeit der Immobilie. Der Verwalter muss den Prozess von der ersten Idee bis zur Umsetzung professionell begleiten, die rechtlichen Rahmenbedingungen beachten und die Eigentümer durch einen transparenten, nachvollziehbaren Entscheidungsprozess führen.

**Die Unterscheidung der baulichen Maßnahmen nach dem WEG**

Das Wohnungseigentumsgesetz unterscheidet drei Arten von baulichen Maßnahmen, die unterschiedliche Beschlussmehrheiten erfordern. Die Instandhaltung und Instandsetzung dienen der Erhaltung des ordnungsgemäßen Zustands des Gemeinschaftseigentums. Sie sind mit einfacher Mehrheit (mehr als 50 Prozent der abgegebenen Stimmen) zu beschließen. Beispiele: Dachreparatur, Fassadenanstrich, Erneuerung defekter Fenster, Reparatur der Heizungsanlage.

Die Modernisierung verbessert den Wohnwert, erhöht die Energieeffizienz oder führt zu einer nachhaltigen Einsparung von Energie oder Wasser. Seit der WEG-Reform 2020 können bestimmte privilegierte Modernisierungen mit einfacher Mehrheit beschlossen werden (§ 20 Abs. 1 WEG): bauliche Maßnahmen zur Schaffung von Barrierefreiheit, zur Einrichtung von Lademöglichkeiten für Elektrofahrzeuge, zum Einbruchschutz und zum Anschluss an ein Breitbandnetz. Alle anderen Modernisierungen erfordern eine doppelt qualifizierte Mehrheit.

Die bauliche Veränderung ist jede Maßnahme, die über die Instandhaltung und Modernisierung hinausgeht und die Substanz oder das äußere Erscheinungsbild des Gebäudes wesentlich verändert. Sie erfordert eine doppelt qualifizierte Mehrheit (mehr als 50 Prozent aller Miteigentumsanteile plus mehr als 50 Prozent der Köpfe). Beispiele: Anbau eines Balkons, Aufstockung des Gebäudes, grundlegende Umgestaltung der Fassade.

**Der Prozess der Beschlussfassung: Von der Idee zur Umsetzung**

Der Prozess beginnt mit der Identifikation des Sanierungsbedarfs. Dies kann durch eine regelmäßige Gebäudeinspektion, durch Beschwerden von Eigentümern oder durch ein Gutachten erfolgen. Der Verwalter sollte zunächst die Dringlichkeit und die Notwendigkeit der Maßnahme prüfen. Bei größeren Sanierungen ist die Einholung eines Sachverständigengutachtens empfehlenswert, das den Zustand des Gebäudes bewertet und die notwendigen Maßnahmen beschreibt.

Der zweite Schritt ist die Einholung von Angeboten. Der Verwalter sollte mindestens drei Vergleichsangebote von qualifizierten Fachfirmen einholen. Die Angebote müssen vergleichbar sein (gleicher Leistungsumfang, gleiche Materialien) und sollten detailliert aufgeschlüsselt sein. Der Verwalter sollte die Angebote prüfen, Referenzen der Firmen einholen und gegebenenfalls Nachverhandlungen führen.

Der dritte Schritt ist die Klärung der Finanzierung. Reicht die Erhaltungsrücklage aus, um die Sanierung zu finanzieren? Wenn nicht, muss eine Sonderumlage beschlossen oder ein Gemeinschaftskredit aufgenommen werden. Die Sonderumlage belastet die Eigentümer sofort, der Kredit verteilt die Kosten über mehrere Jahre, verursacht aber Zinsen. Der Verwalter sollte beide Varianten durchrechnen und den Eigentümern präsentieren.

**Die Eigentümerversammlung: Präsentation und Beschlussfassung**

Die Eigentümerversammlung ist der zentrale Ort der Beschlussfassung. Der Verwalter muss die Sanierungsmaßnahme umfassend präsentieren: Warum ist die Maßnahme notwendig? Was passiert, wenn wir sie nicht durchführen? Welche Alternativen gibt es? Wie hoch sind die Kosten? Wie wird die Finanzierung sichergestellt? Wann soll die Maßnahme durchgeführt werden?

Die Präsentation sollte visuell unterstützt werden: Fotos des aktuellen Zustands, Pläne der geplanten Maßnahme, Kostenaufstellungen, Vergleichstabellen der Angebote. Je transparenter und nachvollziehbarer die Präsentation, desto höher die Wahrscheinlichkeit, dass die Eigentümer zustimmen. Der Verwalter sollte auch auf mögliche Bedenken eingehen und Lösungen anbieten (z.B. Ratenzahlung für finanziell schwache Eigentümer).

Die Beschlussvorlage muss präzise formuliert sein und alle wesentlichen Punkte enthalten: Art und Umfang der Maßnahme, Beauftragung der Firma X zum Preis von Y Euro, Finanzierung durch Sonderumlage/Kredit, Zeitplan für die Durchführung und Ermächtigung des Verwalters zur Durchführung und Überwachung der Maßnahme. Nach der Diskussion wird über die Beschlussvorlage abgestimmt. Das Ergebnis wird im Protokoll festgehalten.

**Die Kostentragung: Grundregel und Ausnahmen**

Die Grundregel der Kostentragung ist einfach: Alle Eigentümer tragen die Kosten nach ihren Miteigentumsanteilen (MEA). Dies gilt unabhängig davon, ob ein Eigentümer persönlich von der Maßnahme profitiert oder nicht. Beispiel: Ein Erdgeschoss-Eigentümer muss auch für die Dachreparatur zahlen, obwohl er das Dach nicht nutzt, weil das Dach Gemeinschaftseigentum ist und alle Eigentümer für dessen Erhaltung verantwortlich sind.

Es gibt jedoch Ausnahmen. Nach § 16 Abs. 6 WEG können Eigentümer, die von einer Maßnahme nicht oder nur unwesentlich profitieren, von den Kosten befreit werden. Dies ist eine Billigkeitsentscheidung, die von der Eigentümerversammlung getroffen werden kann. Beispiel: Bei der Installation eines Aufzugs können die Erdgeschoss-Eigentümer von den Kosten befreit werden, da sie den Aufzug nicht nutzen. Diese Befreiung ist aber nicht automatisch, sondern muss beschlossen werden.

**Die Finanzierung: Sonderumlage versus Gemeinschaftskredit**

Die Sonderumlage ist die einfachste Form der Finanzierung. Die Kosten werden auf die Eigentümer nach MEA umgelegt und müssen innerhalb einer festgelegten Frist (z.B. 3 Monate) gezahlt werden. Die Sonderumlage belastet die Eigentümer sofort und kann für finanziell schwache Eigentümer eine erhebliche Härte darstellen. Vorteil: Keine Zinsen, keine langfristige Bindung.

Der Gemeinschaftskredit verteilt die Kosten über mehrere Jahre. Die WEG nimmt einen Kredit bei einer Bank auf und zahlt ihn über monatliche Raten zurück. Die Raten werden über das Hausgeld eingezogen. Vorteil: Die Belastung ist geringer und verteilt sich über einen längeren Zeitraum. Nachteil: Es fallen Zinsen an, und die WEG ist langfristig gebunden. Der Verwalter sollte mehrere Kreditangebote einholen und die Konditionen vergleichen.

**Die Umsetzung und Überwachung der Sanierung**

Nach der Beschlussfassung beginnt die Umsetzung. Der Verwalter beauftragt die Firma, schließt den Vertrag ab und überwacht die Durchführung. Er sollte regelmäßig die Baustelle besuchen, den Fortschritt kontrollieren und bei Problemen eingreifen. Wichtig ist die Kommunikation mit den Eigentümern: Der Verwalter sollte sie regelmäßig über den Fortschritt informieren, Verzögerungen erklären und bei Beschwerden (z.B. Lärm, Schmutz) vermitteln.

Nach Abschluss der Sanierung erfolgt die Abnahme. Der Verwalter prüft gemeinsam mit einem Sachverständigen, ob die Arbeiten vertragsgemäß ausgeführt wurden. Mängel werden in einem Abnahmeprotokoll festgehalten und müssen von der Firma nachgebessert werden. Erst nach der mängelfreien Abnahme wird die Schlussrechnung bezahlt. Der Verwalter sollte die Gewährleistungsfristen (in der Regel 5 Jahre für Bauleistungen) im Auge behalten und bei auftretenden Mängeln die Firma zur Nachbesserung auffordern.

*Quellen: § 20 WEG (Bauliche Veränderungen), § 21 WEG (Instandhaltung und Instandsetzung), § 16 WEG (Kostentragung), § 25 WEG (Beschlussfassung), BGH V ZR 156/19 (Privilegierte Modernisierung), BGH V ZR 275/18 (Kostentragung bei Aufzug)*
`
  }
};

export const module3MissingDays41_42 = {
  day_41: {
    title: "Hausgeldabrechnung: Grundlagen und Pflichten",
    theory: `Die Hausgeldabrechnung ist das zentrale Finanzdokument der WEG-Verwaltung. Jeder Eigentümer zahlt monatlich Hausgeld als Vorauszahlung auf die gemeinschaftlichen Kosten. Die jährliche Abrechnung zeigt ob zu viel oder zu wenig gezahlt wurde.`,
    extendedTheory: `## Hausgeldabrechnung — Das Herzstück der WEG-Verwaltung

### Was ist Hausgeld?
Hausgeld ist die monatliche Vorauszahlung jedes Wohnungseigentümers auf die laufenden Kosten der Wohnanlage. Es deckt:
- Laufende Betriebskosten (Strom, Wasser, Heizung)
- Verwaltungskosten (Verwalterhonorar, Versicherungen)
- Instandhaltungsrücklage (Pflichtanteil nach § 19 Abs. 2 Nr. 4 WEG)
- Eventuelle Sonderumlagen

### Struktur der Jahresabrechnung (§ 28 Abs. 2 WEG)
Die Jahresabrechnung besteht aus:

**1. Gesamtabrechnung**
Alle Einnahmen und Ausgaben der Gemeinschaft im Abrechnungsjahr — unabhängig von der Verteilung auf Eigentümer.

**2. Einzelabrechnungen**
Anteilige Kosten für jeden einzelnen Eigentümer basierend auf dem Verteilerschlüssel (meist Miteigentumsanteile, MEA).

**3. Vermögensbericht (§ 28 Abs. 4 WEG)**
Seit WEG-Reform 2020 Pflicht: Zeigt aktuellen Stand der Rücklagen und Verbindlichkeiten.

### Verteilerschlüssel
- **Miteigentumsanteile (MEA):** Standard für die meisten Kosten
- **Wohnfläche:** Häufig bei Heizkosten (HeizkostenV)
- **Personenanzahl:** Selten, für Wasserkosten möglich
- **Verbrauch:** Bei Einzelzählern (Heizkostenabrechnung)

### Heizkosten-Besonderheit (HeizkostenV)
Mindestens 50%, höchstens 70% nach Verbrauch abrechnen — Rest nach Wohnfläche. Verstoß: Kürzungsrecht des Eigentümers um 15%.

### Fristen
- Abrechnung bis spätestens 31. März des Folgejahres
- Eigentümerversammlung zur Genehmigung
- Nachzahlungen/Guthaben nach Beschlussfassung fällig

### Häufige Fehler in der Abrechnung
1. Falscher Verteilerschlüssel
2. Fehlende Einzelabrechnungen
3. Falsche Rücklagenzuordnung
4. Vergessene Einnahmen (Versicherungserstattungen)
5. Kein Vermögensbericht`,
    law: [
      "§ 28 WEG — Wirtschaftsplan, Rechnungslegung, Vermögensbericht: https://www.gesetze-im-internet.de/woeigg/__28.html",
      "§ 19 WEG — Ordnungsmäßige Verwaltung: https://www.gesetze-im-internet.de/woeigg/__19.html",
      "Heizkostenverordnung (HeizkostenV): https://www.gesetze-im-internet.de/heizkostenv/",
    ],
    practice: `Praxisfall Hausgeldabrechnung:
Eine WEG mit 10 Wohnungen (gesamt 800 m²) hat folgende Jahreskosten:
- Versicherungen: 4.800€
- Hausmeister: 6.000€ 
- Strom Gemeinschaft: 1.200€
- Heizung gesamt: 12.000€ (davon 7.200€ nach Verbrauch, 4.800€ nach Fläche)
- Verwalterhonorar: 3.600€
- Rücklage: 4.800€

Wohnung Nr. 3: 85 m², MEA: 110/1000, Heizverbrauch: 12% des Gesamtverbrauchs

Aufgabe: Berechnen Sie das Hausgeld für Wohnung Nr. 3.`,
    tasks: [
      {
        type: "calculation",
        question: "Eine WEG hat 8 Einheiten. Jahreskosten 48.000€. Wohnung A hat 95 MEA von 1000. Vorauszahlung war 450€/Monat. Ergebnis der Jahresabrechnung für Wohnung A?",
        hint: "Anteil = 95/1000 × 48.000€. Dann mit geleisteten Vorauszahlungen vergleichen."
      },
      {
        type: "case",
        question: "Eigentümer Müller beschwert sich: 'Die Abrechnung stimmt nicht — Heizkosten wurden nur nach Fläche verteilt, obwohl Zähler vorhanden sind.' Hat er Recht? Welche Konsequenz hat ein Verstoß gegen die HeizkostenV?",
        hint: "HeizkostenV § 12: Kürzungsrecht bei Verstoß gegen Verbrauchserfassung"
      },
      {
        type: "reflection",
        question: "Warum ist der Vermögensbericht seit der WEG-Reform 2020 Pflicht? Welchen Mehrwert schafft er für Eigentümer und Käufer?",
        hint: "Transparenz über Rücklagensituation — relevant für Kaufentscheidungen"
      }
    ],
    quiz: [
      {
        question: "Wie hoch muss der verbrauchsabhängige Anteil bei der Heizkostenabrechnung mindestens sein?",
        options: ["30%", "50%", "70%", "100%"],
        answer: "1",
        explanation: "§ 7 HeizkostenV: Mindestens 50%, höchstens 70% nach Verbrauch — Rest nach Wohnfläche."
      }
    ]
  },

  day_42: {
    title: "Sonderumlage und Wirtschaftsplan: Planung und Durchsetzung",
    theory: `Wenn die regulären Rücklagen nicht ausreichen oder unvorhergesehene Kosten entstehen, beschließt die Eigentümerversammlung eine Sonderumlage. Der Wirtschaftsplan legt fest was im kommenden Jahr geplant ist und wie hoch das Hausgeld sein wird.`,
    extendedTheory: `## Sonderumlage und Wirtschaftsplan

### Der Wirtschaftsplan (§ 28 Abs. 1 WEG)
Der Verwalter erstellt jährlich einen Wirtschaftsplan der enthält:
- Voraussichtliche Einnahmen und Ausgaben
- Beitragsleistungen der Eigentümer (Hausgeld)
- Beiträge zur Instandhaltungsrücklage

**Ablauf:**
1. Verwalter erstellt Entwurf (bis Oktober/November)
2. Beirat prüft und berät
3. Eigentümerversammlung beschließt (einfache Mehrheit)
4. Ab 1. Januar gilt der neue Plan

**Vorschuss vs. Vorauszahlung:**
Der beschlossene Wirtschaftsplan begründet Vorauszahlungspflichten. Zahlt ein Eigentümer nicht, kann die Gemeinschaft gerichtlich vollstrecken — auch ohne Mahnung!

### Die Sonderumlage
Eine Sonderumlage wird beschlossen wenn:
- Unvorhergesehene Reparaturen anfallen (Dach, Fassade, Heizung)
- Die Rücklage nicht ausreicht
- Sofortmaßnahmen finanziert werden müssen

**Rechtliche Grundlage:** § 19 Abs. 2 Nr. 4 WEG i.V.m. Mehrheitsbeschluss

**Verteilung:** Nach Miteigentumsanteilen (MEA) — außer die Gemeinschaft beschließt einen anderen Schlüssel

**Zahlungspflicht:** Mit Beschlussfassung — nicht erst nach Fälligkeit der Kosten!

### Anfechtung von Beschlüssen
Eigentümer können Beschlüsse über Sonderumlage oder Wirtschaftsplan anfechten:
- Frist: 1 Monat ab Beschluss (§ 45 WEG)
- Klage beim Amtsgericht (Ort der Immobilie)
- Keine aufschiebende Wirkung: Zahlen trotzdem!

### Praxisproblem: Zahlungsausfall
Zahlt ein Eigentümer nicht:
1. Mahnung (formlos möglich)
2. Beschluss über gerichtliche Beitreibung
3. Mahnverfahren oder Klage
4. Vollstreckung ins Grundbuch möglich (§ 10 Abs. 3 ZVG)

### Besonderheit: Erwerber haftet mit
Wer eine Eigentumswohnung kauft, haftet für rückständiges Hausgeld des Voreigentümers bis zu einem bestimmten Betrag — wichtig bei der Due Diligence!`,
    law: [
      "§ 28 WEG — Wirtschaftsplan: https://www.gesetze-im-internet.de/woeigg/__28.html",
      "§ 19 WEG — Ordnungsmäßige Verwaltung: https://www.gesetze-im-internet.de/woeigg/__19.html",
      "§ 45 WEG — Anfechtungsklage: https://www.gesetze-im-internet.de/woeigg/__45.html",
      "§ 10 Abs. 3 ZVG — Haftung des Erwerbers: https://www.gesetze-im-internet.de/zvg/__10.html",
    ],
    practice: `Praxisfall Sonderumlage:
In einer WEG mit 12 Einheiten (MEA gesamt: 1000) muss das Dach repariert werden. Kosten laut Angebot: 84.000€. Die Instandhaltungsrücklage beträgt nur 22.000€.

Eigentümer Schmidt (MEA: 95) fragt:
1. Wie hoch ist seine Sonderumlage?
2. Wann muss er zahlen?
3. Kann er die Zahlung verweigern bis er das Protokoll erhalten hat?`,
    tasks: [
      {
        type: "calculation",
        question: "WEG mit 6 Einheiten beschließt Sonderumlage von 36.000€. Eigentümer Bauer: MEA 180/1000. Wie hoch ist seine Sonderumlage? Wann ist sie fällig?",
        hint: "180/1000 × 36.000€. Fälligkeit: gemäß Beschluss, oft sofort oder innerhalb 4 Wochen."
      },
      {
        type: "case",
        question: "Eigentümerin Weber verweigert die Sonderumlage weil sie den Beschluss für zu teuer hält. Sie hat nicht gegen den Beschluss gestimmt und ihn auch nicht angefochten. Was sind die Konsequenzen?",
        hint: "Bestandskräftiger Beschluss — Anfechtungsfrist abgelaufen. Vollstreckung möglich."
      },
      {
        type: "reflection",
        question: "Ein Wohnungskäufer fragt Sie: 'Ich kaufe die Wohnung im März. Im Januar wurde eine Sonderumlage beschlossen. Muss ich die zahlen?' Wie antworten Sie?",
        hint: "§ 10 Abs. 3 ZVG: Erwerber haftet für laufendes Jahr und Vorjahr. Due Diligence wichtig!"
      }
    ],
    quiz: [
      {
        question: "Wie lange beträgt die Anfechtungsfrist für WEG-Beschlüsse?",
        options: ["2 Wochen", "1 Monat", "3 Monate", "6 Monate"],
        answer: "1",
        explanation: "§ 45 WEG: Die Anfechtungsklage muss innerhalb eines Monats nach Beschlussfassung erhoben werden."
      }
    ]
  }
};
