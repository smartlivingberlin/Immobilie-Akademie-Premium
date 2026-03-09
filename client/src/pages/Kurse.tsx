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
    } catch {
      alert("Fehler beim Checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Kurse & Pakete</h1>
      <p style={{ color: "#64748b", marginBottom: 40 }}>Wähle dein Paket und starte sofort mit der Ausbildung.</p>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {products.map((p) => (
          <div key={p.id} style={{
            flex: "1 1 280px",
            border: p.id === "modul_komplett" ? "2px solid #3b82f6" : "1px solid #e2e8f0",
            borderRadius: 16,
            padding: 28,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            background: "white",
          }}>
            {p.id === "modul_komplett" && (
              <span style={{ background: "#3b82f6", color: "white", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, alignSelf: "flex-start" }}>
                ⭐ Empfohlen
              </span>
            )}
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{p.name}</h2>
              <p style={{ fontSize: 13, color: "#64748b" }}>{p.description}</p>
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#1d4ed8" }}>{p.priceFormatted}</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>Enthaltene Module: {p.modules}</div>
            <button
              onClick={() => handleBuy(p.id)}
              disabled={loading}
              style={{
                marginTop: "auto",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: "12px 0",
                fontWeight: 700,
                fontSize: 15,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Weiterleitung..." : "Jetzt kaufen →"}
            </button>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 40, textAlign: "center" }}>
        🔒 Sichere Zahlung via Stripe · Testkarte: 4242 4242 4242 4242
      </p>
    </div>
  );
}
