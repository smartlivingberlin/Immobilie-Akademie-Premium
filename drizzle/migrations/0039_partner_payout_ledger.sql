CREATE TABLE IF NOT EXISTS `partner_payout_ledger` (
  `id` int NOT NULL AUTO_INCREMENT,
  `partnerUserId` int NOT NULL,
  `periodStart` date NOT NULL,
  `periodEnd` date NOT NULL,
  `referralCount` int NOT NULL DEFAULT 0,
  `grossEur` decimal(10,2) NOT NULL DEFAULT 0.00,
  `commissionEur` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` varchar(20) NOT NULL DEFAULT 'pending',
  `paidAt` timestamp NULL DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_partner` (`partnerUserId`),
  KEY `idx_status` (`status`)
);
