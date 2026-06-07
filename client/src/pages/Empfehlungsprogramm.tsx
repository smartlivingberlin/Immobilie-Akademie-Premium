import { useEffect, useState } from "react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { Gift, Copy, Users, CheckCircle2 } from "lucide-react";
import { REFERRAL_PROGRAM_SUMMARY, REFERRAL_TOOL_VOUCHERS } from "@shared/referral";
import { useToast } from "@/hooks/use-toast";
import { trpc } from "@/lib/trpc";

export default function Empfehlungsprogramm() {
  const { data: user } = trpc.auth.me.useQuery();
  const { toast } = useToast();
  const [info, setInfo] = useState<{ code: string; link: string } | null>(null);

  useEffect(() => {
    if (!user) return;
    fetch("/api/referral/info", { credentials: "include" })
      .then((r) => r.ok ? r.json() : null)
      .then((d) => d && setInfo({ code: d.code, link: d.link }))
      .catch(() => {});
  }, [user]);

  const copyLink = () => {
    if (!info?.link) return;
    navigator.clipboard.writeText(info.link);
    toast({ title: "Link kopiert", description: "Teilen Sie Ihren Empfehlungslink." });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Empfehlungsprogramm — Prämien für Weiterempfehlungen"
        description="Empfehlen Sie die Immobilien Akademie Smart. 30 Tage Bonus für Sie, 14 Tage für Geworbene nach Erstkauf."
      />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
          <Gift className="h-4 w-4" /> Empfehlungsprogramm
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Empfehlen & profitieren</h1>
        <p className="text-slate-600 mb-8">{REFERRAL_PROGRAM_SUMMARY}</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl border p-5">
            <Users className="h-7 w-7 text-blue-600 mb-2" />
            <h2 className="font-semibold">Für Sie</h2>
            <p className="text-sm text-slate-600 mt-1">30 Tage Zugangsverlängerung nach dem ersten Kauf Ihres Geworbenen.</p>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <Gift className="h-7 w-7 text-emerald-600 mb-2" />
            <h2 className="font-semibold">Für Geworbene</h2>
            <p className="text-sm text-slate-600 mt-1">14 Tage extra Zugang nach ihrem ersten Modulkauf.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6 mb-8">
          <h2 className="font-semibold mb-3">Geplante Tool-Gutscheine (Partner & Social)</h2>
          <ul className="space-y-2">
            {REFERRAL_TOOL_VOUCHERS.map((v) => (
              <li key={v.id} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                {v.label}
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500 mt-4">
            Verifizierung über persönlichen Link, Erstkauf oder Partner-Codes — Auszahlungen für Partner auf Anfrage.
          </p>
        </div>

        {user ? (
          info ? (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-sm text-slate-600 mb-2">Ihr Empfehlungslink</p>
              <code className="block text-sm bg-white p-3 rounded border mb-4 break-all">{info.link}</code>
              <button
                onClick={copyLink}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
              >
                <Copy className="h-4 w-4" /> Link kopieren
              </button>
            </div>
          ) : (
            <p className="text-slate-500 text-sm">Lade Empfehlungsdaten…</p>
          )
        ) : (
          <div className="bg-slate-100 rounded-xl p-6 text-center">
            <p className="text-slate-600 mb-4">Melden Sie sich an, um Ihren persönlichen Empfehlungslink zu erhalten.</p>
            <Link href="/login">
              <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Zum Login →</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
