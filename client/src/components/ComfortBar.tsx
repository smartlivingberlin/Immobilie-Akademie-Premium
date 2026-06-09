import { Moon, Sun, Minus, Plus, Accessibility } from "lucide-react";
import { useA11yPrefs, A11Y_FONT_MIN, A11Y_FONT_MAX } from "@/hooks/use-a11y-prefs";
import { useA11yPanel } from "@/contexts/A11yPanelContext";

type ComfortBarProps = {
  compact?: boolean;
  className?: string;
};

/** Schrift, Dark Mode und Barrierefreiheit — immer oben in der Kopfzeile */
export function ComfortBar({ compact = false, className = "" }: ComfortBarProps) {
  const { prefs, bumpFont, toggleDark, update } = useA11yPrefs();
  const { openPanel } = useA11yPanel();

  const pct = Math.round(prefs.fontScale * 100);
  const atMin = prefs.fontScale <= A11Y_FONT_MIN + 0.001;
  const atMax = prefs.fontScale >= A11Y_FONT_MAX - 0.001;

  const btn =
    "inline-flex items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:pointer-events-none";

  return (
    <div
      role="toolbar"
      aria-label="Komfort: Schriftgröße, Darstellung, Barrierefreiheit"
      className={`inline-flex items-center gap-1 ${className}`}
    >
      {!compact && (
        <span className="hidden sm:inline text-xs text-muted-foreground font-medium mr-1">Komfort</span>
      )}

      <button
        type="button"
        className={`${btn} ${compact ? "h-8 w-8" : "h-9 w-9"}`}
        aria-label="Schrift verkleinern"
        disabled={atMin}
        onClick={() => bumpFont(-0.1)}
      >
        <Minus className="h-3.5 w-3.5" aria-hidden />
      </button>

      <button
        type="button"
        className={`${btn} ${compact ? "h-8 px-2 min-w-[3rem]" : "h-9 px-2.5 min-w-[3.25rem]"} text-xs font-semibold tabular-nums`}
        aria-label={`Schriftgröße ${pct} Prozent, zurücksetzen`}
        onClick={() => update({ fontScale: 1 })}
        title="Schriftgröße zurücksetzen"
      >
        {pct}%
      </button>

      <button
        type="button"
        className={`${btn} ${compact ? "h-8 w-8" : "h-9 w-9"}`}
        aria-label="Schrift vergrößern"
        disabled={atMax}
        onClick={() => bumpFont(0.1)}
      >
        <Plus className="h-3.5 w-3.5" aria-hidden />
      </button>

      <span className="w-px h-6 bg-border mx-0.5" aria-hidden />

      <button
        type="button"
        className={`${btn} ${compact ? "h-8 w-8" : "h-9 w-9"}`}
        aria-label={prefs.darkMode ? "Heller Modus" : "Dunkler Modus"}
        aria-pressed={prefs.darkMode}
        onClick={toggleDark}
      >
        {prefs.darkMode ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
      </button>

      <button
        type="button"
        className={`${btn} ${compact ? "h-8 w-8" : "h-9 w-9"}`}
        aria-label="Weitere Barrierefreiheits-Einstellungen"
        onClick={openPanel}
      >
        <Accessibility className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
