import { useEffect, useState } from "react";
import { Link } from "wouter";
import { CheckCircle2, AlertTriangle, Circle } from "lucide-react";
import { abschlussFortschritt, type AbschlussSchritt } from "@shared/verwalterMonatsabschluss";

export function MonatsabschlussPanel({
  objektId,
  periode,
}: {
  objektId: string;
  periode: string;
}) {
  const [schritte, setSchritte] = useState<AbschlussSchritt[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!objektId || !periode) return;
    setLoading(true);
    const q = new URLSearchParams({ objektId, periode });
    fetch(`/api/verwalter/monatsabschluss?${q}`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setSchritte(d.schritte);
      })
      .finally(() => setLoading(false));
  }, [objektId, periode]);

  if (!objektId || loading) return null;
  if (schritte.length === 0) return null;

  const pct = abschlussFortschritt(schritte);

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-semibold text-sm">Monatsabschluss — Checkliste</h2>
        <span className="text-xs text-slate-500">{pct}% erledigt</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="h-full bg-emerald-600 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <ul className="mt-4 space-y-2">
        {schritte.map((s) => (
          <li key={s.id} className="flex items-start gap-2 text-sm">
            {s.status === "ok" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            ) : s.status === "warnung" ? (
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            ) : (
              <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            )}
            <div className="min-w-0">
              <div className="font-medium">{s.titel}</div>
              <p className="text-xs text-slate-500">{s.beschreibung}</p>
              {s.href && s.status !== "ok" && (
                <Link href={s.href}>
                  <a className="text-xs text-emerald-600 hover:underline">Öffnen →</a>
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
