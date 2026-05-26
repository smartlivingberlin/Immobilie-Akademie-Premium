-- Alte monitoring_log (Schema 0022) umbenennen
RENAME TABLE monitoring_log TO monitoring_log_old_0022;

-- Neue monitoring_log mit korrektem Schema erstellen
CREATE TABLE monitoring_log (
  id INT NOT NULL AUTO_INCREMENT,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL,
  details JSON DEFAULT NULL,
  alertSent TINYINT(1) DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_timestamp (timestamp),
  KEY idx_type_status (type, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
