
-- DB-Indizes für häufige Queries (performance)
ALTER TABLE learning_logs
  ADD INDEX IF NOT EXISTS idx_ll_userId (userId),
  ADD INDEX IF NOT EXISTS idx_ll_moduleId (moduleId);

ALTER TABLE chat_conversations
  ADD INDEX IF NOT EXISTS idx_cc_userId (userId);

ALTER TABLE chat_messages
  ADD INDEX IF NOT EXISTS idx_cm_convId (conversationId);

ALTER TABLE exam_sessions
  ADD INDEX IF NOT EXISTS idx_es_userId (userId);

ALTER TABLE activity_heartbeats
  ADD INDEX IF NOT EXISTS idx_ah_userId (userId);

ALTER TABLE question_bank
  ADD INDEX IF NOT EXISTS idx_qb_moduleId (moduleId);
