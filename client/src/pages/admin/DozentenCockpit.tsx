import { useState } from "react";
import { Sparkles, Loader2, Download, Users, BookOpen, Clock, AlertTriangle, CheckCircle, Eye, EyeOff } from "lucide-react";

const MODULES = [
  { id: 1, name: "Einführung in die Immobilienwirtschaft" },
  { id: 2, name: "Immobilienmakler §34c GewO" },
  { id: 3, name: "WEG-Verwaltung & Mietrecht" },
  { id: 4, name: "Gutachter & Sachverständiger" },
  { id: 5, name: "Darlehensvermittler §34i GewO" },
];

const FORMATS = [
  { id: "unterrichtsplan", label: "Unterrichtsplan (90 Min)", desc: "Vollständiger Plan mit Sprechtext, Zeitplan, Übungen" },
  { id: "zusammenfassung", label: "Kurzübersicht", desc: "Gruppenstand + Top 3 Schwachstellen + 5 Kernthemen" },
  { id: "uebungen", label: "Praxisübungen", desc: "5 maßgeschneiderte Übungen mit Musterlösungen" },
];

export default function DozentenCockpit() {
  const [moduleId, setModuleId] = useState(1);
  const [format, setFormat] = useState("unterrichtsplan");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPrivat, setShowPrivat] = useState(true);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/ai/dozenten-cockpit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, format }),
      });
      const data = await res.json();
      if (data.success) setResult(data);
      else setError(data.error || "Fehler");
    } catch { setError("Verbindungsfehler"); }
    finally { setLoading(false); }
  };

  const download = () => {
    if (!result) return;
    const text = `DOZENTEN-COCKPIT — PRIVAT\n${"=".repeat(50)}\nModul: ${result.gruppenAnalyse.moduleName}\nErstellt: ${new Date(result.generatedAt).toLocaleString("de-DE")}\n\nGRUPPEN-ANALYSE\n${"-".repeat(30)}\nAktive Lernende: ${result.gruppenAnalyse.totalNutzer}\nAbsolvierte Einheiten: ${result.gruppenAnalyse.abgesolvierteEinheiten}\nØ Lernzeit: ${result.gruppenAnalyse.durchschnittlicheZeit} Min\n\n${result.plan}`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Dozenten_Cockpit_M${moduleId}_${format}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
      {/* Header */}
      <div style={{ marginBottom: 20, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Dozenten-Cockpit</h1>
          <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>Privater Bereich — KI analysiert Lernfortschritt und erstellt Unterrichtsmaterial</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", background: "#fef3c7", borderRadius: 8, border: "0.5px solid #fcd34d" }}>
          <Eye size={14} color="#92400e" />
          <span style={{ fontSize: 11, color: "#92400e", fontWeight: 500 }}>Nur für Dozenten sichtbar</span>
        </div>
      </div>

      {/* Modul + Format Auswahl */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Modul wählen</div>
          {MODULES.map(m => (
            <div key={m.id} onClick={() => setModuleId(m.id)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, cursor: "pointer", marginBottom: 4,
                background: moduleId === m.id ? "#eff6ff" : "transparent",
                border: `0.5px solid ${moduleId === m.id ? "#2563eb" : "#e2e8f0"}` }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: moduleId === m.id ? "#2563eb" : "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: moduleId === m.id ? "#fff" : "#64748b", flexShrink: 0 }}>M{m.id}</div>
              <span style={{ fontSize: 12, color: moduleId === m.id ? "#1d4ed8" : "#374151", fontWeight: moduleId === m.id ? 500 : 400 }}>{m.name}</span>
              {moduleId === m.id && <CheckCircle size={14} color="#2563eb" style={{ marginLeft: "auto" }} />}
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Format wählen</div>
          {FORMATS.map(f => (
            <div key={f.id} onClick={() => setFormat(f.id)}
              style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 6,
                background: format === f.id ? "#faf5ff" : "transparent",
                border: `0.5px solid ${format === f.id ? "#7c3aed" : "#e2e8f0"}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: format === f.id ? "#6d28d9" : "#374151" }}>{f.label}</span>
                {format === f.id && <CheckCircle size={13} color="#7c3aed" style={{ marginLeft: "auto" }} />}
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {error && <div style={{ padding: "12px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, marginBottom: 12, color: "#991b1b", fontSize: 13 }}>{error}</div>}

      <button onClick={generate} disabled={loading}
        style={{ width: "100%", padding: 14, background: loading ? "#94a3b8" : "#7c3aed", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
        {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <Sparkles size={18} />}
        {loading ? "KI analysiert Gruppe und erstellt Plan..." : "Unterrichtsmaterial generieren"}
      </button>

      {result && (
        <div>
          {/* Gruppen-Analyse Karten */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 16 }}>
            {[
              { label: "Aktive Lernende", value: result.gruppenAnalyse.totalNutzer, icon: Users, color: "#2563eb" },
              { label: "Einheiten absolviert", value: result.gruppenAnalyse.abgesolvierteEinheiten, icon: BookOpen, color: "#059669" },
              { label: "Ø Lernzeit (Min)", value: result.gruppenAnalyse.durchschnittlicheZeit, icon: Clock, color: "#d97706" },
              { label: "Prüfungsfragen", value: result.gruppenAnalyse.prüfungsfragen, icon: CheckCircle, color: "#7c3aed" },
            ].map(s => (
              <div key={s.label} style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <s.icon size={14} color={s.color} />
                  <span style={{ fontSize: 10, color: "#94a3b8" }}>{s.label}</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Schwache Tage */}
          {result.gruppenAnalyse.schwacheTage.length > 0 && (
            <div style={{ background: "#fff7ed", border: "0.5px solid #fed7aa", borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <AlertTriangle size={14} color="#d97706" />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#92400e" }}>Schwache Lerntage — hier besteht Nachholbedarf</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {result.gruppenAnalyse.schwacheTage.map((d: any) => (
                  <span key={d.day} style={{ padding: "3px 10px", background: "#fef3c7", borderRadius: 20, fontSize: 11, color: "#92400e", fontWeight: 500 }}>
                    Tag {d.day} — {d.rate}% Abschluss
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Unterrichtsplan */}
          <div style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "0.5px solid #f1f5f9", background: "#f8fafc" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
                  {FORMATS.find(f => f.id === format)?.label} — {MODULES.find(m => m.id === moduleId)?.name}
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Erstellt: {new Date(result.generatedAt).toLocaleString("de-DE")} · Nur für Dozenten</div>
              </div>
              <button onClick={download}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "#059669", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>
                <Download size={13} /> Download
              </button>
            </div>
            <div style={{ padding: 20, fontSize: 13, color: "#374151", lineHeight: 1.9, whiteSpace: "pre-wrap", maxHeight: 600, overflowY: "auto", fontFamily: "inherit" }}>
              {result.plan}
            </div>
          </div>
        </div>
      )}
      <style>{"@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}"}</style>
    </div>
  );
}
