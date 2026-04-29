import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { openQuestions, openAnswers } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { invokeLLM } from "./_core/llm";

// ── KI-Bewertung ─────────────────────────────────────────────
async function bewerteAntwort(
  frage: string,
  musterloesung: string,
  schema: string,
  antwort: string,
  maxPunkte: number
): Promise<{ punkte: number; gut: string; fehlt: string; verbesserung: string; raw: string }> {
  const prompt = `Du bist ein strenger aber fairer IHK-Prüfer für Immobilienfachleute in Deutschland.

PRÜFUNGSFRAGE:
${frage}

MUSTERLÖSUNG (intern, nicht zeigen):
${musterloesung}

BEWERTUNGSSCHEMA (JSON):
${schema}

ANTWORT DES LERNENDEN:
${antwort}

Bewerte die Antwort objektiv und lehrreich. Antworte NUR als JSON ohne Markdown-Backticks:
{
  "punkte": <Zahl 0-${maxPunkte}>,
  "gut": "<Was war gut, konkret, 2-3 Sätze>",
  "fehlt": "<Was fehlt oder ist falsch, konkret, 2-3 Sätze>",
  "verbesserung": "<Ein konkreter Verbesserungsvorschlag für den Lernenden>"
}`;

  try {
    const result = await invokeLLM({
      messages: [{ role: "user", content: prompt }],
      maxTokens: 600,
    });
    const text = typeof result.choices?.[0]?.message?.content === "string" ? result.choices[0].message.content as string : JSON.stringify(result.choices?.[0]?.message?.content ?? "");
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return {
      punkte: Math.min(maxPunkte, Math.max(0, Number(parsed.punkte) || 0)),
      gut: parsed.gut || "",
      fehlt: parsed.fehlt || "",
      verbesserung: parsed.verbesserung || "",
      raw: clean,
    };
  } catch {
    return { punkte: 0, gut: "", fehlt: "Bewertung fehlgeschlagen", verbesserung: "", raw: "" };
  }
}

export const openQuestionsRouter = router({

  // Alle Fragen eines Moduls laden
  getByModul: protectedProcedure
    .input(z.object({ modulId: z.number().min(1).max(5) }))
    .query(async ({ input }) => {
      const db = await getDb();
      return db.select().from(openQuestions)
        .where(eq(openQuestions.modulId, input.modulId));
    }),

  // Einzelne Frage
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      const [q] = await db.select().from(openQuestions)
        .where(eq(openQuestions.id, input.id));
      if (!q) throw new Error("Frage nicht gefunden");
      // Musterlösung NICHT zurückgeben
      const { musterloesung: _, bewertungsSchema: __, ...safe } = q;
      return safe;
    }),

  // Antwort abgeben + KI-Bewertung
  submitAnswer: protectedProcedure
    .input(z.object({
      questionId: z.number(),
      antwort: z.string().min(10).max(5000),
      dauer: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();

      // Frage holen (mit Musterlösung für KI)
      const [frage] = await db.select().from(openQuestions)
        .where(eq(openQuestions.id, input.questionId));
      if (!frage) throw new Error("Frage nicht gefunden");

      // KI-Bewertung
      const bewertung = await bewerteAntwort(
        frage.frage,
        frage.musterloesung,
        frage.bewertungsSchema,
        input.antwort,
        frage.maxPunkte
      );

      // Speichern
      await db.insert(openAnswers).values({
        userId: ctx.user.id,
        questionId: input.questionId,
        antwort: input.antwort,
        kiPunkte: bewertung.punkte,
        kiGut: bewertung.gut,
        kiFehlt: bewertung.fehlt,
        kiVerbesserung: bewertung.verbesserung,
        kiRohinput: bewertung.raw,
        dauer: input.dauer ?? 0,
      });

      return {
        punkte: bewertung.punkte,
        maxPunkte: frage.maxPunkte,
        prozent: Math.round((bewertung.punkte / frage.maxPunkte) * 100),
        gut: bewertung.gut,
        fehlt: bewertung.fehlt,
        verbesserung: bewertung.verbesserung,
        musterloesung: frage.musterloesung, // erst NACH Abgabe zeigen
      };
    }),

  // Fortschritt des Nutzers
  getProgress: protectedProcedure
    .input(z.object({ modulId: z.number().min(1).max(5) }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      const fragen = await db.select({ id: openQuestions.id })
        .from(openQuestions)
        .where(and(eq(openQuestions.modulId, input.modulId), eq(openQuestions.aktiv, true)));

      const antworten = await db.select()
        .from(openAnswers)
        .where(eq(openAnswers.userId, ctx.user.id));

      const beantwortet = new Set(antworten.map(a => a.questionId));
      const durchschnitt = antworten.length > 0
        ? Math.round(antworten.reduce((s, a) => s + (a.kiPunkte ?? 0), 0) / antworten.length)
        : 0;

      return {
        gesamt: fragen.length,
        beantwortet: beantwortet.size,
        durchschnittPunkte: durchschnitt,
        antworten,
      };
    }),
});
