CREATE TABLE IF NOT EXISTS `pending_purchases` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(320) NOT NULL,
  `sessionId` VARCHAR(255) NOT NULL UNIQUE,
  `modules` VARCHAR(255) NOT NULL,
  `productId` VARCHAR(255) NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `claimedAt` TIMESTAMP NULL,
  `claimedByUserId` INT NULL,
  INDEX `idx_pending_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
