/** Skalierte Schriftgröße für Inline-Styles (reagiert auf Komfort-Leiste). */
export function scaledFontSize(px: number): string {
  return `calc(${px}px * var(--a11y-font-scale, 1))`;
}
