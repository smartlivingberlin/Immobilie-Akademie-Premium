CREATE TABLE IF NOT EXISTS access_codes (
  id INT AUTO_INCREMENT PRIMARY KEY,

  -- Der Code, den du verschickst (z.B. "SLB-ABCD-1234")
  code VARCHAR(64) NOT NULL UNIQUE,

  -- Welche Module werden freigeschaltet (z.B. "2,3,4" oder "1,2,3,4,5")
  modules VARCHAR(255) NOT NULL,

  -- Optional: Rolle setzen, z.B. "user" oder "trainer" (admin geben wir darüber NICHT automatisch)
  role VARCHAR(16) NULL,

  -- Wie oft darf der Code benutzt werden? (1 = nur einmal, 0 = unendlich oft)
  max_uses INT NOT NULL DEFAULT 1,
  used_count INT NOT NULL DEFAULT 0,

  -- Schalter: Code aktiv/inaktiv (damit du ihn später „abschalten“ kannst)
  is_active BOOLEAN NOT NULL DEFAULT TRUE,

  -- Notiz für dich (z.B. "für Max Mustermann, Paket B")
  note TEXT NULL,

  -- Wer hat den Code erstellt? (deine User-ID als Admin)
  created_by_user_id INT NULL,

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
