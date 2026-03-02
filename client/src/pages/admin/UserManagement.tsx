import { useState } from "react";
import { trpc } from "@/lib/trpc";

const MODULE_OPTIONS = [1, 2, 3, 4, 5];

export default function UserManagement() {
  const { data: users, refetch, isLoading } = trpc.adminUsers.list.useQuery();
  const setModules = trpc.adminUsers.setModules.useMutation({ onSuccess: () => refetch() });
  const setRole = trpc.adminUsers.setRole.useMutation({ onSuccess: () => refetch() });
  const deleteUser = trpc.adminUsers.deleteUser.useMutation({ onSuccess: () => refetch() });
  const [search, setSearch] = useState("");

  const filtered = (users ?? []).filter(u =>
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleModule = (userId: number, currentModules: string, moduleId: number) => {
    const current = currentModules.split(",").map(Number).filter(Boolean);
    const updated = current.includes(moduleId)
      ? current.filter(m => m !== moduleId)
      : [...current, moduleId].sort();
    setModules.mutate({ userId, modules: updated.join(",") });
  };

  if (isLoading) return <div className="p-8 text-center">Lädt...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nutzerverwaltung</h1>
      <input type="text" placeholder="Suche..." value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 mb-4 text-sm" />
      <div className="text-sm text-slate-500 mb-4">{filtered.length} Nutzer</div>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left p-3">Name / E-Mail</th>
              <th className="text-left p-3">Rolle</th>
              <th className="text-left p-3">Module</th>
              <th className="text-left p-3">Registriert</th>
              <th className="text-left p-3">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.id} className="border-b hover:bg-slate-50">
                <td className="p-3">
                  <div className="font-medium">{user.name ?? "—"}</div>
                  <div className="text-slate-400 text-xs">{user.email}</div>
                </td>
                <td className="p-3">
                  <select value={user.role}
                    onChange={e => setRole.mutate({ userId: user.id, role: e.target.value as any })}
                    className="border rounded px-2 py-1 text-xs">
                    <option value="user">Nutzer</option>
                    <option value="trainer">Trainer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-3">
                  <div className="flex gap-1">
                    {MODULE_OPTIONS.map(m => {
                      const enabled = user.enabledModules?.split(",").map(Number).includes(m);
                      return (
                        <button key={m}
                          onClick={() => toggleModule(user.id, user.enabledModules ?? "1", m)}
                          className={`w-7 h-7 rounded text-xs font-bold border ${enabled ? "bg-blue-600 text-white" : "bg-white text-slate-400 border-slate-200"}`}>
                          {m}
                        </button>
                      );
                    })}
                  </div>
                </td>
                <td className="p-3 text-slate-400 text-xs">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString("de-DE") : "—"}
                </td>
                <td className="p-3">
                  <button onClick={() => { if (confirm("Wirklich löschen?")) deleteUser.mutate({ userId: user.id }); }}
                    className="text-red-500 text-xs border border-red-200 rounded px-2 py-1">
                    Löschen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
