-- Migration 0021: locked Spalte (safe)
ALTER IGNORE TABLE users ADD COLUMN locked TINYINT(1) NOT NULL DEFAULT 0;
