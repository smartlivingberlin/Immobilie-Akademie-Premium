import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { useEffect, useState, useRef } from "react";
import OnboardingWizard from "@/components/OnboardingWizard";
import {
  TrendingUp, Clock, BookOpen, Award, Calendar,
  Flame, Target, BarChart3, CheckCircle2, Zap,
  ChevronRight, Trophy, Star
} from "lucide-react";

// ── Animated Progress Bar ────────────────────────────────────
function AnimatedBar({ pct, color }: { pct: number; color: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 200);
    return () => clearTimeout(t);
  }, [pct]);
  return (
    <div style={{ height: 8, background: "#f1f5f9", borderRadius: 100, overflow: "hidden" }}>
      <div style={{
        height: "100%", width: `${width}%`,
        background: color, borderRadius: 100,
        transition: "width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }} />
    </div>
  );
}

// ── Circular Progress ────────────────────────────────────────
function CircularProgress({ pct, color, size = 72 }: { pct: number; color: string; size?: number }) {
  const [progress, setProgress] = useState(0);
  const r = (size / 2) - 6;
  const circ = 2 * Math.PI * r;
  useEffect(() => {
    const t = setTimeout(() => setProgress(pct), 300);
    return () => clearTimeout(t);
  }, [pct]);
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={6} />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={6}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - progress / 100)}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>{pct}%</span>
      </div>
    </div>
  );
}

// ── Stat Card ────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color, bg }: any) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "white",
        border: `2px solid ${hov ? color : "#f1f5f9"}`,
        borderRadius: 18, padding: "24px 20px",
        display: "flex", alignItems: "center", gap: 16,
        transition: "all 0.2s ease",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hov ? `0 12px 32px ${color}22` : "0 2px 8px rgba(0,0,0,0.04)",
        cursor: "default",
      }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: bg, display: "flex",
        alignItems: "center", justifyContent: "center",
        flexShrink: 0, fontSize: 22,
        transition: "transform 0.2s",
        transform: hov ? "scale(1.1) rotate(-5deg)" : "scale(1)",
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 13, color: "#64748b", fontWeight: 500, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>{sub}</div>
      </div>
    </div>
  );
}

// ── Modul Karte ──────────────────────────────────────────────
function ModulKarte({ module, stats, enabled }: any) {
  const [hov, setHov] = useState(false);
  const colors: Record<number, { main: string; bg: string; light: string }> = {
    1: { main: "#2563eb", bg: "#dbeafe", light: "#eff6ff" },
    2: { main: "#7c3aed", bg: "#ede9fe", light: "#f5f3ff" },
    3: { main: "#059669", bg: "#d1fae5", light: "#ecfdf5" },
    4: { main: "#d97706", bg: "#fef3c7", light: "#fffbeb" },
    5: { main: "#db2777", bg: "#fce7f3", light: "#fdf2f8" },
  };
  const c = colors[module.id] || colors[1];
  const isLocked = !enabled;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "white",
        border: `2px solid ${hov && !isLocked ? c.main : "#f1f5f9"}`,
        borderRadius: 20, overflow: "hidden",
        transition: "all 0.25s ease",
        transform: hov && !isLocked ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hov && !isLocked
          ? `0 16px 40px ${c.main}18`
          : "0 2px 8px rgba(0,0,0,0.04)",
        opacity: isLocked ? 0.65 : 1,
      }}
    >
      {/* Color Bar */}
      <div style={{ height: 4, background: c.main }} />

      <div style={{ padding: "22px 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{
                background: c.bg, color: c.main,
                fontSize: 11, fontWeight: 700,
                padding: "3px 10px", borderRadius: 100,
              }}>M{module.id}</span>
              {isLocked && (
                <span style={{
                  background: "#f1f5f9", color: "#94a3b8",
                  fontSize: 10, fontWeight: 600,
                  padding: "3px 10px", borderRadius: 100,
                }}>🔒 Gesperrt</span>
              )}
              {stats.completionPercentage >= 80 && (
                <span style={{
                  background: "#dcfce7", color: "#15803d",
                  fontSize: 10, fontWeight: 700,
                  padding: "3px 10px", borderRadius: 100,
                }}>✓ Abgeschlossen</span>
              )}
              {stats.started && stats.completionPercentage < 80 && !isLocked && (
                <span style={{
                  background: "#dbeafe", color: "#2563eb",
                  fontSize: 10, fontWeight: 600,
                  padding: "3px 10px", borderRadius: 100,
                }}>Aktiv</span>
              )}
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0, lineHeight: 1.3 }}>
              {module.name}
            </h3>
            <p style={{ fontSize: 12, color: "#94a3b8", margin: "4px 0 0" }}>
              {stats.daysCompleted} von {stats.totalDays} Tagen
            </p>
          </div>
          <CircularProgress pct={stats.completionPercentage} color={c.main} size={64} />
        </div>

        {/* Progress Bar */}
        <AnimatedBar pct={stats.completionPercentage} color={c.main} />

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8, marginTop: 16, paddingTop: 16,
          borderTop: "1px solid #f1f5f9",
        }}>
          {[
            { v: stats.daysCompleted, l: "Tage" },
            { v: `${stats.timeSpent}min`, l: "Lernzeit" },
            { v: stats.completionPercentage >= 80 ? "✓" : `${stats.totalDays - stats.daysCompleted}`, l: stats.completionPercentage >= 80 ? "Fertig" : "verbleibend" },
          ].map(({ v, l }) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>{v}</div>
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href={isLocked ? "/kurse" : `/modul/${module.id}`}>
          <a style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            marginTop: 16,
            background: isLocked ? "#f8fafc" : hov ? c.main : "white",
            color: isLocked ? "#94a3b8" : hov ? "white" : c.main,
            border: `2px solid ${isLocked ? "#e2e8f0" : c.main}`,
            borderRadius: 10, padding: "10px",
            fontSize: 13, fontWeight: 700,
            textDecoration: "none",
            transition: "all 0.2s",
          }}>
            {isLocked ? "🔒 Modul kaufen" : stats.started ? "Weiter lernen" : "Modul starten"}
            {!isLocked && <ChevronRight size={14} />}
          </a>
        </Link>
      </div>
    </div>
  );
}

// ── Achievement Badge ────────────────────────────────────────
function AchievementBadge({ icon, title, desc, unlocked, color }: any) {
  return (
    <div style={{
      background: unlocked ? "white" : "#f8fafc",
      border: `2px solid ${unlocked ? color : "#e2e8f0"}`,
      borderRadius: 16, padding: 20, textAlign: "center",
      transition: "all 0.2s",
      boxShadow: unlocked ? `0 4px 16px ${color}22` : "none",
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: unlocked ? `${color}18` : "#f1f5f9",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 10px", fontSize: 22,
        filter: unlocked ? "none" : "grayscale(1) opacity(0.4)",
      }}>{icon}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: unlocked ? "#0f172a" : "#94a3b8" }}>
        {title}
      </div>
      <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>{desc}</div>
      {unlocked && (
        <div style={{
          marginTop: 8, fontSize: 10, fontWeight: 700,
          color: color, background: `${color}14`,
          padding: "2px 8px", borderRadius: 100,
          display: "inline-block",
        }}>✓ Erreicht</div>
      )}
    </div>
  );
}

// ── MAIN DASHBOARD ───────────────────────────────────────────
export default function Dashboard() {
  const { data: user, refetch: refetchUser } = trpc.auth.me.useQuery();
  const { data: dbProgress, isLoading } = trpc.progress.getProgress.useQuery();
  const [greeting, setGreeting] = useState("Guten Tag");

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting("Guten Morgen");
    else if (h < 18) setGreeting("Guten Tag");
    else setGreeting("Guten Abend");
  }, []);

  const showOnboarding = user && !(user as any).onboardingCompleted;

  const modules = [
    { id: 1, name: "Modul 1: Einführung", days: 20 },
    { id: 2, name: "Modul 2: Makler §34c", days: 60 },
    { id: 3, name: "Modul 3: Verwaltung", days: 80 },
    { id: 4, name: "Modul 4: Gutachten", days: 40 },
    { id: 5, name: "Modul 5: §34i", days: 40 },
  ];

  const enabledModules = ((user as any)?.enabledModules || "").split(",").map((s: string) => s.trim()).filter(Boolean);

  const getStats = (moduleId: number) => {
    const totalDays = modules.find(m => m.id === moduleId)?.days || 0;
    if (!dbProgress) return { completionPercentage: 0, daysCompleted: 0, totalDays, timeSpent: 0, started: false };
    const logs = dbProgress.filter((l: any) => l.moduleId === moduleId);
    const daysCompleted = logs.filter((l: any) => l.completed).length;
    const timeSpent = Math.round(logs.reduce((s: number, l: any) => s + (l.durationSeconds || 0), 0) / 60);
    const completionPercentage = totalDays > 0 ? Math.round((daysCompleted / totalDays) * 100) : 0;
    return { completionPercentage, daysCompleted, totalDays, timeSpent, started: logs.length > 0 };
  };

  const totalMins = Math.round((dbProgress?.reduce((s: number, l: any) => s + (l.durationSeconds || 0), 0) || 0) / 60);
  const totalHours = Math.round(totalMins / 60);
  const completedModules = [1,2,3,4,5].filter(id => getStats(id).completionPercentage >= 80).length;
  const totalDaysCompleted = (dbProgress || []).filter((l: any) => l.completed).length;
  const totalDays = 240;
  const overallPct = Math.round((totalDaysCompleted / totalDays) * 100);
  const firstName = (user as any)?.name?.split(" ")[0] || "Lernender";

  if (showOnboarding) {
    return <OnboardingWizard onComplete={() => refetchUser()} />;
  }

  return (
    <div style={{ padding: "32px 24px", maxWidth: 1200, margin: "0 auto", fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* ── HEADER ─────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
        borderRadius: 24, padding: "32px 36px", marginBottom: 32,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 20,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 240, height: 240,
          background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div>
          <div style={{ color: "#94a3b8", fontSize: 14, marginBottom: 6 }}>
            {greeting}, 👋
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "white", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
            {firstName}
          </h1>
          <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
            {totalDaysCompleted > 0
              ? `Du hast ${totalDaysCompleted} Lerntage abgeschlossen — weiter so!`
              : "Starte deinen ersten Lerntag und lege los!"}
          </p>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16, padding: "16px 24px", textAlign: "center",
        }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: "white", letterSpacing: "-0.04em" }}>
            {overallPct}%
          </div>
          <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 2 }}>Gesamtfortschritt</div>
          <div style={{ marginTop: 10, width: 160, height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 100 }}>
            <div style={{
              height: "100%", width: `${overallPct}%`,
              background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
              borderRadius: 100,
              transition: "width 1.2s ease",
            }} />
          </div>
          <div style={{ color: "#475569", fontSize: 11, marginTop: 4 }}>
            {totalDaysCompleted} / {totalDays} Tage
          </div>
        </div>
      </div>

      {/* ── STATS ──────────────────────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16, marginBottom: 32,
      }}>
        <StatCard
          icon="📈" label="Gesamtfortschritt" value={`${overallPct}%`}
          sub={`${totalDaysCompleted} von ${totalDays} Tagen`}
          color="#2563eb" bg="#dbeafe"
        />
        <StatCard
          icon="⏱️" label="Lernzeit gesamt" value={totalHours > 0 ? `${totalHours}h` : `${totalMins}min`}
          sub={`≈ ${Math.round(totalHours / 8)} Arbeitstage`}
          color="#059669" bg="#d1fae5"
        />
        <StatCard
          icon="🔥" label="Lernstreak" value="0"
          sub="Tage in Folge"
          color="#d97706" bg="#fef3c7"
        />
        <StatCard
          icon="🏆" label="Module fertig" value={`${completedModules}/5`}
          sub={`${enabledModules.length} Module freigeschaltet`}
          color="#7c3aed" bg="#ede9fe"
        />
      </div>

      {/* ── MODULE FORTSCHRITT ─────────────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
              Deine Module
            </h2>
            <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>
              Fortschritt & Lernziele
            </p>
          </div>
          <Link href="/zertifikate">
            <a style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "white", border: "2px solid #f1f5f9",
              borderRadius: 10, padding: "8px 16px",
              color: "#64748b", fontSize: 13, fontWeight: 600,
              textDecoration: "none", transition: "all 0.2s",
            }}>
              <Award size={14} /> Zertifikate
            </a>
          </Link>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}>
          {modules.map(module => (
            <ModulKarte
              key={module.id}
              module={module}
              stats={getStats(module.id)}
              enabled={enabledModules.includes(String(module.id)) || (user as any)?.role === "admin"}
            />
          ))}
        </div>
      </div>

      {/* ── QUICK ACTIONS ──────────────────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
          Schnellzugriff
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {[
            { icon: "🧠", label: "KI-Tutor", sub: "Fragen stellen", href: "/modul/1", color: "#2563eb" },
            { icon: "📝", label: "IHK-Quiz", sub: "855+ Fragen", href: "/quiz", color: "#7c3aed" },
            { icon: "🎯", label: "Prüfung üben", sub: "Simulation", href: "/pruefung", color: "#059669" },
            { icon: "📚", label: "Lernkarten", sub: "Spaced Repetition", href: "/lernkarten", color: "#d97706" },
            { icon: "📊", label: "Rechner", sub: "Immobilien-Tools", href: "/rechner", color: "#0891b2" },
            { icon: "🏆", label: "Gamification", sub: "Badges & Punkte", href: "/gamification", color: "#db2777" },
          ].map(item => {
            const [hov, setHov] = useState(false);
            return (
              <Link key={item.href} href={item.href}>
                
                  onMouseEnter={() => setHov(true)}
                  onMouseLeave={() => setHov(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    background: hov ? item.color : "white",
                    border: `2px solid ${hov ? item.color : "#f1f5f9"}`,
                    borderRadius: 14, padding: "14px 16px",
                    textDecoration: "none", transition: "all 0.2s",
                    transform: hov ? "translateY(-2px)" : "translateY(0)",
                    boxShadow: hov ? `0 8px 24px ${item.color}25` : "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <span style={{
                    fontSize: 22, width: 40, height: 40,
                    background: hov ? "rgba(255,255,255,0.15)" : `${item.color}15`,
                    borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: hov ? "white" : "#0f172a" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 11, color: hov ? "rgba(255,255,255,0.7)" : "#94a3b8" }}>
                      {item.sub}
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── ACHIEVEMENTS ───────────────────────────────────── */}
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
          Erfolge & Meilensteine
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
          <AchievementBadge icon="📅" title="Erster Tag" desc="Lernreise begonnen"
            unlocked={totalDaysCompleted >= 1} color="#2563eb" />
          <AchievementBadge icon="🔥" title="7-Tage-Streak" desc="7 Tage in Folge"
            unlocked={false} color="#d97706" />
          <AchievementBadge icon="🎯" title="Halbzeit" desc="50% erreicht"
            unlocked={overallPct >= 50} color="#059669" />
          <AchievementBadge icon="🏆" title="Erstes Zertifikat" desc="Modul abgeschlossen"
            unlocked={completedModules >= 1} color="#7c3aed" />
          <AchievementBadge icon="⚡" title="Speed Learner" desc="5 Tage in einer Woche"
            unlocked={false} color="#0891b2" />
          <AchievementBadge icon="👑" title="Meister" desc="Alle Module fertig"
            unlocked={completedModules >= 5} color="#f5c842" />
        </div>
      </div>
    </div>
  );
}
