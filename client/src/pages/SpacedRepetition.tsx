import { useState, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

// ── Typen ────────────────────────────────────────────────────
interface SRCard {
  questionId: number;
  easinessFactor: number;
  interval: number;
  repetitions: number;
}

interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  moduleId?: number;
}

// ── Flip-Karte ───────────────────────────────────────────────
function FlipCard({ card, question, onAnswer }: {
  card: SRCard;
  question: Question;
  onAnswer: (grade: number) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (grade: number) => {
    setAnswered(true);
    setTimeout(() => {
      onAnswer(grade);
      setFlipped(false);
      setAnswered(false);
    }, 300);
  };

  return (
    <div style={{ perspective: 1000, width: "100%", maxWidth: 560, margin: "0 auto" }}>
      <div style={{
        position: "relative", width: "100%", height: 280,
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}>
        {/* Vorderseite */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          background: "white",
          border: "2px solid #e2e8f0",
          borderRadius: 20,
          padding: 28,
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }}>
          <div style={{
            background: "#dbeafe", color: "#1d4ed8",
            fontSize: 11, fontWeight: 700, padding: "4px 12px",
            borderRadius: 100, alignSelf: "flex-start",
            letterSpacing: "0.05em",
          }}>
            FRAGE
          </div>
          <p style={{
            fontSize: 17, fontWeight: 600, color: "#0f172a",
            lineHeight: 1.6, textAlign: "center", flex: 1,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px 0",
          }}>
            {question.questionText}
          </p>
          <button
            onClick={() => setFlipped(true)}
            style={{
              background: "linear-gradient(135deg, #2563eb, #4f46e5)",
              color: "white", border: "none", borderRadius: 12,
              padding: "12px 24px", fontSize: 14, fontWeight: 700,
              cursor: "pointer", width: "100%",
              boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Antwort anzeigen →
          </button>
        </div>

        {/* Rückseite */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: "white",
          border: "2px solid #e2e8f0",
          borderRadius: 20,
          padding: 28,
          display: "flex", flexDirection: "column", gap: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }}>
          <div style={{
            background: "#dcfce7", color: "#15803d",
            fontSize: 11, fontWeight: 700, padding: "4px 12px",
            borderRadius: 100, alignSelf: "flex-start",
          }}>
            ANTWORT
          </div>
          <div style={{
            background: "#f0fdf4", border: "1px solid #bbf7d0",
            borderRadius: 12, padding: "12px 16px", flex: 1,
          }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#15803d", margin: "0 0 6px" }}>
              ✓ {question.correctAnswer}
            </p>
            {question.explanation && (
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, margin: 0 }}>
                {question.explanation}
              </p>
            )}
          </div>

          {/* Bewertungs-Buttons */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              { grade: 0, label: "🔁 Nochmal", bg: "#fee2e2", color: "#dc2626", border: "#fca5a5" },
              { grade: 3, label: "👍 Gut", bg: "#fef3c7", color: "#d97706", border: "#fde68a" },
              { grade: 5, label: "⚡ Einfach", bg: "#dcfce7", color: "#15803d", border: "#86efac" },
            ].map(({ grade, label, bg, color, border }) => (
              <button
                key={grade}
                onClick={() => handleAnswer(grade)}
                disabled={answered}
                style={{
                  background: bg, color, border: `2px solid ${border}`,
                  borderRadius: 10, padding: "10px 4px",
                  fontSize: 12, fontWeight: 700, cursor: "pointer",
                  transition: "all 0.15s ease", opacity: answered ? 0.5 : 1,
                }}
                onMouseEnter={e => !answered && (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Haupt-Komponente ─────────────────────────────────────────
export default function SpacedRepetitionDashboard() {
  const [cards, setCards] = useState<SRCard[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sessionDone, setSessionDone] = useState(false);
  const [answered, setAnswered] = useState(0);

  useEffect(() => {
    loadDueCards();
  }, []);

  const loadDueCards = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sr/due", { credentials: "include" });
      if (!res.ok) throw new Error("Nicht eingeloggt");
      const data = await res.json();
      setCards(data.questions || []);

      // Fragen laden
      if (data.questions?.length > 0) {
        const ids = data.questions.map((c: SRCard) => c.questionId).join(",");
        const qRes = await fetch(`/api/quiz/questions-by-ids?ids=${ids}`,
          { credentials: "include" });
        if (qRes.ok) {
          const qData = await qRes.json();
          setQuestions(qData.questions || []);
        }
      }
    } catch (e) {
      console.error("SR laden fehlgeschlagen:", e);
    }
    setLoading(false);
  };

  const handleAnswer = async (grade: number) => {
    const card = cards[currentIdx];
    if (!card) return;
    try {
      await fetch("/api/sr/answer", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: card.questionId, quality: grade }),
      });
    } catch (e) { /* silent */ }

    setAnswered(a => a + 1);
    if (currentIdx + 1 >= cards.length) {
      setSessionDone(true);
    } else {
      setCurrentIdx(i => i + 1);
    }
  };

  const currentCard = cards[currentIdx];
  const currentQuestion = questions.find(q => q.id === currentCard?.questionId);
  const progress = cards.length > 0 ? Math.round((answered / cards.length) * 100) : 0;

  // ── Loading ───────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
        minHeight: "60vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 48, height: 48, border: "3px solid #dbeafe",
            borderTop: "3px solid #2563eb", borderRadius: "50%",
            animation: "spin 1s linear infinite", margin: "0 auto 16px",
          }} />
          <p style={{ color: "#64748b", fontSize: 14 }}>Karten werden geladen...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Keine Karten fällig ───────────────────────────────────
  if (cards.length === 0) {
    return (
      <div style={{ padding: "48px 24px", maxWidth: 560, margin: "0 auto", textAlign: "center",
        fontFamily: "'Inter', sans-serif" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", margin: "0 0 12px" }}>
          Alles erledigt!
        </h2>
        <p style={{ color: "#64748b", fontSize: 15, marginBottom: 32 }}>
          Heute keine fälligen Wiederholungen. Super gemacht!
        </p>
        <div style={{
          background: "#f0fdf4", border: "1px solid #bbf7d0",
          borderRadius: 16, padding: 24, marginBottom: 32,
        }}>
          <p style={{ color: "#15803d", fontWeight: 600, margin: 0 }}>
            ✓ Alle Karten für heute wiederholt
          </p>
          <p style={{ color: "#64748b", fontSize: 13, margin: "6px 0 0" }}>
            Nächste Wiederholung morgen
          </p>
        </div>
        <Link href="/quiz">
          <a style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #2563eb, #4f46e5)",
            color: "white", padding: "12px 28px", borderRadius: 12,
            fontSize: 14, fontWeight: 700, textDecoration: "none",
          }}>
            Neue Fragen üben →
          </a>
        </Link>
      </div>
    );
  }

  // ── Session abgeschlossen ─────────────────────────────────
  if (sessionDone) {
    return (
      <div style={{ padding: "48px 24px", maxWidth: 560, margin: "0 auto", textAlign: "center",
        fontFamily: "'Inter', sans-serif" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", margin: "0 0 12px" }}>
          Session abgeschlossen!
        </h2>
        <p style={{ color: "#64748b", fontSize: 15, marginBottom: 32 }}>
          Du hast {answered} Karte{answered !== 1 ? "n" : ""} wiederholt.
        </p>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 16, marginBottom: 32,
        }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0",
            borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#15803d" }}>{answered}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Karten wiederholt</div>
          </div>
          <div style={{ background: "#dbeafe", border: "1px solid #93c5fd",
            borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#2563eb" }}>100%</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Session fertig</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => { setCurrentIdx(0); setAnswered(0);
              setSessionDone(false); loadDueCards(); }}
            style={{
              background: "white", border: "2px solid #2563eb",
              color: "#2563eb", padding: "12px 24px", borderRadius: 12,
              fontSize: 14, fontWeight: 700, cursor: "pointer",
            }}>
            Nochmal →
          </button>
          <Link href="/statistiken">
            <a style={{
              background: "linear-gradient(135deg, #2563eb, #4f46e5)",
              color: "white", padding: "12px 24px", borderRadius: 12,
              fontSize: 14, fontWeight: 700, textDecoration: "none",
            }}>
              Zum Dashboard
            </a>
          </Link>
        </div>
      </div>
    );
  }

  // ── Aktive Session ────────────────────────────────────────
  return (
    <div style={{ padding: "32px 24px", maxWidth: 640, margin: "0 auto",
      fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a",
              margin: "0 0 4px", letterSpacing: "-0.02em" }}>
              🔁 Wiederholung
            </h1>
            <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>
              {currentIdx + 1} von {cards.length} Karten
            </p>
          </div>
          <div style={{
            background: "#dbeafe", color: "#2563eb",
            fontSize: 13, fontWeight: 700, padding: "6px 14px",
            borderRadius: 100,
          }}>
            {cards.length} fällig
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ height: 8, background: "#f1f5f9", borderRadius: 100, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: "linear-gradient(90deg, #2563eb, #7c3aed)",
            borderRadius: 100,
            transition: "width 0.5s ease",
          }} />
        </div>
      </div>

      {/* Karte */}
      {currentQuestion ? (
        <FlipCard
          card={currentCard}
          question={currentQuestion}
          onAnswer={handleAnswer}
        />
      ) : (
        <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
          <p>Frage wird geladen...</p>
        </div>
      )}

      {/* Info */}
      <div style={{
        marginTop: 24, display: "flex", gap: 12,
        justifyContent: "center", flexWrap: "wrap",
      }}>
        {[
          { label: "🔁 Nochmal", desc: "Heute nochmal üben" },
          { label: "👍 Gut", desc: "In einigen Tagen" },
          { label: "⚡ Einfach", desc: "Erst in Wochen" },
        ].map(({ label, desc }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#475569" }}>{label}</div>
            <div style={{ fontSize: 10, color: "#94a3b8" }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
