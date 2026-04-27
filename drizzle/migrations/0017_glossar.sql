CREATE TABLE IF NOT EXISTS `glossar_terms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `term` varchar(255) NOT NULL,
  `definition` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `lawReference` varchar(255) NULL,
  `lawLink` varchar(500) NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_glossar_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
