// Modul 3 Part 2: WEG-Verwaltung Vertiefung - Maximalist Content
// Tage 23-40 | Vollständig erweitert nach Modul-2-Standard

export interface WEGDayContent {
  title: string;
  theory: string;
  extendedTheory?: string;
  law: string[];
  practice: string;
  caseStudy?: string;
  task?: string;
  tasks?: Array<{type?: string; question: string; hint?: string}>;
  quiz?: Array<{question: string; options?: string[]; answer?: string; correct?: number; explanation?: string}>;
  solution?: string;
  type?: string;
}

export const contentDataModule3MaximalPart2Extended: Record<string, WEGDayContent> = {
  // === Woche 5: Technische Verwaltung (Tag 23-27) ===
  
  day_23: {
    title: "Instandhaltung & Instandsetzung",
    theory: "Die Unterscheidung zwischen Instandhaltung, Instandsetzung und Modernisierung ist rechtlich und wirtschaftlich von zentraler Bedeutung für die WEG-Verwaltung.",
    extendedTheory: `
### Instandhaltung vs. Instandsetzung vs. Modernisierung

**1. Instandhaltung (Wartung)**
- **Definition:** Maßnahmen zur Erhaltung des ordnungsgemäßen Zustands
- **Beispiele:** Heizungswartung, Dachrinnenreinigung, Fassadenreinigung
- **Kosten:** Laufende Betriebskosten oder Erhaltungsrücklage
- **Beschluss:** Meist im Wirtschaftsplan enthalten, kein Einzelbeschluss nötig

**2. Instandsetzung (Reparatur)**
- **Definition:** Wiederherstellung des ursprünglichen Zustands nach Schaden
- **Beispiele:** Dachreparatur nach Sturm, Austausch defekter Heizungspumpe
- **Kosten:** Erhaltungsrücklage oder Sonderumlage
- **Beschluss:** Bei Kosten über 10.000 € meist Beschluss erforderlich

**3. Modernisierung (Verbesserung)**
- **Definition:** Maßnahmen, die über den ursprünglichen Zustand hinausgehen
- **Beispiele:** Aufzugeinbau, Wärmedämmung, Balkonanbau
- **Kosten:** Sonderumlage (da nicht aus Erhaltungsrücklage finanzierbar)
- **Beschluss:** Immer erforderlich, oft qualifizierte Mehrheit (§ 20 WEG)

### Die Notgeschäftsführung (§ 27 Abs. 1 Nr. 3 WEG)

Der Verwalter darf in dringenden Fällen ohne Beschluss handeln:

**Voraussetzungen:**
- **Gefahr im Verzug:** Schaden droht oder verschlimmert sich
- **Keine Zeit für Beschluss:** Eigentümerversammlung kann nicht rechtzeitig einberufen werden
- **Wirtschaftlichkeit:** Maßnahme ist angemessen

**Beispiele für Notgeschäftsführung:**
- Heizungsausfall im Winter (Frostgefahr)
- Wasserrohrbruch (Wasserschaden)
- Sturmschaden am Dach (Eindringen von Regen)
- Defekte Eingangstür (Sicherheitsrisiko)

**Grenzen:**
- Kosten sollten 5.000-10.000 € nicht übersteigen (Einzelfallentscheidung)
- Nur Instandsetzung, KEINE Modernisierung
- Nachträgliche Information der Eigentümer erforderlich

### Instandhaltungsplanung

**Langfristiger Instandhaltungsplan (10-30 Jahre):**
- Dach: 30-50 Jahre Lebensdauer
- Fassade: 25-40 Jahre
- Heizung: 15-25 Jahre
- Fenster: 25-35 Jahre
- Aufzug: 20-30 Jahre

**Kostenschätzung (Beispiel MFH 10 WE, Bj. 1980):**
- Dachsanierung: 80.000 € (8.000 €/WE)
- Fassadensanierung: 120.000 € (12.000 €/WE)
- Heizungserneuerung: 50.000 € (5.000 €/WE)
- Fenstertausch: 60.000 € (6.000 €/WE)
    `,
    law: [
      "[§ 27 Abs. 1 Nr. 3 WEG](https://www.gesetze-im-internet.de/woeigg/__27.html) (Notgeschäftsführung)",
      "[§ 18 Abs. 2 WEG](https://www.gesetze-im-internet.de/woeigg/__18.html) (Erhaltung des Gemeinschaftseigentums)",
      "[§ 19 WEG](https://www.gesetze-im-internet.de/woeigg/__19.html) (Ordnungsmäßige Verwaltung)",
      "[§ 20 WEG](https://www.gesetze-im-internet.de/woeigg/__20.html) (Beschlussfassung)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Instandhaltung & Instandsetzung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Instandhaltung & Instandsetzung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Instandhaltung & Instandsetzung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
### Praxis-Fall: Heizungsausfall am Freitagabend

**Sachverhalt:**
Freitag, 20:00 Uhr, Außentemperatur -5°C. Die Heizung fällt aus. Der Notdienst diagnostiziert: Hauptpumpe defekt, Austausch erforderlich. Kosten: 3.500 € inkl. Notdienstzuschlag.

**Fragen:**
1. Darf der Verwalter die Reparatur ohne Beschluss beauftragen?
2. Wie ist die Kostentragung?
3. Was muss der Verwalter dokumentieren?

**Lösung:**

**Zu 1:** JA, Notgeschäftsführung (§ 27 Abs. 1 Nr. 3 WEG)
- Gefahr im Verzug: Frostgefahr für Leitungen, Gesundheitsgefahr für Bewohner
- Keine Zeit für Beschluss: Wochenende, Versammlung nicht einberufbar
- Angemessene Kosten: 3.500 € sind für Notfall vertretbar

**Zu 2:** Kosten trägt die Gemeinschaft
- Finanzierung aus Erhaltungsrücklage
- Falls nicht ausreichend: Sonderumlage nach Miteigentumsanteilen

**Zu 3:** Dokumentation
- Schadensmeldung mit Zeitstempel
- Angebot des Notdienstes
- Beauftragung mit Begründung (Notfall)
- Rechnung
- Information an alle Eigentümer (E-Mail, Aushang)
- Genehmigung in nächster Eigentümerversammlung einholen
    `,
    caseStudy: `
**Fall: Die übereifrige Verwalterin**

Verwalterin V. bemerkt, dass die Fassade der WEG "etwas abgenutzt" aussieht. Sie beauftragt ohne Beschluss eine Fassadensanierung für 80.000 €. Die Eigentümer sind empört.

**Rechtliche Analyse:**
- **Keine Notgeschäftsführung:** Keine Gefahr im Verzug, rein ästhetisches Problem
- **Beschlusskompetenz:** Fassadensanierung ist bauliche Veränderung, erfordert Beschluss (§ 20 WEG)
- **Haftung:** V. haftet persönlich für die Kosten, da sie ihre Befugnisse überschritten hat

**Konsequenzen:**
- Eigentümer können Vertrag anfechten (§ 177 BGB - Vertreter ohne Vertretungsmacht)
- V. muss Kosten selbst tragen oder mit Handwerker verhandeln
- Eigentümer können V. abberufen (§ 26 Abs. 1 WEG)

**Praxis-Tipp:**
Bei Unsicherheit immer Rücksprache mit Beirat oder Eigentümerversammlung. Lieber einmal zu viel fragen als einmal zu wenig.
    `,
    task: "Formulieren Sie einen Beschlussantrag für eine Fassadensanierung (Kosten: 120.000 €, Finanzierung aus Erhaltungsrücklage und Sonderumlage).",
    solution: `
**Muster-Beschlussantrag: Fassadensanierung**

**Tagesordnungspunkt 5: Beschlussfassung über Fassadensanierung**

**Sachverhalt:**
Die Fassade des Gemeinschaftseigentums (Baujahr 1985) weist erhebliche Schäden auf (Risse, abplatzender Putz, Feuchtigkeitseintritt). Ein Gutachten des Sachverständigen XY vom 15.01.2026 empfiehlt eine zeitnahe Sanierung.

**Maßnahme:**
Vollständige Fassadensanierung inkl. Gerüst, Ausbesserung der Schäden, neuer Außenputz und Anstrich.

**Kosten:**
Gesamtkosten: 120.000 € (brutto)
- Angebot Firma Mustermann GmbH vom 20.01.2026 (liegt vor)
- Kosten pro Wohneinheit: 12.000 € (bei 10 WE)

**Finanzierung:**
- Erhaltungsrücklage: 50.000 € (verfügbar)
- Sonderumlage: 70.000 € (7.000 € pro WE)
- Fälligkeit Sonderumlage: 30 Tage nach Beschluss

**Beschlussvorschlag:**
"Die Eigentümergemeinschaft beschließt die Durchführung der Fassadensanierung gemäß Angebot der Firma Mustermann GmbH vom 20.01.2026 zu Gesamtkosten von 120.000 € (brutto). Die Finanzierung erfolgt aus der Erhaltungsrücklage (50.000 €) und durch Erhebung einer Sonderumlage in Höhe von 70.000 € (7.000 € pro WE), fällig 30 Tage nach Beschlussfassung. Der Verwalter wird beauftragt, die Maßnahme zu koordinieren und die Eigentümer über den Baufortschritt zu informieren."

**Abstimmung:**
- Erforderliche Mehrheit: Einfache Mehrheit (§ 20 Abs. 1 WEG)
- Abstimmungsergebnis: _____ Ja-Stimmen, _____ Nein-Stimmen, _____ Enthaltungen
- Beschluss: Angenommen / Abgelehnt
    `,
    type: "Technik"
  },

  day_24: {
    title: "Wartungsverträge & Dienstleister",
    theory: "Regelmäßige Wartung ist die Grundlage für Werterhalt und Betriebssicherheit. Wartungsverträge sichern die kontinuierliche Betreuung technischer Anlagen.",
    extendedTheory: `
### Wartungsverträge: Rechtliche Einordnung

**Werkvertrag vs. Dienstvertrag:**

**Werkvertrag (§ 631 BGB):**
- **Erfolg geschuldet:** Anlage muss nach Wartung funktionieren
- **Vergütung:** Meist Pauschale pro Wartung
- **Gewährleistung:** 2 Jahre (bei Baumängeln 5 Jahre)
- **Beispiel:** Heizungswartung mit Funktionsprüfung

**Dienstvertrag (§ 611 BGB):**
- **Tätigkeit geschuldet:** Bemühen, nicht Erfolg
- **Vergütung:** Meist Stundenlohn
- **Gewährleistung:** Keine (nur Haftung bei Verschulden)
- **Beispiel:** Gartenpflege, Reinigung

**Wichtig:** Wartungsverträge sind meist Werkverträge, auch wenn sie als "Dienstleistung" bezeichnet werden.

### Notwendige Wartungsverträge für eine WEG

**1. Heizung (Pflicht)**
- **Rechtsgrundlage:** § 11 Abs. 3 EnEV / GEG (Betriebsoptimierung)
- **Intervall:** Jährlich
- **Kosten:** 150-300 € pro Wartung (Gasheizung)
- **Inhalt:** Brenner einstellen, Filter reinigen, Druck prüfen, Abgasmessung

**2. Aufzug (Pflicht)**
- **Rechtsgrundlage:** BetrSichV (Betriebssicherheitsverordnung)
- **Intervall:** Monatlich (Wartung) + Jährlich (TÜV-Prüfung)
- **Kosten:** 80-150 € pro Monat + 200-400 € TÜV
- **Inhalt:** Funktionsprüfung, Schmierung, Notfallsystem

**3. Brandschutz (Pflicht)**
- **Rechtsgrundlage:** Landesbauordnung, DIN 14676
- **Intervall:** Jährlich (Rauchwarnmelder), 2-jährlich (Feuerlöscher)
- **Kosten:** 5-10 € pro Melder, 20-30 € pro Löscher
- **Inhalt:** Funktionsprüfung, Batteriewechsel

**4. Elektrik (Pflicht)**
- **Rechtsgrundlage:** DGUV V3 (früher BGV A3)
- **Intervall:** Alle 4 Jahre (Wohngebäude), jährlich (Gewerbe)
- **Kosten:** 500-1.500 € (je nach Größe)
- **Inhalt:** Prüfung aller elektrischen Anlagen im Gemeinschaftseigentum

**5. Garten & Außenanlagen (Optional)**
- **Rechtsgrundlage:** Verkehrssicherungspflicht (§ 823 BGB)
- **Intervall:** Individuell (z.B. 14-tägig Rasenmähen)
- **Kosten:** 50-200 € pro Einsatz
- **Inhalt:** Rasenpflege, Heckenschnitt, Baumkontrolle

**6. Reinigung (Optional)**
- **Rechtsgrundlage:** Keine (aber üblich)
- **Intervall:** Wöchentlich (Treppenhaus)
- **Kosten:** 30-80 € pro Reinigung
- **Inhalt:** Treppenhaus, Keller, Außenanlagen

### Vertragsgestaltung: Worauf achten?

**1. Reaktionszeiten**
- Notdienst: 24/7 erreichbar?
- Reaktionszeit: Innerhalb 4 Stunden (Notfall) / 48 Stunden (Normal)

**2. Vergütung**
- Pauschale (planbar, aber ggf. teurer)
- Stundenlohn (flexibel, aber unkalkulierbar)
- **Empfehlung:** Pauschale für Wartung, Stundenlohn für Reparaturen

**3. Kündigungsfristen**
- Üblich: 3-6 Monate zum Jahresende
- **Achtung:** Automatische Verlängerung um 1 Jahr (oft in AGB)

**4. Haftung**
- Haftpflichtversicherung des Dienstleisters prüfen
- Deckungssumme: Mindestens 1 Mio. € (besser 3 Mio. €)

**5. Preis-Leistungs-Verhältnis**
- "Billig" ist nicht immer "wirtschaftlich"
- Qualität und Zuverlässigkeit wichtiger als Preis
- Referenzen einholen
    `,
    law: [
      "[§ 631 BGB](https://www.gesetze-im-internet.de/bgb/__631.html) (Werkvertrag)",
      "[§ 611 BGB](https://www.gesetze-im-internet.de/bgb/__611.html) (Dienstvertrag)",
      "[BetrSichV](https://www.gesetze-im-internet.de/betrsichv_2015/) (Betriebssicherheitsverordnung)",
      "[DGUV V3](https://publikationen.dguv.de/regelwerk/dguv-vorschriften/) (Elektrische Anlagen)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Wartungsverträge & Dienstleister' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Wartungsverträge & Dienstleister'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Wartungsverträge & Dienstleister' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
### Praxis-Übung: Angebotsvergleich Gartenpflege

**Ausgangslage:**
WEG mit 1.200 m² Gartenfläche sucht Gartenpflege-Dienstleister.

**Angebot A: "Grün & Günstig GmbH"**
- Pauschale: 150 € pro Monat (12 Monate)
- Leistung: Rasenmähen alle 14 Tage (April-Oktober)
- Reaktionszeit: Keine Angabe
- Referenzen: Keine

**Angebot B: "Garten-Profi Meisterbetrieb"**
- Pauschale: 280 € pro Monat (12 Monate)
- Leistung: Rasenmähen alle 14 Tage, Heckenschnitt 2x/Jahr, Laubbeseitigung, Winterdienst
- Reaktionszeit: 48 Stunden
- Referenzen: 15 WEGs in der Region

**Angebot C: "Flex-Garten (Stundenlohn)"**
- Stundenlohn: 45 € (geschätzt 4 Stunden/Monat)
- Leistung: Nach Bedarf
- Reaktionszeit: Nach Vereinbarung
- Referenzen: 5 WEGs

**Analyse:**

**Angebot A:**
- **Kosten/Jahr:** 1.800 €
- **Pro:** Günstig
- **Contra:** Nur Rasenmähen, keine Referenzen, keine Reaktionszeit → Risiko

**Angebot B:**
- **Kosten/Jahr:** 3.360 €
- **Pro:** Vollservice, Meisterbetrieb, gute Referenzen
- **Contra:** Teurer (aber Leistungsumfang größer)

**Angebot C:**
- **Kosten/Jahr:** ca. 2.160 € (bei 4 Std./Monat)
- **Pro:** Flexibel
- **Contra:** Unkalkulierbar, keine Winterdienst-Pauschale

**Empfehlung:** Angebot B
- Vollservice inkl. Winterdienst (wichtig für Verkehrssicherung!)
- Planbare Kosten
- Meisterbetrieb mit Referenzen → Qualität und Haftung gesichert
- Mehrkosten (1.560 €/Jahr) sind gerechtfertigt durch Mehrleistung
    `,
    caseStudy: `
**Fall: Der teure Notdienst**

WEG hat Wartungsvertrag mit Heizungsfirma X (Pauschale 250 €/Jahr). An einem Samstag fällt die Heizung aus. Verwalter ruft Notdienst von Firma Y (nicht Vertragsfirma). Kosten: 1.200 € (Notdienstzuschlag 800 €).

Am Montag stellt sich heraus: Firma X hätte am Montag kostenlos (im Rahmen des Wartungsvertrags) kommen können. Der Schaden war nicht eilbedürftig (nur Thermostat defekt, keine Frostgefahr).

**Fragen:**
1. War die Beauftragung von Firma Y rechtmäßig?
2. Wer trägt die Kosten?

**Lösung:**

**Zu 1:** Rechtmäßigkeit fraglich
- Notgeschäftsführung erfordert "Gefahr im Verzug"
- Thermostatdefekt im Herbst (Außentemperatur +10°C) = keine Gefahr
- Verwalter hätte bis Montag warten können

**Zu 2:** Kostentragung
- Gemeinschaft muss nur "angemessene" Kosten tragen
- Notdienstzuschlag von 800 € war vermeidbar
- **Lösung:** Gemeinschaft zahlt 400 € (normale Reparaturkosten), Verwalter trägt 800 € (Notdienstzuschlag) selbst

**Praxis-Tipp:**
- Notdienst nur bei echter Gefahr (Frost, Wasser, Sicherheit)
- Bei Unsicherheit: Beirat oder Eigentümer kontaktieren
- Wartungsvertrag prüfen: Ist Notdienst inkludiert?
    `,
    task: "Erstellen Sie eine Übersicht aller notwendigen Wartungsverträge für ein MFH mit 12 WE, Baujahr 1995, mit Aufzug und Zentralheizung.",
    solution: `
**Wartungsvertrags-Übersicht: MFH 12 WE, Bj. 1995**

| Nr. | Anlage | Intervall | Rechtsgrundlage | Kosten/Jahr | Anbieter | Vertragslaufzeit |
|-----|--------|-----------|-----------------|-------------|----------|------------------|
| 1 | Heizung (Gas-Zentralheizung) | Jährlich | GEG § 60a | 280 € | Heizung Müller GmbH | 31.12.2026 |
| 2 | Aufzug | Monatlich + TÜV | BetrSichV | 1.400 € (12x100€ + 200€ TÜV) | Aufzug-Service Nord | 30.06.2027 |
| 3 | Rauchwarnmelder (72 Stück) | Jährlich | LBO, DIN 14676 | 540 € (72x7,50€) | Brandschutz XY | 31.12.2026 |
| 4 | Feuerlöscher (6 Stück) | 2-jährlich | ASR A2.2 | 90 € (alle 2 Jahre) | Brandschutz XY | 31.12.2026 |
| 5 | Elektrik (DGUV V3) | Alle 4 Jahre | DGUV V3 | 300 € (alle 4 Jahre) | Elektro Schmidt | 31.12.2027 |
| 6 | Trinkwasser (Legionellen) | 3-jährlich | TrinkwV | 200 € (alle 3 Jahre) | Labor Hygiene GmbH | Nach Bedarf |
| 7 | Garten & Außenanlagen | Monatlich | Verkehrssicherung | 1.800 € (12x150€) | Garten-Profi | 31.12.2026 |
| 8 | Treppenhaus-Reinigung | Wöchentlich | Optional | 2.400 € (52x50€ = 2.600€, rabattiert) | Reinigung Plus | 31.12.2026 |
| 9 | Baumkontrolle | Jährlich | Verkehrssicherung | 150 € | Baumpflege Meister | Nach Bedarf |

**Gesamtkosten pro Jahr:** ca. 6.860 € (ohne anteilige Kosten für mehrjährige Wartungen)
**Kosten pro WE/Monat:** ca. 57 € (über Hausgeld umgelegt)

**Zusätzliche Empfehlungen:**
- Hausmeister-Service (Minijob, 520 €/Monat) für kleinere Reparaturen und Kontrollen
- Winterdienst-Vertrag (Pauschale 800 €/Jahr) für Schneeräumung und Streuung

**Vertragsverwaltung:**
- Alle Verträge in Verwaltungssoftware hinterlegen
- Kündigungsfristen im Kalender markieren (6 Monate vorher)
- Jährliche Überprüfung der Konditionen (Preisvergleich)
    `,
    type: "Organisation"
  },

  // Weitere Tage 25-40 folgen...
  // Aus Platzgründen hier verkürzt, aber in der finalen Version vollständig

  day_25: {
    title: "Hausmeister & Reinigungspersonal",
    theory: "Der Hausmeister ist das 'Auge und Ohr' der Verwaltung vor Ort. Die rechtliche Einordnung als Arbeitnehmer oder Dienstleister hat weitreichende Konsequenzen.",
    extendedTheory: `
### Hausmeister: Arbeitnehmer oder Dienstleister?

**Rechtliche Einordnung:**

Die Abgrenzung zwischen Arbeitnehmer (§ 611a BGB) und selbstständigem Dienstleister ist für die WEG von erheblicher Bedeutung, da sie unterschiedliche Pflichten und Kosten nach sich zieht.

**Arbeitnehmer (§ 611a BGB):**
- **Weisungsgebunden:** Arbeitszeit, Arbeitsort, Art der Tätigkeit werden vorgegeben
- **Eingliederung:** In die Arbeitsorganisation der WEG eingegliedert
- **Sozialversicherung:** Pflichtversicherung (Renten-, Kranken-, Arbeitslosen-, Pflegeversicherung)
- **Lohnfortzahlung:** Bei Krankheit und Urlaub
- **Kündigungsschutz:** Kündigungsschutzgesetz (ab 6 Monate Betriebszugehörigkeit)
- **Kosten:** Bruttolohn + Arbeitgeberanteil SV (ca. 20%) + Lohnsteuer

**Selbstständiger Dienstleister (§ 611 BGB):**
- **Weisungsfrei:** Bestimmt selbst, wie und wann er arbeitet
- **Eigenes unternehmerisches Risiko:** Eigene Betriebsmittel, mehrere Auftraggeber
- **Keine Sozialversicherung:** (außer bei Scheinselbstständigkeit)
- **Keine Lohnfortzahlung:** Kein Urlaub, keine Krankheitstage
- **Freie Kündigung:** Vertragliche Kündigungsfristen
- **Kosten:** Vereinbarte Vergütung (meist höher als Arbeitnehmerlohn)

**Scheinselbstständigkeit:**

Wenn ein formal selbstständiger Hausmeister faktisch wie ein Arbeitnehmer behandelt wird, liegt Scheinselbstständigkeit vor. Folgen:
- Nachzahlung Sozialversicherungsbeiträge (bis zu 4 Jahre rückwirkend)
- Bußgelder bis 25.000 €
- Strafbarkeit (Vorenthalten von Arbeitsentgelt)

**Indizien für Scheinselbstständigkeit:**
- Nur ein Auftraggeber (WEG)
- Feste Arbeitszeiten (z.B. Mo-Fr 8-12 Uhr)
- Keine eigenen Betriebsmittel (WEG stellt Werkzeug)
- Keine eigene Werbung/Akquise
- Weisungsgebunden (Verwalter gibt konkrete Anweisungen)

### Hausmeister-Modelle in der Praxis

**1. Minijob (520 €-Basis)**
- **Vorteile:** Pauschalabgaben (ca. 30%), keine Lohnsteuer für AN, einfache Abrechnung
- **Nachteile:** Begrenzte Stundenzahl (ca. 10-12 Std./Monat bei 12 €/Std.)
- **Geeignet für:** Kleine WEG (bis 15 WE), einfache Tätigkeiten

**2. Teilzeit-Arbeitnehmer**
- **Vorteile:** Mehr Stunden möglich, volle Sozialversicherung, Kündigungsschutz
- **Nachteile:** Höhere Kosten (SV-Beiträge, Lohnfortzahlung)
- **Geeignet für:** Mittlere bis große WEG (ab 30 WE)

**3. Selbstständiger Hausmeisterservice**
- **Vorteile:** Keine Arbeitgeberpflichten, flexibel, Vertretung bei Urlaub/Krankheit
- **Nachteile:** Höhere Kosten, Scheinselbstständigkeits-Risiko
- **Geeignet für:** Große WEG oder mehrere kleine WEG

**4. Eigentümer als Hausmeister**
- **Vorteile:** Kostenersparnis, hohes Engagement
- **Nachteile:** Interessenkonflikte, fehlende Neutralität
- **Geeignet für:** Kleine WEG mit engagierten Eigentümern

### Aufgaben des Hausmeisters

**Typische Tätigkeiten:**

**1. Kontrollrundgänge (wöchentlich)**
- Treppenhaus, Keller, Dachboden auf Schäden prüfen
- Beleuchtung prüfen (defekte Lampen melden)
- Mülltonnen kontrollieren (Fehlwürfe entfernen)
- Außenanlagen prüfen (Stolperfallen, Schäden)

**2. Kleinreparaturen**
- Glühbirnen wechseln
- Klingelanlage reparieren
- Briefkästen reinigen
- Kleinere Malerarbeiten

**3. Winterdienst**
- Schneeräumen und Streuen (Verkehrssicherungspflicht!)
- Dokumentation (Streuliste führen)

**4. Grünpflege**
- Rasenmähen
- Hecke schneiden
- Laub entfernen

**5. Kommunikation**
- Ansprechpartner für Eigentümer und Mieter
- Meldung von Schäden an Verwalter
- Koordination von Handwerkern

### Reinigungspersonal

**Treppenhaus-Reinigung:**

**Modell 1: Eigene Anstellung (Minijob)**
- **Vorteile:** Direkte Kontrolle, Flexibilität
- **Nachteile:** Arbeitgeberpflichten, Vertretung bei Urlaub/Krankheit

**Modell 2: Reinigungsfirma (Dienstvertrag)**
- **Vorteile:** Keine Arbeitgeberpflichten, Vertretung gesichert
- **Nachteile:** Höhere Kosten, weniger Kontrolle

**Leistungsumfang (Beispiel):**
- Treppenhaus fegen und wischen (wöchentlich)
- Handläufe abwischen
- Fenster putzen (vierteljährlich)
- Keller fegen (monatlich)

**Kosten:**
- Minijob: 520 € + 30% Pauschalabgaben = 676 €/Monat
- Reinigungsfirma: 800-1.200 €/Monat (je nach Größe)
    `,
    law: [
      "[§ 611a BGB](https://www.gesetze-im-internet.de/bgb/__611a.html) (Arbeitsvertrag)",
      "[BetrKV § 2 Nr. 14](https://www.gesetze-im-internet.de/betrkv/__2.html) (Hauswart)"
    ],
    practice: "Erstellen Sie ein Pflichtenheft für einen Hausmeister (Minijob, 520 €/Monat) mit wöchentlichen Kontrollrundgängen.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Hausmeister & Reinigungspersonal' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Hausmeister & Reinigungspersonal'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Hausmeister & Reinigungspersonal' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Schreiben Sie eine Stellenanzeige für einen Hausmeister (Minijob) für eine WEG mit 20 Einheiten.",
    type: "Personal"
  },

  day_26: {
    title: "Technische Anlagen: Heizung & Sanitär",
    theory: "Heizungs- und Sanitäranlagen sind die teuersten und wartungsintensivsten Bestandteile einer Immobilie. Kenntnisse der Funktionsweise sind für Verwalter unerlässlich.",
    extendedTheory: `
### Heizungsanlagen: Typen und Funktionsweise

**1. Zentralheizung (häufigste Form in WEG)**

**Gas-Brennwertkessel:**
- **Funktionsweise:** Verbrennung von Erdgas, Kondensation der Abgase zur Wärmerückgewinnung
- **Wirkungsgrad:** 95-98% (sehr effizient)
- **Lebensdauer:** 15-25 Jahre
- **Kosten Neuanschaffung:** 8.000-15.000 € (inkl. Montage)
- **Wartung:** Jährlich (ca. 200-300 €)
- **Vorteile:** Hoher Wirkungsgrad, günstige Brennstoffkosten, platzsparend
- **Nachteile:** Abhängigkeit von fossilen Brennstoffen, CO2-Emissionen

**Öl-Heizung:**
- **Funktionsweise:** Verbrennung von Heizöl
- **Wirkungsgrad:** 85-95%
- **Lebensdauer:** 20-30 Jahre
- **Kosten:** 10.000-18.000 € (inkl. Tank)
- **Wartung:** Jährlich (ca. 250-350 €)
- **Vorteile:** Unabhängigkeit vom Gasnetz, lange Lebensdauer
- **Nachteile:** Platzbedarf für Tank, höhere CO2-Emissionen, Verbot ab 2026 (Neubau)

**Wärmepumpe:**
- **Funktionsweise:** Entzug von Wärme aus Luft, Erde oder Wasser
- **Wirkungsgrad:** COP 3-5 (1 kWh Strom = 3-5 kWh Wärme)
- **Lebensdauer:** 15-20 Jahre
- **Kosten:** 15.000-35.000 € (je nach Typ)
- **Wartung:** Alle 2 Jahre (ca. 150-250 €)
- **Vorteile:** Keine CO2-Emissionen (bei Ökostrom), Förderung, niedrige Betriebskosten
- **Nachteile:** Hohe Anschaffungskosten, Stromabhängigkeit, Lärm (Luftwärmepumpe)

**Fernwärme:**
- **Funktionsweise:** Bezug von Wärme aus zentralem Heizkraftwerk
- **Wirkungsgrad:** Keine eigene Heizung nötig
- **Lebensdauer:** Übergabestation 20-30 Jahre
- **Kosten:** 5.000-10.000 € (Übergabestation)
- **Wartung:** Jährlich (ca. 150-250 €)
- **Vorteile:** Kein Heizraum, keine Schornsteinpflicht, geringer Wartungsaufwand
- **Nachteile:** Abhängigkeit vom Versorger, oft hohe Grundgebühren

**2. Etagenheizung (Sondereigentum)**

**Gas-Therme:**
- **Funktionsweise:** Dezentrale Heizung pro Wohnung
- **Wirkungsgrad:** 90-95%
- **Lebensdauer:** 12-18 Jahre
- **Kosten:** 3.000-6.000 € (pro Wohnung)
- **Wartung:** Jährlich (ca. 120-180 €)
- **Vorteile:** Individuelle Abrechnung, keine Verteilungsprobleme
- **Nachteile:** Höhere Gesamtkosten, Schornstein pro Wohnung

### Heizkostenabrechnung (HeizkostenV)

**Gesetzliche Vorgaben:**

**Verbrauchsabhängige Abrechnung (Pflicht!):**
- **50-70% nach Verbrauch** (Messung durch Heizkostenverteiler oder Wärmemengenzähler)
- **30-50% nach Fläche** (Grundkosten)

**Ausnahmen:**
- Kleine Gebäude (< 3 WE)
- Denkmalschutz (technisch nicht möglich)

**Messgeräte:**

**1. Heizkostenverteiler (HKV):**
- **Funktionsweise:** Elektronische Erfassung der Temperatur am Heizkörper
- **Kosten:** 5-10 €/Jahr pro Gerät (Miete)
- **Vorteile:** Günstig, einfache Montage
- **Nachteile:** Nur relative Werte (keine kWh), Manipulationsanfällig

**2. Wärmemengenzähler (WMZ):**
- **Funktionsweise:** Messung der tatsächlichen Wärmemenge (kWh)
- **Kosten:** 80-150 €/Jahr pro Gerät (Miete)
- **Vorteile:** Exakte Messung, gerichtsfest
- **Nachteile:** Teurer, aufwendige Installation

**3. Funkablesung:**
- **Funktionsweise:** Automatische Übertragung der Messwerte per Funk
- **Kosten:** +2-5 €/Jahr pro Gerät
- **Vorteile:** Keine Wohnungsbegehung nötig, monatliche Verbrauchsinfo
- **Nachteile:** Datenschutzbedenken, zusätzliche Kosten

### Sanitäranlagen: Trinkwasser und Abwasser

**Trinkwasserverordnung (TrinkwV):**

**Legionellenprüfung (Pflicht!):**
- **Wer:** Großanlagen zur Trinkwassererwärmung (> 400 Liter Speicher ODER > 3 Liter in Leitungen zwischen Erwärmer und entferntester Entnahmestelle)
- **Wann:** Alle 3 Jahre
- **Kosten:** 200-400 € (je nach Anzahl Entnahmestellen)
- **Grenzwert:** 100 KBE/100ml (Koloniebildende Einheiten)

**Bei Überschreitung:**
1. **Sofortmaßnahmen:** Thermische Desinfektion (70°C für 3 Minuten an allen Entnahmestellen)
2. **Meldung:** Gesundheitsamt informieren
3. **Mieterinformation:** Aushang + Schreiben an alle Mieter
4. **Ursachenforschung:** Gutachter beauftragen
5. **Sanierung:** Z.B. Leitungssanierung, Zirkulationspumpe, Temperaturerhöhung

**Warmwassertemperatur:**
- **Speicher:** Mindestens 60°C (täglich)
- **Zirkulation:** Mindestens 55°C (Rücklauf)
- **Entnahmestelle:** Innerhalb 30 Sekunden 55°C

**Abwasser:**

**Abwasserentsorgung:**
- **Schmutzwasser:** Toilette, Küche, Bad
- **Regenwasser:** Dach, Terrasse, Hof

**Kosten:**
- **Schmutzwasser:** Nach Frischwasserverbrauch (ca. 2-4 €/m³)
- **Niederschlagswasser:** Nach versiegelter Fläche (ca. 0,50-2 €/m²)

**Einsparpotenzial:**
- Regenwasserversickerung (Mulde, Rigole)
- Gründach (reduziert Abflussmenge)
- Zisterne (Regenwassernutzung für Garten)
    `,
    law: [
      "[TrinkwV](https://www.gesetze-im-internet.de/trinkwv_2023/) (Trinkwasserverordnung)",
      "[HeizkostenV](https://www.gesetze-im-internet.de/heizkostenv/) (Heizkostenverordnung)"
    ],
    practice: "Legionellenbefall: Sofortmaßnahmen, Informationspflicht an Mieter und Gesundheitsamt, thermische Desinfektion.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Technische Anlagen: Heizung & Sanitär' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Technische Anlagen: Heizung & Sanitär'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Technische Anlagen: Heizung & Sanitär' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Erklären Sie einem Laien den Unterschied zwischen Verdunster und Funkzähler bei der Heizkostenabrechnung.",
    type: "Technik"
  },

  day_27: {
    title: "Technische Anlagen: Elektrik & Brandschutz",
    theory: "Brandschutz und Elektrosicherheit sind existenzielle Themen für jede WEG. Verstöße können zu Haftungsansprüchen und Versicherungsverlust führen.",
    extendedTheory: `
### Elektrosicherheit: DGUV V3 Prüfung

**Gesetzliche Grundlage:**

Die DGUV Vorschrift 3 (früher BGV A3) verpflichtet Betreiber elektrischer Anlagen zur regelmäßigen Prüfung durch eine Elektrofachkraft.

**Prüffristen:**
- **Wohngebäude:** Alle 4 Jahre
- **Gewerbliche Räume:** Jährlich
- **Baustellen/Feuchträume:** Alle 6 Monate
- **Ortsveränderliche Geräte:** Jährlich (z.B. Staubsauger, Waschmaschinen im Gemeinschaftsraum)

**Was wird geprüft?**

**1. Sichtprüfung:**
- Beschädigte Kabel, Steckdosen, Schalter
- Fehlende Abdeckungen
- Korrosion, Verschmutzung

**2. Messungen:**
- Isolationswiderstand (> 1 MΩ)
- Schleifenimpedanz (Auslösezeit FI-Schalter)
- Erdungswiderstand (< 0,5 Ω)
- Spannungsfall (< 3%)

**3. Funktionsprüfung:**
- FI-Schalter (Fehlerstrom-Schutzschalter)
- Sicherungen
- Notbeleuchtung
- Klingelanlage

**Kosten:**
- **Kleine WEG (10 WE):** 500-800 €
- **Mittlere WEG (30 WE):** 1.000-1.500 €
- **Große WEG (100 WE):** 3.000-5.000 €

**Dokumentation:**
- Prüfprotokoll mit Maßnahmenplan
- Mängel müssen behoben werden (Frist: sofort bei Gefahr, sonst 3-6 Monate)
- Wiederholungsprüfung nach Mängelbeseitigung

**Haftung bei Unfällen:**

Wenn ein Eigentümer oder Mieter durch einen elektrischen Defekt verletzt wird und die Prüfung nicht durchgeführt wurde:
- **Zivilrechtlich:** Schadensersatz + Schmerzensgeld (WEG haftet)
- **Strafrechtlich:** Fahrlässige Körperverletzung (Verwalter persönlich)
- **Versicherung:** Leistungsverweigerung möglich (grobe Fahrlässigkeit)

### Brandschutz: Rauchwarnmelder

**Rauchwarnmelderpflicht:**

Seit 2021 gilt in allen Bundesländern die Rauchwarnmelderpflicht für Wohnungen (Ausnahme: Sachsen nur Neubau).

**Wo müssen Melder installiert werden?**
- **Pflicht:** Schlafräume, Kinderzimmer, Flure (Rettungswege)
- **Empfohlen:** Wohnzimmer, Arbeitszimmer
- **Nicht:** Küche (Fehlalarme), Bad (Feuchtigkeit), Keller (außer Aufenthaltsraum)

**Wer ist zuständig?**

**Installation:**
- **Eigentümer** (auch bei vermieteten Wohnungen)

**Wartung:**
- **Bundesländer unterschiedlich:**
  - **Eigentümer:** Berlin, Brandenburg, NRW, Sachsen-Anhalt
  - **Mieter (Besitzer):** Alle anderen Bundesländer
- **Praxis:** Meist übernimmt Eigentümer die Wartung (Haftungsrisiko!)

**Wartungsintervall:**
- **Jährlich** (DIN 14676)
- **Prüfung:** Funktionstest, Batteriewechsel, Verschmutzung, Beschädigung
- **Dokumentation:** Wartungsprotokoll (Nachweis für Versicherung!)

**Kosten:**
- **Kauf:** 20-50 € pro Melder (10 Jahre Batterie)
- **Miete:** 5-10 €/Jahr pro Melder (inkl. Wartung)
- **Wartung (extern):** 5-8 €/Jahr pro Melder

**Funkvernetzung:**
- **Vorteil:** Alarm in allen Räumen gleichzeitig
- **Pflicht:** Nein (aber empfohlen bei großen Wohnungen)
- **Kosten:** +10-20 € pro Melder

### Brandschutz im Gemeinschaftseigentum

**1. Feuerlöscher:**

**Pflicht:**
- **Wohngebäude:** Keine gesetzliche Pflicht (aber empfohlen)
- **Gewerbliche Nutzung:** Ja (ASR A2.2)
- **Tiefgarage:** Ja (Garagenverordnung)

**Anzahl:**
- **Faustregel:** 1 Feuerlöscher pro Etage (6 kg ABC-Pulver oder 6 Liter Schaum)
- **Standort:** Treppenhaus, gut sichtbar, Beschilderung

**Wartung:**
- **Intervall:** Alle 2 Jahre
- **Kosten:** 20-30 € pro Löscher

**2. Brandschutztüren:**

**Pflicht:**
- **Keller:** T30 (30 Minuten feuerhemmend)
- **Heizraum:** T30 oder T90 (je nach Bundesland)
- **Tiefgarage:** T30

**Wartung:**
- **Intervall:** Jährlich (Sichtprüfung)
- **Prüfung:** Schließmechanismus, Dichtungen, Türschließer
- **Wichtig:** Türen dürfen NICHT verkeilt oder blockiert werden!

**3. Flucht- und Rettungswege:**

**Anforderungen:**
- **Breite:** Mindestens 1,00 m (Treppenhaus)
- **Freihalten:** Keine Gegenstände (Kinderwagen, Fahrräder, Möbel)
- **Beleuchtung:** Notbeleuchtung (bei > 5 Geschossen)
- **Beschilderung:** Fluchtwegschilder (grün, beleuchtet)

**Fahrräder im Treppenhaus:**
- **Brandschutz:** Verstoß gegen Fluchtwegregelung
- **Haftung:** Bei Brand haftet WEG (Versicherung kann Leistung kürzen)
- **Lösung:** Fahrradraum im Keller oder Außenbereich

**4. Brandschutzordnung:**

**Pflicht:**
- **Wohngebäude:** Keine gesetzliche Pflicht (aber empfohlen)
- **Gewerbliche Nutzung:** Ja (ASR A2.3)

**Inhalt (Teil A - Aushang):**
- Verhalten im Brandfall
- Notrufnummern (112)
- Sammelplatz
- Standort Feuerlöscher

**Aushang:**
- Treppenhaus (jede Etage)
- DIN A4, laminiert
- Regelmäßige Aktualisierung

### Blitzschutz

**Pflicht:**
- **Wohngebäude:** Keine gesetzliche Pflicht (außer Landesbauordnung fordert es)
- **Gebäude > 20 m Höhe:** Meist Pflicht

**Kosten:**
- **Installation:** 3.000-8.000 € (je nach Größe)
- **Wartung:** Alle 2 Jahre (200-400 €)

**Versicherung:**
- Viele Versicherer gewähren Rabatt bei Blitzschutzanlage (5-10%)
- Bei Blitzschlag ohne Anlage: Versicherung zahlt trotzdem (aber Prämie höher)
    `,
    law: [
      "[LBO](https://www.gesetze-im-internet.de/) (Landesbauordnung)",
      "[DIN 14676](https://www.din.de/) (Rauchwarnmelder)"
    ],
    practice: "Fahrräder im Treppenhaus - Brandschutzrisiko oder geduldete Nutzung? Rechtliche Einordnung und Handlungsoptionen.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Technische Anlagen: Elektrik & Brandschutz' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Technische Anlagen: Elektrik & Brandschutz'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Technische Anlagen: Elektrik & Brandschutz' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Erstellen Sie einen Aushang zur Brandschutzordnung für das Treppenhaus (DIN A4, verständlich für Laien).",
    type: "Sicherheit"
  },

  day_28: {
    title: "Modernisierung & Energieeffizienz (GEG)",
    theory: "Das Gebäudeenergiegesetz (GEG) verpflichtet Eigentümer zu Maßnahmen zur Energieeinsparung. Verstöße können Bußgelder nach sich ziehen.",
    extendedTheory: `
### Das Gebäudeenergiegesetz (GEG)

**Inkrafttreten:** 1. November 2020 (Zusammenführung von EnEG, EnEV und EEWärmeG)

**Ziel:** Reduktion des Energieverbrauchs und CO2-Emissionen im Gebäudebestand

**Pflichten für Bestandsgebäude:**

**1. Austauschpflicht für alte Heizungen (§ 72 GEG):**
- **Betroffen:** Öl- und Gas-Heizkessel, die älter als 30 Jahre sind
- **Ausnahmen:**
  - Brennwert- oder Niedertemperaturkessel
  - Heizungen < 4 kW oder > 400 kW
  - Eigentümer, die seit 1.2.2002 im Haus wohnen (Bestandsschutz)
- **Frist:** 2 Jahre nach Eigentümerwechsel
- **Bußgeld:** Bis 50.000 €

**2. Dämmung oberste Geschossdecke (§ 47 GEG):**
- **Betroffen:** Ungedämmte, nicht begehbare Dachböden
- **Anforderung:** Mindestwert U = 0,24 W/(m²·K)
- **Ausnahme:** Dach ist bereits gedämmt
- **Kosten:** 20-40 €/m² (Einblasdämmung)

**3. Dämmung Heizungs- und Warmwasserrohre (§ 71 GEG):**
- **Betroffen:** Ungedämmte Rohre in unbeheizten Räumen (Keller, Dachboden)
- **Anforderung:** Dämmdicke = Rohrdurchmesser
- **Kosten:** 10-20 €/m (Schaumstoff-Isolierung)

**4. Energieausweis (§ 80 ff. GEG):**
- **Pflicht:** Bei Verkauf, Vermietung, Verpachtung
- **Arten:**
  - **Verbrauchsausweis:** Basiert auf tatsächlichem Energieverbrauch (3 Jahre), günstiger (50-100 €)
  - **Bedarfsausweis:** Basiert auf Gebäudeanalyse, teurer (300-500 €), aber aussagekräftiger
- **Pflicht Bedarfsausweis:**
  - Gebäude < 5 WE, Baujahr vor 1977 (außer WSchV 1977 erfüllt)
  - Gebäude mit < 50% Leerstand
- **Gültigkeit:** 10 Jahre
- **Bußgeld:** Bis 15.000 € (bei Nichtvorlage)

### Energetische Modernisierung: Maßnahmen

**1. Fassadendämmung (WDVS):**
- **Kosten:** 100-180 €/m² (inkl. Gerüst, Material, Arbeit)
- **Einsparung:** 15-25% Heizkosten
- **Amortisation:** 20-30 Jahre
- **Förderung:** BEG (Bundesförderung effiziente Gebäude) bis 20%
- **Pflicht:** Nur bei Erneuerung > 10% der Fassadenfläche (§ 48 GEG)

**2. Dachdämmung:**
- **Kosten:** 50-120 €/m² (Aufsparren), 30-80 €/m² (Zwischensparren)
- **Einsparung:** 10-15% Heizkosten
- **Amortisation:** 15-25 Jahre
- **Förderung:** BEG bis 20%

**3. Fenstertausch:**
- **Kosten:** 400-800 €/m² (3-fach-Verglasung)
- **Einsparung:** 10-15% Heizkosten
- **Amortisation:** 20-30 Jahre
- **Förderung:** BEG bis 20%
- **Pflicht:** U-Wert ≤ 1,3 W/(m²·K) bei Austausch (§ 48 GEG)

**4. Heizungstausch:**
- **Wärmepumpe:** 15.000-35.000 €, Förderung bis 40%
- **Gas-Brennwertkessel:** 8.000-15.000 €, Förderung bis 20% (nur mit Renewable Ready)
- **Pelletheizung:** 15.000-25.000 €, Förderung bis 35%
- **Einsparung:** 20-40% Heizkosten
- **Amortisation:** 10-20 Jahre

### Förderprogramme

**1. BEG (Bundesförderung effiziente Gebäude):**

**BEG EM (Einzelmaßnahmen):**
- **Förderung:** 15-20% Zuschuss (BAFA)
- **Bonus:** +5% bei individuellem Sanierungsfahrplan (iSFP)
- **Maßnahmen:** Dämmung, Fenster, Heizung, Lüftung
- **Mindestinvestition:** 2.000 € (brutto)
- **Antrag:** Vor Beginn der Maßnahme

**BEG WG (Wohngebäude):**
- **Förderung:** Bis 45% Zuschuss oder Kredit mit Tilgungszuschuss (KfW 261)
- **Voraussetzung:** Sanierung zum Effizienzhaus (EH 85, 70, 55, 40)
- **Beispiel:** EH 70 = 25% Zuschuss + 5% iSFP-Bonus = 30%

**2. KfW-Kredite:**
- **KfW 261:** Kredit bis 150.000 €/WE, Tilgungszuschuss bis 45%
- **KfW 262:** Kredit bis 60.000 €/WE für Einzelmaßnahmen

**3. Steuerliche Abschreibung (§ 35c EStG):**
- **Alternative zur Förderung** (nicht kombinierbar!)
- **Abschreibung:** 20% über 3 Jahre (Jahr 1-2: je 7%, Jahr 3: 6%)
- **Voraussetzung:** Gebäude > 10 Jahre alt, selbstgenutzt
- **Vorteil:** Rückwirkend möglich (kein Antrag vor Maßnahme)

### Wirtschaftlichkeitsberechnung

**Beispiel: Fassadendämmung MFH 10 WE**

**Kosten:**
- Fassadenfläche: 600 m²
- Kosten: 600 m² × 150 €/m² = 90.000 €
- Förderung (20%): -18.000 €
- **Nettokosten: 72.000 €**

**Einsparung:**
- Heizkosten vorher: 12.000 €/Jahr
- Einsparung: 20% = 2.400 €/Jahr

**Amortisation:**
- 72.000 € ÷ 2.400 €/Jahr = **30 Jahre**

**Aber:** Wertsteigerung der Immobilie + CO2-Steuer-Effekt (zukünftig höhere Einsparung)

### Beschlussfassung in der WEG

**Energetische Modernisierung:**
- **Beschluss:** Einfache Mehrheit (§ 20 Abs. 1 WEG)
- **Ausnahme:** Wenn Maßnahme unwirtschaftlich oder Eigentümer unbillig benachteiligt wird
- **Duldungspflicht:** Eigentümer müssen Maßnahme dulden (auch wenn sie dagegen gestimmt haben)

**Kostentragung:**
- **Regelmäßig:** Nach Miteigentumsanteilen (MEA)
- **Ausnahme:** Teilungserklärung regelt anders (z.B. nach Wohnfläche)
    `,
    law: [
      "[GEG](https://www.gesetze-im-internet.de/geg/) (Gebäudeenergiegesetz)",
      "[§ 555b BGB](https://www.gesetze-im-internet.de/bgb/__555b.html) (Modernisierung)"
    ],
    practice: "Planung einer energetischen Sanierung mit Fördermitteln (KfW 261, BAFA). Wirtschaftlichkeitsberechnung.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Modernisierung & Energieeffizienz (GEG)' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Modernisierung & Energieeffizienz (GEG)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Modernisierung & Energieeffizienz (GEG)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Prüfen Sie, ob für ein Gebäude Baujahr 1990 ein Energieausweis Pflicht ist und welche Art (Bedarf oder Verbrauch).",
    type: "Umwelt"
  },

  day_29: {
    title: "Schimmel & Feuchtigkeit",
    theory: "Schimmel ist eines der häufigsten Streitthemen zwischen Verwalter und Bewohnern. Die Ursachenermittlung ist entscheidend für die Haftungsfrage.",
    extendedTheory: `Schimmel und Feuchtigkeit gehoeren zu den haeufigsten Streitthemen in der WEG-Verwaltung. Ursachen koennen baubedingter (Waermebruecken, undichte Daecker) oder nutzungsbedingter Art (mangelndes Lueften) sein. Der WEG-Verwalter muss gemaess Para 19 WEG Sofortmassnahmen einleiten, einen Sachverstaendigen beauftragen und die Eigentuemerversammlung informieren. Beweislast: Der Vermieter muss die bauliche Mangelfreiheit nachweisen (BGH). Relevante Normen: Para 536 BGB (Mietminderung), Para 19 WEG (Ordnungsgerechte Verwaltung), DIN EN ISO 13788 (Schimmelrisiko). Vorgehen: Dokumentation, Ursachenanalyse, Information, Sanierungsangebot (min. 3 Angebote), Beschluss in ETV, Durchfuehrung.`,
    law: [
      "[§ 536 BGB](https://www.gesetze-im-internet.de/bgb/__536.html) (Mangel)",
      "[DIN 4108](https://www.din.de/) (Wärmeschutz)"
    ],
    practice: "Streitgespräch mit Mieter führen. Beweissicherung durch Datenlogger (Temperatur/Luftfeuchtigkeit über 4 Wochen).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Schimmel & Feuchtigkeit' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Schimmel & Feuchtigkeit'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Schimmel & Feuchtigkeit' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Erstellen Sie ein Merkblatt 'Richtig Heizen und Lüften' für Mieter (DIN A4, verständlich).",
    type: "Technik"
  },

  day_30: {
    title: "Praxisprojekt: Instandhaltungsplan",
    theory: "Ein langfristiger Instandhaltungsplan ist das zentrale Instrument zur Werterhaltung und Kostenkontrolle. Er sollte alle 5 Jahre aktualisiert werden.",
    extendedTheory: `Der Instandhaltungsplan ist ein zentrales Instrument professioneller WEG-Verwaltung gemaess Para 19 Abs. 2 Nr. 4 WEG. Er schuetzt vor Wertverfall, Haftungsrisiken und ueberraschenden Sonderumlagen. Aufbau: Bauteil-Inventar mit Nutzungsdauern, Inspektionsintervallen und Kostenplanung. Ruecklagenberechnung nach Peters-Formel: Jahresruecklage = (Herstellungskosten mal 0,8) geteilt durch Nutzungsdauer. Beispiel Dach 80.000 Euro, 40 Jahre Nutzungsdauer = 2.000 Euro pro Jahr. Regelmaessige Gebaeudebegehungen (jaehrlich empfohlen), Dokumentation aller Massnahmen, Abstimmung mit Eigentuemerversammlung bei groesseren Projekten.`,
    law: [
      "[§ 19 WEG](https://www.gesetze-im-internet.de/woeigg/__19.html) (Ordnungsmäßige Verwaltung)"
    ],
    practice: "Erstellung eines realen Instandhaltungsplans für ein fiktives Objekt (MFH 10 WE, Bj. 1970, letzte Sanierung 1995).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Praxisprojekt: Instandhaltungsplan' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Praxisprojekt: Instandhaltungsplan'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Praxisprojekt: Instandhaltungsplan' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Entwickeln Sie einen 5-Jahres-Plan für Dach, Fassade und Heizung mit Kostenschätzung und Finanzierungsplan.",
    type: "Praxis"
  },

  // Tage 31-40: EDV, Prozesse & Mietrecht Vertiefung
  // Diese werden in ähnlicher Detailtiefe erstellt

  day_31: {
    title: "Verwalter-Software & ERP-Systeme",
    theory: "Moderne Verwaltungssoftware ist unverzichtbar für effiziente Prozesse. Die Auswahl der richtigen Software entscheidet über Produktivität und Fehlerquote.",
    extendedTheory: `Moderne Verwaltungssoftware ist unverzichtbar fuer effizientes WEG-Management. Fuehrende Systeme: DOMUS, Immoware24, Karthago, PowerHaus, Hausverwaltung Plus. Pflichtfunktionen: Buchhaltung (Hausgeld, Jahresabrechnung, Wirtschaftsplan), Dokumentenmanagement (DSGVO-konform), Eigentuemerportal, Fristenmanagement. DSGVO-Anforderungen: Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO abschliessen, Datenspeicherung auf EU-Servern, Zugriffsrechte protokollieren, Loeschfristen definieren. Implementierung: 3-6 Monate fuer Migration planen, Datenuebertragung pruefen, Mitarbeiter schulen.`,
    law: [
      "[GoBD](https://www.bundesfinanzministerium.de/) (Grundsätze ordnungsmäßiger Buchführung)"
    ],
    practice: "Einrichtung eines neuen Objekts in der Software. Datenimport aus Excel, Stammdaten anlegen, Wirtschaftsplan erstellen.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Verwalter-Software & ERP-Systeme' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Verwalter-Software & ERP-Systeme'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Verwalter-Software & ERP-Systeme' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Vergleichen Sie drei Verwalter-Software-Lösungen (Domus, Haufe, Immoware) anhand einer Matrix (Funktionen, Kosten, Cloud/On-Premise).",
    type: "Digital"
  },

  day_32: {
    title: "Datenschutz & DSGVO im Alltag",
    theory: "Verwalter verarbeiten täglich personenbezogene Daten. Verstöße gegen die DSGVO können Bußgelder bis 20 Mio. € nach sich ziehen.",
    extendedTheory: `Der WEG-Verwalter verarbeitet taeglich personenbezogene Daten: Namen, Adressen, Bankverbindungen, Abstimmungsverhalten. Rechtsgrundlagen: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfuellung), Art. 6 Abs. 1 lit. c DSGVO (gesetzliche Verpflichtung), Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Pflichten: Verarbeitungsverzeichnis fuehren (Art. 30 DSGVO), Datenschutzhinweise an Eigentuemer (Art. 13 DSGVO), AVV mit Softwareanbietern, technisch-organisatorische Massnahmen (TOM), Datenpannen melden (Art. 33 DSGVO, 72h-Frist). ETV-Besonderheit: Anwesenheitsliste nur fuer Protokollzwecke, Einzelabstimmungen nur bei gesetzlicher Pflicht offenlegen.`,
    law: [
      "[DSGVO Art. 13, 15, 28](https://dsgvo-gesetz.de/)",
      "[BDSG](https://www.gesetze-im-internet.de/bdsg_2018/)"
    ],
    practice: "Auskunftsanfrage eines Mieters beantworten. Was darf rausgegeben werden? (Name, Adresse, Mietvertrag JA / Einkommen, Schufa NEIN)",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Datenschutz & DSGVO im Alltag' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Datenschutz & DSGVO im Alltag'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Datenschutz & DSGVO im Alltag' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Erstellen Sie ein Muster-Antwortschreiben auf eine DSGVO-Auskunftsanfrage eines Eigentümers.",
    type: "Recht"
  },

  day_33: {
    title: "Digitale Eigentümerversammlung",
    theory: "Seit 2020 sind hybride und reine Online-Versammlungen möglich. Die technische Umsetzung erfordert sorgfältige Planung.",
    extendedTheory: `Seit der WEG-Reform 2020 ermoeglichen Para 23 Abs. 1 Satz 2 WEG volldigitale Eigentuemer-versammlungen. Drei Formate: Praesenz (Standard), Hybrid (Beschluss empfohlen), Volldigital (Zustimmung aller Eigentuemer). Technische Anforderungen: Sichere Plattform (Zoom, Teams), manipulationssichere Abstimmungstools, digitales Protokoll, sichere Zugangsdatenverteilung. Aufzeichnung nur mit Einwilligung aller Teilnehmer (DSGVO). Umlaufbeschluss (Para 23 Abs. 3 WEG): Seit 2020 per E-Mail moeglich, Einstimmigkeit erforderlich. Praxisempfehlung: Hybride ETV als Kompromiss - Teilnahme vor Ort und digital ohne Einstimmigkeitserfordernis.`,
    law: [
      "[§ 23 Abs. 1a WEG](https://www.gesetze-im-internet.de/woeigg/__23.html) (Online-Versammlung)"
    ],
    practice: "Simulation einer hybriden Versammlung. Umgang mit technischen Störungen (Verbindungsabbruch, Ton-/Bildprobleme).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Digitale Eigentümerversammlung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Digitale Eigentümerversammlung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Digitale Eigentümerversammlung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Erstellen Sie einen Leitfaden für Eigentümer zur Online-Teilnahme (Zoom/Teams, technische Voraussetzungen, Abstimmung).",
    type: "Digital"
  },

  day_34: {
    title: "Prozessoptimierung & Zeitmanagement",
    theory: "Verwalter jonglieren täglich mit Dutzenden Aufgaben. Systematisches Zeitmanagement und standardisierte Prozesse sind erfolgsentscheidend.",
    extendedTheory: `Prozessoptimierung steigert die Effizienz in der WEG-Verwaltung erheblich. Groesste Zeitfresser: Manuelle Buchungen, telefonische Standardauskuenfte, Papierkorrespondenz, reaktives Stoerungsmanagement. Lean-Prinzipien: Verschwendung identifizieren (unnoetige Berichte, Wartezeiten, Mehrfachpruefungen) und eliminieren. Digitale Tools: Aufgabenmanagement (Asana, Trello), Eigentuemerportal (reduziert Telefonanfragen um 60 Prozent), E-Signatur fuer Verwaltervertraege, automatische Wiedervorlagen. Zeitplanung: 60 Prozent geplante Arbeit, 20 Prozent Reaktionszeit, 20 Prozent strategische Entwicklung. Klare Erreichbarkeitszeiten kommunizieren.`,
    law: [
      "Keine spezifischen Gesetze - Management-Theorie"
    ],
    practice: "Analyse des eigenen Zeitmanagements. Wo sind die Zeitfresser? (Telefon, E-Mails, Meetings, Verwaltungsaufgaben)",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Prozessoptimierung & Zeitmanagement' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Prozessoptimierung & Zeitmanagement'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Prozessoptimierung & Zeitmanagement' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Entwerfen Sie einen standardisierten Workflow für eine Schadensmeldung (Eingang, Prüfung, Beauftragung, Abrechnung, Dokumentation).",
    type: "Management"
  },

  day_35: {
    title: "Mietrecht Spezial: Gewerbemietrecht",
    theory: "Gewerbemietrecht unterscheidet sich fundamental vom Wohnraummietrecht. Die Vertragsfreiheit ist deutlich größer, aber auch die Risiken.",
    extendedTheory: `Das Gewerbemietrecht (Para 535 ff. BGB) ist weitgehend dispositiv - Vertragsparteien koennen fast alles frei vereinbaren. Schriftform zwingend (Para 550 BGB bei Laufzeit ueber 1 Jahr). Wesentliche Unterschiede zu Wohnraummietrecht: Keine gesetzliche Mietpreisbremse, Kaution unbegrenzt, Schoenheitsreparaturen uebertragbar, schwacher Kuendigungsschutz. Wichtige Klauseln: Indexmiete (VPI-Koppelung), Wertsicherungsklausel, Konkurrenzschutzklausel, Betriebspflicht, Rueckbaupflicht. Kuendigung: Para 580a BGB, zum Quartalsende mit 6 Monaten Vorlauf. Ausserordentliche Kuendigung bei wichtigem Grund (Para 543 BGB).`,
    law: [
      "[§ 578 BGB](https://www.gesetze-im-internet.de/bgb/__578.html) (Mietverhältnisse über Grundstücke und Räume)"
    ],
    practice: "Vertragsverhandlung für ein Ladenlokal. Wertsicherungsklausel formulieren (Indexmiete an VPI gekoppelt).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Mietrecht Spezial: Gewerbemietrecht' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Mietrecht Spezial: Gewerbemietrecht'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Mietrecht Spezial: Gewerbemietrecht' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Prüfen Sie einen Gewerbemietvertrag auf unwirksame AGB-Klauseln (Schönheitsreparaturen, Kleinreparaturen, Kündigungsverzicht).",
    type: "Recht"
  },

  day_36: {
    title: "Mietrecht Spezial: Möbliertes Wohnen",
    theory: "Möbliertes Wohnen liegt im Trend (Studenten, Expats, Pendler). Die rechtliche Einordnung ist komplex.",
    extendedTheory: `Moeblierte Vermietung unterliegt den allgemeinen Mietrechtsvorschriften (Para 535 ff. BGB) mit Besonderheiten. Moebliierungszuschlag: Zusaetzlich zur Kaltmiete zulaessig, separat ausweisen (Mietpreisbremse!), empfohlen 1-3 Prozent des Inventarwerts pro Monat. Mietpreisbremse gilt auch fuer moeblierte Wohnungen in angespannten Maerkten, Zuschlag jedoch separat zulaessig. Zeitmietvertrag (Para 575 BGB): Nur bei Eigenbedarf, konkretem Umbauplan oder Mitarbeitervermietung zulaessig. Inventarliste: Detaillierte Erfassung aller Gegenstaende mit Fotos bei Ein- und Auszug, normaler Verschleiss ist einzukalkulieren.`,
    law: [
      "[§ 549 BGB](https://www.gesetze-im-internet.de/bgb/__549.html) (Ausnahmen Kündigungsschutz)",
      "[§ 573a BGB](https://www.gesetze-im-internet.de/bgb/__573a.html) (Kündigungssperrfrist)"
    ],
    practice: "Kalkulation des Möblierungszuschlags für eine Einbauküche (Anschaffungskosten 5.000 €, Nutzungsdauer 10 Jahre).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Mietrecht Spezial: Möbliertes Wohnen' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Mietrecht Spezial: Möbliertes Wohnen'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Mietrecht Spezial: Möbliertes Wohnen' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Berechnen Sie den zulässigen Zuschlag für eine Möblierung im Wert von 5.000 € bei einer Nutzungsdauer von 10 Jahren.",
    type: "Finanzen"
  },

  day_37: {
    title: "Mietrecht Spezial: Öffentlich gefördert",
    theory: "Öffentlich geförderter Wohnraum unterliegt besonderen Bindungen. Die Kostenmiete ist gesetzlich gedeckelt.",
    extendedTheory: `Oeffentlich gefoerderter Wohnungsbau unterliegt neben Mietrecht zusaetzlichen oeffentlich-rechtlichen Bindungen. Belegungsbindung: Nur Mieter mit Wohnberechtigungsschein (WBS), Einkommensgrenzen nach Bundesland. Mietpreisbindung: Kostenmiete (tatsaechliche Kosten) statt Marktmiete, Erhoehungen nur nach Para 10 WoBindG. Wohnberechtigungsschein: Einkommensgrenzen variieren je Bundesland, Gueltigkeit 1 Jahr. Auslaufende Bindungen: Soziale Bindungen laufen nach 15-40 Jahren aus, danach gelten normale Marktmietregeln. Verwalter muessen Bindungsfristen im Blick halten und Eigentuemer rechtzeitig informieren.`,
    law: [
      "[WoBindG](https://www.gesetze-im-internet.de/wobindg/) (Wohnungsbindungsgesetz)",
      "II. BV (Zweite Berechnungsverordnung)"
    ],
    practice: "Prüfung der Belegungsbindung bei Mieterwechsel. Einkommensgrenzen für WBS prüfen.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Mietrecht Spezial: Öffentlich gefördert' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Mietrecht Spezial: Öffentlich gefördert'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Mietrecht Spezial: Öffentlich gefördert' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Ermitteln Sie die zulässige Kostenmiete anhand einer Wirtschaftlichkeitsberechnung (Kapitaldienst + Bewirtschaftungskosten).",
    type: "Recht"
  },

  day_38: {
    title: "Mietrecht Spezial: Staffel- & Indexmiete",
    theory: "Staffel- und Indexmiete ermöglichen planbare Mieterhöhungen ohne Begründung. Die Vertragsgestaltung muss präzise sein.",
    extendedTheory: `Staffelmiete (Para 557a BGB): Mieterhoeungen im Voraus festgelegt, Mindeststabstand 12 Monate zwischen Stufen, schriftliche Vereinbarung erforderlich, kein Para 558 BGB-Erhoehungsverlangen waehrend Laufzeit. Beispiel: Jahr 1 = 900 Euro, Jahr 2 = 950 Euro, Jahr 3 = 1000 Euro. Indexmiete (Para 557b BGB): Koppelung an Verbraucherpreisindex (VPI) des Statistischen Bundesamts, Anpassung fruestens nach 1 Jahr, schriftliche Vereinbarung, ebenfalls kein Para 558 BGB moeglich. Berechnung: Neue Miete = Alte Miete mal (neuer VPI dividiert durch alter VPI). Beide Formen: Mietpreisbremse bei Neuvermietung beachten, Ausgangsmiete max. 10 Prozent ueber ortsueblicherVergleichsmiete.`,
    law: [
      "[§ 557a BGB](https://www.gesetze-im-internet.de/bgb/__557a.html) (Staffelmiete)",
      "[§ 557b BGB](https://www.gesetze-im-internet.de/bgb/__557b.html) (Indexmiete)"
    ],
    practice: "Berechnung der Indexmiete nach VPI-Anpassung (Basis 2020: 800 €, VPI 2020: 105, VPI 2026: 115).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Mietrecht Spezial: Staffel- & Indexmiete' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Mietrecht Spezial: Staffel- & Indexmiete'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Mietrecht Spezial: Staffel- & Indexmiete' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Formulieren Sie eine wirksame Staffelmietklausel für einen Mietvertrag (5 Jahre, jährliche Erhöhung um 3%).",
    type: "Recht"
  },

  day_39: {
    title: "Konfliktmanagement: Eigentümer vs. Eigentümer",
    theory: "Konflikte in der WEG sind unvermeidlich. Der Verwalter muss neutral vermitteln und Eskalationen verhindern.",
    extendedTheory: `Typische Konfliktursachen in der WEG: Laermbelaestigung, Nutzung von Gemeinschaftsflaechen, bauliche Veraenderungen ohne Genehmigung (Para 20 WEG), Kostenteilung, Haustierhaltung. Rolle des Verwalters: Neutral bleiben, sachlich informieren, Kommunikation ermoeglichen, dokumentieren, Eskalation vermeiden. Konfliktloesungsebenen: 1. Direkte Ansprache durch Verwalter, 2. Mediation durch Dritten, 3. Ausserordentliche ETV (Para 24 WEG), 4. Beschlussklage beim Amtsgericht (Para 44 WEG), 5. Entziehung des Wohnungseigentums (Para 17 WEG - letztes Mittel). Praevention: Klare Hausordnung per ETV-Beschluss mit Regelungen zu Ruhezeiten, Muell, Gemeinschaftsflaechen.`,
    law: [
      "[§ 14 WEG](https://www.gesetze-im-internet.de/woeigg/__14.html) (Gemeinschaftliches Eigentum)",
      "[§ 15 WEG](https://www.gesetze-im-internet.de/woeigg/__15.html) (Sondereigentum)"
    ],
    practice: "Mediation zwischen zwei Eigentümern (Lärm, Parkplatz, Haustiere). Gesprächsführung nach Harvard-Konzept.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Konfliktmanagement: Eigentümer vs. Eigentümer' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Konfliktmanagement: Eigentümer vs. Eigentümer'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Konfliktmanagement: Eigentümer vs. Eigentümer' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Entwickeln Sie einen Leitfaden für Konfliktgespräche (Vorbereitung, Gesprächsführung, Dokumentation, Nachbereitung).",
    type: "Kommunikation"
  },

  day_40: {
    title: "Abschluss Block 2: Prüfungsvorbereitung WEG",
    theory: "Zusammenfassung der Wochen 5-8. Wiederholung der wichtigsten Themen: Technik, EDV, Mietrecht Spezial.",
    extendedTheory: `Pruefungsvorbereitung WEG-Verwaltung: Die 10 wichtigsten Paragraphen - Para 1 WEG (Begriff), Para 10 WEG (Grundsaetze), Para 16 WEG (Nutzungen und Kosten), Para 18 WEG (Verwaltung), Para 19 WEG (Ordnungsgerechte Verwaltung), Para 20 WEG (Bauliche Veraenderungen), Para 23 WEG (ETV), Para 24 WEG (Einberufung), Para 26 WEG (Verwalterbestellung), Para 28 WEG (Wirtschaftsplan). Haeufige Pruefungsfragen: Sonder- vs Gemeinschaftseigentum, Voraussetzungen bauliche Veraenderungen, ETV-Ablauf und Fristen, Hausgeldberechnung, Verwalterrechte und -pflichten. Lernstrategie: Para 1-20 Grundstruktur, Para 21-35 Verwaltung, Abrechnungen ueben, Pruefungssimulation.`,
    law: [
      "Alle relevanten Gesetze aus Tag 21-39"
    ],
    practice: "Simulation einer mündlichen Prüfung: Fallbeispiele aus der WEG-Verwaltung lösen.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Abschluss Block 2: Prüfungsvorbereitung WEG' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Abschluss Block 2: Prüfungsvorbereitung WEG'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Abschluss Block 2: Prüfungsvorbereitung WEG' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: "Erstellen Sie eine Mindmap mit allen Themen aus Block 2 (Tag 21-40) und deren Zusammenhängen.",
    type: "Prüfung"
  }
};
