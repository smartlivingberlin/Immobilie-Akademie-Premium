CREATE TABLE IF NOT EXISTS `deletion_audit_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userHash` char(64) NOT NULL,
  `initiatedBy` enum('user','admin') NOT NULL,
  `deletedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tablesAffected` json NOT NULL,
  `triggeredVia` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_deletion_audit_deletedAt` (`deletedAt`)
);
