import { useCallback, useEffect, useRef, useState } from "react";
export type Command = { patterns: RegExp[]; action: (m: RegExpMatchArray) => void; description: string; };
export function useVoiceCommands(commands: Command[], enabled: boolean) {
  const [listening,setListening]=useState(false);
  const [supported,setSupported]=useState(false);
  const [lastTranscript,setLastTranscript]=useState("");
  const recRef=useRef<any>(null);
  const commandsRef=useRef(commands);
  const listeningRef=useRef(listening);
  useEffect(()=>{ commandsRef.current=commands; },[commands]);
  useEffect(()=>{ listeningRef.current=listening; },[listening]);
  useEffect(()=>{
    const SR=(window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;
    if(!SR) return; setSupported(true);
    const rec=new SR(); rec.lang="de-DE"; rec.continuous=true; rec.interimResults=false;
    rec.onresult=(e:any)=>{ const last=e.results[e.results.length-1]; if(!last.isFinal) return; const t=String(last[0].transcript).toLowerCase().trim(); setLastTranscript(t); for(const cmd of commandsRef.current) for(const pat of cmd.patterns){const m=t.match(pat);if(m){cmd.action(m);return;}} };
    rec.onend=()=>{ if(recRef.current&&listeningRef.current){try{rec.start();}catch{}}else setListening(false); };
    rec.onerror=()=>setListening(false);
    recRef.current=rec;
    return ()=>{ try{rec.stop();}catch{} recRef.current=null; };
  },[]);
  const start=useCallback(()=>{ if(!recRef.current) return; try{recRef.current.start();setListening(true);}catch{} },[]);
  const stop=useCallback(()=>{ if(!recRef.current) return; try{recRef.current.stop();}catch{} setListening(false); },[]);
  useEffect(()=>{ if(!enabled) stop(); },[enabled,stop]);
  return { listening, supported, start, stop, lastTranscript };
}
