// Maximalist Content for Module 3 (Verwalter) - Part 2 (Days 21-40)

export const contentDataModule3MaximalPart2 = {
  // Tag 21: Technische Verwaltung - Grundlagen
  day_21: {
    title: "Technische Verwaltung: Grundlagen & Pflichten",
    type: "Technik",
    theory: `
# Die technische Verwaltung: Werterhalt als oberstes Ziel

Neben der kaufmännischen Verwaltung ist die technische Betreuung essenziell, um den Wert der Immobilie zu sichern und Gefahren abzuwenden.

## 1. Instandhaltung vs. Instandsetzung
- **Instandhaltung (§ 13 WEG):** Maßnahmen zur Erhaltung des Soll-Zustandes (Wartung, Inspektion, Pflege). Ziel: Schäden vorbeugen.
- **Instandsetzung:** Maßnahmen zur Wiederherstellung des Soll-Zustandes (Reparatur nach Schaden). Ziel: Schäden beheben.
- **Modernisierung:** Maßnahmen zur Verbesserung des Zustandes über den ursprünglichen Standard hinaus (z.B. Dämmung, neuer Aufzug).

## 2. Verkehrssicherungspflichten
Der Verwalter muss dafür sorgen, dass vom Gemeinschaftseigentum keine Gefahr ausgeht.
- **Winterdienst:** Räumen und Streuen (oft an Hausmeister delegiert, aber Kontrollpflicht bleibt!).
- **Dachlawinen:** Warnschilder, Schneefanggitter.
- **Beleuchtung:** Ausreichende Beleuchtung in Treppenhaus und Wegen.
- **Spielplätze:** Regelmäßige TÜV-Prüfung der Geräte.
- **Bäume:** Regelmäßige Baumschau (Totholz entfernen).

## 3. Wartungsverträge
Wichtige technische Anlagen müssen regelmäßig gewartet werden:
- Aufzug (TÜV alle 2 Jahre, Wartung meist 4x jährlich).
- Heizung (jährlich vor der Heizperiode).
- Brandschutz (Rauchabzug, Feuerlöscher).
- Hebeanlagen / Pumpen.
- Rolltore (Tiefgarage).
    `,
    law: [
      "§ 823 BGB (Schadensersatzpflicht)",
      "§ 27 Abs. 1 Nr. 2 WEG (Instandhaltungspflicht des Verwalters)",
      "BetrSichV (Betriebssicherheitsverordnung)"
    ],
    practice: `
# Praxis-Check: Die Objektbegehung

Führen Sie mindestens einmal jährlich eine große Objektbegehung durch.

## Protokoll-Vorlage (Auszug):
| Bereich | Prüfpunkt | Zustand (OK / Mangel) | Maßnahme |
|---|---|---|---|
| **Dach** | Ziegel fest? Moosbewuchs? | Mangel (Ziegel lose) | Dachdecker beauftragen |
| **Fassade** | Risse? Abplatzungen? | OK | - |
| **Keller** | Feuchtigkeit? Geruch? | OK | - |
| **Heizung** | Wasserdruck? Letzte Wartung? | Mangel (Wartung fällig) | Firma Sanitär anrufen |
| **Außen** | Gehwegplatten stolperfrei? | Mangel (Wurzelaufbruch) | Angebot Gärtner einholen |

**Wichtig:** Dokumentieren Sie Mängel immer mit Fotos! Das dient Ihrer Entlastung, falls später etwas passiert.
    `,
    task: `
## Erstellen Sie einen Wartungsplan

Erstellen Sie eine Tabelle für eine Wohnanlage (20 Einheiten, Bj. 1995, Aufzug, Gas-Zentralheizung, Tiefgarage).

**Listen Sie auf:**
1.  Welche Gewerke müssen gewartet werden?
2.  In welchem Intervall (jährlich, halbjährlich)?
3.  Wer ist zuständig (Fachfirma oder Hausmeister)?
4.  Wann ist die nächste gesetzliche Prüfung (TÜV) fällig?
    `
  },

  // Tag 22: Die Eigentümerversammlung (Fortsetzung Technik)
  day_22: {
    title: "Beschlussfassung über Sanierungen",
    type: "Technik & Recht",
    theory: `
# Sanierungsbeschlüsse rechtssicher fassen

Große Sanierungen (z.B. neues Dach für 100.000 €) sind oft streitanfällig. Umso wichtiger ist die korrekte Vorbereitung.

## 1. Die drei Angebote
Der Verwalter muss grundsätzlich **drei vergleichbare Angebote** einholen (§ 27 WEG Grundsatz ordnungsmäßiger Verwaltung).
- Die Angebote müssen dem Einladungsschreiben beigefügt oder zumindest in der Versammlung detailliert vorgestellt werden.
- Ausnahme: Bei kleineren Maßnahmen oder Eilbedürftigkeit kann weniger reichen.

## 2. Der Beschlussantrag
Der Antrag muss so formuliert sein, dass er aus sich heraus verständlich ist ("Bestimmtheitsgrundsatz").
- *Falsch:* "Wir sanieren das Dach."
- *Richtig:* "Die WEG beschließt die Sanierung des Daches gemäß Angebot der Firma Müller vom 12.01.2024 über eine Bruttosumme von 50.000 €. Die Finanzierung erfolgt durch Entnahme aus der Erhaltungsrücklage."

## 3. Finanzierung
Kein Beschluss ohne Finanzierung!
- **Option A:** Aus laufenden Mitteln (nur bei Kleinigkeiten).
- **Option B:** Entnahme aus der Erhaltungsrücklage (wenn genug Geld da ist).
- **Option C:** Sonderumlage (Eigentümer müssen extra zahlen).
    `,
    law: [
      "§ 19 WEG (Wirkung des Urteils)",
      "§ 21 WEG (Nutzungen und Kosten)",
      "§ 28 WEG (Wirtschaftsplan, Jahresabrechnung)"
    ],
    practice: `
# Fallstudie: Die Heizung fällt aus

Im Winter (Minus 10 Grad) fällt die Heizung komplett aus. Eine Reparatur ist nicht möglich, der Kessel ist durchgerostet.

## Problem:
Eine ETV einzuberufen dauert 3 Wochen (Ladungsfrist). Die Eigentümer frieren JETZT.

## Lösung: Notgeschäftsführung (§ 27 Abs. 1 Nr. 3 WEG)
Der Verwalter darf (und muss!) in dringenden Fällen ohne Beschluss handeln, um Schaden abzuwenden.
1.  **Auftrag erteilen:** Sofort Heizungsbauer beauftragen.
2.  **Informieren:** Eigentümer per E-Mail informieren.
3.  **Genehmigen:** Auf der nächsten ETV den Notfall-Auftrag genehmigen lassen (nicht zwingend nötig für die Wirksamkeit, aber gut für den Frieden).
    `,
    task: `
## Formulieren Sie einen Beschlussantrag

Thema: Austausch der Fenster im Treppenhaus.
Angebot A: 10.000 € (Holz)
Angebot B: 8.000 € (Kunststoff)
Angebot C: 12.000 € (Alu)

Die Eigentümer wollen Angebot B. Die Rücklage beträgt nur 5.000 €. Der Rest (3.000 €) soll per Sonderumlage erhoben werden.

**Formulieren Sie den kompletten Beschluss für das Protokoll!**
    `
  }
  
  // ... (Fortsetzung für alle Tage 21-40)
};
