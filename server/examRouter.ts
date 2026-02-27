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

// --- Exam option randomizer (server-side) ---
// Mischt A/B/C/D und hält die richtige Antwort korrekt konsistent.
function shuffleExamOptions(questionData: any) {
  try {
    if (!questionData || !questionData.options) return;

    const correct = String(questionData.correctAnswer ?? "").trim().toUpperCase();

    // options normalisieren -> items[]
    let items: Array<{ text: string; wasCorrect: boolean }> = [];

    if (Array.isArray(questionData.options)) {
      const arr = questionData.options as any[];
      items = arr.map((t, i) => ({
        text: String(t),
        wasCorrect: String(i) === String(questionData.correctAnswer),
      }));
    } else {
      const opts = questionData.options as Record<string, any>;
      const preferred = ["A", "B", "C", "D"].filter((k) =>
        Object.prototype.hasOwnProperty.call(opts, k)
      );
      const keys = preferred.length ? preferred : Object.keys(opts);
      items = keys.map((k) => ({
        text: String(opts[k]),
        wasCorrect: k.toUpperCase() == correct,
      }));
    }

    if (items.length < 2) return;

    // Fisher–Yates Shuffle
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = items[i];
      items[i] = items[j];
      items[j] = tmp;
    }

    const letters = ["A", "B", "C", "D"];
    const newOptions: Record<string, string> = {};
    let newCorrect = "A";

    items.forEach((it, idx) => {
      const letter = letters[idx] ?? String.fromCharCode(65 + idx);
      newOptions[letter] = it.text;
      if (it.wasCorrect) newCorrect = letter;
    });

    // in-place anwenden (funktioniert auch wenn questionData const ist)
    questionData.options = newOptions;
    questionData.correctAnswer = newCorrect;
  } catch {
    return;
  }
}

// Module content summaries for question generation
const MODULE_CONTENT: Record<number, string> = {
  1: "Modul 1 - Einführung & Grundlagen: Akteure der Immobilienwirtschaft, Immobilienmärkte, ethische Grundsätze, Berufsbilder, Marktanalyse",
  2: "Modul 2 - Maklerrecht & §34c GewO: Gewerbeordnung, Makler- und Bauträgerverordnung (MaBV), Wettbewerbsrecht, Verbraucherschutz, Provisionsrecht",
  3: "Modul 3 - Verwaltung (WEG & Miet): WEG-Recht, Mietverwaltung, Hausverwaltung, technische Gebäudeverwaltung, kaufmännische Verwaltung, Eigentümerversammlungen",
  4: "Modul 4 - Wertermittlung & Gutachten: Sachwertverfahren, Ertragswertverfahren, Vergleichswertverfahren, Verkehrswertermittlung, Gutachtenerstellung",
  5: "Modul 5 - Finanzierung & §34i: Immobiliardarlehensvermittlung, Kreditprozesse, Finanzierungsarten, Beleihungswertermittlung, IHK-Prüfungsvorbereitung"
};

type ExamQuestionShape = {
  question: string;
  options: { A: string; B: string; C: string; D: string };


  correctAnswer: "A" | "B" | "C" | "D";
  topic: string;
  explanation: string;
};

function tryParseJsonObject<T>(raw: unknown): T | null {
  if (typeof raw !== "string") return null;

  try {
    return JSON.parse(raw) as T;
  } catch {}

  const match = raw.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]) as T;
    } catch {}
  }

  return null;
}

type ExamOptionKey = "A" | "B" | "C" | "D";

const EXAM_OPTION_KEYS: ExamOptionKey[] = ["A", "B", "C", "D"];

function shuffleExamQuestionOptions(questionData: ExamQuestionShape): ExamQuestionShape {
  const entries = EXAM_OPTION_KEYS.map((key) => ({
    key,
    text: questionData.options[key],
  }));

  for (let i = entries.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [entries[i], entries[j]] = [entries[j], entries[i]];
  }

  const shuffledOptions = {
    A: entries[0].text,
    B: entries[1].text,
    C: entries[2].text,
    D: entries[3].text,
  };

  const correctIndex = entries.findIndex((entry) => entry.key === questionData.correctAnswer);
  const safeCorrectIndex = correctIndex >= 0 ? correctIndex : 0;
  const shuffledCorrectAnswer = EXAM_OPTION_KEYS[safeCorrectIndex];

  return {
    ...questionData,
    options: shuffledOptions,
    correctAnswer: shuffledCorrectAnswer,
  };
}


function shuffleExamQuestion(question: ExamQuestionShape): ExamQuestionShape {
  const pool = [
    { text: question.options.A, correct: question.correctAnswer === "A" },
    { text: question.options.B, correct: question.correctAnswer === "B" },
    { text: question.options.C, correct: question.correctAnswer === "C" },
    { text: question.options.D, correct: question.correctAnswer === "D" },
  ];

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const letters: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];
  const options: ExamQuestionShape["options"] = { A: "", B: "", C: "", D: "" };
  let correctAnswer: ExamQuestionShape["correctAnswer"] = "A";

  pool.forEach((entry, index) => {
    const letter = letters[index];
    options[letter] = entry.text;
    if (entry.correct) correctAnswer = letter;
  });

  return { ...question, options, correctAnswer };
}

function buildFallbackExamQuestion(moduleId: number, questionNumber: number): ExamQuestionShape {
  const pools: Record<number, ExamQuestionShape[]> = {
    1: [
      {
        question: "Welche Aussage beschreibt die Aufgabe eines Immobilienmaklers am besten?",
        options: {
          A: "Er vermittelt Verträge über Immobilien zwischen Parteien.",
          B: "Er spricht gerichtliche Urteile in Mietsachen.",
          C: "Er ersetzt immer den Notar beim Immobilienkauf.",
          D: "Er darf ohne Auftrag jede Immobilie verwalten."
        },
        correctAnswer: "A",
        topic: "Grundlagen Maklertätigkeit",
        explanation: "Ein Immobilienmakler vermittelt Verträge über Immobilien. Er ersetzt weder Gericht noch Notar und darf nicht automatisch verwalten."
      },
      {
        question: "Was beeinflusst einen Immobilienmarkt besonders stark?",
        options: {
          A: "Angebot und Nachfrage",
          B: "Nur die Farbe des Gebäudes",
          C: "Ausschließlich das Baujahr",
          D: "Nur die Meinung des Maklers"
        },
        correctAnswer: "A",
        topic: "Immobilienmarkt",
        explanation: "Angebot und Nachfrage sind ein zentraler Marktmechanismus und beeinflussen Preis und Vermarktungsdauer maßgeblich."
      }
    ],
    2: [
      {
        question: "Wofür ist §34c GewO im Immobilienbereich besonders wichtig?",
        options: {
          A: "Für die gewerberechtliche Erlaubnis bestimmter Tätigkeiten",
          B: "Für die Berechnung der Grunderwerbsteuer",
          C: "Für den Grundbucheintrag",
          D: "Für die notarielle Beurkundung"
        },
        correctAnswer: "A",
        topic: "§34c GewO",
        explanation: "§34c GewO regelt die Erlaubnispflicht für bestimmte gewerbliche Tätigkeiten, unter anderem in Teilen des Immobilienbereichs."
      },
      {
        question: "Welche Aussage zur MaBV trifft am ehesten zu?",
        options: {
          A: "Sie enthält Pflichten für Makler und Bauträger.",
          B: "Sie regelt nur Mietpreise in Berlin.",
          C: "Sie ersetzt das BGB vollständig.",
          D: "Sie gilt nur für Notare."
        },
        correctAnswer: "A",
        topic: "MaBV",
        explanation: "Die Makler- und Bauträgerverordnung enthält wichtige Vorgaben und Pflichten für entsprechende Gewerbetreibende."
      }
    ],
    3: [
      {
        question: "Wer beschließt in einer WEG typischerweise gemeinschaftliche Angelegenheiten?",
        options: {
          A: "Die Eigentümerversammlung",
          B: "Nur der Hausmeister",
          C: "Nur ein einzelner Eigentümer",
          D: "Immer automatisch das Bauamt"
        },
        correctAnswer: "A",
        topic: "WEG",
        explanation: "In der Wohnungseigentümergemeinschaft werden gemeinschaftliche Angelegenheiten grundsätzlich über die Eigentümerversammlung beschlossen."
      },
      {
        question: "Was gehört typischerweise zur Mietverwaltung?",
        options: {
          A: "Überwachung von Mieteingängen",
          B: "Strafverfolgung im Namen des Staates",
          C: "Notarielle Beurkundung von Kaufverträgen",
          D: "Ausstellung von Personalausweisen"
        },
        correctAnswer: "A",
        topic: "Mietverwaltung",
        explanation: "Die Mietverwaltung umfasst unter anderem die Betreuung von Mietverhältnissen und die Überwachung von Mieteingängen."
      }
    ],
    4: [
      {
        question: "Welches Wertermittlungsverfahren wird bei vermieteten Renditeobjekten besonders häufig genutzt?",
        options: {
          A: "Ertragswertverfahren",
          B: "Farbwertverfahren",
          C: "Abschreibungsfrei-Verfahren",
          D: "Losverfahren"
        },
        correctAnswer: "A",
        topic: "Wertermittlung",
        explanation: "Beim Renditeobjekt steht der nachhaltig erzielbare Ertrag im Vordergrund. Deshalb ist das Ertragswertverfahren besonders wichtig."
      },
      {
        question: "Welches Verfahren eignet sich oft gut für selbstgenutzte Einfamilienhäuser mit Vergleichsdaten?",
        options: {
          A: "Vergleichswertverfahren",
          B: "Zufallsverfahren",
          C: "Verlosungsverfahren",
          D: "Schätzverfahren ohne Daten"
        },
        correctAnswer: "A",
        topic: "Vergleichswertverfahren",
        explanation: "Wenn ausreichend Vergleichsdaten vorhanden sind, ist das Vergleichswertverfahren oft besonders geeignet."
      }
    ],
    5: [
      {
        question: "Was beschreibt der Effektivzins am besten?",
        options: {
          A: "Die tatsächlichen jährlichen Kreditkosten inklusive wesentlicher Preisbestandteile",
          B: "Nur den Sollzins ohne weitere Kosten",
          C: "Nur die Restschuld am Laufzeitende",
          D: "Nur die Höhe der Tilgung"
        },
        correctAnswer: "A",
        topic: "Finanzierung",
        explanation: "Der Effektivzins macht Kreditangebote besser vergleichbar, weil er wesentliche Kostenbestandteile berücksichtigt."
      },
      {
        question: "Was ist bei einer Immobilienfinanzierung die Tilgung?",
        options: {
          A: "Die Rückzahlung des Darlehens",
          B: "Die Eintragung ins Grundbuch",
          C: "Die Maklerprovision",
          D: "Die Gebäudeversicherung"
        },
        correctAnswer: "A",
        topic: "Tilgung",
        explanation: "Tilgung bedeutet die schrittweise Rückzahlung des aufgenommenen Darlehens."
      }
    ],
  };

  const pool = pools[moduleId] ?? pools[1];
  return pool[(questionNumber - 1) % pool.length];
}

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

        const content = response.choices[0]?.message?.content;
        let questionData = tryParseJsonObject<ExamQuestionShape>(content);

        if (
          !questionData ||
          typeof questionData.question !== "string" ||
          !questionData.options ||
          typeof questionData.options.A !== "string" ||
          typeof questionData.options.B !== "string" ||
          typeof questionData.options.C !== "string" ||
          typeof questionData.options.D !== "string" ||
          !["A", "B", "C", "D"].includes(questionData.correctAnswer) ||
          typeof questionData.topic !== "string" ||
          typeof questionData.explanation !== "string"
        ) {
          console.warn("[Exam] Invalid LLM response, using fallback question:", content);
          questionData = shuffleExamOptions(buildFallbackExamQuestion(input.moduleId, input.questionNumber));
        }
        
        questionData = shuffleExamQuestionOptions(questionData);

        questionData = shuffleExamQuestion(questionData);

        // Format question text with options
        shuffleExamOptions(questionData);

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

        const fallback = buildFallbackExamQuestion(input.moduleId, input.questionNumber);
        const questionText = `${fallback.question}\n\nA) ${fallback.options.A}\nB) ${fallback.options.B}\nC) ${fallback.options.C}\nD) ${fallback.options.D}`;

        const savedQuestion = await saveExamQuestion({
          sessionId: input.sessionId,
          questionNumber: input.questionNumber,
          questionText,
          correctAnswer: fallback.correctAnswer,
          moduleId: input.moduleId,
          topic: fallback.topic,
          difficulty: input.difficulty as "easy" | "medium" | "hard",
          feedback: fallback.explanation,
        });

        return {
          id: savedQuestion?.id,
          question: fallback.question,
          options: fallback.options,
          questionNumber: input.questionNumber,
        };
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
