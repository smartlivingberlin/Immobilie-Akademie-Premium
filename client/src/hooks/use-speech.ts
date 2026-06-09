import { useCallback, useEffect, useRef, useState } from "react";
export type SpeechState = "idle" | "playing" | "paused";
const STORAGE_KEY = "immo:tts-prefs";
type Prefs = { rate: number; voiceURI: string | null; pitch: number };
function loadPrefs(): Prefs {
  try { return { rate:1, voiceURI:null, pitch:1, ...JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}") }; }
  catch { return { rate:1, voiceURI:null, pitch:1 }; }
}
function savePrefs(p: Prefs) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {} }
const ABBREV_DOT = "\uE000";

/** Schützt gängige Abkürzungen vor falscher Satztrennung (z. B. „z.B.“ → nicht bei „z.“ splitten). */
function protectAbbreviations(text: string): string {
  return text
    .replace(/z\.\s*B\./gi, `z${ABBREV_DOT}B${ABBREV_DOT}`)
    .replace(/\b([uU]\.\s*[aA])\./g, `$1${ABBREV_DOT}`)
    .replace(/\b([dD]\.\s*[hH])\./g, `$1${ABBREV_DOT}`)
    .replace(/\b([vV]\.\s*[aA])\./g, `$1${ABBREV_DOT}`)
    .replace(/\b([iI]\.\s*[dD]\.\s*[rR])\./g, `$1${ABBREV_DOT}`)
    .replace(/\b(bzw|usw|etc|ca|Abs|Nr|ggf|evtl|inkl|zzgl|bspw)\./gi, (m) => m.replace(".", ABBREV_DOT));
}

function restoreAbbreviations(text: string): string {
  return text.replaceAll(ABBREV_DOT, ".");
}

export function splitSpeechChunks(text: string): string[] {
  const cleaned = protectAbbreviations(preparePronunciation(text));
  const raw = cleaned.match(/[^.!?]+[.!?]+|\S[\s\S]*$/g) ?? [cleaned];
  return raw.map(restoreAbbreviations).map((s) => s.trim()).filter(Boolean);
}

export function preparePronunciation(text: string): string {
  let t = text;
  t = t.replace(/```[\s\S]*?```/g," "); t = t.replace(/[#>*_`~|]/g," ");
  t = t.replace(/§\s?(\d+)\s?([a-zA-Z])\b/g,(_m,n,l)=>`Paragraph ${n} ${l.toLowerCase()}`);
  t = t.replace(/§\s?(\d+)/g,"Paragraph $1");
  const a:Record<string,string>={WEG:"Weh-Eh-Geh",IHK:"I-Hah-Kah",BGB:"Beh-Geh-Beh",GewO:"Gewerbeordnung",KfW:"Kah-Eff-Veh",KI:"Kah-I"};
  for(const[k,v] of Object.entries(a)) t=t.replace(new RegExp(`\\b${k}\\b`,"g"),v);
  return t.replace(/\s+/g," ").trim();
}
export function useSpeech() {
  const [state,setState]=useState<SpeechState>("idle");
  const [voices,setVoices]=useState<SpeechSynthesisVoice[]>([]);
  const [supported,setSupported]=useState(false);
  const [activeChunkIndex,setActiveChunkIndex]=useState(-1);
  const [speechChunks,setSpeechChunks]=useState<string[]>([]);
  const prefsRef=useRef<Prefs>(loadPrefs());
  useEffect(()=>{
    if(!("speechSynthesis" in window)) return;
    setSupported(true);
    const load=()=>{ const all=window.speechSynthesis.getVoices(); const de=all.filter(v=>v.lang.startsWith("de")); setVoices(de.length>0?de:all); };
    load(); window.speechSynthesis.onvoiceschanged=load;
    return ()=>{ window.speechSynthesis.cancel(); };
  },[]);
  const speak=useCallback((text:string)=>{
    if(!supported||!text) return;
    const synth=window.speechSynthesis; synth.cancel();
    const chunks=splitSpeechChunks(text);
    setSpeechChunks(chunks);
    setActiveChunkIndex(chunks.length > 0 ? 0 : -1);
    const prefs=prefsRef.current;
    const voice=voices.find(v=>v.voiceURI===prefs.voiceURI)??voices.find(v=>v.lang.startsWith("de"));
    let i=0;
    const next=()=>{
      if(i>=chunks.length){ setState("idle"); setActiveChunkIndex(-1); return; }
      setActiveChunkIndex(i);
      const u=new SpeechSynthesisUtterance(chunks[i]!);
      u.lang="de-DE";
      if(voice) u.voice=voice;
      u.rate=prefs.rate;
      u.pitch=prefs.pitch;
      u.onend=()=>{ i++; next(); };
      u.onerror=()=>{ setState("idle"); setActiveChunkIndex(-1); };
      synth.speak(u);
    };
    setState("playing");
    next();
  },[voices,supported]);
  const pause=useCallback(()=>{ window.speechSynthesis.pause(); setState("paused"); },[]);
  const resume=useCallback(()=>{ window.speechSynthesis.resume(); setState("playing"); },[]);
  const stop=useCallback(()=>{ window.speechSynthesis.cancel(); setState("idle"); setActiveChunkIndex(-1); setSpeechChunks([]); },[]);
  const setRate=useCallback((rate:number)=>{ prefsRef.current={...prefsRef.current,rate}; savePrefs(prefsRef.current); },[]);
  const setVoice=useCallback((voiceURI:string|null)=>{ prefsRef.current={...prefsRef.current,voiceURI}; savePrefs(prefsRef.current); },[]);
  return { state, supported, voices, speak, pause, resume, stop, setRate, setVoice, prefs:prefsRef.current, activeChunkIndex, speechChunks };
}
