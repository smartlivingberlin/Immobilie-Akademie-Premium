// Modul 4: Gutachten & Sachverständige
// 20 Tage | 160 UE | Vollständig mit Theory, extendedTheory, Law, Practice, Tasks, Solutions

export const contentDataModule4Maximal: Record<string, {
  title: string;
  theory: string;
  extendedTheory?: string;
  law: string[];
  practice: string;
  task: string;
  solution?: string;
  type?: string;
}> = {

  day_1: {
    title: "Einführung Immobilienbewertung & Wertbegriffe",
    theory: `Die Immobilienbewertung ist die systematische Ermittlung des Wertes von Grundstücken und Immobilien. Sie bildet die Grundlage für Kaufentscheidungen, Finanzierungen, Steuerfestsetzungen und gerichtliche Auseinandersetzungen. Der zentrale Begriff ist der **Verkehrswert** (auch Marktwert genannt), der in § 194 BauGB definiert ist: 'Der Verkehrswert wird durch den Preis bestimmt, der in dem Zeitpunkt, auf den sich die Ermittlung bezieht, im gewöhnlichen Geschäftsverkehr nach den rechtlichen Gegebenheiten und tatsächlichen Eigenschaften, der sonstigen Beschaffenheit und der Lage des Grundstücks oder des sonstigen Gegenstands der Wertermittlung ohne Rücksicht auf ungewöhnliche oder persönliche Verhältnisse zu erzielen wäre.' Neben dem Verkehrswert gibt es weitere Wertbegriffe wie den **Beleihungswert** (für Banken), den **Versicherungswert** (für Versicherungen) und den **Substanzwert** (Wiederbeschaffungskosten). Die Immobilienwertermittlungsverordnung (ImmoWertV 2021) regelt die Grundsätze für die Ermittlung der Verkehrswerte und definiert drei normierte Wertermittlungsverfahren: Vergleichswertverfahren, Ertragswertverfahren und Sachwertverfahren.`,
    extendedTheory: `**Die Immobilienbewertung: Wissenschaft und Kunst zugleich**

Die Immobilienbewertung ist eine der anspruchsvollsten Disziplinen in der Immobilienwirtschaft. Sie erfordert fundiertes Fachwissen, Marktkenntnisse und Erfahrung.

**Warum ist die Immobilienbewertung so wichtig?**

Immobilien sind die größte Vermögensklasse in Deutschland. Der Gesamtwert aller Immobilien beträgt über 15 Billionen Euro. Jede Transaktion erfordert eine Wertermittlung.

**Anwendungsfälle:**
- Kauf/Verkauf: Verkäufer und Käufer benötigen einen realistischen Preis
- Finanzierung: Banken ermitteln den Beleihungswert (meist 80-90% des Verkehrswerts)
- Erbschaft/Schenkung: Finanzamt setzt Erbschaftsteuer fest
- Scheidung: Zugewinnausgleich erfordert Bewertung
- Enteignung: Entschädigung richtet sich nach Verkehrswert
- Versicherung: Versicherungssumme orientiert sich am Neuwert

**Die verschiedenen Wertbegriffe im Detail:**

**A. Verkehrswert (Marktwert)**
Der Verkehrswert ist der wichtigste Wertbegriff. Er entspricht dem Preis, der unter normalen Marktbedingungen erzielt werden kann.

Merkmale:
- Zeitpunktbezogen (Stichtag der Bewertung)
- Marktgerecht (keine persönlichen Verhältnisse)
- Objektiv (keine emotionalen Faktoren)

Beispiel: Eine Eigentumswohnung in München hat am 01.01.2026 einen Verkehrswert von 500.000 €. Ein Käufer, der 550.000 € zahlen will, ändert nichts am Verkehrswert.

**B. Beleihungswert**
Der Beleihungswert ist der Wert, den eine Bank als Sicherheit akzeptiert. Er liegt meist 10-20% unter dem Verkehrswert.

Formel: Beleihungswert = Verkehrswert × 0,8 bis 0,9

Beispiel:
- Verkehrswert: 500.000 €
- Beleihungswert: 400.000 € (80%)
- Maximaler Kredit: 320.000 € (80% des Beleihungswerts)

**C. Versicherungswert (Neuwert)**
Der Versicherungswert entspricht den Wiederbeschaffungskosten. Er ist meist höher als der Verkehrswert.

**D. Substanzwert (Sachwert)**
Der Substanzwert ist die Summe aus Bodenwert und Gebäudesachwert.

**Die drei normierten Wertermittlungsverfahren:**

1. **Vergleichswertverfahren**: Vergleich mit ähnlichen Immobilien
2. **Ertragswertverfahren**: Kapitalisierung der Mieteinnahmen
3. **Sachwertverfahren**: Summe aus Bodenwert und Gebäudesachwert

**Wer darf Immobilien bewerten?**

Grundsätzlich darf jeder Immobilien bewerten. Für bestimmte Zwecke sind jedoch öffentlich bestellte und vereidigte Sachverständige erforderlich.

**Die Rolle der Gutachterausschüsse:**

Gutachterausschüsse sammeln Kaufpreise, ermitteln Bodenrichtwerte und erstellen Marktberichte.`,
    law: ["§ 194 BauGB (Verkehrswert)", "ImmoWertV 2021 (Immobilienwertermittlungsverordnung)", "§ 192 BauGB (Gutachterausschüsse)"],
    practice: `**Praxisübung: Wertbegriffe unterscheiden**

Sie bewerten eine Eigentumswohnung in Berlin (80 m², Baujahr 1990).

Gegeben:
- Kaufpreis vergleichbarer Wohnungen: 5.000-6.000 €/m²
- Neubaukosten: 3.500 €/m²
- Jahresnettokaltmiete: 12.000 €
- Grundstückswert: 150.000 €

Fragen:
1. Schätzen Sie den Verkehrswert
2. Berechnen Sie den Versicherungswert
3. Schätzen Sie den Beleihungswert
4. Berechnen Sie den Substanzwert`,
    task: `Recherchieren Sie die Bodenrichtwerte für Ihre Stadt auf BORIS-D. Wählen Sie drei verschiedene Lagen und notieren Sie die Bodenrichtwerte.`,
    solution: `**Lösung Praxisübung:**

1. Verkehrswert: 5.500 €/m² × 80 m² = 440.000 €
2. Versicherungswert: 3.500 €/m² × 80 m² = 280.000 €
3. Beleihungswert: 440.000 € × 0,8 = 352.000 €
4. Substanzwert: 150.000 € + 280.000 € = 430.000 €`,
    type: "Grundlagen"
  },

  day_2: {
    title: "Rechtliche Grundlagen (ImmoWertV, BauGB, BGB)",
    theory: `Die rechtlichen Grundlagen der Immobilienbewertung sind in mehreren Gesetzen geregelt. Das **Baugesetzbuch (BauGB)** definiert in § 194 den Verkehrswert und regelt in §§ 192-199 die Gutachterausschüsse. Die **Immobilienwertermittlungsverordnung (ImmoWertV 2021)** konkretisiert die Grundsätze und definiert die drei Wertermittlungsverfahren. Das **Bürgerliche Gesetzbuch (BGB)** regelt die zivilrechtlichen Aspekte. Die ImmoWertV 2021 ist am 01.01.2022 in Kraft getreten und hat die alte ImmoWertV 2010 abgelöst. Wichtige Neuerungen: Stärkere Marktorientierung, Vereinfachung der Verfahren, Digitalisierung der Gutachterausschüsse.`,
    extendedTheory: `**Die rechtlichen Grundlagen im Detail**

Die Immobilienbewertung ist ein stark reguliertes Gebiet. Gutachter müssen die rechtlichen Grundlagen genau kennen.

**Das Baugesetzbuch (BauGB): Die Basis**

§ 194 BauGB definiert den Verkehrswert als den Preis, der im gewöhnlichen Geschäftsverkehr zu erzielen wäre.

Wichtige Begriffe:
- Zeitpunkt: Stichtag der Bewertung
- Gewöhnlicher Geschäftsverkehr: Normale Marktbedingungen
- Ohne Rücksicht auf ungewöhnliche Verhältnisse: Keine persönlichen Präferenzen

**Die Immobilienwertermittlungsverordnung (ImmoWertV 2021)**

Aufbau:
- Teil 1: Allgemeine Vorschriften (§§ 1-14)
- Teil 2: Vergleichswertverfahren (§§ 15-16)
- Teil 3: Ertragswertverfahren (§§ 17-20)
- Teil 4: Sachwertverfahren (§§ 21-23)
- Teil 5: Schlussvorschriften (§§ 24-25)

**Wichtige Neuerungen:**
- Stärkere Marktorientierung
- Vereinfachung der Verfahren
- Digitalisierung

**Das Bürgerliche Gesetzbuch (BGB)**

§§ 433-453 BGB regeln den Kaufvertrag und die Mängelhaftung.

**Die Honorarordnung (HOAI)**

Die HOAI regelt die Honorare für Sachverständige (seit 2020 nicht mehr bindend).

**Das Justizvergütungsgesetz (JVEG)**

Das JVEG regelt die Vergütung von Sachverständigen in Gerichtsverfahren (70-120 €/Stunde).`,
    law: ["§ 194 BauGB (Verkehrswert)", "§§ 192-199 BauGB (Gutachterausschüsse)", "ImmoWertV 2021", "§§ 433-453 BGB (Kaufvertrag)", "§ 51 HOAI (Honorar)", "§ 9 JVEG (Honorar Sachverständige)"],
    practice: `**Fall:** Sie sollen ein Einfamilienhaus in Hamburg für eine Bank bewerten.

Aufgaben:
1. Welcher Wertbegriff ist relevant?
2. Welches Verfahren würden Sie anwenden?
3. Wo finden Sie Vergleichsdaten?
4. Welches Honorar können Sie verlangen?
5. Was passiert bei Fehlern?`,
    task: `Lesen Sie § 194 BauGB und §§ 1-3 ImmoWertV 2021. Fassen Sie die wichtigsten Punkte zusammen.`,
    solution: `1. Relevanter Wertbegriff: Beleihungswert (Grundlage: Verkehrswert)
2. Verfahren: Vergleichswertverfahren
3. Vergleichsdaten: Gutachterausschuss Hamburg
4. Honorar: 3.000 € (freie Verhandlung)
5. Haftung: § 280 BGB, Berufshaftpflichtversicherung`,
    type: "Grundlagen"
  },

  day_3: {
    title: "Gutachterausschüsse & Bodenrichtwerte",
    theory: `Gutachterausschüsse sind unabhängige Gremien bei den Kommunen (§§ 192-199 BauGB). Sie sammeln alle Kaufpreise von Grundstückstransaktionen, ermitteln Bodenrichtwerte und erstellen Grundstücksmarktberichte. **Bodenrichtwerte** sind durchschnittliche Lagewerte für Grundstücke in einer Bodenrichtwertzone. Sie werden mindestens alle zwei Jahre zum Stichtag 31.12. ermittelt und sind kostenlos über BORIS-D abrufbar. Bodenrichtwerte sind die Grundlage für die Bodenwertermittlung in allen drei Wertermittlungsverfahren. Sie berücksichtigen den Entwicklungszustand (baureif, Rohbauland, Ackerland) und die Art der baulichen Nutzung (Wohnbaufläche, Gewerbefläche).`,
    extendedTheory: `**Gutachterausschüsse: Die Hüter der Markttransparenz**

**Organisation:** Jede Kommune muss einen Gutachterausschuss einrichten. Er besteht aus 5-15 ehrenamtlichen Mitgliedern (Sachverständige aus verschiedenen Bereichen).

**Aufgaben:**
1. **Kaufpreissammlung**: Notare melden alle Grundstückstransaktionen
2. **Bodenrichtwerte**: Durchschnittliche Lagewerte für Bodenrichtwertzonen
3. **Grundstücksmarktberichte**: Jährliche Marktanalysen
4. **Gutachten**: Verkehrswertgutachten auf Antrag

**Bodenrichtwerte im Detail:**

Ein Bodenrichtwert ist der durchschnittliche Lagewert eines **unbebauten, erschlossenen** Grundstücks.

**Entwicklungszustand:**
- Baureifes Land: 500 €/m² (voll erschlossen)
- Rohbauland: 350 €/m² (70%)
- Bauerwartungsland: 100 €/m² (20%)
- Ackerland: 5 €/m² (1%)

**Art der Nutzung:**
- Wohnbaufläche: 500 €/m²
- Gemischte Baufläche: 600 €/m²
- Gewerbefläche: 400 €/m²

**Anpassungsfaktoren:**
- Grundstücksgröße (große Grundstücke günstiger)
- Lage (Ecklage, Hanglage, Lärmbelastung)
- Erschließung (vollständig, teilweise)
- Altlasten (Kontaminierung)

**Formel:** Bodenwert = Bodenrichtwert × Grundstücksgröße × Anpassungsfaktoren

**BORIS-D:** Bundesweites Portal für Bodenrichtwerte (www.bodenrichtwerte-boris.de), kostenlos nutzbar.`,
    law: ["§§ 192-199 BauGB (Gutachterausschüsse)", "§ 195 BauGB (Kaufpreissammlung)", "§ 196 BauGB (Bodenrichtwerte)", "§ 4 ImmoWertV (Bodenwert)"],
    practice: `Ermitteln Sie den Bodenwert für drei Grundstücke mit unterschiedlichen Bodenrichtwerten und Anpassungsfaktoren.`,
    task: `Recherchieren Sie auf BORIS-D die Bodenrichtwerte für drei verschiedene Lagen in Ihrer Stadt. Erstellen Sie eine Tabelle.`,
    solution: `Grundstück A: 320.000 € | Grundstück B: 2.295.000 € | Grundstück C: 1.056.000 €`,
    type: "Grundlagen"
  },

  day_4: {
    title: "Wertermittlungsverfahren im Überblick",
    theory: `Die ImmoWertV 2021 definiert drei normierte Verfahren: **Vergleichswertverfahren** (§§ 15-16), **Ertragswertverfahren** (§§ 17-20) und **Sachwertverfahren** (§§ 21-23). Das Vergleichswertverfahren wird für eigengenutzte Wohnimmobilien angewendet (basiert auf Vergleichspreisen). Das Ertragswertverfahren wird für vermietete Immobilien angewendet (kapitalisiert Mieteinnahmen). Das Sachwertverfahren wird für Sonderimmobilien angewendet (summiert Bodenwert und Gebäudesachwert). In der Praxis werden oft mehrere Verfahren kombiniert zur Plausibilisierung.`,
    extendedTheory: `**Die drei Verfahren im Vergleich:**

**1. Vergleichswertverfahren:**
- Prinzip: Vergleich mit ähnlichen Immobilien
- Anwendung: Eigengenutzte Wohnimmobilien, Grundstücke
- Vorteil: Marktgerecht, einfach
- Nachteil: Erfordert viele Vergleichsdaten

**2. Ertragswertverfahren:**
- Prinzip: Kapitalisierung der Mieteinnahmen
- Anwendung: Vermietete Immobilien
- Vorteil: Renditeorientiert
- Nachteil: Komplex, viele Annahmen

**3. Sachwertverfahren:**
- Prinzip: Bodenwert + Gebäudesachwert
- Anwendung: Sonderimmobilien
- Vorteil: Objektiv, universell
- Nachteil: Marktferne

**Verfahrenswahl nach Immobilientyp:**
- Einfamilienhaus (selbstgenutzt): Vergleichswert
- Mehrfamilienhaus (vermietet): Ertragswert
- Hotel: Sachwert
- Grundstück: Vergleichswert

**Plausibilisierung:** Mehrere Verfahren kombinieren für belastbare Gutachten.`,
    law: ["§ 3 ImmoWertV (Wertermittlungsverfahren)", "§§ 15-16 ImmoWertV (Vergleichswertverfahren)", "§§ 17-20 ImmoWertV (Ertragswertverfahren)", "§§ 21-23 ImmoWertV (Sachwertverfahren)"],
    practice: `Wählen Sie für drei verschiedene Immobilien das geeignete Verfahren und begründen Sie.`,
    task: `Erstellen Sie eine Entscheidungsmatrix für die Verfahrenswahl (Nutzung, Immobilientyp, Datenverfügbarkeit).`,
    solution: `Immobilie A: Vergleichswertverfahren | Immobilie B: Ertragswertverfahren | Immobilie C: Sachwertverfahren`,
    type: "Grundlagen"
  },

  day_5: {
    title: "Datenerhebung & Objektbesichtigung",
    theory: `Die Datenerhebung ist die Grundlage jeder Wertermittlung. Sie umfasst die **Objektbesichtigung**, die **Unterlagenprüfung** und die **Marktdatenrecherche**. Bei der Objektbesichtigung werden Lage, Zustand, Ausstattung und Mängel dokumentiert. Wichtige Unterlagen sind Grundbuchauszug, Baugenehmigung, Grundrisse, Energieausweis und Mietverträge. Die Marktdatenrecherche umfasst Bodenrichtwerte, Vergleichspreise, Mietspiegel und Liegenschaftszinssätze. Eine systematische Datenerhebung verhindert Fehler und erhöht die Belastbarkeit des Gutachtens.`,
    extendedTheory: `**Die Objektbesichtigung: Das Herzstück der Wertermittlung**

Eine gründliche Objektbesichtigung ist unverzichtbar. Der Gutachter muss alle wertrelevanten Merkmale erfassen.

**Checkliste Objektbesichtigung:**

**1. Lage:**
- Mikrolage (Straße, Nachbarschaft, Infrastruktur)
- Makrolage (Stadtteil, Verkehrsanbindung)
- Lärmbelastung (Straße, Bahn, Flughafen)
- Umweltbelastung (Altlasten, Hochwasser)

**2. Grundstück:**
- Größe, Zuschnitt, Topografie
- Erschließung (Straße, Kanal, Strom, Wasser)
- Bepflanzung, Außenanlagen
- Nebengebäude (Garage, Schuppen)

**3. Gebäude:**
- Baujahr, Bauweise, Konstruktion
- Größe (Wohn-/Nutzfläche, Brutto-Grundfläche)
- Ausstattung (Standard, Sonderausstattung)
- Zustand (Instandhaltung, Modernisierung)
- Mängel (Schäden, Reparaturbedarf)

**4. Ausstattung:**
- Heizung, Sanitär, Elektro
- Fenster, Türen, Böden
- Küche, Bad
- Sonderausstattung (Kamin, Sauna, Pool)

**5. Energetischer Zustand:**
- Energieausweis (Bedarfs- oder Verbrauchsausweis)
- Dämmung (Dach, Fassade, Keller)
- Heizungsanlage (Alter, Effizienz)

**Dokumentation:**
- Fotos (außen, innen, Details)
- Skizzen (Grundrisse, Schnitte)
- Notizen (Mängel, Besonderheiten)

**Unterlagenprüfung:**

**Grundbuchauszug:**
- Eigentümer, Grundstücksgröße
- Lasten (Hypotheken, Grundschulden)
- Beschränkungen (Wegerechte, Nießbrauch)

**Baugenehmigung:**
- Genehmigtes Bauvorhaben
- Abweichungen (illegale Anbauten)

**Grundrisse:**
- Raumaufteilung, Flächenberechnung
- Nutzfläche, Wohnfläche

**Energieausweis:**
- Energieverbrauch, Energieeffizienzklasse
- Sanierungsempfehlungen

**Mietverträge:**
- Miethöhe, Mietdauer
- Nebenkosten, Sondervereinbarungen

**Marktdatenrecherche:**

**Bodenrichtwerte:** BORIS-D, Gutachterausschuss

**Vergleichspreise:** Kaufpreissammlung, Immobilienportale

**Mietspiegel:** Qualifizierter Mietspiegel der Kommune

**Liegenschaftszinssätze:** Gutachterausschuss, Immobilienverbände`,
    law: ["§ 2 ImmoWertV (Grundlagen der Wertermittlung)", "§ 4 ImmoWertV (Bodenwert)", "§ 7 ImmoWertV (Marktanpassung)"],
    practice: `Erstellen Sie eine Checkliste für die Objektbesichtigung eines Einfamilienhauses.`,
    task: `Besichtigen Sie eine Immobilie in Ihrer Umgebung und dokumentieren Sie alle wertrelevanten Merkmale.`,
    solution: `Checkliste: Lage, Grundstück, Gebäude, Ausstattung, Energetischer Zustand, Mängel`,
    type: "Grundlagen"
  },

  day_6: {
    title: "Grundlagen Vergleichswertverfahren",
    theory: `Das Vergleichswertverfahren (§§ 15-16 ImmoWertV) ermittelt den Verkehrswert durch Vergleich mit ähnlichen Immobilien. Es wird für eigengenutzte Wohnimmobilien und unbebaute Grundstücke angewendet. Der Vergleichswert wird aus Kaufpreisen von Vergleichsobjekten abgeleitet, die hinsichtlich Lage, Größe, Ausstattung und Zustand ähnlich sind. Unterschiede werden durch Zu- und Abschläge berücksichtigt. Das Verfahren ist marktgerecht, da es auf realen Transaktionen basiert.`,
    extendedTheory: `**Das Vergleichswertverfahren: Marktgerecht und transparent**

**Prinzip:** Der Verkehrswert entspricht dem Preis vergleichbarer Immobilien.

**Voraussetzungen:**
- Ausreichend Vergleichsobjekte (mindestens 3-5)
- Ähnlichkeit (Lage, Größe, Ausstattung, Zustand)
- Aktualität (Verkäufe nicht älter als 1-2 Jahre)

**Ablauf:**
1. Vergleichsobjekte auswählen
2. Vergleichspreise ermitteln
3. Anpassungen vornehmen (Zu-/Abschläge)
4. Verkehrswert ableiten (Mittelwert)

**Vergleichsfaktoren:**
- Lage (Mikro- und Makrolage)
- Größe (Wohn-/Nutzfläche)
- Ausstattung (Standard, Sonderausstattung)
- Zustand (Baujahr, Modernisierung)
- Grundstück (Größe, Zuschnitt)

**Zu- und Abschläge:**
- Bessere Lage: +5-10%
- Größere Wohnfläche: +5%
- Bessere Ausstattung: +5-10%
- Besserer Zustand: +5-15%
- Größeres Grundstück: +5%

**Beispiel:**
Bewertungsobjekt: Einfamilienhaus, 150 m², Baujahr 2000, Hamburg

Vergleichsobjekt A: 140 m², Baujahr 1998, 560.000 € → Anpassung +5% → 4.200 €/m²
Vergleichsobjekt B: 160 m², Baujahr 2002, 720.000 € → Anpassung -5% → 4.275 €/m²
Vergleichsobjekt C: 150 m², Baujahr 2000, 600.000 € → Anpassung +10% → 4.400 €/m²

Verkehrswert: 4.292 €/m² × 150 m² = 643.800 €`,
    law: ["§§ 15-16 ImmoWertV (Vergleichswertverfahren)", "§ 4 ImmoWertV (Bodenwert)"],
    practice: `Ermitteln Sie den Verkehrswert eines Einfamilienhauses mit drei Vergleichsobjekten.`,
    task: `Recherchieren Sie drei Vergleichsobjekte für eine Immobilie in Ihrer Stadt auf ImmoScout24.`,
    solution: `Verkehrswert: 643.800 €`,
    type: "Vergleichswertverfahren"
  },

  day_7: {
    title: "Vergleichsobjekte auswählen & Vergleichspreise ermitteln",
    theory: `Die Auswahl geeigneter Vergleichsobjekte ist entscheidend für die Belastbarkeit des Vergleichswertverfahrens. Vergleichsobjekte müssen hinsichtlich **Lage, Größe, Ausstattung und Zustand** ähnlich sein. Die Vergleichspreise werden aus der Kaufpreissammlung des Gutachterausschusses oder aus Immobilienportalen ermittelt. Wichtig ist die **Aktualität** der Vergleichspreise (nicht älter als 1-2 Jahre). Bei unzureichenden Vergleichsdaten kann das Verfahren nicht angewendet werden.`,
    extendedTheory: `**Vergleichsobjekte finden: Die Kunst der Auswahl**

**Ähnlichkeitskriterien:**
1. **Lage:** Gleicher Stadtteil, ähnliche Infrastruktur
2. **Größe:** ±20% Wohn-/Nutzfläche
3. **Ausstattung:** Gleicher Standard
4. **Zustand:** Ähnliches Baujahr, Modernisierungsstand
5. **Grundstück:** Ähnliche Größe, Zuschnitt

**Datenquellen:**
- Kaufpreissammlung des Gutachterausschusses (beste Quelle)
- Immobilienportale (ImmoScout24, Immowelt)
- Makler-Datenbanken
- Eigene Datenbank (wenn vorhanden)

**Anzahl Vergleichsobjekte:**
- Mindestens 3-5 Objekte
- Bei großer Streuung: mehr Objekte

**Aktualität:**
- Verkäufe nicht älter als 1-2 Jahre
- Bei dynamischen Märkten: nicht älter als 6 Monate

**Vergleichspreise ermitteln:**

**Kaufpreissammlung:**
- Antrag beim Gutachterausschuss
- Kosten: 50-200 € pro Auskunft
- Vorteil: Offizielle Daten, vollständig

**Immobilienportale:**
- ImmoScout24, Immowelt, Immobilienscout
- Kostenlos
- Nachteil: Angebotspreise (nicht Kaufpreise), oft überhöht

**Umrechnung Angebotspreis → Kaufpreis:**
- Angebotspreise sind meist 5-10% höher als Kaufpreise
- Faktor: 0,9-0,95

**Beispiel:**
Angebotspreis: 500.000 €
Kaufpreis: 500.000 € × 0,95 = 475.000 €`,
    law: ["§ 15 ImmoWertV (Vergleichswertverfahren)", "§ 195 BauGB (Kaufpreissammlung)"],
    practice: `Wählen Sie für ein Bewertungsobjekt drei geeignete Vergleichsobjekte aus und ermitteln Sie die Vergleichspreise.`,
    task: `Beantragen Sie beim Gutachterausschuss Ihrer Stadt eine Auskunft über Vergleichspreise.`,
    solution: `Vergleichsobjekt A: 560.000 € | B: 720.000 € | C: 600.000 €`,
    type: "Vergleichswertverfahren"
  },

  day_8: {
    title: "Marktanpassung & Zu-/Abschläge",
    theory: `Vergleichsobjekte sind nie identisch mit dem Bewertungsobjekt. Unterschiede müssen durch **Zu- und Abschläge** berücksichtigt werden. Die Marktanpassung erfolgt für Lage, Größe, Ausstattung, Zustand und Grundstück. Zu- und Abschläge werden in Prozent angegeben und auf den Vergleichspreis angewendet. Die Höhe der Zu-/Abschläge basiert auf Marktkenntnissen und Erfahrung. Eine transparente Dokumentation ist wichtig für die Nachvollziehbarkeit.`,
    extendedTheory: `**Marktanpassung: Die Kunst der Zu- und Abschläge**

**Anpassungsfaktoren:**

**1. Lage (±5-15%):**
- Bessere Lage: +5-10%
- Schlechtere Lage: -5-10%
- Lärmbelastung: -5-10%
- Bessere Infrastruktur: +5%

**2. Größe (±5-10%):**
- Größere Wohnfläche: +5%
- Kleinere Wohnfläche: -5%
- Größeres Grundstück: +5%
- Kleineres Grundstück: -5%

**3. Ausstattung (±5-15%):**
- Bessere Ausstattung: +5-10%
- Schlechtere Ausstattung: -5-10%
- Sonderausstattung: +5-15%

**4. Zustand (±10-20%):**
- Besserer Zustand: +5-15%
- Schlechterer Zustand: -10-20%
- Modernisierung: +10-15%
- Sanierungsbedarf: -15-25%

**5. Grundstück (±5-10%):**
- Besserer Zuschnitt: +5%
- Hanglage: -5-10%
- Ecklage: +5%

**Beispiel:**
Vergleichsobjekt: 560.000 €, 140 m²
Bewertungsobjekt: 150 m²

Anpassungen:
- Größere Wohnfläche: +5%
- Besserer Zustand: +5%
- Schlechtere Lage: -5%

Gesamt: +5%

Angepasster Preis: 560.000 € × 1,05 = 588.000 €
Preis/m²: 588.000 € / 140 m² = 4.200 €/m²`,
    law: ["§ 16 ImmoWertV (Ermittlung des Vergleichswerts)", "§ 7 ImmoWertV (Marktanpassung)"],
    practice: `Passen Sie drei Vergleichsobjekte an das Bewertungsobjekt an und berechnen Sie die angepassten Preise.`,
    task: `Erstellen Sie eine Tabelle mit typischen Zu- und Abschlägen für verschiedene Anpassungsfaktoren.`,
    solution: `Vergleichsobjekt A: 4.200 €/m² | B: 4.275 €/m² | C: 4.400 €/m²`,
    type: "Vergleichswertverfahren"
  },

  day_9: {
    title: "Vergleichswertverfahren für Wohnimmobilien",
    theory: `Das Vergleichswertverfahren ist das Standardverfahren für eigengenutzte Wohnimmobilien (Einfamilienhäuser, Eigentumswohnungen). Der Verkehrswert wird aus Vergleichspreisen ähnlicher Objekte abgeleitet. Wichtig ist die **Vergleichbarkeit** (Lage, Größe, Ausstattung, Zustand). Bei Eigentumswohnungen müssen zusätzlich die **Wohnungslage im Gebäude** (Etage, Ausrichtung) und das **Wohnungseigentum** (Miteigentumsanteil, Hausgeld) berücksichtigt werden.`,
    extendedTheory: `**Vergleichswertverfahren für Einfamilienhäuser:**

**Besonderheiten:**
- Grundstück ist Teil der Immobilie
- Grundstücksgröße beeinflusst den Wert
- Lage ist entscheidend

**Beispiel:**
Bewertungsobjekt: Einfamilienhaus, 150 m², Grundstück 500 m², Hamburg

Vergleichsobjekte:
- A: 140 m², 450 m², 560.000 €
- B: 160 m², 550 m², 720.000 €
- C: 150 m², 500 m², 600.000 €

Anpassungen:
- A: +5% (größer, besseres Grundstück)
- B: -5% (bessere Ausstattung)
- C: +10% (schlechterer Zustand)

Verkehrswert: 643.800 €

**Vergleichswertverfahren für Eigentumswohnungen:**

**Besonderheiten:**
- Wohnungslage im Gebäude (Etage, Ausrichtung)
- Miteigentumsanteil (Anteil am Gemeinschaftseigentum)
- Hausgeld (Betriebskosten, Instandhaltungsrücklage)

**Beispiel:**
Bewertungsobjekt: Eigentumswohnung, 80 m², 3. OG, Berlin

Vergleichsobjekte:
- A: 75 m², 2. OG, 400.000 €
- B: 85 m², 4. OG, 450.000 €
- C: 80 m², 3. OG, 420.000 €

Anpassungen:
- A: +5% (höhere Etage)
- B: -5% (größer)
- C: 0% (identisch)

Verkehrswert: 420.000 €`,
    law: ["§§ 15-16 ImmoWertV (Vergleichswertverfahren)"],
    practice: `Ermitteln Sie den Verkehrswert einer Eigentumswohnung mit drei Vergleichsobjekten.`,
    task: `Recherchieren Sie drei Vergleichsobjekte für eine Eigentumswohnung auf ImmoScout24.`,
    solution: `Verkehrswert: 420.000 €`,
    type: "Vergleichswertverfahren"
  },

  day_10: {
    title: "Vergleichswertverfahren für Grundstücke",
    theory: `Das Vergleichswertverfahren ist das Standardverfahren für unbebaute Grundstücke. Der Verkehrswert wird aus Bodenrichtwerten und Vergleichspreisen abgeleitet. Wichtig sind **Lage, Größe, Zuschnitt, Erschließung** und **Entwicklungszustand** (baureif, Rohbauland, Bauerwartungsland). Bei großen Grundstücken (> 1.000 m²) wird ein Abschlag für die Größe vorgenommen (10-20%).`,
    extendedTheory: `**Grundstücksbewertung: Bodenrichtwerte und Anpassungen**

**Ausgangspunkt:** Bodenrichtwert (BORIS-D, Gutachterausschuss)

**Anpassungsfaktoren:**
1. **Größe:** Große Grundstücke günstiger (€/m²)
2. **Zuschnitt:** Ungünstiger Zuschnitt (schmal, tief) → Abschlag
3. **Lage:** Ecklage (+5%), Hanglage (-10%), Lärmbelastung (-10%)
4. **Erschließung:** Vollständig (+0%), teilweise (-10%), nicht (-30%)
5. **Altlasten:** Kontaminierung (-20-50%)

**Formel:**
Bodenwert = Bodenrichtwert × Grundstücksgröße × Anpassungsfaktoren

**Beispiel:**
Bewertungsobjekt: Grundstück, 1.000 m², baureif, Hamburg

Bodenrichtwert: 500 €/m²
Anpassungen:
- Größe (> 1.000 m²): -10%
- Ecklage: +5%
- Lärmbelastung: -5%

Anpassungsfaktor: 0,9 × 1,05 × 0,95 = 0,897

Bodenwert: 500 €/m² × 1.000 m² × 0,897 = 448.500 €

**Entwicklungszustand:**

**Baureifes Land:** Voll erschlossen → 100%
**Rohbauland:** Teilweise erschlossen → 70%
**Bauerwartungsland:** Nicht erschlossen, aber Bebauung absehbar → 20%
**Ackerland:** Landwirtschaftliche Nutzung → 1%`,
    law: ["§§ 15-16 ImmoWertV (Vergleichswertverfahren)", "§ 4 ImmoWertV (Bodenwert)", "§ 196 BauGB (Bodenrichtwerte)"],
    practice: `Ermitteln Sie den Bodenwert für drei Grundstücke mit unterschiedlichen Anpassungsfaktoren.`,
    task: `Recherchieren Sie auf BORIS-D die Bodenrichtwerte für drei Grundstücke in verschiedenen Lagen.`,
    solution: `Grundstück A: 448.500 € | B: 2.295.000 € | C: 1.056.000 €`,
    type: "Vergleichswertverfahren"
  },

  day_11: {
    title: "Grundlagen Ertragswertverfahren",
    theory: `Das Ertragswertverfahren (§§ 17-20 ImmoWertV) ermittelt den Verkehrswert durch Kapitalisierung der zukünftigen Mieteinnahmen. Es wird für vermietete Immobilien angewendet (Mehrfamilienhäuser, Gewerbeimmobilien). Der Ertragswert setzt sich zusammen aus **Bodenwert** und **Gebäudeertragswert**. Der Bodenwert wird wie im Vergleichswertverfahren ermittelt. Der Gebäudeertragswert wird aus dem Gebäudereinertrag (Reinertrag minus Bodenwertverzinsung) und dem Vervielfältiger berechnet.`,
    extendedTheory: `**Das Ertragswertverfahren: Rendite ist entscheidend**

**Prinzip:** Der Wert einer Immobilie entspricht dem Barwert der zukünftigen Mieteinnahmen.

**Anwendung:**
- Vermietete Mehrfamilienhäuser
- Vermietete Gewerbeimmobilien (Büros, Läden)
- Gemischt genutzte Immobilien

**Vorteile:**
- Renditeorientiert (Investorensicht)
- Objektiv (basiert auf Mieteinnahmen)
- Zukunftsorientiert (kapitalisiert zukünftige Erträge)

**Nachteile:**
- Komplex (viele Berechnungsschritte)
- Annahmen erforderlich (Liegenschaftszinssatz, Restnutzungsdauer)
- Marktferne (berücksichtigt nicht die aktuelle Marktlage)

**Formel:**
Ertragswert = Bodenwert + Gebäudeertragswert

**Ablauf:**
1. Bodenwert ermitteln
2. Rohertrag ermitteln (Jahresnettokaltmiete)
3. Bewirtschaftungskosten abziehen
4. Reinertrag ermitteln
5. Bodenwertverzinsung abziehen
6. Gebäudereinertrag ermitteln
7. Gebäudeertragswert ermitteln (Gebäudereinertrag × Vervielfältiger)
8. Ertragswert ermitteln (Bodenwert + Gebäudeertragswert)

**Beispiel (vereinfacht):**
Mehrfamilienhaus, 10 Wohnungen, Jahresnettokaltmiete: 96.000 €

1. Bodenwert: 400.000 €
2. Rohertrag: 96.000 €
3. Bewirtschaftungskosten: 24.000 € (25%)
4. Reinertrag: 72.000 €
5. Bodenwertverzinsung: 16.000 € (4% von 400.000 €)
6. Gebäudereinertrag: 56.000 €
7. Vervielfältiger: 18,26 (4% Zinssatz, 50 Jahre)
8. Gebäudeertragswert: 1.022.560 €
9. Ertragswert: 1.422.560 €`,
    law: ["§§ 17-20 ImmoWertV (Ertragswertverfahren)", "§ 18 ImmoWertV (Ermittlung des Ertragswerts)", "§ 19 ImmoWertV (Bodenwert)", "§ 20 ImmoWertV (Gebäudeertragswert)"],
    practice: `Ermitteln Sie den Ertragswert eines Mehrfamilienhauses mit 8 Wohnungen.`,
    task: `Recherchieren Sie den Liegenschaftszinssatz für Mehrfamilienhäuser in Ihrer Stadt.`,
    solution: `Ertragswert: 1.422.560 €`,
    type: "Ertragswertverfahren"
  },

  day_12: {
    title: "Rohertrag, Bewirtschaftungskosten, Reinertrag",
    theory: `Der **Rohertrag** ist die Jahresnettokaltmiete (ohne Nebenkosten). Die **Bewirtschaftungskosten** umfassen Verwaltung, Instandhaltung, Mietausfall und Betriebskosten (soweit nicht auf Mieter umlegbar). Der **Reinertrag** ist der Rohertrag minus Bewirtschaftungskosten. Die Bewirtschaftungskosten betragen typischerweise 20-30% des Rohertrags (abhängig von Alter und Zustand der Immobilie).`,
    extendedTheory: `**Rohertrag: Die Basis der Ertragswertermittlung**

**Definition:** Jahresnettokaltmiete (ohne Nebenkosten)

**Ermittlung:**
- Tatsächliche Miete (bei vermieteten Immobilien)
- Marktübliche Miete (bei leerstehenden Immobilien)

**Marktübliche Miete:**
- Mietspiegel der Kommune
- Vergleichsmieten ähnlicher Objekte
- Gutachterausschuss

**Bewirtschaftungskosten: Die versteckten Kosten**

**Komponenten:**
1. **Verwaltungskosten:** 2-4% des Rohertrags (Hausverwaltung)
2. **Instandhaltungskosten:** 8-15% des Rohertrags (Reparaturen, Modernisierung)
3. **Mietausfallwagnis:** 2-4% des Rohertrags (Leerstand, Zahlungsausfall)
4. **Betriebskosten:** Soweit nicht auf Mieter umlegbar (z.B. Grundsteuer)

**Typische Werte:**
- Neubau: 20-25% des Rohertrags
- Altbau: 25-30% des Rohertrags
- Sanierungsbedarf: 30-40% des Rohertrags

**Beispiel:**
Mehrfamilienhaus, 10 Wohnungen, Jahresnettokaltmiete: 96.000 €

Bewirtschaftungskosten:
- Verwaltung: 3% × 96.000 € = 2.880 €
- Instandhaltung: 12% × 96.000 € = 11.520 €
- Mietausfall: 3% × 96.000 € = 2.880 €
- Betriebskosten: 6% × 96.000 € = 5.760 €

Gesamt: 23.040 € (24% des Rohertrags)

Reinertrag: 96.000 € - 23.040 € = 72.960 €

**Reinertrag: Die Nettomieteinnahme**

**Definition:** Rohertrag minus Bewirtschaftungskosten

**Bedeutung:** Der Reinertrag ist die Grundlage für die Kapitalisierung im Ertragswertverfahren.`,
    law: ["§ 18 ImmoWertV (Ermittlung des Ertragswerts)", "§ 20 ImmoWertV (Gebäudeertragswert)"],
    practice: `Berechnen Sie den Reinertrag für ein Mehrfamilienhaus mit verschiedenen Bewirtschaftungskostensätzen.`,
    task: `Recherchieren Sie den Mietspiegel Ihrer Stadt und ermitteln Sie die marktübliche Miete für eine 80 m² Wohnung.`,
    solution: `Reinertrag: 72.960 €`,
    type: "Ertragswertverfahren"
  },

  day_13: {
    title: "Liegenschaftszinssatz & Vervielfältiger",
    theory: `Der **Liegenschaftszinssatz** ist der Zinssatz, mit dem der Verkehrswert einer Immobilie verzinst wird. Er entspricht der Rendite, die ein Investor erwartet. Der Liegenschaftszinssatz wird vom Gutachterausschuss aus Marktdaten ermittelt und beträgt typischerweise 3-6% (abhängig von Lage, Nutzung und Risiko). Der **Vervielfältiger** ist der Faktor, mit dem der Gebäudereinertrag kapitalisiert wird. Er hängt vom Liegenschaftszinssatz und der Restnutzungsdauer ab.`,
    extendedTheory: `**Liegenschaftszinssatz: Die Renditeerwartung des Investors**

**Definition:** Zinssatz, mit dem der Verkehrswert verzinst wird

**Ermittlung:** Gutachterausschuss (aus Marktdaten)

**Typische Werte:**
- Top-Lage (München, Hamburg): 3-4%
- Gute Lage (Großstädte): 4-5%
- Mittlere Lage (Mittelstädte): 5-6%
- Periphere Lage (Kleinstädte): 6-7%

**Einflussfaktoren:**
- Lage (zentral vs. peripher)
- Nutzung (Wohnen vs. Gewerbe)
- Risiko (Leerstand, Mietausfall)
- Marktlage (Angebot, Nachfrage)

**Vervielfältiger: Der Kapitalisierungsfaktor**

**Definition:** Faktor, mit dem der Gebäudereinertrag kapitalisiert wird

**Formel:**
Vervielfältiger = (1 - (1 + i)^-n) / i

Dabei:
- i = Liegenschaftszinssatz
- n = Restnutzungsdauer

**Beispiel:**
Liegenschaftszinssatz: 4%
Restnutzungsdauer: 50 Jahre

Vervielfältiger = (1 - (1,04)^-50) / 0,04 = 18,26

**Interpretation:** Ein Gebäudereinertrag von 56.000 €/Jahr wird mit dem Faktor 18,26 kapitalisiert → Gebäudeertragswert: 1.022.560 €

**Restnutzungsdauer:**

**Definition:** Verbleibende wirtschaftliche Nutzungsdauer

**Ermittlung:**
Restnutzungsdauer = Gesamtnutzungsdauer - Alter

**Gesamtnutzungsdauer (typisch):**
- Massivbau: 60-80 Jahre
- Holzbau: 40-60 Jahre
- Stahlbeton: 80-100 Jahre

**Beispiel:**
Mehrfamilienhaus, Massivbau, Baujahr 1990, Gesamtnutzungsdauer: 80 Jahre

Alter: 2026 - 1990 = 36 Jahre
Restnutzungsdauer: 80 - 36 = 44 Jahre`,
    law: ["§ 20 ImmoWertV (Gebäudeertragswert)", "§ 8 ImmoWertV (Liegenschaftszinssatz)"],
    practice: `Berechnen Sie den Vervielfältiger für verschiedene Liegenschaftszinssätze und Restnutzungsdauern.`,
    task: `Recherchieren Sie beim Gutachterausschuss Ihrer Stadt die Liegenschaftszinssätze für Mehrfamilienhäuser.`,
    solution: `Vervielfältiger: 18,26 (bei 4% Zinssatz, 50 Jahre Restnutzungsdauer)`,
    type: "Ertragswertverfahren"
  },

  day_14: {
    title: "Grundlagen Sachwertverfahren",
    theory: `Das Sachwertverfahren (§§ 21-23 ImmoWertV) ermittelt den Verkehrswert aus der Summe von Bodenwert und Gebäudesachwert. Es wird für Sonderimmobilien angewendet (Hotels, Pflegeheime, Produktionshallen), bei denen keine Vergleichswerte oder Mieten vorliegen. Der Gebäudesachwert wird aus den Herstellungskosten abzüglich Alterswertminderung ermittelt. Der Sachwert wird anschließend durch Marktanpassung (Sachwertfaktor) an die Marktlage angepasst.`,
    extendedTheory: `**Das Sachwertverfahren: Objektiv, aber marktfern**

**Prinzip:** Der Wert einer Immobilie entspricht den Wiederbeschaffungskosten.

**Anwendung:**
- Sonderimmobilien (Hotels, Pflegeheime, Produktionshallen)
- Selbstgenutzte Gewerbeimmobilien
- Immobilien ohne Vergleichswerte und ohne Mieten

**Vorteile:**
- Objektiv (basiert auf Kosten)
- Universell (anwendbar auf alle Immobilien)
- Transparent (nachvollziehbar)

**Nachteile:**
- Marktferne (berücksichtigt nicht die Marktlage)
- Komplex (viele Berechnungsschritte)
- Ungenau (Sachwertfaktor ist Schätzwert)

**Formel:**
Sachwert = Bodenwert + Gebäudesachwert
Verkehrswert = Sachwert × Sachwertfaktor

**Ablauf:**
1. Bodenwert ermitteln
2. Gebäudeherstellungskosten ermitteln
3. Alterswertminderung abziehen
4. Gebäudesachwert ermitteln
5. Sachwert ermitteln (Bodenwert + Gebäudesachwert)
6. Marktanpassung vornehmen (Sachwert × Sachwertfaktor)

**Beispiel (vereinfacht):**
Hotel, 2.000 m² Brutto-Grundfläche, Grundstück 1.000 m², Baujahr 2000

1. Bodenwert: 1.500.000 € (1.500 €/m² × 1.000 m²)
2. Herstellungskosten: 4.000.000 € (2.000 €/m² × 2.000 m²)
3. Alterswertminderung: 1.733.333 € (26 Jahre / 60 Jahre × 4.000.000 €)
4. Gebäudesachwert: 2.266.667 €
5. Sachwert: 3.766.667 €
6. Sachwertfaktor: 0,9
7. Verkehrswert: 3.390.000 €`,
    law: ["§§ 21-23 ImmoWertV (Sachwertverfahren)", "§ 22 ImmoWertV (Ermittlung des Sachwerts)", "§ 23 ImmoWertV (Gebäudesachwert)"],
    practice: `Ermitteln Sie den Sachwert eines Hotels mit 3.000 m² Brutto-Grundfläche.`,
    task: `Recherchieren Sie die Normalherstellungskosten für verschiedene Gebäudetypen (Wohnen, Büro, Hotel).`,
    solution: `Sachwert: 3.766.667 € | Verkehrswert: 3.390.000 €`,
    type: "Ertragswertverfahren"
  },

  day_15: {
    title: "Herstellungskosten, Alterswertminderung, Sachwert",
    theory: `Die **Herstellungskosten** sind die Kosten für die Errichtung eines gleichwertigen Gebäudes. Sie werden aus Normalherstellungskosten (€/m² Brutto-Grundfläche) ermittelt. Die **Alterswertminderung** berücksichtigt den Wertverlust durch Alter und Abnutzung. Sie wird linear (gleichmäßig) oder progressiv (beschleunigt) berechnet. Der **Gebäudesachwert** ist die Differenz aus Herstellungskosten und Alterswertminderung.`,
    extendedTheory: `**Herstellungskosten: Was würde ein Neubau kosten?**

**Definition:** Kosten für die Errichtung eines gleichwertigen Gebäudes

**Ermittlung:**
Herstellungskosten = Normalherstellungskosten × Brutto-Grundfläche

**Normalherstellungskosten (typisch):**
- Einfamilienhaus: 1.500-2.000 €/m²
- Mehrfamilienhaus: 1.800-2.500 €/m²
- Bürogebäude: 2.000-3.000 €/m²
- Hotel: 2.500-4.000 €/m²
- Produktionshalle: 800-1.500 €/m²

**Quelle:** Baupreisindizes, Baukostenverzeichnisse (BKI)

**Brutto-Grundfläche:**
- Definition: Summe aller Grundflächen (inkl. Wände, Treppen, Keller)
- Ermittlung: Nach DIN 277

**Alterswertminderung: Der Wertverlust durch Alter**

**Definition:** Wertverlust durch Alter und Abnutzung

**Lineare Alterswertminderung (Standard):**
Alterswertminderung = (Alter / Gesamtnutzungsdauer) × Herstellungskosten

**Beispiel:**
Herstellungskosten: 4.000.000 €
Alter: 26 Jahre
Gesamtnutzungsdauer: 60 Jahre

Alterswertminderung = (26 / 60) × 4.000.000 € = 1.733.333 €

**Progressive Alterswertminderung:**
Bei schlechtem Zustand oder Sanierungsstau wird die Alterswertminderung erhöht.

**Modernisierung:**
Bei Modernisierung wird die Alterswertminderung reduziert (fiktiv jüngeres Gebäude).

**Gebäudesachwert: Der Zeitwert des Gebäudes**

**Definition:** Herstellungskosten minus Alterswertminderung

**Formel:**
Gebäudesachwert = Herstellungskosten - Alterswertminderung

**Beispiel:**
Herstellungskosten: 4.000.000 €
Alterswertminderung: 1.733.333 €

Gebäudesachwert: 2.266.667 €`,
    law: ["§ 23 ImmoWertV (Gebäudesachwert)", "§ 22 ImmoWertV (Ermittlung des Sachwerts)"],
    practice: `Berechnen Sie den Gebäudesachwert für verschiedene Gebäudetypen mit unterschiedlichem Alter.`,
    task: `Recherchieren Sie die Normalherstellungskosten für ein Mehrfamilienhaus in Ihrer Stadt.`,
    solution: `Gebäudesachwert: 2.266.667 €`,
    type: "Ertragswertverfahren"
  },

  day_16: {
    title: "Marktanpassung & Sachwertfaktor",
    theory: `Der Sachwert berücksichtigt nicht die aktuelle Marktlage. Deshalb wird eine **Marktanpassung** durch den **Sachwertfaktor** vorgenommen. Der Sachwertfaktor wird vom Gutachterausschuss aus Marktdaten ermittelt und beträgt typischerweise 0,8-1,2. Ein Sachwertfaktor < 1,0 bedeutet, dass der Markt unter den Herstellungskosten liegt. Ein Sachwertfaktor > 1,0 bedeutet, dass der Markt über den Herstellungskosten liegt.`,
    extendedTheory: `**Sachwertfaktor: Die Brücke zum Markt**

**Definition:** Faktor, mit dem der Sachwert an die Marktlage angepasst wird

**Ermittlung:** Gutachterausschuss (aus Vergleich Sachwert vs. Verkaufspreis)

**Formel:**
Sachwertfaktor = Verkaufspreis / Sachwert

**Typische Werte:**
- Top-Lage (München, Hamburg): 1,1-1,3 (Markt über Herstellungskosten)
- Gute Lage (Großstädte): 0,9-1,1 (Markt nahe Herstellungskosten)
- Mittlere Lage (Mittelstädte): 0,8-1,0 (Markt unter Herstellungskosten)
- Periphere Lage (Kleinstädte): 0,7-0,9 (Markt deutlich unter Herstellungskosten)

**Interpretation:**
- Sachwertfaktor < 1,0: Markt ist schwach (Überangebot)
- Sachwertfaktor = 1,0: Markt ist ausgeglichen
- Sachwertfaktor > 1,0: Markt ist stark (Nachfrageüberhang)

**Beispiel:**
Sachwert: 3.766.667 €
Sachwertfaktor: 0,9 (mittlere Lage)

Verkehrswert: 3.766.667 € × 0,9 = 3.390.000 €

**Marktanpassung: Warum ist sie notwendig?**

Der Sachwert basiert auf Herstellungskosten, nicht auf Marktpreisen. In schwachen Märkten liegen die Verkaufspreise unter den Herstellungskosten. In starken Märkten liegen sie darüber.

**Beispiel:**
Ein Hotel in München kostet 4 Mio. € im Bau. Der Verkaufspreis liegt bei 5 Mio. € (Sachwertfaktor: 1,25).
Ein Hotel in einer Kleinstadt kostet 4 Mio. € im Bau. Der Verkaufspreis liegt bei 3 Mio. € (Sachwertfaktor: 0,75).`,
    law: ["§ 22 ImmoWertV (Ermittlung des Sachwerts)", "§ 7 ImmoWertV (Marktanpassung)"],
    practice: `Berechnen Sie den Verkehrswert für verschiedene Sachwerte und Sachwertfaktoren.`,
    task: `Recherchieren Sie beim Gutachterausschuss Ihrer Stadt die Sachwertfaktoren für verschiedene Immobilientypen.`,
    solution: `Verkehrswert: 3.390.000 € (Sachwert 3.766.667 € × Sachwertfaktor 0,9)`,
    type: "Praxis"
  },

  day_17: {
    title: "Gutachtenerstellung & Berichtsaufbau",
    theory: `Ein Verkehrswertgutachten muss **vollständig, nachvollziehbar und objektiv** sein. Der Aufbau folgt einem Standardschema: Auftraggeber, Bewertungsobjekt, Wertermittlungsverfahren, Berechnungen, Ergebnis, Anlagen. Wichtig sind **Fotos, Grundrisse, Berechnungen** und **Quellenangaben**. Das Gutachten muss die Anforderungen der ImmoWertV 2021 erfüllen.`,
    extendedTheory: `**Gutachtenerstellung: Struktur und Inhalt**

**Standardaufbau:**

1. **Titelblatt**
   - Auftraggeber
   - Bewertungsobjekt (Adresse)
   - Stichtag
   - Gutachter (Name, Qualifikation)

2. **Auftrag**
   - Auftraggeber, Zweck
   - Stichtag der Bewertung

3. **Objektbeschreibung**
   - Lage (Mikro- und Makrolage)
   - Grundstück (Größe, Zuschnitt, Erschließung)
   - Gebäude (Baujahr, Größe, Ausstattung, Zustand)

4. **Wertermittlung**
   - Verfahrenswahl (Begründung)
   - Berechnungen (detailliert)
   - Ergebnis (Verkehrswert)

5. **Anlagen**
   - Fotos (außen, innen)
   - Grundrisse, Lagepläne
   - Grundbuchauszug
   - Berechnungen

**Qualitätsmerkmale:**
- **Vollständigkeit:** Alle relevanten Informationen
- **Nachvollziehbarkeit:** Transparente Berechnungen
- **Objektivität:** Keine persönlichen Wertungen
- **Aktualität:** Stichtag beachten

**Fotos:**
- Außenansicht (mehrere Perspektiven)
- Innenansicht (Wohnräume, Küche, Bad)
- Details (Mängel, Besonderheiten)

**Grundrisse:**
- Maßstabsgetreu
- Raumbezeichnungen
- Flächenberechnung

**Berechnungen:**
- Detailliert (alle Schritte)
- Nachvollziehbar (Formeln, Quellen)
- Übersichtlich (Tabellen)`,
    law: ["§ 2 ImmoWertV (Grundlagen der Wertermittlung)", "§ 3 ImmoWertV (Wertermittlungsverfahren)"],
    practice: `Erstellen Sie ein Kurzgutachten für ein Einfamilienhaus (5 Seiten).`,
    task: `Analysieren Sie ein Mustergutachten und identifizieren Sie Stärken und Schwächen.`,
    solution: `Gutachten: Vollständig, nachvollziehbar, objektiv`,
    type: "Praxis"
  },

  day_18: {
    title: "Praxisfall Wohnimmobilie (Vergleichswertverfahren)",
    theory: `**Praxisfall:** Bewertung eines Einfamilienhauses in Hamburg mit dem Vergleichswertverfahren. Gegeben: Wohnfläche 150 m², Grundstück 500 m², Baujahr 2000, guter Zustand. Vergleichsobjekte: 3 ähnliche Häuser in der Umgebung. Aufgabe: Verkehrswert ermitteln.`,
    extendedTheory: `**Praxisfall Schritt für Schritt:**

**1. Objektbeschreibung:**
- Lage: Hamburg-Eimsbüttel, Wohngebiet
- Grundstück: 500 m², rechteckig, eben
- Gebäude: Einfamilienhaus, 150 m², Massivbau, Baujahr 2000
- Ausstattung: Standard, guter Zustand
- Besonderheiten: Garage, Garten

**2. Vergleichsobjekte:**
- Objekt A: 140 m², 450 m², Baujahr 1998, 560.000 €
- Objekt B: 160 m², 550 m², Baujahr 2002, 720.000 €
- Objekt C: 150 m², 500 m², Baujahr 2000, 600.000 €

**3. Anpassungen:**
- Objekt A: +5% (größer, besseres Grundstück)
- Objekt B: -5% (bessere Ausstattung)
- Objekt C: +10% (schlechterer Zustand)

**4. Verkehrswert:**
- Objekt A: 4.200 €/m²
- Objekt B: 4.275 €/m²
- Objekt C: 4.400 €/m²
- Mittelwert: 4.292 €/m²
- Verkehrswert: 643.800 €

**5. Plausibilisierung:**
- Sachwertverfahren: 650.000 € (ähnlich)
- Fazit: Verkehrswert plausibel`,
    law: ["§§ 15-16 ImmoWertV (Vergleichswertverfahren)"],
    practice: `Erstellen Sie ein Kurzgutachten für den Praxisfall.`,
    task: `Bewerten Sie ein Einfamilienhaus in Ihrer Umgebung mit dem Vergleichswertverfahren.`,
    solution: `Verkehrswert: 643.800 €`,
    type: "Praxis"
  },

  day_19: {
    title: "Praxisfall Gewerbeimmobilie (Ertragswertverfahren)",
    theory: `**Praxisfall:** Bewertung eines Mehrfamilienhauses in Berlin mit dem Ertragswertverfahren. Gegeben: 10 Wohnungen, 800 m², Grundstück 500 m², Jahresnettokaltmiete 96.000 €. Aufgabe: Ertragswert ermitteln.`,
    extendedTheory: `**Praxisfall Schritt für Schritt:**

**1. Objektbeschreibung:**
- Lage: Berlin-Prenzlauer Berg, Wohngebiet
- Grundstück: 500 m², rechteckig
- Gebäude: Mehrfamilienhaus, 10 Wohnungen, 800 m², Massivbau, Baujahr 1990
- Vermietung: Vollständig vermietet
- Jahresnettokaltmiete: 96.000 €

**2. Bodenwert:**
- Bodenrichtwert: 800 €/m²
- Bodenwert: 400.000 €

**3. Reinertrag:**
- Rohertrag: 96.000 €
- Bewirtschaftungskosten: 24.000 € (25%)
- Reinertrag: 72.000 €

**4. Gebäudeertragswert:**
- Bodenwertverzinsung: 16.000 € (4%)
- Gebäudereinertrag: 56.000 €
- Vervielfältiger: 18,26 (4%, 50 Jahre)
- Gebäudeertragswert: 1.022.560 €

**5. Ertragswert:**
- Ertragswert: 1.422.560 €

**6. Plausibilisierung:**
- Vergleichswertverfahren: 1.400.000 € (ähnlich)
- Fazit: Ertragswert plausibel`,
    law: ["§§ 17-20 ImmoWertV (Ertragswertverfahren)"],
    practice: `Erstellen Sie ein Kurzgutachten für den Praxisfall.`,
    task: `Bewerten Sie ein Mehrfamilienhaus in Ihrer Umgebung mit dem Ertragswertverfahren.`,
    solution: `Ertragswert: 1.422.560 €`,
    type: "Praxis"
  },

  day_20: {
    title: "Praxisfall Neubau (Sachwertverfahren) & Abschluss",
    theory: `**Praxisfall:** Bewertung eines Hotels in München mit dem Sachwertverfahren. Gegeben: 2.000 m² Brutto-Grundfläche, Grundstück 1.000 m², Baujahr 2000. Aufgabe: Sachwert ermitteln.`,
    extendedTheory: `**Praxisfall Schritt für Schritt:**

**1. Objektbeschreibung:**
- Lage: München, Stadtrand
- Grundstück: 1.000 m², rechteckig
- Gebäude: Hotel, 2.000 m², Massivbau, Baujahr 2000
- Nutzung: Selbstgenutzt (Betreiber ist Eigentümer)

**2. Bodenwert:**
- Bodenrichtwert: 1.500 €/m²
- Bodenwert: 1.500.000 €

**3. Gebäudesachwert:**
- Normalherstellungskosten: 2.000 €/m²
- Herstellungskosten: 4.000.000 €
- Alterswertminderung: 1.733.333 € (26 Jahre / 60 Jahre)
- Gebäudesachwert: 2.266.667 €

**4. Sachwert:**
- Sachwert: 3.766.667 €

**5. Marktanpassung:**
- Sachwertfaktor: 0,9
- Verkehrswert: 3.390.000 €

**6. Plausibilisierung:**
- Ertragswertverfahren (fiktive Miete): 3.500.000 € (ähnlich)
- Fazit: Sachwert plausibel

**Abschluss Modul 4:**

**Zusammenfassung:**
- Drei Wertermittlungsverfahren (Vergleichswert, Ertragswert, Sachwert)
- Verfahrenswahl nach Immobilientyp
- Plausibilisierung durch mehrere Verfahren
- Gutachtenerstellung nach ImmoWertV 2021

**Prüfungsvorbereitung:**
- Alle drei Verfahren beherrschen
- Berechnungen üben
- Gutachten erstellen`,
    law: ["§§ 21-23 ImmoWertV (Sachwertverfahren)"],
    practice: `Erstellen Sie ein Kurzgutachten für den Praxisfall.`,
    task: `Erstellen Sie ein Verkehrswertgutachten für eine Immobilie Ihrer Wahl (alle drei Verfahren).`,
    solution: `Verkehrswert: 3.390.000 €`,
    type: "Praxis"
  },

};
