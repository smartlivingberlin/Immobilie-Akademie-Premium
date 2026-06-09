import { useEffect, useState } from "react";
import { scaledFontSize as fz } from "@/lib/a11yFont";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

export default function PartnerDashboard() {
  const { data: user } = trpc.auth.me.useQuery(undefined, { retry: false });
  const [activeTab, setActiveTab] = useState<"overview"|"users"|"content"|"whitelabel"|"codes">("overview");
  const [stats, setStats] = useState<any>(null);
  const [codeUnlocked] = useState(false); // Wird durch Owner-Freigabe aktiviert

  useEffect(() => {
    fetch("/api/owner/stats", { credentials: "include" })
      .then(r => r.json()).then(setStats).catch(() => {});
  }, []);

  const BASE = "https://immobilien-akademie-smart.de";

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", color: "white", padding: "24px 20px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div style={{ background: "#1d4ed8", borderRadius: 10, padding: "8px 10px", fontSize: fz(22) }}>🤝</div>
              <div>
                <h1 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: fz(24), fontWeight: 800, margin: 0, color: "#f1f5f9" }}>
                  Partner-Kontrollzentrum
                </h1>
                <p style={{ color: "#64748b", fontSize: fz(13), margin: 0 }}>
                  Immobilien Akademie Smart · {user?.name || user?.email}
                </p>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/admin">
              <button style={{ background: "#1e293b", color: "#94a3b8", border: "1px solid #334155", padding: "8px 14px", borderRadius: 8, fontSize: fz(12), fontWeight: 600, cursor: "pointer" }}>
                ← Admin-Panel
              </button>
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {[
            { id: "overview", label: "🏠 Übersicht" },
            { id: "users", label: "👥 Nutzer" },
            { id: "content", label: "📚 Inhalte" },
            { id: "whitelabel", label: "🎨 Whitelabel" },
            { id: "codes", label: "🔑 Zugangscodes" },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id as any)}
              style={{ background: activeTab === t.id ? "#1d4ed8" : "#1e293b", color: "white", border: activeTab === t.id ? "none" : "1px solid #334155", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: fz(13), fontWeight: 600 }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Nutzer gesamt", value: stats?.totalUsers ?? "—", icon: "👥", color: "#3b82f6" },
            { label: "Heute aktiv", value: stats?.activeToday ?? "—", icon: "🟢", color: "#10b981" },
            { label: "IHK-Fragen", value: "855", icon: "📝", color: "#f59e0b" },
            { label: "Lerntage", value: "240", icon: "📅", color: "#8b5cf6" },
          ].map(s => (
            <div key={s.label} style={{ background: "#1e293b", borderRadius: 12, padding: "18px 20px", border: "1px solid #334155" }}>
              <div style={{ fontSize: fz(28), marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: fz(26), fontWeight: 800, color: s.color, fontFamily: "Fraunces, Georgia, serif" }}>{s.value}</div>
              <div style={{ fontSize: fz(11), color: "#64748b", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ background: "#1e293b", borderRadius: 12, padding: 24, border: "1px solid #334155" }}>
              <h3 style={{ margin: "0 0 16px", color: "#f1f5f9", fontSize: fz(16), fontWeight: 700 }}>🔗 Schnellzugriff</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
                {[
                  { label: "Nutzerverwaltung", href: "/admin/nutzer", icon: "👥" },
                  { label: "Fragen-Manager", href: "/admin/fragen", icon: "❓" },
                  { label: "KI-Monitor", href: "/admin/ki-monitor", icon: "🤖" },
                  { label: "Whitelabel", href: "/admin/whitelabel", icon: "🎨" },
                  { label: "Videos", href: "/admin/videos", icon: "🎬" },
                  { label: "Glossar", href: "/admin/glossar", icon: "📖" },
                  { label: "Landing Pages", href: "/admin/landing-pages", icon: "🏠" },
                  { label: "Portal-Agent", href: "/admin/portal-agent", icon: "⚡" },
                ].map(l => (
                  <Link key={l.href} href={l.href}>
                    <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 10, padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: fz(20) }}>{l.icon}</span>
                      <span style={{ fontSize: fz(13), color: "#cbd5e1", fontWeight: 500 }}>{l.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ background: "#1e293b", borderRadius: 12, padding: 24, border: "1px solid #334155" }}>
              <h3 style={{ margin: "0 0 12px", color: "#f1f5f9", fontSize: fz(16), fontWeight: 700 }}>ℹ️ Partner-Status</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Zugangscode-Generator", status: codeUnlocked ? "✅ Aktiv" : "🔒 Gesperrt — Lizenzfreigabe erforderlich", ok: codeUnlocked },
                  { label: "Whitelabel-Branding", status: "✅ Verfügbar", ok: true },
                  { label: "Systemeinstellungen", status: "🔒 Nur Eigentümer", ok: false },
                  { label: "Owner-Panel", status: "🔒 Nur Eigentümer", ok: false },
                ].map(s => (
                  <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#0f172a", borderRadius: 8, border: `1px solid ${s.ok ? "#065f46" : "#7f1d1d"}` }}>
                    <span style={{ fontSize: fz(13), color: "#cbd5e1" }}>{s.label}</span>
                    <span style={{ fontSize: fz(12), color: s.ok ? "#10b981" : "#ef4444", fontWeight: 600 }}>{s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div style={{ background: "#1e293b", borderRadius: 12, padding: 24, border: "1px solid #334155" }}>
            <h3 style={{ margin: "0 0 16px", color: "#f1f5f9", fontSize: fz(16), fontWeight: 700 }}>👥 Nutzerverwaltung</h3>
            <p style={{ color: "#64748b", fontSize: fz(13), marginBottom: 16 }}>Vollständige Nutzerverwaltung im Admin-Panel:</p>
            <Link href="/admin/nutzer">
              <button style={{ background: "#1d4ed8", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: fz(13), fontWeight: 600, cursor: "pointer" }}>
                → Nutzerverwaltung öffnen
              </button>
            </Link>
          </div>
        )}

        {/* CONTENT TAB */}
        {activeTab === "content" && (
          <div style={{ display: "grid", gap: 14 }}>
            {[
              { label: "Fragen-Manager", desc: "855 IHK-Fragen verwalten", href: "/admin/fragen", icon: "❓" },
              { label: "Content Upload", desc: "PDFs hochladen → KI generiert Fragen", href: "/admin/upload", icon: "📤" },
              { label: "Videos", desc: "Lernvideos verwalten", href: "/admin/videos", icon: "🎬" },
              { label: "Kursbuch-Generator", desc: "Lernmaterial als PDF", href: "/admin/kursbuch", icon: "📚" },
              { label: "Glossar-Manager", desc: "93 Fachbegriffe", href: "/admin/glossar", icon: "📖" },
            ].map(l => (
              <Link key={l.href} href={l.href}>
                <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: fz(28) }}>{l.icon}</span>
                  <div>
                    <div style={{ fontSize: fz(14), fontWeight: 700, color: "#f1f5f9" }}>{l.label}</div>
                    <div style={{ fontSize: fz(12), color: "#64748b" }}>{l.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* WHITELABEL TAB */}
        {activeTab === "whitelabel" && (
          <div style={{ background: "#1e293b", borderRadius: 12, padding: 24, border: "1px solid #334155" }}>
            <h3 style={{ margin: "0 0 16px", color: "#f1f5f9", fontSize: fz(16), fontWeight: 700 }}>🎨 Whitelabel-Konfiguration</h3>
            <p style={{ color: "#64748b", fontSize: fz(13), marginBottom: 16 }}>Branding und Mandanten-Einstellungen:</p>
            <Link href="/admin/whitelabel">
              <button style={{ background: "#1d4ed8", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: fz(13), fontWeight: 600, cursor: "pointer" }}>
                → Whitelabel öffnen
              </button>
            </Link>
          </div>
        )}

        {/* CODES TAB */}
        {activeTab === "codes" && (
          <div style={{ background: "#1e293b", borderRadius: 12, padding: 24, border: "1px solid #334155" }}>
            <h3 style={{ margin: "0 0 12px", color: "#f1f5f9", fontSize: fz(16), fontWeight: 700 }}>🔑 Zugangscode-Generator</h3>
            {codeUnlocked ? (
              <Link href="/admin/codes">
                <button style={{ background: "#1d4ed8", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: fz(13), fontWeight: 600, cursor: "pointer" }}>
                  → Zugangscodes verwalten
                </button>
              </Link>
            ) : (
              <div style={{ background: "#1a0a0a", border: "1px solid #7f1d1d", borderRadius: 10, padding: "20px 24px" }}>
                <div style={{ fontSize: fz(32), marginBottom: 12 }}>🔒</div>
                <div style={{ fontSize: fz(15), fontWeight: 700, color: "#fca5a5", marginBottom: 8 }}>
                  Funktion gesperrt
                </div>
                <p style={{ color: "#94a3b8", fontSize: fz(13), lineHeight: 1.6, margin: 0 }}>
                  Der Zugangscode-Generator wird nach Abschluss eines Lizenz- oder Kooperationsvertrags
                  durch den Eigentümer freigeschaltet. Bitte kontaktiere den Eigentümer für weitere Informationen.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
