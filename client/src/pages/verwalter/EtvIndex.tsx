import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Calendar, CheckSquare, FileText, Users } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VerwalterObjekt } from "@shared/verwalterObjektTypes";
import {
  decodeEtvMeta,
  ETV_BESCHLUSS_CHECKLISTE,
  ETV_PHASE_LABELS,
  ETV_PROTOKOLL_CHECKLISTE,
  type EtvFristenResult,
} from "@shared/verwalterEtv";
import type { VerwalterVorgang } from "@shared/verwalterVorgangTypes";

export default function EtvIndex() {
  const [objekte, setObjekte] = useState<VerwalterObjekt[]>([]);
  const [etvVorgaenge, setEtvVorgaenge] = useState<VerwalterVorgang[]>([]);
  const [fristen, setFristen] = useState<EtvFristenResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [advancing, setAdvancing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [beschlussText, setBeschlussText] = useState("");
  const [beschlussFor, setBeschlussFor] = useState<string | null>(null);

  const [form, setForm] = useState({
    objektId: "",
    etvDatum: "",
    etvUhrzeit: "18:00 Uhr",
    etvOrt: "",
    tagesordnung: "1. Begrüßung\n2. Wirtschaftsplan\n3. Sonstiges",
    onlineEtv: false,
  });

  const [rechnerDatum, setRechnerDatum] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [oRes, eRes] = await Promise.all([
        fetch("/api/verwalter/objekte", { credentials: "include" }),
        fetch("/api/verwalter/etv/vorgaenge", { credentials: "include" }),
      ]);
      const oData = await oRes.json();
      const eData = await eRes.json();
      if (oData.success) {
        setObjekte(oData.objekte);
        if (!form.objektId && oData.objekte[0]) {
          setForm((f) => ({ ...f, objektId: oData.objekte[0].id }));
        }
      }
      if (eData.success) setEtvVorgaenge(eData.etvVorgaenge);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const loadFristen = async (datum: string) => {
    if (!datum) return;
    const res = await fetch(`/api/verwalter/etv/fristen?etvDatum=${datum}`, { credentials: "include" });
    const data = await res.json();
    if (data.success) setFristen(data.fristen);
  };

  const startEtv = async () => {
    if (!form.objektId || !form.etvDatum || !form.tagesordnung.trim()) {
      setError("Objekt, ETV-Datum und Tagesordnung sind Pflicht.");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/verwalter/etv/start", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Start fehlgeschlagen");
      setSuccess(`ETV angelegt — Freigabe-ID ${data.freigabe?.id ?? ""}`);
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const advance = async (vorgangId: string) => {
    setAdvancing(vorgangId);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/verwalter/etv/${vorgangId}/advance`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fortschritt fehlgeschlagen");
      setSuccess(`Phase: ${ETV_PHASE_LABELS[data.phase as keyof typeof ETV_PHASE_LABELS]}`);
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setAdvancing(null);
    }
  };

  const addBeschluss = async (vorgangId: string) => {
    if (!beschlussText.trim()) {
      setError("Beschlusstext erforderlich.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/verwalter/etv/${vorgangId}/beschluss`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: beschlussText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Beschluss fehlgeschlagen");
      setSuccess("Beschluss angelegt — Freigabe prüfen.");
      setBeschlussText("");
      setBeschlussFor(null);
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleChecklist = async (vorgangId: string, itemId: string, checked: boolean) => {
    const v = etvVorgaenge.find((x) => x.id === vorgangId);
    const meta = decodeEtvMeta(v?.beschreibung);
    if (!meta) return;
    await fetch(`/api/verwalter/etv/${vorgangId}/checkliste`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checkliste: { [itemId]: checked } }),
    });
    await load();
  };

  const activeEtv = etvVorgaenge.filter((v) => v.status !== "erledigt");

  return (
    <>
      <SEO title="ETV-Paket — Verwalter-Rechner" />
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <h1 className="text-2xl font-bold sm:text-3xl">ETV-Paket</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Einladung → Protokoll → Beschlüsse mit Fristenrechner und Checklisten (Human-in-the-loop).
        </p>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-4 text-sm text-emerald-600">{success}</p>}

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          <h2 className="font-semibold inline-flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Fristenrechner
          </h2>
          <p className="mt-1 text-sm text-slate-500">§ 24 WEG: Einladung 3 Wochen vorher · Anfechtung 30 Tage nach Beschluss.</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Label htmlFor="etv-rechner">ETV-Datum</Label>
              <Input
                id="etv-rechner"
                type="date"
                className="mt-1 min-h-[44px]"
                value={rechnerDatum}
                onChange={(e) => setRechnerDatum(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="min-h-[44px]"
              onClick={() => void loadFristen(rechnerDatum)}
              disabled={!rechnerDatum}
            >
              Fristen berechnen
            </Button>
          </div>
          {fristen && (
            <ul className="mt-4 space-y-2 text-sm">
              <li>Einladung spätestens: <strong>{fristen.einladungSpaetestens}</strong></li>
              <li>Protokoll ab: <strong>{fristen.protokollAb}</strong></li>
              <li>Anfechtung bis: <strong>{fristen.anfechtungBis}</strong></li>
            </ul>
          )}
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          <h2 className="font-semibold inline-flex items-center gap-2">
            <Users className="h-4 w-4" /> Neue ETV planen
          </h2>
          {objekte.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              <Link href="/app/verwalter/objekte">
                <a className="text-emerald-600 hover:underline">Zuerst WEG-Objekt anlegen →</a>
              </Link>
            </p>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="etv-objekt">WEG-Objekt</Label>
                <select
                  id="etv-objekt"
                  className="mt-1 min-h-[44px] w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.objektId}
                  onChange={(e) => setForm((f) => ({ ...f, objektId: e.target.value }))}
                >
                  {objekte.map((o) => (
                    <option key={o.id} value={o.id}>{o.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="etv-datum">ETV-Datum</Label>
                <Input
                  id="etv-datum"
                  type="date"
                  className="mt-1 min-h-[44px]"
                  value={form.etvDatum}
                  onChange={(e) => setForm((f) => ({ ...f, etvDatum: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="etv-uhrzeit">Uhrzeit</Label>
                <Input
                  id="etv-uhrzeit"
                  className="mt-1 min-h-[44px]"
                  value={form.etvUhrzeit}
                  onChange={(e) => setForm((f) => ({ ...f, etvUhrzeit: e.target.value }))}
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="etv-ort">Ort</Label>
                <Input
                  id="etv-ort"
                  className="mt-1 min-h-[44px]"
                  value={form.etvOrt}
                  onChange={(e) => setForm((f) => ({ ...f, etvOrt: e.target.value }))}
                  placeholder="Gemeinschaftsraum / Online"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="etv-top">Tagesordnung</Label>
                <textarea
                  id="etv-top"
                  className="mt-1 min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.tagesordnung}
                  onChange={(e) => setForm((f) => ({ ...f, tagesordnung: e.target.value }))}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={() => void startEtv()} disabled={saving} className="min-h-[44px] w-full">
                  {saving ? "Wird angelegt…" : "Einladung + Freigabe"}
                </Button>
              </div>
            </div>
          )}
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold">Aktive ETV-Vorgänge</h2>
            <Link href="/app/verwalter/freigaben">
              <a className="text-sm text-emerald-600 hover:underline inline-flex items-center gap-1">
                Freigaben <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Link>
          </div>
          {loading ? (
            <p className="mt-4 text-slate-500">Lädt…</p>
          ) : activeEtv.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">Keine aktiven ETV-Vorgänge.</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {activeEtv.map((v) => {
                const meta = decodeEtvMeta(v.beschreibung);
                const phase = meta?.phase;
                const canAdvance = phase && phase !== "abgeschlossen";
                return (
                  <li
                    key={v.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="font-medium">{v.titel}</div>
                    <div className="text-sm text-slate-500">{v.objektName}</div>
                    {phase && (
                      <span className="mt-1 inline-block text-xs rounded-full bg-blue-100 px-2 py-0.5 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                        {ETV_PHASE_LABELS[phase]}
                      </span>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {v.relatedVorlageSlug && (
                        <Link href={`/app/verwalter/vorlagen/${v.relatedVorlageSlug}?objekt=${v.objektId}`}>
                          <a className="inline-flex min-h-[40px] items-center rounded-lg border px-3 text-sm gap-1">
                            <FileText className="h-4 w-4" /> Vorlage
                          </a>
                        </Link>
                      )}
                      {canAdvance && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="min-h-[40px]"
                          disabled={advancing === v.id}
                          onClick={() => void advance(v.id)}
                        >
                          {advancing === v.id ? "…" : "Nächste Phase"}
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="min-h-[40px]"
                        onClick={() => setBeschlussFor(beschlussFor === v.id ? null : v.id)}
                      >
                        + Beschluss
                      </Button>
                    </div>
                    {beschlussFor === v.id && (
                      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                        <Input
                          className="min-h-[44px] flex-1"
                          placeholder="Beschlusstext (Kurzfassung)"
                          value={beschlussText}
                          onChange={(e) => setBeschlussText(e.target.value)}
                        />
                        <Button className="min-h-[44px]" disabled={saving} onClick={() => void addBeschluss(v.id)}>
                          Anlegen
                        </Button>
                      </div>
                    )}
                    {meta && (
                      <div className="mt-4 border-t pt-3 dark:border-slate-700">
                        <div className="text-xs font-medium text-slate-500 inline-flex items-center gap-1">
                          <CheckSquare className="h-3.5 w-3.5" /> Protokoll-Checkliste
                        </div>
                        <ul className="mt-2 space-y-1">
                          {ETV_PROTOKOLL_CHECKLISTE.map((item) => (
                            <li key={item.id} className="flex items-start gap-2 text-sm">
                              <input
                                type="checkbox"
                                className="mt-1"
                                checked={Boolean(meta.checkliste[item.id])}
                                onChange={(e) => void toggleChecklist(v.id, item.id, e.target.checked)}
                              />
                              <span>{item.title}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 text-xs font-medium text-slate-500">Beschluss-Checkliste</div>
                        <ul className="mt-2 space-y-1">
                          {ETV_BESCHLUSS_CHECKLISTE.map((item) => (
                            <li key={item.id} className="flex items-start gap-2 text-sm">
                              <input
                                type="checkbox"
                                className="mt-1"
                                checked={Boolean(meta.checkliste[item.id])}
                                onChange={(e) => void toggleChecklist(v.id, item.id, e.target.checked)}
                              />
                              <span>{item.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
