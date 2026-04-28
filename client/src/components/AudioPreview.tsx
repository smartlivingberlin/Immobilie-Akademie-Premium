import { useState, useEffect } from "react";

interface AudioPreviewProps {
  moduleId: number;
  hauptfarbe: string;
}

export function AudioPreview({ moduleId, hauptfarbe }: AudioPreviewProps) {
  const [playing, setPlaying] = useState(false);
  const [previewText, setPreviewText] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`/api/learning/audio-lessons?moduleId=${moduleId}`)
      .then(r => r.json())
      .then((lessons: any[]) => {
        if (lessons && lessons.length > 0) {
          const first = lessons[0];
          setPreviewTitle(first.title || "Erste Lektion");
          // Ersten 400 Zeichen als Vorschau
          const text = (first.content || "").slice(0, 400);
          setPreviewText(text);
          setLoaded(true);
        }
      })
      .catch(() => {});
  }, [moduleId]);

  const handlePlay = () => {
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    if (!previewText) return;
    const utterance = new SpeechSynthesisUtterance(previewText);
    utterance.lang = "de-DE";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    // Deutsche Stimme suchen
    const voices = window.speechSynthesis.getVoices();
    const deVoice = voices.find(v => v.lang.startsWith("de"));
    if (deVoice) utterance.voice = deVoice;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!loaded) return null;

  return (
    <div style={{
      background: `${hauptfarbe}10`,
      border: `1px solid ${hauptfarbe}30`,
      borderRadius: 16,
      padding: "20px 24px",
      marginBottom: 24,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
        <div style={{ fontSize:20 }}>🎧</div>
        <div>
          <div style={{ fontSize:13, fontWeight:700, color:"#0f172a" }}>
            Probe hören: {previewTitle}
          </div>
          <div style={{ fontSize:11, color:"#94a3b8" }}>
            Kostenlose Vorschau · Tag 1 · ~30 Sekunden
          </div>
        </div>
        <button
          onClick={handlePlay}
          style={{
            marginLeft:"auto",
            background: playing ? "#ef4444" : hauptfarbe,
            color:"white", border:"none",
            borderRadius:10, padding:"10px 20px",
            fontSize:13, fontWeight:700,
            cursor:"pointer",
            display:"flex", alignItems:"center", gap:8,
            boxShadow:`0 4px 12px ${hauptfarbe}40`,
            transition:"all 0.2s",
          }}>
          {playing ? "⏹ Stop" : "▶ Hören"}
        </button>
      </div>
      {playing && (
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ display:"flex", gap:3 }}>
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{
                width:3, height:16,
                background: hauptfarbe,
                borderRadius:99,
                animation:`wave ${0.5 + i*0.1}s ease-in-out infinite alternate`,
                opacity:0.8,
              }}/>
            ))}
          </div>
          <span style={{ fontSize:12, color:"#64748b" }}>Wird vorgelesen...</span>
        </div>
      )}
      <style>{`
        @keyframes wave {
          from { transform: scaleY(0.4); }
          to { transform: scaleY(1.4); }
        }
      `}</style>
    </div>
  );
}
