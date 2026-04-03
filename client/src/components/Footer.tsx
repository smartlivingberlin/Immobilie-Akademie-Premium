import { Link } from "wouter";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import { resetCookieConsent } from "./CookieConsent";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold text-white">Immobilien Akademie</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ihr umfassendes Lernportal für die Ausbildung zum Immobilienmakler, Verwalter, 
              Gutachter und Darlehensvermittler.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                IHK-Prüfungsvorbereitung
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Schnellzugriff</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <Link href="/lehrplan" className="hover:text-white transition-colors">
                  Lehrplan
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-white transition-colors">
                  Glossar
                </Link>
              </li>
              <li>
                <Link href="/rechner" className="hover:text-white transition-colors">
                  Praxisrechner
                </Link>
              </li>
              <li>
                <Link href="/user-guide" className="hover:text-white transition-colors">
                  Benutzerhandbuch
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Rechtliches</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/impressum" className="hover:text-white transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-white transition-colors">
                  Datenschutzerklärung</Link>
              </li>
              <li>
                <Link href="/widerruf" className="hover:text-white transition-colors">Widerrufsbelehrung</Link>
                <Link href="/bildungskonzept" className="hover:text-white transition-colors">Bildungskonzept</Link>
              </li>
              <li>
                <Link href="/agb" className="hover:text-white transition-colors">
                  AGB
                </Link>
              </li>
              <li>
                <button
                  onClick={resetCookieConsent}
                  className="hover:text-white transition-colors text-left"
                >
                  Cookie-Einstellungen
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-blue-500" />
                <span>
                  Durlacher Str. 36<br />
                  10715 Berlin
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-blue-500" />
                <a href="tel:+4917115263270" className="hover:text-white transition-colors">
                  +49 171 1526327
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-blue-500" />
                <a href="mailto:alisadgadyri38@gmail.com" className="hover:text-white transition-colors">
                  gadyri@icloud.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>
              © {currentYear} Immobilien Akademie. Alle Rechte vorbehalten.
            </p>
            <p className="text-xs">
              Entwickelt mit ❤️ für die Immobilienbranche
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
