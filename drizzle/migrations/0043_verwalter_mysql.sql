CREATE TABLE IF NOT EXISTS `verwalter_objekte` (
  `id` varchar(12) NOT NULL,
  `userId` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `adresse` varchar(512) NOT NULL,
  `plz` varchar(16) NOT NULL,
  `ort` varchar(128) NOT NULL,
  `einheitenAnzahl` int NOT NULL DEFAULT 0,
  `verwalterName` varchar(255) NOT NULL,
  `verwalterAdresse` varchar(512) NOT NULL,
  `kontaktEmail` varchar(320) NULL,
  `kontaktTelefon` varchar(64) NULL,
  `notizen` text NULL,
  `einheitenJson` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_verwalter_objekte_userId` (`userId`)
);

CREATE TABLE IF NOT EXISTS `verwalter_vorgaenge` (
  `id` varchar(12) NOT NULL,
  `userId` int NOT NULL,
  `objektId` varchar(12) NOT NULL,
  `objektName` varchar(255) NOT NULL,
  `typ` varchar(32) NOT NULL,
  `titel` varchar(512) NOT NULL,
  `beschreibung` text NULL,
  `status` varchar(32) NOT NULL DEFAULT 'offen',
  `faelligAm` date NULL,
  `relatedVorlageSlug` varchar(128) NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_verwalter_vorgaenge_userId` (`userId`),
  KEY `idx_verwalter_vorgaenge_objektId` (`objektId`)
);

CREATE TABLE IF NOT EXISTS `verwalter_buchungen` (
  `id` varchar(12) NOT NULL,
  `userId` int NOT NULL,
  `objektId` varchar(12) NOT NULL,
  `objektName` varchar(255) NOT NULL,
  `datum` date NOT NULL,
  `betrag` decimal(12, 2) NOT NULL,
  `sollKonto` varchar(16) NOT NULL,
  `habenKonto` varchar(16) NOT NULL,
  `buchungstext` varchar(512) NOT NULL,
  `belegNr` varchar(64) NULL,
  `einheitId` varchar(12) NULL,
  `einheitNr` varchar(32) NULL,
  `periode` varchar(7) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_verwalter_buchungen_userId` (`userId`),
  KEY `idx_verwalter_buchungen_objektId` (`objektId`),
  KEY `idx_verwalter_buchungen_periode` (`periode`)
);
