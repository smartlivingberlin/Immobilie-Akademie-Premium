-- open_questions fehlende Spalten hinzufügen (MySQL kompatibel)
ALTER TABLE open_questions ADD COLUMN `tag_id` INT DEFAULT 0;
ALTER TABLE open_questions ADD COLUMN `kontext` TEXT;
ALTER TABLE open_questions ADD COLUMN `musterloesung` TEXT;
ALTER TABLE open_questions ADD COLUMN `bewertungs_schema` TEXT;
ALTER TABLE open_questions ADD COLUMN `max_punkte` INT DEFAULT 10;
ALTER TABLE open_questions ADD COLUMN `zeitlimit_min` INT DEFAULT 10;
ALTER TABLE open_questions ADD COLUMN `kategorie` VARCHAR(60) DEFAULT 'allgemein';

UPDATE open_questions SET 
  musterloesung = frage,
  bewertungs_schema = '{"kriterien":["Vollstaendigkeit","Korrektheit","Beispiele"]}'
WHERE musterloesung IS NULL;
