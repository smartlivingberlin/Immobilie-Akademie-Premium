export interface CourtCaseModule4 {
  id: string;
  court: string;
  reference: string;
  date: string;
  title: string;
  summary: string;
  facts: string;
  legalIssue: string;
  decision: string;
  practicalImplication: string;
  relatedLaws: string[];
  tags: string[];
  sourceUrl: string;
}

export const courtCasesModule4: CourtCaseModule4[] = [
  {
    id: "olg-hamm-22-u-25-24",
    court: "OLG Hamm",
    reference: "22 U 25/24",
    date: "20.01.2025",
    title: "Haftung des Sachverständigen bei fehlerhafter Wertermittlung",
    summary: "Das OLG Hamm entschied über die Haftung eines gerichtlich bestellten Sachverständigen nach § 839a BGB. Der Sachverständige haftet für grob fahrlässige Fehler in der Wertermittlung, die zu einem Schaden beim Ersteigerer führen. Die Darlegungs- und Beweislast liegt beim Geschädigten.",
    facts: "Ein gerichtlich bestellter Sachverständiger erstellte ein Verkehrswertgutachten für eine Immobilie im Zwangsversteigerungsverfahren. Der Ersteigerer machte geltend, dass das Gutachten den Verkehrswert erheblich zu hoch angesetzt habe, wodurch er einen überhöhten Preis gezahlt habe. Der Ersteigerer klagte auf Schadensersatz nach § 839a BGB.",
    legalIssue: "Haftet ein gerichtlich bestellter Sachverständiger nach § 839a BGB für ein fehlerhaftes Wertgutachten? Welche Anforderungen gelten für die Darlegung grober Fahrlässigkeit?",
    decision: "Das OLG Hamm wies die Klage ab. Der Kläger konnte nicht nachweisen, dass der Sachverständige grob fahrlässig gehandelt hat. Grobe Fahrlässigkeit liegt nur vor, wenn der Sachverständige die im Verkehr erforderliche Sorgfalt in besonders schwerem Maße verletzt hat. Unterschiedliche Bewertungsmethoden oder vertretbare Einschätzungen begründen keine grobe Fahrlässigkeit. Der Kläger muss konkret darlegen, welche Fehler der Sachverständige gemacht hat und warum diese grob fahrlässig waren.",
    practicalImplication: "**Für Immobiliengutachter bedeutet dieses Urteil:**\n\n1. **Haftungsmaßstab:** Die Haftung nach § 839a BGB setzt grobe Fahrlässigkeit voraus, nicht jeder Fehler führt zur Haftung.\n\n2. **Vertretbare Bewertungen:** Unterschiedliche Bewertungsmethoden oder Einschätzungen innerhalb des fachlichen Ermessensspielraums sind zulässig.\n\n3. **Dokumentation:** Gutachter sollten ihre Bewertungsmethoden und Annahmen sorgfältig dokumentieren, um im Streitfall nachweisen zu können, dass sie nicht grob fahrlässig gehandelt haben.\n\n4. **Darlegungslast:** Der Geschädigte muss konkret darlegen, welche Fehler gemacht wurden und warum diese grob fahrlässig waren.\n\n**Praxisempfehlung:** Halten Sie sich an anerkannte Bewertungsverfahren (z.B. ImmoWertV), dokumentieren Sie Ihre Annahmen und Berechnungen nachvollziehbar, und holen Sie bei Unsicherheiten eine zweite Meinung ein.",
    relatedLaws: [
      "§ 839a BGB - Haftung des gerichtlichen Sachverständigen",
      "§ 839 BGB - Haftung bei Amtspflichtverletzung",
      "ImmoWertV - Immobilienwertermittlungsverordnung"
    ],
    tags: ["Sachverständigenhaftung", "Wertermittlung", "Grobe Fahrlässigkeit", "Zwangsversteigerung", "§ 839a BGB"],
    sourceUrl: "https://nrwe.justiz.nrw.de/olgs/hamm/j2025/22_U_25_24_Urteil_20250120.html"
  },
  {
    id: "bgh-xi-zb-22-22",
    court: "BGH",
    reference: "XI ZB 22/22",
    date: "12.11.2024",
    title: "Anforderungen an Feststellungsziele bei Sachverständigengutachten",
    summary: "Der BGH stellte klar, dass das Oberlandesgericht die Grenzen von Feststellungszielen einhalten muss. Ein Sachverständigengutachten muss konkrete, überprüfbare Feststellungen treffen. Vage oder unbestimmte Feststellungsziele sind unzulässig.",
    facts: "In einem Rechtsstreit über die Qualität eines Immobiliengutachtens hatte das OLG ein Sachverständigengutachten eingeholt. Der BGH beanstandete, dass das OLG die Feststellungsziele zu weit gefasst hatte, wodurch das Gutachten nicht die erforderliche Klarheit und Überprüfbarkeit aufwies.",
    legalIssue: "Welche Anforderungen gelten für die Formulierung von Feststellungszielen bei Sachverständigengutachten? Muss das Gericht konkrete, überprüfbare Fragestellungen vorgeben?",
    decision: "Der BGH entschied, dass das Oberlandesgericht die Grenzen von Feststellungszielen einhalten muss. Feststellungsziele müssen so konkret formuliert sein, dass der Sachverständige eindeutige, überprüfbare Aussagen treffen kann. Vage oder unbestimmte Fragestellungen führen zu unverwertbaren Gutachten. Das Gericht muss die Fragestellung so präzisieren, dass das Gutachten als Grundlage für die Entscheidung dienen kann.",
    practicalImplication: "**Für Sachverständige bedeutet dieses Urteil:**\n\n1. **Klare Fragestellung:** Fordern Sie vom Gericht eine konkrete, überprüfbare Fragestellung. Vage Aufträge sollten Sie zurückweisen oder um Präzisierung bitten.\n\n2. **Eindeutige Antworten:** Ihr Gutachten muss eindeutige, überprüfbare Aussagen treffen. Vermeiden Sie vage Formulierungen wie \"möglicherweise\" oder \"könnte\".\n\n3. **Dokumentation:** Dokumentieren Sie, welche Fragestellung Sie erhalten haben und wie Sie diese interpretiert haben.\n\n4. **Qualitätssicherung:** Überprüfen Sie vor Abgabe, ob Ihr Gutachten die gestellten Fragen klar und eindeutig beantwortet.\n\n**Praxisempfehlung:** Klären Sie vor Beginn der Gutachtenerstellung mit dem Gericht, ob die Fragestellung ausreichend konkret ist. Bitten Sie ggf. um Präzisierung, um spätere Beanstandungen zu vermeiden.",
    relatedLaws: [
      "§ 404 ZPO - Sachverständigenbeweis",
      "§ 407 ZPO - Auswahl des Sachverständigen",
      "§ 839a BGB - Haftung des gerichtlichen Sachverständigen"
    ],
    tags: ["Sachverständigengutachten", "Feststellungsziele", "Qualitätssicherung", "Gerichtsgutachten", "Beweisrecht"],
    sourceUrl: "https://datenbank.nwb.de/Dokument/1060681/"
  }
];
