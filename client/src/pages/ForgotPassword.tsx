import { useState } from "react";
import { Link } from "wouter";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) setSent(true);
      else setError(data.error ?? "Fehler beim Senden.");
    } catch {
      setError("Netzwerkfehler. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
        <div className="text-4xl mb-4">📧</div>
        <h2 className="text-xl font-bold mb-2">E-Mail gesendet</h2>
        <p className="text-slate-600 mb-4">Falls ein Konto mit dieser E-Mail existiert, erhältst du einen Reset-Link.</p>
        <Link href="/login" className="text-blue-600 hover:underline">Zurück zum Login</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-2">Passwort vergessen</h2>
        <p className="text-slate-600 mb-6 text-sm">Gib deine E-Mail ein — wir senden dir einen Reset-Link.</p>
        {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="ihre@email.de"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-3 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Wird gesendet..." : "Reset-Link senden"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/login" className="text-sm text-slate-500 hover:underline">Zurück zum Login</Link>
        </div>
      </div>
    </div>
  );
}
