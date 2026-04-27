-- DB-Indizes fuer haeufige Queries (MySQL 8.0+)
CREATE INDEX IF NOT EXISTS `idx_ll_userId` ON `learning_logs` (`userId`);
CREATE INDEX IF NOT EXISTS `idx_ll_moduleId` ON `learning_logs` (`moduleId`);
CREATE INDEX IF NOT EXISTS `idx_cc_userId` ON `chat_conversations` (`userId`);
CREATE INDEX IF NOT EXISTS `idx_cm_convId` ON `chat_messages` (`conversationId`);
CREATE INDEX IF NOT EXISTS `idx_es_userId` ON `exam_sessions` (`userId`);
CREATE INDEX IF NOT EXISTS `idx_qb_moduleId` ON `question_bank` (`moduleId`);
