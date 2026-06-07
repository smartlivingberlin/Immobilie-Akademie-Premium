ALTER TABLE `users` ADD COLUMN `accessExpiresAt` datetime NULL;
ALTER TABLE `users` ADD COLUMN `referralCode` varchar(32) NULL;
ALTER TABLE `users` ADD COLUMN `referredByUserId` int NULL;
