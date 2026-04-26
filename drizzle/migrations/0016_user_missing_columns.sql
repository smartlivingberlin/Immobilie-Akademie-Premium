ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `onboardingCompleted` tinyint(1) NOT NULL DEFAULT 0;
ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `trialExpiresAt` datetime NULL;
ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `learningGoal` varchar(255) NULL;
ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `dailyMinutes` int NULL;
ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `preferredTime` varchar(100) NULL;
ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `experienceLevel` varchar(100) NULL;
ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `tenantId` int NULL;
ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `lastSignedIn` timestamp NULL;
