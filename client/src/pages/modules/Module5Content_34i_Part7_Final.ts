// Modul 5: Darlehensvermittlung §34i GewO
// Teil 7: Tage 31-40 (Prüfungssimulationen + Wiederholung) - KOMPAKT

export const contentDataModule5_34i_Part7_Final: Record<string, {
  title: string;
  theory: string;
  extendedTheory?: string;
  law: string[];
  practice: string;
  task?: string;
  tasks?: Array<{type?: string; question: string; hint?: string}>;
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
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Prüfungssimulation 1: Multiple-Choice-Fragen (50 Fragen)' sind für Ihre Tätigkeit als Darlehensvermittler §34i-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Prüfungssimulation 1: Multiple-Choice-Fragen (50 Fragen)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34i GewO, ImmVermV, ESIS, Kreditwürdigkeit."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Prüfungssimulation 1: Multiple-Choice-Fragen (50 Fragen)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
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
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Prüfungssimulation 2: Rechenaufgaben (20 Aufgaben)' sind für Ihre Tätigkeit als Darlehensvermittler §34i-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Prüfungssimulation 2: Rechenaufgaben (20 Aufgaben)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34i GewO, ImmVermV, ESIS, Kreditwürdigkeit."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Prüfungssimulation 2: Rechenaufgaben (20 Aufgaben)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
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
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Prüfungssimulation 3: Fallstudien (3 Fallstudien)' sind für Ihre Tätigkeit als Darlehensvermittler §34i-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Prüfungssimulation 3: Fallstudien (3 Fallstudien)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34i GewO, ImmVermV, ESIS, Kreditwürdigkeit."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Prüfungssimulation 3: Fallstudien (3 Fallstudien)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
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
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Prüfungssimulation 4: Mündliche Prüfung (10 Fragen)' sind für Ihre Tätigkeit als Darlehensvermittler §34i-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Prüfungssimulation 4: Mündliche Prüfung (10 Fragen)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34i GewO, ImmVermV, ESIS, Kreditwürdigkeit."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Prüfungssimulation 4: Mündliche Prüfung (10 Fragen)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
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
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Prüfungssimulation 5: Gesamtprüfung (Alle Bereiche)' sind für Ihre Tätigkeit als Darlehensvermittler §34i-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Prüfungssimulation 5: Gesamtprüfung (Alle Bereiche)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34i GewO, ImmVermV, ESIS, Kreditwürdigkeit."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Prüfungssimulation 5: Gesamtprüfung (Alle Bereiche)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
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
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Wiederholung: Gesetze und Paragraphen' sind für Ihre Tätigkeit als Darlehensvermittler §34i-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Wiederholung: Gesetze und Paragraphen'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34i GewO, ImmVermV, ESIS, Kreditwürdigkeit."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Wiederholung: Gesetze und Paragraphen' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
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
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Wiederholung: Formeln und Berechnungen' sind für Ihre Tätigkeit als Darlehensvermittler §34i-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Wiederholung: Formeln und Berechnungen'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34i GewO, ImmVermV, ESIS, Kreditwürdigkeit."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Wiederholung: Formeln und Berechnungen' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
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
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Wiederholung: Praxisbeispiele und Fallstudien' sind für Ihre Tätigkeit als Darlehensvermittler §34i-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Wiederholung: Praxisbeispiele und Fallstudien'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34i GewO, ImmVermV, ESIS, Kreditwürdigkeit."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Wiederholung: Praxisbeispiele und Fallstudien' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
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
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Wiederholung: Schwachstellen identifizieren und beheben' sind für Ihre Tätigkeit als Darlehensvermittler §34i-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Wiederholung: Schwachstellen identifizieren und beheben'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34i GewO, ImmVermV, ESIS, Kreditwürdigkeit."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Wiederholung: Schwachstellen identifizieren und beheben' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
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
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Abschluss: Letzte Wiederholung und Prüfungsvorbereitung' sind für Ihre Tätigkeit als Darlehensvermittler §34i-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Abschluss: Letzte Wiederholung und Prüfungsvorbereitung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an §34i GewO, ImmVermV, ESIS, Kreditwürdigkeit."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Abschluss: Letzte Wiederholung und Prüfungsvorbereitung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
    task: `Erstellen Sie eine Checkliste für die Prüfung (Unterlagen, Anfahrt, Zeitplan).`,
    solution: `Sie sind bestens vorbereitet! Viel Erfolg bei der Sachkundeprüfung §34i!`,
    type: "Prüfungsvorbereitung"
  },

};
