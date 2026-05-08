import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { useState } from "react";
import { CheckCircle2, ArrowRight, Star, Zap, Building2, TrendingUp, Award, Crown, Shield, Clock, Users, BookOpen } from "lucide-react";
import { trackEvent } from "@/hooks/useAnalytics";

const MODULE_INFO: Record<number, { name: string; short: string; emoji: string; color: string }> = {
  1: { name: "Immobilien-Grundkurs", short: "Grundkurs", emoji: "🏠", color: "#2563eb" },
  2: { name: "Immobilienmakler § 34c GewO", short: "Makler §34c", emoji: "🔑", color: "#7c3aed" },
  3: { name: "WEG-Verwalter & Mietrecht", short: "WEG-Verwalter", emoji: "🏢", color: "#059669" },
  4: { name: "Immobilienbewertung", short: "Gutachter", emoji: "📊", color: "#d97706" },
  5: { name: "Darlehensvermittler § 34i GewO", short: "§34i", emoji: "💶", color: "#db2777" },
};

const EINZELPREISE: Record<number, number> = {1:149, 2:499, 3:699, 4:399, 5:499};

const PAKETE = [
  { id:"starter", name:"Starter-Paket", icon:Zap, iconColor:"#3b82f6", modules:[1,2], price:549, desc:"Perfekter Einstieg für angehende Makler", highlight:false, badge:null },
  { id:"verwalter", name:"Verwalter-Paket", icon:Building2, iconColor:"#059669", modules:[1,3], price:699, desc:"Grundkurs + WEG-Verwalter Kombination", highlight:false, badge:null },
  { id:"makler-plus", name:"Makler-Plus", icon:Award, iconColor:"#7c3aed", modules:[1,2,5], price:1049, desc:"Doppellizenz: Makler §34c + §34i", highlight:false, badge:"Doppellizenz" },
  { id:"profi", name:"Immobilienprofi", icon:Star, iconColor:"#ef4444", modules:[1,2,3], price:1199, desc:"Makler + WEG-Verwalter — beliebteste Kombination", highlight:true, badge:"Beliebtestes" },
  { id:"gutachter", name:"Gutachter-Paket", icon:TrendingUp, iconColor:"#d97706", modules:[1,4], price:449, desc:"Grundkurs + Immobilienbewertung", highlight:false, badge:null },
  { id:"komplett", name:"Komplett-Ausbildung", icon:Crown, iconColor:"#d4a853", modules:[1,2,3,4,5], price:1955, desc:"Alle 5 Berufsbilder — maximale Karrierechancen", highlight:false, badge:"Bestes Preis-Leistungs-Verhältnis" },
];

const TRUST = [
  { icon:"🎓", label:"IHK-anerkannt", sub:"§34c + §34i vorbereitet" },
  { icon:"📱", label:"Lebenslanger Zugang", sub:"Einmal kaufen, immer lernen" },
  { icon:"🤖", label:"KI-Tutor inklusive", sub:"Claude + Gemini + Groq" },
  { icon:"📋", label:"855+ Lernaufgaben", sub:"IHK-Fragen, Rechenübungen & Praxisfälle" },
  { icon:"🎯", label:"Prüfungssimulation", sub:"Realistische Testumgebung" },
  { icon:"🏆", label:"Zertifikat", sub:"Nach Modulabschluss" },
];

export default function KursPakete() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div style={{ minHeight:"100vh", background:"var(--color-bg, #f8fafc)" }}>
      <SEO
        title="Kurs-Pakete — Alle Module im Vorteilspaket | Immobilien Akademie"
        description="Spare bis zu 290 EUR mit unseren Kurs-Paketen. 6 Kombinationen für jeden Karriereweg — IHK §34c, §34i, WEG-Verwalter, Gutachter."
      />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div style={{
        background:"linear-gradient(135deg, #0c1628 0%, #0f2744 50%, #1a3a5c 100%)",
        padding:"80px 20px 64px", position:"relative", overflow:"hidden",
      }}>
        {/* Decorative circles */}
        <div style={{ position:"absolute", top:-80, right:-80, width:300, height:300, borderRadius:"50%", background:"rgba(37,99,235,0.08)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-60, left:-60, width:200, height:200, borderRadius:"50%", background:"rgba(124,58,237,0.08)", pointerEvents:"none" }} />

        <div style={{ maxWidth:860, margin:"0 auto", textAlign:"center", position:"relative" }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(37,99,235,0.15)", border:"1px solid rgba(96,165,250,0.3)",
            color:"#93c5fd", borderRadius:24, padding:"6px 18px",
            fontSize:12, fontWeight:700, marginBottom:24, letterSpacing:"0.06em",
          }}>
            💰 BIS ZU 290 € SPAREN · VORTEILSPAKETE
          </div>

          <h1 style={{
            fontFamily:"Fraunces, Georgia, serif",
            fontSize:"clamp(32px, 5vw, 52px)", fontWeight:900,
            color:"#f1f5f9", marginBottom:16, lineHeight:1.15,
            letterSpacing:"-0.02em",
          }}>
            Ihr Karriereweg in der<br />
            <span style={{ color:"#60a5fa" }}>Immobilienwirtschaft</span>
          </h1>

          <p style={{ fontSize:17, color:"#94a3b8", maxWidth:540, margin:"0 auto 32px", lineHeight:1.6 }}>
            6 maßgeschneiderte Pakete — für Makler, Verwalter, Gutachter und Allrounder.
            Einmalzahlung, dauerhafter Zugang, IHK-vorbereitet.
          </p>

          <div style={{ display:"flex", gap:32, justifyContent:"center", flexWrap:"wrap", marginBottom:8 }}>
            {[
              { value:"2.245 €", label:"Einzelwert" },
              { value:"bis 290 €", label:"Ersparnis" },
              { value:"855+", label:"Lernaufgaben" },
              { value:"240", label:"Lerntage" },
            ].map(s => (
              <div key={s.label} style={{ textAlign:"center" }}>
                <div style={{ fontSize:22, fontWeight:900, color:"#60a5fa", fontFamily:"Fraunces, Georgia, serif" }}>{s.value}</div>
                <div style={{ fontSize:11, color:"#64748b", marginTop:2, letterSpacing:"0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TRUST BAR ─────────────────────────────────────────────── */}
      <div style={{ background:"white", borderBottom:"1px solid #e2e8f0", padding:"16px 20px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap" }}>
          {TRUST.map(t => (
            <div key={t.label} style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:18 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:"#0f172a" }}>{t.label}</div>
                <div style={{ fontSize:10, color:"#94a3b8" }}>{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"56px 20px" }}>

        {/* ── PAKET-GRID ────────────────────────────────────────────── */}
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <h2 style={{ fontFamily:"Fraunces, Georgia, serif", fontSize:30, fontWeight:800, color:"#0f172a", margin:"0 0 8px" }}>
            Wählen Sie Ihr Paket
          </h2>
          <p style={{ color:"#64748b", fontSize:15 }}>Alle Pakete inklusive KI-Tutor, Prüfungssimulation und Zertifikat</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:20, marginBottom:56 }}>
          {PAKETE.map(p => {
            const einzeln = p.modules.reduce((s, m) => s + EINZELPREISE[m], 0);
            const ersparnis = einzeln - p.price;
            const pct = Math.round(ersparnis / einzeln * 100);
            const Icon = p.icon;
            const isHovered = hoveredId === p.id;

            return (
              <div key={p.id}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background:"white",
                  border:`2px solid ${p.highlight || isHovered ? p.iconColor : "#e2e8f0"}`,
                  borderRadius:20, padding:"28px 24px", position:"relative",
                  boxShadow: isHovered ? `0 20px 48px ${p.iconColor}25` : p.highlight ? `0 8px 24px ${p.iconColor}18` : "0 2px 8px rgba(0,0,0,0.04)",
                  transform: isHovered ? "translateY(-4px)" : "none",
                  transition:"all 0.25s ease",
                }}>

                {p.badge && (
                  <div style={{
                    position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)",
                    background:p.highlight ? `linear-gradient(135deg, ${p.iconColor}, #7c3aed)` : "#374151",
                    color:"white", borderRadius:24, padding:"4px 16px",
                    fontSize:11, fontWeight:800, whiteSpace:"nowrap",
                    boxShadow:"0 2px 8px rgba(0,0,0,0.2)",
                  }}>{p.badge}</div>
                )}

                {/* Header */}
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                  <div style={{
                    background:`${p.iconColor}12`, borderRadius:14, padding:12,
                    border:`1px solid ${p.iconColor}20`,
                  }}>
                    <Icon size={24} color={p.iconColor} />
                  </div>
                  <div>
                    <div style={{ fontSize:17, fontWeight:800, color:"#0f172a", fontFamily:"Fraunces, Georgia, serif" }}>{p.name}</div>
                    <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>{p.desc}</div>
                  </div>
                </div>

                {/* Module Liste */}
                <div style={{ marginBottom:20, padding:"12px 14px", background:"#f8fafc", borderRadius:10 }}>
                  {p.modules.map(m => (
                    <div key={m} style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 0" }}>
                      <CheckCircle2 size={14} color={MODULE_INFO[m].color} />
                      <span style={{ fontSize:12, color:"#374151", fontWeight:500 }}>
                        {MODULE_INFO[m].emoji} {MODULE_INFO[m].name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Preis */}
                <div style={{ marginBottom:20 }}>
                  <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
                    <span style={{ fontSize:34, fontWeight:900, color:"#0f172a", fontFamily:"Fraunces, Georgia, serif", letterSpacing:"-0.02em" }}>
                      {p.price.toLocaleString("de-DE")} €
                    </span>
                    <span style={{ fontSize:14, color:"#94a3b8", textDecoration:"line-through" }}>
                      {einzeln.toLocaleString("de-DE")} €
                    </span>
                  </div>
                  {ersparnis > 0 && (
                    <div style={{
                      display:"inline-flex", alignItems:"center", gap:4,
                      background:"#dcfce7", color:"#15803d",
                      borderRadius:8, padding:"3px 10px", fontSize:12, fontWeight:700, marginTop:4,
                    }}>
                      ✓ Sie sparen {ersparnis} € ({pct}% Rabatt)
                    </div>
                  )}
                  <div style={{ fontSize:11, color:"#94a3b8", marginTop:6 }}>
                    inkl. MwSt. · Einmalzahlung · kein Abo
                  </div>
                </div>

                <button
                  onClick={() => {
                    trackEvent("begin_checkout", "Bundle", p.id, p.price);
                    window.location.href = `/api/stripe/bundle-${p.id}`;
                  }}
                  style={{
                    width:"100%",
                    background:p.highlight || isHovered
                      ? `linear-gradient(135deg, ${p.iconColor}, ${p.iconColor}cc)`
                      : p.iconColor,
                    color:"white", border:"none", borderRadius:12,
                    padding:"14px", fontSize:15, fontWeight:700,
                    cursor:"pointer", display:"flex", alignItems:"center",
                    justifyContent:"center", gap:8,
                    boxShadow:`0 4px 14px ${p.iconColor}40`,
                    transition:"all 0.2s",
                  }}>
                  Jetzt kaufen <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>

        {/* ── VERGLEICHSTABELLE ─────────────────────────────────────── */}
        <div style={{ marginBottom:48 }}>
          <h2 style={{ fontFamily:"Fraunces, Georgia, serif", fontSize:26, fontWeight:800, color:"#0f172a", margin:"0 0 20px", textAlign:"center" }}>
            Paket-Vergleich auf einen Blick
          </h2>
          <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead>
                  <tr style={{ background:"linear-gradient(135deg, #0f172a, #1e3a5f)" }}>
                    <th style={{ textAlign:"left", padding:"14px 20px", color:"#94a3b8", fontWeight:600 }}>Paket</th>
                    {[1,2,3,4,5].map(m => (
                      <th key={m} style={{ textAlign:"center", padding:"14px 12px", color:"#94a3b8", fontWeight:600 }}>
                        {MODULE_INFO[m].emoji} M{m}
                      </th>
                    ))}
                    <th style={{ textAlign:"right", padding:"14px 20px", color:"#94a3b8", fontWeight:600 }}>Preis</th>
                    <th style={{ textAlign:"right", padding:"14px 20px", color:"#4ade80", fontWeight:600 }}>Ersparnis</th>
                  </tr>
                </thead>
                <tbody>
                  {PAKETE.map((p, i) => {
                    const einzeln = p.modules.reduce((s,m) => s + EINZELPREISE[m], 0);
                    return (
                      <tr key={p.id} style={{ background:i%2===0 ? "white" : "#fafafa", borderBottom:"1px solid #f1f5f9" }}>
                        <td style={{ padding:"12px 20px", fontWeight:700, color:"#0f172a" }}>
                          {p.name}
                          {p.highlight && <span style={{ marginLeft:6, fontSize:10, background:"#fef3c7", color:"#92400e", padding:"2px 7px", borderRadius:6, fontWeight:800 }}>TOP</span>}
                        </td>
                        {[1,2,3,4,5].map(m => (
                          <td key={m} style={{ textAlign:"center", padding:"12px" }}>
                            {p.modules.includes(m)
                              ? <span style={{ color:"#059669", fontSize:18, fontWeight:700 }}>✓</span>
                              : <span style={{ color:"#e2e8f0" }}>—</span>}
                          </td>
                        ))}
                        <td style={{ textAlign:"right", padding:"12px 20px", fontWeight:800, color:"#0f172a", fontFamily:"Fraunces, Georgia, serif" }}>
                          {p.price.toLocaleString("de-DE")} €
                        </td>
                        <td style={{ textAlign:"right", padding:"12px 20px", fontWeight:700, color:"#059669" }}>
                          -{einzeln - p.price} €
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── GARANTIE & CTA ────────────────────────────────────────── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:48 }}>
          <div style={{ background:"linear-gradient(135deg, #f0fdf4, #dcfce7)", border:"1px solid #bbf7d0", borderRadius:16, padding:"24px 28px" }}>
            <div style={{ fontSize:28, marginBottom:8 }}>🛡️</div>
            <h3 style={{ fontSize:16, fontWeight:800, color:"#15803d", margin:"0 0 8px" }}>14-Tage-Zufriedenheitsgarantie</h3>
            <p style={{ fontSize:13, color:"#166534", margin:0, lineHeight:1.5 }}>
              Nicht zufrieden? Wir erstatten den vollen Betrag innerhalb von 14 Tagen — keine Fragen gestellt.
            </p>
          </div>
          <div style={{ background:"linear-gradient(135deg, #eff6ff, #dbeafe)", border:"1px solid #bfdbfe", borderRadius:16, padding:"24px 28px" }}>
            <div style={{ fontSize:28, marginBottom:8 }}>💬</div>
            <h3 style={{ fontSize:16, fontWeight:800, color:"#1d4ed8", margin:"0 0 8px" }}>Kostenlos testen</h3>
            <p style={{ fontSize:13, color:"#1e40af", margin:"0 0 12px", lineHeight:1.5 }}>
              Nicht sicher welches Paket? Starten Sie mit dem kostenlosen 24h-Testzugang.
            </p>
            <Link href="/">
              <span style={{ fontSize:13, fontWeight:700, color:"#2563eb", cursor:"pointer" }}>
                Jetzt kostenlos testen →
              </span>
            </Link>
          </div>
        </div>

        {/* ── BOTTOM CTA ────────────────────────────────────────────── */}
        <div style={{ textAlign:"center", padding:"40px 20px", background:"linear-gradient(135deg, #0f172a, #1e3a5f)", borderRadius:20, color:"white" }}>
          <h2 style={{ fontFamily:"Fraunces, Georgia, serif", fontSize:26, fontWeight:800, margin:"0 0 12px" }}>
            Lieber erst ein einzelnes Modul?
          </h2>
          <p style={{ color:"#94a3b8", fontSize:14, margin:"0 0 20px" }}>
            Starten Sie mit einem Einzelmodul und upgraden Sie jederzeit auf ein Paket.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/kurse">
              <button style={{ background:"#2563eb", color:"white", border:"none", borderRadius:10, padding:"11px 24px", fontSize:14, fontWeight:700, cursor:"pointer" }}>
                Einzelmodule ansehen
              </button>
            </Link>
            <Link href="/">
              <button style={{ background:"transparent", color:"#94a3b8", border:"1px solid #334155", borderRadius:10, padding:"11px 24px", fontSize:14, fontWeight:600, cursor:"pointer" }}>
                Zurück zur Startseite
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
