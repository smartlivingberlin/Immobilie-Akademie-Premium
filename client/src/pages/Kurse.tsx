import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";


const KURS_SLUGS: Record<string, string> = {
  modul_1: "modul-1-immobilien-grundkurs",
  modul_2: "modul-2-makler-34c",
  modul_3: "modul-3-weg-verwalter",
  modul_4: "modul-4-gutachter",
  modul_5: "modul-5-34i-darlehensvermittler",
  modul_komplett: "",
};

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceFormatted: string;
  modules: string;
}

export default function Kurse() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [widerrufsChecked, setWiderrufsChecked] = useState(false);
  const [agbChecked, setAgbChecked] = useState(false);
  const [checkError, setCheckError] = useState(false);

  useEffect(() => {
    fetch("/api/stripe/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const handleBuy = async (productId: string) => {
    if (!widerrufsChecked || !agbChecked) {
      setCheckError(true);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      return;
    }
    setCheckError(false);
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, userEmail: user?.email }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Fehler: " + data.error);
    } catch {
      alert("Fehler beim Checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Kurse & Pakete</h1>
      <p className="text-slate-500 mb-10 text-sm">Wähle dein Paket und starte sofort mit der Ausbildung. Alle Module einzeln oder als Komplettpaket buchbar.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {products.map((p) => (
          <div key={p.id} className={`bg-white rounded-2xl p-7 flex flex-col gap-4 shadow-sm ${
            p.id === "modul_komplett"
              ? "border-2 border-blue-500 ring-1 ring-blue-100"
              : "border border-slate-200"
          }`}>
            {p.id === "modul_komplett" && (
              <span className="self-start bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                ⭐ Empfohlen
              </span>
            )}
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-1">{p.name}</h2>
              <p className="text-xs text-slate-500 leading-relaxed">{p.description}</p>
            </div>
            <div className="text-3xl font-extrabold text-blue-700">{p.priceFormatted}</div>
            <div className="text-xs text-slate-400">Enthaltene Module: {p.modules}</div>
            {KURS_SLUGS[p.id] && (
              <Link href={`/kurs/${KURS_SLUGS[p.id]}`}>
                <button className="w-full border border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold rounded-xl py-2.5 text-sm transition-colors">
                  📖 Kurs-Details & Inhalte
                </button>
              </Link>
            )}
            <button
              onClick={() => handleBuy(p.id)}
              disabled={loading}
              className="mt-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-xl py-3 text-sm transition-colors"
            >
              {loading ? "Weiterleitung..." : "Jetzt kaufen →"}
            </button>
          </div>
        ))}
      </div>

      {/* Pflicht-Checkboxen vor Kauf */}
      <div className={`bg-white border rounded-2xl p-6 mb-6 ${checkError ? "border-red-300 bg-red-50" : "border-slate-200"}`}>
        <h3 className="text-sm font-semibold text-slate-900 mb-4">
          Bitte bestätigen Sie vor dem Kauf:
        </h3>

        <label className="flex items-start gap-3 mb-4 cursor-pointer group">
          <input
            type="checkbox"
            checked={widerrufsChecked}
            onChange={(e) => { setWiderrufsChecked(e.target.checked); setCheckError(false); }}
            className="mt-0.5 w-4 h-4 accent-blue-600 flex-shrink-0"
          />
          <span className="text-sm text-slate-600 leading-relaxed">
            Ich habe die{" "}
            <Link href="/widerruf">
              <span className="text-blue-600 hover:underline font-medium cursor-pointer">Widerrufsbelehrung</span>
            </Link>{" "}
            gelesen und verstanden. Ich stimme ausdrücklich zu, dass mit der Ausführung des Vertrags
            (Freischaltung des Kurszugangs) sofort begonnen wird. Mir ist bekannt, dass ich dadurch
            mein Widerrufsrecht verliere, sobald der digitale Inhalt vollständig geliefert wurde.{" "}
            <span className="text-slate-400 text-xs">(§356 Abs. 5 BGB)</span>
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agbChecked}
            onChange={(e) => { setAgbChecked(e.target.checked); setCheckError(false); }}
            className="mt-0.5 w-4 h-4 accent-blue-600 flex-shrink-0"
          />
          <span className="text-sm text-slate-600 leading-relaxed">
            Ich akzeptiere die{" "}
            <Link href="/agb">
              <span className="text-blue-600 hover:underline font-medium cursor-pointer">AGB</span>
            </Link>{" "}
            und die{" "}
            <Link href="/datenschutz">
              <span className="text-blue-600 hover:underline font-medium cursor-pointer">Datenschutzerklärung</span>
            </Link>{" "}
            der Immobilien-Akademie Smart.
          </span>
        </label>

        {checkError && (
          <div className="mt-4 text-sm text-red-600 font-medium flex items-center gap-2">
            ⚠️ Bitte bestätigen Sie beide Punkte, bevor Sie fortfahren.
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-6 text-xs text-slate-400 flex-wrap">
        <span>🔒 Sichere Zahlung via Stripe</span>
        <span>•</span>
        <span>📋 Sofortiger Kurszugang nach Zahlung</span>
        <span>•</span>
        <Link href="/widerruf">
          <span className="hover:text-slate-600 cursor-pointer">Widerrufsbelehrung</span>
        </Link>
        <span>•</span>
        <Link href="/agb">
          <span className="hover:text-slate-600 cursor-pointer">AGB</span>
        </Link>
      </div>
    </div>
  );
}
