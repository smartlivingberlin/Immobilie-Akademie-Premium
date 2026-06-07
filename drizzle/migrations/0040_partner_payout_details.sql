CREATE TABLE IF NOT EXISTS `partner_payout_details` (
  `userId` int NOT NULL PRIMARY KEY,
  `payoutMethod` varchar(20) NOT NULL DEFAULT 'sepa',
  `accountHolder` varchar(120) NOT NULL,
  `ibanLast4` varchar(4) NOT NULL,
  `paypalEmail` varchar(255) DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
