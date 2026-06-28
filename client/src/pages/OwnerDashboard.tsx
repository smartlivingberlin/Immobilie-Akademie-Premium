import { useEffect, useState } from "react";
import { scaledFontSize as fz } from "@/lib/a11yFont";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { AzavPdfExport } from "@/components/AzavPdfExport";
import { ComfortBar } from "@/components/ComfortBar";

interface DashboardStats {
  totalUsers: number;
  activeToday: number;
  trialLeads: number;
  revenue: number;
  modulesUnlocked: Record<string, number>;
  recentUsers: Array<{name: string; email: string; role: string; createdAt: string; enabledModules: string}>;
  systemHealth: {server: boolean; db: boolean; stripe: boolean};
}

export default function OwnerDashboard() {
  // Inspect-Token Generator
  const [inspectToken, setInspectToken] = useState<string | null>(null);
  const [inspectExpiry, setInspectExpiry] = useState<string | null>(null);
  const [inspectLoading, setInspectLoading] = useState(false);
  const [inspectCopied, setInspectCopied] = useState(false);
  const [inspectHours, setInspectHours] = useState<48|72>(72);
  const BASE_URL = window.location.origin;

  const createInspectLink = async () => {
    setInspectLoading(true);
    setActionMsg("");
    try {
      const res = await fetch("/api/owner/inspect-token", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hours: inspectHours }),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionMsg(`❌ Inspect-Link Fehler: ${data.error || "Nicht autorisiert"}`);
        return;
      }
      if (data.token) {
        setInspectToken(data.token);
        const exp = new Date(data.expiresAt).toLocaleString("de-DE");
        setInspectExpiry(exp);
        setActionMsg("✅ Inspect-Link erstellt");
      }
    } catch(e) {
      console.error("Inspect-Token Fehler:", e);
      setActionMsg("❌ Inspect-Link konnte nicht erstellt werden");
    } finally {
      setInspectLoading(false);
    }
  };

  const copyInspectLink = () => {
    if (!inspectToken) return;
    const link = `${BASE_URL}/inspect/${inspectToken}`;
    navigator.clipboard.writeText(link);
    setInspectCopied(true);
    setTimeout(() => setInspectCopied(false), 2000);
  };

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [live, setLive] = useState<any>(null);
  const [activity, setActivity] = useState<any>(null);
  const [auditEvents, setAuditEvents] = useState<any>(null);
  const [auditFilter, setAuditFilter] = useState("");
  const [auditTypeFilter, setAuditTypeFilter] = useState("");
  const [statsData, setStatsData] = useState<any>(null);
  const [azavReport, setAzavReport] = useState<any>(null);
  const [azavLoading, setAzavLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"users"|"revenue"|"live"|"activity"|"events"|"stats"|"azav"|"settings"|"videos">("users");
  const [revenue, setRevenue] = useState<any>(null);
  const [settings, setSettings] = useState<Record<string,string>>({});
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => {
    // Owner-Key aus URL speichern fuer spaetere API-Calls
    const urlKey = new URLSearchParams(window.location.search).get("key");
    if (urlKey) sessionStorage.setItem("ownerKey", urlKey);
    const ownerKey = urlKey || sessionStorage.getItem("ownerKey") || "";
    // Live-Monitoring alle 30s aktualisieren
    const fetchLive = () => fetch("/api/owner/live", {
      credentials: "include", headers: { "x-owner-key": ownerKey }
    }).then(r => r.json()).then(setLive).catch(() => {});
    fetchLive();
    const liveInterval = setInterval(fetchLive, 30000);
    setTimeout(() => clearInterval(liveInterval), 1800000); // 30min max
    // Aktivitaets-Log laden
    fetch("/api/owner/settings", { credentials:"include", headers:{"x-owner-key":sessionStorage.getItem("ownerKey")||""} })
      .then(r => r.json()).then(d => { if(d.settings) setSettings(d.settings); }).catch(() => {});

    fetch("/api/owner/activity", { credentials:"include", headers:{"x-owner-key":sessionStorage.getItem("ownerKey")||""} })
      .then(r => r.json()).then(setActivity).catch(()=>{});
    fetch("/api/owner/audit-events?limit=100&sinceHours=168", {
      credentials: "include", headers: { "x-owner-key": ownerKey },
    }).then(r => r.json()).then(setAuditEvents).catch(() => {});
    // Stats laden
    fetch("/api/owner/stats", { credentials:"include", headers:{"x-owner-key":sessionStorage.getItem("ownerKey")||""} })
      .then(r => r.json()).then(setStatsData).catch(()=>{});
    fetch("/api/owner/dashboard", { credentials: "include", headers: { "x-owner-key": ownerKey } })
      .then(r => r.json())
      .then(d => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
    fetch("/api/owner/revenue", { credentials: "include", headers: { "x-owner-key": ownerKey } })
      .then(r => r.json())
      .then(setRevenue)
      .catch(() => {});
  }, []);

  const lockUser = async (email: string) => {
    await fetch("/api/owner/lock-user", {
      method: "POST", credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email })
    });
    setActionMsg(`✅ ${email} gesperrt`);
    setTimeout(() => window.location.reload(), 1500);
  };

  const unlockUser = async (email: string) => {
    await fetch("/api/owner/unlock-user", {
      method: "POST", credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email })
    });
    setActionMsg(`✅ ${email} freigeschaltet`);
    setTimeout(() => window.location.reload(), 1500);
  };

  const setRole = async (email: string, role: string) => {
    if (!confirm(`Rolle von ${email} auf "${role}" setzen?`)) return;
    const ownerKey = sessionStorage.getItem("ownerKey") || "";
    const res = await fetch("/api/owner/set-role", {
      method:"POST", credentials:"include",
      headers:{"Content-Type":"application/json","x-owner-key":sessionStorage.getItem("ownerKey")||""},
      body: JSON.stringify({ email, role }),
    });
    const d = await res.json();
    setActionMsg(d.ok ? `✅ ${d.msg}` : `❌ ${d.error}`);
    if (d.ok) setTimeout(() => window.location.reload(), 1000);
  };

  const impersonateUser = async (email: string) => {
    if (!confirm(`Als ${email} einloggen?`)) return;
    const res = await fetch("/api/owner/impersonate", {
      method: "POST", credentials: "include",
      headers: { "Content-Type": "application/json", "x-owner-key": sessionStorage.getItem("ownerKey") || "" },
      body: JSON.stringify({ email }),
    });
    const d = await res.json();
    if (d.ok) { setActionMsg(`✅ Eingeloggt als ${email}`); setTimeout(() => window.location.href = "/admin", 1000); }
    else setActionMsg(`❌ Fehler: ${d.error}`);
  };

  const setModules = async (email: string, modules: string) => {
    const res = await fetch("/api/owner/set-modules", {
      method: "POST", credentials: "include",
      headers: { "Content-Type": "application/json", "x-owner-key": sessionStorage.getItem("ownerKey") || "" },
      body: JSON.stringify({ email, modules }),
    });
    const d = await res.json();
    setActionMsg(d.ok ? `✅ Module gesetzt: ${modules}` : `❌ ${d.error}`);
    if (d.ok) setTimeout(() => window.location.reload(), 800);
  };

  const generateMagicLink = async () => {
    setActionMsg("");
    const res = await fetch("/api/owner/generate-link", {
      method: "POST",
      credentials: "include"
    });
    const d = await res.json();
    if (!res.ok || !d.link) {
      setActionMsg(`❌ Magic-Link Fehler: ${d.error || "Nicht autorisiert"}`);
      return;
    }
    navigator.clipboard.writeText(d.link);
    setActionMsg("✅ Magic Link kopiert!");
  };

  if (loading) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontSize: fz(18),color:"#64748b"}}>
      Lade Owner Dashboard...
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#0f172a",color:"white",fontFamily:"system-ui",padding:"32px"}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
        <div>
          <h1 style={{fontSize: fz(28),fontWeight:900,margin:0,color:"#3b82f6"}}>
            👑 Owner Dashboard
          </h1>
          <p style={{color:"#94a3b8",margin:"4px 0 0",fontSize: fz(14)}}>
            Immobilien Akademie Smart — vollständige Kontrolle
          </p>
        </div>
        <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
          <div className="rounded-lg border border-slate-600 bg-slate-800/80 px-2 py-1">
            <ComfortBar compact />
          </div>
          <button onClick={generateMagicLink}
            style={{background:"#1e40af",color:"white",border:"none",padding:"10px 18px",borderRadius:8,cursor:"pointer",fontSize: fz(13),fontWeight:600}}>
            🔗 Magic Link generieren
          </button>
          <Link href="/admin">
            <button style={{background:"#334155",color:"white",border:"none",padding:"10px 18px",borderRadius:8,cursor:"pointer",fontSize: fz(13)}}>
              ⚙️ Admin Panel
            </button>
          </Link>
        </div>
      </div>

      {actionMsg && (
        <div style={{background:"#065f46",border:"1px solid #10b981",borderRadius:8,padding:"12px 20px",marginBottom:20,fontSize: fz(14)}}>
          {actionMsg}
        </div>
      )}

      {/* Tab Navigation */}
      <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
        {[
          {id:"users", label:"👥 Nutzer"},
          {id:"revenue", label:"💰 Revenue"},
          {id:"settings", label:"⚙️ Portal-Einstellungen"},
          {id:"azav", label:"🎓 AZAV"},
          {id:"live", label:"🟢 Live"},
          {id:"activity", label:"📋 Aktivität"},
          {id:"events", label:"🛡️ Ereignisse"},
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id as any)}
            style={{background: activeTab===t.id ? "#3b82f6" : "#1e293b", color:"white", border: activeTab===t.id ? "none" : "1px solid #334155", padding:"8px 16px", borderRadius:8, cursor:"pointer", fontSize: fz(13), fontWeight:600}}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginBottom:32}}>
        {[
          {label:"Nutzer gesamt", value: stats?.totalUsers ?? 0, icon:"👥", color:"#3b82f6"},
          {label:"Heute aktiv", value: stats?.activeToday ?? 0, icon:"🟢", color:"#10b981"},
          {label:"Trial Leads", value: stats?.trialLeads ?? 0, icon:"📧", color:"#f59e0b"},
          {label:"Modul 1 frei", value: stats?.modulesUnlocked?.["1"] ?? 0, icon:"📚", color:"#8b5cf6"},
        ].map((s, i) => (
          <div key={i} style={{background:"#1e293b",borderRadius:12,padding:"20px",border:`1px solid ${s.color}33`}}>
            <div style={{fontSize: fz(28)}}>{s.icon}</div>
            <div style={{fontSize: fz(32),fontWeight:900,color:s.color,margin:"8px 0 4px"}}>{s.value}</div>
            <div style={{color:"#94a3b8",fontSize: fz(13)}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* System Health */}
      <div style={{background:"#1e293b",borderRadius:12,padding:20,marginBottom:24,border:"1px solid #334155"}}>
        <h3 style={{margin:"0 0 16px",fontSize: fz(16),color:"#94a3b8",textTransform:"uppercase",letterSpacing:1}}>
          System Status
        </h3>
        <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
          {[
            {label:"Server", ok: stats?.systemHealth?.server},
            {label:"Datenbank", ok: stats?.systemHealth?.db},
            {label:"Stripe", ok: stats?.systemHealth?.stripe},
          ].map((h, i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:10,height:10,borderRadius:"50%",background: h.ok ? "#10b981" : "#ef4444"}}/>
              <span style={{fontSize: fz(14), color: h.ok ? "#10b981" : "#ef4444"}}>{h.label}: {h.ok ? "OK" : "FEHLER"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── TAB: REVENUE ──────────────────────────────── */}
      {activeTab === "revenue" && (
        <div style={{ background: "#1e293b", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #334155" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: fz(18), color: "#f59e0b" }}>💰 Stripe Revenue</h3>
          {!revenue ? (
            <p style={{ color: "#94a3b8" }}>Laden…</p>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16, marginBottom: 20 }}>
                {[
                  { label: "Modus", value: revenue.stripeMode?.toUpperCase(), color: revenue.stripeMode === "live" ? "#10b981" : "#f59e0b" },
                  { label: "Umsatz 30d", value: `${revenue.revenue30dEur?.toFixed(2) ?? 0} €`, color: "#3b82f6" },
                  { label: "Charges 30d", value: revenue.chargeCount30d, color: "#8b5cf6" },
                  { label: "Abo aktiv", value: revenue.activeSubscriptions, color: "#10b981" },
                  { label: "Balance EUR", value: revenue.balanceEur != null ? `${revenue.balanceEur.toFixed(2)} €` : "—", color: "#06b6d4" },
                  { label: "Pending Käufe", value: revenue.pendingPurchases, color: "#ef4444" },
                  { label: "Zahlende Nutzer", value: revenue.payingUsersEstimate, color: "#a78bfa" },
                  { label: "Price-IDs", value: `${revenue.priceIdsConfigured?.subscriptions}/${revenue.priceIdsConfigured?.subscriptionsTotal ?? 6} + ${revenue.priceIdsConfigured?.modules}/${revenue.priceIdsConfigured?.modulesTotal ?? 12}`, color: "#64748b" },
                ].map((s) => (
                  <div key={s.label} style={{ background: "#0f172a", borderRadius: 8, padding: 14 }}>
                    <div style={{ fontSize: fz(11), color: "#94a3b8" }}>{s.label}</div>
                    <div style={{ fontSize: fz(22), fontWeight: 800, color: s.color, marginTop: 4 }}>{s.value}</div>
                  </div>
                ))}
              </div>
              {revenue.webhookHealth && (
                <p style={{ fontSize: fz(13), color: "#94a3b8" }}>
                  Webhook: {revenue.webhookHealth.recentlyActive ? "✅ aktiv" : "⚠️ kein Event (7d)"} · {revenue.webhookHealth.totalVerified} Events
                </p>
              )}
              <Link href="/admin/stripe-live">
                <span style={{ color: "#3b82f6", fontSize: fz(13), cursor: "pointer" }}>→ Stripe Live-Checkliste</span>
              </Link>
            </>
          )}
        </div>
      )}

      {/* Nutzer-Liste */}
      {/* ── TAB: SETTINGS ──────────────────────────────── */}
      {activeTab === "videos" && (
        <div style={{padding:24,textAlign:"center"}}>
          <div style={{fontSize: fz(40),marginBottom:12}}>🎬</div>
          <h2 style={{color:"#0f172a",marginBottom:8}}>Video-Verwaltung</h2>
          <p style={{color:"#64748b",marginBottom:20}}>Lernvideos für alle 5 Module verwalten</p>
          <a href="/owner-videos" style={{background:"#3b82f6",color:"white",padding:"12px 24px",borderRadius:8,textDecoration:"none",fontWeight:600,display:"inline-block"}}>
            → Video-Verwaltung öffnen
          </a>
        </div>
      )}
      {activeTab === "settings" && (
        <div style={{display:"grid",gap:24}}>
          {/* Preise */}
          <div style={{background:"#1e293b",borderRadius:12,padding:24,border:"1px solid #334155"}}>
            <h3 style={{margin:"0 0 20px",fontSize: fz(16),color:"#f1f5f9",fontWeight:700}}>💰 Preise verwalten</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16}}>
              {[
                {key:"price_modul_1", label:"Modul 1 (Grundkurs)"},
                {key:"price_modul_2", label:"Modul 2 (Makler §34c)"},
                {key:"price_modul_3", label:"Modul 3 (WEG-Verwalter)"},
                {key:"price_modul_4", label:"Modul 4 (Gutachter)"},
                {key:"price_modul_5", label:"Modul 5 (§34i)"},
                {key:"price_bundle", label:"Komplett-Paket"},
              ].map(({key, label}) => (
                <div key={key}>
                  <label style={{color:"#94a3b8",fontSize: fz(12),display:"block",marginBottom:6}}>{label}</label>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <input type="number" value={settings[key] || ""} onChange={e => setSettings(s => ({...s,[key]:e.target.value}))}
                      style={{background:"#0f172a",border:"1px solid #475569",borderRadius:6,padding:"8px 12px",color:"white",fontSize: fz(14),width:"100px"}} />
                    <span style={{color:"#64748b",fontSize: fz(13)}}>EUR</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video URLs */}
          <div style={{background:"#1e293b",borderRadius:12,padding:24,border:"1px solid #334155"}}>
            <h3 style={{margin:"0 0 20px",fontSize: fz(16),color:"#f1f5f9",fontWeight:700}}>🎬 Video-URLs (YouTube)</h3>
            <div style={{display:"grid",gap:12}}>
              {[1,2,3,4,5].map(n => (
                <div key={n} style={{display:"grid",gridTemplateColumns:"150px 1fr",gap:12,alignItems:"center"}}>
                  <label style={{color:"#94a3b8",fontSize: fz(13)}}>Modul {n}</label>
                  <input type="url" value={settings[`video_modul_${n}`] || ""} placeholder="https://youtube.com/watch?v=..."
                    onChange={e => setSettings(s => ({...s,[`video_modul_${n}`]:e.target.value}))}
                    style={{background:"#0f172a",border:"1px solid #475569",borderRadius:6,padding:"8px 12px",color:"white",fontSize: fz(13),width:"100%"}} />
                </div>
              ))}
            </div>
          </div>

          {/* Landingpage Titel */}
          <div style={{background:"#1e293b",borderRadius:12,padding:24,border:"1px solid #334155"}}>
            <h3 style={{margin:"0 0 20px",fontSize: fz(16),color:"#f1f5f9",fontWeight:700}}>📄 Landingpage Titel</h3>
            <div style={{display:"grid",gap:12}}>
              {[1,2,3,4,5].map(n => (
                <div key={n} style={{display:"grid",gridTemplateColumns:"150px 1fr",gap:12,alignItems:"center"}}>
                  <label style={{color:"#94a3b8",fontSize: fz(13)}}>Modul {n}</label>
                  <input type="text" value={settings[`landing_modul_${n}_titel`] || ""}
                    onChange={e => setSettings(s => ({...s,[`landing_modul_${n}_titel`]:e.target.value}))}
                    style={{background:"#0f172a",border:"1px solid #475569",borderRadius:6,padding:"8px 12px",color:"white",fontSize: fz(13),width:"100%"}} />
                </div>
              ))}
            </div>
          </div>

          {/* Speichern Button */}
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <button onClick={async () => {
              for (const [key, value] of Object.entries(settings)) {
                await fetch("/api/owner/settings", {
                  method:"POST", credentials:"include",
                  headers:{"Content-Type":"application/json","x-owner-key":sessionStorage.getItem("ownerKey")||""},
                  body: JSON.stringify({key, value})
                });
              }
              setSettingsSaved(true);
              setTimeout(() => setSettingsSaved(false), 3000);
            }} style={{background:"#2563eb",color:"white",border:"none",borderRadius:8,padding:"12px 28px",fontSize: fz(14),fontWeight:700,cursor:"pointer"}}>
              💾 Alle Einstellungen speichern
            </button>
            {settingsSaved && <span style={{color:"#10b981",fontSize: fz(14),fontWeight:600}}>✅ Gespeichert!</span>}
          </div>
        </div>
      )}

      {/* ── TAB: AZAV ───────────────────────────────────── */}
      {activeTab === "azav" && (
        <div style={{background:"#1e293b",borderRadius:12,padding:20,border:"1px solid #334155"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
            <div>
              <h3 style={{margin:"0 0 4px",fontSize: fz(16),color:"#f1f5f9",fontWeight:700}}>🎓 AZAV-Anwesenheitsbericht</h3>
              <p style={{margin:0,fontSize: fz(12),color:"#64748b"}}>Gemäß §§ 176-180 SGB III — automatisch generiert</p>
            </div>
            <div style={{marginBottom:16}}>
            <AzavPdfExport ownerKey={sessionStorage.getItem("ownerKey")||""} />
          </div>
          <button
              onClick={()=>{
                setAzavLoading(true);
                const ownerKey = sessionStorage.getItem("ownerKey")||"";
                fetch("/api/owner/azav-report",{credentials:"include",headers:{"x-owner-key":sessionStorage.getItem("ownerKey")||""}})
                  .then(r=>r.json()).then(d=>{setAzavReport(d);setAzavLoading(false);}).catch(()=>setAzavLoading(false));
              }}
              style={{background:"#2563eb",color:"white",border:"none",borderRadius:8,padding:"10px 20px",fontSize: fz(13),fontWeight:700,cursor:"pointer"}}>
              {azavLoading?"⏳ Lädt...":"📋 Bericht erstellen"}
            </button>
          </div>
          {azavReport && (
            <div>
              <div style={{background:"#0f172a",borderRadius:8,padding:"12px 16px",marginBottom:16,fontSize: fz(12),color:"#64748b"}}>
                Erstellt: {new Date(azavReport.berichtDatum).toLocaleString("de-DE")} ·
                Nutzer: {azavReport.gesamtNutzer} ·
                Zeitraum: {azavReport.zeitraum?.von} bis {azavReport.zeitraum?.bis}
              </div>
              {(azavReport.berichte||[]).map((b:any,i:number)=>(
                <div key={i} style={{background:"#0f172a",borderRadius:10,padding:"16px",marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                    <div>
                      <div style={{fontSize: fz(14),fontWeight:700,color:"#f1f5f9"}}>{b.nutzer?.name||"—"}</div>
                      <div style={{fontSize: fz(11),color:"#64748b"}}>{b.nutzer?.email}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize: fz(18),fontWeight:900,color:"#10b981"}}>{b.zusammenfassung?.gesamtUE} UE</div>
                      <div style={{fontSize: fz(10),color:"#64748b"}}>{b.zusammenfassung?.gesamtStunden}h gesamt</div>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:12}}>
                    {[
                      {label:"Sitzungen",value:b.zusammenfassung?.gesamtSitzungen},
                      {label:"Aktive Tage",value:b.zusammenfassung?.aktiveTage},
                      {label:"Abgeschlossen",value:b.zusammenfassung?.abgeschlosseneEinheiten},
                      {label:"UE gesamt",value:b.zusammenfassung?.gesamtUE},
                    ].map((s,j)=>(
                      <div key={j} style={{background:"#1e293b",borderRadius:6,padding:"8px",textAlign:"center"}}>
                        <div style={{fontSize: fz(16),fontWeight:800,color:"#60a5fa"}}>{s.value||0}</div>
                        <div style={{fontSize: fz(9),color:"#64748b"}}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{fontSize: fz(11),color:"#475569",marginBottom:8,fontWeight:600}}>TAGESNACHWEIS:</div>
                  {(b.tagesNachweis||[]).map((t:any,j:number)=>(
                    <div key={j} style={{display:"flex",gap:12,padding:"4px 0",borderBottom:"1px solid #1e293b",fontSize: fz(11)}}>
                      <span style={{color:"#94a3b8",width:80}}>{t.datum}</span>
                      <span style={{color:"#60a5fa"}}>{t.lernzeit}</span>
                      <span style={{color:"#10b981"}}>{t.ue} UE</span>
                      <span style={{color:"#64748b",flex:1}}>{t.module}</span>
                    </div>
                  ))}
                  <div style={{marginTop:8,padding:"6px 10px",background:b.azavKonformitaet?.nachweisVorhanden?"#065f46":"#7f1d1d",borderRadius:6,fontSize: fz(11),color:b.azavKonformitaet?.nachweisVorhanden?"#10b981":"#ef4444"}}>
                    {b.azavKonformitaet?.nachweisVorhanden?"✅ AZAV-konformer Nachweis vorhanden":"⚠️ Kein Nachweis — Nutzer hat noch nicht gelernt"}
                    · Zeitraum: {b.azavKonformitaet?.zeitraumVon} bis {b.azavKonformitaet?.zeitraumBis}
                  </div>
                </div>
              ))}
              <div style={{fontSize: fz(11),color:"#334155",marginTop:12,padding:"8px 12px",background:"#0f172a",borderRadius:6}}>
                ⚖️ {azavReport.hinweis}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── TAB: AUDIT EVENTS ───────────────────────────── */}
      {activeTab === "events" && (
        <div style={{ background: "#1e293b", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #334155" }}>
          <h3 style={{ margin: "0 0 8px", fontSize: fz(18), color: "#f59e0b" }}>🛡️ Ereignis-Protokoll</h3>
          <p style={{ color: "#94a3b8", fontSize: fz(13), marginBottom: 16 }}>
            Login, Logout, Modul-Check-in/out, KI-Aufrufe, Owner-Aktionen, Stripe-Käufe — letzte 7 Tage
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            <input
              type="text"
              placeholder="E-Mail filtern…"
              value={auditFilter}
              onChange={(e) => setAuditFilter(e.target.value)}
              style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8, padding: "8px 12px", color: "#e2e8f0", fontSize: fz(13), minWidth: 200 }}
            />
            <select
              value={auditTypeFilter}
              onChange={(e) => setAuditTypeFilter(e.target.value)}
              style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8, padding: "8px 12px", color: "#e2e8f0", fontSize: fz(13) }}
            >
              <option value="">Alle Typen</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
              <option value="register">Registrierung</option>
              <option value="module_open">Modul geöffnet</option>
              <option value="module_complete">Modul abgeschlossen</option>
              <option value="ki_call">KI-Aufruf</option>
              <option value="owner_impersonate">Impersonate</option>
              <option value="owner_lock">Sperren</option>
              <option value="owner_unlock">Entsperren</option>
              <option value="stripe_purchase">Stripe-Kauf</option>
            </select>
            <button
              type="button"
              onClick={() => {
                const ownerKey = sessionStorage.getItem("ownerKey") || "";
                const params = new URLSearchParams({ limit: "100", sinceHours: "168" });
                if (auditFilter) params.set("email", auditFilter);
                if (auditTypeFilter) params.set("eventType", auditTypeFilter);
                fetch(`/api/owner/audit-events?${params}`, { credentials: "include", headers: { "x-owner-key": ownerKey } })
                  .then(r => r.json()).then(setAuditEvents);
              }}
              style={{ background: "#2563eb", color: "white", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: fz(13), cursor: "pointer" }}
            >
              Aktualisieren
            </button>
          </div>
          {!auditEvents ? (
            <p style={{ color: "#94a3b8" }}>Laden…</p>
          ) : (
            <>
              <p style={{ fontSize: fz(12), color: "#64748b", marginBottom: 12 }}>
                {auditEvents.total ?? 0} Ereignisse gesamt · {auditEvents.events?.length ?? 0} angezeigt
              </p>
              <div style={{ maxHeight: 480, overflowY: "auto" }}>
                {(auditEvents.events || []).map((ev: any) => (
                  <div key={ev.id} style={{ display: "grid", gridTemplateColumns: "140px 120px 1fr", gap: 12, padding: "10px 0", borderBottom: "1px solid #0f172a", fontSize: fz(12) }}>
                    <span style={{ color: "#64748b" }}>{ev.createdAt ? new Date(ev.createdAt).toLocaleString("de-DE") : "—"}</span>
                    <span style={{ color: "#f59e0b", fontWeight: 600 }}>{ev.eventType}</span>
                    <span style={{ color: "#e2e8f0" }}>
                      {ev.actorEmail || ev.targetEmail || "—"}
                      {ev.targetEmail && ev.actorEmail && ev.targetEmail !== ev.actorEmail ? ` → ${ev.targetEmail}` : ""}
                      {ev.resourceId ? ` · ${ev.resourceId}` : ""}
                    </span>
                  </div>
                ))}
                {(auditEvents.events || []).length === 0 && (
                  <p style={{ color: "#64748b", fontSize: fz(13) }}>Noch keine Ereignisse protokolliert (nach Deploy werden neue Aktionen erfasst).</p>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* === LIVE MONITORING === */}
      {live && (
        <div style={{background:"#0f2744",border:"1px solid #1e40af",borderRadius:12,padding:"20px 24px",marginTop:24}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <h3 style={{color:"#60a5fa",fontSize: fz(16),fontWeight:700,margin:0}}>
              🟢 Live-Monitoring
            </h3>
            <span style={{fontSize: fz(11),color:"#475569"}}>Aktualisiert: {new Date(live.now).toLocaleTimeString("de-DE")}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
            {[
              {label:"Jetzt online (5min)", value: live.online5min, color:"#10b981"},
              {label:"Letzte 15min", value: live.online15min, color:"#3b82f6"},
              {label:"Letzte Stunde", value: live.online60min, color:"#8b5cf6"},
              {label:"Heute aktiv", value: live.todayActive, color:"#f59e0b"},
            ].map((s,i) => (
              <div key={i} style={{background:"#1e293b",borderRadius:8,padding:"12px",textAlign:"center"}}>
                <div style={{fontSize: fz(24),fontWeight:900,color:s.color}}>{s.value}</div>
                <div style={{fontSize: fz(10),color:"#64748b",marginTop:4}}>{s.label}</div>
              </div>
            ))}
          </div>
          {live.activeUsers?.length > 0 && (
            <div style={{marginBottom:12}}>
              <div style={{fontSize: fz(12),color:"#94a3b8",marginBottom:8,fontWeight:600}}>GERADE ONLINE:</div>
              {live.activeUsers.map((u: any, i: number) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:"1px solid #1e293b"}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:"#10b981"}}/>
                  <span style={{fontSize: fz(12),color:"#e2e8f0",flex:1}}>{u.name || u.email}</span>
                  <span style={{fontSize: fz(10),color:"#64748b"}}>{u.email}</span>
                  <span style={{fontSize: fz(10),color:"#475569"}}>{u.enabledModules ? `M${u.enabledModules}` : "—"}</span>
                </div>
              ))}
            </div>
          )}
          {live.newUsersToday?.length > 0 && (
            <div style={{marginBottom:12}}>
              <div style={{fontSize: fz(12),color:"#f59e0b",marginBottom:8,fontWeight:600}}>NEUE NUTZER HEUTE:</div>
              {live.newUsersToday.map((u: any, i: number) => (
                <div key={i} style={{fontSize: fz(12),color:"#fbbf24",padding:"3px 0"}}>
                  ✨ {u.name || u.email} — {new Date(u.createdAt).toLocaleTimeString("de-DE")}
                </div>
              ))}
            </div>
          )}
          {live.recentActivity?.length > 0 && (
            <div>
              <div style={{fontSize: fz(12),color:"#94a3b8",marginBottom:8,fontWeight:600}}>LETZTE AKTIVITÄTEN:</div>
              {live.recentActivity.slice(0,5).map((a: any, i: number) => (
                <div key={i} style={{fontSize: fz(11),color:"#64748b",padding:"2px 0"}}>
                  {new Date(a.openedAt).toLocaleTimeString("de-DE")} — {a.name || a.email} — Modul {a.moduleId} Tag {a.dayNumber}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* === INSPECT-LINK GENERATOR === */}
      <div style={{background:"#1e1b4b",border:"1px solid #4338ca",borderRadius:12,padding:"20px 24px",marginTop:24}}>
        <h3 style={{color:"#a5b4fc",fontSize: fz(16),fontWeight:600,marginBottom:4}}>
          🔍 Inspect-Link Generator
        </h3>
        <p style={{color:"#6366f1",fontSize: fz(12),marginBottom:16}}>
          Erstelle einen temporären Link für Investoren, Partner oder Tester — sie sehen alles, können aber nichts ändern.
        </p>

        {!inspectToken ? (
          <div>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              {([48,72] as const).map(h => (
                <button key={h} onClick={() => setInspectHours(h)}
                  style={{padding:"8px 20px",borderRadius:8,fontSize: fz(13),fontWeight:700,cursor:"pointer",
                    background: inspectHours===h ? "#4338ca" : "transparent",
                    color: inspectHours===h ? "white" : "#6366f1",
                    border: inspectHours===h ? "none" : "1px solid #4338ca"}}>
                  {h}h
                </button>
              ))}
            </div>
            <button
              onClick={createInspectLink}
              disabled={inspectLoading}
              style={{background:"#4338ca",color:"white",border:"none",padding:"10px 20px",
                      borderRadius:8,fontSize: fz(13),fontWeight:600,cursor:"pointer"}}>
              {inspectLoading ? "⏳ Erstelle Link..." : `🔑 ${inspectHours}h Inspect-Link erstellen`}
            </button>
          </div>
        ) : (
          <div>
            <div style={{background:"#312e81",borderRadius:8,padding:"12px 14px",marginBottom:10}}>
              <div style={{color:"#c7d2fe",fontSize: fz(11),marginBottom:6,fontWeight:500}}>
                🔗 Inspect-Link (gültig bis {inspectExpiry}):
              </div>
              <div style={{color:"#a5b4fc",fontSize: fz(11),wordBreak:"break-all",fontFamily:"monospace",lineHeight:1.6}}>
                {window.location.origin}/inspect/{inspectToken.slice(0,40)}...
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button
                onClick={copyInspectLink}
                style={{background: inspectCopied ? "#065f46" : "#4338ca",color:"white",
                        border:"none",padding:"8px 16px",borderRadius:8,fontSize: fz(12),
                        fontWeight:600,cursor:"pointer"}}>
                {inspectCopied ? "✅ Kopiert!" : "📋 Link kopieren"}
              </button>
              <button
                onClick={() => { setInspectToken(null); setInspectExpiry(null); }}
                style={{background:"transparent",color:"#6366f1",border:"1px solid #4338ca",
                        padding:"8px 16px",borderRadius:8,fontSize: fz(12),cursor:"pointer"}}>
                🔄 Neuen Link
              </button>
            </div>
            <p style={{color:"#6366f1",fontSize: fz(11),marginTop:8}}>
              ⚠️ Link gilt {inspectHours} Stunden · Startet auf Modul 1 · KI-Tutor deaktiviert · Keine Änderungen
            </p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}>
              {[
                { href: "/modul/1", label: "Modul 1" },
                { href: "/statistiken", label: "Statistiken" },
                { href: "/warum-wir", label: "USP" },
                { href: "/pakete", label: "Pakete" },
              ].map((l) => (
                <a key={l.href} href={l.href} style={{ fontSize: fz(11), color: "#a5b4fc", textDecoration: "underline" }}>
                  {l.label} →
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SCHNELLLINKS */}
      <div style={{background:"#1e293b",borderRadius:12,padding:20,border:"1px solid #334155",marginTop:20}}>
        <h3 style={{margin:"0 0 16px",fontSize: fz(16),color:"#f1f5f9",fontWeight:700}}>
          Schnelllinks
        </h3>
        <div style={{marginBottom:12}}>
          <div style={{fontSize: fz(11),color:"#94a3b8",marginBottom:6,fontWeight:700}}>KURS-LANDINGPAGES</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {[
              ["Modul 1 Grundkurs","/kurs/modul-1-immobilien-grundkurs"],
              ["Modul 2 Makler","/kurs/modul-2-makler-34c"],
              ["Modul 3 WEG","/kurs/modul-3-weg-verwalter"],
              ["Modul 4 Gutachter","/kurs/modul-4-gutachter"],
              ["Modul 5 §34i","/kurs/modul-5-34i-darlehensvermittler"],
            ].map(([label,path]) => (
              <a key={path} href={path} target="_blank" rel="noreferrer"
                style={{background:"#0f172a",color:"#60a5fa",border:"1px solid #1e3a5f",
                  borderRadius:8,padding:"5px 10px",fontSize: fz(11),textDecoration:"none"}}>
                {label}
              </a>
            ))}
          </div>
        </div>
        <div style={{marginBottom:12}}>
          <div style={{fontSize: fz(11),color:"#94a3b8",marginBottom:6,fontWeight:700}}>OEFFENTLICHE SEITEN</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {[["Startseite","/"],["Kurse","/kurse"],["Pakete","/pakete"],["Glossar","/glossary"],["Foerderung","/foerderung"]].map(([label,path]) => (
              <a key={path} href={path} target="_blank" rel="noreferrer"
                style={{background:"#0f172a",color:"#34d399",border:"1px solid #065f46",
                  borderRadius:8,padding:"5px 10px",fontSize: fz(11),textDecoration:"none"}}>
                {label}
              </a>
            ))}
          </div>
        </div>
        <div style={{marginBottom:12}}>
          <div style={{fontSize: fz(11),color:"#94a3b8",marginBottom:6,fontWeight:700}}>ADMIN-BEREICHE</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {[["Admin","/admin"],["Nutzer","/admin/nutzer"],["Fragen","/admin/fragen"],
              ["Glossar","/admin/glossar"],["Videos","/admin/videos"],
              ["White-Label","/admin/whitelabel"],["KI-Monitor","/admin/ki-monitor"]].map(([label,path]) => (
              <a key={path} href={path} target="_blank" rel="noreferrer"
                style={{background:"#0f172a",color:"#f59e0b",border:"1px solid #78350f",
                  borderRadius:8,padding:"5px 10px",fontSize: fz(11),textDecoration:"none"}}>
                {label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <div style={{fontSize: fz(11),color:"#94a3b8",marginBottom:6,fontWeight:700}}>RECHTLICHES</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {[["Impressum","/impressum"],["Datenschutz","/datenschutz"],["AGB","/agb"],["Widerruf","/widerruf"]].map(([label,path]) => (
              <a key={path} href={path} target="_blank" rel="noreferrer"
                style={{background:"#0f172a",color:"#94a3b8",border:"1px solid #334155",
                  borderRadius:8,padding:"5px 10px",fontSize: fz(11),textDecoration:"none"}}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
