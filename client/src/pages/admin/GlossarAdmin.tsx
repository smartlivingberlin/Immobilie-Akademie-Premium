import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Plus, Pencil, Trash2, Save, X } from "lucide-react";

type GlossarTerm = {
  id: number;
  term: string;
  definition: string;
  category: string;
  lawReference?: string;
  lawLink?: string;
};

const CATEGORIES = ["Recht", "Finanzierung", "Bau", "Verwaltung", "Makler", "Allgemein"];

export default function GlossarAdmin() {
  const [terms, setTerms] = useState<GlossarTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState({ term: "", definition: "", category: "Recht", lawReference: "", lawLink: "" });
  const [saving, setSaving] = useState(false);

  const load = () => {
    fetch("/api/glossar")
      .then(r => r.json())
      .then(d => { setTerms(d.terms || []); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    setSaving(true);
    const url = editId ? "/api/admin/glossar/" + editId : "/api/admin/glossar";
    const method = editId ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(form) });
    setSaving(false);
    setEditId(null);
    setShowNew(false);
    setForm({ term: "", definition: "", category: "Recht", lawReference: "", lawLink: "" });
    load();
  };

  const del = async (id: number) => {
    if (!confirm("Begriff wirklich loeschen?")) return;
    await fetch("/api/admin/glossar/" + id, { method: "DELETE", credentials: "include" });
    load();
  };

  const startEdit = (t: GlossarTerm) => {
    setEditId(t.id);
    setShowNew(false);
    setForm({ term: t.term, definition: t.definition, category: t.category, lawReference: t.lawReference || "", lawLink: t.lawLink || "" });
  };

  const filtered = terms.filter(t => t.term.toLowerCase().includes(filter.toLowerCase()) || t.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <Link href="/admin"><ArrowLeft size={20} style={{ cursor: "pointer", color: "#64748b" }} /></Link>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Glossar-Manager</h1>
        <span style={{ background: "#f1f5f9", padding: "2px 10px", borderRadius: 20, fontSize: 13, color: "#64748b" }}>{terms.length} Begriffe</span>
        <button onClick={() => { setShowNew(true); setEditId(null); setForm({ term: "", definition: "", category: "Recht", lawReference: "", lawLink: "" }); }}
          style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, background: "#0f766e", color: "white", border: "none", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
          <Plus size={16} /> Neuer Begriff
        </button>
      </div>

      {(showNew || editId !== null) && (
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h3 style={{ margin: "0 0 16px" }}>{editId ? "Begriff bearbeiten" : "Neuer Begriff"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>Begriff *</label>
              <input value={form.term} onChange={e => setForm(p => ({...p, term: e.target.value}))}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8, marginTop: 4, boxSizing: "border-box" as any }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>Kategorie *</label>
              <select value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8, marginTop: 4, boxSizing: "border-box" as any }}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>Definition *</label>
            <textarea value={form.definition} onChange={e => setForm(p => ({...p, definition: e.target.value}))} rows={3}
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8, marginTop: 4, boxSizing: "border-box" as any, resize: "vertical" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>Gesetzesreferenz</label>
              <input value={form.lawReference} onChange={e => setForm(p => ({...p, lawReference: e.target.value}))}
                placeholder="z.B. § 34c GewO"
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8, marginTop: 4, boxSizing: "border-box" as any }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>Gesetz-Link</label>
              <input value={form.lawLink} onChange={e => setForm(p => ({...p, lawLink: e.target.value}))}
                placeholder="https://..."
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8, marginTop: 4, boxSizing: "border-box" as any }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={save} disabled={saving || !form.term || !form.definition}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "#0f766e", color: "white", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 600, opacity: saving ? 0.7 : 1 }}>
              <Save size={16} /> {saving ? "Speichern..." : "Speichern"}
            </button>
            <button onClick={() => { setEditId(null); setShowNew(false); }}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "#f1f5f9", color: "#64748b", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer" }}>
              <X size={16} /> Abbrechen
            </button>
          </div>
        </div>
      )}

      <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Begriff oder Kategorie suchen..."
        style={{ width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: 10, marginBottom: 16, boxSizing: "border-box" as any, fontSize: 14 }} />

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Laden...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(t => (
            <div key={t.id} style={{ background: editId === t.id ? "#f0fdf4" : "white", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{t.term}</span>
                  <span style={{ background: "#f1f5f9", color: "#64748b", fontSize: 11, padding: "2px 8px", borderRadius: 20 }}>{t.category}</span>
                  {t.lawReference && <span style={{ color: "#0f766e", fontSize: 11, fontWeight: 600 }}>{t.lawReference}</span>}
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{t.definition.slice(0, 120)}{t.definition.length > 120 ? "..." : ""}</p>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button onClick={() => startEdit(t)}
                  style={{ background: "#f1f5f9", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer", color: "#475569" }}>
                  <Pencil size={14} />
                </button>
                <button onClick={() => del(t.id)}
                  style={{ background: "#fef2f2", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer", color: "#dc2626" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
