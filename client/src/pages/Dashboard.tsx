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
                    <QuickActionItem icon="🧠" label="KI-Tutor" sub="Fragen stellen" href="/modul/1" color="#2563eb" />
          <QuickActionItem icon="📝" label="IHK-Quiz" sub="855+ Fragen" href="/quiz" color="#7c3aed" />
          <QuickActionItem icon="🎯" label="Prüfung üben" sub="Simulation" href="/pruefung" color="#059669" />
          <QuickActionItem icon="📚" label="Lernkarten" sub="Spaced Repetition" href="/lernkarten" color="#d97706" />
          <QuickActionItem icon="📊" label="Rechner" sub="Immobilien-Tools" href="/rechner" color="#0891b2" />
          <QuickActionItem icon="🏆" label="Gamification" sub="Badges & Punkte" href="/gamification" color="#db2777" />
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
