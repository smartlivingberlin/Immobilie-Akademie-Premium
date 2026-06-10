import { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "wouter";
import { AlertCircle, FileText, Kanban, Plus, Trash2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VerwalterObjekt } from "@shared/verwalterObjektTypes";
import {
  isVorgangOverdue,
  VORGANG_STATUS_LABELS,
  VORGANG_STATUS_ORDER,
  VORGANG_TYP_LABELS,
  VORGANG_TYP_VORLAGE,
  type VerwalterVorgang,
  type VorgangStatus,
  type VorgangTyp,
} from "@shared/verwalterVorgangTypes";

const TYPEN = Object.keys(VORGANG_TYP_LABELS) as VorgangTyp[];

const emptyForm = {
  objektId: "",
  typ: "sonstiges" as VorgangTyp,
  titel: "",
  beschreibung: "",
  status: "offen" as VorgangStatus,
  faelligAm: "",
};

export default function VorgaengeIndex() {
  const search = useSearch();
  const initialObjekt = useMemo(() => {
    const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
    return params.get("objekt") || "";
  }, [search]);

  const [vorgaenge, setVorgaenge] = useState<VerwalterVorgang[]>([]);
  const [objekte, setObjekte] = useState<VerwalterObjekt[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterObjekt, setFilterObjekt] = useState(initialObjekt);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileStatus, setMobileStatus] = useState<VorgangStatus | "alle">("alle");

  const load = async () => {
    setLoading(true);
    try {
      const q = filterObjekt ? `?objektId=${encodeURIComponent(filterObjekt)}` : "";
      const [vRes, oRes] = await Promise.all([
        fetch(`/api/verwalter/vorgaenge${q}`, { credentials: "include" }),
        fetch("/api/verwalter/objekte", { credentials: "include" }),
      ]);
      const vData = await vRes.json();
      const oData = await oRes.json();
      if (vData.success) setVorgaenge(vData.vorgaenge);
      if (oData.success) setObjekte(oData.objekte);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [filterObjekt]);

  const grouped = useMemo(() => {
    const map: Record<VorgangStatus, VerwalterVorgang[]> = {
      offen: [],
      in_bearbeitung: [],
      wartend: [],
      erledigt: [],
    };
    for (const v of vorgaenge) map[v.status].push(v);
    return map;
  }, [vorgaenge]);

  const openCreate = () => {
    setForm({
      ...emptyForm,
      objektId: filterObjekt || objekte[0]?.id || "",
    });
    setShowForm(true);
    setError(null);
  };

  const save = async () => {
    if (!form.objektId || !form.titel.trim()) {
      setError("Objekt und Titel sind Pflichtfelder.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const relatedVorlageSlug = VORGANG_TYP_VORLAGE[form.typ];
      const res = await fetch("/api/verwalter/vorgaenge", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          relatedVorlageSlug,
        }),
      });
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

  const updateStatus = async (id: string, status: VorgangStatus) => {
    await fetch(`/api/verwalter/vorgaenge/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm("Vorgang wirklich löschen?")) return;
    await fetch(`/api/verwalter/vorgaenge/${id}`, { method: "DELETE", credentials: "include" });
    await load();
  };

  const VorgangCard = ({ v }: { v: VerwalterVorgang }) => {
    const overdue = isVorgangOverdue(v);
    return (
      <li
        className={`rounded-lg border bg-white p-3 dark:bg-slate-900 ${
          overdue ? "border-red-300 dark:border-red-800" : "border-slate-200 dark:border-slate-700"
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-medium text-sm leading-snug">{v.titel}</div>
            <div className="mt-1 text-xs text-slate-500 truncate">{v.objektName}</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => remove(v.id)}
            aria-label="Löschen"
          >
            <Trash2 className="h-3.5 w-3.5 text-red-600" />
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
          <span className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">
            {VORGANG_TYP_LABELS[v.typ]}
          </span>
          {v.faelligAm && (
            <span className={`rounded px-1.5 py-0.5 ${overdue ? "bg-red-100 text-red-700 dark:bg-red-900/40" : "bg-slate-100 dark:bg-slate-800"}`}>
              {overdue && <AlertCircle className="mr-0.5 inline h-3 w-3" />}
              {v.faelligAm}
            </span>
          )}
        </div>
        {v.status !== "erledigt" && (
          <select
            className="mt-2 w-full rounded border border-input bg-background px-2 py-1.5 text-xs min-h-[36px]"
            value={v.status}
            onChange={(e) => updateStatus(v.id, e.target.value as VorgangStatus)}
            aria-label="Status ändern"
          >
            {VORGANG_STATUS_ORDER.map((s) => (
              <option key={s} value={s}>
                {VORGANG_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        )}
        {v.relatedVorlageSlug && (
          <Link href={`/app/verwalter/vorlagen/${v.relatedVorlageSlug}?objekt=${v.objektId}`}>
            <a className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-600 hover:underline">
              <FileText className="h-3 w-3" /> Vorlage
            </a>
          </Link>
        )}
      </li>
    );
  };

  return (
    <>
      <SEO title="Vorgänge — Verwalter-Rechner" />
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
              <Kanban className="h-7 w-7 text-emerald-600" />
              Vorgänge
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Mahnungen, ETV, Schäden — Kanban pro Status.
            </p>
          </div>
          <Button onClick={openCreate} className="min-h-[44px] gap-2 shrink-0" disabled={objekte.length === 0}>
            <Plus className="h-4 w-4" /> Neuer Vorgang
          </Button>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Label htmlFor="filter-objekt" className="shrink-0 text-sm">
            Objekt:
          </Label>
          <select
            id="filter-objekt"
            className="min-h-[44px] flex-1 rounded-md border border-input bg-background px-3 text-sm sm:max-w-xs"
            value={filterObjekt}
            onChange={(e) => setFilterObjekt(e.target.value)}
          >
            <option value="">Alle Objekte</option>
            {objekte.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
          {objekte.length === 0 && (
            <Link href="/app/verwalter/objekte">
              <a className="text-sm text-emerald-600 hover:underline">Zuerst Objekt anlegen →</a>
            </Link>
          )}
        </div>

        {showForm && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <h2 className="mb-4 font-semibold">Neuer Vorgang</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="v-objekt">WEG-Objekt</Label>
                <select
                  id="v-objekt"
                  className="mt-1 min-h-[44px] w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.objektId}
                  onChange={(e) => setForm((f) => ({ ...f, objektId: e.target.value }))}
                >
                  <option value="">Bitte wählen</option>
                  {objekte.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="v-typ">Typ</Label>
                <select
                  id="v-typ"
                  className="mt-1 min-h-[44px] w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.typ}
                  onChange={(e) => setForm((f) => ({ ...f, typ: e.target.value as VorgangTyp }))}
                >
                  {TYPEN.map((t) => (
                    <option key={t} value={t}>
                      {VORGANG_TYP_LABELS[t]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="v-faellig">Fällig am</Label>
                <Input
                  id="v-faellig"
                  type="date"
                  className="mt-1 min-h-[44px]"
                  value={form.faelligAm}
                  onChange={(e) => setForm((f) => ({ ...f, faelligAm: e.target.value }))}
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="v-titel">Titel</Label>
                <Input
                  id="v-titel"
                  className="mt-1 min-h-[44px]"
                  value={form.titel}
                  onChange={(e) => setForm((f) => ({ ...f, titel: e.target.value }))}
                  placeholder="z. B. Mahnung Einheit 3"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="v-beschreibung">Beschreibung (optional)</Label>
                <textarea
                  id="v-beschreibung"
                  className="mt-1 min-h-[72px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.beschreibung}
                  onChange={(e) => setForm((f) => ({ ...f, beschreibung: e.target.value }))}
                />
              </div>
            </div>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={save} disabled={saving} className="min-h-[44px]">
                {saving ? "Speichern…" : "Anlegen"}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)} className="min-h-[44px]">
                Abbrechen
              </Button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="mt-8 text-slate-500">Lädt…</p>
        ) : vorgaenge.length === 0 ? (
          <p className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            Noch keine Vorgänge. Legen Sie einen an — z. B. Mahnung, ETV oder Schaden.
          </p>
        ) : (
          <>
            {/* Mobile: Status-Chips + Liste */}
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2 md:hidden">
              <button
                type="button"
                onClick={() => setMobileStatus("alle")}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                  mobileStatus === "alle" ? "bg-emerald-600 text-white" : "bg-slate-200 dark:bg-slate-800"
                }`}
              >
                Alle ({vorgaenge.length})
              </button>
              {VORGANG_STATUS_ORDER.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setMobileStatus(s)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                    mobileStatus === s ? "bg-emerald-600 text-white" : "bg-slate-200 dark:bg-slate-800"
                  }`}
                >
                  {VORGANG_STATUS_LABELS[s]} ({grouped[s].length})
                </button>
              ))}
            </div>
            <ul className="mt-4 space-y-3 md:hidden">
              {(mobileStatus === "alle" ? vorgaenge : grouped[mobileStatus]).map((v) => (
                <VorgangCard key={v.id} v={v} />
              ))}
            </ul>

            {/* Desktop: Kanban */}
            <div className="mt-6 hidden gap-4 md:grid md:grid-cols-4">
              {VORGANG_STATUS_ORDER.map((status) => (
                <section key={status} className="min-w-0">
                  <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {VORGANG_STATUS_LABELS[status]}
                    <span className="ml-1.5 text-slate-400">({grouped[status].length})</span>
                  </h2>
                  <ul className="space-y-2 min-h-[120px] rounded-xl bg-slate-100/80 p-2 dark:bg-slate-800/50">
                    {grouped[status].map((v) => (
                      <VorgangCard key={v.id} v={v} />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
