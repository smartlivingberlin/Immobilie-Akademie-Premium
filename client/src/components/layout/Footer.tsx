import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/50 py-4 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
        <span>© {new Date().getFullYear()} Immobilien Akademie Smart · Alisad Gadyri · Berlin</span>
        <div className="flex gap-4">
          <Link href="/impressum">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Impressum</span>
          </Link>
          <Link href="/datenschutz">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Datenschutz</span>
          </Link>
          <Link href="/pakete">Kurs-Pakete</Link>
          <Link href="/fuer-maklerbueros">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Für Maklerbüros</span>
          </Link>
          <Link href="/empfehlungsprogramm">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Empfehlen</span>
          </Link>
          <Link href="/kurse">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Kurse & Preise</span>
          </Link>
          <Link href="/code-einloesen">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Code einlösen</span>
          </Link>
          <Link href="/login">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Einloggen</span>
          </Link>
          <Link href="/statistiken">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Mein Lernbereich</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
