import { useState, useRef, useEffect } from "react";
import { Calculator, ChevronRight, ChevronDown, Send, RotateCcw, CheckCircle2, ArrowLeft, BookOpen, Lightbulb, MessageCircle } from "lucide-react";

// ─── TYPEN ───────────────────────────────────────────────────────────────────

interface Schritt {
  nr: number;
  kontext: string;
  formel: string;
  variablen: { kuerzel: string; bedeutung: string; wert?: string }[];
  aufgabe: string;
  einheit: string;
  korrekt: number;
  toleranz?: number;
  tipp: string;
}

interface Aufgabe {
  id: number;
  bereich: string;
  titel: string;
  berufssituation: string;
  was_lerne_ich: string;
  schritte: Schritt[];
  abschluss: string;
  gesetze: string[];
  praxistipp: string;
}

// ─── AUFGABEN-DATEN ──────────────────────────────────────────────────────────

const AUFGABEN: Aufgabe[] = [
  {
    id: 1,
    bereich: "Maklercourtage & Provision",
    titel: "Was zahlt der Käufer wirklich?",
    berufssituation: "Ihre Kundin Frau Schmidt möchte eine Wohnung für 380.000 € kaufen. Sie fragen sich: Wie viel Courtage kommt auf sie zu und wie erkläre ich ihr das verständlich?",
    was_lerne_ich: "Sie lernen, die Maklerprovision exakt zu berechnen und Ihren Kunden transparent zu erklären — eine der häufigsten Fragen im Makleralltag.",
    schritte: [
      {
        nr: 1,
        kontext: "Zuerst brauchen wir den Kaufpreis. Das ist die Basis für alle weiteren Rechnungen.",
        formel: "Kaufpreis = Vereinbarter Verkaufspreis",
        variablen: [{ kuerzel: "K", bedeutung: "Kaufpreis in Euro" }],
        aufgabe: "Notieren Sie den Kaufpreis der Wohnung:",
        einheit: "€",
        korrekt: 380000,
        toleranz: 0,
        tipp: "Der Kaufpreis steht im Exposé und im Kaufvertrag. Hier: 380.000 €"
      },
      {
        nr: 2,
        kontext: "Der Provisionssatz von 3,57% ist in Deutschland der übliche Satz. Er setzt sich zusammen aus 3% Nettoprovision + 19% Mehrwertsteuer = 3,57% brutto. Für die Rechnung wandeln wir ihn in eine Dezimalzahl um.",
        formel: "Dezimalzahl = Prozentsatz ÷ 100",
        variablen: [
          { kuerzel: "p", bedeutung: "Provisionssatz in %", wert: "3,57%" },
          { kuerzel: "d", bedeutung: "Dezimalzahl (p ÷ 100)" }
        ],
        aufgabe: "Wandeln Sie 3,57% in eine Dezimalzahl um (3,57 ÷ 100):",
        einheit: "",
        korrekt: 0.0357,
        toleranz: 0.0001,
        tipp: "Jede Prozentzahl wird durch 100 geteilt: 3,57 ÷ 100 = 0,0357"
      },
      {
        nr: 3,
        kontext: "Jetzt multiplizieren wir Kaufpreis mit dem Dezimalwert. Das ergibt die Courtage.",
        formel: "Courtage = Kaufpreis × Dezimalzahl",
        variablen: [
          { kuerzel: "K", bedeutung: "Kaufpreis", wert: "380.000 €" },
          { kuerzel: "d", bedeutung: "Dezimalzahl", wert: "0,0357" },
          { kuerzel: "C", bedeutung: "Courtage = K × d" }
        ],
        aufgabe: "Berechnen Sie: 380.000 × 0,0357 =",
        einheit: "€",
        korrekt: 13566,
        toleranz: 1,
        tipp: "380.000 × 0,0357 = 13.566 €. Das ist die Courtage die Frau Schmidt zahlt."
      }
    ],
    abschluss: "Frau Schmidt zahlt eine Courtage von 13.566 € für Ihre Vermittlungsleistung. Das sind 3,57% inkl. MwSt. auf den Kaufpreis von 380.000 €.",
    gesetze: ["§652 BGB", "§656c BGB", "§656d BGB"],
    praxistipp: "Seit der Reform 2020 darf die Käuferprovision die Verkäuferprovision nicht übersteigen. Bei einem Einfamilienhaus zahlen Käufer und Verkäufer daher jeweils maximal 50% der Gesamtcourtage."
  },
  {
    id: 2,
    bereich: "Maklercourtage & Provision",
    titel: "Wer zahlt was beim Einfamilienhaus?",
    berufssituation: "Sie haben ein Einfamilienhaus für 520.000 € verkauft. Verkäufer und Käufer teilen sich die Provision je 50%. Ihr Gesamtprovisionssatz beträgt 7,14%. Was erhält jede Partei?",
    was_lerne_ich: "Die Provisionsteilung nach §656c BGB ist seit 2020 Pflicht bei Einfamilienhäusern und Eigentumswohnungen. Sie lernen die korrekte Aufteilung zu berechnen.",
    schritte: [
      {
        nr: 1,
        kontext: "Bei der Provisionsteilung berechnen wir zuerst die Gesamtprovision auf den vollen Kaufpreis.",
        formel: "Gesamtprovision = Kaufpreis × Gesamtprovisionssatz ÷ 100",
        variablen: [
          { kuerzel: "K", bedeutung: "Kaufpreis", wert: "520.000 €" },
          { kuerzel: "G", bedeutung: "Gesamtprovisionssatz", wert: "7,14%" }
        ],
        aufgabe: "Berechnen Sie die Gesamtprovision (520.000 × 7,14 ÷ 100):",
        einheit: "€",
        korrekt: 37128,
        toleranz: 1,
        tipp: "520.000 × 0,0714 = 37.128 €"
      },
      {
        nr: 2,
        kontext: "Bei 50/50 Teilung zahlt jede Partei die Hälfte. Der Anteil pro Partei beträgt je 3,57% (= 7,14% ÷ 2).",
        formel: "Anteil je Partei = Gesamtprovision ÷ 2",
        variablen: [
          { kuerzel: "GP", bedeutung: "Gesamtprovision", wert: "37.128 €" }
        ],
        aufgabe: "Berechnen Sie den Anteil je Partei (37.128 ÷ 2):",
        einheit: "€",
        korrekt: 18564,
        toleranz: 1,
        tipp: "37.128 ÷ 2 = 18.564 €"
      }
    ],
    abschluss: "Käufer und Verkäufer zahlen jeweils 18.564 € (3,57% von 520.000 €). Ihre Gesamtprovision beträgt 37.128 €.",
    gesetze: ["§656c BGB", "§656d BGB", "§652 BGB"],
    praxistipp: "Das Kopplungsverbot nach §656d BGB bedeutet: Der Makler darf den Vertragsschluss mit dem Käufer nicht davon abhängig machen, dass dieser die Provision übernimmt."
  },
  {
    id: 3,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Lohnt sich dieses Objekt?",
    berufssituation: "Ein Investor fragt Sie: 'Ich kaufe ein Mehrfamilienhaus für 800.000 €. Die jährliche Nettomiete beträgt 36.000 €. Wie hoch ist meine Rendite?' Das ist eine der häufigsten Fragen von Kapitalanlegern.",
    was_lerne_ich: "Die Nettomietrendite zeigt, wie viel Prozent des eingesetzten Kapitals jährlich durch Mieteinnahmen zurückfließen. Sie ist das wichtigste Maß für Immobilieninvestoren.",
    schritte: [
      {
        nr: 1,
        kontext: "Wir teilen die jährliche Nettomiete durch den Kaufpreis. Das ergibt einen Dezimalwert.",
        formel: "Rendite (Dezimal) = Jahresnettomiete ÷ Kaufpreis",
        variablen: [
          { kuerzel: "JNM", bedeutung: "Jahresnettomiete", wert: "36.000 €" },
          { kuerzel: "KP", bedeutung: "Kaufpreis", wert: "800.000 €" }
        ],
        aufgabe: "Berechnen Sie: 36.000 ÷ 800.000 =",
        einheit: "",
        korrekt: 0.045,
        toleranz: 0.001,
        tipp: "36.000 ÷ 800.000 = 0,045"
      },
      {
        nr: 2,
        kontext: "Um den Dezimalwert in Prozent umzurechnen, multiplizieren wir mit 100.",
        formel: "Rendite (%) = Dezimalwert × 100",
        variablen: [
          { kuerzel: "d", bedeutung: "Dezimalwert", wert: "0,045" }
        ],
        aufgabe: "Berechnen Sie: 0,045 × 100 =",
        einheit: "%",
        korrekt: 4.5,
        toleranz: 0.1,
        tipp: "0,045 × 100 = 4,5%"
      }
    ],
    abschluss: "Die Nettomietrendite beträgt 4,5%. Das bedeutet: Für jeden investierten Euro fließen 4,5 Cent jährlich als Mieteinnahmen zurück.",
    gesetze: ["ImmoWertV", "§535 BGB"],
    praxistipp: "In deutschen Großstädten gilt 3-5% als solide Nettomietrendite. Unter 3% ist das Objekt oft zu teuer. Über 6% deutet auf erhöhtes Risiko hin (z.B. Leerstand, Instandhaltungsstau)."
  },
  {
    id: 4,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Der Kaufpreisfaktor",
    berufssituation: "Ein Investor sagt: 'Ich zahle nicht mehr als das 20-fache der Jahresnettomiete.' Die Jahresnettomiete eines Objekts beträgt 24.000 €. Was darf das Objekt maximal kosten?",
    was_lerne_ich: "Der Kaufpreisfaktor (auch 'Vervielfältiger') ist der Kehrwert der Rendite. Er zeigt in wie vielen Jahren die Mieteinnahmen den Kaufpreis theoretisch decken.",
    schritte: [
      {
        nr: 1,
        kontext: "Beim Kaufpreisfaktor multiplizieren wir die Jahresnettomiete mit dem gewünschten Faktor. Faktor 20 bedeutet: 20-fache der Jahresnettomiete.",
        formel: "Maximaler Kaufpreis = Jahresnettomiete × Kaufpreisfaktor",
        variablen: [
          { kuerzel: "JNM", bedeutung: "Jahresnettomiete", wert: "24.000 €" },
          { kuerzel: "F", bedeutung: "Kaufpreisfaktor", wert: "20" }
        ],
        aufgabe: "Berechnen Sie: 24.000 × 20 =",
        einheit: "€",
        korrekt: 480000,
        toleranz: 0,
        tipp: "24.000 × 20 = 480.000 €"
      },
      {
        nr: 2,
        kontext: "Zur Kontrolle: Die Rendite bei Faktor 20 berechnen wir als 1 ÷ Faktor × 100.",
        formel: "Rendite = 1 ÷ Faktor × 100",
        variablen: [
          { kuerzel: "F", bedeutung: "Kaufpreisfaktor", wert: "20" }
        ],
        aufgabe: "Welche Rendite entspricht Faktor 20? (1 ÷ 20 × 100):",
        einheit: "%",
        korrekt: 5,
        toleranz: 0.1,
        tipp: "1 ÷ 20 = 0,05 → × 100 = 5%"
      }
    ],
    abschluss: "Das Objekt darf maximal 480.000 € kosten. Das entspricht einer Rendite von 5%.",
    gesetze: ["ImmoWertV §17", "§194 BauGB"],
    praxistipp: "In München oder Hamburg liegen Kaufpreisfaktoren oft bei 30-40 (Rendite: 2,5-3,3%). In Mittelstädten eher 15-20 (Rendite: 5-6,7%). Der Faktor ist ein schneller Vergleichsmaßstab."
  },
  {
    id: 5,
    bereich: "Annuität & Tilgung",
    titel: "Was kostet der Kredit monatlich?",
    berufssituation: "Ihr Kunde Herr Weber möchte 300.000 € finanzieren. Die Bank bietet 3,5% Zinsen p.a. und er möchte 2% anfängliche Tilgung. Was zahlt er monatlich?",
    was_lerne_ich: "Die monatliche Annuität ist die gleichbleibende Rate aus Zins und Tilgung. Sie zu berechnen gehört zu den Grundkompetenzen eines Darlehensvermittlers nach §34i GewO.",
    schritte: [
      {
        nr: 1,
        kontext: "Zins und Tilgung zusammen ergeben den Annuitätensatz. Das ist der Prozentsatz, den wir auf das Darlehen anwenden.",
        formel: "Annuitätensatz = Zinssatz + Tilgungssatz",
        variablen: [
          { kuerzel: "z", bedeutung: "Zinssatz p.a.", wert: "3,5%" },
          { kuerzel: "t", bedeutung: "Tilgungssatz p.a.", wert: "2%" },
          { kuerzel: "a", bedeutung: "Annuitätensatz = z + t" }
        ],
        aufgabe: "Berechnen Sie den Annuitätensatz (3,5 + 2):",
        einheit: "%",
        korrekt: 5.5,
        toleranz: 0.01,
        tipp: "3,5% + 2% = 5,5%"
      },
      {
        nr: 2,
        kontext: "Jetzt berechnen wir die jährliche Belastung: Darlehensbetrag mal Annuitätensatz.",
        formel: "Jahresrate = Darlehensbetrag × Annuitätensatz ÷ 100",
        variablen: [
          { kuerzel: "D", bedeutung: "Darlehensbetrag", wert: "300.000 €" },
          { kuerzel: "a", bedeutung: "Annuitätensatz", wert: "5,5%" }
        ],
        aufgabe: "Berechnen Sie die Jahresrate (300.000 × 5,5 ÷ 100):",
        einheit: "€",
        korrekt: 16500,
        toleranz: 1,
        tipp: "300.000 × 0,055 = 16.500 €"
      },
      {
        nr: 3,
        kontext: "Die monatliche Rate erhalten wir durch Division der Jahresrate durch 12 Monate.",
        formel: "Monatsrate = Jahresrate ÷ 12",
        variablen: [
          { kuerzel: "JR", bedeutung: "Jahresrate", wert: "16.500 €" }
        ],
        aufgabe: "Berechnen Sie die Monatsrate (16.500 ÷ 12):",
        einheit: "€",
        korrekt: 1375,
        toleranz: 1,
        tipp: "16.500 ÷ 12 = 1.375 €"
      }
    ],
    abschluss: "Herr Weber zahlt monatlich 1.375 € gleichbleibend über die gesamte Zinsbindungszeit. Dabei sinkt der Zinsanteil monatlich, der Tilgungsanteil steigt.",
    gesetze: ["§488 BGB", "§34i GewO", "EU-WIKR Art. 4"],
    praxistipp: "Als Faustregel gilt: Zinssatz + 1% Tilgung ergibt einen tragbaren Einstieg. Experten empfehlen jedoch mindestens 2-3% Tilgung um nicht zu lange zu schulden."
  },
  {
    id: 6,
    bereich: "Kaufnebenkosten",
    titel: "Was kostet der Kauf wirklich?",
    berufssituation: "Frau Müller kauft eine Wohnung in Berlin für 420.000 €. Sie fragt: 'Was kommt noch obendrauf?' Sie müssen alle Kaufnebenkosten transparent erklären.",
    was_lerne_ich: "Kaufnebenkosten machen 10-15% des Kaufpreises aus. Als Makler müssen Sie diese vollständig und korrekt kommunizieren — eine rechtliche und ethische Pflicht.",
    schritte: [
      {
        nr: 1,
        kontext: "Grunderwerbsteuer ist eine Ländersteuer. Berlin erhebt 6% auf den Kaufpreis. Sie wird vom Käufer bezahlt und ist Pflicht bei jedem Grundstückskauf.",
        formel: "Grunderwerbsteuer = Kaufpreis × 6 ÷ 100",
        variablen: [
          { kuerzel: "KP", bedeutung: "Kaufpreis", wert: "420.000 €" },
          { kuerzel: "GrESt", bedeutung: "Grunderwerbsteuer Berlin (6%)" }
        ],
        aufgabe: "Berechnen Sie die Grunderwerbsteuer (420.000 × 6 ÷ 100):",
        einheit: "€",
        korrekt: 25200,
        toleranz: 1,
        tipp: "420.000 × 0,06 = 25.200 €"
      },
      {
        nr: 2,
        kontext: "Notar- und Grundbuchkosten betragen zusammen ca. 2% des Kaufpreises. Der Notar beurkundet den Kaufvertrag, das Grundbuchamt trägt den neuen Eigentümer ein.",
        formel: "Notar + Grundbuch = Kaufpreis × 2 ÷ 100",
        variablen: [
          { kuerzel: "KP", bedeutung: "Kaufpreis", wert: "420.000 €" }
        ],
        aufgabe: "Berechnen Sie Notar + Grundbuch ca. (420.000 × 2 ÷ 100):",
        einheit: "€",
        korrekt: 8400,
        toleranz: 100,
        tipp: "420.000 × 0,02 = 8.400 €"
      },
      {
        nr: 3,
        kontext: "Alle Kaufnebenkosten zusammenzählen ergibt die Gesamtbelastung über den Kaufpreis hinaus.",
        formel: "Gesamtnebenkosten = GrESt + Notar/Grundbuch + Courtage",
        variablen: [
          { kuerzel: "GrESt", bedeutung: "Grunderwerbsteuer", wert: "25.200 €" },
          { kuerzel: "N+G", bedeutung: "Notar + Grundbuch", wert: "8.400 €" },
          { kuerzel: "C", bedeutung: "Courtage 3,57%", wert: "14.994 €" }
        ],
        aufgabe: "Berechnen Sie Gesamtnebenkosten (25.200 + 8.400 + 14.994):",
        einheit: "€",
        korrekt: 48594,
        toleranz: 10,
        tipp: "25.200 + 8.400 + 14.994 = 48.594 €"
      }
    ],
    abschluss: "Frau Müller zahlt ca. 48.594 € Nebenkosten zusätzlich zum Kaufpreis — also insgesamt rund 468.594 €.",
    gesetze: ["GrEStG §1", "GNotKG", "§652 BGB"],
    praxistipp: "Banken finanzieren Kaufnebenkosten meist nicht mit. Käufer brauchen daher mindestens 10-15% Eigenkapital allein für Nebenkosten — plus weiteres Eigenkapital für einen guten Beleihungsauslauf."
  },
  {
    id: 7,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Hausgeld berechnen und erklären",
    berufssituation: "Als WEG-Verwalter verwalten Sie eine Anlage mit 10 Einheiten. Das Jahresbudget beträgt 48.000 €. Jede Einheit hat 100 m² von insgesamt 1.000 m². Was zahlt jeder Eigentümer monatlich?",
    was_lerne_ich: "Das Hausgeld wird nach Miteigentumsanteilen (MEA) verteilt. Bei gleichen Anteilen teilt sich das Budget gleichmäßig. Sie lernen die Grundlage der WEG-Abrechnung.",
    schritte: [
      {
        nr: 1,
        kontext: "Der Miteigentumsanteil (MEA) jeder Einheit bestimmt, wie viel Prozent des Gesamtbudgets jeder Eigentümer trägt. Bei 10 gleichen Einheiten hat jeder 10%.",
        formel: "MEA Einheit = Fläche Einheit ÷ Gesamtfläche × 100",
        variablen: [
          { kuerzel: "FE", bedeutung: "Fläche Einheit", wert: "100 m²" },
          { kuerzel: "FG", bedeutung: "Gesamtfläche", wert: "1.000 m²" }
        ],
        aufgabe: "Berechnen Sie den MEA in % (100 ÷ 1.000 × 100):",
        einheit: "%",
        korrekt: 10,
        toleranz: 0,
        tipp: "100 ÷ 1.000 = 0,1 × 100 = 10%"
      },
      {
        nr: 2,
        kontext: "Der Jahresanteil je Einheit ergibt sich aus dem Gesamtbudget mal dem MEA-Anteil.",
        formel: "Jahresanteil = Jahresbudget × MEA ÷ 100",
        variablen: [
          { kuerzel: "JB", bedeutung: "Jahresbudget", wert: "48.000 €" },
          { kuerzel: "MEA", bedeutung: "Miteigentumsanteil", wert: "10%" }
        ],
        aufgabe: "Berechnen Sie den Jahresanteil (48.000 × 10 ÷ 100):",
        einheit: "€",
        korrekt: 4800,
        toleranz: 1,
        tipp: "48.000 × 0,10 = 4.800 €"
      },
      {
        nr: 3,
        kontext: "Das monatliche Hausgeld ergibt sich durch Division des Jahresanteils durch 12.",
        formel: "Monatliches Hausgeld = Jahresanteil ÷ 12",
        variablen: [
          { kuerzel: "JA", bedeutung: "Jahresanteil", wert: "4.800 €" }
        ],
        aufgabe: "Berechnen Sie das monatliche Hausgeld (4.800 ÷ 12):",
        einheit: "€",
        korrekt: 400,
        toleranz: 0,
        tipp: "4.800 ÷ 12 = 400 €"
      }
    ],
    abschluss: "Jeder Eigentümer zahlt 400 € monatliches Hausgeld. Das Hausgeld deckt Verwaltung, Instandhaltungsrücklage und laufende Kosten.",
    gesetze: ["§16 WEG", "§28 WEG", "§19 WEG"],
    praxistipp: "Das Hausgeld ist keine Miete — es ist der Kostenanteil des Eigentümers an der Gemeinschaft. Bei Kauf immer die letzten 3 Jahresabrechnungen und den Wirtschaftsplan prüfen."
  },
  {
    id: 8,
    bereich: "Wertermittlung",
    titel: "Ertragswert berechnen",
    berufssituation: "Sie sollen ein vermietetes Mehrfamilienhaus bewerten. Jahresnettomiete: 60.000 €. Der Gutachterausschuss nennt einen Liegenschaftszins von 4% und einen Vervielfältiger von 18,5. Was ist das Objekt wert?",
    was_lerne_ich: "Das Ertragswertverfahren ist das Standardverfahren für vermietete Immobilien. Es kapitalisiert den nachhaltigen Mietertrag mit einem marktüblichen Zinssatz.",
    schritte: [
      {
        nr: 1,
        kontext: "Der Jahresreinertrag ist die nachhaltig erzielbare Jahresnettomiete — also Mieteinnahmen minus Bewirtschaftungskosten. In dieser vereinfachten Aufgabe ist sie direkt gegeben.",
        formel: "Jahresreinertrag = Jahresnettomiete (vereinfacht)",
        variablen: [
          { kuerzel: "JRE", bedeutung: "Jahresreinertrag", wert: "60.000 €" }
        ],
        aufgabe: "Notieren Sie den Jahresreinertrag:",
        einheit: "€",
        korrekt: 60000,
        toleranz: 0,
        tipp: "Hier direkt gegeben: 60.000 €"
      },
      {
        nr: 2,
        kontext: "Der Vervielfältiger aus dem Liegenschaftszins und der Restnutzungsdauer ergibt, mit wie viel der Jahresreinertrag multipliziert wird. Bei 4% / ~30 Jahre: ca. 18,5.",
        formel: "Ertragswert = Jahresreinertrag × Vervielfältiger",
        variablen: [
          { kuerzel: "JRE", bedeutung: "Jahresreinertrag", wert: "60.000 €" },
          { kuerzel: "V", bedeutung: "Vervielfältiger", wert: "18,5" }
        ],
        aufgabe: "Berechnen Sie den Ertragswert (60.000 × 18,5):",
        einheit: "€",
        korrekt: 1110000,
        toleranz: 100,
        tipp: "60.000 × 18,5 = 1.110.000 €"
      }
    ],
    abschluss: "Der Ertragswert beträgt 1.110.000 €. Das ist der marktübliche Wert basierend auf dem nachhaltigen Mietertrag.",
    gesetze: ["ImmoWertV §17", "ImmoWertV §21", "§194 BauGB"],
    praxistipp: "Der Ertragswert ist ein Verfahrenswert, kein exakter Kaufpreis. Er fließt in die Gesamtbewertung ein — oft ergänzt durch Vergleichswerte aus der Kaufpreissammlung des Gutachterausschusses."
  },
  {
    id: 9,
    bereich: "AfA & Steuervorteile",
    titel: "Abschreibung berechnen (AfA)",
    berufssituation: "Herr Fischer kauft ein Mehrfamilienhaus als Kapitalanlage. Kaufpreis: 600.000 €, davon Gebäudeanteil: 400.000 €, Baujahr 2010. Welche jährliche Steuerersparnis ergibt sich bei einem Steuersatz von 42%?",
    was_lerne_ich: "Die lineare AfA (Absetzung für Abnutzung) erlaubt Vermietern, Gebäudekosten steuerlich abzuschreiben. Bei Wohngebäuden ab 2023: 3% p.a. Vor 2023: 2% p.a.",
    schritte: [
      {
        nr: 1,
        kontext: "Abgeschrieben wird nur der Gebäudeanteil — nicht das Grundstück. Das Gebäude nutzt sich ab, das Grundstück nicht. Der AfA-Satz für Wohngebäude (Baujahr ab 1925, vor 2023) beträgt 2% p.a.",
        formel: "Jährliche AfA = Gebäudeanteil × AfA-Satz ÷ 100",
        variablen: [
          { kuerzel: "GA", bedeutung: "Gebäudeanteil", wert: "400.000 €" },
          { kuerzel: "AfA", bedeutung: "AfA-Satz Wohngebäude", wert: "2% p.a." }
        ],
        aufgabe: "Berechnen Sie die jährliche AfA (400.000 × 2 ÷ 100):",
        einheit: "€",
        korrekt: 8000,
        toleranz: 0,
        tipp: "400.000 × 0,02 = 8.000 € jährliche Abschreibung"
      },
      {
        nr: 2,
        kontext: "Die AfA mindert das zu versteuernde Einkommen. Die Steuerersparnis ergibt sich aus AfA mal persönlichem Steuersatz.",
        formel: "Steuerersparnis = Jährliche AfA × Steuersatz ÷ 100",
        variablen: [
          { kuerzel: "AfA", bedeutung: "Jährliche AfA", wert: "8.000 €" },
          { kuerzel: "s", bedeutung: "Steuersatz", wert: "42%" }
        ],
        aufgabe: "Berechnen Sie die jährliche Steuerersparnis (8.000 × 42 ÷ 100):",
        einheit: "€",
        korrekt: 3360,
        toleranz: 1,
        tipp: "8.000 × 0,42 = 3.360 € Steuerersparnis pro Jahr"
      }
    ],
    abschluss: "Herr Fischer spart jährlich 3.360 € Steuern durch die AfA. Über 50 Jahre (volle Abschreibungsdauer) spart er insgesamt 168.000 €.",
    gesetze: ["§7 EStG", "§21 EStG", "§9 EStG"],
    praxistipp: "Für Neubauten ab 2023 gilt 3% AfA p.a. (statt 2%). Der Gebäudeanteil muss im Kaufvertrag klar vom Grundstücksanteil getrennt sein — sonst schätzt das Finanzamt."
  },

  {
    id: 10,
    bereich: "Kaufnebenkosten",
    titel: "Bundeslandvergleich Grunderwerbsteuer",
    berufssituation: "Ein Investor überlegt ob er in Bayern oder Brandenburg kauft. Kaufpreis jeweils 500.000 €. Bayern: 3,5%, Brandenburg: 6,5%. Was spart er in Bayern?",
    was_lerne_ich: "Die Grunderwerbsteuer variiert stark je Bundesland. Dieser Unterschied kann bei teuren Objekten zehntausende Euro ausmachen.",
    schritte: [
      { nr: 1, kontext: "Grunderwerbsteuer Bayern berechnen.", formel: "GrESt Bayern = Kaufpreis × 3,5 ÷ 100", variablen: [{ kuerzel: "KP", bedeutung: "Kaufpreis", wert: "500.000 €" }], aufgabe: "Berechnen Sie GrESt Bayern (500.000 × 3,5 ÷ 100):", einheit: "€", korrekt: 17500, toleranz: 1, tipp: "500.000 × 0,035 = 17.500 €" },
      { nr: 2, kontext: "Grunderwerbsteuer Brandenburg berechnen.", formel: "GrESt Brandenburg = Kaufpreis × 6,5 ÷ 100", variablen: [{ kuerzel: "KP", bedeutung: "Kaufpreis", wert: "500.000 €" }], aufgabe: "Berechnen Sie GrESt Brandenburg (500.000 × 6,5 ÷ 100):", einheit: "€", korrekt: 32500, toleranz: 1, tipp: "500.000 × 0,065 = 32.500 €" },
      { nr: 3, kontext: "Die Differenz zeigt die Ersparnis.", formel: "Ersparnis = GrESt Brandenburg − GrESt Bayern", variablen: [{ kuerzel: "B", bedeutung: "Brandenburg", wert: "32.500 €" }, { kuerzel: "BY", bedeutung: "Bayern", wert: "17.500 €" }], aufgabe: "Berechnen Sie die Ersparnis (32.500 − 17.500):", einheit: "€", korrekt: 15000, toleranz: 0, tipp: "32.500 − 17.500 = 15.000 €" }
    ],
    abschluss: "In Bayern spart der Investor 15.000 € Grunderwerbsteuer gegenüber Brandenburg.",
    gesetze: ["GrEStG §1", "GrEStG §11"],
    praxistipp: "Bayern und Sachsen haben mit 3,5% die niedrigste Grunderwerbsteuer. Berlin, Brandenburg, NRW, Saarland, Schleswig-Holstein haben 6,5% — den höchsten Satz."
  },
  {
    id: 11,
    bereich: "Kaufnebenkosten",
    titel: "Gesamtinvestition berechnen",
    berufssituation: "Herr Bauer kauft ein Mehrfamilienhaus in NRW für 750.000 €. Er möchte wissen was er wirklich insgesamt investiert — inklusive aller Nebenkosten.",
    was_lerne_ich: "Die Gesamtinvestition umfasst Kaufpreis plus alle Nebenkosten. Banken nennen das 'Gesamtkapitalbedarf' — er bestimmt wie viel Eigenkapital nötig ist.",
    schritte: [
      { nr: 1, kontext: "Grunderwerbsteuer NRW: 6,5%", formel: "GrESt = 750.000 × 6,5 ÷ 100", variablen: [], aufgabe: "GrESt NRW (750.000 × 6,5 ÷ 100):", einheit: "€", korrekt: 48750, toleranz: 1, tipp: "750.000 × 0,065 = 48.750 €" },
      { nr: 2, kontext: "Notar + Grundbuch ca. 2%", formel: "Notar = 750.000 × 2 ÷ 100", variablen: [], aufgabe: "Notar + Grundbuch (750.000 × 2 ÷ 100):", einheit: "€", korrekt: 15000, toleranz: 100, tipp: "750.000 × 0,02 = 15.000 €" },
      { nr: 3, kontext: "Maklercourtage Käuferseite 3,57%", formel: "Courtage = 750.000 × 3,57 ÷ 100", variablen: [], aufgabe: "Courtage (750.000 × 3,57 ÷ 100):", einheit: "€", korrekt: 26775, toleranz: 10, tipp: "750.000 × 0,0357 = 26.775 €" },
      { nr: 4, kontext: "Alle Posten addieren.", formel: "Gesamt = KP + GrESt + Notar + Courtage", variablen: [{ kuerzel: "KP", bedeutung: "Kaufpreis", wert: "750.000 €" }, { kuerzel: "GrESt", bedeutung: "48.750 €" }, { kuerzel: "N", bedeutung: "15.000 €" }, { kuerzel: "C", bedeutung: "26.775 €" }], aufgabe: "Gesamtinvestition (750.000 + 48.750 + 15.000 + 26.775):", einheit: "€", korrekt: 840525, toleranz: 100, tipp: "750.000 + 48.750 + 15.000 + 26.775 = 840.525 €" }
    ],
    abschluss: "Herr Bauer investiert insgesamt 840.525 € — 90.525 € mehr als der Kaufpreis.",
    gesetze: ["GrEStG", "GNotKG", "§652 BGB"],
    praxistipp: "Banken finanzieren meist nur den Kaufpreis, selten die Nebenkosten. Herr Bauer braucht mindestens 90.525 € Eigenkapital — plus weiteres EK für einen guten Beleihungsauslauf."
  },
  {
    id: 12,
    bereich: "Annuität & Tilgung",
    titel: "Zinsanteil im ersten Monat",
    berufssituation: "Frau Keller hat ein Darlehen von 250.000 € zu 4% Zinsen p.a. aufgenommen. Was ist ihr Zinsanteil im ersten Monat? Und was davon ist Tilgung wenn die Monatsrate 1.250 € beträgt?",
    was_lerne_ich: "Im Annuitätendarlehen besteht jede Rate aus Zins und Tilgung. Am Anfang ist der Zinsanteil hoch, am Ende niedrig. Das nennt man die Zins-Tilgungs-Verschiebung.",
    schritte: [
      { nr: 1, kontext: "Der monatliche Zinssatz ergibt sich durch Division des Jahreszinssatzes durch 12.", formel: "Monatszins = Jahreszins ÷ 12", variablen: [{ kuerzel: "z", bedeutung: "Jahreszins", wert: "4%" }], aufgabe: "Monatszins in % (4 ÷ 12, auf 4 Stellen):", einheit: "%", korrekt: 0.3333, toleranz: 0.01, tipp: "4 ÷ 12 = 0,3333% pro Monat" },
      { nr: 2, kontext: "Zinsanteil der ersten Rate = Darlehensbetrag × Monatszins ÷ 100.", formel: "Zinsanteil = 250.000 × 0,3333 ÷ 100", variablen: [{ kuerzel: "D", bedeutung: "Darlehensbetrag", wert: "250.000 €" }], aufgabe: "Zinsanteil erste Rate (250.000 × 0,003333):", einheit: "€", korrekt: 833.33, toleranz: 1, tipp: "250.000 × 0,003333 = 833,33 €" },
      { nr: 3, kontext: "Tilgungsanteil = Monatsrate minus Zinsanteil.", formel: "Tilgung = Monatsrate − Zinsanteil", variablen: [{ kuerzel: "MR", bedeutung: "Monatsrate", wert: "1.250 €" }, { kuerzel: "ZA", bedeutung: "Zinsanteil", wert: "833,33 €" }], aufgabe: "Tilgungsanteil erste Rate (1.250 − 833,33):", einheit: "€", korrekt: 416.67, toleranz: 1, tipp: "1.250 − 833,33 = 416,67 €" }
    ],
    abschluss: "Im ersten Monat: 833,33 € Zinsen und 416,67 € Tilgung. Im letzten Monat kehrt sich das Verhältnis fast vollständig um.",
    gesetze: ["§488 BGB", "§34i GewO"],
    praxistipp: "Je höher der anfängliche Tilgungssatz, desto schneller sinkt die Restschuld und desto weniger Zinsen zahlt man insgesamt. 1% Tilgung bedeutet bei 4% Zinsen ca. 45 Jahre Laufzeit."
  },
  {
    id: 13,
    bereich: "Annuität & Tilgung",
    titel: "Restschuld nach Zinsbindung",
    berufssituation: "Herr Schmidt hat 400.000 € zu 3% Zinsen und 2% Tilgung finanziert. Nach 10 Jahren Zinsbindung läuft die Anschlussfinanzierung. Wie hoch ist seine Restschuld?",
    was_lerne_ich: "Die Restschuld nach der Zinsbindungszeit ist entscheidend für die Anschlussfinanzierung. Sie bestimmt das Zinsänderungsrisiko.",
    schritte: [
      { nr: 1, kontext: "Jahresrate berechnen: Zinssatz + Tilgungssatz aufs Darlehen.", formel: "Jahresrate = 400.000 × (3% + 2%) ÷ 100", variablen: [], aufgabe: "Jahresrate (400.000 × 5 ÷ 100):", einheit: "€", korrekt: 20000, toleranz: 0, tipp: "400.000 × 0,05 = 20.000 €" },
      { nr: 2, kontext: "Tilgungsanteil im ersten Jahr: Jahresrate minus Zinsen.", formel: "Tilgung Jahr 1 = Jahresrate − (Darlehen × Zinssatz ÷ 100)", variablen: [{ kuerzel: "ZJ1", bedeutung: "Zinsen Jahr 1", wert: "400.000 × 3% = 12.000 €" }], aufgabe: "Tilgung Jahr 1 (20.000 − 12.000):", einheit: "€", korrekt: 8000, toleranz: 0, tipp: "20.000 − 12.000 = 8.000 € Tilgung im ersten Jahr" },
      { nr: 3, kontext: "Vereinfachte Restschuld nach 10 Jahren (Näherung): Darlehen minus jährliche Tilgung × 10. Die echte Berechnung ist komplexer da der Tilgungsanteil jährlich steigt.", formel: "Restschuld ≈ 400.000 − (8.000 × 10)", variablen: [], aufgabe: "Restschuld ca. (400.000 − 80.000):", einheit: "€", korrekt: 320000, toleranz: 5000, tipp: "400.000 − 80.000 = 320.000 € (Näherung)" }
    ],
    abschluss: "Nach 10 Jahren beträgt die Restschuld ca. 320.000 € (genaue Berechnung ca. 318.000 €). Diese Summe muss zu neuen Konditionen refinanziert werden.",
    gesetze: ["§488 BGB", "§489 BGB", "§34i GewO"],
    praxistipp: "Das Zinsänderungsrisiko: Steigt der Zins bei Anschlussfinanzierung von 3% auf 6%, verdoppeln sich die Zinskosten. Deshalb empfehlen Experten lange Zinsbindungen bei niedrigem Zinsniveau."
  },
  {
    id: 14,
    bereich: "Annuität & Tilgung",
    titel: "Beleihungsauslauf berechnen",
    berufssituation: "Eine Bank prüft die Finanzierung für Frau Meier. Kaufpreis: 350.000 €, Beleihungswert: 315.000 € (90%), Darlehensbetrag: 280.000 €. Wie hoch ist der Beleihungsauslauf?",
    was_lerne_ich: "Der Beleihungsauslauf (Loan-to-Value) zeigt das Verhältnis von Kredit zu Beleihungswert. Je niedriger, desto besser die Konditionen und desto geringer das Bankrisiko.",
    schritte: [
      { nr: 1, kontext: "Beleihungsauslauf = Darlehensbetrag geteilt durch Beleihungswert mal 100.", formel: "BLA = Darlehen ÷ Beleihungswert × 100", variablen: [{ kuerzel: "D", bedeutung: "Darlehen", wert: "280.000 €" }, { kuerzel: "BW", bedeutung: "Beleihungswert", wert: "315.000 €" }], aufgabe: "BLA berechnen (280.000 ÷ 315.000 × 100):", einheit: "%", korrekt: 88.89, toleranz: 0.5, tipp: "280.000 ÷ 315.000 = 0,8889 × 100 = 88,89%" }
    ],
    abschluss: "Der Beleihungsauslauf beträgt ca. 88,9%. Das liegt über der 80%-Grenze — Banken verlangen hier meist einen Zinsaufschlag.",
    gesetze: ["§34i GewO", "CRR Art. 125", "BelWertV"],
    praxistipp: "Unter 60% BLA: Beste Konditionen. 60-80%: Gute Konditionen. 80-100%: Aufschlag. Über 100%: Sehr schwierig zu finanzieren. Mehr Eigenkapital senkt den BLA und spart Zinsen."
  },
  {
    id: 15,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Instandhaltungsrücklage berechnen",
    berufssituation: "Sie verwalten eine WEG mit 8 Einheiten und 800 m² Gesamtfläche. Nach der Petersschen Formel soll die Rücklage 0,9€ je m² und Jahr betragen. Einheit 3 hat 120 m². Was zahlt dieser Eigentümer jährlich?",
    was_lerne_ich: "Die Instandhaltungsrücklage wird für künftige Reparaturen und Sanierungen angespart. Die Peterssche Formel ist eine anerkannte Berechnungsmethode.",
    schritte: [
      { nr: 1, kontext: "Gesamtbedarf der WEG pro Jahr berechnen.", formel: "Gesamtrücklage = Gesamtfläche × 0,90 €", variablen: [{ kuerzel: "GF", bedeutung: "Gesamtfläche", wert: "800 m²" }], aufgabe: "Gesamtrücklage p.a. (800 × 0,90):", einheit: "€", korrekt: 720, toleranz: 0, tipp: "800 × 0,90 = 720 €" },
      { nr: 2, kontext: "MEA von Einheit 3 berechnen.", formel: "MEA = Einheitsfläche ÷ Gesamtfläche × 100", variablen: [{ kuerzel: "EF", bedeutung: "Einheit 3", wert: "120 m²" }], aufgabe: "MEA Einheit 3 in % (120 ÷ 800 × 100):", einheit: "%", korrekt: 15, toleranz: 0, tipp: "120 ÷ 800 = 0,15 × 100 = 15%" },
      { nr: 3, kontext: "Anteil Einheit 3 an der Gesamtrücklage.", formel: "Anteil = Gesamtrücklage × MEA ÷ 100", variablen: [{ kuerzel: "GR", bedeutung: "720 €" }, { kuerzel: "MEA", bedeutung: "15%" }], aufgabe: "Jahresanteil Einheit 3 (720 × 15 ÷ 100):", einheit: "€", korrekt: 108, toleranz: 0, tipp: "720 × 0,15 = 108 €" }
    ],
    abschluss: "Eigentümer von Einheit 3 zahlt 108 € jährlich in die Instandhaltungsrücklage — also 9 € monatlich.",
    gesetze: ["§19 WEG", "§28 WEG"],
    praxistipp: "Die Peterssche Formel: Jahresbedarf = 1,5 × Herstellungskosten ÷ Nutzungsdauer (80 Jahre). Vereinfacht: ca. 0,80-1,20 €/m²/Jahr je nach Gebäudealter und Zustand."
  },
  {
    id: 16,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Betriebskostenabrechnung erstellen",
    berufssituation: "Sie sind Vermieter. Jahreskosten: Heizung 3.600 €, Wasser 1.200 €, Hausmeister 2.400 €, Versicherung 800 €. Mieter Herr Vogel hat 80 m² von 400 m² Gesamtfläche. Was zahlt er nach?",
    was_lerne_ich: "Die Betriebskostenabrechnung verteilt tatsächliche Kosten auf Mieter. Die Differenz zur geleisteten Vorauszahlung ergibt Nachzahlung oder Erstattung.",
    schritte: [
      { nr: 1, kontext: "Gesamtbetriebskosten zusammenrechnen.", formel: "Gesamt = Heizung + Wasser + Hausmeister + Versicherung", variablen: [], aufgabe: "Gesamtkosten (3.600 + 1.200 + 2.400 + 800):", einheit: "€", korrekt: 8000, toleranz: 0, tipp: "3.600 + 1.200 + 2.400 + 800 = 8.000 €" },
      { nr: 2, kontext: "Flächenanteil Herr Vogel berechnen.", formel: "Anteil = 80 ÷ 400", variablen: [], aufgabe: "Flächenanteil als Dezimalzahl (80 ÷ 400):", einheit: "", korrekt: 0.2, toleranz: 0.001, tipp: "80 ÷ 400 = 0,2 (= 20%)" },
      { nr: 3, kontext: "Jahresanteil Herr Vogel.", formel: "Jahresanteil = Gesamtkosten × Anteil", variablen: [{ kuerzel: "GK", bedeutung: "8.000 €" }, { kuerzel: "A", bedeutung: "0,2" }], aufgabe: "Jahresanteil (8.000 × 0,2):", einheit: "€", korrekt: 1600, toleranz: 0, tipp: "8.000 × 0,2 = 1.600 €" },
      { nr: 4, kontext: "Herr Vogel zahlte monatlich 120 € Vorauszahlung = 1.440 € im Jahr. Differenz = Nachzahlung.", formel: "Nachzahlung = Jahresanteil − Vorauszahlung", variablen: [{ kuerzel: "VP", bedeutung: "Vorauszahlung", wert: "1.440 €" }], aufgabe: "Nachzahlung (1.600 − 1.440):", einheit: "€", korrekt: 160, toleranz: 0, tipp: "1.600 − 1.440 = 160 €" }
    ],
    abschluss: "Herr Vogel muss 160 € nachzahlen. Die Vorauszahlung war zu niedrig kalkuliert.",
    gesetze: ["§556 BGB", "§556a BGB", "BetrKV"],
    praxistipp: "Die Abrechnung muss bis 12 Monate nach Ende des Abrechnungszeitraums vorliegen (§556 Abs. 3 BGB). Danach sind Nachzahlungsansprüche des Vermieters ausgeschlossen."
  },
  {
    id: 17,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Hausgeldabrechnung prüfen",
    berufssituation: "Als WEG-Verwalter prüfen Sie die Jahresabrechnung. Gesamtausgaben: 36.000 €. Gesamte Hausgeldzahlungen der Eigentümer: 33.600 €. Was ergibt sich?",
    was_lerne_ich: "Die Jahresabrechnung vergleicht tatsächliche Ausgaben mit geleisteten Zahlungen. Eine Unterdeckung muss durch Sonderumlagen oder erhöhtes Hausgeld ausgeglichen werden.",
    schritte: [
      { nr: 1, kontext: "Differenz zwischen Ausgaben und Einnahmen berechnen.", formel: "Differenz = Ausgaben − Einnahmen", variablen: [{ kuerzel: "A", bedeutung: "Ausgaben", wert: "36.000 €" }, { kuerzel: "E", bedeutung: "Einnahmen", wert: "33.600 €" }], aufgabe: "Unterdeckung (36.000 − 33.600):", einheit: "€", korrekt: 2400, toleranz: 0, tipp: "36.000 − 33.600 = 2.400 €" },
      { nr: 2, kontext: "Bei 8 gleichen Einheiten: Anteil je Eigentümer.", formel: "Anteil = Unterdeckung ÷ Anzahl Einheiten", variablen: [{ kuerzel: "U", bedeutung: "Unterdeckung", wert: "2.400 €" }], aufgabe: "Nachzahlung je Eigentümer (2.400 ÷ 8):", einheit: "€", korrekt: 300, toleranz: 0, tipp: "2.400 ÷ 8 = 300 €" }
    ],
    abschluss: "Jeder Eigentümer muss 300 € nachzahlen. Das monatliche Hausgeld sollte für das Folgejahr angepasst werden.",
    gesetze: ["§28 WEG", "§16 WEG"],
    praxistipp: "Verwalter sollten das Hausgeld realistisch kalkulieren und lieber leicht zu hoch ansetzen. Nachzahlungen erzeugen Unmut unter Eigentümern und erhöhen den Verwaltungsaufwand."
  },
  {
    id: 18,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Bruttomietrendite vs. Nettomietrendite",
    berufssituation: "Eine Wohnung kostet 300.000 €. Jahreskaltmiete: 12.000 €. Jährliche Bewirtschaftungskosten: 1.800 €. Was sind Brutto- und Nettomietrendite?",
    was_lerne_ich: "Die Bruttomietrendite ignoriert Kosten. Die Nettomietrendite ist realistischer — sie zeigt was nach Abzug der Bewirtschaftungskosten bleibt.",
    schritte: [
      { nr: 1, kontext: "Bruttomietrendite: nur Miete geteilt durch Kaufpreis.", formel: "Brutto = Jahreskaltmiete ÷ Kaufpreis × 100", variablen: [{ kuerzel: "JKM", bedeutung: "12.000 €" }, { kuerzel: "KP", bedeutung: "300.000 €" }], aufgabe: "Bruttomietrendite (12.000 ÷ 300.000 × 100):", einheit: "%", korrekt: 4, toleranz: 0.05, tipp: "12.000 ÷ 300.000 = 0,04 × 100 = 4%" },
      { nr: 2, kontext: "Jahresreinertrag = Kaltmiete minus Bewirtschaftungskosten.", formel: "JRE = 12.000 − 1.800", variablen: [], aufgabe: "Jahresreinertrag (12.000 − 1.800):", einheit: "€", korrekt: 10200, toleranz: 0, tipp: "12.000 − 1.800 = 10.200 €" },
      { nr: 3, kontext: "Nettomietrendite mit Jahresreinertrag.", formel: "Netto = JRE ÷ Kaufpreis × 100", variablen: [{ kuerzel: "JRE", bedeutung: "10.200 €" }], aufgabe: "Nettomietrendite (10.200 ÷ 300.000 × 100):", einheit: "%", korrekt: 3.4, toleranz: 0.05, tipp: "10.200 ÷ 300.000 = 0,034 × 100 = 3,4%" }
    ],
    abschluss: "Bruttomietrendite: 4,0%. Nettomietrendite: 3,4%. Der Unterschied von 0,6 Prozentpunkten entspricht 1.800 € jährlichen Kosten.",
    gesetze: ["ImmoWertV", "§535 BGB"],
    praxistipp: "Bewirtschaftungskosten umfassen Verwaltung, Instandhaltung, Mietausfall-Wagnis und nicht umlagefähige Betriebskosten — typisch 15-25% der Kaltmiete."
  },
  {
    id: 19,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Welcher Kaufpreis ist maximal vertretbar?",
    berufssituation: "Ein Investor will mindestens 4,5% Nettomietrendite. Die Jahresnettomiete beträgt 18.000 €. Was darf das Objekt maximal kosten?",
    was_lerne_ich: "Aus der Mindestrendite lässt sich der maximale Kaufpreis ableiten. Das ist die Grundlage für Preisverhandlungen und Investitionsentscheidungen.",
    schritte: [
      { nr: 1, kontext: "Formel umstellen: Kaufpreis = Jahresnettomiete ÷ Mindestrendite × 100.", formel: "Max. KP = JNM ÷ Mindestrendite × 100", variablen: [{ kuerzel: "JNM", bedeutung: "18.000 €" }, { kuerzel: "r", bedeutung: "4,5%" }], aufgabe: "Max. Kaufpreis (18.000 ÷ 4,5 × 100):", einheit: "€", korrekt: 400000, toleranz: 100, tipp: "18.000 ÷ 0,045 = 400.000 €" }
    ],
    abschluss: "Bei 4,5% Mindestrendite darf das Objekt maximal 400.000 € kosten.",
    gesetze: ["ImmoWertV"],
    praxistipp: "Diese Berechnung zeigt dem Investor sofort ob ein Angebotspreis zu hoch ist. Liegt der Angebotspreis bei 450.000 €, ist die Rendite nur 4% — unter seiner Mindestanforderung."
  },
  {
    id: 20,
    bereich: "Wertermittlung",
    titel: "Vergleichswert berechnen",
    berufssituation: "Sie bewerten eine 75 m² Eigentumswohnung. Der Gutachterausschuss nennt einen Vergleichswert von 4.200 €/m² für vergleichbare Objekte in der Lage.",
    was_lerne_ich: "Das Vergleichswertverfahren ist das direkteste Verfahren. Es nutzt echte Marktdaten aus der Kaufpreissammlung des Gutachterausschusses.",
    schritte: [
      { nr: 1, kontext: "Vergleichswert = Wohnfläche × Vergleichspreis je m².", formel: "Vergleichswert = Fläche × Preis/m²", variablen: [{ kuerzel: "F", bedeutung: "Wohnfläche", wert: "75 m²" }, { kuerzel: "P", bedeutung: "Vergleichspreis", wert: "4.200 €/m²" }], aufgabe: "Vergleichswert (75 × 4.200):", einheit: "€", korrekt: 315000, toleranz: 0, tipp: "75 × 4.200 = 315.000 €" }
    ],
    abschluss: "Der Vergleichswert beträgt 315.000 €. Dieser Wert gilt als Ausgangspunkt — individuelle Merkmale (Lage im Haus, Zustand, Ausstattung) können ihn nach oben oder unten anpassen.",
    gesetze: ["ImmoWertV §15", "§194 BauGB"],
    praxistipp: "Das Vergleichswertverfahren ist nur möglich wenn ausreichend Vergleichsdaten vorliegen. Bei Eigentumswohnungen in Städten ist das meist der Fall — bei Spezialimmobilien oft nicht."
  },
  {
    id: 21,
    bereich: "Wertermittlung",
    titel: "Sachwert berechnen",
    berufssituation: "Ein freistehendes Einfamilienhaus: Bodenwert 120.000 €, Gebäude-Herstellungskosten 280.000 €, Alterswertminderung 15%. Was ist der Sachwert?",
    was_lerne_ich: "Das Sachwertverfahren berechnet was es kosten würde das Objekt neu zu errichten — abzüglich Alterswertminderung. Es wird vor allem bei selbstgenutzten Immobilien angewandt.",
    schritte: [
      { nr: 1, kontext: "Alterswertminderung vom Gebäudewert abziehen.", formel: "Gebäude nach AWM = HK × (1 − AWM%÷100)", variablen: [{ kuerzel: "HK", bedeutung: "Herstellungskosten", wert: "280.000 €" }, { kuerzel: "AWM", bedeutung: "15%" }], aufgabe: "Gebäudewert nach Minderung (280.000 × 0,85):", einheit: "€", korrekt: 238000, toleranz: 0, tipp: "280.000 × 0,85 = 238.000 €" },
      { nr: 2, kontext: "Sachwert = Bodenwert + Gebäudewert nach Alterswertminderung.", formel: "Sachwert = Bodenwert + Gebäudewert", variablen: [{ kuerzel: "BW", bedeutung: "120.000 €" }, { kuerzel: "GW", bedeutung: "238.000 €" }], aufgabe: "Sachwert (120.000 + 238.000):", einheit: "€", korrekt: 358000, toleranz: 0, tipp: "120.000 + 238.000 = 358.000 €" }
    ],
    abschluss: "Der Sachwert beträgt 358.000 €. Beachten Sie: Der Sachwert wird noch mit dem Sachwertfaktor des Gutachterausschusses multipliziert um den Marktwert zu ermitteln.",
    gesetze: ["ImmoWertV §21", "ImmoWertV §35", "§194 BauGB"],
    praxistipp: "Der Sachwert ist kein Kaufpreis. Durch Multiplikation mit dem Sachwertfaktor (marktspezifisch, meist 0,8-1,4) wird der vorläufige Sachwert zum Marktwert."
  },
  {
    id: 22,
    bereich: "Wertermittlung",
    titel: "Liegenschaftszins und Vervielfältiger",
    berufssituation: "Für ein Bürogebäude beträgt der Liegenschaftszinssatz 5,5%. Die Restnutzungsdauer ist 25 Jahre. Der Vervielfältiger aus der Tabelle beträgt 13,4. Jahresreinertrag: 85.000 €. Was ist der Ertragswert?",
    was_lerne_ich: "Der Vervielfältiger ist das Herzstück des Ertragswertverfahrens. Er hängt von Liegenschaftszins und Restnutzungsdauer ab und wird aus Tabellen entnommen.",
    schritte: [
      { nr: 1, kontext: "Ertragswert = Jahresreinertrag × Vervielfältiger.", formel: "Ertragswert = JRE × V", variablen: [{ kuerzel: "JRE", bedeutung: "85.000 €" }, { kuerzel: "V", bedeutung: "13,4" }], aufgabe: "Ertragswert (85.000 × 13,4):", einheit: "€", korrekt: 1139000, toleranz: 500, tipp: "85.000 × 13,4 = 1.139.000 €" }
    ],
    abschluss: "Der Ertragswert des Bürogebäudes beträgt 1.139.000 €.",
    gesetze: ["ImmoWertV §17", "ImmoWertV §20"],
    praxistipp: "Höherer Liegenschaftszins = niedrigerer Vervielfältiger = niedrigerer Ertragswert. Gewerbeimmobilien haben höhere Liegenschaftszinssätze als Wohnimmobilien — sie gelten als riskanter."
  },
  {
    id: 23,
    bereich: "AfA & Steuervorteile",
    titel: "Neubau AfA ab 2023",
    berufssituation: "Frau Weber kauft eine neue Eigentumswohnung als Kapitalanlage. Kaufpreis 480.000 €, davon Gebäudeanteil 380.000 €. Baujahr 2024. AfA-Satz: 3% p.a. Was spart sie jährlich (Steuersatz 35%)?",
    was_lerne_ich: "Für Neubauten ab 2023 gilt der erhöhte AfA-Satz von 3% p.a. Das ist ein wichtiger Steuervorteil gegenüber Bestandsimmobilien mit 2% p.a.",
    schritte: [
      { nr: 1, kontext: "Jährliche AfA auf den Gebäudeanteil.", formel: "AfA = Gebäudeanteil × 3 ÷ 100", variablen: [{ kuerzel: "GA", bedeutung: "380.000 €" }], aufgabe: "Jährliche AfA (380.000 × 3 ÷ 100):", einheit: "€", korrekt: 11400, toleranz: 0, tipp: "380.000 × 0,03 = 11.400 €" },
      { nr: 2, kontext: "Steuerersparnis = AfA × Steuersatz.", formel: "Ersparnis = 11.400 × 35 ÷ 100", variablen: [], aufgabe: "Steuerersparnis (11.400 × 35 ÷ 100):", einheit: "€", korrekt: 3990, toleranz: 1, tipp: "11.400 × 0,35 = 3.990 €" }
    ],
    abschluss: "Frau Weber spart jährlich 3.990 € Steuern durch die Neubau-AfA.",
    gesetze: ["§7 EStG Abs. 4", "§21 EStG"],
    praxistipp: "3% statt 2% AfA bedeutet 50% mehr Steuerersparnis bei Neubauten. Über 33 Jahre (statt 50) ist der Gebäudeanteil vollständig abgeschrieben."
  },
  {
    id: 24,
    bereich: "AfA & Steuervorteile",
    titel: "Werbungskosten berechnen",
    berufssituation: "Herr Klein vermietet eine Wohnung. Einnahmen: 14.400 € p.a. Kosten: AfA 6.000 €, Zinsen 4.800 €, nicht umlagefähige Nebenkosten 1.200 €, Verwaltung 600 €. Was ist sein steuerlicher Überschuss?",
    was_lerne_ich: "Bei Vermietung werden alle Werbungskosten von den Mieteinnahmen abgezogen. Nur der verbleibende Überschuss wird versteuert — oder ein Verlust mindert andere Einkünfte.",
    schritte: [
      { nr: 1, kontext: "Alle Werbungskosten zusammenrechnen.", formel: "Werbungskosten = AfA + Zinsen + Nebenkosten + Verwaltung", variablen: [], aufgabe: "Werbungskosten gesamt (6.000 + 4.800 + 1.200 + 600):", einheit: "€", korrekt: 12600, toleranz: 0, tipp: "6.000 + 4.800 + 1.200 + 600 = 12.600 €" },
      { nr: 2, kontext: "Überschuss = Einnahmen minus Werbungskosten.", formel: "Überschuss = 14.400 − 12.600", variablen: [], aufgabe: "Steuerlicher Überschuss (14.400 − 12.600):", einheit: "€", korrekt: 1800, toleranz: 0, tipp: "14.400 − 12.600 = 1.800 €" }
    ],
    abschluss: "Herr Klein versteuert nur 1.800 € — trotz 14.400 € Mieteinnahmen.",
    gesetze: ["§9 EStG", "§21 EStG", "§7 EStG"],
    praxistipp: "Wenn Werbungskosten die Einnahmen übersteigen, entsteht ein Verlust aus Vermietung. Dieser kann mit anderen Einkünften (z.B. Gehalt) verrechnet werden — das ist der sogenannte negative Cashflow als Steuerstrategie."
  },
  {
    id: 25,
    bereich: "Maklercourtage & Provision",
    titel: "Provisionsaufteilung bei Gewerbeimmobilie",
    berufssituation: "Sie vermitteln ein Bürogebäude für 2.500.000 €. Verkäufer zahlt 2% zzgl. MwSt., Käufer zahlt 2% zzgl. MwSt. Berechnen Sie beide Provisionen und die Gesamtprovision.",
    was_lerne_ich: "Bei Gewerbeimmobilien gilt §656c BGB nicht — Käufer und Verkäufer können unterschiedliche Provisionssätze zahlen. MwSt. wird immer separat ausgewiesen.",
    schritte: [
      { nr: 1, kontext: "Provision Verkäufer: 2% netto + 19% MwSt.", formel: "Netto = KP × 2%  |  Brutto = Netto × 1,19", variablen: [{ kuerzel: "KP", bedeutung: "2.500.000 €" }], aufgabe: "Provision Verkäufer brutto (2.500.000 × 2% × 1,19):", einheit: "€", korrekt: 59500, toleranz: 10, tipp: "2.500.000 × 0,02 = 50.000 × 1,19 = 59.500 €" },
      { nr: 2, kontext: "Provision Käufer: gleicher Satz.", aufgabe: "Provision Käufer brutto:", formel: "= Provision Verkäufer", variablen: [], einheit: "€", korrekt: 59500, toleranz: 10, tipp: "Gleicher Satz: 59.500 €" },
      { nr: 3, kontext: "Gesamtprovision des Maklers.", formel: "Gesamt = Verkäufer + Käufer", variablen: [], aufgabe: "Gesamtprovision (59.500 + 59.500):", einheit: "€", korrekt: 119000, toleranz: 10, tipp: "59.500 + 59.500 = 119.000 €" }
    ],
    abschluss: "Ihre Gesamtprovision beträgt 119.000 € brutto (100.000 € netto + 19.000 € MwSt.).",
    gesetze: ["§652 BGB", "§654 BGB"],
    praxistipp: "Bei Gewerbeimmobilien sind höhere Provisionen üblich — oft 3-5% je Seite. Die Rechnung wird stets netto + MwSt. ausgestellt da Unternehmen die Vorsteuer abziehen können."
  },
  {
    id: 26,
    bereich: "Maklercourtage & Provision",
    titel: "Mindestprovision bei Niedrigpreisen",
    berufssituation: "Sie verkaufen ein Gartenhaus für 45.000 €. Ihr üblicher Provisionssatz ist 3,57%. Der errechnete Betrag erscheint Ihnen zu gering. Was ergibt sich und was ist zu beachten?",
    was_lerne_ich: "Bei niedrigen Kaufpreisen ergibt ein prozentualer Satz oft unwirtschaftliche Beträge. Viele Makler vereinbaren daher Mindestprovisionen.",
    schritte: [
      { nr: 1, kontext: "Courtage nach Prozentsatz.", formel: "C = 45.000 × 3,57 ÷ 100", variablen: [], aufgabe: "Courtage nach Satz (45.000 × 3,57 ÷ 100):", einheit: "€", korrekt: 1606.50, toleranz: 5, tipp: "45.000 × 0,0357 = 1.606,50 €" }
    ],
    abschluss: "Die Courtage beträgt 1.606,50 €. Bei einem Arbeitsaufwand von oft 40-80 Stunden für eine Vermittlung ist das unwirtschaftlich. Viele Makler vereinbaren daher eine Mindestprovision von 3.000-5.000 €.",
    gesetze: ["§652 BGB", "§138 BGB"],
    praxistipp: "Eine Mindestprovision muss im Maklervertrag vereinbart werden. Sie ist zulässig sofern sie nicht sittenwidrig überhöht ist (§138 BGB). Üblich: 3.000-5.000 € je nach Region."
  },
  {
    id: 27,
    bereich: "Annuität & Tilgung",
    titel: "Vorfälligkeitsentschädigung verstehen",
    berufssituation: "Frau Schulz möchte ihr Darlehen (Restschuld 180.000 €, Zinssatz 4%, noch 5 Jahre Laufzeit) vorzeitig ablösen. Die Bank berechnet eine VFE von 2% der Restschuld. Was zahlt sie?",
    was_lerne_ich: "Die Vorfälligkeitsentschädigung (VFE) entschädigt die Bank für entgangene Zinsen bei vorzeitiger Rückzahlung. Die genaue Berechnung ist komplex — hier eine vereinfachte Version.",
    schritte: [
      { nr: 1, kontext: "Vereinfachte VFE: Restschuld × Strafzins.", formel: "VFE = Restschuld × 2 ÷ 100", variablen: [{ kuerzel: "RS", bedeutung: "180.000 €" }], aufgabe: "VFE (180.000 × 2 ÷ 100):", einheit: "€", korrekt: 3600, toleranz: 0, tipp: "180.000 × 0,02 = 3.600 €" },
      { nr: 2, kontext: "Gesamtablösebetrag = Restschuld + VFE.", formel: "Ablöse = 180.000 + 3.600", variablen: [], aufgabe: "Gesamtablösebetrag (180.000 + 3.600):", einheit: "€", korrekt: 183600, toleranz: 0, tipp: "180.000 + 3.600 = 183.600 €" }
    ],
    abschluss: "Frau Schulz zahlt insgesamt 183.600 € für die vorzeitige Ablösung.",
    gesetze: ["§502 BGB", "§500 BGB", "§34i GewO"],
    praxistipp: "Die echte VFE-Berechnung nach BGH-Methode berücksichtigt Wiederanlagezins, Restlaufzeit und Disagio. Bei Darlehen über 10 Jahren gilt: nach 10 Jahren kann mit 6 Monaten Frist kostenlos gekündigt werden (§489 BGB)."
  },
  {
    id: 28,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Sonderumlage berechnen",
    berufssituation: "Das Dach der WEG (12 Einheiten, gleiche MEA) muss saniert werden. Kosten: 96.000 €. Die Rücklage deckt nur 60.000 €. Eine Sonderumlage wird beschlossen. Was zahlt jeder Eigentümer?",
    was_lerne_ich: "Wenn die Instandhaltungsrücklage nicht ausreicht, beschließt die Eigentümerversammlung eine Sonderumlage. Sie wird nach MEA auf alle Eigentümer verteilt.",
    schritte: [
      { nr: 1, kontext: "Fehlbetrag = Gesamtkosten minus verfügbare Rücklage.", formel: "Fehlbetrag = 96.000 − 60.000", variablen: [], aufgabe: "Fehlbetrag (96.000 − 60.000):", einheit: "€", korrekt: 36000, toleranz: 0, tipp: "96.000 − 60.000 = 36.000 €" },
      { nr: 2, kontext: "Anteil je Eigentümer bei 12 gleichen Anteilen.", formel: "Anteil = 36.000 ÷ 12", variablen: [], aufgabe: "Sonderumlage je Eigentümer (36.000 ÷ 12):", einheit: "€", korrekt: 3000, toleranz: 0, tipp: "36.000 ÷ 12 = 3.000 €" }
    ],
    abschluss: "Jeder Eigentümer zahlt eine Sonderumlage von 3.000 €.",
    gesetze: ["§28 WEG", "§19 WEG", "§16 WEG"],
    praxistipp: "Sonderumlagen können die Eigentümer finanziell stark belasten. Eine ausreichende Instandhaltungsrücklage vermeidet solche Überraschungen. Kaufinteressenten sollten immer den Rücklagenstand prüfen."
  },
  {
    id: 29,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Cashflow-Analyse",
    berufssituation: "Eine Wohnung (200.000 €, Eigenkapital 40.000 €) erzielt 800 € Kaltmiete pro Monat. Kreditrate: 650 €/Monat, Verwaltung + Rücklage: 80 €/Monat. Wie hoch ist der monatliche Cashflow?",
    was_lerne_ich: "Der Cashflow zeigt ob eine Immobilie monatlich Geld bringt oder kostet. Positiver Cashflow bedeutet Einnahmen übersteigen alle Ausgaben.",
    schritte: [
      { nr: 1, kontext: "Monatliche Gesamtausgaben zusammenrechnen.", formel: "Ausgaben = Kredit + Verwaltung + Rücklage", variablen: [{ kuerzel: "K", bedeutung: "Kreditrate", wert: "650 €" }, { kuerzel: "V+R", bedeutung: "80 €" }], aufgabe: "Monatliche Ausgaben (650 + 80):", einheit: "€", korrekt: 730, toleranz: 0, tipp: "650 + 80 = 730 €" },
      { nr: 2, kontext: "Cashflow = Einnahmen minus Ausgaben.", formel: "Cashflow = 800 − 730", variablen: [], aufgabe: "Monatlicher Cashflow (800 − 730):", einheit: "€", korrekt: 70, toleranz: 0, tipp: "800 − 730 = 70 €" }
    ],
    abschluss: "Der monatliche Cashflow beträgt +70 €. Die Immobilie trägt sich selbst und bringt zusätzlich 840 € jährlich.",
    gesetze: ["§535 BGB"],
    praxistipp: "Ein knapper positiver Cashflow ist riskant. Leerstand, Reparaturen oder steigende Zinsen können ihn schnell negativ machen. Experten empfehlen mindestens 100-200 € Puffer pro Monat."
  },
  {
    id: 30,
    bereich: "AfA & Steuervorteile",
    titel: "Denkmal-AfA berechnen",
    berufssituation: "Herr Richter kauft ein denkmalgeschütztes Gebäude und investiert 200.000 € in Sanierungskosten. Denkmal-AfA: 9% in den ersten 8 Jahren, dann 7% für 4 Jahre. Was bekommt er im ersten Jahr?",
    was_lerne_ich: "Die Denkmal-AfA nach §7i EStG ist deutlich höher als normale Gebäude-AfA. Sie gilt nur für Sanierungskosten, nicht den Kaufpreis.",
    schritte: [
      { nr: 1, kontext: "AfA Jahr 1: 9% auf die Sanierungskosten.", formel: "AfA Jahr 1 = 200.000 × 9 ÷ 100", variablen: [{ kuerzel: "SK", bedeutung: "Sanierungskosten", wert: "200.000 €" }], aufgabe: "Denkmal-AfA Jahr 1 (200.000 × 9 ÷ 100):", einheit: "€", korrekt: 18000, toleranz: 0, tipp: "200.000 × 0,09 = 18.000 €" },
      { nr: 2, kontext: "Steuerersparnis bei Steuersatz 42%.", formel: "Ersparnis = 18.000 × 42 ÷ 100", variablen: [], aufgabe: "Steuerersparnis Jahr 1 (18.000 × 42 ÷ 100):", einheit: "€", korrekt: 7560, toleranz: 1, tipp: "18.000 × 0,42 = 7.560 €" }
    ],
    abschluss: "Herr Richter spart im ersten Jahr 7.560 € Steuern. Über 8 Jahre: 60.480 €, über 12 Jahre noch mehr.",
    gesetze: ["§7i EStG", "§7h EStG", "§21 EStG"],
    praxistipp: "Denkmalimmobilien bieten enorme Steuervorteile aber erhöhte Risiken: Auflagen der Denkmalbehörde, unvorhergesehene Sanierungskosten und eingeschränkte Gestaltungsfreiheit."
  },
  {
    id: 31,
    bereich: "Maklercourtage & Provision",
    titel: "Jahresumsatz eines Maklerbüros",
    berufssituation: "Ihr Maklerbüro hat im Jahr 24 Verkäufe abgeschlossen. Durchschnittlicher Kaufpreis: 350.000 €. Durchschnittliche Provision: 3,57% vom Käufer. Wie hoch ist Ihr Jahresumsatz?",
    was_lerne_ich: "Umsatz ist nicht Gewinn. Aber der Umsatz zeigt die Größenordnung des Geschäfts und ist Grundlage für Businessplanung.",
    schritte: [
      { nr: 1, kontext: "Durchschnittsprovision je Transaktion.", formel: "Provision je Deal = 350.000 × 3,57 ÷ 100", variablen: [], aufgabe: "Provision je Verkauf (350.000 × 3,57 ÷ 100):", einheit: "€", korrekt: 12495, toleranz: 10, tipp: "350.000 × 0,0357 = 12.495 €" },
      { nr: 2, kontext: "Jahresumsatz = Provision × Anzahl Deals.", formel: "Umsatz = 12.495 × 24", variablen: [], aufgabe: "Jahresumsatz (12.495 × 24):", einheit: "€", korrekt: 299880, toleranz: 100, tipp: "12.495 × 24 = 299.880 €" }
    ],
    abschluss: "Ihr Jahresumsatz beträgt ca. 299.880 €. Bei ca. 30-40% Kostenquote bleibt ein Gewinn von ca. 180.000-210.000 €.",
    gesetze: ["§652 BGB"],
    praxistipp: "Top-Makler in Großstädten erzielen 20-50 Transaktionen pro Jahr. Entscheidend für die Rentabilität sind Wiederkäufer, Empfehlungen und effizientes Marketing."
  },
  {
    id: 32,
    bereich: "Wertermittlung",
    titel: "Bodenwert aus Bodenrichtwert",
    berufssituation: "Ein Grundstück in Berlin hat 600 m² Fläche. Der Bodenrichtwert des Gutachterausschusses beträgt 850 €/m². Wie hoch ist der Bodenwert?",
    was_lerne_ich: "Der Bodenrichtwert ist der durchschnittliche Lagewert von Grundstücken in einer Zone. Er ist öffentlich zugänglich und bildet die Grundlage für viele Berechnungen.",
    schritte: [
      { nr: 1, kontext: "Bodenwert = Grundstücksfläche × Bodenrichtwert.", formel: "BW = Fläche × BRW/m²", variablen: [{ kuerzel: "F", bedeutung: "600 m²" }, { kuerzel: "BRW", bedeutung: "850 €/m²" }], aufgabe: "Bodenwert (600 × 850):", einheit: "€", korrekt: 510000, toleranz: 0, tipp: "600 × 850 = 510.000 €" }
    ],
    abschluss: "Der Bodenwert beträgt 510.000 €. Dieser Wert fließt in Sachwert- und Ertragswertberechnungen ein.",
    gesetze: ["§196 BauGB", "ImmoWertV §16"],
    praxistipp: "Bodenrichtwerte sind online abrufbar (BORIS-D). Sie werden vom Gutachterausschuss mindestens alle 2 Jahre aktualisiert und spiegeln Markttrends wider."
  },
  {
    id: 33,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Wirtschaftsplan aufstellen",
    berufssituation: "Sie erstellen den Wirtschaftsplan für eine WEG (6 Einheiten, gleiche MEA). Geplante Kosten: Hausmeister 4.800 €, Versicherung 1.800 €, Strom Gemeinschaft 600 €, Verwaltung 2.400 €, Rücklage 3.600 €. Was zahlt jeder Eigentümer monatlich?",
    was_lerne_ich: "Der Wirtschaftsplan ist die vorausschauende Jahresplanung der WEG-Ausgaben. Aus ihm leitet sich das monatliche Hausgeld ab.",
    schritte: [
      { nr: 1, kontext: "Alle geplanten Jahreskosten addieren.", formel: "Gesamt = Hausmeister + Vers. + Strom + Verw. + Rücklage", variablen: [], aufgabe: "Gesamtjahreskosten (4.800 + 1.800 + 600 + 2.400 + 3.600):", einheit: "€", korrekt: 13200, toleranz: 0, tipp: "4.800 + 1.800 + 600 + 2.400 + 3.600 = 13.200 €" },
      { nr: 2, kontext: "Jahresanteil je Eigentümer bei 6 gleichen MEA.", formel: "Jahresanteil = 13.200 ÷ 6", variablen: [], aufgabe: "Jahresanteil je Eigentümer (13.200 ÷ 6):", einheit: "€", korrekt: 2200, toleranz: 0, tipp: "13.200 ÷ 6 = 2.200 €" },
      { nr: 3, kontext: "Monatliches Hausgeld = Jahresanteil ÷ 12.", formel: "Hausgeld monatlich = 2.200 ÷ 12", variablen: [], aufgabe: "Monatliches Hausgeld (2.200 ÷ 12):", einheit: "€", korrekt: 183.33, toleranz: 1, tipp: "2.200 ÷ 12 = 183,33 €" }
    ],
    abschluss: "Jeder Eigentümer zahlt 183,33 € monatliches Hausgeld.",
    gesetze: ["§28 WEG", "§19 WEG"],
    praxistipp: "Der Wirtschaftsplan muss von der Eigentümerversammlung beschlossen werden (§28 WEG). Er dient als Grundlage für die spätere Jahresabrechnung."
  },
  {
    id: 34,
    bereich: "AfA & Steuervorteile",
    titel: "Steuerfreier Verkaufsgewinn",
    berufssituation: "Frau Maier kaufte 2015 eine Wohnung für 200.000 € und verkauft sie 2026 für 350.000 €. Ist der Gewinn steuerpflichtig?",
    was_lerne_ich: "Private Veräußerungsgewinne bei Immobilien sind nach 10 Jahren steuerfrei. Das ist einer der wichtigsten Steuervorteile für private Immobilieninvestoren.",
    schritte: [
      { nr: 1, kontext: "Haltedauer berechnen.", formel: "Haltedauer = Verkaufsjahr − Kaufjahr", variablen: [{ kuerzel: "VJ", bedeutung: "2026" }, { kuerzel: "KJ", bedeutung: "2015" }], aufgabe: "Haltedauer in Jahren (2026 − 2015):", einheit: "Jahre", korrekt: 11, toleranz: 0, tipp: "2026 − 2015 = 11 Jahre" },
      { nr: 2, kontext: "Veräußerungsgewinn berechnen.", formel: "Gewinn = Verkaufspreis − Kaufpreis", variablen: [], aufgabe: "Gewinn (350.000 − 200.000):", einheit: "€", korrekt: 150000, toleranz: 0, tipp: "350.000 − 200.000 = 150.000 €" }
    ],
    abschluss: "Da die Haltedauer 11 Jahre beträgt (> 10 Jahre), ist der Gewinn von 150.000 € komplett steuerfrei.",
    gesetze: ["§23 EStG", "§22 EStG"],
    praxistipp: "Die 10-Jahres-Frist läuft ab dem Kaufvertragsdatum. Ausnahme: Selbstgenutzte Immobilien sind sofort steuerfrei wenn sie im Verkaufsjahr und den zwei Vorjahren selbst bewohnt wurden."
  },
  {
    id: 35,
    bereich: "Wertermittlung",
    titel: "Mietmultiplikator im Vergleich",
    berufssituation: "Zwei Objekte: Objekt A kostet 420.000 € bei 1.400 € Monatsmiete. Objekt B kostet 480.000 € bei 1.800 € Monatsmiete. Welches ist günstiger bewertet?",
    was_lerne_ich: "Der Mietmultiplikator (Kaufpreis ÷ Jahresmiete) ist ein schneller Vergleichsmaßstab. Je niedriger, desto günstiger ist das Objekt im Verhältnis zur Miete.",
    schritte: [
      { nr: 1, kontext: "Jahreskaltmiete Objekt A berechnen.", formel: "JKM A = 1.400 × 12", variablen: [], aufgabe: "Jahreskaltmiete A (1.400 × 12):", einheit: "€", korrekt: 16800, toleranz: 0, tipp: "1.400 × 12 = 16.800 €" },
      { nr: 2, kontext: "Multiplikator Objekt A.", formel: "Mult. A = 420.000 ÷ 16.800", variablen: [], aufgabe: "Multiplikator A (420.000 ÷ 16.800):", einheit: "x", korrekt: 25, toleranz: 0.1, tipp: "420.000 ÷ 16.800 = 25" },
      { nr: 3, kontext: "Jahreskaltmiete Objekt B.", formel: "JKM B = 1.800 × 12", variablen: [], aufgabe: "Jahreskaltmiete B (1.800 × 12):", einheit: "€", korrekt: 21600, toleranz: 0, tipp: "1.800 × 12 = 21.600 €" },
      { nr: 4, kontext: "Multiplikator Objekt B.", formel: "Mult. B = 480.000 ÷ 21.600", variablen: [], aufgabe: "Multiplikator B (480.000 ÷ 21.600):", einheit: "x", korrekt: 22.22, toleranz: 0.1, tipp: "480.000 ÷ 21.600 = 22,22" }
    ],
    abschluss: "Objekt B hat den niedrigeren Multiplikator (22,2 vs. 25) und ist damit günstiger bewertet — bessere Rendite bei Objekt B.",
    gesetze: ["ImmoWertV"],
    praxistipp: "Niedriger Multiplikator = hohe Rendite = mehr Risiko. Hoher Multiplikator = niedrige Rendite = weniger Risiko (meist Toplage). Der Multiplikator ist kein Ersatz für eine vollständige Analyse."
  },
  {
    id: 36,
    bereich: "Kaufnebenkosten",
    titel: "Finanzierungskosten Gesamtüberblick",
    berufssituation: "Herr Jung kauft in Bayern für 320.000 €. Eigenkapital: 80.000 €. Nebenkosten: GrESt 3,5%, Notar 2%, Courtage 3,57%. Er finanziert den Rest zu 3,8% / 2% Tilgung. Was zahlt er monatlich und was sind die Gesamtnebenkosten?",
    was_lerne_ich: "Diese Aufgabe verbindet Kaufnebenkosten, Eigenkapitalbedarf und Finanzierung in einer vollständigen Berechnung — wie in der echten Beratungssituation.",
    schritte: [
      { nr: 1, kontext: "GrESt Bayern 3,5%.", formel: "GrESt = 320.000 × 3,5 ÷ 100", variablen: [], aufgabe: "GrESt (320.000 × 3,5 ÷ 100):", einheit: "€", korrekt: 11200, toleranz: 1, tipp: "320.000 × 0,035 = 11.200 €" },
      { nr: 2, kontext: "Notar + Grundbuch 2%.", formel: "Notar = 320.000 × 2 ÷ 100", variablen: [], aufgabe: "Notar (320.000 × 2 ÷ 100):", einheit: "€", korrekt: 6400, toleranz: 50, tipp: "320.000 × 0,02 = 6.400 €" },
      { nr: 3, kontext: "Courtage 3,57%.", formel: "Courtage = 320.000 × 3,57 ÷ 100", variablen: [], aufgabe: "Courtage (320.000 × 3,57 ÷ 100):", einheit: "€", korrekt: 11424, toleranz: 10, tipp: "320.000 × 0,0357 = 11.424 €" },
      { nr: 4, kontext: "Darlehensbetrag = KP + Nebenkosten − Eigenkapital.", formel: "D = 320.000 + 11.200 + 6.400 + 11.424 − 80.000", variablen: [], aufgabe: "Darlehensbetrag:", einheit: "€", korrekt: 269024, toleranz: 100, tipp: "349.024 − 80.000 = 269.024 €" },
      { nr: 5, kontext: "Monatliche Annuität.", formel: "Rate = D × (3,8 + 2) ÷ 100 ÷ 12", variablen: [], aufgabe: "Monatsrate ca. (269.024 × 5,8% ÷ 12):", einheit: "€", korrekt: 1300.95, toleranz: 20, tipp: "269.024 × 0,058 ÷ 12 = 1.300,95 €" }
    ],
    abschluss: "Herr Jung zahlt ca. 1.301 € monatlich. Gesamtnebenkosten: 29.024 €. Er braucht 80.000 € Eigenkapital für Nebenkosten und zusätzlich EK für den Beleihungsauslauf.",
    gesetze: ["GrEStG", "GNotKG", "§652 BGB", "§488 BGB"],
    praxistipp: "Diese Gesamtberechnung ist das Herzstück einer Immobilienberatung. Als Makler oder Darlehensvermittler müssen Sie Ihren Kunden alle Kosten transparent und vollständig darstellen."
  }


  ,{
    id: 37,
    bereich: "Maklercourtage & Provision",
    titel: "Innenprovision vs. Außenprovision",
    berufssituation: "Ein Bauträger zahlt Ihnen 3% Innenprovision auf den Verkaufspreis von 550.000 €. Zusätzlich vereinbaren Sie 1,19% Außenprovision vom Käufer. Wie viel verdienen Sie insgesamt?",
    was_lerne_ich: "Innenprovision zahlt der Verkäufer/Bauträger direkt — sie ist im Kaufpreis eingepreist. Außenprovision zahlt der Käufer zusätzlich. Beide zusammen ergeben Ihre Gesamtvergütung.",
    schritte: [
      { nr: 1, kontext: "Innenprovision vom Bauträger.", formel: "Innen = 550.000 × 3 ÷ 100", variablen: [], aufgabe: "Innenprovision (550.000 × 3 ÷ 100):", einheit: "€", korrekt: 16500, toleranz: 1, tipp: "550.000 × 0,03 = 16.500 €" },
      { nr: 2, kontext: "Außenprovision vom Käufer.", formel: "Außen = 550.000 × 1,19 ÷ 100", variablen: [], aufgabe: "Außenprovision (550.000 × 1,19 ÷ 100):", einheit: "€", korrekt: 6545, toleranz: 10, tipp: "550.000 × 0,0119 = 6.545 €" },
      { nr: 3, kontext: "Gesamtvergütung.", formel: "Gesamt = Innen + Außen", variablen: [], aufgabe: "Gesamtvergütung (16.500 + 6.545):", einheit: "€", korrekt: 23045, toleranz: 10, tipp: "16.500 + 6.545 = 23.045 €" }
    ],
    abschluss: "Ihre Gesamtvergütung beträgt 23.045 €.",
    gesetze: ["§652 BGB", "§656c BGB"],
    praxistipp: "Bei Neubauprojekten ist Innenprovision üblich. Der Käufer sieht sie nicht direkt, sie ist aber im Kaufpreis enthalten. Transparenz ist wichtig: seit 2021 muss die Provision im Exposé angegeben werden."
  },
  {
    id: 38,
    bereich: "Wertermittlung",
    titel: "Verkehrswert aus drei Verfahren",
    berufssituation: "Ein Gutachter ermittelt: Vergleichswert 380.000 €, Ertragswert 350.000 €, Sachwert 410.000 €. Wie bildet er den Verkehrswert? (Gewichtung: Vergleich 50%, Ertrag 30%, Sach 20%)",
    was_lerne_ich: "In der Praxis werden oft mehrere Verfahren kombiniert. Durch Gewichtung entsteht ein plausiblerer Verkehrswert als durch ein einzelnes Verfahren.",
    schritte: [
      { nr: 1, kontext: "Gewichteter Vergleichswert.", formel: "VW × 50% = 380.000 × 0,5", variablen: [], aufgabe: "Anteil Vergleichswert (380.000 × 0,5):", einheit: "€", korrekt: 190000, toleranz: 0, tipp: "380.000 × 0,5 = 190.000 €" },
      { nr: 2, kontext: "Gewichteter Ertragswert.", formel: "EW × 30% = 350.000 × 0,3", variablen: [], aufgabe: "Anteil Ertragswert (350.000 × 0,3):", einheit: "€", korrekt: 105000, toleranz: 0, tipp: "350.000 × 0,3 = 105.000 €" },
      { nr: 3, kontext: "Gewichteter Sachwert.", formel: "SW × 20% = 410.000 × 0,2", variablen: [], aufgabe: "Anteil Sachwert (410.000 × 0,2):", einheit: "€", korrekt: 82000, toleranz: 0, tipp: "410.000 × 0,2 = 82.000 €" },
      { nr: 4, kontext: "Verkehrswert als gewichteter Durchschnitt.", formel: "Verkehrswert = 190.000 + 105.000 + 82.000", variablen: [], aufgabe: "Verkehrswert (190.000 + 105.000 + 82.000):", einheit: "€", korrekt: 377000, toleranz: 0, tipp: "190.000 + 105.000 + 82.000 = 377.000 €" }
    ],
    abschluss: "Der gewichtete Verkehrswert beträgt 377.000 €.",
    gesetze: ["§194 BauGB", "ImmoWertV §8"],
    praxistipp: "Die Gewichtung der Verfahren ist Ermessenssache des Gutachters. Bei Renditeobjekten dominiert der Ertragswert, bei selbstgenutzten Immobilien der Sachwert, bei Standardobjekten der Vergleichswert."
  },
  {
    id: 39,
    bereich: "Annuität & Tilgung",
    titel: "KfW-Förderkredit einrechnen",
    berufssituation: "Herr Lange kauft für 400.000 € und erhält einen KfW-Kredit über 100.000 € zu 1,5% / 2% Tilgung. Den Rest finanziert er zu 3,8% / 2% Tilgung. Wie hoch sind die monatlichen Gesamtraten?",
    was_lerne_ich: "KfW-Kredite haben günstigere Zinssätze und werden separat berechnet. Die Gesamtbelastung ergibt sich aus beiden Raten zusammen.",
    schritte: [
      { nr: 1, kontext: "KfW-Rate: 100.000 € zu 1,5% + 2% Tilgung.", formel: "KfW-Rate = 100.000 × 3,5% ÷ 12", variablen: [], aufgabe: "KfW-Monatsrate (100.000 × 3,5 ÷ 100 ÷ 12):", einheit: "€", korrekt: 291.67, toleranz: 2, tipp: "100.000 × 0,035 ÷ 12 = 291,67 €" },
      { nr: 2, kontext: "Bankkredit: 300.000 € (400.000 − 100.000) zu 3,8% + 2% Tilgung.", formel: "Bank-Rate = 300.000 × 5,8% ÷ 12", variablen: [], aufgabe: "Bank-Monatsrate (300.000 × 5,8 ÷ 100 ÷ 12):", einheit: "€", korrekt: 1450, toleranz: 5, tipp: "300.000 × 0,058 ÷ 12 = 1.450 €" },
      { nr: 3, kontext: "Gesamtrate.", formel: "Gesamt = KfW + Bank", variablen: [], aufgabe: "Gesamte Monatsrate (291,67 + 1.450):", einheit: "€", korrekt: 1741.67, toleranz: 10, tipp: "291,67 + 1.450 = 1.741,67 €" }
    ],
    abschluss: "Herr Lange zahlt insgesamt 1.741,67 € monatlich. Der KfW-Kredit spart ihm gegenüber Vollfinanzierung zu 3,8% ca. 58 € pro Monat.",
    gesetze: ["§34i GewO", "KfW-Merkblatt", "EU-WIKR"],
    praxistipp: "KfW-Kredite müssen vor Baubeginn/Kaufvertragsschluss beantragt werden. Sie können mit Bankdarlehen kombiniert werden. Für Energieeffizienz gibt es zusätzliche Tilgungszuschüsse."
  },
  {
    id: 40,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Verwalterhonorar berechnen",
    berufssituation: "Sie sind WEG-Verwalter einer Anlage mit 20 Einheiten. Ihr Honorar beträgt 28 € je Einheit und Monat. Wie hoch ist Ihr Jahreshonorar und was kostet das je Eigentümer?",
    was_lerne_ich: "Das Verwalterhonorar ist ein wesentlicher Bestandteil des Hausgelds. Es wird nach Einheiten oder Wohnfläche berechnet und im Wirtschaftsplan ausgewiesen.",
    schritte: [
      { nr: 1, kontext: "Monatshonorar gesamt.", formel: "Monat = 28 × 20 Einheiten", variablen: [], aufgabe: "Monatshonorar gesamt (28 × 20):", einheit: "€", korrekt: 560, toleranz: 0, tipp: "28 × 20 = 560 €" },
      { nr: 2, kontext: "Jahreshonorar.", formel: "Jahr = 560 × 12", variablen: [], aufgabe: "Jahreshonorar (560 × 12):", einheit: "€", korrekt: 6720, toleranz: 0, tipp: "560 × 12 = 6.720 €" },
      { nr: 3, kontext: "Kosten je Eigentümer pro Jahr.", formel: "Je Eigentümer = 6.720 ÷ 20", variablen: [], aufgabe: "Jahreskosten je Eigentümer (6.720 ÷ 20):", einheit: "€", korrekt: 336, toleranz: 0, tipp: "6.720 ÷ 20 = 336 €" }
    ],
    abschluss: "Ihr Jahreshonorar beträgt 6.720 €. Jeder Eigentümer trägt 336 € davon.",
    gesetze: ["§26 WEG", "§27 WEG"],
    praxistipp: "Marktübliche Verwaltergebühren: 20-35 € je Einheit/Monat. Bei größeren Anlagen sinkt der Satz. Zusätzlich fallen Gebühren für Sonderleistungen an (z.B. Eigentümerversammlungen, Mahnwesen)."
  },
  {
    id: 41,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Eigenkapitalrendite berechnen",
    berufssituation: "Sie kaufen eine Wohnung für 250.000 € mit 50.000 € Eigenkapital. Jahresreinertrag nach Kosten und Zinsen: 3.600 €. Wie hoch ist Ihre Eigenkapitalrendite?",
    was_lerne_ich: "Die Eigenkapitalrendite zeigt die Verzinsung des eingesetzten Eigenkapitals. Sie ist höher als die Gesamtrendite wenn der Fremdkapitalzins unter der Objektrendite liegt — der Leverage-Effekt.",
    schritte: [
      { nr: 1, kontext: "Eigenkapitalrendite = Jahresreinertrag ÷ Eigenkapital × 100.", formel: "EKR = 3.600 ÷ 50.000 × 100", variablen: [{ kuerzel: "JRE", bedeutung: "3.600 €" }, { kuerzel: "EK", bedeutung: "50.000 €" }], aufgabe: "Eigenkapitalrendite (3.600 ÷ 50.000 × 100):", einheit: "%", korrekt: 7.2, toleranz: 0.1, tipp: "3.600 ÷ 50.000 = 0,072 × 100 = 7,2%" }
    ],
    abschluss: "Die Eigenkapitalrendite beträgt 7,2%. Das ist deutlich höher als die Gesamtrendite von 1,44% (3.600 ÷ 250.000).",
    gesetze: ["ImmoWertV"],
    praxistipp: "Der Leverage-Effekt: Fremdkapital hebelt die Eigenkapitalrendite nach oben — solange der Kreditzins unter der Objektrendite liegt. Bei steigenden Zinsen kann dieser Effekt auch negativ werden."
  },
  {
    id: 42,
    bereich: "AfA & Steuervorteile",
    titel: "Gesamte Steuerersparnis über Haltezeit",
    berufssituation: "Frau Berger kauft 2024 eine Wohnung. Gebäudeanteil 320.000 €, AfA-Satz 3% (Neubau), Steuersatz 42%. Sie hält die Immobilie 20 Jahre. Wie viel spart sie insgesamt?",
    was_lerne_ich: "Die kumulierte Steuerersparnis über die Haltezeit zeigt den echten Steuervorteil einer Immobilieninvestition — ein wichtiges Argument in der Beratung.",
    schritte: [
      { nr: 1, kontext: "Jährliche AfA.", formel: "AfA = 320.000 × 3 ÷ 100", variablen: [], aufgabe: "Jährliche AfA (320.000 × 3 ÷ 100):", einheit: "€", korrekt: 9600, toleranz: 0, tipp: "320.000 × 0,03 = 9.600 €" },
      { nr: 2, kontext: "Jährliche Steuerersparnis.", formel: "Ersparnis p.a. = 9.600 × 42 ÷ 100", variablen: [], aufgabe: "Steuerersparnis p.a. (9.600 × 42 ÷ 100):", einheit: "€", korrekt: 4032, toleranz: 1, tipp: "9.600 × 0,42 = 4.032 €" },
      { nr: 3, kontext: "Gesamtersparnis über 20 Jahre.", formel: "Gesamt = 4.032 × 20", variablen: [], aufgabe: "Gesamte Steuerersparnis (4.032 × 20):", einheit: "€", korrekt: 80640, toleranz: 10, tipp: "4.032 × 20 = 80.640 €" }
    ],
    abschluss: "Frau Berger spart über 20 Jahre insgesamt 80.640 € Steuern durch die AfA.",
    gesetze: ["§7 EStG", "§21 EStG"],
    praxistipp: "Bei 3% AfA ist der Gebäudeanteil nach 33 Jahren vollständig abgeschrieben. Danach entfällt der AfA-Vorteil. Viele Investoren verkaufen dann und reinvestieren in neue Objekte."
  },
  {
    id: 43,
    bereich: "Kaufnebenkosten",
    titel: "Notarkosten aus GNotKG berechnen",
    berufssituation: "Ein Kaufvertrag über 280.000 € wird beurkundet. Die Notargebühr beträgt 1,0% des Kaufpreises (vereinfacht). Hinzu kommt Grundbucheintragung mit 0,5%. Was zahlt der Käufer?",
    was_lerne_ich: "Notarkosten richten sich nach dem GNotKG (Gerichts- und Notarkostengesetz) und sind gesetzlich festgelegt — nicht verhandelbar. Sie sind nach Kaufpreis gestaffelt.",
    schritte: [
      { nr: 1, kontext: "Notargebühr für Beurkundung.", formel: "Notar = 280.000 × 1,0 ÷ 100", variablen: [], aufgabe: "Notargebühr (280.000 × 1,0 ÷ 100):", einheit: "€", korrekt: 2800, toleranz: 10, tipp: "280.000 × 0,01 = 2.800 €" },
      { nr: 2, kontext: "Grundbucheintragung.", formel: "Grundbuch = 280.000 × 0,5 ÷ 100", variablen: [], aufgabe: "Grundbucheintragung (280.000 × 0,5 ÷ 100):", einheit: "€", korrekt: 1400, toleranz: 10, tipp: "280.000 × 0,005 = 1.400 €" },
      { nr: 3, kontext: "Gesamtkosten Notar + Grundbuch.", formel: "Gesamt = 2.800 + 1.400", variablen: [], aufgabe: "Gesamtkosten (2.800 + 1.400):", einheit: "€", korrekt: 4200, toleranz: 20, tipp: "2.800 + 1.400 = 4.200 €" }
    ],
    abschluss: "Notar- und Grundbuchkosten betragen ca. 4.200 € — 1,5% des Kaufpreises.",
    gesetze: ["GNotKG", "GBO §13"],
    praxistipp: "Notarkosten sind nicht verhandelbar — sie sind gesetzlich im GNotKG geregelt. Wer Kosten sparen möchte, sollte den Kaufvertragsentwurf selbst mitbringen statt vom Notar erstellen zu lassen."
  },
  {
    id: 44,
    bereich: "Annuität & Tilgung",
    titel: "Tilgungsdauer berechnen",
    berufssituation: "Herr Braun hat ein Darlehen von 200.000 € zu 4% Zinsen. Er tilgt anfänglich 3% p.a. In wie vielen Jahren ist das Darlehen vollständig getilgt?",
    was_lerne_ich: "Die Tilgungsdauer zeigt wie lange man schuldet. Die vereinfachte Formel gibt einen guten Anhaltspunkt — die genaue Berechnung erfordert logarithmische Mathematik.",
    schritte: [
      { nr: 1, kontext: "Vereinfachte Formel: Jahre ≈ 100 ÷ (Tilgungssatz + Zinssatz × Tilgungsfaktor). Noch einfacher: 72 ÷ Tilgungssatz als grobe Faustregel.", formel: "Jahre ≈ 72 ÷ Tilgungssatz", variablen: [{ kuerzel: "t", bedeutung: "Tilgungssatz", wert: "3%" }], aufgabe: "Tilgungsdauer ca. (72 ÷ 3):", einheit: "Jahre", korrekt: 24, toleranz: 2, tipp: "72 ÷ 3 = 24 Jahre (Faustregel)" }
    ],
    abschluss: "Mit 3% anfänglicher Tilgung ist das Darlehen nach ca. 24 Jahren vollständig getilgt.",
    gesetze: ["§488 BGB"],
    praxistipp: "Die Regel 72: Teile 72 durch den Tilgungssatz um die ungefähre Laufzeit zu erhalten. Bei 1% Tilgung: 72 Jahre — deshalb empfehlen Experten mindestens 2-3% Anfangstilgung."
  },
  {
    id: 45,
    bereich: "Wertermittlung",
    titel: "Immobilienwert nach Renovierung",
    berufssituation: "Eine Wohnung hat einen aktuellen Wert von 280.000 €. Nach einer Renovierung (Kosten: 40.000 €) steigt die erzielbare Miete von 900 € auf 1.100 € monatlich. Wie verändert sich der Ertragswert? (Vervielfältiger 22)",
    was_lerne_ich: "Renovierungen können den Immobilienwert überproportional steigern wenn die Mieterhöhung den Vervielfältiger rechtfertigt. Diese Berechnung ist Grundlage für Investitionsentscheidungen.",
    schritte: [
      { nr: 1, kontext: "Jahresnettomiete vorher.", formel: "JNM vorher = 900 × 12", variablen: [], aufgabe: "Jahresnettomiete vorher (900 × 12):", einheit: "€", korrekt: 10800, toleranz: 0, tipp: "900 × 12 = 10.800 €" },
      { nr: 2, kontext: "Ertragswert vorher.", formel: "EW vorher = 10.800 × 22", variablen: [], aufgabe: "Ertragswert vorher (10.800 × 22):", einheit: "€", korrekt: 237600, toleranz: 0, tipp: "10.800 × 22 = 237.600 €" },
      { nr: 3, kontext: "Jahresnettomiete nachher.", formel: "JNM nachher = 1.100 × 12", variablen: [], aufgabe: "Jahresnettomiete nachher (1.100 × 12):", einheit: "€", korrekt: 13200, toleranz: 0, tipp: "1.100 × 12 = 13.200 €" },
      { nr: 4, kontext: "Ertragswert nachher.", formel: "EW nachher = 13.200 × 22", variablen: [], aufgabe: "Ertragswert nachher (13.200 × 22):", einheit: "€", korrekt: 290400, toleranz: 0, tipp: "13.200 × 22 = 290.400 €" },
      { nr: 5, kontext: "Wertsteigerung vs. Renovierungskosten.", formel: "Wertsteigerung = EW nachher − EW vorher", variablen: [], aufgabe: "Wertsteigerung (290.400 − 237.600):", einheit: "€", korrekt: 52800, toleranz: 0, tipp: "290.400 − 237.600 = 52.800 €" }
    ],
    abschluss: "Die Renovierung kostet 40.000 € und steigert den Wert um 52.800 €. Nettogewinn: 12.800 €.",
    gesetze: ["ImmoWertV §17", "§194 BauGB"],
    praxistipp: "Nicht jede Renovierung lohnt sich. Der Schlüssel ist die Mietsteigerung: Wenn die Wertsteigerung (Mieterhöhung × Vervielfältiger) die Renovierungskosten übersteigt, ist es rentabel."
  }

];

const BEREICHE = [...new Set(AUFGABEN.map(a => a.bereich))];

// ─── KI-ASSISTENT ────────────────────────────────────────────────────────────

interface KiNachricht { rolle: "user" | "assistant"; text: string }

function KiAssistent({ aufgabe }: { aufgabe: Aufgabe }) {
  const [offen, setOffen] = useState(false);
  const [nachrichten, setNachrichten] = useState<KiNachricht[]>([]);
  const [eingabe, setEingabe] = useState("");
  const [laden, setLaden] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [nachrichten]);

  const sende = async () => {
    if (!eingabe.trim() || laden) return;
    const frage = eingabe.trim();
    setEingabe("");
    setNachrichten(prev => [...prev, { rolle: "user", text: frage }]);
    setLaden(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Du bist ein geduldiger Lern-Assistent für Immobilienwirtschaft. Du erklärst Konzepte für Quereinsteiger — einfach, klar, ohne Fachjargon. Aktuelle Aufgabe: "${aufgabe.titel}" im Bereich "${aufgabe.bereich}". Kontext: ${aufgabe.berufssituation}. Antworte auf Deutsch, max. 4 Sätze, verständlich für absolute Anfänger.`,
          messages: [
            ...nachrichten.map(n => ({ role: n.rolle === "user" ? "user" : "assistant", content: n.text })),
            { role: "user", content: frage }
          ]
        })
      });
      const data = await res.json();
      const antwort = data.content?.[0]?.text || "Entschuldigung, ich konnte keine Antwort generieren.";
      setNachrichten(prev => [...prev, { rolle: "assistant", text: antwort }]);
    } catch {
      setNachrichten(prev => [...prev, { rolle: "assistant", text: "Verbindungsfehler. Bitte versuche es erneut." }]);
    }
    setLaden(false);
  };

  return (
    <div style={{ border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", overflow: "hidden" }}>
      <button onClick={() => setOffen(!offen)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 1.25rem", background: "var(--color-background-secondary)", border: "none", cursor: "pointer", color: "var(--color-text-primary)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <MessageCircle size={16} style={{ color: "var(--color-text-info)" }} aria-hidden="true" />
          <span style={{ fontSize: 14, fontWeight: 500 }}>Frage stellen — KI-Assistent</span>
          {nachrichten.length > 0 && <span style={{ fontSize: 11, background: "var(--color-background-info)", color: "var(--color-text-info)", borderRadius: "var(--border-radius-md)", padding: "2px 8px" }}>{nachrichten.filter(n => n.rolle === "user").length} Fragen</span>}
        </div>
        <ChevronDown size={16} style={{ transform: offen ? "rotate(180deg)" : "none", transition: "transform 0.2s", color: "var(--color-text-secondary)" }} aria-hidden="true" />
      </button>

      {offen && (
        <div style={{ padding: "1rem 1.25rem" }}>
          {nachrichten.length === 0 && (
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
              Haben Sie eine Frage zur Formel, zum Rechenweg oder zum Hintergrund? Fragen Sie einfach — ich erkläre es verständlich.
            </p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: nachrichten.length > 0 ? "1rem" : 0, maxHeight: 300, overflowY: "auto" }}>
            {nachrichten.map((n, i) => (
              <div key={i} style={{ display: "flex", justifyContent: n.rolle === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "85%", padding: "10px 14px", borderRadius: "var(--border-radius-md)", background: n.rolle === "user" ? "var(--color-background-info)" : "var(--color-background-secondary)", fontSize: 14, lineHeight: 1.6, color: "var(--color-text-primary)" }}>
                  {n.text}
                </div>
              </div>
            ))}
            {laden && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "10px 14px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", fontSize: 14, color: "var(--color-text-tertiary)" }}>
                  Denke nach...
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={eingabe} onChange={e => setEingabe(e.target.value)} onKeyDown={e => e.key === "Enter" && sende()} placeholder="Ihre Frage..." style={{ flex: 1, fontSize: 14 }} />
            <button onClick={sende} disabled={!eingabe.trim() || laden} style={{ padding: "8px 14px", borderRadius: "var(--border-radius-md)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
              <Send size={14} aria-hidden="true" /> Senden
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AUFGABEN-ANSICHT ─────────────────────────────────────────────────────────

function AufgabenAnsicht({ aufgabe, onZurueck }: { aufgabe: Aufgabe; onZurueck: () => void }) {
  const [antworten, setAntworten] = useState<Record<number, string>>({});
  const [status, setStatus] = useState<Record<number, "offen" | "richtig" | "falsch">>({});
  const [zeigeMusser, setZeigeMusser] = useState<Record<number, boolean>>({});
  const [abgeschlossen, setAbgeschlossen] = useState(false);

  const alleRichtig = aufgabe.schritte.every(s => status[s.nr] === "richtig");

  useEffect(() => {
    if (alleRichtig && !abgeschlossen) setAbgeschlossen(true);
  }, [alleRichtig]);

  const pruefe = (schritt: Schritt) => {
    const eingabe = parseFloat(antworten[schritt.nr]?.replace(",", ".").replace(/\./g, match => match) || "0");
    const toleranz = schritt.toleranz ?? 0.01;
    const diff = Math.abs(eingabe - schritt.korrekt);
    const ok = toleranz === 0 ? eingabe === schritt.korrekt : diff <= Math.max(toleranz, Math.abs(schritt.korrekt) * 0.005);
    setStatus(prev => ({ ...prev, [schritt.nr]: ok ? "richtig" : "falsch" }));
  };

  const reset = () => {
    setAntworten({});
    setStatus({});
    setZeigeMusser({});
    setAbgeschlossen(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <button onClick={onZurueck} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--color-text-secondary)", background: "none", border: "none", cursor: "pointer", marginBottom: "1.5rem", padding: 0 }}>
        <ArrowLeft size={14} aria-hidden="true" /> Zurück zur Übersicht
      </button>

      <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", overflow: "hidden", marginBottom: "1rem" }}>
        <div style={{ padding: "1.25rem", background: "var(--color-background-secondary)", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>{aufgabe.bereich}</div>
          <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>{aufgabe.titel}</h2>
          <div style={{ borderLeft: "2px solid var(--color-border-secondary)", paddingLeft: "1rem", fontSize: 15, color: "var(--color-text-secondary)", lineHeight: 1.7, borderRadius: 0 }}>{aufgabe.berufssituation}</div>
        </div>

        <div style={{ padding: "1.25rem", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.5rem" }}>
            <BookOpen size={15} style={{ color: "var(--color-text-info)" }} aria-hidden="true" />
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Was lerne ich hier?</span>
          </div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7, margin: 0 }}>{aufgabe.was_lerne_ich}</p>
        </div>

        <div style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {aufgabe.schritte.map((schritt) => {
              const st = status[schritt.nr] || "offen";
              const borderColor = st === "richtig" ? "var(--color-border-success)" : st === "falsch" ? "var(--color-border-danger)" : "var(--color-border-tertiary)";
              return (
                <div key={schritt.nr} style={{ border: `0.5px solid ${borderColor}`, borderRadius: "var(--border-radius-lg)", overflow: "hidden", transition: "border-color 0.2s" }}>
                  <div style={{ padding: "1rem 1.25rem", background: "var(--color-background-secondary)", borderBottom: `0.5px solid ${borderColor}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.5rem" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: st === "richtig" ? "var(--color-background-success)" : "var(--color-background-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {st === "richtig" ? <CheckCircle2 size={16} style={{ color: "var(--color-text-success)" }} /> : <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>{schritt.nr}</span>}
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-text-info)", background: "var(--color-background-info)", padding: "3px 10px", borderRadius: "var(--border-radius-md)" }}>{schritt.formel}</div>
                    </div>
                    <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7, margin: 0 }}>{schritt.kontext}</p>
                  </div>

                  {schritt.variablen.length > 0 && (
                    <div style={{ padding: "0.75rem 1.25rem", borderBottom: `0.5px solid var(--color-border-tertiary)` }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {schritt.variablen.map((v, vi) => (
                          <div key={vi} style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "4px 10px" }}>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>{v.kuerzel}</span>
                            <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>=</span>
                            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{v.wert ? `${v.bedeutung} (${v.wert})` : v.bedeutung}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ padding: "1rem 1.25rem" }}>
                    <p style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "0.75rem" }}>{schritt.aufgabe}</p>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <input
                        type="text"
                        value={antworten[schritt.nr] || ""}
                        onChange={e => { setAntworten(prev => ({ ...prev, [schritt.nr]: e.target.value })); setStatus(prev => ({ ...prev, [schritt.nr]: "offen" })); }}
                        onKeyDown={e => e.key === "Enter" && pruefe(schritt)}
                        placeholder="Ihre Berechnung..."
                        disabled={st === "richtig"}
                        style={{ width: 160, fontFamily: "var(--font-mono)", fontSize: 15, borderColor: st === "falsch" ? "var(--color-border-danger)" : st === "richtig" ? "var(--color-border-success)" : undefined }}
                      />
                      {schritt.einheit && <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{schritt.einheit}</span>}
                      <button onClick={() => pruefe(schritt)} disabled={st === "richtig" || !antworten[schritt.nr]} style={{ fontSize: 14, padding: "8px 16px", borderRadius: "var(--border-radius-md)", cursor: "pointer" }}>
                        Prüfen
                      </button>
                      <button onClick={() => setZeigeMusser(prev => ({ ...prev, [schritt.nr]: !prev[schritt.nr] }))} style={{ fontSize: 13, padding: "8px 12px", borderRadius: "var(--border-radius-md)", cursor: "pointer", color: "var(--color-text-secondary)" }}>
                        {zeigeMusser[schritt.nr] ? "Tipp ausblenden" : "Tipp anzeigen"}
                      </button>
                    </div>

                    {st === "falsch" && (
                      <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 14px", background: "var(--color-background-danger)", borderRadius: "var(--border-radius-md)" }}>
                        <Lightbulb size={15} style={{ color: "var(--color-text-danger)", flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                        <span style={{ fontSize: 13, color: "var(--color-text-danger)", lineHeight: 1.6 }}>Noch nicht ganz. Überprüfen Sie Ihre Rechnung. Nutzen Sie den Tipp wenn Sie nicht weiterkommen.</span>
                      </div>
                    )}

                    {st === "richtig" && (
                      <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "var(--color-background-success)", borderRadius: "var(--border-radius-md)" }}>
                        <CheckCircle2 size={15} style={{ color: "var(--color-text-success)" }} aria-hidden="true" />
                        <span style={{ fontSize: 13, color: "var(--color-text-success)", fontWeight: 500 }}>Richtig!</span>
                      </div>
                    )}

                    {zeigeMusser[schritt.nr] && (
                      <div style={{ marginTop: "0.75rem", padding: "10px 14px", background: "var(--color-background-warning)", borderRadius: "var(--border-radius-md)", fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-text-warning)" }}>
                        {schritt.tipp}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {abgeschlossen && (
        <div style={{ background: "var(--color-background-success)", border: "0.5px solid var(--color-border-success)", borderRadius: "var(--border-radius-lg)", padding: "1.25rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
            <CheckCircle2 size={18} style={{ color: "var(--color-text-success)" }} aria-hidden="true" />
            <span style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-success)" }}>Aufgabe abgeschlossen</span>
          </div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: "0.75rem" }}>{aufgabe.abschluss}</p>
          <div style={{ padding: "10px 14px", background: "var(--color-background-primary)", borderRadius: "var(--border-radius-md)", fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
            <strong style={{ color: "var(--color-text-primary)" }}>Praxistipp:</strong> {aufgabe.praxistipp}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {aufgabe.gesetze.map(g => (
              <span key={g} style={{ fontFamily: "var(--font-mono)", fontSize: 11, padding: "3px 10px", background: "var(--color-background-warning)", color: "var(--color-text-warning)", borderRadius: "var(--border-radius-md)" }}>{g}</span>
            ))}
          </div>
        </div>
      )}

      <KiAssistent aufgabe={aufgabe} />

      <div style={{ display: "flex", gap: 8, marginTop: "1rem" }}>
        <button onClick={reset} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, padding: "8px 14px", borderRadius: "var(--border-radius-md)", cursor: "pointer", color: "var(--color-text-secondary)" }}>
          <RotateCcw size={14} aria-hidden="true" /> Zurücksetzen
        </button>
      </div>
    </div>
  );
}

// ─── HAUPTSEITE ───────────────────────────────────────────────────────────────

export default function Rechenpraxis() {
  const [aktiveAufgabe, setAktiveAufgabe] = useState<Aufgabe | null>(null);
  const [aktiverBereich, setAktiverBereich] = useState<string>("alle");

  const gefilterteAufgaben = aktiverBereich === "alle" ? AUFGABEN : AUFGABEN.filter(a => a.bereich === aktiverBereich);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem" }}>
        {!aktiveAufgabe ? (
          <>
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--color-background-info)", color: "var(--color-text-info)", fontSize: 12, fontWeight: 500, padding: "4px 12px", borderRadius: "var(--border-radius-md)", marginBottom: "1rem" }}>
                <Calculator size={14} aria-hidden="true" /> Rechenpraxis · KI-gestützt
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: "0.5rem", color: "var(--color-text-primary)" }}>Rechenpraxis Immobilienwirtschaft</h1>
              <p style={{ fontSize: 15, color: "var(--color-text-secondary)", lineHeight: 1.7, maxWidth: 600 }}>
                Schritt-für-Schritt-Rechenübungen für den Berufsalltag. Jede Aufgabe erklärt warum gerechnet wird — nicht nur wie. Mit KI-Assistent für Ihre Fragen.
              </p>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.5rem" }}>
              <button onClick={() => setAktiverBereich("alle")} style={{ fontSize: 13, padding: "6px 14px", borderRadius: "var(--border-radius-md)", cursor: "pointer", background: aktiverBereich === "alle" ? "var(--color-text-primary)" : undefined, color: aktiverBereich === "alle" ? "var(--color-background-primary)" : "var(--color-text-secondary)", border: aktiverBereich === "alle" ? "none" : undefined }}>
                Alle ({AUFGABEN.length})
              </button>
              {BEREICHE.map(b => (
                <button key={b} onClick={() => setAktiverBereich(b)} style={{ fontSize: 13, padding: "6px 14px", borderRadius: "var(--border-radius-md)", cursor: "pointer", background: aktiverBereich === b ? "var(--color-text-primary)" : undefined, color: aktiverBereich === b ? "var(--color-background-primary)" : "var(--color-text-secondary)", border: aktiverBereich === b ? "none" : undefined }}>
                  {b} ({AUFGABEN.filter(a => a.bereich === b).length})
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {gefilterteAufgaben.map(aufgabe => (
                <button key={aufgabe.id} onClick={() => setAktiveAufgabe(aufgabe)} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "1rem 1.25rem", background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", cursor: "pointer", textAlign: "left", transition: "border-color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--color-border-secondary)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--color-border-tertiary)")}>
                  <Calculator size={18} style={{ color: "var(--color-text-info)", flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 4 }}>{aufgabe.titel}</div>
                    <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 6, lineHeight: 1.5 }}>{aufgabe.berufssituation.slice(0, 120)}...</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, background: "var(--color-background-info)", color: "var(--color-text-info)", padding: "2px 8px", borderRadius: "var(--border-radius-md)" }}>{aufgabe.bereich}</span>
                      <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{aufgabe.schritte.length} Schritte</span>
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: "var(--color-text-tertiary)", flexShrink: 0, marginTop: 4 }} aria-hidden="true" />
                </button>
              ))}
            </div>
          </>
        ) : (
          <AufgabenAnsicht aufgabe={aktiveAufgabe} onZurueck={() => setAktiveAufgabe(null)} />
        )}
    </div>
  );
}
