import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle, AlertTriangle, ExternalLink, Copy } from "lucide-react";
import { buildStripeLiveEnvTemplate } from "@shared/stripeLiveEnv";
import { STRIPE_TEST_CARD, STRIPE_TEST_CHECKOUT_STEPS } from "@shared/stripeTestGuide";
import type { StripeLiveChecklistResult } from "@shared/stripeLiveChecklist";

const CATEGORY_LABELS: Record<string, string> = {
  legal: "Rechtliches",
  stripe: "Stripe",
  email: "E-Mail",
  ops: "Betrieb",
};

type ChecklistResponse = StripeLiveChecklistResult & {
  webhookHealth?: {
    lastVerifiedAt: string | null;
    lastEventType: string | null;
    totalVerified: number;
    recentlyActive: boolean;
    endpoint: string;
  };
};

export default function StripeLiveChecklist() {
  const [data, setData] = useState<ChecklistResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [verifyResult, setVerifyResult] = useState<{
    ok: boolean; mode: string; currency?: string; error?: string; recommendation?: string;
    priceConfig?: Record<string, { configured: boolean; env: string }>;
  } | null>(null);
  const [verifying, setVerifying] = useState(false);

  const runStripeVerify = () => {
    setVerifying(true);
    fetch("/api/admin/stripe-live-verify", { credentials: "include" })
      .then((r) => r.json())
      .then(setVerifyResult)
      .catch((e) => setVerifyResult({ ok: false, mode: "?", error: e.message }))
      .finally(() => setVerifying(false));
  };

  const copyEnvTemplate = () => {
    navigator.clipboard.writeText(buildStripeLiveEnvTemplate());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    fetch("/api/admin/stripe-live-checklist", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setData(d);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const modeLabel =
    data?.stripeMode === "live"
      ? "LIVE"
      : data?.stripeMode === "test"
        ? "TEST"
        : "FEHLT";

  const modeColor =
    data?.stripeMode === "live" ? "#059669" : data?.stripeMode === "test" ? "#d97706" : "#dc2626";

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
      <Link href="/admin">
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748b", cursor: "pointer", marginBottom: 20 }}>
          <ArrowLeft size={14} /> Admin
        </span>
      </Link>

      <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>
        Stripe Live-Checkliste
      </h1>
      <p style={{ color: "#64748b", marginBottom: 24 }}>
        Schritt-für-Schritt vor Umschaltung auf Live-Zahlungen
      </p>

      {error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: "#dc2626" }}>
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: "#64748b" }}>Laden…</p>
      ) : data && (
        <>
          <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 16, flex: 1, minWidth: 140 }}>
              <div style={{ fontSize: 12, color: "#64748b" }}>Stripe-Modus</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: modeColor }}>{modeLabel}</div>
            </div>
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 16, flex: 1, minWidth: 140 }}>
              <div style={{ fontSize: 12, color: "#64748b" }}>Fortschritt</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>
                {data.doneCount}/{data.totalCount}
              </div>
            </div>
            <a
              href="https://dashboard.stripe.com"
              target="_blank"
              rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "center", background: "#635bff", color: "white", padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}
            >
              Stripe Dashboard <ExternalLink size={14} />
            </a>
            <button
              type="button"
              onClick={copyEnvTemplate}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "center", background: "#0f172a", color: "white", padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}
            >
              <Copy size={14} /> {copied ? "Kopiert!" : "ENV-Vorlage"}
            </button>
          </div>

          <div style={{ background: verifyResult?.ok ? "#f0fdf4" : "#fffbeb", border: `1px solid ${verifyResult?.ok ? "#bbf7d0" : "#fcd34d"}`, borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <strong style={{ fontSize: 14 }}>API-Verifizierung</strong>
              <button
                type="button"
                onClick={runStripeVerify}
                disabled={verifying}
                style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: "#2563eb", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              >
                {verifying ? "Prüfe…" : "Stripe API testen"}
              </button>
            </div>
            {verifyResult && (
              <div style={{ marginTop: 10, fontSize: 13, color: verifyResult.ok ? "#166534" : "#92400e" }}>
                {verifyResult.ok
                  ? <>✅ {verifyResult.mode.toUpperCase()}-Modus · Balance: {verifyResult.currency}</>
                  : <>❌ {verifyResult.error}</>}
                {verifyResult.recommendation && <div style={{ fontSize: 12, marginTop: 4 }}>{verifyResult.recommendation}</div>}
                {verifyResult.priceConfig && (
                  <div style={{ fontSize: 11, marginTop: 8, color: "#64748b" }}>
                    Price-IDs: {Object.values(verifyResult.priceConfig).filter((p: { configured: boolean }) => p.configured).length}/4
                  </div>
                )}
              </div>
            )}
          </div>

          {data.webhookHealth && (
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: 16, marginBottom: 20, fontSize: 13 }}>
              <strong>Webhook-Health:</strong>{" "}
              {data.webhookHealth.recentlyActive ? "✅ Aktiv" : "⚠️ Kein Event (7d)"} ·{" "}
              {data.webhookHealth.totalVerified} Events gesamt
              {data.webhookHealth.lastVerifiedAt && (
                <> · Letztes: {data.webhookHealth.lastEventType} ({new Date(data.webhookHealth.lastVerifiedAt).toLocaleString("de-DE")})</>
              )}
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{data.webhookHealth.endpoint}</div>
            </div>
          )}

          <div style={{ width: "100%", height: 8, background: "#e2e8f0", borderRadius: 4, marginBottom: 24 }}>
            <div
              style={{
                width: `${(data.doneCount / data.totalCount) * 100}%`,
                height: "100%",
                background: "#2563eb",
                borderRadius: 4,
              }}
            />
          </div>

          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: 16, marginBottom: 24 }}>
            <strong style={{ fontSize: 14 }}>Testzahlung (Testmodus)</strong>
            <p style={{ fontSize: 12, color: "#64748b", margin: "8px 0" }}>
              Karte: {STRIPE_TEST_CARD.number} · {STRIPE_TEST_CARD.exp} · CVC {STRIPE_TEST_CARD.cvc}
            </p>
            <ol style={{ fontSize: 12, color: "#475569", margin: 0, paddingLeft: 18 }}>
              {STRIPE_TEST_CHECKOUT_STEPS.map((step) => (
                <li key={step} style={{ marginBottom: 4 }}>{step}</li>
              ))}
            </ol>
          </div>

          {(["legal", "stripe", "email", "ops"] as const).map((cat) => {
            const items = data.items.filter((i) => i.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
                  {CATEGORY_LABELS[cat]}
                </h2>
                <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "14px 16px",
                        borderBottom: "1px solid #f1f5f9",
                      }}
                    >
                      {item.ok ? (
                        <CheckCircle size={18} color="#059669" style={{ flexShrink: 0, marginTop: 2 }} />
                      ) : (
                        <AlertTriangle size={18} color={item.urgent ? "#dc2626" : "#d97706"} style={{ flexShrink: 0, marginTop: 2 }} />
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{item.label}</div>
                        {item.detail && (
                          <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{item.detail}</div>
                        )}
                        {item.action && !item.ok && (
                          <div style={{ fontSize: 11, color: item.urgent ? "#dc2626" : "#92400e", marginTop: 4 }}>
                            → {item.action}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
