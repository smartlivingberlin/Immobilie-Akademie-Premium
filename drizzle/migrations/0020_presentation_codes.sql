CREATE TABLE IF NOT EXISTS `presentation_codes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(64) NOT NULL UNIQUE,
  `label` VARCHAR(255) NULL,
  `enabledModules` VARCHAR(255) NOT NULL,
  `expiresAt` TIMESTAMP NULL,
  `isActive` BOOLEAN DEFAULT TRUE,
  `maxUsage` INT DEFAULT 1,
  `usageCount` INT DEFAULT 0,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_code` (`code`),
  INDEX `idx_active` (`isActive`),
  INDEX `idx_expires` (`expiresAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
