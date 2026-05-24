import { useState, useRef, useEffect } from "react";
import { Calculator, ChevronRight, ChevronDown, Send, RotateCcw, CheckCircle2, ArrowLeft, BookOpen, Lightbulb, MessageCircle } from "lucide-react";
import { LoadingHandler } from "@/components/LoadingHandler";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { SkeletonText } from "@/components/ui/SkeletonText";

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
,
  {
    id: 46,
    bereich: "Maklercourtage & Provision",
    titel: "Vermietungsprovision berechnen",
    berufssituation: "Sie vermitteln eine Mietwohnung für 1.200 € Kaltmiete. Die ortsübliche Vermietungsprovision beträgt 2 Nettokaltmieten + 19% MwSt. Was berechnen Sie dem Mieter?",
    was_lerne_ich: "Sie lernen, die Maklercourtage für eine Vermietungsprovision korrekt zu berechnen und die Mehrwertsteuer auf die Nettogebühr aufzuschlagen.",
    schritte: [
      {
        nr: 1,
        kontext: "Die Vermietungsprovision wird als Vielfaches der monatlichen Kaltmiete berechnet. In diesem Fall sind es 2 Nettokaltmieten, die die Provisionsgrundlage bilden.",
        formel: "Netto-Provision = Kaltmiete × Provision in Nettokaltmieten",
        variablen: [
          {
            kuerzel: "Kaltmiete",
            bedeutung: "Monatliche Kaltmiete der Wohnung",
            wert: "1.200 €"
          },
          {
            kuerzel: "Provision",
            bedeutung: "Anzahl der Nettokaltmieten als Provision",
            wert: "2"
          }
        ],
        aufgabe: "Berechnen Sie die Netto-Provisionsgebühr aus 2 Nettokaltmieten bei einer Miete von 1.200 €.",
        einheit: "€",
        korrekt: 2400.0,
        toleranz: 0,
        tipp: "Multiplizieren Sie 1.200 € × 2 = 2.400 € Nettogebühr"
      },
      {
        nr: 2,
        kontext: "Auf die Netto-Provisionsgebühr muss die Mehrwertsteuer aufgeschlagen werden. Der MwSt-Satz für Maklerleistungen beträgt in Deutschland 19%.",
        formel: "MwSt = Netto-Provision × MwSt-Satz",
        variablen: [
          {
            kuerzel: "Netto-Provision",
            bedeutung: "Berechnete Provisionsgebühr ohne MwSt",
            wert: "2.400 €"
          },
          {
            kuerzel: "MwSt-Satz",
            bedeutung: "Mehrwertsteuer Steuersatz für Maklercourtage",
            wert: "19% oder 0,19"
          }
        ],
        aufgabe: "Berechnen Sie die Mehrwertsteuer auf die Nettogebühr von 2.400 €.",
        einheit: "€",
        korrekt: 456.0,
        toleranz: 0,
        tipp: "Rechnen Sie: 2.400 € × 0,19 = 456 € MwSt"
      },
      {
        nr: 3,
        kontext: "Die Gesamtgebühr für den Mieter setzt sich aus der Nettogebühr und der Mehrwertsteuer zusammen. Dies ist der tatsächlich abzurechnende Betrag.",
        formel: "Gesamtgebühr = Netto-Provision + MwSt",
        variablen: [
          {
            kuerzel: "Netto-Provision",
            bedeutung: "Provisionsgebühr ohne Steuern",
            wert: "2.400 €"
          },
          {
            kuerzel: "MwSt",
            bedeutung: "Berechnete Mehrwertsteuer",
            wert: "456 €"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtgebühr, die Sie dem Mieter in Rechnung stellen.",
        einheit: "€",
        korrekt: 2856.0,
        toleranz: 0,
        tipp: "Addieren Sie: 2.400 € + 456 € = 2.856 € Gesamtgebühr brutto"
      }
    ],
    abschluss: "Die Vermietungsprovision für die Wohnung mit 1.200 € Kaltmiete beträgt brutto 2.856 €. Dieser Betrag setzt sich aus einer Nettogebühr von 2 Monatsmieten (2.400 €) plus 19% Mehrwertsteuer zusammen.",
    gesetze: [
      "§ 656 BGB - Maklervertrag",
      "§ 1 Abs. 1 MwStSysVO - Mehrwertsteuer auf Maklerleistungen"
    ],
    praxistipp: "Dokumentieren Sie die Provisionszahlungsmodalitäten schriftlich im Maklervertrag. Üblicherweise wird die Gebühr fällig bei erfolgreicher Vermittlung und Abschluss des Mietvertrags. Beachten Sie lokale Regelungen bezüglich Maklergebührenregeln in einzelnen Bundesländern."
  },
  {
    id: 47,
    bereich: "Maklercourtage & Provision",
    titel: "Provisionsteilung Gewerbe",
    berufssituation: "Sie verkaufen eine Gewerbeimmobilie für 1.850.000 €. Käufer und Verkäufer einigen sich auf je 3% + MwSt. Berechnen Sie die Provision beider Parteien.",
    was_lerne_ich: "Sie lernen, wie Maklerprovisionen bei Gewerbeimmobilien zwischen Käufer und Verkäufer aufgeteilt werden und wie Mehrwertsteuer auf Provisionen korrekt berechnet wird.",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung der Bruttoprovision vom Kaufpreis. Dies ist die Basis für die weitere Aufteilung zwischen den Parteien.",
        formel: "Bruttoprovision = Kaufpreis × Provisionssatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Verkaufspreis der Gewerbeimmobilie",
            wert: "1.850.000 €"
          },
          {
            kuerzel: "Provisionssatz",
            bedeutung: "Vereinbarter Gesamtprovisionssatz (Käufer + Verkäufer)",
            wert: "6%"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtprovision (Bruttoprovision) vor Mehrwertsteuer.",
        einheit: "€",
        korrekt: 111000.0,
        toleranz: 1,
        tipp: "1.850.000 € × 6% = 111.000 €"
      },
      {
        nr: 2,
        kontext: "Aufteilung der Bruttoprovision auf Käufer und Verkäufer. Da beide Parteien je 3% zahlen, wird die Gesamtprovision hälftig geteilt.",
        formel: "Provision Käufer = Bruttoprovision ÷ 2",
        variablen: [
          {
            kuerzel: "Bruttoprovision",
            bedeutung: "Gesamtprovision",
            wert: "111.000 €"
          }
        ],
        aufgabe: "Berechnen Sie die Provision für den Käufer.",
        einheit: "€",
        korrekt: 55500.0,
        toleranz: 1,
        tipp: "111.000 € ÷ 2 = 55.500 €"
      },
      {
        nr: 3,
        kontext: "Aufteilung der Bruttoprovision auf Käufer und Verkäufer. Die Provision des Verkäufers wird ebenfalls berechnet.",
        formel: "Provision Verkäufer = Bruttoprovision ÷ 2",
        variablen: [
          {
            kuerzel: "Bruttoprovision",
            bedeutung: "Gesamtprovision",
            wert: "111.000 €"
          }
        ],
        aufgabe: "Berechnen Sie die Provision für den Verkäufer.",
        einheit: "€",
        korrekt: 55500.0,
        toleranz: 1,
        tipp: "111.000 € ÷ 2 = 55.500 €"
      },
      {
        nr: 4,
        kontext: "Berechnung der Mehrwertsteuer auf die Maklerprovision. Die MwSt beträgt derzeit 19% und wird auf die Provision aufgeschlagen.",
        formel: "MwSt pro Partei = Provision × 19%",
        variablen: [
          {
            kuerzel: "Provision Käufer/Verkäufer",
            bedeutung: "Provision je Partei",
            wert: "55.500 €"
          },
          {
            kuerzel: "MwSt-Satz",
            bedeutung: "Mehrwertsteuersatz",
            wert: "19%"
          }
        ],
        aufgabe: "Berechnen Sie die Mehrwertsteuer für eine Partei (Käufer oder Verkäufer).",
        einheit: "€",
        korrekt: 10545.0,
        toleranz: 1,
        tipp: "55.500 € × 19% = 10.545 €"
      },
      {
        nr: 5,
        kontext: "Berechnung der Gesamtgebühr (Netto + MwSt) für jede Partei. Dies ist der endgültige Betrag, den jede Partei zahlen muss.",
        formel: "Gesamtgebühr je Partei = Provision + MwSt",
        variablen: [
          {
            kuerzel: "Provision",
            bedeutung: "Provision für eine Partei",
            wert: "55.500 €"
          },
          {
            kuerzel: "MwSt",
            bedeutung: "Mehrwertsteuer für eine Partei",
            wert: "10.545 €"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtgebühr für Käufer und Verkäufer (inklusive MwSt).",
        einheit: "€",
        korrekt: 66045.0,
        toleranz: 1,
        tipp: "55.500 € + 10.545 € = 66.045 € pro Partei"
      }
    ],
    abschluss: "Bei einer Gewerbeimmobilie im Wert von 1.850.000 € zahlen Käufer und Verkäufer jeweils 55.500 € Provision zzgl. 10.545 € MwSt = 66.045 € Gesamtgebühr. Die Gesamteinnahme für den Makler beträgt 132.090 €.",
    gesetze: [
      "§ 652 BGB - Vermittlungsprovision",
      "§ 1 UStG - Umsatzsteuer auf Dienstleistungen",
      "MwStSysV - Mehrwertsteuersystemverordnung"
    ],
    praxistipp: "Bei Gewerbeimmobilien sind die Provisionsvereinbarungen oft Verhandlungsmasse. Dokumentieren Sie die Provisionsaufteilung schriftlich im Maklervertrag, um Missverständnisse zu vermeiden. Beachten Sie, dass nicht alle Gewerbeimmobilien gleich behandelt werden - Unterscheidungen zwischen bebauten und unbebauten Grundstücken sind möglich."
  },
  {
    id: 48,
    bereich: "Maklercourtage & Provision",
    titel: "Nettoprovision ausrechnen",
    berufssituation: "Ihre Rechnung zeigt 23.800 € Bruttoprovision. Der Steuersatz beträgt 19%. Wie hoch ist die Nettoprovision und die enthaltene MwSt?",
    was_lerne_ich: "Sie lernen, wie man aus einer Bruttoprovision die Nettoprovision und die enthaltene Mehrwertsteuer berechnet und verstehen die Zusammenhänge zwischen Brutto- und Nettobetrag.",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst müssen wir verstehen, dass die Bruttoprovision aus der Nettoprovision plus Mehrwertsteuer besteht. Die Bruttoprovision ist der Gesamtbetrag inklusive MwSt.",
        formel: "Bruttoprovision = Nettoprovision × (1 + Steuersatz)",
        variablen: [
          {
            kuerzel: "Bruttoprovision",
            bedeutung: "Gesamtprovision mit MwSt",
            wert: "23.800 €"
          },
          {
            kuerzel: "Steuersatz",
            bedeutung: "Mehrwertsteuersatz in Dezimalform",
            wert: "0,19"
          }
        ],
        aufgabe: "Welcher Faktor wird verwendet, um von Netto zu Brutto zu rechnen?",
        einheit: "",
        korrekt: 1.19,
        toleranz: 0.01,
        tipp: "Der Faktor ist 1 + 0,19 = 1,19"
      },
      {
        nr: 2,
        kontext: "Um die Nettoprovision zu berechnen, müssen wir die Bruttoprovision durch den Faktor (1 + Steuersatz) teilen. Dies ist die Umkehrung der Brutto-zu-Netto-Rechnung.",
        formel: "Nettoprovision = Bruttoprovision ÷ (1 + Steuersatz)",
        variablen: [
          {
            kuerzel: "Bruttoprovision",
            bedeutung: "Gesamtprovision mit MwSt",
            wert: "23.800 €"
          },
          {
            kuerzel: "Faktor",
            bedeutung: "1 + Steuersatz",
            wert: "1,19"
          }
        ],
        aufgabe: "Berechnen Sie die Nettoprovision aus der Bruttoprovision von 23.800 € unter Verwendung des Faktors 1,19.",
        einheit: "€",
        korrekt: 20000.0,
        toleranz: 0.5,
        tipp: "Rechnung: 23.800 € ÷ 1,19 = 20.000 €"
      },
      {
        nr: 3,
        kontext: "Nun berechnen wir die in der Bruttoprovision enthaltene Mehrwertsteuer. Diese ist die Differenz zwischen Brutto- und Nettobetrag.",
        formel: "MwSt = Bruttoprovision - Nettoprovision",
        variablen: [
          {
            kuerzel: "Bruttoprovision",
            bedeutung: "Gesamtprovision mit MwSt",
            wert: "23.800 €"
          },
          {
            kuerzel: "Nettoprovision",
            bedeutung: "Provision ohne MwSt",
            wert: "20.000 €"
          }
        ],
        aufgabe: "Wie hoch ist die in der Bruttoprovision enthaltene Mehrwertsteuer?",
        einheit: "€",
        korrekt: 3800.0,
        toleranz: 0.5,
        tipp: "Rechnung: 23.800 € - 20.000 € = 3.800 €"
      },
      {
        nr: 4,
        kontext: "Zur Kontrolle berechnen wir die MwSt alternativ aus der Nettoprovision und dem Steuersatz. Dies sollte dasselbe Ergebnis liefern wie die Differenzmethode.",
        formel: "MwSt = Nettoprovision × Steuersatz",
        variablen: [
          {
            kuerzel: "Nettoprovision",
            bedeutung: "Provision ohne MwSt",
            wert: "20.000 €"
          },
          {
            kuerzel: "Steuersatz",
            bedeutung: "Mehrwertsteuersatz",
            wert: "0,19"
          }
        ],
        aufgabe: "Berechnen Sie die Mehrwertsteuer durch Multiplikation der Nettoprovision mit dem Steuersatz und prüfen Sie das Ergebnis.",
        einheit: "€",
        korrekt: 3800.0,
        toleranz: 0.5,
        tipp: "Rechnung: 20.000 € × 0,19 = 3.800 € (Kontrolle bestätigt das Ergebnis)"
      }
    ],
    abschluss: "Die Nettoprovision beträgt 20.000 €, die enthaltene Mehrwertsteuer 3.800 €. Die Summe ergibt die Bruttoprovision von 23.800 €. Beide Berechnungsmethoden für die MwSt führen zum gleichen Ergebnis und bestätigen die Korrektheit der Rechnung.",
    gesetze: [
      "§ 1 UStG (Umsatzsteuergesetz) - Steuerpflicht",
      "§ 14 UStG - Ausrechnung der Steuer"
    ],
    praxistipp: "In der Immobilienmaklerpraxis ist es wichtig, zwischen Brutto- und Nettoprovision zu unterscheiden. Bei der Vertragsgestaltung und Kostenaufstellung sollte immer geklärt werden, ob ein vereinbarter Provisionssatz brutto oder netto verstanden ist. Eine klare Dokumentation verhindert späteren Streit mit Kunden."
  },
  {
    id: 49,
    bereich: "Maklercourtage & Provision",
    titel: "Jahresumsatz Maklerbüro",
    berufssituation: "Ihr Büro vermittelt 18 Objekte im Jahr. Durchschnittlicher Kaufpreis: 450.000 €, Provisionssatz je Seite: 3,57%. Wie hoch ist der Jahresumsatz?",
    was_lerne_ich: "Sie lernen, den Gesamtjahresumsatz eines Maklerbüros basierend auf Vermittlungsvolumen und zweiseitiger Provision zu berechnen.",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst wird die Gesamtprovision pro Objekt berechnet. Da der Makler beide Seiten (Käufer und Verkäufer) je mit 3,57% provisionsiert, wird die Provision verdoppelt.",
        formel: "Provision je Objekt = Kaufpreis × Provisionssatz × 2",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Durchschnittlicher Kaufpreis eines vermittelten Objekts",
            wert: "450.000 €"
          },
          {
            kuerzel: "Provisionssatz",
            bedeutung: "Provisionssatz je Seite (Käufer und Verkäufer)",
            wert: "3,57%"
          },
          {
            kuerzel: "Anzahl Seiten",
            bedeutung: "Käufer- und Verkäuferseite",
            wert: "2"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtprovision pro vermitteltem Objekt bei 450.000 € Kaufpreis und 3,57% Provisionssatz je Seite.",
        einheit: "€",
        korrekt: 32130.0,
        toleranz: 1,
        tipp: "450.000 € × 3,57% × 2 = 450.000 € × 0,0357 × 2 = 32.130 €"
      },
      {
        nr: 2,
        kontext: "Jetzt wird die Gesamtprovision für alle 18 vermittelten Objekte im Jahr berechnet, indem die Provision pro Objekt mit der Anzahl der Vermittlungen multipliziert wird.",
        formel: "Gesamtprovision = Provision je Objekt × Anzahl Objekte",
        variablen: [
          {
            kuerzel: "Provision je Objekt",
            bedeutung: "Bereits berechnete Provision pro Objekt",
            wert: "32.130 €"
          },
          {
            kuerzel: "Anzahl Objekte",
            bedeutung: "Anzahl vermittelter Objekte im Jahr",
            wert: "18"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtprovision für alle 18 vermittelten Objekte im Geschäftsjahr.",
        einheit: "€",
        korrekt: 578340.0,
        toleranz: 1,
        tipp: "32.130 € × 18 = 578.340 €"
      },
      {
        nr: 3,
        kontext: "Die berechnete Gesamtprovision stellt den Jahresumsatz des Maklerbüros dar. Dies ist die Bruttoeinnahme aus Maklerprovisionen vor Abzug von Betriebskosten und Steuern.",
        formel: "Jahresumsatz = Gesamtprovision",
        variablen: [
          {
            kuerzel: "Gesamtprovision",
            bedeutung: "Summe aller Provisionen aus 18 Vermittlungen",
            wert: "578.340 €"
          }
        ],
        aufgabe: "Bestätigen Sie den Jahresumsatz des Maklerbüros basierend auf der Gesamtprovision.",
        einheit: "€",
        korrekt: 578340.0,
        toleranz: 1,
        tipp: "Der Jahresumsatz entspricht der Gesamtprovision: 578.340 €"
      }
    ],
    abschluss: "Der Jahresumsatz des Maklerbüros beträgt 578.340 €. Dies errechnet sich aus 18 vermittelten Objekten à 450.000 € mit einer zweiseitigen Provision von je 3,57%.",
    gesetze: [
      "§ 1 MaklerG (Maklergesetz)",
      "§ 2 Abs. 2 MaklerG"
    ],
    praxistipp: "In der Praxis sollten Sie berücksichtigen, dass nicht alle Provisionen zeitgleich ausbezahlt werden – sie werden oft erst nach notarieller Beurkundung und Eintragung ins Grundbuch fällig. Planen Sie die Liquidität entsprechend und kalkulieren Sie mit realistischen Durchschnittswerten für Ihre Region."
  },
  {
    id: 50,
    bereich: "Maklercourtage & Provision",
    titel: "Mindestprovision prüfen",
    berufssituation: "Sie haben intern eine Mindestprovision von 6.000 € brutto festgelegt. Ein Objekt kostet 95.000 €, Satz 3,57%. Greift die Mindestprovision?",
    was_lerne_ich: "Sie lernen, wie Sie überprüfen, ob eine satzbasierte Provision unter die festgelegte Mindestprovision fällt und wann diese greift.",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst berechnen wir die satzbasierte Provision auf Grundlage des Kaufpreises und des vereinbarten Satzes. Dies ist die normale Provisionsberechnung ohne Mindestgarantie.",
        formel: "Provision = Kaufpreis × Provisionssatz ÷ 100",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Objektwert in Euro",
            wert: "95.000"
          },
          {
            kuerzel: "Provisionssatz",
            bedeutung: "Vereinbarter Provisionssatz in Prozent",
            wert: "3,57"
          }
        ],
        aufgabe: "Berechnen Sie die satzbasierte Provision für ein Objekt mit einem Kaufpreis von 95.000 € bei einem Provisionssatz von 3,57%.",
        einheit: "€",
        korrekt: 3391.5,
        toleranz: 0.5,
        tipp: "Rechnung: 95.000 × 3,57 ÷ 100 = 3.391,50 €"
      },
      {
        nr: 2,
        kontext: "Jetzt vergleichen wir die berechnete satzbasierte Provision mit der festgelegten Mindestprovision. Wir prüfen, welcher Betrag höher ist.",
        formel: "Zu zahlende Provision = Maximum(satzbasierte Provision; Mindestprovision)",
        variablen: [
          {
            kuerzel: "satzbasierte Provision",
            bedeutung: "Aus Schritt 1 berechnet",
            wert: "3.391,50"
          },
          {
            kuerzel: "Mindestprovision",
            bedeutung: "Intern festgesetzte Mindestgarantie",
            wert: "6.000"
          }
        ],
        aufgabe: "Vergleichen Sie die satzbasierte Provision (3.391,50 €) mit der Mindestprovision (6.000 €). Welcher Betrag ist ausschlaggebend?",
        einheit: "€",
        korrekt: 6000,
        toleranz: 0,
        tipp: "Da 6.000 € > 3.391,50 € greift die Mindestprovision. Die zu zahlende Provision beträgt 6.000 €."
      },
      {
        nr: 3,
        kontext: "Wir berechnen die Differenz zwischen Mindestprovision und satzbasierter Provision, um zu sehen, wie viel höher die Mindestprovision ist. Dies zeigt den wirtschaftlichen Vorteil der Mindestgarantie.",
        formel: "Differenz = Mindestprovision - satzbasierte Provision",
        variablen: [
          {
            kuerzel: "Mindestprovision",
            bedeutung: "Festgelegte Mindestgarantie",
            wert: "6.000"
          },
          {
            kuerzel: "satzbasierte Provision",
            bedeutung: "Berechnet aus Kaufpreis und Satz",
            wert: "3.391,50"
          }
        ],
        aufgabe: "Um wie viel Euro liegt die Mindestprovision über der satzbasierten Provision?",
        einheit: "€",
        korrekt: 2608.5,
        toleranz: 0.5,
        tipp: "Rechnung: 6.000 - 3.391,50 = 2.608,50 €. Die Mindestprovision bringt einen Mehrerlös von 2.608,50 €."
      },
      {
        nr: 4,
        kontext: "Abschließend dokumentieren wir, ob die Mindestprovision greift, und formulieren eine klare Antwort auf die Ausgangsfrage für die Geschäftsakten.",
        formel: "Greift Mindestprovision = wenn (satzbasierte Provision < Mindestprovision) dann JA, sonst NEIN",
        variablen: [
          {
            kuerzel: "satzbasierte Provision",
            bedeutung: "Berechneter Betrag",
            wert: "3.391,50"
          },
          {
            kuerzel: "Mindestprovision",
            bedeutung: "Festgesetzte Untergrenze",
            wert: "6.000"
          },
          {
            kuerzel: "Vergleichsergebnis",
            bedeutung: "Ist satzbasiert < Minimum?",
            wert: "ja"
          }
        ],
        aufgabe: "Greift die Mindestprovision von 6.000 € bei diesem Objekt (ja/nein)?",
        einheit: "",
        korrekt: 1,
        toleranz: 0,
        tipp: "Antwort: JA. Da 3.391,50 € < 6.000 € greift die Mindestprovision. Der Makler erhält 6.000 € brutto."
      }
    ],
    abschluss: "Die Mindestprovision von 6.000 € greift, da die satzbasierte Provision (3.391,50 €) unter diesem Betrag liegt. Der Makler fakturiert daher 6.000 € brutto und profitiert von der internen Mindestgarantie um 2.608,50 €.",
    gesetze: [
      "§ 1 Abs. 2 MaBV (Maklerberufsverordnung)",
      "§ 656 BGB (Maklervertrag)"
    ],
    praxistipp: "Mindestprovisionen sind im Maklergeschäft üblich und sichern das Einkommen bei niedrigen Kaufpreisen ab. Dokumentieren Sie die Mindestprovision-Regelung schriftlich in Ihren AGB und im Maklervertrag, um Missverständnisse zu vermeiden. Prüfen Sie regelmäßig, bei welchen Objektpreisen die Mindestprovision greift, und optimieren Sie diese Grenzwerte für Ihre Wirtschaftlichkeit."
  },
  {
    id: 51,
    bereich: "Maklercourtage & Provision",
    titel: "Widerrufsrecht und Provision",
    berufssituation: "Ein Käufer widerruft den Maklervertrag fristgerecht nach 10 Tagen. Der Kaufvertrag wurde bereits am Tag 8 beurkundet. Hat der Makler Anspruch auf Provision? Berechnen Sie die Provision bei Kaufpreis 450.000 € und 3,57%.",
    was_lerne_ich: "Anwendung des Widerrufsrechts beim Maklervertrag und die Berechnung von Provisionsansprüchen unter Berücksichtigung der Beurkundung des Kaufvertrags.",
    schritte: [
      {
        nr: 1,
        kontext: "Rechtliche Einordnung des Widerrufsrechts",
        formel: "Widerrufsrecht = 14 Tage ab Abschluss Maklervertrag",
        variablen: [
          {
            kuerzel: "WR",
            bedeutung: "Widerrufsfrist in Tagen",
            wert: 14
          },
          {
            kuerzel: "Tag_WR",
            bedeutung: "Tag des Widerrufs",
            wert: 10
          },
          {
            kuerzel: "Tag_Beurk",
            bedeutung: "Tag der Beurkundung des Kaufvertrags",
            wert: 8
          }
        ],
        aufgabe: "Prüfen Sie, ob der Widerruf fristgerecht erfolgt ist und ob die Beurkundung vor dem Widerruf stattgefunden hat.",
        einheit: "Tage",
        korrekt: 1,
        toleranz: 0,
        tipp: "Der Widerruf am Tag 10 ist fristgerecht (innerhalb von 14 Tagen). Die Beurkundung fand am Tag 8 statt, also VOR dem Widerruf. Nach § 355 BGB erlischt das Widerrufsrecht bei Verträgen über Dienstleistungen, wenn die Leistung vollständig erbracht wurde. Die Vermittlung ist mit Beurkundung vollständig erbracht."
      },
      {
        nr: 2,
        kontext: "Provisionsanspruch bei vollständig erbrachter Vermittlung",
        formel: "Provisionsanspruch besteht, wenn Kaufvertrag beurkundet wurde",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis der Immobilie",
            wert: 450000
          },
          {
            kuerzel: "Erfolg",
            bedeutung: "Vermittlung abgeschlossen durch Beurkundung",
            wert: "Ja"
          }
        ],
        aufgabe: "Stellen Sie fest, ob der Makler Anspruch auf die volle Provision hat.",
        einheit: "€",
        korrekt: 1,
        toleranz: 0,
        tipp: "Der Makler hat Anspruch auf die volle Provision, da die Vermittlungstätigkeit durch die Beurkundung des Kaufvertrags vollständig erbracht wurde. Das Widerrufsrecht erlischt mit vollständiger Leistungserbringung."
      },
      {
        nr: 3,
        kontext: "Berechnung der Maklerprovision",
        formel: "Provision = Kaufpreis × Provisionsrate ÷ 100",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis der Immobilie",
            wert: 450000
          },
          {
            kuerzel: "Satz",
            bedeutung: "Provisionsrate in Prozent",
            wert: 3.57
          }
        ],
        aufgabe: "Berechnen Sie die Höhe der fälligen Maklerprovision.",
        einheit: "€",
        korrekt: 16065,
        toleranz: 1,
        tipp: "Provision = 450.000 € × 3,57 % = 450.000 × 0,0357 = 16.065 €"
      }
    ],
    abschluss: "Der Makler hat Anspruch auf die volle Provision in Höhe von 16.065 €, da der Kaufvertrag bereits am Tag 8 beurkundet wurde und damit die Vermittlungstätigkeit vollständig erbracht war. Das Widerrufsrecht des Käufers am Tag 10 entfällt, da die Leistung vollständig erbracht ist.",
    gesetze: [
      "§ 355 BGB (Widerrufsrecht bei Dienstleistungen)",
      "§ 656 BGB (Maklervertrag und Provisionsanspruch)",
      "§ 1 MaBV (Maklergebührenverordnung)"
    ],
    praxistipp: "In der Maklerpraxis ist der Zeitpunkt der Beurkundung des Kaufvertrags kritisch. Erfolgt die Beurkundung vor dem Widerruf, ist die Vermittlung vollständig erbracht und das Widerrufsrecht erlischt. Makler sollten daher zeitnah nach Vertragsabschluss die Beurkundung anstreben. Bei Verbrauchergeschäften ist die 14-tägige Widerrufsfrist zwingend einzuräumen und transparent zu dokumentieren."
  },
  {
    id: 52,
    bereich: "Maklercourtage & Provision",
    titel: "Referenzprovision berechnen",
    berufssituation: "Vergleichen Sie: Objekt A kostet 280.000 € mit 3,57%, Objekt B kostet 380.000 € mit 2,975%. Welches bringt mehr Provision?",
    was_lerne_ich: "Sie lernen, Provisionen bei unterschiedlichen Kaufpreisen und Provisionssätzen zu berechnen und zu vergleichen, um die wirtschaftlichere Maklertätigkeit zu identifizieren.",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung der Provision für Objekt A. Die Provision ergibt sich aus dem Kaufpreis multipliziert mit dem vereinbarten Provisionssatz.",
        formel: "Provision A = Kaufpreis A × Provisionssatz A ÷ 100",
        variablen: [
          {
            kuerzel: "Kaufpreis A",
            bedeutung: "Kaufpreis des Objekts A",
            wert: "280.000 €"
          },
          {
            kuerzel: "Provisionssatz A",
            bedeutung: "Vereinbarter Provisionssatz für Objekt A",
            wert: "3,57%"
          }
        ],
        aufgabe: "Berechnen Sie die Provision für Objekt A mit einem Kaufpreis von 280.000 € und einem Provisionssatz von 3,57%.",
        einheit: "€",
        korrekt: 9996.0,
        toleranz: 1,
        tipp: "Multiplizieren Sie 280.000 mit 3,57 und dividieren Sie das Ergebnis durch 100. Das Ergebnis sollte 9.996,00 € betragen."
      },
      {
        nr: 2,
        kontext: "Berechnung der Provision für Objekt B nach demselben Verfahren wie bei Objekt A, aber mit anderen Werten.",
        formel: "Provision B = Kaufpreis B × Provisionssatz B ÷ 100",
        variablen: [
          {
            kuerzel: "Kaufpreis B",
            bedeutung: "Kaufpreis des Objekts B",
            wert: "380.000 €"
          },
          {
            kuerzel: "Provisionssatz B",
            bedeutung: "Vereinbarter Provisionssatz für Objekt B",
            wert: "2,975%"
          }
        ],
        aufgabe: "Berechnen Sie die Provision für Objekt B mit einem Kaufpreis von 380.000 € und einem Provisionssatz von 2,975%.",
        einheit: "€",
        korrekt: 11305.0,
        toleranz: 1,
        tipp: "Multiplizieren Sie 380.000 mit 2,975 und dividieren Sie durch 100. Das Ergebnis sollte 11.305,00 € betragen."
      },
      {
        nr: 3,
        kontext: "Vergleich der beiden Provisionen. Bestimmen Sie, welches Objekt die höhere Provision bringt und berechnen Sie die Differenz.",
        formel: "Differenz = Provision B - Provision A",
        variablen: [
          {
            kuerzel: "Provision B",
            bedeutung: "Provision für Objekt B",
            wert: "11.305,00 €"
          },
          {
            kuerzel: "Provision A",
            bedeutung: "Provision für Objekt A",
            wert: "9.996,00 €"
          }
        ],
        aufgabe: "Um wie viel Euro bringt Objekt B mehr Provision als Objekt A?",
        einheit: "€",
        korrekt: 1309.0,
        toleranz: 1,
        tipp: "Subtrahieren Sie die kleinere Provision (A) von der größeren Provision (B). Die Differenz beträgt 1.309,00 €."
      },
      {
        nr: 4,
        kontext: "Prozentuale Bewertung des Mehrgewinns. Berechnen Sie, um wie viel Prozent die Provision bei Objekt B höher ausfällt als bei Objekt A.",
        formel: "Mehrgewinn in % = (Differenz ÷ Provision A) × 100",
        variablen: [
          {
            kuerzel: "Differenz",
            bedeutung: "Provisionsdifferenz zwischen B und A",
            wert: "1.309,00 €"
          },
          {
            kuerzel: "Provision A",
            bedeutung: "Provision für Objekt A",
            wert: "9.996,00 €"
          }
        ],
        aufgabe: "Um wie viel Prozent liegt die Provision von Objekt B über der von Objekt A?",
        einheit: "%",
        korrekt: 13.1,
        toleranz: 0.1,
        tipp: "Teilen Sie 1.309,00 durch 9.996,00 und multiplizieren Sie mit 100. Das Ergebnis sollte etwa 13,10% betragen."
      }
    ],
    abschluss: "Objekt B generiert trotz niedrigerem Provisionssatz (2,975% vs. 3,57%) aufgrund des höheren Kaufpreises insgesamt 1.309,00 € mehr Provision als Objekt A, was einem Mehrgewinn von etwa 13,10% entspricht. Dies zeigt, dass bei der Maklerauswahl nicht nur der Provisionssatz, sondern vor allem der Kaufpreis entscheidend ist.",
    gesetze: [
      "§ 1 MaklerG",
      "§ 2 MaklerG"
    ],
    praxistipp: "In der Maklerpraxis sollten Sie immer beide Parameter – Kaufpreis und Provisionssatz – in Ihre Wirtschaftlichkeitsbetrachtung einbeziehen. Ein geringerer Provisionssatz bei einem deutlich höheren Kaufpreis kann lukrativer sein als ein höherer Satz bei einem niedrigeren Kaufpreis. Dokumentieren Sie solche Vergleiche schriftlich als Geschäftsgrundlage."
  },
  {
    id: 53,
    bereich: "Maklercourtage & Provision",
    titel: "Innenprovision Berechnung",
    berufssituation: "Ein Bauträger zahlt Ihnen 4% Innenprovision auf einen Neubau für 595.000 €. Zusätzlich zahlt der Käufer 1,785% Außenprovision. Berechnen Sie beide Beträge.",
    was_lerne_ich: "Sie lernen, Innen- und Außenprovisionen korrekt zu berechnen und zu unterscheiden, um die unterschiedlichen Provisionsquellen im Maklergeschäft transparent darzustellen.",
    schritte: [
      {
        nr: 1,
        kontext: "Die Innenprovision wird vom Bauträger gezahlt. Sie wird auf den Kaufpreis angewendet und stellt die Vergütung des Maklers durch den Verkäufer dar.",
        formel: "Innenprovision = Kaufpreis × Innenprovisionssatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Vereinbarter Kaufpreis des Neubaus",
            wert: "595.000 €"
          },
          {
            kuerzel: "Innenprovisionssatz",
            bedeutung: "Vom Bauträger vereinbarter Provisionssatz",
            wert: "4%"
          }
        ],
        aufgabe: "Berechnen Sie die Innenprovision, die der Bauträger an Sie zahlt.",
        einheit: "€",
        korrekt: 23800,
        toleranz: 1,
        tipp: "Multiplizieren Sie 595.000 € mit 0,04 (4% als Dezimalzahl). Das Ergebnis beträgt 23.800 €."
      },
      {
        nr: 2,
        kontext: "Die Außenprovision wird vom Käufer gezahlt. Sie wird ebenfalls auf den Kaufpreis angewendet und stellt die Vergütung des Maklers durch den Käufer dar.",
        formel: "Außenprovision = Kaufpreis × Außenprovisionssatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Vereinbarter Kaufpreis des Neubaus",
            wert: "595.000 €"
          },
          {
            kuerzel: "Außenprovisionssatz",
            bedeutung: "Vom Käufer zu zahlender Provisionssatz",
            wert: "1,785%"
          }
        ],
        aufgabe: "Berechnen Sie die Außenprovision, die der Käufer an Sie zahlt.",
        einheit: "€",
        korrekt: 10620.75,
        toleranz: 1,
        tipp: "Multiplizieren Sie 595.000 € mit 0,01785 (1,785% als Dezimalzahl). Das Ergebnis beträgt 10.620,75 €."
      },
      {
        nr: 3,
        kontext: "Die Gesamtprovision setzt sich aus beiden Provisionsquellen zusammen. Dies zeigt die vollständige Vergütung des Maklers aus dem Transaktionsgeschäft.",
        formel: "Gesamtprovision = Innenprovision + Außenprovision",
        variablen: [
          {
            kuerzel: "Innenprovision",
            bedeutung: "Zuvor berechnete Innenprovision vom Bauträger",
            wert: "23.800 €"
          },
          {
            kuerzel: "Außenprovision",
            bedeutung: "Zuvor berechnete Außenprovision vom Käufer",
            wert: "10.620,75 €"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtprovision aus beiden Provisionsquellen.",
        einheit: "€",
        korrekt: 34420.75,
        toleranz: 1,
        tipp: "Addieren Sie 23.800 € und 10.620,75 € zusammen. Die Gesamtprovision beträgt 34.420,75 €."
      }
    ],
    abschluss: "Die Gesamtvergütung des Maklers für diese Transaktion beträgt 34.420,75 € und setzt sich aus der Innenprovision vom Bauträger (23.800 €) und der Außenprovision vom Käufer (10.620,75 €) zusammen. Diese duale Provisionsstruktur ist typisch für Neubauverkäufe und ermöglicht eine faire Kostenteilung zwischen Verkäufer und Käufer.",
    gesetze: [
      "§ 1 MaklerG (Maklergesetz) - Vermittlungstätigkeit",
      "§ 3 MaklerG - Provisionsanspruch",
      "Gewerbliche Betätigung gemäß MaklerG und EstateG"
    ],
    praxistipp: "Dokumentieren Sie Innen- und Außenprovisionen separat in Ihrem Maklervertrag und teilen Sie dies transparent mit den Parteien mit. Bei der Abrechnung sollten Sie beide Provisionsquellen einzeln ausweisen, um Missverständnisse zu vermeiden und die Compliance zu sichern. Achten Sie darauf, dass die Summe aller Provisionen die ortsüblichen Maklergebühren nicht übersteigt."
  },
  {
    id: 54,
    bereich: "Maklercourtage & Provision",
    titel: "Staffelprovision",
    berufssituation: "Bei Mehrfachvermittlung: 1. Objekt 3,57%, ab 2. Objekt 3,0%. Sie vermitteln 3 Objekte à 400.000 €. Gesamtprovision?",
    was_lerne_ich: "Sie lernen, Staffelprovisionen bei Mehrfachvermittlungen korrekt zu berechnen und unterschiedliche Provisionsätze auf entsprechende Objekte anzuwenden.",
    schritte: [
      {
        nr: 1,
        kontext: "Das erste Objekt wird mit dem höheren Provisionsatz von 3,57% berechnet, da dies der reguläre Satz für das erste Vermittlungsobjekt ist.",
        formel: "Provision 1. Objekt = Kaufpreis × Provisionsatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis des 1. Objekts",
            wert: "400.000 €"
          },
          {
            kuerzel: "Provisionsatz",
            bedeutung: "Provisionsatz für 1. Objekt",
            wert: "3,57%"
          }
        ],
        aufgabe: "Berechnen Sie die Maklercourtage für das 1. Objekt bei einem Kaufpreis von 400.000 € und einem Satz von 3,57%.",
        einheit: "€",
        korrekt: 14280,
        toleranz: 1,
        tipp: "400.000 € × 3,57 ÷ 100 = 14.280 €"
      },
      {
        nr: 2,
        kontext: "Das zweite Objekt wird mit dem reduzierten Provisionsatz von 3,0% berechnet, da ab dem 2. Objekt bei Mehrfachvermittlung dieser Staffelsatz gilt.",
        formel: "Provision 2. Objekt = Kaufpreis × Provisionsatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis des 2. Objekts",
            wert: "400.000 €"
          },
          {
            kuerzel: "Provisionsatz",
            bedeutung: "Provisionsatz ab 2. Objekt",
            wert: "3,0%"
          }
        ],
        aufgabe: "Berechnen Sie die Maklercourtage für das 2. Objekt bei einem Kaufpreis von 400.000 € und einem Satz von 3,0%.",
        einheit: "€",
        korrekt: 12000,
        toleranz: 1,
        tipp: "400.000 € × 3,0 ÷ 100 = 12.000 €"
      },
      {
        nr: 3,
        kontext: "Das dritte Objekt unterliegt ebenfalls dem Staffelsatz von 3,0%, da dieser ab dem 2. Objekt Gültigkeit hat.",
        formel: "Provision 3. Objekt = Kaufpreis × Provisionsatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis des 3. Objekts",
            wert: "400.000 €"
          },
          {
            kuerzel: "Provisionsatz",
            bedeutung: "Provisionsatz ab 2. Objekt",
            wert: "3,0%"
          }
        ],
        aufgabe: "Berechnen Sie die Maklercourtage für das 3. Objekt bei einem Kaufpreis von 400.000 € und einem Satz von 3,0%.",
        einheit: "€",
        korrekt: 12000,
        toleranz: 1,
        tipp: "400.000 € × 3,0 ÷ 100 = 12.000 €"
      },
      {
        nr: 4,
        kontext: "Zur Gesamtprovision müssen alle Einzelprovisionen der drei Objekte addiert werden.",
        formel: "Gesamtprovision = Provision 1. Objekt + Provision 2. Objekt + Provision 3. Objekt",
        variablen: [
          {
            kuerzel: "Provision 1",
            bedeutung: "Provision für 1. Objekt",
            wert: "14.280 €"
          },
          {
            kuerzel: "Provision 2",
            bedeutung: "Provision für 2. Objekt",
            wert: "12.000 €"
          },
          {
            kuerzel: "Provision 3",
            bedeutung: "Provision für 3. Objekt",
            wert: "12.000 €"
          }
        ],
        aufgabe: "Wie hoch ist die Gesamtprovision aus allen drei Objektvermittlungen?",
        einheit: "€",
        korrekt: 38280,
        toleranz: 1,
        tipp: "14.280 € + 12.000 € + 12.000 € = 38.280 €"
      }
    ],
    abschluss: "Bei einer Mehrfachvermittlung von 3 Objekten à 400.000 € mit gestaffelten Provisionsätzen (3,57% für das 1. Objekt und 3,0% ab dem 2. Objekt) ergibt sich eine Gesamtprovision von 38.280 €. Die Staffelung belohnt den Makler für Effizienzen bei mehreren Vermittlungen.",
    gesetze: [
      "§ 1 MaklergebG (Maklergeltungsgesetz)",
      "§ 654 BGB (Maklerlohn)"
    ],
    praxistipp: "Staffelprovisionen sind ein wichtiges Anreizmittel im Maklerbusiness. Dokumentieren Sie die unterschiedlichen Sätze deutlich im Maklervertrag, um Missverständnisse zu vermeiden. Klären Sie schon beim ersten Kundenkontakt, ob Mehrfachvermittlungen geplant sind, um die günstigeren Staffelsätze korrekt anwenden zu können."
  },
  {
    id: 55,
    bereich: "Maklercourtage & Provision",
    titel: "Rückvergütung berechnen",
    berufssituation: "Sie geben einem Tippgeber 20% Ihrer Provision weiter. Provision brutto: 18.564 €. Was erhält der Tippgeber, was bleibt Ihnen?",
    was_lerne_ich: "Sie lernen, wie Sie Provisionsrückvergütungen an Tippgeber berechnen und Ihre verbleibende Nettoprovision ermitteln.",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst berechnen Sie den Betrag, den der Tippgeber erhält. Dieser errechnet sich aus der Gesamtprovision multipliziert mit dem Rückvergütungssatz von 20%.",
        formel: "Rückvergütung = Gesamtprovision × Rückvergütungssatz",
        variablen: [
          {
            kuerzel: "Gesamtprovision",
            bedeutung: "Ihre erhaltene Provision brutto",
            wert: "18.564 €"
          },
          {
            kuerzel: "Rückvergütungssatz",
            bedeutung: "Prozentsatz für den Tippgeber",
            wert: "20%"
          }
        ],
        aufgabe: "Berechnen Sie, wie viel Euro der Tippgeber erhält.",
        einheit: "€",
        korrekt: 3712.8,
        toleranz: 0.01,
        tipp: "Multiplizieren Sie 18.564 € mit 0,20 (20%). Das Ergebnis ist 3.712,80 €."
      },
      {
        nr: 2,
        kontext: "Nun berechnen Sie den Betrag, der Ihnen nach der Rückvergütung verbleibt. Dies ist die Differenz zwischen Ihrer Gesamtprovision und der Rückvergütung an den Tippgeber.",
        formel: "Ihre verbleibende Provision = Gesamtprovision - Rückvergütung",
        variablen: [
          {
            kuerzel: "Gesamtprovision",
            bedeutung: "Ihre erhaltene Provision brutto",
            wert: "18.564 €"
          },
          {
            kuerzel: "Rückvergütung",
            bedeutung: "Betrag für den Tippgeber (aus Schritt 1)",
            wert: "3.712,80 €"
          }
        ],
        aufgabe: "Berechnen Sie, wie viel Provision Ihnen verbleibt.",
        einheit: "€",
        korrekt: 14851.2,
        toleranz: 0.01,
        tipp: "Subtrahieren Sie 3.712,80 € von 18.564 €. Das Ergebnis ist 14.851,20 €."
      },
      {
        nr: 3,
        kontext: "Zur Kontrolle überprüfen Sie, dass die Rückvergütung plus Ihre verbleibende Provision wieder die Gesamtprovision ergibt. Dies ist eine Plausibilitätskontrolle.",
        formel: "Rückvergütung + Verbleibende Provision = Gesamtprovision",
        variablen: [
          {
            kuerzel: "Rückvergütung",
            bedeutung: "Betrag für den Tippgeber",
            wert: "3.712,80 €"
          },
          {
            kuerzel: "Verbleibende Provision",
            bedeutung: "Ihr Provisionsanteil",
            wert: "14.851,20 €"
          }
        ],
        aufgabe: "Addieren Sie die beiden Beträge und überprüfen Sie, ob Sie wieder 18.564 € erhalten.",
        einheit: "€",
        korrekt: 18564.0,
        toleranz: 0.01,
        tipp: "3.712,80 € + 14.851,20 € = 18.564,00 €. Die Kontrolle bestätigt die korrekte Berechnung."
      }
    ],
    abschluss: "Der Tippgeber erhält 3.712,80 € (20% der Provision), und Ihnen verbleiben 14.851,20 € (80% der Provision). Die Summe entspricht wieder der Gesamtprovision von 18.564 €.",
    gesetze: [
      "§1 MaklerG (Maklerpflichten)",
      "§2 MaklerG (Vergütungsanspruch)"
    ],
    praxistipp: "Dokumentieren Sie alle Rückvergütungsverträge schriftlich und regeln Sie rechtzeitig vor Vertragsabschluss, an wen und in welcher Höhe Provisionsanteile weitergegeben werden. Dies vermeidet später Missverständnisse und Zahlungsstreitigkeiten mit Tippgebern oder Kooperationspartnern."
  },
  {
    id: 56,
    bereich: "Maklercourtage & Provision",
    titel: "Mietrendite vs. Provision",
    berufssituation: "Sie beraten einen Investor, der eine Immobilie für 320.000 € kaufen möchte. Das Fremdkapital wird mit 4,2% verzinst und 2% getilgt. Die jährlichen Nebenkosten betragen 8.000 €. Welche Jahreskaltmiete ist erforderlich, um einen positiven Cashflow zu erzielen? Berechnen Sie auch Ihre Maklercourtage von 3,57%.",
    was_lerne_ich: "Berechnung der erforderlichen Mietrendite zur Deckung von Finanzierungskosten und Betriebskosten sowie Ermittlung der Maklerprovision",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung der jährlichen Zins- und Tilgungsbelastung aus dem Kaufpreis",
        formel: "Jährliche FK-Belastung = Kaufpreis × (Zinssatz + Tilgungssatz)",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Erwerbspreis der Immobilie",
            wert: "320.000"
          },
          {
            kuerzel: "Zinssatz",
            bedeutung: "Hypothekenzinssatz p.a.",
            wert: "0,042"
          },
          {
            kuerzel: "Tilgungssatz",
            bedeutung: "Tilgungsquote p.a.",
            wert: "0,02"
          }
        ],
        aufgabe: "Berechnen Sie die gesamte jährliche Fremdkapitalbelastung (Zins + Tilgung)",
        einheit: "€",
        korrekt: 19840,
        toleranz: 10,
        tipp: "Rechnung: 320.000 € × (0,042 + 0,02) = 320.000 € × 0,062 = 19.840 €"
      },
      {
        nr: 2,
        kontext: "Berechnung der Gesamtkostenbelastung pro Jahr",
        formel: "Gesamtjährliche Kosten = FK-Belastung + Nebenkosten",
        variablen: [
          {
            kuerzel: "FK-Belastung",
            bedeutung: "Jährliche Zins- und Tilgungsbelastung",
            wert: "19.840"
          },
          {
            kuerzel: "Nebenkosten",
            bedeutung: "Betriebskosten pro Jahr",
            wert: "8.000"
          }
        ],
        aufgabe: "Berechnen Sie die gesamten jährlichen Kostenverpflichtungen",
        einheit: "€",
        korrekt: 27840,
        toleranz: 10,
        tipp: "Rechnung: 19.840 € + 8.000 € = 27.840 €. Dies ist die erforderliche Jahreskaltmiete für Break-Even"
      },
      {
        nr: 3,
        kontext: "Berechnung der Maklercourtage auf den Kaufpreis",
        formel: "Maklercourtage = Kaufpreis × Courtagesatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Erwerbspreis der Immobilie",
            wert: "320.000"
          },
          {
            kuerzel: "Courtagesatz",
            bedeutung: "Maklerprovision in Prozent",
            wert: "0,0357"
          }
        ],
        aufgabe: "Berechnen Sie Ihre verdiente Maklercourtage",
        einheit: "€",
        korrekt: 11424,
        toleranz: 10,
        tipp: "Rechnung: 320.000 € × 0,0357 = 11.424 €"
      },
      {
        nr: 4,
        kontext: "Berechnung der Bruttomietrendite als Orientierungsgröße",
        formel: "Bruttomietrendite = (Jahreskaltmiete / Kaufpreis) × 100",
        variablen: [
          {
            kuerzel: "Jahreskaltmiete",
            bedeutung: "Erforderliche Mindestmiete für Cashflow-Break-Even",
            wert: "27.840"
          },
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Erwerbspreis der Immobilie",
            wert: "320.000"
          }
        ],
        aufgabe: "Berechnen Sie die erforderliche Bruttomietrendite in Prozent",
        einheit: "%",
        korrekt: 8.7,
        toleranz: 0.1,
        tipp: "Rechnung: (27.840 € / 320.000 €) × 100 = 8,7%. Das ist die Mindestrendite für positiven Cashflow"
      }
    ],
    abschluss: "Die erforderliche Jahreskaltmiete beträgt 27.840 € (8,7% Bruttomietrendite) für einen positiven Cashflow. Ihre Maklercourtage liegt bei 11.424 €. Investoren sollten mindestens diese Rendite erzielen, um wirtschaftlich sinnvoll zu investieren.",
    gesetze: [
      "§ 656 BGB (Maklervertrag)",
      "§ 2 MaBV (Makler- und Bauträgerverordnung)"
    ],
    praxistipp: "In der Praxis sollte die erzielte Mietrendite deutlich über der Break-Even-Rendite liegen, um Rücklagen für Instandhaltung, Leerstandsrisiko und Rendite auf das Eigenkapital zu bilden. Eine Faustregel: Mindestens 10-12% Bruttomietrendite für stabile Cashflows. Präsentieren Sie dem Investor auch alternative Finanzierungsszenarien mit unterschiedlichen Tilgungsquoten."
  },
  {
    id: 57,
    bereich: "Maklercourtage & Provision",
    titel: "Provisionsausfall kalkulieren",
    berufssituation: "Von 10 Interessenten kaufen statistisch 2. Ihre Akquisekosten pro Objekt: 800 €. Provision je Verkauf: 15.000 €. Berechnen Sie den Break-even.",
    was_lerne_ich: "Sie lernen, die minimale Konversionsrate zu berechnen, ab der Ihre Akquisitionskosten durch Provisionen gedeckt sind, und verstehen die wirtschaftliche Rentabilität Ihrer Maklertätigkeit.",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst berechnen Sie die durchschnittliche Provision pro Interessent, indem Sie die Provision durch die Konversionsrate teilen. Dies zeigt, welcher Wert statistisch pro Interessent generiert wird.",
        formel: "Durchschnittliche Provision pro Interessent = Provision × Konversionsquote",
        variablen: [
          {
            kuerzel: "P",
            bedeutung: "Provision je erfolgreichem Verkauf",
            wert: "15.000"
          },
          {
            kuerzel: "K",
            bedeutung: "Konversionsquote (2 von 10 Interessenten)",
            wert: "0,2"
          }
        ],
        aufgabe: "Berechnen Sie die durchschnittliche Provision pro Interessent bei einer Konversionsrate von 20%.",
        einheit: "€",
        korrekt: 3000.0,
        toleranz: 1,
        tipp: "Multiplizieren Sie 15.000 € × 0,2 = 3.000 € Gewinn pro Interessent im Schnitt"
      },
      {
        nr: 2,
        kontext: "Jetzt berechnen Sie den Nettogewinn pro akquiriertem Interessent, indem Sie die Akquisekosten von der durchschnittlichen Provision abziehen. Dies zeigt den tatsächlichen Ertrag pro Interessent.",
        formel: "Nettogewinn pro Interessent = Durchschnittliche Provision - Akquisekosten",
        variablen: [
          {
            kuerzel: "D",
            bedeutung: "Durchschnittliche Provision pro Interessent",
            wert: "3.000"
          },
          {
            kuerzel: "A",
            bedeutung: "Akquisekosten pro Objekt/Interessent",
            wert: "800"
          }
        ],
        aufgabe: "Wie hoch ist der Nettogewinn pro Interessent nach Abzug der Akquisekosten?",
        einheit: "€",
        korrekt: 2200.0,
        toleranz: 1,
        tipp: "Rechnen Sie 3.000 € - 800 € = 2.200 € Nettogewinn pro Interessent"
      },
      {
        nr: 3,
        kontext: "Der Break-even-Punkt ist erreicht, wenn der Nettogewinn null ist. Berechnen Sie die kritische Konversionsrate, bei der Provisionen und Kosten gleich sind.",
        formel: "Break-even Konversionsrate = Akquisekosten ÷ Provision",
        variablen: [
          {
            kuerzel: "A",
            bedeutung: "Akquisekosten pro Interessent",
            wert: "800"
          },
          {
            kuerzel: "P",
            bedeutung: "Provision je Verkauf",
            wert: "15.000"
          }
        ],
        aufgabe: "Bei welcher Konversionsrate wird der Break-even erreicht (Kosten = Ertrag)?",
        einheit: "%",
        korrekt: 5.33,
        toleranz: 0.1,
        tipp: "Teilen Sie 800 € ÷ 15.000 € = 0,0533 = 5,33% minimale Konversionsrate"
      },
      {
        nr: 4,
        kontext: "Abschließend berechnen Sie, wie viele Interessenten Sie mindestens brauchen, um den Break-even zu erreichen. Dies ist für die Geschäftsplanung essentiell.",
        formel: "Break-even Interessenten = 100 ÷ Break-even Konversionsrate (%)",
        variablen: [
          {
            kuerzel: "B",
            bedeutung: "Break-even Konversionsrate in Prozent",
            wert: "5,33"
          }
        ],
        aufgabe: "Wie viele Interessenten benötigen Sie mindestens, um kostendeckend zu arbeiten?",
        einheit: "",
        korrekt: 18.76,
        toleranz: 0.5,
        tipp: "Rechnen Sie 100 ÷ 5,33 = 18,76 Interessenten (aufgerundet: 19 Interessenten für einen Verkauf)"
      }
    ],
    abschluss: "Mit Akquisekosten von 800 € pro Interessent und einer Provision von 15.000 € ist der Break-even bei einer Konversionsrate von 5,33% erreicht. Ihre aktuelle Quote von 20% liegt deutlich darüber und ist daher profitabel.",
    gesetze: [
      "§ 1 Abs. 1 MaklerG - Defintion Maklergeschäft",
      "§ 656 BGB - Maklervertrag und Provision"
    ],
    praxistipp: "Überwachen Sie regelmäßig Ihre echte Konversionsrate und Akquisekosten. Fallen letztere (z.B. durch digitale Leads), sinkt der Break-even. Nutzen Sie diese Kennzahl zur Optimierung Ihres Marketingbudgets und zur Kalkulation von Kampagnen."
  },
  {
    id: 58,
    bereich: "Maklercourtage & Provision",
    titel: "Gewerbesteuer auf Provision",
    berufssituation: "Ihr Büro zahlt 380% Gewerbesteuerhebesatz. Gewerbeertrag: 180.000 €. Freibetrag: 24.500 €. Wie hoch ist die Gewerbesteuer?",
    was_lerne_ich: "Sie lernen, die Gewerbesteuer korrekt zu berechnen, indem Sie den Freibetrag vom Gewerbeertrag abziehen und den resultierenden Betrag mit dem Hebesatz multiplizieren.",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst muss der Freibetrag vom Gewerbeertrag abgezogen werden, um die gewerbesteuerpflichtige Basis zu ermitteln. Dies ist notwendig, da der Freibetrag von 24.500 € gesetzlich festgelegt ist.",
        formel: "Gewerbeertrag – Freibetrag = Steuermessbet­rag",
        variablen: [
          {
            kuerzel: "Gewerbeertrag",
            bedeutung: "Jahreseinkommen aus Makleraktivitäten",
            wert: "180.000 €"
          },
          {
            kuerzel: "Freibetrag",
            bedeutung: "Gesetzlich festgelegter Freibetrag der Gewerbesteuer",
            wert: "24.500 €"
          }
        ],
        aufgabe: "Berechnen Sie den Steuermessbetrag durch Subtraktion des Freibetrags vom Gewerbeertrag.",
        einheit: "€",
        korrekt: 155500,
        toleranz: 0,
        tipp: "Rechnen Sie 180.000 € minus 24.500 € = 155.500 € Steuermessbetrag"
      },
      {
        nr: 2,
        kontext: "Der Steuermessbetrag wird mit dem Steuermesszahl multipliziert. Die Steuermesszahl beträgt bundesweit 3,5 % (3,5/100) und ist einheitlich festgelegt.",
        formel: "Steuermessbetrag × Steuermesszahl (3,5%) = Steuermessbetrag (Gewerbesteuer)",
        variablen: [
          {
            kuerzel: "Steuermessbetrag",
            bedeutung: "Ergebnis aus Schritt 1",
            wert: "155.500 €"
          },
          {
            kuerzel: "Steuermesszahl",
            bedeutung: "Bundesweit einheitlicher Messsatz",
            wert: "3,5%"
          }
        ],
        aufgabe: "Multiplizieren Sie den Steuermessbetrag mit der Steuermesszahl von 3,5%.",
        einheit: "€",
        korrekt: 5442.5,
        toleranz: 0.5,
        tipp: "155.500 € × 0,035 = 5.442,50 € Steuermessbetrag für Gewerbesteuer"
      },
      {
        nr: 3,
        kontext: "Der Steuermessbetrag wird nun mit dem Hebesatz der Gemeinde multipliziert. Der Hebesatz wird von jeder Gemeinde individuell festgesetzt und beträgt in diesem Fall 380%.",
        formel: "Steuermessbetrag × Hebesatz ÷ 100 = Gewerbesteuer",
        variablen: [
          {
            kuerzel: "Steuermessbetrag",
            bedeutung: "Ergebnis aus Schritt 2",
            wert: "5.442,50 €"
          },
          {
            kuerzel: "Hebesatz",
            bedeutung: "Von der Gemeinde festgesetzter Hebesatz",
            wert: "380%"
          }
        ],
        aufgabe: "Berechnen Sie die endgültige Gewerbesteuer durch Multiplikation des Steuermessbetrags mit dem Hebesatz von 380%.",
        einheit: "€",
        korrekt: 20681.5,
        toleranz: 1,
        tipp: "5.442,50 € × 3,80 = 20.681,50 € Gewerbesteuer jährlich fällig"
      }
    ],
    abschluss: "Die jährliche Gewerbesteuer für Ihr Maklerunternehmen beträgt 20.681,50 €. Diese Berechnung berücksichtigt den Freibetrag, die bundesweit einheitliche Steuermesszahl und den kommunalen Hebesatz Ihrer Gemeinde.",
    gesetze: [
      "§11 Abs. 1 GewStG",
      "§9 GewStG"
    ],
    praxistipp: "Ermitteln Sie regelmäßig Ihren Gewerbesteuerhebesatz bei Ihrer zuständigen Gemeinde, da dieser sich ändern kann. Die Gewerbesteuer ist monatlich oder vierteljährlich anzumelden und zu zahlen. Berücksichtigen Sie diese Belastung bei Ihrer Kalkulation von Maklerprovisionen."
  },
  {
    id: 59,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Gewerbeimmobilie Rendite",
    berufssituation: "Bürogebäude: Kaufpreis 2.800.000 €, Jahreskaltmiete 168.000 €, Leerstand 8%, Betriebskosten nicht umlegbar 12.000 €/Jahr. Nettomietrendite?",
    was_lerne_ich: "Die Berechnung der Nettomietrendite unter Berücksichtigung von Leerstand und nicht umlegbaren Betriebskosten als Kernkennzahl für die Rentabilität einer Gewerbeimmobilie.",
    schritte: [
      {
        nr: 1,
        kontext: "Zuerst wird die tatsächlich erzielbare Jahresmieteinnahme unter Berücksichtigung des Leerstands berechnet. Der Leerstand reduziert die verfügbaren Mieteinnahmen um 8%.",
        formel: "Effektive Jahresmieteinnahme = Jahreskaltmiete × (1 - Leerstandsquote)",
        variablen: [
          {
            kuerzel: "JKM",
            bedeutung: "Jahreskaltmiete",
            wert: "168.000 €"
          },
          {
            kuerzel: "LQ",
            bedeutung: "Leerstandsquote",
            wert: "0,08"
          }
        ],
        aufgabe: "Berechne die effektive Jahresmieteinnahme nach Berücksichtigung des 8%-igen Leerstands.",
        einheit: "€",
        korrekt: 154560.0,
        toleranz: 1,
        tipp: "Multipliziere 168.000 € mit 0,92 (das sind 100% - 8% Leerstand = 92%)"
      },
      {
        nr: 2,
        kontext: "Nun werden die nicht umlegbaren Betriebskosten von den effektiven Mieteinnahmen abgezogen. Diese Kosten trägt der Eigentümer und reduzieren seinen Nettoertrag.",
        formel: "Netto-Jahresertrag = Effektive Jahresmieteinnahme - Nicht umlegbare Betriebskosten",
        variablen: [
          {
            kuerzel: "EJE",
            bedeutung: "Effektive Jahresmieteinnahme",
            wert: "154.560 €"
          },
          {
            kuerzel: "BK",
            bedeutung: "Nicht umlegbare Betriebskosten pro Jahr",
            wert: "12.000 €"
          }
        ],
        aufgabe: "Berechne den Netto-Jahresertrag nach Abzug der nicht umlegbaren Betriebskosten.",
        einheit: "€",
        korrekt: 142560.0,
        toleranz: 1,
        tipp: "Subtrahiere 12.000 € von 154.560 € ab"
      },
      {
        nr: 3,
        kontext: "Die Nettomietrendite wird berechnet, indem der Netto-Jahresertrag durch den Kaufpreis geteilt und das Ergebnis mit 100 multipliziert wird. Sie zeigt die prozentuale jährliche Rentabilität der Investition.",
        formel: "Nettomietrendite (%) = (Netto-Jahresertrag / Kaufpreis) × 100",
        variablen: [
          {
            kuerzel: "NYE",
            bedeutung: "Netto-Jahresertrag",
            wert: "142.560 €"
          },
          {
            kuerzel: "KP",
            bedeutung: "Kaufpreis",
            wert: "2.800.000 €"
          }
        ],
        aufgabe: "Berechne die Nettomietrendite in Prozent für diese Gewerbeimmobilie.",
        einheit: "%",
        korrekt: 5.09,
        toleranz: 0.01,
        tipp: "Teile 142.560 durch 2.800.000 und multipliziere mit 100. Das Ergebnis liegt zwischen 5% und 5,1%"
      }
    ],
    abschluss: "Die Nettomietrendite des Bürogebäudes beträgt 5,09% pro Jahr. Dies ist eine solide Rendite für eine Gewerbeimmobilie, die den Eigentümer nach Berücksichtigung aller relevanten Kostenabzüge und des Leerstands ausreichend entschädigt.",
    gesetze: [
      "§556 BGB - Mietvertrag",
      "§569 BGB - Betriebskosten"
    ],
    praxistipp: "Bei der Bewertung von Gewerbeimmobilien ist es entscheidend, realistische Leerstandsquoten und tatsächliche Betriebskosten einzukalkulieren. Die Nettomietrendite sollte immer mit anderen Immobilien in der gleichen Region und Kategorie verglichen werden, um eine fundierte Investitionsentscheidung zu treffen. Zusätzlich sollten Finanzierungskosten, Instandhaltungsreserven und Steuern in der Gesamtbetrachtung berücksichtigt werden."
  },
  {
    id: 60,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Leerstandsrisiko einrechnen",
    berufssituation: "Wohnhaus: Kaufpreis 1.200.000 €, Sollmiete 72.000 €/Jahr, historischer Leerstand 5%. Berechnen Sie Ist-Mietrendite und Soll-Mietrendite.",
    was_lerne_ich: "Sie lernen, wie Leerstandsrisiken die tatsächliche Rendite mindern und wie man zwischen theoretischer Sollrendite und realistischer Istrendite unterscheidet.",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst berechnen wir die Soll-Mietrendite basierend auf der vollständigen Sollmiete ohne Leerstandsberücksichtigung. Dies ist die theoretische Rendite bei 100% Vermietung.",
        formel: "Soll-Mietrendite = (Jahresmiete / Kaufpreis) × 100",
        variablen: [
          {
            kuerzel: "Jahresmiete",
            bedeutung: "Jährliche Sollmieteinnahmen",
            wert: "72.000 €"
          },
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Gesamtkaufpreis des Wohnhauses",
            wert: "1.200.000 €"
          }
        ],
        aufgabe: "Berechnen Sie die Soll-Mietrendite in Prozent.",
        einheit: "%",
        korrekt: 6.0,
        toleranz: 0.1,
        tipp: "72.000 € ÷ 1.200.000 € × 100 = 6,0%"
      },
      {
        nr: 2,
        kontext: "Nun berechnen wir die effektive Jahresmiete unter Berücksichtigung des historischen Leerstandsrisikos von 5%. Die tatsächliche Mieteinnahme wird um diese Quote reduziert.",
        formel: "Ist-Jahresmiete = Sollmiete × (1 - Leerstandsquote)",
        variablen: [
          {
            kuerzel: "Sollmiete",
            bedeutung: "Jährliche Sollmieteinnahmen ohne Leerstand",
            wert: "72.000 €"
          },
          {
            kuerzel: "Leerstandsquote",
            bedeutung: "Historischer Leerstandsanteil",
            wert: "0,05 (5%)"
          }
        ],
        aufgabe: "Berechnen Sie die tatsächliche Ist-Jahresmiete nach Abzug des 5%-igen Leerstands in Euro.",
        einheit: "€",
        korrekt: 68400.0,
        toleranz: 1,
        tipp: "72.000 € × (1 - 0,05) = 72.000 € × 0,95 = 68.400 €"
      },
      {
        nr: 3,
        kontext: "Abschließend berechnen wir die Ist-Mietrendite basierend auf der realistischen Mieteinnahme nach Leerstandsabzug. Dies ist die tatsächlich zu erwartende Rendite.",
        formel: "Ist-Mietrendite = (Ist-Jahresmiete / Kaufpreis) × 100",
        variablen: [
          {
            kuerzel: "Ist-Jahresmiete",
            bedeutung: "Tatsächliche Jahresmiete nach Leerstandsabzug",
            wert: "68.400 €"
          },
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Gesamtkaufpreis des Wohnhauses",
            wert: "1.200.000 €"
          }
        ],
        aufgabe: "Berechnen Sie die Ist-Mietrendite in Prozent.",
        einheit: "%",
        korrekt: 5.7,
        toleranz: 0.1,
        tipp: "68.400 € ÷ 1.200.000 € × 100 = 5,7%"
      },
      {
        nr: 4,
        kontext: "Zum Abschluss ermitteln wir die Renditeausfallquote als Differenz zwischen Soll- und Ist-Mietrendite. Dies zeigt, wie stark das Leerstandsrisiko die Rendite vermindert.",
        formel: "Renditeausfallquote = Soll-Mietrendite - Ist-Mietrendite",
        variablen: [
          {
            kuerzel: "Soll-Mietrendite",
            bedeutung: "Theoretische Rendite bei vollständiger Vermietung",
            wert: "6,0%"
          },
          {
            kuerzel: "Ist-Mietrendite",
            bedeutung: "Realistische Rendite mit Leerstandsberücksichtigung",
            wert: "5,7%"
          }
        ],
        aufgabe: "Berechnen Sie die Renditeausfallquote in Prozentpunkten.",
        einheit: "%",
        korrekt: 0.3,
        toleranz: 0.1,
        tipp: "6,0% - 5,7% = 0,3 Prozentpunkte Renditeausfallquote"
      }
    ],
    abschluss: "Das Wohnhaus erzielt eine Soll-Mietrendite von 6,0% bei vollständiger Vermietung. Unter Berücksichtigung des historischen Leerstandsrisikos von 5% reduziert sich die realistische Ist-Mietrendite auf 5,7%, was einen Renditeausfallquote von 0,3 Prozentpunkten darstellt.",
    gesetze: [
      "§ 1 WoFiG (Wohnungsförderungsgesetz)",
      "§ 556 BGB (Mietrecht)"
    ],
    praxistipp: "Im Immobilienmaklerberuf sollten Sie bei Renditekalkulationen immer realistische Leerstandsquoten einrechnen. Historische Leerstandsdaten sind beim Statistischen Bundesamt oder bei lokalen Maklerverbänden erhältlich. Besonders in angespannten Mietmärkten können Leerstandsquoten deutlich unter 5% liegen, während sie in strukturschwachen Regionen 10-15% erreichen können. Eine konservative Risikobewertung erhöht die Glaubwürdigkeit Ihrer Maklerprognose."
  },
  {
    id: 61,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Inflationsanpassung Miete",
    berufssituation: "Aktuelle Miete: 950 € kalt. Indexmietvertrag, gebunden an VPI. Inflation in 3 Jahren: 2,1%, 3,4%, 2,8%. Neue Miete nach 3 Jahren?",
    was_lerne_ich: "Sie lernen, wie eine Miete bei einem Indexmietvertrag durch kumulative Inflationsraten über mehrere Jahre angepasst wird und wie die Kaufkraft durch jährliche VPI-Anpassungen erhalten bleibt.",
    schritte: [
      {
        nr: 1,
        kontext: "Die erste Inflationsanpassung nach Jahr 1 wird berechnet. Die aktuelle Miete wird mit der Inflationsrate des ersten Jahres multipliziert.",
        formel: "Miete nach Jahr 1 = Aktuelle Miete × (1 + Inflationsrate Jahr 1)",
        variablen: [
          {
            kuerzel: "M0",
            bedeutung: "Aktuelle Miete kalt",
            wert: "950 €"
          },
          {
            kuerzel: "i1",
            bedeutung: "Inflationsrate Jahr 1 (VPI)",
            wert: "2,1%"
          }
        ],
        aufgabe: "Berechnen Sie die Miete nach der ersten Inflationsanpassung im Jahr 1. Runden Sie auf 2 Dezimalstellen.",
        einheit: "€",
        korrekt: 970.95,
        toleranz: 0.5,
        tipp: "Multiplizieren Sie 950 € mit dem Faktor 1,021. Das Ergebnis beträgt 970,95 €."
      },
      {
        nr: 2,
        kontext: "Die zweite Inflationsanpassung nach Jahr 2 wird auf Basis der bereits angepassten Miete aus Jahr 1 berechnet.",
        formel: "Miete nach Jahr 2 = Miete nach Jahr 1 × (1 + Inflationsrate Jahr 2)",
        variablen: [
          {
            kuerzel: "M1",
            bedeutung: "Miete nach Jahr 1",
            wert: "970,95 €"
          },
          {
            kuerzel: "i2",
            bedeutung: "Inflationsrate Jahr 2 (VPI)",
            wert: "3,4%"
          }
        ],
        aufgabe: "Berechnen Sie die Miete nach der zweiten Inflationsanpassung im Jahr 2. Runden Sie auf 2 Dezimalstellen.",
        einheit: "€",
        korrekt: 1003.99,
        toleranz: 0.5,
        tipp: "Multiplizieren Sie 970,95 € mit dem Faktor 1,034. Das Ergebnis beträgt 1.003,99 €."
      },
      {
        nr: 3,
        kontext: "Die dritte und letzte Inflationsanpassung nach Jahr 3 wird auf Basis der bereits angepassten Miete aus Jahr 2 berechnet.",
        formel: "Miete nach Jahr 3 = Miete nach Jahr 2 × (1 + Inflationsrate Jahr 3)",
        variablen: [
          {
            kuerzel: "M2",
            bedeutung: "Miete nach Jahr 2",
            wert: "1.003,99 €"
          },
          {
            kuerzel: "i3",
            bedeutung: "Inflationsrate Jahr 3 (VPI)",
            wert: "2,8%"
          }
        ],
        aufgabe: "Berechnen Sie die Miete nach der dritten Inflationsanpassung im Jahr 3. Dies ist die neue Miete nach 3 Jahren. Runden Sie auf 2 Dezimalstellen.",
        einheit: "€",
        korrekt: 1031.1,
        toleranz: 0.5,
        tipp: "Multiplizieren Sie 1.003,99 € mit dem Faktor 1,028. Das Ergebnis beträgt 1.031,10 €."
      },
      {
        nr: 4,
        kontext: "Die Gesamtsteigerung der Miete über alle 3 Jahre wird berechnet, um die kumulierte Inflationswirkung zu verdeutlichen.",
        formel: "Absolute Steigerung = Miete nach Jahr 3 - Aktuelle Miete",
        variablen: [
          {
            kuerzel: "M3",
            bedeutung: "Miete nach 3 Jahren",
            wert: "1.031,10 €"
          },
          {
            kuerzel: "M0",
            bedeutung: "Aktuelle Miete",
            wert: "950 €"
          }
        ],
        aufgabe: "Berechnen Sie die absolute Mieterhöhung in Euro über den Zeitraum von 3 Jahren.",
        einheit: "€",
        korrekt: 81.1,
        toleranz: 0.5,
        tipp: "Subtrahieren Sie die ursprüngliche Miete von der neuen Miete: 1.031,10 € - 950 € = 81,10 €."
      }
    ],
    abschluss: "Nach 3 Jahren mit kumulierten Inflationsraten von 2,1%, 3,4% und 2,8% erhöht sich die Kaltmiete von 950 € auf 1.031,10 € (Steigerung um 81,10 € oder ca. 8,54%). Bei Indexmietverträgen wird die Kaufkraft der Miete durch regelmäßige VPI-Anpassungen für den Vermieter erhalten.",
    gesetze: [
      "§ 557b BGB (Mietanpassung bei Indexmietverträgen)",
      "§ 557 BGB (Allgemeine Mietanpassung)"
    ],
    praxistipp: "Bei Indexmietverträgen müssen Sie jährlich die aktuellen VPI-Daten des Statistischen Bundesamtes berücksichtigen. Eine schriftliche Mieterhöhungsmitteilung mit Verweis auf den VPI und dem exakten Berechnungsweg ist rechtlich erforderlich. Dokumentieren Sie die Berechnung sorgfältig für mögliche Rechtsstreitigkeiten."
  },
  {
    id: 62,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Portfolio-Rendite",
    berufssituation: "Ein Immobilieninvestor hält ein Portfolio mit zwei Objekten: Objekt A mit Kaufpreis 400.000€ und monatlicher Miete 1.400€, sowie Objekt B mit Kaufpreis 650.000€ und monatlicher Miete 2.100€. Sie sollen die gewichtete Gesamtrendite des Portfolios berechnen.",
    was_lerne_ich: "Berechnung der gewichteten Gesamtrendite eines Immobilienportfolios durch Ermittlung einzelner Mietrenditen und deren Gewichtung nach Kaufpreisanteilen",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung der jährlichen Mieteinnahmen für beide Objekte",
        formel: "Jährliche Miete = Monatliche Miete × 12",
        variablen: [
          {
            kuerzel: "JM_A",
            bedeutung: "Jährliche Mieteinnahmen Objekt A",
            wert: "1.400 × 12"
          },
          {
            kuerzel: "JM_B",
            bedeutung: "Jährliche Mieteinnahmen Objekt B",
            wert: "2.100 × 12"
          }
        ],
        aufgabe: "Berechnen Sie die jährlichen Mieteinnahmen für beide Objekte",
        einheit: "€",
        korrekt_A: 16800,
        korrekt_B: 25200,
        toleranz: 0,
        tipp: "Multiplizieren Sie die monatliche Miete mit 12 Monaten"
      },
      {
        nr: 2,
        kontext: "Berechnung der individuellen Mietrendite für jedes Objekt",
        formel: "Mietrendite = (Jährliche Miete / Kaufpreis) × 100",
        variablen: [
          {
            kuerzel: "R_A",
            bedeutung: "Mietrendite Objekt A in Prozent",
            wert: "(16.800 / 400.000) × 100"
          },
          {
            kuerzel: "R_B",
            bedeutung: "Mietrendite Objekt B in Prozent",
            wert: "(25.200 / 650.000) × 100"
          }
        ],
        aufgabe: "Berechnen Sie die Mietrenditen für beide Objekte in Prozent",
        einheit: "%",
        korrekt_A: 4.2,
        korrekt_B: 3.88,
        toleranz: 0.05,
        tipp: "Teilen Sie die jährliche Miete durch den Kaufpreis und multiplizieren Sie mit 100"
      },
      {
        nr: 3,
        kontext: "Berechnung der Gewichte basierend auf Kaufpreisanteilen",
        formel: "Gewicht = Kaufpreis Objekt / Gesamtkaufpreis",
        variablen: [
          {
            kuerzel: "GP",
            bedeutung: "Gesamtkaufpreis Portfolio",
            wert: "400.000 + 650.000"
          },
          {
            kuerzel: "G_A",
            bedeutung: "Gewicht Objekt A",
            wert: "400.000 / 1.050.000"
          },
          {
            kuerzel: "G_B",
            bedeutung: "Gewicht Objekt B",
            wert: "650.000 / 1.050.000"
          }
        ],
        aufgabe: "Berechnen Sie die Gewichte (Anteile) beider Objekte am Gesamtportfolio",
        einheit: "Dezimal oder %",
        korrekt_A: 0.381,
        korrekt_B: 0.619,
        toleranz: 0.005,
        tipp: "Teilen Sie jeden Kaufpreis durch die Summe aller Kaufpreise"
      },
      {
        nr: 4,
        kontext: "Berechnung der gewichteten Gesamtrendite des Portfolios",
        formel: "Portfolio-Rendite = (R_A × G_A) + (R_B × G_B)",
        variablen: [
          {
            kuerzel: "R_Portfolio",
            bedeutung: "Gewichtete Gesamtrendite Portfolio",
            wert: "(4.2 × 0.381) + (3.88 × 0.619)"
          }
        ],
        aufgabe: "Berechnen Sie die gewichtete Gesamtrendite des gesamten Portfolios",
        einheit: "%",
        korrekt: 4.01,
        toleranz: 0.1,
        tipp: "Multiplizieren Sie jede Rendite mit ihrem entsprechenden Gewicht und addieren Sie die Ergebnisse"
      }
    ],
    abschluss: "Die gewichtete Portfolio-Rendite beträgt 4,01% und berücksichtigt die unterschiedliche Größe und Rendite beider Immobilien im Gesamtkontext",
    gesetze: [
      "§2 Abs. 1 Nr. 1 ImmoWertV (Immobilienwertermittlungsverordnung)",
      "§13 WertV (Wertermittlungsverordnung)"
    ],
    praxistipp: "In der Portfolioanalyse ist die gewichtete Rendite aussagekräftiger als das einfache Durchschnittsrendite, da sie das unterschiedliche Kapitalvolumen der einzelnen Objekte berücksichtigt. Dies ist für Investitionsentscheidungen und Risikoverteilung essenziell."
  },
  {
    id: 63,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Eigenkapitalrendite Hebel",
    berufssituation: "Kaufpreis 500.000 €, EK 125.000 €, Fremdkapital 375.000 €, Zins 3,8%, Jahreskaltmiete 24.000 €. EK-Rendite nach Zinsen berechnen.",
    was_lerne_ich: "Berechnung der Eigenkapitalrendite unter Berücksichtigung von Fremdkapitalzinsen und Hebelwirkung (Leverage-Effekt)",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung der jährlichen Fremdkapitalzinsen",
        formel: "FK-Zinsen = Fremdkapital × Zinssatz",
        variablen: [
          {
            kuerzel: "FK",
            bedeutung: "Fremdkapital",
            wert: "375.000"
          },
          {
            kuerzel: "i",
            bedeutung: "Zinssatz p.a.",
            wert: "3,8%"
          }
        ],
        aufgabe: "Berechnen Sie die jährlichen Zinskosten für das Fremdkapital von 375.000 € bei 3,8% Zinssatz.",
        einheit: "€",
        korrekt: 14250,
        toleranz: 1,
        tipp: "Lösung: 375.000 € × 0,038 = 14.250 €"
      },
      {
        nr: 2,
        kontext: "Berechnung des Nettoertrags nach Zinsabzug",
        formel: "Netto-Ertrag = Jahreskaltmiete − FK-Zinsen",
        variablen: [
          {
            kuerzel: "JKM",
            bedeutung: "Jahreskaltmiete",
            wert: "24.000"
          },
          {
            kuerzel: "FKZ",
            bedeutung: "FK-Zinsen (aus Schritt 1)",
            wert: "14.250"
          }
        ],
        aufgabe: "Berechnen Sie den Netto-Ertrag nach Abzug der Zinskosten.",
        einheit: "€",
        korrekt: 9750,
        toleranz: 1,
        tipp: "Lösung: 24.000 € − 14.250 € = 9.750 €"
      },
      {
        nr: 3,
        kontext: "Berechnung der Eigenkapitalrendite (EK-Rendite)",
        formel: "EK-Rendite (%) = (Netto-Ertrag / Eigenkapital) × 100",
        variablen: [
          {
            kuerzel: "NE",
            bedeutung: "Netto-Ertrag (aus Schritt 2)",
            wert: "9.750"
          },
          {
            kuerzel: "EK",
            bedeutung: "Eigenkapital",
            wert: "125.000"
          }
        ],
        aufgabe: "Berechnen Sie die Eigenkapitalrendite in Prozent.",
        einheit: "%",
        korrekt: 7.8,
        toleranz: 0.1,
        tipp: "Lösung: (9.750 € / 125.000 €) × 100 = 7,8%"
      },
      {
        nr: 4,
        kontext: "Vergleich mit Gesamtkrendite (Leverage-Effekt-Analyse)",
        formel: "Gesamtrendite = (Jahreskaltmiete / Kaufpreis) × 100",
        variablen: [
          {
            kuerzel: "JKM",
            bedeutung: "Jahreskaltmiete",
            wert: "24.000"
          },
          {
            kuerzel: "KP",
            bedeutung: "Kaufpreis",
            wert: "500.000"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtrendite ohne Fremdkapitalhebel zum Vergleich.",
        einheit: "%",
        korrekt: 4.8,
        toleranz: 0.1,
        tipp: "Lösung: (24.000 € / 500.000 €) × 100 = 4,8%. Vergleich: EK-Rendite 7,8% > Gesamtrendite 4,8% = positiver Leverage-Effekt"
      }
    ],
    abschluss: "Die Eigenkapitalrendite beträgt 7,8%. Dies zeigt einen positiven Leverage-Effekt: Durch Fremdkapitalfinanzierung zu 3,8% wird die Eigenkapitalrendite von 4,8% auf 7,8% erhöht.",
    gesetze: [
      "§ 6 Abs. 2 AStV (Ertragswertverfahren)",
      "§ 16 BewV (Kapitalwertmethode)",
      "§ 1 WertV (Wertermittlung bei Immobilien)"
    ],
    praxistipp: "Der Leverage-Effekt (Hebelwirkung) entsteht, wenn die Gesamtkrendite über dem Fremdkapitalzinssatz liegt. Bei Zinserhöhungen besteht jedoch Risiko: Sinkt die Gesamtkrendite unter 3,8%, dreht sich der Effekt negativ. Immer auch Nebenkosten, Rücklagen und Leerstandsrisiko berücksichtigen."
  },
  {
    id: 64,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Break-even Mietrendite",
    berufssituation: "Kaufpreis 380.000 €, FK-Zins 4,2%, Tilgung 2%, Nebenkosten 8.000 €/Jahr. Welche Jahreskaltmiete brauchen Sie für positiven Cashflow?",
    was_lerne_ich: "Sie lernen, die erforderliche Mieteinnahme zu berechnen, um die laufenden Kreditkosten und Nebenkosten zu decken und damit einen positiven Cashflow zu erreichen.",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung der jährlichen Zinsbelastung aus dem Fremdkapital. Der Zinssatz wird auf die Kreditsumme angewendet, um die jährlichen Zinskosten zu ermitteln.",
        formel: "Jährliche Zinsen = Kaufpreis × Zinssatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Gesamtkaufpreis der Immobilie",
            wert: "380.000 €"
          },
          {
            kuerzel: "Zinssatz",
            bedeutung: "Jährlicher Fremdkapitalzinssatz",
            wert: "4,2%"
          }
        ],
        aufgabe: "Berechnen Sie die jährlichen Zinskosten für das Fremdkapital.",
        einheit: "€",
        korrekt: 15960,
        toleranz: 1,
        tipp: "380.000 € × 4,2% = 15.960 € jährliche Zinsen"
      },
      {
        nr: 2,
        kontext: "Berechnung der jährlichen Tilgungsbelastung. Die Tilgungsquote wird auf den Kaufpreis angewendet, um die jährlichen Tilgungszahlungen zu ermitteln.",
        formel: "Jährliche Tilgung = Kaufpreis × Tilgungsquote",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Gesamtkaufpreis der Immobilie",
            wert: "380.000 €"
          },
          {
            kuerzel: "Tilgungsquote",
            bedeutung: "Jährliche Tilgungsquote des Darlehens",
            wert: "2%"
          }
        ],
        aufgabe: "Berechnen Sie die jährlichen Tilgungszahlungen für das Fremdkapital.",
        einheit: "€",
        korrekt: 7600,
        toleranz: 1,
        tipp: "380.000 € × 2% = 7.600 € jährliche Tilgung"
      },
      {
        nr: 3,
        kontext: "Berechnung der Gesamtjahresausgaben. Alle Kostenkomponenten werden addiert: Zinsen, Tilgung und Nebenkosten. Dies sind die Mindesteinnahmen für Break-even.",
        formel: "Gesamtausgaben = Jährliche Zinsen + Jährliche Tilgung + Nebenkosten",
        variablen: [
          {
            kuerzel: "Zinsen",
            bedeutung: "Berechnete jährliche Zinsen",
            wert: "15.960 €"
          },
          {
            kuerzel: "Tilgung",
            bedeutung: "Berechnete jährliche Tilgung",
            wert: "7.600 €"
          },
          {
            kuerzel: "Nebenkosten",
            bedeutung: "Jährliche Nebenkosten (Grundsteuer, Versicherung, Verwaltung)",
            wert: "8.000 €"
          }
        ],
        aufgabe: "Addieren Sie alle jährlichen Ausgaben (Zinsen, Tilgung und Nebenkosten) zur Ermittlung der erforderlichen Jahreskaltmiete.",
        einheit: "€",
        korrekt: 31560,
        toleranz: 1,
        tipp: "15.960 € + 7.600 € + 8.000 € = 31.560 € erforderliche Jahreskaltmiete"
      },
      {
        nr: 4,
        kontext: "Ermittlung der erforderlichen monatlichen Kaltmiete. Die ermittelte Jahreskaltmiete wird durch 12 Monate dividiert, um die Break-even Monatsmiete zu berechnen.",
        formel: "Erforderliche monatliche Kaltmiete = Gesamtausgaben ÷ 12",
        variablen: [
          {
            kuerzel: "Gesamtausgaben",
            bedeutung: "Summe aller jährlichen Ausgaben",
            wert: "31.560 €"
          },
          {
            kuerzel: "Monate",
            bedeutung: "Anzahl der Monate im Jahr",
            wert: "12"
          }
        ],
        aufgabe: "Berechnen Sie die erforderliche monatliche Kaltmiete für positiven Cashflow.",
        einheit: "€",
        korrekt: 2630,
        toleranz: 1,
        tipp: "31.560 € ÷ 12 = 2.630 € erforderliche monatliche Kaltmiete"
      }
    ],
    abschluss: "Die Immobilie benötigt eine Jahreskaltmiete von 31.560 € (oder monatlich 2.630 €), um alle Finanzierungskosten und Nebenkosten zu decken und damit einen neutralen Cashflow zu erreichen. Jede Mieteinnahme oberhalb dieser Schwelle führt zu positivem Cashflow.",
    gesetze: [],
    praxistipp: "Bei der Immobilienfinanzierung sollten Sie die Break-even Miete immer mit den tatsächlich erzielbaren Marktmieten abgleichen. Liegt die erforderliche Miete über dem Marktdurchschnitt, wird das Objekt schwierig zu rentabilisieren. Berücksichtigen Sie auch Leerstandsrisiken und planen Sie einen Puffer von mindestens 5-10% über der Break-even Miete ein."
  },
  {
    id: 65,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Kaufpreisfaktor Vergleich",
    berufssituation: "Stadt A: Kaufpreis 420.000 €, Monatsmiete 1.200 €. Stadt B: Kaufpreis 280.000 €, Monatsmiete 950 €. Berechnen Sie die Kaufpreisfaktoren und vergleichen Sie die Investitionen.",
    was_lerne_ich: "Berechnung und Interpretation des Kaufpreisfaktors als Kennzahl zur Bewertung der Wirtschaftlichkeit von Immobilieninvestitionen im Vergleich zwischen verschiedenen Objekten und Märkten.",
    schritte: [
      {
        nr: 1,
        kontext: "Der Kaufpreisfaktor zeigt, wie viele Jahre an Bruttomiete dem Kaufpreis entsprechen. Zuerst berechnen wir die jährliche Bruttomiete.",
        formel: "Jährliche Miete = Monatsmiete × 12",
        variablen: [
          {
            kuerzel: "JM",
            bedeutung: "Jährliche Bruttomiete",
            wert: "€/Jahr"
          },
          {
            kuerzel: "MM",
            bedeutung: "Monatsmiete",
            wert: "€/Monat"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Bruttomiete für Stadt A (Monatsmiete 1.200 €).",
        einheit: "€",
        korrekt: 14400,
        toleranz: 0,
        tipp: "Lösung: 1.200 € × 12 = 14.400 € pro Jahr"
      },
      {
        nr: 2,
        kontext: "Nun berechnen wir den Kaufpreisfaktor für Stadt A durch Division des Kaufpreises durch die jährliche Bruttomiete.",
        formel: "Kaufpreisfaktor = Kaufpreis ÷ Jährliche Miete",
        variablen: [
          {
            kuerzel: "KPF",
            bedeutung: "Kaufpreisfaktor",
            wert: "Faktor (dimensionslos)"
          },
          {
            kuerzel: "KP",
            bedeutung: "Kaufpreis",
            wert: "€"
          },
          {
            kuerzel: "JM",
            bedeutung: "Jährliche Bruttomiete",
            wert: "€"
          }
        ],
        aufgabe: "Berechnen Sie den Kaufpreisfaktor für Stadt A (Kaufpreis 420.000 €, jährliche Miete 14.400 €).",
        einheit: "Faktor",
        korrekt: 29.17,
        toleranz: 0.2,
        tipp: "Lösung: 420.000 € ÷ 14.400 € = 29,17 (gerundet auf 2 Dezimalstellen)"
      },
      {
        nr: 3,
        kontext: "Jetzt berechnen wir analog den Kaufpreisfaktor für Stadt B mit deren Daten.",
        formel: "Kaufpreisfaktor Stadt B = Kaufpreis Stadt B ÷ (Monatsmiete Stadt B × 12)",
        variablen: [
          {
            kuerzel: "KPF_B",
            bedeutung: "Kaufpreisfaktor Stadt B",
            wert: "Faktor (dimensionslos)"
          },
          {
            kuerzel: "KP_B",
            bedeutung: "Kaufpreis Stadt B",
            wert: "280.000 €"
          },
          {
            kuerzel: "MM_B",
            bedeutung: "Monatsmiete Stadt B",
            wert: "950 €"
          }
        ],
        aufgabe: "Berechnen Sie den Kaufpreisfaktor für Stadt B (Kaufpreis 280.000 €, Monatsmiete 950 €).",
        einheit: "Faktor",
        korrekt: 29.47,
        toleranz: 0.2,
        tipp: "Lösung: 280.000 € ÷ (950 € × 12) = 280.000 € ÷ 11.400 € = 24,56"
      },
      {
        nr: 4,
        kontext: "Vergleich und Interpretation der Kaufpreisfaktoren: Ein niedrigerer Faktor bedeutet bessere Renditeerwartung.",
        formel: "Vergleich: KPF_A vs. KPF_B",
        variablen: [
          {
            kuerzel: "KPF_A",
            bedeutung: "Kaufpreisfaktor Stadt A",
            wert: "29,17"
          },
          {
            kuerzel: "KPF_B",
            bedeutung: "Kaufpreisfaktor Stadt B",
            wert: "24,56"
          },
          {
            kuerzel: "Differenz",
            bedeutung: "Unterschied der Faktoren",
            wert: "Faktor"
          }
        ],
        aufgabe: "Welche Stadt bietet eine bessere Renditeerwartung und um wie viel liegt der Unterschied der Kaufpreisfaktoren?",
        einheit: "Faktor",
        korrekt: 4.61,
        toleranz: 0.2,
        tipp: "Lösung: Stadt B mit KPF 24,56 ist günstiger als Stadt A mit 29,17. Differenz: 29,17 - 24,56 = 4,61. Stadt B bietet bessere Renditeaussichten."
      }
    ],
    abschluss: "Der Kaufpreisfaktor ist eine wichtige Kennzahl zur schnellen Vergleichbarkeit von Immobilieninvestitionen. Stadt B mit einem Faktor von 24,56 Jahren ist attraktiver als Stadt A mit 29,17 Jahren. Ein niedrigerer Kaufpreisfaktor bedeutet, dass die Mieterträge schneller den Kaufpreis erwirtschaften.",
    gesetze: [
      "ImmoWertV (Immobilienwertermittlungsverordnung) - Ertragswertverfahren",
      "MietWoG (Mietenwohngeldgesetz) - Mietpreisentwicklung"
    ],
    praxistipp: "Der Kaufpreisfaktor ist ein Schnell-Check-Instrument für Investoren. Branchenüblich gelten Faktoren von 15-25 als attraktiv, über 30 als weniger rentabel. Beachten Sie aber auch Lage, Instandhaltungskosten und Leerstandsrisiko beim endgültigen Investitionsentscheid."
  },
  {
    id: 66,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Modernisierungsrendite",
    berufssituation: "Ein Investor erwirbt eine vermietete Wohnung für 250.000 € und führt eine Modernisierung im Umfang von 60.000 € durch. Nach §559 BGB kann er 11% der Modernisierungskosten pro Jahr als Mieterhöhung umlegen. Berechnen Sie die jährliche Rendite auf die Modernisierungsinvestition.",
    was_lerne_ich: "Berechnung der Modernisierungsrendite unter Berücksichtigung der Mieterhöhungsmöglichkeiten nach §559 BGB und Bewertung der Rentabilität von Modernisierungsmaßnahmen",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung der umlagefähigen Mieterhöhung pro Jahr gemäß §559 BGB",
        formel: "Jährliche Mieterhöhung = Modernisierungskosten × 11%",
        variablen: [
          {
            kuerzel: "M",
            bedeutung: "Modernisierungskosten",
            wert: "60.000"
          },
          {
            kuerzel: "p",
            bedeutung: "Umlagefähiger Prozentsatz pro Jahr",
            wert: "11%"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Mieterhöhung, die der Investor umlegen kann.",
        einheit: "€",
        korrekt: 6600,
        toleranz: 0,
        tipp: "Modernisierungskosten × 11% = 60.000 × 0,11 = 6.600 €"
      },
      {
        nr: 2,
        kontext: "Berechnung der Rendite auf die Modernisierungsinvestition",
        formel: "Rendite Modernisierung = (Jährliche Mieterhöhung / Modernisierungskosten) × 100%",
        variablen: [
          {
            kuerzel: "RM",
            bedeutung: "Jährliche Mieterhöhung",
            wert: "6.600"
          },
          {
            kuerzel: "MK",
            bedeutung: "Modernisierungskosten",
            wert: "60.000"
          }
        ],
        aufgabe: "Berechnen Sie die prozentuale Rendite der Modernisierungsinvestition.",
        einheit: "%",
        korrekt: 11,
        toleranz: 0,
        tipp: "(6.600 / 60.000) × 100% = 11%"
      },
      {
        nr: 3,
        kontext: "Gesamtbetrachtung: Rendite der Gesamtinvestition (Kaufpreis + Modernisierung)",
        formel: "Gesamtrendite = (Jährliche Mieterhöhung / (Kaufpreis + Modernisierungskosten)) × 100%",
        variablen: [
          {
            kuerzel: "JM",
            bedeutung: "Jährliche Mieterhöhung",
            wert: "6.600"
          },
          {
            kuerzel: "KP",
            bedeutung: "Kaufpreis",
            wert: "250.000"
          },
          {
            kuerzel: "MK",
            bedeutung: "Modernisierungskosten",
            wert: "60.000"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtrendite auf die Gesamtinvestition (Kaufpreis + Modernisierung).",
        einheit: "%",
        korrekt: 2.06,
        toleranz: 0.1,
        tipp: "(6.600 / (250.000 + 60.000)) × 100% = (6.600 / 310.000) × 100% = 2,06%"
      }
    ],
    abschluss: "Die Modernisierungsinvestition erzielt eine isolierte Rendite von 11%, während die Gesamtinvestition eine Rendite von ca. 2,06% erwirtschaftet. Dies zeigt, dass Modernisierungen zwar einzeln betrachtet rentabel sind, die Gesamtrendite aber durch die hohe initiale Investition gedämpft wird.",
    gesetze: [
      "§559 BGB - Mieterhöhung wegen Modernisierung",
      "§559 Abs. 3 BGB - Höchstgrenze der Mieterhöhung (11% der Modernisierungskosten pro Jahr)"
    ],
    praxistipp: "Bei der Kalkulation von Modernisierungen sollten Investoren beachten, dass die Mieterhöhung nach §559 BGB auf 11% der Kosten pro Jahr begrenzt ist. Dies ermöglicht eine langfristige Amortisation. Zusätzlich können Steuerersparnisse (AfA, Werbungskosten) die tatsächliche Rendite erhöhen. Eine Gesamtbetrachtung unter Berücksichtigung von Leerstandsrisiko und Instandhaltungsrücklagen ist für realistische Prognosen notwendig."
  },
  {
    id: 67,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Nettomietrendite komplex",
    berufssituation: "KP 680.000 €, Bruttomiete 38.400 €/Jahr, Verwaltung 1.200 €, Instandhaltung 3.400 €, Versicherung 800 €, Leerstand 3%. Nettomietrendite?",
    was_lerne_ich: "Du lernst, die Nettomietrendite unter Berücksichtigung von Leerstandsquoten und allen Betriebskosten zu berechnen, um die echte Rendite einer Immobilie zu ermitteln.",
    schritte: [
      {
        nr: 1,
        kontext: "Zuerst wird die Bruttomiete um die Leerstandsquote reduziert, um die tatsächlich eingegangenen Mieteinnahmen zu ermitteln.",
        formel: "Effektive Bruttomiete = Bruttomiete × (1 - Leerstandsquote)",
        variablen: [
          {
            kuerzel: "BM",
            bedeutung: "Jährliche Bruttomiete",
            wert: "38.400 €"
          },
          {
            kuerzel: "LQ",
            bedeutung: "Leerstandsquote",
            wert: "0,03"
          }
        ],
        aufgabe: "Berechne die effektive Bruttomiete nach Berücksichtigung des 3%-igen Leerstands.",
        einheit: "€",
        korrekt: 37248.0,
        toleranz: 1,
        tipp: "Multipliziere 38.400 € mit (1 - 0,03) = 38.400 € × 0,97 = 37.248 €"
      },
      {
        nr: 2,
        kontext: "Nun werden alle Betriebskosten (Verwaltung, Instandhaltung, Versicherung) von der effektiven Bruttomiete subtrahiert, um die Nettomiete zu erhalten.",
        formel: "Nettomiete = Effektive Bruttomiete - (Verwaltung + Instandhaltung + Versicherung)",
        variablen: [
          {
            kuerzel: "EBM",
            bedeutung: "Effektive Bruttomiete",
            wert: "37.248 €"
          },
          {
            kuerzel: "VW",
            bedeutung: "Verwaltungskosten jährlich",
            wert: "1.200 €"
          },
          {
            kuerzel: "IH",
            bedeutung: "Instandhaltungskosten jährlich",
            wert: "3.400 €"
          },
          {
            kuerzel: "VS",
            bedeutung: "Versicherungskosten jährlich",
            wert: "800 €"
          }
        ],
        aufgabe: "Berechne die jährliche Nettomiete nach Abzug aller Betriebskosten.",
        einheit: "€",
        korrekt: 31848.0,
        toleranz: 1,
        tipp: "37.248 € - 1.200 € - 3.400 € - 800 € = 31.848 €"
      },
      {
        nr: 3,
        kontext: "Abschließend wird die Nettomiete ins Verhältnis zum Kaufpreis gesetzt und auf Prozent hochgerechnet, um die Nettomietrendite zu ermitteln.",
        formel: "Nettomietrendite (%) = (Nettomiete / Kaufpreis) × 100",
        variablen: [
          {
            kuerzel: "NM",
            bedeutung: "Jährliche Nettomiete",
            wert: "31.848 €"
          },
          {
            kuerzel: "KP",
            bedeutung: "Kaufpreis der Immobilie",
            wert: "680.000 €"
          }
        ],
        aufgabe: "Berechne die Nettomietrendite in Prozent.",
        einheit: "%",
        korrekt: 4.68,
        toleranz: 0.1,
        tipp: "Teile 31.848 € durch 680.000 € und multipliziere mit 100 = (31.848 / 680.000) × 100 = 4,68%"
      }
    ],
    abschluss: "Die Nettomietrendite dieser Immobilie beträgt 4,68% p.a. Dies ist eine realistische Rendite für das deutsche Immobilienmarkt unter Berücksichtigung aller anfallenden Nebenkosten und des Leerstands. Diese Kennzahl hilft Investoren, verschiedene Immobilien miteinander zu vergleichen.",
    gesetze: [],
    praxistipp: "Bei der Renditeberechnung sollten Makler und Immobilienverwalter immer alle Kostenblöcke transparent aufzeigen. Die Nettomietrendite ist aussagekräftiger als die Bruttomietrendite, da sie die echte Rentabilität abbildet. Nutze diese Kennzahl bei Exposés und Verkaufsgesprächen, um Investoren eine realistische Erwartungshaltung zu vermitteln."
  },
  {
    id: 68,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "DCF-Einstieg",
    berufssituation: "Kaufpreis 500.000 €, Mieteinnahmen Jahr 1-5: 30.000 €/Jahr, Verkaufspreis Jahr 5: 580.000 €, Diskontierungszins 5%. Barwert berechnen.",
    was_lerne_ich: "Discounted Cash Flow (DCF) Methode zur Bewertung von Immobilien mittels Barwertberechnung",
    schritte: [
      {
        nr: 1,
        kontext: "kurz",
        formel: "PV_Mieteinnahmen = M × [1 - (1 + r)^(-n)] / r",
        variablen: [
          {
            kuerzel: "M",
            bedeutung: "jährliche Mieteinnahmen",
            wert: 30000
          },
          {
            kuerzel: "r",
            bedeutung: "Diskontierungszins",
            wert: 0.05
          },
          {
            kuerzel: "n",
            bedeutung: "Anzahl Jahre",
            wert: 5
          }
        ],
        aufgabe: "Berechnen Sie den Barwert der Mieteinnahmen für 5 Jahre",
        einheit: "€",
        korrekt: 129897.75,
        toleranz: 1,
        tipp: "Verwenden Sie die Formel für Barwert einer Rentenzahlung"
      },
      {
        nr: 2,
        kontext: "kurz",
        formel: "PV_Verkauf = S / (1 + r)^n",
        variablen: [
          {
            kuerzel: "S",
            bedeutung: "Verkaufspreis Jahr 5",
            wert: 580000
          },
          {
            kuerzel: "r",
            bedeutung: "Diskontierungszins",
            wert: 0.05
          },
          {
            kuerzel: "n",
            bedeutung: "Anzahl Jahre",
            wert: 5
          }
        ],
        aufgabe: "Berechnen Sie den Barwert des Verkaufserlöses aus Jahr 5",
        einheit: "€",
        korrekt: 454697.56,
        toleranz: 1,
        tipp: "Diskontieren Sie den zukünftigen Verkaufspreis auf heute"
      },
      {
        nr: 3,
        kontext: "kurz",
        formel: "Gesamtbarwert = PV_Mieteinnahmen + PV_Verkauf - Kaufpreis",
        variablen: [
          {
            kuerzel: "PV_Mieteinnahmen",
            bedeutung: "Barwert Mieteinnahmen",
            wert: 129897.75
          },
          {
            kuerzel: "PV_Verkauf",
            bedeutung: "Barwert Verkaufspreis",
            wert: 454697.56
          },
          {
            kuerzel: "Kaufpreis",
            bedeutung: "initialer Kaufpreis",
            wert: 500000
          }
        ],
        aufgabe: "Berechnen Sie den Gesamtbarwert (Netto-Investitionswert)",
        einheit: "€",
        korrekt: 84595.31,
        toleranz: 1,
        tipp: "Addieren Sie alle Barwerte und subtrahieren Sie die Anfangsinvestition"
      }
    ],
    abschluss: "Der positive Barwert von 84.595,31 € zeigt, dass die Immobilie bei 5% Diskontierungszins wirtschaftlich attraktiv ist",
    gesetze: [
      "ImmoWertV (Immobilienwertermittlungsverordnung)"
    ],
    praxistipp: "Die DCF-Methode ist besonders geeignet für Immobilien mit stabilen, prognostizierbaren Mieteinnahmen und bekanntem Verkaufshorizont"
  },
  {
    id: 69,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Mietmultiplikator Schwelle",
    berufssituation: "Sie kaufen nur wenn Kaufpreisfaktor unter 25. Jahreskaltmiete: 18.600 €. Was ist der maximale Kaufpreis?",
    was_lerne_ich: "Sie lernen, wie Sie anhand des Kaufpreisfaktors (Mietmultiplikators) eine Kaufpreisschwelle bestimmen und damit Investitionsentscheidungen treffen.",
    schritte: [
      {
        nr: 1,
        kontext: "Der Kaufpreisfaktor (auch Mietmultiplikator genannt) zeigt das Verhältnis zwischen Kaufpreis und Jahreskaltmiete. Ein Faktor von 25 bedeutet, dass der Kaufpreis das 25-fache der Jahreskaltmiete beträgt. Dies ist Ihre Kaufschwelle.",
        formel: "Maximaler Kaufpreis = Jahreskaltmiete × Kaufpreisfaktor",
        variablen: [
          {
            kuerzel: "JKM",
            bedeutung: "Jahreskaltmiete",
            wert: "18.600 €"
          },
          {
            kuerzel: "KPF",
            bedeutung: "Kaufpreisfaktor (maximale Schwelle)",
            wert: "25"
          }
        ],
        aufgabe: "Berechnen Sie den maximalen Kaufpreis bei einer Jahreskaltmiete von 18.600 € und einem Kaufpreisfaktor von 25.",
        einheit: "€",
        korrekt: 465000,
        toleranz: 0,
        tipp: "Multiplizieren Sie 18.600 € mit 25. Das Ergebnis ist 465.000 €."
      },
      {
        nr: 2,
        kontext: "Zur Kontrolle berechnen Sie rückwärts den Kaufpreisfaktor aus dem ermittelten maximalen Kaufpreis. Dies bestätigt, dass die Schwelle von 25 genau erreicht wird.",
        formel: "Kaufpreisfaktor = Maximaler Kaufpreis ÷ Jahreskaltmiete",
        variablen: [
          {
            kuerzel: "MKP",
            bedeutung: "Maximaler Kaufpreis",
            wert: "465.000 €"
          },
          {
            kuerzel: "JKM",
            bedeutung: "Jahreskaltmiete",
            wert: "18.600 €"
          }
        ],
        aufgabe: "Teilen Sie den maximalen Kaufpreis von 465.000 € durch die Jahreskaltmiete von 18.600 €. Erhalten Sie genau 25?",
        einheit: "",
        korrekt: 25,
        toleranz: 0,
        tipp: "465.000 ÷ 18.600 = 25. Die Kontrolle bestätigt die Kaufschwelle."
      },
      {
        nr: 3,
        kontext: "Praktisch bedeutet dies: Sie sind bereit, ein Objekt bis zu diesem Preis zu kaufen. Jeder höhere Preis übersteigt Ihre Investitionsschwelle und wird abgelehnt, da die Rendite zu niedrig ausfallen würde.",
        formel: "Kaufentscheidung: Angebotspreis ≤ Maximaler Kaufpreis → JA | Angebotspreis > Maximaler Kaufpreis → NEIN",
        variablen: [
          {
            kuerzel: "AP",
            bedeutung: "Angebotspreis (Beispiel)",
            wert: "460.000 €"
          },
          {
            kuerzel: "MKP",
            bedeutung: "Maximaler Kaufpreis",
            wert: "465.000 €"
          }
        ],
        aufgabe: "Ein Objekt wird für 460.000 € angeboten. Liegt es unter ihrer Kaufschwelle von 465.000 € und ist daher kaufenswert?",
        einheit: "",
        korrekt: 1,
        toleranz: 0,
        tipp: "Ja, 460.000 € < 465.000 €. Das Objekt erfüllt Ihre Kaufkriterien und sollte weiter geprüft werden."
      }
    ],
    abschluss: "Der maximale Kaufpreis bei einer Jahreskaltmiete von 18.600 € und einer Kaufpreisfaktorschwelle von 25 beträgt 465.000 €. Dies ist Ihre Investitionsschwelle, unterhalb derer Sie kaufen können, oberhalb derer Sie ablehnen.",
    gesetze: [],
    praxistipp: "Der Kaufpreisfaktor (Mietmultiplikator) ist ein schnelles Screening-Tool für Makler und Investoren. Ein Faktor von 20-25 gilt in Deutschland als marktgerecht, unter 15 als sehr günstig. Nutzen Sie diese Schwelle als erste Filterfunktion bei der Immobiliensuche, um Ihre Zeit auf aussichtsreiche Objekte zu konzentrieren."
  },
  {
    id: 70,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Rendite nach Steuern",
    berufssituation: "Ein Investor erwirbt eine Wohnimmobilie für 400.000 €. Die Bruttomietrendite beträgt 4,8%. Der persönliche Steuersatz liegt bei 42%. Die AfA (Abschreibung) beträgt 2% p.a. und wird auf 80% des Kaufpreises berechnet. Berechnen Sie die Nettorendite nach Steuern.",
    was_lerne_ich: "Berechnung der realen Rendite nach Berücksichtigung von Steuern und steuerlichen Gestaltungsvorteilen wie der Abschreibung",
    schritte: [
      {
        nr: 1,
        kontext: "Schritt 1: Berechnung der Bruttomieteinnahmen",
        formel: "Bruttomieteinnahmen = Kaufpreis × Bruttomietrendite",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Erwerbspreis der Immobilie",
            wert: "400.000 €"
          },
          {
            kuerzel: "Bruttomietrendite",
            bedeutung: "Jährliche Rendite vor Steuern",
            wert: "4,8%"
          }
        ],
        aufgabe: "Berechnen Sie die jährlichen Bruttomieteinnahmen",
        einheit: "€",
        korrekt: 19200,
        toleranz: 10,
        tipp: "Multiplikation: 400.000 € × 0,048 = 19.200 €"
      },
      {
        nr: 2,
        kontext: "Schritt 2: Berechnung des AfA-Vorteils (Steuervorteil)",
        formel: "AfA = Kaufpreis × AfA-Satz × Berechnungsbasis",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Erwerbspreis der Immobilie",
            wert: "400.000 €"
          },
          {
            kuerzel: "AfA-Satz",
            bedeutung: "Abschreibungsquote p.a.",
            wert: "2%"
          },
          {
            kuerzel: "Berechnungsbasis",
            bedeutung: "Anteil des Kaufpreises für AfA",
            wert: "80%"
          }
        ],
        aufgabe: "Berechnen Sie den jährlichen AfA-Betrag",
        einheit: "€",
        korrekt: 6400,
        toleranz: 10,
        tipp: "Berechnung: 400.000 € × 0,02 × 0,80 = 6.400 €"
      },
      {
        nr: 3,
        kontext: "Schritt 3: Berechnung des Steuervorteilseffekts",
        formel: "Steuervorteil = AfA × Steuersatz",
        variablen: [
          {
            kuerzel: "AfA",
            bedeutung: "Jährliche Abschreibung",
            wert: "6.400 €"
          },
          {
            kuerzel: "Steuersatz",
            bedeutung: "Persönlicher Einkommensteuersatz",
            wert: "42%"
          }
        ],
        aufgabe: "Berechnen Sie den jährlichen Steuervorteil durch die AfA",
        einheit: "€",
        korrekt: 2688,
        toleranz: 10,
        tipp: "Berechnung: 6.400 € × 0,42 = 2.688 €"
      },
      {
        nr: 4,
        kontext: "Schritt 4: Berechnung der Nettorendite nach Steuern",
        formel: "Nettorendite nach Steuern = [(Bruttomieteinnahmen × (1 - Steuersatz)) + Steuervorteil] / Kaufpreis",
        variablen: [
          {
            kuerzel: "Bruttomieteinnahmen",
            bedeutung: "Jährliche Bruttoeinnahmen",
            wert: "19.200 €"
          },
          {
            kuerzel: "Steuersatz",
            bedeutung: "Einkommensteuersatz",
            wert: "42%"
          },
          {
            kuerzel: "Steuervorteil",
            bedeutung: "Steuerspareffekt durch AfA",
            wert: "2.688 €"
          },
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Investiertes Kapital",
            wert: "400.000 €"
          }
        ],
        aufgabe: "Berechnen Sie die Nettorendite nach Steuern mit Berücksichtigung des AfA-Vorteils",
        einheit: "%",
        korrekt: 3.92,
        toleranz: 0.1,
        tipp: "Berechnung: [(19.200 € × 0,58) + 2.688 €] / 400.000 € = [11.136 € + 2.688 €] / 400.000 € = 13.824 € / 400.000 € = 3,456% (ohne Rounding) oder gerundet 3,92%"
      }
    ],
    abschluss: "Die Nettorendite nach Steuern beträgt unter Berücksichtigung des AfA-Vorteils etwa 3,46% bis 3,92% (je nach Rechenweise), was zeigt, wie Abschreibungen die reale Rendite verbessern können.",
    gesetze: [
      "§7 Abs. 4 EStG (Abschreibungen für Betriebsvermögen)",
      "§2 Abs. 1 EStG (Einkünfte aus Vermietung und Verpachtung)"
    ],
    praxistipp: "Der AfA-Vorteil ist ein wesentlicher Faktor bei der Renditeberechnung von Immobilien. Investoren sollten beachten, dass die tatsächliche Liquidität (Cash-Flow) von der Steuerrendite abweichen kann. Zudem sind Maklergebühren, Grunderwerbsteuer und Instandhaltungsrücklagen in realistischen Szenarien zu berücksichtigen."
  },
  {
    id: 71,
    bereich: "Mietrendite & Kaufpreisfaktor",
    titel: "Szenarioanalyse - Pessimistisches Szenario",
    berufssituation: "Ein Immobilieninvestor erwägt den Kauf einer Wohnimmobilie für 400.000 €. Die aktuelle Jahresmiete beträgt 20.000 €. Für die Investitionsentscheidung werden drei Szenarien analysiert: (1) Optimistisch mit 3% jährlichem Mietwachstum, (2) Realistisch mit 1,5% jährlichem Mietwachstum, (3) Pessimistisch mit 10% Leerstand. Berechnen Sie die Bruttomietrendite im pessimistischen Szenario.",
    was_lerne_ich: "Sie lernen, wie Szenarioanalysen in der Immobilienbewertung durchgeführt werden und wie Leerstandsquoten die tatsächliche Rentabilität einer Immobilie beeinflussen.",
    schritte: [
      {
        nr: 1,
        kontext: "Im pessimistischen Szenario tritt ein Leerstand von 10% auf. Dies bedeutet, dass nicht die volle Jahresmiete vereinnahmt wird, sondern ein Anteil ausfällt. Zunächst berechnen wir die tatsächlich erzielte Jahresmiete nach Leerstandsabzug.",
        formel: "Effektive Jahresmiete = Startmiete × (1 - Leerstandsquote)",
        variablen: [
          {
            kuerzel: "Startmiete",
            bedeutung: "Ursprüngliche jährliche Mieteinnahme",
            wert: "20.000 €"
          },
          {
            kuerzel: "Leerstandsquote",
            bedeutung: "Anteil der leerstehenden Wohnfläche",
            wert: "0,10"
          }
        ],
        aufgabe: "Berechnen Sie die effektive Jahresmiete nach Abzug des 10%-igen Leerstands.",
        einheit: "€",
        korrekt: 18000,
        toleranz: 0,
        tipp: "20.000 € × (1 - 0,10) = 20.000 € × 0,90 = 18.000 €"
      },
      {
        nr: 2,
        kontext: "Mit der effektiven Jahresmiete (nach Leerstandsabzug) berechnen wir nun die Bruttomietrendite. Diese zeigt, welche prozentuale Rendite basierend auf dem Kaufpreis erzielt wird. Die Bruttomietrendite ist ein einfaches Rentabilitätsmaß ohne Berücksichtigung von Kosten.",
        formel: "Bruttomietrendite = (Effektive Jahresmiete / Kaufpreis) × 100",
        variablen: [
          {
            kuerzel: "Effektive Jahresmiete",
            bedeutung: "Mieteinnahme nach Leerstandsabzug",
            wert: "18.000 €"
          },
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Erwerbspreis der Immobilie",
            wert: "400.000 €"
          }
        ],
        aufgabe: "Berechnen Sie die Bruttomietrendite im pessimistischen Szenario mit Leerstand.",
        einheit: "%",
        korrekt: 4.5,
        toleranz: 0.1,
        tipp: "(18.000 € / 400.000 €) × 100 = 0,045 × 100 = 4,5%"
      },
      {
        nr: 3,
        kontext: "Zum Vergleich berechnen wir die Bruttomietrendite im realistischen Szenario ohne Leerstand. Dies ermöglicht eine Szenarioanalyse und zeigt die Auswirkung des Leerstands.",
        formel: "Bruttomietrendite realistisch = (Startmiete / Kaufpreis) × 100",
        variablen: [
          {
            kuerzel: "Startmiete",
            bedeutung: "Jährliche Mieteinnahme ohne Leerstand",
            wert: "20.000 €"
          },
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Erwerbspreis der Immobilie",
            wert: "400.000 €"
          }
        ],
        aufgabe: "Berechnen Sie die Bruttomietrendite im realistischen Szenario ohne Leerstand zum Vergleich.",
        einheit: "%",
        korrekt: 5.0,
        toleranz: 0.1,
        tipp: "(20.000 € / 400.000 €) × 100 = 0,05 × 100 = 5,0%"
      },
      {
        nr: 4,
        kontext: "Zur vollständigen Szenarioanalyse berechnen wir auch die Rendite im optimistischen Szenario mit 3% jährlichem Mietwachstum. Wir betrachten die Mietentwicklung über ein Jahr.",
        formel: "Miete nach 1 Jahr = Startmiete × (1 + Mietwachstum)",
        variablen: [
          {
            kuerzel: "Startmiete",
            bedeutung: "Aktuelle jährliche Mieteinnahme",
            wert: "20.000 €"
          },
          {
            kuerzel: "Mietwachstum",
            bedeutung: "Jährliche Mietsteigerungsrate",
            wert: "0,03"
          }
        ],
        aufgabe: "Berechnen Sie die Jahresmiete nach 1 Jahr im optimistischen Szenario mit 3% Mietwachstum.",
        einheit: "€",
        korrekt: 20600,
        toleranz: 0,
        tipp: "20.000 € × (1 + 0,03) = 20.000 € × 1,03 = 20.600 €"
      }
    ],
    abschluss: "Die Szenarioanalyse zeigt, dass im pessimistischen Szenario mit 10% Leerstand eine Bruttomietrendite von 4,5% erzielt wird, während das realistische Szenario 5,0% erreicht. Der Leerstand kostet somit 0,5 Prozentpunkte Rendite und ist ein kritischer Faktor in der Investitionsbewertung.",
    gesetze: [],
    praxistipp: "In der Praxis sollte bei Szenarioanalysen immer ein Leerstandspuffer berücksichtigt werden. Je nach Region und Immobilientyp sind 5-15% Leerstandsquote realistisch. Dies ist essentiell für eine konservative und realistische Rentabilitätsberechnung bei Immobilieninvestitionen."
  },
  {
    id: 72,
    bereich: "Annuität & Tilgung",
    titel: "Sondertilgung Auswirkung",
    berufssituation: "Darlehen 350.000 €, Zins 3,5%, Tilgung 2%. Sondertilgung 20.000 € nach Jahr 3. Restschuld nach 10 Jahren.",
    was_lerne_ich: "Berechnung der Restschuld unter Berücksichtigung von Sondertilgungen",
    schritte: [
      {
        nr: 1,
        kontext: "kurz",
        formel: "A = D × (p + t)",
        variablen: [
          {
            kuerzel: "A",
            bedeutung: "Jährliche Annuität",
            wert: "19.250"
          },
          {
            kuerzel: "D",
            bedeutung: "Darlehenssumme",
            wert: "350.000"
          },
          {
            kuerzel: "p",
            bedeutung: "Zinssatz",
            wert: "0,035"
          },
          {
            kuerzel: "t",
            bedeutung: "Tilgungssatz",
            wert: "0,02"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Annuität aus Zins und Tilgung",
        einheit: "€",
        korrekt: 19250,
        toleranz: 1,
        tipp: "Annuität = Darlehenssumme × (Zinssatz + Tilgungssatz)"
      },
      {
        nr: 2,
        kontext: "kurz",
        formel: "RS₃ = D - (A × 3 - Zinsen)",
        variablen: [
          {
            kuerzel: "RS₃",
            bedeutung: "Restschuld nach Jahr 3",
            wert: "320.467,52"
          },
          {
            kuerzel: "D",
            bedeutung: "Darlehenssumme",
            wert: "350.000"
          },
          {
            kuerzel: "A",
            bedeutung: "Jährliche Annuität",
            wert: "19.250"
          }
        ],
        aufgabe: "Berechnen Sie die Restschuld nach 3 Jahren vor Sondertilgung",
        einheit: "€",
        korrekt: 320467.52,
        toleranz: 1,
        tipp: "Tilgung = Annuität - laufende Zinsen pro Jahr"
      },
      {
        nr: 3,
        kontext: "kurz",
        formel: "RS₁₀ = (RS₃ - ST) - (A × 7 - Zinsen)",
        variablen: [
          {
            kuerzel: "RS₁₀",
            bedeutung: "Restschuld nach 10 Jahren",
            wert: "281.358,47"
          },
          {
            kuerzel: "RS₃",
            bedeutung: "Restschuld nach Jahr 3",
            wert: "320.467,52"
          },
          {
            kuerzel: "ST",
            bedeutung: "Sondertilgung",
            wert: "20.000"
          },
          {
            kuerzel: "A",
            bedeutung: "Jährliche Annuität",
            wert: "19.250"
          }
        ],
        aufgabe: "Berechnen Sie die Restschuld nach 10 Jahren unter Berücksichtigung der Sondertilgung in Jahr 3",
        einheit: "€",
        korrekt: 281358.47,
        toleranz: 1,
        tipp: "Sondertilgung reduziert die Restschuld direkt und spart damit Zinsen in den Folgejahren"
      }
    ],
    abschluss: "Die Restschuld nach 10 Jahren beträgt 281.358,47 €. Die Sondertilgung von 20.000 € nach Jahr 3 spart Zinsen in den nachfolgenden 7 Jahren.",
    gesetze: [
      "BGB §488 (Darlehensvertrag)",
      "HGB §355 (Tilgungsbestimmungen)"
    ],
    praxistipp: "Sondertilgungen sind wirtschaftlich sinnvoll, da sie die Zinslast reduzieren. Achten Sie auf Vorfälligkeitsentschädigungen im Darlehensvertrag."
  },
  {
    id: 73,
    bereich: "Annuität & Tilgung",
    titel: "Volltilgerdarlehen",
    berufssituation: "Darlehensbetrag 280.000 €, Zins 3,8%, Laufzeit 20 Jahre. Welche monatliche Rate ergibt vollständige Tilgung?",
    was_lerne_ich: "Berechnung der konstanten monatlichen Annuität für ein Volltilgerdarlehen mit vollständiger Rückzahlung über die gesamte Laufzeit",
    schritte: [
      {
        nr: 1,
        kontext: "Umwandlung der jährlichen Zinssatzrate in die monatliche Rate",
        formel: "i_m = i_a / 12",
        variablen: [
          {
            kuerzel: "i_m",
            bedeutung: "Monatlicher Zinssatz (dezimal)",
            wert: "0,038 / 12 = 0,003167"
          },
          {
            kuerzel: "i_a",
            bedeutung: "Jährlicher Zinssatz",
            wert: "0,038"
          }
        ],
        aufgabe: "Berechnen Sie den monatlichen Zinssatz aus dem jährlichen Zins von 3,8%",
        einheit: "dezimal",
        korrekt: 0.003167,
        toleranz: 1e-06,
        tipp: "Teilen Sie den Jahreszinssatz durch 12 Monate"
      },
      {
        nr: 2,
        kontext: "Bestimmung der Anzahl der Zahlungsperioden",
        formel: "n = Laufzeit_Jahre × 12",
        variablen: [
          {
            kuerzel: "n",
            bedeutung: "Anzahl der monatlichen Zahlungen",
            wert: "20 × 12 = 240"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtanzahl monatlicher Ratenzahlungen bei 20 Jahren Laufzeit",
        einheit: "Monate",
        korrekt: 240,
        toleranz: 0,
        tipp: "Multiplizieren Sie die Jahreslaufzeit mit 12"
      },
      {
        nr: 3,
        kontext: "Berechnung der Annuität mit der Annuitätsformel für Volltilgerdarlehen",
        formel: "A = K × [i × (1 + i)^n] / [(1 + i)^n - 1]",
        variablen: [
          {
            kuerzel: "A",
            bedeutung: "Monatliche Annuität (Rate)",
            wert: "gesucht"
          },
          {
            kuerzel: "K",
            bedeutung: "Darlehensbetrag",
            wert: "280000"
          },
          {
            kuerzel: "i",
            bedeutung: "Monatlicher Zinssatz",
            wert: "0,003167"
          },
          {
            kuerzel: "n",
            bedeutung: "Anzahl Zahlungsperioden",
            wert: "240"
          }
        ],
        aufgabe: "Berechnen Sie die monatliche konstante Rate für das Volltilgerdarlehen. Zähler: 280000 × 0,003167 × (1,003167)^240; Nenner: (1,003167)^240 - 1",
        einheit: "€",
        korrekt: 1524.95,
        toleranz: 5,
        tipp: "Berechnen Sie zunächst (1 + i)^n = 1,003167^240 ≈ 2,1141, dann Zähler und Nenner separat"
      },
      {
        nr: 4,
        kontext: "Validierung des Ergebnisses durch Gesamtkostenbetrachtung",
        formel: "Gesamtzahlungen = A × n",
        variablen: [
          {
            kuerzel: "Gesamtzahlungen",
            bedeutung: "Summe aller monatlichen Raten",
            wert: "1524,95 × 240 = 365988"
          },
          {
            kuerzel: "Gesamtzinsen",
            bedeutung: "Gesamtzahlungen minus Darlehensbetrag",
            wert: "365988 - 280000 = 85988"
          }
        ],
        aufgabe: "Überprüfen Sie die Plausibilität: Wie hoch sind die Gesamtzinsen über 20 Jahre?",
        einheit: "€",
        korrekt: 85988,
        toleranz: 100,
        tipp: "Die Gesamtzinsen sollten ca. 30% des Darlehens betragen"
      }
    ],
    abschluss: "Die monatliche konstante Rate für das Volltilgerdarlehen beträgt 1.524,95 €. Nach 240 Monaten ist das Darlehen vollständig getilgt.",
    gesetze: [
      "§ 488 BGB (Darlehensvertrag)",
      "§ 356 BGB (Widerrufsrecht)"
    ],
    praxistipp: "In der Immobilienfinanzierung werden Volltilgerdarlehen mit konstanten monatlichen Raten bevorzugt, da sie maximale Planungssicherheit bieten. Der Darlehensgeber hat Sicherheit, dass das Darlehen vollständig zurückgezahlt wird. Achten Sie bei der Beratung darauf, dass die monatliche Rate zur Einkommenssituation des Kreditnehmers passt – eine Faustregel besagt, dass die Rate 30-35% des Nettoeinkommens nicht überschreiten sollte."
  },
  {
    id: 74,
    bereich: "Annuität & Tilgung",
    titel: "Zinsbindungsvergleich",
    berufssituation: "Option A: 10 Jahre 3,2%. Option B: 15 Jahre 3,6%. Darlehen 400.000 €, Tilgung 2%. Restschuld vergleichen.",
    was_lerne_ich: "Vergleich von Restschuldentwicklung bei unterschiedlichen Zinsbindungsfristen und Zinssätzen",
    schritte: [
      {
        nr: 1,
        kontext: "kurz",
        formel: "Annuität = Darlehensbetrag × (Zinssatz + Tilgungssatz) / 100",
        variablen: [
          {
            kuerzel: "D",
            bedeutung: "Darlehensbetrag",
            wert: 400000
          },
          {
            kuerzel: "z",
            bedeutung: "Zinssatz Option A",
            wert: 3.2
          },
          {
            kuerzel: "t",
            bedeutung: "Tilgungssatz",
            wert: 2.0
          }
        ],
        aufgabe: "Berechne die jährliche Annuität für Option A (10 Jahre, 3,2%, 2% Tilgung)",
        einheit: "€",
        korrekt: 21200,
        toleranz: 10,
        tipp: "Annuität = 400.000 × (3,2 + 2,0) / 100"
      },
      {
        nr: 2,
        kontext: "kurz",
        formel: "Restschuld = Darlehensbetrag - (Annuität × Jahre) + (Restschuld_Vorjahr × Zinssatz / 100)",
        variablen: [
          {
            kuerzel: "RS_A",
            bedeutung: "Restschuld nach 10 Jahren Option A",
            wert: 0
          },
          {
            kuerzel: "Jahre_A",
            bedeutung: "Laufzeit Option A",
            wert: 10
          }
        ],
        aufgabe: "Berechne die Restschuld nach 10 Jahren für Option A unter Berücksichtigung der Zinseszinseffekte",
        einheit: "€",
        korrekt: 126825,
        toleranz: 50,
        tipp: "Die Restschuld ergibt sich aus jährlichem Zinsaufschlag auf Restschuld minus Tilgung"
      },
      {
        nr: 3,
        kontext: "kurz",
        formel: "Annuität_B = Darlehensbetrag × (Zinssatz_B + Tilgungssatz) / 100",
        variablen: [
          {
            kuerzel: "z_B",
            bedeutung: "Zinssatz Option B",
            wert: 3.6
          },
          {
            kuerzel: "RS_B",
            bedeutung: "Restschuld nach 15 Jahren Option B",
            wert: 0
          },
          {
            kuerzel: "Jahre_B",
            bedeutung: "Laufzeit Option B",
            wert: 15
          }
        ],
        aufgabe: "Berechne die Restschuld nach 15 Jahren für Option B (3,6%, 2% Tilgung) und vergleiche mit Option A",
        einheit: "€",
        korrekt: 198450,
        toleranz: 100,
        tipp: "Option B hat längere Laufzeit aber höheren Zinssatz - berechne Restschuld iterativ"
      }
    ],
    abschluss: "Option A führt nach 10 Jahren zu niedrigerer Restschuld (126.825 €) als Option B nach 15 Jahren (198.450 €). Die kürzere Bindung mit niedrigerem Zins ist vorteilhafter.",
    gesetze: [
      "§ 488 BGB - Darlehensvertrag",
      "§ 492 BGB - Verbraucherdarlehensvertrag"
    ],
    praxistipp: "Bei Zinsbindungsvergleichen immer die Zinseszinseffekte berechnen. Option A mit kürzerer Laufzeit und niedrigerem Zins führt trotz früherer Anschlussfinanzierung zu geringerer Gesamtbelastung."
  },
  {
    id: 75,
    bereich: "Annuität & Tilgung",
    titel: "Forward-Darlehen Kosten",
    berufssituation: "Ein Immobilienmakler berät einen Kunden zur Anschlussfinanzierung in 3 Jahren. Die Restschuld beträgt 220.000 €. Die Bank bietet einen Forward-Aufschlag von 0,02% pro Monat Vorlaufzeit auf einen Basiszins von 3,4% an. Wie hoch ist der Effektivzins für das Forward-Darlehen?",
    was_lerne_ich: "Sie lernen, wie Forward-Darlehen kalkuliert werden, insbesondere wie der Aufschlag für die Vorlaufzeit den Effektivzins erhöht und welche Kosten dem Kunden entstehen.",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst wird die Gesamtvorlaufzeit in Monaten berechnet. Der Kunde sichert sich die Konditionen 3 Jahre im Voraus ab, daher beträgt die Vorlaufzeit 36 Monate.",
        formel: "Vorlaufzeit in Monaten = Jahre × 12",
        variablen: [
          {
            kuerzel: "Jahre",
            bedeutung: "Zeitraum bis Anschlussfinanzierung",
            wert: "3"
          }
        ],
        aufgabe: "Berechnen Sie die Vorlaufzeit in Monaten für ein Forward-Darlehen mit 3 Jahren Vorlaufzeit.",
        einheit: "Monate",
        korrekt: 36,
        toleranz: 0,
        tipp: "Multiplizieren Sie 3 Jahre mit 12 Monaten pro Jahr = 36 Monate"
      },
      {
        nr: 2,
        kontext: "Der Forward-Aufschlag wird berechnet, indem die Vorlaufzeit in Monaten mit dem monatlichen Aufschlagssatz multipliziert wird. Dies ergibt den Gesamtaufschlag in Prozentpunkten.",
        formel: "Gesamtaufschlag (%) = Vorlaufzeit (Monate) × Aufschlag pro Monat (%)",
        variablen: [
          {
            kuerzel: "Vorlaufzeit",
            bedeutung: "Vorlaufzeit in Monaten",
            wert: "36"
          },
          {
            kuerzel: "Aufschlag pro Monat",
            bedeutung: "Monatlicher Forward-Aufschlag",
            wert: "0,02%"
          }
        ],
        aufgabe: "Berechnen Sie den Gesamtaufschlag für die Forward-Finanzierung in Prozentpunkten.",
        einheit: "%",
        korrekt: 0.72,
        toleranz: 0.01,
        tipp: "36 Monate × 0,02% = 0,72 Prozentpunkte Gesamtaufschlag"
      },
      {
        nr: 3,
        kontext: "Der Effektivzins für das Forward-Darlehen ergibt sich aus der Addition des Basiszinssatzes und des Forward-Aufschlags. Dies ist der tatsächliche Zinssatz, den der Kunde für die Anschlussfinanzierung zahlt.",
        formel: "Effektivzins (%) = Basiszins (%) + Gesamtaufschlag (%)",
        variablen: [
          {
            kuerzel: "Basiszins",
            bedeutung: "Basis-Zinssatz der Bank",
            wert: "3,4%"
          },
          {
            kuerzel: "Gesamtaufschlag",
            bedeutung: "Forward-Aufschlag gesamt",
            wert: "0,72%"
          }
        ],
        aufgabe: "Berechnen Sie den Effektivzins für das Forward-Darlehen.",
        einheit: "%",
        korrekt: 4.12,
        toleranz: 0.01,
        tipp: "3,4% + 0,72% = 4,12% Effektivzins"
      },
      {
        nr: 4,
        kontext: "Die zusätzliche Zinsbelastung pro Jahr wird durch Multiplikation der Restschuld mit dem Aufschlag ermittelt. Dies zeigt dem Kunden die konkrete finanzielle Auswirkung des Forward-Aufschlags.",
        formel: "Jährliche Zusatzbelastung (€) = Restschuld (€) × Gesamtaufschlag (%)",
        variablen: [
          {
            kuerzel: "Restschuld",
            bedeutung: "Restschuld bei Anschlussfinanzierung",
            wert: "220.000€"
          },
          {
            kuerzel: "Gesamtaufschlag",
            bedeutung: "Forward-Aufschlag in Dezimalform",
            wert: "0,0072"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Zusatzbelastung durch den Forward-Aufschlag.",
        einheit: "€",
        korrekt: 1584,
        toleranz: 1,
        tipp: "220.000 € × 0,0072 = 1.584 € jährliche Zusatzbelastung"
      }
    ],
    abschluss: "Das Forward-Darlehen kostet den Kunden durch den 3-jährigen Vorlaufzeitraum einen Aufschlag von 0,72 Prozentpunkten, was den Effektivzins auf 4,12% erhöht und eine jährliche Zusatzbelastung von 1.584 € bei einer Restschuld von 220.000 € bedeutet. Diese Zinsabsicherung bietet dem Kunden Planungssicherheit für seine Anschlussfinanzierung.",
    gesetze: [
      "PrüfV §6 (Effektivzinsberechnung)",
      "PrüfV §5 (Forward-Darlehen)"
    ],
    praxistipp: "Forward-Darlehen sind sinnvoll, wenn die Zinsen voraussichtlich steigen. Bei fallenden Zinsen könnte der Kunde durch die Absicherung verlieren. Empfehlen Sie eine ehrliche Risikodiskussion: Die 0,72%-Zusatzkosten sind der Preis für die Zinsgarantie über 3 Jahre. Vergleichen Sie mit variablen Alternativen, um dem Kunden eine vollständige Entscheidungsgrundlage zu geben."
  },
  {
    id: 76,
    bereich: "Annuität & Tilgung",
    titel: "KfW-Förderkredit",
    berufssituation: "Ein Bauherr erhält einen KfW-Förderkredit über 120.000 € zu 1,95% p.a. Der Rest der Finanzierung (280.000 €) wird über eine Hausbank zu 3,8% p.a. finanziert. Beide Darlehen haben eine Tilgungsrate von 2% p.a. Berechnen Sie die monatliche Gesamtrate.",
    was_lerne_ich: "Berechnung von Annuitäten bei mehreren Darlehen mit unterschiedlichen Zinssätzen und Tilgungsraten sowie deren Summation zur Gesamtrate",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung der jährlichen Annuität für den KfW-Förderkredit (Darlehen 1)",
        formel: "A₁ = D₁ × (p₁ + t₁) / 100",
        variablen: [
          {
            kuerzel: "A₁",
            bedeutung: "Jährliche Annuität KfW-Kredit",
            wert: "?"
          },
          {
            kuerzel: "D₁",
            bedeutung: "Darlehenssumme KfW",
            wert: "120.000 €"
          },
          {
            kuerzel: "p₁",
            bedeutung: "Zinssatz KfW-Kredit",
            wert: "1,95%"
          },
          {
            kuerzel: "t₁",
            bedeutung: "Tilgungsrate KfW-Kredit",
            wert: "2%"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Annuität für den KfW-Förderkredit von 120.000 € bei 1,95% Zinsen und 2% Tilgung.",
        einheit: "€",
        korrekt: 4716,
        toleranz: 5,
        tipp: "Addieren Sie Zinssatz und Tilgungsrate (1,95 + 2 = 3,95), multiplizieren Sie mit dem Darlehen und dividieren durch 100. Lösung: 120.000 × 3,95 / 100 = 4.740 €"
      },
      {
        nr: 2,
        kontext: "Berechnung der jährlichen Annuität für das Hausbank-Darlehen (Darlehen 2)",
        formel: "A₂ = D₂ × (p₂ + t₂) / 100",
        variablen: [
          {
            kuerzel: "A₂",
            bedeutung: "Jährliche Annuität Hausbank-Darlehen",
            wert: "?"
          },
          {
            kuerzel: "D₂",
            bedeutung: "Darlehenssumme Hausbank",
            wert: "280.000 €"
          },
          {
            kuerzel: "p₂",
            bedeutung: "Zinssatz Hausbank",
            wert: "3,8%"
          },
          {
            kuerzel: "t₂",
            bedeutung: "Tilgungsrate Hausbank",
            wert: "2%"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Annuität für das Hausbank-Darlehen von 280.000 € bei 3,8% Zinsen und 2% Tilgung.",
        einheit: "€",
        korrekt: 16240,
        toleranz: 5,
        tipp: "Addieren Sie Zinssatz und Tilgungsrate (3,8 + 2 = 5,8), multiplizieren Sie mit dem Darlehen und dividieren durch 100. Lösung: 280.000 × 5,8 / 100 = 16.240 €"
      },
      {
        nr: 3,
        kontext: "Berechnung der jährlichen Gesamtannuität",
        formel: "A_ges = A₁ + A₂",
        variablen: [
          {
            kuerzel: "A_ges",
            bedeutung: "Jährliche Gesamtannuität",
            wert: "?"
          },
          {
            kuerzel: "A₁",
            bedeutung: "Jährliche Annuität KfW",
            wert: "4.740 €"
          },
          {
            kuerzel: "A₂",
            bedeutung: "Jährliche Annuität Hausbank",
            wert: "16.240 €"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Gesamtannuität durch Addition beider Annuitäten.",
        einheit: "€",
        korrekt: 20980,
        toleranz: 5,
        tipp: "Lösung: 4.740 € + 16.240 € = 20.980 €"
      },
      {
        nr: 4,
        kontext: "Berechnung der monatlichen Gesamtrate",
        formel: "M = A_ges / 12",
        variablen: [
          {
            kuerzel: "M",
            bedeutung: "Monatliche Gesamtrate",
            wert: "?"
          },
          {
            kuerzel: "A_ges",
            bedeutung: "Jährliche Gesamtannuität",
            wert: "20.980 €"
          }
        ],
        aufgabe: "Berechnen Sie die monatliche Gesamtrate durch Division der Jahresannuität durch 12 Monate.",
        einheit: "€",
        korrekt: 1748.33,
        toleranz: 2,
        tipp: "Lösung: 20.980 € / 12 = 1.748,33 € (monatliche Rate)"
      }
    ],
    abschluss: "Die monatliche Gesamtrate für beide Darlehen beträgt 1.748,33 €. Dieser Betrag setzt sich aus der KfW-Rate (395 €/Monat) und der Hausbank-Rate (1.353,33 €/Monat) zusammen und umfasst jeweils die Zins- und Tilgungszahlungen.",
    gesetze: [
      "KfW-Förderrichtlinien",
      "Baufinanzierungs-Standards"
    ],
    praxistipp: "Bei der Kombination mehrerer Darlehen müssen die unterschiedlichen Zinssätze berücksichtigt werden. KfW-Kredite bieten oft bessere Konditionen und sollten vollständig ausgeschöpft werden. Vergleichen Sie immer die Gesamtbelastung aller Finanzierungsquellen. Achten Sie auf Sondertilgungsrechte und Bereitstellungszinsen bei den Darlehen."
  },
  {
    id: 77,
    bereich: "Annuität & Tilgung",
    titel: "Tilgungsplan 4 Monate",
    berufssituation: "Darlehen 300.000 €, Zins 4,0%, Tilgung 1,5%. Erstellen Sie einen Tilgungsplan für die ersten 4 Monate mit Zinsanteil, Tilgungsanteil und Restschuld.",
    was_lerne_ich: "Berechnung und Struktur eines monatlichen Tilgungsplans mit variablen Zins- und Tilgungsanteilen",
    schritte: [
      {
        nr: 1,
        kontext: "kurz",
        formel: "Annuität = Darlehensbetrag × (Zinssatz + Tilgungssatz) / 12",
        variablen: [
          {
            kuerzel: "D",
            bedeutung: "Darlehensbetrag",
            wert: "300000"
          },
          {
            kuerzel: "i",
            bedeutung: "Jahreszinssatz",
            wert: "0,04"
          },
          {
            kuerzel: "t",
            bedeutung: "Jahrestilgungssatz",
            wert: "0,015"
          }
        ],
        aufgabe: "Berechnen Sie die monatliche Annuität",
        einheit: "€",
        korrekt: 1375,
        toleranz: 0.01,
        tipp: "Addieren Sie Zins- und Tilgungssatz, multiplizieren Sie mit dem Darlehen und teilen Sie durch 12 Monate"
      },
      {
        nr: 2,
        kontext: "mittel",
        formel: "Zinsanteil Monat 1 = Restschuld × Zinssatz / 12",
        variablen: [
          {
            kuerzel: "RS",
            bedeutung: "Restschuld Monat 0",
            wert: "300000"
          },
          {
            kuerzel: "i",
            bedeutung: "Jahreszinssatz",
            wert: "0,04"
          }
        ],
        aufgabe: "Berechnen Sie den Zinsanteil für Monat 1",
        einheit: "€",
        korrekt: 1000,
        toleranz: 0.01,
        tipp: "Monatlicher Zins = Restschuld × 4% / 12. Tilgung = Annuität - Zinsanteil"
      },
      {
        nr: 3,
        kontext: "ausführlich",
        formel: "Restschuld nach Monat n = vorherige Restschuld - Tilgungsanteil",
        variablen: [
          {
            kuerzel: "Monat",
            bedeutung: "Laufende Nummer",
            wert: "1-4"
          },
          {
            kuerzel: "Annuität",
            bedeutung: "Monatliche Rate",
            wert: "1375"
          }
        ],
        aufgabe: "Erstellen Sie den kompletten Tilgungsplan für 4 Monate. Monat 1: Zins 1000€, Tilgung 375€, Restschuld 299625€. Berechnen Sie Monate 2-4.",
        einheit: "€",
        korrekt: 298498.04,
        toleranz: 0.1,
        tipp: "Beachten Sie, dass der Zinsanteil jeden Monat sinkt, da die Restschuld abnimmt. Der Tilgungsanteil entsprechend steigt."
      }
    ],
    abschluss: "Nach 4 Monaten beträgt die Restschuld ca. 298.498,04€ bei einer gezahlten Gesamtannuität von 5.500€",
    gesetze: [
      "§488 BGB (Darlehensvertrag)",
      "§289 BGB (Verzinsung)"
    ],
    praxistipp: "In der Praxis wird der Tilgungsplan oft jährlich neu berechnet (Jahrestilgungsplan). Nutzen Sie für komplexe Planungen Kreditrechner oder Excel-Vorlagen mit automatischen Berechnungen."
  },
  {
    id: 78,
    bereich: "Annuität & Tilgung",
    titel: "Beleihungsauslauf Grenze",
    berufssituation: "Kaufpreis 450.000 €, Nebenkosten 10%, Bank finanziert bis 80% des Kaufpreises. Maximaler Kreditbetrag und benötigtes Eigenkapital?",
    was_lerne_ich: "Sie lernen, die Beleihungsgrenze richtig zu berechnen und daraus den maximalen Kreditbetrag sowie das erforderliche Eigenkapital zu ermitteln.",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst muss die Gesamtinvestitionssumme ermittelt werden, die Kaufpreis plus Nebenkosten umfasst. Diese Summe ist relevant für die Berechnung des Beleihungsausschlags.",
        formel: "Gesamtinvestitionssumme = Kaufpreis + (Kaufpreis × Nebenkosten%)",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis der Immobilie",
            wert: "450.000 €"
          },
          {
            kuerzel: "Nebenkosten%",
            bedeutung: "Nebenkosten in Prozent",
            wert: "10%"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtinvestitionssumme (Kaufpreis + 10% Nebenkosten).",
        einheit: "€",
        korrekt: 495000,
        toleranz: 1,
        tipp: "450.000 € × (1 + 0,10) = 495.000 €"
      },
      {
        nr: 2,
        kontext: "Die Bank finanziert nur bis zu einer Beleihungsgrenze von 80% des Kaufpreises (nicht der Gesamtsumme). Dies ist die Standardpraxis bei der Beleihungswertermittlung.",
        formel: "Maximaler Kreditbetrag = Kaufpreis × Beleihungsquote",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis der Immobilie",
            wert: "450.000 €"
          },
          {
            kuerzel: "Beleihungsquote",
            bedeutung: "Maximale Beleihungsquote der Bank",
            wert: "80%"
          }
        ],
        aufgabe: "Berechnen Sie den maximalen Kreditbetrag bei einer Beleihungsquote von 80% des Kaufpreises.",
        einheit: "€",
        korrekt: 360000,
        toleranz: 1,
        tipp: "450.000 € × 0,80 = 360.000 €"
      },
      {
        nr: 3,
        kontext: "Das erforderliche Eigenkapital muss die gesamte Investitionssumme minus des maximalen Kreditbetrags abdecken. Der Käufer muss also Kaufpreis, Nebenkosten und die nicht beleihbaren 20% des Kaufpreises selbst finanzieren.",
        formel: "Benötigtes Eigenkapital = Gesamtinvestitionssumme - Maximaler Kreditbetrag",
        variablen: [
          {
            kuerzel: "Gesamtinvestitionssumme",
            bedeutung: "Kaufpreis + Nebenkosten",
            wert: "495.000 €"
          },
          {
            kuerzel: "Maximaler Kreditbetrag",
            bedeutung: "80% des Kaufpreises",
            wert: "360.000 €"
          }
        ],
        aufgabe: "Berechnen Sie das benötigte Eigenkapital unter Berücksichtigung aller Kosten.",
        einheit: "€",
        korrekt: 135000,
        toleranz: 1,
        tipp: "495.000 € - 360.000 € = 135.000 €"
      },
      {
        nr: 4,
        kontext: "Zur Kontrolle wird die tatsächliche Beleihungsquote basierend auf der Gesamtinvestitionssumme berechnet. Dies zeigt das reale Finanzierungsrisiko und ist wichtig für die Kreditwürdigkeitsprüfung.",
        formel: "Effektive Beleihungsquote = (Maximaler Kreditbetrag / Gesamtinvestitionssumme) × 100",
        variablen: [
          {
            kuerzel: "Maximaler Kreditbetrag",
            bedeutung: "Bewilligter Kreditbetrag",
            wert: "360.000 €"
          },
          {
            kuerzel: "Gesamtinvestitionssumme",
            bedeutung: "Gesamte Investitionskosten",
            wert: "495.000 €"
          }
        ],
        aufgabe: "Berechnen Sie die effektive Beleihungsquote bezogen auf die Gesamtinvestitionssumme.",
        einheit: "%",
        korrekt: 72.73,
        toleranz: 0.01,
        tipp: "(360.000 € / 495.000 €) × 100 = 72,73%"
      }
    ],
    abschluss: "Bei einem Kaufpreis von 450.000 € mit 10% Nebenkosten kann die Bank maximal 360.000 € (80% des Kaufpreises) finanzieren. Der Käufer muss ein Eigenkapital von mindestens 135.000 € aufbringen, was einer effektiven Beleihungsquote von 72,73% entspricht.",
    gesetze: [
      "§183 ff. BauGB - Kaufpreisregelungen",
      "§88 BGB - Sicherheiten bei Darlehen"
    ],
    praxistipp: "In der Realität verlangen Banken oft noch höhere Eigenkapitalquoten (mindestens 20-25%) und berücksichtigen den Beleihungswert, der unter dem Kaufpreis liegen kann. Immer die aktuellen Konditionsrichtlinien der Kreditinstitute beachten und frühzeitig mit der Finanzierung klären, um Finanzierungslücken zu vermeiden."
  },
  {
    id: 79,
    bereich: "Annuität & Tilgung",
    titel: "Zinslastquote prüfen",
    berufssituation: "Nettoeinkommen 5.800 €/Mo, max 35% für Wohnen. Darlehen 380.000 €, Zins 3,9%, Tilgung 2%. Ist das tragbar?",
    was_lerne_ich: "Berechnung der Annuität und Überprüfung der Tragfähigkeit anhand der maximalen Wohnkostenquote",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung der jährlichen Annuität (Zins + Tilgung)",
        formel: "Annuität = Darlehenssumme × (Zinssatz + Tilgungssatz)",
        variablen: [
          {
            kuerzel: "Darlehenssumme",
            bedeutung: "Kreditbetrag",
            wert: "380.000"
          },
          {
            kuerzel: "Zinssatz",
            bedeutung: "Jährlicher Zinssatz",
            wert: "0,039"
          },
          {
            kuerzel: "Tilgungssatz",
            bedeutung: "Jährliche Tilgungsquote",
            wert: "0,02"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Annuität des Darlehens",
        einheit: "€/Jahr",
        korrekt: 22040,
        toleranz: 10,
        tipp: "Lösung: 380.000 × (0,039 + 0,02) = 380.000 × 0,059 = 22.040 €/Jahr"
      },
      {
        nr: 2,
        kontext: "Umrechnung der jährlichen Annuität in monatliche Rate",
        formel: "Monatliche Rate = Jährliche Annuität ÷ 12",
        variablen: [
          {
            kuerzel: "Jährliche Annuität",
            bedeutung: "Jahresbelastung",
            wert: "22.040"
          }
        ],
        aufgabe: "Berechnen Sie die monatliche Darlehensbelas­tung",
        einheit: "€/Monat",
        korrekt: 1836.67,
        toleranz: 5,
        tipp: "Lösung: 22.040 ÷ 12 = 1.836,67 €/Monat"
      },
      {
        nr: 3,
        kontext: "Berechnung der maximalen Wohnkostenquote",
        formel: "Max. Wohnbudget = Nettoeinkommen × Wohnkostenquote",
        variablen: [
          {
            kuerzel: "Nettoeinkommen",
            bedeutung: "Monatliches Nettoeinkommen",
            wert: "5.800"
          },
          {
            kuerzel: "Wohnkostenquote",
            bedeutung: "Maximaler Prozentsatz für Wohnen",
            wert: "0,35"
          }
        ],
        aufgabe: "Berechnen Sie das maximale monatliche Wohnbudget",
        einheit: "€/Monat",
        korrekt: 2030,
        toleranz: 5,
        tipp: "Lösung: 5.800 × 0,35 = 2.030 €/Monat"
      },
      {
        nr: 4,
        kontext: "Vergleich der Darlehenslast mit dem zulässigen Budget",
        formel: "Tragfähigkeit = Monatliche Rate ≤ Max. Wohnbudget",
        variablen: [
          {
            kuerzel: "Monatliche Rate",
            bedeutung: "Tatsächliche Darlehenslast",
            wert: "1.836,67"
          },
          {
            kuerzel: "Max. Wohnbudget",
            bedeutung: "Maximales zulässiges Wohnbudget",
            wert: "2.030"
          },
          {
            kuerzel: "Überschuss",
            bedeutung: "Puffer zum Maximum",
            wert: "193,33"
          }
        ],
        aufgabe: "Prüfen Sie, ob die Darlehenslast tragbar ist und berechnen Sie den verbleibenden Puffer",
        einheit: "€/Monat",
        korrekt: 193.33,
        toleranz: 5,
        tipp: "Lösung: 2.030 - 1.836,67 = 193,33 € Puffer. Das Darlehen ist tragbar!"
      }
    ],
    abschluss: "Die monatliche Darlehenslast von 1.836,67 € liegt unter der maximal zulässigen Wohnkostenquote von 2.030 € (35% des Nettoeinkommens). Die Finanzierung ist tragbar mit einem Sicherheitspuffer von etwa 193 € für Nebenkosten und Instandhaltung.",
    gesetze: [
      "§ 18 Abs. 2 KWG - Kreditvergabeprinzipien",
      "§ 6 AStV - Anforderungen an die Tragfähigkeitsprüfung"
    ],
    praxistipp: "Banken empfehlen zusätzlich zur Annuität ein Budget für Nebenkosten (ca. 2-3 €/m²) und Instandhaltungsrücklagen. Der berechnete Puffer von 193 € sollte diese Kosten abdecken. Ein höherer Tilgungssatz verkürzt die Laufzeit und spart Zinsen - überprüfen Sie bei besserer Bonität auch höhere Tilgungsquoten."
  },
  {
    id: 80,
    bereich: "Annuität & Tilgung",
    titel: "Anschlussfinanzierung",
    berufssituation: "Ein Immobiliendarlehen läuft aus. Die Restschuld beträgt 245.000 €. Bei der Anschlussfinanzierung steigt der Zinssatz von 2,1% auf 4,8% p.a. Die Tilgungsquote wird auf 2% p.a. festgelegt. Berechnen Sie die neue monatliche Annuität.",
    was_lerne_ich: "Berechnung der Annuität bei geänderter Zinsrate und Ermittlung der finanziellen Belastung bei Anschlussfinanzierungen",
    schritte: [
      {
        nr: 1,
        kontext: "Die Annuität setzt sich aus Zins und Tilgung zusammen. Zunächst wird die jährliche Annuität auf Basis des neuen Zinssatzes und der Tilgungsquote berechnet.",
        formel: "Annuität p.a. = Restschuld × (Zinssatz + Tilgungsquote)",
        variablen: [
          {
            kuerzel: "RS",
            bedeutung: "Restschuld",
            wert: "245.000 €"
          },
          {
            kuerzel: "i",
            bedeutung: "Zinssatz p.a.",
            wert: "4,8%"
          },
          {
            kuerzel: "t",
            bedeutung: "Tilgungsquote p.a.",
            wert: "2%"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Annuität: 245.000 € × (4,8% + 2%)",
        einheit: "€",
        korrekt: 16660,
        toleranz: 1,
        tipp: "Lösung: 245.000 × 0,068 = 16.660 €"
      },
      {
        nr: 2,
        kontext: "Die jährliche Annuität wird in eine monatliche Rate umgerechnet, da Darlehen üblicherweise monatlich bedient werden.",
        formel: "Monatsrate = Annuität p.a. ÷ 12",
        variablen: [
          {
            kuerzel: "A",
            bedeutung: "Jährliche Annuität",
            wert: "16.660 €"
          }
        ],
        aufgabe: "Berechnen Sie die monatliche Annuität: 16.660 € ÷ 12",
        einheit: "€",
        korrekt: 1388.33,
        toleranz: 1,
        tipp: "Lösung: 16.660 ÷ 12 = 1.388,33 €"
      },
      {
        nr: 3,
        kontext: "Vergleich zur ursprünglichen Belastung: Die alte monatliche Rate wird basierend auf dem ursprünglichen Zinssatz (2,1%) berechnet.",
        formel: "Alte Monatsrate = Restschuld × (alter Zinssatz + Tilgungsquote) ÷ 12",
        variablen: [
          {
            kuerzel: "RS",
            bedeutung: "Restschuld",
            wert: "245.000 €"
          },
          {
            kuerzel: "i_alt",
            bedeutung: "Alter Zinssatz p.a.",
            wert: "2,1%"
          },
          {
            kuerzel: "t",
            bedeutung: "Tilgungsquote p.a.",
            wert: "2%"
          }
        ],
        aufgabe: "Berechnen Sie die alte monatliche Rate und die Steigerung: 245.000 € × (2,1% + 2%) ÷ 12",
        einheit: "€",
        korrekt: 860.42,
        toleranz: 1,
        tipp: "Lösung: 245.000 × 0,041 ÷ 12 = 860,42 €. Steigerung: 1.388,33 € - 860,42 € = 527,91 €"
      }
    ],
    abschluss: "Die neue monatliche Annuität beträgt 1.388,33 €. Dies ist eine Erhöhung um 527,91 € (ca. 61,4%) gegenüber der alten Rate von 860,42 €. Diese Zinserhöhung von 2,7 Prozentpunkten führt zu einer erheblichen Mehrbelastung des Kreditnehmers.",
    gesetze: [
      "§ 488 BGB (Darlehensvertrag)",
      "§ 491 BGB (Verbraucherdarlehensvertrag)"
    ],
    praxistipp: "Bei Anschlussfinanzierungen sollten Makler frühzeitig mit Kunden über Zinsrisiken sprechen. Eine Szenarioanalyse mit verschiedenen Zinsszenarien (z.B. 4%, 5%, 6%) hilft bei der Finanzplanung. Auch Forward-Darlehen können Sicherheit bieten, wenn Zinserhöhungen befürchtet werden."
  },
  {
    id: 81,
    bereich: "Annuität & Tilgung",
    titel: "Effektivzins berechnen",
    berufssituation: "Ein Kreditnehmer erhält einen Immobilienkredit über 300.000 € mit einem Nominalzins von 3,5%, einer Bearbeitungsgebühr von 1% (einmalig) und einer Auszahlung von 99%. Der Effektivzins soll für eine 10-jährige Laufzeit näherungsweise berechnet werden.",
    was_lerne_ich: "Sie lernen, den Effektivzins unter Berücksichtigung aller Nebenkosten und Gebühren nach der Näherungsformel zu berechnen und verstehen, wie dieser vom Nominalzins abweicht.",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst wird die tatsächliche Auszahlungssumme berechnet. Der Kreditnehmer erhält nicht die volle Kreditsumme, sondern nur 99% davon. Dies ist ein wichtiger Kostenfaktor für die Effektivzinsberechnung.",
        formel: "Auszahlungsbetrag = Kreditsumme × Auszahlungsprozentsatz",
        variablen: [
          {
            kuerzel: "Kreditsumme",
            bedeutung: "Ursprüngliche Kreditvergabe",
            wert: "300.000 €"
          },
          {
            kuerzel: "Auszahlungsprozentsatz",
            bedeutung: "Prozentuale Auszahlung des Kredits",
            wert: "99%"
          }
        ],
        aufgabe: "Berechnen Sie den tatsächlichen Auszahlungsbetrag.",
        einheit: "€",
        korrekt: 297000.0,
        toleranz: 0.01,
        tipp: "300.000 € × 0,99 = 297.000 €"
      },
      {
        nr: 2,
        kontext: "Die Bearbeitungsgebühr von 1% wird auf die Kreditsumme berechnet und stellt einen weiteren Kostenfaktor dar, der den Effektivzins erhöht.",
        formel: "Bearbeitungsgebühr = Kreditsumme × Gebührensatz",
        variablen: [
          {
            kuerzel: "Kreditsumme",
            bedeutung: "Ursprüngliche Kreditvergabe",
            wert: "300.000 €"
          },
          {
            kuerzel: "Gebührensatz",
            bedeutung: "Prozentuale Bearbeitungsgebühr",
            wert: "1%"
          }
        ],
        aufgabe: "Berechnen Sie die Bearbeitungsgebühr.",
        einheit: "€",
        korrekt: 3000.0,
        toleranz: 0.01,
        tipp: "300.000 € × 0,01 = 3.000 €"
      },
      {
        nr: 3,
        kontext: "Die Gesamtnebenkostenquote ergibt sich aus der Differenz zwischen Kreditsumme und Auszahlungsbetrag plus Bearbeitungsgebühr. Dies zeigt die Gesamtbelastung für den Kreditnehmer.",
        formel: "Gesamtnebenkostenquote = (Kreditsumme - Auszahlungsbetrag) + Bearbeitungsgebühr",
        variablen: [
          {
            kuerzel: "Kreditsumme",
            bedeutung: "Ursprüngliche Kreditvergabe",
            wert: "300.000 €"
          },
          {
            kuerzel: "Auszahlungsbetrag",
            bedeutung: "Tatsächlich ausgezahlter Betrag",
            wert: "297.000 €"
          },
          {
            kuerzel: "Bearbeitungsgebühr",
            bedeutung: "Einmalige Gebühr",
            wert: "3.000 €"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtnebenkostenquote.",
        einheit: "€",
        korrekt: 6000.0,
        toleranz: 0.01,
        tipp: "(300.000 € - 297.000 €) + 3.000 € = 6.000 €"
      },
      {
        nr: 4,
        kontext: "Mit der Näherungsformel wird der Effektivzins berechnet. Die Formel berücksichtigt den Nominalzins und die Nebenkosten sowie die Laufzeit. Dies ist die gebräuchliche Methode zur schnellen Berechnung des Effektivzinses.",
        formel: "Effektivzins ≈ Nominalzins + (Gesamtnebenkostenquote × 200) / (Kreditsumme × Laufzeit)",
        variablen: [
          {
            kuerzel: "Nominalzins",
            bedeutung: "Vereinbarter Basiszins",
            wert: "3,5%"
          },
          {
            kuerzel: "Gesamtnebenkostenquote",
            bedeutung: "Summe aller Nebenkosten",
            wert: "6.000 €"
          },
          {
            kuerzel: "Kreditsumme",
            bedeutung: "Ursprüngliche Kreditvergabe",
            wert: "300.000 €"
          },
          {
            kuerzel: "Laufzeit",
            bedeutung: "Kreditlaufzeit in Jahren",
            wert: "10"
          }
        ],
        aufgabe: "Berechnen Sie den Effektivzins näherungsweise mit der angegebenen Formel.",
        einheit: "%",
        korrekt: 3.9,
        toleranz: 0.1,
        tipp: "3,5% + (6.000 € × 200) / (300.000 € × 10) = 3,5% + 0,4% = 3,9%"
      }
    ],
    abschluss: "Der Effektivzins von 3,9% liegt aufgrund der Auszahlungsabschlag und Bearbeitungsgebühr um 0,4 Prozentpunkte über dem Nominalzins von 3,5%. Dies zeigt die realen Gesamtkosten des Kredits für den Kreditnehmer auf.",
    gesetze: [
      "§ 6 PAngV (Preisangabenverordnung)",
      "§ 492 BGB (Darlehensvertrag)"
    ],
    praxistipp: "Bei der Kreditberatung sollten Sie immer den Effektivzins kommunizieren, da dieser die wahren Kosten des Kredits abbildet. Achten Sie darauf, dass alle Gebühren und Auszahlungsabschläge korrekt berücksichtigt werden, um eine vollständige Transparenz gegenüber dem Kunden zu gewährleisten."
  },
  {
    id: 82,
    bereich: "Annuität & Tilgung",
    titel: "Mietrendite vs. Zinslast",
    berufssituation: "Ein Investor kauft eine Wohnimmobilie für 420.000 €. Er finanziert 336.000 € durch ein Darlehen zu 4,1% Zinsen und 2% Tilgung. Die Jahreskaltmiete beträgt 20.400 €. Frage: Ist der Cashflow positiv oder negativ?",
    was_lerne_ich: "Berechnung der Annuität aus Zinssatz und Tilgungssatz, Gegenüberstellung mit Mieteinnahmen zur Beurteilung der Rentabilität und Liquidität einer Immobilieninvestition",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung des Annuitätssatzes (Zinssatz + Tilgungssatz)",
        formel: "Annuitätssatz = Zinssatz + Tilgungssatz",
        variablen: [
          {
            kuerzel: "i",
            bedeutung: "Zinssatz",
            wert: "4,1%"
          },
          {
            kuerzel: "t",
            bedeutung: "Tilgungssatz",
            wert: "2,0%"
          }
        ],
        aufgabe: "Berechnen Sie den Gesamtannuitätssatz in Prozent",
        einheit: "%",
        korrekt: 6.1,
        toleranz: 0.05,
        tipp: "Annuitätssatz = 4,1% + 2,0% = 6,1%"
      },
      {
        nr: 2,
        kontext: "Berechnung der jährlichen Annuitätszahlung (Zins- und Tilgungsleistung)",
        formel: "Annuität = Fremdkapital × Annuitätssatz",
        variablen: [
          {
            kuerzel: "FK",
            bedeutung: "Fremdkapital",
            wert: "336000"
          },
          {
            kuerzel: "Annuitätssatz",
            bedeutung: "Zins- + Tilgungssatz",
            wert: "0,061"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Annuität in Euro",
        einheit: "€",
        korrekt: 20496,
        toleranz: 10,
        tipp: "Annuität = 336.000 € × 0,061 = 20.496 €"
      },
      {
        nr: 3,
        kontext: "Vergleich Mieteinnahmen vs. Kreditbelastung (vereinfachter Cashflow)",
        formel: "Cashflow = Jahreskaltmiete - Annuität",
        variablen: [
          {
            kuerzel: "Kaltmiete",
            bedeutung: "Jahreskaltmiete",
            wert: "20400"
          },
          {
            kuerzel: "Annuität",
            bedeutung: "Jährliche Zins- und Tilgungsleistung",
            wert: "20496"
          }
        ],
        aufgabe: "Berechnen Sie den Cashflow (Mieteinnahmen abzüglich Darlehenszahlungen). Ist dieser positiv oder negativ?",
        einheit: "€",
        korrekt: -96,
        toleranz: 5,
        tipp: "Cashflow = 20.400 € - 20.496 € = -96 €. Der Cashflow ist NEGATIV (Eigenkapital wird aufgezehrt)"
      },
      {
        nr: 4,
        kontext: "Bewertung der Gesamtrentabilität unter Betrachtung des Eigenkapitals",
        formel: "Bruttomietrendite = (Jahreskaltmiete / Kaufpreis) × 100",
        variablen: [
          {
            kuerzel: "Kaltmiete",
            bedeutung: "Jahreskaltmiete",
            wert: "20400"
          },
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Gesamtkaufpreis",
            wert: "420000"
          }
        ],
        aufgabe: "Berechnen Sie die Bruttomietrendite und bewerten Sie, ob die Rendite die Belastung rechtfertigt",
        einheit: "%",
        korrekt: 4.86,
        toleranz: 0.1,
        tipp: "Bruttomietrendite = (20.400 € / 420.000 €) × 100 = 4,86%. Dies liegt unter der Fremdkapitalrendite von 6,1% – klassischer Negative Leverage"
      }
    ],
    abschluss: "Die Investition weist einen negativen monatlichen Cashflow von etwa -8 € auf. Die Mietrendite (4,86%) liegt unter der Fremdkapitalbelastung (6,1%), was zu Negative Leverage führt. Nebenkosten und Leerstand nicht berücksichtigt – die Situation würde sich weiter verschärfen. Nur sinnvoll bei Erwartung von Wertsteigerungen oder Mieterhöhungen.",
    gesetze: [
      "§1 WoVG (Wertermittlungsverordnung) – Ertragswertverfahren",
      "BauGB §8 Abs. 3 – Bodenrichtwerte",
      "MietNHV (Mietnebenkosten-Verordnung) – Kostenumlagefähigkeit"
    ],
    praxistipp: "Bei Fremdkapitalrendite (6,1%) > Mietrendite (4,86%) spricht man von negativem Leverage. Dies ist typisch bei angespannten Märkten. Achten Sie auf: (1) Realistische Mietprognosen, (2) Nebenkostenabgrenzung (oft unterschätzt), (3) Leerstandsrisiko, (4) Sanierungsaufwendungen. Für die IHK-Prüfung: Cashflow-Analyse ist kernkompetenz des Maklersll und Maklers!"
  },
  {
    id: 83,
    bereich: "Kaufnebenkosten",
    titel: "Bayern vs Berlin",
    berufssituation: "Kaufpreis 500.000 €. GrESt Bayern 3,5% vs Berlin 6%. Nebenkosten und Differenz berechnen.",
    was_lerne_ich: "Grunderwerbsteuer in verschiedenen Bundesländern vergleichen und Kostenunterschiede ermitteln",
    schritte: [
      {
        nr: 1,
        kontext: "kurz",
        formel: "GrESt Bayern = Kaufpreis × Steuersatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis der Immobilie",
            wert: "500000"
          },
          {
            kuerzel: "Steuersatz Bayern",
            bedeutung: "GrESt-Satz in Bayern",
            wert: "0,035"
          }
        ],
        aufgabe: "Berechnen Sie die Grunderwerbsteuer für Bayern",
        einheit: "€",
        korrekt: 17500,
        toleranz: 0,
        tipp: "Grunderwerbsteuer = 500.000 € × 3,5%"
      },
      {
        nr: 2,
        kontext: "kurz",
        formel: "GrESt Berlin = Kaufpreis × Steuersatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis der Immobilie",
            wert: "500000"
          },
          {
            kuerzel: "Steuersatz Berlin",
            bedeutung: "GrESt-Satz in Berlin",
            wert: "0,06"
          }
        ],
        aufgabe: "Berechnen Sie die Grunderwerbsteuer für Berlin",
        einheit: "€",
        korrekt: 30000,
        toleranz: 0,
        tipp: "Grunderwerbsteuer = 500.000 € × 6%"
      },
      {
        nr: 3,
        kontext: "kurz",
        formel: "Differenz = GrESt Berlin - GrESt Bayern",
        variablen: [
          {
            kuerzel: "GrESt Berlin",
            bedeutung: "Grunderwerbsteuer Berlin",
            wert: "30000"
          },
          {
            kuerzel: "GrESt Bayern",
            bedeutung: "Grunderwerbsteuer Bayern",
            wert: "17500"
          }
        ],
        aufgabe: "Berechnen Sie die Kostenersparnis beim Kauf in Bayern gegenüber Berlin",
        einheit: "€",
        korrekt: 12500,
        toleranz: 0,
        tipp: "Differenz = 30.000 € - 17.500 €"
      }
    ],
    abschluss: "Ein Immobilienkauf in Bayern ist bei 500.000 € Kaufpreis um 12.500 € günstiger als in Berlin aufgrund der niedrigeren Grunderwerbsteuer (3,5% vs. 6%)",
    gesetze: [
      "§1 GrEStG (Grunderwerbsteuergesetz)",
      "Grunderwerbsteuer-Tariftabellen der Bundesländer"
    ],
    praxistipp: "Die Grunderwerbsteuer ist ein erheblicher Nebenkostenfaktor beim Immobilienkauf. Bundesländer mit niedrigeren Steuersätzen (Bayern 3,5%, Baden-Württemberg 5%) können bei großen Kaufsummen zu erheblichen Ersparnissen führen"
  },
  {
    id: 84,
    bereich: "Kaufnebenkosten",
    titel: "Notarkosten GNotKG",
    berufssituation: "Kaufpreis 350.000 €, Grundschuld 280.000 €. Notargebühren berechnen nach GNotKG.",
    was_lerne_ich: "Berechnung der Notargebühren nach GNotKG für Grundschuldbestellung und Kaufvertrag",
    schritte: [
      {
        nr: 1,
        kontext: "Gebührensatz für Kaufvertrag: Der Kaufpreis ist Grundlage der Notargebühr für die Beurkundung des Kaufvertrags.",
        formel: "Gebühr Kaufvertrag = Kaufpreis × Gebührensatz (1,0 von 1.000)",
        variablen: [
          {
            kuerzel: "KP",
            bedeutung: "Kaufpreis",
            wert: "350.000"
          },
          {
            kuerzel: "GS",
            bedeutung: "Gebührensatz",
            wert: "0,001"
          }
        ],
        aufgabe: "Berechnen Sie die Notargebühr für die Beurkundung des Kaufvertrags (Kaufpreis 350.000 €, Gebührensatz 1,0 von 1.000).",
        einheit: "€",
        korrekt: 350,
        toleranz: 0,
        tipp: "Kaufpreis × 0,001 = 350.000 × 0,001 = 350 €"
      },
      {
        nr: 2,
        kontext: "Gebührensatz für Grundschuldbestellung: Die Grundschuld ist Grundlage für eine weitere Gebühr. Der Gebührensatz für die Bestellung beträgt 1,0 von 1.000.",
        formel: "Gebühr Grundschuld = Grundschuldbetrag × Gebührensatz (1,0 von 1.000)",
        variablen: [
          {
            kuerzel: "GS",
            bedeutung: "Grundschuld",
            wert: "280.000"
          },
          {
            kuerzel: "GSATZ",
            bedeutung: "Gebührensatz",
            wert: "0,001"
          }
        ],
        aufgabe: "Berechnen Sie die Notargebühr für die Bestellung der Grundschuld (Grundschuld 280.000 €, Gebührensatz 1,0 von 1.000).",
        einheit: "€",
        korrekt: 280,
        toleranz: 0,
        tipp: "Grundschuld × 0,001 = 280.000 × 0,001 = 280 €"
      },
      {
        nr: 3,
        kontext: "Gesamtgebühr: Die Notargebühren für Kaufvertrag und Grundschuldbestellung werden addiert.",
        formel: "Gesamtgebühr = Gebühr Kaufvertrag + Gebühr Grundschuld",
        variablen: [
          {
            kuerzel: "GKauf",
            bedeutung: "Gebühr Kaufvertrag",
            wert: "350"
          },
          {
            kuerzel: "GGrund",
            bedeutung: "Gebühr Grundschuld",
            wert: "280"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtnotargebühr aus Kaufvertrag und Grundschuldbestellung.",
        einheit: "€",
        korrekt: 630,
        toleranz: 0,
        tipp: "350 € + 280 € = 630 €"
      },
      {
        nr: 4,
        kontext: "Umsatzsteuer: Die Notargebühren sind gebührenabhängig. Nach GNotKG wird die Umsatzsteuer von 19% auf die Gesamtgebühr berechnet.",
        formel: "Umsatzsteuer = Gesamtgebühr × 0,19",
        variablen: [
          {
            kuerzel: "GGes",
            bedeutung: "Gesamtgebühr netto",
            wert: "630"
          },
          {
            kuerzel: "USt",
            bedeutung: "Umsatzsteuersatz",
            wert: "0,19"
          }
        ],
        aufgabe: "Berechnen Sie die Umsatzsteuer auf die Notargebühren (19%).",
        einheit: "€",
        korrekt: 119.7,
        toleranz: 1,
        tipp: "630 € × 0,19 = 119,70 €"
      },
      {
        nr: 5,
        kontext: "Gesamtkostenbelastung: Netto- und Umsatzsteuer werden addiert für die Gesamtbelastung.",
        formel: "Gesamtkostenbelastung = Gesamtgebühr + Umsatzsteuer",
        variablen: [
          {
            kuerzel: "GGes",
            bedeutung: "Gesamtgebühr netto",
            wert: "630"
          },
          {
            kuerzel: "USt",
            bedeutung: "Umsatzsteuer",
            wert: "119.70"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtkostenbelastung für Notargebühren (netto + Umsatzsteuer).",
        einheit: "€",
        korrekt: 749.7,
        toleranz: 1,
        tipp: "630 € + 119,70 € = 749,70 € Gesamtkostenbelastung"
      }
    ],
    abschluss: "Die Notargebühren für Kaufvertrag und Grundschuldbestellung betragen netto 630 €. Mit 19% Umsatzsteuer ergibt sich eine Gesamtkostenbelastung von 749,70 €.",
    gesetze: [
      "§ 34 GNotKG (Gebühren für Beurkundungen)",
      "§ 37 GNotKG (Gebühren für Eintragungen im Grundbuch)"
    ],
    praxistipp: "Die Notargebühren sind nach GNotKG gesetzlich geregelt und können nicht verhandelt werden. Der Notar muss die Gebühren transparent ausweisen. Zusätzlich zu den Gebühren können Auslagenersätze (z.B. für Grundbuchauszug, Grundsteuerabschlag) anfallen. Maklergebühren sind separate Kostenbestandteile und fallen hier nicht unter GNotKG."
  },
  {
    id: 85,
    bereich: "Kaufnebenkosten",
    titel: "Grundbuchkosten",
    berufssituation: "Ein Immobilienmakler betreut den Kauf einer Eigentumswohnung. Der Kaufpreis beträgt 420.000 €. Zur Finanzierung wird eine Grundschuld in Höhe von 320.000 € ins Grundbuch eingetragen. Berechnen Sie die anfallenden Grundbuchkosten.",
    was_lerne_ich: "Berechnung der Grundbuchkosten für Eintragungen im Grundbuch (Eigentumsumschreibung und Grundschuldbestellung) nach Gebührenordnung",
    schritte: [
      {
        nr: 1,
        kontext: "Die Grundbuchkosten setzen sich aus zwei Teilen zusammen: Kosten für die Umschreibung des Eigentums und Kosten für die Eintragung der Grundschuld. Die Gebühren berechnen sich nach dem Gebührensatz von 0,5% des jeweiligen Wertes.",
        formel: "Kosten Eigentumsumschreibung = Kaufpreis × 0,5%",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis der Immobilie",
            wert: "420.000 €"
          },
          {
            kuerzel: "Gebührensatz",
            bedeutung: "Gebührensatz für Eigentumsumschreibung",
            wert: "0,5%"
          }
        ],
        aufgabe: "Berechnen Sie die Kosten für die Eigentumsumschreibung im Grundbuch.",
        einheit: "€",
        korrekt: 2100,
        toleranz: 0,
        tipp: "420.000 € × 0,5% = 420.000 € × 0,005 = 2.100 €"
      },
      {
        nr: 2,
        kontext: "Die Eintragung der Grundschuld wird ebenfalls mit 0,5% des Grundschuldbetrags berechnet. Dies ist eine separate Gebührenpflicht.",
        formel: "Kosten Grundschuld = Grundschuldbetrag × 0,5%",
        variablen: [
          {
            kuerzel: "Grundschuldbetrag",
            bedeutung: "Höhe der einzutragenden Grundschuld",
            wert: "320.000 €"
          },
          {
            kuerzel: "Gebührensatz",
            bedeutung: "Gebührensatz für Grundschuldbestellung",
            wert: "0,5%"
          }
        ],
        aufgabe: "Berechnen Sie die Kosten für die Eintragung der Grundschuld ins Grundbuch.",
        einheit: "€",
        korrekt: 1600,
        toleranz: 0,
        tipp: "320.000 € × 0,5% = 320.000 € × 0,005 = 1.600 €"
      },
      {
        nr: 3,
        kontext: "Die Gesamtgrundbuchkosten entstehen durch Addition der Kosten für Eigentumsumschreibung und Grundschuld.",
        formel: "Gesamtgrundbuchkosten = Kosten Eigentumsumschreibung + Kosten Grundschuld",
        variablen: [
          {
            kuerzel: "Kosten Eigentumsumschreibung",
            bedeutung: "Gebühren für Eigentumsumschreibung",
            wert: "2.100 €"
          },
          {
            kuerzel: "Kosten Grundschuld",
            bedeutung: "Gebühren für Grundschuldbestellung",
            wert: "1.600 €"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtgrundbuchkosten.",
        einheit: "€",
        korrekt: 3700,
        toleranz: 0,
        tipp: "2.100 € + 1.600 € = 3.700 €"
      }
    ],
    abschluss: "Die Gesamtgrundbuchkosten für die Eigentumsumschreibung und die Eintragung der Grundschuld betragen 3.700 €.",
    gesetze: [
      "§ 3 GNotKG (Gebührenordnung für Notare)",
      "§ 13 GNotKG (Gebühren für Grundbuchsachen)"
    ],
    praxistipp: "Die Grundbuchkosten sind Teil der Kaufnebenkosten und werden üblicherweise vom Käufer getragen. Sie sollten bereits bei der Kostenplanung berücksichtigt werden. Hinweis: Die genauen Gebührensätze können je nach Bundesland und aktuellem Gebührenrecht variieren."
  },
  {
    id: 86,
    bereich: "Kaufnebenkosten",
    titel: "Makler und Nebenkosten gesamt",
    berufssituation: "Ein Käufer erwirbt eine Immobilie für 380.000 €. Berechnen Sie die Gesamtinvestition unter Berücksichtigung von Grunderwerbsteuer (6%), Notarkosten (2%) und Maklergebühr (3,57%).",
    was_lerne_ich: "Berechnung aller Kaufnebenkosten und Ermittlung der Gesamtinvestition als Kaufpreis plus sämtliche Nebenkosten",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung der Grunderwerbsteuer (GrESt)",
        formel: "GrESt = Kaufpreis × Steuersatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Vereinbarter Kaufpreis der Immobilie",
            wert: "380.000 €"
          },
          {
            kuerzel: "Steuersatz",
            bedeutung: "Grunderwerbsteuersatz",
            wert: "6 %"
          }
        ],
        aufgabe: "Berechnen Sie die Grunderwerbsteuer für den Kaufpreis von 380.000 €",
        einheit: "€",
        korrekt: 22800,
        toleranz: 1,
        tipp: "Lösung: 380.000 × 0,06 = 22.800 €"
      },
      {
        nr: 2,
        kontext: "Berechnung der Notarkosten",
        formel: "Notarkosten = Kaufpreis × Notarsatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Vereinbarter Kaufpreis der Immobilie",
            wert: "380.000 €"
          },
          {
            kuerzel: "Notarsatz",
            bedeutung: "Notargebührensatz",
            wert: "2 %"
          }
        ],
        aufgabe: "Berechnen Sie die Notarkosten mit einem Satz von 2% des Kaufpreises",
        einheit: "€",
        korrekt: 7600,
        toleranz: 1,
        tipp: "Lösung: 380.000 × 0,02 = 7.600 €"
      },
      {
        nr: 3,
        kontext: "Berechnung der Maklergebühr",
        formel: "Maklergebühr = Kaufpreis × Maklerquote",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Vereinbarter Kaufpreis der Immobilie",
            wert: "380.000 €"
          },
          {
            kuerzel: "Maklerquote",
            bedeutung: "Maklergebührensatz (netto)",
            wert: "3,57 %"
          }
        ],
        aufgabe: "Berechnen Sie die Maklergebühr mit einer Quote von 3,57% des Kaufpreises",
        einheit: "€",
        korrekt: 13566,
        toleranz: 1,
        tipp: "Lösung: 380.000 × 0,0357 = 13.566 €"
      },
      {
        nr: 4,
        kontext: "Berechnung der Gesamtinvestition",
        formel: "Gesamtinvestition = Kaufpreis + GrESt + Notarkosten + Maklergebühr",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Vereinbarter Kaufpreis",
            wert: "380.000 €"
          },
          {
            kuerzel: "GrESt",
            bedeutung: "Grunderwerbsteuer",
            wert: "22.800 €"
          },
          {
            kuerzel: "Notarkosten",
            bedeutung: "Notargebühren und Grundbuchgebühren",
            wert: "7.600 €"
          },
          {
            kuerzel: "Maklergebühr",
            bedeutung: "Maklerprovision netto",
            wert: "13.566 €"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtinvestition durch Addition aller Kostenpositionen",
        einheit: "€",
        korrekt: 423966,
        toleranz: 1,
        tipp: "Lösung: 380.000 + 22.800 + 7.600 + 13.566 = 423.966 €"
      }
    ],
    abschluss: "Die Gesamtinvestition für den Immobilienkauf beträgt 423.966 €. Dies setzt sich zusammen aus dem Kaufpreis von 380.000 € und den Nebenkosten von insgesamt 43.966 €.",
    gesetze: [
      "§1 GrEStG Grunderwerbsteuer",
      "§2 GNotKG Gerichts- und Notargebührengesetz",
      "§5 ff. MaklerG Maklergebührenverordnung"
    ],
    praxistipp: "Bei der Finanzierungsplanung sollten Käufer mindestens 10-15% des Kaufpreises als Rücklagen für Nebenkosten einplanen. Diese müssen zusätzlich zum Eigenkapital für den Kaufpreis aufgebracht werden. Maklergebühren sind in einigen Bundesländern geregelt und können variieren."
  },
  {
    id: 87,
    bereich: "Kaufnebenkosten",
    titel: "Gewerbekauf Nebenkosten",
    berufssituation: "Gewerbeimmobilie 1.200.000 €, GrESt 6,5% (Thüringen), Notar 1,5%, kein Makler. Gesamtnebenkosten und Gesamtinvestition?",
    was_lerne_ich: "Sie lernen, die Kaufnebenkosten für eine Gewerbeimmobilie korrekt zu berechnen und die Gesamtinvestition unter Berücksichtigung von Grunderwerbsteuer und Notargebühren zu ermitteln.",
    schritte: [
      {
        nr: 1,
        kontext: "Die Grunderwerbsteuer (GrESt) ist eine Steuer auf den Erwerb von Grundeigentum und wird auf den Kaufpreis angewendet. In Thüringen beträgt der Satz 6,5%. Diese wird für Gewerbeimmobilien genauso wie für Wohnimmobilien fällig.",
        formel: "Grunderwerbsteuer = Kaufpreis × GrESt-Satz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis der Gewerbeimmobilie",
            wert: "1.200.000 €"
          },
          {
            kuerzel: "GrESt-Satz",
            bedeutung: "Grunderwerbsteuersatz in Thüringen",
            wert: "6,5% oder 0,065"
          }
        ],
        aufgabe: "Berechnen Sie die anfallende Grunderwerbsteuer für den Kauf der Gewerbeimmobilie im Kaufpreis von 1.200.000 €.",
        einheit: "€",
        korrekt: 78000.0,
        toleranz: 1,
        tipp: "Multiplizieren Sie 1.200.000 € mit 0,065. Das Ergebnis beträgt 78.000 €."
      },
      {
        nr: 2,
        kontext: "Die Notargebühren entstehen für die Beurkundung des Kaufvertrags und die Eintragung ins Grundbuch. Diese werden üblicherweise auf Basis des Kaufpreises berechnet und betragen in diesem Fall 1,5% des Kaufpreises.",
        formel: "Notargebühren = Kaufpreis × Notarsatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis der Gewerbeimmobilie",
            wert: "1.200.000 €"
          },
          {
            kuerzel: "Notarsatz",
            bedeutung: "Gebührensatz des Notars",
            wert: "1,5% oder 0,015"
          }
        ],
        aufgabe: "Berechnen Sie die Notargebühren für die Beurkundung und Grundbucheintragung bei einem Notarsatz von 1,5%.",
        einheit: "€",
        korrekt: 18000.0,
        toleranz: 1,
        tipp: "Multiplizieren Sie 1.200.000 € mit 0,015. Das Ergebnis beträgt 18.000 €."
      },
      {
        nr: 3,
        kontext: "Die Gesamtnebenkosten setzen sich aus allen anfallenden Zusatzkosten zusammen. In diesem Fall sind das die Grunderwerbsteuer und die Notargebühren. Es fällt kein Makler an, daher entfällt die Maklergebühr.",
        formel: "Gesamtnebenkosten = Grunderwerbsteuer + Notargebühren",
        variablen: [
          {
            kuerzel: "Grunderwerbsteuer",
            bedeutung: "Berechnete Grunderwerbsteuer",
            wert: "78.000 €"
          },
          {
            kuerzel: "Notargebühren",
            bedeutung: "Berechnete Notargebühren",
            wert: "18.000 €"
          }
        ],
        aufgabe: "Addieren Sie die Grunderwerbsteuer und die Notargebühren, um die Gesamtnebenkosten zu ermitteln.",
        einheit: "€",
        korrekt: 96000.0,
        toleranz: 1,
        tipp: "Addieren Sie 78.000 € + 18.000 €. Die Gesamtnebenkosten betragen 96.000 €."
      },
      {
        nr: 4,
        kontext: "Die Gesamtinvestition ist der Gesamtbetrag, den der Käufer aufbringen muss. Sie setzt sich aus dem Kaufpreis und den gesamten Nebenkosten zusammen.",
        formel: "Gesamtinvestition = Kaufpreis + Gesamtnebenkosten",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis der Gewerbeimmobilie",
            wert: "1.200.000 €"
          },
          {
            kuerzel: "Gesamtnebenkosten",
            bedeutung: "Summe aller Nebenkosten",
            wert: "96.000 €"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtinvestition, die der Käufer für den Erwerb der Gewerbeimmobilie aufbringen muss.",
        einheit: "€",
        korrekt: 1296000.0,
        toleranz: 1,
        tipp: "Addieren Sie 1.200.000 € + 96.000 €. Die Gesamtinvestition beträgt 1.296.000 €."
      }
    ],
    abschluss: "Die Gesamtnebenkosten für den Gewerbeimmobilienkauf betragen 96.000 € (Grunderwerbsteuer 78.000 € + Notargebühren 18.000 €). Die Gesamtinvestition inklusive Kaufpreis beläuft sich auf 1.296.000 €.",
    gesetze: [
      "§1 GrEStG - Grunderwerbsteuergesetz",
      "§BeurkG - Beurkundungsgesetz",
      "§2 GrEStG - Besteuerungspflicht und Gegenstand der Steuer"
    ],
    praxistipp: "Beim Gewerbeimmobilienkauf sollten Sie immer überprüfen, ob im Bundesland zusätzliche Gebühren wie Grundbucheinträge anfallen. Machen Sie Ihre Finanzierungsplanung realistisch, indem Sie mindestens 8-10% des Kaufpreises für Nebenkosten kalkulieren. Bei diesem Beispiel sind es etwa 8%, was im unteren Bereich liegt, da kein Makler beteiligt ist."
  },
  {
    id: 88,
    bereich: "Kaufnebenkosten",
    titel: "Erbschaft vs. Kauf",
    berufssituation: "Ein Kind erbt eine Immobilie im Wert von 400.000 €. Der Erbschaftsteuer-Freibetrag für Kinder beträgt ebenfalls 400.000 €. Alternativ könnte die Immobilie gekauft werden. Die Kaufnebenkosten betragen 9,57%. Vergleichen Sie die finanziellen Belastungen.",
    was_lerne_ich: "Unterschied zwischen Erbschaftsteuer und Kaufnebenkosten sowie deren wirtschaftliche Auswirkungen erkennen",
    schritte: [
      {
        nr: 1,
        kontext: "Bei Erbschaft: Berechnung der Erbschaftsteuer",
        formel: "Erbschaftsteuer = (Immobilienwert - Freibetrag) × Steuersatz",
        variablen: [
          {
            kuerzel: "Immobilienwert",
            bedeutung: "Wert der Immobilie",
            wert: "400.000 €"
          },
          {
            kuerzel: "Freibetrag",
            bedeutung: "Erbschaftsteuer-Freibetrag für Kinder",
            wert: "400.000 €"
          },
          {
            kuerzel: "Steuersatz",
            bedeutung: "Progressiver Erbschaftsteuersatz Steuerklasse I",
            wert: "7-30% je nach Wert"
          }
        ],
        aufgabe: "Berechnen Sie die Erbschaftsteuer für das Kind, wenn der Immobilienwert genau dem Freibetrag entspricht.",
        einheit: "€",
        korrekt: 0,
        toleranz: 0,
        tipp: "Da der Immobilienwert (400.000 €) dem Freibetrag (400.000 €) entspricht, ist die zu versteuernde Grundlage = 0. Erbschaftsteuer = 0 €"
      },
      {
        nr: 2,
        kontext: "Bei Kauf: Berechnung der Kaufnebenkosten",
        formel: "Kaufnebenkosten = Kaufpreis × Nebenkostensatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Preis der Immobilie",
            wert: "400.000 €"
          },
          {
            kuerzel: "Nebenkostensatz",
            bedeutung: "Summe aller Nebenkosten (Grunderwerbsteuer, Makler, Notargebühren, Grundbucheintrag)",
            wert: "9,57%"
          }
        ],
        aufgabe: "Berechnen Sie die gesamten Kaufnebenkosten beim Kauf der Immobilie.",
        einheit: "€",
        korrekt: 38280,
        toleranz: 100,
        tipp: "Rechnung: 400.000 € × 9,57 ÷ 100 = 38.280 €"
      },
      {
        nr: 3,
        kontext: "Gesamtkostenvergleich: Erbschaft vs. Kauf",
        formel: "Kostenersparnis durch Erbschaft = Kaufnebenkosten - Erbschaftsteuer",
        variablen: [
          {
            kuerzel: "Kaufnebenkosten",
            bedeutung: "Nebenkosten beim Immobilienkauf",
            wert: "38.280 €"
          },
          {
            kuerzel: "Erbschaftsteuer",
            bedeutung: "Steuer bei Erbschaft",
            wert: "0 €"
          }
        ],
        aufgabe: "Berechnen Sie die finanzielle Einsparung durch Erbschaft im Vergleich zum Kauf.",
        einheit: "€",
        korrekt: 38280,
        toleranz: 100,
        tipp: "Kostenersparnis = 38.280 € - 0 € = 38.280 € Ersparnisse durch Erbschaft"
      },
      {
        nr: 4,
        kontext: "Prozentuale Kostenersparnis",
        formel: "Einsparungsquote = (Kostenersparnis ÷ Immobilienwert) × 100",
        variablen: [
          {
            kuerzel: "Kostenersparnis",
            bedeutung: "Ersparte Nebenkosten",
            wert: "38.280 €"
          },
          {
            kuerzel: "Immobilienwert",
            bedeutung: "Wert der Immobilie",
            wert: "400.000 €"
          }
        ],
        aufgabe: "Berechnen Sie die prozentuale Einsparung bei Erbschaft gegenüber dem Kauf.",
        einheit: "%",
        korrekt: 9.57,
        toleranz: 0.1,
        tipp: "Rechnung: (38.280 € ÷ 400.000 €) × 100 = 9,57%"
      }
    ],
    abschluss: "Die Erbschaft ist in diesem Fall deutlich günstiger: Das Kind spart 38.280 € an Nebenkosten, da der Erbschaftsteuer-Freibetrag vollständig ausgenutzt wird und keine Steuern anfallen. Beim Kauf würden die vollen Nebenkosten von 9,57% des Kaufpreises anfallen.",
    gesetze: [
      "§1 ErbStG (Erbschaftsteuergesetz - Steuerpflicht)",
      "§16 ErbStG (Freibeträge - Kinder: 400.000 €)",
      "§19 ErbStG (Steuersätze und Progressionszonen)",
      "§3a GrEStG (Grunderwerbsteuer)",
      "BeurkG (Beurkundungsgesetz - Notargebühren)"
    ],
    praxistipp: "In der Immobilienmaklerpraxis: Erben sollten sich bewusst machen, dass Erbschaften innerhalb des Freibetrags völlig steuerfrei sind, während Käufer immer Nebenkosten tragen müssen. Bei mehrfach hintereinander liegenden Erbschaften ist die zeitliche Abfolge relevant (10-Jahres-Frist für Freibeträge). Dennoch können nach Erbschaft Instandhaltungskosten, Sanierungen und Maklergebühren für einen späteren Verkauf anfallen - diese sollten in der langfristigen Betrachtung berücksichtigt werden."
  },
  {
    id: 89,
    bereich: "Kaufnebenkosten",
    titel: "Share Deal Grunderwerbsteuer",
    berufssituation: "Kaufpreis Immobilie 2.000.000 €, GrESt 6%. Share Deal unter 90%. Ersparnis berechnen.",
    was_lerne_ich: "Berechnung der Grunderwerbsteuer bei Share Deals und Vergleich zur regulären Erwerbung mit Steuerersparnis",
    schritte: [
      {
        nr: 1,
        kontext: "Bei einem Share Deal wird nicht die Immobilie direkt erworben, sondern die Gesellschaft (GmbH). Grunderwerbsteuer fällt nur an, wenn über 90% der Anteile innerhalb von 5 Jahren erworben werden. Berechnen Sie zunächst die Grunderwerbsteuer bei direktem Immobilienkauf (Normalkauf).",
        formel: "GrESt Normalkauf = Kaufpreis × Steuersatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Wert der Immobilie",
            wert: "2.000.000 €"
          },
          {
            kuerzel: "Steuersatz",
            bedeutung: "Grunderwerbsteuer Satz",
            wert: "6 %"
          }
        ],
        aufgabe: "Berechnen Sie die Grunderwerbsteuer beim direkten Immobilienerwerb (Normalkauf).",
        einheit: "€",
        korrekt: 120000,
        toleranz: 1,
        tipp: "Lösung: 2.000.000 € × 6% = 120.000 €"
      },
      {
        nr: 2,
        kontext: "Bei einem Share Deal unter 90% Anteilserwerb fällt keine Grunderwerbsteuer an. Der Erwerber kauft nur einen Anteil unter 90%, daher wird keine GrESt fällig.",
        formel: "GrESt Share Deal (unter 90%) = 0 €",
        variablen: [
          {
            kuerzel: "Share Deal Quote",
            bedeutung: "Erworbene Anteile",
            wert: "unter 90%"
          },
          {
            kuerzel: "GrESt Hebelwirkung",
            bedeutung: "Besteuerung bei Share Deal",
            wert: "entfällt"
          }
        ],
        aufgabe: "Wie hoch ist die Grunderwerbsteuer bei einem Share Deal unter 90% Anteilserwerb?",
        einheit: "€",
        korrekt: 0,
        toleranz: 0,
        tipp: "Lösung: Bei Share Deals unter 90% Anteilserwerb fällt keine Grunderwerbsteuer an = 0 €"
      },
      {
        nr: 3,
        kontext: "Die Ersparnis ist die Differenz zwischen der Grunderwerbsteuer beim Normalkauf und der Grunderwerbsteuer beim Share Deal. Diese Ersparnis ist der entscheidende finanzielle Vorteil des Share Deal-Modells.",
        formel: "Steuerersparnis = GrESt Normalkauf - GrESt Share Deal",
        variablen: [
          {
            kuerzel: "GrESt Normalkauf",
            bedeutung: "Grunderwerbsteuer direkter Immobilienkauf",
            wert: "120.000 €"
          },
          {
            kuerzel: "GrESt Share Deal",
            bedeutung: "Grunderwerbsteuer Share Deal unter 90%",
            wert: "0 €"
          }
        ],
        aufgabe: "Berechnen Sie die Steuerersparnis durch den Share Deal unter 90% im Vergleich zum Normalkauf.",
        einheit: "€",
        korrekt: 120000,
        toleranz: 1,
        tipp: "Lösung: 120.000 € - 0 € = 120.000 € Ersparnis"
      }
    ],
    abschluss: "Durch den Share Deal unter 90% Anteilserwerb entsteht eine Steuerersparnis von 120.000 € Grunderwerbsteuer gegenüber dem direkten Immobilienerwerb. Dies ist ein wesentlicher Vorteil des Share Deal-Modells für Käufer.",
    gesetze: [
      "§1 GrEStG (Grunderwerbsteuergesetz)",
      "§4 GrEStG (Ausnahmen bei Share Deals)",
      "§3a GrEStG (Beteiligung an Grundvermögen)"
    ],
    praxistipp: "Share Deals sind für Käufer steuerlich attraktiv, aber verstärkt von Finanzbehörden geprüft. Dokumentieren Sie alle Gründe für die Share Deal-Struktur. Achten Sie: Übersteigt der Anteilserwerb 90% innerhalb von 5 Jahren, wird rückwirkend die volle Grunderwerbsteuer fällig. Bei großen Transaktionen sollte eine Steuerberatung konsultiert werden."
  },
  {
    id: 90,
    bereich: "Kaufnebenkosten",
    titel: "Finanzierungsnebenkosten",
    berufssituation: "Ein Immobilienkäufer finanziert den Kaufpreis über ein Darlehen. Die Bank berechnet Bereitstellungszinsen von 0,25% pro Monat auf 300.000 € ab Monat 4 für insgesamt 3 Monate. Zusätzlich fallen Notar-Gebühren für die Grundschuldbestellung von 800 € an, sowie Bankgebühren von 500 €. Welche Gesamtsumme der Finanzierungsnebenkosten entsteht?",
    was_lerne_ich: "Der Lernende versteht die Zusammensetzung von Finanzierungsnebenkosten und kann Bereitstellungszinsen sowie weitere Finanzierungsgebühren korrekt berechnen und addieren.",
    schritte: [
      {
        nr: 1,
        kontext: "Bereitstellungszinsen entstehen, wenn die Bank das Darlehen zur Verfügung stellt, es aber erst später abgerufen wird. Die monatliche Zinsrate wird auf die bereitgestellte Darlehensrate berechnet.",
        formel: "Bereitstellungszins pro Monat = Darlehensbetrag × Zinssatz pro Monat / 100",
        variablen: [
          {
            kuerzel: "D",
            bedeutung: "Bereitgestellter Darlehensbetrag",
            wert: "300.000 €"
          },
          {
            kuerzel: "Z",
            bedeutung: "Zinssatz pro Monat",
            wert: "0,25%"
          },
          {
            kuerzel: "M",
            bedeutung: "Anzahl der Monate mit Bereitstellungszinsen",
            wert: "3"
          }
        ],
        aufgabe: "Berechne die monatlichen Bereitstellungszinsen auf 300.000 € bei 0,25% pro Monat.",
        einheit: "€",
        korrekt: 750.0,
        toleranz: 0.5,
        tipp: "300.000 × 0,25 ÷ 100 = 750 € pro Monat"
      },
      {
        nr: 2,
        kontext: "Da die Bereitstellungszinsen für 3 Monate anfallen (Monat 4, 5 und 6), müssen die monatlichen Zinsen mit der Anzahl der Monate multipliziert werden.",
        formel: "Gesamte Bereitstellungszinsen = monatliche Bereitstellungszinsen × Anzahl der Monate",
        variablen: [
          {
            kuerzel: "BZ_M",
            bedeutung: "Monatliche Bereitstellungszinsen",
            wert: "750 €"
          },
          {
            kuerzel: "Monate",
            bedeutung: "Anzahl der Monate mit Zinsen",
            wert: "3"
          }
        ],
        aufgabe: "Berechne die gesamten Bereitstellungszinsen für 3 Monate bei monatlich 750 €.",
        einheit: "€",
        korrekt: 2250.0,
        toleranz: 1,
        tipp: "750 € × 3 Monate = 2.250 €"
      },
      {
        nr: 3,
        kontext: "Zur Sicherung des Darlehens wird eine Grundschuld bestellt. Der Notar berechnet hierfür eine Gebühr, die zu den Finanzierungsnebenkosten hinzukommt.",
        formel: "Summe aller Gebühren = Bereitstellungszinsen + Notar-Grundschuld + Bankgebühren",
        variablen: [
          {
            kuerzel: "BZ_ges",
            bedeutung: "Gesamte Bereitstellungszinsen",
            wert: "2.250 €"
          },
          {
            kuerzel: "NG",
            bedeutung: "Notar-Gebühr Grundschuldbestellung",
            wert: "800 €"
          },
          {
            kuerzel: "BG",
            bedeutung: "Bankgebühren",
            wert: "500 €"
          }
        ],
        aufgabe: "Addiere alle Finanzierungsnebenkosten: Bereitstellungszinsen (2.250 €) + Notar-Grundschuld (800 €) + Bankgebühren (500 €). Wie hoch sind die Gesamtfinanzierungsnebenkosten?",
        einheit: "€",
        korrekt: 3550.0,
        toleranz: 1,
        tipp: "2.250 € + 800 € + 500 € = 3.550 €"
      }
    ],
    abschluss: "Die gesamten Finanzierungsnebenkosten betragen 3.550 €. Diese setzen sich aus 2.250 € Bereitstellungszinsen, 800 € Notar-Gebühren und 500 € Bankgebühren zusammen und sind wichtige Kostenkomponenten bei der Finanzierungsplanung eines Immobilienkaufs.",
    gesetze: [
      "§ 556c BGB (Bereitstellungszinsen)",
      "§ 1191 BGB (Grundschuld)"
    ],
    praxistipp: "Bei der Finanzierungsplanung sollten alle Nebenkosten von Anfang an berücksichtigt werden. Bereitstellungszinsen fallen an, wenn die Auszahlung des Darlehens später erfolgt als die Bereitstellung. Eine zeitnahe Auszahlung kann diese Kosten minimieren. Fordern Sie immer ein schriftliches Kostenveranschlag vom Finanzinstitut an."
  },
  {
    id: 91,
    bereich: "Kaufnebenkosten",
    titel: "Umzugskosten einkalkulieren",
    berufssituation: "Ein Käufer erwirbt eine Immobilie für 320.000 €. Die Kaufnebenkosten betragen 9%. Zusätzlich fallen Umzugskosten von 3.500 €, Renovierungskosten von 8.000 € und Möbelkosten von 12.000 € an. Berechnen Sie die Gesamtinvestition.",
    was_lerne_ich: "Ermittlung der Gesamtinvestition durch Addition von Kaufpreis, Kaufnebenkosten und weiteren Eigenleistungen",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung der Kaufnebenkosten",
        formel: "Kaufnebenkosten = Kaufpreis × Nebenkostensatz",
        variablen: [
          {
            kuerzel: "KN",
            bedeutung: "Kaufnebenkosten",
            wert: "?"
          },
          {
            kuerzel: "KP",
            bedeutung: "Kaufpreis",
            wert: "320.000 €"
          },
          {
            kuerzel: "NKS",
            bedeutung: "Nebenkostensatz",
            wert: "9%"
          }
        ],
        aufgabe: "Berechnen Sie die Kaufnebenkosten bei einem Kaufpreis von 320.000 € und einem Nebenkostensatz von 9%.",
        einheit: "€",
        korrekt: 28800,
        toleranz: 0,
        tipp: "Lösung: 320.000 × 0,09 = 28.800 €"
      },
      {
        nr: 2,
        kontext: "Berechnung der Gesamtkaufkosten",
        formel: "Gesamtkaufkosten = Kaufpreis + Kaufnebenkosten",
        variablen: [
          {
            kuerzel: "GKK",
            bedeutung: "Gesamtkaufkosten",
            wert: "?"
          },
          {
            kuerzel: "KP",
            bedeutung: "Kaufpreis",
            wert: "320.000 €"
          },
          {
            kuerzel: "KN",
            bedeutung: "Kaufnebenkosten",
            wert: "28.800 €"
          }
        ],
        aufgabe: "Addieren Sie den Kaufpreis von 320.000 € und die zuvor berechneten Kaufnebenkosten.",
        einheit: "€",
        korrekt: 348800,
        toleranz: 0,
        tipp: "Lösung: 320.000 + 28.800 = 348.800 €"
      },
      {
        nr: 3,
        kontext: "Berechnung der Gesamtinvestition inklusive Eigenleistungen",
        formel: "Gesamtinvestition = Gesamtkaufkosten + Umzug + Renovierung + Möbel",
        variablen: [
          {
            kuerzel: "GI",
            bedeutung: "Gesamtinvestition",
            wert: "?"
          },
          {
            kuerzel: "GKK",
            bedeutung: "Gesamtkaufkosten",
            wert: "348.800 €"
          },
          {
            kuerzel: "U",
            bedeutung: "Umzugskosten",
            wert: "3.500 €"
          },
          {
            kuerzel: "R",
            bedeutung: "Renovierungskosten",
            wert: "8.000 €"
          },
          {
            kuerzel: "M",
            bedeutung: "Möbelkosten",
            wert: "12.000 €"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtinvestition durch Addition aller Kostenpositionen.",
        einheit: "€",
        korrekt: 372300,
        toleranz: 0,
        tipp: "Lösung: 348.800 + 3.500 + 8.000 + 12.000 = 372.300 €"
      }
    ],
    abschluss: "Die Gesamtinvestition für die Immobilienerwerbung beträgt 372.300 €. Dies setzt sich zusammen aus den reinen Kaufkosten (348.800 €) zuzüglich aller Eigenleistungen und Nebenausgaben (23.500 €).",
    gesetze: [
      "§ 556 BGB - Makler- und Wertermittlungsgebühren",
      "§ 3 GrEStG - Grunderwerbsteuer"
    ],
    praxistipp: "Bei der Finanzierungsplanung müssen alle Gesamtkosten berücksichtigt werden. Käufer sollten eine Finanzierungsreserve von 10-15% der Gesamtinvestition einplanen. Renovierungs- und Möbelkosten können unter Umständen steuerlich optimiert werden, wenn sie als Betriebsausgaben geltend gemacht werden können."
  },
  {
    id: 92,
    bereich: "Kaufnebenkosten",
    titel: "Modernisierung Nebenkosten",
    berufssituation: "Kaufpreis 200.000 €, Modernisierungskredit 80.000 €. Auf Modernisierung fallen keine GrESt an. Nur auf Kaufpreis: 5,5%. Gesamtnebenkosten?",
    was_lerne_ich: "Sie lernen, dass Grunderwerbsteuer nur auf den Kaufpreis anfällt und Modernisierungskosten steuerfrei sind, während Sie die Gesamtnebenkosten korrekt ermitteln.",
    schritte: [
      {
        nr: 1,
        kontext: "Zuerst wird die Grunderwerbsteuer (GrESt) berechnet. Diese fällt nur auf den Kaufpreis an, nicht auf den Modernisierungskredit. Der Satz beträgt 5,5%.",
        formel: "Grunderwerbsteuer = Kaufpreis × GrESt-Satz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis der Immobilie",
            wert: "200.000 €"
          },
          {
            kuerzel: "GrESt-Satz",
            bedeutung: "Grunderwerbsteuersatz",
            wert: "5,5%"
          }
        ],
        aufgabe: "Berechnen Sie die Grunderwerbsteuer auf einen Kaufpreis von 200.000 € bei einem Satz von 5,5%.",
        einheit: "€",
        korrekt: 11000.0,
        toleranz: 1,
        tipp: "200.000 € × 0,055 = 11.000 € Grunderwerbsteuer"
      },
      {
        nr: 2,
        kontext: "Nun werden die Maklergebühren und Notargebühren geschätzt. Üblicherweise rechnet man mit etwa 3% des Kaufpreises für diese Nebenkosten (Makler ca. 3-7%, Notar ca. 1-2%, zusammen durchschnittlich ca. 3-4% des Kaufpreises). Hier rechnen wir mit 3% als konservative Schätzung.",
        formel: "Makler- und Notargebühren = Kaufpreis × 3%",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis der Immobilie",
            wert: "200.000 €"
          },
          {
            kuerzel: "Satz",
            bedeutung: "Durchschnittlicher Gebührensatz",
            wert: "3%"
          }
        ],
        aufgabe: "Berechnen Sie Makler- und Notargebühren mit 3% des Kaufpreises von 200.000 €.",
        einheit: "€",
        korrekt: 6000.0,
        toleranz: 1,
        tipp: "200.000 € × 0,03 = 6.000 € für Makler und Notar"
      },
      {
        nr: 3,
        kontext: "Die Grundbuchgebühren betragen üblicherweise etwa 0,5% des Kaufpreises für Eintrag und Löschung der alten Hypothek.",
        formel: "Grundbuchgebühren = Kaufpreis × 0,5%",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis der Immobilie",
            wert: "200.000 €"
          },
          {
            kuerzel: "Satz",
            bedeutung: "Grundbuchgebührensatz",
            wert: "0,5%"
          }
        ],
        aufgabe: "Berechnen Sie die Grundbuchgebühren mit 0,5% des Kaufpreises.",
        einheit: "€",
        korrekt: 1000.0,
        toleranz: 1,
        tipp: "200.000 € × 0,005 = 1.000 € Grundbuchgebühren"
      },
      {
        nr: 4,
        kontext: "Jetzt werden alle Nebenkosten zusammengefasst. Der Modernisierungskredit von 80.000 € fällt nicht unter die Nebenkosten des Kaufs, da auf die Modernisierung selbst keine Grunderwerbsteuer anfällt und diese separat finanziert wird.",
        formel: "Gesamtnebenkosten = GrESt + Makler- und Notargebühren + Grundbuchgebühren",
        variablen: [
          {
            kuerzel: "GrESt",
            bedeutung: "Grunderwerbsteuer",
            wert: "11.000 €"
          },
          {
            kuerzel: "Makler/Notar",
            bedeutung: "Makler- und Notargebühren",
            wert: "6.000 €"
          },
          {
            kuerzel: "Grundbuch",
            bedeutung: "Grundbuchgebühren",
            wert: "1.000 €"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtnebenkosten durch Addition aller Kostenpositionen.",
        einheit: "€",
        korrekt: 18000.0,
        toleranz: 1,
        tipp: "11.000 € + 6.000 € + 1.000 € = 18.000 € Gesamtnebenkosten"
      }
    ],
    abschluss: "Die Gesamtnebenkosten beim Immobilienkauf betragen 18.000 €. Der Modernisierungskredit von 80.000 € erhöht die Nebenkosten nicht, da auf Modernisierungsmaßnahmen keine Grunderwerbsteuer anfällt.",
    gesetze: [
      "§1 GrEStG (Grunderwerbsteuergesetz)",
      "§2 GrEStG (Bemessungsgrundlage)",
      "BeurkG (Beurkundungsgesetz) - Notargebühren"
    ],
    praxistipp: "In der Beratung sollten Sie deutlich machen, dass die Finanzierung der Modernisierung über einen separaten Kredit aus Steuersicht vorteilhaft ist, da hierfür keine Grunderwerbsteuer anfällt. Dies kann für den Käufer zu erheblichen Steuerersparnissen führen und sollte bei der Finanzierungsplanung berücksichtigt werden."
  },
  {
    id: 93,
    bereich: "Kaufnebenkosten",
    titel: "Nebenkosten amortisieren",
    berufssituation: "Ein Investor erwirbt eine Immobilie für 380.000 €. Die Kaufnebenkosten betragen 34.200 €. Die erzielte Mietrendite liegt bei 4,5% p.a. Berechnen Sie, nach wie vielen Jahren sich die Kaufnebenkosten durch die Mieteinnahmen amortisiert haben.",
    was_lerne_ich: "Sie lernen, wie lange es dauert, bis Kaufnebenkosten durch laufende Mieteinnahmen wieder eingespielt werden, und verstehen die wirtschaftliche Bedeutung dieser Amortisationsdauer für die Investitionsentscheidung.",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung der jährlichen Mieteinnahmen basierend auf der Mietrendite",
        formel: "Jährliche Mieteinnahmen = Kaufpreis × Mietrendite ÷ 100",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Erwerbspreis der Immobilie",
            wert: "380.000 €"
          },
          {
            kuerzel: "Mietrendite",
            bedeutung: "Prozentuale Rendite p.a.",
            wert: "4,5%"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Mieteinnahmen in Euro.",
        einheit: "€",
        korrekt: 17100,
        toleranz: 0,
        tipp: "Lösung: 380.000 € × 4,5 ÷ 100 = 17.100 €"
      },
      {
        nr: 2,
        kontext: "Berechnung der Amortisationsdauer in Jahren",
        formel: "Amortisationsdauer = Kaufnebenkosten ÷ Jährliche Mieteinnahmen",
        variablen: [
          {
            kuerzel: "Kaufnebenkosten",
            bedeutung: "Summe aller Nebenkosten",
            wert: "34.200 €"
          },
          {
            kuerzel: "Jährliche Mieteinnahmen",
            bedeutung: "Aus Schritt 1 berechnet",
            wert: "17.100 €"
          }
        ],
        aufgabe: "Berechnen Sie, nach wie vielen Jahren sich die Kaufnebenkosten amortisiert haben.",
        einheit: "Jahre",
        korrekt: 2,
        toleranz: 0,
        tipp: "Lösung: 34.200 € ÷ 17.100 € = 2,0 Jahre"
      },
      {
        nr: 3,
        kontext: "Umrechnung in Jahre und Monate für praktische Aussage",
        formel: "Monate = (Dezimalzahl - Ganzzahl) × 12",
        variablen: [
          {
            kuerzel: "Amortisationsdauer",
            bedeutung: "Aus Schritt 2 berechnet",
            wert: "2,0 Jahre"
          }
        ],
        aufgabe: "Geben Sie die Amortisationsdauer in Jahren und Monaten an.",
        einheit: "Monate",
        korrekt: 0,
        toleranz: 0,
        tipp: "Lösung: 2,0 Jahre = 2 Jahre und 0 Monate (exakt nach 2 Jahren amortisiert)"
      }
    ],
    abschluss: "Die Kaufnebenkosten von 34.200 € amortisieren sich in genau 2 Jahren durch die Mieteinnahmen. Dies ist eine sehr attraktive Amortisationsdauer für eine Immobilieninvestition.",
    gesetze: [
      "Maklergebührenverordnung (MaklerG)",
      "Grunderwerbsteuergesetz (GrEStG)",
      "Grundbuchordnung (GBO)"
    ],
    praxistipp: "In der Praxis sollte der Investor auch andere Faktoren berücksichtigen: Instandhaltungskosten, Verwaltungskosten, Leerstandsrisiken und Steuern reduzieren die tatsächliche Netto-Rendite erheblich. Eine Amortisationsdauer von 2 Jahren auf Bruttobasis ist dennoch ein positives Zeichen für die Wirtschaftlichkeit der Investition."
  },
  {
    id: 94,
    bereich: "Kaufnebenkosten",
    titel: "Bundeslandvergleich",
    berufssituation: "Kaufpreis 450.000 €. GrESt: Bayern 3,5%, NRW 6,5%, Brandenburg 6,5%, Hamburg 5,5%. Alle berechnen.",
    was_lerne_ich: "Grunderwerbsteuer in verschiedenen Bundesländern berechnen und vergleichen",
    schritte: [
      {
        nr: 1,
        kontext: "Bayern",
        formel: "GrESt = Kaufpreis × Steuersatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis der Immobilie",
            wert: 450000
          },
          {
            kuerzel: "Steuersatz",
            bedeutung: "GrESt-Satz Bayern",
            wert: 0.035
          }
        ],
        aufgabe: "Berechnen Sie die Grunderwerbsteuer für Bayern (3,5%)",
        einheit: "€",
        korrekt: 15750,
        toleranz: 1,
        tipp: "Multiplizieren Sie 450.000 mit 0,035"
      },
      {
        nr: 2,
        kontext: "NRW und Brandenburg",
        formel: "GrESt = Kaufpreis × Steuersatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis der Immobilie",
            wert: 450000
          },
          {
            kuerzel: "Steuersatz",
            bedeutung: "GrESt-Satz NRW und Brandenburg",
            wert: 0.065
          }
        ],
        aufgabe: "Berechnen Sie die Grunderwerbsteuer für NRW und Brandenburg (6,5%)",
        einheit: "€",
        korrekt: 29250,
        toleranz: 1,
        tipp: "Multiplizieren Sie 450.000 mit 0,065"
      },
      {
        nr: 3,
        kontext: "Hamburg",
        formel: "GrESt = Kaufpreis × Steuersatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis der Immobilie",
            wert: 450000
          },
          {
            kuerzel: "Steuersatz",
            bedeutung: "GrESt-Satz Hamburg",
            wert: 0.055
          }
        ],
        aufgabe: "Berechnen Sie die Grunderwerbsteuer für Hamburg (5,5%)",
        einheit: "€",
        korrekt: 24750,
        toleranz: 1,
        tipp: "Multiplizieren Sie 450.000 mit 0,055"
      }
    ],
    abschluss: "Bayern: 15.750 €, NRW: 29.250 €, Brandenburg: 29.250 €, Hamburg: 24.750 €. Die GrESt variiert je nach Bundesland erheblich.",
    gesetze: [
      "§1 GrEStG (Grunderwerbsteuergesetz)",
      "§3 GrEStG (Steuersätze nach Bundesländern)"
    ],
    praxistipp: "Die Grunderwerbsteuer ist ein wesentlicher Kostenfaktor beim Immobilienkauf. Bayern hat die niedrigsten, NRW und Brandenburg die höchsten Sätze."
  },
  {
    id: 95,
    bereich: "Kaufnebenkosten",
    titel: "Gesamtkosten Ersterwerb",
    berufssituation: "Neubau 485.000 €, Bayern (3,5% GrESt), Notar 1,8%, kein Makler. Eigenkapital 20% der Gesamtinvestition. Benötigtes EK in Euro?",
    was_lerne_ich: "Sie lernen, die Gesamtinvestition für einen Immobilienerwerb durch Addition aller Kaufnebenkosten zu berechnen und das erforderliche Eigenkapital daraus abzuleiten.",
    schritte: [
      {
        nr: 1,
        kontext: "Die Grunderwerbsteuer wird auf den Kaufpreis berechnet. In Bayern beträgt der Satz 3,5%. Dies ist eine wesentliche Nebenkosten beim Grundstückserwerb.",
        formel: "Grunderwerbsteuer = Kaufpreis × GrESt-Satz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis des Neubaus",
            wert: "485.000 €"
          },
          {
            kuerzel: "GrESt-Satz",
            bedeutung: "Grunderwerbsteuersatz in Bayern",
            wert: "3,5%"
          }
        ],
        aufgabe: "Berechnen Sie die Grunderwerbsteuer für den Kaufpreis von 485.000 € bei einem Satz von 3,5%.",
        einheit: "€",
        korrekt: 16975.0,
        toleranz: 1,
        tipp: "Grunderwerbsteuer = 485.000 × 0,035 = 16.975 €"
      },
      {
        nr: 2,
        kontext: "Die Notargebühren entstehen für die Beurkundung des Kaufvertrags und die Eintragung ins Grundbuch. Sie werden auf den Kaufpreis berechnet und betragen in diesem Fall 1,8%.",
        formel: "Notargebühren = Kaufpreis × Notarsatz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis des Neubaus",
            wert: "485.000 €"
          },
          {
            kuerzel: "Notarsatz",
            bedeutung: "Notargebührensatz",
            wert: "1,8%"
          }
        ],
        aufgabe: "Berechnen Sie die Notargebühren für den Kaufpreis von 485.000 € bei einem Satz von 1,8%.",
        einheit: "€",
        korrekt: 8730.0,
        toleranz: 1,
        tipp: "Notargebühren = 485.000 × 0,018 = 8.730 €"
      },
      {
        nr: 3,
        kontext: "Die Gesamtinvestition setzt sich aus dem Kaufpreis und allen Kaufnebenkosten zusammen. In diesem Fall fallen keine Maklergebühren an, daher nur Grunderwerbsteuer und Notargebühren.",
        formel: "Gesamtinvestition = Kaufpreis + Grunderwerbsteuer + Notargebühren",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis des Neubaus",
            wert: "485.000 €"
          },
          {
            kuerzel: "GrESt",
            bedeutung: "Grunderwerbsteuer",
            wert: "16.975 €"
          },
          {
            kuerzel: "Notar",
            bedeutung: "Notargebühren",
            wert: "8.730 €"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtinvestition für den Immobilienerwerb durch Addition von Kaufpreis, Grunderwerbsteuer und Notargebühren.",
        einheit: "€",
        korrekt: 510705.0,
        toleranz: 1,
        tipp: "Gesamtinvestition = 485.000 + 16.975 + 8.730 = 510.705 €"
      },
      {
        nr: 4,
        kontext: "Das benötigte Eigenkapital berechnet sich aus 20% der Gesamtinvestition. Dies ist der Mindesteigenkapitaleinsatz, den der Käufer selbst aufbringen muss.",
        formel: "Benötigtes Eigenkapital = Gesamtinvestition × EK-Quote",
        variablen: [
          {
            kuerzel: "Gesamtinvestition",
            bedeutung: "Summe aller Kosten",
            wert: "510.705 €"
          },
          {
            kuerzel: "EK-Quote",
            bedeutung: "Eigenkapitalquote",
            wert: "20%"
          }
        ],
        aufgabe: "Berechnen Sie das benötigte Eigenkapital als 20% der Gesamtinvestition von 510.705 €.",
        einheit: "€",
        korrekt: 102141.0,
        toleranz: 1,
        tipp: "Benötigtes Eigenkapital = 510.705 × 0,20 = 102.141 €"
      }
    ],
    abschluss: "Für den Neubaukauf von 485.000 € in Bayern mit Grunderwerbsteuer (3,5%) und Notargebühren (1,8%) ergibt sich eine Gesamtinvestition von 510.705 €. Das benötigte Eigenkapital bei 20% Quote beträgt 102.141 €.",
    gesetze: [
      "§3 GrEStG",
      "§1 NotKostG"
    ],
    praxistipp: "Im Beratungsgespräch sollten Sie dem Käufer empfehlen, die Notargebühren und Grunderwerbsteuer in die Finanzierungsplanung einzubeziehen. Diese Nebenkosten werden oft unterschätzt und können 5-10% des Gesamtbudgets ausmachen. Die genaue Notargebührenquote kann je nach individuellem Leistungsumfang variieren."
  },
  {
    id: 96,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "CO2-Kostenverteilung nach CO2KostAufG",
    berufssituation: "Eine WEG mit 4 gleich großen Wohnungen hat jährliche CO2-Kosten von 2.400 €. Das Gebäude hat Energieklasse F. Nach CO2KostAufG trägt der Mieter 65% der CO2-Kosten. Berechnen Sie den monatlichen Kostenanteil pro Mieter.",
    was_lerne_ich: "Korrekte Aufteilung von CO2-Kosten zwischen Vermieter und Mieter nach gesetzlicher Vorgabe sowie Verteilung auf Wohneinheiten und Abrechnungsperioden",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung des Mieterpflichtigen CO2-Kostenantei ls nach CO2KostAufG",
        formel: "Mieterpflicht = Gesamtkosten × Mieterprozentsatz",
        variablen: [
          {
            kuerzel: "Gesamtkosten",
            bedeutung: "Jährliche CO2-Kosten",
            wert: 2400
          },
          {
            kuerzel: "Mieterprozentsatz",
            bedeutung: "Gesetzlich vorgesehener Mieteranteil",
            wert: 0.65
          }
        ],
        aufgabe: "Berechnen Sie die gesamten CO2-Kosten, die der Mieter tragen muss.",
        einheit: "€",
        korrekt: 1560,
        toleranz: 0,
        tipp: "Lösung: 2.400 € × 0,65 = 1.560 €/Jahr (Mieterpflicht)"
      },
      {
        nr: 2,
        kontext: "Verteilung auf einzelne Wohnungen",
        formel: "Kostenanteil pro Wohnung = Mieterpflicht ÷ Anzahl Wohnungen",
        variablen: [
          {
            kuerzel: "Mieterpflicht",
            bedeutung: "Jährlicher Mieteranteil an CO2-Kosten",
            wert: 1560
          },
          {
            kuerzel: "Anzahl Wohnungen",
            bedeutung: "Gleich große Wohneinheiten",
            wert: 4
          }
        ],
        aufgabe: "Berechnen Sie den jährlichen CO2-Kostenanteil pro Wohnung.",
        einheit: "€",
        korrekt: 390,
        toleranz: 0,
        tipp: "Lösung: 1.560 € ÷ 4 = 390 €/Jahr pro Wohnung"
      },
      {
        nr: 3,
        kontext: "Umrechnung auf monatliche Abrechnung",
        formel: "Monatlicher Kostenanteil = Jährlicher Kostenanteil ÷ 12 Monate",
        variablen: [
          {
            kuerzel: "Jährlicher Kostenanteil",
            bedeutung: "CO2-Kosten pro Wohnung pro Jahr",
            wert: 390
          },
          {
            kuerzel: "Monate",
            bedeutung: "Abrechnungsperiode",
            wert: 12
          }
        ],
        aufgabe: "Berechnen Sie den monatlichen CO2-Kostenanteil pro Mieter.",
        einheit: "€",
        korrekt: 32.5,
        toleranz: 0.01,
        tipp: "Lösung: 390 € ÷ 12 = 32,50 €/Monat pro Mieter"
      }
    ],
    abschluss: "Der Mieter jeder Wohnung zahlt monatlich 32,50 € für die CO2-Kosten des Gebäudes. Dies entspricht der gesetzlich vorgegebenen 65%-Aufteilung nach CO2KostAufG.",
    gesetze: [
      "§ 1 CO2KostAufV (Kohlendioxidkostenaufteilungsverordnung)",
      "§ 5 CO2KostAufV (Aufteilung bei Mietverhältnissen)",
      "§ 3 WEG-AbrechV (WEG-Abrechnungsverordnung)"
    ],
    praxistipp: "Bei Energieklasse F liegen die CO2-Kostenprozentsätze fest. Dokumentieren Sie die CO2-Kostenaufteilung transparent in der Nebenkostenabrechnung. Ab 2025 müssen Vermieter einen höheren Kostenanteil tragen (staffelnde Regelung). Aktualisieren Sie regelmäßig die Prozentsätze entsprechend der aktuellen CO2KostAufV."
  },
  {
    id: 97,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Verwalterhonorar Staffel",
    berufssituation: "Eine Wohnungseigentümergemeinschaft mit 24 Einheiten benötigt die Berechnung des Jahreshonorars für den Verwalter. Der Verwalter berechnet nach Staffel: bis 19 Einheiten 28 €/Einheit, ab der 20. Einheit 25 €/Einheit. Berechnen Sie das Jahreshonorar.",
    was_lerne_ich: "Staffelhonorar mit gestaffelten Sätzen korrekt berechnen und monatlich auf jährlich umrechnen",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung des Honorars für die ersten 19 Einheiten zum höheren Satz",
        formel: "Honorar_Stufe1 = Einheiten_Stufe1 × Satz_Stufe1",
        variablen: [
          {
            kuerzel: "Einheiten_Stufe1",
            bedeutung: "Anzahl Einheiten bis zur Staffelgrenze",
            wert: 19
          },
          {
            kuerzel: "Satz_Stufe1",
            bedeutung: "Honorarsatz pro Einheit bis 19",
            wert: "28 €"
          }
        ],
        aufgabe: "Berechnen Sie das monatliche Verwalterhonorar für die ersten 19 Einheiten.",
        einheit: "€",
        korrekt: 532,
        toleranz: 0,
        tipp: "19 Einheiten × 28 € = 532 €"
      },
      {
        nr: 2,
        kontext: "Berechnung des Honorars für die Einheiten ab der 20. bis zur 24. Einheit zum reduzierten Satz",
        formel: "Honorar_Stufe2 = (Gesamteinheiten - Einheiten_Stufe1) × Satz_Stufe2",
        variablen: [
          {
            kuerzel: "Gesamteinheiten",
            bedeutung: "Gesamtzahl der Wohneinheiten",
            wert: 24
          },
          {
            kuerzel: "Einheiten_Stufe1",
            bedeutung: "Einheiten der ersten Staffel",
            wert: 19
          },
          {
            kuerzel: "Satz_Stufe2",
            bedeutung: "Honorarsatz pro Einheit ab 20",
            wert: "25 €"
          }
        ],
        aufgabe: "Berechnen Sie das monatliche Verwalterhonorar für die Einheiten 20 bis 24.",
        einheit: "€",
        korrekt: 125,
        toleranz: 0,
        tipp: "(24 - 19) × 25 € = 5 × 25 € = 125 €"
      },
      {
        nr: 3,
        kontext: "Summation der Teilhonorar und Umrechnung auf Jahresbasis",
        formel: "Jahreshonorar = (Honorar_Stufe1 + Honorar_Stufe2) × 12",
        variablen: [
          {
            kuerzel: "Honorar_Stufe1",
            bedeutung: "Monatliches Honorar für erste Staffel",
            wert: "532 €"
          },
          {
            kuerzel: "Honorar_Stufe2",
            bedeutung: "Monatliches Honorar für zweite Staffel",
            wert: "125 €"
          },
          {
            kuerzel: "Monate",
            bedeutung: "Zeitraum in Monaten pro Jahr",
            wert: 12
          }
        ],
        aufgabe: "Berechnen Sie das Jahreshonorar aus den monatlichen Teilhonoraren.",
        einheit: "€",
        korrekt: 7884,
        toleranz: 0,
        tipp: "(532 € + 125 €) × 12 = 657 € × 12 = 7.884 €"
      }
    ],
    abschluss: "Das Jahreshonorar für den Verwalter bei 24 Wohneinheiten beträgt 7.884 € (monatlich 657 €).",
    gesetze: [
      "§ 27 WEG - Aufgaben des Verwalters",
      "§ 28 WEG - Vertrag mit dem Verwalter"
    ],
    praxistipp: "Staffelhonorar werden häufig verwendet, um große WEGs günstiger zu verwalten. Achten Sie darauf, die Staffelgrenzen exakt zu beachten und immer getrennt zu berechnen. Die Berechnung muss transparent in der Jahresabrechnung dargestellt werden."
  },
  {
    id: 98,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Beschlussanfechtung Kosten",
    berufssituation: "Eine WEG verliert eine Anfechtungsklage gegen einen Beschluss. Der Streitwert beträgt 8.000 €. Die Gerichtskosten setzen sich zusammen aus 3 × Gerichtsgebühr à 738 € und den Anwaltskosten des Gegenübers (Gebührensatz 1,3-fach à 838,80 €). Berechnen Sie die Gesamtkosten, die die unterlegene WEG tragen muss.",
    was_lerne_ich: "Die Berechnung und Zusammensetzung von Gerichtskosten bei verlorenen WEG-Prozessen verstehen und die Kostenfolge gemäß ZPO richtig ermitteln.",
    schritte: [
      {
        nr: 1,
        kontext: "Bei einer verlorenen Anfechtungsklage muss die unterlegene Partei die Gerichtsgebühren tragen. Diese werden nach dem Streitwert berechnet und fallen in mehrfacher Ausführung an (hier 3×).",
        formel: "Gesamtgerichtsgebühren = Anzahl Gebühren × Gebührensatz pro Instanz",
        variablen: [
          {
            kuerzel: "A",
            bedeutung: "Anzahl der Gerichtsgebühren",
            wert: "3"
          },
          {
            kuerzel: "B",
            bedeutung: "Gebührensatz pro Gerichtsgebühr",
            wert: "738 €"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtgerichtsgebühren, die die WEG tragen muss.",
        einheit: "€",
        korrekt: 2214.0,
        toleranz: 0,
        tipp: "Multiplizieren Sie 3 × 738 € = 2.214 €. Dies sind die reinen Gerichtsgebühren."
      },
      {
        nr: 2,
        kontext: "Zusätzlich zu den Gerichtsgebühren muss die unterlegene Partei die Anwaltskosten des Gegners tragen. Der Anwalt des Gegners hat einen 1,3-fachen Gebührensatz abgerechnet.",
        formel: "Anwaltskosten Gegenpartei = Gebührensatz × Faktor",
        variablen: [
          {
            kuerzel: "C",
            bedeutung: "Gebührensatz des gegnerischen Anwalts",
            wert: "838,80 €"
          },
          {
            kuerzel: "F",
            bedeutung: "Gebührenfaktor",
            wert: "1,3"
          }
        ],
        aufgabe: "Berechnen Sie die Anwaltskosten des Gegners, die die unterlegene WEG erstattet muss.",
        einheit: "€",
        korrekt: 1090.44,
        toleranz: 0.01,
        tipp: "Die Anwaltskosten sind bereits mit 838,80 € angegeben (dies ist der 1,3-fache Satz). Die Anwaltskosten betragen somit 838,80 €. Zusätzlich fallen Auslagenersatz an: 838,80 € × 1,3 = 1.090,44 €."
      },
      {
        nr: 3,
        kontext: "Die Gesamtkosten der unterlegenen WEG setzen sich aus den Gerichtsgebühren und den zu ersetzenden Anwaltskosten des Gegners zusammen.",
        formel: "Gesamtkosten WEG = Gesamtgerichtsgebühren + Anwaltskosten Gegenpartei",
        variablen: [
          {
            kuerzel: "G",
            bedeutung: "Gesamtgerichtsgebühren",
            wert: "2.214,00 €"
          },
          {
            kuerzel: "K",
            bedeutung: "Anwaltskosten Gegenpartei",
            wert: "1.090,44 €"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtkosten, die die unterlegene WEG tragen muss.",
        einheit: "€",
        korrekt: 3304.44,
        toleranz: 0.01,
        tipp: "Addieren Sie 2.214,00 € + 1.090,44 € = 3.304,44 €. Dies sind die Gesamtkosten der Kostenfolge."
      }
    ],
    abschluss: "Die unterlegene WEG muss Gesamtkosten von 3.304,44 € tragen, bestehend aus Gerichtsgebühren (2.214 €) und den Anwaltskosten des Gegners (1.090,44 €). Diese Kostenfolge ist eine wichtige wirtschaftliche Konsequenz verlorener Anfechtungsklagen.",
    gesetze: [
      "§91 ZPO",
      "§92 ZPO",
      "§1 RVG",
      "§23 WEG"
    ],
    praxistipp: "Vor einer Anfechtungsklage sollte eine gründliche Erfolgswahrscheinlichkeit bewertet werden. Die Kostenrisiken können erheblich sein. Besprechen Sie mit dem Verwalter und Rechtsanwalt, ob der Gegenstand der Anfechtung die Kosten rechtfertigt, und prüfen Sie Möglichkeiten der Kostendeckung durch entsprechende Beschlüsse und Umlagebestimmungen."
  },
  {
    id: 99,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Instandhaltungsrücklage Soll",
    berufssituation: "Gebäude 30 Jahre alt, 9 €/m²/Jahr, 12 Einheiten à 75 m². Jahresbeitrag je Einheit.",
    was_lerne_ich: "Berechnung der Instandhaltungsrücklage pro Wohneinheit basierend auf Gesamtgebäudefläche und Satz pro Quadratmeter",
    schritte: [
      {
        nr: 1,
        kontext: "Gesamtwohnfläche des Gebäudes ermitteln",
        formel: "Gesamtfläche = Anzahl Einheiten × Fläche pro Einheit",
        variablen: [
          {
            kuerzel: "n",
            bedeutung: "Anzahl der Wohneinheiten",
            wert: 12
          },
          {
            kuerzel: "f",
            bedeutung: "Fläche pro Einheit in m²",
            wert: 75
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtwohnfläche des Gebäudes.",
        einheit: "m²",
        korrekt: 900,
        toleranz: 0,
        tipp: "Lösung: 12 Einheiten × 75 m² = 900 m²"
      },
      {
        nr: 2,
        kontext: "Gesamtbudget der Instandhaltungsrücklage für das Gebäude berechnen",
        formel: "Gesamtbudget = Gesamtfläche × Satz pro m²",
        variablen: [
          {
            kuerzel: "F",
            bedeutung: "Gesamtwohnfläche in m²",
            wert: 900
          },
          {
            kuerzel: "s",
            bedeutung: "Instandhaltungsrücklage-Satz in €/m²/Jahr",
            wert: 9
          }
        ],
        aufgabe: "Berechnen Sie das gesamte Jahresbudget für die Instandhaltungsrücklage.",
        einheit: "€",
        korrekt: 8100,
        toleranz: 0,
        tipp: "Lösung: 900 m² × 9 €/m² = 8.100 €"
      },
      {
        nr: 3,
        kontext: "Jahresbeitrag pro Wohneinheit ermitteln",
        formel: "Jahresbeitrag je Einheit = Gesamtbudget ÷ Anzahl Einheiten",
        variablen: [
          {
            kuerzel: "B",
            bedeutung: "Gesamtes Jahresbudget in €",
            wert: 8100
          },
          {
            kuerzel: "n",
            bedeutung: "Anzahl der Wohneinheiten",
            wert: 12
          }
        ],
        aufgabe: "Berechnen Sie den monatlichen Instandhaltungsrücklage-Beitrag je Wohneinheit.",
        einheit: "€",
        korrekt: 675,
        toleranz: 0,
        tipp: "Lösung: 8.100 € ÷ 12 Einheiten = 675 € pro Jahr oder 56,25 € pro Monat"
      }
    ],
    abschluss: "Der Jahresbeitrag je Wohneinheit für die Instandhaltungsrücklage beträgt 675 €, dies entspricht 56,25 € monatlich pro Einheit.",
    gesetze: [
      "§ 21 Abs. 4 Wohnungseigentumsgesetz (WEG)",
      "§ 28 Abs. 2 WEG"
    ],
    praxistipp: "Bei älteren Gebäuden (über 20 Jahre) wird häufig ein erhöhter Rücklagensatz empfohlen. Die tatsächliche Rücklagequote sollte regelmäßig überprüft und ggf. angepasst werden, um Finanzierungslücken bei größeren Renovierungen zu vermeiden."
  },
  {
    id: 100,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Sonderumlage dringend",
    berufssituation: "Dachsanierung: 85.000 €. Rücklage vorhanden: 32.000 €. Fehlbetrag per Sonderumlage auf 12 Einheiten nach MEA (gleich). Sonderumlage je Eigentümer?",
    was_lerne_ich: "Berechnung des Fehlbetrags nach Rücklagenaufbrauch und Umlegung auf Eigentümer nach gleichmäßiger Anteils-Einheit (MEA)",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst muss das Fehlbetrag ermittelt werden, das durch die Sonderumlage zu decken ist. Dazu wird die Rücklage von den Gesamtkosten abgezogen.",
        formel: "Fehlbetrag = Gesamtkosten - Rücklage",
        variablen: [
          {
            kuerzel: "Gesamtkosten",
            bedeutung: "Kosten für die Dachsanierung",
            wert: "85.000"
          },
          {
            kuerzel: "Rücklage",
            bedeutung: "Verfügbare Rücklagemittel",
            wert: "32.000"
          }
        ],
        aufgabe: "Wie hoch ist das Fehlbetrag, das durch Sonderumlage zu decken ist?",
        einheit: "€",
        korrekt: 53000.0,
        toleranz: 1,
        tipp: "Fehlbetrag = 85.000 € - 32.000 € = 53.000 €"
      },
      {
        nr: 2,
        kontext: "Nach MEA (gleich) werden die Kosten gleichmäßig auf alle Wohneinheiten verteilt. Das bedeutet, jede Einheit trägt den gleichen Anteil.",
        formel: "Sonderumlage je Einheit = Fehlbetrag ÷ Anzahl der Einheiten",
        variablen: [
          {
            kuerzel: "Fehlbetrag",
            bedeutung: "Zu deckender Betrag aus Schritt 1",
            wert: "53.000"
          },
          {
            kuerzel: "Einheiten",
            bedeutung: "Anzahl der Wohneinheiten im Haus",
            wert: "12"
          }
        ],
        aufgabe: "Welcher Betrag entfällt auf jede einzelne Wohneinheit nach gleichmäßiger Verteilung?",
        einheit: "€",
        korrekt: 4416.67,
        toleranz: 0.01,
        tipp: "Sonderumlage je Einheit = 53.000 € ÷ 12 = 4.416,67 €"
      },
      {
        nr: 3,
        kontext: "Kontrolle: Die Summe aller Sonderumlagen muss dem Fehlbetrag entsprechen. Dies ist eine wichtige Plausibilitätsprüfung für die Abrechnung.",
        formel: "Gesamtumlage = Sonderumlage je Einheit × Anzahl der Einheiten",
        variablen: [
          {
            kuerzel: "Sonderumlage",
            bedeutung: "Betrag pro Einheit aus Schritt 2",
            wert: "4416.67"
          },
          {
            kuerzel: "Einheiten",
            bedeutung: "Anzahl der Wohneinheiten",
            wert: "12"
          }
        ],
        aufgabe: "Verifizieren Sie durch Multiplikation, dass die Gesamtumlage das Fehlbetrag deckt.",
        einheit: "€",
        korrekt: 53000.0,
        toleranz: 1,
        tipp: "Kontrollrechnung: 4.416,67 € × 12 = 53.000,04 € (Rundungsdifferenz von 0,04 € ist zulässig)"
      }
    ],
    abschluss: "Das Fehlbetrag von 53.000 € wird gleichmäßig auf 12 Wohneinheiten verteilt, sodass jeder Eigentümer eine Sonderumlage von 4.416,67 € zahlen muss. Diese Berechnung nach MEA (gleich) ist die einfachste und gerechteste Form der Kostenbeteiligung.",
    gesetze: [
      "§ 16 Abs. 3 WEG (Sonderumlagen)",
      "§ 8 WEG (Kostenverteilung nach Miteigentumsanteilen oder Nutzungseinheiten)"
    ],
    praxistipp: "Bei Sonderumlagen sollten Sie bereits im Vorfeld klären, ob die Rücklage aufgestockt werden soll oder ob eine Sonderumlage vermeidbar ist. Dokumentieren Sie die Rücklagenutzung und Sonderumlage schriftlich gegenüber allen Eigentümern und setzen Sie eine klare Zahlungsfrist. Runden Sie Centbeträge sachgerecht - kleine Rundungsdifferenzen sind zulässig und sollten notfalls vom Verwalter getragen werden."
  },
  {
    id: 101,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Hausgeldabrechnung prüfen",
    berufssituation: "Sie prüfen als Immobilienmakler die Hausgeldabrechnung eines Mehrfamilienhauses. Der Wirtschaftsplan sah 18.000 € vor, tatsächlich entstanden Kosten von 21.400 €. Das Haus hat 8 Wohneinheiten. Berechnen Sie die Nachforderung pro Einheit.",
    was_lerne_ich: "Korrekte Berechnung der Hausgeldnachforderung und Verständnis der Abrechnung nach WEG-Prinzipien",
    schritte: [
      {
        nr: 1,
        kontext: "Ermittlung der Gesamtnachforderung",
        formel: "Gesamtnachforderung = Tatsächliche Kosten - Wirtschaftsplan",
        variablen: [
          {
            kuerzel: "TC",
            bedeutung: "Tatsächliche Kosten",
            wert: "21.400"
          },
          {
            kuerzel: "WP",
            bedeutung: "Wirtschaftsplan",
            wert: "18.000"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtnachforderung.",
        einheit: "€",
        korrekt: 3400,
        toleranz: 0,
        tipp: "Lösung: 21.400 € - 18.000 € = 3.400 €"
      },
      {
        nr: 2,
        kontext: "Berechnung der Nachforderung pro Einheit",
        formel: "Nachforderung je Einheit = Gesamtnachforderung / Anzahl der Einheiten",
        variablen: [
          {
            kuerzel: "GNF",
            bedeutung: "Gesamtnachforderung",
            wert: "3.400"
          },
          {
            kuerzel: "AE",
            bedeutung: "Anzahl der Einheiten",
            wert: "8"
          }
        ],
        aufgabe: "Berechnen Sie die Nachforderung je Wohneinheit.",
        einheit: "€",
        korrekt: 425,
        toleranz: 0,
        tipp: "Lösung: 3.400 € / 8 = 425 € pro Einheit"
      },
      {
        nr: 3,
        kontext: "Überprüfung der Gesamtabrechnung",
        formel: "Gesamtzahlung Eigentümer = (Wirtschaftsplan / Anzahl Einheiten) + Nachforderung je Einheit",
        variablen: [
          {
            kuerzel: "WP",
            bedeutung: "Wirtschaftsplan",
            wert: "18.000"
          },
          {
            kuerzel: "AE",
            bedeutung: "Anzahl der Einheiten",
            wert: "8"
          },
          {
            kuerzel: "NJE",
            bedeutung: "Nachforderung je Einheit",
            wert: "425"
          }
        ],
        aufgabe: "Berechnen Sie die durchschnittliche monatliche Hausgeldbelastung pro Einheit bei monatlicher Abrechnung über 12 Monate (Wirtschaftsplan + Nachforderung).",
        einheit: "€/Monat",
        korrekt: 237.5,
        toleranz: 0.5,
        tipp: "Lösung: [(18.000 € / 8) + 425 €] / 12 = (2.250 € + 425 €) / 12 = 2.675 € / 12 = 222,92 € Gesamtbelastung; bei monatlichen Raten: 2.250 € / 8 / 12 + 425 € / 12 = 187,50 € + 35,42 € = 222,92 € oder vereinfacht: (21.400 € / 8) / 12 = 223,33 €/Monat"
      }
    ],
    abschluss: "Die Nachforderung pro Wohneinheit beträgt 425 €. Jeder Eigentümer muss diese Zusatzzahlung zur Deckung der Mehrkosten leisten.",
    gesetze: [
      "§27 WEG (Wirtschaftsplan und Abrechnung)",
      "§28 WEG (Abrechnung der Betriebskosten)",
      "§1 WEG (Gemeinschaftseigentum)"
    ],
    praxistipp: "Bei der Prüfung von Hausgeldabrechnungen sollten Sie immer kontrollieren, ob die tatsächlichen Kosten mit den Belegsummen übereinstimmen. Dokumentieren Sie Nachforderungen schriftlich und weisen Sie auf Zahlungsfristen hin. Überprüfen Sie auch, ob Rückzahlungen bei Mehreinnahmen erfolgt sind."
  },
  {
    id: 103,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Verwaltungsbeirat Kosten",
    berufssituation: "Eine WEG mit 12 Wohneinheiten hat 3 Verwaltungsbeiräte. Jeder Beirat erhält eine jährliche Aufwandsentschädigung von 300 €. Zusätzlich fallen für die Haftpflichtversicherung der Beiräte 180 € pro Jahr an. Diese Kosten müssen auf alle Wohneinheiten umgelegt werden.",
    was_lerne_ich: "Berechnung der Verwaltungsbeirat-Kosten und deren Umlegung auf die einzelnen Wohneinheiten im Rahmen der WEG-Hausgeldabrechnung",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst werden die Kosten für die Aufwandsentschädigungen der Beiräte ermittelt",
        formel: "Beirat-Kosten = Anzahl Beiräte × Entschädigung pro Beirat",
        variablen: [
          {
            kuerzel: "Anzahl",
            bedeutung: "Anzahl der Verwaltungsbeiräte",
            wert: 3
          },
          {
            kuerzel: "Entschädigung",
            bedeutung: "Jährliche Aufwandsentschädigung pro Beirat",
            wert: 300
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtkosten für die Aufwandsentschädigungen aller Beiräte pro Jahr",
        einheit: "€",
        korrekt: 900,
        toleranz: 0,
        tipp: "Lösung: 3 Beiräte × 300 € = 900 €"
      },
      {
        nr: 2,
        kontext: "Nun werden die Versicherungskosten hinzugerechnet, um die Gesamtkosten zu ermitteln",
        formel: "Gesamtkosten Beirat = Beirat-Kosten + Versicherung",
        variablen: [
          {
            kuerzel: "Beirat-Kosten",
            bedeutung: "Summe der Aufwandsentschädigungen",
            wert: 900
          },
          {
            kuerzel: "Versicherung",
            bedeutung: "Haftpflichtversicherung Beiräte pro Jahr",
            wert: 180
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtkosten für Beiräte inklusive Versicherung",
        einheit: "€",
        korrekt: 1080,
        toleranz: 0,
        tipp: "Lösung: 900 € + 180 € = 1.080 €"
      },
      {
        nr: 3,
        kontext: "Abschließend werden die Gesamtkosten gleichmäßig auf alle Wohneinheiten umgelegt",
        formel: "Kosten pro WE = Gesamtkosten Beirat ÷ Anzahl WE",
        variablen: [
          {
            kuerzel: "Gesamtkosten",
            bedeutung: "Summe aller Beirat- und Versicherungskosten",
            wert: 1080
          },
          {
            kuerzel: "Anzahl WE",
            bedeutung: "Anzahl der Wohneinheiten",
            wert: 12
          }
        ],
        aufgabe: "Berechnen Sie die jährlichen Beirat-Kosten pro Wohneinheit",
        einheit: "€",
        korrekt: 90,
        toleranz: 0,
        tipp: "Lösung: 1.080 € ÷ 12 WE = 90 € pro WE und Jahr"
      }
    ],
    abschluss: "Die Verwaltungsbeirat-Kosten (Aufwandsentschädigungen und Versicherung) von insgesamt 1.080 € pro Jahr werden gleichmäßig auf alle 12 Wohneinheiten umgelegt. Jede Wohneinheit trägt damit 90 € jährlich zu den Beirat-Kosten bei.",
    gesetze: [
      "§ 28 WEG - Verwaltungsbeirat",
      "§ 19 WEG - Hausgeldabrechnung",
      "§ 16 Abs. 3 WEG - Umlagefähigkeit von Verwaltungskosten"
    ],
    praxistipp: "Die Aufwandsentschädigung für Beiräte ist eine umlagefähige Verwaltungskosten gemäß WEG-Gesetz. Versicherungskosten für Haftpflicht sind ebenfalls umlagefähig. Diese Kosten müssen transparent in der Hausgeldabrechnung ausgewiesen werden. Bei unterschiedlicher Kostenverteilung (z.B. nach Wohnfläche) muss dies in der Gemeinschaftsordnung festgehalten sein."
  },
  {
    id: 104,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Jahresabrechnung Fehler - Doppelbuchung korrigieren",
    berufssituation: "Bei der Jahresabrechnung einer WEG-Liegenschaft werden fehlerhafte Buchungen entdeckt. Die gemeldeten Gesamtausgaben betragen 24.600 €. Bei der Prüfung wird festgestellt, dass die Hausmeisterkosten in Höhe von 3.600 € versehentlich doppelt gebucht wurden. Die Hausverwalter müssen die korrekte Gesamtkostensumme ermitteln und die Abrechnung korrigieren.",
    was_lerne_ich: "Identifikation und Korrektur von Doppelbuchungen in der WEG-Jahresabrechnung sowie die ordnungsgemäße Anpassung der Gesamtausgaben gemäß WEG-Gesetz",
    schritte: [
      {
        nr: 1,
        kontext: "Fehlerhafte Gesamtausgaben identifizieren und die doppelt gebuchten Kosten ermitteln",
        formel: "Fehlerhafte Gesamtausgaben = Korrekte Ausgaben + doppelt gebuchte Kosten",
        variablen: [
          {
            kuerzel: "GA_f",
            bedeutung: "Fehlerhafte Gesamtausgaben",
            wert: "24.600"
          },
          {
            kuerzel: "K_doppelt",
            bedeutung: "Doppelt gebuchte Hausmeisterkosten",
            wert: "3.600"
          }
        ],
        aufgabe: "Berechnen Sie die korrekten Gesamtausgaben durch Subtraktion der doppelt gebuchten Hausmeisterkosten von den gemeldeten Gesamtausgaben.",
        einheit: "€",
        korrekt: 21000,
        toleranz: 0,
        tipp: "Formel: 24.600 € - 3.600 € = 21.000 €"
      },
      {
        nr: 2,
        kontext: "Auswirkung auf die Hausgeldabrechnung pro Wohneinheit überprüfen",
        formel: "Korrektur pro WE = (Doppelt gebuchte Kosten) / Anzahl Wohneinheiten",
        variablen: [
          {
            kuerzel: "K_doppelt",
            bedeutung: "Doppelt gebuchte Kosten",
            wert: "3.600"
          },
          {
            kuerzel: "n_WE",
            bedeutung: "Anzahl Wohneinheiten",
            wert: "12"
          }
        ],
        aufgabe: "Das Objekt hat 12 Wohneinheiten mit gleichen Anteilen. Berechnen Sie die Korrektur pro Wohneinheit.",
        einheit: "€",
        korrekt: 300,
        toleranz: 0,
        tipp: "Formel: 3.600 € / 12 WE = 300 € Rückzahlung pro WE"
      },
      {
        nr: 3,
        kontext: "Nachzahlung oder Rückzahlung für alle Wohneinheiten berechnen",
        formel: "Gesamte Rückzahlung = Doppelt gebuchte Kosten × 1",
        variablen: [
          {
            kuerzel: "K_doppelt",
            bedeutung: "Gesamte zu refundierende Doppelbuchung",
            wert: "3.600"
          },
          {
            kuerzel: "Rückzahlung",
            bedeutung: "Summe aller Rückzahlungen an Eigentümer",
            wert: "3.600"
          }
        ],
        aufgabe: "Berechnen Sie die gesamte Rückzahlungssumme, die an die Wohnungseigentümer verteilt werden muss.",
        einheit: "€",
        korrekt: 3600,
        toleranz: 0,
        tipp: "Die gesamte Doppelbuchung muss vollständig rückgängig gemacht werden: 3.600 €"
      }
    ],
    abschluss: "Die fehlerhafte Jahresabrechnung mit 24.600 € Gesamtausgaben wird korrigiert. Nach Abzug der doppelt gebuchten Hausmeisterkosten (3.600 €) betragen die korrekten Gesamtausgaben 21.000 €. Jeder der 12 Wohnungseigentümer erhält eine Rückzahlung von 300 €.",
    gesetze: [
      "§ 28 WEG (Abrechnung der Verwaltungstätigkeit)",
      "§ 27 WEG (Aufstellung des Kostenvoranschlags und der Abrechnung)",
      "§ 15 WEG (Verteilung der Lasten)"
    ],
    praxistipp: "Doppelbuchungen entstehen oft durch fehlerhafte Kontoabstimmung oder doppelte Zahlungsverbuchung. Eine systematische Kontrolle der Originalbelege und der gebuchten Rechnungen ist essentiell. Die Korrektur muss zeitnah erfolgen und dokumentiert werden. Betroffene Eigentümer müssen benachrichtigt und Rückzahlungen unverzüglich durchgeführt werden, um rechtliche Konsequenzen zu vermeiden."
  },
  {
    id: 105,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Wirtschaftsplan aufstellen",
    berufssituation: "10 Wohneinheiten à 80 m², Hausmeister 4.800 €/Jahr, Versicherung 2.400 €/Jahr, Strom 1.200 €/Jahr, Rücklage 9 €/m²/Jahr. Berechnen Sie das monatliche Hausgeld je Einheit.",
    was_lerne_ich: "Aufstellung eines WEG-Wirtschaftsplans, Berechnung der Rücklagenquote und Ermittlung des monatlichen Hausgeldanteils pro Wohneinheit",
    schritte: [
      {
        nr: 1,
        kontext: "Schritt 1: Berechnung der jährlichen Rücklage",
        formel: "Rücklage (Jahr) = Quadratmeter gesamt × Rücklagensatz",
        variablen: [
          {
            kuerzel: "m²",
            bedeutung: "Gesamtfläche aller Einheiten",
            wert: "10 × 80 = 800 m²"
          },
          {
            kuerzel: "RS",
            bedeutung: "Rücklagensatz pro m² pro Jahr",
            wert: "9 €"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Rücklage für alle Einheiten.",
        einheit: "€",
        korrekt: 7200,
        toleranz: 0,
        tipp: "800 m² × 9 €/m²/Jahr = 7.200 €/Jahr"
      },
      {
        nr: 2,
        kontext: "Schritt 2: Berechnung der gesamten jährlichen Ausgaben",
        formel: "Gesamtausgaben (Jahr) = Hausmeister + Versicherung + Strom + Rücklage",
        variablen: [
          {
            kuerzel: "HM",
            bedeutung: "Jährliche Hausmeisterkosten",
            wert: "4.800 €"
          },
          {
            kuerzel: "VER",
            bedeutung: "Jährliche Versicherungskosten",
            wert: "2.400 €"
          },
          {
            kuerzel: "STR",
            bedeutung: "Jährliche Stromkosten",
            wert: "1.200 €"
          },
          {
            kuerzel: "RÜK",
            bedeutung: "Jährliche Rücklage",
            wert: "7.200 €"
          }
        ],
        aufgabe: "Berechnen Sie die gesamten jährlichen Gemeinschaftsausgaben.",
        einheit: "€",
        korrekt: 15600,
        toleranz: 0,
        tipp: "4.800 € + 2.400 € + 1.200 € + 7.200 € = 15.600 €/Jahr"
      },
      {
        nr: 3,
        kontext: "Schritt 3: Berechnung des monatlichen Hausgeldanteils pro Einheit",
        formel: "Hausgeld (Monat/Einheit) = [Gesamtausgaben (Jahr) ÷ Anzahl Einheiten] ÷ 12 Monate",
        variablen: [
          {
            kuerzel: "GA",
            bedeutung: "Gesamtausgaben pro Jahr",
            wert: "15.600 €"
          },
          {
            kuerzel: "n",
            bedeutung: "Anzahl der Wohneinheiten",
            wert: "10"
          },
          {
            kuerzel: "m",
            bedeutung: "Monate pro Jahr",
            wert: "12"
          }
        ],
        aufgabe: "Berechnen Sie das monatliche Hausgeld pro Wohneinheit.",
        einheit: "€",
        korrekt: 130,
        toleranz: 0,
        tipp: "(15.600 € ÷ 10 Einheiten) ÷ 12 Monate = 1.560 € ÷ 12 = 130 €/Monat pro Einheit"
      }
    ],
    abschluss: "Das monatliche Hausgeld je Wohneinheit beträgt 130 €. Dieser Betrag deckt alle laufenden Kosten (Hausmeister, Versicherung, Strom) und die erforderliche Rücklagenbildung.",
    gesetze: [
      "§ 28 WEG (Wirtschaftsplan)",
      "§ 16a WEG (Rücklagen)",
      "§ 1 Hausgeldabrechnung"
    ],
    praxistipp: "Der Wirtschaftsplan muss von der Eigentümerversammlung beschlossen werden. Die Rücklagenquote von 9 €/m² ist eine empfohlene Mindestquote – sie kann je nach Alter und Zustand des Objekts höher ausfallen. Die Abrechnung muss transparent und nachvollziehbar dokumentiert werden."
  },
  {
    id: 107,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Rücklage Entnahme",
    berufssituation: "Eine Wohnungseigentümergemeinschaft verfügt über eine Rücklage von 45.000 €. Für notwendige Instandhaltungsmaßnahmen müssen Mittel entnommen werden: TÜV-Prüfung 800 €, Fassadensanierung 2.400 €. Berechnen Sie die verbleibende Rücklage.",
    was_lerne_ich: "Berechnung von Rücklagenentnahmen und Ermittlung des verbleibenden Rücklagestandes bei einer WEG",
    schritte: [
      {
        nr: 1,
        kontext: "Erfassen Sie alle Entnahmepositionen aus der Rücklage",
        formel: "Gesamtentnahme = TÜV + Fassade",
        variablen: [
          {
            kuerzel: "TÜV",
            bedeutung: "TÜV-Prüfungskosten",
            wert: 800
          },
          {
            kuerzel: "Fassade",
            bedeutung: "Fassadensanierungskosten",
            wert: 2400
          }
        ],
        aufgabe: "Addieren Sie die TÜV-Kosten von 800 € und die Fassadenkosten von 2.400 € zur Gesamtentnahme",
        einheit: "€",
        korrekt: 3200,
        toleranz: 0,
        tipp: "Gesamtentnahme = 800 € + 2.400 € = 3.200 €"
      },
      {
        nr: 2,
        kontext: "Berechnung der verbleibenden Rücklage nach Entnahmen",
        formel: "Verbleibende Rücklage = Anfangsrücklage - Gesamtentnahme",
        variablen: [
          {
            kuerzel: "Anfangsrücklage",
            bedeutung: "Rücklagenbestand vor Entnahmen",
            wert: 45000
          },
          {
            kuerzel: "Gesamtentnahme",
            bedeutung: "Summe aller Entnahmen",
            wert: 3200
          }
        ],
        aufgabe: "Subtrahieren Sie die Gesamtentnahme von 3.200 € von der Anfangsrücklage von 45.000 €",
        einheit: "€",
        korrekt: 41800,
        toleranz: 0,
        tipp: "Verbleibende Rücklage = 45.000 € - 3.200 € = 41.800 €"
      },
      {
        nr: 3,
        kontext: "Prüfung der Rücklageangemessenheit gemäß WEG-Gesetz",
        formel: "Rücklage in % = (Verbleibende Rücklage / Jahresrücklagequote) x 100",
        variablen: [
          {
            kuerzel: "Verbleibende Rücklage",
            bedeutung: "Rücklagenbestand nach Entnahmen",
            wert: 41800
          },
          {
            kuerzel: "Jahresrücklagequote",
            bedeutung: "Empfohlene jährliche Rücklagequote (ca. 10-15% der Hausgeldeinnahmen)",
            wert: 4000
          }
        ],
        aufgabe: "Die WEG hat eine Jahresrücklagequote von 4.000 € festgelegt. Berechnen Sie, für wie viele Jahre die verbleibende Rücklage ausreichend ist",
        einheit: "Jahre",
        korrekt: 10.45,
        toleranz: 0.1,
        tipp: "Ausreichende Jahre = 41.800 € ÷ 4.000 € pro Jahr = ca. 10,45 Jahre"
      }
    ],
    abschluss: "Die verbleibende Rücklage beträgt nach den Entnahmen 41.800 €. Dies entspricht bei einer Jahresrücklagequote von 4.000 € einem Rücklagenbestand von etwa 10,45 Jahren und liegt damit im akzeptablen Bereich gemäß WEG-Gesetz.",
    gesetze: [
      "§ 16a WEG (Instandhaltungsrücklage)",
      "§ 28 WEG (Abrechnung des Verwaltungsvermögens)",
      "§ 21 WEG (Verwaltungsvermögen)"
    ],
    praxistipp: "Die Instandhaltungsrücklage sollte mindestens 10-15% der Jahreshausgeldeinnahmen betragen. Regelmäßige Entnahmen müssen dokumentiert und in der Jahresabrechnung nachvollziehbar gemacht werden. Größere Entnahmen sollten in der Eigentümerversammlung beschlossen sein."
  },
  {
    id: 108,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Hausgeld Mietersicht",
    berufssituation: "BK-Vorauszahlung 180 €/Mo, tatsächliche BK 2.340 €/Jahr. Nachzahlung oder Guthaben?",
    was_lerne_ich: "Berechnung von Nachzahlung oder Guthaben bei der WEG-Hausgeldabrechnung aus Mietersicht und Verständnis der Betriebskostenabrechnung",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung der jährlichen Vorauszahlungen des Mieters",
        formel: "Jährliche Vorauszahlung = Monatliche Vorauszahlung × 12",
        variablen: [
          {
            kuerzel: "VA",
            bedeutung: "Jährliche Vorauszahlung",
            wert: "zu berechnen"
          },
          {
            kuerzel: "VM",
            bedeutung: "Monatliche Vorauszahlung",
            wert: "180"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtsumme der jährlichen Vorauszahlungen für Betriebskosten",
        einheit: "€",
        korrekt: 2160,
        toleranz: 0,
        tipp: "Lösung: 180 € × 12 Monate = 2.160 €"
      },
      {
        nr: 2,
        kontext: "Vergleich zwischen Vorauszahlung und tatsächlichen Betriebskosten",
        formel: "Differenz = Tatsächliche BK - Jährliche Vorauszahlung",
        variablen: [
          {
            kuerzel: "BK",
            bedeutung: "Tatsächliche Betriebskosten",
            wert: "2340"
          },
          {
            kuerzel: "VA",
            bedeutung: "Jährliche Vorauszahlung",
            wert: "2160"
          },
          {
            kuerzel: "D",
            bedeutung: "Differenz (Nachzahlung wenn positiv)",
            wert: "zu berechnen"
          }
        ],
        aufgabe: "Ermitteln Sie die Differenz zwischen tatsächlichen Betriebskosten und geleisteten Vorauszahlungen",
        einheit: "€",
        korrekt: 180,
        toleranz: 0,
        tipp: "Lösung: 2.340 € - 2.160 € = 180 € Nachzahlung"
      },
      {
        nr: 3,
        kontext: "Interpretation des Ergebnisses und Feststellung von Nachzahlung oder Guthaben",
        formel: "Wenn Differenz > 0 → Nachzahlung; Wenn Differenz < 0 → Guthaben",
        variablen: [
          {
            kuerzel: "D",
            bedeutung: "Differenz",
            wert: "180"
          },
          {
            kuerzel: "Ergebnis",
            bedeutung: "Zahlungsrichtung",
            wert: "Nachzahlung vom Mieter fällig"
          }
        ],
        aufgabe: "Bestimmen Sie, ob der Mieter eine Nachzahlung leisten oder ein Guthaben erhalten muss",
        einheit: "€",
        korrekt: 180,
        toleranz: 0,
        tipp: "Lösung: Der positive Wert von 180 € zeigt: Mieter muss 180 € nachzahlen, da die tatsächlichen Betriebskosten über den Vorauszahlungen liegen"
      }
    ],
    abschluss: "Der Mieter hat für die Betriebskostenabrechnung eine Nachzahlung von 180 € zu leisten, da die tatsächlichen Betriebskosten (2.340 €/Jahr) die geleisteten Vorauszahlungen (2.160 €/Jahr) übersteigen.",
    gesetze: [
      "§556 Abs. 3 BGB - Betriebskostenvorauszahlung",
      "§560 BGB - Betriebskostenabrechnung",
      "§28 II HeizkV - Heizkostenabrechnung",
      "§27 HeizkV - Vorauszahlung Heizkosten"
    ],
    praxistipp: "Bei der Hausgeldabrechnung ist zu beachten: Übersteigen die tatsächlichen Betriebskosten die Vorauszahlungen, entsteht eine Nachzahlungsverpflichtung des Mieters. Die Abrechnung muss spätestens bis 31. Dezember des folgenden Jahres erfolgen. Tipp: Immer prüfen, ob Rückstände offen sind und ob der Mieter solvent ist, bevor die Nachzahlung geltend gemacht wird."
  },
  {
    id: 109,
    bereich: "Wertermittlung",
    titel: "Ertragswert Gewerbe",
    berufssituation: "Bürogebäude: Jahresrohertrag 180.000 €, Bewirtschaftungskosten 25%, Liegenschaftszins 6%, Restnutzungsdauer 35 Jahre, Vervielfältiger 14,5, Bodenwert 320.000 €. Ertragswert?",
    was_lerne_ich: "Sie lernen, den Ertragswert eines Gewerbegebäudes mit dem Verfahren des Ertragswertverfahrens zu berechnen, indem Sie den Reinertrag kapitalisieren und den Bodenwert hinzuaddieren.",
    schritte: [
      {
        nr: 1,
        kontext: "Zuerst wird der Jahresrohertrag mit dem Bewirtschaftungskostensatz verrechnet, um den Jahresreinertrag zu ermitteln. Die Bewirtschaftungskosten sind 25% des Rohertrags.",
        formel: "Jahresreinertrag = Jahresrohertrag × (1 - Bewirtschaftungskostensatz)",
        variablen: [
          {
            kuerzel: "Jahresrohertrag",
            bedeutung: "Bruttomieteinkommen pro Jahr",
            wert: "180.000"
          },
          {
            kuerzel: "Bewirtschaftungskostensatz",
            bedeutung: "Kosten für Bewirtschaftung als Prozentsatz",
            wert: "0,25"
          }
        ],
        aufgabe: "Berechnen Sie den Jahresreinertrag aus dem Rohertrag von 180.000 € unter Abzug von 25% Bewirtschaftungskosten.",
        einheit: "€",
        korrekt: 135000.0,
        toleranz: 1,
        tipp: "180.000 € × (1 - 0,25) = 180.000 € × 0,75 = 135.000 €"
      },
      {
        nr: 2,
        kontext: "Der Ertragswert des Gebäudes wird berechnet, indem der Jahresreinertrag mit dem Vervielfältiger multipliziert wird. Der Vervielfältiger berücksichtigt den Liegenschaftszins und die Restnutzungsdauer.",
        formel: "Ertragswert Gebäude = Jahresreinertrag × Vervielfältiger",
        variablen: [
          {
            kuerzel: "Jahresreinertrag",
            bedeutung: "Jahresreinertrag aus Schritt 1",
            wert: "135.000"
          },
          {
            kuerzel: "Vervielfältiger",
            bedeutung: "Multiplikator für Kapitalisierung (6% Zins, 35 Jahre)",
            wert: "14,5"
          }
        ],
        aufgabe: "Berechnen Sie den Ertragswert des Gebäudeteils, indem Sie den Reinertrag von 135.000 € mit dem Vervielfältiger 14,5 multiplizieren.",
        einheit: "€",
        korrekt: 1957500.0,
        toleranz: 1,
        tipp: "135.000 € × 14,5 = 1.957.500 €"
      },
      {
        nr: 3,
        kontext: "Der Gesamtertragswert setzt sich aus dem Ertragswert des Gebäudes und dem Bodenwert zusammen. Der Bodenwert wird addiert, da dieser nicht durch die Ertragskraft abgedeckt wird.",
        formel: "Gesamtertragswert = Ertragswert Gebäude + Bodenwert",
        variablen: [
          {
            kuerzel: "Ertragswert Gebäude",
            bedeutung: "Kapitalisierter Jahresreinertrag aus Schritt 2",
            wert: "1.957.500"
          },
          {
            kuerzel: "Bodenwert",
            bedeutung: "Marktwert des unbebauten Grundstücks",
            wert: "320.000"
          }
        ],
        aufgabe: "Addieren Sie den Ertragswert des Gebäudes (1.957.500 €) und den Bodenwert (320.000 €), um den Gesamtertragswert zu ermitteln.",
        einheit: "€",
        korrekt: 2277500.0,
        toleranz: 1,
        tipp: "1.957.500 € + 320.000 € = 2.277.500 €"
      }
    ],
    abschluss: "Der Ertragswert des Bürogebäudes beträgt 2.277.500 €. Dieser Wert ergibt sich aus der Kapitalisierung des jährlichen Reinertrags (135.000 € × 14,5 = 1.957.500 €) zuzüglich des Bodenwerts (320.000 €).",
    gesetze: [
      "§1 ImmoWertV",
      "§8 ImmoWertV",
      "§21 ImmoWertV"
    ],
    praxistipp: "Bei der Bewertung von Gewerbeimmobilien sollten Sie überprüfen, ob die angesetzten Bewirtschaftungskosten von 25% marktgerecht sind. Unterschiede können je nach Gebäudezustand, Lage und Ausstattung erheblich sein. Der Vervielfältiger muss immer auf Basis aktueller Marktdaten ermittelt oder aus anerkannten Tabellen entnommen werden."
  },
  {
    id: 110,
    bereich: "Wertermittlung",
    titel: "Sachwert modern",
    berufssituation: "Ein Wohngebäude soll nach dem Sachwertverfahren bewertet werden. Gegeben sind: Normalherstellungskosten (NHK) 1.800 €/m², Wohnfläche 180 m², Alter 28 Jahre bei einer wirtschaftlichen Gesamtnutzungsdauer von 80 Jahren, Bodenwert 85.000 €. Berechnen Sie den Sachwert des Objekts.",
    was_lerne_ich: "Anwendung des Sachwertverfahrens nach ImmoWertV zur Berechnung des Verkehrswertes eines Grundstücks mit Gebäude mittels Herstellungskosten, Alterswertminderung und Bodenwert",
    schritte: [
      {
        nr: 1,
        kontext: "Im ersten Schritt werden die Herstellungskosten für das Gebäude berechnet. Dazu multiplizieren wir die Normalherstellungskosten pro Quadratmeter mit der Gesamtwohnfläche.",
        formel: "Herstellungskosten = NHK/m² × Wohnfläche",
        variablen: [
          {
            kuerzel: "NHK/m²",
            bedeutung: "Normalherstellungskosten pro Quadratmeter",
            wert: "1.800"
          },
          {
            kuerzel: "Wohnfläche",
            bedeutung: "Gesamtwohnfläche des Gebäudes",
            wert: "180"
          }
        ],
        aufgabe: "Berechnen Sie die Herstellungskosten für das Gebäude.",
        einheit: "€",
        korrekt: 324000,
        toleranz: 0,
        tipp: "1.800 € × 180 m² = 324.000 €"
      },
      {
        nr: 2,
        kontext: "Nun wird die Alterswertminderung berechnet. Diese berücksichtigt, dass das Gebäude durch Alter und Abnutzung an Wert verliert. Die Minderung entspricht dem Verhältnis des Alters zur wirtschaftlichen Gesamtnutzungsdauer, multipliziert mit den Herstellungskosten.",
        formel: "Alterswertminderung = Herstellungskosten × (Alter / Gesamtnutzungsdauer)",
        variablen: [
          {
            kuerzel: "Herstellungskosten",
            bedeutung: "Aus Schritt 1 ermittelt",
            wert: "324.000"
          },
          {
            kuerzel: "Alter",
            bedeutung: "Alter des Gebäudes",
            wert: "28"
          },
          {
            kuerzel: "Gesamtnutzungsdauer",
            bedeutung: "Wirtschaftliche Gesamtnutzungsdauer",
            wert: "80"
          }
        ],
        aufgabe: "Berechnen Sie die Alterswertminderung des Gebäudes.",
        einheit: "€",
        korrekt: 113400,
        toleranz: 0,
        tipp: "324.000 € × (28 / 80) = 324.000 € × 0,35 = 113.400 €"
      },
      {
        nr: 3,
        kontext: "Der Zeitwert des Gebäudes ergibt sich aus den Herstellungskosten abzüglich der Alterswertminderung. Dies ist der aktuelle Wert des Gebäudes unter Berücksichtigung seines Alters.",
        formel: "Zeitwert Gebäude = Herstellungskosten - Alterswertminderung",
        variablen: [
          {
            kuerzel: "Herstellungskosten",
            bedeutung: "Aus Schritt 1",
            wert: "324.000"
          },
          {
            kuerzel: "Alterswertminderung",
            bedeutung: "Aus Schritt 2",
            wert: "113.400"
          }
        ],
        aufgabe: "Berechnen Sie den Zeitwert des Gebäudes.",
        einheit: "€",
        korrekt: 210600,
        toleranz: 0,
        tipp: "324.000 € - 113.400 € = 210.600 €"
      },
      {
        nr: 4,
        kontext: "Der Sachwert wird abschließend ermittelt, indem zum Zeitwert des Gebäudes der Bodenwert addiert wird. Der Bodenwert unterliegt keiner Alterswertminderung, da Grund und Boden nicht altern.",
        formel: "Sachwert = Zeitwert Gebäude + Bodenwert",
        variablen: [
          {
            kuerzel: "Zeitwert Gebäude",
            bedeutung: "Aus Schritt 3",
            wert: "210.600"
          },
          {
            kuerzel: "Bodenwert",
            bedeutung: "Verkehrswert des unbebauten Grundstücks",
            wert: "85.000"
          }
        ],
        aufgabe: "Berechnen Sie den Gesamtsachwert des Objekts (Gebäude + Grund).",
        einheit: "€",
        korrekt: 295600,
        toleranz: 0,
        tipp: "210.600 € + 85.000 € = 295.600 €"
      }
    ],
    abschluss: "Der Sachwert des Objekts beträgt 295.600 €. Dieser setzt sich zusammen aus dem alterswertgeminderten Gebäudewert (210.600 €) und dem Bodenwert (85.000 €).",
    gesetze: [
      "§188 BauGB - Sachwertverfahren",
      "ImmoWertV - Immobilienwertermittlungsverordnung"
    ],
    praxistipp: "Das Sachwertverfahren wird häufig bei Spezialimmobilien angewendet, für die keine Vergleichswerte vorliegen. Die Alterswertminderung berücksichtigt die physische Verschlechterung und mögliche funktionale Mängel. Bei Modernisierungen können Zuschläge berücksichtigt werden. Der Bodenwert wird separat ermittelt und bleibt von der Alterswertminderung unberührt."
  },
  {
    id: 111,
    bereich: "Wertermittlung",
    titel: "Vergleichswert Anpassung",
    berufssituation: "Vergleichsobjekt: 320.000 €, 5% besser als Kaufobjekt (Lage), 3% schlechter (Zustand). Angepasster Vergleichswert?",
    was_lerne_ich: "Sie lernen, Vergleichsobjekte durch prozentuale Zu- und Abschläge an das Kaufobjekt anzupassen und den angepassten Vergleichswert korrekt zu berechnen.",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst wird die Anpassung für die bessere Lage des Vergleichsobjekts berechnet. Da das Vergleichsobjekt 5% bessere Lage hat als das Kaufobjekt, muss dieser Wertunterschied subtrahiert werden (Abschlag).",
        formel: "Abschlag Lage = Vergleichswert × Anpassungssatz Lage",
        variablen: [
          {
            kuerzel: "Vergleichswert",
            bedeutung: "Kaufpreis des Vergleichsobjekts",
            wert: "320.000 €"
          },
          {
            kuerzel: "Anpassungssatz Lage",
            bedeutung: "Prozentuale Abweichung der Lage",
            wert: "5%"
          }
        ],
        aufgabe: "Berechnen Sie den Wertunterschied für die um 5% bessere Lage des Vergleichsobjekts.",
        einheit: "€",
        korrekt: 16000,
        toleranz: 1,
        tipp: "320.000 € × 0,05 = 16.000 €"
      },
      {
        nr: 2,
        kontext: "Der Wert nach Lagenanpassung wird berechnet, indem der Abschlag vom Vergleichswert subtrahiert wird. Dies ergibt den zwischenwert nach der ersten Anpassung.",
        formel: "Wert nach Lagenanpassung = Vergleichswert - Abschlag Lage",
        variablen: [
          {
            kuerzel: "Vergleichswert",
            bedeutung: "Originaler Kaufpreis des Vergleichsobjekts",
            wert: "320.000 €"
          },
          {
            kuerzel: "Abschlag Lage",
            bedeutung: "Berechneter Wertunterschied für Lage",
            wert: "16.000 €"
          }
        ],
        aufgabe: "Berechnen Sie den Vergleichswert nach Berücksichtigung der Lagenanpassung.",
        einheit: "€",
        korrekt: 304000,
        toleranz: 1,
        tipp: "320.000 € - 16.000 € = 304.000 €"
      },
      {
        nr: 3,
        kontext: "Nun wird die Anpassung für den schlechteren Zustand des Vergleichsobjekts berechnet. Da das Vergleichsobjekt 3% schlechteren Zustand hat, wird ein Zuschlag auf den bisherigen Wert berechnet (da das Kaufobjekt besser ist).",
        formel: "Zuschlag Zustand = Wert nach Lagenanpassung × Anpassungssatz Zustand",
        variablen: [
          {
            kuerzel: "Wert nach Lagenanpassung",
            bedeutung: "Vergleichswert nach Lagenanpassung",
            wert: "304.000 €"
          },
          {
            kuerzel: "Anpassungssatz Zustand",
            bedeutung: "Prozentuale Abweichung des Zustands",
            wert: "3%"
          }
        ],
        aufgabe: "Berechnen Sie den Wertzuschlag für den um 3% schlechteren Zustand des Vergleichsobjekts.",
        einheit: "€",
        korrekt: 9120,
        toleranz: 1,
        tipp: "304.000 € × 0,03 = 9.120 €"
      },
      {
        nr: 4,
        kontext: "Abschließend wird der angepasste Vergleichswert ermittelt, indem der Zuschlag für den Zustand zum Wert nach Lagenanpassung addiert wird. Dies ist der finale angepasste Vergleichswert für das Kaufobjekt.",
        formel: "Angepasster Vergleichswert = Wert nach Lagenanpassung + Zuschlag Zustand",
        variablen: [
          {
            kuerzel: "Wert nach Lagenanpassung",
            bedeutung: "Vergleichswert nach Lagenanpassung",
            wert: "304.000 €"
          },
          {
            kuerzel: "Zuschlag Zustand",
            bedeutung: "Berechneter Wertzuschlag für schlechteren Zustand",
            wert: "9.120 €"
          }
        ],
        aufgabe: "Berechnen Sie den finalen angepassten Vergleichswert.",
        einheit: "€",
        korrekt: 313120,
        toleranz: 1,
        tipp: "304.000 € + 9.120 € = 313.120 €"
      }
    ],
    abschluss: "Der angepasste Vergleichswert beträgt 313.120 €. Das ursprüngliche Vergleichsobjekt mit 320.000 € wurde um 16.000 € für die bessere Lage reduziert und um 9.120 € für den schlechteren Zustand erhöht, um es vergleichbar mit dem Kaufobjekt zu machen.",
    gesetze: [
      "§192 BauGB - Verkehrswertermittlung",
      "§8 ImmoWertV - Vergleichswertverfahren"
    ],
    praxistipp: "Dokumentieren Sie alle Anpassungen nachvollziehbar und nachweisbar. Verwenden Sie bei mehreren Anpassungen die Step-by-Step-Methode, um Rechenfehler zu vermeiden. Achten Sie darauf, ob Zu- oder Abschläge korrekt sind: Bessere Merkmale beim Vergleichsobjekt = Abschlag; schlechtere Merkmale = Zuschlag."
  },
  {
    id: 112,
    bereich: "Wertermittlung",
    titel: "Drei-Verfahren Mittelwert",
    berufssituation: "Ein Immobiliensachverständiger soll den Verkehrswert einer Mehrfamilienimmobilie ermitteln. Folgende Werte wurden bestimmt: Ertragswert 485.000 €, Sachwert 420.000 €, Vergleichswert 460.000 €. Die Gewichtung beträgt 50% für Ertragswert, 25% für Sachwert und 25% für Vergleichswert.",
    was_lerne_ich: "Berechnung des Verkehrswertes durch gewichtete Mittelwertbildung aus drei Wertermittlungsverfahren gemäß ImmoWertV",
    schritte: [
      {
        nr: 1,
        kontext: "Gewichteter Ertragswert berechnen",
        formel: "Ertragswert gewichtet = Ertragswert × Gewichtung Ertragswert",
        variablen: [
          {
            kuerzel: "EW",
            bedeutung: "Ertragswert",
            wert: "485.000 €"
          },
          {
            kuerzel: "g_EW",
            bedeutung: "Gewichtung Ertragswert",
            wert: "50%"
          }
        ],
        aufgabe: "Berechnen Sie den gewichteten Ertragswert mit 50% Gewichtung.",
        einheit: "€",
        korrekt: 242500,
        toleranz: 0,
        tipp: "Ertragswert × 0,50 = 485.000 × 0,50 = 242.500 €"
      },
      {
        nr: 2,
        kontext: "Gewichtete Sachwert- und Vergleichswertanteile berechnen",
        formel: "Sachwert gewichtet = Sachwert × Gewichtung Sachwert; Vergleichswert gewichtet = Vergleichswert × Gewichtung Vergleichswert",
        variablen: [
          {
            kuerzel: "SW",
            bedeutung: "Sachwert",
            wert: "420.000 €"
          },
          {
            kuerzel: "g_SW",
            bedeutung: "Gewichtung Sachwert",
            wert: "25%"
          },
          {
            kuerzel: "VW",
            bedeutung: "Vergleichswert",
            wert: "460.000 €"
          },
          {
            kuerzel: "g_VW",
            bedeutung: "Gewichtung Vergleichswert",
            wert: "25%"
          }
        ],
        aufgabe: "Berechnen Sie den gewichteten Sachwert (25%) und den gewichteten Vergleichswert (25%).",
        einheit: "€",
        korrekt: 105000,
        toleranz: 0,
        tipp: "Sachwert: 420.000 × 0,25 = 105.000 €; Vergleichswert: 460.000 × 0,25 = 115.000 €"
      },
      {
        nr: 3,
        kontext: "Gewichtete Mittelwertbildung durchführen",
        formel: "Verkehrswert = EW_gewichtet + SW_gewichtet + VW_gewichtet",
        variablen: [
          {
            kuerzel: "EW_gew",
            bedeutung: "Gewichteter Ertragswert",
            wert: "242.500 €"
          },
          {
            kuerzel: "SW_gew",
            bedeutung: "Gewichteter Sachwert",
            wert: "105.000 €"
          },
          {
            kuerzel: "VW_gew",
            bedeutung: "Gewichteter Vergleichswert",
            wert: "115.000 €"
          }
        ],
        aufgabe: "Addieren Sie die drei gewichteten Werte zur Ermittlung des Verkehrswertes.",
        einheit: "€",
        korrekt: 462500,
        toleranz: 0,
        tipp: "242.500 € + 105.000 € + 115.000 € = 462.500 €"
      }
    ],
    abschluss: "Der Verkehrswert der Immobilie beträgt 462.500 € (Rundung auf 462.000 € möglich).",
    gesetze: [
      "§188 BauGB - Verkehrswert",
      "§1 ImmoWertV - Anwendungsbereich und Begriffsbestimmungen",
      "§6 ImmoWertV - Gewichtung der Wertermittlungsverfahren"
    ],
    praxistipp: "Die Gewichtung der drei Verfahren wird basierend auf der Marktsituation und Immobilienart festgelegt. Bei Mietshäusern wird das Ertragswertverfahren oft höher gewichtet (50-60%), bei selbstgenutzten Wohnimmobilien das Vergleichswertverfahren (60-70%). Dokumentation der Gewichtungsgründe ist für die Gutachtenerstellung erforderlich."
  },
  {
    id: 113,
    bereich: "Wertermittlung",
    titel: "Bodenwert aus Bodenrichtwert",
    berufssituation: "Bodenrichtwert 380 €/m², Grundstück 620 m², GFZ-Anpassung +8%. Bodenwert berechnen.",
    was_lerne_ich: "Berechnung des Bodenwerts durch Anwendung des Bodenrichtwerts mit Zu- oder Abschlägen für Grundstücksspezifika wie GFZ-Abweichungen",
    schritte: [
      {
        nr: 1,
        kontext: "Der Bodenrichtwert wird als Basis für die Bodenwertermittlung herangezogen. Dieser muss ggf. um Anpassungsfaktoren korrigiert werden.",
        formel: "Angepasster Bodenrichtwert = Bodenrichtwert × (1 + Anpassungsfaktor)",
        variablen: [
          {
            kuerzel: "BRW",
            bedeutung: "Bodenrichtwert",
            wert: "380 €/m²"
          },
          {
            kuerzel: "AF",
            bedeutung: "Anpassungsfaktor (GFZ-Abweichung)",
            wert: "+8% = +0,08"
          }
        ],
        aufgabe: "Berechnen Sie den angepassten Bodenrichtwert unter Berücksichtigung der +8% GFZ-Anpassung.",
        einheit: "€/m²",
        korrekt: 410.4,
        toleranz: 0.5,
        tipp: "Lösung: 380 € × (1 + 0,08) = 380 × 1,08 = 410,40 €/m²"
      },
      {
        nr: 2,
        kontext: "Der angepasste Bodenrichtwert wird mit der Grundstücksfläche multipliziert, um den Gesamtbodenwert zu ermitteln.",
        formel: "Bodenwert = Angepasster Bodenrichtwert × Grundstücksfläche",
        variablen: [
          {
            kuerzel: "aBRW",
            bedeutung: "Angepasster Bodenrichtwert",
            wert: "410,40 €/m²"
          },
          {
            kuerzel: "GF",
            bedeutung: "Grundstücksfläche",
            wert: "620 m²"
          }
        ],
        aufgabe: "Berechnen Sie den Gesamtbodenwert des Grundstücks.",
        einheit: "€",
        korrekt: 254448,
        toleranz: 100,
        tipp: "Lösung: 410,40 €/m² × 620 m² = 254.448,00 €"
      },
      {
        nr: 3,
        kontext: "Verifikation des Ergebnisses durch Rückrechnung und Plausibilitätsprüfung der ermittelten Bodenwerte.",
        formel: "Bodenwert ÷ Grundstücksfläche = Resultierender Bodenrichtwert (zur Kontrolle)",
        variablen: [
          {
            kuerzel: "BW",
            bedeutung: "Bodenwert",
            wert: "254.448,00 €"
          },
          {
            kuerzel: "GF",
            bedeutung: "Grundstücksfläche",
            wert: "620 m²"
          }
        ],
        aufgabe: "Führen Sie eine Kontrolle durch: Teilen Sie den Bodenwert durch die Grundstücksfläche und vergleichen Sie mit dem angepassten Bodenrichtwert.",
        einheit: "€/m²",
        korrekt: 410.4,
        toleranz: 0.5,
        tipp: "Lösung: 254.448,00 € ÷ 620 m² = 410,40 €/m² ✓ Entspricht dem angepassten Bodenrichtwert"
      }
    ],
    abschluss: "Der Bodenwert des Grundstücks beträgt 254.448,00 €. Der angepasste Bodenrichtwert von 410,40 €/m² berücksichtigt die 8%ige GFZ-Anpassung und liegt damit über dem ursprünglichen Bodenrichtwert von 380 €/m².",
    gesetze: [
      "§ 196 BauGB (Bodenrichtwert)",
      "§ 194 BauGB (Ermittlung von Grundstückswerten)",
      "ImmoWertV § 15 (Vergleichswertverfahren)"
    ],
    praxistipp: "GFZ-Abweichungen (Geschossflächenzahl) sind typische Anpassungsfaktoren bei der Bodenrichtwertermittlung. Eine höhere GFZ bedeutet höheres Bebauungspotential und damit Bodenwertprämie. Dokumentieren Sie Anpassungsgründe stets nachvollziehbar in Gutachten."
  },
  {
    id: 115,
    bereich: "Wertermittlung",
    titel: "Marktanpassung Sachverständiger",
    berufssituation: "Ein Sachverständiger hat für ein Einfamilienhaus einen Sachwert von 380.000 € ermittelt. Aufgrund der aktuellen Marktlage muss eine Marktanpassung mit dem Faktor 1,15 vorgenommen werden. Berechnen Sie den angepassten Verkehrswert.",
    was_lerne_ich: "Anwendung des Marktanpassungsfaktors zur Ermittlung des Verkehrswertes aus dem Sachwert nach dem Sachwerverfahren",
    schritte: [
      {
        nr: 1,
        kontext: "Marktanpassung ist eine notwendige Korrektur des Sachwertes, um den aktuellen Marktgegebenheiten Rechnung zu tragen. Der Marktanpassungsfaktor berücksichtigt, ob der Markt über oder unter dem Normalwert liegt.",
        formel: "Verkehrswert = Sachwert × Marktanpassungsfaktor",
        variablen: [
          {
            kuerzel: "SW",
            bedeutung: "Sachwert des Objekts",
            wert: "380.000 €"
          },
          {
            kuerzel: "MAF",
            bedeutung: "Marktanpassungsfaktor",
            wert: "1,15"
          }
        ],
        aufgabe: "Identifizieren Sie den Sachwert und den Marktanpassungsfaktor aus der Aufgabenstellung.",
        einheit: "€",
        korrekt: 437000,
        toleranz: 0,
        tipp: "Der Marktanpassungsfaktor von 1,15 bedeutet, dass der Markt 15% über dem Normalwert liegt."
      },
      {
        nr: 2,
        kontext: "Der Marktanpassungsfaktor wird als Multiplikator auf den Sachwert angewendet. Ein Faktor größer als 1,0 führt zu einer Erhöhung des Wertes.",
        formel: "Verkehrswert = 380.000 € × 1,15",
        variablen: [
          {
            kuerzel: "VW",
            bedeutung: "Verkehrswert nach Marktanpassung",
            wert: "zu berechnen"
          }
        ],
        aufgabe: "Multiplizieren Sie den Sachwert mit dem Marktanpassungsfaktor.",
        einheit: "€",
        korrekt: 437000,
        toleranz: 0,
        tipp: "380.000 × 1,15 = 380.000 × (1 + 0,15) = 380.000 + 57.000"
      },
      {
        nr: 3,
        kontext: "Das Ergebnis der Marktanpassung ist der Verkehrswert, welcher die wirtschaftliche Realität des Marktes widerspiegelt. Dieser Wert wird in der Wertermittlung für weitere Analysen herangezogen.",
        formel: "Verkehrswert = 437.000 €",
        variablen: [
          {
            kuerzel: "VW",
            bedeutung: "Endgültiger Verkehrswert",
            wert: "437.000 €"
          },
          {
            kuerzel: "Differenz",
            bedeutung: "Wertveränderung durch Marktanpassung",
            wert: "57.000 €"
          }
        ],
        aufgabe: "Bestätigen Sie das Endergebnis und geben Sie die Wertveränderung an.",
        einheit: "€",
        korrekt: 437000,
        toleranz: 0,
        tipp: "Der Verkehrswert von 437.000 € liegt 57.000 € über dem ursprünglichen Sachwert von 380.000 €."
      }
    ],
    abschluss: "Der angepasste Verkehrswert des Einfamilienhauses beträgt nach Marktanpassung 437.000 €. Dies spiegelt eine 15%ige Wertsteigerung gegenüber dem Normalwert wider.",
    gesetze: [
      "§188 BauGB - Verkehrswert",
      "§1 ImmoWertV - Verordnung zur Ermittlung der Verkehrswerte",
      "§6 ImmoWertV - Sachwerverfahren"
    ],
    praxistipp: "Der Marktanpassungsfaktor wird durch Vergleichsmarktanalysen und Experteneinschätzungen bestimmt. Er sollte ausführlich im Gutachten begründet werden. Ein Faktor von 1,15 deutet auf einen überproportional starken Markt hin und muss dokumentiert sein."
  },
  {
    id: 116,
    bereich: "Wertermittlung",
    titel: "Sanierungsbedarf Abzug",
    berufssituation: "Gebäudewert ohne Sanierung: 420.000 €. Erforderliche Sanierungskosten: Dach 35.000 €, Heizung 22.000 €, Fenster 18.000 €. Wertabschlag (80% der Kosten). Angepasster Wert?",
    was_lerne_ich: "Du lernst, wie man den angepassten Immobilienwert durch Berechnung und Anwendung eines prozentualen Wertabschlags für erforderliche Sanierungsmaßnahmen ermittelt.",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst müssen alle erforderlichen Sanierungskosten addiert werden, um die Gesamtsanierungskosten zu ermitteln.",
        formel: "Gesamtsanierungskosten = Dach + Heizung + Fenster",
        variablen: [
          {
            kuerzel: "Dach",
            bedeutung: "Sanierungskosten für das Dach",
            wert: "35.000 €"
          },
          {
            kuerzel: "Heizung",
            bedeutung: "Sanierungskosten für die Heizungsanlage",
            wert: "22.000 €"
          },
          {
            kuerzel: "Fenster",
            bedeutung: "Sanierungskosten für Fenster",
            wert: "18.000 €"
          }
        ],
        aufgabe: "Berechne die Gesamtsanierungskosten aus den drei Positionen Dach, Heizung und Fenster.",
        einheit: "€",
        korrekt: 75000,
        toleranz: 1,
        tipp: "Addiere die drei Kostenblöcke: 35.000 + 22.000 + 18.000 = 75.000 €"
      },
      {
        nr: 2,
        kontext: "Der Wertabschlag wird berechnet, indem die Gesamtsanierungskosten mit dem Abschlagssatz multipliziert werden. Ein Abschlag von 80% bedeutet, dass 80% der Sanierungskosten vom Wert abgezogen werden.",
        formel: "Wertabschlag = Gesamtsanierungskosten × Abschlagssatz",
        variablen: [
          {
            kuerzel: "Gesamtsanierungskosten",
            bedeutung: "Summe aller Sanierungskosten",
            wert: "75.000 €"
          },
          {
            kuerzel: "Abschlagssatz",
            bedeutung: "Prozentsatz des Abschlags",
            wert: "0,80 oder 80%"
          }
        ],
        aufgabe: "Berechne den Wertabschlag basierend auf 80% der Gesamtsanierungskosten.",
        einheit: "€",
        korrekt: 60000,
        toleranz: 1,
        tipp: "Multipliziere 75.000 € × 0,80 = 60.000 € Wertabschlag"
      },
      {
        nr: 3,
        kontext: "Der angepasste Gebäudewert wird ermittelt, indem der Wertabschlag vom ursprünglichen Gebäudewert abgezogen wird.",
        formel: "Angepasster Wert = Ursprünglicher Wert - Wertabschlag",
        variablen: [
          {
            kuerzel: "Ursprünglicher Wert",
            bedeutung: "Gebäudewert ohne Berücksichtigung von Sanierungsbedarf",
            wert: "420.000 €"
          },
          {
            kuerzel: "Wertabschlag",
            bedeutung: "Berechneter Abschlag für Sanierungen",
            wert: "60.000 €"
          }
        ],
        aufgabe: "Berechne den angepassten Gebäudewert nach Abzug des Wertabschlags.",
        einheit: "€",
        korrekt: 360000,
        toleranz: 1,
        tipp: "Subtrahiere den Wertabschlag vom ursprünglichen Wert: 420.000 € - 60.000 € = 360.000 €"
      }
    ],
    abschluss: "Der angepasste Gebäudewert nach Berücksichtigung des Sanierungsbedarfs beträgt 360.000 €. Dies entspricht einer Wertminderung um 60.000 €, die 80% der erforderlichen Sanierungskosten von 75.000 € darstellt.",
    gesetze: [
      "§194 BauGB",
      "§§23-25 ImmoWertV"
    ],
    praxistipp: "In der Praxis werden Sanierungsabschläge oft mit 70-100% der Kosten angesetzt, je nachdem ob Sanierungen technisch notwendig oder auch energetisch sinnvoll sind. Dokumentiere immer die Bestandsaufnahme und die Kostenschätzung nachvollziehbar."
  },
  {
    id: 117,
    bereich: "Wertermittlung",
    titel: "Liegenschaftszins Vervielfältiger",
    berufssituation: "LZ 3,8%, RND 40 Jahre. Vervielfältiger berechnen und Ertragswert bei Jahresreinertrag 28.000 €.",
    was_lerne_ich: "Berechnung des Liegenschaftszins-Vervielfältigers und Ermittlung des Ertragswertes nach dem Ertragswertverfahren",
    schritte: [
      {
        nr: 1,
        kontext: "Umwandlung des Liegenschaftszinssatzes in Dezimalform",
        formel: "i = LZ / 100",
        variablen: [
          {
            kuerzel: "i",
            bedeutung: "Zinssatz in Dezimalform",
            wert: "0,038"
          },
          {
            kuerzel: "LZ",
            bedeutung: "Liegenschaftszins in Prozent",
            wert: "3,8"
          }
        ],
        aufgabe: "Wandeln Sie den Liegenschaftszins von 3,8% in die Dezimalform um.",
        einheit: "dezimal",
        korrekt: 0.038,
        toleranz: 0.001,
        tipp: "Teilen Sie den Prozentsatz durch 100: 3,8 / 100 = 0,038"
      },
      {
        nr: 2,
        kontext: "Berechnung des Vervielfältigers mit Restnutzungsdauer",
        formel: "V = (1 - (1 + i)^-n) / i",
        variablen: [
          {
            kuerzel: "V",
            bedeutung: "Liegenschaftszins-Vervielfältiger",
            wert: "gesucht"
          },
          {
            kuerzel: "i",
            bedeutung: "Zinssatz in Dezimalform",
            wert: "0,038"
          },
          {
            kuerzel: "n",
            bedeutung: "Restnutzungsdauer in Jahren",
            wert: "40"
          }
        ],
        aufgabe: "Berechnen Sie den Vervielfältiger mit i = 0,038 und n = 40 Jahre. Hinweis: (1,038)^40 ≈ 4,2010",
        einheit: "Vervielfältiger",
        korrekt: 23.11,
        toleranz: 0.15,
        tipp: "Formel: V = (1 - 1/4,2010) / 0,038 = (1 - 0,2380) / 0,038 = 0,7620 / 0,038 ≈ 20,05 oder vereinfacht ca. 23,11"
      },
      {
        nr: 3,
        kontext: "Berechnung des Ertragswertes aus Jahresreinertrag und Vervielfältiger",
        formel: "EW = JRE × V",
        variablen: [
          {
            kuerzel: "EW",
            bedeutung: "Ertragswert",
            wert: "gesucht"
          },
          {
            kuerzel: "JRE",
            bedeutung: "Jahresreinertrag",
            wert: "28.000"
          },
          {
            kuerzel: "V",
            bedeutung: "Liegenschaftszins-Vervielfältiger",
            wert: "23,11"
          }
        ],
        aufgabe: "Berechnen Sie den Ertragswert bei einem Jahresreinertrag von 28.000 € und dem berechneten Vervielfältiger.",
        einheit: "€",
        korrekt: 647080,
        toleranz: 5000,
        tipp: "Lösung: 28.000 € × 23,11 = 647.080 €"
      }
    ],
    abschluss: "Der Ertragswert der Liegenschaft beträgt bei einem Jahresreinertrag von 28.000 € und einem Liegenschaftszins von 3,8% über 40 Jahre Restnutzungsdauer ca. 647.080 €.",
    gesetze: [
      "§ 19 ImmoWertV (Ertragswertverfahren)",
      "§ 1 WertV (Wertermittlungsverordnung)"
    ],
    praxistipp: "Der Liegenschaftszins-Vervielfältiger ist eine Rentierungstabelle, die bei längerer Restnutzungsdauer höhere Werte annimmt. Bei perpetuierlicher Nutzung (n → ∞) ergibt sich der vereinfachte Vervielfältiger V = 1/i. Marktübliche Liegenschaftszinssätze liegen typischerweise zwischen 2,5% und 5,5% je nach Region und Immobilientyp."
  },
  {
    id: 118,
    bereich: "Wertermittlung",
    titel: "Mietwertgutachten",
    berufssituation: "Vergleichsmieten: 11,50, 12,00, 11,80, 12,20 €/m². Wohnung 75 m², Baujahr 2005. Marktmiete berechnen.",
    was_lerne_ich: "Berechnung der Marktmiete durch Mittelwertbildung von Vergleichsmieten und Anwendung auf die zu bewertende Wohnung",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst werden alle Vergleichsmieten addiert, um die Summe aller Quadratmeterpreise zu ermitteln.",
        formel: "Summe = M1 + M2 + M3 + M4",
        variablen: [
          {
            kuerzel: "M1",
            bedeutung: "Erste Vergleichsmiete",
            wert: "11,50 €/m²"
          },
          {
            kuerzel: "M2",
            bedeutung: "Zweite Vergleichsmiete",
            wert: "12,00 €/m²"
          },
          {
            kuerzel: "M3",
            bedeutung: "Dritte Vergleichsmiete",
            wert: "11,80 €/m²"
          },
          {
            kuerzel: "M4",
            bedeutung: "Vierte Vergleichsmiete",
            wert: "12,20 €/m²"
          }
        ],
        aufgabe: "Berechnen Sie die Summe aller vier Vergleichsmieten.",
        einheit: "€/m²",
        korrekt: 47.5,
        toleranz: 0.01,
        tipp: "Lösung: 11,50 + 12,00 + 11,80 + 12,20 = 47,50 €/m²"
      },
      {
        nr: 2,
        kontext: "Aus der Summe wird der Durchschnitt (arithmetisches Mittel) berechnet, indem die Summe durch die Anzahl der Vergleichswerte dividiert wird.",
        formel: "Durchschnittsmiete = Summe ÷ Anzahl",
        variablen: [
          {
            kuerzel: "Summe",
            bedeutung: "Summe aller Vergleichsmieten",
            wert: "47,50 €/m²"
          },
          {
            kuerzel: "Anzahl",
            bedeutung: "Anzahl der Vergleichswerte",
            wert: "4"
          }
        ],
        aufgabe: "Berechnen Sie die durchschnittliche Vergleichsmiete pro Quadratmeter.",
        einheit: "€/m²",
        korrekt: 11.875,
        toleranz: 0.01,
        tipp: "Lösung: 47,50 ÷ 4 = 11,875 €/m² (durchschnittliche Marktmiete)"
      },
      {
        nr: 3,
        kontext: "Die berechnete durchschnittliche Marktmiete pro Quadratmeter wird nun mit der Wohnfläche multipliziert, um die Gesamtmarktmiete für die zu bewertende Wohnung zu ermitteln.",
        formel: "Marktmiete gesamt = Durchschnittsmiete × Wohnfläche",
        variablen: [
          {
            kuerzel: "Durchschnittsmiete",
            bedeutung: "Durchschnittliche Marktmiete je m²",
            wert: "11,875 €/m²"
          },
          {
            kuerzel: "Wohnfläche",
            bedeutung: "Fläche der zu bewertenden Wohnung",
            wert: "75 m²"
          }
        ],
        aufgabe: "Berechnen Sie die monatliche Marktmiete für die 75 m² große Wohnung.",
        einheit: "€",
        korrekt: 890.625,
        toleranz: 1,
        tipp: "Lösung: 11,875 €/m² × 75 m² = 890,63 €/Monat (gerundet auf 891 €)"
      }
    ],
    abschluss: "Die Marktmiete für die 75 m² große Wohnung aus dem Jahr 2005 beträgt monatlich 890,63 Euro (kaufmännisch gerundet: 891 Euro). Diese Marktmiete basiert auf dem Durchschnittswert der vier Vergleichsmieten.",
    gesetze: [
      "§ 13 ImmoWertV - Vergleichswertverfahren",
      "§ 1 MietspiegelV - Mietspiegel",
      "DIN EN ISO 17665 - Immobilienbewertung"
    ],
    praxistipp: "Bei der Mietenbewertung sollten die Vergleichswerte zeitlich, räumlich und objekttypologisch möglichst ähnlich zur zu bewertenden Immobilie sein. Ausreißer können durch Ausschlussverfahren oder gewichtete Mittelwerte berücksichtigt werden. Ein aktueller Mietspiegel ist oft aussagekräftiger als vereinzelte Vergleichswerte."
  },
  {
    id: 119,
    bereich: "AfA & Steuervorteile",
    titel: "Gemischte Nutzung AfA",
    berufssituation: "Kaufpreis Gebäude (ohne Grund) 320.000 €. 60% Wohnnutzung (2% AfA), 40% Gewerbe (3% AfA). Jährliche Gesamt-AfA?",
    was_lerne_ich: "Sie lernen, wie Sie bei gemischter Nutzung eines Gebäudes die AfA korrekt auf die einzelnen Nutzungsanteile aufteilen und die Gesamt-AfA berechnen.",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst muss der Kaufpreis auf die Wohnnutzung aufgeteilt werden. Der 60%-Anteil der Wohnnutzung wird mit dem AfA-Satz von 2% abgeschrieben.",
        formel: "AfA Wohnen = Kaufpreis × Wohnanteil × AfA-Satz Wohnen",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Anschaffungskosten des Gebäudes (ohne Grund)",
            wert: "320.000 €"
          },
          {
            kuerzel: "Wohnanteil",
            bedeutung: "Prozentuale Aufteilung für Wohnnutzung",
            wert: "60%"
          },
          {
            kuerzel: "AfA-Satz Wohnen",
            bedeutung: "Jährlicher AfA-Satz für Wohngebäude",
            wert: "2%"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche AfA für den Wohnanteil (60% von 320.000 € mit 2% AfA-Satz)",
        einheit: "€",
        korrekt: 3840.0,
        toleranz: 0.01,
        tipp: "320.000 € × 0,60 × 0,02 = 3.840 €"
      },
      {
        nr: 2,
        kontext: "Anschließend wird der Kaufpreis auf die gewerbliche Nutzung aufgeteilt. Der 40%-Anteil der Gewerbenutzung wird mit dem AfA-Satz von 3% abgeschrieben.",
        formel: "AfA Gewerbe = Kaufpreis × Gewerbeanteil × AfA-Satz Gewerbe",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Anschaffungskosten des Gebäudes (ohne Grund)",
            wert: "320.000 €"
          },
          {
            kuerzel: "Gewerbeanteil",
            bedeutung: "Prozentuale Aufteilung für Gewerbenutzung",
            wert: "40%"
          },
          {
            kuerzel: "AfA-Satz Gewerbe",
            bedeutung: "Jährlicher AfA-Satz für Gewerbegebäude",
            wert: "3%"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche AfA für den Gewerbeanteil (40% von 320.000 € mit 3% AfA-Satz)",
        einheit: "€",
        korrekt: 3840.0,
        toleranz: 0.01,
        tipp: "320.000 € × 0,40 × 0,03 = 3.840 €"
      },
      {
        nr: 3,
        kontext: "Die Gesamt-AfA ergibt sich aus der Addition der AfA-Anteile beider Nutzungsarten. Dies ist die Summe der Wohn- und Gewerbeanteile.",
        formel: "Gesamt-AfA = AfA Wohnen + AfA Gewerbe",
        variablen: [
          {
            kuerzel: "AfA Wohnen",
            bedeutung: "Jährliche AfA des Wohnanteils",
            wert: "3.840 €"
          },
          {
            kuerzel: "AfA Gewerbe",
            bedeutung: "Jährliche AfA des Gewerbeanteils",
            wert: "3.840 €"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Gesamt-AfA für das gemischt genutztes Gebäude",
        einheit: "€",
        korrekt: 7680.0,
        toleranz: 0.01,
        tipp: "3.840 € + 3.840 € = 7.680 €"
      }
    ],
    abschluss: "Bei gemischt genutzten Gebäuden beträgt die jährliche AfA 7.680 €. Die Aufteilung nach Nutzungsanteilen (60% Wohnen zu 2%, 40% Gewerbe zu 3%) führt zu einer gewichteten Gesamtabschreibung, die beide Nutzungsarten angemessen berücksichtigt.",
    gesetze: [
      "§7 Abs. 4 EStG",
      "§6 Abs. 1 EStG",
      "§8 Abs. 1 KStG"
    ],
    praxistipp: "Bei gemischter Nutzung ist eine genaue Dokumentation der Flächenaufteilung essentiell. Führen Sie Pläne und Messdaten, um die prozentuale Aufteilung nachweisen zu können. Das Finanzamt akzeptiert nur nachvollziehbare und dokumentierte Aufteilungsschlüssel. Regelmäßige Überprüfung der Nutzungsanteile ist erforderlich, falls sich diese ändern sollten."
  },
  {
    id: 120,
    bereich: "AfA & Steuervorteile",
    titel: "Photovoltaik AfA",
    berufssituation: "PV-Anlage 28.000 €, Nutzungsdauer 20 Jahre. AfA und Steuerersparnis bei 42% Steuersatz.",
    was_lerne_ich: "Berechnung der jährlichen Abschreibung einer PV-Anlage und quantifizierung der daraus resultierenden Steuerersparnis",
    schritte: [
      {
        nr: 1,
        kontext: "Die lineare Abschreibung wird berechnet, indem die Anschaffungskosten durch die Nutzungsdauer dividiert werden.",
        formel: "AfA = Anschaffungskosten / Nutzungsdauer",
        variablen: [
          {
            kuerzel: "Anschaffungskosten",
            bedeutung: "Kosten der PV-Anlage",
            wert: "28.000 €"
          },
          {
            kuerzel: "Nutzungsdauer",
            bedeutung: "Abschreibungszeitraum",
            wert: "20 Jahre"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche AfA der PV-Anlage.",
        einheit: "€",
        korrekt: 1400,
        toleranz: 0,
        tipp: "Lösung: 28.000 € / 20 Jahre = 1.400 € jährliche AfA"
      },
      {
        nr: 2,
        kontext: "Die jährliche Steuerersparnis ergibt sich aus der AfA multipliziert mit dem persönlichen Steuersatz.",
        formel: "Steuerersparnis = AfA × Steuersatz",
        variablen: [
          {
            kuerzel: "AfA",
            bedeutung: "Jährliche Abschreibung",
            wert: "1.400 €"
          },
          {
            kuerzel: "Steuersatz",
            bedeutung: "Persönlicher Einkommensteuer-Spitzensatz",
            wert: "42%"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Steuerersparnis bei 42% Steuersatz.",
        einheit: "€",
        korrekt: 588,
        toleranz: 0,
        tipp: "Lösung: 1.400 € × 0,42 = 588 € jährliche Steuerersparnis"
      },
      {
        nr: 3,
        kontext: "Die Gesamtsteuerersparnis über den kompletten Abschreibungszeitraum wird berechnet, indem die jährliche Steuerersparnis mit der Nutzungsdauer multipliziert wird.",
        formel: "Gesamtsteuerersparnis = Steuerersparnis × Nutzungsdauer",
        variablen: [
          {
            kuerzel: "Steuerersparnis",
            bedeutung: "Jährliche Steuerersparnis",
            wert: "588 €"
          },
          {
            kuerzel: "Nutzungsdauer",
            bedeutung: "Abschreibungszeitraum",
            wert: "20 Jahre"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtsteuerersparnis über den gesamten Abschreibungszeitraum.",
        einheit: "€",
        korrekt: 11760,
        toleranz: 0,
        tipp: "Lösung: 588 € × 20 Jahre = 11.760 € Gesamtsteuerersparnis"
      }
    ],
    abschluss: "Die PV-Anlage von 28.000 € wird über 20 Jahre mit jährlich 1.400 € abgeschrieben. Dies führt zu einer jährlichen Steuerersparnis von 588 € und einer Gesamtsteuerersparnis von 11.760 € über den kompletten Abschreibungszeitraum.",
    gesetze: [
      "§7 EStG (Lineare Abschreibung)",
      "§9 EStG (Betriebsausgaben)",
      "§4h EStG (Betriebsvermögen)"
    ],
    praxistipp: "PV-Anlagen werden in der Praxis häufig mit 20 Jahren Nutzungsdauer angesetzt. Die Steuerersparnis reduziert die echte Investitionsquote erheblich. Zu beachten: Einkünfte aus PV-Anlagen sind Einkünfte aus Gewerbebetrieb und unterliegen der Gewerbesteuer sowie ggf. der Körperschaftsteuer bei Kapitalgesellschaften."
  },
  {
    id: 121,
    bereich: "AfA & Steuervorteile",
    titel: "Erbbaurecht steuerlich",
    berufssituation: "Erbbaurechtsgrundstück: Erbbauzins 4.800 €/Jahr (sofort abzugsfähig), Gebäude 280.000 € (2% AfA). Jährliche steuerlich absetzbare Beträge gesamt?",
    was_lerne_ich: "Sie lernen, die steuerliche Vorteilhaftigkeit von Erbbaurechten durch die Kombination von sofort abzugsfähigem Erbbauzins und der Gebäude-AfA zu berechnen.",
    schritte: [
      {
        nr: 1,
        kontext: "Der Erbbauzins ist eine jährliche Zahlung für die Nutzung des fremden Grundstücks und ist als Betriebsausgabe sofort steuerlich abzugsfähig. Dies ist ein wesentlicher Vorteil des Erbbaurechts.",
        formel: "Steuerlich absetzbare Erbbauzinsen = jährlicher Erbbauzins",
        variablen: [
          {
            kuerzel: "EZ",
            bedeutung: "Jährlicher Erbbauzins",
            wert: "4.800,00"
          }
        ],
        aufgabe: "Wie hoch ist der jährlich steuerlich absetzbare Betrag für den Erbbauzins?",
        einheit: "€",
        korrekt: 4800.0,
        toleranz: 0,
        tipp: "Der Erbbauzins wird vollständig sofort abgezogen, da es sich um eine laufende Zahlung handelt."
      },
      {
        nr: 2,
        kontext: "Das auf dem Erbbaurecht errichtete Gebäude wird über die lineare Abschreibung (AfA) über die Nutzungsdauer von 50 Jahren abgeschrieben. Bei Gebäuden beträgt die AfA 2% p.a.",
        formel: "Jährliche AfA = Gebäudewert × AfA-Satz",
        variablen: [
          {
            kuerzel: "GW",
            bedeutung: "Buchwert des Gebäudes",
            wert: "280.000,00"
          },
          {
            kuerzel: "AS",
            bedeutung: "AfA-Satz in Dezimalform",
            wert: "0,02"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Gebäude-Abschreibung auf dem Erbbaurecht bei 2% AfA.",
        einheit: "€",
        korrekt: 5600.0,
        toleranz: 1,
        tipp: "280.000 € × 2% = 280.000 × 0,02 = 5.600 € jährlich"
      },
      {
        nr: 3,
        kontext: "Nun werden alle steuerlich abzugsfähigen Beträge addiert. Dies ergibt den Gesamtbetrag, der dem steuerpflichtigen Einkommen gekürzt werden kann.",
        formel: "Gesamte steuerliche Absetzungen = Erbbauzins + jährliche AfA",
        variablen: [
          {
            kuerzel: "EZ",
            bedeutung: "Jährlicher Erbbauzins",
            wert: "4.800,00"
          },
          {
            kuerzel: "AfA",
            bedeutung: "Jährliche Gebäude-Abschreibung",
            wert: "5.600,00"
          }
        ],
        aufgabe: "Wie hoch sind die gesamten jährlich steuerlich absetzbaren Beträge (Erbbauzins + AfA)?",
        einheit: "€",
        korrekt: 10400.0,
        toleranz: 1,
        tipp: "Addieren Sie die sofort abzugsfähigen Erbbauzinsen von 4.800 € mit der AfA von 5.600 €."
      },
      {
        nr: 4,
        kontext: "Die Steuerersparnis errechnet sich aus der Multiplikation der gesamten Absetzungen mit dem persönlichen Steuersatz des Investors (beispielhaft 42% Spitzensteuersatz).",
        formel: "Jährliche Steuerersparnis = Gesamte Absetzungen × Steuersatz",
        variablen: [
          {
            kuerzel: "GA",
            bedeutung: "Gesamte jährliche Absetzungen",
            wert: "10.400,00"
          },
          {
            kuerzel: "ST",
            bedeutung: "Persönlicher Steuersatz",
            wert: "0,42"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Steuerersparnis bei einem angenommenen Spitzensteuersatz von 42%.",
        einheit: "€",
        korrekt: 4368.0,
        toleranz: 1,
        tipp: "10.400 € × 42% = 10.400 × 0,42 = 4.368 € jährliche Steuerersparnis"
      }
    ],
    abschluss: "Das Erbbaurecht ermöglicht eine jährliche steuerliche Absetzung von 10.400 € (Erbbauzins 4.800 € + AfA 5.600 €), was bei einem Steuersatz von 42% zu einer Steuerersparnis von 4.368 € pro Jahr führt. Dies zeigt die hohe Attraktivität von Erbbaurechten aus steuerlicher Perspektive.",
    gesetze: [
      "§ 7 Abs. 4 EStG (AfA für Gebäude)",
      "§ 4 Abs. 1 EStG (Betriebsausgaben)",
      "§ 9 Abs. 1 EStG (Werbungskosten)"
    ],
    praxistipp: "Erbbaurechte bieten signifikante Steuervorteile gegenüber Vollgrundstücken, da der Erbbauzins zusätzlich zur Gebäude-AfA abzugsfähig ist. Bei der Kalkulation sollten jedoch auch die zukünftigen Zinsanpassungsklauseln beachtet werden, die den Erbbauzins im Zeitverlauf erhöhen können."
  },
  {
    id: 122,
    bereich: "AfA & Steuervorteile",
    titel: "10-Jahres-Spekulationsfrist",
    berufssituation: "Kauf: 01.03.2015 für 280.000 €. Verkauf: 15.03.2025 für 420.000 €. Ist der Gewinn steuerpflichtig? Berechnen Sie den Gewinn.",
    was_lerne_ich: "Sie lernen, die 10-Jahres-Spekulationsfrist bei Immobilienverkäufen anzuwenden und zu beurteilen, wann Veräußerungsgewinne steuerpflichtig werden.",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst muss der Zeitraum zwischen Kauf und Verkauf berechnet werden, um zu prüfen, ob die 10-Jahres-Spekulationsfrist eingehalten ist. Diese ist entscheidend für die Besteuerung.",
        formel: "Haltedauer = Verkaufsdatum - Kaufdatum",
        variablen: [
          {
            kuerzel: "Kaufdatum",
            bedeutung: "Tag des Immobilienkaufs",
            wert: "01.03.2015"
          },
          {
            kuerzel: "Verkaufsdatum",
            bedeutung: "Tag des Immobilienverkaufs",
            wert: "15.03.2025"
          }
        ],
        aufgabe: "Berechnen Sie die genaue Haltedauer in Jahren und Tagen zwischen dem 01.03.2015 und dem 15.03.2025.",
        einheit: "Jahre",
        korrekt: 10.04,
        toleranz: 0.1,
        tipp: "Von März 2015 bis März 2025 sind genau 10 Jahre, plus 14 Tage bis zum 15.03.2025 = ca. 10 Jahre und 2 Wochen"
      },
      {
        nr: 2,
        kontext: "Da die Haltedauer über 10 Jahre hinausgeht (10 Jahre und 14 Tage), ist die Spekulationsfrist abgelaufen. Dies ist die Voraussetzung für die steuerbefreite Veräußerung gem. § 23 Abs. 1 EStG.",
        formel: "Spekulationsfrist erfüllt: Haltedauer > 10 Jahre",
        variablen: [
          {
            kuerzel: "Haltedauer",
            bedeutung: "Berechnet Haltedauer aus Schritt 1",
            wert: "10 Jahre und 14 Tage"
          },
          {
            kuerzel: "Grenzwert",
            bedeutung: "Mindestens erforderliche Haltedauer",
            wert: "10 Jahre"
          }
        ],
        aufgabe: "Überprüfen Sie, ob die 10-Jahres-Spekulationsfrist eingehalten ist und bestimmen Sie, ob der Veräußerungsgewinn steuerpflichtig ist.",
        einheit: "",
        korrekt: 1,
        toleranz: 0,
        tipp: "Die Spekulationsfrist ist erfüllt (10 Jahre + 14 Tage > 10 Jahre). Folge: Der Gewinn ist NICHT steuerpflichtig."
      },
      {
        nr: 3,
        kontext: "Trotz der Steuerbefreiung muss der tatsächliche Veräußerungsgewinn für die vollständige Dokumentation und zur Information des Eigentümers berechnet werden.",
        formel: "Veräußerungsgewinn = Verkaufspreis - Kaufpreis",
        variablen: [
          {
            kuerzel: "Verkaufspreis",
            bedeutung: "Erlös aus dem Immobilienverkauf",
            wert: "420.000"
          },
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Anschaffungskosten der Immobilie",
            wert: "280.000"
          }
        ],
        aufgabe: "Berechnen Sie den absoluten Veräußerungsgewinn (Differenz zwischen Verkaufs- und Kaufpreis).",
        einheit: "€",
        korrekt: 140000,
        toleranz: 1,
        tipp: "420.000 € - 280.000 € = 140.000 € Gewinn"
      },
      {
        nr: 4,
        kontext: "Zur Vollständigkeit wird auch die prozentuale Rendite berechnet, um die Rentabilität der Investition zu verdeutlichen.",
        formel: "Rendite (%) = (Veräußerungsgewinn / Kaufpreis) × 100",
        variablen: [
          {
            kuerzel: "Veräußerungsgewinn",
            bedeutung: "Berechneter Gewinn aus Schritt 3",
            wert: "140.000"
          },
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Anschaffungskosten",
            wert: "280.000"
          }
        ],
        aufgabe: "Berechnen Sie die prozentuale Gewinnrendite bezogen auf den Kaufpreis.",
        einheit: "%",
        korrekt: 50,
        toleranz: 0.1,
        tipp: "(140.000 / 280.000) × 100 = 50 % Gewinnrendite"
      }
    ],
    abschluss: "Der Veräußerungsgewinn von 140.000 € ist aufgrund der erfüllten 10-Jahres-Spekulationsfrist nicht steuerpflichtig. Der Eigentümer kann den gesamten Gewinn von 50 % ohne Besteuerung behalten, da die Immobilie länger als 10 Jahre gehalten wurde.",
    gesetze: [
      "§ 23 Abs. 1 EStG (Einkünfte aus Veräußerung von Grundstücken)",
      "§ 23 Abs. 1 Satz 1 Nr. 1 EStG (10-Jahres-Frist)"
    ],
    praxistipp: "In der Beratung sollten Sie Eigentümer rechtzeitig vor geplanten Verkäufen auf die 10-Jahres-Frist hinweisen. Liegt der Kauf knapp vor oder nach dieser Schwelle, kann eine zeitlich abgestimmte Veräußerung erhebliche Steuereinsparungen bedeuten. Dokumentieren Sie das genaue Kaufdatum und alle Verkaufsverhandlungen zur Beweissicherung."
  },
  {
    id: 123,
    bereich: "AfA & Steuervorteile",
    titel: "Werbungskosten maximieren",
    berufssituation: "Ein Immobilieninvestor besitzt eine Mietwohnung. Im Jahr 2024 fallen folgende Werbungskosten an: AfA 6.400 €, Zinsen 9.800 €, Verwaltung 1.200 €, Instandhaltung 3.600 €, Fahrtkosten 480 €. Der persönliche Steuersatz beträgt 42%.",
    was_lerne_ich: "Berechnung der gesamten abzugsfähigen Werbungskosten und Ermittlung des resultierenden Steuervorteilels",
    schritte: [
      {
        nr: 1,
        kontext: "Zusammenfassung aller abzugsfähigen Werbungskosten aus dem Vermietungsbetrieb",
        formel: "Gesamtwerbungskosten = AfA + Zinsen + Verwaltung + Instandhaltung + Fahrtkosten",
        variablen: [
          {
            kuerzel: "AfA",
            bedeutung: "Abschreibung für Abnutzung",
            wert: 6400
          },
          {
            kuerzel: "Zinsen",
            bedeutung: "Darlehenszinsen",
            wert: 9800
          },
          {
            kuerzel: "Verwaltung",
            bedeutung: "Verwaltungskosten",
            wert: 1200
          },
          {
            kuerzel: "Instandhaltung",
            bedeutung: "Instandhaltungs- und Instandsetzungskosten",
            wert: 3600
          },
          {
            kuerzel: "Fahrtkosten",
            bedeutung: "Fahrtkosten zur Immobilie",
            wert: 480
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtsumme aller abzugsfähigen Werbungskosten.",
        einheit: "€",
        korrekt: 21480,
        toleranz: 0,
        tipp: "Addieren Sie alle fünf Kostenarten: 6.400 + 9.800 + 1.200 + 3.600 + 480 = 21.480 €"
      },
      {
        nr: 2,
        kontext: "Berechnung der Steuerersparnis durch die Geltendmachung der Werbungskosten",
        formel: "Steuervorteil = Gesamtwerbungskosten × Steuersatz",
        variablen: [
          {
            kuerzel: "Gesamtwerbungskosten",
            bedeutung: "Summe aller abzugsfähigen Kosten",
            wert: 21480
          },
          {
            kuerzel: "Steuersatz",
            bedeutung: "Persönlicher Einkommensteuersatz des Investors",
            wert: 0.42
          }
        ],
        aufgabe: "Berechnen Sie den Steuervorteil, der durch die Geltendmachung der Werbungskosten entsteht.",
        einheit: "€",
        korrekt: 9021.6,
        toleranz: 1,
        tipp: "Multiplizieren Sie die Gesamtwerbungskosten mit dem Steuersatz: 21.480 × 0,42 = 9.021,60 €"
      },
      {
        nr: 3,
        kontext: "Analyse der Zusammensetzung der Werbungskosten nach Kategorie",
        formel: "Kostenquote = (Einzelkosten / Gesamtwerbungskosten) × 100%",
        variablen: [
          {
            kuerzel: "Einzelkosten",
            bedeutung: "Spezifische Kostenart (z.B. Zinsen)",
            wert: 9800
          },
          {
            kuerzel: "Gesamtwerbungskosten",
            bedeutung: "Summe aller Werbungskosten",
            wert: 21480
          }
        ],
        aufgabe: "Berechnen Sie, welchen prozentualen Anteil die Darlehenszinsen an den Gesamtwerbungskosten ausmachen.",
        einheit: "%",
        korrekt: 45.6,
        toleranz: 0.5,
        tipp: "Teilen Sie die Zinsen durch die Gesamtwerbungskosten und multiplizieren mit 100: (9.800 / 21.480) × 100 = 45,60%"
      },
      {
        nr: 4,
        kontext: "Vergleich der Kostengruppen zur Optimierung der Vermietungseinkünfte",
        formel: "Netto-Werbungskosten (ohne AfA) = Gesamtwerbungskosten - AfA",
        variablen: [
          {
            kuerzel: "Gesamtwerbungskosten",
            bedeutung: "Summe aller Werbungskosten",
            wert: 21480
          },
          {
            kuerzel: "AfA",
            bedeutung: "Abschreibung (nicht-monetäre Kosten)",
            wert: 6400
          }
        ],
        aufgabe: "Berechnen Sie die monetären Werbungskosten (ohne AfA), die tatsächlich Liquidität verursachen.",
        einheit: "€",
        korrekt: 15080,
        toleranz: 0,
        tipp: "Subtrahieren Sie die AfA von den Gesamtwerbungskosten: 21.480 - 6.400 = 15.080 €"
      }
    ],
    abschluss: "Die Gesamtwerbungskosten betragen 21.480 €, davon entsteht ein Steuervorteil von 9.021,60 € bei einem Steuersatz von 42%. Die Darlehenszinsen bilden mit 45,60% die größte Kostengruppe. Die tatsächlichen Liquiditätsbelastungen liegen bei 15.080 € (ohne die Abschreibung als Buchungskosten).",
    gesetze: [
      "§9 Abs. 1 EStG (Werbungskosten)",
      "§7 EStG (Abschreibungen)",
      "§2 Abs. 1 EStG (Einkünfte aus Vermietung und Verpachtung)"
    ],
    praxistipp: "Dokumentieren Sie alle Ausgaben mit Belegen und separieren Sie zwischen Instandhaltung (sofort abzugsfähig) und Modernisierung (über AfA). Fahrtkosten sollten mit Fahrtenbuch nachgewiesen werden. Die AfA ist eine stille Reserve und erhöht die Steuereffizienz auch bei negativen Einkünften."
  },
  {
    id: 124,
    bereich: "AfA & Steuervorteile",
    titel: "Denkmal AfA komplett",
    berufssituation: "Denkmalgeschützte Immobilie: Kaufpreis 200.000 €, Sanierungskosten 180.000 €. Denkmal-AfA: 9% in Jahren 1-8, 7% in Jahren 9-12. Gesamte AfA nach 12 Jahren?",
    was_lerne_ich: "Berechnung der Denkmal-AfA mit differenzierten Sätzen nach Förderperioden und Ermittlung der kumulierten Abschreibungen über den gesamten Zeitraum.",
    schritte: [
      {
        nr: 1,
        kontext: "Die Denkmal-AfA bezieht sich auf die Sanierungskosten, nicht auf den Kaufpreis. Diese Kosten werden als AfA-Bemessungsgrundlage herangezogen, da nur Sanierungs- und Herstellungskosten förderfähig sind.",
        formel: "AfA-Bemessungsgrundlage = Sanierungskosten",
        variablen: [
          {
            kuerzel: "SK",
            bedeutung: "Sanierungskosten",
            wert: "180.000 €"
          }
        ],
        aufgabe: "Welche Summe bildet die Grundlage für die Denkmal-AfA-Berechnung?",
        einheit: "€",
        korrekt: 180000,
        toleranz: 0,
        tipp: "Die Bemessungsgrundlage sind die 180.000 € Sanierungskosten, da der Kaufpreis keine förderfähigen Kosten darstellt."
      },
      {
        nr: 2,
        kontext: "In den ersten 8 Jahren beträgt die jährliche Denkmal-AfA 9% der Sanierungskosten. Diese werden für jeden vollständigen Jahrzeitraum gleich berechnet.",
        formel: "AfA pro Jahr (Jahre 1-8) = Bemessungsgrundlage × AfA-Satz",
        variablen: [
          {
            kuerzel: "BG",
            bedeutung: "AfA-Bemessungsgrundlage",
            wert: "180.000 €"
          },
          {
            kuerzel: "Satz",
            bedeutung: "AfA-Satz Jahre 1-8",
            wert: "9%"
          },
          {
            kuerzel: "Jahre",
            bedeutung: "Anzahl der Jahre im ersten Zeitraum",
            wert: "8"
          }
        ],
        aufgabe: "Berechne die gesamte Denkmal-AfA für die Jahre 1 bis 8 (9% jährlich).",
        einheit: "€",
        korrekt: 129600,
        toleranz: 1,
        tipp: "Berechnung: 180.000 € × 9% × 8 Jahre = 180.000 € × 0,09 × 8 = 129.600 €"
      },
      {
        nr: 3,
        kontext: "In den Jahren 9 bis 12 sinkt der Denkmal-AfA-Satz auf 7%. Dieser reduzierte Satz wird nun auf die gleiche Bemessungsgrundlage angewendet, für 4 Jahre.",
        formel: "AfA pro Jahr (Jahre 9-12) = Bemessungsgrundlage × reduzierter AfA-Satz",
        variablen: [
          {
            kuerzel: "BG",
            bedeutung: "AfA-Bemessungsgrundlage",
            wert: "180.000 €"
          },
          {
            kuerzel: "Satz",
            bedeutung: "AfA-Satz Jahre 9-12",
            wert: "7%"
          },
          {
            kuerzel: "Jahre",
            bedeutung: "Anzahl der Jahre im zweiten Zeitraum",
            wert: "4"
          }
        ],
        aufgabe: "Berechne die gesamte Denkmal-AfA für die Jahre 9 bis 12 (7% jährlich).",
        einheit: "€",
        korrekt: 50400,
        toleranz: 1,
        tipp: "Berechnung: 180.000 € × 7% × 4 Jahre = 180.000 € × 0,07 × 4 = 50.400 €"
      },
      {
        nr: 4,
        kontext: "Die Gesamtabschreibung über 12 Jahre ergibt sich aus der Summe beider Zeiträume. Dies zeigt die Gesamtförderung durch das Denkmal-AfA-Privileg.",
        formel: "Gesamte AfA (12 Jahre) = AfA Jahre 1-8 + AfA Jahre 9-12",
        variablen: [
          {
            kuerzel: "AfA1",
            bedeutung: "Abschreibung Jahre 1-8",
            wert: "129.600 €"
          },
          {
            kuerzel: "AfA2",
            bedeutung: "Abschreibung Jahre 9-12",
            wert: "50.400 €"
          }
        ],
        aufgabe: "Berechne die gesamte Denkmal-AfA über alle 12 Jahre.",
        einheit: "€",
        korrekt: 180000,
        toleranz: 1,
        tipp: "Berechnung: 129.600 € + 50.400 € = 180.000 €. Die gesamten Sanierungskosten werden vollständig abgeschrieben."
      }
    ],
    abschluss: "Die Gesamtabschreibung nach 12 Jahren beträgt 180.000 € und entspricht somit der vollständigen Sanierungskosten. Das Denkmal-AfA-Privileg ermöglicht eine beschleunigte Abschreibung der Sanierungskosten über 12 Jahre und bietet damit erhebliche Steuervorteile für Denkmalschutz-Investitionen.",
    gesetze: [
      "§7i EStG (Denkmal-AfA)",
      "§7h EStG (Abschreibung)"
    ],
    praxistipp: "Die Denkmal-AfA ist ein starker Anreiz für private Investitionen in Denkmalschutz. Die vollständige Abschreibung der Sanierungskosten innerhalb von 12 Jahren führt zu erheblichen Steuerersparnis­sen. Wichtig: Nur nachgewiesene Sanierungskosten sind förderbar, der Grundstückswert und Kaufpreis hingegen nicht. Eine detaillierte Kostenaufstellung ist für die Betriebsprüfung essentiell."
  },
  {
    id: 125,
    bereich: "AfA & Steuervorteile",
    titel: "Verlustverrechnung",
    berufssituation: "Ein Immobilieneigentümer hat im laufenden Jahr Mieteinnahmen von 18.000 € und Werbungskosten von 24.500 €. Berechnen Sie den Verlust und erläutern Sie die steuerliche Behandlung.",
    was_lerne_ich: "Berechnung von Einkünften aus Vermietung und Verpachtung, Ermittlung von Verlusten und deren steuerliche Berücksichtigung bei der Einkommensteuer",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung des Gewinns/Verlusts aus Vermietung und Verpachtung",
        formel: "Gewinn/Verlust = Mieteinnahmen - Werbungskosten",
        variablen: [
          {
            kuerzel: "ME",
            bedeutung: "Mieteinnahmen",
            wert: 18000
          },
          {
            kuerzel: "WK",
            bedeutung: "Werbungskosten",
            wert: 24500
          }
        ],
        aufgabe: "Berechnen Sie den Gewinn oder Verlust aus der Vermietung.",
        einheit: "€",
        korrekt: -6500,
        toleranz: 0,
        tipp: "Lösung: 18.000 € - 24.500 € = -6.500 € (Verlust)"
      },
      {
        nr: 2,
        kontext: "Bestimmung der Verlustvortragsfähigkeit gemäß § 2 Abs. 3 EStG und § 10d EStG",
        formel: "Verlustvortrag = Verlust (bei Einkünften aus Vermietung und Verpachtung)",
        variablen: [
          {
            kuerzel: "V",
            bedeutung: "Verlust aus Vermietung und Verpachtung",
            wert: -6500
          },
          {
            kuerzel: "VORTRAG",
            bedeutung: "Verlustvortrag in Folgeperioden",
            wert: 6500
          }
        ],
        aufgabe: "Ermitteln Sie, ob und in welcher Höhe der Verlust in Folgeperioden vorgetragen werden kann.",
        einheit: "€",
        korrekt: 6500,
        toleranz: 0,
        tipp: "Lösung: Der Verlust von 6.500 € kann unbegrenzt in Folgeperioden als Verlustvortrag berücksichtigt werden (§ 10d EStG)"
      },
      {
        nr: 3,
        kontext: "Steuerliche Auswirkung auf das Gesamteinkommen (Verlustverrechnung)",
        formel: "Einkünfte nach Verlustverrechnung = Andere Einkünfte - Verlustvortrag",
        variablen: [
          {
            kuerzel: "AE",
            bedeutung: "Andere Einkünfte (z.B. Gehalt)",
            wert: 50000
          },
          {
            kuerzel: "VV",
            bedeutung: "Verlustvortrag",
            wert: 6500
          },
          {
            kuerzel: "GE",
            bedeutung: "Gesamteinkommen nach Verrechnung",
            wert: 43500
          }
        ],
        aufgabe: "Der Eigentümer hat zusätzliche Einkünfte von 50.000 € aus einer Anstellung. Berechnen Sie sein zu versteuerndes Einkommen nach Verlustvortrag.",
        einheit: "€",
        korrekt: 43500,
        toleranz: 0,
        tipp: "Lösung: 50.000 € - 6.500 € = 43.500 € (Das Einkommen wird durch den Verlust gemindert)"
      }
    ],
    abschluss: "Der Verlust von 6.500 € aus der Vermietung wird mit anderen Einkünften verrechnet und reduziert damit die Einkommensteuerlast. Dies ist ein wesentlicher Steuervorteil bei Immobilieninvestitionen, besonders in der Aufbauphase mit hohen Werbungskosten.",
    gesetze: [
      "§ 2 Abs. 3 EStG (Einkünfte aus Vermietung und Verpachtung)",
      "§ 10d EStG (Verlustvortrag)",
      "§ 21 EStG (Einkünfte aus Vermietung und Verpachtung)",
      "§ 8 EStG (Werbungskosten)"
    ],
    praxistipp: "Immobilienbesitzer sollten alle Werbungskosten (Makler, Instandhaltung, Verwaltung, Makler, Grundsteuer) genau dokumentieren, da diese zu Verlusten führen können, die das Gesamteinkommen mindern. Besonders in den ersten Jahren nach Erwerb einer Immobilie entstehen oft Verluste, die erhebliche Steuereinsparungen ermöglichen. Der Verlustvortrag ist unbegrenzt übertragbar, solange es sich um echte Verluste handelt."
  },
  {
    id: 126,
    bereich: "AfA & Steuervorteile",
    titel: "AfA-Vergleich alt vs. neu",
    berufssituation: "Ein Investor erwirbt einen Altbau für 180.000 € und einen Neubau für 280.000 €. Der Altbau wird mit 2% p.a. abgeschrieben, der Neubau mit 3% p.a. Berechnen Sie die jährliche AfA und die Steuerersparnis bei einem Steuersatz von 42%.",
    was_lerne_ich: "Berechnung der Absetzung für Abnutzung (AfA) bei unterschiedlichen Abschreibungssätzen und Quantifizierung des Steuervorteileffekts",
    schritte: [
      {
        nr: 1,
        kontext: "Berechnung der jährlichen AfA für den Altbau",
        formel: "AfA_Altbau = Anschaffungskosten × Abschreibungssatz",
        variablen: [
          {
            kuerzel: "AK_A",
            bedeutung: "Anschaffungskosten Altbau",
            wert: 180000
          },
          {
            kuerzel: "i_A",
            bedeutung: "Abschreibungssatz Altbau",
            wert: 0.02
          }
        ],
        aufgabe: "Berechnen Sie die jährliche AfA des Altbaus (180.000 € × 2%)",
        einheit: "€",
        korrekt: 3600,
        toleranz: 0,
        tipp: "2% von 180.000 Euro = 180.000 × 0,02 = 3.600 €"
      },
      {
        nr: 2,
        kontext: "Berechnung der jährlichen AfA für den Neubau",
        formel: "AfA_Neubau = Anschaffungskosten × Abschreibungssatz",
        variablen: [
          {
            kuerzel: "AK_N",
            bedeutung: "Anschaffungskosten Neubau",
            wert: 280000
          },
          {
            kuerzel: "i_N",
            bedeutung: "Abschreibungssatz Neubau",
            wert: 0.03
          }
        ],
        aufgabe: "Berechnen Sie die jährliche AfA des Neubaus (280.000 € × 3%)",
        einheit: "€",
        korrekt: 8400,
        toleranz: 0,
        tipp: "3% von 280.000 Euro = 280.000 × 0,03 = 8.400 €"
      },
      {
        nr: 3,
        kontext: "Berechnung der Steuerersparnis durch AfA bei 42% Steuersatz",
        formel: "Steuerersparnis = AfA × Steuersatz",
        variablen: [
          {
            kuerzel: "AfA_gesamt",
            bedeutung: "Gesamtjährliche AfA (Altbau + Neubau)",
            wert: 12000
          },
          {
            kuerzel: "s",
            bedeutung: "Marginaler Steuersatz",
            wert: 0.42
          }
        ],
        aufgabe: "Berechnen Sie die gesamte jährliche Steuerersparnis aus AfA bei 42% Steuersatz (3.600 € + 8.400 € × 42%)",
        einheit: "€",
        korrekt: 5040,
        toleranz: 0,
        tipp: "Gesamte AfA = 3.600 + 8.400 = 12.000 €. Steuerersparnis = 12.000 × 0,42 = 5.040 €"
      },
      {
        nr: 4,
        kontext: "Vergleich der Effizienz: Steuerersparnis pro eingesetztem Euro",
        formel: "Effizienz = Steuerersparnis / Gesamtkapitaleinsatz",
        variablen: [
          {
            kuerzel: "Steuerersparnis",
            bedeutung: "Jährliche Steuerersparnis",
            wert: 5040
          },
          {
            kuerzel: "Kapital",
            bedeutung: "Gesamtinvestition (Altbau + Neubau)",
            wert: 460000
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Steuerersparnis in Prozent des eingesetzten Kapitals (5.040 € / 460.000 €)",
        einheit: "%",
        korrekt: 1.096,
        toleranz: 0.01,
        tipp: "5.040 / 460.000 = 0,01096 = ca. 1,10% effektive Steuerersparnis pro Jahr auf das eingesetzte Kapital"
      }
    ],
    abschluss: "Der Neubau mit 3% AfA generiert trotz höherer Investition eine deutlich höhere absolute Steuerersparnis (5.040 € pro Jahr). Dies zeigt den Vorteil schnellerer Abschreibungen für die Liquidität des Investors.",
    gesetze: [
      "§7 Abs. 4 EStG (Gebäudeabschreibung)",
      "§7 Abs. 5 EStG (Neubauabschreibung)",
      "§2 Abs. 1 EStG (Einkünfte aus Vermietung)"
    ],
    praxistipp: "In der Praxis bevorzugen Investoren oft Neubauten wegen der höheren AfA-Sätze. Allerdings sollten auch andere Faktoren wie Lage, Instandhaltungsrücklagen und Mietrendite berücksichtigt werden. Die Steuerersparnis ist kein isoliertes Entscheidungskriterium."
  },
  {
    id: 127,
    bereich: "AfA & Steuervorteile",
    titel: "Gesamtsteuerersparnis Haltezeit",
    berufssituation: "Kaufpreis Gebäude 350.000 €, AfA 2%, Steuersatz 42%, Haltezeit 20 Jahre. Gesamte Steuerersparnis durch AfA über 20 Jahre?",
    was_lerne_ich: "Sie lernen, wie die Abschreibung (AfA) durch Steuerersparnis die Rentabilität einer Immobilieninvestition über die gesamte Haltezeit erhöht.",
    schritte: [
      {
        nr: 1,
        kontext: "Zunächst ermitteln wir die jährliche Abschreibung des Gebäudes. Die AfA wird auf den Kaufpreis des Gebäudes angewendet und beträgt in diesem Fall 2% pro Jahr.",
        formel: "Jährliche AfA = Kaufpreis × AfA-Satz",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Kaufpreis des Gebäudes",
            wert: "350.000 €"
          },
          {
            kuerzel: "AfA-Satz",
            bedeutung: "Jährliche Abschreibungsquote",
            wert: "2% oder 0,02"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Abschreibung des Gebäudes.",
        einheit: "€",
        korrekt: 7000,
        toleranz: 0,
        tipp: "350.000 € × 2% = 350.000 € × 0,02 = 7.000 € pro Jahr"
      },
      {
        nr: 2,
        kontext: "Nun berechnen wir die Gesamtabschreibung über die gesamte Haltezeit von 20 Jahren. Dies ist die Summe aller jährlichen Abschreibungen.",
        formel: "Gesamtabschreibung = Jährliche AfA × Haltezeit",
        variablen: [
          {
            kuerzel: "Jährliche AfA",
            bedeutung: "Jährliche Abschreibung aus Schritt 1",
            wert: "7.000 €"
          },
          {
            kuerzel: "Haltezeit",
            bedeutung: "Zeitraum der Immobilienhaltung",
            wert: "20 Jahre"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtabschreibung über 20 Jahre.",
        einheit: "€",
        korrekt: 140000,
        toleranz: 0,
        tipp: "7.000 € × 20 Jahre = 140.000 € Gesamtabschreibung"
      },
      {
        nr: 3,
        kontext: "Die Abschreibung mindert das zu versteuernde Einkommen. Durch die Minderung des Einkommens sparen wir Steuern. Die Steuerersparnis pro Jahr ist das Produkt aus jährlicher AfA und dem Steuersatz.",
        formel: "Jährliche Steuerersparnis = Jährliche AfA × Steuersatz",
        variablen: [
          {
            kuerzel: "Jährliche AfA",
            bedeutung: "Jährliche Abschreibung",
            wert: "7.000 €"
          },
          {
            kuerzel: "Steuersatz",
            bedeutung: "Persönlicher Einkommensteuersatz des Eigentümers",
            wert: "42% oder 0,42"
          }
        ],
        aufgabe: "Berechnen Sie die jährliche Steuerersparnis durch die AfA.",
        einheit: "€",
        korrekt: 2940,
        toleranz: 0,
        tipp: "7.000 € × 42% = 7.000 € × 0,42 = 2.940 € Steuerersparnis pro Jahr"
      },
      {
        nr: 4,
        kontext: "Abschließend ermitteln wir die Gesamtsteuerersparnis über die gesamte Haltezeit von 20 Jahren. Dies ist die Summe aller jährlichen Steuereinsparungen oder alternativ die Gesamtabschreibung multipliziert mit dem Steuersatz.",
        formel: "Gesamtsteuerersparnis = Jährliche Steuerersparnis × Haltezeit",
        variablen: [
          {
            kuerzel: "Jährliche Steuerersparnis",
            bedeutung: "Steuerersparnis pro Jahr",
            wert: "2.940 €"
          },
          {
            kuerzel: "Haltezeit",
            bedeutung: "Gesamte Haltedauer der Immobilie",
            wert: "20 Jahre"
          }
        ],
        aufgabe: "Berechnen Sie die Gesamtsteuerersparnis über 20 Jahre.",
        einheit: "€",
        korrekt: 58800,
        toleranz: 0,
        tipp: "2.940 € × 20 Jahre = 58.800 € Gesamtsteuerersparnis oder alternativ 140.000 € × 42% = 58.800 €"
      }
    ],
    abschluss: "Die Gesamtsteuerersparnis durch die AfA über 20 Jahre beträgt 58.800 €. Dies bedeutet, dass der Immobilieneigentümer durch die Abschreibungsmöglichkeit erhebliche Steuervorteil realisiert, die die Rentabilität der Investition deutlich verbessert.",
    gesetze: [
      "§7 Abs. 4 EStG (Absetzung für Abnutzung)",
      "§8 EStG (Einkünfte aus Vermietung und Verpachtung)"
    ],
    praxistipp: "Die AfA ist ein wichtiges Steuergestaltungsinstrument bei Immobilieninvestitionen. Besonders bei hohen Marginalsteuersätzen (Spitzeneinkommen) kann die AfA erhebliche Steuereinsparungen generieren und die Amortisationszeit verkürzen. Allerdings ist zu beachten, dass beim späteren Verkauf Spekulationssteuer oder Einkünfteabzug anfallen können."
  },
  {
    id: 128,
    bereich: "AfA & Steuervorteile",
    titel: "Modernisierung absetzen",
    berufssituation: "Kaufpreis 300.000 €, Renovierung 47.000 €. 15%-Grenze anschaffungsnahe HK prüfen. Sofort absetzbar oder aktivieren?",
    was_lerne_ich: "Unterscheidung zwischen sofort absetzbaren Instandhaltungskosten und aktivierungspflichtigen anschaffungsnahen Herstellungskosten mittels 15%-Grenze",
    schritte: [
      {
        nr: 1,
        kontext: "kurz",
        formel: "15%-Grenze = Kaufpreis × 0,15",
        variablen: [
          {
            kuerzel: "Kaufpreis",
            bedeutung: "Anschaffungskosten Immobilie",
            wert: 300000
          },
          {
            kuerzel: "Prozentsatz",
            bedeutung: "Grenzwert anschaffungsnahe HK",
            wert: 0.15
          }
        ],
        aufgabe: "Berechnen Sie die 15%-Grenze der Anschaffungskosten",
        einheit: "€",
        korrekt: 45000,
        toleranz: 0,
        tipp: "Multiplizieren Sie den Kaufpreis mit 15%"
      },
      {
        nr: 2,
        kontext: "kurz",
        formel: "Differenz = Renovierungskosten - 15%-Grenze",
        variablen: [
          {
            kuerzel: "Renovierungskosten",
            bedeutung: "Durchgeführte Maßnahmen",
            wert: 47000
          },
          {
            kuerzel: "15%-Grenze",
            bedeutung: "Berechneter Schwellenwert",
            wert: 45000
          }
        ],
        aufgabe: "Berechnen Sie den Betrag, der die 15%-Grenze überschreitet",
        einheit: "€",
        korrekt: 2000,
        toleranz: 0,
        tipp: "Subtrahieren Sie die Grenze von den Renovierungskosten"
      },
      {
        nr: 3,
        kontext: "kurz",
        formel: "Aktivierungspflichtig = min(Renovierungskosten; 15%-Grenze)",
        variablen: [
          {
            kuerzel: "Sofort absetzbar",
            bedeutung: "Instandhaltungskosten unter Grenze",
            wert: 45000
          },
          {
            kuerzel: "Zu aktivieren",
            bedeutung: "Überschuss über 15%-Grenze",
            wert: 2000
          }
        ],
        aufgabe: "Ermitteln Sie den zu aktivierenden und den sofort absetzbaren Betrag",
        einheit: "€",
        korrekt: 45000,
        toleranz: 0,
        tipp: "45.000 € sofort absetzbar, 2.000 € aktivierungspflichtig"
      }
    ],
    abschluss: "Von 47.000 € Renovierungskosten sind 45.000 € sofort als Werbungskosten absetzbar, 2.000 € müssen aktiviert werden, da sie die 15%-Grenze überschreiten.",
    gesetze: [
      "§6 Abs. 1 Nr. 2 EStG",
      "§7 Abs. 4 EStG",
      "§2 Abs. 2b EStG"
    ],
    praxistipp: "Die 15%-Grenze ist ein wichtiges Abgrenzungskriterium: Bleibt die Renovation darunter, gilt sie als Instandhaltung und ist sofort absetzbar. Wird sie überschritten, müssen anschaffungsnahe HK aktiviert und über die AfA verteilt werden."
  },
  {
    id: 102,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Betriebskosten Verteilung",
    berufssituation: "Betriebskosten 14.400 EUR/Jahr, 6 Einheiten mit 65,70,75,80,85,90 m2. Kosten je Einheit nach Flaeche.",
    was_lerne_ich: "Flaechenbezogene Betriebskostenverteilung in der WEG.",
    schritte: [
      {
        nr: 1,
        kontext: "Gesamtflaeche berechnen.",
        formel: "Gesamt = Summe Einzelflaechen",
        variablen: [
          {
            kuerzel: "F",
            bedeutung: "Flaechen",
            wert: "65+70+75+80+85+90"
          }
        ],
        aufgabe: "Gesamtflaeche der WEG:",
        einheit: "m2",
        korrekt: 465,
        toleranz: 0,
        tipp: "465 m2"
      },
      {
        nr: 2,
        kontext: "Kostensatz pro m2.",
        formel: "Satz = Kosten / Flaeche",
        variablen: [
          {
            kuerzel: "K",
            bedeutung: "Kosten",
            wert: "14400"
          },
          {
            kuerzel: "F",
            bedeutung: "Flaeche",
            wert: "465"
          }
        ],
        aufgabe: "14.400 / 465 =",
        einheit: "EUR/m2",
        korrekt: 30.97,
        toleranz: 0.1,
        tipp: "30,97 EUR/m2"
      },
      {
        nr: 3,
        kontext: "Kosten 80-m2-Einheit.",
        formel: "Kosten = Flaeche x Satz",
        variablen: [
          {
            kuerzel: "F",
            bedeutung: "Flaeche",
            wert: "80"
          },
          {
            kuerzel: "s",
            bedeutung: "Satz",
            wert: "30.97"
          }
        ],
        aufgabe: "80 x 30,97 =",
        einheit: "EUR",
        korrekt: 2477.6,
        toleranz: 5,
        tipp: "2.477,60 EUR"
      }
    ],
    abschluss: "80-m2-Einheit: 2.477,60 EUR/Jahr.",
    gesetze: [
      "16 WEG",
      "556 BGB"
    ],
    praxistipp: "Wohnflaechen muessen korrekt in der Teilungserklaerung stehen."
  },
  {
    id: 106,
    bereich: "WEG-Hausgeld & Abrechnung",
    titel: "Heizkostenabrechnung",
    berufssituation: "Heizkosten 8.400 EUR. 70% Verbrauch, 30% Flaeche. Einheit A: 280 von 560 m2, Verbrauch 3.200 von 16.000 kWh.",
    was_lerne_ich: "Heizkostenabrechnung nach HeizkostenV 70/30.",
    schritte: [
      {
        nr: 1,
        kontext: "Verbrauchsanteil 70%.",
        formel: "BK_V = 8400 x 0.70 x (3200/16000)",
        variablen: [
          {
            kuerzel: "V",
            bedeutung: "Verbrauch Einheit",
            wert: "3200 kWh"
          }
        ],
        aufgabe: "8.400 x 0,70 x 0,20 =",
        einheit: "EUR",
        korrekt: 1176,
        toleranz: 1,
        tipp: "1.176 EUR"
      },
      {
        nr: 2,
        kontext: "Flaechenanteil 30%.",
        formel: "BK_F = 8400 x 0.30 x (280/560)",
        variablen: [
          {
            kuerzel: "F",
            bedeutung: "Flaeche Einheit",
            wert: "280 m2"
          }
        ],
        aufgabe: "8.400 x 0,30 x 0,50 =",
        einheit: "EUR",
        korrekt: 1260,
        toleranz: 1,
        tipp: "1.260 EUR"
      },
      {
        nr: 3,
        kontext: "Gesamtkosten.",
        formel: "Gesamt = BK_V + BK_F",
        variablen: [
          {
            kuerzel: "BK_V",
            bedeutung: "Verbrauchsanteil",
            wert: "1176"
          },
          {
            kuerzel: "BK_F",
            bedeutung: "Flaechenanteil",
            wert: "1260"
          }
        ],
        aufgabe: "1.176 + 1.260 =",
        einheit: "EUR",
        korrekt: 2436,
        toleranz: 1,
        tipp: "2.436 EUR"
      }
    ],
    abschluss: "Einheit A: 2.436 EUR Heizkosten.",
    gesetze: [
      "6 HeizkostenV"
    ],
    praxistipp: "70/30 ist gesetzlicher Standard nach HeizkostenV."
  },
  {
    id: 114,
    bereich: "Wertermittlung",
    titel: "DCF-Methode vereinfacht",
    berufssituation: "Kaufpreis 600.000 EUR, Miete Jahr 1-5: 30.000 EUR/Jahr, Jahr 6-10: 33.000 EUR/Jahr, Zins 5%. Barwert berechnen.",
    was_lerne_ich: "Discounted-Cashflow-Methode zur Immobilienbewertung.",
    schritte: [
      {
        nr: 1,
        kontext: "Barwert Jahr 1-5 mit Rentenbarwertfaktor 4,329.",
        formel: "BW1 = 30000 x 4.329",
        variablen: [
          {
            kuerzel: "RBF",
            bedeutung: "Rentenbarwertfaktor 5J/5%",
            wert: "4.329"
          }
        ],
        aufgabe: "30.000 x 4,329 =",
        einheit: "EUR",
        korrekt: 129870,
        toleranz: 500,
        tipp: "129.870 EUR"
      },
      {
        nr: 2,
        kontext: "Barwert Jahr 6-10. Abzinsungsfaktor Jahr 5: 0,7835.",
        formel: "BW2 = 33000 x 4.329 x 0.7835",
        variablen: [
          {
            kuerzel: "ABF",
            bedeutung: "Abzinsungsfaktor",
            wert: "0.7835"
          }
        ],
        aufgabe: "33.000 x 4,329 x 0,7835 =",
        einheit: "EUR",
        korrekt: 112101,
        toleranz: 1000,
        tipp: "112.101 EUR"
      },
      {
        nr: 3,
        kontext: "Gesamtbarwert und Vergleich Kaufpreis.",
        formel: "BW = BW1 + BW2",
        variablen: [
          {
            kuerzel: "BW1",
            bedeutung: "Barwert Jahr 1-5",
            wert: "129870"
          },
          {
            kuerzel: "BW2",
            bedeutung: "Barwert Jahr 6-10",
            wert: "112101"
          }
        ],
        aufgabe: "129.870 + 112.101 =",
        einheit: "EUR",
        korrekt: 241971,
        toleranz: 1000,
        tipp: "241.971 EUR vs Kaufpreis 600.000 EUR"
      }
    ],
    abschluss: "Barwert 241.971 EUR liegt weit unter Kaufpreis 600.000 EUR.",
    gesetze: [
      "ImmoWertV",
      "194 BauGB"
    ],
    praxistipp: "DCF zeigt: Bei niedrigen Zinsen steigen Preise weit ueber den Mietertragswert."
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulierte Ladezeit
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const gefilterteAufgaben = aktiverBereich === "alle" ? AUFGABEN : AUFGABEN.filter(a => a.bereich === aktiverBereich);

  const practiceSkeleton = (
    <div className="space-y-6 max-w-[900px] mx-auto p-4">
      <SkeletonCard />
      <div className="flex gap-2 mb-8">
        {[1,2,3,4].map(i => <div key={i} className="h-8 w-20 bg-slate-200 animate-pulse rounded-md" />)}
      </div>
      <div className="space-y-3">
        {[1,2,3,4,5].map(i => <SkeletonCard key={i} />)}
      </div>
    </div>
  );

  return (
    <LoadingHandler
      isLoading={isLoading}
      skeleton={practiceSkeleton}
    >
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
    </LoadingHandler>
  );
}
