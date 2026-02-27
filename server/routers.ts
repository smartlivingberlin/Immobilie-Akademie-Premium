import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
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
  getUsersByTenantId
} from "./db";
import { invokeLLM } from "./_core/llm";
import { storagePut } from "./storage";
import { videoRouter } from "./videoRouter";
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

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  videos: videoRouter,
  exam: examRouter,
  pdf: pdfRouter,
  certificate: certificateRouter,
  quiz: quizRouter,
  azav: azavRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
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
        const systemPrompt = `Du bist ein hochqualifizierter Immobilien-Dozent mit jahrzehntelanger Erfahrung in der Ausbildung von Immobilienmaklern, Verwaltern und Sachverständigen. Du hilfst Studierenden bei der Vorbereitung auf die Sachkundeprüfung nach §34c GewO.

**Dein Fachwissen umfasst:**
- **Modul 1:** Grundlagen der Immobilienwirtschaft, Maklerrecht, Vertragsrecht
- **Modul 2:** Maklerrecht §34c GewO, Maklervertrag, Courtage, Nachweispflichten
- **Modul 3:** WEG-Verwaltung, Mietverwaltung, Hausgeldabrechnung, Eigentümerversammlung
- **Modul 4:** Immobilienbewertung, Gutachten, Verkehrswertermittlung, Sachwertverfahren
- **Modul 5:** Darlehensvermittlung §34i, Finanzierung, Prüfungsvorbereitung

**Aktueller Kontext:** ${input.moduleContext || "Allgemeine Immobilienausbildung"}

**Deine Antwort-Strategie:**
1. **Kernaussage:** Beantworte die Frage direkt und präzise (2-3 Sätze)
2. **Gesetzliche Grundlage:** Zitiere relevante Gesetze und Paragraphen (§34c GewO, WEG, BGB, etc.)
3. **Praxisbeispiel:** Gib ein konkretes, realistisches Beispiel aus der Immobilienpraxis
4. **Rechenbeispiel:** Bei finanziellen Themen zeige eine Beispielrechnung mit konkreten Zahlen
5. **Merksatz:** Formuliere einen prägnanten Merksatz für die Prüfung

**Qualitätsstandards:**
- Nutze Fachterminologie korrekt und erkläre sie bei Bedarf
- **WICHTIG:** Gib IMMER Quellenangaben mit Modul/Tag-Nummer an: "📚 Quelle: Modul 3, Tag 12 - WEG-Verwaltung"
- Verweise auf Portal-Inhalte: "Wie in Modul X, Tag Y behandelt..."
- Strukturiere Antworten mit Markdown (Überschriften, Listen, **Fettdruck**)
- Gib Quellen an: Gesetze (§34c GewO), Verordnungen (MaBV), höchstrichterliche Rechtsprechung (BGH)
- Vermeide Halluzinationen - sage "Das kann ich nicht mit Sicherheit beantworten", wenn unsicher

**Didaktischer Ansatz:**
- Erkläre komplexe Sachverhalte schrittweise
- Verwende Analogien und Vergleiche für besseres Verständnis
- Stelle Rückfragen, wenn die Frage unklar ist
- Ermutige zum eigenständigen Denken durch gezielte Gegenfragen

Deine Antworten sind immer fachlich korrekt, praxisnah und didaktisch wertvoll!`;

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
        const aiResponse = await invokeLLM({ messages });
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

        const aiResponse = await invokeLLM({
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
        const evaluation = typeof rawContent === "string" 
          ? JSON.parse(rawContent)
          : { score: 0, isCorrect: false, feedback: "Fehler bei der Bewertung." };

        return evaluation as { score: number; isCorrect: boolean; feedback: string };
      }),
  }),
});

export type AppRouter = typeof appRouter;
