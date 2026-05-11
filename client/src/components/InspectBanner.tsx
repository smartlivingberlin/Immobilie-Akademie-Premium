import { useEffect, useState } from "react";

export function InspectBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasCookie = document.cookie.includes("inspect_mode=");
    const hasParam  = window.location.search.includes("inspect=1");
    const hasSession = sessionStorage.getItem("inspect_mode") === "1";

    if (hasParam && !hasCookie) {
      document.cookie = "inspect_mode=1; path=/; max-age=" + (72*60*60) + "; samesite=lax";
      sessionStorage.setItem("inspect_mode", "1");
    }
    setVisible(hasCookie || hasParam || hasSession);
  }, []);

  function exitDemo() {
    document.cookie = "inspect_mode=; path=/; max-age=0; samesite=lax";
    sessionStorage.removeItem("inspect_mode");
    // Nach Rolle weiterleiten
    fetch("/api/auth/me", { credentials: "include" })
      .then(r => r.json())
      .then(user => {
        if (user?.role === "admin") window.location.href = "/admin";
        else window.location.href = "/modul/1";
      })
      .catch(() => { window.location.href = "/login"; });
  }

  if (!visible) return null;

  return (
    <>
      <div style={{ height: 48 }} />
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        background: "#fbbf24",
        color: "#78350f",
        padding: "10px 16px",
        fontSize: 13,
        fontWeight: 600,
        textAlign: "center",
        zIndex: 9998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
      }}>
        <span style={{fontSize:16}}>👁️</span>
        <span>Vorschau-Modus — Alles testbar, Käufe sind deaktiviert</span>
        <span style={{
          background: "#78350f",
          color: "#fef3c7",
          padding: "2px 10px",
          borderRadius: 4,
          fontSize: 11,
          marginLeft: 8,
          fontWeight: 700
        }}>DEMO</span>
        <button
          onClick={exitDemo}
          style={{
            marginLeft: 16,
            background: "#78350f",
            color: "#fef3c7",
            border: "none",
            borderRadius: 4,
            padding: "3px 12px",
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer"
          }}
          title="Vorschau-Modus beenden"
        >
          ✕ Demo verlassen
        </button>
      </div>
    </>
  );
}
