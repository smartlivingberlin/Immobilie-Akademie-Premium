// Module 3 Content Part 4: Days 61-80 (Maximalist)

export const contentDataModule3MaximalPart4 = {
  // Woche 13: Mietverwaltung & Sondereigentum (Fortsetzung)
  day_61: {
    title: "Mietverwaltung: Grundlagen & Vertrag",
    type: "Theorie & Praxis",
    theory: `
# Mietverwaltung: Grundlagen und Vertragswesen

Die Mietverwaltung (Sondereigentumsverwaltung) unterscheidet sich grundlegend von der WEG-Verwaltung. Während der WEG-Verwalter das Gemeinschaftseigentum betreut, kümmert sich der Mietverwalter um die Belange des Sondereigentums im Auftrag des Eigentümers gegenüber dem Mieter.

## 1. Aufgabenbereiche der Mietverwaltung
*   **Kaufmännisch:** Mietenbuchhaltung, Mahnwesen, Betriebskostenabrechnung, Mieterhöhungen.
*   **Technisch:** Wohnungsabnahmen/-übergaben, Instandhaltung des Sondereigentums, Beauftragung von Handwerkern.
*   **Juristisch:** Mietvertragsgestaltung, Kündigungen, Durchsetzung von Vermieterrechten.

## 2. Der Mietverwaltervertrag
Der Vertrag wird zwischen dem Eigentümer (Auftraggeber) und dem Verwalter geschlossen. Er ist ein Geschäftsbesorgungsvertrag (§ 675 BGB).
*   **Wichtige Inhalte:** Vollmachten (insb. Bankvollmacht, Prozessvollmacht), Vergütung, Laufzeit, Leistungskatalog.
*   **Abgrenzung:** Klare Trennung zur WEG-Verwaltung (auch bei Personalunion).

## 3. Der Wohnraummietvertrag (§§ 535 ff. BGB)
*   **Form:** Schriftform empfohlen (§ 550 BGB: Kündigungsschutz bei Laufzeit > 1 Jahr).
*   **Vertragspartner:** Genaue Bezeichnung aller Mieter und Vermieter.
*   **Mietobjekt:** Exakte Beschreibung (Räume, Keller, Stellplatz).
*   **Miete:** Nettokaltmiete + Vorauszahlungen/Pauschalen.
`,
    law: [
      "§ 535 BGB (Inhalt und Hauptpflichten des Mietvertrags)",
      "§ 550 BGB (Form des Mietvertrags)",
      "§ 675 BGB (Entgeltliche Geschäftsbesorgung)"
    ],
    practice: `
### Praxis-Beispiel: Der Verwaltervertrag
Ein Eigentümer besitzt 5 Eigentumswohnungen in einer WEG und möchte Sie mit der Sondereigentumsverwaltung beauftragen.

**Vorgehen:**
1.  **Vertragsentwurf:** Erstellen Sie einen detaillierten Verwaltervertrag.
2.  **Vollmachten:** Lassen Sie sich eine umfassende Handlungsvollmacht (auch für Bankkonten) unterzeichnen.
3.  **Objektübernahme:** Fordern Sie alle Unterlagen an (alte Mietverträge, Kautionen, Schlüssel, Übergabeprotokolle).
4.  **Mieterinformation:** Schreiben Sie alle Mieter an, stellen Sie sich vor und teilen Sie die neue Bankverbindung mit.

**Tipp:** Nutzen Sie für Mietverträge stets aktuelle Formulare von Haus & Grund oder etablierten Verlagen, um rechtssicher zu bleiben (AGB-Recht!).
`,
    task: {
      question: "Welche drei Hauptpflichten hat der Vermieter gemäß § 535 BGB?",
      solution: "1. Gebrauchsgewährung der Mietsache während der Mietzeit. 2. Erhaltung der Mietsache in vertragsgemäßem Zustand (Instandhaltung). 3. Tragung der auf der Mietsache ruhenden Lasten (z.B. Grundsteuer, sofern nicht umgelegt)."
    }
  },
  day_62: {
    title: "Betriebskostenabrechnung (BKA)",
    type: "Praxis-Workshop",
    theory: `
# Die Betriebskostenabrechnung (BKA)

Die BKA ist eine der fehleranfälligsten Aufgaben in der Mietverwaltung.

## 1. Umlagefähigkeit (§ 2 BetrKV)
Nur Kosten, die im Vertrag vereinbart sind und in § 2 BetrKV gelistet sind (oder "Sonstige Betriebskosten"), dürfen umgelegt werden.
*   **Klassiker:** Grundsteuer, Wasser, Abwasser, Heizung, Müll, Hausmeister, Reinigung, Versicherung.
*   **Nicht umlagefähig:** Verwaltungskosten, Instandhaltungskosten, Bankgebühren des Vermieters.

## 2. Abrechnungsfrist (§ 556 Abs. 3 BGB)
Die Abrechnung muss dem Mieter spätestens bis zum Ablauf des zwölften Monats nach Ende des Abrechnungszeitraums zugehen (Ausschlussfrist für Nachforderungen!).

## 3. Verteilerschlüssel
*   Vorrang: Vertragliche Vereinbarung.
*   Auffangschlüssel: Wohnfläche (§ 556a BGB).
*   Heizkosten: Zwingend nach HeizkostenV (meist 50-70% Verbrauch, Rest Fläche).
`,
    law: [
      "§ 556 BGB (Vereinbarungen über Betriebskosten)",
      "Betriebskostenverordnung (BetrKV)",
      "Heizkostenverordnung (HeizkostenV)"
    ],
    practice: `
### Checkliste für die BKA-Erstellung
1.  **Zusammenstellung der Gesamtkosten:** Rechnungen prüfen, Periodenabgrenzung beachten (Abfluss- vs. Leistungsprinzip).
2.  **Verteilerschlüssel prüfen:** Stimmen die Schlüssel mit dem Mietvertrag überein?
3.  **Heizkosten:** Abrechnung des Wärmedienstleisters (z.B. Techem, Ista) integrieren.
4.  **Vorauszahlungen:** Geleistete Vorauszahlungen des Mieters (Soll vs. Ist) gegenrechnen.
5.  **Formelle Anforderungen:** Absender, Empfänger, Objekt, Zeitraum, Gesamtkosten, Verteilerschlüssel, Anteil Mieter, Abzug Vorauszahlungen, Ergebnis.

**Häufiger Fehler:** "Sonstige Betriebskosten" werden abgerechnet, ohne dass im Vertrag konkretisiert wurde, welche Kosten darunter fallen (z.B. Dachrinnenreinigung, Wartung Rauchmelder).
`,
    task: [
    {
      question: "Ein Mieter zieht am 30.06. aus. Der Abrechnungszeitraum ist das Kalenderjahr. Wann muss er spätestens seine BKA erhalten?",
      solution: "Spätestens bis zum 31.12. des Folgejahres. Auch wenn er früher auszieht, wird die Abrechnung auf seinen Zeitraum anteilig erstellt."
    },
    {
      question: `Vollständige BKA-Berechnung — Musterwohnung Dortmund:
Wohnung: 72 m², Haus gesamt: 480 m²
Abrechnungszeitraum: 01.01.-31.12.2024
Betriebskosten gesamt (Haus):
- Heizung/Warmwasser: 18.400 € (Heizkostenverordnung: 70% Verbrauch, 30% Fläche)
- Wasser/Abwasser: 4.800 € (nach Verbrauch — Wohnung: 180 m³ von 1.200 m³ gesamt)
- Müllabfuhr: 2.400 € (nach Wohnfläche)
- Hausmeister: 3.600 € (nach Wohnfläche)
- Gebäudeversicherung: 1.920 € (nach Wohnfläche)
Vorauszahlungen Mieter: 180 €/Monat = 2.160 €
Berechnen Sie den Abrechnungsbetrag (Nachzahlung oder Guthaben).`,
      solution: `**Heizung/Warmwasser (HeizkostenV §7):**
Flächenanteil: 72/480 = 15%
Flächenanteil Heizung (30%): 18.400 × 30% × 15% = 828,00 €
Verbrauchsanteil (70%): Wohnung 15% Verbrauch angenommen = 18.400 × 70% × 15% = 1.932,00 €
Heizung gesamt: 2.760,00 €

**Wasser/Abwasser (nach Verbrauch):**
4.800 € × (180/1.200) = 4.800 × 15% = 720,00 €

**Müllabfuhr (nach Fläche):**
2.400 € × 15% = 360,00 €

**Hausmeister (nach Fläche):**
3.600 € × 15% = 540,00 €

**Gebäudeversicherung (nach Fläche):**
1.920 € × 15% = 288,00 €

**Gesamtkosten Wohnung:** 2.760 + 720 + 360 + 540 + 288 = **4.668,00 €**
**Vorauszahlungen:** 2.160,00 €
**Nachzahlung: 2.508,00 €**

Merksatz: Heizkostenverordnung gilt zwingend — mindestens 50% nach Verbrauch!`
    }
    ]
  },
  day_63: {
    title: "Mieterhöhungsverlangen",
    type: "Recht & Praxis",
    theory: `
# Mieterhöhungen im Wohnraumrecht

Vermieter können die Miete nicht willkürlich erhöhen. Es gelten strenge gesetzliche Regeln.

## 1. Erhöhung bis zur ortsüblichen Vergleichsmiete (§ 558 BGB)
*   **Voraussetzungen:** Miete war 15 Monate unverändert.
*   **Kappungsgrenze:** Max. 20% (in Mangelgebieten 15%) Erhöhung innerhalb von 3 Jahren.
*   **Begründungsmittel:** Mietspiegel (einfach/qualifiziert), Mietdatenbank, Gutachten, 3 Vergleichswohnungen.
*   **Zustimmung:** Der Mieter muss zustimmen (Klageweg bei Verweigerung).

## 2. Erhöhung nach Modernisierung (§ 559 BGB)
*   8% der für die Wohnung aufgewendeten Modernisierungskosten können dauerhaft auf die Jahresmiete umgelegt werden.
*   **Kappung:** Max. 3 €/m² (bzw. 2 €/m² bei Miete < 7 €) innerhalb von 6 Jahren.
*   **Härtefall:** Mieter kann Härteeinwand geltend machen.

## 3. Staffelmiete (§ 557a BGB) & Indexmiete (§ 557b BGB)
*   **Staffel:** Feste Erhöhungsbeträge zu festen Zeitpunkten (keine weitere Erhöhung nach § 558/559 möglich).
*   **Index:** Kopplung an den Verbraucherpreisindex (VPI).
`,
    law: [
      "§ 558 BGB (Mieterhöhung bis zur ortsüblichen Vergleichsmiete)",
      "§ 559 BGB (Mieterhöhung nach Modernisierungsmaßnahmen)",
      "§ 557b BGB (Indexmiete)"
    ],
    practice: `
### Fallbeispiel: Indexmiete anpassen
Im Mietvertrag (Beginn 01.01.2022) ist eine Indexmiete vereinbart. Basisindex: 110 Punkte. Aktueller Index (Jan 2024): 121 Punkte. Alte Kaltmiete: 800 €.

**Berechnung:**
Prozentuale Steigerung = ((Neuer Index - Alter Index) / Alter Index) * 100
((121 - 110) / 110) * 100 = 10 %

Neue Miete = 800 € + 10% = 880 €.

**Durchführung:**
Schriftliche Erklärung an den Mieter mit Berechnungsgrundlage. Die neue Miete wird übernächsten Monat fällig (Zugang im Januar -> Fällig ab März). Zustimmung des Mieters ist *nicht* erforderlich.
`,
    task: {
      question: "Kann bei einer vereinbarten Indexmiete zusätzlich eine Erhöhung wegen Modernisierung (§ 559 BGB) verlangt werden?",
      solution: "Grundsätzlich nein (§ 557b Abs. 2 BGB). Ausnahme: Die Modernisierung war gesetzlich vorgeschrieben (z.B. Rauchmelderpflicht, zwingende energetische Sanierung)."
    }
  },
  day_64: {
    title: "Kündigung & Abwicklung",
    type: "Recht & Praxis",
    theory: `
# Kündigung von Mietverhältnissen

## 1. Ordentliche Kündigung durch Mieter
*   Frist: 3 Monate (gesetzlich), unabhängig von Wohndauer.
*   Grund: Kein Grund erforderlich.

## 2. Ordentliche Kündigung durch Vermieter (§ 573 BGB)
*   **Berechtigtes Interesse nötig:**
    *   Pflichtverletzung (erheblich).
    *   Eigenbedarf (für sich oder Familienangehörige).
    *   Hinderung an wirtschaftlicher Verwertung (selten).
*   **Fristen (§ 573c BGB):** Staffelung nach Wohndauer (bis 5 Jahre: 3 Mon., 5-8 Jahre: 6 Mon., >8 Jahre: 9 Mon.).

## 3. Fristlose Kündigung (§ 543 BGB)
*   Wichtiger Grund (Unzumutbarkeit).
*   **Zahlungsverzug:** Rückstand > 2 Monatsmieten oder über 2 Termine hinweg signifikante Teilbeträge.
*   **Störung des Hausfriedens:** Trotz Abmahnung.

## 4. Wohnungsabnahme
*   Protokollierung des Zustands.
*   Schönheitsreparaturen (nur wenn wirksam vereinbart!).
*   Schlüsselrückgabe.
`,
    law: [
      "§ 573 BGB (Ordentliche Kündigung des Vermieters)",
      "§ 543 BGB (Außerordentliche fristlose Kündigung)",
      "§ 573c BGB (Fristen der ordentlichen Kündigung)"
    ],
    practice: `
### Das Übergabeprotokoll
Ein sorgfältiges Protokoll ist das wichtigste Beweismittel.
*   **Inhalt:** Zählerstände (Strom, Gas, Wasser), Anzahl Schlüssel, Mängel (genau beschrieben, z.B. "Kratzer im Parkett Wohnzimmer, 5cm, mittig"), Absprachen zu Renovierung.
*   **Unterschrift:** Von beiden Parteien.
*   **Wirkung:** Deklaratorisches oder konstitutives Schuldanerkenntnis (Vorsicht als Mieter!).

**Tipp:** Fotos machen! Bei Streitigkeiten helfen Bilder mehr als vage Beschreibungen.
`,
    task: [
    {
      question: "Ein Mieter wohnt seit 10 Jahren in der Wohnung. Der Vermieter kündigt wegen Eigenbedarf. Welche Kündigungsfrist gilt?",
      solution: "9 Monate (§ 573c BGB), da das Mietverhältnis länger als 8 Jahre besteht."
    },
    {
      question: `BGH-Aktualisierung 2024/25 — Eigenbedarfskündigung:
BGH Urteil v. 15.01.2025 (VIII ZR 213/23):
Vermieter kündigt wegen Eigenbedarf für seinen Sohn.
Sohn findet 3 Monate nach Kündigung eine andere Wohnung.
Muss der Vermieter die Kündigung zurücknehmen?
Was sind die Konsequenzen wenn der Eigenbedarf entfällt?`,
      solution: `**BGH 2025: Wegfall des Eigenbedarfs**
Ja — entfällt der Eigenbedarf NACH Ausspruch der Kündigung aber VOR Ablauf der Kündigungsfrist, muss der Vermieter den Mieter informieren und die Kündigung wird unwirksam.

**Konsequenzen bei Verschweigen:**
- Schadensersatz §280 BGB (Umzugskosten, Maklergebühren, Mehrmiete neue Wohnung)
- BGH: Auch entgangene Mieteinnahmen erstattungsfähig
- Strafbarkeit wegen Vortäuschung möglich (§263 StGB)

**Praxisregel:** Vermieter müssen Eigenbedarfsgründe dokumentieren und
bei Wegfall unverzüglich informieren. Nachträglicher Eigenbedarf (nach Auszug)
→ Schadensersatzpflicht wenn Mieter informiert und zurückgekehrt wäre.`
    },
    {
      question: `BGH 2024 — Schönheitsreparaturen (VIII ZR 71/23):
Mietvertrag enthält Klausel: "Der Mieter renoviert bei Auszug unabhängig vom Zustand."
Mieter zieht nach 8 Jahren aus ohne zu renovieren.
Kann Vermieter Schadensersatz verlangen?`,
      solution: `**Nein — Klausel ist unwirksam (§307 BGB).**

BGH st. Rspr. + Bestätigung 2024:
"Endrenovierungsklauseln" ohne Rücksicht auf Wohnungszustand bei Einzug = unwirksam.

**Wirksam nur wenn:**
1. Wohnung war bei Einzug renoviert (frisch gestrichen)
2. Fristenplan ist realistisch (3/5/7 Jahre)
3. Weiche Formulierung: "wenn erforderlich"

**Aktuelle BGH-Linie 2024:**
Auch "flexible Klauseln" mit Ausnahmen können unwirksam sein wenn
Grundstruktur unrealistisch ist. Im Zweifel: Klausel unwirksam.

Praxistipp: Wohnungsübergabeprotokoll mit Fotos = wichtigster Schutz!`
    }
    ]
  },
  day_65: {
    title: "Forderungsmanagement & Mahnwesen",
    type: "Kaufmännische Praxis",
    theory: `
# Forderungsmanagement in der Verwaltung

Mietrückstände und offene Hausgeldzahlungen gefährden die Liquidität.

## 1. Überwachung
*   Monatliche Sollstellung vs. Ist-Eingänge prüfen (am 3. Werktag).
*   Softwaregestützte OP-Listen (Offene Posten).

## 2. Das Mahnverfahren
*   **Mietrecht:** Mieter kommt automatisch in Verzug (§ 556b BGB: Miete fällig bis 3. Werktag). Mahnung nicht zwingend für Kündigung, aber für Verzugszinsen sinnvoll.
*   **Kaufmännisch:** 1. Erinnerung (freundlich) -> 2. Mahnung (bestimmt) -> 3. Mahnung (Androhung Kündigung/Anwalt).
*   **WEG:** Hausgeld ist Bringschuld. Verwalter muss Liquidität sichern.

## 3. Gerichtliches Mahnverfahren
*   Online-Mahnantrag (kostengünstig, schnell).
*   Vollstreckungsbescheid -> Titel -> Zwangsvollstreckung.
`,
    law: [
      "§ 286 BGB (Verzug des Schuldners)",
      "§ 556b BGB (Fälligkeit der Miete)",
      "§ 690 ZPO (Mahnantrag)"
    ],
    practice: `
### Prozess bei Mietrückstand
1.  **Tag 4 des Monats:** Zahlungseingang prüfen. Fehlt Miete?
2.  **Tag 5:** Telefonischer Kontakt (oft nur Vergesslichkeit/Bankfehler).
3.  **Tag 10:** Schriftliche Zahlungserinnerung.
4.  **Folge-Monat Tag 4:** Fehlt wieder Miete? -> Summe > 1 Monatsmiete?
5.  **Sofort:** Abmahnung und Androhung der fristlosen Kündigung.
6.  **Summe > 2 Monatsmieten:** Fristlose Kündigung + Hilfsweise ordentliche Kündigung aussprechen. Räumungsklage vorbereiten.
`,
    task: {
      question: "Ab wann befindet sich der Wohnraummieter mit der Mietzahlung in Verzug?",
      solution: "Automatisch nach Ablauf des 3. Werktages des Monats, wenn die Miete nicht auf dem Konto des Vermieters eingegangen ist. Eine Mahnung ist nicht erforderlich (§ 286 Abs. 2 Nr. 1 BGB)."
    }
  },

  // Woche 14: Facility Management & Technik
  day_66: {
    title: "Grundlagen Facility Management (FM)",
    type: "Theorie",
    theory: `
# Facility Management (FM)

FM ist mehr als nur Hausmeistertätigkeit. Es ist die ganzheitliche Betrachtung und Bewirtschaftung von Gebäuden.

## Drei Säulen des FM
1.  **Technisches FM (TGM):** Betreiben, Instandhalten, Sanieren, Energiemanagement. (Heizung, Aufzug, Brandschutz).
2.  **Kaufmännisches FM (KGM):** Buchhaltung, Controlling, Vertragsmanagement, Kostenrechnung.
3.  **Infrastrukturelles FM (IGM):** Reinigung, Winterdienst, Gärtner, Sicherheit, Hausmeisterdienste.

## Zielsetzung
*   Werterhalt der Immobilie.
*   Kostenoptimierung (Betriebskosten senken).
*   Nutzerzufriedenheit erhöhen.
*   Rechtssicherheit (Betreiberverantwortung).
`,
    law: [
      "GEFMA Richtlinien (Branchenstandards)",
      "Betriebssicherheitsverordnung (BetrSichV)"
    ],
    practice: `
### Vergabe von Dienstleistungen (IGM)
Sie suchen einen neuen Dienstleister für Treppenhausreinigung und Winterdienst.

**Ablauf:**
1.  **Leistungsverzeichnis (LV) erstellen:** Was soll wie oft gereinigt werden? (Kehren, Feuchtwischen, Fenster, Geländer). Wann muss Winterdienst erfolgen?
2.  **Ausschreibung:** Angebote von 3 Firmen einholen.
3.  **Preisspiegel:** Vergleich der Angebote (Pauschalpreis vs. Stundenlohn).
4.  **Vertrag:** Detaillierte Leistungsbeschreibung als Anlage zum Vertrag.
5.  **Kontrolle:** Regelmäßige Begehungen zur Qualitätsprüfung (Schlechtleistung dokumentieren!).
`,
    task: {
      question: "Zu welchem Bereich des FM gehört die Wartung der Aufzugsanlage?",
      solution: "Zum Technischen Facility Management (TGM)."
    }
  },
  day_67: {
    title: "Verkehrssicherungspflichten",
    type: "Recht & Haftung",
    theory: `
# Verkehrssicherungspflichten

Der Eigentümer (und delegiert der Verwalter) muss Gefahrenquellen beseitigen oder absichern, die von der Immobilie ausgehen.

## Typische Gefahrenbereiche
*   **Winterdienst:** Räum- und Streupflicht (Satzung der Gemeinde beachten!).
*   **Baumbestand:** Regelmäßige Baumschau (Totholz, Standfestigkeit).
*   **Wege:** Stolperfallen (hochstehende Gehwegplatten), Beleuchtung.
*   **Dach:** Herabfallende Ziegel, Eiszapfen.
*   **Spielplatz:** TÜV-Prüfung der Spielgeräte.

## Delegation
Die Pflicht kann auf Dritte (Hausmeister, Dienstleister, Mieter) übertragen werden.
*   **Aber:** Überwachungspflicht bleibt beim Verwalter!
*   **Exkulpation:** Nur möglich, wenn sorgfältige Auswahl und Überwachung nachgewiesen wird.
`,
    law: [
      "§ 823 BGB (Schadensersatzpflicht)",
      "§ 836 BGB (Haftung des Tierhalters/Gebäudebesitzers)"
    ],
    practice: `
### Das Verkehrssicherungsprotokoll
Führen Sie ein Logbuch über Ihre Kontrollen.
*   **Datum/Uhrzeit.**
*   **Geprüfter Bereich** (z.B. Außenbeleuchtung, Gehweg).
*   **Feststellung** (z.B. "Lampe Hauseingang defekt").
*   **Maßnahme** (z.B. "Elektriker beauftragt am...").
*   **Erledigung** (z.B. "Repariert am...").

**Winterdienst:** Lassen Sie sich vom Dienstleister die Streuprotokolle monatlich zusenden. Prüfen Sie stichprobenartig, ob geräumt wurde.
`,
    task: {
      question: "Kann die Streupflicht im Mietvertrag auf den Mieter im Erdgeschoss übertragen werden?",
      solution: "Ja, das ist möglich und üblich. Der Vermieter muss jedoch überwachen, ob der Mieter der Pflicht auch nachkommt."
    }
  },
  day_68: {
    title: "Energiemanagement & Nachhaltigkeit",
    type: "Technik & Umwelt",
    theory: `
# Energiemanagement

Angesichts steigender Energiekosten und Klimaschutzgesetzen (GEG) wird Energiemanagement zur Kernkompetenz.

## Gebäudeenergiegesetz (GEG)
*   Anforderungen an Heizungstausch (65% Erneuerbare Energien).
*   Dämmvorschriften bei Sanierung.
*   Energieausweis (Verbrauchs- vs. Bedarfsausweis).

## Maßnahmen zur Optimierung
*   **Geringinvestiv:** Hydraulischer Abgleich, programmierbare Thermostate, Dämmung von Rohren, LED-Beleuchtung.
*   **Investiv:** Fassadendämmung, Fenstertausch, neue Heizanlage (Wärmepumpe, Hybrid), PV-Anlage.

## CO2-Bepreisung
Vermieter müssen sich je nach energetischem Zustand des Gebäudes an den CO2-Kosten der Heizung beteiligen (Stufenmodell).
`,
    law: [
      "Gebäudeenergiegesetz (GEG)",
      "Kohlendioxidkostenaufteilungsgesetz (CO2KostAufG)"
    ],
    practice: `
### Energieausweis prüfen
Sie übernehmen ein Objekt. Prüfen Sie den Energieausweis:
1.  **Gültigkeit:** Max. 10 Jahre.
2.  **Art:** Bedarf oder Verbrauch?
3.  **Kennwert:** kWh/(m²·a). (Klasse A+ bis H).
4.  **Empfehlungen:** Auf Seite 4 stehen Modernisierungstipps. Nutzen Sie diese für die nächste Eigentümerversammlung als Vorschlag.

**Tipp:** Verbrauchsdaten-Monitoring. Erfassen Sie monatlich die Zählerstände, um Leckagen oder Einstellungsfehler der Heizung frühzeitig zu erkennen.
`,
    task: {
      question: "Wer trägt nach dem CO2KostAufG die CO2-Kosten bei einem Gebäude mit sehr schlechter Energiebilanz (Klasse H)?",
      solution: "Der Vermieter trägt den Großteil der Kosten (bis zu 95%), um einen Anreiz zur energetischen Sanierung zu schaffen."
    }
  },
  day_69: {
    title: "Instandhaltungsplanung",
    type: "Planung & Technik",
    theory: `
# Langfristige Instandhaltungsplanung

Reagieren ist teurer als Agieren. Ein guter Verwalter plant Instandhaltungen über Jahre voraus.

## Lebenszyklus von Bauteilen
*   Dach: 30-50 Jahre.
*   Heizung: 15-20 Jahre.
*   Fassade (Anstrich): 10-15 Jahre.
*   Fenster: 25-40 Jahre.

## Der Instandhaltungsplan
Ein 10-Jahres-Plan für die WEG oder das Mietshaus.
*   Jahr 1-3: Dringende Maßnahmen (Verkehrssicherung, Substanzerhalt).
*   Jahr 4-7: Mittelfristige Maßnahmen (Optik, Komfort, Energie).
*   Jahr 8-10: Langfristige Großprojekte (Dach, Strangsanierung).

## Finanzierung
Abgleich der geplanten Kosten mit der Instandhaltungsrücklage. Ggf. Erhöhung des Hausgeldes oder Sonderumlage einplanen.
`,
    law: [
      "§ 19 WEG (Erhaltung und Modernisierung)",
      "§ 28 WEG (Wirtschaftsplan)"
    ],
    practice: `
### Begehung und Zustandsbewertung
Führen Sie eine jährliche Objektbegehung durch, idealerweise mit einem Beirat oder Techniker.
*   **Dach:** Sichtprüfung (Ziegel, Rinnen).
*   **Keller:** Feuchtigkeit? Risse?
*   **Fassade:** Abplatzungen? Risse? Algen?
*   **Technikraum:** Wartungsaufkleber aktuell? Geräusche? Leckagen?

Erstellen Sie daraus eine Prioritätenliste für die nächste ETV. "Wenn wir das Dach jetzt nicht machen, kostet der Wasserschaden nächstes Jahr das Doppelte."
`,
    task: {
      question: "Warum ist ein langfristiger Instandhaltungsplan für die WEG wichtig?",
      solution: "Um finanzielle Planungssicherheit zu schaffen, hohe Sonderumlagen zu vermeiden (Ansparen) und den Werterhalt der Immobilie systematisch zu sichern."
    }
  },
  day_70: {
    title: "Versicherungsmanagement",
    type: "Kaufmännisch",
    theory: `
# Versicherungen rund um die Immobilie

Der Verwalter muss für ausreichenden Versicherungsschutz sorgen.

## Pflicht- / Basisversicherungen
*   **Wohngebäudeversicherung:** Feuer, Leitungswasser, Sturm/Hagel. (Elementar optional, aber dringend empfohlen!).
*   **Haus- und Grundbesitzerhaftpflicht:** Deckt Schäden Dritter durch die Immobilie (z.B. Dachziegel auf Auto).
*   **Gewässerschadenhaftpflicht:** Bei Öltanks.

## Für den Verwalter
*   **Vermögensschadenhaftpflicht:** Pflicht für gewerbliche Verwalter (§ 34c GewO). Deckt Fehler (z.B. Fristversäumnis Kündigung, Rechenfehler Abrechnung).
*   **Vertrauensschadenversicherung:** Bei Veruntreuung durch Mitarbeiter.

## Schadensmanagement
*   Sofortmaßnahmen (Wasser abstellen, Dach notdecken).
*   Versicherung melden (Fristen!).
*   Dokumentation (Fotos, Berichte).
`,
    law: [
      "§ 19 Abs. 2 Nr. 4 WEG (Pflicht zur Versicherung)",
      "VVG (Versicherungsvertragsgesetz)"
    ],
    practice: `
### Der Versicherungsschaden
Ein Rohrbruch im 2. OG nässt die Wohnung im 1. OG durch.
1.  **Sofort:** Wasser abdrehen, Notdienst Sanitär rufen.
2.  **Meldung:** Gebäudeversicherung informieren (Schadennummer geben lassen).
3.  **Trocknung:** Trocknungsfirma beauftragen (Stromzähler für Trockner notieren -> Stromkosten erstattet Versicherung!).
4.  **Sanierung:** Maler/Bodenleger beauftragen.
5.  **Abrechnung:** Rechnungen gesammelt bei Versicherung einreichen. Regulierungsbetrag dem WEG-Konto gutschreiben.

**Wichtig:** Hausrat (Möbel, Teppiche des Mieters) zahlt NICHT die Gebäudeversicherung, sondern die Hausratversicherung des Mieters!
`,
    task: {
      question: "Deckt die Gebäudeversicherung Schäden durch Hochwasser oder Erdbeben automatisch ab?",
      solution: "Nein, dafür ist der Baustein 'Elementarschadenversicherung' notwendig, der oft separat abgeschlossen werden muss."
    }
  },

  // Woche 15: Konfliktmanagement & Kommunikation
  day_71: {
    title: "Kommunikation & Konfliktlösung",
    type: "Soft Skills",
    theory: `
# Konfliktmanagement in der Verwaltung

Verwalter sind oft Mediatoren zwischen Eigentümern, Mietern und Nachbarn.

## Typische Konflikte
*   Lärm (Kinder, Musik, Partys).
*   Gerüche (Rauchen, Kochen, Grillen).
*   Treppenhausreinigung / Mülltrennung.
*   Gartennutzung / Sondernutzungsrechte.
*   Bauliche Veränderungen.

## Eskalationsstufen
1.  Gespräch suchen (Moderation).
2.  Schriftliche Aufforderung / Abmahnung.
3.  Beschlussfassung (in der WEG).
4.  Rechtliche Schritte (Unterlassungsklage, Entziehungsklage).

## Kommunikationstechniken
*   **Aktives Zuhören:** "Ich verstehe, dass Sie sich ärgern..."
*   **Sachlichkeit:** Trennung von Person und Problem.
*   **Lösungsorientierung:** "Wie können wir das künftig regeln?" statt "Wer ist schuld?"
`,
    law: [
      "§ 14 WEG (Pflichten der Eigentümer)",
      "Hausordnung"
    ],
    practice: `
### Lärmprotokoll
Ein Eigentümer beschwert sich massiv über Lärm aus der Wohnung darüber.
**Ihre Reaktion:**
"Herr Müller, ich nehme Ihre Beschwerde ernst. Damit ich tätig werden kann, brauche ich Fakten. Bitte führen Sie 14 Tage lang ein Lärmprotokoll: Datum, Uhrzeit, Art des Lärms, Dauer, Zeugen (z.B. Ehefrau)."

**Warum?** Ohne Protokoll ist eine Abmahnung vor Gericht wertlos. Oft beruhigt sich die Lage schon durch den Zwang zum Protokollieren (subjektive Wahrnehmung vs. objektive Störung).
`,
    task: {
      question: "Kann ein Eigentümer, der ständig den Hausfrieden stört, aus der WEG ausgeschlossen werden?",
      solution: "Ja, als letztes Mittel durch die Entziehungsklage (§ 17 WEG), wenn die Fortsetzung der Gemeinschaft unzumutbar ist."
    }
  },
  day_72: {
    title: "Die schwierige Eigentümerversammlung",
    type: "Praxis-Simulation",
    theory: `
# Umgang mit schwierigen Versammlungen

ETVs können emotional und chaotisch werden. Der Verwalter muss die Versammlung leiten und Ergebnisse sichern.

## Strategien
*   **Gute Vorbereitung:** Alle Fakten, Angebote und Beschlussanträge müssen glasklar in der Einladung stehen. Keine Überraschungen!
*   **Straffe Leitung:** Tagesordnung einhalten. Redezeiten begrenzen, wenn nötig.
*   **Geschäftsordnung:** Zu Beginn beschließen lassen (z.B. "Redezeit max. 3 Minuten pro Person zum Thema").
*   **Neutralität:** Der Verwalter ist Dienstleister der *Gemeinschaft*, nicht eines einzelnen Beirats.

## Störer
*   **Der Dauerredner:** Unterbrechen, zusammenfassen, Wort entziehen.
*   **Der Aggressive:** Sachlich bleiben, persönliche Angriffe ignorieren, zur Ordnung rufen.
*   **Der Besserwisser:** Fachkompetenz zeigen, aber auch gute Hinweise annehmen.
`,
    law: [
      "§ 24 WEG (Einberufung, Vorsitz, Niederschrift)"
    ],
    practice: `
### Szenario: Sanierungsstau vs. Kostenbremse
Das Dach ist undicht. Eine Sanierung kostet 100.000 €. Drei Eigentümer (Rentner) sagen: "Wir haben kein Geld, flicken reicht." Die anderen wollen eine energetische Sanierung.

**Lösung:**
1.  **Fakten:** Zeigen Sie Bilder der Schäden. Erklären Sie die Folgeschäden (Schwamm, Wertverlust).
2.  **Alternativen:** Präsentieren Sie Option A (Flicken, hält 2 Jahre) und Option B (Sanierung + Dämmung, Energieersparnis, Förderungen).
3.  **Finanzierung:** Bieten Sie Ratenzahlung der Sonderumlage an oder prüfen Sie einen WEG-Kredit.
4.  **Abstimmung:** Lassen Sie demokratisch entscheiden. Dokumentieren Sie die Ablehnung der Sanierung genau (Haftungsausschluss für Verwalter!).
`,
    task: {
      question: "Darf der Verwalter einen Eigentümer des Saales verweisen?",
      solution: "Nur in extremen Ausnahmefällen (schwere Straftaten, massive Bedrohung). In der Regel reicht ein Ordnungsruf oder Entzug des Wortes."
    }
  },
  day_73: {
    title: "Datenschutz (DSGVO) in der Verwaltung",
    type: "Recht",
    theory: `
# DSGVO für Immobilienverwalter

Verwalter verarbeiten sensible Daten (Namen, Konten, Vermögensverhältnisse).

## Grundsätze
*   **Rechtmäßigkeit:** Datenverarbeitung nur mit Rechtsgrundlage (Vertrag, Gesetz).
*   **Zweckbindung:** Daten nur für den Zweck der Verwaltung nutzen.
*   **Datenminimierung:** Nur so viel wie nötig speichern.
*   **Transparenz:** Informationspflichten bei Datenerhebung.

## Praxisrelevanz
*   **Schwarzes Brett:** Keine Namen von säumigen Zahlern aushängen! (Verstoß Datenschutz + Persönlichkeitsrecht).
*   **E-Mail-Verteiler:** "BCC" nutzen oder Einverständnis für offenen Verteiler einholen.
*   **Einsichtnahme:** Eigentümer dürfen Einsicht in Verwaltungsunterlagen nehmen, aber sensible Daten Dritter (z.B. Einkommensnachweise von Mietern im Sondereigentum) sind tabu.
`,
    law: [
      "DSGVO (Datenschutz-Grundverordnung)",
      "BDSG (Bundesdatenschutzgesetz)"
    ],
    practice: `
### Auskunftsersuchen
Ein Mieter verlangt Auskunft darüber, welche Daten Sie über ihn gespeichert haben.
**Reaktion:**
Sie müssen binnen einen Monats kostenlos Auskunft geben (Art. 15 DSGVO):
*   Stammdaten (Name, Adresse).
*   Vertragsdaten (Miete, Konto).
*   Korrespondenz.
*   Ggf. Bonitätsdaten (Schufa), falls gespeichert.

Erstellen Sie Standard-Prozesse für Löschungen (z.B. Bewerberdaten nach Absage löschen).
`,
    task: {
      question: "Darf die Mieterliste mit Telefonnummern an alle Hausbewohner verteilt werden?",
      solution: "Nein, nur mit ausdrücklicher Einwilligung aller Betroffenen. Es gibt keine Rechtsgrundlage für die pauschale Weitergabe."
    }
  },
  day_74: {
    title: "Digitalisierung & PropTech",
    type: "Zukunftstrends",
    theory: `
# Digitalisierung in der Immobilienverwaltung

Die Branche wandelt sich von Papierordnern zu digitalen Plattformen.

## Kundenportale
*   App/Web-Portal für Eigentümer und Mieter.
*   Dokumentenarchiv (Teilungserklärung, Protokolle, Abrechnungen zum Download).
*   Ticketsystem für Schadensmeldungen (Foto hochladen -> Status verfolgen).
*   Schwarzes Brett digital (Infos an alle).

## Vorteile
*   **Effizienz:** Weniger Telefonate ("Ist der Handwerker schon beauftragt?").
*   **Transparenz:** Kunden sehen Aktivitäten.
*   **Kosten:** Weniger Porto und Druckkosten.

## Smart Building
*   Digitale Schließanlagen.
*   Fernauslesbare Zähler (Smart Metering).
*   Sensorik (Feuchtigkeit, Heizungsausfall).
`,
    law: [],
    practice: `
### Einführung eines Kundenportals
Sie wollen eine App einführen.
1.  **Auswahl:** Anbieter vergleichen (Funktionen, Schnittstelle zur Verwaltersoftware, Datenschutz).
2.  **Datenpflege:** Stammdaten und E-Mail-Adressen müssen aktuell sein.
3.  **Onboarding:** Laden Sie die Eigentümer ein. Erklären Sie den Nutzen (Dokumente 24/7 verfügbar).
4.  **Pflege:** Ein Portal lebt von Aktualität. Laden Sie Protokolle sofort hoch, bearbeiten Sie Tickets zeitnah.
`,
    task: {
      question: "Ersetzt ein Kundenportal die gesetzliche Pflicht zur Versendung der Einladung per Textform?",
      solution: "Ja, wenn der Eigentümer zugestimmt hat, die Einladung elektronisch (z.B. per E-Mail-Benachrichtigung über neuen Upload) zu erhalten. Sicherer ist oft noch der E-Mail-Versand."
    }
  },
  day_75: {
    title: "Steuern rund um die Immobilie",
    type: "Finanzen & Recht",
    theory: `
# Steuerliche Aspekte für Verwalter

Grundwissen im Steuerrecht ist unerlässlich, auch wenn keine Steuerberatung geleistet werden darf.

## Haushaltsnahe Dienstleistungen (§ 35a EStG)
*   Mieter und Eigentümer können 20% der Arbeitskosten (Lohn, Fahrt, Maschinen) von Handwerker- und Dienstleisterrechnungen steuerlich absetzen.
*   **Verwalterpflicht:** Ausweis dieser Kosten in der Jahresabrechnung (separater Ausweis nach § 35a EStG).

## Grundsteuer
*   Objektsteuer, wird auf Mieter umgelegt (Betriebskosten).
*   Reform 2025 beachten!

## Umsatzsteuer
*   Wohnraummiete ist i.d.R. umsatzsteuerfrei.
*   Gewerbemiete kann optiert werden (USt-Pflicht), wenn Mieter vorsteuerabzugsberechtigt ist.
*   Verwaltergebühr ist immer USt-pflichtig (19%).
`,
    law: [
      "§ 35a EStG (Steuerermäßigung bei Aufwendungen für haushaltsnahe Dienstleistungen)",
      "UStG (Umsatzsteuergesetz)"
    ],
    practice: `
### Bescheinigung nach § 35a EStG
Ein Eigentümer verlangt eine Bescheinigung für das Finanzamt.
*   In der Hausgeldabrechnung ist meist eine Anlage "Bescheinigung nach § 35a EStG" enthalten.
*   Wichtig: Es dürfen nur *unbare* Zahlungen berücksichtigt werden. Barzahlungen an Handwerker werden vom Finanzamt nicht anerkannt!
*   Prüfen Sie Rechnungen von Dienstleistern: Sind Lohn- und Materialkosten getrennt ausgewiesen? Wenn nicht -> Rechnung zurückweisen/korrigieren lassen.
`,
    task: {
      question: "Sind Materialkosten bei Handwerkerrechnungen nach § 35a EStG absetzbar?",
      solution: "Nein, nur Arbeits-, Fahrt- und Maschinenkosten. Materialkosten sind nicht begünstigt."
    }
  },

  // Woche 16: Abschluss & Prüfungsvorbereitung
  day_76: {
    title: "Repetitorium: WEG-Recht",
    type: "Wiederholung",
    theory: `
# Wiederholung WEG-Recht

Zentrale Punkte für die Prüfung und Praxis:
1.  **Begründung:** Teilungserklärung, Aufteilungsplan, Abgeschlossenheitsbescheinigung.
2.  **Organe:** Eigentümerversammlung (Willensbildung), Verwalter (Vollzug), Beirat (Prüfung/Unterstützung).
3.  **Gemeinschafts- vs. Sondereigentum:** Wer zahlt was? Wer entscheidet was? (Fenster sind zwingend Gemeinschaftseigentum!).
4.  **Beschlussfassung:** Mehrheitsprinzip (Kopf- vs. Wertprinzip), Beschlusskompetenz, Anfechtungsfristen.
5.  **Verwalter:** Bestellung (max. 5 Jahre), Abberufung (jederzeit möglich), Zertifizierung.
`,
    law: ["WEG (Wohnungseigentumsgesetz)"],
    practice: `
### Lern-Check
Gehen Sie alte Protokolle und Teilungserklärungen durch. Versuchen Sie, Streitfälle von damals mit Ihrem jetzigen Wissen neu zu bewerten. Hätten Sie anders gehandelt?
`,
    task: {
      question: "Wie lange ist die Anfechtungsfrist für Beschlüsse der Eigentümerversammlung?",
      solution: "Einen Monat nach Beschlussfassung (nicht nach Protokollversand!). Begründung muss binnen zwei Monaten erfolgen (§ 45 WEG)."
    }
  },
  day_77: {
    title: "Repetitorium: Mietrecht",
    type: "Wiederholung",
    theory: `
# Wiederholung Mietrecht

1.  **Vertrag:** Wohnraum vs. Gewerbe (Schriftform, Laufzeiten, Kündigungsschutz).
2.  **Miete:** Mietpreisbremse, Kappungsgrenze, Mietspiegel, Erhöhungsarten.
3.  **Betriebskosten:** Umlagefähigkeit, Abrechnungsfristen, Wirtschaftlichkeitsgebot.
4.  **Mängel:** Minderung (automatisch kraft Gesetzes), Anzeigepflicht, Selbstvornahme.
5.  **Beendigung:** Kündigungsfristen, Kündigungsgründe, Räumung, Schönheitsreparaturen.
`,
    law: ["BGB Mietrecht (§§ 535 ff.)"],
    practice: `
### Karteikarten-Lernen
Erstellen Sie Karteikarten zu den wichtigsten Fristen:
*   Kündigungsfristen (Mieter/Vermieter).
*   Abrechnungsfristen BKA.
*   Verjährung (3 Jahre Regelverjährung, 6 Monate nach Rückgabe für Ersatzansprüche).
*   Sperrfristen (Eigenbedarf nach Umwandlung).
`,
    task: {
      question: "Wann verjähren Ersatzansprüche des Vermieters wegen Veränderungen oder Verschlechterungen der Mietsache?",
      solution: "In 6 Monaten ab Rückerhalt der Mietsache (§ 548 BGB). Dies ist eine kurze Verjährung!"
    }
  },
  day_78: {
    title: "Repetitorium: Kaufmännische Verwaltung",
    type: "Wiederholung",
    theory: `
# Wiederholung Kaufmännisches

1.  **Buchhaltung:** Einnahmen-Überschuss-Rechnung, doppelte Buchführung (Option), Kontenrahmen.
2.  **Jahresabrechnung:** Gesamtabrechnung, Einzelabrechnung, Instandhaltungsrücklage, Vermögensstatus.
3.  **Wirtschaftsplan:** Prognose, Hausgeldvorschüsse, Liquiditätsplanung.
4.  **Mahnwesen:** Verzug, Mahnbescheid, Zwangsvollstreckung.
`,
    law: [],
    practice: `
### Rechenübungen
Üben Sie die Verteilung von Kosten:
*   Kosten 10.000 €, Verteilerschlüssel MEA.
*   Gesamt-MEA 1.000, Wohnung A hat 85 MEA.
*   Rechnung: 10.000 / 1.000 * 85 = 850 €.

Üben Sie Heizkostenverteilung (70/30).
`,
    task: {
      question: "Was gehört zwingend in den Vermögensstatus einer WEG-Abrechnung?",
      solution: "Die Darstellung der Vermögenswerte (Bankkonten, Rücklagen, Forderungen) und Verbindlichkeiten der Gemeinschaft zum Stichtag."
    }
  },
  day_79: {
    title: "Prüfungssimulation: Fallstudien",
    type: "Prüfungstraining",
    theory: `
# Komplexe Fallstudien lösen

In der Prüfung und Praxis kommen Themen selten isoliert vor.

## Der "Horror-Fall"
In einer WEG tropft es durch die Decke (Technik/Versicherung). Der Mieter oben verweigert den Zutritt (Recht/Mietrecht). Der Eigentümer oben ist pleite und zahlt kein Hausgeld (Kaufmännisch/Mahnwesen). Die anderen Eigentümer wollen den Verwalter verklagen (Recht/WEG).

## Herangehensweise
1.  **Sachverhalt analysieren:** Wer will was von wem woraus?
2.  **Priorisieren:** Was brennt? (Wasser -> Notmaßnahme). Was hat Zeit? (Klage).
3.  **Rechtsgrundlagen suchen:** Teilungserklärung, BGB, WEG.
4.  **Lösungsweg skizzieren:** Schritt für Schritt.
`,
    law: [],
    practice: `
### Übungsfall
Versuchen Sie den "Horror-Fall" strukturiert zu lösen.
1.  Notmaßnahme (Wasser stoppen) nach § 27 WEG (Notgeschäftsführung).
2.  Zutritt erzwingen (Duldungspflicht § 14 WEG / Mietrecht Gefahr im Verzug -> Polizei/Schlüsseldienst im Extremfall oder einstweilige Verfügung).
3.  Mahnverfahren gegen Eigentümer einleiten.
4.  Eigentümerversammlung einberufen, Sachlage klären, Transparenz schaffen.
`,
    task: {
      question: "Darf der Verwalter ohne Beschluss einen Anwalt für die WEG beauftragen?",
      solution: "Nur in dringenden Fällen oder wenn es zur Abwehr von Fristen notwendig ist (Passivprozess). Für Aktivprozesse (Klage erheben) ist meist ein Beschluss nötig."
    }
  },
  day_80: {
    title: "Abschluss & Ausblick",
    type: "Abschluss",
    theory: `
# Herzlichen Glückwunsch!

Sie haben das Modul 3 "Immobilienverwalter" erfolgreich durchgearbeitet.

## Was Sie jetzt können
*   Sie verstehen die rechtlichen Strukturen einer WEG und der Mietverwaltung.
*   Sie können eine ordnungsgemäße Jahresabrechnung und einen Wirtschaftsplan erstellen.
*   Sie wissen, wie man Eigentümerversammlungen leitet und Beschlüsse rechtssicher protokolliert.
*   Sie kennen die technischen Pflichten (Verkehrssicherung, Instandhaltung).
*   Sie können Konflikte professionell managen.

## Der Weg in die Selbstständigkeit
*   Gewerbeanmeldung (§ 34c GewO für Mietverwaltung, Zertifizierungspflicht für WEG-Verwalter).
*   Weiterbildungspflicht (20 Stunden in 3 Jahren).
*   Netzwerk aufbauen (Handwerker, Architekten, Anwälte).

Bleiben Sie neugierig! Die Rechtsprechung (insb. BGH-Urteile zum WEG-Recht) ändert sich stetig. Abonnieren Sie Fachzeitschriften (z.B. DDIV).
`,
    law: ["§ 34c GewO (Weiterbildungspflicht)"],
    practice: `
### Ihr persönlicher Action-Plan
1.  **Zertifizierung:** Melden Sie sich zur IHK-Prüfung "Zertifizierter Verwalter" an (falls noch nicht geschehen).
2.  **Software:** Entscheiden Sie sich für eine Verwaltersoftware.
3.  **Akquise:** Erstellen Sie ein Exposé für Ihre Verwaltungsleistung.
4.  **Start:** Übernehmen Sie die erste kleine WEG oder Mietverwaltung. Learning by doing!
`,
    task: {
      question: "Wie viele Stunden Weiterbildung müssen Immobilienverwalter gemäß § 34c GewO nachweisen?",
      solution: "20 Stunden innerhalb eines Zeitraums von drei Kalenderjahren."
    }
  }
};
