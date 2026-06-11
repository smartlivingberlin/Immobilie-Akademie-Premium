/** Kostenlose Browser-Stimme — synchron beim Klick (kein await vor speak). */

let keepAliveRef: ReturnType<typeof setInterval> | null = null;

export function isBrowserSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function stopBrowserSpeech(): void {
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  if (keepAliveRef) {
    clearInterval(keepAliveRef);
    keepAliveRef = null;
  }
}

export function cleanTextForSpeech(raw: string): string {
  return raw
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/`[^`]+`/g, "")
    .replace(/https?:\/\/\S+/g, "Link")
    .replace(/\n{2,}/g, ". ")
    .replace(/\n/g, " ")
    .trim();
}

export function speakBrowserText(
  text: string,
  opts?: { rate?: number; onEnd?: () => void; onError?: () => void }
): boolean {
  if (!isBrowserSpeechSupported()) return false;
  const cleaned = cleanTextForSpeech(text);
  if (!cleaned) return false;

  stopBrowserSpeech();

  const utterance = new SpeechSynthesisUtterance(cleaned);
  utterance.lang = "de-DE";
  utterance.rate = opts?.rate ?? 0.9;

  keepAliveRef = setInterval(() => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    } else if (keepAliveRef) {
      clearInterval(keepAliveRef);
      keepAliveRef = null;
    }
  }, 10000);

  const setVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const german =
      voices.find((v) => v.lang === "de-DE") ||
      voices.find((v) => v.lang.startsWith("de"));
    if (german) utterance.voice = german;
  };
  setVoice();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = setVoice;
  }

  utterance.onend = () => {
    stopBrowserSpeech();
    opts?.onEnd?.();
  };
  utterance.onerror = () => {
    stopBrowserSpeech();
    opts?.onError?.();
  };

  window.speechSynthesis.speak(utterance);
  return true;
}
