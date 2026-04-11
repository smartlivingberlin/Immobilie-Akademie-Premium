import { useEffect, useState } from "react";

export function InspectBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasCookie = document.cookie.includes("inspect_mode=");
    setVisible(hasCookie);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Spacer damit Inhalt nicht hinter Banner versteckt */}
      <div style={{ height: 44 }} />
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
        <span>Vorschau-Modus — Du kannst alles testen, Änderungen werden nicht gespeichert</span>
        <span style={{
          background: "#78350f",
          color: "#fef3c7",
          padding: "2px 8px",
          borderRadius: 4,
          fontSize: 11,
          marginLeft: 8
        }}>DEMO</span>
      </div>
    </>
  );
}
