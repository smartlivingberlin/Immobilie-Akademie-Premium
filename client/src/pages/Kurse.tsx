import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";

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

  useEffect(() => {
    fetch("/api/stripe/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const handleBuy = async (productId: string) => {
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
    } catch (e) {
      alert("Fehler beim Checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Kurse & Pakete</h1>
      <p className="text-slate-500 mb-8">Wähle dein Paket und starte sofort mit der Ausbildung.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className={`border rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition ${p.id === "modul_komplett" ? "border-blue-500 ring-2 ring-blue-500" : "border-slate-200"}`}>
            {p.id === "modul_komplett" && (
              <span className="text-xs font-bold bg-blue-600 text-white px-2 py-1 rounded-full self-start">Empfohlen</span>
            )}
            <div>
              <h2 className="text-lg font-bold">{p.name}</h2>
              <p className="text-sm text-slate-500 mt-1">{p.description}</p>
            </div>
            <div className="text-3xl font-bold text-blue-700">{p.priceFormatted}</div>
            <div className="text-xs text-slate-400">Module: {p.modules}</div>
            <button
              onClick={() => handleBuy(p.id)}
              disabled={loading}
              className="mt-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition text-sm"
            >
              {loading ? "Weiterleitung..." : "Jetzt kaufen"}
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-8 text-center">
        🔒 Sichere Zahlung via Stripe · Testkarte: 4242 4242 4242 4242
      </p>
    </div>
  );
}
