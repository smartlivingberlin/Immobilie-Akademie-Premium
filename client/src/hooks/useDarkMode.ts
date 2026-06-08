import { useA11yPrefs } from "@/hooks/use-a11y-prefs";

/** @deprecated Prefer useA11yPrefs — kept for existing imports */
export function useDarkMode() {
  const { prefs, toggleDark, update } = useA11yPrefs();
  return {
    dark: prefs.darkMode || prefs.contrast === "dark",
    toggle: toggleDark,
    setDark: (value: boolean) => update({ darkMode: value, contrast: value ? "dark" : "default" }),
  };
}
