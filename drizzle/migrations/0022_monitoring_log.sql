CREATE TABLE IF NOT EXISTS monitoring_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  createdAt DATETIME DEFAULT NOW(),
  totalUsers INT DEFAULT 0,
  activeToday INT DEFAULT 0,
  newToday INT DEFAULT 0,
  totalSessions INT DEFAULT 0,
  avgScore DECIMAL(5,2) DEFAULT 0,
  problemDays INT DEFAULT 0,
  systemOk TINYINT(1) DEFAULT 1,
  notes TEXT,
  emailSent TINYINT(1) DEFAULT 0
);
