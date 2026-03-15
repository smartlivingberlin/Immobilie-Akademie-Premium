import { useState } from "react";
import { trpc } from "../lib/trpc";

const ALL_MODULES = [
  { id: 1, label: "Modul 1 – Grundlagen" },
  { id: 2, label: "Modul 2 – Maklerrecht §34c" },
  { id: 3, label: "Modul 3 – Immobilienbewertung" },
  { id: 4, label: "Modul 4 – Finanzierung" },
  { id: 5, label: "Modul 5 – Wohnimmobilien" },
];

function generateCode() {
  const adj = ["SMART","DEMO","TEST","VIP","PREVIEW","TRIAL","ACCESS"];
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2,6).toUpperCase();
  return `${adj[Math.floor(Math.random()*adj.length)]}-${year}-${rand}`;
}

export default function AdminCodesPage() {
  const { data: codes, refetch } = trpc.presentationCode.list.useQuery();
  const createMut = trpc.presentationCode.create.useMutation({ onSuccess: () => { refetch(); setShowForm(false); resetForm(); }});
  const deactivateMut = trpc.presentationCode.deactivate.useMutation({ onSuccess: () => refetch() });
  const activateMut = trpc.presentationCode.activate.useMutation({ onSuccess: () => refetch() });
  const deleteMut = trpc.presentationCode.delete.useMutation({ onSuccess: () => refetch() });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: generateCode(), label: "", modules: [1,2,3,4,5], expiresInDays: 7, maxUsage: 0 });

  function resetForm() { setForm({ code: generateCode(), label: "", modules: [1,2,3,4,5], expiresInDays: 7, maxUsage: 0 }); }

  function toggleModule(id: number) {
    setForm(f => ({ ...f, modules: f.modules.includes(id) ? f.modules.filter(m => m !== id) : [...f.modules, id].sort() }));
  }

  function handleCreate() {
    if (!form.code.trim() || !form.label.trim()) return;
    createMut.mutate({
      code: form.code.trim().toUpperCase(),
      label: form.label.trim(),
      modules: form.modules.join(","),
      expiresInDays: form.expiresInDays || undefined,
      maxUsage: form.maxUsage || undefined,
    });
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Präsentations-Codes</h1>
            <p className="text-slate-500 text-sm mt-1">Demo-Zugänge erstellen und verwalten</p>
          </div>
          <button onClick={() => setShowForm(v => !v)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2">
            <span>+</span> Neuer Code
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Neuen Code erstellen</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Code</label>
                <div className="flex gap-2">
                  <input value={form.code} onChange={e => setForm(f => ({...f, code: e.target.value.toUpperCase()}))} className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <button type="button" onClick={() => setForm(f => ({...f, code: generateCode()}))} className="px-3 py-2 border border-slate-300 rounded-lg text-slate-500 hover:bg-slate-50 text-sm">🔄</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bezeichnung</label>
                <input value={form.label} onChange={e => setForm(f => ({...f, label: e.target.value}))} placeholder="z.B. Messe Berlin März 2026" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Gültig für (Tage)</label>
                <input type="number" value={form.expiresInDays} onChange={e => setForm(f => ({...f, expiresInDays: parseInt(e.target.value)||0}))} min={0} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <p className="text-xs text-slate-400 mt-1">0 = kein Ablauf</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Max. Nutzungen</label>
                <input type="number" value={form.maxUsage} onChange={e => setForm(f => ({...f, maxUsage: parseInt(e.target.value)||0}))} min={0} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <p className="text-xs text-slate-400 mt-1">0 = unbegrenzt</p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Module freischalten</label>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setForm(f => ({...f, modules: [1,2,3,4,5]}))} className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium">Alle</button>
                  <button type="button" onClick={() => setForm(f => ({...f, modules: []}))} className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">Keine</button>
                  {ALL_MODULES.map(m => (
                    <button key={m.id} type="button" onClick={() => toggleModule(m.id)} className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${form.modules.includes(m.id) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'}`}>
                      M{m.id}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-1">Freigegeben: Module {form.modules.join(", ") || "–"}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleCreate} disabled={createMut.isPending} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors">
                {createMut.isPending ? "Erstelle…" : "Code erstellen"}
              </button>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="px-6 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 text-sm">Abbrechen</button>
            </div>
          </div>
        )}

        {/* Codes Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">Code</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Bezeichnung</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Module</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Ablauf</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Nutzungen</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!codes || codes.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-slate-400">Noch keine Codes vorhanden</td></tr>
              ) : codes.map((c: any) => {
                const expired = c.expiresAt && new Date(c.expiresAt) < new Date();
                const active = c.isActive && !expired;
                return (
                  <tr key={c.id} className={`hover:bg-slate-50 ${!active ? 'opacity-60' : ''}`}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-slate-800">{c.code}</span>
                        <button onClick={() => copyCode(c.code)} title="Kopieren" className="text-slate-400 hover:text-blue-600 text-xs">📋</button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{c.label || "–"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {(c.enabledModules || "1").split(",").map((m: string) => (
                          <span key={m} className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">M{m.trim()}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {c.expiresAt ? (
                        <span className={expired ? "text-red-500" : "text-green-600"}>
                          {expired ? "⚠ " : "✓ "}{new Date(c.expiresAt).toLocaleDateString("de-DE")}
                        </span>
                      ) : <span className="text-slate-400">Kein Ablauf</span>}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {c.usageCount || 0}{c.maxUsage ? ` / ${c.maxUsage}` : ""}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {active ? "Aktiv" : expired ? "Abgelaufen" : "Deaktiviert"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {c.isActive ? (
                          <button onClick={() => deactivateMut.mutate({ id: c.id })} className="text-xs px-3 py-1 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200">Sperren</button>
                        ) : (
                          <button onClick={() => activateMut.mutate({ id: c.id })} className="text-xs px-3 py-1 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border border-green-200">Aktivieren</button>
                        )}
                        <button onClick={() => { if(confirm(`Code "${c.code}" löschen?`)) deleteMut.mutate({ id: c.id }); }} className="text-xs px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200">Löschen</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Codes werden bei Eingabe auf der Login-Seite eingelöst • Session-Cookie wird gesetzt • Zugang gilt für die Laufzeit des Codes
        </p>
      </div>
    </div>
  );
}
