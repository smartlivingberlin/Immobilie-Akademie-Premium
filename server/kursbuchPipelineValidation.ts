const MIN_DAY_CHARS = 180;

export function validateDayOutput(
  markdown: string,
  dayNumbers: number[],
  minChars = MIN_DAY_CHARS,
): boolean {
  if (markdown.trim().length < minChars) return false;
  return dayNumbers.some((n) => {
    const patterns = [
      new RegExp(`Tag\\s*${n}\\b`, "i"),
      new RegExp(`##\\s*.*${n}`, "i"),
    ];
    return patterns.some((p) => p.test(markdown));
  });
}
