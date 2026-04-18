import { useEffect, useState, useCallback } from "react";

interface ExitIntentOptions {
  threshold?: number;       // px from top to trigger (default: 20)
  sessionKey?: string;      // localStorage key to not show twice
  delay?: number;           // ms delay before activating (default: 3000)
}

export function useExitIntent(options: ExitIntentOptions = {}) {
  const {
    threshold = 20,
    sessionKey = "exitIntentShown",
    delay = 3000,
  } = options;

  const [isTriggered, setIsTriggered] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Erst nach `delay` ms aktivieren (nicht sofort beim Laden)
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (!isReady) return;
    if (sessionStorage.getItem(sessionKey)) return;
    if (e.clientY <= threshold) {
      setIsTriggered(true);
      sessionStorage.setItem(sessionKey, "1");
    }
  }, [isReady, threshold, sessionKey]);

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  const dismiss = useCallback(() => setIsTriggered(false), []);
  const reset = useCallback(() => {
    sessionStorage.removeItem(sessionKey);
    setIsTriggered(false);
  }, [sessionKey]);

  return { isTriggered, dismiss, reset };
}
