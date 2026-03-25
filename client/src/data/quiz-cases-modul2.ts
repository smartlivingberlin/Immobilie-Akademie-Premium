import { QuizCase } from "@/components/AIQuizCase";

export const quizCasesModule2: QuizCase[] = [
  {
    id: "modul2-case-1",
    title: "Maklercourtage bei Kaufvertrag — Halbteilungsprinzip",
    category: "Maklerrecht & Provision",
    difficulty: "Fortgeschritten",
    scenario: "Frau Weber beauftragt Maklerin Schulz mit dem Verkauf ihrer Eigentumswohnung in Berlin für 350.000 €. Im Maklervertrag ist eine Provision von 7,14% inkl. MwSt. vereinbart. Maklerin Schulz findet einen Käufer, Herrn Braun. Frau Weber möchte, dass Herr Braun die gesamte Provision zahlt, da sie ihn ja als Käufer 'mitgebracht' habe.",
    question: "Darf Frau Weber die gesamte Provision auf den Käufer abwälzen? Berechnen Sie die korrekte Provisionsverteilung und nennen Sie die Rechtsgrundlage.",
    legalContext: [
      "§ 656c BGB — Lohnanspruch bei Tätigkeit für beide Parteien (Halbteilung)",
      "§ 656d BGB — Vereinbarungen über die Maklervergütung",
      "§ 652 BGB — Entstehung des Lohnanspruchs"
    ],
    correctAnswer: "Nein, Frau Weber darf die Provision nicht vollständig auf den Käufer abwälzen.\n\n**Rechtsgrundlage: § 656c BGB (seit 23.12.2020)**\n\nBei der Vermittlung von Kaufverträgen über Wohnungen und Einfamilienhäuser gilt das Halbteilungsprinzip:\n\n1. **Wenn der Verkäufer den Makler beauftragt:** Die Provision muss mindestens zu gleichen Teilen getragen werden.\n2. **Berechnung:**\n   - Kaufpreis: 350.000 €\n   - Gesamtprovision 7,14% = 24.990 €\n   - Anteil Verkäuferin (Frau Weber): 3,57% = 12.495 €\n   - Anteil Käufer (Herr Braun): 3,57% = 12.495 €\n\n3. **Wichtig:** Der Käufer muss seinen Anteil erst zahlen, wenn der Verkäufer nachweist, dass er seinen Anteil bereits gezahlt hat (§ 656d Abs. 1 BGB).\n\n**Ausnahme:** Bei Gewerbeimmobilien oder Mehrfamilienhäusern (ab 3 Wohnungen) gilt das Halbteilungsprinzip NICHT.",
    commonMistakes: [
      "Annahme, dass der Verkäufer die gesamte Provision auf den Käufer umlegen darf",
      "Verwechslung mit dem Bestellerprinzip (gilt nur bei Mietwohnungen)",
      "Vergessen der Nachweispflicht des Verkäufers über seine Zahlung",
      "Falsche Anwendung auf Gewerbeimmobilien oder MFH"
    ],
    learningPoints: [
      "§ 656c BGB: Halbteilungsprinzip bei Wohnungskauf seit 23.12.2020",
      "Gilt nur für Wohnungen und Einfamilienhäuser, nicht für Gewerbe/MFH",
      "Verkäufer muss Zahlungsnachweis erbringen bevor Käufer zahlen muss",
      "Standardprovision in Berlin: 7,14% inkl. MwSt. (3,57% je Seite)"
    ]
  },
  {
    id: "modul2-case-2",
    title: "Widerrufsrecht beim Maklervertrag — Fernabsatz",
    category: "Verbraucherschutz & Maklerrecht",
    difficulty: "Fortgeschritten",
    scenario: "Herr Yilmaz findet auf ImmoScout24 eine Wohnung und klickt auf 'Kontakt aufnehmen'. Er erhält automatisch eine E-Mail mit einem Maklervertrag als PDF, den er digital unterschreibt. Drei Tage später besichtigt er die Wohnung. Nach der Besichtigung entscheidet er sich gegen den Kauf. Der Makler verlangt nun eine 'Besichtigungsgebühr' von 500 €.",
    question: "Hat Herr Yilmaz ein Widerrufsrecht? Muss er die Besichtigungsgebühr zahlen? Begründen Sie mit den einschlägigen Paragraphen.",
    legalContext: [
      "§ 312g BGB — Widerrufsrecht bei Fernabsatzverträgen",
      "§ 355 BGB — Widerrufsrecht bei Verbraucherverträgen (14 Tage)",
      "§ 656a BGB — Textformerfordernis für Maklerverträge",
      "§ 652 BGB — Provisionsanspruch nur bei Hauptvertragabschluss"
    ],
    correctAnswer: "Ja, Herr Yilmaz hat ein Widerrufsrecht, und nein, er muss keine Besichtigungsgebühr zahlen.\n\n**1. Widerrufsrecht (§ 312g i.V.m. § 355 BGB):**\n- Der Maklervertrag wurde online geschlossen (Fernabsatz)\n- Herr Yilmaz ist Verbraucher\n- Widerrufsfrist: 14 Tage ab Vertragsschluss\n- Er kann den Vertrag ohne Angabe von Gründen widerrufen\n\n**2. Besichtigungsgebühr:**\n- Nach § 652 BGB entsteht der Provisionsanspruch NUR bei erfolgreichem Abschluss des Hauptvertrags (Kaufvertrag)\n- Eine reine Besichtigung löst keinen Zahlungsanspruch aus\n- Besichtigungsgebühren sind bei Verbrauchern unzulässig und verstoßen gegen AGB-Recht (§ 307 BGB)\n\n**3. Widerrufsbelehrung:**\n- Falls der Makler keine ordnungsgemäße Widerrufsbelehrung erteilt hat, verlängert sich die Frist auf 12 Monate + 14 Tage\n\n**Fazit:** Herr Yilmaz muss nichts zahlen. Er kann widerrufen und die Besichtigungsgebühr ist ohnehin unzulässig.",
    commonMistakes: [
      "Annahme, dass eine Besichtigung Zahlungspflichten auslöst",
      "Übersehen des Fernabsatz-Widerrufsrechts bei Online-Verträgen",
      "Verwechslung von Provisionsanspruch und Aufwandsentschädigung",
      "Vergessen der verlängerten Frist bei fehlender Widerrufsbelehrung"
    ],
    learningPoints: [
      "Online-Maklerverträge unterliegen dem Fernabsatzrecht (14 Tage Widerruf)",
      "Provision entsteht NUR bei Abschluss des Hauptvertrags (Erfolgshonorar)",
      "Besichtigungsgebühren für Verbraucher sind unzulässig",
      "Fehlende Widerrufsbelehrung verlängert die Frist auf 12 Monate + 14 Tage"
    ]
  },
  {
    id: "modul2-case-3",
    title: "Doppeltätigkeit und Interessenkonflikt",
    category: "Berufsrecht & Ethik",
    difficulty: "Experte",
    scenario: "Makler Fischer wird von Verkäufer Hoffmann beauftragt, ein Mehrfamilienhaus (6 Wohnungen) in Hamburg für 1,2 Mio. € zu verkaufen. Gleichzeitig betreut Fischer seit Jahren Investor Schmidt als Stammkunden, der genau solche Objekte sucht. Fischer vermittelt das Objekt an Schmidt für 1,05 Mio. € — deutlich unter dem Angebotspreis. Schmidt zahlt Fischer zusätzlich eine 'Beratergebühr' von 15.000 €. Verkäufer Hoffmann erfährt davon erst nach der notariellen Beurkundung.",
    question: "Welche rechtlichen Probleme ergeben sich aus dem Verhalten des Maklers Fischer? Prüfen Sie Doppeltätigkeit, Treuepflichten und mögliche Schadenersatzansprüche.",
    legalContext: [
      "§ 654 BGB — Verwirkung des Lohnanspruchs bei Treuepflichtverletzung",
      "§ 652 BGB — Maklerpflichten",
      "§ 280 BGB — Schadensersatz wegen Pflichtverletzung",
      "§ 138 BGB — Sittenwidrigkeit"
    ],
    correctAnswer: "Makler Fischer hat mehrfach gegen seine Pflichten verstoßen:\n\n**1. Doppeltätigkeit (grundsätzlich erlaubt, aber mit Pflichten):**\n- Doppeltätigkeit ist nach § 652 BGB grundsätzlich zulässig\n- ABER: Der Makler muss beide Seiten GLEICHMÄSSIG und FAIR vertreten\n- Er darf keine Seite bevorzugen\n\n**2. Treuepflichtverletzung:**\n- Fischer hat den Verkäufer Hoffmann benachteiligt (150.000 € unter Angebotspreis)\n- Die verdeckte 'Beratergebühr' von 15.000 € an den Käufer zeigt Interessenkonflikt\n- Fischer hat seine Aufklärungspflicht gegenüber dem Verkäufer verletzt\n\n**3. Rechtsfolgen:**\n- **§ 654 BGB:** Verwirkung des gesamten Provisionsanspruchs wegen grober Treuepflichtverletzung\n- **§ 280 BGB:** Schadensersatzanspruch des Verkäufers (Differenz zum erzielbaren Preis)\n- Die verdeckte Zahlung könnte als **§ 138 BGB** (Sittenwidrigkeit) gewertet werden\n\n**4. Berechnung möglicher Ansprüche:**\n- Provisionsverlust: ca. 35.700 € (bei 3% von 1,19 Mio.)\n- Schadensersatz: bis zu 150.000 € (Differenz Angebot vs. Verkaufspreis)\n- Rückzahlung Beratergebühr: 15.000 €\n\n**Fazit:** Fischer verliert seinen Provisionsanspruch und haftet auf Schadensersatz.",
    commonMistakes: [
      "Annahme, dass Doppeltätigkeit generell verboten ist",
      "Übersehen der Verwirkung nach § 654 BGB",
      "Keine Differenzierung zwischen erlaubter Doppeltätigkeit und Pflichtverletzung",
      "Vergessen des Schadensersatzanspruchs nach § 280 BGB"
    ],
    learningPoints: [
      "Doppeltätigkeit ist grundsätzlich erlaubt, aber mit strengen Treuepflichten",
      "§ 654 BGB: Grobe Pflichtverletzung führt zur Verwirkung der gesamten Provision",
      "Verdeckte Zahlungen/Bevorzugung einer Seite = schwere Treuepflichtverletzung",
      "Makler haftet auf Schadensersatz bei nachweisbarer Benachteiligung"
    ]
  }
];
