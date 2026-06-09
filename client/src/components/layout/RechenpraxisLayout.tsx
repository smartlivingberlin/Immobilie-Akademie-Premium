import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Calculator, LogOut, LayoutDashboard } from "lucide-react";
import { ComfortBar } from "@/components/ComfortBar";
import { trpc } from "@/lib/trpc";

type RechenpraxisLayoutProps = {
  children: ReactNode;
};

/** Schlankes Produkt-Layout für Rechenpraxis (Standalone-Einstieg ohne Vollportal-Sidebar). */
export function RechenpraxisLayout({ children }: RechenpraxisLayoutProps) {
  const [location] = useLocation();
  const { data: user } = trpc.auth.me.useQuery(undefined, { retry: false });
  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => { window.location.href = "/verwalter-rechner"; },
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/app/rechenpraxis">
              <span className="inline-flex items-center gap-2 font-display font-semibold text-foreground cursor-pointer">
                <Calculator className="h-5 w-5 text-emerald-600 shrink-0" />
                <span className="truncate">Rechenpraxis</span>
              </span>
            </Link>
            <span className="hidden sm:inline text-xs text-muted-foreground border-l border-border pl-3">
              Immobilien Akademie Smart
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <ComfortBar compact />
            <Link href="/rechenpraxis-preise">
              <span className={`hidden md:inline text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                location === "/rechenpraxis-preise"
                  ? "border-emerald-600 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40"
                  : "border-border hover:bg-muted"
              }`}>
                Preise
              </span>
            </Link>
            <Link href="/statistiken">
              <span className="hidden sm:inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted cursor-pointer">
                <LayoutDashboard className="h-3.5 w-3.5" />
                Portal
              </span>
            </Link>
            {user && (
              <button
                type="button"
                onClick={() => logout.mutate()}
                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted"
                aria-label="Abmelden"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Abmelden</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        Rechenpraxis · WEG & Hausverwaltung ·{" "}
        <Link href="/impressum"><span className="hover:underline cursor-pointer">Impressum</span></Link>
        {" · "}
        <Link href="/datenschutz"><span className="hover:underline cursor-pointer">Datenschutz</span></Link>
      </footer>
    </div>
  );
}
