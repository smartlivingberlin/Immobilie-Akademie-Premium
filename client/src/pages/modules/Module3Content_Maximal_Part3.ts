// Maximalist Content for Module 3 (Verwalter) - Part 3 (Days 41-60)

export const contentDataModule3MaximalPart3 = {
  // Tag 41: Die Jahresabrechnung - Grundlagen
  day_41: {
    title: "Die Jahresabrechnung: Das Zeugnis des Verwalters",
    type: "Kaufmännisch",
    theory: `
# Die Jahresabrechnung (Hausgeldabrechnung)

Die Erstellung der Jahresabrechnung ist eine der wichtigsten Pflichten des Verwalters (§ 28 WEG). Sie muss klar, verständlich und rechnerisch richtig sein.

## 1. Bestandteile der Abrechnung
Eine ordnungsgemäße Abrechnung besteht aus:
- **Gesamtabrechnung:** Einnahmen und Ausgaben der gesamten WEG.
- **Einzelabrechnungen:** Aufteilung der Kosten auf jeden Eigentümer.
- **Entwicklung der Erhaltungsrücklage:** Anfangsbestand + Zuführung - Entnahme = Endbestand.
- **Vermögensstatus:** Übersicht über Kontostände, Forderungen und Verbindlichkeiten.

## 2. Abrechnungsspitze
Die Abrechnung endet für jeden Eigentümer mit einem Ergebnis:
- **Nachzahlung:** Vorauszahlungen waren zu niedrig.
- **Guthaben:** Vorauszahlungen waren zu hoch.

*Wichtig:* Beschlossen wird in der ETV nur die "Abrechnungsspitze" (das Ergebnis), nicht die Vorauszahlungen selbst (die wurden ja schon im Wirtschaftsplan beschlossen).

## 3. Verteilungsschlüssel
Die Kosten müssen korrekt verteilt werden (§ 16 WEG):
- **MEA (Miteigentumsanteile):** Der Standard für fast alles (Versicherung, Verwaltung, Instandhaltung).
- **Einheiten:** Pauschal pro Wohnung (z.B. Kabelgebühren, wenn so vereinbart).
- **Verbrauch:** Zwingend bei Heizung und Warmwasser (Heizkostenverordnung!).
    `,
    law: [
      "§ 28 WEG (Wirtschaftsplan, Jahresabrechnung)",
      "HeizkostenV (Heizkostenverordnung)",
      "BGH V ZR 44/09 (Anforderungen an die Abrechnung)"
    ],
    practice: `
# Praxis-Check: Die Abrechnung prüfen

Bevor Sie die Abrechnung versenden, prüfen Sie folgende Punkte (Plausibilitätsprüfung):

1.  **Saldo-Gleichheit:** Summe der Einzelabrechnungen = Gesamtabrechnung?
2.  **Kontenabstimmung:** Stimmt der rechnerische Endbestand mit dem tatsächlichen Bankauszug zum 31.12. überein?
3.  **Heizkosten:** Sind die Gesamtkosten der Heizung (Brennstoff + Nebenkosten) identisch mit der Summe, die der Messdienstleister (Techem, Ista, Brunata) verteilt hat?
4.  **Rücklage:** Stimmt die Entwicklung? (Zinsen nicht vergessen!).

**Häufiger Fehler:** Abgrenzungsprobleme. In die Abrechnung gehören nur tatsächliche Zahlungen im Abrechnungsjahr (Abflussprinzip), keine Rechnungen, die erst im Januar bezahlt wurden (außer bei Heizkosten -> Leistungsprinzip gem. HeizkostenV).
    `,
    task: `
## Berechnen Sie die Verteilung

Gesamtkosten Müllabfuhr: 2.500 €
Verteilschlüssel: Miteigentumsanteile (MEA)
Gesamt-MEA der Anlage: 1.000

**Berechnen Sie den Anteil für:**
- Eigentümer A (85 MEA)
- Eigentümer B (120 MEA)

*Lösung:*
A: 2.500 / 1.000 * 85 = 212,50 €
B: 2.500 / 1.000 * 120 = 300,00 €
    `,
  extendedTheory: `
### Die Jahresabrechnung: Rechtliche Grundlagen und praktische Umsetzung

**Gesetzliche Verpflichtung zur Abrechnung**

Die Jahresabrechnung ist keine freiwillige Leistung, sondern eine zwingende gesetzliche Pflicht des Verwalters gemäß § 28 Abs. 3 WEG. Sie muss spätestens sechs Monate nach Ende des Abrechnungszeitraums erstellt werden. Bei Verzögerungen drohen dem Verwalter Schadensersatzansprüche, da die Eigentümer ein berechtigtes Interesse an zeitnaher Information über ihre finanzielle Situation haben.

**Die drei Säulen einer ordnungsgemäßen Abrechnung**

Eine rechtssichere Jahresabrechnung besteht aus drei unverzichtbaren Komponenten, die eng miteinander verzahnt sind:

**1. Die Gesamtabrechnung (Einnahmen-Ausgaben-Rechnung)**

Die Gesamtabrechnung bildet das Herzstück und zeigt die finanzielle Entwicklung der gesamten Wohnungseigentümergemeinschaft. Sie gliedert sich in:

- **Einnahmen:** Hausgeldvorauszahlungen aller Eigentümer, Zinserträge, Sonderumlagen, Erstattungen (z.B. Versicherungsleistungen)
- **Ausgaben:** Alle tatsächlich gezahlten Beträge im Abrechnungsjahr nach Kostenarten gegliedert (Versicherung, Energie, Verwaltung, Instandhaltung, etc.)
- **Saldo:** Überschuss oder Fehlbetrag der Gemeinschaft

**Wichtig:** Es gilt das **Abflussprinzip** (Zufluss-Abfluss-Rechnung). Maßgeblich ist nicht das Rechnungsdatum, sondern der tatsächliche Zahlungszeitpunkt. Eine Rechnung vom 28.12.2025, die erst am 05.01.2026 bezahlt wurde, gehört in die Abrechnung 2026!

**Ausnahme:** Bei Heizkosten gilt das **Leistungsprinzip** gemäß Heizkostenverordnung. Hier zählt der Verbrauchszeitraum, nicht der Zahlungszeitpunkt.

**2. Die Einzelabrechnungen (Kostenverteilung)**

Jeder Eigentümer erhält eine individuelle Abrechnung, die zeigt:
- Seine geleisteten Vorauszahlungen
- Seinen Kostenanteil nach den beschlossenen Verteilerschlüsseln
- Die Abrechnungsspitze (Nachzahlung oder Guthaben)

**Verteilerschlüssel müssen exakt angewendet werden:**
- **MEA (Miteigentumsanteile):** Standard für alle gemeinschaftlichen Kosten (Versicherung, Verwaltung, Grundsteuer, Allgemeinstrom)
- **Wohnfläche:** Oft bei Heizkosten für den Grundkostenanteil (mind. 30%, max. 50%)
- **Verbrauch:** Zwingend bei Heizung und Warmwasser für den verbrauchsabhängigen Anteil (mind. 50%, max. 70%)
- **Einheiten:** Pauschal pro Wohnung (z.B. Kabelgebühren, wenn so beschlossen)

**3. Die Entwicklung der Erhaltungsrücklage**

Die Rücklagenentwicklung muss transparent dargestellt werden:
- Anfangsbestand zum 01.01.
- Zuführungen aus den Vorauszahlungen
- Zinserträge
- Entnahmen für Instandhaltungsmaßnahmen
- Endbestand zum 31.12.

**Wichtig:** Der rechnerische Endbestand muss mit dem tatsächlichen Kontostand übereinstimmen! Abweichungen deuten auf Fehler hin.

**Formale Anforderungen an die Abrechnung**

Die Rechtsprechung (insbesondere BGH V ZR 44/09) hat klare Anforderungen definiert:

1. **Klarheit und Übersichtlichkeit:** Ein durchschnittlicher Eigentümer muss die Abrechnung ohne Fachkenntnisse nachvollziehen können
2. **Rechnerische Richtigkeit:** Alle Zahlen müssen stimmen, Summen müssen korrekt sein
3. **Vollständigkeit:** Alle Einnahmen und Ausgaben müssen erfasst sein
4. **Belegbarkeit:** Jede Position muss durch Belege nachweisbar sein

**Häufige Fehler in der Praxis**

1. **Abgrenzungsfehler:** Kosten werden dem falschen Jahr zugeordnet
2. **Falsche Verteilerschlüssel:** MEA statt Verbrauch bei Heizkosten
3. **Fehlende Abstimmung:** Kontostand stimmt nicht mit Abrechnung überein
4. **Unvollständige Unterlagen:** Belege fehlen oder sind unleserlich
5. **Heizkosten-Fehler:** Gesamtkosten stimmen nicht mit Messdienstleister überein

**Die Abrechnungsspitze: Nachzahlung oder Guthaben**

Am Ende der Einzelabrechnung steht für jeden Eigentümer ein Ergebnis:

**Nachzahlung:** Die Vorauszahlungen waren zu niedrig. Der Eigentümer muss nachzahlen. Diese Forderung wird sofort fällig, sobald die Abrechnung beschlossen wurde.

**Guthaben:** Die Vorauszahlungen waren zu hoch. Der Eigentümer hat ein Guthaben. Dieses kann:
- Ausgezahlt werden (Überweisung)
- Mit künftigen Vorauszahlungen verrechnet werden (häufigste Praxis)
- Auf Wunsch des Eigentümers gespendet werden (z.B. an die Rücklage)

**Wichtig:** Die Eigentümerversammlung beschließt nur über die **Feststellung der Abrechnung**, nicht über die Vorauszahlungen selbst (die wurden ja bereits im Wirtschaftsplan beschlossen).

**Fristen und Konsequenzen**

- **Erstellungsfrist:** 6 Monate nach Ende des Abrechnungsjahres (§ 28 Abs. 3 WEG)
- **Verjährung von Nachzahlungen:** 3 Jahre ab Beschluss (§ 195 BGB)
- **Verjährung von Guthaben:** 3 Jahre ab Beschluss (§ 195 BGB)

Bei Nichteinhaltung der Frist kann der Verwalter abberufen werden (§ 26 Abs. 1 WEG) und haftet für entstandene Schäden.
`
  },

  // Tag 42: Der Wirtschaftsplan
  day_42: {
    title: "Der Wirtschaftsplan: Der Blick in die Zukunft",
    type: "Kaufmännisch",
    theory: `
# Der Wirtschaftsplan (WiPla)

Der WiPla ist die Prognose der Einnahmen und Ausgaben für das kommende Jahr. Er ist die Grundlage für die monatlichen Hausgeldzahlungen der Eigentümer.

## 1. Erstellung
- **Basis:** Die Kosten des Vorjahres.
- **Anpassung:** Preissteigerungen einplanen (z.B. +5% bei Energie, +3% bei Versicherungen).
- **Sonderfaktoren:** Geplante Wartungen oder TÜV-Gebühren berücksichtigen.

## 2. Die Hausgeldzahlung
Das Hausgeld setzt sich zusammen aus:
- Bewirtschaftungskosten (umlagefähig auf Mieter, z.B. Müll, Wasser).
- Verwaltungskosten (nicht umlagefähig).
- Instandhaltungsrücklage (nicht umlagefähig).

*Wichtig:* Der Eigentümer muss wissen, welchen Teil er auf seinen Mieter umlegen kann. Daher sollte der WiPla dies ausweisen.

## 3. Beschluss
Die Eigentümer beschließen über die **Vorschüsse**. Sobald der Beschluss gefasst ist, sind die Zahlungen fällig. Ohne Beschluss keine Zahlungspflicht (außer bei Fortgeltungsklausel im Vorjahresbeschluss).
    `,
    law: [
      "§ 28 Abs. 1 WEG (Aufstellung des Wirtschaftsplans)",
      "§ 28 Abs. 2 WEG (Verpflichtung zur Zahlung)"
    ],
    practice: `
# Praxis-Tipp: Die Liquiditätsfalle

Viele Verwalter planen zu knapp ("Wir wollen das Hausgeld nicht erhöhen").

**Gefahr:** Wenn im Winter das Heizöl teurer wird als geplant, ist das Konto leer. Die WEG wird zahlungsunfähig.

**Lösung:** Planen Sie immer einen Puffer ("Liquiditätsreserve") ein. Erklären Sie den Eigentümern: "Lieber 20 € mehr im Monat zahlen und am Ende eine Rückzahlung bekommen, als eine hohe Nachzahlung leisten müssen."
    `,
    task: `
## Erstellen Sie einen WiPla-Auszug

Kosten Vorjahr:
- Versicherung: 4.000 € (Ankündigung Erhöhung 10%)
- Strom: 1.200 € (stabil)
- Gartenpflege: 3.000 € (neuer Vertrag, 3.500 € pauschal)

**Erstellen Sie die Plan-Ansätze für das neue Jahr.**
    `,
  extendedTheory: `
### Der Wirtschaftsplan: Finanzplanung und Liquiditätssicherung

**Der Wirtschaftsplan als Finanzierungsgrundlage**

Der Wirtschaftsplan (WiPla) ist das zentrale Steuerungsinstrument für die finanzielle Planung der Wohnungseigentümergemeinschaft. Er legt fest, welche Kosten im kommenden Jahr erwartet werden und wie hoch die monatlichen Hausgeldzahlungen sein müssen, um diese Kosten zu decken.

**Gesetzliche Grundlage: § 28 Abs. 1 WEG**

Der Verwalter ist verpflichtet, für jedes Kalenderjahr einen Wirtschaftsplan aufzustellen und der Eigentümerversammlung zur Beschlussfassung vorzulegen. Ohne beschlossenen Wirtschaftsplan gibt es keine Zahlungspflicht der Eigentümer (außer bei Fortgeltungsklausel).

**Aufbau und Struktur des Wirtschaftsplans**

Ein vollständiger Wirtschaftsplan gliedert sich in folgende Bereiche:

**1. Bewirtschaftungskosten (umlagefähig auf Mieter)**
- Grundsteuer
- Wasserversorgung und Entwässerung
- Müllabfuhr
- Gebäudereinigung (Treppenhaus, Außenanlagen)
- Gartenpflege
- Beleuchtung (Allgemeinstrom)
- Schornsteinfeger
- Sach- und Haftpflichtversicherung
- Hausmeister (soweit Betriebskosten)

**2. Verwaltungskosten (nicht umlagefähig)**
- Verwalterhonorar
- Kontoführungsgebühren
- Porto, Telefon, Büromaterial
- Rechts- und Steuerberatung
- Wirtschaftsprüfung

**3. Instandhaltung und Instandsetzung**
- Laufende Reparaturen und Wartungen
- Zuführung zur Erhaltungsrücklage

**Wichtig:** Die Gliederung sollte so erfolgen, dass Eigentümer erkennen können, welche Kosten sie auf ihre Mieter umlegen können (§ 2 BetrKV).

**Erstellung des Wirtschaftsplans: Die Methodik**

**Schritt 1: Analyse der Vorjahresabrechnung**

Die Basis für jeden Wirtschaftsplan ist die Abrechnung des Vorjahres. Hier sehen Sie:
- Welche Kosten tatsächlich angefallen sind
- Ob die Vorauszahlungen ausreichend waren
- Wo Nachzahlungen oder Guthaben entstanden sind

**Schritt 2: Anpassung an erwartete Preisentwicklungen**

Nicht alle Kosten bleiben gleich. Typische Anpassungen:
- **Energie (Strom, Gas, Öl):** +5-15% je nach Marktlage
- **Versicherungen:** +3-5% jährlich
- **Wasser/Abwasser:** +2-3% (kommunale Gebühren)
- **Gartenpflege/Reinigung:** +3-4% (Lohnkosten)
- **Verwaltung:** +2-3% (Indexierung)

**Schritt 3: Berücksichtigung von Sonderfaktoren**

- Geplante Wartungen (z.B. TÜV Aufzug alle 2 Jahre)
- Bekannte Preissteigerungen (z.B. Versicherungserhöhung bereits angekündigt)
- Neue Verträge (z.B. Gartenpflege neuer Anbieter)
- Wegfall von Kosten (z.B. Heizungswartung war letztes Jahr Sonderfall)

**Schritt 4: Liquiditätsreserve einplanen**

**Wichtig:** Planen Sie immer einen Puffer von 5-10% ein! Gründe:
- Unvorhergesehene Reparaturen
- Preissteigerungen während des Jahres
- Verzögerungen bei Zahlungseingängen
- Vermeidung von Liquiditätsengpässen

**Beispielrechnung: Wirtschaftsplan für 10 Wohneinheiten**

**Ausgangslage:**
- Gesamtkosten Vorjahr: 48.000 €
- Erwartete Preissteigerung: 5%
- Sonderfaktor: TÜV Aufzug 1.200 € (alle 2 Jahre)

**Berechnung:**
- Basis: 48.000 €
- Preissteigerung 5%: 48.000 × 1,05 = 50.400 €
- TÜV Aufzug: + 1.200 €
- Liquiditätsreserve 5%: (50.400 + 1.200) × 0,05 = 2.580 €
- **Gesamt-WiPla: 54.180 €**

**Monatliche Vorauszahlung pro Wohnung:**
54.180 € ÷ 12 Monate ÷ 10 Wohnungen = 451,50 € pro Wohnung/Monat

**Die Hausgeldzahlung: Zusammensetzung und Fälligkeit**

Das monatliche Hausgeld setzt sich zusammen aus:
1. **Bewirtschaftungskosten** (umlagefähig auf Mieter)
2. **Verwaltungskosten** (nicht umlagefähig)
3. **Instandhaltungsrücklage** (nicht umlagefähig)

**Wichtig für vermietende Eigentümer:** Sie müssen wissen, welchen Teil sie auf den Mieter umlegen können. Daher sollte der Wirtschaftsplan diese Aufteilung ausweisen.

**Beispiel:**
- Bewirtschaftungskosten: 250 €/Monat (umlagefähig)
- Verwaltung: 30 €/Monat (nicht umlagefähig)
- Rücklage: 80 €/Monat (nicht umlagefähig)
- **Gesamt-Hausgeld: 360 €/Monat**

Der Eigentümer kann 250 € auf den Mieter umlegen, muss aber 110 € selbst tragen.

**Beschlussfassung und Zahlungspflicht**

Die Eigentümerversammlung beschließt über den Wirtschaftsplan mit einfacher Mehrheit (§ 25 Abs. 1 WEG). Der Beschluss legt fest:
- Die Höhe der monatlichen Vorauszahlungen
- Die Fälligkeit (üblicherweise zum 1. oder 15. des Monats)
- Die Verteilung nach Miteigentumsanteilen

**Wichtig:** Sobald der Beschluss gefasst ist, sind die Vorauszahlungen fällig. Ohne Beschluss gibt es keine Zahlungspflicht (außer bei Fortgeltungsklausel: "Der Wirtschaftsplan gilt bis zur Neubeschlussfassung fort").

**Häufige Fehler bei der Wirtschaftsplanung**

1. **Zu knappe Planung:** "Wir wollen das Hausgeld nicht erhöhen" → Liquiditätsengpass im Winter
2. **Vergessene Sonderfaktoren:** TÜV, Wartungen, Versicherungserhöhungen nicht berücksichtigt
3. **Keine Liquiditätsreserve:** Kein Puffer für Unvorhergesehenes
4. **Falsche Verteilung:** Umlagefähige und nicht umlagefähige Kosten nicht getrennt ausgewiesen
5. **Fehlende Fortgeltungsklausel:** Bei verspäteter Beschlussfassung keine Zahlungspflicht

**Die Liquiditätsfalle: Ein Praxisbeispiel**

**Ausgangslage:**
- WiPla zu knapp geplant (keine Reserve)
- Im Winter steigt der Ölpreis um 30%
- Heizöllieferung kostet 8.000 € statt geplanter 6.000 €
- Konto hat nur noch 1.500 € (Rücklage darf nicht verwendet werden!)

**Folgen:**
- WEG ist zahlungsunfähig
- Heizöllieferant liefert nicht mehr
- Eigentümer frieren
- Sonderumlage muss beschlossen werden (dauert Wochen)
- Verwalter haftet für Schäden

**Lösung:** Immer mit Liquiditätsreserve planen! Lieber am Jahresende eine kleine Rückzahlung als eine hohe Nachzahlung.
`
  }
  
  // ... (Fortsetzung für alle Tage 41-60)
};
