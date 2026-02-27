-- Batch 4: 50 additional exam questions for Module 5 (§34i Darlehensvermittlung)
-- Total after this batch: 250 questions
-- Distribution: Rechtliche Grundlagen (10), Darlehensarten (10), Finanzierungsplanung (10), Bonitätsprüfung (7), Risiken (7), Verbraucherschutz (6)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES

-- Rechtliche Grundlagen (10 Fragen, ID 201-210)
(5, 'Rechtliche Grundlagen', 'easy', 'Was regelt § 34i GewO?', '["Erlaubnispflicht für Immobiliardarlehensvermittlung", "Erlaubnispflicht für Immobilienmakler", "Erlaubnispflicht für Verwalter", "Erlaubnispflicht für Gutachter"]', 'Erlaubnispflicht für Immobiliardarlehensvermittlung', '§ 34i GewO regelt die Erlaubnispflicht für die Vermittlung von Immobiliardarlehensverträgen.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Voraussetzungen muss ein Darlehensvermittler nach § 34i GewO erfüllen?', '["Sachkunde, Berufshaftpflichtversicherung, Registrierung", "Nur Sachkunde", "Nur Berufshaftpflichtversicherung", "Nur Registrierung"]', 'Sachkunde, Berufshaftpflichtversicherung, Registrierung', 'Ein Darlehensvermittler muss Sachkunde nachweisen, eine Berufshaftpflichtversicherung abschließen und sich im Vermittlerregister registrieren lassen.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist der Unterschied zwischen Darlehensvermittlung und Darlehensberatung?', '["Vermittlung: Vertragsabschluss, Beratung: nur Information", "Vermittlung: nur Information, Beratung: Vertragsabschluss", "Kein Unterschied", "Vermittlung ist kostenpflichtig, Beratung kostenlos"]', 'Vermittlung: Vertragsabschluss, Beratung: nur Information', 'Darlehensvermittlung führt zum Vertragsabschluss, Darlehensberatung bietet nur Informationen ohne Vertragsabschluss.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Welche Mindestdeckungssumme gilt für die Berufshaftpflichtversicherung nach § 34i GewO?', '["1,26 Millionen EUR pro Schadensfall", "500.000 EUR pro Schadensfall", "2 Millionen EUR pro Schadensfall", "Keine Mindestdeckungssumme"]', '1,26 Millionen EUR pro Schadensfall', 'Die Mindestdeckungssumme für die Berufshaftpflichtversicherung beträgt 1,26 Millionen EUR pro Schadensfall nach § 34i Abs. 2 GewO.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Ein Darlehensvermittler hat keine Berufshaftpflichtversicherung. Welche Rechtsfolge tritt ein?', '["Erlöschen der Erlaubnis, Bußgeld bis 50.000 EUR", "Nur Bußgeld", "Nur Erlöschen der Erlaubnis", "Keine Rechtsfolge"]', 'Erlöschen der Erlaubnis, Bußgeld bis 50.000 EUR', 'Ohne Berufshaftpflichtversicherung erlischt die Erlaubnis nach § 34i Abs. 2 GewO, zusätzlich droht ein Bußgeld bis 50.000 EUR.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist eine gebundene Vermittlung nach § 34i GewO?', '["Vermittlung nur für einen Darlehensgeber", "Vermittlung für mehrere Darlehensgeber", "Vermittlung ohne Provision", "Vermittlung ohne Erlaubnis"]', 'Vermittlung nur für einen Darlehensgeber', 'Eine gebundene Vermittlung liegt vor, wenn der Vermittler nur für einen Darlehensgeber tätig ist (§ 34i Abs. 1 Nr. 2 GewO).'),

(5, 'Rechtliche Grundlagen', 'easy', 'Wo muss sich ein Darlehensvermittler registrieren lassen?', '["Vermittlerregister (§ 11a GewO)", "Handelsregister", "Grundbuch", "IHK"]', 'Vermittlerregister (§ 11a GewO)', 'Ein Darlehensvermittler muss sich im Vermittlerregister nach § 11a GewO registrieren lassen.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Angaben muss ein Darlehensvermittler im Vermittlerregister machen?', '["Name, Anschrift, Registernummer, Vermittlerstatus", "Nur Name", "Nur Anschrift", "Nur Registernummer"]', 'Name, Anschrift, Registernummer, Vermittlerstatus', 'Im Vermittlerregister müssen Name, Anschrift, Registernummer und Vermittlerstatus (gebunden/ungebunden) angegeben werden.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist der Unterschied zwischen gebundener und ungebundener Vermittlung?', '["Gebunden: nur ein Darlehensgeber, Ungebunden: mehrere Darlehensgeber", "Gebunden: mehrere Darlehensgeber, Ungebunden: nur ein Darlehensgeber", "Kein Unterschied", "Gebunden ist kostenpflichtig, Ungebunden kostenlos"]', 'Gebunden: nur ein Darlehensgeber, Ungebunden: mehrere Darlehensgeber', 'Gebundene Vermittler arbeiten nur für einen Darlehensgeber, ungebundene Vermittler arbeiten für mehrere Darlehensgeber.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Welche Pflichten hat ein Darlehensvermittler gegenüber dem Kunden?', '["Beratungspflicht, Dokumentationspflicht, Informationspflicht", "Nur Beratungspflicht", "Nur Dokumentationspflicht", "Nur Informationspflicht"]', 'Beratungspflicht, Dokumentationspflicht, Informationspflicht', 'Ein Darlehensvermittler hat Beratungs-, Dokumentations- und Informationspflichten gegenüber dem Kunden (§ 511 BGB, Art. 247 § 13 EGBGB).'),

-- Darlehensarten (10 Fragen, ID 211-220)
(5, 'Darlehensarten', 'easy', 'Was ist ein Forward-Darlehen?', '["Darlehen mit zukünftiger Auszahlung und festem Zinssatz", "Darlehen mit sofortiger Auszahlung", "Darlehen mit variablem Zinssatz", "Darlehen ohne Zinsen"]', 'Darlehen mit zukünftiger Auszahlung und festem Zinssatz', 'Ein Forward-Darlehen ist ein Darlehen, das erst in der Zukunft ausgezahlt wird, aber bereits heute zu einem festen Zinssatz abgeschlossen wird.'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde möchte in 2 Jahren eine Anschlussfinanzierung. Welches Darlehen ist geeignet?', '["Forward-Darlehen", "Annuitätendarlehen", "Tilgungsdarlehen", "Festdarlehen"]', 'Forward-Darlehen', 'Ein Forward-Darlehen ist geeignet, da es heute abgeschlossen wird, aber erst in 2 Jahren ausgezahlt wird, um sich den aktuellen Zinssatz zu sichern.'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Forward-Aufschlag?', '["Zinsaufschlag für Forward-Darlehen", "Zinsabschlag für Forward-Darlehen", "Tilgungsaufschlag", "Keine Kosten"]', 'Zinsaufschlag für Forward-Darlehen', 'Ein Forward-Aufschlag ist ein Zinsaufschlag, den die Bank für Forward-Darlehen verlangt (ca. 0,01-0,03% pro Monat Vorlaufzeit).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Festdarlehen (endfälliges Darlehen)?', '["Darlehen ohne laufende Tilgung, Rückzahlung am Ende", "Darlehen mit laufender Tilgung", "Darlehen mit variabler Tilgung", "Darlehen ohne Zinsen"]', 'Darlehen ohne laufende Tilgung, Rückzahlung am Ende', 'Ein Festdarlehen ist ein Darlehen ohne laufende Tilgung, die Rückzahlung erfolgt am Ende der Laufzeit in einer Summe.'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde hat ein Festdarlehen mit 200.000 EUR und 3% Zinssatz. Wie hoch ist die monatliche Rate?', '["500 EUR (nur Zinsen)", "1.000 EUR (Zinsen + Tilgung)", "0 EUR (keine Rate)", "2.000 EUR"]', '500 EUR (nur Zinsen)', 'Bei einem Festdarlehen werden nur Zinsen gezahlt: 200.000 EUR × 3% ÷ 12 = 500 EUR/Monat.'),

(5, 'Darlehensarten', 'hard', 'Was ist der Unterschied zwischen Festdarlehen und Annuitätendarlehen?', '["Festdarlehen: keine Tilgung, Annuitätendarlehen: laufende Tilgung", "Festdarlehen: laufende Tilgung, Annuitätendarlehen: keine Tilgung", "Kein Unterschied", "Festdarlehen ist teurer"]', 'Festdarlehen: keine Tilgung, Annuitätendarlehen: laufende Tilgung', 'Bei einem Festdarlehen wird nicht getilgt (nur Zinsen), bei einem Annuitätendarlehen wird laufend getilgt (Zinsen + Tilgung).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Tilgungsdarlehen (Abzahlungsdarlehen)?', '["Darlehen mit konstanter Tilgung, sinkende Rate", "Darlehen mit konstanter Rate", "Darlehen ohne Tilgung", "Darlehen mit variabler Tilgung"]', 'Darlehen mit konstanter Tilgung, sinkende Rate', 'Ein Tilgungsdarlehen hat eine konstante Tilgung, die monatliche Rate sinkt, da die Zinsen auf die sinkende Restschuld berechnet werden.'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde hat ein Tilgungsdarlehen mit 100.000 EUR, 10 Jahre Laufzeit, 3% Zinssatz. Wie hoch ist die monatliche Tilgung?', '["833,33 EUR", "500 EUR", "1.000 EUR", "250 EUR"]', '833,33 EUR', 'Monatliche Tilgung = 100.000 EUR ÷ 120 Monate = 833,33 EUR.'),

(5, 'Darlehensarten', 'hard', 'Was ist der Unterschied zwischen Tilgungsdarlehen und Annuitätendarlehen?', '["Tilgungsdarlehen: konstante Tilgung, sinkende Rate; Annuitätendarlehen: konstante Rate, steigende Tilgung", "Tilgungsdarlehen: konstante Rate; Annuitätendarlehen: sinkende Rate", "Kein Unterschied", "Tilgungsdarlehen ist teurer"]', 'Tilgungsdarlehen: konstante Tilgung, sinkende Rate; Annuitätendarlehen: konstante Rate, steigende Tilgung', 'Bei einem Tilgungsdarlehen ist die Tilgung konstant und die Rate sinkt, bei einem Annuitätendarlehen ist die Rate konstant und die Tilgung steigt.'),

(5, 'Darlehensarten', 'easy', 'Was ist ein variables Darlehen?', '["Darlehen mit variablem Zinssatz", "Darlehen mit festem Zinssatz", "Darlehen mit variabler Tilgung", "Darlehen ohne Zinsen"]', 'Darlehen mit variablem Zinssatz', 'Ein variables Darlehen hat einen variablen Zinssatz, der sich an einem Referenzzinssatz (z.B. EURIBOR) orientiert.'),

-- Finanzierungsplanung (10 Fragen, ID 221-230)
(5, 'Finanzierungsplanung', 'easy', 'Was ist ein Forward-Darlehen?', '["Darlehen mit zukünftiger Auszahlung und festem Zinssatz", "Darlehen mit sofortiger Auszahlung", "Darlehen mit variablem Zinssatz", "Darlehen ohne Zinsen"]', 'Darlehen mit zukünftiger Auszahlung und festem Zinssatz', 'Ein Forward-Darlehen wird heute abgeschlossen, aber erst in der Zukunft ausgezahlt, um sich den aktuellen Zinssatz zu sichern.'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde hat in 18 Monaten eine Anschlussfinanzierung. Der Marktzins liegt bei 2,5%. Was sollte er tun?', '["Forward-Darlehen abschließen, um sich den Zinssatz zu sichern", "Warten und später entscheiden", "Sofort umschulden", "Nichts tun"]', 'Forward-Darlehen abschließen, um sich den Zinssatz zu sichern', 'Bei niedrigen Zinsen sollte der Kunde ein Forward-Darlehen abschließen, um sich den günstigen Zinssatz für die Anschlussfinanzierung zu sichern.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist die maximale Vorlaufzeit für Forward-Darlehen?', '["Bis zu 5 Jahre", "Bis zu 1 Jahr", "Bis zu 10 Jahre", "Unbegrenzt"]', 'Bis zu 5 Jahre', 'Die maximale Vorlaufzeit für Forward-Darlehen beträgt in der Regel bis zu 5 Jahre (60 Monate).'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Volltilgung?', '["Vollständige Tilgung des Darlehens während der Zinsbindung", "Teilweise Tilgung", "Keine Tilgung", "Tilgung am Ende"]', 'Vollständige Tilgung des Darlehens während der Zinsbindung', 'Eine Volltilgung bedeutet, dass das Darlehen während der Zinsbindung vollständig getilgt wird (Restschuld = 0 EUR).'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde möchte ein Darlehen mit 200.000 EUR in 15 Jahren vollständig tilgen. Welche Tilgung ist erforderlich?', '["Ca. 6,67% anfängliche Tilgung", "Ca. 3% anfängliche Tilgung", "Ca. 1% anfängliche Tilgung", "Ca. 10% anfängliche Tilgung"]', 'Ca. 6,67% anfängliche Tilgung', 'Für eine Volltilgung in 15 Jahren ist eine anfängliche Tilgung von ca. 6,67% erforderlich (200.000 EUR ÷ 15 Jahre ÷ 12 Monate = 1.111 EUR/Monat).'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist der Unterschied zwischen Volltilgung und Teilamortisation?', '["Volltilgung: Restschuld = 0, Teilamortisation: Restschuld > 0", "Volltilgung: Restschuld > 0, Teilamortisation: Restschuld = 0", "Kein Unterschied", "Volltilgung ist teurer"]', 'Volltilgung: Restschuld = 0, Teilamortisation: Restschuld > 0', 'Bei einer Volltilgung ist die Restschuld am Ende der Zinsbindung 0 EUR, bei einer Teilamortisation ist die Restschuld > 0 EUR.'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Sondertilgung?', '["Außerplanmäßige Tilgung zusätzlich zur regulären Rate", "Reguläre Tilgung", "Tilgung am Ende", "Keine Tilgung"]', 'Außerplanmäßige Tilgung zusätzlich zur regulären Rate', 'Eine Sondertilgung ist eine außerplanmäßige Tilgung zusätzlich zur regulären Rate, um das Darlehen schneller zurückzuzahlen.'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde hat ein Darlehen mit 200.000 EUR und 5% Sondertilgung pro Jahr. Wie viel kann er maximal sondertilgen?', '["10.000 EUR pro Jahr", "5.000 EUR pro Jahr", "20.000 EUR pro Jahr", "Unbegrenzt"]', '10.000 EUR pro Jahr', 'Maximale Sondertilgung = 200.000 EUR × 5% = 10.000 EUR pro Jahr.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist der Unterschied zwischen Sondertilgung und Tilgungsänderung?', '["Sondertilgung: einmalige Zahlung, Tilgungsänderung: dauerhafte Änderung der Rate", "Sondertilgung: dauerhafte Änderung, Tilgungsänderung: einmalige Zahlung", "Kein Unterschied", "Sondertilgung ist teurer"]', 'Sondertilgung: einmalige Zahlung, Tilgungsänderung: dauerhafte Änderung der Rate', 'Eine Sondertilgung ist eine einmalige Zahlung, eine Tilgungsänderung ist eine dauerhafte Änderung der monatlichen Rate.'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Tilgungsaussetzung?', '["Vorübergehende Aussetzung der Tilgung, nur Zinsen zahlen", "Dauerhafte Aussetzung der Tilgung", "Aussetzung der Zinsen", "Keine Zahlung"]', 'Vorübergehende Aussetzung der Tilgung, nur Zinsen zahlen', 'Eine Tilgungsaussetzung ist die vorübergehende Aussetzung der Tilgung, es werden nur Zinsen gezahlt.'),

-- Bonitätsprüfung (7 Fragen, ID 231-237)
(5, 'Bonitätsprüfung', 'easy', 'Was ist eine Haushaltsrechnung?', '["Gegenüberstellung von Einnahmen und Ausgaben", "Schufa-Auskunft", "Einkommenssteuerbescheid", "Arbeitsvertrag"]', 'Gegenüberstellung von Einnahmen und Ausgaben', 'Eine Haushaltsrechnung ist eine Gegenüberstellung von Einnahmen und Ausgaben, um das verfügbare Einkommen zu ermitteln.'),

(5, 'Bonitätsprüfung', 'medium', 'Ein Kunde hat 4.000 EUR Nettoeinkommen und 2.500 EUR Ausgaben. Wie hoch ist das verfügbare Einkommen?', '["1.500 EUR", "4.000 EUR", "2.500 EUR", "6.500 EUR"]', '1.500 EUR', 'Verfügbares Einkommen = 4.000 EUR - 2.500 EUR = 1.500 EUR.'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist eine Kapitaldienstfähigkeit?', '["Fähigkeit, die monatliche Rate dauerhaft zu zahlen", "Fähigkeit, das Darlehen sofort zurückzuzahlen", "Fähigkeit, Sondertilgungen zu leisten", "Keine Fähigkeit"]', 'Fähigkeit, die monatliche Rate dauerhaft zu zahlen', 'Kapitaldienstfähigkeit ist die Fähigkeit des Kunden, die monatliche Rate dauerhaft aus dem verfügbaren Einkommen zu zahlen.'),

(5, 'Bonitätsprüfung', 'easy', 'Welche Unterlagen benötigt eine Bank für die Bonitätsprüfung bei Angestellten?', '["Gehaltsabrechnungen, Arbeitsvertrag, Kontoauszüge", "Nur Gehaltsabrechnungen", "Nur Arbeitsvertrag", "Nur Kontoauszüge"]', 'Gehaltsabrechnungen, Arbeitsvertrag, Kontoauszüge', 'Für Angestellte benötigt die Bank Gehaltsabrechnungen der letzten 3 Monate, Arbeitsvertrag und Kontoauszüge der letzten 3 Monate.'),

(5, 'Bonitätsprüfung', 'medium', 'Ein Kunde hat ein befristetes Arbeitsverhältnis. Wie wird die Bonität bewertet?', '["Schlechter als unbefristetes Arbeitsverhältnis, höheres Risiko", "Gleich wie unbefristetes Arbeitsverhältnis", "Besser als unbefristetes Arbeitsverhältnis", "Keine Bewertung"]', 'Schlechter als unbefristetes Arbeitsverhältnis, höheres Risiko', 'Ein befristetes Arbeitsverhältnis wird schlechter bewertet als ein unbefristetes, da das Risiko höher ist (Einkommen endet nach Befristung).'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist eine Schufa-Klausel?', '["Einwilligung des Kunden zur Schufa-Abfrage", "Schufa-Auskunft", "Schufa-Score", "Schufa-Eintrag"]', 'Einwilligung des Kunden zur Schufa-Abfrage', 'Eine Schufa-Klausel ist die Einwilligung des Kunden, dass die Bank eine Schufa-Abfrage durchführen darf.'),

(5, 'Bonitätsprüfung', 'easy', 'Welche Bedeutung hat ein negativer Schufa-Eintrag?', '["Schlechte Bonität, höheres Ausfallrisiko, höhere Zinsen oder Ablehnung", "Gute Bonität", "Keine Bedeutung", "Niedrigere Zinsen"]', 'Schlechte Bonität, höheres Ausfallrisiko, höhere Zinsen oder Ablehnung', 'Ein negativer Schufa-Eintrag bedeutet schlechte Bonität, höheres Ausfallrisiko und führt zu höheren Zinsen oder Ablehnung des Darlehens.'),

-- Risiken (7 Fragen, ID 238-244)
(5, 'Risiken', 'easy', 'Was ist ein Einkommensrisiko?', '["Risiko sinkender oder wegfallender Einkommen", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten"]', 'Risiko sinkender oder wegfallender Einkommen', 'Das Einkommensrisiko ist das Risiko, dass das Einkommen sinkt oder wegfällt (z.B. durch Arbeitslosigkeit, Krankheit) und die Rate nicht mehr gezahlt werden kann.'),

(5, 'Risiken', 'medium', 'Ein Kunde hat ein variables Einkommen (Provision). Wie sollte die Finanzierung gestaltet werden?', '["Konservativ, höhere Eigenkapitalquote, Sicherheitspuffer", "Aggressiv, niedrige Eigenkapitalquote", "Keine besondere Gestaltung", "Nur Festdarlehen"]', 'Konservativ, höhere Eigenkapitalquote, Sicherheitspuffer', 'Bei variablem Einkommen sollte die Finanzierung konservativ gestaltet werden (höhere Eigenkapitalquote, Sicherheitspuffer), um Einkommensrisiken abzufedern.'),

(5, 'Risiken', 'hard', 'Was ist ein Liquiditätsrisiko?', '["Risiko, dass kurzfristig nicht genug Geld verfügbar ist", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko sinkender Einkommen"]', 'Risiko, dass kurzfristig nicht genug Geld verfügbar ist', 'Das Liquiditätsrisiko ist das Risiko, dass kurzfristig nicht genug Geld verfügbar ist, um die Rate oder unerwartete Ausgaben zu zahlen.'),

(5, 'Risiken', 'easy', 'Was ist eine Restschuldversicherung?', '["Versicherung, die bei Tod, Arbeitslosigkeit oder Krankheit die Rate übernimmt", "Versicherung gegen Zinsänderungen", "Versicherung gegen Immobilienwertverfall", "Versicherung gegen Nebenkosten"]', 'Versicherung, die bei Tod, Arbeitslosigkeit oder Krankheit die Rate übernimmt', 'Eine Restschuldversicherung übernimmt bei Tod, Arbeitslosigkeit oder Krankheit die monatliche Rate oder tilgt die Restschuld.'),

(5, 'Risiken', 'medium', 'Ein Kunde hat eine Restschuldversicherung mit 200.000 EUR Darlehenssumme. Welche Kosten fallen an?', '["Ca. 5-10% der Darlehenssumme (10.000-20.000 EUR)", "Ca. 1-2% der Darlehenssumme", "Ca. 20-30% der Darlehenssumme", "Keine Kosten"]', 'Ca. 5-10% der Darlehenssumme (10.000-20.000 EUR)', 'Eine Restschuldversicherung kostet ca. 5-10% der Darlehenssumme, also 10.000-20.000 EUR bei 200.000 EUR Darlehenssumme.'),

(5, 'Risiken', 'hard', 'Was ist der Unterschied zwischen Risikolebensversicherung und Restschuldversicherung?', '["Risikolebensversicherung: nur Tod, Restschuldversicherung: Tod + Arbeitslosigkeit + Krankheit", "Risikolebensversicherung: Tod + Arbeitslosigkeit, Restschuldversicherung: nur Tod", "Kein Unterschied", "Risikolebensversicherung ist teurer"]', 'Risikolebensversicherung: nur Tod, Restschuldversicherung: Tod + Arbeitslosigkeit + Krankheit', 'Eine Risikolebensversicherung deckt nur den Todesfall ab, eine Restschuldversicherung deckt Tod, Arbeitslosigkeit und Krankheit ab.'),

(5, 'Risiken', 'easy', 'Was ist ein Währungsrisiko?', '["Risiko bei Fremdwährungsdarlehen durch Wechselkursschwankungen", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko sinkender Einkommen"]', 'Risiko bei Fremdwährungsdarlehen durch Wechselkursschwankungen', 'Das Währungsrisiko ist das Risiko bei Fremdwährungsdarlehen (z.B. Schweizer Franken), dass der Wechselkurs ungünstig schwankt und die Restschuld steigt.'),

-- Verbraucherschutz (6 Fragen, ID 245-250)
(5, 'Verbraucherschutz', 'easy', 'Was ist eine Widerrufsbelehrung?', '["Information über das Widerrufsrecht (14 Tage)", "Information über das Darlehen", "Information über die Provision", "Information über die Schufa"]', 'Information über das Widerrufsrecht (14 Tage)', 'Eine Widerrufsbelehrung informiert den Kunden über sein Widerrufsrecht (14 Tage nach § 495 BGB).'),

(5, 'Verbraucherschutz', 'medium', 'Ein Kunde erhält keine Widerrufsbelehrung. Welche Rechtsfolge tritt ein?', '["Verlängerung der Widerrufsfrist auf 1 Jahr und 14 Tage", "Keine Rechtsfolge", "Vertrag ist nichtig", "Nur Bußgeld"]', 'Verlängerung der Widerrufsfrist auf 1 Jahr und 14 Tage', 'Ohne Widerrufsbelehrung verlängert sich die Widerrufsfrist auf 1 Jahr und 14 Tage nach § 356 Abs. 3 BGB.'),

(5, 'Verbraucherschutz', 'hard', 'Was ist eine Widerrufsfolgenbelehrung?', '["Information über die Folgen des Widerrufs (Rückzahlung, Zinsen)", "Information über das Widerrufsrecht", "Information über das Darlehen", "Information über die Provision"]', 'Information über die Folgen des Widerrufs (Rückzahlung, Zinsen)', 'Eine Widerrufsfolgenbelehrung informiert über die Folgen des Widerrufs (Rückzahlung des Darlehens, Zinsen für die Zeit bis zum Widerruf).'),

(5, 'Verbraucherschutz', 'easy', 'Welche Frist gilt für das Widerrufsrecht bei Immobiliardarlehensverträgen?', '["14 Tage", "7 Tage", "21 Tage", "30 Tage"]', '14 Tage', 'Das Widerrufsrecht bei Immobiliardarlehensverträgen beträgt 14 Tage nach § 495 Abs. 1 BGB.'),

(5, 'Verbraucherschutz', 'medium', 'Ein Kunde widerruft einen Darlehensvertrag nach 10 Tagen. Welche Kosten muss er tragen?', '["Nur Zinsen für die Zeit bis zum Widerruf", "Vorfälligkeitsentschädigung", "Keine Kosten", "Schadensersatz"]', 'Nur Zinsen für die Zeit bis zum Widerruf', 'Bei Widerruf innerhalb der Widerrufsfrist muss der Kunde nur die Zinsen für die Zeit bis zum Widerruf zahlen (§ 357a BGB).'),

(5, 'Verbraucherschutz', 'hard', 'Was ist eine Beratungsdokumentation nach § 511 BGB?', '["Protokoll über die Beratung des Kunden", "Schufa-Auskunft", "ESIS-Merkblatt", "Widerrufsbelehrung"]', 'Protokoll über die Beratung des Kunden', 'Eine Beratungsdokumentation ist ein Protokoll über die Beratung des Kunden, das die besprochenen Themen, Empfehlungen und Entscheidungen festhält (Pflicht nach § 511 BGB).');
