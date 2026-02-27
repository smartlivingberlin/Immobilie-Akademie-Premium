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
