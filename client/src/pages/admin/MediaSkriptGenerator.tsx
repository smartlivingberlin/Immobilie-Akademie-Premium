import { FullscreenContent } from "@/components/FullscreenContent";
import { useState } from "react";
import { Sparkles, Loader2, Download, Copy, CheckCircle, Mic, Video, Radio, FileText, ExternalLink } from "lucide-react";

const MODULES = [
  { id: 1, name: "Einführung Immobilienwirtschaft" },
  { id: 2, name: "Makler §34c GewO" },
  { id: 3, name: "WEG & Mietrecht" },
  { id: 4, name: "Gutachter & Sachverständiger" },
  { id: 5, name: "Darlehen §34i GewO" },
];

const THEMEN: Record<number, string[]> = {
  1: ["Was ist eine Immobilie?", "Grundbuch einfach erklärt", "Marktakteure in der Immobilienwirtschaft", "Verkehrswert vs. Kaufpreis"],
  2: ["§34c GewO — Wie werde ich Makler?", "Bestellerprinzip einfach erklärt", "Maklervertrag — Alleinauftrag vs. einfacher Auftrag", "GwG — Geldwäsche im Makleralltag", "Exposé-Pflichten nach GEG"],
  3: ["Sondereigentum vs. Gemeinschaftseigentum", "WEG-Reform 2020 — Was hat sich geändert?", "Nebenkostenabrechnung richtig prüfen", "Mieterhöhung — was ist erlaubt?"],
  4: ["Die 3 Wertermittlungsverfahren im Vergleich", "Ertragswertverfahren Schritt für Schritt", "Bodenrichtwerte — wo findet man sie?", "Gutachterausschuss — was macht er?"],
  5: ["Annuitätendarlehen einfach erklärt", "KfW-Förderung 2025 — Was gibt es?", "Grundschuld vs. Hypothek", "Vorfälligkeitsentschädigung — wann fällt sie an?"],
};

const FORMATE = [
  { id: "podcast", label: "NotebookLM Podcast", icon: Radio, color: "#7c3aed", desc: "Optimiert für NotebookLM Audio Overview — 2 Sprecher, 8-12 Min, Deep Dive Format", badge: "Für NotebookLM" },
  { id: "videoskript", label: "Video mit echter Stimme", icon: Video, color: "#dc2626", desc: "Professionelles Sprechtextskript mit Szenenanweisungen, Pausen, Einblendungen", badge: "Für Menschen" },
  { id: "synthesia", label: "KI-Avatar Video", icon: Mic, color: "#059669", desc: "Optimiert für Synthesia/HeyGen — kurze Sätze, klare Struktur, KI-Stimmen-freundlich", badge: "Für Synthesia" },
  { id: "zusammenfassung", label: "Kurzzusammenfassung", icon: FileText, color: "#d97706", desc: "500 Wörter — für alle 3 Formate nutzbar, Social Media, Teaser-Videos", badge: "Universal" },
];

export default function MediaSkriptGenerator() {
  const [moduleId, setModuleId] = useState(2);
  const [thema, setThema] = useState("");
  const [customThema, setCustomThema] = useState("");
  const [format, setFormat] = useState("podcast");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const aktivesThema = thema || customThema;

  const generate = async () => {
    if (!aktivesThema) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/ai/generate-mediaskript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, thema: aktivesThema, format }),
      });
      const data = await res.json();
      if (data.success) setResult(data);
      else setError(data.error || "Fehler");
    } catch { setError("Verbindungsfehler"); }
    finally { setLoading(false); }
  };

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.skript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    if (!result) return;
    const blob = new Blob([result.skript], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Skript_M${moduleId}_${aktivesThema.replace(/[^a-zA-Z0-9]/g, "_").slice(0,30)}_${format}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const FORMAT_COLORS: Record<string, string> = {
    podcast: "#7c3aed", videoskript: "#dc2626", synthesia: "#059669", zusammenfassung: "#d97706"
  };

  return (
    <div style={{ maxWidth: 950, margin: "0 auto", padding: "24px 20px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Mediaskript-Generator</h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>KI schreibt optimierte Skripte für NotebookLM-Podcast, echte Video-Aufnahmen und KI-Avatar-Videos</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        {/* Modul */}
        <div style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 12, padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>1. Modul wählen</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {MODULES.map(m => (
              <div key={m.id} onClick={() => { setModuleId(m.id); setThema(""); }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 7, cursor: "pointer",
                  background: moduleId === m.id ? "#eff6ff" : "transparent",
                  border: `0.5px solid ${moduleId === m.id ? "#2563eb" : "#e2e8f0"}` }}>
                <div style={{ width: 22, height: 22, borderRadius: 5, background: moduleId === m.id ? "#2563eb" : "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: moduleId === m.id ? "#fff" : "#64748b", flexShrink: 0 }}>M{m.id}</div>
                <span style={{ fontSize: 12, color: moduleId === m.id ? "#1d4ed8" : "#374151" }}>{m.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Thema */}
        <div style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 12, padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>2. Thema wählen</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 8 }}>
            {(THEMEN[moduleId] || []).map(t => (
              <div key={t} onClick={() => { setThema(t); setCustomThema(""); }}
                style={{ padding: "6px 10px", borderRadius: 7, cursor: "pointer", fontSize: 12,
                  background: thema === t ? "#faf5ff" : "transparent",
                  border: `0.5px solid ${thema === t ? "#7c3aed" : "#e2e8f0"}`,
                  color: thema === t ? "#6d28d9" : "#374151" }}>
                {t}
              </div>
            ))}
          </div>
          <input
            value={customThema}
            onChange={e => { setCustomThema(e.target.value); setThema(""); }}
            placeholder="Eigenes Thema eingeben..."
            style={{ width: "100%", padding: "7px 10px", border: "0.5px solid #e2e8f0", borderRadius: 7, fontSize: 12 }}
          />
        </div>
      </div>

      {/* Format */}
      <div style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 12, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>3. Ausgabeformat wählen</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
          {FORMATE.map(f => (
            <div key={f.id} onClick={() => setFormat(f.id)}
              style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", border: `0.5px solid ${format === f.id ? f.color : "#e2e8f0"}`,
                background: format === f.id ? f.color + "10" : "#fafafa" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <f.icon size={14} color={f.color} />
                <span style={{ fontSize: 11, fontWeight: 600, color: format === f.id ? f.color : "#374151" }}>{f.label}</span>
              </div>
              <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.4 }}>{f.desc}</div>
              <div style={{ marginTop: 6, fontSize: 9, padding: "1px 6px", background: f.color + "20", color: f.color, borderRadius: 10, display: "inline-block", fontWeight: 500 }}>{f.badge}</div>
            </div>
          ))}
        </div>
      </div>

      {error && <div style={{ padding: "12px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, marginBottom: 12, color: "#991b1b", fontSize: 13 }}>{error}</div>}

      <button onClick={generate} disabled={loading || !aktivesThema}
        style={{ width: "100%", padding: 14, background: loading || !aktivesThema ? "#94a3b8" : FORMAT_COLORS[format] || "#7c3aed", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: loading || !aktivesThema ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
        {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <Sparkles size={18} />}
        {loading ? "KI schreibt Skript... (30-60 Sekunden)" : !aktivesThema ? "Bitte erst Thema wählen" : `${FORMATE.find(f => f.id === format)?.label} generieren`}
      </button>

      {result && (
        <div style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "0.5px solid #f1f5f9", background: "#f8fafc" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{result.thema}</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>
                {FORMATE.find(f => f.id === result.format)?.label} · Modul {result.moduleId} · {result.wordCount} Wörter · ca. {Math.round(result.wordCount / 130)} Min Sprechzeit
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={copy}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: copied ? "#059669" : "#2563eb", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>
                {copied ? <CheckCircle size={13} /> : <Copy size={13} />}
                {copied ? "Kopiert!" : "Kopieren"}
              </button>
              <button onClick={download}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "#374151", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>
                <Download size={13} /> Download
              </button>
              {result.format === "podcast" && (
                <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "#7c3aed", color: "#fff", borderRadius: 8, fontSize: 12, textDecoration: "none" }}>
                  <ExternalLink size={13} /> In NotebookLM öffnen
                </a>
              )}
            </div>
          </div>

          {/* Anleitung je nach Format */}
          {result.format === "podcast" && (
            <div style={{ padding: "10px 16px", background: "#faf5ff", borderBottom: "0.5px solid #e9d5ff", fontSize: 12, color: "#6d28d9" }}>
              📋 <strong>Nächste Schritte:</strong> Text kopieren → notebooklm.google.com öffnen → Neues Notebook → Text einfügen → "Audio Overview" klicken → Deep Dive wählen → Generieren
            </div>
          )}
          {result.format === "videoskript" && (
            <div style={{ padding: "10px 16px", background: "#fef2f2", borderBottom: "0.5px solid #fecaca", fontSize: 12, color: "#dc2626" }}>
              🎬 <strong>Nächste Schritte:</strong> Skript ausdrucken → Teleprompter-App öffnen → Text einfügen → Kamera aufbauen → [SZENE] Anweisungen befolgen
            </div>
          )}
          {result.format === "synthesia" && (
            <div style={{ padding: "10px 16px", background: "#f0fdf4", borderBottom: "0.5px solid #bbf7d0", fontSize: 12, color: "#059669" }}>
              🤖 <strong>Nächste Schritte:</strong> Text kopieren → synthesia.io öffnen → Avatar wählen → Text einfügen → Video generieren (VISUALS: Hinweise für Folien nutzen)
            </div>
          )}

          {/* Vollbild */}
            <div style={{ padding: "8px 16px", borderBottom: "0.5px solid #f1f5f9" }}>
              <FullscreenContent
                title={result.thema + " — " + FORMATE.find(f => f.id === result.format)?.label}
                content={<div style={{ whiteSpace: "pre-wrap", lineHeight: 1.9, fontSize: 15, fontFamily: "monospace" }}>{result.skript}</div>}
              />
            </div>
            {/* Skript-Text */}
          <div style={{ padding: 20, fontSize: 13, color: "#374151", lineHeight: 1.9, whiteSpace: "pre-wrap", maxHeight: 600, overflowY: "auto", fontFamily: "monospace, monospace" }}>
            {result.skript}
          </div>
        </div>
      )}

      <style>{"@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}"}</style>
    </div>
  );
}
