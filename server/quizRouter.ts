import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { questionBank } from "../drizzle/schema";
import { eq, and, sql } from "drizzle-orm";

export const quizRouter = router({
  // Get all questions for a module
  getQuestionsByModule: publicProcedure
    .input(z.object({ moduleId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const questions = await db
        .select()
        .from(questionBank)
        .where(eq(questionBank.moduleId, input.moduleId));
      return questions;
    }),

  // Get questions by category
  getQuestionsByCategory: publicProcedure
    .input(z.object({ moduleId: z.number(), category: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const questions = await db
        .select()
        .from(questionBank)
        .where(
          and(
            eq(questionBank.moduleId, input.moduleId),
            eq(questionBank.category, input.category)
          )
        );
      return questions;
    }),

  // Get random questions for quiz
  getRandomQuestions: publicProcedure
    .input(
      z.object({
        moduleId: z.number(),
        category: z.string().optional(),
        difficulty: z.enum(["easy", "medium", "hard"]).optional(),
        count: z.number().min(1).max(100).default(20),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const conditions = [eq(questionBank.moduleId, input.moduleId)];

      if (input.category) {
        conditions.push(eq(questionBank.category, input.category));
      }

      if (input.difficulty) {
        conditions.push(eq(questionBank.difficulty, input.difficulty));
      }

      const allQuestions = await db
        .select()
        .from(questionBank)
        .where(and(...conditions));
      
      // Shuffle and take random questions
      const shuffled = allQuestions.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, input.count);
    }),

  // Get quiz statistics
  getQuizStats: publicProcedure
    .input(z.object({ moduleId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const totalQuestions = await db
        .select({ count: sql<number>`count(*)` })
        .from(questionBank)
        .where(eq(questionBank.moduleId, input.moduleId));

      const byCategory = await db
        .select({
          category: questionBank.category,
          count: sql<number>`count(*)`,
        })
        .from(questionBank)
        .where(eq(questionBank.moduleId, input.moduleId))
        .groupBy(questionBank.category);

      const byDifficulty = await db
        .select({
          difficulty: questionBank.difficulty,
          count: sql<number>`count(*)`,
        })
        .from(questionBank)
        .where(eq(questionBank.moduleId, input.moduleId))
        .groupBy(questionBank.difficulty);

      return {
        total: totalQuestions[0]?.count || 0,
        byCategory,
        byDifficulty,
      };
    }),
});
