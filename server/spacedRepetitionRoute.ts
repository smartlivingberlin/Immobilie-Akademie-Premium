import type { Express, Request, Response } from "express";
import { getDb } from "./db";
import { sql } from "drizzle-orm";
import { requireAuth } from "./authMiddleware";

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
      const userId = (req as any).currentUser.id;

      const [due] = await db.$client.query(`
        SELECT sr.questionId, sr.easinessFactor, sr.interval, sr.repetitions
        FROM spaced_repetition sr
        WHERE sr.userId = ?
          AND sr.nextReviewAt <= NOW()
        ORDER BY sr.nextReviewAt ASC
        LIMIT 20
      `, [userId]) as any;
      res.json({ questions: due, count: (due as any).length });
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
      const userId = (req as any).currentUser.id;

      // Aktuellen Stand holen
      const [[existing_row]] = await db.$client.query(`
        SELECT * FROM spaced_repetition
        WHERE userId = ? AND questionId = ?
        LIMIT 1
      `, [userId, questionId]) as any;
      const current = existing_row;
      } else {
        await db.$client.query(`
          INSERT INTO spaced_repetition
            (userId, questionId, easinessFactor, interval, repetitions, nextReviewAt, lastResult)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [userId, questionId, easiness, interval, newReps, nextReview, quality >= 3 ? "correct" : "wrong"]);
      }

      res.json({ ok: true, nextReview, interval });
    } catch (e) {
      res.status(500).json({ error: "Fehler" });
    }
  });
}
