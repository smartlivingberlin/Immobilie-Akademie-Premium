import { useEffect, useState } from "react";
import { Link } from "wouter";
import { AlertTriangle, BookOpen, Download, Plus, Sparkles, Trash2 } from "lucide-react";
import { MonatsabschlussPanel } from "@/components/verwalter/MonatsabschlussPanel";
import type { BuchungVorschlag } from "@shared/verwalterBuchungVorschlag";
import type { PlausibilitaetHinweis } from "@shared/verwalterBuchungPlausibilitaet";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { downloadDatevBuchungenCsv } from "@/lib/verwalterExport";
import type { VerwalterObjekt } from "@shared/verwalterObjektTypes";
import { SKR03_WEG_KONTEN, type VerwalterBuchung } from "@shared/verwalterBuchungTypes";

const emptyForm = {
  datum: new Date().toISOString().slice(0, 10),
  betrag: "",
  sollKonto: "1200",
  habenKonto: "8400",
  buchungstext: "",
  belegNr: "",
  einheitId: "",
};

export default function BuchungenIndex() {
  const [buchungen, setBuchungen] = useState<VerwalterBuchung[]>([]);
  const [objekte, setObjekte] = useState<VerwalterObjekt[]>([]);
  const [objektId, setObjektId] = useState("");
  const [periode, setPeriode] = useState(() => new Date().toISOString().slice(0, 7));
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [freitext, setFreitext] = useState("");
  const [vorschlag, setVorschlag] = useState<BuchungVorschlag | null>(null);
  const [vorschlagLaden, setVorschlagLaden] = useState(false);
  const [hinweise, setHinweise] = useState<PlausibilitaetHinweis[]>([]);

  const selectedObjekt = objekte.find((o) => o.id === objektId);

  const loadObjekte = async () => {
    const res = await fetch("/api/verwalter/objekte", { credentials: "include" });
    const data = await res.json();
    if (data.success) {
      setObjekte(data.objekte);
      if (!objektId && data.objekte[0]) setObjektId(data.objekte[0].id);
    }
  };

  const loadBuchungen = async () => {
    if (!objektId) {
      setBuchungen([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const q = new URLSearchParams({ objektId, periode });
      const res = await fetch(`/api/verwalter/buchungen?${q}`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setBuchungen(data.buchungen);
      const pRes = await fetch(`/api/verwalter/buchungen/plausibilitaet?${q}`, { credentials: "include" });
      const pData = await pRes.json();
      if (pData.success) setHinweise(pData.hinweise);
    } finally {
      setLoading(false);
    }
  };

  const vorschlagen = async () => {
    if (!objektId || !freitext.trim()) return;
    setVorschlagLaden(true);
    setError(null);
    setVorschlag(null);
    try {
      const res = await fetch("/api/verwalter/buchungen/vorschlagen", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: freitext, objektId, periode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kein Vorschlag");
      setVorschlag(data.vorschlag);
      setForm({
        ...emptyForm,
        betrag: String(data.vorschlag.betrag),
        sollKonto: data.vorschlag.sollKonto,
        habenKonto: data.vorschlag.habenKonto,
        buchungstext: data.vorschlag.buchungstext,
        einheitId: data.vorschlag.einheitId || "",
      });
      setShowForm(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setVorschlagLaden(false);
    }
  };

  useEffect(() => {
    loadObjekte();
  }, []);

  useEffect(() => {
    loadBuchungen();
  }, [objektId, periode]);

  const applyKontoPreset = (soll: string, haben: string, text: string) => {
    setForm((f) => ({
      ...f,
      sollKonto: soll,
      habenKonto: haben,
      buchungstext: text || f.buchungstext,
    }));
    setShowForm(true);
  };

  const save = async () => {
    if (!objektId) {
      setError("Bitte Objekt wählen.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/verwalter/buchungen", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          objektId,
          periode,
          datum: form.datum,
          betrag: Number(form.betrag),
          sollKonto: form.sollKonto,
          habenKonto: form.habenKonto,
          buchungstext: form.buchungstext,
          belegNr: form.belegNr || undefined,
          einheitId: form.einheitId || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Speichern fehlgeschlagen");
      setShowForm(false);
      setForm(emptyForm);
      await loadBuchungen();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Buchung wirklich löschen?")) return;
    await fetch(`/api/verwalter/buchungen/${id}`, { method: "DELETE", credentials: "include" });
    await loadBuchungen();
  };

  const exportDatev = async (force = false) => {
    if (!objektId) return;
    setExporting(true);
    setError(null);
    try {
      await downloadDatevBuchungenCsv(objektId, periode, force);
    } catch (e: any) {
      if (e.hinweise?.length && !force) {
        const msgs = e.hinweise.map((h: PlausibilitaetHinweis) => h.message).join("\n");
        if (confirm(`${e.message}\n\n${msgs}\n\nTrotzdem exportieren?`)) {
          setExporting(false);
          return exportDatev(true);
        }
      } else {
        setError(e.message || "DATEV-Export fehlgeschlagen");
      }
    } finally {
      setExporting(false);
    }
  };

  const summe = buchungen.reduce((s, b) => s + b.betrag, 0);

  return (
    <>
      <SEO title="Hausgeld-Buchungen — Verwalter-Rechner" />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
              <BookOpen className="h-7 w-7 text-emerald-600" />
              Hausgeld-Buchungen
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Manuelle Erfassung — Export als DATEV-Buchungsstapel (EXTF light).
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Button
              variant="outline"
              className="min-h-[44px] gap-2"
              disabled={!objektId || exporting}
              onClick={() => exportDatev()}
            >
              <Download className="h-4 w-4" />
              {exporting ? "Export…" : "DATEV-Export"}
            </Button>
            <Button
              onClick={() => setShowForm(true)}
              className="min-h-[44px] gap-2"
              disabled={!objektId}
            >
              <Plus className="h-4 w-4" /> Buchung
            </Button>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="b-objekt">WEG-Objekt</Label>
            {objekte.length === 0 ? (
              <p className="mt-1 text-sm">
                <Link href="/app/verwalter/objekte">
                  <a className="text-emerald-600 hover:underline">Zuerst Objekt anlegen →</a>
                </Link>
              </p>
            ) : (
              <select
                id="b-objekt"
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
            <Label htmlFor="b-periode">Periode (Monat)</Label>
            <input
              id="b-periode"
              type="month"
              className="mt-1 min-h-[44px] w-full rounded-md border border-input bg-background px-3 text-sm"
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 p-4 dark:border-emerald-800 dark:bg-emerald-950/20">
          <Label htmlFor="freitext" className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            Buchung in eigenen Worten
          </Label>
          <p className="mt-1 text-xs text-slate-500">
            z. B. „250 Euro Hausgeld WE 3 Müller“ oder „NK Heizkosten 89,50“
          </p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <Input
              id="freitext"
              className="min-h-[44px] flex-1"
              value={freitext}
              onChange={(e) => setFreitext(e.target.value)}
              placeholder="Beschreiben Sie die Buchung…"
              onKeyDown={(e) => e.key === "Enter" && vorschlagen()}
            />
            <Button
              onClick={vorschlagen}
              disabled={!objektId || vorschlagLaden || !freitext.trim()}
              className="min-h-[44px] shrink-0"
            >
              {vorschlagLaden ? "Erkenne…" : "Vorschlag"}
            </Button>
          </div>
          {vorschlag && (
            <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">
              {vorschlag.erklaerung} ({vorschlag.quelle === "ki" ? "KI" : "Regel"})
            </p>
          )}
        </div>

        {hinweise.length > 0 && (
          <ul className="mt-4 space-y-2">
            {hinweise.map((h, i) => (
              <li
                key={i}
                className={`flex items-start gap-2 rounded-lg px-3 py-2 text-sm ${
                  h.level === "error"
                    ? "bg-red-50 text-red-800 dark:bg-red-950/30"
                    : h.level === "warn"
                      ? "bg-amber-50 text-amber-900 dark:bg-amber-950/30"
                      : "bg-slate-50 text-slate-600 dark:bg-slate-800/50"
                }`}
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                {h.message}
              </li>
            ))}
          </ul>
        )}

        <MonatsabschlussPanel objektId={objektId} periode={periode} />

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="min-h-[36px]"
            onClick={() => applyKontoPreset("1200", "8400", "Hausgeld")}
          >
            Hausgeld (Bank → Erlös)
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="min-h-[36px]"
            onClick={() => applyKontoPreset("1400", "8400", "Forderung Hausgeld")}
          >
            Forderung → Erlös
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="min-h-[36px]"
            onClick={() => applyKontoPreset("4970", "1200", "Nebenkosten")}
          >
            NK-Aufwand
          </Button>
        </div>

        {showForm && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <h2 className="mb-4 font-semibold">Neue Buchung — {selectedObjekt?.name}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="b-datum">Datum</Label>
                <Input
                  id="b-datum"
                  type="date"
                  className="mt-1 min-h-[44px]"
                  value={form.datum}
                  onChange={(e) => setForm((f) => ({ ...f, datum: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="b-betrag">Betrag (€)</Label>
                <Input
                  id="b-betrag"
                  type="number"
                  min="0.01"
                  step="0.01"
                  className="mt-1 min-h-[44px]"
                  value={form.betrag}
                  onChange={(e) => setForm((f) => ({ ...f, betrag: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="b-soll">Soll-Konto</Label>
                <Input
                  id="b-soll"
                  list="konten-list"
                  className="mt-1 min-h-[44px]"
                  value={form.sollKonto}
                  onChange={(e) => setForm((f) => ({ ...f, sollKonto: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="b-haben">Haben-Konto</Label>
                <Input
                  id="b-haben"
                  list="konten-list"
                  className="mt-1 min-h-[44px]"
                  value={form.habenKonto}
                  onChange={(e) => setForm((f) => ({ ...f, habenKonto: e.target.value }))}
                />
              </div>
              <datalist id="konten-list">
                {SKR03_WEG_KONTEN.map((k) => (
                  <option key={k.konto} value={k.konto}>
                    {k.label}
                  </option>
                ))}
              </datalist>
              {selectedObjekt && selectedObjekt.einheiten.length > 0 && (
                <div>
                  <Label htmlFor="b-einheit">Einheit (optional)</Label>
                  <select
                    id="b-einheit"
                    className="mt-1 min-h-[44px] w-full rounded-md border border-input bg-background px-3 text-sm"
                    value={form.einheitId}
                    onChange={(e) => setForm((f) => ({ ...f, einheitId: e.target.value }))}
                  >
                    <option value="">—</option>
                    {selectedObjekt.einheiten.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.nummer}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <Label htmlFor="b-beleg">Beleg-Nr. (optional)</Label>
                <Input
                  id="b-beleg"
                  className="mt-1 min-h-[44px]"
                  value={form.belegNr}
                  onChange={(e) => setForm((f) => ({ ...f, belegNr: e.target.value }))}
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="b-text">Buchungstext</Label>
                <Input
                  id="b-text"
                  className="mt-1 min-h-[44px]"
                  value={form.buchungstext}
                  onChange={(e) => setForm((f) => ({ ...f, buchungstext: e.target.value }))}
                  placeholder="z. B. Hausgeld WE 3 — Januar 2026"
                />
              </div>
            </div>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={save} disabled={saving} className="min-h-[44px]">
                {saving ? "Speichern…" : "Buchung speichern"}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)} className="min-h-[44px]">
                Abbrechen
              </Button>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              SKR03-Vorschläge — keine Steuerberatung. Konten mit Ihrem Steuerberater abstimmen.
            </p>
          </div>
        )}

        <div className="mt-8">
          {loading ? (
            <p className="text-slate-500">Lädt…</p>
          ) : buchungen.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
              Keine Buchungen in {periode}. Erfassen Sie Hausgeld, Forderungen oder NK-Aufwand.
            </p>
          ) : (
            <>
              <p className="mb-3 text-sm text-slate-600">
                {buchungen.length} Buchung{buchungen.length !== 1 ? "en" : ""} · Summe{" "}
                {summe.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full min-w-[640px] text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">Datum</th>
                      <th className="px-3 py-2 text-left font-medium">Text</th>
                      <th className="px-3 py-2 text-right font-medium">Betrag</th>
                      <th className="px-3 py-2 text-left font-medium">Soll</th>
                      <th className="px-3 py-2 text-left font-medium">Haben</th>
                      <th className="px-3 py-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {buchungen.map((b) => (
                      <tr key={b.id} className="border-t border-slate-100 dark:border-slate-800">
                        <td className="px-3 py-2 whitespace-nowrap">{b.datum}</td>
                        <td className="px-3 py-2">
                          {b.buchungstext}
                          {b.einheitNr && (
                            <span className="ml-1 text-xs text-slate-500">({b.einheitNr})</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-right whitespace-nowrap">
                          {b.betrag.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
                        </td>
                        <td className="px-3 py-2">{b.sollKonto}</td>
                        <td className="px-3 py-2">{b.habenKonto}</td>
                        <td className="px-3 py-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => remove(b.id)}
                            aria-label="Löschen"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
