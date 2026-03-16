// Modul 5: Darlehensvermittlung §34i GewO
// Teil 3: Tage 11-15 (Theorie)

export const contentDataModule5_34i_Part3: Record<string, {
  title: string;
  theory: string;
  extendedTheory?: string;
  law: string[];
  practice: string;
  task: string;
  solution?: string;
  type?: string;
}> = {

  day_11: {
    title: "Darlehensarten: Annuitätendarlehen, Tilgungsdarlehen, Endfälliges Darlehen",
    theory: `Es gibt verschiedene Darlehensarten, die sich in der Rückzahlungsstruktur unterscheiden. Das **Annuitätendarlehen** ist die häufigste Form: Die monatliche Rate (Annuität) bleibt konstant, setzt sich aber aus einem sinkenden Zinsanteil und einem steigenden Tilgungsanteil zusammen. Das **Tilgungsdarlehen** hat eine konstante Tilgung, wodurch die Rate sinkt (Zinsen werden weniger). Das **endfällige Darlehen** wird während der Laufzeit nur verzinst, die Tilgung erfolgt am Ende in einer Summe (oft kombiniert mit Lebensversicherung oder Bausparvertrag). Jede Darlehensart hat Vor- und Nachteile: Annuitätendarlehen bietet Planungssicherheit, Tilgungsdarlehen spart Zinsen, endfälliges Darlehen ermöglicht niedrige monatliche Belastung.`,
    extendedTheory: `**Darlehensarten im Detail:**

**1. Annuitätendarlehen:**

**Definition:**
Das Annuitätendarlehen ist die häufigste Darlehensform in Deutschland. Die monatliche Rate (Annuität) bleibt über die gesamte Zinsbindung konstant.

**Zusammensetzung der Rate:**
- **Zinsanteil:** Sinkt mit jeder Rate (da Restschuld sinkt)
- **Tilgungsanteil:** Steigt mit jeder Rate (da Zinsanteil sinkt)
- **Annuität = Zinsanteil + Tilgungsanteil**

**Beispiel:**
- Darlehensbetrag: 300.000 €
- Zinssatz: 3,5% p.a.
- Anfangstilgung: 2% p.a.
- **Annuität:** 300.000 € × (3,5% + 2%) = 16.500 €/Jahr = 1.375 €/Monat

**Erste Rate:**
- Zinsen: 300.000 € × 3,5% / 12 = 875 €
- Tilgung: 1.375 € - 875 € = 500 €
- **Restschuld:** 300.000 € - 500 € = 299.500 €

**Zweite Rate:**
- Zinsen: 299.500 € × 3,5% / 12 = 873,54 €
- Tilgung: 1.375 € - 873,54 € = 501,46 €
- **Restschuld:** 299.500 € - 501,46 € = 298.998,54 €

**Vorteile:**
- Planungssicherheit (konstante Rate)
- Einfache Kalkulation
- Weit verbreitet

**Nachteile:**
- Höhere Gesamtzinsbelastung als Tilgungsdarlehen
- Tilgungsanteil anfangs gering

---

**2. Tilgungsdarlehen (Abzahlungsdarlehen):**

**Definition:**
Beim Tilgungsdarlehen bleibt die Tilgung konstant, die Zinsen sinken mit der Restschuld. Dadurch sinkt die monatliche Rate.

**Zusammensetzung der Rate:**
- **Tilgungsanteil:** Konstant
- **Zinsanteil:** Sinkt mit jeder Rate
- **Rate = Tilgung + Zinsen**

**Beispiel:**
- Darlehensbetrag: 300.000 €
- Zinssatz: 3,5% p.a.
- Laufzeit: 25 Jahre
- **Tilgung pro Jahr:** 300.000 € / 25 = 12.000 €/Jahr = 1.000 €/Monat

**Erste Rate:**
- Tilgung: 1.000 €
- Zinsen: 300.000 € × 3,5% / 12 = 875 €
- **Gesamt:** 1.000 € + 875 € = 1.875 €

**Zweite Rate:**
- Tilgung: 1.000 €
- Zinsen: (300.000 € - 1.000 €) × 3,5% / 12 = 872,08 €
- **Gesamt:** 1.000 € + 872,08 € = 1.872,08 €

**Letzte Rate (nach 25 Jahren):**
- Tilgung: 1.000 €
- Zinsen: 1.000 € × 3,5% / 12 = 2,92 €
- **Gesamt:** 1.000 € + 2,92 € = 1.002,92 €

**Vorteile:**
- Geringere Gesamtzinsbelastung (da Restschuld schneller sinkt)
- Schnellere Entschuldung
- Sinkende monatliche Belastung

**Nachteile:**
- Höhere Anfangsrate (schwerer finanzierbar)
- Weniger Planungssicherheit (Rate ändert sich)

---

**3. Endfälliges Darlehen:**

**Definition:**
Beim endfälligen Darlehen wird während der Laufzeit nur der Zins gezahlt. Die Tilgung erfolgt am Ende der Laufzeit in einer Summe.

**Zusammensetzung der Rate:**
- **Zinsanteil:** Konstant (da Restschuld konstant bleibt)
- **Tilgungsanteil:** 0 € (während Laufzeit)
- **Tilgung am Ende:** Gesamter Darlehensbetrag

**Beispiel:**
- Darlehensbetrag: 300.000 €
- Zinssatz: 3,5% p.a.
- Laufzeit: 25 Jahre

**Monatliche Rate:**
- Zinsen: 300.000 € × 3,5% / 12 = 875 €/Monat
- Tilgung: 0 €
- **Gesamt:** 875 €/Monat

**Am Ende der Laufzeit:**
- Tilgung: 300.000 € (in einer Summe)

**Kombination mit Lebensversicherung:**
Oft wird ein endfälliges Darlehen mit einer Lebensversicherung kombiniert:
- Kunde zahlt monatlich in Lebensversicherung ein
- Am Ende der Laufzeit: Auszahlung der Lebensversicherung tilgt das Darlehen

**Vorteile:**
- Niedrige monatliche Belastung (nur Zinsen)
- Steuerliche Vorteile bei Vermietung (Zinsen voll abzugsfähig)
- Flexibilität (Tilgung kann aus anderen Quellen erfolgen)

**Nachteile:**
- Höchste Gesamtzinsbelastung (Restschuld bleibt konstant)
- Risiko: Lebensversicherung erreicht nicht den gewünschten Betrag
- Keine Entschuldung während Laufzeit

---

**4. Vergleich der Darlehensarten:**

**Gesamtzinsbelastung (Beispiel 300.000 €, 3,5%, 25 Jahre):**

**Annuitätendarlehen:**
- Monatliche Rate: 1.500 € (ca.)
- Gesamtzinsen: ca. 150.000 €

**Tilgungsdarlehen:**
- Anfangsrate: 1.875 €
- Endrate: 1.003 €
- Gesamtzinsen: ca. 132.000 € (18.000 € weniger als Annuitätendarlehen)

**Endfälliges Darlehen:**
- Monatliche Rate: 875 € (nur Zinsen)
- Gesamtzinsen: ca. 262.500 € (112.500 € mehr als Annuitätendarlehen)

**Empfehlung:**
- **Eigennutzung:** Annuitätendarlehen (Planungssicherheit)
- **Vermietung:** Endfälliges Darlehen (steuerliche Vorteile)
- **Schnelle Entschuldung:** Tilgungsdarlehen (geringste Zinslast)

---

**5. Sonderformen:**

**Volltilgerdarlehen:**
- Annuitätendarlehen mit 100% Tilgung bis Ende der Zinsbindung
- Keine Anschlussfinanzierung erforderlich
- Höhere Rate, aber Planungssicherheit

**Forward-Darlehen:**
- Zinssicherung für zukünftige Anschlussfinanzierung
- Bis zu 5 Jahre im Voraus abschließen
- Zinsaufschlag (Forward-Prämie)

**KfW-Darlehen:**
- Förderdarlehen der Kreditanstalt für Wiederaufbau
- Günstige Zinsen (unter Marktniveau)
- Tilgungszuschüsse bei energieeffizienten Immobilien
- Kombination mit Bankdarlehen möglich`,
    law: [
      "§ 488 BGB (Darlehensvertrag)",
      "§ 489 BGB (Ordentliches Kündigungsrecht)",
      "§ 490 BGB (Außerordentliches Kündigungsrecht)",
      "§ 491 BGB (Immobiliar-Verbraucherdarlehensvertrag)",
      "§ 492 BGB (Angaben im Darlehensvertrag)",
      "§ 493 BGB (Pflichtangaben bei Immobiliar-Verbraucherdarlehensverträgen)"
    ],
    practice: `**Praxisfall 1: Annuitätendarlehen berechnen**

Ein Kunde möchte ein Annuitätendarlehen über 250.000 € aufnehmen. Zinssatz: 3,0% p.a., Anfangstilgung: 2,5% p.a.

**Fragen:**
1. Wie hoch ist die jährliche Annuität?
2. Wie hoch ist die monatliche Rate?
3. Wie hoch sind Zinsen und Tilgung in der ersten Rate?
4. Wie entwickelt sich die Restschuld?
5. Wann ist das Darlehen vollständig getilgt (bei gleichbleibender Tilgung)?

---

**Praxisfall 2: Tilgungsdarlehen vs. Annuitätendarlehen**

Ein Kunde kann sich zwischen einem Tilgungsdarlehen und einem Annuitätendarlehen entscheiden:
- Darlehensbetrag: 300.000 €
- Zinssatz: 3,5% p.a.
- Laufzeit: 20 Jahre

**Fragen:**
1. Wie hoch ist die Anfangsrate beim Tilgungsdarlehen?
2. Wie hoch ist die Endrate beim Tilgungsdarlehen?
3. Wie hoch sind die Gesamtzinsen beim Tilgungsdarlehen?
4. Wie hoch sind die Gesamtzinsen beim Annuitätendarlehen (2% Anfangstilgung)?
5. Welches Darlehen empfehlen Sie?

---

**Praxisfall 3: Endfälliges Darlehen mit Lebensversicherung**

Ein Kunde möchte ein endfälliges Darlehen über 200.000 € aufnehmen und mit einer Lebensversicherung kombinieren:
- Darlehenszinssatz: 3,5% p.a.
- Laufzeit: 25 Jahre
- Lebensversicherung: 150 €/Monat, erwartete Auszahlung nach 25 Jahren: 200.000 €

**Fragen:**
1. Wie hoch ist die monatliche Zinsbelastung?
2. Wie hoch ist die Gesamtbelastung pro Monat (Zinsen + Lebensversicherung)?
3. Wie hoch sind die Gesamtzinsen nach 25 Jahren?
4. Was passiert, wenn die Lebensversicherung nur 180.000 € auszahlt?
5. Für wen eignet sich dieses Modell?`,
    task: `**Aufgabe 1: Annuitätendarlehen berechnen**

Berechnen Sie die monatliche Rate für ein Annuitätendarlehen:
- Darlehensbetrag: 350.000 €
- Zinssatz: 3,2% p.a.
- Anfangstilgung: 2,8% p.a.
- **Jährliche Annuität:** ?
- **Monatliche Rate:** ?
- **Zinsen in erster Rate:** ?
- **Tilgung in erster Rate:** ?

---

**Aufgabe 2: Tilgungsdarlehen berechnen**

Berechnen Sie die Anfangsrate für ein Tilgungsdarlehen:
- Darlehensbetrag: 400.000 €
- Zinssatz: 3,8% p.a.
- Laufzeit: 25 Jahre
- **Tilgung pro Monat:** ?
- **Zinsen in erster Rate:** ?
- **Anfangsrate:** ?

---

**Aufgabe 3: Vergleich Darlehensarten**

Vergleichen Sie die Gesamtzinsbelastung:
- Darlehensbetrag: 300.000 €
- Zinssatz: 3,5% p.a.
- Laufzeit: 25 Jahre

**Annuitätendarlehen (2% Anfangstilgung):**
- Gesamtzinsen: ?

**Tilgungsdarlehen:**
- Gesamtzinsen: ?

**Endfälliges Darlehen:**
- Gesamtzinsen: ?`,
    solution: `**Lösung Praxisfall 1:**
1. Jährliche Annuität: 250.000 € × (3,0% + 2,5%) = 13.750 €/Jahr.
2. Monatliche Rate: 13.750 € / 12 = 1.145,83 €/Monat.
3. Zinsen erste Rate: 250.000 € × 3,0% / 12 = 625 €, Tilgung: 1.145,83 € - 625 € = 520,83 €.
4. Restschuld nach 1. Rate: 250.000 € - 520,83 € = 249.479,17 €.
5. Vollständige Tilgung: ca. 27 Jahre (bei 2,5% Anfangstilgung).

**Lösung Praxisfall 2:**
1. Anfangsrate Tilgungsdarlehen: Tilgung 1.250 €/Monat + Zinsen 875 €/Monat = 2.125 €/Monat.
2. Endrate Tilgungsdarlehen: Tilgung 1.250 €/Monat + Zinsen ca. 3,65 €/Monat = 1.253,65 €/Monat.
3. Gesamtzinsen Tilgungsdarlehen: ca. 105.000 €.
4. Gesamtzinsen Annuitätendarlehen: ca. 120.000 €.
5. Empfehlung: Tilgungsdarlehen (geringere Gesamtzinsen), wenn Kunde hohe Anfangsrate finanzieren kann.

**Lösung Praxisfall 3:**
1. Monatliche Zinsbelastung: 200.000 € × 3,5% / 12 = 583,33 €/Monat.
2. Gesamtbelastung: 583,33 € + 150 € = 733,33 €/Monat.
3. Gesamtzinsen: 583,33 € × 12 × 25 = 175.000 €.
4. Wenn Lebensversicherung nur 180.000 € auszahlt: Restschuld 20.000 € muss aus Eigenkapital getilgt werden.
5. Eignet sich für: Vermieter (steuerliche Vorteile), Kunden mit sicherer Kapitalanlage.

**Lösung Aufgabe 1:**
- Jährliche Annuität: 350.000 € × (3,2% + 2,8%) = 21.000 €/Jahr
- Monatliche Rate: 21.000 € / 12 = 1.750 €/Monat
- Zinsen erste Rate: 350.000 € × 3,2% / 12 = 933,33 €
- Tilgung erste Rate: 1.750 € - 933,33 € = 816,67 €

**Lösung Aufgabe 2:**
- Tilgung pro Monat: 400.000 € / (25 × 12) = 1.333,33 €
- Zinsen erste Rate: 400.000 € × 3,8% / 12 = 1.266,67 €
- Anfangsrate: 1.333,33 € + 1.266,67 € = 2.600 €

**Lösung Aufgabe 3:**
- Annuitätendarlehen: ca. 150.000 € Gesamtzinsen
- Tilgungsdarlehen: ca. 132.000 € Gesamtzinsen
- Endfälliges Darlehen: ca. 262.500 € Gesamtzinsen`,
    type: "Theorie"
  },

  day_12: {
    title: "Bauspardarlehen, KfW-Darlehen und Förderprogramme",
    theory: `Bauspardarlehen sind Darlehen von Bausparkassen, die nach einer Ansparphase ausgezahlt werden. Der Kunde spart zunächst 40-50% der Bausparsumme an, danach erhält er ein zinsgünstiges Darlehen. Vorteile: Niedrige Zinsen, Planungssicherheit, staatliche Förderung (Wohnungsbauprämie, Arbeitnehmersparzulage). KfW-Darlehen sind Förderdarlehen der Kreditanstalt für Wiederaufbau für energieeffizientes Bauen, Modernisierung und Familien. Vorteile: Zinsen unter Marktniveau, Tilgungszuschüsse bis 45%, lange Zinsbindung. Förderprogramme gibt es auf Bundes-, Landes- und kommunaler Ebene (z.B. Baukindergeld, Wohneigentumsförderung). Die Kombination verschiedener Darlehensarten (Bank + Bausparen + KfW) kann die Finanzierung optimieren.`,
    extendedTheory: `**Bauspardarlehen, KfW-Darlehen und Förderprogramme im Detail:**

**1. Bauspardarlehen:**

**Funktionsweise:**
1. **Ansparphase:** Kunde spart 40-50% der Bausparsumme an
2. **Zuteilung:** Nach Erreichen der Mindestansparung und Bewertungszahl
3. **Darlehensphase:** Auszahlung des Bauspardarlehens (50-60% der Bausparsumme)

**Beispiel:**
- Bausparsumme: 100.000 €
- Ansparung: 40.000 € (40%)
- Bauspardarlehen: 60.000 €
- Guthabenzins: 0,1% p.a.
- Darlehenszins: 2,5% p.a.

**Ansparphase:**
- Monatliche Sparrate: 500 €
- Dauer: ca. 7 Jahre (bis 40.000 € angespart)
- Zinsen auf Guthaben: 0,1% p.a.

**Darlehensphase:**
- Auszahlung: 60.000 €
- Zinssatz: 2,5% p.a.
- Tilgung: 0,5% p.a.
- Monatliche Rate: 60.000 € × (2,5% + 0,5%) / 12 = 150 €

**Vorteile:**
- Niedrige Zinsen (unter Marktniveau)
- Planungssicherheit (Zinssatz fest bei Vertragsabschluss)
- Staatliche Förderung (Wohnungsbauprämie, Arbeitnehmersparzulage)

**Nachteile:**
- Lange Ansparphase (7-10 Jahre)
- Niedrige Guthabenzinsen
- Abschlussgebühr (1-1,6% der Bausparsumme)

**Staatliche Förderung:**

**Wohnungsbauprämie:**
- 10% auf Einzahlungen bis 700 €/Jahr (Alleinstehende) bzw. 1.400 €/Jahr (Verheiratete)
- Einkommensgrenze: 35.000 €/Jahr (Alleinstehende) bzw. 70.000 €/Jahr (Verheiratete)
- **Beispiel:** 700 € Einzahlung × 10% = 70 € Prämie/Jahr

**Arbeitnehmersparzulage:**
- 9% auf vermögenswirksame Leistungen bis 470 €/Jahr
- Einkommensgrenze: 17.900 €/Jahr (Alleinstehende) bzw. 35.800 €/Jahr (Verheiratete)
- **Beispiel:** 470 € VL × 9% = 42,30 € Sparzulage/Jahr

---

**2. KfW-Darlehen:**

**Kreditanstalt für Wiederaufbau (KfW):**
- Staatliche Förderbank
- Fördert energieeffizientes Bauen, Modernisierung, Familien
- Zinsen unter Marktniveau
- Tilgungszuschüsse

**Wichtigste Programme:**

**KfW 124 - Wohneigentumsprogramm:**
- Für Familien mit Kindern
- Bis 100.000 € pro Wohneinheit
- Zinssatz: ca. 2,5% p.a. (unter Marktniveau)
- Laufzeit: bis 35 Jahre
- Tilgungsfreie Anlaufjahre: bis 5 Jahre

**KfW 153 - Energieeffizient Bauen:**
- Für Neubau von Effizienzhäusern (KfW 40, KfW 40 Plus)
- Bis 150.000 € pro Wohneinheit
- Zinssatz: ca. 1,5% p.a.
- Tilgungszuschuss: bis 45.000 € (bei KfW 40 Plus)
- **Beispiel:** 150.000 € Darlehen, 30% Tilgungszuschuss = 45.000 € geschenkt

**KfW 261 - Wohngebäude – Kredit:**
- Für energetische Sanierung
- Bis 150.000 € pro Wohneinheit
- Zinssatz: ca. 1,8% p.a.
- Tilgungszuschuss: bis 75.000 € (bei Effizienzhaus 40)

**KfW 270 - Erneuerbare Energien – Standard:**
- Für Photovoltaik, Batteriespeicher
- Bis 50 Mio. € pro Vorhaben
- Zinssatz: ca. 4,5% p.a.
- Keine Tilgungszuschüsse

**Kombination mit Bankdarlehen:**
- KfW-Darlehen wird über Hausbank ausgezahlt
- Kombination mit Bankdarlehen möglich
- **Beispiel:** 300.000 € Finanzierung = 150.000 € KfW + 150.000 € Bank

**Vorteile:**
- Zinsen unter Marktniveau
- Tilgungszuschüsse (geschenktes Geld)
- Lange Zinsbindung (bis 20 Jahre)
- Tilgungsfreie Anlaufjahre

**Nachteile:**
- Aufwendiger Antragsprozess
- Energieberater erforderlich (bei KfW 153, 261)
- Nachweispflichten (Baubegleitung)

---

**3. Förderprogramme:**

**Bundesförderung:**

**Baukindergeld (ausgelaufen 2020):**
- 12.000 € pro Kind über 10 Jahre (1.200 €/Jahr)
- Einkommensgrenze: 75.000 € + 15.000 € pro Kind
- **Beispiel:** Familie mit 2 Kindern = 24.000 € über 10 Jahre

**Wohneigentumsförderung für Familien (ab 2023):**
- Bis 100.000 € zinsgünstiges Darlehen (KfW 124)
- Für Familien mit Kindern
- Einkommensgrenze: 60.000 € + 10.000 € pro Kind

**Landesförderung:**

**Bayern - Bayerisches Wohnungsbauprogramm:**
- Bis 180.000 € zinsgünstiges Darlehen
- Zinssatz: 0,5% p.a.
- Einkommensgrenze: 60.000 € + 10.000 € pro Kind

**Nordrhein-Westfalen - NRW.BANK.Wohneigentum:**
- Bis 50.000 € zinsgünstiges Darlehen
- Zinssatz: 1,0% p.a.
- Einkommensgrenze: 50.000 € + 10.000 € pro Kind

**Kommunale Förderung:**
- Grundstücksvergabe zu günstigen Preisen
- Zuschüsse für Erschließungskosten
- Erlass von Grunderwerbsteuer (in einigen Gemeinden)

---

**4. Kombination verschiedener Darlehensarten:**

**Beispiel Finanzierung 400.000 €:**

**Variante 1: Nur Bankdarlehen**
- 400.000 € Bankdarlehen (3,5% p.a.)
- Monatliche Rate: 1.833 € (2% Tilgung)
- Gesamtzinsen: ca. 200.000 €

**Variante 2: Bank + KfW**
- 250.000 € Bankdarlehen (3,5% p.a.)
- 150.000 € KfW 153 (1,5% p.a., 30% Tilgungszuschuss)
- Tilgungszuschuss: 45.000 €
- Effektiv zu finanzieren: 250.000 € + 105.000 € = 355.000 €
- Monatliche Rate: ca. 1.600 €
- Gesamtzinsen: ca. 140.000 €
- **Ersparnis: 60.000 € + 45.000 € Tilgungszuschuss = 105.000 €**

**Variante 3: Bank + KfW + Bausparen**
- 200.000 € Bankdarlehen (3,5% p.a.)
- 150.000 € KfW 153 (1,5% p.a., 30% Tilgungszuschuss)
- 50.000 € Bauspardarlehen (2,5% p.a., nach 7 Jahren)
- Tilgungszuschuss: 45.000 €
- Effektiv zu finanzieren: 200.000 € + 105.000 € + 50.000 € = 355.000 €
- Monatliche Rate: ca. 1.550 €
- Gesamtzinsen: ca. 130.000 €
- **Ersparnis: 70.000 € + 45.000 € Tilgungszuschuss = 115.000 €**

**Empfehlung:**
- Immer KfW-Förderung prüfen (Tilgungszuschüsse sind geschenktes Geld)
- Bausparen für Anschlussfinanzierung (Zinssicherung)
- Kombination verschiedener Darlehensarten optimiert Finanzierung`,
    law: [
      "BauSparkG (Bausparkassengesetz)",
      "WoPG (Wohnungsbau-Prämiengesetz)",
      "5. VermBG (Fünftes Vermögensbildungsgesetz)",
      "KfW-Gesetz",
      "EEG (Erneuerbare-Energien-Gesetz)",
      "EnEV (Energieeinsparverordnung)"
    ],
    practice: `**Praxisfall 1: Bauspardarlehen**

Ein Kunde möchte in 10 Jahren eine Immobilie kaufen und schließt einen Bausparvertrag ab:
- Bausparsumme: 100.000 €
- Ansparung: 40% (40.000 €)
- Monatliche Sparrate: 400 €
- Guthabenzins: 0,1% p.a.
- Darlehenszins: 2,5% p.a.

**Fragen:**
1. Wie lange dauert die Ansparphase?
2. Wie hoch ist das Bauspardarlehen?
3. Wie hoch ist die monatliche Rate in der Darlehensphase?
4. Welche staatliche Förderung kann der Kunde nutzen?
5. Lohnt sich der Bausparvertrag?

---

**Praxisfall 2: KfW-Förderung**

Ein Kunde baut ein Effizienzhaus KfW 40 Plus für 400.000 €. Er beantragt KfW 153:
- Darlehensbetrag: 150.000 €
- Zinssatz: 1,5% p.a.
- Tilgungszuschuss: 30%
- Laufzeit: 25 Jahre

**Fragen:**
1. Wie hoch ist der Tilgungszuschuss?
2. Wie viel muss der Kunde effektiv zurückzahlen?
3. Wie hoch ist die monatliche Rate?
4. Wie hoch sind die Gesamtzinsen?
5. Wie viel spart der Kunde im Vergleich zu einem Bankdarlehen (3,5% p.a.)?

---

**Praxisfall 3: Kombination Bank + KfW + Bausparen**

Ein Kunde finanziert eine Immobilie für 350.000 €:
- 200.000 € Bankdarlehen (3,5% p.a.)
- 100.000 € KfW 153 (1,5% p.a., 30% Tilgungszuschuss)
- 50.000 € Bauspardarlehen (2,5% p.a., nach 7 Jahren)

**Fragen:**
1. Wie hoch ist der KfW-Tilgungszuschuss?
2. Wie viel muss der Kunde effektiv finanzieren?
3. Wie hoch ist die monatliche Rate?
4. Wie hoch sind die Gesamtzinsen?
5. Wie viel spart der Kunde im Vergleich zu einem reinen Bankdarlehen?`,
    task: `**Aufgabe 1: Bauspardarlehen berechnen**

Berechnen Sie die Ansparphase und Darlehensphase:
- Bausparsumme: 80.000 €
- Ansparung: 50% (40.000 €)
- Monatliche Sparrate: 500 €
- Guthabenzins: 0,1% p.a.
- Darlehenszins: 2,3% p.a.
- **Dauer Ansparphase:** ?
- **Bauspardarlehen:** ?
- **Monatliche Rate Darlehensphase:** ?

---

**Aufgabe 2: KfW-Tilgungszuschuss berechnen**

Berechnen Sie den Tilgungszuschuss für KfW 153:
- Darlehensbetrag: 120.000 €
- Effizienzhaus: KfW 40 Plus
- Tilgungszuschuss: 30%
- **Tilgungszuschuss:** ?
- **Effektiv zu finanzieren:** ?

---

**Aufgabe 3: Kombination Darlehensarten**

Vergleichen Sie die Finanzierung:

**Variante 1: Nur Bankdarlehen**
- 300.000 € Bankdarlehen (3,5% p.a., 2% Tilgung)
- **Monatliche Rate:** ?
- **Gesamtzinsen:** ?

**Variante 2: Bank + KfW**
- 150.000 € Bankdarlehen (3,5% p.a., 2% Tilgung)
- 150.000 € KfW 153 (1,5% p.a., 30% Tilgungszuschuss, 2% Tilgung)
- **Tilgungszuschuss:** ?
- **Monatliche Rate:** ?
- **Gesamtzinsen:** ?
- **Ersparnis:** ?`,
    solution: `**Lösung Praxisfall 1:**
1. Dauer Ansparphase: 40.000 € / 400 € = 100 Monate = ca. 8,3 Jahre.
2. Bauspardarlehen: 100.000 € - 40.000 € = 60.000 €.
3. Monatliche Rate Darlehensphase: 60.000 € × (2,5% + 0,5%) / 12 = 150 €.
4. Staatliche Förderung: Wohnungsbauprämie (70 €/Jahr), Arbeitnehmersparzulage (42,30 €/Jahr).
5. Lohnt sich, wenn: Niedrige Zinsen wichtiger als Rendite, Planungssicherheit gewünscht, staatliche Förderung genutzt wird.

**Lösung Praxisfall 2:**
1. Tilgungszuschuss: 150.000 € × 30% = 45.000 €.
2. Effektiv zurückzahlen: 150.000 € - 45.000 € = 105.000 €.
3. Monatliche Rate: 105.000 € × (1,5% + 2%) / 12 = 306,25 €.
4. Gesamtzinsen: ca. 20.000 €.
5. Ersparnis: ca. 30.000 € Zinsen + 45.000 € Tilgungszuschuss = 75.000 €.

**Lösung Praxisfall 3:**
1. KfW-Tilgungszuschuss: 100.000 € × 30% = 30.000 €.
2. Effektiv finanzieren: 200.000 € + 70.000 € + 50.000 € = 320.000 €.
3. Monatliche Rate: ca. 1.450 €.
4. Gesamtzinsen: ca. 110.000 €.
5. Ersparnis: ca. 60.000 € Zinsen + 30.000 € Tilgungszuschuss = 90.000 €.

**Lösung Aufgabe 1:**
- Dauer Ansparphase: 40.000 € / 500 € = 80 Monate = ca. 6,7 Jahre
- Bauspardarlehen: 80.000 € - 40.000 € = 40.000 €
- Monatliche Rate Darlehensphase: 40.000 € × (2,3% + 0,5%) / 12 = 93,33 €

**Lösung Aufgabe 2:**
- Tilgungszuschuss: 120.000 € × 30% = 36.000 €
- Effektiv zu finanzieren: 120.000 € - 36.000 € = 84.000 €

**Lösung Aufgabe 3:**

**Variante 1: Nur Bankdarlehen**
- Monatliche Rate: 300.000 € × (3,5% + 2%) / 12 = 1.375 €
- Gesamtzinsen: ca. 150.000 €

**Variante 2: Bank + KfW**
- Tilgungszuschuss: 150.000 € × 30% = 45.000 €
- Monatliche Rate: (150.000 € × 5,5% + 105.000 € × 3,5%) / 12 = ca. 990 €
- Gesamtzinsen: ca. 90.000 €
- Ersparnis: 60.000 € Zinsen + 45.000 € Tilgungszuschuss = 105.000 €`,
    type: "Theorie"
  },

  day_13: {
    title: "Zinsbindung, Sollzins, Effektivzins und Konditionsvergleich",
    theory: `Die Zinsbindung legt fest, wie lange der Zinssatz fest bleibt (5, 10, 15, 20 Jahre). Längere Zinsbindung bietet Planungssicherheit, kostet aber mehr Zinsen. Der Sollzins ist der reine Darlehenszins ohne Nebenkosten. Der Effektivzins berücksichtigt alle Kosten (Sollzins + Bearbeitungsgebühr + Disagio + Schätzkosten) und ist die Vergleichsgröße. Beim Konditionsvergleich müssen Sie mehrere Angebote einholen und den Effektivzins, die Zinsbindung, Sondertilgungsrechte und Bereitstellungszinsen vergleichen. Ein Unterschied von 0,5% Effektivzins kann über 25 Jahre mehrere Zehntausend Euro ausmachen. Sie müssen dem Kunden mindestens 3 Angebote vorlegen und die Vor- und Nachteile erklären.`,
    extendedTheory: `
### Zinsentwicklung Deutschland 2024/2025 (aktuell)

**EZB-Leitzins (Einlagensatz):**
| Datum | Leitzins |
|-------|---------|
| Jun 2023 | 4,00% (Höchststand) |
| Jun 2024 | 3,75% (erste Senkung) |
| Sep 2024 | 3,50% |
| Dez 2024 | 3,00% |
| Mär 2025 | 2,50% (aktuell) |

**Bauzinsen Deutschland (10J Zinsbindung, Stand März 2026):**
- Durchschnitt: ca. 3,8–4,2% p.a.
- Beste Konditionen (sehr gute Bonität, 60% Beleihung): ab 3,5%
- Höhere Beleihung (>80%): Aufschlag 0,3–0,8%

**Forward-Darlehen 2025:**
- Vorlaufzeit 12 Monate: Aufschlag ca. 0,20%
- Vorlaufzeit 24 Monate: Aufschlag ca. 0,40%
- Vorlaufzeit 36 Monate: Aufschlag ca. 0,60%

**Prüfungshinweis:** Die IHK-Prüfung fragt keine tagesaktuellen Zinsen,
sondern das Verständnis der Zinsstruktur und Berechnungsmethoden.
Aktuelle Marktdaten sind für die Beratungspraxis nach §34i GewO wichtig.

`**Zinsbindung, Sollzins, Effektivzins und Konditionsvergleich im Detail:**

**1. Zinsbindung:**

**Definition:**
Die Zinsbindung (auch Zinsfestschreibung) legt fest, wie lange der Zinssatz unverändert bleibt.

**Übliche Zinsbindungen:**
- 5 Jahre
- 10 Jahre (am häufigsten)
- 15 Jahre
- 20 Jahre
- 30 Jahre (Volltilgung)

**Beispiel:**
- Darlehensbetrag: 300.000 €
- Zinsbindung: 10 Jahre
- Zinssatz: 3,5% p.a. (fest für 10 Jahre)
- Nach 10 Jahren: Anschlussfinanzierung erforderlich

**Vor- und Nachteile:**

**Kurze Zinsbindung (5 Jahre):**
- **Vorteile:** Niedrigere Zinsen, Flexibilität
- **Nachteile:** Zinsänderungsrisiko nach 5 Jahren

**Lange Zinsbindung (20 Jahre):**
- **Vorteile:** Planungssicherheit, Schutz vor Zinsanstieg
- **Nachteile:** Höhere Zinsen, weniger Flexibilität

**Empfehlung:**
- **Niedrige Zinsen:** Lange Zinsbindung (15-20 Jahre) sichern
- **Hohe Zinsen:** Kurze Zinsbindung (5 Jahre), dann neu verhandeln

---

**2. Sollzins (Nominalzins):**

**Definition:**
Der Sollzins ist der reine Darlehenszins ohne Nebenkosten.

**Beispiel:**
- Darlehensbetrag: 300.000 €
- Sollzins: 3,5% p.a.
- **Zinsen pro Jahr:** 300.000 € × 3,5% = 10.500 €

**Wichtig:**
- Sollzins ist NICHT die Vergleichsgröße
- Sollzins berücksichtigt keine Nebenkosten

---

**3. Effektivzins:**

**Definition:**
Der Effektivzins berücksichtigt alle Kosten des Darlehens und ist die Vergleichsgröße.

**Berücksichtigte Kosten:**
- Sollzins
- Bearbeitungsgebühr (nicht mehr zulässig seit 2014)
- Disagio (Damnum) - Abschlag bei Auszahlung
- Schätzkosten
- Vermittlungsgebühr

**Nicht berücksichtigt:**
- Notarkosten
- Grundbuchkosten
- Grunderwerbsteuer

**Berechnung:**
Effektivzins = Sollzins + (Nebenkosten / Darlehensbetrag / Laufzeit)

**Beispiel:**
- Darlehensbetrag: 300.000 €
- Sollzins: 3,5% p.a.
- Disagio: 3% (9.000 €)
- Auszahlung: 291.000 €
- **Effektivzins:** ca. 3,8% p.a.

**Wichtig:**
- Effektivzins ist die Vergleichsgröße
- Je höher die Nebenkosten, desto höher der Effektivzins

---

**4. Konditionsvergleich:**

**Pflicht:**
Sie müssen dem Kunden mindestens 3 Angebote vorlegen (§ 511 BGB).

**Vergleichskriterien:**

**1. Effektivzins:**
- Wichtigste Vergleichsgröße
- **Beispiel:** Bank A: 3,5%, Bank B: 3,8%, Bank C: 3,6%

**2. Zinsbindung:**
- Wie lange ist der Zinssatz fest?
- **Beispiel:** Bank A: 10 Jahre, Bank B: 15 Jahre, Bank C: 10 Jahre

**3. Sondertilgungsrechte:**
- Wie viel kann pro Jahr extra getilgt werden?
- **Beispiel:** Bank A: 5% p.a., Bank B: 10% p.a., Bank C: 0%

**4. Bereitstellungszinsen:**
- Kosten, wenn Darlehen nicht sofort abgerufen wird
- **Beispiel:** Bank A: 0,25% p.M. nach 3 Monaten, Bank B: 0,15% p.M. nach 6 Monaten

**5. Vorfälligkeitsentschädigung:**
- Kosten bei vorzeitiger Rückzahlung
- **Beispiel:** Bank A: 1% des Restbetrags, Bank B: 0,5%

**6. Tilgungssatzwechsel:**
- Kann die Tilgung angepasst werden?
- **Beispiel:** Bank A: 1x kostenlos, Bank B: unbegrenzt

---

**5. Beispiel Konditionsvergleich:**

**Bank A:**
- Effektivzins: 3,5% p.a.
- Zinsbindung: 10 Jahre
- Sondertilgung: 5% p.a.
- Bereitstellungszinsen: 0,25% p.M. nach 3 Monaten
- Tilgungssatzwechsel: 1x kostenlos

**Bank B:**
- Effektivzins: 3,8% p.a.
- Zinsbindung: 15 Jahre
- Sondertilgung: 10% p.a.
- Bereitstellungszinsen: 0,15% p.M. nach 6 Monaten
- Tilgungssatzwechsel: unbegrenzt

**Bank C:**
- Effektivzins: 3,6% p.a.
- Zinsbindung: 10 Jahre
- Sondertilgung: 0%
- Bereitstellungszinsen: 0,30% p.M. nach 2 Monaten
- Tilgungssatzwechsel: nicht möglich

**Empfehlung:**
- **Bank A:** Bestes Preis-Leistungs-Verhältnis (niedrigster Effektivzins, moderate Konditionen)
- **Bank B:** Beste Planungssicherheit (15 Jahre Zinsbindung, hohe Flexibilität)
- **Bank C:** Nicht empfehlenswert (keine Sondertilgung, hohe Bereitstellungszinsen)

---

**6. Auswirkung Zinsunterschied:**

**Beispiel:**
- Darlehensbetrag: 300.000 €
- Laufzeit: 25 Jahre
- Tilgung: 2% p.a.

**Bank A (3,5% Effektivzins):**
- Monatliche Rate: 1.375 €
- Gesamtzinsen: ca. 150.000 €

**Bank B (4,0% Effektivzins):**
- Monatliche Rate: 1.500 €
- Gesamtzinsen: ca. 175.000 €

**Unterschied:**
- Mehrkosten: 25.000 € über 25 Jahre
- **0,5% Zinsunterschied = 25.000 € Mehrkosten**

---

**7. Bereitstellungszinsen:**

**Definition:**
Kosten, wenn das Darlehen nicht sofort abgerufen wird (z.B. bei Neubau).

**Berechnung:**
Bereitstellungszinsen = Nicht abgerufener Betrag × Zinssatz × Monate / 12

**Beispiel:**
- Darlehensbetrag: 300.000 €
- Abruf: 100.000 € sofort, 200.000 € nach 6 Monaten
- Bereitstellungszinsen: 0,25% p.M. nach 3 Monaten
- **Kosten:** 200.000 € × 0,25% × 3 Monate = 1.500 €

**Tipps:**
- Bereitstellungszinsfreie Zeit verhandeln (6-12 Monate)
- Abrufplan mit Bank abstimmen
- Bei Neubau: Baufortschritt mit Abruf synchronisieren

---

**8. Vorfälligkeitsentschädigung:**

**Definition:**
Entschädigung an die Bank bei vorzeitiger Rückzahlung des Darlehens.

**Berechnung:**
Vorfälligkeitsentschädigung = Restschuld × (Vertragszins - Wiederanlagezins) × Restlaufzeit

**Beispiel:**
- Restschuld: 200.000 €
- Vertragszins: 3,5% p.a.
- Wiederanlagezins: 2,0% p.a.
- Restlaufzeit: 5 Jahre
- **Vorfälligkeitsentschädigung:** 200.000 € × (3,5% - 2,0%) × 5 = 15.000 €

**Ausnahmen:**
- Nach 10 Jahren: Kündigung mit 6 Monaten Frist (§ 489 BGB)
- Bei Verkauf der Immobilie: Berechtigtes Interesse (oft akzeptiert)

---

**9. Sondertilgungsrechte:**

**Definition:**
Recht, jährlich einen bestimmten Betrag zusätzlich zur regulären Rate zu tilgen.

**Beispiel:**
- Darlehensbetrag: 300.000 €
- Sondertilgungsrecht: 5% p.a.
- **Maximale Sondertilgung:** 15.000 €/Jahr

**Vorteile:**
- Schnellere Entschuldung
- Geringere Gesamtzinsbelastung
- Flexibilität (z.B. bei Bonuszahlung)

**Kosten:**
- Oft kostenlos (bis 5% p.a.)
- Höhere Sondertilgungsrechte (10% p.a.) kosten ca. 0,1% Zinsaufschlag

**Empfehlung:**
- Immer Sondertilgungsrecht vereinbaren (mindestens 5% p.a.)
- Auch wenn nicht genutzt: Flexibilität für unvorhergesehene Einnahmen`,
    law: [
      "§ 489 BGB (Ordentliches Kündigungsrecht)",
      "§ 490 BGB (Außerordentliches Kündigungsrecht)",
      "§ 491 BGB (Immobiliar-Verbraucherdarlehensvertrag)",
      "§ 492 BGB (Angaben im Darlehensvertrag)",
      "§ 493 BGB (Pflichtangaben bei Immobiliar-Verbraucherdarlehensverträgen)",
      "§ 511 BGB (Beratungs- und Dokumentationspflichten)",
      "PAngV (Preisangabenverordnung)"
    ],
    practice: `**Praxisfall 1: Effektivzins berechnen**

Ein Kunde erhält folgendes Angebot:
- Darlehensbetrag: 250.000 €
- Sollzins: 3,2% p.a.
- Disagio: 2,5% (6.250 €)
- Auszahlung: 243.750 €
- Laufzeit: 25 Jahre

**Fragen:**
1. Wie hoch ist der Effektivzins (ca.)?
2. Warum ist der Effektivzins höher als der Sollzins?
3. Welche Kosten sind im Effektivzins berücksichtigt?
4. Welche Kosten sind NICHT berücksichtigt?
5. Ist das Disagio sinnvoll?

---

**Praxisfall 2: Konditionsvergleich**

Ein Kunde erhält 3 Angebote:

**Bank A:**
- Effektivzins: 3,4% p.a., Zinsbindung: 10 Jahre, Sondertilgung: 5% p.a.

**Bank B:**
- Effektivzins: 3,7% p.a., Zinsbindung: 15 Jahre, Sondertilgung: 10% p.a.

**Bank C:**
- Effektivzins: 3,5% p.a., Zinsbindung: 10 Jahre, Sondertilgung: 0%

**Fragen:**
1. Welche Bank hat das günstigste Angebot?
2. Welche Bank bietet die beste Planungssicherheit?
3. Welche Bank bietet die meiste Flexibilität?
4. Welche Bank empfehlen Sie?
5. Wie viel spart der Kunde bei Bank A im Vergleich zu Bank B (bei 300.000 € Darlehen, 25 Jahre)?

---

**Praxisfall 3: Bereitstellungszinsen**

Ein Kunde baut ein Haus und benötigt 400.000 € Darlehen:
- Abruf 1: 100.000 € sofort
- Abruf 2: 150.000 € nach 6 Monaten
- Abruf 3: 150.000 € nach 12 Monaten
- Bereitstellungszinsen: 0,25% p.M. nach 3 Monaten

**Fragen:**
1. Wie hoch sind die Bereitstellungszinsen für Abruf 2?
2. Wie hoch sind die Bereitstellungszinsen für Abruf 3?
3. Wie hoch sind die Gesamtkosten für Bereitstellungszinsen?
4. Wie kann der Kunde die Bereitstellungszinsen reduzieren?
5. Sollte der Kunde eine längere bereitstellungszinsfreie Zeit verhandeln?`,
    task: `**Aufgabe 1: Effektivzins berechnen**

Berechnen Sie den Effektivzins (vereinfacht):
- Darlehensbetrag: 300.000 €
- Sollzins: 3,5% p.a.
- Disagio: 3% (9.000 €)
- Auszahlung: 291.000 €
- Laufzeit: 25 Jahre
- **Effektivzins (ca.):** ?

---

**Aufgabe 2: Zinsunterschied berechnen**

Vergleichen Sie die Gesamtzinsbelastung:
- Darlehensbetrag: 250.000 €
- Tilgung: 2% p.a.
- Laufzeit: 25 Jahre

**Bank A (3,5% Effektivzins):**
- Gesamtzinsen: ?

**Bank B (4,0% Effektivzins):**
- Gesamtzinsen: ?

**Unterschied:** ?

---

**Aufgabe 3: Bereitstellungszinsen berechnen**

Berechnen Sie die Bereitstellungszinsen:
- Darlehensbetrag: 350.000 €
- Abruf: 150.000 € sofort, 200.000 € nach 8 Monaten
- Bereitstellungszinsen: 0,25% p.M. nach 3 Monaten
- **Bereitstellungszinsen:** ?`,
    solution: `**Lösung Praxisfall 1:**
1. Effektivzins (ca.): 3,5% p.a. (Sollzins 3,2% + Disagio 2,5% / 25 Jahre ≈ 0,1% p.a. + Zinseszinseffekt).
2. Effektivzins ist höher, weil Disagio berücksichtigt wird (weniger Auszahlung, gleiche Zinsen).
3. Berücksichtigt: Sollzins, Disagio, Bearbeitungsgebühr, Schätzkosten.
4. NICHT berücksichtigt: Notarkosten, Grundbuchkosten, Grunderwerbsteuer.
5. Disagio ist sinnvoll, wenn: Steuerliche Vorteile (bei Vermietung), niedrigerer Sollzins.

**Lösung Praxisfall 2:**
1. Bank A hat das günstigste Angebot (3,4% Effektivzins).
2. Bank B bietet die beste Planungssicherheit (15 Jahre Zinsbindung).
3. Bank B bietet die meiste Flexibilität (10% Sondertilgung).
4. Empfehlung: Bank A (bestes Preis-Leistungs-Verhältnis), Bank B (wenn Planungssicherheit wichtiger).
5. Ersparnis Bank A vs. Bank B: ca. 15.000 € über 25 Jahre (0,3% Zinsunterschied).

**Lösung Praxisfall 3:**
1. Bereitstellungszinsen Abruf 2: 150.000 € × 0,25% × 3 Monate = 1.125 €.
2. Bereitstellungszinsen Abruf 3: 150.000 € × 0,25% × 9 Monate = 3.375 €.
3. Gesamtkosten: 1.125 € + 3.375 € = 4.500 €.
4. Reduzieren durch: Längere bereitstellungszinsfreie Zeit verhandeln, Abrufplan optimieren.
5. Ja, sollte 6-12 Monate bereitstellungszinsfreie Zeit verhandeln.

**Lösung Aufgabe 1:**
- Effektivzins (ca.): 3,8% p.a. (Sollzins 3,5% + Disagio 3% / 25 Jahre ≈ 0,12% p.a. + Zinseszinseffekt ≈ 0,18% p.a.)

**Lösung Aufgabe 2:**
- Bank A (3,5%): Gesamtzinsen ca. 125.000 €
- Bank B (4,0%): Gesamtzinsen ca. 145.000 €
- Unterschied: 20.000 €

**Lösung Aufgabe 3:**
- Bereitstellungszinsen: 200.000 € × 0,25% × 5 Monate = 2.500 €`,
    type: "Theorie"
  },

  day_14: {
    title: "Bonitätsprüfung, Schufa-Auskunft und Kreditwürdigkeitsprüfung",
    theory: `Die Bonitätsprüfung dient der Einschätzung der Kreditwürdigkeit des Kunden. Sie umfasst: Einkommensprüfung (Gehaltsabrechnungen, Steuerbescheide), Ausgabenprüfung (Lebenshaltungskosten, bestehende Kredite), Vermögensprüfung (Eigenkapital, Sparguthaben) und Schufa-Auskunft (Zahlungsverhalten, bestehende Kredite, negative Einträge). Die Schufa (Schutzgemeinschaft für allgemeine Kreditsicherung) sammelt Daten über Kreditverträge, Zahlungsausfälle und Insolvenzen. Der Schufa-Score (0-100%) gibt die Ausfallwahrscheinlichkeit an: >97,5% = sehr gut, 95-97,5% = gut, 90-95% = befriedigend, <90% = kritisch. Negative Schufa-Einträge (Mahnbescheid, Insolvenz) erschweren die Kreditvergabe. Sie müssen die Bonität sorgfältig prüfen und nur geeignete Darlehen empfehlen (§ 511 BGB).`,
    extendedTheory: `**Bonitätsprüfung, Schufa-Auskunft und Kreditwürdigkeitsprüfung im Detail:**

**1. Bonitätsprüfung:**

**Zweck:**
Einschätzung der Kreditwürdigkeit des Kunden: Kann er das Darlehen zurückzahlen?

**Prüfungsbereiche:**

**1. Einkommensprüfung:**
- **Angestellte:** Gehaltsabrechnungen (letzte 3 Monate), Arbeitsvertrag
- **Selbstständige:** Steuerbescheide (letzte 2 Jahre), BWA (Betriebswirtschaftliche Auswertung)
- **Rentner:** Rentenbescheid
- **Sonstige Einkünfte:** Mieteinnahmen, Kapitalerträge, Kindergeld

**Beispiel Angestellter:**
- Bruttogehalt: 5.000 €/Monat
- Netto: 3.500 €/Monat
- **Jahreseinkommen:** 42.000 €

**2. Ausgabenprüfung:**
- **Lebenshaltungskosten:** Pauschale 800-1.200 € pro Person
- **Miete:** Aktuelle Miete (falls noch nicht Eigentümer)
- **Versicherungen:** Krankenversicherung, Haftpflicht, Lebensversicherung
- **Bestehende Kredite:** Raten für Auto, Konsumkredite

**Beispiel:**
- Lebenshaltung: 1.000 € (1 Person)
- Miete: 800 €
- Versicherungen: 300 €
- Bestehende Kredite: 400 €
- **Gesamtausgaben:** 2.500 €/Monat

**3. Haushaltsrechnung:**
- **Verfügbares Einkommen:** Einnahmen - Ausgaben
- **Maximale Darlehensrate:** Verfügbares Einkommen / 1,2 (Sicherheitspuffer 20%)

**Beispiel:**
- Nettoeinkommen: 3.500 €
- Ausgaben: 2.500 €
- **Verfügbares Einkommen:** 1.000 €
- **Maximale Darlehensrate:** 1.000 € / 1,2 = 833 €

**4. Vermögensprüfung:**
- **Eigenkapital:** Sparguthaben, Wertpapiere, Lebensversicherung
- **Immobilien:** Bestehende Immobilien (Wert, Belastung)
- **Sonstiges:** Fahrzeuge, Schmuck (weniger relevant)

**Beispiel:**
- Sparguthaben: 50.000 €
- Wertpapiere: 20.000 €
- **Eigenkapital:** 70.000 €

---

**2. Schufa-Auskunft:**

**Schufa (Schutzgemeinschaft für allgemeine Kreditsicherung):**
- Privatwirtschaftliches Unternehmen
- Sammelt Daten über Kreditverträge, Zahlungsverhalten, Insolvenzen
- Gibt Auskunft an Banken, Vermieter, Telekommunikationsanbieter

**Gespeicherte Daten:**
- **Positive Daten:** Girokonten, Kreditkarten, Darlehen (ordnungsgemäß bedient)
- **Negative Daten:** Mahnbescheide, Insolvenzen, Zahlungsausfälle, gekündigte Kredite

**Schufa-Score:**
- Wert zwischen 0% und 100%
- Je höher, desto besser
- **>97,5%:** Sehr gutes Zahlungsverhalten
- **95-97,5%:** Gutes Zahlungsverhalten
- **90-95%:** Befriedigendes Zahlungsverhalten
- **<90%:** Kritisches Zahlungsverhalten

**Beispiel:**
- Kunde A: Schufa-Score 98,5% → Sehr gut, Kredit problemlos
- Kunde B: Schufa-Score 92,0% → Befriedigend, Kredit möglich, evtl. höhere Zinsen
- Kunde C: Schufa-Score 85,0% → Kritisch, Kredit schwierig

**Negative Schufa-Einträge:**
- **Mahnbescheid:** Bleibt 3 Jahre gespeichert
- **Insolvenz:** Bleibt 3 Jahre nach Restschuldbefreiung gespeichert
- **Gekündigter Kredit:** Bleibt 3 Jahre gespeichert
- **Zahlungsausfall:** Bleibt 3 Jahre gespeichert

**Auswirkungen:**
- Kreditvergabe erschwert oder unmöglich
- Höhere Zinsen
- Höhere Eigenkapitalanforderung

---

**3. Kreditwürdigkeitsprüfung (§ 505a BGB):**

**Pflicht der Bank:**
Die Bank muss vor Vertragsschluss die Kreditwürdigkeit des Kunden prüfen.

**Prüfungskriterien:**
1. **Einkommen:** Ist das Einkommen ausreichend und stabil?
2. **Ausgaben:** Sind die Ausgaben angemessen?
3. **Vermögen:** Ist ausreichend Eigenkapital vorhanden?
4. **Schufa:** Gibt es negative Einträge?
5. **Beschäftigungsverhältnis:** Unbefristet oder befristet?
6. **Alter:** Wie alt ist der Kunde? (Rentenalter beachten)

**Ergebnis:**
- **Positiv:** Kredit wird gewährt
- **Negativ:** Kredit wird abgelehnt
- **Bedingt positiv:** Kredit wird gewährt mit Auflagen (höhere Zinsen, mehr Eigenkapital)

---

**4. Eigenkapitalquote:**

**Definition:**
Anteil des Eigenkapitals am Kaufpreis der Immobilie.

**Empfehlung:**
- Mindestens 20% Eigenkapital
- Besser: 30-40% Eigenkapital

**Beispiel:**
- Kaufpreis: 400.000 €
- Eigenkapital: 80.000 € (20%)
- **Darlehensbetrag:** 320.000 €

**Vorteile hoher Eigenkapitalquote:**
- Niedrigere Zinsen
- Geringeres Risiko für Bank
- Schnellere Entschuldung

**Nachteile niedriger Eigenkapitalquote:**
- Höhere Zinsen
- Höheres Risiko
- Längere Laufzeit

---

**5. Beleihungsauslauf:**

**Definition:**
Verhältnis zwischen Darlehensbetrag und Beleihungswert der Immobilie.

**Berechnung:**
Beleihungsauslauf = Darlehensbetrag / Beleihungswert × 100%

**Beleihungswert:**
- Vorsichtige Schätzung des Immobilienwerts
- Meist 80-90% des Verkehrswerts

**Beispiel:**
- Verkehrswert: 400.000 €
- Beleihungswert: 360.000 € (90%)
- Darlehensbetrag: 300.000 €
- **Beleihungsauslauf:** 300.000 € / 360.000 € = 83,3%

**Zinsaufschläge:**
- **Bis 60% Beleihungsauslauf:** Niedrigste Zinsen
- **60-80%:** Leichter Zinsaufschlag (ca. 0,1%)
- **80-90%:** Höherer Zinsaufschlag (ca. 0,3%)
- **>90%:** Deutlicher Zinsaufschlag (ca. 0,5-1,0%)

---

**6. Praxisbeispiel Bonitätsprüfung:**

**Kunde:**
- Name: Max Mustermann
- Alter: 35 Jahre
- Beruf: Angestellter (unbefristet)
- Nettoeinkommen: 4.000 €/Monat
- Ehefrau: 2.500 €/Monat
- Kinder: 2
- Eigenkapital: 80.000 €
- Schufa-Score: 96,5%

**Ausgaben:**
- Lebenshaltung: 3.000 €/Monat (Familie mit 2 Kindern)
- Versicherungen: 400 €/Monat
- Bestehende Kredite: 300 €/Monat

**Haushaltsrechnung:**
- Gesamteinkommen: 6.500 €
- Ausgaben: 3.700 €
- **Verfügbares Einkommen:** 2.800 €
- **Maximale Darlehensrate:** 2.800 € / 1,2 = 2.333 €

**Immobilie:**
- Kaufpreis: 400.000 €
- Eigenkapital: 80.000 € (20%)
- **Darlehensbetrag:** 320.000 €

**Darlehensrate (3,5% Zinsen, 2% Tilgung):**
- 320.000 € × 5,5% / 12 = 1.467 €/Monat

**Ergebnis:**
- **Tragfähigkeit:** Ja (1.467 € < 2.333 €)
- **Schufa:** Gut (96,5%)
- **Eigenkapital:** Ausreichend (20%)
- **Empfehlung:** Kredit kann gewährt werden

---

**7. Umgang mit schlechter Bonität:**

**Maßnahmen:**
1. **Höheres Eigenkapital:** 30-40% statt 20%
2. **Bürgschaft:** Eltern oder Verwandte bürgen
3. **Zweiter Kreditnehmer:** Ehepartner als Mitkreditnehmer
4. **Schuldenbereinigung:** Bestehende Kredite ablösen
5. **Schufa-Einträge prüfen:** Falsche Einträge löschen lassen
6. **Längere Zinsbindung:** Planungssicherheit für Bank

**Beispiel:**
- Kunde hat Schufa-Score 88% (kritisch)
- **Maßnahme:** Eigenkapital von 20% auf 35% erhöhen
- **Ergebnis:** Bank gewährt Kredit mit Zinsaufschlag 0,5%`,
    law: [
      "§ 505a BGB (Kreditwürdigkeitsprüfung)",
      "§ 511 BGB (Beratungs- und Dokumentationspflichten)",
      "BDSG (Bundesdatenschutzgesetz)",
      "DSGVO (Datenschutz-Grundverordnung)",
      "§ 31 BDSG (Scoring)",
      "§ 34 BDSG (Auskunft über Schufa-Daten)"
    ],
    practice: `**Praxisfall 1: Haushaltsrechnung**

Ein Kunde hat folgende finanzielle Situation:
- Nettoeinkommen: 5.000 €/Monat
- Lebenshaltung: 2.000 €/Monat
- Versicherungen: 400 €/Monat
- Bestehende Kredite: 500 €/Monat

**Fragen:**
1. Wie hoch ist das verfügbare Einkommen?
2. Wie hoch ist die maximale Darlehensrate (mit 20% Sicherheitspuffer)?
3. Kann der Kunde ein Darlehen mit 1.800 € monatlicher Rate finanzieren?
4. Was passiert, wenn der Kunde seinen Job verliert?
5. Welche Absicherungen empfehlen Sie?

---

**Praxisfall 2: Schufa-Score**

Ein Kunde hat einen Schufa-Score von 89%. Er möchte ein Darlehen über 300.000 € aufnehmen.

**Fragen:**
1. Wie ist der Schufa-Score zu bewerten?
2. Wird die Bank das Darlehen gewähren?
3. Welche Maßnahmen kann der Kunde ergreifen, um seine Bonität zu verbessern?
4. Kann der Kunde falsche Schufa-Einträge löschen lassen?
5. Wie lange bleiben negative Schufa-Einträge gespeichert?

---

**Praxisfall 3: Beleihungsauslauf**

Ein Kunde kauft eine Immobilie für 500.000 €:
- Verkehrswert: 500.000 €
- Beleihungswert: 450.000 € (90%)
- Eigenkapital: 100.000 €
- Darlehensbetrag: 400.000 €

**Fragen:**
1. Wie hoch ist der Beleihungsauslauf?
2. Liegt der Beleihungsauslauf im akzeptablen Bereich?
3. Welcher Zinsaufschlag ist zu erwarten?
4. Wie kann der Kunde den Beleihungsauslauf reduzieren?
5. Welche Vorteile hat ein niedrigerer Beleihungsauslauf?`,
    task: `**Aufgabe 1: Haushaltsrechnung erstellen**

Erstellen Sie eine Haushaltsrechnung:
- Nettoeinkommen: 6.000 €/Monat
- Lebenshaltung: 2.500 €/Monat
- Versicherungen: 450 €/Monat
- Bestehende Kredite: 350 €/Monat
- **Verfügbares Einkommen:** ?
- **Maximale Darlehensrate (20% Puffer):** ?

---

**Aufgabe 2: Beleihungsauslauf berechnen**

Berechnen Sie den Beleihungsauslauf:
- Verkehrswert: 450.000 €
- Beleihungswert: 405.000 € (90%)
- Darlehensbetrag: 350.000 €
- **Beleihungsauslauf:** ?

---

**Aufgabe 3: Bonität prüfen**

Prüfen Sie die Bonität:
- Nettoeinkommen: 4.500 €/Monat
- Ausgaben: 2.800 €/Monat
- Eigenkapital: 60.000 €
- Schufa-Score: 94,5%
- Kaufpreis: 350.000 €
- Gewünschtes Darlehen: 290.000 €
- Darlehensrate: 1.450 €/Monat

**Ist die Finanzierung tragfähig?**`,
    solution: `**Lösung Praxisfall 1:**
1. Verfügbares Einkommen: 5.000 € - 2.000 € - 400 € - 500 € = 2.100 €.
2. Maximale Darlehensrate: 2.100 € / 1,2 = 1.750 €.
3. Nein, 1.800 € > 1.750 € (Finanzierung zu knapp).
4. Bei Jobverlust: Zahlungsunfähigkeit, Zwangsversteigerung droht.
5. Absicherungen: Berufsunfähigkeitsversicherung, Risikolebensversicherung, Rücklagen (3 Monatsraten).

**Lösung Praxisfall 2:**
1. Schufa-Score 89% = kritisch (unter 90%).
2. Schwierig, Bank wird evtl. ablehnen oder höhere Zinsen verlangen.
3. Maßnahmen: Schulden abbauen, falsche Einträge löschen lassen, höheres Eigenkapital, Bürgschaft.
4. Ja, falsche Einträge können gelöscht werden (Antrag bei Schufa).
5. Negative Einträge bleiben 3 Jahre gespeichert.

**Lösung Praxisfall 3:**
1. Beleihungsauslauf: 400.000 € / 450.000 € = 88,9%.
2. Ja, liegt im akzeptablen Bereich (unter 90%).
3. Zinsaufschlag: ca. 0,3% (80-90% Beleihungsauslauf).
4. Reduzieren durch: Mehr Eigenkapital einbringen (z.B. 150.000 € statt 100.000 €).
5. Vorteile: Niedrigere Zinsen, geringeres Risiko, schnellere Kreditentscheidung.

**Lösung Aufgabe 1:**
- Verfügbares Einkommen: 6.000 € - 2.500 € - 450 € - 350 € = 2.700 €
- Maximale Darlehensrate: 2.700 € / 1,2 = 2.250 €

**Lösung Aufgabe 2:**
- Beleihungsauslauf: 350.000 € / 405.000 € = 86,4%

**Lösung Aufgabe 3:**
- Verfügbares Einkommen: 4.500 € - 2.800 € = 1.700 €
- Maximale Darlehensrate: 1.700 € / 1,2 = 1.417 €
- Gewünschte Rate: 1.450 €
- **Ergebnis:** Nein, Finanzierung nicht tragfähig (1.450 € > 1.417 €)
- **Empfehlung:** Mehr Eigenkapital (70.000 € statt 60.000 €) oder längere Laufzeit (niedrigere Rate)`,
    type: "Theorie"
  },

  day_15: {
    title: "Sicherheiten: Grundschuld, Hypothek, Bürgschaft",
    theory: `Banken verlangen Sicherheiten für Immobiliendarlehen. Die **Grundschuld** ist die häufigste Sicherheit: Sie wird im Grundbuch eingetragen und gibt der Bank das Recht, die Immobilie zu verwerten (Zwangsversteigerung), wenn der Kunde nicht zahlt. Die **Hypothek** ist ähnlich, aber akzessorisch (erlischt mit Tilgung des Darlehens). Die **Bürgschaft** ist eine persönliche Sicherheit: Eine dritte Person (Bürge) haftet für die Schulden des Kunden. Grundschulden werden notariell bestellt (Kosten ca. 0,5-1% des Darlehensbetrags) und im Grundbuch eingetragen. Die Rangfolge im Grundbuch ist wichtig: Erstrangige Grundschulden haben Vorrang bei Zwangsversteigerung. Sicherheiten schützen die Bank vor Kreditausfällen und ermöglichen niedrigere Zinsen.`,
    extendedTheory: `**Sicherheiten: Grundschuld, Hypothek, Bürgschaft im Detail:**

**1. Grundschuld:**

**Definition:**
Die Grundschuld ist ein dingliches Recht, das im Grundbuch eingetragen wird und der Bank das Recht gibt, die Immobilie zu verwerten, wenn der Kunde nicht zahlt.

**Eigenschaften:**
- **Nicht akzessorisch:** Grundschuld bleibt bestehen, auch wenn Darlehen getilgt ist
- **Übertragbar:** Kann an andere Banken abgetreten werden
- **Wiederverwendbar:** Nach Tilgung kann Grundschuld für neues Darlehen genutzt werden

**Bestellung:**
1. **Notartermin:** Grundschuldbestellungsurkunde wird notariell beurkundet
2. **Eintragung:** Notar beantragt Eintragung im Grundbuch
3. **Kosten:** Ca. 0,5-1% des Darlehensbetrags (Notar + Grundbuchamt)

**Beispiel:**
- Darlehensbetrag: 300.000 €
- Grundschuld: 300.000 €
- **Kosten:** ca. 3.000 € (1%)

**Arten:**
- **Buchgrundschuld:** Im Grundbuch eingetragen (üblich)
- **Briefgrundschuld:** Zusätzlich Grundschuldbrief ausgestellt (selten)

**Rangfolge:**
- **Erstrangige Grundschuld:** Hat Vorrang bei Zwangsversteigerung
- **Zweitrangige Grundschuld:** Wird erst nach Befriedigung der erstrangigen Grundschuld bedient

**Beispiel Rangfolge:**
- Immobilienwert: 400.000 €
- Grundschuld Bank A (erstrangig): 300.000 €
- Grundschuld Bank B (zweitrangig): 100.000 €
- **Bei Zwangsversteigerung (Erlös 350.000 €):**
  - Bank A erhält: 300.000 €
  - Bank B erhält: 50.000 € (statt 100.000 €)
  - Kunde erhält: 0 €

**Löschung:**
- Nach vollständiger Tilgung kann Grundschuld gelöscht werden
- Kosten: ca. 0,2% des Darlehensbetrags
- **Empfehlung:** Grundschuld nicht löschen, sondern für zukünftige Darlehen nutzen (spart Kosten)

---

**2. Hypothek:**

**Definition:**
Die Hypothek ist ein akzessorisches dingliches Recht, das mit dem Darlehen verbunden ist und bei Tilgung erlischt.

**Unterschied zur Grundschuld:**
- **Akzessorisch:** Hypothek erlischt automatisch mit Tilgung des Darlehens
- **Nicht übertragbar:** Kann nicht ohne Darlehen abgetreten werden
- **Nicht wiederverwendbar:** Nach Tilgung muss neue Hypothek bestellt werden

**Beispiel:**
- Darlehensbetrag: 300.000 €
- Hypothek: 300.000 €
- Nach Tilgung: Hypothek erlischt automatisch

**Vorteile:**
- Automatisches Erlöschen (keine Löschungskosten)
- Klare Bindung an Darlehen

**Nachteile:**
- Nicht wiederverwendbar (neue Bestellung bei neuem Darlehen)
- Weniger flexibel

**Verbreitung:**
- Heute selten genutzt (Grundschuld ist Standard)
- Historisch wichtiger

---

**3. Bürgschaft:**

**Definition:**
Die Bürgschaft ist eine persönliche Sicherheit: Eine dritte Person (Bürge) verpflichtet sich, für die Schulden des Kunden einzustehen.

**Arten:**

**Ausfallbürgschaft:**
- Bürge haftet nur, wenn Kunde zahlungsunfähig ist
- Bank muss erst versuchen, vom Kunden zu kassieren

**Selbstschuldnerische Bürgschaft:**
- Bürge haftet sofort, ohne dass Bank erst beim Kunden kassieren muss
- **Üblich bei Immobilienfinanzierung**

**Beispiel:**
- Kunde nimmt Darlehen über 300.000 €
- Eltern bürgen mit selbstschuldnerischer Bürgschaft
- Kunde zahlt nicht → Bank kann sofort bei Eltern kassieren

**Bürgschaft auf erstes Anfordern:**
- Bürge muss zahlen, sobald Bank fordert
- Keine Einreden möglich
- **Sehr riskant für Bürgen**

**Höchstbetragsbürgschaft:**
- Bürgschaft ist auf Höchstbetrag begrenzt
- **Beispiel:** Bürgschaft bis 100.000 € (auch wenn Darlehen 300.000 €)

**Risiken für Bürgen:**
- Volle Haftung für Schulden
- Schufa-Eintrag bei Inanspruchnahme
- Eigene Kreditwürdigkeit leidet

**Empfehlung:**
- Nur für nahe Verwandte (Eltern, Kinder)
- Höchstbetragsbürgschaft vereinbaren
- Rückgriffsrecht sichern (Bürge kann Geld vom Kunden zurückfordern)

---

**4. Weitere Sicherheiten:**

**Lebensversicherung:**
- Abtretung der Lebensversicherung an Bank
- Bei Tod: Auszahlung tilgt Darlehen
- **Vorteil:** Absicherung der Familie

**Bausparvertrag:**
- Abtretung des Bausparguthabens an Bank
- Bei Zahlungsausfall: Bank verwertet Guthaben

**Wertpapiere:**
- Verpfändung von Aktien, Fonds
- Bei Zahlungsausfall: Bank verkauft Wertpapiere

**Gehaltsverpfändung:**
- Abtretung von Gehaltsansprüchen an Bank
- Bei Zahlungsausfall: Bank kassiert direkt beim Arbeitgeber
- **Selten bei Immobilienfinanzierung**

---

**5. Zwangsversteigerung:**

**Ablauf:**
1. **Zahlungsausfall:** Kunde zahlt 3 Monate nicht
2. **Kündigung:** Bank kündigt Darlehen (§ 498 BGB)
3. **Zwangsversteigerungsantrag:** Bank beantragt Zwangsversteigerung beim Amtsgericht
4. **Versteigerungstermin:** Immobilie wird öffentlich versteigert
5. **Erlösverteilung:** Erlös wird nach Rangfolge verteilt

**Beispiel:**
- Immobilienwert: 400.000 €
- Grundschuld Bank A (erstrangig): 300.000 €
- Grundschuld Bank B (zweitrangig): 100.000 €
- **Versteigerungserlös:** 350.000 €
- **Verteilung:**
  - Bank A: 300.000 €
  - Bank B: 50.000 €
  - Kunde: 0 €

**Mindestgebot:**
- 50% des Verkehrswerts (bei erstem Termin)
- 30% des Verkehrswerts (bei zweitem Termin)

**Rechte des Kunden:**
- Widerspruch gegen Zwangsversteigerung (bei fehlerhaftem Antrag)
- Freiwilliger Verkauf (oft höherer Erlös als Zwangsversteigerung)
- Vergleich mit Bank (Ratenzahlung, Stundung)

---

**6. Kosten der Sicherheitenbestellung:**

**Grundschuld:**
- Notar: ca. 0,3-0,5% des Darlehensbetrags
- Grundbuchamt: ca. 0,2-0,3% des Darlehensbetrags
- **Gesamt:** ca. 0,5-1%

**Beispiel:**
- Darlehensbetrag: 300.000 €
- **Kosten:** ca. 3.000 € (1%)

**Hypothek:**
- Gleiche Kosten wie Grundschuld

**Bürgschaft:**
- Keine direkten Kosten
- Evtl. Beratungskosten (Anwalt, Notar)

---

**7. Praxisbeispiel:**

**Kunde:**
- Kaufpreis: 400.000 €
- Eigenkapital: 80.000 €
- Darlehensbetrag: 320.000 €

**Sicherheiten:**
- **Grundschuld:** 320.000 € (erstrangig)
- **Kosten:** ca. 3.200 € (1%)

**Rangfolge im Grundbuch:**
- Abteilung III, Nr. 1: Grundschuld 320.000 € zugunsten Bank A

**Nach Tilgung:**
- Grundschuld bleibt bestehen
- Kann für neues Darlehen genutzt werden (spart Kosten)

**Alternative:**
- Grundschuld löschen lassen (Kosten ca. 640 €)`,
    law: [
      "§ 1191 BGB (Grundschuld)",
      "§ 1113 BGB (Hypothek)",
      "§ 765 BGB (Bürgschaft)",
      "§ 771 BGB (Selbstschuldnerische Bürgschaft)",
      "§ 498 BGB (Kündigung bei Zahlungsverzug)",
      "ZVG (Zwangsversteigerungsgesetz)",
      "GBO (Grundbuchordnung)"
    ],
    practice: `**Praxisfall 1: Grundschuld bestellen**

Ein Kunde kauft eine Immobilie für 450.000 € und benötigt ein Darlehen über 350.000 €. Die Bank verlangt eine erstrangige Grundschuld.

**Fragen:**
1. Wie hoch ist die Grundschuld?
2. Welche Kosten entstehen für die Grundschuldbestellung?
3. Wer trägt die Kosten (Kunde oder Bank)?
4. Was passiert nach vollständiger Tilgung des Darlehens?
5. Sollte der Kunde die Grundschuld löschen lassen?

---

**Praxisfall 2: Rangfolge im Grundbuch**

Eine Immobilie hat einen Wert von 500.000 €. Im Grundbuch sind eingetragen:
- Grundschuld Bank A (erstrangig): 350.000 €
- Grundschuld Bank B (zweitrangig): 100.000 €

Die Immobilie wird zwangsversteigert, der Erlös beträgt 400.000 €.

**Fragen:**
1. Wie viel erhält Bank A?
2. Wie viel erhält Bank B?
3. Wie viel erhält der Kunde?
4. Was wäre, wenn der Erlös nur 300.000 € beträgt?
5. Warum ist die Rangfolge wichtig?

---

**Praxisfall 3: Bürgschaft**

Ein Kunde möchte ein Darlehen über 300.000 € aufnehmen, hat aber eine schlechte Bonität (Schufa-Score 88%). Seine Eltern bieten an, eine Bürgschaft zu übernehmen.

**Fragen:**
1. Welche Art von Bürgschaft sollte vereinbart werden?
2. Welche Risiken tragen die Eltern?
3. Kann die Bürgschaft auf einen Höchstbetrag begrenzt werden?
4. Was passiert, wenn der Kunde nicht zahlt?
5. Sollten die Eltern die Bürgschaft übernehmen?`,
    task: `**Aufgabe 1: Grundschuldkosten berechnen**

Berechnen Sie die Kosten für die Grundschuldbestellung:
- Darlehensbetrag: 280.000 €
- Notar: 0,4% des Darlehensbetrags
- Grundbuchamt: 0,3% des Darlehensbetrags
- **Gesamtkosten:** ?

---

**Aufgabe 2: Zwangsversteigerung simulieren**

Simulieren Sie eine Zwangsversteigerung:
- Immobilienwert: 600.000 €
- Grundschuld Bank A (erstrangig): 400.000 €
- Grundschuld Bank B (zweitrangig): 150.000 €
- Versteigerungserlös: 500.000 €

**Verteilung:**
- Bank A erhält: ?
- Bank B erhält: ?
- Kunde erhält: ?

---

**Aufgabe 3: Sicherheiten vergleichen**

Vergleichen Sie die Vor- und Nachteile:

**Grundschuld:**
- Vorteile: ?
- Nachteile: ?

**Hypothek:**
- Vorteile: ?
- Nachteile: ?

**Bürgschaft:**
- Vorteile: ?
- Nachteile: ?`,
    solution: `**Lösung Praxisfall 1:**
1. Grundschuld: 350.000 € (entspricht Darlehensbetrag).
2. Kosten: ca. 3.500 € (1% von 350.000 €).
3. Kunde trägt die Kosten (Kaufnebenkosten).
4. Nach Tilgung: Grundschuld bleibt bestehen (nicht akzessorisch).
5. Nein, Grundschuld nicht löschen, sondern für zukünftige Darlehen nutzen (spart Kosten).

**Lösung Praxisfall 2:**
1. Bank A erhält: 350.000 € (vollständig befriedigt).
2. Bank B erhält: 50.000 € (statt 100.000 €).
3. Kunde erhält: 0 €.
4. Wenn Erlös 300.000 €: Bank A erhält 300.000 €, Bank B erhält 0 €, Kunde erhält 0 €.
5. Rangfolge wichtig, weil: Erstrangige Gläubiger werden zuerst befriedigt.

**Lösung Praxisfall 3:**
1. Selbstschuldnerische Bürgschaft (üblich bei Immobilienfinanzierung).
2. Risiken: Volle Haftung für 300.000 €, Schufa-Eintrag bei Inanspruchnahme, eigene Kreditwürdigkeit leidet.
3. Ja, Höchstbetragsbürgschaft (z.B. bis 100.000 €).
4. Wenn Kunde nicht zahlt: Bank kassiert bei Eltern.
5. Nur wenn: Eltern finanziell abgesichert sind, Vertrauen zum Kunden besteht, Höchstbetragsbürgschaft vereinbart wird.

**Lösung Aufgabe 1:**
- Notar: 280.000 € × 0,4% = 1.120 €
- Grundbuchamt: 280.000 € × 0,3% = 840 €
- Gesamtkosten: 1.120 € + 840 € = 1.960 €

**Lösung Aufgabe 2:**
- Bank A erhält: 400.000 € (vollständig)
- Bank B erhält: 100.000 € (statt 150.000 €)
- Kunde erhält: 0 €

**Lösung Aufgabe 3:**

**Grundschuld:**
- Vorteile: Wiederverwendbar, übertragbar, flexibel
- Nachteile: Bleibt nach Tilgung bestehen (Löschungskosten), Kosten für Bestellung

**Hypothek:**
- Vorteile: Erlischt automatisch nach Tilgung (keine Löschungskosten)
- Nachteile: Nicht wiederverwendbar, weniger flexibel, heute selten

**Bürgschaft:**
- Vorteile: Keine direkten Kosten, persönliche Sicherheit
- Nachteile: Risiko für Bürgen, Schufa-Eintrag, Belastung der Beziehung`,
    type: "Theorie"
  },

};
