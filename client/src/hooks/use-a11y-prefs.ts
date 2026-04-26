import { useCallback, useEffect, useState } from "react";
export type ContrastMode = "default"|"high"|"dark";
export type A11yPrefs = { fontScale:number; contrast:ContrastMode; dyslexiaFont:boolean; reduceMotion:boolean; voiceCommandsEnabled:boolean; };
const DEFAULTS:A11yPrefs = { fontScale:1, contrast:"default", dyslexiaFont:false, reduceMotion:false, voiceCommandsEnabled:false };
const KEY="immo:a11y-prefs";
function load():A11yPrefs { try{return{...DEFAULTS,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return DEFAULTS} }
function apply(p:A11yPrefs) { const h=document.documentElement; h.style.setProperty("--a11y-font-scale",String(p.fontScale)); h.dataset.contrast=p.contrast; h.dataset.dyslexia=p.dyslexiaFont?"on":"off"; h.dataset.reduceMotion=p.reduceMotion?"on":"off"; if(p.contrast==="dark") h.classList.add("dark"); else if(p.contrast!=="high") h.classList.remove("dark"); }
export function useA11yPrefs() {
  const [prefs,setPrefs]=useState<A11yPrefs>(DEFAULTS);
  useEffect(()=>{ const p=load(); setPrefs(p); apply(p); },[]);
  const update=useCallback((patch:Partial<A11yPrefs>)=>{ setPrefs(prev=>{ const next={...prev,...patch}; try{localStorage.setItem(KEY,JSON.stringify(next))}catch{} apply(next); return next; }); },[]);
  const reset=useCallback(()=>{ setPrefs(DEFAULTS); try{localStorage.removeItem(KEY)}catch{} apply(DEFAULTS); },[]);
  return { prefs, update, reset };
}
