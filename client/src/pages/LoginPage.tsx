import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff } from "lucide-react";

type Mode = "login" | "register";

export default function LoginPage() {
  const [, navigate] = useLocation();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [demoCode, setDemoCode] = useState("");
  const [demoCodeLoading, setDemoCodeLoading] = useState(false);
  const [demoCodeMsg, setDemoCodeMsg] = useState("");

  async function handleDemoCode() {
    if (!demoCode.trim()) return;
    setDemoCodeLoading(true);
    setDemoCodeMsg("");
    try {
      const res = await fetch("/api/auth/redeem-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: demoCode.trim() }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || data?.error) {
        setDemoCodeMsg("❌ Ungültiger oder abgelaufener Code.");
      } else {
        setDemoCodeMsg("✅ Zugang freigeschaltet! Wird weitergeleitet…");
        setTimeout(() => { window.location.href = "/"; }, 1500);
      }
    } catch {
      setDemoCodeMsg("❌ Verbindungsfehler.");
    } finally {
      setDemoCodeLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const body = mode === "login" ? { email, password } : { email, password, name };
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Ein Fehler ist aufgetreten."); return; }
      window.location.href = "/";
    } catch {
      setError("Verbindungsfehler. Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4" style={{ position: "relative", zIndex: 9999 }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white text-2xl font-bold">IA</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Immobilien-Akademie</h1>
          <p className="text-blue-300 text-sm mt-1">Vorbereitung auf die IHK-Sachkundeprüfung §34c/§34i</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8" style={{ position: "relative", zIndex: 9999 }}>
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            {mode === "login" ? "Anmelden" : "Konto erstellen"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ihr Name"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ihre@email.de"
                required
                autoComplete="email"
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Passwort</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Ihr Passwort"
                  required
                  autoComplete="current-password"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ paddingRight: "40px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0 }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
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
          </form>

          <div className="mt-5 text-center text-sm text-slate-500">
            {mode === "login" ? (
              <>
                <div>
                  Noch kein Konto?{" "}
                  <button type="button" onClick={() => { setMode("register"); setError(""); }} className="text-blue-600 hover:underline font-medium">
                    Jetzt registrieren
                  </button>
                </div>
                <div className="mt-2">
                  <a href="/forgot-password" className="text-sm text-slate-400 hover:underline">
                    Passwort vergessen?
                  </a>
                </div>
                <div className="mt-3">
                  <button type="button" onClick={() => setShowCodeInput(v => !v)} className="text-xs text-slate-400 hover:text-slate-600 underline">
                    🔑 Präsentations-Code eingeben
                  </button>
                  {showCodeInput && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        placeholder="z.B. DEMO-2026-XYZ"
                        value={demoCode}
                        onChange={e => setDemoCode(e.target.value.toUpperCase())}
                        className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button type="button" onClick={handleDemoCode} disabled={demoCodeLoading} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
                        {demoCodeLoading ? "…" : "OK"}
                      </button>
                    </div>
                  )}
                  {demoCodeMsg && (
                    <p className={`text-xs mt-1 ${demoCodeMsg.startsWith("✅") ? "text-green-600" : "text-red-500"}`}>
                      {demoCodeMsg}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <span>Bereits registriert?{" "}</span>
                <button type="button" onClick={() => { setMode("login"); setError(""); }} className="text-blue-600 hover:underline font-medium">
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
