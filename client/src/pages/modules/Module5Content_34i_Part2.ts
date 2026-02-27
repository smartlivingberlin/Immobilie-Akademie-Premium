// Modul 5: Darlehensvermittlung §34i GewO
// Teil 2: Tage 6-10 (Theorie)

export const contentDataModule5_34i_Part2: Record<string, {
  title: string;
  theory: string;
  extendedTheory?: string;
  law: string[];
  practice: string;
  task: string;
  solution?: string;
  type?: string;
}> = {

  day_6: {
    title: "Verhaltens- und Informationspflichten als Immobiliardarlehensvermittler",
    theory: `Als Immobiliardarlehensvermittler unterliegen Sie strengen Verhaltens- und Informationspflichten nach §34i Abs. 3 GewO und §511 BGB. Sie müssen den Kunden umfassend über das Darlehen, die Kosten, Risiken und Alternativen informieren. Die Beratung muss kundengerecht, objektiv und nachvollziehbar sein. Sie sind verpflichtet, die finanzielle Situation des Kunden zu prüfen (Bonitätsprüfung) und nur geeignete Darlehen zu empfehlen. Die Beratung muss dokumentiert werden (Beratungsprotokoll), das der Kunde unterschreibt. Verstöße gegen diese Pflichten können zu Schadensersatzansprüchen, Bußgeldern bis 50.000 € und Erlaubnisentzug führen. Die Weiterbildungspflicht beträgt 15 Stunden pro Jahr.`,
    extendedTheory: `**Verhaltens- und Informationspflichten im Detail:**

**1. Informationspflichten (§ 491a BGB, § 511 BGB):**

**Vorvertragliche Informationen:**
Vor Vertragsschluss müssen Sie dem Kunden folgende Informationen übergeben:

**ESIS-Merkblatt (Europäisches Standardisiertes Merkblatt):**
- Standardisiertes Formular mit allen wichtigen Vertragsinformationen
- Muss mindestens 7 Tage vor Vertragsschluss übergeben werden
- Inhalt: Darlehensgeber, Nettodarlehensbetrag, Laufzeit, Zinssatz, Rate, Gesamtbetrag, Besicherung, Widerrufsrecht, Risiken

**Zusätzliche Informationen:**
- Provisionsvereinbarung (wer zahlt die Provision?)
- Interessenkonflikte (arbeiten Sie nur mit bestimmten Banken zusammen?)
- Beschwerdemöglichkeiten (Schlichtungsstellen)

**Zeitpunkt:**
- Rechtzeitig vor Vertragsschluss
- In Textform (Papier oder E-Mail)
- Kostenlos

---

**2. Beratungspflichten (§ 511 BGB):**

**Umfassende Beratung:**
Sie müssen den Kunden umfassend beraten und dabei folgende Aspekte berücksichtigen:

**Bedarfsanalyse:**
- Finanzielle Situation (Einkommen, Ausgaben, Vermögen, Schulden)
- Familiensituation (verheiratet, Kinder, Unterhaltspflichten)
- Berufliche Situation (Angestellter, Selbstständiger, befristet/unbefristet)
- Zukunftspläne (Kinder, Ruhestand, Jobwechsel)
- Risikobereitschaft (konservativ, moderat, risikofreudig)

**Produktauswahl:**
- Geeignete Darlehensprodukte auswählen (Annuitätendarlehen, Tilgungsdarlehen, Bauspardarlehen)
- Alternativen aufzeigen (verschiedene Banken, Zinssätze, Laufzeiten)
- Vor- und Nachteile erklären

**Risikoaufklärung:**
- Zinsänderungsrisiko (nach Zinsbindung)
- Zahlungsunfähigkeitsrisiko (Jobverlust, Krankheit)
- Zwangsversteigerungsrisiko
- Vorfälligkeitsentschädigung bei vorzeitiger Rückzahlung

**Kostenaufklärung:**
- Zinsen
- Gebühren (Bearbeitungsgebühr, Schätzgebühr, Notarkosten)
- Provision
- Gesamtkosten (effektiver Jahreszins)

---

**3. Dokumentationspflichten (§ 511 BGB):**

**Beratungsprotokoll:**
Sie müssen die Beratung schriftlich dokumentieren und dem Kunden aushändigen. Das Beratungsprotokoll muss enthalten:

**Kundendaten:**
- Name, Adresse, Geburtsdatum
- Familienstand, Anzahl Kinder
- Beruf, Arbeitgeber

**Finanzielle Situation:**
- Monatliches Nettoeinkommen
- Monatliche Ausgaben (Miete, Lebenshaltung, Versicherungen)
- Vermögen (Eigenkapital, Sparguthaben)
- Schulden (bestehende Kredite)

**Bedarfsanalyse:**
- Zweck des Darlehens (Kauf, Bau, Modernisierung)
- Gewünschter Darlehensbetrag
- Gewünschte Laufzeit
- Gewünschte Zinsbindung

**Produktempfehlung:**
- Empfohlenes Darlehensprodukt
- Begründung der Empfehlung
- Alternativen, die geprüft wurden
- Vor- und Nachteile

**Risikoaufklärung:**
- Zinsänderungsrisiko
- Zahlungsunfähigkeitsrisiko
- Zwangsversteigerungsrisiko

**Unterschrift:**
- Kunde und Berater unterschreiben das Protokoll
- Kunde erhält eine Kopie

**Aufbewahrungspflicht:**
- 10 Jahre (§ 257 HGB)

---

**4. Geeignetheitsprüfung (§ 511 BGB):**

**Tragfähigkeit der Finanzierung:**
Sie müssen prüfen, ob der Kunde das Darlehen zurückzahlen kann. Dazu müssen Sie:

**Einnahmen prüfen:**
- Gehalt (Netto, nach Steuern und Sozialabgaben)
- Mieteinnahmen (bei Vermietung)
- Sonstige Einnahmen (Kindergeld, Rente)

**Ausgaben prüfen:**
- Lebenshaltungskosten (Pauschale: 800-1.200 € pro Person)
- Miete (falls noch nicht Eigentümer)
- Versicherungen (Krankenversicherung, Haftpflicht, Lebensversicherung)
- Bestehende Kredite (Raten)

**Haushaltsrechnung:**
- Einnahmen - Ausgaben = Verfügbares Einkommen
- Verfügbares Einkommen muss mindestens 120% der Darlehensrate betragen (Sicherheitspuffer)

**Beispiel:**
- Nettoeinkommen: 4.000 €
- Lebenshaltung: 1.500 €
- Versicherungen: 300 €
- Bestehende Kredite: 500 €
- **Verfügbares Einkommen:** 4.000 € - 1.500 € - 300 € - 500 € = 1.700 €
- **Maximale Darlehensrate:** 1.700 € / 1,2 = 1.417 €

**Beleihungsauslauf:**
- Darlehensbetrag / Immobilienwert ≤ 80% (empfohlen)
- Beispiel: 300.000 € Darlehen / 400.000 € Immobilienwert = 75% (OK)

---

**5. Interessenkonflikte offenlegen:**

**Provisionsvereinbarung:**
Sie müssen dem Kunden mitteilen, wer Ihre Provision zahlt:
- Kunde zahlt Provision (z.B. 1% des Darlehensbetrags)
- Bank zahlt Provision (z.B. 0,5% des Darlehensbetrags)
- Beide zahlen Provision

**Bankbindung:**
Wenn Sie nur mit bestimmten Banken zusammenarbeiten, müssen Sie das offenlegen:
- "Ich arbeite mit 10 Banken zusammen"
- "Ich arbeite ausschließlich mit der Sparkasse zusammen"

**Eigene Beteiligung:**
Wenn Sie an einer Bank beteiligt sind, müssen Sie das offenlegen.

---

**6. Weiterbildungspflicht (§ 34i Abs. 4 GewO):**

**15 Stunden pro Jahr:**
- Seminare, Webinare, Fachtagungen
- Themen: Recht, Finanzierung, Beratung, Produktkunde
- Nachweis durch Teilnahmebescheinigung

**Zweck:**
- Aktuelle Rechtsprechung
- Neue Produkte
- Verbraucherschutz

---

**7. Sanktionen bei Verstößen:**

**Bußgeld (§ 144 GewO):**
- Bis 50.000 € bei Verstoß gegen Informations- oder Beratungspflichten

**Erlaubnisentzug (§ 35 GewO):**
- Bei schweren oder wiederholten Verstößen

**Schadensersatz (§ 280 BGB):**
- Kunde kann Schadensersatz fordern, wenn er durch fehlerhafte Beratung einen Schaden erlitten hat
- Beispiel: Kunde schließt zu teures Darlehen ab, weil Berater günstigere Alternativen nicht genannt hat

**Strafrechtliche Verfolgung:**
- Bei Betrug (§ 263 StGB) oder Untreue (§ 266 StGB)`,
    law: [
      "§ 34i Abs. 3 GewO (Verhaltens- und Informationspflichten)",
      "§ 511 BGB (Beratungs- und Dokumentationspflichten)",
      "§ 491a BGB (Informationspflichten)",
      "§ 34i Abs. 4 GewO (Weiterbildungspflicht)",
      "§ 144 GewO (Bußgeldvorschriften)",
      "§ 35 GewO (Erlaubnisentzug)",
      "§ 280 BGB (Schadensersatz)",
      "§ 257 HGB (Aufbewahrungspflicht)"
    ],
    practice: `**Praxisfall 1: Beratungsprotokoll erstellen**

Ein Kunde (35 Jahre, verheiratet, 2 Kinder) möchte eine Eigentumswohnung für 350.000 € kaufen. Er hat 70.000 € Eigenkapital und verdient 4.500 € netto/Monat. Seine Frau verdient 2.500 € netto/Monat. Die monatlichen Ausgaben betragen 3.000 €.

**Fragen:**
1. Welche Informationen müssen Sie im Beratungsprotokoll dokumentieren?
2. Ist die Finanzierung tragfähig?
3. Wie hoch darf die maximale Darlehensrate sein?
4. Welches Darlehensprodukt empfehlen Sie?
5. Welche Risiken müssen Sie aufklären?

---

**Praxisfall 2: Interessenkonflikt offenlegen**

Sie arbeiten als Immobiliardarlehensvermittler und erhalten von der Sparkasse eine Provision von 1% des Darlehensbetrags. Ein Kunde fragt Sie, ob Sie unabhängig beraten oder nur mit bestimmten Banken zusammenarbeiten.

**Fragen:**
1. Müssen Sie dem Kunden mitteilen, dass Sie eine Provision erhalten?
2. Müssen Sie offenlegen, wie hoch die Provision ist?
3. Müssen Sie offenlegen, von welcher Bank Sie die Provision erhalten?
4. Dürfen Sie dem Kunden ein teureres Darlehen empfehlen, um eine höhere Provision zu erhalten?
5. Was passiert, wenn Sie den Interessenkonflikt nicht offenlegen?

---

**Praxisfall 3: Weiterbildungspflicht**

Sie haben im letzten Jahr nur 10 Stunden Weiterbildung absolviert (statt der vorgeschriebenen 15 Stunden). Die IHK führt eine Kontrolle durch und stellt den Verstoß fest.

**Fragen:**
1. Haben Sie gegen die Weiterbildungspflicht verstoßen?
2. Welche Sanktionen drohen?
3. Können Sie die fehlenden 5 Stunden nachholen?
4. Wie weisen Sie die Weiterbildung nach?
5. Welche Themen sind für die Weiterbildung relevant?`,
    task: `**Aufgabe 1: Beratungsprotokoll erstellen**

Erstellen Sie ein Beratungsprotokoll für folgende Situation:
- Kunde: Max Mustermann, 40 Jahre, verheiratet, 1 Kind
- Einkommen: 5.000 € netto/Monat (Kunde) + 3.000 € netto/Monat (Ehefrau)
- Ausgaben: 3.500 €/Monat
- Eigenkapital: 80.000 €
- Kaufpreis Immobilie: 400.000 €
- Gewünschtes Darlehen: 320.000 €
- Empfohlenes Produkt: Annuitätendarlehen, 3,5% Zinsen, 30 Jahre Laufzeit

---

**Aufgabe 2: Tragfähigkeit prüfen**

Prüfen Sie die Tragfähigkeit folgender Finanzierung:
- Nettoeinkommen: 6.000 €/Monat
- Lebenshaltung: 2.000 €/Monat
- Versicherungen: 400 €/Monat
- Bestehende Kredite: 300 €/Monat
- Gewünschte Darlehensrate: 2.000 €/Monat

Ist die Finanzierung tragfähig? (Sicherheitspuffer 120%)

---

**Aufgabe 3: Risikoaufklärung formulieren**

Formulieren Sie eine Risikoaufklärung für einen Kunden, der ein Annuitätendarlehen mit 10 Jahren Zinsbindung aufnehmen möchte. Berücksichtigen Sie:
- Zinsänderungsrisiko nach 10 Jahren
- Zahlungsunfähigkeitsrisiko bei Jobverlust
- Zwangsversteigerungsrisiko
- Vorfälligkeitsentschädigung bei vorzeitiger Rückzahlung`,
    solution: `**Lösung Praxisfall 1:**
1. Beratungsprotokoll muss enthalten: Kundendaten, finanzielle Situation, Bedarfsanalyse, Produktempfehlung, Risikoaufklärung, Unterschrift.
2. Ja, die Finanzierung ist tragfähig. Verfügbares Einkommen: (4.500 € + 2.500 €) - 3.000 € = 4.000 €. Maximale Rate: 4.000 € / 1,2 = 3.333 €.
3. Maximale Darlehensrate: 3.333 €/Monat.
4. Empfehlung: Annuitätendarlehen 280.000 € (350.000 € - 70.000 €), 3,5% Zinsen, 25 Jahre Laufzeit, monatliche Rate ca. 1.400 €.
5. Risiken: Zinsänderung nach Zinsbindung, Jobverlust, Zwangsversteigerung, Vorfälligkeitsentschädigung.

**Lösung Praxisfall 2:**
1. Ja, Sie müssen dem Kunden mitteilen, dass Sie eine Provision erhalten (§ 511 BGB).
2. Ja, Sie müssen die Höhe der Provision offenlegen (z.B. "1% des Darlehensbetrags").
3. Ja, Sie müssen offenlegen, von welcher Bank Sie die Provision erhalten.
4. Nein, Sie dürfen dem Kunden nur geeignete Darlehen empfehlen, nicht das teuerste (§ 511 BGB).
5. Schadensersatzansprüche des Kunden (§ 280 BGB), Bußgeld bis 50.000 € (§ 144 GewO), Erlaubnisentzug (§ 35 GewO).

**Lösung Praxisfall 3:**
1. Ja, Sie haben gegen die Weiterbildungspflicht verstoßen (§ 34i Abs. 4 GewO).
2. Bußgeld bis 50.000 € (§ 144 GewO), Erlaubnisentzug bei wiederholten Verstößen (§ 35 GewO).
3. Ja, Sie können die fehlenden 5 Stunden nachholen, aber der Verstoß bleibt bestehen.
4. Nachweis durch Teilnahmebescheinigungen von Seminaren, Webinaren, Fachtagungen.
5. Relevante Themen: Recht, Finanzierung, Beratung, Produktkunde, Verbraucherschutz.

**Lösung Aufgabe 1 - Beratungsprotokoll:**

**Beratungsprotokoll Immobiliardarlehensvermittlung**

**Kundendaten:**
- Name: Max Mustermann
- Geburtsdatum: 01.01.1986
- Familienstand: Verheiratet, 1 Kind
- Beruf: Angestellter

**Finanzielle Situation:**
- Nettoeinkommen Kunde: 5.000 €/Monat
- Nettoeinkommen Ehefrau: 3.000 €/Monat
- Gesamteinkommen: 8.000 €/Monat
- Monatliche Ausgaben: 3.500 €
- Eigenkapital: 80.000 €
- Bestehende Schulden: Keine

**Bedarfsanalyse:**
- Zweck: Kauf Eigentumswohnung
- Kaufpreis: 400.000 €
- Gewünschter Darlehensbetrag: 320.000 €
- Gewünschte Laufzeit: 30 Jahre
- Gewünschte Zinsbindung: 15 Jahre

**Produktempfehlung:**
- Annuitätendarlehen 320.000 €
- Sollzinssatz: 3,5% p.a. (fest für 15 Jahre)
- Laufzeit: 30 Jahre
- Monatliche Rate: 1.600 €
- Gesamtbetrag: 576.000 €

**Begründung:**
- Tragfähigkeit gegeben (verfügbares Einkommen 4.500 €, maximale Rate 3.750 €)
- Zinssicherheit für 15 Jahre
- Planbare monatliche Rate

**Alternativen geprüft:**
- Tilgungsdarlehen (höhere Anfangsrate)
- Bauspardarlehen (längere Ansparphase)

**Risikoaufklärung:**
- Zinsänderungsrisiko nach 15 Jahren
- Zahlungsunfähigkeitsrisiko bei Jobverlust
- Zwangsversteigerungsrisiko
- Vorfälligkeitsentschädigung bei vorzeitiger Rückzahlung

**Unterschrift:**
[Datum, Unterschrift Kunde, Unterschrift Berater]

**Lösung Aufgabe 2 - Tragfähigkeit:**

**Haushaltsrechnung:**
- Nettoeinkommen: 6.000 €
- Lebenshaltung: 2.000 €
- Versicherungen: 400 €
- Bestehende Kredite: 300 €
- **Verfügbares Einkommen:** 6.000 € - 2.000 € - 400 € - 300 € = 3.300 €

**Maximale Darlehensrate (mit 120% Sicherheitspuffer):**
- 3.300 € / 1,2 = 2.750 €

**Gewünschte Darlehensrate:** 2.000 €

**Ergebnis:** Ja, die Finanzierung ist tragfähig (2.000 € < 2.750 €).

**Lösung Aufgabe 3 - Risikoaufklärung:**

**Risikoaufklärung Annuitätendarlehen**

**Zinsänderungsrisiko:**
Nach Ablauf der 10-jährigen Zinsbindung kann sich der Zinssatz ändern. Bei steigenden Zinsen erhöht sich Ihre monatliche Rate. Beispiel: Bei einem Anstieg von 3,5% auf 5,0% erhöht sich die Rate um ca. 20%.

**Zahlungsunfähigkeitsrisiko:**
Bei Jobverlust, Krankheit oder anderen unvorhergesehenen Ereignissen können Sie möglicherweise die Raten nicht mehr zahlen. Dies kann zur Kündigung des Darlehens und zur Zwangsversteigerung der Immobilie führen. Empfehlung: Risikolebensversicherung, Berufsunfähigkeitsversicherung.

**Zwangsversteigerungsrisiko:**
Wenn Sie die Raten nicht mehr zahlen können, kann die Bank die Immobilie zwangsversteigern lassen. Der Erlös wird zur Tilgung des Darlehens verwendet. Wenn der Erlös nicht ausreicht, bleiben Sie auf der Restschuld sitzen.

**Vorfälligkeitsentschädigung:**
Wenn Sie das Darlehen vor Ablauf der Zinsbindung zurückzahlen möchten (z.B. bei Verkauf der Immobilie), kann die Bank eine Vorfälligkeitsentschädigung verlangen. Diese kann mehrere Tausend Euro betragen.

**Empfehlung:**
- Bilden Sie Rücklagen für unvorhergesehene Ausgaben (mindestens 3 Monatsraten)
- Schließen Sie Versicherungen ab (Risikolebensversicherung, Berufsunfähigkeitsversicherung)
- Prüfen Sie regelmäßig Ihre finanzielle Situation`,
    type: "Theorie"
  },

  day_7: {
    title: "Kreditwesengesetz (KWG) und Geldwäschegesetz (GwG)",
    theory: `Das Kreditwesengesetz (KWG) regelt die Aufsicht über Kreditinstitute und Finanzdienstleister. Als Immobiliardarlehensvermittler sind Sie kein Kreditinstitut, unterliegen aber bestimmten Meldepflichten. Das Geldwäschegesetz (GwG) verpflichtet Sie zur Identifizierung Ihrer Kunden (Know-Your-Customer-Prinzip), zur Aufbewahrung von Unterlagen und zur Meldung verdächtiger Transaktionen. Sie müssen die Identität des Kunden anhand eines amtlichen Ausweises prüfen, die Herkunft der Mittel klären und verdächtige Transaktionen der Financial Intelligence Unit (FIU) melden. Verstöße gegen das GwG können zu Bußgeldern bis 1 Mio. € oder 10% des Jahresumsatzes führen. Die Aufbewahrungspflicht beträgt 5 Jahre.`,
    extendedTheory: `**Kreditwesengesetz (KWG) und Geldwäschegesetz (GwG) im Detail:**

**1. Kreditwesengesetz (KWG):**

**Anwendungsbereich:**
Das KWG regelt die Aufsicht über:
- Kreditinstitute (Banken, Sparkassen)
- Finanzdienstleister (Vermögensverwalter, Anlageberater)
- Zahlungsinstitute (PayPal, Klarna)

**Immobiliardarlehensvermittler:**
Sie sind kein Kreditinstitut nach KWG, da Sie keine Einlagen entgegennehmen und keine Kredite vergeben. Sie sind aber Finanzdienstleister und unterliegen bestimmten Meldepflichten.

**Meldepflichten:**
- Verdacht auf Geldwäsche (§ 43 GwG)
- Verdacht auf Terrorismusfinanzierung (§ 43 GwG)

**Aufsicht:**
- BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht)
- IHK (Industrie- und Handelskammer) für §34i-Erlaubnis

---

**2. Geldwäschegesetz (GwG):**

**Zweck:**
Das GwG soll verhindern, dass Gelder aus Straftaten (z.B. Drogenhandel, Korruption, Steuerhinterziehung) in den legalen Wirtschaftskreislauf gelangen.

**Verpflichtete nach § 2 GwG:**
- Kreditinstitute
- Finanzdienstleister
- **Immobiliardarlehensvermittler (§ 2 Abs. 1 Nr. 7 GwG)**
- Rechtsanwälte, Notare
- Immobilienmakler

---

**3. Sorgfaltspflichten (§§ 10-17 GwG):**

**Identifizierung des Kunden (§ 11 GwG):**

**Natürliche Personen:**
- Name, Vorname
- Geburtsdatum, Geburtsort
- Staatsangehörigkeit
- Wohnanschrift
- **Nachweis:** Personalausweis, Reisepass

**Juristische Personen:**
- Firma, Rechtsform
- Registernummer (Handelsregister)
- Sitz, Geschäftsanschrift
- Vertretungsberechtigte Personen
- **Nachweis:** Handelsregisterauszug, Gewerbeanmeldung

**Wirtschaftlich Berechtigter (§ 3 GwG):**
Bei juristischen Personen müssen Sie auch den wirtschaftlich Berechtigten identifizieren:
- Person, die mehr als 25% der Anteile hält
- Person, die die Kontrolle ausübt

**Zeitpunkt:**
- Vor Begründung der Geschäftsbeziehung
- Spätestens bei Vertragsschluss

**Methoden:**
- **Persönliche Anwesenheit:** Kunde zeigt Ausweis, Sie kopieren ihn
- **Videoident:** Kunde identifiziert sich per Videoanruf
- **Postident:** Kunde identifiziert sich bei der Post

---

**4. Herkunft der Mittel klären (§ 11 Abs. 5 GwG):**

**Fragen:**
- Woher stammt das Eigenkapital?
- Aus welcher Quelle stammen die Mittel?
- Gibt es Schenkungen, Erbschaften?

**Nachweise:**
- Kontoauszüge (Nachweis Eigenkapital)
- Schenkungsvertrag (bei Schenkung)
- Erbschein (bei Erbschaft)
- Gehaltsabrechnungen (bei Ansparung)

**Verdächtige Transaktionen:**
- Barzahlungen über 10.000 € (§ 16 GwG)
- Ungewöhnlich hohe Beträge ohne plausible Erklärung
- Kunde verweigert Auskunft über Herkunft der Mittel

---

**5. Risikobasierter Ansatz (§ 10 GwG):**

**Risikoklassifizierung:**
Sie müssen das Geldwäscherisiko jedes Kunden bewerten:

**Geringes Risiko:**
- Inländischer Kunde
- Transparente Einkommensverhältnisse
- Plausible Herkunft der Mittel
- **Maßnahmen:** Standardidentifizierung

**Erhöhtes Risiko:**
- Politisch exponierte Person (PEP) - z.B. Politiker, hohe Beamte
- Kunde aus Hochrisikoland (z.B. Afghanistan, Nordkorea)
- Barzahlungen über 10.000 €
- Komplexe Eigentümerstrukturen (verschachtelte GmbHs)
- **Maßnahmen:** Verstärkte Sorgfaltspflichten (§ 15 GwG)

**Politisch exponierte Personen (PEP):**
- Regierungsmitglieder, Parlamentsabgeordnete
- Richter oberster Gerichte
- Botschafter
- Vorstände staatlicher Unternehmen
- **Besonderheit:** Zustimmung der Geschäftsleitung erforderlich

---

**6. Aufbewahrungspflichten (§ 8 GwG):**

**Unterlagen:**
- Kopie Personalausweis
- Vertragsunterlagen
- Beratungsprotokoll
- Nachweise Herkunft der Mittel

**Dauer:**
- 5 Jahre nach Beendigung der Geschäftsbeziehung

**Form:**
- Papier oder elektronisch
- Zugriff muss jederzeit möglich sein

---

**7. Meldepflichten (§ 43 GwG):**

**Verdachtsmeldung:**
Wenn Sie Anhaltspunkte haben, dass Gelder aus Straftaten stammen oder zur Terrorismusfinanzierung dienen, müssen Sie dies der **Financial Intelligence Unit (FIU)** melden.

**Anhaltspunkte:**
- Kunde verweigert Auskunft über Herkunft der Mittel
- Barzahlungen über 10.000 € ohne plausible Erklärung
- Kunde möchte Identität verschleiern
- Transaktionen passen nicht zum Kundenprofil

**Meldung:**
- Elektronisch über goAML-Portal (www.fiu.bund.de)
- Unverzüglich (ohne schuldhaftes Zögern)
- Vertraulich (Kunde darf nicht informiert werden - § 47 GwG)

**Rechtsfolgen:**
- Keine Haftung bei gutgläubiger Meldung (§ 46 GwG)
- Straffreiheit bei Anzeige (§ 261 StGB)

---

**8. Interne Sicherungsmaßnahmen (§ 6 GwG):**

**Geldwäschebeauftragter:**
- Ab 3 Mitarbeitern erforderlich
- Überwacht Einhaltung des GwG
- Erstellt Risikoanalyse
- Schult Mitarbeiter

**Risikoanalyse:**
- Bewertung der Geldwäscherisiken
- Jährliche Aktualisierung
- Dokumentation

**Schulung:**
- Mitarbeiter müssen geschult werden
- Mindestens 1x jährlich
- Themen: GwG, Identifizierung, Verdachtsmeldung

---

**9. Sanktionen bei Verstößen:**

**Bußgeld (§ 56 GwG):**
- Bis 1.000.000 € oder
- Bis 10% des Jahresumsatzes
- Bei schweren Verstößen

**Straftat (§ 261 StGB - Geldwäsche):**
- Freiheitsstrafe bis 5 Jahre oder Geldstrafe
- Bei Kenntnis der Herkunft aus Straftaten

**Erlaubnisentzug (§ 35 GewO):**
- Bei wiederholten oder schweren Verstößen

---

**10. Praxisbeispiele:**

**Beispiel 1: Barzahlung**
Kunde möchte 50.000 € Eigenkapital in bar einzahlen.
- **Maßnahme:** Herkunft klären, bei Verdacht Meldung an FIU

**Beispiel 2: PEP**
Kunde ist Bürgermeister einer Großstadt.
- **Maßnahme:** Verstärkte Sorgfaltspflichten, Zustimmung Geschäftsleitung

**Beispiel 3: Ausländischer Kunde**
Kunde aus Dubai möchte Immobilie in Deutschland kaufen.
- **Maßnahme:** Herkunft der Mittel klären, wirtschaftlich Berechtigten identifizieren`,
    law: [
      "KWG (Kreditwesengesetz)",
      "§ 2 GwG (Verpflichtete)",
      "§§ 10-17 GwG (Sorgfaltspflichten)",
      "§ 11 GwG (Identifizierung)",
      "§ 15 GwG (Verstärkte Sorgfaltspflichten)",
      "§ 8 GwG (Aufbewahrungspflichten)",
      "§ 43 GwG (Meldepflichten)",
      "§ 6 GwG (Interne Sicherungsmaßnahmen)",
      "§ 56 GwG (Bußgeldvorschriften)",
      "§ 261 StGB (Geldwäsche)"
    ],
    practice: `**Praxisfall 1: Identifizierung**

Ein Kunde möchte ein Darlehen aufnehmen. Er zeigt Ihnen seinen Personalausweis (gültig bis 2028). Sie kopieren den Ausweis und legen die Kopie in die Kundenakte.

**Fragen:**
1. Haben Sie die Identifizierung korrekt durchgeführt?
2. Welche Angaben müssen Sie erfassen?
3. Wie lange müssen Sie die Kopie aufbewahren?
4. Dürfen Sie die Identifizierung auch per Videoident durchführen?
5. Was müssen Sie bei juristischen Personen zusätzlich prüfen?

---

**Praxisfall 2: Herkunft der Mittel**

Ein Kunde möchte eine Immobilie für 500.000 € kaufen. Er hat 150.000 € Eigenkapital. Auf Ihre Frage nach der Herkunft antwortet er: "Das geht Sie nichts an."

**Fragen:**
1. Müssen Sie die Herkunft der Mittel klären?
2. Was tun Sie, wenn der Kunde die Auskunft verweigert?
3. Ist dies ein Anhaltspunkt für Geldwäsche?
4. Müssen Sie eine Verdachtsmeldung abgeben?
5. Dürfen Sie den Kunden über die Meldung informieren?

---

**Praxisfall 3: Politisch exponierte Person**

Ein Kunde ist Landtagsabgeordneter und möchte ein Darlehen aufnehmen. Sie erkennen, dass er eine politisch exponierte Person (PEP) ist.

**Fragen:**
1. Was ist eine politisch exponierte Person?
2. Welche besonderen Sorgfaltspflichten gelten?
3. Müssen Sie die Zustimmung Ihrer Geschäftsleitung einholen?
4. Dürfen Sie den Kunden ablehnen?
5. Welche Unterlagen müssen Sie zusätzlich anfordern?`,
    task: `**Aufgabe 1: Identifizierungscheckliste erstellen**

Erstellen Sie eine Checkliste zur Identifizierung eines Kunden. Berücksichtigen Sie:
- Natürliche Personen (Name, Geburtsdatum, Adresse, Ausweis)
- Juristische Personen (Firma, Handelsregister, Vertretungsberechtigte)
- Wirtschaftlich Berechtigte (bei juristischen Personen)
- Zeitpunkt der Identifizierung
- Methoden (persönlich, Videoident, Postident)

---

**Aufgabe 2: Verdachtsmeldung formulieren**

Ein Kunde möchte 80.000 € Eigenkapital in bar einzahlen. Auf Ihre Frage nach der Herkunft antwortet er ausweichend. Sie haben den Verdacht, dass es sich um Geldwäsche handelt.

Formulieren Sie eine Verdachtsmeldung an die FIU. Berücksichtigen Sie:
- Kundendaten
- Transaktionsdetails
- Anhaltspunkte für Geldwäsche
- Ihre Einschätzung

---

**Aufgabe 3: Risikoanalyse durchführen**

Bewerten Sie das Geldwäscherisiko folgender Kunden:

**Kunde A:**
- Deutscher Staatsbürger
- Angestellter bei Siemens
- Eigenkapital aus Ansparung (Gehaltsabrechnungen vorhanden)

**Kunde B:**
- Russischer Staatsbürger
- Selbstständiger Unternehmer
- Eigenkapital aus Verkauf eines Unternehmens in Russland

**Kunde C:**
- Deutscher Staatsbürger
- Bürgermeister einer Großstadt
- Eigenkapital aus Erbschaft (Erbschein vorhanden)

Klassifizieren Sie: Geringes Risiko, Erhöhtes Risiko, Hohes Risiko`,
    solution: `**Lösung Praxisfall 1:**
1. Ja, die Identifizierung ist korrekt durchgeführt (§ 11 GwG).
2. Angaben: Name, Vorname, Geburtsdatum, Geburtsort, Staatsangehörigkeit, Wohnanschrift.
3. Aufbewahrung: 5 Jahre nach Beendigung der Geschäftsbeziehung (§ 8 GwG).
4. Ja, Videoident ist zulässig (§ 12 GwG).
5. Bei juristischen Personen: Firma, Rechtsform, Registernummer, Sitz, Vertretungsberechtigte, wirtschaftlich Berechtigter.

**Lösung Praxisfall 2:**
1. Ja, Sie müssen die Herkunft der Mittel klären (§ 11 Abs. 5 GwG).
2. Wenn der Kunde die Auskunft verweigert, können Sie die Geschäftsbeziehung ablehnen (§ 10 Abs. 9 GwG).
3. Ja, die Verweigerung der Auskunft ist ein Anhaltspunkt für Geldwäsche.
4. Ja, Sie müssen eine Verdachtsmeldung an die FIU abgeben (§ 43 GwG).
5. Nein, Sie dürfen den Kunden nicht über die Meldung informieren (§ 47 GwG - Verbot der Informationsweitergabe).

**Lösung Praxisfall 3:**
1. Eine politisch exponierte Person (PEP) ist eine Person, die ein hochrangiges öffentliches Amt ausübt (z.B. Politiker, hohe Beamte).
2. Verstärkte Sorgfaltspflichten: Zustimmung der Geschäftsleitung, Herkunft der Mittel klären, kontinuierliche Überwachung (§ 15 GwG).
3. Ja, Sie müssen die Zustimmung Ihrer Geschäftsleitung einholen (§ 15 Abs. 3 GwG).
4. Ja, Sie dürfen den Kunden ablehnen, wenn Sie das Risiko als zu hoch einschätzen.
5. Zusätzliche Unterlagen: Nachweis Herkunft der Mittel, Vermögenserklärung, Einkommensnachweise.

**Lösung Aufgabe 1 - Identifizierungscheckliste:**

**Identifizierungscheckliste**

**Natürliche Personen:**
- [ ] Name, Vorname
- [ ] Geburtsdatum, Geburtsort
- [ ] Staatsangehörigkeit
- [ ] Wohnanschrift
- [ ] Nachweis: Personalausweis oder Reisepass (Kopie anfertigen)

**Juristische Personen:**
- [ ] Firma, Rechtsform
- [ ] Registernummer (Handelsregister)
- [ ] Sitz, Geschäftsanschrift
- [ ] Vertretungsberechtigte Personen (Name, Geburtsdatum, Ausweis)
- [ ] Nachweis: Handelsregisterauszug, Gewerbeanmeldung

**Wirtschaftlich Berechtigter (bei juristischen Personen):**
- [ ] Person, die mehr als 25% der Anteile hält
- [ ] Name, Geburtsdatum, Adresse
- [ ] Nachweis: Gesellschafterliste, Anteilsübersicht

**Zeitpunkt:**
- [ ] Vor Begründung der Geschäftsbeziehung
- [ ] Spätestens bei Vertragsschluss

**Methoden:**
- [ ] Persönliche Anwesenheit (Ausweis zeigen, Kopie anfertigen)
- [ ] Videoident (per Videoanruf)
- [ ] Postident (bei der Post)

**Aufbewahrung:**
- [ ] 5 Jahre nach Beendigung der Geschäftsbeziehung

**Lösung Aufgabe 2 - Verdachtsmeldung:**

**Verdachtsmeldung an die Financial Intelligence Unit (FIU)**

**Kundendaten:**
- Name: Max Mustermann
- Geburtsdatum: 01.01.1980
- Adresse: Musterstraße 1, 80331 München
- Staatsangehörigkeit: Deutsch

**Transaktionsdetails:**
- Datum: 25.02.2026
- Betrag: 80.000 € (Eigenkapital)
- Zahlungsweise: Bar
- Zweck: Immobilienkauf

**Anhaltspunkte für Geldwäsche:**
- Barzahlung über 10.000 € (§ 16 GwG)
- Kunde verweigert Auskunft über Herkunft der Mittel
- Ausweichende Antworten auf Fragen
- Ungewöhnlich hoher Betrag ohne plausible Erklärung

**Einschätzung:**
Aufgrund der Barzahlung und der Verweigerung der Auskunft besteht der Verdacht, dass die Mittel aus Straftaten stammen. Es wird empfohlen, die Transaktion zu überprüfen und gegebenenfalls weitere Ermittlungen einzuleiten.

**Meldender:**
[Name, Firma, Adresse, Telefon, E-Mail]

**Datum:** 25.02.2026

**Lösung Aufgabe 3 - Risikoanalyse:**

**Kunde A: Geringes Risiko**
- Deutscher Staatsbürger (kein Hochrisikoland)
- Angestellter bei renommiertem Unternehmen
- Transparente Einkommensverhältnisse (Gehaltsabrechnungen)
- Plausible Herkunft der Mittel (Ansparung)
- **Maßnahmen:** Standardidentifizierung

**Kunde B: Hohes Risiko**
- Russischer Staatsbürger (Hochrisikoland)
- Selbstständiger Unternehmer (komplexe Strukturen)
- Eigenkapital aus Ausland (Russland)
- **Maßnahmen:** Verstärkte Sorgfaltspflichten (§ 15 GwG), Herkunft der Mittel genau klären, Zustimmung Geschäftsleitung

**Kunde C: Erhöhtes Risiko**
- Deutscher Staatsbürger
- Politisch exponierte Person (PEP - Bürgermeister)
- Plausible Herkunft der Mittel (Erbschaft mit Erbschein)
- **Maßnahmen:** Verstärkte Sorgfaltspflichten (§ 15 GwG), Zustimmung Geschäftsleitung, kontinuierliche Überwachung`,
    type: "Theorie"
  },

  day_8: {
    title: "Verbraucherschutz, Schlichtungsstellen und Unlauterer Wettbewerb",
    theory: `Der Verbraucherschutz soll Verbraucher vor unfairen Geschäftspraktiken, überhöhten Preisen und intransparenten Vertragsbedingungen schützen. Zentrale Vorschriften sind: Informationspflichten (§ 491a BGB), Widerrufsrecht (§ 495 BGB), Verbot unlauterer Geschäftspraktiken (§ 3 UWG). Schlichtungsstellen sind außergerichtliche Streitbeilegungsstellen, die Konflikte zwischen Verbrauchern und Unternehmen kostengünstig und schnell lösen. Für Immobiliardarlehensvermittler ist die Verbraucherschlichtungsstelle der Deutschen Bundesbank zuständig. Das Gesetz gegen den unlauteren Wettbewerb (UWG) verbietet irreführende Werbung, aggressive Verkaufsmethoden und unlautere Geschäftspraktiken. Verstöße können zu Unterlassungsansprüchen, Schadensersatz und Bußgeldern bis 500.000 € führen.`,
    extendedTheory: `**Verbraucherschutz, Schlichtungsstellen und Unlauterer Wettbewerb im Detail:**

**1. Verbraucherschutz:**

**Zweck:**
Schutz von Verbrauchern (Privatpersonen) vor:
- Unfairen Geschäftspraktiken
- Überhöhten Preisen
- Intransparenten Vertragsbedingungen
- Irreführender Werbung

**Zentrale Vorschriften:**

**Informationspflichten (§ 491a BGB):**
- ESIS-Merkblatt vor Vertragsschluss
- Angaben zu Zinsen, Kosten, Laufzeit, Risiken
- Rechtzeitig (mindestens 7 Tage vor Vertragsschluss)

**Widerrufsrecht (§ 495 BGB):**
- 14 Tage Widerrufsfrist
- Keine Angabe von Gründen erforderlich
- Schriftform

**Transparenzgebot (§ 307 BGB):**
- Vertragsklauseln müssen klar und verständlich sein
- Keine versteckten Kosten
- Keine überraschenden Klauseln

**Verbot unlauterer Geschäftspraktiken (§ 3 UWG):**
- Keine irreführende Werbung
- Keine aggressiven Verkaufsmethoden
- Keine Ausnutzung von Unerfahrenheit

---

**2. Schlichtungsstellen:**

**Zweck:**
Außergerichtliche Streitbeilegung zwischen Verbrauchern und Unternehmen:
- Kostengünstig (meist kostenlos für Verbraucher)
- Schnell (3-6 Monate statt Jahre)
- Unabhängig (neutrale Schlichter)

**Verbraucherschlichtungsstelle der Deutschen Bundesbank:**
Zuständig für:
- Immobiliardarlehensvermittler
- Banken
- Finanzdienstleister

**Adresse:**
Deutsche Bundesbank
Verbraucherschlichtungsstelle
Postfach 11 12 32
60047 Frankfurt am Main
E-Mail: schlichtung@bundesbank.de
Website: www.bundesbank.de/schlichtung

**Verfahren:**
1. **Antrag:** Verbraucher stellt Antrag bei Schlichtungsstelle (schriftlich oder online)
2. **Prüfung:** Schlichtungsstelle prüft Zulässigkeit (Streitwert, Zuständigkeit)
3. **Stellungnahme:** Unternehmen gibt Stellungnahme ab
4. **Schlichtungsvorschlag:** Schlichtungsstelle unterbreitet Vorschlag
5. **Annahme:** Beide Parteien können Vorschlag annehmen oder ablehnen
6. **Abschluss:** Bei Annahme ist Streit beigelegt, bei Ablehnung bleibt Klageweg offen

**Kosten:**
- Für Verbraucher: Kostenlos
- Für Unternehmen: Pauschale (ca. 300-500 €)

**Dauer:**
- 3-6 Monate (deutlich schneller als Gerichtsverfahren)

**Bindungswirkung:**
- Schlichtungsvorschlag ist nicht bindend
- Beide Parteien können ablehnen
- Bei Annahme: Vergleich mit Bindungswirkung

---

**3. Hinweispflicht auf Schlichtungsstelle (§ 36 VSBG):**

**Verpflichtung:**
Sie müssen Ihre Kunden auf die Möglichkeit der Schlichtung hinweisen:
- Auf Ihrer Website
- In Ihren AGB
- In Vertragsunterlagen

**Formulierung:**
"Bei Streitigkeiten können Sie sich an die Verbraucherschlichtungsstelle der Deutschen Bundesbank wenden:
Deutsche Bundesbank, Verbraucherschlichtungsstelle, Postfach 11 12 32, 60047 Frankfurt am Main
E-Mail: schlichtung@bundesbank.de
Website: www.bundesbank.de/schlichtung"

---

**4. Gesetz gegen den unlauteren Wettbewerb (UWG):**

**Zweck:**
Schutz von:
- Verbrauchern vor unlauteren Geschäftspraktiken
- Mitbewerbern vor unlauterem Wettbewerb
- Allgemeinheit vor Verfälschung des Wettbewerbs

**Unlautere Geschäftspraktiken (§ 3 UWG):**

**Irreführende Werbung (§ 5 UWG):**
- Falsche Angaben zu Produkteigenschaften
- Verschweigen wesentlicher Informationen
- Täuschung über Preise

**Beispiele:**
- "Günstigster Zinssatz Deutschlands" (ohne Beleg)
- "Nur heute: 0% Zinsen" (obwohl dauerhaft verfügbar)
- "Keine Gebühren" (obwohl versteckte Kosten)

**Aggressive Geschäftspraktiken (§ 4a UWG):**
- Belästigung (z.B. unerwünschte Werbeanrufe)
- Nötigung (z.B. Drohung mit Kündigung)
- Ausnutzung von Unerfahrenheit

**Beispiele:**
- Telefonwerbung ohne Einwilligung
- Haustürgeschäfte mit Druck
- Ausnutzung von Notlagen

**Verbot unlauterer Geschäftspraktiken (§ 3 UWG):**
- Verstoß gegen Gesetze (z.B. Preisangabenverordnung)
- Irreführung über Identität (z.B. Vortäuschung einer Behörde)
- Verschleierung kommerzieller Absicht (z.B. getarnte Werbung)

---

**5. Rechtsfolgen bei Verstößen:**

**Unterlassungsanspruch (§ 8 UWG):**
- Mitbewerber oder Verbraucherschutzverbände können Unterlassung verlangen
- Abmahnung (außergerichtlich)
- Einstweilige Verfügung (gerichtlich)
- Unterlassungsklage

**Schadensersatz (§ 9 UWG):**
- Bei vorsätzlichem oder fahrlässigem Verstoß
- Ersatz des entstandenen Schadens
- Beispiel: Kunde schließt teureres Darlehen ab wegen irreführender Werbung

**Gewinnabschöpfung (§ 10 UWG):**
- Bei vorsätzlichem Verstoß
- Abschöpfung des durch Verstoß erzielten Gewinns
- Zugunsten des Bundeshaushalts

**Bußgeld (§ 20 UWG):**
- Bis 500.000 € bei Verstoß gegen UWG
- Bei schweren oder wiederholten Verstößen

---

**6. Praxisbeispiele unlauterer Werbung:**

**Beispiel 1: Irreführende Zinsangabe**
"0% Zinsen für Immobiliendarlehen!"
- **Problem:** Zinsen gelten nur für erste 6 Monate, danach 5%
- **Verstoß:** Irreführende Werbung (§ 5 UWG)

**Beispiel 2: Verschweigen von Kosten**
"Kostenlose Beratung!"
- **Problem:** Provision von 2% des Darlehensbetrags wird verschwiegen
- **Verstoß:** Irreführende Werbung (§ 5 UWG)

**Beispiel 3: Aggressive Verkaufsmethode**
Telefonwerbung ohne Einwilligung des Kunden
- **Problem:** Belästigung
- **Verstoß:** Aggressive Geschäftspraktik (§ 4a UWG)

**Beispiel 4: Vergleichende Werbung**
"Wir sind besser als die Sparkasse!"
- **Problem:** Herabsetzung eines Mitbewerbers ohne sachliche Begründung
- **Verstoß:** Unlautere vergleichende Werbung (§ 6 UWG)

---

**7. Datenschutz (DSGVO):**

**Informationspflichten (Art. 13 DSGVO):**
Sie müssen Ihre Kunden über die Verarbeitung ihrer Daten informieren:
- Welche Daten werden erhoben?
- Zu welchem Zweck?
- Wie lange werden sie gespeichert?
- An wen werden sie weitergegeben?

**Einwilligung (Art. 6 DSGVO):**
Für Werbung benötigen Sie die Einwilligung des Kunden:
- Freiwillig
- Informiert
- Eindeutig
- Widerrufbar

**Auskunftsrecht (Art. 15 DSGVO):**
Kunden haben das Recht, Auskunft über ihre gespeicherten Daten zu verlangen.

**Löschungsrecht (Art. 17 DSGVO):**
Kunden haben das Recht, die Löschung ihrer Daten zu verlangen (nach Ablauf der Aufbewahrungsfrist).

**Sanktionen:**
- Bußgeld bis 20 Mio. € oder 4% des Jahresumsatzes (Art. 83 DSGVO)`,
    law: [
      "§ 491a BGB (Informationspflichten)",
      "§ 495 BGB (Widerrufsrecht)",
      "§ 307 BGB (Transparenzgebot)",
      "§ 3 UWG (Verbot unlauterer Geschäftspraktiken)",
      "§ 5 UWG (Irreführende Werbung)",
      "§ 4a UWG (Aggressive Geschäftspraktiken)",
      "§ 8 UWG (Unterlassungsanspruch)",
      "§ 9 UWG (Schadensersatz)",
      "§ 20 UWG (Bußgeldvorschriften)",
      "§ 36 VSBG (Hinweispflicht Schlichtungsstelle)",
      "DSGVO (Datenschutz-Grundverordnung)"
    ],
    practice: `**Praxisfall 1: Irreführende Werbung**

Ein Immobiliardarlehensvermittler wirbt mit: "0% Zinsen für Immobiliendarlehen - nur heute!" In Wirklichkeit gelten die 0% Zinsen nur für die ersten 3 Monate, danach 4,5%. Ein Kunde beschwert sich bei der Verbraucherschutzzentrale.

**Fragen:**
1. Liegt ein Verstoß gegen das UWG vor?
2. Welche Vorschrift wurde verletzt?
3. Welche Rechtsfolgen drohen?
4. Kann der Kunde Schadensersatz fordern?
5. Wie hätte die Werbung korrekt formuliert werden müssen?

---

**Praxisfall 2: Schlichtungsverfahren**

Ein Kunde beschwert sich, dass Sie ihm ein zu teures Darlehen vermittelt haben. Er verlangt Schadensersatz von 5.000 €. Sie lehnen ab. Der Kunde wendet sich an die Verbraucherschlichtungsstelle der Deutschen Bundesbank.

**Fragen:**
1. Ist die Schlichtungsstelle zuständig?
2. Wie läuft das Schlichtungsverfahren ab?
3. Ist der Schlichtungsvorschlag bindend?
4. Welche Kosten entstehen?
5. Was passiert, wenn Sie den Schlichtungsvorschlag ablehnen?

---

**Praxisfall 3: Aggressive Verkaufsmethode**

Ein Immobiliardarlehensvermittler ruft potenzielle Kunden an, ohne deren Einwilligung. Er bietet Immobiliendarlehen an und drängt auf einen Termin. Ein Kunde beschwert sich bei der IHK.

**Fragen:**
1. Liegt ein Verstoß gegen das UWG vor?
2. Welche Vorschrift wurde verletzt?
3. Welche Rechtsfolgen drohen?
4. Kann der Kunde Unterlassung verlangen?
5. Wie hätte der Vermittler korrekt vorgehen müssen?`,
    task: `**Aufgabe 1: Hinweis auf Schlichtungsstelle formulieren**

Formulieren Sie einen Hinweis auf die Verbraucherschlichtungsstelle der Deutschen Bundesbank für Ihre Website. Berücksichtigen Sie:
- Name und Adresse der Schlichtungsstelle
- E-Mail und Website
- Verfahrensablauf (kurz)
- Kosten

---

**Aufgabe 2: Werbung prüfen**

Prüfen Sie folgende Werbeaussagen auf Zulässigkeit:

**Aussage A:**
"Wir sind der günstigste Immobiliardarlehensvermittler Deutschlands!"

**Aussage B:**
"0% Provision - wir werden von den Banken bezahlt!"

**Aussage C:**
"Nur noch heute: 2,5% Zinsen für Immobiliendarlehen!"

**Aussage D:**
"Wir sind besser als die Sparkasse - unsere Kunden sind zufriedener!"

Welche Aussagen sind zulässig? Welche sind irreführend?

---

**Aufgabe 3: Datenschutzerklärung erstellen**

Erstellen Sie eine vereinfachte Datenschutzerklärung für Ihre Website. Berücksichtigen Sie:
- Welche Daten werden erhoben? (Name, Adresse, E-Mail, Telefon)
- Zu welchem Zweck? (Beratung, Vertragsabschluss)
- Wie lange werden sie gespeichert? (10 Jahre)
- An wen werden sie weitergegeben? (Banken, Versicherungen)
- Rechte der Betroffenen (Auskunft, Löschung, Widerruf)`,
    solution: `**Lösung Praxisfall 1:**
1. Ja, es liegt ein Verstoß gegen das UWG vor.
2. § 5 UWG (Irreführende Werbung) - Verschweigen wesentlicher Informationen (Zinsen gelten nur für 3 Monate).
3. Rechtsfolgen: Unterlassungsanspruch (§ 8 UWG), Schadensersatz (§ 9 UWG), Bußgeld bis 500.000 € (§ 20 UWG).
4. Ja, der Kunde kann Schadensersatz fordern, wenn er durch die irreführende Werbung einen Schaden erlitten hat (z.B. zu teures Darlehen abgeschlossen).
5. Korrekte Formulierung: "0% Zinsen für die ersten 3 Monate, danach 4,5% - Angebot gültig bis 31.12.2026".

**Lösung Praxisfall 2:**
1. Ja, die Verbraucherschlichtungsstelle der Deutschen Bundesbank ist zuständig für Immobiliardarlehensvermittler.
2. Ablauf: Antrag → Prüfung → Stellungnahme → Schlichtungsvorschlag → Annahme/Ablehnung.
3. Nein, der Schlichtungsvorschlag ist nicht bindend. Beide Parteien können ihn ablehnen.
4. Kosten: Für den Kunden kostenlos, für Sie ca. 300-500 € Pauschale.
5. Wenn Sie den Schlichtungsvorschlag ablehnen, bleibt dem Kunden der Klageweg offen (Gerichtsverfahren).

**Lösung Praxisfall 3:**
1. Ja, es liegt ein Verstoß gegen das UWG vor.
2. § 4a UWG (Aggressive Geschäftspraktik) - Belästigung durch unerwünschte Werbeanrufe.
3. Rechtsfolgen: Unterlassungsanspruch (§ 8 UWG), Bußgeld bis 500.000 € (§ 20 UWG).
4. Ja, der Kunde kann Unterlassung verlangen (keine weiteren Anrufe).
5. Korrekt: Einwilligung des Kunden einholen (z.B. durch Anmeldeformular auf Website), erst dann anrufen.

**Lösung Aufgabe 1 - Hinweis Schlichtungsstelle:**

**Verbraucherschlichtungsstelle**

Bei Streitigkeiten können Sie sich an die Verbraucherschlichtungsstelle der Deutschen Bundesbank wenden:

**Deutsche Bundesbank**
Verbraucherschlichtungsstelle
Postfach 11 12 32
60047 Frankfurt am Main

**E-Mail:** schlichtung@bundesbank.de
**Website:** www.bundesbank.de/schlichtung

**Verfahren:**
Die Schlichtungsstelle prüft Ihren Antrag und unterbreitet einen Schlichtungsvorschlag. Das Verfahren ist für Sie als Verbraucher kostenlos und dauert in der Regel 3-6 Monate. Der Schlichtungsvorschlag ist nicht bindend - Sie können ihn annehmen oder ablehnen.

**Lösung Aufgabe 2 - Werbung prüfen:**

**Aussage A: Unzulässig**
"Wir sind der günstigste Immobiliardarlehensvermittler Deutschlands!"
- **Problem:** Superlativ ohne Beleg, nicht nachprüfbar
- **Verstoß:** Irreführende Werbung (§ 5 UWG)

**Aussage B: Zulässig (mit Einschränkung)**
"0% Provision - wir werden von den Banken bezahlt!"
- **OK, wenn:** Tatsächlich keine Provision vom Kunden verlangt wird
- **Problem:** Muss klar sein, dass Provision von Bank gezahlt wird (Interessenkonflikt offenlegen)

**Aussage C: Unzulässig**
"Nur noch heute: 2,5% Zinsen für Immobiliendarlehen!"
- **Problem:** Künstliche Verknappung, wenn Angebot dauerhaft verfügbar ist
- **Verstoß:** Irreführende Werbung (§ 5 UWG)

**Aussage D: Unzulässig**
"Wir sind besser als die Sparkasse - unsere Kunden sind zufriedener!"
- **Problem:** Herabsetzung eines Mitbewerbers ohne sachliche Begründung
- **Verstoß:** Unlautere vergleichende Werbung (§ 6 UWG)

**Lösung Aufgabe 3 - Datenschutzerklärung:**

**Datenschutzerklärung**

**1. Erhebung personenbezogener Daten:**
Wir erheben folgende personenbezogene Daten:
- Name, Vorname
- Adresse
- E-Mail-Adresse
- Telefonnummer
- Finanzielle Daten (Einkommen, Vermögen, Schulden)

**2. Zweck der Datenverarbeitung:**
Die Daten werden verwendet für:
- Beratung zu Immobiliendarlehen
- Vermittlung von Darlehensverträgen
- Erstellung von Finanzierungsplänen
- Erfüllung gesetzlicher Pflichten (z.B. Geldwäschegesetz)

**3. Speicherdauer:**
Die Daten werden gespeichert für:
- 10 Jahre nach Beendigung der Geschäftsbeziehung (§ 257 HGB)
- 5 Jahre für Geldwäscheprävention (§ 8 GwG)

**4. Weitergabe an Dritte:**
Die Daten werden weitergegeben an:
- Banken und Sparkassen (zur Vermittlung von Darlehen)
- Versicherungen (zur Absicherung des Darlehens)
- Behörden (bei gesetzlicher Verpflichtung, z.B. FIU)

**5. Ihre Rechte:**
Sie haben folgende Rechte:
- **Auskunftsrecht (Art. 15 DSGVO):** Sie können Auskunft über Ihre gespeicherten Daten verlangen
- **Löschungsrecht (Art. 17 DSGVO):** Sie können die Löschung Ihrer Daten verlangen (nach Ablauf der Aufbewahrungsfrist)
- **Widerrufsrecht (Art. 7 DSGVO):** Sie können Ihre Einwilligung zur Datenverarbeitung jederzeit widerrufen

**6. Kontakt:**
Bei Fragen zum Datenschutz wenden Sie sich bitte an:
[Name, Adresse, E-Mail, Telefon]`,
    type: "Theorie"
  },

  day_9: {
    title: "Datenschutz (DSGVO), Verschwiegenheit und Zuständigkeiten der Aufsicht",
    theory: `Die Datenschutz-Grundverordnung (DSGVO) regelt den Schutz personenbezogener Daten in der EU. Als Immobiliardarlehensvermittler verarbeiten Sie sensible Daten Ihrer Kunden (Einkommen, Vermögen, Schulden) und müssen diese schützen. Sie müssen Ihre Kunden über die Datenverarbeitung informieren (Art. 13 DSGVO), deren Einwilligung einholen (Art. 6 DSGVO) und technische und organisatorische Maßnahmen zum Schutz der Daten treffen (Art. 32 DSGVO). Verschwiegenheit bedeutet, dass Sie keine Informationen über Ihre Kunden an Dritte weitergeben dürfen (außer bei gesetzlicher Verpflichtung). Die Aufsicht über Immobiliardarlehensvermittler liegt bei der IHK (Erlaubniserteilung) und der BaFin (Geldwäscheprävention). Verstöße gegen die DSGVO können zu Bußgeldern bis 20 Mio. € oder 4% des Jahresumsatzes führen.`,
    extendedTheory: `**Datenschutz (DSGVO), Verschwiegenheit und Zuständigkeiten im Detail:**

**1. Datenschutz-Grundverordnung (DSGVO):**

**Anwendungsbereich:**
Die DSGVO gilt für die Verarbeitung personenbezogener Daten:
- **Personenbezogene Daten:** Alle Informationen, die sich auf eine identifizierte oder identifizierbare Person beziehen (Name, Adresse, E-Mail, Telefon, Einkommen, Vermögen)
- **Verarbeitung:** Erhebung, Speicherung, Verwendung, Weitergabe, Löschung

**Grundsätze (Art. 5 DSGVO):**
1. **Rechtmäßigkeit:** Daten dürfen nur mit Rechtsgrundlage verarbeitet werden
2. **Zweckbindung:** Daten dürfen nur für festgelegte Zwecke verwendet werden
3. **Datenminimierung:** Nur notwendige Daten erheben
4. **Richtigkeit:** Daten müssen korrekt und aktuell sein
5. **Speicherbegrenzung:** Daten dürfen nur so lange gespeichert werden, wie erforderlich
6. **Integrität und Vertraulichkeit:** Daten müssen geschützt werden

---

**2. Rechtsgrundlagen der Datenverarbeitung (Art. 6 DSGVO):**

**Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):**
- Freiwillig
- Informiert
- Eindeutig
- Widerrufbar
- **Beispiel:** Kunde willigt ein, dass Sie seine Daten an Banken weitergeben

**Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):**
- Datenverarbeitung ist erforderlich zur Erfüllung eines Vertrags
- **Beispiel:** Sie benötigen Einkommensnachweise, um Darlehen zu vermitteln

**Gesetzliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO):**
- Datenverarbeitung ist gesetzlich vorgeschrieben
- **Beispiel:** Aufbewahrung von Unterlagen für 10 Jahre (§ 257 HGB)

**Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO):**
- Datenverarbeitung ist erforderlich zur Wahrung berechtigter Interessen
- **Beispiel:** Bonitätsprüfung zur Vermeidung von Kreditausfällen

---

**3. Informationspflichten (Art. 13 DSGVO):**

**Pflichtangaben:**
Sie müssen Ihre Kunden über folgende Punkte informieren:

1. **Verantwortlicher:** Name und Kontaktdaten (Ihr Name, Firma, Adresse)
2. **Datenschutzbeauftragter:** Name und Kontaktdaten (falls vorhanden)
3. **Zweck der Datenverarbeitung:** Beratung, Vermittlung, Vertragserfüllung
4. **Rechtsgrundlage:** Einwilligung, Vertragserfüllung, gesetzliche Verpflichtung
5. **Empfänger:** An wen werden Daten weitergegeben? (Banken, Versicherungen)
6. **Speicherdauer:** Wie lange werden Daten gespeichert? (10 Jahre)
7. **Rechte der Betroffenen:** Auskunft, Berichtigung, Löschung, Widerruf
8. **Beschwerderecht:** Recht, sich bei Aufsichtsbehörde zu beschweren

**Form:**
- Schriftlich (Datenschutzerklärung)
- Bei erster Kontaktaufnahme
- Klar und verständlich

---

**4. Rechte der Betroffenen:**

**Auskunftsrecht (Art. 15 DSGVO):**
- Kunde kann Auskunft über gespeicherte Daten verlangen
- Innerhalb 1 Monat kostenlos

**Berichtigungsrecht (Art. 16 DSGVO):**
- Kunde kann Berichtigung falscher Daten verlangen

**Löschungsrecht (Art. 17 DSGVO):**
- Kunde kann Löschung seiner Daten verlangen
- **Ausnahme:** Aufbewahrungspflichten (§ 257 HGB, § 8 GwG)

**Widerspruchsrecht (Art. 21 DSGVO):**
- Kunde kann Widerspruch gegen Datenverarbeitung einlegen
- **Beispiel:** Widerspruch gegen Werbung

**Datenübertragbarkeit (Art. 20 DSGVO):**
- Kunde kann Daten in strukturiertem Format erhalten
- **Beispiel:** CSV-Datei mit allen gespeicherten Daten

---

**5. Technische und organisatorische Maßnahmen (Art. 32 DSGVO):**

**Vertraulichkeit:**
- Passwortschutz für Computer
- Verschlüsselung von E-Mails
- Abschließbare Schränke für Papierunterlagen

**Integrität:**
- Backups (regelmäßige Sicherung)
- Virenschutz
- Firewall

**Verfügbarkeit:**
- Redundante Systeme (bei Ausfall)
- Notfallplan

**Belastbarkeit:**
- Regelmäßige Tests
- Schulung der Mitarbeiter

---

**6. Datenpanne (Art. 33, 34 DSGVO):**

**Meldepflicht:**
Wenn personenbezogene Daten verloren gehen, gestohlen werden oder unbefugt offengelegt werden, müssen Sie dies melden:

**An Aufsichtsbehörde (Art. 33 DSGVO):**
- Innerhalb 72 Stunden
- Beschreibung der Panne
- Maßnahmen zur Behebung

**An Betroffene (Art. 34 DSGVO):**
- Wenn hohes Risiko für Rechte und Freiheiten
- **Beispiel:** Gesundheitsdaten, Finanzdaten

---

**7. Verschwiegenheit:**

**Pflicht zur Verschwiegenheit:**
Sie dürfen keine Informationen über Ihre Kunden an Dritte weitergeben, außer:
- Kunde willigt ein
- Gesetzliche Verpflichtung (z.B. Geldwäschegesetz)
- Vertragserfüllung (z.B. Weitergabe an Bank zur Darlehensvermittlung)

**Beispiele:**
- **Zulässig:** Weitergabe von Einkommensnachweisen an Bank (mit Einwilligung)
- **Unzulässig:** Weitergabe von Kundendaten an Werbefirma (ohne Einwilligung)

**Sanktionen:**
- Schadensersatz (§ 280 BGB)
- Bußgeld (DSGVO)
- Strafrechtliche Verfolgung (§ 203 StGB - Verletzung von Privatgeheimnissen)

---

**8. Zuständigkeiten der Aufsicht:**

**IHK (Industrie- und Handelskammer):**
- Erteilung der Erlaubnis nach §34i GewO
- Prüfung der Sachkunde
- Überwachung der Einhaltung von §34i GewO
- Bußgelder bei Verstößen (§ 144 GewO)
- Erlaubnisentzug (§ 35 GewO)

**BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht):**
- Überwachung der Geldwäscheprävention (GwG)
- Prüfung der Einhaltung von Sorgfaltspflichten
- Bußgelder bei Verstößen (§ 56 GwG)

**Datenschutzbehörde (Landesdatenschutzbeauftragte):**
- Überwachung der Einhaltung der DSGVO
- Prüfung von Beschwerden
- Bußgelder bei Verstößen (Art. 83 DSGVO)

**Financial Intelligence Unit (FIU):**
- Entgegennahme von Verdachtsmeldungen (§ 43 GwG)
- Auswertung und Weiterleitung an Strafverfolgungsbehörden

---

**9. Sanktionen bei Verstößen:**

**DSGVO (Art. 83 DSGVO):**
- Bußgeld bis 20 Mio. € oder 4% des Jahresumsatzes
- Bei schweren Verstößen (z.B. Verarbeitung ohne Rechtsgrundlage)

**GwG (§ 56 GwG):**
- Bußgeld bis 1 Mio. € oder 10% des Jahresumsatzes
- Bei Verstößen gegen Sorgfaltspflichten

**§34i GewO (§ 144 GewO):**
- Bußgeld bis 50.000 €
- Bei Verstößen gegen Verhaltens- und Informationspflichten

**StGB (§ 203 StGB):**
- Freiheitsstrafe bis 1 Jahr oder Geldstrafe
- Bei Verletzung von Privatgeheimnissen`,
    law: [
      "DSGVO (Datenschutz-Grundverordnung)",
      "Art. 5 DSGVO (Grundsätze)",
      "Art. 6 DSGVO (Rechtsgrundlagen)",
      "Art. 13 DSGVO (Informationspflichten)",
      "Art. 15-22 DSGVO (Rechte der Betroffenen)",
      "Art. 32 DSGVO (Technische und organisatorische Maßnahmen)",
      "Art. 33, 34 DSGVO (Datenpanne)",
      "Art. 83 DSGVO (Bußgelder)",
      "§ 203 StGB (Verletzung von Privatgeheimnissen)",
      "§ 144 GewO (Bußgeldvorschriften)",
      "§ 56 GwG (Bußgeldvorschriften)"
    ],
    practice: `**Praxisfall 1: Datenpanne**

Ein Mitarbeiter verliert einen USB-Stick mit Kundendaten (Namen, Adressen, Einkommensnachweise, Kontoauszüge) von 50 Kunden. Der USB-Stick war nicht verschlüsselt.

**Fragen:**
1. Liegt eine Datenpanne vor?
2. Müssen Sie die Datenpanne melden?
3. An wen müssen Sie melden?
4. Innerhalb welcher Frist?
5. Müssen Sie die betroffenen Kunden informieren?

---

**Praxisfall 2: Auskunftsrecht**

Ein Kunde verlangt Auskunft über alle gespeicherten Daten. Sie haben folgende Daten gespeichert: Name, Adresse, Geburtsdatum, Einkommen, Vermögen, Schulden, Schufa-Auskunft, Beratungsprotokoll.

**Fragen:**
1. Muss der Kunde sein Auskunftsrecht begründen?
2. Innerhalb welcher Frist müssen Sie Auskunft erteilen?
3. Welche Daten müssen Sie offenlegen?
4. In welcher Form müssen Sie Auskunft erteilen?
5. Dürfen Sie Gebühren verlangen?

---

**Praxisfall 3: Verschwiegenheit**

Ein Kunde fragt Sie, ob ein anderer Kunde (sein Nachbar) bei Ihnen ein Darlehen aufgenommen hat. Sie wissen, dass der Nachbar tatsächlich Kunde bei Ihnen ist.

**Fragen:**
1. Dürfen Sie dem Kunden Auskunft geben?
2. Was passiert, wenn Sie Auskunft geben?
3. Gibt es Ausnahmen von der Verschwiegenheitspflicht?
4. Dürfen Sie die Information weitergeben, wenn der Nachbar zustimmt?
5. Welche Sanktionen drohen bei Verstoß?`,
    task: `**Aufgabe 1: Datenschutzerklärung erstellen**

Erstellen Sie eine Datenschutzerklärung für Ihre Website. Berücksichtigen Sie:
- Verantwortlicher (Name, Adresse)
- Zweck der Datenverarbeitung
- Rechtsgrundlage
- Empfänger (Banken, Versicherungen)
- Speicherdauer (10 Jahre)
- Rechte der Betroffenen (Auskunft, Löschung, Widerruf)

---

**Aufgabe 2: Technische Maßnahmen**

Erstellen Sie eine Checkliste mit technischen und organisatorischen Maßnahmen zum Schutz personenbezogener Daten. Berücksichtigen Sie:
- Vertraulichkeit (Passwortschutz, Verschlüsselung)
- Integrität (Backups, Virenschutz)
- Verfügbarkeit (Redundante Systeme)
- Belastbarkeit (Tests, Schulung)

---

**Aufgabe 3: Datenpanne melden**

Ein Hacker hat sich Zugang zu Ihrem E-Mail-Konto verschafft und Kundendaten gestohlen (100 Kunden). Formulieren Sie eine Meldung an die Datenschutzbehörde. Berücksichtigen Sie:
- Beschreibung der Panne
- Betroffene Daten
- Anzahl betroffener Personen
- Maßnahmen zur Behebung
- Risiken für Betroffene`,
    solution: `**Lösung Praxisfall 1:**
1. Ja, es liegt eine Datenpanne vor (Verlust personenbezogener Daten).
2. Ja, Sie müssen die Datenpanne melden (Art. 33 DSGVO).
3. An die Datenschutzbehörde (Landesdatenschutzbeauftragte).
4. Innerhalb 72 Stunden nach Bekanntwerden.
5. Ja, Sie müssen die betroffenen Kunden informieren, da hohes Risiko für deren Rechte und Freiheiten besteht (Art. 34 DSGVO).

**Lösung Praxisfall 2:**
1. Nein, der Kunde muss sein Auskunftsrecht nicht begründen (Art. 15 DSGVO).
2. Innerhalb 1 Monat (Art. 12 Abs. 3 DSGVO).
3. Alle gespeicherten Daten: Name, Adresse, Geburtsdatum, Einkommen, Vermögen, Schulden, Schufa-Auskunft, Beratungsprotokoll.
4. In schriftlicher Form oder elektronisch (z.B. PDF, CSV).
5. Nein, die erste Auskunft ist kostenlos (Art. 15 Abs. 3 DSGVO).

**Lösung Praxisfall 3:**
1. Nein, Sie dürfen dem Kunden keine Auskunft geben (Verschwiegenheitspflicht).
2. Schadensersatz (§ 280 BGB), Bußgeld (DSGVO), Strafrechtliche Verfolgung (§ 203 StGB).
3. Ja, bei Einwilligung des Nachbarn oder gesetzlicher Verpflichtung.
4. Ja, wenn der Nachbar schriftlich zustimmt.
5. Bußgeld bis 20 Mio. € (DSGVO), Freiheitsstrafe bis 1 Jahr (§ 203 StGB).

**Lösung Aufgabe 1 - Datenschutzerklärung:**

**Datenschutzerklärung**

**1. Verantwortlicher:**
[Ihr Name]
[Ihre Firma]
[Adresse]
[E-Mail]
[Telefon]

**2. Zweck der Datenverarbeitung:**
Wir verarbeiten Ihre personenbezogenen Daten zu folgenden Zwecken:
- Beratung zu Immobiliendarlehen
- Vermittlung von Darlehensverträgen
- Erstellung von Finanzierungsplänen
- Erfüllung gesetzlicher Pflichten (z.B. Geldwäschegesetz)

**3. Rechtsgrundlage:**
- Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)
- Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)
- Gesetzliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO)

**4. Empfänger:**
Ihre Daten werden weitergegeben an:
- Banken und Sparkassen (zur Vermittlung von Darlehen)
- Versicherungen (zur Absicherung des Darlehens)
- Behörden (bei gesetzlicher Verpflichtung, z.B. FIU)

**5. Speicherdauer:**
Ihre Daten werden gespeichert für:
- 10 Jahre nach Beendigung der Geschäftsbeziehung (§ 257 HGB)
- 5 Jahre für Geldwäscheprävention (§ 8 GwG)

**6. Ihre Rechte:**
- **Auskunftsrecht (Art. 15 DSGVO):** Sie können Auskunft über Ihre gespeicherten Daten verlangen
- **Berichtigungsrecht (Art. 16 DSGVO):** Sie können Berichtigung falscher Daten verlangen
- **Löschungsrecht (Art. 17 DSGVO):** Sie können Löschung Ihrer Daten verlangen (nach Ablauf der Aufbewahrungsfrist)
- **Widerspruchsrecht (Art. 21 DSGVO):** Sie können Widerspruch gegen Datenverarbeitung einlegen
- **Widerrufsrecht (Art. 7 DSGVO):** Sie können Ihre Einwilligung jederzeit widerrufen

**7. Beschwerderecht:**
Sie haben das Recht, sich bei der Datenschutzbehörde zu beschweren:
[Name der Landesdatenschutzbehörde]
[Adresse]

**Lösung Aufgabe 2 - Technische Maßnahmen:**

**Checkliste Datenschutz - Technische und organisatorische Maßnahmen**

**Vertraulichkeit:**
- [ ] Passwortschutz für alle Computer und Geräte
- [ ] Verschlüsselung von E-Mails mit sensiblen Daten
- [ ] Abschließbare Schränke für Papierunterlagen
- [ ] Zugriffskontrolle (nur autorisierte Personen)
- [ ] Clean-Desk-Policy (keine Unterlagen auf Schreibtisch)

**Integrität:**
- [ ] Regelmäßige Backups (täglich, wöchentlich)
- [ ] Virenschutz und Firewall
- [ ] Software-Updates (regelmäßig)
- [ ] Sichere Passwörter (mindestens 12 Zeichen, Sonderzeichen)
- [ ] Zwei-Faktor-Authentifizierung

**Verfügbarkeit:**
- [ ] Redundante Systeme (bei Ausfall)
- [ ] Notfallplan (bei Datenpanne)
- [ ] Unterbrechungsfreie Stromversorgung (USV)

**Belastbarkeit:**
- [ ] Regelmäßige Tests (Wiederherstellung aus Backup)
- [ ] Schulung der Mitarbeiter (Datenschutz, Datensicherheit)
- [ ] Dokumentation (Verfahrensverzeichnis)
- [ ] Datenschutzbeauftragter (ab 20 Mitarbeitern)

**Lösung Aufgabe 3 - Datenpanne melden:**

**Meldung Datenpanne an Datenschutzbehörde**

**Datum:** 25.02.2026

**Verantwortlicher:**
[Ihr Name, Firma, Adresse, E-Mail, Telefon]

**Beschreibung der Datenpanne:**
Am 24.02.2026 wurde festgestellt, dass ein Hacker sich Zugang zu unserem E-Mail-Konto verschafft hat. Der Hacker hat E-Mails mit Kundendaten heruntergeladen und möglicherweise kopiert.

**Betroffene Daten:**
- Namen, Adressen, Geburtsdaten
- Einkommensnachweise, Vermögensübersichten
- Kontoauszüge, Schufa-Auskünfte
- Beratungsprotokolle

**Anzahl betroffener Personen:**
100 Kunden

**Zeitpunkt der Datenpanne:**
23.02.2026 (geschätzt)

**Maßnahmen zur Behebung:**
- E-Mail-Konto wurde sofort gesperrt
- Passwort wurde geändert
- Zwei-Faktor-Authentifizierung wurde aktiviert
- IT-Sicherheitsfirma wurde beauftragt
- Betroffene Kunden wurden informiert

**Risiken für Betroffene:**
- Identitätsdiebstahl
- Finanzbetrug
- Phishing-Angriffe

**Kontakt:**
[Name, E-Mail, Telefon]`,
    type: "Theorie"
  },

  day_10: {
    title: "Steuerliche Aspekte des Immobilienerwerbs",
    theory: `Beim Immobilienerwerb fallen verschiedene Steuern an: Grunderwerbsteuer (3,5-6,5% je nach Bundesland), Grundsteuer (jährlich, 0,26-1,0% des Einheitswerts), Einkommensteuer auf Mieteinnahmen (persönlicher Steuersatz), Spekulationssteuer bei Verkauf innerhalb 10 Jahren (persönlicher Steuersatz). Die Grunderwerbsteuer wird einmalig beim Kauf fällig und vom Käufer bezahlt. Die Grundsteuer wird jährlich von der Gemeinde erhoben. Mieteinnahmen müssen versteuert werden, können aber durch Werbungskosten (Zinsen, Instandhaltung, AfA) reduziert werden. Die Abschreibung (AfA) beträgt 2% pro Jahr für Gebäude (50 Jahre). Bei Eigennutzung sind keine Mieteinnahmen zu versteuern, aber auch keine Werbungskosten absetzbar. Steuerliche Aspekte sollten bei der Finanzierungsplanung berücksichtigt werden.`,
    extendedTheory: `**Steuerliche Aspekte des Immobilienerwerbs im Detail:**

**1. Grunderwerbsteuer:**

**Definition:**
Die Grunderwerbsteuer ist eine einmalige Steuer, die beim Kauf einer Immobilie anfällt.

**Steuersatz:**
- **Bundesweit unterschiedlich:** 3,5% bis 6,5% des Kaufpreises
- **Bayern, Sachsen:** 3,5%
- **Hamburg:** 4,5%
- **Berlin, Brandenburg:** 6,0%
- **Nordrhein-Westfalen, Saarland, Schleswig-Holstein:** 6,5%

**Bemessungsgrundlage:**
- Kaufpreis der Immobilie (ohne Inventar)
- Bei Neubau: Grundstückspreis + Baukosten

**Beispiel:**
- Kaufpreis: 400.000 €
- Bundesland: Bayern (3,5%)
- **Grunderwerbsteuer:** 400.000 € × 3,5% = 14.000 €

**Fälligkeit:**
- Nach Zustellung des Steuerbescheids (ca. 4-8 Wochen nach Kaufvertrag)
- Vor Eigentumsübergang (Auflassung)

**Befreiungen:**
- Schenkung, Erbschaft (keine Grunderwerbsteuer)
- Übertragung zwischen Ehegatten
- Übertragung zwischen Eltern und Kindern

---

**2. Grundsteuer:**

**Definition:**
Die Grundsteuer ist eine jährliche Steuer auf Grundbesitz, die von der Gemeinde erhoben wird.

**Berechnung:**
1. **Einheitswert:** Wert des Grundstücks (wird vom Finanzamt festgelegt)
2. **Grundsteuermesszahl:** 0,26% bis 1,0% (je nach Bundesland und Nutzungsart)
3. **Hebesatz:** Wird von der Gemeinde festgelegt (200% bis 900%)

**Formel:**
Grundsteuer = Einheitswert × Grundsteuermesszahl × Hebesatz

**Beispiel:**
- Einheitswert: 100.000 €
- Grundsteuermesszahl: 0,35% (Einfamilienhaus)
- Hebesatz: 400% (Gemeinde München)
- **Grundsteuer:** 100.000 € × 0,35% × 400% = 1.400 €/Jahr

**Fälligkeit:**
- Vierteljährlich (15. Februar, 15. Mai, 15. August, 15. November)
- Oder jährlich (15. August)

**Reform 2025:**
- Neue Berechnung ab 2025 (Bundesmodell oder Ländermodelle)
- Einheitswert wird durch Grundsteuerwert ersetzt
- Berechnung basiert auf Grundstücksfläche, Bodenrichtwert, Gebäudewert

---

**3. Einkommensteuer auf Mieteinnahmen:**

**Vermietung:**
Mieteinnahmen müssen als Einkünfte aus Vermietung und Verpachtung versteuert werden (§ 21 EStG).

**Berechnung:**
1. **Bruttoeinnahmen:** Kaltmiete + Nebenkosten (soweit umgelegt)
2. **Werbungskosten:** Zinsen, Instandhaltung, AfA, Verwaltung, Versicherungen
3. **Nettoeinkünfte:** Bruttoeinnahmen - Werbungskosten
4. **Steuerlast:** Nettoeinkünfte × persönlicher Steuersatz

**Beispiel:**
- Bruttoeinnahmen: 12.000 €/Jahr (1.000 €/Monat)
- Werbungskosten:
  - Zinsen: 6.000 €
  - Instandhaltung: 1.000 €
  - AfA: 4.000 € (2% von 200.000 € Gebäudewert)
  - Verwaltung: 500 €
  - Versicherungen: 300 €
  - **Gesamt:** 11.800 €
- **Nettoeinkünfte:** 12.000 € - 11.800 € = 200 €
- **Steuerlast (bei 30% Steuersatz):** 200 € × 30% = 60 €

---

**4. Werbungskosten bei Vermietung:**

**Abzugsfähige Kosten:**

**Zinsen:**
- Darlehenszinsen für Immobilienfinanzierung
- Voll abzugsfähig
- **Beispiel:** 6.000 € Zinsen/Jahr

**Abschreibung (AfA - Absetzung für Abnutzung):**
- 2% pro Jahr für Gebäude (Baujahr ab 1925)
- 2,5% pro Jahr für Gebäude (Baujahr vor 1925)
- Bemessungsgrundlage: Gebäudewert (ohne Grundstück)
- **Beispiel:** 200.000 € Gebäudewert × 2% = 4.000 €/Jahr

**Instandhaltung und Modernisierung:**
- Reparaturen, Renovierungen
- Sofort abzugsfähig (Erhaltungsaufwand)
- **Beispiel:** 1.000 € Malerarbeiten

**Verwaltung:**
- Hausverwaltung, Steuerberater
- **Beispiel:** 500 €/Jahr

**Versicherungen:**
- Gebäudeversicherung, Haftpflichtversicherung
- **Beispiel:** 300 €/Jahr

**Grundsteuer:**
- Jährliche Grundsteuer
- **Beispiel:** 1.400 €/Jahr

**Nicht abzugsfähig:**
- Tilgung des Darlehens
- Eigenleistungen
- Private Nutzung

---

**5. Eigennutzung:**

**Keine Mieteinnahmen:**
Bei Eigennutzung fallen keine Mieteinnahmen an, daher keine Einkommensteuer.

**Keine Werbungskosten:**
Zinsen, Instandhaltung, AfA sind nicht abzugsfähig.

**Ausnahme: Homeoffice:**
Wenn Sie ein häusliches Arbeitszimmer haben, können Sie die Kosten anteilig absetzen:
- Bis 1.250 €/Jahr (bei Mittelpunkt der Tätigkeit)
- Bis 1.920 €/Jahr (bei ausschließlicher Nutzung)

---

**6. Spekulationssteuer:**

**Definition:**
Gewinne aus dem Verkauf von Immobilien innerhalb von 10 Jahren sind steuerpflichtig (§ 23 EStG).

**Berechnung:**
- Verkaufspreis - Kaufpreis - Kaufnebenkosten - Modernisierungskosten = Gewinn
- Gewinn × persönlicher Steuersatz = Spekulationssteuer

**Beispiel:**
- Kaufpreis 2020: 300.000 €
- Verkaufspreis 2026: 400.000 €
- Kaufnebenkosten: 30.000 €
- Modernisierung: 20.000 €
- **Gewinn:** 400.000 € - 300.000 € - 30.000 € - 20.000 € = 50.000 €
- **Spekulationssteuer (bei 30% Steuersatz):** 50.000 € × 30% = 15.000 €

**Ausnahmen:**
- **Eigennutzung:** Wenn Sie die Immobilie im Jahr des Verkaufs und in den beiden vorangegangenen Jahren selbst genutzt haben, ist der Gewinn steuerfrei
- **10-Jahres-Frist:** Nach 10 Jahren ist der Gewinn steuerfrei

---

**7. Erbschaftsteuer und Schenkungsteuer:**

**Freibeträge:**
- Ehegatte: 500.000 €
- Kinder: 400.000 €
- Enkel: 200.000 €
- Geschwister, Nichten, Neffen: 20.000 €

**Steuersatz:**
- Steuerklasse I (Ehegatte, Kinder): 7-30%
- Steuerklasse II (Geschwister, Nichten, Neffen): 15-43%
- Steuerklasse III (Fremde): 30-50%

**Beispiel:**
- Immobilienwert: 500.000 €
- Erbe: Kind (Freibetrag 400.000 €)
- **Steuerpflichtiger Betrag:** 500.000 € - 400.000 € = 100.000 €
- **Erbschaftsteuer (bei 11% Steuersatz):** 100.000 € × 11% = 11.000 €

**Begünstigung Familienheim:**
- Wenn Ehegatte oder Kinder die Immobilie selbst nutzen, ist sie steuerfrei
- Bedingung: Nutzung für mindestens 10 Jahre

---

**8. Steuerliche Optimierung:**

**Tipps:**
1. **Kaufnebenkosten minimieren:** Grunderwerbsteuer durch Share Deal umgehen (bei Gewerbeimmobilien)
2. **Werbungskosten maximieren:** Alle abzugsfähigen Kosten geltend machen
3. **AfA nutzen:** 2% pro Jahr abschreiben
4. **Modernisierung:** Erhaltungsaufwand sofort absetzen, Herstellungskosten über AfA
5. **Eigennutzung:** Spekulationssteuer vermeiden durch Eigennutzung vor Verkauf
6. **Schenkung:** Freibeträge alle 10 Jahre nutzen`,
    law: [
      "GrEStG (Grunderwerbsteuergesetz)",
      "GrStG (Grundsteuergesetz)",
      "§ 21 EStG (Einkünfte aus Vermietung und Verpachtung)",
      "§ 23 EStG (Spekulationssteuer)",
      "§ 7 EStG (Abschreibung AfA)",
      "§ 9 EStG (Werbungskosten)",
      "ErbStG (Erbschaftsteuer- und Schenkungsteuergesetz)"
    ],
    practice: `**Praxisfall 1: Grunderwerbsteuer berechnen**

Ein Kunde kauft eine Eigentumswohnung in München für 400.000 €. Bayern erhebt 3,5% Grunderwerbsteuer.

**Fragen:**
1. Wie hoch ist die Grunderwerbsteuer?
2. Wann muss sie bezahlt werden?
3. Wer zahlt die Grunderwerbsteuer?
4. Kann die Grunderwerbsteuer finanziert werden?
5. Gibt es Möglichkeiten, die Grunderwerbsteuer zu reduzieren?

---

**Praxisfall 2: Einkommensteuer auf Mieteinnahmen**

Ein Kunde vermietet eine Eigentumswohnung für 1.200 €/Monat (14.400 €/Jahr). Seine Kosten:
- Zinsen: 7.000 €/Jahr
- Instandhaltung: 1.500 €/Jahr
- AfA: 4.000 €/Jahr (2% von 200.000 € Gebäudewert)
- Verwaltung: 600 €/Jahr
- Versicherungen: 400 €/Jahr
- Grundsteuer: 1.000 €/Jahr

Sein persönlicher Steuersatz beträgt 35%.

**Fragen:**
1. Wie hoch sind die Nettoeinkünfte?
2. Wie hoch ist die Steuerlast?
3. Welche Kosten sind abzugsfähig?
4. Ist die Tilgung abzugsfähig?
5. Lohnt sich die Vermietung steuerlich?

---

**Praxisfall 3: Spekulationssteuer**

Ein Kunde hat 2020 eine Eigentumswohnung für 300.000 € gekauft. 2026 verkauft er sie für 400.000 €. Kaufnebenkosten: 30.000 €, Modernisierung: 20.000 €. Sein persönlicher Steuersatz beträgt 30%.

**Fragen:**
1. Fällt Spekulationssteuer an?
2. Wie hoch ist der Gewinn?
3. Wie hoch ist die Spekulationssteuer?
4. Gibt es Möglichkeiten, die Spekulationssteuer zu vermeiden?
5. Was passiert, wenn er die Wohnung 2031 verkauft?`,
    task: `**Aufgabe 1: Steuerbelastung berechnen**

Berechnen Sie die Steuerbelastung beim Kauf einer Immobilie für 500.000 € in Nordrhein-Westfalen (Grunderwerbsteuer 6,5%):
- Kaufpreis: 500.000 €
- Grunderwerbsteuer: ?
- Notar- und Grundbuchkosten: 2% (10.000 €)
- Maklercourtage: 3,57% (17.850 €)
- **Gesamtkosten:** ?

---

**Aufgabe 2: Werbungskosten ermitteln**

Ein Kunde vermietet eine Wohnung für 1.000 €/Monat. Ermitteln Sie die Werbungskosten:
- Zinsen: 6.000 €/Jahr
- Instandhaltung: 1.200 €/Jahr
- AfA: 3.500 €/Jahr (2% von 175.000 € Gebäudewert)
- Verwaltung: 500 €/Jahr
- Versicherungen: 350 €/Jahr
- Grundsteuer: 1.200 €/Jahr
- **Gesamte Werbungskosten:** ?

---

**Aufgabe 3: Spekulationssteuer berechnen**

Berechnen Sie die Spekulationssteuer:
- Kaufpreis 2021: 350.000 €
- Verkaufspreis 2027: 450.000 €
- Kaufnebenkosten: 35.000 €
- Modernisierung: 25.000 €
- Persönlicher Steuersatz: 32%
- **Gewinn:** ?
- **Spekulationssteuer:** ?`,
    solution: `**Lösung Praxisfall 1:**
1. Grunderwerbsteuer: 400.000 € × 3,5% = 14.000 €.
2. Nach Zustellung des Steuerbescheids (ca. 4-8 Wochen nach Kaufvertrag), vor Eigentumsübergang.
3. Der Käufer zahlt die Grunderwerbsteuer.
4. Ja, die Grunderwerbsteuer kann in die Finanzierung einbezogen werden.
5. Möglichkeiten: Inventar (Einbauküche) separat kaufen (nicht grunderwerbsteuerpflichtig), Share Deal bei Gewerbeimmobilien (ab 90% Anteilserwerb).

**Lösung Praxisfall 2:**
1. Nettoeinkünfte: 14.400 € - (7.000 € + 1.500 € + 4.000 € + 600 € + 400 € + 1.000 €) = 14.400 € - 14.500 € = -100 € (Verlust).
2. Steuerlast: -100 € × 35% = -35 € (Steuererstattung).
3. Abzugsfähig: Zinsen, Instandhaltung, AfA, Verwaltung, Versicherungen, Grundsteuer.
4. Nein, die Tilgung ist nicht abzugsfähig.
5. Ja, die Vermietung lohnt sich steuerlich, da ein Verlust entsteht, der mit anderen Einkünften verrechnet werden kann (Steuererstattung).

**Lösung Praxisfall 3:**
1. Ja, Spekulationssteuer fällt an, da Verkauf innerhalb 10 Jahren (§ 23 EStG).
2. Gewinn: 400.000 € - 300.000 € - 30.000 € - 20.000 € = 50.000 €.
3. Spekulationssteuer: 50.000 € × 30% = 15.000 €.
4. Möglichkeiten: Eigennutzung im Jahr des Verkaufs und in den beiden vorangegangenen Jahren (dann steuerfrei).
5. Wenn er die Wohnung 2031 verkauft (11 Jahre nach Kauf), fällt keine Spekulationssteuer an (10-Jahres-Frist abgelaufen).

**Lösung Aufgabe 1 - Steuerbelastung:**

**Kaufpreis:** 500.000 €
**Grunderwerbsteuer:** 500.000 € × 6,5% = 32.500 €
**Notar- und Grundbuchkosten:** 10.000 €
**Maklercourtage:** 17.850 €
**Gesamtkosten:** 500.000 € + 32.500 € + 10.000 € + 17.850 € = **560.350 €**

**Lösung Aufgabe 2 - Werbungskosten:**

**Zinsen:** 6.000 €
**Instandhaltung:** 1.200 €
**AfA:** 3.500 €
**Verwaltung:** 500 €
**Versicherungen:** 350 €
**Grundsteuer:** 1.200 €
**Gesamte Werbungskosten:** 6.000 € + 1.200 € + 3.500 € + 500 € + 350 € + 1.200 € = **12.750 €**

**Lösung Aufgabe 3 - Spekulationssteuer:**

**Gewinn:** 450.000 € - 350.000 € - 35.000 € - 25.000 € = **40.000 €**
**Spekulationssteuer:** 40.000 € × 32% = **12.800 €**`,
    type: "Theorie"
  },

};
