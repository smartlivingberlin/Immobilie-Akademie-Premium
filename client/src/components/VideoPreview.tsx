import { useState } from "react";

interface VideoPreviewProps {
  youtubeUrl?: string;
  titel?: string;
  beschreibung?: string;
  hauptfarbe?: string;
}

function getYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export function VideoPreview({
  youtubeUrl,
  titel = "Kurs-Vorschau",
  beschreibung = "Sehen Sie wie das Lernen aussieht",
  hauptfarbe = "#2563eb"
}: VideoPreviewProps) {
  const [playing, setPlaying] = useState(false);
  const videoId = youtubeUrl ? getYoutubeId(youtubeUrl) : null;

  // Kein Video — schöner Platzhalter
  if (!videoId) {
    return (
      <div style={{
        background:`linear-gradient(135deg, ${hauptfarbe}15, ${hauptfarbe}05)`,
        border:`2px dashed ${hauptfarbe}30`,
        borderRadius:16, padding:"40px 24px",
        textAlign:"center", marginBottom:24,
      }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🎬</div>
        <div style={{ fontSize:16, fontWeight:700, color:"#0f172a", marginBottom:8 }}>
          {titel}
        </div>
        <div style={{ fontSize:13, color:"#64748b", marginBottom:16 }}>
          {beschreibung}
        </div>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8,
          background:hauptfarbe, color:"white",
          borderRadius:10, padding:"10px 20px",
          fontSize:13, fontWeight:600,
        }}>
          🎧 Audio-Vorschau verfügbar — Hören Sie rein!
        </div>
        <div style={{ fontSize:11, color:"#94a3b8", marginTop:12 }}>
          Video-Vorschau wird bald verfügbar sein
        </div>
      </div>
    );
  }

  // YouTube Video
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (!playing) {
    return (
      <div style={{
        position:"relative", borderRadius:16, overflow:"hidden",
        marginBottom:24, cursor:"pointer",
        boxShadow:"0 8px 32px rgba(0,0,0,0.15)",
      }} onClick={() => setPlaying(true)}>
        <img
          src={thumbnailUrl}
          alt={`Video Vorschau: ${titel}`}
          width={1280}
          height={720}
          style={{ width:"100%", display:"block", aspectRatio:"16/9", objectFit:"cover" }}
          onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }}
        />
        {/* Play-Button Overlay */}
        <div style={{
          position:"absolute", inset:0,
          background:"rgba(0,0,0,0.3)",
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <div style={{
            width:72, height:72, borderRadius:"50%",
            background:"white", display:"flex",
            alignItems:"center", justifyContent:"center",
            boxShadow:"0 4px 20px rgba(0,0,0,0.3)",
            transition:"transform 0.2s",
          }}>
            <div style={{
              width:0, height:0,
              borderTop:"14px solid transparent",
              borderBottom:"14px solid transparent",
              borderLeft:`24px solid ${hauptfarbe}`,
              marginLeft:6,
            }}/>
          </div>
        </div>
        {/* Titel unten */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0,
          background:"linear-gradient(transparent, rgba(0,0,0,0.7))",
          padding:"24px 16px 12px", color:"white",
        }}>
          <div style={{ fontSize:14, fontWeight:700 }}>{titel}</div>
          <div style={{ fontSize:11, opacity:0.8 }}>{beschreibung}</div>
        </div>
      </div>
    );
  }

  // Eingebetteter Player
  return (
    <div style={{
      position:"relative", borderRadius:16, overflow:"hidden",
      marginBottom:24, aspectRatio:"16/9",
      boxShadow:"0 8px 32px rgba(0,0,0,0.15)",
    }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={titel}
      />
    </div>
  );
}
