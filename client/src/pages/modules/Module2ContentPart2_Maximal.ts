// Maximalist Content for Module 2 (Makler §34c) - Part 2 (Days 21-40)
// Focus: Bewertung, Einkauf, Maklervertrag & Marketing

export const contentDataPart2Maximal: Record<string, {
  title: string;
  theory: string;
  law: string[];
  practice: any;
  task?: string;
  tasks?: Array<{type?: string; question: string; hint?: string}>;
  quiz?: Array<{question: string; options?: string[]; answer?: string; explanation?: string}>;
  type?: string;
  extendedTheory?: string;
  caseStudy?: string;
  solution?: string;
}> = {
  // --- Woche 5-6: Immobilienbewertung (Tag 21-30) ---

  day_21: {
    title: "Einführung Wertermittlung (ImmoWertV)",
    theory: "Der 'richtige' Preis ist der Schlüssel zum Verkaufserfolg.",
    extendedTheory: `
### Warum bewerten?
Ein zu hoher Preis ("Moon Price") führt zu langer Vermarktungsdauer und am Ende oft zu einem Preis *unter* Marktwert ("Verbrennen des Objekts"). Ein zu niedriger Preis verschenkt Geld.

### Die ImmoWertV (Immobilienwertermittlungsverordnung)
Regelt die gesetzlichen Verfahren in Deutschland.
*   **Verkehrswert (§ 194 BauGB):** Der Preis, der im gewöhnlichen Geschäftsverkehr zu erzielen wäre.
*   **Grundsatz der Modellkonformität:** Gutachter müssen die Modelle nutzen, die der lokale Gutachterausschuss vorgibt.

### Die 3 Verfahren
1.  **Vergleichswertverfahren:** Für Eigentumswohnungen, Reihenhäuser, Grundstücke. (Was kosten die anderen?).
2.  **Sachwertverfahren:** Für Einfamilienhäuser (Eigennutzung). (Was kostet der Bau der Steine?).
3.  **Ertragswertverfahren:** Für Mehrfamilienhäuser/Gewerbe (Kapitalanlage). (Was bringt die Miete?).
    `,
    law: ["ImmoWertV", "BauGB § 194"],
    practice: "Suchen Sie 3 vergleichbare Wohnungen auf ImmoScout zu einer fiktiven Wohnung (3 Zi, 70qm, Bj 1990, Zentrum). Berechnen Sie den Durchschnittspreis/qm.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Einführung Wertermittlung (ImmoWertV)' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Einführung Wertermittlung (ImmoWertV)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Einführung Wertermittlung (ImmoWertV)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der emotionale Verkäufer**
Verkäufer will 500.000 €, weil er "so viel Liebe reingesteckt hat" (goldene Wasserhähne). Markt sagt 400.000 €.
**Lösung:** Sachliche Bewertung vorlegen. "Der Markt zahlt nicht für Ihren Geschmack, sondern für den Nutzen."
    `,
    task: "Nennen Sie Vor- und Nachteile von Online-Bewertungstools (Algorithmen).",
    solution: `
**Vorteile:** Schnell, kostenlos, guter erster Indikator.
**Nachteile:** Erkennt keine Besonderheiten (Schimmel, Luxusbad, Lärm, Schnitt). Oft ungenau (Spanne +/- 20%). Ersetzt keine Besichtigung!
    `,
    type: "Bewertung"
  },
  day_22: {
    title: "Vergleichswertverfahren (§ 15 ImmoWertV)",
    theory: "Das Vergleichswertverfahren ist das genaueste Verfahren bei ausreichenden Marktdaten. Grundlage: vergleichbare Kaufpreise aus der Kaufpreissammlung des Gutachterausschusses, angepasst auf das Bewertungsobjekt.",
    extendedTheory: `
## Vergleichswertverfahren §15 ImmoWertV — Vollständige Methodik

### Grundformel
Verkehrswert = Vergleichspreis/m² × Wohnfläche × Anpassungskoeffizient

### Anpassungsfaktoren (Umrechnungskoeffizienten)
Jedes Vergleichsobjekt unterscheidet sich vom Bewertungsobjekt. Diese Unterschiede werden durch Koeffizienten bereinigt:

| Merkmal | Typischer Korrekturfaktor Berlin 2024 |
|---------|---------------------------------------|
| Sehr gute vs. gute Lage | +8 bis +15% |
| Balkon vorhanden | +1 bis +3% |
| Aufzug vorhanden | +2 bis +4% (ab 3. OG relevant) |
| Baujahr 10 Jahre jünger | +3 bis +6% |
| Instandhaltungsstau | -5 bis -15% (Kosten 1:1 abziehen!) |
| Südlage vs. Nordlage | +2 bis +5% |

### Zeitliche Anpassung (Indexierung)
Ältere Vergleichspreise müssen auf den Bewertungsstichtag angepasst werden:

**Berliner Preisindex Wohnungen (Gutachterausschuss Berlin):**
- 2020: Index 120
- 2022: Index 145 (Hochpunkt)
- 2024: Index 138 (Marktkorrektur ~5%)

Formel: Angepasster Preis = Vergleichspreis × (Index aktuell / Index Kaufjahr)

### Berliner Bodenrichtwerte 2024 (Auswahl)
| Bezirk | BRW Wohnen €/m² |
|--------|-----------------|
| Mitte/Prenzlauer Berg | 2.500–4.500 |
| Charlottenburg | 2.000–3.500 |
| Neukölln | 800–1.800 |
| Pankow | 400–900 |
| Spandau | 250–500 |

### Wann NICHT anwendbar?
- Einzigartige Objekte (Schlösser, Architektenhäuser) → Sachwertverfahren
- Renditeobjekte (MFH, Gewerbe) → Ertragswertverfahren
- Fehlende Vergleichsdaten → kombinierte Verfahren

### Merkregel IHK:
**"3 Vergleichsobjekte → Mittelwert → anpassen → Verkehrswert"**
    `,
    law: ["§15 ImmoWertV (Vergleichswertverfahren)", "§194 BauGB (Verkehrswertdefinition)", "§9 ImmoWertV (Vergleichspreise, Kaufpreissammlung)"],
    practice: "Recherchieren Sie aktuelle ETW-Kaufpreise in Ihrem Bezirk über immobilienscout24.de oder Gutachterausschuss Berlin (gutachterausschuss.fi.berlin.de). Welcher Preis/m² gilt für eine 3-Zimmer-ETW in mittlerer Lage?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Vergleichswertverfahren (§ 15 ImmoWertV)' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Vergleichswertverfahren (§ 15 ImmoWertV)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Vergleichswertverfahren (§ 15 ImmoWertV)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Berliner Praxisfall: ETW Prenzlauer Berg**

Bewertungsobjekt: 3-Zimmer-ETW, 72 m², Baujahr 1990, 3. OG ohne Aufzug, Balkon vorhanden

Vergleichsobjekte aus Kaufpreissammlung Berlin 2024:
- Objekt A: 5.800 €/m², gleicher Bezirk, BJ 1992, 2. OG, kein Balkon
- Objekt B: 6.200 €/m², gleicher Bezirk, BJ 1988, 4. OG mit Aufzug
- Objekt C: 5.600 €/m², gleicher Bezirk, BJ 1991, 1. OG, kein Balkon

Bereinigter Mittelwert: (5.800 + 6.200 + 5.600) / 3 = 5.867 €/m²

Anpassungen:
- Balkon vorhanden (Objekte haben keinen): +2,5%
- Kein Aufzug, 3. OG: -1,5%
- Netto-Anpassung: +1,0%

Angepasster Wert: 5.867 × 1,01 = 5.926 €/m²
Verkehrswert: 5.926 × 72 m² = 426.672 € → gerundet 427.000 €

IHK-Merksatz: Immer auf volle 1.000 € runden!
    `,
    task: [
      {
        question: `Aufgabe 1 — Grundberechnung (IHK-Niveau):
Eine 3-Zimmer-ETW in Berlin-Neukölln, 68 m², soll bewertet werden.
Vergleichspreise aus Kaufpreissammlung: 3.200 €/m², 3.400 €/m², 3.100 €/m²
Das Bewertungsobjekt hat einen Balkon (+2%), ist im 4. OG mit Aufzug (+3%) und hat Instandhaltungsstau (neue Küche + Bad nötig, Kosten ca. 22.000 €).
Berechnen Sie den Verkehrswert.`,
        solution: `Schritt 1 — Mittelwert Vergleichspreise:
(3.200 + 3.400 + 3.100) / 3 = 3.233 €/m²

Schritt 2 — Anpassungen:
Balkon: +2,0% → +64,67 €/m²
Aufzug 4. OG: +3,0% → +97,00 €/m²
Summe Zuschläge: +5,0%

Schritt 3 — Angepasster Preis:
3.233 × 1,05 = 3.395 €/m²

Schritt 4 — Rohwert:
3.395 × 68 m² = 230.860 €

Schritt 5 — Instandhaltungsabzug:
230.860 - 22.000 = 208.860 €

Verkehrswert: 209.000 € (gerundet)

IHK-Merkregel: Instandhaltungskosten werden zu 100% abgezogen!`
      },
      {
        question: `Aufgabe 2 — Zeitliche Indexanpassung:
Ein Vergleichsgrundstück wurde 2022 für 450.000 € verkauft.
Berliner Preisindex: 2022 = 145, 2024 = 138.
Das Bewertungsobjekt ist 5% größer als das Vergleichsobjekt.
Berechnen Sie den angepassten Vergleichswert für 2024.`,
        solution: `Schritt 1 — Zeitliche Anpassung:
Indexfaktor = 138 / 145 = 0,9517
Zeitangepasster Preis: 450.000 × 0,9517 = 428.265 €

Schritt 2 — Größenanpassung (+5%):
428.265 × 1,05 = 449.678 €

Angepasster Vergleichswert: 450.000 € (gerundet)

Hinweis: Der Berliner Markt hat 2023/24 eine Korrektur von ca. 5% erfahren.
Zeitliche Anpassungen sind zwingend bei Vergleichskäufen älter als 12 Monate!`
      },
      {
        question: `Aufgabe 3 — Prüfungsfall Bodenrichtwert-Anpassung:
Vergleichsobjekt liegt in Bodenrichtwertzone 2.800 €/m².
Bewertungsobjekt liegt in Bodenrichtwertzone 3.400 €/m².
Vergleichskaufpreis: 4.800 €/m² Wohnfläche, 75 m² Wohnfläche.
Berechnen Sie den lageangepassten Verkehrswert.`,
        solution: `Schritt 1 — Lagezahl berechnen:
Lagezahl = BRW Bewertungsobjekt / BRW Vergleichsobjekt
Lagezahl = 3.400 / 2.800 = 1,2143

Schritt 2 — Angepasster Preis:
4.800 × 1,2143 = 5.829 €/m²

Schritt 3 — Verkehrswert:
5.829 × 75 m² = 437.143 €
Gerundet: 437.000 €`
      },
      {
        question: `München Maxvorstadt: 65m² ETW, Vergleichspreis 9.500€/m², Abschlag kein Aufzug 3.OG −2%, Abschlag BJ 1975 −5%. Verkehrswert?`,
        solution: `Basis: 65 × 9.500 = 617.500 €\n− 2% = −12.350 €\n− 5% = −30.875 €\n**Verkehrswert: 574.275 € → 574.000 €**\nHinweis: In München dominiert Bodenrichtwert — auch ältere ETW mit Mängeln über 500.000 €.`
      },
      {
        question: `Erfurt Altstadt: 72m² ETW, Vergleichspreis 2.400€/m², Lagezuschlag Altstadt +8%, Modernisierung 2022 +3%. Verkehrswert?`,
        solution: `Basis: 72 × 2.400 = 172.800 €\n+ 8% = +13.824 €\n+ 3% = +5.184 €\n**Verkehrswert: 191.808 € → 192.000 €**\nHinweis: Ostdeutsche Mittelstädte (Erfurt, Magdeburg, Rostock) zeigen dynamisches Wachstum — deutlich unter Westniveau, aber IHK-Prüfungslogik identisch.`
      },
      {
        question: `Hamburg Altona: 58m² ETW, Vergleichsobjekte: A=5.200€/m² (kein Balkon, gleiche Lage), B=5.600€/m² (Balkon, +5% bessere Lage). Ihr Objekt: Balkon, gleiche Lage wie A. Balkon-Faktor +2%. Verkehrswert?`,
        solution: `Obj.A anpassen: 5.200 × 1,02 = 5.304 €/m²\nObj.B anpassen: 5.600 / 1,05 = 5.333 €/m² (Balkon bereits enthalten)\nMittelwert: (5.304 + 5.333)/2 = 5.319 €/m²\n**Verkehrswert: 5.319 × 58 = 308.502 € → 308.000 €**`
      }
    ],
    type: "Bewertung"
  },
  day_23: {
    title: "Sachwertverfahren (§ 21 ImmoWertV)",
    theory: "Substanzwert + Bodenwert. Klassiker für EFH.",
    extendedTheory: `
### Ablauf
1.  **Bodenwert:** Bodenrichtwert x Fläche.
2.  **Bauwerksherstellungskosten (NHK 2010/2025):** Was kostet der Neubau heute? (z.B. 1.500 €/qm fiktiv).
3.  **Alterswertminderung:** Lineare Abschreibung. (Gesamtnutzungsdauer meist 80 Jahre).
    *   Haus 40 Jahre alt -> 50% Abschlag.
4.  **Marktanpassungsfaktor (Sachwertfaktor):** Das Wichtigste!
    *   Passt den rechnerischen Sachwert an den Markt an.
    *   In München: Faktor 1.5 (Markt zahlt 50% mehr als Steine wert sind).
    *   Im Bayerischen Wald: Faktor 0.7 (Markt zahlt weniger).

**Formel:** (Bodenwert + Bauwert) x Sachwertfaktor = Verkehrswert.
    `,
    law: ["ImmoWertV § 21-23"],
    practice: "Finden Sie den Sachwertfaktor für EFH in Ihrem lokalen Marktbericht.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Sachwertverfahren (§ 21 ImmoWertV)' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Sachwertverfahren (§ 21 ImmoWertV)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Sachwertverfahren (§ 21 ImmoWertV)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Das 'Liebhaberobjekt'**
Ein Schloss im Nirgendwo. Herstellungskosten 5 Mio. €. Bodenwert gering.
**Markt:** Niemand will da wohnen. Sachwertfaktor 0.4.
**Wert:** Viel geringer als Baukosten.
    `,
    task: "Berechnen Sie: NHK 400.000 €. Alter 20 Jahre (von 80). Boden 100.000 €. Faktor 1.0.",
    solution: `
1.  Alterswertminderung: 20/80 = 25%.
2.  Restwert Haus: 400.000 - 25% = 300.000 €.
3.  Zwischenwert: 300.000 (Haus) + 100.000 (Boden) = 400.000 €.
4.  Marktanpassung: 400.000 * 1.0 = 400.000 €.
    `,
    type: "Bewertung"
  },
  day_24: {
    title: "Ertragswertverfahren (§ 27 ImmoWertV)",
    theory: "Rendite zählt. Für Zinshäuser (MFH) und Gewerbe.",
    extendedTheory: `
### Logik
Der Käufer kauft den zukünftigen Zahlungsstrom (Miete). Der Boden wird nur verzinst (liegenschaftszins).

### Ablauf
1.  **Rohertrag:** Jahresnettokaltmiete (marktüblich!).
2.  **Bewirtschaftungskosten:** Verwaltung, Instandhaltung, Mietausfallwagnis (nicht umlegbare Kosten!). Ca. 20-25% der Miete.
3.  **Reinertrag:** Rohertrag - Bewirtschaftungskosten.
4.  **Bodenwertverzinsung:** Bodenwert x Liegenschaftszins (z.B. 3%). Das zieht man ab (Boden nutzt sich nicht ab).
5.  **Gebäudeertragswert:** Der Rest wird mit einem Vervielfältiger (Barwertfaktor) kapitalisiert.
6.  **+ Bodenwert:** Am Ende wieder draufrechnen.

**Wichtig:** Liegenschaftszins ist der Hebel. Niedriger Zins (Top Lage) = Hoher Faktor = Hoher Preis.
    `,
    law: ["ImmoWertV § 27-34"],
    practice: "Was ist der aktuelle Liegenschaftszins für MFH in Ihrer Stadt? (Marktbericht).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Ertragswertverfahren (§ 27 ImmoWertV)' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Ertragswertverfahren (§ 27 ImmoWertV)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Ertragswertverfahren (§ 27 ImmoWertV)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die Miete ist zu niedrig**
MFH, Miete 5€/qm. Markt 10€/qm.
**Bewertung:** Man darf mit der *marktüblichen* Miete rechnen, wenn eine Erhöhung rechtlich möglich ist. Sonst Abschläge ("Over-Rented" vs "Under-Rented").
    `,
    task: [
      {
        question: `Aufgabe 1 — Vollständige Ertragswertberechnung (IHK-Niveau):
MFH in Berlin-Neukölln, 6 Wohneinheiten, Baujahr 1968
Wohnfläche gesamt: 380 m²
Ist-Miete: 7,80 €/m²/Monat
Marktmiete Neukölln 2024: 10,20 €/m²/Monat
Bodenwert: 850 €/m² × 290 m² Grundstück
Liegenschaftszinssatz: 3,0% (GA-Bericht Berlin Neukölln)
Restnutzungsdauer: 38 Jahre → Barwertfaktor: 22,5
Bewirtschaftungskosten: 18% (Altbau)
Berechnen Sie den Verkehrswert nach Ertragswertverfahren.`,
        solution: `Schritt 1 — Bodenwert:
850 €/m² × 290 m² = 246.500 €

Schritt 2 — Rohertrag (MARKTÜBLICH, nicht Ist-Miete!):
10,20 €/m²/Monat × 380 m² × 12 = 46.512 €/Jahr

Schritt 3 — Bewirtschaftungskosten (18%):
46.512 × 0,18 = 8.372 €

Schritt 4 — Reinertrag:
46.512 - 8.372 = 38.140 €

Schritt 5 — Bodenwertverzinsung:
246.500 × 3,0% = 7.395 €

Schritt 6 — Gebäudereinertrag:
38.140 - 7.395 = 30.745 €

Schritt 7 — Gebäudeertragswert:
30.745 × 22,5 = 691.763 €

Schritt 8 — Vorläufiger Ertragswert:
691.763 + 246.500 = 938.263 €

Schritt 9 — Abzug Mietminderung (Ist < Markt):
Mietdifferenz: (10,20 - 7,80) × 380 × 12 = 10.944 €/Jahr
Barwert: 10.944 × 22,5 = 246.240 €
Abzug!

Verkehrswert: 938.263 - 246.240 = 692.023 €
Gerundet: 692.000 €

IHK-Merkregel: Ist-Miete IMMER mit Marktmiete vergleichen!
Unter-Miete = Abzug, Über-Miete = Zuschlag`
      },
      {
        question: `Aufgabe 2 — Liegenschaftszinssatz und Vervielfältiger:
Gegeben: Jahresreinertrag 42.000 €, Bodenwert 180.000 €, LZ 2,8%, RND 30 Jahre
Barwertfaktor (30 J / 2,8%): 20,2
Berechnen Sie den Ertragswert.`,
        solution: `Gebäudereinertrag:
42.000 - (180.000 × 2,8%) = 42.000 - 5.040 = 36.960 €

Gebäudeertragswert:
36.960 × 20,2 = 746.592 €

Ertragswert:
746.592 + 180.000 = 926.592 €
Gerundet: 927.000 €`
      }
    ],
    type: "Bewertung"
  },
  day_25: {
    title: "Bauschäden & Mängel erkennen",
    theory: "Makler müssen keine Gutachter sein, aber 'offensichtliche Mängel' erkennen.",
    extendedTheory: `
### Typische Mängel
1.  **Feuchtigkeit:** Kellerwände, Schimmel in Ecken (Wärmebrücken).
2.  **Risse:** Setzungsrisse (diagonal) vs. Putzrisse (harmlos).
3.  **Dach:** Undichte Stellen, alte Dämmung.
4.  **Asbest:** Bei Baujahren 1960-1990 (Fassadenplatten, Bodenkleber).
5.  **Hausschwamm:** Meldepflichtig! Zerstört Holz.

### Aufklärungspflicht
Der Makler muss ungefragt über *bekannte* oder *offensichtliche* Mängel aufklären. "Gekauft wie gesehen" schützt nicht bei Arglist!
    `,
    law: ["BGB § 434 (Sachmangel)"],
    practice: "Gehen Sie in den Keller. Riecht es muffig? Sehen Sie Ausblühungen (Salze) an der Wand?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Bauschäden & Mängel erkennen' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Bauschäden & Mängel erkennen'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Bauschäden & Mängel erkennen' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der verschwiegene Wasserschaden**
Verkäufer streicht kurz vor Verkauf über den Wasserfleck. Makler sieht es ("frische Farbe"), fragt aber nicht nach.
**Haftung:** Makler haftet evtl. wegen Verletzung der Sorgfaltspflicht, wenn er den Verdacht nicht äußert.
    `,
    task: "Erstellen Sie eine 'Mängel-Checkliste' für die Objektaufnahme.",
    solution: `
*   Feuchtigkeit (Messgerät nutzen!).
*   Fenster (Alter, Isolierglas?).
*   Heizung (Baujahr? Austauschpflicht nach 30 Jahren GEG?).
*   Elektrik (FI-Schalter vorhanden?).
*   Dach (Dämmung?).
    `,
    type: "Technik"
  },

  // --- Woche 6: Einkauf & Akquise (Tag 26-30) ---

  day_26: {
    title: "Einkaufsstrategien: Farming",
    theory: "Wer das Objekt hat, hat die Macht. Akquise ist der wichtigste Job.",
    extendedTheory: `
### Farming (Gebietsbearbeitung)
Man definiert ein Farmgebiet (z.B. 2000 Haushalte) und bearbeitet es systematisch.
*   **Flyer:** "Ich suche für Familie Müller..." (Achtung UWG: Muss wahr sein!).
*   **Marktbericht:** Kostenlose Wertermittlung anbieten.
*   **Präsenz:** Sponsoring Sportverein, Dorffest.

### Ziel
"Top of Mind" werden. Wenn jemand im Gebiet verkaufen will, muss er an SIE denken.
    `,
    law: ["UWG (Werberecht)"],
    practice: "Entwerfen Sie einen Farming-Flyer für Ihr Viertel.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Einkaufsstrategien: Farming' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Einkaufsstrategien: Farming'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Einkaufsstrategien: Farming' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der Gießkannen-Flyer**
Makler wirft 10.000 billige Flyer in die ganze Stadt. Rücklauf: 0.
**Besser:** 1.000 hochwertige Briefe an Eigentümer in einer Straße, wo gerade ein Haus verkauft wurde ("Nachbarschaftswerbung").
    `,
    task: "Erstellen Sie einen Akquise-Brief an Privateigentümer, die bei ImmoScout inserieren.",
    solution: `
**Brief-Struktur:**
1.  Kein Vorwurf ("Warum makeln Sie selbst?").
2.  Hilfe anbieten ("Haben Sie schon den Energieausweis?").
3.  Sicherheit ("Ich prüfe die Bonität der Käufer für Sie").
4.  Kostenloses Erstgespräch.
    `,
    type: "Akquise"
  },
  day_27: {
    title: "Einkaufsgespräch & Einwandbehandlung",
    theory: "Verkäufer wollen keine Makler. Sie wollen den besten Preis.",
    extendedTheory: `
### Die klassischen Einwände
1.  **"Ich will keine Provision zahlen."** -> "Die Provision zahlt der Käufer (teilweise). Dafür bekommen Sie einen höheren Verkaufspreis durch meine Profi-Vermarktung."
2.  **"Ich habe Zeit."** -> "Lange Marktzeit drückt den Preis (Schrankleiche)."
3.  **"Makler machen doch nur die Tür auf."** -> Leistungsgarantie zeigen!

### Das "Macht-Gespräch"
Nicht betteln. Augenhöhe!
"Herr Eigentümer, ich arbeite nur mit Alleinauftrag. Wenn Sie 5 Makler beauftragen, kümmert sich keiner richtig. Ich investiere 5.000 € in Marketing, dafür brauche ich Exklusivität."
    `,
    law: [],
    practice: "Rollenspiel mit Partner: Überzeugen Sie einen 'Selbstverkäufer'.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Einkaufsgespräch & Einwandbehandlung' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Einkaufsgespräch & Einwandbehandlung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Einkaufsgespräch & Einwandbehandlung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der 'Mal schauen'-Auftrag**
Eigentümer sagt: "Bringen Sie mir jemanden, aber ich unterschreibe nichts."
**Gefahr:** Makler arbeitet umsonst. Eigentümer verkauft am Makler vorbei an den Nachbarn.
**Lösung:** Immer schriftlicher Maklerauftrag!
    `,
    task: "Formulieren Sie 3 Gegenargumente für: 'Den Preis kann ich auch alleine erzielen.'",
    solution: `
1.  "Ich habe eine Datenbank mit geprüften Suchkunden."
2.  "Ich bin Verhandlungsprofi und hole emotional mehr raus."
3.  "Ich schütze Sie vor Haftungsfallen (Rechtssicherheit)."
    `,
    type: "Softskills"
  },
  day_28: {
    title: "Der Makleralleinauftrag",
    theory: "Der Goldstandard. Nur so investiert der Makler Zeit und Geld.",
    extendedTheory: `
### Einfacher Auftrag vs. Alleinauftrag
*   **Einfacher Auftrag:** Eigentümer darf andere Makler beauftragen. Makler muss nicht tätig werden. (Schlecht).
*   **Alleinauftrag:** Eigentümer darf keine anderen Makler nehmen. Makler MUSS tätig werden (Tätigkeitspflicht).
*   **Qualifizierter Alleinauftrag:** Eigentümer darf auch nicht mehr *selbst* verkaufen (bzw. muss Interessenten an Makler verweisen). Individuelle Vereinbarung nötig (AGB reicht oft nicht!).

### Laufzeit
Meist 6 Monate. Automatische Verlängerung möglich (in AGB max. 3 Monate, besser individuell).
    `,
    law: ["BGB § 652"],
    practice: "Lesen Sie einen IVD-Mustervertrag.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Der Makleralleinauftrag' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Der Makleralleinauftrag'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Der Makleralleinauftrag' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der Fremdverkauf**
Trotz Alleinauftrag verkauft der Eigentümer an seinen Neffen.
**Recht:** Beim einfachen Alleinauftrag darf er das! Makler kriegt evtl. Wertersatz (Aufwand), aber keine Provision.
**Lösung:** Qualifizierter Alleinauftrag mit Verweisungsklausel.
    `,
    task: "Erstellen Sie eine Liste der Leistungen, die Sie im Alleinauftrag garantieren.",
    solution: `
*   Professionelle Fotos.
*   360-Grad-Rundgang.
*   Premium-Platzierung ImmoScout.
*   Bearbeitung aller Anfragen binnen 24h.
*   Regelmäßiges Reporting (alle 14 Tage).
    `,
    type: "Verträge"
  },
  day_29: {
    title: "Exposé-Erstellung: Text & Bild",
    theory: "Das Exposé ist der erste Eindruck. Es muss verkaufen, aber ehrlich sein.",
    extendedTheory: `
### AIDA-Formel
*   **A**ttention: Headline ("Traumhaus am See").
*   **I**nterest: Highlights (Kamin, Südbalkon).
*   **D**esire: Emotionale Beschreibung ("Hier frühstücken Sie in der Sonne").
*   **A**ction: Call to Action ("Rufen Sie an!").

### Fotografie
*   Weitwinkel (aber nicht Fish-Eye!).
*   Helles Licht (Sonne, alle Lampen an).
*   Aufgeräumt (Staging). Klodeckel zu! Keine persönlichen Fotos.
*   Drohnenaufnahmen (Genehmigungspflicht!).

### Rechtliches
Energieausweisdaten, Provision, Impressum, Widerrufsbelehrung müssen rein.
    `,
    law: ["UWG"],
    practice: "Fotografieren Sie Ihr Wohnzimmer. Vergleichen Sie: Licht an/aus, Weitwinkel vs. Zoom.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Exposé-Erstellung: Text & Bild' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Exposé-Erstellung: Text & Bild'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Exposé-Erstellung: Text & Bild' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Das Photoshop-Desaster**
Makler retuschiert Strommast weg und macht den Rasen knallgrün.
**Folge:** Kunde kommt zur Besichtigung und ist enttäuscht. Vertrauensverlust. Ggf. Täuschungsvorwurf.
    `,
    task: "Schreiben Sie eine Headline und einen Einleitungstext für ein renovierungsbedürftiges Haus ('Handwerker-Traum').",
    solution: `
**Headline:** "Verwirklichen Sie Ihre Träume: Viel Platz für Kreative in ruhiger Lage!"
**Text:** "Dieses Haus sucht neue Liebe. Substanzsolide, aber im Dornröschenschlaf, bietet es auf 150qm unendliche Möglichkeiten für Handwerker..." (Ehrlich sein: 'Renovierungsbedarf', nicht 'Top Zustand').
    `,
    type: "Marketing"
  },
  day_30: {
    title: "Vermarktungskanäle",
    theory: "Wo finde ich den Käufer? Portale sind nicht alles.",
    extendedTheory: `
### Kanäle
1.  **Portale:** ImmoScout24, Immowelt (Teuer, aber Reichweite).
2.  **Eigene Website:** SEO wichtig.
3.  **Social Media:** Instagram/Facebook (für Emotionen). LinkedIn (für Gewerbe/Investoren).
4.  **Print:** Lokalzeitung (für ältere Zielgruppe/Verkäufer-Akquise!).
5.  **Verkaufsschild:** "Zu Verkaufen" am Haus (Sehr effektiv für Nachbarschaft).
6.  **Bestandskunden:** Newsletter an Suchkunden (Der Königsweg!).

### Off-Market
Diskretvermarktung ohne Portale. Für Luxusobjekte oder Prominente. Nur über direktes Netzwerk.
    `,
    law: [],
    practice: "Erstellen Sie einen Social-Media-Post für ein neues Objekt (Bild + Text + Hashtags).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Vermarktungskanäle' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Vermarktungskanäle'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Vermarktungskanäle' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Nur ImmoScout**
Makler stellt Objekt nur bei ImmoScout ein. Keine Anfragen.
**Fehler:** Zielgruppe verfehlt? Preis zu hoch? Bilder schlecht?
**Lösung:** Multi-Channel-Marketing.
    `,
    task: "Erstellen Sie einen Mediaplan für ein EFH (Budget 500 €).",
    solution: `
*   ImmoScout 1 Monat: 200 €.
*   Profifotos: 150 €.
*   Verkaufsschild: 50 €.
*   Facebook Ads (Radius 5km): 100 €.
    `,
    type: "Marketing"
  },

  // --- Woche 7-8: Verkauf & Abschluss (Tag 31-40) ---

  day_31: {
    title: "Anfragen-Management & Qualifizierung",
    theory: "Zeit ist Geld. Keine Besichtigungstouristen!",
    extendedTheory: `
### Der Qualifizierungs-Funnel
1.  **Anfrage:** Auto-Reply mit Widerrufsbelehrung und Exposé-Link.
2.  **Exposé-Download:** Kunde schaut es sich an.
3.  **Nachfassen:** Makler ruft an (oder Kunde meldet sich).
4.  **Check:**
    *   Passt das Objekt? (Lage, Größe, Preis).
    *   Passt die Finanzierung? ("Haben Sie schon mit der Bank gesprochen?").
    *   Wann wird entschieden?

**Regel:** Keine Besichtigung ohne vorheriges Telefonat/Check!
    `,
    law: [],
    practice: "Entwerfen Sie einen Telefonleitfaden für das Erstgespräch.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Anfragen-Management & Qualifizierung' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Anfragen-Management & Qualifizierung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Anfragen-Management & Qualifizierung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der Massenbesichtiger**
Makler lädt alle 50 Anfragen zur Einzelbesichtigung ein.
**Folge:** Burnout. 48 sagen "Gefällt mir nicht" oder "Kann ich mir nicht leisten".
**Lösung:** Open House oder strikte Vorqualifizierung.
    `,
    task: "Formulieren Sie 3 Fragen zur Finanzierungsprüfung am Telefon.",
    solution: `
1.  "Liegt Ihnen bereits ein Finanzierungszertifikat oder eine Bestätigung Ihrer Bank vor?"
2.  "Wie hoch ist Ihr verfügbares Eigenkapital (ca. 20% für Kaufnebenkosten)?"
3.  "Bis zu welcher monatlichen Rate fühlen Sie sich wohl?"
    `,
    type: "Vertrieb"
  },
  day_32: {
    title: "Besichtigungs-Dramaturgie",
    theory: "Eine Besichtigung ist eine Inszenierung, kein Aufschließen.",
    extendedTheory: `
### Vorbereitung
*   Lüften! Heizung an! Licht an!
*   Laufweg planen (Highlights am Schluss).
*   Alle Unterlagen dabei haben.

### Durchführung
*   **Smalltalk:** Beziehung aufbauen.
*   **Führung:** Kunden entdecken lassen, nicht alles totreden ("Hier ist die Küche"). Fragen stellen! "Wie gefällt Ihnen der Ausblick?"
*   **Einwandbehandlung:** Mängel nicht leugnen, sondern Lösungen anbieten ("Ja, das Bad ist alt. Dafür können Sie es nach Ihrem Geschmack gestalten. Kostet ca. 10k.").

### Abschluss
*   "Können Sie sich vorstellen, hier zu wohnen?"
*   Verbindlichkeit schaffen: "Wann wollen Sie zum Notar?"
    `,
    law: [],
    practice: "Führen Sie eine fiktive Besichtigung in Ihrer Wohnung durch. Planen Sie den Weg.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Besichtigungs-Dramaturgie' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Besichtigungs-Dramaturgie'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Besichtigungs-Dramaturgie' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die Gruppenbesichtigung**
20 Leute gleichzeitig im Haus. Chaos. Keiner kann Fragen stellen.
**Wirkung:** Wirkt billig ("Massenabfertigung").
**Besser:** Einzeltermine oder kleine Slots (30 Min).
    `,
    task: "Erstellen Sie ein 'Besichtigungs-Protokoll' zum Ausfüllen.",
    solution: `
*   Name Kunde.
*   Datum/Uhrzeit.
*   Feedback (Note 1-5).
*   Kaufinteresse? (Ja/Nein/Vielleicht).
*   Nächster Schritt (Finanzierung klären).
*   Unterschrift (Nachweis!).
    `,
    type: "Vertrieb"
  },
  day_33: {
    title: "Verkaufspsychologie & Verhandlung",
    theory: "Der Preis ist nicht fix. Verhandeln ist ein Spiel.",
    extendedTheory: `
### Harvard-Konzept
Hart in der Sache, weich zum Menschen. Win-Win suchen.

### Taktiken
*   **Anker setzen:** Der erste Preis im Raum wirkt.
*   **Verknappung:** "Es gibt noch zwei andere Interessenten." (Muss wahr sein!).
*   **Schweigen:** Nach dem Preisangebot einfach schweigen. Wer zuerst redet, verliert.

### Bieterverfahren
Offenes Verfahren: "Mindestpreis 300k, bitte geben Sie Ihr Gebot ab."
*   Transparent.
*   Maximiert den Preis bei hoher Nachfrage.
*   Keine Auktion (kein Zuschlagszwang)! Eigentümer entscheidet am Ende.
    `,
    law: [],
    practice: "Üben Sie das 'Schweigen' im Gespräch.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Verkaufspsychologie & Verhandlung' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Verkaufspsychologie & Verhandlung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Verkaufspsychologie & Verhandlung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der unverschämte Käufer**
Bietet 30% unter Angebotspreis. Verkäufer ist beleidigt und bricht ab.
**Makler-Job:** Puffer sein. Angebot neutral übermitteln ("Das ist ein Startangebot, lassen Sie uns reden"). Emotionen rausnehmen.
    `,
    task: "Formulieren Sie eine Antwort auf ein zu niedriges Gebot.",
    solution: `
"Vielen Dank für Ihr Angebot. Ich muss Ihnen jedoch offen sagen, dass wir damit weit von den Vorstellungen des Eigentümers und dem Marktwert entfernt sind. Liegt uns bereits ein höheres Gebot vor. Wo sehen Sie noch Spielraum bei sich?"
    `,
    type: "Softskills"
  },
  day_34: {
    title: "Reservierung & Anzahlung",
    theory: "Ein heißes Eisen. Rechtlich oft unwirksam.",
    extendedTheory: `
### Die Reservierungsgebühr
Makler verlangen oft Geld (z.B. 1% der Summe) für die Reservierung (Exklusivität für 2 Wochen).
*   **Rechtsprechung (BGH):** In AGB meist unwirksam! Benachteiligt den Kunden unangemessen, da Makler erfolgsabhängig ist.
*   **Wirksam nur:** Individualvereinbarung mit echtem Gegenwert (z.B. Bauunterlagen besorgen, Notar beauftragen) ODER notarielle Beurkundung (kostet aber).

**Empfehlung:**
Lieber "Reservierungsvereinbarung" ohne Gebühr, aber mit "Notarbestätigung". Sobald Notar bestellt ist, zahlen Kunden meist auch (Kostenrisiko Notar).
    `,
    law: ["BGB § 307 (AGB-Recht)", "BGH Urteile"],
    practice: "Lesen Sie das BGH-Urteil zur Reservierungsgebühr.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Reservierung & Anzahlung' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Reservierung & Anzahlung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Reservierung & Anzahlung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Geld zurück?**
Kunde reserviert, zahlt 2.000 €, springt dann ab. Fordert Geld zurück.
**Recht:** Makler muss meist zurückzahlen, wenn die Vereinbarung AGB-Charakter hatte.
    `,
    task: "Entwerfen Sie eine schriftliche Kaufabsichtserklärung (Letter of Intent).",
    solution: `
"Hiermit bestätige ich, Herr X, meine verbindliche Kaufabsicht für das Objekt Y zum Preis Z. Ich beauftrage den Makler, einen Notarentwurf zu bestellen. Ich trage die Kosten des Notars, falls ich grundlos vom Kauf zurücktrete." (Das ist meist wirksam bzgl. Notarkosten).
    `,
    type: "Recht"
  },
  day_35: {
    title: "Finanzierungssicherung",
    theory: "Kein Notartermin ohne Finanzierungsbestätigung!",
    extendedTheory: `
### Die Finanzierungsbestätigung
Ein Zettel der Bank: "Wir finanzieren Herrn X den Kaufpreis Y."
*   Muss *unwiderruflich* sein (oder nur an normale Bedingungen geknüpft, z.B. Grundschuldeintragung).
*   Keine "Vorläufige Machbarkeitsprüfung" akzeptieren!

### Makler als Finanzierungsvermittler?
Braucht § 34i GewO (Immobiliardarlehensvermittler). Wer das nicht hat: Finger weg! Nur Tippgeber an Banken sein.
    `,
    law: ["GewO § 34i"],
    practice: "Wie sieht eine echte Finanzierungszusage aus? Googeln Sie Muster.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Finanzierungssicherung' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Finanzierungssicherung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Finanzierungssicherung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die geplatzte Finanzierung**
Notarvertrag unterschrieben. 2 Wochen später sagt Bank "Nein".
**Folge:** Rückabwicklung. Teuer! Verkäufer sauer. Maklerprovision? (Rechtlich entstanden, aber praktisch kaum durchsetzbar und Kunde pleite).
**Lösung:** Zusage VOR Beurkundung prüfen.
    `,
    task: "Erstellen Sie eine E-Mail an die Bank des Käufers (mit Vollmacht), um Unterlagen nachzureichen.",
    solution: `
"Sehr geehrte Bank, anbei erhalten Sie die fehlende Flurkarte und Wohnflächenberechnung für Objekt X. Bitte bestätigen Sie uns den Eingang und wann mit der finalen Zusage zu rechnen ist."
    `,
    type: "Finanzierung"
  },
  day_36: {
    title: "Kaufvertragsentwurf & Notar",
    theory: "Der Makler steuert den Prozess bis zur Unterschrift.",
    extendedTheory: `
### Der Kaufvertrag
Wird vom Notar erstellt. Makler prüft ihn auf Richtigkeit (Namen, Preis, Objekt, Nebenabreden).
*   **Besitzübergang:** Wann gehen Schlüssel und Lasten über? (Meist nach Kaufpreiszahlung).
*   **Gewährleistungsausschluss:** "Gekauft wie gesehen" (bei gebrauchten Häusern Standard).
*   **Auflassung:** Die Einigung über den Eigentumsübergang.

### Die 14-Tages-Frist (§ 17 BeurkG)
Verbraucher müssen den Entwurf 14 Tage *vor* Beurkundung erhalten, um ihn zu prüfen. Notar darf nicht früher beurkunden (außer in Ausnahmefällen).
    `,
    law: ["BeurkG § 17", "BGB § 311b (Formzwang)"],
    practice: "Lesen Sie einen Muster-Kaufvertrag.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Kaufvertragsentwurf & Notar' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Kaufvertragsentwurf & Notar'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Kaufvertragsentwurf & Notar' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die vergessene Einbauküche**
Küche ist im Preis drin, steht aber nicht im Vertrag.
**Folge:** Grunderwerbsteuer auf alles!
**Tipp:** Küche separat ausweisen (bewegliches Gut -> keine Grunderwerbsteuer!). Spart dem Käufer Geld.
    `,
    task: "Berechnen Sie die Ersparnis: Kaufpreis 500k, davon 20k Küche. Grunderwerbsteuer 6%.",
    solution: `
Ohne Trennung: 500k * 6% = 30.000 € Steuer.
Mit Trennung: 480k * 6% = 28.800 € Steuer.
**Ersparnis:** 1.200 €.
    `,
    type: "Recht"
  },
  day_37: {
    title: "Der Notartermin",
    theory: "Der Höhepunkt. Der Makler sollte dabei sein.",
    extendedTheory: `
### Rolle des Maklers im Termin
*   Moralische Unterstützung.
*   Letzte Fragen klären.
*   **Provisionsklausel:** Oft unterwirft sich der Käufer im Kaufvertrag der "sofortigen Zwangsvollstreckung" wegen der Maklerprovision. Das sichert den Makler ab (spart Klage bei Nichtzahlung).

### Ablauf
1.  Verlesen des Vertrags durch Notar.
2.  Unterschriften (Käufer, Verkäufer, Notar).
3.  Sekt? (Professionell bleiben).
    `,
    law: [],
    practice: "Was zieht man zum Notar an? (Business Casual bis Suit).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Der Notartermin' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Der Notartermin'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Der Notartermin' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der Käufer erscheint nicht**
Alle warten beim Notar. Käufer kommt nicht.
**Folge:** Termin geplatzt. Notarkosten (Entwurf) fallen trotzdem an! Wer zahlt? Meist der Auftraggeber des Notars (Käufer). Wenn der pleite ist, haftet subsidiär der Verkäufer (Gesamtschuldner).
    `,
    task: "Formulieren Sie die Maklerklausel für den Kaufvertrag.",
    solution: `
"Dieser Vertrag wurde vermittelt durch die Maklerfirma X. Die Parteien bestätigen, dass der Maklervertrag zustande gekommen ist und die Provision in Höhe von Y % inkl. MwSt. mit Abschluss dieses Vertrags verdient und fällig ist. Der Käufer unterwirft sich wegen der Zahlung der sofortigen Zwangsvollstreckung..."
    `,
    type: "Praxis"
  },
  day_38: {
    title: "After-Sales & Übergabe",
    theory: "Nach dem Notar ist vor der Übergabe. Service bindet Kunden.",
    extendedTheory: `
### Fälligkeitsmitteilung
Notar prüft Voraussetzungen (Vormerkung drin, Löschungsbewilligung da, Vorkaufsrecht Verzicht Gemeinde). Dann schickt er "Fälligkeitsmitteilung". Käufer muss zahlen.

### Übergabe
Erst wenn Geld auf dem Konto ist! (Niemals vorher Schlüssel geben -> Risiko!).
*   **Übergabeprotokoll:** Zählerstände (Strom, Wasser, Gas), Schlüsselanzahl, Mängel.
*   Ummeldung Versorger.
    `,
    law: [],
    practice: "Erstellen Sie ein Übergabeprotokoll-Formular.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'After-Sales & Übergabe' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'After-Sales & Übergabe'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'After-Sales & Übergabe' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Schlüssel vor Geld**
Käufer darf schon renovieren ("Nur Tapeten abreißen"). Er reißt Wände ein, zahlt dann den Kaufpreis nicht.
**Folge:** Verkäufer hat kaputtes Haus und kein Geld. Rückabwicklung schwierig.
**Regel:** Schlüssel erst nach Geldeingang!
    `,
    task: "Erstellen Sie eine Checkliste für den Käufer: 'Was tun nach dem Kauf?'",
    solution: `
*   Kaufpreis zahlen (nach Aufforderung).
*   Grunderwerbsteuer zahlen (sonst keine Umschreibung!).
*   Wohngebäudeversicherung umschreiben.
*   Einwohnermeldeamt.
*   Müllabfuhr anmelden.
    `,
    type: "Service"
  },
  day_39: {
    title: "Mietrecht für Makler (Bestellerprinzip)",
    theory: "Vermietung ist anders als Verkauf. Wer bestellt, bezahlt.",
    extendedTheory: `
### Bestellerprinzip (seit 2015)
Bei **Wohnraumvermietung** zahlt der, der den Makler beauftragt hat (meist Vermieter).
*   Abwälzen auf Mieter verboten!
*   Suchauftrag vom Mieter: Nur möglich, wenn Makler *ausschließlich* für Mieter sucht und das Objekt noch nicht im Bestand hatte. (Selten).

### Mietpreisbremse
In angespannten Gebieten: Max. 10% über ortsüblicher Vergleichsmiete.
Makler muss das prüfen, um Vermieter vor Bußgeld/Rückforderung zu schützen.
    `,
    law: ["WoVermittG § 2 (Bestellerprinzip)", "BGB § 556d (Mietpreisbremse)"],
    practice: "Prüfen Sie: Gilt in Ihrer Stadt die Mietpreisbremse?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Mietrecht für Makler (Bestellerprinzip)' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Mietrecht für Makler (Bestellerprinzip)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Mietrecht für Makler (Bestellerprinzip)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die verdeckte Provision**
Makler verlangt vom Mieter "Abstandszahlung" für Küche (5.000 €, Küche wertlos), um Provision zu kassieren.
**Recht:** Verstoß gegen WoVermittG. Bußgeld bis 25.000 €. Rückforderung durch Mieter.
    `,
    task: "Berechnen Sie die max. Provision bei Vermietung.",
    solution: `
Vom Mieter (wenn erlaubt): Max. 2 Nettokaltmieten + MwSt.
Vom Vermieter: Frei verhandelbar (meist auch 2 NKM).
    `,
    type: "Recht"
  },
  day_40: {
    title: "Gewerbevermietung & Pacht",
    theory: "Die hohe Schule. Kein Bestellerprinzip, komplexe Verträge.",
    extendedTheory: `
### Unterschiede Wohnen vs. Gewerbe
*   **Provision:** Frei verhandelbar (oft 3 Monatsmieten). Auch vom Mieter erlaubt!
*   **Vertragslaufzeit:** Befristet (5-10 Jahre) üblich. Kündigungsschutz viel schwächer.
*   **Pacht:** Überlassung von Räumen UND "Früchten" (Inventar, Kundenstamm). Z.B. Gastronomie.

### Wertsicherungsklausel (Indexmiete)
Miete steigt mit Inflation (Verbraucherpreisindex). Im Gewerbe Standard.
    `,
    law: ["BGB § 581 (Pacht)"],
    practice: "Lesen Sie einen Gewerbemietvertrag. Suchen Sie die Konkurrenzschutzklausel.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Gewerbevermietung & Pacht' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Gewerbevermietung & Pacht'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Gewerbevermietung & Pacht' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Schriftformheilungsklausel**
Gewerbemietvertrag muss schriftlich sein (bei > 1 Jahr). Wenn nicht -> Kündbar wie unbefristet!
**Maklerpflicht:** Auf Schriftform achten (Alle Anlagen fest verbinden, alle Unterschriften).
    `,
    task: "Erstellen Sie ein Angebot für eine Ladenfläche. Miete staffelt sich.",
    solution: `
Jahr 1: 10 €/qm (Anlaufphase).
Jahr 2: 12 €/qm.
Jahr 3: 15 €/qm.
Provision: Basiert oft auf Durchschnittsmiete oder 10-Jahres-Wert.
    `,
    type: "Gewerbe"
  }
};
