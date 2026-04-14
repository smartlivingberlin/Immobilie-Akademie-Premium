import { useState } from "react";
import { useLocation } from "wouter";

export default function Admin2FA() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"email"|"code">("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hint, setHint] = useState("");

  const requestCode = async () => {
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/auth/admin-2fa/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const d = await r.json();
      if (d.ok) {
        setStep("code");
        if (d.hint) setHint(d.hint);
      } else {
        setError(d.error || "Fehler");
      }
    } catch { setError("Netzwerkfehler"); }
    finally { setLoading(false); }
  };

  const verifyCode = async () => {
    if (!code || code.length !== 6) return;
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/auth/admin-2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const d = await r.json();
      if (d.ok) {
        // 2FA erfolgreich → weiter zum normalen Admin-Login
        setLocation("/admin");
      } else {
        setError(d.error || "Falscher Code");
      }
    } catch { setError("Netzwerkfehler"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "white", borderRadius: 16, padding: 40, width: "100%", maxWidth: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔐</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: 0 }}>Admin-Zugang</h1>
          <p style={{ color: "#64748b", fontSize: 14, marginTop: 6 }}>
            {step === "email" ? "2-Faktor-Authentifizierung" : `Code an ${email} gesendet`}
          </p>
        </div>

        {step === "email" ? (
          <div>
            <input
              type="text"
              placeholder="Ihr Name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "12px 14px", fontSize: 14, marginBottom: 12, boxSizing: "border-box" }}
            />
            <input
              type="email"
              placeholder="Admin E-Mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && requestCode()}
              style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "12px 14px", fontSize: 14, marginBottom: 16, boxSizing: "border-box" }}
            />
            <button
              onClick={requestCode}
              disabled={loading || !email}
              style={{ width: "100%", background: "#2563eb", color: "white", border: "none", borderRadius: 8, padding: "13px", fontSize: 15, fontWeight: 700, cursor: "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "⏳ Wird gesendet..." : "Code anfordern →"}
            </button>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16, textAlign: "center" }}>
              6-stelligen Code eingeben:
            </p>
            <input
              type="text"
              placeholder="000000"
              value={code}
              maxLength={6}
              onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
              onKeyDown={e => e.key === "Enter" && verifyCode()}
              style={{
                width: "100%", border: "2px solid #2563eb", borderRadius: 8,
                padding: "16px 14px", fontSize: 28, fontWeight: 700,
                textAlign: "center", letterSpacing: 12, marginBottom: 16, boxSizing: "border-box"
              }}
            />
            {hint && (
              <div style={{ background: "#fef3c7", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#92400e", marginBottom: 12, textAlign: "center" }}>
                DEV-Modus: {hint}
              </div>
            )}
            <button
              onClick={verifyCode}
              disabled={loading || code.length !== 6}
              style={{ width: "100%", background: "#059669", color: "white", border: "none", borderRadius: 8, padding: "13px", fontSize: 15, fontWeight: 700, cursor: "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "⏳ Prüfe..." : "✓ Bestätigen"}
            </button>
            <button
              onClick={() => { setStep("email"); setCode(""); setError(""); }}
              style={{ width: "100%", background: "transparent", color: "#64748b", border: "none", padding: "10px", fontSize: 13, cursor: "pointer", marginTop: 8 }}
            >
              ← Zurück
            </button>
          </div>
        )}

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#dc2626", marginTop: 12, textAlign: "center" }}>
            {error}
          </div>
        )}

        <div style={{ marginTop: 24, padding: "12px 16px", background: "#f0f9ff", borderRadius: 8, fontSize: 11, color: "#1e40af" }}>
          🔒 Code ist 10 Minuten gültig · Max. 3 Versuche
        </div>
      </div>
    </div>
  );
}
