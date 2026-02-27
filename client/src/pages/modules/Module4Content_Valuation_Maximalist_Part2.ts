// Maximalist Content for Module 4: Immobilienbewertung (Part 2)
// Structure matches the requirements: Theory, Law, Practice, Tasks (Array)

import { ValuationDayContent } from "./Module4Content_Valuation_Maximalist";

export const contentDataModule4MaximalistPart2: Record<string, ValuationDayContent> = {
  // ==================================================================================
  // WOCHE 3: SACHWERTVERFAHREN (Tag 11-12)
  // ==================================================================================

  day_11: {
    title: "Sachwertverfahren: Normalherstellungskosten (NHK)",
    type: "Berechnung",
    theory: `
# Das Sachwertverfahren (§ 21 ImmoWertV) - Teil 1

Das Substanzwertverfahren. Die Frage lautet: "Was würde es kosten, dieses Haus heute nochmal zu bauen?"

## 1. Normalherstellungskosten (NHK)
Wir rechnen nicht mit den tatsächlichen Baukosten (Rechnungen von damals), sondern mit pauschalierten Durchschnittswerten: den **NHK 2010** (oder neuerdings NHK 2025).
*   Einheit: € pro m² Brutto-Grundfläche (BGF).
*   Abhängig von: Gebäudeart (freistehend, DHH, RH) und Standardstufe.

## 2. Brutto-Grundfläche (BGF)
Achtung: Hier zählt nicht die Wohnfläche, sondern die BGF (nach DIN 277).
*   Außenmaße! (Länge × Breite × Geschosse).
*   Auch Keller und Dachboden zählen voll (je nach Nutzbarkeit).

## 3. Baupreisindex
Die NHK-Tabellen haben ein Basisjahr (z.B. 2010 = 100).
Da Bauen teurer wird, müssen wir auf den Stichtag indexieren.
*   *Formel:* NHK(heute) = NHK(2010) × (Index heute / Index 2010).

## 4. Baunebenkosten
Architekt, Statiker, Baugenehmigung.
*   Pauschaler Aufschlag (meist 15-20% auf die Bauwerkskosten).
    `,
    law: [
      "§ 21 ImmoWertV (Sachwertverfahren)",
      "§ 22 ImmoWertV (Herstellungskosten)",
      "Sachwertrichtlinie (SW-RL)"
    ],
    practice: `
# Rechenübung: Herstellungskosten ermitteln

**Objekt:** Freistehendes EFH, Standardstufe 3 (mittel).
**Größe:** 10m × 10m, 2 Vollgeschosse + voll ausgebautes DG.
**NHK-Basiswert (fiktiv):** 1.000 €/m² BGF (Basis 2010).
**Baupreisindex:** 160 (d.h. +60% seit 2010).

1.  **BGF-Berechnung:**
    *   EG: 10 × 10 = 100 m²
    *   OG: 10 × 10 = 100 m²
    *   DG: 10 × 10 = 100 m² (bei Vollnutzung)
    *   *Summe BGF:* **300 m²**.

2.  **Indexierung der Kosten:**
    1.000 €/m² × 1,60 = **1.600 €/m²** (heutige Baukosten).

3.  **Bauwerkskosten:**
    300 m² × 1.600 €/m² = **480.000 €**.

4.  **Baunebenkosten (z.B. 15%):**
    480.000 € × 15% = 72.000 €.

**Gesamtherstellungskosten:** 480.000 + 72.000 = **552.000 €**.
    `,
    tasks: [
      {
        question: "Was ist der Unterschied zwischen Wohnfläche und BGF?",
        solution: "Wohnfläche (WoFlV) misst die lichten Innenmaße der bewohnbaren Räume. BGF (Brutto-Grundfläche) misst die Außenmaße aller Geschosse inkl. Wände, Treppenhäuser und Konstruktion."
      },
      {
        question: "Warum nimmt man nicht die tatsächlichen Baukosten aus den Rechnungen des Eigentümers?",
        solution: "Weil diese subjektiv sind (Schwarzarbeit? Eigenleistung? Goldene Wasserhähne?). Die Wertermittlung muss objektiviert sein, daher nutzt man pauschalierte Normalherstellungskosten (NHK)."
      },
      {
        question: "Berechnen Sie die indexierten Kosten: NHK 800 €/m², Index 150.",
        solution: "800 * 1,5 = **1.200 €/m²**."
      },
      {
        question: "Zählt eine Garage zur BGF des Wohnhauses?",
        solution: "Nein, Garagen werden meist separat bewertet (Pauschalwert pro Stellplatz oder eigene BGF-Berechnung mit eigenen NHK-Werten)."
      }
    ]
  },

  day_12: {
    title: "Sachwertverfahren: Alterswertminderung & Marktanpassung",
    type: "Berechnung",
    theory: `
# Das Sachwertverfahren - Teil 2 (Vom Stein zum Markt)

Wir wissen, was der Neubau kostet. Aber das Haus ist alt.

## 1. Alterswertminderung (Abschreibung)
Häuser halten nicht ewig. Wir ziehen linear ab.
*   **Gesamtnutzungsdauer (GND):** 80 Jahre (Standard EFH).
*   **Formel:** Minderung in % = (Alter / GND) × 100.
*   *Beispiel:* 40 Jahre alt = 50% Wertverlust.

## 2. Der vorläufige Sachwert
(Herstellungskosten - Alterswertminderung) + Bodenwert + Außenanlagen = **Vorläufiger Sachwert**.

## 3. Der Sachwertfaktor (Marktanpassung) - WICHTIG!
Der vorläufige Sachwert ist nur eine Substanzrechnung. Der Markt interessiert sich aber nicht nur für Steine.
*   In München zahlen Leute für Bruchbuden Millionen -> Faktor > 1,0 (z.B. 1,4).
*   Im Bayerischen Wald kriegt man die Baukosten nicht wieder rein -> Faktor < 1,0 (z.B. 0,7).
*   *Quelle:* Gutachterausschuss.

**Endgültiger Sachwert = Vorläufiger Sachwert × Sachwertfaktor**
    `,
    law: [
      "§ 23 ImmoWertV (Alterswertminderung)",
      "§ 14 Abs. 2 ImmoWertV (Marktanpassungsfaktoren)"
    ],
    practice: `
# Rechenübung: Sachwert komplett

**Daten:**
*   Herstellungskosten (neu): 552.000 € (aus Tag 11).
*   Alter: 20 Jahre (GND 80 Jahre).
*   Bodenwert: 200.000 €.
*   Außenanlagen (Pauschal): 15.000 €.
*   Sachwertfaktor (Markt): 1,1 (beliebte Lage).

**Rechnung:**
1.  **Alterswertminderung:**
    20 / 80 = 25% Minderung.
    552.000 € × 75% (Restwert) = **414.000 €** (Zeitwert Gebäude).

2.  **Vorläufiger Sachwert:**
    414.000 € (Gebäude)
    + 200.000 € (Boden)
    + 15.000 € (Außenanlagen)
    = **629.000 €**.

3.  **Marktanpassung:**
    629.000 € × 1,1 = **691.900 €**.

*Ergebnis:* Der Verkehrswert liegt bei ca. 692.000 €.
    `,
    tasks: [
      {
        question: "Ein Haus ist 40 Jahre alt (GND 80), wurde aber vor 5 Jahren kernsaniert. Wie gehen Sie vor?",
        solution: "Man ermittelt eine **modifizierte Restnutzungsdauer**. Statt 40 Jahren RND hat es vielleicht wieder 60 Jahre RND. Das 'fiktive Baujahr' wird angepasst."
      },
      {
        question: "Was drückt ein Sachwertfaktor von 0,8 aus?",
        solution: "Dass die Herstellungskosten am Markt nicht realisiert werden können. Für jeden Euro, den man in den Bau steckt, bekommt man beim Verkauf nur 80 Cent zurück. Typisch für strukturschwache Regionen."
      },
      {
        question: "Berechnen Sie den Restwert: Neubauwert 400.000 €, Alter 10 Jahre, GND 80 Jahre.",
        solution: "Abschreibung: 10/80 = 12,5%. Restwert: 87,5%. 400.000 * 0,875 = **350.000 €**."
      },
      {
        question: "Warum wird der Bodenwert nicht alterswertgemindert?",
        solution: "Weil Grund und Boden (theoretisch) nicht altern oder verschleißen. Er ist ein ewiges Gut."
      }
    ]
  },

  // ==================================================================================
  // WOCHE 4: GUTACHTEN & PRAXIS (Tag 13-16)
  // ==================================================================================

  day_13: {
    title: "Aufbau eines Verkehrswertgutachtens",
    type: "Dokumente",
    theory: `
# Das Verkehrswertgutachten

Ein Gutachten muss für Laien verständlich und für Fachleute nachprüfbar sein.

## Gliederung (Standard)
1.  **Deckblatt:** Objekt, Stichtag, Auftraggeber.
2.  **Zusammenfassung:** Die wichtigsten Zahlen auf einen Blick (Management Summary).
3.  **Grundlagen:** Ortstermin, verwendete Unterlagen, Rechtsgrundlagen.
4.  **Lagebeschreibung:** Makro- und Mikrolage (Text + Karten).
5.  **Objektbeschreibung:** Grundstück, Gebäude, Ausstattung, Zustand.
6.  **Bodenwertermittlung:** Herleitung über Bodenrichtwerte.
7.  **Verfahrenswahl:** Warum Ertragswert? Warum Sachwert?
8.  **Wertermittlung:** Die eigentliche Rechnung (siehe Tag 5-12).
9.  **Besondere objektspezifische Grundstücksmerkmale (boG):** Bauschäden, Wegerechte etc. (werden am Ende abgezogen/addiert).
10. **Ergebnis:** Der Verkehrswert (gerundet).
11. **Anlagen:** Fotos, Pläne, Grundbuchauszug.

## Grundsätze
*   **Begründungspflicht:** Jede Annahme (z.B. "Liegenschaftszins 3,5%") muss begründet werden.
*   **Transparenz:** Quellen nennen (Mietspiegel 2023, Marktbericht GAA).
    `,
    law: [
      "§ 193 BauGB (Gutachterausschuss)",
      "Mustergutachten der Sprengnetter Akademie"
    ],
    practice: `
# Fallstudie: Das "Musterhaus am Park"

Sie haben den Auftrag erhalten, ein Verkehrswertgutachten für ein Einfamilienhaus in Berlin-Pankow zu erstellen.

## 1. Objektbeschreibung
- **Baujahr:** 1985
- **Grundstück:** 650 m²
- **Wohnfläche:** 145 m²
- **Zustand:** Gepflegt, aber energetisch unsaniert (Ölheizung 1995, Fenster 2-fach verglast 1985).

## 2. Herausforderung: Begründungspflicht
Im Ortstermin stellen Sie fest, dass der Keller feucht ist. Der Eigentümer behauptet, das sei "schon immer so" und mindere den Wert nicht.

### Ihre Aufgabe als Gutachter:
Sie müssen diesen Mangel nicht nur dokumentieren (Fotodokumentation), sondern auch wertmäßig erfassen.

**Vorgehensweise:**
1.  **Beweissicherung:** Feuchtigkeitsmessung durchführen und protokollieren.
2.  **Marktanpassung:** Wie reagiert ein potenzieller Käufer auf diesen Mangel?
    - *Option A:* Kostenschätzung für Sanierung (Abdichtung von außen) = 25.000 €.
    - *Option B:* Marktabschlag pauschal (Risikoabschlag) = 35.000 €.
3.  **Begründung im Gutachten:**
    "Aufgrund der festgestellten Feuchtigkeit im Kellerbereich (siehe Fotodokumentation Anlage 4) ist eine vertikale Abdichtung erforderlich. Die Kosten hierfür werden auf Basis von Erfahrungswerten (BKI Baukostenindex) mit ca. 25.000 € geschätzt und als 'Besondere objektspezifische Grundstücksmerkmale' (boG) vom vorläufigen Sachwert in Abzug gebracht."
    `,
    tasks: [
      {
        question: "Was gehört zwingend auf das Deckblatt eines Gutachtens?",
        solution: "Adresse des Objekts, Wertermittlungsstichtag, Qualitätsstichtag (falls abweichend), Auftraggeber, Name des Gutachters."
      },
      {
        question: "Was sind 'boG'?",
        solution: "**Besondere objektspezifische Grundstücksmerkmale**. Das sind wertbeeinflussende Umstände, die im normalen Verfahren (Standard) nicht erfasst wurden, z.B. Baumängel, Altlasten, Wegerechte. Sie werden am Ende als separater Zu- oder Abschlag berücksichtigt."
      },
      {
        question: "Warum müssen Anlagen (Fotos, Pläne) beigefügt werden?",
        solution: "Zur Plausibilisierung und Beweissicherung. Der Leser muss sich ein Bild machen können, ohne selbst vor Ort gewesen zu sein."
      },
      {
        question: "Darf ein Gutachter den Wert runden?",
        solution: "Ja, es ist sogar üblich und sinnvoll, um keine Scheingenauigkeit vorzutäuschen. Ein rechnerischer Wert von 453.219,87 € wird meist auf 453.000 € oder 450.000 € gerundet (je nach Marktgängigkeit)."
      }
    ]
  },

  day_14: {
    title: "Objektbeschreibung & Bauschäden",
    type: "Praxis",
    theory: `
# Bauschäden vs. Baumängel

*   **Baumangel:** Abweichung vom Soll-Zustand (technisch falsch gebaut, z.B. fehlende Abdichtung).
*   **Bauschaden:** Folge eines Mangels oder Verschleiß (z.B. Schimmel durch fehlende Abdichtung).

## Bewertung von Schäden (boG)
Wir ermitteln **keine Sanierungskosten** (das machen Bauingenieure), sondern **Marktwertminderungen**.
*   *Frage:* Wieviel weniger würde ein Käufer bezahlen, wenn er den Schaden kennt?
*   Oft orientiert sich der Abschlag an den Beseitigungskosten ("Cost-to-cure"), aber nicht immer 1:1. (Manchmal zieht der Markt mehr ab wegen "Ärger-Faktor").

## Typische Klassiker
1.  **Feuchter Keller:** Aufsteigende Feuchte (Horizontalsperre defekt) oder drückendes Wasser (Vertikalsperre defekt).
2.  **Schimmel:** Lüftungsproblem oder Wärmebrücke?
3.  **Risse:** Setzungsrisse (gefährlich) oder Putzrisse (kosmetisch)?
4.  **Asbest:** In Fassadenplatten, Bodenbelägen (Floor-Flex) oder Dächern (Eternit). Entsorgung teuer!
    `,
    law: [
      "§ 8 Abs. 3 ImmoWertV (boG)",
      "BKI Baukostenindex (als Hilfsmittel)"
    ],
    practice: `
# Praxis-Szenario: Die versteckten Kosten

Bei der Bewertung eines Mehrfamilienhauses (Baujahr 1960) stoßen Sie auf drei wesentliche Probleme.

## Mangel 1: Der Riss in der Fassade
- **Beobachtung:** Ein diagonaler Riss verläuft vom Sockel bis zum Fenster im 1. OG.
- **Analyse:** Setzungsriss oder thermischer Riss?
- **Bewertung:** Ein Setzungsriss deutet auf Probleme im Baugrund hin. Hier ist ein Baugrundgutachten erforderlich.
- **Wertansatz:** Da kein Gutachten vorliegt, müssen Sie einen Risikoabschlag vornehmen oder das Gutachten unter der aufschiebenden Bedingung erstellen, dass die Statik intakt ist.

## Mangel 2: Die Asbest-Fassade
- **Beobachtung:** Die Fassade ist mit Faserzementplatten verkleidet (typisch 1960er/70er).
- **Gefahr:** Asbestverdacht.
- **Wertansatz:** Die Entsorgungskosten sind erheblich.
    - Fläche: 400 m²
    - Entsorgungskosten: ca. 100 €/m² (inkl. Gerüst, Schutzmaßnahmen)
    - Wertminderung: 40.000 € (boG).

## Mangel 3: Veraltete Elektrik
- **Beobachtung:** Zweiadrige Leitungen, klassische Nullung.
- **Konsequenz:** Kein FI-Schalter möglich, Brandgefahr, kein Versicherungsschutz.
- **Wertansatz:** Komplettaustausch notwendig.
    - Kosten pro Wohneinheit (8 WE): ca. 8.000 €
    - Gesamtminderung: 64.000 €.

## Gesamtauswirkung auf den Ertragswert
Der vorläufige Ertragswert der Immobilie liegt bei 1.200.000 €.
Abzug boG (Summe): 40.000 € (Asbest) + 64.000 € (Elektrik) = 104.000 €.
(Der Riss wird gesondert betrachtet).

**Neuer Verkehrswert:** ca. 1.096.000 €.
    `,
    tasks: [
      {
        question: "Was ist der Unterschied zwischen 'Sanierungskosten' und 'Marktwertminderung'?",
        solution: "Sanierungskosten sind die technischen Kosten zur Behebung. Marktwertminderung ist der Betrag, den ein Käufer weniger zahlt. Oft identisch, aber bei 'Sowieso-Kosten' (alte Heizung geht kaputt) ist der Abzug geringer ('neu für alt'-Vorteil)."
      },
      {
        question: "Wie erkennen Sie Asbestverdacht bei Bodenbelägen?",
        solution: "Typische quadratische Vinyl-Platten ('Floor-Flex') aus den 60er/70er Jahren, oft grau/beige marmoriert, verklebt mit schwarzem bitumenhaltigem Kleber (der auch Asbest enthält)."
      },
      {
        question: "Was bedeutet 'neu für alt'?",
        solution: "Wenn durch eine Reparatur (z.B. neues Dach wegen Sturmschaden) der Wert des Hauses steigt, muss sich der Eigentümer diesen Vorteil anrechnen lassen. Er bekommt nicht 100% der Kosten ersetzt, wenn das alte Dach eh schon 50 Jahre alt war."
      },
      {
        question: "Warum sind diagonale Risse in der Fassade alarmierend?",
        solution: "Weil sie oft auf Setzungen des Fundaments hindeuten (statische Probleme), während vertikale oder horizontale Risse oft 'nur' thermische Spannungen oder Materialwechsel anzeigen."
      }
    ]
  },

  day_15: {
    title: "Spezialfälle: Rechte und Belastungen",
    type: "Berechnung",
    theory: `
# Rechte in Abteilung II

Lasten mindern den Wert. Aber um wieviel?

## 1. Das Wohnungsrecht (§ 1093 BGB)
Jemand darf lebenslang umsonst wohnen.
*   **Wertminderung = Barwert der entgangenen Miete.**
*   *Rechnung:* Jahresmiete × Leibrentenbarwertfaktor (abhängig vom Alter der Person und LZS).

## 2. Der Nießbrauch (§ 1030 BGB)
Jemand darf die Immobilie nutzen UND die Früchte ziehen (vermieten).
*   Wertminderung ist meist identisch mit dem gesamten Ertragswert der Immobilie für die Lebensdauer des Berechtigten.

## 3. Leibrentenbarwertfaktor
Kombination aus Zinseszins (Abzinsung) und Sterbewahrscheinlichkeit (Sterbetafel).
*   Je älter die Person, desto kleiner der Faktor (kürzere Restlebensdauer).
*   Je höher der Zins, desto kleiner der Faktor.
    `,
    law: [
      "§ 193 BauGB",
      "Sterbetafel (Statistisches Bundesamt)"
    ],
    practice: `
# Rechenbeispiel: Lebenslanges Wohnrecht

Frau Müller (75 Jahre, weiblich) verkauft ihr Haus an ihren Neffen, behält sich aber ein lebenslanges Wohnrecht vor.

## Datenbasis
- **Verkehrswert (lastenfrei):** 500.000 €
- **Marktübliche Miete (fiktiv):** 1.000 €/Monat (netto kalt) = 12.000 €/Jahr
- **Bewirtschaftungskosten (vom Eigentümer zu tragen):** 20% der Rohmiete = 2.400 €/Jahr
- **Reinertrag des Wohnrechts:** 12.000 € - 2.400 € = 9.600 €/Jahr
- **Liegenschaftszinssatz:** 3,5%

## Schritt 1: Leibrentenbarwertfaktor ermitteln
Wir nutzen die aktuelle Sterbetafel des Statistischen Bundesamtes.
- Alter 75, weiblich.
- Statistische Restlebenserwartung: ca. 12,5 Jahre.
- Barwertfaktor (Vervielfältiger) bei 3,5% Zins und Leibrente: **ca. 9,8** (fiktiver Wert für dieses Beispiel, genauen Wert aus Tabelle entnehmen).

## Schritt 2: Wert des Rechts
9.600 € (Jahreswert) × 9,8 (Faktor) = **94.080 €**.

## Schritt 3: Verkehrswert belastet
500.000 € - 94.080 € = **405.920 €**.

*Fazit:* Der Neffe zahlt rund 94.000 € weniger, hat aber eine Bewohnerin, die er nicht kündigen kann.
    `,
    tasks: [
      {
        question: "Was passiert, wenn die Wohnberechtigte ins Pflegeheim muss?",
        solution: "Das Wohnrecht bleibt bestehen, sofern nichts anderes vereinbart wurde. Oft kann sie die Räume dann vermieten (wenn gestattet) oder der Eigentümer kauft ihr das Recht ab (Kapitalabfindung). Eine automatische Löschung gibt es nicht."
      },
      {
        question: "Was ist eine 'Löschungsbewilligung'?",
        solution: "Die notarielle Erklärung des Berechtigten, dass das Recht im Grundbuch gelöscht werden darf. Ohne diese Urkunde bekommt man das Wohnrecht nicht aus dem Grundbuch, auch wenn die Oma ausgezogen ist."
      },
      {
        question: "Wie bewertet man ein Wegerecht für den belasteten Eigentümer?",
        solution: "Durch einen Abschlag auf den Bodenwert des betroffenen Grundstücksstreifens (z.B. 10-30% Wertminderung für die Fläche des Weges), da die Nutzung eingeschränkt ist (kein Bauen möglich, Lärmbelästigung)."
      },
      {
        question: "Mindert eine Grundschuld (Abt. III) den Verkehrswert?",
        solution: "Nein! Der Verkehrswert wird immer 'lastenfrei in Abt. III' ermittelt. Die Schulden werden beim Kaufpreisfluss abgelöst (Treuhandauftrag des Notars)."
      }
    ]
  },

  // ==================================================================================
  // WOCHE 5: SPEZIALIMMOBILIEN & DIGITALISIERUNG (Tag 16-20)
  // ==================================================================================

  day_16: {
    title: "Gewerbeimmobilien & DCF-Verfahren",
    type: "Spezial",
    theory: `
# Gewerbeimmobilien: Eine andere Welt

Büros, Handel und Logistik ticken anders als Wohnen.

## 1. Besonderheiten
*   **Drittverwendungsfähigkeit:** Kann das Gebäude leicht umgenutzt werden? (Büro -> Kanzlei: Ja. Kino -> Lager: Nein). Je spezieller, desto riskanter.
*   **Mietverträge:** Oft indexiert (VPI) und befristet (5-10 Jahre).
*   **Lage:** "1A-Lage" (Fußgängerzone) ist für Handel alles. Für Logistik zählt nur die Autobahn.

## 2. Discounted Cashflow (DCF)
Internationale Investoren nutzen oft das DCF-Verfahren statt des deutschen Ertragswertverfahrens.
*   **Prinzip:** Detaillierte Prognose aller Zahlungsströme (Cashflows) über 10 Jahre + Restwert (Exit) am Ende.
*   **Vorteil:** Flexibler (bildet Leerstand in Jahr 3 oder Investition in Jahr 7 ab).
*   **Nachteil:** Anfällig für Manipulationen (viele Annahmen).
    `,
    law: [
      "Gif-Richtlinien (Mietflächen)",
      "International Valuation Standards (IVS)"
    ],
    practice: `
# Übung: Ertragswert vs. DCF

**Szenario:** Ein Bürohaus steht 2 Jahre leer, dann wird es vermietet.

*   **Ertragswertverfahren:** Tut sich schwer mit temporärem Leerstand. Man rechnet mit "ewiger Vollauslastung" und zieht den Leerstand als "boG" ab.
*   **DCF-Verfahren:**
    *   Jahr 1: -50.000 € (Kosten, kein Ertrag)
    *   Jahr 2: -50.000 € (Kosten, kein Ertrag)
    *   Jahr 3: +200.000 € (Miete)
    *   ...
    *   Das Modell bildet die Realität exakter ab.

**Fazit:** Bei komplexen Cashflows ist DCF überlegen.
    `,
    tasks: [
      {
        question: "Was ist ein 'Anchor Tenant'?",
        solution: "Ein Ankermieter (z.B. großer Supermarkt im Einkaufszentrum), der Frequenz bringt und Kunden anzieht. Sein Vorhandensein stabilisiert den Wert des gesamten Objekts."
      },
      {
        question: "Warum ist der Liegenschaftszins bei Gewerbe höher als bei Wohnen?",
        solution: "Wegen des höheren Risikos (Leerstand, Konjunkturabhängigkeit, schnellere Veralterung). Investoren verlangen eine höhere Risikoprämie."
      },
      {
        question: "Was ist die 'Drittverwendungsfähigkeit'?",
        solution: "Die Flexibilität einer Immobilie, von verschiedenen Nutzern aus verschiedenen Branchen genutzt zu werden. Hohe Drittverwendungsfähigkeit (z.B. Standard-Büro) senkt das Risiko und erhöht den Wert."
      },
      {
        question: "Was ist der 'Terminal Value' im DCF?",
        solution: "Der prognostizierte Verkaufserlös am Ende des Betrachtungszeitraums (z.B. nach 10 Jahren). Er macht oft den Großteil des Gesamtbarwerts aus."
      }
    ]
  },

  day_17: {
    title: "Digitale Bewertungstools (AVM)",
    type: "Digital",
    theory: `
# Die Zukunft: Automatisierte Bewertung (AVM)

Computer bewerten schneller als Menschen. Aber besser?

## 1. AVM (Automated Valuation Model)
Algorithmen, die aus riesigen Datenbanken (Big Data) Preise schätzen.
*   *Anbieter:* Sprengnetter, PriceHubble, on-geo.
*   *Funktionsweise:* "Finde 50 ähnliche Häuser in der Umgebung und bilde einen statistischen Mittelwert."

## 2. Stärken & Schwächen
*   **Stärke:** Extrem schnell (Sekunden), günstig, gut für Standard-Objekte in Standard-Lagen (ETW in Berlin-Mitte).
*   **Schwäche:** Blind für den Innenzustand. Erkennt keinen Schimmel, keinen Luxus-Marmor, kein "Oma-Bad".
*   *Fazit:* Gut für eine erste Indikation, ungeeignet für gerichtsfeste Gutachten oder Spezialobjekte.
    `,
    law: [
      "MaRisk (Anforderungen an Banken)",
      "ImmoWertV (erfordert Marktanpassung)"
    ],
    practice: `
# Test: Mensch vs. Maschine

**Aufgabe:**
Nutzen Sie einen kostenlosen Online-Rechner (z.B. Homeday, McMakler) für Ihr eigenes Wohnhaus.

**Vergleich:**
*   Ergebnis Online-Tool: z.B. 450.000 € - 520.000 €.
*   Ihre eigene Rechnung (Sachwert): 410.000 €.

**Analyse:**
Warum die Abweichung? Das Tool kennt vielleicht nicht den Sanierungsstau im Keller oder die Lärmbelästigung durch die neue Umgehungsstraße.
Als Makler ist es Ihre Aufgabe, dem Kunden zu erklären, warum der "Computer-Preis" falsch ist.
    `,
    tasks: [
      {
        question: "Was bedeutet AVM?",
        solution: "Automated Valuation Model. Ein computergestütztes System zur statistischen Schätzung von Immobilienwerten."
      },
      {
        question: "Kann ein AVM ein Gutachten ersetzen?",
        solution: "Nein, nicht bei komplexen Fällen oder wenn Rechtssicherheit gefordert ist (Gericht, Finanzamt). Es fehlt die menschliche Plausibilisierung und die Berücksichtigung individueller Merkmale (Bauschäden, Rechte)."
      },
      {
        question: "Warum nutzen Banken AVMs?",
        solution: "Zur schnellen und kostengünstigen Einwertung von Standardkrediten (Kleindarlehen) oder zur laufenden Überwachung des Portfoliowerts (Re-Valuation)."
      },
      {
        question: "Was ist ein 'Hybrid-Gutachten'?",
        solution: "Eine Mischung aus AVM (Datenbasis) und menschlicher Expertise (Besichtigung durch Gutachter). Der Gutachter prüft den Zustand und korrigiert den Computer-Wert."
      }
    ]
  },

  day_18: {
    title: "Haftung & Berufsbild",
    type: "Recht",
    theory: `
# Haftung des Bewerters

Wer Werte schätzt, haftet für Fehler.

## 1. Vertragliche Haftung
Gegenüber dem Auftraggeber (z.B. Verkäufer).
*   Wenn das Gutachten grob falsch ist und der Verkäufer deshalb zu billig verkauft -> Schadensersatz (§ 280 BGB).

## 2. Haftung gegenüber Dritten
Gegenüber Käufern oder Banken.
*   Wenn das Gutachten erkennbar für Dritte bestimmt war (z.B. zur Vorlage bei der Bank) -> "Vertrag mit Schutzwirkung zugunsten Dritter".

## 3. Berufsbilder
*   **Freier Sachverständiger:** Begriff nicht geschützt. Jeder darf sich so nennen.
*   **Zertifizierter SV (ISO 17024):** Hoher Standard, prüfungspflichtig, europaweit anerkannt.
*   **Öffentlich bestellter und vereidigter (ö.b.u.v.) SV:** Die "Königsklasse". Von der IHK bestellt. Bevorzugt bei Gericht.
    `,
    law: [
      "§ 839a BGB (Haftung des gerichtlichen SV)",
      "GewO (Gewerbeordnung)"
    ],
    practice: `
# Praxistipp: Versicherung

Als Immobilienmakler, der auch Bewertungen anbietet ("Marktpreiseinschätzung"), sollten Sie prüfen, ob Ihre **Vermögensschadenhaftpflichtversicherung** dieses Risiko abdeckt.
Oft sind reine Gutachtertätigkeiten ausgeschlossen oder müssen extra versichert werden!

**Disclaimer:**
Schreiben Sie unter jede Bewertung:
*"Diese Marktpreiseinschätzung dient der Orientierung und ersetzt kein Verkehrswertgutachten nach § 194 BauGB durch einen zertifizierten Sachverständigen."*
    `,
    tasks: [
      {
        question: "Wer darf sich 'Sachverständiger' nennen?",
        solution: "Jeder. Der Begriff ist in Deutschland nicht geschützt. Das öffnet Tür und Tor für Scharlatane. Geschützt sind nur Titel wie 'ö.b.u.v. Sachverständiger' oder 'Zertifizierter Sachverständiger (DIA/Sprengnetter)'."
      },
      {
        question: "Wann verjährt die Haftung für ein fehlerhaftes Gutachten?",
        solution: "In der Regel nach 3 Jahren (regelmäßige Verjährung, § 195 BGB), beginnend am Ende des Jahres, in dem der Anspruch entstanden ist und der Gläubiger Kenntnis erlangt hat."
      },
      {
        question: "Was ist ein 'Gefälligkeitsgutachten'?",
        solution: "Ein Gutachten, das bewusst ein falsches Ergebnis liefert, um dem Auftraggeber zu gefallen (z.B. Wert künstlich hochrechnen für Bankfinanzierung). Das ist Betrug und kann strafrechtliche Folgen haben (§ 263 StGB)."
      },
      {
        question: "Warum ist die Unabhängigkeit des Gutachters so wichtig?",
        solution: "Weil der Wert objektiv sein muss. Wenn der Gutachter ein Erfolgshonorar bekommt (z.B. % vom ermittelten Wert), ist er befangen und das Gutachten wertlos."
      }
    ]
  },

  day_19: {
    title: "Abschlussprüfung & Fallstudie",
    type: "Prüfung",
    theory: `
# Die große Abschluss-Fallstudie

Wenden Sie alles an, was Sie gelernt haben.

## Fall: Das "Sorgenkind" in Spandau
*   **Objekt:** Einfamilienhaus, Baujahr 1975.
*   **Wohnfläche:** 120 m².
*   **Grundstück:** 800 m². BRW 300 €/m².
*   **Zustand:** Originalzustand (Heizung 1995, Fenster Holz 1-fach, Bad grün).
*   **Mangel:** Feuchter Keller (Sanierungskosten ca. 20.000 €).
*   **Recht:** Wegerecht für Hinterlieger am Rand (Fläche 50 m²).

## Aufgabe
Ermitteln Sie den Verkehrswert im Sachwertverfahren (grob).
    `,
    law: ["Alle Module"],
    practice: `
# Lösungsweg

1.  **Bodenwert:**
    800 m² × 300 €/m² = 240.000 €.
    Abschlag für Wegerecht (50 m² sind kaum nutzbar): z.B. 50% auf 50 m² = 25 m² × 300 € = 7.500 € Minderung.
    *Bodenwert neu:* 232.500 €.

2.  **Bauwert:**
    NHK (angepasst): ca. 1.400 €/m² (einfacher Standard).
    BGF (geschätzt): 250 m².
    Herstellungskosten: 350.000 €.
    Alter: 50 Jahre. GND 80. RND 30.
    Abschreibung: 50/80 = 62,5%.
    Zeitwert: 350.000 € × 37,5% = **131.250 €**.

3.  **Vorläufiger Sachwert:**
    232.500 € + 131.250 € = **363.750 €**.

4.  **Marktanpassung:**
    Faktor 0,9 (unsaniert, Spandau Randlage).
    363.750 € × 0,9 = **327.375 €**.

5.  **boG (Feuchter Keller):**
    Abzug Sanierungskosten (marktangepasst): -20.000 €.

**Verkehrswert:** 327.375 € - 20.000 € = **307.375 €**.
*(Gerundet: 307.000 €)*.
    `,
    tasks: [
      {
        question: "Welches Verfahren war hier führend?",
        solution: "Das Sachwertverfahren, da es sich um ein selbstgenutztes Einfamilienhaus handelt."
      },
      {
        question: "Wie wurde das Wegerecht berücksichtigt?",
        solution: "Durch einen Wertabschlag beim Bodenwert (Minderung der Nutzbarkeit des betroffenen Streifens)."
      },
      {
        question: "Warum ist der Sachwertfaktor hier < 1,0?",
        solution: "Weil unsanierte Häuser in Randlagen oft Abschläge hinnehmen müssen. Die Baukosten werden am Markt nicht voll bezahlt."
      }
    ]
  },

  day_20: {
    title: "Zertifikat & Karriere",
    type: "Abschluss",
    theory: `
# Herzlichen Glückwunsch!

Sie haben das Modul "Immobilienbewertung" abgeschlossen.

## Was Sie jetzt können:
1.  Den Unterschied zwischen Preis und Wert erklären.
2.  Die drei Verfahren (Vergleich, Ertrag, Sach) anwenden.
3.  Flächen und Baukosten grob prüfen.
4.  Bauschäden und Rechte wertmäßig einschätzen.
5.  Ein einfaches Gutachten lesen und auf Plausibilität prüfen.

## Ihr Mehrwert als Makler
*   **Einkauf:** Sie überzeugen Eigentümer mit Kompetenz statt mit falschen Versprechungen.
*   **Verkauf:** Sie können Preise gegenüber Käufern und Banken verteidigen.
*   **Haftung:** Sie erkennen Risiken (Wohnfläche, Asbest) frühzeitig.

## Der nächste Schritt
Starten Sie Ihre Karriere. Nutzen Sie das Wissen. Und bleiben Sie neugierig!
    `,
    law: ["Lebenslanges Lernen"],
    practice: `
# Ihre erste Bewertung

Gehen Sie raus. Suchen Sie sich ein Objekt (Freunde, Familie).
Bewerten Sie es schriftlich.
Nehmen Sie sich Zeit.
Vergleichen Sie es mit dem Markt.

*Übung macht den Meister.*
    `,
    tasks: [
      {
        question: "Wie oft sollten Sie sich fortbilden?",
        solution: "Laufend. Der Immobilienmarkt und die Gesetze (GEG, ImmoWertV) ändern sich ständig. § 34c GewO schreibt zudem 20 Stunden Fortbildung in 3 Jahren vor (für Makler und Verwalter)."
      },
      {
        question: "Wo finden Sie aktuelle Marktdaten?",
        solution: "Grundstücksmarktberichte der Gutachterausschüsse, Marktberichte der großen Maklerhäuser (JLL, CBRE, Engel & Völkers), IVD-Preisspiegel."
      }
    ]
  }
};
