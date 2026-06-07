CREATE TABLE IF NOT EXISTS `schema_migrations` (
  `filename` varchar(255) NOT NULL PRIMARY KEY,
  `appliedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
