import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function AdminCodes() {
  const [code, setCode] = useState("");
  const [modules, setModules] = useState("1,2,3,4,5");
  const [maxUses, setMaxUses] = useState(1);
  const [note, setNote] = useState("");

  const { data: codes, refetch } = trpc.adminCodes.list.useQuery();

  const create = trpc.adminCodes.create.useMutation({ onSuccess: () => { refetch(); setCode(""); setNote(""); } });
  const remove = trpc.adminCodes.delete.useMutation({ onSuccess: () => refetch() });
  const toggle = trpc.adminCodes.toggle.useMutation({ onSuccess: () => refetch() });

  const generateCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
      if (i === 4 || i === 8) result += "-";
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    setCode(result);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Freischalt-Codes verwalten</h1>

      {/* Neuen Code erstellen */}
      <div className="bg-white border rounded-xl p-5 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Neuen Code erstellen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">Code</label>
            <div className="flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Z.B. MAKLER-2026-AB"
                className="flex-1 border rounded-lg px-3 py-2 text-sm font-mono"
              />
              <button onClick={generateCode} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg text-sm font-medium">
                🎲 Generieren
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">Module (kommagetrennt)</label>
            <input
              value={modules}
              onChange={(e) => setModules(e.target.value)}
              placeholder="1,2,3,4,5"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">Max. Nutzungen (0 = unbegrenzt)</label>
            <input
              type="number"
              value={maxUses}
              onChange={(e) => setMaxUses(Number(e.target.value))}
              min={0}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">Notiz (optional)</label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Z.B. Für Kurs-Teilnehmer Gruppe A"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>
        <button
          onClick={() => create.mutate({ code, modules, maxUses, note })}
          disabled={!code.trim() || create.isPending}
          className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-2 rounded-lg text-sm transition"
        >
          {create.isPending ? "Erstelle..." : "✅ Code erstellen"}
        </button>
      </div>

      {/* Bestehende Codes */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Code</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Module</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Nutzungen</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Notiz</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {(codes ?? []).map((c) => (
              <tr key={c.id} className="border-b hover:bg-slate-50">
                <td className="px-4 py-3 font-mono font-bold text-blue-700">{c.code}</td>
                <td className="px-4 py-3">{c.modules}</td>
                <td className="px-4 py-3">{c.usedCount} / {c.maxUses === 0 ? "∞" : c.maxUses}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{c.note || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {c.isActive ? "Aktiv" : "Deaktiviert"}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => toggle.mutate({ id: c.id, isActive: !c.isActive })}
                    className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded"
                  >
                    {c.isActive ? "Deaktivieren" : "Aktivieren"}
                  </button>
                  <button
                    onClick={() => { if (confirm("Code löschen?")) remove.mutate({ id: c.id }); }}
                    className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded"
                  >
                    Löschen
                  </button>
                </td>
              </tr>
            ))}
            {(codes ?? []).length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">Noch keine Codes vorhanden</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
