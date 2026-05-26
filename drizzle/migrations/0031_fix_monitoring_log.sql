-- Fix: monitoring_log Schema korrigieren
-- Altes Schema hatte: totalUsers, activeToday etc.
-- Neues Schema braucht: type, status, details

-- Alte Tabelle umbenennen falls sie das alte Schema hat
SET @col_exists = (
  SELECT COUNT(*) FROM information_schema.COLUMNS 
  WHERE TABLE_SCHEMA = DATABASE() 
  AND TABLE_NAME = 'monitoring_log' 
  AND COLUMN_NAME = 'type'
);

-- Nur ausführen wenn type-Spalte fehlt
ALTER TABLE monitoring_log 
  ADD COLUMN IF NOT EXISTS `type` VARCHAR(50) NOT NULL DEFAULT 'legacy' AFTER `id`,
  ADD COLUMN IF NOT EXISTS `status` VARCHAR(20) NOT NULL DEFAULT 'ok' AFTER `type`,
  ADD COLUMN IF NOT EXISTS `details` JSON DEFAULT NULL AFTER `status`;
