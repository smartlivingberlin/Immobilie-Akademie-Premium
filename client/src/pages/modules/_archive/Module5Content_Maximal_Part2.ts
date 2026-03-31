// Maximalist Content for Module 5 (Prüfung & §34i) - Days 21-40
// Focus: Advanced Finance, Legal Cases, and Intensive Exam Preparation

export const contentDataModule5MaximalPart2 = {
  // Tag 21: Spezialfinanzierungen & Bauträger
  day_21: {
    title: "Spezialfinanzierungen & Bauträgergeschäft",
    type: "Vertiefung",
    theory: `
# Finanzierung jenseits des Standards

## 1. Bauträgerfinanzierung
- **Besonderheit:** Zahlung nach Baufortschritt (MaBV-Raten).
- **Risiko:** Fertigstellungsrisiko (Insolvenz des Bauträgers).
- **Sicherheit:** Vormerkung im Grundbuch, Fertigstellungsbürgschaft.

## 2. Gewerbliche Finanzierung
- **Objekte:** Bürohäuser, Lagerhallen, Hotels.
- **Prüfung:** Cashflow-orientiert (Debt Service Coverage Ratio - DSCR).
- **Laufzeiten:** Oft kürzer (5-10 Jahre), höhere Tilgung.

## 3. Vollfinanzierung (110%-Finanzierung)
- Finanzierung von Kaufpreis + Nebenkosten.
- Nur bei top Bonität möglich.
- Zinsaufschlag wegen hohem Risiko (Blankoanteil).
    `,
    law: ["Makler- und Bauträgerverordnung (MaBV)"],
    practice: `
# Analyse eines MaBV-Zahlungsplans

Prüfen Sie einen Ratenplan auf Konformität mit § 3 MaBV:
- 30% nach Erdarbeiten? (Erlaubt).
- 28% nach Rohbau? (Erlaubt).
- 10% vor Baubeginn? (Verboten!).
    `,
    task: {
      question: "Ein Kunde hat 90% bezahlt, das Haus ist aber erst zu 60% fertig. Der Bauträger ist pleite. Welche Rechte hat der Kunde?",
      solution: "Der Kunde kann die Fertigstellungsbürgschaft (meist 5% der Bausumme) in Anspruch nehmen oder Schadenersatz fordern. In der Praxis oft schwierig, daher MaBV-Ratenplan strikt einhalten!"
    }
  },

  // Tag 22: Steuerliche Aspekte der Finanzierung
  day_22: {
    title: "Steuern & Immobilienfinanzierung",
    type: "Steuer",
    theory: `
# Der Fiskus finanziert mit

## 1. Vermietete Immobilien (V+V)
- **Schuldzinsen:** Als Werbungskosten voll absetzbar (§ 9 EStG).
- **Disagio:** Im Jahr der Zahlung absetzbar (unter Bedingungen).
- **Abschreibung (AfA):** Linear 2% (Altbau) / 3% (Neubau ab 2023).

## 2. Eigennutzung
- Keine Werbungskosten absetzbar.
- Keine Versteuerung des Wohnwerts.
- Förderung: Riester, Baukindergeld (ausgelaufen), KfW-Zuschüsse.

## 3. Spekulationssteuer (§ 23 EStG)
- **Frist:** 10 Jahre bei Vermietung.
- **Ausnahme:** Eigennutzung im Verkaufsjahr + 2 Vorjahre.
    `,
    law: ["§ 9 EStG (Werbungskosten)", "§ 23 EStG (Private Veräußerungsgeschäfte)"],
    practice: `
# Steuer-Rechner

Kaufpreis: 500.000 € (davon 400.000 € Gebäude).
Mieteinnahmen: 20.000 €.
Zinsen: 15.000 €.
AfA: 3% von 400.000 € = 12.000 €.
Bewirtschaftung: 3.000 €.

Ergebnis: 20.000 - 15.000 - 12.000 - 3.000 = -10.000 € (Verlust).
Steuervorteil bei 42% Grenzsteuersatz: 4.200 € Erstattung.
    `,
    task: {
      question: "Ein Kunde will eine ETW kaufen, 3 Jahre vermieten und dann selbst einziehen. Kann er die Kaufnebenkosten absetzen?",
      solution: "Ja, als Werbungskosten (Abschreibung), solange die Vermietungsabsicht besteht. Bei Eigennutzung endet die Absetzbarkeit."
    }
  },

  // Tag 23: Rechtliche Fallstricke & Verbraucherschutz
  day_23: {
    title: "Verbraucherschutz & Widerruf",
    type: "Recht",
    theory: `
# Der geschützte Kreditnehmer

## 1. Widerrufsrecht (§ 355 BGB)
- Frist: 14 Tage ab Vertragsschluss und Erhalt der Belehrung.
- "Ewiges Widerrufsrecht": Wenn Belehrung fehlerhaft war (heute seltener, da Muster verwendet werden).

## 2. Vorfälligkeitsentschädigung (§ 502 BGB)
- Bank darf Schadenersatz verlangen bei Kündigung innerhalb der Zinsbindung.
- Ausnahme: Nach 10 Jahren (§ 489 BGB) immer kostenlos kündbar (6 Monate Frist).

## 3. Kopplungsgeschäfte
- Verbot, den Kredit an den Abschluss einer Versicherung zu koppeln (außer zur Kreditsicherung, z.B. Wohngebäude).
    `,
    law: ["§ 355 BGB", "§ 489 BGB", "§ 502 BGB"],
    practice: "Prüfung einer Widerrufsbelehrung auf Vollständigkeit (Pflichtangaben).",
    task: {
      question: "Wann darf ein Kunde seinen Kreditvertrag widerrufen, obwohl die 14 Tage vorbei sind?",
      solution: "Wenn die Widerrufsbelehrung fehlerhaft war oder fehlte. In diesem Fall beginnt die Frist nicht zu laufen (max. 1 Jahr und 14 Tage nach Vertragsschluss)."
    }
  },

  // Tag 24: KfW & Förderbanken
  day_24: {
    title: "Staatliche Förderungen (KfW)",
    type: "Finanzierung",
    theory: `
# Geschenktes Geld vom Staat?

Die Kreditanstalt für Wiederaufbau (KfW) fördert Wohneigentum und Energieeffizienz.

## Programme
- **Wohneigentumsprogramm (124):** Für Selbstnutzer, bis 100.000 €.
- **Klimafreundlicher Neubau (297/298):** Zinsverbilligte Kredite für EH 40 Standard.
- **Sanierung (261):** Kredit mit Tilgungszuschuss (Geld, das man nicht zurückzahlen muss!).

## Antragstellung
- "Durchleitungsprinzip": Antrag immer über die Hausbank, nie direkt bei der KfW.
- Antrag MUSS vor Vorhabenbeginn gestellt werden!
    `,
    law: ["KfW-Merkblätter"],
    practice: "Integration eines KfW-Darlehens in einen Finanzierungsplan (Mischkalkulation).",
    task: {
      question: "Was passiert, wenn der Kunde den Kaufvertrag unterschreibt, bevor der KfW-Antrag gestellt wurde?",
      solution: "Die Förderung ist in der Regel verloren! Ausnahme: Es wurde ein Beratungsgespräch dokumentiert, das den Förderantrag als geplant festhält (vorhabenbezogene Beratung)."
    }
  },

  // Tag 25: Unterlagen-Management
  day_25: {
    title: "Die perfekte Finanzierungsakte",
    type: "Praxis",
    theory: `
# Ohne Unterlagen kein Kredit

Eine vollständige Akte beschleunigt die Kreditentscheidung massiv.

## 1. Objektunterlagen
- Grundbuchauszug (aktuell!).
- Flurkarte.
- Bauzeichnungen, Wohnflächenberechnung.
- Fotos (Innen/Außen).
- Energieausweis.

## 2. Bonitätsunterlagen
- Gehaltsabrechnungen (letzte 3 Monate + Dezember Vorjahr).
- Steuerbescheide (letzte 2 Jahre).
- Eigenkapitalnachweis (Kontoauszüge).
- Personalausweis.
    `,
    law: [],
    practice: "Erstellen einer Checkliste für den Kunden: 'Was ich von Ihnen brauche'.",
    task: {
      question: "Warum will die Bank auch die Rückseite des Personalausweises sehen?",
      solution: "Weil dort die aktuelle Meldeadresse steht. Diese ist wichtig für die Bonitätsprüfung und Postzustellung."
    }
  },

  // Tag 26: Banken-Auswahl & Plattformen
  day_26: {
    title: "Bankenpartner & Plattformen",
    type: "Markt",
    theory: `
# Woher kommt das Geld?

## 1. Regionalbanken (Sparkassen, Volksbanken)
- Stärke: Kennen den lokalen Markt, flexibel bei schwierigen Fällen.
- Schwäche: Oft teurer, regional begrenzt.

## 2. Großbanken (Commerzbank, Deutsche Bank)
- Stärke: Schnelle Prozesse, bundesweit.
- Schwäche: Standardisierte Prozesse ("Computer sagt nein").

## 3. Versicherungen
- Stärke: Sehr lange Zinsbindungen (30 Jahre), günstige Zinsen.
- Schwäche: Nur top Bonität, keine Flexibilität.

## 4. Plattformen (Europace, Ehyp)
- Marktplatz für Vermittler: Ein Antrag an 400 Banken.
    `,
    law: [],
    practice: "Vergleich von Konditionen: Sparkasse vs. Online-Bank.",
    task: {
      question: "Für welchen Kunden ist eine Versicherung der bessere Finanzierungspartner als eine Bank?",
      solution: "Für Sicherheitsbewusste Kunden mit sehr guter Bonität, die den Zins für sehr lange Zeit (20-30 Jahre) festschreiben wollen."
    }
  },

  // Tag 27: Umschuldung & Forward-Darlehen
  day_27: {
    title: "Anschlussfinanzierung & Forward",
    type: "Finanzierung",
    theory: `
# Nach der Zinsbindung ist vor der Zinsbindung

## 1. Prolongation
- Verlängerung bei der gleichen Bank. Einfach, aber oft schlechtere Konditionen ("Faulheits-Aufschlag").

## 2. Umschuldung
- Wechsel zu einer neuen Bank.
- Kosten: Abtretung der Grundschuld (ca. 0,2% der Summe).
- Lohnt sich oft schon bei 0,1% Zinsvorteil.

## 3. Forward-Darlehen
- Zinssicherung bis zu 5 Jahre im Voraus.
- Aufschlag: Je länger im Voraus, desto teurer (Forward-Aufschlag).
    `,
    law: [],
    practice: "Berechnung: Lohnt sich das Forward-Darlehen mit 0,5% Aufschlag gegenüber dem Risiko steigender Zinsen?",
    task: {
      question: "Wann beginnt die Tilgung bei einem Forward-Darlehen, das heute abgeschlossen wird, aber erst in 3 Jahren ausgezahlt wird?",
      solution: "Erst nach Auszahlung des Darlehens in 3 Jahren. Bis dahin zahlt der Kunde nichts (keine Bereitstellungszinsen)."
    }
  },

  // Tag 28: Beratungsprotokoll & Dokumentation
  day_28: {
    title: "Haftungssicher Dokumentieren",
    type: "Recht",
    theory: `
# Wer schreibt, der bleibt

Die Dokumentation ist Ihre Lebensversicherung gegen Haftungsklagen.

## Inhalte des Beratungsprotokolls (§ 11 ImmVermV)
- Anlass der Beratung.
- Kundenwünsche und -ziele.
- Empfohlene Produkte.
- Begründung der Empfehlung.
- Nicht empfohlene Produkte (und warum).

## Form
- Schriftform (oder Textform).
- Muss dem Kunden VOR Vertragsschluss ausgehändigt werden.
    `,
    law: ["§ 11 ImmVermV (Beratungsprotokoll)"],
    practice: "Fehleranalyse in einem Protokoll: 'Kunde wollte billigsten Zins' (Zu ungenau!).",
    task: {
      question: "Formulieren Sie eine rechtssichere Begründung für die Empfehlung eines Bauspar-Kombikredits.",
      solution: "Empfehlung zur Zinssicherung über die gesamte Laufzeit, da Kunde Planungssicherheit als höchstes Ziel nannte und Zinsänderungsrisiko ausschließen möchte."
    }
  },

  // Tag 29: Geldwäschegesetz (GwG)
  day_29: {
    title: "Geldwäscheprävention",
    type: "Recht",
    theory: `
# Know Your Customer (KYC)

Immobilien sind ein beliebtes Ziel für Geldwäsche. Makler und Vermittler sind Verpflichtete nach dem GwG.

## Pflichten
- **Identifizierung:** Ausweis prüfen und kopieren.
- **Wirtschaftlich Berechtigter:** Wer steht hinter der Briefkastenfirma?
- **PeP-Prüfung:** Politisch exponierte Personen (erhöhtes Risiko).
- **Verdachtsmeldung:** Bei der FIU (Financial Intelligence Unit) melden.
    `,
    law: ["Geldwäschegesetz (GwG)"],
    practice: "Simulation einer Identifizierung. Woran erkennen Sie einen gefälschten Ausweis?",
    task: {
      question: "Dürfen Sie dem Kunden sagen, dass Sie eine Verdachtsmeldung gemacht haben?",
      solution: "Nein! Es gilt das 'Tipping-off'-Verbot (§ 47 GwG). Der Kunde darf nicht gewarnt werden."
    }
  },

  // Tag 30: Risikomanagement & Versicherungen
  day_30: {
    title: "Risikoabsicherung für Kreditnehmer",
    type: "Versicherung",
    theory: `
# Wenn das Leben dazwischenkommt

Eine Finanzierung läuft 20-30 Jahre. Risiken müssen abgesichert sein.

## 1. Todesfallschutz
- **Risikolebensversicherung (RLV):** Absicherung der Restschuld für Hinterbliebene.
- **Verbundene RLV:** Für Partner (zahlt beim ersten Todesfall).

## 2. Einkommenssicherung
- **Berufsunfähigkeitsversicherung (BU):** Wichtigste Absicherung!
- **Krankentagegeld:** Schließt Lücke zum Netto nach 6 Wochen.

## 3. Objektschutz
- **Wohngebäudeversicherung:** Pflicht (Feuer) für die Bank.
- **Elementarschadenversicherung:** Hochwasser, Starkregen (immer wichtiger!).
    `,
    law: ["Versicherungsvertragsgesetz (VVG)"],
    practice: "Bedarfsanalyse: Versorgungslücke berechnen.",
    task: {
      question: "Warum stehen Bank-Restschuldversicherungen oft in der Kritik?",
      solution: "Oft zu teuer, unflexibel und mit vielen Ausschlüssen im Kleingedruckten. Eine separate Risikolebensversicherung ist meist günstiger und besser."
    }
  },
  
  // Tag 31: Intensivtraining: Rechenaufgaben I
  day_31: {
    title: "Intensivtraining: Rechenaufgaben I",
    type: "Praxis",
    theory: `
# Rechnen bis der Kopf raucht

In der Prüfung müssen Sie Finanzierungspläne unter Zeitdruck erstellen.

## Wichtige Formeln
- **Zins:** Kapital * Zinssatz / 100
- **Tilgung:** Rate - Zins
- **Laufzeit:** ln(Rate/Zins) / ln(1+Zins) (Komplex, meist Tabelle nutzen)
    `,
    law: [],
    practice: "Erstellen von 3 kompletten Finanzierungsplänen.",
    task: {
      question: "Berechnen Sie die monatliche Rate: 350.000 € Darlehen, 4,2% Zins, 1,5% Tilgung.",
      solution: "Zins+Tilgung = 5,7%. 350.000 * 5,7% = 19.950 € p.a. / 12 = 1.662,50 € monatlich."
    }
  },

  // Tag 32: Intensivtraining: Rechenaufgaben II
  day_32: {
    title: "Intensivtraining: Rechenaufgaben II",
    type: "Praxis",
    theory: `
# Vorfälligkeit und Rendite

## Vorfälligkeitsentschädigung (VFE)
- Grobe Schätzung: Zinsdifferenz * Restlaufzeit * Restschuld.

## Mietrendite
- Brutto: Jahreskaltmiete / Kaufpreis * 100.
- Netto: (Jahreskaltmiete - Bewirtschaftung) / (Kaufpreis + Nebenkosten) * 100.
    `,
    law: [],
    practice: "Renditeberechnung für Kapitalanleger.",
    task: {
      question: "Kaufpreis 200.000 €, Miete 8.000 €, Nebenkosten 20.000 €, Bewirtschaftung 1.000 €. Berechnen Sie die Netto-Mietrendite.",
      solution: "(8.000 - 1.000) / (200.000 + 20.000) * 100 = 7.000 / 220.000 * 100 = 3,18%."
    }
  },

  // Tag 33: Fallstudien: Beratungspraxis I
  day_33: {
    title: "Fallstudie: Junge Familie",
    type: "Praxis",
    theory: `
# Szenario: Familie, 2 Kinder, wenig Eigenkapital

## Herausforderungen
- Hohe Belastung durch Kinder.
- Wenig Rücklagen.
- Wunsch nach Sicherheit.

## Lösungsansätze
- KfW-Förderung nutzen.
- Lange Zinsbindung (20 Jahre).
- Tilgungssatzwechsel vereinbaren (Flexibilität).
    `,
    law: [],
    practice: "Erstellen eines Finanzierungsvorschlags für Familie Mustermann.",
    task: {
      question: "Warum ist ein Volltilger-Darlehen für junge Familien oft riskant?",
      solution: "Weil die Rate sehr hoch ist und keine Flexibilität bietet, wenn mal ein Gehalt wegfällt (Elternzeit, Krankheit)."
    }
  },

  // Tag 34: Fallstudien: Beratungspraxis II
  day_34: {
    title: "Fallstudie: Der Kapitalanleger",
    type: "Praxis",
    theory: `
# Szenario: Gutverdiener, Steueroptimierung

## Herausforderungen
- Steuerliche Aspekte dominieren.
- Hebelwirkung (Leverage-Effekt) nutzen.

## Lösungsansätze
- Wenig Eigenkapital einsetzen (Zinsen absetzen).
- Endfälliges Darlehen prüfen.
    `,
    law: [],
    practice: "Optimierung der Eigenkapitalrendite.",
    task: {
      question: "Was besagt der Leverage-Effekt?",
      solution: "Die Eigenkapitalrendite steigt durch den Einsatz von Fremdkapital, solange die Gesamtkapitalrendite höher ist als der Fremdkapitalzins."
    }
  },

  // Tag 35: Prüfungssimulation: Schriftlich I
  day_35: {
    title: "Prüfungssimulation: Recht & WIKR",
    type: "Prüfung",
    theory: `
# Testen Sie Ihr Wissen

Schwerpunkt: Rechtliche Rahmenbedingungen, WIKR, Verbraucherschutz.
    `,
    law: [],
    practice: "Bearbeiten eines Muster-Prüfungsbogens (60 Minuten).",
    task: {
      question: "Was ist der Unterschied zwischen einem Immobiliardarlehensvermittler und einem Honorar-Immobiliardarlehensberater?",
      solution: "Der Vermittler erhält Provision von der Bank. Der Berater wird vom Kunden bezahlt und darf keine Provision annehmen (§ 34i Abs. 5 GewO)."
    }
  },

  // Tag 36: Prüfungssimulation: Schriftlich II
  day_36: {
    title: "Prüfungssimulation: Finanzierung & Produkte",
    type: "Prüfung",
    theory: `
# Testen Sie Ihr Wissen

Schwerpunkt: Finanzprodukte, Rechenaufgaben, Steuern.
    `,
    law: [],
    practice: "Bearbeiten eines Muster-Prüfungsbogens (60 Minuten).",
    task: {
      question: "Nennen Sie 3 Nachteile eines Bausparvertrags in der Ansparphase.",
      solution: "1. Niedrige Guthabenzinsen (Inflation frisst Geld). 2. Abschlussgebühr (Kosten). 3. Zuteilungstermin ungewiss (nicht garantiert)."
    }
  },

  // Tag 37: Vorbereitung mündliche Prüfung I
  day_37: {
    title: "Das Kundengespräch (Mündliche Prüfung)",
    type: "Prüfung",
    theory: `
# Der Ablauf der praktischen Prüfung

- 20 Minuten Vorbereitungszeit (Fallvorgabe).
- 20 Minuten Gesprächssimulation mit Prüfern (Kunden).

## Bewertungskriterien
- Kundenorientierung.
- Sachrichtigkeit.
- Strukturierte Gesprächsführung.
    `,
    law: [],
    practice: "Üben der Gesprächseröffnung und Bedarfsanalyse.",
    task: {
      question: "Wie reagieren Sie, wenn der Kunde (Prüfer) eine unrealistische Zinsvorstellung hat?",
      solution: "Nicht widersprechen ('Das geht nicht'), sondern aufklären: Marktübersicht zeigen, Zinsentwicklung erklären, Alternativen anbieten."
    }
  },

  // Tag 38: Vorbereitung mündliche Prüfung II
  day_38: {
    title: "Umgang mit Einwänden",
    type: "Prüfung",
    theory: `
# Einwandbehandlung

- **Vorwegnahme-Methode:** Einwand vorwegnehmen ('Sie werden sich fragen...').
- **Ja-Aber-Methode:** Verständnis zeigen, dann Argument bringen.
- **Bumerang-Methode:** Einwand in Argument umwandeln.
    `,
    law: [],
    practice: "Rollenspiel: Kunde sagt 'Das ist mir zu teuer'.",
    task: {
      question: "Der Kunde sagt: 'Ich überlege mir das noch mal'. Wie reagieren Sie?",
      solution: "Fragen Sie nach dem konkreten Grund ('Was genau lässt Sie noch zögern?'). Oft fehlt nur eine Information oder Sicherheit."
    }
  },

  // Tag 39: Der letzte Schliff
  day_39: {
    title: "Wiederholung & Lücken schließen",
    type: "Wiederholung",
    theory: `
# Alles auf einen Blick

Gehen Sie Ihre Notizen durch. Wo sind noch Unsicherheiten?
    `,
    law: [],
    practice: "Freies Wiederholen der schwierigsten Themen.",
    task: {
      question: "Nennen Sie die 5 Phasen eines Verkaufsgesprächs.",
      solution: "1. Begrüßung/Smalltalk. 2. Bedarfsanalyse. 3. Angebotspräsentation. 4. Einwandbehandlung. 5. Abschluss."
    }
  },

  // Tag 40: Prüfungstag & Abschluss
  day_40: {
    title: "Der Prüfungstag & Ausblick",
    type: "Abschluss",
    theory: `
# Viel Erfolg!

Sie sind gut vorbereitet. Bleiben Sie ruhig und konzentriert.

## Tipps für die Prüfung
- Fragen genau lesen.
- Bei der mündlichen Prüfung: Laut denken!
- Pünktlich sein.
    `,
    law: [],
    practice: "Entspannungsübungen und mentale Vorbereitung.",
    task: {
      question: "Was tun Sie als Erstes, wenn Sie die Prüfung bestanden haben?",
      solution: "Sich freuen, feiern und dann die Registrierung im Vermittlerregister beantragen!"
    }
  }
};
