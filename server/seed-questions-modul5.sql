-- 100 Prüfungsfragen für Modul 5 (§34i Darlehensvermittlung)
-- Kategorien: 1=Rechtliche Grundlagen, 2=Darlehensarten, 3=Finanzierungsplanung, 4=Bonitätsprüfung, 5=Risiken, 6=Verbraucherschutz
-- Schwierigkeitsgrade: easy, medium, hard

-- Kategorie 1: Rechtliche Grundlagen (20 Fragen)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES
(5, 'Rechtliche Grundlagen', 'easy', 'Was regelt § 34i GewO?', '["Immobilienmakler", "Darlehensvermittlung", "WEG-Verwaltung", "Mietverwaltung"]', 'Darlehensvermittlung', '§ 34i GewO regelt die Erlaubnispflicht für Immobiliardarlehensvermittler und Honorar-Immobiliardarlehensvermittler.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Wer benötigt eine Erlaubnis nach § 34i GewO?', '["Nur Banken", "Darlehensvermittler", "Nur Versicherungsmakler", "Nur Immobilienmakler"]', 'Darlehensvermittler', 'Wer gewerbsmäßig Immobiliardarlehensverträge vermittelt oder berät, benötigt eine Erlaubnis nach § 34i GewO.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Weiterbildungspflicht besteht nach § 34i Abs. 4 GewO?', '["5 Stunden pro Jahr", "10 Stunden pro Jahr", "15 Stunden pro Jahr", "20 Stunden pro Jahr"]', '15 Stunden pro Jahr', 'Darlehensvermittler müssen jährlich mindestens 15 Stunden Weiterbildung nachweisen.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Wo müssen Darlehensvermittler registriert sein?', '["IHK-Register", "Handelsregister", "Vermittlerregister (§ 11a GewO)", "Grundbuch"]', 'Vermittlerregister (§ 11a GewO)', 'Darlehensvermittler müssen im Vermittlerregister nach § 11a GewO eingetragen sein.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Welche Versicherung ist für Darlehensvermittler Pflicht?', '["Haftpflichtversicherung", "Berufshaftpflichtversicherung (mind. 1 Mio. €)", "Rechtsschutzversicherung", "Keine Versicherung"]', 'Berufshaftpflichtversicherung (mind. 1 Mio. €)', 'Nach § 34i Abs. 2 GewO ist eine Berufshaftpflichtversicherung mit mind. 1 Mio. € pro Schadensfall erforderlich.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist ein Immobiliardarlehen?', '["Kredit für Möbel", "Kredit für Immobilienerwerb", "Kredit für Auto", "Kredit für Urlaub"]', 'Kredit für Immobilienerwerb', 'Ein Immobiliardarlehen ist ein Darlehen zum Erwerb, Bau oder zur Renovierung von Immobilien.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Behörde ist für die Erlaubniserteilung nach § 34i GewO zuständig?', '["Bundesbank", "IHK", "BaFin", "Gewerbeamt"]', 'IHK', 'Die Industrie- und Handelskammer (IHK) ist für die Erlaubniserteilung nach § 34i GewO zuständig.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Welche Sanktion droht bei Verstoß gegen § 34i GewO?', '["Verwarnung", "Bußgeld bis 50.000 €", "Freiheitsstrafe", "Keine Sanktion"]', 'Bußgeld bis 50.000 €', 'Verstöße gegen § 34i GewO können mit Bußgeldern bis 50.000 € geahndet werden (§ 144 GewO).'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist die Sachkundeprüfung nach § 34i GewO?', '["Theoretische Prüfung", "Praktische Prüfung", "Mündliche Prüfung", "Keine Prüfung erforderlich"]', 'Theoretische Prüfung', 'Die Sachkundeprüfung ist eine theoretische Prüfung bei der IHK, die Kenntnisse im Bereich Darlehensvermittlung nachweist.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Welche Themen sind in der Sachkundeprüfung § 34i enthalten?', '["Nur Rechtskenntnisse", "Recht, Finanzierung, Beratung", "Nur Finanzierung", "Nur Beratung"]', 'Recht, Finanzierung, Beratung', 'Die Sachkundeprüfung umfasst Rechtskenntnisse, Finanzierungswissen und Beratungskompetenzen.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Welche Informationspflichten bestehen nach § 491a BGB?', '["Keine Pflichten", "ESIS-Merkblatt vor Vertragsschluss", "Nur mündliche Informationen", "Nur schriftliche Informationen"]', 'ESIS-Merkblatt vor Vertragsschluss', 'Nach § 491a BGB muss der Darlehensvermittler dem Verbraucher vor Vertragsschluss ein ESIS-Merkblatt aushändigen.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was bedeutet ESIS?', '["European Standard Information Sheet", "European Standard Insurance Sheet", "European Standard Investment Sheet", "European Standard Income Sheet"]', 'European Standard Information Sheet', 'ESIS steht für European Standard Information Sheet und ist ein standardisiertes Informationsblatt für Immobiliendarlehen.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Wann muss das ESIS-Merkblatt ausgehändigt werden?', '["Nach Vertragsschluss", "Mindestens 7 Tage vor Vertragsschluss", "Am Tag des Vertragsschlusses", "Nur auf Anfrage"]', 'Mindestens 7 Tage vor Vertragsschluss', 'Das ESIS-Merkblatt muss rechtzeitig, mindestens 7 Tage vor Vertragsschluss, ausgehändigt werden (§ 491a BGB).'),

(5, 'Rechtliche Grundlagen', 'hard', 'Welche Angaben muss das ESIS-Merkblatt enthalten?', '["Nur Zinssatz", "Zinssatz, Kosten, Laufzeit, Risiken", "Nur Laufzeit", "Nur Kosten"]', 'Zinssatz, Kosten, Laufzeit, Risiken', 'Das ESIS-Merkblatt muss Angaben zu Zinssatz, Kosten, Laufzeit und Risiken enthalten (§ 491a BGB).'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist ein Beratungsprotokoll?', '["Protokoll über Beratungsgespräch", "Protokoll über Vertragsschluss", "Protokoll über Zahlung", "Protokoll über Kündigung"]', 'Protokoll über Beratungsgespräch', 'Ein Beratungsprotokoll dokumentiert den Verlauf und Inhalt eines Beratungsgesprächs mit dem Kunden.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Wann muss ein Beratungsprotokoll erstellt werden?', '["Nur bei Vertragsschluss", "Bei jeder Beratung", "Nur auf Anfrage", "Nie"]', 'Bei jeder Beratung', 'Ein Beratungsprotokoll muss bei jeder Beratung erstellt werden, um die Beratungsqualität zu dokumentieren.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Welche Inhalte muss ein Beratungsprotokoll enthalten?', '["Nur Kundendaten", "Kundendaten, Bedarfsanalyse, Produktempfehlung, Risikoaufklärung", "Nur Produktempfehlung", "Nur Risikoaufklärung"]', 'Kundendaten, Bedarfsanalyse, Produktempfehlung, Risikoaufklärung', 'Ein Beratungsprotokoll muss Kundendaten, Bedarfsanalyse, Produktempfehlung und Risikoaufklärung enthalten.'),

(5, 'Rechtliche Grundlagen', 'easy', 'Was ist eine Provision?', '["Gehalt", "Vergütung für Vermittlung", "Zinsen", "Tilgung"]', 'Vergütung für Vermittlung', 'Eine Provision ist eine Vergütung, die der Darlehensvermittler für die erfolgreiche Vermittlung eines Darlehens erhält.'),

(5, 'Rechtliche Grundlagen', 'medium', 'Muss die Provision offengelegt werden?', '["Nein", "Ja, nach § 511 BGB", "Nur auf Anfrage", "Nur bei hohen Beträgen"]', 'Ja, nach § 511 BGB', 'Nach § 511 BGB muss der Darlehensvermittler die Provision gegenüber dem Kunden offenlegen.'),

(5, 'Rechtliche Grundlagen', 'hard', 'Welche Informationen müssen bei der Provisionsoffenlegung angegeben werden?', '["Nur Höhe", "Höhe, Zahler, Zeitpunkt", "Nur Zahler", "Nur Zeitpunkt"]', 'Höhe, Zahler, Zeitpunkt', 'Bei der Provisionsoffenlegung müssen Höhe, Zahler und Zeitpunkt der Provision angegeben werden (§ 511 BGB).');

-- Kategorie 2: Darlehensarten & Finanzierungsformen (20 Fragen)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES
(5, 'Darlehensarten', 'easy', 'Was ist ein Annuitätendarlehen?', '["Darlehen mit konstanter Rate", "Darlehen mit variabler Rate", "Darlehen ohne Tilgung", "Darlehen ohne Zinsen"]', 'Darlehen mit konstanter Rate', 'Ein Annuitätendarlehen hat eine konstante monatliche Rate, die aus Zins- und Tilgungsanteil besteht.'),

(5, 'Darlehensarten', 'easy', 'Woraus setzt sich die Annuität zusammen?', '["Nur Zinsen", "Nur Tilgung", "Zinsen + Tilgung", "Zinsen + Gebühren"]', 'Zinsen + Tilgung', 'Die Annuität setzt sich aus Zinsen und Tilgung zusammen.'),

(5, 'Darlehensarten', 'medium', 'Wie verändert sich die Annuität im Zeitverlauf?', '["Steigt", "Fällt", "Bleibt konstant", "Schwankt"]', 'Bleibt konstant', 'Die Annuität bleibt während der Zinsbindung konstant, nur die Anteile von Zins und Tilgung verschieben sich.'),

(5, 'Darlehensarten', 'medium', 'Was passiert mit dem Zinsanteil im Zeitverlauf?', '["Steigt", "Fällt", "Bleibt konstant", "Schwankt"]', 'Fällt', 'Der Zinsanteil fällt im Zeitverlauf, weil die Restschuld sinkt, während der Tilgungsanteil steigt.'),

(5, 'Darlehensarten', 'hard', 'Was ist der Effektivzins?', '["Nominalzins", "Nominalzins + Kosten", "Nur Kosten", "Tilgungssatz"]', 'Nominalzins + Kosten', 'Der Effektivzins berücksichtigt neben dem Nominalzins auch alle Kosten des Darlehens (z.B. Bearbeitungsgebühren).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein Tilgungsdarlehen?', '["Darlehen mit konstanter Tilgung", "Darlehen ohne Tilgung", "Darlehen mit variabler Tilgung", "Darlehen ohne Zinsen"]', 'Darlehen mit konstanter Tilgung', 'Ein Tilgungsdarlehen hat eine konstante Tilgung, die monatliche Rate sinkt im Zeitverlauf.'),

(5, 'Darlehensarten', 'medium', 'Was ist ein endfälliges Darlehen?', '["Tilgung während Laufzeit", "Tilgung am Ende der Laufzeit", "Keine Tilgung", "Tilgung in Raten"]', 'Tilgung am Ende der Laufzeit', 'Bei einem endfälligen Darlehen wird nur Zins gezahlt, die Tilgung erfolgt am Ende der Laufzeit in einer Summe.'),

(5, 'Darlehensarten', 'hard', 'Welche Vor- und Nachteile hat ein endfälliges Darlehen?', '["Nur Vorteile", "Niedrige monatliche Rate, aber hohe Endzahlung", "Nur Nachteile", "Keine Unterschiede"]', 'Niedrige monatliche Rate, aber hohe Endzahlung', 'Vorteil: Niedrige monatliche Rate (nur Zinsen). Nachteil: Hohe Endzahlung (gesamte Tilgung).'),

(5, 'Darlehensarten', 'easy', 'Was ist ein variables Darlehen?', '["Darlehen mit festem Zinssatz", "Darlehen mit variablem Zinssatz", "Darlehen ohne Zinsen", "Darlehen ohne Tilgung"]', 'Darlehen mit variablem Zinssatz', 'Ein variables Darlehen hat einen variablen Zinssatz, der sich an einem Referenzzinssatz (z.B. EURIBOR) orientiert.'),

(5, 'Darlehensarten', 'medium', 'Welche Risiken hat ein variables Darlehen?', '["Keine Risiken", "Zinsänderungsrisiko", "Tilgungsrisiko", "Währungsrisiko"]', 'Zinsänderungsrisiko', 'Bei einem variablen Darlehen besteht das Risiko, dass der Zinssatz steigt und die monatliche Rate höher wird.'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Forward-Darlehen?', '["Darlehen für Zukunft", "Darlehen mit Vorlaufzeit", "Darlehen für Vergangenheit", "Darlehen ohne Vorlaufzeit"]', 'Darlehen mit Vorlaufzeit', 'Ein Forward-Darlehen wird heute abgeschlossen, aber erst in der Zukunft (Vorlaufzeit) ausgezahlt, um sich günstige Zinsen zu sichern.'),

(5, 'Darlehensarten', 'easy', 'Was ist ein KfW-Darlehen?', '["Darlehen der Kreditanstalt für Wiederaufbau", "Darlehen einer Bank", "Darlehen eines Versicherers", "Darlehen eines Maklers"]', 'Darlehen der Kreditanstalt für Wiederaufbau', 'Ein KfW-Darlehen ist ein staatlich gefördertes Darlehen der Kreditanstalt für Wiederaufbau (KfW).'),

(5, 'Darlehensarten', 'medium', 'Welche Vorteile hat ein KfW-Darlehen?', '["Keine Vorteile", "Günstige Zinsen, Tilgungszuschüsse", "Nur günstige Zinsen", "Nur Tilgungszuschüsse"]', 'Günstige Zinsen, Tilgungszuschüsse', 'KfW-Darlehen bieten günstige Zinsen und teilweise Tilgungszuschüsse (z.B. bei energetischer Sanierung).'),

(5, 'Darlehensarten', 'hard', 'Was ist ein Bausparvertrag?', '["Sparvertrag + Darlehen", "Nur Sparvertrag", "Nur Darlehen", "Versicherung"]', 'Sparvertrag + Darlehen', 'Ein Bausparvertrag kombiniert eine Sparphase mit einem Darlehensanspruch nach Zuteilung.'),

(5, 'Darlehensarten', 'easy', 'Was ist eine Zinsbindung?', '["Zeitraum mit festem Zinssatz", "Zeitraum mit variablem Zinssatz", "Zeitraum ohne Zinsen", "Zeitraum ohne Tilgung"]', 'Zeitraum mit festem Zinssatz', 'Die Zinsbindung ist der Zeitraum, in dem der Zinssatz fest vereinbart ist (z.B. 10 Jahre).'),

(5, 'Darlehensarten', 'medium', 'Was passiert nach Ablauf der Zinsbindung?', '["Darlehen ist abbezahlt", "Anschlussfinanzierung erforderlich", "Zinssatz bleibt gleich", "Darlehen wird gekündigt"]', 'Anschlussfinanzierung erforderlich', 'Nach Ablauf der Zinsbindung ist eine Anschlussfinanzierung erforderlich, da meist noch eine Restschuld besteht.'),

(5, 'Darlehensarten', 'hard', 'Was ist eine Prolongation?', '["Verlängerung bei gleicher Bank", "Wechsel zu anderer Bank", "Kündigung", "Sondertilgung"]', 'Verlängerung bei gleicher Bank', 'Eine Prolongation ist die Verlängerung des Darlehens bei der gleichen Bank zu neuen Konditionen.'),

(5, 'Darlehensarten', 'easy', 'Was ist eine Umschuldung?', '["Wechsel zu anderer Bank", "Verlängerung bei gleicher Bank", "Kündigung", "Sondertilgung"]', 'Wechsel zu anderer Bank', 'Eine Umschuldung ist der Wechsel zu einer anderen Bank mit günstigeren Konditionen.'),

(5, 'Darlehensarten', 'medium', 'Was ist eine Sondertilgung?', '["Zusätzliche Tilgung außerhalb der Rate", "Reguläre Tilgung", "Keine Tilgung", "Tilgung am Ende"]', 'Zusätzliche Tilgung außerhalb der Rate', 'Eine Sondertilgung ist eine zusätzliche Tilgung außerhalb der regulären monatlichen Rate.'),

(5, 'Darlehensarten', 'hard', 'Welche Vorteile hat eine Sondertilgung?', '["Keine Vorteile", "Schnellere Entschuldung, niedrigere Zinslast", "Nur schnellere Entschuldung", "Nur niedrigere Zinslast"]', 'Schnellere Entschuldung, niedrigere Zinslast', 'Sondertilgungen verkürzen die Laufzeit und reduzieren die Gesamtzinslast.');

-- Kategorie 3: Finanzierungsplanung & Beratung (20 Fragen)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES
(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Bedarfsanalyse?', '["Ermittlung des Finanzierungsbedarfs", "Ermittlung der Bonität", "Ermittlung der Immobilie", "Ermittlung der Zinsen"]', 'Ermittlung des Finanzierungsbedarfs', 'Eine Bedarfsanalyse ermittelt den individuellen Finanzierungsbedarf des Kunden.'),

(5, 'Finanzierungsplanung', 'easy', 'Welche Faktoren werden in der Bedarfsanalyse berücksichtigt?', '["Nur Einkommen", "Einkommen, Ausgaben, Eigenkapital, Ziele", "Nur Ausgaben", "Nur Eigenkapital"]', 'Einkommen, Ausgaben, Eigenkapital, Ziele', 'Die Bedarfsanalyse berücksichtigt Einkommen, Ausgaben, Eigenkapital und die Ziele des Kunden.'),

(5, 'Finanzierungsplanung', 'medium', 'Was ist eine Haushaltsrechnung?', '["Ermittlung des verfügbaren Einkommens", "Ermittlung der Bonität", "Ermittlung der Immobilie", "Ermittlung der Zinsen"]', 'Ermittlung des verfügbaren Einkommens', 'Eine Haushaltsrechnung ermittelt das verfügbare Einkommen nach Abzug aller Ausgaben.'),

(5, 'Finanzierungsplanung', 'medium', 'Welcher Sicherheitspuffer wird in der Haushaltsrechnung empfohlen?', '["10%", "20%", "30%", "40%"]', '20%', 'Banken empfehlen einen Sicherheitspuffer von 20% für unvorhergesehene Ausgaben.'),

(5, 'Finanzierungsplanung', 'hard', 'Wie wird die maximale Darlehensrate berechnet?', '["Verfügbares Einkommen / Sicherheitspuffer", "Verfügbares Einkommen × Sicherheitspuffer", "Verfügbares Einkommen - Sicherheitspuffer", "Verfügbares Einkommen + Sicherheitspuffer"]', 'Verfügbares Einkommen / Sicherheitspuffer', 'Maximale Darlehensrate = Verfügbares Einkommen / Sicherheitspuffer (z.B. 1,2 für 20%).'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist Eigenkapital?', '["Eigenes Geld des Käufers", "Geld der Bank", "Geld des Verkäufers", "Geld des Staates"]', 'Eigenes Geld des Käufers', 'Eigenkapital ist das eigene Geld, das der Käufer in die Finanzierung einbringt.'),

(5, 'Finanzierungsplanung', 'medium', 'Wie viel Eigenkapital wird empfohlen?', '["0%", "10%", "20%", "30%"]', '20%', 'Banken empfehlen mindestens 20% Eigenkapital (Kaufpreis + Nebenkosten).'),

(5, 'Finanzierungsplanung', 'hard', 'Was sind Nebenkosten beim Immobilienkauf?', '["Grunderwerbsteuer, Notar, Makler", "Nur Grunderwerbsteuer", "Nur Notar", "Nur Makler"]', 'Grunderwerbsteuer, Notar, Makler', 'Nebenkosten umfassen Grunderwerbsteuer, Notar- und Grundbuchkosten sowie ggf. Maklerprovision.'),

(5, 'Finanzierungsplanung', 'easy', 'Wie hoch ist die Grunderwerbsteuer in Deutschland?', '["3,5-6,5%", "1-2%", "10-15%", "20-25%"]', '3,5-6,5%', 'Die Grunderwerbsteuer beträgt je nach Bundesland 3,5-6,5% des Kaufpreises.'),

(5, 'Finanzierungsplanung', 'medium', 'Was ist ein Finanzierungsplan?', '["Übersicht über Kosten und Finanzierung", "Übersicht über Zinsen", "Übersicht über Tilgung", "Übersicht über Laufzeit"]', 'Übersicht über Kosten und Finanzierung', 'Ein Finanzierungsplan gibt eine Übersicht über alle Kosten und die Finanzierungsstruktur.'),

(5, 'Finanzierungsplanung', 'hard', 'Welche Posten enthält ein Finanzierungsplan?', '["Kaufpreis, Nebenkosten, Eigenkapital, Darlehen", "Nur Kaufpreis", "Nur Nebenkosten", "Nur Darlehen"]', 'Kaufpreis, Nebenkosten, Eigenkapital, Darlehen', 'Ein Finanzierungsplan enthält Kaufpreis, Nebenkosten, Eigenkapital und Darlehensbetrag.'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist ein Konditionsvergleich?', '["Vergleich verschiedener Darlehensangebote", "Vergleich verschiedener Immobilien", "Vergleich verschiedener Banken", "Vergleich verschiedener Makler"]', 'Vergleich verschiedener Darlehensangebote', 'Ein Konditionsvergleich vergleicht verschiedene Darlehensangebote hinsichtlich Zinsen, Kosten und Konditionen.'),

(5, 'Finanzierungsplanung', 'medium', 'Welche Kriterien sind beim Konditionsvergleich wichtig?', '["Nur Zinssatz", "Zinssatz, Kosten, Flexibilität", "Nur Kosten", "Nur Flexibilität"]', 'Zinssatz, Kosten, Flexibilität', 'Beim Konditionsvergleich sind Zinssatz, Kosten und Flexibilität (z.B. Sondertilgungen) wichtig.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist der Unterschied zwischen Nominal- und Effektivzins?', '["Nominalzins ohne Kosten, Effektivzins mit Kosten", "Kein Unterschied", "Nominalzins mit Kosten, Effektivzins ohne Kosten", "Nur Nominalzins ist wichtig"]', 'Nominalzins ohne Kosten, Effektivzins mit Kosten', 'Der Nominalzins ist der reine Zinssatz, der Effektivzins berücksichtigt zusätzlich alle Kosten.'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Vollfinanzierung?', '["Finanzierung ohne Eigenkapital", "Finanzierung mit Eigenkapital", "Finanzierung mit 50% Eigenkapital", "Finanzierung mit 100% Eigenkapital"]', 'Finanzierung ohne Eigenkapital', 'Eine Vollfinanzierung ist eine Finanzierung ohne oder mit sehr wenig Eigenkapital (0-10%).'),

(5, 'Finanzierungsplanung', 'medium', 'Welche Risiken hat eine Vollfinanzierung?', '["Keine Risiken", "Höhere Zinsen, höhere Rate", "Nur höhere Zinsen", "Nur höhere Rate"]', 'Höhere Zinsen, höhere Rate', 'Vollfinanzierungen haben höhere Zinsen und höhere monatliche Raten, da das Risiko für die Bank steigt.'),

(5, 'Finanzierungsplanung', 'hard', 'Wann ist eine Vollfinanzierung sinnvoll?', '["Immer", "Bei hohem Einkommen und sicherer Beschäftigung", "Nie", "Nur bei niedrigen Zinsen"]', 'Bei hohem Einkommen und sicherer Beschäftigung', 'Eine Vollfinanzierung ist sinnvoll bei hohem Einkommen, sicherer Beschäftigung und niedriger Verschuldung.'),

(5, 'Finanzierungsplanung', 'easy', 'Was ist eine Anschlussfinanzierung?', '["Finanzierung nach Zinsbindung", "Erste Finanzierung", "Finanzierung für zweite Immobilie", "Finanzierung für Renovierung"]', 'Finanzierung nach Zinsbindung', 'Eine Anschlussfinanzierung ist die Fortsetzung der Finanzierung nach Ablauf der Zinsbindung.'),

(5, 'Finanzierungsplanung', 'medium', 'Wann sollte man sich um eine Anschlussfinanzierung kümmern?', '["1 Jahr vor Ablauf", "6 Monate vor Ablauf", "3 Jahre vor Ablauf", "Nach Ablauf"]', '3 Jahre vor Ablauf', 'Man sollte sich ca. 3 Jahre vor Ablauf der Zinsbindung um eine Anschlussfinanzierung kümmern.'),

(5, 'Finanzierungsplanung', 'hard', 'Was ist ein Forward-Darlehen im Kontext der Anschlussfinanzierung?', '["Sicherung günstiger Zinsen für Zukunft", "Sofortige Finanzierung", "Kündigung", "Sondertilgung"]', 'Sicherung günstiger Zinsen für Zukunft', 'Ein Forward-Darlehen sichert günstige Zinsen für die Anschlussfinanzierung bis zu 5 Jahre im Voraus.');

-- Kategorie 4: Bonitätsprüfung & Kreditwürdigkeit (15 Fragen)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES
(5, 'Bonitätsprüfung', 'easy', 'Was ist Bonität?', '["Kreditwürdigkeit", "Einkommen", "Vermögen", "Schulden"]', 'Kreditwürdigkeit', 'Bonität ist die Kreditwürdigkeit, also die Fähigkeit und Bereitschaft, Schulden zurückzuzahlen.'),

(5, 'Bonitätsprüfung', 'easy', 'Welche Faktoren beeinflussen die Bonität?', '["Nur Einkommen", "Einkommen, Beschäftigung, Schulden, Zahlungsverhalten", "Nur Schulden", "Nur Zahlungsverhalten"]', 'Einkommen, Beschäftigung, Schulden, Zahlungsverhalten', 'Die Bonität wird durch Einkommen, Beschäftigung, bestehende Schulden und Zahlungsverhalten beeinflusst.'),

(5, 'Bonitätsprüfung', 'medium', 'Was ist die SCHUFA?', '["Schutzgemeinschaft für allgemeine Kreditsicherung", "Bank", "Versicherung", "Makler"]', 'Schutzgemeinschaft für allgemeine Kreditsicherung', 'Die SCHUFA ist eine Auskunftei, die Informationen über die Kreditwürdigkeit von Personen sammelt.'),

(5, 'Bonitätsprüfung', 'medium', 'Welche Informationen speichert die SCHUFA?', '["Nur Kredite", "Kredite, Konten, Zahlungsverhalten", "Nur Konten", "Nur Zahlungsverhalten"]', 'Kredite, Konten, Zahlungsverhalten', 'Die SCHUFA speichert Informationen über Kredite, Konten, Kreditkarten und Zahlungsverhalten.'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist der SCHUFA-Score?', '["Punktzahl zur Kreditwürdigkeit (0-100%)", "Einkommen", "Vermögen", "Schulden"]', 'Punktzahl zur Kreditwürdigkeit (0-100%)', 'Der SCHUFA-Score ist eine Punktzahl von 0-100%, die die Kreditwürdigkeit bewertet (höher = besser).'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist eine SCHUFA-Auskunft?', '["Bericht über Kreditwürdigkeit", "Bericht über Einkommen", "Bericht über Vermögen", "Bericht über Schulden"]', 'Bericht über Kreditwürdigkeit', 'Eine SCHUFA-Auskunft ist ein Bericht über die gespeicherten Daten und die Kreditwürdigkeit einer Person.'),

(5, 'Bonitätsprüfung', 'medium', 'Wie oft kann man eine kostenlose SCHUFA-Auskunft anfordern?', '["1x pro Jahr", "2x pro Jahr", "4x pro Jahr", "Unbegrenzt"]', '1x pro Jahr', 'Nach Art. 15 DSGVO hat jeder Bürger das Recht auf eine kostenlose SCHUFA-Auskunft pro Jahr.'),

(5, 'Bonitätsprüfung', 'hard', 'Welche Auswirkungen hat ein negativer SCHUFA-Eintrag?', '["Keine Auswirkungen", "Erschwerte Kreditvergabe, höhere Zinsen", "Nur erschwerte Kreditvergabe", "Nur höhere Zinsen"]', 'Erschwerte Kreditvergabe, höhere Zinsen', 'Negative SCHUFA-Einträge erschweren die Kreditvergabe und führen oft zu höheren Zinsen.'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist eine Selbstauskunft?', '["Eigene Angaben zur finanziellen Situation", "SCHUFA-Auskunft", "Bankauskunft", "Arbeitgeberauskunft"]', 'Eigene Angaben zur finanziellen Situation', 'Eine Selbstauskunft sind die eigenen Angaben des Kunden zu Einkommen, Ausgaben und Vermögen.'),

(5, 'Bonitätsprüfung', 'medium', 'Welche Unterlagen werden für eine Bonitätsprüfung benötigt?', '["Nur Gehaltsnachweis", "Gehaltsnachweis, Kontoauszüge, SCHUFA-Auskunft", "Nur Kontoauszüge", "Nur SCHUFA-Auskunft"]', 'Gehaltsnachweis, Kontoauszüge, SCHUFA-Auskunft', 'Für eine Bonitätsprüfung werden Gehaltsnachweis, Kontoauszüge und SCHUFA-Auskunft benötigt.'),

(5, 'Bonitätsprüfung', 'hard', 'Was ist eine Tragfähigkeitsprüfung?', '["Prüfung, ob Kunde Darlehensrate tragen kann", "Prüfung der Bonität", "Prüfung der Immobilie", "Prüfung der Bank"]', 'Prüfung, ob Kunde Darlehensrate tragen kann', 'Eine Tragfähigkeitsprüfung prüft, ob der Kunde die monatliche Darlehensrate dauerhaft tragen kann.'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist ein Einkommensnachweis?', '["Nachweis über Einkommen", "Nachweis über Vermögen", "Nachweis über Schulden", "Nachweis über Ausgaben"]', 'Nachweis über Einkommen', 'Ein Einkommensnachweis ist ein Dokument, das das Einkommen des Kunden belegt (z.B. Gehaltsabrechnung).'),

(5, 'Bonitätsprüfung', 'medium', 'Welche Einkommensnachweise werden akzeptiert?', '["Nur Gehaltsabrechnung", "Gehaltsabrechnung, Steuerbescheid, Rentenbescheid", "Nur Steuerbescheid", "Nur Rentenbescheid"]', 'Gehaltsabrechnung, Steuerbescheid, Rentenbescheid', 'Akzeptierte Einkommensnachweise sind Gehaltsabrechnungen, Steuerbescheide und Rentenbescheide.'),

(5, 'Bonitätsprüfung', 'hard', 'Wie wird die Bonität bei Selbstständigen geprüft?', '["Nur Steuerbescheid", "Steuerbescheid, BWA, Bilanz", "Nur BWA", "Nur Bilanz"]', 'Steuerbescheid, BWA, Bilanz', 'Bei Selbstständigen wird die Bonität anhand von Steuerbescheiden, BWA (Betriebswirtschaftliche Auswertung) und Bilanzen geprüft.'),

(5, 'Bonitätsprüfung', 'easy', 'Was ist eine Probezeit?', '["Befristete Beschäftigung", "Unbefristete Beschäftigung", "Selbstständigkeit", "Rente"]', 'Befristete Beschäftigung', 'Eine Probezeit ist eine befristete Phase zu Beginn eines Arbeitsverhältnisses (meist 6 Monate).');

-- Kategorie 5: Risiken & Haftung (15 Fragen)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES
(5, 'Risiken', 'easy', 'Was ist ein Zinsänderungsrisiko?', '["Risiko steigender Zinsen", "Risiko fallender Zinsen", "Risiko konstanter Zinsen", "Kein Risiko"]', 'Risiko steigender Zinsen', 'Das Zinsänderungsrisiko ist das Risiko, dass die Zinsen nach Ablauf der Zinsbindung steigen.'),

(5, 'Risiken', 'easy', 'Was ist ein Zahlungsunfähigkeitsrisiko?', '["Risiko, Raten nicht zahlen zu können", "Risiko, Immobilie zu verlieren", "Risiko, Zinsen zu zahlen", "Kein Risiko"]', 'Risiko, Raten nicht zahlen zu können', 'Das Zahlungsunfähigkeitsrisiko ist das Risiko, dass der Kunde die monatlichen Raten nicht mehr zahlen kann.'),

(5, 'Risiken', 'medium', 'Was passiert bei Zahlungsunfähigkeit?', '["Kündigung des Darlehens", "Nichts", "Zinssenkung", "Tilgungsaussetzung"]', 'Kündigung des Darlehens', 'Bei Zahlungsunfähigkeit kann die Bank das Darlehen kündigen und die Zwangsversteigerung einleiten.'),

(5, 'Risiken', 'medium', 'Was ist eine Zwangsversteigerung?', '["Verkauf der Immobilie durch Gericht", "Verkauf der Immobilie durch Eigentümer", "Verkauf der Immobilie durch Bank", "Verkauf der Immobilie durch Makler"]', 'Verkauf der Immobilie durch Gericht', 'Eine Zwangsversteigerung ist der Verkauf der Immobilie durch das Gericht zur Tilgung der Schulden.'),

(5, 'Risiken', 'hard', 'Welche Folgen hat eine Zwangsversteigerung?', '["Keine Folgen", "Verlust der Immobilie, Restschuld, SCHUFA-Eintrag", "Nur Verlust der Immobilie", "Nur Restschuld"]', 'Verlust der Immobilie, Restschuld, SCHUFA-Eintrag', 'Folgen: Verlust der Immobilie, mögliche Restschuld, negativer SCHUFA-Eintrag.'),

(5, 'Risiken', 'easy', 'Was ist eine Vorfälligkeitsentschädigung?', '["Entschädigung bei vorzeitiger Rückzahlung", "Entschädigung bei Zahlungsausfall", "Entschädigung bei Zinssenkung", "Keine Entschädigung"]', 'Entschädigung bei vorzeitiger Rückzahlung', 'Eine Vorfälligkeitsentschädigung ist eine Entschädigung, die bei vorzeitiger Rückzahlung des Darlehens fällig wird.'),

(5, 'Risiken', 'medium', 'Wann fällt eine Vorfälligkeitsentschädigung an?', '["Bei vorzeitiger Rückzahlung", "Bei regulärer Rückzahlung", "Bei Zahlungsausfall", "Nie"]', 'Bei vorzeitiger Rückzahlung', 'Eine VFE fällt an, wenn das Darlehen vor Ablauf der Zinsbindung vorzeitig zurückgezahlt wird.'),

(5, 'Risiken', 'hard', 'Wie wird die Vorfälligkeitsentschädigung berechnet?', '["Aktuar-Methode oder Zinsschaden-Methode", "Nur Aktuar-Methode", "Nur Zinsschaden-Methode", "Pauschal"]', 'Aktuar-Methode oder Zinsschaden-Methode', 'Die VFE wird nach der Aktuar-Methode oder Zinsschaden-Methode berechnet.'),

(5, 'Risiken', 'easy', 'Was ist eine Aufklärungspflicht?', '["Pflicht, Kunden über Risiken aufzuklären", "Pflicht, Kunden über Zinsen aufzuklären", "Pflicht, Kunden über Tilgung aufzuklären", "Keine Pflicht"]', 'Pflicht, Kunden über Risiken aufzuklären', 'Die Aufklärungspflicht ist die Pflicht des Beraters, den Kunden über alle Risiken aufzuklären.'),

(5, 'Risiken', 'medium', 'Welche Risiken müssen aufgeklärt werden?', '["Nur Zinsänderungsrisiko", "Zinsänderungsrisiko, Zahlungsunfähigkeitsrisiko, Zwangsversteigerungsrisiko", "Nur Zahlungsunfähigkeitsrisiko", "Nur Zwangsversteigerungsrisiko"]', 'Zinsänderungsrisiko, Zahlungsunfähigkeitsrisiko, Zwangsversteigerungsrisiko', 'Aufzuklären sind: Zinsänderungsrisiko, Zahlungsunfähigkeitsrisiko, Zwangsversteigerungsrisiko, VFE.'),

(5, 'Risiken', 'hard', 'Was passiert bei Verletzung der Aufklärungspflicht?', '["Nichts", "Schadensersatzansprüche", "Bußgeld", "Erlaubnisentzug"]', 'Schadensersatzansprüche', 'Bei Verletzung der Aufklärungspflicht können Schadensersatzansprüche des Kunden entstehen (§ 280 BGB).'),

(5, 'Risiken', 'easy', 'Was ist eine Haftung?', '["Verantwortung für Schäden", "Verantwortung für Zinsen", "Verantwortung für Tilgung", "Keine Verantwortung"]', 'Verantwortung für Schäden', 'Haftung ist die rechtliche Verantwortung für Schäden, die durch Fehler oder Pflichtverletzungen entstehen.'),

(5, 'Risiken', 'medium', 'Wann haftet ein Darlehensvermittler?', '["Bei Beratungsfehlern", "Nie", "Nur bei Betrug", "Nur bei Vorsatz"]', 'Bei Beratungsfehlern', 'Ein Darlehensvermittler haftet bei Beratungsfehlern, falschen Angaben oder Verletzung von Aufklärungspflichten.'),

(5, 'Risiken', 'hard', 'Welche Versicherung schützt vor Haftungsrisiken?', '["Berufshaftpflichtversicherung", "Privathaftpflichtversicherung", "Rechtsschutzversicherung", "Keine Versicherung"]', 'Berufshaftpflichtversicherung', 'Eine Berufshaftpflichtversicherung schützt vor Schadensersatzansprüchen aus Beratungsfehlern.'),

(5, 'Risiken', 'easy', 'Was ist ein Interessenkonflikt?', '["Konflikt zwischen eigenen und Kundeninteressen", "Konflikt zwischen Banken", "Konflikt zwischen Kunden", "Kein Konflikt"]', 'Konflikt zwischen eigenen und Kundeninteressen', 'Ein Interessenkonflikt entsteht, wenn eigene Interessen (z.B. Provision) mit Kundeninteressen kollidieren.');

-- Kategorie 6: Verbraucherschutz & Widerrufsrecht (10 Fragen)

INSERT INTO question_bank (moduleId, category, difficulty, questionText, options, correctAnswer, explanation) VALUES
(5, 'Verbraucherschutz', 'easy', 'Was ist ein Widerrufsrecht?', '["Recht, Vertrag zu widerrufen", "Recht, Vertrag zu kündigen", "Recht, Vertrag zu ändern", "Kein Recht"]', 'Recht, Vertrag zu widerrufen', 'Das Widerrufsrecht ist das Recht des Verbrauchers, einen Vertrag innerhalb einer Frist zu widerrufen.'),

(5, 'Verbraucherschutz', 'easy', 'Wie lang ist die Widerrufsfrist bei Immobiliardarlehen?', '["7 Tage", "14 Tage", "30 Tage", "60 Tage"]', '14 Tage', 'Die Widerrufsfrist bei Immobiliardarlehen beträgt 14 Tage (§ 495 BGB).'),

(5, 'Verbraucherschutz', 'medium', 'Wann beginnt die Widerrufsfrist?', '["Ab Vertragsschluss", "Ab Vertragsschluss + Widerrufsbelehrung", "Ab Auszahlung", "Ab Kündigung"]', 'Ab Vertragsschluss + Widerrufsbelehrung', 'Die Widerrufsfrist beginnt ab Vertragsschluss, aber erst nach ordnungsgemäßer Widerrufsbelehrung.'),

(5, 'Verbraucherschutz', 'medium', 'Was passiert, wenn keine Widerrufsbelehrung erfolgt?', '["Widerrufsfrist läuft nicht", "Widerrufsfrist läuft normal", "Widerrufsrecht erlischt", "Vertrag ist ungültig"]', 'Widerrufsfrist läuft nicht', 'Ohne ordnungsgemäße Widerrufsbelehrung läuft die Widerrufsfrist nicht, das Widerrufsrecht besteht unbegrenzt.'),

(5, 'Verbraucherschutz', 'hard', 'Welche Folgen hat ein Widerruf?', '["Vertrag wird rückabgewickelt", "Vertrag bleibt bestehen", "Vertrag wird geändert", "Vertrag wird gekündigt"]', 'Vertrag wird rückabgewickelt', 'Bei Widerruf wird der Vertrag rückabgewickelt, bereits gezahlte Beträge werden zurückerstattet.'),

(5, 'Verbraucherschutz', 'easy', 'Was ist eine Schlichtungsstelle?', '["Außergerichtliche Streitbeilegung", "Gerichtliche Streitbeilegung", "Polizei", "Anwalt"]', 'Außergerichtliche Streitbeilegung', 'Eine Schlichtungsstelle ist eine außergerichtliche Stelle zur Beilegung von Streitigkeiten.'),

(5, 'Verbraucherschutz', 'medium', 'Welche Schlichtungsstelle ist für Darlehensvermittler zuständig?', '["Verbraucherschlichtungsstelle der Bundesbank", "IHK", "BaFin", "Gericht"]', 'Verbraucherschlichtungsstelle der Bundesbank', 'Für Darlehensvermittler ist die Verbraucherschlichtungsstelle der Deutschen Bundesbank zuständig.'),

(5, 'Verbraucherschutz', 'hard', 'Welche Kosten entstehen für Verbraucher bei der Schlichtung?', '["Keine Kosten", "100 €", "500 €", "1.000 €"]', 'Keine Kosten', 'Die Schlichtung ist für Verbraucher kostenlos.'),

(5, 'Verbraucherschutz', 'easy', 'Was ist das UWG?', '["Gesetz gegen unlauteren Wettbewerb", "Gesetz über Widerrufsrecht", "Gesetz über Verbraucherschutz", "Gesetz über Werbung"]', 'Gesetz gegen unlauteren Wettbewerb', 'Das UWG ist das Gesetz gegen den unlauteren Wettbewerb, das unlautere Geschäftspraktiken verbietet.'),

(5, 'Verbraucherschutz', 'medium', 'Welche Praktiken sind nach UWG verboten?', '["Nur irreführende Werbung", "Irreführende Werbung, aggressive Verkaufsmethoden", "Nur aggressive Verkaufsmethoden", "Keine Praktiken"]', 'Irreführende Werbung, aggressive Verkaufsmethoden', 'Nach UWG sind irreführende Werbung und aggressive Verkaufsmethoden verboten.');
