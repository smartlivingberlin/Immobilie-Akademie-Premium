import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

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
  const BASE_URL = window.location.origin;

  const createInspectLink = async () => {
    setInspectLoading(true);
    try {
      const res = await fetch("/api/owner/inspect-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "" }),
      });
      const data = await res.json();
      if (data.token) {
        setInspectToken(data.token);
        const exp = new Date(data.expiresAt).toLocaleString("de-DE");
        setInspectExpiry(exp);
      }
    } catch(e) {
      console.error("Inspect-Token Fehler:", e);
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
  const [statsData, setStatsData] = useState<any>(null);
  const [azavReport, setAzavReport] = useState<any>(null);
  const [azavLoading, setAzavLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"users"|"live"|"activity"|"stats"|"azav">("users");
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => {
    // Owner-Key aus URL speichern fuer spaetere API-Calls
    const urlKey = new URLSearchParams(window.location.search).get("key");
    if (urlKey) localStorage.setItem("ownerKey", urlKey);
    const ownerKey = urlKey || localStorage.getItem("ownerKey") || "";
    // Live-Monitoring alle 30s aktualisieren
    const fetchLive = () => fetch(`/api/owner/live?key=${ownerKey}`, {
      credentials: "include", headers: { "x-owner-key": ownerKey }
    }).then(r => r.json()).then(setLive).catch(() => {});
    fetchLive();
    const liveInterval = setInterval(fetchLive, 30000);
    setTimeout(() => clearInterval(liveInterval), 1800000); // 30min max
    // Aktivitaets-Log laden
    fetch(`/api/owner/activity?key=${ownerKey}`, { credentials:"include", headers:{"x-owner-key":ownerKey} })
      .then(r => r.json()).then(setActivity).catch(()=>{});
    // Stats laden
    fetch(`/api/owner/stats?key=${ownerKey}`, { credentials:"include", headers:{"x-owner-key":ownerKey} })
      .then(r => r.json()).then(setStatsData).catch(()=>{});
    fetch(`/api/owner/dashboard?key=${ownerKey}`, { credentials: "include", headers: { "x-owner-key": ownerKey } })
      .then(r => r.json())
      .then(d => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
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
    const ownerKey = localStorage.getItem("ownerKey") || "";
    const res = await fetch("/api/owner/set-role", {
      method:"POST", credentials:"include",
      headers:{"Content-Type":"application/json","x-owner-key":ownerKey},
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
      headers: { "Content-Type": "application/json", "x-owner-key": localStorage.getItem("ownerKey") || "" },
      body: JSON.stringify({ email }),
    });
    const d = await res.json();
    if (d.ok) { setActionMsg(`✅ Eingeloggt als ${email}`); setTimeout(() => window.location.href = "/", 1000); }
    else setActionMsg(`❌ Fehler: ${d.error}`);
  };

  const setModules = async (email: string, modules: string) => {
    const res = await fetch("/api/owner/set-modules", {
      method: "POST", credentials: "include",
      headers: { "Content-Type": "application/json", "x-owner-key": localStorage.getItem("ownerKey") || "" },
      body: JSON.stringify({ email, modules }),
    });
    const d = await res.json();
    setActionMsg(d.ok ? `✅ Module gesetzt: ${modules}` : `❌ ${d.error}`);
    if (d.ok) setTimeout(() => window.location.reload(), 800);
  };

  const generateMagicLink = async () => {
    const res = await fetch("/api/owner/generate-link", {
      method: "POST", credentials: "include"
    });
    const d = await res.json();
    navigator.clipboard.writeText(d.link);
    setActionMsg("✅ Magic Link kopiert!");
  };

  if (loading) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontSize:18,color:"#64748b"}}>
      Lade Owner Dashboard...
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#0f172a",color:"white",fontFamily:"system-ui",padding:"32px"}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
        <div>
          <h1 style={{fontSize:28,fontWeight:900,margin:0,color:"#3b82f6"}}>
            👑 Owner Dashboard
          </h1>
          <p style={{color:"#94a3b8",margin:"4px 0 0",fontSize:14}}>
            Immobilien Akademie Smart — vollständige Kontrolle
          </p>
        </div>
        <div style={{display:"flex",gap:12}}>
          <button onClick={generateMagicLink}
            style={{background:"#1e40af",color:"white",border:"none",padding:"10px 18px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600}}>
            🔗 Magic Link generieren
          </button>
          <Link href="/admin">
            <button style={{background:"#334155",color:"white",border:"none",padding:"10px 18px",borderRadius:8,cursor:"pointer",fontSize:13}}>
              ⚙️ Admin Panel
            </button>
          </Link>
        </div>
      </div>

      {actionMsg && (
        <div style={{background:"#065f46",border:"1px solid #10b981",borderRadius:8,padding:"12px 20px",marginBottom:20,fontSize:14}}>
          {actionMsg}
        </div>
      )}

      {/* Stats Grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginBottom:32}}>
        {[
          {label:"Nutzer gesamt", value: stats?.totalUsers ?? 0, icon:"👥", color:"#3b82f6"},
          {label:"Heute aktiv", value: stats?.activeToday ?? 0, icon:"🟢", color:"#10b981"},
          {label:"Trial Leads", value: stats?.trialLeads ?? 0, icon:"📧", color:"#f59e0b"},
          {label:"Modul 1 frei", value: stats?.modulesUnlocked?.["1"] ?? 0, icon:"📚", color:"#8b5cf6"},
        ].map((s, i) => (
          <div key={i} style={{background:"#1e293b",borderRadius:12,padding:"20px",border:`1px solid ${s.color}33`}}>
            <div style={{fontSize:28}}>{s.icon}</div>
            <div style={{fontSize:32,fontWeight:900,color:s.color,margin:"8px 0 4px"}}>{s.value}</div>
            <div style={{color:"#94a3b8",fontSize:13}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* System Health */}
      <div style={{background:"#1e293b",borderRadius:12,padding:20,marginBottom:24,border:"1px solid #334155"}}>
        <h3 style={{margin:"0 0 16px",fontSize:16,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1}}>
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
              <span style={{fontSize:14, color: h.ok ? "#10b981" : "#ef4444"}}>{h.label}: {h.ok ? "OK" : "FEHLER"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nutzer-Liste */}
      {/* ── TAB: AZAV ───────────────────────────────────── */}
      {activeTab === "azav" && (
        <div style={{background:"#1e293b",borderRadius:12,padding:20,border:"1px solid #334155"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
            <div>
              <h3 style={{margin:"0 0 4px",fontSize:16,color:"#f1f5f9",fontWeight:700}}>🎓 AZAV-Anwesenheitsbericht</h3>
              <p style={{margin:0,fontSize:12,color:"#64748b"}}>Gemäß §§ 176-180 SGB III — automatisch generiert</p>
            </div>
            <button
              onClick={()=>{
                setAzavLoading(true);
                const ownerKey = localStorage.getItem("ownerKey")||"";
                fetch(`/api/owner/azav-report?key=${ownerKey}`,{credentials:"include",headers:{"x-owner-key":ownerKey}})
                  .then(r=>r.json()).then(d=>{setAzavReport(d);setAzavLoading(false);}).catch(()=>setAzavLoading(false));
              }}
              style={{background:"#2563eb",color:"white",border:"none",borderRadius:8,padding:"10px 20px",fontSize:13,fontWeight:700,cursor:"pointer"}}>
              {azavLoading?"⏳ Lädt...":"📋 Bericht erstellen"}
            </button>
          </div>
          {azavReport && (
            <div>
              <div style={{background:"#0f172a",borderRadius:8,padding:"12px 16px",marginBottom:16,fontSize:12,color:"#64748b"}}>
                Erstellt: {new Date(azavReport.berichtDatum).toLocaleString("de-DE")} ·
                Nutzer: {azavReport.gesamtNutzer} ·
                Zeitraum: {azavReport.zeitraum?.von} bis {azavReport.zeitraum?.bis}
              </div>
              {(azavReport.berichte||[]).map((b:any,i:number)=>(
                <div key={i} style={{background:"#0f172a",borderRadius:10,padding:"16px",marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                    <div>
                      <div style={{fontSize:14,fontWeight:700,color:"#f1f5f9"}}>{b.nutzer?.name||"—"}</div>
                      <div style={{fontSize:11,color:"#64748b"}}>{b.nutzer?.email}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:18,fontWeight:900,color:"#10b981"}}>{b.zusammenfassung?.gesamtUE} UE</div>
                      <div style={{fontSize:10,color:"#64748b"}}>{b.zusammenfassung?.gesamtStunden}h gesamt</div>
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
                        <div style={{fontSize:16,fontWeight:800,color:"#60a5fa"}}>{s.value||0}</div>
                        <div style={{fontSize:9,color:"#64748b"}}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{fontSize:11,color:"#475569",marginBottom:8,fontWeight:600}}>TAGESNACHWEIS:</div>
                  {(b.tagesNachweis||[]).map((t:any,j:number)=>(
                    <div key={j} style={{display:"flex",gap:12,padding:"4px 0",borderBottom:"1px solid #1e293b",fontSize:11}}>
                      <span style={{color:"#94a3b8",width:80}}>{t.datum}</span>
                      <span style={{color:"#60a5fa"}}>{t.lernzeit}</span>
                      <span style={{color:"#10b981"}}>{t.ue} UE</span>
                      <span style={{color:"#64748b",flex:1}}>{t.module}</span>
                    </div>
                  ))}
                  <div style={{marginTop:8,padding:"6px 10px",background:b.azavKonformitaet?.nachweisVorhanden?"#065f46":"#7f1d1d",borderRadius:6,fontSize:11,color:b.azavKonformitaet?.nachweisVorhanden?"#10b981":"#ef4444"}}>
                    {b.azavKonformitaet?.nachweisVorhanden?"✅ AZAV-konformer Nachweis vorhanden":"⚠️ Kein Nachweis — Nutzer hat noch nicht gelernt"}
                    · Zeitraum: {b.azavKonformitaet?.zeitraumVon} bis {b.azavKonformitaet?.zeitraumBis}
                  </div>
                </div>
              ))}
              <div style={{fontSize:11,color:"#334155",marginTop:12,padding:"8px 12px",background:"#0f172a",borderRadius:6}}>
                ⚖️ {azavReport.hinweis}
              </div>
            </div>
          )}
        </div>
      )}

      {/* === LIVE MONITORING === */}
      {live && (
        <div style={{background:"#0f2744",border:"1px solid #1e40af",borderRadius:12,padding:"20px 24px",marginTop:24}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <h3 style={{color:"#60a5fa",fontSize:16,fontWeight:700,margin:0}}>
              🟢 Live-Monitoring
            </h3>
            <span style={{fontSize:11,color:"#475569"}}>Aktualisiert: {new Date(live.now).toLocaleTimeString("de-DE")}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
            {[
              {label:"Jetzt online (5min)", value: live.online5min, color:"#10b981"},
              {label:"Letzte 15min", value: live.online15min, color:"#3b82f6"},
              {label:"Letzte Stunde", value: live.online60min, color:"#8b5cf6"},
              {label:"Heute aktiv", value: live.todayActive, color:"#f59e0b"},
            ].map((s,i) => (
              <div key={i} style={{background:"#1e293b",borderRadius:8,padding:"12px",textAlign:"center"}}>
                <div style={{fontSize:24,fontWeight:900,color:s.color}}>{s.value}</div>
                <div style={{fontSize:10,color:"#64748b",marginTop:4}}>{s.label}</div>
              </div>
            ))}
          </div>
          {live.activeUsers?.length > 0 && (
            <div style={{marginBottom:12}}>
              <div style={{fontSize:12,color:"#94a3b8",marginBottom:8,fontWeight:600}}>GERADE ONLINE:</div>
              {live.activeUsers.map((u: any, i: number) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:"1px solid #1e293b"}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:"#10b981"}}/>
                  <span style={{fontSize:12,color:"#e2e8f0",flex:1}}>{u.name || u.email}</span>
                  <span style={{fontSize:10,color:"#64748b"}}>{u.email}</span>
                  <span style={{fontSize:10,color:"#475569"}}>{u.enabledModules ? `M${u.enabledModules}` : "—"}</span>
                </div>
              ))}
            </div>
          )}
          {live.newUsersToday?.length > 0 && (
            <div style={{marginBottom:12}}>
              <div style={{fontSize:12,color:"#f59e0b",marginBottom:8,fontWeight:600}}>NEUE NUTZER HEUTE:</div>
              {live.newUsersToday.map((u: any, i: number) => (
                <div key={i} style={{fontSize:12,color:"#fbbf24",padding:"3px 0"}}>
                  ✨ {u.name || u.email} — {new Date(u.createdAt).toLocaleTimeString("de-DE")}
                </div>
              ))}
            </div>
          )}
          {live.recentActivity?.length > 0 && (
            <div>
              <div style={{fontSize:12,color:"#94a3b8",marginBottom:8,fontWeight:600}}>LETZTE AKTIVITÄTEN:</div>
              {live.recentActivity.slice(0,5).map((a: any, i: number) => (
                <div key={i} style={{fontSize:11,color:"#64748b",padding:"2px 0"}}>
                  {new Date(a.openedAt).toLocaleTimeString("de-DE")} — {a.name || a.email} — Modul {a.moduleId} Tag {a.dayNumber}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* === INSPECT-LINK GENERATOR === */}
      <div style={{background:"#1e1b4b",border:"1px solid #4338ca",borderRadius:12,padding:"20px 24px",marginTop:24}}>
        <h3 style={{color:"#a5b4fc",fontSize:16,fontWeight:600,marginBottom:4}}>
          🔍 72h Inspect-Link Generator
        </h3>
        <p style={{color:"#6366f1",fontSize:12,marginBottom:16}}>
          Erstelle einen temporären Link für Investoren, Partner oder Tester — sie sehen alles, können aber nichts ändern.
        </p>

        {!inspectToken ? (
          <button
            onClick={createInspectLink}
            disabled={inspectLoading}
            style={{background:"#4338ca",color:"white",border:"none",padding:"10px 20px",
                    borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer"}}>
            {inspectLoading ? "⏳ Erstelle Link..." : "🔑 72h Inspect-Link erstellen"}
          </button>
        ) : (
          <div>
            <div style={{background:"#312e81",borderRadius:8,padding:"12px 14px",marginBottom:10}}>
              <div style={{color:"#c7d2fe",fontSize:11,marginBottom:6,fontWeight:500}}>
                🔗 Inspect-Link (gültig bis {inspectExpiry}):
              </div>
              <div style={{color:"#a5b4fc",fontSize:11,wordBreak:"break-all",fontFamily:"monospace",lineHeight:1.6}}>
                {window.location.origin}/inspect/{inspectToken.slice(0,40)}...
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button
                onClick={copyInspectLink}
                style={{background: inspectCopied ? "#065f46" : "#4338ca",color:"white",
                        border:"none",padding:"8px 16px",borderRadius:8,fontSize:12,
                        fontWeight:600,cursor:"pointer"}}>
                {inspectCopied ? "✅ Kopiert!" : "📋 Link kopieren"}
              </button>
              <button
                onClick={() => { setInspectToken(null); setInspectExpiry(null); }}
                style={{background:"transparent",color:"#6366f1",border:"1px solid #4338ca",
                        padding:"8px 16px",borderRadius:8,fontSize:12,cursor:"pointer"}}>
                🔄 Neuen Link
              </button>
            </div>
            <p style={{color:"#6366f1",fontSize:11,marginTop:8}}>
              ⚠️ Link gilt 72 Stunden · Besucher sehen alle Bereiche · Keine Änderungen möglich
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
