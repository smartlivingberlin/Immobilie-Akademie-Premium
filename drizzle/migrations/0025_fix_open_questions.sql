-- open_questions Tabelle auf aktuelles Schema upgraden
ALTER TABLE open_questions 
  ADD COLUMN IF NOT EXISTS `tag_id` INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `kontext` TEXT,
  ADD COLUMN IF NOT EXISTS `musterloesung` TEXT,
  ADD COLUMN IF NOT EXISTS `bewertungs_schema` TEXT,
  ADD COLUMN IF NOT EXISTS `max_punkte` INT DEFAULT 10,
  ADD COLUMN IF NOT EXISTS `zeitlimit_min` INT DEFAULT 10,
  ADD COLUMN IF NOT EXISTS `kategorie` VARCHAR(60) DEFAULT 'allgemein';

-- Musterlösung für bestehende Fragen setzen (war leer)
UPDATE open_questions SET 
  musterloesung = frage,
  bewertungs_schema = '{"kriterien":["Vollständigkeit","Korrektheit","Beispiele"]}'
WHERE musterloesung IS NULL;
