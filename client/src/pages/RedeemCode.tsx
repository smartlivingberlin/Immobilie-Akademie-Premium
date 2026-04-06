import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function RedeemCode() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCode = params.get("code");
    if (urlCode) {
      setCode(urlCode.toUpperCase());
    }
  }, []);

  const handleSubmit = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/redeem-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim().toUpperCase() }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/statistiken";
        }, 2000);
      } else {
        setError(data.error || "Code ungültig oder abgelaufen.");
      }
    } catch {
      setError("Verbindungsfehler. Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Zugang freigeschaltet!
          </h1>
          <p className="text-slate-500 mb-6">
            Ihr Zugang wurde aktiviert. Sie werden weitergeleitet...
          </p>
          <div className="animate-pulse text-blue-600">Weiterleitung zum Portal...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔑</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Zugangscode einlösen
          </h1>
          <p className="text-slate-500">
            Gib deinen Zugangscode ein um das Portal freizuschalten.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Dein Zugangscode
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="z.B. TRIAL-ABC123"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-mono tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                ❌ {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !code.trim()}
              className="w-full bg-slate-900 text-amber-400 font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 text-lg"
            >
              {loading ? "Wird geprüft..." : "Code einlösen →"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center space-y-2">
            <p className="text-xs text-slate-400">
              Noch keinen Code? Teste das Portal kostenlos:
            </p>
            <Link href="/kurse">
              <button className="text-blue-600 text-sm font-medium hover:underline">
                Kostenlos 24h testen →
              </button>
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Codes erhalten Sie nach dem Kauf oder per Trial-Anfrage auf den Kurs-Seiten.
        </p>
      </div>
    </div>
  );
}
