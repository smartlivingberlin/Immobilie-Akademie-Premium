-- Batch 6: 50 additional exam questions for Module 5 (§34i Darlehensvermittlung)
-- ID 301-350
-- Categories: Rechtliche Grundlagen (10), Darlehensarten (10), Finanzierungsplanung (10), Bonitätsprüfung (7), Risiken (7), Verbraucherschutz (6)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES

-- Rechtliche Grundlagen (10 Fragen, ID 301-310)
(5, 'Rechtliche Grundlagen', 'easy', 'Was regelt § 34i GewO?', '["Erlaubnispflicht für Darlehensvermittlung", "Maklererlaubnis", "WEG-Verwaltung", "Mietverwaltung"]', 'Erlaubnispflicht für Darlehensvermittlung', '§ 34i GewO regelt die Erlaubnispflicht für die Darlehensvermittlung (Immobiliardarlehensvermittlung).'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Voraussetzungen müssen für eine Erlaubnis nach § 34i GewO erfüllt sein?', '["Sachkundeprüfung, Vermögensschadenhaftpflichtversicherung, Zuverlässigkeit", "Nur Sachkundeprüfung", "Nur Versicherung", "Keine Voraussetzungen"]', 'Sachkundeprüfung, Vermögensschadenhaftpflichtversicherung, Zuverlässigkeit', 'Voraussetzungen für § 34i-Erlaubnis: Sachkundeprüfung (IHK), Vermögensschadenhaftpflichtversicherung (mind. 1,28 Mio. EUR), Zuverlässigkeit.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist eine Honorar-Anlageberatung nach § 34h GewO?', '["Beratung gegen Honorar ohne Provisionen", "Beratung mit Provisionen", "Kostenlose Beratung", "Beratung nur für Banken"]', 'Beratung gegen Honorar ohne Provisionen', 'Honorar-Anlageberatung (§ 34h GewO): Beratung gegen Honorar, keine Provisionen von Produktanbietern, unabhängige Beratung.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist ein Immobiliardarlehensvermittler?', '["Person, die Immobiliendarlehen vermittelt", "Person, die Immobilien verkauft", "Person, die Immobilien verwaltet", "Person, die Immobilien bewertet"]', 'Person, die Immobiliendarlehen vermittelt', 'Ein Immobiliardarlehensvermittler vermittelt Darlehen zur Finanzierung von Immobilien (§ 34i GewO).'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Pflichten hat ein Darlehensvermittler nach § 34i GewO?', '["Beratungspflicht, Dokumentationspflicht, Aufklärungspflicht", "Nur Beratungspflicht", "Nur Dokumentationspflicht", "Keine Pflichten"]', 'Beratungspflicht, Dokumentationspflicht, Aufklärungspflicht', 'Pflichten eines Darlehensvermittlers: Beratungspflicht, Dokumentationspflicht (Beratungsprotokoll), Aufklärungspflicht (Risiken, Kosten).'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist eine Vermögensschadenhaftpflichtversicherung?', '["Versicherung gegen Schäden durch fehlerhafte Beratung", "Versicherung gegen Diebstahl", "Versicherung gegen Feuer", "Versicherung gegen Arbeitslosigkeit"]', 'Versicherung gegen Schäden durch fehlerhafte Beratung', 'Eine Vermögensschadenhaftpflichtversicherung schützt gegen Schäden, die durch fehlerhafte Beratung entstehen (Pflicht für § 34i, mind. 1,28 Mio. EUR).'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist ein Immobiliardarlehen?', '["Darlehen zur Finanzierung von Immobilien", "Darlehen für Konsumgüter", "Darlehen für Autos", "Darlehen für Urlaub"]', 'Darlehen zur Finanzierung von Immobilien', 'Ein Immobiliardarlehen ist ein Darlehen zur Finanzierung von Immobilien (Kauf, Bau, Renovierung).'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Mindestversicherungssumme gilt für die Vermögensschadenhaftpflichtversicherung nach § 34i GewO?', '["1,28 Mio. EUR pro Schadensfall", "500.000 EUR", "2 Mio. EUR", "Keine Mindestversicherungssumme"]', '1,28 Mio. EUR pro Schadensfall', 'Die Mindestversicherungssumme für die Vermögensschadenhaftpflichtversicherung beträgt 1,28 Mio. EUR pro Schadensfall (§ 34i GewO).'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist eine Sachkundeprüfung nach § 34i GewO?', '["IHK-Prüfung über Kenntnisse in Darlehensvermittlung", "Prüfung über Immobilienbewertung", "Prüfung über Maklerrecht", "Prüfung über WEG-Verwaltung"]', 'IHK-Prüfung über Kenntnisse in Darlehensvermittlung', 'Die Sachkundeprüfung (§ 34i GewO) ist eine IHK-Prüfung über Kenntnisse in Darlehensvermittlung, Finanzierung, Recht, Verbraucherschutz.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Wer darf Immobiliardarlehen vermitteln?', '["Nur Personen mit Erlaubnis nach § 34i GewO", "Jeder", "Nur Banken", "Nur Makler"]', 'Nur Personen mit Erlaubnis nach § 34i GewO', 'Nur Personen mit Erlaubnis nach § 34i GewO dürfen Immobiliardarlehen vermitteln (Erlaubnispflicht).'),

-- Darlehensarten (10 Fragen, ID 311-320)
(5, 'Darlehensarten', 'easy', 'Was ist ein variables Darlehen?', '["Darlehen mit variablem Zinssatz (3-Monats-Euribor)", "Darlehen mit festem Zinssatz", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Darlehen mit variablem Zinssatz (3-Monats-Euribor)', 'Ein variables Darlehen hat einen variablen Zinssatz, der sich an einem Referenzzinssatz (z.B. 3-Monats-Euribor) orientiert.'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde hat ein variables Darlehen mit 3-Monats-Euribor + 1,5% Marge. Der Euribor steigt von 1% auf 3%. Wie hoch ist der neue Zinssatz?', '["4,5%", "3%", "2,5%", "5%"]', '4,5%', 'Neuer Zinssatz: 3% Euribor + 1,5% Marge = 4,5%.'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Cap-Darlehen?', '["Variables Darlehen mit Zinsobergrenze", "Darlehen mit festem Zinssatz", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Variables Darlehen mit Zinsobergrenze', 'Ein Cap-Darlehen ist ein variables Darlehen mit einer Zinsobergrenze (Cap), die den maximalen Zinssatz begrenzt.'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Festdarlehen?', '["Darlehen ohne Tilgung während der Laufzeit", "Darlehen mit monatlicher Tilgung", "Darlehen mit variabler Tilgung", "Darlehen ohne Zinsen"]', 'Darlehen ohne Tilgung während der Laufzeit', 'Ein Festdarlehen ist ein Darlehen ohne Tilgung während der Laufzeit, nur Zinszahlungen. Die Tilgung erfolgt am Ende (z.B. durch Lebensversicherung).'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde hat ein Festdarlehen von 200.000 EUR mit 3% Zinsen. Wie hoch ist die monatliche Rate?', '["500 EUR (nur Zinsen)", "1.000 EUR", "1.500 EUR", "2.000 EUR"]', '500 EUR (nur Zinsen)', 'Monatliche Rate: 200.000 EUR × 3% / 12 = 500 EUR (nur Zinsen, keine Tilgung).'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Volltilgerdarlehen?', '["Darlehen, das am Ende der Zinsbindung vollständig getilgt ist", "Darlehen ohne Tilgung", "Darlehen mit variabler Tilgung", "Darlehen ohne Zinsen"]', 'Darlehen, das am Ende der Zinsbindung vollständig getilgt ist', 'Ein Volltilgerdarlehen ist ein Darlehen, das am Ende der Zinsbindung vollständig getilgt ist (Restschuld = 0 EUR).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein KfW-Darlehen?', '["Förderdarlehen der Kreditanstalt für Wiederaufbau", "Darlehen einer Privatbank", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Förderdarlehen der Kreditanstalt für Wiederaufbau', 'Ein KfW-Darlehen ist ein Förderdarlehen der Kreditanstalt für Wiederaufbau (KfW) mit günstigen Konditionen (z.B. für energieeffizientes Bauen).'),

(5, 'Darlehensarten', 'medium', 'Welche Vorteile hat ein KfW-Darlehen?', '["Niedrige Zinsen, Tilgungszuschüsse, tilgungsfreie Anlaufjahre", "Nur niedrige Zinsen", "Nur Tilgungszuschüsse", "Keine Vorteile"]', 'Niedrige Zinsen, Tilgungszuschüsse, tilgungsfreie Anlaufjahre', 'Vorteile eines KfW-Darlehens: Niedrige Zinsen, Tilgungszuschüsse (bis zu 45%), tilgungsfreie Anlaufjahre (1-5 Jahre).'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Nachrangdarlehen?', '["Darlehen, das im Insolvenzfall nachrangig bedient wird", "Darlehen mit höchster Priorität", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Darlehen, das im Insolvenzfall nachrangig bedient wird', 'Ein Nachrangdarlehen ist ein Darlehen, das im Insolvenzfall nachrangig bedient wird (erst nach vorrangigen Darlehen).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Bauspardarlehen?', '["Darlehen aus einem Bausparvertrag", "Darlehen einer Bank", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Darlehen aus einem Bausparvertrag', 'Ein Bauspardarlehen ist ein Darlehen aus einem Bausparvertrag, das nach der Ansparphase ausgezahlt wird.'),

-- Finanzierungsplanung (10 Fragen, ID 321-330)
(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Eigenkapitalquote?', '["Verhältnis von Eigenkapital zu Gesamtkosten (in %)", "Verhältnis von Fremdkapital zu Gesamtkosten", "Verhältnis von Zinsen zu Tilgung", "Verhältnis von Rate zu Einkommen"]', 'Verhältnis von Eigenkapital zu Gesamtkosten (in %)', 'Die Eigenkapitalquote ist das Verhältnis von Eigenkapital zu Gesamtkosten (in %). Empfehlung: mind. 20%.'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde kauft eine Immobilie für 300.000 EUR mit 60.000 EUR Eigenkapital. Wie hoch ist die Eigenkapitalquote?', '["20%", "10%", "30%", "40%"]', '20%', 'Eigenkapitalquote: 60.000 EUR / 300.000 EUR = 20%.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist eine Vollfinanzierung?', '["Finanzierung ohne Eigenkapital (100% Fremdkapital)", "Finanzierung mit 20% Eigenkapital", "Finanzierung mit 50% Eigenkapital", "Finanzierung ohne Zinsen"]', 'Finanzierung ohne Eigenkapital (100% Fremdkapital)', 'Eine Vollfinanzierung ist eine Finanzierung ohne Eigenkapital (100% Fremdkapital). Risiko: höhere Zinsen, höhere Raten.'),

(5, 'Finanzierungsplanung', 'easy', 'Was sind Nebenkosten beim Immobilienkauf?', '["Grunderwerbsteuer, Notar, Grundbuch, Makler", "Nur Grunderwerbsteuer", "Nur Notar", "Nur Makler"]', 'Grunderwerbsteuer, Notar, Grundbuch, Makler', 'Nebenkosten beim Immobilienkauf: Grunderwerbsteuer (3,5-6,5%), Notar (1-2%), Grundbuch (0,5%), Makler (3-7%).'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde kauft eine Immobilie für 300.000 EUR in Berlin (6% Grunderwerbsteuer). Wie hoch sind die Nebenkosten (ca.)?', '["Ca. 30.000 EUR (10% von 300.000 EUR)", "Ca. 15.000 EUR", "Ca. 45.000 EUR", "Ca. 60.000 EUR"]', 'Ca. 30.000 EUR (10% von 300.000 EUR)', 'Nebenkosten: ca. 10% von 300.000 EUR = 30.000 EUR (Grunderwerbsteuer 6%, Notar 1,5%, Grundbuch 0,5%, Makler 2%).'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist eine Anschlussfinanzierung?', '["Neue Finanzierung nach Ablauf der Zinsbindung", "Erste Finanzierung", "Finanzierung ohne Zinsen", "Finanzierung ohne Tilgung"]', 'Neue Finanzierung nach Ablauf der Zinsbindung', 'Eine Anschlussfinanzierung ist eine neue Finanzierung nach Ablauf der Zinsbindung (Prolongation oder Umschuldung).'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Prolongation?', '["Verlängerung des Darlehens bei derselben Bank", "Wechsel zu einer anderen Bank", "Vorzeitige Tilgung", "Kündigung des Darlehens"]', 'Verlängerung des Darlehens bei derselben Bank', 'Eine Prolongation ist die Verlängerung des Darlehens bei derselben Bank nach Ablauf der Zinsbindung.'),

(5, 'Finanzierungsplanung', 'medium', 'Was ist eine Umschuldung?', '["Wechsel zu einer anderen Bank mit besseren Konditionen", "Verlängerung bei derselben Bank", "Vorzeitige Tilgung", "Kündigung des Darlehens"]', 'Wechsel zu einer anderen Bank mit besseren Konditionen', 'Eine Umschuldung ist der Wechsel zu einer anderen Bank mit besseren Konditionen nach Ablauf der Zinsbindung.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist ein Forward-Darlehen?', '["Darlehen, das heute abgeschlossen wird, aber erst in der Zukunft ausgezahlt wird", "Darlehen, das sofort ausgezahlt wird", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Darlehen, das heute abgeschlossen wird, aber erst in der Zukunft ausgezahlt wird', 'Ein Forward-Darlehen ist ein Darlehen, das heute abgeschlossen wird, aber erst in der Zukunft (bis zu 5 Jahre) ausgezahlt wird (Zinssicherung).'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Sondertilgung?', '["Außerplanmäßige Tilgung zusätzlich zur monatlichen Rate", "Monatliche Tilgung", "Tilgung am Ende der Laufzeit", "Keine Tilgung"]', 'Außerplanmäßige Tilgung zusätzlich zur monatlichen Rate', 'Eine Sondertilgung ist eine außerplanmäßige Tilgung zusätzlich zur monatlichen Rate (reduziert Restschuld und Zinslast).'),

-- Bonitätsprüfung (7 Fragen, ID 331-337)
(5, 'Bonitätsprüfung', 'easy', 'Was ist eine Selbstauskunft?', '["Formular mit Angaben zu Einkommen, Ausgaben, Vermögen, Schulden", "Schufa-Auskunft", "Grundbuchauszug", "Arbeitsvertrag"]', 'Formular mit Angaben zu Einkommen, Ausgaben, Vermögen, Schulden', 'Eine Selbstauskunft ist ein Formular mit Angaben zu Einkommen, Ausgaben, Vermögen, Schulden (Grundlage für Bonitätsprüfung).'),

(5, 'Bonitätsprüfung', 'medium', 'Welche Unterlagen werden für eine Bonitätsprüfung benötigt?', '["Selbstauskunft, Schufa-Auskunft, Einkommensnachweise, Kontoauszüge", "Nur Selbstauskunft", "Nur Schufa-Auskunft", "Nur Einkommensnachweise"]', 'Selbstauskunft, Schufa-Auskunft, Einkommensnachweise, Kontoauszüge', 'Unterlagen für Bonitätsprüfung: Selbstauskunft, Schufa-Auskunft, Einkommensnachweise (Gehaltsabrechnungen), Kontoauszüge (3 Monate).'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist eine Haushaltsrechnung?', '["Gegenüberstellung von Einnahmen und Ausgaben", "Schufa-Auskunft", "Grundbuchauszug", "Arbeitsvertrag"]', 'Gegenüberstellung von Einnahmen und Ausgaben', 'Eine Haushaltsrechnung ist eine Gegenüberstellung von Einnahmen und Ausgaben (Grundlage für Berechnung der maximalen Rate).'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist ein Einkommensnachweis?', '["Gehaltsabrechnung, Steuerbescheid, Rentenbescheid", "Schufa-Auskunft", "Grundbuchauszug", "Arbeitsvertrag"]', 'Gehaltsabrechnung, Steuerbescheid, Rentenbescheid', 'Ein Einkommensnachweis ist eine Gehaltsabrechnung, Steuerbescheid oder Rentenbescheid (Nachweis des Einkommens).'),

(5, 'Bonitätsprüfung', 'medium', 'Ein Kunde hat ein Nettoeinkommen von 3.000 EUR und Ausgaben von 2.000 EUR. Wie hoch ist das verfügbare Einkommen?', '["1.000 EUR", "500 EUR", "1.500 EUR", "2.000 EUR"]', '1.000 EUR', 'Verfügbares Einkommen: 3.000 EUR - 2.000 EUR = 1.000 EUR.'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist eine Debt-to-Income-Ratio (DTI)?', '["Verhältnis von Schulden zu Einkommen (in %)", "Verhältnis von Eigenkapital zu Fremdkapital", "Verhältnis von Zinsen zu Tilgung", "Verhältnis von Rate zu Einkommen"]', 'Verhältnis von Schulden zu Einkommen (in %)', 'Die Debt-to-Income-Ratio (DTI) ist das Verhältnis von Schulden zu Einkommen (in %). Empfehlung: max. 40%.'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist eine Schufa-Auskunft?', '["Auskunft über Kreditwürdigkeit und Zahlungsverhalten", "Grundbuchauszug", "Arbeitsvertrag", "Gehaltsabrechnung"]', 'Auskunft über Kreditwürdigkeit und Zahlungsverhalten', 'Eine Schufa-Auskunft ist eine Auskunft über Kreditwürdigkeit und Zahlungsverhalten (Grundlage für Bonitätsprüfung).'),

-- Risiken (7 Fragen, ID 338-344)
(5, 'Risiken', 'easy', 'Was ist ein Arbeitslosigkeitsrisiko?', '["Risiko, dass der Kunde arbeitslos wird und die Raten nicht mehr zahlen kann", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten"]', 'Risiko, dass der Kunde arbeitslos wird und die Raten nicht mehr zahlen kann', 'Das Arbeitslosigkeitsrisiko ist das Risiko, dass der Kunde arbeitslos wird und die Raten nicht mehr zahlen kann.'),

(5, 'Risiken', 'medium', 'Wie kann ein Kunde das Arbeitslosigkeitsrisiko absichern?', '["Restschuldversicherung, Rücklagen, Sondertilgungen", "Nur Restschuldversicherung", "Nur Rücklagen", "Nur Sondertilgungen"]', 'Restschuldversicherung, Rücklagen, Sondertilgungen', 'Absicherung gegen Arbeitslosigkeitsrisiko: Restschuldversicherung (zahlt Raten bei Arbeitslosigkeit), Rücklagen (3-6 Monatsraten), Sondertilgungen (Restschuld reduzieren).'),

(5, 'Risiken', 'hard', 'Was ist eine Restschuldversicherung?', '["Versicherung, die Raten bei Arbeitslosigkeit, Krankheit oder Tod zahlt", "Versicherung gegen Zinsänderungen", "Versicherung gegen sinkende Immobilienpreise", "Versicherung gegen steigende Nebenkosten"]', 'Versicherung, die Raten bei Arbeitslosigkeit, Krankheit oder Tod zahlt', 'Eine Restschuldversicherung zahlt die Raten bei Arbeitslosigkeit, Krankheit oder Tod des Versicherten.'),

(5, 'Risiken', 'easy', 'Was ist ein Krankheitsrisiko?', '["Risiko, dass der Kunde krank wird und die Raten nicht mehr zahlen kann", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten"]', 'Risiko, dass der Kunde krank wird und die Raten nicht mehr zahlen kann', 'Das Krankheitsrisiko ist das Risiko, dass der Kunde krank wird und die Raten nicht mehr zahlen kann.'),

(5, 'Risiken', 'medium', 'Wie kann ein Kunde das Krankheitsrisiko absichern?', '["Berufsunfähigkeitsversicherung, Restschuldversicherung, Rücklagen", "Nur Berufsunfähigkeitsversicherung", "Nur Restschuldversicherung", "Nur Rücklagen"]', 'Berufsunfähigkeitsversicherung, Restschuldversicherung, Rücklagen', 'Absicherung gegen Krankheitsrisiko: Berufsunfähigkeitsversicherung (zahlt Rente bei Berufsunfähigkeit), Restschuldversicherung, Rücklagen.'),

(5, 'Risiken', 'hard', 'Was ist eine Berufsunfähigkeitsversicherung?', '["Versicherung, die Rente bei Berufsunfähigkeit zahlt", "Versicherung gegen Arbeitslosigkeit", "Versicherung gegen Tod", "Versicherung gegen Zinsänderungen"]', 'Versicherung, die Rente bei Berufsunfähigkeit zahlt', 'Eine Berufsunfähigkeitsversicherung zahlt eine monatliche Rente, wenn der Versicherte berufsunfähig wird (z.B. durch Krankheit oder Unfall).'),

(5, 'Risiken', 'easy', 'Was ist ein Todesrisiko?', '["Risiko, dass der Kunde stirbt und die Hinterbliebenen die Raten nicht mehr zahlen können", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten"]', 'Risiko, dass der Kunde stirbt und die Hinterbliebenen die Raten nicht mehr zahlen können', 'Das Todesrisiko ist das Risiko, dass der Kunde stirbt und die Hinterbliebenen die Raten nicht mehr zahlen können.'),

-- Verbraucherschutz (6 Fragen, ID 345-350)
(5, 'Verbraucherschutz', 'easy', 'Was ist ein Widerrufsrecht?', '["Recht, einen Vertrag innerhalb von 14 Tagen zu widerrufen", "Recht, einen Vertrag sofort zu kündigen", "Recht, einen Vertrag zu verlängern", "Kein Recht"]', 'Recht, einen Vertrag innerhalb von 14 Tagen zu widerrufen', 'Das Widerrufsrecht ist das Recht, einen Vertrag innerhalb von 14 Tagen ohne Angabe von Gründen zu widerrufen (§ 495 BGB).'),

(5, 'Verbraucherschutz', 'medium', 'Wie lange beträgt die Widerrufsfrist bei einem Immobiliardarlehensvertrag?', '["14 Tage ab Vertragsschluss", "7 Tage", "30 Tage", "Keine Widerrufsfrist"]', '14 Tage ab Vertragsschluss', 'Die Widerrufsfrist beträgt 14 Tage ab Vertragsschluss (§ 495 BGB).'),

(5, 'Verbraucherschutz', 'hard', 'Was passiert, wenn die Widerrufsbelehrung fehlerhaft ist?', '["Widerrufsfrist beginnt nicht, ewiges Widerrufsrecht", "Widerrufsfrist beginnt normal", "Vertrag ist nichtig", "Nur Bußgeld"]', 'Widerrufsfrist beginnt nicht, ewiges Widerrufsrecht', 'Wenn die Widerrufsbelehrung fehlerhaft ist, beginnt die Widerrufsfrist nicht, und der Kunde hat ein ewiges Widerrufsrecht (bis zu 1 Jahr + 14 Tage).'),

(5, 'Verbraucherschutz', 'easy', 'Was ist eine Widerrufsbelehrung?', '["Belehrung über das Widerrufsrecht", "Belehrung über Zinsen", "Belehrung über Tilgung", "Belehrung über Nebenkosten"]', 'Belehrung über das Widerrufsrecht', 'Eine Widerrufsbelehrung ist eine Belehrung über das Widerrufsrecht (Pflicht bei Vertragsschluss, § 495 BGB).'),

(5, 'Verbraucherschutz', 'medium', 'Ein Kunde widerruft einen Darlehensvertrag nach 10 Tagen. Welche Folgen hat das?', '["Vertrag ist aufgehoben, Kunde muss Darlehen zurückzahlen", "Vertrag bleibt bestehen", "Nur Bußgeld", "Keine Folgen"]', 'Vertrag ist aufgehoben, Kunde muss Darlehen zurückzahlen', 'Widerruf: Vertrag ist aufgehoben, Kunde muss Darlehen zurückzahlen (ggf. mit Zinsen), keine Vorfälligkeitsentschädigung.'),

(5, 'Verbraucherschutz', 'hard', 'Was ist eine Vorfälligkeitsentschädigung?', '["Entschädigung der Bank bei vorzeitiger Rückzahlung des Darlehens", "Entschädigung des Kunden", "Entschädigung bei Widerruf", "Keine Entschädigung"]', 'Entschädigung der Bank bei vorzeitiger Rückzahlung des Darlehens', 'Eine Vorfälligkeitsentschädigung ist eine Entschädigung der Bank bei vorzeitiger Rückzahlung des Darlehens (Ausgleich für entgangene Zinsen).');
