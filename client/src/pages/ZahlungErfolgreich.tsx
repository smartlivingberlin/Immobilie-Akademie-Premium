import { useEffect, useState } from "react";
import { Link } from "wouter";

export default function ZahlungErfolgreich() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get("session_id"));
    // Animierter Zaehler fuer Wow-Effekt
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= 100) clearInterval(timer);
    }, 15);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg, #0c1628 0%, #0f2744 60%, #1a3a5c 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
      <div style={{ maxWidth:640, width:"100%", textAlign:"center" }}>

        {/* Erfolgs-Animation */}
        <div style={{ width:100, height:100, borderRadius:"50%", background:"linear-gradient(135deg, #059669, #10b981)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 32px", boxShadow:"0 0 60px rgba(16,185,129,0.4)", fontSize:44 }}>
          ✓
        </div>

        {/* Fortschrittsanzeige */}
        <div style={{ marginBottom:8, fontSize:13, color:"#10b981", fontWeight:700 }}>
          Freischaltung: {count}%
        </div>
        <div style={{ height:6, background:"rgba(255,255,255,0.1)", borderRadius:99, marginBottom:32, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${count}%`, background:"linear-gradient(90deg,#059669,#10b981)", borderRadius:99, transition:"width 0.1s" }} />
        </div>

        <h1 style={{ fontFamily:"Fraunces, Georgia, serif", fontSize:"clamp(28px,5vw,44px)", fontWeight:900, color:"#f1f5f9", margin:"0 0 16px", lineHeight:1.2 }}>
          Herzlichen Glückwunsch! 🎉
        </h1>
        <p style={{ fontSize:17, color:"#94a3b8", marginBottom:8, lineHeight:1.7 }}>
          Deine Zahlung war erfolgreich. Deine Module werden jetzt freigeschaltet.
        </p>
        <p style={{ fontSize:14, color:"#64748b", marginBottom:32 }}>
          Du kannst jetzt sofort mit deinem Modul beginnen.
        </p>

        {/* Was jetzt kommt */}
        <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:"24px 28px", marginBottom:32, textAlign:"left" }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#f1f5f9", marginBottom:16 }}>
            🚀 Deine nächsten Schritte:
          </div>
          {[
            { icon:"1️⃣", text:"Zum Portal gehen und einloggen", done:true },
            { icon:"2️⃣", text:"Dein freigeschaltetes Modul öffnen", done:false },
            { icon:"3️⃣", text:"KI-Tutor aktivieren und erste Lektion starten", done:false },
            { icon:"4️⃣", text:"Lernplan einrichten — 30 Min. täglich reichen", done:false },
          ].map((s, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"8px 0", borderBottom: i<3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <span style={{ fontSize:18 }}>{s.icon}</span>
              <span style={{ fontSize:14, color: s.done ? "#10b981" : "#94a3b8" }}>{s.text}</span>
              {s.done && <span style={{ marginLeft:"auto", color:"#10b981", fontSize:16 }}>✓</span>}
            </div>
          ))}
        </div>

        {/* Motivations-Zitat */}
        <div style={{ background:"rgba(37,99,235,0.1)", border:"1px solid rgba(96,165,250,0.2)", borderRadius:12, padding:"16px 20px", marginBottom:32 }}>
          <p style={{ fontSize:14, color:"#93c5fd", fontStyle:"italic", margin:0, lineHeight:1.6 }}>
            "Der beste Zeitpunkt um anzufangen war gestern. Der zweitbeste Zeitpunkt ist jetzt."
          </p>
        </div>

        {sessionId && (
          <p style={{ fontSize:11, color:"#475569", marginBottom:24 }}>
            Referenz: {sessionId.slice(0, 24)}...
          </p>
        )}

        {/* CTAs */}
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/statistiken">
            <button style={{ background:"linear-gradient(135deg,#2563eb,#1d4ed8)", color:"white", border:"none", borderRadius:12, padding:"14px 32px", fontWeight:700, fontSize:15, cursor:"pointer", boxShadow:"0 4px 16px rgba(37,99,235,0.4)" }}>
              Jetzt zum Lernbereich →
            </button>
          </Link>
          <Link href="/statistiken">
            <button style={{ background:"rgba(255,255,255,0.05)", color:"#94a3b8", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"14px 24px", fontWeight:600, fontSize:14, cursor:"pointer" }}>
              📊 Mein Lernbereich
            </button>
          </Link>
        </div>

        <p style={{ marginTop:20, fontSize:12, color:"#334155" }}>
          Fragen? Schreib uns an{" "}
          <a href="mailto:info@immobilien-akademie-smart.de" style={{ color:"#60a5fa" }}>
            info@immobilien-akademie-smart.de
          </a>
        </p>

      </div>
    </div>
  );
}
