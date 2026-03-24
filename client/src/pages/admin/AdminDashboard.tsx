import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Users, BookOpen, FileQuestion, Award, MessageSquare, Upload, Settings, Code, Video, BarChart3, AlertTriangle, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  const { data: users } = trpc.adminUsers.list.useQuery();
  const { data: codes } = trpc.presentationCode.list.useQuery();
  const { data: questions } = trpc.adminQuestions.list.useQuery({ limit: 9999, offset: 0 });

  const stats = [
    { label: "Nutzer gesamt", value: users?.length ?? "–", icon: Users, color: "#2563eb", href: "/admin/nutzer" },
    { label: "Zugangscodes", value: codes?.length ?? "–", icon: Code, color: "#7c3aed", href: "/admin/codes" },
    { label: "Prüfungsfragen", value: questions?.total ?? "521", icon: FileQuestion, color: "#059669", href: "/admin/fragen" },
    { label: "Module", value: "5", icon: BookOpen, color: "#d97706", href: "/admin/fragen" },
  ];

  const sections = [
    {
      title: "Nutzer & Zugang",
      items: [
        { name: "Nutzerverwaltung", desc: "Alle Nutzer, Rollen, Module freischalten", href: "/admin/nutzer", icon: Users, color: "#2563eb" },
        { name: "Zugangscodes", desc: "Demo- und Präsentationscodes verwalten", href: "/admin/codes", icon: Code, color: "#7c3aed" },
      ]
    },
    {
      title: "Inhalte & Lernmaterial",
      items: [
        { name: "Content Upload", desc: "PDFs, Urteile, Texte hochladen → KI generiert Fragen", href: "/admin/upload", icon: Upload, color: "#059669" },
        { name: "Videos", desc: "Lernvideos verwalten und hochladen", href: "/admin/videos", icon: Video, color: "#dc2626" },
      ]
    },
    {
      title: "Portal & System",
      items: [
        { name: "White-Label", desc: "Logo, Farben, Branding anpassen", href: "/admin/whitelabel", icon: Settings, color: "#d97706" },
        { name: "Portal-Phase", desc: "Coming Soon, Beta oder Live-Modus", href: "/admin/phase", icon: BarChart3, color: "#0891b2" },
      ]
    }
  ];

  const checklist = [
    { label: "Demo-Code aktiv (DEMO-2026-PREVIEW)", ok: true },
    { label: "KI-Tutor Claude Haiku", ok: true },
    { label: "Stripe Test-Modus", ok: true },
    { label: "AGB vorhanden", ok: false },
    { label: "Stripe Live-Modus", ok: false },
    { label: "Domain registriert", ok: false },
    { label: "ZFU-Zulassung", ok: false },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", margin: 0 }}>Admin-Kontrollzentrum</h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>Immobilien Akademie Smart — Übersicht und Verwaltung</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 18px", cursor: "pointer", transition: "box-shadow 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ background: s.color + "15", borderRadius: 8, padding: 8 }}>
                  <s.icon size={18} color={s.color} />
                </div>
                <span style={{ fontSize: 12, color: "#64748b" }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#0f172a" }}>{s.value}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        {/* Sections */}
        <div>
          {sections.map((section) => (
            <div key={section.title} style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>{section.title}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {section.items.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 18px", cursor: "pointer", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                        <div style={{ background: item.color + "15", borderRadius: 8, padding: 8 }}>
                          <item.icon size={18} color={item.color} />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{item.name}</span>
                      </div>
                      <p style={{ fontSize: 12, color: "#64748b", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Launch Checklist */}
        <div>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Launch-Checkliste</h2>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 18px" }}>
            {checklist.map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "0.5px solid #f1f5f9" }}>
                {item.ok
                  ? <CheckCircle size={16} color="#059669" />
                  : <AlertTriangle size={16} color="#d97706" />}
                <span style={{ fontSize: 12, color: item.ok ? "#374151" : "#92400e" }}>{item.label}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: "8px 12px", background: "#f0fdf4", borderRadius: 8, fontSize: 11, color: "#166534" }}>
              {checklist.filter(c => c.ok).length}/{checklist.length} Punkte erledigt
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
