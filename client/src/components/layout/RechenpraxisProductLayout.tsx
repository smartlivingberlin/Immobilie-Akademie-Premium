import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Building2,
  Calculator,
  CreditCard,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { ComfortBar } from "@/components/ComfortBar";
import { Button } from "@/components/ui/button";
import { hasFullRechenpraxisAccess } from "@shared/rechenpraxisAccess";

const NAV = [
  { name: "Rechenpraxis", href: "/rechenpraxis", icon: Building2 },
  { name: "Praxisrechner", href: "/rechner", icon: Calculator },
  { name: "Preise & Abo", href: "/rechenpraxis-preise", icon: CreditCard },
];

export default function RechenpraxisProductLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      window.location.href = "/verwalter-rechner";
    },
  });
  const { data: user } = trpc.auth.me.useQuery();
  const fullAccess = hasFullRechenpraxisAccess(user?.enabledModules ?? "", user?.role);

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      {NAV.map((item) => {
        const active = location === item.href || location.startsWith(item.href + "/");
        return (
          <Link key={item.href} href={item.href}>
            <a
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
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
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <GraduationCap className="h-5 w-5 shrink-0" />
          Immobilien-Akademie
        </a>
      </Link>
      <Link href="/">
        <a
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <Home className="h-5 w-5 shrink-0" />
          Startseite
        </a>
      </Link>
    </>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
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
          {!fullAccess && (
            <p className="mt-3 rounded-md bg-amber-500/15 px-2 py-1.5 text-[11px] text-amber-200">
              Gratis-Vorschau — 10 WEG-Aufgaben
            </p>
          )}
        </div>
        <nav className="flex-1 space-y-1 p-3">
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
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 md:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-300"
              onClick={() => setMobileOpen(true)}
              aria-label="Menü öffnen"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 md:hidden">
              Verwalter-Rechner
            </span>
          </div>
          <ComfortBar compact />
        </header>

        <main className="flex-1">{children}</main>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-72 flex-col bg-slate-900 text-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 p-4">
              <span className="font-bold">Verwalter-Rechner</span>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Menü schließen">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 p-3">
              <NavLinks onNavigate={() => setMobileOpen(false)} />
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
