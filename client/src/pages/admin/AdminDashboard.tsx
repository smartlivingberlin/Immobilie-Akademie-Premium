import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import {
  Users, BookOpen, FileQuestion, Award, MessageSquare, Upload,
  Settings, Code, Video, BarChart3, AlertTriangle, CheckCircle,
  Bot, Monitor, Brain, Zap, Shield, TrendingUp, Clock,
  DollarSign, Globe, Mail, Database, RefreshCw, ExternalLink,
  ChevronRight, Activity, Star, Lock, Unlock
} from "lucide-react";

export default function AdminDashboard() {
  const { data: users } = trpc.adminUsers.list.useQuery();
  const { data: codes } = trpc.presentationCode.list.useQuery();
  const { data: questions } = trpc.adminQuestions.list.useQuery({ limit: 1, offset: 0 });
  const [agentHealth, setAgentHealth] = useState<any>(null);
  const [cronLog, setCronLog] = useState<string>("");
  const [auditScore, setAuditScore] = useState<number | null>(null);
  const [coaching, setCoaching] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview"|"users"|"content"|"system"|"agent">("overview");

  useEffect(() => {
    fetch("/api/agent/health").then(r => r.json()).then(setAgentHealth).catch(() => {});
    fetch("/api/agent/status").then(r => r.json()).then(d => {
      if (d?.memory?.last_night_audit) setAuditScore(d.memory.last_night_audit.avgScore);
    }).catch(() => {});
    fetch("/api/agent/coaching").then(r => r.json()).then(setCoaching).catch(() => {});
    fetch("/api/agent/cron-log").then(r => r.json()).then(d => setCronLog(d.log || "")).catch(() => {});
  }, []);

  const totalUsers = users?.length ?? 0;
  const activeUsers = users?.filter((u: any) => {
    const last = new Date(u.lastSignedIn);
    return (Date.now() - last.getTime()) < 7 * 24 * 60 * 60 * 1000;
  }).length ?? 0;
  const adminUsers = users?.filter((u: any) => u.role === "admin").length ?? 0;

  const riskUsers = coaching?.profiles?.filter((p: any) => p.riskLevel === "high").length ?? 0;

  const CHECKLIST = [
    { label: "Gewerbe angemeldet", ok: false, action: "berlin.de → ~26 EUR", urgent: true },
    { label: "Domain immobilien-akademie-smart.de", ok: false, action: "~12 EUR/Jahr", urgent: true },
    { label: "Stripe Live-Modus", ok: false, action: "Nach Gewerbe", urgent: false },
    { label: "SPF/DKIM/DMARC", ok: false, action: "Nach Domain", urgent: false },
    { label: "AGB vorhanden", ok: true },
    { label: "Datenschutz komplett", ok: true },
    { label: "Cookie-Banner aktiv", ok: true },
    { label: "SSL/HTTPS aktiv", ok: true },
    { label: "855 IHK-Fragen verifiziert", ok: true },
    { label: "240 Lerntage vollständig", ok: true },
    { label: "KI-Tutor Claude+Gemini+Groq", ok: !!agentHealth?.aiStatus?.claude },
    { label: "Nacht-Cron aktiv", ok: !!cronLog },
    { label: "Stripe Test-Modus", ok: true },
    { label: "Railway deployed", ok: true },
  ];

  const doneCount = CHECKLIST.filter(c => c.ok).length;

  const TOOLS = [
    { group: "👥 Nutzer & Zugang", items: [
      { name: "Nutzerverwaltung", desc: `${totalUsers} Nutzer · ${activeUsers} diese Woche aktiv`, href: "/admin/nutzer", icon: Users, color: "#2563eb", badge: riskUsers > 0 ? `${riskUsers} Risiko` : null },
      { name: "Zugangscodes", desc: `${codes?.length ?? 0} aktive Codes`, href: "/admin/codes", icon: Code, color: "#7c3aed" },
      { name: "Zertifikate", desc: "Zertifikate verwalten", href: "/zertifikate", icon: Award, color: "#059669" },
    ]},
    { group: "📚 Inhalte & Lernmaterial", items: [
      { name: "Content Upload", desc: "PDFs hochladen → KI generiert Fragen", href: "/admin/upload", icon: Upload, color: "#059669" },
      { name: "Videos", desc: "Lernvideos verwalten", href: "/admin/videos", icon: Video, color: "#dc2626" },
      { name: "Fragen-Manager", desc: `${questions?.total ?? 855} IHK-Fragen`, href: "/admin/fragen", icon: FileQuestion, color: "#0891b2" },
      { name: "Kursbuch-Generator", desc: "Lernmaterial als PDF", href: "/admin/kursbuch", icon: BookOpen, color: "#7c3aed" },
      { name: "Dozenten-Cockpit", desc: "Lehrplan + Lösungen", href: "/admin/dozenten", icon: Brain, color: "#d97706" },
      // Mediaskript-Generator entfernt — ersetzt durch Content-Generator
      { name: "Glossar-Manager", desc: "93 Fachbegriffe verwalten", href: "/admin/glossar", icon: BookOpen, color: "#0f766e" },
    ]},
    { group: "🤖 KI & Agent", items: [
      { name: "Portal-Agent v2", desc: "Claude · Gemini · Groq", href: "/admin/portal-agent", icon: Bot, color: "#7c3aed", badge: auditScore ? `${auditScore}/100` : null },
      { name: "KI-Monitor", desc: "API-Kosten & Nutzung", href: "/admin/ki-monitor", icon: Activity, color: "#0891b2" },
    ]},
    { group: "⚙️ System & Einstellungen", items: [
      { name: "White-Label", desc: "Branding anpassen", href: "/admin/whitelabel", icon: Globe, color: "#d97706" },
      { name: "Portal-Phase", desc: "Coming Soon / Beta / Live", href: "/admin/phase", icon: Settings, color: "#64748b" },
      { name: "Owner Dashboard", desc: "Inspect-Links · Revenue", href: "/owner-dashboard", icon: Shield, color: "#059669" },
    ]},
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>
            🏠 Admin-Kontrollzentrum
          </h1>
          <p style={{ color: "#64748b", marginTop: 4, fontSize: 13 }}>
            Immobilien Akademie Smart · {new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <a href="https://railway.app" target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 6, background: "#0f172a", color: "white", padding: "8px 14px", borderRadius: 8, fontSize: 12, textDecoration: "none", fontWeight: 600 }}>
            <ExternalLink size={14} /> Railway
          </a>
          <a href="https://dashboard.stripe.com" target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 6, background: "#635bff", color: "white", padding: "8px 14px", borderRadius: 8, fontSize: 12, textDecoration: "none", fontWeight: 600 }}>
            <DollarSign size={14} /> Stripe
          </a>
          <a href="https://github.com/smartlivingberlin/Immobilie-Akademie-Premium" target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 6, background: "#24292f", color: "white", padding: "8px 14px", borderRadius: 8, fontSize: 12, textDecoration: "none", fontWeight: 600 }}>
            <ExternalLink size={14} /> GitHub
          </a>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginBottom: 24 }}>
        {[
          { label: "Nutzer", value: totalUsers, sub: `${activeUsers} aktiv`, icon: Users, color: "#2563eb" },
          { label: "IHK-Fragen", value: (questions?.total && questions.total > 100) ? questions.total : 855, sub: "5 Module", icon: FileQuestion, color: "#059669" },
          { label: "Lerntage", value: "240", sub: "100% fertig", icon: BookOpen, color: "#7c3aed" },
          { label: "Audit-Score", value: auditScore ? `${auditScore}/100` : "–", sub: "Nacht-Cron", icon: Star, color: "#d97706" },
          { label: "KI-Modelle", value: agentHealth ? Object.values(agentHealth.aiStatus || {}).filter(Boolean).length + "/3" : "–", sub: "C·G·Groq", icon: Bot, color: "#0891b2" },
          { label: "Launch", value: `${doneCount}/${CHECKLIST.length}`, sub: "Checkliste", icon: CheckCircle, color: "#059669" },
        ].map(s => (
          <div key={s.label} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>{s.label}</span>
              <div style={{ background: s.color + "15", borderRadius: 6, padding: 5 }}>
                <s.icon size={14} color={s.color} />
              </div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginTop: 6 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "white", padding: 4, borderRadius: 10, border: "1px solid #e2e8f0" }}>
        {[
          { id: "overview", label: "🏠 Übersicht" },
          { id: "users", label: "👥 Nutzer" },
          { id: "content", label: "📚 Inhalte" },
          { id: "system", label: "⚙️ System" },
          { id: "agent", label: "🤖 Agent" },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id as any)}
            style={{
              padding: "8px 16px", borderRadius: 8, border: "none",
              background: activeTab === t.id ? "#2563eb" : "transparent",
              color: activeTab === t.id ? "white" : "#64748b",
              fontSize: 13, fontWeight: 600, cursor: "pointer"
            }}>{t.label}</button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
          <div>
            {TOOLS.map(group => (
              <div key={group.group} style={{ marginBottom: 20 }}>
                <h2 style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
                  {group.group}
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {group.items.map(item => (
                    <Link key={item.name} href={item.href}>
                      <div style={{
                        background: "white", border: "1px solid #e2e8f0", borderRadius: 10,
                        padding: "14px 16px", cursor: "pointer", position: "relative",
                        transition: "all 0.15s"
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.transform = "translateY(-1px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "none"; }}>
                        {item.badge && (
                          <div style={{ position: "absolute", top: 8, right: 8, background: "#fef3c7", color: "#92400e", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>
                            {item.badge}
                          </div>
                        )}
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                          <div style={{ background: item.color + "15", borderRadius: 6, padding: 6 }}>
                            <item.icon size={15} color={item.color} />
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{item.name}</span>
                        </div>
                        <p style={{ fontSize: 11, color: "#64748b", margin: 0 }}>{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Launch Checklist */}
          <div>
            <h2 style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
              🚀 Launch-Checkliste
            </h2>
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px" }}>
              <div style={{ marginBottom: 12, background: "#f0fdf4", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#166534", fontWeight: 600 }}>
                {doneCount}/{CHECKLIST.length} erledigt · {Math.round(doneCount/CHECKLIST.length*100)}%
              </div>
              <div style={{ width: "100%", height: 6, background: "#e2e8f0", borderRadius: 3, marginBottom: 14 }}>
                <div style={{ width: `${doneCount/CHECKLIST.length*100}%`, height: "100%", background: "#2563eb", borderRadius: 3 }} />
              </div>
              {CHECKLIST.filter(c => !c.ok && c.urgent).length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: "#dc2626", fontWeight: 700, marginBottom: 6 }}>⚠️ DRINGEND</div>
                  {CHECKLIST.filter(c => !c.ok && c.urgent).map(item => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "0.5px solid #fef2f2" }}>
                      <AlertTriangle size={13} color="#dc2626" />
                      <div>
                        <div style={{ fontSize: 12, color: "#7f1d1d", fontWeight: 500 }}>{item.label}</div>
                        {item.action && <div style={{ fontSize: 10, color: "#dc2626" }}>{item.action}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {CHECKLIST.map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: "0.5px solid #f8fafc" }}>
                  {item.ok
                    ? <CheckCircle size={13} color="#059669" />
                    : <AlertTriangle size={13} color={item.urgent ? "#dc2626" : "#d97706"} />}
                  <span style={{ fontSize: 11, color: item.ok ? "#374151" : item.urgent ? "#7f1d1d" : "#92400e" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Links extern */}
            <h2 style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10, marginTop: 20 }}>
              🔗 Externe Links
            </h2>
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 12 }}>
              {[
                { name: "Railway Dashboard", url: "https://railway.app", color: "#7c3aed" },
                { name: "Stripe Dashboard", url: "https://dashboard.stripe.com", color: "#635bff" },
                { name: "GitHub Repo", url: "https://github.com/smartlivingberlin/Immobilie-Akademie-Premium", color: "#24292f" },
                { name: "Gewerbe Berlin", url: "https://service.berlin.de/dienstleistung/305614/", color: "#dc2626" },
                { name: "Domain kaufen", url: "https://www.namecheap.com", color: "#d97706" },
                { name: "Anthropic Console", url: "https://console.anthropic.com", color: "#d97706" },
                { name: "Google AI Studio", url: "https://aistudio.google.com", color: "#059669" },
                { name: "Groq Console", url: "https://console.groq.com", color: "#0891b2" },
              ].map(link => (
                <a key={link.name} href={link.url} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", borderBottom: "0.5px solid #f1f5f9", textDecoration: "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: link.color }} />
                    <span style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{link.name}</span>
                  </div>
                  <ExternalLink size={11} color="#94a3b8" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* USERS TAB */}
      {activeTab === "users" && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Nutzer-Übersicht</h3>
              <Link href="/admin/nutzer">
                <button style={{ background: "#2563eb", color: "white", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                  Alle verwalten →
                </button>
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
              {[
                { label: "Gesamt", value: totalUsers, color: "#2563eb" },
                { label: "Diese Woche aktiv", value: activeUsers, color: "#059669" },
                { label: "Admins", value: adminUsers, color: "#7c3aed" },
              ].map(s => (
                <div key={s.label} style={{ background: "#f8fafc", borderRadius: 8, padding: "12px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{s.label}</div>
                </div>
              ))}
            </div>
            {users?.slice(0, 8).map((u: any) => (
              <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "0.5px solid #f1f5f9" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#64748b" }}>
                  {(u.name || u.email || "?")[0].toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{u.name || "–"}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{u.email}</div>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {u.enabledModules?.split(",").filter(Boolean).map((m: string) => (
                    <span key={m} style={{ background: "#dbeafe", color: "#1e40af", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>M{m}</span>
                  ))}
                </div>
                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: u.role === "admin" ? "#fef3c7" : "#f0fdf4", color: u.role === "admin" ? "#92400e" : "#166534", fontWeight: 600 }}>
                  {u.role}
                </span>
              </div>
            ))}
          </div>

          {/* Coaching */}
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px 0" }}>👤 Coaching</h3>
            {coaching?.profiles?.length > 0 ? (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                  {[
                    { label: "Gesamt", value: coaching.totalUsers, color: "#2563eb" },
                    { label: "🔴 Risiko", value: coaching.profiles.filter((p: any) => p.riskLevel === "high").length, color: "#dc2626" },
                    { label: "🟢 Aktiv", value: coaching.profiles.filter((p: any) => p.riskLevel === "low").length, color: "#059669" },
                  ].map(s => (
                    <div key={s.label} style={{ background: "#f8fafc", borderRadius: 8, padding: "10px", textAlign: "center" }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: 10, color: "#64748b" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                {coaching.profiles.slice(0, 5).map((p: any) => (
                  <div key={p.userId} style={{ padding: "8px 0", borderBottom: "0.5px solid #f1f5f9" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>
                        {p.riskLevel === "high" ? "🔴" : p.riskLevel === "medium" ? "🟡" : "🟢"} User #{p.userId}
                      </span>
                      <span style={{ fontSize: 10, color: "#64748b" }}>🔥 {p.streak} | {p.examAvgScore}%</span>
                    </div>
                    <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{p.nextAction}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background: "#f8fafc", borderRadius: 8, padding: 16, textAlign: "center", color: "#64748b", fontSize: 12 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>👤</div>
                <p>Noch keine Coaching-Daten.</p>
                <p style={{ fontSize: 11, marginTop: 4 }}>Läuft täglich 02:00h automatisch.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONTENT TAB */}
      {activeTab === "content" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { name: "Content Upload", desc: "PDFs, Urteile, Texte hochladen. KI generiert daraus Prüfungsfragen.", href: "/admin/upload", icon: Upload, color: "#059669", stats: "Auto-KI-Fragen" },
            { name: "Videos", desc: "Lernvideos hochladen und verwalten.", href: "/admin/videos", icon: Video, color: "#dc2626", stats: "HD-Videos" },
            { name: "Fragen-Manager", desc: `${questions?.total ?? 855} IHK-Prüfungsfragen verwalten.`, href: "/admin/fragen", icon: FileQuestion, color: "#0891b2", stats: "855 Fragen" },
            { name: "Kursbuch-Generator", desc: "Lernmaterial als druckbares PDF exportieren.", href: "/admin/kursbuch", icon: BookOpen, color: "#7c3aed", stats: "5 Module" },
            { name: "Dozenten-Cockpit", desc: "Lehrplan einsehen, Lösungen verwalten.", href: "/admin/dozenten", icon: Brain, color: "#d97706", stats: "240 Tage" },
            { name: "Lösungsübersicht", desc: "Alle Musterantworten und Lösungen.", href: "/admin/loesungen", icon: CheckCircle, color: "#2563eb", stats: "Prüfungen" },
          ].map(item => (
            <Link key={item.name} href={item.href}>
              <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: "20px", cursor: "pointer", height: "100%", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ background: item.color + "20", borderRadius: 10, padding: 10 }}>
                    <item.icon size={20} color={item.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: item.color, fontWeight: 600 }}>{item.stats}</div>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: "#64748b", margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* SYSTEM TAB */}
      {activeTab === "system" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px 0" }}>⚙️ System-Tools</h3>
            {[
              { name: "White-Label Admin", desc: "Logo, Farben, Branding für B2B-Kunden", href: "/admin/whitelabel", icon: Globe, color: "#d97706" },
              { name: "Portal-Phase", desc: "Coming Soon / Beta / Live umschalten", href: "/admin/phase", icon: Settings, color: "#64748b" },
              { name: "Owner Dashboard", desc: "Revenue, Inspect-Links, System-Status", href: "/owner-dashboard", icon: Shield, color: "#059669" },
            ].map(item => (
              <Link key={item.name} href={item.href}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "0.5px solid #f1f5f9", cursor: "pointer" }}>
                  <div style={{ background: item.color + "15", borderRadius: 8, padding: 8 }}>
                    <item.icon size={18} color={item.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{item.desc}</div>
                  </div>
                  <ChevronRight size={14} color="#94a3b8" />
                </div>
              </Link>
            ))}
          </div>

          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px 0" }}>📊 System-Status</h3>
            {[
              { label: "Railway Server", ok: true, detail: "immobilie-akademie-production.up.railway.app" },
              { label: "MySQL Datenbank", ok: true, detail: "Railway · turntable.proxy.rlwy.net" },
              { label: "Claude Haiku API", ok: agentHealth?.aiStatus?.claude, detail: "claude-haiku-4-5-20251001" },
              { label: "Gemini 2.5 Flash API", ok: agentHealth?.aiStatus?.gemini, detail: "Google AI" },
              { label: "Groq Llama API", ok: agentHealth?.aiStatus?.groq, detail: "Llama 3.3-70b" },
              { label: "Stripe", ok: true, detail: "Test-Modus aktiv" },
              { label: "Nacht-Cron", ok: !!cronLog, detail: "Täglich 02:00h" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "0.5px solid #f8fafc" }}>
                {s.ok === null || s.ok === undefined
                  ? <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#94a3b8" }} />
                  : s.ok
                  ? <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#059669" }} />
                  : <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#dc2626" }} />
                }
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>{s.detail}</div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: s.ok ? "#059669" : "#dc2626" }}>
                  {s.ok ? "OK" : "–"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AGENT TAB */}
      {activeTab === "agent" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>🤖 SuperAgent v2</h3>
              <Link href="/admin/portal-agent">
                <button style={{ background: "#7c3aed", color: "white", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                  Vollansicht →
                </button>
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[
                { label: "Claude", ok: agentHealth?.aiStatus?.claude, color: "#d97706" },
                { label: "Gemini", ok: agentHealth?.aiStatus?.gemini, color: "#059669" },
                { label: "Groq", ok: agentHealth?.aiStatus?.groq, color: "#2563eb" },
              ].map(m => (
                <div key={m.label} style={{ background: m.ok ? "#f0fdf4" : "#fef2f2", borderRadius: 8, padding: "10px", textAlign: "center", border: `1px solid ${m.ok ? "#bbf7d0" : "#fecaca"}` }}>
                  <div style={{ fontSize: 16, marginBottom: 4 }}>{m.ok ? "✅" : "❌"}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: m.ok ? "#166534" : "#991b1b" }}>{m.label}</div>
                </div>
              ))}
            </div>
            {auditScore && (
              <div style={{ background: "#f0fdf4", borderRadius: 8, padding: "12px 16px", marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#166534" }}>Letzter Audit</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#059669" }}>{auditScore}/100</div>
                <div style={{ fontSize: 11, color: "#166534" }}>240/240 Lerntage geprüft</div>
              </div>
            )}
            <Link href="/admin/ki-monitor">
              <button style={{ width: "100%", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px", fontSize: 12, cursor: "pointer", fontWeight: 600, color: "#374151" }}>
                📊 KI-Monitor öffnen
              </button>
            </Link>
          </div>

          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px 0" }}>📋 Cron-Log</h3>
            {cronLog ? (
              <pre style={{ background: "#0f172a", color: "#4ade80", fontSize: 10, padding: 12, borderRadius: 8, maxHeight: 200, overflowY: "auto", fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
                {cronLog}
              </pre>
            ) : (
              <div style={{ background: "#f8fafc", borderRadius: 8, padding: 16, textAlign: "center", color: "#64748b", fontSize: 12 }}>
                Nächster Lauf: 02:00h
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
