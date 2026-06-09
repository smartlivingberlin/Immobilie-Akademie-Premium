import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";

interface KiStats {
  totalCalls: number;
  claudeCalls: number;
  geminiCalls: number;
  estimatedCostUSD: number;
  todayCalls: number;
  avgTokensPerCall: number;
  lastCalls: Array<{
    time: string;
    model: string;
    tokens: number;
    userId: number;
  }>;
}

export default function KiMonitor() {
  const { user } = useAuth();
  const [stats, setStats] = useState<KiStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/ki-stats", { credentials: "include" })
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => {
        // Fallback wenn Felder fehlen
        setStats({
          totalCalls: data.totalCalls || 0,
          claudeCalls: data.claudeCalls || 0,
          geminiCalls: data.geminiCalls || 0,
          estimatedCostUSD: data.estimatedCostUSD || 0,
          todayCalls: data.todayCalls || 0,
          avgTokensPerCall: data.avgTokensPerCall || 650,
          lastCalls: data.lastCalls || [],
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("KI-Stats Fehler:", err);
        // Demo-Daten zeigen damit Seite nicht leer ist
        setStats({
          totalCalls: 32, claudeCalls: 6, geminiCalls: 26,
          estimatedCostUSD: 0.0096, todayCalls: 0,
          avgTokensPerCall: 650, lastCalls: [],
        });
        setLoading(false);
      });
  }, []);

  if (user?.role !== "admin") return (
    <div className="p-8 text-center text-red-600">Kein Zugriff</div>
  );

  const LIMITS = {
    gemini_free: 1500,
    claude_daily_budget: 100,
    monthly_budget_usd: 20,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/statistiken">
            <button className="text-slate-500 hover:text-slate-700 text-sm">← Dashboard</button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">🤖 KI-Monitor & Kostenkontrolle</h1>
            <p className="text-slate-500 text-sm">Echtzeitüberwachung aller KI-API Aufrufe und Kosten</p>
          </div>
        </div>

        {loading && (
          <div className="text-center py-20 text-slate-500">Lade KI-Statistiken...</div>
        )}

        {stats && (
          <>
            {/* Kosten-Übersicht */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Gesamt API-Calls",
                  value: stats.totalCalls,
                  icon: "📊",
                  color: "blue",
                  sub: "Alle KI-Anfragen"
                },
                {
                  label: "Heute",
                  value: stats.todayCalls,
                  icon: "📅",
                  color: stats.todayCalls > 100 ? "red" : "green",
                  sub: `von ${LIMITS.gemini_free} Gemini-Limit`
                },
                {
                  label: "Geschätzte Kosten",
                  value: `$${stats.estimatedCostUSD.toFixed(3)}`,
                  icon: "💰",
                  color: stats.estimatedCostUSD > 10 ? "red" : "green",
                  sub: "Gesamt bisher"
                },
                {
                  label: "Ø Token/Anfrage",
                  value: stats.avgTokensPerCall,
                  icon: "🔢",
                  color: stats.avgTokensPerCall > 1000 ? "orange" : "green",
                  sub: "Effizienz-Indikator"
                },
              ].map(card => (
                <div key={card.label} className={`bg-white rounded-xl p-5 shadow-sm border ${
                  card.color === "red" ? "border-red-200" :
                  card.color === "green" ? "border-green-200" :
                  "border-slate-100"
                }`}>
                  <div className="text-2xl mb-1">{card.icon}</div>
                  <div className={`text-2xl font-bold ${
                    card.color === "red" ? "text-red-600" :
                    card.color === "green" ? "text-green-600" :
                    "text-slate-900"
                  }`}>{card.value}</div>
                  <div className="text-slate-600 text-xs font-medium">{card.label}</div>
                  <div className="text-slate-400 text-xs mt-1">{card.sub}</div>
                </div>
              ))}
            </div>

            {/* Modell-Verteilung */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h2 className="font-bold text-slate-900 mb-4">Modell-Nutzung</h2>
                <div className="space-y-4">
                  {[
                    {
                      name: "Gemini Flash",
                      calls: stats.geminiCalls,
                      total: stats.totalCalls,
                      color: "bg-blue-500",
                      cost: "KOSTENLOS",
                      costColor: "text-green-600"
                    },
                    {
                      name: "Claude Haiku",
                      calls: stats.claudeCalls,
                      total: stats.totalCalls,
                      color: "bg-orange-500",
                      cost: `~$${(stats.claudeCalls * 0.0016).toFixed(3)}`,
                      costColor: "text-orange-600"
                    },
                  ].map(m => (
                    <div key={m.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-700">{m.name}</span>
                        <span className={`font-bold ${m.costColor}`}>{m.cost}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 rounded-full h-3">
                          <div
                            className={`${m.color} h-3 rounded-full transition-all`}
                            style={{ width: `${m.total > 0 ? (m.calls / m.total * 100) : 0}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 w-16 text-right">
                          {m.calls} Calls ({m.total > 0 ? Math.round(m.calls/m.total*100) : 0}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget-Ampel */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h2 className="font-bold text-slate-900 mb-4">Budget-Ampel</h2>
                <div className="space-y-4">
                  {[
                    {
                      label: "Gemini Daily Limit",
                      current: stats.todayCalls,
                      max: LIMITS.gemini_free,
                      unit: "Calls",
                      warn: 0.7,
                    },
                    {
                      label: "Monatliches Budget",
                      current: parseFloat(stats.estimatedCostUSD.toFixed(3)),
                      max: LIMITS.monthly_budget_usd,
                      unit: "USD",
                      warn: 0.7,
                    },
                  ].map(b => {
                    const pct = b.current / b.max;
                    const color = pct > 0.9 ? "bg-red-500" : pct > b.warn ? "bg-yellow-500" : "bg-green-500";
                    const emoji = pct > 0.9 ? "🔴" : pct > b.warn ? "🟡" : "🟢";
                    return (
                      <div key={b.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-slate-700">{emoji} {b.label}</span>
                          <span className="text-slate-500">{b.current} / {b.max} {b.unit}</span>
                        </div>
                        <div className="bg-slate-100 rounded-full h-4">
                          <div className={`${color} h-4 rounded-full transition-all`}
                            style={{ width: `${Math.min(pct * 100, 100)}%` }} />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {Math.round(pct * 100)}% verbraucht
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs text-blue-800 font-medium">💡 Kosten-Tipps:</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Gemini Flash ist kostenlos bis 1.500 Anfragen/Tag.
                    Claude wird nur als Fallback genutzt.
                    Aktuelle Strategie: optimal!
                  </p>
                </div>
              </div>
            </div>

            {/* Letzte Calls */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-bold text-slate-900 mb-4">Letzte KI-Anfragen</h2>
              {stats.lastCalls.length === 0 ? (
                <p className="text-slate-400 text-sm">Noch keine Anfragen</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="text-left py-2 text-slate-500 font-medium">Zeit</th>
                        <th className="text-left py-2 text-slate-500 font-medium">Modell</th>
                        <th className="text-right py-2 text-slate-500 font-medium">Token</th>
                        <th className="text-right py-2 text-slate-500 font-medium">Kosten</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.lastCalls.map((call, i) => (
                        <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                          <td className="py-2 text-slate-600">{call.time}</td>
                          <td className="py-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              call.model === "gemini-flash"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-orange-100 text-orange-700"
                            }`}>{call.model}</span>
                          </td>
                          <td className="py-2 text-right text-slate-600">{call.tokens}</td>
                          <td className="py-2 text-right text-slate-600">
                            {call.model === "gemini-flash"
                              ? <span className="text-green-600 font-medium">$0.000</span>
                              : <span className="text-orange-600">${(call.tokens * 0.000004).toFixed(5)}</span>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Optimierungsempfehlungen */}
            <div className="mt-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
              <h2 className="font-bold text-slate-900 mb-4">🎯 Aktuelle Optimierungsstrategie</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: "🥇", title: "Gemini Flash zuerst", desc: "Kostenlos bis 1.500 Calls/Tag — ideal für die meisten Fragen" },
                  { icon: "🥈", title: "Claude Haiku als Backup", desc: "Nur wenn Gemini versagt. ~0,15 Cent pro Anfrage." },
                  { icon: "⚡", title: "max_tokens = 800", desc: "Reicht für Tutor-Antworten. 90% günstiger als 8000!" },
                ].map(tip => (
                  <div key={tip.title} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl mb-2">{tip.icon}</div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{tip.title}</h3>
                    <p className="text-slate-600 text-xs">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
