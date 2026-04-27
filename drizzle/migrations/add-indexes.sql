-- DB-Indizes fuer haeufige Queries
CREATE INDEX `idx_ll_userId` ON `learning_logs` (`userId`);
CREATE INDEX `idx_ll_moduleId` ON `learning_logs` (`moduleId`);
CREATE INDEX `idx_cc_userId` ON `chat_conversations` (`userId`);
CREATE INDEX `idx_cm_convId` ON `chat_messages` (`conversationId`);
CREATE INDEX `idx_es_userId` ON `exam_sessions` (`userId`);
CREATE INDEX `idx_qb_moduleId` ON `question_bank` (`moduleId`);
