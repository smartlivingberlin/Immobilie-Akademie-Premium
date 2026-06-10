import { useEffect, useState } from "react";
import { Link } from "wouter";
import { AlertTriangle, ArrowRight, FileText, Scale } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VerwalterObjekt } from "@shared/verwalterObjektTypes";
import { decodeMahnungMeta, MAHNUNG_STUFEN, stufeFromSlug } from "@shared/verwalterMahnwesen";
import type { VerwalterVorgang } from "@shared/verwalterVorgangTypes";

export default function MahnwesenIndex() {
  const [objekte, setObjekte] = useState<VerwalterObjekt[]>([]);
  const [mahnungen, setMahnungen] = useState<VerwalterVorgang[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [escalating, setEscalating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [form, setForm] = useState({
    objektId: "",
    einheitId: "",
    eigentuemerName: "",
    betrag: "",
    faelligSeit: new Date().toISOString().slice(0, 10),
  });

  const load = async () => {
    setLoading(true);
    try {
      const [oRes, mRes] = await Promise.all([
        fetch("/api/verwalter/objekte", { credentials: "include" }),
        fetch("/api/verwalter/mahnwesen/vorgaenge", { credentials: "include" }),
      ]);
      const oData = await oRes.json();
      const mData = await mRes.json();
      if (oData.success) {
        setObjekte(oData.objekte);
        if (!form.objektId && oData.objekte[0]) {
          setForm((f) => ({
            ...f,
            objektId: oData.objekte[0].id,
            einheitId: oData.objekte[0].einheiten?.[0]?.id || "",
            eigentuemerName: oData.objekte[0].einheiten?.[0]?.eigentuemerName || "",
          }));
        }
      }
      if (mData.success) setMahnungen(mData.mahnungen);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const selectedObjekt = objekte.find((o) => o.id === form.objektId);

  const startMahnung = async () => {
    if (!form.objektId || !form.eigentuemerName.trim() || !form.betrag) {
      setError("Objekt, Eigentümer und Betrag sind Pflicht.");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/verwalter/mahnwesen/start", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          objektId: form.objektId,
          einheitId: form.einheitId || undefined,
          eigentuemerName: form.eigentuemerName,
          betrag: Number(form.betrag),
          faelligSeit: form.faelligSeit,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Start fehlgeschlagen");
      setSuccess(`Stufe 1 angelegt — Freigabe-ID ${data.freigabe?.id ?? ""}`);
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const escalate = async (vorgangId: string) => {
    setEscalating(vorgangId);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/verwalter/mahnwesen/${vorgangId}/escalate`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Eskalation fehlgeschlagen");
      setSuccess(`Stufe ${data.stufe} angelegt — bitte Freigabe prüfen.`);
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setEscalating(null);
    }
  };

  const activeMahnungen = mahnungen.filter((v) => v.status !== "erledigt");

  return (
    <>
      <SEO title="Mahnwesen — Verwalter-Rechner" />
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Mahnwesen</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          3-Stufen-Workflow: Brief-Entwurf → Freigabe → Versand durch Sie (kein Auto-Versand).
        </p>

        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
          <Scale className="mb-1 inline h-4 w-4" /> Keine Rechtsberatung. Vor Versand Inhalt prüfen; ab Stufe 3
          Inkasso/Rechtsweg manuell.
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-4 text-sm text-emerald-600">{success}</p>}

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          <h2 className="font-semibold">Neue 1. Mahnung starten</h2>
          {objekte.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              <Link href="/app/verwalter/objekte">
                <a className="text-emerald-600 hover:underline">Zuerst WEG-Objekt anlegen →</a>
              </Link>
            </p>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="mw-objekt">WEG-Objekt</Label>
                <select
                  id="mw-objekt"
                  className="mt-1 min-h-[44px] w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.objektId}
                  onChange={(e) => {
                    const o = objekte.find((x) => x.id === e.target.value);
                    const einheit = o?.einheiten?.[0];
                    setForm((f) => ({
                      ...f,
                      objektId: e.target.value,
                      einheitId: einheit?.id || "",
                      eigentuemerName: einheit?.eigentuemerName || f.eigentuemerName,
                    }));
                  }}
                >
                  {objekte.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedObjekt && selectedObjekt.einheiten.length > 0 && (
                <div className="sm:col-span-2">
                  <Label htmlFor="mw-einheit">Einheit</Label>
                  <select
                    id="mw-einheit"
                    className="mt-1 min-h-[44px] w-full rounded-md border border-input bg-background px-3 text-sm"
                    value={form.einheitId}
                    onChange={(e) => {
                      const einheit = selectedObjekt.einheiten.find((x) => x.id === e.target.value);
                      setForm((f) => ({
                        ...f,
                        einheitId: e.target.value,
                        eigentuemerName: einheit?.eigentuemerName || f.eigentuemerName,
                      }));
                    }}
                  >
                    {selectedObjekt.einheiten.map((e) => (
                      <option key={e.id} value={e.id}>
                        Nr. {e.nummer || "—"} {e.eigentuemerName ? `· ${e.eigentuemerName}` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <Label htmlFor="mw-name">Eigentümer</Label>
                <Input
                  id="mw-name"
                  className="mt-1 min-h-[44px]"
                  value={form.eigentuemerName}
                  onChange={(e) => setForm((f) => ({ ...f, eigentuemerName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="mw-betrag">Offener Betrag (€)</Label>
                <Input
                  id="mw-betrag"
                  type="number"
                  className="mt-1 min-h-[44px]"
                  value={form.betrag}
                  onChange={(e) => setForm((f) => ({ ...f, betrag: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="mw-faellig">Fällig seit</Label>
                <Input
                  id="mw-faellig"
                  type="date"
                  className="mt-1 min-h-[44px]"
                  value={form.faelligSeit}
                  onChange={(e) => setForm((f) => ({ ...f, faelligSeit: e.target.value }))}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={() => void startMahnung()} disabled={saving} className="min-h-[44px] w-full">
                  {saving ? "Wird angelegt…" : "Stufe 1 + Freigabe"}
                </Button>
              </div>
            </div>
          )}
          <p className="mt-3 text-xs text-slate-500">
            Zahlungsfrist Stufe 1: {MAHNUNG_STUFEN[1].zahlungsfristTage} Tage ab heute.
          </p>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold">Aktive Mahnungen</h2>
            <Link href="/app/verwalter/freigaben">
              <a className="text-sm text-emerald-600 hover:underline inline-flex items-center gap-1">
                Freigaben <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Link>
          </div>
          {loading ? (
            <p className="mt-4 text-slate-500">Lädt…</p>
          ) : activeMahnungen.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">Keine offenen Mahnungs-Vorgänge.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {activeMahnungen.map((v) => {
                const stufe = stufeFromSlug(v.relatedVorlageSlug ?? "") ?? decodeMahnungMeta(v.beschreibung)?.stufe;
                const canEscalate = stufe != null && stufe < 3 && v.status !== "erledigt";
                return (
                  <li
                    key={v.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="font-medium">{v.titel}</div>
                        <div className="text-sm text-slate-500">{v.objektName}</div>
                        {stufe && (
                          <span className="mt-1 inline-block text-xs rounded-full bg-amber-100 px-2 py-0.5 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                            Stufe {stufe}/3
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {v.relatedVorlageSlug && (
                          <Link href={`/app/verwalter/vorlagen/${v.relatedVorlageSlug}?objekt=${v.objektId}`}>
                            <a className="inline-flex min-h-[40px] items-center rounded-lg border px-3 text-sm gap-1">
                              <FileText className="h-4 w-4" /> Vorlage
                            </a>
                          </Link>
                        )}
                        {canEscalate && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="min-h-[40px]"
                            disabled={escalating === v.id}
                            onClick={() => void escalate(v.id)}
                          >
                            {escalating === v.id ? "…" : `→ Stufe ${(stufe ?? 0) + 1}`}
                          </Button>
                        )}
                        {stufe === 3 && (
                          <span className="inline-flex items-center gap-1 text-xs text-amber-700">
                            <AlertTriangle className="h-3.5 w-3.5" /> Endstufe
                          </span>
                        )}
                      </div>
                    </div>
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
