interface ModuleIntroProps {
  moduleId: number;
  title: string;
  subtitle: string;
  targetAudience: string;
  duration: string;
  units: string;
  goal: string;
  whatYouLearn: string[];
  whatYouCanAfter: string[];
  examRelevance: string;
  legalBasis?: string;
  difficulty: "Einsteiger" | "Mittelstufe" | "Fortgeschritten";
  onStart: () => void;
}

const difficultyColor = {
  "Einsteiger": "bg-green-100 text-green-800",
  "Mittelstufe": "bg-amber-100 text-amber-800",
  "Fortgeschritten": "bg-blue-100 text-blue-800",
};

export function ModuleIntro({
  moduleId, title, subtitle, targetAudience, duration, units,
  goal, whatYouLearn, whatYouCanAfter, examRelevance, legalBasis,
  difficulty, onStart,
}: ModuleIntroProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Modul {moduleId}
          </span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${difficultyColor[difficulty]}`}>
            {difficulty}
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-slate-300 text-sm leading-relaxed">{subtitle}</p>
        <div className="flex flex-wrap gap-4 mt-5 text-sm text-slate-300">
          <span>⏱ {duration}</span>
          <span>📚 {units} Unterrichtseinheiten</span>
          {legalBasis && <span>⚖️ {legalBasis}</span>}
        </div>
      </div>

      {/* Für wen ist das? */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-blue-900 mb-2">👤 Für wen ist dieses Modul?</h2>
        <p className="text-sm text-blue-800 leading-relaxed">{targetAudience}</p>
      </div>

      {/* Lernziel */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-2">🎯 Was ist das Ziel dieses Moduls?</h2>
        <p className="text-sm text-slate-600 leading-relaxed">{goal}</p>
      </div>

      {/* Was lernst du / Was kannst du danach */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">📖 Was lernst du hier?</h2>
          <ul className="space-y-2">
            {whatYouLearn.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-blue-500 mt-0.5 flex-shrink-0">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">✅ Was kannst du danach?</h2>
          <ul className="space-y-2">
            {whatYouCanAfter.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Prüfungsrelevanz */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-amber-900 mb-2">🏆 Prüfungsrelevanz</h2>
        <p className="text-sm text-amber-800 leading-relaxed">{examRelevance}</p>
      </div>

      {/* Hinweis für Quereinsteiger */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-2">💡 Hinweis für Quereinsteiger</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Keine Vorkenntnisse in der Immobilienwirtschaft erforderlich. Alle Fachbegriffe werden
          beim ersten Auftreten erklärt. Nutze den KI-Tutor jederzeit für Rückfragen —
          er beantwortet deine Fragen in einfacher Sprache.
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={onStart}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors text-base"
      >
        Modul {moduleId} starten →
      </button>

      <p className="text-center text-xs text-slate-400">
        Du kannst jederzeit zu dieser Übersicht zurückkehren.
      </p>
    </div>
  );
}
