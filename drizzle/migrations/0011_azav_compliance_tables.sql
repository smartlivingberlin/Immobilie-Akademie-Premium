-- ============================================================================
-- Migration 0011: AZAV-Compliance Tabellen
-- Pflicht für Trägerzulassung nach AZAV §2, §3, §4
-- Erstellt: 2026-03-01
-- ============================================================================

-- learning_logs: Server-seitige Lernfortschrittsspeicherung
-- Ersetzt localStorage, unveränderlich für AZAV-Audit
CREATE TABLE IF NOT EXISTS `learning_logs` (
  `id`               INT AUTO_INCREMENT PRIMARY KEY,
  `userId`           INT NOT NULL,
  `moduleId`         INT NOT NULL,
  `dayId`            INT NOT NULL,
  `openedAt`         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `closedAt`         TIMESTAMP NULL,
  `durationSeconds`  INT NOT NULL DEFAULT 0,
  `heartbeatCount`   INT NOT NULL DEFAULT 0,
  `completed`        BOOLEAN NOT NULL DEFAULT FALSE,
  INDEX `idx_learning_logs_user`   (`userId`),
  INDEX `idx_learning_logs_module` (`userId`, `moduleId`),
  INDEX `idx_learning_logs_day`    (`userId`, `moduleId`, `dayId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- user_sessions: Session-Protokoll für AZAV-Nutzeridentifizierung
CREATE TABLE IF NOT EXISTS `user_sessions` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `userId`      INT NOT NULL,
  `sessionId`   VARCHAR(128) NOT NULL UNIQUE,
  `loginTime`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `logoutTime`  TIMESTAMP NULL,
  `ipAddress`   VARCHAR(45) NULL,
  `deviceInfo`  TEXT NULL,
  `isActive`    BOOLEAN NOT NULL DEFAULT TRUE,
  `createdAt`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_user_sessions_user`    (`userId`),
  INDEX `idx_user_sessions_active`  (`userId`, `isActive`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- activity_heartbeats: Anwesenheitsnachweis (60-Sekunden-Takt)
CREATE TABLE IF NOT EXISTS `activity_heartbeats` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `userId`     INT NOT NULL,
  `moduleId`   INT NOT NULL,
  `dayId`      INT NOT NULL,
  `timestamp`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_heartbeats_user`   (`userId`),
  INDEX `idx_heartbeats_day`    (`userId`, `moduleId`, `dayId`),
  INDEX `idx_heartbeats_time`   (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- exam_audit_log: Unveränderliche Prüfungsdokumentation
-- KEIN updatedAt: einmal geschrieben, nie geändert (AZAV-Pflicht)
CREATE TABLE IF NOT EXISTS `exam_audit_log` (
  `id`            INT AUTO_INCREMENT PRIMARY KEY,
  `userId`        INT NOT NULL,
  `sessionId`     INT NOT NULL,
  `questionId`    INT NOT NULL,
  `chosenAnswer`  TEXT NOT NULL,
  `isCorrect`     BOOLEAN NOT NULL,
  `answeredAt`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_audit_user`    (`userId`),
  INDEX `idx_audit_session` (`sessionId`),
  INDEX `idx_audit_time`    (`answeredAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- feedback: QM-Pflicht nach AZAV §3 (Teilnehmerbewertungen)
CREATE TABLE IF NOT EXISTS `feedback` (
  `id`        INT AUTO_INCREMENT PRIMARY KEY,
  `userId`    INT NOT NULL,
  `moduleId`  INT NOT NULL,
  `dayId`     INT NULL,
  `rating`    INT NOT NULL CHECK (`rating` BETWEEN 1 AND 5),
  `comment`   TEXT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_feedback_module` (`moduleId`),
  INDEX `idx_feedback_user`   (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- complaints: Formales Beschwerdeverfahren (QM-Pflicht AZAV)
CREATE TABLE IF NOT EXISTS `complaints` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `userId`      INT NOT NULL,
  `subject`     VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `status`      ENUM('open','in_progress','resolved','closed') NOT NULL DEFAULT 'open',
  `adminNote`   TEXT NULL,
  `resolvedAt`  TIMESTAMP NULL,
  `createdAt`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_complaints_status` (`status`),
  INDEX `idx_complaints_user`   (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- consent_log: DSGVO Art. 7 – Nachweispflicht für Einwilligungen
-- Unveränderlich: kein updatedAt
CREATE TABLE IF NOT EXISTS `consent_log` (
  `id`              INT AUTO_INCREMENT PRIMARY KEY,
  `userId`          INT NOT NULL,
  `consentType`     ENUM(
                      'terms','privacy','ai_assistant','marketing',
                      'revoked_terms','revoked_privacy','revoked_ai','revoked_marketing'
                    ) NOT NULL,
  `consentVersion`  VARCHAR(20) NOT NULL,
  `givenAt`         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ipAddress`       VARCHAR(45) NULL,
  INDEX `idx_consent_user` (`userId`),
  INDEX `idx_consent_type` (`userId`, `consentType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- avv_agreements: Art. 28 DSGVO – AVV für White-Label-Mandanten
-- Unveränderlich: kein updatedAt
CREATE TABLE IF NOT EXISTS `avv_agreements` (
  `id`             INT AUTO_INCREMENT PRIMARY KEY,
  `tenantId`       INT NOT NULL,
  `signedByUserId` INT NOT NULL,
  `version`        VARCHAR(20) NOT NULL,
  `signedAt`       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ipAddress`      VARCHAR(45) NULL,
  INDEX `idx_avv_tenant` (`tenantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
