CREATE TABLE IF NOT EXISTS `verwalter_events` (
  `id` varchar(12) NOT NULL,
  `userId` int NOT NULL,
  `objektId` varchar(12) NULL,
  `vorgangId` varchar(12) NULL,
  `typ` varchar(64) NOT NULL,
  `payloadJson` text NULL,
  `status` varchar(32) NOT NULL DEFAULT 'neu',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_verwalter_events_userId` (`userId`),
  KEY `idx_verwalter_events_status` (`status`)
);

CREATE TABLE IF NOT EXISTS `verwalter_freigaben` (
  `id` varchar(12) NOT NULL,
  `userId` int NOT NULL,
  `objektId` varchar(12) NULL,
  `vorgangId` varchar(12) NULL,
  `kind` varchar(32) NOT NULL,
  `titel` varchar(512) NOT NULL,
  `payloadJson` text NOT NULL,
  `status` varchar(32) NOT NULL DEFAULT 'ausstehend',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_verwalter_freigaben_userId` (`userId`),
  KEY `idx_verwalter_freigaben_status` (`status`)
);
