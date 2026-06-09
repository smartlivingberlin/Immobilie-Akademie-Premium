import { useAuth } from "@/_core/hooks/useAuth";
import { isInspectModeSync } from "@/lib/inspectMode";
import { isAccessExpired } from "@shared/accessPolicy";
import RenewalPaywall from "@/components/RenewalPaywall";

/** Mindestens ein Modul + gültiger Zugang (Rechenpraxis, Rechner, Tools). */
export default function PortalToolGuard({
  children,
  freemiumAccess = false,
}: {
  children: React.ReactNode;
  /** Eingeloggte Nutzer ohne Modulzugang (z. B. 10 WEG-Aufgaben gratis) */
  freemiumAccess?: boolean;
}) {
  const { user, loading } = useAuth();

  if (isInspectModeSync()) return <>{children}</>;
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!user) return null;

  if (user.role === "admin") return <>{children}</>;

  const modules = (user.enabledModules || "").split(",").map((m) => m.trim()).filter(Boolean);
  const accessExpiresAt = (user as { accessExpiresAt?: string }).accessExpiresAt;
  const trialExpiresAt = (user as { trialExpiresAt?: string }).trialExpiresAt;
  const accessExpired = Boolean(accessExpiresAt) && isAccessExpired(accessExpiresAt);
  const trialExpired = trialExpiresAt ? new Date(trialExpiresAt) < new Date() : false;

  if (accessExpired && modules.length > 0) {
    return <RenewalPaywall accessExpiresAt={accessExpiresAt} />;
  }

  if (trialExpired && modules.length > 0) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Testzugang abgelaufen</h2>
        <p className="text-slate-600 text-sm mb-6">
          Praxis-Tools sind nach Modulkauf oder aktivem Testzugang verfügbar.
        </p>
        <a href="/kurse" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl text-sm">
          Jetzt kaufen →
        </a>
      </div>
    );
  }

  if (modules.length === 0 && !freemiumAccess) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Kurszugang erforderlich</h2>
        <p className="text-slate-600 text-sm mb-6">
          Rechenpraxis, Rechner und Praxis-Tools sind nach Modulkauf oder Testzugang verfügbar.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="/rechenpraxis-preise" className="inline-block bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl text-sm">
            Rechenpraxis Solo ab 19 €/Mo →
          </a>
          <a href="/kurse" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl text-sm">
            Kurse ansehen →
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
