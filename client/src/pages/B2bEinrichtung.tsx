import { useEffect, useState } from "react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { Building2, Palette, KeyRound, CheckCircle2, ArrowRight, ArrowLeft, Upload, Copy } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { LoadingHandler } from "@/components/LoadingHandler";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

type TenantInfo = {
  id: number;
  slug: string;
  companyName: string;
  primaryColor: string;
  welcomeText: string;
  logoUrl?: string | null;
  maxUsers: number;
  enabledModules: string;
};

type TeamCode = {
  id: number;
  code: string;
  modules: string;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
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
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoUploading, setLogoUploading] = useState(false);
  const [teamCodes, setTeamCodes] = useState<TeamCode[]>([]);
  const [teamCodeLoading, setTeamCodeLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [maxUses, setMaxUses] = useState(10);
  const [provisioning, setProvisioning] = useState(false);
  const [error, setError] = useState("");

  const loadStatus = () => {
    setError("");
    return fetch("/api/b2b/onboarding/status", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        setHasTenant(d.hasTenant);
        if (d.tenant) {
          setTenant(d.tenant);
          setCompanyName(d.tenant.companyName || "");
          setPrimaryColor(d.tenant.primaryColor || "#2563eb");
          setWelcomeText(d.tenant.welcomeText || "");
          setLogoUrl(d.tenant.logoUrl || null);
          if (d.completed) setStep(2);
        }
        return d;
      });
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    loadStatus()
      .catch(() => setError("Status konnte nicht geladen werden"))
      .finally(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    if (!user || hasTenant || loading) return;
    const postCheckout = new URLSearchParams(window.location.search).get("b2b") === "1";
    if (!postCheckout) return;

    setProvisioning(true);
    let attempts = 0;
    const interval = setInterval(() => {
      attempts += 1;
      loadStatus()
        .then((d) => {
          if (d.hasTenant) {
            setProvisioning(false);
            clearInterval(interval);
          } else if (attempts >= 40) {
            setProvisioning(false);
            clearInterval(interval);
          }
        })
        .catch(() => {});
    }, 3000);

    return () => clearInterval(interval);
  }, [user, hasTenant, loading]);

  const uploadLogo = async (file: File) => {
    setLogoUploading(true);
    setError("");
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await fetch("/api/b2b/onboarding/logo", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logoBase64: base64, mimeType: file.type, fileName: file.name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload fehlgeschlagen");
      setLogoUrl(data.logoUrl);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLogoUploading(false);
    }
  };

  const loadTeamCodes = () => {
    fetch("/api/b2b/onboarding/team-codes", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => d.codes && setTeamCodes(d.codes))
      .catch(() => {});
  };

  useEffect(() => {
    if (hasTenant && step === 2) loadTeamCodes();
  }, [hasTenant, step]);

  const createTeamCode = async () => {
    setTeamCodeLoading(true);
    setError("");
    try {
      const res = await fetch("/api/b2b/onboarding/team-codes", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modules: tenant?.enabledModules || "",
          maxUses: Math.min(100, Math.max(1, maxUses)),
          note: `Team ${companyName || tenant?.companyName || ""}`.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Code-Erstellung fehlgeschlagen");
      loadTeamCodes();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setTeamCodeLoading(false);
    }
  };

  const copyTeamCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

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

          <LoadingHandler
            isLoading={loading}
            error={error && !hasTenant ? null : error}
            onRetry={() => {
              setLoading(true);
              loadStatus()
                .catch(() => setError("Status konnte nicht geladen werden"))
                .finally(() => setLoading(false));
            }}
            skeleton={<SkeletonCard />}
          >
          {!hasTenant ? (
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center">
              <h1 className="text-2xl font-bold mb-3">Tenant wird eingerichtet</h1>
              <p className="text-slate-400 mb-6">
                {provisioning
                  ? "Zahlung erkannt — wir richten Ihren Tenant ein (ca. 1–2 Min.)…"
                  : "Ihr White-Label-Tenant wird nach der ersten Zahlung aktiviert."}
              </p>
              <button
                type="button"
                onClick={() => { setLoading(true); loadStatus().finally(() => setLoading(false)); }}
                className="text-sm text-blue-400 hover:text-white mb-4 block mx-auto"
              >
                Status aktualisieren
              </button>
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
                  <label className="block text-sm text-slate-400 mb-1">Logo (optional)</label>
                  <div className="flex items-center gap-4 mb-4">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Logo" className="h-14 w-14 rounded-lg object-contain bg-slate-900 border border-slate-600" />
                    ) : (
                      <div className="h-14 w-14 rounded-lg bg-slate-900 border border-dashed border-slate-600 flex items-center justify-center text-slate-500 text-xs">Logo</div>
                    )}
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-600 text-slate-300 cursor-pointer hover:border-blue-500 text-sm">
                      <Upload className="h-4 w-4" />
                      {logoUploading ? "Hochladen…" : "Logo wählen"}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadLogo(e.target.files[0])} />
                    </label>
                  </div>
                  <label className="block text-sm text-slate-400 mb-1">Firmenname</label>
                  <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full mb-4 px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white" />
                  <label className="block text-sm text-slate-400 mb-1">Primärfarbe</label>
                  <div className="flex gap-3 mb-4">
                    <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-10 w-14 rounded cursor-pointer" />
                    <input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="flex-1 px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white font-mono text-sm" />
                  </div>
                  <label className="block text-sm text-slate-400 mb-1">Willkommenstext fürs Team</label>
                  <textarea value={welcomeText} onChange={(e) => setWelcomeText(e.target.value)} rows={4} placeholder="Willkommen im Lernportal von …" className="w-full mb-4 px-4 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white" />
                  <div className="mb-6 rounded-xl border border-slate-600 overflow-hidden">
                    <div className="text-xs text-slate-500 px-3 py-2 border-b border-slate-700">Vorschau Portal-Header</div>
                    <div className="p-4 bg-white text-slate-900">
                      <div className="flex items-center gap-3 mb-3">
                        {logoUrl ? (
                          <img src={logoUrl} alt="Logo" className="h-10 w-10 rounded object-contain" />
                        ) : (
                          <div className="h-10 w-10 rounded flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: primaryColor }}>
                            {(companyName || "B").slice(0, 1)}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-sm">{companyName || "Ihr Maklerbüro"}</div>
                          <div className="text-xs text-slate-500">Lernportal</div>
                        </div>
                      </div>
                      <div className="h-1 rounded-full mb-3" style={{ backgroundColor: primaryColor }} />
                      <p className="text-sm text-slate-600">
                        {welcomeText || "Willkommen im Lernportal Ihres Teams."}
                      </p>
                    </div>
                  </div>
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
                  <p className="text-slate-300 mb-4">
                    Erstellen Sie Zugangscodes für Ihre Mitarbeiter. Einlösen unter <code className="text-blue-300">/code-einloesen</code>.
                  </p>
                  <label className="block text-sm text-slate-400 mb-1">Max. Nutzungen pro Code</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={maxUses}
                    onChange={(e) => setMaxUses(Number(e.target.value) || 10)}
                    className="w-24 mb-4 px-3 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white"
                  />
                  <button
                    type="button"
                    onClick={createTeamCode}
                    disabled={teamCodeLoading}
                    className="w-full mb-4 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-semibold disabled:opacity-60"
                  >
                    {teamCodeLoading ? "Erstelle…" : "+ Neuen Team-Code erstellen"}
                  </button>
                  {teamCodes.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {teamCodes.slice(0, 5).map((c) => (
                        <div key={c.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 border border-slate-600">
                          <div>
                            <span className="font-mono text-blue-300">{c.code}</span>
                            <span className="text-xs text-slate-500 ml-2">{c.usedCount}/{c.maxUses} genutzt</span>
                          </div>
                          <button type="button" onClick={() => copyTeamCode(c.code)} className="text-slate-400 hover:text-white">
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      {copiedCode && <p className="text-xs text-emerald-400">Code {copiedCode} kopiert</p>}
                    </div>
                  )}
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center justify-between w-full px-5 py-4 rounded-xl bg-slate-900 border border-slate-600 hover:border-blue-500 text-left"
                    >
                      <span>Logo & Branding anpassen</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
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
          </LoadingHandler>
        </div>
      </div>
    </>
  );
}
