import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Building2,
  Clock,
  Database,
  FileText,
  Kanban,
  LayoutDashboard,
  Plus,
  Inbox,
  Scale,
  Users,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import type { VerwalterObjekt } from "@shared/verwalterObjektTypes";
import {
  isVorgangOverdue,
  VORGANG_STATUS_LABELS,
  VORGANG_TYP_LABELS,
  type VerwalterVorgang,
} from "@shared/verwalterVorgangTypes";

type DashboardStats = {
  objekteCount: number;
  openVorgaenge: number;
  overdueVorgaenge: number;
  neueEvents?: number;
  ausstehendeFreigaben?: number;
  neueInboxNachrichten?: number;
  featureFlags?: { inbox?: boolean };
};

const QUICK_LINKS = [
  { name: "Objekt anlegen", href: "/app/verwalter/objekte", icon: Database, desc: "Stammdaten & Einheiten" },
  { name: "Vorgang erstellen", href: "/app/verwalter/vorgaenge", icon: Kanban, desc: "Kanban & Fristen" },
  { name: "Brief & Vorlage", href: "/app/verwalter/vorlagen", icon: FileText, desc: "Mahnung, ETV, NK" },
  { name: "Buchung erfassen", href: "/app/verwalter/buchungen", icon: BookOpen, desc: "Hausgeld & DATEV" },
  { name: "Mahnwesen", href: "/app/verwalter/mahnwesen", icon: Scale, desc: "3 Stufen + Freigabe" },
  { name: "ETV-Paket", href: "/app/verwalter/etv", icon: Users, desc: "Protokoll, Beschlüsse, Fristen" },
  { name: "E-Mail-Inbox", href: "/app/verwalter/inbox", icon: Inbox, desc: "Eingehende Mails → Vorgänge" },
  { name: "Fristen-Checkliste", href: "/app/verwalter/fristen", icon: Clock, desc: "ETV, NK, Mahnung" },
  { name: "Rechenpraxis", href: "/rechenpraxis", icon: Building2, desc: "WEG-Aufgaben üben" },
] as const;

function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: number;
  hint?: string;
  tone?: "default" | "warn";
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        tone === "warn" && value > 0
          ? "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30"
          : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
      }`}
    >
      <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-1 text-3xl font-bold tabular-nums">{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}

export default function VerwalterDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [objekte, setObjekte] = useState<VerwalterObjekt[]>([]);
  const [vorgaenge, setVorgaenge] = useState<VerwalterVorgang[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [dashRes, objRes, vorRes] = await Promise.all([
          fetch("/api/verwalter/dashboard", { credentials: "include" }),
          fetch("/api/verwalter/objekte", { credentials: "include" }),
          fetch("/api/verwalter/vorgaenge", { credentials: "include" }),
        ]);
        const [dash, obj, vor] = await Promise.all([dashRes.json(), objRes.json(), vorRes.json()]);
        if (cancelled) return;
        if (!dashRes.ok || !dash.success) throw new Error(dash.error || "Dashboard nicht geladen");
        setStats({
          objekteCount: dash.objekteCount,
          openVorgaenge: dash.openVorgaenge,
          overdueVorgaenge: dash.overdueVorgaenge,
          neueEvents: dash.neueEvents,
          ausstehendeFreigaben: dash.ausstehendeFreigaben,
          neueInboxNachrichten: dash.neueInboxNachrichten,
          featureFlags: dash.featureFlags,
        });
        if (obj.success) setObjekte(obj.objekte);
        if (vor.success) setVorgaenge(vor.vorgaenge);
      } catch (e: any) {
        if (!cancelled) setError(e.message || "Laden fehlgeschlagen");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const priorityVorgaenge = useMemo(() => {
    return vorgaenge
      .filter((v) => v.status !== "erledigt")
      .sort((a, b) => {
        const aOver = isVorgangOverdue(a) ? 0 : 1;
        const bOver = isVorgangOverdue(b) ? 0 : 1;
        if (aOver !== bOver) return aOver - bOver;
        const aDue = a.faelligAm ? new Date(a.faelligAm).getTime() : Infinity;
        const bDue = b.faelligAm ? new Date(b.faelligAm).getTime() : Infinity;
        return aDue - bDue;
      })
      .slice(0, 6);
  }, [vorgaenge]);

  const recentObjekte = objekte.slice(0, 4);

  return (
    <>
      <SEO
        title="Verwalter-Übersicht — Verwalter-Rechner"
        description="Dashboard für WEG-Objekte, Vorgänge, Buchungen und Vorlagen im Verwalter-Rechner."
      />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-600">
              <LayoutDashboard className="h-5 w-5" />
              <span className="text-sm font-medium">Verwalter-Rechner</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Übersicht</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Ihre WEG-Objekte, offenen Vorgänge und Schnellzugriffe an einem Ort.
            </p>
          </div>
          <Link href="/app/verwalter/objekte">
            <Button className="min-h-[44px] gap-2 bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4" />
              Neues Objekt
            </Button>
          </Link>
        </div>

        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </p>
        )}

        {loading ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            ))}
          </div>
        ) : stats && stats.objekteCount === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900/50">
            <Building2 className="mx-auto h-10 w-10 text-emerald-600" />
            <h2 className="mt-4 text-lg font-semibold">Willkommen im Verwalter-Rechner</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
              Legen Sie Ihr erstes WEG-Objekt an — danach stehen Vorlagen, Vorgänge, Buchungen und der KI-Assistent
              zur Verfügung.
            </p>
            <Link href="/app/verwalter/objekte">
              <Button className="mt-6 min-h-[44px] bg-emerald-600 hover:bg-emerald-700">
                Erstes Objekt anlegen
              </Button>
            </Link>
          </div>
        ) : stats ? (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              <StatCard label="WEG-Objekte" value={stats.objekteCount} hint="Stammdaten & Einheiten" />
              <StatCard label="Offene Vorgänge" value={stats.openVorgaenge} hint="Kanban — nicht erledigt" />
              <StatCard
                label="Überfällig"
                value={stats.overdueVorgaenge}
                hint="Fälligkeitsdatum verstrichen"
                tone="warn"
              />
              <StatCard
                label="Neue Events"
                value={stats.neueEvents ?? 0}
                hint="Automatisierungs-Log"
              />
              <StatCard
                label="Freigaben"
                value={stats.ausstehendeFreigaben ?? 0}
                hint="KI-Entwürfe warten"
                tone={(stats.ausstehendeFreigaben ?? 0) > 0 ? "warn" : "default"}
              />
              {stats.featureFlags?.inbox && (
                <StatCard
                  label="Inbox"
                  value={stats.neueInboxNachrichten ?? 0}
                  hint="Neue E-Mails"
                  tone={(stats.neueInboxNachrichten ?? 0) > 0 ? "warn" : "default"}
                />
              )}
            </div>

            {stats.overdueVorgaenge > 0 && (
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950/30">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div className="min-w-0 text-sm">
                  <span className="font-medium text-amber-900 dark:text-amber-200">
                    {stats.overdueVorgaenge} überfällige Vorgänge
                  </span>
                  <span className="text-amber-800 dark:text-amber-300">
                    {" "}
                    — bitte im Kanban bearbeiten oder Fristen anpassen.
                  </span>
                </div>
              </div>
            )}

            <section className="mt-10">
              <h2 className="text-lg font-semibold">Schnellzugriff</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {QUICK_LINKS.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <a className="flex min-h-[72px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/20">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
                        <item.icon className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.desc}</div>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-400" />
                    </a>
                  </Link>
                ))}
              </div>
            </section>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <section>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold">Priorität — Vorgänge</h2>
                  <Link href="/app/verwalter/vorgaenge">
                    <a className="text-sm text-emerald-600 hover:underline">Alle anzeigen</a>
                  </Link>
                </div>
                {priorityVorgaenge.length === 0 ? (
                  <p className="mt-4 text-sm text-slate-500">Keine offenen Vorgänge.</p>
                ) : (
                  <ul className="mt-4 space-y-2">
                    {priorityVorgaenge.map((v) => {
                      const overdue = isVorgangOverdue(v);
                      return (
                        <li
                          key={v.id}
                          className={`rounded-lg border px-4 py-3 ${
                            overdue
                              ? "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20"
                              : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                          }`}
                        >
                          <div className="font-medium text-sm leading-snug">{v.titel}</div>
                          <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
                            <span>{v.objektName}</span>
                            <span>·</span>
                            <span>{VORGANG_TYP_LABELS[v.typ]}</span>
                            <span>·</span>
                            <span>{VORGANG_STATUS_LABELS[v.status]}</span>
                            {v.faelligAm && (
                              <>
                                <span>·</span>
                                <span className={overdue ? "font-medium text-red-600" : ""}>
                                  Fällig {new Date(v.faelligAm).toLocaleDateString("de-DE")}
                                </span>
                              </>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>

              <section>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold">Ihre Objekte</h2>
                  <Link href="/app/verwalter/objekte">
                    <a className="text-sm text-emerald-600 hover:underline">Verwalten</a>
                  </Link>
                </div>
                {recentObjekte.length === 0 ? (
                  <p className="mt-4 text-sm text-slate-500">Noch keine Objekte angelegt.</p>
                ) : (
                  <ul className="mt-4 space-y-2">
                    {recentObjekte.map((o) => (
                      <li
                        key={o.id}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
                      >
                        <div className="font-medium text-sm">{o.name}</div>
                        <div className="mt-1 text-xs text-slate-500">
                          {o.plz} {o.ort}
                          {o.einheitenAnzahl > 0 && ` · ${o.einheitenAnzahl} Einheit${o.einheitenAnzahl !== 1 ? "en" : ""}`}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Link href={`/app/verwalter/vorgaenge?objekt=${encodeURIComponent(o.id)}`}>
                            <a className="text-xs text-emerald-600 hover:underline">Vorgänge</a>
                          </Link>
                          <Link href={`/app/verwalter/buchungen?objekt=${encodeURIComponent(o.id)}`}>
                            <a className="text-xs text-emerald-600 hover:underline">Buchungen</a>
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
