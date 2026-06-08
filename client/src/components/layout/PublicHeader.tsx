import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Headphones, BookOpen, Award } from "lucide-react";
import { DarkModeToggle } from "@/components/DarkModeToggle";

const NAV = [
  { href: "/kurse",           label: "Kurse" },
  { href: "/warum-wir",       label: "Warum wir" },
  { href: "/pakete",          label: "Pakete" },
  { href: "/glossary",        label: "Glossar",      icon: BookOpen },
  { href: "/foerderung",      label: "Förderung",    icon: Award },
  { href: "/audio-modus",     label: "Audio-Modus",  icon: Headphones },
];

export default function PublicHeader() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2.5 group">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-sm">IA</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-semibold text-sm text-foreground leading-none">Immobilien Akademie</div>
                <div className="text-xs text-muted-foreground leading-none mt-0.5">Smart</div>
              </div>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = location === href;
              return (
                <Link key={href} href={href}>
                  <a className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}>
                    {Icon && <Icon className="h-3.5 w-3.5" />}
                    {label}
                  </a>
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <Link href="/code-einloesen">
              <a className="hidden lg:inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                Code einlösen
              </a>
            </Link>
            <Link href="/b2b-einrichtung">
              <a className="hidden lg:inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                B2B-Portal
              </a>
            </Link>
            <Link href="/login">
              <a className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                Anmelden
              </a>
            </Link>
            <Link href="/kurs/modul-1-immobilien-grundkurs">
              <a className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                Kostenlos testen
              </a>
            </Link>

            {/* Mobile menu toggle */}
            <button onClick={() => setOpen(!open)}
              className="md:hidden rounded-lg p-1.5 hover:bg-muted transition-colors"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {open && (
          <div className="md:hidden border-t border-border py-3 space-y-1">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <a onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location === href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}>
                  {Icon && <Icon className="h-4 w-4" />}
                  {label}
                </a>
              </Link>
            ))}
            <div className="pt-2 border-t border-border flex flex-col gap-2 px-3">
              <Link href="/code-einloesen">
                <a onClick={() => setOpen(false)} className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-muted transition-colors">
                  Code einlösen
                </a>
              </Link>
              <Link href="/b2b-einrichtung">
                <a onClick={() => setOpen(false)} className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-muted transition-colors">
                  B2B-Portal
                </a>
              </Link>
              <Link href="/login">
                <a onClick={() => setOpen(false)} className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-muted transition-colors">
                  Anmelden
                </a>
              </Link>
              <Link href="/kurs/modul-1-immobilien-grundkurs">
                <a className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                  Kostenlos testen
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
