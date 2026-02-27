import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { 
  createExamSession, 
  getExamSession, 
  getUserExamSessions,
  saveExamQuestion,
  getExamQuestions,
  getExamQuestionById,
  updateExamQuestion,
  completeExamSession,
  getWeakTopics,
  updateWeakTopic
} from "./db";
import { invokeLLM } from "./_core/llm";
import { TRPCError } from "@trpc/server";

// Module content summaries for question generation
const MODULE_CONTENT: Record<number, string> = {
  1: "Modul 1 - Einführung & Grundlagen: Akteure der Immobilienwirtschaft, Immobilienmärkte, ethische Grundsätze, Berufsbilder, Marktanalyse",
  2: "Modul 2 - Maklerrecht & §34c GewO: Gewerbeordnung, Makler- und Bauträgerverordnung (MaBV), Wettbewerbsrecht, Verbraucherschutz, Provisionsrecht",
  3: "Modul 3 - Verwaltung (WEG & Miet): WEG-Recht, Mietverwaltung, Hausverwaltung, technische Gebäudeverwaltung, kaufmännische Verwaltung, Eigentümerversammlungen",
  4: "Modul 4 - Wertermittlung & Gutachten: Sachwertverfahren, Ertragswertverfahren, Vergleichswertverfahren, Verkehrswertermittlung, Gutachtenerstellung",
  5: "Modul 5 - Finanzierung & §34i: Immobiliardarlehensvermittlung, Kreditprozesse, Finanzierungsarten, Beleihungswertermittlung, IHK-Prüfungsvorbereitung"
};

export const examRouter = router({
  /**
   * Get recommended difficulty based on user performance
   */
  getRecommendedDifficulty: protectedProcedure
    .input(z.object({ moduleId: z.number().min(1).max(5) }))
    .query(async ({ ctx, input }) => {
      const recentSessions = await getUserExamSessions(ctx.user.id, input.moduleId);
      const last5 = recentSessions.slice(0, 5);
      
      if (last5.length === 0) {
        return { difficulty: 'medium' as const, reason: 'Erste Prüfung - Start mit mittlerem Schwierigkeitsgrad' };
      }

      const avgScore = last5.reduce((sum, s) => sum + (s.score ?? 0), 0) / last5.length;
      
      if (avgScore >= 85) {
        return { difficulty: 'hard' as const, reason: `Durchschnitt ${avgScore.toFixed(1)}% - Empfehlung: Schwieriger Modus` };
      } else if (avgScore >= 70) {
        return { difficulty: 'medium' as const, reason: `Durchschnitt ${avgScore.toFixed(1)}% - Empfehlung: Mittlerer Modus` };
      } else {
        return { difficulty: 'easy' as const, reason: `Durchschnitt ${avgScore.toFixed(1)}% - Empfehlung: Einfacher Modus` };
      }
    }),

  /**
   * Start a new exam session
   */
  startExam: protectedProcedure
    .input(z.object({
      moduleId: z.number().min(1).max(5),
      difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
      isIHKMode: z.boolean().optional().default(false)
    }))
    .mutation(async ({ ctx, input }) => {
      const questionCount = input.isIHKMode ? 72 : 10;
      const timeLimit = input.isIHKMode ? 180 * 60 : 30 * 60; // 180 min for IHK, 30 min for normal
      
      const session = await createExamSession(ctx.user.id, input.moduleId, questionCount, timeLimit, input.difficulty, input.isIHKMode);
      if (!session) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create exam session"
        });
      }
      return session;
    }),

  /**
   * Generate a question using AI
   */
  generateQuestion: protectedProcedure
    .input(z.object({
      sessionId: z.number(),
      questionNumber: z.number(),
      moduleId: z.number().min(1).max(5),
      difficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
    }))
    .mutation(async ({ ctx, input }) => {
      const session = await getExamSession(input.sessionId);
      if (!session || session.userId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Invalid session"
        });
      }

      const moduleContent = MODULE_CONTENT[input.moduleId];
      const difficultyInstructions = {
        easy: "Stelle eine einfache Frage, die Grundwissen abfragt.",
        medium: "Stelle eine mittelschwere Frage, die Verständnis und Anwendung erfordert.",
        hard: "Stelle eine anspruchsvolle Frage, die tiefes Fachwissen und Transferleistung erfordert."
      };

      const prompt = `Du bist ein Prüfungsersteller für die Immobilienwirtschaft. Erstelle eine Multiple-Choice-Frage für ${moduleContent}.

${difficultyInstructions[input.difficulty]}

Die Frage muss:
- Praxisrelevant und prüfungskonform sein
- 4 Antwortmöglichkeiten haben (A, B, C, D)
- Genau eine richtige Antwort haben
- Sich auf echte Gesetze, Verordnungen oder Fachkonzepte beziehen

Antworte im folgenden JSON-Format:
{
  "question": "Fragetext hier",
  "options": {
    "A": "Antwort A",
    "B": "Antwort B",
    "C": "Antwort C",
    "D": "Antwort D"
  },
  "correctAnswer": "A",
  "topic": "Themenbereich (z.B. Maklerrecht, WEG-Verwaltung)",
  "explanation": "Kurze Erklärung warum die Antwort richtig ist (mit Gesetzesverweisen)"
}`;

      try {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: "Du bist ein Experte für Immobilienwirtschaft und erstellst Prüfungsfragen." },
            { role: "user", content: prompt }
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "exam_question",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  options: {
                    type: "object",
                    properties: {
                      A: { type: "string" },
                      B: { type: "string" },
                      C: { type: "string" },
                      D: { type: "string" }
                    },
                    required: ["A", "B", "C", "D"],
                    additionalProperties: false
                  },
                  correctAnswer: { type: "string", enum: ["A", "B", "C", "D"] },
                  topic: { type: "string" },
                  explanation: { type: "string" }
                },
                required: ["question", "options", "correctAnswer", "topic", "explanation"],
                additionalProperties: false
              }
            }
          }
        });

        const content = response.choices[0].message.content;
        if (typeof content !== 'string') {
          throw new Error('Invalid response format');
        }
        const questionData = JSON.parse(content);
        
        // Format question text with options
        const questionText = `${questionData.question}\n\nA) ${questionData.options.A}\nB) ${questionData.options.B}\nC) ${questionData.options.C}\nD) ${questionData.options.D}`;

        // Save question to database
        const savedQuestion = await saveExamQuestion({
          sessionId: input.sessionId,
          questionNumber: input.questionNumber,
          questionText,
          correctAnswer: questionData.correctAnswer,
          moduleId: input.moduleId,
          topic: questionData.topic,
          difficulty: input.difficulty as "easy" | "medium" | "hard",
          feedback: questionData.explanation,
        });

        return {
          id: savedQuestion?.id,
          question: questionData.question,
          options: questionData.options,
          questionNumber: input.questionNumber,
        };
      } catch (error) {
        console.error("[Exam] Error generating question:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate question"
        });
      }
    }),

  /**
   * Submit an answer and get evaluation
   */
  submitAnswer: protectedProcedure
    .input(z.object({
      questionId: z.number(),
      userAnswer: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // BUGFIX: getExamQuestions(sessionId) wurde fälschlicherweise mit questionId aufgerufen.
      // Korrekt: getExamQuestionById(questionId) holt direkt die einzelne Frage.
      const question = await getExamQuestionById(input.questionId);
      
      if (!question) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Question not found"
        });
      }

      const session = await getExamSession(question.sessionId);
      if (!session || session.userId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Invalid session"
        });
      }

      const isCorrect = input.userAnswer === question.correctAnswer;

      // Update question with user answer
      await updateExamQuestion(
        input.questionId,
        input.userAnswer,
        isCorrect,
        question.feedback ?? undefined
      );

      // Track weak topics if incorrect
      if (!isCorrect && question.topic) {
        await updateWeakTopic(ctx.user.id, question.moduleId, question.topic);
      }

      return {
        isCorrect,
        correctAnswer: question.correctAnswer,
        feedback: question.feedback,
      };
    }),

  /**
   * Complete exam and calculate score
   */
  completeExam: protectedProcedure
    .input(z.object({
      sessionId: z.number(),
      timeSpent: z.number(), // in seconds
    }))
    .mutation(async ({ ctx, input }) => {
      const session = await getExamSession(input.sessionId);
      if (!session || session.userId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Invalid session"
        });
      }

      const questions = await getExamQuestions(input.sessionId);
      const correctAnswers = questions.filter(q => q.isCorrect).length;
      const score = Math.round((correctAnswers / questions.length) * 100);

      await completeExamSession(input.sessionId, correctAnswers, score, input.timeSpent);

      return {
        totalQuestions: questions.length,
        correctAnswers,
        score,
        passed: score >= 70, // 70% passing threshold
      };
    }),

  /**
   * Get exam session details
   */
  getSession: protectedProcedure
    .input(z.object({
      sessionId: z.number(),
    }))
    .query(async ({ ctx, input }) => {
      const session = await getExamSession(input.sessionId);
      if (!session || session.userId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Invalid session"
        });
      }

      const questions = await getExamQuestions(input.sessionId);
      
      return {
        session,
        questions,
      };
    }),

  /**
   * Get user's exam history
   */
  getHistory: protectedProcedure
    .input(z.object({
      moduleId: z.number().min(1).max(5).optional(),
    }))
    .query(async ({ ctx, input }) => {
      return getUserExamSessions(ctx.user.id, input.moduleId);
    }),

  /**
   * Get weak topics for user
   */
  getWeakTopics: protectedProcedure
    .input(z.object({
      moduleId: z.number().min(1).max(5).optional(),
    }))
    .query(async ({ ctx, input }) => {
      return getWeakTopics(ctx.user.id, input.moduleId);
    }),
});
