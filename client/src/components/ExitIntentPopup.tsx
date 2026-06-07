import { useExitIntent } from "@/hooks/useExitIntent";
import { useLocation } from "wouter";
import { MARKETING_LEARNING_TASKS_LABEL } from "@shared/claims";

export default function ExitIntentPopup() {
  const { isTriggered, dismiss } = useExitIntent({
    delay: 5000,
    sessionKey: "exitIntent_v1",
  });
  const [, navigate] = useLocation();

  if (!isTriggered) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(4px)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center
        animate-in fade-in zoom-in-95 duration-300">

        <div className="text-5xl mb-4">🎓</div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Warte — bevor du gehst!
        </h2>
        <p className="text-slate-500 mb-6">
          Teste das Portal <strong>24 Stunden lang kostenlos</strong> —
          KI-Tutor, {MARKETING_LEARNING_TASKS_LABEL} Prüfungsfragen. Testzugang kostenlos anfordern.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-blue-800 font-semibold text-sm">
            ✓ Testzugang für alle 5 Module (auf Anfrage)
          </p>
          <p className="text-blue-600 text-sm">✓ KI-Tutor 24/7 nutzbar</p>
          <p className="text-blue-600 text-sm">✓ {MARKETING_LEARNING_TASKS_LABEL} IHK-Prüfungsfragen</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => { dismiss(); navigate("/#kostenlos-testen"); }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white
              font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Jetzt kostenlos testen →
          </button>
          <button
            onClick={dismiss}
            className="w-full text-slate-400 hover:text-slate-600
              text-sm py-2 transition-colors"
          >
            Nein danke, ich gehe ohne Testzugang
          </button>
        </div>
      </div>
    </div>
  );
}
