import { useEffect, useState } from "react";
import { Link } from "wouter";

export default function ZahlungErfolgreich() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get("session_id"));
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <div style={{ fontSize: 72, marginBottom: 24 }}>🎉</div>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, color: "#1e3a5f" }}>
        Zahlung erfolgreich!
      </h1>
      <p style={{ fontSize: 16, color: "#64748b", marginBottom: 32, lineHeight: 1.6 }}>
        Vielen Dank für deinen Kauf. Deine Module werden in Kürze freigeschaltet.<br />
        Du erhältst eine Bestätigung per E-Mail.
      </p>

      {sessionId && (
        <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 32 }}>
          Referenz: {sessionId.slice(0, 24)}...
        </p>
      )}

      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/">
          <button style={{
            background: "#2563eb", color: "white", border: "none",
            borderRadius: 10, padding: "14px 28px", fontWeight: 700,
            fontSize: 15, cursor: "pointer"
          }}>
            Zum Portal →
          </button>
        </Link>
        <Link href="/code-einloesen">
          <button style={{
            background: "white", color: "#2563eb",
            border: "2px solid #2563eb", borderRadius: 10,
            padding: "14px 28px", fontWeight: 700,
            fontSize: 15, cursor: "pointer"
          }}>
            Code einlösen
          </button>
        </Link>
      </div>
    </div>
  );
}
