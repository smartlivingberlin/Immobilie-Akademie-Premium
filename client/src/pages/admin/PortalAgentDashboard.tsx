import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function PortalAgentDashboard() {
  const [health, setHealth] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [askResult, setAskResult] = useState<any>(null);
  const [question, setQuestion] = useState("");
  const [moduleId, setModuleId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview"|"ask"|"quality"|"legal"|"memory"|"cron"|"coaching">("overview");
  const [qualityResult, setQualityResult] = useState<any>(null);
  const [legalUpdates, setLegalUpdates] = useState<any>(null);
  const [genQuestion, setGenQuestion] = useState<any>(null);
  const [genTopic, setGenTopic] = useState("§34c GewO Erlaubnis");
  const [genModule, setGenModule] = useState(2);
  const [genDiff, setGenDiff] = useState("medium");
  const [cronLog, setCronLog] = useState<string>("");
  const [auditResult, setAuditResult] = useState<any>(null);
  const [coachingData, setCoachingData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/agent/health", { headers: { "x-owner-key": "Owner2026Premium!" } }).then(r => r.json()).then(setHealth).catch(() => {});
    fetch("/api/agent/status", { headers: { "x-owner-key": "Owner2026Premium!" } }).then(r => r.json()).then(setStatus).catch(() => {});
  }, []);

  const runAudit = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/agent/run-audit", { method: "POST" });
      setAuditResult(await r.json());
      // Log auch laden
      const lr = await fetch("/api/agent/cron-log");
      const ld = await lr.json();
      setCronLog(ld.log || "");
    } finally { setLoading(false); }
  };

  const loadCronLog = async () => {
    const r = await fetch("/api/agent/cron-log");
    const d = await r.json();
    setCronLog(d.log || "");
  };

  const loadCoaching = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/agent/coaching");
      setCoachingData(await r.json());
    } finally { setLoading(false); }
  };

  const askAgent = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const r = await fetch("/api/agent/ask", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, moduleId }),
      });
      setAskResult(await r.json());
    } finally { setLoading(false); }
  };

  const checkLegal = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/agent/legal-updates");
      setLegalUpdates(await r.json());
    } finally { setLoading(false); }
  };

  const generateQ = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/agent/generate-question", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module: genModule, topic: genTopic, difficulty: genDiff }),
      });
      setGenQuestion(await r.json());
    } finally { setLoading(false); }
  };

  const modelBadge = (model: string) => {
    if (!model) return null;
    const colors: Record<string, string> = {
      claude: "bg-orange-100 text-orange-800",
      gemini: "bg-blue-100 text-blue-800",
      groq: "bg-green-100 text-green-800",
    };
    const key = Object.keys(colors).find(k => model.includes(k)) || "groq";
    return <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${colors[key]}`}>{model}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard"><button className="text-slate-500 hover:text-slate-700 text-sm">← Dashboard</button></Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">🤖 SuperAgent v2</h1>
            <p className="text-slate-500 text-sm">Multi-KI · Claude + Gemini + Groq · Memory · Autonomous</p>
          </div>
          <div className="ml-auto flex gap-2">
            {health && (
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                health.status === "healthy" ? "bg-green-100 text-green-800" :
                health.status === "warning" ? "bg-yellow-100 text-yellow-800" :
                "bg-red-100 text-red-800"
              }`}>
                {health.status === "healthy" ? "✅ Gesund" : health.status === "warning" ? "⚠️ Warnung" : "❌ Kritisch"}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Tasks erledigt", value: status?.memory?.tasks_completed || 0, icon: "⚡" },
            { label: "Tokens genutzt", value: (status?.memory?.tokens_used || 0).toLocaleString(), icon: "🔤" },
            { label: "Bekannte Issues", value: status?.memory?.known_issues?.length || 0, icon: "⚠️" },
            { label: "KI-Modelle", value: Object.values(health?.aiStatus || {}).filter(Boolean).length + "/3", icon: "🤖" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-bold text-slate-900">{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 bg-white rounded-xl p-1 shadow-sm border border-slate-100 overflow-x-auto">
          {[
            { id: "overview", label: "🏠 Übersicht" },
            { id: "ask", label: "💬 Fragen" },
            { id: "quality", label: "📋 Qualität" },
            { id: "legal", label: "⚖️ Recht" },
            { id: "memory", label: "🧠 Memory" },
            { id: "cron", label: "🌙 Nacht-Cron" },
            { id: "coaching", label: "👤 Coaching" },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === t.id ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}>{t.label}</button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* KI Status */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">🤖 KI-Modelle Status</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "Claude Haiku", key: "claude", desc: "Rechtsfragen, Analyse, Qualität", color: "orange" },
                  { name: "Gemini 2.5 Flash", key: "gemini", desc: "Didaktik, Erklärungen, Quiz", color: "blue" },
                  { name: "Groq Llama 3.3", key: "groq", desc: "Ultra-schnell, System-Checks", color: "green" },
                ].map(m => {
                  const ok = health?.aiStatus?.[m.key];
                  return (
                    <div key={m.key} className={`p-4 rounded-xl border-2 ${ok ? `border-${m.color}-200 bg-${m.color}-50` : "border-slate-200 bg-slate-50"}`}>
                      <div className="font-bold text-sm">{ok ? "✅" : "❌"} {m.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{m.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fähigkeiten */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">⚡ Agent-Fähigkeiten</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "🔍", title: "Content-Qualität prüfen", desc: "IHK-Score für jeden Lerntag (0-100)" },
                  { icon: "❓", title: "IHK-Fragen generieren", desc: "Neue MC-Fragen per KI erstellen" },
                  { icon: "💬", title: "Fragen beantworten", desc: "RAG-gestützt aus Modulinhalten" },
                  { icon: "⚖️", title: "Rechts-Monitor", desc: "Gesetzesänderungen erkennen" },
                  { icon: "🎯", title: "Lernempfehlungen", desc: "Personalisiert nach Schwachstellen" },
                  { icon: "🧠", title: "Persistent Memory", desc: "Lernt aus jeder Interaktion" },
                ].map(f => (
                  <div key={f.title} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                    <span className="text-2xl">{f.icon}</span>
                    <div><div className="font-semibold text-sm">{f.title}</div><div className="text-xs text-slate-500">{f.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Checks */}
            {health?.checks && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">🔧 System-Checks</h3>
                <div className="space-y-2">
                  {health.checks.map((c: any) => (
                    <div key={c.name} className="flex items-center justify-between text-sm py-1 border-b border-slate-50">
                      <span className="font-mono text-xs text-slate-600">{c.name}</span>
                      <span className={c.ok ? "text-green-600" : "text-red-600"}>{c.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ASK */}
        {activeTab === "ask" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">💬 Agent fragen</h3>
              <div className="flex gap-3 mb-3">
                <select value={moduleId} onChange={e => setModuleId(Number(e.target.value))}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm">
                  {[1,2,3,4,5].map(m => <option key={m} value={m}>Modul {m}</option>)}
                </select>
                <input value={question} onChange={e => setQuestion(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && askAgent()}
                  placeholder="Frage eingeben... (z.B. Was ist §34c GewO?)"
                  className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                <button onClick={askAgent} disabled={loading || !question.trim()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
                  {loading ? "⏳" : "→ Fragen"}
                </button>
              </div>
              {askResult && (
                <div className="bg-slate-50 rounded-xl p-4 mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-semibold text-sm">Antwort</span>
                    {modelBadge(askResult.model)}
                    <span className="text-xs text-slate-400">Konfidenz: {askResult.confidence}%</span>
                  </div>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{askResult.answer}</p>
                  {askResult.sources?.length > 0 && (
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {askResult.sources.map((s: string) => (
                        <span key={s} className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Frage generieren */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">❓ IHK-Frage generieren</h3>
              <div className="flex gap-3 mb-3 flex-wrap">
                <select value={genModule} onChange={e => setGenModule(Number(e.target.value))}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm">
                  {[1,2,3,4,5].map(m => <option key={m} value={m}>Modul {m}</option>)}
                </select>
                <select value={genDiff} onChange={e => setGenDiff(e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm">
                  <option value="easy">Einfach</option>
                  <option value="medium">Mittel</option>
                  <option value="hard">Schwer</option>
                </select>
                <input value={genTopic} onChange={e => setGenTopic(e.target.value)}
                  placeholder="Thema eingeben..."
                  className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                <button onClick={generateQ} disabled={loading}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
                  ✨ Generieren
                </button>
              </div>
              {genQuestion && (
                <div className="bg-purple-50 rounded-xl p-4 mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-sm">Generierte Frage</span>
                    {modelBadge(genQuestion.model)}
                  </div>
                  <p className="font-semibold text-sm mb-3">{genQuestion.question}</p>
                  <div className="space-y-1">
                    {genQuestion.options?.map((opt: string, i: number) => (
                      <div key={i} className={`text-sm px-3 py-1.5 rounded-lg ${
                        ["A","B","C","D"][i] === genQuestion.correctAnswer
                          ? "bg-green-100 text-green-800 font-semibold"
                          : "bg-white text-slate-700"
                      }`}>
                        <span className="font-bold mr-2">{["A","B","C","D"][i]}.</span>{opt}
                      </div>
                    ))}
                  </div>
                  {genQuestion.explanation && (
                    <p className="text-xs text-slate-600 mt-3 italic">{genQuestion.explanation}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* QUALITY */}
        {activeTab === "quality" && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-2">📋 Inhalts-Qualitätsprüfung</h3>
            <p className="text-sm text-slate-500 mb-4">KI prüft Lerntage auf IHK-Konformität, Normen, Didaktik.</p>
            <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
              <p className="font-semibold mb-1">🔗 Verbunden mit audit_agent.py</p>
              <p>Führe auf dem Server aus:</p>
              <code className="bg-blue-100 px-2 py-1 rounded text-xs block mt-2">
                python3 audit_agent.py --no-api
              </code>
              <p className="mt-2">Oder mit KI-Analyse (verwendet Claude Haiku):</p>
              <code className="bg-blue-100 px-2 py-1 rounded text-xs block mt-1">
                python3 audit_agent.py [modul 1-5]
              </code>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {[
                { m: 1, score: 95, label: "Einführung" },
                { m: 2, score: 94, label: "Makler §34c" },
                { m: 3, score: 95, label: "WEG & Miet" },
                { m: 4, score: 95, label: "Wertermittlung" },
                { m: 5, score: 95, label: "§34i" },
              ].map(s => (
                <div key={s.m} className={`rounded-xl p-3 text-center border-2 ${
                  s.score >= 90 ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"
                }`}>
                  <div className="text-xs text-slate-500 mb-1">M{s.m}</div>
                  <div className={`text-xl font-bold ${s.score >= 90 ? "text-green-700" : "text-yellow-700"}`}>{s.score}</div>
                  <div className="text-xs text-slate-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEGAL */}
        {activeTab === "legal" && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900">⚖️ Rechts-Monitor</h3>
                <p className="text-sm text-slate-500">KI prüft aktuelle Gesetzesänderungen</p>
              </div>
              <button onClick={checkLegal} disabled={loading}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
                {loading ? "⏳ Prüfe..." : "🔍 Jetzt prüfen"}
              </button>
            </div>
            {legalUpdates ? (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {modelBadge(legalUpdates.model)}
                </div>
                {legalUpdates.changes?.length > 0 ? (
                  <div className="space-y-2">
                    {legalUpdates.changes.map((c: any, i: number) => (
                      <div key={i} className={`p-3 rounded-lg border ${
                        c.urgency === "hoch" ? "border-red-200 bg-red-50" : "border-yellow-200 bg-yellow-50"
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{c.law}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            c.urgency === "hoch" ? "bg-red-200 text-red-800" : "bg-yellow-200 text-yellow-800"
                          }`}>{c.urgency}</span>
                          {c.modules?.map((m: number) => (
                            <span key={m} className="text-xs bg-blue-100 text-blue-800 px-1.5 rounded">M{m}</span>
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{c.impact}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-green-50 rounded-xl p-4 text-green-800 text-sm">
                    ✅ Keine aktuellen Gesetzesänderungen erkannt
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-slate-50 rounded-xl p-6 text-center text-slate-400 text-sm">
                Klicke "Jetzt prüfen" um Gesetzesänderungen zu analysieren
              </div>
            )}
          </div>
        )}

        {/* MEMORY */}
        {activeTab === "memory" && status?.memory && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">🧠 Agent Memory</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-xs text-slate-500">Tasks erledigt</div>
                  <div className="text-2xl font-bold">{status.memory.tasks_completed}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-xs text-slate-500">Tokens verbraucht</div>
                  <div className="text-2xl font-bold">{status.memory.tokens_used?.toLocaleString()}</div>
                </div>
              </div>
              {status.memory.known_issues?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">⚠️ Bekannte Issues</h4>
                  <div className="space-y-1">
                    {status.memory.known_issues.slice(0,10).map((issue: any) => (
                      <div key={issue.id} className={`text-xs p-2 rounded flex items-center gap-2 ${
                        issue.severity === "critical" ? "bg-red-50 text-red-800" : "bg-yellow-50 text-yellow-800"
                      }`}>
                        <span className="font-mono font-bold">{issue.id}</span>
                        <span>{issue.message}</span>
                        <span className="ml-auto text-slate-400">{issue.date?.slice(0,10)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {status.memory.legal_changes_detected?.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-sm mb-2">⚖️ Erkannte Rechtsänderungen</h4>
                  {status.memory.legal_changes_detected.map((c: any, i: number) => (
                    <div key={i} className="text-xs bg-blue-50 p-2 rounded mb-1">
                      <strong>{c.law}:</strong> {c.change}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-3">🔧 Agent v2 API</h3>
              <div className="space-y-1 font-mono text-xs">
                {[
                  ["GET", "/api/agent/status", "Status + Memory"],
                  ["GET", "/api/agent/health", "System Health + KI-Status"],
                  ["POST", "/api/agent/ask", "KI-Frage beantworten (RAG)"],
                  ["POST", "/api/agent/check-quality", "IHK-Qualitätsprüfung"],
                  ["POST", "/api/agent/generate-question", "Neue IHK-Frage generieren"],
                  ["POST", "/api/agent/recommend", "Lernempfehlung für Nutzer"],
                  ["GET", "/api/agent/legal-updates", "Rechts-Updates prüfen"],
                ].map(([method, path, desc]) => (
                  <div key={path} className="flex gap-3 items-center py-1 border-b border-slate-50">
                    <span className={`w-10 text-center py-0.5 rounded text-xs font-bold ${
                      method === "GET" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }`}>{method}</span>
                    <span className="text-slate-700 w-52">{path}</span>
                    <span className="text-slate-400">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CRON */}
        {activeTab === "cron" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900">🌙 Nacht-Cron</h3>
                  <p className="text-sm text-slate-500">Läuft täglich 02:00 Uhr — 240 Tage + User-Analyse</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={loadCronLog}
                    className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold">
                    📋 Log laden
                  </button>
                  <button onClick={runAudit} disabled={loading}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
                    {loading ? "⏳ Läuft..." : "▶️ Jetzt ausführen"}
                  </button>
                </div>
              </div>

              {auditResult && (
                <div className="mb-4 grid grid-cols-3 gap-3">
                  <div className="bg-green-50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-green-700">{auditResult.avgScore}/100</div>
                    <div className="text-xs text-slate-500">Ø Score</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-blue-700">{auditResult.totalDays}</div>
                    <div className="text-xs text-slate-500">Tage geprüft</div>
                  </div>
                  <div className="bg-red-50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-red-700">{auditResult.problemDays?.length || 0}</div>
                    <div className="text-xs text-slate-500">Probleme</div>
                  </div>
                </div>
              )}

              {auditResult?.problemDays?.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">⚠️ Problem-Tage</h4>
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {auditResult.problemDays.map((d: any, i: number) => (
                      <div key={i} className={`flex items-center gap-3 text-xs p-2 rounded ${
                        d.score < 60 ? "bg-red-50 text-red-800" : "bg-yellow-50 text-yellow-800"
                      }`}>
                        <span className="font-bold">M{d.module} T{d.day}</span>
                        <span className="font-semibold">{d.score}/100</span>
                        <span className="text-slate-500">{d.issues?.join(", ")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {cronLog && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">📋 Cron-Log</h4>
                  <pre className="bg-slate-900 text-green-400 text-xs p-4 rounded-xl max-h-64 overflow-y-auto font-mono whitespace-pre-wrap">
                    {cronLog}
                  </pre>
                </div>
              )}

              <div className="mt-4 bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
                <p className="font-semibold mb-1">⏰ Automatischer Zeitplan</p>
                <p>Täglich 02:00 Uhr → 240 Tage Static-Check → User-Coaching → Memory aktualisiert</p>
                <p className="mt-1 text-xs text-blue-600">Mit KI-Analyse: Manuell via Terminal: <code className="bg-blue-100 px-1 rounded">python3 audit_agent.py</code></p>
              </div>
            </div>
          </div>
        )}

        {/* COACHING */}
        {activeTab === "coaching" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900">👤 User-Coaching</h3>
                  <p className="text-sm text-slate-500">KI analysiert jeden User — Risiko, Streak, Empfehlung</p>
                </div>
                <button onClick={loadCoaching} disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
                  {loading ? "⏳" : "🔄 Laden"}
                </button>
              </div>

              {!coachingData ? (
                <div className="bg-slate-50 rounded-xl p-8 text-center text-slate-400 text-sm">
                  <div className="text-4xl mb-3">👤</div>
                  <p>Klicke "Laden" um Coaching-Profile zu sehen.</p>
                  <p className="text-xs mt-1">Wird täglich 02:00h automatisch aktualisiert.</p>
                </div>
              ) : coachingData.profiles?.length === 0 ? (
                <div className="bg-yellow-50 rounded-xl p-4 text-yellow-800 text-sm">
                  ⚠️ Noch keine aktiven User in den letzten 30 Tagen gefunden.
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: "Gesamt User", value: coachingData.totalUsers, color: "blue" },
                      { label: "Hohes Risiko", value: coachingData.profiles?.filter((p: any) => p.riskLevel === "high").length || 0, color: "red" },
                      { label: "Auf Kurs", value: coachingData.profiles?.filter((p: any) => p.riskLevel === "low").length || 0, color: "green" },
                    ].map(s => (
                      <div key={s.label} className={`bg-${s.color}-50 rounded-xl p-3 text-center`}>
                        <div className={`text-2xl font-bold text-${s.color}-700`}>{s.value}</div>
                        <div className="text-xs text-slate-500">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {coachingData.profiles?.map((p: any) => (
                      <div key={p.userId} className={`p-4 rounded-xl border-2 ${
                        p.riskLevel === "high" ? "border-red-200 bg-red-50" :
                        p.riskLevel === "medium" ? "border-yellow-200 bg-yellow-50" :
                        "border-green-200 bg-green-50"
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">
                              {p.riskLevel === "high" ? "🔴" : p.riskLevel === "medium" ? "🟡" : "🟢"}
                              {" "}User #{p.userId}
                            </span>
                            {p.badges?.map((b: string) => (
                              <span key={b} className="text-xs bg-white px-1.5 py-0.5 rounded-full border">{b}</span>
                            ))}
                          </div>
                          <div className="flex gap-3 text-xs text-slate-600">
                            <span>🔥 {p.streak} Tage</span>
                            <span>📚 {p.completedDays} Tage</span>
                            <span>🎯 {p.examAvgScore}%</span>
                          </div>
                        </div>
                        <p className="text-sm font-medium mb-1">{p.recommendation}</p>
                        <p className="text-xs text-slate-600">👉 {p.nextAction}</p>
                        {p.weakTopics?.length > 0 && (
                          <div className="mt-2 flex gap-1 flex-wrap">
                            {p.weakTopics.map((t: string) => (
                              <span key={t} className="text-xs bg-white px-1.5 py-0.5 rounded border text-slate-600">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-400 mt-3">
                    Erstellt: {coachingData.generatedAt ? new Date(coachingData.generatedAt).toLocaleString("de-DE") : "–"}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
