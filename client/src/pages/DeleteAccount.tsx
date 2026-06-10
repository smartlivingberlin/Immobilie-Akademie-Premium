import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";

export default function DeleteAccount() {
  const { user } = useAuth();
  const [confirmed, setConfirmed] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const deleteMutation = trpc.account.deleteMyAccount.useMutation({
    onSuccess: () => setDone(true),
    onError: (e) => setError(e.message),
  });

  if (done) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
        <div className="text-4xl mb-4">👋</div>
        <h2 className="text-xl font-bold mb-2">Konto gelöscht</h2>
        <p className="text-slate-600 mb-4">Alle deine Daten wurden gelöscht gemäß Art. 17 DSGVO.</p>
        <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Zur Startseite</a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-2 text-red-600">Konto löschen</h2>
        <p className="text-slate-600 mb-4 text-sm">
          Dies löscht dauerhaft alle deine Daten: Konto, Lernfortschritt, Verwalter-Werkzeuge 
          (WEG-Objekte, Vorgänge, Buchungen) und Sessions. Diese Aktion kann nicht rückgängig gemacht werden.
        </p>
        <p className="text-sm text-slate-500 mb-6">
          Eingeloggt als: <strong>{user?.email}</strong>
        </p>
        {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
        <label className="flex items-center gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={e => setConfirmed(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">Ich verstehe, dass alle meine Daten unwiderruflich gelöscht werden.</span>
        </label>
        <div className="flex gap-3">
          <Link href="/"
            className="flex-1 text-center py-3 border rounded-lg text-sm hover:bg-slate-50">
            Abbrechen
          </Link>
          <button
            onClick={() => deleteMutation.mutate()}
            disabled={!confirmed || deleteMutation.isPending}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50"
          >
            {deleteMutation.isPending ? "Wird gelöscht..." : "Konto löschen"}
          </button>
        </div>
      </div>
    </div>
  );
}
