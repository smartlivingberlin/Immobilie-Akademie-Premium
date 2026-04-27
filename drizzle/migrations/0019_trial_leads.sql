CREATE TABLE IF NOT EXISTS `trial_leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(320) NOT NULL UNIQUE,
  `code` VARCHAR(64) NOT NULL UNIQUE,
  `moduleInterest` VARCHAR(255) NULL,
  `expiresAt` TIMESTAMP NOT NULL,
  `usedAt` TIMESTAMP NULL,
  `extended` BOOLEAN DEFAULT FALSE,
  `extensionCount` INT DEFAULT 0,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_trial_email` (`email`),
  INDEX `idx_trial_code` (`code`),
  INDEX `idx_trial_expires` (`expiresAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
