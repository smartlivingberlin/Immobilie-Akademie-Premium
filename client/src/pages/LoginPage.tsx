import { useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { isOAuthEnabled, handleGoogleLogin } from "@/lib/oauth";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [demoCode, setDemoCode] = useState("");
  const [demoCodeLoading, setDemoCodeLoading] = useState(false);
  const [demoCodeMsg, setDemoCodeMsg] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const name = nameRef.current?.value || "";
    if (!email || !password) { setError("Bitte E-Mail und Passwort eingeben."); return; }
    setError(""); setLoading(true);
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const body = mode === "login" ? { email, password } : { email, password, name };
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), credentials: "include" });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Fehler beim Anmelden."); return; }
      window.location.href = "/dashboard";
    } catch { setError("Verbindungsfehler. Bitte erneut versuchen."); }
    finally { setLoading(false); }
  }

  async function handleDemoCode() {
    if (!demoCode.trim()) return;
    setDemoCodeLoading(true); setDemoCodeMsg("");
    try {
      const res = await fetch("/api/auth/redeem-code", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: demoCode.trim() }), credentials: "include" });
      const data = await res.json();
      if (!res.ok || data?.error) { setDemoCodeMsg("Ungültiger oder abgelaufener Code."); }
      else { setDemoCodeMsg("Zugang freigeschaltet!"); setTimeout(() => { window.location.href = "/"; }, 1500); }
    } catch { setDemoCodeMsg("Verbindungsfehler."); }
    finally { setDemoCodeLoading(false); }
  }

  const inputStyle = { width: "100%", padding: "11px 14px", border: "1.5px solid #d1d5db", borderRadius: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box" as const, fontFamily: "inherit" };
  const labelStyle = { display: "block", fontSize: "13px", fontWeight: "500" as const, color: "#374151", marginBottom: "6px" };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "64px", height: "64px", background: "#2563eb", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 8px 32px rgba(37,99,235,0.4)" }}>
            <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>IA</span>
          </div>
          <h1 style={{ color: "white", fontSize: "24px", fontWeight: "bold", margin: "0 0 4px" }}>Immobilien-Akademie</h1>
          <p style={{ color: "#93c5fd", fontSize: "13px", margin: 0 }}>Vorbereitung auf die IHK-Sachkundeprüfung §34c/§34i</p>
        </div>
        <div style={{ background: "white", borderRadius: "20px", padding: "36px", boxShadow: "0 25px 50px rgba(0,0,0,0.4)" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#1e293b", margin: "0 0 24px" }}>{mode === "login" ? "Anmelden" : "Konto erstellen"}</h2>
          <form onSubmit={handleSubmit} autoComplete="new-password">
            {mode === "register" && (
              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Name</label>
                <input ref={nameRef} type="text" placeholder="Ihr Name" autoComplete="new-password" style={inputStyle} />
              </div>
            )}
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>E-Mail</label>
              <input ref={emailRef} type="text" placeholder="ihre@email.de" autoComplete="new-password" autoCorrect="off" autoCapitalize="off" spellCheck={false} style={inputStyle} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Passwort</label>
              <div style={{ position: "relative" }}>
                <input ref={passwordRef} type={showPassword ? "text" : "password"} placeholder="Ihr Passwort" autoComplete="new-password" style={{ ...inputStyle, paddingRight: "42px" }} />
                <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0, display: "flex", alignItems: "center" }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", color: "#dc2626", marginBottom: "16px" }}>{error}</div>}
            <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px", background: loading ? "#93c5fd" : "#2563eb", color: "white", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? (mode === "login" ? "Anmelden..." : "Erstellen...") : (mode === "login" ? "Anmelden" : "Konto erstellen")}
            </button>
          </form>
          <div style={{ marginTop: "20px", textAlign: "center", fontSize: "13px", color: "#64748b" }}>
            {mode === "login" ? (
              <>
                <div>Noch kein Konto? <button type="button" onClick={() => { setMode("register"); setError(""); }} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}>Jetzt registrieren</button></div>
                <div style={{ marginTop: "8px" }}><a href="/forgot-password" style={{ color: "#94a3b8", fontSize: "12px" }}>Passwort vergessen?</a></div>
                <div style={{ marginTop: "12px" }}>
                  <button type="button" onClick={() => setShowCodeInput(v => !v)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "12px", textDecoration: "underline" }}>🔑 Präsentations-Code eingeben</button>
                  {showCodeInput && (
                    <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                      <input type="text" placeholder="z.B. DEMO-2026-XYZ" value={demoCode} onChange={e => setDemoCode(e.target.value.toUpperCase())} style={{ flex: 1, padding: "8px 10px", border: "1.5px solid #d1d5db", borderRadius: "8px", fontSize: "13px", outline: "none" }} />
                      <button type="button" onClick={handleDemoCode} disabled={demoCodeLoading} style={{ padding: "8px 16px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>{demoCodeLoading ? "..." : "OK"}</button>
                    </div>
                  )}
                  {demoCodeMsg && <p style={{ fontSize: "12px", marginTop: "4px", color: demoCodeMsg.includes("freigeschaltet") ? "#16a34a" : "#dc2626" }}>{demoCodeMsg}</p>}
                </div>
              </>
            ) : (
              <div>Bereits registriert? <button type="button" onClick={() => { setMode("login"); setError(""); }} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}>Anmelden</button></div>
            )}
          </div>
        </div>
        <p style={{ textAlign: "center", fontSize: "11px", color: "#60a5fa", marginTop: "20px" }}>Ausgestellt von Alisad Gadyri · IHK-Immobilienkaufmann (Berlin, 2023)</p>
      </div>
    </div>
  );
}
