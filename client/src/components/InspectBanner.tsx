import { useEffect, useState } from "react";

export function InspectBanner() {
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Prüfe inspect_mode Cookie
    const hasCookie = document.cookie.includes("inspect_mode=");
    // Oder URL-Parameter
    const isInspect = hasCookie || window.location.pathname.startsWith("/inspect/");
    setVisible(isInspect);

    if (isInspect) {
      // Verhindere alle Formular-Submits und Klicks auf Buttons mit Mutation
      const handler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const btn = target.closest("button");
        if (!btn) return;
        // Erlaube nur Navigation/Copy-Buttons
        const text = btn.textContent || "";
        const safe = ["anmelden", "login", "zurück", "öffnen", "schließen", "kopieren", "weiter", "lesen", "starten"];
        const isSafe = safe.some(s => text.toLowerCase().includes(s));
        if (!isSafe && !btn.getAttribute("data-allow-inspect")) {
          e.stopPropagation();
          e.preventDefault();
          showToast("🔒 Vorschau-Modus — keine Änderungen möglich");
        }
      };
      document.addEventListener("click", handler, true);
      return () => document.removeEventListener("click", handler, true);
    }
  }, []);

  const showToast = (msg: string) => {
    const el = document.createElement("div");
    el.textContent = msg;
    el.style.cssText = "position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1e1b4b;color:#a5b4fc;padding:10px 20px;border-radius:8px;font-size:13px;z-index:9999;border:1px solid #4338ca";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2500);
  };

  if (!visible) return null;

  return (
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
      <span>Vorschau-Modus — Du siehst alles, kannst aber keine Änderungen vornehmen</span>
      <span style={{
        background: "#78350f",
        color: "#fef3c7",
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 11,
        marginLeft: 8
      }}>READ ONLY</span>
    </div>
  );
}
