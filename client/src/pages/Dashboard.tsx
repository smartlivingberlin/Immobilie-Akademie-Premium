import { useDarkMode } from "@/hooks/useDarkMode";
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
    <div style={{ height: 8, background: "var(--color-bg)", borderRadius: 100, overflow: "hidden" }}>
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
        <span style={{ fontSize: 13, fontWeight: 800, color: "var(--color-text)" }}>{pct}%</span>
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
        background: "var(--color-card)",
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
        <div style={{ fontSize: 13, color: "var(--color-text-muted)", fontWeight: 500, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "var(--color-text)", letterSpacing: "-0.03em", lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 3 }}>{sub}</div>
      </div>
    </div>
  );
}

// ── Quick Action Item ────────────────────────────────────────
function QuickActionItem({ icon, label, sub, href, color }: { icon: string; label: string; sub: string; href: string; color: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{ textDecoration: "none" }}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 8px",
          background: hov ? color + "10" : "var(--color-card)",
          border: `1px solid ${hov ? color + "40" : "#f1f5f9"}`,
          borderRadius: 12, cursor: "pointer", transition: "all 0.2s", textAlign: "center" }}>
        <span style={{ fontSize: 22, marginBottom: 4 }}>{icon}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text)" }}>{label}</span>
        <span style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{sub}</span>
      </div>
    </a>
  );
}

// ── Achievement Badge ─────────────────────────────────────────
function AchievementBadge({ icon, title, desc, unlocked, color }: { icon: string; title: string; desc: string; unlocked: boolean; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
      background: unlocked ? color + "10" : "#f8fafc",
      border: `1px solid ${unlocked ? color + "30" : "#e2e8f0"}`,
      borderRadius: 12, opacity: unlocked ? 1 : 0.5, transition: "all 0.2s" }}>
      <span style={{ fontSize: 24, filter: unlocked ? "none" : "grayscale(1)" }}>{icon}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: unlocked ? color : "#94a3b8" }}>{title}</div>
        <div style={{ fontSize: 11, color: "#94a3b8" }}>{desc}</div>
      </div>
      {unlocked && <span style={{ marginLeft: "auto", color, fontSize: 16 }}>✓</span>}
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
        background: "var(--color-card)",
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
                  background: "var(--color-bg)", color: "var(--color-text-muted)",
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
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)", margin: 0, lineHeight: 1.3 }}>
              {module.name}
            </h3>
            <p style={{ fontSize: 12, color: "var(--color-text-muted)", margin: "4px 0 0" }}>
              {stats.daysCompleted} von {stats.totalDays} Tagen
            </p>
          </div>
          <CircularProgress pct={stats.completionPercentage} color={c.main} size={64} />
        </div>

        {/* Progress Bar */}
        <AnimatedBar pct={stats.completionPercentage} color={c.main} />

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 16, paddingTop: 16, borderTop: "1px solid #f1f5f9" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: c.main }}>{stats.daysCompleted}</div>
            <div style={{ fontSize: 10, color: "#94a3b8" }}>Tage</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: c.main }}>{stats.completionPercentage}%</div>
            <div style={{ fontSize: 10, color: "#94a3b8" }}>Fortschritt</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: c.main }}>{stats.totalDays}</div>
            <div style={{ fontSize: 10, color: "#94a3b8" }}>Gesamt</div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function Dashboard() {
  const { data: progressData } = trpc.modules.myAccess.useQuery();
  const { data: meData } = trpc.auth.me.useQuery();

  const enabledModules = (meData?.enabledModules || "").split(",").map(Number).filter(Boolean);

  const allModules = [
    { id: 1, name: "Grundkurs", days: 20, href: "/modul/1" },
    { id: 2, name: "Makler §34c", days: 60, href: "/modul/2" },
    { id: 3, name: "WEG-Verwalter", days: 80, href: "/modul/3" },
    { id: 4, name: "Gutachter", days: 40, href: "/modul/4" },
    { id: 5, name: "§34i Darlehen", days: 40, href: "/modul/5" },
  ];

  const moduleStats = allModules.map(m => {
    const logs = (progressData as any)?.logs?.filter((l: any) => l.moduleId === m.id) || [];
    const completed = logs.filter((l: any) => l.completed).length;
    return {
      ...m,
      daysCompleted: completed,
      totalDays: m.days,
      completionPercentage: Math.round((completed / m.days) * 100),
      started: completed > 0,
    };
  });

  const totalDaysCompleted = moduleStats.reduce((s, m) => s + m.daysCompleted, 0);
  const totalDays = moduleStats.reduce((s, m) => s + m.totalDays, 0);
  const overallPct = Math.round((totalDaysCompleted / totalDays) * 100);
  const completedModules = moduleStats.filter(m => m.completionPercentage >= 80).length;
  const totalLearningHours = Math.round(totalDaysCompleted * 0.5);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>
      <OnboardingWizard onComplete={() => {}} />
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--color-text)", margin: "0 0 4px" }}>
          Mein Lernbereich
        </h1>
        <p style={{ color: "var(--color-text-muted)", margin: 0 }}>
          Willkommen, {meData?.name || "Lernender"}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        <StatCard icon={<Calendar size={20} />} label="Lerntage" value={totalDaysCompleted} sub={`von ${totalDays}`} color="#2563eb" bg="#dbeafe" />
        <StatCard icon={<TrendingUp size={20} />} label="Fortschritt" value={`${overallPct}%`} sub="Gesamt" color="#059669" bg="#d1fae5" />
        <StatCard icon={<Clock size={20} />} label="Lernstunden" value={totalLearningHours} sub="Geschätzt" color="#7c3aed" bg="#ede9fe" />
        <StatCard icon={<Trophy size={20} />} label="Module" value={completedModules} sub="Abgeschlossen" color="#d97706" bg="#fef3c7" />
      </div>

      {/* Module */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-text)", margin: "0 0 16px" }}>
          Meine Module
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {moduleStats.map(m => (
            <ModulKarte key={m.id} module={m} stats={m} enabled={enabledModules.includes(m.id) || enabledModules.length === 0} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ background: "var(--color-card)", borderRadius: 16, padding: 20, marginBottom: 24, border: "1px solid #f1f5f9" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", margin: "0 0 16px" }}>
          Schnellzugriff
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
          <QuickActionItem icon="🧠" label="KI-Tutor" sub="Fragen stellen" href="/modul/1" color="#2563eb" />
          <QuickActionItem icon="📝" label="IHK-Quiz" sub="855+ Fragen" href="/quiz" color="#7c3aed" />
          <QuickActionItem icon="🎯" label="Prüfung" sub="Simulation" href="/pruefung" color="#059669" />
          <QuickActionItem icon="📚" label="Lernkarten" sub="Spaced Rep." href="/lernkarten" color="#d97706" />
          <QuickActionItem icon="📊" label="Rechner" sub="Tools" href="/rechner" color="#0891b2" />
          <QuickActionItem icon="🏆" label="Gamification" sub="Badges" href="/gamification" color="#db2777" />
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-text)", margin: "0 0 16px" }}>
          Erfolge & Meilensteine
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
          <AchievementBadge icon="📅" title="Erster Tag" desc="Lernreise begonnen" unlocked={totalDaysCompleted >= 1} color="#2563eb" />
          <AchievementBadge icon="🔥" title="7-Tage-Streak" desc="7 Tage in Folge" unlocked={false} color="#d97706" />
          <AchievementBadge icon="🎯" title="Halbzeit" desc="50% erreicht" unlocked={overallPct >= 50} color="#059669" />
          <AchievementBadge icon="🏆" title="Erstes Zertifikat" desc="Modul abgeschlossen" unlocked={completedModules >= 1} color="#7c3aed" />
          <AchievementBadge icon="⚡" title="Speed Learner" desc="5 Tage in Woche" unlocked={false} color="#0891b2" />
          <AchievementBadge icon="👑" title="Meister" desc="Alle Module fertig" unlocked={completedModules >= 5} color="#f5c842" />
        </div>
      </div>
    </div>
  );
}
