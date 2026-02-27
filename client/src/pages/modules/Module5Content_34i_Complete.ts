// Modul 5: Darlehensvermittlung §34i GewO
// 40 Tage | 320 UE | NUR §34i-Inhalte (KEINE Wiederholungen!)
// Teil 1: Tage 1-10 (Theorie)

export const contentDataModule5_34i_Part1: Record<string, {
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
    title: "Einführung §34i GewO: Rechtliche Grundlagen der Immobiliardarlehensvermittlung",
    theory: `Die Tätigkeit als Immobiliardarlehensvermittler ist seit dem 21. März 2016 durch das Gesetz zur Umsetzung der Wohnimmobilienkreditrichtlinie geregelt. §34i GewO definiert die Erlaubnispflicht für Personen, die gewerbsmäßig den Abschluss von Immobiliar-Verbraucherdarlehensverträgen vermitteln oder beraten. Ein Immobiliar-Verbraucherdarlehensvertrag ist ein Darlehensvertrag, der durch Grundpfandrechte (Grundschuld oder Hypothek) besichert ist und dem Erwerb, der Erhaltung oder der Renovierung von Wohnimmobilien dient. Die Erlaubnis wird von der zuständigen IHK nach erfolgreicher Sachkundeprüfung erteilt. Voraussetzungen sind: persönliche Zuverlässigkeit, geordnete Vermögensverhältnisse, Berufshaftpflichtversicherung (mind. 1 Mio. € Personenschäden, 250.000 € Sachschäden) und Sachkunde. Die Sachkundeprüfung besteht aus einem schriftlichen und einem praktischen Teil und prüft Kenntnisse in Kundenberatung, rechtlichen Grundlagen und Finanzierungsprodukten.`,
    extendedTheory: `**§34i GewO im Detail:**

**Gesetzliche Grundlage:**
Das Gesetz zur Umsetzung der Wohnimmobilienkreditrichtlinie (Richtlinie 2014/17/EU) trat am 21. März 2016 in Kraft und verschärfte die Anforderungen an Immobiliardarlehensvermittler erheblich. Ziel war der verbesserte Verbraucherschutz durch qualifizierte Beratung und Transparenz.

**Erlaubnispflichtige Tätigkeiten nach §34i Abs. 1 GewO:**
1. **Vermittlung:** Nachweis von Gelegenheiten zum Abschluss von Immobiliar-Verbraucherdarlehensverträgen
2. **Beratung:** Abgabe von Empfehlungen zu Immobiliar-Verbraucherdarlehensverträgen
3. **Abschluss:** Abschluss von Immobiliar-Verbraucherdarlehensverträgen im Namen des Darlehensgebers

**Definition Immobiliar-Verbraucherdarlehensvertrag (§491 Abs. 3 BGB):**
- Darlehen an Verbraucher (natürliche Personen, nicht gewerblich)
- Besicherung durch Grundpfandrechte (Grundschuld, Hypothek, Rentenschuld)
- Zweck: Erwerb, Erhaltung, Renovierung, Modernisierung von Wohnimmobilien
- Auch Umschuldungen bestehender Immobiliendarlehen

**Erlaubnisvoraussetzungen (§34i Abs. 2 GewO):**

1. **Persönliche Zuverlässigkeit:**
   - Keine Vorstrafen (Führungszeugnis)
   - Keine Insolvenzverfahren in den letzten 5 Jahren
   - Keine Verstöße gegen Gewerberecht

2. **Geordnete Vermögensverhältnisse:**
   - Keine Überschuldung
   - Keine Privatinsolvenz
   - Schufa-Auskunft ohne negative Einträge

3. **Berufshaftpflichtversicherung:**
   - Mindestdeckung: 1.000.000 € pro Personenschaden
   - Mindestdeckung: 250.000 € pro Sachschaden
   - Jahreshöchstleistung: 1.500.000 € (bei mehreren Schadensfällen)
   - Versicherung muss vor Tätigkeitsbeginn nachgewiesen werden

4. **Sachkunde:**
   - IHK-Sachkundeprüfung "Geprüfte/r Fachmann/-frau für Immobiliardarlehensvermittlung IHK"
   - Alternativ: Gleichwertige Qualifikation (z.B. Bankfachwirt, Immobilienfachwirt)
   - Nachweis durch Prüfungszeugnis

**Sachkundeprüfung - Aufbau:**

**Schriftlicher Teil (120 Minuten):**
- 40 Multiple-Choice-Fragen
- 2 Fallstudien
- Mindestpunktzahl: 50% (50 von 100 Punkten)

**Praktischer Teil (30 Minuten):**
- Simuliertes Kundengespräch
- Bedarfsanalyse
- Produktempfehlung
- Dokumentation

**Prüfungsinhalte:**
1. Kundenberatung (20%)
2. Rechtliche Grundlagen (30%)
3. Finanzierung und Kreditprodukte (50%)

**Unterschied §34c (Makler) vs. §34i (Darlehensvermittler):**

| Kriterium | §34c Makler | §34i Darlehensvermittler |
|-----------|-------------|--------------------------|
| Tätigkeit | Vermittlung von Immobilien | Vermittlung von Immobiliendarlehen |
| Prüfung | IHK-Sachkundeprüfung | IHK-Sachkundeprüfung |
| Haftpflicht | 1 Mio. € / 250.000 € | 1 Mio. € / 250.000 € |
| Provision | 3-7% vom Kaufpreis | 0,5-2% vom Darlehensbetrag |
| Vertragspartner | Verkäufer & Käufer | Darlehensgeber & Darlehensnehmer |

**Berufspflichten nach §34i Abs. 3 GewO:**
- Informationspflichten (§491a BGB)
- Beratungspflichten (§511 BGB)
- Dokumentationspflichten (§511 BGB)
- Weiterbildungspflicht (15 Stunden/Jahr)

**Sanktionen bei Verstößen:**
- Bußgeld bis 50.000 € (§144 GewO)
- Erlaubnisentzug (§35 GewO)
- Schadensersatzansprüche des Kunden (§280 BGB)
- Strafrechtliche Verfolgung bei Betrug (§263 StGB)`,
    law: [
      "§ 34i GewO (Erlaubnispflicht Immobiliardarlehensvermittler)",
      "§ 491 Abs. 3 BGB (Immobiliar-Verbraucherdarlehensvertrag)",
      "§ 491a BGB (Informationspflichten)",
      "§ 511 BGB (Beratungs- und Dokumentationspflichten)",
      "§ 35 GewO (Erlaubnisentzug)",
      "§ 144 GewO (Bußgeldvorschriften)",
      "Richtlinie 2014/17/EU (Wohnimmobilienkreditrichtlinie)"
    ],
    practice: `**Praxisfall 1: Erlaubnispflicht prüfen**

Herr Müller möchte als selbstständiger Finanzberater tätig werden und Kunden bei der Immobilienfinanzierung unterstützen. Er plant folgende Tätigkeiten:
- Beratung zu Immobiliendarlehen
- Vermittlung von Darlehensverträgen an Banken
- Erstellung von Finanzierungsplänen
- Begleitung zum Notartermin

**Fragen:**
1. Benötigt Herr Müller eine Erlaubnis nach §34i GewO?
2. Welche Voraussetzungen muss er erfüllen?
3. Welche Versicherung benötigt er?
4. Wie hoch sind die Mindestdeckungssummen?
5. Welche Prüfung muss er ablegen?

---

**Praxisfall 2: Abgrenzung §34c vs. §34i**

Frau Schmidt ist bereits als Immobilienmaklerin (§34c GewO) tätig und möchte ihr Geschäftsfeld erweitern. Sie fragt sich, ob sie auch Immobiliendarlehen vermitteln darf.

**Fragen:**
1. Darf Frau Schmidt mit ihrer §34c-Erlaubnis auch Darlehen vermitteln?
2. Welche zusätzliche Erlaubnis benötigt sie?
3. Kann sie die Sachkundeprüfung überspringen, da sie bereits §34c hat?
4. Welche Haftpflichtversicherung benötigt sie?
5. Wie hoch ist die typische Provision bei Darlehensvermittlung?

---

**Praxisfall 3: Verstoß gegen §34i GewO**

Herr Becker vermittelt seit 2 Jahren Immobiliendarlehen ohne Erlaubnis nach §34i GewO. Ein Kunde beschwert sich bei der IHK, da er falsch beraten wurde und einen zu teuren Kredit abgeschlossen hat.

**Fragen:**
1. Welche Sanktionen drohen Herrn Becker?
2. Kann der Kunde Schadensersatz fordern?
3. Ist der Darlehensvertrag gültig?
4. Welche Behörde ist zuständig?
5. Wie hoch kann das Bußgeld sein?`,
    task: `**Aufgabe 1: Erlaubnisantrag vorbereiten**

Erstellen Sie eine Checkliste mit allen erforderlichen Unterlagen für einen Erlaubnisantrag nach §34i GewO. Berücksichtigen Sie:
- Persönliche Nachweise
- Versicherungsnachweise
- Qualifikationsnachweise
- Gewerbeanmeldung

---

**Aufgabe 2: Vergleichstabelle erstellen**

Erstellen Sie eine Vergleichstabelle zwischen §34c (Makler) und §34i (Darlehensvermittler) mit folgenden Kriterien:
- Tätigkeit
- Prüfung
- Haftpflichtversicherung
- Provision
- Vertragspartner
- Weiterbildungspflicht

---

**Aufgabe 3: Fallbeispiel analysieren**

Ein Kunde fragt Sie, ob Sie ihm bei der Finanzierung einer Eigentumswohnung helfen können. Die Wohnung kostet 300.000 €, der Kunde hat 60.000 € Eigenkapital. Erklären Sie dem Kunden:
- Ihre Rolle als Immobiliardarlehensvermittler
- Den Unterschied zu einem Bankberater
- Ihre Vergütung (Provision)
- Ihre Pflichten (Beratung, Dokumentation)`,
    solution: `**Lösung Praxisfall 1:**
1. Ja, Herr Müller benötigt eine Erlaubnis nach §34i GewO, da er gewerbsmäßig Immobiliendarlehen vermittelt und berät.
2. Voraussetzungen: Persönliche Zuverlässigkeit, geordnete Vermögensverhältnisse, Berufshaftpflichtversicherung, Sachkunde.
3. Berufshaftpflichtversicherung für Vermögensschäden.
4. Mindestdeckung: 1.000.000 € Personenschäden, 250.000 € Sachschäden.
5. IHK-Sachkundeprüfung "Geprüfte/r Fachmann/-frau für Immobiliardarlehensvermittlung IHK".

**Lösung Praxisfall 2:**
1. Nein, die §34c-Erlaubnis berechtigt nicht zur Darlehensvermittlung.
2. Zusätzliche Erlaubnis nach §34i GewO erforderlich.
3. Nein, die Sachkundeprüfung §34i muss separat abgelegt werden.
4. Separate Haftpflichtversicherung für §34i oder kombinierte Police.
5. Typische Provision: 0,5-2% vom Darlehensbetrag (z.B. 1.500-6.000 € bei 300.000 € Darlehen).

**Lösung Praxisfall 3:**
1. Bußgeld bis 50.000 €, strafrechtliche Verfolgung möglich.
2. Ja, der Kunde kann Schadensersatz nach §280 BGB fordern.
3. Ja, der Darlehensvertrag bleibt gültig (zwischen Bank und Kunde).
4. Zuständige IHK und Ordnungsamt.
5. Bußgeld bis 50.000 € nach §144 GewO.

**Lösung Aufgabe 1 - Checkliste Erlaubnisantrag:**
- Personalausweis/Reisepass (Kopie)
- Führungszeugnis (nicht älter als 3 Monate)
- Schufa-Auskunft (nicht älter als 3 Monate)
- Nachweis Berufshaftpflichtversicherung
- IHK-Prüfungszeugnis Sachkunde §34i
- Gewerbeanmeldung (Formular GewA1)
- Lebenslauf
- Antragsformular §34i GewO (von IHK)

**Lösung Aufgabe 2 - Vergleichstabelle:**
| Kriterium | §34c Makler | §34i Darlehensvermittler |
|-----------|-------------|--------------------------|
| Tätigkeit | Vermittlung von Immobilien | Vermittlung von Immobiliendarlehen |
| Prüfung | IHK-Sachkundeprüfung | IHK-Sachkundeprüfung |
| Haftpflicht | 1 Mio. € / 250.000 € | 1 Mio. € / 250.000 € |
| Provision | 3-7% vom Kaufpreis | 0,5-2% vom Darlehensbetrag |
| Vertragspartner | Verkäufer & Käufer | Darlehensgeber & Darlehensnehmer |
| Weiterbildung | 20 Stunden/Jahr (empfohlen) | 15 Stunden/Jahr (Pflicht) |

**Lösung Aufgabe 3 - Fallbeispiel:**
"Als Immobiliardarlehensvermittler berate ich Sie unabhängig und vergleiche Angebote verschiedener Banken. Im Unterschied zu einem Bankberater, der nur die Produkte seiner Bank anbietet, habe ich Zugang zu über 400 Banken und Sparkassen. Meine Vergütung erfolgt durch eine Provision von ca. 1% des Darlehensbetrags (bei 240.000 € Darlehen = 2.400 €), die entweder Sie als Kunde oder die Bank zahlt. Ich bin verpflichtet, Sie umfassend zu beraten, Ihre finanzielle Situation zu prüfen und die Beratung zu dokumentieren. Sie erhalten von mir ein Beratungsprotokoll und können sich jederzeit auf meine Empfehlung berufen."`,
    type: "Theorie"
  },

  day_2: {
    title: "Rechtsfähigkeit, Geschäftsfähigkeit und Vertragsrecht",
    theory: `Rechtsfähigkeit ist die Fähigkeit, Träger von Rechten und Pflichten zu sein. Jeder Mensch ist ab Geburt rechtsfähig (§ 1 BGB). Geschäftsfähigkeit ist die Fähigkeit, Rechtsgeschäfte (z.B. Verträge) wirksam abzuschließen. Sie beginnt mit Vollendung des 18. Lebensjahres (§ 2 BGB). Minderjährige (7-17 Jahre) sind beschränkt geschäftsfähig und benötigen die Zustimmung der Eltern für Verträge, die nicht lediglich rechtlich vorteilhaft sind (§ 107 BGB). Kinder unter 7 Jahren sind geschäftsunfähig (§ 104 BGB). Ein Vertrag ist ein Rechtsgeschäft, das aus übereinstimmenden Willenserklärungen (Angebot und Annahme) besteht (§§ 145-157 BGB). Für Immobiliar-Verbraucherdarlehensverträge gelten besondere Formvorschriften: Schriftform (§ 492 Abs. 1 BGB), Widerrufsrecht (§ 495 BGB) und Informationspflichten (§ 491a BGB).`,
    extendedTheory: `**Rechtsfähigkeit und Geschäftsfähigkeit im Detail:**

**1. Rechtsfähigkeit (§ 1 BGB):**
Rechtsfähigkeit ist die Fähigkeit, Träger von Rechten und Pflichten zu sein. Sie beginnt mit der Vollendung der Geburt und endet mit dem Tod.

**Rechte:**
- Eigentum (§ 903 BGB)
- Forderungen (§ 241 BGB)
- Persönlichkeitsrechte (Art. 1, 2 GG)

**Pflichten:**
- Vertragspflichten (§ 241 BGB)
- Schadensersatzpflichten (§ 823 BGB)
- Steuerpflichten (AO)

**Juristische Personen:**
Auch juristische Personen (GmbH, AG, Vereine) sind rechtsfähig (§ 21 BGB, § 13 GmbHG, § 1 AktG).

---

**2. Geschäftsfähigkeit:**

**Volle Geschäftsfähigkeit (§ 2 BGB):**
- Ab Vollendung des 18. Lebensjahres
- Berechtigung, alle Rechtsgeschäfte wirksam abzuschließen
- Keine Zustimmung Dritter erforderlich

**Beschränkte Geschäftsfähigkeit (§§ 106-113 BGB):**
- Minderjährige zwischen 7 und 17 Jahren
- Rechtsgeschäfte bedürfen der Zustimmung der gesetzlichen Vertreter (Eltern)
- Ausnahmen:
  - Lediglich rechtlich vorteilhafte Geschäfte (§ 107 BGB) - z.B. Schenkung annehmen
  - Taschengeldparagraf (§ 110 BGB) - Geschäfte mit Mitteln, die zur freien Verfügung überlassen wurden
  - Arbeitsvertrag mit Zustimmung des Vormundschaftsgerichts (§ 113 BGB)

**Geschäftsunfähigkeit (§ 104 BGB):**
- Kinder unter 7 Jahren
- Personen in dauerhafter krankhafter Störung der Geistestätigkeit
- Rechtsgeschäfte sind nichtig (§ 105 BGB)

---

**3. Vertragsrecht - Zustandekommen eines Vertrags:**

**Angebot (§ 145 BGB):**
- Willenserklärung, die alle wesentlichen Vertragsbestandteile enthält
- Bindungswirkung: Der Antragende ist an sein Angebot gebunden
- Beispiel: Bank bietet Darlehen zu 3,5% Zinsen an

**Annahme (§ 147 BGB):**
- Zustimmende Willenserklärung des Empfängers
- Muss rechtzeitig erfolgen (unter Anwesenden sofort, unter Abwesenden innerhalb der Annahmefrist)
- Beispiel: Kunde unterschreibt Darlehensvertrag

**Vertragsschluss:**
Vertrag kommt zustande, wenn Angebot und Annahme übereinstimmen (Konsens).

---

**4. Formvorschriften bei Immobiliar-Verbraucherdarlehensverträgen:**

**Schriftform (§ 492 Abs. 1 BGB):**
- Vertrag muss schriftlich abgeschlossen werden
- Eigenhändige Unterschrift des Darlehensnehmers erforderlich
- Elektronische Form (§ 126a BGB) ist nicht ausreichend
- Zweck: Schutz des Verbrauchers vor übereilten Entscheidungen

**Pflichtangaben im Vertrag (§ 492 Abs. 2 BGB):**
1. Nettodarlehensbetrag
2. Gesamtbetrag (Darlehensbetrag + Zinsen + Kosten)
3. Sollzinssatz (fest oder variabel)
4. Effektiver Jahreszins
5. Laufzeit
6. Höhe, Anzahl und Fälligkeit der Raten
7. Angaben zur Besicherung (Grundschuld, Hypothek)
8. Widerrufsbelehrung

**Widerrufsrecht (§ 495 BGB):**
- 14 Tage Widerrufsfrist ab Vertragsschluss
- Widerruf muss schriftlich erfolgen
- Keine Angabe von Gründen erforderlich
- Zweck: Verbraucherschutz, Bedenkzeit

**Informationspflichten (§ 491a BGB):**
- Vorvertragliche Informationen (Europäisches Standardisiertes Merkblatt ESIS)
- Angaben zu Zinsen, Kosten, Laufzeit, Risiken
- Muss rechtzeitig vor Vertragsschluss übergeben werden

---

**5. Besonderheiten bei Minderjährigen:**

**Problem:** Minderjährige können keine Immobiliar-Verbraucherdarlehensverträge abschließen, da diese nicht lediglich rechtlich vorteilhaft sind (§ 107 BGB).

**Lösung:** Zustimmung der gesetzlichen Vertreter (Eltern) erforderlich (§ 107 BGB).

**Ausnahme:** Volljährige Minderjährige (18 Jahre) können ohne Zustimmung Verträge abschließen.

---

**6. Nichtigkeit und Anfechtbarkeit:**

**Nichtigkeit (§§ 134, 138, 125 BGB):**
- Verstoß gegen gesetzliches Verbot (§ 134 BGB)
- Sittenwidrigkeit (§ 138 BGB) - z.B. Wucherzinsen
- Formmangel (§ 125 BGB) - z.B. fehlende Schriftform

**Anfechtbarkeit (§§ 119-123 BGB):**
- Irrtum (§ 119 BGB) - z.B. Verschreiben bei Zinssatz
- Täuschung (§ 123 BGB) - z.B. falsche Angaben der Bank
- Drohung (§ 123 BGB) - z.B. Drohung mit Kündigung

**Rechtsfolge:**
- Nichtigkeit: Vertrag ist von Anfang an unwirksam
- Anfechtbarkeit: Vertrag wird rückwirkend unwirksam, wenn angefochten wird`,
    law: [
      "§ 1 BGB (Rechtsfähigkeit)",
      "§ 2 BGB (Volljährigkeit)",
      "§§ 104-113 BGB (Geschäftsfähigkeit)",
      "§§ 145-157 BGB (Vertragsschluss)",
      "§ 492 BGB (Schriftform Verbraucherdarlehensvertrag)",
      "§ 491a BGB (Informationspflichten)",
      "§ 495 BGB (Widerrufsrecht)",
      "§§ 119-123 BGB (Anfechtung)",
      "§§ 134, 138, 125 BGB (Nichtigkeit)"
    ],
    practice: `**Praxisfall 1: Geschäftsfähigkeit prüfen**

Ein 17-jähriger Schüler möchte eine Eigentumswohnung für 200.000 € kaufen und benötigt dafür ein Darlehen von 180.000 €. Seine Eltern sind einverstanden und bereit, den Vertrag mitzuunterschreiben.

**Fragen:**
1. Ist der Schüler geschäftsfähig?
2. Kann er den Darlehensvertrag alleine abschließen?
3. Welche Rolle spielen die Eltern?
4. Ist der Vertrag wirksam, wenn nur der Schüler unterschreibt?
5. Was passiert, wenn die Eltern nachträglich zustimmen?

---

**Praxisfall 2: Formvorschriften**

Eine Bank bietet einem Kunden ein Immobiliendarlehen per E-Mail an. Der Kunde antwortet per E-Mail mit "Ich nehme an" und überweist die erste Rate. Die Bank behauptet, der Vertrag sei wirksam zustande gekommen.

**Fragen:**
1. Ist der Vertrag wirksam?
2. Welche Form ist für Immobiliar-Verbraucherdarlehensverträge vorgeschrieben?
3. Kann die elektronische Form (§ 126a BGB) verwendet werden?
4. Was sind die Rechtsfolgen eines Formmangels?
5. Kann der Kunde die erste Rate zurückfordern?

---

**Praxisfall 3: Widerrufsrecht**

Ein Kunde unterschreibt am 1. März 2026 einen Darlehensvertrag über 300.000 €. Am 10. März 2026 findet er ein günstigeres Angebot bei einer anderen Bank und möchte den Vertrag widerrufen.

**Fragen:**
1. Hat der Kunde ein Widerrufsrecht?
2. Wie lange beträgt die Widerrufsfrist?
3. Muss der Kunde Gründe für den Widerruf angeben?
4. Welche Form muss der Widerruf haben?
5. Was passiert mit bereits ausgezahlten Darlehensbeträgen?`,
    task: `**Aufgabe 1: Geschäftsfähigkeitsprüfung**

Erstellen Sie eine Checkliste zur Prüfung der Geschäftsfähigkeit eines Kunden vor Abschluss eines Darlehensvertrags. Berücksichtigen Sie:
- Alter
- Gesetzliche Vertreter (bei Minderjährigen)
- Betreuung (bei Erwachsenen)
- Geschäftsfähigkeitsvermutung

---

**Aufgabe 2: Vertragsschluss analysieren**

Ein Kunde erhält am 1. März 2026 ein Darlehensangebot von einer Bank (3,5% Zinsen, 300.000 €, 30 Jahre Laufzeit). Das Angebot ist bis 15. März 2026 gültig. Der Kunde unterschreibt am 10. März 2026 und schickt den Vertrag per Post zurück. Die Bank erhält den Vertrag am 12. März 2026.

**Fragen:**
- Wann kommt der Vertrag zustande?
- Ist das Angebot noch gültig?
- Was passiert, wenn die Bank den Vertrag am 16. März 2026 erhält?

---

**Aufgabe 3: Widerrufsbelehrung formulieren**

Formulieren Sie eine Widerrufsbelehrung für einen Immobiliar-Verbraucherdarlehensvertrag. Berücksichtigen Sie:
- Widerrufsfrist (14 Tage)
- Form des Widerrufs (schriftlich)
- Rechtsfolgen des Widerrufs
- Muster-Widerrufsformular`,
    solution: `**Lösung Praxisfall 1:**
1. Nein, der Schüler ist beschränkt geschäftsfähig (§ 106 BGB).
2. Nein, er benötigt die Zustimmung seiner Eltern (§ 107 BGB).
3. Die Eltern müssen als gesetzliche Vertreter zustimmen oder den Vertrag mitunterschreiben.
4. Nein, der Vertrag ist schwebend unwirksam (§ 108 BGB).
5. Die Zustimmung der Eltern macht den Vertrag rückwirkend wirksam (§ 184 BGB).

**Lösung Praxisfall 2:**
1. Nein, der Vertrag ist unwirksam wegen Formmangels (§ 125 BGB).
2. Schriftform mit eigenhändiger Unterschrift (§ 492 Abs. 1 BGB).
3. Nein, elektronische Form ist nicht ausreichend.
4. Der Vertrag ist nichtig (§ 125 BGB).
5. Ja, der Kunde kann die erste Rate nach §§ 812 ff. BGB (ungerechtfertigte Bereicherung) zurückfordern.

**Lösung Praxisfall 3:**
1. Ja, der Kunde hat ein Widerrufsrecht nach § 495 BGB.
2. 14 Tage ab Vertragsschluss (1. März - 15. März 2026).
3. Nein, keine Begründung erforderlich.
4. Schriftform (Brief, E-Mail, Fax).
5. Bereits ausgezahlte Beträge müssen zurückgezahlt werden, der Kunde zahlt Nutzungsentschädigung (Zinsen) für die Zeit der Nutzung.

**Lösung Aufgabe 1 - Checkliste Geschäftsfähigkeit:**
- Personalausweis/Geburtsurkunde prüfen (Alter)
- Bei Minderjährigen: Zustimmung der Eltern einholen
- Bei Betreuung: Betreuungsausweis prüfen, Zustimmung des Betreuers einholen
- Bei Zweifeln: Geschäftsfähigkeitsvermutung (§ 104 BGB) - im Zweifel geschäftsfähig
- Dokumentation: Kopie Personalausweis, Zustimmungserklärung

**Lösung Aufgabe 2:**
- Vertrag kommt am 12. März 2026 zustande (Zugang der Annahme bei der Bank, § 130 BGB).
- Ja, das Angebot ist noch gültig (Annahmefrist bis 15. März 2026).
- Wenn die Bank den Vertrag am 16. März 2026 erhält, ist das Angebot erloschen (§ 146 BGB), der Vertrag kommt nicht zustande.

**Lösung Aufgabe 3 - Widerrufsbelehrung:**

**Widerrufsbelehrung**

Sie können Ihre Vertragserklärung innerhalb von 14 Tagen ohne Angabe von Gründen in Textform (z.B. Brief, Fax, E-Mail) widerrufen. Die Frist beginnt am Tag nach Vertragsschluss. Zur Wahrung der Widerrufsfrist genügt die rechtzeitige Absendung des Widerrufs.

**Widerrufsadresse:**
[Name der Bank]
[Adresse]
[E-Mail]

**Widerrufsfolgen:**
Im Falle eines wirksamen Widerrufs sind die beiderseits empfangenen Leistungen zurückzugewähren. Sie sind zur Zahlung von Nutzungsentschädigung (Zinsen) verpflichtet, wenn Sie das Darlehen bereits in Anspruch genommen haben.

**Muster-Widerrufsformular:**
Hiermit widerrufe ich den am [Datum] geschlossenen Darlehensvertrag.
[Name, Adresse, Datum, Unterschrift]`,
    type: "Theorie"
  },

  day_3: {
    title: "Grundstücke, Erbbaurecht, Wohnungseigentum - Rechtliche Grundlagen",
    theory: `Ein Grundstück ist ein abgegrenzter Teil der Erdoberfläche, der im Grundbuch eingetragen ist (§ 873 BGB). Jedes Grundstück hat eine eindeutige Bezeichnung (Gemarkung, Flur, Flurstück). Grundstücksgleiche Rechte sind Rechte, die wie Grundstücke behandelt werden: Erbbaurecht (§§ 1-27 ErbbauRG) und Wohnungseigentum (§§ 1-60 WEG). Das Erbbaurecht ist das veräußerliche und vererbliche Recht, auf einem fremden Grundstück ein Bauwerk zu errichten und zu nutzen (§ 1 ErbbauRG). Die Laufzeit beträgt meist 66-99 Jahre, der Erbbauzins wird jährlich an den Grundstückseigentümer gezahlt. Wohnungseigentum ist das Sondereigentum an einer Wohnung in Verbindung mit dem Miteigentumsanteil am Gemeinschaftseigentum (§ 1 WEG). Es entsteht durch Teilungserklärung oder Teilungsvertrag und wird im Grundbuch eingetragen.`,
    extendedTheory: `**Grundstücke und grundstücksgleiche Rechte im Detail:**

**1. Grundstück (§ 873 BGB):**

**Definition:**
Ein Grundstück ist ein abgegrenzter Teil der Erdoberfläche, der im Grundbuch eingetragen ist. Es ist ein unbewegliches Wirtschaftsgut und gehört zu den wichtigsten Vermögenswerten.

**Bestandteile eines Grundstücks (§ 94 BGB):**
- **Wesentliche Bestandteile:** Gebäude, Bäume, Pflanzen (fest mit dem Grundstück verbunden)
- **Zubehör (§ 97 BGB):** Bewegliche Sachen, die dem Zweck des Grundstücks dienen (z.B. Heizungsanlage, Einbauküche)

**Grundbuchbezeichnung:**
Jedes Grundstück hat eine eindeutige Bezeichnung:
- **Gemarkung:** Katasterbezirk (z.B. "München-Schwabing")
- **Flur:** Unterabteilung der Gemarkung (z.B. "Flur 12")
- **Flurstück:** Einzelnes Grundstück (z.B. "Flurstück 345")
- **Beispiel:** Gemarkung München-Schwabing, Flur 12, Flurstück 345

**Grundstücksarten:**
- **Unbebautes Grundstück:** Bauland, Ackerland, Wald
- **Bebautes Grundstück:** Wohngebäude, Gewerbegebäude
- **Erbbaurechtsgrundstück:** Grundstück mit Erbbaurecht belastet

---

**2. Erbbaurecht (§§ 1-27 ErbbauRG):**

**Definition (§ 1 ErbbauRG):**
Das Erbbaurecht ist das veräußerliche und vererbliche Recht, auf oder unter der Oberfläche eines fremden Grundstücks ein Bauwerk zu haben.

**Funktionsweise:**
- Der Grundstückseigentümer (Erbbauverpflichteter) bleibt Eigentümer des Grundstücks
- Der Erbbauberechtigte erhält das Recht, ein Gebäude zu errichten und zu nutzen
- Der Erbbauberechtigte zahlt einen jährlichen Erbbauzins an den Grundstückseigentümer

**Laufzeit:**
- Typisch: 66-99 Jahre
- Verlängerung möglich (Verhandlungssache)
- Nach Ablauf: Gebäude fällt an den Grundstückseigentümer (Heimfall)

**Erbbauzins:**
- Jährliche Zahlung an den Grundstückseigentümer
- Höhe: 3-6% des Grundstückswerts
- Beispiel: Grundstückswert 200.000 €, Erbbauzins 4% = 8.000 €/Jahr
- Indexierung möglich (Anpassung an Inflation)

**Vorteile:**
- Geringere Anschaffungskosten (nur Gebäude, nicht Grundstück)
- Steuerliche Vorteile (Erbbauzins als Werbungskosten absetzbar)
- Nutzung ohne Grundstückskauf

**Nachteile:**
- Laufende Kosten (Erbbauzins)
- Heimfallrisiko (Gebäude fällt nach Ablauf an Grundstückseigentümer)
- Finanzierung schwieriger (Banken bevorzugen Volleigentum)

**Grundbucheintragung:**
Das Erbbaurecht wird in einem eigenen Erbbaugrundbuch eingetragen (§ 10 ErbbauRG). Es kann wie ein Grundstück belastet werden (Grundschuld, Hypothek).

---

**3. Wohnungseigentum (§§ 1-60 WEG):**

**Definition (§ 1 WEG):**
Wohnungseigentum ist das Sondereigentum an einer Wohnung in Verbindung mit dem Miteigentumsanteil am Gemeinschaftseigentum.

**Entstehung:**
1. **Teilungserklärung (§ 3 WEG):** Grundstückseigentümer erklärt die Aufteilung in Wohnungseigentum
2. **Teilungsvertrag (§ 3 WEG):** Mehrere Eigentümer teilen das Grundstück
3. **Grundbucheintragung:** Wohnungseigentum entsteht erst mit Eintragung im Grundbuch

**Sondereigentum (§ 5 WEG):**
- Räume innerhalb der Wohnung (Wände, Decken, Böden)
- Fenster, Türen (innerhalb der Wohnung)
- Nicht: Tragende Wände, Fassade, Dach

**Gemeinschaftseigentum (§ 5 WEG):**
- Grundstück
- Gebäudehülle (Fassade, Dach, Fundament)
- Treppenhaus, Aufzug, Heizungsanlage
- Gemeinschaftsräume (Waschküche, Fahrradkeller)

**Miteigentumsanteil:**
Jeder Wohnungseigentümer hat einen Miteigentumsanteil am Gemeinschaftseigentum, ausgedrückt in Bruchteilen (z.B. 45/1000).

**Verwaltung:**
- **Eigentümerversammlung:** Beschlussfassung über Gemeinschaftsangelegenheiten (§ 23 WEG)
- **Verwalter:** Führt die Beschlüsse aus, erstellt Jahresabrechnung (§ 27 WEG)
- **Hausgeld:** Monatliche Zahlung für Instandhaltung, Verwaltung, Rücklagen

**Finanzierung:**
Wohnungseigentum kann wie ein Grundstück finanziert werden. Die Bank lässt sich eine Grundschuld im Wohnungsgrundbuch eintragen.

---

**4. Unterschiede Grundstück, Erbbaurecht, Wohnungseigentum:**

| Kriterium | Grundstück | Erbbaurecht | Wohnungseigentum |
|-----------|------------|-------------|------------------|
| Eigentum | Volleigentum | Nur Gebäude | Wohnung + Miteigentum |
| Laufzeit | Unbegrenzt | 66-99 Jahre | Unbegrenzt |
| Kosten | Kaufpreis | Erbbauzins | Kaufpreis + Hausgeld |
| Grundbuch | Grundbuch | Erbbaugrundbuch | Wohnungsgrundbuch |
| Finanzierung | Einfach | Schwieriger | Einfach |

---

**5. Bedeutung für die Immobilienfinanzierung:**

**Grundstück:**
- Höchste Sicherheit für die Bank
- Beleihungswert = 80-90% des Verkehrswerts
- Niedrigste Zinsen

**Erbbaurecht:**
- Geringere Sicherheit (Heimfallrisiko)
- Beleihungswert = 60-70% des Verkehrswerts
- Höhere Zinsen (Risikozuschlag 0,2-0,5%)

**Wohnungseigentum:**
- Gute Sicherheit
- Beleihungswert = 80-90% des Verkehrswerts
- Normale Zinsen
- Zusätzliche Prüfung: Hausgeld, Instandhaltungsrücklagen, Beschlüsse`,
    law: [
      "§ 873 BGB (Grundstück)",
      "§ 94 BGB (Wesentliche Bestandteile)",
      "§ 97 BGB (Zubehör)",
      "§§ 1-27 ErbbauRG (Erbbaurecht)",
      "§§ 1-60 WEG (Wohnungseigentumsgesetz)",
      "§ 3 WEG (Entstehung Wohnungseigentum)",
      "§ 5 WEG (Sondereigentum, Gemeinschaftseigentum)",
      "§ 23 WEG (Eigentümerversammlung)",
      "§ 27 WEG (Verwalter)"
    ],
    practice: `**Praxisfall 1: Erbbaurecht finanzieren**

Ein Kunde möchte eine Eigentumswohnung auf Erbbaurechtsgrundstück kaufen. Der Kaufpreis beträgt 250.000 €, der Erbbauzins 6.000 €/Jahr (3% von 200.000 € Grundstückswert), die Restlaufzeit des Erbbaurechts 75 Jahre.

**Fragen:**
1. Was ist ein Erbbaurecht?
2. Wer ist Eigentümer des Grundstücks?
3. Was passiert nach Ablauf der 75 Jahre?
4. Wie hoch sind die jährlichen Gesamtkosten (Erbbauzins + Finanzierung)?
5. Ist die Finanzierung schwieriger als bei Volleigentum?

---

**Praxisfall 2: Wohnungseigentum bewerten**

Ein Kunde möchte eine Eigentumswohnung (80 m², 3 Zimmer) kaufen. Der Kaufpreis beträgt 300.000 €, das Hausgeld 250 €/Monat, die Instandhaltungsrücklage 50.000 €. Die Eigentümerversammlung hat eine Dachsanierung für 100.000 € beschlossen.

**Fragen:**
1. Was ist Wohnungseigentum?
2. Was gehört zum Sondereigentum?
3. Was gehört zum Gemeinschaftseigentum?
4. Wie hoch sind die monatlichen Gesamtkosten (Hausgeld + Finanzierung)?
5. Muss der Kunde die Dachsanierung mitbezahlen?

---

**Praxisfall 3: Grundstücksarten vergleichen**

Ein Kunde hat drei Optionen:
- **Option A:** Grundstück + Haus für 500.000 € (Volleigentum)
- **Option B:** Haus auf Erbbaurechtsgrundstück für 300.000 € + 9.000 €/Jahr Erbbauzins (Restlaufzeit 80 Jahre)
- **Option C:** Eigentumswohnung für 350.000 € + 300 €/Monat Hausgeld

**Fragen:**
1. Welche Option hat die niedrigsten Anschaffungskosten?
2. Welche Option hat die niedrigsten laufenden Kosten?
3. Welche Option ist am einfachsten zu finanzieren?
4. Welche Option hat das höchste Risiko?
5. Welche Option würden Sie empfehlen?`,
    task: `**Aufgabe 1: Erbbaurecht erklären**

Erstellen Sie eine Kundeninformation zum Thema Erbbaurecht. Erklären Sie:
- Was ist ein Erbbaurecht?
- Wie funktioniert es?
- Vorteile und Nachteile
- Finanzierungsmöglichkeiten
- Beispielrechnung (Erbbauzins, Gesamtkosten)

---

**Aufgabe 2: Wohnungseigentum analysieren**

Ein Kunde zeigt Ihnen folgende Unterlagen einer Eigentumswohnung:
- Kaufpreis: 280.000 €
- Wohnfläche: 75 m²
- Miteigentumsanteil: 38/1000
- Hausgeld: 220 €/Monat
- Instandhaltungsrücklage: 35.000 €
- Beschluss Eigentümerversammlung: Fassadensanierung 80.000 €

Analysieren Sie:
- Ist das Hausgeld angemessen?
- Ist die Instandhaltungsrücklage ausreichend?
- Welche Kosten kommen auf den Käufer zu?
- Wie hoch ist der Anteil an der Fassadensanierung?

---

**Aufgabe 3: Vergleichstabelle erstellen**

Erstellen Sie eine Vergleichstabelle für Grundstück, Erbbaurecht und Wohnungseigentum mit folgenden Kriterien:
- Eigentum
- Laufzeit
- Kosten (Anschaffung, laufend)
- Grundbuch
- Finanzierung
- Risiken`,
    solution: `**Lösung Praxisfall 1:**
1. Erbbaurecht ist das Recht, auf einem fremden Grundstück ein Gebäude zu errichten und zu nutzen (§ 1 ErbbauRG).
2. Der Grundstückseigentümer (Erbbauverpflichteter) bleibt Eigentümer.
3. Nach 75 Jahren fällt das Gebäude an den Grundstückseigentümer (Heimfall), der Kunde erhält eine Entschädigung.
4. Jährliche Gesamtkosten: 6.000 € Erbbauzins + ca. 9.000 € Finanzierung (3,5% von 250.000 €) = 15.000 €/Jahr.
5. Ja, Banken bevorzugen Volleigentum, Risikozuschlag 0,2-0,5% auf Zinssatz.

**Lösung Praxisfall 2:**
1. Wohnungseigentum ist Sondereigentum an einer Wohnung + Miteigentumsanteil am Gemeinschaftseigentum (§ 1 WEG).
2. Sondereigentum: Räume, Wände, Decken, Böden innerhalb der Wohnung.
3. Gemeinschaftseigentum: Grundstück, Fassade, Dach, Treppenhaus, Heizung.
4. Monatliche Gesamtkosten: 250 € Hausgeld + ca. 1.050 € Finanzierung (3,5% von 300.000 €) = 1.300 €/Monat.
5. Ja, die Dachsanierung wird über das Hausgeld oder eine Sonderumlage finanziert, der Kunde muss seinen Anteil zahlen.

**Lösung Praxisfall 3:**
1. Option B (Erbbaurecht) hat die niedrigsten Anschaffungskosten (300.000 €).
2. Option A (Volleigentum) hat die niedrigsten laufenden Kosten (nur Finanzierung, kein Erbbauzins/Hausgeld).
3. Option A (Volleigentum) ist am einfachsten zu finanzieren (höchste Sicherheit für Bank).
4. Option B (Erbbaurecht) hat das höchste Risiko (Heimfall nach 80 Jahren).
5. Empfehlung: Option A (Volleigentum) - höchste Sicherheit, niedrigste Gesamtkosten langfristig.

**Lösung Aufgabe 1 - Kundeninformation Erbbaurecht:**

**Was ist ein Erbbaurecht?**
Das Erbbaurecht ist das Recht, auf einem fremden Grundstück ein Gebäude zu errichten und zu nutzen. Der Grundstückseigentümer bleibt Eigentümer, der Erbbauberechtigte zahlt einen jährlichen Erbbauzins.

**Funktionsweise:**
- Laufzeit: 66-99 Jahre
- Erbbauzins: 3-6% des Grundstückswerts/Jahr
- Heimfall: Nach Ablauf fällt das Gebäude an den Grundstückseigentümer

**Vorteile:**
- Niedrigere Anschaffungskosten (nur Gebäude)
- Steuerliche Vorteile (Erbbauzins absetzbar)

**Nachteile:**
- Laufende Kosten (Erbbauzins)
- Heimfallrisiko
- Schwierigere Finanzierung

**Beispielrechnung:**
- Grundstückswert: 200.000 €
- Erbbauzins: 4% = 8.000 €/Jahr
- Gebäudewert: 300.000 €
- Finanzierung: 3,5% = 10.500 €/Jahr
- **Gesamtkosten: 18.500 €/Jahr**

**Lösung Aufgabe 2 - Wohnungseigentum analysieren:**

**Hausgeld:**
220 €/Monat für 75 m² = 2,93 €/m²/Monat - **angemessen** (Durchschnitt: 2,50-3,50 €/m²)

**Instandhaltungsrücklage:**
35.000 € für 38/1000 Anteil = ca. 921 €/m² - **ausreichend** (Empfehlung: 500-1.000 €/m²)

**Kosten für Käufer:**
- Kaufpreis: 280.000 €
- Hausgeld: 220 €/Monat = 2.640 €/Jahr
- Anteil Fassadensanierung: 80.000 € × (38/1000) = 3.040 €

**Anteil Fassadensanierung:**
38/1000 = 3,8% von 80.000 € = **3.040 €**

**Lösung Aufgabe 3 - Vergleichstabelle:**

| Kriterium | Grundstück | Erbbaurecht | Wohnungseigentum |
|-----------|------------|-------------|------------------|
| Eigentum | Volleigentum | Nur Gebäude | Wohnung + Miteigentum |
| Laufzeit | Unbegrenzt | 66-99 Jahre | Unbegrenzt |
| Anschaffung | Hoch | Mittel | Mittel |
| Laufende Kosten | Niedrig | Hoch (Erbbauzins) | Mittel (Hausgeld) |
| Grundbuch | Grundbuch | Erbbaugrundbuch | Wohnungsgrundbuch |
| Finanzierung | Einfach | Schwieriger | Einfach |
| Risiken | Niedrig | Heimfall | Beschlüsse, Sanierungen |`,
    type: "Theorie"
  },

  day_4: {
    title: "Grundbuch: Aufbau, Funktion und Eintragungen",
    theory: `Das Grundbuch ist ein öffentliches Register, das Auskunft über Eigentumsverhältnisse, Belastungen und Rechte an Grundstücken gibt (§ 873 BGB). Es wird vom Grundbuchamt (Amtsgericht) geführt und ist für jedermann einsehbar, der ein berechtigtes Interesse nachweist (§ 12 GBO). Das Grundbuch ist in fünf Teile gegliedert: **Aufschrift** (Grundbuchblatt-Nummer, Amtsgericht), **Bestandsverzeichnis** (Lage, Größe, Nutzungsart des Grundstücks), **Abteilung I** (Eigentümer), **Abteilung II** (Lasten und Beschränkungen außer Grundpfandrechte), **Abteilung III** (Grundpfandrechte: Grundschuld, Hypothek). Eintragungen im Grundbuch haben konstitutive Wirkung: Ein Recht entsteht erst mit der Eintragung (§ 873 BGB). Das Grundbuch genießt öffentlichen Glauben: Wer auf die Richtigkeit des Grundbuchs vertraut, wird geschützt (§ 892 BGB).`,
    extendedTheory: `**Das Grundbuch im Detail:**

**1. Funktion und Bedeutung:**

Das Grundbuch ist das zentrale Register für Immobilien in Deutschland. Es dient:
- **Publizität:** Öffentliche Bekanntmachung von Eigentumsverhältnissen und Belastungen
- **Rechtssicherheit:** Schutz des Rechtsverkehrs durch öffentlichen Glauben (§ 892 BGB)
- **Beweisfunktion:** Nachweis von Eigentum und Rechten

**Grundbuchzwang (§ 873 BGB):**
Rechte an Grundstücken entstehen, ändern sich oder erlöschen nur durch Eintragung im Grundbuch. Ausnahme: Gesetzlicher Eigentumserwerb (z.B. Erbschaft).

---

**2. Aufbau des Grundbuchs:**

**Aufschrift:**
- Grundbuchblatt-Nummer (z.B. "Blatt 1234")
- Amtsgericht (z.B. "Amtsgericht München")
- Band und Blatt (z.B. "Band 12, Blatt 345")

**Bestandsverzeichnis:**
- **Lage:** Gemarkung, Flur, Flurstück (z.B. "Gemarkung München-Schwabing, Flur 12, Flurstück 345")
- **Größe:** Fläche in m² (z.B. "500 m²")
- **Nutzungsart:** Wohngebäude, Ackerland, Wald (z.B. "Wohngebäude")
- **Besonderheiten:** Erbbaurecht, Wohnungseigentum

**Abteilung I - Eigentümer:**
- Name, Vorname, Geburtsdatum des Eigentümers
- Erwerbsgrund (z.B. "Kauf", "Erbschaft", "Schenkung")
- Datum der Eintragung
- Beispiel: "Max Mustermann, geb. 01.01.1980, Kauf vom 15.03.2026"

**Abteilung II - Lasten und Beschränkungen (außer Grundpfandrechte):**
- **Dienstbarkeiten:** Wegerecht, Leitungsrecht, Wohnrecht
- **Reallasten:** Wiederkehrende Leistungen (z.B. Leibrente)
- **Vorkaufsrecht:** Recht zum Vorkauf bei Verkauf
- **Auflassungsvormerkung:** Sicherung des Käufers vor Eigentumsübergang
- Beispiel: "Wegerecht zugunsten des Grundstücks Flurstück 346"

**Abteilung III - Grundpfandrechte:**
- **Grundschuld:** Belastung des Grundstücks zur Sicherung eines Darlehens
- **Hypothek:** Akzessorische Sicherheit (abhängig von Darlehensforderung)
- **Rentenschuld:** Wiederkehrende Zahlungen
- Beispiel: "Grundschuld 300.000 € zugunsten der Sparkasse München"

---

**3. Rangfolge der Eintragungen:**

**Rangprinzip (§ 879 BGB):**
Der Rang bestimmt die Reihenfolge der Befriedigung bei Zwangsversteigerung. Frühere Eintragungen haben Vorrang vor späteren.

**Beispiel:**
- **Rang 1:** Grundschuld 200.000 € (Sparkasse)
- **Rang 2:** Grundschuld 100.000 € (Volksbank)
- **Rang 3:** Grundschuld 50.000 € (Privatperson)

Bei Zwangsversteigerung wird zuerst die Sparkasse befriedigt, dann die Volksbank, dann die Privatperson.

**Rangvorbehalt:**
Möglichkeit, einen Rang freizuhalten für spätere Eintragungen (z.B. für Modernisierungsdarlehen).

---

**4. Nicht eingetragene Lasten:**

**Öffentliche Lasten (§ 10 ZVG):**
Lasten, die nicht im Grundbuch eingetragen sind, aber dennoch bestehen:
- **Grundsteuer:** Jährliche Steuer auf Grundbesitz
- **Erschließungsbeiträge:** Kosten für Straßen, Wasser, Abwasser
- **Denkmalschutz:** Auflagen für denkmalgeschützte Gebäude
- **Altlasten:** Kontaminierung des Bodens

Diese Lasten gehen bei Zwangsversteigerung auf den Ersteigerer über!

---

**5. Eintragungsverfahren:**

**Antrag (§ 13 GBO):**
Eintragungen erfolgen nur auf Antrag des Berechtigten oder aufgrund gerichtlicher/behördlicher Verfügung.

**Bewilligung (§ 19 GBO):**
Der Betroffene muss der Eintragung zustimmen (z.B. Eigentümer bei Grundschuldbestellung).

**Eintragung:**
Das Grundbuchamt prüft die Unterlagen und trägt das Recht ein. Die Eintragung wird dem Antragsteller mitgeteilt.

**Dauer:**
- Einfache Eintragungen: 2-4 Wochen
- Komplexe Eintragungen: 4-8 Wochen

---

**6. Öffentlicher Glaube des Grundbuchs (§ 892 BGB):**

**Schutz des gutgläubigen Erwerbers:**
Wer auf die Richtigkeit des Grundbuchs vertraut, wird geschützt, auch wenn das Grundbuch fehlerhaft ist.

**Beispiel:**
A verkauft ein Grundstück an B. Im Grundbuch steht noch A als Eigentümer. B vertraut darauf und kauft. Später stellt sich heraus, dass C der wahre Eigentümer ist. B ist trotzdem geschützt und wird Eigentümer.

**Ausnahme:**
Kein Schutz bei Kenntnis der Unrichtigkeit oder grober Fahrlässigkeit.

---

**7. Grundbucheinsicht (§ 12 GBO):**

**Berechtigtes Interesse:**
Einsicht in das Grundbuch kann nehmen, wer ein berechtigtes Interesse nachweist:
- **Eigentümer:** Jederzeit
- **Kaufinteressent:** Mit Vollmacht des Eigentümers
- **Gläubiger:** Mit Vollmacht des Schuldners
- **Behörden:** Bei hoheitlichen Aufgaben
- **Notar:** Bei Beurkundung

**Antrag:**
Grundbucheinsicht kann beim Grundbuchamt (Amtsgericht) beantragt werden. Kosten: 10-20 €.

---

**8. Bedeutung für die Immobilienfinanzierung:**

**Grundbuchauszug:**
Die Bank verlangt vor Darlehenszusage einen aktuellen Grundbuchauszug (nicht älter als 3 Monate), um:
- Eigentumsverhältnisse zu prüfen
- Bestehende Belastungen zu erkennen (Abteilung II, III)
- Rang für die neue Grundschuld zu bestimmen

**Grundschuldbestellung:**
Die Bank lässt sich zur Sicherung des Darlehens eine Grundschuld im Grundbuch eintragen (Abteilung III). Die Eintragung erfolgt nach Darlehenszusage und vor Auszahlung.

**Löschungsbewilligung:**
Nach vollständiger Rückzahlung des Darlehens erteilt die Bank eine Löschungsbewilligung. Der Eigentümer kann dann die Grundschuld im Grundbuch löschen lassen.`,
    law: [
      "§ 873 BGB (Eintragungszwang)",
      "§ 892 BGB (Öffentlicher Glaube)",
      "§ 879 BGB (Rangprinzip)",
      "§ 12 GBO (Grundbucheinsicht)",
      "§ 13 GBO (Antrag)",
      "§ 19 GBO (Bewilligung)",
      "§ 10 ZVG (Öffentliche Lasten)",
      "GBO (Grundbuchordnung)"
    ],
    practice: `**Praxisfall 1: Grundbuchauszug analysieren**

Ein Kunde zeigt Ihnen folgenden Grundbuchauszug:

**Bestandsverzeichnis:**
Gemarkung München-Schwabing, Flur 12, Flurstück 345, 500 m², Wohngebäude

**Abteilung I:**
Max Mustermann, geb. 01.01.1980, Kauf vom 15.03.2020

**Abteilung II:**
Wegerecht zugunsten des Grundstücks Flurstück 346

**Abteilung III:**
1. Grundschuld 250.000 € zugunsten der Sparkasse München
2. Grundschuld 50.000 € zugunsten der Volksbank München

**Fragen:**
1. Wer ist Eigentümer des Grundstücks?
2. Welche Belastungen bestehen?
3. In welcher Reihenfolge werden die Gläubiger bei Zwangsversteigerung befriedigt?
4. Kann der Kunde ein weiteres Darlehen aufnehmen?
5. Wie hoch ist die Gesamtbelastung?

---

**Praxisfall 2: Rangfolge bestimmen**

Ein Kunde möchte ein Grundstück kaufen, das bereits mit zwei Grundschulden belastet ist:
- Rang 1: Grundschuld 200.000 € (Sparkasse)
- Rang 2: Grundschuld 100.000 € (Volksbank)

Der Kunde benötigt ein Darlehen von 150.000 € und fragt, welchen Rang seine Bank erhält.

**Fragen:**
1. Welchen Rang erhält die neue Grundschuld?
2. Was passiert bei Zwangsversteigerung, wenn das Grundstück für 400.000 € verkauft wird?
3. Was passiert, wenn das Grundstück nur für 250.000 € verkauft wird?
4. Kann die Bank einen besseren Rang verlangen?
5. Wie kann der Kunde die Rangfolge verbessern?

---

**Praxisfall 3: Nicht eingetragene Lasten**

Ein Kunde kauft ein Grundstück für 300.000 €. Im Grundbuch sind keine Belastungen eingetragen. Nach dem Kauf erhält er eine Rechnung über 20.000 € für Erschließungsbeiträge (Straße, Wasser, Abwasser).

**Fragen:**
1. Muss der Kunde die Erschließungsbeiträge zahlen?
2. Warum stehen diese Lasten nicht im Grundbuch?
3. Hätte der Verkäufer den Käufer informieren müssen?
4. Kann der Kunde die Kosten vom Verkäufer zurückfordern?
5. Wie kann man solche Lasten vor dem Kauf erkennen?`,
    task: `**Aufgabe 1: Grundbuchauszug erstellen**

Erstellen Sie einen fiktiven Grundbuchauszug für ein Einfamilienhaus mit folgenden Angaben:
- Lage: Gemarkung Berlin-Mitte, Flur 5, Flurstück 123
- Größe: 600 m²
- Eigentümer: Anna Schmidt, geb. 15.05.1985, Kauf vom 10.01.2025
- Belastungen: Wegerecht zugunsten Flurstück 124, Grundschuld 350.000 € (Deutsche Bank)

---

**Aufgabe 2: Rangfolge berechnen**

Ein Grundstück wird zwangsversteigert und für 500.000 € verkauft. Im Grundbuch stehen folgende Grundschulden:
- Rang 1: 300.000 € (Sparkasse)
- Rang 2: 150.000 € (Volksbank)
- Rang 3: 100.000 € (Privatperson)

Berechnen Sie, wie viel jeder Gläubiger erhält.

---

**Aufgabe 3: Grundbucheinsicht beantragen**

Ein Kunde möchte ein Grundstück kaufen und benötigt einen Grundbuchauszug. Erklären Sie ihm:
- Wo kann er den Grundbuchauszug beantragen?
- Welche Unterlagen benötigt er?
- Wie lange dauert es?
- Was kostet es?
- Welche Informationen enthält der Auszug?`,
    solution: `**Lösung Praxisfall 1:**
1. Max Mustermann ist Eigentümer (Abteilung I).
2. Belastungen: Wegerecht (Abteilung II), Grundschuld 250.000 € (Rang 1), Grundschuld 50.000 € (Rang 2) (Abteilung III).
3. Reihenfolge: 1. Sparkasse (250.000 €), 2. Volksbank (50.000 €).
4. Ja, aber die neue Grundschuld erhält Rang 3 (nach Sparkasse und Volksbank).
5. Gesamtbelastung: 250.000 € + 50.000 € = 300.000 €.

**Lösung Praxisfall 2:**
1. Die neue Grundschuld erhält Rang 3.
2. Bei 400.000 € Verkaufserlös: Sparkasse 200.000 €, Volksbank 100.000 €, neue Bank 100.000 € (Rest 50.000 € fehlt).
3. Bei 250.000 € Verkaufserlös: Sparkasse 200.000 €, Volksbank 50.000 €, neue Bank 0 € (komplett ausgefallen).
4. Ja, die Bank kann verlangen, dass die Volksbank ihren Rang abtritt (Rangänderung, § 880 BGB).
5. Kunde kann die Volksbank ablösen (100.000 € zurückzahlen), dann erhält die neue Bank Rang 2.

**Lösung Praxisfall 3:**
1. Ja, der Kunde muss die Erschließungsbeiträge zahlen (§ 10 ZVG).
2. Erschließungsbeiträge sind öffentliche Lasten und werden nicht im Grundbuch eingetragen.
3. Ja, der Verkäufer hätte den Käufer informieren müssen (§ 433 BGB, Aufklärungspflicht).
4. Ja, der Kunde kann Schadensersatz verlangen, wenn der Verkäufer die Lasten verschwiegen hat (§ 280 BGB).
5. Anfrage bei der Gemeinde (Bauamt, Erschließungsamt) vor dem Kauf.

**Lösung Aufgabe 1 - Grundbuchauszug:**

**Grundbuch von Berlin-Mitte**
**Blatt 5678**

**Bestandsverzeichnis:**
Gemarkung Berlin-Mitte, Flur 5, Flurstück 123, 600 m², Wohngebäude

**Abteilung I - Eigentümer:**
Anna Schmidt, geb. 15.05.1985, Kauf vom 10.01.2025

**Abteilung II - Lasten und Beschränkungen:**
Wegerecht zugunsten des Grundstücks Flurstück 124

**Abteilung III - Grundpfandrechte:**
Grundschuld 350.000 € zugunsten der Deutschen Bank AG

**Lösung Aufgabe 2 - Rangfolge:**

Verkaufserlös: 500.000 €

- **Rang 1 (Sparkasse):** 300.000 € (vollständig befriedigt)
- **Rang 2 (Volksbank):** 150.000 € (vollständig befriedigt)
- **Rang 3 (Privatperson):** 50.000 € (teilweise befriedigt, 50.000 € fehlen)

**Verteilung:**
- Sparkasse: 300.000 €
- Volksbank: 150.000 €
- Privatperson: 50.000 € (Rest 50.000 € Ausfall)

**Lösung Aufgabe 3 - Grundbucheinsicht:**

**Wo beantragen?**
Beim Grundbuchamt (Amtsgericht) am Ort des Grundstücks.

**Welche Unterlagen?**
- Vollmacht des Eigentümers (bei Kaufinteresse)
- Personalausweis
- Nachweis des berechtigten Interesses

**Dauer:**
- Persönliche Einsicht: Sofort
- Schriftlicher Auszug: 1-2 Wochen

**Kosten:**
10-20 € (abhängig vom Bundesland)

**Informationen im Auszug:**
- Bestandsverzeichnis (Lage, Größe, Nutzungsart)
- Abteilung I (Eigentümer)
- Abteilung II (Lasten, Beschränkungen)
- Abteilung III (Grundpfandrechte)`,
    type: "Theorie"
  },

  day_5: {
    title: "Immobiliar-Verbraucherdarlehensvertrag und Verbraucherkreditrecht",
    theory: `Ein Immobiliar-Verbraucherdarlehensvertrag ist ein Darlehensvertrag zwischen einem Darlehensgeber (Bank) und einem Verbraucher (Privatperson), der durch Grundpfandrechte besichert ist und dem Erwerb, der Erhaltung oder der Renovierung von Wohnimmobilien dient (§ 491 Abs. 3 BGB). Das Verbraucherkreditrecht schützt Verbraucher vor überhöhten Zinsen, intransparenten Vertragsbedingungen und unzureichender Aufklärung. Zentrale Vorschriften sind: Schriftform (§ 492 BGB), Informationspflichten (§ 491a BGB), Widerrufsrecht (§ 495 BGB), Vorfälligkeitsentschädigung (§ 502 BGB) und Kündigungsrecht (§ 500 BGB). Der effektive Jahreszins muss angegeben werden, um Vergleichbarkeit zu gewährleisten (§ 492 Abs. 2 BGB). Verstöße gegen diese Vorschriften können zur Nichtigkeit des Vertrags oder zu Schadensersatzansprüchen führen.`,
    extendedTheory: `**Immobiliar-Verbraucherdarlehensvertrag und Verbraucherkreditrecht im Detail:**

**1. Definition Immobiliar-Verbraucherdarlehensvertrag (§ 491 Abs. 3 BGB):**

Ein Immobiliar-Verbraucherdarlehensvertrag liegt vor, wenn folgende Voraussetzungen erfüllt sind:

**Verbraucher (§ 13 BGB):**
- Natürliche Person
- Handelt zu Zwecken, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können
- **Beispiel:** Privatperson kauft Eigentumswohnung zur Eigennutzung oder Vermietung

**Darlehensgeber:**
- Bank, Sparkasse, Bausparkasse
- Gewerblicher Kreditgeber

**Besicherung durch Grundpfandrechte:**
- Grundschuld (§§ 1191 ff. BGB)
- Hypothek (§§ 1113 ff. BGB)
- Rentenschuld (§§ 1199 ff. BGB)

**Zweck:**
- Erwerb von Wohnimmobilien (Kauf)
- Erhaltung (Instandhaltung, Reparatur)
- Renovierung (Modernisierung, Sanierung)

**Nicht erfasst:**
- Gewerbliche Immobiliendarlehen
- Darlehen ohne Grundpfandrechte (z.B. Konsumentenkredit)
- Bauspardarlehen (§ 491 Abs. 3 Nr. 2 BGB)

---

**2. Schriftform (§ 492 Abs. 1 BGB):**

**Anforderungen:**
- Vertrag muss schriftlich abgeschlossen werden
- Eigenhändige Unterschrift des Darlehensnehmers erforderlich
- Elektronische Form (§ 126a BGB) ist nicht ausreichend
- Alle Vertragsbestandteile müssen in einer Urkunde zusammengefasst sein

**Zweck:**
- Schutz des Verbrauchers vor übereilten Entscheidungen
- Beweissicherung
- Transparenz

**Rechtsfolge bei Verstoß:**
- Vertrag ist nichtig (§ 125 BGB)
- Darlehensnehmer kann bereits gezahlte Zinsen zurückfordern
- Darlehensgeber kann nur den Nettodarlehensbetrag zurückfordern

---

**3. Pflichtangaben im Vertrag (§ 492 Abs. 2 BGB):**

Der Vertrag muss folgende Angaben enthalten:

1. **Nettodarlehensbetrag:**
   - Betrag, der dem Darlehensnehmer zur Verfügung gestellt wird
   - Beispiel: 300.000 €

2. **Gesamtbetrag:**
   - Nettodarlehensbetrag + Zinsen + Kosten
   - Beispiel: 300.000 € + 150.000 € Zinsen + 5.000 € Kosten = 455.000 €

3. **Sollzinssatz:**
   - Zinssatz pro Jahr
   - Fest oder variabel
   - Beispiel: 3,5% p.a. (fest für 10 Jahre)

4. **Effektiver Jahreszins:**
   - Gesamtkosten des Darlehens pro Jahr in Prozent
   - Berücksichtigt Zinsen, Gebühren, Disagio
   - Beispiel: 3,8% p.a.

5. **Laufzeit:**
   - Dauer des Darlehens
   - Beispiel: 30 Jahre

6. **Höhe, Anzahl und Fälligkeit der Raten:**
   - Monatliche Rate: 1.500 €
   - Anzahl: 360 Raten
   - Fälligkeit: Jeweils zum 1. des Monats

7. **Angaben zur Besicherung:**
   - Grundschuld 300.000 € auf Grundstück Gemarkung München-Schwabing, Flur 12, Flurstück 345

8. **Widerrufsbelehrung:**
   - Hinweis auf 14-tägiges Widerrufsrecht

---

**4. Informationspflichten (§ 491a BGB):**

**Vorvertragliche Informationen:**
Der Darlehensgeber muss dem Darlehensnehmer rechtzeitig vor Vertragsschluss folgende Informationen übergeben:

**Europäisches Standardisiertes Merkblatt (ESIS):**
- Standardisiertes Formular (EU-weit einheitlich)
- Enthält alle wichtigen Vertragsinformationen
- Muss mindestens 7 Tage vor Vertragsschluss übergeben werden

**Inhalt ESIS:**
- Darlehensgeber (Name, Adresse)
- Nettodarlehensbetrag
- Laufzeit
- Sollzinssatz (fest/variabel)
- Effektiver Jahreszins
- Monatliche Rate
- Gesamtbetrag
- Besicherung (Grundschuld)
- Widerrufsrecht
- Vorfälligkeitsentschädigung
- Risiken (Zinsänderung, Zahlungsunfähigkeit)

**Zweck:**
- Vergleichbarkeit von Angeboten
- Transparenz
- Schutz vor Überschuldung

---

**5. Widerrufsrecht (§ 495 BGB):**

**Widerrufsfrist:**
- 14 Tage ab Vertragsschluss
- Beginnt erst, wenn der Darlehensnehmer alle Pflichtinformationen erhalten hat
- Bei fehlender oder fehlerhafter Widerrufsbelehrung: Widerrufsfrist verlängert sich auf 12 Monate + 14 Tage

**Form des Widerrufs:**
- Schriftlich (Brief, Fax, E-Mail)
- Keine Angabe von Gründen erforderlich

**Rechtsfolgen:**
- Vertrag wird rückwirkend unwirksam
- Darlehensnehmer muss Nettodarlehensbetrag zurückzahlen
- Darlehensnehmer zahlt Nutzungsentschädigung (Zinsen) für die Zeit der Nutzung
- Darlehensgeber muss bereits gezahlte Zinsen und Gebühren zurückzahlen

**Beispiel:**
Kunde schließt am 1. März 2026 einen Darlehensvertrag über 300.000 € ab. Am 10. März 2026 widerruft er. Er muss 300.000 € + Nutzungsentschädigung (ca. 250 € für 9 Tage) zurückzahlen.

---

**6. Vorfälligkeitsentschädigung (§ 502 BGB):**

**Definition:**
Entschädigung der Bank für entgangene Zinsen bei vorzeitiger Rückzahlung des Darlehens während der Zinsbindungsfrist.

**Berechnung:**
1. **Aktiv-Passiv-Methode:**
   - Differenz zwischen Sollzins und Wiederanlagezins
   - Beispiel: Sollzins 3,5%, Wiederanlagezins 2,0% → Differenz 1,5%
   - Vorfälligkeitsentschädigung = Restschuld × Differenz × Restlaufzeit

2. **Aktiv-Aktiv-Methode:**
   - Differenz zwischen ursprünglichem und neuem Darlehen
   - Selten angewendet

**Höchstgrenze (§ 502 Abs. 2 BGB):**
- 1% der Restschuld, wenn Restlaufzeit > 12 Monate
- 0,5% der Restschuld, wenn Restlaufzeit ≤ 12 Monate

**Beispiel:**
- Restschuld: 200.000 €
- Restlaufzeit: 5 Jahre
- Sollzins: 3,5%
- Wiederanlagezins: 2,0%
- Differenz: 1,5%
- **Vorfälligkeitsentschädigung:** 200.000 € × 1,5% × 5 = 15.000 €
- **Höchstgrenze:** 200.000 € × 1% = 2.000 € (gilt nicht, da Restlaufzeit > 12 Monate)

---

**7. Kündigungsrecht (§ 500 BGB):**

**Ordentliche Kündigung:**
- Nach 10 Jahren Zinsbindung mit 6 Monaten Kündigungsfrist
- Keine Vorfälligkeitsentschädigung

**Außerordentliche Kündigung:**
- Bei berechtigtem Interesse (§ 490 BGB)
- Beispiel: Verkauf der Immobilie, Zahlungsunfähigkeit
- Vorfälligkeitsentschädigung fällig

---

**8. Verstöße und Rechtsfolgen:**

**Verstoß gegen Schriftform:**
- Vertrag nichtig (§ 125 BGB)
- Darlehensnehmer kann Zinsen zurückfordern

**Verstoß gegen Informationspflichten:**
- Widerrufsfrist verlängert sich auf 12 Monate + 14 Tage
- Schadensersatzansprüche möglich (§ 280 BGB)

**Verstoß gegen Widerrufsbelehrung:**
- Widerrufsfrist verlängert sich auf 12 Monate + 14 Tage
- "Ewiges Widerrufsrecht" bei fehlender Belehrung

**Verstoß gegen Vorfälligkeitsentschädigung:**
- Überhöhte Vorfälligkeitsentschädigung kann zurückgefordert werden
- Schadensersatzansprüche möglich`,
    law: [
      "§ 491 Abs. 3 BGB (Immobiliar-Verbraucherdarlehensvertrag)",
      "§ 492 BGB (Schriftform, Pflichtangaben)",
      "§ 491a BGB (Informationspflichten, ESIS)",
      "§ 495 BGB (Widerrufsrecht)",
      "§ 502 BGB (Vorfälligkeitsentschädigung)",
      "§ 500 BGB (Kündigungsrecht)",
      "§ 490 BGB (Außerordentliche Kündigung)",
      "§ 13 BGB (Verbraucher)",
      "§ 125 BGB (Nichtigkeit bei Formmangel)"
    ],
    practice: `**Praxisfall 1: Widerrufsrecht prüfen**

Ein Kunde unterschreibt am 1. April 2026 einen Darlehensvertrag über 350.000 €. Die Bank händigt ihm das ESIS-Merkblatt am 25. März 2026 aus, die Widerrufsbelehrung fehlt jedoch. Am 20. April 2026 möchte der Kunde widerrufen.

**Fragen:**
1. Hat der Kunde ein Widerrufsrecht?
2. Wie lange beträgt die Widerrufsfrist?
3. Ist der Widerruf am 20. April 2026 noch möglich?
4. Was sind die Rechtsfolgen des Widerrufs?
5. Welche Kosten trägt der Kunde?

---

**Praxisfall 2: Vorfälligkeitsentschädigung berechnen**

Ein Kunde möchte sein Darlehen vorzeitig zurückzahlen:
- Restschuld: 250.000 €
- Restlaufzeit: 8 Jahre
- Sollzins: 4,0% p.a.
- Aktueller Wiederanlagezins: 2,5% p.a.

**Fragen:**
1. Muss der Kunde eine Vorfälligkeitsentschädigung zahlen?
2. Wie wird die Vorfälligkeitsentschädigung berechnet?
3. Wie hoch ist die Vorfälligkeitsentschädigung?
4. Gibt es eine Höchstgrenze?
5. Kann der Kunde die Zahlung vermeiden?

---

**Praxisfall 3: Informationspflichten**

Eine Bank bietet einem Kunden ein Darlehen an, übergibt aber kein ESIS-Merkblatt. Der Kunde unterschreibt den Vertrag am 1. Mai 2026. Am 1. Juni 2027 (13 Monate später) möchte er widerrufen.

**Fragen:**
1. Hatte die Bank eine Informationspflicht?
2. Was ist das ESIS-Merkblatt?
3. Welche Rechtsfolgen hat die fehlende Übergabe?
4. Kann der Kunde nach 13 Monaten noch widerrufen?
5. Welche Schadensersatzansprüche hat der Kunde?`,
    task: `**Aufgabe 1: ESIS-Merkblatt erstellen**

Erstellen Sie ein vereinfachtes ESIS-Merkblatt für folgendes Darlehen:
- Darlehensgeber: Sparkasse München
- Nettodarlehensbetrag: 300.000 €
- Laufzeit: 25 Jahre
- Sollzinssatz: 3,5% p.a. (fest für 15 Jahre)
- Effektiver Jahreszins: 3,7% p.a.
- Monatliche Rate: 1.500 €
- Besicherung: Grundschuld 300.000 €

---

**Aufgabe 2: Vorfälligkeitsentschädigung berechnen**

Berechnen Sie die Vorfälligkeitsentschädigung für folgende Szenarien:

**Szenario A:**
- Restschuld: 200.000 €
- Restlaufzeit: 3 Jahre
- Sollzins: 3,0%
- Wiederanlagezins: 1,5%

**Szenario B:**
- Restschuld: 150.000 €
- Restlaufzeit: 10 Monate
- Sollzins: 4,0%
- Wiederanlagezins: 2,0%

---

**Aufgabe 3: Widerrufsbelehrung formulieren**

Formulieren Sie eine Widerrufsbelehrung für einen Immobiliar-Verbraucherdarlehensvertrag. Berücksichtigen Sie:
- Widerrufsfrist (14 Tage)
- Form des Widerrufs (schriftlich)
- Rechtsfolgen
- Muster-Widerrufsformular`,
    solution: `**Lösung Praxisfall 1:**
1. Ja, der Kunde hat ein Widerrufsrecht (§ 495 BGB).
2. Die Widerrufsfrist beträgt 14 Tage ab Vertragsschluss, verlängert sich aber auf 12 Monate + 14 Tage, da die Widerrufsbelehrung fehlt.
3. Ja, der Widerruf am 20. April 2026 ist noch möglich (innerhalb von 12 Monaten + 14 Tagen).
4. Rechtsfolgen: Vertrag wird rückwirkend unwirksam, Kunde muss 350.000 € + Nutzungsentschädigung zurückzahlen.
5. Kosten: Nutzungsentschädigung (ca. 1.750 € für 19 Tage bei 3,5% Zinsen).

**Lösung Praxisfall 2:**
1. Ja, der Kunde muss eine Vorfälligkeitsentschädigung zahlen (§ 502 BGB).
2. Berechnung: Restschuld × (Sollzins - Wiederanlagezins) × Restlaufzeit.
3. Vorfälligkeitsentschädigung: 250.000 € × (4,0% - 2,5%) × 8 = 30.000 €.
4. Ja, Höchstgrenze: 1% der Restschuld = 2.500 € (gilt nicht, da Restlaufzeit > 12 Monate).
5. Ja, durch ordentliche Kündigung nach 10 Jahren Zinsbindung (§ 500 BGB) - keine Vorfälligkeitsentschädigung.

**Lösung Praxisfall 3:**
1. Ja, die Bank hatte eine Informationspflicht (§ 491a BGB).
2. Das ESIS-Merkblatt ist ein standardisiertes Formular mit allen wichtigen Vertragsinformationen.
3. Rechtsfolgen: Widerrufsfrist verlängert sich auf 12 Monate + 14 Tage.
4. Ja, der Kunde kann nach 13 Monaten noch widerrufen (innerhalb von 12 Monaten + 14 Tagen).
5. Schadensersatzansprüche: Kunde kann Zinsen und Gebühren zurückfordern, die er aufgrund der fehlenden Information gezahlt hat (§ 280 BGB).

**Lösung Aufgabe 1 - ESIS-Merkblatt:**

**Europäisches Standardisiertes Merkblatt (ESIS)**

**Darlehensgeber:**
Sparkasse München
Musterstraße 1, 80331 München

**Nettodarlehensbetrag:** 300.000 €

**Laufzeit:** 25 Jahre (300 Monate)

**Sollzinssatz:** 3,5% p.a. (fest für 15 Jahre)

**Effektiver Jahreszins:** 3,7% p.a.

**Monatliche Rate:** 1.500 €

**Gesamtbetrag:** 450.000 € (300 Raten × 1.500 €)

**Besicherung:** Grundschuld 300.000 € auf Grundstück Gemarkung München-Schwabing, Flur 12, Flurstück 345

**Widerrufsrecht:** Sie können diesen Vertrag innerhalb von 14 Tagen ohne Angabe von Gründen widerrufen.

**Vorfälligkeitsentschädigung:** Bei vorzeitiger Rückzahlung kann eine Vorfälligkeitsentschädigung anfallen.

**Risiken:**
- Zinsänderungsrisiko nach 15 Jahren
- Zahlungsunfähigkeit kann zur Zwangsversteigerung führen

**Lösung Aufgabe 2 - Vorfälligkeitsentschädigung:**

**Szenario A:**
- Restschuld: 200.000 €
- Restlaufzeit: 3 Jahre
- Sollzins: 3,0%
- Wiederanlagezins: 1,5%
- Differenz: 1,5%
- **Vorfälligkeitsentschädigung:** 200.000 € × 1,5% × 3 = 9.000 €

**Szenario B:**
- Restschuld: 150.000 €
- Restlaufzeit: 10 Monate
- Sollzins: 4,0%
- Wiederanlagezins: 2,0%
- Differenz: 2,0%
- **Vorfälligkeitsentschädigung:** 150.000 € × 2,0% × (10/12) = 2.500 €
- **Höchstgrenze:** 150.000 € × 0,5% = 750 € (gilt, da Restlaufzeit ≤ 12 Monate)
- **Tatsächliche Vorfälligkeitsentschädigung:** 750 € (Höchstgrenze)

**Lösung Aufgabe 3 - Widerrufsbelehrung:**

**Widerrufsbelehrung**

**Widerrufsrecht:**
Sie können Ihre Vertragserklärung innerhalb von 14 Tagen ohne Angabe von Gründen in Textform (z.B. Brief, Fax, E-Mail) widerrufen. Die Frist beginnt am Tag nach Vertragsschluss, jedoch erst, nachdem Sie alle Pflichtinformationen erhalten haben. Zur Wahrung der Widerrufsfrist genügt die rechtzeitige Absendung des Widerrufs.

**Widerrufsadresse:**
Sparkasse München
Widerrufsabteilung
Musterstraße 1
80331 München
E-Mail: widerruf@sparkasse-muenchen.de

**Widerrufsfolgen:**
Im Falle eines wirksamen Widerrufs sind die beiderseits empfangenen Leistungen zurückzugewähren. Sie sind zur Zahlung von Nutzungsentschädigung (Zinsen) verpflichtet, wenn Sie das Darlehen bereits in Anspruch genommen haben. Die Nutzungsentschädigung wird auf Basis des vertraglichen Sollzinssatzes berechnet.

**Muster-Widerrufsformular:**
Hiermit widerrufe ich den am [Datum] geschlossenen Darlehensvertrag.
[Name, Adresse, Datum, Unterschrift]`,
    type: "Theorie"
  },

};
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
    extendedTheory: `**Zinsbindung, Sollzins, Effektivzins und Konditionsvergleich im Detail:**

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
// Modul 5: Darlehensvermittlung §34i GewO
// Teil 4: Tage 16-20 (Theorie - Abschluss Theoriephase)

export const contentDataModule5_34i_Part4: Record<string, {
  title: string;
  theory: string;
  extendedTheory?: string;
  law: string[];
  practice: string;
  task: string;
  solution?: string;
  type?: string;
}> = {

  day_16: {
    title: "Anschlussfinanzierung, Prolongation und Forward-Darlehen",
    theory: `Nach Ablauf der Zinsbindung benötigt der Kunde eine Anschlussfinanzierung für die Restschuld. Es gibt drei Optionen: **Prolongation** (Verlängerung bei der bisherigen Bank), **Umschuldung** (Wechsel zu einer anderen Bank) und **Forward-Darlehen** (Zinssicherung bis zu 5 Jahre im Voraus). Bei der Prolongation bietet die Bank oft schlechtere Konditionen an, da der Kunde gebunden ist. Bei der Umschuldung können bessere Zinsen erzielt werden, es fallen aber Kosten für Grundschuldabtretung an (ca. 0,2%). Das Forward-Darlehen sichert den aktuellen Zinssatz für die zukünftige Anschlussfinanzierung, kostet aber einen Zinsaufschlag (Forward-Prämie ca. 0,01-0,03% pro Monat). Sie müssen den Kunden rechtzeitig (12-18 Monate vor Ablauf) über Anschlussfinanzierungsoptionen beraten.`,
    extendedTheory: `**Anschlussfinanzierung, Prolongation und Forward-Darlehen im Detail:**

**1. Anschlussfinanzierung:**

**Situation:**
Nach Ablauf der Zinsbindung (z.B. 10 Jahre) ist das Darlehen meist noch nicht vollständig getilgt. Der Kunde benötigt eine Anschlussfinanzierung für die Restschuld.

**Beispiel:**
- Ursprüngliches Darlehen: 300.000 €
- Zinsbindung: 10 Jahre (3,5% p.a., 2% Tilgung)
- **Restschuld nach 10 Jahren:** ca. 240.000 €
- **Anschlussfinanzierung erforderlich:** 240.000 €

**Zeitpunkt:**
- Beratung: 12-18 Monate vor Ablauf der Zinsbindung
- Vertragsabschluss: 3-6 Monate vor Ablauf

---

**2. Prolongation:**

**Definition:**
Verlängerung des Darlehens bei der bisherigen Bank zu neuen Konditionen.

**Ablauf:**
1. Bank schickt Prolongationsangebot (ca. 3 Monate vor Ablauf)
2. Kunde prüft Angebot
3. Kunde akzeptiert oder lehnt ab
4. Bei Akzeptanz: Neue Vereinbarung wird unterzeichnet

**Beispiel:**
- Restschuld: 240.000 €
- Bisheriger Zinssatz: 3,5% p.a.
- **Prolongationsangebot:** 4,0% p.a. (10 Jahre Zinsbindung)

**Vorteile:**
- Einfach und bequem
- Keine Wechselkosten
- Keine neue Bonitätsprüfung

**Nachteile:**
- Oft schlechtere Konditionen als am Markt
- Keine Verhandlungsmacht
- Bank nutzt Bindung des Kunden aus

**Empfehlung:**
- Prolongationsangebot immer mit Marktangeboten vergleichen
- Nicht automatisch akzeptieren

---

**3. Umschuldung:**

**Definition:**
Wechsel zu einer anderen Bank mit besseren Konditionen.

**Ablauf:**
1. Angebote von anderen Banken einholen
2. Bestes Angebot auswählen
3. Neue Bank übernimmt Restschuld
4. Grundschuld wird abgetreten oder neu bestellt

**Beispiel:**
- Restschuld: 240.000 €
- Prolongationsangebot Bank A: 4,0% p.a.
- **Angebot Bank B:** 3,6% p.a. (10 Jahre Zinsbindung)
- **Ersparnis:** 0,4% p.a. = ca. 1.000 €/Jahr = 10.000 € über 10 Jahre

**Kosten:**
- **Grundschuldabtretung:** ca. 0,2% der Restschuld (ca. 480 € bei 240.000 €)
- **Neue Grundschuldbestellung:** ca. 1% der Restschuld (ca. 2.400 € bei 240.000 €)
- **Empfehlung:** Grundschuldabtretung (günstiger)

**Vorteile:**
- Bessere Zinsen möglich
- Verhandlungsmacht
- Neue Konditionen (Sondertilgung, Tilgungssatzwechsel)

**Nachteile:**
- Aufwand (neue Bonitätsprüfung, Unterlagen)
- Kosten für Grundschuldabtretung
- Zeitaufwand

**Wann lohnt sich Umschuldung?**
- Zinsersparnis > 0,2% p.a.
- Beispiel: 0,4% Ersparnis = 10.000 € über 10 Jahre - 480 € Kosten = **9.520 € Nettoersparnis**

---

**4. Forward-Darlehen:**

**Definition:**
Zinssicherung für zukünftige Anschlussfinanzierung (bis zu 5 Jahre im Voraus).

**Funktionsweise:**
- Kunde schließt heute Vertrag ab
- Zinssatz wird heute festgelegt
- Auszahlung erfolgt erst bei Ablauf der aktuellen Zinsbindung

**Beispiel:**
- Aktuelle Zinsbindung läuft noch 3 Jahre
- Aktueller Marktzins: 3,5% p.a.
- **Forward-Darlehen:** 3,8% p.a. (Zinsaufschlag 0,3% für 3 Jahre Vorlaufzeit)
- **Vorteil:** Schutz vor Zinsanstieg

**Forward-Prämie:**
- Zinsaufschlag für Vorlaufzeit
- Ca. 0,01-0,03% pro Monat
- **Beispiel:** 36 Monate × 0,01% = 0,36% Aufschlag

**Berechnung:**
- Aktueller Marktzins: 3,5% p.a.
- Vorlaufzeit: 36 Monate
- Forward-Prämie: 0,01% × 36 = 0,36%
- **Forward-Zinssatz:** 3,5% + 0,36% = 3,86% p.a.

**Wann lohnt sich Forward-Darlehen?**
- Wenn Zinsanstieg erwartet wird
- **Beispiel:** Aktueller Zins 3,5%, Forward-Zins 3,8%, erwarteter Zins in 3 Jahren 4,5%
- **Ersparnis:** 4,5% - 3,8% = 0,7% p.a. = ca. 1.700 €/Jahr

**Risiko:**
- Wenn Zinsen sinken, zahlt Kunde zu viel
- **Beispiel:** Forward-Zins 3,8%, tatsächlicher Zins in 3 Jahren 3,0%
- **Mehrkosten:** 3,8% - 3,0% = 0,8% p.a. = ca. 1.900 €/Jahr

**Empfehlung:**
- Forward-Darlehen bei niedrigen Zinsen und erwarteter Zinswende
- Nicht bei bereits hohen Zinsen

---

**5. Vergleich der Optionen:**

**Prolongation:**
- **Vorteile:** Einfach, keine Kosten
- **Nachteile:** Oft teurer
- **Empfehlung:** Nur wenn Konditionen marktgerecht

**Umschuldung:**
- **Vorteile:** Bessere Zinsen
- **Nachteile:** Aufwand, Kosten
- **Empfehlung:** Bei Zinsersparnis > 0,2% p.a.

**Forward-Darlehen:**
- **Vorteile:** Zinssicherung
- **Nachteile:** Zinsaufschlag, Risiko
- **Empfehlung:** Bei niedrigen Zinsen und erwarteter Zinswende

---

**6. Praxisbeispiel Anschlussfinanzierung:**

**Kunde:**
- Ursprüngliches Darlehen: 300.000 € (2016)
- Zinssatz: 2,5% p.a.
- Zinsbindung: 10 Jahre (bis 2026)
- Tilgung: 2% p.a.
- **Restschuld 2026:** ca. 240.000 €

**Optionen 2026:**

**Option 1: Prolongation Bank A**
- Zinssatz: 4,5% p.a.
- Zinsbindung: 10 Jahre
- **Monatliche Rate:** 240.000 € × (4,5% + 2%) / 12 = 1.300 €
- **Gesamtzinsen:** ca. 85.000 €

**Option 2: Umschuldung Bank B**
- Zinssatz: 4,0% p.a.
- Zinsbindung: 10 Jahre
- Kosten Grundschuldabtretung: 480 €
- **Monatliche Rate:** 240.000 € × (4,0% + 2%) / 12 = 1.200 €
- **Gesamtzinsen:** ca. 75.000 € + 480 € = 75.480 €
- **Ersparnis:** 85.000 € - 75.480 € = 9.520 €

**Option 3: Forward-Darlehen (2024 abgeschlossen)**
- Aktueller Marktzins 2024: 3,5% p.a.
- Vorlaufzeit: 24 Monate
- Forward-Prämie: 0,01% × 24 = 0,24%
- **Forward-Zinssatz:** 3,74% p.a.
- **Monatliche Rate:** 240.000 € × (3,74% + 2%) / 12 = 1.148 €
- **Gesamtzinsen:** ca. 70.000 €
- **Ersparnis:** 85.000 € - 70.000 € = 15.000 €

**Empfehlung:**
- **Beste Option:** Forward-Darlehen (2024 abgeschlossen)
- **Zweitbeste Option:** Umschuldung Bank B
- **Schlechteste Option:** Prolongation Bank A

---

**7. Beratungspflichten:**

**Rechtzeitige Beratung (§ 511 BGB):**
- 12-18 Monate vor Ablauf der Zinsbindung
- Aufklärung über alle Optionen
- Vergleichsangebote vorlegen

**Dokumentation:**
- Beratungsprotokoll erstellen
- Angebote dokumentieren
- Empfehlung begründen

**Haftung:**
- Bei fehlerhafter Beratung: Schadensersatz
- **Beispiel:** Kunde hätte 10.000 € sparen können durch Umschuldung, Berater hat nicht darauf hingewiesen → Schadensersatz 10.000 €

---

**8. Sonderkündigungsrecht nach 10 Jahren (§ 489 BGB):**

**Regelung:**
Nach 10 Jahren kann der Kunde das Darlehen mit 6 Monaten Frist kündigen, unabhängig von der vereinbarten Zinsbindung.

**Beispiel:**
- Zinsbindung: 15 Jahre
- Nach 10 Jahren: Kunde kann kündigen (6 Monate Frist)
- **Vorteil:** Flexibilität, keine Vorfälligkeitsentschädigung

**Anwendung:**
- Wenn Zinsen nach 10 Jahren gesunken sind
- Umschuldung zu günstigeren Konditionen

**Wichtig:**
- Frist: 6 Monate vor gewünschtem Kündigungstermin
- Schriftform erforderlich`,
    law: [
      "§ 489 BGB (Ordentliches Kündigungsrecht)",
      "§ 490 BGB (Außerordentliches Kündigungsrecht)",
      "§ 511 BGB (Beratungs- und Dokumentationspflichten)",
      "§ 498 BGB (Kündigung bei Zahlungsverzug)"
    ],
    practice: `**Praxisfall 1: Prolongation vs. Umschuldung**

Ein Kunde hat eine Restschuld von 200.000 € nach 10 Jahren Zinsbindung. Seine Bank bietet Prolongation zu 4,2% p.a. an. Eine andere Bank bietet 3,8% p.a.

**Fragen:**
1. Wie viel spart der Kunde pro Jahr bei Umschuldung?
2. Welche Kosten entstehen bei Umschuldung?
3. Lohnt sich die Umschuldung?
4. Was müssen Sie als Berater beachten?
5. Welche Unterlagen benötigt der Kunde für die Umschuldung?

---

**Praxisfall 2: Forward-Darlehen**

Ein Kunde hat noch 3 Jahre Zinsbindung. Aktueller Marktzins: 3,0% p.a. Forward-Zinssatz: 3,36% p.a. (Forward-Prämie 0,01% × 36 Monate).

**Fragen:**
1. Wie hoch ist die Forward-Prämie?
2. Wann lohnt sich das Forward-Darlehen?
3. Was passiert, wenn die Zinsen in 3 Jahren bei 2,5% liegen?
4. Was passiert, wenn die Zinsen in 3 Jahren bei 4,5% liegen?
5. Sollte der Kunde das Forward-Darlehen abschließen?

---

**Praxisfall 3: Sonderkündigungsrecht**

Ein Kunde hat 2016 ein Darlehen mit 15 Jahren Zinsbindung (bis 2031) zu 2,5% p.a. abgeschlossen. Jetzt (2026) liegen die Zinsen bei 4,0% p.a.

**Fragen:**
1. Kann der Kunde das Darlehen vorzeitig kündigen?
2. Welche Frist muss er einhalten?
3. Muss er eine Vorfälligkeitsentschädigung zahlen?
4. Lohnt sich die Kündigung?
5. Was sollte der Kunde tun?`,
    task: `**Aufgabe 1: Umschuldung berechnen**

Berechnen Sie die Ersparnis bei Umschuldung:
- Restschuld: 250.000 €
- Prolongation: 4,5% p.a.
- Umschuldung: 4,0% p.a.
- Laufzeit: 10 Jahre
- Kosten Grundschuldabtretung: 500 €
- **Ersparnis pro Jahr:** ?
- **Gesamtersparnis:** ?

---

**Aufgabe 2: Forward-Prämie berechnen**

Berechnen Sie den Forward-Zinssatz:
- Aktueller Marktzins: 3,2% p.a.
- Vorlaufzeit: 48 Monate
- Forward-Prämie: 0,01% pro Monat
- **Forward-Zinssatz:** ?

---

**Aufgabe 3: Optionen vergleichen**

Vergleichen Sie die drei Optionen:
- Restschuld: 220.000 €
- Prolongation: 4,3% p.a.
- Umschuldung: 3,9% p.a. (Kosten 440 €)
- Forward-Darlehen: 3,7% p.a. (abgeschlossen 2 Jahre vorher)

**Welche Option ist am günstigsten?**`,
    solution: `**Lösung Praxisfall 1:**
1. Ersparnis pro Jahr: 200.000 € × (4,2% - 3,8%) = 800 €/Jahr.
2. Kosten Umschuldung: ca. 400 € (Grundschuldabtretung 0,2%).
3. Ja, lohnt sich: 800 €/Jahr × 10 Jahre = 8.000 € - 400 € = 7.600 € Nettoersparnis.
4. Berater muss: Rechtzeitig beraten (12-18 Monate vorher), Vergleichsangebote vorlegen, dokumentieren.
5. Unterlagen: Gehaltsabrechnungen, Kontoauszüge, Grundbuchauszug, Darlehensvertrag.

**Lösung Praxisfall 2:**
1. Forward-Prämie: 0,01% × 36 = 0,36%.
2. Lohnt sich, wenn: Zinsen in 3 Jahren über 3,36% liegen.
3. Wenn Zinsen 2,5%: Kunde zahlt 0,86% zu viel = ca. 1.700 €/Jahr Mehrkosten.
4. Wenn Zinsen 4,5%: Kunde spart 1,14% = ca. 2.300 €/Jahr.
5. Empfehlung: Ja, wenn Zinsanstieg erwartet wird (Risiko: Zinsen sinken).

**Lösung Praxisfall 3:**
1. Ja, nach 10 Jahren Sonderkündigungsrecht (§ 489 BGB).
2. Frist: 6 Monate.
3. Nein, keine Vorfälligkeitsentschädigung bei Sonderkündigungsrecht.
4. Nein, lohnt sich nicht: Aktueller Zins 2,5% < Marktzins 4,0%.
5. Kunde sollte: Darlehen weiterlaufen lassen (günstiger Zinssatz).

**Lösung Aufgabe 1:**
- Ersparnis pro Jahr: 250.000 € × (4,5% - 4,0%) = 1.250 €
- Gesamtersparnis: 1.250 € × 10 - 500 € = 12.000 €

**Lösung Aufgabe 2:**
- Forward-Zinssatz: 3,2% + (0,01% × 48) = 3,68% p.a.

**Lösung Aufgabe 3:**
- Prolongation: 220.000 € × 4,3% = 9.460 €/Jahr
- Umschuldung: 220.000 € × 3,9% = 8.580 €/Jahr + 440 € = 8.624 €/Jahr (1. Jahr)
- Forward-Darlehen: 220.000 € × 3,7% = 8.140 €/Jahr
- **Günstigste Option:** Forward-Darlehen`,
    type: "Theorie"
  },

  day_17: {
    title: "Vorfälligkeitsentschädigung, Sondertilgung und Tilgungssatzwechsel",
    theory: `Die Vorfälligkeitsentschädigung ist eine Entschädigung an die Bank bei vorzeitiger Rückzahlung des Darlehens. Sie berechnet sich aus dem Zinsverlust der Bank (Vertragszins - Wiederanlagezins) × Restlaufzeit. Ausnahmen: Nach 10 Jahren Sonderkündigungsrecht (§ 489 BGB), bei Verkauf der Immobilie (berechtigtes Interesse). Sondertilgungsrechte ermöglichen jährliche Extratilgungen (meist 5-10% p.a.) ohne Vorfälligkeitsentschädigung. Der Tilgungssatzwechsel erlaubt die Anpassung der Tilgungsrate während der Laufzeit (z.B. von 2% auf 3%). Beide Optionen sollten im Darlehensvertrag vereinbart werden, da sie Flexibilität bieten und die Gesamtzinsbelastung reduzieren können.`,
    extendedTheory: `**Vorfälligkeitsentschädigung, Sondertilgung und Tilgungssatzwechsel im Detail:**

**1. Vorfälligkeitsentschädigung:**

**Definition:**
Entschädigung an die Bank bei vorzeitiger Rückzahlung des Darlehens vor Ablauf der Zinsbindung.

**Zweck:**
- Bank verliert Zinseinnahmen
- Bank muss Geld zu niedrigeren Zinsen wieder anlegen
- Vorfälligkeitsentschädigung kompensiert diesen Verlust

**Berechnung:**

**Methode 1: Aktiv-Aktiv-Methode**
Vorfälligkeitsentschädigung = (Vertragszins - Wiederanlagezins) × Restschuld × Restlaufzeit

**Beispiel:**
- Restschuld: 200.000 €
- Vertragszins: 3,5% p.a.
- Wiederanlagezins: 2,0% p.a. (aktueller Hypothekenzins)
- Restlaufzeit: 5 Jahre
- **Vorfälligkeitsentschädigung:** (3,5% - 2,0%) × 200.000 € × 5 = 15.000 €

**Methode 2: Aktiv-Passiv-Methode**
Vorfälligkeitsentschädigung = (Vertragszins - Pfandbriefzins) × Restschuld × Restlaufzeit

**Beispiel:**
- Restschuld: 200.000 €
- Vertragszins: 3,5% p.a.
- Pfandbriefzins: 1,5% p.a.
- Restlaufzeit: 5 Jahre
- **Vorfälligkeitsentschädigung:** (3,5% - 1,5%) × 200.000 € × 5 = 20.000 €

**Wichtig:**
- Banken nutzen meist Aktiv-Passiv-Methode (höhere Entschädigung)
- Rechtsprechung: Aktiv-Aktiv-Methode ist kundenfreundlicher

---

**2. Ausnahmen von der Vorfälligkeitsentschädigung:**

**Sonderkündigungsrecht nach 10 Jahren (§ 489 BGB):**
- Nach 10 Jahren kann Kunde mit 6 Monaten Frist kündigen
- **Keine Vorfälligkeitsentschädigung**
- Gilt auch bei längerer Zinsbindung (z.B. 15 oder 20 Jahre)

**Beispiel:**
- Zinsbindung: 15 Jahre
- Nach 10 Jahren: Kunde kündigt (6 Monate Frist)
- **Vorfälligkeitsentschädigung:** 0 €

**Berechtigtes Interesse:**
- Verkauf der Immobilie (z.B. Jobwechsel, Scheidung)
- Banken akzeptieren meist Vorfälligkeitsentschädigung
- **Wichtig:** Nicht automatisch, muss verhandelt werden

**Beispiel:**
- Kunde verkauft Immobilie wegen Jobwechsel
- Bank verlangt Vorfälligkeitsentschädigung
- Kunde zahlt, kann aber verhandeln (z.B. 50% Rabatt)

**Fehlerhafte Widerrufsbelehrung:**
- Wenn Widerrufsbelehrung fehlerhaft war, kann Kunde Darlehen widerrufen
- **Keine Vorfälligkeitsentschädigung**
- Frist: 14 Tage nach Vertragsschluss (bei korrekter Belehrung)
- Bei fehlerhafter Belehrung: Unbegrenzt (bis 2016)

---

**3. Sondertilgungsrechte:**

**Definition:**
Recht, jährlich einen bestimmten Betrag zusätzlich zur regulären Rate zu tilgen, ohne Vorfälligkeitsentschädigung.

**Übliche Sondertilgungsrechte:**
- 5% p.a. (Standard, meist kostenlos)
- 10% p.a. (Zinsaufschlag ca. 0,1%)
- 20% p.a. (Zinsaufschlag ca. 0,2%)

**Beispiel:**
- Darlehensbetrag: 300.000 €
- Sondertilgungsrecht: 5% p.a.
- **Maximale Sondertilgung:** 15.000 €/Jahr

**Vorteile:**
- Schnellere Entschuldung
- Geringere Gesamtzinsbelastung
- Flexibilität (z.B. bei Bonuszahlung, Erbschaft)

**Berechnung Zinsersparnis:**

**Ohne Sondertilgung:**
- Darlehensbetrag: 300.000 €
- Zinssatz: 3,5% p.a.
- Tilgung: 2% p.a.
- Laufzeit: ca. 35 Jahre
- **Gesamtzinsen:** ca. 180.000 €

**Mit Sondertilgung 10.000 €/Jahr:**
- Darlehensbetrag: 300.000 €
- Zinssatz: 3,5% p.a.
- Tilgung: 2% p.a. + 10.000 €/Jahr Sondertilgung
- Laufzeit: ca. 25 Jahre
- **Gesamtzinsen:** ca. 130.000 €
- **Ersparnis:** 50.000 €

**Empfehlung:**
- Immer Sondertilgungsrecht vereinbaren (mindestens 5% p.a.)
- Auch wenn nicht genutzt: Flexibilität für unvorhergesehene Einnahmen
- Zinsaufschlag für 10% p.a. lohnt sich meist

---

**4. Tilgungssatzwechsel:**

**Definition:**
Recht, die Tilgungsrate während der Laufzeit anzupassen (z.B. von 2% auf 3% oder von 3% auf 1%).

**Gründe für Tilgungssatzwechsel:**

**Erhöhung der Tilgung:**
- Gehaltserhöhung
- Wegfall anderer Kredite
- Erbschaft
- **Ziel:** Schnellere Entschuldung

**Senkung der Tilgung:**
- Jobverlust
- Elternzeit
- Krankheit
- **Ziel:** Finanzielle Entlastung

**Beispiel Erhöhung:**
- Darlehensbetrag: 300.000 €
- Zinssatz: 3,5% p.a.
- Tilgung: 2% p.a. → 3% p.a. (nach 5 Jahren)
- **Monatliche Rate:** 1.375 € → 1.625 € (+250 €)
- **Laufzeit:** 35 Jahre → 25 Jahre (-10 Jahre)
- **Zinsersparnis:** ca. 40.000 €

**Beispiel Senkung:**
- Darlehensbetrag: 300.000 €
- Zinssatz: 3,5% p.a.
- Tilgung: 3% p.a. → 1% p.a. (nach Jobverlust)
- **Monatliche Rate:** 1.625 € → 1.125 € (-500 €)
- **Laufzeit:** 25 Jahre → 50 Jahre (+25 Jahre)
- **Mehrkosten:** ca. 80.000 € (höhere Gesamtzinsen)

**Kosten:**
- Oft kostenlos (1-2x während Zinsbindung)
- Bei häufigeren Wechseln: Gebühr ca. 100-200 €

**Empfehlung:**
- Tilgungssatzwechsel im Vertrag vereinbaren
- Flexibilität für Lebensveränderungen

---

**5. Praxisbeispiel Vorfälligkeitsentschädigung:**

**Kunde:**
- Darlehen: 250.000 € (2020 abgeschlossen)
- Zinssatz: 2,5% p.a.
- Zinsbindung: 15 Jahre (bis 2035)
- Tilgung: 2% p.a.
- **Restschuld 2026:** ca. 210.000 €

**Situation:**
- Kunde verkauft Immobilie 2026 wegen Jobwechsel
- Bank verlangt Vorfälligkeitsentschädigung

**Berechnung:**
- Restschuld: 210.000 €
- Vertragszins: 2,5% p.a.
- Wiederanlagezins: 3,5% p.a. (aktueller Hypothekenzins)
- Restlaufzeit: 9 Jahre

**Fall 1: Wiederanlagezins < Vertragszins**
- Wiederanlagezins: 1,5% p.a.
- **Vorfälligkeitsentschädigung:** (2,5% - 1,5%) × 210.000 € × 9 = 18.900 €

**Fall 2: Wiederanlagezins > Vertragszins**
- Wiederanlagezins: 3,5% p.a.
- **Vorfälligkeitsentschädigung:** 0 € (Bank hat keinen Verlust)

**Verhandlung:**
- Kunde argumentiert: Berechtigtes Interesse (Jobwechsel)
- Bank bietet: 50% Rabatt = 9.450 €
- **Ergebnis:** Kunde zahlt 9.450 € statt 18.900 €

---

**6. Praxisbeispiel Sondertilgung:**

**Kunde:**
- Darlehensbetrag: 300.000 €
- Zinssatz: 3,5% p.a.
- Tilgung: 2% p.a.
- Sondertilgungsrecht: 10% p.a.
- **Maximale Sondertilgung:** 30.000 €/Jahr

**Situation:**
- Kunde erhält Bonuszahlung: 20.000 €
- Kunde leistet Sondertilgung: 20.000 €

**Auswirkung:**
- Restschuld: 300.000 € → 280.000 €
- **Zinsersparnis:** ca. 700 €/Jahr (3,5% von 20.000 €)
- **Gesamtersparnis über Laufzeit:** ca. 15.000 €

**Empfehlung:**
- Sondertilgung nutzen (höhere Rendite als Sparbuch)
- Rücklagen behalten (3 Monatsraten)

---

**7. Praxisbeispiel Tilgungssatzwechsel:**

**Kunde:**
- Darlehensbetrag: 300.000 €
- Zinssatz: 3,5% p.a.
- Tilgung: 2% p.a.
- **Monatliche Rate:** 1.375 €

**Situation:**
- Nach 5 Jahren: Gehaltserhöhung
- Kunde erhöht Tilgung auf 3% p.a.
- **Neue monatliche Rate:** 1.625 € (+250 €)

**Auswirkung:**
- Laufzeit: 35 Jahre → 25 Jahre (-10 Jahre)
- **Zinsersparnis:** ca. 40.000 €

**Empfehlung:**
- Tilgung erhöhen, wenn finanziell möglich
- Schnellere Entschuldung spart Zinsen`,
    law: [
      "§ 489 BGB (Ordentliches Kündigungsrecht)",
      "§ 490 BGB (Außerordentliches Kündigungsrecht)",
      "§ 491 BGB (Immobiliar-Verbraucherdarlehensvertrag)",
      "§ 492 BGB (Angaben im Darlehensvertrag)",
      "§ 502 BGB (Vorfälligkeitsentschädigung)"
    ],
    practice: `**Praxisfall 1: Vorfälligkeitsentschädigung berechnen**

Ein Kunde möchte sein Darlehen vorzeitig zurückzahlen:
- Restschuld: 180.000 €
- Vertragszins: 3,0% p.a.
- Wiederanlagezins: 1,5% p.a.
- Restlaufzeit: 7 Jahre

**Fragen:**
1. Wie hoch ist die Vorfälligkeitsentschädigung?
2. Kann der Kunde die Entschädigung umgehen?
3. Was passiert, wenn der Wiederanlagezins höher ist als der Vertragszins?
4. Kann der Kunde verhandeln?
5. Welche Alternativen gibt es?

---

**Praxisfall 2: Sondertilgung nutzen**

Ein Kunde hat ein Darlehen über 250.000 € (3,5% p.a., 2% Tilgung) mit 5% Sondertilgungsrecht. Er erhält eine Erbschaft von 30.000 €.

**Fragen:**
1. Wie viel kann er maximal sondertilgen?
2. Wie viel Zinsen spart er pro Jahr?
3. Wie viel spart er über die Gesamtlaufzeit?
4. Sollte er die gesamte Erbschaft sondertilgen?
5. Welche Alternativen gibt es?

---

**Praxisfall 3: Tilgungssatzwechsel**

Ein Kunde hat ein Darlehen über 300.000 € (3,5% p.a., 2% Tilgung). Nach 5 Jahren erhält er eine Gehaltserhöhung und möchte die Tilgung auf 3% erhöhen.

**Fragen:**
1. Wie hoch ist die neue monatliche Rate?
2. Wie viel Jahre spart er?
3. Wie viel Zinsen spart er?
4. Welche Kosten entstehen?
5. Lohnt sich der Tilgungssatzwechsel?`,
    task: `**Aufgabe 1: Vorfälligkeitsentschädigung berechnen**

Berechnen Sie die Vorfälligkeitsentschädigung:
- Restschuld: 220.000 €
- Vertragszins: 3,2% p.a.
- Wiederanlagezins: 1,8% p.a.
- Restlaufzeit: 6 Jahre
- **Vorfälligkeitsentschädigung:** ?

---

**Aufgabe 2: Zinsersparnis durch Sondertilgung**

Berechnen Sie die Zinsersparnis:
- Darlehensbetrag: 280.000 €
- Zinssatz: 3,6% p.a.
- Sondertilgung: 15.000 €
- **Zinsersparnis pro Jahr:** ?
- **Gesamtersparnis über 20 Jahre:** ?

---

**Aufgabe 3: Tilgungssatzwechsel berechnen**

Berechnen Sie die neue Rate:
- Darlehensbetrag: 320.000 €
- Zinssatz: 3,4% p.a.
- Alte Tilgung: 2% p.a.
- Neue Tilgung: 3,5% p.a.
- **Alte monatliche Rate:** ?
- **Neue monatliche Rate:** ?
- **Differenz:** ?`,
    solution: `**Lösung Praxisfall 1:**
1. Vorfälligkeitsentschädigung: (3,0% - 1,5%) × 180.000 € × 7 = 18.900 €.
2. Umgehen durch: Sonderkündigungsrecht nach 10 Jahren (§ 489 BGB), berechtigtes Interesse verhandeln.
3. Wenn Wiederanlagezins > Vertragszins: Keine Vorfälligkeitsentschädigung (Bank hat keinen Verlust).
4. Ja, verhandeln möglich: Bei berechtigtem Interesse (Verkauf, Jobwechsel) oft 50% Rabatt.
5. Alternativen: Sondertilgung nutzen (wenn vereinbart), Darlehen weiterlaufen lassen.

**Lösung Praxisfall 2:**
1. Maximale Sondertilgung: 250.000 € × 5% = 12.500 €.
2. Zinsersparnis pro Jahr: 12.500 € × 3,5% = 437,50 €.
3. Gesamtersparnis über Laufzeit: ca. 10.000 € (abhängig von Restlaufzeit).
4. Nein, nur 12.500 € sondertilgen (Maximum), Rest als Rücklage behalten.
5. Alternativen: Rücklagen bilden, in ETF investieren (höhere Rendite), Renovierung.

**Lösung Praxisfall 3:**
1. Neue monatliche Rate: 300.000 € × (3,5% + 3%) / 12 = 1.625 €.
2. Jahre gespart: ca. 10 Jahre (von 35 auf 25 Jahre).
3. Zinsersparnis: ca. 40.000 €.
4. Kosten: Meist kostenlos (1-2x während Zinsbindung).
5. Ja, lohnt sich: 40.000 € Ersparnis, schnellere Entschuldung.

**Lösung Aufgabe 1:**
- Vorfälligkeitsentschädigung: (3,2% - 1,8%) × 220.000 € × 6 = 18.480 €

**Lösung Aufgabe 2:**
- Zinsersparnis pro Jahr: 15.000 € × 3,6% = 540 €
- Gesamtersparnis über 20 Jahre: ca. 12.000 €

**Lösung Aufgabe 3:**
- Alte monatliche Rate: 320.000 € × (3,4% + 2%) / 12 = 1.440 €
- Neue monatliche Rate: 320.000 € × (3,4% + 3,5%) / 12 = 1.840 €
- Differenz: 400 €`,
    type: "Theorie"
  },

  day_18: {
    title: "Risiken der Immobilienfinanzierung und Absicherung",
    theory: `Immobilienfinanzierungen bergen verschiedene Risiken: **Zinsänderungsrisiko** (Zinsen steigen nach Zinsbindung), **Zahlungsunfähigkeitsrisiko** (Jobverlust, Krankheit), **Zwangsversteigerungsrisiko** (bei Zahlungsausfall), **Wertverlustrisiko** (Immobilie verliert an Wert). Absicherungen: **Risikolebensversicherung** (Tod des Hauptverdieners), **Berufsunfähigkeitsversicherung** (Krankheit, Unfall), **Arbeitslosenversicherung** (Jobverlust), **Rücklagen** (3-6 Monatsraten). Sie müssen den Kunden über alle Risiken aufklären und geeignete Absicherungen empfehlen (§ 511 BGB). Eine Haushaltsrechnung mit 120% Sicherheitspuffer reduziert das Risiko der Überschuldung.`,
    extendedTheory: `**Risiken der Immobilienfinanzierung und Absicherung im Detail:**

**1. Zinsänderungsrisiko:**

**Definition:**
Nach Ablauf der Zinsbindung können die Zinsen gestiegen sein, wodurch die monatliche Rate steigt.

**Beispiel:**
- Ursprüngliches Darlehen: 300.000 € (2016)
- Zinssatz: 2,0% p.a.
- Zinsbindung: 10 Jahre (bis 2026)
- Tilgung: 2% p.a.
- **Monatliche Rate 2016:** 1.000 €
- **Restschuld 2026:** ca. 240.000 €

**Szenario 1: Zinsen steigen auf 4,0% p.a.**
- **Neue monatliche Rate:** 240.000 € × (4,0% + 2%) / 12 = 1.200 €
- **Mehrbelastung:** 200 €/Monat = 2.400 €/Jahr

**Szenario 2: Zinsen steigen auf 6,0% p.a.**
- **Neue monatliche Rate:** 240.000 € × (6,0% + 2%) / 12 = 1.600 €
- **Mehrbelastung:** 600 €/Monat = 7.200 €/Jahr

**Absicherung:**
- **Lange Zinsbindung:** 15-20 Jahre (Planungssicherheit)
- **Forward-Darlehen:** Zinssicherung bis 5 Jahre im Voraus
- **Höhere Tilgung:** Schnellere Entschuldung reduziert Restschuld
- **Rücklagen:** 3-6 Monatsraten für Zinsanstieg

---

**2. Zahlungsunfähigkeitsrisiko:**

**Ursachen:**
- Jobverlust
- Krankheit, Berufsunfähigkeit
- Scheidung
- Tod des Hauptverdieners

**Beispiel:**
- Monatliche Rate: 1.500 €
- Nettoeinkommen: 4.000 €
- **Bei Jobverlust:** Arbeitslosengeld ca. 1.200 € (60% des Nettoeinkommens)
- **Verfügbares Einkommen:** 1.200 € - 1.500 € = -300 € (Zahlungsunfähigkeit)

**Folgen:**
- Zahlungsverzug (3 Monate)
- Kündigung des Darlehens (§ 498 BGB)
- Zwangsversteigerung
- Verlust der Immobilie
- Restschuld bleibt bestehen

**Absicherung:**
- **Risikolebensversicherung:** Bei Tod des Hauptverdieners
- **Berufsunfähigkeitsversicherung:** Bei Krankheit, Unfall
- **Arbeitslosenversicherung:** Bei Jobverlust (selten)
- **Rücklagen:** 3-6 Monatsraten
- **Sicherheitspuffer:** 120% bei Haushaltsrechnung

---

**3. Risikolebensversicherung:**

**Zweck:**
Absicherung der Familie bei Tod des Hauptverdieners.

**Funktionsweise:**
- Versicherungssumme = Restschuld des Darlehens
- Bei Tod: Auszahlung tilgt Darlehen
- Familie bleibt schuldenfrei

**Beispiel:**
- Darlehensbetrag: 300.000 €
- Versicherungssumme: 300.000 € (fallend mit Restschuld)
- Beitrag: ca. 30-50 €/Monat (abhängig von Alter, Gesundheit)
- **Bei Tod:** Versicherung zahlt 300.000 €, Darlehen ist getilgt

**Arten:**
- **Konstante Versicherungssumme:** 300.000 € über gesamte Laufzeit
- **Fallende Versicherungssumme:** Sinkt mit Restschuld (günstiger)

**Empfehlung:**
- Fallende Versicherungssumme (passt zu Restschuld)
- Laufzeit = Zinsbindung oder Darlehenslaufzeit
- Versicherungssumme = Restschuld + Puffer (10%)

**Kosten:**
- 30-50 €/Monat (abhängig von Alter, Gesundheit, Raucherstatus)
- **Beispiel:** 40 Jahre, Nichtraucher, 300.000 € Versicherungssumme = ca. 35 €/Monat

---

**4. Berufsunfähigkeitsversicherung:**

**Zweck:**
Absicherung bei Krankheit, Unfall, die zur Berufsunfähigkeit führen.

**Funktionsweise:**
- Monatliche Rente bei Berufsunfähigkeit (z.B. 1.500 €/Monat)
- Zahlung bis Rentenalter oder bis Wiederherstellung der Arbeitsfähigkeit

**Beispiel:**
- Monatliche Darlehensrate: 1.500 €
- BU-Rente: 1.500 €/Monat
- **Bei Berufsunfähigkeit:** BU-Rente zahlt Darlehensrate

**Kosten:**
- 50-150 €/Monat (abhängig von Alter, Beruf, Gesundheit)
- **Beispiel:** 40 Jahre, Büroangestellter, 1.500 € Rente = ca. 80 €/Monat

**Empfehlung:**
- BU-Rente = Darlehensrate + Lebenshaltungskosten
- Laufzeit bis Rentenalter
- Wichtig für Hauptverdiener

---

**5. Rücklagen:**

**Zweck:**
Finanzielle Reserve für unvorhergesehene Ausgaben oder Einkommensausfälle.

**Empfehlung:**
- **Mindestens:** 3 Monatsraten
- **Besser:** 6 Monatsraten
- **Zusätzlich:** Rücklage für Instandhaltung (1% des Immobilienwerts/Jahr)

**Beispiel:**
- Monatliche Rate: 1.500 €
- **Rücklage:** 3 × 1.500 € = 4.500 € (Minimum)
- **Besser:** 6 × 1.500 € = 9.000 €
- **Instandhaltung:** 400.000 € × 1% = 4.000 €/Jahr

**Verwendung:**
- Jobverlust (Überbrückung bis neuer Job)
- Unvorhergesehene Reparaturen (Heizung, Dach)
- Zinsanstieg bei Anschlussfinanzierung

---

**6. Zwangsversteigerungsrisiko:**

**Ablauf:**
1. Zahlungsverzug (3 Monate)
2. Kündigung des Darlehens (§ 498 BGB)
3. Zwangsversteigerungsantrag
4. Versteigerungstermin (6-12 Monate später)
5. Erlösverteilung nach Rangfolge

**Beispiel:**
- Immobilienwert: 400.000 €
- Restschuld: 300.000 €
- **Versteigerungserlös:** 300.000 € (oft unter Marktwert)
- **Verteilung:** Bank erhält 300.000 €, Kunde erhält 0 €

**Folgen:**
- Verlust der Immobilie
- Verlust des Eigenkapitals
- Schufa-Eintrag (3 Jahre)
- Restschuld bleibt bestehen (wenn Erlös < Restschuld)

**Vermeidung:**
- Rechtzeitig mit Bank sprechen (Stundung, Ratenzahlung)
- Freiwilliger Verkauf (höherer Erlös als Zwangsversteigerung)
- Rücklagen nutzen
- Absicherungen (Risikolebensversicherung, BU)

---

**7. Wertverlustrisiko:**

**Ursachen:**
- Wirtschaftliche Entwicklung (Rezession)
- Demografischer Wandel (Bevölkerungsrückgang)
- Strukturwandel (Industrieabwanderung)
- Bauschäden, Altlasten

**Beispiel:**
- Kaufpreis 2020: 400.000 €
- Wert 2030: 350.000 € (Wertverlust 12,5%)
- Restschuld 2030: 280.000 €
- **Eigenkapital:** 350.000 € - 280.000 € = 70.000 € (statt 120.000 €)

**Folgen:**
- Geringeres Eigenkapital
- Schwierigere Anschlussfinanzierung
- Verlust bei Verkauf

**Absicherung:**
- **Lage:** Gute Lage (Stadt, Infrastruktur)
- **Qualität:** Hochwertige Bausubstanz
- **Eigenkapital:** Mindestens 20% (Puffer für Wertverlust)
- **Tilgung:** Schnelle Entschuldung reduziert Risiko

---

**8. Haushaltsrechnung mit Sicherheitspuffer:**

**Empfehlung:**
Verfügbares Einkommen / 1,2 = Maximale Darlehensrate (20% Sicherheitspuffer)

**Beispiel:**
- Nettoeinkommen: 4.000 €
- Ausgaben: 2.500 €
- **Verfügbares Einkommen:** 1.500 €
- **Maximale Darlehensrate:** 1.500 € / 1,2 = 1.250 €

**Zweck:**
- Puffer für Zinsanstieg
- Puffer für unvorhergesehene Ausgaben
- Puffer für Einkommensrückgang

**Ohne Sicherheitspuffer:**
- Maximale Rate: 1.500 € (100% des verfügbaren Einkommens)
- **Risiko:** Keine Reserve für Zinsanstieg oder Ausgaben

---

**9. Praxisbeispiel Risikomanagement:**

**Kunde:**
- Alter: 35 Jahre
- Nettoeinkommen: 4.500 €/Monat
- Ehefrau: 2.500 €/Monat (Teilzeit)
- Kinder: 2
- Darlehensbetrag: 320.000 €
- Zinssatz: 3,5% p.a.
- Tilgung: 2% p.a.
- **Monatliche Rate:** 1.467 €

**Risiken:**
1. **Zinsänderungsrisiko:** Zinsen steigen nach 10 Jahren auf 5,0% p.a.
2. **Zahlungsunfähigkeitsrisiko:** Hauptverdiener verliert Job
3. **Tod des Hauptverdieners:** Ehefrau kann Rate nicht alleine zahlen

**Absicherungen:**
1. **Lange Zinsbindung:** 15 Jahre (statt 10 Jahre)
2. **Risikolebensversicherung:** 320.000 € (fallend), 35 €/Monat
3. **Berufsunfähigkeitsversicherung:** 1.500 €/Monat Rente, 80 €/Monat
4. **Rücklagen:** 9.000 € (6 Monatsraten)
5. **Sicherheitspuffer:** Maximale Rate 2.333 € (1.467 € < 2.333 € ✓)

**Kosten Absicherungen:**
- Risikolebensversicherung: 35 €/Monat
- Berufsunfähigkeitsversicherung: 80 €/Monat
- **Gesamt:** 115 €/Monat = 1.380 €/Jahr

**Ergebnis:**
- Kunde ist gut abgesichert
- Kosten sind tragbar (115 € < 866 € Puffer)
- Familie ist geschützt`,
    law: [
      "§ 498 BGB (Kündigung bei Zahlungsverzug)",
      "§ 511 BGB (Beratungs- und Dokumentationspflichten)",
      "ZVG (Zwangsversteigerungsgesetz)",
      "VVG (Versicherungsvertragsgesetz)"
    ],
    practice: `**Praxisfall 1: Zinsänderungsrisiko**

Ein Kunde hat ein Darlehen über 250.000 € (2,5% p.a., 10 Jahre Zinsbindung, 2% Tilgung). Nach 10 Jahren beträgt die Restschuld 200.000 €. Die Zinsen sind auf 5,0% p.a. gestiegen.

**Fragen:**
1. Wie hoch war die monatliche Rate in den ersten 10 Jahren?
2. Wie hoch ist die neue monatliche Rate nach 10 Jahren?
3. Wie viel mehr muss der Kunde pro Monat zahlen?
4. Wie hätte der Kunde das Risiko reduzieren können?
5. Welche Absicherungen empfehlen Sie?

---

**Praxisfall 2: Zahlungsunfähigkeit**

Ein Kunde hat ein Darlehen über 300.000 € (monatliche Rate 1.500 €). Er verliert seinen Job und erhält Arbeitslosengeld (1.200 €/Monat). Seine Ausgaben betragen 1.000 €/Monat.

**Fragen:**
1. Kann der Kunde die Rate noch zahlen?
2. Was passiert, wenn er 3 Monate nicht zahlt?
3. Welche Optionen hat der Kunde?
4. Wie hätte er sich absichern können?
5. Was sollte er jetzt tun?

---

**Praxisfall 3: Absicherung berechnen**

Ein Kunde (40 Jahre, Nichtraucher) nimmt ein Darlehen über 350.000 € auf. Monatliche Rate: 1.600 €.

**Fragen:**
1. Welche Versicherungssumme empfehlen Sie für die Risikolebensversicherung?
2. Wie hoch ist die BU-Rente?
3. Wie hoch sind die monatlichen Kosten (ca.)?
4. Wie hoch sollten die Rücklagen sein?
5. Lohnen sich die Absicherungen?`,
    task: `**Aufgabe 1: Zinsänderungsrisiko berechnen**

Berechnen Sie die Mehrbelastung:
- Restschuld nach 10 Jahren: 220.000 €
- Alter Zinssatz: 2,8% p.a.
- Neuer Zinssatz: 4,8% p.a.
- Tilgung: 2% p.a.
- **Alte monatliche Rate:** ?
- **Neue monatliche Rate:** ?
- **Mehrbelastung pro Monat:** ?

---

**Aufgabe 2: Rücklagen berechnen**

Berechnen Sie die empfohlenen Rücklagen:
- Monatliche Darlehensrate: 1.800 €
- Immobilienwert: 450.000 €
- **Rücklage für Darlehen (6 Monate):** ?
- **Rücklage für Instandhaltung (1% p.a.):** ?
- **Gesamtrücklage:** ?

---

**Aufgabe 3: Haushaltsrechnung mit Sicherheitspuffer**

Berechnen Sie die maximale Darlehensrate:
- Nettoeinkommen: 5.500 €/Monat
- Ausgaben: 3.200 €/Monat
- **Verfügbares Einkommen:** ?
- **Maximale Darlehensrate (20% Puffer):** ?`,
    solution: `**Lösung Praxisfall 1:**
1. Monatliche Rate erste 10 Jahre: 250.000 € × (2,5% + 2%) / 12 = 937,50 €.
2. Neue monatliche Rate: 200.000 € × (5,0% + 2%) / 12 = 1.166,67 €.
3. Mehrbelastung: 1.166,67 € - 937,50 € = 229,17 €/Monat = 2.750 €/Jahr.
4. Risiko reduzieren durch: Lange Zinsbindung (15-20 Jahre), Forward-Darlehen, höhere Tilgung, Rücklagen.
5. Absicherungen: Rücklagen (6 Monatsraten), lange Zinsbindung, Forward-Darlehen.

**Lösung Praxisfall 2:**
1. Nein, kann Rate nicht zahlen: 1.200 € - 1.000 € = 200 € verfügbar (< 1.500 € Rate).
2. Nach 3 Monaten: Kündigung des Darlehens (§ 498 BGB), Zwangsversteigerung droht.
3. Optionen: Stundung bei Bank beantragen, Tilgungssatzwechsel (Senkung), Rücklagen nutzen, freiwilliger Verkauf.
4. Absichern durch: Berufsunfähigkeitsversicherung, Arbeitslosenversicherung, Rücklagen (6 Monatsraten).
5. Jetzt: Sofort mit Bank sprechen, Stundung beantragen, neuen Job suchen, Rücklagen nutzen.

**Lösung Praxisfall 3:**
1. Versicherungssumme: 350.000 € (fallend mit Restschuld).
2. BU-Rente: 1.600 €/Monat (= Darlehensrate).
3. Kosten: Risikolebensversicherung ca. 40 €/Monat, BU ca. 90 €/Monat = 130 €/Monat.
4. Rücklagen: 6 × 1.600 € = 9.600 € + 4% Instandhaltung (ca. 3.500 €/Jahr) = 13.100 €.
5. Ja, lohnt sich: Schutz der Familie, geringe Kosten im Verhältnis zum Risiko.

**Lösung Aufgabe 1:**
- Alte monatliche Rate: 220.000 € × (2,8% + 2%) / 12 = 880 €
- Neue monatliche Rate: 220.000 € × (4,8% + 2%) / 12 = 1.246,67 €
- Mehrbelastung: 366,67 €/Monat

**Lösung Aufgabe 2:**
- Rücklage Darlehen: 6 × 1.800 € = 10.800 €
- Rücklage Instandhaltung: 450.000 € × 1% = 4.500 €/Jahr
- Gesamtrücklage: 10.800 € + 4.500 € = 15.300 €

**Lösung Aufgabe 3:**
- Verfügbares Einkommen: 5.500 € - 3.200 € = 2.300 €
- Maximale Darlehensrate: 2.300 € / 1,2 = 1.916,67 €`,
    type: "Theorie"
  },

  day_19: {
    title: "Besondere Finanzierungsformen: Mietkauf, Leibrente, Reverse Mortgage",
    theory: `Neben klassischen Darlehen gibt es besondere Finanzierungsformen: **Mietkauf** (Miete + Kaufoption, Miete wird auf Kaufpreis angerechnet), **Leibrente** (Verkauf gegen lebenslange Rente, Verkäufer bleibt wohnen), **Reverse Mortgage** (Umkehrhypothek: Ältere Menschen beleihen Immobilie, erhalten monatliche Rente, Rückzahlung bei Tod oder Auszug). Diese Formen eignen sich für spezielle Situationen: Mietkauf für Käufer ohne Eigenkapital, Leibrente für Senioren ohne Erben, Reverse Mortgage für Senioren mit Liquiditätsbedarf. Alle Formen haben Vor- und Nachteile und müssen sorgfältig geprüft werden. Sie sind oft teurer als klassische Darlehen, bieten aber Flexibilität.`,
    extendedTheory: `**Besondere Finanzierungsformen im Detail:**

**1. Mietkauf:**

**Definition:**
Kombination aus Mietvertrag und Kaufoption. Der Mieter zahlt monatlich Miete, die teilweise auf den Kaufpreis angerechnet wird. Nach einer bestimmten Zeit (z.B. 10 Jahre) kann er die Immobilie kaufen.

**Funktionsweise:**
1. **Mietphase:** Mieter zahlt monatlich Miete (z.B. 1.500 €)
2. **Anrechnung:** Teil der Miete wird auf Kaufpreis angerechnet (z.B. 500 €)
3. **Kaufoption:** Nach 10 Jahren kann Mieter kaufen
4. **Kaufpreis:** Ursprünglicher Preis - angerechnete Mieten

**Beispiel:**
- Kaufpreis: 400.000 €
- Monatliche Miete: 1.500 €
- Anrechnung: 500 €/Monat
- Laufzeit: 10 Jahre
- **Angerechnete Mieten:** 500 € × 12 × 10 = 60.000 €
- **Restkaufpreis:** 400.000 € - 60.000 € = 340.000 €

**Vorteile:**
- Kein Eigenkapital erforderlich
- Sofortiger Einzug
- Kaufoption (keine Pflicht)
- Anrechnung der Miete

**Nachteile:**
- Höhere Gesamtkosten (Miete + Kaufpreis)
- Risiko: Mieter kann nach 10 Jahren nicht kaufen (angerechnete Mieten verloren)
- Verkäufer bleibt Eigentümer (Mieter trägt Risiko)
- Oft teurer als klassische Finanzierung

**Für wen geeignet:**
- Käufer ohne Eigenkapital
- Käufer mit schlechter Bonität
- Käufer, die Flexibilität wünschen

**Kosten:**
- Höher als klassische Finanzierung (ca. 10-20% Aufschlag)

---

**2. Leibrente:**

**Definition:**
Verkauf einer Immobilie gegen lebenslange Rente. Der Verkäufer bleibt in der Immobilie wohnen (Wohnrecht oder Nießbrauch) und erhält monatlich eine Rente vom Käufer.

**Funktionsweise:**
1. **Verkauf:** Verkäufer verkauft Immobilie an Käufer
2. **Wohnrecht:** Verkäufer behält lebenslanges Wohnrecht
3. **Leibrente:** Käufer zahlt monatlich Rente an Verkäufer
4. **Tod:** Bei Tod des Verkäufers endet Rentenzahlung, Käufer wird Eigentümer

**Beispiel:**
- Immobilienwert: 400.000 €
- Verkäufer: 75 Jahre alt
- Lebenserwartung: 15 Jahre
- **Leibrente:** 400.000 € / (15 × 12) = 2.222 €/Monat

**Vorteile für Verkäufer:**
- Lebenslange Rente
- Wohnrecht (bleibt in Immobilie)
- Keine Instandhaltungskosten mehr
- Liquidität im Alter

**Vorteile für Käufer:**
- Immobilie unter Marktwert (Wohnrecht mindert Wert)
- Ratenzahlung (keine Finanzierung erforderlich)
- Erbe für Kinder

**Nachteile für Verkäufer:**
- Verlust des Eigentums
- Abhängigkeit vom Käufer
- Risiko: Käufer zahlt nicht

**Nachteile für Käufer:**
- Langfristige Verpflichtung
- Risiko: Verkäufer lebt länger als erwartet
- Keine sofortige Nutzung

**Für wen geeignet:**
- Verkäufer: Senioren ohne Erben, Liquiditätsbedarf
- Käufer: Investoren, Erben

**Kosten:**
- Notar, Grundbuch (wie beim Kauf)
- Leibrente (monatlich)

---

**3. Reverse Mortgage (Umkehrhypothek):**

**Definition:**
Ältere Menschen beleihen ihre schuldenfreie Immobilie und erhalten monatlich eine Rente. Die Rückzahlung erfolgt bei Tod oder Auszug durch Verkauf der Immobilie.

**Funktionsweise:**
1. **Beleihung:** Immobilie wird beliehen (z.B. 50% des Werts)
2. **Auszahlung:** Monatliche Rente oder Einmalzahlung
3. **Keine Rückzahlung:** Während Lebenszeit keine Rückzahlung
4. **Tod/Auszug:** Immobilie wird verkauft, Darlehen getilgt, Rest geht an Erben

**Beispiel:**
- Immobilienwert: 400.000 €
- Beleihung: 50% = 200.000 €
- Auszahlung: 200.000 € / (15 Jahre × 12 Monate) = 1.111 €/Monat
- **Bei Tod nach 15 Jahren:** Darlehen + Zinsen = ca. 250.000 €, Verkaufserlös 400.000 €, Erben erhalten 150.000 €

**Vorteile:**
- Liquidität im Alter
- Wohnrecht (bleibt in Immobilie)
- Keine monatlichen Raten
- Erben erhalten Restwert

**Nachteile:**
- Hohe Zinsen (ca. 5-7% p.a.)
- Risiko: Immobilie verliert an Wert
- Erben erhalten weniger
- Komplexes Produkt

**Für wen geeignet:**
- Senioren mit schuldenfreier Immobilie
- Liquiditätsbedarf im Alter
- Keine Erben oder Erben einverstanden

**Kosten:**
- Hohe Zinsen (5-7% p.a.)
- Abschlussgebühren (ca. 2-3%)
- Notar, Grundbuch

---

**4. Vergleich der Finanzierungsformen:**

**Mietkauf:**
- **Vorteile:** Kein Eigenkapital, sofortiger Einzug
- **Nachteile:** Teurer, Risiko bei Nichtkauf
- **Für:** Käufer ohne Eigenkapital

**Leibrente:**
- **Vorteile:** Lebenslange Rente, Wohnrecht
- **Nachteile:** Verlust Eigentum, Abhängigkeit
- **Für:** Senioren ohne Erben

**Reverse Mortgage:**
- **Vorteile:** Liquidität, Wohnrecht, keine Raten
- **Nachteile:** Hohe Zinsen, Erben erhalten weniger
- **Für:** Senioren mit Liquiditätsbedarf

**Klassische Finanzierung:**
- **Vorteile:** Günstigste Option, Eigentum
- **Nachteile:** Eigenkapital erforderlich, monatliche Raten
- **Für:** Käufer mit Eigenkapital und Bonität

---

**5. Praxisbeispiel Mietkauf:**

**Käufer:**
- Alter: 30 Jahre
- Einkommen: 3.000 €/Monat
- Eigenkapital: 0 €
- Bonität: Befriedigend (Schufa 92%)

**Immobilie:**
- Kaufpreis: 350.000 €
- Monatliche Miete: 1.400 €
- Anrechnung: 400 €/Monat
- Laufzeit: 10 Jahre

**Berechnung:**
- **Angerechnete Mieten:** 400 € × 12 × 10 = 48.000 €
- **Restkaufpreis:** 350.000 € - 48.000 € = 302.000 €
- **Gesamtkosten:** (1.400 € × 12 × 10) + 302.000 € = 470.000 €
- **Klassische Finanzierung:** 350.000 € + ca. 100.000 € Zinsen = 450.000 €
- **Mehrkosten Mietkauf:** 20.000 €

**Empfehlung:**
- Mietkauf nur, wenn klassische Finanzierung nicht möglich
- Besser: Eigenkapital ansparen, dann klassisch finanzieren

---

**6. Praxisbeispiel Leibrente:**

**Verkäufer:**
- Alter: 75 Jahre
- Lebenserwartung: 15 Jahre
- Immobilienwert: 400.000 €
- Wohnrecht: Lebenslang

**Käufer:**
- Investor, 45 Jahre alt
- Möchte Immobilie für Altersvorsorge

**Berechnung:**
- **Leibrente:** 400.000 € / (15 × 12) = 2.222 €/Monat
- **Gesamtzahlung (bei 15 Jahren):** 2.222 € × 12 × 15 = 400.000 €
- **Risiko Käufer:** Verkäufer lebt 20 Jahre → Gesamtzahlung 533.333 € (statt 400.000 €)
- **Risiko Verkäufer:** Verkäufer stirbt nach 10 Jahren → Erhält nur 266.667 € (statt 400.000 €)

**Empfehlung:**
- Für Verkäufer: Nur wenn keine Erben, Liquiditätsbedarf
- Für Käufer: Nur als Investition, Risiko einkalkulieren

---

**7. Praxisbeispiel Reverse Mortgage:**

**Senior:**
- Alter: 70 Jahre
- Immobilienwert: 500.000 € (schuldenfrei)
- Lebenserwartung: 20 Jahre
- Liquiditätsbedarf: 1.500 €/Monat

**Berechnung:**
- **Beleihung:** 50% = 250.000 €
- **Auszahlung:** 1.500 €/Monat
- **Laufzeit:** 250.000 € / 1.500 € = 167 Monate = 14 Jahre
- **Zinsen (6% p.a.):** ca. 150.000 € über 14 Jahre
- **Gesamtschuld nach 14 Jahren:** 250.000 € + 150.000 € = 400.000 €
- **Verkaufserlös:** 500.000 €
- **Erben erhalten:** 100.000 €

**Empfehlung:**
- Nur wenn: Liquiditätsbedarf, keine andere Option
- Besser: Immobilie verkaufen, kleinere Wohnung kaufen, Rest als Rücklage`,
    law: [
      "§ 593 BGB (Mietvertrag)",
      "§ 759 BGB (Leibrente)",
      "§ 1030 BGB (Nießbrauch)",
      "§ 1093 BGB (Wohnrecht)",
      "§ 488 BGB (Darlehensvertrag)"
    ],
    practice: `**Praxisfall 1: Mietkauf**

Ein Käufer ohne Eigenkapital möchte eine Immobilie für 300.000 € per Mietkauf erwerben. Monatliche Miete: 1.200 €, Anrechnung: 350 €/Monat, Laufzeit: 10 Jahre.

**Fragen:**
1. Wie hoch sind die angerechneten Mieten nach 10 Jahren?
2. Wie hoch ist der Restkaufpreis?
3. Wie hoch sind die Gesamtkosten?
4. Wie viel teurer ist der Mietkauf im Vergleich zur klassischen Finanzierung?
5. Lohnt sich der Mietkauf?

---

**Praxisfall 2: Leibrente**

Ein 80-jähriger Verkäufer verkauft seine Immobilie (Wert 350.000 €) gegen Leibrente. Lebenserwartung: 12 Jahre.

**Fragen:**
1. Wie hoch ist die monatliche Leibrente?
2. Wie viel zahlt der Käufer insgesamt (bei 12 Jahren)?
3. Was passiert, wenn der Verkäufer 15 Jahre lebt?
4. Was passiert, wenn der Verkäufer nach 8 Jahren stirbt?
5. Für wen lohnt sich die Leibrente?

---

**Praxisfall 3: Reverse Mortgage**

Ein 75-jähriger Senior beleiht seine schuldenfreie Immobilie (Wert 450.000 €) zu 50%. Er erhält monatlich 1.200 €. Zinssatz: 6% p.a.

**Fragen:**
1. Wie hoch ist die Beleihung?
2. Wie lange kann er monatlich 1.200 € erhalten?
3. Wie hoch ist die Gesamtschuld nach 15 Jahren?
4. Wie viel erhalten die Erben (bei Verkaufserlös 450.000 €)?
5. Lohnt sich die Reverse Mortgage?`,
    task: `**Aufgabe 1: Mietkauf berechnen**

Berechnen Sie die Gesamtkosten:
- Kaufpreis: 280.000 €
- Monatliche Miete: 1.100 €
- Anrechnung: 300 €/Monat
- Laufzeit: 10 Jahre
- **Angerechnete Mieten:** ?
- **Restkaufpreis:** ?
- **Gesamtkosten:** ?

---

**Aufgabe 2: Leibrente berechnen**

Berechnen Sie die monatliche Leibrente:
- Immobilienwert: 400.000 €
- Lebenserwartung: 18 Jahre
- **Monatliche Leibrente:** ?

---

**Aufgabe 3: Reverse Mortgage berechnen**

Berechnen Sie die Gesamtschuld:
- Beleihung: 200.000 €
- Monatliche Auszahlung: 1.000 €
- Zinssatz: 6% p.a.
- Laufzeit: 12 Jahre
- **Gesamtschuld (ca.):** ?`,
    solution: `**Lösung Praxisfall 1:**
1. Angerechnete Mieten: 350 € × 12 × 10 = 42.000 €.
2. Restkaufpreis: 300.000 € - 42.000 € = 258.000 €.
3. Gesamtkosten: (1.200 € × 12 × 10) + 258.000 € = 402.000 €.
4. Klassische Finanzierung: ca. 380.000 € (300.000 € + 80.000 € Zinsen), Mehrkosten: 22.000 €.
5. Lohnt sich nur, wenn klassische Finanzierung nicht möglich (kein Eigenkapital, schlechte Bonität).

**Lösung Praxisfall 2:**
1. Monatliche Leibrente: 350.000 € / (12 × 12) = 2.431 €/Monat.
2. Gesamtzahlung (12 Jahre): 2.431 € × 12 × 12 = 350.000 €.
3. Wenn 15 Jahre: Gesamtzahlung 437.917 € (Käufer zahlt mehr).
4. Wenn 8 Jahre: Gesamtzahlung 233.333 € (Verkäufer erhält weniger).
5. Lohnt sich für: Verkäufer ohne Erben, Liquiditätsbedarf; Käufer als Investition.

**Lösung Praxisfall 3:**
1. Beleihung: 450.000 € × 50% = 225.000 €.
2. Laufzeit: 225.000 € / 1.200 € = 187,5 Monate = ca. 15,6 Jahre.
3. Gesamtschuld nach 15 Jahren: ca. 225.000 € + 135.000 € Zinsen = 360.000 €.
4. Erben erhalten: 450.000 € - 360.000 € = 90.000 €.
5. Lohnt sich nur, wenn: Liquiditätsbedarf, keine andere Option; besser: Immobilie verkaufen.

**Lösung Aufgabe 1:**
- Angerechnete Mieten: 300 € × 12 × 10 = 36.000 €
- Restkaufpreis: 280.000 € - 36.000 € = 244.000 €
- Gesamtkosten: (1.100 € × 12 × 10) + 244.000 € = 376.000 €

**Lösung Aufgabe 2:**
- Monatliche Leibrente: 400.000 € / (18 × 12) = 1.852 €/Monat

**Lösung Aufgabe 3:**
- Gesamtschuld (ca.): 200.000 € + (200.000 € × 6% × 12) = 344.000 €`,
    type: "Theorie"
  },

  day_20: {
    title: "Zusammenfassung Theorie und Vorbereitung auf Prüfungsvorbereitung",
    theory: `Die Theoriephase (Tage 1-20) hat alle wichtigen Themen der Darlehensvermittlung §34i abgedeckt: Rechtliche Grundlagen (§34i GewO, BGB, GwG), Darlehensarten (Annuitäten-, Tilgungs-, Endfälliges Darlehen), Finanzierungsplanung (Bonitätsprüfung, Haushaltsrechnung, Eigenkapital), Sicherheiten (Grundschuld, Hypothek, Bürgschaft), Risiken und Absicherung (Risikolebensversicherung, BU, Rücklagen), Förderprogramme (KfW, Bausparen), Steuerliche Aspekte (Grunderwerbsteuer, Einkommensteuer, AfA), Verbraucherschutz (Widerrufsrecht, Schlichtung, DSGVO). Ab Tag 21 beginnt die Prüfungsvorbereitung mit Übungsaufgaben, Fallstudien und Prüfungssimulationen. Wiederholen Sie alle Tage 1-20 und machen Sie sich Notizen zu den wichtigsten Gesetzen, Formeln und Praxisbeispielen.`,
    extendedTheory: `**Zusammenfassung Theorie und Vorbereitung auf Prüfungsvorbereitung:**

**1. Überblick Theoriephase (Tage 1-20):**

**Tage 1-5: Rechtliche Grundlagen**
- Tag 1: Einführung §34i GewO (Erlaubnispflicht, Sachkundeprüfung, Versicherung)
- Tag 2: Rechtsfähigkeit, Geschäftsfähigkeit, Vertragsrecht (BGB)
- Tag 3: Grundstücke, Erbbaurecht, Wohnungseigentum (BGB, WEG)
- Tag 4: Grundbuch (Aufbau, Funktion, Eintragungen)
- Tag 5: Immobiliar-Verbraucherdarlehensvertrag (§ 491 BGB, ESIS-Merkblatt)

**Tage 6-10: Pflichten und Compliance**
- Tag 6: Verhaltens- und Informationspflichten (§ 511 BGB, Beratungsprotokoll)
- Tag 7: KWG und GwG (Geldwäscheprävention, Schufa, Identifizierung)
- Tag 8: Verbraucherschutz, Schlichtung, UWG (Widerrufsrecht, Schlichtungsstellen)
- Tag 9: Datenschutz (DSGVO, Verschwiegenheit, Aufsicht)
- Tag 10: Steuerliche Aspekte (Grunderwerbsteuer, Grundsteuer, Einkommensteuer)

**Tage 11-15: Darlehensarten und Finanzierung**
- Tag 11: Darlehensarten (Annuitäten-, Tilgungs-, Endfälliges Darlehen)
- Tag 12: Bausparen, KfW, Förderprogramme
- Tag 13: Zinsbindung, Sollzins, Effektivzins, Konditionsvergleich
- Tag 14: Bonitätsprüfung, Schufa, Kreditwürdigkeit
- Tag 15: Sicherheiten (Grundschuld, Hypothek, Bürgschaft)

**Tage 16-20: Anschlussfinanzierung und Risiken**
- Tag 16: Anschlussfinanzierung, Prolongation, Forward-Darlehen
- Tag 17: Vorfälligkeitsentschädigung, Sondertilgung, Tilgungssatzwechsel
- Tag 18: Risiken und Absicherung (Zinsänderung, Zahlungsunfähigkeit, Versicherungen)
- Tag 19: Besondere Finanzierungsformen (Mietkauf, Leibrente, Reverse Mortgage)
- Tag 20: Zusammenfassung und Vorbereitung auf Prüfung

---

**2. Wichtigste Gesetze und Paragraphen:**

**§34i GewO:**
- Erlaubnispflicht für Darlehensvermittler
- Sachkundeprüfung erforderlich
- Berufshaftpflichtversicherung (mindestens 1 Mio. €)
- Weiterbildungspflicht (15 Stunden/Jahr)

**§ 491 BGB:**
- Immobiliar-Verbraucherdarlehensvertrag
- ESIS-Merkblatt (mindestens 7 Tage vor Vertragsschluss)
- Widerrufsrecht (14 Tage)

**§ 511 BGB:**
- Beratungs- und Dokumentationspflichten
- Bedarfsanalyse, Produktempfehlung, Risikoaufklärung
- Beratungsprotokoll (10 Jahre aufbewahren)

**§ 489 BGB:**
- Sonderkündigungsrecht nach 10 Jahren (6 Monate Frist)
- Keine Vorfälligkeitsentschädigung

**§ 498 BGB:**
- Kündigung bei Zahlungsverzug (3 Monate)
- Zwangsversteigerung droht

**GwG (Geldwäschegesetz):**
- Identifizierung des Kunden (§ 11 GwG)
- Herkunft der Mittel klären (§ 11 Abs. 5 GwG)
- Verdachtsmeldung an FIU (§ 43 GwG)
- Aufbewahrungspflicht 5 Jahre (§ 8 GwG)

**DSGVO:**
- Informationspflichten (Art. 13 DSGVO)
- Rechte der Betroffenen (Art. 15-22 DSGVO)
- Technische und organisatorische Maßnahmen (Art. 32 DSGVO)
- Datenpanne melden (Art. 33, 34 DSGVO)

---

**3. Wichtigste Formeln:**

**Annuität:**
Annuität = Darlehensbetrag × (Zinssatz + Tilgung)

**Effektivzins (vereinfacht):**
Effektivzins ≈ Sollzins + (Nebenkosten / Darlehensbetrag / Laufzeit)

**Haushaltsrechnung:**
Verfügbares Einkommen = Einnahmen - Ausgaben
Maximale Darlehensrate = Verfügbares Einkommen / 1,2 (20% Sicherheitspuffer)

**Beleihungsauslauf:**
Beleihungsauslauf = Darlehensbetrag / Beleihungswert × 100%

**Vorfälligkeitsentschädigung:**
Vorfälligkeitsentschädigung = (Vertragszins - Wiederanlagezins) × Restschuld × Restlaufzeit

**Grunderwerbsteuer:**
Grunderwerbsteuer = Kaufpreis × Steuersatz (3,5-6,5% je nach Bundesland)

**Grundsteuer:**
Grundsteuer = Einheitswert × Grundsteuermesszahl × Hebesatz

---

**4. Wichtigste Praxisbeispiele:**

**Beispiel 1: Haushaltsrechnung**
- Nettoeinkommen: 4.000 €
- Ausgaben: 2.500 €
- Verfügbares Einkommen: 1.500 €
- **Maximale Darlehensrate:** 1.500 € / 1,2 = 1.250 €

**Beispiel 2: Konditionsvergleich**
- Bank A: 3,5% Effektivzins, 10 Jahre Zinsbindung, 5% Sondertilgung
- Bank B: 3,8% Effektivzins, 15 Jahre Zinsbindung, 10% Sondertilgung
- **Empfehlung:** Bank A (günstigster Effektivzins)

**Beispiel 3: Vorfälligkeitsentschädigung**
- Restschuld: 200.000 €
- Vertragszins: 3,5% p.a.
- Wiederanlagezins: 2,0% p.a.
- Restlaufzeit: 5 Jahre
- **Vorfälligkeitsentschädigung:** (3,5% - 2,0%) × 200.000 € × 5 = 15.000 €

---

**5. Vorbereitung auf Prüfungsvorbereitung (Tage 21-40):**

**Tage 21-25: Übungsaufgaben**
- Haushaltsrechnungen erstellen
- Konditionsvergleiche durchführen
- Bonitätsprüfungen simulieren
- Beratungsprotokolle erstellen
- Rechtsfälle lösen

**Tage 26-30: Fallstudien**
- Komplexe Kundenberatungen
- Finanzierungsplanung von A bis Z
- Risikomanagement
- Anschlussfinanzierung
- Sonderfälle (Mietkauf, Leibrente)

**Tage 31-35: Prüfungssimulationen**
- Multiple-Choice-Fragen
- Rechenaufgaben
- Fallstudien
- Mündliche Prüfung simulieren
- Zeitmanagement üben

**Tage 36-40: Wiederholung und Vertiefung**
- Schwachstellen identifizieren
- Gesetze wiederholen
- Formeln üben
- Praxisbeispiele durchgehen
- Letzte Prüfungssimulation

---

**6. Lernmethoden:**

**Aktives Lernen:**
- Zusammenfassungen schreiben
- Mindmaps erstellen
- Karteikarten nutzen
- Lerngruppen bilden
- Praxisbeispiele durchspielen

**Wiederholung:**
- Spaced Repetition (Wiederholung in Abständen)
- Jeden Tag 30 Min Wiederholung
- Schwierige Themen öfter wiederholen
- Prüfungssimulationen regelmäßig

**Praxisbezug:**
- Echte Kundenberatungen simulieren
- Beratungsprotokolle erstellen
- Konditionsvergleiche durchführen
- Finanzierungspläne erstellen

---

**7. Prüfungstipps:**

**Vorbereitung:**
- Alle Tage 1-20 wiederholen
- Gesetze auswendig lernen (§34i GewO, § 491 BGB, § 511 BGB)
- Formeln üben (Annuität, Effektivzins, Haushaltsrechnung)
- Praxisbeispiele durchgehen

**Prüfung:**
- Zeitmanagement (nicht zu lange bei einer Frage)
- Ruhig bleiben (Nervosität ist normal)
- Fragen genau lesen (Schlüsselwörter markieren)
- Rechenaufgaben: Formel hinschreiben, dann rechnen
- Fallstudien: Systematisch vorgehen (Situation, Problem, Lösung)

**Nach der Prüfung:**
- Nicht über Fehler grübeln
- Erfolg feiern
- Weiterbildung planen (15 Stunden/Jahr)

---

**8. Checkliste Prüfungsvorbereitung:**

**Theorie:**
- [ ] Alle Tage 1-20 wiederholt
- [ ] Gesetze auswendig gelernt
- [ ] Formeln geübt
- [ ] Praxisbeispiele durchgegangen

**Übungsaufgaben:**
- [ ] Haushaltsrechnungen erstellt
- [ ] Konditionsvergleiche durchgeführt
- [ ] Bonitätsprüfungen simuliert
- [ ] Beratungsprotokolle erstellt

**Prüfungssimulationen:**
- [ ] Multiple-Choice-Fragen geübt
- [ ] Rechenaufgaben gelöst
- [ ] Fallstudien bearbeitet
- [ ] Mündliche Prüfung simuliert

**Organisatorisches:**
- [ ] Prüfungstermin gebucht
- [ ] Unterlagen vorbereitet (Ausweis, Anmeldebestätigung)
- [ ] Anfahrt geplant
- [ ] Ausgeschlafen und entspannt

---

**9. Motivation:**

**Sie haben es fast geschafft!**
- 20 Tage Theorie abgeschlossen ✓
- 20 Tage Prüfungsvorbereitung vor Ihnen
- Sachkundeprüfung §34i in Reichweite
- Karriere als Immobiliardarlehensvermittler wartet

**Bleiben Sie dran!**
- Jeden Tag ein bisschen lernen
- Nicht aufgeben bei Schwierigkeiten
- Praxisbezug herstellen
- Erfolg visualisieren

**Viel Erfolg bei der Prüfungsvorbereitung!**`,
    law: [
      "§34i GewO (Erlaubnispflicht)",
      "§ 491 BGB (Immobiliar-Verbraucherdarlehensvertrag)",
      "§ 511 BGB (Beratungs- und Dokumentationspflichten)",
      "§ 489 BGB (Sonderkündigungsrecht)",
      "§ 498 BGB (Kündigung bei Zahlungsverzug)",
      "GwG (Geldwäschegesetz)",
      "DSGVO (Datenschutz-Grundverordnung)"
    ],
    practice: `**Praxisfall 1: Gesamtberatung**

Ein Kunde (35 Jahre, verheiratet, 2 Kinder) möchte eine Eigentumswohnung für 400.000 € kaufen. Nettoeinkommen: 4.500 € (Kunde) + 2.500 € (Ehefrau). Eigenkapital: 80.000 €. Ausgaben: 3.000 €/Monat.

**Aufgaben:**
1. Erstellen Sie eine Haushaltsrechnung
2. Prüfen Sie die Bonität
3. Empfehlen Sie ein Darlehensprodukt
4. Erstellen Sie einen Konditionsvergleich (3 Banken)
5. Klären Sie über Risiken auf
6. Empfehlen Sie Absicherungen
7. Erstellen Sie ein Beratungsprotokoll

---

**Praxisfall 2: Anschlussfinanzierung**

Ein Kunde hat eine Restschuld von 220.000 € nach 10 Jahren Zinsbindung. Seine Bank bietet Prolongation zu 4,5% p.a. an. Andere Banken bieten 4,0% p.a.

**Aufgaben:**
1. Berechnen Sie die Ersparnis bei Umschuldung
2. Berechnen Sie die Kosten der Umschuldung
3. Empfehlen Sie eine Option
4. Erklären Sie Forward-Darlehen
5. Klären Sie über Sonderkündigungsrecht auf

---

**Praxisfall 3: Risikomanagement**

Ein Kunde (40 Jahre, Hauptverdiener) nimmt ein Darlehen über 300.000 € auf. Monatliche Rate: 1.500 €.

**Aufgaben:**
1. Identifizieren Sie alle Risiken
2. Empfehlen Sie Absicherungen
3. Berechnen Sie die Kosten der Absicherungen
4. Erstellen Sie einen Notfallplan
5. Klären Sie über Zwangsversteigerung auf`,
    task: `**Aufgabe 1: Wiederholung Formeln**

Berechnen Sie:
1. Annuität: Darlehensbetrag 280.000 €, Zinssatz 3,4% p.a., Tilgung 2,2% p.a.
2. Maximale Darlehensrate: Verfügbares Einkommen 1.800 €, Sicherheitspuffer 20%
3. Beleihungsauslauf: Darlehensbetrag 260.000 €, Beleihungswert 320.000 €
4. Vorfälligkeitsentschädigung: Restschuld 190.000 €, Vertragszins 3,0%, Wiederanlagezins 1,5%, Restlaufzeit 6 Jahre

---

**Aufgabe 2: Gesetze wiederholen**

Nennen Sie:
1. Erlaubnispflicht für Darlehensvermittler (Gesetz + Paragraph)
2. Beratungs- und Dokumentationspflichten (Gesetz + Paragraph)
3. Sonderkündigungsrecht nach 10 Jahren (Gesetz + Paragraph)
4. Widerrufsrecht bei Darlehensverträgen (Gesetz + Paragraph)
5. Identifizierung des Kunden (Gesetz + Paragraph)

---

**Aufgabe 3: Praxisbeispiele wiederholen**

Erklären Sie:
1. Wie erstellt man eine Haushaltsrechnung?
2. Wie führt man einen Konditionsvergleich durch?
3. Wie prüft man die Bonität eines Kunden?
4. Wie berechnet man die Vorfälligkeitsentschädigung?
5. Wie sichert man Risiken ab?`,
    solution: `**Lösung Praxisfall 1:**
1. Haushaltsrechnung: Gesamteinkommen 7.000 €, Ausgaben 3.000 €, Verfügbares Einkommen 4.000 €, Maximale Rate 3.333 €.
2. Bonität: Gut (ausreichendes Einkommen, Eigenkapital 20%, Sicherheitspuffer vorhanden).
3. Darlehensprodukt: Annuitätendarlehen 320.000 €, 3,5% Zinsen, 2% Tilgung, 10 Jahre Zinsbindung, monatliche Rate 1.467 €.
4. Konditionsvergleich: Bank A 3,5%, Bank B 3,8%, Bank C 3,6% → Empfehlung Bank A.
5. Risiken: Zinsänderung, Zahlungsunfähigkeit, Tod, Wertverlust.
6. Absicherungen: Risikolebensversicherung 320.000 €, BU 1.500 €/Monat, Rücklagen 9.000 €.
7. Beratungsprotokoll: Kundendaten, finanzielle Situation, Bedarfsanalyse, Produktempfehlung, Risikoaufklärung, Unterschrift.

**Lösung Praxisfall 2:**
1. Ersparnis: (4,5% - 4,0%) × 220.000 € = 1.100 €/Jahr = 11.000 € über 10 Jahre.
2. Kosten: Grundschuldabtretung ca. 440 € (0,2%).
3. Empfehlung: Umschuldung (Nettoersparnis 10.560 €).
4. Forward-Darlehen: Zinssicherung bis 5 Jahre im Voraus, Zinsaufschlag 0,01-0,03% pro Monat.
5. Sonderkündigungsrecht: Nach 10 Jahren mit 6 Monaten Frist (§ 489 BGB), keine Vorfälligkeitsentschädigung.

**Lösung Praxisfall 3:**
1. Risiken: Zinsänderung, Jobverlust, Krankheit, Tod, Wertverlust, Zwangsversteigerung.
2. Absicherungen: Risikolebensversicherung 300.000 €, BU 1.500 €/Monat, Rücklagen 9.000 €, lange Zinsbindung.
3. Kosten: Risikolebensversicherung 40 €/Monat, BU 90 €/Monat = 130 €/Monat.
4. Notfallplan: Rücklagen nutzen, mit Bank sprechen (Stundung), Tilgungssatzwechsel, freiwilliger Verkauf.
5. Zwangsversteigerung: Nach 3 Monaten Zahlungsverzug, Kündigung, Versteigerung, Erlösverteilung nach Rangfolge.

**Lösung Aufgabe 1:**
1. Annuität: 280.000 € × (3,4% + 2,2%) = 15.680 €/Jahr = 1.306,67 €/Monat
2. Maximale Darlehensrate: 1.800 € / 1,2 = 1.500 €
3. Beleihungsauslauf: 260.000 € / 320.000 € = 81,25%
4. Vorfälligkeitsentschädigung: (3,0% - 1,5%) × 190.000 € × 6 = 17.100 €

**Lösung Aufgabe 2:**
1. §34i GewO (Erlaubnispflicht für Darlehensvermittler)
2. § 511 BGB (Beratungs- und Dokumentationspflichten)
3. § 489 BGB (Sonderkündigungsrecht nach 10 Jahren)
4. § 495 BGB (Widerrufsrecht bei Darlehensverträgen)
5. § 11 GwG (Identifizierung des Kunden)

**Lösung Aufgabe 3:**
1. Haushaltsrechnung: Einnahmen - Ausgaben = Verfügbares Einkommen, Maximale Rate = Verfügbares Einkommen / 1,2
2. Konditionsvergleich: Mindestens 3 Angebote einholen, Effektivzins vergleichen, Zinsbindung, Sondertilgung, Bereitstellungszinsen
3. Bonitätsprüfung: Einkommensprüfung, Ausgabenprüfung, Vermögensprüfung, Schufa-Auskunft, Haushaltsrechnung
4. Vorfälligkeitsentschädigung: (Vertragszins - Wiederanlagezins) × Restschuld × Restlaufzeit
5. Risiken absichern: Risikolebensversicherung, Berufsunfähigkeitsversicherung, Rücklagen, lange Zinsbindung, Sicherheitspuffer`,
    type: "Theorie"
  },

};
// Modul 5: Darlehensvermittlung §34i GewO
// Teil 5: Tage 21-25 (Prüfungsvorbereitung - Übungsaufgaben)

export const contentDataModule5_34i_Part5: Record<string, {
  title: string;
  theory: string;
  extendedTheory?: string;
  law: string[];
  practice: string;
  task: string;
  solution?: string;
  type?: string;
}> = {

  day_21: {
    title: "Übungsaufgaben: Haushaltsrechnung und Finanzierungsplanung",
    theory: `Die Haushaltsrechnung ist die Grundlage jeder Finanzierungsberatung. Sie ermittelt das verfügbare Einkommen für die Darlehensrate. **Formel:** Verfügbares Einkommen = Einnahmen - Ausgaben. **Sicherheitspuffer:** Maximale Darlehensrate = Verfügbares Einkommen / 1,2 (20% Reserve). Typische Ausgaben: Miete/Nebenkosten, Lebenshaltung (ca. 800-1.200 €/Person), Versicherungen, Pkw, Freizeit, Rücklagen. Bei der Finanzierungsplanung müssen Sie Eigenkapital (mindestens 20%), Nebenkosten (10-15%), Beleihungsauslauf (maximal 80%) und Tilgung (mindestens 2%) berücksichtigen. Heute üben Sie 10 realistische Haushaltsrechnungen mit unterschiedlichen Einkommens- und Familiensituationen.`,
    extendedTheory: `**Übungsaufgaben: Haushaltsrechnung und Finanzierungsplanung im Detail:**

**Übung 1: Single, Angestellter**
- Nettoeinkommen: 3.200 €/Monat
- Ausgaben: Lebenshaltung 1.000 €, Pkw 300 €, Versicherungen 150 €, Freizeit 400 €
- **Verfügbares Einkommen:** 3.200 € - 1.850 € = 1.350 €
- **Maximale Darlehensrate:** 1.350 € / 1,2 = 1.125 €

**Übung 2: Paar ohne Kinder**
- Nettoeinkommen: 4.500 € (Partner 1) + 2.800 € (Partner 2) = 7.300 €/Monat
- Ausgaben: Lebenshaltung 2.000 €, 2× Pkw 600 €, Versicherungen 250 €, Freizeit 600 €
- **Verfügbares Einkommen:** 7.300 € - 3.450 € = 3.850 €
- **Maximale Darlehensrate:** 3.850 € / 1,2 = 3.208 €

**Übung 3: Familie mit 2 Kindern**
- Nettoeinkommen: 5.000 € (Hauptverdiener) + 1.500 € (Teilzeit) = 6.500 €/Monat
- Ausgaben: Lebenshaltung 3.000 €, Pkw 400 €, Versicherungen 300 €, Kinder 500 €, Freizeit 400 €
- **Verfügbares Einkommen:** 6.500 € - 4.600 € = 1.900 €
- **Maximale Darlehensrate:** 1.900 € / 1,2 = 1.583 €

**Übung 4: Selbstständiger**
- Nettoeinkommen (Durchschnitt 3 Jahre): 4.800 €/Monat
- Ausgaben: Lebenshaltung 1.500 €, Pkw 500 €, Versicherungen 400 €, Altersvorsorge 300 €, Freizeit 500 €
- **Verfügbares Einkommen:** 4.800 € - 3.200 € = 1.600 €
- **Maximale Darlehensrate:** 1.600 € / 1,2 = 1.333 €

**Übung 5: Rentner**
- Nettoeinkommen: 2.200 € (Rente) + 500 € (Mieteinnahmen) = 2.700 €/Monat
- Ausgaben: Lebenshaltung 1.200 €, Versicherungen 200 €, Gesundheit 300 €, Freizeit 300 €
- **Verfügbares Einkommen:** 2.700 € - 2.000 € = 700 €
- **Maximale Darlehensrate:** 700 € / 1,2 = 583 €

**Übung 6: Beamter**
- Nettoeinkommen: 4.200 €/Monat
- Ausgaben: Lebenshaltung 1.300 €, Pkw 350 €, Versicherungen 180 €, Freizeit 450 €
- **Verfügbares Einkommen:** 4.200 € - 2.280 € = 1.920 €
- **Maximale Darlehensrate:** 1.920 € / 1,2 = 1.600 €

**Übung 7: Alleinerziehend mit 1 Kind**
- Nettoeinkommen: 3.000 € + 250 € (Kindergeld) = 3.250 €/Monat
- Ausgaben: Lebenshaltung 1.800 €, Pkw 300 €, Versicherungen 200 €, Kind 400 €, Freizeit 200 €
- **Verfügbares Einkommen:** 3.250 € - 2.900 € = 350 €
- **Maximale Darlehensrate:** 350 € / 1,2 = 292 € (zu niedrig für Finanzierung)

**Übung 8: Doppelverdiener mit hohem Einkommen**
- Nettoeinkommen: 6.500 € + 5.200 € = 11.700 €/Monat
- Ausgaben: Lebenshaltung 3.500 €, 2× Pkw 800 €, Versicherungen 400 €, Freizeit 1.000 €, Altersvorsorge 500 €
- **Verfügbares Einkommen:** 11.700 € - 6.200 € = 5.500 €
- **Maximale Darlehensrate:** 5.500 € / 1,2 = 4.583 €

**Übung 9: Azubi/Berufseinsteiger**
- Nettoeinkommen: 1.800 €/Monat
- Ausgaben: Lebenshaltung 800 €, Pkw 250 €, Versicherungen 100 €, Freizeit 300 €
- **Verfügbares Einkommen:** 1.800 € - 1.450 € = 350 €
- **Maximale Darlehensrate:** 350 € / 1,2 = 292 € (zu niedrig für Finanzierung)

**Übung 10: Paar mit unregelmäßigem Einkommen**
- Nettoeinkommen (Durchschnitt): 3.800 € + 2.200 € = 6.000 €/Monat
- Ausgaben: Lebenshaltung 2.200 €, Pkw 450 €, Versicherungen 280 €, Freizeit 500 €, Rücklagen 300 €
- **Verfügbares Einkommen:** 6.000 € - 3.730 € = 2.270 €
- **Maximale Darlehensrate:** 2.270 € / 1,2 = 1.892 €

---

**Finanzierungsplanung:**

**Übung 11: Eigenkapital berechnen**
- Kaufpreis: 400.000 €
- Nebenkosten: 10% = 40.000 €
- **Gesamtkosten:** 440.000 €
- **Mindest-Eigenkapital (20%):** 88.000 €

**Übung 12: Beleihungsauslauf berechnen**
- Kaufpreis: 350.000 €
- Eigenkapital: 70.000 €
- Darlehensbetrag: 280.000 €
- Beleihungswert: 320.000 € (ca. 91% des Kaufpreises)
- **Beleihungsauslauf:** 280.000 € / 320.000 € = 87,5% (zu hoch, sollte ≤80%)

**Übung 13: Maximales Darlehen berechnen**
- Verfügbares Einkommen: 2.000 €
- Maximale Darlehensrate: 2.000 € / 1,2 = 1.667 €
- Zinssatz: 3,5% p.a.
- Tilgung: 2% p.a.
- **Maximales Darlehen:** 1.667 € × 12 / (3,5% + 2%) = 363.927 €

**Übung 14: Tilgungsplan erstellen**
- Darlehensbetrag: 300.000 €
- Zinssatz: 3,5% p.a.
- Tilgung: 2% p.a.
- **Monatliche Rate:** 300.000 € × (3,5% + 2%) / 12 = 1.375 €
- **Restschuld nach 10 Jahren:** ca. 240.000 €
- **Laufzeit bis Volltilgung:** ca. 35 Jahre

**Übung 15: Nebenkosten berechnen**
- Kaufpreis: 450.000 €
- Grunderwerbsteuer (5%): 22.500 €
- Notar/Grundbuch (2%): 9.000 €
- Makler (3,57%): 16.065 €
- **Gesamte Nebenkosten:** 47.565 € (ca. 10,6%)`,
    law: [
      "§ 491 BGB (Immobiliar-Verbraucherdarlehensvertrag)",
      "§ 511 BGB (Beratungs- und Dokumentationspflichten)",
      "§ 18a KWG (Kreditwürdigkeitsprüfung)"
    ],
    practice: `**Praxisfall 1: Haushaltsrechnung erstellen**

Ein Kunde (32 Jahre, ledig) möchte eine Eigentumswohnung kaufen. Nettoeinkommen: 3.800 €/Monat. Ausgaben: Lebenshaltung 1.100 €, Pkw 350 €, Versicherungen 180 €, Freizeit 450 €, Sparen 300 €.

**Aufgaben:**
1. Berechnen Sie das verfügbare Einkommen
2. Berechnen Sie die maximale Darlehensrate (20% Sicherheitspuffer)
3. Berechnen Sie das maximale Darlehen (3,5% Zinsen, 2% Tilgung)
4. Ist die Finanzierung tragbar?

---

**Praxisfall 2: Finanzierungsplanung**

Ein Paar möchte ein Haus für 500.000 € kaufen. Eigenkapital: 100.000 €. Nettoeinkommen: 7.500 €/Monat. Ausgaben: 4.200 €/Monat.

**Aufgaben:**
1. Berechnen Sie die Nebenkosten (10%)
2. Berechnen Sie den Darlehensbedarf
3. Berechnen Sie den Beleihungsauslauf
4. Berechnen Sie die maximale Darlehensrate
5. Berechnen Sie die monatliche Rate (3,5% Zinsen, 2% Tilgung)
6. Ist die Finanzierung tragbar?

---

**Praxisfall 3: Grenzfall**

Ein Kunde (28 Jahre) möchte eine Wohnung für 280.000 € kaufen. Eigenkapital: 30.000 €. Nettoeinkommen: 2.800 €/Monat. Ausgaben: 1.900 €/Monat.

**Aufgaben:**
1. Berechnen Sie die maximale Darlehensrate
2. Berechnen Sie den Darlehensbedarf
3. Berechnen Sie die monatliche Rate (3,8% Zinsen, 2% Tilgung)
4. Ist die Finanzierung tragbar?
5. Welche Empfehlung geben Sie?`,
    task: `**Aufgabe 1: Haushaltsrechnung**

Erstellen Sie eine Haushaltsrechnung:
- Nettoeinkommen: 4.200 €/Monat
- Lebenshaltung: 1.300 €
- Pkw: 400 €
- Versicherungen: 220 €
- Freizeit: 500 €
- **Verfügbares Einkommen:** ?
- **Maximale Darlehensrate:** ?

---

**Aufgabe 2: Eigenkapital**

Berechnen Sie das Mindest-Eigenkapital:
- Kaufpreis: 380.000 €
- Nebenkosten: 10%
- **Gesamtkosten:** ?
- **Mindest-Eigenkapital (20%):** ?

---

**Aufgabe 3: Maximales Darlehen**

Berechnen Sie das maximale Darlehen:
- Maximale Darlehensrate: 1.800 €/Monat
- Zinssatz: 3,6% p.a.
- Tilgung: 2,2% p.a.
- **Maximales Darlehen:** ?`,
    solution: `**Lösung Praxisfall 1:**
1. Verfügbares Einkommen: 3.800 € - (1.100 € + 350 € + 180 € + 450 € + 300 €) = 1.420 €
2. Maximale Darlehensrate: 1.420 € / 1,2 = 1.183 €
3. Maximales Darlehen: 1.183 € × 12 / (3,5% + 2%) = 258.109 €
4. Ja, tragbar (ausreichendes Einkommen, Sicherheitspuffer vorhanden)

**Lösung Praxisfall 2:**
1. Nebenkosten: 500.000 € × 10% = 50.000 €
2. Darlehensbedarf: (500.000 € + 50.000 €) - 100.000 € = 450.000 €
3. Beleihungsauslauf: 450.000 € / (500.000 € × 0,91) = 98,9% (zu hoch!)
4. Maximale Darlehensrate: (7.500 € - 4.200 €) / 1,2 = 2.750 €
5. Monatliche Rate: 450.000 € × (3,5% + 2%) / 12 = 2.062,50 €
6. Ja, tragbar (Rate < maximale Rate), aber Eigenkapital zu niedrig (nur 18%)

**Lösung Praxisfall 3:**
1. Maximale Darlehensrate: (2.800 € - 1.900 €) / 1,2 = 750 €
2. Darlehensbedarf: (280.000 € + 28.000 €) - 30.000 € = 278.000 €
3. Monatliche Rate: 278.000 € × (3,8% + 2%) / 12 = 1.344 €
4. Nein, nicht tragbar (1.344 € > 750 € maximale Rate)
5. Empfehlung: Mehr Eigenkapital ansparen, günstigere Immobilie suchen, Einkommen erhöhen

**Lösung Aufgabe 1:**
- Verfügbares Einkommen: 4.200 € - (1.300 € + 400 € + 220 € + 500 €) = 1.780 €
- Maximale Darlehensrate: 1.780 € / 1,2 = 1.483 €

**Lösung Aufgabe 2:**
- Gesamtkosten: 380.000 € + (380.000 € × 10%) = 418.000 €
- Mindest-Eigenkapital: 418.000 € × 20% = 83.600 €

**Lösung Aufgabe 3:**
- Maximales Darlehen: 1.800 € × 12 / (3,6% + 2,2%) = 372.414 €`,
    type: "Prüfungsvorbereitung"
  },

  day_22: {
    title: "Übungsaufgaben: Konditionsvergleich und Effektivzins",
    theory: `Der Konditionsvergleich ist essenziell für die Kundenberatung. Sie müssen mindestens 3 Angebote einholen und vergleichen. **Vergleichskriterien:** Effektivzins (wichtigster Faktor), Zinsbindung, Sondertilgungsrechte, Tilgungssatzwechsel, Bereitstellungszinsen, Bearbeitungsgebühren. Der **Effektivzins** beinhaltet alle Kosten (Sollzins + Nebenkosten) und ermöglicht einen fairen Vergleich. **Formel (vereinfacht):** Effektivzins ≈ Sollzins + (Nebenkosten / Darlehensbetrag / Laufzeit). Achten Sie auf versteckte Kosten: Bereitstellungszinsen (ca. 0,25% pro Monat nach 3-6 Monaten), Schätzgebühren (ca. 300-500 €), Teilauszahlungszuschläge. Heute üben Sie 10 Konditionsvergleiche mit realistischen Bankangeboten.`,
    extendedTheory: `**Übungsaufgaben: Konditionsvergleich und Effektivzins im Detail:**

**Übung 1: Einfacher Konditionsvergleich**

**Bank A:**
- Sollzins: 3,50% p.a.
- Effektivzins: 3,55% p.a.
- Zinsbindung: 10 Jahre
- Sondertilgung: 5% p.a.
- Tilgungssatzwechsel: 1× kostenlos
- Bereitstellungszinsen: 0,25% ab 3. Monat

**Bank B:**
- Sollzins: 3,60% p.a.
- Effektivzins: 3,68% p.a.
- Zinsbindung: 15 Jahre
- Sondertilgung: 10% p.a.
- Tilgungssatzwechsel: 2× kostenlos
- Bereitstellungszinsen: 0,25% ab 6. Monat

**Bank C:**
- Sollzins: 3,45% p.a.
- Effektivzins: 3,62% p.a.
- Zinsbindung: 10 Jahre
- Sondertilgung: 5% p.a.
- Tilgungssatzwechsel: Nicht möglich
- Bereitstellungszinsen: 0,30% ab 2. Monat

**Empfehlung:** Bank A (günstigster Effektivzins 3,55%, gute Konditionen)

---

**Übung 2: Konditionsvergleich mit unterschiedlichen Zinsbindungen**

**Bank A:**
- Sollzins: 3,20% p.a.
- Effektivzins: 3,24% p.a.
- Zinsbindung: 5 Jahre
- Sondertilgung: 5% p.a.

**Bank B:**
- Sollzins: 3,50% p.a.
- Effektivzins: 3,55% p.a.
- Zinsbindung: 10 Jahre
- Sondertilgung: 5% p.a.

**Bank C:**
- Sollzins: 3,80% p.a.
- Effektivzins: 3,86% p.a.
- Zinsbindung: 15 Jahre
- Sondertilgung: 10% p.a.

**Empfehlung:** Bank B (guter Kompromiss: 10 Jahre Zinssicherheit, moderater Zinssatz)

---

**Übung 3: Effektivzins berechnen**

**Bank A:**
- Darlehensbetrag: 300.000 €
- Sollzins: 3,50% p.a.
- Bearbeitungsgebühr: 1% = 3.000 €
- Laufzeit: 10 Jahre
- **Effektivzins:** 3,50% + (3.000 € / 300.000 € / 10) = 3,60% p.a.

**Bank B:**
- Darlehensbetrag: 300.000 €
- Sollzins: 3,60% p.a.
- Bearbeitungsgebühr: 0 €
- Laufzeit: 10 Jahre
- **Effektivzins:** 3,60% p.a.

**Empfehlung:** Bank B (gleicher Effektivzins, keine Bearbeitungsgebühr)

---

**Übung 4: Bereitstellungszinsen berechnen**

**Bank A:**
- Darlehensbetrag: 400.000 €
- Bereitstellungszinsen: 0,25% pro Monat ab 3. Monat
- Bauzeit: 12 Monate
- **Bereitstellungszinsen:** 400.000 € × 0,25% × 9 Monate = 9.000 €

**Bank B:**
- Darlehensbetrag: 400.000 €
- Bereitstellungszinsen: 0,25% pro Monat ab 6. Monat
- Bauzeit: 12 Monate
- **Bereitstellungszinsen:** 400.000 € × 0,25% × 6 Monate = 6.000 €

**Empfehlung:** Bank B (3.000 € Ersparnis)

---

**Übung 5: Konditionsvergleich mit Sondertilgung**

**Bank A:**
- Sollzins: 3,50% p.a.
- Sondertilgung: 5% p.a. (kostenlos)
- Darlehensbetrag: 300.000 €
- **Maximale Sondertilgung:** 15.000 €/Jahr

**Bank B:**
- Sollzins: 3,60% p.a. (Aufschlag 0,10% für 10% Sondertilgung)
- Sondertilgung: 10% p.a.
- Darlehensbetrag: 300.000 €
- **Maximale Sondertilgung:** 30.000 €/Jahr

**Empfehlung:** Bank A (wenn Sondertilgung < 15.000 €/Jahr), Bank B (wenn Sondertilgung > 15.000 €/Jahr)

---

**Übung 6: Konditionsvergleich mit Tilgungssatzwechsel**

**Bank A:**
- Sollzins: 3,50% p.a.
- Tilgungssatzwechsel: 1× kostenlos
- Weitere Wechsel: 150 € pro Wechsel

**Bank B:**
- Sollzins: 3,55% p.a.
- Tilgungssatzwechsel: 2× kostenlos
- Weitere Wechsel: 100 € pro Wechsel

**Empfehlung:** Bank B (mehr Flexibilität, geringere Kosten bei weiteren Wechseln)

---

**Übung 7: Konditionsvergleich mit Forward-Darlehen**

**Bank A:**
- Aktueller Marktzins: 3,50% p.a.
- Forward-Darlehen (24 Monate Vorlaufzeit): 3,74% p.a.
- **Forward-Prämie:** 0,24% (0,01% pro Monat)

**Bank B:**
- Aktueller Marktzins: 3,50% p.a.
- Forward-Darlehen (24 Monate Vorlaufzeit): 3,98% p.a.
- **Forward-Prämie:** 0,48% (0,02% pro Monat)

**Empfehlung:** Bank A (günstigere Forward-Prämie)

---

**Übung 8: Konditionsvergleich mit KfW-Förderung**

**Bank A (ohne KfW):**
- Darlehensbetrag: 300.000 €
- Sollzins: 3,50% p.a.
- Monatliche Rate: 1.375 €

**Bank B (mit KfW):**
- Darlehensbetrag: 250.000 € (Hausbank) + 50.000 € (KfW)
- Sollzins Hausbank: 3,50% p.a.
- Sollzins KfW: 1,50% p.a.
- **Monatliche Rate:** (250.000 € × 5,5% / 12) + (50.000 € × 3,5% / 12) = 1.291,67 €
- **Ersparnis:** 83,33 €/Monat = 1.000 €/Jahr

**Empfehlung:** Bank B (mit KfW-Förderung)

---

**Übung 9: Konditionsvergleich mit Disagio**

**Bank A (ohne Disagio):**
- Darlehensbetrag: 300.000 €
- Sollzins: 3,50% p.a.
- Auszahlung: 100%
- **Auszahlungsbetrag:** 300.000 €

**Bank B (mit Disagio):**
- Darlehensbetrag: 300.000 €
- Sollzins: 3,20% p.a.
- Auszahlung: 97% (3% Disagio)
- **Auszahlungsbetrag:** 291.000 €
- **Effektivzins:** ca. 3,50% p.a. (Disagio erhöht Effektivzins)

**Empfehlung:** Bank A (gleicher Effektivzins, volle Auszahlung)

---

**Übung 10: Konditionsvergleich mit Teilauszahlungszuschlag**

**Bank A:**
- Darlehensbetrag: 400.000 €
- Sollzins: 3,50% p.a.
- Teilauszahlungszuschlag: 0,10% pro Monat (für nicht abgerufenen Betrag)
- Bauzeit: 12 Monate
- **Durchschnittlich nicht abgerufen:** 200.000 € (50%)
- **Teilauszahlungszuschlag:** 200.000 € × 0,10% × 12 = 2.400 €

**Bank B:**
- Darlehensbetrag: 400.000 €
- Sollzins: 3,60% p.a.
- Teilauszahlungszuschlag: 0 € (kein Zuschlag)

**Empfehlung:** Bank B (trotz höherem Sollzins, keine Teilauszahlungszuschläge)`,
    law: [
      "§ 492 BGB (Angaben im Darlehensvertrag)",
      "§ 6 PAngV (Preisangabenverordnung - Effektivzins)",
      "§ 511 BGB (Beratungs- und Dokumentationspflichten)"
    ],
    practice: `**Praxisfall 1: Konditionsvergleich**

Ein Kunde benötigt ein Darlehen über 350.000 €. Sie holen 3 Angebote ein:

**Bank A:** Sollzins 3,45%, Effektivzins 3,50%, 10 Jahre Zinsbindung, 5% Sondertilgung
**Bank B:** Sollzins 3,60%, Effektivzins 3,65%, 15 Jahre Zinsbindung, 10% Sondertilgung
**Bank C:** Sollzins 3,40%, Effektivzins 3,58%, 10 Jahre Zinsbindung, 5% Sondertilgung, Bearbeitungsgebühr 1%

**Aufgaben:**
1. Welche Bank hat den günstigsten Effektivzins?
2. Welche Bank bietet die längste Zinssicherheit?
3. Welche Bank empfehlen Sie? Begründung?
4. Wie viel spart der Kunde pro Jahr bei der günstigsten Bank (im Vergleich zur teuersten)?

---

**Praxisfall 2: Bereitstellungszinsen**

Ein Kunde baut ein Haus. Darlehensbetrag: 450.000 €. Bauzeit: 15 Monate.

**Bank A:** Bereitstellungszinsen 0,25% ab 3. Monat
**Bank B:** Bereitstellungszinsen 0,25% ab 6. Monat

**Aufgaben:**
1. Berechnen Sie die Bereitstellungszinsen bei Bank A
2. Berechnen Sie die Bereitstellungszinsen bei Bank B
3. Wie viel spart der Kunde bei Bank B?
4. Welche Bank empfehlen Sie?

---

**Praxisfall 3: KfW-Förderung**

Ein Kunde kauft eine energieeffiziente Immobilie für 400.000 €. Er kann ein KfW-Darlehen über 100.000 € (1,5% p.a.) nutzen.

**Ohne KfW:** 400.000 € zu 3,50% p.a.
**Mit KfW:** 300.000 € zu 3,50% p.a. + 100.000 € zu 1,50% p.a.

**Aufgaben:**
1. Berechnen Sie die monatliche Rate ohne KfW (2% Tilgung)
2. Berechnen Sie die monatliche Rate mit KfW (2% Tilgung)
3. Wie viel spart der Kunde pro Monat?
4. Wie viel spart der Kunde über 10 Jahre?`,
    task: `**Aufgabe 1: Effektivzins berechnen**

Berechnen Sie den Effektivzins:
- Darlehensbetrag: 280.000 €
- Sollzins: 3,40% p.a.
- Bearbeitungsgebühr: 2.800 € (1%)
- Laufzeit: 10 Jahre
- **Effektivzins (vereinfacht):** ?

---

**Aufgabe 2: Bereitstellungszinsen**

Berechnen Sie die Bereitstellungszinsen:
- Darlehensbetrag: 380.000 €
- Bereitstellungszinsen: 0,25% pro Monat ab 4. Monat
- Bauzeit: 14 Monate
- **Bereitstellungszinsen:** ?

---

**Aufgabe 3: Konditionsvergleich**

Vergleichen Sie die Angebote:
- Bank A: Effektivzins 3,52%, 10 Jahre Zinsbindung, 5% Sondertilgung
- Bank B: Effektivzins 3,68%, 15 Jahre Zinsbindung, 10% Sondertilgung
- Bank C: Effektivzins 3,48%, 10 Jahre Zinsbindung, 5% Sondertilgung

**Welche Bank empfehlen Sie?**`,
    solution: `**Lösung Praxisfall 1:**
1. Bank A: 3,50% (günstigster Effektivzins)
2. Bank B: 15 Jahre Zinsbindung
3. Empfehlung: Bank A (günstigster Effektivzins, gute Konditionen); Bank B wenn Kunde lange Zinssicherheit wünscht
4. Ersparnis: 350.000 € × (3,65% - 3,50%) = 525 €/Jahr

**Lösung Praxisfall 2:**
1. Bereitstellungszinsen Bank A: 450.000 € × 0,25% × 12 Monate = 13.500 €
2. Bereitstellungszinsen Bank B: 450.000 € × 0,25% × 9 Monate = 10.125 €
3. Ersparnis: 13.500 € - 10.125 € = 3.375 €
4. Empfehlung: Bank B (3.375 € Ersparnis)

**Lösung Praxisfall 3:**
1. Monatliche Rate ohne KfW: 400.000 € × (3,50% + 2%) / 12 = 1.833,33 €
2. Monatliche Rate mit KfW: (300.000 € × 5,5% / 12) + (100.000 € × 3,5% / 12) = 1.666,67 €
3. Ersparnis pro Monat: 1.833,33 € - 1.666,67 € = 166,67 €
4. Ersparnis über 10 Jahre: 166,67 € × 12 × 10 = 20.000 €

**Lösung Aufgabe 1:**
- Effektivzins: 3,40% + (2.800 € / 280.000 € / 10) = 3,50% p.a.

**Lösung Aufgabe 2:**
- Bereitstellungszinsen: 380.000 € × 0,25% × 10 Monate = 9.500 €

**Lösung Aufgabe 3:**
- Empfehlung: Bank C (günstigster Effektivzins 3,48%)`,
    type: "Prüfungsvorbereitung"
  },

  day_23: {
    title: "Übungsaufgaben: Bonitätsprüfung und Schufa",
    theory: `Die Bonitätsprüfung ist gesetzlich vorgeschrieben (§ 18a KWG). Sie prüfen: **Einkommensprüfung** (Gehaltsabrechnungen, Steuerbescheide), **Ausgabenprüfung** (Haushaltsrechnung), **Vermögensprüfung** (Eigenkapital, Rücklagen), **Schufa-Auskunft** (Zahlungsverhalten, Kredite, Negativmerkmale). Der **Schufa-Score** bewertet die Kreditwürdigkeit: >95% = sehr gut, 90-95% = gut, 80-90% = befriedigend, <80% = schlecht. Negativmerkmale: Zahlungsverzug, Mahnbescheide, Insolvenzen, Kredite. Sie müssen die Bonität dokumentieren und bei schlechter Bonität den Kredit ablehnen oder höhere Zinsen/Sicherheiten verlangen. Heute üben Sie 10 Bonitätsprüfungen mit unterschiedlichen Schufa-Scores und Einkommenssituationen.`,
    extendedTheory: `**Übungsaufgaben: Bonitätsprüfung und Schufa im Detail:**

**Übung 1: Sehr gute Bonität**
- Einkommen: 5.500 €/Monat (unbefristet, Beamter)
- Ausgaben: 2.800 €/Monat
- Eigenkapital: 120.000 €
- Schufa-Score: 98%
- Negativmerkmale: Keine
- **Bewertung:** Sehr gute Bonität, Kredit problemlos möglich

**Übung 2: Gute Bonität**
- Einkommen: 4.200 €/Monat (unbefristet, Angestellter)
- Ausgaben: 2.500 €/Monat
- Eigenkapital: 80.000 €
- Schufa-Score: 93%
- Negativmerkmale: 1 laufender Ratenkredit (200 €/Monat)
- **Bewertung:** Gute Bonität, Kredit möglich (Ratenkredit berücksichtigen)

**Übung 3: Befriedigende Bonität**
- Einkommen: 3.500 €/Monat (unbefristet, Angestellter)
- Ausgaben: 2.200 €/Monat
- Eigenkapital: 50.000 €
- Schufa-Score: 85%
- Negativmerkmale: 2 laufende Ratenkredite (insgesamt 350 €/Monat)
- **Bewertung:** Befriedigende Bonität, Kredit möglich mit höherem Zinssatz oder Ablösung der Ratenkredite

**Übung 4: Schlechte Bonität**
- Einkommen: 2.800 €/Monat (befristet, Angestellter)
- Ausgaben: 2.000 €/Monat
- Eigenkapital: 20.000 €
- Schufa-Score: 75%
- Negativmerkmale: 1 Zahlungsverzug (vor 2 Jahren), 3 laufende Ratenkredite (500 €/Monat)
- **Bewertung:** Schlechte Bonität, Kredit schwierig (hoher Zinssatz, hohe Sicherheiten, Ablösung Ratenkredite)

**Übung 5: Sehr schlechte Bonität**
- Einkommen: 2.200 €/Monat (befristet, Angestellter)
- Ausgaben: 1.800 €/Monat
- Eigenkapital: 10.000 €
- Schufa-Score: 65%
- Negativmerkmale: 2 Mahnbescheide, 1 Insolvenz (vor 5 Jahren)
- **Bewertung:** Sehr schlechte Bonität, Kredit nicht möglich

**Übung 6: Selbstständiger**
- Einkommen: 4.800 €/Monat (Durchschnitt 3 Jahre)
- Ausgaben: 2.500 €/Monat
- Eigenkapital: 100.000 €
- Schufa-Score: 90%
- Negativmerkmale: Keine
- **Bewertung:** Gute Bonität, Kredit möglich (Selbstständige: höhere Anforderungen, 3 Jahre Steuerbescheide)

**Übung 7: Rentner**
- Einkommen: 2.500 €/Monat (Rente)
- Ausgaben: 1.500 €/Monat
- Eigenkapital: 80.000 €
- Schufa-Score: 95%
- Negativmerkmale: Keine
- Alter: 68 Jahre
- **Bewertung:** Gute Bonität, aber Alter kritisch (Laufzeit max. 10-15 Jahre, Risikolebensversicherung teuer)

**Übung 8: Berufseinsteiger**
- Einkommen: 2.800 €/Monat (unbefristet, Angestellter seit 6 Monaten)
- Ausgaben: 1.600 €/Monat
- Eigenkapital: 30.000 €
- Schufa-Score: 92%
- Negativmerkmale: Keine
- **Bewertung:** Gute Bonität, aber kurze Beschäftigungsdauer (Probezeit abwarten, höheres Eigenkapital empfohlen)

**Übung 9: Alleinerziehend**
- Einkommen: 3.200 €/Monat + 250 € Kindergeld
- Ausgaben: 2.500 €/Monat
- Eigenkapital: 40.000 €
- Schufa-Score: 88%
- Negativmerkmale: 1 laufender Ratenkredit (150 €/Monat)
- **Bewertung:** Befriedigende Bonität, Kredit möglich (verfügbares Einkommen knapp, Ratenkredit ablösen)

**Übung 10: Doppelverdiener**
- Einkommen: 5.000 € (Partner 1) + 3.500 € (Partner 2) = 8.500 €/Monat
- Ausgaben: 4.000 €/Monat
- Eigenkapital: 150.000 €
- Schufa-Score: 96% (Partner 1), 94% (Partner 2)
- Negativmerkmale: Keine
- **Bewertung:** Sehr gute Bonität, Kredit problemlos möglich

---

**Schufa-Score-Interpretation:**

**>95%:** Sehr gute Bonität
- Kredit problemlos möglich
- Günstigste Zinsen
- Keine zusätzlichen Sicherheiten

**90-95%:** Gute Bonität
- Kredit möglich
- Normale Zinsen
- Standardsicherheiten

**80-90%:** Befriedigende Bonität
- Kredit möglich mit Einschränkungen
- Höhere Zinsen
- Zusätzliche Sicherheiten (z.B. Bürgschaft)

**<80%:** Schlechte Bonität
- Kredit schwierig oder nicht möglich
- Sehr hohe Zinsen
- Hohe Sicherheiten
- Ablösung bestehender Kredite erforderlich

---

**Negativmerkmale:**

**Zahlungsverzug:**
- Schufa-Eintrag für 3 Jahre
- Reduziert Score um 5-10 Punkte

**Mahnbescheid:**
- Schufa-Eintrag für 3 Jahre
- Reduziert Score um 10-20 Punkte

**Insolvenz:**
- Schufa-Eintrag für 6 Jahre
- Reduziert Score um 30-50 Punkte
- Kredit meist nicht möglich

**Laufende Kredite:**
- Reduzieren verfügbares Einkommen
- Reduzieren Score um 2-5 Punkte pro Kredit

---

**Einkommensprüfung:**

**Angestellte:**
- 3 aktuelle Gehaltsabrechnungen
- Arbeitsvertrag (unbefristet bevorzugt)
- Probezeit abgeschlossen

**Selbstständige:**
- 3 Jahre Steuerbescheide
- BWA (Betriebswirtschaftliche Auswertung)
- Einnahmen-Überschuss-Rechnung

**Rentner:**
- Rentenbescheid
- Kontoauszüge (3 Monate)

**Beamte:**
- Besoldungsmitteilung
- Ernennungsurkunde

---

**Ausgabenprüfung:**

**Lebenshaltungskosten:**
- Single: 800-1.200 €/Monat
- Paar: 1.500-2.200 €/Monat
- Familie (2 Kinder): 2.500-3.500 €/Monat

**Weitere Ausgaben:**
- Pkw: 200-500 €/Monat
- Versicherungen: 100-300 €/Monat
- Freizeit: 200-500 €/Monat
- Rücklagen: 200-500 €/Monat

---

**Vermögensprüfung:**

**Eigenkapital:**
- Mindestens 20% der Gesamtkosten
- Besser: 30-40%

**Rücklagen:**
- Mindestens 3 Monatsraten
- Besser: 6 Monatsraten
- Zusätzlich: 1% Immobilienwert/Jahr für Instandhaltung

**Weitere Vermögenswerte:**
- Sparguthaben
- Wertpapiere
- Lebensversicherungen
- Immobilien`,
    law: [
      "§ 18a KWG (Kreditwürdigkeitsprüfung)",
      "§ 505 BGB (Kreditwürdigkeitsprüfung)",
      "§ 511 BGB (Beratungs- und Dokumentationspflichten)",
      "BDSG (Bundesdatenschutzgesetz - Schufa)"
    ],
    practice: `**Praxisfall 1: Bonitätsprüfung**

Ein Kunde (35 Jahre, Angestellter) beantragt ein Darlehen über 320.000 €. Nettoeinkommen: 4.200 €/Monat (unbefristet). Ausgaben: 2.300 €/Monat. Eigenkapital: 80.000 €. Schufa-Score: 91%. Negativmerkmale: 1 laufender Ratenkredit (180 €/Monat).

**Aufgaben:**
1. Prüfen Sie das Einkommen (ausreichend?)
2. Prüfen Sie die Ausgaben (realistisch?)
3. Prüfen Sie das Eigenkapital (ausreichend?)
4. Bewerten Sie den Schufa-Score
5. Bewerten Sie die Gesamtbonität
6. Empfehlung: Kredit möglich? Bedingungen?

---

**Praxisfall 2: Schlechte Bonität**

Ein Kunde (42 Jahre, Angestellter) beantragt ein Darlehen über 280.000 €. Nettoeinkommen: 3.500 €/Monat (unbefristet). Ausgaben: 2.200 €/Monat. Eigenkapital: 40.000 €. Schufa-Score: 78%. Negativmerkmale: 1 Zahlungsverzug (vor 1 Jahr), 2 laufende Ratenkredite (400 €/Monat).

**Aufgaben:**
1. Bewerten Sie die Bonität
2. Welche Probleme sehen Sie?
3. Welche Lösungen schlagen Sie vor?
4. Ist der Kredit möglich?
5. Welche Bedingungen würden Sie stellen?

---

**Praxisfall 3: Selbstständiger**

Ein Kunde (45 Jahre, Selbstständiger) beantragt ein Darlehen über 400.000 €. Durchschnittseinkommen (3 Jahre): 5.200 €/Monat. Ausgaben: 2.800 €/Monat. Eigenkapital: 120.000 €. Schufa-Score: 89%. Negativmerkmale: Keine.

**Aufgaben:**
1. Welche Unterlagen benötigen Sie?
2. Bewerten Sie die Bonität
3. Welche Besonderheiten gelten für Selbstständige?
4. Ist der Kredit möglich?
5. Welche Bedingungen würden Sie stellen?`,
    task: `**Aufgabe 1: Schufa-Score bewerten**

Bewerten Sie die Bonität:
- Schufa-Score: 87%
- Negativmerkmale: 1 laufender Ratenkredit
- **Bewertung:** ?

---

**Aufgabe 2: Verfügbares Einkommen berechnen**

Berechnen Sie das verfügbare Einkommen:
- Nettoeinkommen: 4.500 €/Monat
- Ausgaben: 2.400 €/Monat
- Laufende Ratenkredite: 250 €/Monat
- **Verfügbares Einkommen:** ?

---

**Aufgabe 3: Eigenkapital prüfen**

Prüfen Sie das Eigenkapital:
- Kaufpreis: 360.000 €
- Nebenkosten: 10%
- Eigenkapital: 70.000 €
- **Eigenkapitalquote:** ?
- **Ausreichend (mindestens 20%):** ?`,
    solution: `**Lösung Praxisfall 1:**
1. Einkommen: 4.200 € ausreichend für 320.000 € Darlehen
2. Ausgaben: 2.300 € realistisch (+ 180 € Ratenkredit = 2.480 €)
3. Eigenkapital: 80.000 € = 22% (ausreichend bei 360.000 € Gesamtkosten)
4. Schufa-Score: 91% = Gute Bonität
5. Gesamtbonität: Gut (ausreichendes Einkommen, Eigenkapital, guter Schufa-Score)
6. Empfehlung: Kredit möglich, Ratenkredit ablösen (erhöht verfügbares Einkommen)

**Lösung Praxisfall 2:**
1. Bonität: Befriedigend bis schlecht (Schufa 78%, Zahlungsverzug, hohe Ratenkredite)
2. Probleme: Schlechter Schufa-Score, Zahlungsverzug, hohe Ratenkredite (400 €/Monat), niedriges Eigenkapital (14%)
3. Lösungen: Ratenkredite ablösen, mehr Eigenkapital ansparen, Zahlungsverzug erklären
4. Kredit: Schwierig, nur mit höherem Zinssatz oder höherem Eigenkapital
5. Bedingungen: Ablösung Ratenkredite, Eigenkapital erhöhen auf 30%, höherer Zinssatz, zusätzliche Sicherheiten

**Lösung Praxisfall 3:**
1. Unterlagen: 3 Jahre Steuerbescheide, BWA, Einnahmen-Überschuss-Rechnung, Kontoauszüge
2. Bonität: Gut (ausreichendes Einkommen, hohes Eigenkapital, guter Schufa-Score)
3. Besonderheiten: Höhere Anforderungen (3 Jahre Steuerbescheide), Einkommen schwankend, höheres Eigenkapital empfohlen (30%)
4. Kredit: Möglich
5. Bedingungen: 3 Jahre Steuerbescheide, Eigenkapital 30% (120.000 €), normale Zinsen

**Lösung Aufgabe 1:**
- Bewertung: Befriedigende Bonität (87% = befriedigend, 1 laufender Kredit reduziert Score)

**Lösung Aufgabe 2:**
- Verfügbares Einkommen: 4.500 € - 2.400 € - 250 € = 1.850 €

**Lösung Aufgabe 3:**
- Eigenkapitalquote: 70.000 € / (360.000 € + 36.000 €) = 17,7%
- Ausreichend: Nein (< 20%), mehr Eigenkapital erforderlich`,
    type: "Prüfungsvorbereitung"
  },

  day_24: {
    title: "Übungsaufgaben: Beratungsprotokoll und Dokumentation",
    theory: `Das Beratungsprotokoll ist gesetzlich vorgeschrieben (§ 511 BGB) und muss alle wichtigen Beratungsinhalte dokumentieren. **Pflichtangaben:** Kundendaten, finanzielle Situation, Bedarfsanalyse, Produktempfehlung, Risikoaufklärung, Unterschrift. Das Protokoll muss **10 Jahre aufbewahrt** werden. Es dient als Nachweis der ordnungsgemäßen Beratung und schützt Sie vor Haftungsansprüchen. **Wichtig:** Protokoll vor Vertragsabschluss erstellen, Kunde muss Protokoll erhalten (Kopie), Protokoll muss verständlich und vollständig sein. Heute üben Sie 10 Beratungsprotokolle mit unterschiedlichen Kundensituationen und lernen, wie Sie Risiken aufklären und Produktempfehlungen begründen.`,
    extendedTheory: `**Übungsaufgaben: Beratungsprotokoll und Dokumentation im Detail:**

**Muster-Beratungsprotokoll:**

---

**BERATUNGSPROTOKOLL IMMOBILIARDARLEHENSVERMITTLUNG**

**Datum:** 15.03.2026  
**Berater:** Max Mustermann, Darlehensvermittler §34i GewO  
**Kunde:** Herr/Frau Beispiel

---

**1. KUNDENDATEN**

**Name:** Beispiel, Max  
**Geburtsdatum:** 15.05.1985  
**Adresse:** Musterstraße 123, 12345 Musterstadt  
**Telefon:** 0123/456789  
**E-Mail:** max.beispiel@email.de  
**Beruf:** Angestellter (unbefristet)  
**Familienstand:** Verheiratet, 2 Kinder

---

**2. FINANZIELLE SITUATION**

**Einkommen:**
- Nettoeinkommen Kunde: 4.500 €/Monat
- Nettoeinkommen Ehepartner: 2.500 €/Monat
- Kindergeld: 500 €/Monat
- **Gesamteinkommen:** 7.500 €/Monat

**Ausgaben:**
- Lebenshaltung: 3.000 €/Monat
- Pkw: 400 €/Monat
- Versicherungen: 250 €/Monat
- Freizeit: 500 €/Monat
- Rücklagen: 300 €/Monat
- **Gesamtausgaben:** 4.450 €/Monat

**Verfügbares Einkommen:** 3.050 €/Monat  
**Maximale Darlehensrate (20% Puffer):** 2.542 €/Monat

**Eigenkapital:**
- Sparguthaben: 80.000 €
- Wertpapiere: 20.000 €
- **Gesamtes Eigenkapital:** 100.000 €

**Verbindlichkeiten:**
- Keine laufenden Kredite

**Schufa-Auskunft:**
- Schufa-Score: 95%
- Negativmerkmale: Keine

---

**3. BEDARFSANALYSE**

**Finanzierungszweck:** Kauf einer Eigentumswohnung  
**Immobilie:** Eigentumswohnung, 3 Zimmer, 85 m², Baujahr 2015  
**Kaufpreis:** 400.000 €  
**Nebenkosten (10%):** 40.000 €  
**Gesamtkosten:** 440.000 €

**Darlehensbedarf:** 440.000 € - 100.000 € = 340.000 €

**Wünsche des Kunden:**
- Lange Zinsbindung (15 Jahre)
- Sondertilgungsrecht (mindestens 5% p.a.)
- Tilgungssatzwechsel möglich
- Schnelle Entschuldung (hohe Tilgung)

**Risikobereitschaft:** Gering (Sicherheit wichtiger als niedrigster Zins)

---

**4. PRODUKTEMPFEHLUNG**

**Empfohlenes Produkt:** Annuitätendarlehen

**Konditionen:**
- Darlehensbetrag: 340.000 €
- Sollzins: 3,50% p.a.
- Effektivzins: 3,55% p.a.
- Zinsbindung: 15 Jahre
- Tilgung: 2,5% p.a.
- Sondertilgung: 5% p.a. (kostenlos)
- Tilgungssatzwechsel: 2× kostenlos
- Bereitstellungszinsen: 0,25% ab 6. Monat

**Monatliche Rate:** 340.000 € × (3,50% + 2,5%) / 12 = 1.700 €

**Begründung der Empfehlung:**
- Lange Zinsbindung (15 Jahre) entspricht Kundenwunsch nach Sicherheit
- Sondertilgungsrecht (5% p.a.) ermöglicht schnellere Entschuldung
- Tilgungssatzwechsel bietet Flexibilität
- Monatliche Rate (1.700 €) liegt deutlich unter maximaler Rate (2.542 €)
- Eigenkapital (100.000 €) = 23% der Gesamtkosten (ausreichend)

---

**5. KONDITIONSVERGLEICH**

**Bank A (empfohlen):**
- Effektivzins: 3,55%
- Zinsbindung: 15 Jahre
- Sondertilgung: 5% p.a.
- Monatliche Rate: 1.700 €

**Bank B:**
- Effektivzins: 3,68%
- Zinsbindung: 15 Jahre
- Sondertilgung: 10% p.a.
- Monatliche Rate: 1.737 €

**Bank C:**
- Effektivzins: 3,48%
- Zinsbindung: 10 Jahre
- Sondertilgung: 5% p.a.
- Monatliche Rate: 1.700 €

**Empfehlung:** Bank A (günstigster Effektivzins bei 15 Jahren Zinsbindung)

---

**6. RISIKOAUFKLÄRUNG**

**Zinsänderungsrisiko:**
- Nach 15 Jahren kann Zinssatz steigen
- Beispiel: Bei Zinsanstieg auf 5% steigt Rate von 1.700 € auf ca. 2.000 €
- Absicherung: Lange Zinsbindung (15 Jahre), Forward-Darlehen möglich

**Zahlungsunfähigkeitsrisiko:**
- Bei Jobverlust, Krankheit kann Rate nicht mehr gezahlt werden
- Folge: Kündigung, Zwangsversteigerung
- Absicherung: Risikolebensversicherung, Berufsunfähigkeitsversicherung, Rücklagen

**Wertverlustrisiko:**
- Immobilie kann an Wert verlieren
- Folge: Eigenkapital sinkt
- Absicherung: Gute Lage, hochwertige Bausubstanz, ausreichendes Eigenkapital

**Empfohlene Absicherungen:**
- Risikolebensversicherung: 340.000 € (fallend), ca. 40 €/Monat
- Berufsunfähigkeitsversicherung: 1.700 €/Monat Rente, ca. 90 €/Monat
- Rücklagen: 10.200 € (6 Monatsraten)

---

**7. GESAMTKOSTEN**

**Darlehensbetrag:** 340.000 €  
**Monatliche Rate:** 1.700 €  
**Laufzeit:** ca. 30 Jahre  
**Gesamtzinsen:** ca. 180.000 €  
**Gesamtkosten:** 520.000 €

---

**8. UNTERSCHRIFT**

**Berater:**  
Ich bestätige, dass ich den Kunden umfassend beraten und über alle Risiken aufgeklärt habe.

_________________________  
Max Mustermann, Datum

**Kunde:**  
Ich bestätige, dass ich das Beratungsprotokoll erhalten und verstanden habe.

_________________________  
Max Beispiel, Datum

---

**Aufbewahrung:** 10 Jahre (§ 511 BGB)

---

**Übung 1: Beratungsprotokoll für Single**

**Kunde:** Frau Müller, 32 Jahre, Angestellte  
**Einkommen:** 3.800 €/Monat  
**Ausgaben:** 2.100 €/Monat  
**Eigenkapital:** 60.000 €  
**Schufa-Score:** 93%  
**Finanzierungszweck:** Kauf Eigentumswohnung 280.000 €

**Aufgabe:** Erstellen Sie ein vollständiges Beratungsprotokoll

---

**Übung 2: Beratungsprotokoll für Familie**

**Kunde:** Familie Schmidt, 2 Kinder  
**Einkommen:** 6.500 €/Monat  
**Ausgaben:** 4.200 €/Monat  
**Eigenkapital:** 120.000 €  
**Schufa-Score:** 96%  
**Finanzierungszweck:** Kauf Einfamilienhaus 500.000 €

**Aufgabe:** Erstellen Sie ein vollständiges Beratungsprotokoll

---

**Übung 3: Beratungsprotokoll für Selbstständigen**

**Kunde:** Herr Weber, 45 Jahre, Selbstständiger  
**Einkommen:** 5.200 €/Monat (Durchschnitt 3 Jahre)  
**Ausgaben:** 2.800 €/Monat  
**Eigenkapital:** 150.000 €  
**Schufa-Score:** 89%  
**Finanzierungszweck:** Kauf Mehrfamilienhaus 600.000 €

**Aufgabe:** Erstellen Sie ein vollständiges Beratungsprotokoll

---

**Übung 4: Beratungsprotokoll für Rentner**

**Kunde:** Herr Fischer, 68 Jahre, Rentner  
**Einkommen:** 2.500 €/Monat  
**Ausgaben:** 1.500 €/Monat  
**Eigenkapital:** 100.000 €  
**Schufa-Score:** 95%  
**Finanzierungszweck:** Kauf Eigentumswohnung 300.000 €

**Aufgabe:** Erstellen Sie ein vollständiges Beratungsprotokoll

---

**Übung 5: Beratungsprotokoll bei schlechter Bonität**

**Kunde:** Herr Klein, 38 Jahre, Angestellter  
**Einkommen:** 3.200 €/Monat  
**Ausgaben:** 2.400 €/Monat  
**Eigenkapital:** 40.000 €  
**Schufa-Score:** 76%  
**Negativmerkmale:** 1 Zahlungsverzug, 2 Ratenkredite (350 €/Monat)  
**Finanzierungszweck:** Kauf Eigentumswohnung 250.000 €

**Aufgabe:** Erstellen Sie ein vollständiges Beratungsprotokoll und erklären Sie, warum der Kredit schwierig ist`,
    law: [
      "§ 511 BGB (Beratungs- und Dokumentationspflichten)",
      "§ 34i GewO (Erlaubnispflicht, Dokumentation)",
      "§ 18a KWG (Kreditwürdigkeitsprüfung)"
    ],
    practice: `**Praxisfall 1: Vollständiges Beratungsprotokoll**

Ein Kunde (40 Jahre, verheiratet, 1 Kind) möchte eine Eigentumswohnung für 350.000 € kaufen. Nettoeinkommen: 5.000 € (Kunde) + 2.000 € (Ehepartner) = 7.000 €/Monat. Ausgaben: 3.500 €/Monat. Eigenkapital: 90.000 €. Schufa-Score: 94%.

**Aufgaben:**
1. Erstellen Sie ein vollständiges Beratungsprotokoll
2. Berechnen Sie die maximale Darlehensrate
3. Empfehlen Sie ein Darlehensprodukt
4. Klären Sie über Risiken auf
5. Empfehlen Sie Absicherungen

---

**Praxisfall 2: Risikoaufklärung**

Ein Kunde möchte ein Darlehen über 400.000 € aufnehmen. Monatliche Rate: 2.000 €. Er ist Hauptverdiener (5.500 €/Monat), Ehefrau arbeitet Teilzeit (1.500 €/Monat).

**Aufgaben:**
1. Welche Risiken müssen Sie aufklären?
2. Wie erklären Sie das Zinsänderungsrisiko?
3. Wie erklären Sie das Zahlungsunfähigkeitsrisiko?
4. Welche Absicherungen empfehlen Sie?
5. Wie dokumentieren Sie die Risikoaufklärung?

---

**Praxisfall 3: Produktempfehlung begründen**

Ein Kunde hat 3 Angebote erhalten:
- Bank A: 3,50% Effektivzins, 10 Jahre Zinsbindung, 5% Sondertilgung
- Bank B: 3,65% Effektivzins, 15 Jahre Zinsbindung, 10% Sondertilgung
- Bank C: 3,45% Effektivzins, 10 Jahre Zinsbindung, 5% Sondertilgung

Sie empfehlen Bank B.

**Aufgaben:**
1. Begründen Sie die Empfehlung
2. Erklären Sie die Vorteile von Bank B
3. Erklären Sie die Nachteile von Bank A und C
4. Wie dokumentieren Sie die Empfehlung?`,
    task: `**Aufgabe 1: Pflichtangaben Beratungsprotokoll**

Nennen Sie die Pflichtangaben eines Beratungsprotokolls (mindestens 6):

---

**Aufgabe 2: Aufbewahrungsfrist**

Wie lange muss ein Beratungsprotokoll aufbewahrt werden?

---

**Aufgabe 3: Risikoaufklärung**

Nennen Sie 4 Risiken, über die Sie aufklären müssen:`,
    solution: `**Lösung Praxisfall 1:**
1. Beratungsprotokoll: Siehe Muster oben (Kundendaten, finanzielle Situation, Bedarfsanalyse, Produktempfehlung, Risikoaufklärung, Unterschrift)
2. Maximale Darlehensrate: (7.000 € - 3.500 €) / 1,2 = 2.917 €
3. Darlehensprodukt: Annuitätendarlehen 260.000 € (350.000 € + 35.000 € - 90.000 €), 3,50% Zinsen, 2% Tilgung, 15 Jahre Zinsbindung, monatliche Rate 1.192 €
4. Risiken: Zinsänderung, Zahlungsunfähigkeit, Wertverlust, Zwangsversteigerung
5. Absicherungen: Risikolebensversicherung 260.000 €, BU 1.200 €/Monat, Rücklagen 7.200 €

**Lösung Praxisfall 2:**
1. Risiken: Zinsänderung, Zahlungsunfähigkeit (Jobverlust, Krankheit, Tod), Wertverlust, Zwangsversteigerung
2. Zinsänderungsrisiko: "Nach 15 Jahren kann Zinssatz steigen. Beispiel: Bei Zinsanstieg auf 5% steigt Rate von 2.000 € auf 2.400 €. Absicherung: Lange Zinsbindung, Forward-Darlehen."
3. Zahlungsunfähigkeitsrisiko: "Bei Jobverlust oder Krankheit können Sie Rate nicht mehr zahlen. Folge: Kündigung, Zwangsversteigerung. Absicherung: Risikolebensversicherung, BU, Rücklagen."
4. Absicherungen: Risikolebensversicherung 400.000 €, BU 2.000 €/Monat, Rücklagen 12.000 €
5. Dokumentation: Im Beratungsprotokoll unter "Risikoaufklärung" alle Risiken und Absicherungen aufführen, Kunde unterschreibt

**Lösung Praxisfall 3:**
1. Begründung: "Bank B bietet längste Zinssicherheit (15 Jahre) und höchstes Sondertilgungsrecht (10% p.a.). Trotz höherem Effektivzins (+0,15%) bietet Bank B mehr Flexibilität und Sicherheit."
2. Vorteile Bank B: 15 Jahre Zinssicherheit, 10% Sondertilgung, schnellere Entschuldung möglich
3. Nachteile Bank A/C: Nur 10 Jahre Zinssicherheit (Zinsänderungsrisiko nach 10 Jahren), nur 5% Sondertilgung
4. Dokumentation: Im Beratungsprotokoll unter "Produktempfehlung" alle 3 Angebote aufführen, Empfehlung begründen, Kunde unterschreibt

**Lösung Aufgabe 1:**
1. Kundendaten
2. Finanzielle Situation
3. Bedarfsanalyse
4. Produktempfehlung
5. Risikoaufklärung
6. Unterschrift

**Lösung Aufgabe 2:**
- 10 Jahre (§ 511 BGB)

**Lösung Aufgabe 3:**
1. Zinsänderungsrisiko
2. Zahlungsunfähigkeitsrisiko
3. Wertverlustrisiko
4. Zwangsversteigerungsrisiko`,
    type: "Prüfungsvorbereitung"
  },

  day_25: {
    title: "Übungsaufgaben: Rechtsfälle und Gesetze",
    theory: `Rechtsfälle sind ein wichtiger Bestandteil der Sachkundeprüfung. Sie müssen Gesetze anwenden und Rechtsfragen beantworten können. **Wichtigste Gesetze:** §34i GewO (Erlaubnispflicht), § 491 BGB (Immobiliar-Verbraucherdarlehensvertrag), § 511 BGB (Beratungspflichten), § 489 BGB (Sonderkündigungsrecht), § 498 BGB (Kündigung bei Zahlungsverzug), GwG (Geldwäscheprävention), DSGVO (Datenschutz). **Typische Rechtsfälle:** Widerrufsrecht, Vorfälligkeitsentschädigung, Sonderkündigungsrecht, Beratungsfehler, Geldwäsche, Datenschutzverletzung. Heute üben Sie 10 Rechtsfälle mit Lösungen und lernen, wie Sie Gesetze richtig anwenden und Rechtsfragen strukturiert beantworten.`,
    extendedTheory: `**Übungsaufgaben: Rechtsfälle und Gesetze im Detail:**

**Rechtsfall 1: Widerrufsrecht**

**Sachverhalt:**
Ein Kunde hat am 01.03.2026 einen Immobiliar-Verbraucherdarlehensvertrag über 300.000 € abgeschlossen. Die Widerrufsbelehrung war fehlerhaft. Am 20.03.2026 möchte er den Vertrag widerrufen.

**Fragen:**
1. Hat der Kunde ein Widerrufsrecht?
2. Wie lange beträgt die Widerrufsfrist?
3. Was passiert bei fehlerhafter Widerrufsbelehrung?
4. Welche Folgen hat der Widerruf?

**Lösung:**
1. Ja, der Kunde hat ein Widerrufsrecht (§ 495 BGB)
2. Widerrufsfrist: 14 Tage nach Vertragsschluss (bei korrekter Belehrung)
3. Bei fehlerhafter Belehrung: Widerrufsfrist verlängert sich auf 12 Monate + 14 Tage
4. Folgen: Vertrag wird rückabgewickelt, Kunde zahlt Nutzungsersatz (Zinsen), keine Vorfälligkeitsentschädigung

---

**Rechtsfall 2: Sonderkündigungsrecht nach 10 Jahren**

**Sachverhalt:**
Ein Kunde hat am 01.01.2016 ein Darlehen über 250.000 € mit 15 Jahren Zinsbindung (bis 2031) zu 2,5% p.a. abgeschlossen. Jetzt (2026) liegen die Zinsen bei 4,0% p.a. Er möchte das Darlehen vorzeitig kündigen.

**Fragen:**
1. Kann der Kunde das Darlehen kündigen?
2. Welche Frist muss er einhalten?
3. Muss er eine Vorfälligkeitsentschädigung zahlen?
4. Lohnt sich die Kündigung?

**Lösung:**
1. Ja, nach 10 Jahren Sonderkündigungsrecht (§ 489 BGB)
2. Frist: 6 Monate
3. Nein, keine Vorfälligkeitsentschädigung bei Sonderkündigungsrecht
4. Nein, lohnt sich nicht: Aktueller Zins 2,5% < Marktzins 4,0% → Darlehen weiterlaufen lassen

---

**Rechtsfall 3: Vorfälligkeitsentschädigung**

**Sachverhalt:**
Ein Kunde möchte sein Darlehen vorzeitig zurückzahlen. Restschuld: 200.000 €, Vertragszins: 3,5% p.a., Wiederanlagezins: 2,0% p.a., Restlaufzeit: 5 Jahre. Die Bank verlangt 15.000 € Vorfälligkeitsentschädigung.

**Fragen:**
1. Ist die Vorfälligkeitsentschädigung rechtmäßig?
2. Wie berechnet sich die Vorfälligkeitsentschädigung?
3. Kann der Kunde die Entschädigung umgehen?
4. Welche Alternativen hat der Kunde?

**Lösung:**
1. Ja, rechtmäßig (§ 502 BGB)
2. Berechnung: (3,5% - 2,0%) × 200.000 € × 5 = 15.000 €
3. Umgehen durch: Sonderkündigungsrecht nach 10 Jahren, berechtigtes Interesse (Verkauf)
4. Alternativen: Sondertilgung nutzen, Darlehen weiterlaufen lassen, verhandeln (Rabatt)

---

**Rechtsfall 4: Beratungsfehler**

**Sachverhalt:**
Ein Berater hat einem Kunden ein Darlehen mit 10 Jahren Zinsbindung empfohlen, obwohl der Kunde ausdrücklich 15 Jahre Zinssicherheit wünschte. Nach 10 Jahren steigen die Zinsen von 3,0% auf 5,0% p.a. Der Kunde verlangt Schadensersatz.

**Fragen:**
1. Hat der Berater einen Fehler gemacht?
2. Welche Pflichten hat der Berater verletzt?
3. Welchen Schaden hat der Kunde?
4. Muss der Berater Schadensersatz zahlen?

**Lösung:**
1. Ja, Beratungsfehler (Kundenwunsch nicht berücksichtigt)
2. Verletzt: § 511 BGB (Beratungspflichten), Bedarfsanalyse fehlerhaft
3. Schaden: Mehrkosten durch höhere Zinsen (2% × Restschuld × Laufzeit)
4. Ja, Berater muss Schadensersatz zahlen (Differenz zwischen 3% und 5% Zinsen)

---

**Rechtsfall 5: Geldwäsche**

**Sachverhalt:**
Ein Kunde möchte ein Darlehen über 500.000 € aufnehmen. Er kann die Herkunft seines Eigenkapitals (200.000 € Bargeld) nicht nachweisen. Der Berater hat Zweifel.

**Fragen:**
1. Was muss der Berater tun?
2. Welche Pflichten hat er nach dem GwG?
3. Muss er eine Verdachtsmeldung abgeben?
4. Was passiert, wenn er die Meldung unterlässt?

**Lösung:**
1. Berater muss Herkunft der Mittel klären (§ 11 Abs. 5 GwG)
2. Pflichten: Identifizierung, Herkunft klären, Verdachtsmeldung bei Zweifel
3. Ja, Verdachtsmeldung an FIU (§ 43 GwG)
4. Unterlassen: Ordnungswidrigkeit, Geldstrafe bis 100.000 €, Haftung

---

**Rechtsfall 6: Datenschutzverletzung**

**Sachverhalt:**
Ein Berater hat versehentlich Kundendaten (Name, Einkommen, Schufa-Score) an einen falschen Empfänger per E-Mail geschickt. Der Kunde erfährt davon und beschwert sich.

**Fragen:**
1. Liegt eine Datenschutzverletzung vor?
2. Was muss der Berater tun?
3. Welche Folgen drohen?
4. Wie kann der Berater solche Fehler vermeiden?

**Lösung:**
1. Ja, Datenschutzverletzung (Art. 32 DSGVO - Verletzung der Vertraulichkeit)
2. Berater muss: Datenpanne melden (Art. 33 DSGVO), Kunden informieren (Art. 34 DSGVO), Maßnahmen ergreifen
3. Folgen: Bußgeld bis 20 Mio. € oder 4% des Jahresumsatzes, Schadensersatz an Kunden
4. Vermeiden: Verschlüsselung, Vier-Augen-Prinzip, Schulung

---

**Rechtsfall 7: Kündigung bei Zahlungsverzug**

**Sachverhalt:**
Ein Kunde zahlt 3 Monate lang keine Darlehensraten (insgesamt 4.500 €). Die Bank kündigt das Darlehen und droht mit Zwangsversteigerung.

**Fragen:**
1. Ist die Kündigung rechtmäßig?
2. Welche Voraussetzungen müssen erfüllt sein?
3. Welche Folgen hat die Kündigung?
4. Kann der Kunde die Kündigung abwenden?

**Lösung:**
1. Ja, rechtmäßig (§ 498 BGB)
2. Voraussetzungen: Zahlungsverzug mindestens 2 Monatsraten, Mahnung, Fristsetzung
3. Folgen: Gesamtforderung sofort fällig, Zwangsversteigerung, Schufa-Eintrag
4. Abwenden: Rückstände nachzahlen, Stundung beantragen, Ratenzahlung vereinbaren

---

**Rechtsfall 8: Fehlerhafte ESIS-Merkblatt**

**Sachverhalt:**
Ein Kunde hat ein ESIS-Merkblatt erhalten, in dem der Effektivzins falsch angegeben war (3,0% statt 3,5%). Er hat den Vertrag unterschrieben. Jetzt möchte er den Vertrag widerrufen.

**Fragen:**
1. Ist das ESIS-Merkblatt fehlerhaft?
2. Welche Folgen hat der Fehler?
3. Kann der Kunde den Vertrag widerrufen?
4. Welche Rechte hat der Kunde?

**Lösung:**
1. Ja, fehlerhaft (§ 491a BGB - Effektivzins falsch)
2. Folgen: Widerrufsrecht verlängert sich (12 Monate + 14 Tage)
3. Ja, Kunde kann widerrufen (§ 495 BGB)
4. Rechte: Widerruf, Schadensersatz (Differenz zwischen 3,0% und 3,5%)

---

**Rechtsfall 9: Verschwiegenheitspflicht**

**Sachverhalt:**
Ein Berater erzählt einem Freund, dass ein gemeinsamer Bekannter ein Darlehen über 500.000 € aufgenommen hat. Der Bekannte erfährt davon und beschwert sich.

**Fragen:**
1. Hat der Berater die Verschwiegenheitspflicht verletzt?
2. Welche Folgen drohen?
3. Welche Rechte hat der Kunde?
4. Wie kann der Berater solche Fehler vermeiden?

**Lösung:**
1. Ja, Verschwiegenheitspflicht verletzt (§ 34i GewO, DSGVO)
2. Folgen: Bußgeld, Schadensersatz, Entzug der Erlaubnis
3. Rechte: Schadensersatz, Beschwerde bei Aufsichtsbehörde
4. Vermeiden: Keine Kundendaten weitergeben, Schulung

---

**Rechtsfall 10: Tilgungsfalle**

**Sachverhalt:**
Ein Kunde hat ein Darlehen über 300.000 € mit 1% Tilgung abgeschlossen. Nach 10 Jahren beträgt die Restschuld noch 270.000 €. Er ist frustriert, weil die Entschuldung so langsam vorangeht.

**Fragen:**
1. Was ist eine Tilgungsfalle?
2. Hätte der Berater den Kunden aufklären müssen?
3. Welche Empfehlung hätte der Berater geben sollen?
4. Welche Optionen hat der Kunde jetzt?

**Lösung:**
1. Tilgungsfalle: Niedrige Tilgung (1%) führt zu sehr langer Laufzeit (>50 Jahre)
2. Ja, Berater hätte aufklären müssen (§ 511 BGB - Risikoaufklärung)
3. Empfehlung: Mindestens 2% Tilgung, besser 3%
4. Optionen: Tilgungssatzwechsel (Erhöhung auf 3%), Sondertilgung nutzen, Anschlussfinanzierung mit höherer Tilgung`,
    law: [
      "§34i GewO (Erlaubnispflicht)",
      "§ 491 BGB (Immobiliar-Verbraucherdarlehensvertrag)",
      "§ 495 BGB (Widerrufsrecht)",
      "§ 489 BGB (Sonderkündigungsrecht)",
      "§ 498 BGB (Kündigung bei Zahlungsverzug)",
      "§ 502 BGB (Vorfälligkeitsentschädigung)",
      "§ 511 BGB (Beratungspflichten)",
      "GwG (Geldwäschegesetz)",
      "DSGVO (Datenschutz-Grundverordnung)"
    ],
    practice: `**Praxisfall 1: Widerrufsrecht**

Ein Kunde hat am 10.03.2026 einen Darlehensvertrag über 350.000 € abgeschlossen. Die Widerrufsbelehrung war korrekt. Am 25.03.2026 möchte er widerrufen.

**Fragen:**
1. Kann er noch widerrufen?
2. Welche Frist gilt?
3. Was passiert bei Widerruf?
4. Muss er Vorfälligkeitsentschädigung zahlen?

---

**Praxisfall 2: Sonderkündigungsrecht**

Ein Kunde hat am 01.01.2014 ein Darlehen über 400.000 € mit 20 Jahren Zinsbindung (bis 2034) zu 3,5% p.a. abgeschlossen. Jetzt (2026) möchte er kündigen.

**Fragen:**
1. Kann er kündigen?
2. Welche Frist muss er einhalten?
3. Muss er Vorfälligkeitsentschädigung zahlen?
4. Wann kann er frühestens kündigen?

---

**Praxisfall 3: Beratungsfehler**

Ein Berater hat einem Kunden ein Darlehen ohne Sondertilgungsrecht empfohlen, obwohl der Kunde ausdrücklich Sondertilgung wünschte. Der Kunde erhält eine Erbschaft (50.000 €) und kann nicht sondertilgen.

**Fragen:**
1. Hat der Berater einen Fehler gemacht?
2. Welche Pflichten hat er verletzt?
3. Welchen Schaden hat der Kunde?
4. Muss der Berater Schadensersatz zahlen?`,
    task: `**Aufgabe 1: Widerrufsfrist**

Wie lange beträgt die Widerrufsfrist bei einem Immobiliar-Verbraucherdarlehensvertrag?

---

**Aufgabe 2: Sonderkündigungsrecht**

Nach wie vielen Jahren kann ein Kunde sein Darlehen mit 6 Monaten Frist kündigen?

---

**Aufgabe 3: Vorfälligkeitsentschädigung**

Berechnen Sie die Vorfälligkeitsentschädigung:
- Restschuld: 180.000 €
- Vertragszins: 3,0% p.a.
- Wiederanlagezins: 1,5% p.a.
- Restlaufzeit: 7 Jahre
- **Vorfälligkeitsentschädigung:** ?`,
    solution: `**Lösung Praxisfall 1:**
1. Ja, kann noch widerrufen (innerhalb 14 Tage: 10.03. + 14 Tage = 24.03.)
2. Frist: 14 Tage nach Vertragsschluss (§ 495 BGB)
3. Bei Widerruf: Vertrag wird rückabgewickelt, Kunde zahlt Nutzungsersatz (Zinsen)
4. Nein, keine Vorfälligkeitsentschädigung bei Widerruf

**Lösung Praxisfall 2:**
1. Ja, kann kündigen (nach 10 Jahren Sonderkündigungsrecht, § 489 BGB)
2. Frist: 6 Monate
3. Nein, keine Vorfälligkeitsentschädigung bei Sonderkündigungsrecht
4. Frühestens: 01.01.2024 (10 Jahre nach Vertragsschluss) + 6 Monate Frist = 01.07.2024

**Lösung Praxisfall 3:**
1. Ja, Beratungsfehler (Kundenwunsch nicht berücksichtigt)
2. Verletzt: § 511 BGB (Bedarfsanalyse fehlerhaft)
3. Schaden: Entgangene Zinsersparnis durch Sondertilgung (50.000 € × 3,5% × Restlaufzeit)
4. Ja, Berater muss Schadensersatz zahlen (entgangene Zinsersparnis)

**Lösung Aufgabe 1:**
- Widerrufsfrist: 14 Tage nach Vertragsschluss (§ 495 BGB)

**Lösung Aufgabe 2:**
- Sonderkündigungsrecht: Nach 10 Jahren mit 6 Monaten Frist (§ 489 BGB)

**Lösung Aufgabe 3:**
- Vorfälligkeitsentschädigung: (3,0% - 1,5%) × 180.000 € × 7 = 18.900 €`,
    type: "Prüfungsvorbereitung"
  },

};
// Modul 5: Darlehensvermittlung §34i GewO
// Teil 6: Tage 26-30 (Prüfungsvorbereitung - Fallstudien)

export const contentDataModule5_34i_Part6: Record<string, {
  title: string;
  theory: string;
  extendedTheory?: string;
  law: string[];
  practice: string;
  task: string;
  solution?: string;
  type?: string;
}> = {

  day_26: {
    title: "Fallstudie: Erstberatung Eigenheimfinanzierung",
    theory: `Fallstudien simulieren realistische Kundenberatungen von A bis Z. Sie müssen alle Schritte durchführen: Kundengespräch, Bedarfsanalyse, Bonitätsprüfung, Konditionsvergleich, Produktempfehlung, Risikoaufklärung, Beratungsprotokoll. Heute bearbeiten Sie eine komplette Fallstudie: Ein junges Paar möchte erstmals eine Eigentumswohnung kaufen. Sie haben wenig Eigenkapital, aber gutes Einkommen. Ihre Aufgabe: Erstellen Sie eine vollständige Finanzierungsberatung mit allen erforderlichen Dokumenten und Berechnungen. Achten Sie auf realistische Annahmen, korrekte Berechnungen und vollständige Dokumentation.`,
    extendedTheory: `**Fallstudie: Erstberatung Eigenheimfinanzierung**

**AUSGANGSSITUATION:**

**Kunden:** Herr und Frau Jung (beide 30 Jahre)
**Familienstand:** Verheiratet, keine Kinder (geplant in 3 Jahren)
**Beruf:** Beide Angestellte (unbefristet, Probezeit abgeschlossen)

**Einkommen:**
- Herr Jung: 3.800 €/Monat netto
- Frau Jung: 2.600 €/Monat netto
- **Gesamteinkommen:** 6.400 €/Monat

**Ausgaben:**
- Aktuelle Miete: 1.200 €/Monat
- Lebenshaltung: 1.800 €/Monat
- 2× Pkw: 500 €/Monat
- Versicherungen: 220 €/Monat
- Freizeit: 600 €/Monat
- Sparen: 400 €/Monat
- **Gesamtausgaben:** 4.720 €/Monat

**Vermögen:**
- Sparguthaben: 45.000 €
- Bausparvertrag: 15.000 € (zuteilungsreif)
- **Gesamtes Eigenkapital:** 60.000 €

**Verbindlichkeiten:**
- Ratenkredit Pkw: 12.000 € Restschuld (250 €/Monat, noch 4 Jahre Laufzeit)

**Schufa-Auskunft:**
- Herr Jung: 94%
- Frau Jung: 96%
- Negativmerkmale: Keine

**Immobilienwunsch:**
- Eigentumswohnung, 3 Zimmer, 75 m²
- Lage: Stadtrand, gute Infrastruktur
- Baujahr: 2018
- **Kaufpreis:** 320.000 €

---

**SCHRITT 1: BEDARFSANALYSE**

**Finanzierungszweck:** Kauf Eigentumswohnung (Eigennutzung)

**Wünsche der Kunden:**
- Monatliche Rate ähnlich wie aktuelle Miete (ca. 1.200-1.400 €)
- Zinssicherheit (mindestens 10 Jahre)
- Flexibilität (Sondertilgung, Tilgungssatzwechsel)
- Schnelle Entschuldung (vor Rentenalter)

**Risikobereitschaft:** Mittel (Sicherheit wichtig, aber auch Flexibilität)

**Besonderheiten:**
- Kinderplanung in 3 Jahren (Frau Jung wird Teilzeit arbeiten)
- Einkommen wird sinken (ca. 1.500 € weniger)

---

**SCHRITT 2: FINANZIERUNGSPLANUNG**

**Gesamtkosten:**
- Kaufpreis: 320.000 €
- Grunderwerbsteuer (5%): 16.000 €
- Notar/Grundbuch (2%): 6.400 €
- Makler (0%): 0 € (privater Verkauf)
- **Gesamtkosten:** 342.400 €

**Eigenkapital:**
- Verfügbares Eigenkapital: 60.000 €
- **Eigenkapitalquote:** 60.000 € / 342.400 € = 17,5% (zu niedrig!)

**Darlehensbedarf:**
- Gesamtkosten: 342.400 €
- Eigenkapital: 60.000 €
- **Darlehensbedarf:** 282.400 €

**Problem:** Eigenkapital zu niedrig (< 20%)

**Lösungsoptionen:**
1. Mehr Eigenkapital ansparen (dauert 2-3 Jahre)
2. Günstigere Immobilie suchen (280.000 € statt 320.000 €)
3. Ratenkredit ablösen (spart 250 €/Monat, erhöht verfügbares Einkommen)
4. Finanzierung mit höherem Zinssatz (Risikozuschlag bei niedrigem Eigenkapital)

**Empfehlung:** Ratenkredit ablösen (12.000 € aus Eigenkapital), günstigere Immobilie suchen

---

**SCHRITT 3: HAUSHALTSRECHNUNG**

**Einnahmen:**
- Gesamteinkommen: 6.400 €/Monat

**Ausgaben (nach Kauf):**
- Lebenshaltung: 1.800 €/Monat
- 2× Pkw: 500 €/Monat
- Versicherungen: 220 €/Monat
- Freizeit: 600 €/Monat
- Hausgeld: 250 €/Monat (Wohnung)
- Instandhaltungsrücklage: 200 €/Monat
- Rücklagen: 300 €/Monat
- **Gesamtausgaben:** 3.870 €/Monat

**Verfügbares Einkommen:** 6.400 € - 3.870 € = 2.530 €/Monat

**Maximale Darlehensrate (20% Puffer):** 2.530 € / 1,2 = 2.108 €/Monat

**Problem:** Bei Kinderplanung sinkt Einkommen auf ca. 4.900 € (- 1.500 €)
- **Neues verfügbares Einkommen:** 4.900 € - 3.870 € = 1.030 €
- **Neue maximale Darlehensrate:** 1.030 € / 1,2 = 858 €/Monat

**Empfehlung:** Monatliche Rate maximal 1.200 € (damit auch bei Kinderplanung tragbar)

---

**SCHRITT 4: KONDITIONSVERGLEICH**

**Angepasste Finanzierung:**
- Günstigere Immobilie: 280.000 € (statt 320.000 €)
- Nebenkosten (10%): 28.000 €
- **Gesamtkosten:** 308.000 €
- Ratenkredit ablösen: 12.000 €
- **Verfügbares Eigenkapital:** 60.000 € - 12.000 € = 48.000 €
- **Darlehensbedarf:** 308.000 € - 48.000 € = 260.000 €
- **Eigenkapitalquote:** 48.000 € / 308.000 € = 15,6% (immer noch zu niedrig)

**Weitere Anpassung:**
- Bausparvertrag als Eigenkapital einsetzen: 15.000 €
- Eltern-Darlehen: 20.000 € (zinsfrei, Rückzahlung flexibel)
- **Gesamtes Eigenkapital:** 48.000 € + 20.000 € = 68.000 €
- **Darlehensbedarf:** 308.000 € - 68.000 € = 240.000 €
- **Eigenkapitalquote:** 68.000 € / 308.000 € = 22,1% (ausreichend!)

**Konditionsvergleich (3 Banken):**

**Bank A:**
- Darlehensbetrag: 240.000 €
- Sollzins: 3,60% p.a.
- Effektivzins: 3,65% p.a.
- Zinsbindung: 10 Jahre
- Tilgung: 2,5% p.a.
- Sondertilgung: 5% p.a.
- Tilgungssatzwechsel: 1× kostenlos
- **Monatliche Rate:** 240.000 € × (3,60% + 2,5%) / 12 = 1.220 €

**Bank B:**
- Darlehensbetrag: 240.000 €
- Sollzins: 3,75% p.a.
- Effektivzins: 3,82% p.a.
- Zinsbindung: 15 Jahre
- Tilgung: 2,5% p.a.
- Sondertilgung: 10% p.a.
- Tilgungssatzwechsel: 2× kostenlos
- **Monatliche Rate:** 240.000 € × (3,75% + 2,5%) / 12 = 1.250 €

**Bank C:**
- Darlehensbetrag: 240.000 €
- Sollzins: 3,55% p.a.
- Effektivzins: 3,68% p.a.
- Zinsbindung: 10 Jahre
- Tilgung: 2,5% p.a.
- Sondertilgung: 5% p.a.
- Tilgungssatzwechsel: Nicht möglich
- **Monatliche Rate:** 240.000 € × (3,55% + 2,5%) / 12 = 1.210 €

**Empfehlung:** Bank A (guter Kompromiss: 10 Jahre Zinssicherheit, 5% Sondertilgung, Tilgungssatzwechsel, Rate 1.220 €)

---

**SCHRITT 5: RISIKOAUFKLÄRUNG**

**Risiko 1: Zinsänderungsrisiko**
- Nach 10 Jahren kann Zinssatz steigen
- **Beispiel:** Bei Zinsanstieg auf 5% steigt Rate von 1.220 € auf ca. 1.450 €
- **Absicherung:** 10 Jahre Zinsbindung, Forward-Darlehen möglich, höhere Tilgung (schnellere Entschuldung)

**Risiko 2: Einkommensrisiko (Kinderplanung)**
- In 3 Jahren sinkt Einkommen um 1.500 €/Monat
- **Beispiel:** Verfügbares Einkommen sinkt von 2.530 € auf 1.030 €
- **Absicherung:** Rate maximal 1.220 € (auch bei Einkommensrückgang tragbar), Tilgungssatzwechsel möglich (Senkung auf 1,5%)

**Risiko 3: Zahlungsunfähigkeitsrisiko**
- Bei Jobverlust, Krankheit kann Rate nicht mehr gezahlt werden
- **Folge:** Kündigung, Zwangsversteigerung
- **Absicherung:** Risikolebensversicherung 240.000 €, Berufsunfähigkeitsversicherung 1.220 €/Monat, Rücklagen 7.320 € (6 Monatsraten)

**Risiko 4: Wertverlustrisiko**
- Immobilie kann an Wert verlieren
- **Absicherung:** Gute Lage, hochwertige Bausubstanz, ausreichendes Eigenkapital

**Empfohlene Absicherungen:**
- Risikolebensversicherung: 240.000 € (fallend), ca. 35 €/Monat
- Berufsunfähigkeitsversicherung: 1.220 €/Monat Rente, ca. 85 €/Monat
- Rücklagen: 7.320 € (6 Monatsraten)
- **Gesamtkosten Absicherungen:** 120 €/Monat

---

**SCHRITT 6: BERATUNGSPROTOKOLL**

**Zusammenfassung:**
- Kunden: Herr und Frau Jung
- Finanzierungszweck: Kauf Eigentumswohnung 280.000 €
- Gesamtkosten: 308.000 €
- Eigenkapital: 68.000 € (22,1%)
- Darlehensbedarf: 240.000 €
- Empfohlenes Produkt: Annuitätendarlehen Bank A
- Monatliche Rate: 1.220 €
- Zinsbindung: 10 Jahre
- Absicherungen: Risikolebensversicherung, BU, Rücklagen

**Unterschrift:** Berater und Kunden

---

**SCHRITT 7: NACHBEREITUNG**

**Offene Punkte:**
- Eltern-Darlehen schriftlich vereinbaren (Vertrag, Rückzahlungsmodalitäten)
- Ratenkredit ablösen (12.000 € aus Eigenkapital)
- Absicherungen abschließen (Risikolebensversicherung, BU)
- Rücklagen bilden (7.320 €)
- Immobiliensuche (280.000 € statt 320.000 €)

**Nächste Schritte:**
1. Kunden suchen günstigere Immobilie (280.000 €)
2. Kunden klären Eltern-Darlehen (20.000 €)
3. Berater bereitet Darlehensantrag vor
4. Nach Immobilienfindung: Darlehensantrag einreichen

---

**LERNZIELE:**

1. **Realistische Einschätzung:** Eigenkapital zu niedrig erkannt, Lösungen gefunden
2. **Kinderplanung berücksichtigt:** Einkommensrückgang einkalkuliert
3. **Ratenkredit ablösen:** Verfügbares Einkommen erhöht
4. **Eltern-Darlehen:** Eigenkapitalquote verbessert
5. **Günstigere Immobilie:** Gesamtkosten reduziert
6. **Absicherungen:** Risiken minimiert
7. **Vollständige Dokumentation:** Beratungsprotokoll erstellt`,
    law: [
      "§ 491 BGB (Immobiliar-Verbraucherdarlehensvertrag)",
      "§ 511 BGB (Beratungs- und Dokumentationspflichten)",
      "§ 18a KWG (Kreditwürdigkeitsprüfung)"
    ],
    practice: `**Ihre Aufgabe:**

Bearbeiten Sie die Fallstudie vollständig:

1. **Bedarfsanalyse:** Erstellen Sie eine vollständige Bedarfsanalyse
2. **Finanzierungsplanung:** Berechnen Sie Gesamtkosten, Eigenkapital, Darlehensbedarf
3. **Haushaltsrechnung:** Erstellen Sie eine Haushaltsrechnung (vor und nach Kinderplanung)
4. **Konditionsvergleich:** Vergleichen Sie die 3 Bankangebote
5. **Produktempfehlung:** Begründen Sie Ihre Empfehlung
6. **Risikoaufklärung:** Klären Sie über alle Risiken auf
7. **Beratungsprotokoll:** Erstellen Sie ein vollständiges Beratungsprotokoll

**Zusatzfragen:**

1. Welche Probleme sehen Sie bei dieser Finanzierung?
2. Welche Lösungen schlagen Sie vor?
3. Wie gehen Sie mit der Kinderplanung um?
4. Welche Absicherungen empfehlen Sie?
5. Ist die Finanzierung tragbar?`,
    task: `**Aufgabe 1: Eigenkapitalquote berechnen**

Berechnen Sie die Eigenkapitalquote:
- Kaufpreis: 280.000 €
- Nebenkosten: 28.000 €
- Eigenkapital: 68.000 €
- **Eigenkapitalquote:** ?
- **Ausreichend (≥20%):** ?

---

**Aufgabe 2: Maximale Darlehensrate**

Berechnen Sie die maximale Darlehensrate:
- Einkommen: 6.400 €/Monat
- Ausgaben: 3.870 €/Monat
- **Verfügbares Einkommen:** ?
- **Maximale Darlehensrate (20% Puffer):** ?

---

**Aufgabe 3: Monatliche Rate**

Berechnen Sie die monatliche Rate:
- Darlehensbetrag: 240.000 €
- Zinssatz: 3,60% p.a.
- Tilgung: 2,5% p.a.
- **Monatliche Rate:** ?`,
    solution: `**Lösung Aufgabe 1:**
- Eigenkapitalquote: 68.000 € / (280.000 € + 28.000 €) = 22,1%
- Ausreichend: Ja (≥20%)

**Lösung Aufgabe 2:**
- Verfügbares Einkommen: 6.400 € - 3.870 € = 2.530 €
- Maximale Darlehensrate: 2.530 € / 1,2 = 2.108 €

**Lösung Aufgabe 3:**
- Monatliche Rate: 240.000 € × (3,60% + 2,5%) / 12 = 1.220 €`,
    type: "Prüfungsvorbereitung"
  },

  day_27: {
    title: "Fallstudie: Anschlussfinanzierung und Umschuldung",
    theory: `Anschlussfinanzierungen sind ein wichtiger Beratungsbereich. Nach Ablauf der Zinsbindung benötigt der Kunde eine neue Finanzierung für die Restschuld. Sie müssen: Prolongationsangebot prüfen, Umschuldungsangebote einholen, Konditionsvergleich durchführen, Forward-Darlehen prüfen, Sonderkündigungsrecht prüfen. Heute bearbeiten Sie eine komplette Fallstudie: Ein Kunde hat noch 1 Jahr Zinsbindung, Restschuld 220.000 €. Seine Bank bietet Prolongation zu 4,5% an. Ihre Aufgabe: Prüfen Sie alle Optionen und empfehlen Sie die beste Lösung.`,
    extendedTheory: `**Fallstudie: Anschlussfinanzierung und Umschuldung**

**AUSGANGSSITUATION:**

**Kunde:** Herr Müller (48 Jahre)
**Familienstand:** Verheiratet, 2 Kinder (16 und 18 Jahre)
**Beruf:** Angestellter (unbefristet)

**Ursprüngliches Darlehen:**
- Darlehensbetrag: 300.000 € (2016 abgeschlossen)
- Zinssatz: 2,8% p.a.
- Zinsbindung: 10 Jahre (bis 31.12.2026)
- Tilgung: 2% p.a.
- **Monatliche Rate:** 1.200 €

**Aktuelle Situation (2026):**
- Restschuld: 240.000 €
- Zinsbindung läuft in 1 Jahr ab (31.12.2026)
- Bank hat Prolongationsangebot geschickt

**Einkommen:**
- Herr Müller: 5.200 €/Monat netto
- Frau Müller: 2.800 €/Monat netto (Teilzeit)
- **Gesamteinkommen:** 8.000 €/Monat

**Ausgaben:**
- Lebenshaltung: 2.500 €/Monat
- Pkw: 400 €/Monat
- Versicherungen: 300 €/Monat
- Freizeit: 600 €/Monat
- Rücklagen: 500 €/Monat
- **Gesamtausgaben:** 4.300 €/Monat

**Verfügbares Einkommen:** 8.000 € - 4.300 € = 3.700 €/Monat

**Prolongationsangebot Bank A:**
- Restschuld: 240.000 €
- Zinssatz: 4,5% p.a.
- Zinsbindung: 10 Jahre
- Tilgung: 2% p.a.
- Sondertilgung: 5% p.a.
- **Monatliche Rate:** 240.000 € × (4,5% + 2%) / 12 = 1.300 €

---

**SCHRITT 1: PROLONGATIONSANGEBOT PRÜFEN**

**Vorteile:**
- Einfach und bequem
- Keine Wechselkosten
- Keine neue Bonitätsprüfung

**Nachteile:**
- Zinssatz 4,5% p.a. (deutlich höher als bisheriger Zins 2,8%)
- Monatliche Rate steigt von 1.200 € auf 1.300 € (+100 €/Monat)
- Keine Verhandlungsmacht

**Bewertung:** Prolongationsangebot ist teuer, Umschuldung prüfen!

---

**SCHRITT 2: UMSCHULDUNGSANGEBOTE EINHOLEN**

**Bank B:**
- Restschuld: 240.000 €
- Zinssatz: 4,0% p.a.
- Effektivzins: 4,05% p.a.
- Zinsbindung: 10 Jahre
- Tilgung: 2% p.a.
- Sondertilgung: 5% p.a.
- Tilgungssatzwechsel: 1× kostenlos
- **Monatliche Rate:** 240.000 € × (4,0% + 2%) / 12 = 1.200 €
- **Kosten Grundschuldabtretung:** 480 € (0,2%)

**Bank C:**
- Restschuld: 240.000 €
- Zinssatz: 3,8% p.a.
- Effektivzins: 3,86% p.a.
- Zinsbindung: 15 Jahre
- Tilgung: 2% p.a.
- Sondertilgung: 10% p.a.
- Tilgungssatzwechsel: 2× kostenlos
- **Monatliche Rate:** 240.000 € × (3,8% + 2%) / 12 = 1.160 €
- **Kosten Grundschuldabtretung:** 480 € (0,2%)

**Bank D:**
- Restschuld: 240.000 €
- Zinssatz: 4,2% p.a.
- Effektivzins: 4,25% p.a.
- Zinsbindung: 10 Jahre
- Tilgung: 2% p.a.
- Sondertilgung: 5% p.a.
- Tilgungssatzwechsel: Nicht möglich
- **Monatliche Rate:** 240.000 € × (4,2% + 2%) / 12 = 1.240 €
- **Kosten Grundschuldabtretung:** 480 € (0,2%)

---

**SCHRITT 3: KONDITIONSVERGLEICH**

**Vergleichstabelle:**

| Bank | Zinssatz | Zinsbindung | Monatliche Rate | Sondertilgung | Kosten | Gesamtzinsen (10 Jahre) |
|------|----------|-------------|-----------------|---------------|--------|-------------------------|
| A (Prolongation) | 4,5% | 10 Jahre | 1.300 € | 5% | 0 € | ca. 85.000 € |
| B (Umschuldung) | 4,0% | 10 Jahre | 1.200 € | 5% | 480 € | ca. 75.000 € |
| C (Umschuldung) | 3,8% | 15 Jahre | 1.160 € | 10% | 480 € | ca. 70.000 € |
| D (Umschuldung) | 4,2% | 10 Jahre | 1.240 € | 5% | 480 € | ca. 78.000 € |

**Ersparnis:**

**Bank B vs. Bank A:**
- Ersparnis pro Monat: 1.300 € - 1.200 € = 100 €/Monat
- Ersparnis über 10 Jahre: 100 € × 12 × 10 = 12.000 €
- Abzüglich Kosten: 12.000 € - 480 € = **11.520 € Nettoersparnis**

**Bank C vs. Bank A:**
- Ersparnis pro Monat: 1.300 € - 1.160 € = 140 €/Monat
- Ersparnis über 10 Jahre: 140 € × 12 × 10 = 16.800 €
- Abzüglich Kosten: 16.800 € - 480 € = **16.320 € Nettoersparnis**
- **Zusätzlich:** 15 Jahre Zinssicherheit (statt 10 Jahre)

**Empfehlung:** Bank C (günstigster Zins, längste Zinssicherheit, höchste Sondertilgung)

---

**SCHRITT 4: FORWARD-DARLEHEN PRÜFEN**

**Aktueller Marktzins (2026):** 3,8% p.a.

**Forward-Darlehen (12 Monate Vorlaufzeit):**
- Forward-Prämie: 0,01% pro Monat × 12 = 0,12%
- **Forward-Zinssatz:** 3,8% + 0,12% = 3,92% p.a.

**Vergleich:**
- Forward-Darlehen (jetzt abschließen): 3,92% p.a.
- Umschuldung (in 12 Monaten): 3,8% p.a. (aktueller Marktzins)

**Bewertung:**
- Forward-Darlehen lohnt sich nur, wenn Zinsen in 12 Monaten über 3,92% steigen
- **Empfehlung:** Abwarten, Marktzinsen beobachten, in 6 Monaten erneut prüfen

---

**SCHRITT 5: SONDERKÜNDIGUNGSRECHT PRÜFEN**

**Ursprüngliches Darlehen:**
- Abgeschlossen: 2016
- Zinsbindung: 10 Jahre (bis 2026)

**Sonderkündigungsrecht (§ 489 BGB):**
- Nach 10 Jahren mit 6 Monaten Frist
- **Frühester Kündigungstermin:** 01.07.2026 (10 Jahre + 6 Monate)

**Bewertung:**
- Sonderkündigungsrecht nicht relevant (Zinsbindung läuft ohnehin 31.12.2026 ab)
- Kunde kann ab 01.07.2026 kündigen (6 Monate vor Ablauf)

---

**SCHRITT 6: PRODUKTEMPFEHLUNG**

**Empfohlenes Produkt:** Umschuldung zu Bank C

**Konditionen:**
- Darlehensbetrag: 240.000 €
- Zinssatz: 3,8% p.a.
- Effektivzins: 3,86% p.a.
- Zinsbindung: 15 Jahre
- Tilgung: 2% p.a.
- Sondertilgung: 10% p.a.
- Tilgungssatzwechsel: 2× kostenlos
- **Monatliche Rate:** 1.160 €
- **Kosten:** 480 € (Grundschuldabtretung)

**Begründung:**
- Günstigster Zinssatz (3,8% vs. 4,5% Prolongation)
- Längste Zinssicherheit (15 Jahre vs. 10 Jahre)
- Höchste Sondertilgung (10% vs. 5%)
- Monatliche Rate sinkt (1.160 € vs. 1.200 € bisher)
- Ersparnis: 16.320 € über 10 Jahre
- Flexibilität: Tilgungssatzwechsel 2× kostenlos

---

**SCHRITT 7: RISIKOAUFKLÄRUNG**

**Risiko 1: Zinsänderungsrisiko**
- Nach 15 Jahren kann Zinssatz steigen
- **Absicherung:** 15 Jahre Zinssicherheit (längste Zinsbindung)

**Risiko 2: Einkommensrisiko**
- Kinder werden bald selbstständig (Ausgaben sinken)
- **Vorteil:** Mehr verfügbares Einkommen für Sondertilgung

**Risiko 3: Zahlungsunfähigkeitsrisiko**
- Bei Jobverlust, Krankheit kann Rate nicht mehr gezahlt werden
- **Absicherung:** Rücklagen vorhanden (500 €/Monat), Berufsunfähigkeitsversicherung empfohlen

---

**SCHRITT 8: BERATUNGSPROTOKOLL**

**Zusammenfassung:**
- Kunde: Herr Müller
- Anschlussfinanzierung: Restschuld 240.000 €
- Prolongationsangebot Bank A: 4,5% p.a., 1.300 €/Monat
- Empfohlenes Produkt: Umschuldung Bank C, 3,8% p.a., 1.160 €/Monat
- Ersparnis: 16.320 € über 10 Jahre
- Kosten: 480 € (Grundschuldabtretung)
- Zinssicherheit: 15 Jahre

**Unterschrift:** Berater und Kunde

---

**SCHRITT 9: UMSETZUNG**

**Nächste Schritte:**
1. Kunde entscheidet sich für Bank C
2. Berater bereitet Darlehensantrag vor
3. Bank C prüft Bonität (Gehaltsabrechnungen, Schufa)
4. Darlehensvertrag wird unterschrieben (6 Monate vor Ablauf)
5. Grundschuldabtretung wird vorbereitet
6. Ablösung des alten Darlehens zum 31.12.2026
7. Neues Darlehen wird ausgezahlt

---

**LERNZIELE:**

1. **Prolongationsangebot kritisch prüfen:** Nicht automatisch akzeptieren
2. **Umschuldungsangebote einholen:** Mindestens 3 Angebote
3. **Konditionsvergleich:** Effektivzins, Zinsbindung, Sondertilgung, Kosten
4. **Forward-Darlehen prüfen:** Nur bei erwartetem Zinsanstieg
5. **Sonderkündigungsrecht kennen:** Nach 10 Jahren mit 6 Monaten Frist
6. **Ersparnis berechnen:** Nettoersparnis nach Abzug der Kosten
7. **Vollständige Dokumentation:** Beratungsprotokoll erstellen`,
    law: [
      "§ 489 BGB (Sonderkündigungsrecht)",
      "§ 490 BGB (Außerordentliches Kündigungsrecht)",
      "§ 511 BGB (Beratungs- und Dokumentationspflichten)"
    ],
    practice: `**Ihre Aufgabe:**

Bearbeiten Sie die Fallstudie vollständig:

1. **Prolongationsangebot prüfen:** Bewerten Sie das Angebot von Bank A
2. **Umschuldungsangebote vergleichen:** Erstellen Sie eine Vergleichstabelle
3. **Ersparnis berechnen:** Berechnen Sie die Nettoersparnis für jede Bank
4. **Forward-Darlehen prüfen:** Lohnt sich ein Forward-Darlehen?
5. **Sonderkündigungsrecht prüfen:** Kann der Kunde vorzeitig kündigen?
6. **Produktempfehlung:** Begründen Sie Ihre Empfehlung
7. **Beratungsprotokoll:** Erstellen Sie ein vollständiges Beratungsprotokoll

**Zusatzfragen:**

1. Welche Vorteile hat die Umschuldung?
2. Welche Nachteile hat die Prolongation?
3. Wann lohnt sich ein Forward-Darlehen?
4. Wie berechnet man die Ersparnis?
5. Welche Kosten entstehen bei der Umschuldung?`,
    task: `**Aufgabe 1: Ersparnis berechnen**

Berechnen Sie die Nettoersparnis:
- Prolongation: 4,5% p.a., 1.300 €/Monat
- Umschuldung: 3,8% p.a., 1.160 €/Monat
- Kosten Umschuldung: 480 €
- Laufzeit: 10 Jahre
- **Ersparnis pro Monat:** ?
- **Ersparnis über 10 Jahre:** ?
- **Nettoersparnis:** ?

---

**Aufgabe 2: Forward-Prämie**

Berechnen Sie den Forward-Zinssatz:
- Aktueller Marktzins: 3,8% p.a.
- Vorlaufzeit: 18 Monate
- Forward-Prämie: 0,01% pro Monat
- **Forward-Zinssatz:** ?

---

**Aufgabe 3: Sonderkündigungsrecht**

Prüfen Sie das Sonderkündigungsrecht:
- Darlehen abgeschlossen: 01.01.2015
- Zinsbindung: 20 Jahre (bis 2035)
- Heute: 2026
- **Kann der Kunde kündigen?** ?
- **Frist:** ?
- **Frühester Kündigungstermin:** ?`,
    solution: `**Lösung Aufgabe 1:**
- Ersparnis pro Monat: 1.300 € - 1.160 € = 140 €
- Ersparnis über 10 Jahre: 140 € × 12 × 10 = 16.800 €
- Nettoersparnis: 16.800 € - 480 € = 16.320 €

**Lösung Aufgabe 2:**
- Forward-Zinssatz: 3,8% + (0,01% × 18) = 3,98% p.a.

**Lösung Aufgabe 3:**
- Kann kündigen: Ja (nach 10 Jahren, § 489 BGB)
- Frist: 6 Monate
- Frühester Kündigungstermin: 01.07.2025 (10 Jahre + 6 Monate)`,
    type: "Prüfungsvorbereitung"
  },

  day_28: {
    title: "Fallstudie: Baufinanzierung mit KfW-Förderung",
    theory: `KfW-Förderungen sind ein wichtiger Bestandteil der Baufinanzierung. Sie müssen: KfW-Programme kennen (KfW 124, 153, 261, 300), Förderbedingungen prüfen, Kombination mit Hausbank-Darlehen planen, Energieeffizienz-Anforderungen kennen. Heute bearbeiten Sie eine komplette Fallstudie: Eine Familie baut ein energieeffizientes Haus (KfW 40). Sie können KfW-Darlehen nutzen. Ihre Aufgabe: Planen Sie die optimale Finanzierung mit KfW-Förderung und berechnen Sie die Ersparnis.`,
    extendedTheory: `**Fallstudie: Baufinanzierung mit KfW-Förderung**

**AUSGANGSSITUATION:**

**Kunden:** Familie Schmidt (beide 35 Jahre)
**Familienstand:** Verheiratet, 2 Kinder (5 und 7 Jahre)
**Beruf:** Beide Angestellte (unbefristet)

**Einkommen:**
- Herr Schmidt: 5.500 €/Monat netto
- Frau Schmidt: 3.200 €/Monat netto
- Kindergeld: 500 €/Monat
- **Gesamteinkommen:** 9.200 €/Monat

**Ausgaben:**
- Lebenshaltung: 3.500 €/Monat
- 2× Pkw: 600 €/Monat
- Versicherungen: 350 €/Monat
- Freizeit: 700 €/Monat
- Rücklagen: 500 €/Monat
- **Gesamtausgaben:** 5.650 €/Monat

**Verfügbares Einkommen:** 9.200 € - 5.650 € = 3.550 €/Monat

**Eigenkapital:**
- Sparguthaben: 120.000 €
- Bausparvertrag: 30.000 € (zuteilungsreif)
- **Gesamtes Eigenkapital:** 150.000 €

**Bauprojekt:**
- Neubau Einfamilienhaus (KfW 40 Standard)
- Grundstück: 180.000 € (bereits gekauft)
- Baukosten: 420.000 €
- Nebenkosten: 60.000 € (Architekt, Baunebenkosten)
- **Gesamtkosten:** 660.000 €

---

**SCHRITT 1: KFW-PROGRAMME PRÜFEN**

**KfW 261 - Wohngebäude Kredit (Neubau):**
- Förderfähig: Neubau KfW 40, KfW 40 Plus
- **Kreditbetrag:** Bis 150.000 € pro Wohneinheit
- **Tilgungszuschuss:** 25% bei KfW 40 (= 37.500 €)
- **Zinssatz:** 0,01% p.a. (sehr günstig)
- **Tilgungsfreie Jahre:** 5 Jahre
- **Laufzeit:** 35 Jahre

**Voraussetzungen:**
- Energieeffizienz-Experte muss Baubegleitung durchführen
- KfW 40 Standard muss erreicht werden
- Antrag vor Baubeginn

**KfW 300 - Klimafreundlicher Neubau:**
- Förderfähig: Neubau mit Nachhaltigkeitszertifikat
- **Kreditbetrag:** Bis 150.000 € pro Wohneinheit
- **Zinssatz:** 0,01% p.a.
- **Tilgungsfreie Jahre:** 5 Jahre
- **Laufzeit:** 35 Jahre

**Empfehlung:** KfW 261 (mit Tilgungszuschuss 25%)

---

**SCHRITT 2: FINANZIERUNGSPLANUNG**

**Gesamtkosten:**
- Grundstück: 180.000 € (bereits gekauft, aus Eigenkapital bezahlt)
- Baukosten: 420.000 €
- Nebenkosten: 60.000 €
- **Gesamtkosten:** 660.000 €

**Eigenkapital:**
- Verfügbares Eigenkapital: 150.000 €
- Bereits verwendet (Grundstück): 180.000 €
- **Problem:** Eigenkapital reicht nicht (180.000 € > 150.000 €)

**Lösung:**
- Eltern-Darlehen: 30.000 € (zinsfrei, Rückzahlung flexibel)
- **Gesamtes Eigenkapital:** 150.000 € + 30.000 € = 180.000 €

**Darlehensbedarf:**
- Gesamtkosten: 660.000 €
- Eigenkapital: 180.000 €
- **Darlehensbedarf:** 480.000 €

**Finanzierungsstruktur:**
- KfW 261: 150.000 € (0,01% p.a., Tilgungszuschuss 37.500 €)
- Hausbank: 330.000 € (3,6% p.a.)
- **Gesamtdarlehen:** 480.000 €

---

**SCHRITT 3: KONDITIONSVERGLEICH**

**Variante 1: Ohne KfW-Förderung**

**Hausbank (gesamtes Darlehen):**
- Darlehensbetrag: 480.000 €
- Zinssatz: 3,6% p.a.
- Tilgung: 2% p.a.
- **Monatliche Rate:** 480.000 € × (3,6% + 2%) / 12 = 2.240 €
- **Gesamtzinsen (30 Jahre):** ca. 280.000 €

---

**Variante 2: Mit KfW-Förderung**

**KfW 261:**
- Darlehensbetrag: 150.000 €
- Zinssatz: 0,01% p.a.
- Tilgungszuschuss: 37.500 € (25%)
- **Effektiver Darlehensbetrag:** 150.000 € - 37.500 € = 112.500 €
- Tilgungsfreie Jahre: 5 Jahre (nur Zinsen)
- **Monatliche Rate (erste 5 Jahre):** 150.000 € × 0,01% / 12 = 1,25 € (nur Zinsen)
- **Monatliche Rate (ab Jahr 6):** ca. 400 € (Tilgung + Zinsen)

**Hausbank:**
- Darlehensbetrag: 330.000 €
- Zinssatz: 3,6% p.a.
- Tilgung: 2% p.a.
- **Monatliche Rate:** 330.000 € × (3,6% + 2%) / 12 = 1.540 €

**Gesamtrate:**
- **Erste 5 Jahre:** 1,25 € + 1.540 € = 1.541 € (statt 2.240 €)
- **Ab Jahr 6:** 400 € + 1.540 € = 1.940 € (statt 2.240 €)

**Ersparnis:**
- **Erste 5 Jahre:** (2.240 € - 1.541 €) × 12 × 5 = 41.940 €
- **Tilgungszuschuss:** 37.500 €
- **Gesamtersparnis:** ca. 80.000 € (über Laufzeit)

---

**SCHRITT 4: BAUBEGLEITUNG**

**KfW-Anforderung:**
- Energieeffizienz-Experte muss Baubegleitung durchführen
- **Kosten:** ca. 5.000-8.000 €

**Förderfähig:**
- KfW 261 fördert auch Baubegleitung (bis 5.000 €)
- **Netto-Kosten:** ca. 3.000 €

---

**SCHRITT 5: PRODUKTEMPFEHLUNG**

**Empfohlene Finanzierung:**
- KfW 261: 150.000 € (0,01% p.a., Tilgungszuschuss 37.500 €)
- Hausbank: 330.000 € (3,6% p.a., 2% Tilgung, 10 Jahre Zinsbindung)
- **Gesamtdarlehen:** 480.000 €

**Monatliche Rate:**
- **Erste 5 Jahre:** 1.541 €
- **Ab Jahr 6:** 1.940 €

**Begründung:**
- Tilgungszuschuss 37.500 € (geschenkt!)
- Sehr günstiger KfW-Zins (0,01% p.a.)
- Gesamtersparnis ca. 80.000 €
- Tilgungsfreie Jahre (5 Jahre) entlasten in Bauphase
- Rate liegt deutlich unter maximaler Rate (3.550 € / 1,2 = 2.958 €)

---

**SCHRITT 6: RISIKOAUFKLÄRUNG**

**Risiko 1: Baurisiko**
- Baukosten können steigen (Materialpreise, Verzögerungen)
- **Absicherung:** Puffer 10% (42.000 €), Festpreisvertrag mit Bauunternehmen

**Risiko 2: Zinsänderungsrisiko (Hausbank-Darlehen)**
- Nach 10 Jahren kann Zinssatz steigen
- **Absicherung:** 10 Jahre Zinsbindung, Forward-Darlehen möglich

**Risiko 3: Zahlungsunfähigkeitsrisiko**
- Bei Jobverlust, Krankheit kann Rate nicht mehr gezahlt werden
- **Absicherung:** Risikolebensversicherung 480.000 €, BU 1.940 €/Monat, Rücklagen

**Risiko 4: KfW-Anforderungen nicht erfüllt**
- Wenn KfW 40 Standard nicht erreicht wird, entfällt Tilgungszuschuss
- **Absicherung:** Energieeffizienz-Experte begleitet Bau, regelmäßige Kontrollen

---

**SCHRITT 7: BERATUNGSPROTOKOLL**

**Zusammenfassung:**
- Kunden: Familie Schmidt
- Bauprojekt: Neubau Einfamilienhaus (KfW 40)
- Gesamtkosten: 660.000 €
- Eigenkapital: 180.000 € (27%)
- Darlehensbedarf: 480.000 €
- Empfohlene Finanzierung: KfW 261 (150.000 €) + Hausbank (330.000 €)
- Monatliche Rate: 1.541 € (erste 5 Jahre), 1.940 € (ab Jahr 6)
- Ersparnis durch KfW: ca. 80.000 €

**Unterschrift:** Berater und Kunden

---

**SCHRITT 8: UMSETZUNG**

**Nächste Schritte:**
1. Energieeffizienz-Experte beauftragen (Baubegleitung)
2. KfW-Antrag stellen (vor Baubeginn!)
3. Hausbank-Darlehen beantragen
4. Baubeginn
5. Baubegleitung durch Energieeffizienz-Experten
6. Nach Fertigstellung: Bestätigung KfW 40 Standard
7. Tilgungszuschuss wird ausgezahlt (37.500 €)

---

**LERNZIELE:**

1. **KfW-Programme kennen:** KfW 261, KfW 300
2. **Tilgungszuschuss berechnen:** 25% bei KfW 40
3. **Kombination KfW + Hausbank:** Optimale Finanzierungsstruktur
4. **Baubegleitung:** Energieeffizienz-Experte erforderlich
5. **Ersparnis berechnen:** Tilgungszuschuss + Zinsersparnis
6. **Antrag vor Baubeginn:** Wichtig für KfW-Förderung
7. **Vollständige Dokumentation:** Beratungsprotokoll erstellen`,
    law: [
      "§ 491 BGB (Immobiliar-Verbraucherdarlehensvertrag)",
      "§ 511 BGB (Beratungs- und Dokumentationspflichten)",
      "KfW-Förderrichtlinien"
    ],
    practice: `**Ihre Aufgabe:**

Bearbeiten Sie die Fallstudie vollständig:

1. **KfW-Programme prüfen:** Welches Programm ist geeignet?
2. **Finanzierungsplanung:** Berechnen Sie Eigenkapital, Darlehensbedarf
3. **Konditionsvergleich:** Vergleichen Sie mit/ohne KfW-Förderung
4. **Ersparnis berechnen:** Wie viel spart die Familie durch KfW?
5. **Produktempfehlung:** Begründen Sie Ihre Empfehlung
6. **Risikoaufklärung:** Klären Sie über alle Risiken auf
7. **Beratungsprotokoll:** Erstellen Sie ein vollständiges Beratungsprotokoll

**Zusatzfragen:**

1. Welche Vorteile hat die KfW-Förderung?
2. Welche Anforderungen muss das Haus erfüllen?
3. Wann muss der KfW-Antrag gestellt werden?
4. Was ist ein Tilgungszuschuss?
5. Wie berechnet man die Ersparnis?`,
    task: `**Aufgabe 1: Tilgungszuschuss**

Berechnen Sie den Tilgungszuschuss:
- KfW-Darlehen: 150.000 €
- Tilgungszuschuss: 25% (KfW 40)
- **Tilgungszuschuss:** ?
- **Effektiver Darlehensbetrag:** ?

---

**Aufgabe 2: Monatliche Rate**

Berechnen Sie die monatliche Rate:
- KfW-Darlehen: 150.000 € (0,01% p.a., nur Zinsen erste 5 Jahre)
- Hausbank-Darlehen: 330.000 € (3,6% p.a., 2% Tilgung)
- **Monatliche Rate KfW (erste 5 Jahre):** ?
- **Monatliche Rate Hausbank:** ?
- **Gesamtrate:** ?

---

**Aufgabe 3: Ersparnis**

Berechnen Sie die Ersparnis:
- Ohne KfW: 480.000 € zu 3,6% p.a., Rate 2.240 €/Monat
- Mit KfW: Rate 1.541 €/Monat (erste 5 Jahre)
- **Ersparnis pro Monat:** ?
- **Ersparnis über 5 Jahre:** ?
- **Tilgungszuschuss:** 37.500 €
- **Gesamtersparnis:** ?`,
    solution: `**Lösung Aufgabe 1:**
- Tilgungszuschuss: 150.000 € × 25% = 37.500 €
- Effektiver Darlehensbetrag: 150.000 € - 37.500 € = 112.500 €

**Lösung Aufgabe 2:**
- Monatliche Rate KfW: 150.000 € × 0,01% / 12 = 1,25 €
- Monatliche Rate Hausbank: 330.000 € × (3,6% + 2%) / 12 = 1.540 €
- Gesamtrate: 1,25 € + 1.540 € = 1.541 €

**Lösung Aufgabe 3:**
- Ersparnis pro Monat: 2.240 € - 1.541 € = 699 €
- Ersparnis über 5 Jahre: 699 € × 12 × 5 = 41.940 €
- Tilgungszuschuss: 37.500 €
- Gesamtersparnis: 41.940 € + 37.500 € = 79.440 €`,
    type: "Prüfungsvorbereitung"
  },

  day_29: {
    title: "Fallstudie: Finanzierung für Selbstständige",
    theory: `Selbstständige haben besondere Anforderungen bei der Finanzierung. Sie müssen: 3 Jahre Steuerbescheide prüfen, Einkommensschwankungen berücksichtigen, höheres Eigenkapital empfehlen, Risikozuschläge kalkulieren. Heute bearbeiten Sie eine komplette Fallstudie: Ein Selbstständiger (Handwerksmeister) möchte eine Gewerbeimmobilie kaufen. Einkommen schwankend, aber ausreichend. Ihre Aufgabe: Erstellen Sie eine vollständige Finanzierungsberatung für Selbstständige mit allen Besonderheiten.`,
    extendedTheory: `**Fallstudie: Finanzierung für Selbstständige**

**AUSGANGSSITUATION:**

**Kunde:** Herr Weber (42 Jahre)
**Familienstand:** Verheiratet, 1 Kind (12 Jahre)
**Beruf:** Selbstständiger Handwerksmeister (Elektrotechnik)
**Selbstständig seit:** 2016 (10 Jahre)

**Einkommen (Durchschnitt 3 Jahre):**
- 2023: 72.000 €/Jahr = 6.000 €/Monat
- 2024: 84.000 €/Jahr = 7.000 €/Monat
- 2025: 90.000 €/Jahr = 7.500 €/Monat
- **Durchschnitt:** 82.000 €/Jahr = 6.833 €/Monat

**Ehefrau:**
- Angestellte (Teilzeit): 1.800 €/Monat netto
- Kindergeld: 250 €/Monat

**Gesamteinkommen:** 6.833 € + 1.800 € + 250 € = 8.883 €/Monat

**Ausgaben:**
- Lebenshaltung: 3.000 €/Monat
- Pkw (2×): 600 €/Monat
- Versicherungen: 450 €/Monat (inkl. Krankenversicherung Selbstständiger)
- Altersvorsorge: 500 €/Monat
- Freizeit: 500 €/Monat
- Rücklagen: 600 €/Monat
- **Gesamtausgaben:** 5.650 €/Monat

**Verfügbares Einkommen:** 8.883 € - 5.650 € = 3.233 €/Monat

**Eigenkapital:**
- Sparguthaben: 180.000 €
- Betriebsvermögen: 50.000 € (Werkzeuge, Fahrzeuge)
- **Gesamtes Eigenkapital:** 230.000 €

**Verbindlichkeiten:**
- Keine laufenden Kredite

**Schufa-Auskunft:**
- Schufa-Score: 89%
- Negativmerkmale: Keine

**Immobilienwunsch:**
- Gewerbeimmobilie (Werkstatt + Büro + Lager)
- Fläche: 300 m²
- Lage: Gewerbegebiet
- Baujahr: 2010
- **Kaufpreis:** 550.000 €

---

**SCHRITT 1: BESONDERHEITEN BEI SELBSTSTÄNDIGEN**

**Höhere Anforderungen:**
- 3 Jahre Steuerbescheide erforderlich
- Einkommensschwankungen berücksichtigen
- Höheres Eigenkapital empfohlen (30% statt 20%)
- Risikozuschlag bei Zinsen (ca. 0,2-0,5%)
- Längere Bearbeitungszeit

**Einkommensprüfung:**
- Steuerbescheide 2023, 2024, 2025
- BWA (Betriebswirtschaftliche Auswertung)
- Einnahmen-Überschuss-Rechnung
- Kontoauszüge (3 Monate)

**Einkommensschwankungen:**
- 2023: 72.000 €
- 2024: 84.000 € (+16,7%)
- 2025: 90.000 € (+7,1%)
- **Trend:** Steigend (positiv)

**Bewertung:**
- Einkommen ausreichend (Durchschnitt 6.833 €/Monat)
- Trend positiv (steigend)
- Selbstständigkeit stabil (10 Jahre)
- **Bonität:** Gut (trotz Selbstständigkeit)

---

**SCHRITT 2: FINANZIERUNGSPLANUNG**

**Gesamtkosten:**
- Kaufpreis: 550.000 €
- Grunderwerbsteuer (5%): 27.500 €
- Notar/Grundbuch (2%): 11.000 €
- Makler (0%): 0 € (privater Verkauf)
- **Gesamtkosten:** 588.500 €

**Eigenkapital:**
- Verfügbares Eigenkapital: 180.000 € (Betriebsvermögen nicht verwenden)
- **Eigenkapitalquote:** 180.000 € / 588.500 € = 30,6% (ausreichend!)

**Darlehensbedarf:**
- Gesamtkosten: 588.500 €
- Eigenkapital: 180.000 €
- **Darlehensbedarf:** 408.500 €

---

**SCHRITT 3: HAUSHALTSRECHNUNG**

**Einnahmen:**
- Gesamteinkommen: 8.883 €/Monat

**Ausgaben (nach Kauf):**
- Lebenshaltung: 3.000 €/Monat
- Pkw (2×): 600 €/Monat
- Versicherungen: 450 €/Monat
- Altersvorsorge: 500 €/Monat
- Freizeit: 500 €/Monat
- Betriebskosten Immobilie: 400 €/Monat (Strom, Heizung, Instandhaltung)
- Rücklagen: 600 €/Monat
- **Gesamtausgaben:** 6.050 €/Monat

**Verfügbares Einkommen:** 8.883 € - 6.050 € = 2.833 €/Monat

**Maximale Darlehensrate (20% Puffer):** 2.833 € / 1,2 = 2.361 €/Monat

**Besonderheit Selbstständige:**
- Höherer Sicherheitspuffer empfohlen (30% statt 20%)
- **Maximale Darlehensrate (30% Puffer):** 2.833 € / 1,3 = 2.179 €/Monat

---

**SCHRITT 4: KONDITIONSVERGLEICH**

**Bank A:**
- Darlehensbetrag: 408.500 €
- Sollzins: 3,80% p.a. (Risikozuschlag 0,2% für Selbstständige)
- Effektivzins: 3,86% p.a.
- Zinsbindung: 10 Jahre
- Tilgung: 2,5% p.a.
- Sondertilgung: 5% p.a.
- Tilgungssatzwechsel: 1× kostenlos
- **Monatliche Rate:** 408.500 € × (3,80% + 2,5%) / 12 = 2.145 €

**Bank B:**
- Darlehensbetrag: 408.500 €
- Sollzins: 4,00% p.a. (Risikozuschlag 0,4% für Selbstständige)
- Effektivzins: 4,08% p.a.
- Zinsbindung: 15 Jahre
- Tilgung: 2,5% p.a.
- Sondertilgung: 10% p.a.
- Tilgungssatzwechsel: 2× kostenlos
- **Monatliche Rate:** 408.500 € × (4,00% + 2,5%) / 12 = 2.213 €

**Bank C:**
- Darlehensbetrag: 408.500 €
- Sollzins: 3,70% p.a. (Risikozuschlag 0,1% für Selbstständige, gute Bonität)
- Effektivzins: 3,78% p.a.
- Zinsbindung: 10 Jahre
- Tilgung: 2,5% p.a.
- Sondertilgung: 5% p.a.
- Tilgungssatzwechsel: Nicht möglich
- **Monatliche Rate:** 408.500 € × (3,70% + 2,5%) / 12 = 2.110 €

**Empfehlung:** Bank C (günstigster Zinssatz, Rate unter maximaler Rate)

---

**SCHRITT 5: STEUERLICHE VORTEILE (GEWERBEIMMOBILIE)**

**Absetzbarkeit:**
- Zinsen sind als Betriebsausgaben absetzbar
- Abschreibung (AfA): 2% p.a. (550.000 € × 2% = 11.000 €/Jahr)
- **Steuerersparnis:** ca. 40% (abhängig von Steuersatz)

**Beispiel:**
- Zinsen Jahr 1: 408.500 € × 3,70% = 15.115 €
- AfA: 11.000 €
- **Gesamte Betriebsausgaben:** 26.115 €
- **Steuerersparnis:** 26.115 € × 40% = 10.446 €/Jahr = 870 €/Monat

**Effektive monatliche Belastung:**
- Monatliche Rate: 2.110 €
- Steuerersparnis: 870 €
- **Effektive Belastung:** 1.240 €/Monat

---

**SCHRITT 6: PRODUKTEMPFEHLUNG**

**Empfohlenes Produkt:** Annuitätendarlehen Bank C

**Konditionen:**
- Darlehensbetrag: 408.500 €
- Zinssatz: 3,70% p.a.
- Effektivzins: 3,78% p.a.
- Zinsbindung: 10 Jahre
- Tilgung: 2,5% p.a.
- Sondertilgung: 5% p.a.
- **Monatliche Rate:** 2.110 €
- **Effektive Belastung (nach Steuern):** 1.240 €/Monat

**Begründung:**
- Günstigster Zinssatz (3,70% p.a.)
- Rate liegt unter maximaler Rate (2.179 €)
- Eigenkapital ausreichend (30,6%)
- Steuerliche Vorteile (Zinsen + AfA absetzbar)
- Einkommen stabil und steigend

---

**SCHRITT 7: RISIKOAUFKLÄRUNG**

**Risiko 1: Einkommensschwankungen**
- Einkommen kann sinken (Auftragslage)
- **Absicherung:** Höherer Sicherheitspuffer (30%), Rücklagen (600 €/Monat), Sondertilgung nutzen

**Risiko 2: Zinsänderungsrisiko**
- Nach 10 Jahren kann Zinssatz steigen
- **Absicherung:** 10 Jahre Zinsbindung, Forward-Darlehen möglich, höhere Tilgung

**Risiko 3: Zahlungsunfähigkeitsrisiko**
- Bei Krankheit, Auftragsmangel kann Rate nicht mehr gezahlt werden
- **Absicherung:** Berufsunfähigkeitsversicherung 2.110 €/Monat, Rücklagen, Ehefrau arbeitet (Teilzeit)

**Risiko 4: Wertverlustrisiko (Gewerbeimmobilie)**
- Gewerbeimmobilien können schwerer verkaufbar sein
- **Absicherung:** Gute Lage (Gewerbegebiet), vielseitig nutzbar, ausreichendes Eigenkapital

---

**SCHRITT 8: BERATUNGSPROTOKOLL**

**Zusammenfassung:**
- Kunde: Herr Weber (Selbstständiger)
- Finanzierungszweck: Kauf Gewerbeimmobilie 550.000 €
- Gesamtkosten: 588.500 €
- Eigenkapital: 180.000 € (30,6%)
- Darlehensbedarf: 408.500 €
- Empfohlenes Produkt: Annuitätendarlehen Bank C
- Monatliche Rate: 2.110 € (effektiv 1.240 € nach Steuern)
- Zinsbindung: 10 Jahre
- Steuerliche Vorteile: Zinsen + AfA absetzbar

**Unterschrift:** Berater und Kunde

---

**LERNZIELE:**

1. **Besonderheiten Selbstständige:** 3 Jahre Steuerbescheide, höheres Eigenkapital, Risikozuschlag
2. **Einkommensprüfung:** Durchschnitt 3 Jahre, Trend berücksichtigen
3. **Höherer Sicherheitspuffer:** 30% statt 20%
4. **Steuerliche Vorteile:** Zinsen + AfA absetzbar (Gewerbeimmobilie)
5. **Risikozuschlag:** 0,1-0,5% höhere Zinsen
6. **Vollständige Dokumentation:** Beratungsprotokoll erstellen`,
    law: [
      "§ 491 BGB (Immobiliar-Verbraucherdarlehensvertrag)",
      "§ 511 BGB (Beratungs- und Dokumentationspflichten)",
      "§ 18a KWG (Kreditwürdigkeitsprüfung)",
      "EStG (Einkommensteuergesetz - AfA)"
    ],
    practice: `**Ihre Aufgabe:**

Bearbeiten Sie die Fallstudie vollständig:

1. **Einkommensprüfung:** Berechnen Sie das Durchschnittseinkommen (3 Jahre)
2. **Finanzierungsplanung:** Berechnen Sie Eigenkapital, Darlehensbedarf
3. **Haushaltsrechnung:** Erstellen Sie eine Haushaltsrechnung (30% Puffer)
4. **Konditionsvergleich:** Vergleichen Sie die 3 Bankangebote
5. **Steuerliche Vorteile:** Berechnen Sie die Steuerersparnis
6. **Produktempfehlung:** Begründen Sie Ihre Empfehlung
7. **Beratungsprotokoll:** Erstellen Sie ein vollständiges Beratungsprotokoll

**Zusatzfragen:**

1. Welche Besonderheiten gelten für Selbstständige?
2. Welche Unterlagen benötigen Sie?
3. Warum höherer Sicherheitspuffer (30%)?
4. Welche steuerlichen Vorteile gibt es?
5. Ist die Finanzierung tragbar?`,
    task: `**Aufgabe 1: Durchschnittseinkommen**

Berechnen Sie das Durchschnittseinkommen:
- 2023: 72.000 €/Jahr
- 2024: 84.000 €/Jahr
- 2025: 90.000 €/Jahr
- **Durchschnitt pro Jahr:** ?
- **Durchschnitt pro Monat:** ?

---

**Aufgabe 2: Maximale Darlehensrate**

Berechnen Sie die maximale Darlehensrate:
- Verfügbares Einkommen: 2.833 €/Monat
- Sicherheitspuffer: 30% (Selbstständige)
- **Maximale Darlehensrate:** ?

---

**Aufgabe 3: Steuerersparnis**

Berechnen Sie die Steuerersparnis:
- Zinsen Jahr 1: 15.115 €
- AfA: 11.000 €
- Steuersatz: 40%
- **Steuerersparnis pro Jahr:** ?
- **Steuerersparnis pro Monat:** ?`,
    solution: `**Lösung Aufgabe 1:**
- Durchschnitt pro Jahr: (72.000 € + 84.000 € + 90.000 €) / 3 = 82.000 €
- Durchschnitt pro Monat: 82.000 € / 12 = 6.833 €

**Lösung Aufgabe 2:**
- Maximale Darlehensrate: 2.833 € / 1,3 = 2.179 €

**Lösung Aufgabe 3:**
- Steuerersparnis pro Jahr: (15.115 € + 11.000 €) × 40% = 10.446 €
- Steuerersparnis pro Monat: 10.446 € / 12 = 870 €`,
    type: "Prüfungsvorbereitung"
  },

  day_30: {
    title: "Fallstudie: Komplexe Finanzierung mit mehreren Herausforderungen",
    theory: `Komplexe Finanzierungen erfordern kreative Lösungen. Sie müssen: Mehrere Probleme gleichzeitig lösen, verschiedene Finanzierungsbausteine kombinieren, Risiken minimieren, Kosten optimieren. Heute bearbeiten Sie eine sehr komplexe Fallstudie: Ein Paar möchte ein Mehrfamilienhaus kaufen (Eigennutzung + Vermietung). Probleme: Niedriges Eigenkapital, befristeter Arbeitsvertrag, laufende Kredite, Renovierungsbedarf. Ihre Aufgabe: Finden Sie eine tragfähige Lösung für diese schwierige Finanzierung.`,
    extendedTheory: `**Fallstudie: Komplexe Finanzierung mit mehreren Herausforderungen**

**AUSGANGSSITUATION:**

**Kunden:** Herr und Frau Klein (beide 38 Jahre)
**Familienstand:** Verheiratet, 2 Kinder (10 und 12 Jahre)
**Beruf:** 
- Herr Klein: Angestellter (befristet bis 31.12.2027, danach unbefristet geplant)
- Frau Klein: Angestellte (unbefristet, Teilzeit)

**Einkommen:**
- Herr Klein: 4.200 €/Monat netto
- Frau Klein: 2.400 €/Monat netto
- Kindergeld: 500 €/Monat
- **Gesamteinkommen:** 7.100 €/Monat

**Ausgaben:**
- Aktuelle Miete: 1.300 €/Monat
- Lebenshaltung: 2.500 €/Monat
- Pkw: 450 €/Monat
- Versicherungen: 280 €/Monat
- Freizeit: 500 €/Monat
- Ratenkredit (Pkw): 280 €/Monat (Restschuld 8.000 €, noch 2,5 Jahre)
- Ratenkredit (Möbel): 150 €/Monat (Restschuld 3.000 €, noch 1,5 Jahre)
- **Gesamtausgaben:** 5.460 €/Monat

**Verfügbares Einkommen:** 7.100 € - 5.460 € = 1.640 €/Monat

**Eigenkapital:**
- Sparguthaben: 35.000 €
- Bausparvertrag: 10.000 € (nicht zuteilungsreif)
- **Gesamtes Eigenkapital:** 45.000 €

**Verbindlichkeiten:**
- Ratenkredit Pkw: 8.000 € (280 €/Monat)
- Ratenkredit Möbel: 3.000 € (150 €/Monat)
- **Gesamte Verbindlichkeiten:** 11.000 €

**Schufa-Auskunft:**
- Herr Klein: 87% (2 laufende Ratenkredite)
- Frau Klein: 92%
- Negativmerkmale: Keine

**Immobilienwunsch:**
- Mehrfamilienhaus (3 Wohnungen)
- Wohnung 1 (EG): 80 m² (Eigennutzung)
- Wohnung 2 (OG): 75 m² (vermietet, 900 €/Monat kalt)
- Wohnung 3 (DG): 70 m² (vermietet, 850 €/Monat kalt)
- Baujahr: 1985
- Zustand: Renovierungsbedürftig (Dach, Heizung, Fenster)
- **Kaufpreis:** 420.000 €
- **Renovierungskosten:** 60.000 €

---

**SCHRITT 1: PROBLEMANALYSE**

**Problem 1: Niedriges Eigenkapital**
- Eigenkapital: 45.000 €
- Gesamtkosten: 420.000 € + 60.000 € + 48.000 € (Nebenkosten) = 528.000 €
- **Eigenkapitalquote:** 45.000 € / 528.000 € = 8,5% (viel zu niedrig!)

**Problem 2: Befristeter Arbeitsvertrag**
- Herr Klein hat befristeten Vertrag (bis 31.12.2027)
- Banken verlangen meist unbefristeten Vertrag
- **Risiko:** Kündigung möglich

**Problem 3: Laufende Ratenkredite**
- 2 Ratenkredite (insgesamt 430 €/Monat)
- Reduzieren verfügbares Einkommen
- Reduzieren Schufa-Score

**Problem 4: Renovierungsbedarf**
- 60.000 € Renovierungskosten
- Müssen zusätzlich finanziert werden
- Erhöhen Darlehensbedarf

**Problem 5: Mieteinnahmen unsicher**
- Mieteinnahmen 1.750 €/Monat (brutto)
- Banken rechnen nur 70% an (1.225 €/Monat)
- **Risiko:** Mietausfall, Leerstand

---

**SCHRITT 2: LÖSUNGSANSÄTZE**

**Lösung 1: Ratenkredite ablösen**
- Ratenkredit Pkw ablösen: 8.000 € aus Eigenkapital
- Ratenkredit Möbel ablösen: 3.000 € aus Eigenkapital
- **Verfügbares Eigenkapital:** 45.000 € - 11.000 € = 34.000 €
- **Verfügbares Einkommen:** 1.640 € + 430 € = 2.070 €/Monat
- **Schufa-Score verbessert:** ca. 90% (keine laufenden Kredite)

**Lösung 2: Eltern-Darlehen**
- Eltern leihen 50.000 € (zinsfrei, Rückzahlung flexibel)
- **Gesamtes Eigenkapital:** 34.000 € + 50.000 € = 84.000 €
- **Eigenkapitalquote:** 84.000 € / 528.000 € = 15,9% (immer noch zu niedrig)

**Lösung 3: Renovierung strecken**
- Nur dringendste Renovierungen sofort (Dach, Heizung): 40.000 €
- Rest später (Fenster): 20.000 €
- **Gesamtkosten:** 420.000 € + 40.000 € + 46.000 € (Nebenkosten) = 506.000 €
- **Eigenkapitalquote:** 84.000 € / 506.000 € = 16,6% (immer noch zu niedrig)

**Lösung 4: Mieteinnahmen nutzen**
- Mieteinnahmen: 1.750 €/Monat (brutto)
- Abzüglich Nebenkosten (20%): 1.400 €/Monat (netto)
- Banken rechnen 70% an: 980 €/Monat
- **Verfügbares Einkommen:** 2.070 € + 980 € = 3.050 €/Monat

**Lösung 5: Befristeten Vertrag erklären**
- Arbeitgeber-Bestätigung: Unbefristete Übernahme geplant
- Alternativ: Nur Einkommen der Ehefrau (unbefristet) berücksichtigen

---

**SCHRITT 3: OPTIMIERTE FINANZIERUNGSPLANUNG**

**Gesamtkosten:**
- Kaufpreis: 420.000 €
- Renovierung (sofort): 40.000 €
- Nebenkosten (10%): 46.000 €
- **Gesamtkosten:** 506.000 €

**Eigenkapital:**
- Sparguthaben: 45.000 €
- Abzüglich Ablösung Ratenkredite: 11.000 €
- **Verfügbares Eigenkapital:** 34.000 €
- Eltern-Darlehen: 50.000 €
- **Gesamtes Eigenkapital:** 84.000 €
- **Eigenkapitalquote:** 16,6% (zu niedrig, aber mit Mieteinnahmen akzeptabel)

**Darlehensbedarf:**
- Gesamtkosten: 506.000 €
- Eigenkapital: 84.000 €
- **Darlehensbedarf:** 422.000 €

---

**SCHRITT 4: HAUSHALTSRECHNUNG**

**Einnahmen:**
- Gesamteinkommen: 7.100 €/Monat
- Mieteinnahmen (netto): 1.400 €/Monat
- **Gesamteinnahmen:** 8.500 €/Monat

**Ausgaben (nach Kauf):**
- Lebenshaltung: 2.500 €/Monat
- Pkw: 450 €/Monat
- Versicherungen: 280 €/Monat
- Freizeit: 500 €/Monat
- Hausgeld (eigene Wohnung): 200 €/Monat
- Instandhaltungsrücklage: 300 €/Monat
- Verwaltungskosten (Vermietung): 100 €/Monat
- Rücklagen: 400 €/Monat
- **Gesamtausgaben:** 4.730 €/Monat

**Verfügbares Einkommen:** 8.500 € - 4.730 € = 3.770 €/Monat

**Maximale Darlehensrate (20% Puffer):** 3.770 € / 1,2 = 3.142 €/Monat

**Problem:** Nur Einkommen Ehefrau berücksichtigen (befristeter Vertrag Ehemann)
- **Einkommen nur Ehefrau:** 2.400 € + 1.400 € (Miete) = 3.800 €/Monat
- **Verfügbares Einkommen:** 3.800 € - 4.730 € = -930 €/Monat (nicht tragbar!)

**Lösung:** Arbeitgeber-Bestätigung für unbefristete Übernahme einholen

---

**SCHRITT 5: KONDITIONSVERGLEICH**

**Bank A:**
- Darlehensbetrag: 422.000 €
- Zinssatz: 4,20% p.a. (Risikozuschlag 0,6% wegen niedrigem Eigenkapital)
- Effektivzins: 4,28% p.a.
- Zinsbindung: 10 Jahre
- Tilgung: 2% p.a.
- Sondertilgung: 5% p.a.
- **Monatliche Rate:** 422.000 € × (4,20% + 2%) / 12 = 2.181 €

**Bank B:**
- Darlehensbetrag: 422.000 €
- Zinssatz: 4,50% p.a. (Risikozuschlag 0,9% wegen niedrigem Eigenkapital + befristetem Vertrag)
- Effektivzins: 4,60% p.a.
- Zinsbindung: 15 Jahre
- Tilgung: 2% p.a.
- Sondertilgung: 10% p.a.
- **Monatliche Rate:** 422.000 € × (4,50% + 2%) / 12 = 2.286 €

**Bank C (mit Arbeitgeber-Bestätigung):**
- Darlehensbetrag: 422.000 €
- Zinssatz: 3,90% p.a. (Risikozuschlag 0,3% wegen niedrigem Eigenkapital, aber Arbeitgeber-Bestätigung)
- Effektivzins: 3,98% p.a.
- Zinsbindung: 10 Jahre
- Tilgung: 2% p.a.
- Sondertilgung: 5% p.a.
- **Monatliche Rate:** 422.000 € × (3,90% + 2%) / 12 = 2.076 €

**Empfehlung:** Bank C (mit Arbeitgeber-Bestätigung, günstigster Zinssatz)

---

**SCHRITT 6: PRODUKTEMPFEHLUNG**

**Empfohlene Finanzierung:**
- Darlehensbetrag: 422.000 €
- Zinssatz: 3,90% p.a.
- Effektivzins: 3,98% p.a.
- Zinsbindung: 10 Jahre
- Tilgung: 2% p.a.
- Sondertilgung: 5% p.a.
- **Monatliche Rate:** 2.076 €

**Voraussetzungen:**
- Arbeitgeber-Bestätigung für unbefristete Übernahme
- Ablösung der Ratenkredite (11.000 €)
- Eltern-Darlehen (50.000 €)
- Renovierung strecken (nur 40.000 € sofort)

**Begründung:**
- Rate liegt deutlich unter maximaler Rate (3.142 €)
- Mieteinnahmen decken ca. 67% der Rate (1.400 € / 2.076 €)
- Eigenkapitalquote 16,6% (mit Mieteinnahmen akzeptabel)
- Arbeitgeber-Bestätigung reduziert Risikozuschlag

---

**SCHRITT 7: RISIKOAUFKLÄRUNG**

**Risiko 1: Befristeter Arbeitsvertrag**
- Vertrag läuft 31.12.2027 aus
- **Absicherung:** Arbeitgeber-Bestätigung, Ehefrau arbeitet (unbefristet), Mieteinnahmen

**Risiko 2: Mietausfall**
- Mieter können kündigen, Leerstand
- **Absicherung:** Rücklagen (400 €/Monat), Mietausfallversicherung, gute Mieterauswahl

**Risiko 3: Renovierungskosten höher**
- Renovierung kann teurer werden
- **Absicherung:** Puffer 10% (4.000 €), Renovierung strecken

**Risiko 4: Zinsänderungsrisiko**
- Nach 10 Jahren kann Zinssatz steigen
- **Absicherung:** 10 Jahre Zinsbindung, Sondertilgung nutzen (Mieteinnahmen), Forward-Darlehen

**Risiko 5: Zahlungsunfähigkeitsrisiko**
- Bei Jobverlust kann Rate nicht mehr gezahlt werden
- **Absicherung:** Mieteinnahmen (1.400 €), Ehefrau arbeitet, Rücklagen, Berufsunfähigkeitsversicherung

---

**SCHRITT 8: BERATUNGSPROTOKOLL**

**Zusammenfassung:**
- Kunden: Herr und Frau Klein
- Finanzierungszweck: Kauf Mehrfamilienhaus 420.000 € + Renovierung 40.000 €
- Gesamtkosten: 506.000 €
- Eigenkapital: 84.000 € (16,6%)
- Darlehensbedarf: 422.000 €
- Empfohlenes Produkt: Annuitätendarlehen Bank C
- Monatliche Rate: 2.076 €
- Mieteinnahmen: 1.400 €/Monat (netto)
- Voraussetzungen: Arbeitgeber-Bestätigung, Ablösung Ratenkredite, Eltern-Darlehen

**Unterschrift:** Berater und Kunden

---

**LERNZIELE:**

1. **Komplexe Probleme lösen:** Mehrere Herausforderungen gleichzeitig
2. **Kreative Lösungen:** Ratenkredite ablösen, Eltern-Darlehen, Renovierung strecken
3. **Mieteinnahmen nutzen:** Erhöhen verfügbares Einkommen
4. **Arbeitgeber-Bestätigung:** Reduziert Risikozuschlag
5. **Risikomanagement:** Alle Risiken aufklären und absichern
6. **Vollständige Dokumentation:** Beratungsprotokoll erstellen`,
    law: [
      "§ 491 BGB (Immobiliar-Verbraucherdarlehensvertrag)",
      "§ 511 BGB (Beratungs- und Dokumentationspflichten)",
      "§ 18a KWG (Kreditwürdigkeitsprüfung)"
    ],
    practice: `**Ihre Aufgabe:**

Bearbeiten Sie die Fallstudie vollständig:

1. **Problemanalyse:** Identifizieren Sie alle Probleme
2. **Lösungsansätze:** Entwickeln Sie kreative Lösungen
3. **Finanzierungsplanung:** Berechnen Sie Eigenkapital, Darlehensbedarf
4. **Haushaltsrechnung:** Erstellen Sie eine Haushaltsrechnung (mit Mieteinnahmen)
5. **Konditionsvergleich:** Vergleichen Sie die 3 Bankangebote
6. **Produktempfehlung:** Begründen Sie Ihre Empfehlung
7. **Beratungsprotokoll:** Erstellen Sie ein vollständiges Beratungsprotokoll

**Zusatzfragen:**

1. Welche Probleme sehen Sie?
2. Welche Lösungen schlagen Sie vor?
3. Wie gehen Sie mit dem befristeten Vertrag um?
4. Wie nutzen Sie die Mieteinnahmen?
5. Ist die Finanzierung tragbar?`,
    task: `**Aufgabe 1: Eigenkapitalquote**

Berechnen Sie die Eigenkapitalquote:
- Gesamtkosten: 506.000 €
- Eigenkapital: 84.000 €
- **Eigenkapitalquote:** ?
- **Ausreichend (≥20%):** ?

---

**Aufgabe 2: Verfügbares Einkommen**

Berechnen Sie das verfügbare Einkommen:
- Gesamteinkommen: 7.100 €/Monat
- Mieteinnahmen (netto): 1.400 €/Monat
- Ausgaben: 4.730 €/Monat
- **Verfügbares Einkommen:** ?
- **Maximale Darlehensrate (20% Puffer):** ?

---

**Aufgabe 3: Monatliche Rate**

Berechnen Sie die monatliche Rate:
- Darlehensbetrag: 422.000 €
- Zinssatz: 3,90% p.a.
- Tilgung: 2% p.a.
- **Monatliche Rate:** ?`,
    solution: `**Lösung Aufgabe 1:**
- Eigenkapitalquote: 84.000 € / 506.000 € = 16,6%
- Ausreichend: Nein (< 20%), aber mit Mieteinnahmen akzeptabel

**Lösung Aufgabe 2:**
- Verfügbares Einkommen: (7.100 € + 1.400 €) - 4.730 € = 3.770 €
- Maximale Darlehensrate: 3.770 € / 1,2 = 3.142 €

**Lösung Aufgabe 3:**
- Monatliche Rate: 422.000 € × (3,90% + 2%) / 12 = 2.076 €`,
    type: "Prüfungsvorbereitung"
  },

};
// Modul 5: Darlehensvermittlung §34i GewO
// Teil 7: Tage 31-40 (Prüfungssimulationen + Wiederholung) - KOMPAKT

export const contentDataModule5_34i_Part7_Final: Record<string, {
  title: string;
  theory: string;
  extendedTheory?: string;
  law: string[];
  practice: string;
  task: string;
  solution?: string;
  type?: string;
}> = {

  day_31: {
    title: "Prüfungssimulation 1: Multiple-Choice-Fragen (50 Fragen)",
    theory: `Die Sachkundeprüfung §34i besteht aus Multiple-Choice-Fragen, Rechenaufgaben und Fallstudien. Heute simulieren Sie die erste Prüfung mit 50 Multiple-Choice-Fragen aus allen Themenbereichen. **Zeitlimit:** 90 Minuten. **Bestehensgrenze:** 70% (35 von 50 Fragen richtig). Themen: Rechtliche Grundlagen (§34i GewO, BGB, GwG), Darlehensarten, Finanzierungsplanung, Bonitätsprüfung, Sicherheiten, Risiken, Verbraucherschutz, Datenschutz. Beantworten Sie alle Fragen ohne Hilfsmittel und prüfen Sie anschließend Ihre Antworten.`,
    extendedTheory: `**50 Multiple-Choice-Fragen (Beispiele):**

**Rechtliche Grundlagen (10 Fragen):**
1. Wer benötigt eine Erlaubnis nach §34i GewO? A) Nur Banken B) Darlehensvermittler C) Nur Makler D) Niemand
2. Wie hoch muss die Berufshaftpflichtversicherung mindestens sein? A) 500.000 € B) 1 Mio. € C) 2 Mio. € D) 5 Mio. €
3. Wie viele Stunden Weiterbildung sind pro Jahr erforderlich? A) 10 Stunden B) 15 Stunden C) 20 Stunden D) 25 Stunden
4. Welches Gesetz regelt den Immobiliar-Verbraucherdarlehensvertrag? A) §34i GewO B) § 491 BGB C) § 511 BGB D) GwG
5. Wie lange beträgt die Widerrufsfrist? A) 7 Tage B) 14 Tage C) 21 Tage D) 30 Tage
6. Wann muss das ESIS-Merkblatt übergeben werden? A) Vor Vertragsschluss B) Bei Vertragsschluss C) Nach Vertragsschluss D) Gar nicht
7. Wie lange muss ein Beratungsprotokoll aufbewahrt werden? A) 3 Jahre B) 5 Jahre C) 10 Jahre D) 15 Jahre
8. Nach wie vielen Jahren kann ein Kunde sein Darlehen mit 6 Monaten Frist kündigen? A) 5 Jahre B) 10 Jahre C) 15 Jahre D) 20 Jahre
9. Welches Gesetz regelt die Geldwäscheprävention? A) BGB B) GwG C) DSGVO D) KWG
10. Wie lange müssen Kundendaten nach dem GwG aufbewahrt werden? A) 3 Jahre B) 5 Jahre C) 10 Jahre D) 15 Jahre

**Darlehensarten (10 Fragen):**
11. Was ist ein Annuitätendarlehen? A) Konstante Rate B) Steigende Rate C) Sinkende Rate D) Keine Rate
12. Was ist ein Tilgungsdarlehen? A) Konstante Rate B) Konstante Tilgung C) Keine Tilgung D) Steigende Tilgung
13. Was ist ein endfälliges Darlehen? A) Tilgung während Laufzeit B) Tilgung am Ende C) Keine Tilgung D) Steigende Tilgung
14. Wie berechnet sich die Annuität? A) Darlehensbetrag × Zinssatz B) Darlehensbetrag × (Zinssatz + Tilgung) C) Darlehensbetrag × Tilgung D) Zinssatz + Tilgung
15. Was ist der Effektivzins? A) Nur Sollzins B) Sollzins + Nebenkosten C) Nur Nebenkosten D) Sollzins - Nebenkosten
16. Was ist eine Grundschuld? A) Personalsicherheit B) Realsicherheit C) Versicherung D) Darlehensart
17. Was ist eine Hypothek? A) Personalsicherheit B) Realsicherheit C) Versicherung D) Darlehensart
18. Was ist eine Bürgschaft? A) Personalsicherheit B) Realsicherheit C) Versicherung D) Darlehensart
19. Was ist der Beleihungsauslauf? A) Darlehensbetrag / Kaufpreis B) Darlehensbetrag / Beleihungswert C) Kaufpreis / Darlehensbetrag D) Beleihungswert / Kaufpreis
20. Was ist eine Vorfälligkeitsentschädigung? A) Strafe bei Zahlungsverzug B) Entschädigung bei vorzeitiger Rückzahlung C) Bearbeitungsgebühr D) Bereitstellungszins

**Finanzierungsplanung (10 Fragen):**
21. Wie viel Eigenkapital sollte mindestens vorhanden sein? A) 10% B) 20% C) 30% D) 40%
22. Wie berechnet sich die maximale Darlehensrate? A) Verfügbares Einkommen B) Verfügbares Einkommen / 1,2 C) Verfügbares Einkommen × 1,2 D) Verfügbares Einkommen / 2
23. Wie hoch sind die Nebenkosten beim Immobilienkauf? A) 5-10% B) 10-15% C) 15-20% D) 20-25%
24. Was ist die Grunderwerbsteuer? A) 1-3% B) 3,5-6,5% C) 10-15% D) 15-20%
25. Wie hoch sollte die Tilgung mindestens sein? A) 1% B) 2% C) 3% D) 4%
26. Was ist ein Forward-Darlehen? A) Zinssicherung für zukünftige Anschlussfinanzierung B) Darlehen für Selbstständige C) Darlehen ohne Zinsen D) Darlehen ohne Tilgung
27. Was ist eine Prolongation? A) Verlängerung bei bisheriger Bank B) Wechsel zu anderer Bank C) Vorzeitige Rückzahlung D) Kündigung
28. Was ist eine Umschuldung? A) Verlängerung bei bisheriger Bank B) Wechsel zu anderer Bank C) Vorzeitige Rückzahlung D) Kündigung
29. Wie hoch ist die Forward-Prämie ca.? A) 0,001% pro Monat B) 0,01% pro Monat C) 0,1% pro Monat D) 1% pro Monat
30. Was ist eine Sondertilgung? A) Zusätzliche Tilgung ohne VFE B) Vorzeitige Rückzahlung mit VFE C) Keine Tilgung D) Steigende Tilgung

**Bonitätsprüfung (10 Fragen):**
31. Welches Gesetz regelt die Kreditwürdigkeitsprüfung? A) § 491 BGB B) § 511 BGB C) § 18a KWG D) GwG
32. Was ist der Schufa-Score? A) Bewertung der Kreditwürdigkeit B) Darlehensbetrag C) Zinssatz D) Tilgung
33. Welcher Schufa-Score ist sehr gut? A) >95% B) 90-95% C) 80-90% D) <80%
34. Welcher Schufa-Score ist schlecht? A) >95% B) 90-95% C) 80-90% D) <80%
35. Wie lange bleiben Negativmerkmale in der Schufa? A) 1 Jahr B) 3 Jahre C) 5 Jahre D) 10 Jahre
36. Was ist eine Haushaltsrechnung? A) Einnahmen - Ausgaben B) Einnahmen + Ausgaben C) Einnahmen × Ausgaben D) Einnahmen / Ausgaben
37. Welche Unterlagen benötigen Angestellte? A) Steuerbescheide B) Gehaltsabrechnungen C) BWA D) Rentenbescheid
38. Welche Unterlagen benötigen Selbstständige? A) Gehaltsabrechnungen B) 3 Jahre Steuerbescheide C) Rentenbescheid D) Keine
39. Wie viel Eigenkapital sollten Selbstständige mindestens haben? A) 10% B) 20% C) 30% D) 40%
40. Was ist ein Risikozuschlag bei Selbstständigen? A) 0,1-0,5% B) 1-2% C) 5-10% D) 10-20%

**Risiken & Absicherung (10 Fragen):**
41. Was ist das Zinsänderungsrisiko? A) Zinsen sinken B) Zinsen steigen C) Zinsen bleiben gleich D) Keine Zinsen
42. Was ist eine Risikolebensversicherung? A) Absicherung bei Tod B) Absicherung bei Krankheit C) Absicherung bei Jobverlust D) Absicherung bei Scheidung
43. Was ist eine Berufsunfähigkeitsversicherung? A) Absicherung bei Tod B) Absicherung bei Krankheit C) Absicherung bei Jobverlust D) Absicherung bei Scheidung
44. Wie hoch sollten die Rücklagen mindestens sein? A) 1 Monatsrate B) 3 Monatsraten C) 6 Monatsraten D) 12 Monatsraten
45. Was ist eine Zwangsversteigerung? A) Freiwilliger Verkauf B) Verkauf durch Gericht C) Verkauf durch Bank D) Verkauf durch Makler
46. Wann kann eine Bank das Darlehen kündigen? A) Nach 1 Monat Zahlungsverzug B) Nach 3 Monaten Zahlungsverzug C) Nach 6 Monaten Zahlungsverzug D) Nach 12 Monaten Zahlungsverzug
47. Was ist ein Tilgungssatzwechsel? A) Änderung der Tilgungsrate B) Änderung des Zinssatzes C) Änderung der Laufzeit D) Änderung des Darlehensbetrags
48. Was ist ein Mietkauf? A) Miete + Kaufoption B) Nur Miete C) Nur Kauf D) Verkauf gegen Rente
49. Was ist eine Leibrente? A) Miete + Kaufoption B) Verkauf gegen lebenslange Rente C) Darlehen für Senioren D) Versicherung
50. Was ist eine Reverse Mortgage? A) Miete + Kaufoption B) Verkauf gegen Rente C) Beleihung für Senioren D) Versicherung

**Lösungen:**
1-B, 2-B, 3-B, 4-B, 5-B, 6-A, 7-C, 8-B, 9-B, 10-B, 11-A, 12-B, 13-B, 14-B, 15-B, 16-B, 17-B, 18-A, 19-B, 20-B, 21-B, 22-B, 23-B, 24-B, 25-B, 26-A, 27-A, 28-B, 29-B, 30-A, 31-C, 32-A, 33-A, 34-D, 35-B, 36-A, 37-B, 38-B, 39-C, 40-A, 41-B, 42-A, 43-B, 44-C, 45-B, 46-B, 47-A, 48-A, 49-B, 50-C`,
    law: ["§34i GewO", "§ 491 BGB", "§ 511 BGB", "§ 489 BGB", "§ 498 BGB", "GwG", "DSGVO"],
    practice: `Beantworten Sie alle 50 Fragen und prüfen Sie Ihre Antworten. **Bestehensgrenze:** 35 von 50 Fragen richtig (70%).`,
    task: `Zählen Sie Ihre richtigen Antworten und berechnen Sie Ihre Punktzahl in Prozent.`,
    solution: `Siehe Lösungen oben. Bei <70%: Schwachstellen identifizieren und wiederholen.`,
    type: "Prüfungsvorbereitung"
  },

  day_32: {
    title: "Prüfungssimulation 2: Rechenaufgaben (20 Aufgaben)",
    theory: `Rechenaufgaben sind ein wichtiger Bestandteil der Sachkundeprüfung. Sie müssen Formeln anwenden und korrekt rechnen können. **Zeitlimit:** 60 Minuten. **Bestehensgrenze:** 70% (14 von 20 Aufgaben richtig). Themen: Annuität, Effektivzins, Haushaltsrechnung, Beleihungsauslauf, Vorfälligkeitsentschädigung, Grunderwerbsteuer, Ersparnis, Tilgungsplan. Rechnen Sie alle Aufgaben ohne Taschenrechner (nur einfache Berechnungen) und prüfen Sie anschließend Ihre Antworten.`,
    extendedTheory: `**20 Rechenaufgaben (Beispiele):**

1. Annuität: Darlehensbetrag 250.000 €, Zinssatz 3,5%, Tilgung 2%. **Monatliche Rate:** ?
2. Effektivzins: Sollzins 3,0%, Bearbeitungsgebühr 3.000 €, Darlehensbetrag 300.000 €, Laufzeit 10 Jahre. **Effektivzins:** ?
3. Haushaltsrechnung: Einkommen 5.000 €, Ausgaben 3.200 €. **Verfügbares Einkommen:** ?
4. Maximale Darlehensrate: Verfügbares Einkommen 1.800 €, Sicherheitspuffer 20%. **Maximale Rate:** ?
5. Beleihungsauslauf: Darlehensbetrag 280.000 €, Beleihungswert 350.000 €. **Beleihungsauslauf:** ?
6. Vorfälligkeitsentschädigung: Restschuld 200.000 €, Vertragszins 3,5%, Wiederanlagezins 2,0%, Restlaufzeit 5 Jahre. **VFE:** ?
7. Grunderwerbsteuer: Kaufpreis 400.000 €, Steuersatz 5%. **Grunderwerbsteuer:** ?
8. Nebenkosten: Kaufpreis 350.000 €, Nebenkosten 10%. **Nebenkosten:** ?
9. Eigenkapitalquote: Eigenkapital 80.000 €, Gesamtkosten 400.000 €. **Eigenkapitalquote:** ?
10. Darlehensbedarf: Gesamtkosten 450.000 €, Eigenkapital 90.000 €. **Darlehensbedarf:** ?
11. Ersparnis Umschuldung: Prolongation 4,5%, Umschuldung 4,0%, Restschuld 220.000 €, Laufzeit 10 Jahre, Kosten 440 €. **Nettoersparnis:** ?
12. Forward-Prämie: Aktueller Zins 3,5%, Vorlaufzeit 24 Monate, Prämie 0,01%/Monat. **Forward-Zinssatz:** ?
13. Tilgungszuschuss KfW: KfW-Darlehen 150.000 €, Zuschuss 25%. **Tilgungszuschuss:** ?
14. Monatliche Rate KfW: Darlehensbetrag 150.000 €, Zinssatz 0,01%, nur Zinsen. **Monatliche Rate:** ?
15. Sondertilgung: Darlehensbetrag 300.000 €, Sondertilgungsrecht 5%. **Maximale Sondertilgung:** ?
16. Zinsersparnis Sondertilgung: Sondertilgung 15.000 €, Zinssatz 3,5%. **Zinsersparnis pro Jahr:** ?
17. Bereitstellungszinsen: Darlehensbetrag 400.000 €, Zinssatz 0,25%/Monat, 9 Monate. **Bereitstellungszinsen:** ?
18. Steuerersparnis Selbstständige: Zinsen 15.000 €, AfA 11.000 €, Steuersatz 40%. **Steuerersparnis pro Jahr:** ?
19. Mieteinnahmen (netto): Brutto 1.750 €, Nebenkosten 20%. **Netto-Mieteinnahmen:** ?
20. Maximales Darlehen: Maximale Rate 1.500 €, Zinssatz 3,6%, Tilgung 2,2%. **Maximales Darlehen:** ?

**Lösungen:**
1. 1.145,83 € | 2. 3,10% | 3. 1.800 € | 4. 1.500 € | 5. 80% | 6. 15.000 € | 7. 20.000 € | 8. 35.000 € | 9. 20% | 10. 360.000 € | 11. 10.560 € | 12. 3,74% | 13. 37.500 € | 14. 1,25 € | 15. 15.000 € | 16. 525 € | 17. 9.000 € | 18. 10.400 € | 19. 1.400 € | 20. 310.345 €`,
    law: ["§ 491 BGB", "§ 502 BGB", "§ 6 PAngV"],
    practice: `Rechnen Sie alle 20 Aufgaben und prüfen Sie Ihre Antworten. **Bestehensgrenze:** 14 von 20 Aufgaben richtig (70%).`,
    task: `Zählen Sie Ihre richtigen Antworten und berechnen Sie Ihre Punktzahl in Prozent.`,
    solution: `Siehe Lösungen oben. Bei <70%: Formeln wiederholen und üben.`,
    type: "Prüfungsvorbereitung"
  },

  day_33: {
    title: "Prüfungssimulation 3: Fallstudien (3 Fallstudien)",
    theory: `Fallstudien testen Ihre Fähigkeit, komplexe Kundenberatungen durchzuführen. **Zeitlimit:** 120 Minuten. **Bestehensgrenze:** 70%. Themen: Erstberatung, Anschlussfinanzierung, Baufinanzierung. Sie müssen alle Schritte durchführen: Bedarfsanalyse, Finanzierungsplanung, Konditionsvergleich, Produktempfehlung, Risikoaufklärung. Bearbeiten Sie alle 3 Fallstudien vollständig und prüfen Sie anschließend Ihre Antworten.`,
    extendedTheory: `**Fallstudie 1: Erstberatung (40 Punkte)**
Kunde: Single, 32 Jahre, Einkommen 3.800 €, Ausgaben 2.100 €, Eigenkapital 60.000 €, Kaufpreis 280.000 €. Aufgaben: Haushaltsrechnung, Eigenkapitalquote, Darlehensbedarf, Produktempfehlung.

**Fallstudie 2: Anschlussfinanzierung (30 Punkte)**
Kunde: Restschuld 220.000 €, Prolongation 4,5%, Umschuldung 4,0%, Kosten 440 €. Aufgaben: Ersparnis berechnen, Produktempfehlung, Sonderkündigungsrecht prüfen.

**Fallstudie 3: Baufinanzierung mit KfW (30 Punkte)**
Kunde: Neubau KfW 40, Gesamtkosten 506.000 €, Eigenkapital 84.000 €, KfW 150.000 €, Hausbank 330.000 €. Aufgaben: Tilgungszuschuss berechnen, Monatliche Rate, Ersparnis.`,
    law: ["§ 491 BGB", "§ 511 BGB", "§ 489 BGB"],
    practice: `Bearbeiten Sie alle 3 Fallstudien vollständig. **Bestehensgrenze:** 70 von 100 Punkten.`,
    task: `Zählen Sie Ihre Punkte und berechnen Sie Ihre Punktzahl in Prozent.`,
    solution: `Siehe Lösungen in Tagen 26-28. Bei <70%: Fallstudien wiederholen.`,
    type: "Prüfungsvorbereitung"
  },

  day_34: {
    title: "Prüfungssimulation 4: Mündliche Prüfung (10 Fragen)",
    theory: `Die mündliche Prüfung testet Ihr Fachwissen und Ihre Beratungskompetenz. **Zeitlimit:** 30 Minuten. **Bestehensgrenze:** 70%. Themen: Gesetze, Beratungspflichten, Risiken, Produktempfehlungen. Sie müssen Fragen frei beantworten und Sachverhalte erklären können. Üben Sie die mündliche Prüfung laut (alleine oder mit Partner) und prüfen Sie anschließend Ihre Antworten.`,
    extendedTheory: `**10 Mündliche Prüfungsfragen (Beispiele):**

1. Erklären Sie die Erlaubnispflicht nach §34i GewO.
2. Welche Beratungspflichten haben Sie nach § 511 BGB?
3. Was ist der Unterschied zwischen Grundschuld und Hypothek?
4. Erklären Sie das Sonderkündigungsrecht nach § 489 BGB.
5. Welche Risiken müssen Sie bei einer Immobilienfinanzierung aufklären?
6. Wie berechnet sich die Vorfälligkeitsentschädigung?
7. Was ist ein Forward-Darlehen und wann lohnt es sich?
8. Welche Besonderheiten gelten für Selbstständige?
9. Was ist ein KfW-Darlehen und welche Vorteile bietet es?
10. Wie gehen Sie mit einem Kunden um, der schlechte Bonität hat?

**Bewertungskriterien:**
- Fachliche Korrektheit (50%)
- Verständlichkeit (25%)
- Vollständigkeit (25%)`,
    law: ["§34i GewO", "§ 491 BGB", "§ 511 BGB", "§ 489 BGB"],
    practice: `Beantworten Sie alle 10 Fragen laut und nehmen Sie sich auf (oder üben Sie mit Partner). **Bestehensgrenze:** 7 von 10 Fragen korrekt beantwortet.`,
    task: `Bewerten Sie Ihre Antworten nach den Kriterien: Fachliche Korrektheit, Verständlichkeit, Vollständigkeit.`,
    solution: `Siehe Lösungen in Tagen 1-20. Bei <70%: Gesetze und Praxisbeispiele wiederholen.`,
    type: "Prüfungsvorbereitung"
  },

  day_35: {
    title: "Prüfungssimulation 5: Gesamtprüfung (Alle Bereiche)",
    theory: `Die Gesamtprüfung kombiniert alle Bereiche: Multiple-Choice (30 Fragen), Rechenaufgaben (10 Aufgaben), Fallstudie (1 Fallstudie), Mündliche Fragen (5 Fragen). **Zeitlimit:** 180 Minuten. **Bestehensgrenze:** 70%. Dies ist Ihre letzte Prüfungssimulation vor der echten Sachkundeprüfung. Nehmen Sie sich Zeit, arbeiten Sie konzentriert und prüfen Sie anschließend Ihre Antworten. Identifizieren Sie Schwachstellen und wiederholen Sie diese in den Tagen 36-40.`,
    extendedTheory: `**Gesamtprüfung (100 Punkte):**

**Teil 1: Multiple-Choice (30 Punkte)**
30 Fragen aus allen Themenbereichen (siehe Tag 31)

**Teil 2: Rechenaufgaben (20 Punkte)**
10 Aufgaben (siehe Tag 32)

**Teil 3: Fallstudie (40 Punkte)**
1 komplexe Fallstudie (siehe Tage 26-30)

**Teil 4: Mündliche Fragen (10 Punkte)**
5 Fragen (siehe Tag 34)

**Bestehensgrenze:** 70 von 100 Punkten`,
    law: ["Alle Gesetze aus Tagen 1-30"],
    practice: `Bearbeiten Sie die Gesamtprüfung vollständig. **Zeitlimit:** 180 Minuten. **Bestehensgrenze:** 70 von 100 Punkten.`,
    task: `Zählen Sie Ihre Punkte und berechnen Sie Ihre Punktzahl in Prozent. Identifizieren Sie Schwachstellen.`,
    solution: `Siehe Lösungen in Tagen 31-34. Bei <70%: Schwachstellen wiederholen (Tage 36-40).`,
    type: "Prüfungsvorbereitung"
  },

  day_36: {
    title: "Wiederholung: Gesetze und Paragraphen",
    theory: `Wiederholen Sie alle wichtigen Gesetze und Paragraphen. **§34i GewO** (Erlaubnispflicht, Versicherung, Weiterbildung), **§ 491 BGB** (Immobiliar-Verbraucherdarlehensvertrag, ESIS-Merkblatt, Widerrufsrecht), **§ 511 BGB** (Beratungspflichten, Dokumentation, Aufbewahrung), **§ 489 BGB** (Sonderkündigungsrecht nach 10 Jahren), **§ 498 BGB** (Kündigung bei Zahlungsverzug), **§ 502 BGB** (Vorfälligkeitsentschädigung), **GwG** (Identifizierung, Herkunft der Mittel, Verdachtsmeldung), **DSGVO** (Informationspflichten, Rechte der Betroffenen, Datenpanne). Lernen Sie die Gesetze auswendig und üben Sie die Anwendung in Praxisbeispielen.`,
    extendedTheory: `**Wichtigste Gesetze:**

**§34i GewO:**
- Erlaubnispflicht für Darlehensvermittler
- Berufshaftpflichtversicherung mindestens 1 Mio. €
- Weiterbildung 15 Stunden/Jahr
- Sachkundeprüfung erforderlich

**§ 491 BGB:**
- Immobiliar-Verbraucherdarlehensvertrag
- ESIS-Merkblatt mindestens 7 Tage vor Vertragsschluss
- Widerrufsrecht 14 Tage

**§ 511 BGB:**
- Beratungs- und Dokumentationspflichten
- Bedarfsanalyse, Produktempfehlung, Risikoaufklärung
- Beratungsprotokoll 10 Jahre aufbewahren

**§ 489 BGB:**
- Sonderkündigungsrecht nach 10 Jahren
- 6 Monate Frist
- Keine Vorfälligkeitsentschädigung

**§ 498 BGB:**
- Kündigung bei Zahlungsverzug (3 Monate)
- Zwangsversteigerung droht

**§ 502 BGB:**
- Vorfälligkeitsentschädigung bei vorzeitiger Rückzahlung
- Berechnung: (Vertragszins - Wiederanlagezins) × Restschuld × Restlaufzeit

**GwG:**
- Identifizierung des Kunden (§ 11 GwG)
- Herkunft der Mittel klären (§ 11 Abs. 5 GwG)
- Verdachtsmeldung an FIU (§ 43 GwG)
- Aufbewahrung 5 Jahre (§ 8 GwG)

**DSGVO:**
- Informationspflichten (Art. 13 DSGVO)
- Rechte der Betroffenen (Art. 15-22 DSGVO)
- Datenpanne melden (Art. 33, 34 DSGVO)`,
    law: ["§34i GewO", "§ 491 BGB", "§ 511 BGB", "§ 489 BGB", "§ 498 BGB", "§ 502 BGB", "GwG", "DSGVO"],
    practice: `Lernen Sie alle Gesetze auswendig und üben Sie die Anwendung in Praxisbeispielen.`,
    task: `Schreiben Sie alle Gesetze aus dem Gedächtnis auf und prüfen Sie Ihre Antworten.`,
    solution: `Siehe oben. Bei Fehlern: Gesetze wiederholen.`,
    type: "Prüfungsvorbereitung"
  },

  day_37: {
    title: "Wiederholung: Formeln und Berechnungen",
    theory: `Wiederholen Sie alle wichtigen Formeln und Berechnungen. **Annuität:** Darlehensbetrag × (Zinssatz + Tilgung). **Effektivzins:** Sollzins + (Nebenkosten / Darlehensbetrag / Laufzeit). **Haushaltsrechnung:** Einnahmen - Ausgaben = Verfügbares Einkommen. **Maximale Darlehensrate:** Verfügbares Einkommen / 1,2. **Beleihungsauslauf:** Darlehensbetrag / Beleihungswert × 100%. **Vorfälligkeitsentschädigung:** (Vertragszins - Wiederanlagezins) × Restschuld × Restlaufzeit. **Grunderwerbsteuer:** Kaufpreis × Steuersatz. Üben Sie alle Formeln mit Beispielaufgaben.`,
    extendedTheory: `**Wichtigste Formeln:**

**Annuität:**
Annuität = Darlehensbetrag × (Zinssatz + Tilgung)
Beispiel: 300.000 € × (3,5% + 2%) = 16.500 €/Jahr = 1.375 €/Monat

**Effektivzins (vereinfacht):**
Effektivzins ≈ Sollzins + (Nebenkosten / Darlehensbetrag / Laufzeit)
Beispiel: 3,5% + (3.000 € / 300.000 € / 10) = 3,60%

**Haushaltsrechnung:**
Verfügbares Einkommen = Einnahmen - Ausgaben
Beispiel: 5.000 € - 3.200 € = 1.800 €

**Maximale Darlehensrate:**
Maximale Rate = Verfügbares Einkommen / 1,2 (20% Sicherheitspuffer)
Beispiel: 1.800 € / 1,2 = 1.500 €

**Beleihungsauslauf:**
Beleihungsauslauf = Darlehensbetrag / Beleihungswert × 100%
Beispiel: 280.000 € / 350.000 € × 100% = 80%

**Vorfälligkeitsentschädigung:**
VFE = (Vertragszins - Wiederanlagezins) × Restschuld × Restlaufzeit
Beispiel: (3,5% - 2,0%) × 200.000 € × 5 = 15.000 €

**Grunderwerbsteuer:**
Grunderwerbsteuer = Kaufpreis × Steuersatz
Beispiel: 400.000 € × 5% = 20.000 €

**Grundsteuer:**
Grundsteuer = Einheitswert × Grundsteuermesszahl × Hebesatz
(Formel komplex, meist vorgegeben)`,
    law: ["§ 6 PAngV", "§ 502 BGB"],
    practice: `Üben Sie alle Formeln mit Beispielaufgaben (siehe Tag 32).`,
    task: `Schreiben Sie alle Formeln aus dem Gedächtnis auf und rechnen Sie 10 Beispielaufgaben.`,
    solution: `Siehe oben. Bei Fehlern: Formeln wiederholen und üben.`,
    type: "Prüfungsvorbereitung"
  },

  day_38: {
    title: "Wiederholung: Praxisbeispiele und Fallstudien",
    theory: `Wiederholen Sie alle wichtigen Praxisbeispiele und Fallstudien. **Erstberatung:** Haushaltsrechnung, Eigenkapitalquote, Darlehensbedarf, Produktempfehlung. **Anschlussfinanzierung:** Prolongation vs. Umschuldung, Forward-Darlehen, Sonderkündigungsrecht. **Baufinanzierung:** KfW-Förderung, Tilgungszuschuss, Energieeffizienz. **Selbstständige:** 3 Jahre Steuerbescheide, höheres Eigenkapital, Risikozuschlag. **Komplexe Finanzierung:** Mehrere Probleme lösen, kreative Lösungen. Arbeiten Sie alle Fallstudien aus Tagen 26-30 erneut durch.`,
    extendedTheory: `**Wichtigste Praxisbeispiele:**

**Erstberatung (Tag 26):**
- Haushaltsrechnung erstellen
- Eigenkapitalquote prüfen (mindestens 20%)
- Darlehensbedarf berechnen
- Konditionsvergleich (3 Banken)
- Produktempfehlung begründen
- Risikoaufklärung (Zinsänderung, Zahlungsunfähigkeit, Wertverlust)

**Anschlussfinanzierung (Tag 27):**
- Prolongationsangebot prüfen
- Umschuldungsangebote einholen
- Ersparnis berechnen (Nettoersparnis nach Abzug Kosten)
- Forward-Darlehen prüfen (lohnt sich bei erwartetem Zinsanstieg)
- Sonderkündigungsrecht (nach 10 Jahren, 6 Monate Frist)

**Baufinanzierung mit KfW (Tag 28):**
- KfW-Programme kennen (KfW 261, KfW 300)
- Tilgungszuschuss berechnen (25% bei KfW 40)
- Kombination KfW + Hausbank
- Energieeffizienz-Experte (Baubegleitung erforderlich)
- Ersparnis berechnen (Tilgungszuschuss + Zinsersparnis)

**Selbstständige (Tag 29):**
- 3 Jahre Steuerbescheide
- Durchschnittseinkommen berechnen
- Höheres Eigenkapital (30% statt 20%)
- Risikozuschlag (0,1-0,5%)
- Steuerliche Vorteile (Zinsen + AfA absetzbar)

**Komplexe Finanzierung (Tag 30):**
- Mehrere Probleme identifizieren
- Kreative Lösungen finden (Ratenkredite ablösen, Eltern-Darlehen, Renovierung strecken)
- Mieteinnahmen nutzen
- Arbeitgeber-Bestätigung einholen
- Risiken minimieren`,
    law: ["§ 491 BGB", "§ 511 BGB", "§ 489 BGB"],
    practice: `Arbeiten Sie alle Fallstudien aus Tagen 26-30 erneut durch.`,
    task: `Bearbeiten Sie 3 Fallstudien Ihrer Wahl vollständig und prüfen Sie Ihre Antworten.`,
    solution: `Siehe Lösungen in Tagen 26-30. Bei Fehlern: Fallstudien wiederholen.`,
    type: "Prüfungsvorbereitung"
  },

  day_39: {
    title: "Wiederholung: Schwachstellen identifizieren und beheben",
    theory: `Identifizieren Sie Ihre Schwachstellen aus den Prüfungssimulationen (Tage 31-35) und wiederholen Sie diese gezielt. **Schwachstellen-Analyse:** Welche Fragen haben Sie falsch beantwortet? Welche Themenbereiche sind unklar? Welche Formeln müssen Sie üben? **Wiederholung:** Arbeiten Sie die Schwachstellen systematisch durch (Gesetze, Formeln, Praxisbeispiele). **Übung:** Machen Sie zusätzliche Übungsaufgaben in den Schwachstellen-Bereichen. **Ziel:** Alle Schwachstellen beheben, 100% Prüfungssicherheit erreichen.`,
    extendedTheory: `**Schwachstellen-Analyse:**

**Schritt 1: Prüfungsergebnisse auswerten**
- Tag 31 (Multiple-Choice): Welche Fragen falsch?
- Tag 32 (Rechenaufgaben): Welche Aufgaben falsch?
- Tag 33 (Fallstudien): Welche Fallstudien < 70%?
- Tag 34 (Mündlich): Welche Fragen unklar?
- Tag 35 (Gesamtprüfung): Gesamtpunktzahl < 70%?

**Schritt 2: Themenbereiche identifizieren**
- Rechtliche Grundlagen (§34i GewO, BGB, GwG)?
- Darlehensarten (Annuität, Tilgung, Endfällig)?
- Finanzierungsplanung (Eigenkapital, Haushaltsrechnung)?
- Bonitätsprüfung (Schufa, Einkommensprüfung)?
- Risiken (Zinsänderung, Zahlungsunfähigkeit)?
- Verbraucherschutz (Widerrufsrecht, Schlichtung)?
- Datenschutz (DSGVO)?

**Schritt 3: Wiederholung**
- Gesetze: Tage 1-10, 36
- Formeln: Tage 11-20, 37
- Praxisbeispiele: Tage 21-30, 38

**Schritt 4: Übung**
- Zusätzliche Multiple-Choice-Fragen
- Zusätzliche Rechenaufgaben
- Zusätzliche Fallstudien

**Schritt 5: Erfolgskontrolle**
- Prüfungssimulationen wiederholen (Tage 31-35)
- Ziel: 100% Prüfungssicherheit`,
    law: ["Alle Gesetze aus Tagen 1-30"],
    practice: `Identifizieren Sie Ihre Schwachstellen und wiederholen Sie diese gezielt.`,
    task: `Erstellen Sie eine Liste Ihrer Schwachstellen und arbeiten Sie diese systematisch durch.`,
    solution: `Siehe Lösungen in Tagen 1-38. Bei Schwachstellen: Gezielt wiederholen und üben.`,
    type: "Prüfungsvorbereitung"
  },

  day_40: {
    title: "Abschluss: Letzte Wiederholung und Prüfungsvorbereitung",
    theory: `**Herzlichen Glückwunsch!** Sie haben die 40-tägige Vorbereitung auf die Sachkundeprüfung §34i abgeschlossen. Heute wiederholen Sie alle wichtigen Inhalte ein letztes Mal und bereiten sich mental auf die Prüfung vor. **Gesetze:** §34i GewO, § 491 BGB, § 511 BGB, § 489 BGB, § 498 BGB, GwG, DSGVO. **Formeln:** Annuität, Effektivzins, Haushaltsrechnung, Beleihungsauslauf, Vorfälligkeitsentschädigung. **Praxisbeispiele:** Erstberatung, Anschlussfinanzierung, Baufinanzierung, Selbstständige, Komplexe Finanzierung. **Prüfungstipps:** Ruhig bleiben, Zeitmanagement, Fragen genau lesen, Rechenaufgaben systematisch lösen. **Viel Erfolg bei der Sachkundeprüfung!**`,
    extendedTheory: `**Letzte Wiederholung:**

**Gesetze (10 Min):**
- §34i GewO: Erlaubnispflicht, Versicherung 1 Mio. €, Weiterbildung 15 Std/Jahr
- § 491 BGB: ESIS-Merkblatt 7 Tage vorher, Widerrufsrecht 14 Tage
- § 511 BGB: Beratungspflichten, Protokoll 10 Jahre
- § 489 BGB: Sonderkündigungsrecht nach 10 Jahren, 6 Monate Frist
- § 498 BGB: Kündigung bei 3 Monaten Zahlungsverzug
- GwG: Identifizierung, Herkunft klären, Verdachtsmeldung FIU
- DSGVO: Informationspflichten, Datenpanne melden

**Formeln (10 Min):**
- Annuität = Darlehensbetrag × (Zinssatz + Tilgung)
- Effektivzins ≈ Sollzins + (Nebenkosten / Darlehensbetrag / Laufzeit)
- Maximale Rate = Verfügbares Einkommen / 1,2
- Beleihungsauslauf = Darlehensbetrag / Beleihungswert × 100%
- VFE = (Vertragszins - Wiederanlagezins) × Restschuld × Restlaufzeit

**Praxisbeispiele (20 Min):**
- Erstberatung: Haushaltsrechnung, Eigenkapitalquote, Produktempfehlung
- Anschlussfinanzierung: Prolongation vs. Umschuldung, Ersparnis
- Baufinanzierung: KfW-Förderung, Tilgungszuschuss 25%
- Selbstständige: 3 Jahre Steuerbescheide, 30% Eigenkapital
- Komplexe Finanzierung: Kreative Lösungen, Risiken minimieren

**Prüfungstipps (10 Min):**
- **Vorbereitung:** Ausgeschlafen, entspannt, Unterlagen (Ausweis, Anmeldebestätigung)
- **Zeitmanagement:** Nicht zu lange bei einer Frage, schwierige Fragen überspringen und später wiederkommen
- **Ruhig bleiben:** Nervosität ist normal, tief durchatmen
- **Fragen genau lesen:** Schlüsselwörter markieren (z.B. "nicht", "mindestens", "höchstens")
- **Rechenaufgaben:** Formel hinschreiben, dann rechnen, Ergebnis prüfen
- **Fallstudien:** Systematisch vorgehen (Situation, Problem, Lösung)

**Mentale Vorbereitung (10 Min):**
- **Erfolg visualisieren:** Stellen Sie sich vor, wie Sie die Prüfung bestehen
- **Positive Affirmationen:** "Ich bin gut vorbereitet", "Ich schaffe das"
- **Entspannung:** Meditation, Atemübungen, Spaziergang

**Nach der Prüfung:**
- Nicht über Fehler grübeln
- Erfolg feiern
- Weiterbildung planen (15 Stunden/Jahr)

**VIEL ERFOLG BEI DER SACHKUNDEPRÜFUNG §34i!**`,
    law: ["§34i GewO", "§ 491 BGB", "§ 511 BGB", "§ 489 BGB", "§ 498 BGB", "GwG", "DSGVO"],
    practice: `Wiederholen Sie alle wichtigen Inhalte ein letztes Mal und bereiten Sie sich mental auf die Prüfung vor.`,
    task: `Erstellen Sie eine Checkliste für die Prüfung (Unterlagen, Anfahrt, Zeitplan).`,
    solution: `Sie sind bestens vorbereitet! Viel Erfolg bei der Sachkundeprüfung §34i!`,
    type: "Prüfungsvorbereitung"
  },

};
