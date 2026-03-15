import { useState, useEffect } from "react";
import type { Phase, PhaseConfig } from "@/hooks/usePortalPhase";

const PHASE_ORDER: Phase[] = ["A", "B", "C", "D"];

const PHASE_ICONS: Record<Phase, string> = {
  A: "🏗️",
  B: "📜",
  C: "🏆",
  D: "⭐",
};

const PHASE_COLORS: Record<Phase, { bg: string; border: string; text: string; badge: string }> = {
  A: { bg: "bg-slate-50", border: "border-slate-300", text: "text-slate-700", badge: "bg-slate-100 text-slate-600" },
  B: { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
  C: { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-700", badge: "bg-amber-100 text-amber-700" },
  D: { bg: "bg-green-50", border: "border-green-300", text: "text-green-700", badge: "bg-green-100 text-green-700" },
};

export default function PortalPhaseAdmin() {
  const [currentPhase, setCurrentPhase] = useState<Phase>("A");
  const [allPhases, setAllPhases] = useState<Record<Phase, PhaseConfig> | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portal-phase")
      .then((r) => r.json())
      .then((d) => {
        setCurrentPhase(d.phase);
        setLoading(false);
      });

    // Alle Phasen laden
    fetch("/api/portal-phase")
      .then((r) => r.json())
      .then(() => {
        // Statische Konfiguration direkt einbetten
        setAllPhases({
          A: {
            id: "A", name: "Selbstlernportal", description: "Digitales Lernmaterial zur IHK-Prüfungsvorbereitung. Keine externe Zertifizierung nötig.",
            badges: { azav: false, zfu: false, ihk: false, bgs: false },
            labels: { productType: "Digitales Lernmaterial", certificationNote: "Qualifizierte Prüfungsvorbereitung", faqCertAnswer: "", footerBadge1: "IHK-Vorbereitung", footerBadge2: "Qualitätsgesichert" },
            canSell: true, requirements: [], unlocked: true,
          },
          B: {
            id: "B", name: "Fernlehrgang (ZFU-zugelassen)", description: "Staatlich zugelassener Fernlehrgang nach FernUSG.",
            badges: { azav: false, zfu: true, ihk: false, bgs: false },
            labels: { productType: "Staatl. zugelassener Fernlehrgang", certificationNote: "ZFU-zugelassen", faqCertAnswer: "", footerBadge1: "ZFU-zugelassen", footerBadge2: "IHK-Vorbereitung" },
            canSell: true, requirements: ["ZFU-Zulassung vorliegend", "FernUSG-Vertrag aktiv"], unlocked: false,
          },
          C: {
            id: "C", name: "AZAV-zertifiziert (BGS-fähig)", description: "AZAV-akkreditiert. Bildungsgutschein wird akzeptiert.",
            badges: { azav: true, zfu: true, ihk: false, bgs: true },
            labels: { productType: "AZAV-zertifizierter Fernlehrgang", certificationNote: "AZAV · ZFU · BGS-fähig", faqCertAnswer: "", footerBadge1: "AZAV-zertifiziert", footerBadge2: "BGS-fähig" },
            canSell: true, requirements: ["AZAV-Akkreditierung", "ZFU-Zulassung", "Anwesenheitsnachweise aktiv"], unlocked: false,
          },
          D: {
            id: "D", name: "Vollzertifiziert", description: "ZFU + AZAV + IHK-Kooperation. Maximale Reichweite.",
            badges: { azav: true, zfu: true, ihk: true, bgs: true },
            labels: { productType: "IHK-anerkannter Fernlehrgang", certificationNote: "AZAV · ZFU · IHK · BGS-fähig", faqCertAnswer: "", footerBadge1: "AZAV · ZFU · IHK", footerBadge2: "BGS-fähig" },
            canSell: true, requirements: ["AZAV-Akkreditierung", "ZFU-Zulassung", "IHK-Kooperationsvertrag"], unlocked: false,
          },
        });
      });
  }, []);

  async function switchPhase(phase: Phase) {
    if (phase === currentPhase) return;
    setSaving(true);
    try {
      const r = await fetch("/api/admin/portal-phase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phase }),
        credentials: "include",
      });
      if (r.ok) {
        setCurrentPhase(phase);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        // Cache leeren
        (window as any).__portalPhaseCache = null;
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading || !allPhases) {
    return <div className="flex items-center justify-center h-64 text-slate-400">Laden...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Portal-Phasen-Steuerung</h1>
          <p className="text-sm text-slate-500 mt-1">
            Schalte Zertifizierungsbadges, Aussagen und Features je nach erreichter Genehmigung
          </p>
        </div>
        {saved && (
          <div className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-xl">
            ✅ Gespeichert — Portal wird aktualisiert
          </div>
        )}
      </div>

      {/* Aktueller Status */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 shadow-sm">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Aktuell aktive Phase</div>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{PHASE_ICONS[currentPhase]}</span>
          <div>
            <div className="text-lg font-bold text-slate-900">Phase {currentPhase} — {allPhases[currentPhase].name}</div>
            <div className="text-sm text-slate-500">{allPhases[currentPhase].description}</div>
          </div>
          <div className={`ml-auto text-xs font-semibold px-3 py-1 rounded-full ${PHASE_COLORS[currentPhase].badge}`}>
            AKTIV
          </div>
        </div>

        {/* Was ist gerade sichtbar */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {(["azav", "zfu", "ihk", "bgs"] as const).map((badge) => (
            <div key={badge} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
              allPhases[currentPhase].badges[badge]
                ? "bg-green-100 text-green-700"
                : "bg-slate-100 text-slate-400 line-through"
            }`}>
              {allPhases[currentPhase].badges[badge] ? "✓" : "✗"} {badge.toUpperCase()}
            </div>
          ))}
        </div>

        <div className="mt-3 p-3 bg-slate-50 rounded-lg text-xs text-slate-600">
          <span className="font-medium">Portal zeigt gerade:</span> "{allPhases[currentPhase].labels.certificationNote}" — Footer: "{allPhases[currentPhase].labels.footerBadge1}"
        </div>
      </div>

      {/* Phasen-Auswahl */}
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Phase wechseln</div>
      <div className="space-y-3">
        {PHASE_ORDER.map((phase) => {
          const cfg = allPhases[phase];
          const isActive = phase === currentPhase;
          const colors = PHASE_COLORS[phase];
          const phaseIndex = PHASE_ORDER.indexOf(phase);
          const currentIndex = PHASE_ORDER.indexOf(currentPhase);
          const isHigher = phaseIndex > currentIndex;

          return (
            <div
              key={phase}
              className={`border-2 rounded-2xl p-5 transition-all ${
                isActive
                  ? `${colors.border} ${colors.bg}`
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">{PHASE_ICONS[phase]}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-bold text-base ${isActive ? colors.text : "text-slate-700"}`}>
                      Phase {phase} — {cfg.name}
                    </span>
                    {isActive && <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${colors.badge}`}>AKTIV</span>}
                  </div>
                  <p className="text-sm text-slate-500 mb-3">{cfg.description}</p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(["azav", "zfu", "ihk", "bgs"] as const).map((b) => (
                      <span key={b} className={`text-xs px-2 py-1 rounded-md font-medium ${
                        cfg.badges[b] ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"
                      }`}>
                        {cfg.badges[b] ? "✓" : "–"} {b.toUpperCase()}
                      </span>
                    ))}
                  </div>

                  {/* Voraussetzungen */}
                  {cfg.requirements.length > 0 && (
                    <div className="text-xs text-slate-400 mb-3">
                      <span className="font-medium">Voraussetzungen:</span>{" "}
                      {cfg.requirements.join(" · ")}
                    </div>
                  )}
                </div>

                {/* Schalter-Button */}
                <div className="flex-shrink-0">
                  {isActive ? (
                    <div className="bg-green-500 text-white text-xs font-semibold px-4 py-2 rounded-xl">
                      ✓ Aktiv
                    </div>
                  ) : (
                    <button
                      onClick={() => switchPhase(phase)}
                      disabled={saving}
                      className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
                        isHigher
                          ? "border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100"
                          : "border-slate-300 text-slate-600 bg-slate-50 hover:bg-slate-100"
                      } disabled:opacity-50`}
                    >
                      {saving ? "..." : isHigher ? "⚠️ Einschalten" : "↓ Zurückschalten"}
                    </button>
                  )}
                </div>
              </div>

              {/* Warnung beim Hochschalten */}
              {isHigher && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
                  ⚠️ <strong>Nur aktivieren wenn:</strong> {cfg.requirements.join(", ")} — liegt vor.
                  Aktivierung ohne Genehmigung kann §5 UWG-Haftung auslösen.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Rechtlicher Hinweis */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700 leading-relaxed">
        <div className="font-semibold mb-1">ℹ️ Rechtlicher Hinweis</div>
        Phase A ist jederzeit rechtssicher nutzbar. Phasen B–D nur aktivieren wenn die entsprechende
        Genehmigung (ZFU-Bescheid, AZAV-Akkreditierung, IHK-Kooperationsvertrag) schriftlich vorliegt.
        Bei Fragen: Rechtsanwalt mit Fokus Bildungsrecht konsultieren.
      </div>
    </div>
  );
}
