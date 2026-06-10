import { useState, useMemo } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Download, Copy } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getVorlageBySlug,
  renderVorlageBody,
  type VorlageField,
} from "@shared/verwalterVorlagen";
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
  const slug = params?.slug ?? "";
  const vorlage = getVorlageBySlug(slug);
  const { toast } = useToast();
  const [values, setValues] = useState<Record<string, string>>({});
  const [exporting, setExporting] = useState(false);

  const preview = useMemo(() => {
    if (!vorlage) return "";
    return renderVorlageBody(vorlage.body, values);
  }, [vorlage, values]);

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
    await navigator.clipboard.writeText(preview);
    toast({ title: "In Zwischenablage kopiert" });
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
            <div className="flex flex-wrap gap-2 pt-2">
              <Button onClick={handlePdf} disabled={exporting} className="min-h-[44px] gap-2">
                <Download className="h-4 w-4" />
                {exporting ? "PDF…" : "PDF herunterladen"}
              </Button>
              <Button variant="outline" onClick={handleCopy} className="min-h-[44px] gap-2">
                <Copy className="h-4 w-4" /> Kopieren
              </Button>
            </div>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">Vorschau</h2>
            <pre className="learning-text-scale max-h-[60vh] overflow-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed dark:border-slate-700 dark:bg-slate-900 sm:max-h-[70vh]">
              {preview}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
