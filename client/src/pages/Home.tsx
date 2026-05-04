import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { useSocialProof } from "@/hooks/useSocialProof";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, BookOpenCheck, Bot, Sparkles, ShieldCheck,
  Clock, Award, GraduationCap, Users, CheckCircle2, Star,
  TrendingUp, Zap, Building2, Play, Mic
} from "lucide-react";

const MODULES = [
  { id:1, title:"Modul 1: Immobilien-Grundkurs", kurz:"Das Fundament", preis:"149", tage:20, ue:160, slug:"modul-1-immobilien-grundkurs", desc:"Grundstücksrecht, Grundbuch, Baurecht, Wertermittlung — die Pflichtbasis für alle weiteren Module.", badge:"Einstieg", farbe:"#1d4ed8", textFarbe:"white" },
  { id:2, title:"Modul 2: Makler §34c GewO", kurz:"Die Lizenz", preis:"499", tage:60, ue:480, slug:"modul-2-makler-34c", desc:"Maklerrecht, Provision, Exposé, Kaufvertrag, GwG, MaBV — alles für die IHK-Sachkundeprüfung.", badge:"Beliebt", farbe:"#6d28d9", textFarbe:"white" },
  { id:3, title:"Modul 3: WEG-Verwalter", kurz:"Die Verwaltung", preis:"699", tage:80, ue:640, slug:"modul-3-weg-verwalter", desc:"WEG-Reform 2020, Eigentümerversammlung, Nebenkostenabrechnung, Mietrecht §535ff BGB.", badge:"Vollständig", farbe:"#047857", textFarbe:"white" },
  { id:4, title:"Modul 4: Gutachter", kurz:"Die Bewertung", preis:"399", tage:40, ue:320, slug:"modul-4-gutachter", desc:"ImmoWertV 2021: Vergleichs-, Ertrags- und Sachwertverfahren. HypZert-Vorbereitung.", badge:"Präzise", farbe:"#b45309", textFarbe:"white" },
  { id:5, title:"Modul 5: §34i GewO", kurz:"Die Finanzierung", preis:"499", tage:40, ue:320, slug:"modul-5-34i-darlehensvermittler", desc:"Annuitätendarlehen, KfW-Förderung, EU-WIKR, ESIS-Merkblatt — Ihre Finanzierungslizenz.", badge:"Komplett", farbe:"#9d174d", textFarbe:"white" },
];

const STATS = [
  { n:855, suffix:"+", label:"IHK-Prüfungsfragen", sub:"geprüft & aktuell" },
  { n:240, suffix:"", label:"Strukturierte Lerntage", sub:"5 vollständige Module" },
  { n:3, suffix:"", label:"KI-Modelle", sub:"Claude · Gemini · Groq" },
  { n:24, suffix:"/7", label:"Tutor verfügbar", sub:"keine Wartezeiten" },
];

const FEATURES = [
  { icon:Bot, title:"KI-Tutor mit Sokrates-Modus", desc:"Erklärt Paragraphen in Klartext, stellt Rückfragen, verweist auf Quellen. Claude + Gemini + Groq." },
  { icon:BookOpenCheck, title:"Echte Gesetzesquellen", desc:"Jede fachliche Aussage verlinkt auf gesetze-im-internet.de und IHK-Quellen." },
  { icon:Clock, title:"240 strukturierte Lerntage", desc:"5 Tabs pro Tag: Theorie, Normen, Analyse, Aufgaben, Videos. Lernfortschritt serverseitig." },
  { icon:Award, title:"Offizielle Zertifikate", desc:"PDF-Zertifikate nach bestandener Prüfung. Ab 70% Punktzahl. IHK-konformes Format." },
  { icon:GraduationCap, title:"Adaptiver Lernpfad", desc:"Schwächenanalyse via Spaced Repetition. Die Plattform passt sich Ihrem Tempo an." },
  { icon:ShieldCheck, title:"DSGVO & rechtssicher", desc:"Alle Inhalte juristisch geprüft. WCAG 2.2 AA. Barrierefreiheit inklusive." },
];

// Animierter Zaehler-Hook
function useCountUp(target: number, duration: number = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

function AnimatedStat({ n, suffix, label, sub }: { n:number; suffix:string; label:string; sub:string }) {
  const { count, ref } = useCountUp(n);
  return (
    <div ref={ref} className="text-center rounded-2xl bg-background border border-border p-6 shadow-soft">
      <div className="font-display text-4xl font-semibold text-primary mb-1">
        {count}{suffix}
      </div>
      <div className="font-medium text-foreground text-sm">{label}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
    </div>
  );
}

export default function Home() {
  const socialProof = useSocialProof();
  const [audioPlaying, setAudioPlaying] = useState(false);

  const handleAudioPreview = () => {
    if (audioPlaying) {
      window.speechSynthesis.cancel();
      setAudioPlaying(false);
      return;
    }
    const text = "Willkommen bei der Immobilien Akademie Smart. Hier bereiten Sie sich gezielt auf Ihre IHK-Sachkundeprüfung vor. Mit unserem KI-Tutor, 855 Prüfungsfragen und 240 strukturierten Lerntagen sind Sie optimal vorbereitet. Starten Sie jetzt kostenlos mit Modul 1.";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const deVoice = voices.find(v => v.lang.startsWith("de"));
    if (deVoice) utterance.voice = deVoice;
    utterance.onend = () => setAudioPlaying(false);
    setAudioPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <SEO
        title="Immobilien Akademie Smart — IHK §34c §34i WEG-Verwalter"
        description="Online-Vorbereitung für IHK-Sachkundeprüfungen. §34c Makler, §34i, WEG-Verwalter, Gutachter. 855+ Prüfungsfragen, KI-Tutor, 240 Lerntage. Ab 149€."
        keywords="§34c GewO, §34i GewO, WEG Verwalter, Immobilienmakler IHK, Sachkundeprüfung"
      />

      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{backgroundImage:"radial-gradient(circle at 25% 30%, oklch(0.62 0.13 195/0.4), transparent 50%), radial-gradient(circle at 75% 70%, oklch(0.78 0.15 75/0.25), transparent 50%)"}} />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur mb-6">
              <Sparkles className="h-3.5 w-3.5" style={{color:"oklch(0.78 0.15 75)"}} />
              IHK-konforme Online-Vorbereitung · Deutschland
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-6">
              Ihre IHK-Lizenz für die{" "}
              <span style={{color:"oklch(0.78 0.15 75)"}}>Immobilienwirtschaft</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed mb-8">
              §34c Makler · §34i Darlehensvermittler · WEG-Verwalter · Gutachter —
              alle 5 Berufsbilder in einem Portal. Mit KI-Tutor, 855+ Prüfungsfragen
              und 240 strukturierten Lerntagen.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/kurs/modul-1-immobilien-grundkurs">
                <a className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-sm shadow-glow transition-all hover:scale-105"
                  style={{background:"oklch(0.78 0.15 75)",color:"oklch(0.22 0.05 60)"}}>
                  24h kostenlos testen <ArrowRight className="h-4 w-4" />
                </a>
              </Link>
              <Link href="/kurse">
                <a className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-sm text-white hover:bg-white/20 transition-all">
                  Alle Module ansehen
                </a>
              </Link>
              <button
                onClick={handleAudioPreview}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white/70 hover:bg-white/10 transition-all"
              >
                {audioPlaying ? "⏹ Stop" : <><Mic className="h-4 w-4" /> Hören</>}
              </button>
            </div>
            {socialProof && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <span className="text-sm text-white/70">
                  {socialProof.activeUsers}+ aktive Lernende · {socialProof.certsThisWeek} Zertifikate diese Woche
                </span>
              </div>
            )}
            <div className="flex flex-wrap gap-5">
              {["IHK-Prüfungsformat","KI-Tutor 24/7","Sofortiger Zugang","DSGVO-konform"].map(t=>(
                <span key={t} className="flex items-center gap-1.5 text-sm text-white/70">
                  <CheckCircle2 className="h-4 w-4" style={{color:"oklch(0.78 0.15 75)"}} />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-background py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {icon:ShieldCheck, label:"DSGVO", sub:"konform"},
              {icon:Award, label:"IHK-orientiert", sub:"geprüfte Inhalte"},
              {icon:GraduationCap, label:"AZAV", sub:"Zertifizierung geplant"},
              {icon:Users, label:"5 Berufsbilder", sub:"ein Portal"},
            ].map((t,i)=>(
              <div key={i} className="flex items-center justify-center gap-3">
                <t.icon className="h-7 w-7 text-primary" />
                <div className="text-left">
                  <div className="font-display font-semibold leading-none text-foreground">{t.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS — animiert */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s,i)=>(
              <AnimatedStat key={i} n={s.n} suffix={s.suffix} label={s.label} sub={s.sub} />
            ))}
          </div>
        </div>
      </section>

      {/* MODULE */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">5 Berufsbilder</div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Ihr Weg zur Immobilienkarriere
            </h2>
            <p className="mt-4 text-muted-foreground">Jedes Modul einzeln buchbar oder als Komplett-Paket. Sofortiger Zugang nach Zahlung.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map(m=>(
              <div key={m.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant transition-all hover:-translate-y-1 flex flex-col group">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center"
                    style={{background:`${m.farbe}15`}}>
                    <Building2 className="h-5 w-5" style={{color:m.farbe}} />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{background:m.farbe,color:m.textFarbe}}>{m.badge}</span>
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{m.desc}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 border-t border-border pt-4">
                  <span>{m.tage} Lerntage</span>
                  <span>{m.ue} UE</span>
                  <span className="font-semibold text-foreground text-base">ab {m.preis} €</span>
                </div>
                <Link href={`/kurs/${m.slug}`}>
                  <a className="inline-flex items-center justify-center gap-2 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all"
                    style={{background:m.farbe,color:m.textFarbe}}>
                    Kurs ansehen <ArrowRight className="h-4 w-4" />
                  </a>
                </Link>
              </div>
            ))}
            {/* Komplett-Paket */}
            <div className="rounded-2xl border-2 border-primary bg-primary/5 p-6 shadow-elegant flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                  <Star className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold" style={{background:"oklch(0.78 0.15 75)",color:"oklch(0.22 0.05 60)",padding:"4px 10px",borderRadius:"999px"}}>Empfohlen</span>
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">Komplett-Ausbildung</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                Alle 5 Module — Makler, Verwalter, Gutachter, Finanzierer. 240 Lerntage, 1920 UE, 5 Zertifikate.
              </p>
              <div className="border-t border-border pt-4 mb-4">
                <div className="text-2xl font-display font-semibold text-primary">1.955 €</div>
                <div className="text-xs text-muted-foreground">statt 2.245 € · Sie sparen 290 €</div>
              </div>
              <Link href="/pakete">
                <a className="inline-flex items-center justify-center gap-2 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02]"
                  style={{background:"oklch(0.78 0.15 75)",color:"oklch(0.22 0.05 60)"}}>
                  Komplett-Paket wählen <ArrowRight className="h-4 w-4" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Plattform-Features</div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Was uns auszeichnet</h2>
            <p className="mt-4 text-muted-foreground">Entwickelt von Immobilienprofis für Immobilienprofis.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f,i)=>(
              <div key={i} className="rounded-2xl bg-background border border-border p-6 shadow-soft hover:shadow-elegant transition-all hover:-translate-y-1">
                <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl gradient-hero text-white p-10 md:p-16 text-center relative overflow-hidden shadow-elegant">
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{backgroundImage:"radial-gradient(circle at 30% 50%, oklch(0.78 0.15 75/0.3), transparent 50%)"}} />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight mb-5">
                Starten Sie noch heute kostenlos
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto text-lg mb-8">
                24 Stunden kostenloser Testzugang für Modul 1. Keine Kreditkarte, keine Verpflichtung.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/kurs/modul-1-immobilien-grundkurs">
                  <a className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold shadow-glow hover:scale-105 transition-transform"
                    style={{background:"oklch(0.78 0.15 75)",color:"oklch(0.22 0.05 60)"}}>
                    Jetzt kostenlos testen <ArrowRight className="h-4 w-4" />
                  </a>
                </Link>
                <Link href="/kurse">
                  <a className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white hover:bg-white/20 transition-all">
                    Alle Module ansehen
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
