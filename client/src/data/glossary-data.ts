// Glossary Data for Immobilien-Bildungsportal
// Contains definitions, legal references, and categories

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Recht" | "Finanzierung" | "Bau" | "Verwaltung" | "Makler" | "Allgemein";
  lawReference?: string; // e.g., "§ 34c GewO"
  lawLink?: string; // URL to dejure.org or similar
}

export const glossaryData: GlossaryTerm[] = [
  {
    term: "Abgeschlossenheitsbescheinigung",
    definition: "Bescheinigung der Baubehörde, dass eine Eigentumswohnung oder Teileigentumseinheit baulich von anderen Wohnungen und Räumen hinreichend abgeschlossen ist. Voraussetzung für die Aufteilung in Wohnungseigentum.",
    category: "Recht",
    lawReference: "§ 7 Abs. 4 Nr. 2 WEG",
    lawLink: "https://www.gesetze-im-internet.de/woeigg/__7.html"
  },
  {
    term: "Abnahme",
    definition: "Förmliche Erklärung des Bestellers, dass er das Werk (z.B. Neubau, Sanierung) als im Wesentlichen vertragsgemäß anerkennt. Wichtiger Zeitpunkt für Gewährleistungsfristen und Gefahrübergang.",
    category: "Bau",
    lawReference: "§ 640 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__640.html"
  },
  {
    term: "Allgemeine Geschäftsbedingungen (AGB)",
    definition: "Vorformulierte Vertragsbedingungen, die eine Vertragspartei der anderen bei Vertragsschluss stellt. Unterliegen besonderer Inhaltskontrolle zum Schutz des Vertragspartners.",
    category: "Recht",
    lawReference: "§ 305 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__305.html"
  },
  {
    term: "Altlast",
    definition: "Kontaminierung des Bodens oder Grundwassers durch frühere Nutzung (z.B. Industriestandort). Kann zu Sanierungspflichten und Wertminderungen führen.",
    category: "Bau",
    lawReference: "§ 2 BBodSchG",
    lawLink: "https://www.gesetze-im-internet.de/bbodschg/__2.html"
  },
  {
    term: "Ankaufsrecht",
    definition: "Vertragliches Recht, eine Immobilie zu einem festgelegten Preis oder nach festgelegten Kriterien zu erwerben. Kann als Vormerkung im Grundbuch eingetragen werden.",
    category: "Recht",
    lawReference: "§ 463 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__463.html"
  },
  {
    term: "Annuität",
    definition: "Gleichbleibende Zahlungsrate bei Annuitätendarlehen, bestehend aus Zins- und Tilgungsanteil. Im Zeitverlauf sinkt der Zinsanteil, während der Tilgungsanteil steigt.",
    category: "Finanzierung",
    lawReference: "§ 488 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__488.html"
  },
  {
    term: "Auflassung",
    definition: "Die dingliche Einigung zwischen Verkäufer und Käufer über den Eigentumsübergang an einem Grundstück. Sie muss bei gleichzeitiger Anwesenheit beider Teile vor einer zuständigen Stelle (Notar) erklärt werden.",
    category: "Recht",
    lawReference: "§ 925 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__925.html"
  },
  {
    term: "Auflassungsvormerkung",
    definition: "Sicherungsmittel für den Käufer im Grundbuch. Sie verhindert, dass der Verkäufer das Grundstück anderweitig verkauft oder belastet, bevor der eigentliche Eigentumsübergang vollzogen ist.",
    category: "Recht",
    lawReference: "§ 883 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__883.html"
  },
  {
    term: "Bauabzugssteuer",
    definition: "Steuerabzug von 15% bei Bauleistungen, wenn der Leistungsempfänger keine Freistellungsbescheinigung des Finanzamts vorlegt. Soll Schwarzarbeit verhindern.",
    category: "Bau",
    lawReference: "§ 48 EStG",
    lawLink: "https://www.gesetze-im-internet.de/estg/__48.html"
  },
  {
    term: "Baulast",
    definition: "Öffentlich-rechtliche Verpflichtung des Grundstückseigentümers gegenüber der Baubehörde, etwas zu tun, zu dulden oder zu unterlassen (z.B. Stellplätze nachweisen).",
    category: "Bau"
  },
  {
    term: "Bauträger",
    definition: "Unternehmer, der Grundstücke in eigenem Namen und für eigene Rechnung bebaut und diese dann (meist schlüsselfertig) an Erwerber verkauft. Er unterliegt der Makler- und Bauträgerverordnung (MaBV).",
    category: "Bau",
    lawReference: "§ 34c Abs. 1 Nr. 3a GewO",
    lawLink: "https://www.gesetze-im-internet.de/gewo/__34c.html"
  },
  {
    term: "Beleihungswert",
    definition: "Wert einer Immobilie, den eine Bank langfristig und nachhaltig als Sicherheit ansetzt. Liegt meist unter dem Verkehrswert (ca. 80-90%).",
    category: "Finanzierung",
    lawReference: "§ 16 PfandBG",
    lawLink: "https://www.gesetze-im-internet.de/pfandbg/__16.html"
  },
  {
    term: "Bestellerprinzip",
    definition: "Regelung bei der Vermietung von Wohnraum: Wer den Makler bestellt (beauftragt), muss ihn bezahlen. Gilt seit 2015 für Wohnraummietverträge.",
    category: "Makler",
    lawReference: "§ 2 Abs. 1a WoVermRG",
    lawLink: "https://www.gesetze-im-internet.de/wovermrg/__2.html"
  },
  {
    term: "Betriebskosten",
    definition: "Kosten, die dem Eigentümer durch das Eigentum oder den bestimmungsgemäßen Gebrauch des Gebäudes laufend entstehen (z.B. Heizung, Wasser, Müll). Können auf Mieter umgelegt werden.",
    category: "Verwaltung",
    lawReference: "§ 556 BGB, BetrKV",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__556.html"
  },
  {
    term: "Bodenwert",
    definition: "Wert des unbebauten Grundstücks. Wird aus Bodenrichtwerten abgeleitet und ist Grundlage für das Sachwertverfahren.",
    category: "Finanzierung",
    lawReference: "§ 179 BauGB",
    lawLink: "https://www.gesetze-im-internet.de/bbaugb/__179.html"
  },
  {
    term: "Courtage",
    definition: "Die Vergütung (Provision) des Immobilienmaklers für die erfolgreiche Vermittlung oder den Nachweis einer Gelegenheit zum Abschluss eines Vertrags.",
    category: "Makler",
    lawReference: "§ 652 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__652.html"
  },
  {
    term: "Damnum (Disagio)",
    definition: "Abschlag vom Nominalbetrag eines Darlehens, der als Zinsvorauszahlung dient. Reduziert die Auszahlungssumme, erhöht aber die steuerliche Absetzbarkeit.",
    category: "Finanzierung"
  },
  {
    term: "Denkmalschutz",
    definition: "Schutz von Bauwerken, die von geschichtlicher, künstlerischer oder städtebaulicher Bedeutung sind. Einschränkungen bei Umbau und Sanierung, aber auch Steuervorteile.",
    category: "Bau",
    lawReference: "Länderspezifische Denkmalschutzgesetze"
  },
  {
    term: "Dienstbarkeit",
    definition: "Ein dingliches Recht an einer fremden Sache, das dem Berechtigten eine bestimmte Nutzung gestattet (z.B. Wegerecht, Leitungsrecht) oder bestimmte Handlungen verbietet.",
    category: "Recht",
    lawReference: "§ 1018 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__1018.html"
  },
  {
    term: "Duldungspflicht",
    definition: "Verpflichtung des Mieters, bestimmte Maßnahmen des Vermieters zu dulden (z.B. Modernisierung, Instandsetzung), auch wenn sie mit Beeinträchtigungen verbunden sind.",
    category: "Recht",
    lawReference: "§ 555d BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__555d.html"
  },
  {
    term: "Effektivzins",
    definition: "Tatsächlicher jährlicher Zinssatz eines Kredits unter Berücksichtigung aller Kosten (Nominalzins, Disagio, Gebühren). Ermöglicht Vergleich verschiedener Kreditangebote.",
    category: "Finanzierung",
    lawReference: "§ 6 PAngV",
    lawLink: "https://www.gesetze-im-internet.de/pangv/__6.html"
  },
  {
    term: "Eigentümerbescheinigung",
    definition: "Bescheinigung des Grundbuchamts über die Eigentumsverhältnisse eines Grundstücks. Wird oft bei Verkaufsverhandlungen verlangt.",
    category: "Recht"
  },
  {
    term: "Eigentümerversammlung",
    definition: "Das oberste Beschlussorgan einer Wohnungseigentümergemeinschaft (WEG). Hier werden Entscheidungen über die Verwaltung, Instandhaltung und Kostenverteilung getroffen.",
    category: "Verwaltung",
    lawReference: "§ 23 WEG",
    lawLink: "https://www.gesetze-im-internet.de/woeigg/__23.html"
  },
  {
    term: "Energieausweis",
    definition: "Pflichtdokument bei Verkauf und Vermietung, das über die energetische Qualität eines Gebäudes informiert. Unterscheidung zwischen Bedarfs- und Verbrauchsausweis.",
    category: "Bau",
    lawReference: "§ 80 GEG",
    lawLink: "https://www.gesetze-im-internet.de/geg/__80.html"
  },
  {
    term: "Erbbaurecht",
    definition: "Das veräußerliche und vererbliche Recht, auf oder unter der Oberfläche eines Grundstücks ein Bauwerk zu haben. Der Erbbauberechtigte zahlt dafür einen Erbbauzins an den Grundstückseigentümer.",
    category: "Recht",
    lawReference: "§ 1 ErbbauRG",
    lawLink: "https://www.gesetze-im-internet.de/erbbaurg/__1.html"
  },
  {
    term: "Ertragswertverfahren",
    definition: "Wertermittlungsverfahren für vermietete Immobilien. Der Wert ergibt sich aus dem kapitalisierten Reinertrag plus Bodenwert.",
    category: "Finanzierung",
    lawReference: "§§ 17-20 ImmoWertV",
    lawLink: "https://www.gesetze-im-internet.de/immowertv_2021/__17.html"
  },
  {
    term: "Exposé",
    definition: "Verkaufsunterlage, die eine Immobilie beschreibt. Es enthält wichtige Daten, Fakten, Bilder und Pläne und dient als Informationsgrundlage für Interessenten.",
    category: "Makler"
  },
  {
    term: "Fernabsatzvertrag",
    definition: "Vertrag, der ausschließlich über Fernkommunikationsmittel (E-Mail, Telefon, Internet) geschlossen wird. Hier besteht oft ein Widerrufsrecht für Verbraucher.",
    category: "Recht",
    lawReference: "§ 312c BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__312c.html"
  },
  {
    term: "Festzins",
    definition: "Zinssatz, der für einen vereinbarten Zeitraum (Zinsbindung) fest vereinbart ist und sich nicht ändert. Üblich sind 5, 10, 15 oder 20 Jahre.",
    category: "Finanzierung"
  },
  {
    term: "Flurkarte",
    definition: "Amtliche Karte, die die Lage, Form und Grenzen von Grundstücken (Flurstücken) sowie die Bebauung darstellt. Teil des Liegenschaftskatasters.",
    category: "Bau"
  },
  {
    term: "Flurstück",
    definition: "Kleinste Buchungseinheit des Liegenschaftskatasters. Jedes Grundstück besteht aus einem oder mehreren Flurstücken mit eindeutiger Nummer.",
    category: "Bau"
  },
  {
    term: "Formvorschriften",
    definition: "Gesetzliche Anforderungen an die Form von Rechtsgeschäften (z.B. notarielle Beurkundung bei Grundstückskaufverträgen). Nichteinhaltung führt zur Nichtigkeit.",
    category: "Recht",
    lawReference: "§ 311b BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__311b.html"
  },
  {
    term: "Gemeinschaftseigentum",
    definition: "Teile eines Gebäudes und Grundstücks, die nicht im Sondereigentum oder im Eigentum eines Dritten stehen (z.B. Dach, Treppenhaus, Außenwände).",
    category: "Verwaltung",
    lawReference: "§ 1 Abs. 5 WEG",
    lawLink: "https://www.gesetze-im-internet.de/woeigg/__1.html"
  },
  {
    term: "Gemeinschaftsordnung",
    definition: "Regelwerk einer Wohnungseigentümergemeinschaft, das die Rechte und Pflichten der Eigentümer sowie die Verwaltung und Nutzung regelt.",
    category: "Verwaltung",
    lawReference: "§ 10 WEG",
    lawLink: "https://www.gesetze-im-internet.de/woeigg/__10.html"
  },
  {
    term: "Gewährleistung",
    definition: "Haftung des Verkäufers oder Werkunternehmers für Mängel der Kaufsache oder des Werks. Beim Immobilienkauf meist 5 Jahre, bei Bauverträgen 5 Jahre ab Abnahme.",
    category: "Recht",
    lawReference: "§§ 434 ff., 633 ff. BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__434.html"
  },
  {
    term: "Grundbuch",
    definition: "Amtliches Register, das die Eigentumsverhältnisse und Belastungen von Grundstücken dokumentiert. Es genießt öffentlichen Glauben.",
    category: "Recht",
    lawReference: "§ 891 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__891.html"
  },
  {
    term: "Grunderwerbsteuer",
    definition: "Steuer auf den Erwerb von Grundstücken. Bemessungsgrundlage ist der Kaufpreis, Steuersatz je nach Bundesland 3,5% bis 6,5%.",
    category: "Finanzierung",
    lawReference: "§ 1 GrEStG",
    lawLink: "https://www.gesetze-im-internet.de/grestg_1983/__1.html"
  },
  {
    term: "Grundflächenzahl (GRZ)",
    definition: "Gibt an, wie viel Quadratmeter Grundfläche je Quadratmeter Grundstücksfläche bebaut werden darf. Wird im Bebauungsplan festgesetzt.",
    category: "Bau",
    lawReference: "§ 19 BauNVO",
    lawLink: "https://www.gesetze-im-internet.de/baunvo/__19.html"
  },
  {
    term: "Grundschuld",
    definition: "Ein dingliches Recht, aus einem Grundstück die Zahlung einer bestimmten Geldsumme zu fordern. Häufigstes Sicherungsmittel für Immobilienkredite, da sie nicht an eine bestimmte Forderung gebunden ist (abstrakt).",
    category: "Finanzierung",
    lawReference: "§ 1191 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__1191.html"
  },
  {
    term: "Grundstücksverkehrsgesetz (GrdstVG)",
    definition: "Regelt die Genehmigungspflicht bei land- und forstwirtschaftlichen Grundstücken zum Schutz vor Bodenspekulation.",
    category: "Recht",
    lawReference: "GrdstVG",
    lawLink: "https://www.gesetze-im-internet.de/grdstvg/"
  },
  {
    term: "Haftung",
    definition: "Rechtliche Verantwortung für Schäden oder Mängel. Unterscheidung zwischen vertraglicher Haftung (Gewährleistung) und deliktischer Haftung (Schadensersatz).",
    category: "Recht",
    lawReference: "§§ 280 ff., 823 ff. BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__280.html"
  },
  {
    term: "Hausgeld",
    definition: "Monatliche Vorschusszahlung der Wohnungseigentümer an den Verwalter zur Deckung der laufenden Kosten (Bewirtschaftung, Instandhaltung, Verwaltung).",
    category: "Verwaltung",
    lawReference: "§ 28 WEG",
    lawLink: "https://www.gesetze-im-internet.de/woeigg/__28.html"
  },
  {
    term: "Hausverwaltung",
    definition: "Professionelle Verwaltung von Immobilien, entweder als WEG-Verwaltung (Wohnungseigentum) oder Mietverwaltung (Mietobjekte). Erfordert Erlaubnis nach § 34c GewO.",
    category: "Verwaltung",
    lawReference: "§ 34c Abs. 1 Nr. 3 GewO",
    lawLink: "https://www.gesetze-im-internet.de/gewo/__34c.html"
  },
  {
    term: "Hypothek",
    definition: "Grundpfandrecht, das an eine bestimmte Forderung gebunden ist (akzessorisch). Heute weitgehend durch Grundschuld ersetzt.",
    category: "Finanzierung",
    lawReference: "§ 1113 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__1113.html"
  },
  {
    term: "Indexmiete",
    definition: "Mietvertrag, bei dem die Miete an die Entwicklung des Verbraucherpreisindex gekoppelt ist. Mieterhöhungen erfolgen automatisch bei Indexänderung.",
    category: "Verwaltung",
    lawReference: "§ 557b BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__557b.html"
  },
  {
    term: "Instandhaltungsrücklage",
    definition: "Ansammlung einer angemessenen Geldsumme durch die Wohnungseigentümergemeinschaft zur Sicherung der langfristigen Erhaltung des Gebäudes (jetzt: Erhaltungsrücklage).",
    category: "Verwaltung",
    lawReference: "§ 19 Abs. 2 Nr. 4 WEG",
    lawLink: "https://www.gesetze-im-internet.de/woeigg/__19.html"
  },
  {
    term: "Insolvenz",
    definition: "Zahlungsunfähigkeit oder Überschuldung eines Schuldners. Eröffnung des Insolvenzverfahrens zur gleichmäßigen Befriedigung der Gläubiger.",
    category: "Recht",
    lawReference: "§ 1 InsO",
    lawLink: "https://www.gesetze-im-internet.de/inso/__1.html"
  },
  {
    term: "Jahresabrechnung",
    definition: "Aufstellung aller Einnahmen und Ausgaben einer WEG für ein Wirtschaftsjahr. Muss vom Verwalter erstellt und von der Eigentümerversammlung genehmigt werden.",
    category: "Verwaltung",
    lawReference: "§ 28 WEG",
    lawLink: "https://www.gesetze-im-internet.de/woeigg/__28.html"
  },
  {
    term: "Juristische Person",
    definition: "Rechtsfähige Organisation (z.B. GmbH, AG, Verein), die wie eine natürliche Person Rechte und Pflichten haben kann. Wichtig bei gewerblichen Immobiliengeschäften.",
    category: "Recht",
    lawReference: "§ 21 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__21.html"
  },
  {
    term: "Kataster",
    definition: "Amtliches Verzeichnis aller Grundstücke (Liegenschaftskataster) mit Angaben zu Lage, Größe, Nutzungsart und Eigentümer.",
    category: "Bau"
  },
  {
    term: "Kaufpreisaufteilung",
    definition: "Aufteilung des Gesamtkaufpreises auf Grund und Boden sowie Gebäude. Wichtig für steuerliche Abschreibung (AfA), da nur Gebäude abschreibbar ist.",
    category: "Finanzierung"
  },
  {
    term: "Kreditwürdigkeit (Bonität)",
    definition: "Fähigkeit und Bereitschaft eines Kreditnehmers, einen Kredit zurückzuzahlen. Wird von Banken anhand von Einkommen, Vermögen und Schufa-Score geprüft.",
    category: "Finanzierung"
  },
  {
    term: "Laufzeit",
    definition: "Zeitraum, für den ein Darlehen vereinbart wird. Bei Immobilienkrediten oft 20-30 Jahre Gesamtlaufzeit mit kürzeren Zinsbindungsfristen.",
    category: "Finanzierung"
  },
  {
    term: "Liegenschaftszins",
    definition: "Zinssatz, mit dem der Verkehrswert von Grundstücken im Durchschnitt marktüblich verzinst wird. Wichtige Größe im Ertragswertverfahren.",
    category: "Finanzierung",
    lawReference: "§ 14 ImmoWertV",
    lawLink: "https://www.gesetze-im-internet.de/immowertv_2021/__14.html"
  },
  {
    term: "Makleralleinauftrag",
    definition: "Vertrag, bei dem sich der Auftraggeber verpflichtet, für die Vertragslaufzeit keine anderen Makler einzuschalten. Beim qualifizierten Alleinauftrag darf er auch nicht mehr privat verkaufen.",
    category: "Makler"
  },
  {
    term: "Mietkaution",
    definition: "Sicherheitsleistung des Mieters, maximal drei Nettokaltmieten. Muss vom Vermieter verzinslich angelegt werden.",
    category: "Verwaltung",
    lawReference: "§ 551 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__551.html"
  },
  {
    term: "Mietminderung",
    definition: "Recht des Mieters, die Miete zu kürzen, wenn die Mietsache einen Mangel aufweist, der die Tauglichkeit zum vertragsgemäßen Gebrauch erheblich mindert.",
    category: "Verwaltung",
    lawReference: "§ 536 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__536.html"
  },
  {
    term: "Mietpreisbremse",
    definition: "Regelung, die die Miethöhe bei Wiedervermietung in angespannten Wohnungsmärkten auf maximal 10% über der ortsüblichen Vergleichsmiete begrenzt.",
    category: "Recht",
    lawReference: "§ 556d BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__556d.html"
  },
  {
    term: "Mietspiegel",
    definition: "Übersicht über die ortsübliche Vergleichsmiete. Dient als Grundlage für Mieterhöhungen und zur Beurteilung der Angemessenheit von Mieten.",
    category: "Verwaltung",
    lawReference: "§ 558c BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__558c.html"
  },
  {
    term: "Modernisierung",
    definition: "Baumaßnahmen, die den Gebrauchswert der Mietsache nachhaltig erhöhen, die allgemeinen Wohnverhältnisse verbessern oder Energie/Wasser sparen. Berechtigt zu Mieterhöhung.",
    category: "Bau",
    lawReference: "§ 555b BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__555b.html"
  },
  {
    term: "Nachrangfinanzierung",
    definition: "Kredit, der im Grundbuch hinter einer erstrangigen Finanzierung eingetragen wird. Höheres Risiko für Bank, daher höhere Zinsen.",
    category: "Finanzierung"
  },
  {
    term: "Nebenkosten",
    definition: "Beim Immobilienkauf: Grunderwerbsteuer, Notar- und Grundbuchkosten, Maklercourtage (ca. 10-15% des Kaufpreises). Bei Vermietung: siehe Betriebskosten.",
    category: "Finanzierung"
  },
  {
    term: "Nießbrauch",
    definition: "Das umfassende Nutzungsrecht an einer fremden Sache (z.B. Immobilie). Der Nießbraucher darf die Früchte ziehen (z.B. Mieteinnahmen), muss aber meist auch die Lasten tragen.",
    category: "Recht",
    lawReference: "§ 1030 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__1030.html"
  },
  {
    term: "Notaranderkonto",
    definition: "Treuhandkonto eines Notars zur Abwicklung von Zahlungen (z.B. Kaufpreis). Wird heute nur noch bei berechtigtem Sicherungsinteresse genutzt.",
    category: "Recht",
    lawReference: "§ 54 BeurkG",
    lawLink: "https://www.gesetze-im-internet.de/beurkg/__54.html"
  },
  {
    term: "Nutzfläche",
    definition: "Fläche eines Gebäudes, die der Nutzung dient (ohne Verkehrsflächen und technische Funktionsflächen). Berechnung nach DIN 277.",
    category: "Bau",
    lawReference: "DIN 277"
  },
  {
    term: "Objektbesichtigung",
    definition: "Vor-Ort-Termin zur Besichtigung einer Immobilie durch Interessenten. Makler müssen auf wesentliche Mängel hinweisen.",
    category: "Makler"
  },
  {
    term: "Ortsübliche Vergleichsmiete",
    definition: "Durchschnittliche Miete für vergleichbare Wohnungen in der Gemeinde. Maßstab für Mieterhöhungen und Mietpreisbremse.",
    category: "Verwaltung",
    lawReference: "§ 558 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__558.html"
  },
  {
    term: "Rangstelle",
    definition: "Position einer Grundschuld oder Hypothek im Grundbuch. Je niedriger die Rangstelle, desto besser die Absicherung bei Zwangsversteigerung.",
    category: "Finanzierung"
  },
  {
    term: "Reallast",
    definition: "Dingliches Recht, aus einem Grundstück wiederkehrende Leistungen zu fordern (z.B. Rentenzahlungen, Versorgungsleistungen).",
    category: "Recht",
    lawReference: "§ 1105 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__1105.html"
  },
  {
    term: "Restschuld",
    definition: "Noch nicht getilgter Betrag eines Darlehens. Am Ende der Zinsbindung oft noch erhebliche Restschuld vorhanden (Anschlussfinanzierung nötig).",
    category: "Finanzierung"
  },
  {
    term: "Sachverständiger",
    definition: "Fachkundige Person zur Bewertung von Immobilien oder Feststellung von Mängeln. Öffentlich bestellte Sachverständige haben besondere Qualifikation.",
    category: "Allgemein",
    lawReference: "§ 36 GewO",
    lawLink: "https://www.gesetze-im-internet.de/gewo/__36.html"
  },
  {
    term: "Sachwertverfahren",
    definition: "Wertermittlungsverfahren für selbstgenutzte Immobilien. Wert = Bodenwert + Gebäudesachwert (Herstellungskosten minus Alterswertminderung).",
    category: "Finanzierung",
    lawReference: "§§ 21-23 ImmoWertV",
    lawLink: "https://www.gesetze-im-internet.de/immowertv_2021/__21.html"
  },
  {
    term: "Schönheitsreparaturen",
    definition: "Renovierungsarbeiten wie Tapezieren, Streichen, Lackieren. Können im Mietvertrag auf Mieter übertragen werden, aber nur bei wirksamer Klausel.",
    category: "Verwaltung",
    lawReference: "§ 535 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__535.html"
  },
  {
    term: "Sondereigentum",
    definition: "Das Alleineigentum an einer bestimmten Wohnung oder an nicht zu Wohnzwecken dienenden Räumen in einem Gebäude.",
    category: "Verwaltung",
    lawReference: "§ 5 WEG",
    lawLink: "https://www.gesetze-im-internet.de/woeigg/__5.html"
  },
  {
    term: "Sondernutzungsrecht",
    definition: "Recht eines Wohnungseigentümers, einen Teil des Gemeinschaftseigentums allein zu nutzen (z.B. Garten, Stellplatz, Dachboden).",
    category: "Verwaltung",
    lawReference: "§ 13 WEG",
    lawLink: "https://www.gesetze-im-internet.de/woeigg/__13.html"
  },
  {
    term: "Staffelmiete",
    definition: "Mietvertrag mit von vornherein festgelegten Mieterhöhungen zu bestimmten Zeitpunkten. Andere Mieterhöhungen sind ausgeschlossen.",
    category: "Verwaltung",
    lawReference: "§ 557a BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__557a.html"
  },
  {
    term: "Teilungserklärung",
    definition: "Erklärung des Grundstückseigentümers gegenüber dem Grundbuchamt, dass das Eigentum am Grundstück in Miteigentumsanteile aufgeteilt wird, die mit Sondereigentum verbunden sind.",
    category: "Recht",
    lawReference: "§ 8 WEG",
    lawLink: "https://www.gesetze-im-internet.de/woeigg/__8.html"
  },
  {
    term: "Tilgung",
    definition: "Rückzahlung eines Darlehens. Bei Annuitätendarlehen steigt die Tilgungsrate im Zeitverlauf, da der Zinsanteil sinkt.",
    category: "Finanzierung"
  },
  {
    term: "Treuhandvertrag",
    definition: "Vertrag, bei dem eine Person (Treuhänder) Vermögen im eigenen Namen, aber für fremde Rechnung verwaltet. Oft bei Bauträgerverträgen.",
    category: "Recht"
  },
  {
    term: "Umlegung",
    definition: "Neuordnung von Grundstücken zur Schaffung zweckmäßiger Baugrundstücke. Häufig im Rahmen von Bebauungsplänen.",
    category: "Bau",
    lawReference: "§§ 45 ff. BauGB",
    lawLink: "https://www.gesetze-im-internet.de/bbaugb/__45.html"
  },
  {
    term: "Unbedenklichkeitsbescheinigung",
    definition: "Bescheinigung des Finanzamts, dass die Grunderwerbsteuer gezahlt wurde (oder nicht anfällt). Voraussetzung für die Eigentumsumschreibung im Grundbuch.",
    category: "Recht",
    lawReference: "§ 22 GrEStG",
    lawLink: "https://www.gesetze-im-internet.de/grestg_1983/__22.html"
  },
  {
    term: "Vergleichswertverfahren",
    definition: "Wertermittlungsverfahren, bei dem der Wert durch Vergleich mit tatsächlich erzielten Kaufpreisen ähnlicher Objekte ermittelt wird.",
    category: "Finanzierung",
    lawReference: "§§ 15-16 ImmoWertV",
    lawLink: "https://www.gesetze-im-internet.de/immowertv_2021/__15.html"
  },
  {
    term: "Verkehrswert (Marktwert)",
    definition: "Der Preis, der zum Zeitpunkt der Ermittlung im gewöhnlichen Geschäftsverkehr nach den rechtlichen Gegebenheiten und tatsächlichen Eigenschaften zu erzielen wäre.",
    category: "Finanzierung",
    lawReference: "§ 194 BauGB",
    lawLink: "https://www.gesetze-im-internet.de/bbaugb/__194.html"
  },
  {
    term: "Vorkaufsrecht",
    definition: "Recht, beim Verkauf eines Grundstücks an einen Dritten zu den gleichen Bedingungen einzutreten. Kann gesetzlich (Gemeinde) oder vertraglich bestehen.",
    category: "Recht",
    lawReference: "§§ 24-28 BauGB, § 463 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bbaugb/__24.html"
  },
  {
    term: "Vorfälligkeitsentschädigung",
    definition: "Entschädigung an die Bank bei vorzeitiger Rückzahlung eines Darlehens während der Zinsbindung. Kompensiert entgangene Zinsen.",
    category: "Finanzierung",
    lawReference: "§ 490 Abs. 2 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__490.html"
  },
  {
    term: "Wegerecht",
    definition: "Dienstbarkeit, die dem Berechtigten das Recht gibt, über ein fremdes Grundstück zu gehen oder zu fahren. Wird im Grundbuch eingetragen.",
    category: "Recht",
    lawReference: "§ 1018 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__1018.html"
  },
  {
    term: "Wertgutachten",
    definition: "Schriftliche Stellungnahme eines Sachverständigen über den Wert einer Immobilie. Grundlage für Kreditentscheidungen, Erbauseinandersetzungen, Scheidungen.",
    category: "Allgemein"
  },
  {
    term: "Widerrufsrecht",
    definition: "Recht des Verbrauchers, sich innerhalb einer bestimmten Frist (meist 14 Tage) ohne Angabe von Gründen von einem Vertrag zu lösen (z.B. Maklervertrag, Darlehensvertrag).",
    category: "Recht",
    lawReference: "§ 355 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__355.html"
  },
  {
    term: "Wohnflächenberechnung",
    definition: "Ermittlung der anrechenbaren Grundfläche einer Wohnung. Maßgeblich ist meist die Wohnflächenverordnung (WoFlV).",
    category: "Bau",
    lawReference: "WoFlV",
    lawLink: "https://www.gesetze-im-internet.de/woflv/"
  },
  {
    term: "Wohnrecht",
    definition: "Persönliches Recht, eine Wohnung oder ein Haus lebenslang oder zeitlich begrenzt zu bewohnen. Kann als Dienstbarkeit im Grundbuch eingetragen werden.",
    category: "Recht",
    lawReference: "§ 1093 BGB",
    lawLink: "https://www.gesetze-im-internet.de/bgb/__1093.html"
  },
  {
    term: "Zwangsversteigerung",
    definition: "Staatliches Verfahren zur Durchsetzung privatrechtlicher Ansprüche (z.B. Geldforderungen) mit staatlicher Gewalt (Gerichtsvollzieher, Zwangsversteigerung).",
    category: "Recht",
    lawReference: "§ 866 ZPO",
    lawLink: "https://www.gesetze-im-internet.de/zpo/__866.html"
  },
  {
    term: "Zwangsverwaltung",
    definition: "Zwangsvollstreckung in eine Immobilie durch Einsetzung eines Zwangsverwalters, der die Erträge (Mieten) einzieht und an Gläubiger verteilt.",
    category: "Recht",
    lawReference: "§ 146 ZVG",
    lawLink: "https://www.gesetze-im-internet.de/zvg/__146.html"
  },
  {
    term: "Zweckentfremdung",
    definition: "Nutzung von Wohnraum zu anderen als Wohnzwecken (z.B. Ferienwohnung, Büro). In vielen Städten genehmigungspflichtig.",
    category: "Recht"
  }
];
