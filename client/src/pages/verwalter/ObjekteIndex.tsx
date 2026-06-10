import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Building2, Plus, Trash2, Pencil } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VerwalterEinheit, VerwalterObjekt } from "@shared/verwalterObjektTypes";

type ObjektForm = {
  name: string;
  adresse: string;
  plz: string;
  ort: string;
  einheitenAnzahl: string;
  verwalterName: string;
  verwalterAdresse: string;
  kontaktEmail: string;
  kontaktTelefon: string;
  notizen: string;
  einheiten: VerwalterEinheit[];
};

const emptyForm: ObjektForm = {
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
  einheiten: [],
};

function newEinheit(): VerwalterEinheit {
  return { id: crypto.randomUUID().slice(0, 8), nummer: "", mea: 0 };
}

export default function ObjekteIndex() {
  const [objekte, setObjekte] = useState<VerwalterObjekt[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ObjektForm>(emptyForm);
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
      einheiten: o.einheiten ?? [],
    });
    setShowForm(true);
    setError(null);
  };

  const addEinheit = () => {
    setForm((f) => ({
      ...f,
      einheiten: [...f.einheiten, newEinheit()],
      einheitenAnzahl: String(f.einheiten.length + 1),
    }));
  };

  const updateEinheit = (id: string, patch: Partial<VerwalterEinheit>) => {
    setForm((f) => ({
      ...f,
      einheiten: f.einheiten.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
  };

  const removeEinheit = (id: string) => {
    setForm((f) => {
      const einheiten = f.einheiten.filter((e) => e.id !== id);
      return { ...f, einheiten, einheitenAnzahl: String(einheiten.length) };
    });
  };

  const save = async () => {
    if (!form.name.trim() || !form.adresse.trim()) {
      setError("Name und Adresse sind Pflichtfelder.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const einheiten = form.einheiten.map((e) => ({
        ...e,
        nummer: e.nummer.trim(),
        mea: Number(e.mea) || 0,
        flaecheQm: e.flaecheQm != null ? Number(e.flaecheQm) || undefined : undefined,
      }));
      const body = {
        ...form,
        einheiten,
        einheitenAnzahl: einheiten.length || Number(form.einheitenAnzahl) || 0,
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
              <div className="sm:col-span-2 border-t border-slate-200 pt-4 dark:border-slate-700">
                <div className="flex items-center justify-between gap-2">
                  <Label>Einheiten ({form.einheiten.length})</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addEinheit} className="min-h-[36px] gap-1">
                    <Plus className="h-3.5 w-3.5" /> Einheit
                  </Button>
                </div>
                {form.einheiten.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {form.einheiten.map((e) => (
                      <li
                        key={e.id}
                        className="grid gap-2 rounded-lg border border-slate-200 p-3 dark:border-slate-700 sm:grid-cols-[1fr_1fr_1fr_auto]"
                      >
                        <Input
                          placeholder="Nr."
                          className="min-h-[40px]"
                          value={e.nummer}
                          onChange={(ev) => updateEinheit(e.id, { nummer: ev.target.value })}
                        />
                        <Input
                          type="number"
                          placeholder="MEA"
                          className="min-h-[40px]"
                          value={e.mea || ""}
                          onChange={(ev) => updateEinheit(e.id, { mea: Number(ev.target.value) })}
                        />
                        <Input
                          placeholder="Eigentümer"
                          className="min-h-[40px]"
                          value={e.eigentuemerName ?? ""}
                          onChange={(ev) => updateEinheit(e.id, { eigentuemerName: ev.target.value })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="min-h-[40px] min-w-[40px]"
                          onClick={() => removeEinheit(e.id)}
                          aria-label="Einheit entfernen"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
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
                    <Link href={`/app/verwalter/vorgaenge?objekt=${o.id}`}>
                      <a className="inline-flex min-h-[44px] items-center rounded-lg border px-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                        Vorgänge
                      </a>
                    </Link>
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
