import { useEffect, useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  VERWALTER_FREIGABE_KIND_LABELS,
  type VerwalterFreigabe,
} from "@shared/verwalterEventTypes";
import { useToast } from "@/hooks/use-toast";

export default function FreigabenIndex() {
  const [freigaben, setFreigaben] = useState<VerwalterFreigabe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [acting, setActing] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/verwalter/freigaben?status=ausstehend&limit=50", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setFreigaben(data.freigaben);
    } catch (e) {
      setError("Daten konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const act = async (id: string, action: "freigeben" | "ablehnen") => {
    setActing(id);
    try {
      const res = await fetch(`/api/verwalter/freigaben/${id}/${action}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Aktion fehlgeschlagen");
      toast({
        title: action === "freigeben" ? "Freigegeben" : "Abgelehnt",
        description: "Versand erfolgt manuell durch Sie (E-Mail/Brief).",
      });
      await load();
    } catch (e: any) {
      toast({ title: "Fehler", description: e.message, variant: "destructive" });
    } finally {
      setActing(null);
    }
  };

  const copyText = async (f: VerwalterFreigabe) => {
    const text = String(f.payload.text ?? "");
    navigator.clipboard.writeText(text).catch(() => {
      console.warn("Clipboard nicht verfügbar");
    });
    toast({ title: "Text kopiert" });
  };

  return (
    <>
      <SEO title="Freigaben — Verwalter-Rechner" />
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Freigabe-Warteschlange</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          KI- und Mahn-Briefe prüfen, freigeben, dann manuell versenden.
        </p>

        {loading ? (
          <p className="mt-8 text-slate-500">Lädt…</p>
        ) : (
          <>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">
            {error}
          </div>
        )}
        {freigaben.length === 0 ? (
          <p className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            Keine ausstehenden Freigaben. Starten Sie eine Mahnung oder nutzen Sie KI-Brief in Vorlagen.
          </p>
        ) : (
          <ul className="mt-8 space-y-4">
            {freigaben.map((f) => {
              const text = String(f.payload.text ?? "");
              const isOpen = expanded === f.id;
              return (
                <li
                  key={f.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">{VERWALTER_FREIGABE_KIND_LABELS[f.kind]}</p>
                      <h2 className="font-semibold truncate">{f.titel}</h2>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(f.createdAt).toLocaleString("de-DE")}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="min-h-[40px] gap-1"
                        onClick={() => setExpanded(isOpen ? null : f.id)}
                      >
                        {isOpen ? "Schließen" : "Ansehen"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="min-h-[40px] gap-1"
                        onClick={() => void copyText(f)}
                      >
                        <Copy className="h-4 w-4" /> Kopieren
                      </Button>
                      <Button
                        size="sm"
                        className="min-h-[40px] gap-1 bg-emerald-600 hover:bg-emerald-700"
                        disabled={acting === f.id}
                        onClick={() => void act(f.id, "freigeben")}
                      >
                        <Check className="h-4 w-4" />
                        {acting === f.id ? "…" : "Freigeben"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="min-h-[40px] gap-1 text-red-600"
                        disabled={acting === f.id}
                        onClick={() => void act(f.id, "ablehnen")}
                      >
                        <X className="h-4 w-4" /> Ablehnen
                      </Button>
                    </div>
                  </div>
                  {isOpen && text && (
                    <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-950">
                      {text}
                    </pre>
                  )}
                </li>
              );
            })}
          </ul>
        )}
          </>
        )}
      </div>
    </>
  );
}
