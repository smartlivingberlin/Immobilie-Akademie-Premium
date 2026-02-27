export interface CourtCaseModule2 {
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

export const courtCasesModule2: CourtCaseModule2[] = [
  {
    id: "bghi-zr-32-24",
    court: "BGH",
    reference: "I ZR 32/24",
    date: "06.03.2025",
    title: "Verstoß gegen den Halbteilungsgrundsatz bei Kauf eines Einfamilienhauses",
    summary: "Der BGH entschied, dass ein Maklervertrag unwirksam ist, wenn der Makler von Verkäufer und Käufer unterschiedlich hohe Provisionen vereinbart. Der Halbteilungsgrundsatz nach § 656c BGB gilt auch, wenn der Makler mit einem Dritten (z.B. Ehepartner des Verkäufers) kontrahiert.",
    facts: "Die Klägerin (Maklerin) schloss mit den Beklagten (Käufern) eine Courtagevereinbarung. Die Beklagten erwarben eine Immobilie mit Einfamilienhaus, Büroanbau und Garage. Die Maklerin war von der Ehefrau des Eigentümers mit der Vermarktung beauftragt worden, wobei eine abweichende Provision vereinbart war als mit den Käufern.",
    legalIssue: "Ist ein Maklervertrag gemäß § 656c BGB unwirksam, wenn der Makler von Verkäufer und Käufer unterschiedlich hohe Provisionen vereinbart? Gilt der Halbteilungsgrundsatz auch, wenn der Makler nicht mit dem Verkäufer selbst, sondern mit dessen Ehefrau kontrahiert?",
    decision: "Der BGH bestätigte die Unwirksamkeit des Maklervertrags. § 656c BGB ist entsprechend anzuwenden, wenn anstelle einer Kaufvertragspartei ein Dritter (hier: Ehefrau des Verkäufers) den Maklervertrag abschließt. Der Zweck des § 656c BGB, Verbraucher vor unbilliger Kostenabwälzung zu schützen, ist unabhängig davon berührt, ob der Maklervertrag mit einer Kaufvertragspartei oder einem Dritten geschlossen wird. Ein Büroanbau von 1/5 der Gesamtfläche steht der Einordnung als Einfamilienhaus nicht entgegen, wenn die Immobilie erkennbar Wohnzwecken dient.",
    practicalImplication: "**Für Immobilienmakler bedeutet dieses Urteil:**\n\n1. **Strikte Einhaltung des Halbteilungsgrundsatzes:** Bei Doppeltätigkeit (Verkäufer und Käufer) muss die Provision zwingend gleich hoch sein, unabhängig davon, wer den Vertrag unterschreibt.\n\n2. **Keine Umgehung durch Dritte:** Die Beauftragung durch Ehepartner oder andere Dritte anstelle der Kaufvertragspartei ändert nichts an der Anwendbarkeit des § 656c BGB.\n\n3. **Definition Einfamilienhaus:** Auch Immobilien mit untergeordneter gewerblicher Nutzung (bis ca. 20% der Fläche) fallen unter den Schutzbereich, wenn sie erkennbar Wohnzwecken dienen.\n\n4. **Rechtsfolge:** Bei Verstoß ist der gesamte Maklervertrag unwirksam – kein Provisionsanspruch!\n\n**Praxisempfehlung:** Dokumentieren Sie die Provisionsvereinbarungen sorgfältig und stellen Sie sicher, dass beide Seiten identische Provisionen zahlen. Klären Sie frühzeitig, wer Vertragspartner ist.",
    relatedLaws: [
      "§ 656c BGB - Halbteilungsgrundsatz",
      "§ 656a BGB - Bestellerprinzip",
      "§ 654 BGB - Maklervertrag"
    ],
    tags: ["Maklerprovision", "Halbteilungsgrundsatz", "Doppeltätigkeit", "Einfamilienhaus", "Verbraucherschutz"],
    sourceUrl: "https://www.bundesgerichtshof.de/SharedDocs/Pressemitteilungen/DE/2025/2025044.html"
  },
  {
    id: "bghi-zr-159-24",
    court: "BGH",
    reference: "I ZR 159/24",
    date: "09.10.2025",
    title: "Unwirksamkeit von Online-Maklerverträgen ohne Button-Lösung",
    summary: "Der BGH entschied, dass Maklerverträge mit Verbrauchern, die online abgeschlossen werden, der Button-Lösung nach § 312j BGB unterliegen. Fehlt die ausdrückliche Bestätigung der Zahlungspflicht durch einen Button, ist der Vertrag unwirksam. Bereits gezahlte Provisionen können zurückgefordert werden.",
    facts: "Die Klägerin (Maklerin) bot ihre Dienstleistungen online an. Verbraucher schlossen Maklerverträge über die Website ab, ohne dass ein Button mit der Aufschrift 'zahlungspflichtig bestellen' oder einer entsprechenden eindeutigen Formulierung vorhanden war. Nach erfolgreichem Nachweis forderte die Maklerin die vereinbarte Provision.",
    legalIssue: "Unterliegt ein online abgeschlossener Maklervertrag der Button-Lösung nach § 312j BGB? Welche Anforderungen gelten für die Gestaltung des Bestellvorgangs?",
    decision: "Der BGH stellte klar, dass ein Maklervertrag einen Vertrag darstellt, bei dem sich der Verbraucher zu einer Zahlung verpflichtet (§ 312j Abs. 3 Satz 1 BGB). Daher muss der Makler sicherstellen, dass der Verbraucher mit seiner Bestellung ausdrücklich bestätigt, dass er sich zu einer Zahlung verpflichtet. Dies erfordert einen Button mit der Aufschrift 'zahlungspflichtig bestellen' oder einer entsprechenden eindeutigen Formulierung. Fehlt diese Bestätigung, kommt kein wirksamer Vertrag zustande. Bereits gezahlte Provisionen können nach Bereicherungsrecht zurückgefordert werden.",
    practicalImplication: "**Für Online-Makler bedeutet dieses Urteil:**\n\n1. **Button-Pflicht:** Jeder online abgeschlossene Maklervertrag muss einen Button mit der Aufschrift 'zahlungspflichtig bestellen' oder einer gleichwertigen Formulierung enthalten.\n\n2. **Keine Ausnahme für Maklerverträge:** Die Button-Lösung gilt auch für Maklerverträge, nicht nur für klassische Online-Shops.\n\n3. **Rückforderungsrisiko:** Verträge ohne korrekte Button-Lösung sind unwirksam. Bereits gezahlte Provisionen können zurückgefordert werden.\n\n4. **Technische Umsetzung:** Die Website muss so gestaltet sein, dass der Verbraucher vor Vertragsschluss eindeutig auf die Zahlungspflicht hingewiesen wird.\n\n**Praxisempfehlung:** Überprüfen Sie Ihre Online-Vertragsabschluss-Prozesse und implementieren Sie die Button-Lösung gemäß § 312j BGB. Lassen Sie die technische Umsetzung rechtlich prüfen, um Rückforderungsrisiken zu vermeiden.",
    relatedLaws: [
      "§ 312j BGB - Button-Lösung",
      "§ 312 BGB - Fernabsatzverträge",
      "§ 654 BGB - Maklervertrag",
      "§ 812 BGB - Bereicherungsrecht"
    ],
    tags: ["Online-Maklervertrag", "Button-Lösung", "Verbraucherschutz", "Rückforderung", "E-Commerce"],
    sourceUrl: "https://www.anwalt.de/rechtstipps/maklerprovision-nach-bgh-urteil-zurueckfordern-az-i-zr-159-24-262900.html"
  }
];
