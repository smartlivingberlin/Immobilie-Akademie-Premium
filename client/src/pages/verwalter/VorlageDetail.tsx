import { useState, useMemo, useEffect } from "react";
import { Link, useRoute, useSearch } from "wouter";
import { ArrowLeft, Download, Copy, Sparkles } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getVorlageBySlug,
  renderVorlageBody,
  type VorlageField,
} from "@shared/verwalterVorlagen";
import { objektToVorlageDefaults, type VerwalterObjekt } from "@shared/verwalterObjektTypes";
import { downloadBriefPdf } from "@/lib/verwalterBriefPdf";
import { useToast } from "@/hooks/use-toast";

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: VorlageField;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = `vf-${field.key}`;
  if (field.type === "textarea") {
    return (
      <textarea
        id={id}
        className="min-h-[88px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={field.required}
      />
    );
  }
  return (
    <Input
      id={id}
      type={field.type === "number" ? "text" : field.type}
      inputMode={field.type === "number" ? "decimal" : undefined}
      placeholder={field.placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={field.required}
      className="min-h-[44px]"
    />
  );
}

export default function VorlageDetail() {
  const [, params] = useRoute("/app/verwalter/vorlagen/:slug");
  const search = useSearch();
  const slug = params?.slug ?? "";
  const vorlage = getVorlageBySlug(slug);
  const { toast } = useToast();
  const [values, setValues] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState("");
  const [exporting, setExporting] = useState(false);
  const [kiLoading, setKiLoading] = useState(false);
  const [objekte, setObjekte] = useState<VerwalterObjekt[]>([]);
  const [selectedObjektId, setSelectedObjektId] = useState("");
  const [kiAnweisung, setKiAnweisung] = useState("");
  const [error, setError] = useState<string | null>(null);

  const draftPreview = useMemo(() => {
    if (!vorlage) return "";
    return renderVorlageBody(vorlage.body, values);
  }, [vorlage, values]);

  useEffect(() => {
    setPreview(draftPreview);
  }, [draftPreview]);

  useEffect(() => {
    fetch("/api/verwalter/objekte", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setObjekte(d.objekte);
      })
      .catch(() => setError("Daten konnten nicht geladen werden."));
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(search);
    const oid = q.get("objekt");
    if (oid) setSelectedObjektId(oid);
  }, [search]);

  useEffect(() => {
    if (!selectedObjektId) return;
    const obj = objekte.find((o) => o.id === selectedObjektId);
    if (obj) setValues((prev) => ({ ...objektToVorlageDefaults(obj), ...prev }));
  }, [selectedObjektId, objekte]);

  if (!vorlage) {
    return (
      <div className="p-6 text-center">
        <p>Vorlage nicht gefunden.</p>
        <Link href="/app/verwalter/vorlagen">
          <a className="mt-4 inline-block text-emerald-600">← Zurück</a>
        </Link>
      </div>
    );
  }

  const setField = (key: string, v: string) => setValues((prev) => ({ ...prev, [key]: v }));

  const handlePdf = async () => {
    setExporting(true);
    try {
      await downloadBriefPdf(vorlage.title, preview);
    } finally {
      setExporting(false);
    }
  };

  const handleCopy = async () => {
    navigator.clipboard.writeText(preview).catch(() => {
      console.warn("Clipboard nicht verfügbar");
    });
    toast({ title: "In Zwischenablage kopiert" });
  };

  const handleKiBrief = async () => {
    setKiLoading(true);
    try {
      const res = await fetch("/api/verwalter/ki-brief", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vorlageSlug: slug,
          fieldValues: values,
          objektId: selectedObjektId || undefined,
          anweisung: kiAnweisung || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "KI fehlgeschlagen");
      setPreview(data.text);
      const freigabeHint = data.freigabeId
        ? ` — Freigabe unter /app/verwalter/freigaben`
        : "";
      toast({
        title: "KI-Brief erstellt",
        description: `Provider: ${data.provider}${freigabeHint}`,
      });
    } catch (e: any) {
      toast({ title: "Fehler", description: e.message, variant: "destructive" });
    } finally {
      setKiLoading(false);
    }
  };

  return (
    <>
      <SEO title={`${vorlage.title} — Vorlage`} />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <Link href="/app/verwalter/vorlagen">
          <a className="mb-4 inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Alle Vorlagen
          </a>
        </Link>

        <h1 className="text-xl font-bold sm:text-2xl">{vorlage.title}</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{vorlage.description}</p>
        <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:bg-amber-950 dark:text-amber-200">
          {vorlage.legalHint}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4 mt-4">
            {error}
          </div>
        )}

        {objekte.length > 0 && (
          <div className="mt-4">
            <Label htmlFor="objekt-select">Objekt übernehmen</Label>
            <select
              id="objekt-select"
              className="mt-1 min-h-[44px] w-full rounded-md border border-input bg-background px-3 text-sm sm:max-w-md"
              value={selectedObjektId}
              onChange={(e) => setSelectedObjektId(e.target.value)}
            >
              <option value="">— manuell —</option>
              {objekte.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-semibold">Felder ausfüllen</h2>
            {vorlage.fields.map((f) => (
              <div key={f.key}>
                <Label htmlFor={`vf-${f.key}`} className="text-sm">
                  {f.label}
                  {f.required && " *"}
                </Label>
                <div className="mt-1.5">
                  <FieldInput field={f} value={values[f.key] ?? ""} onChange={(v) => setField(f.key, v)} />
                </div>
              </div>
            ))}

            <div>
              <Label htmlFor="ki-anweisung">KI-Zusatzanweisung (optional)</Label>
              <Input
                id="ki-anweisung"
                className="mt-1 min-h-[44px]"
                placeholder="z.B. besonders höflich, kurz halten"
                value={kiAnweisung}
                onChange={(e) => setKiAnweisung(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button onClick={handleKiBrief} disabled={kiLoading} className="min-h-[44px] gap-2 bg-violet-600 hover:bg-violet-700">
                <Sparkles className="h-4 w-4" />
                {kiLoading ? "KI formuliert…" : "KI-Brief verfeinern"}
              </Button>
              <Button onClick={handlePdf} disabled={exporting} variant="outline" className="min-h-[44px] gap-2">
                <Download className="h-4 w-4" />
                {exporting ? "PDF…" : "PDF"}
              </Button>
              <Button variant="outline" onClick={handleCopy} className="min-h-[44px] gap-2">
                <Copy className="h-4 w-4" /> Kopieren
              </Button>
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="mb-2 font-semibold">Vorschau</h2>
            <pre className="learning-text-scale max-h-[50vh] overflow-x-auto overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed dark:border-slate-700 dark:bg-slate-900 sm:max-h-[70vh]">
              {preview}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
