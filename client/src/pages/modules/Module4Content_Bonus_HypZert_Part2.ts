/**
 * MODUL 4 BONUS-PAKET PART 2 — Tag 31-40
 * HypZert S Prüfungsvorbereitung: Intensiv-Fallstudien & Abschluss
 */

export const contentDataModule4BonusPart2 = {

  day_31: {
    title: "Fallstudie: Wohnanlage mit Mietmix & Leerstand",
    theory: "Komplexe Ertragswertermittlung bei teilweisem Leerstand — ein klassisches HypZert S Prüfungsthema das tiefes Verständnis der Bewirtschaftungskosten und des Mietausfallwagnisses erfordert.",
    extendedTheory: `
### Fallstudie: Wohnanlage Leipzig-Gohlis

**Objekt:** 12-Wohneinheiten-Anlage, Baujahr 1955, saniert 2010
**Situation:** 2 Wohnungen seit 8 Monaten leer (17% Leerstand)

**Ertragswertermittlung mit Leerstand:**

SCHRITT 1: Differenzierung der Erträge
Vermietete Einheiten (10 WE, 680m²):
- Vertragsmiete: 7,40 €/m² → 60.384 €/J

Leerstehende Einheiten (2 WE, 130m²):
- Marktmiete: 8,20 €/m² → 12.792 €/J potenzial
- Leerstandsdauer absehbar: 6-12 Monate

SCHRITT 2: Ansatz der nachhaltigen Miete
Nachhaltig vermietbar: 90% × (680+130) × 8,20 × 12 = 71.928 €
Leerstandswagnis zusätzlich: 5% × 71.928 = 3.596 €

SCHRITT 3: Bewirtschaftungskosten (ImmoWertV §24)
Verwaltung: 400 € × 12 WE = 4.800 €
Instandhaltung: 14 €/m² × 810m² = 11.340 €  
Mietausfallwagnis: 3.596 €
Gesamt BWK: 19.736 €

SCHRITT 4: Reinertrag
71.928 - 19.736 = 52.192 €

Bodenwert (Leipzig, 420 €/m², 820m²): 344.400 €
LZ-Satz Leipzig MFH: 4,8%
RND: 42 Jahre
Vervielfältiger (4,8%, 42J): 18,44
Gebäudereinerttrag: 52.192 - (344.400 × 4,8%) = 35.680 €
Ertragswert: 35.680 × 18,44 + 344.400 = 1.001.779 €

**Verkehrswert: 1.002.000 € (gerundet)**
    `,
    law: [
      "[ImmoWertV §24](https://www.gesetze-im-internet.de/immowertv_2021/__24.html) (Bewirtschaftungskosten)",
      "[ImmoWertV §36](https://www.gesetze-im-internet.de/immowertv_2021/__36.html) (Liegenschaftszinssatz)",
      "[§ 558 BGB](https://www.gesetze-im-internet.de/bgb/__558.html) (Mietspiegel)",
      "[ImmoWertV §29](https://www.gesetze-im-internet.de/immowertv_2021/__29.html) (Mietausfallwagnis)"
    ],
    practice: `
### Ihre Aufgabe: Gleiche Anlage — andere Rahmenbedingungen

Berechnen Sie erneut den Verkehrswert, aber jetzt:
- Leerstand: 4 WE (33% statt 17%)
- Marktmiete gesunken auf 7,80 €/m²
- LZ-Satz gestiegen auf 5,2%

Welche Auswirkung hat das auf den Verkehrswert?
Begründen Sie jeden veränderten Ansatz.
    `,
    tasks: [
      {
        type: "reflection" as const,
        question: "Wie unterscheidet sich der Leerstandsansatz im Ertragswert von der tatsächlichen Leerstandssituation? Warum ist das HypZert-konform?",
        hint: "Nachhaltigkeitsprinzip: Kurzfristiger Leerstand ≠ dauerhafter Leerstand. Marktübliche Verhältnisse ansetzen."
      },
      {
        type: "case" as const,
        question: "Der Eigentümer argumentiert sein Leerstand sei nur vorübergehend und der Wert müsse höher sein. Wie antworten Sie gutachterlich korrekt?",
        hint: "Stichtagsprinzip: Bewertung zum Stichtag. Prognosen sind zu begründen aber nicht spekulativ."
      },
      {
        type: "research" as const,
        question: "Recherchieren Sie die aktuellen Leerstandsquoten für Mietwohnungen in Leipzig, Berlin und München für 2024/2025.",
        hint: "Empirica-Leerstandsindex oder Wohnungsmarktberichte der Städte — kostenlos online."
      }
    ],
    quiz: []
  },

  day_32: {
    title: "Digitale Bewertungstools: AVM & PropTech für Gutachter",
    theory: "Automated Valuation Models (AVM) und digitale Tools verändern die Gutachterbranche. HypZert-Gutachter müssen den Mehrwert und die Grenzen dieser Tools kennen.",
    extendedTheory: `
### Digitale Bewertungstools in der Praxis

**Was sind AVMs?**
Automated Valuation Models = algorithmusbasierte Wertermittlung
Nutzen: Machine Learning auf Basis von Kauffällen und Objektmerkmalen

**Führende AVM-Anbieter Deutschland:**
- **Sprengnetter AVM**: Marktführer, von Banken genutzt
- **PriceHubble**: KI-basiert, Zielgruppe Makler+Banken  
- **Immowelt/Immonet Schätzung**: Verbraucherorientiert
- **Empirica-Systeme**: Forschungsbasiert

**Wo AVMs gut funktionieren:**
✅ Standardobjekte (ETW, EFH) in gut dokumentierten Märkten
✅ Schnelle Ersteinschätzung für Banken
✅ Portfoliobewertungen (100+ Objekte)
✅ Plausibilitätsprüfung eigener Gutachten

**Wo AVMs versagen:**
❌ Sonderimmobilien (Hotels, Industrie, Denkmal)
❌ Dünne Datenlage (ländliche Gebiete)
❌ Objekte mit Sondereinflüssen
❌ Gerichtsverwertbare Gutachten

**HypZert-Position zu AVMs:**
"AVMs können als Hilfsmittel dienen, ersetzen aber das 
qualifizierte Sachverständigengutachten nicht."

**Neue Tools 2024/2025:**
- **RIWIS (BulwienGesa)**: Marktdaten Gewerbe
- **Guthmann Estate Tool**: Berlin-spezifisch
- **Akelius AI**: Portfoliobewertung institutionell
- **DomusQuant**: Risikomodellierung Banken
    `,
    law: [
      "[EBA-Leitlinien](https://www.eba.europa.eu/) (AVM-Anforderungen Banken, 2019)",
      "[CRR Art. 208](https://eur-lex.europa.eu/) (Immobiliensicherheiten Bankenaufsicht)",
      "[ImmoWertV §3](https://www.gesetze-im-internet.de/immowertv_2021/__3.html) (Qualitätsstandards Wertermittlung)"
    ],
    practice: `
### Vergleich: AVM vs. Sachverständigengutachten

Testen Sie für ein konkretes Objekt:
1. Schätzen Sie das Objekt mit einem kostenlosen Online-Tool
2. Führen Sie eine vereinfachte eigene Kalkulation durch
3. Vergleichen Sie die Ergebnisse

**Diskussionsfragen:**
- Warum weicht das AVM-Ergebnis ab?
- Welche Objektmerkmale kann das AVM nicht erfassen?
- Wann würde eine Bank trotzdem ein Gutachten verlangen?
    `,
    tasks: [
      {
        type: "reflection" as const,
        question: "In welchen Situationen würden Sie als Gutachter ein AVM-Ergebnis als Plausibilitätsprüfung nutzen?",
        hint: "Standard-ETW in Berlin: AVM gut. Denkmalgeschütztes MFH: AVM ungeeignet."
      },
      {
        type: "case" as const,
        question: "Eine Bank fragt ob ein AVM-Gutachten für einen 500.000€ Kredit ausreicht. Was empfehlen Sie?",
        hint: "EBA-Leitlinien: Über bestimmten Beträgen ist qualifiziertes Gutachten Pflicht. Hängt von Bank-Policy ab."
      },
      {
        type: "research" as const,
        question: "Testen Sie PriceHubble oder Sprengnetter online für eine konkrete Adresse und analysieren Sie die Ergebnis-Qualität.",
        hint: "Viele Anbieter haben kostenlose Testversionen. Vergleichen Sie mit Ihrem eigenen Marktwissen."
      }
    ],
    quiz: []
  },

  day_33: {
    title: "Haftung & Berufshaftpflicht: Risiken des Gutachters",
    theory: "Gutachter haften für Fehler — zivilrechtlich und strafrechtlich. Die Berufshaftpflichtversicherung ist Pflicht. Kenntnis der Haftungsrisiken schützt vor teuren Fehlern.",
    extendedTheory: `
### Haftungsrisiken für Immobiliengutachter

**Zivilrechtliche Haftung (§ 634a, §280 BGB)**

Ein Gutachter haftet wenn:
- Fehlerhafte Wertermittlung zu einem Schaden führt
- Wesentliche Informationen fehlen oder falsch sind
- Der Auftraggeber nachweislich geschädigt wurde

**Typische Schadensszenarien:**
1. Bank verleiht 800.000€, Wert war nur 600.000€
   → Schaden: 200.000€ bei Ausfall
2. Käufer zahlt zu viel wegen überhöhtem Gutachten
   → Schaden: Differenz
3. Erbauseinandersetzung mit falschem Gutachten
   → Schadensersatz an benachteiligte Erben

**Strafrechtliche Risiken:**
- §163 StGB: Fahrlässiger Falscheid (bei Vereidigung)
- §267 StGB: Urkundenfälschung (bei vorsätzlicher Manipulation)
- §826 BGB: Vorsätzliche sittenwidrige Schädigung

**Berufshaftpflichtversicherung:**

| Deckungssumme | Empfehlung | Für |
|---------------|-----------|-----|
| 500.000 €/Fall | Minimum | Kleingutachter |
| 2 Mio €/Fall | Standard | HypZert S/F |
| 5 Mio €/Fall | Empfohlen | Gewerbegutachter |

**Versicherer Immobiliengutachter:**
- Ecclesia Gruppe
- HDI Global
- Hiscox

**Deckungssumme berechnen:**
Faustregel: Mindestens das 3-fache des höchsten Einzelgutachtenwertes

**Schutz durch sorgfältige Arbeit:**
- Vollständige Quellenangaben
- Dokumentation aller Annahmen
- Auftragsklärung schriftlich
- Bewertungsstichtag klar definieren
- Haftungsausschlüsse klar formulieren
    `,
    law: [
      "[§ 634a BGB](https://www.gesetze-im-internet.de/bgb/__634a.html) (Verjährung Werkvertrag)",
      "[§ 280 BGB](https://www.gesetze-im-internet.de/bgb/__280.html) (Schadensersatz)",
      "[§ 163 StGB](https://www.gesetze-im-internet.de/stgb/__163.html) (Fahrlässiger Falscheid)",
      "[VVG §100](https://www.gesetze-im-internet.de/vvg/__100.html) (Haftpflichtversicherung)"
    ],
    practice: `
### Risikoanalyse: Typischer Gutachtenauftrag

**Auftrag:** Bank beauftragt Sie, EFH für 600.000€ Beleihung zu bewerten.

**Ihre Haftungsrisiken:**
1. Wenn Verkehrswert falsch → Beleihungswert falsch → Kredit zu hoch
2. Wenn Altlast übersehen → Wertminderung nicht erfasst
3. Wenn RND falsch → Ertragswert verzerrt

**Schutzmaßnahmen die Sie treffen:**
☐ Beauftragungsschreiben mit klarem Bewertungszweck
☐ Alle Quellen dokumentieren und datieren
☐ Altlasten-Hinweis im Gutachten (kein Bodengutachter)
☐ Haftungsausschluss für nicht sichtbare Mängel
☐ Berufshaftpflicht prüfen (Deckungssumme ausreichend?)
    `,
    tasks: [
      {
        type: "reflection" as const,
        question: "Welche 5 Maßnahmen können Sie sofort umsetzen um Ihr Haftungsrisiko als Gutachter zu minimieren?",
        hint: "Schriftliche Auftragsklärung, Quellenangaben, Haftungsausschlüsse, Versicherung, Vier-Augen-Prinzip."
      },
      {
        type: "case" as const,
        question: "Ein Gutachten aus 2022 wird 2026 angefochten. Sind Sie noch haftbar? Was sagt die Verjährungsfrist?",
        hint: "§634a BGB: 5 Jahre Verjährung bei Werkvertrag ab Abnahme. Bei Arglist: 10 Jahre."
      },
      {
        type: "research" as const,
        question: "Vergleichen Sie Angebote für Berufshaftpflicht von Ecclesia und HDI für einen Gutachter mit 500.000€ Jahresumsatz.",
        hint: "Ecclesia: www.ecclesia.de — Spezialist für freie Berufe und Sachverständige."
      }
    ],
    quiz: []
  },

  day_34: {
    title: "Übungsgutachten 3: Gewerbeimmobilie vollständig bewerten",
    theory: "Praxistag: Vollständiges Ertragswertgutachten für eine Gewerbeimmobilie — anspruchsvollster Teil der HypZert S Prüfung. Mietvertragsanalyse und DCF-Verfahren kombiniert.",
    extendedTheory: `
### Übungsgutachten: Bürogebäude Frankfurt-Sachsenhausen

**Auftrag:** Verkehrswertermittlung zum 01.03.2026 für Beleihungszwecke

**Objektdaten:**
- Bürogebäude, Baujahr 2005, 5 Stockwerke
- Mietfläche: 3.200m² (gif MF/G)
- Grundstück: 1.100m²
- Zustand: Gut (technische Anlagen 2021 erneuert)
- Tiefgarage: 32 Stellplätze

**Mietvertragsanalyse:**
Mieter A (IT-Unternehmen): 2.100m², 21,50 €/m², Restlaufzeit 4 Jahre
Mieter B (Anwaltskanzlei): 800m², 24,00 €/m², Restlaufzeit 9 Jahre
Leerstand: 300m² (9,4%)
Stellplätze: 32 × 120 €/Monat = 46.080 €/J

**Marktmiete Frankfurt Sachsenhausen:** 22,00-26,00 €/m²
Nachhaltige Marktmiete (Gutachterausschuss 2025): 23,50 €/m²

---

**Ertragswertberechnung:**

Nachhaltiger Jahresrohertrag:
3.200m² × 23,50 × 12 = 902.400 €
Stellplätze (nachhaltig 90%): 41.472 €
Gesamt Rohertrag: 943.872 €

Bewirtschaftungskosten Büro:
Verwaltung: 3% × 943.872 = 28.316 €
Instandhaltung: 18 €/m² × 3.200 = 57.600 €
Mietausfallwagnis: 5% × 943.872 = 47.194 €
Gesamt BWK: 133.110 € (14,1%)

Jahresreinertrag: 810.762 €

Bodenwert (Frankfurt Sachsenhausen, 4.200 €/m²):
1.100 × 4.200 = 4.620.000 €

Liegenschaftszinssatz (Büro Frankfurt): 4,2%
Bodenwertverzinsung: 4.620.000 × 4,2% = 194.040 €
Gebäudereinerttrag: 616.722 €

RND: 54 Jahre (2005 + Modernisierung 2021: +5J)
Vervielfältiger (4,2%, 54J): 21,55
Gebäudeertragswert: 13.290.359 €

Ertragswert: 13.290.359 + 4.620.000 = 17.910.359 €

Marktanpassung (-2% wegen Leerstand und Mietvertragsrisiko):
**Verkehrswert: 17.550.000 € (gerundet)**

Beleihungswert (80% × 17.550.000): 14.040.000 €
    `,
    law: [
      "[gif-Richtlinie MF/G](https://www.gif-ev.de/) (Mietflächen Gewerbe)",
      "[ImmoWertV §27-36](https://www.gesetze-im-internet.de/immowertv_2021/) (Ertragswert Gewerbe)",
      "[§ 578 BGB](https://www.gesetze-im-internet.de/bgb/__578.html) (Gewerbemietvertrag)",
      "[PfandbriefG §16](https://www.gesetze-im-internet.de/pfandbriefg/__16.html) (Beleihungswert)"
    ],
    practice: `
### Sensitivitätsanalyse: Was wenn...?

Berechnen Sie den Verkehrswert unter folgenden Szenarien:
1. Leerstand steigt auf 20% (Mieter A kündigt)
2. Marktmiete fällt auf 20 €/m²
3. Liegenschaftszinssatz steigt auf 5,0%

Tabellieren Sie die Ergebnisse:
Szenario | Reinertrag | LZ-Satz | Ertragswert | Δ zur Basis
---------|-----------|---------|-------------|----------
Basis    | 810.762   | 4,2%    | 17.550.000  | -
S1 (...)  | ?         | 4,2%    | ?           | ?
    `,
    tasks: [
      {
        type: "reflection" as const,
        question: "Warum ist die Sensitivitätsanalyse für Gewerbeimmobilien besonders wichtig?",
        hint: "Höheres Leerstandsrisiko, längere Vermarktungszeiten, stärkere Konjunkturabhängigkeit als Wohnen."
      },
      {
        type: "case" as const,
        question: "Mieter A (IT-Unternehmen, 2.100m²) signalisiert er könnte nach Mietvertragsende ausziehen. Wie beeinflusst das Ihren Wertansatz?",
        hint: "Erhöhtes Mietausfallwagnis, niedrigere Gewichtung der Vertragsmiete, Leerstandspuffer einrechnen."
      },
      {
        type: "research" as const,
        question: "Recherchieren Sie aktuelle Leerstandsquoten für Büroflächen in Frankfurt, München und Berlin (2024/2025).",
        hint: "JLL, CBRE oder Colliers Marktberichte — meist kostenlos downloadbar mit Registrierung."
      }
    ],
    quiz: []
  },

  day_35: {
    title: "Repetitorium: Alle Wertermittlungsverfahren kompakt",
    theory: "Zusammenfassung aller drei Wertermittlungsverfahren für die HypZert S Prüfung — Vergleich, Anwendungsfälle und typische Prüfungsfragen in kompakter Form.",
    extendedTheory: `
### Die drei Verfahren im direkten Vergleich

**1. VERGLEICHSWERTVERFAHREN (ImmoWertV §§15-19)**

Wann anwenden?
✅ ETW und EFH mit guter Datenlage
✅ Unbebaute Grundstücke
✅ Standardisierte Objekte

Formel:
Vergleichswert = Vergleichspreise × Anpassungsfaktoren

Anpassungsfaktoren für:
- Lage (Bodenrichtwert-Verhältnis)
- Zustand (Modernisierungsgrad)
- Fläche (Größenabweichungen)
- Baujahr (Altersdifferenz)

**Typische Prüfungsfehler:**
- Zu wenige Vergleichsobjekte (<3)
- Veraltete Kauffälle (>3 Jahre)
- Keine Anpassung für Unterschiede

---

**2. ERTRAGSWERTVERFAHREN (ImmoWertV §§20-36)**

Wann anwenden?
✅ MFH, vermietete Objekte
✅ Gewerbeimmobilien
✅ Alle renditefokussierten Objekte

Formel:
Ertragswert = Gebäudeertragswert + Bodenwert
Gebäudeertragswert = Gebäudereinerttrag × Vervielfältiger
Gebäudereinerttrag = Reinertrag - Bodenwertverzinsung
Reinertrag = Rohertrag - Bewirtschaftungskosten

**Typische Prüfungsfehler:**
- Vertragsmiete statt Marktmiete
- BWK zu niedrig angesetzt
- Falscher LZ-Satz

---

**3. SACHWERTVERFAHREN (ImmoWertV §§37-46)**

Wann anwenden?
✅ EFH, Villen (eigengenutzt)
✅ Industrie, Sonderimmobilien
✅ Wenn Ertragsverfahren nicht möglich

Formel:
Sachwert = Bodenwert + Gebäudesachwert + Außenanlagen
Gebäudesachwert = Herstellungswert × (1 - AWM) × Marktanpassung

**Typische Prüfungsfehler:**
- Falscher NHK-Wert
- Alterswertminderung falsch berechnet
- Sachwertfaktor vergessen

---

**Verfahrenswahl in der Praxis:**

| Objekt | Primär | Sekundär |
|--------|--------|---------|
| ETW Standardlage | Vergleich | Sachwert |
| EFH eigengenutzt | Sachwert+Vergleich | - |
| MFH vermietet | Ertrag | Sachwert |
| Bürogebäude | Ertrag | DCF |
| Industriehalle | Sachwert | Ertrag |
    `,
    law: [
      "[ImmoWertV §15-19](https://www.gesetze-im-internet.de/immowertv_2021/) (Vergleichswertverfahren)",
      "[ImmoWertV §20-36](https://www.gesetze-im-internet.de/immowertv_2021/) (Ertragswertverfahren)",
      "[ImmoWertV §37-46](https://www.gesetze-im-internet.de/immowertv_2021/) (Sachwertverfahren)",
      "[ImmoWertV §3](https://www.gesetze-im-internet.de/immowertv_2021/__3.html) (Verfahrenswahl)"
    ],
    practice: `
### Schnell-Quiz: Welches Verfahren?

Nennen Sie für jedes Objekt das primäre Verfahren und begründen Sie:
1. Eigentumswohnung, 85m², Berlin-Mitte, gut vermietet
2. Freistehende Villa, 300m², eigengenutzt, Sylt
3. Logistikzentrum, 15.000m², vollvermietet, 10J Vertrag
4. Unbebautes Baugrundstück, 500m², Frankfurt
5. Altenheim, 60 Zimmer, Spezialimmobilie
6. Reihenhaus, Baujahr 2019, eigengenutzt
7. Supermarkt, 1.200m², Ankermieter 15J Restlaufzeit
    `,
    tasks: [
      {
        type: "reflection" as const,
        question: "Bei einem MFH führen Sie Ertrags- und Sachwertverfahren durch. Ertrag: 1.200.000€, Sachwert: 950.000€. Wie gewichten Sie?",
        hint: "Ertragswert dominiert bei vermieteten Objekten. Sachwert als Plausibilität mit 20-30% Gewichtung."
      },
      {
        type: "case" as const,
        question: "Ein freistehend genutztes Einfamilienhaus soll bewertet werden. Es gibt nur 2 Vergleichsverkäufe in den letzten 3 Jahren. Was tun?",
        hint: "Bei dünner Vergleichsmarktlage: Sachwertverfahren als Primärverfahren, Vergleich als Plausibilität."
      },
      {
        type: "research" as const,
        question: "Laden Sie das aktuelle Prüfstoffverzeichnis von HypZert herunter und identifizieren Sie die Themenschwerpunkte für Teil III.",
        hint: "www.hypzert.de — Prüfstoffverzeichnis im Download-Bereich."
      }
    ],
    quiz: []
  },

  day_36: {
    title: "Praktische Objektaufnahme: Checkliste & Protokoll",
    theory: "Die Objektbesichtigung ist die Basis jedes Gutachtens. Eine systematische Aufnahme verhindert Fehler im Gutachten und schützt vor Haftungsrisiken.",
    extendedTheory: `
### Professionelle Objektaufnahme

**Vorbereitung vor der Besichtigung:**
- Grundbuchauszug studieren
- Baulast prüfen
- Flurkarte/Luftbild ansehen
- Energieausweis anfordern
- Mietverträge sichten (falls vorhanden)

**Besichtigungsprotokolle — was dokumentieren:**

ÄUSSERES:
□ Lage und Erschließung fotografieren
□ Grundstücksgrenzen kontrollieren
□ Fassadenzustand dokumentieren
□ Dach (soweit einsehbar)
□ Garage/Stellplätze

INNERES (je Raum):
□ Raumgröße (Maßband/Laser)
□ Zustand Böden/Wände/Decken
□ Fenster (Einfach/Doppel/3-fach)
□ Heizung (Art, Baujahr, Zustand)
□ Sanitär (Baujahr, Zustand)
□ Elektrik (Sicherungskasten, Alter)
□ Keller (Trocken/Feucht, Nutzung)

MÄNGEL DOKUMENTIEREN:
Schimmel → Ursache einschätzen
Risse → strukturell oder kosmetisch?
Feuchtigkeit → Keller/Außenwände
Schäden → Dach, Putz, Drainage

**Fotodokumentation (Mindeststandard HypZert):**
- Außenansichten (alle 4 Seiten)
- Straßenansicht mit Umgebung
- Alle Innenräume
- Alle Mängel im Detail
- Heizungsanlage mit Typenschild
- Energieausweis fotografieren
    `,
    law: [
      "[ImmoWertV §6](https://www.gesetze-im-internet.de/immowertv_2021/__6.html) (Grundstücksmerkmale)",
      "[GEG §80](https://www.gesetze-im-internet.de/geg/__80.html) (Energieausweis-Pflicht)",
      "[WoFlV](https://www.gesetze-im-internet.de/woflv/) (Wohnflächenberechnung)",
      "[DIN 277](https://www.din.de/) (Grundflächen und Rauminhalte)"
    ],
    practice: `
### Übungsaufgabe: Besichtigungsprotokoll erstellen

Erstellen Sie ein professionelles Besichtigungsprotokoll für:
- Baujahr 1968, 3-Zimmer-Wohnung, 72m²
- Zustand: Teilsaniert (Bad 2010, Küche original)
- Parkett: Original, stark abgenutzt
- Fenster: Kunststoff, 2008 eingebaut
- Heizung: Fernwärme, Heizkörper 1990
- Keller: Feuchtflecken an einer Wand

Formulieren Sie für jeden Punkt:
1. Befund (was Sie sehen)
2. Bewertung (gut/mittel/schlecht/mangelhaft)
3. Wertrelevanz (welchen Einfluss hat das auf den Wert?)
    `,
    tasks: [
      {
        type: "reflection" as const,
        question: "Welche Mängel müssen Sie zwingend im Gutachten erwähnen auch wenn Sie kein Bausachverständiger sind?",
        hint: "Sichtbare Mängel: Schimmel, Risse, Feuchte müssen erwähnt werden. Hinweis auf Fachgutachter."
      },
      {
        type: "case" as const,
        question: "Bei der Besichtigung stellen Sie Schimmel im Schlafzimmer fest. Der Eigentümer sagt 'ist schon weg'. Was tun Sie?",
        hint: "Im Gutachten dokumentieren und auf mögliche Folgeschäden hinweisen. Fachgutachter empfehlen."
      },
      {
        type: "research" as const,
        question: "Laden Sie eine Muster-Besichtigungscheckliste von einem Berufsverband (IVD, gif, RICS) herunter.",
        hint: "IVD: www.ivd.net — Mitglieder-Downloads. gif: www.gif-ev.de — Musterdokumente."
      }
    ],
    quiz: []
  },

  day_37: {
    title: "Spezialimmobilien: Hotels, Pflegeheime, Parkhäuser",
    theory: "Spezialimmobilien erfordern besondere Bewertungskenntnisse. Der Betreiberwert und die Drittverwendbarkeit sind entscheidende Faktoren — HypZert F Thema aber auch HypZert S relevant.",
    extendedTheory: `
### Spezialimmobilien-Bewertung

**Merkmal Spezialimmobilie:**
Objekte die primär durch einen Betreiber genutzt werden und 
deren Wert stark vom Betriebserfolg abhängt.

**1. Hotels**

Bewertungsbesonderheit: Pacht + Betreiberwert

Pächterische Rentabilität (RevPAR = Revenue per Available Room):
RevPAR = Belegung% × Durchschnittspreis/Zimmer

Bewertungsverfahren Hotels:
- Ertragswert auf Basis nachhaltigem Pachtansatz
- DCF-Verfahren für größere Hotels
- Betreiberwert vs. Immobilienwert trennen

Liegenschaftszinssätze Hotels: 5,5-8,5%
(deutlich höher als Wohn wegen Managementintensität)

**2. Pflegeheime & Seniorenresidenzen**

Nachfragetreiber: Demographischer Wandel
Bundesweit fehlen 2030 geschätzt 400.000 Pflegeplätze

Bewertung:
- Nachhaltige Pacht als Basis (§ 26 HeimMindBauV)
- Konzessionsgebundene Nutzung beachten
- Betreiber-Bonität entscheidend (50-80% des Wertes)
LZ-Sätze: 5,0-7,0%

**3. Parkhäuser**

Besonderheit: Betreiberwert fast = Immobilienwert
Standdauer sehr lang, aber technisch intensiv

Bewertung über Stellplatz-Jahreserträge:
Innenstadtlage: 2.000-4.000 €/Stellplatz/Jahr
Peripherie: 800-1.500 €/Stellplatz/Jahr

**4. DCF-Verfahren für Spezialimmobilien:**

Schritt 1: Cashflow-Prognose 10 Jahre
Schritt 2: Restwert (Exit-Yield × Jahresreinertrag Jahr 10)
Schritt 3: Diskontierung mit WACC
Schritt 4: Summierung = Verkehrswert
    `,
    law: [
      "[HeimMindBauV](https://www.gesetze-im-internet.de/heimmindbauvou/) (Mindestanforderungen Heime)",
      "[SGB XI §72](https://www.gesetze-im-internet.de/sgb_11/__72.html) (Zulassung Pflegeeinrichtungen)",
      "[gif-Richtlinie](https://www.gif-ev.de/) (Hotelbewertung)",
      "[ImmoWertV §3](https://www.gesetze-im-internet.de/immowertv_2021/__3.html) (Besondere Immobilienarten)"
    ],
    practice: `
### Fallstudie: Stadthotel Leipzig

**Daten:**
- 3-Sterne-Hotel, 85 Zimmer, Baujahr 1995
- Belegung: 68%, Durchschnittspreis: 89 €/Zimmer
- Jahresumsatz: 1.880.000 €
- EBITDA-Marge Hotel: 22%
- Nachhaltige Pacht: 6,5% vom Umsatz
- Grundstück: 1.800m², Bodenwert: 680 €/m²
- LZ-Satz Hotel: 6,8%, RND: 35 Jahre

**Aufgabe:**
1. Berechnen Sie die nachhaltige Jahrespacht
2. Ermitteln Sie den Verkehrswert
3. Begründen Sie den LZ-Satz
    `,
    tasks: [
      {
        type: "reflection" as const,
        question: "Warum sind Liegenschaftszinssätze bei Hotels und Pflegeheimen deutlich höher als bei Wohnimmobilien?",
        hint: "Höheres Risiko: Betreiberabhängigkeit, Konzessionsbindung, Management-Intensität, Drittverwendbarkeit."
      },
      {
        type: "case" as const,
        question: "Ein Pflegeheimträger ist insolvent. Wie beeinflusst das den Wert der Immobilie?",
        hint: "Erheblicher Wertverlust möglich: Neuer Betreiber braucht Konzession, Umbaukosten, Anlaufverluste."
      },
      {
        type: "research" as const,
        question: "Recherchieren Sie aktuelle Investmentmärkte für Pflegeheime und Hotels in Deutschland (Transaktionsvolumen, Renditen 2024).",
        hint: "CBRE, JLL, Savills publizieren kostenlose Marktberichte — Segment Healthcare Real Estate."
      }
    ],
    quiz: []
  },

  day_38: {
    title: "Vollständige Prüfungssimulation Teil II & III",
    theory: "Intensivübung: Plausibilitätsprüfung eines komplett fehlerhaften Gutachtens + kompletter Einzelfragen-Katalog wie bei der echten HypZert S Prüfung Teil II und III.",
    extendedTheory: `
### Prüfungssimulation Teil II: Fehlerhaftes Gutachten

**Objekt:** Reihenmittelhaus, Hannover-Linden, Baujahr 1978

**FEHLERHAFTER GUTACHTEN-AUSZUG:**

Wohnfläche: 118m² (lt. Mietvertrag) — Grundriss zeigt 108m²!
Baujahr: 1978, GND: 80 Jahre → Alter: 48 Jahre → RND: 32 Jahre
Gutachter schreibt: RND = 40 Jahre ← FEHLER

Bodenrichtwert: 380 €/m² (Quelle: Gutachterausschuss 2021) ← VERALTET
Grundstück: 285m²
Bodenwert: 285 × 380 = 108.300 € 

NHK 2010: 1.320 €/m² BRI
BRI = 118m² × 2,9 = 342,2 m³ ← sollte 108m² Wfl. sein
Gebäudeherstellungskosten: 342,2 × 1.320 = 451.704 € 

Baupreisindex 2024 (2010=100): 158,4
Aktueller Herstellungswert: 451.704 × 1,584 = 715.499 €

AWM: 48/80 = 60%
Gebäudesachwert: 715.499 × (1-0,60) = 286.200 €

Außenanlagen: 15.000 €
Vorläufiger Sachwert: 108.300 + 286.200 + 15.000 = 409.500 €
Sachwertfaktor (Hannover, 400T€ Klasse): 1,15
Sachwert: 409.500 × 1,15 = 470.925 €

Vergleichspreise: 3.200 €/m² × 118m² = 377.600 €

Verkehrswert: 424.000 € (gerundet)

---

**IHRE AUFGABE: Benennen Sie alle Fehler**

Mindestens 6 Fehler sind enthalten.
    `,
    law: [
      "[ImmoWertV 2021 komplett](https://www.gesetze-im-internet.de/immowertv_2021/) (Prüfungsgrundlage)",
      "[WoFlV](https://www.gesetze-im-internet.de/woflv/) (Wohnflächendefinition)",
      "[NHK 2010](https://www.iwb-online.de/) (Normalherstellungskosten)"
    ],
    practice: `
### Fehler-Auflösung (nach eigenem Versuch anschauen!)

**Fehler 1:** Wohnfläche 118m² (Mietvertrag) vs. 108m² (Grundriss) → Grundriss ist maßgeblich!
**Fehler 2:** RND = 40 Jahre, aber rechnerisch: 80-48 = 32 Jahre → RND muss 32 Jahre sein
**Fehler 3:** Bodenrichtwert 2021 → veraltet, aktueller Wert zu nutzen (2024/2025)
**Fehler 4:** BRI-Berechnung mit 118m² statt korrekter 108m² Wohnfläche → Herstellungswert zu hoch
**Fehler 5:** Sachwertfaktor: 409.500 ist Vorläufiger Sachwert, aber bei 470T€ Klasse könnte anderer Faktor gelten
**Fehler 6:** Vergleichswert: 3.200 × 118m² statt 108m² → 345.600 € wären korrekt
**Fehler 7:** Gewichtung: Keine Begründung der Gewichtung Sach- zu Vergleichswert
    `,
    tasks: [
      {
        type: "reflection" as const,
        question: "Wie gehen Sie in der echten Prüfung systematisch vor damit Sie keinen Fehler übersehen?",
        hint: "Checkliste: Formal → Flächenangaben → Quellenaktualität → Rechenschritte → Zwischensummen."
      },
      {
        type: "case" as const,
        question: "Sie haben in Teil II nur 4 von 6 Fehlern gefunden. Was kostet Sie das an Punkten und wie kompensieren Sie in Teil III?",
        hint: "HypZert bewertet Qualität der Begründung — 4 gut begründete Fehler können 6 unbegründete überwiegen."
      },
      {
        type: "research" as const,
        question: "Suchen Sie 3 reale Beispiele für BGH-Urteile zu fehlerhaften Immobiliengutachten und analysieren Sie die Fehlerursachen.",
        hint: "BGH-Datenbank: www.bundesgerichtshof.de — Suchbegriff 'Immobiliengutachten Haftung'."
      }
    ],
    quiz: []
  },

  day_39: {
    title: "Karrierewege & Netzwerke: Berufsverbände & Zertifizierungen",
    theory: "Professionelle Netzwerke sind für Gutachter entscheidend. Die wichtigsten Berufsverbände, Zertifizierungsstellen und Karrierepfade im deutschen Gutachterwesen.",
    extendedTheory: `
### Berufsverbände & Netzwerke für Gutachter

**1. gif e.V. — Gesellschaft für Immobilienwirtschaftliche Forschung**
Website: www.gif-ev.de
Mitgliedschaft: Ab 150 €/Jahr
Was Sie bekommen:
- gif-Richtlinien (Mietflächen, Bewertung)
- Forschungsberichte
- Netzwerk Fachexperten
- gif-Zertifizierung möglich

**2. IVD — Immobilienverband Deutschland**
Website: www.ivd.net
Mitgliedschaft: Ab 500 €/Jahr
Was Sie bekommen:
- Berufsrechtliche Beratung
- Musterverträge
- Weiterbildungsangebote
- Verband für §34c Inhaber

**3. RICS — Royal Institution of Chartered Surveyors**
Website: www.rics.org
Mitgliedschaft: Nach Prüfung
Stufen: AssocRICS → MRICS → FRICS
International anerkannt, Präsenz in 150 Ländern
Aufnahmegebühr: Ca. 500 €, Jahresbeitrag: Ca. 800 €

**4. HypZert GmbH**
Website: www.hypzert.de
Keine Mitgliedschaft — Zertifizierungsstelle
Zertifikate: HypZert S, HypZert F, HypZert MLV

**5. DIA — Deutsche Immobilien Akademie**
Website: www.dia.de
Ausbildungsträger für Sachverständige
Diplom-Sachverständiger DIA → international anerkannt

**6. vdpPfandbriefAkademie**
Website: www.vdppfandbriefakademie.de
Spezialist für bankbezogene Gutachter
Kooperation mit Frankfurt School

**Karrierestufen-Übersicht:**
Freier Gutachter → HypZert S → HypZert F/ö.b.u.v. → MRICS/FRICS
    `,
    law: [
      "[§ 36 GewO](https://www.gesetze-im-internet.de/gewo/__36.html) (IHK-Bestellung)",
      "[gif-Richtlinien](https://www.gif-ev.de/) (Branchenstandards)",
      "[RICS Standards](https://www.rics.org/) (Internationale Standards)",
      "[DIN ISO/IEC 17024](https://www.din.de/) (Akkreditierungsstandard HypZert)"
    ],
    practice: `
### Ihr persönlicher Netzwerk-Aktionsplan

**Sofort (diese Woche):**
☐ LinkedIn-Profil mit Qualifikationen aktualisieren
☐ HypZert-Website besuchen, Prüfungsanforderungen studieren
☐ Lokalen Gutachterausschuss recherchieren

**Kurzfristig (3 Monate):**
☐ gif e.V. Mitgliedschaft beantragen
☐ IVD-Netzwerkveranstaltung besuchen
☐ 1-2 erfahrene Gutachter für Mentoring anfragen

**Mittelfristig (1 Jahr):**
☐ HypZert S Prüfung anmelden
☐ RICS Associate Membership prüfen
☐ Erste selbständige Gutachten erstellen

**Langfristig (3-5 Jahre):**
☐ HypZert F oder IHK-Bestellung anstreben
☐ Spezialisierung festlegen
☐ Eigenes Gutachterbüro oder Partnerschaft
    `,
    tasks: [
      {
        type: "reflection" as const,
        question: "Welcher Berufsverband passt am besten zu Ihrer geplanten Spezialisierung und warum?",
        hint: "Wohnimmobilien → IVD/HypZert S. Gewerbe/Banken → HypZert F/RICS. Wissenschaft → gif."
      },
      {
        type: "case" as const,
        question: "Ein Auftraggeber fragt nach Ihren Qualifikationsnachweisen. Sie haben nur das Immobilien-Akademie-Zertifikat. Was ist Ihr nächster Schritt?",
        hint: "HypZert S als nächstes Ziel. Bis dahin: Zusammenarbeit mit ö.b.u.v. als Assistent."
      },
      {
        type: "research" as const,
        question: "Recherchieren Sie die nächsten Netzwerkveranstaltungen von gif oder IVD in Ihrer Region für 2026.",
        hint: "gif: www.gif-ev.de/veranstaltungen. IVD: www.ivd.net/termine."
      }
    ],
    quiz: []
  },

  day_40: {
    title: "Bonus-Paket Abschluss: Ihr Weg zum anerkannten Gutachter",
    theory: "Abschlusstag des HypZert S Bonus-Pakets. Zusammenfassung aller 20 Intensivtage, persönlicher Aktionsplan und konkrete nächste Schritte zur Zertifizierung.",
    extendedTheory: `
### Was Sie in diesem Bonus-Paket gelernt haben

**Woche 1 (Tag 21-25): Grundlagen & Übungsgutachten**
✅ Gutachten-Struktur nach HypZert S Standard
✅ Beleihungswert vs. Verkehrswert
✅ Plausibilitätsprüfung systematisch
✅ Gewerbeimmobilien bewerten
✅ Vollständiges EFH-Gutachten

**Woche 2 (Tag 26-30): Sondereinflüsse & Vertiefung**
✅ Sondereinflüsse (Baulast, Altlasten, Denkmal)
✅ Profi-Standortanalyse
✅ MFH-Gutachten vollständig
✅ IHK-Bestellung & Karrierewege
✅ Vollständige Prüfungssimulation Teil I

**Woche 3 (Tag 31-35): Fortgeschrittene Themen**
✅ Leerstand & komplexe Ertragswerte
✅ AVMs & digitale Tools
✅ Haftung & Versicherung
✅ Gewerbegutachten vollständig
✅ Repetitorium alle 3 Verfahren

**Woche 4 (Tag 36-40): Praxis & Abschluss**
✅ Objektaufnahme professionell
✅ Spezialimmobilien (Hotels, Heime)
✅ Prüfungssimulation Teil II & III
✅ Berufsverbände & Netzwerke
✅ Persönlicher Aktionsplan

---

### Ihr nächster Schritt: HypZert S Anmeldung

**Voraussetzungen prüfen:**
☐ Hochschulabschluss vorhanden?
☐ Mind. 3 Jahre Berufserfahrung in Immobilienbewertung?
☐ Mindestens 3 eigenständige Gutachten erstellt?

**Wenn ja — sofort handeln:**
1. Antrag stellen: www.hypzert.de
2. Unterlagen zusammenstellen (Gutachten, Lebenslauf, Abschlüsse)
3. Prüfungsgebühr 1.700€ einplanen
4. Prüfungstermin: Frühjahr oder Herbst

**Wenn noch nicht:**
1. Zusammenarbeit mit erfahrenem Gutachter suchen
2. Erste Gutachten unter Aufsicht erstellen
3. Berufserfahrung dokumentieren
4. In 1-2 Jahren erneut prüfen

**Kosten-Nutzen-Rechnung HypZert S:**
Kosten: 4.340 + 1.700 + 500 (Versicherung) = 6.540 €
Ertrag: Gutachter-Honorar 1.500-5.000 € pro Gutachten
Break-Even: 2-5 Gutachten

**Das Investment lohnt sich!**
    `,
    law: [
      "[HypZert S Anforderungen](https://www.hypzert.de/de/zertifizierung/angebotsuebersicht/hypzert-s) (Offizielle Voraussetzungen)",
      "[§ 194 BauGB](https://www.gesetze-im-internet.de/baugb/__194.html) (Verkehrswert — Basis aller Gutachten)",
      "[ImmoWertV 2021](https://www.gesetze-im-internet.de/immowertv_2021/) (Wertermittlungsverordnung)"
    ],
    practice: `
### Ihr persönlicher 5-Jahres-Aktionsplan

Erstellen Sie Ihren individuellen Plan mit konkreten Meilensteinen:

**Quartal 1 2026:**
- Erstes eigenständiges Gutachten erstellen
- gif-Mitgliedschaft beantragen
- Grundstücksmarktbericht Zielregion kaufen

**Quartal 2 2026:**
- Zweites Gutachten (andere Objektart)
- HypZert-Infoveranstaltung besuchen
- Mentor suchen (erfahrener Gutachter)

**Quartal 3-4 2026:**
- Drittes Gutachten fertigstellen
- Berufshaftpflicht abschließen
- HypZert S Antrag vorbereiten

**2027:**
- HypZert S Prüfung ablegen
- Erstes Bankengutachten
- Preisliste für eigene Gutachten erstellen

**2028-2030:**
- Portfolio aufbauen (20+ Gutachten)
- HypZert F oder IHK-Bestellung anstreben
- Spezialisierung festigen
    `,
    tasks: [
      {
        type: "reflection" as const,
        question: "Was waren Ihre 3 größten Erkenntnisse aus diesem Bonus-Paket? Wie verändern sie Ihre berufliche Perspektive?",
        hint: "Denken Sie an konkrete Handlungen die Sie jetzt anders angehen werden."
      },
      {
        type: "case" as const,
        question: "Sie haben alle 40 Tage des Bonus-Pakets abgeschlossen. Sind Sie jetzt bereit für die HypZert S Prüfung?",
        hint: "Theorie ja — aber Praxisgutachten sind Pflichtvoraussetzung. Theorie + Praxis = Prüfungsreife."
      },
      {
        type: "research" as const,
        question: "Registrieren Sie sich auf www.hypzert.de für Newsletter und informieren Sie sich über den nächsten Prüfungstermin 2026.",
        hint: "Prüfungen finden typischerweise im Frühjahr (April/Mai) und Herbst (September/Oktober) statt."
      }
    ],
    quiz: []
  }

};
