import DOMPurify from "dompurify";
import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Loader2, Sparkles, ChevronDown, Mic, MicOff, Volume2, VolumeX, Paperclip } from "lucide-react";

interface AIAssistantProps {
  moduleContext?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface Msg {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const QUICK = [
  "Was ist §34c GewO?",
  "Erkläre das Ertragswertverfahren",
  "Was sind Betriebskosten?",
  "Was muss ich für die IHK-Prüfung wissen?",
  "Wie funktioniert die WEG-Verwaltung?",
  "Was ist ein Annuitätendarlehen?",
];

function renderMarkdown(text: string): string {
  return text
    .replace(/^### (.+)$/gm, '<h4 style="margin:12px 0 4px;font-size:0.95em;font-weight:700;color:#1e40af">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 style="margin:14px 0 6px;font-size:1em;font-weight:700;color:#1d4ed8">$1</h3>')
    .replace(/^# (.+)$/gm, '<h2 style="margin:14px 0 8px;font-size:1.1em;font-weight:800;color:#1e3a8a">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li style="margin:3px 0;padding-left:4px">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, (m) => `<ul style="margin:6px 0;padding-left:16px">${m}</ul>`)
    .replace(/^(\d+)\. (.+)$/gm, '<li style="margin:3px 0">$2</li>')
    .replace(/`(.+?)`/g, '<code style="background:#f1f5f9;padding:1px 5px;border-radius:4px;font-size:0.9em;font-family:monospace">$1</code>')
    .replace(/---/g, '<hr style="border:none;border-top:1px solid #e2e8f0;margin:10px 0"/>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}

export default function AIAssistant({ moduleContext, isOpen, onClose }: AIAssistantProps) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const moduleId = moduleContext ? parseInt(moduleContext.replace(/\D/g, "")) || null : null;

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [msgs, loading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
  };

  const startVoice = async () => {
    if (listening) {
      (recognitionRef.current as MediaRecorder)?.stop();
      setListening(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      const chunks: Blob[] = [];
      recognitionRef.current = recorder;
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        setListening(false);
        const blob = new Blob(chunks, { type: "audio/webm" });
        setLoading(true);
        try {
          const res = await fetch("/api/ai/transcribe", {
            method: "POST",
            headers: { "Content-Type": "audio/webm" },
            body: blob,
          });
          const data = await res.json();
          if (data.transcript) {
            setInput(data.transcript);
            setTimeout(() => send(data.transcript), 100);
          } else {
            alert("Transkription fehlgeschlagen: " + (data.error || "Fehler"));
            setLoading(false);
          }
        } catch {
          alert("Verbindungsfehler bei Transkription");
          setLoading(false);
        }
      };
      recorder.start();
      setListening(true);
      setTimeout(() => { if (recorder.state === "recording") recorder.stop(); }, 10000);
    } catch (err: any) {
      alert("Mikrofon-Zugriff verweigert: " + err.message);
    }
  };
  const speak = async (text: string) => {
    if (speaking) {
      setSpeaking(false);
      return;
    }
    const clean = text.replace(/#{1,3} /g, "").replace(/[*`]/g, "").replace(/---/g, "").slice(0, 300).trim();
    setSpeaking(true);
    // ElevenLabs API-Key wurde auf Server-Proxy verlagert (/api/tts)
    if (elevenKey) {
      try {
        const voiceId = "pNInz6obpgDQGcFmaJgB";
        const res = await fetch(`/api/tts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "audio/mpeg",
          },
          body: JSON.stringify({
            text: clean,
            model_id: "eleven_multilingual_v2",
            voice_settings: { stability: 0.5, similarity_boost: 0.75 }
          }),
        });
        if (res.ok) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          audio.onended = () => { setSpeaking(false); URL.revokeObjectURL(url); };
          audio.onerror = () => setSpeaking(false);
          await audio.play();
          return;
        }
      } catch (e) {
        console.warn("ElevenLabs direkt fehlgeschlagen:", e);
      }
    }
    // Fallback Browser TTS
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = "de-DE";
    utterance.rate = 0.9;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    const voices = window.speechSynthesis.getVoices();
    const german = voices.find(v => v.lang.startsWith("de"));
    if (german) utterance.voice = german;
    window.speechSynthesis.speak(utterance);
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    const userMsg = { id: Date.now().toString(), role: "user" as const, text: `📎 Datei hochgeladen: ${file.name}` };
    setMsgs(p => [...p, userMsg]);
    try {
      const res = await fetch("/api/ai/analyze-document", {
        method: "POST",
        headers: {
          "Content-Type": file.type || "application/octet-stream",
          "x-filename": file.name,
        },
        body: file,
      });
      const data = await res.json();
      if (data.analysis) {
        setMsgs(p => [...p, {
          id: Date.now().toString() + "_doc",
          role: "assistant" as const,
          text: `📄 **Analyse von "${file.name}":**

${data.analysis}`,
        }]);
      } else {
        setMsgs(p => [...p, {
          id: Date.now().toString() + "_err",
          role: "assistant" as const,
          text: "⚠️ Fehler bei der Analyse: " + (data.error || "Unbekannt"),
        }]);
      }
    } catch {
      setMsgs(p => [...p, {
        id: Date.now().toString() + "_err",
        role: "assistant" as const,
        text: "⚠️ Upload fehlgeschlagen. Bitte erneut versuchen.",
      }]);
    } finally {
      setUploading(false);
    }
  };

  const send = async (text?: string) => {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput("");
    const userMsg: Msg = { id: Date.now().toString(), role: "user", text: q };
    setMsgs((p) => [...p, userMsg]);
    setLoading(true);
    try {
      const context = msgs.slice(-8).map((m) => ({ role: m.role, content: m.text }));
      const res = await fetch("/api/ai/rag-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, moduleId, context }),
      });
      const data = await res.json();
      setMsgs((p) => [...p, {
        id: Date.now().toString() + "_a",
        role: "assistant",
        text: data.answer || data.error || "Keine Antwort erhalten.",
      }]);
    } catch {
      setMsgs((p) => [...p, {
        id: Date.now().toString() + "_e",
        role: "assistant",
        text: "⚠️ Verbindungsfehler. Bitte erneut versuchen.",
      }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px", backdropFilter: "blur(4px)"
    }}>
      <div style={{
        background: "#fff", borderRadius: "16px", width: "100%", maxWidth: "780px",
        height: "85vh", maxHeight: "800px", display: "flex", flexDirection: "column",
        boxShadow: "0 25px 60px rgba(0,0,0,0.3)", overflow: "hidden"
      }}>

        {/* HEADER */}
        <div style={{
          background: "linear-gradient(135deg, #1d4ed8, #4f46e5)",
          padding: "16px 20px", display: "flex", alignItems: "center",
          gap: "12px", flexShrink: 0
        }}>
          <div style={{
            background: "rgba(255,255,255,0.2)", borderRadius: "50%",
            width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Sparkles size={20} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>KI-Tutor · Immobilien-Akademie</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.75rem" }}>
              Claude Haiku · {moduleContext || "Alle Module"} · 521 Prüfungsfragen
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "8px",
            color: "#fff", cursor: "pointer", padding: "8px", display: "flex",
            alignItems: "center", justifyContent: "center"
          }}>
            <X size={18} />
          </button>
        </div>

        {/* CHAT AREA */}
        <div ref={scrollRef} onScroll={handleScroll} style={{
          flex: 1, overflowY: "auto", padding: "20px",
          display: "flex", flexDirection: "column", gap: "16px",
          scrollBehavior: "smooth"
        }}>
          {msgs.length === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "8px" }}>
              <div style={{
                textAlign: "center", padding: "20px 0 8px",
                color: "#64748b", fontSize: "0.9rem"
              }}>
                <Bot size={40} style={{ color: "#93c5fd", marginBottom: "12px" }} />
                <div style={{ fontWeight: 600, color: "#1e40af", marginBottom: "6px" }}>Wie kann ich dir helfen?</div>
                <div style={{ fontSize: "0.82rem" }}>Stelle eine Frage zu §34c, §34i, WEG, Mietrecht, Bewertung oder Finanzierung</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {QUICK.map((q, i) => (
                  <button key={i} onClick={() => send(q)} style={{
                    background: "#f8fafc", border: "1.5px solid #e2e8f0",
                    borderRadius: "10px", padding: "10px 14px", textAlign: "left",
                    cursor: "pointer", fontSize: "0.82rem", color: "#374151",
                    transition: "all 0.15s", lineHeight: 1.4,
                  }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.background = "#eff6ff"; (e.target as HTMLElement).style.borderColor = "#3b82f6"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = "#f8fafc"; (e.target as HTMLElement).style.borderColor = "#e2e8f0"; }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {msgs.map((m) => (
            <div key={m.id} style={{
              display: "flex", gap: "10px",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              alignItems: "flex-start"
            }}>
              {m.role === "assistant" && (
                <div style={{
                  background: "#dbeafe", borderRadius: "50%", width: "34px", height: "34px",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px"
                }}>
                  <Bot size={18} color="#1d4ed8" />
                </div>
              )}
              <div style={{
                maxWidth: "75%", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                padding: "12px 16px",
                background: m.role === "user" ? "linear-gradient(135deg, #2563eb, #4f46e5)" : "#f8fafc",
                color: m.role === "user" ? "#fff" : "#1e293b",
                fontSize: "0.88rem", lineHeight: 1.6,
                boxShadow: m.role === "user" ? "0 2px 8px rgba(37,99,235,0.3)" : "0 1px 4px rgba(0,0,0,0.08)",
                border: m.role === "assistant" ? "1px solid #e2e8f0" : "none"
              }}>
                {m.role === "assistant" ? (
                  <>
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(m.text) }} />
                  <button aria-label="Text vorlesen" onClick={(e) => { e.stopPropagation(); speak(m.text); }} style={{
                    background:"#f1f5f9",border:"1px solid #e2e8f0",cursor:"pointer",
                    marginTop:"10px",padding:"6px 12px",borderRadius:"8px",
                    color:"#475569",fontSize:"13px",fontWeight:"500",
                    display:"flex",alignItems:"center",gap:"6px",
                    transition:"all 0.2s"
                  }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#dbeafe";(e.currentTarget as HTMLElement).style.color="#2563eb"}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#f1f5f9";(e.currentTarget as HTMLElement).style.color="#475569"}}
                  >
                    <Volume2 size={16}/><span>🔊 Vorlesen</span>
                  </button>
                  </>
                ) : (
                  <span>{m.text}</span>
                )}
              </div>
              {m.role === "user" && (
                <div style={{
                  background: "#2563eb", borderRadius: "50%", width: "34px", height: "34px",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px"
                }}>
                  <User size={18} color="#fff" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{
                background: "#dbeafe", borderRadius: "50%", width: "34px", height: "34px",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>
                <Bot size={18} color="#1d4ed8" />
              </div>
              <div style={{
                background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "18px 18px 18px 4px",
                padding: "14px 18px", display: "flex", gap: "6px", alignItems: "center"
              }}>
                {[0, 150, 300].map((delay, i) => (
                  <div key={i} style={{
                    width: "8px", height: "8px", borderRadius: "50%", background: "#93c5fd",
                    animation: `bounce 1.2s ${delay}ms infinite`
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* SCROLL TO BOTTOM BTN */}
        {showScrollBtn && (
          <button onClick={scrollToBottom} style={{
            position: "absolute", bottom: "90px", right: "30px",
            background: "#2563eb", color: "#fff", border: "none", borderRadius: "50%",
            width: "36px", height: "36px", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }}>
            <ChevronDown size={18} />
          </button>
        )}

        {/* INPUT */}
        <div style={{
          padding: "16px 20px", borderTop: "1px solid #e2e8f0",
          background: "#fff", flexShrink: 0
        }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }}}
              placeholder="Stelle eine Frage zu Immobilienrecht, Bewertung, Finanzierung..."
              disabled={loading}
              style={{
                flex: 1, padding: "12px 16px", borderRadius: "12px",
                border: "1.5px solid #e2e8f0", fontSize: "0.9rem", outline: "none",
                background: "#f8fafc", transition: "border-color 0.15s",
                color: "#1e293b"
              }}
              onFocus={e => (e.target.style.borderColor = "#3b82f6")}
              onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{
                background: input.trim() && !loading ? "linear-gradient(135deg, #2563eb, #4f46e5)" : "#e2e8f0",
                color: input.trim() && !loading ? "#fff" : "#94a3b8",
                border: "none", borderRadius: "12px", width: "48px", height: "48px",
                cursor: input.trim() && !loading ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s", flexShrink: 0
              }}
            >
              {loading ? <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={20} />}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.pptx,.xlsx,.txt,.md,.mp3,.wav,.webm,.m4a,.odt"
              style={{ display: "none" }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); e.target.value = ""; }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || loading}
              title="Dokument hochladen"
              style={{
                background: "#f1f5f9", border: "1.5px solid #e2e8f0", cursor: "pointer",
                borderRadius: "12px", width: "48px", height: "48px",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s", flexShrink: 0, color: "#64748b"
              }}
            >
              {uploading ? <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} /> : <Paperclip size={20} />}
            </button>
            <button
              onClick={startVoice}
              disabled={loading}
              title={listening ? "Aufnahme stoppen" : "Spracheingabe starten"}
              style={{
                background: listening ? "linear-gradient(135deg, #dc2626, #b91c1c)" : "#f1f5f9",
                color: listening ? "#fff" : "#64748b",
                border: listening ? "none" : "1.5px solid #e2e8f0",
                borderRadius: "12px", width: "48px", height: "48px",
                cursor: loading ? "default" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s", flexShrink: 0,
                animation: listening ? "pulse 1.5s ease-in-out infinite" : "none"
              }}
            >
              {listening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          </div>
          <div style={{
            fontSize: "0.72rem", color: "#94a3b8", marginTop: "8px",
            display: "flex", justifyContent: "space-between"
          }}>
            <span>Enter zum Senden · Shift+Enter für neue Zeile</span>
            <span>Claude Haiku · Immobilien-Akademie Smart</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(220,38,38,0); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
