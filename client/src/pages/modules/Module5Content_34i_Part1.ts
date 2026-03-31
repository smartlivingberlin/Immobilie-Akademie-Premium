// Modul 5: Darlehensvermittlung §34i GewO
// 40 Tage | 320 UE | NUR §34i-Inhalte (KEINE Wiederholungen!)
// Teil 1: Tage 1-10 (Theorie)

export const contentDataModule5_34i_Part1: Record<string, {
  title: string;
  theory: string;
  extendedTheory?: string;
  law: string[];
  practice: string;
  task?: string;
  tasks?: Array<{type?: string; question: string; hint?: string}>;
  quiz?: Array<{question: string; options?: string[]; answer?: string; explanation?: string}>;
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
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Einführung §34i GewO: Rechtliche Grundlagen der Immobiliardarlehensvermittlung' sind für Ihre Tätigkeit als Darlehensvermittler §34i-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Einführung §34i GewO: Rechtliche Grundlagen der Immobiliardarlehensvermittlung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34i GewO, ImmVermV, ESIS, Kreditwürdigkeit."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Einführung §34i GewO: Rechtliche Grundlagen der Immobiliardarlehensvermittlung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],

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
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Rechtsfähigkeit, Geschäftsfähigkeit und Vertragsrecht' sind für Ihre Tätigkeit als Darlehensvermittler §34i-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Rechtsfähigkeit, Geschäftsfähigkeit und Vertragsrecht'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34i GewO, ImmVermV, ESIS, Kreditwürdigkeit."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Rechtsfähigkeit, Geschäftsfähigkeit und Vertragsrecht' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],

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
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Grundstücke, Erbbaurecht, Wohnungseigentum - Rechtliche Grundlagen' sind für Ihre Tätigkeit als Darlehensvermittler §34i-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Grundstücke, Erbbaurecht, Wohnungseigentum - Rechtliche Grundlagen'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34i GewO, ImmVermV, ESIS, Kreditwürdigkeit."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Grundstücke, Erbbaurecht, Wohnungseigentum - Rechtliche Grundlagen' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],

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
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Grundbuch: Aufbau, Funktion und Eintragungen' sind für Ihre Tätigkeit als Darlehensvermittler §34i-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Grundbuch: Aufbau, Funktion und Eintragungen'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34i GewO, ImmVermV, ESIS, Kreditwürdigkeit."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Grundbuch: Aufbau, Funktion und Eintragungen' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],

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
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Immobiliar-Verbraucherdarlehensvertrag und Verbraucherkreditrecht' sind für Ihre Tätigkeit als Darlehensvermittler §34i-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Immobiliar-Verbraucherdarlehensvertrag und Verbraucherkreditrecht'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34i GewO, ImmVermV, ESIS, Kreditwürdigkeit."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Immobiliar-Verbraucherdarlehensvertrag und Verbraucherkreditrecht' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],

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
