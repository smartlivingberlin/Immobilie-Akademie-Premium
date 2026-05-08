import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
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
    <DashboardLayout>
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
    </DashboardLayout>
  );
}
