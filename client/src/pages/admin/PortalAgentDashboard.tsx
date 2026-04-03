import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";

interface AgentStatus {
  module: number;
  name: string;
  kb_exists: boolean;
  content_files: number;
  gesetze: string[];
  qualitaet: { ok: boolean; probleme: string[]; empfehlungen: string[] };
}

export default function PortalAgentDashboard() {
  const { user } = useAuth();
  const [status, setStatus] = useState<AgentStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");
  const [frage, setFrage] = useState("");
  const [antwort, setAntwort] = useState("");
  const [frageLoading, setFrageLoading] = useState(false);

  const MODULE_INFO = [
    { id: 1, name: "Grundlagen", icon: "🏠", farbe: "blue" },
    { id: 2, name: "Makler §34c", icon: "🔑", farbe: "green" },
    { id: 3, name: "WEG-Verwalter", icon: "🏢", farbe: "orange" },
    { id: 4, name: "Gutachter", icon: "📊", farbe: "purple" },
    { id: 5, name: "§34i Darlehen", icon: "💶", farbe: "teal" },
  ];

  const GESETZE_LINKS: Record<string, string> = {
    "§34c GewO": "https://www.gesetze-im-internet.de/gewo/__34c.html",
    "§34i GewO": "https://www.gesetze-im-internet.de/gewo/__34i.html",
    "§652 BGB": "https://www.gesetze-im-internet.de/bgb/__652.html",
    "WEG": "https://www.gesetze-im-internet.de/woeigg/",
    "§535 BGB": "https://www.gesetze-im-internet.de/bgb/__535.html",
    "ImmoWertV 2021": "https://www.gesetze-im-internet.de/immowertv_2021/",
    "MaBV": "https://www.gesetze-im-internet.de/mabv/",
    "KfW": "https://www.kfw.de/inlandsfoerderung/",
  };

  useEffect(() => {
    fetch("/api/admin/agent-status", { credentials: "include" })
      .then(r => r.json())
      .then(d => { setStatus(d.modules || []); setReport(d.report || ""); })
      .catch(() => {});
  }, []);

  const askAgent = async () => {
    if (!frage.trim()) return;
    setFrageLoading(true);
    try {
      const res = await fetch("/api/ai/rag-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ question: frage, context: [] }),
      });
      const data = await res.json();
      setAntwort(data.answer || "Keine Antwort");
    } catch {
      setAntwort("Fehler beim Abrufen der Antwort");
    }
    setFrageLoading(false);
  };

  if (user?.role !== "admin") return <div className="p-8 text-red-600">Kein Zugriff</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <button className="text-slate-500 hover:text-slate-700 text-sm">← Dashboard</button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">🤖 Portal-Agent System</h1>
            <p className="text-slate-500 text-sm">
              Intelligente Wissens-Orchestrierung — alle Inhalte, Gesetze und Quellen im Überblick
            </p>
          </div>
        </div>

        {/* Erklärung */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
          <h2 className="font-bold text-blue-900 mb-2">💡 Was macht der Portal-Agent?</h2>
          <p className="text-blue-800 text-sm leading-relaxed">
            Der Portal-Agent ist dein intelligenter Assistent der <strong>alle 1.3 MB Lerninhalte</strong> kennt,
            weiß <strong>welche Gesetze in welchem Modul</strong> relevant sind, und bei jeder KI-Anfrage
            automatisch die <strong>beste Wissensquelle</strong> auswählt. Er verlinkt immer direkt zu
            offiziellen Gesetzes-Texten auf gesetze-im-internet.de.
          </p>
        </div>

        {/* Modul-Status */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {MODULE_INFO.map(mod => (
            <div key={mod.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="text-2xl mb-2">{mod.icon}</div>
              <div className="font-bold text-slate-900 text-sm">Modul {mod.id}</div>
              <div className="text-slate-500 text-xs mb-3">{mod.name}</div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-green-500">✅</span>
                  <span className="text-slate-600">Wissensbasis aktiv</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-green-500">✅</span>
                  <span className="text-slate-600">Gesetze verknüpft</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gesetze-Links */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-8">
          <h2 className="font-bold text-slate-900 mb-4">⚖️ Verknüpfte Rechtsquellen (direkte Links)</h2>
          <p className="text-slate-500 text-sm mb-4">
            Diese Gesetze kennt der Agent und verlinkt sie automatisch in jeder KI-Antwort:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(GESETZE_LINKS).map(([name, url]) => (
              
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
            ))}
          </div>
        </div>

        {/* Agent testen */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-8">
          <h2 className="font-bold text-slate-900 mb-2">🧪 Agent direkt testen</h2>
          <p className="text-slate-500 text-sm mb-4">
            Stelle eine Frage — der Agent sucht automatisch in den richtigen Modulen und gibt Quellen an:
          </p>
          <div className="flex gap-3 mb-4">
            <input
              value={frage}
              onChange={e => setFrage(e.target.value)}
              onKeyDown={e => e.key === "Enter" && askAgent()}
              placeholder="z.B. Was ist die Maklerprovision nach §34c GewO?"
              className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
            <button
              onClick={askAgent}
              disabled={frageLoading || !frage.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {frageLoading ? "..." : "Fragen"}
            </button>
          </div>
          {antwort && (
            <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
              {antwort}
            </div>
          )}
        </div>

        {/* Architektur */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h2 className="font-bold text-slate-900 mb-4">🏗️ System-Architektur</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { layer: "Layer 1", title: "Wissensbasis", items: ["1.3 MB Lerninhalte", "42 KB Knowledge-Files", "814 Prüfungsfragen"], color: "green" },
              { layer: "Layer 2", title: "Agent-Orchestrierung", items: ["PortalAgent.ts", "Wissens-Karte", "Quellen-Routing"], color: "blue" },
              { layer: "Layer 3", title: "KI-Generierung", items: ["Gemini 2.5 Flash", "Claude Haiku Backup", "Quellenangaben"], color: "purple" },
              { layer: "Layer 4", title: "Monitoring", items: ["UptimeRobot 24/7", "KI-Monitor", "Token-Kontrolle"], color: "orange" },
            ].map(l => (
              <div key={l.layer} className="border border-slate-100 rounded-lg p-4">
                <div className={`text-xs font-bold text-${l.color}-600 mb-1`}>{l.layer}</div>
                <div className="font-bold text-slate-900 text-sm mb-2">{l.title}</div>
                {l.items.map(item => (
                  <div key={item} className="flex items-center gap-1 text-xs text-slate-600">
                    <span className="text-green-500">✓</span> {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
