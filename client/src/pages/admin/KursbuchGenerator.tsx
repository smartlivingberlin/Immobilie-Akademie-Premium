import { scaledFontSize as fz } from "@/lib/a11yFont";
import { useState } from "react";
import { Loader2, Download, CheckCircle, Sparkles } from "lucide-react";

const MODULES = [
  { id: 1, title: "Modul 1 — Einführung in die Immobilienwirtschaft", days: 20 },
  { id: 2, title: "Modul 2 — Makler §34c GewO", days: 60 },
  { id: 3, title: "Modul 3 — WEG & Mietrecht Verwaltung", days: 80 },
  { id: 4, title: "Modul 4 — Gutachter & Sachverständiger", days: 40 },
  { id: 5, title: "Modul 5 — Darlehensvermittler §34i GewO", days: 40 },
];

const FORMATS = [
  { id: "kursbuch", label: "Kursbuch", desc: "Vollständiges Lernbuch mit Kapiteln und Beispielen", icon: "📖" },
  { id: "zusammenfassung", label: "Zusammenfassung", desc: "Kompakte Übersicht der wichtigsten Inhalte", icon: "📄" },
  { id: "skript", label: "Prüfungsskript", desc: "Fragen, Antworten, Paragraphen für IHK", icon: "📝" },
];

type GenResult = {
  content: string;
  moduleTitle: string;
  format: string;
  fromCache?: boolean;
  pipelined?: boolean;
  daysCovered?: number;
  daysExtracted?: number;
  incompleteBlocks?: number;
};

export default function KursbuchGenerator() {
  const [selectedModule, setSelectedModule] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState("kursbuch");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [result, setResult] = useState<GenResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadDraft = async () => {
    setLoading(true);
    setProgress("Portal-Inhalte werden extrahiert…");
    setError(null);
    setResult(null);
    const mod = MODULES.find(m => m.id === selectedModule)!;
    try {
      const res = await fetch("/api/learning/kursbuch-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId: selectedModule, format: selectedFormat }),
      });
      const data = await res.json();
      if (data.success) {
        setResult({
          content: data.content,
          moduleTitle: data.moduleName || mod.title,
          format: selectedFormat,
          fromCache: false,
          daysExtracted: data.daysExtracted,
        });
      } else setError(data.error || "Fehler");
    } catch { setError("Verbindungsfehler"); }
    finally { setLoading(false); setProgress(null); }
  };

  const generatePipeline = async (forceRegenerate = false) => {
    setLoading(true);
    const mod = MODULES.find(m => m.id === selectedModule)!;
    setProgress(`KI-Pipeline: ${mod.days} Lerntage werden verarbeitet (1 Tag = 1 Job, kann 5–15 Min. dauern)…`);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/ai/generate-kursbuch-pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId: selectedModule, format: selectedFormat, forceRegenerate }),
      });
      const data = await res.json();
      if (data.success) {
        setResult({
          content: data.content,
          moduleTitle: data.moduleName || mod.title,
          format: selectedFormat,
          fromCache: Boolean(data.fromCache),
          pipelined: true,
          daysCovered: data.daysCovered,
          daysExtracted: data.daysExtracted,
          incompleteBlocks: data.incompleteBlocks,
        });
      } else setError(data.error || "Fehler");
    } catch { setError("Verbindungsfehler — bei langen Modulen ggf. erneut versuchen"); }
    finally { setLoading(false); setProgress(null); }
  };

  const download = () => {
    if (!result) return;
    const blob = new Blob([result.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.moduleTitle.replace(/[^a-zA-Z0-9]/g, "_")}_${result.format}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resultLabel = () => {
    if (result?.pipelined) {
      const warn = (result.incompleteBlocks ?? 0) > 0 ? ` · ${result.incompleteBlocks} Block(e) ggf. gekürzt` : "";
      return `(KI-Pipeline · ${result.daysCovered ?? "?"}/${result.daysExtracted ?? "?"} Tage${warn})`;
    }
    if (result?.fromCache) return "(Portal-Inhalt)";
    return "(KI generiert)";
  };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 20px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: fz(24), fontWeight: 700, color: "#0f172a", margin: 0 }}>Kursbuch-Generator</h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: fz(14) }}>
          Entwurf (0 €, alle Tage) oder KI-Pipeline (1 Tag = 1 Job, vollständig)
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: fz(11), fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Modul wählen</div>
          {MODULES.map(m => (
            <div key={m.id} onClick={() => setSelectedModule(m.id)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 4,
                background: selectedModule === m.id ? "#eff6ff" : "transparent",
                border: `0.5px solid ${selectedModule === m.id ? "#2563eb" : "#e2e8f0"}` }}>
              <div style={{ width: 26, height: 26, borderRadius: 6, background: selectedModule === m.id ? "#2563eb" : "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: fz(11), fontWeight: 700, color: selectedModule === m.id ? "#fff" : "#64748b", flexShrink: 0 }}>M{m.id}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: fz(12), fontWeight: 500, color: selectedModule === m.id ? "#1d4ed8" : "#374151" }}>{m.title.split("—")[1]?.trim()}</div>
                <div style={{ fontSize: fz(10), color: "#94a3b8" }}>{m.days} Lerntage</div>
              </div>
              {selectedModule === m.id && <CheckCircle size={14} color="#2563eb" />}
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: fz(11), fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Format wählen</div>
          {FORMATS.map(f => (
            <div key={f.id} onClick={() => setSelectedFormat(f.id)}
              style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 6,
                background: selectedFormat === f.id ? "#faf5ff" : "transparent",
                border: `0.5px solid ${selectedFormat === f.id ? "#7c3aed" : "#e2e8f0"}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: fz(18) }}>{f.icon}</span>
                <span style={{ fontSize: fz(13), fontWeight: 500, color: selectedFormat === f.id ? "#6d28d9" : "#374151" }}>{f.label}</span>
                {selectedFormat === f.id && <CheckCircle size={14} color="#7c3aed" style={{ marginLeft: "auto" }} />}
              </div>
              <div style={{ fontSize: fz(11), color: "#94a3b8" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {error && <div style={{ padding: "12px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, marginBottom: 12, color: "#991b1b", fontSize: fz(13) }}>{error}</div>}

      {progress && (
        <div style={{ padding: "10px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, marginBottom: 12, color: "#1d4ed8", fontSize: fz(13), display: "flex", alignItems: "center", gap: 8 }}>
          <Loader2 size={16} style={{ animation: "spin 1s linear infinite", flexShrink: 0 }} />
          {progress}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <button onClick={loadDraft} disabled={loading}
          style={{ flex: 1, minWidth: 200, padding: 14, background: loading ? "#94a3b8" : "#059669", color: "#fff", border: "none", borderRadius: 12, fontSize: fz(14), fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <Download size={18} />}
          {loading ? "Lädt..." : "Entwurf (0 €, alle Tage)"}
        </button>
        <button onClick={() => generatePipeline(true)} disabled={loading}
          style={{ flex: 1, minWidth: 200, padding: 14, background: loading ? "#94a3b8" : "#2563eb", color: "#fff", border: "none", borderRadius: 12, fontSize: fz(14), fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <Sparkles size={18} />}
          {loading ? "KI-Pipeline läuft…" : "KI-Pipeline (vollständig)"}
        </button>
      </div>
      <p style={{ fontSize: fz(12), color: "#64748b", margin: "-8px 0 16px" }}>
        Grün: Roh-Markdown aus allen Lerntagen. Blau: KI verarbeitet jeden Tag einzeln mit Fortsetzung bei Token-Limit.
      </p>

      {result && (
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid #f1f5f9" }}>
            <CheckCircle size={16} color="#059669" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: fz(13), fontWeight: 600, color: "#374151" }}>{result.moduleTitle}</div>
              <div style={{ fontSize: fz(11), color: "#94a3b8" }}>
                {result.content.length.toLocaleString()} Zeichen {resultLabel()}
              </div>
            </div>
            <button onClick={download} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "#059669", color: "#fff", border: "none", borderRadius: 8, fontSize: fz(12), fontWeight: 500, cursor: "pointer" }}>
              <Download size={13} /> Download (.md)
            </button>
          </div>
          <div style={{ padding: 20, fontSize: fz(13), color: "#374151", lineHeight: 1.8, whiteSpace: "pre-wrap", maxHeight: 550, overflowY: "auto", fontFamily: "monospace, monospace" }}>
            {result.content}
          </div>
        </div>
      )}
      <style>{"@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }"}</style>
    </div>
  );
}
