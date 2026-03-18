import { useState, useRef } from "react";
import { Upload, FileText, Music, Film, CheckCircle, AlertCircle, Loader2, Trash2, BookOpen, FileQuestion } from "lucide-react";

interface AnalysisResult {
  filename: string;
  analysis: string;
  textLength: number;
}

const ACCEPTED = ".pdf,.docx,.pptx,.xlsx,.txt,.md,.mp3,.wav,.webm,.m4a,.odt,.png,.jpg,.jpeg";

export default function ContentUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
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
        setResults(p => [...p, { filename: file.name, analysis: data.analysis, textLength: data.textLength }]);
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

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Content Upload & KI-Analyse</h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>Lernmaterial hochladen — KI analysiert und generiert Prüfungsfragen automatisch</p>
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
          const dropped = Array.from(e.dataTransfer.files);
          setFiles(p => [...p, ...dropped]);
        }}
        style={{ border: "2px dashed #e2e8f0", borderRadius: 16, padding: "40px 20px", textAlign: "center", cursor: "pointer", background: "#f8fafc", transition: "all 0.2s", marginBottom: 20 }}>
        <Upload size={40} color="#94a3b8" style={{ margin: "0 auto 12px" }} />
        <div style={{ fontSize: 16, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Dateien hierher ziehen oder klicken</div>
        <div style={{ fontSize: 12, color: "#94a3b8" }}>PDF · DOCX · PPTX · XLSX · TXT · MP3 · WAV · PNG · JPG</div>
        <input ref={fileRef} type="file" multiple accept={ACCEPTED} style={{ display: "none" }}
          onChange={e => { if (e.target.files) setFiles(p => [...p, ...Array.from(e.target.files!)]); e.target.value = ""; }} />
      </div>

      {/* Unterstützte Formate */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 24 }}>
        {[
          { label: "Dokumente", items: "PDF, DOCX, PPTX, XLSX, TXT, MD, ODT", color: "#2563eb" },
          { label: "Audio", items: "MP3, WAV, WebM, M4A → Whisper transkribiert", color: "#7c3aed" },
          { label: "Bilder", items: "PNG, JPG → Claude Vision analysiert", color: "#059669" },
        ].map(f => (
          <div key={f.label} style={{ padding: "12px 14px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: f.color, marginBottom: 4 }}>{f.label}</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>{f.items}</div>
          </div>
        ))}
      </div>

      {error && (
        <div style={{ display: "flex", gap: 8, padding: "12px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, marginBottom: 16, color: "#991b1b", fontSize: 13 }}>
          <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
          {error}
        </div>
      )}

      {/* Dateien bereit */}
      {files.length > 0 && (
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, marginBottom: 20 }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", fontSize: 13, fontWeight: 600, color: "#374151" }}>
            {files.length} Datei(en) bereit zur Analyse
          </div>
          {files.map(f => (
            <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: "0.5px solid #f8fafc" }}>
              {getIcon(f.name)}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>{f.name}</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{(f.size / 1024).toFixed(0)} KB</div>
              </div>
              <button
                onClick={() => analyze(f)}
                disabled={loading === f.name}
                style={{ padding: "6px 14px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                {loading === f.name ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <BookOpen size={14} />}
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

      {/* Ergebnisse */}
      {results.map((r, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid #f1f5f9" }}>
            <CheckCircle size={16} color="#059669" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{r.filename}</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{r.textLength.toLocaleString()} Zeichen extrahiert</div>
            </div>
            <div style={{ padding: "3px 10px", background: "#f0fdf4", borderRadius: 20, fontSize: 11, color: "#166534", fontWeight: 500 }}>Analysiert</div>
          </div>
          <div style={{ padding: "16px", fontSize: 13, color: "#374151", lineHeight: 1.7, whiteSpace: "pre-wrap", maxHeight: 400, overflowY: "auto" }}>
            {r.analysis}
          </div>
        </div>
      ))}

      {files.length === 0 && results.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#94a3b8" }}>
          <FileQuestion size={48} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
          <div style={{ fontSize: 14 }}>Noch keine Dateien hochgeladen</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Lade Lernmaterial hoch — KI generiert automatisch Zusammenfassungen und Prüfungsfragen</div>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
