import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Accessibility, Type, Mic, MicOff, RotateCcw, Wind, X, Sparkles } from "lucide-react";
import { useA11yPrefs, type ContrastMode } from "../hooks/use-a11y-prefs";
import { useVoiceCommands } from "../hooks/use-voice-commands";
import { useSpeech } from "../hooks/use-speech";

export function AccessibilityPanel({
  hideFab = false,
  open: controlledOpen,
  onOpenChange,
}: {
  hideFab?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const { prefs, update, reset } = useA11yPrefs();
  const [, navigate] = useLocation();
  const { speak, stop: stopSpeak } = useSpeech();
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const toast = (msg: string) => {
    const el = document.createElement("div");
    el.textContent = msg; el.setAttribute("role","status"); el.setAttribute("aria-live","polite");
    el.style.cssText="position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1e293b;color:#fff;padding:8px 16px;border-radius:8px;font-size:13px;z-index:9999;pointer-events:none;";
    document.body.appendChild(el); setTimeout(()=>el.remove(),2000);
  };

  const commands = useMemo(()=>[
    { patterns:[/^(gehe? zu|öffne) kurs/,/^kurs(e)?$/], action:()=>{navigate("/kurse");toast("Kurse");}, description:"‚Öffne Kurse'" },
    { patterns:[/^(gehe? zu|öffne) glossar/,/^glossar$/], action:()=>{navigate("/glossary");toast("Glossar");}, description:"‚Öffne Glossar'" },
    { patterns:[/^(gehe? zu|öffne) dashboard/,/^dashboard$/,/^statistiken$/], action:()=>{navigate("/statistiken");toast("Lernbereich");}, description:"‚Gehe zum Lernbereich'" },
    { patterns:[/^(gehe? zu|öffne) förderung/,/^förderung$/], action:()=>{navigate("/foerderung");toast("Förderung");}, description:"‚Öffne Förderung'" },
    { patterns:[/^(startseite|home)$/], action:()=>{navigate("/");toast("Startseite");}, description:"‚Startseite'" },
    { patterns:[/^(vorlesen|lies vor)$/], action:()=>{const t=(document.querySelector("main") as HTMLElement)?.innerText??document.body.innerText;speak(t.slice(0,6000));toast("Vorlesen gestartet");}, description:"‚Vorlesen'" },
    { patterns:[/^(stopp|stop|halt)$/], action:()=>{stopSpeak();toast("Gestoppt");}, description:"‚Stopp'" },
    { patterns:[/^schrift (größer|groesser)/], action:()=>{const n=Math.min(1.5,prefs.fontScale+0.1);update({fontScale:n});toast(`Schrift ${Math.round(n*100)}%`);}, description:"‚Schrift größer'" },
    { patterns:[/^schrift kleiner/], action:()=>{const n=Math.max(0.85,prefs.fontScale-0.1);update({fontScale:n});toast(`Schrift ${Math.round(n*100)}%`);}, description:"‚Schrift kleiner'" },
    { patterns:[/^(gehe? zu|öffne) modul 1/,/^modul 1$/], action:()=>{navigate("/modul/1");toast("Modul 1");}, description:"‚Öffne Modul 1'" },
    { patterns:[/^(gehe? zu|öffne) modul 2/,/^modul 2$/], action:()=>{navigate("/modul/2");toast("Modul 2");}, description:"‚Öffne Modul 2'" },
    { patterns:[/^(gehe? zu|öffne) modul 3/,/^modul 3$/], action:()=>{navigate("/modul/3");toast("Modul 3");}, description:"‚Öffne Modul 3'" },
    { patterns:[/^(gehe? zu|öffne) modul 4/,/^modul 4$/], action:()=>{navigate("/modul/4");toast("Modul 4");}, description:"‚Öffne Modul 4'" },
    { patterns:[/^(gehe? zu|öffne) modul 5/,/^modul 5$/], action:()=>{navigate("/modul/5");toast("Modul 5");}, description:"‚Öffne Modul 5'" },
    { patterns:[/^(starte|öffne) quiz/,/^quiz$/], action:()=>{navigate("/quiz");toast("Quiz");}, description:"‚Starte Quiz'" },
    { patterns:[/^(starte|öffne) prüfung/,/^prüfung$/], action:()=>{navigate("/pruefung");toast("Prüfung");}, description:"‚Starte Prüfung'" },
    { patterns:[/^(öffne) lernkarten/,/^lernkarten$/], action:()=>{navigate("/lernkarten");toast("Lernkarten");}, description:"‚Öffne Lernkarten'" },
    { patterns:[/^(öffne) statistiken/,/^statistiken$/], action:()=>{navigate("/statistiken");toast("Statistiken");}, description:"‚Öffne Statistiken'" },
    { patterns:[/^(öffne) audio/,/^audio modus$/], action:()=>{navigate("/audio-modus");toast("Audio-Modus");}, description:"‚Öffne Audio-Modus'" },
    { patterns:[/^(öffne) rechner/,/^rechner$/], action:()=>{navigate("/rechner");toast("Rechner");}, description:"‚Öffne Rechner'" },
    { patterns:[/^(öffne) zertifikate/,/^zertifikate$/], action:()=>{navigate("/zertifikate");toast("Zertifikate");}, description:"‚Öffne Zertifikate'" },
    { patterns:[/^(öffne) pakete/,/^pakete$/], action:()=>{navigate("/pakete");toast("Pakete");}, description:"‚Öffne Pakete'" },
    { patterns:[/^(öffne) hilfe/,/^hilfe$/,/^hilfe$/], action:()=>speak("Verfügbare Befehle: Öffne Modul 1 bis 5. Starte Quiz oder Prüfung. Öffne Lernkarten, Glossar, Dashboard, Statistiken, Audio-Modus, Rechner, Zertifikate, Pakete, Kurse, Förderung. Vorlesen zum Vorlesen der Seite. Stopp zum Anhalten. Schrift größer oder kleiner."), description:"‚Hilfe'" },
  ],[navigate,prefs,update,speak,stopSpeak]);

  const { listening, supported, start, stop } = useVoiceCommands(commands, prefs.voiceCommandsEnabled);

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button role="switch" aria-checked={checked} onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked?"bg-blue-600":"bg-slate-200"}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${checked?"translate-x-6":"translate-x-1"}`}/>
    </button>
  );

  return (
    <>
      {!hideFab && (
        <button onClick={() => setOpen(true)} aria-label="Barrierefreiheit öffnen"
          className="fixed bottom-5 left-5 z-40 h-12 w-12 inline-flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg ring-2 ring-white hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300">
          <Accessibility className="h-5 w-5"/>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Barrierefreiheits-Einstellungen">
          <div className="fixed inset-0 bg-black/40" onClick={()=>setOpen(false)} aria-hidden="true"/>
          <div className="relative z-10 w-full max-w-sm bg-white shadow-xl overflow-y-auto h-full">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Accessibility className="h-5 w-5 text-blue-600"/>
                <h2 className="font-semibold text-slate-900">Barrierefreiheit</h2>
              </div>
              <button onClick={()=>setOpen(false)} aria-label="Schließen" className="rounded-full p-1.5 hover:bg-slate-100">
                <X className="h-5 w-5 text-slate-500"/>
              </button>
            </div>
            <div className="px-5 py-5 space-y-5">

              {/* Schriftgröße */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Type className="h-4 w-4 text-blue-600"/> Schriftgröße
                  </label>
                  <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{Math.round(prefs.fontScale*100)}%</span>
                </div>
                <input type="range" min={0.85} max={1.5} step={0.05} value={prefs.fontScale}
                  onChange={e=>update({fontScale:parseFloat(e.target.value)})}
                  className="w-full accent-blue-600" aria-label="Schriftgröße"/>
              </div>

              {/* Kontrast */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Kontrast</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["default","high","dark"] as ContrastMode[]).map(c=>(
                    <button key={c} onClick={()=>update({contrast:c})} aria-pressed={prefs.contrast===c}
                      className={`rounded-lg border py-2 text-xs font-medium transition-colors ${prefs.contrast===c?"border-blue-500 bg-blue-50 text-blue-700":"border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                      {c==="default"?"Standard":c==="high"?"Hoher Kontrast":"Dunkel"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dyslexie */}
              <div className="flex items-center justify-between py-2 border-y border-slate-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600"/>
                  <div>
                    <div className="text-sm font-medium text-slate-700">Lese-freundliche Schrift</div>
                    <div className="text-xs text-slate-400">Erhöhter Buchstabenabstand</div>
                  </div>
                </div>
                <Toggle checked={prefs.dyslexiaFont} onChange={()=>update({dyslexiaFont:!prefs.dyslexiaFont})}/>
              </div>

              {/* Reduce Motion */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-blue-600"/>
                  <div>
                    <div className="text-sm font-medium text-slate-700">Bewegung reduzieren</div>
                    <div className="text-xs text-slate-400">Animationen abschalten</div>
                  </div>
                </div>
                <Toggle checked={prefs.reduceMotion} onChange={()=>update({reduceMotion:!prefs.reduceMotion})}/>
              </div>

              {/* Sprachsteuerung */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {listening ? <Mic className="h-4 w-4 text-green-500 animate-pulse"/> : <MicOff className="h-4 w-4 text-slate-400"/>}
                    <div>
                      <div className="text-sm font-medium text-slate-700">Sprachsteuerung</div>
                      <div className="text-xs text-slate-400">{supported?"Navigation per Stimme (Deutsch)":"Nicht verfügbar"}</div>
                    </div>
                  </div>
                  <Toggle checked={prefs.voiceCommandsEnabled&&listening} onChange={()=>{
                    const next=!prefs.voiceCommandsEnabled; update({voiceCommandsEnabled:next});
                    if(next){start();speak("Sprachsteuerung aktiviert. Sagen Sie Hilfe für Befehle.");}else{stop();stopSpeak();}
                  }}/>
                </div>
                {supported && (
                  <details className="text-xs">
                    <summary className="cursor-pointer text-slate-500 hover:text-slate-700">Befehle anzeigen</summary>
                    <ul className="mt-2 space-y-1 text-slate-400">{commands.map((c,i)=><li key={i}>• {c.description}</li>)}</ul>
                  </details>
                )}
              </div>

              <button onClick={reset} className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                <RotateCcw className="h-3.5 w-3.5"/> Zurücksetzen
              </button>
              <p className="text-[11px] text-slate-400 border-t border-slate-100 pt-4 leading-relaxed">
                WCAG 2.2 Level AA · BFSG · Sprach- und Vorlese-Funktionen laufen lokal im Browser.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
