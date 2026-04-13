/**
 * MODUL 4 — BONUS-PAKET: HypZert S Prüfungsvorbereitung
 * 20 Intensiv-Tage zur Vorbereitung auf anerkannte Gutachter-Zertifizierungen
 * Basierend auf echten HypZert S Prüfungsinhalten (Stand: 2025/2026)
 * Quellen: HypZert GmbH Berlin, vdpPfandbriefAkademie, DIA Freiburg
 */

export const contentDataModule4Bonus = {

  day_21: {
    title: "Gutachten-Struktur: Aufbau & Formale Anforderungen",
    theory: "Ein rechtlich belastbares Verkehrswertgutachten folgt einem klaren Aufbau nach §194 BauGB und der ImmoWertV 2021. Die formalen Anforderungen der HypZert S Prüfung verlangen vollständige, nachvollziehbare und widerspruchsfreie Dokumentation.",
    extendedTheory: `
### Gutachten-Struktur nach HypZert S Standard

Ein professionelles Verkehrswertgutachten besteht aus diesen Pflichtteilen:

**1. Deckblatt & Auftragsangaben**
- Auftraggeber, Bewertungsobjekt, Bewertungsstichtag
- Beauftragter Gutachter mit Qualifikationsnachweis
- Zweck des Gutachtens (Verkauf, Beleihung, Erbschaft)

**2. Grundlagenteil**
- Grundbuchauszug (alle 3 Abteilungen)
- Baulastenverzeichnis
- Liegenschaftskarte & Flurkarte
- Baugenehmigungen & Baupläne
- Energieausweis (GEG 2024)

**3. Objektbeschreibung**
- Lage & Mikro-/Makrostandort
- Gebäudebeschreibung (Baujahr, Bauweise, Zustand)
- Flächenberechnung nach WoFlV oder gif-Richtlinie
- Mängel & Schäden

**4. Marktanalyse**
- Grundstücksmarktbericht des Gutachterausschusses
- Vergleichspreise & Bodenrichtwerte
- Marktentwicklung & Leerstandsquoten

**5. Wertermittlung**
- Begründung der gewählten Verfahren
- Vollständige Berechnungen
- Plausibilitätsprüfung

**6. Ergebnis & Verkehrswert**
- Begründeter Verkehrswert
- Ableitung aus den Verfahrensergebnissen
- Unterschrift & Datum

### HypZert S Prüfungsaufbau
**Teil I:** 2 vollständige Wertermittlungen (2,5 Stunden)
**Teil II:** Plausibilitätsprüfung eines fehlerhaften Gutachtens (1,25 Stunden)  
**Teil III:** Einzelfragen aus dem Prüfstoffverzeichnis (2 Stunden)
    `,
    law: [
      "[§ 194 BauGB](https://www.gesetze-im-internet.de/bbaug/__194.html) (Verkehrswertdefinition)",
      "[ImmoWertV 2021](https://www.gesetze-im-internet.de/immowertv_2021/) (Wertermittlungsverordnung)",
      "[§ 6 BelWertV](https://www.gesetze-im-internet.de/belwertv/__6.html) (Gutachterqualifikation für Banken)",
      "[DIN ISO/IEC 17024](https://www.din.de/) (Zertifizierungsstandard HypZert)",
      "[GEG 2024](https://www.gesetze-im-internet.de/geg/) (Energieausweis-Pflicht)"
    ],
    practice: `
### Praxisübung: Gutachten-Checkliste

**Aufgabe:** Erstellen Sie eine vollständige Checkliste für ein Einfamilienhaus-Gutachten.

**Zu prüfende Dokumente:**
☐ Grundbuchauszug aktuell (nicht älter als 3 Monate)
☐ Flurkarte / Liegenschaftskarte
☐ Baugenehmigung(en)
☐ Baupläne (Grundrisse, Schnitte, Ansichten)
☐ Energieausweis (Bedarfs- oder Verbrauchsausweis)
☐ Wohnflächenberechnung
☐ Mietverträge (falls vermietet)
☐ Baulastenverzeichnis
☐ Altlasten-Auskunft

**Typische Fehler in HypZert-Prüfungsgutachten:**
- Fehlende Quellenangaben für Bodenrichtwerte
- Widersprüchliche Flächenangaben
- Veraltete Vergleichspreise
- Fehlende Begründung der Verfahrenswahl
    `,
    task: "Analysieren Sie: Welche Teile eines Gutachtens sind für die HypZert S Prüfung am wichtigsten und warum?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Analysieren Sie: Welche Teile eines Gutachtens sind für die HypZert S Prüfung am wichtigsten und warum?",
        hint: "Denken Sie an die drei Prüfungsteile: Wertermittlung, Plausibilitätsprüfung, Einzelfragen."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Auftraggeber fragt Sie nach dem Unterschied zwischen einem Kurzgutachten und einem vollständigen Verkehrswertgutachten. Was antworten Sie?",
        hint: "Kurzgutachten: keine Gerichtsverwertbarkeit. Vollgutachten: §194 BauGB konform, gerichtsverwertbar."
      },
      {
        type: "research" as const,
        question: "Recherchieren Sie: Was sind die genauen Zulassungsvoraussetzungen für die HypZert S Prüfung 2025/2026?",
        hint: "Besuchen Sie www.hypzert.de für aktuelle Anforderungen (Berufserfahrung, Gutachtennachweise etc.)"
      }
    ],
    quiz: []
  },

  day_22: {
    title: "Beleihungswert vs. Verkehrswert: Prüfungsrelevante Unterschiede",
    theory: "Der Beleihungswert (§ 16 PfandbriefG, BelWertV) ist der nachhaltige Wert einer Immobilie für Kreditinstitute — er liegt systematisch unter dem Verkehrswert. Die Unterscheidung ist Kernthema der HypZert S Prüfung.",
    extendedTheory: `
### Verkehrswert vs. Beleihungswert

| Merkmal | Verkehrswert | Beleihungswert |
|---------|-------------|----------------|
| Rechtsgrundlage | §194 BauGB, ImmoWertV | §16 PfandbriefG, BelWertV |
| Stichtag | Bewertungsstichtag | Nachhaltig, zukunftsorientiert |
| Marktlage | Aktuell | Normalisiert (konjunkturunabhängig) |
| Verwendung | Verkauf, Erbschaft, Steuern | Bankenbeleihung, Pfandbriefe |
| Verhältnis | 100% | 70-80% des Verkehrswertes üblich |

### Beleihungswertermittlung nach BelWertV

**Schritt 1: Ertragswert (§ 8 BelWertV)**
- Nachhaltig erzielbarer Reinertrag
- Keine spekulativen Mieten
- Kapitalisierung mit nachhaltigem Liegenschaftszinssatz

**Schritt 2: Sachwert (§ 10 BelWertV)**
- Nachhaltiger Bodenwert (Bodenrichtwert ohne Sondereinflüsse)
- Gebäudesachwert mit nachhaltigem Bauwert

**Schritt 3: Beleihungswert**
- Niedrigster Wert aus Ertragswert und Sachwert
- Abzüge für Risiken und Mängel
- Maximal 80% des Verkehrswertes (§ 16 Abs. 2 PfandbriefG)

### Nachhaltigkeitsprinzip — das Herzstück
Keine konjunkturellen Hochpunkte
Keine spekulativen Mieterwartungen  
Keine kurzfristigen Sondereinflüsse
    `,
    law: [
      "[§ 16 PfandbriefG](https://www.gesetze-im-internet.de/pfandbriefg/__16.html) (Beleihungswertdefinition)",
      "[BelWertV](https://www.gesetze-im-internet.de/belwertv/) (Beleihungswertermittlungsverordnung)",
      "[§ 8 BelWertV](https://www.gesetze-im-internet.de/belwertv/__8.html) (Ertragswert Beleihung)",
      "[§ 10 BelWertV](https://www.gesetze-im-internet.de/belwertv/__10.html) (Sachwert Beleihung)",
      "[ImmoWertV §2](https://www.gesetze-im-internet.de/immowertv_2021/__2.html) (Verkehrswertdefinition)"
    ],
    practice: `
### Rechenübung: Beleihungswert EFH München

**Objekt:** Einfamilienhaus München, Baujahr 2005, 140m² Wohnfläche

**Gegebene Werte:**
- Verkehrswert: 850.000 €
- Nachhaltiger Jahresreinertrag: 22.000 €
- Liegenschaftszinssatz (nachhaltig): 2,8%
- Restnutzungsdauer: 45 Jahre
- Bodenwert (nachhaltig): 380.000 €
- Gebäudesachwert (nachhaltig): 320.000 €

**Aufgabe:** Berechnen Sie Ertragswert, Sachwert und Beleihungswert.

**Lösung:**
Ertragswert = RND-Vervielfältiger × Reinertrag + Bodenwert
Vervielfältiger (2,8%, 45 Jahre) = 24,52
Ertragswert = 24,52 × 22.000 + 380.000 = 919.440 € → gekappt!

Sachwert = 380.000 + 320.000 = 700.000 €

Beleihungswert = Min(919.440, 700.000) = 700.000 €
Beleihungsgrenze (80%) = 560.000 €
    `,
    task: "Warum liegt der Beleihungswert systematisch unter dem Verkehrswert? Erklären Sie das Nachhaltigkeitsprinzip.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Warum liegt der Beleihungswert systematisch unter dem Verkehrswert? Erklären Sie das Nachhaltigkeitsprinzip.",
        hint: "Denken Sie an Konjunkturzyklen und die langfristige Sicherheit für Kreditinstitute."
      },
      {
        type: "case" as const,
        question: "Fallstudie: Eine Bank lehnt eine Finanzierung ab, obwohl der Verkehrswert 900.000€ beträgt. Der Beleihungswert liegt bei 650.000€. Erklären Sie dem Kunden warum.",
        hint: "Max. Beleihungsgrenze 80% von 650.000 = 520.000€ Kredit möglich."
      },
      {
        type: "research" as const,
        question: "Recherchieren Sie aktuelle Liegenschaftszinssätze für Wohnimmobilien in Ihrer Region beim zuständigen Gutachterausschuss.",
        hint: "Gutachterausschuss Berlin: www.gutachterausschuss-berlin.de — andere Bundesländer ähnlich."
      }
    ],
    quiz: []
  },

  day_23: {
    title: "Plausibilitätsprüfung: Fehler in Gutachten erkennen",
    theory: "HypZert S Prüfungsteil II: Die Plausibilitätsprüfung eines fehlerhaften Gutachtens ist eine der schwierigsten Aufgaben. Systematisches Vorgehen ist entscheidend.",
    extendedTheory: `
### Systematische Plausibilitätsprüfung

**Schritt 1: Formale Prüfung**
- Vollständigkeit aller Pflichtangaben
- Aktualität der Unterlagen (max. 3 Monate)
- Widersprüche zwischen Textteilen
- Quellenangaben vorhanden?

**Schritt 2: Sachliche Prüfung**
- Stimmen Flächenangaben überein?
- Ist der Bodenrichtwert aktuell und korrekt?
- Sind Vergleichspreise marktkonform?
- Ist die Restnutzungsdauer plausibel?

**Schritt 3: Rechnerische Prüfung**
- Alle Berechnungen nachrechnen
- Vervielfältiger korrekt?
- Bodenwert richtig übernommen?
- Zwischensummen stimmen?

**Typische Fehler in HypZert-Prüfungsgutachten:**

| Fehlerart | Häufigkeit | Auswirkung |
|-----------|-----------|------------|
| Falscher Bodenrichtwert | ★★★★★ | Erheblich |
| Veraltete Vergleichspreise | ★★★★ | Erheblich |
| Falsche RND | ★★★★ | Mittel |
| Fehlende Quellenangaben | ★★★ | Formal |
| Rechenfehler | ★★★ | Je nach Betrag |
| Widersprüchliche Flächen | ★★★ | Erheblich |

### Bewertungsmaßstab
"Nachvollziehbar, formal korrekt und widerspruchsfrei" — das sind die drei HypZert-Kriterien für jedes Gutachten.
    `,
    law: [
      "[ImmoWertV §3](https://www.gesetze-im-internet.de/immowertv_2021/__3.html) (Allgemeine Verfahrensregeln)",
      "[§ 193 BauGB](https://www.gesetze-im-internet.de/bbaug/__193.html) (Gutachterausschüsse)",
      "[WoFlV](https://www.gesetze-im-internet.de/woflv/) (Wohnflächenverordnung)",
      "[gif-Richtlinie Mietflächen](https://www.gif-ev.de/) (Gewerbliche Flächen)"
    ],
    practice: `
### Prüfungsaufgabe: Finden Sie die Fehler!

**Fehlerhaftes Gutachten-Auszug:**
Objekt: ETW, 75m² (lt. Grundbuch: 73m²)
Baujahr: 1985, RND: 40 Jahre (Gesamtnutzungsdauer: 80 Jahre → Alter: 39 Jahre → rechnerisch: 41 Jahre!)
Bodenrichtwert: 2.400 €/m² (Gutachterausschuss 2022 — veraltet!)
Grundstücksfläche: 850m² (lt. Flurkarte: 820m²)
Bodenwert: 850 × 2.400 = 2.040.000 € 

**Fehler die Sie finden müssen:**
1. Flächenwiderspruch: 75m² vs. 73m² im Grundbuch
2. RND-Widerspruch: rechnerisch 41 Jahre, angegeben 40 Jahre
3. Veralteter Bodenrichtwert: 2022 statt aktuell
4. Grundstücksfläche: 850m² vs. 820m² in Flurkarte
5. Bodenwert-Fehler: Falsche Grundstücksfläche × falscher BRW
    `,
    task: "Erstellen Sie eine persönliche Checkliste mit den 10 häufigsten Fehlern die Sie bei der Plausibilitätsprüfung zuerst prüfen würden.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Erstellen Sie eine persönliche Checkliste mit den 10 häufigsten Fehlern die Sie bei der Plausibilitätsprüfung zuerst prüfen würden.",
        hint: "Orientieren Sie sich am HypZert Prüfstoffverzeichnis und typischen Prüfungsfehlern."
      },
      {
        type: "case" as const,
        question: "Sie erhalten ein Gutachten zur Plausibilitätsprüfung. Der Verkehrswert beträgt 450.000€, der Beleihungswert 490.000€. Was ist sofort auffällig?",
        hint: "Beleihungswert darf niemals über dem Verkehrswert liegen — das ist ein fundamentaler Fehler!"
      },
      {
        type: "research" as const,
        question: "Laden Sie das aktuelle HypZert Prüfstoffverzeichnis herunter und identifizieren Sie die 5 wichtigsten Themenbereiche.",
        hint: "Download unter: www.hypzert.de — Prüfstoffverzeichnis für HypZert S/F."
      }
    ],
    quiz: []
  },

  day_24: {
    title: "Gewerbeimmobilien: Büro, Handel, Logistik bewerten",
    theory: "Die Bewertung von Gewerbeimmobilien unterscheidet sich fundamental von Wohnimmobilien. Mietverträge, Drittverwendbarkeit und Standortqualität sind die entscheidenden Wertfaktoren.",
    extendedTheory: `
### Gewerbeimmobilien-Bewertung nach ImmoWertV 2021

**Hauptverfahren für Gewerbe: Ertragswertverfahren**

**Besonderheiten bei Gewerbeobjekten:**

**1. Mietvertragsanalyse**
- Restlaufzeit des Mietvertrags
- Bonität des Mieters (Kreditrating)
- Indexierungsklauseln (Staffel vs. Index)
- Verlängerungsoptionen
- Kündigungsfristen

**2. Marktmiete vs. Vertragsmiete**
- Liegt Vertragsmiete über/unter Marktmiete?
- Übermiete = erhöhtes Risiko
- Untermiete = stille Reserve

**3. Drittverwendbarkeit**
- Wie gut kann das Objekt anderweitig genutzt werden?
- Spezialobjekte (Kino, Hotel) = geringere Drittverwendbarkeit
- Büro/Logistik = höhere Drittverwendbarkeit

**4. Liegenschaftszinssätze Gewerbe (Richtwerte 2024)**

| Objekttyp | LZ-Satz Bereich |
|-----------|----------------|
| Büro Innenstadt | 3,5 - 5,5% |
| Einzelhandel A-Lage | 3,0 - 4,5% |
| Logistik modern | 4,0 - 5,5% |
| Hotel | 5,0 - 7,0% |
| Sonderimmobilien | 6,0 - 9,0% |

**5. DCF-Verfahren für Gewerbe**
Discounted Cashflow — für Gewerbe mit stark schwankenden Erträgen:
- Jahrescashflows für 10 Jahre prognostizieren
- Restwertkalkulation (Exit-Kapitalisierung)
- Diskontierung mit Risikoäquivalentem Zinssatz (WACC)
    `,
    law: [
      "[ImmoWertV §27](https://www.gesetze-im-internet.de/immowertv_2021/__27.html) (Ertragswertverfahren)",
      "[gif-Richtlinie](https://www.gif-ev.de/) (Gewerbliche Immobilienbewertung)",
      "[§ 578 BGB](https://www.gesetze-im-internet.de/bgb/__578.html) (Gewerbemietrecht)",
      "[ImmoWertV §36](https://www.gesetze-im-internet.de/immowertv_2021/__36.html) (Liegenschaftszinssatz)"
    ],
    practice: `
### Fallstudie: Bürogebäude Berlin Mitte

**Objektdaten:**
- Bürogebäude, Baujahr 2010, 2.500m² Mietfläche
- Standort: Berlin Mitte, sehr gute ÖPNV-Anbindung
- Aktueller Mieter: Großkanzlei, Restlaufzeit 7 Jahre
- Vertragsmiete: 28 €/m² (Marktmiete: 32 €/m²)
- Bewirtschaftungskosten: 18% der Rohmiete
- Liegenschaftszinssatz: 4,0%
- Bodenwert: 3.200.000 €
- RND: 45 Jahre

**Aufgabe:** Berechnen Sie den Verkehrswert im Ertragswertverfahren.

**Lösung:**
Jahresrohertrag = 2.500 × 28 × 12 = 840.000 €
Bewirtschaftungskosten = 840.000 × 18% = 151.200 €
Reinertrag = 688.800 €
Bodenwertverzinsung = 3.200.000 × 4% = 128.000 €
Gebäudereinerrtrag = 560.800 €
Vervielfältiger (4%, 45J) = 21,36
Gebäudeertragswert = 11.979.000 €
Ertragswert = 11.979.000 + 3.200.000 = 15.179.000 €
    `,
    task: "Warum ist die Drittverwendbarkeit bei Gewerbeimmobilien so wichtig für die Wertermittlung?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Warum ist die Drittverwendbarkeit bei Gewerbeimmobilien so wichtig für die Wertermittlung?",
        hint: "Denken Sie an das Risiko: Was passiert wenn der aktuelle Mieter auszieht?"
      },
      {
        type: "case" as const,
        question: "Ein Supermarkt wurde speziell für einen Lebensmittelkonzern gebaut. Der Mieter kündigt. Welche Auswirkungen hat das auf den Wert?",
        hint: "Hohe Umrüstungskosten, eingeschränkte Drittverwendbarkeit = erheblicher Wertverlust."
      },
      {
        type: "research" as const,
        question: "Recherchieren Sie aktuelle Büro-Liegenschaftszinssätze für Ihre Zielregion aus dem aktuellen Grundstücksmarktbericht.",
        hint: "Gutachterausschüsse veröffentlichen jährlich Marktberichte mit Liegenschaftszinssätzen."
      }
    ],
    quiz: []
  },

  day_25: {
    title: "Übungsgutachten 1: Einfamilienhaus vollständig bewerten",
    theory: "Praxistag: Ein vollständiges Verkehrswertgutachten für ein Einfamilienhaus erstellen — von der Objektaufnahme bis zum Ergebnisausweis. Das ist der Kern der HypZert S Prüfung Teil I.",
    extendedTheory: `
### Vollständiges Übungsgutachten: EFH Potsdam

**Auftrag:** Verkehrswertermittlung zum 01.03.2026

**Objektdaten:**
- Einfamilienhaus, Potsdam-Babelsberg
- Baujahr: 1998, Massivbauweise
- Wohnfläche: 165m² (WoFlV), Keller: 85m² (nicht beheizt)
- Grundstück: 680m²
- Garage: 22m²
- Zustand: gut, zuletzt renoviert 2019

**Schritt 1: Bodenwertermittlung**
Bodenrichtwert Babelsberg: 380 €/m²
Grundstücksgröße: 680m²
Bodenwert = 680 × 380 = 258.400 €

**Schritt 2: Sachwertverfahren**
NHK 2010 (EFH, gut): 1.450 €/m² BRI
Baupreisindex 2026 (2010=100): 162,5
Aktueller NHK = 1.450 × 1,625 = 2.356 €/m²

Brutto-Rauminhalt (BRI): 165m² × 3,2 = 528m³
Gebäudebauwert = 528 × 2.356 = 1.243.968 €

Alterswertminderung: 28 Jahre / 80 Jahre GND = 35%
Gebäudesachwert = 1.243.968 × (1-0,35) = 808.579 €

Garage (Pauschal): 18.000 €
Außenanlagen: 12.000 €

Vorläufiger Sachwert = 258.400 + 808.579 + 30.000 = 1.096.979 €
Sachwertfaktor (Potsdam, 1,0 Mio Klasse): 1,12
**Sachwert = 1.228.616 €**

**Schritt 3: Vergleichswertverfahren**
Vergleichspreise (Gutachterausschuss 2025): 4.200-4.800 €/m² WF
Mittelwert: 4.500 €/m² WF
**Vergleichswert = 165 × 4.500 = 742.500 €**

**Schritt 4: Verkehrswert**
Vergleichswert: 742.500 € (Gewichtung 60%)
Sachwert: 1.228.616 € (Gewichtung 40%)
Gewichteter Wert: 445.500 + 491.446 = 936.946 €
**Verkehrswert: 937.000 € (gerundet)**
    `,
    law: [
      "[ImmoWertV §21](https://www.gesetze-im-internet.de/immowertv_2021/__21.html) (Sachwertverfahren)",
      "[ImmoWertV §15](https://www.gesetze-im-internet.de/immowertv_2021/__15.html) (Vergleichswertverfahren)",
      "[NHK 2010](https://www.iwb-online.de/nhk-2010) (Normalherstellungskosten)",
      "[WoFlV](https://www.gesetze-im-internet.de/woflv/) (Wohnflächenberechnung)"
    ],
    practice: `
### Ihre Aufgabe: Übungsgutachten selbst erstellen

Erstellen Sie ein vollständiges Gutachten für folgendes Objekt:

**Objekt:** Doppelhaushälfte, München-Pasing
**Baujahr:** 2003, Wohnfläche: 130m²
**Grundstück:** 390m²
**Zustand:** Mittel (Küche 10 Jahre alt, Bad renovierungsbedürftig)
**Bodenrichtwert:** 1.850 €/m²
**Vergleichspreise:** 7.200-8.400 €/m² WF

**Bereiten Sie vor:**
1. Bodenwertermittlung
2. Sachwertberechnung
3. Vergleichswertermittlung  
4. Begründeten Verkehrswert

Nutzen Sie die Formeln aus dem Beispiel oben.
    `,
    task: "Warum gewichtet man beim Verkehrswert Vergleichs- und Sachwertverfahren unterschiedlich stark? Wann dominiert welches Verfahren?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Warum gewichtet man beim Verkehrswert Vergleichs- und Sachwertverfahren unterschiedlich stark? Wann dominiert welches Verfahren?",
        hint: "Vergleichswert dominiert bei guter Datenlage. Sachwert bei Unikaten ohne Vergleichsobjekte."
      },
      {
        type: "case" as const,
        question: "Das Übungsgutachten zeigt: Sachwert 1,2 Mio €, Vergleichswert 742.000 €. Die Differenz beträgt 38%. Wie gehen Sie damit um?",
        hint: "Erklären Sie die Abweichung — Sachwertfaktor berücksichtigen, Marktlage analysieren."
      },
      {
        type: "research" as const,
        question: "Laden Sie den aktuellen Grundstücksmarktbericht Ihrer Region herunter und notieren Sie die aktuellen Sachwertfaktoren.",
        hint: "Gutachterausschüsse publizieren Sachwertfaktoren jährlich — meist kostenlos online."
      }
    ],
    quiz: []
  },

  day_26: {
    title: "Sondereinflüsse: Baulasten, Altlasten, Denkmalschutz",
    theory: "Sondereinflüsse können den Verkehrswert erheblich mindern oder erhöhen. HypZert S Prüfungsmodul 5: Sichere Erkennung und korrekte Wertung ist prüfungsrelevant.",
    extendedTheory: `
### Wertbeeinflussende Sondereinflüsse

**1. Baulasten**
Öffentlich-rechtliche Verpflichtungen im Baulastenverzeichnis:
- Abstandsflächenbaulast: Nachbar darf näher bauen
- Erschließungsbaulast: Übernahme fremder Erschließung
- Überfahrtsbaulast: Recht des Nachbarn zur Durchfahrt

Wertminderung: 5-25% je nach Art und Intensität

**2. Altlasten**
- Bodenkontaminationen durch frühere Nutzung
- Kampfmittelverdacht
- Sanierungskosten = direkte Wertminderung

Formel: Wertminderung = Sanierungskosten × Risikoaufschlag (1,1-1,5)

**3. Denkmalschutz — zweischneidig!**
**Nachteile:**
- Eingeschränkte Umbaumöglichkeiten
- Höhere Instandhaltungskosten
- Genehmigungspflicht für Änderungen

**Vorteile:**
- Steuerliche AfA-Vorteile (§ 7i, 10f, 11b EStG)
- Erhöhte Attraktivität (Alleinstellungsmerkmal)
- Förderprogramme (KfW, Denkmalpflegefonds)

**4. Erbbaurecht**
- Grundstück nicht im Eigentum des Gebäudeeigentümers
- Erbbauzins reduziert Ertrag
- Restlaufzeit entscheidend für Wert
- Wertminderung: 15-35% gegenüber Volleigentum

**5. Wohnungsrecht/Nießbrauch**
Eingetragen in Abteilung II Grundbuch
- Wertminderung abhängig von Lebenserwartung des Berechtigten
- Berechnung mit Barwertfaktor × jährlicher Nutzungsvorteil
    `,
    law: [
      "[§ 7i EStG](https://www.gesetze-im-internet.de/estg/__7i.html) (Denkmalschutz-AfA)",
      "[BBodSchG](https://www.gesetze-im-internet.de/bbodschg/) (Bodenschutz/Altlasten)",
      "[ErbbauRG](https://www.gesetze-im-internet.de/erbbaurg/) (Erbbaurechtsgesetz)",
      "[ImmoWertV §9](https://www.gesetze-im-internet.de/immowertv_2021/__9.html) (Werteinflüsse)"
    ],
    practice: `
### Fallstudie: Mehrfamilienhaus mit Sondereinflüssen

**Objekt:** MFH, Hamburg-Altona, Baujahr 1900
**Besonderheiten:**
1. Denkmalschutz eingetragen
2. Altlastenverdacht: ehemals Druckerei
3. Abstandsflächenbaulast zugunsten Nachbar

**Ausgangswert ohne Sondereinflüsse:** 1.800.000 €

**Berechnung der Werteinflüsse:**

Denkmalschutz:
- Mehrkosten Instandhaltung: ca. 8.000 €/Jahr
- Steuervorteile §7i: ca. 4.500 €/Jahr
- Netto-Belastung: 3.500 €/Jahr
- Kapitalisiert (3%, 30J): 3.500 × 19,6 = 68.600 € Minderung
- Imagegewinn (Schätzung): +30.000 €
- Denkmalschutz-Netto: -38.600 €

Altlasten-Gutachten (Phase I): Verdacht bestätigt
Sanierungskosten-Schätzung: 85.000 €
Mit Risikoaufschlag 1,2: 102.000 € Minderung

Baulast: 3% × 1.800.000 = 54.000 € Minderung

**Verkehrswert:** 1.800.000 - 38.600 - 102.000 - 54.000 = **1.605.400 €**
    `,
    task: "Ein Denkmalschutz-Objekt kann trotz erhöhter Kosten attraktiv sein. Wann überwiegen die Vorteile?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Ein Denkmalschutz-Objekt kann trotz erhöhter Kosten attraktiv sein. Wann überwiegen die Vorteile?",
        hint: "§7i EStG AfA + Förderprogramme + Alleinstellungsmerkmal können die Mehrkosten überwiegen."
      },
      {
        type: "case" as const,
        question: "Ein Käufer fragt ob er das Denkmal-Haus wie gewünscht modernisieren kann. Was müssen Sie ihm erklären?",
        hint: "Denkmalschutzbehörde muss alle Änderungen genehmigen — Fenster, Fassade, Dach alles genehmigungspflichtig."
      },
      {
        type: "research" as const,
        question: "Recherchieren Sie: Welche KfW-Förderprogramme gibt es aktuell für denkmalgeschützte Immobilien?",
        hint: "KfW-Programm 151/152 (Energieeffizient Sanieren) und Denkmalpflegeprogramme der Länder."
      }
    ],
    quiz: []
  },

  day_27: {
    title: "Marktanalyse & Makro/Mikro-Standortbewertung Profis",
    theory: "Tiefgehende Standortanalyse ist Basis jedes Gutachtens. HypZert-konforme Marktanalyse nutzt nachprüfbare Datenquellen und quantitative Indikatoren.",
    extendedTheory: `
### Professionelle Standortanalyse für Gutachter

**Makrostandort — regionale Ebene**

Zu analysierende Faktoren:
- Bevölkerungsentwicklung (Quelle: Statistisches Bundesamt, Destatis)
- Wirtschaftskraft (BIP/Kopf, Arbeitslosenquote, Kaufkraft IHK)
- Infrastruktur (Autobahn, Bahn, Flughafen)
- Zukunftsperspektive (Bevölkerungsprognose bis 2040)

**Mikrostandort — Objektebene**

Quantitative Bewertung 1-5 Punkte:
- ÖPNV-Anbindung (S-Bahn/U-Bahn-Entfernung)
- Einzelhandelsversorgung (Grundversorger in <500m?)
- Schulen & Kitas (Entfernung, Qualität)
- Störfaktoren (Lärm, Geruch, Hochspannungsleitungen)

**Marktbericht-Pflichtquellen für HypZert:**

| Quelle | Inhalt | Bezug |
|--------|--------|-------|
| Gutachterausschuss | Bodenrichtwerte, Kauffälle | Landesamt |
| Statistisches LA | Bevölkerung, Haushalte | Kostenlos online |
| Bundesbank | Zinsentwicklung, Hypotheken | Kostenlos online |
| gif e.V. | Gewerbliche Flächendaten | Mitgliedschaft |
| BulwienGesa | Immobilienmarkt regional | Kostenpflichtig |
| Empirica | Wohnungsmarkt | Kostenpflichtig |

**Lagequalität nach WertR:**
Sehr gute Lage: Topstandort, alle Infrastrukturmerkmale positiv
Gute Lage: Kleine Einschränkungen, dennoch marktgängig
Mittlere Lage: Merkliche Einschränkungen, aber stabiler Markt
Einfache Lage: Deutliche Nachteile, höhere Vermarktungsrisiken
    `,
    law: [
      "[ImmoWertV §7](https://www.gesetze-im-internet.de/immowertv_2021/__7.html) (Grundsätze der Wertermittlung)",
      "[§ 196 BauGB](https://www.gesetze-im-internet.de/bbaug/__196.html) (Gutachterausschüsse, Bodenrichtwerte)",
      "[WertR 2021](https://www.bundesfinanzministerium.de/) (Wertermittlungsrichtlinien)",
      "[gif-Richtlinie](https://www.gif-ev.de/) (gif-Lagebeurteilung)"
    ],
    practice: `
### Aufgabe: Standortanalyse Berlin-Marzahn vs. Berlin-Mitte

Vergleichen Sie beide Standorte anhand folgender Kriterien:

| Kriterium | Berlin-Mitte | Berlin-Marzahn |
|-----------|-------------|----------------|
| Bodenrichtwert | 2.800 €/m² | 380 €/m² |
| ÖPNV | U-Bahn direkt | S-Bahn 500m |
| Kaufkraft | 118 (Dtl=100) | 89 (Dtl=100) |
| Leerstand ETW | 0,5% | 2,8% |
| Bevölkerung +/- | +2,1%/J | -0,3%/J |

**Frage:** Berechnen Sie den Lagemultiplikator für Marzahn gegenüber Mitte.
Mitte = 100%, Marzahn = ?

**Diskussion:** Welche Nachteile hat Mitte trotzdem?
(Lärmbelastung, Parkierung, Innenstadtprobleme)
    `,
    task: "Welche Datenquellen sind für eine HypZert-konforme Marktanalyse unverzichtbar und warum?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Welche Datenquellen sind für eine HypZert-konforme Marktanalyse unverzichtbar und warum?",
        hint: "Gutachterausschuss + Statistisches Landesamt sind Pflicht. Nachprüfbarkeit ist entscheidend."
      },
      {
        type: "case" as const,
        question: "Sie bewerten eine Wohnung in einem Gebiet mit stark steigenden Mieten. Wie gehen Sie mit der Marktdynamik im Gutachten um?",
        hint: "Nachhaltigkeit: Aktuelle Spitzenmieten nicht 1:1 ansetzen — HypZert verlangt nachhaltige Werte."
      },
      {
        type: "research" as const,
        question: "Laden Sie den aktuellen Grundstücksmarktbericht für eine Stadt Ihrer Wahl herunter und analysieren Sie die Preisentwicklung der letzten 3 Jahre.",
        hint: "Die meisten Gutachterausschüsse bieten kostenlose Downloads auf ihren Websites."
      }
    ],
    quiz: []
  },

  day_28: {
    title: "Übungsgutachten 2: Mehrfamilienhaus im Ertragswertverfahren",
    theory: "Vollständiges Übungsgutachten Mehrfamilienhaus — das Ertragswertverfahren dominiert bei vermieteten Wohnobjekten. Schritt-für-Schritt Anleitung für die HypZert Prüfung.",
    extendedTheory: `
### Vollständiges MFH-Gutachten: Hamburg-Harburg

**Objekt:** Mietwohnhaus, 8 Wohneinheiten
**Baujahr:** 1975, Massivbau, 6 Vollgeschosse
**Wohnfläche gesamt:** 620m²
**Grundstück:** 850m²
**Zustand:** Modernisiert 2018 (Dach, Heizung, Fenster)

**SCHRITT 1: Rohmietertrag**
Aktuelle Vertragsmieten: 8,20 €/m²/Monat
Jahresrohertrag = 620 × 8,20 × 12 = 60.912 €

Marktmiete (Mietspiegelerhebung): 9,40 €/m²/Monat
Potenzialmiete = 620 × 9,40 × 12 = 69.936 €

**SCHRITT 2: Bewirtschaftungskosten**
Nach ImmoWertV §24:
- Verwaltungskosten: 400 €/WE × 8 = 3.200 €
- Instandhaltungskosten: 14 €/m² × 620 = 8.680 €
- Mietausfall-/Leerstandswagnis: 3% × 60.912 = 1.827 €
- Gesamt BWK: 13.707 € = 22,5% vom Rohertrag

**SCHRITT 3: Jahresreinertrag**
Jahresreinertrag = 60.912 - 13.707 = 47.205 €

**SCHRITT 4: Bodenwert**
Bodenrichtwert Harburg: 520 €/m²
Bodenwert = 850 × 520 = 442.000 €

**SCHRITT 5: Gebäudereinerttrag**
Bodenwertverzinsung = 442.000 × 3,5% = 15.470 €
Gebäudereinerttrag = 47.205 - 15.470 = 31.735 €

**SCHRITT 6: Gebäudeertragswert**
Liegenschaftszinssatz (MFH Harburg): 3,5%
RND: 47 Jahre (Baujahr 1975, GND 80 Jahre, Modernisierung +8J)
Vervielfältiger (3,5%, 47J): 23,61
Gebäudeertragswert = 31.735 × 23,61 = 749.203 €

**SCHRITT 7: Ertragswert**
Ertragswert = 749.203 + 442.000 = 1.191.203 €

Marktanpassung (+3% wegen guter Nachfrage Harburg):
**Verkehrswert: 1.227.000 € (gerundet)**
    `,
    law: [
      "[ImmoWertV §24](https://www.gesetze-im-internet.de/immowertv_2021/__24.html) (Bewirtschaftungskosten)",
      "[ImmoWertV §27](https://www.gesetze-im-internet.de/immowertv_2021/__27.html) (Liegenschaftszinssatz)",
      "[ImmoWertV §§27-37](https://www.gesetze-im-internet.de/immowertv_2021/) (Ertragswertverfahren)"
    ],
    practice: `
### Ihre Aufgabe: MFH Köln-Ehrenfeld

Berechnen Sie den Verkehrswert:
- 6 WE, 480m² WF, Baujahr 1968
- Aktuelle Miete: 11,50 €/m²/Monat
- Bodenrichtwert: 780 €/m², Grundstück: 620m²
- LZ-Satz: 3,2%, RND: 40 Jahre
- BWK-Quote: 24%

Führen Sie alle 7 Schritte durch und begründen Sie jeden Rechenschritt.
    `,
    task: "Wann würde man beim MFH zusätzlich das Sachwertverfahren durchführen und wie wird es gewichtet?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Wann würde man beim MFH zusätzlich das Sachwertverfahren durchführen und wie wird es gewichtet?",
        hint: "Bei älteren Gebäuden mit unsicherer Ertragslage — als Plausibilitätsprüfung, meist niedrig gewichtet."
      },
      {
        type: "case" as const,
        question: "Das Gutachten ergibt 1.200.000€. Der Eigentümer ist enttäuscht, er hatte 1.500.000€ erwartet. Wie erklären Sie das Ergebnis?",
        hint: "Marktmiete vs. Vertragsmiete, Bewirtschaftungskosten-Ansatz, Liegenschaftszinssatz begründen."
      },
      {
        type: "research" as const,
        question: "Recherchieren Sie die aktuellen Liegenschaftszinssätze für MFH in Ihrer Zielstadt aus dem Grundstücksmarktbericht.",
        hint: "Meist im Tabellenanhang des Grundstücksmarktberichts zu finden."
      }
    ],
    quiz: []
  },

  day_29: {
    title: "IHK öffentliche Bestellung & Vereidigung — der nächste Schritt",
    theory: "Nach HypZert S ist die öffentliche Bestellung und Vereidigung durch die IHK der höchste Qualitätsnachweis für Immobiliengutachter in Deutschland — für gerichtsverwertbare Gutachten unerlässlich.",
    extendedTheory: `
### Öffentliche Bestellung & Vereidigung durch die IHK

**Was bedeutet öffentliche Bestellung?**
Der öffentlich bestellte und vereidigte Sachverständige (ö.b.u.v.) hat nachgewiesen:
- Besondere Sachkunde (über Durchschnitt hinaus)
- Persönliche Eignung (Zuverlässigkeit, Unparteilichkeit)
- Geschäftliche Unabhängigkeit

**Voraussetzungen (IHK Berlin als Beispiel):**
- Sachkundenachweis (mind. 5 Jahre Berufserfahrung)
- Mindestens 5 selbständig erstellte Gutachten
- Hochschulabschluss oder äquivalente Qualifikation
- Keine Vorstrafen, geordnete Vermögensverhältnisse
- HypZert F oder gleichwertige Qualifikation empfohlen

**Prüfungsverfahren:**
1. Schriftlicher Antrag mit Unterlagen
2. Überprüfung der Unterlagen durch IHK-Sachverständigenausschuss
3. Theoretische und praktische Prüfung
4. Vereidigung bei der IHK

**Pflichten des ö.b.u.v. Sachverständigen:**
- Gutachtenpflicht: Darf Auftrag nicht ohne wichtigen Grund ablehnen
- Unparteilichkeit: Strenge Neutralitätspflicht
- Fortbildungspflicht: Regelmäßige Weiterbildung
- Versicherungspflicht: Berufshaftpflichtversicherung

**Übersicht Qualifikationsstufen Gutachter:**

| Stufe | Bezeichnung | Anforderungen |
|-------|------------|---------------|
| 1 | Freier Gutachter | Keine formalen |
| 2 | HypZert S | Prüfung + 3J Erfahrung |
| 3 | HypZert F | Aufbau auf S |
| 4 | ö.b.u.v. IHK | 5J + Prüfung |
| 5 | FRICS | International |
    `,
    law: [
      "[§ 36 GewO](https://www.gesetze-im-internet.de/gewo/__36.html) (Öffentliche Bestellung)",
      "[SVG Berlin](https://www.ihk-berlin.de/sachverstaendige) (Sachverständigenordnung IHK Berlin)",
      "[ZPO §402ff](https://www.gesetze-im-internet.de/zpo/__402.html) (Gerichtsgutachter)",
      "[JVEG](https://www.gesetze-im-internet.de/jveg/) (Vergütung gerichtlicher Gutachter)"
    ],
    practice: `
### Karrierepfad-Planung: Von der Ausbildung zum ö.b.u.v.

**Erstellen Sie Ihren persönlichen 5-Jahres-Plan:**

Jahr 1-2: Grundlagen & erste Gutachten
- Modul 4 Basis abschließen
- Erste Hospitationen bei erfahrenem Gutachter
- 2-3 eigenständige Gutachten unter Aufsicht

Jahr 3: HypZert S Vorbereitung
- Dieses Bonus-Paket durcharbeiten
- HypZert S Prüfung ablegen (Kosten: 1.700€)
- Aufbau eigenes Gutachterportfolio

Jahr 4: Praxisvertiefung
- HypZert F anstreben (Aufbauprüfung)
- Spezialisierung wählen (Wohn vs. Gewerbe)
- Netzwerk aufbauen (gif, IVD, RICS)

Jahr 5: IHK-Bestellung
- Antrag bei zuständiger IHK stellen
- Gutachtenportfolio (mind. 5 Gutachten) einreichen
- Prüfung ablegen & Vereidigung

**Kosten gesamt (Schätzung):**
- HypZert S Vorbereitung: 4.340€
- HypZert S Prüfung: 1.700€
- IHK-Bestellung: 500-1.500€
- Berufshaftpflicht: 1.200€/Jahr
    `,
    task: "Warum brauchen gerichtliche Gutachten zwingend einen ö.b.u.v. Sachverständigen? Was unterscheidet ihn von einem freien Gutachter?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Warum brauchen gerichtliche Gutachten zwingend einen ö.b.u.v. Sachverständigen? Was unterscheidet ihn von einem freien Gutachter?",
        hint: "ZPO §402: Gerichte beauftragen nur vereidete Sachverständige. Pflicht zur Übernahme des Auftrags."
      },
      {
        type: "case" as const,
        question: "Ein Anwalt fragt Sie ob Ihr Gutachten vor Gericht verwendet werden kann. Sie haben HypZert S aber keine IHK-Bestellung. Was antworten Sie?",
        hint: "HypZert S wird von vielen Gerichten akzeptiert, IHK-Bestellung ist aber der sicherere Weg."
      },
      {
        type: "research" as const,
        question: "Recherchieren Sie die genauen Anforderungen für die IHK-Bestellung in Berlin oder Ihrer Zielregion.",
        hint: "IHK Berlin: www.ihk-berlin.de/sachverstaendige — andere IHKs ähnlich strukturiert."
      }
    ],
    quiz: []
  },

  day_30: {
    title: "HypZert S Prüfungssimulation: Vollständiger Testdurchlauf",
    theory: "Komplette Prüfungssimulation unter realen Bedingungen. 5,75 Stunden — drei Prüfungsteile wie bei der echten HypZert S Prüfung. Heute beweisen Sie Ihre Prüfungsreife.",
    extendedTheory: `
### HypZert S Prüfungssimulation — Vollständiger Ablauf

**Prüfungsformat (original HypZert S):**

**Teil I: Wertermittlung (150 Minuten)**
Zwei wohnwirtschaftliche Objekte vollständig bewerten.

**Aufgabe 1a: ETW München-Schwabing**
- 3-Zimmer-ETW, 82m² WF, 4. OG, Baujahr 1972
- Modernisiert: Bad 2015, Fenster 2018
- Tiefgaragenstellplatz vorhanden
- Bodenrichtwert: 5.200 €/m²
- Grundstücksanteil laut Teilungserklärung: 85/1.000
- Vergleichspreise ETW Schwabing (Gutachterausschuss): 9.200-10.800 €/m²

→ Bewerten Sie im Vergleichswertverfahren

**Aufgabe 1b: EFH Nürnberg-Stein**
- Freistehendes EFH, 145m² WF
- Baujahr: 1985, Grundstück: 720m²
- Zustand: Gut, Heizung 2020 erneuert
- Bodenrichtwert: 450 €/m²
- NHK-Basis: 1.520 €/m² Brutto-Grundfläche (680m²)

→ Bewerten Sie im Sachwert- und Vergleichswertverfahren

---

**Teil II: Plausibilitätsprüfung (75 Minuten)**

Fehlerhafte Gutachtenauszüge analysieren und alle Fehler begründet benennen.

---

**Teil III: Einzelfragen (120 Minuten)**
Aus dem offiziellen HypZert Prüfstoffverzeichnis:
1. Was versteht man unter dem Liegenschaftszinssatz?
2. Welche Bewirtschaftungskosten sind nach ImmoWertV anzusetzen?
3. Erklären Sie das Nachhaltigkeitsprinzip beim Beleihungswert.
4. Was ist der Unterschied zwischen Instandhaltungskosten und -rücklage?
5. Wann ist das Ertragswertverfahren dem Sachwertverfahren vorzuziehen?
    `,
    law: [
      "[ImmoWertV 2021 komplett](https://www.gesetze-im-internet.de/immowertv_2021/) (Alle Verfahren)",
      "[BelWertV komplett](https://www.gesetze-im-internet.de/belwertv/) (Beleihungswert)",
      "[HypZert Prüfstoffverzeichnis](https://www.hypzert.de/) (Offizielles Prüfprogramm)"
    ],
    practice: `
### Bearbeitungsanleitung Prüfungssimulation

**Zeitmanagement:**
Teil I: 75 Minuten je Objekt
Teil II: 75 Minuten
Teil III: 120 Minuten (24 Minuten/Frage)

**Tipp für Teil I:**
1. Zuerst alle Unterlagen sichten (10 Min)
2. Verfahrenswahl begründen (5 Min)
3. Rechnung durchführen (50 Min)
4. Plausibilitätsprüfung der eigenen Rechnung (10 Min)

**Tipp für Teil II:**
Systematisch vorgehen:
☐ Formale Fehler zuerst
☐ Dann sachliche Fehler
☐ Dann Rechenfehler
☐ Jede Abweichung schriftlich begründen

**Bewertungsmaßstab HypZert:**
"Nachvollziehbar — Formal korrekt — Widerspruchsfrei"
    `,
    task: "Nach dem Testdurchlauf: In welchem Prüfungsteil fühlen Sie sich am unsichersten? Was ist Ihr konkreter Plan zur Verbesserung?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Nach dem Testdurchlauf: In welchem Prüfungsteil fühlen Sie sich am unsichersten? Was ist Ihr konkreter Plan zur Verbesserung?",
        hint: "Ehrliche Selbsteinschätzung ist der erste Schritt zur gezielten Prüfungsvorbereitung."
      },
      {
        type: "case" as const,
        question: "Sie stellen bei der Prüfung fest dass Ihnen ein Rechenschritt fehlt. Sollen Sie raten oder leer lassen?",
        hint: "Teilpunkte-System: Begründung des Ansatzes gibt Punkte auch wenn Endergebnis falsch. Niemals leer lassen!"
      },
      {
        type: "research" as const,
        question: "Melden Sie sich für die nächste HypZert S Prüfung an oder informieren Sie sich über den Anmeldeprozess.",
        hint: "Prüfungstermine: www.hypzert.de — Frühjahr und Herbst jedes Jahres. Frühzeitig anmelden!"
      }
    ],
    quiz: []
  }

};
