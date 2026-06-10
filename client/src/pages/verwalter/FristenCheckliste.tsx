import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Clock, Download, FileText, Kanban, Plus } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { downloadFristenChecklisteHtml } from "@/lib/verwalterExport";
import {
  FRISTEN_CHECKLISTE,
  FRISTEN_CATEGORY_LABELS,
  type FristItem,
} from "@shared/verwalterFristen";
import { fristToVorgangInput } from "@shared/verwalterFristVorgang";
import type { VerwalterObjekt } from "@shared/verwalterObjektTypes";

const CATEGORIES = ["etv", "beschluss", "nk", "mahnung"] as const;

export default function FristenCheckliste() {
  const [objekte, setObjekte] = useState<VerwalterObjekt[]>([]);
  const [objektId, setObjektId] = useState("");
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [creating, setCreating] = useState<string | null>(null);
  const [batchLoading, setBatchLoading] = useState(false);
  const [created, setCreated] = useState<string | null>(null);
  const [batchDone, setBatchDone] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/verwalter/objekte", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.objekte?.length) {
          setObjekte(d.objekte);
          setObjektId(d.objekte[0].id);
        }
      })
      .catch(() => {});
  }, []);

  const createVorgang = async (item: FristItem) => {
    if (!objektId) {
      setError("Bitte zuerst ein WEG-Objekt anlegen.");
      return;
    }
    setCreating(item.id);
    setError(null);
    setCreated(null);
    try {
      const body = fristToVorgangInput(item, { objektId, startDate });
      const res = await fetch("/api/verwalter/vorgaenge", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Anlegen fehlgeschlagen");
      setCreated(item.id);
      setTimeout(() => setCreated(null), 3000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setCreating(null);
    }
  };

  const selectedObjekt = objekte.find((o) => o.id === objektId);

  const exportHtml = () => {
    downloadFristenChecklisteHtml(FRISTEN_CHECKLISTE, {
      objekt: selectedObjekt,
      startDate,
    });
  };

  const createAllVorgaenge = async () => {
    if (!objektId) {
      setError("Bitte zuerst ein WEG-Objekt anlegen.");
      return;
    }
    setBatchLoading(true);
    setError(null);
    setBatchDone(null);
    try {
      const res = await fetch("/api/verwalter/fristen/batch-vorgaenge", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objektId, startDate }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Batch fehlgeschlagen");
      setBatchDone(data.count ?? 0);
      setTimeout(() => setBatchDone(null), 5000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBatchLoading(false);
    }
  };

  return (
    <>
      <SEO title="Fristen-Checkliste WEG" description="Wichtige Fristen für Verwalter: ETV, Beschlüsse, NK." />
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Fristen-Checkliste</h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Fristen prüfen — mit einem Klick als Vorgang im Kanban anlegen.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Button
              variant="default"
              onClick={() => void createAllVorgaenge()}
              disabled={batchLoading || !objektId}
              className="min-h-[44px] gap-2"
            >
              <Kanban className="h-4 w-4" />
              {batchLoading ? "Lege an…" : "Alle Fristen → Vorgänge"}
            </Button>
            <Button variant="outline" onClick={exportHtml} className="min-h-[44px] gap-2">
              <Download className="h-4 w-4" /> HTML-Export
            </Button>
          </div>
        </div>
        {batchDone != null && (
          <p className="mt-3 text-sm text-emerald-600">
            {batchDone} Vorgänge angelegt —{" "}
            <Link href="/app/verwalter/vorgaenge">
              <a className="underline">zum Kanban</a>
            </Link>
          </p>
        )}

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="frist-objekt">WEG-Objekt</Label>
              {objekte.length === 0 ? (
                <p className="mt-1 text-sm text-slate-500">
                  <Link href="/app/verwalter/objekte">
                    <a className="text-emerald-600 hover:underline">Objekt anlegen →</a>
                  </Link>
                </p>
              ) : (
                <select
                  id="frist-objekt"
                  className="mt-1 min-h-[44px] w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={objektId}
                  onChange={(e) => setObjektId(e.target.value)}
                >
                  {objekte.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <Label htmlFor="frist-start">Stichtag (für Fälligkeit)</Label>
              <input
                id="frist-start"
                type="date"
                className="mt-1 min-h-[44px] w-full rounded-md border border-input bg-background px-3 text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <Link href="/app/verwalter/vorgaenge">
            <a className="mt-3 inline-flex items-center gap-1.5 text-sm text-emerald-600 hover:underline">
              <Kanban className="h-4 w-4" /> Alle Vorgänge im Kanban
            </a>
          </Link>
        </div>

        <div className="mt-8 space-y-8">
          {CATEGORIES.map((cat) => {
            const items = FRISTEN_CHECKLISTE.filter((i) => i.category === cat);
            return (
              <section key={cat}>
                <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-emerald-700">
                  <Clock className="h-5 w-5" />
                  {FRISTEN_CATEGORY_LABELS[cat]}
                </h2>
                <ul className="space-y-3">
                  {items.map((item: FristItem) => (
                    <li
                      key={item.id}
                      className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
                    >
                      <div className="font-medium">{item.title}</div>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="rounded bg-slate-100 px-2 py-0.5 dark:bg-slate-800">{item.legalBasis}</span>
                        {item.durationDays != null && <span>ca. {item.durationDays} Tage ab Stichtag</span>}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          className="min-h-[40px] gap-1.5"
                          disabled={!objektId || creating === item.id}
                          onClick={() => createVorgang(item)}
                        >
                          <Plus className="h-3.5 w-3.5" />
                          {creating === item.id
                            ? "Wird angelegt…"
                            : created === item.id
                              ? "✓ Vorgang angelegt"
                              : "Vorgang anlegen"}
                        </Button>
                        {item.relatedVorlageSlug && (
                          <Link href={`/app/verwalter/vorlagen/${item.relatedVorlageSlug}?objekt=${objektId}`}>
                            <a className="inline-flex min-h-[40px] items-center gap-1 rounded-lg border px-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                              <FileText className="h-3.5 w-3.5 text-emerald-600" /> Vorlage
                            </a>
                          </Link>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
