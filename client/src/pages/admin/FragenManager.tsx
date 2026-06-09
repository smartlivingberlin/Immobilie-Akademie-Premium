import { useState } from "react";
import { scaledFontSize as fz } from "@/lib/a11yFont";
import { trpc } from "@/lib/trpc";
import { Search, Trash2, Edit3, CheckCircle, XCircle, ChevronDown, Filter, BookOpen } from "lucide-react";

const MODULE_NAMES: Record<number, string> = {
  1: "M1 Einführung", 2: "M2 Makler §34c", 3: "M3 WEG & Mietrecht",
  4: "M4 Gutachter", 5: "M5 Darlehen §34i",
};
const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "#059669", medium: "#d97706", hard: "#dc2626",
};

export default function FragenManager() {
  const [filterModule, setFilterModule] = useState(0);
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 20;

  const { data, refetch, isLoading } = trpc.adminQuestions.list.useQuery({
    moduleId: filterModule || undefined,
    difficulty: filterDifficulty || undefined,
    search: search || undefined,
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
  });

  const deleteMutation = trpc.adminQuestions.delete.useMutation({ onSuccess: () => refetch() });
  const updateMutation = trpc.adminQuestions.update.useMutation({
    onSuccess: () => { setEditId(null); refetch(); }
  });

  const questions = data?.questions || [];
  const total = data?.total || 0;

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 20px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: fz(24), fontWeight: 700, color: "#0f172a", margin: 0 }}>Fragen-Manager</h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: fz(14) }}>{total} Prüfungsfragen — filtern, bearbeiten, löschen</p>
      </div>

      {/* Filter-Leiste */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: "#94a3b8" }} />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}
            placeholder="Frage suchen..."
            style={{ width: "100%", padding: "8px 8px 8px 32px", border: "0.5px solid #e2e8f0", borderRadius: 8, fontSize: fz(13), background: "#fff" }} />
        </div>
        <select value={filterModule} onChange={e => { setFilterModule(Number(e.target.value)); setPage(0); }}
          style={{ padding: "8px 12px", border: "0.5px solid #e2e8f0", borderRadius: 8, fontSize: fz(13), background: "#fff" }}>
          <option value={0}>Alle Module</option>
          {[1,2,3,4,5].map(m => <option key={m} value={m}>{MODULE_NAMES[m]}</option>)}
        </select>
        <select value={filterDifficulty} onChange={e => { setFilterDifficulty(e.target.value); setPage(0); }}
          style={{ padding: "8px 12px", border: "0.5px solid #e2e8f0", borderRadius: 8, fontSize: fz(13), background: "#fff" }}>
          <option value="">Alle Schwierigkeiten</option>
          <option value="easy">Einfach</option>
          <option value="medium">Mittel</option>
          <option value="hard">Schwer</option>
        </select>
      </div>

      {/* Fragen-Liste */}
      {isLoading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Lädt...</div>
      ) : (
        <div style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 12 }}>
          {questions.map((q: any, i: number) => (
            <div key={q.id} style={{ padding: "14px 16px", borderBottom: i < questions.length-1 ? "0.5px solid #f1f5f9" : "none" }}>
              {editId === q.id ? (
                <div>
                  <textarea value={editText} onChange={e => setEditText(e.target.value)}
                    style={{ width: "100%", padding: 8, border: "1px solid #2563eb", borderRadius: 8, fontSize: fz(13), minHeight: 80, marginBottom: 8 }} />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => updateMutation.mutate({ id: q.id, questionText: editText })}
                      style={{ padding: "5px 12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, fontSize: fz(12), cursor: "pointer" }}>Speichern</button>
                    <button onClick={() => setEditId(null)}
                      style={{ padding: "5px 12px", background: "#f1f5f9", color: "#374151", border: "none", borderRadius: 6, fontSize: fz(12), cursor: "pointer" }}>Abbrechen</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: fz(10), padding: "2px 8px", borderRadius: 20, background: "#e2e8f0", color: "#374151", fontWeight: 500 }}>
                        {MODULE_NAMES[q.moduleId] || `M${q.moduleId}`}
                      </span>
                      <span style={{ fontSize: fz(10), padding: "2px 8px", borderRadius: 20, background: DIFFICULTY_COLORS[q.difficulty] + "20", color: DIFFICULTY_COLORS[q.difficulty], fontWeight: 500 }}>
                        {q.difficulty}
                      </span>
                      <span style={{ fontSize: fz(10), color: "#94a3b8" }}>{q.category}</span>
                    </div>
                    <div style={{ fontSize: fz(13), color: "#374151", lineHeight: 1.5 }}>{q.questionText}</div>
                  </div>
                  <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                    <button onClick={() => { setEditId(q.id); setEditText(q.questionText); }}
                      style={{ padding: 6, background: "none", border: "0.5px solid #e2e8f0", borderRadius: 6, cursor: "pointer", color: "#64748b" }}>
                      <Edit3 size={13} />
                    </button>
                    <button onClick={() => { if (confirm("Frage löschen?")) deleteMutation.mutate({ id: q.id }); }}
                      style={{ padding: 6, background: "none", border: "0.5px solid #fee2e2", borderRadius: 6, cursor: "pointer", color: "#dc2626" }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {questions.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>Keine Fragen gefunden</div>
          )}
        </div>
      )}

      {/* Pagination */}
      {total > PAGE_SIZE && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
          <button onClick={() => setPage(p => Math.max(0, p-1))} disabled={page === 0}
            style={{ padding: "6px 14px", border: "0.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontSize: fz(12) }}>← Zurück</button>
          <span style={{ padding: "6px 12px", fontSize: fz(12), color: "#64748b" }}>
            {page*PAGE_SIZE+1}–{Math.min((page+1)*PAGE_SIZE, total)} von {total}
          </span>
          <button onClick={() => setPage(p => p+1)} disabled={(page+1)*PAGE_SIZE >= total}
            style={{ padding: "6px 14px", border: "0.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontSize: fz(12) }}>Weiter →</button>
        </div>
      )}
    </div>
  );
}
