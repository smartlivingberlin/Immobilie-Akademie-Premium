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
