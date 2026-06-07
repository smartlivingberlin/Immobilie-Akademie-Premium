CREATE TABLE IF NOT EXISTS `referral_rewards` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `userId` int NOT NULL,
  `type` varchar(32) NOT NULL,
  `amountDays` int NOT NULL DEFAULT 0,
  `note` varchar(255) NULL,
  `sourceReferralUserId` int NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_referral_rewards_user` (`userId`)
);
