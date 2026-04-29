-- Portal Settings: Preise, Videos, Landingpage-Texte
CREATE TABLE IF NOT EXISTS portal_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  setting_type ENUM('text', 'number', 'url', 'json') DEFAULT 'text',
  description VARCHAR(255),
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Standard-Preise einfügen
INSERT INTO portal_settings (setting_key, setting_value, setting_type, description) VALUES
('price_modul_1', '149', 'number', 'Preis Modul 1 in EUR'),
('price_modul_2', '499', 'number', 'Preis Modul 2 in EUR'),
('price_modul_3', '699', 'number', 'Preis Modul 3 in EUR'),
('price_modul_4', '399', 'number', 'Preis Modul 4 in EUR'),
('price_modul_5', '499', 'number', 'Preis Modul 5 in EUR'),
('price_bundle', '1955', 'number', 'Preis Komplett-Paket in EUR'),
('video_modul_1', '', 'url', 'YouTube-URL Modul 1 Vorschau'),
('video_modul_2', '', 'url', 'YouTube-URL Modul 2 Vorschau'),
('video_modul_3', '', 'url', 'YouTube-URL Modul 3 Vorschau'),
('video_modul_4', '', 'url', 'YouTube-URL Modul 4 Vorschau'),
('video_modul_5', '', 'url', 'YouTube-URL Modul 5 Vorschau'),
('landing_modul_1_titel', 'Modul 1: Immobilien-Grundkurs', 'text', 'Titel Landingpage Modul 1'),
('landing_modul_2_titel', 'Modul 2: Makler §34c GewO', 'text', 'Titel Landingpage Modul 2'),
('landing_modul_3_titel', 'Modul 3: WEG-Verwalter', 'text', 'Titel Landingpage Modul 3'),
('landing_modul_4_titel', 'Modul 4: Gutachter', 'text', 'Titel Landingpage Modul 4'),
('landing_modul_5_titel', 'Modul 5: §34i GewO', 'text', 'Titel Landingpage Modul 5');
