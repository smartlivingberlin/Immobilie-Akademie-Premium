import { useState } from "react";

export default function TesterZugang() {
  const [step, setStep] = useState<"email"|"code"|"success">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [hours, setHours] = useState(72);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const sendCode = async () => {
    if (!email) return setError("Bitte E-Mail eingeben");
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/tester/request", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, hours }),
      });
      const d = await res.json();
      if (d.ok) setStep("code");
      else setError(d.error || "Fehler beim Senden");
    } catch { setError("Verbindungsfehler"); }
    finally { setLoading(false); }
  };

  const verifyCode = async () => {
    if (!code) return setError("Bitte Code eingeben");
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/tester/verify", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, hours }),
      });
      const d = await res.json();
      if (d.ok) {
        setExpiresAt(new Date(d.expiresAt).toLocaleString("de-DE"));
        setStep("success");
        setTimeout(() => { window.location.href = "/admin"; }, 2000);
      } else setError(d.error || "Ungültiger Code");
    } catch { setError("Verbindungsfehler"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#1e293b", borderRadius: 16, padding: "40px 36px", width: "100%", maxWidth: 420, border: "1px solid #334155" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔑</div>
          <h1 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: 24, fontWeight: 800, color: "#f1f5f9", margin: "0 0 8px" }}>Tester-Zugang</h1>
          <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>Immobilien Akademie Smart</p>
        </div>

        {step === "email" && (
          <div>
            <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>
              Du hast eine Einladung erhalten. Gib deine E-Mail-Adresse ein — du bekommst sofort einen Zugangscode.
            </p>
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 6 }}>Deine E-Mail-Adresse</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendCode()}
                placeholder="deine@email.de"
                style={{ width: "100%", background: "#0f172a", border: "1px solid #334155", borderRadius: 8, padding: "12px 14px", color: "white", fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 8 }}>Zugang gültig für</label>
              <div style={{ display: "flex", gap: 8 }}>
                {[48, 72, 168].map(h => (
                  <button key={h} onClick={() => setHours(h)}
                    style={{ flex: 1, padding: "10px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", border: "none",
                      background: hours === h ? "#1d4ed8" : "#0f172a", color: hours === h ? "white" : "#64748b" }}>
                    {h === 168 ? "7 Tage" : `${h}h`}
                  </button>
                ))}
              </div>
            </div>
            {error && <div style={{ background: "#1a0a0a", border: "1px solid #7f1d1d", borderRadius: 8, padding: "10px 14px", color: "#fca5a5", fontSize: 13, marginBottom: 16 }}>{error}</div>}
            <button onClick={sendCode} disabled={loading}
              style={{ width: "100%", background: "#1d4ed8", color: "white", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Sende Code..." : "Code per E-Mail erhalten →"}
            </button>
          </div>
        )}

        {step === "code" && (
          <div>
            <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>
              Wir haben einen 6-stelligen Code an <strong style={{ color: "#f1f5f9" }}>{email}</strong> gesendet.
            </p>
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 6 }}>6-stelliger Code</label>
              <input type="text" value={code} onChange={e => setCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                onKeyDown={e => e.key === "Enter" && verifyCode()}
                placeholder="123456" maxLength={6}
                style={{ width: "100%", background: "#0f172a", border: "1px solid #334155", borderRadius: 8, padding: "12px 14px", color: "white", fontSize: 24, fontWeight: 700, letterSpacing: 8, textAlign: "center", boxSizing: "border-box" }} />
            </div>
            {error && <div style={{ background: "#1a0a0a", border: "1px solid #7f1d1d", borderRadius: 8, padding: "10px 14px", color: "#fca5a5", fontSize: 13, marginBottom: 16 }}>{error}</div>}
            <button onClick={verifyCode} disabled={loading}
              style={{ width: "100%", background: "#1d4ed8", color: "white", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Prüfe Code..." : "Zugang aktivieren →"}
            </button>
            <button onClick={() => { setStep("email"); setError(""); }}
              style={{ width: "100%", background: "transparent", color: "#64748b", border: "none", padding: "10px", fontSize: 13, cursor: "pointer", marginTop: 8 }}>
              ← Andere E-Mail verwenden
            </button>
          </div>
        )}

        {step === "success" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h2 style={{ color: "#10b981", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Zugang aktiviert!</h2>
            <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>
              Du wirst weitergeleitet...<br />
              Zugang gültig bis: <strong style={{ color: "#f1f5f9" }}>{expiresAt}</strong>
            </p>
          </div>
        )}

        <p style={{ color: "#475569", fontSize: 11, textAlign: "center", marginTop: 24, marginBottom: 0 }}>
          Immobilien Akademie Smart · Alisad Gadyri · Berlin
        </p>
      </div>
    </div>
  );
}
