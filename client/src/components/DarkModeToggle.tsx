import { useA11yPrefs } from "@/hooks/use-a11y-prefs";

export function DarkModeToggle({ className = "" }: { className?: string }) {
  const { prefs, toggleDark } = useA11yPrefs();
  const dark = prefs.darkMode || prefs.contrast === "dark";
  return (
    <button
      onClick={toggleDark}
      aria-label={dark ? "Heller Modus aktivieren" : "Dunkler Modus aktivieren"}
      title={dark ? "Light Mode" : "Dark Mode"}
      style={{
        background: dark ? "#334155" : "#f1f5f9",
        border: `1px solid ${dark ? "#475569" : "#e2e8f0"}`,
        borderRadius: 10,
        width: 40, height: 40,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", fontSize: 18,
        transition: "all 0.2s ease",
        flexShrink: 0,
      }}
      className={className}
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
