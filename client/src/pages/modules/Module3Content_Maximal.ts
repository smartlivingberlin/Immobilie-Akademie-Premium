
import { contentDataModule3MaximalMissingDays } from './Module3Content_Maximal_MissingDays';

export const contentDataModule3Maximal = {
  // Tag 1: Einführung in die WEG-Verwaltung
  day_1: {
    title: "Einführung in die WEG-Verwaltung",
    type: "Grundlagen",
    theory: `
# Die WEG-Verwaltung: Das Herzstück der Immobilienbetreuung

Die Verwaltung von Wohnungseigentümergemeinschaften (WEG) ist die Königsdisziplin der Immobilienverwaltung. Sie erfordert fundiertes juristisches, kaufmännisches und technisches Wissen.

## 1. Das Wohnungseigentumsgesetz (WEG)
Das WEG regelt das Verhältnis der Wohnungseigentümer untereinander und zur Verwaltung.
- **Sondereigentum:** Die Wohnung selbst (alles "hinter der Wohnungstür", was verändert werden kann, ohne andere zu beeinträchtigen).
- **Gemeinschaftseigentum:** Das Grundstück, das Gebäude (Dach, Fassade, Fenster, tragende Wände) und technische Anlagen.
- **Teileigentum:** Räume, die nicht zu Wohnzwecken dienen (Büros, Garagen).

## 2. Die Organe der WEG
- **Die Eigentümerversammlung (ETV):** Das oberste Beschlussorgan. Hier werden alle wichtigen Entscheidungen getroffen (Wirtschaftsplan, Sanierungen, Verwalterbestellung).
- **Der Verwalter:** Das ausführende Organ. Er setzt die Beschlüsse um, verwaltet die Gelder und sorgt für die Instandhaltung.
- **Der Verwaltungsbeirat:** Ein Prüf- und Unterstützungsorgan aus den Reihen der Eigentümer (meist 3 Personen). Er prüft die Abrechnung und unterstützt den Verwalter.

## 3. Die Aufgaben des Verwalters (§ 27 WEG)
Das Gesetz unterscheidet nicht mehr strikt zwischen "Notwendigen Aufgaben" und "Dringenden Aufgaben", sondern definiert die Vertretungsmacht umfassend.
- **Kaufmännisch:** Hausgeldabrechnung, Wirtschaftsplan, Buchhaltung, Mahnwesen.
- **Technisch:** Instandhaltung, Instandsetzung, Wartung, Modernisierung.
- **Rechtlich:** Vertretung der WEG gegenüber Dritten, Durchsetzung der Hausordnung.

## 4. Die WEG-Reform 2020
Die Reform hat die Position des Verwalters gestärkt, aber auch die Rechte der Eigentümer erweitert.
- **Zertifizierter Verwalter:** Ab 1.12.2023 haben Eigentümer Anspruch auf einen zertifizierten Verwalter (Sachkundenachweis).
- **Bauliche Veränderungen:** Wurden vereinfacht (Privilegierung von E-Mobilität, Einbruchschutz, Glasfaser).
- **Beschlussfähigkeit:** Die ETV ist nun immer beschlussfähig, unabhängig von der Anzahl der anwesenden Miteigentumsanteile (MEA).
    `,
    law: [
      "[§ 1 WEG](https://www.gesetze-im-internet.de/weg/__1.html) (Begriffsbestimmungen)",
      "§ 5 WEG (Sondereigentum)",
      "[§ 18 WEG](https://www.gesetze-im-internet.de/weg/__18.html) (Verwaltung)",
      "[§ 26 WEG](https://www.gesetze-im-internet.de/weg/__26.html) (Bestellung und Abberufung des Verwalters)",
      "§ 27 WEG (Aufgaben und Befugnisse des Verwalters)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Einführung in die WEG-Verwaltung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Einführung in die WEG-Verwaltung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Einführung in die WEG-Verwaltung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Praxis-Fall: Die erste Eigentümerversammlung

Sie übernehmen eine neue WEG mit 20 Einheiten. Die Stimmung ist angespannt, da der Vorverwalter Gelder veruntreut hat.

## Ihre Vorbereitung (Checkliste):
1.  **Bestandsaufnahme:** Prüfung der Teilungserklärung, Gemeinschaftsordnung und Beschluss-Sammlung.
2.  **Konto-Check:** Sind die Konten auf den Namen der WEG (offene Fremdgeldkonten) eingerichtet?
3.  **Versicherungen:** Besteht ausreichender Versicherungsschutz (Gebäudeversicherung, Haftpflicht)?
4.  **Einladung:** Fristgerechte Ladung (Textform, 3 Wochen Frist gem. § 24 Abs. 4 WEG).

## Tagesordnung (Beispiel):
TOP 1: Begrüßung und Feststellung der Beschlussfähigkeit.
TOP 2: Bericht des Verwalters über die aktuelle Situation.
TOP 3: Beschlussfassung über die Jahresabrechnung (sofern vorhanden).
TOP 4: Beschlussfassung über den Wirtschaftsplan.
TOP 5: Verschiedenes.

**Tipp:** Bleiben Sie sachlich und transparent. Vertrauen gewinnen Sie nur durch absolute Offenheit bei den Finanzen.
    `,
    task: `
## Übungsfragen

1.  **Was gehört zwingend zum Gemeinschaftseigentum?**
    *Lösungshinweis: Dach, Fassade, tragende Wände, Treppenhaus, Fenster (konstruktiv), Versorgungsleitungen bis zum Eintritt in das Sondereigentum.*

2.  **Darf ein Eigentümer seine Wohnungstür von außen streichen?**
    *Lösungshinweis: Nein, die Außenseite der Wohnungstür gehört zum optischen Erscheinungsbild des Treppenhauses und damit zum Gemeinschaftseigentum.*

3.  **Wie lange ist die Ladungsfrist für eine ordentliche Eigentümerversammlung?**
    *Lösungshinweis: Seit der Reform 2020 beträgt die Frist 3 Wochen (§ 24 Abs. 4 WEG).*
    `,
    extendedTheory: `
### Vertiefung: Die WEG-Verwaltung im Kontext des deutschen Immobilienrechts

Die Verwaltung von Wohnungseigentümergemeinschaften (WEG) bildet einen der komplexesten Bereiche des deutschen Immobilienrechts. Mit der grundlegenden Reform des Wohnungseigentumsgesetzes im Dezember 2020 hat der Gesetzgeber die Rechtsstellung der Gemeinschaft der Wohnungseigentümer (GdWE) als teilrechtsfähiger Verband gestärkt und die Befugnisse des Verwalters neu geordnet. Für die Praxis bedeutet dies, dass der Verwalter nicht mehr nur als "verlängerter Arm" der Eigentümer agiert, sondern als professioneller Dienstleister mit eigenständiger Vertretungsmacht nach außen.

**Die historische Entwicklung des WEG**

Das Wohnungseigentumsgesetz wurde 1951 geschaffen, um nach dem Zweiten Weltkrieg den Wohnungsbau zu fördern. Die Grundidee war einfach: Durch die Aufteilung eines Gebäudes in einzelne Eigentumseinheiten sollten mehr Menschen Wohneigentum erwerben können. Über die Jahrzehnte wurde das Gesetz mehrfach angepasst, aber erst die Reform 2020 brachte einen echten Paradigmenwechsel. Die Gemeinschaft der Wohnungseigentümer wurde zum zentralen Rechtssubjekt: Sie kann klagen und verklagt werden, Verträge schließen und Vermögen besitzen.

**Die Abgrenzung von Sonder- und Gemeinschaftseigentum in der Praxis**

Die korrekte Zuordnung von Gebäudebestandteilen zu Sonder- oder Gemeinschaftseigentum ist eine der häufigsten Streitfragen in der WEG-Verwaltung. Grundsätzlich gilt: Alles, was für den Bestand und die Sicherheit des Gebäudes erforderlich ist, gehört zum Gemeinschaftseigentum. Dazu zählen tragende Wände, das Dach, die Fassade, Versorgungsleitungen bis zum ersten Absperrventil in der Wohnung sowie Fenster in ihrer konstruktiven Funktion. Das Sondereigentum umfasst die Räume der Wohnung selbst, nicht tragende Innenwände, Bodenbeläge (oberhalb des Estrichs), sanitäre Einrichtungen und die Innenseite der Wohnungstür.

In der Praxis führt diese Abgrenzung regelmäßig zu Konflikten. Ein klassisches Beispiel: Ein Eigentümer möchte seine Fenster austauschen. Die Fenster gehören konstruktiv zum Gemeinschaftseigentum, da sie Teil der Gebäudehülle sind. Der Eigentümer darf sie daher nicht eigenmächtig austauschen, selbst wenn er die Kosten selbst tragen würde. Er benötigt einen Beschluss der Eigentümerversammlung. Viele Teilungserklärungen enthalten jedoch Sonderregelungen, die die Instandhaltungspflicht für Fenster auf den jeweiligen Sondereigentümer übertragen. Der Verwalter muss daher immer zuerst die Teilungserklärung prüfen.

**Der zertifizierte Verwalter nach § 26a WEG**

Seit dem 1. Dezember 2023 haben Wohnungseigentümer einen Anspruch auf Bestellung eines zertifizierten Verwalters. Die Zertifizierung erfolgt durch eine Prüfung vor der Industrie- und Handelskammer (IHK), die rechtliche, kaufmännische und technische Kenntnisse abprüft. Bestandsverwalter, die am 1. Dezember 2020 bereits bestellt waren, gelten bis zum 1. Juni 2024 als zertifiziert (Übergangsfrist). Die Zertifizierungspflicht stellt einen Meilenstein in der Professionalisierung der Branche dar und soll sicherstellen, dass Verwalter über die notwendigen Qualifikationen verfügen.

**Haftungsrisiken des Verwalters**

Der Verwalter haftet persönlich für Pflichtverletzungen gegenüber der Gemeinschaft. Typische Haftungsfälle sind: verspätete Geltendmachung von Gewährleistungsansprüchen gegen Bauträger, fehlerhafte Jahresabrechnungen, unterlassene Verkehrssicherungspflichten (z.B. Streupflicht im Winter) und pflichtwidrige Verwendung von Gemeinschaftsgeldern. Eine Vermögensschadenhaftpflichtversicherung ist daher für jeden Verwalter unverzichtbar. Die Versicherungssumme sollte mindestens 500.000 Euro betragen, bei größeren Verwaltungsbeständen entsprechend mehr.

**Praxisrelevante Kennzahlen**

In Deutschland gibt es nach Schätzungen des Dachverbands Deutscher Immobilienverwalter (DDIV) rund 10 Millionen Eigentumswohnungen in etwa 1,8 Millionen Wohnungseigentümergemeinschaften. Die durchschnittliche WEG umfasst 5-6 Einheiten, wobei die Spanne von 2-Einheiten-WEGs bis zu Großanlagen mit mehreren hundert Einheiten reicht. Die Verwaltergebühr liegt im Bundesdurchschnitt bei 25-35 Euro pro Einheit und Monat, in Ballungsräumen wie München oder Frankfurt deutlich höher.

*Quellen: WEG in der Fassung vom 01.12.2020, DDIV Branchenbericht 2024, BGH-Rechtsprechung zur Verwalterhaftung*
`
  },

  // Tag 2: Die Teilungserklärung
  day_2: {
    title: "Die Teilungserklärung & Gemeinschaftsordnung",
    type: "Recht",
    theory: `
# Die Teilungserklärung: Das Grundgesetz der WEG

Die Teilungserklärung (§ 8 WEG) ist die Urkunde, mit der das Grundstück in Miteigentumsanteile aufgeteilt wird. Sie ist das wichtigste Dokument jeder WEG.

## 1. Inhalt der Teilungserklärung
- **Aufteilungsplan:** Eine Bauzeichnung, die genau abgrenzt, was Sondereigentum (Nr. 1, 2, 3...) und was Gemeinschaftseigentum ist.
- **Abgeschlossenheitsbescheinigung:** Bestätigung der Baubehörde, dass die Wohnungen baulich voneinander getrennt sind.
- **Gemeinschaftsordnung (GemO):** Regelt das Innenverhältnis der Eigentümer (Stimmrecht, Kostenverteilung, Nutzung).

## 2. Gemeinschaftsordnung (GemO)
Die GemO kann vom Gesetz abweichen (Dispositivität), soweit das Gesetz dies zulässt.
- **Kostenverteilung:** Gesetzlich nach Miteigentumsanteilen (MEA), in der GemO oft nach Verbrauch oder Einheiten geregelt.
- **Stimmrecht:** Gesetzlich nach Kopfprinzip (Reform 2020: Wertprinzip nach MEA, § 25 Abs. 2 WEG), GemO kann Objektprinzip (eine Stimme pro Wohnung) festlegen.
- **Tierhaltung:** Kann eingeschränkt, aber meist nicht generell verboten werden.

## 3. Sondernutzungsrechte (SNR)
Ein SNR gibt einem Eigentümer das exklusive Recht, eine Fläche des Gemeinschaftseigentums zu nutzen (z.B. Gartenanteil, Stellplatz).
- **Begründung:** In der Teilungserklärung oder durch Vereinbarung aller Eigentümer.
- **Eintragung:** Sollte im Grundbuch eingetragen werden, um gegen Rechtsnachfolger (neue Käufer) zu wirken.
    `,
    law: [
      "§ 3 WEG (Vertragliche Einräumung von Sondereigentum)",
      "[§ 8 WEG](https://www.gesetze-im-internet.de/weg/__8.html) (Teilung durch den Eigentümer)",
      "[§ 10 WEG](https://www.gesetze-im-internet.de/weg/__10.html) (Allgemeine Grundsätze)",
      "[§ 16 WEG](https://www.gesetze-im-internet.de/weg/__16.html) (Nutzungen, Lasten und Kosten)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Die Teilungserklärung & Gemeinschaftsordnung' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Die Teilungserklärung & Gemeinschaftsordnung'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Die Teilungserklärung & Gemeinschaftsordnung' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Praxis-Fall: Der Streit um den Garten

Eigentümer E im Erdgeschoss nutzt den Garten allein und hat dort ein festes Gartenhaus gebaut. Die Eigentümer im 1. Stock beschweren sich.

## Analyse:
1.  **Prüfung der Teilungserklärung:** Hat E ein Sondernutzungsrecht am Garten?
    - *Fall A:* Ja, SNR ist eingetragen. -> Er darf den Garten nutzen.
    - *Fall B:* Nein. -> Er nutzt Gemeinschaftseigentum unberechtigt.

2.  **Darf er bauen?**
    Auch mit SNR darf er meist nicht einfach bauen. Ein festes Gartenhaus ist eine **bauliche Veränderung** (§ 20 WEG).
    - Er braucht einen Beschluss der ETV.
    - Da das Gartenhaus die Optik verändert, müssen ggf. alle beeinträchtigten Eigentümer zustimmen.

**Lösung:** E muss einen Antrag auf der nächsten ETV stellen. Ohne Beschluss muss er zurückbauen (Beseitigungsanspruch § 1004 BGB).
    `,
    task: `
## Dokumenten-Analyse

Laden Sie sich eine Muster-Teilungserklärung herunter (oder nutzen Sie das Beispiel im Anhang).

**Suchen Sie folgende Regelungen:**
1.  Wie werden die Kosten für die Instandhaltung der Fenster verteilt? (Oft Sondereigentum vs. Gemeinschaftseigentum Problematik).
2.  Welches Stimmprinzip gilt in der Versammlung? (Wertprinzip vs. Objektprinzip).
3.  Darf in den Wohnungen ein Gewerbe betrieben werden?
    `,
    extendedTheory: `
### Vertiefung: Die Teilungserklärung als Verfassung der WEG

Die Teilungserklärung ist das Gründungsdokument jeder Wohnungseigentümergemeinschaft und wird häufig als "Verfassung der WEG" bezeichnet. Sie wird notariell beurkundet und im Grundbuch eingetragen, wodurch sie dingliche Wirkung entfaltet, also auch gegenüber späteren Erwerbern der Wohnungen gilt. Für den Verwalter ist die genaue Kenntnis der Teilungserklärung unverzichtbar, da sie die Grundlage für nahezu alle Verwaltungsentscheidungen bildet.

**Die drei Bestandteile im Detail**

Die Teilungserklärung besteht aus drei wesentlichen Teilen: dem Aufteilungsplan, der Abgeschlossenheitsbescheinigung und der Gemeinschaftsordnung. Der Aufteilungsplan ist eine Bauzeichnung, die exakt festlegt, welche Räume zum Sondereigentum der einzelnen Einheiten gehören. Jede Einheit erhält eine Nummer, die im Grundbuch als eigenes Wohnungsgrundbuch geführt wird. Die Abgeschlossenheitsbescheinigung wird von der Baubehörde ausgestellt und bestätigt, dass die Wohnungen baulich voneinander abgeschlossen sind, also über einen eigenen Zugang und sanitäre Einrichtungen verfügen.

Die Gemeinschaftsordnung (GemO) ist der wichtigste Teil für die laufende Verwaltung. Sie regelt das Innenverhältnis der Eigentümer und kann in weiten Teilen vom Gesetz abweichen. Typische Regelungen betreffen die Kostenverteilung, das Stimmrecht, die Tierhaltung, die gewerbliche Nutzung und Sondernutzungsrechte. Der Verwalter muss die GemO genau kennen, denn sie geht als speziellere Regelung dem Gesetz vor.

**Sondernutzungsrechte: Exklusivität am Gemeinschaftseigentum**

Sondernutzungsrechte (SNR) sind ein häufig missverstandenes Konzept. Ein SNR gibt einem Eigentümer das ausschließliche Recht, eine bestimmte Fläche des Gemeinschaftseigentums zu nutzen, typischerweise Gartenanteile, Terrassen, Stellplätze oder Kellerräume. Wichtig ist: Das SNR ändert nichts an der Eigentumszuordnung. Die Fläche bleibt Gemeinschaftseigentum, nur die Nutzung wird exklusiv zugewiesen. Dies hat praktische Konsequenzen: Für bauliche Veränderungen an der SNR-Fläche (z.B. Errichtung eines Wintergartens auf der Terrasse) ist weiterhin ein Beschluss der Eigentümerversammlung erforderlich.

Die Begründung von SNR ist nur in der Teilungserklärung oder durch Vereinbarung aller Eigentümer möglich. Ein einfacher Mehrheitsbeschluss reicht nicht aus. Für den Rechtsverkehr ist die Eintragung im Grundbuch entscheidend: Nur eingetragene SNR wirken gegen Rechtsnachfolger, also gegen spätere Käufer der Wohnungen. In der Praxis finden sich häufig nur schuldrechtlich vereinbarte SNR, die bei einem Eigentümerwechsel ihre Wirkung verlieren können.

**Öffnungsklauseln: Flexibilität für die Zukunft**

Viele moderne Teilungserklärungen enthalten sogenannte Öffnungsklauseln, die es der Eigentümerversammlung ermöglichen, bestimmte Regelungen der GemO mit qualifizierter Mehrheit zu ändern, ohne dass alle Eigentümer zustimmen müssen. Typische Öffnungsklauseln betreffen die Kostenverteilung und die Nutzungsregelungen. Ohne Öffnungsklausel wäre für jede Änderung der GemO die Zustimmung aller Eigentümer und eine Grundbucheintragung erforderlich, was in der Praxis oft unmöglich ist.

**Fehlerhafte Teilungserklärungen**

In der Praxis sind fehlerhafte Teilungserklärungen keine Seltenheit, insbesondere bei älteren Gebäuden. Häufige Fehler sind: Widersprüche zwischen Aufteilungsplan und tatsächlicher Bauausführung, unklare Zuordnung von Räumen (z.B. Spitzboden, Kellerabteile), fehlende oder widersprüchliche Regelungen zu Stellplätzen und veraltete Kostenverteilungsschlüssel, die nicht mehr der tatsächlichen Nutzung entsprechen. Der Verwalter sollte bei Übernahme einer neuen WEG die Teilungserklärung sorgfältig mit dem Ist-Zustand abgleichen und Abweichungen dokumentieren.

**Die Teilungserklärung beim Wohnungskauf**

Für Kaufinteressenten ist die Teilungserklärung neben der Beschluss-Sammlung das wichtigste Dokument. Sie gibt Auskunft über die Rechte und Pflichten des Eigentümers, die Kostenverteilung, mögliche Nutzungseinschränkungen und bestehende Sondernutzungsrechte. Der Verwalter ist verpflichtet, Kaufinteressenten Einsicht in die Beschluss-Sammlung zu gewähren (§ 24 Abs. 7 WEG). Die Teilungserklärung selbst kann beim Grundbuchamt eingesehen werden.

*Quellen: §§ 3, 5, 8, 10, 16 WEG, BGH V ZR 169/14 (Sondernutzungsrechte), BGH V ZR 110/09 (Öffnungsklauseln)*
`
  },
  
  // Tag 3: Die Eigentümerversammlung
  day_3: {
    title: "Die Eigentümerversammlung (ETV)",
    type: "Recht & Praxis",
    theory: `
# Die Eigentümerversammlung: Das Parlament der WEG

Die ETV ist der Ort der Willensbildung. Nur hier können wirksame Beschlüsse gefasst werden (Ausnahme: Umlaufbeschluss).

## 1. Einberufung
- **Wer:** Der Verwalter (mindestens einmal jährlich, § 24 Abs. 1 WEG).
- **Form:** Textform (E-Mail reicht, wenn vereinbart, sonst Brief).
- **Frist:** 3 Wochen (§ 24 Abs. 4 WEG).
- **Inhalt:** Ort, Zeit und **Tagesordnung (TOPs)**. Beschlüsse zu Themen, die nicht auf der Tagesordnung standen, sind anfechtbar!

## 2. Ablauf
- **Vorsitz:** Führt der Verwalter (§ 24 Abs. 5 WEG).
- **Beschlussfähigkeit:** Seit 2020 immer gegeben, egal wie viele Eigentümer erscheinen.
- **Protokoll:** Muss unverzüglich erstellt werden (§ 24 Abs. 6 WEG). Es ist eine reine Ergebnisniederschrift (wer hat wie gestimmt, was wurde beschlossen).

## 3. Beschlussfassung
- **Einfache Mehrheit:** Mehr als 50% der abgegebenen Stimmen (Ja > Nein). Reicht für fast alles (Wirtschaftsplan, Verwalterwahl, einfache Sanierungen).
- **Qualifizierte Mehrheit:** Z.B. für bauliche Veränderungen, die die Kostenverteilung ändern (§ 16 Abs. 3 WEG).
- **Allstimmigkeit:** Nur noch selten nötig (z.B. Änderung der Teilungserklärung).
    `,
    law: [
      "[§ 23 WEG](https://www.gesetze-im-internet.de/weg/__23.html) (Wohnungseigentümerversammlung)",
      "[§ 24 WEG](https://www.gesetze-im-internet.de/weg/__24.html) (Einberufung, Vorsitz, Niederschrift)",
      "[§ 25 WEG](https://www.gesetze-im-internet.de/weg/__25.html) (Mehrheitsbeschluss)"
    ],
    practice: `
    tasks: [
      {
        type: "reflection" as const,
        question: "Reflektieren Sie: Welche drei Kernaussagen aus 'Die Eigentümerversammlung (ETV)' sind für Ihre Tätigkeit als WEG-Verwaltung-Profi am wichtigsten?",
        hint: "Denken Sie an konkrete Praxissituationen und wie das Gelernte Ihren Berufsalltag beeinflusst."
      },
      {
        type: "case" as const,
        question: "Praxisfall: Ein Kunde fragt Sie speziell nach Ihrem Wissen zu 'Die Eigentümerversammlung (ETV)'. Wie erklären Sie die wichtigsten Punkte verständlich und fachlich korrekt?",
        hint: "Nutzen Sie die Fachbegriffe aus der heutigen Lektion. Denken Sie an WEG, Mietrecht, Eigentümerversammlung, WEG §19."
      },
      {
        type: "research" as const,
        question: "Recherche-Aufgabe: Suchen Sie ein aktuelles Praxisbeispiel zum Thema 'Die Eigentümerversammlung (ETV)' und bereiten Sie eine kurze Zusammenfassung vor.",
        hint: "Nutzen Sie Quellen wie Haufe.de, IHK-Website oder gesetze-im-internet.de für aktuelle Informationen."
      }
    ],
# Praxis-Szenario: Die turbulente Versammlung

In der ETV geht es hoch her. Eigentümer M (Querulant) stört ständig und beleidigt den Verwalter.

## Handlungsoptionen des Verwalters (Versammlungsleiter):
1.  **Ordnungsruf:** Ermahnung zur Sachlichkeit.
2.  **Wortentzug:** Wenn M nicht aufhört, darf ihm das Wort entzogen werden.
3.  **Raumverweis:** Als "Ultima Ratio" darf M des Raumes verwiesen werden (Hausrecht der Versammlung). Hierfür ist meist ein Geschäftsordnungsbeschluss der anderen Eigentümer sinnvoll.

**Wichtig:** Alles muss im Protokoll vermerkt werden, um spätere Anfechtungsklagen abzuwehren.
    `,
    task: `
## Erstellen Sie eine Einladung

Schreiben Sie eine Einladung zur ETV für die "WEG Sonnenhang 12".

**Enthalten sein muss:**
- Datum, Uhrzeit, Ort.
- Tagesordnungspunkte (TOPs):
    1.  Genehmigung Jahresabrechnung 2024.
    2.  Entlastung des Verwalters.
    3.  Beschluss über die Sanierung des Daches (Angebot Dachdecker Müller über 50.000 €).
    4.  Wahl des Verwaltungsbeirats.
    `,
    extendedTheory: `
### Vertiefung: Die Eigentümerversammlung als demokratisches Organ

Die Eigentümerversammlung (ETV) ist das zentrale Beschlussorgan der Wohnungseigentümergemeinschaft und funktioniert nach demokratischen Prinzipien. Seit der WEG-Reform 2020 ist die ETV immer beschlussfähig, unabhängig davon, wie viele Eigentümer erscheinen. Diese Änderung war eine der bedeutendsten Neuerungen der Reform, da zuvor häufig Versammlungen wegen fehlender Beschlussfähigkeit vertagt werden mussten, was zu erheblichen Verzögerungen bei dringenden Entscheidungen führte.

**Die Einberufung: Formale Anforderungen und häufige Fehler**

Die ordnungsgemäße Einberufung ist Voraussetzung für wirksame Beschlüsse. Der Verwalter muss mindestens einmal jährlich eine ordentliche ETV einberufen (§ 24 Abs. 1 WEG). Die Einladung muss in Textform erfolgen, wobei seit der Reform auch E-Mail ausreichend ist, sofern die Eigentümer dem zugestimmt haben. Die Ladungsfrist beträgt drei Wochen (§ 24 Abs. 4 WEG). Besonders wichtig ist die vollständige Angabe der Tagesordnungspunkte (TOPs), denn Beschlüsse zu Themen, die nicht auf der Tagesordnung standen, sind anfechtbar.

Ein häufiger Fehler in der Praxis ist die zu ungenaue Formulierung der TOPs. "Verschiedenes" als TOP reicht nicht aus, um darüber verbindliche Beschlüsse zu fassen. Jeder Beschlussgegenstand muss so konkret benannt werden, dass sich die Eigentümer auf die Abstimmung vorbereiten können. Beispiel: Statt "Sanierung" muss es heißen "Beschlussfassung über die Dachsanierung gemäß Angebot der Firma XY vom TT.MM.JJJJ über XX.XXX Euro".

**Der Umlaufbeschluss als Alternative**

Neben der Präsenzversammlung können Beschlüsse auch im Umlaufverfahren gefasst werden (§ 23 Abs. 3 WEG). Seit der Reform 2020 ist hierfür nicht mehr Einstimmigkeit erforderlich, sondern es genügt die einfache Mehrheit, sofern die Eigentümer zuvor beschlossen haben, dass Umlaufbeschlüsse mit einfacher Mehrheit gefasst werden können. In der Praxis wird der Umlaufbeschluss vor allem für dringende oder unstreitige Angelegenheiten genutzt, etwa die Beauftragung einer Notreparatur oder die Verlängerung eines auslaufenden Wartungsvertrags.

**Die hybride Versammlung: Präsenz und Online**

Die WEG-Reform hat auch die Möglichkeit geschaffen, dass Eigentümer online an der Versammlung teilnehmen können (§ 23 Abs. 1 Satz 2 WEG). Voraussetzung ist ein entsprechender Beschluss der Eigentümerversammlung. Die hybride Versammlung bietet erhebliche Vorteile: Höhere Beteiligungsquoten, insbesondere bei auswärtigen Eigentümern, und geringerer organisatorischer Aufwand. Technisch muss sichergestellt sein, dass alle Teilnehmer die Versammlung in Echtzeit verfolgen und sich zu Wort melden können (Bild und Ton in beide Richtungen).

**Beschlussfassung: Mehrheiten und Sonderfälle**

Die einfache Mehrheit (mehr Ja- als Nein-Stimmen) reicht für die meisten Beschlüsse aus, darunter den Wirtschaftsplan, die Jahresabrechnung, die Verwalterbestellung und einfache Instandhaltungsmaßnahmen. Enthaltungen werden nicht mitgezählt. Qualifizierte Mehrheiten sind nur in wenigen Fällen erforderlich, etwa bei der Änderung des Kostenverteilungsschlüssels nach § 16 Abs. 3 WEG (doppelt qualifizierte Mehrheit: mehr als die Hälfte aller stimmberechtigten Eigentümer und mehr als die Hälfte aller Miteigentumsanteile).

**Der Verwalter als Versammlungsleiter**

Der Verwalter führt den Vorsitz in der ETV (§ 24 Abs. 5 WEG) und hat damit eine Schlüsselrolle. Er eröffnet und schließt die Versammlung, erteilt das Wort, leitet die Abstimmungen und verkündet die Ergebnisse. Als Versammlungsleiter hat er auch das Recht, störende Teilnehmer zur Ordnung zu rufen und im Extremfall des Raumes zu verweisen. Diese Befugnis ergibt sich aus dem Hausrecht der Versammlung und sollte nur als letztes Mittel eingesetzt werden.

**Praxistipps für eine erfolgreiche ETV**

Erfahrene Verwalter bereiten die Versammlung minutiös vor: Beschlussvorlagen werden vorab formuliert und den Eigentümern mit der Einladung zugesandt. Komplexe Themen werden durch Gutachten oder Kostenvoranschläge untermauert. Die Sitzordnung wird so gewählt, dass der Verwalter alle Teilnehmer im Blick hat. Ein Beamer ermöglicht die visuelle Darstellung von Zahlen und Plänen. Nach der Versammlung wird das Protokoll zeitnah erstellt und versandt, idealerweise innerhalb von zwei Wochen.

*Quellen: §§ 23, 24, 25 WEG, BGH V ZR 235/20 (Beschlussfähigkeit), BGH V ZR 51/21 (Umlaufbeschluss)*
`
  },

  // Tag 4-20: Eingefügt aus MissingDays
  ...contentDataModule3MaximalMissingDays
};
