import { useLocation, Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

interface ModuleGuardProps {
  moduleId: number;
  children: React.ReactNode;
}

export default function ModuleGuard({ moduleId, children }: ModuleGuardProps) {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  const enabled = (user.enabledModules || "1")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);

  const hasAccess = user.role === "admin" || enabled.includes(String(moduleId));

  if (hasAccess) {
    return <>{children}</>;
  }

  const moduleNames: Record<number, string> = {
    1: "Einführung in die Immobilienwirtschaft",
    2: "Makler §34c GewO",
    3: "Verwalter WEG/Miet (Hauptmodul)",
    4: "Gutachter & Bewertung",
    5: "Darlehensvermittler §34i GewO",
  };

  const modulePrices: Record<number, string> = {
    1: "Kostenlos",
    2: "499 €",
    3: "im Komplettpaket",
    4: "im Komplettpaket",
    5: "im Komplettpaket",
  };

  const waText = encodeURIComponent(
    "Hallo, ich möchte Modul " + moduleId + " der Immobilien-Akademie freischalten."
  );
  const waUrl = "https://wa.me/491711526327?text=" + waText;

  return (
    <div className="relative min-h-[70vh] overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none select-none" aria-hidden="true">
        <div className="p-8 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-slate-300 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-full" />
              <div className="h-3 bg-slate-200 rounded w-5/6" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[70vh] px-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-2">Modul {moduleId} gesperrt</h2>
          <p className="text-slate-500 text-sm mb-1 font-medium">
            {moduleNames[moduleId] || "Modul " + moduleId}
          </p>
          <p className="text-slate-400 text-sm mb-6">
            Schalte dieses Modul frei, um auf alle Lerninhalte, Praxisrechner und den KI-Tutor zuzugreifen.
          </p>

          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span>💡</span>
            <span>{modulePrices[moduleId] || "Paketpreis"}</span>
          </div>

          <div className="space-y-3">
            <Link href="/kurse">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm">
                Jetzt freischalten →
              </button>
            </Link>

            
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border border-slate-200 hover:border-green-400 hover:bg-green-50 text-slate-600 hover:text-green-700 font-medium py-3 px-6 rounded-xl transition-colors text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Per WhatsApp anfragen
            </a>

            <button
              onClick={() => window.history.back()}
              className="w-full text-slate-400 hover:text-slate-600 text-sm py-2 transition-colors"
            >
              ← Zurück
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-400">
            <span>🔒 Sichere Zahlung</span>
            <span>•</span>
            <span>📋 Sofortiger Zugang</span>
            <span>•</span>
            <span>✅ DSGVO-konform</span>
          </div>
        </div>
      </div>
    </div>
  );
}
