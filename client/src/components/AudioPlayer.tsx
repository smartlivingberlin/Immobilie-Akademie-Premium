import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  text: string;
  label?: string;
}

export default function AudioPlayer({ text, label = "Vorlesen" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  const cleanText = (raw: string) =>
    raw.replace(/#{1,6}\s/g, "").replace(/\*\*/g, "").replace(/\*/g, "")
       .replace(/`[^`]+`/g, "").replace(/https?:\/\/\S+/g, "Link")
       .replace(/\n{2,}/g, ". ").replace(/\n/g, " ").trim();

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
  }, []);

  const play = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();

    const cleaned = cleanText(text);
    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.lang = "de-DE";
    utterance.rate = speed;
    utterance.pitch = 1;

    // Deutsche Stimme bevorzugen
    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find(v => v.lang.startsWith("de")) || null;
    if (germanVoice) utterance.voice = germanVoice;

    utterance.onstart = () => { setIsPlaying(true); setIsPaused(false); };
    utterance.onend = () => { setIsPlaying(false); setIsPaused(false); setProgress(0); };
    utterance.onerror = () => { setIsPlaying(false); setIsPaused(false); };
    utterance.onboundary = (e) => {
      if (e.name === "word") {
        setProgress(Math.round((e.charIndex / cleaned.length) * 100));
      }
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [text, speed, supported]);

  const pause = useCallback(() => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  }, [isPlaying]);

  const resume = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
    }
  }, [isPaused]);

  // Stoppen wenn Komponente entladen wird
  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  // Speed-Änderung während Wiedergabe
  const changeSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (isPlaying || isPaused) {
      stop();
      setTimeout(() => play(), 100);
    }
  };

  if (!supported) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap bg-blue-50 dark:bg-blue-900/20 rounded-xl px-3 py-2 border border-blue-200 dark:border-blue-800">
      {/* Play/Pause/Stop Buttons */}
      {!isPlaying && !isPaused && (
        <Button size="sm" variant="ghost" onClick={play}
          className="h-8 gap-1.5 text-blue-700 hover:bg-blue-100 text-xs font-medium">
          🔊 {label}
        </Button>
      )}
      {isPlaying && (
        <Button size="sm" variant="ghost" onClick={pause}
          className="h-8 gap-1.5 text-blue-700 hover:bg-blue-100 text-xs font-medium">
          ⏸ Pause
        </Button>
      )}
      {isPaused && (
        <Button size="sm" variant="ghost" onClick={resume}
          className="h-8 gap-1.5 text-blue-700 hover:bg-blue-100 text-xs font-medium">
          ▶️ Weiter
        </Button>
      )}
      {(isPlaying || isPaused) && (
        <Button size="sm" variant="ghost" onClick={stop}
          className="h-8 text-red-500 hover:bg-red-50 text-xs">
          ⏹ Stop
        </Button>
      )}

      {/* Fortschrittsbalken */}
      {(isPlaying || isPaused) && progress > 0 && (
        <div className="flex-1 min-w-16 bg-blue-200 rounded-full h-1.5">
          <div className="bg-blue-600 h-1.5 rounded-full transition-all"
            style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Geschwindigkeit */}
      <div className="flex items-center gap-1 ml-auto">
        <span className="text-xs text-blue-600 opacity-70">Tempo:</span>
        {[0.75, 1, 1.25, 1.5].map(s => (
          <button key={s} onClick={() => changeSpeed(s)}
            className={`text-xs px-1.5 py-0.5 rounded ${
              speed === s
                ? "bg-blue-600 text-white font-bold"
                : "text-blue-600 hover:bg-blue-100"
            }`}>
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}
