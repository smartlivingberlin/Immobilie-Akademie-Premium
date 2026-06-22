import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { RENEWAL_YEARLY_EUR } from "@shared/accessPolicy";

const ACCESS_CLAIM_SHORT = `Lernzeit inklusive · danach ab ${RENEWAL_YEARLY_EUR} €/Jahr weiternutzbar`;

const PRODUCT_SKELETON_COUNT = 7;

function KurseProductSkeleton() {
  return (
    <div
      aria-hidden="true"
      style={{
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: 20,
        padding: "28px 24px",
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="mt-auto h-12 w-full" />
    </div>
  );
}


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
  const [productsLoading, setProductsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [widerrufsChecked, setWiderrufsChecked] = useState(false);
  const [agbChecked, setAgbChecked] = useState(false);
  const [checkError, setCheckError] = useState(false);

  useEffect(() => {
    fetch("/api/stripe/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch(console.error)
      .finally(() => setProductsLoading(false));
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
        body: JSON.stringify({ productId, userEmail: user?.email, widerrufsAkzeptiert: true }),
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
    <div style={{ minHeight:"100vh", background:"var(--color-bg, #f8fafc)" }}>

      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg, #0c1628 0%, #0f2744 100%)", padding:"64px 20px 48px" }}>
        <div style={{ maxWidth:860, margin:"0 auto", textAlign:"center" }}>
          <div style={{ display:"inline-block", background:"rgba(37,99,235,0.15)", border:"1px solid rgba(96,165,250,0.3)", color:"#bfdbfe", borderRadius:24, padding:"6px 18px", fontSize:12, fontWeight:700, marginBottom:20 }}>
            🎓 PRAXISWISSEN · §34c · §34i · WEG-VERWALTUNG
          </div>
          <h1 style={{ fontFamily:"Fraunces, Georgia, serif", fontSize:"clamp(28px, 4vw, 44px)", fontWeight:900, color:"#f1f5f9", marginBottom:12, lineHeight:1.2 }}>
            Einzelne Kurse kaufen
          </h1>
          <p style={{ fontSize:16, color:"#64748b", maxWidth:500, margin:"0 auto", lineHeight:1.6 }}>
            Wählen Sie ein einzelnes Modul oder sparen Sie mit unseren Paketen.{" "}
            Einmalzahlung mit Lernzeit inklusive (4–20 Monate je nach Modul). Danach optional ab {RENEWAL_YEARLY_EUR} €/Jahr.
            Keine automatische Verlängerung beim Erstkauf.
          </p>
        </div>
      </div>

    <div className="max-w-5xl mx-auto px-4 py-12">

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        aria-busy={productsLoading}
        aria-live="polite"
      >
        {productsLoading
          ? Array.from({ length: PRODUCT_SKELETON_COUNT }, (_, i) => (
              <KurseProductSkeleton key={`product-skeleton-${i}`} />
            ))
          : products.map((p) => (
          <div key={p.id} style={{
            background:"white",
            border: p.id === "modul_komplett" ? "2px solid #2563eb" : "1px solid #e2e8f0",
            borderRadius:20, padding:"28px 24px",
            display:"flex", flexDirection:"column", gap:16,
            boxShadow: p.id === "modul_komplett" ? "0 8px 32px rgba(37,99,235,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
            transition:"all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = p.id === "modul_komplett" ? "0 8px 32px rgba(37,99,235,0.15)" : "0 2px 8px rgba(0,0,0,0.04)"; }}
          >
            {p.id === "modul_komplett" && (
              <span style={{ alignSelf:"flex-start", background:"linear-gradient(135deg,#2563eb,#7c3aed)", color:"white", fontSize:11, fontWeight:800, padding:"4px 14px", borderRadius:20 }}>
                ⭐ Empfohlen
              </span>
            )}
            <div>
              <h2 style={{ fontSize:16, fontWeight:800, color:"#0f172a", margin:"0 0 6px", fontFamily:"Fraunces, Georgia, serif" }}>{p.name}</h2>
              <p style={{ fontSize:12, color:"#64748b", lineHeight:1.5, margin:0 }}>{p.description}</p>
            </div>
            <div style={{ fontSize:34, fontWeight:900, color:"#2563eb", fontFamily:"Fraunces, Georgia, serif", letterSpacing:"-0.02em" }}>{p.priceFormatted}</div>
            <div style={{ fontSize:11, color:"#475569", background:"#f8fafc", borderRadius:8, padding:"6px 10px" }}>
              {p.modules === "1,2,3,4,5" ? "📚 Alle 5 Module enthalten" : p.modules.split(",").length > 1 ? `📚 Inkl. Modul ${p.modules.split(",").join(" + ")}` : `📚 Modul ${p.modules}`}
            </div>
            {KURS_SLUGS[p.id] && (
              <Link href={`/kurs/${KURS_SLUGS[p.id]}`}>
                <button style={{ width:"100%", border:"1px solid #dbeafe", color:"#2563eb", background:"white", fontWeight:600, borderRadius:10, padding:"10px", fontSize:13, cursor:"pointer", transition:"all 0.2s" }}>
                  📖 Kurs-Details & Inhalte
                </button>
              </Link>
            )}
            <button
              onClick={() => handleBuy(p.id)}
              disabled={loading}
              style={{ marginTop:"auto", background:"linear-gradient(135deg,#2563eb,#1d4ed8)", color:"white", fontWeight:700, borderRadius:10, padding:"13px", fontSize:14, cursor:"pointer", border:"none", opacity:loading ? 0.6 : 1, boxShadow:"0 4px 14px rgba(37,99,235,0.35)" }}
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
            <span className="text-slate-600 text-xs">(§356 Abs. 5 BGB)</span>
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

      {/* ── PAKETE HINWEIS ─────────────────────────────── */}
      <div style={{
        background:"linear-gradient(135deg,#0f172a,#1e3a5f)",
        borderRadius:16, padding:"24px 28px", marginBottom:20,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        flexWrap:"wrap", gap:16
      }}>
        <div>
          <div style={{fontSize:16,fontWeight:800,color:"#f1f5f9",marginBottom:4}}>
            💰 Mehrere Module? Bis zu 290 € sparen!
          </div>
          <div style={{fontSize:13,color:"#64748b"}}>
            Mit unseren Vorteilspaketen bekommen Sie alle Module günstiger — {ACCESS_CLAIM_SHORT}.
            Keine automatische Verlängerung beim Erstkauf.
          </div>
        </div>
        <Link href="/pakete">
          <button style={{
            background:"linear-gradient(135deg,#2563eb,#7c3aed)",
            color:"white", border:"none", borderRadius:10,
            padding:"12px 24px", fontSize:14, fontWeight:700,
            cursor:"pointer", whiteSpace:"nowrap",
            boxShadow:"0 4px 14px rgba(37,99,235,0.4)"
          }}>
            Alle Pakete ansehen →
          </button>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-6 text-xs text-slate-600 flex-wrap">
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
    </div>
  );
}
