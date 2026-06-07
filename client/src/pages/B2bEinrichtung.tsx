import { useEffect, useState } from "react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { Building2, Palette, KeyRound, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { trpc } from "@/lib/trpc";

type TenantInfo = {
  id: number;
  slug: string;
  companyName: string;
  primaryColor: string;
  welcomeText: string;
  maxUsers: number;
  enabledModules: string;
};

const STEPS = ["Willkommen", "Branding", "Team"];

export default function B2bEinrichtung() {
  const { data: user } = trpc.auth.me.useQuery();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasTenant, setHasTenant] = useState(false);
  const [tenant, setTenant] = useState<TenantInfo | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [welcomeText, setWelcomeText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetch("/api/b2b/onboarding/status", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        setHasTenant(d.hasTenant);
        if (d.tenant) {
          setTenant(d.tenant);
          setCompanyName(d.tenant.companyName || "");
          setPrimaryColor(d.tenant.primaryColor || "#2563eb");
          setWelcomeText(d.tenant.welcomeText || "");
          if (d.completed) setStep(2);
        }
      })
      .catch(() => setError("Status konnte nicht geladen werden"))
      .finally(() => setLoading(false));
  }, [user]);

  const saveBranding = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/b2b/onboarding/branding", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, primaryColor, welcomeText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Speichern fehlgeschlagen");
      setStep(2);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-xl font-bold text-slate-900 mb-2">Anmeldung erforderlich</h1>
          <a href="/login?redirect=/b2b-einrichtung" className="text-blue-600 font-semibold">Jetzt anmelden →</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title="B2B-Einrichtung — White-Label Portal konfigurieren" description="Richten Sie Ihr Maklerbüro-Portal ein: Branding, Willkommenstext und Team-Zugänge." />
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="flex items-center gap-2 text-blue-300 text-sm font-medium mb-6">
            <Building2 className="h-4 w-4" /> B2B-Einrichtung · Schritt {step + 1}/{STEPS.length}
          </div>

          <div className="flex gap-2 mb-8">
            {STEPS.map((label, i) => (
              <div key={label} className={`flex-1 h-1 rounded-full ${i <= step ? "bg-blue-500" : "bg-slate-600"}`} />
            ))}
          </div>

          {loading ? (
            <p className="text-slate-400">Laden…</p>
          ) : !hasTenant ? (
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center">
              <h1 className="text-2xl font-bold mb-3">Tenant wird eingerichtet</h1>
              <p className="text-slate-400 mb-6">
                Ihr White-Label-Tenant wird nach der ersten Zahlung aktiviert. Dies kann einige Minuten dauern.
              </p>
              <Link href="/fuer-maklerbueros">
                <span className="text-blue-400 hover:text-white cursor-pointer">Zurück zur B2B-Seite →</span>
              </Link>
            </div>
          ) : (
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
              {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

              {step === 0 && (
                <>
                  <h1 className="text-2xl font-bold mb-3">Willkommen, {companyName || tenant?.companyName}!</h1>
                  <p className="text-slate-300 mb-6">
                    Ihr {tenant?.enabledModules ? `${tenant.enabledModules.split(",").length} Module` : "B2B"}-Portal ist aktiv.
                    In 2 Schritten passen Sie Branding an und laden Ihr Team ein.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-400 mb-8">
                    <li>· Bis zu {tenant?.maxUsers} Nutzer</li>
                    <li>· Tenant: <code className="text-blue-300">{tenant?.slug}</code></li>
                  </ul>
                  <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold">
                    Branding einrichten <ArrowRight className="h-4 w-4" />
                  </button>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Palette className="h-5 w-5 text-blue-400" />
                    <h1 className="text-xl font-bold">Branding</h1>
                  </div>
                  <label className="block text-sm text-slate-400 mb-1">Firmenname</label>
                  <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full mb-4 px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white" />
                  <label className="block text-sm text-slate-400 mb-1">Primärfarbe</label>
                  <div className="flex gap-3 mb-4">
                    <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-10 w-14 rounded cursor-pointer" />
                    <input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="flex-1 px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white font-mono text-sm" />
                  </div>
                  <label className="block text-sm text-slate-400 mb-1">Willkommenstext fürs Team</label>
                  <textarea value={welcomeText} onChange={(e) => setWelcomeText(e.target.value)} rows={4} placeholder="Willkommen im Lernportal von …" className="w-full mb-6 px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white" />
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(0)} className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-slate-600 text-slate-300">
                      <ArrowLeft className="h-4 w-4" /> Zurück
                    </button>
                    <button type="button" onClick={saveBranding} disabled={saving} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold disabled:opacity-60">
                      {saving ? "Speichern…" : "Weiter"} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <KeyRound className="h-5 w-5 text-emerald-400" />
                    <h1 className="text-xl font-bold">Team einladen</h1>
                  </div>
                  <p className="text-slate-300 mb-6">
                    Erstellen Sie Zugangscodes für Ihre Mitarbeiter oder nutzen Sie den White-Label-Admin für Logo-Upload.
                  </p>
                  <div className="space-y-3">
                    <Link href="/admin/codes">
                      <span className="flex items-center justify-between w-full px-5 py-4 rounded-xl bg-slate-900 border border-slate-600 hover:border-blue-500 cursor-pointer">
                        <span>Zugangscodes erstellen</span>
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                    <Link href="/admin/whitelabel">
                      <span className="flex items-center justify-between w-full px-5 py-4 rounded-xl bg-slate-900 border border-slate-600 hover:border-blue-500 cursor-pointer">
                        <span>Logo & erweiterte Einstellungen</span>
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                    <Link href="/statistiken">
                      <span className="flex items-center justify-center gap-2 w-full px-5 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold cursor-pointer mt-4">
                        <CheckCircle2 className="h-5 w-5" /> Zum Lernbereich
                      </span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
