ALTER TABLE `users` ADD COLUMN `onboardingCompleted` tinyint(1) NOT NULL DEFAULT 0;
ALTER TABLE `users` ADD COLUMN `trialExpiresAt` datetime NULL;
ALTER TABLE `users` ADD COLUMN `learningGoal` varchar(255) NULL;
ALTER TABLE `users` ADD COLUMN `dailyMinutes` int NULL;
ALTER TABLE `users` ADD COLUMN `preferredTime` varchar(100) NULL;
ALTER TABLE `users` ADD COLUMN `experienceLevel` varchar(100) NULL;
ALTER TABLE `users` ADD COLUMN `tenantId` int NULL;
ALTER TABLE `users` ADD COLUMN `lastSignedIn` timestamp NULL;
