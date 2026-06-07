import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Gift, Users, TrendingUp, Clock, Download, Banknote } from "lucide-react";
import { PARTNER_PAYOUT_POLICY } from "@shared/partnerPayouts";

type ReferralStats = {
  totalReferralCodes: number;
  totalAttributed: number;
  totalRewards: number;
  totalRewardDays: number;
  topReferrers: Array<{ userId: number; name: string; email: string; code: string; referrals: number; rewardDays: number }>;
  recentRewards: Array<{ id: number; userId: number; type: string; amountDays: number; note: string | null; createdAt: string }>;
};

type BackfillPreview = {
  dryRun: boolean;
  candidates: number;
  rows: Array<{ id: number; email: string; modules: string; newExpiry: string }>;
};

type LedgerRow = {
  id: number;
  partnerName: string;
  partnerEmail: string;
  periodStart: string;
  periodEnd: string;
  referralCount: number;
  commissionEur: number;
  status: string;
  stripeTransferId?: string | null;
};

export default function ReferralAdmin() {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [backfill, setBackfill] = useState<BackfillPreview | null>(null);
  const [ledger, setLedger] = useState<LedgerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [backfillLoading, setBackfillLoading] = useState(false);
  const [ledgerLoading, setLedgerLoading] = useState(false);
  const [payoutDetails, setPayoutDetails] = useState<Array<{ name: string; email: string; accountHolder: string; ibanLast4: string; status: string }>>([]);
  const [error, setError] = useState("");

  const loadStats = () => {
    setLoading(true);
    fetch("/api/admin/referral-stats", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { if (d.error) throw new Error(d.error); setStats(d); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  const loadLedger = () => {
    fetch("/api/admin/payout-ledger", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => d.rows && setLedger(d.rows))
      .catch(() => {});
  };

  const loadPayoutDetails = () => {
    fetch("/api/admin/partner-payout-details", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => d.rows && setPayoutDetails(d.rows))
      .catch(() => {});
  };

  useEffect(() => {
    loadStats();
    loadLedger();
    loadPayoutDetails();
  }, []);

  const generateLedger = async () => {
    const now = new Date();
    const qStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
    const periodStart = qStart.toISOString().slice(0, 10);
    const periodEnd = now.toISOString().slice(0, 10);
    setLedgerLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/payout-ledger/generate", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ periodStart, periodEnd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generierung fehlgeschlagen");
      loadLedger();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLedgerLoading(false);
    }
  };

  const connectTransferBatch = async () => {
    if (!window.confirm("Alle Connect-fähigen pending-Einträge auszahlen?")) return;
    setLedgerLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/payout-ledger/connect-transfer-batch", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Batch-Transfer fehlgeschlagen");
      loadLedger();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLedgerLoading(false);
    }
  };

  const connectTransfer = async (id: number) => {
    if (!window.confirm("Connect-Transfer wirklich ausführen?")) return;
    setLedgerLoading(true);
    try {
      const res = await fetch("/api/admin/payout-ledger/connect-transfer", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Transfer fehlgeschlagen");
      loadLedger();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLedgerLoading(false);
    }
  };

  const markPaid = async (id: number) => {
    setLedgerLoading(true);
    try {
      const res = await fetch("/api/admin/payout-ledger/mark-paid", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Markierung fehlgeschlagen");
      loadLedger();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLedgerLoading(false);
    }
  };

  const runBackfill = async (apply: boolean) => {
    setBackfillLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/backfill-access", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apply }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Backfill fehlgeschlagen");
      setBackfill(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBackfillLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 20px" }}>
      <Link href="/admin">
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748b", cursor: "pointer", marginBottom: 20 }}>
          <ArrowLeft size={14} /> Admin
        </span>
      </Link>

      <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Empfehlungsprogramm</h1>
      <p style={{ color: "#64748b", marginBottom: 24 }}>Conversions, Rewards und Backfill-Ops</p>

      {error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: "#dc2626" }}>
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: "#64748b" }}>Laden…</p>
      ) : stats && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
            {[
              { icon: Gift, label: "Referral-Codes", value: stats.totalReferralCodes, color: "#2563eb" },
              { icon: Users, label: "Zugeordnet", value: stats.totalAttributed, color: "#7c3aed" },
              { icon: TrendingUp, label: "Rewards", value: stats.totalRewards, color: "#059669" },
              { icon: Clock, label: "Bonus-Tage", value: stats.totalRewardDays, color: "#d97706" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 16 }}>
                <Icon size={18} color={color} style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>{value}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{label}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Top-Empfehler</h2>
          {stats.topReferrers.length === 0 ? (
            <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 24 }}>Noch keine Empfehlungen mit Kauf.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 28, fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                  <th style={{ padding: "8px 12px" }}>Nutzer</th>
                  <th style={{ padding: "8px 12px" }}>Code</th>
                  <th style={{ padding: "8px 12px" }}>Empfehlungen</th>
                  <th style={{ padding: "8px 12px" }}>Bonus-Tage</th>
                </tr>
              </thead>
              <tbody>
                {stats.topReferrers.map((r) => (
                  <tr key={r.userId} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "10px 12px" }}>{r.name}<br /><span style={{ color: "#94a3b8", fontSize: 11 }}>{r.email}</span></td>
                    <td style={{ padding: "10px 12px", fontFamily: "monospace" }}>{r.code}</td>
                    <td style={{ padding: "10px 12px" }}>{r.referrals}</td>
                    <td style={{ padding: "10px 12px" }}>{r.rewardDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Letzte Rewards</h2>
          {stats.recentRewards.length === 0 ? (
            <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 28 }}>Keine Rewards protokolliert.</p>
          ) : (
            <div style={{ marginBottom: 28, fontSize: 13 }}>
              {stats.recentRewards.slice(0, 10).map((r) => (
                <div key={r.id} style={{ padding: "8px 0", borderBottom: "1px solid #f1f5f9", color: "#475569" }}>
                  User #{r.userId} · +{r.amountDays}d · {r.type} · {new Date(r.createdAt).toLocaleDateString("de-DE")}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Auszahlungs-Ledger</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          <button
            onClick={generateLedger}
            disabled={ledgerLoading}
            style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "#2563eb", color: "white", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
          >
            {ledgerLoading ? "…" : "Quartal-Einträge generieren"}
          </button>
          <button
            onClick={connectTransferBatch}
            disabled={ledgerLoading}
            style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #7c3aed", background: "white", color: "#7c3aed", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
          >
            Alle Connect-fähigen auszahlen
          </button>
        </div>
        {ledger.length === 0 ? (
          <p style={{ fontSize: 13, color: "#94a3b8" }}>Noch keine Ledger-Einträge (Migration 0039).</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                <th style={{ padding: "8px" }}>Partner</th>
                <th style={{ padding: "8px" }}>Zeitraum</th>
                <th style={{ padding: "8px" }}>Refs</th>
                <th style={{ padding: "8px" }}>Provision</th>
                <th style={{ padding: "8px" }}>Status</th>
                <th style={{ padding: "8px" }} />
              </tr>
            </thead>
            <tbody>
              {ledger.map((r) => (
                <tr key={r.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "8px" }}>{r.partnerName}<br /><span style={{ color: "#94a3b8", fontSize: 11 }}>{r.partnerEmail}</span></td>
                  <td style={{ padding: "8px" }}>{r.periodStart} – {r.periodEnd}</td>
                  <td style={{ padding: "8px" }}>{r.referralCount}</td>
                  <td style={{ padding: "8px" }}>{r.commissionEur.toFixed(2)} €</td>
                  <td style={{ padding: "8px" }}>{r.status}</td>
                  <td style={{ padding: "8px" }}>
                    {r.status === "pending" && (
                      <span style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        <button onClick={() => connectTransfer(r.id)} style={{ fontSize: 11, padding: "4px 8px", borderRadius: 6, border: "1px solid #7c3aed", background: "white", cursor: "pointer", color: "#7c3aed" }}>
                          Connect
                        </button>
                        <button onClick={() => markPaid(r.id)} style={{ fontSize: 11, padding: "4px 8px", borderRadius: 6, border: "1px solid #059669", background: "white", cursor: "pointer", color: "#059669" }}>
                          Manuell
                        </button>
                      </span>
                    )}
                    {r.stripeTransferId && (
                      <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>{r.stripeTransferId.slice(0, 12)}…</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {payoutDetails.length > 0 && (
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Hinterlegte Auszahlungsdaten</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                <th style={{ padding: "8px" }}>Partner</th>
                <th style={{ padding: "8px" }}>Kontoinhaber</th>
                <th style={{ padding: "8px" }}>IBAN ···</th>
                <th style={{ padding: "8px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payoutDetails.map((r) => (
                <tr key={r.email} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "8px" }}>{r.name}<br /><span style={{ color: "#94a3b8", fontSize: 11 }}>{r.email}</span></td>
                  <td style={{ padding: "8px" }}>{r.accountHolder}</td>
                  <td style={{ padding: "8px", fontFamily: "monospace" }}>···{r.ibanLast4}</td>
                  <td style={{ padding: "8px" }}>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#166534", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <Banknote size={18} /> Partner-Auszahlungen
        </h2>
        <p style={{ fontSize: 13, color: "#166534", marginBottom: 12 }}>
          {PARTNER_PAYOUT_POLICY.commissionPercent}% Provision auf Erstkäufe · Mindestauszahlung {PARTNER_PAYOUT_POLICY.minPayoutEur} € ·
          Quartalsweise ({PARTNER_PAYOUT_POLICY.payoutCycle}). {PARTNER_PAYOUT_POLICY.trackingNote}
        </p>
        <a
          href="/api/admin/partner-payout-export"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#059669", color: "white", fontSize: 13, fontWeight: 600, textDecoration: "none" }}
        >
          <Download size={14} /> CSV-Export (Schätzung)
        </a>
      </div>

      <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>Backfill accessExpiresAt</h2>
        <p style={{ fontSize: 13, color: "#78350f", marginBottom: 16 }}>
          Setzt Ablaufdatum für Bestandskäufer ohne <code>accessExpiresAt</code> (30-Tage-Grace wenn bereits abgelaufen).
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() => runBackfill(false)}
            disabled={backfillLoading}
            style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #d97706", background: "white", cursor: "pointer", fontSize: 13 }}
          >
            {backfillLoading ? "…" : "Dry-run"}
          </button>
          <button
            onClick={() => window.confirm("Backfill wirklich anwenden?") && runBackfill(true)}
            disabled={backfillLoading}
            style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "#d97706", color: "white", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
          >
            Anwenden
          </button>
        </div>
        {backfill && (
          <div style={{ marginTop: 16, fontSize: 12, color: "#78350f" }}>
            {backfill.dryRun ? "Dry-run" : "Angewendet"}: {backfill.candidates} Kandidaten
            {backfill.rows.slice(0, 5).map((r) => (
              <div key={r.id}>#{r.id} {r.email} → {r.newExpiry}</div>
            ))}
            {backfill.rows.length > 5 && <div>…und {backfill.rows.length - 5} weitere</div>}
          </div>
        )}
      </div>
    </div>
  );
}
