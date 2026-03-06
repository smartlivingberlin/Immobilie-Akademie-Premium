import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

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
  /** Links user to a specific White-Label tenant (null = default/owner tenant) */
  tenantId: int("tenantId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  /** Freigeschaltete Module als kommagetrennte Liste z.B. "1" oder "1,2,3" */
  enabledModules: varchar("enabledModules", { length: 255 }).default("1").notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * White-Label tenant configuration
 * Each B2B customer gets their own branding and module access
 */
export const whitelabelConfigs = mysqlTable("whitelabel_configs", {
  id: int("id").autoincrement().primaryKey(),
  /** Unique slug for the tenant (used in URL or subdomain) */
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  /** Company/organization name */
  companyName: varchar("companyName", { length: 255 }).notNull(),
  /** Logo URL (stored in S3) */
  logoUrl: text("logoUrl"),
  /** Favicon URL (stored in S3) */
  faviconUrl: text("faviconUrl"),
  /** Primary brand color (hex) */
  primaryColor: varchar("primaryColor", { length: 7 }).default("#2563eb").notNull(),
  /** Secondary brand color (hex) */
  secondaryColor: varchar("secondaryColor", { length: 7 }).default("#1e293b").notNull(),
  /** Accent color (hex) */
  accentColor: varchar("accentColor", { length: 7 }).default("#3b82f6").notNull(),
  /** Sidebar background color (hex) */
  sidebarColor: varchar("sidebarColor", { length: 7 }).default("#0f172a").notNull(),
  /** Custom welcome text for the landing page */
  welcomeText: text("welcomeText"),
  /** Custom footer text */
  footerText: text("footerText"),
  /** Contact email for the tenant */
  contactEmail: varchar("contactEmail", { length: 320 }),
  /** Contact phone */
  contactPhone: varchar("contactPhone", { length: 50 }),
  /** Website URL */
  websiteUrl: text("websiteUrl"),
  /** Whether AZAV mode is enabled for this tenant */
  azavEnabled: boolean("azavEnabled").default(false).notNull(),
  /** AZAV certification number */
  azavCertNumber: varchar("azavCertNumber", { length: 100 }),
  /** AZAV certification valid until */
  azavValidUntil: timestamp("azavValidUntil"),
  /** Enabled modules as comma-separated string "1,2,3,4,5" */
  enabledModules: varchar("enabledModules", { length: 255 }).default("1,2,3,4,5").notNull(),
  /** Maximum number of users for this tenant */
  maxUsers: int("maxUsers").default(100).notNull(),
  /** Whether the tenant is active */
  isActive: boolean("isActive").default(true).notNull(),
  /** Admin user ID who manages this tenant */
  adminUserId: int("adminUserId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type WhitelabelConfig = typeof whitelabelConfigs.$inferSelect;
export type InsertWhitelabelConfig = typeof whitelabelConfigs.$inferInsert;

/**
 * Chat conversations table for AI assistant
 */
export const chatConversations = mysqlTable("chat_conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }),
  moduleContext: varchar("moduleContext", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChatConversation = typeof chatConversations.$inferSelect;
export type InsertChatConversation = typeof chatConversations.$inferInsert;

/**
 * Chat messages table for AI assistant
 */
export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  role: mysqlEnum("role", ["user", "assistant", "system"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * Video tutorials for training days
 * Supports YouTube and Vimeo embeds
 */
export const videoTutorials = mysqlTable("video_tutorials", {
  id: int("id").autoincrement().primaryKey(),
  /** Video title */
  title: varchar("title", { length: 255 }).notNull(),
  /** Video description */
  description: text("description"),
  /** Video URL (YouTube or Vimeo) */
  videoUrl: text("videoUrl").notNull(),
  /** Video platform (youtube, vimeo) */
  platform: mysqlEnum("platform", ["youtube", "vimeo"]).notNull(),
  /** Extracted video ID from URL */
  videoId: varchar("videoId", { length: 100 }).notNull(),
  /** Video duration in seconds */
  durationSeconds: int("durationSeconds"),
  /** Module number (1-5) */
  moduleId: int("moduleId").notNull(),
  /** Day number within module */
  dayNumber: int("dayNumber").notNull(),
  /** Display order for multiple videos per day */
  displayOrder: int("displayOrder").default(0).notNull(),
  /** Whether this video is required for completion */
  isRequired: boolean("isRequired").default(false).notNull(),
  /** Thumbnail URL */
  thumbnailUrl: text("thumbnailUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type VideoTutorial = typeof videoTutorials.$inferSelect;
export type InsertVideoTutorial = typeof videoTutorials.$inferInsert;

/**
 * User video progress tracking
 */
export const videoProgress = mysqlTable("video_progress", {
  id: int("id").autoincrement().primaryKey(),
  /** User ID */
  userId: int("userId").notNull(),
  /** Video tutorial ID */
  videoId: int("videoId").notNull(),
  /** Current playback position in seconds */
  currentPosition: int("currentPosition").default(0).notNull(),
  /** Whether the video has been completed (watched >= 90%) */
  isCompleted: boolean("isCompleted").default(false).notNull(),
  /** Percentage watched (0-100) */
  percentageWatched: int("percentageWatched").default(0).notNull(),
  /** Last watched timestamp */
  lastWatchedAt: timestamp("lastWatchedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type VideoProgress = typeof videoProgress.$inferSelect;
export type InsertVideoProgress = typeof videoProgress.$inferInsert;

// ============================================================================
// EXAM SYSTEM
// ============================================================================

/**
 * Exam sessions for tracking user exam attempts
 */
export const examSessions = mysqlTable("exam_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(), // 1-5
  totalQuestions: int("totalQuestions").notNull().default(50),
  correctAnswers: int("correctAnswers").notNull().default(0),
  score: int("score").notNull().default(0), // Percentage (0-100)
  timeSpent: int("timeSpent").notNull().default(0), // Seconds
  timeLimit: int("timeLimit").notNull().default(1800), // Time limit in seconds (default 30 min)
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).notNull().default("medium"),
  isIHKMode: boolean("isIHKMode").notNull().default(false), // IHK simulation mode (72 questions, 180 min)
  status: mysqlEnum("status", ["in_progress", "completed", "abandoned"]).notNull().default("in_progress"),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ExamSession = typeof examSessions.$inferSelect;
export type InsertExamSession = typeof examSessions.$inferInsert;

/**
 * Individual exam questions and answers
 */
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
  topic: varchar("topic", { length: 255 }), // e.g., "Maklerrecht", "WEG-Verwaltung"
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).notNull().default("medium"),
  feedback: text("feedback"), // AI-generated explanation
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ExamQuestion = typeof examQuestions.$inferSelect;
export type InsertExamQuestion = typeof examQuestions.$inferInsert;

/**
 * Weak topics identified from exam results
 */
export const examWeakTopics = mysqlTable("exam_weak_topics", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  topic: varchar("topic", { length: 255 }).notNull(),
  incorrectCount: int("incorrectCount").notNull().default(1),
  lastEncountered: timestamp("lastEncountered").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ExamWeakTopic = typeof examWeakTopics.$inferSelect;
export type InsertExamWeakTopic = typeof examWeakTopics.$inferInsert;

/**
 * Certificates issued to users for passing exams
 */
export const certificates = mysqlTable("certificates", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  examSessionId: int("examSessionId").notNull(),
  moduleId: int("moduleId").notNull(), // 1-5
  moduleName: varchar("moduleName", { length: 255 }).notNull(),
  score: int("score").notNull(), // Percentage (0-100)
  totalQuestions: int("totalQuestions").notNull(),
  correctAnswers: int("correctAnswers").notNull(),
  pdfUrl: text("pdfUrl").notNull(), // S3 URL
  pdfKey: varchar("pdfKey", { length: 500 }).notNull(), // S3 key for future reference
  issuedAt: timestamp("issuedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = typeof certificates.$inferInsert;


/**
 * Question bank for exam preparation (independent of exam sessions)
 */
export const questionBank = mysqlTable("question_bank", {
  id: int("id").autoincrement().primaryKey(),
  moduleId: int("moduleId").notNull(), // 1-5
  category: varchar("category", { length: 255 }).notNull(), // e.g., "Rechtliche Grundlagen", "Darlehensarten"
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).notNull().default("medium"),
  questionText: text("questionText").notNull(),
  options: text("options").notNull(), // JSON array of options
  correctAnswer: text("correctAnswer").notNull(),
  explanation: text("explanation"), // Explanation of the correct answer
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type QuestionBank = typeof questionBank.$inferSelect;
export type InsertQuestionBank = typeof questionBank.$inferInsert;

// ============================================================================
// AZAV-COMPLIANCE TABLES
// Pflicht für Trägerzulassung nach AZAV §2 – unveränderliche Lernprotokolle,
// Anwesenheitsnachweise, Prüfungsaudit, DSGVO-Einwilligungen, QM-System
// ============================================================================

/**
 * Lernfortschritt-Log (server-seitig, AZAV-konform)
 * Ersetzt localStorage als führende Quelle. Kein DELETE durch Nutzer möglich.
 * Pflicht für AZAV-Audit (Nachweis der absolvierten Lerneinheiten).
 */
export const learningLogs = mysqlTable("learning_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),           // 1–5 (+ zukünftige Module)
  dayId: int("dayId").notNull(),                  // Lerntag innerhalb des Moduls
  openedAt: timestamp("openedAt").defaultNow().notNull(),
  closedAt: timestamp("closedAt"),               // null = noch geöffnet
  durationSeconds: int("durationSeconds").default(0).notNull(),
  heartbeatCount: int("heartbeatCount").default(0).notNull(), // Aktive Minuten
  completed: boolean("completed").default(false).notNull(),
  // DSGVO: keine weiteren personenbezogenen Daten hier
});

export type LearningLog = typeof learningLogs.$inferSelect;
export type InsertLearningLog = typeof learningLogs.$inferInsert;

/**
 * Session-Protokoll (AZAV §4 – Nutzeridentifizierung)
 * Jede Login-Session wird protokolliert für Audit-Zwecke.
 */
export const userSessions = mysqlTable("user_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  sessionId: varchar("sessionId", { length: 128 }).notNull().unique(),
  loginTime: timestamp("loginTime").defaultNow().notNull(),
  logoutTime: timestamp("logoutTime"),           // null = noch aktiv
  ipAddress: varchar("ipAddress", { length: 45 }), // IPv4 + IPv6
  deviceInfo: text("deviceInfo"),               // User-Agent (anonymisiert)
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserSession = typeof userSessions.$inferSelect;
export type InsertUserSession = typeof userSessions.$inferInsert;

/**
 * Aktivitäts-Heartbeat (AZAV – Anwesenheitsnachweis)
 * Browser sendet alle 60 Sek ein Signal solange Nutzer aktiv lernt.
 * Nur aktive Minuten zählen als nachgewiesene Lernzeit.
 */
export const activityHeartbeats = mysqlTable("activity_heartbeats", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  dayId: int("dayId").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  // Kein weiterer Inhalt – nur Zeitstempel als Nachweis
});

export type ActivityHeartbeat = typeof activityHeartbeats.$inferSelect;
export type InsertActivityHeartbeat = typeof activityHeartbeats.$inferInsert;

/**
 * Prüfungs-Audit-Log (AZAV – unveränderliche Prüfungsdokumentation)
 * Jede einzelne Antwort wird gespeichert. Kein UPDATE nach Abgabe.
 * Pflicht für AZAV-Zertifikate (Transparenz der Bewertung).
 */
export const examAuditLog = mysqlTable("exam_audit_log", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  sessionId: int("sessionId").notNull(),
  questionId: int("questionId").notNull(),
  chosenAnswer: text("chosenAnswer").notNull(),
  isCorrect: boolean("isCorrect").notNull(),
  answeredAt: timestamp("answeredAt").defaultNow().notNull(),
  // UNVERÄNDERLICH: kein updatedAt – einmal geschrieben, nie geändert
});

export type ExamAuditEntry = typeof examAuditLog.$inferSelect;
export type InsertExamAuditEntry = typeof examAuditLog.$inferInsert;

/**
 * Feedback-System (QM-Pflicht nach AZAV §3)
 * Teilnehmer bewerten jede Lerneinheit. Admin-Auswertung für QM-Dokumentation.
 */
export const feedback = mysqlTable("feedback", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  dayId: int("dayId"),                           // Optional: Feedback zu einzelnem Tag
  rating: int("rating").notNull(),               // 1–5 Sterne
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = typeof feedback.$inferInsert;

/**
 * Beschwerde-Management (QM-Pflicht nach AZAV §3)
 * Formalisiiertes Beschwerdeverfahren mit Status-Tracking.
 */
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
});

export type Complaint = typeof complaints.$inferSelect;
export type InsertComplaint = typeof complaints.$inferInsert;

/**
 * DSGVO-Einwilligungs-Log (Art. 7 DSGVO – Nachweispflicht)
 * Jede Einwilligung wird mit Zeitstempel und Version protokolliert.
 * Widerruf ebenfalls dokumentiert (consentType: "revoked").
 */
export const consentLog = mysqlTable("consent_log", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  consentType: mysqlEnum("consentType", [
    "terms",           // AGB akzeptiert
    "privacy",         // Datenschutzerklärung
    "ai_assistant",    // KI-Assistent (externe API-Übermittlung)
    "marketing",       // Newsletter / Marketing
    "revoked_terms",   // Widerruf AGB
    "revoked_privacy", // Widerruf Datenschutz
    "revoked_ai",      // Widerruf KI
    "revoked_marketing"
  ]).notNull(),
  consentVersion: varchar("consentVersion", { length: 20 }).notNull(), // z.B. "2026-03"
  givenAt: timestamp("givenAt").defaultNow().notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }),
  // Unveränderlich: kein updatedAt
});

export type ConsentLogEntry = typeof consentLog.$inferSelect;
export type InsertConsentLogEntry = typeof consentLog.$inferInsert;

/**
 * AVV-Vereinbarungen für White-Label-Kunden (Art. 28 DSGVO)
 * Auftragsverarbeitungsvertrag muss beim Onboarding neuer Mandanten
 * digital bestätigt werden.
 */
export const avvAgreements = mysqlTable("avv_agreements", {
  id: int("id").autoincrement().primaryKey(),
  tenantId: int("tenantId").notNull(),
  signedByUserId: int("signedByUserId").notNull(), // Admin des Mandanten
  version: varchar("version", { length: 20 }).notNull(), // z.B. "2026-03-v1"
  signedAt: timestamp("signedAt").defaultNow().notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }),
  // Unveränderlich: keine Updates erlaubt
});

export type AvvAgreement = typeof avvAgreements.$inferSelect;
export type InsertAvvAgreement = typeof avvAgreements.$inferInsert;

/**
 * Speichert Passwort-Hashes für lokale Auth.
 * Ersetzt .data/auth.json (ephemeral filesystem).
 */
export const authCredentials = mysqlTable("auth_credentials", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  hash: text("hash").notNull(),
  salt: varchar("salt", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * Passwort-Reset Tokens
 */


/**
 * Freischalt-Codes (Voucher) für Module
 * - Du kannst Codes erzeugen und per WhatsApp/E-Mail versenden
 * - Codes können 1x oder unendlich oft nutzbar sein
 * - Codes können deaktiviert werden
 */
export const accessCodes = mysqlTable("access_codes", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 64 }).notNull().unique(),
  modules: varchar("modules", { length: 255 }).notNull(), // z.B. "2,3,4" oder "1,2,3,4,5"
  role: varchar("role", { length: 16 }), // optional: "user" oder "trainer"
  maxUses: int("max_uses").notNull().default(1), // 1 = einmalig, 0 = unendlich
  usedCount: int("used_count").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  note: text("note"),
  createdByUserId: int("created_by_user_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AccessCode = typeof accessCodes.$inferSelect;
export type InsertAccessCode = typeof accessCodes.$inferInsert;

export const passwordResetTokens = mysqlTable("password_reset_tokens", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  token: varchar("token", { length: 64 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  usedAt: timestamp("usedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
