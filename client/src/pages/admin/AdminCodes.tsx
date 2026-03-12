import { useState } from "react";
import { trpc } from "@/lib/trpc";

function generateCode() {
  const prefix = ["SMART","DEMO","VIP","PREVIEW","TRIAL","ACCESS","MESSE"];
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2,6).toUpperCase();
  return `${prefix[Math.floor(Math.random()*prefix.length)]}-${year}-${rand}`;
}

const MODULE_LIST = [1,2,3,4,5];

export default function AdminCodes() {
  const [code, setCode] = useState(generateCode());
  const [label, setLabel] = useState("");
  const [modules, setModules] = useState([1,2,3,4,5]);
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [maxUsage, setMaxUsage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState<string|null>(null);

  const { data: codes, refetch } = trpc.presentationCode.list.useQuery();
  const create = trpc.presentationCode.create.useMutation({ onSuccess: () => { refetch(); setShowForm(false); setCode(generateCode()); setLabel(""); setModules([1,2,3,4,5]); }});
  const deactivate = trpc.presentationCode.deactivate.useMutation({ onSuccess: () => refetch() });
  const activate = trpc.presentationCode.activate.useMutation({ onSuccess: () => refetch() });
  const del = trpc.presentationCode.delete.useMutation({ onSuccess: () => refetch() });

  function toggleModule(id: number) {
    setModules(m => m.includes(id) ? m.filter(x => x !== id) : [...m, id].sort((a,b)=>a-b));
  }

  function copyCode(c: string) {
    navigator.clipboard.writeText(c);
    setCopied(c);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Präsentations-Codes</h1>
          <p className="text-slate-500 text-sm mt-1">Demo-Zugänge für Interessenten und Präsentationen</p>
        </div>
        <button onClick={() => setShowForm(v => !v)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
          + Neuer Code
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Neuen Code erstellen</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Code</label>
              <div className="flex gap-2">
                <input value={code} onChange={e => setCode(e.target.value.toUpperCase())} className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="button" onClick={() => setCode(generateCode())} className="px-3 py-2 border border-slate-300 rounded-lg text-slate-500 hover:bg-slate-50 text-sm">🎲</button>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Bezeichnung</label>
              <input value={label} onChange={e => setLabel(e.target.value)} placeholder="z.B. Messe Berlin März 2026" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Gültig für (Tage, 0 = kein Ablauf)</label>
              <input type="number" value={expiresInDays} onChange={e => setExpiresInDays(parseInt(e.target.value)||0)} min={0} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Max. Nutzungen (0 = unbegrenzt)</label>
              <input type="number" value={maxUsage} onChange={e => setMaxUsage(parseInt(e.target.value)||0)} min={0} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-slate-600 block mb-2">Module freischalten</label>
              <div className="flex gap-2 flex-wrap">
                <button type="button" onClick={() => setModules([1,2,3,4,5])} className="text-xs px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium hover:bg-blue-200">Alle</button>
                <button type="button" onClick={() => setModules([])} className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">Keine</button>
                {MODULE_LIST.map(id => (
                  <button key={id} type="button" onClick={() => toggleModule(id)} className={`text-xs px-4 py-1.5 rounded-full border font-semibold transition-colors ${modules.includes(id) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'}`}>
                    Modul {id}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-1.5">Freigeschaltet: {modules.length > 0 ? `Module ${modules.join(", ")}` : "Keine Module gewählt"}</p>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={() => create.mutate({ code: code.trim(), label: label.trim(), modules: modules.join(","), expiresInDays: expiresInDays || undefined, maxUsage: maxUsage || undefined })} disabled={!code.trim() || !label.trim() || create.isPending} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-semibold text-sm">
              {create.isPending ? "Erstelle…" : "✅ Code erstellen"}
            </button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 text-sm">Abbrechen</button>
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
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
            {(!codes || (codes as any[]).length === 0) ? (
              <tr><td colSpan={7} className="text-center py-12 text-slate-400">Noch keine Codes vorhanden</td></tr>
            ) : (codes as any[]).map((c) => {
              const expired = c.expiresAt && new Date(c.expiresAt) < new Date();
              const active = c.isActive && !expired;
              return (
                <tr key={c.id} className={`hover:bg-slate-50 transition-colors ${!active ? 'opacity-55' : ''}`}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-700">{c.code}</span>
                      <button onClick={() => copyCode(c.code)} className="text-slate-400 hover:text-blue-600 transition-colors" title="Kopieren">
                        {copied === c.code ? "✅" : "📋"}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{c.label || "–"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {(c.enabledModules || "1").split(",").map((m: string) => (
                        <span key={m} className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-semibold">M{m.trim()}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {c.expiresAt ? (
                      <span className={expired ? "text-red-500 font-medium" : "text-green-600"}>
                        {expired ? "⚠ " : "✓ "}{new Date(c.expiresAt).toLocaleDateString("de-DE")}
                      </span>
                    ) : <span className="text-slate-400">Kein Ablauf</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-sm">
                    {c.usageCount ?? 0}{c.maxUsage ? ` / ${c.maxUsage}` : ""}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {active ? "Aktiv" : expired ? "Abgelaufen" : "Deaktiviert"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      {c.isActive ? (
                        <button onClick={() => deactivate.mutate({ id: c.id })} className="text-xs px-3 py-1 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 font-medium">Sperren</button>
                      ) : (
                        <button onClick={() => activate.mutate({ id: c.id })} className="text-xs px-3 py-1 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 font-medium">Aktivieren</button>
                      )}
                      <button onClick={() => { if(confirm(`"${c.code}" löschen?`)) del.mutate({ id: c.id }); }} className="text-xs px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-medium">Löschen</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-center text-xs text-slate-400 mt-4">Codes werden auf der Login-Seite unter "Präsentations-Code eingeben" eingelöst</p>
    </div>
  );
}
