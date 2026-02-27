import { contentDataModule4 } from "./Module4Content_Valuation";

// Wir erweitern die bestehenden Daten um massive Fallstudien für die Praxis-Tage
export const contentDataModule4Extended = {
  ...contentDataModule4,
  
  // Tag 13: Gutachtenaufbau - Erweiterte Praxis
  day_13: {
    ...contentDataModule4.day_13,
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

## 3. Gliederungs-Check
Prüfen Sie Ihr Gutachten auf Vollständigkeit gemäß § 194 BauGB:
- [ ] Deckblatt mit Stichtag
- [ ] Verwendete Unterlagen (Grundbuch, Flurkarte)
- [ ] Lagebeschreibung (Makro/Mikro)
- [ ] Bodenwertermittlung
- [ ] Verfahrenswahl & Begründung
- [ ] Sachwertermittlung
- [ ] Marktanpassung (Sachwertfaktor)
- [ ] boG (Bauschäden)
- [ ] Endergebnis (Verkehrswert)
    `
  },

  // Tag 14: Bauschäden - Deep Dive
  day_14: {
    ...contentDataModule4.day_14,
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

*Merke:* Bauschäden werden im Ertragswertverfahren NICHT über die Restnutzungsdauer abgebildet (das wäre doppelt gemoppelt), sondern als separater Abzug am Ende (boG).
    `
  },
  
  // Tag 15: Rechte und Belastungen - Wohnrecht Berechnung
  day_15: {
    ...contentDataModule4.day_15,
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

## Schritt 2: Kapitalwert des Wohnrechts berechnen
Formel: Jahreswert × Barwertfaktor
Rechnung: 9.600 € × 9,8 = **94.080 €**

## Schritt 3: Wert des belasteten Grundstücks
Verkehrswert (lastenfrei): 500.000 €
Abzug Wohnrecht: - 94.080 €
**Verkehrswert (belastet): 405.920 €**

## Variation: Nießbrauch
Hätte Frau Müller einen Nießbrauch, dürfte sie das Haus auch vermieten und die Miete behalten. Der Wertansatz wäre ähnlich, aber die rechtliche Position ist stärker. Beim Wohnrecht darf sie nur selbst darin wohnen (höchstens Aufnahme von Pflegepersonal).

**Aufgabe:** Berechnen Sie den Wert, wenn Frau Müller erst 65 Jahre alt wäre (Barwertfaktor ca. 14,5).
    `
  },
  
  // Tag 16: Erbbaurecht - Der Spezialfall
  day_16: {
    ...contentDataModule4.day_16,
    practice: `
# Fallstudie: Das Erbbaurecht verstehen

Ein Erbbaurecht trennt das Eigentum am Boden vom Eigentum am Gebäude.

## Situation
- **Erbbaurechtsgeber:** Kirche (Eigentümer des Bodens)
- **Erbbaurechtsnehmer:** Familie Schmidt (Eigentümer des Hauses)
- **Laufzeit:** noch 45 Jahre
- **Erbbauzins:** 2.500 €/Jahr (sehr günstig, da alt)
- **Marktüblicher Erbbauzins:** 4% vom Bodenwert (200.000 €) = 8.000 €/Jahr

## Bewertung des Erbbaurechts (Gebäudeanteil)
Der Wert für Familie Schmidt setzt sich zusammen aus:
1.  **Gebäudesachwert:** Was ist das Haus wert? (z.B. 300.000 €)
2.  **Bodenwertanteil:** Profitieren sie vom günstigen Zins?

### Berechnung des Zinsvorteils
- Marktüblicher Zins: 8.000 €
- Tatsächlicher Zins: 2.500 €
- **Vorteil:** 5.500 € pro Jahr!

Diesen Vorteil genießen sie noch 45 Jahre lang.
Barwertfaktor (45 Jahre, 4% Zins): ca. 20,7

Kapitalisierter Vorteil: 5.500 € × 20,7 = **113.850 €**

**Gesamtwert des Erbbaurechts:**
Gebäudewert (300.000 €) + Zinsvorteil (113.850 €) = **413.850 €**

## Fazit
Ein Erbbaurecht mit einem alten, niedrigen Erbbauzins kann sehr wertvoll sein! Wäre der Erbbauzins höher als marktüblich, müsste man einen Nachteil abziehen.
    `
  }
};
