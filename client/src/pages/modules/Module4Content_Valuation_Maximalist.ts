// Maximalist Content for Module 4: Gutachten & Sachverständiger
// Structure matches the requirements: Theory, Law, Practice, Tasks (Array)

export interface ValuationTask {
  question: string;
  solution: string;
}

export interface ValuationDayContent {
  title: string;
  type: string;
  theory: string;
  law: string[];
  practice: string;
  tasks: ValuationTask[];
  solution?: string;
}

export const contentDataModule4Maximalist: Record<string, ValuationDayContent> = {
  // ==================================================================================
  // WOCHE 1: GRUNDLAGEN & MARKT (Tag 1-4)
  // ==================================================================================
  
  day_1: {
    title: "Einführung in das Sachverständigenwesen",
    type: "Theorie",
    theory: `
# Einführung in das Sachverständigenwesen

Das Modul "Gutachten & Sachverständiger" bildet die Königsklasse der Immobilienausbildung. Während der Makler Preise einschätzt, ermittelt der Sachverständige rechtssichere Verkehrswerte.

## 1. Der Verkehrswert (Marktwert)
Der zentrale Begriff der deutschen Immobilienbewertung ist der **Verkehrswert**, der im Baugesetzbuch (BauGB) definiert ist. Er ist identisch mit dem europarechtlichen Begriff des **Marktwerts**.

> **§ 194 BauGB:**
> "Der Verkehrswert (Marktwert) wird durch den Preis bestimmt, der in dem Zeitpunkt, auf den sich die Ermittlung bezieht, im gewöhnlichen Geschäftsverkehr nach den rechtlichen Gegebenheiten und tatsächlichen Eigenschaften, der sonstigen Beschaffenheit und der Lage des Grundstücks oder des sonstigen Gegenstands der Wertermittlung ohne Rücksicht auf ungewöhnliche oder persönliche Verhältnisse zu erzielen wäre."

### Analyse der Definition:
*   **Stichtagsbezug:** Der Wert gilt nur für einen bestimmten Tag (Wertermittlungsstichtag). Märkte ändern sich.
*   **Gewöhnlicher Geschäftsverkehr:** Ein offener Markt, auf dem Angebot und Nachfrage frei agieren können (kein Verkauf unter Zwang, kein Freundschaftspreis).
*   **Rechtliche Gegebenheiten:** Was darf gebaut werden? Welche Lasten stehen im Grundbuch?
*   **Tatsächliche Eigenschaften:** Größe, Zustand, Baujahr.
*   **Ohne Rücksicht auf ungewöhnliche/persönliche Verhältnisse:** Notverkäufe, Liebhaberpreise oder Verkäufe innerhalb der Familie werden ausgeblendet.

## 2. Wert vs. Preis
Es ist essenziell, zwischen **Wert** und **Preis** zu unterscheiden:
*   **Preis:** Das, was tatsächlich gezahlt wird (subjektiv, vergangenheitsbezogen, kann durch Verhandlungsgeschick beeinflusst sein).
*   **Wert:** Das, was das Objekt objektiv wert ist (objektiviert, stichtagsbezogen, Ergebnis einer Schätzung).

*Merksatz:* "Price is what you pay. Value is what you get." (Warren Buffett)

## 3. Bewertungsanlässe
Warum werden Immobilien bewertet?
1.  **Eigentumswechsel:** Kauf/Verkauf, Tausch.
2.  **Finanzierung:** Ermittlung des Beleihungswerts für Banken (Pfandbriefgesetz).
3.  **Familienrecht:** Ehescheidung (Zugewinnausgleich), Erbschaft (Erbauseinandersetzung).
4.  **Steuerliche Zwecke:** Erbschaftssteuer, Grunderwerbsteuer, Entnahme aus dem Betriebsvermögen.
5.  **Versicherung:** Ermittlung des Versicherungswerts (Wiederherstellungskosten).
6.  **Zwangsversteigerung:** Festsetzung des Verkehrswerts durch das Amtsgericht.

## 4. Die Säulen der Wertermittlung
Die Wertermittlung in Deutschland ruht auf drei normierten Verfahren (ImmoWertV):
1.  **Vergleichswertverfahren:** Was kosten ähnliche Objekte? (Ideal für Eigentumswohnungen, unbebaute Grundstücke).
2.  **Ertragswertverfahren:** Welche Rendite bringt das Objekt? (Ideal für Mehrfamilienhäuser, Gewerbe).
3.  **Sachwertverfahren:** Was kostet es, das Objekt heute neu zu bauen? (Ideal für selbstgenutzte Einfamilienhäuser).
    `,
    law: [
      "§ 194 BauGB (Verkehrswertdefinition)",
      "ImmoWertV 2021 (Immobilienwertermittlungsverordnung)",
      "BauGB (Baugesetzbuch) - Besonderes Städtebaurecht"
    ],
    practice: `
# Praxisbeispiel: Preis vs. Wert

**Szenario:**
Ein Reihenmittelhaus in München wird für **850.000 €** verkauft.
Der Gutachter ermittelt einen Verkehrswert von **780.000 €**.

**Analyse der Diskrepanz:**
*   **Marktlage:** In "heißen" Märkten (Verkäufermärkten) liegen die erzielbaren Preise oft über den rechnerischen Werten, da Käufer bereit sind, "Liebhaberaufschläge" zu zahlen, um den Zuschlag zu erhalten.
*   **Persönliche Verhältnisse:** Der Käufer wollte unbedingt in diese Straße, weil seine Eltern nebenan wohnen. Das ist ein "persönliches Verhältnis" im Sinne des § 194 BauGB und darf im Verkehrswert nicht berücksichtigt werden.

**Konsequenz für die Finanzierung:**
Die Bank wird sich am Verkehrswert (bzw. Beleihungswert) von 780.000 € orientieren. Die Differenz von 70.000 € muss der Käufer als zusätzliches Eigenkapital einbringen, da sie nicht werthaltig besichert ist.
    `,
    tasks: [
      {
        question: "Definieren Sie den Begriff 'Verkehrswert' gemäß § 194 BauGB.",
        solution: "Der Verkehrswert (Marktwert) wird durch den Preis bestimmt, der in dem Zeitpunkt, auf den sich die Ermittlung bezieht, im gewöhnlichen Geschäftsverkehr nach den rechtlichen Gegebenheiten und tatsächlichen Eigenschaften, der sonstigen Beschaffenheit und der Lage des Grundstücks oder des sonstigen Gegenstands der Wertermittlung ohne Rücksicht auf ungewöhnliche oder persönliche Verhältnisse zu erzielen wäre."
      },
      {
        question: "Nennen Sie drei typische Anlässe für eine Immobilienbewertung.",
        solution: "1. Kauf/Verkauf (Eigentumswechsel)\n2. Ehescheidung (Zugewinnausgleich)\n3. Beleihung (Finanzierung)\n4. Erbschaft (Steuer/Auseinandersetzung)\n5. Zwangsversteigerung"
      },
      {
        question: "Was ist der Unterschied zwischen 'Preis' und 'Wert'?",
        solution: "**Preis** ist der tatsächlich gezahlte Geldbetrag (Fakt), der durch subjektive Faktoren beeinflusst sein kann.\n**Wert** ist eine objektivierte Schätzung des Tauschwerts am Markt unter Ausblendung persönlicher Verhältnisse."
      },
      {
        question: "Welches Wertermittlungsverfahren eignet sich am besten für eine vermietete Eigentumswohnung?",
        solution: "Grundsätzlich das **Ertragswertverfahren** (da Renditeobjekt) oder das **Vergleichswertverfahren** (wenn genügend Vergleichspreise vorhanden sind). In der Praxis bei ETW oft Vergleichswertverfahren priorisiert."
      }
    ]
  },

  day_2: {
    title: "Rechtliche Grundlagen & Flächenberechnung",
    type: "Recht",
    theory: `
# Rechtliche Grundlagen der Bewertung

Die Wertermittlung ist in Deutschland streng reguliert. Die Hierarchie der Normen ist entscheidend für die Rechtssicherheit eines Gutachtens.

## 1. Die Normen-Hierarchie
1.  **Gesetz:** Baugesetzbuch (BauGB) - Höchste Stufe.
2.  **Verordnung:** Immobilienwertermittlungsverordnung (ImmoWertV 2021) - Verbindlich für Gutachterausschüsse und Behörden, faktisch Standard für alle.
3.  **Richtlinien:** Muster-Verwaltungsvorschriften (ImmoWertA - Anwendungsrichtlinien) - Dienen der Auslegung und Vereinheitlichung.

## 2. Flächenberechnungen
Ein falsches Flächenmaß ist der häufigste Haftungsgrund für Makler und Gutachter!

### A) Wohnfläche (WoFlV)
*   Gilt für öffentlich geförderten Wohnraum, ist aber "Verkehrssitte" für den freien Wohnungsmarkt.
*   **Grundregel:** Lichte Höhe > 2m = 100%, 1m-2m = 50%, < 1m = 0%.
*   **Balkone/Terrassen:** In der Regel 25%, maximal 50% (bei besonderer Qualität).
*   **Nicht anrechenbar:** Keller, Garagen, Heizungsräume.

### B) DIN 277 (Grundflächen und Rauminhalte)
*   Technischer Ansatz, wird oft für Gewerbeimmobilien oder Baukostenermittlung genutzt.
*   Unterscheidet:
    *   NUF (Nutzungsfläche)
    *   VF (Verkehrsfläche)
    *   TF (Technikfläche)
*   Keine Abzüge für Dachschrägen! (Daher ist DIN-Fläche im DG oft größer als WoFlV-Fläche).

## 3. Das Grundbuch in der Bewertung
Lasten in Abteilung II beeinflussen den Wert massiv:
*   **Wohnungsrecht:** Mindert den Wert, da die Immobilie nicht vermietet werden kann.
*   **Nießbrauch:** Mindert den Wert extrem (Nutzer zieht alle Früchte).
*   **Grunddienstbarkeiten:** Wegerechte, Leitungsrechte können die Bebaubarkeit einschränken.

*Wichtig:* Hypotheken/Grundschulden (Abt. III) mindern den *Verkehrswert* nicht! Sie werden aus dem Kaufpreis abgelöst. Der Verkehrswert wird immer "lastenfrei in Abt. III" ermittelt.
    `,
    law: [
      "Wohnflächenverordnung (WoFlV)",
      "DIN 277 (Grundflächen und Rauminhalte im Hochbau)",
      "Baunutzungsverordnung (BauNVO) - Art der baulichen Nutzung"
    ],
    practice: `
# Praxis: Flächenberechnung Dachgeschoss

**Situation:**
Sie bewerten ein Dachstudio.
*   Grundfläche des Raumes: 40 m².
*   Davon Bereich mit Höhe > 2m: 20 m².
*   Davon Bereich mit Höhe 1m - 2m: 10 m².
*   Davon Bereich mit Höhe < 1m: 10 m².
*   Dachterrasse: 10 m² (Standardwert).

**Berechnung nach WoFlV:**
1.  Bereich > 2m: 20 m² × 100% = **20 m²**
2.  Bereich 1-2m: 10 m² × 50% = **5 m²**
3.  Bereich < 1m: 10 m² × 0% = **0 m²**
4.  Terrasse: 10 m² × 25% = **2,5 m²**

**Gesamtwohnfläche:** 20 + 5 + 0 + 2,5 = **27,5 m²**

*Fehlerquelle:* Würde man die Grundfläche (40 m² + 10 m² = 50 m²) im Exposé angeben, wäre das eine Täuschung über ca. 45%!
    `,
    tasks: [
      {
        question: "Wie wird ein Balkon bei der Wohnflächenberechnung nach WoFlV angesetzt?",
        solution: "In der Regel mit **25%** seiner Grundfläche. Nur bei besonderem Wohnwert (z.B. aufwendige Gestaltung, Südlage, Überdachung) können bis zu **50%** angesetzt werden."
      },
      {
        question: "Mindern Grundschulden in Abteilung III des Grundbuchs den Verkehrswert?",
        solution: "**Nein.** Der Verkehrswert wird lastenfrei bezüglich Abteilung III ermittelt. Die Schulden sind eine persönliche Verpflichtung des Eigentümers und werden beim Verkauf vom Kaufpreis getilgt."
      },
      {
        question: "Ein Raum hat eine Grundfläche von 20 m², ist aber komplett nur 1,80 m hoch (Hobbyraum im Keller). Zählt er zur Wohnfläche nach WoFlV?",
        solution: "Nein. Räume, die nicht den Anforderungen des Baurechts an Aufenthaltsräume genügen (oft im Keller mangels Belichtung/Höhe), zählen **nicht** zur Wohnfläche, sondern zur Nutzfläche (Zubehörräume)."
      },
      {
        question: "Was ist der Unterschied zwischen ImmoWertV und WertR?",
        solution: "Die **ImmoWertV** ist eine Rechtsverordnung und damit rechtlich verbindlich. Die **WertR** (Wertermittlungsrichtlinie) ist eine Verwaltungsvorschrift, die die Anwendung der Verordnung konkretisiert, aber rechtlich unter der Verordnung steht."
      }
    ]
  },

  day_3: {
    title: "Marktanalyse & Makro-Standort",
    type: "Analyse",
    theory: `
# Marktanalyse und Standortfaktoren

Der Wert einer Immobilie ist untrennbar mit ihrem Standort verbunden ("Lage, Lage, Lage").

## 1. Makrostandort vs. Mikrostandort
*   **Makrostandort:** Die Region/Stadt als Ganzes. (Wirtschaftskraft, Bevölkerungswachstum, Infrastruktur, Kaufkraft). Ist die Stadt ein "Zuzugsgebiet" oder "Abwanderungsgebiet"?
*   **Mikrostandort:** Die konkrete Nachbarschaft. (Lärmimmissionen, Nähe zu Schulen/ÖPNV, Sozialstruktur, Ausrichtung des Grundstücks).

## 2. Bodenrichtwerte (BRW)
Der wichtigste Indikator für den Bodenwert.
*   Werden von den Gutachterausschüssen (GAA) alle 2 Jahre veröffentlicht.
*   Basieren auf der Kaufpreissammlung (echte Notarverträge).
*   Geben den durchschnittlichen Lagewert für ein "Richtwertgrundstück" an.

*Wichtig:* Der BRW ist ein Durchschnittswert! Das konkrete Grundstück kann davon abweichen (Ecklage, Schnitt, Größe).

## 3. Liegenschaftszinssatz (LZ)
Der "Zins", mit dem der Markt Immobilienvermögen verzinst.
*   Niedriger LZ (z.B. 1,5%) = Hoher Kaufpreis (Top-Lage, München).
*   Hoher LZ (z.B. 6,0%) = Niedriger Kaufpreis (Risikolage, ländlicher Raum).
*   Er wird empirisch aus Kaufpreisen abgeleitet.

## 4. Marktanpassungsfaktoren
Faktoren, die den Sachwert an die Marktlage anpassen. Wenn Bauen 500.000 € kostet, der Markt aber nur 400.000 € zahlt, ist der Faktor 0,8.
    `,
    law: [
      "§ 196 BauGB (Bodenrichtwerte)",
      "§ 193 Abs. 5 BauGB (Kaufpreissammlung)",
      "ImmoWertV § 14 (Marktanpassungsfaktoren)"
    ],
    practice: `
# Praxis: Bodenrichtwertkarte lesen

**Szenario:**
Sie bewerten ein Grundstück in Köln.
*   **BRW-Karte:** Ausgewiesen sind 600 €/m².
*   **WGFZ (Wertrelevante Geschossflächenzahl):** 1,0 (Das Richtwertgrundstück darf 1,0 m² Wohnfläche pro 1 m² Grund haben).
*   **Ihr Grundstück:** Hat eine zulässige GFZ von 1,2 (Sie dürfen mehr bauen).

**Analyse:**
Da Sie mehr bauen dürfen als das Referenzgrundstück, ist Ihr Boden mehr wert als 600 €/m².
Es erfolgt eine **Umrechnung** (meist mit Umrechnungskoeffizienten des Gutachterausschusses).
*Faustformel:* Mehr Baurecht = Höherer Bodenwert.

**Recherche:**
Nutzen Sie BORIS-D (Bodenrichtwertinformationssystem Deutschland) für die Recherche.
    `,
    tasks: [
      {
        question: "Was ist der Unterschied zwischen Makro- und Mikrolage?",
        solution: "**Makrolage** beschreibt das großräumige Umfeld (Stadt, Region, Wirtschaftskraft). **Mikrolage** beschreibt das direkte Umfeld (Straße, Nachbarschaft, Lärm, Ausrichtung)."
      },
      {
        question: "Woher bekommt man Bodenrichtwerte?",
        solution: "Vom lokalen Gutachterausschuss (GAA) oder über Online-Portale wie BORIS-D (Bodenrichtwertinformationssystem Deutschland)."
      },
      {
        question: "Was bedeutet ein Liegenschaftszinssatz von 1,5%?",
        solution: "Das deutet auf eine sehr begehrte, teure Lage hin (hohe Kaufpreise im Verhältnis zur Miete). Investoren akzeptieren eine geringe Rendite für hohe Sicherheit/Wertsteigerungschance."
      },
      {
        question: "Ist der Bodenrichtwert für jedes Grundstück bindend?",
        solution: "Nein. Er ist ein Orientierungswert für ein fiktives Richtwertgrundstück. Weicht das Bewertungsobjekt davon ab (z.B. Größe, Zuschnitt, Baurecht), müssen Zu- oder Abschläge vorgenommen werden."
      }
    ]
  },

  day_4: {
    title: "Vergleichswertverfahren",
    type: "Berechnung",
    theory: `
# Das Vergleichswertverfahren (§ 15 ImmoWertV)

Das direkteste und marktnahste Verfahren.
Die Frage lautet: "Was haben andere für so etwas bezahlt?"

## 1. Anwendungsbereich
*   Unbebaute Grundstücke (Bodenwert).
*   Eigentumswohnungen (hier gibt es viele vergleichbare Objekte).
*   Reihenhäuser in Siedlungen.

## 2. Direkter vs. Indirekter Vergleich
*   **Direkter Vergleich:** Sie haben Kaufpreise von identischen Nachbarhäusern (Idealfall, aber selten).
*   **Indirekter Vergleich:** Sie nutzen statistische Durchschnittswerte (Vergleichsfaktoren) des Gutachterausschusses (z.B. "ETW aus 1990 kosten im Schnitt 3.500 €/m²").

## 3. Anpassung (Indexierung)
Kaufpreise sind vergangenheitsbezogen.
*   Kaufpreis A war vor 2 Jahren.
*   Seitdem sind Preise um 10% gestiegen.
*   Kaufpreis A muss um +10% angepasst werden, um vergleichbar zu sein.

## 4. Umrechnungskoeffizienten
Wenn Vergleichsobjekte nicht ganz passen:
*   Vergleichsobjekt ist größer -> Preis pro m² sinkt meist (Mengenrabatt-Effekt).
*   Vergleichsobjekt ist neuer -> Preis steigt.
Hierfür gibt es Tabellen zur Umrechnung.
    `,
    law: [
      "§ 15 ImmoWertV (Vergleichswertverfahren)",
      "Vergleichswertrichtlinie (VW-RL)"
    ],
    practice: `
# Rechenübung: Vergleichswertverfahren

**Objekt:** Eigentumswohnung, 80 m², Baujahr 2000, 1. OG.

**Vergleichspreise (bereinigt):**
1.  Wohnung A (Nachbarhaus): 3.800 €/m².
2.  Wohnung B (gleiche Anlage): 4.000 €/m².
3.  Wohnung C (ähnliche Lage): 3.900 €/m².

**Schritt 1: Mittelwertbildung**
(3.800 + 4.000 + 3.900) / 3 = **3.900 €/m²**.

**Schritt 2: Objektspezifische Anpassung**
Unser Objekt hat einen sanierten Balkon (+5%) und ein neues Bad (+10.000 €).
Aber: Es liegt an einer lauten Straße (-10%).

*Rechnung:*
Basiswert: 80 m² * 3.900 €/m² = 312.000 €.
+ Balkon (+5%): + 15.600 €.
- Lage (-10%): - 31.200 €.
+ Bad (Pauschal): + 10.000 €.

**Verkehrswert:** 312.000 + 15.600 - 31.200 + 10.000 = **306.400 €**.
    `,
    tasks: [
      {
        question: "Für welche Immobilienart ist das Vergleichswertverfahren am besten geeignet?",
        solution: "Für **Eigentumswohnungen** und **unbebaute Grundstücke**, da hier meist eine ausreichende Anzahl an vergleichbaren Kauffällen vorliegt."
      },
      {
        question: "Was tun Sie, wenn Sie keine direkten Vergleichskaufpreise finden?",
        solution: "Man greift auf **Vergleichsfaktoren** der Gutachterausschüsse zurück (statistische Durchschnittswerte, z.B. €/m² Wohnfläche für bestimmte Baujahresklassen) oder wählt ein anderes Verfahren (Sachwert/Ertragswert), wenn zulässig."
      },
      {
        question: "Warum sinkt der Quadratmeterpreis oft mit steigender Wohnungsgröße?",
        solution: "Wegen des degressiven Verlaufs der Preise. Fixkosten (Bad, Heizung, Erschließung) verteilen sich auf mehr Fläche. Zudem ist die Nachfrage nach riesigen Wohnungen oft kleiner als nach Standardgrößen."
      },
      {
        question: "Wie berücksichtigen Sie unterschiedliche Kaufzeitpunkte bei Vergleichsobjekten?",
        solution: "Durch **Indexierung** mithilfe von Preisindizes (z.B. Immobilienpreisindex des Gutachterausschusses). Ein Kaufpreis von vor 2 Jahren wird auf das heutige Preisniveau hoch- oder runtergerechnet."
      },
      {
        question: `Vollständige Vergleichswertberechnung — Hamburg Eimsbüttel:\nETW 68m², BJ 1995, 2.OG, Balkon, kein Aufzug.\nVergleichsobjekte: A=4.200€/m² (kein Balkon, kein Aufzug, 2.OG) | B=4.600€/m² (Balkon, Aufzug, 3.OG) | C=4.000€/m² (kein Balkon, kein Aufzug, 1.OG)\nFaktoren: Balkon +2%, Aufzug +1,5%, OG ±0,5%/OG. Berechnen Sie den Verkehrswert.`,
        solution: `Obj.A→ +2% Balkon = 4.284 €/m²\nObj.B→ -2% Balkon, -1,5% Aufzug, +0,5% OG = 4.462 €/m²\nObj.C→ +2% Balkon, -0,5% OG = 4.060 €/m²\nMittelwert: (4.284+4.462+4.060)/3 = 4.269 €/m²\nVerkehrswert: 4.269 × 68 = 290.292 € → gerundet **290.000 €**`
      },
      {
        question: `Indexanpassung — Leipzig Gohlis 2024:\nVergleichskauf 2022: 2.800€/m², 75m² ETW.\nIndex Leipzig ETW: 2022=118, 2024=112.\nLagezuschlag Gohlis vs. Vergleichsobjekt: +8%.\nBerechnen Sie den aktuellen Verkehrswert.`,
        solution: `Indexfaktor: 112/118 = 0,9492\n2.800 × 0,9492 = 2.658 €/m²\n× Lagezuschlag 1,08 = 2.870 €/m²\n× 75m² = 215.250 € → gerundet **215.000 €**\n\nHinweis: Ostdeutsche Großstädte (Leipzig, Dresden, Erfurt) zeigen seit 2023 leichte Marktkorrekturen nach den Boomjahren 2019-2022.`
      },
      {
        question: `Vollständige Vergleichswertberechnung — Hamburg Eimsbüttel:\nETW 68m², BJ 1995, 2.OG, Balkon, kein Aufzug.\nVergleichsobjekte: A=4.200€/m² (kein Balkon, kein Aufzug, 2.OG) | B=4.600€/m² (Balkon, Aufzug, 3.OG) | C=4.000€/m² (kein Balkon, kein Aufzug, 1.OG)\nFaktoren: Balkon +2%, Aufzug +1,5%, OG ±0,5%/OG. Berechnen Sie den Verkehrswert.`,
        solution: `Obj.A→ +2% Balkon = 4.284 €/m²\nObj.B→ -2% Balkon, -1,5% Aufzug, +0,5% OG = 4.462 €/m²\nObj.C→ +2% Balkon, -0,5% OG = 4.060 €/m²\nMittelwert: (4.284+4.462+4.060)/3 = 4.269 €/m²\nVerkehrswert: 4.269 × 68 = 290.292 € → gerundet **290.000 €**`
      },
      {
        question: `Indexanpassung — Leipzig Gohlis 2024:\nVergleichskauf 2022: 2.800€/m², 75m² ETW.\nIndex Leipzig ETW: 2022=118, 2024=112.\nLagezuschlag Gohlis vs. Vergleichsobjekt: +8%.\nBerechnen Sie den aktuellen Verkehrswert.`,
        solution: `Indexfaktor: 112/118 = 0,9492\n2.800 × 0,9492 = 2.658 €/m²\n× Lagezuschlag 1,08 = 2.870 €/m²\n× 75m² = 215.250 € → gerundet **215.000 €**\n\nHinweis: Ostdeutsche Großstädte (Leipzig, Dresden, Erfurt) zeigen seit 2023 leichte Marktkorrekturen nach den Boomjahren 2019-2022.`
      }
    ]
  },

  // ==================================================================================
  // WOCHE 2: ERTRAGSWERTVERFAHREN (Tag 5-10)
  // ==================================================================================

  day_5: {
    title: "Ertragswertverfahren: Rohertrag & Bewirtschaftungskosten",
    type: "Berechnung",
    theory: `
# Das Ertragswertverfahren (§ 17 ImmoWertV) - Teil 1

Das Investoren-Verfahren. Die Frage lautet: "Wie viel Gewinn bringt die Immobilie?"
Basis ist nicht der Stein (Substanz), sondern der Mietvertrag (Ertrag).

## 1. Der Rohertrag
Die marktüblich erzielbare Jahresnettokaltmiete.
*   *Achtung:* Nicht blind die aktuelle Miete nehmen!
*   Ist die Miete zu niedrig (Oma wohnt seit 40 Jahren dort)? -> Anpassen an Marktmiete (Over-rented / Under-rented Problematik).
*   Ist die Miete Wucher? -> Kappen auf Marktmiete.

## 2. Bewirtschaftungskosten (BWK)
Kosten, die nicht auf den Mieter umgelegt werden können.
1.  **Verwaltungskosten:** Pauschale pro Einheit (z.B. 300 €/Jahr).
2.  **Instandhaltungskosten:** Pauschale pro m² (z.B. 12 €/m² je nach Baujahr).
3.  **Mietausfallwagnis:** Risiko des Leerstands (z.B. 2% vom Rohertrag).
4.  **Betriebskosten:** Nur die nicht umlagefähigen (Leerstandskosten).

## 3. Reinertrag
Rohertrag - Bewirtschaftungskosten = **Reinertrag des Grundstücks**.
Das ist das Geld, das am Ende des Jahres in der Tasche des Eigentümers bleibt (vor Steuer/Finanzierung).
    `,
    law: [
      "§ 17 ImmoWertV (Ertragswertverfahren)",
      "§ 18 ImmoWertV (Rohertrag)",
      "§ 19 ImmoWertV (Bewirtschaftungskosten)"
    ],
    practice: `
# Rechenübung: Reinertrag ermitteln

**Objekt:** Mehrfamilienhaus (MFH), 500 m² Wohnfläche, 6 Einheiten.
**Miete:** 10 €/m² monatlich (marktüblich).

**1. Rohertrag:**
500 m² × 10 € × 12 Monate = **60.000 € / Jahr**.

**2. Bewirtschaftungskosten (BWK):**
*   *Verwaltung:* 6 Einheiten × 300 € = 1.800 €.
*   *Instandhaltung:* 500 m² × 12 € = 6.000 €.
*   *Mietausfallwagnis:* 2% von 60.000 € = 1.200 €.
*   *Summe BWK:* **9.000 €**.

**3. Reinertrag:**
60.000 € (Rohertrag) - 9.000 € (BWK) = **51.000 €**.

*Interpretation:* Das Haus erwirtschaftet operativ 51.000 € pro Jahr. Dieser Betrag ist die Basis für die weitere Wertermittlung.
    `,
    tasks: [
      {
        question: "Warum darf man nicht einfach die aktuelle Miete für den Ertragswert nehmen?",
        solution: "Weil der Verkehrswert objektiv sein muss. Eine Gefälligkeitsmiete (zu niedrig) oder eine Wuchermiete (zu hoch) würde das Ergebnis verfälschen. Es gilt die **marktüblich erzielbare Miete**."
      },
      {
        question: "Zählen die Heizkosten zum Rohertrag?",
        solution: "Nein. Der Rohertrag ist immer die **Nettokaltmiete**. Heiz- und Nebenkosten sind durchlaufende Posten."
      },
      {
        question: "Was ist das Mietausfallwagnis?",
        solution: "Ein kalkulatorischer Abzug (meist 2-4% des Rohertrags), der das Risiko abdeckt, dass Mieten zeitweise ausfallen oder Wohnungen leerstehen. Es mindert den Ertragswert."
      },
      {
        question: "Sind Instandhaltungskosten umlagefähig auf den Mieter?",
        solution: "Nein, Instandhaltung ist Sache des Eigentümers (Vermieters) und mindert daher den Reinertrag."
      }
    ]
  },

  day_6: {
    title: "Ertragswertverfahren: Bodenwertverzinsung & Vervielfältiger",
    type: "Berechnung",
    theory: `
# Das Ertragswertverfahren - Teil 2 (Die Kür)

Wir haben den Reinertrag (51.000 €). Dieser Ertrag kommt aus zwei Quellen: Dem Boden und dem Gebäude.
Da der Boden ewig hält, das Gebäude aber nicht, müssen wir den Anteil des Bodens abziehen.

## 1. Bodenwertverzinsung
*   Bodenwert (aus Vergleichswert/BRW) × Liegenschaftszins = **Bodenwertanteil**.
*   *Logik:* Das ist das Geld, das der Boden "verdient", nur weil er da ist.

## 2. Gebäudereinertrag
Reinertrag (Gesamt) - Bodenwertanteil = **Gebäudereinertrag**.
Das ist das Geld, das rein durch das Bauwerk erwirtschaftet wird.

## 3. Vervielfältiger (Barwertfaktor)
Das Gebäude hat eine Restnutzungsdauer (RND). Wir müssen die zukünftigen Erträge "abzinsen" auf heute.
*   Faktor aus Tabelle (abhängig von RND und Liegenschaftszins).
*   *Formel:* (q^n - 1) / (q^n * i). (Muss man nicht können, Tabelle nutzen!).

## 4. Ertragswert der baulichen Anlagen
Gebäudereinertrag × Vervielfältiger = **Ertragswert Gebäude**.

## 5. Vorläufiger Ertragswert
Ertragswert Gebäude + Bodenwert = **Vorläufiger Ertragswert**.
    `,
    law: [
      "§ 20 ImmoWertV (Reinertrag)",
      "Anlage 1 ImmoWertV (Vervielfältigertabelle)"
    ],
    practice: `
# Rechenübung: Ertragswert komplett

**Daten aus Tag 5:** Reinertrag = 51.000 €.
**Zusatzdaten:**
*   Bodenwert: 400.000 €.
*   Liegenschaftszins: 5,0%.
*   Restnutzungsdauer (RND): 30 Jahre.
*   Vervielfältiger (bei 30 J, 5%): **15,37** (aus Tabelle).

**Rechnung:**
1.  **Bodenwertanteil:**
    400.000 € × 5,0% = **20.000 €**.

2.  **Gebäudereinertrag:**
    51.000 € (Gesamt) - 20.000 € (Boden) = **31.000 €**.

3.  **Ertragswert Gebäude:**
    31.000 € × 15,37 (Faktor) = **476.470 €**.

4.  **Vorläufiger Ertragswert:**
    476.470 € (Gebäude) + 400.000 € (Boden) = **876.470 €**.

*Ergebnis:* Der Ertragswert der Immobilie beträgt ca. 876.000 €.
    `,
    tasks: [
      {
        question: "Warum zieht man die Bodenwertverzinsung ab?",
        solution: "Um den Ertraganteil zu isolieren, der nur vom Gebäude kommt. Nur das Gebäude ist vergänglich (nutzungsdauerbeschränkt) und muss daher mit dem Vervielfältiger kapitalisiert werden. Der Bodenwert wird am Ende separat wieder addiert."
      },
      {
        question: "Was passiert mit dem Ertragswert, wenn der Liegenschaftszins steigt?",
        solution: "Der Ertragswert **sinkt**. Ein hoher Zins bedeutet, dass Investoren mehr Rendite für ihr Risiko wollen -> der Kaufpreis muss niedriger sein. (Mathematisch: Der Vervielfältiger wird kleiner)."
      },
      {
        question: "Was ist der Vervielfältiger?",
        solution: "Ein mathematischer Faktor (Barwertfaktor), der aus der Restnutzungsdauer und dem Liegenschaftszins gebildet wird. Er kapitalisiert die jährlichen Reinerträge zu einem Barwert (Kapitalwert)."
      },
      {
        question: "Wann ist das Ertragswertverfahren NICHT geeignet?",
        solution: "Bei selbstgenutzten Einfamilienhäusern ohne Renditeabsicht. Hier steht der Sachwert (Substanz) im Vordergrund."
      }
    ]
  },

  day_7: {
    title: "Ertragswert: Sonderfälle & Übungen",
    type: "Übung",
    theory: `
# Sonderfälle im Ertragswertverfahren

Nicht immer läuft alles nach Schema F.

## 1. Over-rented / Under-rented
*   **Under-rented:** Aktuelle Miete < Marktmiete.
    *   Wir rechnen mit Marktmiete.
    *   Aber: Der Käufer hat in den ersten Jahren weniger Einnahmen (bis er erhöhen kann).
    *   *Lösung:* Der Barwert des Mietausfalls wird abgezogen (boG).
*   **Over-rented:** Aktuelle Miete > Marktmiete.
    *   Wir rechnen mit Marktmiete.
    *   Der Mehrertrag ist unsicher (Mieter könnte kündigen). Wird oft als temporärer Vorteil addiert, aber mit hohem Risikoabschlag.

## 2. Leerstand
Ein struktureller Leerstand (niemand will dort wohnen) fließt in den Rohertrag ein (niedrigere Marktmiete) oder erhöht das Mietausfallwagnis.

## 3. Verkürzte Restnutzungsdauer
Ist das Gebäude "abgewohnt", kann die wirtschaftliche RND kürzer sein als die technische.
    `,
    law: [
      "§ 8 Abs. 3 ImmoWertV (Berücksichtigung abweichender Erträge)"
    ],
    practice: `
# Fallstudie: Das "billige" Mietshaus

Ein MFH hat Mieteinnahmen von 30.000 €. Marktüblich wären 50.000 €.
Die Mieter haben alte Verträge mit Kündigungsschutz.

**Bewertungsansatz:**
1.  Ertragswert auf Basis von 50.000 € (Marktmiete) berechnen -> z.B. 1.000.000 €.
2.  Mietnachteil berechnen: 20.000 € fehlen pro Jahr.
3.  Wie lange dauert es, die Miete anzupassen? (z.B. 10 Jahre realistisch).
4.  Barwert des Nachteils: 20.000 € über 10 Jahre abzinsen -> ca. 150.000 € Abzug.
5.  Verkehrswert: 850.000 €.

*Fehler:* Wer nur mit 30.000 € rechnet, bewertet das Potenzial falsch. Wer mit 50.000 € rechnet, ignoriert das rechtliche Hindernis.
    `,
    tasks: [
      {
        question: "Was bedeutet 'Under-rented'?",
        solution: "Die tatsächliche Miete liegt unter der marktüblichen Miete. Das Objekt hat Mietsteigerungspotenzial."
      },
      {
        question: "Wie behandeln Sie einen dauerhaften Leerstand in einer Schrumpfungsregion?",
        solution: "Ansatz einer niedrigeren Marktmiete, Erhöhung des Mietausfallwagnisses (z.B. auf 10%) oder im Extremfall Liquidationwert (Abrisskosten abziehen)."
      },
      {
        question: "Kann die Restnutzungsdauer verlängert werden?",
        solution: "Ja, durch Modernisierungen (Kernsanierung). Man spricht von einer 'modifizierten Restnutzungsdauer'."
      },
      {
        question: "Warum ist der Liegenschaftszins bei Gewerbeimmobilien meist höher als bei Wohnimmobilien?",
        solution: "Weil das Risiko bei Gewerbe höher ist (höheres Leerstandsrisiko, speziellere Drittverwendungsfähigkeit). Höheres Risiko = Höhere Renditeerwartung = Höherer Zins = Niedrigerer Vervielfältiger."
      }
    ]
  },

  day_8: {
    title: "Wiederholung & Zwischentest (Verfahren)",
    type: "Quiz",
    theory: `
# Konsolidierung Woche 1 & 2

Wir haben die drei großen Verfahren kennengelernt. Heute verfestigen wir das Wissen.

## Übersicht
| Verfahren | Basis | Zielobjekte | Fokus |
| :--- | :--- | :--- | :--- |
| **Vergleichswert** | Kaufpreise | ETW, Boden, RH | Marktgeschehen |
| **Ertragswert** | Mieten | MFH, Gewerbe | Rendite |
| **Sachwert** | Baukosten | EFH, ZFH | Substanz |

## Die "Gretchenfrage" der Verfahrenswahl
Oft sind mehrere Verfahren möglich.
*   Bei einem EFH kann man Sachwert UND Vergleichswert machen.
*   Das Ergebnis sollte ähnlich sein. Wenn nicht -> Fehleranalyse!
*   Das verfahrensgeprägte Ergebnis (Marktanpassung) ist entscheidend.
    `,
    law: [
      "§ 8 ImmoWertV (Verfahrenswahl)"
    ],
    practice: `
# Analyseübung: Welches Verfahren?

Entscheiden Sie für folgende Objekte:
1.  **Leeres Baugrundstück:** Vergleichswert (Bodenrichtwert).
2.  **Eigentumswohnung in München:** Vergleichswert.
3.  **Bürogebäude in Frankfurt:** Ertragswert.
4.  **Freistehendes Einfamilienhaus im Emsland (selbstgenutzt):** Sachwert.
5.  **Villa am Starnberger See:** Sachwert (für Substanz) + Vergleichswert (für Lage).
6.  **Reihenhaus (vermietet):** Ertragswert (weil vermietet) ODER Vergleichswert (weil Reihenhaus). Hier oft beides zur Plausibilisierung.
    `,
    tasks: [
      {
        question: "Nennen Sie die drei normierten Wertermittlungsverfahren.",
        solution: "Vergleichswertverfahren, Ertragswertverfahren, Sachwertverfahren."
      },
      {
        question: "Welches Verfahren dominiert bei Gewerbeimmobilien?",
        solution: "Das Ertragswertverfahren (bzw. Discounted Cashflow), da hier die Rendite das alleinige Entscheidungskriterium für Investoren ist."
      },
      {
        question: "Was ist der 'Verkehrswert'?",
        solution: "Der Marktwert (§ 194 BauGB) - der Preis, der im gewöhnlichen Geschäftsverkehr voraussichtlich zu erzielen wäre."
      },
      {
        question: "Darf man Verfahren mischen?",
        solution: "Man führt sie meist parallel durch (Stützung). Am Ende muss der Gutachter sich aber entscheiden oder gewichten, welches Verfahren für die Objektart marktüblich ('verfahrensprägend') ist."
      }
    ]
  },

  day_9: {
    title: "Bodenwertermittlung Deep Dive",
    type: "Berechnung",
    theory: `
# Bodenwertermittlung im Detail

Der Bodenwert ist oft der größte Hebel, besonders in Ballungsgebieten.

## 1. Umrechnungskoeffizienten (GFZ-Umrechnung)
Der Bodenrichtwert gilt für eine bestimmte GFZ (Geschossflächenzahl).
*   BRW 1.000 € bei GFZ 1,0.
*   Mein Grundstück darf GFZ 2,0 haben (Hochhaus).
*   Ist es doppelt so viel wert? Nein, der Nutzen steigt nicht linear (Baukosten steigen auch).
*   Es gibt Umrechnungstabellen (Gutachterausschuss).

## 2. Vorderland / Hinterland
Bei sehr tiefen Grundstücken ist der vordere Teil (Bauland) wertvoller als der hintere Teil (Gartenland).
*   Man bildet Zonenwerte.

## 3. Ecklage
Eckgrundstücke haben oft einen höheren Wert (bessere Bebaubarkeit, zwei Fronten).
    `,
    law: [
      "§ 196 BauGB",
      "BRW-Richtlinie"
    ],
    practice: `
# Rechenübung: GFZ-Anpassung

**Gegeben:**
*   Bodenrichtwert (BRW): 500 €/m².
*   BRW-GFZ: 0,8.
*   Grundstücks-GFZ: 1,2 (zulässig).

**Umrechnungskoeffizienten (fiktiv aus Tabelle):**
*   GFZ 0,8 -> Faktor 1,00.
*   GFZ 1,2 -> Faktor 1,15.

**Rechnung:**
Bodenwert = BRW × (Faktor Objekt / Faktor BRW).
Bodenwert = 500 € × (1,15 / 1,00) = **575 €/m²**.

*Ergebnis:* Durch die höhere Ausnutzbarkeit ist der Quadratmeter 75 € mehr wert.
    `,
    tasks: [
      {
        question: "Was bedeutet GFZ?",
        solution: "Geschossflächenzahl. Sie gibt an, wie viel Quadratmeter Geschossfläche je Quadratmeter Grundstücksfläche zulässig sind."
      },
      {
        question: "Ist Hinterland wertlos?",
        solution: "Nein, aber weniger wertvoll als Bauland. Oft wird es als 'Gartenland' mit z.B. 10-20% des Baulandwertes angesetzt."
      },
      {
        question: "Wie beeinflusst eine Ecklage den Wert?",
        solution: "Meist positiv (bessere Belichtung, Erschließung, Werbewirksamkeit bei Gewerbe). Zuschläge von 5-10% sind üblich."
      },
      {
        question: "Was tun, wenn kein Bodenrichtwert existiert?",
        solution: "Vergleichspreise heranziehen oder deduktive Verfahren (Lageklassenverfahren) nutzen."
      }
    ]
  },

  day_10: {
    title: "Zwischenprüfung: Verfahrenskompetenz",
    type: "Prüfung",
    theory: `
# Woche 1 & 2 Abschluss

Wir haben die Grundlagen und die Ertragswertseite gemeistert.
Jetzt prüfen wir die Kompetenz, bevor wir nächste Woche zum Sachwert (Substanz) kommen.

## Checkliste Kompetenzen
1.  Können Sie den Verkehrswert definieren?
2.  Können Sie eine Wohnfläche grob prüfen?
3.  Können Sie einen Ertragswert rechnen?
4.  Wissen Sie, wann man welches Verfahren nimmt?
    `,
    law: [],
    practice: `
# Komplexe Übungsaufgabe

**Objekt:** Kleines Zinshaus (3 Wohnungen).
*   Miete: 18.000 €/Jahr.
*   BWK: 20% des Rohertrags.
*   Liegenschaftszins: 4%.
*   RND: 40 Jahre (Vervielfältiger: 19,79).
*   Bodenwert: 150.000 €.

**Berechnen Sie den Ertragswert!**

*Lösungsweg:*
1.  Rohertrag: 18.000 €.
2.  Reinertrag: 18.000 - 20% (3.600) = 14.400 €.
3.  Bodenwertverzinsung: 150.000 × 4% = 6.000 €.
4.  Gebäudereinertrag: 14.400 - 6.000 = 8.400 €.
5.  Ertragswert Gebäude: 8.400 × 19,79 = 166.236 €.
6.  Gesamtwert: 166.236 + 150.000 (Boden) = **316.236 €**.
    `,
    tasks: [
      {
        question: "Berechnen Sie den Ertragswert (siehe Praxisbeispiel).",
        solution: "**316.236 €** (bzw. gerundet 316.000 €)."
      },
      {
        question: "Was wäre, wenn der Bodenwert 300.000 € betrüge?",
        solution: "Bodenverzinsung steigt auf 12.000 €. Gebäudereinertrag sinkt auf 2.400 €. Ertragswert Gebäude sinkt massiv. Gesamtwert würde sich ändern, aber nicht um 150.000 € steigen, da der Gebäudeanteil sinkt."
      },
      {
        question: "Welche Auswirkung hat eine Mieterhöhung um 10%?",
        solution: "Der Rohertrag steigt. Der Reinertrag steigt. Der Ertragswert steigt überproportional (Hebelwirkung des Vervielfältigers)."
      },
      {
        question: "Sind Gutachten ewig gültig?",
        solution: "Nein, sie gelten streng genommen nur für den Stichtag. Nach 6-12 Monaten werden sie von Banken/Gerichten meist nicht mehr akzeptiert."
      }
    ]
  }
};
