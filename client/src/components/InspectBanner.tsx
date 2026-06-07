import { useEffect, useState } from "react";
import {
  activateInspectModeFromServer,
  clearInspectModeClientState,
  isInspectModeSync,
  markInspectModeActive,
} from "@/lib/inspectMode";

export function InspectBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isInspectModeSync()) {
      markInspectModeActive();
      setVisible(true);
      return;
    }

    void activateInspectModeFromServer().then((active) => {
      setVisible(active);
    });
  }, []);

  function exitDemo() {
    clearInspectModeClientState();
    window.location.href = "/inspect/exit";
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
        <span>Admin-Vorschau (read-only) — alle Bereiche sichtbar, Änderungen deaktiviert</span>
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
