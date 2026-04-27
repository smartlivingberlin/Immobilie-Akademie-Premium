import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Brain, Clock, CheckCircle2, AlertCircle, ChevronRight, Trophy, RefreshCw } from "lucide-react";

const MODUL_NAMES: Record<number, string> = {
  1: "Grundkurs",
  2: "Makler § 34c",
  3: "WEG-Verwalter",
  4: "Gutachter",
  5: "§ 34i Darlehensvermittler",
};

type Phase = "liste" | "frage" | "ergebnis";

interface Ergebnis {
  punkte: number; maxPunkte: number; prozent: number;
  gut: string; fehlt: string; verbesserung: string; musterloesung: string;
}

export default function OpenQuizPage({ modulId }: { modulId: number }) {
  const [phase, setPhase] = useState<Phase>("liste");
  const [aktiveFrage, setAktiveFrage] = useState<number | null>(null);
  const [antwort, setAntwort] = useState("");
  const [ergebnis, setErgebnis] = useState<Ergebnis | null>(null);
  const [sekunden, setSekunden] = useState(0);
  const [laeuft, setLaeuft] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { data: fragen = [], isLoading } = trpc.openQuestions.getByModul.useQuery({ modulId });
  const { data: progress } = trpc.openQuestions.getProgress.useQuery({ modulId });
  const submitMut = trpc.openQuestions.submitAnswer.useMutation();

  // Timer
  useEffect(() => {
    if (laeuft) {
      timerRef.current = setInterval(() => setSekunden(s => s + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [laeuft]);

  function frageStarten(id: number) {
    setAktiveFrage(id);
    setAntwort("");
    setErgebnis(null);
    setSekunden(0);
    setLaeuft(true);
    setPhase("frage");
  }

  async function abgeben() {
    if (!aktiveFrage || antwort.trim().length < 10) return;
    setLaeuft(false);
    try {
      const res = await submitMut.mutateAsync({
        questionId: aktiveFrage,
        antwort,
        dauer: sekunden,
      });
      setErgebnis(res);
      setPhase("ergebnis");
    } catch (e) {
      alert("Fehler beim Abgeben. Bitte erneut versuchen.");
      setLaeuft(true);
    }
  }

  const aktiveFrageObj = fragen.find(f => f.id === aktiveFrage);

  // ── LISTE ─────────────────────────────────────────────────────
  if (phase === "liste") return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: "linear-gradient(135deg,#7c3aed,#2563eb)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Brain size={24} color="white" />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>
            Offene Prüfungsfragen
          </h1>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
            {MODUL_NAMES[modulId]} · Schreibe, erkläre, begründe
          </p>
        </div>
      </div>

      {/* Fortschritt */}
      {progress && (
        <div style={{
          background: "#f8fafc", border: "1px solid #e2e8f0",
          borderRadius: 12, padding: "16px 20px", marginBottom: 24,
          display: "flex", gap: 32
        }}>
          {[
            { label: "Fragen gesamt", value: progress.gesamt },
            { label: "Beantwortet", value: progress.beantwortet },
            { label: "Ø Punkte", value: `${progress.durchschnittPunkte}/10` },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#7c3aed" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Fragenliste */}
      {isLoading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Lade Fragen…</div>
      ) : fragen.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
          Noch keine Fragen für dieses Modul vorhanden.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {fragen.map((f, i) => {
            const bereitsBeantwortet = (progress as any)?.antworten?.some((a: any) => a.questionId === f.id);
            const letztePunkte = (progress as any)?.antworten?.findLast?.((a: any) => a.questionId === f.id);
            return (
              <div key={f.id} style={{
                background: "white", border: "1px solid #e2e8f0",
                borderRadius: 12, padding: "16px 20px",
                display: "flex", alignItems: "center", gap: 16,
                cursor: "pointer", transition: "all 0.15s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#7c3aed";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,58,237,0.1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                }}
                onClick={() => frageStarten(f.id)}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                  background: bereitsBeantwortet ? "#dcfce7" : "#f1f5f9",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 700,
                  color: bereitsBeantwortet ? "#16a34a" : "#475569",
                }}>
                  {bereitsBeantwortet ? "✓" : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 4, lineHeight: 1.4 }}>
                    {f.frage.length > 120 ? f.frage.slice(0, 120) + "…" : f.frage}
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: 11, background: f.schwierigkeit === "leicht" ? "#dcfce7" : f.schwierigkeit === "schwer" ? "#fee2e2" : "#fef3c7",
                      color: f.schwierigkeit === "leicht" ? "#16a34a" : f.schwierigkeit === "schwer" ? "#dc2626" : "#d97706",
                      padding: "2px 8px", borderRadius: 6, fontWeight: 600,
                    }}>{f.schwierigkeit}</span>
                    <span style={{ fontSize: 11, color: "#64748b" }}>{f.maxPunkte} Punkte</span>
                    <span style={{ fontSize: 11, color: "#64748b" }}>⏱ {f.zeitlimitMin} Min</span>
                    {f.kategorie && <span style={{ fontSize: 11, color: "#94a3b8" }}>{f.kategorie}</span>}
                    {letztePunkte && (
                      <span style={{
                        fontSize: 11, color: "#7c3aed", fontWeight: 700,
                        background: "#ede9fe", padding: "2px 8px", borderRadius: 6
                      }}>
                        Letztes Ergebnis: {letztePunkte.kiPunkte}/{f.maxPunkte}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight size={18} color="#94a3b8" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // ── FRAGE ─────────────────────────────────────────────────────
  if (phase === "frage" && aktiveFrageObj) {
    const minZeichen = 10;
    const maxZeichen = 3000;
    const bereit = antwort.trim().length >= minZeichen;
    const mm = Math.floor(sekunden / 60).toString().padStart(2, "0");
    const ss = (sekunden % 60).toString().padStart(2, "0");
    const warnung = aktiveFrageObj.zeitlimitMin * 60 - sekunden < 60;

    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
        {/* Topbar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <button onClick={() => { setLaeuft(false); setPhase("liste"); }}
            style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 13 }}>
            ← Zurück zur Liste
          </button>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: warnung ? "#fef2f2" : "#f8fafc",
            border: `1px solid ${warnung ? "#fca5a5" : "#e2e8f0"}`,
            padding: "6px 14px", borderRadius: 20,
            color: warnung ? "#dc2626" : "#374151", fontWeight: 700, fontSize: 14,
          }}>
            <Clock size={14} />
            {mm}:{ss}
          </div>
        </div>

        {/* Frage */}
        <div style={{
          background: "white", borderRadius: 16, padding: 24,
          border: "1px solid #e2e8f0", marginBottom: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
        }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 11, background: "#ede9fe", color: "#7c3aed",
              padding: "3px 10px", borderRadius: 6, fontWeight: 700
            }}>
              {aktiveFrageObj.maxPunkte} Punkte
            </span>
            <span style={{ fontSize: 11, color: "#64748b", padding: "3px 6px" }}>
              {MODUL_NAMES[modulId]}
            </span>
          </div>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", lineHeight: 1.5, margin: "0 0 16px" }}>
            {aktiveFrageObj.frage}
          </h2>
          {aktiveFrageObj.kontext && (
            <div style={{
              background: "#f0f9ff", borderLeft: "3px solid #0ea5e9",
              padding: "10px 14px", borderRadius: "0 8px 8px 0",
              fontSize: 13, color: "#0369a1", lineHeight: 1.5
            }}>
              <strong>Kontext:</strong> {aktiveFrageObj.kontext}
            </div>
          )}
        </div>

        {/* Textfeld */}
        <div style={{ background: "white", borderRadius: 16, padding: 20, border: "1px solid #e2e8f0", marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
            Deine Antwort:
          </label>
          <textarea
            value={antwort}
            onChange={e => setAntwort(e.target.value)}
            maxLength={maxZeichen}
            rows={8}
            placeholder="Schreibe deine ausführliche Antwort hier. Nutze Fachbegriffe, begründe deine Aussagen und strukturiere deine Antwort klar..."
            style={{
              width: "100%", border: `2px solid ${bereit ? "#7c3aed" : "#e2e8f0"}`,
              borderRadius: 10, padding: "12px 14px", fontSize: 14,
              lineHeight: 1.6, resize: "vertical", outline: "none",
              fontFamily: "inherit", color: "#0f172a",
              transition: "border-color 0.2s", boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 12, color: antwort.length < minZeichen ? "#f59e0b" : "#64748b" }}>
              {antwort.length < minZeichen
                ? `Noch ${minZeichen - antwort.length} Zeichen für Mindestlänge`
                : `${antwort.length}/${maxZeichen} Zeichen`}
            </span>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>
              Tipp: Strukturiere mit 1. 2. 3.
            </span>
          </div>
        </div>

        {/* Abgabe-Button */}
        <button
          onClick={abgeben}
          disabled={!bereit || submitMut.isPending}
          style={{
            width: "100%", padding: "14px",
            background: bereit && !submitMut.isPending
              ? "linear-gradient(135deg, #7c3aed, #2563eb)"
              : "#e2e8f0",
            color: bereit ? "white" : "#94a3b8",
            border: "none", borderRadius: 12, fontSize: 15,
            fontWeight: 700, cursor: bereit ? "pointer" : "not-allowed",
            transition: "all 0.2s",
          }}
        >
          {submitMut.isPending ? "⏳ KI bewertet deine Antwort…" : "Antwort abgeben & KI-Feedback erhalten →"}
        </button>
      </div>
    );
  }

  // ── ERGEBNIS ──────────────────────────────────────────────────
  if (phase === "ergebnis" && ergebnis) {
    const pct = ergebnis.prozent;
    const note = pct >= 90 ? "Sehr gut" : pct >= 75 ? "Gut" : pct >= 60 ? "Befriedigend" : pct >= 50 ? "Ausreichend" : "Ungenügend";
    const farbe = pct >= 75 ? "#16a34a" : pct >= 50 ? "#d97706" : "#dc2626";
    const bgFarbe = pct >= 75 ? "#dcfce7" : pct >= 50 ? "#fef3c7" : "#fee2e2";

    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
        {/* Score */}
        <div style={{
          background: bgFarbe, border: `2px solid ${farbe}`,
          borderRadius: 16, padding: "28px 24px", marginBottom: 20, textAlign: "center"
        }}>
          <div style={{ fontSize: 56, fontWeight: 900, color: farbe, lineHeight: 1 }}>
            {ergebnis.punkte}/{ergebnis.maxPunkte}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: farbe, marginTop: 4 }}>
            {note} · {pct}%
          </div>
          <div style={{ fontSize: 13, color: "#64748b", marginTop: 6 }}>
            ⏱ {Math.floor(sekunden / 60)}:{String(sekunden % 60).padStart(2, "0")} Minuten
          </div>
        </div>

        {/* KI-Feedback */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
          {[
            { icon: <CheckCircle2 size={18} color="#16a34a" />, titel: "Was gut war", text: ergebnis.gut, bg: "#f0fdf4", border: "#bbf7d0" },
            { icon: <AlertCircle size={18} color="#d97706" />, titel: "Was fehlt / Fehler", text: ergebnis.fehlt, bg: "#fffbeb", border: "#fde68a" },
            { icon: <Brain size={18} color="#7c3aed" />, titel: "Verbesserungsvorschlag", text: ergebnis.verbesserung, bg: "#faf5ff", border: "#ddd6fe" },
          ].map(item => (
            <div key={item.titel} style={{
              background: item.bg, border: `1px solid ${item.border}`,
              borderRadius: 12, padding: "14px 18px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontWeight: 700, fontSize: 14, color: "#0f172a" }}>
                {item.icon} {item.titel}
              </div>
              <p style={{ margin: 0, fontSize: 14, color: "#374151", lineHeight: 1.6 }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Musterlösung */}
        <details style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, marginBottom: 20 }}>
          <summary style={{ padding: "14px 18px", cursor: "pointer", fontWeight: 700, fontSize: 14, color: "#374151" }}>
            📋 Musterlösung anzeigen
          </summary>
          <div style={{ padding: "0 18px 14px", fontSize: 14, color: "#374151", lineHeight: 1.7, borderTop: "1px solid #f1f5f9" }}>
            <div style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>{ergebnis.musterloesung}</div>
          </div>
        </details>

        {/* Aktionen */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => { setPhase("liste"); setErgebnis(null); }}
            style={{
              flex: 1, padding: "12px", background: "#f1f5f9",
              color: "#374151", border: "none", borderRadius: 10,
              fontSize: 14, fontWeight: 600, cursor: "pointer"
            }}
          >
            ← Zur Fragenliste
          </button>
          <button
            onClick={() => aktiveFrage && frageStarten(aktiveFrage)}
            style={{
              flex: 1, padding: "12px",
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              color: "white", border: "none", borderRadius: 10,
              fontSize: 14, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6
            }}
          >
            <RefreshCw size={14} /> Nochmal versuchen
          </button>
        </div>
      </div>
    );
  }

  return null;
}
