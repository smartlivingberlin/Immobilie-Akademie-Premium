-- Migration: 0021_glossar_cleanup
-- Ziel: Duplikate in glossar_terms entfernen und UNIQUE Index setzen
-- Ergebnis: 93 eindeutige Einträge, 6 Kategorien

-- Schritt 1: Duplikate löschen (behalte jeweils den Eintrag mit der kleinsten ID)
DELETE t1 FROM glossar_terms t1
INNER JOIN glossar_terms t2
  ON t1.term = t2.term AND t1.id > t2.id;

-- Schritt 2: UNIQUE Index setzen (verhindert zukünftige Duplikate, idempotent via IF NOT EXISTS)
ALTER TABLE glossar_terms
  ADD UNIQUE INDEX IF NOT EXISTS idx_glossar_term_unique (term);
