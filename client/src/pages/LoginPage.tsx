/**
 * LoginPage.tsx – Universelle Login-Seite
 *
 * Funktioniert unabhängig von Manus.
 * Email + Passwort → JWT-Cookie → geschützte Seiten
 */

import { useState } from "react";
import { useLocation } from "wouter";

type Mode = "login" | "register";

export default function LoginPage() {
  const [, navigate] = useLocation();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const body = mode === "login"
      ? { email, password }
      : { email, password, name };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ein Fehler ist aufgetreten.");
        return;
      }

      // Erfolgreich → zur Startseite
      window.location.href = "/";
    } catch {
      setError("Verbindungsfehler. Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">ML</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Immobilien-Akademie</h1>
          <p className="text-blue-300 text-sm mt-1">
            Vorbereitung auf die IHK-Sachkundeprüfung §34c/§34i
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            {mode === "login" ? "Anmelden" : "Konto erstellen"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ihr vollständiger Name"
                  required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                E-Mail
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ihre@email.de"
                required
                autoComplete="email"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={mode === "register" ? "Mindestens 8 Zeichen" : "Ihr Passwort"}
                required
                minLength={mode === "register" ? 8 : 1}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
            >
              {loading
                ? (mode === "login" ? "Anmelden…" : "Konto erstellen…")
                : (mode === "login" ? "Anmelden" : "Konto erstellen")}
            </button>
            {mode === "login" && (

            )}
          </form>

          {/* Mode switch */}
          <div className="mt-5 text-center text-sm text-slate-500">
            {mode === "login" ? (
              <>
                Noch kein Konto?{" "}
                <button
                  onClick={() => { setMode("register"); setError(""); }}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Jetzt registrieren
                </button>
                <div className="mt-2">
                  <a href="/forgot-password" className="text-sm text-slate-400 hover:underline">Passwort vergessen?</a>
                </div>
              </>
            ) : (
              <>
                Bereits registriert?{" "}
                <button
                  onClick={() => { setMode("login"); setError(""); }}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Anmelden
                </button>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-blue-400 mt-6">
          Ausgestellt von Alisad Gadyri · IHK-Immobilienkaufmann (Berlin, 2023)
        </p>
      </div>
    </div>
  );
}
