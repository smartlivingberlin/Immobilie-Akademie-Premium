import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { CheckCircle2, Zap, Crown, Star, ArrowRight } from "lucide-react";
import { trackEvent } from "@/hooks/useAnalytics";

const MODULE_NAMES: Record<number, string> = {
  1: "Immobilien-Grundkurs",
  2: "Makler § 34c GewO",
  3: "WEG-Verwalter & Mietrecht",
  4: "Gutachter & Sachverständiger",
  5: "Darlehensvermittler § 34i",
};

const PAKETE = [
  {
    id: "starter",
    name: "Starter-Paket",
    icon: <Zap size={28} color="#60a5fa" />,
    modules: [1, 2],
    singlePrice: 298,
    price: 249,
    savings: 49,
    color: "#3b82f6",
    popular: false,
    desc: "Ideal für angehende Immobilienmakler",
    stripe: "/api/stripe/bundle-starter",
  },
  {
    id: "professional",
    name: "Professional-Paket",
    icon: <Star size={28} color="#f59e0b" />,
    modules: [1, 2, 3],
    singlePrice: 447,
    price: 369,
    savings: 78,
    color: "#f59e0b",
    popular: true,
    desc: "Makler + WEG-Verwalter — beliebteste Kombination",
    stripe: "/api/stripe/bundle-professional",
  },
  {
    id: "complete",
    name: "Komplett-Paket",
    icon: <Crown size={28} color="#a78bfa" />,
    modules: [1, 2, 3, 4, 5],
    singlePrice: 745,
    price: 599,
    savings: 146,
    color: "#8b5cf6",
    popular: false,
    desc: "Alle 5 Berufsbilder — maximale Flexibilität",
    stripe: "/api/stripe/bundle-complete",
  },
];

export default function KursPakete() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <SEO
        title="Kurs-Pakete — Alle Module im Vorteilspaket"
        description="Spare bis zu 146 EUR mit unseren Kurs-Paketen. Starter, Professional oder Komplett — IHK-Vorbereitung für alle 5 Immobilien-Berufsbilder."
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-block", background: "#dbeafe", color: "#1d4ed8", borderRadius: 20, padding: "4px 16px", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
            💰 JETZT SPAREN
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>
            Kurs-Pakete zum Vorzugspreis
          </h1>
          <p style={{ fontSize: 17, color: "#64748b", maxWidth: 500, margin: "0 auto" }}>
            Mehrere Module kombinieren und bis zu <strong style={{ color: "#059669" }}>146 EUR</strong> sparen.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 48 }}>
          {PAKETE.map(p => (
            <div key={p.id} style={{
              background: "white",
              border: `2px solid ${p.popular ? p.color : "#e2e8f0"}`,
              borderRadius: 16,
              padding: 28,
              position: "relative",
              boxShadow: p.popular ? `0 8px 30px ${p.color}30` : "0 2px 8px rgba(0,0,0,0.06)",
            }}>
              {p.popular && (
                <div style={{
                  position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                  background: p.color, color: "white", borderRadius: 20,
                  padding: "4px 16px", fontSize: 12, fontWeight: 700,
                }}>BELIEBTESTES</div>
              )}
              <div style={{ marginBottom: 16 }}>{p.icon}</div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>{p.name}</h2>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>{p.desc}</p>

              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: "#0f172a" }}>{p.price} €</span>
                  <span style={{ fontSize: 14, color: "#94a3b8", textDecoration: "line-through" }}>{p.singlePrice} €</span>
                </div>
                <div style={{ fontSize: 13, color: "#059669", fontWeight: 700 }}>
                  Du sparst {p.savings} EUR ({Math.round(p.savings/p.singlePrice*100)}%)
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                {p.modules.map(m => (
                  <div key={m} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0" }}>
                    <CheckCircle2 size={15} color="#059669" />
                    <span style={{ fontSize: 13, color: "#374151" }}>Modul {m}: {MODULE_NAMES[m]}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  trackEvent('begin_checkout', 'Bundle', p.id, p.price);
                  window.location.href = p.stripe;
                }}
                style={{
                  width: "100%", background: p.color, color: "white",
                  border: "none", borderRadius: 10, padding: "14px",
                  fontSize: 15, fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                Paket kaufen <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 8 }}>
            Lieber ein einzelnes Modul?
          </p>
          <Link href="/kurse">
            <span style={{ color: "#3b82f6", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Alle Einzelmodule ansehen →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
