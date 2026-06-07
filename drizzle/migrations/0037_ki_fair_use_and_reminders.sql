ALTER TABLE `users` ADD COLUMN `kiTier` varchar(16) NULL DEFAULT 'full';
CREATE TABLE IF NOT EXISTS `ki_daily_usage` (
  `userId` int NOT NULL,
  `usageDate` date NOT NULL,
  `messageCount` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`userId`, `usageDate`)
);
CREATE TABLE IF NOT EXISTS `access_expiry_reminders` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `userId` int NOT NULL,
  `accessExpiresAt` date NOT NULL,
  `reminderDays` int NOT NULL,
  `sentAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uq_access_reminder` (`userId`, `accessExpiresAt`, `reminderDays`)
);
