CREATE TABLE IF NOT EXISTS `open_questions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `modul_id` INT NOT NULL,
  `frage` TEXT NOT NULL,
  `hinweis` TEXT,
  `schwierigkeit` VARCHAR(20) DEFAULT 'mittel',
  `aktiv` TINYINT(1) DEFAULT 1,
  `createdAt` DATETIME DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS `open_answers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `questionId` INT NOT NULL,
  `userId` INT NOT NULL,
  `antwort` TEXT NOT NULL,
  `bewertung` TEXT,
  `score` INT DEFAULT 0,
  `createdAt` DATETIME DEFAULT NOW()
);

INSERT IGNORE INTO open_questions (modul_id, frage, hinweis, schwierigkeit, aktiv) VALUES
  (1, 'Was ist ein Grundbuch und welche Funktion hat es?', 'Erklaere Aufbau, Abteilungen und rechtliche Bedeutung.', 'mittel', 1),
  (1, 'Erklaere den Unterschied zwischen Eigentum und Besitz.', 'Nenne Beispiele und die rechtliche Grundlage im BGB.', 'leicht', 1),
  (1, 'Was versteht man unter dem Wohnwert einer Immobilie?', 'Beschreibe die wichtigsten wertbestimmenden Faktoren.', 'mittel', 1),
  (2, 'Was ist ein Maklervertrag und wann entsteht der Provisionsanspruch?', 'Erklaere die Voraussetzungen gemaess Paragraph 652 BGB.', 'mittel', 1),
  (2, 'Erklaere die Pflichten eines Maklers nach dem GwG.', 'Beschreibe Identifizierungspflicht und Risikoanalyse.', 'schwer', 1),
  (2, 'Was ist eine Reservierungsvereinbarung und ist sie rechtlich bindend?', 'Erklaere die aktuelle Rechtslage und BGH-Urteile.', 'schwer', 1),
  (3, 'Was ist eine Eigentuemer-versammlung und was wird dort beschlossen?', 'Erklaere Ablauf, Mehrheitserfordernisse und Protokollpflicht.', 'mittel', 1),
  (3, 'Erklaere den Unterschied zwischen Sondereigentum und Gemeinschaftseigentum.', 'Nenne konkrete Beispiele aus der Praxis.', 'leicht', 1),
  (3, 'Was ist eine Jahresabrechnung in der WEG-Verwaltung?', 'Erklaere Aufbau und Pflichten des Verwalters.', 'mittel', 1),
  (4, 'Erklaere das Vergleichswertverfahren zur Immobilienbewertung.', 'Beschreibe Voraussetzungen, Ablauf und Anwendungsfaelle.', 'mittel', 1),
  (4, 'Was ist der Bodenwert und wie wird er ermittelt?', 'Erklaere die Bodenrichtwerte und ihre Bedeutung.', 'leicht', 1),
  (4, 'Erklaere den Unterschied zwischen Verkehrswert und Beleihungswert.', 'Nenne rechtliche Grundlagen und praktische Unterschiede.', 'schwer', 1),
  (5, 'Was ist ein Annuitaetendarlehen und wie funktioniert die Tilgung?', 'Erklaere Tilgungsanteil, Zinsanteil und Restschuld.', 'mittel', 1),
  (5, 'Erklaere die Pflichten eines Darlehensvermittlers nach Paragraph 34i GewO.', 'Beschreibe Erlaubnispflicht, Beratungspflicht und Dokumentation.', 'schwer', 1),
  (5, 'Was ist das ESIS-Merkblatt und wozu dient es?', 'Erklaere Inhalt und gesetzliche Grundlage der EU-WIKR.', 'mittel', 1);
