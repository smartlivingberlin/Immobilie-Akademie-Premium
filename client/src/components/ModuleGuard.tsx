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

  // Trial-Ablauf prüfen
  const trialExpiresAt = (user as { trialExpiresAt?: string | Date }).trialExpiresAt;
  const trialExpired = trialExpiresAt
    ? new Date(trialExpiresAt) < new Date()
    : false;

  const enabled = (user.enabledModules || "").split(",").map((m) => m.trim()).filter(Boolean);
  const hasAccess = user.role === "admin" || 
    (enabled.includes(String(moduleId)) && !trialExpired);

  if (hasAccess) {
    return <>{children}</>;
  }

  // Trial abgelaufen
  if (trialExpired && enabled.includes(String(moduleId))) {
    return (
      <div className="relative min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-3xl">⏰</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Testzugang abgelaufen</h2>
          <p className="text-slate-500 text-sm mb-6">
            Dein 24h-Testzugang ist abgelaufen. Kaufe das Modul um weiterzulernen.
          </p>
          <div className="space-y-3">
            <a href="/kurse">
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm">
                Jetzt kaufen und weiterlernen →
              </button>
            </a>
            <button onClick={() => window.history.back()}
              className="w-full text-slate-400 hover:text-slate-600 text-sm py-2 transition-colors">
              ← Zurück
            </button>
          </div>
        </div>
      </div>
    );
  }

  const names: Record<number, string> = {
    1: "Einführung Immobilienwirtschaft",
    2: "Makler §34c GewO",
    3: "Verwalter WEG/Miet",
    4: "Gutachter & Bewertung",
    5: "Darlehensvermittler §34i GewO",
  };

  const prices: Record<number, string> = {
    1: "149 €", 2: "499 €", 3: "699 €", 4: "399 €", 5: "499 €",
  };

  const waUrl = "https://wa.me/491711526327?text=" + encodeURIComponent("Hallo, ich möchte Modul " + moduleId + " freischalten.");

  const waCls = "flex items-center justify-center gap-2 w-full border border-slate-200 hover:border-green-400 hover:bg-green-50 text-slate-600 hover:text-green-700 font-medium py-3 px-6 rounded-xl transition-colors text-sm";

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
          <p className="text-slate-500 text-sm mb-1 font-medium">{names[moduleId] || "Modul " + moduleId}</p>
          <p className="text-slate-400 text-sm mb-6">Schalte dieses Modul frei, um auf alle Lerninhalte und den KI-Tutor zuzugreifen.</p>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span>{prices[moduleId] || "Paketpreis"}</span>
          </div>
          <div className="space-y-3">
            <Link href="/kurse">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm">Jetzt freischalten →</button>
            </Link>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className={waCls}>Per WhatsApp anfragen</a>
            <button onClick={() => window.history.back()} className="w-full text-slate-400 hover:text-slate-600 text-sm py-2 transition-colors">← Zurück</button>
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
