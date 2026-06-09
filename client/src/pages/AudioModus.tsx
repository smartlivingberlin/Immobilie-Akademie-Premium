import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { Headphones, Play, Pause, SkipForward, SkipBack, Square, ArrowLeft, Gauge, BookOpen, Eye } from "lucide-react";
import { useSpeech } from "../hooks/use-speech";
import { useA11yPrefs } from "@/hooks/use-a11y-prefs";
import { ComfortBar } from "@/components/ComfortBar";

type Lesson = {
  id: string;
  title: string;
  moduleId: number;
  dayNumber: number;
  content: string;
  paragraphs?: string[];
  readAloudText?: string;
  source?: string;
};

const MODULE_NAMES: Record<number, string> = {
  1: "Grundkurs",
  2: "Makler §34c",
  3: "WEG-Verwalter",
  4: "Gutachter",
  5: "§34i Darlehensvermittler",
};

const DEMO_LESSONS: Lesson[] = [
  {
    id: "demo-1",
    title: "Demo: Einführung Immobilienrecht",
    moduleId: 1,
    dayNumber: 1,
    content: "Immobilienrecht bildet die Grundlage jeder Tätigkeit in der Immobilienwirtschaft. Gemäß §94 BGB gehören zum Grundstück alle mit dem Grund und Boden fest verbundenen Sachen, insbesondere Gebäude.",
    readAloudText: "Demo: Einführung Immobilienrecht. Immobilienrecht bildet die Grundlage jeder Tätigkeit in der Immobilienwirtschaft. Gemäß §94 BGB gehören zum Grundstück alle mit dem Grund und Boden fest verbundenen Sachen, insbesondere Gebäude.",
  },
];

function lessonSpeechText(lesson: Lesson): string {
  return lesson.readAloudText || `${lesson.title}. ${lesson.content}`;
}

function lessonParagraphs(lesson: Lesson): string[] {
  if (lesson.paragraphs?.length) return lesson.paragraphs;
  return lesson.content.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

export default function AudioModus() {
  const { prefs } = useA11yPrefs();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [rate, setRate] = useState(1);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const {
    speak, pause, resume, stop, state, supported, setRate: setRateGlobal,
    activeChunkIndex, speechChunks,
  } = useSpeech();

  useEffect(() => {
    fetch("/api/learning/audio-lessons" + (selectedModule ? `?moduleId=${selectedModule}` : ""), {
      credentials: "include",
    })
      .then(r => r.json())
      .then(data => {
        setLessons(Array.isArray(data) && data.length > 0 ? data : DEMO_LESSONS);
        setActiveIdx(0);
        setLoading(false);
      })
      .catch(() => {
        setLessons(DEMO_LESSONS);
        setLoading(false);
      });
  }, [selectedModule]);

  const current = lessons[activeIdx];

  const playLesson = (idx: number) => {
    stop();
    setActiveIdx(idx);
    setTimeout(() => {
      if (lessons[idx]) speak(lessonSpeechText(lessons[idx]));
    }, 100);
  };

  const handlePlay = () => {
    if (!current) return;
    const text = lessonSpeechText(current);
    if (state === "idle") speak(text);
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

  useEffect(() => {
    if (activeChunkIndex < 0 || !transcriptRef.current) return;
    const el = transcriptRef.current.querySelector(`[data-chunk="${activeChunkIndex}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeChunkIndex]);

  const displayParagraphs = useMemo(
    () => (current ? lessonParagraphs(current) : []),
    [current],
  );

  const showChunks = useMemo(() => {
    if (!current) return [];
    if (speechChunks.length > 0 && (state === "playing" || state === "paused")) {
      return speechChunks;
    }
    return displayParagraphs;
  }, [current, speechChunks, state, displayParagraphs]);

  if (!supported) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <Headphones className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">Audio-Modus nicht verfügbar</h2>
          <p className="text-muted-foreground text-sm">Ihr Browser unterstützt keine Sprachausgabe. Bitte nutzen Sie Chrome oder Edge.</p>
          <Link href="/statistiken"><a className="mt-6 inline-block text-primary text-sm hover:underline">← Zurück zum Dashboard</a></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/statistiken">
              <a className="rounded-lg p-1.5 hover:bg-muted transition-colors" aria-label="Zurück">
                <ArrowLeft className="h-5 w-5 text-muted-foreground" />
              </a>
            </Link>
            <div className="flex items-center gap-2">
              <Headphones className="h-5 w-5 text-primary" />
              <span className="font-display font-semibold text-foreground">Audio-Modus</span>
              <span className="hidden sm:inline text-xs text-muted-foreground">· Audio-Visual</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ComfortBar compact />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{lessons.length} Lektionen</span>
              {current && <span>· Modul {current.moduleId}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-wrap gap-2 mb-6">
          <button type="button" onClick={() => setSelectedModule(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!selectedModule ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            Alle Module
          </button>
          {[1, 2, 3, 4, 5].map(m => (
            <button key={m} type="button" onClick={() => setSelectedModule(m)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedModule === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {MODULE_NAMES[m]}
            </button>
          ))}
        </div>

        {current && (
          <>
            <div className="rounded-2xl gradient-hero text-white p-6 md:p-8 mb-6 shadow-elegant">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white/60 uppercase tracking-widest mb-1">
                    Modul {current.moduleId} · {MODULE_NAMES[current.moduleId]} · Tag {current.dayNumber}
                    {current.source === "module_day" && " · Lerntag-Original"}
                  </div>
                  <h2 className="font-display font-semibold text-xl text-white leading-tight">{current.title}</h2>
                </div>
                <div className="text-xs text-white/50">{activeIdx + 1} / {lessons.length}</div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6">
                <button type="button" onClick={prev} disabled={activeIdx === 0}
                  className="rounded-full p-2.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-colors" aria-label="Zurück">
                  <SkipBack className="h-5 w-5" />
                </button>
                <button type="button" onClick={handlePlay}
                  className="rounded-full p-4 bg-white text-primary hover:scale-105 transition-transform shadow-glow" aria-label={state === "playing" ? "Pause" : "Abspielen"}>
                  {state === "playing" ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>
                {state !== "idle" && (
                  <button type="button" onClick={stop} className="rounded-full p-2.5 bg-white/10 hover:bg-white/20 transition-colors" aria-label="Stopp">
                    <Square className="h-5 w-5" />
                  </button>
                )}
                <button type="button" onClick={next} disabled={activeIdx === lessons.length - 1}
                  className="rounded-full p-2.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-colors" aria-label="Weiter">
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <Gauge className="h-4 w-4 text-white/60 flex-shrink-0" />
                <input type="range" min={0.6} max={1.8} step={0.1} value={rate}
                  onChange={e => handleRate(parseFloat(e.target.value))}
                  className="flex-1 accent-white" aria-label="Vorlesegeschwindigkeit" />
                <span className="text-xs text-white/70 min-w-[35px]">{rate.toFixed(1)}x</span>
              </div>
            </div>

            {/* Audio-Visual: vollständiger Vorlesetext, 1:1 mit Sprachausgabe */}
            <section className="mb-8 rounded-2xl border border-border bg-card shadow-soft overflow-hidden" aria-labelledby="transcript-heading">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-muted/40">
                <Eye className="h-4 w-4 text-primary" />
                <h3 id="transcript-heading" className="font-display font-semibold text-foreground text-sm">
                  Vorlesetext — wortgleich zur Sprachausgabe
                </h3>
              </div>
              <div
                ref={transcriptRef}
                className="px-5 py-5 max-h-[min(55vh,520px)] overflow-y-auto"
                style={{
                  fontSize: `calc(1rem * ${prefs.fontScale})`,
                  lineHeight: prefs.lineSpacing,
                }}
              >
                <p
                  className="text-muted-foreground mb-4"
                  style={{ fontSize: "0.8125rem" }}
                >
                  {state === "idle"
                    ? "Strukturierter Lerntext — Absätze zum Mitlesen und Lernen. Beim Abspielen wird der aktuelle Satz markiert."
                    : "Markierter Absatz = wird gerade vorgelesen. § wird als „Paragraph“ ausgesprochen."}
                </p>
                <div className="space-y-4 text-foreground">
                  {showChunks.map((chunk, i) => (
                    <p
                      key={`${current.id}-chunk-${i}`}
                      data-chunk={i}
                      className={`rounded-lg px-3 py-2.5 transition-colors leading-relaxed ${
                        activeChunkIndex === i && state !== "idle"
                          ? "bg-primary/15 border-l-4 border-primary font-medium"
                          : "bg-muted/20"
                      }`}
                    >
                      {chunk.trim()}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        <div className="space-y-2">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" /> Playlist
          </h3>
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            lessons.map((lesson, idx) => (
              <button key={lesson.id} type="button" onClick={() => playLesson(idx)}
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
                      Modul {lesson.moduleId} · Tag {lesson.dayNumber}
                      {lesson.source === "module_day" ? " · Originaltext" : ""}
                    </div>
                  </div>
                  {activeIdx === idx && state === "playing" && (
                    <div className="flex gap-0.5 items-end h-4" aria-hidden>
                      {[1, 2, 3].map(b => (
                        <div key={b} className="w-1 bg-primary rounded-full animate-bounce"
                          style={{ height: `${[12, 16, 10][b - 1]}px`, animationDelay: `${b * 0.1}s` }} />
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
