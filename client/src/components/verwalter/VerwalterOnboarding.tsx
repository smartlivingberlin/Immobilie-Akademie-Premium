import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Building2, BookOpen, Kanban, FileText, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "verwalter-onboarding-v1";

const STEPS = [
  {
    icon: Building2,
    titel: "1. WEG-Objekt anlegen",
    text: "Stammdaten und Einheiten — Basis für Vorlagen, Vorgänge und Buchungen.",
    href: "/app/verwalter/objekte",
  },
  {
    icon: Kanban,
    titel: "2. Fristen → Vorgang",
    text: "Aus der Fristen-Checkliste mit einem Klick To-dos im Kanban erstellen.",
    href: "/app/verwalter/fristen",
  },
  {
    icon: FileText,
    titel: "3. Briefe & Vorlagen",
    text: "Mahnung, ETV, NK — ausfüllen, KI-Brief, PDF exportieren.",
    href: "/app/verwalter/vorlagen",
  },
  {
    icon: BookOpen,
    titel: "4. Buchungen & DATEV",
    text: "Hausgeld erfassen, Plausibilität prüfen, CSV an Steuerberater.",
    href: "/app/verwalter/buchungen",
  },
  {
    icon: Sparkles,
    titel: "5. Assistent nutzen",
    text: "Unten rechts: Fragen zu Konten, SKR03 und Abläufen — mit Ihren Live-Daten.",
    href: "/rechenpraxis",
  },
];

export function VerwalterOnboarding({ objekteCount }: { objekteCount: number }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
      if (objekteCount > 0) return;
      setOpen(true);
    } catch {
      setOpen(objekteCount === 0);
    }
  }, [objekteCount]);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!open) return null;

  const current = STEPS[step];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900"
        role="dialog"
        aria-label="Willkommen Verwalter-Rechner"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
            <Icon className="h-5 w-5 text-emerald-600" />
          </div>
          <button type="button" onClick={close} aria-label="Schließen" className="rounded p-1 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <h2 className="mt-4 text-lg font-bold">Willkommen im Verwalter-Rechner</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Kurze Einführung — auch für Quereinsteiger. Schritt {step + 1} von {STEPS.length}
        </p>
        <p className="mt-4 font-medium">{current.titel}</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{current.text}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {step < STEPS.length - 1 ? (
            <>
              <Button onClick={() => setStep((s) => s + 1)} className="min-h-[44px]">
                Weiter
              </Button>
              <Link href={current.href}>
                <a>
                  <Button variant="outline" className="min-h-[44px]" onClick={close}>
                    Direkt starten
                  </Button>
                </a>
              </Link>
            </>
          ) : (
            <Button onClick={close} className="min-h-[44px]">
              Los geht&apos;s
            </Button>
          )}
          <Button variant="ghost" onClick={close} className="min-h-[44px]">
            Überspringen
          </Button>
        </div>
      </div>
    </div>
  );
}
