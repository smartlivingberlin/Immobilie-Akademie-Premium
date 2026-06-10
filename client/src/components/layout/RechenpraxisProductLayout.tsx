import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  BookOpen,
  Building2,
  Calculator,
  Clock,
  CreditCard,
  Database,
  FileText,
  Kanban,
  ClipboardCheck,
  Inbox,
  LayoutDashboard,
  Scale,
  Users,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { ComfortBar, ComfortBarMini } from "@/components/ComfortBar";
import { Button } from "@/components/ui/button";
import { hasFullRechenpraxisAccess } from "@shared/rechenpraxisAccess";
import { VerwalterAssistent } from "@/components/verwalter/VerwalterAssistent";
import { VerwalterGuideBanner } from "@/components/verwalter/VerwalterGuideBanner";
import { VerwalterOnboarding } from "@/components/verwalter/VerwalterOnboarding";

const NAV = [
  { name: "Übersicht", href: "/app/verwalter", icon: LayoutDashboard, exact: true },
  { name: "Rechenpraxis", href: "/rechenpraxis", icon: Building2 },
  { name: "Praxisrechner", href: "/rechner", icon: Calculator },
  { name: "Objekte", href: "/app/verwalter/objekte", icon: Database },
  { name: "Vorlagen", href: "/app/verwalter/vorlagen", icon: FileText },
  { name: "Vorgänge", href: "/app/verwalter/vorgaenge", icon: Kanban },
  { name: "Mahnwesen", href: "/app/verwalter/mahnwesen", icon: Scale },
  { name: "ETV-Paket", href: "/app/verwalter/etv", icon: Users },
  { name: "Inbox", href: "/app/verwalter/inbox", icon: Inbox },
  { name: "Freigaben", href: "/app/verwalter/freigaben", icon: ClipboardCheck },
  { name: "Buchungen", href: "/app/verwalter/buchungen", icon: BookOpen },
  { name: "Fristen", href: "/app/verwalter/fristen", icon: Clock },
  { name: "Preise & Abo", href: "/rechenpraxis-preise", icon: CreditCard },
];

function isNavActive(location: string, href: string, exact?: boolean): boolean {
  if (exact || href === "/rechenpraxis") return location === href;
  return location === href || location.startsWith(href + "/");
}

type DashboardStats = {
  objekteCount: number;
  openVorgaenge: number;
  overdueVorgaenge: number;
  ausstehendeFreigaben?: number;
};

export default function RechenpraxisProductLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      window.location.href = "/verwalter-rechner";
    },
  });
  const { data: user } = trpc.auth.me.useQuery();
  const fullAccess = hasFullRechenpraxisAccess(user?.enabledModules ?? "", user?.role);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (!user?.id) return;
    fetch("/api/verwalter/dashboard", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setDashboard({
            objekteCount: d.objekteCount,
            openVorgaenge: d.openVorgaenge,
            overdueVorgaenge: d.overdueVorgaenge,
            ausstehendeFreigaben: d.ausstehendeFreigaben,
          });
        }
      })
      .catch(() => {});
  }, [user?.id]);

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      {NAV.map((item) => {
        const active = isNavActive(location, item.href, "exact" in item ? item.exact : undefined);
        return (
          <Link key={item.href} href={item.href}>
            <a
              onClick={onNavigate}
              className={`flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-emerald-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.name}
            </a>
          </Link>
        );
      })}
      <div className="my-3 border-t border-slate-700" />
      <Link href="/kurse">
        <a
          onClick={onNavigate}
          className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <GraduationCap className="h-5 w-5 shrink-0" />
          Immobilien-Akademie
        </a>
      </Link>
      <Link href="/">
        <a
          onClick={onNavigate}
          className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <Home className="h-5 w-5 shrink-0" />
          Startseite
        </a>
      </Link>
    </>
  );

  const FreemiumBanner = () =>
    !fullAccess ? (
      <p className="rounded-md bg-amber-500/15 px-2 py-1.5 text-[11px] text-amber-200">
        Gratis-Vorschau — 10 WEG-Aufgaben in Rechenpraxis
      </p>
    ) : null;

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-slate-50 dark:bg-slate-950">
      <aside className="hidden w-64 shrink-0 flex-col bg-slate-900 text-white md:flex">
        <div className="border-b border-slate-800 p-5">
          <Link href="/verwalter-rechner">
            <a className="block">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold leading-tight">Verwalter-Rechner</div>
                  <div className="text-[10px] text-emerald-300/80">Rechenpraxis · WEG & NK</div>
                </div>
              </div>
            </a>
          </Link>
          <div className="mt-3">
            <FreemiumBanner />
          </div>
          {dashboard && (dashboard.objekteCount > 0 || dashboard.openVorgaenge > 0) && (
            <div className="mt-3 space-y-1 rounded-lg bg-slate-800/80 p-2 text-[11px] text-slate-300">
              <div>{dashboard.objekteCount} Objekt{dashboard.objekteCount !== 1 ? "e" : ""}</div>
              <div>{dashboard.openVorgaenge} offene Vorgänge</div>
              {dashboard.overdueVorgaenge > 0 && (
                <div className="text-amber-300">{dashboard.overdueVorgaenge} überfällig</div>
              )}
              {(dashboard.ausstehendeFreigaben ?? 0) > 0 && (
                <div className="text-violet-300">{dashboard.ausstehendeFreigaben} Freigaben</div>
              )}
            </div>
          )}
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <NavLinks />
        </nav>
        <div className="border-t border-slate-800 p-3">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-slate-400 hover:text-white"
            onClick={() => logoutMutation.mutate()}
          >
            <LogOut className="h-4 w-4" />
            Abmelden
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 sm:px-4 md:px-6 md:py-3">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              className="shrink-0 rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-300"
              onClick={() => setMobileOpen(true)}
              aria-label="Menü öffnen"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100 md:hidden">
              Verwalter-Rechner
            </span>
          </div>
          <div className="shrink-0 md:hidden">
            <ComfortBarMini />
          </div>
          <div className="hidden shrink-0 md:block">
            <ComfortBar compact />
          </div>
        </header>

        <VerwalterGuideBanner path={location} />
        <main className="min-w-0 flex-1">{children}</main>
        <VerwalterAssistent />
        <VerwalterOnboarding objekteCount={dashboard?.objekteCount ?? 0} />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-label="Menü schließen"
          />
          <div className="absolute left-0 top-0 flex h-full w-[min(100vw-3rem,18rem)] flex-col bg-slate-900 text-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 p-4">
              <span className="font-bold">Verwalter-Rechner</span>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Menü schließen">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="border-b border-slate-800 px-4 py-2">
              <FreemiumBanner />
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-3">
              <NavLinks onNavigate={() => setMobileOpen(false)} />
            </nav>
            <div className="border-t border-slate-800 p-3">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-slate-400 hover:text-white"
                onClick={() => {
                  setMobileOpen(false);
                  logoutMutation.mutate();
                }}
              >
                <LogOut className="h-4 w-4" />
                Abmelden
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
