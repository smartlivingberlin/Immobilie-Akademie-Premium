import { COOKIE_NAME } from "@shared/const";
import { logger } from "./_core/logger";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { questionBank, users } from "../drizzle/schema";
import { 
  createChatConversation, 
  addChatMessage, 
  getConversationMessages,
  getUserConversations,
  updateConversationTitle,
  getAllWhitelabelConfigs,
  getWhitelabelConfigById,
  getWhitelabelConfigBySlug,
  createWhitelabelConfig,
  updateWhitelabelConfig,
  deleteWhitelabelConfig,
  getWhitelabelConfigForUser,
  assignUserToTenant,
  getUsersByTenantId,
  getDb,
} from "./db";
import { eq } from "drizzle-orm";
import { invokeLLM } from "./_core/llm";
import { storagePut } from "./storage";
import { videoRouter } from "./videoRouter";
import { openQuestionsRouter } from "./openQuestionsRouter";
import { examRouter } from "./examRouter";
import { pdfRouter } from "./pdfRouter";
import { certificateRouter } from "./certificateRouter";
import { quizRouter } from "./quizRouter";
import { azavRouter } from "./azavRouter";

// Admin-only middleware
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Nur Administratoren haben Zugriff auf diese Funktion.' });
  }
  return next({ ctx });
});

function safeJsonParse<T>(raw: unknown, fallback: T): T {
  if (typeof raw !== "string") return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch { /* JSON parse fehlgeschlagen — versuche Regex */ }

  const match = raw.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]) as T;
    } catch { /* zweiter Parse-Versuch fehlgeschlagen — Fallback */ }
  }

  return fallback;
}

/**
 * Haupt-tRPC-Router der Anwendung.
 * Main tRPC router for the application.
 *
 * Aggregiert alle Sub-Router für verschiedene Funktionsbereiche.
 * Aggregates all sub-routers for different functional areas.
 */
export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  videos: videoRouter,
  exam: examRouter,
  openQuestions: openQuestionsRouter,
  pdf: pdfRouter,
  certificate: certificateRouter,
  quiz: quizRouter,
  azav: azavRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    completeOnboarding: protectedProcedure
      .input(z.object({
        learningGoal: z.string(),
        dailyMinutes: z.number(),
        preferredTime: z.string(),
        experienceLevel: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user?.id) throw new TRPCError({ code: 'UNAUTHORIZED' });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        await db.update(users)
          .set({
            onboardingCompleted: 1,
            learningGoal: input.learningGoal,
            dailyMinutes: input.dailyMinutes,
            preferredTime: input.preferredTime,
            experienceLevel: input.experienceLevel,
          })
          .where(eq(users.id, ctx.user.id));
        return { success: true };
      }),

    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ============================================
  // White-Label Administration Router
  // ============================================
  whitelabel: router({
    // Get all White-Label configurations (admin only)
    list: adminProcedure.query(async () => {
      return getAllWhitelabelConfigs();
    }),

    // Get a specific White-Label configuration by ID
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const config = await getWhitelabelConfigById(input.id);
        if (!config) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'White-Label-Konfiguration nicht gefunden.' });
        }
        return config;
      }),

    // Get White-Label config for current user's tenant (any authenticated user)
    myTenant: protectedProcedure.query(async ({ ctx }) => {
      const config = await getWhitelabelConfigForUser(ctx.user.id);
      return config ?? null;
    }),

    // Create a new White-Label configuration (admin only)
    create: adminProcedure
      .input(z.object({
        slug: z.string().min(2).max(64).regex(/^[a-z0-9-]+$/, 'Slug darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten.'),
        companyName: z.string().min(1).max(255),
        primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        secondaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        sidebarColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        welcomeText: z.string().max(2000).optional(),
        footerText: z.string().max(500).optional(),
        contactEmail: z.string().email().optional(),
        contactPhone: z.string().max(50).optional(),
        websiteUrl: z.string().url().optional(),
        azavEnabled: z.boolean().optional(),
        azavCertNumber: z.string().max(100).optional(),
        enabledModules: z.string().optional(),
        maxUsers: z.number().min(1).max(10000).optional(),
      }))
      .mutation(async ({ input }) => {
        // Check if slug is already taken
        const existing = await getWhitelabelConfigBySlug(input.slug);
        if (existing) {
          throw new TRPCError({ code: 'CONFLICT', message: 'Dieser Slug ist bereits vergeben.' });
        }

        return createWhitelabelConfig({
          slug: input.slug,
          companyName: input.companyName,
          primaryColor: input.primaryColor,
          secondaryColor: input.secondaryColor,
          accentColor: input.accentColor,
          sidebarColor: input.sidebarColor,
          welcomeText: input.welcomeText,
          footerText: input.footerText,
          contactEmail: input.contactEmail,
          contactPhone: input.contactPhone,
          websiteUrl: input.websiteUrl,
          azavEnabled: input.azavEnabled,
          azavCertNumber: input.azavCertNumber,
          enabledModules: input.enabledModules,
          maxUsers: input.maxUsers,
        });
      }),

    // Update a White-Label configuration (admin only)
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        companyName: z.string().min(1).max(255).optional(),
        primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        secondaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        sidebarColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        welcomeText: z.string().max(2000).optional(),
        footerText: z.string().max(500).optional(),
        contactEmail: z.string().email().optional(),
        contactPhone: z.string().max(50).optional(),
        websiteUrl: z.string().url().optional(),
        azavEnabled: z.boolean().optional(),
        azavCertNumber: z.string().max(100).optional(),
        enabledModules: z.string().optional(),
        maxUsers: z.number().min(1).max(10000).optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        const existing = await getWhitelabelConfigById(id);
        if (!existing) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'White-Label-Konfiguration nicht gefunden.' });
        }

        await updateWhitelabelConfig(id, updates);
        return getWhitelabelConfigById(id);
      }),

    // Upload logo for a White-Label tenant (admin only)
    uploadLogo: adminProcedure
      .input(z.object({
        id: z.number(),
        logoBase64: z.string(),
        mimeType: z.string(),
        fileName: z.string(),
      }))
      .mutation(async ({ input }) => {
        const existing = await getWhitelabelConfigById(input.id);
        if (!existing) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'White-Label-Konfiguration nicht gefunden.' });
        }

        const buffer = Buffer.from(input.logoBase64, 'base64');
        const randomSuffix = Math.random().toString(36).substring(2, 10);
        const fileKey = `whitelabel/${existing.slug}/logo-${randomSuffix}-${input.fileName}`;
        const logoUrl = await storagePut(fileKey, buffer, input.mimeType);

        await updateWhitelabelConfig(input.id, { logoUrl });
        return { logoUrl };
      }),

    // Upload favicon for a White-Label tenant (admin only)
    uploadFavicon: adminProcedure
      .input(z.object({
        id: z.number(),
        faviconBase64: z.string(),
        mimeType: z.string(),
        fileName: z.string(),
      }))
      .mutation(async ({ input }) => {
        const existing = await getWhitelabelConfigById(input.id);
        if (!existing) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'White-Label-Konfiguration nicht gefunden.' });
        }

        const buffer = Buffer.from(input.faviconBase64, 'base64');
        const randomSuffix = Math.random().toString(36).substring(2, 10);
        const fileKey = `whitelabel/${existing.slug}/favicon-${randomSuffix}-${input.fileName}`;
        const faviconUrl = await storagePut(fileKey, buffer, input.mimeType);

        await updateWhitelabelConfig(input.id, { faviconUrl });
        return { faviconUrl };
      }),

    // Delete a White-Label configuration (admin only)
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const existing = await getWhitelabelConfigById(input.id);
        if (!existing) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'White-Label-Konfiguration nicht gefunden.' });
        }

        await deleteWhitelabelConfig(input.id);
        return { success: true };
      }),

    // Assign a user to a tenant (admin only)
    assignUser: adminProcedure
      .input(z.object({
        userId: z.number(),
        tenantId: z.number().nullable(),
      }))
      .mutation(async ({ input }) => {
        if (input.tenantId !== null) {
          const tenant = await getWhitelabelConfigById(input.tenantId);
          if (!tenant) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Tenant nicht gefunden.' });
          }
        }
        await assignUserToTenant(input.userId, input.tenantId);
        return { success: true };
      }),

    // Get users for a specific tenant (admin only)
    getTenantUsers: adminProcedure
      .input(z.object({ tenantId: z.number() }))
      .query(async ({ input }) => {
        return getUsersByTenantId(input.tenantId);
      }),
  }),

  // AI Assistant Router
  aiAssistant: router({
    // Create a new conversation
    createConversation: protectedProcedure
      .input(z.object({
        moduleContext: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const conversation = await createChatConversation(
          ctx.user.id,
          input.moduleContext
        );
        return conversation;
      }),

    // Get all conversations for the current user
    getConversations: protectedProcedure
      .query(async ({ ctx }) => {
        return getUserConversations(ctx.user.id);
      }),

    // Get messages for a specific conversation
    getMessages: protectedProcedure
      .input(z.object({
        conversationId: z.number(),
      }))
      .query(async ({ input }) => {
        return getConversationMessages(input.conversationId);
      }),

    // Send a message and get AI response
    sendMessage: protectedProcedure
      .input(z.object({
        conversationId: z.number(),
        message: z.string(),
        moduleContext: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Save user message
        await addChatMessage(input.conversationId, "user", input.message);

        // Get conversation history
        const history = await getConversationMessages(input.conversationId);

        // Build enhanced system prompt for the AI tutor
        const systemPrompt = `Du bist ein präziser Immobilien-Ausbildungsassistent für die Immobilien-Akademie. Du hilfst Studierenden bei der Vorbereitung auf die Sachkundeprüfung nach §34c GewO.

**Aktueller Kurskontext:** ${input.moduleContext || "Allgemeine Immobilienausbildung"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 PFLICHTREGELN — OHNE AUSNAHME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**REGEL 1 — Nur belegbare Fakten:**
Du antwortest NUR auf Basis verifizierbarer, aktuell gültiger Quellen.
Wenn du eine Aussage nicht mit einer konkreten Quelle belegen kannst: NICHT antworten.
Stattdessen schreibe: "⚠️ Dazu liegen mir keine ausreichend belegbaren Informationen vor. Bitte prüfe direkt bei der zuständigen Stelle."

**REGEL 2 — Jede Antwort enthält einen Quellenblock (PFLICHT):**
Jede inhaltliche Aussage MUSS mit diesem Block abgeschlossen werden:

📚 **Quellen & Links:**
- [Quellenname] — [Direktlink zur aktuellen offiziellen Seite]

Akzeptable offizielle Quellen mit Links:
- §34c GewO → https://www.gesetze-im-internet.de/gewo/__34c.html
- §34i GewO → https://www.gesetze-im-internet.de/gewo/__34i.html
- BGB Mietrecht → https://www.gesetze-im-internet.de/bgb/__535.html
- WEG → https://www.gesetze-im-internet.de/weg/
- MaBV → https://www.gesetze-im-internet.de/mabv/
- ImmoWertV 2021 → https://www.gesetze-im-internet.de/immowertv_2021/
- IHK Deutschland → https://www.dihk.de
- BGH-Urteile → https://juris.bundesgerichtshof.de
- BaFin → https://www.bafin.de
- Bundesanzeiger → https://www.bundesanzeiger.de
- Notarverband → https://www.dnoti.de
- Verbraucherzentrale → https://www.verbraucherzentrale.de

**REGEL 3 — Aktualität kennzeichnen:**
Wenn eine Regelung sich in den letzten 2 Jahren geändert hat oder du unsicher bist:
Schreibe: "⏰ Stand: [Jahr] — Bitte aktuelle Version unter [Link] prüfen."

**REGEL 4 — Rechtliche Grenzen:**
Du bist kein Rechtsanwalt. Bei konkreten Rechtsfragen schreibe immer:
"⚖️ Hinweis: Diese Information ist allgemeiner Natur und ersetzt keine Rechtsberatung. Für deinen konkreten Fall wende dich an einen Fachanwalt für Immobilienrecht oder deine zuständige IHK."

**REGEL 5 — Keine erfundenen Quellen:**
Du erfindest KEINE Paragrafennummern, KEINE BGH-Aktenzeichen, KEINE Behörden-Links.
BGH-Urteile nur nennen wenn: vollständiges Aktenzeichen bekannt + Link zu juris.bundesgerichtshof.de möglich.
Bei Unsicherheit über Aktenzeichen: weglassen und auf juris.bundesgerichtshof.de verweisen.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 ANTWORT-STRUKTUR (immer diese Reihenfolge)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. **Direkte Antwort** (2-4 Sätze, präzise)
2. **Gesetzliche Grundlage** (nur wenn mit Link belegbar)
3. **Praxisbeispiel** (optional, nur wenn konkret hilfreich)
4. **🎯 Merksatz für die Prüfung** (1 prägnanter Satz)
5. **📚 Quellen & Links** (PFLICHT — in jeder Antwort)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 FACHBEREICHE DIESES KURSES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Maklerrecht & §34c GewO
- WEG-Verwaltung & Mietverwaltung
- Immobilienbewertung (ImmoWertV 2021)
- Finanzierung & §34i GewO
- Mietrecht (BGB §§ 535 ff.)

Fragen außerhalb dieser Bereiche: "Das liegt außerhalb meines Fachbereichs für diesen Kurs. Bitte wende dich an [zuständige Stelle]."`;

        // Prepare messages for LLM
        const messages = [
          { role: "system" as const, content: systemPrompt },
          ...history
            .filter(m => m.role !== "system")
            .map(m => ({
              role: m.role as "user" | "assistant",
              content: m.content,
            })),
        ];

        // Get AI response
        const aiResponse = await invokeLLM({ messages, maxTokens: 2000 });
        const rawContent = aiResponse.choices[0]?.message?.content;
        const assistantMessage = typeof rawContent === "string" 
          ? rawContent 
          : "Entschuldigung, ich konnte keine Antwort generieren.";

        // Save AI response
        await addChatMessage(input.conversationId, "assistant", assistantMessage);

        // Update conversation title if this is the first user message
        if (history.length === 1) {
          const title = input.message.slice(0, 50) + (input.message.length > 50 ? "..." : "");
          await updateConversationTitle(input.conversationId, title);
        }

        return {
          message: assistantMessage,
          conversationId: input.conversationId,
        };
      }),

    // Evaluate quiz answer using AI
    evaluateQuizAnswer: protectedProcedure
      .input(z.object({
        caseId: z.string(),
        userAnswer: z.string(),
        correctAnswer: z.string(),
        legalContext: z.array(z.string()),
        question: z.string(),
      }))
      .mutation(async ({ input }) => {
        const systemPrompt = `Du bist ein erfahrener Prüfer für Immobilienrecht und bewertest die Antwort eines Studierenden.

**Aufgabe:** ${input.question}

**Musterlösung:** ${input.correctAnswer}

**Relevante Rechtsgrundlagen:** ${input.legalContext.join(", ")}

**Antwort des Studierenden:** ${input.userAnswer}

**Deine Aufgabe:**
1. Bewerte die Antwort auf einer Skala von 0-100 Punkten
2. Gib konstruktives Feedback:
   - Was ist richtig?
   - Was fehlt oder ist falsch?
   - Welche rechtlichen Aspekte wurden übersehen?
3. Sei fair aber präzise

Antworte im folgenden JSON-Format:
{
  "score": <Punktzahl 0-100>,
  "isCorrect": <true wenn score >= 70, sonst false>,
  "feedback": "<Dein Feedback in 2-3 Sätzen>"
}`;

        try {
          const aiResponse = await invokeLLM({
            maxTokens: 500, // Quiz-Feedback: JSON, kurz
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: "Bitte bewerte meine Antwort." },
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "quiz_evaluation",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    score: {
                      type: "number",
                      description: "Score from 0 to 100",
                    },
                    isCorrect: {
                      type: "boolean",
                      description: "True if score >= 70",
                    },
                    feedback: {
                      type: "string",
                      description: "Constructive feedback in 2-3 sentences",
                    },
                  },
                  required: ["score", "isCorrect", "feedback"],
                  additionalProperties: false,
                },
              },
            },
          });

          const rawContent = aiResponse.choices[0]?.message?.content;
          const parsed = safeJsonParse(rawContent, {
            score: 0,
            isCorrect: false,
            feedback: "Die KI-Antwort war nicht im erwarteten JSON-Format.",
          });

          return {
            score: typeof parsed.score === "number" ? Math.max(0, Math.min(100, parsed.score)) : 0,
            isCorrect: typeof parsed.isCorrect === "boolean" ? parsed.isCorrect : false,
            feedback:
              typeof parsed.feedback === "string" && parsed.feedback.trim()
                ? parsed.feedback
                : "Die Antwort konnte nicht automatisch bewertet werden.",
          } as { score: number; isCorrect: boolean; feedback: string };
        } catch (error) {
          console.error("[Quiz] Error evaluating answer:", error);
          return {
            score: 0,
            isCorrect: false,
            feedback: "Automatische Bewertung momentan nicht verfügbar. Bitte erneut versuchen.",
          } as { score: number; isCorrect: boolean; feedback: string };
        }
      }),
  }),


  modules: router({
    // Gibt freigeschaltete Module des eingeloggten Nutzers zurück
    myAccess: protectedProcedure.query(async ({ ctx }) => {
      // Admins sehen immer alle Module
      if (ctx.user?.role === "admin") {
        return [1, 2, 3, 4, 5];
      }

      const db = await (await import("./db")).getDb();
      const { users } = await import("../drizzle/schema");
      const { eq } = await import("drizzle-orm");

      const result = await db
        .select()
        .from(users)
        .where(eq(users.id, ctx.user.id))
        .limit(1);

      const raw = result[0]?.enabledModules;

      // Fallback: mindestens Modul 1
      if (!raw || typeof raw !== "string") return [1];

      return raw
        .split(",")
        .map((x) => parseInt(x.trim(), 10))
        .filter((n) => Number.isFinite(n) && n > 0);

    }),


    // Nutzer: Freischalt-Code (Voucher) einlösen -> erweitert enabledModules
    redeemCode: protectedProcedure
      .input((val) => val as { code: string })
      .mutation(async ({ ctx, input }) => {
        const code = (input?.code ?? "").trim();
        if (!code) {
          return { ok: false, error: "Bitte einen Freischalt-Code eingeben." };
        }

        const db = await (await import("./db")).getDb();
        const { accessCodes, users } = await import("../drizzle/schema");
        const { eq, and } = await import("drizzle-orm");

        // 1) Code in DB finden (aktiv)
        const rows = await db
          .select()
          .from(accessCodes)
          .where(and(eq(accessCodes.code, code), eq(accessCodes.isActive, true)))
          .limit(1);
        if (!rows.length) {
          return { ok: false, error: "Code ist ungültig oder deaktiviert." };
        }

        const ac: any = rows[0];

        // 2) Nutzung prüfen (0 = unendlich)
        const maxUses = Number(ac.maxUses ?? ac.max_uses ?? 1);
        const usedCount = Number(ac.usedCount ?? ac.used_count ?? 0);

        if (maxUses > 0 && usedCount >= maxUses) {
          return { ok: false, error: "Dieser Code wurde bereits verbraucht." };
        }

        // 3) Module aus dem Code lesen
        const rawModules = String(ac.modules ?? "").trim();
        if (!rawModules) {
          return { ok: false, error: "Dieser Code hat keine Module hinterlegt." };
        }

        const codeModules = rawModules
          .split(",")
          .map((x) => parseInt(x.trim(), 10))
          .filter((n) => Number.isFinite(n) && n > 0);

        if (!codeModules.length) {
          return { ok: false, error: "Dieser Code enthält keine gültigen Modul-Nummern." };
        }

        // 4) Aktuelle User-Module lesen
        const urows = await db
          .select()
          .from(users)
          .where(eq(users.id, ctx.user.id))
          .limit(1);

        const userRow: Record<string, unknown> = urows[0] as Record<string, unknown>;
        const currentRaw = String(userRow?.enabledModules ?? "");

        const current = currentRaw
          .split(",")
          .map((x) => parseInt(x.trim(), 10))
          .filter((n) => Number.isFinite(n) && n > 0);

        // 5) Merge: alte + neue Module, sortiert, einzigartig
        const merged = Array.from(new Set([...current, ...codeModules])).sort((a, b) => a - b);
        const mergedStr = merged.join(",");

        // 6) User updaten
        await db.update(users).set({ enabledModules: mergedStr }).where(eq(users.id, ctx.user.id));

        // 7) Code-Nutzung hochzählen
        await db.update(accessCodes).set({ usedCount: usedCount + 1 }).where(eq(accessCodes.id, ac.id));

        return { ok: true, enabledModules: merged };


      }),


    // Admin: Modul für Nutzer freischalten
    setAccess: adminProcedure
      .input((val) => val as { userId: number; modules: number[] })
      .mutation(async ({ input }) => {
        const db = await (await import('./db')).getDb();
        const { users } = await import('../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        const modulesStr = input.modules.join(',');
        await db.update(users).set({ enabledModules: modulesStr }).where(eq(users.id, input.userId));
        return { ok: true };
      }),
  }),



  adminUsers: router({
    list: adminProcedure.query(async () => {
      const db = await (await import('./db')).getDb();
      const { users } = await import('../drizzle/schema');
      return await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        enabledModules: users.enabledModules,
        createdAt: users.createdAt,
        lastSignedIn: users.lastSignedIn,
      }).from(users).orderBy(users.createdAt);
    }),
    setModules: adminProcedure
      .input((val) => val as { userId: number; modules: string })
      .mutation(async ({ input }) => {
        const db = await (await import('./db')).getDb();
        const { users } = await import('../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        await db.update(users).set({ enabledModules: input.modules }).where(eq(users.id, input.userId));
        return { ok: true };
      }),
    setRole: adminProcedure
      .input((val) => val as { userId: number; role: 'user' | 'admin' | 'trainer' })
      .mutation(async ({ input }) => {
        const db = await (await import('./db')).getDb();
        const { users } = await import('../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        await db.update(users).set({ role: input.role }).where(eq(users.id, input.userId));
        return { ok: true };
      }),
    deleteUser: adminProcedure
      .input((val) => val as { userId: number })
      .mutation(async ({ input }) => {
        const db = await (await import('./db')).getDb();
        const s = await import('../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        const uid = input.userId;
        // DSGVO Art. 17 — vollständige Löschung aller personenbezogenen Daten
        const openId = (await db.select().from(s.users).where(eq(s.users.id, uid)).limit(1))[0]?.openId ?? '';
        await db.delete(s.openAnswers).where(eq(s.openAnswers.userId, uid)).catch(() => {});
        await db.delete(s.spacedRepetition).where(eq(s.spacedRepetition.userId, uid)).catch(() => {});
        await db.delete(s.videoProgress).where(eq(s.videoProgress.userId, uid)).catch(() => {});
        await db.delete(s.examWeakTopics).where(eq(s.examWeakTopics.userId, uid)).catch(() => {});
        await db.delete(s.examAuditLog).where(eq(s.examAuditLog.userId, uid)).catch(() => {});
        await db.delete(s.certificates).where(eq(s.certificates.userId, uid)).catch(() => {});
        await db.delete(s.activityHeartbeats).where(eq(s.activityHeartbeats.userId, uid)).catch(() => {});
        await db.delete(s.feedback).where(eq(s.feedback.userId, uid)).catch(() => {});
        await db.delete(s.complaints).where(eq(s.complaints.userId, uid)).catch(() => {});
        await db.delete(s.consentLog).where(eq(s.consentLog.userId, uid)).catch(() => {});
        const userEmail = (await db.select().from(s.users).where(eq(s.users.id, uid)).limit(1))[0]?.email ?? '';
        await db.delete(s.passwordResetTokens).where(eq(s.passwordResetTokens.email, userEmail)).catch(() => {});
        const convIds = (await db.select({id: s.chatConversations.id}).from(s.chatConversations).where(eq(s.chatConversations.userId, uid))).map((r: any) => r.id);
        if (convIds.length > 0) {
          const { inArray } = await import('drizzle-orm');
          await db.delete(s.chatMessages).where(inArray(s.chatMessages.conversationId, convIds)).catch(() => {});
        }
        await db.delete(s.chatConversations).where(eq(s.chatConversations.userId, uid)).catch(() => {});
        const sessIds = (await db.select({id: s.examSessions.id}).from(s.examSessions).where(eq(s.examSessions.userId, uid))).map((r: any) => r.id);
        if (sessIds.length > 0) {
          const { inArray } = await import('drizzle-orm');
          await db.delete(s.examQuestions).where(inArray(s.examQuestions.sessionId, sessIds)).catch(() => {});
        }
        await db.delete(s.examSessions).where(eq(s.examSessions.userId, uid)).catch(() => {});
        await db.delete(s.userSessions).where(eq(s.userSessions.userId, uid)).catch(() => {});
        await db.delete(s.learningLogs).where(eq(s.learningLogs.userId, uid)).catch(() => {});
        await db.delete(s.authCredentials).where(eq(s.authCredentials.openId, openId)).catch(() => {});
        await db.delete(s.users).where(eq(s.users.id, uid));
        return { ok: true };
      }),
  }),

  account: router({
        deleteMyAccount: protectedProcedure.mutation(async ({ ctx }) => {
      const { getDb } = await import('./db');
      const db = await getDb();
      const schema = await import('../drizzle/schema');
      const { eq, inArray } = await import('drizzle-orm');
      const userId = ctx.user.id;
      const openId = ctx.user.openId;

      // 1. Chat-Messages (Kind von chat_conversations)
      const convs = await db.select({ id: schema.chatConversations.id })
        .from(schema.chatConversations)
        .where(eq(schema.chatConversations.userId, userId));
      if (convs.length > 0) {
        const convIds = convs.map((c: Record<string, unknown>) => c.id as number);
        await db.delete(schema.chatMessages)
          .where(inArray(schema.chatMessages.conversationId, convIds));
      }
      await db.delete(schema.chatConversations)
        .where(eq(schema.chatConversations.userId, userId));

      // 2. Exam-Questions (Kind von exam_sessions)
      const sessions = await db.select({ id: schema.examSessions.id })
        .from(schema.examSessions)
        .where(eq(schema.examSessions.userId, userId));
      if (sessions.length > 0) {
        const sessionIds = sessions.map((s: Record<string, unknown>) => s.id as number);
        await db.delete(schema.examQuestions)
          .where(inArray(schema.examQuestions.sessionId, sessionIds));
      }
      await db.delete(schema.examSessions)
        .where(eq(schema.examSessions.userId, userId));
      await db.delete(schema.examWeakTopics)
        .where(eq(schema.examWeakTopics.userId, userId));

      // 3. Activity Heartbeats
      await db.delete(schema.activityHeartbeats)
        .where(eq(schema.activityHeartbeats.userId, userId));

      // 4. Open Answers
      await db.delete(schema.openAnswers)
        .where(eq(schema.openAnswers.userId, userId));

      // 5. Certificates
      await db.delete(schema.certificates)
        .where(eq(schema.certificates.userId, userId));

      // 6. Feedback + Complaints (falls userId-Feld existiert)
      try {
        await db.delete(schema.feedback)
          .where(eq((schema.feedback as any).userId, userId));
      } catch (e) { console.error(JSON.stringify({level:'warn',msg:'[Router] feedback delete fehlgeschlagen',error:(e instanceof Error ? e.message : String(e)),ts:new Date().toISOString()})); }
      try {
        await db.delete(schema.complaints)
          .where(eq((schema.complaints as any).userId, userId));
      } catch (e) { console.error(JSON.stringify({level:'warn',msg:'[Router] complaints delete fehlgeschlagen',error:(e instanceof Error ? e.message : String(e)),ts:new Date().toISOString()})); }

      // 7. Consent-Log
      await db.delete(schema.consentLog)
        .where(eq(schema.consentLog.userId, userId));

      // 8. Core-Daten (Reihenfolge: Kinder vor Eltern)
      await db.delete(schema.learningLogs)
        .where(eq(schema.learningLogs.userId, userId));
      await db.delete(schema.userSessions)
        .where(eq(schema.userSessions.userId, userId));
      await db.delete(schema.authCredentials)
        .where(eq(schema.authCredentials.openId, openId));
      await db.delete(schema.users)
        .where(eq(schema.users.id, userId));

      return { ok: true, deleted: "Alle personenbezogenen Daten gemäß Art. 17 DSGVO gelöscht." };
    }),
  }),

  progress: router({
    startDay: protectedProcedure
      .input((val: any) => val as { moduleId: number; dayId: number })
      .mutation(async ({ ctx, input }) => {
        const db = await (await import('./db')).getDb();
        const { learningLogs } = await import('../drizzle/schema');
        const result = await db.insert(learningLogs).values({
          userId: ctx.user.id,
          moduleId: input.moduleId,
          dayId: input.dayId,
          openedAt: new Date(),
          completed: false,
        });
        const hdr = result as unknown as [{ insertId: number }, unknown]; return { logId: Number(hdr[0].insertId) };
      }),
    completeDayByIds: protectedProcedure
      .input((val: any) => val as { moduleId: number; dayId: number; durationSeconds: number })
      .mutation(async ({ ctx, input }) => {
        const db = await (await import('./db')).getDb();
        const { learningLogs } = await import('../drizzle/schema');
        const { eq, and } = await import('drizzle-orm');
        // Update existing log or insert new completed one
        const existing = await db.select().from(learningLogs)
          .where(and(eq(learningLogs.userId, ctx.user.id), eq(learningLogs.moduleId, input.moduleId), eq(learningLogs.dayId, input.dayId)))
          .limit(1);
        if (existing.length > 0) {
          await db.update(learningLogs)
            .set({ completed: true, closedAt: new Date(), durationSeconds: input.durationSeconds })
            .where(eq(learningLogs.id, existing[0].id));
        } else {
          await db.insert(learningLogs).values({
            userId: ctx.user.id, moduleId: input.moduleId, dayId: input.dayId,
            openedAt: new Date(), closedAt: new Date(), completed: true, durationSeconds: input.durationSeconds, heartbeatCount: 0
          });
        }
        return { ok: true };
      }),
    completeDay: protectedProcedure
      .input((val: any) => val as { logId: number; durationSeconds: number; heartbeatCount: number })
      .mutation(async ({ ctx, input }) => {
        const db = await (await import('./db')).getDb();
        const { learningLogs } = await import('../drizzle/schema');
        const { eq, and } = await import('drizzle-orm');
        await db.update(learningLogs)
          .set({ closedAt: new Date(), durationSeconds: input.durationSeconds, heartbeatCount: input.heartbeatCount, completed: true })
          .where(and(eq(learningLogs.id, input.logId), eq(learningLogs.userId, ctx.user.id)));
        return { ok: true };
      }),
    getProgress: protectedProcedure.query(async ({ ctx }) => {
      const db = await (await import('./db')).getDb();
      const { learningLogs } = await import('../drizzle/schema');
      const { eq } = await import('drizzle-orm');
      return await db.select().from(learningLogs).where(eq(learningLogs.userId, ctx.user.id));
    }),
  }),
  adminCodes: router({
    list: adminProcedure.query(async () => {
      const db = await (await import('./db')).getDb();
      const { accessCodes } = await import('../drizzle/schema');
      return await db.select({
        id: accessCodes.id,
        code: accessCodes.code,
        modules: accessCodes.modules,
        maxUses: accessCodes.maxUses,
        usedCount: accessCodes.usedCount,
        isActive: accessCodes.isActive,
        note: accessCodes.note,
        createdAt: accessCodes.createdAt,
      }).from(accessCodes).orderBy(accessCodes.createdAt);
    }),
    create: adminProcedure
      .input((val: any) => val as { code: string; modules: string; maxUses: number; note?: string; role?: string })
      .mutation(async ({ ctx, input }) => {
        const db = await (await import('./db')).getDb();
        const { accessCodes } = await import('../drizzle/schema');
        await db.insert(accessCodes).values({
          code: input.code.toUpperCase().trim(),
          modules: input.modules,
          maxUses: input.maxUses,
          note: input.note || null,
          role: input.role || null,
          createdByUserId: ctx.user.id,
        });
        return { ok: true };
      }),
    delete: adminProcedure
      .input((val: any) => val as { id: number })
      .mutation(async ({ input }) => {
        const db = await (await import('./db')).getDb();
        const { accessCodes } = await import('../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        await db.delete(accessCodes).where(eq(accessCodes.id, input.id));
        return { ok: true };
      }),
    toggle: adminProcedure
      .input((val: any) => val as { id: number; isActive: boolean })
      .mutation(async ({ input }) => {
        const db = await (await import('./db')).getDb();
        const { accessCodes } = await import('../drizzle/schema');
        const { eq } = await import('drizzle-orm');
        await db.update(accessCodes).set({ isActive: input.isActive }).where(eq(accessCodes.id, input.id));
        return { ok: true };
      }),
  }),

  presentationCode: router({
    redeem: publicProcedure
      .input((val: any) => val as { code: string })
      .mutation(async ({ input }) => {
        const { redeemPresentationCode } = await import('./db');
        return redeemPresentationCode(input.code);
      }),
    list: adminProcedure.query(async () => {
      const { listPresentationCodes } = await import('./db');
      return listPresentationCodes();
    }),
    create: adminProcedure
      .input((val: any) => val as { code: string; label: string; modules: string; expiresInDays?: number; maxUsage?: number })
      .mutation(async ({ input }) => {
        const { createPresentationCode } = await import('./db');
        const expiresAt = input.expiresInDays ? new Date(Date.now() + input.expiresInDays * 86400000) : null;
        await createPresentationCode(input.code, input.label, input.modules, expiresAt, input.maxUsage ?? null);
        return { ok: true };
      }),
    activate: adminProcedure
      .input((val: any) => val as { id: number })
      .mutation(async ({ input }) => {
        const { sql } = await import('drizzle-orm');
        const { getDb } = await import('./db');
        const db = await getDb();
        if (db) await db.execute(sql`UPDATE presentation_codes SET isActive = 1 WHERE id = ${input.id}`);
        return { ok: true };
      }),
    delete: adminProcedure
      .input((val: any) => val as { id: number })
      .mutation(async ({ input }) => {
        const { sql } = await import('drizzle-orm');
        const { getDb } = await import('./db');
        const db = await getDb();
        if (db) await db.execute(sql`DELETE FROM presentation_codes WHERE id = ${input.id}`);
        return { ok: true };
      }),
    deactivate: adminProcedure
      .input((val: any) => val as { id: number })
      .mutation(async ({ input }) => {
        const { deactivatePresentationCode } = await import('./db');
        await deactivatePresentationCode(input.id);
        return { ok: true };
      }),
  }),
  adminQuestions: router({
    list: adminProcedure
      .input(z.object({
        moduleId: z.number().optional(),
        difficulty: z.string().optional(),
        search: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        const { getDb } = await import("./db");
        const { like, and, eq, count, sql } = await import("drizzle-orm");
        const db = await getDb();
        if (!db) return { questions: [], total: 0 };
        const conditions: ReturnType<typeof eq>[] = [];
        if (input.moduleId) conditions.push(eq(questionBank.moduleId, input.moduleId));
        if (input.difficulty) conditions.push(eq(questionBank.difficulty, input.difficulty as any));
        if (input.search) conditions.push(like(questionBank.questionText, `%${input.search}%`));
        const where = conditions.length > 0 ? and(...conditions) : undefined;
        const [questions, countResult] = await Promise.all([
          db.select({
            id: questionBank.id,
            moduleId: questionBank.moduleId,
            category: questionBank.category,
            difficulty: questionBank.difficulty,
            questionText: questionBank.questionText,
            // options und correctAnswer werden oft fuer Listen nicht benoetigt,
            // aber hier fuer Admin-Edit evtl doch. Ich behalte sie, aber waehle explizit.
            options: questionBank.options,
            correctAnswer: questionBank.correctAnswer,
            explanation: questionBank.explanation,
          }).from(questionBank).where(where).limit(input.limit).offset(input.offset).orderBy(questionBank.moduleId),
          db.select({ total: count() }).from(questionBank).where(where),
        ]);
        return { questions, total: countResult[0]?.total ?? 0 };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { getDb } = await import("./db");
        const { eq } = await import("drizzle-orm");
        const db = await getDb();
        if (!db) throw new Error("DB nicht verfügbar");
        await db.delete(questionBank).where(eq(questionBank.id, input.id));
        return { ok: true };
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        questionText: z.string().optional(),
        difficulty: z.string().optional(),
        category: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { getDb } = await import("./db");
        const { eq } = await import("drizzle-orm");
        const db = await getDb();
        if (!db) throw new Error("DB nicht verfügbar");
        const updateData: any = {};
        if (input.questionText) updateData.questionText = input.questionText;
        if (input.difficulty) updateData.difficulty = input.difficulty;
        if (input.category) updateData.category = input.category;
        await db.update(questionBank).set(updateData).where(eq(questionBank.id, input.id));
        return { ok: true };
      }),
  }),

});

export type AppRouter = typeof appRouter;