import { useCallback, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  BookOpen,
  Check,
  ChevronRight,
  Database,
  Scale,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VERWALTER_SZENARIEN, type Szenario } from "@shared/verwalterGuideSteps";

const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  Scale,
  BookOpen,
  Database,
};

function stepStorageKey(szenarioId: string, nr: number) {
  return `szenario-${szenarioId}-step-${nr}`;
}

function readStepDone(szenarioId: string, nr: number): boolean {
  try {
    return localStorage.getItem(stepStorageKey(szenarioId, nr)) === "1";
  } catch {
    return false;
  }
}

function writeStepDone(szenarioId: string, nr: number, done: boolean) {
  try {
    if (done) {
      localStorage.setItem(stepStorageKey(szenarioId, nr), "1");
    } else {
      localStorage.removeItem(stepStorageKey(szenarioId, nr));
    }
  } catch {
    /* ignore */
  }
}

function countDoneSteps(szenario: Szenario): number {
  return szenario.schritte.filter((s) => readStepDone(szenario.id, s.nr)).length;
}

export function SzenarienPanel() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const active = useMemo(
    () => VERWALTER_SZENARIEN.find((s) => s.id === activeId) ?? null,
    [activeId],
  );

  const refresh = useCallback(() => setTick((n) => n + 1), []);

  const toggleStep = (szenarioId: string, nr: number) => {
    const next = !readStepDone(szenarioId, nr);
    writeStepDone(szenarioId, nr, next);
    refresh();
  };

  void tick;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {VERWALTER_SZENARIEN.map((szenario) => {
          const Icon = ICON_MAP[szenario.icon] ?? BookOpen;
          const done = countDoneSteps(szenario);
          const total = szenario.schritte.length;
          const isActive = activeId === szenario.id;

          return (
            <button
              key={szenario.id}
              type="button"
              onClick={() => setActiveId(isActive ? null : szenario.id)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                isActive
                  ? "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/30"
                  : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-800"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
                  <Icon className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                      {szenario.titel}
                    </h3>
                    <span className="shrink-0 text-xs text-slate-500">{szenario.dauer}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {szenario.beschreibung}
                  </p>
                  {done > 0 && (
                    <p className="mt-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      {done}/{total} erledigt
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {active && (
        <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-sm dark:border-emerald-900 dark:bg-slate-900 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">{active.titel}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {countDoneSteps(active)}/{active.schritte.length} Schritte erledigt · {active.dauer}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveId(null)}
              aria-label="Szenario schließen"
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <ol className="mt-4 space-y-3">
            {active.schritte.map((schritt) => {
              const done = readStepDone(active.id, schritt.nr);
              return (
                <li
                  key={schritt.nr}
                  className={`rounded-lg border px-4 py-3 ${
                    done
                      ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/20"
                      : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950/40"
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <button
                        type="button"
                        onClick={() => toggleStep(active.id, schritt.nr)}
                        aria-label={done ? "Schritt als offen markieren" : "Schritt als erledigt markieren"}
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
                          done
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-slate-300 bg-white text-slate-600 dark:border-slate-600 dark:bg-slate-900"
                        }`}
                      >
                        {done ? <Check className="h-4 w-4" /> : schritt.nr}
                      </button>
                      <div className="min-w-0">
                        <div
                          className={`font-medium text-sm ${
                            done ? "text-slate-500 line-through dark:text-slate-400" : "text-slate-900 dark:text-slate-100"
                          }`}
                        >
                          {schritt.titel}
                        </div>
                        <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {schritt.beschreibung}
                        </p>
                      </div>
                    </div>
                    <Link href={schritt.href}>
                      <Button
                        size="sm"
                        variant={done ? "outline" : "default"}
                        className={`min-h-[40px] shrink-0 gap-1 ${
                          done ? "" : "bg-emerald-600 hover:bg-emerald-700"
                        }`}
                      >
                        {schritt.aktion}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
