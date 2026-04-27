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
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => {
    // Owner-Key aus URL speichern fuer spaetere API-Calls
    const urlKey = new URLSearchParams(window.location.search).get("key");
    if (urlKey) localStorage.setItem("ownerKey", urlKey);
    const ownerKey = urlKey || localStorage.getItem("ownerKey") || "";
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
      <div style={{background:"#1e293b",borderRadius:12,padding:20,border:"1px solid #334155"}}>
        <h3 style={{margin:"0 0 16px",fontSize:16,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1}}>
          Alle Nutzer
        </h3>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead>
              <tr style={{borderBottom:"1px solid #334155"}}>
                {["Name","E-Mail","Rolle","Module","Erstellt","Aktionen"].map(h => (
                  <th key={h} style={{padding:"8px 12px",textAlign:"left",color:"#64748b",fontWeight:600}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(stats?.recentUsers ?? []).map((u, i) => (
                <tr key={i} style={{borderBottom:"1px solid #1e293b"}}>
                  <td style={{padding:"10px 12px",color:"#e2e8f0"}}>{u.name || "—"}</td>
                  <td style={{padding:"10px 12px",color:"#94a3b8"}}>{u.email}</td>
                  <td style={{padding:"10px 12px"}}>
                    <span style={{background: u.role === "admin" ? "#1e40af" : "#334155",color:"white",padding:"2px 8px",borderRadius:4,fontSize:11}}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{padding:"10px 12px",color:"#94a3b8"}}>{u.enabledModules || "—"}</td>
                  <td style={{padding:"10px 12px",color:"#64748b",fontSize:11}}>
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString("de-DE") : "—"}
                  </td>
                  <td style={{padding:"10px 12px"}}>
                    <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                      <button onClick={() => unlockUser(u.email)}
                        style={{background:"#065f46",color:"#10b981",border:"none",padding:"4px 8px",borderRadius:4,cursor:"pointer",fontSize:10}}>
                        ✅ Frei
                      </button>
                      <button onClick={() => lockUser(u.email)}
                        style={{background:"#7f1d1d",color:"#ef4444",border:"none",padding:"4px 8px",borderRadius:4,cursor:"pointer",fontSize:10}}>
                        🔒 Sperren
                      </button>
                      <button onClick={() => impersonateUser(u.email)}
                        style={{background:"#1e3a5f",color:"#60a5fa",border:"none",padding:"4px 8px",borderRadius:4,cursor:"pointer",fontSize:10}}>
                        👤 Login
                      </button>
                      <select onChange={e => e.target.value && setModules(u.email, e.target.value)}
                        defaultValue=""
                        style={{background:"#1e293b",color:"#94a3b8",border:"1px solid #334155",padding:"3px 6px",borderRadius:4,fontSize:10,cursor:"pointer"}}>
                        <option value="">Module...</option>
                        <option value="1">M1</option>
                        <option value="1,2">M1+2</option>
                        <option value="1,2,3">M1-3</option>
                        <option value="1,2,3,4">M1-4</option>
                        <option value="1,2,3,4,5">Alle</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
