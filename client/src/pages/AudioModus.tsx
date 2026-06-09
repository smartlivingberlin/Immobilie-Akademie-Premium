import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Headphones, Play, Pause, SkipForward, SkipBack, Square, ArrowLeft, Gauge, BookOpen } from "lucide-react";
import { useSpeech, preparePronunciation } from "../hooks/use-speech";
import { ReadAloudButton } from "../components/ReadAloudButton";
import { ComfortBar } from "@/components/ComfortBar";

type Lesson = {
  id: string;
  title: string;
  moduleId: number;
  dayNumber: number;
  content: string;
};

const MODULE_NAMES: Record<number, string> = {
  1: "Grundkurs",
  2: "Makler §34c",
  3: "WEG-Verwalter",
  4: "Gutachter",
  5: "§34i Darlehensvermittler",
};

export default function AudioModus() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [rate, setRate] = useState(1);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const { speak, pause, resume, stop, state, supported, setRate: setRateGlobal } = useSpeech();

  useEffect(() => {
    // Lerntage aus eigenem Backend laden
    fetch("/api/learning/audio-lessons" + (selectedModule ? `?moduleId=${selectedModule}` : ""), {
      credentials: "include",
    })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setLessons(data);
        } else {
          // Fallback: Demo-Lektionen
          setLessons([
            { id:"1", title:"Tag 1: Einführung Immobilienrecht", moduleId:1, dayNumber:1, content:"Immobilienrecht bildet die Grundlage jeder Tätigkeit in der Immobilienwirtschaft. Gemäß §94 BGB gehören zum Grundstück alle mit dem Grund und Boden fest verbundenen Sachen..." },
            { id:"2", title:"Tag 2: Das Grundbuch", moduleId:1, dayNumber:2, content:"Das Grundbuch ist das amtliche Register für Grundstücke. Es wird beim Amtsgericht geführt. Jedes Grundstück hat ein eigenes Grundbuchblatt mit drei Abteilungen..." },
            { id:"3", title:"Tag 3: §34c GewO Grundlagen", moduleId:2, dayNumber:1, content:"Für die gewerbsmäßige Vermittlung von Grundstücken und Gebäuden ist gemäß §34c GewO eine behördliche Erlaubnis erforderlich. Voraussetzungen sind Zuverlässigkeit und geordnete Vermögensverhältnisse..." },
          ]);
        }
        setLoading(false);
      })
      .catch(() => {
        setLessons([
          { id:"1", title:"Tag 1: Einführung Immobilienrecht", moduleId:1, dayNumber:1, content:"Immobilienrecht bildet die Grundlage jeder Tätigkeit in der Immobilienwirtschaft. Gemäß §94 BGB gehören zum Grundstück alle mit dem Grund und Boden fest verbundenen Sachen, insbesondere Gebäude, sowie die Erzeugnisse des Grundstücks, solange sie mit dem Boden zusammenhängen." },
          { id:"2", title:"Tag 2: Das Grundbuch verstehen", moduleId:1, dayNumber:2, content:"Das Grundbuch ist das amtliche Register für Grundstücke und wird beim Amtsgericht geführt. Es enthält in drei Abteilungen: Erstens den Eigentümer, zweitens Lasten und Beschränkungen wie Grunddienstbarkeiten, drittens Grundpfandrechte wie Hypotheken und Grundschulden." },
          { id:"3", title:"Tag 3: §34c GewO — Die Maklererlaubnis", moduleId:2, dayNumber:1, content:"Paragraph 34c der Gewerbeordnung regelt die Erlaubnispflicht für Immobilienmakler. Wer gewerbsmäßig Grundstücke, Wohnräume oder gewerbliche Räume vermitteln möchte, benötigt eine Erlaubnis der zuständigen Behörde. Voraussetzungen sind persönliche Zuverlässigkeit und geordnete Vermögensverhältnisse." },
        ]);
        setLoading(false);
      });
  }, [selectedModule]);

  const current = lessons[activeIdx];

  const playLesson = (idx: number) => {
    stop();
    setActiveIdx(idx);
    setTimeout(() => {
      if (lessons[idx]) {
        speak(preparePronunciation(lessons[idx].title + ". " + lessons[idx].content));
      }
    }, 100);
  };

  const handlePlay = () => {
    if (!current) return;
    if (state === "idle") speak(preparePronunciation(current.title + ". " + current.content));
    else if (state === "playing") pause();
    else resume();
  };

  const next = () => {
    if (activeIdx < lessons.length - 1) playLesson(activeIdx + 1);
  };

  const prev = () => {
    if (activeIdx > 0) playLesson(activeIdx - 1);
  };

  const handleRate = (v: number) => {
    setRate(v);
    setRateGlobal(v);
  };

  if (!supported) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <Headphones className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">Audio-Modus nicht verfügbar</h2>
          <p className="text-muted-foreground text-sm">Ihr Browser unterstützt keine Sprachausgabe. Bitte nutzen Sie Chrome oder Edge.</p>
          <Link href="/statistiken"><a className="mt-6 inline-block text-primary text-sm hover:underline">← Zurück zum Lernbereich</a></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/statistiken">
              <a className="rounded-lg p-1.5 hover:bg-muted transition-colors" aria-label="Zurück zum Lernbereich">
                <ArrowLeft className="h-5 w-5 text-muted-foreground" />
              </a>
            </Link>
            <div className="flex items-center gap-2">
              <Headphones className="h-5 w-5 text-primary" />
              <span className="font-display font-semibold text-foreground">Audio-Modus</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ComfortBar compact />
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span>{lessons.length} Lektionen</span>
              {current && <span>· Modul {current.moduleId}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Modul-Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setSelectedModule(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!selectedModule ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            Alle Module
          </button>
          {[1,2,3,4,5].map(m => (
            <button key={m} onClick={() => setSelectedModule(m)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedModule === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {MODULE_NAMES[m]}
            </button>
          ))}
        </div>

        {/* Player */}
        {current && (
          <div className="rounded-2xl gradient-hero text-white p-6 md:p-8 mb-8 shadow-elegant">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white/60 uppercase tracking-widest mb-1">
                  Modul {current.moduleId} · {MODULE_NAMES[current.moduleId]} · Tag {current.dayNumber}
                </div>
                <h2 className="font-display font-semibold text-xl text-white leading-tight">{current.title}</h2>
              </div>
              <div className="text-xs text-white/50">{activeIdx + 1} / {lessons.length}</div>
            </div>

            {/* Inhalt-Vorschau */}
            <p className="text-sm text-white/70 leading-relaxed mb-6 line-clamp-3">
              {current.content.slice(0, 200)}...
            </p>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button onClick={prev} disabled={activeIdx === 0}
                className="rounded-full p-2.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-colors">
                <SkipBack className="h-5 w-5" />
              </button>
              <button onClick={handlePlay}
                className="rounded-full p-4 bg-white text-primary hover:scale-105 transition-transform shadow-glow">
                {state === "playing" ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              {state !== "idle" && (
                <button onClick={stop} className="rounded-full p-2.5 bg-white/10 hover:bg-white/20 transition-colors">
                  <Square className="h-5 w-5" />
                </button>
              )}
              <button onClick={next} disabled={activeIdx === lessons.length - 1}
                className="rounded-full p-2.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-colors">
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            {/* Geschwindigkeit */}
            <div className="flex items-center gap-3">
              <Gauge className="h-4 w-4 text-white/60 flex-shrink-0" />
              <input type="range" min={0.6} max={1.8} step={0.1} value={rate}
                onChange={e => handleRate(parseFloat(e.target.value))}
                className="flex-1 accent-white" />
              <span className="text-xs text-white/70 min-w-[35px]">{rate.toFixed(1)}x</span>
            </div>
          </div>
        )}

        {/* Playlist */}
        <div className="space-y-2">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" /> Playlist
          </h3>
          {loading ? (
            <div className="space-y-2">
              {[1,2,3].map(i => (
                <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            lessons.map((lesson, idx) => (
              <button key={lesson.id} onClick={() => playLesson(idx)}
                className={`w-full text-left rounded-xl border p-4 transition-all ${
                  activeIdx === idx
                    ? "border-primary bg-primary/5 shadow-soft"
                    : "border-border bg-card hover:border-primary/30 hover:shadow-soft"
                }`}>
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-semibold ${
                    activeIdx === idx ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {activeIdx === idx && state === "playing" ? "▶" : idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-foreground truncate">{lesson.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Modul {lesson.moduleId} · {MODULE_NAMES[lesson.moduleId]}
                    </div>
                  </div>
                  {activeIdx === idx && state === "playing" && (
                    <div className="flex gap-0.5 items-end h-4">
                      {[1,2,3].map(b => (
                        <div key={b} className="w-1 bg-primary rounded-full animate-bounce"
                          style={{height:`${[12,16,10][b-1]}px`,animationDelay:`${b*0.1}s`}} />
                      ))}
                    </div>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
