// Maximalist Content for Module 2 (Makler §34c) - Part 1 (Days 1-20)
// Focus: Rechtliche Grundlagen, Start, Marktanalyse & Objekt

export const contentDataPart1Maximal: Record<string, {
  title: string;
  theory: string;
  law: string[];
  practice: string | Array<{question: string; solution: string}>;
  task?: string;
  tasks?: Array<{type?: string; question: string; hint?: string}>;
  quiz?: Array<{question: string; options?: string[]; answer?: string; explanation?: string}>;
  type?: string;
  extendedTheory?: string;
  caseStudy?: string;
  solution?: string;
}> = {
  // --- Woche 1-2: Rechtliche Grundlagen & Start (Tag 1-10) ---

  day_1: {
    title: "Berufsbild & §34c GewO",
    theory: "Der Immobilienmakler ist ein Vermittler zwischen Angebot und Nachfrage. Die Tätigkeit ist erlaubnispflichtig nach § 34c GewO.",
    extendedTheory: `
### Der Immobilienmakler: Berufsbild und Zugangsvoraussetzungen
Der Beruf des Immobilienmaklers ist in Deutschland kein klassischer Ausbildungsberuf mit Kammerzwang (wie Handwerker oder Ärzte), sondern ein Gewerbe, das einer Erlaubnispflicht unterliegt.

**1. Die Erlaubnis nach § 34c GewO**
Wer gewerbsmäßig Immobilien vermitteln will, braucht eine behördliche Erlaubnis. Diese ist an zwei Hauptbedingungen geknüpft:
*   **Zuverlässigkeit:** Keine Vorstrafen (Diebstahl, Betrug, Untreue etc.) in den letzten 5 Jahren. Nachweis durch polizeiliches Führungszeugnis (Belegart O).
*   **Geordnete Vermögensverhältnisse:** Kein laufendes Insolvenzverfahren, keine Einträge im Schuldnerverzeichnis. Nachweis durch Unbedenklichkeitsbescheinigung des Finanzamts und Auskunft des Amtsgerichts.

**2. Was § 34c NICHT verlangt**
Anders als oft vermutet, ist *keine* fachliche Prüfung (Sachkundenachweis) nötig, um die Erlaubnis zu erhalten. Das führt zu einer niedrigen Markteintrittsbarriere, aber auch zu großen Qualitätsunterschieden am Markt.

**3. Weiterbildungspflicht**
Seit 2018 müssen Makler 20 Stunden Weiterbildung innerhalb von 3 Jahren nachweisen (§34c Abs. 2a GewO, §15b MaBV). ⚠️ **Aktuell (Stand 2025/2026):** Das Bundeskabinett hat am 5.11.2025 beschlossen, diese Weiterbildungspflicht abzuschaffen (Bürokratierückbau-Gesetz). Bis zur Verkündung im Bundesgesetzblatt gilt noch die alte Regelung.
    `,
    law: ["§ 34c GewO", "MaBV § 15b (Weiterbildung)"],
    practice: "Recherchieren Sie bei Ihrem lokalen Ordnungsamt/Gewerbeamt: Welche Unterlagen werden genau gefordert und was kostet die Erlaubnis?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Berufsbild & §34c GewO' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Berufsbild & §34c GewO'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Berufsbild & §34c GewO' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der vorbestrafte Makler**
Herr K. möchte Makler werden. Er hat vor 3 Jahren eine Verurteilung wegen Steuerhinterziehung erhalten.
**Analyse:** Steuerhinterziehung ist ein "eigentums- und vermögensbezogenes Delikt". Die Behörde wird die Zuverlässigkeit verneinen. Der Antrag wird abgelehnt.
    `,
    task: "Erstellen Sie eine Liste aller Dokumente für den §34c-Antrag inkl. Kosten.",
    solution: `
**Dokumentenliste §34c:**
1.  Antragsformular (ca. 0 €)
2.  Führungszeugnis Belegart O (13 €)
3.  Gewerbezentralregisterauszug Belegart 9 (13 €)
4.  Bescheinigung in Steuersachen (Finanzamt) (ca. 0-15 €)
5.  Auskunft Schuldnerverzeichnis (Amtsgericht) (ca. 0-15 €)
6.  Bescheinigung Insolvenzgericht (ca. 0-15 €)
7.  Personalausweiskopie
**Gesamtkosten Gebühr:** Je nach Stadt 200 - 1000 €.
    `,
    type: "Recht"
  },
  day_2: {
    title: "Gewerberecht & MaBV",
    theory: "Nach Erhalt der Erlaubnis gelten Pflichten aus der Makler- und Bauträgerverordnung (MaBV).",
    extendedTheory: `
### Die Pflichten nach MaBV
Die MaBV regelt nicht den Vertragsabschluss, sondern das Verhalten des Gewerbetreibenden *nach* Erhalt der Erlaubnis.

**1. Buchführungspflicht (§ 10 MaBV)**
Der Makler muss Aufzeichnungen über seine Aufträge führen.
*   Daten des Auftraggebers
*   Daten des Objekts
*   Vertragsdaten
*   Zahlungen (falls er Gelder annimmt - was reine Makler selten tun sollten!).

**2. Informationspflichten**
Der Makler muss dem Kunden bestimmte Informationen geben (z.B. über seine Erlaubnisbehörde).

**3. Vermögenssicherung**
Wer als Bauträger oder Baubetreuer auch Kundengelder verwaltet, unterliegt strengsten Trennungsprinzipien (Bauträgerkonto). Für reine Makler ist relevant: Nimm niemals Kundengelder (Reservierungsgebühren, Kautionen) auf dein Privatkonto!

**4. Prüfung**
Wer Bauträgergeschäfte macht, muss jährlich einen Prüfbericht (Wirtschaftsprüfer) vorlegen. Reine Makler müssen nur eine "Negativerklärung" abgeben, dass sie keine Bauträgergeschäfte gemacht haben.
    `,
    law: ["MaBV § 10 (Buchführung)", "MaBV § 16 (Prüfung)"],
    practice: "Erstellen Sie ein Muster für ein Makler-Journal (Auftragsbuch).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Gewerberecht & MaBV' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Gewerberecht & MaBV'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Gewerberecht & MaBV' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die fehlende Weiterbildung**
Makler M wird geprüft. Er kann für die Jahre 2021-2023 keine 20 Stunden Weiterbildung nachweisen. Hinweis: Ab Inkrafttreten des Bürokratierückbau-Gesetzes entfällt diese Pflicht — der Fall bleibt für bereits laufende Prüfverfahren relevant.
**Folge:** Bußgeld (bis 5.000 €). Bei Wiederholung droht der Widerruf der §34c-Erlaubnis wegen Unzuverlässigkeit.
    `,
    task: "Recherchieren Sie 3 anerkannte Weiterbildungsanbieter für Makler.",
    solution: `
**Beispiele:**
1.  IVD Bildungsinstitut
2.  IHK Akademien
3.  Sprengnetter Akademie
4.  Online-Portale wie 'Haufe Immobilien'
    `,
    type: "Recht"
  },
  day_3: {
    title: "Maklervertrag: BGB Grundlagen",
    theory: "Der Maklervertrag ist die Basis für die Provision. Er ist im BGB geregelt.",
    extendedTheory: `
### Der Maklervertrag (§§ 652 ff. BGB)
Der Maklervertrag verpflichtet den Makler zum Nachweis oder zur Vermittlung und den Auftraggeber zur Zahlung der Provision *im Erfolgsfall*.

**1. Zustandekommen**
*   Mündlich (Handschlag) - *Achtung: Nicht bei Wohnungskauf!*
*   Konkludent (Schlüssiges Verhalten) - Kunde nutzt Maklerdienste in Wissen um Provisionspflicht.
*   Schriftlich/Textform - Zwingend bei Wohnungskauf (§ 656a BGB).

**2. Arten der Tätigkeit**
*   **Nachweismakler:** Nennt nur die Gelegenheit (Adresse + Verkäufer). "Da ist das Haus, geh hin."
*   **Vermittlungsmakler:** Wirkt aktiv auf den Abschluss ein ("Kühler Kopf" zwischen den Parteien). Verhandelt Preise, klärt Details.

**3. Provisionsvoraussetzungen (Die 4 Säulen)**
1.  Maklervertrag
2.  Maklertätigkeit
3.  Hauptvertrag (Notarvertrag)
4.  Kausalität (Ursächlichkeit)
    `,
    law: ["§ 652 BGB", "§ 656a BGB"],
    practice: "Formulieren Sie einen Provisionshinweis für ein Exposé, der ein konkludentes Handeln ermöglichen würde (bei Gewerbe).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Maklervertrag: BGB Grundlagen' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Maklervertrag: BGB Grundlagen'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Maklervertrag: BGB Grundlagen' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die Vorkenntnis**
Makler schickt Exposé. Kunde sagt: "Das Haus kenne ich schon, da wohnt mein Onkel."
**Recht:** Wenn der Kunde Vorkenntnis hat, fehlt die Kausalität des Nachweises. Der Makler kriegt keine Provision, es sei denn, er vermittelt (verhandelt) zusätzlich wesentlich.
**Lösung:** Kunde muss Vorkenntnis sofort rügen.
    `,
    task: "Erstellen Sie eine Klausel 'Vorkenntnis' für Ihre AGB.",
    solution: `
**Musterklausel:**
"Ist dem Auftraggeber die durch uns nachgewiesene Gelegenheit zum Abschluss eines Vertrages bereits bekannt, so hat er uns dies unverzüglich, spätestens jedoch innerhalb von 3 Tagen unter Angabe der Quelle mitzuteilen. Unterlässt er diese Mitteilung, so gilt der Nachweis durch uns als ursächlich für den Vertragsabschluss, sofern nicht das Gegenteil bewiesen wird."
    `,
    type: "Verträge"
  },
  day_4: {
    title: "Widerrufsrecht Deep Dive",
    theory: "Das Widerrufsrecht ist der größte Provisionskiller. Makler müssen es beherrschen.",
    extendedTheory: `
### Das 14-tägige Widerrufsrecht
Verbraucher haben bei Fernabsatzverträgen (Telefon, E-Mail, Internet) und Verträgen außerhalb von Geschäftsräumen ein Widerrufsrecht.

**Das Problem:**
Der Makler will sofort arbeiten (Exposé senden, besichtigen). Die Widerrufsfrist läuft aber 14 Tage.
Wenn der Makler leistet und der Kunde *danach* widerruft, ist die Leistung futsch und die Provision auch (kein Wertersatz).

**Die Lösung: Der Wertersatz-Verzicht**
Der Kunde muss ZWEI Haken setzen (oder Erklärungen abgeben):
1.  "Ich verlange den sofortigen Beginn der Dienstleistung vor Ende der Widerrufsfrist."
2.  "Ich weiß, dass mein Widerrufsrecht erlischt, wenn der Makler die Leistung vollständig erbracht hat."

**Wann ist die Leistung "vollständig erbracht"?**
Beim Nachweismakler: Mit Nennung der Adresse!
Beim Vermittlungsmakler: Schwieriger, meist erst mit Kaufvertrag. Daher ist die korrekte Belehrung hier essenziell.
    `,
    law: ["§ 355 BGB", "§ 356 Abs. 4 BGB", "§ 357 Abs. 8 BGB"],
    practice: "Testen Sie den Prozess bei Immobilienscout24 als Nutzer. Was passiert, wenn man eine Anfrage stellt?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Widerrufsrecht Deep Dive' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Widerrufsrecht Deep Dive'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Widerrufsrecht Deep Dive' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der "schlaue" Kunde**
Kunde fordert Exposé an, bestätigt Widerrufsverzicht NICHT. Makler schickt Exposé trotzdem ("Service"). Kunde kauft das Haus und widerruft den Maklervertrag.
**Ergebnis:** Makler hat Pech. Kein Provisionsanspruch.
**Lehre:** Kein Exposé ohne Belehrung und Verzichtserklärung!
    `,
    task: "Entwerfen Sie ein rechtssicheres E-Mail-Template für den Exposé-Versand.",
    solution: `
**Template:**
"Sehr geehrter Herr X,
vielen Dank für Ihre Anfrage. Gerne erhalten Sie das Exposé.
Da wir gesetzlich verpflichtet sind, Sie über Ihr Widerrufsrecht zu belehren, klicken Sie bitte auf folgenden Link:
[Link zum Portal/Formular]
Dort können Sie die Belehrung lesen und den sofortigen Start der Dienstleistung bestätigen. Danach steht Ihnen das Exposé sofort zum Download bereit."
    `,
    type: "Recht"
  },
  day_5: {
    title: "Geldwäschegesetz (GwG) Deep Dive",
    theory: "Makler sind die 'Gatekeeper' gegen Geldwäsche im Immobiliensektor.",
    extendedTheory: `
### Die Pflichten des Maklers nach GwG
1.  **Risikomanagement:** Risikoanalyse des eigenen Geschäfts erstellen.
2.  **Sorgfaltspflichten (KYC - Know Your Customer):**
    *   Identifizierung des Vertragspartners (Ausweis).
    *   Prüfung des wirtschaftlich Berechtigten (Transparenzregister).
    *   Prüfung, ob es sich um eine "Politisch Exponierte Person" (PeP) handelt.
3.  **Dokumentation:** Kopien 5 Jahre aufbewahren.
4.  **Meldepflicht:** Verdachtsmeldung an die FIU (Financial Intelligence Unit).

**Wann identifizieren?**
Spätestens, wenn ein ernsthaftes Kaufinteresse besteht (Reservierung, Kaufvertragsentwurf). Nicht schon bei Besichtigung (Datensparsamkeit!), aber vor dem Notar.

**Sanktionen**
Die Aufsichtsbehörden prüfen streng. Bußgelder beginnen oft bei 10.000 €.
    `,
    law: ["GwG § 2, 10, 11, 43"],
    practice: "Registrieren Sie sich (fiktiv) im 'goAML' Portal der FIU. Das ist Pflicht für jeden Makler!",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Geldwäschegesetz (GwG) Deep Dive' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Geldwäschegesetz (GwG) Deep Dive'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Geldwäschegesetz (GwG) Deep Dive' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der Barzahler**
Käufer fragt: "Kann ich 50.000 € Anzahlung bar an den Verkäufer geben?"
**Alarm:** Immobilienkauf mit Bargeld ist in Deutschland zwar zivilrechtlich möglich (aber Notare dürfen es nicht beurkunden/abwickeln), aber hochgradig verdächtig. Makler MUSS das melden.
    `,
    task: [
      {
        question: `GwG Prüfungsfall (IHK-Niveau):
Herr Mehmet K. möchte ein MFH für 1,2 Mio. € kaufen. Er möchte 150.000 € als Anzahlung bar übergeben. Als Käufer tritt eine zypriotische Ltd. auf. Herr K. erklärt, er sei der alleinige Geschäftsführer. Das Geld stamme aus "Geschäften in der Türkei".

Frage 1: Welche GwG-Pflichten hat der Makler?
Frage 2: Muss eine Verdachtsmeldung abgegeben werden?
Frage 3: Darf der Makler Herrn K. über eine etwaige Meldung informieren?`,
        solution: `Antwort 1 — GwG-Pflichten:
- Identifizierung §11 GwG: Personalausweis Herrn K. + Handelsregister Ltd. Zypern
- Wirtschaftlich Berechtigter: Nachweis >25% Anteile (§3 GwG)
- Erhöhte Sorgfalt §15 GwG wegen: Barzahlung >10.000 €, Offshore-Gesellschaft, unklare Mittelherkunft
- Schriftlicher Nachweis Mittelherkunft verlangen (Kontoauszüge, Geschäftsunterlagen)
- Eigene Risikoanalyse dokumentieren

Antwort 2 — Verdachtsmeldung:
JA — Verdachtsmeldung an FIU (goAML) ist PFLICHT weil:
- Barzahlung 150.000 € (weit über 10.000 € Grenze)
- Zypern: erhöhtes Risiko (EU-Mitglied, aber bekannt für Briefkastenfirmen)
- "Geschäfte in der Türkei" ohne konkreten Nachweis
- Kein konkreter Beweis nötig — begründeter Verdacht reicht! (§43 GwG)

Antwort 3 — Informationspflicht:
NEIN — Tipping-off-Verbot §47 GwG!
Der Makler darf Herrn K. NICHT informieren dass eine Verdachtsmeldung abgegeben wurde.
Verstoß: Strafbar nach §17 GwG (bis 2 Jahre Freiheitsstrafe oder Geldstrafe)
Ausnahme: Andere Verpflichtete (z.B. der Notar) dürfen informiert werden.`
      }
    ],
    type: "Recht"
  },
  day_6: {
    title: "Datenschutz (DSGVO) für Makler",
    theory: "Daten sind das Gold des Maklers, aber der Umgang ist streng reguliert.",
    extendedTheory: `
### DSGVO im Maklerbüro
1.  **Rechtsgrundlage:** Wir dürfen Daten speichern zur "Vertragserfüllung" (Art. 6 Abs. 1 lit. b DSGVO) oder bei "berechtigtem Interesse" (Werbung, bedingt).
2.  **Informationspflicht:** Datenschutzerklärung bei Erstkontakt übergeben/verlinken.
3.  **Löschkonzept:** Wann müssen Daten gelöscht werden?
    *   Interessent kauft nicht: Nach Ende des Suchauftrags (oder Widerruf).
    *   Rechnungsdaten: 10 Jahre (Steuerrecht).
    *   GwG-Daten: 5 Jahre.
4.  **Weitergabe:** Daten an Notar/Verkäufer geben? Nur mit Einwilligung oder zur Vertragserfüllung nötig.

**Abmahnfalle:** Offener E-Mail-Verteiler (CC statt BCC) bei Massenmails an Interessenten. Das ist ein Datenschutzverstoß!
    `,
    law: ["DSGVO Art. 6, 13, 17"],
    practice: "Prüfen Sie Ihre E-Mail-Signatur. Ist ein Link zur Datenschutzerklärung enthalten?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Datenschutz (DSGVO) für Makler' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Datenschutz (DSGVO) für Makler'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Datenschutz (DSGVO) für Makler' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die "Leichen" im CRM**
Makler hat 10.000 Adressen im System, manche 10 Jahre alt. Er schickt einen Newsletter.
**Risiko:** Wenn keine Einwilligung (Double Opt-In) vorliegt oder die Daten veraltet sind -> Abmahnung und Bußgeld.
**Lösung:** Regelmäßiges Aufräumen (Data Cleaning).
    `,
    task: "Entwerfen Sie einen Text für die Einwilligung zur Datenweitergabe an Finanzierungsvermittler.",
    solution: `
**Einwilligung:**
"Ich stimme zu, dass die Immobilien GmbH meine Kontaktdaten (Name, Telefon, E-Mail) und die Objektdaten an die Finanzierungspartner X und Y weitergibt, damit diese mir ein Finanzierungsangebot erstellen können. Diese Einwilligung kann ich jederzeit widerrufen."
    `,
    type: "Recht"
  },
  day_7: {
    title: "Wettbewerbsrecht (UWG) Basics",
    theory: "Werbung muss wahr sein. Das UWG schützt Mitbewerber und Verbraucher.",
    extendedTheory: `
### UWG-Fallen für Makler
1.  **Irreführung (§ 5 UWG):**
    *   "Alleinauftrag" werben, obwohl keiner besteht.
    *   "Käufer provisionsfrei" werben, aber Verkäufer zahlt (ok, wenn transparent).
    *   Objekte online lassen, die schon verkauft sind ("Lockvogelangebote").
2.  **Belästigung (§ 7 UWG):**
    *   Cold Calling (Anruf ohne Einwilligung) ist verboten.
    *   E-Mail-Werbung ohne Opt-In ist verboten.

**Abmahnvereine:** Die DUH (Deutsche Umwelthilfe) mahnt oft fehlende Energieangaben ab. Wettbewerbsvereine mahnen falsche Impressen ab.
    `,
    law: ["UWG § 5, § 7"],
    practice: "Suchen Sie auf Portalen nach 'verkauften' Objekten. Wenn sie länger als 1-2 Wochen online sind -> Wettbewerbsverstoß.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Wettbewerbsrecht (UWG) Basics' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Wettbewerbsrecht (UWG) Basics'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Wettbewerbsrecht (UWG) Basics' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Das "reservierte" Objekt**
Makler lässt verkauftes Objekt online mit Flag "reserviert", um weitere Leads zu generieren ("Wir haben noch ähnliche Objekte").
**Recht:** Unzulässig, wenn der Verkauf faktisch durch ist. Lockvogelwerbung.
    `,
    task: "Erstellen Sie eine Checkliste 'Rechtssichere Anzeige'.",
    solution: `
**Checkliste:**
1.  Energieangaben vollständig?
2.  Impressum erreichbar (max. 2 Klicks)?
3.  Preisangaben inkl. Käuferprovision?
4.  Keine übertriebenen Adjektive, die Tatsachen vortäuschen ("Neubauzustand" bei 10 Jahre altem Haus?).
5.  Bilder entsprechen der Realität (kein übertriebenes Photoshop).
    `,
    type: "Recht"
  },
  day_8: {
    title: "Verbraucherschutz Spezial",
    theory: "Besondere Regeln beim Verbrauchsgüterkauf und Dienstleistungen.",
    extendedTheory: `
### Schlichtungsstellen
Makler müssen in ihren AGB/Impressum informieren, ob sie an einem Streitbeilegungsverfahren teilnehmen (§ 36 VSBG). Meistens: "Wir sind nicht bereit und nicht verpflichtet..."

### Textformgebot § 656a BGB
Gilt nur, wenn der Käufer ein **Verbraucher** ist.
*   Kauft eine GmbH -> Mündlicher Vertrag möglich.
*   Kauft eine Privatperson -> Textform nötig.

### Halbteilungsgrundsatz § 656c BGB
Gilt nur bei **Einfamilienhäusern** und **Wohnungen**.
*   Mehrfamilienhaus? -> Käufer kann 100% Provision zahlen.
*   Baugrundstück? -> Käufer kann 100% Provision zahlen.
*   Gewerbe? -> Frei verhandelbar.
    `,
    law: ["VSBG § 36", "BGB § 656a-d"],
    practice: "Ein Arzt kauft eine Praxisfläche. Ist er Verbraucher? (Nein, Unternehmer). Ein Arzt kauft eine Wohnung zur Vermietung. Ist er Verbraucher? (Ja, private Vermögensverwaltung).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Verbraucherschutz Spezial' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Verbraucherschutz Spezial'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Verbraucherschutz Spezial' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Das 'Zweifamilienhaus'**
Ein Haus hat eine Einliegerwohnung. Gilt die Provisionsteilung?
**Recht:** § 656c spricht von "Einfamilienhäusern". Ein Haus mit 2 Wohnungen ist ein Zweifamilienhaus. -> Keine Provisionsteilungspflicht! Käufer kann voll zahlen.
**Aber:** Wenn die ELW untergeordnet ist (< 20% Fläche), gilt es oft noch als EFH. Grauzone!
    `,
    task: "Klassifizieren Sie folgende Objekte: EFH mit Einliegerwohnung, DHH, Reihenhaus, MFH mit 3 Einheiten, Unbebautes Grundstück.",
    solution: `
*   EFH mit ELW: Risikofall (siehe oben).
*   DHH (Doppelhaushälfte): Gilt als EFH -> Provisionsteilung.
*   Reihenhaus: Gilt als EFH -> Provisionsteilung.
*   MFH (3 Einheiten): Kein EFH -> Provision frei verhandelbar.
*   Grundstück: Kein Wohngebäude -> Provision frei verhandelbar.
    `,
    type: "Recht"
  },
  day_9: {
    title: "Das Maklerbüro: Organisation",
    theory: "Struktur ist alles. CRM, Versicherung, Ablage.",
    extendedTheory: `
### Vermögensschaden-Haftpflichtversicherung
Nicht Pflicht nach §34c, aber überlebenswichtig.
*   Deckt Schäden aus Falschberatung (z.B. falsche Wohnfläche, vergessener Nießbrauch).
*   Deckungssumme mind. 250.000 €, besser 500.000 €.

### CRM-Software (Customer Relationship Management)
Ohne Software (onOffice, FlowFact, Propstack) ist professionelles Arbeiten kaum möglich.
*   Automatisiertes Exposé-Versenden.
*   Widerrufs-Tracking.
*   Objekt-Matching.
*   Terminverwaltung.

### Rechtsform
*   Einzelunternehmen (Haftung privat).
*   UG/GmbH (Haftungsbeschränkt, aber Bilanzierungspflicht).
    `,
    law: ["HGB (Kaufmannseigenschaft)", "GmbHG"],
    practice: "Vergleichen Sie 3 CRM-Anbieter anhand ihrer Features und Preise.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Das Maklerbüro: Organisation' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Das Maklerbüro: Organisation'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Das Maklerbüro: Organisation' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der Datenverlust**
Makler speichert alles in Excel auf dem Laptop. Laptop wird gestohlen.
**Folge:** Datenschutz-GAU (Meldung an Behörde binnen 72h!). Verlust aller Leads.
**Lösung:** Cloud-CRM mit 2-Faktor-Authentifizierung.
    `,
    task: "Erstellen Sie einen Businessplan-Teil 'Betriebsausstattung'. Was brauchen Sie zum Start?",
    solution: `
**Ausstattung:**
1.  Laptop/Tablet (mobil).
2.  Smartphone (gute Kamera).
3.  Lasermessgerät.
4.  CRM-Lizenz.
5.  Webseite (Hosting).
6.  Auto (Branding?).
7.  Büro (Homeoffice vs. Ladenlokal).
    `,
    type: "Organisation"
  },
  day_10: {
    title: "Netzwerke & Gemeinschaftsgeschäfte",
    theory: "Einzelkämpfer sterben. Netzwerke bringen Umsatz.",
    extendedTheory: `
### Gemeinschaftsgeschäft
Makler A hat das Objekt, Makler B den Käufer.
*   Man teilt die Provision (meist 50/50 vom Gesamtumsatz oder jeder behält seine Seite).
*   Regeln vorher schriftlich fixieren! (Kundenschutz).

### Netzwerke
*   **IVD (Immobilienverband Deutschland):** Gütesiegel, Lobby, Rechtsberatung.
*   **Börsen:** MLS (Multiple Listing Service) - in USA Standard, in DE im Kommen.
*   **Tippgeber:** Banker, Anwälte, Bestatter, Handwerker.

### Tippgeber-Vertrag
Wenn ein Tippgeber Provision bekommt, muss das transparent sein. Tippgeber darf nicht "makeln" (verhandeln), sonst braucht er §34c. Nur Adresse nennen ist erlaubt.
    `,
    law: ["GewO § 34c (Abgrenzung Tippgeber)"],
    practice: "Sprechen Sie einen lokalen Handwerker an. 'Wenn Sie ein Haus sehen, das leer steht, sagen Sie mir Bescheid. Ich zahle 10% meiner Provision bei Erfolg.'",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Netzwerke & Gemeinschaftsgeschäfte' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Netzwerke & Gemeinschaftsgeschäfte'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Netzwerke & Gemeinschaftsgeschäfte' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der Streit um den Kunden**
Gemeinschaftsgeschäft vereinbart per Telefon. Kunde kauft. Makler A zahlt Makler B nicht aus.
**Lösung:** Schriftliche Vereinbarung zwingend! "Teilungsabkommen".
    `,
    task: "Entwerfen Sie eine 'Tippgeber-Vereinbarung'.",
    solution: `
**Vereinbarung:**
1.  Tippgeber nennt Adresse + Eigentümer.
2.  Makler prüft: Ist das Objekt schon bekannt?
3.  Wenn nein: Kundenschutz.
4.  Bei erfolgreichem Verkauf erhält Tippgeber X % der Netto-Provision.
5.  Fälligkeit: 14 Tage nach Geldeingang beim Makler.
6.  Hinweis: Tippgeber versteuert Einnahme selbst.
    `,
    type: "Softskills"
  },

  // --- Woche 3-4: Marktanalyse & Objekt (Tag 11-20) ---

  day_11: {
    title: "Standortanalyse Deep Dive",
    theory: "Makro- und Mikrolage im Detail analysieren.",
    extendedTheory: `
### Harte und weiche Standortfaktoren
*   **Hart:** Verkehrsanbindung, Steuern, Fördergebiete, Bodenpreise.
*   **Weich:** Image, Freizeitwert, Kultur, "Szene-Faktor".

### Scoring-Modelle
Profis nutzen Scoring-Tabellen.
*   Verkehr: 1-10 Punkte.
*   Einkaufen: 1-10 Punkte.
*   Ruhe: 1-10 Punkte.
*   Gewichtung je nach Zielgruppe (Familie braucht Schule, Senior braucht Arzt).

### Gentrifizierungs-Zyklus
1.  Pioniere (Studenten/Künstler) ziehen in billiges Viertel.
2.  Szene entsteht (Cafés).
3.  Yuppies/Investoren kommen. Preise steigen.
4.  Verdrängung der Ur-Einwohner.
5.  Hochpreis-Viertel.
    `,
    law: ["BauGB"],
    practice: "Analysieren Sie einen Stadtteil Ihrer Wahl auf Gentrifizierungs-Anzeichen.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Standortanalyse Deep Dive' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Standortanalyse Deep Dive'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Standortanalyse Deep Dive' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der falsche Fokus**
Makler lobt "ruhige Waldrandlage" für junge Studenten-WG.
**Fehler:** Zielgruppe will ÖPNV und Bars, keinen Wald. Standortanalyse muss zur Nutzung passen.
    `,
    task: "Erstellen Sie ein Standort-Factsheet für ein Exposé.",
    solution: `
**Factsheet:**
*   ÖPNV: U-Bahn 5min zu Fuß.
*   Auto: A5 in 10min.
*   Supermarkt: Rewe gegenüber.
*   Schule: Gymnasium 1km.
*   Highlight: Park direkt hinterm Haus.
    `,
    type: "Analyse"
  },
  day_12: {
    title: "Marktforschung & Datenquellen",
    theory: "Datenbasierte Beratung statt Bauchgefühl.",
    extendedTheory: `
### Datenquellen
1.  **Gutachterausschuss (GAA):** Der "Heilige Gral". Kaufpreissammlung (echte Notarverträge!). Grundstücksmarktbericht (jährlich).
2.  **IMD / Sprengnetter:** Marktdatenbanken.
3.  **Statistisches Bundesamt (Destatis):** Bautätigkeit, Bevölkerung.
4.  **Geomarketing:** GfK Kaufkraftkarten.

### Angebots- vs. Transaktionspreise
*   **Angebotspreis (Ask):** Wunschpreis im Portal. Oft 10-20% über Markt.
*   **Transaktionspreis (Bid/Strike):** Echter Verkaufspreis beim Notar.
*   **Marktspanne:** Differenz. In Boomphasen klein, in Krisen groß.
    `,
    law: ["BauGB § 195 (Kaufpreissammlung)"],
    practice: "Laden Sie den kostenlosen Marktbericht Ihrer Stadt herunter (oft online beim GAA).",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Marktforschung & Datenquellen' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Marktforschung & Datenquellen'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Marktforschung & Datenquellen' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die Portal-Recherche**
Makler schaut bei ImmoScout: "Hier kosten Häuser 500k." Er bewertet auch mit 500k.
**Realität:** Die Häuser stehen seit 12 Monaten drin ("Schrankleichen"). Echter Wert 400k.
**Lehre:** Verkaufsdauer (Days on Market) beachten!
    `,
    task: "Erstellen Sie eine Tabelle: Angebotspreis vs. Tatsächlicher Preis für 3 fiktive Objekte.",
    solution: `
*   Objekt A: Angebot 450k, Verkauf 430k (-4,5%).
*   Objekt B: Angebot 500k, Verkauf 400k (-20% - war überteuert).
*   Objekt C: Angebot 300k, Verkauf 310k (+3% - Bieterverfahren).
    `,
    type: "Analyse"
  },
  day_13: {
    title: "Immobilienarten & Nutzungsarten",
    theory: "Wohnen, Gewerbe, Spezialimmobilien. Baurechtliche Unterschiede.",
    extendedTheory: `
### Wohnimmobilien
*   EFH (Freistehend, DHH, RH).
*   ETW (Eigentumswohnung).
*   MFH (Zinshaus).

### Gewerbeimmobilien
*   Büro.
*   Handel (Retail).
*   Logistik/Halle.
*   Spezial (Hotel, Pflegeheim).

### Mischobjekte
Wohn- und Geschäftshaus (WGH).
*   Bewertung schwierig (Ertragswert gemischt).
*   Finanzierung schwierig (Banken mögen reine Wohnobjekte lieber).

### Nutzungsuntersagung
Wer eine Wohnung als Büro nutzt (mit Publikumsverkehr) oder als Ferienwohnung (Zweckentfremdung), riskiert Bußgelder und Nutzungsuntersagung durch das Bauamt.
    `,
    law: ["BauNVO", "ZwEckVerbG (Zweckentfremdungsverbotsgesetz)"],
    practice: "Prüfen Sie, ob in Ihrer Stadt ein Zweckentfremdungsverbot (Airbnb-Verbot) gilt.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Immobilienarten & Nutzungsarten' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Immobilienarten & Nutzungsarten'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Immobilienarten & Nutzungsarten' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Das illegale Büro**
Käufer kauft Wohnung, um dort eine Arztpraxis zu eröffnen. Teilungserklärung sagt "Wohnung". Baugenehmigung sagt "Wohnen".
**Folge:** Bauamt untersagt Praxisbetrieb. Käufer verklagt Makler wegen Falschberatung.
    `,
    task: "Erstellen Sie eine Matrix: Vor- und Nachteile Wohnen vs. Gewerbe als Kapitalanlage.",
    solution: `
**Wohnen:**
+ Sichere Nachfrage.
+ Geringes Leerstandsrisiko.
- Viel Kleinarbeit (Mieterschutz).
- Geringere Rendite.

**Gewerbe:**
+ Höhere Rendite.
+ Langfristige Verträge (5-10 Jahre).
+ Weniger Mieterschutz.
- Hohes Leerstandsrisiko.
- Konjunkturabhängig.
    `,
    type: "Theorie"
  },
  day_14: {
    title: "Baurecht Basics (BauGB, BauNVO)",
    theory: "Was darf ich bauen? §34 vs. B-Plan.",
    extendedTheory: `
### Der Bebauungsplan (B-Plan)
Enthält zeichnerische und textliche Festsetzungen.
*   **Art der Nutzung:** WA (Allg. Wohngebiet), GE (Gewerbe).
*   **Maß der Nutzung:** GRZ, GFZ, BMZ (Baumassenzahl), Vollgeschosse.
*   **Bauweise:** o (offen), g (geschlossen), a (abweichend).
*   **Dachform:** SD (Sattel), FD (Flach).

### § 34 BauGB (Nachbarschaft)
Wenn kein B-Plan da ist: "Einfügen".
*   Hat der Nachbar 2 Stockwerke? Dann darf ich auch 2.
*   Steht der Nachbar an der Straße? Dann muss ich auch (Baulinie/Baugrenze faktisch).

### § 35 BauGB (Außenbereich)
Bauen verboten! (Zersiedelungsschutz).
*   Bestandsschutz für alte Häuser. Aber: Abriss und Neubau meist verboten!
    `,
    law: ["BauGB § 30, 34, 35", "BauNVO"],
    practice: "Suchen Sie einen B-Plan online (Geoportal). Finden Sie GRZ und GFZ.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Baurecht Basics (BauGB, BauNVO)' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Baurecht Basics (BauGB, BauNVO)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Baurecht Basics (BauGB, BauNVO)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Das Abrisshaus im Wald**
Kunde kauft alte Hütte im Wald (§35), will abreißen und Villa bauen. Makler sagt "Kein Problem".
**Amt sagt:** Nein. Bestandsschutz erlischt bei Abriss. Baugenehmigung für Neubau wird verweigert. Grundstück wertlos.
    `,
    task: "Berechnen Sie: Grundstück 1000qm, GRZ 0.3. Wie viel qm darf ich versiegeln?",
    solution: `
1000qm * 0.3 = 300qm für Hauptanlagen (Haus).
Oft darf man für Nebenanlagen (Garage, Zufahrt) die GRZ um 50% überschreiten (GRZ II), max bis 0.8.
Also evtl. bis 450qm gesamt. (Landesrecht prüfen!).
    `,
    type: "Theorie"
  },
  day_15: {
    title: "Grundbuch lesen (Abt I & II)",
    theory: "Eigentum und Lasten verstehen.",
    extendedTheory: `
### Abteilung I: Eigentümer
*   **Alleineigentum:** Einer.
*   **Miteigentum nach Bruchteilen:** Eheleute je 1/2. Jeder kann seinen Teil theoretisch verkaufen (praktisch schwer).
*   **Gesamthandsgemeinschaft:** Erbengemeinschaft. Können nur *gemeinsam* verfügen! Alle müssen unterschreiben.

### Abteilung II: Lasten
*   **Dienstbarkeiten:** Geh- und Fahrtrecht (Nachbar darf drüber fahren). Leitungsrecht (Stromversorger).
*   **Reallast:** Monatliche Rente an Oma zahlen aus dem Grundstücksertrag.
*   **Vormerkung:** "Reservierung" für den Käufer.

**Löschung:** Rechte in Abt. II mindern den Wert. Ziel: Lastenfreier Verkauf.
    `,
    law: ["GBO"],
    practice: "Lesen Sie einen Grundbuchauszug. Wer ist Eigentümer? Welche Rechte stehen in Abt. II?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Grundbuch lesen (Abt I & II)' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Grundbuch lesen (Abt I & II)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Grundbuch lesen (Abt I & II)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die zerstrittene Erbengemeinschaft**
3 Erben stehen im Grundbuch. Einer will nicht verkaufen.
**Folge:** Kein Verkauf möglich! (Außer Teilungsversteigerung). Makler darf das Objekt nicht anbieten, wenn nicht alle zugestimmt haben.
    `,
    task: "Erklären Sie den Unterschied zwischen Wegerecht und Notwegerecht.",
    solution: `
*   **Wegerecht:** Im Grundbuch eingetragenes Recht. Vertraglich vereinbart.
*   **Notwegerecht (§ 917 BGB):** Gesetzliches Recht, wenn ein Grundstück keinen Zugang zur Straße hat. Muss durch "Notwegrente" bezahlt werden. Nicht im Grundbuch (oft).
    `,
    type: "Dokumente"
  },
  day_16: {
    title: "Grundbuch Abt III & Finanzierungslasten",
    theory: "Hypotheken und Grundschulden.",
    extendedTheory: `
### Grundschuld vs. Hypothek
*   **Hypothek:** Hängt an der Forderung. Kredit weg = Hypothek weg. (Heute selten).
*   **Grundschuld:** Abstrakt. Bleibt stehen, auch wenn Kredit getilgt ist. Kann für neue Kredite "neu valutiert" werden.

### Brief vs. Buch
*   **Buchgrundschuld:** Nur im Grundbuch eingetragen. Günstiger.
*   **Briefgrundschuld:** Es gibt einen "Grundschuldbrief" (Urkunde). Wer den Brief hat, ist Gläubiger.
    *   Gefahr: Brief verloren -> Aufgebotsverfahren (dauert Monate!).
    *   Vorteil: Leichte Abtretung durch Briefübergabe.

### Löschungsbewilligung
Wenn der Verkäufer noch Schulden hat, fordert der Notar die Bank auf, die Löschungsbewilligung zu senden (gegen Treuhandauflage: Löschung nur gegen Geld).
    `,
    law: ["BGB § 1113 (Hypothek)", "BGB § 1191 (Grundschuld)"],
    practice: "Fragen Sie den Eigentümer: 'Haben Sie noch Belastungen drauf? Haben Sie den Brief?'",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Grundbuch Abt III & Finanzierungslasten' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Grundbuch Abt III & Finanzierungslasten'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Grundbuch Abt III & Finanzierungslasten' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der verlorene Brief**
Verkauf steht an. Bank sagt: "Wir haben keinen Brief." Eigentümer auch nicht.
**Folge:** Notar kann nicht löschen. Kaufpreis wird nicht fällig. Käufer zieht nicht ein.
**Lösung:** Sofort prüfen, ob Briefrecht vorliegt!
    `,
    task: "Erstellen Sie ein Ablaufschema 'Lastenfreistellung'.",
    solution: `
1.  Notar schreibt Bank an.
2.  Bank schickt Löschungsbewilligung + Treuhandauftrag ("Löschen nur, wenn ihr mir 100.000 € überweist").
3.  Käufer zahlt 100.000 an Bank, Rest an Verkäufer.
4.  Notar lässt löschen.
    `,
    type: "Dokumente"
  },
  day_17: {
    title: "Bauunterlagen & Flurkarte",
    theory: "Was man für den Verkauf (und die Bank) braucht.",
    extendedTheory: `
### Die Bauakte
Liegt beim Bauamt. Einsicht nur mit Vollmacht.
*   **Baugenehmigung:** Ist das Haus legal gebaut? (Schwarzbauten haben keinen Bestandsschutz!).
*   **Grundrisse/Schnitte:** Stimmen die mit der Realität überein? (Wände versetzt? Anbau gemacht?).
*   **Baubeschreibung:** Welches Material?

### Die Flurkarte (Liegenschaftskarte)
Zeigt die Grenzen und Gebäudeumrisse.
*   **Überbau:** Ragt das Haus über die Grenze?
*   **Grenzbebauung:** Garage auf der Grenze erlaubt (max 9m Länge meist). Haus braucht 3m Abstand (Abstandsflächen).
    `,
    law: ["LBO (Landesbauordnung)"],
    practice: "Prüfen Sie einen Grundriss. Fehlt ein Fenster, das in echt da ist? -> Tektur (Nachtragsgenehmigung) nötig?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Bauunterlagen & Flurkarte' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Bauunterlagen & Flurkarte'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Bauunterlagen & Flurkarte' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der Schwarzbau-Wintergarten**
Eigentümer hat Wintergarten ohne Genehmigung angebaut. Käufer Bank prüft Unterlagen: "Wo ist die Genehmigung?"
**Folge:** Bank finanziert nicht. Oder: Amt fordert Abriss.
**Maklerpflicht:** Bauakte einsehen! Abgleich Realität vs. Plan.
    `,
    task: "Erstellen Sie eine Unterlagen-Checkliste für Verkäufer.",
    solution: `
*   Grundbuchauszug (aktuell).
*   Flurkarte.
*   Baugenehmigung + Pläne.
*   Wohnflächenberechnung.
*   Energieausweis.
*   Grundsteuerbescheid.
*   Versicherungsnachweis.
    `,
    type: "Dokumente"
  },
  day_18: {
    title: "Energieausweis (GEG)",
    theory: "Pflicht bei Verkauf und Vermietung. Bußgeldfalle!",
    extendedTheory: `
### Gebäudeenergiegesetz (GEG)
*   **Bedarfsausweis:** Theoretisch berechnet (Bausubstanz, Heizung). Pflicht für unsanierte Häuser < 5 Wohnungen, Bauantrag vor 1.11.1977.
*   **Verbrauchsausweis:** Basiert auf Verbrauch der letzten 3 Jahre. (Billiger, aber nutzerabhängig).

### Pflichtangaben in Immobilienanzeigen (§ 87 GEG)
1.  Art des Ausweises.
2.  Endenergiebedarf/-verbrauch (kWh).
3.  Energieträger (Gas, Öl).
4.  Baujahr Gebäude.
5.  Energieeffizienzklasse (A+ bis H).

**Gültigkeit:** 10 Jahre.
    `,
    law: ["GEG § 80 ff."],
    practice: "Schauen Sie sich einen Energieausweis an. Wo stehen die Pflichtangaben? Seite 1 oder 2?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Energieausweis (GEG)' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Energieausweis (GEG)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Energieausweis (GEG)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die fehlenden Angaben**
Makler inseriert "Energieausweis liegt zur Besichtigung vor". Schreibt keine Werte ins Inserat.
**Recht:** Verstoß! Werte müssen *in die Anzeige*, wenn der Ausweis schon vorliegt. Abmahnung droht.
    `,
    task: "Entscheiden Sie: Welcher Ausweis für welches Haus? (Baujahr 1960, unsaniert, 2 Wohnungen / Baujahr 2000, 10 Wohnungen).",
    solution: `
*   1960, unsaniert, 2 Whg: Bedarfsausweis PFLICHT (da < 5 Whg und vor 1977).
*   2000, 10 Whg: Wahlfreiheit (Verbrauch oder Bedarf).
    `,
    type: "Recht"
  },
  day_19: {
    title: "Wohnflächenberechnung (WoFlV vs DIN 277)",
    theory: "Fläche ist Geld. Falsche Fläche = Haftung.",
    extendedTheory: `
### Wohnflächenverordnung (WoFlV)
Standard für Wohnraum (Miete/Kauf).
*   Höhe > 2m: 100%.
*   Höhe 1m - 2m: 50%.
*   Höhe < 1m: 0%.
*   Balkone/Terrassen: 25% (max. 50% bei besonderer Qualität).
*   Keller/Garage: 0% (Nutzfläche).

### DIN 277
Für Gewerbe oder Baukosten.
*   Rechnet alles (auch Dachschrägen) voll.
*   Ergibt größere Flächen als WoFlV.

**Falle:** Makler nimmt DIN-Fläche aus Bauplan und verkauft sie als Wohnfläche. -> Täuschung!
    `,
    law: ["WoFlV"],
    practice: "Messen Sie einen Raum mit Dachschräge. Wo ist die 1m und 2m Linie?",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Wohnflächenberechnung (WoFlV vs DIN 277)' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Wohnflächenberechnung (WoFlV vs DIN 277)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Wohnflächenberechnung (WoFlV vs DIN 277)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Der Hobbyraum**
Kellerraum mit Heizung und Fenster. Makler zählt ihn zur Wohnfläche.
**Recht:** Nach LBO müssen Aufenthaltsräume mind. 2,40m Höhe und genug Fensterfläche haben. Oft im Keller nicht erfüllt. -> Nur Nutzfläche!
    `,
    task: "Berechnen Sie die Fläche: Raum 20qm Grundfläche, davon 4qm unter 1m Höhe, 4qm zwischen 1-2m. Balkon 10qm.",
    solution: `
*   Bereich < 1m: 4qm * 0 = 0.
*   Bereich 1-2m: 4qm * 0.5 = 2.
*   Bereich > 2m: 12qm * 1 = 12.
*   Balkon: 10qm * 0.25 = 2.5.
*   **Gesamt:** 16.5 qm.
    `,
    type: "Praxis"
  },
  day_20: {
    title: "Objektunterlagen-Management",
    theory: "Die vollständige Objektakte ist der Schlüssel zur Finanzierung.",
    extendedTheory: `
### Was die Bank braucht (Beleihungsunterlagen)
Ohne diese Unterlagen kriegt der Käufer keinen Kredit.
1.  Exposé + Fotos.
2.  Grundbuch (max. 3 Monate alt).
3.  Flurkarte.
4.  Berechnungen (Wohnfläche, Kubatur).
5.  Bauzeichnungen (Grundriss, Schnitt, Ansicht).
6.  Energieausweis.
7.  Versicherungsnachweis (Feuer).
8.  Bei ETW: Teilungserklärung, Wirtschaftsplan, Protokolle.

### Digitaler Datenraum
Profi-Makler stellen Unterlagen in einer Cloud bereit (passwortgeschützt).
    `,
    law: ["Kreditwesengesetz (KWG) - Bankenprüfung"],
    practice: "Erstellen Sie eine Ordnerstruktur für Ihre digitale Objektakte.",
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Objektunterlagen-Management' sind für Ihre Tätigkeit als Makler §34c GewO-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Objektunterlagen-Management'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34c GewO, MaBV, Maklerrecht, BGB §652."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Objektunterlagen-Management' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    caseStudy: `
**Fall: Die verzögerte Finanzierung**
Unterlagen kommen kleckerweise. Bank braucht 4 Wochen zur Prüfung. Verkäufer wird nervös und verkauft an jemand anderen.
**Lösung:** Unterlagen *vor* Vermarktungsstart komplett haben! "Bankfertiges Exposé".
    `,
    task: "Erstellen Sie eine Checkliste 'Bankunterlagen'.",
    solution: `
(Siehe Theory + Besonderheiten wie Erbpachtvertrag, Baulastenverzeichnis).
    `,
    type: "Organisation"
  }
};
