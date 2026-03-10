import { desc, eq, sql, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  chatConversations, 
  chatMessages, 
  whitelabelConfigs,
  InsertChatConversation, 
  InsertChatMessage,
  ChatConversation,
  ChatMessage,
  WhitelabelConfig,
  InsertWhitelabelConfig,
  videoTutorials,
  InsertVideoTutorial,
  VideoTutorial,
  videoProgress,
  InsertVideoProgress,
  VideoProgress,
  examSessions,
  examQuestions,
  examWeakTopics,
  InsertExamSession,
  InsertExamQuestion,
  InsertExamWeakTopic,
  ExamSession,
  ExamQuestion,
  ExamWeakTopic,
  // AZAV-Tabellen
  learningLogs,
  userSessions,
  activityHeartbeats,
  examAuditLog,
  feedback,
  complaints,
  consentLog,
  avvAgreements,
  LearningLog,
  InsertLearningLog,
  UserSession,
  InsertUserSession,
  InsertActivityHeartbeat,
  ExamAuditEntry,
  InsertExamAuditEntry,
  Feedback,
  InsertFeedback,
  Complaint,
  InsertComplaint,
  InsertConsentLogEntry,
  InsertAvvAgreement
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Liefert IMMER eine DB-Verbindung oder wirft einen Fehler.
// (Damit es später keine "db ist vielleicht null"-Fehler gibt.)
export async function getDb(): Promise<ReturnType<typeof drizzle>> {
  if (_db) return _db;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("[Database] DATABASE_URL fehlt. Bitte in Railway Variables setzen.");
  }

  _db = drizzle(url);
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserRole(openId: string, role: "user" | "admin" | "trainer"): Promise<void> {
  const db = await getDb();
  await db.update(users).set({ role }).where(eq(users.openId, openId));
}

// ============================================
// Chat Assistant Database Helpers
// ============================================

/**
 * Create a new chat conversation for a user
 */
export async function createChatConversation(
  userId: number,
  moduleContext?: string
): Promise<ChatConversation | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create conversation: database not available");
    return undefined;
  }

  const conversation: InsertChatConversation = {
    userId,
    moduleContext: moduleContext || null,
    title: "Neue Konversation",
  };

  const result = await db.insert(chatConversations).values(conversation);
  const insertId = Number(result[0].insertId);

  return {
    id: insertId,
    userId,
    moduleContext: moduleContext || null,
    title: "Neue Konversation",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Add a message to a conversation
 */
export async function addChatMessage(
  conversationId: number,
  role: "user" | "assistant" | "system",
  content: string
): Promise<ChatMessage | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot add message: database not available");
    return undefined;
  }

  const message: InsertChatMessage = {
    conversationId,
    role,
    content,
  };

  const result = await db.insert(chatMessages).values(message);
  const insertId = Number(result[0].insertId);

  return {
    id: insertId,
    conversationId,
    role,
    content,
    createdAt: new Date(),
  };
}

/**
 * Get all messages for a conversation
 */
export async function getConversationMessages(
  conversationId: number
): Promise<ChatMessage[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get messages: database not available");
    return [];
  }

  return db
    .select()
    .from(chatMessages)
    .where(eq(chatMessages.conversationId, conversationId))
    .orderBy(chatMessages.createdAt);
}

/**
 * Get all conversations for a user
 */
export async function getUserConversations(
  userId: number
): Promise<ChatConversation[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get conversations: database not available");
    return [];
  }

  return db
    .select()
    .from(chatConversations)
    .where(eq(chatConversations.userId, userId))
    .orderBy(desc(chatConversations.updatedAt));
}

/**
 * Update conversation title based on first message
 */
export async function updateConversationTitle(
  conversationId: number,
  title: string
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update conversation: database not available");
    return;
  }

  await db
    .update(chatConversations)
    .set({ title, updatedAt: new Date() })
    .where(eq(chatConversations.id, conversationId));
}

// ============================================
// White-Label Configuration Database Helpers
// ============================================

/**
 * Get all White-Label configurations
 */
export async function getAllWhitelabelConfigs(): Promise<WhitelabelConfig[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get whitelabel configs: database not available");
    return [];
  }

  return db
    .select()
    .from(whitelabelConfigs)
    .orderBy(desc(whitelabelConfigs.createdAt));
}

/**
 * Get a White-Label configuration by ID
 */
export async function getWhitelabelConfigById(
  id: number
): Promise<WhitelabelConfig | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get whitelabel config: database not available");
    return null;
  }

  const result = await db
    .select()
    .from(whitelabelConfigs)
    .where(eq(whitelabelConfigs.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Get a White-Label configuration by slug
 */
export async function getWhitelabelConfigBySlug(
  slug: string
): Promise<WhitelabelConfig | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get whitelabel config: database not available");
    return null;
  }

  const result = await db
    .select()
    .from(whitelabelConfigs)
    .where(eq(whitelabelConfigs.slug, slug))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Create a new White-Label configuration
 */
export async function createWhitelabelConfig(
  config: InsertWhitelabelConfig
): Promise<WhitelabelConfig | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create whitelabel config: database not available");
    return undefined;
  }

  const result = await db.insert(whitelabelConfigs).values(config);
  const insertId = Number(result[0].insertId);

  return {
    ...config,
    id: insertId,
    logoUrl: config.logoUrl ?? null,
    faviconUrl: config.faviconUrl ?? null,
    primaryColor: config.primaryColor ?? "#2563eb",
    secondaryColor: config.secondaryColor ?? "#1e293b",
    accentColor: config.accentColor ?? "#3b82f6",
    sidebarColor: config.sidebarColor ?? "#0f172a",
    welcomeText: config.welcomeText ?? null,
    footerText: config.footerText ?? null,
    contactEmail: config.contactEmail ?? null,
    contactPhone: config.contactPhone ?? null,
    websiteUrl: config.websiteUrl ?? null,
    azavEnabled: config.azavEnabled ?? false,
    azavCertNumber: config.azavCertNumber ?? null,
    azavValidUntil: config.azavValidUntil ?? null,
    enabledModules: config.enabledModules ?? "1,2,3,4,5",
    maxUsers: config.maxUsers ?? 100,
    isActive: config.isActive ?? true,
    adminUserId: config.adminUserId ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Update a White-Label configuration
 */
export async function updateWhitelabelConfig(
  id: number,
  updates: Partial<InsertWhitelabelConfig>
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update whitelabel config: database not available");
    return;
  }

  await db
    .update(whitelabelConfigs)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(whitelabelConfigs.id, id));
}

/**
 * Delete a White-Label configuration
 */
export async function deleteWhitelabelConfig(
  id: number
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete whitelabel config: database not available");
    return;
  }

  await db
    .delete(whitelabelConfigs)
    .where(eq(whitelabelConfigs.id, id));
}

/**
 * Get the White-Label config for a specific user (via tenantId)
 */
export async function getWhitelabelConfigForUser(
  userId: number
): Promise<WhitelabelConfig | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get whitelabel config for user: database not available");
    return null;
  }

  // First get the user's tenantId
  const userResult = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (userResult.length === 0 || !userResult[0].tenantId) {
    return null;
  }

  const config = await getWhitelabelConfigById(userResult[0].tenantId);
  return config ?? null;
}

/**
 * Assign a user to a White-Label tenant
 */
export async function assignUserToTenant(
  userId: number,
  tenantId: number | null
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot assign user to tenant: database not available");
    return;
  }

  await db
    .update(users)
    .set({ tenantId })
    .where(eq(users.id, userId));
}

/**
 * Get all users for a specific tenant
 */
export async function getUsersByTenantId(
  tenantId: number
): Promise<typeof users.$inferSelect[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get users by tenant: database not available");
    return [];
  }

  return db
    .select()
    .from(users)
    .where(eq(users.tenantId, tenantId));
}


// ============================================
// Video Tutorial Functions
// ============================================

/**
 * Get all video tutorials
 */
export async function getAllVideoTutorials(): Promise<VideoTutorial[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(videoTutorials)
      .orderBy(videoTutorials.moduleId, videoTutorials.dayNumber, videoTutorials.displayOrder);
  } catch (error) {
    console.error("[Database] Error getting all video tutorials:", error);
    return [];
  }
}

/**
 * Get video tutorials by module
 */
export async function getVideoTutorialsByModule(moduleId: number): Promise<VideoTutorial[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(videoTutorials)
      .where(eq(videoTutorials.moduleId, moduleId))
      .orderBy(videoTutorials.dayNumber, videoTutorials.displayOrder);
  } catch (error) {
    console.error("[Database] Error getting video tutorials by module:", error);
    return [];
  }
}

/**
 * Get video tutorials by day
 */
export async function getVideoTutorialsByDay(moduleId: number, dayNumber: number): Promise<VideoTutorial[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(videoTutorials)
      .where(
        sql`${videoTutorials.moduleId} = ${moduleId} AND ${videoTutorials.dayNumber} = ${dayNumber}`
      )
      .orderBy(videoTutorials.displayOrder);
  } catch (error) {
    console.error("[Database] Error getting video tutorials by day:", error);
    return [];
  }
}

/**
 * Get video tutorial by ID
 */
export async function getVideoTutorialById(id: number): Promise<VideoTutorial | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(videoTutorials)
      .where(eq(videoTutorials.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error getting video tutorial by ID:", error);
    return null;
  }
}

/**
 * Create video tutorial
 */
export async function createVideoTutorial(data: InsertVideoTutorial): Promise<VideoTutorial | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.insert(videoTutorials).values(data);

    const result = await db
      .select()
      .from(videoTutorials)
      .where(eq(videoTutorials.videoUrl, data.videoUrl))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error creating video tutorial:", error);
    return null;
  }
}

/**
 * Update video tutorial
 */
export async function updateVideoTutorial(id: number, data: Partial<InsertVideoTutorial>): Promise<VideoTutorial | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db
      .update(videoTutorials)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(videoTutorials.id, id));

    return await getVideoTutorialById(id);
  } catch (error) {
    console.error("[Database] Error updating video tutorial:", error);
    return null;
  }
}

/**
 * Delete video tutorial
 */
export async function deleteVideoTutorial(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.delete(videoTutorials).where(eq(videoTutorials.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Error deleting video tutorial:", error);
    return false;
  }
}

/**
 * Get user's video progress
 */
export async function getUserVideoProgress(userId: number, videoId: number): Promise<VideoProgress | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(videoProgress)
      .where(
        sql`${videoProgress.userId} = ${userId} AND ${videoProgress.videoId} = ${videoId}`
      )
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error getting user video progress:", error);
    return null;
  }
}

/**
 * Update user's video progress
 */
export async function updateVideoProgress(
  userId: number,
  videoId: number,
  currentPosition: number,
  percentageWatched: number
): Promise<VideoProgress | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const existing = await getUserVideoProgress(userId, videoId);
    const isCompleted = percentageWatched >= 90;

    if (existing) {
      // Update existing progress
      await db
        .update(videoProgress)
        .set({
          currentPosition,
          percentageWatched,
          isCompleted,
          lastWatchedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(videoProgress.id, existing.id));

      return await getUserVideoProgress(userId, videoId);
    } else {
      // Create new progress
      await db.insert(videoProgress).values({
        userId,
        videoId,
        currentPosition,
        percentageWatched,
        isCompleted,
        lastWatchedAt: new Date(),
      });

      return await getUserVideoProgress(userId, videoId);
    }
  } catch (error) {
    console.error("[Database] Error updating video progress:", error);
    return null;
  }
}

/**
 * Get all video progress for a user
 */
export async function getAllUserVideoProgress(userId: number): Promise<VideoProgress[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(videoProgress)
      .where(eq(videoProgress.userId, userId))
      .orderBy(desc(videoProgress.lastWatchedAt));
  } catch (error) {
    console.error("[Database] Error getting all user video progress:", error);
    return [];
  }
}


// ============================================
// Exam System Functions
// ============================================

/**
 * Create a new exam session
 */
export async function createExamSession(
  userId: number, 
  moduleId: number, 
  totalQuestions: number = 50, 
  timeLimit: number = 30 * 60, 
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  isIHKMode: boolean = false
): Promise<ExamSession | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  try {
    const session: InsertExamSession = {
      userId,
      moduleId,
      totalQuestions,
      status: "in_progress",
      isIHKMode,
      difficulty,
      timeLimit
    };

    const result = await db.insert(examSessions).values(session);
    const insertId = Number(result[0].insertId);

    return {
      id: insertId,
      userId,
      moduleId,
      totalQuestions,
      correctAnswers: 0,
      score: 0,
      timeSpent: 0,
      timeLimit,
      difficulty,
      isIHKMode,
      status: "in_progress" as const,
      startedAt: new Date(),
      completedAt: null,
      createdAt: new Date(),
    };
  } catch (error) {
    console.error("[Database] Error creating exam session:", error);
    return undefined;
  }
}

/**
 * Get exam session by ID
 */
export async function getExamSession(sessionId: number): Promise<ExamSession | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(examSessions)
      .where(eq(examSessions.id, sessionId))
      .limit(1);

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Error getting exam session:", error);
    return null;
  }
}

/**
 * Get all exam sessions for a user
 */
export async function getUserExamSessions(userId: number, moduleId?: number): Promise<ExamSession[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    if (moduleId) {
      return await db
        .select()
        .from(examSessions)
        .where(and(eq(examSessions.userId, userId), eq(examSessions.moduleId, moduleId)))
        .orderBy(desc(examSessions.createdAt));
    }
    return await db
      .select()
      .from(examSessions)
      .where(eq(examSessions.userId, userId))
      .orderBy(desc(examSessions.createdAt));
  } catch (error) {
    console.error("[Database] Error getting user exam sessions:", error);
    return [];
  }
}

/**
 * Save an exam question
 */
export async function saveExamQuestion(questionData: InsertExamQuestion): Promise<ExamQuestion | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  try {
    const result = await db.insert(examQuestions).values(questionData);
    const insertId = Number(result[0].insertId);

    return {
      ...questionData,
      id: insertId,
      userAnswer: questionData.userAnswer ?? null,
      isCorrect: questionData.isCorrect ?? null,
      dayId: questionData.dayId ?? null,
      topic: questionData.topic ?? null,
      difficulty: questionData.difficulty ?? "medium",
      feedback: questionData.feedback ?? null,
      createdAt: new Date(),
    };
  } catch (error) {
    console.error("[Database] Error saving exam question:", error);
    return undefined;
  }
}

/**
 * Get all questions for an exam session
 */
export async function getExamQuestions(sessionId: number): Promise<ExamQuestion[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(examQuestions)
      .where(eq(examQuestions.sessionId, sessionId))
      .orderBy(examQuestions.questionNumber);
  } catch (error) {
    console.error("[Database] Error getting exam questions:", error);
    return [];
  }
}

/**
 * Get a single exam question by its ID (für submitAnswer)
 * Behebt Bug: submitAnswer hat fälschlicherweise getExamQuestions(questionId) aufgerufen
 */
export async function getExamQuestionById(questionId: number): Promise<ExamQuestion | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  try {
    const result = await db
      .select()
      .from(examQuestions)
      .where(eq(examQuestions.id, questionId))
      .limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Error getting exam question by ID:", error);
    return undefined;
  }
}

/**
 * Update an exam question with user answer
 */
export async function updateExamQuestion(
  questionId: number,
  userAnswer: string,
  isCorrect: boolean,
  feedback?: string
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    await db
      .update(examQuestions)
      .set({ userAnswer, isCorrect, feedback: feedback ?? null })
      .where(eq(examQuestions.id, questionId));
  } catch (error) {
    console.error("[Database] Error updating exam question:", error);
  }
}

/**
 * Complete an exam session
 */
export async function completeExamSession(
  sessionId: number,
  correctAnswers: number,
  score: number,
  timeSpent: number
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    await db
      .update(examSessions)
      .set({
        correctAnswers,
        score,
        timeSpent,
        status: "completed",
        completedAt: new Date(),
      })
      .where(eq(examSessions.id, sessionId));
  } catch (error) {
    console.error("[Database] Error completing exam session:", error);
  }
}

/**
 * Get weak topics for a user
 */
export async function getWeakTopics(userId: number, moduleId?: number): Promise<ExamWeakTopic[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    if (moduleId) {
      return await db
        .select()
        .from(examWeakTopics)
        .where(and(eq(examWeakTopics.userId, userId), eq(examWeakTopics.moduleId, moduleId)))
        .orderBy(desc(examWeakTopics.incorrectCount));
    }
    return await db
      .select()
      .from(examWeakTopics)
      .where(eq(examWeakTopics.userId, userId))
      .orderBy(desc(examWeakTopics.incorrectCount));
  } catch (error) {
    console.error("[Database] Error getting weak topics:", error);
    return [];
  }
}

/**
 * Update or create a weak topic entry
 */
export async function updateWeakTopic(userId: number, moduleId: number, topic: string): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    const existing = await db
      .select()
      .from(examWeakTopics)
      .where(
        and(
          eq(examWeakTopics.userId, userId),
          eq(examWeakTopics.moduleId, moduleId),
          eq(examWeakTopics.topic, topic)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(examWeakTopics)
        .set({
          incorrectCount: existing[0].incorrectCount + 1,
          lastEncountered: new Date(),
        })
        .where(eq(examWeakTopics.id, existing[0].id));
    } else {
      await db.insert(examWeakTopics).values({
        userId,
        moduleId,
        topic,
        incorrectCount: 1,
      });
    }
  } catch (error) {
    console.error("[Database] Error updating weak topic:", error);
  }
}

// ============================================================================
// AZAV-COMPLIANCE DATENBANKFUNKTIONEN
// ============================================================================

// ── Learning Logs ────────────────────────────────────────────────────────────

/** Lerneinheit öffnen – neuen Log-Eintrag anlegen */
export async function openLearningLog(
  userId: number, moduleId: number, dayId: number
): Promise<number | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const result = await db.insert(learningLogs).values({
      userId, moduleId, dayId, completed: false, heartbeatCount: 0
    });
    return Number((result as any).insertId ?? 0);
  } catch (error) {
    console.error("[DB] openLearningLog error:", error);
    return null;
  }
}

/** Lerneinheit schließen – Dauer und Abschluss setzen */
export async function closeLearningLog(
  logId: number, durationSeconds: number, completed: boolean
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.update(learningLogs)
      .set({ closedAt: new Date(), durationSeconds, completed })
      .where(eq(learningLogs.id, logId));
  } catch (error) {
    console.error("[DB] closeLearningLog error:", error);
  }
}

/** Heartbeat-Zähler erhöhen (zeigt aktive Lernzeit) */
export async function incrementHeartbeat(logId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.update(learningLogs)
      .set({ heartbeatCount: sql`${learningLogs.heartbeatCount} + 1` })
      .where(eq(learningLogs.id, logId));
  } catch (error) {
    console.error("[DB] incrementHeartbeat error:", error);
  }
}

/** Abgeschlossene Lerntage eines Nutzers abrufen */
export async function getCompletedDays(
  userId: number, moduleId?: number
): Promise<{ moduleId: number; dayId: number; totalSeconds: number }[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    const conditions = moduleId
      ? and(eq(learningLogs.userId, userId), eq(learningLogs.moduleId, moduleId), eq(learningLogs.completed, true))
      : and(eq(learningLogs.userId, userId), eq(learningLogs.completed, true));
    const rows = await db.select().from(learningLogs).where(conditions);
    // Aggregiere pro Modul/Tag (mehrere Sessions möglich)
    const map = new Map<string, { moduleId: number; dayId: number; totalSeconds: number }>();
    for (const row of rows) {
      const key = `${row.moduleId}_${row.dayId}`;
      const existing = map.get(key);
      if (existing) {
        existing.totalSeconds += row.durationSeconds;
      } else {
        map.set(key, { moduleId: row.moduleId, dayId: row.dayId, totalSeconds: row.durationSeconds });
      }
    }
    return Array.from(map.values());
  } catch (error) {
    console.error("[DB] getCompletedDays error:", error);
    return [];
  }
}

// ── Activity Heartbeats ───────────────────────────────────────────────────────

/** Heartbeat-Signal speichern (alle 60 Sek vom Browser) */
export async function saveHeartbeat(
  userId: number, moduleId: number, dayId: number
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(activityHeartbeats).values({ userId, moduleId, dayId });
    // Auch learningLogs aktualisieren falls offen
    const openLog = await db.select().from(learningLogs)
      .where(and(
        eq(learningLogs.userId, userId),
        eq(learningLogs.moduleId, moduleId),
        eq(learningLogs.dayId, dayId)
      ))
      .orderBy(desc(learningLogs.openedAt))
      .limit(1);
    if (openLog.length > 0 && !openLog[0].closedAt) {
      await db.update(learningLogs)
        .set({ heartbeatCount: sql`${learningLogs.heartbeatCount} + 1` })
        .where(eq(learningLogs.id, openLog[0].id));
    }
  } catch (error) {
    console.error("[DB] saveHeartbeat error:", error);
  }
}

// ── Exam Audit Log ────────────────────────────────────────────────────────────

/** Prüfungsantwort unveränderlich ins Audit-Log schreiben */
export async function writeExamAuditLog(
  entry: InsertExamAuditEntry
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(examAuditLog).values(entry);
  } catch (error) {
    console.error("[DB] writeExamAuditLog error:", error);
  }
}

/** Audit-Log für eine Session abrufen (Admin-Export) */
export async function getExamAuditLog(sessionId: number): Promise<ExamAuditEntry[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(examAuditLog)
      .where(eq(examAuditLog.sessionId, sessionId));
  } catch (error) {
    console.error("[DB] getExamAuditLog error:", error);
    return [];
  }
}

// ── Feedback ──────────────────────────────────────────────────────────────────

/** Nutzerfeedback speichern */
export async function saveFeedback(data: InsertFeedback): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(feedback).values(data);
  } catch (error) {
    console.error("[DB] saveFeedback error:", error);
  }
}

/** Durchschnittsbewertung pro Modul (für Admin-Dashboard) */
export async function getFeedbackStats(): Promise<
  { moduleId: number; avgRating: number; count: number }[]
> {
  const db = await getDb();
  if (!db) return [];
  try {
    const rows = await db.select({
      moduleId: feedback.moduleId,
      avgRating: sql<number>`AVG(${feedback.rating})`,
      count: sql<number>`COUNT(*)`,
    }).from(feedback).groupBy(feedback.moduleId);
    return rows.map(r => ({
      moduleId: r.moduleId,
      avgRating: Math.round(Number(r.avgRating) * 10) / 10,
      count: Number(r.count),
    }));
  } catch (error) {
    console.error("[DB] getFeedbackStats error:", error);
    return [];
  }
}

// ── Complaints ────────────────────────────────────────────────────────────────

/** Beschwerde einreichen */
export async function createComplaint(data: InsertComplaint): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(complaints).values(data);
  } catch (error) {
    console.error("[DB] createComplaint error:", error);
  }
}

/** Alle offenen Beschwerden (Admin) */
export async function getOpenComplaints(): Promise<Complaint[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(complaints)
      .where(eq(complaints.status, "open"))
      .orderBy(desc(complaints.createdAt));
  } catch (error) {
    console.error("[DB] getOpenComplaints error:", error);
    return [];
  }
}

/** Beschwerde-Status aktualisieren (Admin) */
export async function updateComplaintStatus(
  id: number, status: Complaint["status"], adminNote?: string
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.update(complaints)
      .set({
        status,
        adminNote: adminNote ?? undefined,
        resolvedAt: status === "resolved" || status === "closed" ? new Date() : undefined,
      })
      .where(eq(complaints.id, id));
  } catch (error) {
    console.error("[DB] updateComplaintStatus error:", error);
  }
}

// ── Consent Log ───────────────────────────────────────────────────────────────

/** Einwilligung protokollieren (DSGVO Art. 7) */
export async function logConsent(data: InsertConsentLogEntry): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(consentLog).values(data);
  } catch (error) {
    console.error("[DB] logConsent error:", error);
  }
}

/** Einwilligungen eines Nutzers abrufen */
export async function getUserConsents(userId: number) {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(consentLog)
      .where(eq(consentLog.userId, userId))
      .orderBy(desc(consentLog.givenAt));
  } catch (error) {
    console.error("[DB] getUserConsents error:", error);
    return [];
  }
}

// ── AVV Agreements ────────────────────────────────────────────────────────────

/** AVV für Mandanten signieren */
export async function signAvvAgreement(data: InsertAvvAgreement): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(avvAgreements).values(data);
  } catch (error) {
    console.error("[DB] signAvvAgreement error:", error);
  }
}

/** Prüfen ob Mandant AVV unterschrieben hat */
export async function hasSignedAvv(tenantId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    const result = await db.select().from(avvAgreements)
      .where(eq(avvAgreements.tenantId, tenantId))
      .limit(1);
    return result.length > 0;
  } catch (error) {
    console.error("[DB] hasSignedAvv error:", error);
    return false;
  }
}

// ── Lokales Auth – Passwort-Hashes ───────────────────────────────────────────

/** Anzahl aller Nutzer (um ersten Admin zu erkennen) */
export async function getUserCount(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  try {
    const result = await db.select({ count: sql<number>`COUNT(*)` }).from(users);
    return Number(result[0]?.count ?? 0);
  } catch {
    return 0;
  }
}

/** Passwort-Hash in MySQL speichern (persistent, kein ephemeral filesystem) */
export async function savePasswordHash(openId: string, hash: string, salt: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.error("[DB] savePasswordHash: keine DB-Verbindung");
    return;
  }
  try {
    const { authCredentials } = await import("../drizzle/schema");
    await db.insert(authCredentials)
      .values({ openId, hash, salt })
      .onDuplicateKeyUpdate({ set: { hash, salt } });
  } catch (error) {
    console.error("[DB] savePasswordHash error:", error);
  }
}
/** Passwort-Hash aus MySQL laden */
export async function getPasswordHash(openId: string): Promise<{ hash: string; salt: string } | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const { authCredentials } = await import("../drizzle/schema");
    const result = await db.select()
      .from(authCredentials)
      .where(eq(authCredentials.openId, openId))
      .limit(1);
    return result.length > 0 ? { hash: result[0].hash, salt: result[0].salt } : null;
  } catch (error) {
    console.error("[DB] getPasswordHash error:", error);
    return null;
  }
}
/** Nutzer-Rolle setzen */
export async function setUserRole(openId: string, role: "user" | "admin" | "trainer"): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.update(users).set({ role }).where(eq(users.openId, openId));
  } catch (error) {
    console.error("[DB] setUserRole error:", error);
  }
}

/** Letzten Login aktualisieren */
export async function updateLastSignedIn(openId: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.openId, openId));
  } catch (error) {
    console.error("[DB] updateLastSignedIn error:", error);
  }
}

export async function updateUserEnabledModules(userId: number, moduleIds: number[]): Promise<void> {
  const db = await getDb();
  if (!db) return;
  const result = await db.select({ enabledModules: users.enabledModules }).from(users).where(eq(users.id, userId)).limit(1);
  const current = result[0]?.enabledModules ?? "1";
  const currentList = current.split(",").map((s:string)=>parseInt(s.trim(),10)).filter((n:number)=>!isNaN(n));
  const merged = Array.from(new Set([...currentList,...moduleIds])).sort((a,b)=>a-b);
  await db.update(users).set({ enabledModules: merged.join(",") }).where(eq(users.id, userId));
}

export async function redeemPresentationCode(code: string): Promise<{success: boolean; enabledModules?: string; message: string;}> {
  const db = await getDb();
  if (!db) return { success: false, message: "Datenbankfehler" };
  const rows = await db.execute(`SELECT * FROM presentation_codes WHERE code = ? AND isActive = true LIMIT 1`, [code]) as any;
  const record = Array.isArray(rows) ? rows[0] : (rows as any).rows?.[0];
  if (!record) return { success: false, message: "Code nicht gefunden oder deaktiviert" };
  if (record.expiresAt && new Date(record.expiresAt) < new Date()) return { success: false, message: "Dieser Code ist abgelaufen" };
  if (record.maxUsage && record.usageCount >= record.maxUsage) return { success: false, message: "Maximale Nutzungsanzahl erreicht" };
  await db.execute(`UPDATE presentation_codes SET usageCount = usageCount + 1 WHERE id = ?`, [record.id]);
  return { success: true, enabledModules: record.enabledModules, message: "Code gültig" };
}

export async function listPresentationCodes(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.execute(`SELECT * FROM presentation_codes ORDER BY createdAt DESC`) as any;
  return Array.isArray(rows) ? rows : (rows as any).rows ?? [];
}

export async function createPresentationCode(code: string, label: string, modules: string, expiresAt: Date | null, maxUsage: number | null): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.execute(`INSERT INTO presentation_codes (code, label, enabledModules, expiresAt, maxUsage) VALUES (?, ?, ?, ?, ?)`, [code, label, modules, expiresAt, maxUsage]);
}

export async function deactivatePresentationCode(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.execute(`UPDATE presentation_codes SET isActive = false WHERE id = ?`, [id]);
}
