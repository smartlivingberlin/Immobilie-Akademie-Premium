import type { Express, Request, Response } from "express";
import { getDb } from "./db";
import { sql } from "drizzle-orm";
import { requireAuth } from "./ragTutor";

// SM-2 Algorithmus (SuperMemo 2)
// quality: 0-5 (0=komplett falsch, 5=perfekt)
function sm2(easiness: number, interval: number, reps: number, quality: number) {
  if (quality < 3) {
    // Falsch beantwortet → von vorne
    return { interval: 1, reps: 0, easiness: Math.max(1.3, easiness - 0.2) };
  }
  const newEasiness = easiness + (0.1 - (5-quality) * (0.08 + (5-quality) * 0.02));
  const newInterval = reps === 0 ? 1 : reps === 1 ? 6 : Math.round(interval * easiness);
  return {
    interval: newInterval,
    reps: reps + 1,
    easiness: Math.max(1.3, newEasiness),
  };
}

export function registerSpacedRepetitionRoutes(app: Express) {

  // GET /api/sr/due — Fragen die heute fällig sind
  app.get("/api/sr/due", requireAuth, async (req: Request, res: Response) => {
    try {
      const db = await getDb();
      const userId = (req as any).currentUser?.id || (req as any).currentUser?.openId;

      const due = await db.execute(sql`
        SELECT sr.questionId, sr.easinessFactor, sr.interval, sr.repetitions
        FROM spaced_repetition sr
        WHERE sr.userId = ${userId}
          AND sr.nextReviewAt <= NOW()
        ORDER BY sr.nextReviewAt ASC
        LIMIT 20
      `);

      res.json({ questions: (due as any)[0], count: (due as any)[0].length });
    } catch (e) {
      res.status(500).json({ error: "Fehler" });
    }
  });

  // POST /api/sr/answer — Antwort verarbeiten
  app.post("/api/sr/answer", requireAuth, async (req: Request, res: Response) => {
    try {
      const { questionId, quality } = req.body;
      const db = await getDb();
      const userId = (req as any).currentUser?.id || (req as any).currentUser?.openId;

      // Aktuellen Stand holen
      const [existing] = await db.execute(sql`
        SELECT * FROM spaced_repetition
        WHERE userId = ${userId} AND questionId = ${questionId}
        LIMIT 1
      `) as any;

      const current = (existing as any)[0];
      const ease = current?.easinessFactor || 2.5;
      const ivl  = current?.interval || 1;
      const reps = current?.repetitions || 0;

      const { interval, reps: newReps, easiness } = sm2(ease, ivl, reps, quality);
      const nextReview = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);

      if (current) {
        await db.execute(sql`
          UPDATE spaced_repetition
          SET easinessFactor=${easiness}, interval=${interval},
              repetitions=${newReps}, nextReviewAt=${nextReview},
              lastResult=${quality >= 3 ? "correct" : "wrong"}
          WHERE userId=${userId} AND questionId=${questionId}
        `);
      } else {
        await db.execute(sql`
          INSERT INTO spaced_repetition
            (userId, questionId, easinessFactor, interval, repetitions, nextReviewAt, lastResult)
          VALUES (${userId}, ${questionId}, ${easiness}, ${interval}, ${newReps},
                  ${nextReview}, ${quality >= 3 ? "correct" : "wrong"})
        `);
      }

      res.json({ ok: true, nextReview, interval });
    } catch (e) {
      res.status(500).json({ error: "Fehler" });
    }
  });
}
