import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [, navigate] = useLocation();
  const token = new URLSearchParams(window.location.search).get("token") ?? "";
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) return setError("Passwörter stimmen nicht überein.");
    if (password.length < 8) return setError("Mindestens 8 Zeichen erforderlich.");
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await res.json();
      if (data.ok) setDone(true);
      else setError(data.error ?? "Fehler beim Zurücksetzen.");
    } catch {
      setError("Netzwerkfehler. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
        <p className="text-red-600">Ungültiger Reset-Link.</p>
        <Link href="/login" className="text-blue-600 hover:underline mt-4 block">Zum Login</Link>
      </div>
    </div>
  );

  if (done) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="text-xl font-bold mb-2">Passwort geändert</h2>
        <p className="text-slate-600 mb-4">Du kannst dich jetzt mit deinem neuen Passwort anmelden.</p>
        <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Zum Login</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-2">Neues Passwort</h2>
        <p className="text-slate-600 mb-6 text-sm">Gib dein neues Passwort ein.</p>
        {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Neues Passwort" value={password}
              onChange={e => setPassword(e.target.value)} required minLength={8}
              className="w-full border rounded-lg px-4 py-3 text-sm" />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <div className="relative">
            <input type={showPassword2 ? "text" : "password"} placeholder="Passwort wiederholen" value={password2}
              onChange={e => setPassword2(e.target.value)} required
              className="w-full border rounded-lg px-4 py-3 text-sm" />
            <button type="button" onClick={() => setShowPassword2(!showPassword2)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {showPassword2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50">
            {loading ? "Wird gespeichert..." : "Passwort ändern"}
          </button>
        </form>
      </div>
    </div>
  );
}
