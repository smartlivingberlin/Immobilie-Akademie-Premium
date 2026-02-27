// Maximalist Content for Module 2 (Makler §34c) - Part 2 (Days 21-40)
// Focus: Bewertung, Einkauf, Maklervertrag & Marketing

export const contentDataPart2Maximal: Record<string, {
  title: string;
  theory: string;
  law: string[];
  practice: string;
  task: string;
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
    theory: "Das genaueste Verfahren, wenn es Vergleichsobjekte gibt.",
    extendedTheory: `
### Funktionsweise
Man nimmt Kaufpreise von ähnlichen Objekten (aus der Kaufpreissammlung) und passt sie an.

**Anpassungsfaktoren (Umrechnungskoeffizienten):**
*   **Lage:** +10% für Bestlage.
*   **Größe:** Kleine Wohnungen sind pro qm teurer als große!
*   **Alter:** Abschläge für Baujahr.
*   **Ausstattung:** Aufschläge für Lift, Balkon.

**Formel:**
Vergleichspreis/qm x Fläche x Anpassungsfaktoren = Verkehrswert.

**Problem:**
Bei individuellen Architektenhäusern gibt es keine Vergleichsobjekte. -> Sachwertverfahren nutzen.
    `,
    law: ["ImmoWertV § 15"],
    practice: "Bewerten Sie eine ETW. Vergleichsobjekt A: 3000€/qm (bessere Lage). Vergleichsobjekt B: 2500€/qm (schlechtere Lage). Wo liegt Ihr Objekt?",
    caseStudy: `
**Fall: Die Penthouse-Wohnung**
Es gibt keine vergleichbaren Penthouses im Viertel.
**Lösung:** Indirekter Vergleich (Vergleich mit anderen Stadtteilen + Lagezuschlag) oder Sachwertverfahren (Baukosten).
    `,
    task: "Berechnen Sie: 80qm Wohnung. Vergleichspreis 3.000 €. Lagezuschlag 5%. Abschlag Bad (alt) 10.000 €.",
    solution: `
80 * 3.000 = 240.000 €.
+ 5% Lage = 12.000 €.
- 10.000 € Zustand.
**Ergebnis:** 242.000 €.
    `,
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
    caseStudy: `
**Fall: Die Miete ist zu niedrig**
MFH, Miete 5€/qm. Markt 10€/qm.
**Bewertung:** Man darf mit der *marktüblichen* Miete rechnen, wenn eine Erhöhung rechtlich möglich ist. Sonst Abschläge ("Over-Rented" vs "Under-Rented").
    `,
    task: "Einfache Maklerformel (Vervielfältiger): Jahresmiete 50.000 €. Faktor 20. Wert?",
    solution: `
50.000 * 20 = 1.000.000 €.
(Entspricht 5% Bruttorendite. 100 / 20 = 5).
    `,
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
