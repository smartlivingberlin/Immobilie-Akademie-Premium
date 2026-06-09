import { useCallback, useEffect, useState } from "react";

export type ContrastMode = "default" | "high" | "dark";

export type A11yPrefs = {
  fontScale: number;
  contrast: ContrastMode;
  dyslexiaFont: boolean;
  reduceMotion: boolean;
  voiceCommandsEnabled: boolean;
  darkMode: boolean;
  lineSpacing: number;
};

export const A11Y_FONT_MIN = 0.85;
export const A11Y_FONT_MAX = 2;
export const A11Y_LINE_MIN = 1.4;
export const A11Y_LINE_MAX = 2;

const DEFAULTS: A11yPrefs = {
  fontScale: 1,
  contrast: "default",
  dyslexiaFont: false,
  reduceMotion: false,
  voiceCommandsEnabled: false,
  darkMode: false,
  lineSpacing: 1.6,
};

const KEY = "immo:a11y-prefs";

function load(): A11yPrefs {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "{}") as Partial<A11yPrefs>;
    const merged = { ...DEFAULTS, ...raw };
    if (merged.contrast === "dark" && !raw.darkMode) {
      merged.darkMode = true;
    }
    return merged;
  } catch {
    return DEFAULTS;
  }
}

/** Synchron beim App-Start aufrufen, damit Schriftgröße vor dem ersten Paint gilt. */
export function initA11yPrefsFromStorage() {
  applyA11yPrefs(load());
}

export function applyA11yPrefs(p: A11yPrefs) {
  const h = document.documentElement;
  h.style.setProperty("--a11y-font-scale", String(p.fontScale));
  h.style.setProperty("--a11y-line-height", String(p.lineSpacing));
  h.style.fontSize = `calc(16px * ${p.fontScale})`;
  h.dataset.contrast = p.contrast;
  h.dataset.dyslexia = p.dyslexiaFont ? "on" : "off";
  h.dataset.reduceMotion = p.reduceMotion ? "on" : "off";

  const useDark = p.darkMode || p.contrast === "dark";
  h.classList.toggle("dark", useDark);
  if (useDark) {
    h.setAttribute("data-theme", "dark");
  } else {
    h.removeAttribute("data-theme");
  }
}

export function useA11yPrefs() {
  const [prefs, setPrefs] = useState<A11yPrefs>(DEFAULTS);

  useEffect(() => {
    const p = load();
    setPrefs(p);
    applyA11yPrefs(p);
  }, []);

  const update = useCallback((patch: Partial<A11yPrefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch };
      if (patch.contrast === "dark") next.darkMode = true;
      if (patch.contrast === "default" && prev.contrast === "dark" && patch.contrast !== undefined) {
        next.darkMode = false;
      }
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      applyA11yPrefs(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setPrefs(DEFAULTS);
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
    applyA11yPrefs(DEFAULTS);
  }, []);

  const bumpFont = useCallback((delta: number) => {
    setPrefs((prev) => {
      const nextScale = Math.min(A11Y_FONT_MAX, Math.max(A11Y_FONT_MIN, +(prev.fontScale + delta).toFixed(2)));
      const next = { ...prev, fontScale: nextScale };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      applyA11yPrefs(next);
      return next;
    });
  }, []);

  const toggleDark = useCallback(() => {
    setPrefs((prev) => {
      const nextDark = !prev.darkMode;
      const next: A11yPrefs = {
        ...prev,
        darkMode: nextDark,
        contrast: nextDark ? "dark" : prev.contrast === "dark" ? "default" : prev.contrast,
      };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      applyA11yPrefs(next);
      return next;
    });
  }, []);

  return { prefs, update, reset, bumpFont, toggleDark };
}
