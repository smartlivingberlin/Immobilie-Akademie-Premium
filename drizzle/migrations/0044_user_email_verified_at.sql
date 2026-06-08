ALTER TABLE `users` ADD COLUMN `emailVerifiedAt` timestamp NULL DEFAULT NULL;
UPDATE `users` SET `emailVerifiedAt` = COALESCE(`createdAt`, CURRENT_TIMESTAMP) WHERE `emailVerifiedAt` IS NULL;
