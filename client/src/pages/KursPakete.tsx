import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { CheckCircle2, ArrowRight, Star, Zap, Building2, TrendingUp, Award, Crown } from "lucide-react";
import { trackEvent } from "@/hooks/useAnalytics";

const MODULE_INFO: Record<number, { name: string; short: string; emoji: string }> = {
  1: { name: "Immobilien-Grundkurs",          short: "Grundkurs",      emoji: "🏠" },
  2: { name: "Immobilienmakler § 34c GewO",   short: "Makler §34c",    emoji: "🔑" },
  3: { name: "WEG-Verwalter & Mietrecht",     short: "WEG-Verwalter",  emoji: "🏢" },
  4: { name: "Immobilienbewertung",            short: "Gutachter",      emoji: "📊" },
  5: { name: "Darlehensvermittler § 34i GewO", short: "§34i",          emoji: "💶" },
};

const EINZELPREISE: Record<number, number> = {1:149, 2:499, 3:699, 4:399, 5:499};

const PAKETE = [
  {
    id: "starter",
    name: "Starter-Paket",
    icon: Zap,
    iconColor: "#3b82f6",
    modules: [1,2],
    price: 549,
    desc: "Perfekter Einstieg für angehende Makler",
    highlight: false,
    badge: null,
  },
  {
    id: "verwalter",
    name: "Verwalter-Paket",
    icon: Building2,
    iconColor: "#f59e0b",
    modules: [1,3],
    price: 749,
    desc: "Grundkurs + WEG-Verwaltung kombiniert",
    highlight: false,
    badge: null,
  },
  {
    id: "gutachter",
    name: "Gutachter-Paket",
    icon: TrendingUp,
    iconColor: "#8b5cf6",
    modules: [1,2,4],
    price: 999,
    desc: "Makler + Immobilienbewertung nach ImmoWertV",
    highlight: false,
    badge: null,
  },
  {
    id: "makler-plus",
    name: "Makler-Plus",
    icon: Award,
    iconColor: "#059669",
    modules: [1,2,5],
    price: 1049,
    desc: "Doppellizenz: Makler §34c + Darlehensvermittler §34i",
    highlight: false,
    badge: "Doppellizenz",
  },
  {
    id: "profi",
    name: "Immobilienprofi",
    icon: Star,
    iconColor: "#ef4444",
    modules: [1,2,3],
    price: 1199,
    desc: "Makler + WEG-Verwalter — beliebteste Kombination",
    highlight: true,
    badge: "Beliebtestes",
  },
  {
    id: "komplett",
    name: "Komplett-Ausbildung",
    icon: Crown,
    iconColor: "#d4a853",
    modules: [1,2,3,4,5],
    price: 1955,
    desc: "Alle 5 Berufsbilder — maximale Karrierechancen",
    highlight: false,
    badge: "Bestes Preis-Leistungs",
  },
];

export default function KursPakete() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <SEO
        title="Kurs-Pakete — Alle Module im Vorteilspaket | Immobilien Akademie"
        description="Spare bis zu 290 EUR inkl. MwSt. mit unseren Kurs-Paketen. 6 Kombinationen für jeden Karriereweg — IHK §34c, §34i, WEG-Verwalter, Gutachter."
      />

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)", padding: "64px 20px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display:"inline-block", background:"rgba(37,99,235,0.2)", border:"1px solid rgba(96,165,250,0.4)", color:"#93c5fd", borderRadius:20, padding:"4px 16px", fontSize:12, fontWeight:700, marginBottom:20, letterSpacing:"0.08em" }}>
            💰 VORTEILSPAKETE — BIS ZU 290 EUR inkl. MwSt. SPAREN
          </div>
          <h1 style={{ fontSize:36, fontWeight:800, color:"#f8fafc", marginBottom:12, lineHeight:1.2 }}>
            Kurs-Pakete für jeden Karriereweg
          </h1>
          <p style={{ fontSize:16, color:"#94a3b8", maxWidth:560, margin:"0 auto 24px" }}>
            6 Kombinationen — für Makler, Verwalter, Gutachter und Allrounder.
            Einmalzahlung, dauerhafter Zugang ohne Ablaufdatum.
          </p>
          <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap" }}>
            {[
              { label:"Einzelpreise gesamt", value:"2.245 EUR inkl. MwSt." },
              { label:"Bestes Paket spart", value:"290 EUR inkl. MwSt." },
              { label:"855 IHK-Fragen", value:"enthalten" },
            ].map(s => (
              <div key={s.label} style={{ textAlign:"center" }}>
                <div style={{ fontSize:20, fontWeight:800, color:"#60a5fa" }}>{s.value}</div>
                <div style={{ fontSize:11, color:"#64748b" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 20px" }}>

        {/* Paket-Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16, marginBottom:48 }}>
          {PAKETE.map(p => {
            const einzeln = p.modules.reduce((s, m) => s + EINZELPREISE[m], 0);
            const ersparnis = einzeln - p.price;
            const pct = Math.round(ersparnis / einzeln * 100);
            const Icon = p.icon;
            return (
              <div key={p.id} style={{
                background:"white",
                border: `2px solid ${p.highlight ? p.iconColor : "#e2e8f0"}`,
                borderRadius:16, padding:24, position:"relative",
                boxShadow: p.highlight ? `0 8px 32px ${p.iconColor}25` : "0 2px 8px rgba(0,0,0,0.05)",
                transition:"all 0.2s",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = p.iconColor;
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 12px 32px ${p.iconColor}30`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = p.highlight ? p.iconColor : "#e2e8f0";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = p.highlight ? `0 8px 32px ${p.iconColor}25` : "0 2px 8px rgba(0,0,0,0.05)";
                }}
              >
                {p.badge && (
                  <div style={{
                    position:"absolute", top:-13, left:"50%", transform:"translateX(-50%)",
                    background: p.highlight ? p.iconColor : "#374151",
                    color:"white", borderRadius:20, padding:"3px 14px",
                    fontSize:11, fontWeight:800, whiteSpace:"nowrap",
                  }}>{p.badge}</div>
                )}

                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                  <div style={{ background:`${p.iconColor}15`, borderRadius:10, padding:10 }}>
                    <Icon size={22} color={p.iconColor} />
                  </div>
                  <div>
                    <div style={{ fontSize:15, fontWeight:800, color:"#0f172a" }}>{p.name}</div>
                    <div style={{ fontSize:11, color:"#64748b", marginTop:1 }}>{p.desc}</div>
                  </div>
                </div>

                {/* Module */}
                <div style={{ marginBottom:16 }}>
                  {p.modules.map(m => (
                    <div key={m} style={{ display:"flex", alignItems:"center", gap:7, padding:"3px 0" }}>
                      <CheckCircle2 size={13} color="#059669" />
                      <span style={{ fontSize:12, color:"#374151" }}>
                        {MODULE_INFO[m].emoji} {MODULE_INFO[m].name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Preis */}
                <div style={{ marginBottom:16 }}>
                  <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
                    <span style={{ fontSize:30, fontWeight:800, color:"#0f172a" }}>
                      {p.price.toLocaleString("de-DE")} €
                    </span>
                    <span style={{ fontSize:13, color:"#94a3b8", textDecoration:"line-through" }}>
                      {einzeln.toLocaleString("de-DE")} €
                    </span>
                  </div>
                  <div style={{ fontSize:12, color:"#059669", fontWeight:700 }}>
                    ✓ Du sparst {ersparnis} € ({pct}% Rabatt)
                  </div>
                </div>

                <button
                  onClick={() => {
                    trackEvent("begin_checkout", "Bundle", p.id, p.price);
                    window.location.href = `/api/stripe/bundle-${p.id}`;
                  }}
                  style={{
                    width:"100%", background: p.highlight
                      ? `linear-gradient(135deg, ${p.iconColor}, #7c3aed)`
                      : p.iconColor,
                    color:"white", border:"none", borderRadius:10,
                    padding:"12px", fontSize:14, fontWeight:700,
                    cursor:"pointer", display:"flex", alignItems:"center",
                    justifyContent:"center", gap:6,
                  }}>
                  Paket kaufen <ArrowRight size={15} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Vergleichstabelle */}
        <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:16, overflow:"hidden", marginBottom:32 }}>
          <div style={{ padding:"20px 24px", borderBottom:"1px solid #e2e8f0", background:"#f8fafc" }}>
            <h2 style={{ fontSize:18, fontWeight:700, color:"#0f172a", margin:0 }}>
              Paket-Vergleich auf einen Blick
            </h2>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ background:"#f8fafc" }}>
                  <th style={{ textAlign:"left", padding:"10px 16px", color:"#64748b", fontWeight:600, borderBottom:"1px solid #e2e8f0" }}>Paket</th>
                  {[1,2,3,4,5].map(m => (
                    <th key={m} style={{ textAlign:"center", padding:"10px 12px", color:"#64748b", fontWeight:600, borderBottom:"1px solid #e2e8f0" }}>
                      {MODULE_INFO[m].emoji} M{m}
                    </th>
                  ))}
                  <th style={{ textAlign:"right", padding:"10px 16px", color:"#64748b", fontWeight:600, borderBottom:"1px solid #e2e8f0" }}>Preis</th>
                  <th style={{ textAlign:"right", padding:"10px 16px", color:"#059669", fontWeight:600, borderBottom:"1px solid #e2e8f0" }}>Ersparnis</th>
                </tr>
              </thead>
              <tbody>
                {PAKETE.map((p, i) => {
                  const einzeln = p.modules.reduce((s,m) => s + EINZELPREISE[m], 0);
                  return (
                    <tr key={p.id} style={{ background: i%2===0 ? "white" : "#fafafa" }}>
                      <td style={{ padding:"10px 16px", fontWeight:600, color:"#0f172a", borderBottom:"0.5px solid #f1f5f9" }}>
                        {p.name}
                        {p.highlight && <span style={{ marginLeft:6, fontSize:10, background:"#fef3c7", color:"#92400e", padding:"1px 6px", borderRadius:4, fontWeight:700 }}>TOP</span>}
                      </td>
                      {[1,2,3,4,5].map(m => (
                        <td key={m} style={{ textAlign:"center", padding:"10px 12px", borderBottom:"0.5px solid #f1f5f9" }}>
                          {p.modules.includes(m)
                            ? <span style={{ color:"#059669", fontSize:16 }}>✓</span>
                            : <span style={{ color:"#e2e8f0" }}>—</span>}
                        </td>
                      ))}
                      <td style={{ textAlign:"right", padding:"10px 16px", fontWeight:700, color:"#0f172a", borderBottom:"0.5px solid #f1f5f9" }}>
                        {p.price.toLocaleString("de-DE")} €
                      </td>
                      <td style={{ textAlign:"right", padding:"10px 16px", fontWeight:700, color:"#059669", borderBottom:"0.5px solid #f1f5f9" }}>
                        -{einzeln - p.price} €
                      </td>
                    </tr>
                  );
                })}
                {/* Einzeln-Zeile */}
                <tr style={{ background:"#fef2f2" }}>
                  <td style={{ padding:"10px 16px", fontWeight:600, color:"#dc2626" }}>Alle einzeln kaufen</td>
                  {[1,2,3,4,5].map(m => (
                    <td key={m} style={{ textAlign:"center", padding:"10px 12px", color:"#dc2626", fontSize:11 }}>
                      {EINZELPREISE[m]} €
                    </td>
                  ))}
                  <td style={{ textAlign:"right", padding:"10px 16px", fontWeight:700, color:"#dc2626" }}>2.245 €</td>
                  <td style={{ textAlign:"right", padding:"10px 16px", color:"#dc2626" }}>0 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign:"center" }}>
          <p style={{ color:"#64748b", fontSize:14, marginBottom:8 }}>
            Lieber ein einzelnes Modul zuerst testen?
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
            <Link href="/kurse">
              <span style={{ color:"#3b82f6", fontWeight:600, fontSize:14, cursor:"pointer" }}>
                Einzelmodule ansehen →
              </span>
            </Link>
            <span style={{ color:"#e2e8f0" }}>|</span>
            <Link href="/">
              <span style={{ color:"#3b82f6", fontWeight:600, fontSize:14, cursor:"pointer" }}>
                Kostenlos testen →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
