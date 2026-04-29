-- Spalten von camelCase zu snake_case umbenennen
ALTER TABLE open_questions CHANGE `modulId` `modul_id` INT NOT NULL;
ALTER TABLE open_questions CHANGE `hinweis` `kontext` TEXT;
ALTER TABLE open_questions CHANGE `schwierigkeit` `schwierigkeit` VARCHAR(20) DEFAULT 'mittel';
