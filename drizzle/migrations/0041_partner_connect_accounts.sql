CREATE TABLE IF NOT EXISTS `partner_connect_accounts` (
  `userId` int NOT NULL PRIMARY KEY,
  `stripeAccountId` varchar(64) NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'onboarding',
  `chargesEnabled` tinyint NOT NULL DEFAULT 0,
  `payoutsEnabled` tinyint NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_stripe_account` (`stripeAccountId`)
);
