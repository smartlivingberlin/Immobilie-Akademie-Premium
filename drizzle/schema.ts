import { index,  int, float, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, tinyint } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

/**
 * Core user table backing auth flow.
 * Extended with role system for White-Label functionality.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "trainer"]).default("user").notNull(),
  enabledModules: varchar("enabledModules", { length: 255 }).default("").notNull(),
  onboardingCompleted: int("onboardingCompleted").default(0),
  trialExpiresAt: timestamp("trialExpiresAt"),
  learningGoal: varchar("learningGoal", { length: 64 }),
  dailyMinutes: int("dailyMinutes").default(30),
  preferredTime: varchar("preferredTime", { length: 32 }),
  experienceLevel: varchar("experienceLevel", { length: 32 }),
  /** Links user to a specific White-Label tenant (null = default/owner tenant) */
  tenantId: int("tenantId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
}, (table) => ({
  emailIdx: index("idx_users_email").on(table.email),
  tenantIdIdx: index("idx_users_tenantId").on(table.tenantId),
}));


// ── Spaced Repetition — SM-2 Algorithmus ─────────────────────
export const spacedRepetition = mysqlTable("spaced_repetition", {
  id:              int("id").primaryKey().autoincrement(),
  userId:          int("userId").notNull(),
  questionId:      int("questionId").notNull(),
  easinessFactor:  float("easinessFactor").default(2.5).notNull(),
  interval:        int("interval").default(1).notNull(),
  repetitions:     int("repetitions").default(0).notNull(),
  nextReviewAt:    timestamp("nextReviewAt").default(sql`NOW()`).notNull(),
  lastResult:      varchar("lastResult", { length: 10 }),  // correct/wrong
  updatedAt:       timestamp("updatedAt").default(sql`NOW()`).notNull(),
}, (table) => ({
  userIdIdx: index("idx_sr_userId").on(table.userId),
  questionIdIdx: index("idx_sr_questionId").on(table.questionId),
  nextReviewIdx: index("idx_sr_nextReviewAt").on(table.nextReviewAt),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * White-Label tenant configuration
 */
export const whitelabelConfigs = mysqlTable("whitelabel_configs", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  logoUrl: text("logoUrl"),
  faviconUrl: text("faviconUrl"),
  primaryColor: varchar("primaryColor", { length: 7 }).default("#2563eb").notNull(),
  secondaryColor: varchar("secondaryColor", { length: 7 }).default("#1e293b").notNull(),
  accentColor: varchar("accentColor", { length: 7 }).default("#3b82f6").notNull(),
  sidebarColor: varchar("sidebarColor", { length: 7 }).default("#0f172a").notNull(),
  welcomeText: text("welcomeText"),
  footerText: text("footerText"),
  contactEmail: varchar("contactEmail", { length: 320 }),
  contactPhone: varchar("contactPhone", { length: 50 }),
  websiteUrl: text("websiteUrl"),
  azavEnabled: boolean("azavEnabled").default(false).notNull(),
  azavCertNumber: varchar("azavCertNumber", { length: 100 }),
  azavValidUntil: timestamp("azavValidUntil"),
  enabledModules: varchar("enabledModules", { length: 255 }).default("1,2,3,4,5").notNull(),
  maxUsers: int("maxUsers").default(100).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  adminUserId: int("adminUserId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type WhitelabelConfig = typeof whitelabelConfigs.$inferSelect;
export type InsertWhitelabelConfig = typeof whitelabelConfigs.$inferInsert;

export const chatConversations = mysqlTable("chat_conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }),
  moduleContext: varchar("moduleContext", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdIdx: index("idx_chat_userId").on(table.userId),
}));

export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  role: mysqlEnum("role", ["user", "assistant", "system"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  convIdIdx: index("idx_chat_convId").on(table.conversationId),
}));

export const videoTutorials = mysqlTable("video_tutorials", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  videoUrl: text("videoUrl").notNull(),
  platform: mysqlEnum("platform", ["youtube", "vimeo"]).notNull(),
  videoId: varchar("videoId", { length: 100 }).notNull(),
  durationSeconds: int("durationSeconds"),
  moduleId: int("moduleId").notNull(),
  dayNumber: int("dayNumber").notNull(),
  displayOrder: int("displayOrder").default(0).notNull(),
  isRequired: boolean("isRequired").default(false).notNull(),
  thumbnailUrl: text("thumbnailUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  modDayIdx: index("idx_video_mod_day").on(table.moduleId, table.dayNumber),
}));

export const videoProgress = mysqlTable("video_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  videoId: int("videoId").notNull(),
  currentPosition: int("currentPosition").default(0).notNull(),
  isCompleted: boolean("isCompleted").default(false).notNull(),
  percentageWatched: int("percentageWatched").default(0).notNull(),
  lastWatchedAt: timestamp("lastWatchedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdIdx: index("idx_video_prog_userId").on(table.userId),
  videoIdIdx: index("idx_video_prog_videoId").on(table.videoId),
}));

// ============================================================================
// EXAM SYSTEM
// ============================================================================

export const examSessions = mysqlTable("exam_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  totalQuestions: int("totalQuestions").notNull().default(50),
  correctAnswers: int("correctAnswers").notNull().default(0),
  score: int("score").notNull().default(0),
  timeSpent: int("timeSpent").notNull().default(0),
  timeLimit: int("timeLimit").notNull().default(1800),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).notNull().default("medium"),
  isIHKMode: boolean("isIHKMode").notNull().default(false),
  status: mysqlEnum("status", ["in_progress", "completed", "abandoned"]).notNull().default("in_progress"),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("idx_exam_userId").on(table.userId),
  moduleIdIdx: index("idx_exam_moduleId").on(table.moduleId),
}));

export const examQuestions = mysqlTable("exam_questions", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: int("sessionId").notNull(),
  questionNumber: int("questionNumber").notNull(),
  questionText: text("questionText").notNull(),
  correctAnswer: text("correctAnswer").notNull(),
  userAnswer: text("userAnswer"),
  isCorrect: boolean("isCorrect"),
  moduleId: int("moduleId").notNull(),
  dayId: int("dayId"),
  topic: varchar("topic", { length: 255 }),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).notNull().default("medium"),
  feedback: text("feedback"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  sessionIdIdx: index("idx_exam_q_sessionId").on(table.sessionId),
}));

export const examWeakTopics = mysqlTable("exam_weak_topics", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  topic: varchar("topic", { length: 255 }).notNull(),
  incorrectCount: int("incorrectCount").notNull().default(1),
  lastEncountered: timestamp("lastEncountered").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("idx_weak_userId").on(table.userId),
}));

export const certificates = mysqlTable("certificates", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  examSessionId: int("examSessionId").notNull(),
  moduleId: int("moduleId").notNull(),
  moduleName: varchar("moduleName", { length: 255 }).notNull(),
  score: int("score").notNull(),
  totalQuestions: int("totalQuestions").notNull(),
  correctAnswers: int("correctAnswers").notNull(),
  pdfUrl: text("pdfUrl").notNull(),
  pdfKey: varchar("pdfKey", { length: 500 }).notNull(),
  issuedAt: timestamp("issuedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("idx_cert_userId").on(table.userId),
}));


export const questionBank = mysqlTable("question_bank", {
  id: int("id").autoincrement().primaryKey(),
  moduleId: int("moduleId").notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).notNull().default("medium"),
  questionText: text("questionText").notNull(),
  options: text("options").notNull(),
  correctAnswer: text("correctAnswer").notNull(),
  explanation: text("explanation"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  moduleIdIdx: index("idx_qb_moduleId").on(table.moduleId),
  categoryIdx: index("idx_qb_category").on(table.category),
}));

// ============================================================================
// AZAV-COMPLIANCE TABLES
// ============================================================================

export const learningLogs = mysqlTable("learning_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  dayId: int("dayId").notNull(),
  openedAt: timestamp("openedAt").defaultNow().notNull(),
  closedAt: timestamp("closedAt"),
  durationSeconds: int("durationSeconds").default(0).notNull(),
  heartbeatCount: int("heartbeatCount").default(0).notNull(),
  completed: boolean("completed").default(false).notNull(),
}, (table) => ({
  userIdIdx: index("idx_log_userId").on(table.userId),
  modDayIdx: index("idx_log_mod_day").on(table.moduleId, table.dayId),
}));

export const userSessions = mysqlTable("user_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  sessionId: varchar("sessionId", { length: 128 }).notNull().unique(),
  loginTime: timestamp("loginTime").defaultNow().notNull(),
  logoutTime: timestamp("logoutTime"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  deviceInfo: text("deviceInfo"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("idx_sess_userId").on(table.userId),
}));

export const activityHeartbeats = mysqlTable("activity_heartbeats", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  dayId: int("dayId").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("idx_hb_userId").on(table.userId),
}));

export const examAuditLog = mysqlTable("exam_audit_log", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  sessionId: int("sessionId").notNull(),
  questionId: int("questionId").notNull(),
  chosenAnswer: text("chosenAnswer").notNull(),
  isCorrect: boolean("isCorrect").notNull(),
  answeredAt: timestamp("answeredAt").defaultNow().notNull(),
}, (table) => ({
  sessIdIdx: index("idx_audit_sessId").on(table.sessionId),
}));

export const feedback = mysqlTable("feedback", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  dayId: int("dayId"),
  rating: int("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  modIdx: index("idx_fb_moduleId").on(table.moduleId),
}));

export const complaints = mysqlTable("complaints", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: mysqlEnum("status", ["open", "in_progress", "resolved", "closed"])
    .default("open").notNull(),
  adminNote: text("adminNote"),
  resolvedAt: timestamp("resolvedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdIdx: index("idx_comp_userId").on(table.userId),
}));

export const consentLog = mysqlTable("consent_log", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  consentType: mysqlEnum("consentType", [
    "terms",
    "privacy",
    "ai_assistant",
    "marketing",
    "revoked_terms",
    "revoked_privacy",
    "revoked_ai",
    "revoked_marketing"
  ]).notNull(),
  consentVersion: varchar("consentVersion", { length: 20 }).notNull(),
  givenAt: timestamp("givenAt").defaultNow().notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }),
}, (table) => ({
  userIdIdx: index("idx_consent_userId").on(table.userId),
}));

export const avvAgreements = mysqlTable("avv_agreements", {
  id: int("id").autoincrement().primaryKey(),
  tenantId: int("tenantId").notNull(),
  signedByUserId: int("signedByUserId").notNull(),
  version: varchar("version", { length: 20 }).notNull(),
  signedAt: timestamp("signedAt").defaultNow().notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }),
}, (table) => ({
  tenantIdIdx: index("idx_avv_tenantId").on(table.tenantId),
}));

export const otpTokens = mysqlTable("otp_tokens", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  code: varchar("code", { length: 10 }).notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  used: tinyint("used").default(0).notNull(),
  attempts: int("attempts").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const authCredentials = mysqlTable("auth_credentials", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  hash: text("hash").notNull(),
  salt: varchar("salt", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const accessCodes = mysqlTable("access_codes", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 64 }).notNull().unique(),
  modules: varchar("modules", { length: 255 }).notNull(),
  role: varchar("role", { length: 16 }),
  maxUses: int("max_uses").notNull().default(1),
  usedCount: int("used_count").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  note: text("note"),
  createdByUserId: int("created_by_user_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const passwordResetTokens = mysqlTable("password_reset_tokens", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  token: varchar("token", { length: 64 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  usedAt: timestamp("usedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const openQuestions = mysqlTable("open_questions", {
  id:              int("id").autoincrement().primaryKey(),
  modulId:         int("modul_id").notNull(),
  tagId:           int("tag_id").default(0),
  frage:           text("frage").notNull(),
  kontext:         text("kontext"),
  musterloesung:   text("musterloesung").notNull(),
  bewertungsSchema: text("bewertungs_schema").notNull(),
  maxPunkte:       int("max_punkte").default(10).notNull(),
  zeitlimitMin:    int("zeitlimit_min").default(10).notNull(),
  schwierigkeit:   varchar("schwierigkeit", { length: 10 }).default("mittel"),
  kategorie:       varchar("kategorie", { length: 60 }).default("allgemein"),
  aktiv:           boolean("aktiv").default(true),
  erstelltAm:      timestamp("erstellt_am").defaultNow(),
}, (table) => ({
  modIdx: index("idx_oq_modulId").on(table.modulId),
}));

export const openAnswers = mysqlTable("open_answers", {
  id:           int("id").autoincrement().primaryKey(),
  userId:       int("user_id").notNull(),
  questionId:   int("question_id").notNull(),
  antwort:      text("antwort").notNull(),
  kiPunkte:     int("ki_punkte"),
  kiGut:        text("ki_gut"),
  kiFehlt:      text("ki_fehlt"),
  kiVerbesserung: text("ki_verbesserung"),
  kiRohinput:   text("ki_rohinput"),
  dauer:        int("dauer"),
  erstelltAm:   timestamp("erstellt_am").defaultNow(),
}, (table) => ({
  userIdIdx: index("idx_oa_userId").on(table.userId),
  qIdIdx: index("idx_oa_questionId").on(table.questionId),
}));

// Type-Exports fuer db.ts Kompatibilitaet
export type ChatConversation = typeof chatConversations.$inferSelect;
export type InsertChatConversation = typeof chatConversations.$inferInsert;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;
export type VideoTutorial = typeof videoTutorials.$inferSelect;
export type InsertVideoTutorial = typeof videoTutorials.$inferInsert;
export type VideoProgress = typeof videoProgress.$inferSelect;
export type InsertVideoProgress = typeof videoProgress.$inferInsert;
export type ExamSession = typeof examSessions.$inferSelect;
export type InsertExamSession = typeof examSessions.$inferInsert;
export type ExamQuestion = typeof examQuestions.$inferSelect;
export type InsertExamQuestion = typeof examQuestions.$inferInsert;
export type ExamWeakTopic = typeof examWeakTopics.$inferSelect;
export type InsertExamWeakTopic = typeof examWeakTopics.$inferInsert;
export type LearningLog = typeof learningLogs.$inferSelect;
export type InsertLearningLog = typeof learningLogs.$inferInsert;
export type UserSession = typeof userSessions.$inferSelect;
export type InsertUserSession = typeof userSessions.$inferInsert;
export type InsertActivityHeartbeat = typeof activityHeartbeats.$inferInsert;
export type ExamAuditEntry = typeof examAuditLog.$inferSelect;
export type InsertExamAuditEntry = typeof examAuditLog.$inferInsert;
export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = typeof feedback.$inferInsert;
export type Complaint = typeof complaints.$inferSelect;
export type InsertComplaint = typeof complaints.$inferInsert;
export type InsertConsentLogEntry = typeof consentLog.$inferInsert;
export type InsertAvvAgreement = typeof avvAgreements.$inferInsert;
