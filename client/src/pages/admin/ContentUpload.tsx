import { useState, useRef } from "react";
import { Upload, FileText, Music, Film, CheckCircle, AlertCircle, Loader2, Trash2, BookOpen, FileQuestion, Sparkles, Database } from "lucide-react";

interface AnalysisResult {
  filename: string;
  analysis: string;
  textLength: number;
}

interface GenResult {
  filename: string;
  saved: number;
  moduleId: number;
}

const ACCEPTED = ".pdf,.docx,.pptx,.xlsx,.txt,.md,.mp3,.wav,.webm,.m4a,.odt,.png,.jpg,.jpeg";
const MODULE_NAMES: Record<number, string> = {
  1: "Einführung",
  2: "Makler §34c",
  3: "WEG & Mietrecht",
  4: "Gutachter",
  5: "Darlehen §34i",
};

export default function ContentUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [genLoading, setGenLoading] = useState<string | null>(null);
  const [genResults, setGenResults] = useState<GenResult[]>([]);
  const [selectedModule, setSelectedModule] = useState(1);
  const [questionCount, setQuestionCount] = useState(15);
  const fileRef = useRef<HTMLInputElement>(null);

  const getIcon = (name: string) => {
    if (name.match(/\.(mp3|wav|webm|m4a|ogg)$/i)) return <Music size={16} color="#7c3aed" />;
    if (name.match(/\.(mp4|avi|mov)$/i)) return <Film size={16} color="#dc2626" />;
    return <FileText size={16} color="#2563eb" />;
  };

  const analyze = async (file: File) => {
    setLoading(file.name);
    setError(null);
    try {
      const res = await fetch("/api/ai/analyze-document", {
        method: "POST",
        headers: { "Content-Type": file.type || "application/octet-stream", "x-filename": file.name },
        body: file,
      });
      const data = await res.json();
      if (data.analysis) {
        setResults(p => [...p, { filename: file.name, analysis: data.analysis, textLength: data.textLength || 0 }]);
        setFiles(p => p.filter(f => f.name !== file.name));
      } else {
        setError(data.error || "Fehler bei der Analyse");
      }
    } catch {
      setError("Verbindungsfehler");
    } finally {
      setLoading(null);
    }
  };

  const generateQuestions = async (analysisText: string, filename: string) => {
    setGenLoading(filename);
    setError(null);
    try {
      const res = await fetch("/api/ai/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: analysisText,
          moduleId: selectedModule,
          category: MODULE_NAMES[selectedModule],
          count: questionCount,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGenResults(p => [...p, { filename, saved: data.saved, moduleId: data.moduleId }]);
      } else {
        setError(data.error || "Fehler beim Generieren");
      }
    } catch {
      setError("Verbindungsfehler beim Generieren");
    } finally {
      setGenLoading(null);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Content Upload & KI-Analyse</h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>
          Lernmaterial hochladen → KI analysiert → Prüfungsfragen automatisch generieren und speichern
        </p>
      </div>

      {/* Upload Zone */}
      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = "#2563eb"; e.currentTarget.style.background = "#eff6ff"; }}
        onDragLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc"; }}
        onDrop={e => {
          e.preventDefault();
          e.currentTarget.style.borderColor = "#e2e8f0";
          e.currentTarget.style.background = "#f8fafc";
          setFiles(p => [...p, ...Array.from(e.dataTransfer.files)]);
        }}
        style={{ border: "2px dashed #e2e8f0", borderRadius: 16, padding: "36px 20px", textAlign: "center", cursor: "pointer", background: "#f8fafc", transition: "all 0.2s", marginBottom: 16 }}>
        <Upload size={36} color="#94a3b8" style={{ margin: "0 auto 10px" }} />
        <div style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Dateien hierher ziehen oder klicken</div>
        <div style={{ fontSize: 12, color: "#94a3b8" }}>PDF · DOCX · PPTX · TXT · MP3 · WAV · PNG · JPG</div>
        <input ref={fileRef} type="file" multiple accept={ACCEPTED} style={{ display: "none" }}
          onChange={e => { if (e.target.files) setFiles(p => [...p, ...Array.from(e.target.files!)]); e.target.value = ""; }} />
      </div>

      {/* Modul + Anzahl Auswahl */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Fragen speichern in Modul:</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {[1,2,3,4,5].map(m => (
            <button key={m} onClick={() => setSelectedModule(m)}
              style={{ padding: "6px 14px", borderRadius: 20, border: "0.5px solid", fontSize: 12, fontWeight: 500, cursor: "pointer",
                background: selectedModule === m ? "#2563eb" : "transparent",
                color: selectedModule === m ? "#fff" : "#64748b",
                borderColor: selectedModule === m ? "#2563eb" : "#e2e8f0" }}>
              M{m} — {MODULE_NAMES[m]}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>Anzahl Fragen pro Analyse:</span>
          {[10, 15, 20, 25].map(n => (
            <button key={n} onClick={() => setQuestionCount(n)}
              style={{ padding: "4px 10px", borderRadius: 20, border: "0.5px solid", fontSize: 11, fontWeight: 500, cursor: "pointer",
                background: questionCount === n ? "#7c3aed" : "transparent",
                color: questionCount === n ? "#fff" : "#64748b",
                borderColor: questionCount === n ? "#7c3aed" : "#e2e8f0" }}>
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Unterstützte Formate */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 20 }}>
        {[
          { label: "Dokumente", items: "PDF, DOCX, PPTX, XLSX, TXT, ODT", color: "#2563eb" },
          { label: "Audio → Whisper", items: "MP3, WAV, WebM, M4A transkribiert", color: "#7c3aed" },
          { label: "Bilder → Vision", items: "PNG, JPG → Claude analysiert", color: "#059669" },
        ].map(f => (
          <div key={f.label} style={{ padding: "10px 12px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: f.color, marginBottom: 3 }}>{f.label}</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>{f.items}</div>
          </div>
        ))}
      </div>

      {error && (
        <div style={{ display: "flex", gap: 8, padding: "12px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, marginBottom: 12, color: "#991b1b", fontSize: 13 }}>
          <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
          {error}
          <button onClick={() => setError(null)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#991b1b" }}>✕</button>
        </div>
      )}

      {/* Generator-Ergebnisse */}
      {genResults.map((r, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, marginBottom: 8 }}>
          <Database size={16} color="#059669" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#166534" }}>{r.saved} neue Prüfungsfragen gespeichert</div>
            <div style={{ fontSize: 11, color: "#4ade80" }}>aus "{r.filename}" → Modul {r.moduleId} ({MODULE_NAMES[r.moduleId]}) · sofort im Prüfungsmodus verfügbar</div>
          </div>
          <CheckCircle size={18} color="#059669" />
        </div>
      ))}

      {/* Dateien bereit */}
      {files.length > 0 && (
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, marginBottom: 16 }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", fontSize: 13, fontWeight: 600, color: "#374151" }}>
            {files.length} Datei(en) bereit
          </div>
          {files.map(f => (
            <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: "0.5px solid #f8fafc" }}>
              {getIcon(f.name)}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>{f.name}</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{(f.size / 1024).toFixed(0)} KB</div>
              </div>
              <button onClick={() => analyze(f)} disabled={!!loading}
                style={{ padding: "6px 14px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, opacity: loading ? 0.6 : 1 }}>
                {loading === f.name ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <BookOpen size={13} />}
                {loading === f.name ? "Analysiere..." : "KI-Analyse"}
              </button>
              <button onClick={() => setFiles(p => p.filter(x => x.name !== f.name))}
                style={{ padding: 6, background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Analyse-Ergebnisse */}
      {results.map((r, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid #f1f5f9" }}>
            <CheckCircle size={16} color="#059669" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{r.filename}</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{r.textLength.toLocaleString()} Zeichen analysiert</div>
            </div>
            <span style={{ padding: "3px 10px", background: "#f0fdf4", borderRadius: 20, fontSize: 11, color: "#166534", fontWeight: 500 }}>Analysiert</span>
          </div>
          <div style={{ padding: "16px", fontSize: 13, color: "#374151", lineHeight: 1.7, whiteSpace: "pre-wrap", maxHeight: 350, overflowY: "auto" }}>
            {r.analysis}
          </div>
          {/* Fragen-Generator */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid #f1f5f9", background: "#fafafa", borderRadius: "0 0 12px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Sparkles size={14} color="#7c3aed" />
              <span style={{ fontSize: 12, color: "#374151", flex: 1 }}>
                <strong>{questionCount} Prüfungsfragen</strong> für <strong>Modul {selectedModule} ({MODULE_NAMES[selectedModule]})</strong> generieren und in DB speichern
              </span>
              <button onClick={() => generateQuestions(r.analysis, r.filename)} disabled={!!genLoading}
                style={{ padding: "7px 16px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, opacity: genLoading ? 0.6 : 1 }}>
                {genLoading === r.filename ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Database size={13} />}
                {genLoading === r.filename ? "Generiere Fragen..." : "Fragen generieren → DB"}
              </button>
            </div>
          </div>
        </div>
      ))}

      {files.length === 0 && results.length === 0 && genResults.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 20px", color: "#94a3b8" }}>
          <FileQuestion size={48} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
          <div style={{ fontSize: 14, fontWeight: 500 }}>Noch keine Dateien hochgeladen</div>
          <div style={{ fontSize: 12, marginTop: 6, maxWidth: 400, margin: "6px auto 0" }}>
            Lade Lernmaterial hoch — KI analysiert den Inhalt und generiert automatisch IHK-Prüfungsfragen die sofort im Prüfungsmodus verfügbar sind
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
