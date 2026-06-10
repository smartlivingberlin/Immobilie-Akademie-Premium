import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BuchungVorschlag } from "@shared/verwalterBuchungVorschlag";

export function BuchungsVorschlagCard({
  vorschlag,
  objektId,
  periode,
  onAngelegt,
}: {
  vorschlag: BuchungVorschlag;
  objektId: string;
  periode: string;
  onAngelegt: () => void;
}) {
  const [laden, setLaden] = useState(false);
  const [fertig, setFertig] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);

  const anlegen = async () => {
    setLaden(true);
    setFehler(null);
    try {
      const datum = new Date().toISOString().slice(0, 10);
      const res = await fetch("/api/verwalter/buchungen", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          objektId,
          periode,
          datum,
          betrag: vorschlag.betrag,
          sollKonto: vorschlag.sollKonto,
          habenKonto: vorschlag.habenKonto,
          buchungstext: vorschlag.buchungstext,
          einheitId: vorschlag.einheitId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Speichern fehlgeschlagen");
      setFertig(true);
      onAngelegt();
    } catch (e: any) {
      setFehler(e.message);
    } finally {
      setLaden(false);
    }
  };

  if (fertig) {
    return (
      <div className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-100 px-3 py-2 text-xs text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
        <Check className="h-4 w-4" />
        Buchung wurde angelegt.
      </div>
    );
  }

  return (
    <div className="mt-2 rounded-lg border border-emerald-200 bg-white p-3 text-xs dark:border-emerald-800 dark:bg-slate-900">
      <p className="font-medium text-emerald-800 dark:text-emerald-200">Buchungsvorschlag</p>
      <p className="mt-1 text-slate-600 dark:text-slate-400">{vorschlag.erklaerung}</p>
      <dl className="mt-2 grid grid-cols-2 gap-1 text-[11px]">
        <dt className="text-slate-500">Betrag</dt>
        <dd className="font-medium">{vorschlag.betrag.toLocaleString("de-DE")} €</dd>
        <dt className="text-slate-500">Soll → Haben</dt>
        <dd>
          {vorschlag.sollKonto} → {vorschlag.habenKonto}
        </dd>
        <dt className="text-slate-500">Text</dt>
        <dd className="col-span-1">{vorschlag.buchungstext}</dd>
      </dl>
      {fehler && <p className="mt-2 text-red-600">{fehler}</p>}
      <Button
        size="sm"
        className="mt-2 min-h-[36px] w-full"
        onClick={anlegen}
        disabled={laden}
      >
        {laden ? (
          <>
            <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> Speichern…
          </>
        ) : (
          "Buchung mit einem Klick anlegen"
        )}
      </Button>
    </div>
  );
}
