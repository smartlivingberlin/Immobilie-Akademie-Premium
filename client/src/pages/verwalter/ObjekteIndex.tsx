import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Building2, Plus, Trash2, Pencil } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VerwalterObjekt } from "@shared/verwalterObjektTypes";

const emptyForm = {
  name: "",
  adresse: "",
  plz: "",
  ort: "",
  einheitenAnzahl: "0",
  verwalterName: "",
  verwalterAdresse: "",
  kontaktEmail: "",
  kontaktTelefon: "",
  notizen: "",
};

export default function ObjekteIndex() {
  const [objekte, setObjekte] = useState<VerwalterObjekt[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/verwalter/objekte", { credentials: "include" });
      const data = await res.json();
      if (data.success) setObjekte(data.objekte);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
    setError(null);
  };

  const openEdit = (o: VerwalterObjekt) => {
    setEditId(o.id);
    setForm({
      name: o.name,
      adresse: o.adresse,
      plz: o.plz,
      ort: o.ort,
      einheitenAnzahl: String(o.einheitenAnzahl),
      verwalterName: o.verwalterName,
      verwalterAdresse: o.verwalterAdresse,
      kontaktEmail: o.kontaktEmail ?? "",
      kontaktTelefon: o.kontaktTelefon ?? "",
      notizen: o.notizen ?? "",
    });
    setShowForm(true);
    setError(null);
  };

  const save = async () => {
    if (!form.name.trim() || !form.adresse.trim()) {
      setError("Name und Adresse sind Pflichtfelder.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const body = {
        ...form,
        einheitenAnzahl: Number(form.einheitenAnzahl) || 0,
      };
      const res = await fetch(
        editId ? `/api/verwalter/objekte/${editId}` : "/api/verwalter/objekte",
        {
          method: editId ? "PUT" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Speichern fehlgeschlagen");
      setShowForm(false);
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Objekt wirklich löschen?")) return;
    await fetch(`/api/verwalter/objekte/${id}`, { method: "DELETE", credentials: "include" });
    await load();
  };

  return (
    <>
      <SEO title="WEG-Objekte — Verwalter-Rechner" />
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">WEG-Objekte</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Stammdaten für Vorlagen und KI-Briefe — pro Konto gespeichert.
            </p>
          </div>
          <Button onClick={openCreate} className="min-h-[44px] gap-2 shrink-0">
            <Plus className="h-4 w-4" /> Neues Objekt
          </Button>
        </div>

        {showForm && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <h2 className="mb-4 font-semibold">{editId ? "Objekt bearbeiten" : "Neues WEG-Objekt"}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["name", "WEG-Name / Bezeichnung", "text"],
                  ["adresse", "Straße", "text"],
                  ["plz", "PLZ", "text"],
                  ["ort", "Ort", "text"],
                  ["einheitenAnzahl", "Anzahl Einheiten", "number"],
                  ["verwalterName", "Verwaltung", "text"],
                  ["kontaktEmail", "E-Mail", "email"],
                  ["kontaktTelefon", "Telefon", "tel"],
                ] as const
              ).map(([key, label, type]) => (
                <div key={key} className={key === "name" ? "sm:col-span-2" : ""}>
                  <Label htmlFor={key}>{label}</Label>
                  <Input
                    id={key}
                    type={type}
                    className="mt-1 min-h-[44px]"
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <Label htmlFor="verwalterAdresse">Anschrift Verwaltung</Label>
                <textarea
                  id="verwalterAdresse"
                  className="mt-1 min-h-[72px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.verwalterAdresse}
                  onChange={(e) => setForm((f) => ({ ...f, verwalterAdresse: e.target.value }))}
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="notizen">Notizen</Label>
                <textarea
                  id="notizen"
                  className="mt-1 min-h-[72px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.notizen}
                  onChange={(e) => setForm((f) => ({ ...f, notizen: e.target.value }))}
                />
              </div>
            </div>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={save} disabled={saving} className="min-h-[44px]">
                {saving ? "Speichern…" : "Speichern"}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)} className="min-h-[44px]">
                Abbrechen
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8">
          {loading ? (
            <p className="text-slate-500">Lädt…</p>
          ) : objekte.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
              Noch keine Objekte. Legen Sie Ihr erstes WEG an — Daten werden für Vorlagen & KI-Briefe genutzt.
            </p>
          ) : (
            <ul className="space-y-3">
              {objekte.map((o) => (
                <li
                  key={o.id}
                  className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-center"
                >
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <Building2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{o.name}</div>
                      <div className="text-sm text-slate-500">
                        {o.adresse}, {o.plz} {o.ort} · {o.einheitenAnzahl} Einheiten
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link href={`/app/verwalter/vorlagen?objekt=${o.id}`}>
                      <a className="inline-flex min-h-[44px] items-center rounded-lg border px-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                        Vorlagen
                      </a>
                    </Link>
                    <Button variant="outline" size="icon" className="min-h-[44px] min-w-[44px]" onClick={() => openEdit(o)} aria-label="Bearbeiten">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="min-h-[44px] min-w-[44px]" onClick={() => remove(o.id)} aria-label="Löschen">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
