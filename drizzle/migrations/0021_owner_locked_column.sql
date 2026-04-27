-- Migration 0021: locked Spalte für User-Sperrung
ALTER TABLE users ADD COLUMN IF NOT EXISTS locked TINYINT(1) NOT NULL DEFAULT 0;
