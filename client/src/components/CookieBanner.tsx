import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const logConsent = trpc.azav.logConsent?.useMutation?.() ?? null;

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const saveConsent = async (type: "accepted" | "declined") => {
    localStorage.setItem("cookie-consent", type);
    setVisible(false);
    // Server-seitiges Logging für DSGVO-Nachweis
    try {
      await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          version: "2026-04",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // Fehler beim Logging ist nicht kritisch für UX
    }
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
        🍪 Wir verwenden technisch notwendige Cookies für den Betrieb des Portals
        sowie Analytics-Cookies (Google Analytics) bei Ihrer Zustimmung.{" "}
        <a href="/datenschutz" style={{ color: "#60a5fa", textDecoration: "underline" }}>
          Datenschutzerklärung
        </a>
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => saveConsent("declined")}
          aria-label="Nur notwendige Cookies akzeptieren"
          style={{
            background: "transparent", color: "#94a3b8",
            border: "1px solid #475569", borderRadius: 6,
            padding: "6px 16px", cursor: "pointer", fontSize: 13,
          }}
        >
          Nur notwendige
        </button>
        <button
          onClick={() => saveConsent("accepted")}
          aria-label="Alle Cookies akzeptieren"
          style={{
            background: "#2563eb", color: "white",
            border: "none", borderRadius: 6,
            padding: "6px 16px", cursor: "pointer",
            fontSize: 13, fontWeight: 600,
          }}
        >
          Alle akzeptieren
        </button>
      </div>
    </div>
  );
}
