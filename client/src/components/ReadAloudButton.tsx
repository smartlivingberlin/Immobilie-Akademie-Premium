import { useState } from "react";
import { Play, Pause, Square, Volume2 } from "lucide-react";
import { useSpeech } from "../hooks/use-speech";

export function ReadAloudButton({ getText, label="Vorlesen", className="" }: {
  getText: () => string; label?: string; className?: string;
}) {
  const { state, supported, voices, speak, pause, resume, stop, setRate, setVoice, prefs } = useSpeech();
  const [showSettings, setShowSettings] = useState(false);
  const [rateLocal, setRateLocal] = useState(prefs.rate);

  if (!supported) return null;

  const handleMain = () => {
    if (state === "idle") speak(getText());
    else if (state === "playing") pause();
    else resume();
  };

  return (
    <div className={`inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 backdrop-blur px-2 py-1 shadow-sm ${className}`}>
      <button onClick={handleMain} aria-label={state==="playing"?"Pausieren":state==="paused"?"Fortsetzen":label}
        className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
        {state==="playing" ? <Pause className="h-4 w-4"/> : <Play className="h-4 w-4"/>}
        <span className="hidden sm:inline text-xs font-medium">
          {state==="playing"?"Pause":state==="paused"?"Weiter":label}
        </span>
      </button>
      {state !== "idle" && (
        <button onClick={stop} aria-label="Stoppen"
          className="rounded-full p-1 text-slate-500 hover:bg-slate-100">
          <Square className="h-3.5 w-3.5"/>
        </button>
      )}
      <div className="relative">
        <button onClick={()=>setShowSettings(!showSettings)} aria-label="Einstellungen"
          className="rounded-full p-1 text-slate-500 hover:bg-slate-100">
          <Volume2 className="h-3.5 w-3.5"/>
        </button>
        {showSettings && (
          <div className="absolute right-0 top-8 z-50 w-64 rounded-xl border border-slate-200 bg-white shadow-lg p-4 space-y-3">
            <div>
              <label className="text-xs text-slate-500 block mb-1">Geschwindigkeit: {rateLocal.toFixed(1)}x</label>
              <input type="range" min={0.6} max={1.6} step={0.1} value={rateLocal}
                onChange={e=>{const v=parseFloat(e.target.value);setRateLocal(v);setRate(v);}}
                className="w-full accent-blue-600"/>
            </div>
            {voices.length > 0 && (
              <select onChange={e=>setVoice(e.target.value||null)}
                className="w-full text-xs rounded border border-slate-200 px-2 py-1">
                <option value="">Auto</option>
                {voices.map(v=><option key={v.voiceURI} value={v.voiceURI}>{v.name}</option>)}
              </select>
            )}
            <button onClick={()=>setShowSettings(false)} className="text-xs text-slate-400 hover:text-slate-600">Schließen</button>
          </div>
        )}
      </div>
    </div>
  );
}
