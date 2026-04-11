import { useEffect, useState } from "react";

export function InspectBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Cookie oder URL-Parameter
    const hasCookie = document.cookie.includes("inspect_mode=");
    const hasParam = window.location.search.includes("inspect=1");
    if (hasParam && !hasCookie) {
      // Setze Cookie für weitere Navigation
      document.cookie = "inspect_mode=1; path=/; max-age=" + (72*60*60) + "; samesite=lax";
    }
    setVisible(hasCookie || hasParam);
    
    // Behalte inspect=1 Parameter bei Navigation
    if (hasParam) {
      sessionStorage.setItem("inspect_mode", "1");
    }
    if (sessionStorage.getItem("inspect_mode") === "1") {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <>
      <div style={{ height: 48 }} />
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        background: "#fbbf24",
        color: "#78350f",
        padding: "12px 16px",
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
      </div>
    </>
  );
}
