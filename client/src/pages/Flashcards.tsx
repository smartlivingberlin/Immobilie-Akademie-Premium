import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle, Loader2 } from "lucide-react";

const MODULE_NAMES: Record<number, string> = {
  1: "Einführung", 2: "Makler §34c", 3: "WEG & Mietrecht", 4: "Gutachter", 5: "Darlehen §34i",
};

export default function Flashcards() {
  const [modul, setModul] = useState(1);
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [bekannt, setBekannt] = useState<number[]>([]);
  const [unbekannt, setUnbekannt] = useState<number[]>([]);

  const { data, isLoading } = trpc.adminQuestions.list.useQuery({
    moduleId: modul, limit: 30, offset: 0,
  });

  const karten = (data?.questions || []).map(q => {
    let options = {};
    try { options = JSON.parse(q.options); } catch {}
    return {
      id: q.id,
      frage: q.questionText,
      antwort: q.correctAnswer + ": " + (options as any)[q.correctAnswer] + (q.explanation ? "\n\n" + q.explanation : ""),
      kategorie: q.category,
    };
  });

  const total = karten.length;
  const karte = karten[index];
  const fortschritt = total > 0 ? Math.round(((bekannt.length + unbekannt.length) / total) * 100) : 0;
  const fertig = total > 0 && bekannt.length + unbekannt.length >= total;

  const next = (known: boolean) => {
    if (known) setBekannt(p => [...p, index]);
    else setUnbekannt(p => [...p, index]);
    setFlip(false);
    setTimeout(() => setIndex(i => Math.min(i + 1, total - 1)), 150);
  };

  const reset = () => { setIndex(0); setFlip(false); setBekannt([]); setUnbekannt([]); };
  const changeModul = (m: number) => { setModul(m); reset(); };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 20px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Lernkarten</h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>Klicke auf die Karte zum Umdrehen — dann bewerte ob du es wusstest</p>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {[1,2,3,4,5].map(m => (
          <button key={m} onClick={() => changeModul(m)}
            style={{ padding: "6px 14px", borderRadius: 20, border: "0.5px solid", fontSize: 12, fontWeight: 500, cursor: "pointer",
              background: modul === m ? "#2563eb" : "transparent",
              color: modul === m ? "#fff" : "#64748b",
              borderColor: modul === m ? "#2563eb" : "#e2e8f0" }}>
            M{m} — {MODULE_NAMES[m]}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
          <Loader2 size={32} style={{ animation: "spin 1s linear infinite", margin: "0 auto 12px", display: "block" }} />
          <div style={{ fontSize: 14 }}>Lade Lernkarten aus Datenbank...</div>
        </div>
      ) : total === 0 ? (
        <div style={{ textAlign: "center", padding: 60, background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 16, color: "#94a3b8" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#374151" }}>Keine Fragen für Modul {modul}</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>Lade zuerst Fragen über den Admin-Bereich hoch</div>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b", marginBottom: 4 }}>
              <span>{bekannt.length + unbekannt.length} / {total} Karten · {data?.total ?? total} in DB</span>
              <span style={{ display: "flex", gap: 12 }}>
                <span style={{ color: "#059669" }}>✓ {bekannt.length} gewusst</span>
                <span style={{ color: "#dc2626" }}>✗ {unbekannt.length} nicht gewusst</span>
              </span>
            </div>
            <div style={{ height: 6, background: "#f1f5f9", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "#2563eb", borderRadius: 3, width: `${fortschritt}%`, transition: "width 0.3s" }} />
            </div>
          </div>

          {fertig ? (
            <div style={{ textAlign: "center", padding: "40px 20px", background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 16 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Alle Karten geschafft!</div>
              <div style={{ fontSize: 14, color: "#64748b", marginBottom: 20 }}>
                {bekannt.length} von {total} gewusst ({Math.round(bekannt.length / total * 100)}%)
              </div>
              <button onClick={reset} style={{ padding: "10px 24px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
                <RotateCcw size={16} /> Nochmal üben
              </button>
            </div>
          ) : karte ? (
            <div>
              <div onClick={() => setFlip(f => !f)}
                style={{ minHeight: 220, background: "#fff", border: `1.5px solid ${flip ? "#7c3aed" : "#e2e8f0"}`, borderRadius: 16, padding: "28px 24px", cursor: "pointer", transition: "border-color 0.2s", marginBottom: 16, position: "relative" }}>
                <div style={{ position: "absolute", top: 12, right: 14, fontSize: 10, color: "#94a3b8", fontWeight: 500 }}>
                  {flip ? "ANTWORT" : "FRAGE"} · {karte.kategorie}
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 12, marginTop: 8 }}>
                  Karte {index + 1} von {total}
                </div>
                {!flip ? (
                  <div style={{ fontSize: 17, fontWeight: 600, color: "#0f172a", lineHeight: 1.5 }}>{karte.frage}</div>
                ) : (
                  <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{karte.antwort}</div>
                )}
                {!flip && <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "#94a3b8" }}>Klicken zum Umdrehen</div>}
              </div>

              {flip ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <button onClick={() => next(false)}
                    style={{ padding: "12px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#dc2626" }}>
                    <XCircle size={18} /> Nicht gewusst
                  </button>
                  <button onClick={() => next(true)}
                    style={{ padding: "12px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#059669" }}>
                    <CheckCircle size={18} /> Gewusst!
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  <button onClick={() => { setFlip(false); setIndex(i => Math.max(0, i - 1)); }} disabled={index === 0}
                    style={{ padding: "8px 16px", border: "0.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748b", opacity: index === 0 ? 0.4 : 1 }}>
                    <ChevronLeft size={14} /> Zurück
                  </button>
                  <button onClick={() => { setFlip(false); setIndex(i => Math.min(i + 1, total - 1)); }} disabled={index >= total - 1}
                    style={{ padding: "8px 16px", border: "0.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748b", opacity: index >= total - 1 ? 0.4 : 1 }}>
                    Weiter <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </>
      )}
      <style>{"@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }"}</style>
    </div>
  );
}
