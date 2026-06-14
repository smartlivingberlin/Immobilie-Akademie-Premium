// Modul 1: Einführung in die Immobilienbranche - Maximalist Content
// 20 Tage | 160 UE | Vollständig erweitert nach Modul-2-Standard

export const contentDataModule1Maximal: Record<string, {
  title: string;
  theory: string;
  extendedTheory?: string;
  law: string[];
  practice: string;
  caseStudy?: string;
  task?: string;
  tasks?: Array<{type?: string; question: string; hint?: string}>;
  quiz?: Array<{question: string; options?: string[]; answer?: string; correct?: number; explanation?: string}>;
  solution?: string;
  type?: string;
}> = {
  // === Woche 1: Einführung & Markt (Tag 1-5) ===
  
  day_1: {
    title: "Einführung in die Immobilienbranche",
    theory: "Die Immobilienwirtschaft ist einer der bedeutendsten Wirtschaftszweige in Deutschland. Sie umfasst den gesamten Lebenszyklus von Immobilien: von der Planung und Entwicklung über die Bauphase und Nutzung bis hin zur Verwertung oder dem Abriss.",
    extendedTheory: `
### Die Immobilienwirtschaft: Ein volkswirtschaftlicher Gigant

Die Immobilienwirtschaft ist mit rund 20% der gesamten Bruttowertschöpfung größer als die Automobilindustrie. Über 3 Millionen Menschen arbeiten direkt oder indirekt in diesem Sektor. Immobilien stellen den größten Teil des privaten Vermögens dar (ca. 60-70%).

**1. Die Akteure im Markt**

Der Markt ist komplex und vielschichtig. Wir unterscheiden folgende Hauptgruppen:

**A. Die Nutzer (Nachfrager)**
- **Private Haushalte:** Mieter und Selbstnutzer (Eigentümer)
- **Gewerbe:** Unternehmen, die Büro-, Handels- oder Logistikflächen benötigen
- **Öffentliche Hand:** Bund, Länder und Kommunen (Schulen, Verwaltung)

**B. Die Anbieter**
- **Projektentwickler:** Kaufen Grundstücke, planen Neubauten und verkaufen diese
- **Bestandshalter:** Wohnungsbaugesellschaften, Fonds, private Vermieter
- **Bauträger:** Bauen auf eigenem Grund und verkaufen "Schlüsselfertig" (Bauträgervertrag)

**C. Die Dienstleister (Intermediäre)**
- **Makler:** Vermitteln Verträge zwischen Angebot und Nachfrage (§ 652 BGB)
- **Verwalter:** Kümmern sich um den Bestand (WEG-Verwaltung, Mietverwaltung)
- **Sachverständige:** Ermitteln den Wert von Immobilien
- **Finanzierer:** Banken, Bausparkassen, Versicherungen

**2. Marktsegmente**

Immobilienmarkt ist nicht gleich Immobilienmarkt. Wir unterteilen in:
- **Wohnimmobilien:** EFH (Einfamilienhaus), MFH (Mehrfamilienhaus), ETW (Eigentumswohnung)
- **Gewerbeimmobilien:** Büro, Handel, Logistik, Produktion
- **Sonderimmobilien:** Hotels, Pflegeheime, Parkhäuser

**3. Aktuelle Trends & Herausforderungen**
- **Demografischer Wandel:** Alternde Gesellschaft, Urbanisierung (Landflucht)
- **ESG (Environment, Social, Governance):** Nachhaltigkeit wird zum entscheidenden Wertfaktor
- **Digitalisierung (PropTech):** Digitale Vermarktung, Smart Home, digitale Verwaltung
- **Zinswende:** Der Anstieg der Bauzinsen seit 2022 hat den Markt fundamental verändert (Käufermarkt vs. Verkäufermarkt)
    `,
    law: [
      "[Art. 14 GG](https://www.gesetze-im-internet.de/gg/art_14.html) (Eigentumsgarantie)",
      "[§ 90 BGB](https://www.gesetze-im-internet.de/bgb/__90.html) (Begriff der Sache)",
      "[§ 94 BGB](https://www.gesetze-im-internet.de/bgb/__94.html) (Wesentliche Bestandteile)",
      "[§ 34c GewO](https://www.gesetze-im-internet.de/gewo/__34c.html) (Gewerbeerlaubnis)"
    ],
    practice: `
### Marktanalyse: Der lokale Marktbericht

Um als Immobilienprofi erfolgreich zu sein, müssen Sie Ihren lokalen Markt verstehen.

**Aufgabe: Erstellen Sie ein Mikro-Marktprofil für Ihren Standort**

Recherchieren Sie folgende Daten für Ihre Stadt / Ihren Landkreis:

**1. Demografie**
- Einwohnerzahl & Entwicklung (letzte 5 Jahre)
- Kaufkraftindex (GfK-Index, Bundesdurchschnitt = 100)
- Arbeitslosenquote

**2. Wohnungsmarkt**
- Durchschnittliche Kaltmiete (€/m²) für Bestandswohnungen
- Durchschnittliche Kaltmiete (€/m²) für Neubau
- Kaufpreise für Eigentumswohnungen (Bestand vs. Neubau)
- Leerstandsquote

**3. Quellen**
Nutzen Sie folgende kostenlose Quellen:
- Grundstücksmarktbericht des lokalen Gutachterausschusses (oft teilweise kostenlos)
- Marktberichte der großen Maklerhäuser (Engel & Völkers, JLL, CBRE)
- Online-Portale (Immobilienscout24 Preisatlas)
- Statistische Landesämter

**Ziel:** Sie sollen in der Lage sein, einem Kunden in 2 Minuten zu erklären, wie sich der Markt in Ihrer Region entwickelt.
    `,
    caseStudy: `
**Fall: Der Quereinsteiger**

Herr M. (45) ist Bankkaufmann und will sich als Immobilienmakler selbstständig machen. Er hat keine Immobilienerfahrung, aber gute Kontakte zu vermögenden Kunden.

**Fragen:**
1. Welche Voraussetzungen muss er erfüllen?
2. Welche Kompetenzen fehlen ihm?
3. Wie kann er sich vorbereiten?

**Analyse:**
- Formale Voraussetzung: §34c-Erlaubnis (Zuverlässigkeit, geordnete Vermögensverhältnisse) - erfüllbar
- Fachliche Lücken: Immobilienbewertung, Baurecht, Marktkenntnis
- Empfehlung: IHK-Zertifikat "Immobilienmakler" + Praktikum bei etabliertem Makler
    `,
    task: "Erstellen Sie eine Mindmap mit allen Akteuren der Immobilienwirtschaft und deren Beziehungen zueinander.",
    solution: `
**Musterlösung: Mindmap Immobilienwirtschaft**

**Zentrum: Immobilie**

**Nachfrager:**
- Private Haushalte (Mieter, Käufer)
- Unternehmen (Gewerbe)
- Investoren (Kapitalanleger)

**Anbieter:**
- Projektentwickler
- Bauträger
- Bestandshalter (Vermieter)

**Dienstleister:**
- Makler (Vermittlung)
- Verwalter (Bestandspflege)
- Gutachter (Bewertung)
- Finanzierungsvermittler
- Notare
- Architekten & Ingenieure

**Beziehungen:**
- Makler vermittelt zwischen Anbieter und Nachfrager
- Finanzierungsvermittler verbindet Nachfrager mit Banken
- Gutachter bewertet für Banken und Käufer
- Verwalter arbeitet für Eigentümer und Eigentümergemeinschaften
    `,
    type: "Grundlagen"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Einführung in die Immobilienbranche' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Einführung in die Immobilienbranche'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'Immobilienwirtschaft, Akteure, Marktsegmente, ESG, PropTech' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Wie viel Prozent der deutschen Bruttowertschöpfung entfällt auf die Immobilienwirtschaft?",
        options: [
          "ca. 5%",
          "ca. 10%",
          "ca. 20%",
          "ca. 35%"
        ],
        correct: 2,
        explanation: "Die Immobilienwirtschaft macht rund 20% der Bruttowertschöpfung aus — mehr als die Automobilindustrie."
      }
    ],},

  day_2: {
    title: "Karrierepfade & Berufsfelder",
    theory: "Die Immobilienwirtschaft bietet vielfältige Karrieremöglichkeiten. Von der klassischen Maklertätigkeit über die Verwaltung bis hin zur Gutachtertätigkeit und Finanzierungsberatung.",
    extendedTheory: `
### Berufsbilder in der Immobilienwirtschaft

**1. Der Immobilienmakler (§34c GewO)**

**Tätigkeit:** Vermittlung von Kauf-, Verkaufs- und Mietverträgen

**Voraussetzungen:**
- Erlaubnis nach §34c GewO (Zuverlässigkeit, geordnete Vermögensverhältnisse)
- KEINE fachliche Prüfung erforderlich (aber empfohlen)
- Weiterbildungspflicht: 20 Stunden in 3 Jahren (§34c Abs. 2a GewO, §15b MaBV) ⚠️ **Aktuell (Stand 2025/2026):** Das Bundeskabinett hat am 5.11.2025 beschlossen, diese Weiterbildungspflicht abzuschaffen (Bürokratierückbau-Gesetz). Bis zur Verkündung im Bundesgesetzblatt gilt noch die alte Regelung.

**Verdienstmöglichkeiten:**
- Provision: 3-7% vom Kaufpreis (je nach Region und Marktsegment)
- Durchschnittseinkommen Selbstständiger: 40.000 - 120.000 € p.a. (stark schwankend)
- Angestellte Makler: 30.000 - 60.000 € p.a. + Provision

**2. Der Immobilienverwalter (§34c GewO)**

**Tätigkeit:** Verwaltung von Wohnungseigentum (WEG) oder Mietobjekten

**Voraussetzungen:**
- Erlaubnis nach §34c GewO
- Empfohlen: Zertifikat "Geprüfter Immobilienverwalter (IHK)"

**Verdienstmöglichkeiten:**
- Verwaltervergütung: 20-35 € pro Einheit/Monat (WEG)
- Durchschnittseinkommen: 35.000 - 70.000 € p.a.

**3. Der Immobiliengutachter**

**Tätigkeit:** Wertermittlung von Immobilien

**Voraussetzungen:**
- Studium (Immobilienwirtschaft, Architektur, Bauingenieurwesen) ODER
- Langjährige Berufserfahrung + Zertifizierung (z.B. HypZert)
- Öffentliche Bestellung (optional, aber wertvoll)

**Verdienstmöglichkeiten:**
- Gutachten: 1.500 - 5.000 € pro Auftrag
- Durchschnittseinkommen: 50.000 - 100.000 € p.a.

**4. Der Darlehensvermittler (§34i GewO)**

**Tätigkeit:** Vermittlung von Immobilienfinanzierungen

**Voraussetzungen:**
- Erlaubnis nach §34i GewO
- Sachkundeprüfung (IHK) ZWINGEND erforderlich
- Berufshaftpflichtversicherung

**Verdienstmöglichkeiten:**
- Provision: 0,5-1,5% der Darlehenssumme
- Durchschnittseinkommen: 40.000 - 90.000 € p.a.
    `,
    law: [
      "[§ 34c GewO](https://www.gesetze-im-internet.de/gewo/__34c.html) (Makler & Verwalter)",
      "[§ 34i GewO](https://www.gesetze-im-internet.de/gewo/__34i.html) (Darlehensvermittler)",
      "[MaBV](https://www.gesetze-im-internet.de/gewo_34cdv/) (Makler- und Bauträgerverordnung)"
    ],
    practice: `
### Praxis-Übung: Persönliches Kompetenzprofil

**Erstellen Sie Ihr persönliches Kompetenzprofil:**

**1. Stärken-Analyse**
Bewerten Sie sich selbst (1-10):
- Kommunikationsfähigkeit: ___
- Verhandlungsgeschick: ___
- Technisches Verständnis: ___
- Zahlenaffinität: ___
- Empathie: ___
- Durchsetzungsvermögen: ___
- Organisationstalent: ___

**2. Berufsbild-Matching**
- **Makler:** Kommunikation + Verhandlung + Empathie (Durchschnitt > 7)
- **Verwalter:** Organisation + Technisches Verständnis + Zahlen (Durchschnitt > 7)
- **Gutachter:** Technisches Verständnis + Zahlen (Durchschnitt > 8)
- **Finanzierungsvermittler:** Zahlen + Kommunikation + Empathie (Durchschnitt > 7)

**3. Entwicklungsfelder**
Identifizieren Sie Ihre 3 größten Schwächen und definieren Sie konkrete Maßnahmen zur Verbesserung.
    `,
    caseStudy: `
**Fall: Die Karriereentscheidung**

Frau S. (28) hat BWL studiert und 3 Jahre in einer Bank gearbeitet. Sie will in die Immobilienbranche wechseln.

**Optionen:**
1. Einstieg als angestellte Maklerin bei großem Unternehmen
2. Sofortige Selbstständigkeit als Maklerin
3. Einstieg als Assistentin in einer Verwaltung

**Analyse:**
- **Option 1:** Sicher, Lernmöglichkeit, aber geringeres Einkommen
- **Option 2:** Hohes Risiko, hohe Freiheit, aber ohne Netzwerk schwierig
- **Option 3:** Stabiles Einkommen, gute Einarbeitung, aber weniger dynamisch

**Empfehlung:** Option 1 für 2-3 Jahre, dann Selbstständigkeit mit aufgebautem Netzwerk
    `,
    task: "Erstellen Sie einen 5-Jahres-Karriereplan mit konkreten Meilensteinen (Zertifikate, Umsatzziele, Spezialisierungen).",
    solution: `
**Muster-Karriereplan (5 Jahre)**

**Jahr 1: Grundlagen & Erlaubnis**
- Q1: §34c-Erlaubnis beantragen
- Q2: IHK-Zertifikat "Immobilienmakler" absolvieren
- Q3-Q4: Anstellung bei etabliertem Makler (Lernen + Netzwerk)
- Ziel: 10 Transaktionen begleiten

**Jahr 2: Spezialisierung**
- Fokus: Wohnimmobilien in Stadtgebiet XY
- Zertifikat: "Home Staging Berater"
- Ziel: 15 eigene Vermittlungen, 50.000 € Umsatz

**Jahr 3: Selbstständigkeit**
- Gründung eigenes Maklerbüro
- Aufbau digitale Präsenz (Website, Social Media)
- Ziel: 25 Vermittlungen, 80.000 € Umsatz

**Jahr 4: Expansion**
- Einstellung erste Assistenz
- Erweiterung auf Gewerbeimmobilien
- Ziel: 40 Vermittlungen, 150.000 € Umsatz

**Jahr 5: Etablierung**
- Aufbau Verwaltungsbereich (zusätzliches Standbein)
- Zertifikat: "Geprüfter Immobilienverwalter (IHK)"
- Ziel: 50 Vermittlungen + 100 Verwaltungseinheiten, 200.000 € Umsatz
    `,
    type: "Karriere"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Karrierepfade & Berufsfelder' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Karrierepfade & Berufsfelder'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'Makler, Verwalter, Gutachter, Darlehensvermittler Berufsbilder' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Welche Erlaubnis benötigt ein Immobilienmakler zwingend?",
        options: [
          "§ 34a GewO",
          "§ 34c GewO",
          "§ 34i GewO",
          "Keine — freier Beruf"
        ],
        correct: 1,
        explanation: "§ 34c GewO regelt die Erlaubnispflicht für Immobilienmakler, Darlehensvermittler und Bauträger."
      }
    ],},

  day_3: {
    title: "Persönliche Eignung & Soft Skills",
    theory: "Erfolg in der Immobilienbranche hängt nicht nur von Fachwissen ab, sondern maßgeblich von persönlichen Eigenschaften und sozialen Kompetenzen.",
    extendedTheory: `
### Die 7 Schlüsselkompetenzen für Immobilienprofis

**1. Kommunikationsfähigkeit**
- Aktives Zuhören: Verstehen Sie, was der Kunde WIRKLICH will (nicht nur, was er sagt)
- Klare Sprache: Vermeiden Sie Fachjargon bei Laien
- Schriftliche Kommunikation: E-Mails, Exposés, Verträge müssen fehlerfrei sein

**2. Empathie**
- Immobilienkauf/-verkauf ist emotional (oft größte Transaktion im Leben)
- Verstehen Sie die Ängste und Hoffnungen Ihrer Kunden
- Bauen Sie Vertrauen auf durch ehrliche Beratung

**3. Verhandlungsgeschick**
- Win-Win-Situationen schaffen (nicht "Verkäufer vs. Käufer")
- Kompromisse finden ohne eigene Position aufzugeben
- Timing: Wann drängen, wann Geduld haben?

**4. Resilienz**
- Umgang mit Absagen: 9 von 10 Leads führen NICHT zum Abschluss
- Mentale Stärke: Provisionsgeschäft bedeutet schwankende Einkommen
- Durchhaltevermögen: Erfolg kommt oft erst nach 2-3 Jahren

**5. Organisationstalent**
- Mehrere Objekte/Kunden parallel betreuen
- Terminmanagement: Besichtigungen, Notartermine, Behördengänge
- Dokumentation: Lückenlose Nachweise für GwG, MaBV

**6. Technische Affinität**
- CRM-Systeme, Portale, digitale Unterschrift
- Grundverständnis Bautechnik (für Beratung)
- Social Media & Online-Marketing

**7. Ethik & Integrität**
- Transparenz: Keine versteckten Kosten, keine Doppeltätigkeit ohne Offenlegung
- IVD-Standesregeln: Berufsethos der Branche
- Langfristiges Denken: Reputation ist wichtiger als kurzfristiger Gewinn
    `,
    law: [
      "[IVD Standesregeln](https://ivd.net/) (Berufsethos)",
      "[§ 34c GewO](https://www.gesetze-im-internet.de/gewo/__34c.html) (Zuverlässigkeit)"
    ],
    practice: `
### Praxis-Übung: Rollenspiel "Der schwierige Kunde"

**Szenario:**
Ein Kunde ruft an und beschwert sich lautstark, dass das von Ihnen vermittelte Objekt "völlig überteuert" sei. Er droht, die Provision nicht zu zahlen und Sie "anzuzeigen".

**Ihre Aufgabe:**
Führen Sie das Gespräch so, dass:
1. Der Kunde sich gehört fühlt
2. Sie Ihre Position sachlich darlegen
3. Eine Lösung gefunden wird

**Gesprächsleitfaden:**

**Phase 1: Deeskalation (2 Min.)**
- "Ich verstehe Ihren Ärger. Lassen Sie uns das in Ruhe besprechen."
- Aktiv zuhören, NICHT unterbrechen

**Phase 2: Sachliche Klärung (5 Min.)**
- "Auf welcher Basis kommen Sie zu der Einschätzung 'überteuert'?"
- Vergleichsobjekte zeigen, Marktdaten präsentieren

**Phase 3: Lösungsfindung (3 Min.)**
- "Was wäre aus Ihrer Sicht eine faire Lösung?"
- Kompromiss anbieten (z.B. Nachverhandlung mit Verkäufer, wenn objektiv begründbar)

**Phase 4: Abschluss**
- Schriftliche Zusammenfassung des Gesprächs
- Nächste Schritte definieren
    `,
    caseStudy: `
**Fall: Der unethische Kollege**

Sie arbeiten in einem Maklerbüro. Ein Kollege erzählt Ihnen stolz, dass er einem Kunden ein Objekt für 500.000 € vermittelt hat, obwohl er weiß, dass der Marktwert nur bei 420.000 € liegt. "Der Kunde wollte es unbedingt, also habe ich ihm den Gefallen getan."

**Rechtliche Analyse:**
- Makler hat KEINE Pflicht zur Wertermittlung (ist Sache des Käufers/Gutachters)
- ABER: Sittenwidrigkeit? Wenn Makler bewusst überteuerte Objekte vermittelt, kann das als Täuschung gewertet werden
- Haftungsrisiko: Schadensersatz nach § 280 BGB möglich

**Ethische Analyse:**
- Verstoß gegen IVD-Standesregeln (Transparenz, Kundeninteresse)
- Langfristig: Rufschädigung, Verlust der Erlaubnis möglich

**Ihre Reaktion:**
- Ansprechen des Kollegen (unter vier Augen)
- Bei Wiederholung: Meldung an Geschäftsführung
- Eigene Distanzierung dokumentieren
    `,
    task: "Führen Sie eine SWOT-Analyse für Ihre eigene Person durch (Stärken, Schwächen, Chancen, Risiken).",
    solution: `
**Muster-SWOT-Analyse (Beispiel)**

**Stärken (Strengths):**
- Ausgezeichnete Kommunikationsfähigkeit
- Technisches Verständnis (IT-Affinität)
- Hohes Engagement und Lernbereitschaft
- Gutes Netzwerk in der Region

**Schwächen (Weaknesses):**
- Wenig Erfahrung in Verhandlungen
- Scheu vor Kaltakquise
- Lücken im Baurecht
- Zeitmanagement verbesserungswürdig

**Chancen (Opportunities):**
- Wachsender Markt für Seniorenimmobilien in meiner Region
- Digitalisierung ermöglicht effizientere Prozesse
- Kooperationen mit Banken/Notaren möglich
- Spezialisierung auf Nische (z.B. Denkmalimmobilien)

**Risiken (Threats):**
- Zinswende dämpft Nachfrage
- Hoher Wettbewerb in meiner Stadt (15 Makler auf 50.000 Einwohner)
- Regulierung wird strenger (mehr Pflichten)
- Plattformen (ImmoScout24) werden zu Konkurrenten

**Maßnahmen:**
- Schwächen: Verhandlungsseminar besuchen, Akquise-Coaching
- Chancen: Fortbildung "Senioren-Immobilien-Berater", Digitalisierung vorantreiben
- Risiken: Diversifikation (auch Verwaltung anbieten), Spezialisierung statt Masse
    `,
    type: "Softskills"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Persönliche Eignung & Soft Skills' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Persönliche Eignung & Soft Skills'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'Kommunikation, Verhandlung, Zeitmanagement, Kundenorientierung' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Welche Eigenschaft ist für Immobilienprofis nach dem DISG-Modell besonders wichtig?",
        options: [
          "Ausschließlich dominanter Typ",
          "Nur gewissenhafter Typ",
          "Kommunikationsfähigkeit und Empathie",
          "Introversion"
        ],
        correct: 2,
        explanation: "Erfolgreiche Immobilienprofis brauchen ausgeprägte Kommunikationsfähigkeit und Empathie für Kundenbedürfnisse."
      }
    ],},

  day_4: {
    title: "Eignungstest & Selbstreflexion",
    theory: "Nicht jeder ist für jede Tätigkeit in der Immobilienbranche gleich gut geeignet. Eignungstests helfen, die eigenen Stärken zu erkennen und die passende Spezialisierung zu finden.",
    extendedTheory: `
### Das DISG-Modell für Immobilienprofis

Das DISG-Modell unterscheidet 4 Persönlichkeitstypen:

**D = Dominant (Der Macher)**
- Eigenschaften: Entscheidungsfreudig, durchsetzungsstark, zielorientiert
- Stärken: Schnelle Abschlüsse, klare Führung
- Schwächen: Kann ungeduldig wirken, überhört Details
- **Passt zu:** Makler (Verkauf), Projektentwicklung

**I = Initiativ (Der Kommunikator)**
- Eigenschaften: Kontaktfreudig, begeisterungsfähig, optimistisch
- Stärken: Netzwerken, Kundenakquise, Präsentationen
- Schwächen: Vergisst Details, überschätzt manchmal
- **Passt zu:** Makler (Akquise), Marketing

**S = Stetig (Der Teamplayer)**
- Eigenschaften: Geduldig, zuverlässig, harmoniebedürftig
- Stärken: Langfristige Kundenbeziehungen, Konfliktlösung
- Schwächen: Schwer mit Druck, vermeidet Konfrontation
- **Passt zu:** Verwalter, Kundenbetreuer

**G = Gewissenhaft (Der Analytiker)**
- Eigenschaften: Präzise, detailorientiert, qualitätsbewusst
- Stärken: Verträge, Bewertungen, Compliance
- Schwächen: Langsam in Entscheidungen, perfektionistisch
- **Passt zu:** Gutachter, Verwaltung (Buchhaltung)

**Wichtig:** Die meisten Menschen sind Mischtypen! Es geht darum, die dominante Tendenz zu erkennen.

### Zeitmanagement-Typen

**Der Planer (strukturiert)**
- Arbeitet mit To-Do-Listen, Kalendern, festen Routinen
- Risiko: Zu starr, kann nicht spontan reagieren
- **Empfehlung:** Pufferzeiten einplanen

**Der Spontane (flexibel)**
- Reagiert auf Situationen, arbeitet nach Priorität
- Risiko: Vergisst Termine, verzettelt sich
- **Empfehlung:** Digitale Erinnerungen, CRM nutzen

**Der Perfektionist (detailorientiert)**
- Alles muss 100% sein
- Risiko: Verzögerungen, Überforderung
- **Empfehlung:** "Done is better than perfect" - 80/20-Regel anwenden
    `,
    law: [
      "[§ 34c GewO](https://www.gesetze-im-internet.de/gewo/__34c.html) (Zuverlässigkeit als Berufsvoraussetzung)",
      "[§ 1 MaBV](https://www.gesetze-im-internet.de/gewo_34cdv/__1.html) (Berufspflichten Makler)"
    ],
    practice: `
### Praxis-Test: DISG-Selbsteinschätzung

**Beantworten Sie folgende Fragen spontan (1 = trifft nicht zu, 5 = trifft voll zu):**

**D-Fragen (Dominant):**
1. Ich treffe Entscheidungen schnell und ohne lange zu zögern. ___
2. Ich sage offen, was ich denke, auch wenn es unbequem ist. ___
3. Ich mag Herausforderungen und Wettbewerb. ___
**Summe D: ___**

**I-Fragen (Initiativ):**
1. Ich gehe gerne auf fremde Menschen zu. ___
2. Ich kann andere für meine Ideen begeistern. ___
3. Ich rede gerne und viel. ___
**Summe I: ___**

**S-Fragen (Stetig):**
1. Ich mag feste Routinen und Strukturen. ___
2. Ich vermeide Konflikte, wo es geht. ___
3. Ich bin ein guter Zuhörer. ___
**Summe S: ___**

**G-Fragen (Gewissenhaft):**
1. Ich achte auf Details und Genauigkeit. ___
2. Ich plane gerne im Voraus. ___
3. Ich brauche Zeit, um Entscheidungen zu treffen. ___
**Summe G: ___**

**Auswertung:**
- Höchste Summe = Ihr dominanter Typ
- Zweithöchste Summe = Ihr Nebentyp
    `,
    caseStudy: `
**Fall: Der falsche Beruf?**

Herr T. (35) ist seit 2 Jahren selbstständiger Makler. Er hat die §34c-Erlaubnis, aber kaum Abschlüsse. Im Gespräch stellt sich heraus:
- Er hasst Kaltakquise ("fühlt sich wie Betteln an")
- Er verbringt Stunden mit der Perfektion von Exposés
- Er vermeidet Preisverhandlungen ("ich will niemanden überreden")

**Analyse:**
- Typ: Wahrscheinlich **S/G** (Stetig/Gewissenhaft)
- Problem: Maklerberuf (Verkauf) erfordert **D/I** (Dominant/Initiativ)
- Lösung: Umorientierung auf Verwaltung oder Gutachtertätigkeit

**Empfehlung:**
- Kurzfristig: Coaching für Akquise und Verhandlung
- Mittelfristig: Zusatzqualifikation "Immobilienverwalter" und Schwerpunktverlagerung
    `,
    task: "Führen Sie den DISG-Test durch und analysieren Sie: Welcher Kundentyp liegt Ihnen am meisten? Welche Tätigkeiten sollten Sie delegieren?",
    solution: `
**Muster-Analyse (Beispiel: Typ I/D)**

**Mein Profil:**
- Dominant: 12 Punkte
- Initiativ: 14 Punkte (höchster Wert)
- Stetig: 7 Punkte
- Gewissenhaft: 9 Punkte

**Interpretation:**
Ich bin ein **Initiativ-Dominant-Typ** (I/D). Ich bin kontaktfreudig, entscheidungsfreudig und mag schnelle Ergebnisse.

**Kundentypen, die mir liegen:**
- **I-Kunden:** Begeisterungsfähig, vertrauen schnell → Ich kann sie gut "mitnehmen"
- **D-Kunden:** Wollen schnelle Entscheidungen → Passt zu meinem Tempo

**Kundentypen, die mir schwerfallen:**
- **G-Kunden:** Wollen jedes Detail wissen → Ich werde ungeduldig
- **S-Kunden:** Brauchen viel Bedenkzeit → Ich dränge zu früh

**Tätigkeiten, die ich delegieren sollte:**
- Detaillierte Vertragsanalyse (G-Aufgabe) → an Assistenz oder Anwalt
- Langwierige Nachbetreuung (S-Aufgabe) → an Kundenbetreuer
- Buchhaltung (G-Aufgabe) → an Steuerberater

**Tätigkeiten, die ich selbst machen sollte:**
- Akquise (I-Stärke)
- Verkaufsgespräche (D/I-Stärke)
- Präsentationen (I-Stärke)
    `,
    type: "Test"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Eignungstest & Selbstreflexion' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Eignungstest & Selbstreflexion'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'Stärken-Schwächen-Analyse, Persönlichkeitstests, Karriereplanung' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Was bedeutet 'D' im DISG-Modell?",
        options: [
          "Delegierend",
          "Dominant",
          "Detailorientiert",
          "Diplomatisch"
        ],
        correct: 1,
        explanation: "D steht für Dominant — entscheidungsfreudig, durchsetzungsstark und zielorientiert."
      }
    ],},

  day_5: {
    title: "Ziele und Visionen",
    theory: "Erfolg ist kein Zufall. Er beginnt mit klaren Zielen und einer Vision, die Sie antreibt. Die SMART-Methode hilft, vage Wünsche in konkrete Ziele zu verwandeln.",
    extendedTheory: `
### SMART-Ziele: Die Formel für Erfolg

**S = Spezifisch**
- NICHT: "Ich will erfolgreicher werden"
- SONDERN: "Ich will 30 Vermittlungen im Jahr 2026 abschließen"

**M = Messbar**
- NICHT: "Ich will mehr verdienen"
- SONDERN: "Ich will 80.000 € Umsatz erzielen"

**A = Attraktiv (oder: Akzeptiert)**
- Das Ziel muss Sie persönlich motivieren
- Fragen Sie sich: WARUM will ich das erreichen?

**R = Realistisch**
- Herausfordernd, aber erreichbar
- Berücksichtigen Sie Ihre Ressourcen (Zeit, Geld, Kontakte)

**T = Terminiert**
- NICHT: "Irgendwann"
- SONDERN: "Bis 31.12.2026"

### Vision Board: Visualisieren Sie Ihren Erfolg

Ein Vision Board ist eine Collage aus Bildern, Zitaten und Symbolen, die Ihre Ziele repräsentieren.

**Beispiel-Elemente für Immobilienprofis:**
- Bild eines Büros (Ihr zukünftiges Maklerbüro)
- Umsatzzahl (z.B. "100.000 €")
- Zertifikat (z.B. "IHK-Zertifikat")
- Familie (Work-Life-Balance)
- Traumauto (Symbol für finanziellen Erfolg)

**Wichtig:** Platzieren Sie das Vision Board dort, wo Sie es täglich sehen (Schreibtisch, Schlafzimmer).

### Motivationstechniken für schwierige Zeiten

**1. Die 5-Sekunden-Regel (Mel Robbins)**
- Bei Prokrastination: Zählen Sie rückwärts 5-4-3-2-1 und starten Sie SOFORT

**2. Die Salamitaktik**
- Große Aufgaben in kleine Schritte zerlegen
- Beispiel: "Akquise" → "10 Anrufe pro Tag" → "2 Anrufe vor dem Mittagessen"

**3. Erfolgsjournal**
- Notieren Sie täglich 3 Dinge, die gut gelaufen sind
- Hilft, in Durststrecken positiv zu bleiben

**4. Accountability Partner**
- Finden Sie jemanden, dem Sie regelmäßig Ihre Fortschritte berichten
- Kann ein Mentor, Kollege oder Coach sein
    `,
    law: [
      "[§ 34c GewO](https://www.gesetze-im-internet.de/gewo/__34c.html) (Berufspflichten)",
      "[§ 15b MaBV](https://www.gesetze-im-internet.de/gewo_34cdv/__15b.html) (20h Weiterbildungspflicht alle 3 Jahre)"
    ],
    practice: `
### Praxis-Übung: Jahresplanung 2026

**Erstellen Sie Ihren persönlichen Jahresplan:**

**1. Vision (Wo will ich Ende 2026 stehen?)**
Formulieren Sie in 2-3 Sätzen Ihre Vision:
_Beispiel: "Ich bin ein etablierter Makler in meiner Stadt mit 30 erfolgreichen Vermittlungen. Ich habe ein kleines Büro und eine Assistenz. Ich verdiene 80.000 € und habe eine ausgeglichene Work-Life-Balance."_

**2. Jahresziele (SMART)**
Definieren Sie 3-5 Hauptziele:
- **Umsatz:** 80.000 € bis 31.12.2026
- **Transaktionen:** 30 Vermittlungen
- **Qualifikation:** IHK-Zertifikat "Immobilienmakler" bis 30.06.2026
- **Marketing:** 500 Follower auf Instagram bis 31.12.2026
- **Work-Life:** Max. 50 Stunden/Woche, 4 Wochen Urlaub

**3. Quartalsplanung**
Brechen Sie die Jahresziele auf Quartale herunter:
- Q1: 5 Vermittlungen, 15.000 € Umsatz, IHK-Kurs starten
- Q2: 7 Vermittlungen, 20.000 € Umsatz, IHK-Zertifikat abschließen
- Q3: 8 Vermittlungen, 22.000 € Umsatz, Instagram-Kampagne
- Q4: 10 Vermittlungen, 23.000 € Umsatz, Jahresabschluss

**4. Monatsplanung**
Definieren Sie für jeden Monat konkrete Meilensteine.
    `,
    caseStudy: `
**Fall: Die gescheiterte Selbstständigkeit**

Frau K. (32) hat sich vor 3 Jahren als Maklerin selbstständig gemacht. Sie hatte keine klaren Ziele, sondern nur den Wunsch "mein eigener Chef zu sein". Nach 3 Jahren:
- Umsatz: 25.000 € p.a. (unter Existenzminimum)
- Keine Spezialisierung
- Keine Marketingstrategie
- Keine Rücklagen

**Analyse:**
- Fehlende Zielsetzung führte zu Orientierungslosigkeit
- Keine Erfolgsmessung → keine Anpassung der Strategie
- Fehlende Rücklagen → Existenzangst → Schlechte Entscheidungen

**Empfehlung:**
- Neustart mit klarer SMART-Zielsetzung
- Business-Plan erstellen (Umsatzziel, Zielgruppe, Marketing)
- Ggf. Rückkehr in Anstellung für Übergangszeit (Sicherheit)
    `,
    task: "Erstellen Sie ein Vision Board (digital oder analog) mit Ihren wichtigsten Zielen für die nächsten 3 Jahre.",
    solution: `
**Muster-Vision Board (Beispiel)**

**Zentrum: Mein Warum**
"Ich will finanzielle Freiheit und mehr Zeit für meine Familie."

**Bereich 1: Karriere**
- Bild: Modernes Maklerbüro
- Text: "30 Vermittlungen/Jahr"
- Symbol: IHK-Zertifikat

**Bereich 2: Finanzen**
- Text: "100.000 € Jahresumsatz"
- Bild: Sparschwein (Rücklagen)
- Symbol: Eigenheim (Ziel)

**Bereich 3: Persönlich**
- Bild: Familie beim Urlaub
- Text: "4 Wochen Urlaub/Jahr"
- Symbol: Fitnessstudio (Gesundheit)

**Bereich 4: Weiterbildung**
- Text: "1 Seminar/Quartal"
- Bild: Bücher
- Symbol: Netzwerk (Kontakte)

**Umsetzung:**
- Erstellen Sie das Board in Canva oder auf Papier (DIN A3)
- Drucken Sie es aus und hängen Sie es an Ihren Arbeitsplatz
- Aktualisieren Sie es jährlich
    `,
    type: "Karriere"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Ziele und Visionen' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Ziele und Visionen'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'SMART-Ziele, Businessplan, Selbstständigkeit vs. Anstellung' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Was bedeutet SMART bei der Zielsetzung?",
        options: [
          "Schnell, Messbar, Attraktiv, Realistisch, Terminiert",
          "Spezifisch, Messbar, Attainable, Relevant, Terminiert",
          "Spezifisch, Modern, Angemessen, Realistisch, Terminiert",
          "Simpel, Messbar, Attraktiv, Richtig, Terminiert"
        ],
        correct: 1,
        explanation: "SMART = Spezifisch, Messbar, Attainable (erreichbar), Relevant, Terminiert."
      }
    ],},

  // === Woche 2: Rechtliche Grundlagen (Tag 6-10) ===
  
  day_6: {
    title: "Einführung in das BGB",
    theory: "Das Bürgerliche Gesetzbuch (BGB) ist das zentrale Gesetz für alle privatrechtlichen Beziehungen in Deutschland. Für Immobilienprofis sind vor allem die Bereiche Allgemeiner Teil, Schuldrecht und Sachenrecht relevant.",
    extendedTheory: `
### Das BGB: Aufbau und Systematik

**Das BGB besteht aus 5 Büchern:**

**1. Buch: Allgemeiner Teil (§§ 1-240)**
- Rechtsfähigkeit, Geschäftsfähigkeit
- Willenserklärungen, Verträge
- Fristen, Verjährung

**2. Buch: Schuldrecht (§§ 241-853)**
- Allgemeines Schuldrecht (Vertragsabschluss, Leistungsstörungen)
- Besonderes Schuldrecht (Kaufvertrag, Mietvertrag, Maklervertrag)

**3. Buch: Sachenrecht (§§ 854-1296)**
- Besitz und Eigentum
- Grundbuch
- Belastungen (Grundschuld, Hypothek)

**4. Buch: Familienrecht (§§ 1297-1921)**
- Ehe, Verwandtschaft, Vormundschaft
- Relevant für Immobilien: Güterstand, Erbrecht

**5. Buch: Erbrecht (§§ 1922-2385)**
- Relevant für Immobilien: Erbengemeinschaft, Vermächtnis

### Rechtsfähigkeit vs. Geschäftsfähigkeit

**Rechtsfähigkeit (§ 1 BGB)**
- Beginnt mit Geburt, endet mit Tod
- Jeder Mensch kann Träger von Rechten und Pflichten sein
- Auch juristische Personen (GmbH, AG) sind rechtsfähig

**Geschäftsfähigkeit (§§ 104-113 BGB)**
- Fähigkeit, Rechtsgeschäfte wirksam vorzunehmen
- **Geschäftsunfähig:** Kinder unter 7 Jahren, dauerhaft Geisteskranke (§ 104 BGB)
- **Beschränkt geschäftsfähig:** Minderjährige 7-17 Jahre (§ 106 BGB)
- **Voll geschäftsfähig:** Ab 18 Jahren

**Wichtig für Immobilienprofis:**
- Ein 16-Jähriger kann KEINE Wohnung kaufen (auch nicht mit Zustimmung der Eltern für den Vertragsabschluss selbst)
- Eltern müssen als gesetzliche Vertreter handeln (§ 1629 BGB)

### Willenserklärungen

**Definition:** Äußerung eines auf Herbeiführung einer Rechtsfolge gerichteten Willens

**Voraussetzungen:**
1. **Objektiver Tatbestand:** Erkennbare Äußerung
2. **Subjektiver Tatbestand:** Wille, eine Rechtsfolge herbeizuführen

**Formen:**
- **Ausdrücklich:** Mündlich, schriftlich
- **Konkludent:** Durch schlüssiges Verhalten (z.B. Warenentnahme im Supermarkt)

**Wichtig für Maklervertrag:**
- Konkludentes Handeln kann Maklervertrag begründen (§ 652 BGB)
- ABER: Bei Wohnungskauf MUSS Maklervertrag in Textform sein (§ 656a BGB)
    `,
    law: [
      "[§ 1 BGB](https://www.gesetze-im-internet.de/bgb/__1.html) (Rechtsfähigkeit)",
      "[§ 104 BGB](https://www.gesetze-im-internet.de/bgb/__104.html) (Geschäftsunfähigkeit)",
      "[§ 106 BGB](https://www.gesetze-im-internet.de/bgb/__106.html) (Beschränkte Geschäftsfähigkeit)",
      "[§ 107 BGB](https://www.gesetze-im-internet.de/bgb/__107.html) (Taschengeldparagraph)"
    ],
    practice: `
### Praxis-Fall: Der minderjährige Käufer

**Sachverhalt:**
Max (17 Jahre) hat von seiner Großmutter 50.000 € geerbt. Er möchte eine kleine Eigentumswohnung als Kapitalanlage kaufen. Seine Eltern sind einverstanden.

**Fragen:**
1. Kann Max die Wohnung selbst kaufen?
2. Wie müsste der Kaufvertrag gestaltet sein?
3. Was passiert, wenn Max trotzdem unterschreibt?

**Lösung:**

**Zu 1:** NEIN. Max ist beschränkt geschäftsfähig (§ 106 BGB). Der Wohnungskauf ist ein Rechtsgeschäft, das nicht "lediglich rechtlich vorteilhaft" ist (§ 107 BGB), da es auch Pflichten begründet (Kaufpreis, Nebenkosten, Instandhaltung).

**Zu 2:** Die Eltern müssen als gesetzliche Vertreter handeln (§ 1629 BGB). Im Kaufvertrag müssen die Eltern als Vertreter von Max auftreten. Zusätzlich benötigen die Eltern eine Genehmigung des Familiengerichts (§ 1821 BGB), da es sich um eine Vermögensanlage handelt.

**Zu 3:** Der Vertrag wäre schwebend unwirksam (§ 108 BGB). Die Eltern könnten ihn genehmigen oder ablehnen. Ohne Genehmigung wird der Vertrag unwirksam.
    `,
    caseStudy: `
**Fall: Die demente Verkäuferin**

Frau S. (82) will ihre Wohnung verkaufen. Im Gespräch fällt Ihnen auf, dass sie sich mehrfach wiederholt und den Kaufpreis nicht mehr erinnert, obwohl Sie ihn gerade besprochen haben. Die Tochter drängt auf schnellen Abschluss.

**Rechtliche Analyse:**
- Verdacht auf Geschäftsunfähigkeit (§ 104 Nr. 2 BGB)
- Ein von einer geschäftsunfähigen Person abgeschlossener Vertrag ist NICHTIG (§ 105 BGB)
- Risiko: Notar wird Vertrag nicht beurkunden, wenn Zweifel an Geschäftsfähigkeit bestehen

**Ihre Pflicht als Makler:**
- Hinweis an Tochter: Ärztliches Attest über Geschäftsfähigkeit einholen
- Alternativ: Betreuung beantragen (§ 1896 BGB), Betreuer schließt Vertrag ab
- KEINE Vermittlung ohne Klärung der Geschäftsfähigkeit (Haftungsrisiko!)
    `,
    task: "Erklären Sie den Unterschied zwischen Rechtsfähigkeit und Geschäftsfähigkeit anhand von 3 Beispielen.",
    solution: `
**Musterlösung:**

**Rechtsfähigkeit = Fähigkeit, Träger von Rechten und Pflichten zu sein**

**Geschäftsfähigkeit = Fähigkeit, Rechtsgeschäfte wirksam vorzunehmen**

**Beispiel 1: Das Neugeborene**
- **Rechtsfähig:** JA (ab Geburt, § 1 BGB)
- **Geschäftsfähig:** NEIN (geschäftsunfähig bis 7 Jahre, § 104 BGB)
- **Bedeutung:** Das Baby kann Eigentümer einer Wohnung sein (z.B. durch Schenkung der Eltern), aber es kann sie nicht selbst verkaufen.

**Beispiel 2: Der 16-Jährige**
- **Rechtsfähig:** JA
- **Geschäftsfähig:** Beschränkt (§ 106 BGB)
- **Bedeutung:** Er kann ein Handy kaufen (mit Taschengeld, § 110 BGB), aber keine Wohnung (nicht lediglich rechtlich vorteilhaft).

**Beispiel 3: Die GmbH**
- **Rechtsfähig:** JA (juristische Person)
- **Geschäftsfähig:** Handelt durch ihre Organe (Geschäftsführer)
- **Bedeutung:** Die GmbH kann Eigentümerin einer Immobilie sein und diese verkaufen (vertreten durch Geschäftsführer).
    `,
    type: "Recht"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Einführung in das BGB' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Einführung in das BGB'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'BGB Grundlagen, Vertragsrecht, Willenserklärung, Angebot und Annahme' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Wie viele Bücher hat das BGB?",
        options: [
          "3 Bücher",
          "4 Bücher",
          "5 Bücher",
          "7 Bücher"
        ],
        correct: 2,
        explanation: "Das BGB besteht aus 5 Büchern: Allg. Teil, Schuldrecht, Sachenrecht, Familienrecht, Erbrecht (§§ 1-2385)."
      }
    ],},

  day_7: {
    title: "Sachenrecht & Eigentum",
    theory: "Das Sachenrecht regelt die Rechte an Sachen. Für Immobilienprofis ist vor allem die Unterscheidung zwischen Besitz und Eigentum sowie die Eigentumsübertragung bei Grundstücken zentral.",
    extendedTheory: `
### Besitz vs. Eigentum: Der fundamentale Unterschied

**Besitz (§ 854 BGB)**
- **Definition:** Tatsächliche Herrschaft über eine Sache
- **Beispiel:** Der Mieter ist Besitzer der Wohnung (er hat den Schlüssel, er nutzt sie)

**Eigentum (§ 903 BGB)**
- **Definition:** Rechtliche Herrschaft über eine Sache
- **Beispiel:** Der Vermieter ist Eigentümer der Wohnung (er steht im Grundbuch)

**Wichtig:** Besitz und Eigentum können auseinanderfallen!
- **Normalfall:** Eigentümer = Besitzer (Selbstnutzer)
- **Häufiger Fall:** Eigentümer ≠ Besitzer (Vermieter ≠ Mieter)

### Eigentumsübertragung: Mobilien vs. Immobilien

**Bei beweglichen Sachen (§ 929 BGB):**
1. **Einigung:** Verkäufer und Käufer einigen sich über Eigentumsübergang
2. **Übergabe:** Physische Übergabe der Sache

**Bei Grundstücken (§§ 873, 925 BGB):**
1. **Einigung (Auflassung):** Notarielle Beurkundung (§ 925 BGB)
2. **Eintragung:** Eintragung des neuen Eigentümers im Grundbuch (§ 873 BGB)

**Wichtig:** Ohne Grundbucheintragung wird man NICHT Eigentümer!

### Das Grundbuch: Das Immobilien-Register

**Aufbau des Grundbuchs:**
- **Aufschrift:** Grundbuchbezirk, Blattnummer
- **Bestandsverzeichnis:** Lage, Größe, Nutzungsart des Grundstücks
- **Abteilung I:** Eigentümer
- **Abteilung II:** Lasten und Beschränkungen (z.B. Wegerecht, Wohnrecht)
- **Abteilung III:** Grundpfandrechte (Grundschuld, Hypothek)

**Grundbuchgrundsätze:**
- **Öffentlicher Glaube (§ 892 BGB):** Wer im Grundbuch steht, gilt als Eigentümer
- **Einsichtsrecht (§ 12 GBO):** Nur bei berechtigtem Interesse (Kaufinteresse reicht)

### Besitz- vs. Eigentumsstörung

**Besitzstörung:**
- Jemand greift in Ihren Besitz ein (z.B. Nachbar parkt auf Ihrem Stellplatz)
- **Anspruch:** Besitzschutzansprüche (§§ 858 ff. BGB) - schnell, aber nur vorläufig

**Eigentumsstörung:**
- Jemand verletzt Ihr Eigentum (z.B. Baum des Nachbarn wächst auf Ihr Grundstück)
- **Anspruch:** Eigentumsherausgabeanspruch (§ 985 BGB), Beseitigungsanspruch (§ 1004 BGB)
    `,
    law: [
      "[§ 854 BGB](https://www.gesetze-im-internet.de/bgb/__854.html) (Besitz)",
      "[§ 903 BGB](https://www.gesetze-im-internet.de/bgb/__903.html) (Eigentum)",
      "[§ 873 BGB](https://www.gesetze-im-internet.de/bgb/__873.html) (Eigentumsübertragung Grundstück)",
      "[§ 925 BGB](https://www.gesetze-im-internet.de/bgb/__925.html) (Auflassung)",
      "[§ 892 BGB](https://www.gesetze-im-internet.de/bgb/__892.html) (Öffentlicher Glaube des Grundbuchs)"
    ],
    practice: `
### Praxis-Fall: Mieter vs. Eigentümer

**Sachverhalt:**
Herr M. ist Mieter einer Wohnung. Der Eigentümer verkauft die Wohnung an Frau K. Herr M. erfährt davon nichts und zahlt weiterhin Miete an den alten Eigentümer.

**Fragen:**
1. Wer ist Besitzer der Wohnung?
2. Wer ist Eigentümer der Wohnung?
3. An wen muss Herr M. die Miete zahlen?

**Lösung:**

**Zu 1:** Herr M. ist Besitzer (§ 854 BGB). Er hat die tatsächliche Herrschaft über die Wohnung.

**Zu 2:** Frau K. ist Eigentümerin (§ 873 BGB), sobald sie im Grundbuch eingetragen ist. Bis zur Eintragung ist der alte Eigentümer noch Eigentümer.

**Zu 3:** Nach Eigentumsübergang muss Herr M. an Frau K. zahlen (§ 566 BGB: "Kauf bricht nicht Miete"). Frau K. muss Herrn M. über den Eigentümerwechsel informieren. Zahlt Herr M. trotzdem an den alten Eigentümer, ist er nicht befreit (§ 407 BGB analog).
    `,
    caseStudy: `
**Fall: Der Grundbuchirrtum**

Herr S. kauft eine Wohnung. Im Grundbuch steht als Eigentümer "Max Müller". Der Verkäufer weist sich mit Personalausweis als "Max Müller" aus. Nach Kaufpreiszahlung und Übergabe stellt sich heraus: Der Verkäufer war ein Betrüger. Der echte Max Müller lebt in Spanien und wusste nichts vom Verkauf.

**Rechtliche Analyse:**
- **Grundbuchberichtigung (§ 894 BGB):** Der echte Max Müller kann die Löschung des Betrügers verlangen
- **ABER: Gutgläubiger Erwerb (§ 892 BGB):** Herr S. ist geschützt, wenn er gutgläubig war (d.h. er durfte darauf vertrauen, dass der im Grundbuch Eingetragene auch der wahre Eigentümer ist)
- **Voraussetzung:** Herr S. durfte keine Kenntnis von der Unrichtigkeit des Grundbuchs haben

**Ergebnis:**
- Wenn Herr S. gutgläubig war: Er wird Eigentümer, echter Max Müller geht leer aus (kann nur Betrüger verklagen)
- Wenn Herr S. bösgläubig war (z.B. Ausweis gefälscht, offensichtlich): Kein Eigentumserwerb, echter Max Müller bleibt Eigentümer
    `,
    task: "Definieren Sie 'Besitz' und 'Eigentum' anhand eines selbst gewählten Beispiels aus der Immobilienpraxis.",
    solution: `
**Musterlösung: Beispiel Ferienwohnung**

**Sachverhalt:**
Frau L. ist Eigentümerin einer Ferienwohnung in den Alpen. Sie vermietet die Wohnung über Airbnb. Herr T. bucht die Wohnung für 2 Wochen.

**Besitz:**
- **Besitzer:** Herr T. (während der 2 Wochen)
- **Begründung:** Er hat die tatsächliche Herrschaft über die Wohnung (§ 854 BGB). Er hat den Schlüssel, er nutzt die Wohnung, er kann andere ausschließen.

**Eigentum:**
- **Eigentümerin:** Frau L. (dauerhaft)
- **Begründung:** Sie steht im Grundbuch (§ 873 BGB). Sie hat die rechtliche Herrschaft über die Wohnung. Sie kann die Wohnung verkaufen, vermieten, belasten.

**Praktische Konsequenzen:**
- Herr T. darf die Wohnung nutzen (Besitzrecht), aber nicht verkaufen (kein Eigentum)
- Frau L. darf die Wohnung verkaufen (Eigentum), aber nicht einfach eintreten während Herr T. dort ist (Besitzschutz, § 858 BGB)
- Nach den 2 Wochen muss Herr T. den Besitz zurückgeben (§ 546 BGB analog)
    `,
    type: "Recht"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Sachenrecht & Eigentum' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Sachenrecht & Eigentum'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'Eigentumsübertragung, Grundbuch, dingliche Rechte, Auflassung' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Was ist der Unterschied zwischen Besitz und Eigentum?",
        options: [
          "Kein Unterschied",
          "Besitz = tatsächliche Herrschaft (§854), Eigentum = rechtliche Herrschaft (§903)",
          "Besitz = rechtliche Herrschaft, Eigentum = tatsächliche Herrschaft",
          "Besitz und Eigentum sind immer beim selben Rechtsträger"
        ],
        correct: 1,
        explanation: "Besitz (§854 BGB) ist die tatsächliche Sachherrschaft, Eigentum (§903 BGB) die rechtliche. Mieter = Besitzer, Vermieter = Eigentümer."
      }
    ],},

  day_8: {
    title: "Gewerberecht & §34c GewO",
    theory: "Die gewerbsmäßige Tätigkeit als Immobilienmakler oder -verwalter erfordert eine Erlaubnis nach § 34c GewO. Diese Erlaubnis ist an strenge Voraussetzungen geknüpft.",
    extendedTheory: `
### Die Erlaubnis nach § 34c GewO: Voraussetzungen im Detail

**1. Zuverlässigkeit (§ 34c Abs. 1 Nr. 1 GewO)**

**Was bedeutet "Zuverlässigkeit"?**
- Keine Vorstrafen wegen Vermögens- oder Eigentumsdelikten in den letzten 5 Jahren
- Keine schweren Verstöße gegen Steuergesetze
- Keine Insolvenz in den letzten 5 Jahren

**Relevante Delikte (Beispiele):**
- Betrug (§ 263 StGB)
- Untreue (§ 266 StGB)
- Diebstahl (§ 242 StGB)
- Steuerhinterziehung (§ 370 AO)

**Nachweise:**
- Führungszeugnis Belegart O (§ 30 BZRG) - Kosten: 13 €
- Gewerbezentralregisterauszug Belegart 9 - Kosten: 13 €

**2. Geordnete Vermögensverhältnisse (§ 34c Abs. 1 Nr. 2 GewO)**

**Was bedeutet "geordnete Vermögensverhältnisse"?**
- Kein laufendes Insolvenzverfahren
- Keine Eintragung im Schuldnerverzeichnis (früher: Eidesstattliche Versicherung)
- Keine Überschuldung

**Nachweise:**
- Bescheinigung in Steuersachen (Finanzamt) - Kosten: 0-15 €
- Auskunft aus dem Schuldnerverzeichnis (Amtsgericht) - Kosten: 0-15 €
- Auskunft Insolvenzgericht - Kosten: 0-15 €

**3. Berufshaftpflichtversicherung (§ 34c Abs. 2 GewO)**

**Mindestversicherungssummen:**
- 500.000 € für Personenschäden
- 250.000 € für sonstige Schäden (Vermögensschäden)

**Wichtig:** Die Versicherung muss VOR Aufnahme der Tätigkeit bestehen!

**4. Weiterbildungspflicht (MaBV § 15b) — Abschaffung geplant!**

**Seit 2018:**
- 20 Stunden Weiterbildung innerhalb von 3 Jahren ⚠️ **Aktuell (Stand 2025/2026):** Das Bundeskabinett hat am 5.11.2025 beschlossen, diese Weiterbildungspflicht abzuschaffen (Bürokratierückbau-Gesetz). Bis zur Verkündung im Bundesgesetzblatt gilt noch die alte Regelung.
- Nachweis durch Teilnahmebescheinigungen
- Keine Prüfung erforderlich ("Sitzschein")

**Anerkannte Anbieter:**
- IHK-Akademien
- IVD Bildungsinstitut
- Sprengnetter Akademie
- Online-Anbieter (z.B. Haufe Immobilien)

### Die Makler- und Bauträgerverordnung (MaBV)

**Wichtigste Pflichten für Makler:**

**1. Buchführungspflicht (§ 10 MaBV)**
- Aufzeichnung aller Aufträge
- Daten des Auftraggebers, Objektdaten, Vertragsdaten
- Aufbewahrung: 5 Jahre

**2. Informationspflichten**
- Angabe der Erlaubnisbehörde
- Hinweis auf Schlichtungsstellen

**3. Vermögenssicherung**
- Kundengelder NIEMALS auf Privatkonto
- Treuhandkonto erforderlich (bei Bauträgern)

**4. Prüfungspflicht (§ 16 MaBV)**
- Reine Makler: Negativerklärung (keine Bauträgergeschäfte)
- Bauträger: Jährlicher Prüfbericht durch Wirtschaftsprüfer
    `,
    law: [
      "[§ 34c GewO](https://www.gesetze-im-internet.de/gewo/__34c.html) (Erlaubnispflicht)",
      "[MaBV § 10](https://www.gesetze-im-internet.de/gewo_34cdv/__10.html) (Buchführung)",
      "[MaBV § 15b](https://www.gesetze-im-internet.de/gewo_34cdv/__15b.html) (Weiterbildung)",
      "[MaBV § 16](https://www.gesetze-im-internet.de/gewo_34cdv/__16.html) (Prüfung)"
    ],
    practice: `
### Praxis-Übung: §34c-Antrag ausfüllen

**Aufgabe:** Stellen Sie sich vor, Sie beantragen Ihre §34c-Erlaubnis. Erstellen Sie eine Checkliste aller erforderlichen Unterlagen.

**Checkliste §34c-Antrag:**

**1. Persönliche Dokumente**
- [ ] Antragsformular (ausgefüllt)
- [ ] Personalausweiskopie (Vorder- und Rückseite)
- [ ] Lebenslauf (tabellarisch)
- [ ] Passbild (biometrisch)

**2. Zuverlässigkeit**
- [ ] Führungszeugnis Belegart O (nicht älter als 3 Monate)
- [ ] Gewerbezentralregisterauszug Belegart 9
- [ ] Bescheinigung in Steuersachen (Finanzamt)

**3. Geordnete Vermögensverhältnisse**
- [ ] Auskunft Schuldnerverzeichnis (Amtsgericht)
- [ ] Auskunft Insolvenzgericht
- [ ] Ggf. Vermögensauskunft (bei Selbstständigen)

**4. Berufshaftpflichtversicherung**
- [ ] Versicherungsbestätigung (Deckungszusage)
- [ ] Nachweis Mindestversicherungssummen (500.000 € / 250.000 €)

**5. Sonstiges**
- [ ] Gewerbeanmeldung (falls noch nicht erfolgt)
- [ ] Nachweis Geschäftsräume (Mietvertrag oder Eigentum)
- [ ] Ggf. Handelsregisterauszug (bei GmbH)

**6. Gebühren**
- [ ] Gebühr §34c-Erlaubnis: 200-1.000 € (je nach Stadt)

**Gesamtkosten:** ca. 250-1.100 €
**Bearbeitungszeit:** 4-12 Wochen
    `,
    caseStudy: `
**Fall: Der vorbestrafte Makler**

Herr K. möchte Makler werden. Er hat vor 3 Jahren eine Verurteilung wegen Steuerhinterziehung (§ 370 AO) erhalten (Geldstrafe: 90 Tagessätze).

**Fragen:**
1. Kann Herr K. die §34c-Erlaubnis erhalten?
2. Welche Argumente könnte er vorbringen?
3. Was passiert, wenn er trotzdem ohne Erlaubnis tätig wird?

**Lösung:**

**Zu 1:** Wahrscheinlich NEIN. Steuerhinterziehung ist ein Vermögensdelikt und begründet Zweifel an der Zuverlässigkeit (§ 34c Abs. 1 Nr. 1 GewO). Die Behörde hat Ermessen, wird aber in der Regel ablehnen, solange die Verurteilung nicht länger als 5 Jahre zurückliegt.

**Zu 2:** Herr K. könnte argumentieren:
- Einmalige Verfehlung (keine Wiederholungsgefahr)
- Geldstrafe (keine Freiheitsstrafe)
- Reue und Wiedergutmachung (Steuerschuld beglichen)
- Empfehlungsschreiben von Arbeitgebern/Geschäftspartnern

**Zu 3:** Tätigkeit ohne Erlaubnis ist eine Ordnungswidrigkeit (§ 144 GewO) und kann mit Bußgeld bis 50.000 € geahndet werden. Zudem sind alle Maklerverträge unwirksam (§ 134 BGB) - kein Provisionsanspruch!
    `,
    task: "Recherchieren Sie bei Ihrem lokalen Ordnungsamt/Gewerbeamt: Welche Unterlagen werden genau gefordert und was kostet die Erlaubnis?",
    solution: `
**Musterlösung (Beispiel: Stadt München)**

**Zuständige Behörde:**
Kreisverwaltungsreferat München, Gewerbemeldestelle

**Erforderliche Unterlagen:**
1. Antragsformular (online verfügbar)
2. Personalausweiskopie
3. Führungszeugnis Belegart O
4. Gewerbezentralregisterauszug
5. Bescheinigung in Steuersachen
6. Auskunft Schuldnerverzeichnis
7. Versicherungsbestätigung Berufshaftpflicht
8. Nachweis Geschäftsräume

**Kosten:**
- Erlaubnisgebühr: 600 € (München)
- Führungszeugnis: 13 €
- Gewerbezentralregister: 13 €
- Sonstige Bescheinigungen: ca. 30 €
- **Gesamt: ca. 656 €**

**Bearbeitungszeit:** 6-8 Wochen

**Hinweis:** Die Kosten variieren stark je nach Stadt. In kleineren Gemeinden oft nur 200-300 €.
    `,
    type: "Recht"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Gewerberecht & §34c GewO' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Gewerberecht & §34c GewO'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'Gewerbeerlaubnis, Voraussetzungen §34c, MaBV, Sachkunde' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Welche Voraussetzung ist KEINE Anforderung für die §34c-Erlaubnis?",
        options: [
          "Zuverlässigkeit",
          "Geordnete Vermögensverhältnisse",
          "Abgeschlossenes Studium",
          "Haftpflichtversicherung"
        ],
        correct: 2,
        explanation: "Ein abgeschlossenes Studium ist KEINE Voraussetzung für §34c. Erforderlich sind: Zuverlässigkeit, geordnete Vermögensverhältnisse und Haftpflichtversicherung."
      }
    ],},

  day_9: {
    title: "Maklerrecht Grundlagen",
    theory: "Der Maklervertrag ist die rechtliche Grundlage für den Provisionsanspruch. Er ist im BGB geregelt und unterliegt besonderen Formvorschriften.",
    extendedTheory: `
### Der Maklervertrag (§§ 652 ff. BGB)

**Definition:**
Der Maklervertrag verpflichtet den Makler zum Nachweis oder zur Vermittlung einer Gelegenheit zum Abschluss eines Vertrages und den Auftraggeber zur Zahlung der Provision im Erfolgsfall.

**Wichtig:** Der Makler wird nur bei Erfolg bezahlt (Erfolgshonorar)!

**1. Zustandekommen des Maklervertrags**

**A. Schriftlich/Textform (§ 656a BGB)**
- **Zwingend bei:** Kauf oder Tausch von Wohnungen/Einfamilienhäusern
- **Textform:** E-Mail, Fax, WhatsApp (NICHT mündlich!)
- **Inhalt:** Maklerauftrag, Provision, Objektbeschreibung

**B. Mündlich (bei Gewerbeimmobilien)**
- Handschlag, Telefonat
- Problem: Beweisschwierigkeiten

**C. Konkludent (schlüssiges Verhalten)**
- Kunde nutzt Maklerdienste in Kenntnis der Provisionspflicht
- Beispiel: Kunde ruft auf Exposé mit Provisionshinweis an und lässt sich Objekt zeigen
- **Wichtig:** Bei Wohnimmobilien NICHT ausreichend (§ 656a BGB)!

**2. Arten der Maklertätigkeit**

**A. Nachweismakler (§ 652 Abs. 1 S. 1 BGB)**
- Nennt nur die Gelegenheit (Adresse + Kontakt)
- "Da ist das Haus, geh hin."
- Geringere Anforderungen an Kausalität

**B. Vermittlungsmakler (§ 652 Abs. 1 S. 2 BGB)**
- Wirkt aktiv auf den Abschluss ein
- Verhandelt Preise, klärt Details, organisiert Besichtigungen
- "Kühler Kopf" zwischen den Parteien
- Höhere Anforderungen an Kausalität

**3. Die 4 Säulen des Provisionsanspruchs**

**Säule 1: Maklervertrag**
- Muss wirksam zustande gekommen sein
- Bei Wohnimmobilien: Textform (§ 656a BGB)

**Säule 2: Maklertätigkeit**
- Nachweis oder Vermittlung
- Muss ursächlich für den Abschluss sein

**Säule 3: Hauptvertrag**
- Kaufvertrag (notariell beurkundet)
- Muss tatsächlich abgeschlossen werden

**Säule 4: Kausalität**
- Der Maklernachweis/-vermittlung muss ursächlich für den Abschluss sein
- **Problem:** Vorkenntnis des Kunden

### Besonderheiten bei Wohnimmobilien (seit 23.12.2020)

**Bestellerprinzip (§ 656a BGB)**
- Wer den Makler bestellt, zahlt (mindestens 50%)
- Käufer darf maximal 50% der Provision zahlen
- Verkäufer muss mindestens 50% zahlen

**Beispiel:**
- Verkäufer beauftragt Makler: Verkäufer zahlt 100% oder Verkäufer 50% + Käufer 50%
- Käufer beauftragt Makler: Käufer zahlt 100% (selten in der Praxis)
    `,
    law: [
      "[§ 652 BGB](https://www.gesetze-im-internet.de/bgb/__652.html) (Maklervertrag)",
      "[§ 656a BGB](https://www.gesetze-im-internet.de/bgb/__656a.html) (Textform, Bestellerprinzip)",
      "[§ 656b BGB](https://www.gesetze-im-internet.de/bgb/__656b.html) (Provisionshöhe)",
      "[§ 656c BGB](https://www.gesetze-im-internet.de/bgb/__656c.html) (Werbung)"
    ],
    practice: `
### Praxis-Fall: Wann entsteht der Provisionsanspruch?

**Szenario 1: Der Nachweismakler**
Makler M. schickt Käufer K. ein Exposé mit Adresse. K. ruft Verkäufer V. direkt an (ohne M.) und kauft die Wohnung.

**Frage:** Hat M. Provisionsanspruch?
**Antwort:** JA, wenn:
- Maklervertrag bestand (Textform!)
- K. hatte KEINE Vorkenntnis des Objekts
- Der Nachweis war ursächlich für den Abschluss

**Szenario 2: Die Vorkenntnis**
Makler M. schickt Käufer K. ein Exposé. K. sagt: "Das Haus kenne ich schon, da wohnt mein Onkel." K. kauft trotzdem.

**Frage:** Hat M. Provisionsanspruch?
**Antwort:** NEIN, weil:
- K. hatte Vorkenntnis
- Der Nachweis war NICHT ursächlich
- **Wichtig:** K. muss Vorkenntnis SOFORT rügen (sonst gilt Nachweis als ursächlich)

**Szenario 3: Der Vermittlungsmakler**
Makler M. schickt Käufer K. ein Exposé. K. kennt das Objekt bereits, aber M. verhandelt den Preis von 500.000 € auf 450.000 € herunter.

**Frage:** Hat M. Provisionsanspruch?
**Antwort:** MÖGLICH, wenn:
- M. hat wesentlich vermittelt (nicht nur nachgewiesen)
- Die Vermittlungsleistung war ursächlich für den Abschluss
- Preisverhandlung kann ausreichen (Einzelfallentscheidung)
    `,
    caseStudy: `
**Fall: Der doppelte Makler**

Verkäufer V. beauftragt Makler M1. Käufer K. beauftragt Makler M2. M1 und M2 kennen sich nicht. K. kauft über M1 die Wohnung von V.

**Fragen:**
1. Wer hat Provisionsanspruch?
2. Wie hoch ist die Provision?

**Lösung:**

**Zu 1:**
- M1 hat Provisionsanspruch gegen V. (Verkäuferauftrag)
- M2 hat Provisionsanspruch gegen K. (Käuferauftrag)
- ABER: M2 hat nichts geleistet (K. hat über M1 gekauft)
- **Ergebnis:** Nur M1 hat Provisionsanspruch

**Zu 2:**
- M1 kann von V. maximal 100% der Provision verlangen
- Wenn V. will, dass K. auch zahlt: K. maximal 50%, V. mindestens 50% (§ 656a BGB)
- **Typisch:** V. zahlt 3,57% (inkl. MwSt.), K. zahlt 3,57% (inkl. MwSt.) = gesamt 7,14%

**Praxis-Tipp:** Als Makler immer klären, ob Kunde bereits von anderem Makler betreut wird!
    `,
    task: "Formulieren Sie die 4 Voraussetzungen für den Provisionsanspruch in eigenen Worten.",
    solution: `
**Musterlösung: Die 4 Säulen des Provisionsanspruchs**

**Säule 1: Wirksamer Maklervertrag**
Es muss ein gültiger Maklervertrag zwischen Makler und Auftraggeber bestehen. Bei Wohnimmobilien muss dieser in Textform vorliegen (§ 656a BGB). Der Vertrag regelt, dass der Makler eine Gelegenheit zum Vertragsabschluss nachweisen oder vermitteln soll.

**Säule 2: Maklertätigkeit**
Der Makler muss tatsächlich tätig geworden sein. Er muss entweder die Gelegenheit nachgewiesen haben (z.B. durch Zusendung eines Exposés mit Adresse) oder aktiv vermittelt haben (z.B. durch Verhandlungen, Organisation von Besichtigungen).

**Säule 3: Hauptvertrag**
Der Hauptvertrag (z.B. Kaufvertrag) muss tatsächlich zustande gekommen sein. Bei Immobilien bedeutet das: Der Kaufvertrag muss notariell beurkundet sein (§ 311b BGB). Ein bloßes Angebot oder eine Absichtserklärung reicht nicht.

**Säule 4: Kausalität (Ursächlichkeit)**
Die Maklertätigkeit muss ursächlich für den Abschluss des Hauptvertrags gewesen sein. Das bedeutet: Ohne den Maklernachweis oder die Maklervermittlung wäre der Vertrag nicht zustande gekommen. Vorkenntnis des Kunden kann die Kausalität ausschließen.

**Merksatz:** "Vertrag + Tätigkeit + Hauptvertrag + Kausalität = Provision"
    `,
    type: "Recht"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Maklerrecht Grundlagen' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Maklerrecht Grundlagen'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'Maklervertrag §652 BGB, Courtage, Bestellerprinzip, Provisionsanspruch' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Welche Voraussetzungen müssen für den Maklerprovionsanspruch nach §652 BGB erfüllt sein?",
        options: [
          "Nur Maklervertrag reicht",
          "Maklervertrag + Nachweis/Vermittlung + Kausalität + Hauptvertrag",
          "Nur der Hauptvertrag muss zustande kommen",
          "Provision entsteht automatisch bei Vertragsabschluss"
        ],
        correct: 1,
        explanation: "§652 BGB: Alle 4 Voraussetzungen müssen erfüllt sein: gültiger Maklervertrag, Nachweis/Vermittlung, Kausalität (Ursächlichkeit), wirksamer Hauptvertrag."
      }
    ],},

  day_10: {
    title: "Geldwäschegesetz (GwG)",
    theory: "Das Geldwäschegesetz verpflichtet Immobilienmakler zur Identifizierung ihrer Kunden und zur Meldung verdächtiger Transaktionen. Verstöße können mit hohen Bußgeldern geahndet werden.",
    extendedTheory: `
### Das Geldwäschegesetz: Warum Makler betroffen sind

**Hintergrund:**
Immobilien sind ein beliebtes Mittel zur Geldwäsche. Kriminelle investieren illegal erworbenes Geld in Immobilien, um es zu "waschen" (= legal erscheinen zu lassen).

**Verpflichtete nach GwG:**
- Immobilienmakler (§ 2 Abs. 1 Nr. 14 GwG)
- Notare, Rechtsanwälte
- Banken, Finanzdienstleister

### Die Sorgfaltspflichten im Detail

**1. Identifizierung (§ 11 GwG)**

**Wann?**
- Bei Begründung der Geschäftsbeziehung (= Maklerauftrag)
- Bei Transaktionen über 10.000 € (auch ohne Geschäftsbeziehung)
- Bei Verdacht auf Geldwäsche

**Wie?**
- Personalausweis oder Reisepass (im Original!)
- Kopie anfertigen und aufbewahren
- Bei juristischen Personen (GmbH): Handelsregisterauszug + Identifizierung der wirtschaftlich Berechtigten

**Wirtschaftlich Berechtigter (§ 3 GwG):**
- Natürliche Person, die letztendlich Eigentümer oder Kontrolle ausübt
- Bei GmbH: Gesellschafter mit mehr als 25% Anteilen
- **Wichtig:** Auch bei verschachtelten Strukturen (GmbH gehört GmbH gehört Person)

**2. Transparenzregister (§ 23 GwG)**

**Was ist das?**
- Öffentliches Register aller wirtschaftlich Berechtigten von juristischen Personen
- Seit 01.08.2021 verpflichtend für alle Unternehmen
- Abrufbar unter: www.transparenzregister.de

**Pflicht des Maklers:**
- Abfrage des Transparenzregisters bei juristischen Personen als Kunden
- Abgleich mit eigener Identifizierung

**3. Risikoanalyse (§ 10 GwG)**

**Risikofaktoren (Beispiele):**
- Kunde aus Hochrisikoland (z.B. Afghanistan, Nordkorea)
- Barzahlung über 10.000 €
- Komplexe Unternehmensstrukturen ohne erkennbaren wirtschaftlichen Grund
- Kunde will anonym bleiben

**Verstärkte Sorgfaltspflichten bei Hochrisiko:**
- Zusätzliche Dokumente anfordern
- Herkunft der Mittel klären
- Geschäftsführung einbeziehen

**4. Verdachtsmeldung (§ 43 GwG)**

**Wann melden?**
- Bei Verdacht auf Geldwäsche oder Terrorismusfinanzierung
- "Verdacht" = konkrete Anhaltspunkte (nicht bloße Vermutung)

**Wohin melden?**
- Financial Intelligence Unit (FIU) beim Zoll
- Online-Portal: www.fiu.bund.de

**Wichtig:**
- Kunde darf NICHT informiert werden (Tipping-Off-Verbot, § 48 GwG)
- Schutz vor Haftung bei gutgläubiger Meldung (§ 47 GwG)

**5. Aufbewahrungspflicht (§ 8 GwG)**
- Alle Dokumente 5 Jahre aufbewahren
- Identifizierungsunterlagen, Risikoanalysen, Korrespondenz

### Sanktionen bei Verstößen

**Bußgelder (§ 56 GwG):**
- Fehlende Identifizierung: bis 100.000 €
- Fehlende Verdachtsmeldung: bis 150.000 €
- Tipping-Off (Kunde informiert): bis 150.000 €

**Strafrechtlich (§ 261 StGB):**
- Geldwäsche: Freiheitsstrafe bis 5 Jahre
- Bei gewerbsmäßiger Geldwäsche: bis 10 Jahre
    `,
    law: [
      "[GwG § 2](https://www.gesetze-im-internet.de/gwg_2017/__2.html) (Verpflichtete)",
      "[GwG § 10](https://www.gesetze-im-internet.de/gwg_2017/__10.html) (Risikoanalyse)",
      "[GwG § 11](https://www.gesetze-im-internet.de/gwg_2017/__11.html) (Identifizierung)",
      "[GwG § 23](https://www.gesetze-im-internet.de/gwg_2017/__23.html) (Transparenzregister)",
      "[GwG § 43](https://www.gesetze-im-internet.de/gwg_2017/__43.html) (Verdachtsmeldung)"
    ],
    practice: `
### Praxis-Übung: Identifizierung eines Kunden

**Szenario:**
Herr M. (45) möchte seine Wohnung verkaufen. Er kommt zu Ihnen ins Büro und beauftragt Sie als Makler.

**Ihre Aufgabe:**
Führen Sie die GwG-Identifizierung durch.

**Schritt-für-Schritt-Anleitung:**

**1. Identitätsprüfung**
- "Darf ich bitte Ihren Personalausweis sehen?"
- Prüfen Sie: Ist der Ausweis gültig? Stimmt das Foto?
- Kopieren Sie den Ausweis (Vorder- und Rückseite)

**2. Daten erfassen**
- Name: Max Mustermann
- Geburtsdatum: 01.01.1979
- Adresse: Musterstraße 1, 80000 München
- Ausweisnummer: L123456789
- Gültig bis: 01.01.2030

**3. Wirtschaftlich Berechtigter**
- Frage: "Handeln Sie für sich selbst oder für jemand anderen?"
- Herr M.: "Für mich selbst."
- → Wirtschaftlich Berechtigter = Herr M.

**4. Risikoanalyse**
- Standardrisiko (Deutscher, Wohnsitz in Deutschland, keine Auffälligkeiten)
- Keine verstärkten Sorgfaltspflichten erforderlich

**5. Dokumentation**
- Ausweiskopie in Akte ablegen
- Identifizierungsformular ausfüllen
- Datum und Unterschrift

**6. Aufbewahrung**
- Akte 5 Jahre aufbewahren (ab Ende der Geschäftsbeziehung)
    `,
    caseStudy: `
**Fall: Der verdächtige Käufer**

Ein Käufer (Herr X.) will eine Wohnung für 300.000 € kaufen. Er sagt, er will bar zahlen. Auf Nachfrage sagt er, das Geld stamme aus einem Lottogewinn. Er kann aber keinen Nachweis vorlegen.

**Fragen:**
1. Ist das verdächtig?
2. Was müssen Sie tun?
3. Dürfen Sie Herrn X. informieren?

**Lösung:**

**Zu 1:** JA, das ist verdächtig.
- Barzahlung über 10.000 € ist Risikofaktor
- Fehlender Nachweis der Herkunft
- Unplausible Erklärung (Lottogewinn ohne Beleg)

**Zu 2:** Verdachtsmeldung an FIU (Financial Intelligence Unit)
- Online-Formular ausfüllen: www.fiu.bund.de
- Alle bekannten Daten angeben (Name, Adresse, Sachverhalt)
- Kopien aller Unterlagen beifügen

**Zu 3:** NEIN, auf keinen Fall!
- Tipping-Off-Verbot (§ 48 GwG)
- Bei Verstoß: Bußgeld bis 150.000 €
- Geschäft darf NICHT abgebrochen werden (würde Kunde warnen)

**Praxis-Tipp:**
- Geschäft "verzögern" (z.B. "Notar hat erst in 4 Wochen Termin")
- FIU entscheidet, ob Ermittlungen eingeleitet werden
- Wenn FIU grünes Licht gibt: Geschäft kann fortgesetzt werden
    `,
    task: "Erstellen Sie einen Laufzettel zur GwG-Prüfung (Checkliste für jeden Kundenauftrag).",
    solution: `
**Muster-Laufzettel GwG-Prüfung**

**Kunde:** ___________________________ **Datum:** ___________

**1. Identifizierung**
- [ ] Personalausweis/Reisepass im Original gesehen
- [ ] Gültigkeit geprüft (Ablaufdatum: ___________)
- [ ] Foto mit Person abgeglichen
- [ ] Kopie angefertigt (Vorder- und Rückseite)

**2. Datenerfassung**
- [ ] Name: ___________________________
- [ ] Geburtsdatum: ___________________________
- [ ] Adresse: ___________________________
- [ ] Ausweisnummer: ___________________________

**3. Wirtschaftlich Berechtigter**
- [ ] Kunde handelt für sich selbst
- [ ] Kunde handelt für juristische Person (→ Transparenzregister prüfen)
- [ ] Wirtschaftlich Berechtigter: ___________________________

**4. Risikoanalyse**
- [ ] Standardrisiko (keine Auffälligkeiten)
- [ ] Erhöhtes Risiko (Grund: ___________________________)
- [ ] Hochrisiko (Grund: ___________________________)

**5. Verstärkte Sorgfaltspflichten (bei erhöhtem/Hochrisiko)**
- [ ] Zusätzliche Dokumente angefordert (welche: ___________)
- [ ] Herkunft der Mittel geklärt (Quelle: ___________)
- [ ] Geschäftsführung informiert

**6. Verdachtsmeldung**
- [ ] Kein Verdacht
- [ ] Verdacht (→ FIU-Meldung erstellt am: ___________)

**7. Dokumentation**
- [ ] Alle Unterlagen in Kundenakte abgelegt
- [ ] Identifizierungsformular ausgefüllt
- [ ] Aufbewahrungsfrist: bis ___________ (5 Jahre ab Geschäftsende)

**Unterschrift Makler:** ___________________________
    `,
    type: "Recht"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Geldwäschegesetz (GwG)' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Geldwäschegesetz (GwG)'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'GwG Pflichten, Identifizierung, Verdachtsmeldung, Dokumentation' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Ab welchem Betrag müssen Makler bei Barzahlungen den Kunden nach GwG identifizieren?",
        options: [
          "Ab 1.000 EUR",
          "Ab 5.000 EUR",
          "Ab 10.000 EUR",
          "Immer, unabhängig vom Betrag"
        ],
        correct: 2,
        explanation: "§10 GwG: Bei Transaktionen ab 10.000 EUR in bar besteht Identifizierungspflicht. Bei Verdacht unabhängig vom Betrag."
      }
    ],},

  // Weitere Tage (11-20) folgen dem gleichen Muster...
  // Aus Platzgründen hier abgekürzt, aber in der finalen Version vollständig

  day_11: {
    title: "Berufsfeld: Immobilienmakler",
    theory: "Der Immobilienmakler vermittelt zwischen Angebot und Nachfrage. Der Beruf erfordert Vertriebsstärke, Marktkenntnisse und rechtliches Grundwissen.",
    extendedTheory: `
### Marktanalyse: Die Kunst der Standortbewertung

Die Standortanalyse ist das Fundament jeder erfolgreichen Immobilientransaktion. Ein Makler, der seinen Markt nicht kennt, ist wie ein Arzt ohne Diagnose. In diesem Abschnitt vertiefen wir die Methoden der professionellen Marktanalyse.

**1. Die Makro-Lage: Das große Bild**

Bevor wir uns auf die Mikro-Lage konzentrieren, müssen wir die übergeordneten Faktoren verstehen:

**A. Wirtschaftliche Rahmenbedingungen**
- **Arbeitsmarkt:** Eine niedrige Arbeitslosenquote (unter 5%) ist ein positiver Indikator. Wichtiger noch: Welche Branchen dominieren? Monokulturen (z.B. Automobilindustrie in Wolfsburg) sind anfällig für Krisen.
- **Kaufkraft:** Der GfK-Kaufkraftindex zeigt die verfügbaren Einkommen. München liegt bei ca. 130 (30% über Bundesdurchschnitt), ländliche Regionen oft unter 90.
- **Infrastruktur:** Autobahnanschluss, Bahnhof, Flughafen – je besser die Anbindung, desto attraktiver die Lage.

**B. Demografische Entwicklung**
- **Bevölkerungswachstum:** Wächst die Stadt? Schrumpft sie? Ein Blick auf die letzten 10 Jahre zeigt den Trend.
- **Altersstruktur:** Eine junge Bevölkerung (Durchschnittsalter unter 40) deutet auf Dynamik hin. Überalterung (über 50) kann auf Abwanderung hindeuten.
- **Haushaltsstruktur:** Singles, Familien, Senioren – jede Gruppe hat andere Bedürfnisse.

**2. Die Mikro-Lage: Der entscheidende Unterschied**

Innerhalb einer Stadt können die Preise um 50-100% variieren. Warum? Die Mikro-Lage.

**A. Die 7 Faktoren der Mikro-Lage**
1. **Verkehrsanbindung:** U-Bahn, Bus, Autobahn – je näher, desto besser (aber Vorsicht: Lärm!)
2. **Einkaufsmöglichkeiten:** Supermarkt fußläufig erreichbar? Oder nur mit Auto?
3. **Schulen & Kitas:** Für Familien entscheidend. Gute Schulen = höhere Preise.
4. **Grünflächen:** Parks, Spielplätze, Naherholung – Lebensqualität zählt.
5. **Sicherheit:** Kriminalitätsstatistik der Polizei gibt Aufschluss.
6. **Nachbarschaft:** Soziale Struktur, Lärmpegel, Sauberkeit.
7. **Zukunftspotenzial:** Kommt ein neues Einkaufszentrum? Wird eine Straße saniert?

**B. Praxisbeispiel: Berlin-Prenzlauer Berg vs. Berlin-Marzahn**
- **Prenzlauer Berg:** 6.000-8.000 €/m² (Altbau), 8.000-12.000 €/m² (Neubau)
- **Marzahn:** 2.500-3.500 €/m² (Plattenbau), 4.000-5.500 €/m² (Neubau)

Warum der Unterschied? Prenzlauer Berg hat bessere Infrastruktur, mehr Grünflächen, höhere Kaufkraft, bessere Schulen. Marzahn kämpft mit dem Image der DDR-Plattenbausiedlung.

**3. Datenquellen: Wo finde ich die Informationen?**

**A. Öffentliche Quellen (kostenlos)**
- **Gutachterausschüsse:** Grundstücksmarktberichte (oft teilweise kostenlos als PDF)
- **Statistische Ämter:** Destatis (Bund), Statistische Landesämter
- **Immobilienportale:** ImmoScout24 Preisatlas, Immowelt Preisspiegel
- **Makler-Reports:** Engel & Völkers, JLL, CBRE veröffentlichen regelmäßig Marktberichte

**B. Kostenpflichtige Quellen**
- **Gutachterausschüsse:** Detaillierte Bodenrichtwerte (ca. 50-200 € je nach Region)
- **Marktdatenbanken:** Empirica, Bulwiengesa (Abo-Modelle für Profis)
- **IVD-Marktberichte:** Immobilienverband Deutschland (für Mitglieder)

**4. Die Marktanalyse in der Praxis: Der 3-Schritte-Plan**

**Schritt 1: Makro-Analyse (1 Stunde)**
- Recherchieren Sie Einwohnerzahl, Kaufkraft, Arbeitslosenquote
- Prüfen Sie die Bevölkerungsentwicklung der letzten 10 Jahre
- Analysieren Sie die Wirtschaftsstruktur (Branchen, Arbeitgeber)

**Schritt 2: Mikro-Analyse (2 Stunden)**
- Besuchen Sie das Viertel zu verschiedenen Tageszeiten
- Sprechen Sie mit Anwohnern, Ladenbesitzern, Hausmeistern
- Prüfen Sie die 7 Faktoren der Mikro-Lage (siehe oben)

**Schritt 3: Preisentwicklung (1 Stunde)**
- Recherchieren Sie aktuelle Angebote auf ImmoScout24, Immowelt
- Vergleichen Sie Angebots- und Verkaufspreise (Gutachterausschuss)
- Erstellen Sie eine Preistabelle (Bestand vs. Neubau, Wohnung vs. Haus)

**Ergebnis:** Sie können einem Kunden in 5 Minuten erklären, warum eine Immobilie in diesem Viertel X Euro kostet und wie sich der Markt entwickeln wird.

**5. Fallstrick: Die Blase erkennen**

Wann ist ein Markt überhitzt? Achten Sie auf diese Warnsignale:
- **Kaufpreisfaktor über 30:** Kaufpreis / Jahresnettokaltmiete > 30 = überteuert
- **Leerstand steigt:** Mehr Angebot als Nachfrage
- **Bauaktivität explodiert:** Zu viele Neubauten = Überangebot
- **Zinsen steigen:** Weniger Käufer können sich Kredite leisten

**Beispiel München 2022:** Kaufpreisfaktor bei 40-50, Zinsen stiegen von 1% auf 4% → Preisrückgang um 10-15% in 2023.
    `,
    law: ["[§ 34c GewO](https://www.gesetze-im-internet.de/gewo/__34c.html) (Maklererlaubnis)",
      "[§ 652 BGB](https://www.gesetze-im-internet.de/bgb/__652.html) (Maklervertrag)",
      "[§ 1 MaBV](https://www.gesetze-im-internet.de/gewo_34cdv/__1.html) (Berufspflichten)"],
    practice: "Erstellen Sie einen typischen Tagesablauf eines Maklers mit Zeitblöcken für Akquise, Besichtigungen, Verwaltung.",
    task: "Interviewen Sie einen Makler (oder recherchieren Sie online): Was sind die 3 größten Herausforderungen im Berufsalltag?",
    type: "Berufsbild"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Berufsfeld: Immobilienmakler' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Berufsfeld: Immobilienmakler'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'Maklertätigkeit, Vermarktung, Exposé, Besichtigungen, Kaufvertrag' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Was ist eine Makro-Lage bei der Standortanalyse?",
        options: [
          "Die genaue Straßenlage",
          "Die Stadt/Region/Wirtschaftsraum-Ebene",
          "Die Zimmergröße",
          "Der Zustand des Gebäudes"
        ],
        correct: 1,
        explanation: "Makrolage = übergeordnete Ebene (Stadt, Region, Wirtschaftsraum). Mikrolage = konkrete Lage (Straße, Nachbarschaft, Anbindung)."
      }
    ],},

  day_12: {
    title: "Berufsfeld: Immobilienverwalter",
    theory: "Der Immobilienverwalter kümmert sich um die Bestandspflege von Immobilien. Man unterscheidet WEG-Verwaltung und Mietverwaltung.",
    extendedTheory: `
### Marktteilnehmer: Das Ökosystem der Immobilienwirtschaft

Die Immobilienwirtschaft ist ein komplexes Netzwerk von Akteuren mit unterschiedlichen Interessen und Rollen. Wer versteht, wie diese Akteure zusammenarbeiten (und manchmal gegeneinander), kann erfolgreicher agieren.

**1. Die Anbieter: Wer bringt Immobilien auf den Markt?**

**A. Projektentwickler: Die Visionäre**

Projektentwickler sind die Architekten des Immobilienmarkts. Sie kaufen Grundstücke, entwickeln Konzepte und realisieren Neubauten.

**Typischer Ablauf:**
1. **Grundstücksakquise:** Suche nach geeigneten Flächen (oft über Makler)
2. **Machbarkeitsstudie:** Bebauungsplan prüfen, Wirtschaftlichkeit berechnen
3. **Finanzierung:** Eigenkapital (20-30%) + Fremdkapital (70-80%)
4. **Planung & Genehmigung:** Architekt, Baugenehmigung (6-12 Monate)
5. **Bauphase:** 12-24 Monate je nach Projekt
6. **Vermarktung:** Verkauf an Endkunden oder Investoren

**Beispiel:** Ein Projektentwickler kauft ein 5.000 m² Grundstück in München für 10 Mio. €. Er plant 50 Wohnungen (Ø 80 m²). Baukosten: 15 Mio. €. Verkaufspreis: 8.000 €/m² × 4.000 m² = 32 Mio. €. Gewinn: 7 Mio. € (vor Steuern).

**B. Bauträger: Die Umsetzer**

Bauträger sind ähnlich wie Projektentwickler, aber sie bauen auf eigenem Grund und verkaufen "schlüsselfertig" (Bauträgervertrag).

**Unterschied zum Projektentwickler:**
- Bauträger verkaufen an Endkunden (Selbstnutzer, Kapitalanleger)
- Projektentwickler verkaufen oft das gesamte Projekt an Investoren

**Rechtlicher Rahmen:**
- **Bauträgervertrag:** Geregelt in §§ 650u ff. BGB
- **Sicherheiten:** Bauträger muss Sicherheiten stellen (Bürgschaft, Treuhandkonto)
- **Abschlagszahlungen:** Max. 7 Raten gemäß MaBV

**C. Bestandshalter: Die Langfristigen**

Bestandshalter kaufen Immobilien und halten sie langfristig (10-30 Jahre). Ziel: Mieteinnahmen + Wertsteigerung.

**Typen:**
- **Wohnungsbaugesellschaften:** Vonovia, Deutsche Wohnen (börsennotiert)
- **Immobilienfonds:** Offene Fonds (für Privatanleger), geschlossene Fonds (für Profis)
- **Versicherungen & Pensionskassen:** Langfristige Anlage für Altersvorsorge
- **Private Vermieter:** Kleinvermieter (1-10 Wohnungen)

**2. Die Nachfrager: Wer kauft oder mietet?**

**A. Selbstnutzer: Die Eigenheimbesitzer**

Selbstnutzer kaufen Immobilien, um selbst darin zu wohnen. Sie sind emotional motiviert und weniger preissensibel.

**Kaufmotive:**
- **Sicherheit:** Eigene vier Wände, keine Mieterhöhungen
- **Altersvorsorge:** Mietfrei im Alter
- **Gestaltungsfreiheit:** Renovierung, Umbau nach eigenen Wünschen

**Finanzierung:**
- Eigenkapital: 20-30% (empfohlen)
- Fremdkapital: 70-80% (Annuitätendarlehen)
- Laufzeit: 25-35 Jahre

**B. Kapitalanleger: Die Rendite-Jäger**

Kapitalanleger kaufen Immobilien als Geldanlage. Sie sind rational und preissensibel.

**Kaufmotive:**
- **Rendite:** 3-6% Nettomietrendite (nach Kosten)
- **Wertsteigerung:** 2-4% p.a. (historisch)
- **Steuervorteile:** Abschreibung (AfA), Werbungskosten

**Kennzahlen:**
- **Kaufpreisfaktor:** Kaufpreis / Jahresnettokaltmiete (Ziel: 20-25)
- **Eigenkapitalrendite:** (Mieteinnahmen - Kosten) / Eigenkapital (Ziel: 8-12%)

**C. Mieter: Die Nutzer**

Mieter zahlen Miete für die Nutzung einer Immobilie. Sie sind die größte Gruppe (ca. 50% in Deutschland).

**Mietrecht:**
- **Mietvertrag:** §§ 535 ff. BGB
- **Mieterhöhung:** Max. 20% in 3 Jahren (§ 558 BGB)
- **Kündigung:** 3 Monate Kündigungsfrist (Mieter), 3-9 Monate (Vermieter)

**3. Die Dienstleister: Die Vermittler**

**A. Makler: Die Brückenbauer**

Makler vermitteln zwischen Angebot und Nachfrage. Sie erhalten Provision (3-7% + MwSt.).

**Aufgaben:**
- Objektakquise (Verkäufer finden)
- Vermarktung (Exposé, Inserate, Besichtigungen)
- Verhandlung (Preis, Konditionen)
- Vertragsabwicklung (Notartermin, Übergabe)

**Vergütung:**
- **Käufermarkt:** Verkäufer zahlt (z.B. Berlin: 7,14% vom Verkäufer)
- **Verkäufermarkt:** Käufer zahlt (z.B. München: 3,57% vom Käufer + 3,57% vom Verkäufer)

**B. Verwalter: Die Kümmerer**

Verwalter kümmern sich um den laufenden Betrieb von Immobilien.

**Typen:**
- **WEG-Verwaltung:** Verwaltung von Eigentumswohnungen (§ 26a WEG)
- **Mietverwaltung:** Verwaltung von Mietobjekten (Mieterbetreuung, Instandhaltung)
- **Sondereigentumsverwaltung:** Verwaltung einzelner Wohnungen (für Kapitalanleger)

**Vergütung:**
- WEG: 20-35 €/Einheit/Monat
- Mietverwaltung: 20-30% der Jahresnettokaltmiete

**C. Sachverständige: Die Bewerter**

Sachverständige ermitteln den Wert von Immobilien. Sie sind neutral und unabhängig.

**Einsatzgebiete:**
- Verkehrswertgutachten (für Gericht, Finanzamt)
- Beleihungswertgutachten (für Banken)
- Schadensgutachten (für Versicherungen)

**Vergütung:**
- Verkehrswertgutachten: 1.500-3.000 € (je nach Objekt)
- Kurzgutachten: 500-1.000 €

**4. Die Finanzierer: Die Geldgeber**

**A. Banken: Die Kreditgeber**

Banken finanzieren Immobilienkäufe mit Annuitätendarlehen.

**Konditionen (Stand 2026):**
- Zinssatz: 3,5-4,5% (10 Jahre Zinsbindung)
- Beleihung: Max. 80% des Verkehrswerts
- Tilgung: 2-3% p.a. (empfohlen)

**B. Bausparkassen: Die Kombinierer**

Bausparkassen bieten Bausparverträge (Sparphase + Darlehensphase).

**Vorteil:** Zinssicherheit (Zinssatz wird bei Vertragsabschluss festgelegt)
**Nachteil:** Lange Wartezeit (7-10 Jahre bis zur Zuteilung)

**5. Die öffentliche Hand: Der Regulator**

**A. Bund & Länder**
- Gesetzgebung (BGB, GewO, WEG)
- Förderung (KfW-Kredite, Wohnungsbauprämie)

**B. Kommunen**
- Bebauungsplan (was darf wo gebaut werden?)
- Grundsteuer (Einnahmequelle)
- Sozialwohnungen (Quote bei Neubauten)

**Beispiel:** München fordert 30% Sozialwohnungen bei Neubauten. Projektentwickler müssen diese Quote erfüllen oder Ausgleichszahlung leisten.
    `,
    law: ["[§ 1 WEG](https://www.gesetze-im-internet.de/woeigg/__1.html) (Wohnungseigentum)",
      "[§ 26a WEG](https://www.gesetze-im-internet.de/woeigg/__26a.html) (Verwalter Pflichtfortbildung)",
      "[§ 535 BGB](https://www.gesetze-im-internet.de/bgb/__535.html) (Mietvertrag Grundpflichten)"],
    practice: "Erstellen Sie eine Aufgabenliste für einen WEG-Verwalter (kaufmännisch und technisch).",
    task: "Recherchieren Sie: Was ist der Unterschied zwischen WEG-Verwaltung und Mietverwaltung?",
    type: "Berufsbild"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Berufsfeld: Immobilienverwalter' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Berufsfeld: Immobilienverwalter'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'WEG-Verwaltung, Mietverwaltung, Eigentümerversammlung, Abrechnung' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Was unterscheidet WEG-Verwaltung von Mietverwaltung?",
        options: [
          "Kein Unterschied",
          "WEG = Verwaltung für Eigentümergemeinschaft; Mietverwaltung = für einzelnen Vermieter",
          "WEG nur für Neubauten",
          "Mietverwaltung nur für Gewerbe"
        ],
        correct: 1,
        explanation: "WEG-Verwaltung verwaltet gemeinschaftliches Eigentum einer Eigentümergemeinschaft. Mietverwaltung verwaltet Mietobjekte für einzelne Eigentümer."
      }
    ],},

  day_13: {
    title: "Berufsfeld: Gutachter & Sachverständiger",
    theory: "Gutachter ermitteln den Wert von Immobilien. Sie benötigen fundiertes technisches und rechtliches Wissen.",
    extendedTheory: `
### Immobilienarten: Die Vielfalt des Marktes

Der Immobilienmarkt ist kein homogener Block, sondern ein buntes Mosaik verschiedener Nutzungsarten. Jede Immobilienart hat ihre eigenen Gesetzmäßigkeiten, Chancen und Risiken.

**1. Wohnimmobilien: Das Herzstück des Marktes**

Wohnimmobilien machen ca. 80% des gesamten Immobilienbestands in Deutschland aus. Sie sind die stabilste Anlageklasse.

**A. Einfamilienhaus (EFH): Der deutsche Traum**

**Definition:** Freistehendes Haus mit einem Haushalt, eigenem Grundstück und Garten.

**Vorteile:**
- Maximale Privatsphäre
- Gestaltungsfreiheit (Garten, Fassade, Umbau)
- Wertstabilität (Grundstück + Gebäude)

**Nachteile:**
- Hohe Kosten (Kauf, Unterhalt, Energie)
- Gebunden an einen Standort
- Aufwändige Pflege (Garten, Haus)

**Marktdaten (2026):**
- Durchschnittspreis Deutschland: 350.000-450.000 €
- München: 800.000-1.500.000 €
- Ländliche Regionen: 200.000-300.000 €

**Zielgruppe:** Familien mit Kindern, Gutverdiener, Selbstnutzer

**B. Mehrfamilienhaus (MFH): Die Rendite-Maschine**

**Definition:** Gebäude mit 3 oder mehr Wohneinheiten, meist zur Vermietung.

**Vorteile:**
- Hohe Rendite (4-6% Nettomietrendite)
- Risikostreuung (mehrere Mieter)
- Wertsteigerung (Lage + Sanierung)

**Nachteile:**
- Hoher Kapitaleinsatz (500.000-5.000.000 €)
- Verwaltungsaufwand (Mieterbetreuung, Instandhaltung)
- Leerstandsrisiko

**Marktdaten (2026):**
- Kaufpreisfaktor: 20-30 (je nach Lage)
- Nettomietrendite: 3-6%
- Wertsteigerung: 2-4% p.a.

**Zielgruppe:** Kapitalanleger, Immobilienfonds, Wohnungsbaugesellschaften

**C. Eigentumswohnung (ETW): Der Kompromiss**

**Definition:** Einzelne Wohnung in einem Mehrfamilienhaus, die als Sondereigentum verkauft wird.

**Vorteile:**
- Geringerer Kapitaleinsatz als EFH (100.000-500.000 €)
- Wertstabilität (vor allem in Großstädten)
- Flexibilität (Selbstnutzung oder Vermietung)

**Nachteile:**
- Abhängigkeit von WEG (Eigentümergemeinschaft)
- Hausgeld (200-400 €/Monat)
- Eingeschränkte Gestaltungsfreiheit

**Marktdaten (2026):**
- Durchschnittspreis Deutschland: 250.000-350.000 €
- München: 600.000-1.200.000 €
- Berlin: 400.000-800.000 €

**Zielgruppe:** Singles, Paare ohne Kinder, Kapitalanleger

**2. Gewerbeimmobilien: Die Profis**

Gewerbeimmobilien sind für gewerbliche Nutzung konzipiert. Sie bieten höhere Renditen, aber auch höhere Risiken.

**A. Büroimmobilien: Das Rückgrat der Wirtschaft**

**Definition:** Gebäude für Büronutzung (Verwaltung, Dienstleistung).

**Vorteile:**
- Hohe Mieten (15-40 €/m²/Monat in Großstädten)
- Langfristige Mietverträge (5-10 Jahre)
- Professionelle Mieter (Unternehmen)

**Nachteile:**
- Hohe Investition (5-50 Mio. €)
- Leerstandsrisiko (Konjunktur, Home-Office)
- Spezialisierung erforderlich

**Marktdaten (2026):**
- Spitzenmiete München: 40 €/m²/Monat
- Spitzenmiete Frankfurt: 45 €/m²/Monat
- Leerstandsquote Deutschland: 5-8%

**Trend:** Home-Office hat die Nachfrage reduziert. Flexible Bürokonzepte (Co-Working) gewinnen an Bedeutung.

**B. Handelsimmobilien: Der Wandel**

**Definition:** Gebäude für Einzelhandel (Geschäfte, Einkaufszentren, Supermärkte).

**Vorteile:**
- Hohe Frequenz (Laufkundschaft)
- Langfristige Mietverträge (10-15 Jahre)
- Triple-Net-Verträge (Mieter zahlt alle Nebenkosten)

**Nachteile:**
- E-Commerce-Konkurrenz (Online-Handel)
- Leerstandsrisiko (Innenstädte verlieren an Attraktivität)
- Hohe Investition (10-100 Mio. €)

**Marktdaten (2026):**
- Spitzenmiete München (1a-Lage): 300-400 €/m²/Monat
- Leerstandsquote Innenstädte: 10-15%

**Trend:** Innenstädte kämpfen mit Leerstand. Nahversorger (Supermärkte, Discounter) sind stabil.

**C. Logistikimmobilien: Der Gewinner**

**Definition:** Lagerhallen, Distributionszentren, Fulfillment-Center.

**Vorteile:**
- Hohe Nachfrage (E-Commerce-Boom)
- Langfristige Mietverträge (10-20 Jahre)
- Geringe Leerstandsquote (< 3%)

**Nachteile:**
- Hohe Investition (20-200 Mio. €)
- Standortabhängigkeit (Autobahnnähe)
- Spezialisierung erforderlich

**Marktdaten (2026):**
- Spitzenmiete Deutschland: 6-8 €/m²/Monat
- Leerstandsquote: 2-3%

**Trend:** E-Commerce treibt die Nachfrage. Amazon, Zalando, DHL sind Hauptmieter.

**3. Sonderimmobilien: Die Exoten**

Sonderimmobilien sind spezialisierte Immobilien mit besonderen Anforderungen.

**A. Hotels: Die Zyklischen**

**Vorteile:** Hohe Renditen (8-12% in guten Jahren)
**Nachteile:** Konjunkturabhängig, Pandemie-Risiko, Managementintensiv

**B. Pflegeheime: Die Demografischen**

**Vorteile:** Stabile Nachfrage (alternde Gesellschaft), staatliche Förderung
**Nachteile:** Regulierung, Betreiberrisiko, hohe Investition

**C. Parkhäuser: Die Urbanen**

**Vorteile:** Stabile Einnahmen, geringe Instandhaltung
**Nachteile:** E-Mobilität (weniger Parkbedarf?), Standortabhängigkeit

**4. Praxisbeispiel: Portfolio-Diversifikation**

Ein Investor mit 5 Mio. € Eigenkapital könnte folgendes Portfolio aufbauen:

**Konservativ (Sicherheit):**
- 60% Wohnimmobilien (MFH, ETW)
- 30% Büroimmobilien (Core-Standorte)
- 10% Liquidität

**Ausgewogen (Balance):**
- 40% Wohnimmobilien
- 30% Büroimmobilien
- 20% Logistikimmobilien
- 10% Liquidität

**Offensiv (Rendite):**
- 30% Wohnimmobilien
- 20% Büroimmobilien
- 30% Logistikimmobilien
- 10% Hotels
- 10% Liquidität

**Fazit:** Diversifikation reduziert Risiken. Wohnimmobilien sind das Fundament, Gewerbeimmobilien bieten höhere Renditen.
    `,
    law: ["[ImmoWertV](https://www.gesetze-im-internet.de/immowertv_2022/)", "[BauGB](https://www.gesetze-im-internet.de/bbaug/)"],
    practice: "Unterscheiden Sie: Kurzbewertung (Makler) vs. Vollgutachten (Sachverständiger).",
    task: "Recherchieren Sie die Voraussetzungen, um öffentlich bestellter Gutachter zu werden.",
    type: "Berufsbild"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Berufsfeld: Gutachter & Sachverständiger' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Berufsfeld: Gutachter & Sachverständiger'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'Wertermittlung, ImmoWertV, Verkehrswert, Gutachterausschuss' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Welches Gesetz regelt die Immobilienwertermittlung in Deutschland?",
        options: [
          "BGB",
          "GewO",
          "ImmoWertV 2022",
          "WEG"
        ],
        correct: 2,
        explanation: "Die Immobilienwertermittlungsverordnung (ImmoWertV) 2021 regelt die Verfahren zur Ermittlung von Grundstückswerten (§194 BauGB)."
      }
    ],},

  day_14: {
    title: "Berufsfeld: Darlehensvermittler",
    theory: "Darlehensvermittler beraten Kunden bei der Immobilienfinanzierung und vermitteln Darlehen. Sie benötigen eine Erlaubnis nach § 34i GewO.",
    extendedTheory: `
### Rechtsformen: Die juristische Basis

Die Wahl der richtigen Rechtsform ist eine der wichtigsten Entscheidungen für Immobilienunternehmer. Sie beeinflusst Haftung, Steuern, Finanzierung und Nachfolge.

**1. Einzelunternehmen: Der Klassiker**

**Definition:** Eine natürliche Person betreibt ein Gewerbe unter eigenem Namen.

**Vorteile:**
- **Einfache Gründung:** Gewerbeanmeldung genügt (keine Notarkosten)
- **Volle Kontrolle:** Alle Entscheidungen allein
- **Steuervorteile:** Einkommensteuer (0-45%), keine Gewerbesteuer bei Vermietung

**Nachteile:**
- **Unbeschränkte Haftung:** Mit gesamtem Privatvermögen
- **Kreditwürdigkeit:** Banken verlangen oft persönliche Bürgschaften
- **Nachfolge:** Schwierig (Betrieb endet mit Tod)

**Geeignet für:**
- Einzelmakler mit geringem Risiko
- Vermieter mit 1-5 Wohnungen
- Nebenberufliche Tätigkeit

**Praxisbeispiel:**
Herr Schmidt ist Einzelmakler. Er vermittelt jährlich 10 Immobilien (Provision: 200.000 €). Gewinn nach Kosten: 150.000 €. Steuerlast: ca. 60.000 € (Einkommensteuer + Solidaritätszuschlag).

**2. Gesellschaft bürgerlichen Rechts (GbR): Die Partnerschaft**

**Definition:** Zusammenschluss von 2 oder mehr Personen zur Verfolgung eines gemeinsamen Zwecks.

**Vorteile:**
- **Einfache Gründung:** Mündlich möglich (schriftlicher Vertrag empfohlen)
- **Flexibilität:** Gewinnverteilung frei gestaltbar
- **Steuervorteile:** Einkommensteuer (wie Einzelunternehmen)

**Nachteile:**
- **Unbeschränkte Haftung:** Alle Gesellschafter haften gesamtschuldnerisch
- **Konfliktpotenzial:** Entscheidungen müssen einstimmig getroffen werden
- **Kreditwürdigkeit:** Banken verlangen Bürgschaften aller Gesellschafter

**Geeignet für:**
- Makler-Partnerschaften (2-3 Personen)
- Familien-Immobilienbesitz (Geschwister, Eltern-Kinder)
- Projektentwicklungen (kurzfristige Zusammenarbeit)

**Praxisbeispiel:**
Frau Müller und Herr Weber gründen eine GbR. Sie kaufen gemeinsam ein MFH für 1 Mio. € (je 50% Eigenkapital). Mieteinnahmen: 60.000 €/Jahr. Gewinn nach Kosten: 40.000 €. Jeder versteuert 20.000 € als Einkommen.

**3. Kommanditgesellschaft (KG): Die Haftungstrennung**

**Definition:** Personengesellschaft mit Komplementär (unbeschränkte Haftung) und Kommanditisten (beschränkte Haftung).

**Vorteile:**
- **Haftungsbeschränkung:** Kommanditisten haften nur mit Einlage
- **Steuervorteile:** Einkommensteuer (wie GbR)
- **Finanzierung:** Kommanditisten können Kapital einbringen ohne Haftungsrisiko

**Nachteile:**
- **Komplexität:** Gesellschaftsvertrag erforderlich (Notar)
- **Komplementär:** Muss unbeschränkt haften (oft GmbH & Co. KG)
- **Publizität:** Eintragung ins Handelsregister

**Geeignet für:**
- Immobilienfonds (geschlossene Fonds)
- Projektentwicklungen mit mehreren Investoren
- Familienunternehmen (Eltern als Komplementär, Kinder als Kommanditisten)

**Praxisbeispiel:**
Eine KG kauft ein Gewerbeimmobilie für 5 Mio. €. Komplementär (GmbH): 100.000 € Einlage. 10 Kommanditisten: je 500.000 € Einlage. Mieteinnahmen: 300.000 €/Jahr. Gewinn nach Kosten: 200.000 €. Jeder Kommanditist erhält 18.000 € (9% Rendite).

**4. Gesellschaft mit beschränkter Haftung (GmbH): Der Standard**

**Definition:** Kapitalgesellschaft mit beschränkter Haftung (Stammkapital: 25.000 €).

**Vorteile:**
- **Haftungsbeschränkung:** Nur Gesellschaftsvermögen haftet
- **Steuergestaltung:** Körperschaftsteuer (15%) + Gewerbesteuer (14-17%) = 29-32%
- **Kreditwürdigkeit:** Banken akzeptieren GmbH als Kreditnehmer

**Nachteile:**
- **Gründungskosten:** Notar, Handelsregister (ca. 1.000-2.000 €)
- **Stammkapital:** 25.000 € erforderlich (12.500 € bei Gründung)
- **Buchführungspflicht:** Doppelte Buchführung, Jahresabschluss, Veröffentlichung

**Geeignet für:**
- Maklerunternehmen mit Mitarbeitern
- Projektentwickler
- Immobilienverwaltungen

**Praxisbeispiel:**
Eine Makler-GmbH erzielt 500.000 € Umsatz. Gewinn nach Kosten: 200.000 €. Steuerlast: 60.000 € (Körperschaftsteuer + Gewerbesteuer). Netto: 140.000 €. Ausschüttung an Gesellschafter: 100.000 € (Abgeltungsteuer: 25% = 25.000 €). Effektive Steuerlast: 42,5%.

**5. GmbH & Co. KG: Die Kombination**

**Definition:** KG mit GmbH als Komplementär (unbeschränkte Haftung) und Gesellschaftern als Kommanditisten.

**Vorteile:**
- **Haftungsbeschränkung:** Alle Gesellschafter haften nur beschränkt (GmbH haftet mit Stammkapital)
- **Steuervorteile:** Einkommensteuer (wie KG), keine Körperschaftsteuer
- **Flexibilität:** Gewinnverteilung frei gestaltbar

**Nachteile:**
- **Komplexität:** Zwei Gesellschaften (GmbH + KG)
- **Kosten:** Gründung, Verwaltung, Steuerberatung
- **Publizität:** Eintragung ins Handelsregister (beide Gesellschaften)

**Geeignet für:**
- Große Immobilienprojekte (10-100 Mio. €)
- Familienunternehmen mit Nachfolgeplanung
- Immobilienfonds (geschlossene Fonds)

**Praxisbeispiel:**
Eine GmbH & Co. KG kauft ein Bürogebäude für 20 Mio. €. GmbH (Komplementär): 100.000 € Stammkapital. 20 Kommanditisten: je 1 Mio. € Einlage. Mieteinnahmen: 1,2 Mio. €/Jahr. Gewinn nach Kosten: 800.000 €. Jeder Kommanditist erhält 38.000 € (3,8% Rendite).

**6. Aktiengesellschaft (AG): Die Großen**

**Definition:** Kapitalgesellschaft mit Aktien als Anteile (Grundkapital: 50.000 €).

**Vorteile:**
- **Kapitalbeschaffung:** Börsengang möglich (Millionen bis Milliarden)
- **Haftungsbeschränkung:** Nur Gesellschaftsvermögen haftet
- **Anonymität:** Aktionäre müssen nicht veröffentlicht werden

**Nachteile:**
- **Gründungskosten:** Notar, Handelsregister, Wirtschaftsprüfer (ca. 10.000-50.000 €)
- **Komplexität:** Vorstand, Aufsichtsrat, Hauptversammlung
- **Regulierung:** Börsenaufsicht, Publizitätspflichten

**Geeignet für:**
- Große Immobilienkonzerne (Vonovia, Deutsche Wohnen)
- Immobilien-AGs (offene Immobilienfonds)

**Praxisbeispiel:**
Vonovia AG: Marktkapitalisierung 20 Mrd. €, 550.000 Wohnungen, 10 Mrd. € Umsatz/Jahr.

**7. Entscheidungsmatrix: Welche Rechtsform passt?**

| Kriterium | Einzelunternehmen | GbR | KG | GmbH | GmbH & Co. KG | AG |
|-----------|-------------------|-----|----|----|---------------|-----|
| Haftung | Unbeschränkt | Unbeschränkt | Komplementär unbeschränkt | Beschränkt | Beschränkt | Beschränkt |
| Gründungskosten | 0 € | 0 € | 1.000-2.000 € | 1.000-2.000 € | 2.000-4.000 € | 10.000-50.000 € |
| Stammkapital | 0 € | 0 € | 0 € | 25.000 € | 25.000 € | 50.000 € |
| Steuerlast | 0-45% | 0-45% | 0-45% | 29-32% | 0-45% | 29-32% |
| Komplexität | Gering | Gering | Mittel | Hoch | Sehr hoch | Sehr hoch |
| Geeignet für | Einzelmakler | Partnerschaften | Fonds | Unternehmen | Große Projekte | Konzerne |

**Fazit:** Für die meisten Immobilienmakler ist die GmbH die beste Wahl (Haftungsbeschränkung + Steuergestaltung). Für große Projekte eignet sich die GmbH & Co. KG.
    `,
    law: ["[§ 34i GewO](https://www.gesetze-im-internet.de/gewo/__34i.html)", "ImmVermV"],
    practice: "Berechnen Sie eine Monatsrate für ein Darlehen über 300.000 € bei 3,5% Zinsen und 2% Tilgung.",
    task: "Vergleichen Sie die Aufgaben eines Maklers mit denen eines Finanzierungsvermittlers.",
    type: "Berufsbild"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Berufsfeld: Darlehensvermittler' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Berufsfeld: Darlehensvermittler'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema '§34i GewO, Finanzierungsberatung, ESIS, Kreditwürdigkeitsprüfung' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Welche Erlaubnis benötigt ein Darlehensvermittler?",
        options: [
          "§ 34c GewO",
          "§ 34i GewO",
          "§ 34d GewO",
          "Keine Erlaubnis erforderlich"
        ],
        correct: 1,
        explanation: "§34i GewO regelt die Erlaubnispflicht für Immobiliardarlehensvermittler gemäß EU-WIKR."
      }
    ],},

  day_15: {
    title: "Datenschutz (DSGVO) & Verbraucherschutz",
    theory: "Immobilienprofis verarbeiten personenbezogene Daten und müssen die DSGVO beachten. Zudem gelten Verbraucherschutzvorschriften wie das Widerrufsrecht.",
    extendedTheory: `
### Immobilienfinanzierung: Das Fundament des Erfolgs

Die Finanzierung ist der Schlüssel zum Immobilienerwerb. Wer die Mechanismen versteht, kann bessere Konditionen verhandeln und Risiken minimieren.

**1. Die Grundlagen der Immobilienfinanzierung**

**A. Die drei Säulen**

Jede Immobilienfinanzierung besteht aus drei Komponenten:

1. **Eigenkapital (EK):** Das eigene Geld des Käufers
2. **Fremdkapital (FK):** Der Kredit der Bank
3. **Kaufnebenkosten (KNK):** Grunderwerbsteuer, Notar, Makler

**Faustregel:**
- Eigenkapital: 20-30% des Kaufpreises + 100% der Kaufnebenkosten
- Fremdkapital: 70-80% des Kaufpreises

**Beispiel:**
- Kaufpreis: 400.000 €
- Kaufnebenkosten: 40.000 € (10%)
- Eigenkapital: 120.000 € (30% + KNK)
- Fremdkapital: 280.000 € (70%)

**B. Die Kaufnebenkosten im Detail**

| Position | Prozentsatz | Beispiel (400.000 €) |
|----------|-------------|----------------------|
| Grunderwerbsteuer | 3,5-6,5% (je nach Bundesland) | 14.000-26.000 € |
| Notar & Grundbuch | 1,5-2% | 6.000-8.000 € |
| Makler | 3-7% (je nach Region) | 12.000-28.000 € |
| **GESAMT** | **8-15,5%** | **32.000-62.000 €** |

**Tipp:** In Berlin zahlt der Verkäufer die Maklerprovision (7,14%). In München teilen sich Käufer und Verkäufer (je 3,57%).

**2. Das Annuitätendarlehen: Der Klassiker**

**A. Funktionsweise**

Das Annuitätendarlehen ist die häufigste Finanzierungsform. Der Kreditnehmer zahlt monatlich eine gleichbleibende Rate (Annuität = Zinsen + Tilgung).

**Formel:**

Annuität = Darlehenssumme × (Zinssatz + Tilgungssatz) / 12


**Beispiel:**
- Darlehenssumme: 280.000 €
- Zinssatz: 4% p.a.
- Tilgungssatz: 2% p.a.
- Annuität: 280.000 € × (4% + 2%) / 12 = 1.400 €/Monat

**B. Zinsbindung: Die Sicherheit**

Die Zinsbindung legt fest, wie lange der Zinssatz garantiert ist. Typische Laufzeiten: 5, 10, 15, 20 Jahre.

**Faustregel:**
- Niedrige Zinsen (< 3%): Lange Zinsbindung (15-20 Jahre)
- Hohe Zinsen (> 5%): Kurze Zinsbindung (5-10 Jahre)

**Beispiel (Stand 2026):**
- 5 Jahre Zinsbindung: 3,5% p.a.
- 10 Jahre Zinsbindung: 4,0% p.a.
- 15 Jahre Zinsbindung: 4,5% p.a.
- 20 Jahre Zinsbindung: 5,0% p.a.

**C. Tilgung: Der Weg zur Schuldenfreiheit**

Die Tilgung ist der Anteil der Rate, der die Restschuld reduziert. Je höher die Tilgung, desto schneller ist das Darlehen abbezahlt.

**Faustregel:**
- Mindesttilgung: 2% p.a.
- Empfohlene Tilgung: 3-4% p.a.
- Maximale Tilgung: 10% p.a. (Sondertilgung)

**Beispiel:**
- Darlehenssumme: 280.000 €
- Zinssatz: 4% p.a.
- Tilgung: 2% p.a.
- Laufzeit: 35 Jahre
- Gesamtzinsen: 180.000 €

**Mit 4% Tilgung:**
- Laufzeit: 22 Jahre
- Gesamtzinsen: 100.000 €
- **Ersparnis: 80.000 €**

**3. Sonderformen der Finanzierung**

**A. Volltilgerdarlehen: Die Planungssicherheit**

**Definition:** Das Darlehen ist am Ende der Zinsbindung vollständig getilgt.

**Vorteile:**
- Planungssicherheit (keine Anschlussfinanzierung)
- Oft günstigere Zinsen (0,1-0,3% Rabatt)

**Nachteile:**
- Hohe monatliche Rate
- Wenig Flexibilität

**Beispiel:**
- Darlehenssumme: 280.000 €
- Zinssatz: 3,8% p.a. (Rabatt)
- Laufzeit: 20 Jahre
- Monatliche Rate: 1.700 €

**B. Bausparvertrag: Die Kombination**

**Definition:** Kombination aus Sparphase (Ansparung) und Darlehensphase (Kredit).

**Vorteile:**
- Zinssicherheit (Zinssatz wird bei Vertragsabschluss festgelegt)
- Staatliche Förderung (Wohnungsbauprämie, Arbeitnehmersparzulage)

**Nachteile:**
- Lange Wartezeit (7-10 Jahre bis zur Zuteilung)
- Niedrige Guthabenzinsen (0,1-0,5% p.a.)

**Beispiel:**
- Bausparsumme: 100.000 €
- Ansparung: 40.000 € (40%)
- Sparphase: 8 Jahre
- Darlehensphase: 60.000 € (Zinssatz: 2,5% p.a.)

**C. Forward-Darlehen: Die Zukunftssicherung**

**Definition:** Kredit, der erst in 1-5 Jahren ausgezahlt wird, aber heute zu aktuellen Konditionen abgeschlossen wird.

**Vorteile:**
- Zinssicherheit (Schutz vor steigenden Zinsen)
- Planungssicherheit (Anschlussfinanzierung gesichert)

**Nachteile:**
- Forward-Aufschlag (0,01-0,03% pro Monat Vorlaufzeit)
- Keine Flexibilität (Vertrag ist bindend)

**Beispiel:**
- Restschuld in 3 Jahren: 200.000 €
- Aktueller Zinssatz: 4% p.a.
- Forward-Aufschlag: 0,02% × 36 Monate = 0,72%
- Forward-Zinssatz: 4,72% p.a.

**4. Die Beleihung: Wie viel Kredit bekomme ich?**

**A. Beleihungswert vs. Verkehrswert**

- **Verkehrswert:** Marktwert der Immobilie (Gutachten)
- **Beleihungswert:** Vorsichtiger Wert der Bank (80-90% des Verkehrswerts)

**Beispiel:**
- Verkehrswert: 400.000 €
- Beleihungswert: 320.000 € (80%)
- Maximaler Kredit: 256.000 € (80% des Beleihungswerts)

**B. Beleihungsauslauf: Die Risikoklasse**

Der Beleihungsauslauf ist das Verhältnis von Kredit zu Beleihungswert.

**Faustregel:**
- 0-60%: Erstrangig (günstigste Zinsen)
- 60-80%: Zweitrangig (Zinsaufschlag 0,2-0,5%)
- 80-100%: Drittrangig (Zinsaufschlag 0,5-1%)

**Beispiel:**
- Beleihungswert: 320.000 €
- Kredit: 280.000 €
- Beleihungsauslauf: 87,5% (Drittrangig)
- Zinssatz: 4,5% p.a. (statt 4% bei Erstrangig)

**5. Die Kreditwürdigkeit: Wie bekomme ich den besten Zinssatz?**

**A. Die SCHUFA-Auskunft**

Die SCHUFA (Schutzgemeinschaft für allgemeine Kreditsicherung) speichert Daten über Kreditnehmer.

**SCHUFA-Score:**
- 95-100%: Sehr gutes Risiko (beste Zinsen)
- 90-95%: Gutes Risiko (normale Zinsen)
- 80-90%: Erhöhtes Risiko (Zinsaufschlag)
- < 80%: Hohes Risiko (Kredit wird abgelehnt)

**Tipp:** Fordern Sie einmal jährlich eine kostenlose SCHUFA-Auskunft an (Art. 15 DSGVO).

**B. Die Haushaltsrechnung**

Die Bank prüft, ob der Kreditnehmer die monatliche Rate zahlen kann.

**Formel:**

Verfügbares Einkommen = Nettoeinkommen - Lebenshaltungskosten - bestehende Kredite


**Beispiel:**
- Nettoeinkommen: 4.000 €/Monat
- Lebenshaltungskosten: 1.500 €/Monat (Pauschale: 800 € + 250 € pro Person)
- Bestehende Kredite: 500 €/Monat
- Verfügbares Einkommen: 2.000 €/Monat
- Maximale Rate: 1.600 €/Monat (80% des verfügbaren Einkommens)

**C. Das Eigenkapital**

Je mehr Eigenkapital, desto besser die Konditionen.

**Faustregel:**
- 10% EK: Zinsaufschlag 0,5-1%
- 20% EK: Normale Zinsen
- 30% EK: Zinsrabatt 0,1-0,3%
- 40% EK: Zinsrabatt 0,3-0,5%

**6. Praxisbeispiel: Die optimale Finanzierung**

**Ausgangssituation:**
- Kaufpreis: 400.000 €
- Kaufnebenkosten: 40.000 € (10%)
- Eigenkapital: 120.000 € (30% + KNK)
- Fremdkapital: 280.000 € (70%)
- Nettoeinkommen: 5.000 €/Monat

**Finanzierungsvorschlag:**
- Darlehenssumme: 280.000 €
- Zinssatz: 4% p.a. (10 Jahre Zinsbindung)
- Tilgung: 3% p.a.
- Monatliche Rate: 1.633 €
- Laufzeit: 26 Jahre
- Gesamtzinsen: 120.000 €

**Optimierung:**
- Sondertilgung: 10.000 €/Jahr
- Laufzeit: 20 Jahre
- Gesamtzinsen: 85.000 €
- **Ersparnis: 35.000 €**

**Fazit:** Hohe Tilgung und Sondertilgungen sparen Zehntausende Euro.
    `,
    law: ["[DSGVO](https://dsgvo-gesetz.de/)", "[§ 355 BGB](https://www.gesetze-im-internet.de/bgb/__355.html) (Widerrufsrecht)"],
    practice: "Erstellen Sie eine Datenschutzerklärung für ein Immobilien-Exposé.",
    task: "Prüfen Sie eine Immobilien-Webseite auf DSGVO-Konformität (Impressum, Datenschutz, Cookies).",
    type: "Recht"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Datenschutz (DSGVO) & Verbraucherschutz' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Datenschutz (DSGVO) & Verbraucherschutz'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'DSGVO Grundsätze, Einwilligung, Datenlöschung, Verbraucherschutz' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Welcher Artikel der DSGVO regelt die Rechtmäßigkeit der Datenverarbeitung?",
        options: [
          "Art. 4 DSGVO",
          "Art. 6 DSGVO",
          "Art. 13 DSGVO",
          "Art. 17 DSGVO"
        ],
        correct: 1,
        explanation: "Art. 6 DSGVO listet die Rechtsgrundlagen für die Verarbeitung personenbezogener Daten abschließend auf."
      }
    ],},

  day_16: {
    title: "Arbeitsalltag & Zeitmanagement",
    theory: "Effizientes Zeitmanagement ist entscheidend für den Erfolg. Die Eisenhower-Matrix hilft bei der Priorisierung.",
    extendedTheory: `
### Steuern: Die unvermeidbare Realität

Steuern sind ein komplexes, aber essentielles Thema für jeden Immobilienprofi. Wer die Steuergesetze kennt, kann legal Steuern sparen und Mandanten beraten.

**1. Die wichtigsten Steuerarten im Immobilienbereich**

**A. Grunderwerbsteuer (GrESt): Der Einstieg**

**Definition:** Steuer auf den Erwerb von Grundstücken und Immobilien.

**Steuersatz:** 3,5-6,5% (je nach Bundesland)

| Bundesland | Steuersatz |
|------------|------------|
| Bayern, Sachsen | 3,5% |
| Hamburg, Niedersachsen | 5,0% |
| Berlin, Brandenburg | 6,5% |
| Nordrhein-Westfalen, Saarland | 6,5% |

**Bemessungsgrundlage:** Kaufpreis (ohne Inventar)

**Beispiel:**
- Kaufpreis: 400.000 €
- Bundesland: Berlin (6,5%)
- Grunderwerbsteuer: 26.000 €

**Ausnahmen:**
- Erwerb durch Ehepartner oder direkte Verwandte (Eltern, Kinder)
- Erwerb im Rahmen einer Erbschaft oder Schenkung
- Erwerb von Anteilen < 90% (Share Deal)

**B. Einkommensteuer (ESt): Die Mieteinnahmen**

**Definition:** Steuer auf Einkünfte aus Vermietung und Verpachtung (§ 21 EStG).

**Steuersatz:** 0-45% (progressiver Tarif)

| Einkommen | Steuersatz |
|-----------|------------|
| 0-11.604 € | 0% (Grundfreibetrag) |
| 11.605-66.760 € | 14-42% (Progressionszone) |
| 66.761-277.825 € | 42% (Proportionalzone) |
| > 277.826 € | 45% (Reichensteuer) |

**Bemessungsgrundlage:** Mieteinnahmen - Werbungskosten

**Werbungskosten (absetzbar):**
- Zinsen für Darlehen
- Abschreibung (AfA): 2% p.a. (Gebäude ab 1925), 2,5% p.a. (Gebäude vor 1925)
- Instandhaltung & Reparaturen
- Hausverwaltung
- Versicherungen (Gebäude, Haftpflicht)
- Grundsteuer
- Nebenkosten (soweit nicht umlegbar)

**Beispiel:**
- Mieteinnahmen: 24.000 €/Jahr
- Zinsen: 8.000 €
- AfA: 4.000 € (2% von 200.000 €)
- Instandhaltung: 2.000 €
- Sonstige Kosten: 2.000 €
- **Zu versteuerndes Einkommen:** 8.000 €
- Steuerlast (bei 40% Grenzsteuersatz): 3.200 €

**C. Abgeltungsteuer (AbgSt): Die Kapitalerträge**

**Definition:** Steuer auf Kapitalerträge (Zinsen, Dividenden, Veräußerungsgewinne).

**Steuersatz:** 25% + 5,5% Solidaritätszuschlag = 26,375%

**Bemessungsgrundlage:** Kapitalertrag - Sparerpauschbetrag (1.000 € pro Person)

**Beispiel:**
- Zinsen aus Sparbuch: 2.000 €
- Sparerpauschbetrag: 1.000 €
- Zu versteuernder Kapitalertrag: 1.000 €
- Abgeltungsteuer: 264 €

**D. Spekulationssteuer: Die Veräußerungsgewinne**

**Definition:** Steuer auf Gewinne aus privaten Veräußerungsgeschäften (§ 23 EStG).

**Spekulationsfrist:** 10 Jahre (bei Vermietung), 3 Jahre (bei Selbstnutzung)

**Bemessungsgrundlage:** Verkaufspreis - Anschaffungskosten - Verkaufskosten

**Beispiel:**
- Kauf 2020: 300.000 €
- Verkauf 2026: 400.000 €
- Gewinn: 100.000 €
- Spekulationsfrist: 6 Jahre (< 10 Jahre)
- **Steuerpflichtig:** Ja
- Steuerlast (bei 40% Grenzsteuersatz): 40.000 €

**Ausnahme:** Selbstnutzung im Jahr des Verkaufs und den beiden vorangegangenen Jahren → steuerfrei

**2. Steueroptimierung: Legal Steuern sparen**

**A. Die Abschreibung (AfA): Der Klassiker**

**Definition:** Absetzung für Abnutzung (AfA) ist die steuerliche Abschreibung von Gebäuden.

**Sätze:**
- Wohngebäude ab 1925: 2% p.a. (50 Jahre)
- Wohngebäude vor 1925: 2,5% p.a. (40 Jahre)
- Gewerbegebäude: 3% p.a. (33 Jahre)

**Wichtig:** Nur das Gebäude ist abschreibbar, nicht das Grundstück!

**Aufteilung Grundstück/Gebäude:**
- Kaufpreis: 400.000 €
- Grundstücksanteil: 100.000 € (25%)
- Gebäudeanteil: 300.000 € (75%)
- AfA: 6.000 €/Jahr (2% von 300.000 €)

**Tipp:** Lassen Sie die Aufteilung durch einen Sachverständigen bestätigen (Finanzamt akzeptiert oft 70-80% Gebäudeanteil).

**B. Die Sonderabschreibung: Der Turbo**

**Definition:** Zusätzliche Abschreibung für Neubauten (§ 7b EStG).

**Voraussetzungen:**
- Neubau (Baubeginn nach 01.01.2023)
- Anschaffungskosten max. 4.000 €/m² Wohnfläche
- Vermietung für mindestens 10 Jahre

**Satz:** 5% p.a. für 4 Jahre (zusätzlich zur normalen AfA)

**Beispiel:**
- Neubau: 300.000 € (Gebäudeanteil)
- Normale AfA: 6.000 €/Jahr (2%)
- Sonderabschreibung: 15.000 €/Jahr (5%)
- **Gesamt:** 21.000 €/Jahr (7%)
- Steuerersparnis (bei 40% Grenzsteuersatz): 8.400 €/Jahr

**C. Die Denkmal-AfA: Der Geheimtipp**

**Definition:** Erhöhte Abschreibung für denkmalgeschützte Gebäude (§ 7i EStG).

**Sätze:**
- 9% p.a. für 8 Jahre (Sanierungskosten)
- 7% p.a. für 4 Jahre (danach)

**Beispiel:**
- Kaufpreis: 200.000 €
- Sanierungskosten: 100.000 €
- Denkmal-AfA: 9.000 €/Jahr (9% von 100.000 €)
- Steuerersparnis (bei 40% Grenzsteuersatz): 3.600 €/Jahr

**Vorsicht:** Denkmalschutz bedeutet Auflagen (Fassade, Fenster, Dach). Sanierung ist teuer!

**D. Die Verlustzurechnung: Der Trick**

**Definition:** Verluste aus Vermietung können mit anderen Einkünften verrechnet werden.

**Beispiel:**
- Gehalt: 60.000 €
- Verlust aus Vermietung: -10.000 € (Zinsen + AfA > Mieteinnahmen)
- Zu versteuerndes Einkommen: 50.000 €
- Steuerersparnis: 4.000 € (40% von 10.000 €)

**Tipp:** In den ersten Jahren ist die Immobilie oft "steuerschädlich" (Verluste). Nutzen Sie das!

**3. Die Gewerbesteuer: Die Falle**

**Definition:** Steuer auf gewerbliche Einkünfte (§ 7 GewStG).

**Steuersatz:** 14-17% (je nach Gemeinde)

**Freibetrag:** 24.500 € (für Einzelunternehmen und Personengesellschaften)

**Wann fällt Gewerbesteuer an?**
- Gewerblicher Grundstückshandel (> 3 Objekte in 5 Jahren)
- Maklergeschäft
- Bauträgergeschäft
- Projektentwicklung

**Wann fällt KEINE Gewerbesteuer an?**
- Vermietung (private Vermögensverwaltung)
- Verkauf von Privatvermögen (< 3 Objekte in 5 Jahren)

**Beispiel:**
- Maklergewinn: 100.000 €
- Freibetrag: 24.500 €
- Zu versteuernder Gewerbeertrag: 75.500 €
- Gewerbesteuer (15%): 11.325 €

**4. Praxisbeispiel: Steueroptimierung**

**Ausgangssituation:**
- Kauf einer Eigentumswohnung: 300.000 € (Gebäude: 225.000 €, Grundstück: 75.000 €)
- Mieteinnahmen: 18.000 €/Jahr
- Zinsen: 9.000 €/Jahr
- AfA: 4.500 €/Jahr (2% von 225.000 €)
- Sonstige Kosten: 2.000 €/Jahr

**Ohne Optimierung:**
- Zu versteuerndes Einkommen: 18.000 € - 9.000 € - 4.500 € - 2.000 € = 2.500 €
- Steuerlast (40%): 1.000 €

**Mit Optimierung (Sonderabschreibung):**
- Sonderabschreibung: 11.250 €/Jahr (5% von 225.000 €)
- Zu versteuerndes Einkommen: 18.000 € - 9.000 € - 4.500 € - 11.250 € - 2.000 € = -8.750 € (Verlust)
- Steuerersparnis: 3.500 € (40% von 8.750 €)

**Fazit:** Durch Sonderabschreibung sparen Sie 4.500 € Steuern pro Jahr (1.000 € + 3.500 €).
    `,
    law: [
      "[§ 23 EStG](https://www.gesetze-im-internet.de/estg/__23.html) (Spekulationssteuer 10 Jahre)",
      "[§ 4 GrEStG](https://www.gesetze-im-internet.de/grestg_1983/__4.html) (Grunderwerbsteuer)",
      "[§ 15b MaBV](https://www.gesetze-im-internet.de/gewo_34cdv/__15b.html) (Zeitmanagement Berufspflichten)"
    ],
    practice: "Erstellen Sie einen Wochenplan mit festen Blöcken für Akquise, Besichtigungen und Verwaltung.",
    task: "Planen Sie eine ideale Arbeitswoche mit Work-Life-Balance.",
    type: "Organisation"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Arbeitsalltag & Zeitmanagement' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Arbeitsalltag & Zeitmanagement'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'Tagesplanung, CRM-Systeme, Terminmanagement, Work-Life-Balance' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Nach welchem Zeitraum entfällt die Spekulationssteuer bei privaten Immobilienverkäufen?",
        options: [
          "Nach 5 Jahren",
          "Nach 7 Jahren",
          "Nach 10 Jahren",
          "Nach 15 Jahren"
        ],
        correct: 2,
        explanation: "§23 EStG: Bei privaten Veräußerungsgeschäften entfällt die Steuer nach einer Haltefrist von 10 Jahren."
      }
    ],},

  day_17: {
    title: "Digitale Tools & Technologien",
    theory: "CRM-Systeme, Portale und digitale Werkzeuge erleichtern den Arbeitsalltag. Wichtige Tools: OnOffice, FlowFact, ImmoScout24.",
    extendedTheory: `
### Versicherungen: Der Schutz vor dem Unerwarteten

Versicherungen sind ein oft unterschätztes Thema. Wer falsch oder gar nicht versichert ist, riskiert im Schadensfall den finanziellen Ruin.

**1. Pflichtversicherungen: Das Minimum**

**A. Berufshaftpflichtversicherung (für Makler & Verwalter)**

**Gesetzliche Grundlage:** § 34c Abs. 2 GewO, § 34d Abs. 2 GewO

**Mindestdeckungssummen:**
- Makler: 500.000 € (Personenschäden), 250.000 € (sonstige Schäden)
- Verwalter (WEG): 500.000 € (Personenschäden), 250.000 € (sonstige Schäden)
- Verwalter (Miet): 1.000.000 € (Personenschäden), 250.000 € (sonstige Schäden)

**Kosten:** 500-2.000 €/Jahr (je nach Umsatz und Deckungssumme)

**Versicherte Risiken:**
- Fehlerhafte Beratung (z.B. falsche Angaben im Exposé)
- Verletzung von Pflichten (z.B. fehlende Mietminderung)
- Vermögensschäden (z.B. entgangener Gewinn)

**Praxisbeispiel:**
Ein Makler vergisst, einen Wasserschaden im Exposé zu erwähnen. Der Käufer entdeckt den Schaden nach dem Kauf und klagt auf Schadensersatz (50.000 €). Die Berufshaftpflicht übernimmt die Kosten.

**B. Gebäudeversicherung (für Eigentümer)**

**Definition:** Versicherung gegen Schäden am Gebäude (Feuer, Sturm, Leitungswasser).

**Pflicht:** Nein (aber von Banken oft gefordert)

**Kosten:** 0,1-0,3% des Gebäudewerts/Jahr

**Versicherte Risiken:**
- Feuer (Brand, Blitzschlag, Explosion)
- Sturm (ab Windstärke 8)
- Leitungswasser (Rohrbruch, Frost)
- Optional: Elementarschäden (Hochwasser, Erdbeben)

**Praxisbeispiel:**
Ein Rohrbruch verursacht einen Wasserschaden (Sanierungskosten: 20.000 €). Die Gebäudeversicherung übernimmt die Kosten.

**2. Empfohlene Versicherungen: Der erweiterte Schutz**

**A. Rechtsschutzversicherung (für Makler & Verwalter)**

**Definition:** Versicherung gegen Rechtsstreitigkeiten (Anwalts- und Gerichtskosten).

**Kosten:** 300-800 €/Jahr

**Versicherte Bereiche:**
- Vertragsrecht (z.B. Streit mit Auftraggeber)
- Arbeitsrecht (z.B. Kündigung eines Mitarbeiters)
- Steuerrecht (z.B. Streit mit Finanzamt)

**Praxisbeispiel:**
Ein Makler wird von einem Auftraggeber verklagt (Streitwert: 100.000 €). Die Rechtsschutzversicherung übernimmt die Anwaltskosten (15.000 €).

**B. Vermögensschaden-Haftpflicht (für Verwalter)**

**Definition:** Erweiterte Haftpflicht für Vermögensschäden (über die Berufshaftpflicht hinaus).

**Kosten:** 1.000-3.000 €/Jahr

**Versicherte Risiken:**
- Falsche Abrechnung (z.B. zu hohe Nebenkosten)
- Fehlende Instandhaltung (z.B. Schimmel durch fehlende Lüftung)
- Verletzung von Pflichten (z.B. fehlende Rücklagenbildung)

**Praxisbeispiel:**
Ein Verwalter vergisst, die Heizung zu warten. Im Winter fällt die Heizung aus. Die Mieter klagen auf Mietminderung (10.000 €). Die Vermögensschaden-Haftpflicht übernimmt die Kosten.

**C. Betriebsunterbrechungsversicherung (für Makler & Verwalter)**

**Definition:** Versicherung gegen Einnahmeausfälle (z.B. bei Krankheit, Unfall).

**Kosten:** 500-1.500 €/Jahr

**Versicherte Risiken:**
- Krankheit (länger als 6 Wochen)
- Unfall
- Betriebsstörung (z.B. Brand im Büro)

**Praxisbeispiel:**
Ein Makler erleidet einen Unfall und kann 3 Monate nicht arbeiten. Die Betriebsunterbrechungsversicherung zahlt 5.000 €/Monat (Entgangener Gewinn).

**3. Immobilien-spezifische Versicherungen**

**A. Mietausfallversicherung (für Vermieter)**

**Definition:** Versicherung gegen Mietausfälle (z.B. bei Zahlungsunfähigkeit des Mieters).

**Kosten:** 2-5% der Jahresnettokaltmiete

**Versicherte Risiken:**
- Zahlungsunfähigkeit des Mieters (Insolvenz)
- Mietrückstände (nach 2 Monaten)
- Räumungskosten (Gerichtskosten, Zwangsräumung)

**Praxisbeispiel:**
Ein Mieter zahlt 6 Monate keine Miete (6.000 €). Die Mietausfallversicherung übernimmt die Mietrückstände und die Räumungskosten (2.000 €).

**B. Glasversicherung (für Gewerbeimmobilien)**

**Definition:** Versicherung gegen Glasbruch (Fenster, Türen, Schaufenster).

**Kosten:** 50-200 €/Jahr

**Versicherte Risiken:**
- Vandalismus
- Unfall
- Naturereignisse (Sturm, Hagel)

**Praxisbeispiel:**
Ein Schaufenster wird durch Vandalismus zerstört (Reparaturkosten: 3.000 €). Die Glasversicherung übernimmt die Kosten.

**C. Elementarschadenversicherung (für Eigentümer)**

**Definition:** Versicherung gegen Naturgewalten (Hochwasser, Erdbeben, Lawinen).

**Kosten:** 0,05-0,2% des Gebäudewerts/Jahr (je nach Risikozone)

**Versicherte Risiken:**
- Hochwasser (Flusshochwasser, Starkregen)
- Erdbeben
- Lawinen, Schneedruck
- Vulkanausbruch

**Praxisbeispiel:**
Ein Hochwasser verursacht einen Schaden am Gebäude (Sanierungskosten: 100.000 €). Die Elementarschadenversicherung übernimmt die Kosten.

**Wichtig:** Nicht alle Gebäude sind versicherbar (Risikogebiete). Prüfen Sie die ZÜRS-Zone (Zonierungssystem für Überschwemmung, Rückstau und Starkregen):
- Zone 1: Niedriges Risiko (alle 200 Jahre)
- Zone 2: Mittleres Risiko (alle 100 Jahre)
- Zone 3: Hohes Risiko (alle 10-100 Jahre)
- Zone 4: Sehr hohes Risiko (alle 10 Jahre) → oft nicht versicherbar

**4. Versicherungsfallen: Was Sie vermeiden sollten**

**A. Unterversicherung: Der Klassiker**

**Problem:** Die Versicherungssumme ist zu niedrig. Im Schadensfall zahlt die Versicherung nur anteilig.

**Beispiel:**
- Gebäudewert: 500.000 €
- Versicherungssumme: 400.000 € (80%)
- Schaden: 100.000 €
- Auszahlung: 80.000 € (80% des Schadens)

**Lösung:** Versicherungssumme regelmäßig anpassen (alle 3-5 Jahre). Gleitende Neuwertversicherung nutzen (automatische Anpassung).

**B. Doppelversicherung: Die Verschwendung**

**Problem:** Mehrere Versicherungen decken dasselbe Risiko ab.

**Beispiel:**
- Gebäudeversicherung deckt Leitungswasser
- Hausratversicherung deckt Leitungswasser
- Im Schadensfall zahlt nur eine Versicherung (Versicherungen teilen sich die Kosten)

**Lösung:** Prüfen Sie, welche Risiken bereits abgedeckt sind. Vermeiden Sie Überschneidungen.

**C. Falsche Angaben: Der Vertragsbruch**

**Problem:** Falsche Angaben bei Vertragsabschluss (z.B. Gebäudezustand, Nutzung).

**Folge:** Versicherung kann Leistung verweigern oder Vertrag kündigen.

**Beispiel:**
Ein Vermieter gibt an, dass das Gebäude bewohnt ist. Tatsächlich steht es leer. Bei einem Brand verweigert die Versicherung die Zahlung.

**Lösung:** Ehrliche Angaben machen. Bei Änderungen (z.B. Leerstand) die Versicherung informieren.

**5. Praxisbeispiel: Versicherungspaket für Makler**

**Ausgangssituation:**
- Einzelmakler, Umsatz 200.000 €/Jahr, 1 Mitarbeiter

**Empfohlenes Versicherungspaket:**

| Versicherung | Deckungssumme | Kosten/Jahr |
|--------------|---------------|-------------|
| Berufshaftpflicht | 1.000.000 € | 800 € |
| Rechtsschutz | - | 500 € |
| Betriebsunterbrechung | 5.000 €/Monat | 1.000 € |
| Krankenversicherung | - | 6.000 € |
| Berufsunfähigkeit | 2.000 €/Monat | 1.500 € |
| **GESAMT** | - | **9.800 €** |

**Kosten:** 9.800 €/Jahr (ca. 5% des Umsatzes)

**Fazit:** Versicherungen sind eine Investition in Sicherheit. Sparen Sie nicht am falschen Ende!
    `,
    law: ["[GoBD](https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2019-11-28-GoBD.html) (Grundsätze digitale Buchführung)",
      "[§ 34c GewO](https://www.gesetze-im-internet.de/gewo/__34c.html) (Berufspflichten digital)",
      "[Art. 32 DSGVO](https://dsgvo-gesetz.de/art-32-dsgvo/) (Datensicherheit)"],
    practice: "Testen Sie eine CRM-Software (Demo-Zugang oder Simulation).",
    task: "Vergleichen Sie 3 Immobilien-CRM-Systeme hinsichtlich Funktionen und Kosten.",
    type: "Digital"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Digitale Tools & Technologien' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Digitale Tools & Technologien'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'ImmoScout24, PropTech, virtuelle Besichtigung, KI im Immobilienbereich' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Welches CRM-System ist speziell für Immobilienmakler in Deutschland verbreitet?",
        options: [
          "Salesforce",
          "OnOffice/FlowFact",
          "SAP",
          "Microsoft Dynamics"
        ],
        correct: 1,
        explanation: "OnOffice und FlowFact sind die marktführenden CRM-Systeme speziell für deutsche Immobilienmakler."
      }
    ],},

  day_18: {
    title: "Prozessautomatisierung",
    theory: "Automatisierung spart Zeit und erhöht die Effizienz. E-Mail-Automation, Lead-Funnel und digitale Unterschriften sind wichtige Werkzeuge.",
    extendedTheory: `
### Marketing: Die Kunst der Kundengewinnung

Marketing ist der Schlüssel zum Erfolg in der Immobilienbranche. Wer nicht sichtbar ist, wird nicht gefunden. Wer nicht überzeugt, wird nicht beauftragt.

**1. Die Grundlagen des Immobilienmarketings**

**A. Die 4 P's des Marketing-Mix**

**1. Product (Produkt):** Was biete ich an?
- Dienstleistung: Vermittlung, Verwaltung, Bewertung
- Spezialisierung: Wohnimmobilien, Gewerbeimmobilien, Luxusimmobilien
- USP (Unique Selling Proposition): Was macht mich einzigartig?

**2. Price (Preis):** Was kostet meine Dienstleistung?
- Provision: 3-7% + MwSt. (je nach Region und Marktsituation)
- Pauschalpreis: Festpreis für definierte Leistung
- Staffelpreis: Rabatt bei mehreren Objekten

**3. Place (Vertrieb):** Wo bin ich präsent?
- Online: Website, Portale (ImmoScout24, Immowelt)
- Offline: Büro, Schaufenster, Printmedien
- Netzwerk: Kooperationen, Empfehlungen

**4. Promotion (Werbung):** Wie mache ich auf mich aufmerksam?
- Online-Marketing: SEO, SEA, Social Media
- Offline-Marketing: Flyer, Anzeigen, Events
- PR: Pressearbeit, Fachartikel, Vorträge

**B. Die Customer Journey: Der Weg zum Kunden**

**Phase 1: Awareness (Bewusstsein)**
- Kunde wird auf Problem aufmerksam (z.B. "Ich will eine Wohnung kaufen")
- Touchpoints: Google-Suche, Social Media, Empfehlung

**Phase 2: Consideration (Überlegung)**
- Kunde recherchiert Lösungen (z.B. "Welcher Makler ist der beste?")
- Touchpoints: Website, Bewertungen, Vergleichsportale

**Phase 3: Decision (Entscheidung)**
- Kunde entscheidet sich für einen Anbieter
- Touchpoints: Erstgespräch, Angebot, Vertrag

**Phase 4: Retention (Bindung)**
- Kunde bleibt loyal und empfiehlt weiter
- Touchpoints: Newsletter, Events, Empfehlungsprogramm

**2. Online-Marketing: Die digitale Präsenz**

**A. Die Website: Das digitale Schaufenster**

**Pflichtinhalte:**
- Impressum (§ 5 TMG)
- Datenschutzerklärung (Art. 13 DSGVO)
- Leistungen & Preise
- Referenzen & Bewertungen
- Kontaktformular

**Empfohlene Inhalte:**
- Blog (Fachartikel, Marktberichte)
- Immobiliensuche (aktuelle Angebote)
- Team-Vorstellung (Vertrauen aufbauen)
- FAQ (häufige Fragen)

**Technische Anforderungen:**
- Mobile-optimiert (> 60% der Nutzer sind mobil)
- Schnelle Ladezeit (< 3 Sekunden)
- SSL-Verschlüsselung (HTTPS)
- DSGVO-konform (Cookie-Banner, Datenschutz)

**Kosten:**
- Einfache Website: 1.000-3.000 € (einmalig)
- Professionelle Website: 5.000-15.000 € (einmalig)
- Wartung: 50-200 €/Monat

**B. Suchmaschinenoptimierung (SEO): Gefunden werden**

**Definition:** Optimierung der Website für Suchmaschinen (Google, Bing).

**Ziel:** Top-Platzierung bei relevanten Suchbegriffen (z.B. "Immobilienmakler München")

**On-Page-SEO (auf der Website):**
- Keywords: "Immobilienmakler München", "Wohnung kaufen München"
- Meta-Tags: Title, Description
- Content: Hochwertige Inhalte (mindestens 500 Wörter pro Seite)
- Bilder: Alt-Tags, Dateinamen

**Off-Page-SEO (außerhalb der Website):**
- Backlinks: Links von anderen Websites (z.B. Branchenverzeichnisse)
- Social Signals: Likes, Shares, Kommentare
- Google My Business: Eintrag bei Google Maps

**Kosten:**
- SEO-Agentur: 500-2.000 €/Monat
- Freelancer: 50-150 €/Stunde

**ROI:** 1:5 bis 1:10 (für jeden investierten Euro kommen 5-10 Euro zurück)

**C. Suchmaschinenwerbung (SEA): Sofort sichtbar**

**Definition:** Bezahlte Anzeigen in Suchmaschinen (Google Ads, Bing Ads).

**Vorteile:**
- Sofortige Sichtbarkeit (innerhalb von Stunden)
- Messbare Ergebnisse (Klicks, Conversions)
- Zielgruppengenau (Standort, Alter, Interessen)

**Nachteile:**
- Kosten pro Klick (CPC): 1-5 € (je nach Keyword)
- Konkurrenz: Viele Makler nutzen Google Ads
- Keine langfristige Wirkung (Anzeigen verschwinden nach Budgetende)

**Kosten:**
- Budget: 500-2.000 €/Monat
- Agentur: 10-20% des Budgets

**ROI:** 1:3 bis 1:5

**D. Social Media: Die Community**

**Plattformen:**
- Facebook: Ältere Zielgruppe (40-60 Jahre), Reichweite
- Instagram: Jüngere Zielgruppe (20-40 Jahre), visuell
- LinkedIn: B2B, Netzwerk
- TikTok: Sehr junge Zielgruppe (16-25 Jahre), Trend

**Content-Ideen:**
- Immobilien-Vorstellungen (Fotos, Videos)
- Marktberichte (Infografiken, Statistiken)
- Tipps & Tricks (z.B. "5 Fehler beim Immobilienkauf")
- Behind-the-Scenes (Team, Büro, Alltag)

**Posting-Frequenz:**
- Facebook: 3-5x pro Woche
- Instagram: 5-7x pro Woche (Stories täglich)
- LinkedIn: 2-3x pro Woche

**Kosten:**
- Organisch: 0 € (nur Zeit)
- Bezahlte Anzeigen: 100-500 €/Monat

**ROI:** 1:2 bis 1:4

**3. Offline-Marketing: Die klassische Präsenz**

**A. Printmedien: Die Zeitungsanzeige**

**Vorteile:**
- Lokale Reichweite (Stadtteil, Region)
- Ältere Zielgruppe (50+ Jahre)
- Vertrauen (gedruckte Medien haben hohe Glaubwürdigkeit)

**Nachteile:**
- Hohe Kosten (500-2.000 € pro Anzeige)
- Keine Messbarkeit (keine Klicks, keine Conversions)
- Sinkende Reichweite (Zeitungen verlieren Leser)

**Kosten:**
- Anzeige (1/4 Seite): 500-1.000 €
- Anzeige (1/2 Seite): 1.000-2.000 €
- Anzeige (ganze Seite): 2.000-5.000 €

**ROI:** 1:1 bis 1:2 (oft nicht rentabel)

**B. Flyer & Broschüren: Die Direktwerbung**

**Vorteile:**
- Günstig (0,10-0,50 € pro Stück)
- Zielgruppengenau (Haushalte in bestimmten Straßen)
- Haptisch (Flyer kann angefasst werden)

**Nachteile:**
- Geringe Response-Rate (0,1-0,5%)
- Umweltbelastung (Papier, Druck)
- Rechtliche Einschränkungen ("Keine Werbung"-Aufkleber)

**Kosten:**
- Druck: 0,10-0,50 € pro Stück (je nach Auflage)
- Verteilung: 0,05-0,10 € pro Stück

**ROI:** 1:1 bis 1:3

**C. Events & Networking: Die persönliche Begegnung**

**Vorteile:**
- Vertrauen aufbauen (persönlicher Kontakt)
- Netzwerk erweitern (Kontakte zu anderen Profis)
- Empfehlungen generieren (Mund-zu-Mund-Propaganda)

**Nachteile:**
- Zeitaufwand (Vorbereitung, Durchführung)
- Kosten (Location, Catering, Werbung)
- Unsichere Ergebnisse (keine Garantie für Aufträge)

**Event-Ideen:**
- Tag der offenen Tür (Büro, Immobilie)
- Immobilien-Stammtisch (monatliches Treffen)
- Fachvorträge (z.B. "Immobilien als Altersvorsorge")
- Kooperationen (z.B. mit Banken, Notaren, Architekten)

**Kosten:**
- Kleines Event: 500-1.000 €
- Großes Event: 2.000-5.000 €

**ROI:** 1:3 bis 1:10 (langfristig)

**4. Content-Marketing: Die Expertise zeigen**

**A. Blog-Artikel: Die Fachartikel**

**Vorteile:**
- SEO (bessere Platzierung bei Google)
- Expertise zeigen (Vertrauen aufbauen)
- Langfristige Wirkung (Artikel bleiben online)

**Themen-Ideen:**
- "10 Fehler beim Immobilienkauf"
- "Wie viel Eigenkapital brauche ich?"
- "Marktbericht München 2026"
- "Steuern sparen mit Immobilien"

**Posting-Frequenz:** 1-2x pro Monat

**Kosten:**
- Selbst schreiben: 0 € (nur Zeit)
- Texter: 50-150 € pro Artikel

**ROI:** 1:5 bis 1:10 (langfristig)

**B. Videos: Die visuelle Präsenz**

**Vorteile:**
- Hohe Reichweite (Videos werden häufiger geteilt)
- Emotionen wecken (Bilder sagen mehr als Worte)
- Vertrauen aufbauen (Gesicht zeigen)

**Video-Ideen:**
- Immobilien-Vorstellungen (360°-Rundgang)
- Marktberichte (Infografiken, Statistiken)
- Tipps & Tricks (z.B. "5 Fehler beim Immobilienkauf")
- Interviews (z.B. mit Notaren, Architekten)

**Plattformen:**
- YouTube (langfristig)
- Instagram Reels (kurzfristig)
- TikTok (Trend)

**Kosten:**
- Selbst produzieren: 0 € (Smartphone)
- Professionell produzieren: 500-2.000 € pro Video

**ROI:** 1:3 bis 1:7

**5. Praxisbeispiel: Marketing-Budget für Makler**

**Ausgangssituation:**
- Einzelmakler, Umsatz 200.000 €/Jahr, Ziel: 300.000 €/Jahr

**Marketing-Budget:** 10.000 €/Jahr (5% des Umsatzes)

**Verteilung:**

| Kanal | Budget | Ziel |
|-------|--------|------|
| Website & SEO | 3.000 € | Top-10-Platzierung bei "Immobilienmakler [Stadt]" |
| Google Ads | 3.000 € | 50 Leads/Jahr |
| Social Media | 2.000 € | 1.000 Follower, 10 Leads/Jahr |
| Events & Networking | 1.000 € | 20 Kontakte, 5 Aufträge/Jahr |
| Print & Flyer | 1.000 € | 5 Leads/Jahr |
| **GESAMT** | **10.000 €** | **70 Leads/Jahr, 30 Aufträge/Jahr** |

**ROI:** 1:3 (für jeden investierten Euro kommen 3 Euro zurück)

**Fazit:** Marketing ist eine Investition, keine Ausgabe. Wer nicht investiert, wird nicht gefunden.
    `,
    law: ["[eIDAS-Verordnung](https://eur-lex.europa.eu/) (Digitale Signatur)"],
    practice: "Richten Sie eine automatische Antwortmail für Anfragen ein.",
    task: "Entwerfen Sie einen automatisierten Prozess für neue Interessenten (Lead-Funnel).",
    type: "Digital"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Prozessautomatisierung' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Prozessautomatisierung'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'Digitale Workflows, automatische Exposés, Online-Vermarktung' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Was regelt §7 UWG im Zusammenhang mit Immobilienmarketing?",
        options: [
          "Preisangaben in der Werbung",
          "Verbot unzumutbarer Belästigung (Spam, unerlaubte Werbeanrufe)",
          "Pflichtangaben im Exposé",
          "Widerrufsrecht"
        ],
        correct: 1,
        explanation: "§7 UWG verbietet unzumutbare Belästigungen durch Werbung — relevant für E-Mail-Marketing und Werbeanrufe ohne Einwilligung."
      }
    ],},

  day_19: {
    title: "Karriereplanung & Weiterbildung",
    theory: "Kontinuierliche Weiterbildung ist Pflicht (20h/3 Jahre) und Chance zugleich. IHK-Zertifikate und Spezialisierungen öffnen neue Türen.",
    extendedTheory: `
### Digitalisierung: Die Zukunft ist jetzt

Die Digitalisierung verändert die Immobilienbranche fundamental. Wer die neuen Technologien nicht nutzt, wird abgehängt.

**1. PropTech: Die digitale Revolution**

**Definition:** PropTech (Property Technology) ist der Sammelbegriff für digitale Innovationen in der Immobilienwirtschaft.

**Bereiche:**
- Vermarktung (Online-Portale, virtuelle Besichtigungen)
- Verwaltung (digitale Hausverwaltung, Mieter-Apps)
- Finanzierung (Online-Kreditvergleiche, Crowdfunding)
- Bewertung (automatische Wertermittlung, Big Data)
- Smart Home (vernetzte Gebäude, IoT)

**Marktgröße:** 10 Mrd. € (Deutschland, 2026)

**Wachstum:** 15-20% p.a.

**2. Digitale Vermarktung: Vom Exposé zur VR-Besichtigung**

**A. Online-Portale: Die Marktplätze**

**Hauptportale:**
- ImmoScout24 (Marktführer, 15 Mio. Nutzer/Monat)
- Immowelt (2. Platz, 6 Mio. Nutzer/Monat)
- eBay Kleinanzeigen (3. Platz, 5 Mio. Nutzer/Monat)

**Kosten:**
- Basis-Paket: 50-100 €/Monat (5-10 Inserate)
- Premium-Paket: 200-500 €/Monat (unbegrenzte Inserate, Top-Platzierung)

**Vorteile:**
- Hohe Reichweite (Millionen Nutzer)
- Zielgruppengenau (Filter nach Preis, Lage, Größe)
- Messbare Ergebnisse (Klicks, Anfragen)

**Nachteile:**
- Hohe Konkurrenz (Tausende Inserate)
- Kosten (monatliche Gebühren)
- Abhängigkeit (Portale können Preise erhöhen)

**B. Virtuelle Besichtigungen: Die 360°-Touren**

**Technologien:**
- 360°-Fotos (mit Smartphone oder Spezialkamera)
- 3D-Rundgänge (mit Matterport, iGUIDE)
- Virtual Reality (mit VR-Brille)

**Vorteile:**
- Zeitersparnis (weniger physische Besichtigungen)
- Höhere Reichweite (internationale Interessenten)
- Bessere Qualifizierung (nur ernsthafte Interessenten kommen zur Besichtigung)

**Nachteile:**
- Kosten (500-1.500 € pro Immobilie)
- Technische Anforderungen (Kamera, Software)
- Nicht für alle Immobilien geeignet (Luxusimmobilien ja, einfache Wohnungen nein)

**Kosten:**
- 360°-Fotos: 0 € (Smartphone) bis 500 € (Spezialkamera)
- 3D-Rundgang: 200-500 € (Dienstleister) oder 5.000-10.000 € (eigene Kamera)
- VR-Brille: 300-1.000 €

**ROI:** 1:3 bis 1:5 (Zeitersparnis + höhere Abschlussquote)

**C. Drohnenaufnahmen: Die Vogelperspektive**

**Vorteile:**
- Beeindruckende Bilder (Luftaufnahmen)
- Lage zeigen (Umgebung, Infrastruktur)
- USP (nicht jeder Makler nutzt Drohnen)

**Nachteile:**
- Kosten (200-500 € pro Einsatz)
- Rechtliche Einschränkungen (Flugverbotszonen, Datenschutz)
- Wetter (nur bei gutem Wetter möglich)

**Kosten:**
- Drohne: 500-2.000 € (einmalig)
- Drohnenpilot: 200-500 € (pro Einsatz)
- Versicherung: 100-300 €/Jahr

**ROI:** 1:2 bis 1:4

**3. Digitale Verwaltung: Vom Papier zur Cloud**

**A. Digitale Hausverwaltung: Die Software**

**Hauptanbieter:**
- Haufe Axera (Marktführer)
- Aareon (Wohnungswirtschaft)
- DOMUS (Mittelstand)
- casavi (Mieter-App)

**Funktionen:**
- Buchhaltung (Mieten, Nebenkosten, Rücklagen)
- Dokumentenverwaltung (Verträge, Protokolle, Rechnungen)
- Kommunikation (E-Mail, SMS, App)
- Reporting (Auswertungen, Statistiken)

**Kosten:**
- Basis-Paket: 10-20 €/Einheit/Monat
- Premium-Paket: 20-35 €/Einheit/Monat

**Vorteile:**
- Zeitersparnis (automatische Prozesse)
- Fehlerreduktion (keine manuellen Eingaben)
- Transparenz (alle Daten an einem Ort)

**Nachteile:**
- Kosten (monatliche Gebühren)
- Einarbeitungszeit (1-3 Monate)
- Abhängigkeit (Software-Anbieter)

**ROI:** 1:5 bis 1:10 (Zeitersparnis)

**B. Mieter-Apps: Die Kommunikation**

**Funktionen:**
- Schadensmeldung (Fotos, Beschreibung)
- Dokumentenzugriff (Mietvertrag, Nebenkostenabrechnung)
- Kommunikation (Chat mit Verwalter)
- Terminvereinbarung (Handwerker, Besichtigungen)

**Hauptanbieter:**
- casavi (Marktführer)
- immocloud
- Wohnungshelden

**Kosten:**
- 2-5 €/Einheit/Monat

**Vorteile:**
- Bessere Kommunikation (schneller, transparenter)
- Weniger Telefonate (Entlastung)
- Höhere Zufriedenheit (Mieter fühlen sich gehört)

**Nachteile:**
- Kosten (monatliche Gebühren)
- Akzeptanz (nicht alle Mieter nutzen Apps)

**ROI:** 1:3 bis 1:5

**4. Künstliche Intelligenz (KI): Die Automatisierung**

**A. Automatische Wertermittlung: Die Algorithmen**

**Anbieter:**
- ImmoScout24 (Preisatlas)
- Immowelt (Preiskompass)
- Sprengnetter (RIWIS)

**Funktionsweise:**
- Big Data (Millionen Transaktionen)
- Machine Learning (Algorithmen lernen aus Daten)
- Ergebnis: Geschätzter Marktwert (± 10-20%)

**Vorteile:**
- Schnell (Ergebnis in Sekunden)
- Günstig (oft kostenlos)
- Objektiv (keine emotionalen Einflüsse)

**Nachteile:**
- Ungenau (nur Schätzung, kein Gutachten)
- Keine Besichtigung (Zustand wird nicht berücksichtigt)
- Rechtlich nicht bindend (vor Gericht nicht verwertbar)

**Kosten:**
- Kostenlos (Online-Tools)
- 50-200 € (detaillierte Berichte)

**ROI:** 1:10 bis 1:20 (Zeitersparnis)

**B. Chatbots: Die virtuellen Assistenten**

**Funktionen:**
- Beantwortung von Fragen (24/7)
- Terminvereinbarung (automatisch)
- Lead-Qualifizierung (ernsthafte Interessenten filtern)

**Anbieter:**
- Chatfuel (Facebook Messenger)
- ManyChat (WhatsApp, Instagram)
- Drift (Website)

**Kosten:**
- Basis-Paket: 0-50 €/Monat
- Premium-Paket: 100-500 €/Monat

**Vorteile:**
- Zeitersparnis (keine manuellen Antworten)
- 24/7 verfügbar (auch nachts und am Wochenende)
- Skalierbar (unbegrenzte Gespräche)

**Nachteile:**
- Begrenzte Intelligenz (nur vordefinierte Antworten)
- Akzeptanz (nicht alle Kunden mögen Chatbots)

**ROI:** 1:5 bis 1:10

**C. Predictive Analytics: Die Vorhersage**

**Definition:** Nutzung von Daten und Algorithmen zur Vorhersage zukünftiger Entwicklungen.

**Anwendungen:**
- Preisentwicklung (steigen oder fallen die Preise?)
- Leerstandsrisiko (welche Wohnungen sind schwer vermietbar?)
- Instandhaltungsbedarf (wann muss saniert werden?)

**Anbieter:**
- Bulwiengesa (Marktforschung)
- Empirica (Prognosen)
- CBRE (Marktberichte)

**Kosten:**
- 1.000-10.000 €/Jahr (Abo-Modelle)

**Vorteile:**
- Bessere Entscheidungen (datenbasiert)
- Risikominimierung (Fehlkäufe vermeiden)
- Wettbewerbsvorteil (früher reagieren)

**Nachteile:**
- Kosten (hohe Investition)
- Komplexität (Datenanalyse erfordert Expertise)
- Unsicherheit (Prognosen sind nie 100% sicher)

**ROI:** 1:3 bis 1:7

**5. Blockchain: Die Zukunft der Transaktion?**

**Definition:** Dezentrale Datenbank, die Transaktionen fälschungssicher speichert.

**Anwendungen:**
- Grundbuch (digitales Grundbuch auf Blockchain)
- Smart Contracts (automatische Vertragsabwicklung)
- Tokenisierung (Immobilien in Anteile aufteilen)

**Vorteile:**
- Sicherheit (fälschungssicher)
- Transparenz (alle Transaktionen nachvollziehbar)
- Effizienz (keine Intermediäre wie Notare)

**Nachteile:**
- Rechtliche Unsicherheit (noch keine klaren Gesetze)
- Technische Komplexität (hohe Einstiegshürde)
- Akzeptanz (noch nicht etabliert)

**Status:** Pilotprojekte (z.B. in Schweden, Dubai)

**Prognose:** 5-10 Jahre bis zur breiten Einführung

**6. Praxisbeispiel: Digitalisierungs-Roadmap für Makler**

**Phase 1: Basics (0-6 Monate)**
- Website erstellen (3.000 €)
- Google My Business (0 €)
- ImmoScout24-Paket (1.200 €/Jahr)

**Phase 2: Fortgeschritten (6-12 Monate)**
- 360°-Kamera kaufen (500 €)
- CRM-System einführen (2.400 €/Jahr)
- Social Media aufbauen (1.000 €/Jahr)

**Phase 3: Profi (12-24 Monate)**
- 3D-Rundgänge anbieten (5.000 € für Kamera)
- Drohne kaufen (1.500 €)
- KI-Tools nutzen (1.000 €/Jahr)

**Gesamtkosten:** 15.600 € (2 Jahre)

**ROI:** 1:5 bis 1:10 (Zeitersparnis + höhere Abschlussquote)

**Fazit:** Digitalisierung ist kein Luxus, sondern Notwendigkeit. Wer nicht digitalisiert, verliert Kunden.
    `,
    law: ["[MaBV Anlage 1](https://www.gesetze-im-internet.de/gewo_34cdv/anlage_1.html) (Weiterbildung)"],
    practice: "Recherchieren Sie passende Weiterbildungsangebote für Ihre Spezialisierung.",
    task: "Erstellen Sie einen persönlichen Weiterbildungsplan für die nächsten 3 Jahre.",
    type: "Karriere"
  ,
    tasks: [
    {
      type: "reflection" as const,
      question: "Reflektieren Sie: Was sind die drei wichtigsten Erkenntnisse aus dem Thema 'Karriereplanung & Weiterbildung' für Ihre berufliche Praxis?",
      hint: "Denken Sie an konkrete Situationen in Ihrer zukünftigen Tätigkeit als Immobilienprofi."
    },
    {
      type: "case" as const, 
      question: "Praxisfall: Ein potenzieller Kunde fragt Sie nach Ihrer Expertise im Bereich 'Karriereplanung & Weiterbildung'. Wie würden Sie Ihre Kenntnisse präsentieren?",
      hint: "Nutzen Sie die Kernbegriffe und Konzepte aus der heutigen Lektion."
    },
    {
      type: "research" as const,
      question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Beispiel aus der Praxis zum Thema 'IHK-Sachkundeprüfung, Weiterbildungspflicht §34c, Fachverbände' und bereiten Sie eine kurze Zusammenfassung vor.",
      hint: "Nutzen Sie Quellen wie Haufe.de, Immobilienscout24.de oder die IHK-Webseite."
    }
  ],
    quiz: [
      {
        question: "Wie viele Stunden Weiterbildung sind für Makler nach §15b MaBV alle 3 Jahre Pflicht?",
        options: [
          "10 Stunden",
          "15 Stunden",
          "20 Stunden",
          "40 Stunden"
        ],
        correct: 2,
        explanation: "§15b MaBV: Immobilienmakler und Wohnimmobilienverwalter müssen alle 3 Jahre 20 Stunden Weiterbildung nachweisen."
      }
    ],},

  day_20: {
    title: "Abschluss Modul 1 & Portfolio",
    theory: "Zusammenfassung der Grundlagen. Reflexion des Gelernten. Erstellung eines persönlichen Karriere-Portfolios.",
    extendedTheory: `
### Zukunftstrends: Wohin geht die Reise?

Die Immobilienbranche steht vor großen Veränderungen. Wer die Trends kennt, kann sich frühzeitig positionieren.

**1. Demografischer Wandel: Die alternde Gesellschaft**

**A. Die Fakten**

**Deutschland 2026:**
- Bevölkerung: 84 Mio. (leicht steigend durch Zuwanderung)
- Durchschnittsalter: 45 Jahre (1990: 39 Jahre)
- Anteil 65+: 22% (1990: 15%)
- Anteil 80+: 7% (1990: 4%)

**Prognose 2040:**
- Bevölkerung: 82 Mio. (leicht sinkend)
- Durchschnittsalter: 47 Jahre
- Anteil 65+: 28%
- Anteil 80+: 10%

**B. Die Auswirkungen**

**1. Wohnungsnachfrage**
- Mehr Single-Haushalte (Alleinstehende Senioren)
- Weniger Familien (sinkende Geburtenrate)
- Mehr barrierefreie Wohnungen (Rollstuhl, Aufzug)

**2. Pflegeimmobilien**
- Steigende Nachfrage (2 Mio. Pflegebedürftige 2026 → 3 Mio. 2040)
- Investitionsbedarf: 50 Mrd. € (neue Pflegeheime)
- Rendite: 5-7% (staatliche Förderung)

**3. Seniorengerechtes Wohnen**
- Betreutes Wohnen (Wohnung + Betreuung)
- Mehrgenerationenhäuser (Jung und Alt unter einem Dach)
- Smart Home (Sturzmelder, Notrufsysteme)

**Praxisbeispiel:**
Ein Investor kauft ein Pflegeheim für 10 Mio. €. Mieteinnahmen: 600.000 €/Jahr (6% Rendite). Laufzeit des Mietvertrags: 20 Jahre (Betreiber garantiert Miete).

**2. Urbanisierung: Die Landflucht**

**A. Die Fakten**

**Deutschland 2026:**
- Stadtbevölkerung: 77% (1990: 73%)
- Metropolen wachsen (München +10%, Berlin +15%, Hamburg +8%)
- Ländliche Regionen schrumpfen (Ostdeutschland -5%, Ruhrgebiet -3%)

**Prognose 2040:**
- Stadtbevölkerung: 80%
- Metropolen wachsen weiter (+5-10%)
- Ländliche Regionen schrumpfen weiter (-5-10%)

**B. Die Auswirkungen**

**1. Preise in Metropolen**
- Steigende Preise (Angebot < Nachfrage)
- Gentrifizierung (Verdrängung einkommensschwacher Haushalte)
- Wohnungsmangel (100.000-200.000 fehlende Wohnungen/Jahr)

**2. Preise auf dem Land**
- Sinkende Preise (Nachfrage < Angebot)
- Leerstand (10-15% in Ostdeutschland)
- Wertverlust (Immobilien verlieren 20-30% an Wert)

**3. Neue Wohnformen**
- Co-Living (gemeinschaftliches Wohnen)
- Micro-Apartments (20-30 m², für Singles)
- Modulares Bauen (schneller, günstiger)

**Praxisbeispiel:**
Ein Investor kauft ein MFH in München für 2 Mio. €. Wertsteigerung: 3% p.a. Nach 10 Jahren: 2,7 Mio. € (+700.000 €).

Ein anderer Investor kauft ein MFH in einer ländlichen Region für 200.000 €. Wertverlust: -2% p.a. Nach 10 Jahren: 164.000 € (-36.000 €).

**3. Nachhaltigkeit: Die grüne Wende**

**A. Die Fakten**

**Gebäudesektor:**
- 40% des Energieverbrauchs (Deutschland)
- 30% der CO2-Emissionen
- 60% des Abfalls (Bau und Abriss)

**EU-Ziele:**
- 2030: -55% CO2-Emissionen (gegenüber 1990)
- 2050: Klimaneutralität (Net Zero)

**B. Die Auswirkungen**

**1. Energetische Sanierung**
- Pflicht: Energieausweis (bei Verkauf und Vermietung)
- Förderung: KfW-Kredite (bis zu 150.000 € pro Wohneinheit)
- Kosten: 30.000-80.000 € (Dämmung, Fenster, Heizung)

**2. Erneuerbare Energien**
- Photovoltaik (Strom aus Sonne)
- Wärmepumpe (Heizung aus Umweltwärme)
- Solarthermie (Warmwasser aus Sonne)

**3. ESG-Kriterien**
- Environment (Umwelt): CO2-Fußabdruck, Energieeffizienz
- Social (Soziales): Barrierefreiheit, bezahlbarer Wohnraum
- Governance (Unternehmensführung): Transparenz, Compliance

**Praxisbeispiel:**
Ein Vermieter saniert ein Altbau-MFH energetisch (Kosten: 500.000 €). Förderung: 200.000 € (KfW). Mieterhöhung: 8% (§ 559 BGB). Amortisation: 15 Jahre.

**4. Digitalisierung: Die PropTech-Revolution**

**A. Die Fakten**

**PropTech-Markt:**
- Volumen: 10 Mrd. € (Deutschland, 2026)
- Wachstum: 15-20% p.a.
- Investitionen: 2 Mrd. € (2026)

**B. Die Auswirkungen**

**1. Automatisierung**
- Verwaltung (digitale Hausverwaltung)
- Vermarktung (Online-Portale, virtuelle Besichtigungen)
- Bewertung (KI-gestützte Wertermittlung)

**2. Neue Geschäftsmodelle**
- Plattformen (Airbnb, Wunderflats)
- Crowdfunding (Exporo, Bergfürst)
- Tokenisierung (Immobilien in Anteile aufteilen)

**3. Smart Buildings**
- IoT (Internet of Things): Vernetzte Geräte (Heizung, Licht, Sicherheit)
- Predictive Maintenance: Vorhersage von Instandhaltungsbedarf
- Energiemanagement: Optimierung des Energieverbrauchs

**Praxisbeispiel:**
Ein Investor kauft Anteile an einer Immobilie über Crowdfunding (10.000 €). Rendite: 5% p.a. Laufzeit: 5 Jahre. Auszahlung: 12.763 € (Zinseszins).

**5. Regulierung: Die politische Einflussnahme**

**A. Die Fakten**

**Wohnungspolitik:**
- Mietpreisbremse (Miete max. 10% über ortsüblicher Vergleichsmiete)
- Mietendeckel (Berlin 2020-2021, verfassungswidrig)
- Sozialer Wohnungsbau (Förderung, Quote bei Neubauten)

**B. Die Auswirkungen**

**1. Mietpreisbremse**
- Ziel: Bezahlbarer Wohnraum
- Realität: Wenig Wirkung (Vermieter umgehen durch Modernisierung)
- Kritik: Hemmt Investitionen (weniger Neubau)

**2. Mietendeckel**
- Ziel: Mieten einfrieren
- Realität: Verfassungswidrig (Bundesverfassungsgericht 2021)
- Kritik: Verschärft Wohnungsmangel (Investoren ziehen sich zurück)

**3. Sozialer Wohnungsbau**
- Ziel: Wohnungen für einkommensschwache Haushalte
- Realität: Zu wenig Neubauten (50.000/Jahr, Bedarf: 100.000/Jahr)
- Kritik: Zu teuer (Förderung 100.000 € pro Wohnung)

**Praxisbeispiel:**
Ein Projektentwickler plant ein Neubauprojekt in München. Quote: 30% Sozialwohnungen. Verkaufspreis Eigentumswohnungen: 8.000 €/m². Miete Sozialwohnungen: 10 €/m² (statt 18 €/m²). Verlust: 200.000 € pro Sozialwohnung.

**6. Neue Wohnformen: Die Zukunft des Wohnens**

**A. Co-Living: Das gemeinschaftliche Wohnen**

**Definition:** Wohnform, bei der Bewohner private Zimmer und gemeinschaftliche Räume (Küche, Wohnzimmer, Coworking) teilen.

**Zielgruppe:** Singles, Studenten, Berufstätige (20-40 Jahre)

**Vorteile:**
- Günstig (Miete 500-800 €/Monat)
- Flexibel (kurze Kündigungsfristen)
- Sozial (Community, Events)

**Nachteile:**
- Wenig Privatsphäre
- Lärm (viele Bewohner)
- Nicht für Familien geeignet

**Anbieter:** Quarters, Medici Living, The Collective

**Praxisbeispiel:**
Ein Investor kauft ein Gebäude in Berlin für 5 Mio. €. Umbau zu Co-Living (50 Zimmer). Miete: 700 €/Zimmer/Monat. Einnahmen: 420.000 €/Jahr (8,4% Rendite).

**B. Micro-Apartments: Die Minimalisten**

**Definition:** Kleine Wohnungen (20-30 m²) mit integrierter Küche und Bad.

**Zielgruppe:** Singles, Studenten, Pendler

**Vorteile:**
- Günstig (Miete 400-700 €/Monat)
- Zentral (oft in Innenstädten)
- Pflegeleicht (wenig Platz, wenig Arbeit)

**Nachteile:**
- Eng (wenig Platz für Möbel)
- Nicht für Familien geeignet
- Hoher Preis pro m² (20-30 €/m²/Monat)

**Anbieter:** Greystar, Zeitwohnen, Urban Living

**Praxisbeispiel:**
Ein Investor kauft ein Gebäude in Frankfurt für 3 Mio. €. Umbau zu Micro-Apartments (100 Einheiten à 25 m²). Miete: 600 €/Einheit/Monat. Einnahmen: 720.000 €/Jahr (24% Rendite).

**C. Modulares Bauen: Die Industrialisierung**

**Definition:** Gebäude werden aus vorgefertigten Modulen (Container) zusammengesetzt.

**Vorteile:**
- Schnell (Bauzeit 3-6 Monate statt 12-24 Monate)
- Günstig (Baukosten 1.500-2.500 €/m² statt 2.500-4.000 €/m²)
- Flexibel (Module können umgesetzt werden)

**Nachteile:**
- Begrenzte Gestaltung (Standardmodule)
- Image (Container = billig?)
- Genehmigung (nicht überall erlaubt)

**Anbieter:** Algeco, Touax, Adapteo

**Praxisbeispiel:**
Ein Projektentwickler baut ein Studentenwohnheim (100 Zimmer) aus Modulen. Baukosten: 2 Mio. € (20.000 €/Zimmer). Bauzeit: 6 Monate. Miete: 400 €/Zimmer/Monat. Einnahmen: 480.000 €/Jahr (24% Rendite).

**7. Praxisbeispiel: Zukunftsstrategie für Makler**

**Spezialisierung:** Seniorengerechtes Wohnen + Pflegeimmobilien

**Begründung:**
- Demografischer Wandel (steigende Nachfrage)
- Wenig Konkurrenz (Nischenmarkt)
- Hohe Provisionen (Pflegeheime 5-10 Mio. €)

**Maßnahmen:**
1. Weiterbildung (Zertifikat "Seniorenimmobilien-Makler")
2. Netzwerk aufbauen (Kontakte zu Pflegeheimbetreibern, Investoren)
3. Marketing (Website, Blog, Fachvorträge)
4. Kooperationen (mit Banken, Notaren, Architekten)

**Prognose:**
- Jahr 1: 5 Transaktionen, 200.000 € Umsatz
- Jahr 3: 15 Transaktionen, 600.000 € Umsatz
- Jahr 5: 30 Transaktionen, 1,2 Mio. € Umsatz

**Fazit:** Die Zukunft gehört den Spezialisten. Wer sich frühzeitig positioniert, profitiert langfristig.
    `,
    law: ["[§ 34c GewO](https://www.gesetze-im-internet.de/gewo/__34c.html) (Maklererlaubnis Zusammenfassung)",
      "[§ 652 BGB](https://www.gesetze-im-internet.de/bgb/__652.html) (Maklervertrag)",
      "[§ 15b MaBV](https://www.gesetze-im-internet.de/gewo_34cdv/__15b.html) (Weiterbildungspflicht)",
      "[Art. 14 GG](https://www.gesetze-im-internet.de/gg/art_14.html) (Eigentumsgarantie)"],
    practice: "Präsentieren Sie Ihr persönliches Portfolio (Lebenslauf, Ziele, Kompetenzen, Vision Board).",
    tasks: [
      {
        type: "reflection",
        question: "Reflektieren Sie: Was sind Ihre drei wichtigsten Erkenntnisse aus Modul 1 für Ihre berufliche Praxis?",
        hint: "Schauen Sie auf alle 20 Tage zurück und wählen Sie die Erkenntnisse mit dem größten persönlichen Mehrwert."
      },
      {
        type: "case",
        question: "Portfolio-Aufgabe: Erstellen Sie eine persönliche Kompetenz-Übersicht mit den Kernthemen aus Modul 1.",
        hint: "Nutzen Sie die Struktur: Was weiß ich? Was kann ich? Was will ich vertiefen?"
      },
      {
        type: "research",
        question: "Vorbereitung Modul 2: Recherchieren Sie die aktuellen Voraussetzungen für die §34c GewO-Erlaubnis in Berlin.",
        hint: "Besuchen Sie die Website der IHK Berlin oder das Gewerbeamt Berlin."
      }
    ],
    quiz: [
      {
        question: "Was ist das Ziel des IHK-Sachkundenachweises für Immobilienmakler?",
        options: [
          "Pflichtvoraussetzung für §34c-Erlaubnis",
          "Freiwilliger Qualitätsnachweis",
          "Ersatz für Berufserfahrung",
          "Nur für Verwalter relevant"
        ],
        correct: 1,
        explanation: "Der IHK-Sachkundenachweis ist ein freiwilliger Qualitätsnachweis, der die Kompetenz dokumentiert. Die §34c-Erlaubnis selbst erfordert keinen IHK-Abschluss."
      }
    ],
    type: "Abschluss",
    task: "Erstellen Sie Ihr persönliches Karriere-Portfolio: Fassen Sie die 10 wichtigsten Erkenntnisse aus Modul 1 zusammen, definieren Sie Ihre Spezialisierung (Makler/Verwalter/Gutachter/Finanzierer) und formulieren Sie 3 SMART-Ziele für die nächsten 6 Monate."
  }
};
