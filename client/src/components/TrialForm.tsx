import { useState } from "react";

const MODULES = [
  { value: "modul-1", label: "Modul 1 — Grundkurs (149 EUR)" },
  { value: "modul-2", label: "Modul 2 — Makler §34c (499 EUR)" },
  { value: "modul-3", label: "Modul 3 — WEG-Verwalter (699 EUR)" },
  { value: "modul-4", label: "Modul 4 — Gutachter (399 EUR)" },
  { value: "modul-5", label: "Modul 5 — Darlehensvermittler §34i (499 EUR)" },
];

export function TrialForm({ moduleSlug }: { moduleSlug?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [moduleInterest, setModuleInterest] = useState(moduleSlug || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [extended, setExtended] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      setError("Bitte Name und E-Mail eingeben.");
      return;
    }
    if (!email.includes("@")) {
      setError("Bitte gueltige E-Mail eingeben.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/trial/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), moduleInterest }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Fehler. Bitte versuchen Sie es erneut.");
      } else {
        setSuccess(true);
        setExtended(!!data.extended);
      }
    } catch {
      setError("Verbindungsfehler.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-5xl mb-4">📬</div>
        <h3 className="text-xl font-bold text-green-900 mb-2">
          {extended ? "Zugang verlaengert!" : "Ihr Testzugang ist unterwegs!"}
        </h3>
        <p className="text-green-700 mb-4">
          Wir haben Ihnen einen Zugangscode per E-Mail gesendet.
          {extended ? " Verlaengerung um 24 Stunden." : " Gueltig fuer 24 Stunden."}
        </p>
        <p className="text-green-600 text-sm mb-6">
          Bitte pruefen Sie auch Ihren Spam-Ordner.
        </p>
        <a href="/code-einloesen" className="inline-block bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors">
          Code jetzt einloesen
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-2">Kostenlos 24h testen</h3>
      <p className="text-slate-500 text-sm mb-6">
        Vollstaendiger Zugang — ohne Kreditkarte.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Ihr Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Max Mustermann"
            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">E-Mail *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="max@beispiel.de"
            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Modul-Interesse</label>
          <select
            value={moduleInterest}
            onChange={(e) => setModuleInterest(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Alle Module</option>
            {MODULES.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
            {error}
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-slate-900 text-amber-400 font-bold py-4 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 text-lg"
        >
          {loading ? "Wird erstellt..." : "Code per E-Mail erhalten"}
        </button>
        <p className="text-xs text-slate-400 text-center">
          Kein Spam. Kein Abo.
        </p>
      </div>
    </div>
  );
}
