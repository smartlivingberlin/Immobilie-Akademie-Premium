import { Link } from "wouter";
import { Clock, FileText, Kanban } from "lucide-react";
import { SEO } from "@/components/SEO";
import {
  FRISTEN_CHECKLISTE,
  FRISTEN_CATEGORY_LABELS,
  type FristItem,
} from "@shared/verwalterFristen";

const CATEGORIES = ["etv", "beschluss", "nk", "mahnung"] as const;

export default function FristenCheckliste() {
  return (
    <>
      <SEO title="Fristen-Checkliste WEG" description="Wichtige Fristen für Verwalter: ETV, Beschlüsse, NK." />
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Fristen-Checkliste</h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Übersicht zentraler Fristen — mit Verweis auf passende Vorlagen.
        </p>
        <Link href="/app/verwalter/vorgaenge">
          <a className="mt-3 inline-flex items-center gap-1.5 text-sm text-emerald-600 hover:underline">
            <Kanban className="h-4 w-4" /> Vorgang anlegen (Kanban)
          </a>
        </Link>

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
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="rounded bg-slate-100 px-2 py-0.5 dark:bg-slate-800">{item.legalBasis}</span>
                        {item.durationDays != null && (
                          <span>ca. {item.durationDays} Tage</span>
                        )}
                        {item.relatedVorlageSlug && (
                          <Link href={`/app/verwalter/vorlagen/${item.relatedVorlageSlug}`}>
                            <a className="inline-flex items-center gap-1 text-emerald-600 hover:underline">
                              <FileText className="h-3.5 w-3.5" /> Vorlage öffnen
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
