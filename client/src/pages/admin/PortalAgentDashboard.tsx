import { useState, useEffect } from "react";
import { Link } from "wouter";

const GESETZE_LINKS: Record<string, string> = {
  "§34c GewO": "https://www.gesetze-im-internet.de/gewo/__34c.html",
  "§34i GewO": "https://www.gesetze-im-internet.de/gewo/__34i.html",
  "§652 BGB": "https://www.gesetze-im-internet.de/bgb/__652.html",
  "§535 BGB": "https://www.gesetze-im-internet.de/bgb/__535.html",
  "WEG": "https://www.gesetze-im-internet.de/woeigg/",
  "ImmoWertV": "https://www.gesetze-im-internet.de/immowertv_2021/",
  "BelWertV": "https://www.gesetze-im-internet.de/belwertv/",
  "MaBV": "https://www.gesetze-im-internet.de/mabv/",
  "GwG": "https://www.gesetze-im-internet.de/gwg_2017/",
  "KfW": "https://www.kfw.de/inlandsfoerderung/",
  "EU-WIKR": "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32014L0017",
};

const MODULE_LAWS: Record<number, string[]> = {
  1: ["§652 BGB", "§535 BGB", "WEG", "MaBV"],
  2: ["§34c GewO", "§652 BGB", "MaBV", "GwG"],
  3: ["WEG", "§535 BGB"],
  4: ["ImmoWertV", "BelWertV"],
  5: ["§34i GewO", "EU-WIKR", "KfW"],
};

const LEGAL_CHANGES = [
  { law: "§34c GewO Weiterbildungspflicht", date: "2025-11-05", desc: "Kabinettsbeschluss: Erhöhung auf 24h/Jahr geplant", modules: [1, 2], urgent: true },
  { law: "ImmoWertV 2021", date: "2021-07-01", desc: "Neue Wertermittlungsverordnung", modules: [4], urgent: false },
  { law: "WEG-Reform 2020", date: "2020-12-01", desc: "Wohnungseigentumsgesetz reformiert", modules: [3], urgent: false },
  { law: "KfW Programme 2025", date: "2025-01-01", desc: "Neue Förderprogramme aktiv", modules: [5], urgent: false },
];

export default function PortalAgentDashboard() {
  const [agentStatus, setAgentStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agent/knowledge-map")
      .then(r => r.json())
      .then(data => { setAgentStatus(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <button className="text-slate-500 hover:text-slate-700 text-sm">← Dashboard</button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">🤖 Portal-Agent System</h1>
            <p className="text-slate-500 text-sm">Wissens-Orchestrierung — findet automatisch die beste Quelle für jede Frage</p>
          </div>
        </div>

        {/* Status */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white mb-6">
          <div className="text-3xl mb-3">🤖</div>
          <h2 className="text-xl font-bold mb-2">Agent ist aktiv!</h2>
          <p className="text-blue-200 text-sm mb-4">
            Der Portal-Agent analysiert automatisch jede Nutzeranfrage und wählt die beste Wissensquelle.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Rechtsquellen", value: Object.keys(GESETZE_LINKS).length },
              { label: "Module", value: "5 / 5" },
              { label: "Lerntage", value: "240" },
            ].map(s => (
              <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-blue-200 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wie der Agent arbeitet */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">⚙️ Wie der Agent arbeitet</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Frage analysieren", desc: 'Nutzer fragt: "Was ist Maklerprovision?" → Agent erkennt Keyword "Makler"', icon: "🔍" },
              { step: "2", title: "Quelle finden", desc: "Agent wählt: Modul 2 + §652 BGB + MaBV als beste Quellen", icon: "📚" },
              { step: "3", title: "Antwort generieren", desc: "KI antwortet mit deinen Inhalten + klickbaren Gesetzes-Links", icon: "✅" },
            ].map(s => (
              <div key={s.step} className="bg-slate-50 rounded-xl p-4">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="font-bold text-slate-900 text-sm mb-1">Schritt {s.step}: {s.title}</div>
                <div className="text-slate-600 text-xs">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Modul → Gesetze Zuordnung */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">📋 Modul → Gesetze Zuordnung</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {Object.entries(MODULE_LAWS).map(([mid, laws]) => (
              <div key={mid} className="bg-slate-50 rounded-xl p-4">
                <div className="font-bold text-blue-700 text-sm mb-2">Modul {mid}</div>
                {laws.map(law => (
                  <div key={law} className="text-xs text-slate-600 py-0.5">• {law}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Gesetzesänderungen */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">⚖️ Bekannte Gesetzesänderungen</h2>
          <div className="space-y-3">
            {LEGAL_CHANGES.map((change, i) => (
              <div key={i} className={`p-4 rounded-xl border ${change.urgent ? "bg-red-50 border-red-200" : "bg-slate-50 border-slate-100"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span>{change.urgent ? "⚠️" : "ℹ️"}</span>
                  <span className="font-bold text-slate-900 text-sm">{change.law}</span>
                  <span className="text-slate-400 text-xs ml-auto">{change.date}</span>
                </div>
                <div className="text-slate-600 text-xs">{change.desc}</div>
                <div className="text-slate-400 text-xs mt-1">Betrifft: Modul {change.modules.join(", ")}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Direkte Rechtsquellen */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-2">🔗 Direkte Rechtsquellen</h2>
          <p className="text-slate-500 text-sm mb-4">Alle klickbar — öffnen offizielle Gesetzestexte</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(GESETZE_LINKS).map(([name, url]) => {
              return (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-lg p-3 transition-all"
                >
                  <span className="text-blue-600 text-lg">📖</span>
                  <div>
                    <div className="font-medium text-slate-900 text-xs">{name}</div>
                    <div className="text-slate-400 text-xs">gesetze-im-internet.de</div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
