import { useState, useEffect } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      aria-live="polite"
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#1e293b", color: "#f8fafc",
        padding: "16px 24px", zIndex: 9999,
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap",
        gap: 12, boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
        fontSize: 14,
      }}
    >
      <p style={{ margin: 0, flex: 1, minWidth: 200 }}>
        🍪 Wir verwenden Cookies für den Betrieb des Portals.{" "}
        <a href="/datenschutz" style={{ color: "#60a5fa", textDecoration: "underline" }}>
          Datenschutz
        </a>
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={decline}
          aria-label="Nur notwendige Cookies"
          style={{
            background: "transparent", color: "#94a3b8",
            border: "1px solid #475569", borderRadius: 6,
            padding: "6px 16px", cursor: "pointer", fontSize: 13,
          }}
        >
          Ablehnen
        </button>
        <button
          onClick={accept}
          aria-label="Alle Cookies akzeptieren"
          style={{
            background: "#2563eb", color: "white",
            border: "none", borderRadius: 6,
            padding: "6px 16px", cursor: "pointer",
            fontSize: 13, fontWeight: 600,
          }}
        >
          Akzeptieren
        </button>
      </div>
    </div>
  );
}
