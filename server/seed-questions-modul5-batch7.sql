-- Batch 7: 50 additional questions for Module 5 (§34i Darlehensvermittlung)
-- IDs: 351-400
-- Distribution: Rechtliche Grundlagen (10), Darlehensarten (10), Finanzierungsplanung (10), Bonitätsprüfung (7), Risiken (7), Verbraucherschutz (6)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES
-- Rechtliche Grundlagen (10 Fragen, ID 351-360)
(5, 'Rechtliche Grundlagen', 'easy', 'Was ist ein Beratungsprotokoll?', '["Dokumentation der Beratung mit Kundenwünschen und Empfehlungen", "Schufa-Auskunft", "Grundbuchauszug", "Arbeitsvertrag"]', 'Dokumentation der Beratung mit Kundenwünschen und Empfehlungen', 'Ein Beratungsprotokoll ist eine Dokumentation der Beratung mit Kundenwünschen, Empfehlungen und Begründungen (Pflicht für § 34i).'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Angaben müssen in einem Beratungsprotokoll enthalten sein?', '["Kundenwünsche, Empfehlungen, Begründungen, Risiken", "Nur Kundenwünsche", "Nur Empfehlungen", "Nur Risiken"]', 'Kundenwünsche, Empfehlungen, Begründungen, Risiken', 'Beratungsprotokoll muss enthalten: Kundenwünsche, Empfehlungen, Begründungen, Risiken, Alternativen.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist eine ESIS (European Standardised Information Sheet)?', '["Standardisiertes Informationsblatt für Immobiliendarlehen", "Schufa-Auskunft", "Grundbuchauszug", "Arbeitsvertrag"]', 'Standardisiertes Informationsblatt für Immobiliendarlehen', 'ESIS ist ein standardisiertes Informationsblatt für Immobiliendarlehen (Pflicht vor Vertragsschluss, § 491a BGB).'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist eine Aufklärungspflicht?', '["Pflicht, den Kunden über Risiken und Kosten aufzuklären", "Pflicht zur Beratung", "Pflicht zur Dokumentation", "Keine Pflicht"]', 'Pflicht, den Kunden über Risiken und Kosten aufzuklären', 'Die Aufklärungspflicht ist die Pflicht, den Kunden über Risiken, Kosten und Alternativen aufzuklären (§ 34i GewO).'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Risiken müssen bei der Darlehensvermittlung aufgeklärt werden?', '["Zinsänderungsrisiko, Arbeitslosigkeitsrisiko, Krankheitsrisiko, Todesrisiko", "Nur Zinsänderungsrisiko", "Nur Arbeitslosigkeitsrisiko", "Keine Risiken"]', 'Zinsänderungsrisiko, Arbeitslosigkeitsrisiko, Krankheitsrisiko, Todesrisiko', 'Aufklärung über Risiken: Zinsänderungsrisiko, Arbeitslosigkeitsrisiko, Krankheitsrisiko, Todesrisiko, Immobilienpreisrisiko.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist eine Geeignetheitserklärung?', '["Erklärung, dass das empfohlene Darlehen für den Kunden geeignet ist", "Schufa-Auskunft", "Grundbuchauszug", "Arbeitsvertrag"]', 'Erklärung, dass das empfohlene Darlehen für den Kunden geeignet ist', 'Eine Geeignetheitserklärung ist eine Erklärung, dass das empfohlene Darlehen für den Kunden geeignet ist (Pflicht für § 34i).'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist eine Dokumentationspflicht?', '["Pflicht, die Beratung zu dokumentieren", "Pflicht zur Aufklärung", "Pflicht zur Beratung", "Keine Pflicht"]', 'Pflicht, die Beratung zu dokumentieren', 'Die Dokumentationspflicht ist die Pflicht, die Beratung zu dokumentieren (Beratungsprotokoll, § 34i GewO).'),

(5, 'Rechtliche Grundlagen', 'medium', 'Wie lange müssen Beratungsprotokolle aufbewahrt werden?', '["5 Jahre", "1 Jahr", "10 Jahre", "Keine Aufbewahrungspflicht"]', '5 Jahre', 'Beratungsprotokolle müssen 5 Jahre aufbewahrt werden (§ 34i GewO).'),

(5, 'Rechtliche Grundlagen', 'hard', 'Was ist eine Haftung bei fehlerhafter Beratung?', '["Schadensersatzpflicht bei fehlerhafter Beratung", "Keine Haftung", "Nur Bußgeld", "Nur Vertragsstrafe"]', 'Schadensersatzpflicht bei fehlerh after Beratung', 'Bei fehlerhafter Beratung haftet der Darlehensvermittler auf Schadensersatz (Vermögensschadenhaftpflichtversicherung deckt Schäden ab).'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist eine Provision?', '["Vergütung für die Darlehensvermittlung", "Zins", "Tilgung", "Nebenkosten"]', 'Vergütung für die Darlehensvermittlung', 'Eine Provision ist eine Vergütung für die Darlehensvermittlung (von Bank oder Kunde).'),

-- Darlehensarten (10 Fragen, ID 361-370)
(5, 'Darlehensarten', 'easy', 'Was ist ein Zwischenfinanzierungsdarlehen?', '["Kurzfristiges Darlehen bis zur Auszahlung eines langfristigen Darlehens", "Langfristiges Darlehen", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Kurzfristiges Darlehen bis zur Auszahlung eines langfristigen Darlehens', 'Ein Zwischenfinanzierungsdarlehen ist ein kurzfristiges Darlehen bis zur Auszahlung eines langfristigen Darlehens (z.B. Bausparvertrag).'),

(5, 'Darlehensarten', 'medium', 'Ein Kunde benötigt 50.000 EUR für 6 Monate bis zur Auszahlung seines Bausparvertrags. Welches Darlehen ist geeignet?', '["Zwischenfinanzierungsdarlehen", "Annuitätendarlehen", "Festdarlehen", "KfW-Darlehen"]', 'Zwischenfinanzierungsdarlehen', 'Zwischenfinanzierungsdarlehen ist geeignet für kurzfristige Finanzierung (6 Monate).'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Kombi-Darlehen?', '["Kombination aus Annuitätendarlehen und Bausparvertrag", "Nur Annuitätendarlehen", "Nur Bausparvertrag", "Nur KfW-Darlehen"]', 'Kombination aus Annuitätendarlehen und Bausparvertrag', 'Ein Kombi-Darlehen ist eine Kombination aus Annuitätendarlehen und Bausparvertrag (Tilgung über Bausparguthaben).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Fremdwährungsdarlehen?', '["Darlehen in fremder Währung (z.B. Schweizer Franken)", "Darlehen in Euro", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Darlehen in fremder Währung (z.B. Schweizer Franken)', 'Ein Fremdwährungsdarlehen ist ein Darlehen in fremder Währung (z.B. Schweizer Franken). Risiko: Währungsschwankungen.'),

(5, 'Darlehensarten', 'medium', 'Welche Risiken hat ein Fremdwährungsdarlehen?', '["Währungsrisiko, Zinsänderungsrisiko", "Nur Währungsrisiko", "Nur Zinsänderungsrisiko", "Keine Risiken"]', 'Währungsrisiko, Zinsänderungsrisiko', 'Risiken eines Fremdwährungsdarlehens: Währungsrisiko (Wechselkursschwankungen), Zinsänderungsrisiko.'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Konstantdarlehen?', '["Darlehen mit konstanter Rate über die gesamte Laufzeit", "Darlehen mit variabler Rate", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Darlehen mit konstanter Rate über die gesamte Laufzeit', 'Ein Konstantdarlehen ist ein Darlehen mit konstanter Rate über die gesamte Laufzeit (auch nach Zinsbindungsende).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Tilgungsaussetzungsdarlehen?', '["Darlehen ohne Tilgung während der Laufzeit", "Darlehen mit monatlicher Tilgung", "Darlehen mit variabler Tilgung", "Darlehen ohne Zinsen"]', 'Darlehen ohne Tilgung während der Laufzeit', 'Ein Tilgungsaussetzungsdarlehen ist ein Darlehen ohne Tilgung während der Laufzeit (nur Zinszahlungen, Tilgung am Ende).'),

(5, 'Darlehensarten', 'medium', 'Wann ist ein Tilgungsaussetzungsdarlehen sinnvoll?', '["Bei vermieteten Immobilien (steuerliche Vorteile)", "Bei selbstgenutzten Immobilien", "Bei Renovierungen", "Nie"]', 'Bei vermieteten Immobilien (steuerliche Vorteile)', 'Tilgungsaussetzungsdarlehen ist sinnvoll bei vermieteten Immobilien (Zinsen steuerlich absetzbar, Tilgung über Lebensversicherung).'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Policendarlehen?', '["Darlehen, das durch eine Lebensversicherung besichert ist", "Darlehen ohne Sicherheiten", "Darlehen mit Grundschuld", "Darlehen mit Hypothek"]', 'Darlehen, das durch eine Lebensversicherung besichert ist', 'Ein Policendarlehen ist ein Darlehen, das durch eine Lebensversicherung besichert ist (Tilgung über Versicherungssumme).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Modernisierungsdarlehen?', '["Darlehen für Renovierung und Modernisierung", "Darlehen für Neubau", "Darlehen für Grundstückskauf", "Darlehen für Umschuldung"]', 'Darlehen für Renovierung und Modernisierung', 'Ein Modernisierungsdarlehen ist ein Darlehen für Renovierung und Modernisierung (z.B. energetische Sanierung).'),

-- Finanzierungsplanung (10 Fragen, ID 371-380)
(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Machbarkeitsprüfung?', '["Prüfung, ob die Finanzierung realisierbar ist", "Schufa-Auskunft", "Grundbuchauszug", "Arbeitsvertrag"]', 'Prüfung, ob die Finanzierung realisierbar ist', 'Eine Machbarkeitsprüfung ist eine Prüfung, ob die Finanzierung realisierbar ist (Einkommen, Eigenkapital, Bonität).'),

(5, 'Finanzierungsplanung', 'medium', 'Welche Faktoren beeinflussen die Machbarkeit einer Finanzierung?', '["Einkommen, Eigenkapital, Bonität, Immobilienwert", "Nur Einkommen", "Nur Eigenkapital", "Nur Bonität"]', 'Einkommen, Eigenkapital, Bonität, Immobilienwert', 'Faktoren für Machbarkeit: Einkommen (verfügbares Einkommen), Eigenkapital (mind. 20%), Bonität (Schufa), Immobilienwert (Beleihungswert).'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist eine Finanzierungsstruktur?', '["Aufteilung der Finanzierung in verschiedene Darlehen", "Nur ein Darlehen", "Nur Eigenkapital", "Nur Fremdkapital"]', 'Aufteilung der Finanzierung in verschiedene Darlehen', 'Eine Finanzierungsstruktur ist die Aufteilung der Finanzierung in verschiedene Darlehen (z.B. Annuitätendarlehen + KfW-Darlehen).'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Zinsbindung?', '["Zeitraum, in dem der Zinssatz fest ist", "Zeitraum, in dem der Zinssatz variabel ist", "Zeitraum ohne Zinsen", "Zeitraum ohne Tilgung"]', 'Zeitraum, in dem der Zinssatz fest ist', 'Eine Zinsbindung ist der Zeitraum, in dem der Zinssatz fest ist (z.B. 10 Jahre).'),

(5, 'Finanzierungsplanung', 'medium', 'Welche Zinsbindungsfristen sind üblich?', '["5, 10, 15, 20 Jahre", "Nur 5 Jahre", "Nur 10 Jahre", "Nur 20 Jahre"]', '5, 10, 15, 20 Jahre', 'Übliche Zinsbindungsfristen: 5, 10, 15, 20 Jahre (je länger, desto höher der Zinssatz).'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist eine Zinsbindungsstrategie?', '["Strategie zur Wahl der Zinsbindungsfrist", "Strategie zur Tilgung", "Strategie zur Sondertilgung", "Strategie zur Umschuldung"]', 'Strategie zur Wahl der Zinsbindungsfrist', 'Eine Zinsbindungsstrategie ist eine Strategie zur Wahl der Zinsbindungsfrist (kurz bei niedrigen Zinsen, lang bei hohen Zinsen).'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Tilgungsrate?', '["Monatliche Tilgung des Darlehens", "Monatliche Zinsen", "Monatliche Nebenkosten", "Monatliche Versicherung"]', 'Monatliche Tilgung des Darlehens', 'Eine Tilgungsrate ist die monatliche Tilgung des Darlehens (Teil der monatlichen Rate).'),

(5, 'Finanzierungsplanung', 'medium', 'Ein Kunde hat ein Darlehen von 200.000 EUR mit 2% Tilgung. Wie hoch ist die monatliche Tilgungsrate?', '["333,33 EUR", "500 EUR", "666,67 EUR", "1.000 EUR"]', '333,33 EUR', 'Monatliche Tilgungsrate: 200.000 EUR × 2% / 12 = 333,33 EUR.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist eine Tilgungsstrategie?', '["Strategie zur Wahl der Tilgungshöhe", "Strategie zur Zinsbindung", "Strategie zur Sondertilgung", "Strategie zur Umschuldung"]', 'Strategie zur Wahl der Tilgungshöhe', 'Eine Tilgungsstrategie ist eine Strategie zur Wahl der Tilgungshöhe (hoch für schnelle Entschuldung, niedrig für niedrige Raten).'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Restschuld?', '["Verbleibende Schuld nach Ablauf der Zinsbindung", "Gesamtschuld", "Tilgung", "Zinsen"]', 'Verbleibende Schuld nach Ablauf der Zinsbindung', 'Eine Restschuld ist die verbleibende Schuld nach Ablauf der Zinsbindung (muss refinanziert werden).'),

-- Bonitätsprüfung (7 Fragen, ID 381-387)
(5, 'Bonitätsprüfung', 'easy', 'Was ist ein Schufa-Score?', '["Bewertung der Kreditwürdigkeit (0-100%)", "Einkommen", "Vermögen", "Schulden"]', 'Bewertung der Kreditwürdigkeit (0-100%)', 'Ein Schufa-Score ist eine Bewertung der Kreditwürdigkeit (0-100%, je höher, desto besser).'),

(5, 'Bonitätsprüfung', 'medium', 'Welche Faktoren beeinflussen den Schufa-Score?', '["Zahlungsverhalten, Kreditanfragen, Schulden, Alter", "Nur Zahlungsverhalten", "Nur Kreditanfragen", "Nur Schulden"]', 'Zahlungsverhalten, Kreditanfragen, Schulden, Alter', 'Faktoren für Schufa-Score: Zahlungsverhalten (pünktlich), Kreditanfragen (wenige), Schulden (niedrig), Alter (länger besser).'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist ein negativer Schufa-Eintrag?', '["Eintrag über nicht bezahlte Rechnungen oder Kredite", "Positiver Eintrag", "Keine Einträge", "Nur Kreditanfragen"]', 'Eintrag über nicht bezahlte Rechnungen oder Kredite', 'Ein negativer Schufa-Eintrag ist ein Eintrag über nicht bezahlte Rechnungen oder Kredite (verschlechtert Bonität).'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist eine Kreditanfrage?', '["Anfrage bei der Schufa über die Kreditwürdigkeit", "Antrag auf Darlehen", "Schufa-Auskunft", "Selbstauskunft"]', 'Anfrage bei der Schufa über die Kreditwürdigkeit', 'Eine Kreditanfrage ist eine Anfrage bei der Schufa über die Kreditwürdigkeit (wird gespeichert).'),

(5, 'Bonitätsprüfung', 'medium', 'Wie lange werden Kreditanfragen gespeichert?', '["12 Monate", "6 Monate", "24 Monate", "Unbegrenzt"]', '12 Monate', 'Kreditanfragen werden 12 Monate gespeichert (beeinflussen Schufa-Score).'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist eine Konditionsanfrage?', '["Anfrage ohne Einfluss auf den Schufa-Score", "Anfrage mit Einfluss auf den Schufa-Score", "Keine Anfrage", "Nur Schufa-Auskunft"]', 'Anfrage ohne Einfluss auf den Schufa-Score', 'Eine Konditionsanfrage ist eine Anfrage ohne Einfluss auf den Schufa-Score (für Konditionsvergleich).'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist ein Beleihungswert?', '["Wert der Immobilie für die Kreditvergabe", "Kaufpreis", "Verkehrswert", "Marktwert"]', 'Wert der Immobilie für die Kreditvergabe', 'Ein Beleihungswert ist der Wert der Immobilie für die Kreditvergabe (meist 80% des Verkehrswerts).'),

-- Risiken (7 Fragen, ID 388-394)
(5, 'Risiken', 'easy', 'Was ist ein Zinsänderungsrisiko?', '["Risiko steigender Zinsen nach Ablauf der Zinsbindung", "Risiko sinkender Zinsen", "Risiko steigender Nebenkosten", "Risiko sinkender Immobilienpreise"]', 'Risiko steigender Zinsen nach Ablauf der Zinsbindung', 'Das Zinsänderungsrisiko ist das Risiko steigender Zinsen nach Ablauf der Zinsbindung (höhere Raten).'),

(5, 'Risiken', 'medium', 'Wie kann ein Kunde das Zinsänderungsrisiko absichern?', '["Lange Zinsbindung, Forward-Darlehen, Sondertilgungen", "Nur lange Zinsbindung", "Nur Forward-Darlehen", "Nur Sondertilgungen"]', 'Lange Zinsbindung, Forward-Darlehen, Sondertilgungen', 'Absicherung gegen Zinsänderungsrisiko: Lange Zinsbindung (15-20 Jahre), Forward-Darlehen (Zinssicherung), Sondertilgungen (Restschuld reduzieren).'),

(5, 'Risiken', 'hard', 'Was ist ein Immobilienpreisrisiko?', '["Risiko sinkender Immobilienpreise", "Risiko steigender Immobilienpreise", "Risiko steigender Zinsen", "Risiko steigender Nebenkosten"]', 'Risiko sinkender Immobilienpreise', 'Das Immobilienpreisrisiko ist das Risiko sinkender Immobilienpreise (Verlust bei Verkauf).'),

(5, 'Risiken', 'easy', 'Was ist ein Liquiditätsrisiko?', '["Risiko, dass der Kunde die Raten nicht mehr zahlen kann", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten"]', 'Risiko, dass der Kunde die Raten nicht mehr zahlen kann', 'Das Liquiditätsrisiko ist das Risiko, dass der Kunde die Raten nicht mehr zahlen kann (z.B. durch Arbeitslosigkeit).'),

(5, 'Risiken', 'medium', 'Wie kann ein Kunde das Liquiditätsrisiko absichern?', '["Rücklagen, Restschuldversicherung, niedrige Raten", "Nur Rücklagen", "Nur Restschuldversicherung", "Nur niedrige Raten"]', 'Rücklagen, Restschuldversicherung, niedrige Raten', 'Absicherung gegen Liquiditätsrisiko: Rücklagen (3-6 Monatsraten), Restschuldversicherung, niedrige Raten (hohe Tilgung vermeiden).'),

(5, 'Risiken', 'hard', 'Was ist ein Klumpenrisiko?', '["Risiko, dass zu viel Vermögen in einer Immobilie gebunden ist", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise", "Risiko steigender Nebenkosten"]', 'Risiko, dass zu viel Vermögen in einer Immobilie gebunden ist', 'Das Klumpenrisiko ist das Risiko, dass zu viel Vermögen in einer Immobilie gebunden ist (Diversifikation fehlt).'),

(5, 'Risiken', 'easy', 'Was ist ein Inflationsrisiko?', '["Risiko steigender Preise und sinkender Kaufkraft", "Risiko sinkender Preise", "Risiko steigender Zinsen", "Risiko sinkender Immobilienpreise"]', 'Risiko steigender Preise und sinkender Kaufkraft', 'Das Inflationsrisiko ist das Risiko steigender Preise und sinkender Kaufkraft (Vorteil für Schuldner: Schulden werden real weniger wert).'),

-- Verbraucherschutz (6 Fragen, ID 395-400)
(5, 'Verbraucherschutz', 'easy', 'Was ist eine Widerrufsbelehrung?', '["Belehrung über das Widerrufsrecht", "Belehrung über Zinsen", "Belehrung über Tilgung", "Belehrung über Nebenkosten"]', 'Belehrung über das Widerrufsrecht', 'Eine Widerrufsbelehrung ist eine Belehrung über das Widerrufsrecht (Pflicht bei Vertragsschluss, § 495 BGB).'),

(5, 'Verbraucherschutz', 'medium', 'Was passiert, wenn die Widerrufsbelehrung fehlt?', '["Widerrufsfrist beginnt nicht, ewiges Widerrufsrecht", "Widerrufsfrist beginnt normal", "Vertrag ist nichtig", "Nur Bußgeld"]', 'Widerrufsfrist beginnt nicht, ewiges Widerrufsrecht', 'Wenn die Widerrufsbelehrung fehlt, beginnt die Widerrufsfrist nicht, und der Kunde hat ein ewiges Widerrufsrecht (bis zu 1 Jahr + 14 Tage).'),

(5, 'Verbraucherschutz', 'hard', 'Was ist eine Vorfälligkeitsentschädigung?', '["Entschädigung der Bank bei vorzeitiger Rückzahlung des Darlehens", "Entschädigung des Kunden", "Entschädigung bei Widerruf", "Keine Entschädigung"]', 'Entschädigung der Bank bei vorzeitiger Rückzahlung des Darlehens', 'Eine Vorfälligkeitsentschädigung ist eine Entschädigung der Bank bei vorzeitiger Rückzahlung des Darlehens (Ausgleich für entgangene Zinsen).'),

(5, 'Verbraucherschutz', 'easy', 'Wann fällt eine Vorfälligkeitsentschädigung an?', '["Bei vorzeitiger Rückzahlung während der Zinsbindung", "Bei normaler Tilgung", "Bei Widerruf", "Nie"]', 'Bei vorzeitiger Rückzahlung während der Zinsbindung', 'Eine Vorfälligkeitsentschädigung fällt an bei vorzeitiger Rückzahlung während der Zinsbindung (z.B. bei Verkauf der Immobilie).'),

(5, 'Verbraucherschutz', 'medium', 'Wie wird die Vorfälligkeitsentschädigung berechnet?', '["Aktuar-Methode oder Zinsschaden-Methode", "Nur Aktuar-Methode", "Nur Zinsschaden-Methode", "Keine Berechnung"]', 'Aktuar-Methode oder Zinsschaden-Methode', 'Berechnung der Vorfälligkeitsentschädigung: Aktuar-Methode (Barwert der entgangenen Zinsen) oder Zinsschaden-Methode (Differenz zwischen Vertragszins und Wiederanlagezins).'),

(5, 'Verbraucherschutz', 'hard', 'Wann entfällt die Vorfälligkeitsentschädigung?', '["Bei Widerruf, nach 10 Jahren Zinsbindung, bei berechtigtem Interesse", "Nie", "Immer", "Nur bei Widerruf"]', 'Bei Widerruf, nach 10 Jahren Zinsbindung, bei berechtigtem Interesse', 'Vorfälligkeitsentschädigung entfällt: Bei Widerruf, nach 10 Jahren Zinsbindung (§ 489 BGB), bei berechtigtem Interesse (z.B. Scheidung, Arbeitslosigkeit).');
