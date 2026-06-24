import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { isOAuthEnabled, handleGoogleLogin } from "@/lib/oauth";
import { ComfortBar } from "@/components/ComfortBar";
import { SEO } from "@/components/SEO";
import { isVerwalterPortal } from "@/lib/portalMode";
import { resolvePostLoginRedirect } from "@/lib/postLoginRedirect";

const TOUCH_MIN = 44;

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  border: "1.5px solid #d1d5db",
  borderRadius: "10px",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box" as const,
  fontFamily: "inherit",
  color: "#0f172a",
};

const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: "500" as const,
  color: "#1e293b",
  marginBottom: "6px",
};

const textLinkStyle = {
  background: "none",
  border: "none",
  color: "#1d4ed8",
  cursor: "pointer",
  fontWeight: "600" as const,
  fontSize: "14px",
  minHeight: TOUCH_MIN,
  padding: "10px 4px",
  lineHeight: "24px",
};

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [demoCode, setDemoCode] = useState("");
  const [demoCodeLoading, setDemoCodeLoading] = useState(false);
  const [demoCodeMsg, setDemoCodeMsg] = useState("");
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref")?.trim();
    const stored = sessionStorage.getItem("referralCode")?.trim();
    const code = ref || stored || "";
    if (code) {
      setReferralCode(code);
      sessionStorage.setItem("referralCode", code);
      if (ref) setMode("register");
    }
  }, []);

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
    const body = mode === "login"
      ? { email, password }
      : { email, password, name, ...(referralCode ? { referralCode } : {}) };
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), credentials: "include" });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Fehler beim Anmelden."); return; }
      if (data.role === "admin") {
        window.location.href = "/admin-2fa";
      } else {
        const redirectTo = isVerwalterPortal()
          ? "/app/verwalter"
          : resolvePostLoginRedirect("/statistiken");
        window.location.href = redirectTo;
      }
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
      else {
        setDemoCodeMsg("Zugang freigeschaltet!");
        setTimeout(() => {
          const redirectTo = isVerwalterPortal()
            ? "/app/verwalter"
            : resolvePostLoginRedirect("/statistiken");
          window.location.href = redirectTo;
        }, 1500);
      }
    } catch { setDemoCodeMsg("Verbindungsfehler."); }
    finally { setDemoCodeLoading(false); }
  }

  return (
    <>
      <SEO
        title="Anmelden"
        description="Anmeldung beim Immobilien Akademie Smart Lernportal — Zugang zu Kursen, Rechenpraxis und Verwalter-Tools."
        canonical="https://immobilien-akademie-smart.de/login"
      />
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0c1628 0%, #0f2744 40%, #1a1040 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", fontFamily: "system-ui, sans-serif", position: "relative" }}>
        <div style={{ position: "fixed", top: 12, right: 12, zIndex: 50 }}>
          <ComfortBar compact touchFriendly />
        </div>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ width: "72px", height: "72px", background: "linear-gradient(135deg, #2563eb, #7c3aed)", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 8px 32px rgba(37,99,235,0.5)" }}>
              <span style={{ color: "white", fontSize: "22px", fontWeight: "900", fontFamily: "Fraunces, Georgia, serif" }}>IA</span>
            </div>
            <h1 style={{ color: "white", fontSize: "26px", fontWeight: "900", margin: "0 0 4px", fontFamily: "Fraunces, Georgia, serif", letterSpacing: "-0.02em" }}>Immobilien-Akademie</h1>
            <p style={{ color: "#dbeafe", fontSize: "14px", margin: 0 }}>Praxis- und Fachvorbereitung §34c · IHK-Sachkunde §34i</p>
          </div>
          <div style={{ background: "white", borderRadius: "20px", padding: "36px", boxShadow: "0 25px 50px rgba(0,0,0,0.4)" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#1e293b", margin: "0 0 24px" }}>{mode === "login" ? "Anmelden" : "Konto erstellen"}</h2>
            {referralCode && mode === "register" && (
              <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px", padding: "10px 12px", fontSize: "14px", color: "#1e3a8a", marginBottom: "16px" }}>
                Empfehlung erkannt — nach Ihrem ersten Kauf erhalten Sie und Ihr Empfehlender Bonus-Tage.
              </div>
            )}
            {isOAuthEnabled() && (
              <div style={{ marginBottom: "20px" }}>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: TOUCH_MIN, padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", background: "white", cursor: "pointer", fontSize: "14px", fontWeight: "500", color: "#1e293b" }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                    <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                    <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
                    <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
                    <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
                  </svg>
                  Mit Google anmelden
                </button>
                <div style={{ display: "flex", alignItems: "center", margin: "16px 0", gap: "12px" }}>
                  <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
                  <span style={{ fontSize: "13px", color: "#374151" }}>oder</span>
                  <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} autoComplete="new-password">
              {mode === "register" && (
                <div style={{ marginBottom: "16px" }}>
                  <label htmlFor="login-name" style={labelStyle}>Name</label>
                  <input id="login-name" name="name" ref={nameRef} type="text" placeholder="Ihr Name" autoComplete="new-password" style={inputStyle} />
                </div>
              )}
              <div style={{ marginBottom: "16px" }}>
                <label htmlFor="login-email" style={labelStyle}>E-Mail</label>
                <input id="login-email" name="email" ref={emailRef} type="email" placeholder="ihre@email.de" autoComplete="new-password" autoCorrect="off" autoCapitalize="off" spellCheck={false} style={inputStyle} />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="login-password" style={labelStyle}>Passwort</label>
                <div style={{ position: "relative" }}>
                  <input id="login-password" name="password" ref={passwordRef} type={showPassword ? "text" : "password"} placeholder="Ihr Passwort" autoComplete="new-password" style={{ ...inputStyle, paddingRight: "52px" }} />
                  <button
                    aria-label="Passwort anzeigen/verbergen"
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={{ position: "absolute", right: "4px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#374151", minWidth: TOUCH_MIN, minHeight: TOUCH_MIN, display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "10px 12px", fontSize: "14px", color: "#b91c1c", marginBottom: "16px" }}>{error}</div>}
              <button type="submit" disabled={loading} style={{ width: "100%", minHeight: TOUCH_MIN, padding: "12px", background: loading ? "#93c5fd" : "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "white", border: "none", borderRadius: "10px", fontSize: "16px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 14px rgba(37,99,235,0.4)" }}>
                {loading ? (mode === "login" ? "Anmelden..." : "Erstellen...") : (mode === "login" ? "Anmelden" : "Konto erstellen")}
              </button>
            </form>
            <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#475569" }}>
              {mode === "login" ? (
                <>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                    <span>Noch kein Konto?</span>
                    <button type="button" onClick={() => { setMode("register"); setError(""); }} style={textLinkStyle}>Jetzt registrieren</button>
                  </div>
                  <div style={{ marginTop: "4px" }}>
                    <a href="/forgot-password" style={{ ...textLinkStyle, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>Passwort vergessen?</a>
                  </div>
                  <div style={{ marginTop: "8px" }}>
                    <button type="button" onClick={() => setShowCodeInput((v) => !v)} style={{ ...textLinkStyle, color: "#374151", fontWeight: "500", textDecoration: "underline" }}>Präsentations-Code eingeben</button>
                    {showCodeInput && (
                      <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                        <input type="text" placeholder="z.B. DEMO-2026-XYZ" value={demoCode} onChange={(e) => setDemoCode(e.target.value.toUpperCase())} style={{ flex: 1, minHeight: TOUCH_MIN, padding: "8px 10px", border: "1.5px solid #d1d5db", borderRadius: "8px", fontSize: "16px", outline: "none" }} />
                        <button type="button" onClick={handleDemoCode} disabled={demoCodeLoading} style={{ minHeight: TOUCH_MIN, minWidth: TOUCH_MIN, padding: "8px 16px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>{demoCodeLoading ? "..." : "OK"}</button>
                      </div>
                    )}
                    {demoCodeMsg && <p style={{ fontSize: "13px", marginTop: "4px", color: demoCodeMsg.includes("freigeschaltet") ? "#15803d" : "#b91c1c" }}>{demoCodeMsg}</p>}
                  </div>
                </>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                  <span>Bereits registriert?</span>
                  <button type="button" onClick={() => { setMode("login"); setError(""); }} style={textLinkStyle}>Anmelden</button>
                </div>
              )}
            </div>
          </div>
          <p style={{ textAlign: "center", fontSize: "12px", color: "#bfdbfe", marginTop: "20px" }}>Immobilien Akademie Smart · Berlin</p>
        </div>
      </div>
    </>
  );
}
