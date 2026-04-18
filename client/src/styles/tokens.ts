// Design-Tokens — Immobilien Akademie Smart
// Einmal definieren, überall konsistent verwenden

export const tokens = {
  colors: {
    // Brand
    primary:      "#2563eb",
    primaryHover: "#1d4ed8",
    primaryLight: "#eff6ff",
    secondary:    "#1e3a5f",
    accent:       "#f5c842",
    accentDark:   "#d4a017",

    // Status
    success:      "#059669",
    successLight: "#d1fae5",
    warning:      "#d97706",
    warningLight: "#fef3c7",
    danger:       "#dc2626",
    dangerLight:  "#fee2e2",
    info:         "#0891b2",
    infoLight:    "#e0f2fe",

    // Neutral
    bg:           "#f8fafc",
    surface:      "#ffffff",
    surfaceHover: "#f1f5f9",
    border:       "#e2e8f0",
    borderHover:  "#cbd5e1",
    text:         "#0f172a",
    textMuted:    "#64748b",
    textLight:    "#94a3b8",

    // Dark Mode ready
    dark: {
      bg:      "#0f172a",
      surface: "#1e293b",
      border:  "#334155",
      text:    "#f1f5f9",
    }
  },

  spacing: {
    "0":   "0px",
    "1":   "4px",
    "2":   "8px",
    "3":   "12px",
    "4":   "16px",
    "5":   "20px",
    "6":   "24px",
    "8":   "32px",
    "10":  "40px",
    "12":  "48px",
    "16":  "64px",
    "20":  "80px",
    "24":  "96px",
    "32":  "128px",
  },

  radius: {
    none: "0px",
    sm:   "4px",
    md:   "8px",
    lg:   "12px",
    xl:   "16px",
    "2xl":"20px",
    "3xl":"24px",
    full: "9999px",
  },

  shadows: {
    sm:  "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    md:  "0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
    lg:  "0 8px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.04)",
    xl:  "0 16px 48px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.04)",
    "2xl":"0 24px 64px rgba(0,0,0,0.15)",
    inner: "inset 0 2px 4px rgba(0,0,0,0.06)",
    blue: "0 4px 24px rgba(37,99,235,0.25)",
    gold: "0 4px 24px rgba(245,200,66,0.35)",
  },

  typography: {
    fonts: {
      sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
    },
    sizes: {
      "xs":  "0.75rem",   // 12px
      "sm":  "0.875rem",  // 14px
      "base":"1rem",      // 16px
      "lg":  "1.125rem",  // 18px
      "xl":  "1.25rem",   // 20px
      "2xl": "1.5rem",    // 24px
      "3xl": "1.875rem",  // 30px
      "4xl": "2.25rem",   // 36px
      "5xl": "3rem",      // 48px
      "6xl": "3.75rem",   // 60px
    },
    weights: {
      normal:   400,
      medium:   500,
      semibold: 600,
      bold:     700,
      extrabold:800,
    },
    lineHeights: {
      tight:  1.25,
      snug:   1.375,
      normal: 1.5,
      relaxed:1.625,
      loose:  2,
    },
    letterSpacing: {
      tight:  "-0.025em",
      normal: "0em",
      wide:   "0.025em",
      wider:  "0.05em",
    }
  },

  transitions: {
    fast:   "150ms ease-out",
    normal: "200ms ease-out",
    slow:   "300ms ease-out",
    spring: "400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
  },

  breakpoints: {
    sm:  "640px",
    md:  "768px",
    lg:  "1024px",
    xl:  "1280px",
    "2xl":"1536px",
  },

  zIndex: {
    base:    0,
    above:   10,
    dropdown:1000,
    sticky:  1100,
    modal:   1200,
    toast:   1300,
    tooltip: 1400,
  }
} as const;

export type ColorToken = typeof tokens.colors;
export type SpacingToken = typeof tokens.spacing;
