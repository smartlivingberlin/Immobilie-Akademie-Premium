import { Link } from "wouter";
import { FileText, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import {
  VERWALTER_VORLAGEN,
  VORLAGE_CATEGORY_LABELS,
  type VorlageCategory,
} from "@shared/verwalterVorlagen";

const CATEGORIES: VorlageCategory[] = ["etv", "mahnung", "nk", "kommunikation"];

export default function VorlagenIndex() {
  return (
    <>
      <SEO title="WEG-Vorlagen — Verwalter-Rechner" description="Ausfüllbare Vorlagen für ETV, Mahnung, NK-Abrechnung." />
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">WEG-Vorlagen</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
          Ausfüllen, Vorschau und PDF-Export — für den Verwaltungsalltag. Keine Rechtsberatung.
        </p>

        <div className="mt-8 space-y-8">
          {CATEGORIES.map((cat) => {
            const items = VERWALTER_VORLAGEN.filter((v) => v.category === cat);
            if (items.length === 0) return null;
            return (
              <section key={cat}>
                <h2 className="mb-3 text-lg font-semibold text-emerald-700 dark:text-emerald-400">
                  {VORLAGE_CATEGORY_LABELS[cat]}
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {items.map((v) => (
                    <li key={v.id}>
                      <Link href={`/app/verwalter/vorlagen/${v.slug}`}>
                        <a className="flex min-h-[88px] items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
                          <FileText className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-slate-900 dark:text-slate-100">{v.title}</div>
                            <p className="mt-1 line-clamp-2 text-xs text-slate-500 sm:text-sm">{v.description}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
                        </a>
                      </Link>
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
